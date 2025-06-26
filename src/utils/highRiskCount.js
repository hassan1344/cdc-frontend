export function highRiskCount(patientData) {
  let high = 0, medium = 0, low = 0;

  patientData.forEach(({ kategorisierung }) => {
    const left = kategorisierung?.linksRisikotyp || "";
    const right = kategorisierung?.rechtsRisikotyp || "";

    [left, right].forEach((side) => {
      if (/III|IV|V|VI|VII/.test(side)) {
        high++;
      } else if (/II|I/.test(side)) {
        medium++;
      } else if (/0/.test(side)) {
        low++;
      }
    });
  });

  return { high, medium, low };
}
