import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function DiabetesDurationScatter({ data }) {
  const scatterData = data.map((patient) => {
    const birthYear = new Date(patient.allgemeineDaten.geburtsdatum).getFullYear();
    const age = new Date().getFullYear() - birthYear;
    const duration = parseInt(patient.allgemeineDaten.dauerDiab, 10);

    return {
      age,
      duration,
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Diabetes Duration vs. Age</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="number" dataKey="age" name="Age" unit=" yrs" />
          <YAxis type="number" dataKey="duration" name="Duration" unit=" yrs" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Patients" data={scatterData} fill="#3B82F6" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
