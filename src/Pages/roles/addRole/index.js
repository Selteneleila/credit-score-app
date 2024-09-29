import React, { useEffect, useState } from "react";
import {
  useTheme,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { tokens } from "../../../theme";

import { AddOutlined } from "@mui/icons-material";
import CustomCheckbox from "../../../components/global/customCheckbox";
import CustomButton from "../../../components/global/customButon";
import CustomInput from "../../../components/global/customInput";
import CustomSelect from "../../../components/global/customSelect";
import AffectAdminModal from "../../../components/modals/affectAdminModal";
import CustomTable from "../../../components/global/customTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRole } from "../../../redux/action/roleActions/addRole";

const AddRole = ({ isAffectRoleToAdminVisible = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRows, setSelectedRows] = useState([]);
  const [newRows, setNewRows] = useState();
  const [roleData, setRoleData] = useState();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const toggleModal = () => setIsAdminModalOpen(!isAdminModalOpen);
  const handleOpenModal = () => setIsAdminModalOpen(true);
  const [selectedValue, setSelectedValue] = useState("");

  const adminOptions = [
    { value: "mohamed", label: "Mohamed" },
    { value: "ahmed", label: "Ahmed" },
  ];

  const columns = [
    { field: "module", headerName: "Module", flex: 1 },
    {
      field: "read",
      headerName: "Read",
      flex: 1,
      renderCell: ({ row }) => (
        <FormControlLabel
          control={
            <CustomCheckbox
              onChange={(event) => handlePermissionChange(event, row, "read")}
            />
          }
        />
      ),
    },
    {
      field: "create",
      headerName: "Create",
      flex: 1,
      renderCell: ({ row }) => (
        <FormControlLabel
          control={
            <CustomCheckbox
              onChange={(event) => handlePermissionChange(event, row, "create")}
            />
          }
        />
      ),
    },
    {
      field: "update",
      headerName: "Update",
      flex: 1,
      renderCell: ({ row }) => (
        <FormControlLabel
          control={
            <CustomCheckbox
              onChange={(event) => handlePermissionChange(event, row, "update")}
            />
          }
        />
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      renderCell: ({ row }) => (
        <FormControlLabel
          control={
            <CustomCheckbox
              onChange={(event) => handlePermissionChange(event, row, "delete")}
            />
          }
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

  useEffect(() => {
    setNewRows([...rows]);
  }, []);

  const handlePermissionChange = (event, row, permission) => {
    const rowIndex = newRows.findIndex((r) => r.id === row.id);
    newRows[rowIndex] = {
      ...newRows[rowIndex],
      [permission]: event.target.checked,
    };
    setSelectedRows(newRows);
  };

  const handleSave = () => {
    console.log(selectedRows);
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <Typography variant="h2">Create new role</Typography>
      </Grid>
      <Grid container justifyContent="flex-end" item xs={7}>
        <Stack direction="row" spacing={2}>
          <CustomButton
            className="admin-form-add-btn"
            onClick={() => navigate("/dashboard/roles/")}
          >
            Back
          </CustomButton>
          <CustomButton
            variant="contained"
            className="admin-form-add-btn"
            type="submit"
            onClick={() => {
              dispatch(
                addRole({
                  ...roleData,
                  permission: JSON.stringify(newRows),
                })
              );
              navigate("/dashboard/roles");
            }}
          >
            add
          </CustomButton>
        </Stack>
      </Grid>

      <Grid item xs={6}>
        <CustomInput
          label="Role name"
          value={roleData?.roleName}
          onChange={(event) =>
            setRoleData({ ...roleData, roleName: event.target.value })
          }
        />
      </Grid>

      <Grid item xs={12}>
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
      </Grid>
      {isAffectRoleToAdminVisible && (
        <Grid item xs={12}>
          <Typography variant="h5">Affect role to admin</Typography>
          <Stack direction="row" spacing={1}>
            <CustomSelect
              label="Affect Role "
              value={selectedValue}
              onChange={handleSelectChange}
              options={adminOptions}
            />
            <IconButton
              sx={{ color: colors.blueAccent[700] }}
              onClick={handleOpenModal}
            >
              <AddOutlined />
            </IconButton>
            <AffectAdminModal
              isOpen={isAdminModalOpen}
              toggleModal={toggleModal}
            />
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};

export default AddRole;
