import React from 'react';
import PropType from 'prop-types';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  Label,
} from 'recharts';

const DATA = [
  { no: 1, white_leaf_disease: 400, brown_spot_disease: 333, ring_spot_disease: 432 },
  { no: 2, white_leaf_disease: 100, brown_spot_disease: 664, ring_spot_disease: 987 },
  { no: 3, white_leaf_disease: 100, brown_spot_disease: 664, ring_spot_disease: 987 },
  { no: 4, white_leaf_disease: 321, brown_spot_disease: 121, ring_spot_disease: 99 }
];

function RenderLineChart({
  data = DATA,
}) {
  return (
    <ResponsiveContainer className="m-3" width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Tooltip />
        <Area type="monotone" dataKey="white_leaf_disease" stroke="#AA6FAA" fillOpacity={0.25} fill="#AA6FAA" />
        <Area type="monotone" dataKey="brown_spot_disease" stroke="#82ca9d" fillOpacity={0.25} fill="#82ca9d" />
        <Area type="monotone" dataKey="ring_spot_disease" stroke="#0184d8" fillOpacity={0.25} fill="#0184d8" />
        <Area type="monotone" dataKey="other" stroke="#6A6FAF" fillOpacity={0.25} fill="#6A6FAF" />
        <Area type="monotone" dataKey="not_analysis" stroke="#B4B5C0" fillOpacity={0.25} fill="#B4B5C0" />
        <CartesianGrid stroke="#ddd" strokeDasharray="5 5" />
        <XAxis dataKey="no">
          <Label value="No. Recently Test" offset={0} position="bottom" />
        </XAxis>
        <YAxis label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft', }} />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );
};

RenderLineChart.propTypes = {
  data: PropType.array,
};

RenderLineChart.defaultProps = {
  data: DATA,
};

export default RenderLineChart;