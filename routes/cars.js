const path = require("path");
const express = require("express");

const router = express.Router();
const carsController = require("../controllers/cars");
const rootDir = require("../util/path");

router.get("/", carsController.main);

router.get("/cars", carsController.getCarsListing);

router.post("/search", carsController.filter);

//router.get("/car-description", carsController.getCarDescription);

router.get("/car-description/:carId", carsController.getCarDescriptionById);
module.exports = router;
