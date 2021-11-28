import React, { Component } from 'react';

import './StatusCard.scss'

class StatusCard extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div className='status-card'>
                <div className="item-infor">
                    <div className="item-infor__icon">
                        <i className={this.props.icon}></i>
                    </div>
                    <div className="item-infor__name">
                        <h4>{this.props.name}</h4>
                    </div>
                </div>
                <div className="item-count"><span>{this.props.count}</span></div>
            </div>
        )
    }
}

export default StatusCard