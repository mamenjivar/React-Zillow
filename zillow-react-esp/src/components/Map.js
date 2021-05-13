import React, { useState, useCallback, useRef } from 'react';

import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// css
import '@reach/combobox/styles.css';
import { Row } from 'react-bootstrap';

// components
import ViewPropertyCard from './ViewPropertyCard';

const libraries = ["places"];
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
};
const center = {
    lat: 34.052235,
    lng: -118.243683
}
const options = {
    disableDefaultUI: true,
    zoomControl: true
}

const Map = (props) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });

    // keeps track of single location
    const [selected, setSelected] = useState(null);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    // pans to specific location
    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(18);
    }, []);

    const passModalUp = (id) => {
        props.modalPropInfo(id);
    };

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";


    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={center}
                options={options}
                // onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {props.propertyListings.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={{lat: marker.lat, lng: marker.long}}
                        onClick={() => {
                            setSelected(marker)
                        }}
                    />
                ))}

                {selected && (
                <InfoWindow 
                    position={{lat: selected.lat, lng: selected.long}}
                    onCloseClick={() => {
                        setSelected(null);
                    }}
                >
                    <div>
                        <h3>{selected.location}</h3>
                        <p>Vendedor: {selected.name}<br/> Precio: {selected.price}</p>
                    </div>
                </InfoWindow>)}
            </GoogleMap>

            <Row>
                {props.propertyListings.map((data) => (
                    <ViewPropertyCard 
                        key={data.id} 
                        listProperties={data}
                        panTo={panTo}
                        onHandleShow={passModalUp}
                    />
                ))}
            </Row>
        </div>
    );
};

export default Map;