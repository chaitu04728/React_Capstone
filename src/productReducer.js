import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    sortBy: 'price-low-to-high',
    searchTerm: '',
  },
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setProducts, setSortBy, setSearchTerm } = productSlice.actions;
export default productSlice.reducer;
