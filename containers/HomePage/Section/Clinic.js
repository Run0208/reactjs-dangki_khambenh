import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { getAllClinic } from "../../../services/userService";

import "../HomePage.scss";

class Clinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
        };
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : [],
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {}

    handleviewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`);
        }
    };

    render() {
        let { dataClinic } = this.state;
        return (
            <section className="section-container section-facility">
                <div className="container">
                    <div className="section-content">
                        <div className="section-header">
                            <h2>
                                <FormattedMessage id="home-page.clinic" />
                            </h2>
                        </div>
                        <div className="section-list">
                            <Slider {...this.props.settings}>
                                {dataClinic &&
                                    dataClinic.length > 0 &&
                                    dataClinic.map((item, index) => {
                                        return (
                                            <div
                                                className="section-item section-item-facility"
                                                key={index}
                                                onClick={() =>
                                                    this.handleviewDetailClinic(
                                                        item
                                                    )
                                                }
                                            >
                                                <div
                                                    className="section-image facility-image"
                                                    style={{
                                                        backgroundImage: `url(${item.image})`,
                                                    }}
                                                ></div>
                                                <span className="clinic_name">
                                                    {item.name}
                                                </span>
                                            </div>
                                        );
                                    })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Clinic));
