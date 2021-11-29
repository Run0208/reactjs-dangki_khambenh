import React, { Component } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';

import '../HomePage.scss';

class Doctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }
    
    handleViewDetailDoctor = (doctor) => {
        if(this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }

    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props;
        return (
           <section className="section-container section-doctor">
               <div className="section-content">
                    <div className="section-header">
                        <h2>
                            <FormattedMessage id="home-page.outstanding-doctor" />
                        </h2>
                    </div>
                    <Slider {...this.props.settings} className="doctor-list">
                        {
                            arrDoctors && arrDoctors.length > 0 
                            && arrDoctors.map((item, index) => {
                                let imageBase64 = '';
                                if(item.image) {
                                    imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                return (
                                    <div 
                                        className="section-item section-item-doctor" 
                                        key={index}
                                        onClick={() => this.handleViewDetailDoctor(item)}
                                    >
                                        <div 
                                            className="section-image doctor-image"
                                            style={{backgroundImage: `url(${imageBase64})`}}
                                        ></div>
                                        <div className="section-title">
                                            <span>{language === LANGUAGES.VI ? nameVi : nameEn}</span>
                                            <span>Xương khớp</span>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </Slider>
               </div>
           </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.admin.topDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),


    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
