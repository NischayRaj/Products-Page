import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

function ProductTable({ products }) {
  return (
    <div className="data-grid-container">
      <DataGrid
        rows={products}
        columns={[
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
          {
            field: "action",
            headerName: "Action",
            width: 100,
            renderCell: (params) => (
              <Link
                to={`/product/${encodeURIComponent(params.row.name)}`}
                style={{ textDecoration: "none" }}
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
      />
    </div>
  );
}

export default ProductTable;
