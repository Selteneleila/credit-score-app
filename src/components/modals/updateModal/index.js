import React, { useEffect } from "react";
import {
  Modal,
  Typography,
  Paper,
  Grid,
  Stack,
  FormControlLabel,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import CustomInput from "../../global/customInput";
import CustomButton from "../../global/customButon";
import { useState } from "react";
import CustomTable from "../../global/customTable";
import CustomCheckbox from "../../global/customCheckbox";
import { roleRows } from "../../../utils/roleRows";
import CustomSelect from "../../global/customSelect";

export default function UpdateModal({
  title,
  isOpen,
  toggleModal,
  handleCloseModal,
  user,
  isCorporate,
  isAgent,
  isClient,
  isRole,
  isAdmin,
  handleSave,
}) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [updatedData, setUpdatedData] = useState(user);

  useEffect(() => {
    setUpdatedData(user);
  }, [user]);

  const handlePermissionChange = (event, row, permission) => {
    const newRows = [...roleRows];
    const rowIndex = newRows.findIndex((r) => r.id === row.id);
    newRows[rowIndex] = {
      ...newRows[rowIndex],
      [permission]: event.target.checked,
    };
    setSelectedRows(newRows);
  };
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sectorOptions = [
    { value: "IT", label: "IT" },
    { value: "Banking", label: "Banking" },
  ];

  const handleSelectChange = (name, value) => {
    handleChange({ target: { name, value } });
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;

    setUpdatedData((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <Modal open={isOpen} onClose={() => toggleModal(false)}>
      <Paper
        elevation={12}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 5,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Typography variant="h2">{title}</Typography>
          </Grid>

          <Grid container justifyContent="flex-end" item xs={7}>
            <Stack direction="row" spacing={2}>
              <CustomButton onClick={handleCloseModal} variant="outlined">
                close
              </CustomButton>
              <CustomButton
                variant="contained"
                onClick={() => handleSave(updatedData)}
              >
                Save
              </CustomButton>
            </Stack>
          </Grid>
          <Grid style={{ marginTop: "2rem" }} item xs={12}>
            {isCorporate && (
              <div
                className="scrollbar"
                style={{ maxHeight: 400, overflowY: "scroll" }}
              >
                <Stack
                  direction="column"
                  spacing={3}
                  style={{ paddingTop: "1rem" }}
                >
                  <CustomInput
                    name="id"
                    label="ID"
                    value={updatedData?.id}
                    disabled
                  />
                  <CustomInput
                    name="tin"
                    label="TIN"
                    value={updatedData?.tin}
                    onChange={handleInputChange}
                  />
                  <CustomInput
                    name="corporateName"
                    label="Corporate Name"
                    value={updatedData?.corporateName}
                    onChange={handleInputChange}
                  />
                  <CustomSelect
                    label="Sector"
                    value={
                      sectorOptions.find(
                        ({ value }) => value === updatedData?.sector
                      )?.value
                    }
                    onChange={({ target: { value } }) =>
                      handleSelectChange("sector", value)
                    }
                    options={sectorOptions}
                  />
                  <CustomInput
                    name="website"
                    label="Website"
                    value={updatedData?.website}
                    onChange={handleInputChange}
                  />
                  <CustomInput
                    name="email"
                    label="Email"
                    value={updatedData?.email}
                    onChange={handleInputChange}
                  />
                  <CustomInput
                    name="phone"
                    label="Phone"
                    value={updatedData?.phone}
                    onChange={handleInputChange}
                  />
                  <CustomInput
                    name="stauts"
                    label="Status"
                    value={updatedData?.status}
                    onChange={handleInputChange}
                  />
                </Stack>
              </div>
            )}
            {isAgent && (
              <div
                className="scrollbar"
                style={{ maxHeight: 400, overflowY: "scroll" }}
              >
                <Stack
                  direction="column"
                  spacing={3}
                  style={{ paddingTop: "1rem" }}
                >
                  <CustomInput
                    name="id"
                    label="ID"
                    value={updatedData?.id}
                    onChange={handleInputChange}
                  />
                  <CustomInput
                    name="firstName"
                    label="First Name"
                    value={updatedData?.firstName}
                    onChange={handleInputChange}
                  />
                  <CustomInput
                    name="lastName"
                    label="Last Name"
                    onChange={handleInputChange}
                    value={updatedData?.lastName}
                  />
                  <CustomInput
                    name="birthDate"
                    label="Birth Date"
                    onChange={handleInputChange}
                    value={updatedData?.birthDate}
                  />
                  <CustomInput
                    name="gender"
                    label="Gender"
                    onChange={handleInputChange}
                    value={updatedData?.gender}
                  />

                  <CustomInput
                    name="cin"
                    label="CIN"
                    onChange={handleInputChange}
                    value={updatedData?.cin}
                  />
                  <CustomInput
                    name="passport"
                    label="Passport"
                    onChange={handleInputChange}
                    value={updatedData?.passport}
                  />

                  <CustomInput
                    name="email"
                    label="Email"
                    onChange={handleInputChange}
                    value={updatedData?.email}
                  />
                  <CustomInput
                    name="phoneNumber"
                    label="Phone "
                    onChange={handleInputChange}
                    value={updatedData?.phone}
                  />
                  <CustomInput
                    name="status"
                    label="Status"
                    onChange={handleInputChange}
                    value={updatedData?.status}
                  />
                </Stack>
              </div>
            )}
            {isAdmin && (
              <div
                className="scrollbar"
                style={{ maxHeight: 400, overflowY: "scroll" }}
              >
                <Stack
                  direction="column"
                  spacing={3}
                  style={{ paddingTop: "1rem" }}
                >
                  <CustomInput
                    name="id"
                    label="ID"
                    value={updatedData?.id}
                    onChange={handleInputChange}
                  />
                  <CustomInput
                    name="firstName"
                    label="First Name"
                    value={updatedData?.firstName}
                    onChange={handleInputChange}
                  />
                  <CustomInput
                    name="lastName"
                    label="Last Name"
                    onChange={handleInputChange}
                    value={updatedData?.lastName}
                  />
                  <CustomInput
                    name="birthDate"
                    label="Birth Date"
                    onChange={handleInputChange}
                    value={updatedData?.birthDate}
                  />
                  <CustomInput
                    name="gender"
                    label="Gender"
                    onChange={handleInputChange}
                    value={updatedData?.gender}
                  />

                  <CustomInput
                    name="cin"
                    label="CIN"
                    onChange={handleInputChange}
                    value={updatedData?.cin}
                  />
                  <CustomInput
                    name="passport"
                    label="Passport"
                    onChange={handleInputChange}
                    value={updatedData?.passport}
                  />

                  <CustomInput
                    name="email"
                    label="Email"
                    onChange={handleInputChange}
                    value={updatedData?.email}
                  />
                  <CustomInput
                    name="phoneNumber"
                    label="Phone "
                    onChange={handleInputChange}
                    value={updatedData?.phone}
                  />
                  <CustomInput
                    name="status"
                    label="Status"
                    onChange={handleInputChange}
                    value={updatedData?.status}
                  />
                </Stack>
              </div>
            )}
            {isClient && (
              <div
                className="scrollbar"
                style={{ maxHeight: 400, overflowY: "scroll" }}
              >
                <Stack
                  direction="column"
                  spacing={3}
                  style={{ paddingTop: "1rem" }}
                >
                  <CustomInput
                    name="id"
                    label="ID"
                    value={updatedData?.id}
                    onChange={handleInputChange}
                  />
                  <CustomInput
                    name="firstName"
                    label="First Name"
                    value={updatedData?.firstName}
                    onChange={handleInputChange}
                  />
                  <CustomInput
                    name="lastName"
                    label="Last Name"
                    onChange={handleInputChange}
                    value={updatedData?.lastName}
                  />
                  <CustomInput
                    name="birthDate"
                    label="Birth Date"
                    onChange={handleInputChange}
                    value={updatedData?.birthDate}
                  />
                  <CustomInput
                    name="gender"
                    label="Gender"
                    onChange={handleInputChange}
                    value={updatedData?.gender}
                  />

                  <CustomInput
                    name="cin"
                    label="CIN"
                    onChange={handleInputChange}
                    value={updatedData?.cin}
                  />
                  <CustomInput
                    name="passport"
                    label="Passport"
                    onChange={handleInputChange}
                    value={updatedData?.passport}
                  />

                  <CustomInput
                    name="email"
                    label="Email"
                    onChange={handleInputChange}
                    value={updatedData?.email}
                  />
                  <CustomInput
                    name="phoneNumber"
                    label="Phone "
                    onChange={handleInputChange}
                    value={updatedData?.phone}
                  />
                </Stack>
              </div>
            )}
            {isRole && (
              <>
                <CustomTable
                  isSearchBarVisible={false}
                  addButtonTitle="Save"
                  handleAddButtonClick={handleSave}
                  columns={columns}
                  rows={roleRows}
                  onSelectionModelChange={(newSelection) => {
                    setSelectedRows(newSelection.selectionModel);
                  }}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}
