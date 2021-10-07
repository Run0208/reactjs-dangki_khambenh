import React, { Component } from 'react';
import moment from 'moment';
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import RemedyModal from './RemedyModal';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import LoadingOverlay from 'react-loading-overlay';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';

import './ManagePatient.scss';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenModal: false,
            dataModal: {},
            isLoading: false
        }
    }

    async componentDidMount() {
        this.getDataPatient();
    }

     async componentDidUpdate(prevProps, prevState) {
        let { language } = this.props;
        if(this.props.language !== prevProps.language) {

        }
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;  
        let formatedDate = new Date(currentDate).getTime();
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
        }, async () => {
            await this.getDataPatient();
        })
    }

    handleConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientIdData.email,
            fullName: item.patientIdData.fullName,
            phoneNumber: item.patientIdData.phoneNumber,
            address: item.patientIdData.address,
            timeType: item.timeType
        }
        this.setState({
            isOpenModal: true,
            dataModal: data
        })
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (data) => {
        let { dataModal } = this.state;
        this.setState({
            isLoading: true
        })
        let res = await postSendRemedy({
            email: data.email,
            imageBase64: data.imageBase64,
            fullName: dataModal.fullName,
            phoneNumber: dataModal.phoneNumber,
            address: dataModal.address,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language
        })
        if(res && res.errCode === 0) {
            this.setState({
                isLoading: false
            })
            toast.success('Send remedy success !');
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isLoading: false
            })
            toast.error('Something wrong... !');
            console.log('check error: ', res);
        }
    }

    
    render() {
        let { dataPatient, isOpenModal, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay
                active={this.state.isLoading}
                spinner
                text='Loading...'
                >
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
                                                    let time = language === LANGUAGES.VI ? 
                                                    item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                    let gender = language === LANGUAGES.VI ? 
                                                    item.patientIdData.genderIdData.valueVi: item.patientIdData.genderIdData.valueEn
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.patientIdData.email}</td>
                                                            <td>{item.patientIdData.fullName}</td>
                                                            <td>{item.patientIdData.address}</td>
                                                            <td>{item.patientIdData.phoneNumber}</td>
                                                            <td>{gender}</td>
                                                            <td>{time}</td>
                                                            <td>
                                                                <button 
                                                                    className="btn btn-confirm"
                                                                    onClick={() => this.handleConfirm(item)}
                                                                >
                                                                    Xác nhận
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                <tr>
                                                    <td colSpan="8">No data...</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <RemedyModal 
                        dataModal={dataModal}
                        sendRemedy={this.sendRemedy}
                        isOpenModal={isOpenModal}
                        closeRemedyModal={this.closeRemedyModal}
                    />
                </LoadingOverlay>
            </>
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
