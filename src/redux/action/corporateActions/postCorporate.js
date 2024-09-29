import {
  POST_CORPORATE_FAILURE,
  POST_CORPORATE_REQUEST,
  POST_CORPORATE_SUCCESS,
} from "../actionType";
import { AUTHORIZATION, CORPORATE_API } from "../../../utils/constant";
import axios from "axios";

const postCorporate = (corporateData) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    const updatedCorporateData = { ...corporateData };

    dispatch({ type: POST_CORPORATE_REQUEST });
    try {
      const response = await axios.post(CORPORATE_API, updatedCorporateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: POST_CORPORATE_SUCCESS,
        payload: response.data,
      });

      return response.data;
    } catch (error) {
      return dispatch({
        type: POST_CORPORATE_FAILURE,
        payload: error.message,
      });
    }
  };
};

export default postCorporate;
