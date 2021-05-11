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
                        <Card.Title>Property Listing</Card.Title>
                        <Card.Text>
                            <p>latitude: {props.lat}</p>
                            <p>longitude: {props.lng}</p>
                        </Card.Text>
                        <Button variant="outline-primary">
                            Buy property
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    );
};

export default View;