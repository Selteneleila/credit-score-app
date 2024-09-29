import { useTheme } from "@emotion/react";
import React, { useState } from "react";
import { VictoryPie, VictoryBar, VictoryLabel, VictoryChart } from "victory";
import { tokens } from "../../theme";
import { Typography, colors } from "@mui/material";

const PieChart = ({ clientCount, agentCount, adminCount }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const chartColor = [
    colors.blueAccent[800],
    colors.blueAccent[700],
    colors.blueAccent[600],
  ];
  const data = [
    { x: "Clients", y: clientCount },
    { x: "Admins", y: adminCount },
    { x: "Agents", y: agentCount },
  ];

  return (
    <div>
      <Typography
        variant="h4"
        style={{
          color: colors.blueAccent[400],
          fontWeight: "bolder",
        }}
      >
        Pie Chart
      </Typography>
      <VictoryPie
        data={data}
        colorScale={chartColor}
        innerRadius={90}
        startAngle={90}
        endAngle={-90}
        labels={({ datum }) => `${datum.x}`}
        labelComponent={
          <VictoryLabel style={{ fontSize: 10, fill: theme.primaryColor }} />
        }
      />
    </div>
  );
};

export default PieChart;
