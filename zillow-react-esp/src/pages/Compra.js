import React, { useState } from 'react';

// components
import Map from '../components/Map';

// css
import { Modal, ModalBody, ModalTitle, ModalFooter, Button, Row, Container, Col } from 'react-bootstrap';

const Compra = (props) => {
    const [selectedProperty, setSelectedProperty] = useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (propId) => {
        setSelectedProperty(propId);
        setShow(true);
    };

    const upRemoveItem = (id) => {
        props.removeItem(id);
    }

    return (
        <section>
            <h1>hello from Compra</h1>
            <Map propertyListings={props.listProperties} removeItem={upRemoveItem} modalPropInfo={handleShow}/>

            {props.listProperties.filter(property => property.id === selectedProperty).map(filteredProperty => (
                <Modal size="lg" show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <ModalTitle>${filteredProperty.price}</ModalTitle>
                    </Modal.Header>
                    <ModalBody>
                        <Container>
                            <Row>
                                <Col md={3}>
                                    <img src={filteredProperty.image} width="170" alt="property"/>
                                </Col>
                                <Col md={9}>
                                    Seller Name: {filteredProperty.name}<br />
                                    Location: {filteredProperty.location}<br />
                                    Property Description: {filteredProperty.description}<br />
                                    Phone Number: {filteredProperty.phone}<br />
                                    Email: {filteredProperty.email}
                                </Col>
                            </Row>
                        </Container>
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