import React, { useState } from 'react';

import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import firebase, { storage } from '../util/firebase';

// address
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';

// css
import { Container, Form, FormLabel, FormGroup, FormControl, Button, Modal, ModalBody, ModalTitle, ModalFooter } from 'react-bootstrap';

const libraries = ["places"];

const Vender = (props) => {
    useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });

    // form properties
    const [enteredName, setEnteredName] = useState('');
    const [enteredLocation, setEnteredLocation] = useState('');
    const [enteredPrice, setEnteredPrice] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPhone, setEnteredPhone] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');

    // uploading images to firebase storage
    const [imageUrl, setImageUrl] = useState("");

    // modal
    const [show, setShow] = useState(false);

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

    const uploadHandleChange = async (event) => {
        const file = event.target.files[0];
        const storageRef = storage.ref('images').child(file.name);
        await storageRef.put(file);
        setImageUrl(await storageRef.getDownloadURL());
    };

    // submit new property
    const onFormSubmitHandler = async (event) => {
        event.preventDefault();

        // data DB firebase
        // establish connection
        const sendFirebase = firebase.database().ref('property');

        const submitNewProperty = {
            name: enteredName,
            location: enteredLocation,
            lat: lat,
            long: long,
            price: enteredPrice,
            email: enteredEmail,
            phone: enteredPhone,
            description: enteredDescription,
            image: imageUrl
        }

        console.log(submitNewProperty);
        // pass data upward
        // ! might need to remove this because DB isn't local anymore
        // props.addNewLocation(submitNewProperty);

        // send data to online database
        sendFirebase.push(submitNewProperty);

        handleShow();

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
        // setEnteredImage('');
        setImageUrl('');
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div>
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
                                style={{width: "100%"}}
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
                    {/* //! will be replacing this with file uploads */}
                    {/* <FormGroup>
                        <FormLabel>Property Image</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter image link"
                            value={enteredImage}
                            onChange={imageChangeHandler}
                        />
                    </FormGroup> */}
                    <FormGroup>
                        <FormLabel>Upload Images</FormLabel>
                        <FormControl
                            type="file"
                            onChange={uploadHandleChange}
                        />
                    </FormGroup>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>

            </Container>

            <Modal size="sm" show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <ModalTitle>Gracias</ModalTitle>
                </Modal.Header>
                <ModalBody>
                    <p>The form was successfully submitted!</p>
                </ModalBody>
                <ModalFooter>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Vender;