const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/api", (_req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Server is runing on Vercel" });
});

app.use("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.use((_req, res, next) => {
  res.status(404).json({
    message:
      "Ohh you are lost, read the API documentation to find your way back home :)",
  });
});
app.use((err, _req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
  });
});
module.exports = app;
