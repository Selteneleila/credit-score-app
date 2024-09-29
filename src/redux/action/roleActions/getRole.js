import axios from "axios";
import { ROLE_API } from "../../../utils/constant";
import {
  GET_ROLE_FAILURE,
  GET_ROLE_REQUEST,
  GET_ROLE_SUCCESS,
} from "../actionType";

export function getRole(roleName) {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({ type: GET_ROLE_REQUEST });
    try {
      const response = await axios.get(
        `${ROLE_API}?roleName.equals=${roleName}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.setItem("permissions", response.data[0].permission);
      dispatch({
        type: GET_ROLE_SUCCESS,
        payload: response.data[0],
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: GET_ROLE_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };
}
