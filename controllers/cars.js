const Cars = require("../models/cars");

exports.getCarDescription = (req, res, next) => {
  res.render("shop/car-description", {
    pageTitle: "Add Desciption",
  });
};

exports.getCarsListing = (req, res, next) => {
  Cars.find().then((cars) => {
    res.render("shop/main", {
      cars: cars,
    });
  });
};

exports.getCarDescriptionById = (req, res, next) => {
  const carId = req.params.carId;
  Cars.findById(carId)
    .then((car) => {
      res.render("shop/car-description", {
        car: car,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.main = (req, res, next) => {
  res.render("includes/landing", {
    pageTitle: "Add Product",
    path: "/",
  });
};

exports.filter = (req, res, next) => {
  const brand = req.body.brand;
  const transmission = req.body.transmission;
  const model = req.body.model;
  const type = req.body.cartype;

  const query = {};

  if (brand) {
    query.brand = brand;
  }
  if (transmission) {
    query.transmission = transmission;
  }
  if (model) {
    query.model = model;
  }
  if (type) {
    query.carType = type;
  }

  Cars.find({
    query,
    // $and: [
    //   { transmission: transmission },
    //   { carType: type }, // Check if carType matches 'type'
    //   { brand: brand }, // Check if brand matches 'brand'
    // ],
  })
    .then((cars) => {
      res.render("shop/main", {
        cars: cars,
      });
      console.log(query);
    })
    .catch((err) => {
      console.log(err);
    });
};
