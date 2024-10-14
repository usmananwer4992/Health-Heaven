import { API_BASE_URL } from "../../../config";
import apiService from "../../../services/apiService";
import {
  setDrugTypes,
  addDrugType,
  _updateDrugType,
  _deleteDrugType,
  addDrugTypeError,
  setCount,
  setLoading,
} from "../reducers/drugTypeSlice";
export const fetchDrugTypes =
  (
    page,
    pageSize,
    search,
    sortConfig = {
      column: "",
      order: "asc",
    },
    portal = "admin"
  ) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true)); // Set loading to true when starting the request
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/${portal}`;
      // Check if the search query is at least 2 characters long
      if (search && search.length < 2) {
        // Do not make the API call if the search query is too short
        return;
      }
      const config = {
        method: "get",
        url: "/drugTypes",
        baseURL: baseUrl,
        token: authToken,
        params: {
          page,
          pageSize,
          search,
          sortBy: sortConfig.column,
          sortOrder: sortConfig.order,
        },
      };
      const result = await apiService(config, dispatch);
      dispatch(setDrugTypes(result?.response?.drugTypes));
      dispatch(setCount(result?.response?.totalCount));
      dispatch(setLoading(false)); // Set loading to false when the request is complete
      return result?.response?.drugTypes;
    } catch (error) {
      dispatch(addDrugTypeError(error.message));
      dispatch(setLoading(false)); // Set loading to false in case of an error
    }
  };

export const createDrugType = (drugType) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "post",
      url: "/drugTypes",
      baseURL: baseUrl,
      token: authToken,
      data: drugType,
    };

    const result = await apiService(config, dispatch);
    const drugTypeCreated = result?.response?.drugType;
    // Check if the response has a 'response' property
    if (drugTypeCreated) {
      dispatch(addDrugType(drugTypeCreated));
    } else {
      throw new Error("User canceled");
    }
  } catch (error) {
    throw error?.message;
  }
};

export const updateDrugType = (id, drugType) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "put",
      url: `/drugTypes/${id}`,
      baseURL: baseUrl,
      token: authToken,
      data: drugType,
    };

    const result = await apiService(config, dispatch);
    // Check if the response has a 'response' property
    if (!result?.response) {
      throw new Error("User canceled");
    }
  } catch (error) {
    throw error?.message;
  }
};

export const deleteDrugType = (id) => async (dispatch) => {
  if (typeof id !== "number") {
    return;
  }
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "delete",
      url: `/drugTypes/${id}`,
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await apiService(config, dispatch);
    dispatch(deleteDrugType({ id }));
  } catch (error) {
    console.error(error);
    dispatch(addDrugTypeError(error.message));
  }
};
