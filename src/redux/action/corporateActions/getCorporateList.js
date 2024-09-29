import axios from "axios";
import { CORPORATE_API } from "../../../utils/constant";
import { AUTHORIZATION } from "../../../utils/constant";

export function getCorporateList() {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({ type: "GET_CORPORATE_LIST_REQUEST" });
    try {
      const response = await axios.get(CORPORATE_API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: "GET_CORPORATE_LIST_SUCCESS",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      return dispatch({
        type: "GET_CORPORATE_LIST_FAILURE",
        payload: error.message,
      });
    }
  };
}
