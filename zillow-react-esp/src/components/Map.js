import React, { useState, useCallback, useRef } from 'react';

import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// css
import '@reach/combobox/styles.css';
import { Row, Modal, ModalBody, ModalTitle, ModalFooter, Button } from 'react-bootstrap';

// components
import View from '../components/View';

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

    // modal
    const [show, setShow] = useState(false);
    const [modalInfo, setModalInfo] = useState();
    
    const handleClose = () => setShow(false);

    const handleShow = (modalObject) => {
        // setModalInfo(modalObject);
        setShow(true);
    };

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";


    return (
        <div>
            <h1>This is the map</h1>
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
                    <View 
                        key={data.id} 
                        name={data.name} 
                        location={data.location} 
                        price={data.price} 
                        email={data.email} 
                        phone={data.phone}
                        lat={data.lat}
                        panTo={panTo}
                        long={data.long}
                        onHandleShow={handleShow}
                    />
                ))}
            </Row>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <ModalTitle></ModalTitle>
                </Modal.Header>
                <ModalBody></ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Map;