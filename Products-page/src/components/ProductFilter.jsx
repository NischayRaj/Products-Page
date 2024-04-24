import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function ProductFilter({
  searchTerm,
  handleSearchChange,
  categoryFilter,
  handleCategoryFilterChange,
  sortOrder,
  handleSortChange,
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
          <MenuItem value="Whole Wheat">Whole Wheat</MenuItem>
          <MenuItem value="Chocolate">Chocolate</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="filter-dropdown">
        <InputLabel id="sort-order-label">Sort Order</InputLabel>
        <Select
          labelId="sort-order-label"
          id="sort-order"
          value={sortOrder}
          label="Sort Order"
          onChange={handleSortChange}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default ProductFilter;
