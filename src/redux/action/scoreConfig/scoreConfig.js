// scoreConfigActions.js
import axios from "axios";
import {
  SAVE_SCORE_CONFIG_REQUEST,
  SAVE_SCORE_CONFIG_SUCCESS,
  SAVE_SCORE_CONFIG_FAILURE,
} from "../actionType";
import { toast } from "react-toastify";

export const saveScoreConfig = (data) => {
  return (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({ type: SAVE_SCORE_CONFIG_REQUEST });

    axios
      .post("http://localhost:8080/api/score-configs", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success("Changes Saved");
        dispatch({ type: SAVE_SCORE_CONFIG_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        toast.error("Unable to save chnages");
        dispatch({ type: SAVE_SCORE_CONFIG_FAILURE, payload: error.message });
      });
  };
};
