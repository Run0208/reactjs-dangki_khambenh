import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import footerLogo from "../../../assets/MetroMed-removebg-preview.png";

// import {fb,ita,git,gitlab} from "../../../assets/iconFooter"
import '../HomePage.scss';

class Footer extends Component {
    render() {
        return (
           <section className="section-footer">
               <div className='container'>
                   <div className='footer-content'>
               <div className='footer-infor'>
                <img src={footerLogo}/>
                <p>Chúng tôi luôn luôn nỗ lực đổi mới để tạo nên sự khác biệt</p>
                {/* <a>{fb}</a> */}
               </div>
               <div className='quickLink'>
                   <h4>Chứng Chỉ</h4>
                   <p>FAQ</p>
                   <p>Terms & Conditions</p>
                   <p>Privacy Policy</p>
                   <p>Contact</p>
               </div>
               <div className='footer-timeOpen'>
                   <h4>Thời gian mở cửa </h4>
                   <div className='timeOpen-content'>
                   <div className='timeOpen-Week space'>
                      
                       <p>Thứ 2 - 3</p>
                       <p>Thứ 3 - 4</p>
                       <p>Thứ 4 - 5</p>
                       <p>Thứ 5 - 6</p>
                       <p>Thứ 6 - 7</p>
                   </div>
                   <div className='timeOpen-Hour space'>
                   
                       <p>8h30 - 18h30</p>
                       <p>8h30 - 18h30</p>
                       <p>8h30 - 18h30</p>
                       <p>8h30 - 18h30</p>
                       <p>8h30 - 18h30</p>
                   </div>
                   </div>
               </div>
               <div className='contact'>
                   <h4>Liên Hệ</h4>
              <p>Địa chỉ : 03 Quang Trung, Hải Châu, Đà Nãng, 5000</p>
              <p>SĐT : 19001009</p>
              <p>Mail : Hospital123@gmail.com</p>
               </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
