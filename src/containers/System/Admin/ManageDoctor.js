import React, { Component } from 'react';
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import { connect } from 'react-redux';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import MdEditor from 'react-markdown-editor-lite';
import * as actions from '../../../store/actions';
import { getDetailInforDoctor } from '../../../services/userService';

import './ManageDoctor.scss';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: '',
            hasOldData: false,
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if(prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveMarkdown = () => {
        let { hasOldData } = this.state;

        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description	: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });

        let res = await getDetailInforDoctor(selectedOption.value);
        if(res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description	: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description	: '',
                hasOldData: false,
            })
        }
    }

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    buildDataInputSelect = (data) => {
        let result = [];
        let { language } = this.props;
        if(data && data.length > 0) {
            data.map((item, index) =>{
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName} `
                object.label = language === LANGUAGES.VI ? `${labelVi}` : `${labelEn}`
                object.value = item.id;
                result.push(object);
            });

        }
        return result;
    }

    render() {
        let  { hasOldData } = this.state;
        return (
            <div className="manage-doctor">
                <h1 className="manage-doctor-title">
                    Update info doctor
                </h1>
                <div className="manage-doctor-more-info">
                    <div className="more-info-left">
                        <label>Chọn bác sĩ</label>
                        <Select
                            className="more-info-left-select"
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className="more-info-right form-group">
                        <label>Thông tin giới thiệu</label>
                        <textarea 
                            className="form-control" 
                            rows="4" 
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        />
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor 
                        style={{ height: '500px' }} 
                        onChange={ this.handleEditorChange} 
                        value={ this.state.contentMarkdown }
                        renderHTML={text => mdParser.render(text)} 
                    />
                </div>
                <button 
                    className={ hasOldData === true ? "save-doctor" : "create-doctor" }
                    onClick={() => this.handleSaveMarkdown()}
                >
                    { hasOldData === true ? <span>Sửa thông tin</span> : <span>Lưu thông tin</span> }
                </button>
            </div>            
        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
