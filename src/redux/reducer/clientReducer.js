import {
  DELETE_CLIENT_FAILURE,
  DELETE_CLIENT_REQUEST,
  DELETE_CLIENT_SUCCESS,
  FETCH_CLIENT_BY_ID_FAILURE,
  FETCH_CLIENT_BY_ID_REQUEST,
  FETCH_CLIENT_BY_ID_SUCCESS,
  POST_CLIENT_FAILURE,
  POST_CLIENT_REQUEST,
  POST_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAILURE,
  UPDATE_CLIENT_REQUEST,
  UPDATE_CLIENT_SUCCESS,
} from "../action/actionType";

const initialState = {
  clients: [],
  selectedClient: null,
  client: null,
  clientData: null,
  loading: false,
  isDeleting: false,
  isLoading: false,
  error: null,
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CLIENT_LIST_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_CLIENT_LIST_SUCCESS":
      return {
        ...state,
        clients: action.payload,
        loading: false,
        error: null,
      };
    case "GET_CLIENT_LIST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_CLIENT_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_CLIENT_BY_ID_SUCCESS:
      return {
        ...state,
        selectedClient: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_CLIENT_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case DELETE_CLIENT_REQUEST:
      return {
        ...state,
        isDeleting: true,
      };
    case DELETE_CLIENT_SUCCESS:
      const updatedClient = state.clients.filter(
        (client) => client.id !== action.payload
      );
      return { ...state, clients: updatedClient, isDeleting: false };
    case DELETE_CLIENT_FAILURE:
      return { ...state, error: action.payload, isDeleting: false };
    case POST_CLIENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        client: action.payload,
        error: "",
      };
    case POST_CLIENT_FAILURE:
      return {
        ...state,
        loading: false,
        client: null,
        error: action.payload,
      };
    case UPDATE_CLIENT_REQUEST:
      return {
        ...state,
        error: null,
      };
    case UPDATE_CLIENT_SUCCESS:
      const { payload } = action;
      return {
        ...state,
        error: null,
        client: payload,
        clients: state.clients.map((client) =>
          client.id === payload.id ? payload : client
        ),
      };
    case UPDATE_CLIENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case "FETCH_CLIENT_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        clientData: action.payload,
        error: null,
      };
    case "FETCH_CLIENT_DATA_ERROR":
      return {
        ...state,
        loading: false,
        clientData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default clientReducer;
