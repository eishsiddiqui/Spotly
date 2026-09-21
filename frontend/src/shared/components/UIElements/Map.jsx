import React, { useRef, useEffect } from "react";

import "./Map.css";

// Projection converter from WGS84 (Lon, Lat) to EPSG:3857 (Spherical Mercator)
const fromLonLat = (coord) => {
  if (window.ol?.proj?.fromLonLat) {
    return window.ol.proj.fromLonLat(coord);
  }
  const [lng, lat] = coord;
  const x = (lng * 20037508.34) / 180;
  let y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180);
  y = (y * 20037508.34) / 180;
  return [x, y];
};

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    if (!window.ol || !center || !mapRef.current) {
      return;
    }

    const map = new window.ol.Map({
      target: mapRef.current,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
      ],
      view: new window.ol.View({
        center: fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });

    // Ensure map tiles properly layout once modal finishes sliding in
    const timer = setTimeout(() => {
      map.updateSize();
    }, 200);

    return () => {
      clearTimeout(timer);
      map.setTarget(null);
    };
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className || ""}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
