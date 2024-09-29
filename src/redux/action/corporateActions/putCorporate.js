import axios from "axios";
import {
  UPDATE_CORPORATE_REQUEST,
  UPDATE_CORPORATE_SUCCESS,
  UPDATE_CORPORATE_FAILURE,
} from "../actionType";
import { CORPORATE_API } from "../../../utils/constant";

export const putCorporate = (corporateData, token) => async (dispatch) => {
  dispatch({ type: UPDATE_CORPORATE_REQUEST });
  try {
    const response = await axios.put(
      `${CORPORATE_API}/${corporateData.id}`,
      corporateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: UPDATE_CORPORATE_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: UPDATE_CORPORATE_FAILURE,
      payload: error.response.data.error,
    });
  }
};
