import React, { useState, useRef } from 'react';
import riskgroup from '../../images/risk-group-t.png';
import '../../App.css';
import DiagnosticForm from '../../components/DiagnosticForm';


const DiagnosticSheet = () => {

  const [patientData, setPatientData] = useState({});
  const [isSonstigesChecked, setIsSonstigesChecked] = useState(false);
  const [base64Image, setBase64Image] = useState('');
  const formRef = useRef();

  const handleSubmit = () => {
    // get the form data via the ref method exposed inside DiagnosticForm
    const data = formRef.current.getFormData();
    console.log('All form data:', data);
    console.log('All form data clinicalFindings:', data.clinicalFindings);
    console.log('All form data fussStatus:', data.fussStatus);
    console.log('All form data base64Image:', data.base64Image.toString());
    // do something with data, e.g., send to server
  };

  return (
    <div className="card-container">
      <div className="min-h-screen bg-white px-8 py-6 text-sm text-gray-800">
        {/* Header: Top Table and Branding */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-end space-x-2 text-xs font-semibold">
            {/* Left-side label */}


            {/* Geltungsbereich Column */}
            <div className="flex flex-col">
              <div className="text-center">
                <div className="text-base font-bold mr-4">V0402 K</div>
              </div>
              <div className="text-base bg-cyan-400 text-black px-2 py-1 border-b border-black">
                Geltungsbereich
              </div>
            </div>

            {/* Headers and Values */}
            {['GL', 'KO', 'PS', 'PD', 'VW', 'FE', 'EP'].map((label, index) => (
              <div key={index} className="flex flex-col border border-black text-center">
                <div
                  className={`px-2 py-1 border-b border-black ${['PD', 'EP'].includes(label) ? 'bg-white font-bold' : 'bg-gray-100'
                    }`}
                >
                  {label}
                </div>
                <div className="px-2 py-1">{['–', '–', '–', 'X', '–', '–', 'X'][index]}</div>
              </div>
            ))}
          </div>


          <div className="text-center md:text-left mt-4 md:mt-0">
            <h1 className="text-2xl font-extrabold tracking-wide mb-1">BEFUNDBOGEN</h1>
            <div className="flex items-center space-x-1">
              <div className="text-black font-bold text-lg">move</div>
              <div className="text-cyan-600 text-sm italic">diab</div>
              <div className="text-black text-sm">control®</div>
            </div>
          </div>
        </div>

        <>
          <DiagnosticForm ref={formRef} />
          {/* Orthopädische / neurologische Zusatzbefunde */}
        <section className="mb-6">
          <div className="border border-black">
            <div className="bg-cyan-400 border-b border-black px-2 py-2">
              <h2 className="font-semibold text-lg">
                Orthopädische / neurologische Zusatzbefunde, Gangabweichung (z. B. Rheuma, Endoprothetik, Lähmungen):
              </h2>
            </div>
            <div className="px-2 py-3">
              <textarea
                className="w-full border-b border-black px-2 py-1 resize-none"
                rows={4}
                placeholder="Bitte angeben..."
              ></textarea>
            </div>
          </div>
        </section>

        {/*  Kategorisierung nach Risikogruppen */}
        <section className="mb-6">

          <div className="overflow-x-auto border border-black">
            <table className="w-full text-sm table-fixed border-collapse">
              <colgroup>
                <col style={{ width: '60%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
              </colgroup>
              <thead>
                <tr className="bg-cyan-400 text-black">
                  <th className="border border-black px-2 py-1 text-left w-1/3">
                    <h2 className="font-semibold text-lg">
                      Kategorisierung nach Risikogruppen
                    </h2></th>
                  <th className="border border-black px-2 py-1 text-center text-base">linker Fuß</th>
                  <th className="border border-black px-2 py-1 text-center text-base">rechter Fuß</th>
                </tr>
              </thead>
              <tbody className="text-lg">
                {/* Row 1 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center" rowSpan={12}>
                    <img
                      src={riskgroup}
                      alt="Risk Group"
                      className="w-full rounded-lg"
                    />
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ 0</label>
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ 0</label>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ I</label>
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ I</label>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ II a</label>
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ II a</label>
                  </td>
                </tr>
                {/* Row 4 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ II b</label>
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ II b</label>
                  </td>
                </tr>
                {/* Row 5 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ III</label>
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ III</label>
                  </td>
                </tr>
                {/* Row 6 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ IV</label>
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ IV</label>
                  </td>
                </tr>
                {/* Row 7 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ V</label>
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ V</label>
                  </td>
                </tr>
                {/* Row 8 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ VI</label>
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ VI</label>
                  </td>
                </tr>
                {/* Row 9 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ VII a</label>
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ VII a</label>
                  </td>
                </tr>
                {/* Row 10 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ VII b</label>
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ VII b</label>
                  </td>
                </tr>
                {/* Row 11 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ VII c</label>
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ VII c</label>
                  </td>
                </tr>
                {/* Row 12 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ VII d</label>
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /> Typ VII d</label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Kriterien für eine höhergradige Versorgung */}
        <section className="mb-6">

          <div className="overflow-x-auto border border-black">
            <table className="w-full text-sm table-fixed border-collapse">
              <colgroup>
                <col style={{ width: '80%' }} />
                <col style={{ width: '20%' }} />
              </colgroup>
              <thead>
                <tr className="bg-cyan-400 text-black">
                  <th className="border border-black px-2 py-1 text-left w-1/3">
                    <h2 className="font-semibold text-lg">
                      Kriterien für eine höhergradige Versorgung
                    </h2></th>
                  <th className="border border-black px-2 py-1 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="border border-black px-2 py-1 font-semibold">
                    a. Orthopädische Zusatzkomplikation
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr>
                  <td className="border border-black px-2 py-1 font-semibold">
                    b. Neurologische Zusatzkomplikation (motorische Funktionseinschränkung / Parese eines oder beider Beine)
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr>
                  <td className="border border-black px-2 py-1 font-semibold">
                    c. Fehlgeschlagene adäquate Vorversorgung
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Schuhversorgung (technische Auslegung) gemäß Risikogruppe */}
        <section className="mb-6">

          <div className="overflow-x-auto border border-black">
            <table className="w-full text-sm table-fixed border-collapse">
              <colgroup>
                <col style={{ width: '10%' }} />
                <col style={{ width: '35%' }} />
                <col style={{ width: '35%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              <thead>
                <tr className="bg-cyan-400 text-black">
                  <th className="border border-black px-2 py-1 text-center">Risiko-Typ</th>
                  <th className="border border-black px-2 py-1 text-left w-1/3" colSpan={2}>
                    <h2 className="font-semibold text-lg">
                      Schuhversorgung (technische Auslegung) gemäß Risikogruppe
                    </h2></th>
                  <th className="border border-black px-2 py-1 text-center">linker Fuß</th>
                  <th className="border border-black px-2 py-1 text-center">rechter Fuß</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    O
                  </td>
                  <td className="border border-black px-2 py-1 font-semibold">
                    Fußgerechte Konfektionsschuhe
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label>
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    I
                  </td>
                  <td className="border border-black px-2 py-1 font-semibold">
                    Orthopädieschuhtechnische Versorgung
                  </td>
                  <td className="border border-black px-2 py-1">
                    mit orthopädischer Einlage<br />
                    mit Schuhzurichtung<br />
                    mit Maßschuh
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                </tr>
                {/* Row 3 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    IIa
                  </td>
                  <td className="border border-black px-2 py-1 font-semibold">
                    Für DFS geeignete Schuhe
                  </td>
                  <td className="border border-black px-2 py-1">
                    mit herausnehmbarer Weichpolstersohle<br />
                    mit Weichpolsterbettungseinlage (elastisch, druckumverteilend, nach Maß)
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                </tr>
                {/* Row 4 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    IIb
                  </td>
                  <td className="border border-black px-2 py-1 font-semibold">
                    Spezialschuhe bei DFS mit DAF
                  </td>
                  <td className="border border-black px-2 py-1">
                    mit diabetesadaptierter Fußbettung (DAF)
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                </tr>
                {/* Row 5 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    III
                  </td>
                  <td className="border border-black px-2 py-1 font-semibold">
                    Spezialschuhe bei DFS mit DAF
                  </td>
                  <td className="border border-black px-2 py-1">
                    mit diabetesadaptierter Fußbettung (DAF) <br />
                    mit orthopädischer Schuhzurichtung
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                </tr>
                {/* Row 6 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    IV
                  </td>
                  <td className="border border-black px-2 py-1 font-semibold">
                    Orthopädische Maßschuhe mit DAF
                  </td>
                  <td className="border border-black px-2 py-1">
                    mit diabetesadaptierter Fußbettung (DAF)
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                </tr>
                {/* Row 7 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    V
                  </td>
                  <td className="border border-black px-2 py-1 font-semibold">
                    Knöchelübergreifende orthopädische Maß schuhe mit DAF
                  </td>
                  <td className="border border-black px-2 py-1">
                    USG-stabilisierende Maßnahmen<br />
                    OSG-stabilisierende Maßnahmen<br />
                    Komplette Ruhigstellung mit Innenschuh über Wadenbauch<br />
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                </tr>
                {/* Row 8 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    VI
                  </td>
                  <td className="border border-black px-2 py-1 font-semibold">
                    (Knöchelübergreifende) orthopädische Maß schuhe mit DAF
                  </td>
                  <td className="border border-black px-2 py-1">
                    Knöchelübergreifende Amputationsversorgung <br />
                    Prothese, ggf. bis zum Knie
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                </tr>
                {/* Row 9 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    VIIa
                  </td>
                  <td className="border border-black px-2 py-1 font-semibold">
                    Verbandsschuhe
                  </td>
                  <td className="border border-black px-2 py-1">
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                </tr>
                {/* Row 10 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    VIIb
                  </td>
                  <td className="border border-black px-2 py-1 font-semibold">
                    Individuelle kniehohe Orthese mit DAF
                  </td>
                  <td className="border border-black px-2 py-1">
                    nicht abnehmbar<br />
                    abnehmbar
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                </tr>
                {/* Row 11 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    VIIc
                  </td>
                  <td className="border border-black px-2 py-1 font-semibold">
                    Kniehohe Orthese
                  </td>
                  <td className="border border-black px-2 py-1">
                    konfektioniert<br />
                    individuell<br />
                    nicht abnehmbar<br />
                    abnehmbar<br />
                    Interimsschuh
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                </tr>
                {/* Row 12 */}
                <tr>
                  <td className="border border-black px-2 py-1 text-center">
                    VIId
                  </td>
                  <td className="border border-black px-2 py-1 font-semibold">
                    Kniehohe individuelle Fersenentlastungs orthese
                  </td>
                  <td className="border border-black px-2 py-1">
                    nicht abnehmbar<br />
                    abnehmbar
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                  <td className="border border-black px-2 py-1 text-center">
                    <label className="mr-3"><input type="checkbox" /></label><br />
                    <label className="mr-3"><input type="checkbox" /></label><br />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Signature */}
        <section className="mb-6">

          <div className="overflow-x-auto border border-black">
            <table className="w-full text-sm table-fixed border-collapse">
              <colgroup>
                <col style={{ width: '30%' }} />
                <col style={{ width: '70%' }} />
              </colgroup>
              <tbody>
                <tr className="h-16">
                  <td className="border border-black px-2 py-3 font-semibold">
                    <span className="ml-6">ggf. Anlage beachten!</span>
                  </td>
                  <td className="border border-black px-2 py-3 font-semibold">
                    <div className="flex items-center gap-2">
                      <span>Unterschrift:</span>
                      <input
                        type="text"
                        className="border-b border-black flex-1 outline-none"
                        placeholder=""
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
          >
            Submit All Form Data
          </button>
        </>

        

        
      </div>
    </div>
  );
};

export default DiagnosticSheet;
