import axios from "axios";

import { AGENT_API } from "../../../utils/constant";
import {
  UPDATE_AGENT_FAILURE,
  UPDATE_AGENT_REQUEST,
  UPDATE_AGENT_SUCCESS,
} from "../actionType";

export const putAgent = (agentData, token) => async (dispatch) => {
  dispatch({ type: UPDATE_AGENT_REQUEST });
  try {
    const response = await axios.put(
      `${AGENT_API}/${agentData.id}`,
      agentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: UPDATE_AGENT_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: UPDATE_AGENT_FAILURE,
      payload: error.response.data.error,
    });
  }
};
