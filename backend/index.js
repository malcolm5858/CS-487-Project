const express = require("express");
const { User, Drive } = require("./models");
const app = express();
const cors = require("cors");
const port = 8000;
const accessTokenSecret = "youraccesstokensecret";
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader;
    console.log("Token:" + token);
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      console.log(user);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get("/Users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get("/Drives", authenticateJWT, async (req, res) => {
  const drives = await Drive.findAll();
  res.json(drives);
});

app.get("/DrivesDrivers", authenticateJWT, async (req, res) => {
  const drives = await Drive.findAll();
  const drivers = [];

  for (i = 0; i < drives.length; i++) {
    const user = await User.findOne({
      where: {
        id: drives[i].drive_id,
      },
    });
    drivers.push(user);
  }

  res.json(drivers);
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
app.get("/GetUser", authenticateJWT, async (req, res) => {
  const id = req.user.id;
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  res.json(user);
});
app.get("/GetUserID/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  res.json(user);
});

app.post("/Login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      Username: username,
    },
  });
  if (user.Password == password) {
    const accessToken = jwt.sign(
      { username: username, id: user.id },
      accessTokenSecret
    );
    res.json({ accessToken });
  } else {
    res.json({ accessToken: "password mismatch" });
  }
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

app.post("/newDrive", async (req, res) => {
  const drive = await Drive.create({
    user_id: req.body.user_id,
    startLocation: req.body.startLocation,
    endLocation: req.body.endLocation,
    price: req.body.price,
    waitTime: req.body.waitTime,
    drive_id: req.body.drive_id,
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
