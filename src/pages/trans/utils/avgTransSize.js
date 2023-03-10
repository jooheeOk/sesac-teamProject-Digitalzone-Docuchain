import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function AvgTransSize(props) {
  const { data, fetchdata } = props;

  const countFunc = (a) => {
    const result1 = data.filter((user) => user.timeStamp.includes(a));
    return result1.length;
  };
  const avgFunc = (a) => {
    const result2 = data.filter((user) => user.timeStamp.includes(a));

    const avgResult = result2
      .map((item) => item.transSize)
      .reduce((prev, curr) => prev + curr, 0);

    return (avgResult / result2.length).toFixed(2);
  };

  const Data = [
    {
      time: "10:00",
      TimePerTrans: countFunc(" 10:"),
      transSize: avgFunc(" 10:"),
    },
    {
      time: "11:00",
      TimePerTrans: countFunc(" 11:"),
      transSize: avgFunc(" 11:"),
    },
    {
      time: "12:00",
      TimePerTrans: countFunc(" 12:"),
      transSize: avgFunc(" 12:"),
    },
    {
      time: "13:00",
      TimePerTrans: countFunc(" 13:"),
      transSize: avgFunc(" 13:"),
    },
    {
      time: "14:00",
      TimePerTrans: countFunc(" 14:"),
      transSize: avgFunc(" 14:"),
    },
  ];

  return (
    <div className="Chart">
      <h3 className="chart_trans_title">시간당 트랜잭션 크기(KB)</h3>
      <AreaChart
        width={600}
        height={400}
        data={Data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />

        <Area
          type="monotone"
          dataKey="transSize"
          stroke="#8884d8"
          fill="#8884d8"
          key={Math.random()}
        />
      </AreaChart>
    </div>
  );
}

export default AvgTransSize;
