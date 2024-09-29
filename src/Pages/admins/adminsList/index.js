import React, { useEffect, useState } from "react";
import CustomTable from "../../../components/global/customTable";
import { Typography, useTheme } from "@mui/material";
import {
  AddOutlined,
  DeleteOutlineOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { tokens } from "../../../theme";
import "./index.css";
import CustomMenu from "../../../components/global/customMenu";
import DeleteModal from "../../../components/modals/deleteModal";
import StatusChip from "../../../components/global/statusChip";
import UserInfoModal from "../../../components/modals/userInfoModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdminList } from "../../../redux/action/adminActions/getAdminList";
import { fetchAdminById } from "../../../redux/action/adminActions/fetchAdminById";
import { deleteAdmin } from "../../../redux/action/adminActions/deleteAdmin";
import { toast } from "react-toastify";
import UpdateModal from "../../../components/modals/updateModal";
import { putAdmin } from "../../../redux/action/adminActions/putAdmin";

const Admins = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedAdminId, setSelectedAdminId] = useState();
  const [isUserInfoMdoalOpen, setIsUserInfoModalOpen] = useState(false);
  const [isUpdateModalOpen, setisUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const admins = useSelector((state) => state.adminReducer.admins);
  const selectedAdmin = useSelector(
    (state) => state.adminReducer.selectedAdmin
  );
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(getAdminList(token));
    }
  }, []);

  const options = [
    {
      title: "Edit",
      icon: <EditOutlined />,
      openModal: async (adminId) => {
        const corporate = await dispatch(fetchAdminById(adminId, token));
        if (corporate) {
          setSelectedAdminId(adminId);
          setUpdatedData(adminId);
          setisUpdateModalOpen(true);
        }
      },
    },
    {
      title: "Delete",
      icon: <DeleteOutlineOutlined />,
      openModal: (adminId) => {
        setSelectedAdminId(adminId);
        setisDeleteModalOpen(true);
      },
    },
  ];

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: ({ row }) => (
        <>
          <div
            style={{
              textDecoration: "none",
              cursor: "pointer",
              color: colors.blueAccent[600],
            }}
            onClick={() => handleAdminClick(row.id)}
          >
            {`${row.firstName} ${row.lastName}`}
          </div>
        </>
      ),
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { id, status } }) => {
        return <StatusChip status={status} />;
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: ({ row: { id } }) => {
        return (
          <div>
            <CustomMenu options={options} clientId={id} />
          </div>
        );
      },
    },
  ];

  const handleAdminClick = (elementId) => {
    setIsUserInfoModalOpen(true);
    setSelectedAdminId(elementId);
    dispatch(fetchAdminById(elementId, token));
  };

  const handleDelete = (elementId) => {
    dispatch(deleteAdmin(elementId, token))
      .then(() => {
        toast.success("Client deleted successfully!");
        setisDeleteModalOpen(false);
      })
      .catch(() => {
        toast.error("Failed to delete client");
      });
  };

  const handleUpdate = async (data) => {
    const updatedAdmin = await dispatch(putAdmin(data, token));
    if (updatedAdmin) {
      toast.success("Admin updated successfully!");
      setisUpdateModalOpen(false);
      return;
    }
    toast.error("Failed to update admin");
  };

  const handleAddButtonClick = () => {
    navigate("/dashboard/admins/add");
  };

  return (
    <>
      <>
        <Typography variant="h2">Admins List</Typography>
        <CustomTable
          subtitle="Check and handle admins"
          addButtonTitle="Add new admin"
          startIcon={<AddOutlined />}
          handleAddButtonClick={handleAddButtonClick}
          columns={columns}
          rows={admins}
          page="Admins management"
        />
      </>
      <UserInfoModal
        title="Admin Information"
        isAdmin={true}
        isOpen={isUserInfoMdoalOpen}
        toggleModal={setIsUserInfoModalOpen}
        handleCloseModal={() => setIsUserInfoModalOpen(false)}
        user={selectedAdmin}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        toggleModal={setisDeleteModalOpen}
        handleCloseModal={() => setisDeleteModalOpen(false)}
        elementId={selectedAdminId}
        handleDelete={(elementId) => handleDelete(elementId)}
      />

      <UpdateModal
        title="Edit Admin"
        isAdmin={true}
        isOpen={isUpdateModalOpen}
        toggleModal={setisUpdateModalOpen}
        handleCloseModal={() => setisUpdateModalOpen(false)}
        user={selectedAdmin}
        handleSave={handleUpdate}
      />
    </>
  );
};

export default Admins;
