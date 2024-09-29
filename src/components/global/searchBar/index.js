import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { SearchOutlined, FilterListOutlined } from "@mui/icons-material";
import "./index.css";
import CustomInput from "../customInput";
import CustomButton from "../customButon";
import { MenuItem, Stack, Menu, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "20rem",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(CustomInput)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "10rem",
  },
}));

export default function SearchBar({
  buttonText,
  handleButtonClick,
  handleInputChange,
  menuItems,
  setSelected,
  selectedItem,
  startIcon,
  subtitle,
  page,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const { accountPermission } = useSelector((state) => state.roleReducer);
  const [permission, setPermission] = useState([]);

  useEffect(() => {
    setPermission(
      JSON.parse(
        accountPermission?.permission || localStorage.getItem("permissions")
      )?.filter((item) => item?.module === page)
    );
  }, [accountPermission, page]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Typography variant="h5">{subtitle}</Typography>
      </div>
      <div className="search-bar-container">
        <Stack direction="row" spacing={2}>
          <Search onChange={handleInputChange}>
            <SearchIconWrapper>
              <SearchOutlined />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <CustomButton
            onClick={handleClick}
            variant="outlined"
            startIcon={<FilterListOutlined />}
          >
            Sort By
          </CustomButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {menuItems.map((item) => (
              <MenuItem
                selected={selectedItem === item}
                key={item}
                onClick={() => setSelected(item)}
              >
                {item.toUpperCase()}
              </MenuItem>
            ))}
          </Menu>
          {permission.length > 0 && permission[0]?.create && (
            <CustomButton
              variant="contained"
              startIcon={startIcon}
              onClick={handleButtonClick}
            >
              {buttonText}
            </CustomButton>
          )}
        </Stack>
      </div>
    </div>
  );
}
