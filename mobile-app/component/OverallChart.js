import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
const data = [
  { time: 1, white_leaf: 400, brown_spot: 333, ring_spot: 432 },
  { time: 2, white_leaf: 100, brown_spot: 664, ring_spot: 987 },
  { time: 3, white_leaf: 100, brown_spot: 664, ring_spot: 987 },
  { time: 4, white_leaf: 321, brown_spot: 121, ring_spot: 99 }
];

function renderLineChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Tooltip />
        <Area type="monotone" dataKey="white_leaf" stroke="#8884d8" fillOpacity={0.25} fill="#8884d8" />
        <Area type="monotone" dataKey="brown_spot" stroke="#82ca9d" fillOpacity={0.25} fill="#82ca9d" />
        <Area type="monotone" dataKey="ring_spot" stroke="#0184d8" fillOpacity={0.25} fill="#0184d8" />
        <CartesianGrid stroke="#ddd" strokeDasharray="5 5" />
        <XAxis dataKey="time" />
        <YAxis />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default renderLineChart;