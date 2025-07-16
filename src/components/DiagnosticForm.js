import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import DrawableImageCanvas from './DrawableImageCanvas';
import footImage from '../images/foot-image-draw.png';
import riskgroup from '../images/risk-group-t.png';

const DiagnosticForm = forwardRef(({ }, ref) => {
    const [formData, setFormData] = useState({
        patientencode: '',       // was barcodeName
        geschlecht: '',         // was gender
        datum: '',              // was date
        vorname: '',            // was firstName
        groeße: '',             // was height
        diabSchulung: '',       // was podoTreatment
        geburtsdatum: '',       // was birthDate
        gewicht: '',            // was weight
        dauerDiab: '',          // was diabetesDuration
        diabetestyp: '',        // was diabetesType
        diabetesanderertext: '',// was diabetesOtherText
        mrsa: '',               // was mrsaStatus
        anlage: null,
        anlagenSources: null,
        orthoNeuroFindings: '',
        signature: '', //unterschrift
    });

    const [clinicalFindings, setClinicalFindings] = useState([
        {
            label: 'Vibrationsempfindung (am D1-Grundgelenk)',
            leftValue: '',
            rightValue: '',
            note: '/8 (< 4/8 = PNP-Anzeichen)',
            type: 'text',
        },
        {
            label: 'Mikrofilament-Erkennung (am Met.-köpfchen 2 plantar)',
            leftValue: null,  // will use boolean for checkboxes
            rightValue: null,
            note: '(= PNP-Anzeichen)',
            type: 'checkbox-yesno',
        },
        {
            label: 'Hinweis pAVK (periphere arterielle Verschlusskrankheit)',
            leftValue: null,
            rightValue: null,
            type: 'checkbox-yesno-inverse',  // yes/no reversed for left checkbox order
        },
    ]);

    const [fussStatus, setFussStatus] = useState([
        {
            label: '1) Dialysepflichtige Niereninsuffienz',
            type: 'checkbox-yesno',
            appliesTo: 'both',
            value: null,
        },
        {
            label: '2) Drohende dorsale Ulcera (Schuhe aus RG II a nicht passend)',
            type: 'checkbox-yesno',
            leftValue: null,
            rightValue: null,
        },
        {
            label: '3) Präulzerative Veränderungen',
            type: 'checkbox-yesno',
            leftValue: null,
            rightValue: null,
        },
        {
            label: '4) Ulcus',
            type: 'checkbox-multiple',
            options: ['nein', 'ja', 'abgeheilt (s. Einzeichnung)', 'akut (s. Einzeichnung)'],
            leftValue: [],
            rightValue: [],
        },
        {
            label: '5) Zustand nach Zehenamputation',
            type: 'checkbox-yesno',
            leftValue: null,
            rightValue: null,
        },
        {
            label: '6) Fußdeformitäten (z. B. Knick-Senkfuß, Hohlfuß)',
            type: 'checkbox-multiple',
            options: ['nein', 'ja', 'hochgradig'],
            leftValue: [],
            rightValue: [],
        },
        {
            label: '7) Dorsalextension OSG eingeschränkt / Großzehengrundgelenk eingeschränkt',
            type: 'checkbox-multiple',
            options: ['nein', 'ja (<5–10°)', 'nein', 'ja (<10°)'],
            leftValue: [],
            rightValue: [],
        },
        {
            label: '8) Hinweis auf CNO (Charcot-Neuro-Osteoarthropathie)',
            type: 'checkbox-multiple',
            options: ['nein', 'ja', 'inaktiv', 'floride / aktiv'],
            leftValue: [],
            rightValue: [],
        },
        {
            label: '9) Zustand nach (mind. transmetatarsaler) Amputation',
            type: 'checkbox-yesno',
            leftValue: null,
            rightValue: null,
            note: '(s. Einzeichnung)',
        },
    ]);

    const [riskGroupStatus, setRiskGroupStatus] = useState([
        {
            label: 'Typ 0',
            type: 'checkbox-yesno',
            leftValue: false,
            rightValue: false,
        },
        {
            label: 'Typ I',
            type: 'checkbox-yesno',
            leftValue: false,
            rightValue: false,
        },
        {
            label: 'Typ II a',
            type: 'checkbox-yesno',
            leftValue: false,
            rightValue: false,
        },
        {
            label: 'Typ II b',
            type: 'checkbox-yesno',
            leftValue: false,
            rightValue: false,
        },
        {
            label: 'Typ III',
            type: 'checkbox-yesno',
            leftValue: false,
            rightValue: false,
        },
        {
            label: 'Typ IV',
            type: 'checkbox-yesno',
            leftValue: false,
            rightValue: false,
        },
        {
            label: 'Typ V',
            type: 'checkbox-yesno',
            leftValue: false,
            rightValue: false,
        },
        {
            label: 'Typ VI',
            type: 'checkbox-yesno',
            leftValue: false,
            rightValue: false,
        },
        {
            label: 'Typ VII a',
            type: 'checkbox-yesno',
            leftValue: false,
            rightValue: false,
        },
        {
            label: 'Typ VII b',
            type: 'checkbox-yesno',
            leftValue: false,
            rightValue: false,
        },
        {
            label: 'Typ VII c',
            type: 'checkbox-yesno',
            leftValue: false,
            rightValue: false,
        },
        {
            label: 'Typ VII d',
            type: 'checkbox-yesno',
            leftValue: false,
            rightValue: false,
        },
    ]);

    const [hoeherversorgungStatus, setHoeherversorgungStatus] = useState([
        {
            label: 'a. Orthopädische Zusatzkomplikation',
            value: false,
        },
        {
            label: 'b. Neurologische Zusatzkomplikation (motorische Funktionseinschränkung / Parese eines oder beider Beine)',
            value: false,
        },
        {
            label: 'c. Fehlgeschlagene adäquate Vorversorgung',
            value: false,
        },
    ]);

    const [shoeProvisionData, setShoeProvisionData] = useState([
        {
            risikoTyp: "O",
            title: "Fußgerechte Konfektionsschuhe",
            details: [],
            left: [false],
            right: [false],
        },
        {
            risikoTyp: "I",
            title: "Orthopädieschuhtechnische Versorgung",
            details: [
                "mit orthopädischer Einlage",
                "mit Schuhzurichtung",
                "mit Maßschuh",
            ],
            left: [false, false, false],
            right: [false, false, false],
        },
        {
            risikoTyp: "IIa",
            title: "Für DFS geeignete Schuhe",
            details: [
                "mit herausnehmbarer Weichpolstersohle",
                "mit Weichpolsterbettungseinlage (elastisch, druckumverteilend, nach Maß)",
            ],
            left: [false, false],
            right: [false, false],
        },
        {
            risikoTyp: "IIb",
            title: "Spezialschuhe bei DFS mit DAF",
            details: ["mit diabetesadaptierter Fußbettung (DAF)"],
            left: [false],
            right: [false],
        },
        {
            risikoTyp: "III",
            title: "Spezialschuhe bei DFS mit DAF",
            details: [
                "mit diabetesadaptierter Fußbettung (DAF)",
                "mit orthopädischer Schuhzurichtung",
            ],
            left: [false, false],
            right: [false, false],
        },
        {
            risikoTyp: "IV",
            title: "Orthopädische Maßschuhe mit DAF",
            details: ["mit diabetesadaptierter Fußbettung (DAF)"],
            left: [false],
            right: [false],
        },
        {
            risikoTyp: "V",
            title: "Knöchelübergreifende orthopädische Maß schuhe mit DAF",
            details: [
                "USG-stabilisierende Maßnahmen",
                "OSG-stabilisierende Maßnahmen",
                "Komplette Ruhigstellung mit Innenschuh über Wadenbauch",
            ],
            left: [false, false, false],
            right: [false, false, false],
        },
        {
            risikoTyp: "VI",
            title: "(Knöchelübergreifende) orthopädische Maß schuhe mit DAF",
            details: [
                "Knöchelübergreifende Amputationsversorgung",
                "Prothese, ggf. bis zum Knie",
            ],
            left: [false, false],
            right: [false, false],
        },
        {
            risikoTyp: "VIIa",
            title: "Verbandsschuhe",
            details: [],
            left: [false],
            right: [false],
        },
        {
            risikoTyp: "VIIb",
            title: "Individuelle kniehohe Orthese mit DAF",
            details: ["nicht abnehmbar", "abnehmbar"],
            left: [false, false],
            right: [false, false],
        },
        {
            risikoTyp: "VIIc",
            title: "Kniehohe Orthese",
            details: [
                "konfektioniert",
                "individuell",
                "nicht abnehmbar",
                "abnehmbar",
                "Interimsschuh",
            ],
            left: [false, false, false, false, false],
            right: [false, false, false, false, false],
        },
        {
            risikoTyp: "VIId",
            title: "Kniehohe individuelle Fersenentlastungs orthese",
            details: ["nicht abnehmbar", "abnehmbar"],
            left: [false, false],
            right: [false, false],
        },
    ]);


    const [isDiabetesOther, setIsDiabetesOther] = useState(false);
    const [base64Image, setBase64Image] = useState('');
    const canvasRef = useRef();

    const handleChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleRiskGroupChange = (index, side) => {
        setRiskGroupStatus((prev) => {
            const updated = [...prev];
            updated[index][side] = !updated[index][side];
            return updated;
        });
    };

    const handleSubmit = () => {
        if (canvasRef.current) {
            const image = canvasRef.current.triggerExport();
            setBase64Image(image);
            console.log("Exported base64:", image);
        }
    };

    // Expose method to parent
    useImperativeHandle(ref, () => ({
        getFormData: () => {
            const image = canvasRef.current?.triggerExport?.();
            return {
                ...formData,
                clinicalFindings,
                fussStatus,
                base64Image: '',
                riskGroupStatus,
                hoeherversorgungStatus,
                shoeProvisionData
            };
        },
    }));

    return (
        <div>
            {/* Patient Information */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label>Name (Barcode)</label>
                    <input
                        type="text"
                        className="w-full border px-2 py-1"
                        value={formData.patientencode}
                        onChange={(e) => handleChange('patientencode', e.target.value)}
                    />
                </div>

                <div className="flex gap-2 items-center mt-6">
                    <label>Geschlecht:</label>
                    {['männlich', 'weiblich', 'divers'].map((g) => (
                        <label key={g}>
                            <input
                                type="checkbox"
                                checked={formData.geschlecht === g}
                                onChange={() => handleChange('geschlecht', g)}
                            />{' '}
                            {g}
                        </label>
                    ))}
                </div>

                <div>
                    <label>Datum</label>
                    <input
                        type="date"
                        className="w-full border px-2 py-1"
                        value={formData.datum}
                        onChange={(e) => handleChange('datum', e.target.value)}
                    />
                </div>

                <div>
                    <label>Vorname</label>
                    <input
                        type="text"
                        className="w-full border px-2 py-1"
                        value={formData.vorname}
                        onChange={(e) => handleChange('vorname', e.target.value)}
                    />
                </div>

                <div>
                    <label>Größe (cm)</label>
                    <input
                        type="number"
                        className="w-full border px-2 py-1"
                        value={formData.groeße}
                        onChange={(e) => handleChange('groeße', e.target.value)}
                    />
                </div>

                <div>
                    <label>Podologische Behandlung:</label>
                    <div className="flex gap-2">
                        {['ja', 'nein'].map((val) => (
                            <label key={val}>
                                <input
                                    type="checkbox"
                                    checked={formData.diabSchulung === val}
                                    onChange={() => handleChange('diabSchulung', val)}
                                />{' '}
                                {val}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label>Geburtsdatum</label>
                    <input
                        type="date"
                        className="w-full border px-2 py-1"
                        value={formData.geburtsdatum}
                        onChange={(e) => handleChange('geburtsdatum', e.target.value)}
                    />
                </div>

                <div>
                    <label>Gewicht (kg)</label>
                    <input
                        type="number"
                        className="w-full border px-2 py-1"
                        value={formData.gewicht}
                        onChange={(e) => handleChange('gewicht', e.target.value)}
                    />
                </div>

                <div>
                    <label>Dauer des Diab. mell. (Jahre)</label>
                    <input
                        type="number"
                        className="w-full border px-2 py-1"
                        value={formData.dauerDiab}
                        onChange={(e) => handleChange('dauerDiab', e.target.value)}
                    />
                </div>
            </section>

            <section className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="font-semibold">Diab. mell.:</label>
                    <div className="flex gap-4 items-center mt-2">
                        {['Typ 1', 'Typ 2', 'Sonstiges'].map((type) => (
                            <label key={type}>
                                <input
                                    type="checkbox"
                                    checked={
                                        formData.diabetestyp === type ||
                                        (type === 'Sonstiges' && isDiabetesOther)
                                    }
                                    onChange={() => {
                                        handleChange('diabetestyp', type);
                                        if (type === 'Sonstiges') {
                                            setIsDiabetesOther(true);
                                        } else {
                                            setIsDiabetesOther(false);
                                            handleChange('diabetesanderertext', '');
                                        }
                                    }}
                                />{' '}
                                {type}
                            </label>
                        ))}
                        {isDiabetesOther && (
                            <input
                                type="text"
                                className="border px-2 py-1"
                                placeholder="Bitte angeben..."
                                value={formData.diabetesanderertext}
                                onChange={(e) => handleChange('diabetesanderertext', e.target.value)}
                            />
                        )}
                    </div>
                </div>

                <div>
                    <label>MRSA:</label>
                    <div className="flex gap-2">
                        {['ja', 'nein', 'unbekannt'].map((val) => (
                            <label key={val}>
                                <input
                                    type="checkbox"
                                    checked={formData.mrsa === val}
                                    onChange={() => handleChange('mrsa', val)}
                                />{' '}
                                {val}
                            </label>
                        ))}
                    </div>
                </div>
            </section>


            {/* Klinischer Befund */}
            <section className="mb-6">
                <div className="overflow-x-auto border border-black">
                    <table className="w-full text-sm table-fixed border-collapse">
                        <thead>
                            <tr className="bg-cyan-400 text-black">
                                <th className="border border-black px-2 py-1 text-left w-1/3">
                                    <h2 className="font-semibold text-lg">Klinischer Befund</h2>
                                </th>
                                <th className="border border-black px-2 py-1 text-center">linker Fuß</th>
                                <th className="border border-black px-2 py-1 text-center">rechter Fuß</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clinicalFindings.map((item, i) => (
                                <tr key={i}>
                                    <td className="border border-black px-2 py-1 font-semibold">
                                        {item.label}
                                    </td>

                                    {/* Left foot cell */}
                                    <td className="border border-black px-2 py-1 text-center">
                                        {item.type === 'text' && (
                                            <>
                                                <input
                                                    type="text"
                                                    className="border-b border-black text-center w-20"
                                                    value={item.leftValue}
                                                    onChange={(e) => {
                                                        const newArr = [...clinicalFindings];
                                                        newArr[i].leftValue = e.target.value;
                                                        setClinicalFindings(newArr);
                                                    }}
                                                    placeholder=""
                                                />{' '}
                                                <span className="text-xs">{item.note}</span>
                                            </>
                                        )}
                                        {(item.type === 'checkbox-yesno' || item.type === 'checkbox-yesno-inverse') && (
                                            <>
                                                <label className="mr-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.leftValue === (item.type === 'checkbox-yesno' ? true : false)}
                                                        onChange={() => {
                                                            const newArr = [...clinicalFindings];
                                                            newArr[i].leftValue = item.type === 'checkbox-yesno' ? true : false;
                                                            setClinicalFindings(newArr);
                                                        }}
                                                    />{' '}
                                                    {item.type === 'checkbox-yesno' ? 'ja' : 'nein'}
                                                </label>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={item.leftValue === (item.type === 'checkbox-yesno' ? false : true)}
                                                        onChange={() => {
                                                            const newArr = [...clinicalFindings];
                                                            newArr[i].leftValue = item.type === 'checkbox-yesno' ? false : true;
                                                            setClinicalFindings(newArr);
                                                        }}
                                                    />{' '}
                                                    {item.type === 'checkbox-yesno' ? 'nein' : 'ja'}
                                                    {item.note && <span className="text-xs"> {item.note}</span>}
                                                </label>
                                            </>
                                        )}
                                    </td>

                                    {/* Right foot cell */}
                                    <td className="border border-black px-2 py-1 text-center">
                                        {item.type === 'text' && (
                                            <>
                                                <input
                                                    type="text"
                                                    className="border-b border-black text-center w-20"
                                                    value={item.rightValue}
                                                    onChange={(e) => {
                                                        const newArr = [...clinicalFindings];
                                                        newArr[i].rightValue = e.target.value;
                                                        setClinicalFindings(newArr);
                                                    }}
                                                    placeholder=""
                                                />{' '}
                                                <span className="text-xs">{item.note}</span>
                                            </>
                                        )}
                                        {(item.type === 'checkbox-yesno' || item.type === 'checkbox-yesno-inverse') && (
                                            <>
                                                <label className="mr-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.rightValue === (item.type === 'checkbox-yesno' ? true : false)}
                                                        onChange={() => {
                                                            const newArr = [...clinicalFindings];
                                                            newArr[i].rightValue = item.type === 'checkbox-yesno' ? true : false;
                                                            setClinicalFindings(newArr);
                                                        }}
                                                    />{' '}
                                                    {item.type === 'checkbox-yesno' ? 'ja' : 'nein'}
                                                </label>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={item.rightValue === (item.type === 'checkbox-yesno' ? false : true)}
                                                        onChange={() => {
                                                            const newArr = [...clinicalFindings];
                                                            newArr[i].rightValue = item.type === 'checkbox-yesno' ? false : true;
                                                            setClinicalFindings(newArr);
                                                        }}
                                                    />{' '}
                                                    {item.type === 'checkbox-yesno' ? 'nein' : 'ja'}
                                                    {item.note && <span className="text-xs"> {item.note}</span>}
                                                </label>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </section>

            {/* Fußstatus */}
            <section className="mb-6">
                <div className="overflow-x-auto border border-black">
                    <table className="w-full text-sm table-fixed border-collapse">
                        <thead>
                            <tr className="bg-cyan-400 text-black">
                                <th className="border border-black px-2 py-1 text-left w-1/3">
                                    <h2 className="font-semibold text-lg">Fußstatus</h2>
                                </th>
                                <th className="border border-black px-2 py-1 text-center">linker Fuß</th>
                                <th className="border border-black px-2 py-1 text-center">rechter Fuß</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fussStatus.map((item, i) => (
                                <tr key={i}>
                                    <td className="border border-black px-2 py-1 font-semibold">
                                        {item.label}
                                        {item.note && <span className="font-normal text-xs"> {item.note}</span>}
                                    </td>

                                    {/* Applies to both feet (single combined cell) */}
                                    {item.appliesTo === 'both' ? (
                                        <td colSpan={2} className="border border-black px-2 py-1 text-center">
                                            {['nein', 'ja'].map((option) => (
                                                <label key={option} className="mr-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.value === (option === 'ja')}
                                                        onChange={() => {
                                                            const newStatus = [...fussStatus];
                                                            newStatus[i].value = option === 'ja';
                                                            setFussStatus(newStatus);
                                                        }}
                                                    />{' '}
                                                    {option}
                                                </label>
                                            ))}
                                        </td>
                                    ) : (
                                        ['leftValue', 'rightValue'].map((side) => (
                                            <td key={side} className="border border-black px-2 py-1 text-center">
                                                {/* checkbox-yesno */}
                                                {item.type === 'checkbox-yesno' &&
                                                    ['nein', 'ja'].map((option) => (
                                                        <label key={option} className="mr-3">
                                                            <input
                                                                type="checkbox"
                                                                checked={item[side] === (option === 'ja')}
                                                                onChange={() => {
                                                                    const newStatus = [...fussStatus];
                                                                    newStatus[i][side] = option === 'ja';
                                                                    setFussStatus(newStatus);
                                                                }}
                                                            />{' '}
                                                            {option}
                                                            {option === 'ja' && item.note && (
                                                                <span className="text-xs"> {item.note}</span>
                                                            )}
                                                        </label>
                                                    ))}

                                                {/* checkbox-multiple */}
                                                {item.type === 'checkbox-multiple' &&
                                                    item.options.map((option, idx) => (
                                                        <label key={idx} className="block mr-3">
                                                            <input
                                                                type="checkbox"
                                                                checked={item[side]?.includes(option)}
                                                                onChange={() => {
                                                                    const newStatus = [...fussStatus];
                                                                    const current = newStatus[i][side] || [];
                                                                    if (current.includes(option)) {
                                                                        newStatus[i][side] = current.filter((o) => o !== option);
                                                                    } else {
                                                                        newStatus[i][side] = [...current, option];
                                                                    }
                                                                    setFussStatus(newStatus);
                                                                }}
                                                            />{' '}
                                                            {option}
                                                        </label>
                                                    ))}
                                            </td>
                                        ))
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>


            {/* Drawable Image Canvas */}
            <section className="mb-10">
                <DrawableImageCanvas
                    ref={canvasRef}
                    imageSrc={footImage}
                    width={1400}
                    height={620}
                />

            </section>

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
                            value={formData.orthoNeuroFindings}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    orthoNeuroFindings: e.target.value,
                                }))
                            }
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
                                <th className="border border-black px-2 py-1 text-left">
                                    <h2 className="font-semibold text-lg">Kategorisierung nach Risikogruppen</h2>
                                </th>
                                <th className="border border-black px-2 py-1 text-center text-base">linker Fuß</th>
                                <th className="border border-black px-2 py-1 text-center text-base">rechter Fuß</th>
                            </tr>
                        </thead>
                        <tbody className="text-lg">
                            {riskGroupStatus.map((item, index) => (
                                <tr key={index}>
                                    {/* First column: static image with rowspan */}
                                    {index === 0 && (
                                        <td className="border border-black px-2 py-1 text-center" rowSpan={riskGroupStatus.length}>
                                            <img
                                                src={riskgroup}
                                                alt="Risk Group"
                                                className="w-full rounded-lg"
                                            />
                                        </td>
                                    )}
                                    {/* Left foot checkbox */}
                                    <td className="border border-black px-2 py-1 text-center">
                                        <label className="mr-3">
                                            <input
                                                type="checkbox"
                                                checked={item.leftValue}
                                                onChange={() => {
                                                    const updated = [...riskGroupStatus];
                                                    updated[index].leftValue = !updated[index].leftValue;
                                                    setRiskGroupStatus(updated);
                                                }}
                                            />{' '}
                                            {item.label}
                                        </label>
                                    </td>

                                    {/* Right foot checkbox */}
                                    <td className="border border-black px-2 py-1 text-center">
                                        <label className="mr-3">
                                            <input
                                                type="checkbox"
                                                checked={item.rightValue}
                                                onChange={() => {
                                                    const updated = [...riskGroupStatus];
                                                    updated[index].rightValue = !updated[index].rightValue;
                                                    setRiskGroupStatus(updated);
                                                }}
                                            />{' '}
                                            {item.label}
                                        </label>
                                    </td>
                                </tr>
                            ))}
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
                                    <h2 className="font-semibold text-lg">Kriterien für eine höhergradige Versorgung</h2>
                                </th>
                                <th className="border border-black px-2 py-1 text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {hoeherversorgungStatus.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-black px-2 py-1 font-semibold">
                                        {item.label}
                                    </td>
                                    <td className="border border-black px-2 py-1 text-center">
                                        <label className="mr-3">
                                            <input
                                                type="checkbox"
                                                checked={item.value}
                                                onChange={() => {
                                                    const updated = [...hoeherversorgungStatus];
                                                    updated[index].value = !updated[index].value;
                                                    setHoeherversorgungStatus(updated);
                                                }}
                                            />
                                        </label>
                                    </td>
                                </tr>
                            ))}
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
                                <th className="border border-black px-2 py-1 text-left" colSpan={2}>
                                    <h2 className="font-semibold text-lg">
                                        Schuhversorgung (technische Auslegung) gemäß Risikogruppe
                                    </h2>
                                </th>
                                <th className="border border-black px-2 py-1 text-center">linker Fuß</th>
                                <th className="border border-black px-2 py-1 text-center">rechter Fuß</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shoeProvisionData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td className="border border-black px-2 py-1 text-center">
                                        {row.risikoTyp}
                                    </td>
                                    <td className="border border-black px-2 py-1 font-semibold">
                                        {row.title}
                                    </td>
                                    <td className="border border-black px-2 py-1">
                                        {row.details.map((detail, i) => (
                                            <div key={i}>{detail}</div>
                                        ))}
                                    </td>
                                    <td className="border border-black px-2 py-1 text-center">
                                        {row.left.map((checked, i) => (
                                            <label className="mr-3 block" key={i}>
                                                <input
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={() => {
                                                        const updated = [...shoeProvisionData];
                                                        updated[rowIndex].left[i] = !checked;
                                                        setShoeProvisionData(updated);
                                                    }}
                                                />
                                            </label>
                                        ))}
                                    </td>
                                    <td className="border border-black px-2 py-1 text-center">
                                        {row.right.map((checked, i) => (
                                            <label className="mr-3 block" key={i}>
                                                <input
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={() => {
                                                        const updated = [...shoeProvisionData];
                                                        updated[rowIndex].right[i] = !checked;
                                                        setShoeProvisionData(updated);
                                                    }}
                                                />
                                            </label>
                                        ))}
                                    </td>
                                </tr>
                            ))}
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
                                            value={formData.signature}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, signature: e.target.value }))
                                            }
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>


        </div>
    );
});

export default DiagnosticForm;
