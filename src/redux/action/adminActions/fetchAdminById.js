import axios from "axios";
import { ADMIN_API } from "../../../utils/constant";
import {
  FETCH_ADMIN_BY_ID_FAILURE,
  FETCH_ADMIN_BY_ID_REQUEST,
  FETCH_ADMIN_BY_ID_SUCCESS,
} from "../actionType";

export const fetchAdminById = (id) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({ type: FETCH_ADMIN_BY_ID_REQUEST });
    try {
      const response = await axios.get(`${ADMIN_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: FETCH_ADMIN_BY_ID_SUCCESS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: FETCH_ADMIN_BY_ID_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };
};
