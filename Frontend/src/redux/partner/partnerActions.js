import { API_BASE_URL } from "../../config";
import apiService from "../../services/apiService";
import {
  setPartners,
  addPartner,
  // addPartnerUser,
  setPartnerDetail,
  // updatePartnerDetail,
  // destoryPartner,
  setStates,
  setPartnerUsers,
  // addError,
  setCount,
  setUserCount,
  setLoading,
  setShippings,
  setPartnersList
} from "./partnerSlice";
export const GET_URL = `${API_BASE_URL}/admin/partners`;
export const fetchStates = () => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "get",
      url: "/partners/states",
      baseURL: baseUrl,
      token: authToken,
    };
    const result = await apiService(config, dispatch);
    dispatch(setStates(result.response));

  } catch (error) {
    console.error(error);
  }
};

export const fetchPartners =
  (
    srt = "admin",
    page,
    pageSize,
    searchFilters,
    sortConfig = {
      column: "",
      order: "asc",
    }
  ) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true)); // Set loading to true when starting the request
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/${srt}`;
      // Check if the search query is at least 3 characters long
      if (searchFilters?.name && searchFilters?.name?.length < 3) {
        // Do not make the API call if the search query is too short
        dispatch(setLoading(false));
        return;
      }
      const config = {
        method: "get",
        url: "/partners",
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
      console.log("page", page);
      console.log("pageSize", pageSize);
      const result = await apiService(config, dispatch);

      console.log("result ", result);
      dispatch(setPartners(result?.response?.partners));
      dispatch(setCount(result?.response?.totalCount));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false)); // Set loading to false in case of an error
    }
  };

export const fetchUsers =
  (page, pageSize, searchFilters, sortConfig) => async (dispatch) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/admin`;
      // Check if the search query is at least 3 characters long
      if (searchFilters.name && searchFilters.name.length < 3) {
        // Do not make the API call if the search query is too short
        return;
      }
      if (searchFilters.email && searchFilters.email.length < 3) {
        // Do not make the API call if the search query is too short
        return;
      }

      // Check if the search id is at least 1 integer long
      if (searchFilters.id && searchFilters.id.length < 1) {
        // Do not make the API call if the search query is too short
        return;
      }
      dispatch(setLoading(true)); // Set loading to true when starting the request
      const config = {
        method: "get",
        url: "/partners/users",
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

      dispatch(setPartnerUsers(result.response?.users));
      dispatch(setUserCount(result.response?.totalCount));
      dispatch(setLoading(false)); // Set loading to false when the request is complete
    } catch (error) {
      dispatch(setLoading(false)); // Set loading to false in case of an error
    }
  };
export const fetchSpecificUsers =
  (page, pageSize, searchFilters, sortConfig, partnerId) =>
  async (dispatch) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/partner`;
      // Check if the search query is at least 3 characters long
      if (searchFilters.name && searchFilters.name.length < 3) {
        // Do not make the API call if the search query is too short
        return;
      }
      if (searchFilters.email && searchFilters.email.length < 3) {
        // Do not make the API call if the search query is too short
        return;
      }

      // Check if the search id is at least 2 characters long
      if (searchFilters.id && searchFilters.id.length < 2) {
        // Do not make the API call if the search query is too short
        return;
      }
      dispatch(setLoading(true)); // Set loading to true when starting the request
      const config = {
        method: "get",
        url: "/users/specific/partner",
        baseURL: baseUrl,
        token: authToken,
        params: {
          page,
          pageSize,
          ...searchFilters,
          sortBy: sortConfig.column,
          sortOrder: sortConfig.order,
          partnerId,
        },
      };
      const result = await apiService(config, dispatch);

      dispatch(setPartnerUsers(result.response?.users?.rows));
      dispatch(setUserCount(result.response?.users?.count));
      dispatch(setLoading(false)); // Set loading to false when the request is complete
    } catch (error) {
      dispatch(setLoading(false)); // Set loading to false in case of an error
    }
  };

export const fetchAllUsers =
  (searchFilters, sortConfig) => async (dispatch) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/admin`;
      // Check if the search query is at least 3 characters long
      if (searchFilters.name && searchFilters.name.length < 3) {
        // Do not make the API call if the search query is too short
        return;
      }
      if (searchFilters.email && searchFilters.email.length < 3) {
        // Do not make the API call if the search query is too short
        return;
      }

      // Check if the search id is at least 2 characters long
      if (searchFilters.id && searchFilters.id.length < 2) {
        // Do not make the API call if the search query is too short
        return;
      }
      dispatch(setLoading(true)); // Set loading to true when starting the request
      const config = {
        method: "get",
        url: "/users",
        baseURL: baseUrl,
        token: authToken,
        params: {
          ...searchFilters,
          sortBy: sortConfig.column,
          sortOrder: sortConfig.order,
        },
      };
      const result = await apiService(config, dispatch);
      dispatch(setPartnerUsers(result.response?.users));
      dispatch(setLoading(false));
      //localStorage.setItem("partner-users", JSON.stringify(result.response));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };


