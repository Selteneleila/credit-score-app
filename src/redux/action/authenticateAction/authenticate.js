import axios from "axios";
import { AUTHENTICATE_FAILURE, AUTHENTICATE_SUCCESS } from "../actionType";
import { fetchAccount } from "./fetchAccount";
import { getRole } from "../roleActions/getRole";

export const loginSuccess = (token) => ({
  type: AUTHENTICATE_SUCCESS,
  payload: token,
});

export const loginFailure = (error) => ({
  type: AUTHENTICATE_FAILURE,
  payload: error,
});

export const authenticate = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/authenticate",
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { id_token } = response.data;
    dispatch(loginSuccess(id_token));
    dispatch(fetchAccount(id_token));

    return { payload: id_token };
  } catch (error) {
    dispatch(loginFailure(error));
    throw error;
  }
};
