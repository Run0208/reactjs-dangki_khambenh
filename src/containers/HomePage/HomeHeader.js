import React, { Component } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../store/actions';

import './HomeHeader.scss';

import slide1 from '../../assets/slider1.jpg';
import slide2 from '../../assets/slider2.jpg';
import slide3 from '../../assets/slider3.jpg';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    returnToHome = () => {
        if(this.props.history) {
            this.props.history.push(`/home`);
        }
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        let language = this.props.language;
        return (

            <React.Fragment>
                <div className="header-menu">
                    <div className="menu-content">
                        <div className="menu-left">
                            <div className="menu-left-logo" onClick={() => this.returnToHome()}></div>
                        </div>
                        <div className="menu-center">
                            <ul className="menu-list">
                                <li className="menu-list-item">
                                    <FormattedMessage id="header.specialty-menu"/>
                                </li>
                                <li className="menu-list-item">
                                    <FormattedMessage id="header.facility-menu"/>
                                </li>
                                <li className="menu-list-item">
                                    <FormattedMessage id="header.doctor-menu"/>
                                </li>
                                <li className="menu-list-item">
                                    <FormattedMessage id="header.package-menu"/>
                                </li>
                            </ul>
                        </div>
                        <div className="menu-right">
                            <div className="menu-support">
                                <i className="far fa-question-circle"></i>
                                <span>
                                    <FormattedMessage id="header.support"/>
                                </span>
                            </div>
                            <div className={language === LANGUAGES.VI ? 'menu-language-vi active' : 'menu-language-vi'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'menu-language-en active' : 'menu-language-en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.props.isShowBanner === true && 
                    <Slider {...settings}>
                        <div className="header-banner">
                            <img className="image-banner" src={slide1} alt="" />
                            <div className="banner-content">
                                <h1 className="banner-name">
                                    <FormattedMessage id="banner.basic"/>
                                </h1>
                                <h2 className="banner-title">
                                    <FormattedMessage id="banner.title"/>
                                </h2>
                            </div>
                        </div> 
                        {/* ----------------------------------------------------------------- */}
                        <div className="header-banner">
                            <img className="image-banner" src={slide2} alt="" />
                            <div className="banner-content">
                                <h1 className="banner-name">
                                    <FormattedMessage id="banner.basic"/>
                                </h1>
                                <h2 className="banner-title">
                                    <FormattedMessage id="banner.title"/>
                                </h2>
                            </div>
                        </div> 
                        {/* ----------------------------------------------------------------- */}
                        <div className="header-banner">
                            <img className="image-banner" src={slide3} alt="" />
                            <div className="banner-content">
                                <h1 className="banner-name">
                                    <FormattedMessage id="banner.basic"/>
                                </h1>
                                <h2 className="banner-title">
                                    <FormattedMessage id="banner.title"/>
                                </h2>
                            </div>
                        </div> 
                        {/* ----------------------------------------------------------------- */}
                    </Slider>
                     
                }
            </React.Fragment>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
