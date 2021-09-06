import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils'

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllCodeService('gender');
            if(res && res.errCode === 0) {
                this.setState({
                    genderArr: res.data
                })
            }
        }
        catch(e) {
            console.log(e);
        }
    }


    render() {
        let genders = this.state.genderArr
        let language = this.props.language;
        return (
            <section className="section-user">
                <div className="section-user-title">
                    Create User 
                </div>
                <div className="section-user-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2>
                                    <FormattedMessage id="manage-user.add" />
                                </h2>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input type="text" className="form-control" placeholder="Email" />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input type="password" className="form-control" placeholder="Passworl" />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.first-name" />
                                </label>
                                <input type="text" className="form-control" placeholder="First Name" />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.last-name" />
                                </label>
                                <input type="text" className="form-control" placeholder="Last Name" />
                            </div>
                            <div className="col-9">
                                <label>
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input type="text" className="form-control" placeholder="Address" />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.phone-number" />
                                </label>
                                <input type="Number" className="form-control" placeholder="Address" />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select className="form-control">
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select className="form-control">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <input type="text" className="form-control" placeholder="Role id" />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <input className="form-control" placeholder="Image" />
                            </div>
                            <div className="col-12 ">
                                <button className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
