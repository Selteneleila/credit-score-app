import axios from "axios";
import {
  GET_ADDRESS_FAILURE,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
} from "../actionType";

export const getAddress = (id) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
      dispatch({ type: GET_ADDRESS_REQUEST });
      const response = await axios.get(
        `http://localhost:8080/api/addresses/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({ type: GET_ADDRESS_SUCCESS, payload: response.data });

      return response.data;
    } catch (error) {
      dispatch({ type: GET_ADDRESS_FAILURE, payload: error.message });
      throw error;
    }
  };
};
