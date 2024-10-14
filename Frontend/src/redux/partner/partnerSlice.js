import { createSlice } from "@reduxjs/toolkit";

const partnerSlice = createSlice({
  name: "partners",
  initialState: {
    partners: [],
    partnerDetail: null,
    states: [],
    users: [],
    error: null,
    totalCount: 0,
    totalUserCount: 0,
    loading: false,
    shippings: [],
    listPartner:[]
  },
  reducers: {
    setStates: (state, action) => {
      state.states = action.payload;
    },
    setPartnerUsers: (state, action) => {
      state.users = action.payload;
    },
    setPartners: (state, action) => {
      state.partners = action.payload;
    },
    setPartnersList: (state, action) => {
      state.listPartner = action.payload;
    },
    setCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserCount: (state, action) => {
      state.totalUserCount = action.payload;
    },
    setPartnerDetail: (state, action) => {
      state.partnerDetail = action.payload;
    },
    addPartner: (state, action) => {
      state.partners = action.payload;
    },
    addPartnerUser: (state, action) => [...state, action.payload],
    updatePartnerDetail: (state, action) => {
      // console.log(action.payload);
      // state.partnerDetail = action.payload;
      // console.log(state.partnerDetail);
    },
    // state.map((partner) =>
    //   partner.id === action.payload.id ? action.payload : partner
    // ),
    destoryPartner: (state, action) =>
      action.payload.partners.filter(
        (partner) => partner.id !== action.payload.id
      ),
    addError: (state, action) => {
      state.error = action.payload;
    },
    setShippings: (state, action) => {
      state.shippings = action.payload;
    },

  },
});

export const {
  setStates,
  setPartners,
  setCount,
  setUserCount,
  setPartnerDetail,
  addPartner,
  addPartnerUser,
  updatePartnerDetail,
  setPartnerUsers,
  destoryPartner,
  addError,
  setLoading,
  setShippings,
  setPartnersList
} = partnerSlice.actions;

export default partnerSlice.reducer;
