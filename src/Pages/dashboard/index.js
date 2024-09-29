import React from "react";
import "./index.css";
import Sidebar from "../../components/global/sideBar";
import TopBar from "../../components/global/topBar";
import { CssBaseline } from "@mui/material";

const Dashboard = () => {
  return (
    <>
      <CssBaseline />
      <>
        <TopBar />

        <Sidebar />
      </>
    </>
  );
};

export default Dashboard;
