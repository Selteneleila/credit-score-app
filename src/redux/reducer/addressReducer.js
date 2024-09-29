import {
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_FAILURE,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
} from "../action/actionType";

const initialState = {
  address: null,
  loading: false,
  error: null,
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESS_REQUEST:
    case DELETE_ADDRESS_REQUEST:
    case UPDATE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ADDRESS_SUCCESS:
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        address: action.payload,
        loading: false,
        error: null,
      };
    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        address: null,
        loading: false,
        error: null,
      };
    case GET_ADDRESS_FAILURE:
    case DELETE_ADDRESS_FAILURE:
    case UPDATE_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default addressReducer;
