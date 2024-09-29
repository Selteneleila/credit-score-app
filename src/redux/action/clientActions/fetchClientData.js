import axios from "axios";

export const fetchClientData = (id) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/clients/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;

      dispatch({
        type: "FETCH_CLIENT_DATA_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_CLIENT_DATA_ERROR",
        payload: error.message,
      });
    }
  };
};
