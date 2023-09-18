const Cars = require("../models/cars");

exports.getAddCar = (req, res, next) => {
  res.render("pages/add-car", {
    pageTitle: "Add Car",
    editing: false,
  });
};

exports.postAddCar = (req, res, next) => {
  const brand = req.body.brand;
  const name = req.body.name;
  const price = req.body.price;
  const transmission = req.body.transmission;
  const mileage = req.body.mileage;
  const seats = req.body.seats;
  const carType = req.body.cartype;
  const image = req.body.image;
  const car = new Cars({
    brand: brand,
    name: name,
    price: price,
    transmission: transmission,
    mileage: mileage,
    seats: seats,
    carType: carType,
    image: image,
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
  const name = req.body.name;
  const price = req.body.price;
  const transmission = req.body.transmission;
  const mileage = req.body.mileage;
  const seats = req.body.seats;
  const carType = req.body.cartype;
  const image = req.body.image;

  Cars.findById(id)
    .then((car) => {
      car.brand = brand;
      car.name = name;
      car.price = price;
      car.transmission = transmission;
      car.mileage = mileage;
      car.seats = seats;
      car.carType = carType;
      car.image = image;

      return car.save();
    })
    .then(() => {
      res.redirect("/owner/list");
    })
    .catch((err) => {
      console.log(err);
    });
};
