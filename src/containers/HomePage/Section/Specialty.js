import React, { Component } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { getAllSpecialty } from '../../../services/userService';


import '../HomePage.scss';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if(res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (item) => {
        if(this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }
    

    render() {
        let { dataSpecialty } = this.state;
        return (
           <section className="section-container section-specialty">
               <div className="section-content">
                    <div className="section-header">
                        <h2>
                            <FormattedMessage id="home-page.specialty-popular" />
                        </h2>
                    </div>
                    <Slider {...this.props.settings} className="section-list">
                        {
                            dataSpecialty && dataSpecialty.length > 0 &&
                            dataSpecialty.map((item, index) => {
                                return (
                                    <div 
                                        className="section-item section-item-specialty" 
                                        key={index}
                                        onClick={() => this.handleViewDetailSpecialty(item)}
                                    >
                                        <div 
                                            className="section-image specialty-image"
                                            style={{backgroundImage: `url(${item.image})`}}
                                        ></div>
                                        <span>{item.name}</span>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
