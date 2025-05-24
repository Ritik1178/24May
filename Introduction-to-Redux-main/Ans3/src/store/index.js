import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice';
import filtersReducer from '../features/filters/filtersSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    filters: filtersReducer,
  },
});

export default store; 