const HttpError = require("../models/http-error");
const mongoose = require("mongoose");
const Place = require("../models/place");
const { validationResult } = require("express-validator");
const getCoordinatesFromAddress = require("../utils/geocode");

const { v4: uuidv4 } = require("uuid");

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Eiffel Tower",
    description: "One of the most iconic landmarks in the world.",
    location: {
      lat: 48.8584,
      lng: 2.2945,
    },
    address: "Champ de Mars, 5 Av. Anatole France, Paris, France",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Statue of Liberty",
    description:
      "A famous symbol of freedom and one of New York’s most recognizable landmarks.",
    location: {
      lat: 40.6892,
      lng: -74.0445,
    },
    address: "Liberty Island, New York, NY 10004, USA",
    creator: "u2",
  },
  {
    id: "p3",
    title: "Taj Mahal",
    description:
      "A magnificent white marble monument and one of the Seven Wonders of the World.",
    location: {
      lat: 27.1751,
      lng: 78.0421,
    },
    address: "Dharmapuri, Forest Colony, Agra, Uttar Pradesh, India",
    creator: "u1",
  },
  {
    id: "p4",
    title: "Burj Khalifa",
    description:
      "The tallest building in the world, located in the heart of Dubai.",
    location: {
      lat: 25.1972,
      lng: 55.2744,
    },
    address: "1 Sheikh Mohammed bin Rashid Blvd, Dubai, UAE",
    creator: "u3",
  },
  {
    id: "p5",
    title: "Big Ben",
    description:
      "The iconic clock tower located beside the Palace of Westminster.",
    location: {
      lat: 51.5007,
      lng: -0.1246,
    },
    address: "London SW1A 0AA, United Kingdom",
    creator: "u2",
  },
  {
    id: "p6",
    title: "Sydney Opera House",
    description:
      "A world-famous performing arts center known for its distinctive architecture.",
    location: {
      lat: -33.8568,
      lng: 151.2153,
    },
    address: "Bennelong Point, Sydney NSW 2000, Australia",
    creator: "u3",
  },
  {
    id: "p7",
    title: "Lahore Fort",
    description:
      "A historic Mughal-era fort and one of Lahore’s most important landmarks.",
    location: {
      lat: 31.588,
      lng: 74.3151,
    },
    address: "Fort Rd, Shahi Mohallah, Lahore, Pakistan",
    creator: "u1",
  },
  {
    id: "p8",
    title: "Minar-e-Pakistan",
    description:
      "A national monument commemorating the Lahore Resolution of 1940.",
    location: {
      lat: 31.5925,
      lng: 74.3095,
    },
    address: "Greater Iqbal Park, Lahore, Pakistan",
    creator: "u2",
  },
];

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

  // res.json({
  //   places: places.map((place) => place.toObject()),
  // });

  res.json({
    places,
  });
}

async function createPlace(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { title, description, address, creator } = req.body;

  const location = await getCoordinatesFromAddress(address);

  const createdPlace = new Place({
    title,
    description,
    location,
    image:
      "https://en.wikipedia.org/wiki/Great_Wall_of_China#/media/File:The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
    address,
    creator,
  });

  try {
    await createdPlace.save();
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

async function deletePlaceById(req, res, next) {
  const placeId = req.params.pid;

  try {
    const place = await Place.findByIdAndDelete(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete the place!",
      500,
    );
    return next(error);
  }

  res.status(200).json({
    message: "Place deleted successfully!",
  });
}

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
