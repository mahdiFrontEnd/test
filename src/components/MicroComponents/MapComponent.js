import React, { useRef, useState } from 'react';
import { Map, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],

  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
});

function LocationMarker({ isDraggable, MapLocation, getNewLoc }) {
  const [draggable] = useState(isDraggable || false);
  const [position, setPosition] = useState(
    MapLocation || [35.69973857770672, 51.33803844451905],
  );
  const markerRef = useRef(null);
  useMapEvents({
    click(e) {
      setPosition(e.latlng);

      const data = [];
      data.Longitude = e.latlng.lng;
      data.latitude = e.latlng.lat;

      // eslint-disable-next-line no-unused-expressions
      getNewLoc && getNewLoc(data);
    },
  });
  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const data = [];
        data.Longitude = marker.getLatLng().lng;
        data.latitude = marker.getLatLng().lat;

        // eslint-disable-next-line no-unused-expressions
        getNewLoc && getNewLoc(data);
        setPosition([marker.getLatLng().lat, marker.getLatLng().lng]);
      }
    },
  };
  return (
    <Marker
      icon={icon}
      draggable={draggable}
      position={position}
      eventHandlers={eventHandlers}
      ref={markerRef}
    >
      <Popup>لوکیشن فروشگاه </Popup>
    </Marker>
  );
}

const MapComponent = ({ MapLocation, zoomNumber, draggable, getNewLoc }) => {
  const [position, setPosition] = useState(
    MapLocation || [35.69973857770672, 51.33803844451905],
  );

  const [zoom, setZoom] = useState(zoomNumber || 13);

  return (
    <>
      <Map
        attributionControl
        zoomControl
        doubleClickZoom
        animate
        easeLinearity={0.35}
        style={{ width: '100%', height: '100%', minHeight: '200px' }}
        center={position}
        zoom={zoom}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker getNewLoc={getNewLoc} isDraggable={draggable} MapLocation={MapLocation} />
      </Map>
    </>
  );
};

export default React.memo(MapComponent);
