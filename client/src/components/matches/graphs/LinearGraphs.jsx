import React, { useEffect, useState } from 'react';
import Style from './LinearGraphs.module.css'
import {  
  LineChart, Line, CartesianGrid, 
  XAxis, YAxis, Tooltip ,
} from 'recharts';

const LinearGraphs = props => {
  const { data } = props;
  
  const renderData = data.map( (key, indx) => {
    return {
      id: indx,
      data: key,
      time: indx + ' мин'
    }
  })

  const renderLineChart = (
      <LineChart 
        width = { 600 } height = { 300 } data = { renderData } 
        margin = {{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type = "monotone" dataKey = "data" stroke = "#8884d8" />
        <CartesianGrid stroke = "#c1c1c1" width = { 600 } height = { 1 } />
        <XAxis dataKey = "time" />
        <YAxis />
        <Tooltip />
      </LineChart>
  );

  return (
    <div className = {Style.linearGraphs}>
      {renderLineChart}
    </div>
  );
}

export default LinearGraphs;
