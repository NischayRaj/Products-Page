import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function ProductFilter({
  searchTerm,
  handleSearchChange,
  categoryFilter,
  handleCategoryFilterChange,
}) {
  return (
    <div className="filter-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by product name"
        className="search"
      />
      <FormControl className="filter-dropdown">
        <InputLabel id="category-filter-label">Category</InputLabel>
        <Select
          labelId="category-filter-label"
          id="category-filter"
          value={categoryFilter}
          label="Category"
          onChange={handleCategoryFilterChange}
          placeholder="Categories"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Snacks & Branded Foods">
            Snacks & Branded Foods
          </MenuItem>
          <MenuItem value="Bakery, Cakes & Dairy">
            Bakery, Cakes & Dairy
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default ProductFilter;
