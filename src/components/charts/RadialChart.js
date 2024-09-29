import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const RadialChart = ({
  age,
  salary,
  accountBalance,
  paymentHistory,
  previousCredit,
  penalties,
  total,
}) => {
  const chartRef = useRef(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (
      age &&
      salary &&
      accountBalance &&
      paymentHistory &&
      previousCredit &&
      penalties &&
      total
    ) {
      const options = {
        series: [
          Math.min(total, 900),
          total,
          age,
          salary,
          accountBalance,
          paymentHistory,
          previousCredit,
          penalties,
        ],
        chart: {
          height: 350,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: "22px",
              },
              value: {
                fontWeight: "bold",
                fontSize: "20px",
                formatter: function (val) {
                  return val; // Return an empty string to remove the value
                },
              },
              total: {
                show: true,
                label: "Total",
                formatter: function (w) {
                  return total;
                },
              },
            },
          },
        },
        colors: [
          colors.blueAccent[300], // Total
          "#FA6870", // Age
          "#6870FA", // Salary
          "#FA68B9", // Account Balance
          "#FAF268", // Payment History
          "#68FAA9", // Previous Credit
          "#FAA968", // Penalties
        ],
        labels: [
          "Total",
          "Age",
          "Salary",
          "Account Balance",
          "Payment History",
          "Previous Credit",
          "Penalties",
        ],
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      // Clean up the chart instance on unmount
      return () => {
        chart.destroy();
      };
    }
  }, [
    age,
    salary,
    accountBalance,
    paymentHistory,
    previousCredit,
    penalties,
    total,
  ]);

  return <div ref={chartRef} />;
};

export default RadialChart;
