const express = require("express");
const { User } = require("./models");
const app = express();
const cors = require("cors");
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
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
  console.log(req.body);
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
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
    Phone: req.body.Phone,
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