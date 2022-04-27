const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log(`METHOD: ${req.method}`);
});

const port = 8000;

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
