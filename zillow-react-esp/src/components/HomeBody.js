import React from 'react';
import CARD_INFO from '../cardInfo_DB';

// css
import { Container } from 'react-bootstrap';
import '../css/HomeBody.css';

// components
import CardInformation from './CardInformation';

const HomeBody = () => {
    return (
        <section>
            <Container>
                <h2 className="subHeader">Buying a new home is never easier</h2>
                <div className="flex-items">
                    {CARD_INFO.map(data => 
                        <CardInformation title={data.title} text={data.text} button={data.button} />
                    )}
                </div>
            </Container>
        </section>
    );
};

export default HomeBody;