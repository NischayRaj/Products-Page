const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 5000; // Or any other port you prefer

app.use(cors());

// Define the API endpoint to serve the JSON data
app.get("/api/products", (req, res) => {
  try {
    // Read the JSON file synchronously
    const jsonData = fs.readFileSync("products.json", "utf8");
    // Parse the JSON data into a JavaScript object
    const productsData = JSON.parse(jsonData);
    console.log(productsData)
    // Send the products data as the response
    res.json(productsData);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
