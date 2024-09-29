import axios from "axios";
import { ADMIN_API } from "../../../utils/constant";
import {
  DELETE_ADMIN_FAILURE,
  DELETE_ADMIN_REQUEST,
  DELETE_ADMIN_SUCCESS,
} from "../actionType";

export const deleteAdmin = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch({ type: DELETE_ADMIN_REQUEST });

  try {
    const response = await axios.delete(`${ADMIN_API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: DELETE_ADMIN_SUCCESS, payload: id });

    return response;
  } catch (error) {
    dispatch({ type: DELETE_ADMIN_FAILURE, payload: error.message });
  }
};
