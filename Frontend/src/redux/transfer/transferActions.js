import { API_BASE_URL } from "../../config";
import apiService from "../../services/apiService";
import {
  setTransfers, // Update to match your Redux state structure
  addTransfer, // Update to match your Redux state structure
  setLoading,
  setDrugs,
  setPatients,
  setPharmacies,
  setTransferDetail,
  setStatuses,
  setSigs,
  setDays,
  setPartners,
  seTransferPrequesite
} from "./transferSlice"; // Update the import path

export const GET_URL = `${API_BASE_URL}/transfers`; // Update the API endpoint

export const fetchTransfers =
  (page, pageSize, searchFilters, sortConfig) => async (dispatch) => {
    try {
      dispatch(setLoading(true)); // Set loading to true when starting the request
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/admin`; // Update the base URL
      // Check if the search query is at least 3 characters long
      if (searchFilters.name && searchFilters.name.length < 3) {
        // Do not make the API call if the search query is too short
        return;
      }
      const config = {
        method: "get",
        url: "/transfers", // Update the API endpoint
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
      const result = await apiService(config, dispatch);
      // Introduce an artificial delay (e.g., 700 milliseconds)
      await new Promise((resolve) => setTimeout(resolve, 700));
      console.log(result?.response, "api")
      dispatch(setTransfers(result?.response)); // Update to match your Redux state structure
      dispatch(setLoading(false)); // Set loading to false when the request is complete
    } catch (error) {
      dispatch(setLoading(false)); // Set loading to false in case of an error
    }
  };

export const createTransfer = (transfer) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`; // Update the base URL

    const config = {
      method: "post",
      url: "/transfers", // Update the API endpoint
      baseURL: baseUrl,
      token: authToken,
      data: transfer,
    };

    const result = await apiService(config, dispatch);
    dispatch(addTransfer(result.data)); // Update to match your Redux state structure
  } catch (error) {
    throw error?.message;
  }
};

export const updateTransfer = (id, transfer) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`; // Update the base URL

    const config = {
      method: "put",
      url: `/transfers/${id}`, // Update the API endpoint
      baseURL: baseUrl,
      token: authToken,
      data: transfer,
    };

    const result = await apiService(config, dispatch);
    //dispatch(updateTransfer(result.data));
    return result;
  } catch (error) {
    throw error?.message;
  }
};

export const deleteTransfer = (id) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`; // Update the base URL

    const config = {
      method: "delete",
      url: `/transfers/${id}`, // Update the API endpoint
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await apiService(config, dispatch);
    // Handle the deletion in your Redux state if needed
    // dispatch(destroyTransfer({ id: id }));
  } catch (error) {
    console.error(error);
    // throw error?.message;
  }
};

export const fetchPartners = () => async (dispatch) => {
  try {
    dispatch(setLoading(true)); // Set loading to true when starting the request
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;
    const config = {
      method: "get",
      url: "/partners",
      baseURL: baseUrl,
      token: authToken,
    };
    const result = await apiService(config, dispatch);
    dispatch(setPartners(result?.response?.partners));
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrugs =
  (page, pageSize, search, sortColumn, sortOrder) => async (dispatch) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/admin`;
      const config = {
        method: "get",
        url: "/drugs",
        baseURL: baseUrl,
        token: authToken,
        params: { page, pageSize, search, sortBy: sortColumn, sortOrder },
      };
      const result = await apiService(config, dispatch);
      await new Promise((resolve) => setTimeout(resolve, 700));
      dispatch(setDrugs(result?.response?.drugs));
    } catch (error) {
      console.log(error);
    }
  };

export const fetchPatients =
  (page, pageSize, search, sortColumn, sortOrder) => async (dispatch) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/admin`;

      const config = {
        method: "get",
        url: "customers",
        baseURL: baseUrl,
        token: authToken,
        params: { page, pageSize, search, sortBy: sortColumn, sortOrder },
      };

      const result = await apiService(config);
      dispatch(setPatients(result?.response?.customers));
    } catch (error) {
      console.error(error);
    }
  };

export const fetchPharmacies = () => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "get",
      url: "/pharmacies",
      baseURL: baseUrl,
      token: authToken,
    };
    const result = await apiService(config, dispatch);

    dispatch(setPharmacies(result?.response?.pharmacies));
  } catch (error) {}
};

export const fetchStatuses = () => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;
    const config = {
      method: "get",
      url: "/transfers/statuses",
      baseURL: baseUrl,
      token: authToken,
    };
    const result = await apiService(config, dispatch);

    dispatch(setStatuses(result?.response));
  } catch (error) {}
};

export const fetchDays = () => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;
    const config = {
      method: "get",
      url: "/transfers/days",
      baseURL: baseUrl,
      token: authToken,
    };
    const result = await apiService(config, dispatch);

    dispatch(setDays(result?.response));
  } catch (error) {}
};

export const fetchSigs = () => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;
    const config = {
      method: "get",
      url: "/sigs",
      baseURL: baseUrl,
      token: authToken,
    };
    const result = await apiService(config, dispatch);
    dispatch(setSigs(result?.response?.Sigs));
  } catch (error) {}
};

export const fetchTransferDetail = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "get",
      url: `/transfers/${id}`,
      baseURL: baseUrl,
      token: authToken,
    };
    const result = await apiService(config, dispatch);
    await new Promise((resolve) => setTimeout(resolve, 700));
    dispatch(setTransferDetail(result.response));
    dispatch(setLoading(false));
    //localStorage.setItem("partner-users", JSON.stringify(result.response));
  } catch (error) {
    dispatch(setLoading(false));
  }
};

export const fetchPrerequisite =
  (srt = "admin") =>
  async (dispatch) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/${srt}`;

      const config = {
        method: "get",
        url: "/transfers/prerequisite",
        baseURL: baseUrl,
        token: authToken,
      };

      const result = await apiService(config, dispatch);
      dispatch(seTransferPrequesite(result.response));
    } catch (error) {
      throw error?.message;
      //dispatch(addDrugCategoryError(error.message));
    }
  };