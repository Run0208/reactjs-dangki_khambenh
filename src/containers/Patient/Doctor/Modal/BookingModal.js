import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import Select from 'react-select';
import { Modal } from 'reactstrap';
import { connect } from "react-redux";
import ProfileDoctor from '../ProfileDoctor';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../../store/actions';
import LoadingOverlay from 'react-loading-overlay';
import DatePicker from '../../../../components/Input/DatePicker';
import { postBookAppointment } from '../../../../services/userService';

import './BookingModal.scss';
import { toast } from 'react-toastify';


class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            doctorId: '',
            selectedGenders: '',
            timeType: '',
            
            genders: '',
            isLoading: false
        }
    }

    async componentDidMount() {
        this.props.getGenders()
    }

     async componentDidUpdate(prevProps, prevState) {
        let { language } = this.props;
        if(this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildGenders(this.props.genders)                  
            })
        }
        if(this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildGenders(this.props.genders)                       
            })
        }

        if(this.props.dataTime !== prevProps.dataTime) {
            if(this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    buildGenders = (data) => {
        let { language } = this.props;
        let result = [];             
        
        if(data && data.length > 0) {
            data.map((item) => {
                let objoect = {};
                objoect.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                objoect.value = item.keyMap;
                result.push(objoect);
            })
        }
        return result;
    }

    handleOnChangeInput = (event, id) => {
        let input = event.target.value;
        let stateCopy = {...this.state};
        stateCopy[id] = input;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleOnChangeSelect = (selectedOption) => {
        this.setState({
            selectedGenders: selectedOption
        })
    }

    handleConfirmBooking = async () => {
        this.setState({
            isLoading: true
        })
        
        let date = new Date(this.state.birthday).getTime();
        
        let timeString = this.buildTimeBooking(this.props.dataTime);

        let doctorName = this.buildDoctorName(this.props.dataTime);

        let res = await postBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthDay: date,
            doctorId: this.state.doctorId,
            selectedGenders: this.state.selectedGenders.value,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })

        if(res && res.errCode === 0) {
            this.setState({
                isLoading: false
            })
            toast.success("Booking a new appointment success !");
            this.props.closeBookingModal();
        } else {
            this.setState({
                isLoading: false
            })
            toast.error("Booking a new appointment error !");
            this.props.closeBookingModal();
        }
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if(dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

            let date = language === LANGUAGES.VI ?
                moment.unix( + dataTime.date / 1000 ).format('dddd - DD/MM/YYYY') :
                moment.unix( + dataTime.date / 1000 ).locale('en').format('dddd - MM/DD/YYYY');
            return `${time} - ${date}`
        }
        return '';
    }
    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if(dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
            `${dataTime.doctorIdData.lastName} ${dataTime.doctorIdData.firstName}`
            :
            `${dataTime.doctorIdData.firstName} ${dataTime.doctorIdData.lastName}`
            return name;
        }
        return '';
    }
    
    render() {
        let { isOpenModalBooking, closeBookingModal, dataTime } = this.props;
        let doctorId = '';
        if(dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
        return (
            <LoadingOverlay
                active={this.state.isLoading}
                spinner
                text='Loading...'
            >
                <Modal 
                    isOpen={isOpenModalBooking}
                    size="lg"
                    className={'booking-modal'}
                >
                    <div className="booking-modal-content">
                        <div className="header">
                            <h3>
                                <FormattedMessage id="patient.booking-modal.title" />  
                            </h3>
                            <span
                                onClick={closeBookingModal}
                            >
                                <i className="fas fa-times"></i>
                            </span>
                        </div>
                        <div className="body">
                            <div className="doctor-infor">
                                <div className="doctor-infor-image"></div> 
                                <div className="doctor-infor-content">
                                    <ProfileDoctor 
                                        doctorId={doctorId}
                                        isShowDescDoctor={false}
                                        dataTime={dataTime}
                                        isShowLinkDetail={false}
                                        isShowPrice={true}
                                    />
                                </div> 
                            </div>
                            <div className="booking row">
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.email" /> 
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={this.state.email}    
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                        placeholder="Email..."
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.phone-number" /> 
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={this.state.phoneNumber}    
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                        placeholder="Phone number..."
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.full-name" /> 
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={this.state.fullName}    
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                        placeholder="Full name..."
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.address" /> 
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={this.state.address}    
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                        placeholder="Address..."
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.date-of-birth" /> 
                                    </label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}  
                                        className="form-control "   
                                        value={ this.state.birthday }
                                        placeholder="Date of birth..."
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.gender" /> 
                                    </label>
                                    <Select 
                                        value={this.state.selectedGenders}
                                        onChange={this.handleOnChangeSelect}
                                        options={this.state.genders}
                                        placeholder="Gender..."
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.reason" /> 
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={this.state.reason}    
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                        placeholder="Reasons for medical examination..."
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <button 
                                className="btn btn-book"
                                onClick={() => this.handleConfirmBooking()}
                            
                            >
                                <FormattedMessage id="patient.booking-modal.comfirm" /> 
                            </button>
                            <button 
                                className="btn btn-cancel"
                                onClick={closeBookingModal}
                            >
                                <FormattedMessage id="patient.booking-modal.cancel" /> 
                            </button>
                        </div>
                    </div>
                </Modal>
            </LoadingOverlay>
             
        );
    }
}

const mapStateToProps = state => {
    return {
       language: state.app.language,
       genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
