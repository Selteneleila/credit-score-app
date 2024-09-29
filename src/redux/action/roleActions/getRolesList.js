import axios from "axios";
import { ROLE_API } from "../../../utils/constant";
import {
  GET_ROLES_LIST_FAILURE,
  GET_ROLES_LIST_REQUEST,
  GET_ROLES_LIST_SUCCESS,
} from "../actionType";

export function getRolesList() {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({ type: GET_ROLES_LIST_REQUEST });
    try {
      const response = await axios.get(ROLE_API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: GET_ROLES_LIST_SUCCESS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: GET_ROLES_LIST_FAILURE,
        payload: error.message,
      });
      console.error("Error fetching roles list:", error);
      throw error; // Rethrow the error to propagate it further if needed
    }
  };
}
