import React, { useState } from "react";
import { IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import { MoreVertOutlined } from "@mui/icons-material";
import { tokens } from "../../../theme";

import { useNavigate } from "react-router-dom";
const CustomMenu = ({ options, clientId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleItemClick = (option) => {
    if (option.navigateTo) {
      navigate(option.navigateTo);
    } else {
      option.openModal(clientId);
    }
    handleClose();
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertOutlined />
      </IconButton>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map(({ title, icon, navigateTo, openModal }) => (
          <MenuItem
            key={title}
            onClick={() => handleItemClick({ navigateTo, openModal })}
            disableRipple
          >
            {React.cloneElement(icon, {
              style: { marginRight: "1rem", color: colors.blueAccent[600] },
            })}
            {title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CustomMenu;
