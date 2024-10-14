import { API_BASE_URL } from "../../../config";
import apiService from "../../../services/apiService";
import {
  setDrugCategories,
  addDrugCategory,
  _updateDrugCategory,
  _deleteDrugCategory,
  addDrugCategoryError,
  setCount,
  setLoading,
} from "../reducers/drugCategorySlice";
export const fetchDrugCategories =
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
      if (search && search.length < 3) {
        // Do not make the API call if the search query is too short
        return;
      }
      const config = {
        method: "get",
        url: "/drugCategories",
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
      dispatch(setDrugCategories(result?.response?.categories));
      dispatch(setCount(result?.response?.totalCount));
      dispatch(setLoading(false)); // Set loading to false when the request is complete
      return result?.response?.categories;
    } catch (error) {
      dispatch(addDrugCategoryError(error.message));
      dispatch(setLoading(false)); // Set loading to false in case of an error
    }
  };

export const createDrugCategory = (drugCategory) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "post",
      url: "/drugCategories",
      baseURL: baseUrl,
      token: authToken,
      data: drugCategory,
    };

    const result = await apiService(config, dispatch);

    const createCategory = result?.response?.category;

    if (createCategory) {
      dispatch(addDrugCategory(createCategory));
    } else {
      throw new Error("User canceled");
    }
  } catch (error) {
    throw error?.message;
  }
};

export const updateDrugCategory = (id, drugCategory) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "put",
      url: `/drugCategories/${id}`,
      baseURL: baseUrl,
      token: authToken,
      data: drugCategory,
    };

    const result = await apiService(config, dispatch);
    const updatedCategory = result?.response?.category;

    if (!updatedCategory) {
      throw new Error("User canceled");
    }
  } catch (error) {
    throw error?.message;
  }
};

export const deleteDrugCategory = (id) => async (dispatch) => {
  if (typeof id !== "number") {
    return;
  }
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "delete",
      url: `/drugCategories/${id}`,
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await apiService(config, dispatch);
    dispatch(deleteDrugCategory({ id }));
  } catch (error) {
    console.error(error);
    dispatch(addDrugCategoryError(error.message));
  }
};
