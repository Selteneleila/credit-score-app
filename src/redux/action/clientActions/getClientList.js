import axios from "axios";
import { CLIENT_API } from "../../../utils/constant";

export const getClientList = () => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch({ type: "GET_CLIENT_LIST_REQUEST" });

  try {
    const response = await axios.get(
      `${CLIENT_API}?accountType.equals=Client`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    dispatch({
      type: "GET_CLIENT_LIST_SUCCESS",
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    return dispatch({
      type: "GET_CLIENT_LIST_FAILURE",
      payload: error.message,
    });
  }
};
