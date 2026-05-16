import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const ActivityChart = ({
  data = [],
}) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
      border border-blue-900
    ">

      <h3 className="
        text-lg
        font-semibold
        text-black
        mb-4
      ">

        Weekly Job Activity

      </h3>

      <div className="h-60">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="jobs"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default ActivityChart;