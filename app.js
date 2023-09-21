const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const Owner = require("./models/owner");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const MONGOURL =
  "mongodb+srv://fahadnoor039:nvckyhp6MaNygMm2@cluster0.sbiqd2o.mongodb.net/fyp";

const carRoutes = require("./routes/cars");
const AuthRoutes = require("./routes/auth");
const ownerRoutes = require("./routes/owner");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  Owner.findById("650aea3e123a77585c278122")
    .then((owner) => {
      req.owner = owner;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
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
