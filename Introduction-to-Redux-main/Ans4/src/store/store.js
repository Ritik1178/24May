import { configureStore } from '@reduxjs/toolkit';
import footballReducer from './footballSlice';

export const store = configureStore({
  reducer: {
    football: footballReducer
  }
}); 