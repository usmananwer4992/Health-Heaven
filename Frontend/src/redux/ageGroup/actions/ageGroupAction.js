import { API_BASE_URL } from "../../../config";
import apiService from "../../../services/apiService";
import {
  setAgeGroups,
  addAgeGroups,
  _updateAgeGroup,
  _deleteAgeGroup,
  addAgeGroupsError,
  setCount,
  setLoading,
} from "../reducers/ageGroupSlice";
export const fetchAgeGroups =
  (portal = "admin", page, pageSize, search, sortColumn, sortOrder) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true)); // Set loading to true when starting the request
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/${portal}`;

      const config = {
        method: "get",
        url: "/ageGroups",
        baseURL: baseUrl,
        token: authToken,
        params: { page, pageSize, search, sortBy: sortColumn, sortOrder },
      };
      const result = await apiService(config, dispatch);
      dispatch(setAgeGroups(result?.response?.ageGroups));
      dispatch(setCount(result?.response?.totalCount));
      dispatch(setLoading(false)); // Set loading to false when the request is complete
    } catch (error) {
      dispatch(addAgeGroupsError(error.message));
      dispatch(setLoading(false)); // Set loading to false in case of an error
    }
  };

export const createAgeGroup = (ageGroups) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "post",
      url: "/ageGroups",
      baseURL: baseUrl,
      token: authToken,
      data: ageGroups,
    };

    const result = await apiService(config, dispatch);

    const createdAgeGroup = result?.response?.ageGroup;

    if (createdAgeGroup) {
      dispatch(addAgeGroups(createdAgeGroup));
      return createdAgeGroup;
    } else {
      throw new Error("User canceled");
    }
  } catch (error) {
    throw error?.message;
  }
};

export const updateAgeGroup = (id, ageGroup) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "put",
      url: `/ageGroups/${id}`,
      baseURL: baseUrl,
      token: authToken,
      data: ageGroup,
    };

    const result = await apiService(config, dispatch);
    const updatedAgeGroup = result?.response?.ageGroup;

    if (!updatedAgeGroup) {
      throw new Error("User canceled");
    }
  } catch (error) {
    throw error?.message;
  }
};

export const deleteAgeGroup = (id) => async (dispatch) => {
  if (typeof id !== "number") {
    return;
  }
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "delete",
      url: `/ageGroups/${id}`,
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await apiService(config, dispatch);
    dispatch(_deleteAgeGroup({ id }));
  } catch (error) {
    console.error(error);
    dispatch(addAgeGroupsError(error.message));
  }
};
