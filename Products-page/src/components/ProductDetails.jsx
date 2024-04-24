// ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import image from '../assets/img.jpg';
import '../styles/Product.css'

function ProductDetails({ data }) {
  const { productName } = useParams(); // Get productName from URL params
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
      <h2 className="product-name">{product.name}</h2>
      <img src={image} alt={product.name} className="product-image" />
      <p className="product">{product.description}</p>
    </div>
  );
}

export default ProductDetails;
