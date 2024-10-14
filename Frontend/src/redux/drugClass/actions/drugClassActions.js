import { API_BASE_URL } from "../../../config";
import apiService from "../../../services/apiService";
import {
  setDrugClasses,
  addDrugClass,
  _updateDrugClass,
  _deleteDrugClass,
  addDrugClassError,
  setCount,
  setLoading,
} from "../reducers/drugClassSlice";
export const fetchDrugClasses =
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
      // Check if the search query is at least 3 characters long
      if (search && search.length < 2) {
        // Do not make the API call if the search query is too short
        return;
      }

      const config = {
        method: "get",
        url: "/drugClasses",
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
      dispatch(setDrugClasses(result?.response?.drugClasses));
      dispatch(setCount(result?.response?.totalCount));
      dispatch(setLoading(false)); // Set loading to false when the request is complete
      return result?.response?.drugClasses;
    } catch (error) {
      console.log(error);
      //      dispatch(addDrugCategoryError(error.message));
      dispatch(setLoading(false)); // Set loading to false in case of an error
    }
  };

export const createDrugClass = (drugCategory) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "post",
      url: "/drugClasses",
      baseURL: baseUrl,
      token: authToken,
      data: drugCategory,
    };

    const result = await apiService(config, dispatch);

    const createClass = result?.response?.drugClass;

    if (createClass) {
      dispatch(addDrugClass(createClass));
    } else {
      throw new Error("User canceled");
    }
  } catch (error) {
    throw error?.message;
  }
};

export const updateDrugClass = (id, drugCategory) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "put",
      url: `/drugClasses/${id}`,
      baseURL: baseUrl,
      token: authToken,
      data: drugCategory,
    };

    const result = await apiService(config, dispatch);
    const updatedClass = result?.response?.DrugClass;
    if (!updatedClass) {
      throw new Error("User canceled");
    }
  } catch (error) {
    throw error?.message;
  }
};

export const deleteDrugClass = (id) => async (dispatch) => {
  if (typeof id !== "number") {
    return;
  }
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "delete",
      url: `/drugClasses/${id}`,
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await apiService(config, dispatch);
    dispatch(_deleteDrugClass({ id }));
  } catch (error) {
    console.error(error);
    dispatch(addDrugClassError(error.message));
  }
};
