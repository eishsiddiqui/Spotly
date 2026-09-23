const HttpError = require("../models/http-error");
const mongoose = require("mongoose");
const Place = require("../models/place");
const User = require("../models/user");

const { validationResult } = require("express-validator");
const getCoordinatesFromAddress = require("../utils/geocode");

const { v4: uuidv4 } = require("uuid");

async function getPlacesById(req, res, next) {
  const placesId = req.params.pid;

  if (!mongoose.Types.ObjectId.isValid(placesId)) {
    return next(new HttpError("No Place found with this Id!", 404));
  }

  let place;
  try {
    place = await Place.findById(placesId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place!",
      500,
    );
    return next(error);
  }

  res.json({
    place,
  });
}

async function getPlacesByUserId(req, res, next) {
  const userId = req.params.uid;
  let places;

  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not fetch places!",
      500,
    );
    return next(error);
  }

  if (places.length === 0) {
    throw new HttpError(
      "Could not find a place for the provided user Id!",
      404,
    );
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
}

async function createPlace(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { title, description, address, creator } = req.body;

  const location = await getCoordinatesFromAddress(address);

  if (!mongoose.Types.ObjectId.isValid(creator)) {
    return next(new HttpError("Invalid Creator Id, Enter Again!", 422));
  }

  const createdPlace = new Place({
    title,
    description,
    location,
    image:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1000&q=80",
    address,
    creator,
  });

  try {
    const user = await User.findById(creator);
    if (!user)
      return next(new HttpError("Invalid Creator Id, Enter Again!.", 422));

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed. Please try again!",
      500,
    );
    return next(error);
  }

  res.status(201).json({
    place: createdPlace,
  });
}

const deletePlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500,
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError("Could not find place for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500,
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted place." });
};

async function updatePlaceById(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place to update!",
      500,
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Could not update place. Please try again!",
      500,
    );
    return next(error);
  }

  res.status(200).json({
    message: "Place updated successfully!",
    place,
  });
}

exports.getPlacesById = getPlacesById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.deletePlaceById = deletePlaceById;
exports.updatePlaceById = updatePlaceById;
