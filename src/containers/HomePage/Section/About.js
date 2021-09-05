import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


import '../HomePage.scss';

class About extends Component {
    render() {
        return (
           <section className="section-about">
               <h2 className="section-about-title">VTV 24</h2>
               <div className="section-about-item">
                   <div className="section-about-item-video">
                    <iframe 
                        src="https://www.youtube.com/embed/HgpCEFNEyLk" 
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                    ></iframe>
                   </div>
                   <div className="section-about-item-info">
                        <p>
                            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
