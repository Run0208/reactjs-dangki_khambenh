import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { connect } from "react-redux";
import ProfileDoctor from '../ProfileDoctor';
import { FormattedMessage } from 'react-intl';

import './BookingModal.scss';
import _ from 'lodash';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }

     async componentDidUpdate(prevProps, prevState) {
        let { language } = this.props;
        if(this.props.language !== prevProps.language) {

        }
    }
    
    render() {
        let { isOpenModalBooking, closeBookingModal, dataTime } = this.props;
        let doctorId = '';
        if(dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
        return (
            <Modal 
                isOpen={isOpenModalBooking}
                // toggle={}
                size="lg"
                className={'booking-modal'}
            >
                <div className="booking-modal-content">
                    <div className="header">
                        <h3>Thông tin đặt lịch khám bệnh</h3>
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
                                />
                            </div> 
                        </div>
                        <div className="booking row">
                            <div className="col-6 form-group">
                                <label>Email</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>Phone number</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>Full name</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>Address</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>Đặt cho ai</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>Gender</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-12 form-group">
                                <label>Lý do khám</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <button className="btn btn-book">Đặt lịch</button>
                        <button 
                            className="btn btn-cancel"
                            onClick={closeBookingModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal> 
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
