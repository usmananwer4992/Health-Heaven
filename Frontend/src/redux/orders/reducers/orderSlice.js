import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    selectedOrders: null,
    error: null,
    totalCount: 0,
    loading: false,
    orderDetail: {},
    orderStatuses: [],
    orderPrequesite: [{ order_status: {} }],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrderStatuses: (state, action) => {
      state.orders = action.payload;
    },
    setSelectedOrders: (state, action) => {
      state.selectedOrders = action.payload;
    },
    setOrderDetail: (state, action) => {
      state.orderDetail = action.payload;
    },
    addOrders: (state, action) => {
      state.orders = [...state.orders, action.payload.orderFinal];
    },
    _updateOrders: (state, action) => {
      state.orders = state.orders.map((order) =>
        order.id === action.payload?.id ? action.payload : order
      );
    },
    _deleteOrders: (state, action) => {
      state.drugCategories = state.drugCategories.filter(
        (order) => order.id !== action.payload.id
      );
    },
    addOrdersError: (state, action) => {
      state.error = action.payload;
    },
    setCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    orderPrequesite: (state, action) => {
      state.orderPrequesite = action.payload;
    },
  },
});

export const {
  setOrders,
  setSelectedOrders,
  addOrders,
  _updateOrders,
  _deleteOrders,
  addOrdersError,
  setCount,
  setLoading,
  setOrderDetail,
  setOrderStatuses,
  orderPrequesite,
} = ordersSlice.actions;

export default ordersSlice.reducer;
