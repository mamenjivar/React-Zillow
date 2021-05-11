import React, { useState } from 'react';

// Address
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';

// css
import { Container, Form, FormLabel, FormGroup, FormControl, Button } from 'react-bootstrap';

const Vender = () => {
    const [enteredName, setEnteredName] = useState('');
    const [enteredLocation, setEnteredLocation] = useState('');
    const [enteredPrice, setEnteredPrice] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPhone, setEnteredPhone] = useState('');

    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    }

    const locationChangeHandler = (event) => {
        setEnteredLocation(event.target.value);
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

    const onFormSubmitHandler = (event) => {
        event.preventDefault();

        const submitNewProperty = {
            name: enteredName,
            location: enteredLocation,
            price: enteredPrice,
            email: enteredEmail,
            phone: enteredPhone
        }

        console.log(submitNewProperty);

        setEnteredName('');
        setEnteredLocation('');
        setEnteredPrice('');
        setEnteredEmail('');
        setEnteredPhone('');
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
                    <FormControl 
                        type="text"
                        placeholder="Enter location of property"
                        value={enteredLocation}
                        onChange={locationChangeHandler}
                    />
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
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default Vender;