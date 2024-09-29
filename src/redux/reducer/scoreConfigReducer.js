// scoreConfigReducer.js
import {
  SAVE_SCORE_CONFIG_REQUEST,
  SAVE_SCORE_CONFIG_SUCCESS,
  SAVE_SCORE_CONFIG_FAILURE,
  GET_SCORE_CONFIG_REQUEST,
  GET_SCORE_CONFIG_SUCCESS,
  GET_SCORE_CONFIG_FAILURE,
} from "../action/actionType";

const initialState = {
  loading: false,
  error: null,
  scoreParams: null,
};

const scoreConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_SCORE_CONFIG_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SAVE_SCORE_CONFIG_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case SAVE_SCORE_CONFIG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_SCORE_CONFIG_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_SCORE_CONFIG_SUCCESS:
      return {
        ...state,
        loading: false,
        scoreParams: action.payload,
      };
    case GET_SCORE_CONFIG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default scoreConfigReducer;
