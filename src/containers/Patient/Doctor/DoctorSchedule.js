import React, { Component } from 'react';
import moment from 'moment';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import localizattion from 'moment/locale/vi';

import './DoctorSchedule.scss';
import { getScheduleDoctorByDate } from '../../../services/userService';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: []
        }
    }

    componentDidMount() {
        let { language } = this.props;
        this.setArrDays(language);
    }

    componentDidUpdate(prevProps, prevState) {
        let { language } = this.props;
        if(this.props.language !== prevProps.language) {
            this.setArrDays(language)
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if(language === LANGUAGES.VI) {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi);
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object);
        }
        this.setState({
            allDays: allDays,

        })
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
    
    render() {
        let { allDays, allAvalableTime } = this.state;
        let { language } = this.props;
        return (
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
                        <span>Lịch khám</span>
                    </div>
                    <div className="time-list">
                        {
                            allAvalableTime && 
                            allAvalableTime.length > 0 ?
                            allAvalableTime.map((item, index) => {
                                let timeDisplay = language === LANGUAGES.VI ?
                                item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                return(
                                    <button className="time-item" key={index}>{timeDisplay}</button>
                                )
                            })

                            : 
                            <span className="notification">Bác sĩ không có lịch hẹn vào hôm nay, vui lòng chọn ngày khác.</span>
                        }
                    </div>

                </div>
            </div>
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
