import axios from "axios";
import {
  POST_ADDRESS_REQUEST,
  POST_ADDRESS_REQUEST_FAILURE,
  POST_ADDRESS_REQUEST_SUCCESS,
} from "../actionType";

export const postAddress = (payload) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
      dispatch(postAddressRequest());
      const reqOptions = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.post(
        "http://localhost:8080/api/addresses",
        payload,
        reqOptions
      );
      dispatch(postAddressSuccess(data));
      return data;
    } catch (error) {
      dispatch(postAddressFailure(error.message));
      return;
    }
  };
};

export const postAddressRequest = () => {
  return {
    type: POST_ADDRESS_REQUEST,
  };
};

export const postAddressSuccess = (address) => {
  return {
    type: POST_ADDRESS_REQUEST_SUCCESS,
    payload: address,
  };
};

export const postAddressFailure = (error) => {
  return {
    type: POST_ADDRESS_REQUEST_FAILURE,
    payload: error,
  };
};
