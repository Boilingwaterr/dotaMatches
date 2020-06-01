import React from 'react';
import Style from './LinearGraphs.module.css';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';


const LinearGraphsWithFill = props => {

  const { data, width, height } = props;

  const renderData = data.map( (key, indx) => {
    return {
      id: indx,
      data: key,
      time: `${indx}:00`
    }
  })
  
  const gradientOffset = () => {
    const dataMax = Math.max(...renderData.map(i => i.data));
    const dataMin = Math.min(...renderData.map(i => i.data));
  
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }
    return dataMax / (dataMax - dataMin);
  };
  
  const off = gradientOffset();

  const renderLineChart = (
    <AreaChart
        width = { width }
        height = { height } 
        data = { renderData }
        margin = {{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid stroke = "#c1c1c1" width = { width } height = { 1 } />
        <XAxis dataKey = "time" />
        <YAxis />
        <Tooltip />
        <defs>
          <linearGradient id = "splitColor" x1 = "0" y1 = "0" x2 = "0" y2 = "1">
            <stop offset = { off } stopColor = "#5DA263" stopOpacity = { 1 } />
            <stop offset = { off } stopColor = "#D17654" stopOpacity = { 1 } />
          </linearGradient>
        </defs>
        <Area 
          type = "monotone" 
          dataKey = "data" 
          stroke = "url(#splitColor)" 
          fill = "url(#splitColor)" />
      </AreaChart>
  )

  return (
    <div className = { Style.linearGraphs }>
      { renderLineChart }
    </div>
  )
}

export default LinearGraphsWithFill;