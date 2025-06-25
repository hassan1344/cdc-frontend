import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BMICategoryBar({ data }) {
  const categoryCounts = {
    Underweight: 0,
    Normal: 0,
    Overweight: 0,
    Obese: 0,
  };

  data.forEach((patient) => {
    const weight = parseFloat(patient.allgemeineDaten.gewicht);
    const height = parseFloat(patient.allgemeineDaten.groeße) / 100; // cm → meters
    const bmi = weight / (height * height);

    if (bmi < 18.5) categoryCounts.Underweight++;
    else if (bmi < 25) categoryCounts.Normal++;
    else if (bmi < 30) categoryCounts.Overweight++;
    else categoryCounts.Obese++;
  });

  const barData = Object.entries(categoryCounts).map(([category, count]) => ({
    category,
    count,
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">BMI Category Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#F59E0B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
