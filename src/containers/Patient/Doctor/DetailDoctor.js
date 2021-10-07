import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
import HomeHeader from '../../HomePage/HomeHeader';
import Comment from '../SocialPlugin/Comment';
import LikeAndShare from '../SocialPlugin/LikeAndShare'
import { getDetailInforDoctor } from '../../../services/userService';

import './DetailDoctor.scss';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            this.setState({
                currentDoctorId: id
            })

            let res = await getDetailInforDoctor(id);
            if(res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        
    }
    
    render() {
        let { language } = this.props;
        let nameVi = '', nameEn = '';
        let { detailDoctor } = this.state;

        if(detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }

        let currentURL = +process.env.REACT_APP_IS_LOCALHOST === 1 ?
            "https://developers.facebook.com/docs/plugins/" : window.location.href;

        return (
            <>
                <HomeHeader isShowBanner={false}/>

                <div className="container-doctor">
                    <section className="intro-doctor">
                        <div className="intro-doctor-image"
                            style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}
                        ></div>
                        <div className="intro-doctor-content">
                            <div className="doctor-title">
                                <h2>
                                    { language === LANGUAGES.VI ? nameVi : nameEn }
                                </h2>
                            </div>

                            <div className="doctor-intro">
                                {
                                    detailDoctor &&
                                    detailDoctor.Markdown && 
                                    detailDoctor.Markdown.description && 
                                    <span>
                                        { detailDoctor.Markdown.description }
                                    </span>
                                }
                            </div>

                            <div className="facebook">
                                <LikeAndShare
                                    dataHref={currentURL} 
                                />
                            </div>
                        </div>
                    </section>
                    <section className="schedule-doctor">
                        <div className="schedule-doctor-left">
                            <DoctorSchedule 
                                doctorIdFromParent={ this.state.currentDoctorId }
                            />
                        </div>
                        <div className="schedule-doctor-right">
                            <DoctorExtraInfor 
                                doctorIdFromParent={ this.state.currentDoctorId }
                            />
                        </div>
                    </section>
                    <section className="infor-doctor">
                        {
                            detailDoctor && 
                            detailDoctor.Markdown && 
                            detailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHTML}}></div>
                        }
                    </section>
                    <section className="comment-doctor">
                        <Comment 
                            dataHref={currentURL}
                            width={"100%"}
                        />
                    </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
