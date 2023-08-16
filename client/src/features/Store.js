// store.js
import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    [], // Fixed size of 4
    [], // Fixed size of 4
    [],    // Fixed size of 3
    [], // Fixed size of 4
  ],
  loading: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
      addItem: (state, action) => {
        const { category, value } = action.payload;
        state.categories[category].push(value);
      },
      updateItem: (state, action) => {
      const { category, index, value } = action.payload;
      console.log("Update:",category, index, value )
      state.categories[category][index] = value;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export const { addItem, updateItem, setLoading } = categoriesSlice.actions;
export const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
  },
});

