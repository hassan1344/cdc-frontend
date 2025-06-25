import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const riskTypeLabels = {
  0: "Typ 0",
  1: "Typ I",
  2: "Typ II",
  3: "Typ III",
  4: "Typ IV",
  5: "Typ V",
  6: "Typ VI",
  7: "Typ VII",
};

export default function RiskComparisionChart({ data }) {
  const chartData = useMemo(() => {
    const leftRiskCount = {};
    const rightRiskCount = {};

    Object.values(riskTypeLabels).forEach((label) => {
      leftRiskCount[label] = 0;
      rightRiskCount[label] = 0;
    });

    data.forEach((patient) => {
      const left = patient.kategorisierung?.linksRisikotyp;
      const right = patient.kategorisierung?.rechtsRisikotyp;

      const leftKey = Object.values(riskTypeLabels).includes(left)
        ? left
        : Object.values(riskTypeLabels).find((v) => v === left);
      const rightKey = Object.values(riskTypeLabels).includes(right)
        ? right
        : Object.values(riskTypeLabels).find((v) => v === right);

      if (leftKey) leftRiskCount[leftKey]++;
      if (rightKey) rightRiskCount[rightKey]++;
    });

    return Object.entries(riskTypeLabels)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([, label]) => ({
        riskType: label,
        Left: leftRiskCount[label],
        Right: rightRiskCount[label],
      }));
  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Risk Type Distribution by Foot
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="riskType" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Left" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Right" fill="#EF4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
