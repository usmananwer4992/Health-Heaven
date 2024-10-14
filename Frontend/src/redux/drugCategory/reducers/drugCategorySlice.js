import { createSlice } from "@reduxjs/toolkit";

const drugCategorySlice = createSlice({
  name: "drugCategory",
  initialState: {
    drugCategories: [],
    selectedDrugCategory: null,
    error: null,
    totalCount: 0,
    loading: false,
  },
  reducers: {
    setDrugCategories: (state, action) => {
      state.drugCategories = action.payload;
    },
    setSelectedDrugCategory: (state, action) => {
      state.selectedDrugCategory = action.payload;
    },
    addDrugCategory: (state, action) => {
      state.drugCategories = [...state.drugCategories, action.payload];
    },
    _updateDrugCategory: (state, action) => {
      state.drugCategories = state.drugCategories.map((category) =>
        category.id === action.payload?.id ? action.payload : category
      );
    },
    _deleteDrugCategory: (state, action) => {
      state.drugCategories = state.drugCategories.filter(
        (category) => category.id !== action.payload.id
      );
    },
    addDrugCategoryError: (state, action) => {
      state.error = action.payload;
    },
    setCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setDrugCategories,
  setSelectedDrugCategory,
  addDrugCategory,
  _updateDrugCategory,
  _deleteDrugCategory,
  addDrugCategoryError,
  setCount,
  setLoading,
} = drugCategorySlice.actions;

export default drugCategorySlice.reducer;
