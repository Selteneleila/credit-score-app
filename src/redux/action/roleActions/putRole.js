import axios from "axios";
import {
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAILURE,
  UPDATE_ROLE_REQUEST,
} from "../actionType";
import { ROLE_API } from "../../../utils/constant";

export const putRole = (roleData, token) => async (dispatch) => {
  dispatch({ type: UPDATE_ROLE_REQUEST });
  try {
    const response = await axios.put(`${ROLE_API}/${roleData.id}`, roleData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: UPDATE_ROLE_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: UPDATE_ROLE_FAILURE,
      payload: error.response.data.error,
    });
  }
};
