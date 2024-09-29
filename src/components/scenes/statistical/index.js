import { Chip, Grid, Paper, Typography, useTheme } from "@mui/material";

import "./index.css";
import { tokens } from "../../../theme";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PieChart from "../../charts/pieChart";
import { useEffect } from "react";
import { getCorporateList } from "../../../redux/action/corporateActions/getCorporateList";
import { getAdminList } from "../../../redux/action/adminActions/getAdminList";
import { getAgentList } from "../../../redux/action/agentActions/getAgentList";
import { getClientList } from "../../../redux/action/clientActions/getClientList";
import LineChart from "../../charts/LineChart";

const Statistical = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const corporates = useSelector((state) => state.corporateReducer.corporates);
  const admins = useSelector((state) => state.adminReducer.admins);
  const agents = useSelector((state) => state.agentReducer.agents);
  const clients = useSelector((state) => state.clientReducer.clients);
  useEffect(() => {
    dispatch(getCorporateList());
    dispatch(getAdminList());
    dispatch(getAgentList());
    dispatch(getClientList());
  }, [dispatch]);

  const numberOfCorporates = corporates.length;
  const numberOfAdmins = admins.length;
  const numberOfAgents = agents.length;
  const numberOfClients = clients.length;
  const totalUSer = numberOfAdmins + numberOfAgents + numberOfClients;

  const data = [
    {
      name: "User Management",
      client: numberOfClients,
      admins: numberOfAdmins,
      agents: numberOfAgents,
      corporates: numberOfCorporates,
      total:
        numberOfAdmins + numberOfAgents + numberOfClients + numberOfCorporates,
    },
  ];
  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <Typography variant="h2">Dashboard</Typography>
        <Typography
          variant="h3"
          style={{ paddingTop: "1rem", color: colors.blueAccent[300] }}
        >
          Welcome to your dashboard where you can keep track of all users
          activity
        </Typography>
      </div>
      <Grid container spacing={3}>
        <Grid item lg={3} md={2}>
          <Paper
            elevation={2}
            sx={{
              padding: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 3,
            }}
          >
            <Typography
              sx={{ fontSize: 14 }}
              color={colors.primary}
              gutterBottom
            >
              Admins
            </Typography>
            <Chip
              label={numberOfAdmins}
              variant="contained"
              color="secondary"
              onClick={() => navigate("/dashboard/admins")}
            />
          </Paper>
        </Grid>
        <Grid item lg={3} md={2}>
          <Paper
            elevation={2}
            sx={{
              padding: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 3,
            }}
          >
            <Typography
              sx={{ fontSize: 14 }}
              color={colors.primary}
              gutterBottom
            >
              Agents
            </Typography>
            <Chip
              label={numberOfAgents}
              variant="contained"
              color="secondary"
              onClick={() => navigate("/dashboard/agents")}
            />
          </Paper>
        </Grid>
        <Grid item lg={3} md={2}>
          <Paper
            elevation={2}
            sx={{
              borderRadius: 3,
              padding: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: 14 }}
              color={colors.primary}
              gutterBottom
            >
              Clients
            </Typography>
            <Chip
              label={numberOfClients}
              variant="contained"
              color="secondary"
              onClick={() => navigate("/dashboard/clients")}
            />
          </Paper>
        </Grid>
        <Grid item lg={3} md={2}>
          <Paper
            elevation={2}
            sx={{
              borderRadius: 3,
              padding: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: 14 }}
              color={colors.primary}
              gutterBottom
            >
              Corporates
            </Typography>
            <Chip
              label={numberOfCorporates}
              variant="contained"
              color="secondary"
              onClick={() => navigate("/dashboard/corporates")}
            />
          </Paper>
        </Grid>

        <Grid item lg={6} md={6} style={{ paddingTop: "3rem" }}>
          <LineChart
            client={numberOfClients}
            admins={numberOfAdmins}
            corporates={numberOfCorporates}
            agents={numberOfAgents}
            total={totalUSer}
          />
        </Grid>
        <Grid item lg={6} md={6} style={{ paddingTop: "3.4rem" }}>
          <PieChart
            clientCount={numberOfClients}
            adminCount={numberOfAdmins}
            agentCount={numberOfAgents}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Statistical;
