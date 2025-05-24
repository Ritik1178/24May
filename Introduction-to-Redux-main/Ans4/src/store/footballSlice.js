import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  isError: false,
  footballMatches: [],
  favorites: [],
  searchQuery: '',
  filters: {
    team: '',
    date: '',
    outcome: ''
  }
};

export const fetchMatches = createAsyncThunk(
  'football/fetchMatches',
  async (page = 2) => {
    const response = await axios.get(`https://jsonmock.hackerrank.com/api/football_matches?page=${page}`);
    return response.data.data;
  }
);

const footballSlice = createSlice({
  name: 'football',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleFavorite: (state, action) => {
      const matchId = action.payload;
      const index = state.favorites.indexOf(matchId);
      if (index === -1) {
        state.favorites.push(matchId);
      } else {
        state.favorites.splice(index, 1);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.footballMatches = action.payload;
      })
      .addCase(fetchMatches.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
});

export const { setSearchQuery, setFilters, toggleFavorite } = footballSlice.actions;
export default footballSlice.reducer; 