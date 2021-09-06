import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

import '../HomePage.scss';

class Specialty extends Component {
    render() {
        return (
           <section className="section-container section-doctor">
               <div className="section-content">
                    <div className="section-header">
                        <h2>Outstanding Doctor</h2>
                        <button>Tìm kiếm</button>
                    </div>
                    <div className="section-list">
                        <Slider {...this.props.settings}>
                            <div className="section-item section-item-doctor">
                                <div className="section-image doctor-image"></div>
                                <div className="section-title">
                                    <span>Giáo sự tiến sĩ</span>
                                    <span>Xương khớp</span>
                                </div>
                            </div>
                            <div className="section-item section-item-doctor">
                                <div className="section-image doctor-image"></div>
                                <div className="section-title">
                                    <span>Giáo sự tiến sĩ</span>
                                    <span>Xương khớp</span>
                                </div>
                            </div>
                            <div className="section-item section-item-doctor">
                                <div className="section-image doctor-image"></div>
                                <div className="section-title">
                                    <span>Giáo sự tiến sĩ</span>
                                    <span>Xương khớp</span>
                                </div>
                            </div>
                            <div className="section-item section-item-doctor">
                                <div className="section-image doctor-image"></div>
                                <div className="section-title">
                                    <span>Giáo sự tiến sĩ</span>
                                    <span>Xương khớp</span>
                                </div>
                            </div>
                            <div className="section-item section-item-doctor">
                                <div className="section-image doctor-image"></div>
                                <div className="section-title">
                                    <span>Giáo sự tiến sĩ</span>
                                    <span>Xương khớp</span>
                                </div>
                            </div>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
