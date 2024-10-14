import { API_BASE_URL } from "../../../config";
import apiService from "../../../services/apiService";
import {
  setPharmacies,
  addPharmacy,
  _updatePharmacy,
  _deletePharmacy,
  addPharmacyError,
  setCount,
  setLoading,
} from "../reducers/pharmacySlice";

export const fetchPharmacies =
  (page, pageSize, searchFilters, sortConfig) => async (dispatch) => {
    try {
      dispatch(setLoading(true)); // Set loading to true when starting the request
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/admin`;
      // Check if the search query is at least 3 characters long
      if (searchFilters.name && searchFilters.name.length < 3) {
        // Do not make the API call if the search query is too short
        return;
      }
      if (searchFilters.phone && searchFilters.phone.length < 3) {
        // Do not make the API call if the search query is too short
        return;
      }

      // Check if the search id is at least 2 characters long
      if (searchFilters.id && searchFilters.id.length < 1) {
        // Do not make the API call if the search query is too short
        return;
      }

      const config = {
        method: "get",
        url: "/pharmacies",
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

      dispatch(setPharmacies(result?.response?.pharmacies));
      dispatch(setCount(result?.response?.totalCount));
      dispatch(setLoading(false)); // Set loading to false when the request is complete
    } catch (error) {
      dispatch(addPharmacyError(error.message));
      dispatch(setLoading(false)); // Set loading to false in case of an error
    }
  };

export const createPharmacies = (data) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "post",
      url: "/pharmacies",
      baseURL: baseUrl,
      token: authToken,
      data: data,
    };

    const result = await apiService(config, dispatch);
    const pharmacyCreated = result?.response?.pharmacy;

    if (pharmacyCreated) {
      dispatch(addPharmacy(pharmacyCreated));
    } else {
      throw new Error("User canceled");
    }
  } catch (error) {
    throw error?.message;
  }
};

export const updatePharmacy = (id, data) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "put",
      url: `/pharmacies/${id}`,
      baseURL: baseUrl,
      token: authToken,
      data: data,
    };

    const result = await apiService(config, dispatch);
    //    dispatch(_updatePharmacy(result?.data));
    const updatedPharmacy = result?.response?.pharmacy;

    if (!updatedPharmacy) {
      throw new Error("User canceled");
    }
  } catch (error) {
    throw error?.message;
  }
};

export const deletePharmacy = (id) => async (dispatch) => {
  if (typeof id !== "number") {
    return;
  }
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "delete",
      url: `/pharmacies/${id}`,
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await apiService(config, dispatch);
    dispatch(_deletePharmacy({ id }));
  } catch (error) {
    console.error(error);
    dispatch(addPharmacyError(error.message));
  }
};
