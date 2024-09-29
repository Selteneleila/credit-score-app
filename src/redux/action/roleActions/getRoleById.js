import axios from "axios";
import { ROLE_API } from "../../../utils/constant";
import {
  GET_ROLE_BY_ID_FAILURE,
  GET_ROLE_BY_ID_REQUEST,
  GET_ROLE_BY_ID_SUCCESS,
} from "../actionType";

export const getRoleById = (id) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({ type: GET_ROLE_BY_ID_REQUEST });
    try {
      const response = await axios.get(`${ROLE_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: GET_ROLE_BY_ID_SUCCESS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      return dispatch({
        type: GET_ROLE_BY_ID_FAILURE,
        payload: error.message,
      });
    }
  };
};
