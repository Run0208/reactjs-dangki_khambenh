import React, { Component } from 'react';
import {XAxis, YAxis, CartesianGrid, Tooltip, Bar, BarChart, Legend} from 'recharts';



class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    console.log(this.props);

    const list = [
      {
        "name": "Page A",
        "pv": 2400
      },
      {
        "name": "Page B",
        "pv": 1398
      },
      {
        "name": "Page C",
        "pv": 9800
      },
      {
        "name": "Page D",
        "pv": 3908
      },
      {
        "name": "Page E",
        "pv": 4800
      },
      {
        "name": "Page F",
        "pv": 3800
      },
      {
        "name": "Page G",
        "pv": 4300
      }
    ]

    return (
      <BarChart width={730} height={250} data={list}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
      </BarChart>
    );
  }
}

export default Chart;