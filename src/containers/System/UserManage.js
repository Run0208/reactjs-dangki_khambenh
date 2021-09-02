import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import ModalUser from './ModalUser';
import ModalEdituser from './ModalEdituser';
import { emitter } from '../../utils/emitter';
import { connect } from 'react-redux';

import { 
    getAllUsers, 
    createNewUserService, 
    deleteUserService,
    editUserService,
} from '../../services/userService';

import './UserManage.scss';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('All');
        if(response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            });
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        });
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0) {
                alert(response.errMessage);
            }
            else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                });
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        }
        catch(e) {
            console.log(e);
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id);
            if(response && response.errCode === 0) {
                await this.getAllUsersFromReact();
            }
            else {
                alert(response.errMessage);
            }
        }
        catch(e) {
            console.log(e);
        }
    }

    handleEdituser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let response = await editUserService(user);
            if(response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false,
                });
                this.getAllUsersFromReact();
            }
            else {
                alert(response.errCode); 
            }
        }
        catch(e) {
            console.log(e);
        }
    }

    render() {
        // console.log('check render', this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen = {this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}

                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEdituser 
                    isOpen = {this.state.isOpenModalEditUser}
                    toggleFromParent={this.toggleUserEditModal}
                    currentUser={this.state.userEdit}
                    EditUser={this.doEditUser}
                
                />}
                <h1 className="title-user">TABLE USERS</h1>
                <button className="btn btn-primary btn-add"
                    onClick={() => this.handleAddNewUser()}
                >
                    <i className="fas fa-plus"> </i> 
                    Add new users
                </button>
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
                                arrUsers && arrUsers.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit" onClick={() => {this.handleEdituser(item)}}><i className="fas fa-pencil-alt"></i></button>
                                                <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                        
                                    );
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
