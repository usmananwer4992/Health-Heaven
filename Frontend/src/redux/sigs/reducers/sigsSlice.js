import { createSlice } from "@reduxjs/toolkit";

const sigsSlice = createSlice({
  name: "sigs",
  initialState: {
    sigs: [],
    selectedSigs: null,
    error: null,
    totalCount: 0,
    loading: false,
  },
  reducers: {
    setSigs: (state, action) => {
      state.sigs = action.payload;
    },
    setSelectedSigs: (state, action) => {
      state.selectedSigs = action.payload;
    },
    addSigs: (state, action) => {
      state.sigs = [...state.sigs, action.payload];
    },
    _updateSigs: (state, action) => {
      state.sigs = state.sigs.map((sig) =>
        sig.id === action.payload?.id ? action.payload : sig
      );
    },
    _deleteSigs: (state, action) => {
      state.drugCategories = state.drugCategories.filter(
        (sig) => sig.id !== action.payload.id
      );
    },
    addSigsError: (state, action) => {
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
    setSigs,
  setSelectedSigs,
  addSigs,
  _updateSigs,
  _deleteSigs,
  addSigsError,
  setCount,
  setLoading,
} = sigsSlice.actions;

export default sigsSlice.reducer;
