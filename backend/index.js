const express = require("express");
const { User } = require("./models");
const app = express();
const port = 8000;

app.get("/Users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
