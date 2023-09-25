const Cars = require("../models/cars");

exports.getAddCar = (req, res, next) => {
  res.render("pages/add-car", {
    pageTitle: "Add Car",
    isAuthenticated: req.session.isLoggedIn,
    editing: false,
  });
};

exports.postAddCar = (req, res, next) => {
  const brand = req.body.brand;
  const name = req.body.name;
  const price = req.body.price;
  const model = req.body.model;
  const transmission = req.body.transmission;
  const mileage = req.body.mileage;
  const seats = req.body.seats;
  const carType = req.body.cartype;
  const image = req.body.image;
  const location = req.body.location;
  const car = new Cars({
    brand: brand,
    name: name,
    model: model,
    price: price,
    transmission: transmission,
    mileage: mileage,
    seats: seats,
    carType: carType,
    image: image,
    location: location,
    ownerId: req.owner,
  });

  car
    .save()
    .then((result) => {
      console.log("Car Listed Succesfully");
      res.redirect("/owner/list");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.carList = (req, res, next) => {
  Cars.find().then((cars) => {
    res.render("shop/car-list-owner", {
      cars: cars,
      isAuthenticated: req.session.isLoggedIn,
    });
  });
};

exports.postDeleteCar = (req, res, next) => {
  const carId = req.body.carId;
  Cars.findByIdAndRemove(carId)
    .then(() => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/owner/list");
    })
    .catch((err) => console.log(err));
};

exports.getEditCar = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/owner/list");
  }
  const carId = req.params.carId;
  Cars.findById(carId)
    .then((car) => {
      if (!car) {
        return res.redirect("/owner/list");
      }
      res.render("pages/add-car", {
        editing: editMode,
        Cars: car,
        isAuthenticated: req.session.isLoggedIn,
      });
      console.log(car);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditCar = (req, res, next) => {
  const id = req.body.carId;
  const brand = req.body.brand;
  const model = req.body.model;
  const name = req.body.name;
  const price = req.body.price;
  const transmission = req.body.transmission;
  const mileage = req.body.mileage;
  const seats = req.body.seats;
  const carType = req.body.cartype;
  const image = req.body.image;
  const location = req.body.location;
  console.log(id);
  Cars.findById(id)
    .then((car) => {
      console.log(car);
      car.brand = brand;
      car.name = name;
      car.model = model;
      car.price = price;
      car.transmission = transmission;
      car.mileage = mileage;
      car.seats = seats;
      car.carType = carType;
      car.image = image;
      car.location = location;
      return car.save();
    })
    .then(() => {
      res.redirect("/owner/list");
    })
    .catch((err) => {
      console.log(err);
    });
};
