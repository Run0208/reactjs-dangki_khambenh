import React, { Component } from 'react';
import moment from 'moment';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import localizattion from 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';
import { getScheduleDoctorByDate } from '../../../services/userService';


import './DoctorSchedule.scss';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataModalScheduleTime: {},

        }
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        if(this.props.doctorIdFromParent){
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }
        
        this.setState({
            allDays: allDays,
        })
    }

     async componentDidUpdate(prevProps, prevState) {
        let { language } = this.props;
        if(this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(language);
            this.setState({
                allDays: allDays,
            })
        }
        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if(language === LANGUAGES.VI) {
                if(i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)
                }
            } else {
                if(i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelEn = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelEn)
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;
    }

    handleOnChangeSelect = async (event) => {
        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);

            let allTime = [];
            if(res && res.errCode === 0) {
                let allTime = res.data;

                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }
        }
    }

    handleOnClickShowModalBooking = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataModalScheduleTime: time
        })
    }
    
    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        let { allDays, allAvalableTime, isOpenModalBooking, dataModalScheduleTime } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="doctor-schedule">
                    <div className="select-date">
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {
                                allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option 
                                            value={item.value} 
                                            key={index}
                                            className="date-item"
                                        >
                                            {item.label}
                                        </option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className="select-time-list">
                        <div className="calendar">
                            <i className="fas fa-calendar-alt"></i>
                            <span>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </div>
                        <div className="book-schedule">
                            {
                                allAvalableTime && 
                                allAvalableTime.length > 0 ?
                                <>
                                    <div className="time-list">
                                        {
                                            allAvalableTime.map((item, index) => {
                                                let timeDisplay = language === LANGUAGES.VI ?
                                                item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                                return(
                                                    <button 
                                                        className={language === LANGUAGES.VI ? "time-item-vi" : "time-item-en"} 
                                                        onClick={() => this.handleOnClickShowModalBooking(item)}
                                                        key={index}

                                                    >
                                                        {timeDisplay}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="text-book">
                                        <span>
                                            <FormattedMessage id="patient.detail-doctor.choose" />
                                            <i className="fas fa-hand-pointer"></i>
                                            <FormattedMessage id="patient.detail-doctor.end-book" />    
                                        </span>
                                    </div>
                                </>
                                : 
                                <span className="notification">
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </span>
                            }
                        </div>

                    </div>
                </div>
                <BookingModal 
                    isOpenModalBooking={isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataModalScheduleTime}
                />
            </>
            
        );
    }
}

const mapStateToProps = state => {
    return {
       language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
