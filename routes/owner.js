const path = require("path");
const express = require("express");

const router = express.Router();
const ownerController = require("../controllers/owner");
const isAuth = require("../middleware/is_auth");

router.get("/owner/add-car", isAuth, ownerController.getAddCar);

router.post("/owner/add-car", isAuth, ownerController.postAddCar);

router.get("/owner/list", isAuth, ownerController.carList);

router.post("/owner/delete-car", isAuth, ownerController.postDeleteCar);

router.get("/owner/edit-car/:carId", isAuth, ownerController.getEditCar);

router.post("/owner/edit-car", isAuth, ownerController.postEditCar);

module.exports = router;
