const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csurf = require("csurf");
const flash = require("connect-flash");

const Owner = require("./models/owner");
const User = require("./models/user");

const app = express();

const MONGOURL =
  "mongodb+srv://fahadnoor039:nvckyhp6MaNygMm2@cluster0.sbiqd2o.mongodb.net/fyp";

const store = new MongoDBStore({
  uri: MONGOURL,
  collection: "sessions",
});

const csrfProtection = csurf();

app.set("view engine", "ejs");
app.set("views", "views");

const carRoutes = require("./routes/cars");
const AuthRoutes = require("./routes/auth");
const ownerRoutes = require("./routes/owner");

// store.on(
//   "error",
//   console.error.bind(console, "Error in MongoDB Session Store")
// );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "my key ",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.owner) {
    return next();
  }

  Owner.findById(req.session.owner._id)
    .then((owner) => {
      req.owner = owner;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();

  next();
});

app.use(carRoutes);
app.use(AuthRoutes);
app.use(ownerRoutes);

// app.use((req, res, next) => {
//   res.status(404).sendFile(path.join(__dirname, "view", "404.html"));
// });

mongoose
  .connect(MONGOURL)
  .then((res) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
