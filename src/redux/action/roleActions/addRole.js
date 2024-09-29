import axios from "axios";
import { ROLE_API } from "../../../utils/constant";
import {
  POST_ROLE_FAILURE,
  POST_ROLE_REQUEST,
  POST_ROLE_SUCCESS,
} from "../actionType";

export const addRole = (role) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(addRoleRequest());
    try {
      const response = await axios.post(`${ROLE_API}`, role, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(addRoleSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(addRoleFailure(error.message));
    }
  };
};

export const addRoleRequest = () => {
  return {
    type: POST_ROLE_REQUEST,
  };
};

export const addRoleSuccess = (role) => {
  return {
    type: POST_ROLE_SUCCESS,
    payload: role,
  };
};

export const addRoleFailure = (error) => {
  return {
    type: POST_ROLE_FAILURE,
    payload: error,
  };
};
