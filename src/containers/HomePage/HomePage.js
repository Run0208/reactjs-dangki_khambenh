import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';

import Specialty from './Section/Specialty';
import Clinic from './Section/Clinic';
import Doctor from './Section/Doctor';
import About from './Section/About';
import Footer from './Section/Footer';
import CopyRight from './Section/CopyRight';


// import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
  render() {

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3
    };

    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <Specialty settings={settings} /> 
        <Clinic settings={settings} />
        <Doctor settings={settings} />
        <About />
        <Footer />
        <CopyRight />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
