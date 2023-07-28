import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ search, handleChange, handleClick, showClearIcon }) => {
  return (
    <>
      <TextField
        size="small"
        variant="outlined"
        onChange={handleChange}
        value={search}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              style={{ display: showClearIcon }}
              onClick={handleClick}
            >
              <ClearIcon />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default SearchBar;
