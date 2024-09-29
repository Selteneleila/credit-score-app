import {
  DELETE_ROLE_FAILURE,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  GET_ROLES_LIST_FAILURE,
  GET_ROLES_LIST_REQUEST,
  GET_ROLES_LIST_SUCCESS,
  GET_ROLE_BY_ID_FAILURE,
  GET_ROLE_BY_ID_REQUEST,
  GET_ROLE_BY_ID_SUCCESS,
  GET_ROLE_FAILURE,
  GET_ROLE_REQUEST,
  GET_ROLE_SUCCESS,
  POST_ROLE_FAILURE,
  POST_ROLE_REQUEST,
  POST_ROLE_SUCCESS,
  UPDATE_ROLE_FAILURE,
  UPDATE_ROLE_REQUEST,
  UPDATE_ROLE_SUCCESS,
} from "../action/actionType";

const initialState = {
  roles: [],
  selectedRole: {},
  role: null,
  accountPermission: null,
  loading: false,
  isFetching: false,
  isDeleting: false,
  updatedRole: {},
  error: null,
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROLES_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ROLES_LIST_SUCCESS:
      return {
        ...state,
        roles: action.payload,
        loading: false,
        error: null,
      };
    case GET_ROLES_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        accountPermission: action.payload,
      };
    case GET_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POST_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        role: action.payload,
        error: "",
      };
    case POST_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        role: null,
        error: action.payload,
      };
    case GET_ROLE_BY_ID_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case GET_ROLE_BY_ID_SUCCESS:
      return {
        ...state,
        selectedRole: action.payload,
        isFetching: false,
        error: null,
      };
    case GET_ROLE_BY_ID_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case DELETE_ROLE_REQUEST:
      return {
        ...state,
        isDeleting: true,
      };
    case DELETE_ROLE_SUCCESS:
      const updatedRole = state.roles.filter(
        (role) => role.id !== action.payload
      );
      return { ...state, roles: updatedRole, isDeleting: false };
    case DELETE_ROLE_FAILURE:
      return { ...state, error: action.payload, isDeleting: false };
    case UPDATE_ROLE_REQUEST:
      return {
        ...state,
        error: null,
      };
    case UPDATE_ROLE_SUCCESS:
      const { payload } = action;
      return {
        ...state,
        error: null,
        role: payload,
        roles: state.roles.map((role) =>
          role.id === payload.id ? payload : role
        ),
      };
    case UPDATE_ROLE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default roleReducer;
