import { createSlice } from "@reduxjs/toolkit";

const drugTypeSlice = createSlice({
  name: "drugType",
  initialState: {
    drugTypes: [],
    selectedDrugType: null,
    error: null,
    totalCount: 0,
    loading: false,
  },
  reducers: {
    setDrugTypes: (state, action) => {
      state.drugTypes = action.payload;
    },
    setSelectedDrugType: (state, action) => {
      state.selectedDrugType = action.payload;
    },
    addDrugType: (state, action) => {
      state.drugTypes = [...state.drugTypes, action.payload];
    },
    _updateDrugType: (state, action) => {
      state.drugTypes = state.drugTypes.map((drugType) =>
        drugType.id === action.payload?.id ? action.payload : drugType
      );
    },
    _deleteDrugType: (state, action) => {
      state.drugTypes = state.drugTypes.filter(
        (drugType) => drugType.id !== action.payload.id
      );
    },
    addDrugTypeError: (state, action) => {
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
  setDrugTypes,
  setSelectedDrugType,
  addDrugType,
  _updateDrugType,
  _deleteDrugType,
  addDrugTypeError,
  setCount,
  setLoading,
} = drugTypeSlice.actions;

export default drugTypeSlice.reducer;
