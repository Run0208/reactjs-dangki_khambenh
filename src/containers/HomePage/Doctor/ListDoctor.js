import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import HomeHeader from '../HomeHeader';
import CopyRight from '../Section/CopyRight';

import './ListDoctor.scss';

class ListDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            listDoctors: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.allDoctors !== this.props.allDoctors) {
            this.setState({
                listDoctors: this.props.allDoctors
            })
        }
    }
    
    handleViewDetailDoctor = (doctor) => {
        if(this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }

    render() {
        let listDoctors = this.state.listDoctors;

        console.log(listDoctors);
        let { language } = this.props;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <section className="doctor">
                    <h2 className="title">
                            Danh sách bác sĩ
                    </h2>
                    <div className="list-doctor">
                        {
                            listDoctors && listDoctors.length > 0 
                            && listDoctors.map((item, index) => {
                                let imageBase64 = '';
                                if(item.image) {
                                    imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.lastName} ${item.firstName}`;
                                let nameEn = `${item.firstName} ${item.lastName}`;
                                return (
                                    <div 
                                        className="doctor-item" 
                                        key={index}
                                        
                                    >
                                        <div 
                                            className="doctor-item-image"
                                            style={{backgroundImage: `url(${imageBase64})`}}
                                        ></div>

                                        <div className="doctor-item-infor">
                                            <div className="name">
                                                <span>Doctor: </span>
                                                {language === LANGUAGES.VI ? nameVi : nameEn}
                                            </div>
                                            <div>
                                                <span>Email: </span>
                                                {item.email}
                                            </div>
                                            <div>
                                                <span>Phone number: </span>
                                                {item.phoneNumber}
                                            </div>
                                            <div>
                                                <span>Address: </span>
                                                {item.address}
                                            </div>
                                            <div
                                            className="view"
                                                onClick={() => this.handleViewDetailDoctor(item)}
                                            >
                                                Xem thêm 
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </section>
                <CopyRight />
            </>
          
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),


    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListDoctor));
