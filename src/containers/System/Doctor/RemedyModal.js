import React, { Component } from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';
import { Modal } from 'reactstrap';
// import { toast } from 'react-toastify';
import { CommonUtils } from '../../../utils';

import './RemedyModal.scss';


class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: '',
            diagnose: ''
        }
    }

    async componentDidMount() {
        if(this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if(prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
        
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnChangeDiagnose = (event) => {
      this.setState({
        diagnose: event.target.value
      })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64  = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }
    
  render() {
    let { isOpenModal, closeRemedyModal } = this.props;
    return (
      <Modal 
          isOpen={isOpenModal}
          size="md"
          centered
          className={'remedy-modal'}
      >
        <div className="modal-header">
          <h3 className="modal-header-title">Gửi hóa đơn</h3>
          <span className="modal-header-btn" onClick={closeRemedyModal}>x</span>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-6 form-group">
              <span>Email Patient</span>
              <input type="email" className="form-control" 
                value={this.state.email}
                onChange={(event) => this.handleOnChangeEmail(event)}
              />
            </div>
            <div className="col-6 form-group">
              <span>Chèn file hóa đơn</span>
              <input type="file" className="form-control-file" 
                onChange={(event) => this.handleOnChangeImage(event)}
                />
            </div>
          </div>
          <div className="row">
            <div className="col-12 form-group">
              <span>Diagnosis for the patient</span>
              <input type="text" className="form-control" 
                value={this.state.diagnose}
                onChange={(event) => this.handleOnChangeDiagnose(event)}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-send" onClick={() => this.handleSendRemedy()}>Send</button>
          <button className="btn-cancel" onClick={closeRemedyModal} >Cancel</button>
        </div>
      </Modal> 
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
