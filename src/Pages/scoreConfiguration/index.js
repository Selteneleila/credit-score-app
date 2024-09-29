import React, { useEffect, useState } from "react";
import CustomTable from "../../components/global/customTable";
import { FormControlLabel, Typography } from "@mui/material";
import CustomCheckbox from "../../components/global/customCheckbox";

import { useDispatch } from "react-redux";
import { saveScoreConfig } from "../../redux/action/scoreConfig/scoreConfig";

const ScoreConfiguration = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const dispatch = useDispatch();
  const rows = [
    {
      id: 1,
      name: "Age",
      weight: "5",
    },
    {
      id: 2,
      name: "Salary",
      weight: "15",
    },
    {
      id: 3,
      name: "Account Balance",
      weight: "25",
    },
    {
      id: 4,
      name: "Payment History",
      weight: "35",
    },
    {
      id: 5,
      name: "Previous Credit",
      weight: "10",
    },
    {
      id: 6,
      name: "Penalties",
      weight: "10",
    },
  ];

  const [updatedRows, setUpdatedRows] = useState([]);

  useEffect(() => {
    setUpdatedRows(rows?.map((item, index) => item?.weight));
  }, []);

  const columns = [
    { field: "name", headerName: "Variable", flex: 1 },
    {
      field: "weight",
      headerName: "Weight (%)",
      width: 200,
      renderCell: ({ row }) => (
        <input
          style={{
            borderColor: "transparent",
            backgroundColor: "transparent",
            width: "100%",
            height: "100%",
          }}
          value={updatedRows[row?.id - 1]}
          onChange={(e) =>
            setUpdatedRows(
              updatedRows.map((item, index) =>
                index === row.id - 1 ? e?.target?.value : item
              )
            )
          }
        />
      ),
    },
    {
      field: "selected",
      headerName: "Selected",
      type: "checkbox",
      width: 100,
      renderCell: ({ row }) => (
        <FormControlLabel
          control={
            <CustomCheckbox
              checked={selectedRows.includes(row.id)}
              onChange={() => handleCheckboxChange(row.id)}
            />
          }
        />
      ),
    },
  ];

  const handleCheckboxChange = (rowId) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowId)) {
        return prevSelectedRows.filter((id) => id !== rowId);
      } else {
        return [...prevSelectedRows, rowId];
      }
    });
  };

  const handleSaveChanges = () => {
    const selectedRowsData = rows.map((row, index) =>
      selectedRows.includes(row?.id)
        ? {
            value: updatedRows[row?.id - 1],
            selected: true,
          }
        : {
            value: updatedRows[row?.id - 1],
            selected: false,
          }
    );
    const data = {
      age: JSON.stringify(selectedRowsData[0]),
      salary: JSON.stringify(selectedRowsData[1]),
      accountBalance: JSON.stringify(selectedRowsData[2]),
      paymentHistory: JSON.stringify(selectedRowsData[3]),
      previousCredit: JSON.stringify(selectedRowsData[4]),
      penalties: JSON.stringify(selectedRowsData[4]),
    };

    dispatch(saveScoreConfig(data));
  };

  useEffect(() => {
    const storedSelectedRows = JSON.parse(localStorage.getItem("selectedRows"));
    if (storedSelectedRows) {
      setSelectedRows(storedSelectedRows);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedRows", JSON.stringify(selectedRows));
  }, [selectedRows]);

  return (
    <>
      <Typography variant="h2">Credit score configuration</Typography>
      <CustomTable
        subtitle="Configure score calculation settings"
        addButtonTitle="Save changes"
        handleAddButtonClick={handleSaveChanges}
        columns={columns}
        rows={rows.map((row) => ({
          ...row,
          selected: selectedRows.includes(row.id),
        }))}
        page="Score configuration"
      />
    </>
  );
};

export default ScoreConfiguration;
