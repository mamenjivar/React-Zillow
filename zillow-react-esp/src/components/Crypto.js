import React from 'react';

import { Container, Jumbotron, Row, Col } from 'react-bootstrap';


/**
 * Promotes crypto information on home page
 * 
 * App -> Welcome -> Crypto
 */
const Crypto = () => {
    return (
        <section>
            <Jumbotron>
                <Container>
                    <Row>
                        <Col md={6}>
                            <h1>Acceptamos Criptomoneda</h1>
                        </Col>
                        <Col md={2}></Col>
                        <Col md={4}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/183px-BTC_Logo.svg.png" alt="bitcoin"/>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        </section>
    );
};

export default Crypto;