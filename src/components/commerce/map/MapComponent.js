import React, { useRef } from 'react';
import L from 'leaflet';
import { Map, TileLayer } from 'react-leaflet';
import { Button } from 'reactstrap';
import { IoIosRefresh } from 'react-icons/io';
import GeojsonLayer from './GeojsonLayerFunc';
import './Map.css';

L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.5.0/dist/images/';
const MapComponent = ({ dataCluster = [], zoom, center, total }) => {
  const mapRef = useRef();
  const handleRefresh = () => {
    mapRef.current.leafletElement.flyTo(center, zoom);
  };
  return (
    <div className="position-relative  mx-md-0">
      <Map zoom={zoom} center={center} ref={mapRef} >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeojsonLayer cluster dataCluster={dataCluster?.data} />
      </Map>

      <div className="mapMoreElement">
        <Button type="button" className="mapMoreElementItem" onClick={handleRefresh}>
          {/*<i className="bi bi-arrow-clockwise d-flex"></i>*/}
          <IoIosRefresh size={22}  />
        </Button>

        {total && <span className="mapMoreElementItem fs-4">{total}</span>}
      </div>
    </div>
  );
};

export default MapComponent;
