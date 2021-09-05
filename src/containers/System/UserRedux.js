import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <section className="section-user">
                <div className="section-user-title">
                    User 
                </div>
                <div className="section-user-content">
                    <button>Create User</button>
                </div>
            </section>

        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
