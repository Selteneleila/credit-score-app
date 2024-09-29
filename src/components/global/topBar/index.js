import React, { useContext } from "react";
import { ColorModeContext } from "../../../theme";
import userAvatar from "../../../assets/userAvatar.svg";
import { styled } from "@mui/material/styles";
import {
  LightModeOutlined,
  DarkModeOutlined,
  NotificationsOutlined,
  LogoutOutlined,
  SettingsOutlined,
} from "@mui/icons-material/";
import {
  Popover,
  Divider,
  Menu,
  ListItemIcon,
  Typography,
  Avatar,
  MenuItem,
  Box,
  IconButton,
  useTheme,
  Tooltip,
} from "@mui/material";
import { tokens } from "../../../theme";
import { useNavigate } from "react-router-dom";
import "./index.css";
function stringAvatar(name) {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
const StyledAvatar = styled(Avatar)`
  ${({ theme }) => `
  cursor: pointer;
  transition: ${theme.transitions.create(["background-color", "transform"], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    transform: scale(1.3);
  }
  `}
`;
const Topbar = () => {
  const [popover, setPopover] = React.useState(null);

  const handlePopoverClick = (event) => {
    setPopover(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopover(null);
  };
  const openPopover = Boolean(popover);
  const popoverId = openPopover ? "simple-popover" : undefined;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Box display="flex" justifyContent="flex-end">
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <LightModeOutlined />
        ) : (
          <DarkModeOutlined />
        )}
      </IconButton>
      <IconButton aria-describedby={popoverId} onClick={handlePopoverClick}>
        <NotificationsOutlined />
      </IconButton>
      <Popover
        id={popoverId}
        open={openPopover}
        anchorEl={popover}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
      <Tooltip>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <StyledAvatar
            sx={{
              bgcolor: colors.blueAccent[300],
              width: 30,
              height: 30,
              fontSize: 12,
            }}
            {...stringAvatar("Kent Dodds")}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 6,
          sx: {
            "& .MuiAvatar-root": {
              width: 50,
              height: 50,
              ml: -0.5,
              mr: 2,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "default",
            padding: "1rem",
          }}
        >
          <Avatar src={userAvatar} alt="user avatar" />
          <div style={{}}>
            <Typography
              sx={{ pt: 1 }}
              variant="h4"
              color={colors.blueAccent[300]}
            >
              Jallel Brik
            </Typography>
            <Typography variant="h5" color={colors.blueAccent[600]}>
              Super Admin
            </Typography>
          </div>
        </div>
        <MenuItem onClick={() => navigate("/dashboard/profile")}>
          <ListItemIcon>
            <SettingsOutlined />
          </ListItemIcon>
          Profile Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutOutlined />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Topbar;
