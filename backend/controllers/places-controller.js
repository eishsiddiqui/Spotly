const HttpError = require("../models/http-error");

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
  {
    id: "p9",
    title: "Colosseum",
    description:
      "An ancient Roman amphitheater and one of Rome’s most famous landmarks.",
    location: {
      lat: 41.8902,
      lng: 12.4922,
    },
    address: "Piazza del Colosseo, 1, Rome, Italy",
    creator: "u3",
  },
  {
    id: "p10",
    title: "Mount Fuji",
    description:
      "Japan’s highest mountain and one of the country’s most recognizable natural landmarks.",
    location: {
      lat: 35.3606,
      lng: 138.7274,
    },
    address: "Kitayama, Fujinomiya, Shizuoka, Japan",
    creator: "u1",
  },
];

function getPlacesById(req, res, next) {
  const placesId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => placesId === p.id);

  if (!place) {
    throw new HttpError("No Place found with this Id!", 404);
  }

  res.json({
    place,
  });
}

function getPlacesByUserId(req, res, next) {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => userId === p.creator);

  if (places.length === 0) {
    throw new HttpError(
      "Could not find a place for the provided user Id!",
      404,
    );
  }

  res.json({
    places,
  });
}

exports.getPlacesById = getPlacesById;
exports.getPlacesByUserId = getPlacesByUserId;
