import React, { Component } from 'react';
import {XAxis, YAxis, CartesianGrid, Tooltip, Bar, BarChart, Legend} from 'recharts';
import { getAllDoctors } from '../../../services/userService';


class Chart extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      dataDoctors: []
    }
  }

  async componentDidMount() {
    let resDoctor = await getAllDoctors();

    if(resDoctor && resDoctor.errCode === 0) {
      this.setState({
          dataDoctors: resDoctor.data ? resDoctor.data : [],
      })
    }
  }

  render() {
    // let { dataDoctors } = this.state;
    let { listData } = this.props;
    
    return (
      <BarChart width={750} height={300} data={listData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={'firstName'} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={'id'} fill="#8884d8" />
      </BarChart>
    );
  }
}

export default Chart;