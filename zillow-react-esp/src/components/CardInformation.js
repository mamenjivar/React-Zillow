import React from 'react';

// css
import { Card, Button } from 'react-bootstrap';

const CardInformation = (props) => {
    return (
        <Card style={{width: '18rem'}}>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.text}
                </Card.Text>
                <Button variant="outline-primary">{props.button}</Button>
            </Card.Body>
        </Card>
    );
};

export default CardInformation;