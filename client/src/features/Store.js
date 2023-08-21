// store.js
import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    [], // Fixed size of 4
    [], // Fixed size of 4
    [],    // Fixed size of 3
    [], // Fixed size of 4
  ],
  baseline:0.0,
  loading: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setBase: (state, action) => {
      state.baseline = action.payload
      console.log("Baseline: ",action.payload)
    },
    addItem: (state, action) => {
      const { category, value } = action.payload;
      state.categories[category].push(value);
    },
    updateItem: (state, action) => {
      const { category, index, value } = action.payload;
      console.log("Update item:", category, index, value)
      state.categories[category][index] = value;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      console.log("Loading: ",action.payload)
    },
    resetItems: (state) => {
      console.log("Reset items")
      state.loading = false
      state.categories = [
        [], // Fixed size of 4
        [], // Fixed size of 4
        [],    // Fixed size of 3
        [], // Fixed size of 4
      ]     
    }
  },
});

export const { addItem, updateItem, setLoading, setBase, resetItems } = categoriesSlice.actions;
export const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
  },
});

