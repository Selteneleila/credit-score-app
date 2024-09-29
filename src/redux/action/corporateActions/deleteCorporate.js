import axios from "axios";
import { CORPORATE_API } from "../../../utils/constant";
import {
  DELETE_CORPORATE_FAILURE,
  DELETE_CORPORATE_REQUEST,
  DELETE_CORPORATE_SUCCESS,
} from "../actionType";

export const deleteCorporate = (id) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({ type: DELETE_CORPORATE_REQUEST });
    try {
      const response = await axios.delete(`${CORPORATE_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: DELETE_CORPORATE_SUCCESS, payload: id });

      return response;
    } catch (error) {
      dispatch({ type: DELETE_CORPORATE_FAILURE, payload: error.message });
    }
  };
};
