import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import NumberFormat from 'react-number-format';
import HomeHeader from '../HomeHeader';
import CopyRight from '../Section/CopyRight';
import {XAxis, YAxis, CartesianGrid, Tooltip, Bar, ComposedChart, Legend, Line} from 'recharts';

import { getApiCovid19 } from '../../../services/userService';

import './Covid19.scss';

class Covid19 extends Component {
    constructor(props){
        super(props);
        this.state = {
            totalInternal: [],
            totalWorld: [],
            todayInternal: [],
            todayWorld: [],
            locations: [],
            chartOverview: [],

            isShowVn: true,
            isShowGl: false,
        }
    }

     async componentDidMount() {
        let res = await getApiCovid19();
        this.setState({
            totalInternal: res.total.internal,
            totalWorld: res.total.world,
            todayInternal: res.today.internal,
            todayWorld: res.today.world,
            locations: res.locations,
            chartOverview: res.overview,
        })
    }

    componentDidUpdate(prevProps, prevState) {
    
    }

    showVietNam = (status) => {
        this.setState({
            isShowVn: status,
            isShowGl: !status,
        })
    }
    
    showWorld = (status) => {
        this.setState({
            isShowGl: !status,
            isShowVn: status,
        })
    }

    render() {
        let { 
            totalInternal, 
            totalWorld, 
            todayInternal, 
            todayWorld, 
            locations,
            chartOverview,
            isShowGl, 
            isShowVn 
        } = this.state;

        let { language } = this.props;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <section className="covid-19">
                    <div className="total">
                        <div className="country">
                            <div 
                                className={isShowVn === false ? `none` : `active`}
                                onClick={() => this.showVietNam(true)}
                            >
                                <i class="fa fa-star" aria-hidden="true"></i>
                                Việt Nam
                            </div>
                            <div className="space">/</div>
                            <div
                                className={isShowGl === false ? `none` : `active`}
                                onClick={() => this.showWorld(false)}
                            >
                                <i class="fa fa-globe" aria-hidden="true"></i>
                                Thế giới
                            </div>
                        </div>
                        <>
                            {
                                isShowVn === true ? 
                                <div className="list">
                                    <div className="box cases">
                                        <div className="title">Tổng số ca mắc</div>
                                        <div className="value">
                                            <NumberFormat 
                                                value={totalInternal.cases}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                        <div className="today">
                                            Hôm nay: +
                                            <NumberFormat 
                                                value={todayInternal.cases}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="box treating">
                                        <div className="title">Đang điều trị</div>
                                        <div className="value">
                                            <NumberFormat 
                                                value={totalInternal.treating}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                        <div className="today">
                                            Hôm nay: +
                                            <NumberFormat 
                                                value={todayInternal.treating}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="box recovered">
                                        <div className="title">Đã khỏi</div>
                                        <div className="value">
                                            <NumberFormat 
                                                value={totalInternal.recovered}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                        <div className="today">
                                            Hôm nay: +
                                            <NumberFormat 
                                                value={todayInternal.recovered}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="box death">
                                        <div className="title">Tử vong</div>
                                        <div className="value">
                                            <NumberFormat 
                                                value={totalInternal.death}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                        <div className="today">
                                            Hôm nay: +
                                            <NumberFormat 
                                                value={todayInternal.death}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                : []
                            }
                        </>
                        <>
                            {
                                isShowGl === true ? 
                                <div className="list">
                                    <div className="box cases">
                                        <div className="title">Tổng số ca mắc</div>
                                        <div className="value">
                                            <NumberFormat 
                                                value={totalWorld.cases}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="box treating">
                                        <div className="title">Đang điều trị</div>
                                        <div className="value">
                                            <NumberFormat 
                                                value={totalWorld.treating}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="box recovered">
                                        <div className="title">Đã khỏi</div>
                                        <div className="value">
                                            <NumberFormat 
                                                value={totalWorld.recovered}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="box death">
                                        <div className="title">Tử vong</div>
                                        <div className="value">
                                            <NumberFormat 
                                                value={totalWorld.death}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                :
                                []
                            }
                        </>
                        
                        
                    </div>
                    <div className="content">
                        <div className="locations">
                            <div className="title">
                                Tình hình dịch cả nước
                            </div>
                            <div className="table">
                                <div className="header-table">
                                        <span className="colums-table0">STT</span>
                                        <span className="colums-table1">Tỉnh/TP</span>
                                        <span className="colums-table2">Tổng số ca</span>
                                        <span className="colums-table3">Hôm nay</span>
                                        <span className="colums-table4">Tử vong</span>
                                </div>
                                <div className="content-table">
                                    {
                                        locations.map((item, index) => (
                                            <div key={index} className="content-table-list">
                                                <span className="colums-table0">
                                                    {index + 1}
                                                </span>
                                                <span className="colums-table1">
                                                    {item.name}</span>
                                                <span className="colums-table2">
                                                    <NumberFormat 
                                                        value={item.cases}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                    />
                                                </span>
                                                <span className="colums-table3">
                                                    +
                                                    <NumberFormat 
                                                        value={item.casesToday} 
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                    />
                                                </span>
                                                <span className="colums-table4">
                                                    
                                                    <NumberFormat 
                                                        value={item.death}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                    />
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="chart-covid">
                            <ComposedChart width={750} height={450} data={chartOverview}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#ccc" />
                                <Bar 
                                    dataKey="cases" 
                                    barSize={30} 
                                    fill="#2980b9" 
                                    name="Số ca nhiễm" 
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="avgCases7day" 
                                    stroke="#e74c3c" 
                                    name="Trung bình 7 ngày" 
                                />
                            </ComposedChart>
                        </div>
                    </div>
                    
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
        // fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),


    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Covid19));
