import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


import '../HomePage.scss';

class CopyRight extends Component {
    render() {
        return (
           <section className="section-copyright">
               <p>&copy; 2021 <a href="https://www.facebook.com/tobi0208/" target="_blank">DuongDangDuc</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(CopyRight);
