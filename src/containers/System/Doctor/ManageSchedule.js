import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import { LANGUAGES } from '../../../utils';
import { saveBulkScheduleDoctor } from '../../../services/userService';

import './ManageSchedule.scss';

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
        date: '',
        rangeTime: []
    }
  }

  componentDidMount() {
    this.props.fetchAllScheduleTime();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if(data && data.length > 0) {
        data = data.map(item => ({ 
          ...item, 
          isActive: false
        }))
      }

      this.setState({
        rangeTime: data
      })
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState({
      date: date[0]
    });
  }

  handleOnClickActive = (time) => {
    let { rangeTime } = this.state;
    if(rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map(item => {
        if(item.id === time.id)
          item.isActive = !item.isActive;
          return item;
        })
      this.setState({
          rangeTime: rangeTime
      })
    }
  }

  handleSaveSchedule = async () => {
    let { rangeTime, date } = this.state;
    let { user} = this.props;
    let result = [];

    if(!date) {
      toast.error('Invalid date !');
      return ;
    }

    let formatedDate = new Date(date).getTime();

    if(rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter(item => item.isActive === true);
      if(selectedTime && selectedTime.length > 0){
        selectedTime.map((time) => {
          let object = {}
          object.doctorId = user.id;
          object.date = formatedDate;
          object.timeType = time.keyMap;
          result.push(object);
        })   
      } else {
        toast.error('Invalid selected time !');
        return ;
      }
    }
    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: user.id,
      formatedDate: formatedDate
    });

    if(res && res.errCode === 0) {
      toast.success('Success save schedule doctor !');
    } else {
      toast.error('Error save schedule doctor !');
    }
  }
    
  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

    return (
      <div className="manage-schedule">
        <h2 className="title">
          <FormattedMessage id="manage-schedule.title" />
        </h2>
        <div className="manage-schedule-content">
          <div className="row">
            <div className="col-4  doctor-option">
              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-date" />
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}  
                  className="form-control doctor-date"   
                  value={ this.state.date }
                  minDate={ yesterday }
                />
              </div>
            </div>
            <div className="col-8 choose-time-list">
              {
                rangeTime && rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return(
                    <button 
                      className={item.isActive ? "choose-time-item active" : "choose-time-item" }
                      key={index}
                      onClick={() => this.handleOnClickActive(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })
              }
            </div>
            <button 
              className="btn btn-success btn-save"
              onClick={() => this.handleSaveSchedule()}
            >
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
    // allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
    user: state.user.userInfo

  };
};

const mapDispatchToProps = dispatch => {
  return {
    // fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
