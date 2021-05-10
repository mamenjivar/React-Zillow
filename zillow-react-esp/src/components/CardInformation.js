import React from 'react';
import { Link } from 'react-router-dom';

// css
import { Card, Button, Col } from 'react-bootstrap';

const CardInformation = (props) => {
    return (
        <Col>
            <Card style={{width: '18rem'}}>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        {props.text}
                    </Card.Text>
                    <Button variant="outline-primary">
                        <Link to={`/${props.button}`}>{props.button}</Link>
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default CardInformation;