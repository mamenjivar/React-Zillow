import React from 'react';

import { Card, Button, CardDeck } from 'react-bootstrap';

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

    return (
        <div>
            <CardDeck>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{props.listProperties.location}</Card.Title>
                        <Card.Text>
                                <p>Name: {props.listProperties.name}</p>
                                <p>Price: ${props.listProperties.price}</p>
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
                    </Card.Body>
                </Card>
            </CardDeck>
        </div>
    );
};

export default ViewPropertyCard;