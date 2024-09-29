import React, { useEffect, useState } from "react";
import "./index.css";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import {
  AddOutlined,
  DeleteOutlineOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { tokens } from "../../../theme";

import { useNavigate } from "react-router-dom";
import StatusChip from "../../../components/global/statusChip";
import CustomMenu from "../../../components/global/customMenu";
import CustomTable from "../../../components/global/customTable";
import UpdateModal from "../../../components/modals/updateModal";
import DeleteModal from "../../../components/modals/deleteModal";
import { useDispatch, useSelector } from "react-redux";
import { getCorporateList } from "../../../redux/action/corporateActions/getCorporateList";
import { deleteCorporate } from "../../../redux/action/corporateActions/deleteCorporate";
import { fetchCorporateById } from "../../../redux/action/corporateActions/fetchCorporateById";
import { toast } from "react-toastify";
import { putCorporate } from "../../../redux/action/corporateActions/putCorporate";
import UserInfoModal from "../../../components/modals/userInfoModal";

export default function Corporates() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isUpdateModalOpen, setisUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [isUserInfoMdoalOpen, setIsUserInfoModalOpen] = useState(false);
  const [selectedCorporateId, setSelectedCorporateId] = useState();
  const [updatedData, setUpdatedData] = useState({});
  const corporates = useSelector((state) => state.corporateReducer.corporates);
  const selectedCorporate = useSelector(
    (state) => state.corporateReducer.selectedCorporate
  );
  const loading = useSelector((state) => state.corporateReducer.loading);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(getCorporateList(token));
    }
  }, []);

  const handleDelete = (corporateId) => {
    dispatch(deleteCorporate(corporateId, token))
      .then(() => {
        toast.success("Corporate deleted successfully!");
        setisDeleteModalOpen(false);
      })
      .catch(() => {
        toast.error("Failed to delete corporate");
      });
  };

  const handleUpdate = async (data) => {
    const updatedCorporate = await dispatch(putCorporate(data, token));
    if (updatedCorporate) {
      toast.success("Corporate updated successfully!");
      setisUpdateModalOpen(false);
      return;
    }
    toast.error("Failed to update corporate");
  };

  const handleCorporateClick = async (elementId) => {
    setIsUserInfoModalOpen(true);
    setSelectedCorporateId(elementId);
    await dispatch(fetchCorporateById(elementId, token));
  };

  const handleAddButtonClick = () => {
    navigate("/dashboard/corporates/add");
  };

  const options = [
    {
      title: "Edit",
      icon: <EditOutlined />,
      openModal: async (corporateId) => {
        const corporate = await dispatch(
          fetchCorporateById(corporateId, token)
        );
        if (corporate) {
          setSelectedCorporateId(corporateId);
          setUpdatedData(corporateId);
          setisUpdateModalOpen(true);
        }
      },
    },
    {
      title: "Delete",
      icon: <DeleteOutlineOutlined />,
      openModal: (corporateId) => {
        setSelectedCorporateId(corporateId);
        setisDeleteModalOpen(true);
      },
    },
  ];

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "tin",
      headerName: "TIN",
      width: 170,
      renderCell: ({ row }) => (
        <>
          <div
            style={{
              textDecoration: "none",
              cursor: "pointer",
              color: colors.blueAccent[600],
            }}
            onClick={() => handleCorporateClick(row.id)}
          >
            {row.tin}
          </div>
        </>
      ),
    },
    {
      field: "corporateName",
      headerName: "Corporate Name",
      flex: 1,
      renderCell: ({ row }) => <>{row.corporateName}</>,
    },
    {
      field: "sector",
      headerName: "Sector",
      flex: 1,
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
      flex: 1,
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
        <Typography variant="h2">Corporates List</Typography>
        <CustomTable
          subtitle="Check and handle corporates"
          addButtonTitle="Add
          new corporate"
          startIcon={<AddOutlined />}
          handleAddButtonClick={handleAddButtonClick}
          columns={columns}
          rows={corporates}
          page="Corporates management"
        />
      </>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        toggleModal={setisDeleteModalOpen}
        handleCloseModal={() => setisDeleteModalOpen(false)}
        elementId={selectedCorporateId}
        handleDelete={handleDelete}
      />
      <UserInfoModal
        title="Corporate Information"
        isCorporate={true}
        isOpen={isUserInfoMdoalOpen}
        toggleModal={setIsUserInfoModalOpen}
        handleCloseModal={() => setIsUserInfoModalOpen(false)}
        user={selectedCorporate}
      />
      <UpdateModal
        title="Edit Corporate"
        isCorporate={true}
        isOpen={isUpdateModalOpen}
        toggleModal={setisUpdateModalOpen}
        handleCloseModal={() => setisUpdateModalOpen(false)}
        user={selectedCorporate}
        handleSave={handleUpdate}
      />
    </>
  );
}
