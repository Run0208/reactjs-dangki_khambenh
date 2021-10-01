import React, { Component } from 'react';
import MarkdownIt from 'markdown-it';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import { LANGUAGES, CommonUtils } from '../../../utils';
import { createNewSpecialty } from '../../../services/userService';

import './ManageSpecialty.scss';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
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

    handleSaveSpecialty = async () => {
        let res = await createNewSpecialty(this.state);
        if(res && res.errCode === 0) {
            toast.success('Create new Specialty success !');
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        } else{
            toast.error('Create new Specialty failed !');
        }
    }
    
    render() {
        return (
            <div className="manage-specialty">
                <h2 className="title">
                    Quản lý Chuyên khoa
                </h2>

                <div className="specialty-list row">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            value={this.state.name} 
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}    
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh chuyên khoa</label>
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
                            onClick={() => this.handleSaveSpecialty()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);