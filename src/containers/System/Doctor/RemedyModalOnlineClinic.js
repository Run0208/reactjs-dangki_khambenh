import React, { Component } from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';
import { Modal } from 'reactstrap';
// import { toast } from 'react-toastify';
import { CommonUtils } from '../../../utils';

import './RemedyModalOnlineClinic.scss';


class RemedyModalOnlineClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            linkRoom: ''
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
    handleOnChangeLinkOnlineClinic = (event) => {
        this.setState({
            linkRoom: event.target.value
        })        
    }

    handleSendRemedyOnlineClinic = () => {
        this.props.sendRemedyOnlineClinic(this.state)
    }
    
    render() {
        let { isOpenModalOnlineClinic, closeRemedyModal } = this.props;
        return (
            <Modal 
                isOpen={isOpenModalOnlineClinic}
                size="md"
                centered
                className={'remedy-modal'}
            >
                <div className="modal-header">
                    <h3 className="modal-header-title">Send link online clinic room</h3>
                    <span className="modal-header-btn" onClick={closeRemedyModal}>x</span>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-12 form-group">
                            <span>Email Patient</span>
                            <input type="email" className="form-control" 
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)}
                            />
                        </div>
                        <div className="col-12 form-group">
                            <span>Link Online clinic</span>
                            <input type="text" className="form-control" 
                                value={this.state.linkRoom}
                                onChange={(event) => this.handleOnChangeLinkOnlineClinic(event)}
                            />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-send" onClick={() => this.handleSendRemedyOnlineClinic()}>Send</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModalOnlineClinic);
