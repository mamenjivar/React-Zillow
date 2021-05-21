import React from 'react';

import { Card, Button } from 'react-bootstrap';

// * Will just show listings of all properties
const ViewPropertyCard = (props) => {
    // pass view property info up
    const onClickHandlerMapIt = (lat, long) => {
        props.panTo({ 
            lat: lat, 
            lng: long
        });
    };

    // pass info up
    const onClickHandlerModalIt = (id) => {
        props.onHandleShow(id);
    }

    // pass info to delete
    const onClickHandlerRemoveIt = (id) => {
        props.removeItem(id);
    }

    return (
            // <Col md={1}>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{props.listProperties.location}</Card.Title>
                        <Card.Text>
                                <p>Vendedor: {props.listProperties.name}</p>
                                <p>Precio: ${props.listProperties.price}</p>
                        </Card.Text>
                        <Button 
                            variant="outline-primary"
                            onClick={() => onClickHandlerMapIt(props.listProperties.lat, props.listProperties.long)}
                        >
                            Map It
                        </Button>
                        <Button
                            variant="outline-secondary"
                            onClick={() => onClickHandlerModalIt(props.listProperties.id)}
                        >
                            View It
                        </Button>
                        <Button
                            variant="outline-success"
                            onClick={() => onClickHandlerRemoveIt(props.listProperties.id)}
                        >
                            Buy It
                        </Button>
                    </Card.Body>
                </Card>
            // </Col>
    );
};

export default ViewPropertyCard;