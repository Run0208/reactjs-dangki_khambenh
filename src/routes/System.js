import React, { Component } from 'react';
import { connect } from "react-redux";
import Header from '../containers/Header/Header';
import UserManage from '../containers/System/UserManage';
import { Redirect, Route, Switch } from 'react-router-dom';
import DashBoard from '../containers/System/Admin/DashBoard';
import UserRedux from '../containers/System/Admin/UserRedux';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';


class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment className="system">
                {isLoggedIn && <Header/>}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/dashboard" component={DashBoard} />
                            {/* <Route path="/system/user-manage" component={UserManage} /> */}
                            <Route path="/system/manage-user" component={UserRedux} />
                            <Route path="/system/manage-doctor" component={ManageDoctor} />
                            <Route path="/system/manage-clinic" component={ManageClinic} />
                            <Route path="/system/manage-specialty" component={ManageSpecialty} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
