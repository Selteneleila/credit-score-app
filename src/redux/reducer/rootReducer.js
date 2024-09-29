import { combineReducers } from "redux";
import agentReducer from "./agentReducer";
import roleReducer from "./roleReducer";
import corporateReducer from "./corporateReducer";
import clientReducer from "./clientReducer";
import creditScoreReducer from "./creditScoreReducer";
import searchIdReducer from "./searchIdReducer";
import adminReducer from "./adminReducer";
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";
import addressReducer from "./addressReducer";
import scoreConfigReducer from "./scoreConfigReducer";

const rootReducer = combineReducers({
  agentReducer,
  roleReducer,
  clientReducer,
  corporateReducer,
  creditScoreReducer,
  adminReducer,
  auth: authReducer,
  address: addressReducer,
  searchId: searchIdReducer,
  account: accountReducer,
  config: scoreConfigReducer,
});

export default rootReducer;
