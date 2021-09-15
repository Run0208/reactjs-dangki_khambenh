import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';

import './ManageSchedule.scss';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            date: '',
            time: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if(prevProps.allScheduleTime !== this.props.allScheduleTime) {
            this.setState({
                time: this.props.allScheduleTime
            })
        }



        // if(prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
        // }
    }

    buildDataInputSelect = (data) => {
        let result = [];
        let { language } = this.props;
        if(data && data.length > 0) {
            data.map((item, index) =>{
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName} `
                object.label = language === LANGUAGES.VI ? `${labelVi}` : `${labelEn}`
                object.value = item.id;
                result.push(object);
            });

        }
        return result;
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            date: date[0]
        })
    }
    
    render() {
        console.log(this.state);
        let { time } = this.state;
        let { language } = this.props;

        return (
            <div className="manage-schedule">
                <div className="manage-schedule-title">
                    <h2>
                        <FormattedMessage id="manage-schedule.title" />
                    </h2>
                </div>
                <div className="manage-schedule-content">
                    <div className="row">
                        <div className="col-6  doctor-option">
                            <div className="col-12 form-group">
                                <label>
                                    <FormattedMessage id="manage-schedule.choose-doctor" />
                                </label>
                                <Select
                                    className="doctor-select"
                                    value={this.state.selectedDocotr}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label>
                                    <FormattedMessage id="manage-schedule.choose-date" />
                                </label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}  
                                    className="form-control doctor-date"   
                                    value={ this.state.date }
                                    minDate={new Date()}
                                />
                            </div>
                        </div>
                        <div className="col-6 choose-time-list">
                            {
                                time && time.length > 0 &&
                                time.map((item, index) => {
                                    return(
                                        <button className="choose-time-item" key={index}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    );
                                })
                            }
                        </div>
                        <button className="btn btn-success btn-save">
                        <FormattedMessage id="manage-schedule.btn-save" />
                        </button>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
