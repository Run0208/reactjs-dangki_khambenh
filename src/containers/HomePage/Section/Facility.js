import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

import '../HomePage.scss';

class Facility extends Component {
    render() {
        return (
           <section className="section-container section-facility">
               <div className="section-content">
                    <div className="section-header">
                        <h2>Facility</h2>
                        <button>Tìm kiếm</button>
                    </div>
                    <div    className="section-list">
                        <Slider {...this.props.settings}>
                            <div className="section-item section-item-facility">
                                <div className="section-image facility-image "></div>
                                <span>Cơ xương khớp</span>
                            </div>
                            <div className="section-item section-item-facility">
                                <div className="section-image facility-image"></div>
                                <span>Thần kinh</span>
                            </div>
                            <div className="section-item section-item-facility">
                                <div className="section-image facility-image"></div>
                                <span>Tiêu hóa</span>
                            </div>
                            <div className="section-item section-item-facility">
                                <div className="section-image facility-image"></div>
                                <span>Tim mạch</span>
                            </div>
                            <div className="section-item section-item-facility">
                                <div className="section-image facility-image"></div>
                                <span>Tai mũi họng</span>
                            </div>
                            <div className="section-item section-item-facility">
                                <div className="section-image facility-image"></div>
                                <span>Cốt sống</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Facility);
