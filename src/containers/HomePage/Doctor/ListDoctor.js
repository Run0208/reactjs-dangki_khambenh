import React, { Component } from 'react';
import Pagination from './Pagination';
import Search from './Search';
import { filter } from 'lodash';
import { connect } from 'react-redux';
import HomeHeader from '../HomeHeader';
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../../utils';
import CopyRight from '../Section/CopyRight';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';

import './ListDoctor.scss';

class ListDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            listDoctors: [],
            keyword: '',            
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.allDoctors !== this.props.allDoctors) {
            this.setState({
                listDoctors: this.props.allDoctors,
            })
        }
    }
    
    handleViewDetailDoctor = (doctor) => {
        if(this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }

    handleSearchDoctor = (keyword) => {
        this.setState({
            keyword: keyword
        })
    }

    render() {
        let { language } = this.props;
        let { listDoctors, keyword } = this.state;

        for (var i = 0; i < listDoctors.length; i++) {
            console.log(listDoctors[i].email);
        }

        if(keyword) {
            listDoctors = listDoctors.filter((doctor) => {
                return doctor.firstName.toLowerCase().indexOf(filter.firstName) !== -1;
            })
        }
        
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <section className="doctor">
                    <Search 
                        className="search"
                        keyword={keyword}
                        handleSearchDoctor={this.handleSearchDoctor}
                    />
                    <h2 className="title">
                            Danh sách bác sĩ
                    </h2>
                    <Pagination 
                        limit='4'
                        listDoctors={listDoctors}
                        handleViewDetailDoctor={this.handleViewDetailDoctor}
                    />
                </section>
                <CopyRight />
            </>
          
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),


    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListDoctor));
