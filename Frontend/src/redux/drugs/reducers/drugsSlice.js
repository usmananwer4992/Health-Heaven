import { createSlice } from "@reduxjs/toolkit";

const drugsSlice = createSlice({
  name: "drugs",
  initialState: {
    drugs: [],
    selectedDrugs: null,
    drugDetail: null,
    error: null,
    totalCount: 0,
    loading: false,
  },
  reducers: {
    setDrugs: (state, action) => {
      state.drugs = action.payload;
    },
    setSelectedDrugs: (state, action) => {
      state.selectedDrugs = action.payload;
    },
    addDrugs: (state, action) => {
      state.drugs = [...state.drugs, action.payload];
    },
    setDrugDetail: (state, action) => {
      state.drugDetail = action.payload;
    },
    _updateDrugs: (state, action) => {
      state.drugs = state.drugs.map((drug) =>
        drug.id === action.payload?.id ? action.payload : drug
      );
    },
    _deleteDrug: (state, action) => {
      state.drugs = state.drugs.filter((drug) => drug.id !== action.payload.id);
    },
    addDrugError: (state, action) => {
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
  setDrugs,
  setSelectedDrugs,
  addDrugs,
  setDrugDetail,
  _updateDrugs,
  _deleteDrug,
  addDrugError,
  setCount,
  setLoading,
} = drugsSlice.actions;

export default drugsSlice.reducer;
