import { API_BASE_URL } from "../../../config";
import apiService from "../../../services/apiService";
import {
  setDrugs,
  setSelectedDrugs,
  addDrugs,
  setDrugDetail,
  _updateDrugs,
  _deleteDrug,
  addDrugError,
  setCount,
  setLoading,
} from "../reducers/drugsSlice";
export const fetchDrugs =
  (srt = "admin", page, pageSize, searchFilters, sortConfig) =>
  async (dispatch) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/${srt}`;

      dispatch(setLoading(true));
      const config = {
        method: "get",
        url: "/drugs",
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
      dispatch(setDrugs(result?.response?.drugs));
      dispatch(setCount(result?.response?.totalCount));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(addDrugError(error.message));
      dispatch(setLoading(false));
    }
  };

export const createDrug = (drug) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "post",
      url: "/drugs",
      baseURL: baseUrl,
      token: authToken,
      data: drug,
    };

    const result = await apiService(config, dispatch);

    console.log("llllllllllllllllllllllllllllllllllllll", result);
    dispatch(addDrugs(result.data));
  } catch (error) {
    throw error?.message;
  }
};
export const fetchDrugDetails = (id) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "get",
      url: `/drugs/${id}`,
      baseURL: baseUrl,
      token: authToken,
    };
    const result = await apiService(config, dispatch);
    dispatch(setDrugDetail(result.response));
    //localStorage.setItem("partner-users", JSON.stringify(result.response));
  } catch (error) {
    console.error(error);
  }
};
export const updateDrug = (id, drug) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "put",
      url: `/drugs/${id}`,
      baseURL: baseUrl,
      token: authToken,
      data: drug,
    };

    const result = await apiService(config, dispatch);
    dispatch(_updateDrugs(result.data));
  } catch (error) {
    throw error?.message;
  }
};

export const deleteDrug = (id) => async (dispatch) => {
  if (typeof id !== "number") {
    return;
  }
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "delete",
      url: `/drugs/${id}`,
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await apiService(config, dispatch);
    dispatch(_deleteDrug({ id }));
  } catch (error) {
    console.error(error);
    dispatch(addDrugError(error.message));
  }
};
