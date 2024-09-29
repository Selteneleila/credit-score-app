import axios from "axios";
import {
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAILURE,
  UPDATE_CLIENT_REQUEST,
} from "../actionType";
import { CLIENT_API } from "../../../utils/constant";

export const putClient = (clientData, token) => async (dispatch) => {
  dispatch({ type: UPDATE_CLIENT_REQUEST });
  try {
    const response = await axios.put(
      `${CLIENT_API}/${clientData.id}`,
      clientData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: UPDATE_CLIENT_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: UPDATE_CLIENT_FAILURE,
      payload: error.response.data.error,
    });
  }
};
