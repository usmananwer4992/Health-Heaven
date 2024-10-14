import { createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../config";

import apiService from "../services/apiService";
export const fetchPermissions = () => async (dispatch) => {
  try {
    const baseUrl = API_BASE_URL;

    const config = {
      method: "get",
      url: "permission",
      baseURL: baseUrl,
    };
    const result = await apiService(config, dispatch);
    const permissions = result.response.permissions;
    dispatch(setPermissions(permissions));
    localStorage.setItem("permissions", JSON.stringify(permissions));
  } catch (error) {
    console.error(error);
  }
};

const allPermissionsSlice = createSlice({
  name: "allPermissions",
  initialState: {
    permissions: [],
  },
  reducers: {
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
  },
});

export const { setPermissions } = allPermissionsSlice.actions;

export default allPermissionsSlice.reducer;
