import { createSlice } from "@reduxjs/toolkit";

const drugClassSlice = createSlice({
  name: "drugClass",
  initialState: {
    drugClasses: [],
    selectedDrugClass: null,
    error: null,
    totalCount: 0,
    loading: false,
  },
  reducers: {
    setDrugClasses: (state, action) => {
      state.drugClasses = action.payload;
    },
    setSelectedDrugClass: (state, action) => {
      state.selectedDrugClass = action.payload;
    },
    addDrugClass: (state, action) => {
      state.drugClasses = [...state.drugClasses, action.payload];
    },
    _updateDrugClass: (state, action) => {
      state.drugClasses = state.drugClasses.map((drugClass) =>
        drugClass.id === action.payload?.id ? action.payload : drugClass
      );
    },
    _deleteDrugClass: (state, action) => {
      state.drugClasses = state.drugClasses.filter(
        (drugClass) => drugClass.id !== action.payload.id
      );
    },
    addDrugClassError: (state, action) => {
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
  setDrugClasses,
  setSelectedDrugClass,
  addDrugClass,
  _updateDrugClass,
  _deleteDrugClass,
  addDrugClassError,
  setCount,
  setLoading,
} = drugClassSlice.actions;

export default drugClassSlice.reducer;
