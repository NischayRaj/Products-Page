import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import "./App.css";
import ProductFilter from "./components/ProductFilter";
import ProductTable from "./components/ProductTable";
import ProductDetails from "./components/ProductDetails";

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
        const productsWithIds = response.data.products.map(
          (product, index) => ({
            ...product,
            id: index + 1,
          })
        );
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

  const uniqueProductNames = new Set();
  const uniqueFilteredProducts = filteredProducts.filter((product) => {
    if (uniqueProductNames.has(product.name.toLowerCase())) {
      return false;
    } else {
      uniqueProductNames.add(product.name.toLowerCase());
      return true;
    }
  });

  return (
    <Router>
      <div className="container">
        <ProductFilter
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          categoryFilter={categoryFilter}
          handleCategoryFilterChange={handleCategoryFilterChange}
          sortOrder={sortOrder}
          handleSortChange={handleSortChange}
        />
        <ProductTable products={uniqueFilteredProducts} />
      </div>
      <Routes>
        <Route path="/product/:productName" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
