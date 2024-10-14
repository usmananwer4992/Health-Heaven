import { createSlice } from "@reduxjs/toolkit";
import apiService from "../services/apiService";
import { API_BASE_URL } from "../config";
export const fetchAllRoles = (sortConfig) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin/`;
    dispatch(setLoading(true));
    const config = {
      method: "get",
      url: "roles",
      baseURL: baseUrl,
      token: authToken,
      params: {
        sortBy: sortConfig.column,
        sortOrder: sortConfig.order,
      },
    };
    const result = await apiService(config, dispatch);
    await new Promise((resolve) => setTimeout(resolve, 700));
    dispatch(setAllRoles(result.response.roles));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
  }
};
export const fetchRolePartnerUsers = () => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin/`;

    const config = {
      method: "get",
      url: "users/role/PartnerUsers",
      baseURL: baseUrl,
      token: authToken,
    };
    const result = await apiService(config, dispatch);
    const selectArray = result.response.users.map((item) => {
      const partner = item.Partner;
      return {
        id: partner.id,
        name: partner.name,
      };
    });
    dispatch(setAllPartnersForAccessEdit(selectArray));
  } catch (error) {
    dispatch(setLoading(false));
  }
};

export const createRolePermissions =
  ({ partnerId, roleId, rolePermissions, navigate }) =>
  async () => {
    console.log({ roleId, rolePermissions, navigate });
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/admin/`;

      const config = {
        method: "post",
        url: "roles/role_permissions",
        baseURL: baseUrl,
        token: authToken,
        data: { roleId, partnerId, rolePermissions },
      };
      await apiService(config);
      navigate.push("/app/admin/access/types");
    } catch (error) {
      console.error(error);
    }
  };
export const fetchRoleById = (id,str) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/`;
    if(str === undefined){
      str = "admin"
    }

    const config = {
      method: "get",
      url: `${str}/roles/${id}`,
      baseURL: baseUrl,
      token: authToken,
    };
    const result = await apiService(config, dispatch);
    config.url = "permission";
    const per = await apiService(config);
    const permissions = per.response.permissions;

    dispatch(setUniquePermissions(permissions));
    dispatch(setRole(result.response.role));
    dispatch(setModulePermissions({ permissions, role: result.response.role }));
  } catch (error) {
    console.error(error);
  }
};

const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    allRoles: [],
    role: {},
    rolePermissions: {},
    modules: [],
    uniquePermissions: [],
    modulePermissions: {},
    allPartnersForAccessEdit: [],
    loading: false,
  },
  reducers: {
    setAllRoles: (state, action) => {
      const updatedRoles = action.payload.filter((item)=> item.slug !== "SUPER-ADMIN")
      state.allRoles = updatedRoles;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setRolePermissions: (state, action) => {
      const { module, permission } = action.payload;
      console.log(action.payload);
      state.modulePermissions[module][permission] =
        !state.modulePermissions[module][permission];
      // state.modulePermissions = action.payload;
    },
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setModulePermissions: (state, action) => {
      const modulePermissions = {};
      action.payload.permissions.forEach((permission) => {
        const parts = permission.name.split("_");
        const moduleName = parts.length > 1 ? parts[1] : "default";
        const permissionName = parts[0];

        if (!modulePermissions[moduleName]) {
          modulePermissions[moduleName] = {};
        }

        modulePermissions[moduleName][permissionName] =
          action.payload.role.permission.some(
            (assignedPermission) => assignedPermission.id === permission.id
          );
      });

      state.modulePermissions = modulePermissions;
      state.modules = Object.keys(modulePermissions);
    },
    setUniquePermissions: (state, action) => {
      const allPermissionNames = action.payload.map(
        (permission) => permission.name.split("_")[0]
      );
      state.uniquePermissions = Array.from(new Set(allPermissionNames));
    },
    setAllPartnersForAccessEdit: (state, action) => {
      state.allPartnersForAccessEdit = action.payload;
    },
  },
});

export const {
  setAllRoles,
  setRole,
  setRolePermissions,
  setModules,
  setModulePermissions,
  setUniquePermissions,
  setAllPartnersForAccessEdit,
  setLoading,
} = rolesSlice.actions;

export default rolesSlice.reducer;
