import { useEffect } from 'react';
import AOS from 'aos';
import Hero from '../sections/Hero';
import WhatsBroken from '../sections/WhatsBroken';
import PrevntivLoop from '../sections/PrevntivLoop';
import Offers from '../sections/Offers';
import WhoItsFor from '../sections/WhoItsFor';
import TrustPrivacy from '../sections/TrustPrivacy';

const Home = () => {
    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }, []);

    return (
        <main className="main">
            <Hero />
            <WhatsBroken />
            <PrevntivLoop />
            <Offers />
            <WhoItsFor />
            <TrustPrivacy />
        </main>
    );
};

export default Home;
