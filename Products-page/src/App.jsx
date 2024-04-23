import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

 useEffect(() => {
   const fetchData = async () => {
     setLoading(true);
     try {
       const response = await axios.get(`http://localhost:5000/api/products`);
       // Generate unique ids for each row
       const productsWithIds = response.data.products.map((product, index) => ({
         ...product,
         id: index + 1, // You can use any unique identifier here
       }));
       setProducts(productsWithIds);
     } catch (error) {
       setError(error);
     } finally {
       setLoading(false);
     }
   };

   fetchData();
 }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by product name"
        />
        <FormControl>
          <InputLabel id="category-filter-label">Category</InputLabel>
          <Select
            labelId="category-filter-label"
            id="category-filter"
            value={categoryFilter}
            label="Category"
            onChange={handleCategoryFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            {/* Populate the dropdown with categories */}
          </Select>
        </FormControl>
        <FormControl>
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
      <DataGrid
        rows={filteredProducts}
        columns={[
          { field: "id", headerName: "ID", width: 100 },
          { field: "name", headerName: "Name", width: 300 },
          { field: "brand", headerName: "Brand", width: 200 },
          { field: "main_category", headerName: "Main Category", width: 200 },
          {
            field: "images.front",
            headerName: "Image",
            width: 200,
            renderCell: (params) => (
              <img src={params.value} alt="Product" style={{ width: 100 }} />
            ),
          },
          { field: "description", headerName: "Details", width: 400 },
        ]}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default App;
