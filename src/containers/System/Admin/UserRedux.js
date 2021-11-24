import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import TableManageUser from './TableManageUser';


import 'react-image-lightbox/style.css';
import './UserRedux.scss';


class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImgUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: '',
            
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.gender !== this.props.gender) {
            let arrGender = this.props.gender;
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''
            })
        }
        if(prevProps.position !== this.props.position) {
            let arrPositon = this.props.position;

            this.setState({
                positionArr: arrPositon,
                position: arrPositon && arrPositon.length > 0 ? arrPositon[0].keyMap : ''
            })
        }
        if(prevProps.role !== this.props.role) {
            let arrRole = this.props.role;
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })
        }

        if(prevProps.users !== this.props.users) {
            let arrPositon = this.props.position;
            let arrGender = this.props.gender;
            let arrRole = this.props.role;
 
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                position: arrPositon && arrPositon.length > 0 ? arrPositon[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: ''
            })
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64  = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64
            })
        }
    }
    
    openPreviewImage = () => {
        if(!this.state.previewImgUrl) 
            return;
        this.setState({
            isOpen: true
        })
    } 

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === false) return;

        let { action } = this.state;

        if(action === CRUD_ACTIONS.CREATE) {
            // Fire Redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if(action === CRUD_ACTIONS.EDIT) {
            // Fire Redux edit user
            this.props.editUser({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }


    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = [ 'email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address' ];
        for(let i = 0; i < arrCheck.length; i++) {
            if(!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if(user.image) {
            imageBase64 = Buffer.from(user.image, 'base64').toString('binary');
        }

        this.setState({
            userEditId: user.id,
            email: user.email,
            password: 'hidden',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address ,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImgUrl: imageBase64,
            action: CRUD_ACTIONS.EDIT,
        })
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role } = this.state;
        return (
            <section className="section-user">
                <h2 className="title">
                    Create User 
                </h2>
                <div className="section-user-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2>
                                    <FormattedMessage id="manage-user.add" />
                                </h2>
                            </div>
                            <div className="col-9">
                                <div className="row">
                                    <div className="col-3">
                                        <label>
                                            <FormattedMessage id="manage-user.email" />
                                        </label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Email" 
                                            value={email}
                                            onChange={(event) => { this.onChangeInput(event, 'email') }}
                                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true: false}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <label>
                                            <FormattedMessage id="manage-user.password" />
                                        </label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            placeholder="Passworl" 
                                            value={password}
                                            onChange={(event) => { this.onChangeInput(event, 'password') }}
                                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true: false}

                                        />
                                    </div>
                                    <div className="col-3">
                                        <label>
                                            <FormattedMessage id="manage-user.first-name" />
                                        </label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="First Name" 
                                            value={firstName}
                                            onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <label>
                                            <FormattedMessage id="manage-user.last-name" />
                                        </label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Last Name" 
                                            value={lastName}
                                            onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                        />
                                    </div>
                                    <div className="col-9">
                                        <label>
                                            <FormattedMessage id="manage-user.address" />
                                        </label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Address" 
                                            value={address}
                                            onChange={(event) => { this.onChangeInput(event, 'address') }}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <label>
                                            <FormattedMessage id="manage-user.phone-number" />
                                        </label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Phone number" 
                                            value={phoneNumber}
                                            onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <label>
                                            <FormattedMessage id="manage-user.gender" />
                                        </label>
                                        <select 
                                            className="form-control"
                                            onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                            value={gender || ''}
                                        >
                                            {genders && genders.length > 0 && genders.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <label>
                                            <FormattedMessage id="manage-user.position" />
                                        </label>
                                        <select 
                                            className="form-control"
                                            onChange={(event) => { this.onChangeInput(event, 'position') }}
                                            value={position || ''}
                                        >
                                            {positions && positions.length > 0 && positions.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                );
                                            })}`
                                        </select>
                                    </div>
                                    <div className="col-4">
                                    <label>
                                        <FormattedMessage id="manage-user.role" />
                                    </label>
                                    <select 
                                        className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'role') }}
                                        value={role || ''}
                                    >
                                        {roles && roles.length > 0 && roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            );
                                        })}`
                                    </select>
                                </div>
                                </div>
                            </div>
                            
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <div className="upload">
                                    <input 
                                        type="file" 
                                        id="preview-image" 
                                        hidden 
                                        onChange={(event) => this.handleOnChangeImage(event)}
                                    />
                                    <div 
                                        className="upload-image" 
                                        onClick={() => this.openPreviewImage()}
                                        style={{backgroundImage: `url(${this.state.previewImgUrl})`}}
                                    >
                                        {this.state.isOpen === true && 
                                            <Lightbox
                                                mainSrc={this.state.previewImgUrl}
                                                onCloseRequest={() => this.setState({ isOpen: false })}
                                            />
                                        }
                                    </div>
                                    <label className="upload-btn" htmlFor="preview-image">Upload image <i className="fas fa-cloud-upload-alt"></i></label>
                                </div>
                            </div>
                            <div className="col-12 ">
                                <button 
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-success btn-save" : "btn btn-primary btn-save"}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {
                                        this.state.action === CRUD_ACTIONS.EDIT ? 
                                            <FormattedMessage id="manage-user.update" />
                                            :
                                            <FormattedMessage id="manage-user.create" />
                                    }
                                </button>
                            </div>

                            <div className="col-12 ">
                                <TableManageUser 
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </section>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        gender: state.admin.genders,
        position: state.admin.positions,
        role: state.admin.roles,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

        getPositionStart: () => dispatch(actions.fetchPositionStart()),

        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        createNewUser: (data) => dispatch(actions.createNewUser(data)),

        fetchUser: () => dispatch(actions.fetchAllUsersStart()),

        editUser: (data) => dispatch(actions.editUser(data))

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
