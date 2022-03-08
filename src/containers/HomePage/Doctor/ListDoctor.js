import React, { Component } from 'react';
import Pagination from './Pagination';
import Search from './Search';
import { connect } from 'react-redux';
import HomeHeader from '../HomeHeader';
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../../utils';
import CopyRight from '../Section/CopyRight';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';

import './ListDoctor.scss';

class ListDoctor extends Component {
  constructor(props){
    super(props);
    this.state = {
      listDoctors: [],
      keyword: '',            
    }
  }

  componentDidMount() {
    this.props.fetchAllDoctor();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.allDoctors !== this.props.allDoctors) {
      this.setState({
        listDoctors: this.props.allDoctors,
      })
    }
  }
    
  handleViewDetailDoctor = (doctor) => {
    if(this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
  }

  handleSearchDoctor = (keyword) => {
    this.setState({
      keyword: keyword
    })
  }

  render() {
    let { language } = this.props;
    let { listDoctors, keyword } = this.state;

    listDoctors = listDoctors.filter((doctor) => {
      if(keyword === '') {
        return listDoctors;
      } else if(doctor.firstName.toLowerCase().includes(keyword.toLowerCase()) || doctor.lastName.toLowerCase().includes(keyword.toLowerCase())) {
        return listDoctors;
      }
    })

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <section className="doctor">
          <Search 
            className="search"
            keyword={keyword}
            handleSearchDoctor={this.handleSearchDoctor}
          />
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
                  >
                  </div>
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
            {listDoctors.length <= 0 ? 'Không tìm thấy tên bác sĩ...' : ''}
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
