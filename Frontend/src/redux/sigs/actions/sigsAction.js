import apiService from "../../../services/apiService";
import { API_BASE_URL } from "../../../config";
import {
  setSigs,
  setSelectedSigs,
  addSigs,
  _updateSigs,
  _deleteSigs,
  addSigsError,
  setCount,
  setLoading,
} from "../reducers/sigsSlice";

export const fetchSigs =
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
        url: "/sigs",
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
      dispatch(setSigs(result?.response?.Sigs));
      dispatch(setCount(result?.response?.totalCount));
      dispatch(setLoading(false)); // Set loading to false when the request is complete
    } catch (error) {
      dispatch(addSigsError(error.message));
      dispatch(setLoading(false)); // Set loading to false in case of an error
    }
  };

export const createSigs = (sig) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = API_BASE_URL + "/admin";

    const config = {
      method: "post",
      url: "/sigs",
      baseURL: baseUrl,
      token: authToken,
      data: sig,
    };

    const result = await apiService(config, dispatch);
    const sigCreated = result?.response?.sig;
    if (sigCreated) {
      dispatch(addSigs(sigCreated));
    } else {
      throw new Error("User canceled");
    }
  } catch (error) {
    throw error?.message;
    //dispatch(addDrugCategoryError(error.message));
  }
};

export const updateSigs = (id, sigs) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = API_BASE_URL + "/admin";

    const config = {
      method: "put",
      url: `/sigs/${id}`,
      baseURL: baseUrl,
      token: authToken,
      data: sigs,
    };

    const result = await apiService(config, dispatch);
    const updatedSig = result?.response?.sig;

    if (!updatedSig) {
      throw new Error("User canceled");
    }
  } catch (error) {
    // console.error(error);
    // dispatch(addDrugCategoryError(error.message));
    throw error?.message;
  }
};

export const deleteSigs = (id) => async (dispatch) => {
  if (typeof id !== "number") {
    return;
  }
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = API_BASE_URL + "/admin";

    const config = {
      method: "delete",
      url: `/sigs/${id}`,
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await apiService(config, dispatch);
    dispatch(deleteSigs({ id }));
  } catch (error) {
    console.error(error);
    dispatch(addSigsError(error.message));
  }
};
