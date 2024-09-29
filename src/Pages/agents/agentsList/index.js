import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import {
  AddOutlined,
  DeleteOutlineOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { tokens } from "../../../theme";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomMenu from "../../../components/global/customMenu";
import UpdateModal from "../../../components/modals/updateModal";
import CustomTable from "../../../components/global/customTable";
import DeleteModal from "../../../components/modals/deleteModal";
import UserInfoModal from "../../../components/modals/userInfoModal";
import { getAgentList } from "../../../redux/action/agentActions/getAgentList";
import { deleteAgent } from "../../../redux/action/agentActions/deleteAgent";
import { fetchAgentById } from "../../../redux/action/agentActions/fetchAgentById";
import {
  putAgent,
  updateAgent,
} from "../../../redux/action/agentActions/updateAgent";
import StatusChip from "../../../components/global/statusChip";
import { toast } from "react-toastify";

const AgentsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isUpdateModalOpen, setisUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [isUserInfoMdoalOpen, setIsUserInfoModalOpen] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState();
  const [updatedData, setUpdatedData] = useState("");
  const agents = useSelector((state) => state.agentReducer.agents);
  const selectedAgent = useSelector(
    (state) => state.agentReducer.selectedAgent
  );

  const loading = useSelector((state) => state.agentReducer.loading);
  const token = useSelector((state) => state.auth.token);
  const options = [
    {
      title: "Edit",
      icon: <EditOutlined />,
      openModal: async (agentId) => {
        const corporate = await dispatch(fetchAgentById(agentId, token));
        if (corporate) {
          setSelectedAgentId(agentId);
          setUpdatedData(agentId);
          setisUpdateModalOpen(true);
        }
      },
    },
    {
      title: "Delete",
      icon: <DeleteOutlineOutlined />,
      openModal: (agentId) => {
        setSelectedAgentId(agentId);
        setisDeleteModalOpen(true);
      },
    },
  ];

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      cellClassName: "centered-cell",
      flex: 1,
      renderCell: ({ row }) => (
        <div
          style={{
            textDecoration: "none",
            cursor: "pointer",
            color: colors.blueAccent[700],
          }}
          onClick={() => handleAgentClick(row.id)()}
        >
          {`${row.firstName} ${row.lastName}`}
        </div>
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
    // {
    //   field: "managedCorporate",
    //   headerName: "Corporate",
    //   flex: 1,
    //   renderCell: ({ row }) => <div>{row?.corporate?.corporateName}</div>,
    // },
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

  useEffect(() => {
    dispatch(getAgentList());
  }, [dispatch]);

  const handleDelete = (elementId) => {
    dispatch(deleteAgent(elementId))
      .then(() => {
        toast.success("Agent deleted successfully!");
        setisDeleteModalOpen(false);
      })
      .catch(() => {
        toast.error("Failed to delete agent");
      });
  };

  const handleAgentClick = (elementId) => {
    setIsUserInfoModalOpen(true);
    setSelectedAgentId(elementId);
    dispatch(fetchAgentById(elementId));
  };

  const handleUpdate = async (data) => {
    const updatedAgent = await dispatch(putAgent(data, token));
    if (updatedAgent) {
      toast.success("Agent updated successfully!");
      setisUpdateModalOpen(false);
      return;
    }
    toast.error("Failed to update agent");
  };

  const handleAddButtonClick = () => {
    navigate("/dashboard/agents/add");
  };

  return loading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <>
      <>
        <Typography variant="h2">Agents List</Typography>
        <CustomTable
          subtitle="Check and handle agents"
          addButtonTitle="Add new agent"
          startIcon={<AddOutlined />}
          handleAddButtonClick={handleAddButtonClick}
          columns={columns}
          rows={agents}
          page="Agents management"
        />
      </>

      <UpdateModal
        title="Edit Agent"
        isAgent={true}
        isOpen={isUpdateModalOpen}
        toggleModal={setisUpdateModalOpen}
        handleCloseModal={() => setisUpdateModalOpen(false)}
        user={selectedAgent}
        handleSave={handleUpdate}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        toggleModal={setisDeleteModalOpen}
        handleCloseModal={() => setisDeleteModalOpen(false)}
        elementId={selectedAgentId}
        handleDelete={handleDelete}
      />
      <UserInfoModal
        title="Agent Information"
        isAgent={true}
        isOpen={isUserInfoMdoalOpen}
        toggleModal={setIsUserInfoModalOpen}
        handleCloseModal={() => setIsUserInfoModalOpen(false)}
        user={selectedAgent}
      />
    </>
  );
};

export default AgentsList;
