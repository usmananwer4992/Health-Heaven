import { createSlice } from "@reduxjs/toolkit";

const drugFormSlice = createSlice({
  name: "drugForm",
  initialState: {
    drugForms: [],
    selectedDrugForm: null,
    error: null,
    totalCount: 0,
    loading: false,
  },
  reducers: {
    setDrugForms: (state, action) => {
      state.drugForms = action.payload;
    },
    setSelectedDrugForm: (state, action) => {
      state.selectedDrugForm = action.payload;
    },
    addDrugForm: (state, action) => {
      state.drugForms = [...state.drugForms, action.payload];
    },
    _updateDrugForm: (state, action) => {
      state.drugForms = state.drugForms.map((drugForm) =>
        drugForm.id === action.payload?.id ? action.payload : drugForm
      );
    },
    _deleteDrugForm: (state, action) => {
      state.drugForms = state.drugForms.filter(
        (drugForm) => drugForm.id !== action.payload.id
      );
    },
    addDrugFormError: (state, action) => {
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
  setDrugForms,
  setSelectedDrugForm,
  addDrugForm,
  _updateDrugForm,
  _deleteDrugForm,
  addDrugFormError,
  setCount,
  setLoading,
} = drugFormSlice.actions;

export default drugFormSlice.reducer;
