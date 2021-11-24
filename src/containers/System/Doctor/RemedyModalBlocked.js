import React, { Component } from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';
import { Modal } from 'reactstrap';
// import { toast } from 'react-toastify';
import { CommonUtils } from '../../../utils';

import './RemedyModalBlock.scss';


class RemedyModalBlocked extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
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

    handleBlocked = () => {
        this.props.sendBlockedNotification(this.state)
    }
    
    render() {
        let { isOpenModalBlocked, closeRemedyModal } = this.props;
        return (
            <Modal 
                isOpen={isOpenModalBlocked}
                size="md"
                centered
                className={'remedy-modal'}
            >
                <div className="modal-header">
                    <h3 className="modal-header-title">Put in blacklist</h3>
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
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-block" onClick={() => this.handleBlocked()}>Block</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModalBlocked);
