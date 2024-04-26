import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), thunkMiddleware],
});

export default store;
