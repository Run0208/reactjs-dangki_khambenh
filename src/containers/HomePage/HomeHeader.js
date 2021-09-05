import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';

import './HomeHeader.scss';



class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        // alert(language)
    }

    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className="header-menu">
                    <div className="menu-content">
                        <div className="menu-left">
                            <i className="fas fa-bars"></i>
                            <div className="menu-left-logo"></div>
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
                
                <div className="header-banner">
                    <div className="banner-content">
                        <h1 className="banner-name">
                            <FormattedMessage id="banner.basic"/>
                        </h1>
                        <h2 className="banner-title">
                        <FormattedMessage id="banner.title"/>
                        </h2>
                        <div className="banner-search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Search..." />
                        </div>
                        <div className="banner-app">
                            <div className="app-googleplay"></div>
                            <div className="app-appstore"></div>
                        </div>
                    </div>
                    <div className="banner-options">
                        <div className="option-item">
                            <div className="option-icon">
                                <i className="fas fa-hospital"></i>
                            </div>
                            <div className="option-title">
                                <span>
                                    <FormattedMessage id="banner.examination1"/>
                                </span>
                            </div>
                        </div>
                        <div className="option-item">
                            <div className="option-icon">
                                <i className="fas fa-hospital"></i>
                            </div>
                            <div className="option-title">
                                <span>
                                    <FormattedMessage id="banner.examination2"/>
                                </span>
                            </div>
                        </div>
                        <div className="option-item">
                            <div className="option-icon">
                                <i className="fas fa-hospital"></i>
                            </div>
                            <div className="option-title">
                                <span>
                                    <FormattedMessage id="banner.examination3"/>
                                </span>
                            </div>
                        </div>
                        <div className="option-item">
                            <div className="option-icon">
                                <i className="fas fa-hospital"></i>
                            </div>
                            <div className="option-title">
                                <span>
                                    <FormattedMessage id="banner.examination4"/>
                                </span>
                            </div>
                        </div>
                        <div className="option-item">
                            <div className="option-icon">
                                <i className="fas fa-hospital"></i>
                            </div>
                            <div className="option-title">
                                <span>
                                    <FormattedMessage id="banner.examination5"/>
                                </span>
                            </div>
                        </div>
                        <div className="option-item">
                            <div className="option-icon">
                                <i className="fas fa-hospital"></i>
                            </div>
                            <div className="option-title">
                                <span>
                                    <FormattedMessage id="banner.examination6"/>
                                </span>
                            </div>
                        </div>
                        
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
