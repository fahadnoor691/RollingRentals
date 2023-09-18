const path = require("path");
const express = require("express");

const router = express.Router();
const ownerController = require("../controllers/owner");

router.get("/owner/add-car", ownerController.getAddCar);

router.post("/owner/add-car", ownerController.postAddCar);

router.get("/owner/list", ownerController.carList);

router.post("/owner/delete-car", ownerController.postDeleteCar);

router.get("/owner/edit-car/:carId", ownerController.getEditCar);

router.post("/owner/edit-car", ownerController.postEditCar);

module.exports = router;
