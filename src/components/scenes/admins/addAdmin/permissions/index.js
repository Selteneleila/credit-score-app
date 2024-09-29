import React from "react";
import { Typography, Grid, FormControlLabel } from "@mui/material";
import "./index.css";
import CustomInput from "../../../../global/customInput";
import CustomTable from "../../../../global/customTable";
import { useState } from "react";
import CustomCheckbox from "../../../../global/customCheckbox";

export default function Permissions() {
  const [selectedRows, setSelectedRows] = useState([]);
  const columns = [
    { field: "module", headerName: "Module", width: 200 },
    {
      field: "read",
      headerName: "Read",
      width: 250,
      renderCell: ({ row }) => (
        <FormControlLabel
          control={<CustomCheckbox handleChange={handlePermissionChange} />}
        />
      ),
    },
    {
      field: "create",
      headerName: "Create",
      width: 250,
      renderCell: ({ row }) => (
        <FormControlLabel
          control={<CustomCheckbox handleChange={handlePermissionChange} />}
        />
      ),
    },
    {
      field: "update",
      headerName: "Update",
      width: 250,
      renderCell: ({ row }) => (
        <FormControlLabel
          control={<CustomCheckbox handleChange={handlePermissionChange} />}
        />
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 250,
      renderCell: ({ row }) => (
        <FormControlLabel
          control={<CustomCheckbox handleChange={handlePermissionChange} />}
        />
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      module: "Dashboard",
    },
    {
      id: 2,
      module: "Corporates management",
    },
    {
      id: 3,
      module: "Admins management",
    },
    {
      id: 4,
      module: "Agents management",
    },
    {
      id: 5,
      module: "Clients management",
    },
    {
      id: 6,
      module: "Score configuration",
    },
    {
      id: 7,
      module: "User permissions",
    },
    {
      id: 8,
      module: "Credit score consultation",
    },
    {
      id: 9,
      module: "Client solvability",
    },
    {
      id: 10,
      module: "Client invoice",
    },
  ];
  const handleSave = () => {
    console.log(selectedRows);
  };
  const handlePermissionChange = (event, row, permission) => {
    const newRows = [...rows];
    const rowIndex = newRows.findIndex((r) => r.id === row.id);
    newRows[rowIndex] = {
      ...newRows[rowIndex],
      [permission]: event.target.checked,
    };
    setSelectedRows(newRows);
  };

  return (
    <>
      <Typography className="permission-table-title" variant="h5">
        Set Role and Permissions
      </Typography>

      <CustomInput label="Role name" />

      <CustomTable
        isSearchBarVisible={false}
        addButtonTitle="Save"
        handleAddButtonClick={handleSave}
        columns={columns}
        rows={rows}
        onSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection.selectionModel);
        }}
      />
    </>
  );
}
