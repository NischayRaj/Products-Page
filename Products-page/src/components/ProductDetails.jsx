// ProductDetails.jsx

import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

function ProductDetails({ data, productName }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Filter the product based on the selected product name
    const foundProduct = data.find(
      (prod) => prod.name.toLowerCase() === productName.toLowerCase()
    );
    setProduct(foundProduct);
  }, [data, productName]);

  if (!product) {
    return <CircularProgress />;
  }

  return (
    <div className="product-details-container">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
    </div>
  );
}

export default ProductDetails;
