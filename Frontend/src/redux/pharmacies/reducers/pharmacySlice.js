import { createSlice } from "@reduxjs/toolkit";

const pharmacySlice = createSlice({
  name: "pharmacies",
  initialState: {
    pharmacies: [],
    selectedPharmacy: null,
    error: null,
    totalCount: 0,
    loading: false,
  },
  reducers: {
    setPharmacies: (state, action) => {
      state.pharmacies = action.payload;
    },
    setSelectedPharmacy: (state, action) => {
      state.selectedPharmacy = action.payload;
    },
    addPharmacy: (state, action) => {
      state.pharmacies = [...state.pharmacies, action.payload];
    },
    _updatePharmacy: (state, action) => {
      state.pharmacies = state.pharmacies.map((pharmacy) =>
        pharmacy.id === action.payload?.id ? action.payload : pharmacy
      );
    },
    _deletePharmacy: (state, action) => {
      state.pharmacies = state.pharmacies.filter(
        (pharmacy) => pharmacy.id !== action.payload.id
      );
    },
    addPharmacyError: (state, action) => {
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
  setPharmacies,
  setSelectedPharmacy,
  addPharmacy,
  _updatePharmacy,
  _deletePharmacy,
  addPharmacyError,
  setCount,
  setLoading,
} = pharmacySlice.actions;

export default pharmacySlice.reducer;
