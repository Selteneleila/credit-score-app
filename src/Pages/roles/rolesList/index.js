import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import {
  AddOutlined,
  DeleteOutlineOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRolesList } from "../../../redux/action/roleActions/getRolesList";
import CustomTable from "../../../components/global/customTable";
import CustomMenu from "../../../components/global/customMenu";
import UpdateModal from "../../../components/modals/updateModal";
import { deleteRole } from "../../../redux/action/roleActions/deleteRole";
import { toast } from "react-toastify";
import DeleteModal from "../../../components/modals/deleteModal";
import { getRoleById } from "../../../redux/action/roleActions/getRoleById";
import { putRole, updateRole } from "../../../redux/action/roleActions/putRole";
import { tokens } from "../../../theme";
import { fetchRoleById } from "../../../redux/action/roleActions/fetchRoleById";

export default function RolesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState();
  const [updatedData, setUpdatedData] = useState("");
  const roles = useSelector((state) => state.roleReducer.roles);
  const loading = useSelector((state) => state.roleReducer.loading);
  const selectedRole = useSelector((state) => state.roleReducer.selectedRole);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(getRolesList());
  }, [dispatch]);

  const handleDelete = (elementId) => {
    dispatch(deleteRole(elementId, token))
      .then(() => {
        toast.success("Role deleted successfully!");
        setisDeleteModalOpen(false);
      })
      .catch(() => {
        toast.error("Failed to delete role");
      });
  };
  const handleUpdate = async (data) => {
    const updatedAdmin = await dispatch(putRole(data, token));
    if (updatedAdmin) {
      toast.success("Admin updated successfully!");
      setIsUpdateModalOpen(false);
      return;
    }
    toast.error("Failed to update admin");
  };

  const handleAddButtonClick = () => {
    navigate("/dashboard/roles/add");
  };

  const options = [
    {
      title: "Edit",
      icon: <EditOutlined />,
      openModal: async (roleId) => {
        const corporate = await dispatch(fetchRoleById(roleId, token));
        if (corporate) {
          setSelectedRoleId(roleId);
          setUpdatedData(roleId);
          setIsUpdateModalOpen(true);
        }
      },
    },
    {
      title: "Delete",
      icon: <DeleteOutlineOutlined />,
      openModal: (roleId) => {
        setSelectedRoleId(roleId);
        setisDeleteModalOpen(true);
      },
    },
  ];
  const columns = [
    {
      field: "id",
      headerName: "Role ID",
      width: 140,
      renderCell: ({ row }) => <>{`${row.id}`}</>,
    },
    {
      field: "roleName",
      headerName: "Role Name",
      flex: 1,
      renderCell: ({ row }) => <>{`${row.roleName}`}</>,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: ({ row: { id } }) => {
        return <CustomMenu options={options} clientId={id} />;
      },
    },
  ];

  return loading ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <>
        <Typography variant="h2">Roles and Permissions</Typography>
        <CustomTable
          subtitle="Consult and create new roles  "
          addButtonTitle="Add new role"
          startIcon={<AddOutlined />}
          handleAddButtonClick={handleAddButtonClick}
          columns={columns}
          rows={roles}
          page="User permissions"
        />
      </>
      <UpdateModal
        title="Edit Role"
        isRole={true}
        isOpen={isUpdateModalOpen}
        toggleModal={setIsUpdateModalOpen}
        handleCloseModal={() => setIsUpdateModalOpen(false)}
        user={selectedRole}
        handleSave={handleUpdate}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        toggleModal={setisDeleteModalOpen}
        handleCloseModal={() => setisDeleteModalOpen(false)}
        elementId={selectedRoleId}
        handleDelete={handleDelete}
      />
    </>
  );
}
