// import axios from "axios";
// import { AUTHORIZATION, CLIENT_API } from "../../../utility/constant";
// import {
//   SET_SELECTED_CLIENT_FAILURE,
//   SET_SELECTED_CLIENT_REQUEST,
//   SET_SELECTED_CLIENT_SUCCESS,
// } from "../actionType";

// export function setSelectedClient(searchQuery) {
//   return async (dispatch) => {
//     dispatch({ type: SET_SELECTED_CLIENT_REQUEST });
//     try {
//       const response = await axios.get(`${CLIENT_API}/${searchQuery}`, {
//         headers: { AUTHORIZATION },
//       });
//       dispatch({
//         type: SET_SELECTED_CLIENT_SUCCESS,
//         payload: response.data,
//       });
//       return response.data;
//     } catch (error) {
//       return dispatch({
//         type: SET_SELECTED_CLIENT_FAILURE,
//         payload: error.message,
//       });
//     }
//   };
// }
