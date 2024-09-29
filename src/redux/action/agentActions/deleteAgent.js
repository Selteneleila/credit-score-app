import axios from "axios";
import { AGENT_API } from "../../../utils/constant";
import {
  DELETE_AGENT_REQUEST,
  DELETE_AGENT_FAILURE,
  DELETE_AGENT_SUCCESS,
} from "../actionType";

export const deleteAgent = (id) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({ type: DELETE_AGENT_REQUEST });
    try {
      const response = await axios.delete(`${AGENT_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: DELETE_AGENT_SUCCESS, payload: id });

      return response;
    } catch (error) {
      dispatch({ type: DELETE_AGENT_FAILURE, payload: error.message });
    }
  };
};
