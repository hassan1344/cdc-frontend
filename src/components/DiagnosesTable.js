import React, { useEffect, useState } from "react";
import { fetchDiagnosticDataByPatientId } from "../api/api"; // Adjust the path if needed

const DiagnosesTable = ({ id }) => {
    const [questionnaires, setQuestionnaires] = useState([]);

    useEffect(() => {
        if (!id) return;

        const getData = async () => {
            try {
                const data = await fetchDiagnosticDataByPatientId(id);
                setQuestionnaires(data || []);
            } catch (error) {
                console.error("Fehler beim Laden der Fragebögen:", error);
            }
        };

        getData();
    }, [id]);

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString("de-DE", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    const extractValue = (data, path) => {
        if (!data || !path) return "-";

        const keys = path.split(".");
        let value = data;

        for (const key of keys) {
            value = value?.[key];
            if (value === undefined || value === null) return "-";
        }

        return typeof value === "string" ? value : JSON.stringify(value);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 space-y-10">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8">
                <h3 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-3">
                    Diagnosen von Patient
                </h3>

                {questionnaires.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        Keine Befundbögen gefunden.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-gray-800">
                            <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600">
                                <tr>
                                    <th className="py-3 px-4 text-left">Befundbogen Nr</th>
                                    <th className="py-3 px-4 text-left">Diabetes Typ</th>
                                    <th className="py-3 px-4 text-left">Gewicht (kg)</th>
                                    <th className="py-3 px-4 text-left">Ulcer</th>
                                    <th className="py-3 px-4 text-left">Erstellt am</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questionnaires.map((q, index) => (
                                    <tr
                                        key={q.id || index}
                                        className="hover:bg-blue-50 transition"
                                    >
                                        <td className="py-3 px-4 border-b">{index + 1}</td>
                                        <td className="py-3 px-4 border-b">
                                            {extractValue(q, "allgemeineDaten.diabetestyp")}
                                        </td>
                                        <td className="py-3 px-4 border-b">
                                            {extractValue(q, "allgemeineDaten.gewicht")}
                                        </td>
                                        <td className="py-3 px-4 border-b">
                                            {extractValue(q, "fussstatus.linksUlcus")}
                                        </td>
                                        <td className="py-3 px-4 border-b">
                                            {formatDate(q.created_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiagnosesTable;
