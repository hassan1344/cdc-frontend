import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { useMemo } from "react";

const COLORS = ["#3B82F6", "#F472B6"]; // blue & pink

export default function GenderDistribution({ data }) {
  const genderData = useMemo(() => {
    const genderCount = { männlich: 0, weiblich: 0 };

    data.forEach((patient) => {
      const gender = patient.allgemeineDaten?.geschlecht;
      if (gender && genderCount[gender] !== undefined) {
        genderCount[gender]++;
      }
    });

    return Object.entries(genderCount).map(([gender, count]) => ({
      gender: gender === "männlich" ? "Male" : "Female",
      count,
      percentage: ((count / data.length) * 100).toFixed(1),
    }));
  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Gender Distribution
      </h3>
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={genderData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="count"
            >
              {genderData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => [
                `${value} (${props.payload.percentage}%)`,
                props.payload.gender,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center space-x-6 mt-4">
        {genderData.map((entry, index) => (
          <div key={entry.gender} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            ></div>
            <span className="text-sm text-gray-600">
              {entry.gender} ({entry.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
