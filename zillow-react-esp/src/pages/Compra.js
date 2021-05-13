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
            <Row>
                <h1>hello from Compra</h1>
            </Row>
                <Map propertyListings={props.listProperties} modalPropInfo={handleShow}/>

            {props.listProperties.filter(property => property.id === selectedProperty).map(filteredProperty => (
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <ModalTitle>{filteredProperty.location}</ModalTitle>
                    </Modal.Header>
                    <ModalBody>{filteredProperty.name} || {filteredProperty.price}</ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </ModalFooter>
                </Modal>
            ))}
        </section>
    );
};

export default Compra;