export const fetchPartnerUsers = (partnerId) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "get",
      url: "/partners/" + partnerId + "/users",
      baseURL: baseUrl,
      token: authToken,
    };
    const result = await apiService(config, dispatch);
    dispatch(setPartnerUsers(result.response));
    //localStorage.setItem("partner-users", JSON.stringify(result.response));
  } catch (error) {
    console.error(error);
  }
};
export const fetchPartnerDetails = (partnerId) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "get",
      url: "/partners/" + partnerId + "/detail",
      baseURL: baseUrl,
      token: authToken,
    };
    const result = await apiService(config, dispatch);
    dispatch(setPartnerDetail(result.response));
    //localStorage.setItem("partner-users", JSON.stringify(result.response));
  } catch (error) {
    console.error(error);
  }
};

export const fetchPartnerUserDetails = (userId) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "get",
      url: "/users/" + userId,
      baseURL: baseUrl,
      token: authToken,
    };
    const result = await apiService(config, dispatch);
    dispatch(setPartnerDetail(result.response.user));
    //localStorage.setItem("partner-users", JSON.stringify(result.response));
  } catch (error) {
    console.error(error);
  }
};

export const createPartner = (partner) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "post",
      url: "/partners",
      baseURL: baseUrl,
      token: authToken,
      data: partner,
    };

    const result = await apiService(config, dispatch);
    if (result && result.response) {
      dispatch(addPartner(result.response));
    } else {
      throw new Error("User canceled");
    }
  } catch (error) {
    throw error?.message;
  }
};

export const updatePartner = (id, partner) => async (dispatch) => {
  const authToken = JSON.parse(localStorage.getItem("token"));
  const baseUrl = `${API_BASE_URL}/admin`;

  const config = {
    method: "PUT",
    url: "/partners/" + id,
    baseURL: baseUrl,
    token: authToken,
    data: partner,
  };
  try {
    const result = await apiService(config, dispatch);
    //dispatch(updatePartnerDetail(result.response));
    if (!result?.response) {
      throw new Error("User canceled");
    }
  } catch (error) {
    throw error?.message;
  }
};

export const deletePartner = (id) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "DELETE",
      url: "/partners/" + id,
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await apiService(config, dispatch);
    //dispatch(destoryPartner({ partners: partners, id: id }));
  } catch (error) {
    console.log(error);
    //throw error?.message;
  }
};
export const deleteUser = (id) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "DELETE",
      url: "/users/" + id,
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await apiService(config, dispatch);
    //dispatch(destoryPartner({ partners: partners, id: id }));
  } catch (error) {
    console.log(error);
    //throw error?.message;
  }
};

export const createPartnerUser = (user) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const { ...userData } = user;
    const config = {
      method: "post",
      url: "/partners/" + user.partnerId + "/users",
      baseURL: baseUrl,
      token: authToken,
      data: userData,
    };

    const result = await apiService(config, dispatch);
    //dispatch(addPartnerUser(result.data));
    if (!result?.response) {
      throw new Error("User canceled");
    }
  } catch (error) {
    throw error?.message;
  }
};

export const  updatePartnerUser = (id, user) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "PUT",
      url: "/users/" + id,
      baseURL: baseUrl,
      token: authToken,
      data: user,
    };
    const result = await apiService(config, dispatch);
    if (!result?.response) {
      throw new Error("User canceled");
    }
  } catch (error) {
    throw error?.message;
  }
};

export const deletePartnerUser = (id) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "DELETE",
      url: "/partners/" + id + "/user",
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await apiService(config, dispatch);
  } catch (error) {
    console.log(error);
  }
};
export const deleteShippingDetail = (id) => async (dispatch) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const baseUrl = `${API_BASE_URL}/admin`;

    const config = {
      method: "DELETE",
      url: "/partners/" + id + "/removeShippingDetail",
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await apiService(config, dispatch);
  } catch (error) {
    console.log(error);
  }
};

