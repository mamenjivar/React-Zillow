import React from 'react';

// css
import { Card } from 'react-bootstrap';

const CardInformation = () => {
    return (
        <Card style={{width: '18rem'}}>
            <Card.Body>
                <Card.Title>Buy</Card.Title>
                <Card.Text>
                    Find your place with an immersive photo experience and the most listings, including things you won't find anywhere else
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CardInformation;