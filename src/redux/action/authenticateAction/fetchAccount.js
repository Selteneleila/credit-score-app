import axios from "axios";
import { FETCH_ACCOUNT_FAILURE, FETCH_ACCOUNT_SUCCESS } from "../actionType";
import { getRole } from "../roleActions/getRole";

const fetchAccountSuccess = (accountData) => {
  return {
    type: FETCH_ACCOUNT_SUCCESS,
    payload: accountData,
  };
};

const fetchAccountFailure = (error) => {
  return {
    type: FETCH_ACCOUNT_FAILURE,
    payload: error,
  };
};

export const fetchAccount = (authToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:8080/api/account", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const accountData = response.data;

      dispatch(fetchAccountSuccess(accountData));
      dispatch(getRole(accountData.authorities[0]));
    } catch (error) {
      dispatch(fetchAccountFailure(error));
    }
  };
};
