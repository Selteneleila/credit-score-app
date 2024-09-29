import axios from "axios";
import {
  DELETE_ADDRESS_FAILURE,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
} from "../actionType";

export const deleteAddress = (id) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
      dispatch({ type: DELETE_ADDRESS_REQUEST });
      const response = await axios.delete(
        `http://localhost:8080/api/addresses/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: id });
      return response;
    } catch (error) {
      dispatch({ type: DELETE_ADDRESS_FAILURE, payload: error.message });
      throw error;
    }
  };
};
