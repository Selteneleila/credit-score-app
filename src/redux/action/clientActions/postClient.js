import axios from "axios";

import { CLIENT_API } from "../../../utils/constant";
import {
  POST_CLIENT_FAILURE,
  POST_CLIENT_REQUEST,
  POST_CLIENT_SUCCESS,
} from "../actionType";

export const postClient = (clientData) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(postClientRequest());
    try {
      const response = await axios.post(`${CLIENT_API}`, clientData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(postClientSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(postClientFailure(error.message));
    }
  };
};

export const postClientRequest = () => {
  return {
    type: POST_CLIENT_REQUEST,
  };
};

export const postClientSuccess = (client) => {
  return {
    type: POST_CLIENT_SUCCESS,
    payload: client,
  };
};

export const postClientFailure = (error) => {
  return {
    type: POST_CLIENT_FAILURE,
    payload: error,
  };
};
