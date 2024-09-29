import {
  GET_CLIENT_CREDIT_SCORE_FAILURE,
  GET_CLIENT_CREDIT_SCORE_REQUEST,
  GET_CLIENT_CREDIT_SCORE_SUCCESS,
} from "../action/actionType";

const initialState = {
  clientCreditScore: null,
  loading: false,
  error: null,
};

const creditScoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENT_CREDIT_SCORE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_CLIENT_CREDIT_SCORE_SUCCESS:
      return {
        ...state,
        clientCreditScore: action.payload,
        loading: false,
        error: null,
      };
    case GET_CLIENT_CREDIT_SCORE_FAILURE:
      return {
        ...state,
        clientCreditScore: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default creditScoreReducer;
