import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./index.css";
import SearchBar from "../searchBar";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CustomTable = ({
  isSearchBarVisible = true,
  addButtonTitle,
  handleAddButtonClick,
  columns,
  rows,
  checkboxSelection,
  startIcon,
  subtitle,
  page,
  processRowUpdate,
}) => {
  const [data, setData] = useState(rows);
  const [menuItems, setMenuItems] = useState([]);
  const [sortByItem, setSortByItem] = useState();

  useEffect(() => {
    if (rows.length) {
      setData(rows);
      const menuItems = Object.keys(rows[0]);
      setMenuItems(menuItems);
      setSortByItem(menuItems[0]);
    }
  }, [rows]);

  useEffect(() => {
    function sortByKey(key) {
      const cloneData = [...data];
      cloneData.sort((a, b) => {
        if (typeof a[key] === "string") {
          return a[key].localeCompare(b[key]);
        } else {
          return a[key] - b[key];
        }
      });

      return cloneData;
    }

    setData(sortByKey(sortByItem));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortByItem]);

  const handleSearch = (event) => {
    const {
      target: { value },
    } = event;

    if (!value) {
      setData(rows);
      return;
    }
    const dataKeys = Object.keys(rows[0]);
    const filteredData = rows.filter((row) => {
      const attributesMatching = dataKeys.filter((key) =>
        `${row[key]}`.toLowerCase().includes(value.toLowerCase())
      );
      return attributesMatching.length ? true : false;
    });
    setData(filteredData);
  };

  return (
    <div className="table-container" elevation={2}>
      <div className="table-content">
        {isSearchBarVisible && (
          <SearchBar
            subtitle={subtitle}
            startIcon={startIcon}
            menuItems={menuItems}
            handleButtonClick={handleAddButtonClick}
            buttonText={addButtonTitle}
            handleInputChange={handleSearch}
            selectedItem={sortByItem}
            setSelected={setSortByItem}
            page={page}
          />
        )}
        <DataGrid
          checkboxSelection={checkboxSelection}
          rows={data}
          columns={columns}
          disableColumnFilter={true}
          sx={{
            p: 1,
            height: 400,
            width: "100%",
            "& .MuiDataGrid-cell": {
              fontSize: "13px",
              borderBottom: "none",
            },
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </div>
    </div>
  );
};

export default CustomTable;
