import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer';

const store = configureStore({
  reducer: {
    loginReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware.concat(thunk),
});

export default store;
