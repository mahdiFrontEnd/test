import React from 'react';
import L from 'leaflet';

import {FeatureGroup, Marker, Popup, Tooltip} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import shadow from '../../../assets/images/marker-shadow.svg';
import plane from '../../../assets/images/plane.svg';
import supplier from '../../../assets/images/supplier.svg';
import inventory from '../../../assets/images/inventory.svg';
import markerImage from '../../../assets/images/markerImage.svg';
import ship from '../../../assets/images/ship.svg';
import port from '../../../assets/images/port.svg';

export default function GeojsonLayer({cluster, dataCluster}) {
    const getIcon = (x) => {


        switch (x) {
            case 'inventory':
                return inventory

            case 'port':
                return port
            case 'ship':
                return ship
            case 'plane':
                return plane
            case 'supplier':
                return supplier
            default:
                return markerImage
        }


    }

    const GroupComponent = cluster ? MarkerClusterGroup : FeatureGroup;

    return (


        <GroupComponent>
            {dataCluster?.map((f) => (<Marker
                icon={new L.Icon({

                    iconUrl: getIcon(f.properties.icon),
                    shadowUrl: shadow,
                    iconSize: new L.Point(33, 49),
                    className: 'leaflet-div-icon'
                })}
                position={f?.geometry?.coordinates}>

                {f.items && <Tooltip direction="top" offset={[31, -23]} opacity={1} permanent>
                    <span>{f.items?.length}</span>
                </Tooltip>}

                <Popup minWidth={250} closeButton={false}>
                    <div className='w-100 ' dir='rtl'>

                        <h2 className='text-center pt-3'>{f.properties.position_title}</h2>
                        <hr className='mb-0'/>
                        <div style={{maxHeight: '300px', overflow: 'auto'}} className='p-3'>
                            {

                                f.items.map((item, index) => (
                                    <a target='_blank' href={item.link} className='text-decoration-none'
                                       rel="noreferrer">


                                        <div className='d-flex mb-4 justify-content-between ' key={item.id}>
                                            <span>{index + 1}- {item.number}</span>
                                            <span>{item.supplier_name}</span>
                                        </div>
                                    </a>))}
                        </div>


                    </div>
                </Popup>

            </Marker>))}
        </GroupComponent>);
}

