import { API_BASE_URL } from "../../../config";
import apiService from "../../../services/apiService";
import {
  setDrugForms,
  addDrugForm,
  _updateDrugForm,
  _deleteDrugForm,
  addDrugFormError,
  setCount,
  setLoading,
} from "../reducers/drugFormSlice";
export const fetchDrugForms =
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
        url: "/drugForms",
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
      dispatch(setDrugForms(result?.response?.drugForms));
      dispatch(setCount(result?.response?.totalCount));
      dispatch(setLoading(false)); // Set loading to false when the request is complete
      return result?.response?.drugForms;
    } catch (error) {
      dispatch(addDrugFormError(error.message));
      dispatch(setLoading(false)); // Set loading to false in case of an error
    }
  };

export const createDrugForm = (drugForm) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "post",
      url: "/drugForms",
      baseURL: baseUrl,
      token: authToken,
      data: drugForm,
    };

    const result = await apiService(config, dispatch);

    const createdForm = result?.response?.drugForm;

    if (createdForm) {
      dispatch(addDrugForm(createdForm));
    } else {
      throw new Error("User canceled");
    }
  } catch (error) {
    throw error?.message;
  }
};

export const updateDrugForm = (id, drugForm) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "put",
      url: `/drugForms/${id}`,
      baseURL: baseUrl,
      token: authToken,
      data: drugForm,
    };

    const result = await apiService(config, dispatch);
    const updatedForm = result?.response?.drugForm;
    //dispatch(_updateDrugForm(result?.data));
    if (!updatedForm) {
      throw new Error("User canceled");
    }
  } catch (error) {
    throw error?.message;
  }
};

export const deleteDrugForm = (id) => async (dispatch) => {
  if (typeof id !== "number") {
    return;
  }
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "delete",
      url: `/drugForms/${id}`,
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await apiService(config, dispatch);
    dispatch(deleteDrugForm({ id }));
  } catch (error) {
    console.error(error);
    dispatch(addDrugFormError(error.message));
  }
};
