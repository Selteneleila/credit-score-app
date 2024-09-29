// import React from "react";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { Paper, Typography, useTheme } from "@mui/material";
// import { tokens } from "../../theme";
// const ProgressChart = ({ value }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const percentage = Math.round(value);
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "row",
//       }}
//     >
//       <div
//         style={{
//           width: "50%",
//           height: "40%",
//           justifyContent: "flex-end",
//           marginLeft: "3rem",
//         }}
//       >
//         <CircularProgressbar
//           value={value}
//           text={`${percentage}%`}
//           strokeWidth={10}
//           styles={buildStyles({
//             textColor: colors.blueAccent[300],
//             pathColor: colors.blueAccent[600],
//             trailColor: colors.blueAccent[800],
//           })}
//         />
//       </div>
//     </div>
//   );
// };

// export default ProgressChart;
