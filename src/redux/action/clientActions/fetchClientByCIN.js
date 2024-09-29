import axios from "axios";
import { CLIENT_API } from "../../../utils/constant";
import {
  FETCH_CLIENT_BY_ID_FAILURE,
  FETCH_CLIENT_BY_ID_REQUEST,
  FETCH_CLIENT_BY_ID_SUCCESS,
} from "../actionType";

export const fetchClientByCIN = (cin) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({ type: FETCH_CLIENT_BY_ID_REQUEST });
    try {
      const response = await axios.get(`${CLIENT_API}?cin.equals=${cin}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: FETCH_CLIENT_BY_ID_SUCCESS,
        payload: response.data.length > 0 ? response.data[0] : null,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: FETCH_CLIENT_BY_ID_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };
};
