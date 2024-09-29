import axios from "axios";
import {
  UPDATE_ADDRESS_FAILURE,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
} from "../actionType";

export const updateAddress = (id, updatedData) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
      dispatch({ type: UPDATE_ADDRESS_REQUEST });
      const response = await axios.put(
        `http://localhost:8080/api/addresses/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: UPDATE_ADDRESS_FAILURE, payload: error.message });
      throw error;
    }
  };
};
