const express = require("express");
const fileUpload = require("../middleware/file-upload");

const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controller");

const router = express.Router();

router.get("/:pid", placesControllers.getPlacesById);
router.get("/user/:uid", placesControllers.getPlacesByUserId);
router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace,
);
router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesControllers.updatePlaceById,
);
router.delete("/:pid", placesControllers.deletePlaceById);

module.exports = router;
