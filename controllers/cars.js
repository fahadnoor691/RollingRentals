const Cars = require("../models/cars");

exports.getCarDescription = (req, res, next) => {
  res.render("shop/car-description", {
    pageTitle: "Add Desciption",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getCarsListing = (req, res, next) => {
  req.session.isAuth = true;

  Cars.find().then((cars) => {
    res.render("shop/main", {
      cars: cars,
      isAuthenticated: req.session.isLoggedIn,
    });
  });
};

exports.getCarDescriptionById = (req, res, next) => {
  const carId = req.params.carId;

  Cars.findById(carId)
    .then((car) => {
      res.render("shop/car-description", {
        car: car,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.main = (req, res, next) => {
  res.render("includes/landing", {
    pageTitle: "Add Product",
    isAuthenticated: req.session.isLoggedIn,
    path: "/",
  });
};

exports.filter = (req, res, next) => {
  const location = req.body.location;
  Cars.find({ location: location })
    .then((cars) => {
      res.render("shop/main", {
        cars: cars,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
