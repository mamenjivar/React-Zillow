import React from 'react';

// css
import styles from '../css/Home.module.css';

// components
import HomeBody from './HomeBody';

const Home = () => {
    return (
        <div>
            <header className="styles.hero">
                <div className="styles.content">
                    <h1>Comprame la Casa</h1>
                </div>
            </header>

            <HomeBody />
        </div>  
    );
};

export default Home;