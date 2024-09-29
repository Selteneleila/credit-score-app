import axios from "axios";
import { ROLE_API } from "../../../utils/constant";
import {
  DELETE_ROLE_FAILURE,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
} from "../actionType";

export const deleteRole = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch({ type: DELETE_ROLE_REQUEST });

  try {
    const response = await axios.delete(`${ROLE_API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: DELETE_ROLE_SUCCESS, payload: id });

    return response;
  } catch (error) {
    dispatch({ type: DELETE_ROLE_FAILURE, payload: error.message });
  }
};
