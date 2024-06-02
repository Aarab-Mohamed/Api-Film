const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));

app.get("/api_key", (req, res) => {
  res.json({ apiKey: process.env.API_KEY });
});

app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});
