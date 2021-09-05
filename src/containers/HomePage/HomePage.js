import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';

import Specialty from './Section/Specialty';
import Facility from './Section/Facility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
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
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 3
        };

        let handbooks = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1
        };

        return (
            <div>
                <HomeHeader />
                <Specialty settings={settings} /> 
                <Facility settings={settings} />
                <OutStandingDoctor settings={settings} />
                <HandBook settings={handbooks} />
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
