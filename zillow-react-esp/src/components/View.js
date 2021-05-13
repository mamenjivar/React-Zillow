import React from 'react';

import { Card, Button, CardDeck } from 'react-bootstrap';

// * Will just show listings of all properties
// * Map -> View component
const View = (props) => {
    // pass view property info up
    const onClickHandlerMapIt = (lat, long) => {
        props.panTo({ 
            lat: lat, 
            lng: long
        });
    };

    const onClickHandlerModalIt = (location, name, price) => {
        const modalObject = {
            location: location,
            name: name,
            price: price
        }
        props.onHandleShow(modalObject);
    }

    return (
        <div>
            <CardDeck>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{props.location}</Card.Title>
                        <Card.Text>
                                <p>Name: {props.name}</p>
                                <p>Price: ${props.price}</p>
                        </Card.Text>
                        <Button 
                            variant="outline-primary"
                            onClick={() => onClickHandlerMapIt(props.lat, props.long)}
                        >
                            Map It
                        </Button>
                        <Button
                            variant="outline-secondary"
                            onClick={() => onClickHandlerModalIt(props.location, props.name, props.price)}
                        >
                            View It
                        </Button>
                    </Card.Body>
                </Card>
            </CardDeck>
        </div>
    );
};

export default View;