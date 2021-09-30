import React, { Component } from 'react';
import MarkdownIt from 'markdown-it';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import { LANGUAGES, CommonUtils } from '../../../utils';
import { createNewClinic } from '../../../services/userService';

import './ManageClinic.scss';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    async componentDidMount() {

    }

     async componentDidUpdate(prevProps, prevState) {
        let { language } = this.props;
        if(this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = {...this.state}
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64  = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            })
        }
    }

    handleSaveClinic = async () => {
        let res = await createNewClinic(this.state);
        if(res && res.errCode === 0) {
            toast.success('Create new Clinic success !');
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        } else{
            toast.error('Create new Clinic failed !');
        }
    }
    
    render() {
        return (
            <div className="manage-specialty">
                <h2 className="title">
                    Quản lý phòng khám
                </h2>

                <div className="specialty-list row">
                    <div className="col-5 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            value={this.state.address} 
                            onChange={(event) => this.handleOnChangeInput(event, 'address')}    
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Tên phòng khám</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            value={this.state.name} 
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}    
                        />
                    </div>
                    <div className="col-3 form-group">
                        <label>Ảnh phòng khám</label>
                        <input 
                            className="form-control-file" 
                            type="file" 
                            onChange={(event) => this.handleOnChangeImage(event)}
                        />
                    </div>
                    <div className="col-12">
                        <MdEditor 
                            style={{ height: '500px' }} 
                            onChange={ this.handleEditorChange} 
                            value={ this.state.descriptionMarkdown }
                            renderHTML={text => mdParser.render(text)} 
                        />
                    </div>
                    <div className="col-12">
                        <button 
                            className="btn-add-specialty"
                            onClick={() => this.handleSaveClinic()}
                        >
                            Lưu thông tin
                        </button>
                    </div>

                    
                </div>

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
