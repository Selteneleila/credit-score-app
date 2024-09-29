import * as React from "react";
import { useState } from "react";
import { styled, Paper, Typography } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import "./index.css";
import { tokens } from "../../../theme";
import {
  useTheme,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Box,
} from "@mui/material";
import {
  SpeedOutlined,
  ArrowBackOutlined,
  MenuOutlined,
  DashboardOutlined,
  CorporateFareOutlined,
  SupervisorAccountRounded,
  SettingsOutlined,
  AdminPanelSettings,
  Person,
  LockOpenOutlined,
  AddCircleOutlineOutlined,
} from "@mui/icons-material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Statistical from "../../scenes/statistical";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const drawerWidth = 230;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const lists = [
  {
    items: [
      {
        title: "Dashboard",
        icon: <DashboardOutlined />,
        linkTo: "/dashboard",
        reference: "Dashboard",
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Corporates",
        icon: <CorporateFareOutlined />,
        linkTo: "corporates",
        reference: "Corporates management",
      },
      {
        title: "Admins",
        icon: <AdminPanelSettings />,
        linkTo: "admins",
        reference: "Admins management",
      },
      {
        title: "Agents",
        icon: <SupervisorAccountRounded />,
        linkTo: "agents",
        reference: "Agents management",
      },
      {
        title: "Clients",
        icon: <Person />,
        linkTo: "clients",
        reference: "Clients management",
        subitems: [
          {
            title: "Add",
            icon: <AddCircleOutlineOutlined />,
            linkTo: "clients/add",
            reference: "Clients management",
          },
          {
            title: "Credit Score",
            icon: <SpeedOutlined />,
            linkTo: "credit-score",
            reference: "Credit score consultation",
          },
        ],
      },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        title: "Roles",
        icon: <LockOpenOutlined />,
        linkTo: "roles",
        reference: "User permissions",
      },

      {
        title: "Score Configuration",
        icon: <SettingsOutlined />,
        linkTo: "score-configuration",
        reference: "Score configuration",
      },
      {
        title: "Credit Score",
        icon: <SpeedOutlined />,
        linkTo: "credit-score",
        reference: "Credit score consultation",
      },
    ],
  },
];
export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { accountPermission } = useSelector((state) => state.roleReducer);
  const [permission, setPermission] = useState([]);
  useEffect(() => {
    setPermission(
      JSON.parse(
        accountPermission?.permission || localStorage.getItem("permissions")
      )
    );
  }, [accountPermission]);

  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        PaperProps={{
          style: {
            backgroundColor: colors.blueAccent[900],
          },
        }}
        variant="permanent"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpen(!open)}>
            {open === true ? <ArrowBackOutlined /> : <MenuOutlined />}
          </IconButton>
        </DrawerHeader>
        {open && <div>{/* logo */}</div>}
        <List>
          {lists.map(({ title, items }, index) => (
            <div key={index}>
              {open && (
                <ListItem key={title} disablePadding>
                  <ListItemText
                    className="list-item-header"
                    primary={title}
                    sx={{
                      color: colors.blueAccent[400],

                      opacity: open ? 1 : 0,
                    }}
                  />
                </ListItem>
              )}

              {items.map(
                ({ title, icon, linkTo, reference }, index) =>
                  permission?.some(
                    (item) => item?.module === reference && item?.read
                  ) && (
                    <span onClick={() => navigate(linkTo)} key={index}>
                      <ListItem
                        key={title}
                        disablePadding
                        sx={{ display: "block" }}
                      >
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            {icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={title}
                            sx={{
                              opacity: open ? 1 : 0,
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    </span>
                  )
              )}
            </div>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Paper elevation={2} className="drawer-main-content">
          <Outlet />
          {pathname === "/dashboard" && <Statistical />}
        </Paper>
      </Box>
    </Box>
  );
}
