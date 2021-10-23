import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
 
import './TableManageClinic.scss';

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinicArray: [],
        }
    }

    componentDidMount() {
        this.props.fetchClinic();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data !== this.props.data) {
            this.setState({
                clinicArray: this.props.data
            })
        }
    }

    handleDeleteClinic = (clinic) => {
        this.props.deleteClinic(clinic.id);
    }

    handleEditClinic = (clinic) => {
        this.props.handleEditClinic(clinic);
    }

    render() {
        let listClinic = this.state.clinicArray; 
        
        return (
                <div className="user-container">
                    <h1 className="title-user">TABLE SPECIALTY</h1>
                    <div className="users-table">
                        <table id="customers">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Options</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    listClinic && listClinic.length > 0 && 
                                    listClinic.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <button 
                                                        className="btn-edit"
                                                        onClick={() => this.handleEditClinic(item)}
                                                    >
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button 
                                                        className="btn-delete"
                                                        onClick={() => this.handleDeleteClinic(item)}
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
        fetchClinic: () => dispatch(actions.fetchAllClinicStart()),
        deleteClinic: (id) => dispatch(actions.deleteClinic(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
