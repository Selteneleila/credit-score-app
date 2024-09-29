import {
  DELETE_CORPORATE_FAILURE,
  DELETE_CORPORATE_REQUEST,
  DELETE_CORPORATE_SUCCESS,
  FETCH_CORPORATE_BY_ID_FAILURE,
  FETCH_CORPORATE_BY_ID_REQUEST,
  FETCH_CORPORATE_BY_ID_SUCCESS,
  GET_CORPORATE_FAILURE,
  GET_CORPORATE_REQUEST,
  GET_CORPORATE_SUCCESS,
  UPDATE_CORPORATE_FAILURE,
  UPDATE_CORPORATE_REQUEST,
  UPDATE_CORPORATE_SUCCESS,
} from "../action/actionType";

const initialState = {
  corporates: [],
  selectedCorporate: {},
  currentCorporate: null,
  loading: false,
  isDeleting: false,
  isUpdating: false,
  isLoading: false,
  error: null,
};

const corporateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CORPORATE_LIST_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_CORPORATE_LIST_SUCCESS":
      return {
        ...state,
        corporates: action.payload,
        loading: false,
        error: null,
      };
    case "GET_CORPORATE_LIST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_CORPORATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_CORPORATE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentCorporate: action.payload,
      };
    case GET_CORPORATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_CORPORATE_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_CORPORATE_BY_ID_SUCCESS:
      return {
        ...state,
        selectedCorporate: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_CORPORATE_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case DELETE_CORPORATE_REQUEST:
      return {
        ...state,
        isDeleting: true,
      };
    case DELETE_CORPORATE_SUCCESS:
      const updatedClient = state.corporates.filter(
        (client) => client.id !== action.payload
      );
      return { ...state, corporates: updatedClient, isDeleting: false };
    case DELETE_CORPORATE_FAILURE:
      return { ...state, error: action.payload, isDeleting: false };
    case UPDATE_CORPORATE_REQUEST:
      return {
        ...state,
        error: null,
      };
    case UPDATE_CORPORATE_SUCCESS:
      const { payload } = action;
      return {
        ...state,
        error: null,
        corporate: payload,
        corporates: state.corporates.map((corporate) =>
          corporate.id === payload.id ? payload : corporate
        ),
      };
    case UPDATE_CORPORATE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default corporateReducer;
