import { useState } from "react";
import { calculateAge } from "../utils/calculateAge";

export default function PatientDetailsModal({ entries }) {
  const generalInfo = entries[0].allgemeineDaten || "{}";
  const age = calculateAge(generalInfo.geburtsdatum);

  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") return "N/A";
    if (typeof value === "boolean") return value ? "Ja" : "Nein";
    return value;
  };

  const getRiskTypeColor = (riskType) => {
    switch (riskType) {
      case "Typ I":
        return "bg-green-100 text-green-800";
      case "Typ II":
        return "bg-yellow-100 text-yellow-800";
      case "Typ III":
        return "bg-orange-100 text-orange-800";
      case "Typ IV":
        return "bg-red-100 text-red-800";
      default:
        return "bg-red-300 text-red-800";
    }
  };

  const renderImageSources = (anlagenSources) => {
    if (!anlagenSources || anlagenSources.length === 0) return null;

    return (
      <div className="mt-4">
        <h4 className="font-medium underline mb-2">Anlagen</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {anlagenSources.map((source, index) => (
            <div key={index} className="border rounded-lg p-2">
              <img
                src={source}
                alt={`Anlage ${index + 1}`}
                className="w-full h-32 object-cover rounded mb-2"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <p className="text-sm text-gray-600">Anlage {index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      {/* General Information */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">
          Allgemeine Informationen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <p>
              <span className="font-medium">Alter:</span>{" "}
              <strong>{age} Jahre</strong>
            </p>
            <p>
              <span className="font-medium">Geschlecht:</span>{" "}
              <strong>{formatValue(generalInfo.geschlecht)}</strong>
            </p>
            <p>
              <span className="font-medium">Größe:</span>{" "}
              <strong>{formatValue(generalInfo.groeße)} cm</strong>
            </p>
            <p>
              <span className="font-medium">Gewicht:</span>{" "}
              <strong>{formatValue(generalInfo.gewicht)} kg</strong>
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Diabetes Typ:</span>{" "}
              <strong>{formatValue(generalInfo.diabetestyp)}</strong>
            </p>
            <p>
              <span className="font-medium">Dauer der Diabetes:</span>{" "}
              <strong>{formatValue(generalInfo.dauerDiab)} Jahre</strong>
            </p>
            <p>
              <span className="font-medium">Diabetesschulung:</span>{" "}
              <strong>{formatValue(generalInfo.diabSchulung)}</strong>
            </p>
            <p>
              <span className="font-medium">MRSA:</span>{" "}
              <strong>{formatValue(generalInfo.mrsa)}</strong>
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Letzte Untersuchung:</span>{" "}
              <strong>{formatValue(generalInfo.datum)}</strong>
            </p>
            <p>
              <span className="font-medium">Anlagen:</span>{" "}
              <strong>{formatValue(generalInfo.anlage)}</strong>
            </p>
          </div>
        </div>

        {generalInfo.anlagenSources &&
          renderImageSources(generalInfo.anlagenSources)}
      </div>

      {/* Examination Entries */}
      {entries
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((entry, index) => {
          const klinisch = entry.klinischerBefund || "{}";
          const kategorisierung = entry.kategorisierung || "{}";
          const fussstatus = entry.fussstatus || "{}";
          const fussstatusGrafik = entry.fussstatusGrafik || "{}";
          const kriterien = entry.kriterien || "{}";
          const schuhversorgung = entry.schuhversorgung || "{}";
          const funktionelleTests = entry.funktionelleTests || "{}";

          return (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 mb-6 border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Untersuchung vom{" "}
                {new Date(entry.created_at).toLocaleDateString("de-DE")}
              </h3>

              {/* Risk Categories */}
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3 text-gray-700">
                  Risikotyp Kategorisierung
                </h4>
                <div className="flex flex-wrap gap-4">
                  <div
                    className={`px-4 py-2 rounded-full ${getRiskTypeColor(
                      kategorisierung.linksRisikotyp
                    )}`}
                  >
                    <strong>
                      Links: {formatValue(kategorisierung.linksRisikotyp)}
                    </strong>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full ${getRiskTypeColor(
                      kategorisierung.rechtsRisikotyp
                    )}`}
                  >
                    <strong>
                      Rechts: {formatValue(kategorisierung.rechtsRisikotyp)}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Clinical Findings */}
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3 text-gray-700">
                  Klinischer Befund
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-600 mb-2">
                      Linker Fuß
                    </h5>
                    <div className="space-y-1 text-sm">
                      <p>
                        Vibrationsempfindung:{" "}
                        <strong>
                          {formatValue(klinisch.linksVibrationsempfindung)}
                        </strong>
                      </p>
                      <p>
                        Mikrofilament:{" "}
                        <strong>
                          {formatValue(klinisch.linksMikrofilament)}
                        </strong>
                      </p>
                      <p>
                        Hinweis PNP:{" "}
                        <strong>{formatValue(klinisch.linksHinweisPNP)}</strong>
                      </p>
                      <p>
                        Hinweis PAVK:{" "}
                        <strong>
                          {formatValue(klinisch.linksHinweisPAVK)}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-600 mb-2">
                      Rechter Fuß
                    </h5>
                    <div className="space-y-1 text-sm">
                      <p>
                        Vibrationsempfindung:{" "}
                        <strong>
                          {formatValue(klinisch.rechtsVibrationsempfindung)}
                        </strong>
                      </p>
                      <p>
                        Mikrofilament:{" "}
                        <strong>
                          {formatValue(klinisch.rechtsMikrofilament)}
                        </strong>
                      </p>
                      <p>
                        Hinweis PNP:{" "}
                        <strong>
                          {formatValue(klinisch.rechtsHinweisPNP)}
                        </strong>
                      </p>
                      <p>
                        Hinweis PAVK:{" "}
                        <strong>
                          {formatValue(klinisch.rechtsHinweisPAVK)}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Foot Status */}
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3 text-gray-700">
                  Fußstatus
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-600 mb-2">
                      Linker Fuß
                    </h5>
                    <div className="space-y-1 text-sm">
                      <p>
                        Fußstatus:{" "}
                        <strong>
                          {formatValue(fussstatus.linksFußstatus)}
                        </strong>
                      </p>
                      <p>
                        Amputation:{" "}
                        <strong>
                          {formatValue(fussstatus.linksAmputation)}
                        </strong>
                      </p>
                      <p>
                        Osteoarthropathie:{" "}
                        <strong>
                          {formatValue(fussstatus.linksOsteoarthropathie)}
                        </strong>
                      </p>
                      <p>
                        Ulcus:{" "}
                        <strong>{formatValue(fussstatus.linksUlcus)}</strong>
                      </p>
                      <p>
                        Pedografischer Befund:{" "}
                        <strong>
                          {formatValue(fussstatus.linksPedograpischerBefund)}
                        </strong>
                      </p>
                      <p>
                        Fußdeformitäten:{" "}
                        <strong>
                          {formatValue(fussstatus.linksFußdeformitäten)}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-600 mb-2">
                      Rechter Fuß
                    </h5>
                    <div className="space-y-1 text-sm">
                      <p>
                        Fußstatus:{" "}
                        <strong>
                          {formatValue(fussstatus.rechtsFußstatus)}
                        </strong>
                      </p>
                      <p>
                        Amputation:{" "}
                        <strong>
                          {formatValue(fussstatus.rechtsAmputation)}
                        </strong>
                      </p>
                      <p>
                        Osteoarthropathie:{" "}
                        <strong>
                          {formatValue(fussstatus.rechtsOsteoarthropathie)}
                        </strong>
                      </p>
                      <p>
                        Ulcus:{" "}
                        <strong>{formatValue(fussstatus.rechtsUlcus)}</strong>
                      </p>
                      <p>
                        Pedografischer Befund:{" "}
                        <strong>
                          {formatValue(fussstatus.rechtsPedograpischerBefund)}
                        </strong>
                      </p>
                      <p>
                        Fußdeformitäten:{" "}
                        <strong>
                          {formatValue(fussstatus.rechtsFußdeformitäten)}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm">
                    Podologische Behandlung:{" "}
                    <strong>
                      {formatValue(fussstatus.podologischeBehandlung)}
                    </strong>
                  </p>
                  <p className="text-sm">
                    Letzte Behandlung:{" "}
                    <strong>
                      {formatValue(fussstatus.letztePodoBehandlung)}
                    </strong>
                  </p>
                </div>
              </div>

              {/* Foot Status Graphics */}
              {fussstatusGrafik.grafikDaten && (
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-3 text-gray-700">
                    Fußstatus Grafik
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(fussstatusGrafik.grafikDaten).map(
                        ([key, values]) => (
                          <div key={key} className="text-sm">
                            <strong>{key}:</strong>{" "}
                            {Array.isArray(values) ? values.join(", ") : values}
                          </div>
                        )
                      )}
                    </div>
                    {fussstatusGrafik.imgURL && (
                      <div className="mt-4">
                        <img
                          src={fussstatusGrafik.imgURL}
                          alt="Fußstatus Grafik"
                          className="max-w-full h-auto rounded border"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Criteria */}
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3 text-gray-700">
                  Kriterien
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(kriterien).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <span className="font-medium">{key}:</span>{" "}
                      <strong>{formatValue(value)}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shoe Supply */}
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3 text-gray-700">
                  Schuhversorgung
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(schuhversorgung)
                      .filter(
                        ([key, value]) =>
                          value !== null && value !== undefined && value !== ""
                      )
                      .map(([key, value]) => (
                        <div key={key} className="text-sm">
                          <span className="font-medium">{key}:</span>{" "}
                          <strong>{formatValue(value)}</strong>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Functional Tests */}
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3 text-gray-700">
                  Funktionelle Tests
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-600 mb-2">
                      Linker Fuß
                    </h5>
                    <div className="space-y-1 text-sm">
                      <p>
                        Push-Up:{" "}
                        <strong>
                          {formatValue(funktionelleTests.linksPushUp)}
                        </strong>
                      </p>
                      <p>
                        Dorsalextension:{" "}
                        <strong>
                          {formatValue(funktionelleTests.linksDorsalextension)}
                        </strong>
                      </p>
                      <p>
                        Plantarflexion:{" "}
                        <strong>
                          {formatValue(funktionelleTests.linksPlantarflexion)}
                        </strong>
                      </p>
                      <p>
                        Silf Test:{" "}
                        <strong>
                          {formatValue(funktionelleTests.linksSilfTest)}
                        </strong>
                      </p>
                      <p>
                        Vorfuß Entlastung:{" "}
                        <strong>
                          {formatValue(funktionelleTests.linksVorfußEntlastung)}
                        </strong>
                      </p>
                      <p>
                        Vorfuß Belastung:{" "}
                        <strong>
                          {formatValue(funktionelleTests.linksVorfußBelastung)}
                        </strong>
                      </p>
                      <p>
                        Zehen Krallenzehen:{" "}
                        <strong>
                          {formatValue(
                            funktionelleTests.linksZehenBelastungKrallenzehen
                          )}
                        </strong>
                      </p>
                      <p>
                        Belastung Erster Strahl:{" "}
                        <strong>
                          {formatValue(
                            funktionelleTests.linksBelastungErsterStrahl
                          )}
                        </strong>
                      </p>
                      <p>
                        Coleman Test:{" "}
                        <strong>
                          {formatValue(funktionelleTests.linksColemanTest)}
                        </strong>
                      </p>
                      <p>
                        Gang Innenrotiert:{" "}
                        <strong>
                          {formatValue(funktionelleTests.linksGangInnenrotiert)}
                        </strong>
                      </p>
                      <p>
                        Gang Außenrotiert:{" "}
                        <strong>
                          {formatValue(funktionelleTests.linksGangAußenrotiert)}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-600 mb-2">
                      Rechter Fuß
                    </h5>
                    <div className="space-y-1 text-sm">
                      <p>
                        Push-Up:{" "}
                        <strong>
                          {formatValue(funktionelleTests.rechtsPushUp)}
                        </strong>
                      </p>
                      <p>
                        Dorsalextension:{" "}
                        <strong>
                          {formatValue(funktionelleTests.rechtsDorsalextension)}
                        </strong>
                      </p>
                      <p>
                        Plantarflexion:{" "}
                        <strong>
                          {formatValue(funktionelleTests.rechtsPlantarflexion)}
                        </strong>
                      </p>
                      <p>
                        Silf Test:{" "}
                        <strong>
                          {formatValue(funktionelleTests.rechtsSilfTest)}
                        </strong>
                      </p>
                      <p>
                        Vorfuß Entlastung:{" "}
                        <strong>
                          {formatValue(
                            funktionelleTests.rechtsVorfußEntlastung
                          )}
                        </strong>
                      </p>
                      <p>
                        Vorfuß Belastung:{" "}
                        <strong>
                          {formatValue(funktionelleTests.rechtsVorfußBelastung)}
                        </strong>
                      </p>
                      <p>
                        Zehen Krallenzehen:{" "}
                        <strong>
                          {formatValue(
                            funktionelleTests.rechtsZehenBelastungKrallenzehen
                          )}
                        </strong>
                      </p>
                      <p>
                        Zehen Drehen Ein:{" "}
                        <strong>
                          {formatValue(
                            funktionelleTests.rechtsZehenBelastungDrehenEin
                          )}
                        </strong>
                      </p>
                      <p>
                        Belastung Erster Strahl:{" "}
                        <strong>
                          {formatValue(
                            funktionelleTests.rechtsBelastungErsterStrahl
                          )}
                        </strong>
                      </p>
                      <p>
                        Coleman Test:{" "}
                        <strong>
                          {formatValue(funktionelleTests.rechtsColemanTest)}
                        </strong>
                      </p>
                      <p>
                        Coleman Test Höhe:{" "}
                        <strong>
                          {formatValue(funktionelleTests.rechtsColeTestHoehe)}
                        </strong>
                      </p>
                      <p>
                        Gang Innenrotiert:{" "}
                        <strong>
                          {formatValue(
                            funktionelleTests.rechtsGangInnenrotiert
                          )}
                        </strong>
                      </p>
                      <p>
                        Gang Außenrotiert:{" "}
                        <strong>
                          {formatValue(
                            funktionelleTests.rechtsGangAußenrotiert
                          )}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <p>
                    Erstellt am:{" "}
                    <strong>
                      {new Date(entry.created_at).toLocaleString("de-DE")}
                    </strong>
                  </p>
                  <p>
                    Aktualisiert am:{" "}
                    <strong>
                      {new Date(entry.updated_at).toLocaleString("de-DE")}
                    </strong>
                  </p>
                  <p>
                    Befundbogen ID: <strong>{entry.befundbogenID}</strong>
                  </p>
                  <p>
                    Partner ID: <strong>{entry.partnerID}</strong>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
