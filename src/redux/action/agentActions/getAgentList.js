import axios from "axios";
import { AGENT_API } from "../../../utils/constant";
import {
  GET_AGENT_LIST_FAILURE,
  GET_AGENT_LIST_REQUEST,
  GET_AGENT_LIST_SUCCESS,
} from "../actionType";
export function getAgentList() {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({ type: GET_AGENT_LIST_REQUEST });
    try {
      const response = await axios.get(
        `${AGENT_API}?accountType.equals=Agent`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: GET_AGENT_LIST_SUCCESS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      return dispatch({
        type: GET_AGENT_LIST_FAILURE,
        payload: error.message,
      });
    }
  };
}
