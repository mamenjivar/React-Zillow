import React, { useState } from 'react';

import { GoogleMap, useLoadScript } from '@react-google-maps/api';

// address
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';

// css
import { Container, Form, FormLabel, FormGroup, FormControl, Button } from 'react-bootstrap';

const libraries = ["places"];

const Vender = (props) => {
    useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });

    const [enteredName, setEnteredName] = useState('');
    const [enteredLocation, setEnteredLocation] = useState('');
    const [enteredPrice, setEnteredPrice] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPhone, setEnteredPhone] = useState('');
    const [enteredImage, setEnteredImage] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');

    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');

    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    }

    const priceChangeHandler = (event) => {
        setEnteredPrice(event.target.value);
    }
    
    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    }

    const phoneChangeHandler = (event) => {
        setEnteredPhone(event.target.value);
    }

    const descriptionChangeHandler = (event) => {
        setEnteredDescription(event.target.value);
    }

    const imageChangeHandler = (event) => {
        setEnteredImage(event.target.value);
    }

    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
        requestOptions: {
            location: {
                lat: () => 34.052235,
                lng: () => -118.243683
            },
            radius: 200 * 1000
        }
    });

    const onSelectHandler = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            setLat(lat);
            setLong(lng);
            // console.log(lat, lng);
        } catch (error) {
            console.log('ERROR IN SEARCH!');
        }

        setEnteredLocation(address);
    };

    const onChangeHandler = (event) => {
        setValue(event.target.value);
    };

    const onFormSubmitHandler = (event) => {
        event.preventDefault();

        const submitNewProperty = {
            id: Math.random(),
            name: enteredName,
            location: enteredLocation,
            lat: lat,
            long: long,
            price: enteredPrice,
            email: enteredEmail,
            phone: enteredPhone,
            description: enteredDescription,
            image: enteredImage
        }

        console.log(submitNewProperty);
        // pass data upward
        props.addNewLocation(submitNewProperty);

        // clear out form after submit
        setEnteredName('');
        setEnteredLocation('');
        setLat('');
        setLong('');
        setEnteredPrice('');
        setEnteredEmail('');
        setEnteredPhone('');
        setValue('');
        setEnteredDescription('');
        setEnteredImage('');
    }

    return (
        <Container>
            <h1>List Your Property</h1>
            <Form onSubmit={onFormSubmitHandler}>
                <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <FormControl 
                        type="text" 
                        placeholder="Enter your name"
                        value={enteredName}
                        onChange={nameChangeHandler}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Location</FormLabel>
                    <Combobox
                        onSelect={onSelectHandler}
                    >
                        <ComboboxInput
                            value={value}
                            onChange={onChangeHandler}
                            disabled={!ready}
                            placeholder="Enter an address"
                        />
                        <ComboboxPopover>
                            <ComboboxList>
                                {status === "OK" &&
                                    data.map(({ id, description }) => (
                                        <ComboboxOption
                                            key={id}
                                            value={description}
                                        />
                                    ))
                                }
                            </ComboboxList>
                        </ComboboxPopover>
                    </Combobox>
                    <GoogleMap ></GoogleMap>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Price</FormLabel>
                    <FormControl 
                        type="text" 
                        placeholder="Enter price of property"
                        value={enteredPrice}
                        onChange={priceChangeHandler}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        type="text" 
                        placeholder="Enter email"
                        value={enteredEmail}
                        onChange={emailChangeHandler}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl 
                        type="text" 
                        placeholder="Enter your phone number"
                        value={enteredPhone}
                        onChange={phoneChangeHandler}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Property Description</FormLabel>
                    <FormControl 
                        as="textarea" 
                        rows={3} 
                        placeholder="Enter property description here"
                        value={enteredDescription}
                        onChange={descriptionChangeHandler}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Property Image</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter image link"
                        value={enteredImage}
                        onChange={imageChangeHandler}
                    />
                </FormGroup>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default Vender;