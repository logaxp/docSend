import React from 'react';

import HomeCard from './HomeCard';
import Feature from './Feature';
import Explore from './Explore';
import PricingTable from './PricingTable';
import Action from '../Global/Action.js';
import OurTemplates from './OurTemplates';

const Home = () => {
    return (
        <div>
            <Action />
          <HomeCard />
         <Feature />
         < OurTemplates />
         <Explore />
         <PricingTable />
        </div>
    );
};

export default Home;
