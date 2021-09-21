import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import { getProfileDoctor } from '../../../services/userService';

import './ProfileDoctor.scss';


class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }

     async componentDidUpdate(prevProps, prevState) {
        let { language } = this.props;
        if(this.props.language !== prevProps.language) {

        }
        if(this.props.doctorId !== prevProps.doctorId) {
            // this.getInforDoctor(this.props.doctorId)
        }
    }

    getInforDoctor = async (id) => {
        let result = {};
        if(id) {
            let res = await getProfileDoctor(id);
            if(res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }
    
    render() {
        let { dataProfile } = this.state;
        let { language } = this.props;
        let nameVi = '', nameEn = '';
        if(dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <>
                <section className="intro-doctor">
                    <div 
                        className="intro-doctor-image"
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    >

                    </div>
                    <div className="intro-doctor-content">
                        <div className="doctor-title">
                            <h2>
                                { language === LANGUAGES.VI ? nameVi : nameEn }
                            </h2>
                        </div>

                        <div className="doctor-intro">
                            <div>
                                {
                                    dataProfile &&
                                    dataProfile.Markdown && 
                                    dataProfile.Doctor_Infor.nameClinic && 
                                    <span>
                                        { dataProfile.Doctor_Infor.nameClinic }
                                    </span>
                                }
                            </div>
                            <div>
                                {
                                    dataProfile &&
                                    dataProfile.Markdown && 
                                    dataProfile.Doctor_Infor.addressClinic && 
                                    <span>
                                        { dataProfile.Doctor_Infor.addressClinic }
                                    </span>
                                }
                            </div>
                            <div>
                                <i className="fas fa-map-marker-alt"></i>
                                {
                                    dataProfile &&
                                    dataProfile.Markdown && 
                                    dataProfile.Doctor_Infor.provinceIdData && 
                                    <span>
                                        { dataProfile.Doctor_Infor.provinceIdData.valueVi }
                                    </span>
                                }
                            </div>
                            
                            
                        </div>
                    </div>
                </section>
                <div className="doctor-price">
                    <FormattedMessage id="patient.extra-infor-doctor.examination-price" />  
                    <span>
                        {
                            dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI && 
                            <NumberFormat 
                                value={ dataProfile.Doctor_Infor.priceIdData.valueVi  }
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' VND'}
                            />
                        }
                    </span>
                    <span>
                        {
                            dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN &&
                            <NumberFormat 
                                value={ dataProfile.Doctor_Infor.priceIdData.valueEn  }
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' $'}
                            />
                        }
                    </span>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
