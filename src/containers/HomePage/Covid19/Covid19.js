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
                                <i className="fa fa-star" aria-hidden="true"></i>
                                Vi???t Nam
                            </div>
                            <div className="space">/</div>
                            <div
                                className={isShowGl === false ? `none` : `active`}
                                onClick={() => this.showWorld(false)}
                            >
                                <i className="fa fa-globe" aria-hidden="true"></i>
                                Th??? gi???i
                            </div>
                        </div>
                        <>
                            {
                                isShowVn === true ? 
                                <div className="list">
                                    <div className="box cases">
                                        <div className="title">T???ng s??? ca m???c</div>
                                        <div className="value">
                                            <NumberFormat 
                                                value={totalInternal.cases}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                        <div className="today">
                                            H??m nay: +
                                            <NumberFormat 
                                                value={todayInternal.cases}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="box treating">
                                        <div className="title">??ang ??i???u tr???</div>
                                        <div className="value">
                                            <NumberFormat 
                                                value={totalInternal.treating}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                        <div className="today">
                                            H??m nay: +
                                            <NumberFormat 
                                                value={todayInternal.treating}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="box recovered">
                                        <div className="title">???? kh???i</div>
                                        <div className="value">
                                            <NumberFormat 
                                                value={totalInternal.recovered}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                        <div className="today">
                                            H??m nay: +
                                            <NumberFormat 
                                                value={todayInternal.recovered}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="box death">
                                        <div className="title">T??? vong</div>
                                        <div className="value">
                                            <NumberFormat 
                                                value={totalInternal.death}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                        <div className="today">
                                            H??m nay: +
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
                                        <div className="title">T???ng s??? ca m???c</div>
                                        <div className="value">
                                            <NumberFormat 
                                                value={totalWorld.cases}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="box treating">
                                        <div className="title">??ang ??i???u tr???</div>
                                        <div className="value">
                                            <NumberFormat 
                                                value={totalWorld.treating}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="box recovered">
                                        <div className="title">???? kh???i</div>
                                        <div className="value">
                                            <NumberFormat 
                                                value={totalWorld.recovered}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="box death">
                                        <div className="title">T??? vong</div>
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
                                T??nh h??nh d???ch c??? n?????c
                            </div>
                            <div className="table">
                                <div className="header-table">
                                        <span className="colums-table0">STT</span>
                                        <span className="colums-table1">T???nh/TP</span>
                                        <span className="colums-table2">T???ng s??? ca</span>
                                        <span className="colums-table3">H??m nay</span>
                                        <span className="colums-table4">T??? vong</span>
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
                                    name="S??? ca nhi???m" 
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="avgCases7day" 
                                    stroke="#e74c3c" 
                                    name="Trung b??nh 7 ng??y" 
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
