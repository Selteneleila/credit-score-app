import axios from "axios";
import { CLIENT_API } from "../../../utils/constant";
import {
  DELETE_CLIENT_FAILURE,
  DELETE_CLIENT_REQUEST,
  DELETE_CLIENT_SUCCESS,
} from "../actionType";

export const deleteClient = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch({ type: DELETE_CLIENT_REQUEST });

  try {
    const response = await axios.delete(`${CLIENT_API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: DELETE_CLIENT_SUCCESS, payload: id });

    return response;
  } catch (error) {
    dispatch({ type: DELETE_CLIENT_FAILURE, payload: error.message });
  }
};
