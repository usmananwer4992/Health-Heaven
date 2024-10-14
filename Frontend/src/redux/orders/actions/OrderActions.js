import apiService from "../../../services/apiService";
import { API_BASE_URL } from "../../../config.js";
import {
  setOrders,
  addOrders,
  _updateOrders,
  _deleteOrders,
  addOrdersError,
  setCount,
  setLoading,
  setOrderDetail,
  setOrderStatuses,
  orderPrequesite,
} from "../reducers/orderSlice";

export const fetchOrders =
  (page, pageSize, searchFilters, sortConfig, portal) => async (dispatch) => {
    try {
      dispatch(setLoading(true)); // Set loading to true when starting the request
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/${portal}`;

      const config = {
        method: "get",
        url: "/orders",
        baseURL: baseUrl,
        token: authToken,
        params: {
          page,
          pageSize,
          ...searchFilters,
          sortBy: sortConfig.column,
          sortOrder: sortConfig.order,
          // partner: partner ? partner : null
        },
      };
      const result = await apiService(config, dispatch);
      console.log(result.response.Orders);
      dispatch(setOrders(result?.response?.Orders));
      dispatch(setCount(result?.response?.totalCount));
      dispatch(setLoading(false)); // Set loading to false when the request is complete
    } catch (error) {
      dispatch(addOrdersError(error.message));
      dispatch(setLoading(false)); // Set loading to false in case of an error
    }
  };

export const createOrders =
  (order, history, path, srt = "admin") =>
  async (dispatch) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/${srt}`;

      const config = {
        method: "post",
        url: "/orders",
        baseURL: baseUrl,
        token: authToken,
        data: order,
      };

      const result = await apiService(config, dispatch);
      dispatch(addOrders(result.response));
      history.push(path);
    } catch (error) {
      throw error?.message;
      //dispatch(addDrugCategoryError(error.message));
    }
  };

export const updateOrders =
  (id, history, orders, portal) => async (dispatch) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = API_BASE_URL + "/admin";

      const config = {
        method: "put",
        url: `/orders/${id}`,
        baseURL: baseUrl,
        token: authToken,
        data: orders,
      };

      const result = await apiService(config, dispatch);
      dispatch(_updateOrders(result.data));
    } catch (error) {
      // console.error(error);
      // dispatch(addDrugCategoryError(error.message));
      throw error?.message;
    }
  };
export const updateShipping =
  (id, history, orders, portal) => async (dispatch) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = API_BASE_URL + "/admin";

      const config = {
        method: "put",
        url: `/orders/` + id + `/details`,
        baseURL: baseUrl,
        token: authToken,
        data: orders,
      };

      const result = await apiService(config, dispatch);
      dispatch(_updateOrders(result.data));
      
    } catch (error) {
      // console.error(error);
      // dispatch(addDrugCategoryError(error.message));
      throw error?.message;
    }
  };
// export const updateOrders = (id, history,orders, portal) => async (dispatch) => {
//   console.log({orders})
//   try {
//     const authToken = JSON.parse(localStorage.getItem("token"));
//     const baseUrl = `${API_BASE_URL}/${portal}`;
//     const config = {
//       method: "put",
//       url: `/orders/${id}`,
//       baseURL: baseUrl,
//       token: authToken,
//       data: orders,
//     };

//     const result = await apiService(config, dispatch);
//     dispatch(_updateOrders(result.data));
//     if (location.pathname.split("/").includes("partner")) {
//       history.push('/app/partner/orders')
//     } else{
//         history.push('/app/admin/orders')
//       }

//   } catch (error) {
//     // console.error(error);
//     // dispatch(addDrugCategoryError(error.message));
//     throw error?.message;
//   }
// };

// export const updateShipping = (id, history,orders,path, portal) => async (dispatch) => {
//   console.log({orders})
//   try {
//     const authToken = JSON.parse(localStorage.getItem("token"));
//     const baseUrl = `${API_BASE_URL}/${portal}`;
//     const config = {
//       method: "put",
//       url: `/orders/${id}`,
//       baseURL: baseUrl,
//       token: authToken,
//       data: orders,
//     };

//     const result = await apiService(config, dispatch);
//     dispatch(_updateOrders(result.data));
//     history.push(path)
//     if (location.pathname.split("/").includes("partner")) {
//       history.push('/app/partner/orders')
//     } else{
//         history.push('/app/admin/orders')
//       }

//   } catch (error) {
//     // console.error(error);
//     // dispatch(addDrugCategoryError(error.message));
//     throw error?.message;
//   }
// };

export const deleteOrders = (id) => async (dispatch) => {
  if (typeof id !== "number") {
    return;
  }
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = API_BASE_URL + "/admin";

    const config = {
      method: "delete",
      url: `/orders/${id}`,
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await apiService(config, dispatch);
    dispatch(deleteOrders({ id }));
  } catch (error) {
    console.error(error);
    dispatch(addOrdersError(error.message));
  }
};

export const fetchOrderDetails = (id) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = API_BASE_URL + "/admin";

    const config = {
      method: "get",
      url: `/orders/${id}`,
      baseURL: baseUrl,
      token: authToken,
    };
    const result = await apiService(config, dispatch);
    dispatch(setOrderDetail(result.response));

    //localStorage.setItem("partner-users", JSON.stringify(result.response));
  } catch (error) {
    console.error(error);
  }
};

export const fetchStatuses = (id) => async (dispatch) => {
  if (typeof id !== "number") {
    return;
  }
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = API_BASE_URL + "/admin";

    const config = {
      method: "get",
      url: `/orders/status`,
      baseURL: baseUrl,
      token: authToken,
    };
    const result = await apiService(config, dispatch);
    dispatch(setOrderStatuses(result.response));
    //localStorage.setItem("partner-users", JSON.stringify(result.response));
  } catch (error) {
    console.error(error);
  }
};

export const getPrerequisite =
  (srt = "admin") =>
  async (dispatch) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/${srt}`;

      const config = {
        method: "get",
        url: "/orders/prerequisite",
        baseURL: baseUrl,
        token: authToken,
      };

      const result = await apiService(config, dispatch);
      dispatch(orderPrequesite(result.response));
    } catch (error) {
      throw error?.message;
      //dispatch(addDrugCategoryError(error.message));
    }
  };

export const fetchOrderView = (id) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = API_BASE_URL + "/admin";

    const config = {
      method: "get",
      url: `/orders/${id}`,
      baseURL: baseUrl,
      token: authToken,
    };
    const result = await apiService(config, dispatch);
    dispatch(setOrderDetail(result.response));
    //localStorage.setItem("partner-users", JSON.stringify(result.response));
  } catch (error) {
    console.error(error);
  }
};
