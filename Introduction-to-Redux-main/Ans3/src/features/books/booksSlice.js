import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  status: 'idle',
  error: null,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push({
        id: Date.now().toString(),
        ...action.payload,
        isRead: false,
      });
    },
    editBook: (state, action) => {
      const { id, ...updates } = action.payload;
      const book = state.books.find(book => book.id === id);
      if (book) {
        Object.assign(book, updates);
      }
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    toggleReadStatus: (state, action) => {
      const book = state.books.find(book => book.id === action.payload);
      if (book) {
        book.isRead = !book.isRead;
      }
    },
  },
});

export const { addBook, editBook, deleteBook, toggleReadStatus } = booksSlice.actions;

export const selectAllBooks = state => state.books.books;

export default booksSlice.reducer; 