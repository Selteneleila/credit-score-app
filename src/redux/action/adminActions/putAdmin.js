import axios from "axios";

import { ADMIN_API } from "../../../utils/constant";
import {
  UPDATE_ADMIN_FAILURE,
  UPDATE_ADMIN_REQUEST,
  UPDATE_ADMIN_SUCCESS,
} from "../actionType";

export const putAdmin = (adminData, token) => async (dispatch) => {
  dispatch({ type: UPDATE_ADMIN_REQUEST });
  try {
    const response = await axios.put(
      `${ADMIN_API}/${adminData.id}`,
      adminData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: UPDATE_ADMIN_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: UPDATE_ADMIN_FAILURE,
      payload: error.response.data.error,
    });
  }
};
