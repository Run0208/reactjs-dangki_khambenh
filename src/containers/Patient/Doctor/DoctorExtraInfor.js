import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import { getExtraInforDoctor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';


import './DoctorExtraInfor.scss';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowInfor: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {
        if(this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctor(this.props.doctorIdFromParent);
            if(res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

     async componentDidUpdate(prevProps, prevState) {
        let { language } = this.props;
        if(language !== prevProps.language) {

        }

        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctor(this.props.doctorIdFromParent);
            if(res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    showInfor = (status) => {
        this.setState({
            isShowInfor: status 
        })
    }
    
    render() {
        let { language } = this.props;
        let  { isShowInfor, extraInfor } = this.state;
        return (
            <div className="doctor-extra-infor">
                <div className="infor-clinic">
                    <h3 className="infor-clinic-title">
                        <FormattedMessage id="patient.extra-infor-doctor.examination-address" />
                    </h3>
                    <div className="infor-clinic-name">
                        { 
                            extraInfor && extraInfor.nameClinic ?
                            extraInfor.nameClinic : ''
                        }
                    </div>
                    <span className="infor-clinic-address">
                        { 
                            extraInfor && extraInfor.addressClinic ?
                            extraInfor.addressClinic : ''
                        }
                    </span>
                </div>
                {
                    isShowInfor === false ? 
                    <div className="infor-price">
                        <h3 className="infor-price-title">
                            <FormattedMessage id="patient.extra-infor-doctor.examination-price" />  
                            <span>
                                { 
                                    extraInfor && extraInfor.priceIdData && 
                                    language === LANGUAGES.VI &&
                                    <NumberFormat 
                                        value={ extraInfor.priceIdData.valueVi }
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' VND'}
                                    />
                                }
                                { 
                                    extraInfor && extraInfor.priceIdData && 
                                    language === LANGUAGES.EN &&
                                    <NumberFormat 
                                        value={ extraInfor.priceIdData.valueEn }
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' $'}
                                    />
                                }
                            </span>
                        </h3>
                        <div 
                            className="infor-price-show"
                            onClick={() => this.showInfor(true)}
                        >
                            <FormattedMessage id="patient.extra-infor-doctor.see-details" />  
                        </div>
                    </div> : 
                    <div className="infor-price">
                        <h3 className="infor-price-title"><FormattedMessage id="patient.extra-infor-doctor.examination-price" />  </h3>
                        <div className="infor-price-list">
                            <div className="item">
                                <div className="item-title"><FormattedMessage id="patient.extra-infor-doctor.examination-price" />  </div>
                                <div className="item-price">
                                    { 
                                        extraInfor && extraInfor.priceIdData && 
                                        language === LANGUAGES.VI &&
                                        <NumberFormat 
                                            value={ extraInfor.priceIdData.valueVi }
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' VND'}
                                        />
                                    }
                                    { 
                                        extraInfor && extraInfor.priceIdData && 
                                        language === LANGUAGES.EN &&
                                        <NumberFormat 
                                            value={ extraInfor.priceIdData.valueEn }
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' $'}
                                        />
                                    }
                                </div>
                            </div>
                            <span>
                                { 
                                    extraInfor && extraInfor.note ?
                                    extraInfor.note : ''
                                }
                            </span>
                        </div>
                        <div className="payment-methods">
                            <span>
                                <FormattedMessage id="patient.extra-infor-doctor.payment" /> 
                                { 
                                    extraInfor && extraInfor.paymentIdData && language === LANGUAGES.VI ?
                                    extraInfor.paymentIdData.valueVi : ''
                                }
                                { 
                                    extraInfor && extraInfor.paymentIdData && language === LANGUAGES.EN ?
                                    extraInfor.paymentIdData.valueEn : ''
                                }
                            </span>
                        </div>
                        <div 
                            className="infor-price-hidden"
                            onClick={() => this.showInfor(false)}
                        >
                            <FormattedMessage id="patient.extra-infor-doctor.hidden" />  
                        </div>
                        
                    </div>
                }
                

                
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
