import React, { Component } from 'react';
import MarkdownIt from 'markdown-it';
import { connect } from "react-redux";
import { CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { CRUD_ACTIONS } from '../../../utils';
import * as actions from '../../../store/actions';
import MdEditor from 'react-markdown-editor-lite';
import TableManageSpecialty from './TableManageSpecialty';

import './ManageSpecialty.scss';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            action: ''
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState) {
        let { language } = this.props;
        if(language !== prevProps.language) {}

        if(prevProps.data !== this.props.data) {
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                action: CRUD_ACTIONS.CREATE,
            })
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
        let { action } = this.state;

        if(action === CRUD_ACTIONS.CREATE) {
            let res = await this.props.createNewSpecialty(this.state);
            if(res && res.errCode === 0) {
                this.setState({
                    name: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                })
            }
        }

        if(action === CRUD_ACTIONS.EDIT) {
            let res = await this.props.editSpecialty({
                id: this.state.id,
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            });
            if(res && res.errCode === 0) {
                this.setState({
                    id: '',
                    name: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                })
            }
        }
    }

    handleEditSpecialty = (specialty) => {
        let imageBase64 = '';
        if(specialty.image) {
            imageBase64 = Buffer.from(specialty.image, 'base64').toString('binary');
        }

        this.setState({
            id: specialty.id,
            name: specialty.name,
            image: specialty.imageBase64,
            descriptionHTML: specialty.descriptionHTML,
            descriptionMarkdown: specialty.descriptionMarkdown,
            action: CRUD_ACTIONS.EDIT
        })
    }
    
    render() {
        let { name, descriptionMarkdown } = this.state;
        return (
            <div className="manage-specialty">
                <h2 className="title">
                    <FormattedMessage id="admin.manage-specialty.specialty-title" />
                </h2>

                <div className="specialty-list row">
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-specialty.specialty-name" />
                        </label>
                        <input 
                            className="form-control" 
                            type="text" 
                            value={name} 
                            placeholder="Specialty Name..."
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}    
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-specialty.specialty-image" />
                        </label>
                        <input 
                            className="form-control-file" 
                            type="file" 
                            onChange={(event) => this.handleOnChangeImage(event)}
                        />
                    </div>
                    <div className="col-12">
                        <MdEditor 
                            style={{ height: '300px' }} 
                            onChange={(event) => this.handleEditorChange(event)} 
                            value={ descriptionMarkdown }
                            renderHTML={text => mdParser.render(text)} 
                        />
                    </div>
                    <div className="col-12">
                        <button 
                            className={this.state.action === CRUD_ACTIONS.EDIT ? "btn-edit-specialty" : "btn-add-specialty"}
                            onClick={() => this.handleSaveSpecialty()}
                        >
                            {
                                this.state.action === CRUD_ACTIONS.EDIT ?
                                <FormattedMessage id="admin.manage-specialty.edit" /> 
                                :
                                <FormattedMessage id="admin.manage-specialty.save" />
                            }
                        </button>
                    </div>
                </div>

                <TableManageSpecialty 
                    handleEditSpecialty={this.handleEditSpecialty}
                    action={this.state.action}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       language: state.app.language,
       data: state.admin.data,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewSpecialty: (data) => dispatch(actions.fetchCreateNewSpecialty(data)),
        editSpecialty: (data) => dispatch(actions.editSpecialty(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
