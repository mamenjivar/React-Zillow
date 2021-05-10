import React from 'react';
import CARD_INFO from '../cardInfo_DB';

// css
import { Container, Row } from 'react-bootstrap';
import styles from '../css/HomeBody.module.css';

// components
import CardInformation from './CardInformation';

const HomeBody = () => {
    return (
        <section>
            <Container>
                <Row>
                    <h2 className={styles.subHeader}>Buying a new home is never easier</h2>
                </Row>
                <Row>
                    {CARD_INFO.map(data => 
                        <CardInformation title={data.title} text={data.text} button={data.button} />
                    )}
                </Row>
            </Container>
        </section>
    );
};

export default HomeBody;