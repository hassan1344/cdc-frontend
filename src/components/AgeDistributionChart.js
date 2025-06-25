import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { calculateAge } from "../utils/calculateAge";

export default function AgeDistributionChart({ data }) {
  const ageDistributionData = useMemo(() => {
    const ageRanges = {
      "20-30": 0,
      "31-40": 0,
      "41-50": 0,
      "51-60": 0,
      "61-70": 0,
      "71+": 0,
    };

    data.forEach((patient) => {
      const age = calculateAge(patient.allgemeineDaten.geburtsdatum);
      if (age >= 20 && age <= 30) ageRanges["20-30"]++;
      else if (age >= 31 && age <= 40) ageRanges["31-40"]++;
      else if (age >= 41 && age <= 50) ageRanges["41-50"]++;
      else if (age >= 51 && age <= 60) ageRanges["51-60"]++;
      else if (age >= 61 && age <= 70) ageRanges["61-70"]++;
      else if (age >= 71) ageRanges["71+"]++;
    });

    return Object.entries(ageRanges).map(([range, count]) => ({
      ageRange: range,
      patients: count,
    }));
  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Age Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={ageDistributionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ageRange" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="patients" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
