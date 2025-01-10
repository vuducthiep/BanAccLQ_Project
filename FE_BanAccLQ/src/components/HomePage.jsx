import React from 'react';
import ListAcc from './ListAcc';
import Header from './Header';
import Banner from './Banner';
import Footer from './Footer';
import Prominent from './Prominent';
import SupportPhone from './SupportPhone';
const HomePage = () => {
  return (
    <div>
        <Header/>
        <Banner/>
        <Prominent/>
        <ListAcc/>
        <Footer/>
        <SupportPhone/>
    </div>

  );
};

export default HomePage;
