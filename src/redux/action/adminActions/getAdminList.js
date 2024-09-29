import axios from "axios";
import {
  GET_ADMIN_LIST_FAILURE,
  GET_ADMIN_LIST_REQUEST,
  GET_ADMIN_LIST_SUCCESS,
} from "../actionType";
import { ADMIN_API } from "../../../utils/constant";

export const getAdminList = () => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch({ type: GET_ADMIN_LIST_REQUEST });

  try {
    const response = await axios.get(`${ADMIN_API}?accountType.equals=Admin`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: GET_ADMIN_LIST_SUCCESS,
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    return dispatch({
      type: GET_ADMIN_LIST_FAILURE,
      payload: error.message,
    });
  }
};
