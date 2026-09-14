async function getCoordinatesFromAddress(address) {
  const url =
    `https://api.geoapify.com/v1/geocode/search` +
    `?text=${encodeURIComponent(address)}` +
    `&format=json` +
    `&limit=1` +
    `&apiKey=${process.env.GEOAPIFY_API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Geoapify geocoding request failed");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Could not find this address");
  }

  return {
    lat: data.results[0].lat,
    lng: data.results[0].lon,
  };
}

module.exports = getCoordinatesFromAddress;
