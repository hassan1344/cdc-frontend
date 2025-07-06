import React, { useMemo } from "react";
import {
  Heart,
  AlertCircle,
  CheckCircle,
  Info,
  Calendar,
  User,
  Activity,
  Footprints,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import mockData from "../../data/mockData.json";
import { calculateAge } from "../../utils/calculateAge";

const PatientDashboard = () => {
  const id = "377643390"; // Demo patient ID

  const allPatientData = useMemo(() => autoParseJsonStrings(mockData), []);
  const entries = allPatientData.filter(
    (entry) => entry.patientencode?.toString() === id
  );

  if (entries.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Keine Daten gefunden
          </h2>
          <p className="text-red-600">
            Für die Patienten-ID {id} wurden keine Daten gefunden.
          </p>
        </div>
      </div>
    );
  }

  const generalInfo = entries[0].allgemeineDaten || {};
  const age = calculateAge(generalInfo.geburtsdatum);

  // Patient-friendly translations and explanations
  const getPatientFriendlyValue = (value, type) => {
    if (value === null || value === undefined || value === "")
      return "Nicht angegeben";

    switch (type) {
      case "boolean":
        return value ? "Ja" : "Nein";
      case "geschlecht":
        return value === "männlich"
          ? "Männlich"
          : value === "weiblich"
          ? "Weiblich"
          : value;
      case "diabetestyp":
        return value === "Typ 1"
          ? "Typ 1 Diabetes"
          : value === "Typ 2"
          ? "Typ 2 Diabetes"
          : value;
      default:
        return value;
    }
  };

  const getRiskExplanation = (riskType) => {
    switch (riskType) {
      case "Typ I":
        return {
          level: "Niedrig",
          color: "bg-green-100 text-green-800 border-green-300",
          icon: CheckCircle,
          explanation:
            "Geringes Risiko für Fußprobleme. Regelmäßige Kontrollen werden empfohlen.",
        };
      case "Typ II":
        return {
          level: "Mittel",
          color: "bg-yellow-100 text-yellow-800 border-yellow-300",
          icon: Info,
          explanation:
            "Mittleres Risiko. Besondere Aufmerksamkeit bei der Fußpflege ist wichtig.",
        };
      case "Typ III":
        return {
          level: "Hoch",
          color: "bg-orange-100 text-orange-800 border-orange-300",
          icon: AlertCircle,
          explanation:
            "Erhöhtes Risiko. Regelmäßige professionelle Fußpflege wird empfohlen.",
        };
      case "Typ IV":
        return {
          level: "Sehr hoch",
          color: "bg-red-100 text-red-800 border-red-300",
          icon: AlertCircle,
          explanation:
            "Sehr hohes Risiko. Engmaschige ärztliche Betreuung ist erforderlich.",
        };
      default:
        return {
          level: "Nicht bewertet",
          color: "bg-gray-100 text-gray-800 border-gray-300",
          icon: Info,
          explanation: "Risiko wurde noch nicht eingestuft.",
        };
    }
  };

  const getSensationExplanation = (value) => {
    switch (value) {
      case "normal":
        return {
          text: "Normal",
          color: "text-green-600",
          explanation: "Gefühl ist normal",
        };
      case "reduziert":
        return {
          text: "Vermindert",
          color: "text-yellow-600",
          explanation: "Gefühl ist schwächer als normal",
        };
      case "ausgefallen":
        return {
          text: "Stark vermindert",
          color: "text-red-600",
          explanation: "Gefühl ist stark eingeschränkt",
        };
      default:
        return { text: value, color: "text-gray-600", explanation: "" };
    }
  };

  const getFootStatusExplanation = (value) => {
    switch (value) {
      case "normal":
        return { text: "Normal", color: "text-green-600", icon: CheckCircle };
      case "auffällig":
        return {
          text: "Auffällig",
          color: "text-yellow-600",
          icon: AlertCircle,
        };
      case "pathologisch":
        return {
          text: "Behandlungsbedürftig",
          color: "text-red-600",
          icon: AlertCircle,
        };
      default:
        return { text: value, color: "text-gray-600", icon: Info };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center mb-4">
          <User className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">
            Ihr Gesundheitsbericht
          </h1>
        </div>
        <p className="text-gray-600">
          Hier finden Sie eine verständliche Zusammenfassung Ihrer
          Untersuchungsergebnisse.
        </p>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow-sm p-2 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <User className="w-5 h-5 mr-2 text-blue-600" />
          Ihre persönlichen Daten
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Alter:</span>
              <span className="font-medium">{age} Jahre</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Geschlecht:</span>
              <span className="font-medium">
                {getPatientFriendlyValue(generalInfo.geschlecht, "geschlecht")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Größe:</span>
              <span className="font-medium">
                {getPatientFriendlyValue(generalInfo.groeße)} cm
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Gewicht:</span>
              <span className="font-medium">
                {getPatientFriendlyValue(generalInfo.gewicht)} kg
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Diabetes-Typ:</span>
              <span className="font-medium">
                {getPatientFriendlyValue(
                  generalInfo.diabetestyp,
                  "diabetestyp"
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Diabetes seit:</span>
              <span className="font-medium">
                {getPatientFriendlyValue(generalInfo.dauerDiab)} Jahren
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Schulung erhalten:</span>
              <span className="font-medium">
                {getPatientFriendlyValue(generalInfo.diabSchulung, "boolean")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Letzte Untersuchung:</span>
              <span className="font-medium">
                {new Date(generalInfo.datum).toLocaleDateString("de-DE")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      {entries.map((entry, index) => {
        const kategorisierung = entry.kategorisierung || {};
        const klinisch = entry.klinischerBefund || {};
        const fussstatus = entry.fussstatus || {};

        const leftRisk = getRiskExplanation(kategorisierung.linksRisikotyp);
        const rightRisk = getRiskExplanation(kategorisierung.rechtsRisikotyp);

        return (
          <div key={index} className="space-y-6">
            {/* Risk Level Overview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                Ihr Fußgesundheits-Risiko
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`border-2 rounded-lg p-4 ${leftRisk.color}`}>
                  <div className="flex items-center mb-2">
                    <leftRisk.icon className="w-5 h-5 mr-2" />
                    <h3 className="font-semibold">Linker Fuß</h3>
                  </div>
                  <p className="text-lg font-bold mb-2">
                    {leftRisk.level} Risiko
                  </p>
                  <p className="text-sm">{leftRisk.explanation}</p>
                </div>
                <div className={`border-2 rounded-lg p-4 ${rightRisk.color}`}>
                  <div className="flex items-center mb-2">
                    <rightRisk.icon className="w-5 h-5 mr-2" />
                    <h3 className="font-semibold">Rechter Fuß</h3>
                  </div>
                  <p className="text-lg font-bold mb-2">
                    {rightRisk.level} Risiko
                  </p>
                  <p className="text-sm">{rightRisk.explanation}</p>
                </div>
              </div>
            </div>

            {/* Sensation Tests */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                Gefühlstest Ihrer Füße
              </h2>
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Was bedeutet das?</strong> Wir testen, wie gut Sie
                  Berührungen und Vibrationen an Ihren Füßen spüren können. Dies
                  ist wichtig, um Verletzungen frühzeitig zu bemerken.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-gray-700">
                    Linker Fuß
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Vibrationsgefühl:</span>
                      <span
                        className={`font-medium ${
                          getSensationExplanation(
                            klinisch.linksVibrationsempfindung
                          ).color
                        }`}
                      >
                        {
                          getSensationExplanation(
                            klinisch.linksVibrationsempfindung
                          ).text
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Berührungsgefühl:</span>
                      <span className="font-medium">
                        {klinisch.linksMikrofilament === "positiv"
                          ? "Gut"
                          : klinisch.linksMikrofilament === "negativ"
                          ? "Eingeschränkt"
                          : "Nicht getestet"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Nervenschädigung:</span>
                      <span
                        className={`font-medium ${
                          klinisch.linksHinweisPNP === "Ja"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {klinisch.linksHinweisPNP === "Ja"
                          ? "Möglich"
                          : "Nicht erkennbar"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Durchblutung:</span>
                      <span
                        className={`font-medium ${
                          klinisch.linksHinweisPAVK === "Ja"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {klinisch.linksHinweisPAVK === "Ja"
                          ? "Eingeschränkt"
                          : "Gut"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-gray-700">
                    Rechter Fuß
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Vibrationsgefühl:</span>
                      <span
                        className={`font-medium ${
                          getSensationExplanation(
                            klinisch.rechtsVibrationsempfindung
                          ).color
                        }`}
                      >
                        {
                          getSensationExplanation(
                            klinisch.rechtsVibrationsempfindung
                          ).text
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Berührungsgefühl:</span>
                      <span className="font-medium">
                        {klinisch.rechtsMikrofilament === "positiv"
                          ? "Gut"
                          : klinisch.rechtsMikrofilament === "negativ"
                          ? "Eingeschränkt"
                          : "Nicht getestet"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Nervenschädigung:</span>
                      <span
                        className={`font-medium ${
                          klinisch.rechtsHinweisPNP === "Ja"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {klinisch.rechtsHinweisPNP === "Ja"
                          ? "Möglich"
                          : "Nicht erkennbar"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Durchblutung:</span>
                      <span
                        className={`font-medium ${
                          klinisch.rechtsHinweisPAVK === "Ja"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {klinisch.rechtsHinweisPAVK === "Ja"
                          ? "Eingeschränkt"
                          : "Gut"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Foot Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <Footprints className="w-5 h-5 mr-2 text-green-600" />
                Zustand Ihrer Füße
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-gray-700">
                    Linker Fuß
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Gesamtzustand:</span>
                      <div className="flex items-center">
                        {(() => {
                          const status = getFootStatusExplanation(
                            fussstatus.linksFußstatus
                          );
                          return (
                            <>
                              <status.icon
                                className={`w-4 h-4 mr-1 ${status.color}`}
                              />
                              <span className={`font-medium ${status.color}`}>
                                {status.text}
                              </span>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Wunden:</span>
                      <span
                        className={`font-medium ${
                          fussstatus.linksUlcus === "Ja"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {fussstatus.linksUlcus === "Ja" ? "Vorhanden" : "Keine"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Amputationen:</span>
                      <span
                        className={`font-medium ${
                          fussstatus.linksAmputation === "Ja"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {fussstatus.linksAmputation === "Ja" ? "Ja" : "Keine"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-gray-700">
                    Rechter Fuß
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Gesamtzustand:</span>
                      <div className="flex items-center">
                        {(() => {
                          const status = getFootStatusExplanation(
                            fussstatus.rechtsFußstatus
                          );
                          return (
                            <>
                              <status.icon
                                className={`w-4 h-4 mr-1 ${status.color}`}
                              />
                              <span className={`font-medium ${status.color}`}>
                                {status.text}
                              </span>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Wunden:</span>
                      <span
                        className={`font-medium ${
                          fussstatus.rechtsUlcus === "Ja"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {fussstatus.rechtsUlcus === "Ja"
                          ? "Vorhanden"
                          : "Keine"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Amputationen:</span>
                      <span
                        className={`font-medium ${
                          fussstatus.rechtsAmputation === "Ja"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {fussstatus.rechtsAmputation === "Ja" ? "Ja" : "Keine"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Foot Care Information */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2 text-blue-800">
                  Ihre Fußpflege
                </h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Professionelle Fußpflege:</strong>{" "}
                    {fussstatus.podologischeBehandlung === "Ja"
                      ? "Sie erhalten bereits professionelle Fußpflege"
                      : "Noch keine professionelle Fußpflege"}
                  </p>
                  {fussstatus.letztePodoBehandlung && (
                    <p>
                      <strong>Letzte Behandlung:</strong>{" "}
                      {new Date(
                        fussstatus.letztePodoBehandlung
                      ).toLocaleDateString("de-DE")}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                Empfehlungen für Sie
              </h2>
              <div className="space-y-3">
                {(leftRisk.level === "Hoch" ||
                  rightRisk.level === "Hoch" ||
                  leftRisk.level === "Sehr hoch" ||
                  rightRisk.level === "Sehr hoch") && (
                  <div className="bg-orange-100 border border-orange-300 rounded-lg p-3">
                    <p className="text-orange-800 font-medium">
                      ⚠️ Wichtig: Aufgrund Ihres erhöhten Risikos sollten Sie
                      regelmäßig Ihre Füße kontrollieren und bei Veränderungen
                      sofort einen Arzt aufsuchen.
                    </p>
                  </div>
                )}
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-gray-700">
                    <strong>Tägliche Fußkontrolle:</strong> Schauen Sie täglich
                    Ihre Füße an. Achten Sie auf Rötungen, Schwellungen oder
                    Verletzungen.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-gray-700">
                    <strong>Richtige Schuhe:</strong> Tragen Sie ausschließlich
                    die empfohlenen Schuhe. Vermeiden Sie zu enge oder zu weite
                    Schuhe.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-gray-700">
                    <strong>Regelmäßige Kontrollen:</strong> Lassen Sie Ihre
                    Füße regelmäßig von einem Arzt oder Podologen untersuchen.
                  </p>
                </div>
              </div>
            </div>

            {/* Examination Date */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  Untersuchung vom:{" "}
                  {new Date(entry.created_at).toLocaleDateString("de-DE")}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

function autoParseJsonStrings(obj) {
  if (Array.isArray(obj)) return obj.map(autoParseJsonStrings);
  if (obj !== null && typeof obj === "object") {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = autoParseJsonStrings(value);
    }
    return result;
  }
  if (typeof obj === "string") {
    try {
      const trimmed = obj.trim();
      if (
        (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
        (trimmed.startsWith("[") && trimmed.endsWith("]"))
      ) {
        return JSON.parse(trimmed);
      }
    } catch (e) {}
  }
  return obj;
}

export default PatientDashboard;
