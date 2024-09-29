import axios from "axios";
import {
  POST_AGENT_FAILURE,
  POST_AGENT_REQUEST,
  POST_AGENT_SUCCESS,
} from "../actionType";
import { AGENT_API } from "../../../utils/constant";

export const postAgent = (agentData) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(postAgentRequest());
    try {
      const response = await axios.post(`${AGENT_API}`, agentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(postAgentSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(postAgentFailure(error.message));
    }
  };
};

export const postAgentRequest = () => {
  return {
    type: POST_AGENT_REQUEST,
  };
};

export const postAgentSuccess = (agent) => {
  return {
    type: POST_AGENT_SUCCESS,
    payload: agent,
  };
};

export const postAgentFailure = (error) => {
  return {
    type: POST_AGENT_FAILURE,
    payload: error,
  };
};
