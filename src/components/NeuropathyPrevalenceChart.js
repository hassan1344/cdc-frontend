import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function NeuropathyPrevalenceChart({ data }) {
  const chartData = useMemo(() => {
    let total = data.length;
    let leftPNP = 0;
    let rightPNP = 0;

    data.forEach((patient) => {
      const left = patient.klinischerBefund?.linksHinweisPNP === "ja";
      const right = patient.klinischerBefund?.rechtsHinweisPNP === "ja";

      if (left) leftPNP++;
      if (right) rightPNP++;
    });

    const toPercent = (value) => ((value / total) * 100).toFixed(1);

    return [
      { category: "Left Foot", value: parseFloat(toPercent(leftPNP)) },
      { category: "Right Foot", value: parseFloat(toPercent(rightPNP)) },
    ];
  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Neuropathy Prevalence (% with PNP Signs)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis unit="%" domain={[0, 100]} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Bar dataKey="value" fill="#FF2E0B" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
