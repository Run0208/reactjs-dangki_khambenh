import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

import '../HomePage.scss';

class Specialty extends Component {
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
    
    

    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props;
        return (
           <section className="section-container section-doctor">
               <div className="section-content">
                    <div className="section-header">
                        <h2>Outstanding Doctor</h2>
                        <button>Tìm kiếm</button>
                    </div>
                    <div className="section-list">
                        <Slider {...this.props.settings}>
                            {
                                arrDoctors && arrDoctors.length > 0 
                                && arrDoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if(item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                    return (
                                        <div className="section-item section-item-doctor" key={index}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
