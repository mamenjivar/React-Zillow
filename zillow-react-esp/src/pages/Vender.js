import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
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

    // ***********************************************************
    // form properties
    // ***********************************************************
    const [enteredName, setEnteredName] = useState('');
    const [enteredLocation, setEnteredLocation] = useState('');
    const [enteredPrice, setEnteredPrice] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPhone, setEnteredPhone] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [bitcoinAddress, setBitcoinAddress] = useState('');
    // ***********************************************************

    const [file, setFile] = useState('');

    // modal
    const [show, setShow] = useState(false);

    // ***********************************************************
    // form onChange properties
    // ***********************************************************
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

    // gets lat and long of chosen address
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

    const bitcoinChangeHandler = (event) => {
        setBitcoinAddress(event.target.value);
    }

    // to submit image online to storage
    const uploadHandleChange = (event) => {
        // const file = event.target.files[0];
        setFile(event.target.files[0]);
    };
    // ***********************************************************

    // submit new property
    const onFormSubmitHandler = async (event) => {
        event.preventDefault();

        // data DB firebase
        // establish connection
        const sendFirebase = firebase.database().ref('property');
        
        // storage iamge upload
        const fileName = uuidv4();
        const storageRef = storage.ref('images').child(fileName);
        await storageRef.put(file);
        const imageURL = await storageRef.getDownloadURL();

        const submitNewProperty = {
            name: enteredName,
            location: enteredLocation,
            lat: lat,
            long: long,
            price: enteredPrice,
            email: enteredEmail,
            phone: enteredPhone,
            description: enteredDescription,
            image: imageURL,
            cryptoAddress: bitcoinAddress
        }

        console.log(submitNewProperty);
        // pass data upward
        // ! might need to remove this because DB isn't local anymore
        // props.addNewLocation(submitNewProperty);

        // send data to online database
        sendFirebase.push(submitNewProperty);

        // dipslay modal after form submission
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
        setBitcoinAddress('');
    };

    // ***********************************************************
    // Modal Properties
    // ***********************************************************
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // ***********************************************************

    return (
        <div>
            <Container>
                <h1>List Your Property</h1>
                <Form onSubmit={onFormSubmitHandler}>
                    <FormGroup>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl 
                            type="text" 
                            placeholder="Nombre"
                            value={enteredName}
                            onChange={nameChangeHandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Direccion</FormLabel>
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
                        <FormLabel>Precio</FormLabel>
                        <FormControl 
                            type="text" 
                            placeholder="Precio de la Propiedad"
                            value={enteredPrice}
                            onChange={priceChangeHandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl
                            type="text" 
                            placeholder="correo electronico"
                            value={enteredEmail}
                            onChange={emailChangeHandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Numero de Telefono</FormLabel>
                        <FormControl 
                            type="text" 
                            placeholder="Ingrese su numero telefonico"
                            value={enteredPhone}
                            onChange={phoneChangeHandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Descripcion de propiedad</FormLabel>
                        <FormControl 
                            as="textarea" 
                            rows={3} 
                            placeholder="Ingrese la descripcion de la propiedad"
                            value={enteredDescription}
                            onChange={descriptionChangeHandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Direccion de Bitcoin</FormLabel>
                        <FormControl 
                            type="text"
                            placeholder="entra su direccion de Bitcoin"
                            value={bitcoinAddress}
                            onChange={bitcoinChangeHandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Subir Imagenes</FormLabel>
                        <FormControl
                            type="file"
                            onChange={uploadHandleChange}
                        />
                    </FormGroup>
                    <Button variant="primary" type="submit">Enviar</Button>
                </Form>
            </Container>

            <Modal size="sm" show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <ModalTitle>Gracias</ModalTitle>
                </Modal.Header>
                <ModalBody>
                    <p>Su propriedad fue enviado!</p>
                </ModalBody>
                <ModalFooter>
                        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Vender;