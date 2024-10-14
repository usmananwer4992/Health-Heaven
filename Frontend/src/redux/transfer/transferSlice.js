import { createSlice } from "@reduxjs/toolkit";

const transferSlice = createSlice({
  name: "transfers",
  initialState: {
    transfers: [],
    partners: [],
    transferDetail: null,
    drugs: [],
    patients: [],
    pharmacies: [],
    statuses: [],
    sigs: [],
    days: [],
    error: null,
    totalCount: 0,
    loading: false,
    transferPrequesite:[]
  },
  reducers: {
    setTransfers: (state, action) => {
      state.transfers = action.payload;
    },
    setPartners: (state, action) => {
      state.partners = action.payload;
    },
    setDrugs: (state, action) => {
      state.drugs = action.payload;
    },
    setPatients: (state, action) => {
      state.patients = action.payload;
    },
    setPharmacies: (state, action) => {
      state.pharmacies = action.payload;
    },
    setStatuses: (state, action) => {
      state.statuses = action.payload;
    },
    setSigs: (state, action) => {
      state.sigs = action.payload;
    },
    setDays: (state, action) => {
      state.days = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTransferDetail: (state, action) => {
      state.transferDetail = action.payload;
    },
    addTransfer: (state, action) => {
      state.transfers = action.payload;
    },
    updateTransferDetail: (state, action) => {
      // Handle updating transfer detail if needed
    },
    destroyTransfer: (state, action) =>
      state.transfers.filter((transfer) => transfer.id !== action.payload.id),
    addError: (state, action) => {
      state.error = action.payload;
    },
    seTransferPrequesite: (state, action) => {
      state.transferPrequesite = action.payload;
    },
  },
});

export const {
  setTransfers,
  setPartners,
  setDrugs,
  setPatients,
  setPharmacies,
  setStatuses,
  setSigs,
  setDays,
  setTotalCount,
  setTransferDetail,
  addTransfer,
  updateTransferDetail,
  destroyTransfer,
  addError,
  setLoading,
  seTransferPrequesite
} = transferSlice.actions;

export default transferSlice.reducer;
