import { createSlice } from "@reduxjs/toolkit";
import apiService from "../services/apiService";
import { API_BASE_URL } from "../config";

export const createCustomerAction =
  (apiUrl, customerObject, successCallback, url) => async (dispatch) => {
    try {
      const baseUrl = `${API_BASE_URL + apiUrl}`;
      const authToken = JSON.parse(localStorage.getItem("token"));

      const config = {
        method: "post",
        url: "/customers",
        baseURL: baseUrl,
        data: customerObject,
        token: authToken,
      };
      const result = await apiService(config);
      if (result && result.response) {
        const customer = result.response.customer;
        dispatch(setCustomers(customer));
        if (successCallback && typeof successCallback === "function") {
          successCallback(url); // Replace with your desired URL
        }
      }
    } catch (error) {
      throw error?.message;
    }
  };

export const getCustomerAction =
  (
    srt = "admin",
    page,
    pageSize,
    searchFilters,  
    sortConfig 
  ) =>
  async (dispatch) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/${srt}`;

      const config = {
        method: "get",
        url: "/customers",
        baseURL: baseUrl,
        token: authToken,
        params: {
          page,
          pageSize,
          ...searchFilters,
          sortBy: sortConfig.column,
          sortOrder: sortConfig.order,
        },
      };
      const result = await apiService(config);
      // const customer = result.response.customers
      dispatch(setCustomers(result?.response?.customers));
      dispatch(setCount(result?.response?.totalCount));
    } catch (error) {
      console.error(error);
    }
  };
export const fetchCustomerDetails = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "get",
      url: `/customers/${id}`,
      baseURL: baseUrl,
      token: authToken,
    };
    const result = await apiService(config, dispatch);
    await new Promise((resolve) => setTimeout(resolve, 700));
    dispatch(setCustomersDetail(result.response));
    dispatch(setLoading(false));
    //localStorage.setItem("partner-users", JSON.stringify(result.response));
  } catch (error) {
    dispatch(setLoading(false));
  }
};
export const updateCustomerAction =
  (id, customer, successCallback, redirectUrl) => async (dispatch) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/admin`;

      const config = {
        method: "put",
        url: `/customers/${id}`,
        baseURL: baseUrl,
        token: authToken,
        data: customer,
      };

      const result = await apiService(config, dispatch);

      if (result?.response) {
        dispatch(_updateCustomer(result?.response));

        if (successCallback && typeof successCallback === "function") {
          successCallback(redirectUrl);
        }
      }
    } catch (error) {
      throw error?.message;
    }
  };

export const deleteCustomerAction = (id) => async (dispatch) => {
  if (typeof id !== "number") {
    return;
  }
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "delete",
      url: `/customers/${id}`,
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await apiService(config, dispatch);
    dispatch(_deleteCustomer({ id }));
  } catch (error) {
    console.error(error);
    dispatch(addCustomerError(error.message));
  }
};

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
    selectedCustomers: null,
    customerDetail: null,
    error: null,
    totalCount: 0,
    loading: false,
  },
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    setSelectedCustomers: (state, action) => {
      state.selectedCustomers = action.payload;
    },
    addCustomers: (state, action) => {
      state.customers = [...state.customers, action.payload];
    },
    setCustomersDetail: (state, action) => {
      state.customerDetail = action.payload;
    },
    _updateCustomer: (state, action) => {
      state.customers = state.customers.map((customer) =>
        customer.id === action.payload?.id ? action.payload : customer
      );
    },
    _deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(
        (customer) => customer.id !== action.payload.id
      );
    },
    addCustomerError: (state, action) => {
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
  setCustomers,
  setSelectedCustomers,
  addCustomers,
  setCustomersDetail,
  _updateCustomer,
  _deleteCustomer,
  addCustomerError,
  setLoading,
  setCount,
} = customerSlice.actions;

export default customerSlice.reducer;
