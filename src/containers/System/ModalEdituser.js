import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import { emitter } from '../../utils/emitter';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import _ from 'lodash';


class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

    }
    componentDidMount() {
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashCode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,

            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChageInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for(let i = 0; i < arrInput.length; i++) {
            console.log('check inside loop ', this.state[arrInput[i],arrInput[i]]);
            if(!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === true) {
            this.props.EditUser(this.state);
        }
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => {this.toggle()}} 
                className={'modal-user-container'}
                size="lg"
            >
                <ModalHeader toggle={() => {this.toggle()}}>Edit user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input 
                                type="text" 
                                placeholder="Email" 
                                value={this.state.email}
                                onChange={(event) => {this.handleOnChageInput(event, "email")}} 
                                disabled
                            />
                        </div>    
                        <div className="input-container">
                            <label>Password</label>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={this.state.password}
                                onChange={(event) => {this.handleOnChageInput(event, "password")}} 
                                disabled
                            />
                        </div> 
                        <div className="input-container">
                            <label>First name</label>
                            <input 
                                type="text" 
                                placeholder="First name"
                                value={this.state.firstName} 
                                onChange={(event) => {this.handleOnChageInput(event, "firstName")}}
                            />
                        </div> 
                        <div className="input-container">
                            <label>Last name</label>
                            <input 
                                type="text" 
                                placeholder="Last name" 
                                value={this.state.lastName}
                                onChange={(event) => {this.handleOnChageInput(event, "lastName")}}    
                            />
                        </div> 
                        <div className="input-container max-width">
                            <label>Address</label>
                            <input 
                                type="text" 
                                placeholder="Address"
                                value={this.state.address} 
                                onChange={(event) => {this.handleOnChageInput(event, "address")}}
                            />
                        </div> 
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button 
                    color="primary" 
                    className="button" 
                    onClick={() => { this.handleSaveUser() }}
                >
                    Save
                </Button>{' '}
                    <Button color="danger" className="button" onClick={() => {this.toggle()}}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);





