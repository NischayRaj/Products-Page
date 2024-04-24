import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import image from "../assets/img.jpg";

function ProductTable({ products, onRowClick, categoryFilter, searchTerm }) {
  // Filter products based on the selected category
  console.log(categoryFilter);
  const filteredProductsByCategory = categoryFilter
    ? products.filter(
        (product) =>
          product.main_category.toLowerCase() === categoryFilter.toLowerCase()
      )
    : products;

  // Filter products based on the search term
  const filteredProductsBySearch = searchTerm
    ? filteredProductsByCategory.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProductsByCategory;

  // Function to generate random price between 10 and 30
  const fixedPrices = [25, 15, 30, 10, 5, 20, 35, 40, 45];

  // Update filtered products with fixed prices if price is empty
  const productsWithPrice = filteredProductsBySearch.map((product, index) => ({
    ...product,
    price: product.price || fixedPrices[index],
  }));

  return (
    <div className="data-grid-container">
      <DataGrid
        rows={productsWithPrice}
        columns={[
          { field: "name", headerName: "Name", width: 500 },
          { field: "brand", headerName: "Brand", width: 200 },
          { field: "main_category", headerName: "Main Category", width: 230 },
          {
            field: "image",
            headerName: "Image",
            width: 200,
            renderCell: (params) => (
              <img
                src={image}
                alt="Product"
                style={{ width: "50px", height: "auto" }}
              />
            ),
          },
          { field: "price", headerName: "Price", width: 180 },
          {
            field: "action",
            headerName: "Action",
            width: 100,
            renderCell: (params) => (
              <Link
                to={`/product/${encodeURIComponent(params.row.name)}`}
                style={{ textDecoration: "none", textAlign: "center" }}
                onClick={() => onRowClick(params.row.name)}
              >
                View Details
              </Link>
            ),
          },
        ]}
        pageSize={5}
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        disableColumnSort
        disableSelectionOnClick
        style={{ width: 1450, height: 580 }}
      />
    </div>
  );
}

export default ProductTable;
