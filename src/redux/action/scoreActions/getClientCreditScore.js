import axios from "axios";
import { CREDIT_SCORE_API } from "../../../utility/constant";
import {
  GET_CLIENT_CREDIT_SCORE_FAILURE,
  GET_CLIENT_CREDIT_SCORE_REQUEST,
  GET_CLIENT_CREDIT_SCORE_SUCCESS,
} from "../actionType";

export const getClientCreditScore = (clientId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({ type: GET_CLIENT_CREDIT_SCORE_REQUEST });
    try {
      const response = await axios.get(`${CREDIT_SCORE_API}${clientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: GET_CLIENT_CREDIT_SCORE_SUCCESS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: GET_CLIENT_CREDIT_SCORE_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };
};
