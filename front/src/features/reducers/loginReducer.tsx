/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

interface loginFormProps {
  login: string,
  password: string,
}

const initialValue = {
  login: '',
  password: '',
  status: '', // 'ERROR' | 'LOADING" | 'LOAD'
  isLoading: false,
  isError: false,
};

const initialUser = {
  isConnected: false,
  login: '',
  token: '',
};

export const submitLoginForm: any = createAsyncThunk(
  'loginReducer/submitLoginForm',
  async ({ login, password }: loginFormProps) => {
    const userData = {
      login,
      password,
    };
    const request = await axios({
      method: 'POST',
      url: 'http://localhost:4242/login',
      data: userData,
    });
    return request.data;
  },
);

export const loginReducerSlice = createSlice({
  name: 'loginReducer',
  initialState: { value: initialValue, user: initialUser },
  reducers: {
    setFormValue: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
    setUserLogin: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [submitLoginForm.pending]: (state) => {
      state.value.status = 'pending';
      console.log('pending status');
    },
    [submitLoginForm.fulfilled]: (state, { payload }) => {
      console.log('fulfilled status');

      state.value.status = 'fulfilled';

      const user = {
        isConnected: true,
        login: payload.login,
        token: payload.token,
      };

      state.user = user;

      localStorage.setItem(
        'user',
        JSON.stringify(user),
      );
    },
    [submitLoginForm.rejected]: (state) => {
      state.value.status = 'rejected';
      console.log('rejected status');
      toast.error('Login/password not correct', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    },
  },
});
export const loginReducerSliceSliceActions = loginReducerSlice.actions;

export default loginReducerSlice.reducer;
