import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
 
import './TableManageUser.scss';

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userArray: [],
        }
    }

    componentDidMount() {
        this.props.fetchUser();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.users !== this.props.users) {
            this.setState({
                userArray: this.props.users
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUser(user.id);
    }

    render() {
 
        let listUsers = this.state.userArray;   
        return (
            <div className="user-container">
                <h1 className="title-user">TABLE USERS</h1>
                <div className="users-table">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {
                                listUsers && listUsers.length > 0 && 
                                listUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                                                <button 
                                                    className="btn-delete"
                                                    onClick={() => this.handleDeleteUser(item)}
                                                ><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    )
                                    
                                })
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: () => dispatch(actions.fetchAllUsersStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
