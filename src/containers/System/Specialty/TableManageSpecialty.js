import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
 
import './TableManageSpecialty.scss';

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialtyArray: [],
        }
    }

    componentDidMount() {
        this.props.fetchSpecialty();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data !== this.props.data) {
            this.setState({
                specialtyArray: this.props.data
            })
        }
    }

    handleDeleteSpecialty = (specialty) => {
        this.props.deleteSpecialty(specialty.id);
    }

    handleEditSpecialty = (specialty) => {
        this.props.handleEditSpecialty(specialty);
    }

    render() {
        let listSpecialty = this.state.specialtyArray; 
        
        return (
                <div className="user-container">
                    <h1 className="title-user">TABLE SPECIALTY</h1>
                    <div className="users-table">
                        <table id="customers">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Name</th>
                                    <th>Options</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    listSpecialty && listSpecialty.length > 0 && 
                                    listSpecialty.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <button 
                                                        className="btn-edit"
                                                        onClick={() => this.handleEditSpecialty(item)}
                                                    >
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button 
                                                        className="btn-delete"
                                                        onClick={() => this.handleDeleteSpecialty(item)}
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.admin.data,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSpecialty: () => dispatch(actions.fetchAllSpecialtyStart()),
        deleteSpecialty: (id) => dispatch(actions.deleteSpecialty(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
