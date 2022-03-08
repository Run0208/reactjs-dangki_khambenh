import React, { Component } from 'react';
import { connect } from "react-redux";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState) {

    }

    handleOnChangeDoctor = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        this.setState({
            [name] : value
        })
    }

    handleSearchDoctor = () => {
        this.props.handleSearchDoctor(this.state.keyword)
    }
    
    render() {
        let { keyword } = this.state;
        return (
            <div className="search-doctor">
                <input 
                    name="keyword"
                    type="text"
                    className="input-search"
                    placeholder="Nhập tên bác sĩ..."
                    value={keyword}
                    onChange={(event) => this.handleOnChangeDoctor(event) }
                />
                <span className="input-gr-btn">
                    <button 
                        className="btn-search" 
                        type="button"
                        onClick={ this.handleSearchDoctor }
                    >
                        <span className="fa fa-search"></span>
                         Search
                    </button>
                </span>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
