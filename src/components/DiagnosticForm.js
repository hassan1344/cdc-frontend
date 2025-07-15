import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import DrawableImageCanvas from './DrawableImageCanvas';
import footImage from '../images/foot-image-draw.png';

const DiagnosticForm = forwardRef(({ }, ref) => {
    const [formData, setFormData] = useState({
        barcodeName: '',
        gender: '',
        date: '',
        firstName: '',
        height: '',
        podoTreatment: '',
        birthDate: '',
        weight: '',
        diabetesDuration: '',
        diabetesType: '',
        diabetesOtherText: '',
        mrsaStatus: '',
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
    const [isDiabetesOther, setIsDiabetesOther] = useState(false);
    const [base64Image, setBase64Image] = useState('');
    const canvasRef = useRef();

    const handleChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        if (canvasRef.current) {
            const image = canvasRef.current.triggerExport(); // 🎯 Export image
            setBase64Image(image); // For preview only (not for getFormData)
            console.log("Exported base64:", image);
        }
    };

    // Expose method to parent
    useImperativeHandle(ref, () => ({
        getFormData: () => {
            const image = canvasRef.current?.triggerExport?.(); // 🧠 Safe access
            return {
                ...formData,
                clinicalFindings,
                fussStatus,
                base64Image: image || '', // Always returns latest export
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
                        value={formData.barcodeName}
                        onChange={(e) => handleChange('barcodeName', e.target.value)}
                    />
                </div>

                <div className="flex gap-2 items-center mt-6">
                    <label>Geschlecht:</label>
                    {['männlich', 'weiblich', 'divers'].map((g) => (
                        <label key={g}>
                            <input
                                type="checkbox"
                                checked={formData.gender === g}
                                onChange={() => handleChange('gender', g)}
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
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                    />
                </div>

                <div>
                    <label>Vorname</label>
                    <input
                        type="text"
                        className="w-full border px-2 py-1"
                        value={formData.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                    />
                </div>

                <div>
                    <label>Größe (cm)</label>
                    <input
                        type="number"
                        className="w-full border px-2 py-1"
                        value={formData.height}
                        onChange={(e) => handleChange('height', e.target.value)}
                    />
                </div>

                <div>
                    <label>Podologische Behandlung:</label>
                    <div className="flex gap-2">
                        {['ja', 'nein'].map((val) => (
                            <label key={val}>
                                <input
                                    type="checkbox"
                                    checked={formData.podoTreatment === val}
                                    onChange={() => handleChange('podoTreatment', val)}
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
                        value={formData.birthDate}
                        onChange={(e) => handleChange('birthDate', e.target.value)}
                    />
                </div>

                <div>
                    <label>Gewicht (kg)</label>
                    <input
                        type="number"
                        className="w-full border px-2 py-1"
                        value={formData.weight}
                        onChange={(e) => handleChange('weight', e.target.value)}
                    />
                </div>

                <div>
                    <label>Dauer des Diab. mell. (Jahre)</label>
                    <input
                        type="number"
                        className="w-full border px-2 py-1"
                        value={formData.diabetesDuration}
                        onChange={(e) => handleChange('diabetesDuration', e.target.value)}
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
                                        formData.diabetesType === type ||
                                        (type === 'Sonstiges' && isDiabetesOther)
                                    }
                                    onChange={() => {
                                        handleChange('diabetesType', type);
                                        if (type === 'Sonstiges') {
                                            setIsDiabetesOther(true);
                                        } else {
                                            setIsDiabetesOther(false);
                                            handleChange('diabetesOtherText', '');
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
                                value={formData.diabetesOtherText}
                                onChange={(e) =>
                                    handleChange('diabetesOtherText', e.target.value)
                                }
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
                                    checked={formData.mrsaStatus === val}
                                    onChange={() => handleChange('mrsaStatus', val)}
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
                                        {item.label} {item.note && <span className="font-normal">{item.note}</span>}
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

            <section className="mb-10">
                <DrawableImageCanvas
                    ref={canvasRef}
                    imageSrc={footImage}
                    width={1400}
                    height={620}
                />

            </section>

        </div>
    );
});

export default DiagnosticForm;
