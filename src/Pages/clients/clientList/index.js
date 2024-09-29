import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import {
  EditOutlined,
  DeleteOutlineOutlined,
  AddOutlined,
  PictureAsPdfOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../theme";
import CustomMenu from "../../../components/global/customMenu";
import CustomTable from "../../../components/global/customTable";
import UpdateModal from "../../../components/modals/updateModal";
import DeleteModal from "../../../components/modals/deleteModal";
import { useDispatch, useSelector } from "react-redux";
import { getClientList } from "../../../redux/action/clientActions/getClientList";
import { fetchClientById } from "../../../redux/action/clientActions/fetchClientById";
import UserInfoModal from "../../../components/modals/userInfoModal";
import { toast } from "react-toastify";
import { deleteClient } from "../../../redux/action/clientActions/deleteClient";
import { putClient } from "../../../redux/action/clientActions/putClient";

const ClientsList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isUpdateModalOpen, setisUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [isUserInfoMdoalOpen, setIsUserInfoModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState();
  const [updatedData, setUpdatedData] = useState("");

  const clients = useSelector((state) => state.clientReducer.clients);
  const selectedClient = useSelector(
    (state) => state.clientReducer.selectedClient
  );

  const loading = useSelector((state) => state.clientReducer.loading);
  const token = useSelector((state) => state.auth.token);

  const options = [
    {
      title: "Edit",
      icon: <EditOutlined />,
      openModal: async (clientId) => {
        const client = await dispatch(fetchClientById(clientId, token));
        if (client) {
          setSelectedClientId(clientId);
          setUpdatedData(clientId);
          setisUpdateModalOpen(true);
        }
      },
    },
    {
      title: "Delete",
      icon: <DeleteOutlineOutlined />,
      openModal: (clientId) => {
        setSelectedClientId(clientId);
        setisDeleteModalOpen(true);
      },
    },
  ];

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      width: 140,
      renderCell: ({ row }) => (
        <>
          <div
            style={{
              textDecoration: "none",
              cursor: "pointer",
              color: colors.blueAccent[400],
            }}
            onClick={() => handleClientClick(row.id)}
          >
            {`${row.firstName} ${row.lastName}`}
          </div>
        </>
      ),
    },
    {
      field: "cin",
      headerName: "CIN",
      width: 140,
      renderCell: ({ row }) => <>{`${row.cin}`}</>,
    },

    {
      field: "birthDate",
      headerName: "Birth Date",
      width: 140,
      renderCell: ({ row }) => <>{`${row.birthDate}`}</>,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 140,
    },
    {
      field: "email",
      headerName: "Email",
      width: 170,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return <CustomMenu options={options} clientId={id} />;
      },
    },
  ];

  useEffect(() => {
    if (token) {
      dispatch(getClientList(token));
    }
  }, []);

  const handleDelete = (elementId) => {
    dispatch(deleteClient(elementId, token))
      .then(() => {
        toast.success("Client deleted successfully!");
        setisDeleteModalOpen(false);
      })
      .catch(() => {
        toast.error("Failed to delete client");
      });
  };
  const handleClientClick = (elementId) => {
    setIsUserInfoModalOpen(true);
    setSelectedClientId(elementId);
    dispatch(fetchClientById(elementId, token));
  };

  const handleUpdate = async (data) => {
    const updatedClient = await dispatch(putClient(data, token));
    if (updatedClient) {
      toast.success("Client updated successfully!");
      setisUpdateModalOpen(false);
      return;
    }
    toast.error("Failed to update client");
  };

  const handleAddButtonClick = () => {
    navigate("/dashboard/clients/add");
  };

  return loading ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <>
        <Typography variant="h2">Client List</Typography>
        <CustomTable
          subtitle="Check and handle clients"
          addButtonTitle="Add new client"
          startIcon={<AddOutlined />}
          handleAddButtonClick={handleAddButtonClick}
          columns={columns}
          rows={clients}
          page="Clients management"
        />
      </>
      <UserInfoModal
        title="Client Information"
        isClient={true}
        isOpen={isUserInfoMdoalOpen}
        toggleModal={setIsUserInfoModalOpen}
        handleCloseModal={() => setIsUserInfoModalOpen(false)}
        user={selectedClient}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        toggleModal={setisDeleteModalOpen}
        handleCloseModal={() => setisDeleteModalOpen(false)}
        elementId={selectedClientId}
        handleDelete={handleDelete}
      />
      <UpdateModal
        title="Edit Client"
        isClient={true}
        isOpen={isUpdateModalOpen}
        toggleModal={setisUpdateModalOpen}
        handleCloseModal={() => setisUpdateModalOpen(false)}
        user={selectedClient}
        handleSave={handleUpdate}
      />
    </>
  );
};

export default ClientsList;
