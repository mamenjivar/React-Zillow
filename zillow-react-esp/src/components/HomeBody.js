import React from 'react';

// components
import CardInformation from './CardInformation';

const HomeBody = () => {
    return (
        <section>
            <h2>Buying a new home is never easier</h2>
            <div>
                <CardInformation />
                <CardInformation />
                <CardInformation />
            </div>
        </section>
    );
};

export default HomeBody;