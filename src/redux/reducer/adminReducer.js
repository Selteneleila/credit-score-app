import {
  DELETE_ADMIN_FAILURE,
  DELETE_ADMIN_REQUEST,
  DELETE_ADMIN_SUCCESS,
  FETCH_ADMIN_BY_ID_FAILURE,
  FETCH_ADMIN_BY_ID_REQUEST,
  FETCH_ADMIN_BY_ID_SUCCESS,
  GET_ADMIN_LIST_FAILURE,
  GET_ADMIN_LIST_REQUEST,
  GET_ADMIN_LIST_SUCCESS,
  POST_ADMIN_FAILURE,
  POST_ADMIN_REQUEST,
  POST_ADMIN_SUCCESS,
  UPDATE_ADMIN_FAILURE,
  UPDATE_ADMIN_REQUEST,
  UPDATE_ADMIN_SUCCESS,
} from "../action/actionType";

const initialState = {
  admins: [],
  selectedAdmin: {},
  admin: null,
  adminData: null,
  loading: false,
  isDeleting: false,
  isLoading: false,
  error: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMIN_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ADMIN_LIST_SUCCESS:
      return {
        ...state,
        admins: action.payload,
        loading: false,
        error: null,
      };
    case GET_ADMIN_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_ADMIN_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_ADMIN_BY_ID_SUCCESS:
      return {
        ...state,
        selectedAdmin: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_ADMIN_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case DELETE_ADMIN_REQUEST:
      return {
        ...state,
        isDeleting: true,
      };
    case DELETE_ADMIN_SUCCESS:
      const updatedadmin = state.admins.filter(
        (admin) => admin.id !== action.payload
      );
      return { ...state, admins: updatedadmin, isDeleting: false };
    case DELETE_ADMIN_FAILURE:
      return { ...state, error: action.payload, isDeleting: false };
    case POST_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        ADMIN: action.payload,
        error: "",
      };
    case POST_ADMIN_FAILURE:
      return {
        ...state,
        loading: false,
        ADMIN: null,
        error: action.payload,
      };
    case UPDATE_ADMIN_REQUEST:
      return {
        ...state,
        error: null,
      };
    case UPDATE_ADMIN_SUCCESS:
      const { payload } = action;
      return {
        ...state,
        error: null,
        admin: payload,
        admins: state.admins.map((admin) =>
          admin.id === payload.id ? payload : admin
        ),
      };
    case UPDATE_ADMIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case "FETCH_ADMIN_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        adminData: action.payload,
        error: null,
      };
    case "FETCH_ADMIN_DATA_ERROR":
      return {
        ...state,
        loading: false,
        adminData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
