import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function StocksLineChart({ data }) {
  console.log(data);

    // Format the data into an array of objects with properties for x (date) and y (open, high, low, close, volume)
    const formattedData = data.map((dataPoint) => ({
      date: dataPoint[0],
      open: dataPoint[1],
      high: dataPoint[2],
      low: dataPoint[3],
      close: dataPoint[4],
      volume: dataPoint[5]
    }));

  return (
    <LineChart width={1200} height={400} data={formattedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="open" name="Open" stroke="#8884d8" />
      <Line type="monotone" dataKey="high" name="High" stroke="#82ca9d" />
      <Line type="monotone" dataKey="low" name="Low" stroke="#ffc658" />
      <Line type="monotone" dataKey="close" name="Close" stroke="#f04848" /> 
      <Line type="monotone" dataKey="volume" name="Volume" stroke="#f09067" />
    </LineChart>
  );
};

export default StocksLineChart;