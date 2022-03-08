import React, { Component } from "react";
import { connect } from "react-redux";
// import { FormattedMessage } from 'react-intl';

import "../HomePage.scss";

class About extends Component {
    render() {
        return (
           <section className="section-about">
               <div className='container'>
               <h2 className="section-about-title">VTV 24</h2>
               <div className="section-about-item">
                   <div className="section-about-item-video">
                    <iframe 
                        src="https://www.youtube.com/embed/x9WQdYJRDhI" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                   </div>
                   <div className="section-about-item-info">
                        <p>
                        Mỗi người dân hãy là một chiến sĩ trong công cuộc chống dịch, Việt Nam sẽ chiến thắng đại dịch.
                       
                        </p>
                   </div>
               </div>
               </div>
           </section>
        );
    }
      return (
        <section className="section-about">
            <div className='container'>
            <h2 className="section-about-title">VTV 24</h2>
            <div className="section-about-item">
                <div className="section-about-item-video">
                 <iframe 
                     src="https://www.youtube.com/embed/x9WQdYJRDhI" 
                     title="YouTube video player" 
                     frameBorder="0" 
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                     allowFullScreen
                 ></iframe>
                </div>
                <div className="section-about-item-info">
                     <p>
                     Mỗi người dân hãy là một chiến sĩ trong công cuộc chống dịch, Việt Nam sẽ chiến thắng đại dịch.
                    
                     </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
