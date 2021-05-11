import React, { useState, useCallback, useRef } from 'react';

import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';

// css
import '@reach/combobox/styles.css';
import { Row } from 'react-bootstrap';

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

const Map = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });

    const [ markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    // marker state
    // add a new marker to object array
    const onMapClick = useCallback((event) => {
        setMarkers(currentState => [...currentState, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        }])
    }, []);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";


    return (
        <div>
            <h1>This is the map</h1>
            <Search panTo={panTo}/>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((marker) => (
                    <Marker
                        position={{lat: marker.lat, lng: marker.lng}}
                        onClick={() => {
                            setSelected(marker)
                        }}
                    />
                ))}

                {selected && (
                <InfoWindow 
                    position={selected}
                    onCloseClick={() => {
                        setSelected(null);
                    }}
                >
                    <div>
                        <h2>Bear Spotted!</h2>
                        <p>over there!</p>
                    </div>
                </InfoWindow>)}
            </GoogleMap>

            <Row>
                {markers.map((data) => (
                    <View lat={data.lat} lng={data.lng} />
                ))}
            </Row>
        </div>
    );
};

export default Map;

function Search({panTo}) {
    const {ready, value, suggestions: { status, data }, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            location: { 
                lat: () => 34.052235,
                lng: () => -118.243683 
            },
            radius: 200 * 1000
        }
    });

    return( 
    <Combobox
        onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions();

            try {
                const results = await getGeocode({ address });
                const { lat, lng } = await getLatLng(results[0]);
                console.log(lat, lng);
                panTo({ lat, lng });

            }catch(error) {
                console.log('ERROR');
            }
        }}
    >
        <ComboboxInput 
            value={value}
            onChange={(event) => {
                setValue(event.target.value);
            }}
            disabled={!ready}
            placeholder="Enter an address"
        />
        <ComboboxPopover>
            <ComboboxList>
                {status === "OK" && 
                    data.map(({id, description}) => (
                        <ComboboxOption 
                            key={id}
                            value={description}
                        />
                ))}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>
    )
}