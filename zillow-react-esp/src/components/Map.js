import React, { useState, useCallback, useRef } from 'react';

import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

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

const Map = (props) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });

    const [ markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    // const [propertyList, setPropertyList] = useState(props.propertyListings);

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
        mapRef.current.setZoom(18);
    }, []);

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
                onClick={onMapClick}
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
                    />
                ))}
            </Row>
        </div>
    );
};

export default Map;

// function Search({panTo}) {
//     const {ready, value, suggestions: { status, data }, setValue, clearSuggestions} = usePlacesAutocomplete({
//         requestOptions: {
//             location: { 
//                 lat: () => 34.052235,
//                 lng: () => -118.243683 
//             },
//             radius: 200 * 1000
//         }
//     });

//     return( 
//     <Combobox
//         onSelect={async (address) => {
//             setValue(address, false);
//             clearSuggestions();

//             try {
//                 const results = await getGeocode({ address });
//                 const { lat, lng } = await getLatLng(results[0]);
//                 console.log(lat, lng);
//                 panTo({ lat, lng });

//             }catch(error) {
//                 console.log('ERROR');
//             }
//         }}
//     >
//         <ComboboxInput 
//             value={value}
//             onChange={(event) => {
//                 setValue(event.target.value);
//             }}
//             disabled={!ready}
//             placeholder="Enter an address"
//         />
//         <ComboboxPopover>
//             <ComboboxList>
//                 {status === "OK" && 
//                     data.map(({id, description}) => (
//                         <ComboboxOption 
//                             key={id}
//                             value={description}
//                         />
//                 ))}
//             </ComboboxList>
//         </ComboboxPopover>
//     </Combobox>
//     )
// }