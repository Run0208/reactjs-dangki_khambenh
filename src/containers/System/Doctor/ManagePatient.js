import React, { Component } from 'react';
import moment from 'moment';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor } from '../../../services/userService';

import './ManagePatient.scss';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        }
    }

    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;  
        let formatedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formatedDate);
    }

     async componentDidUpdate(prevProps, prevState) {
        let { language } = this.props;
        if(this.props.language !== prevProps.language) {

        }
    }

    getDataPatient = async (user, formatedDate) => {
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        });
        if(res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state;  
            let formatedDate = new Date(currentDate).getTime();
            this.getDataPatient(user, formatedDate);

        })
    }

    handleConfirm = () => {
        
    }
   
    handleRemedy = () => {

    }
    
    render() {
        let { dataPatient } = this.state;
            return (
            <div className="manage-patient">
                <h2 className="manage-patient-title">Quản lý bệnh nhân khám bệnh</h2>
                <div className="manage-patient-body">
                    <div className="row">
                        <div className="col-4 form-group">
                            <label>Chọn ngày khám</label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}  
                                className="form-control doctor-date"   
                                value={ this.state.date }
                            />
                        </div>
                        <div className="col-12 form-group patient-list">
                            <label>Danh sách bệnh nhân khám bệnh</label>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Email</th>
                                        <th>Full Name</th>
                                        <th>address</th>
                                        <th>Phone number</th>
                                        <th>gender</th>
                                        <th>Time</th>
                                        <th>Actions</th>
                                    </tr>
                                    {
                                        dataPatient && dataPatient.length > 0 ?
                                        dataPatient.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.patientIdData.email}</td>
                                                    <td>{item.patientIdData.fullName}</td>
                                                    <td>{item.patientIdData.address}</td>
                                                    <td>{item.patientIdData.phoneNumber}</td>
                                                    <td>{item.patientIdData.genderIdData.valueVi}</td>
                                                    <td>{item.timeTypeDataPatient.valueVi}</td>
                                                    <td>
                                                        <button 
                                                            className="btn btn-confirm"
                                                            onClick={() => this.handleConfirm()}
                                                        >
                                                            Xác nhận
                                                        </button>
                                                        <button 
                                                            className="btn btn-remedy"
                                                            onClick={() => this.handleRemedy()}
                                                        >
                                                            Gửi hóa đơn
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <td>No data...</td>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       language: state.app.language,
       user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
