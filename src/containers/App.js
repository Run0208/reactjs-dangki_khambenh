import React, { Component, Fragment } from 'react';
import { path } from '../utils';
import { history } from '../redux';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';


import Login from './Auth/Login';
import Home from '../routes/Home';
import System from '../routes/System';
import Doctor from '../routes/Doctor';
import HomePage from './HomePage/HomePage.js';
import ListDoctor from './HomePage/Doctor/ListDoctor';
import VerifyEmail from './Patient/VerifyEmail';
import DetailDoctor from './Patient/Doctor/DetailDoctor';
import DetailClinic from './Patient/Clinic/DetailClinic';
import CustomScrollbars from '../components/CustomScrollbars';
import DetailSpecialty from './Patient/Specialty/DetailSpecialty';



// import { CustomToastCloseButton } from '../components/CustomToast';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <CustomScrollbars style={{height: '100vh', width: '100%'}}>
                                <Switch>
                                    <div className="content-container">
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />
                                    </div>
                                </Switch>                            
                                <Switch>
                                    <div  className="home-container">
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.LIST_DOCTOR} component={ListDoctor} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                                    <Route path={path.DETAIL_CLINIC} component={DetailClinic} />

                                    <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />
                                    </div>
                                </Switch>
                        </CustomScrollbars>

                        <ToastContainer
                            position="bottom-right"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);