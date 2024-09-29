// import React from "react";
// import { Modal, Typography, Paper, capitalize, Grid } from "@mui/material";
// import omit from "lodash/omit";
// import "react-toastify/dist/ReactToastify.css";
// import CustomButton from "../../global/customButon";

// export default function CorporateInfoModal({
//   isOpen,
//   toggleModal,
//   data,
//   handleCloseModal,
// }) {
//   const keysToMap = Object.keys(omit(data, ["id"]));
//   return (
//     <Modal open={isOpen} onClose={() => toggleModal(false)}>
//       <Paper
//         elevation={12}
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           p: 6,
//         }}
//       >
//         <Grid container spacing={2}>
//           <Grid item xs={6}>
//             <Typography variant="h2">{data?.corporateName}</Typography>
//           </Grid>
//           <Grid container justifyContent="flex-end" item xs={6}>
//             <CustomButton onClick={handleCloseModal}>close</CustomButton>
//           </Grid>
//           <Grid item xs={12}>
//             {keysToMap.map((key) => (
//               <Typography variant="h5">
//                 {capitalize(key)}: {data[key]}
//               </Typography>
//             ))}
//           </Grid>
//         </Grid>
//       </Paper>
//     </Modal>
//   );
// }
