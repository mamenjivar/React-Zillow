import React, { useState, useContext, Fragment } from 'react';

// components
import Map from '../components/Map';

// css
import { Modal, ModalBody, ModalTitle, ModalFooter, Button, Row, Container, Col } from 'react-bootstrap';

import AuthContext from '../store/auth-context';

const Compra = (props) => {
    const authCtx = useContext(AuthContext);
    const loggedIn = authCtx.isLoggedIn;

    // View property modal
    const [selectedProperty, setSelectedProperty] = useState();
    const [showProperty, setShowProperty] = useState(false);

    // Purchase property modal
    const [showPurchaseProperty, setShowPurchaseProperty] = useState(false);

    // **************************************
    // Modal to view property
    // **************************************
    const handleCloseProperty = () => setShowProperty(false);
    const handleShowProperty = (propId) => {
        setSelectedProperty(propId);
        setShowProperty(true);
    };
    // **************************************
    
    // ***************************************
    // Modal to purchase property
    // **************************************
    const handleClosePurchase = () => setShowPurchaseProperty(false);
    const handleShowPurchase = () => {
        setShowProperty(false);
        setShowPurchaseProperty(true);
    }
    // **************************************

    const upRemoveItem = (id) => {
        props.removeItem(id);
    }

    return (
        <section>
            <h1 className="text-center">Propriedades Disponible </h1>
            <Map propertyListings={props.listProperties} removeItem={upRemoveItem} modalPropInfo={handleShowProperty}/>

            {/* VIEW SINGLE PROPERTY */}
            {props.listProperties.filter(property => property.id === selectedProperty).map(filteredProperty => (
                <Fragment>
                    <Modal size="lg" show={showProperty} onHide={handleCloseProperty} centered>
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
                                        <span className="font-weight-bold">Vendedor:</span> {filteredProperty.name}<br />
                                        <span className="font-weight-bold">Sitio:</span> {filteredProperty.location}<br />
                                        <span className="font-weight-bold">Descripcion:</span> {filteredProperty.description}<br />
                                        <span className="font-weight-bold">Numero de Telephono:</span> {filteredProperty.phone}<br />
                                        <span className="font-weight-bold">Correo Electronico:</span> {filteredProperty.email}
                                    </Col>
                                </Row>
                            </Container>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="secondary" onClick={handleCloseProperty}>Cerrar</Button>
                            {loggedIn && (
                                // <Button variant="success" onClick={() => upRemoveItem(filteredProperty.id)}>Compralo</Button>
                                <Button variant="success" onClick={handleShowPurchase}>Compralo</Button>
                            )}
                        </ModalFooter>
                    </Modal>

                    <Modal size="md" show={showPurchaseProperty} onHide={handleClosePurchase} centered>
                        <Modal.Header closeButton>
                            <ModalTitle>Compralo Ya</ModalTitle>
                        </Modal.Header>
                        <ModalBody>
                            <Container>
                                    <span className="font-weight-bold">Precio:</span> ${filteredProperty.price}<br />
                                        <span className="font-weight-bold">Vendedor: </span>{filteredProperty.name} <br />
                                <Row>
                                    <Col md={4}>
                                        {filteredProperty.cryptoAddress !== "" 
                                        ? <img src={`https://www.bitcoinqrcodemaker.com/api/?style=bitcoin&color=1&prefix=on&address=${filteredProperty.cryptoAddress}`} width="170" alt="bitcoin QR Code" /> 
                                        : <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/183px-BTC_Logo.svg.png" width="170" alt="bitcoin" />}

                                        
                                    </Col>
                                    <Col md={2}></Col>
                                    <Col md={4}>
                                        <img src="https://i.pinimg.com/736x/fa/89/9b/fa899be5c1fb3d211dddafe18b8e42bc.jpg" width="170" alt="bitcoin" />
                                    </Col>
                                </Row>
                            </Container>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="secondary" onClick={handleClosePurchase}>Cerrar</Button>
                        </ModalFooter>
                    </Modal>
                </Fragment>
            ))}
        </section>
    );
};

export default Compra;