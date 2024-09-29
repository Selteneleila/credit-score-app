import axios from "axios";
import {
  POST_ADMIN_FAILURE,
  POST_ADMIN_REQUEST,
  POST_ADMIN_SUCCESS,
} from "../actionType";
import { ADMIN_API } from "../../../utils/constant";

export const postAdmin = (adminData) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(postAdminRequest());
    try {
      const response = await axios.post(`${ADMIN_API}`, adminData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(postAdminSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(postAdminFailure(error.message));
    }
  };
};

export const postAdminRequest = () => {
  return {
    type: POST_ADMIN_REQUEST,
  };
};

export const postAdminSuccess = (admin) => {
  return {
    type: POST_ADMIN_SUCCESS,
    payload: admin,
  };
};

export const postAdminFailure = (error) => {
  return {
    type: POST_ADMIN_FAILURE,
    payload: error,
  };
};
