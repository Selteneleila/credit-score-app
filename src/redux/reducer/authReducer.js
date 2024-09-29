import {
  AUTHENTICATE_FAILURE,
  AUTHENTICATE_SUCCESS,
} from "../action/actionType";

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem("token") || null, // Initialize token from local storage
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      // Store the token in local storage
      localStorage.setItem("token", action.payload);

      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        error: null,
      };

    case AUTHENTICATE_FAILURE:
      localStorage.removeItem("token");

      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
