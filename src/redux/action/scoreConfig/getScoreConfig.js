import axios from "axios";
import {
  GET_SCORE_CONFIG_FAILURE,
  GET_SCORE_CONFIG_REQUEST,
  GET_SCORE_CONFIG_SUCCESS,
} from "../actionType";

export function getScoreConfig() {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({ type: GET_SCORE_CONFIG_REQUEST });
    try {
      const response = await axios.get(
        "http://localhost:8080/api/score-configs?sort=id,desc",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch({
        type: GET_SCORE_CONFIG_SUCCESS,
        payload: response.data.reverse()[0],
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: GET_SCORE_CONFIG_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };
}
