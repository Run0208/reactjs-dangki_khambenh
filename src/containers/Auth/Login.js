import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        });
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }
    hendleLogin = () => {
        console.log('Username: ', this.state.username, 'Password: ', this.state.password);
        console.log('All state', this.state);

    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        });
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="login-title col-12 text-center">
                            <h1>LOGIN</h1>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>User name</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter your Username" 
                            value={this.state.username}
                            onChange={(event) => { this.handleOnChangeUsername(event) }}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                            <div className="input-password">
                                <input 
                                type={this.state.isShowPassword ? 'text' : 'password'} 
                                className="form-control" 
                                placeholder="Enter your Password" 
                                value={this.state.password}
                                onChange={(event) => { this.handleOnChangePassword(event) }}
                                />
                                <span onClick={() => { this.handleShowHidePassword() }}>
                                    <i class={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        
                        <div className="col-12">
                            <button className="btn-login" onClick={() => { this.hendleLogin() }}>Login</button>
                        </div>
                        <div className="col-12">
                            <span className="login-forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-12">
                            <span className="text-other-login">Or login with</span>
                        </div>
                        <div className="col-12 social-login">
                            <div className="google">
                                <i className="fab fa-google-plus-g "></i>
                            </div>
                            <div className="facebook">
                                <i className="fab fa-facebook-f "></i>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
