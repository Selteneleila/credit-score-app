import {
  FETCH_ACCOUNT_FAILURE,
  FETCH_ACCOUNT_SUCCESS,
} from "../action/actionType";

const initialState = {
  accountData: null,
  error: null,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        accountData: action.payload,
        error: null,
      };
    case FETCH_ACCOUNT_FAILURE:
      return {
        ...state,
        accountData: null,
        error: action.payload,
      };
    // Other action cases...
    default:
      return state;
  }
};
export default accountReducer;
