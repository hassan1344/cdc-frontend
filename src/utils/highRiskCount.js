export function highRiskCount({ patientData }) {
    let count = 0;
    patientData.forEach(({ kategorisierung }) => {
      const left = kategorisierung?.linksRisikotyp || "";
      const right = kategorisierung?.rechtsRisikotyp || "";
      if (left.includes("VI") || left.includes("VII")) count++;
      if (right.includes("VI") || right.includes("VII")) count++;
    });
    return count
};
