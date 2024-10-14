import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_SUCCESS_MESSAGE,
  LOGOUT,
  SET_LOGOUT_SUCCESS_MESSAGE,
  RESET_ERROR_MESSAGE,
} from "./actionTypes";
import partnerSlice from "./partner/partnerSlice";
import allPermissionsSlice from "./allPermissionsSlice";
import drugCategorySlice from "./drugCategory/reducers/drugCategorySlice";
import rolesSlice from "./rolesSlice";
import drugClassSlice from "./drugClass/reducers/drugClassSlice";
import drugFormSlice from "./drugForm/reducers/drugFormSlice";
import drugTypeSlice from "./drugType/reducers/drugTypeSlice";
import customerSlice from "./customer.slice";
import drugsSlice from "./drugs/reducers/drugsSlice";
import ageGroupSlice from "./ageGroup/reducers/ageGroupSlice";
import transferSlice from "./transfer/transferSlice";
import pharmacySlice from "./pharmacies/reducers/pharmacySlice";
import sigsSlice from "./sigs/reducers/sigsSlice";
import ordersSlice from "./orders/reducers/orderSlice";
const initialUserState = {
  user:
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  token:
    localStorage.getItem("token") !== null
      ? localStorage.getItem("token")
      : null,
  errorMessage: null,
  logoutSuccessMessage: null,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        errorMessage: null,
        logoutSuccessMessage: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        logoutSuccessMessage: null,
        errorMessage: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("activeMenu");
      localStorage.removeItem("activeSubMenu");
      localStorage.removeItem("activeLevel");
      return {
        ...state,
        user: null,
        token: null,
        logoutSuccessMessage: "Logout successful",
      };
    case SET_LOGOUT_SUCCESS_MESSAGE:
      return {
        ...state,
        user: null,
        token: null,
        logoutSuccessMessage: action.payload,
      };
    case RESET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: null,
      };
    default:
      return state;
  }
};

const successMessageReducer = (state = null, action) => {
  switch (action.type) {
    case SET_SUCCESS_MESSAGE:
      return action.payload;
    case LOGIN_SUCCESS:
    case LOGIN_FAILURE:
      return null; // Clear success message on login success/failure
    default:
      return state;
  }
};

// Configure Redux Persist for the userReducer
const userPersistConfig = {
  key: "user",
  storage,
};

// Create a persisted reducer for the userReducer
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const rootReducer = combineReducers({
  user: persistedUserReducer, // Use the persisted userReducer
  partners: partnerSlice,
  successMessage: successMessageReducer,
  allPermissions: allPermissionsSlice,
  drugCategory: drugCategorySlice,
  drugClass: drugClassSlice,
  drugForm: drugFormSlice,
  drugType: drugTypeSlice,
  roles: rolesSlice,
  customer: customerSlice,
  drugs: drugsSlice,
  ageGroup: ageGroupSlice,
  transfers: transferSlice,
  pharmacies: pharmacySlice,
  sigs: sigsSlice,
  orders: ordersSlice,
});

export default rootReducer;
