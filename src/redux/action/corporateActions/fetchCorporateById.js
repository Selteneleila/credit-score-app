import axios from "axios";
import { AUTHORIZATION, CORPORATE_API } from "../../../utils/constant";
import {
  FETCH_CORPORATE_BY_ID_FAILURE,
  FETCH_CORPORATE_BY_ID_REQUEST,
  FETCH_CORPORATE_BY_ID_SUCCESS,
} from "../actionType";

export const fetchCorporateById = (id) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({ type: FETCH_CORPORATE_BY_ID_REQUEST });
    try {
      const response = await axios.get(`${CORPORATE_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: FETCH_CORPORATE_BY_ID_SUCCESS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: FETCH_CORPORATE_BY_ID_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };
};
