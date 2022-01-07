import React, {useState} from 'react'
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';

const Pagination = (props) => {
  const initDataShow = props.limit && props.listDoctors ? props.listDoctors.slice(0, Number(props.limit)) : props.listDoctors;
  const [dataShow, setDataShow] = useState(initDataShow);
  
  console.log(props);
  let pages = 1
  let range = []
  
  if (props.limit !== undefined) {
      let page = Math.floor(props.listDoctors.length / Number(props.limit))
      pages = props.listDoctors.length % Number(props.limit) === 0 ? page : page + 1
      range = [...Array(pages).keys()]
  }
    
  const [currPage, setCurrPage] = useState(0)
  
  const selectPage = (page) => {
    const start = Number(props.limit) * page
    const end = start + Number(props.limit)
    
    setDataShow(props.listDoctors.slice(start, end))
    
    setCurrPage(page)
  }
  
  return (
    <div className="list-doctor">
      {
        props.listDoctors && props.listDoctors.length > 0 
        && dataShow.map((item, index) => {
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
                  {props.language === LANGUAGES.VI ? nameVi : nameEn}
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
                  onClick={() => props.handleViewDetailDoctor(item)}
                >
                  Xem thêm 
                </div>
              </div>
            </div>
          );
        })
      }
          {
              pages > 1 ? (
                  <div className="table__pagination">
                      {
                          range.map((item, index) => (
                              <div key={index} className={`table__pagination-item ${currPage === index ? 'active' : ''}`} onClick={() => selectPage(index)}>
                                  {item + 1}
                              </div>
                          ))
                      }
                  </div>
              ) : null
          }
      </div>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
