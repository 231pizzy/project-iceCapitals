/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

// export default function ChatBox() {
//   return (
//     <div>
//       <div className="chartInfo">
//         <div className="w-full h-full">
//           <ResponsiveContainer width={120} height={120}>
//             <LineChart width={300} height={100} data={data}>
//               <Line
//                 type="monotone"
//                 dataKey="pv"
//                 stroke="#8884d8"
//                 strokeWidth={2}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function ChatBox(props) {
  return (
    <div className="chartBox flex h-full">
      <div className="boxInfo flex flex-col justify-between flex-3 gap-y-2">
        <div className="title flex items-center gap-2">
          <img src={props.icon} alt="" />
          <span>{props.title}</span>
        </div>
        <h1 className="text-2xl ml-4">{props.amount}</h1>
        <Link to="/" className={`text-${props.color}`}></Link>
        <h1>Thanks</h1>
      </div>
      <div className="chartInfo flex flex-col justify-between flex-2 ml-28 ">
        <div className="chart">
          <ResponsiveContainer width={120} height={120}>
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts flex flex-col items-end">
          <span
            className={`percentage font-bold text-lg ${
              props.percentage < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {props.percentage}%
          </span>
          <span className="duration text-sm">this month</span>
        </div>
      </div>
    </div>
  );
}
