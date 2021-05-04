const express = require("express");
const { User } = require("./models");
const app = express();
const port = 8000;

app.get("/Users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get("/User/:username", async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({
    where: {
      Username: username,
    },
  });
  res.json(user);
});

app.post("/newUser", async (req, res) => {
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    Username: req.body.Username,
    Password: req.body.Password,
    Address: req.body.Address,
    Country: req.body.Country,
    State: req.body.State,
    zip: req.body.zip,
    NameOnCard: req.body.NameOnCard,
    CardNumber: req.body.CardNumber,
    Expiration: req.body.Expiration,
    cvv: req.body.cvv,
  });

  res.status(201).json({
    status: "ok",
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
