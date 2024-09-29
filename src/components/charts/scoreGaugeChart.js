import { useTheme } from "@mui/styles";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { tokens } from "../../theme";

const ScoreGauge = ({ score }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const minValue = 250;
  const maxValue = 900;

  const getColor = (value) => {
    if (value >= 250 && value <= 529) {
      return colors.redAccent;
    } else if (value >= 530 && value <= 699) {
      return "#FA68B9";
    } else if (value >= 700 && value <= 899) {
      return colors.blueAccent[400];
    } else if (value >= 800 && value <= 900) {
      return colors.greenAccent;
    } else {
      return colors.blueAccent[900];
    }
  };

  const percentage = ((score - minValue) / (maxValue - minValue)) * 100;
  const color = getColor(score?.total >= 250 ? score?.total : 250);

  return (
    <div
      style={{
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "3rem",
      }}
    >
      <CircularProgressbar
        value={score?.total >= 250 ? score?.total : 250}
        // text={score?.total >= 250 ? score?.total : 250}
        text={score?.total}
        maxValue={900}
        minValue={240}
        strokeWidth={12}
        styles={buildStyles({
          strokeLinecap: "round",
          textSize: "20px",
          pathColor: color,
          textColor: color,
          trailColor: colors.blueAccent[900],
        })}
      />
    </div>
  );
};

export default ScoreGauge;
