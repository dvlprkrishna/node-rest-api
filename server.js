const express = require("express");
const app = express();

// Routes
app.get("/", (req, res) => {
  res.send("Hello Node");
});

app.listen(3000, () => {
  console.log("node running");
});
