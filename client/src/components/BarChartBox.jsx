/* eslint-disable react/prop-types */
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";

export default function BarchartBox(props) {
  return (
    <div className="w-full h-ful">
      <h1 className="text-lg font-semibold mb-4">{props.title}</h1>
      <div className="h-full">
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={props.chartData}>
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey={props.dataKey} fill={props.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
