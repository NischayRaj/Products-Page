import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";

function ProductDetails({ match }) {
  const { productName } = match.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products`);
        const products = response.data.products;
        const foundProduct = products.find(
          (prod) => prod.name.toLowerCase() === productName.toLowerCase()
        );
        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchData();
  }, [productName]);

  if (!product) {
    return <CircularProgress />;
  }

  return (
    <div className="product-details-container">
      <h2>{product.name}</h2>
      <img src={product.images.front} alt={product.name} />
      <p>{product.description}</p>
    </div>
  );
}

export default ProductDetails;
