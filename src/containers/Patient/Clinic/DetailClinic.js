import React, { Component } from 'react';
import { connect } from "react-redux";
// import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { /*getAllCodeService, */ getAllDetailClinicById } from '../../../services/userService';


import './DetailClinic.scss';
import _ from 'lodash';
// import { LANGUAGES } from '../../../utils';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {}
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailClinicById({
                id: id
            });
            
            if(res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if(data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if(arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

     async componentDidUpdate(prevProps, prevState) {
        let { language } = this.props;
        if(language !== prevProps.language) {

        }
    }
    
    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        // let { language } = this.props;
        return (
            <div className="detail-specialty">
                <HomeHeader />
                <section className="banner">
                    {
                        dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                        <>
                            <div className="name-clinic">{dataDetailClinic.name}</div>
                            <div className="address-clinic">{dataDetailClinic.address}</div>
                            <div dangerouslySetInnerHTML={{__html: dataDetailClinic.descriptionHTML}}></div>
                        </>
                    }
                </section>
                <section className="specialty-list">
                    {
                        arrDoctorId && arrDoctorId.length > 0 && 
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className="specialty-item" key={index}>
                                    <div className="intro">
                                        <div className="profile-doctor">
                                        <ProfileDoctor 
                                            doctorId={item}
                                            isShowDescDoctor={true}
                                            isShowLinkDetail={true}
                                            isShowPrice={false}
                                            // dataTime={dataTime}
                                        />

                                        </div>
                                    </div>
                                    <div className="schedule">
                                        <div className="schedule-infor">
                                            <DoctorSchedule  doctorIdFromParent={ item } />
                                        </div>
                                        <div className="schedule-price">
                                            <DoctorExtraInfor doctorIdFromParent={ item } /> 
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </section>
                
                

                <section className="footer"></section>
                
                
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
