import React, { useState } from 'react';

// components
import Map from '../components/Map';

// css
import { Modal, ModalBody, ModalTitle, ModalFooter, Button, Row } from 'react-bootstrap';

const Compra = (props) => {
    const [selectedProperty, setSelectedProperty] = useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (propId) => {
        setSelectedProperty(propId);
        setShow(true);
    };

    return (
        <section>
            <h1>hello from Compra</h1>
            <Map propertyListings={props.listProperties} modalPropInfo={handleShow}/>

            {props.listProperties.filter(property => property.id === selectedProperty).map(filteredProperty => (
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <ModalTitle>${filteredProperty.price}</ModalTitle>
                    </Modal.Header>
                    <ModalBody>
                        Seller Name: {filteredProperty.name}<br/> 
                        Location: {filteredProperty.location}<br/>
                        Property Description: {filteredProperty.description}<br/>
                        Phone Number: {filteredProperty.phone}<br/>
                        Email: {filteredProperty.email}
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </ModalFooter>
                </Modal>
            ))}
        </section>
    );
};

export default Compra;