import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());

app.get("/api/products", (req, res) => {
  try {
    const jsonData = fs.readFileSync("products.json", "utf8");
    const productsData = JSON.parse(jsonData);
    console.log(productsData);
    res.json(productsData);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
