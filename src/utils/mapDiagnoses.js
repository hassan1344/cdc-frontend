export const mapDiagnoses = (data) => {
    const allgemeineDaten = {
      geburtsdatum: data.geburtsdatum || null,
      groeße: data.groeße || null,
      gewicht: data.gewicht || null,
      geschlecht: data.geschlecht || null,
      diabetestyp: data.diabetestyp || null,
      dauerDiab: data.dauerDiab || null,
      diabSchulung: data.diabSchulung || null,
      anlage: data.anlage || null,
      anlagenSources: data.anlagenSources || null,
      mrsa: data.mrsa || null,
      datum: data.datum || null,
    };
  
    const klinischerBefund = {
      linksVibrationsempfindung: data.clinicalFindings?.[0]?.leftValue,
      rechtsVibrationsempfindung: data.clinicalFindings?.[0]?.rightValue,
      linksMikrofilament: data.clinicalFindings?.[1]?.leftValue === true ? "ja" : "nein",
      rechtsMikrofilament: data.clinicalFindings?.[1]?.rightValue === true ? "ja" : "nein",
      linksHinweisPAVK: data.clinicalFindings?.[2]?.leftValue === true ? "ja" : "nein",
      rechtsHinweisPAVK: data.clinicalFindings?.[2]?.rightValue === true ? "ja" : "nein",
      linksHinweisPNP: data.clinicalFindings?.[1]?.leftValue === 'nein' || data.clinicalFindings?.[0]?.leftValue < 4 ? 'ja' : 'nein',
      rechtsHinweisPNP: data.clinicalFindings?.[1]?.rightValue === 'nein' || data.clinicalFindings?.[0]?.rightValue < 4 ? 'ja' : 'nein',
    };
  
    const fussstatus = {
      linksFußstatus: data.fussStatus?.[0]?.value === true ? "ja" : "nein",
      rechtsFußstatus: data.fussStatus?.[0]?.value === true ? "ja" : "nein",
      linksUlcus: data.fussStatus?.[3]?.leftValue === true ? "ja" : "nein",
      rechtsUlcus: data.fussStatus?.[3]?.rightValue === true ? "ja" : "nein",
      linksAmputation: data.fussStatus?.[4]?.leftValue === true ? "ja" : "nein",
      rechtsAmputation: data.fussStatus?.[4]?.rightValue === true ? "ja" : "nein",
      linksFußdeformitäten: data.fussStatus?.[5]?.leftValue?.[0] === true ? "ja" : "nein",
      rechtsFußdeformitäten: data.fussStatus?.[5]?.rightValue?.[0] === true ? "ja" : "nein",
      linksOsteoarthropathie: data.fussStatus?.[7]?.leftValue?.[0] === true ? "ja" : "nein",
      rechtsOsteoarthropathie: data.fussStatus?.[7]?.rightValue?.[0] === true ? "ja" : "nein",
      linksPedograpischerBefund: "extrem",
      rechtsPedograpischerBefund: "extrem",
      podologischeBehandlung: data.diabSchulung || null,
      letztePodoBehandlung: data.datum || null,
    };
  
    const fussstatusGrafik = {
      grafikDaten: {
        m4pr: data.fussStatus?.[3]?.leftValue || [],
        m4pl: data.fussStatus?.[3]?.rightValue || [],
      },
      imgURL: data.base64Image || "",
    };
  
    const kategorisierung = {
      linksRisikotyp: extractRiskType(data.riskGroupStatus, "left"),
      rechtsRisikotyp: extractRiskType(data.riskGroupStatus, "right"),
    };
  
    const kriterien = {
      kontralateraleAmputation: null,
      arthropathie: null,
      amputationGroßzehe: null,
      motorischeEinschränkung: data.hoeherversorgungStatus?.[1]?.value ? "ja" : null,
      standunsicherheit: "ja",
      adipositas: "ja",
      dialysepflichtig: data.fussStatus?.[0]?.value ? "ja" : null,
      berufStehbelastung: "ja",
      visuseinschränkung: null,
      fehlgeschlageneVorversorgung: data.hoeherversorgungStatus?.[2]?.value ? "ja" : null,
      fußdeformitätenDruckerhöhung:
        data.fussStatus?.[5]?.leftValue?.includes("hochgradig") ||
        data.fussStatus?.[5]?.rightValue?.includes("hochgradig")
          ? "ja"
          : null,
    };
  
    const schuhversorgung = mapShoeProvision(data.shoeProvisionData);
  
    return {
      patientencode: data.patientencode || null,
      partnerID: localStorage.getItem("doctorId") || null,
      allgemeineDaten,
      klinischerBefund,
      fussstatus,
      fussstatusGrafik,
      kriterien,
      kategorisierung,
      schuhversorgung,
      funktionelleTests: null, // Placeholder
    };
  };
  
  const extractRiskType = (list, side) => {
    const mapping = {
      "Typ 0": "Typ 0",
      "Typ I": "Typ I",
      "Typ II a": "Typ II a",
      "Typ II b": "Typ II b",
      "Typ III": "Typ III",
      "Typ IV": "Typ IV",
      "Typ V": "Typ V",
      "Typ VI": "Typ VI",
      "Typ VII a": "Typ VII",
      "Typ VII b": "Typ VII",
      "Typ VII c": "Typ VII",
      "Typ VII d": "Typ VII",
    };
  
    const found = list?.find((entry) => entry[`${side}Value`] === true);
    return found ? mapping[found.label] : null;
  };
  
  const mapShoeProvision = (shoeData) => {
    const result = {};
    shoeData?.forEach((item) => {
      item.details.forEach((detail, index) => {
        const baseKey = `Typ${item.risikoTyp}`;
        const detailKey = `${baseKey}${detail.replace(/\s+/g, "")}`;
        result[`links${detailKey}`] = item.left?.[index] ? "ja" : null;
        result[`rechts${detailKey}`] = item.right?.[index] ? "ja" : null;
      });
    });
    result.abweichungNachÄrztlicheVerordnung = null;
    return result;
  };
  