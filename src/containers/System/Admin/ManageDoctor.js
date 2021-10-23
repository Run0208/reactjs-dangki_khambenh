import React, { Component } from 'react';
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import { connect } from 'react-redux';
import MdEditor from 'react-markdown-editor-lite';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import { getDetailInforDoctor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

import './ManageDoctor.scss';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {

            // markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            hasOldData: false,
            listDoctors: [],

            // doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',
            
            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getRequireDoctorInfor();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect
            })
        }
        
        if(prevProps.allRequireDoctorInfor !== this.props.allRequireDoctorInfor) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequireDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        }

        if(prevProps.language !== this.props.language) {
            let { resPrice, resPayment, resProvince } = this.props.allRequireDoctorInfor;
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
    }

    buildDataInputSelect = (data, type) => {
        let result = [];
        let { language } = this.props;
        if(data && data.length > 0) {
            if(type === 'USERS') {
                data.map((item, index) =>{
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`; 
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? `${labelVi}` : `${labelEn}`;
                    object.value = item.id;
                    result.push(object);
                });
            }
            if(type === 'PRICE') {
                data.map((item, index) =>{
                    let object = {};
                    let labelVi = `${item.valueVi} VND`; 
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? `${labelVi}` : `${labelEn}`;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
            if(type === 'PAYMENT' || type === 'PROVINCE') {
                data.map((item, index) =>{
                    let object = {};
                    let labelVi = `${item.valueVi}`; 
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? `${labelVi}` : `${labelEn}`;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
            if(type === 'SPECIALTY') {
                data.map((item, index) =>{
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                });
            }
            if(type === 'CLINIC') {
                data.map((item, index) =>{
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                });
            }
        }
        return result;
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveMarkdown = () => {
        let { hasOldData } = this.state;

        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description	: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment:  this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic.value,
            specialtyId: this.state.selectedSpecialty.value
        })
    }

    handleOnChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state

        let res = await getDetailInforDoctor(selectedOption.value);
        if(res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            let addressClinic = '', note = '', nameClinic = '',
                
                priceId = '', paymentId = '', provinceId = '', specialtyId = '', clinicId = '',

                selectedPrice = '', selectedPayment = '', selectedProvince = '', selectedSpecialty = '', selectedClinic = '';

            if(res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                priceId = res.data.Doctor_Infor.priceId;
                paymentId = res.data.Doctor_Infor.paymentId;
                provinceId = res.data.Doctor_Infor.provinceId;
                note = res.data.Doctor_Infor.note;

                priceId =  res.data.Doctor_Infor.priceId;
                paymentId =  res.data.Doctor_Infor.paymentId;
                provinceId =  res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                clinicId = res.data.Doctor_Infor.clinicId;

                selectedPrice = listPrice.find((item) => {
                    return item && item.value === priceId;
                })
                selectedPayment = listPayment.find((item) => {
                    return item && item.value === paymentId;
                })
                selectedProvince = listProvince.find((item) => {
                    return item && item.value === provinceId;
                })
                selectedSpecialty = listSpecialty.find((item) => {
                    return item && item.value === specialtyId;
                })
                selectedClinic = listClinic.find((item) => {
                    return item && item.value === clinicId;
                })
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description	: markdown.description,
                hasOldData: true,

                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,

                priceId: priceId,
                paymentId: paymentId,
                provinceId: provinceId,

                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description	: '',
                hasOldData: false,

                note: '',
                nameClinic: '',
                addressClinic: '',
 
                priceId: '',
                paymentId: '',
                provinceId: '',

                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: ''
            })
        }
    }

    handleOnChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = {...this.state};
        stateCopy[stateName] = selectedOption

        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    render() {
        let  { hasOldData } = this.state;
        console.log(this.props.allRequireDoctorInfor);
        return (
            <div className="manage-doctor">
                <h1 className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </h1>
                <div className="manage-doctor-more-infor">
                    <div className="more-infor-left">
                        <div className="choose-doctor form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.choose-doctor" />
                            </label>
                            <Select
                                className="choose-doctor-select"
                                value={this.state.selectedOption}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listDoctors}
                                placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor" />}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.price" />
                                </label>
                                <Select
                                    className="choose-doctor-select"
                                    value={this.state.selectedPrice}
                                    onChange={this.handleOnChangeSelectDoctorInfor} 
                                    options={this.state.listPrice}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                                    name="selectedPrice"
                                    
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.payment" />
                                </label>
                                <Select
                                    className="choose-doctor-select"
                                    value={this.state.selectedPayment}
                                    onChange={this.handleOnChangeSelectDoctorInfor}
                                    options={this.state.listPayment}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                                    name="selectedPayment"
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.province" />
                                </label>
                                <Select
                                    className="choose-doctor-select"
                                    value={this.state.selectedProvince}
                                    onChange={this.handleOnChangeSelectDoctorInfor}
                                    options={this.state.listProvince}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                                    name="selectedProvince"
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.clinic-name" />
                                </label>
                                <input 
                                    className="form-control" 
                                    onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                                    value={this.state.nameClinic}
                                    placeholder="Clinic name"
                                />
                            </div>

                            {/* ------------------------------------------------------------------------ */}
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.specialty" />
                                </label>
                                <Select
                                    className="choose-doctor-select"
                                    value={this.state.selectedSpecialty}
                                    onChange={this.handleOnChangeSelectDoctorInfor}
                                    options={this.state.listSpecialty}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                                    name="selectedSpecialty"
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.clinic" />
                                </label>
                                <Select
                                    className="choose-doctor-select"
                                    value={this.state.selectedClinic}
                                    onChange={this.handleOnChangeSelectDoctorInfor}
                                    options={this.state.listClinic}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.clinic" />}
                                    name="selectedClinic"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="more-infor-right">
                        <div className="col-12 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.intro-infor" />
                            </label>
                            <textarea 
                                className="form-control" 
                                rows="5" 
                                onChange={(event) => this.handleOnChangeText(event, 'description')}
                                value={this.state.description}
                            />
                        </div>
                        
                        <div className="col-12 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.note" />
                            </label>
                            <input 
                                className="form-control" 
                                onChange={(event) => this.handleOnChangeText(event, 'note')}
                                value={this.state.note}
                                placeholder="Note..."
                            />
                        </div>
                        <div className="col-12">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.address" />
                                </label>
                                <input 
                                    className="form-control" 
                                    onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                                    value={this.state.addressClinic}    
                                    placeholder="Address..."
                                />
                        </div>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor 
                        style={{ height: '300px' }} 
                        onChange={ this.handleEditorChange} 
                        value={ this.state.contentMarkdown }
                        renderHTML={text => mdParser.render(text)} 
                    />
                </div>
                <button 
                    className={ hasOldData === true ? "save-doctor" : "create-doctor" }
                    onClick={() => this.handleSaveMarkdown()}
                >
                    { 
                        hasOldData === true ? 
                        <span>
                            <FormattedMessage id="admin.manage-doctor.update-infor" />
                        </span> : 
                        <span>
                            <FormattedMessage id="admin.manage-doctor.create-infor" />
                        </span> 
                    }
                </button>
            </div>            
        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequireDoctorInfor: state.admin.allRequireDoctorInfor,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),

        getRequireDoctorInfor: () => dispatch(actions.getRequireDoctorInfor()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
