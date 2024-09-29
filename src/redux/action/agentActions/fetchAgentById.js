import axios from "axios";
import { AGENT_API } from "../../../utils/constant";
import {
  FETCH_AGENT_BY_ID_FAILURE,
  FETCH_AGENT_BY_ID_REQUEST,
  FETCH_AGENT_BY_ID_SUCCESS,
} from "../actionType";

export const fetchAgentById = (id) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({ type: FETCH_AGENT_BY_ID_REQUEST });
    try {
      const response = await axios.get(`${AGENT_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: FETCH_AGENT_BY_ID_SUCCESS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: FETCH_AGENT_BY_ID_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };
};
