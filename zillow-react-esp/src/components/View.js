import React from 'react';

import { Card, Button, Col } from 'react-bootstrap';

// * Will just show listings of all properties
// * Map -> View component
const View = (props) => {
    return (
        <div>
            <Col>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{props.location}</Card.Title>
                        <Card.Text>
                                <p>Name: {props.name}</p>
                                <p>Price: {props.price}</p>
                        </Card.Text>
                        <Button variant="outline-primary">
                            View Property
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    );
};

export default View;