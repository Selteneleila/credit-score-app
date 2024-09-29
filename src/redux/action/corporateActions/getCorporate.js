import axios from "axios";
import {
  GET_CORPORATE_FAILURE,
  GET_CORPORATE_REQUEST,
  GET_CORPORATE_SUCCESS,
} from "../actionType";
import { CORPORATE_API } from "../../../utils/constant";

export const getCorporate = (corporateId) => async (dispatch, getState) => {
  const { token } = getState().auth;
  dispatch({ type: GET_CORPORATE_REQUEST });

  try {
    const response = await axios.get(`${CORPORATE_API}${corporateId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: GET_CORPORATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CORPORATE_FAILURE,
      payload: error.message,
    });
  }
};
