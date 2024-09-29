import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const LineChart = ({ client, admins, corporates, agents, total }) => {
  const chartRef = useRef(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (client && admins && corporates && agents && total) {
      const options = {
        series: [
          {
            name: "Users",
            data: [client, admins, corporates, agents, total],
          },
        ],
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },

        stroke: {
          curve: "straight",
          colors: [colors.blueAccent[700]],
          width: 4,
        },
        title: {
          text: "Active users",
          align: "left",
          style: {
            color: colors.blueAccent[400],
            fontSize: 17,
            fontWeight: "bolder",
          },
        },
        grid: {
          row: {
            colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
          },
        },
        xaxis: {
          categories: ["Clients", "Admins", "Agents", "Corporates", "Total"],
        },
      };

      const chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();

      // Clean up the chart instance on unmount
      return () => {
        chart.destroy();
      };
    }
  }, [client, admins, corporates, agents, total]);

  return <div id="chart" ref={chartRef} />;
};

export default LineChart;
