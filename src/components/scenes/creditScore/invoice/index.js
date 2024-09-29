import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Divider,
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableContainer,
} from "@mui/material";
import "./index.css";
import CustomButton from "../../../global/customButon";
import { PrintOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../../../global/customInput";
import CustomSelect from "../../../global/customSelect";

const Invoice = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const invoiceData = location.state;

  const [loanAmount, setLoanAmount] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [loanAmountError, setLoanAmountError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const invoice = Array.isArray(invoiceData) ? invoiceData[0] : null;

  if (!invoice) {
    return <div>No invoice data available</div>;
  }

  const durationOptions = [
    { value: "2", label: "2 months" },
    { value: "3", label: "3 months" },
    { value: "3", label: "3 months" },
    { value: "4", label: "4 months" },
    { value: "5", label: "5 months" },
    { value: "6", label: "6 months" },
    { value: "12", label: "12 months" },
  ];
  const handlePrint = () => {
    const printableArea = document.getElementById("printable-area");
    const printWindow = window.open("", "_blank", "width=600,height=600");

    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            @media print {
              body * {
                visibility: hidden;
              }
              #printable-area, #printable-area * {
                visibility: visible;
              }
            }
          </style>
        </head>
        <body>
          <div id="printable-area">
            ${printableArea.innerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  const handleSelectChange = (event) => {
    const selectedDuration = event.target.value;
    setSelectedValue(selectedDuration);

    const loanAmountValue = parseFloat(loanAmount);
    const durationValue = parseInt(selectedDuration);

    const calculatedDownPayment = calculateDownPayment(loanAmountValue);
    setDownPayment(calculatedDownPayment.toFixed(2));

    const calculatedMonthlyPayment = calculateMonthlyPayment(
      loanAmountValue,
      durationValue
    );
    setMonthlyPayment(calculatedMonthlyPayment.toFixed(2));
  };

  const calculateDownPayment = (loanAmountValue) => {
    return loanAmountValue * 0.2;
  };

  const calculateMonthlyPayment = (loanAmountValue, durationValue) => {
    return loanAmountValue / durationValue;
  };

  const getCreditDurationText = (duration) => {
    if (duration < 12) {
      return `${duration} month${duration > 1 ? "s" : ""}`;
    } else {
      const years = Math.floor(duration / 12);
      const yearText = years > 1 ? "years" : "year";
      return `${years} ${yearText}`;
    }
  };

  // const getMonthlyInstallments = (duration) => {
  //   const installments = [];
  //   for (let i = 1; i <= duration; i++) {
  //     installments.push(
  //       <TableRow key={i}>
  //         <TableCell>Installment {i}</TableCell>
  //         <TableCell>{monthlyPayment} DT</TableCell>
  //       </TableRow>
  //     );
  //   }
  //   return installments;
  // };

  const creditDurationText = getCreditDurationText(selectedValue);
  // const monthlyInstallments = getMonthlyInstallments(selectedValue);

  const isFormIncomplete = !loanAmount || !selectedValue;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Typography variant="h2">Invoice </Typography>
        </Grid>
        <Grid container justifyContent="flex-end" item xs={7}>
          <CustomButton
            onClick={() => navigate("/dashboard/credit-score/")}
            className="admin-form-add-btn"
          >
            Back
          </CustomButton>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2}>
              <CustomInput
                name="loanAmount"
                type="text"
                label="Loan Amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                fullWidth
                error={loanAmountError}
                helperText={loanAmountError ? "Loan amount is required" : ""}
              />
              <CustomSelect
                disabled
                label="Duration"
                value={selectedValue}
                onChange={handleSelectChange}
                options={durationOptions}
                error={durationError}
                helperText={durationError ? "Duration is required" : ""}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <CustomInput
                name="down_payment"
                label="Down Payment"
                fullWidth
                value={downPayment}
                disabled
              />
              <CustomInput
                disabled
                name="monthly_payment"
                label="Monthly Payment"
                fullWidth
                value={monthlyPayment}
              />
            </Stack>
          </Stack>
          {!isFormIncomplete && (
            <Paper
              id="printable-area"
              style={{ marginTop: "2rem", padding: "1rem" }}
            >
              <Grid item xs={12} textAlign="right">
                <IconButton onClick={handlePrint}>
                  <PrintOutlined />
                </IconButton>
              </Grid>
              <Grid item>
                <Grid item>
                  <Typography variant="h2">Invoice #{invoice.id}</Typography>
                </Grid>
                {/* <Grid item>
                  <Typography variant="h5">
                    Customer CIN : {invoice.cin}
                  </Typography>
                </Grid> */}

                <Grid item xs={12}>
                  <Divider textAlign="left">
                    <Typography variant="h5">Payment Informations</Typography>
                  </Divider>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Credit Amount </TableCell>
                          <TableCell component="th" scope="row">
                            {loanAmount} DT
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Credit Duration </TableCell>
                          <TableCell component="th" scope="row">
                            {creditDurationText}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Down Payment </TableCell>
                          <TableCell component="th" scope="row">
                            {downPayment} DT
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Monthly Installment </TableCell>
                          <TableCell component="th" scope="row">
                            {monthlyPayment} DT
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                </Grid>
                {/* <Grid item xs={12}>
                      <Divider textAlign="left">
                        <Typography variant="h5">Payment Details</Typography>
                      </Divider>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell component="th" scope="row">
                                {monthlyInstallments}
                              </TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                      </TableContainer>
                    </Grid> */}
              </Grid>
            </Paper>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Invoice;
