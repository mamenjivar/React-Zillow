import React from 'react';

import { Card, Button, CardDeck } from 'react-bootstrap';

// * Will just show listings of all properties
// * Map -> View component
const View = (props) => {
    // pass view property info up
    const onClickHandler = (lat, long) => {
        props.panTo({ lat: lat, lng: long})
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
                            onClick={() => onClickHandler(props.lat, props.long)}
                        >
                            Map It
                        </Button>
                    </Card.Body>
                </Card>
            </CardDeck>
        </div>
    );
};

export default View;