import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import { LANGUAGES, USER_ROLE } from '../../utils';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import logo from '../../assets/logo.svg'

import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    handleChaneLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if(userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId
            if(role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if(role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }
        this.setState({
            menuApp: menu
        })
    }
    

    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className="header-container">

                <div className="header-container-logo">
                    <img src={logo} />
                </div>

                <div className="languages">
                    <div className="welcome">
                        <FormattedMessage id="header.welcome"/>
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''}
                    </div>
                    <span>Language: </span>
                    <span 
                        className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}
                        onClick={() => this.handleChaneLanguage(LANGUAGES.VI)}
                    >
                        VN
                    </span>
                    <span 
                        className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'} 
                        onClick={() => this.handleChaneLanguage(LANGUAGES.EN)}
                    >
                        EN
                    </span>
                    
                </div>

                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp}/>
                </div>

                

                {/* nút logout */}
                <div className="logout" >
                    <button 
                        className="btn-logout" 
                        onClick={processLogout} 
                        title="Logout"
                    >
                        Log out
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
