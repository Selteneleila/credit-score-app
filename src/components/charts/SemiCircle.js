import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const SemiCircle = () => {
  const chartRef = useRef(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const options = {
      series: [76],
      chart: {
        type: "radialBar",
        offsetY: -20,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%",
            margin: 5,
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: "#999",
              opacity: 1,
              blur: 2,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: "22px",
            },
          },
        },
      },
      grid: {
        padding: {
          top: -10,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 25, 50, 75],
          colorStops: [
            {
              offset: 0,
              color: colors.redAccent, // Poor
            },
            {
              offset: 25,
              color: colors.blueAccent[400], // Bad
            },
            {
              offset: 50,
              color: colors.blueAccent[700], // Fair
            },
            {
              offset: 75,
              color: colors.greenAccent, // Excellent
            },
          ],
        },
      },
      labels: ["Average Results"],
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    // Clean up the chart instance on unmount
    return () => {
      chart.destroy();
    };
  }, []);

  return <div id="chart" ref={chartRef} />;
};

export default SemiCircle;
