import React, { useEffect, useState } from "react";
import { Typography, Stack, IconButton, useTheme, Grid } from "@mui/material";
import { AddOutlined, DeleteOutlined } from "@mui/icons-material";
import CustomInput from "../../customInput";
import CustomSelect from "../../customSelect";
import { tokens } from "../../../../theme";

const ContactDetails = ({ handleChange, errors, title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const contactOptions = [
    { value: "Phone", label: "Phone" },
    { value: "Email", label: "Email" },
  ];
  const [rows, setRows] = useState([{ id: 1, contact: "", value: "" }]);
  const [rowCounter, setRowCounter] = useState(1);

  useEffect(() => {
    handleChange(rows.map(({ contact, value }) => ({ contact, value })));
  }, [rows]);

  const handleSelectChange = (event, rowId) => {
    const { value } = event.target;
    const updatedRows = rows.map((row) =>
      row.id === rowId ? { ...row, contact: value, value: "" } : row
    );
    setRows(updatedRows);
  };

  const handleInputChange = (event, rowId) => {
    const { value } = event.target;
    const updatedRows = rows.map((row) =>
      row.id === rowId ? { ...row, value } : row
    );
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    const nbRows = rowCounter + 1;
    setRows([...rows, { id: nbRows, contact: "", value: "" }]);
    setRowCounter(nbRows);
  };

  const handleDeleteRow = (rowId) => {
    setRows(rows.filter((row) => row.id !== rowId));
  };

  const renderInput = (row) => {
    switch (row.contact) {
      case "Email":
        return (
          <CustomInput
            name="email"
            label="Email"
            value={row.value}
            id={row.id}
            type="email"
            error={!!errors.emailError}
            fullWidth
            onChange={(event) => handleInputChange(event, row.id)}
          />
        );
      case "Phone":
        return (
          <CustomInput
            name="phone"
            label="Phone"
            type="number"
            id={row.id}
            value={row.value}
            error={!!errors.phoneNumberError}
            fullWidth
            onChange={(event) => handleInputChange(event, row.id)}
          />
        );
      default:
        return null;
    }
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">{title}</Typography>
        <IconButton onClick={handleAddRow}>
          <AddOutlined sx={{ color: colors.blueAccent[700] }} />
        </IconButton>
      </div>

      <Grid
        direction="row"
        className="scrollbar"
        style={{
          height: "130px",
          ...(rows.length > 2 && { overflowY: "scroll" }),
        }}
      >
        {rows.map((row) => (
          <Grid item key={row.id}>
            <Stack direction="row" spacing={1} style={{ paddingTop: "0.5rem" }}>
              <CustomSelect
                label="Contact"
                value={row.contact}
                onChange={(event) => handleSelectChange(event, row.id)}
                error={!!errors.contactTypeError}
                options={contactOptions}
              />
              {renderInput(row)}
              {rows.length > 1 && (
                <IconButton onClick={() => handleDeleteRow(row.id)}>
                  <DeleteOutlined sx={{ color: colors.blueAccent[700] }} />
                </IconButton>
              )}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ContactDetails;
