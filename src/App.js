import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/login";
import Dashboard from "./Pages/dashboard";
import ResetPassword from "./Pages/resetPassword";
import CreateAccount from "./Pages/createAccount";
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider } from "@mui/system";
import Admins from "./Pages/admins/adminsList";
import Corporates from "./Pages/corporates/corporatesList";
import ScoreConfiguration from "./Pages/scoreConfiguration";
import ProfileSettings from "./components/scenes/profile/profileSettings";
import Agents from "./Pages/agents/agentsList";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import ClientSolvability from "./components/scenes/creditScore/clientSolvability";
import Invoice from "./components/scenes/creditScore/invoice";
import AddCorporate from "./Pages/corporates/addCorporate";
import SuperAdminLogin from "./Pages/superAdminLogin";
import AddAdmin from "./Pages/admins/addAdmin";
import AddAgent from "./Pages/agents/addAgent";
import ClientsList from "./Pages/clients/clientList";
import AddClient from "./Pages/clients/addClient";
import RolesList from "./Pages/roles/rolesList";
import AddRole from "./Pages/roles/addRole";
import CreditScore from "./Pages/creditScore";
// import { Navigate } from "react-router-dom";
// import PrivateRoute from "./utils/privateRoute";

function App() {
  const [theme, colorMode] = useMode();
  const ProtectedRoute = ({ path, element }) => {
    const auth = useSelector((state) => state.auth);

    return auth ? (
      <Route path={path} element={element} />
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/superAdmin" element={<SuperAdminLogin />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route path="/create_account" element={<CreateAccount />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="admins" element={<Admins />} />
              <Route path="admins/add" element={<AddAdmin />} />
              <Route path="corporates" element={<Corporates />} />
              <Route path="corporates/add" element={<AddCorporate />} />
              <Route path="agents" element={<Agents />} />
              <Route path="agents/add" element={<AddAgent />} />
              <Route path="clients" element={<ClientsList />} />
              <Route path="clients/add" element={<AddClient />} />
              <Route
                path="score-configuration"
                element={<ScoreConfiguration />}
              />
              <Route path="credit-score" element={<CreditScore />} />
              <Route
                path="credit-score/client-solvability"
                element={<ClientSolvability />}
              />
              <Route
                path="/dashboard/credit-score/invoice"
                element={<Invoice />}
              />
              <Route path="roles" element={<RolesList />} />
              <Route path="roles/add" element={<AddRole />} />
            </Route>
          </Routes>
        </ThemeProvider>
        <ToastContainer />
      </ColorModeContext.Provider>
    </Provider>
  );
}

export default App;