export const fetchShippings =
  (srt = "admin") =>
  async (dispatch) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = API_BASE_URL + `/${srt}`;

      const config = {
        method: "get",
        url: "/shippings",
        baseURL: baseUrl,
        token: authToken,
      };
      const result = await apiService(config, dispatch);
      dispatch(setShippings(result.response));
    } catch (error) {
      console.error(error);
    }
  };

  export const createInternalUser = (user) => async (dispatch) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/admin`;
  
      const { ...userData } = user;
      const config = {
        method: "post",
        url: "/users/internal/staff",
        baseURL: baseUrl,
        token: authToken,
        data: userData,
      };
  
      const result = await apiService(config, dispatch);
      //dispatch(addPartnerUser(result.data));
      if (!result?.response) {
        throw new Error("User canceled");
      }
    } catch (error) {
      throw error?.message;
    }
  };

  export const  updateInternalUser = (id, user) => async (dispatch) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/admin`;
  
      const config = {
        method: "PUT",
        url: "/users/internal/" + id,
        baseURL: baseUrl,
        token: authToken,
        data: user,
      };
      const result = await apiService(config, dispatch);
      if (!result?.response) {
        throw new Error("User canceled");
      }
    } catch (error) {
      throw error?.message;
    }
  };
  // export const fetchAllInternalUsers =
  // (searchFilters, sortConfig) => async (dispatch) => {
  //   try {
  //     const authToken = JSON.parse(localStorage.getItem("token"));
  //     const baseUrl = `${API_BASE_URL}/admin`;
  //     // Check if the search query is at least 3 characters long
  //     if (searchFilters.name && searchFilters.name.length < 3) {
  //       // Do not make the API call if the search query is too short
  //       return;
  //     }
  //     if (searchFilters.email && searchFilters.email.length < 3) {
  //       // Do not make the API call if the search query is too short
  //       return;
  //     }

  //     // Check if the search id is at least 2 characters long
  //     if (searchFilters.id && searchFilters.id.length < 2) {
  //       // Do not make the API call if the search query is too short
  //       return;
  //     }
  //     dispatch(setLoading(true)); // Set loading to true when starting the request
  //     const config = {
  //       method: "get",
  //       url: "/users",
  //       baseURL: baseUrl,
  //       token: authToken,
  //       params: {
  //         ...searchFilters,
  //         sortBy: sortConfig.column,
  //         sortOrder: sortConfig.order,
  //       },
  //     };
  //     const result = await apiService(config, dispatch);
  //     dispatch(setPartnerUsers(result.response?.users));
  //     dispatch(setLoading(false));
  //     //localStorage.setItem("partner-users", JSON.stringify(result.response));
  //   } catch (error) {
  //     dispatch(setLoading(false));
  //   }
  // };
  export const fetchAllInternalUsers =
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
      if (search.email && search.email.length < 3) {
        // Do not make the API call if the search query is too short
        return;
      }
      if (search.id && search.id.length < 3) {
        // Do not make the API call if the search query is too short
        return;
      }
      // const authToken = JSON.parse(localStorage.getItem("token"));
      // const baseUrl = `${API_BASE_URL}/${srt}`;

      const config = {
        method: "get",
        url: "/users",
        baseURL: baseUrl,
        token: authToken,
        params: {
          page,
          pageSize,
          ...search,
          sortBy: sortConfig.column,
          sortOrder: sortConfig.order,
        },
      };
      const result = await apiService(config, dispatch);
      dispatch(setPartnerUsers(result?.response?.users));
      dispatch(setCount(result?.response?.totalCount));
      dispatch(setLoading(false)); 
      return result?.response?.users;
    } catch (error) {
      console.error(error);
      dispatch(setLoading(false)); 
    }
      
  };
  
  export const fetchPartnersAll =() =>

  async (dispatch) => {
    
    try {
    
      
      dispatch(setLoading(true)); // Set loading to true when starting the request
      const authToken = JSON.parse(localStorage.getItem("token"));
      const baseUrl = `${API_BASE_URL}/admin`;
      // Check if the search query is at least 3 characters long
      
      const config = {
        method: "get",
        url: "/partners/list",
        baseURL: baseUrl,
        token: authToken,
      };
      const result = await apiService(config, dispatch);
      console.log(result?.response.partners)
      dispatch(setPartnersList(result?.response.partners));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false)); // Set loading to false in case of an error
    }
  };
