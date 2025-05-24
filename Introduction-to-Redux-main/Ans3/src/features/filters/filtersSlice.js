import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  genre: 'all',
  readStatus: 'all',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    setReadStatus: (state, action) => {
      state.readStatus = action.payload;
    },
  },
});

export const { setSearchTerm, setGenre, setReadStatus } = filtersSlice.actions;

export const selectFilters = state => state.filters;

export default filtersSlice.reducer; 