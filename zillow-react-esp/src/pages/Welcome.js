import React from 'react';

// css
import styles from '../css/Welcome.module.css';

// components
import HomeBody from '../components/HomeBody';
import Crypto from '../components/Crypto';

const Home = () => {
    return (
        <div>
            <header className={styles.hero}>
                <div className={styles.content}>
                    <h1>Comprame la Casa</h1>
                </div>
            </header>

            <HomeBody />
            <Crypto />
        </div>  
    );
};

export default Home;