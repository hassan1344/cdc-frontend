export const preAssessmentQuestions = [
  {
    id: "A",
    title: "A. Persönliche Angaben",
    questions: [
      {
        id: "walking_distance_pre",
        text: "1. Wie weit können Sie aktuell gehen?",
        icf: "ICF: d450 Gehen",
        type: "radio",
        options: [
          {
            text: "Ich kann mich nur in meiner Wohnung bewegen (0-10 Meter)",
            emoji: "🏠",
          },
          { text: "Ich kann zum Nachbarn gehen (10-50 Meter)", emoji: "👋" },
          {
            text: "Ich kann bis zur Straßenecke gehen (50-200 Meter)",
            emoji: "🚶",
          },
          {
            text: "Ich kann zu Geschäften in der Nachbarschaft gehen (200 Meter - 1 Kilometer)",
            emoji: "🏪",
          },
          {
            text: "Ich kann längere Strecken ohne Pause gehen (mehr als 1 Kilometer)",
            emoji: "🚶‍♂️💪",
          },
        ],
      },
      {
        id: "conditions",
        text: "2. Welche der folgenden Erkrankungen haben Sie?",
        subtitle: "(Mehrfachantwort möglich)",
        type: "checkbox",
        options: [
          { text: "Diabetes", emoji: "💉" },
          { text: "Rheumatoide Arthritis", emoji: "🦴" },
          {
            text: "Fußfehlstellung (z. B. Plattfuß, Krallenzehen, Hallux valgus)",
            emoji: "👣",
          },
          { text: "Muskelerkrankung", emoji: "💪" },
          { text: "Sonstiges", emoji: "📝" },
        ],
      },
    ],
  },
  {
    id: "B",
    title: "B. Aktuelle Situation",
    questions: [
      {
        id: "wounds",
        text: "3. Haben Sie Wunden oder Geschwüre an Füßen oder Knöcheln?",
        icf: "ICF: b810 Schutzfunktion der Haut",
        type: "radio",
        options: [
          { text: "Ja", emoji: "✅" },
          { text: "Nein", emoji: "❌" },
        ],
      },
      {
        id: "wounds_image",
        text: "4. Bitte markieren Sie die Stelle der Wunden/Geschwüre auf der Abbildung.",
        type: "wounds_image",
        options: [{ text: "Körperstelle auswählen", emoji: "📍" }],
        conditional: {
          dependsOn: "wounds",
          showIf: "Ja",
        },
      },
    ],
  },
  {
    id: "C",
    title: "C. Erwartungen an die orthopädischen Schuhe",
    questions: [
      {
        id: "expect_fewer_wounds",
        text: "5. Erwarten Sie durch die Schuhe weniger Wunden an Ihren Füßen?",
        icf: "ICF: b810, d450",
        type: "radio",
        options: [
          { text: "Ja", emoji: "✅" },
          { text: "Nein", emoji: "❌" },
          { text: "Nicht zutreffend", emoji: "🤷" },
        ],
        conditional: {
          dependsOn: "wounds",
          showIf: "Ja",
        },
      },
    ],
  },
  {
    id: "D",
    title: "D. Gespräch mit dem Arzt",
    questions: [
      {
        id: "doctor_listening",
        text: "6. Wie gut hat Ihnen der Arzt zugehört?",
        icf: "ICF: d710 Interaktionen mit medizinischem Personal",
        type: "scale",
        scale: { min: "sehr schlecht", max: "sehr gut" },
        scaleOptions: [
          { value: 0, emoji: "😤", label: "Sehr schlecht" },
          { value: 1, emoji: "😕", label: "Schlecht" },
          { value: 2, emoji: "😐", label: "Neutral" },
          { value: 3, emoji: "😊", label: "Gut" },
          { value: 4, emoji: "🤩", label: "Sehr gut" },
        ],
        conditional: {
          dependsOn: "wounds",
          showIf: "Ja",
        },
      },
      {
        id: "doctor_discussion",
        text: "7. Hat der Arzt mit Ihnen besprochen, was Sie von den Schuhen erwarten können?",
        type: "radio",
        options: [
          { text: "Ja", emoji: "✅" },
          { text: "Nein", emoji: "❌" },
          { text: "Weiß nicht", emoji: "🤷" },
        ],
      },
      {
        id: "doctor_experience",
        text: "8. Haben Sie nach dem Gespräch Ihre Erwartungen angepasst?",
        type: "radio",
        options: [
          { text: "Ja, ich erwarte jetzt mehr", emoji: "📈" },
          { text: "Ja, ich erwarte jetzt weniger", emoji: "📉" },
          {
            text: "Nein, meine Erwartungen sind gleich geblieben",
            emoji: "➡️",
          },
          { text: "Ich hatte keine Erwartungen", emoji: "🤷" },
        ],
      },
    ],
  },
  {
    id: "E",
    title: "E. Gespräch mit dem Orthopädietechniker",
    questions: [
      {
        id: "technician_listening",
        text: "9. Wie gut hat Ihnen der Techniker zugehört?",
        icf: "ICF: d710",
        type: "scale",
        scaleOptions: [
          { value: 0, emoji: "😤", label: "Sehr schlecht" },
          { value: 1, emoji: "😕", label: "Schlecht" },
          { value: 2, emoji: "😐", label: "Neutral" },
          { value: 3, emoji: "😊", label: "Gut" },
          { value: 4, emoji: "🤩", label: "Sehr gut" },
        ],
        conditional: {
          dependsOn: "doctor_discussion",
          showIf: "Ja",
        },
      },
      {
        id: "technician_discussion",
        text: "10. Hat der Techniker mit Ihnen besprochen, was Sie erwarten können?",
        type: "radio",
        options: [
          { text: "Ja", emoji: "✅" },
          { text: "Nein", emoji: "❌" },
          { text: "Weiß nicht", emoji: "🤷" },
        ],
      },
      {
        id: "technician_experience",
        text: "11. Haben Sie nach dem Gespräch Ihre Erwartungen angepasst?",
        type: "radio",
        options: [
          { text: "Ja, ich erwarte jetzt mehr", emoji: "📈" },
          { text: "Ja, ich erwarte jetzt weniger", emoji: "📉" },
          {
            text: "Nein, meine Erwartungen sind gleich geblieben",
            emoji: "➡️",
          },
          { text: "Ich hatte keine Erwartungen", emoji: "🤷" },
        ],
      },
    ],
  },
  {
    id: "F",
    title: "F. Erwartungen an das Aussehen der Schuhe",
    questions: [
      {
        id: "shoe_expectation",
        text: "12. Wie hässlich oder attraktiv erwarten Sie Ihre Schuhe?",
        icf: "ICF: d920 Freizeit, Selbstbild",
        type: "scale",
        scaleOptions: [
          { value: 0, emoji: "😵", label: "Sehr hässlich" },
          { value: 1, emoji: "😔", label: "Hässlich" },
          { value: 2, emoji: "😐", label: "Neutral" },
          { value: 3, emoji: "😊", label: "Attraktiv" },
          { value: 4, emoji: "😍", label: "Sehr attraktiv" },
        ],
        conditional: {
          dependsOn: "technician_discussion",
          showIf: "Ja",
        },
      },
      {
        id: "shoe_design",
        text: "13. Was denken Sie, wie andere das Aussehen Ihrer Schuhe beurteilen?",
        type: "radio",
        options: [
          { text: "Sehr hässlich", emoji: "😵" },
          { text: "Hässlich", emoji: "😔" },
          { text: "Neutral", emoji: "😐" },
          { text: "Attraktiv", emoji: "😊" },
          { text: "Sehr attraktiv", emoji: "😍" },
          { text: "Ich weiß es nicht", emoji: "🤷" },
        ],
      },
      {
        id: "shoe_say",
        text: "14. Konnten Sie bei der Gestaltung/Aussehen der Schuhe mitentscheiden?",
        type: "radio",
        options: [
          { text: "Ja", emoji: "✅" },
          { text: "Nein", emoji: "❌" },
        ],
      },
    ],
  },
  {
    id: "G",
    title: "G. Nutzung der orthopädischen Schuhe",
    questions: [
      {
        id: "shoe_fitting",
        text: "15. Wie gut erwarten Sie, dass Ihre Schuhe passen?",
        icf: "ICF: d540 Sich kleiden",
        type: "scale",
        scaleOptions: [
          { value: 0, emoji: "😤", label: "Sehr schlecht" },
          { value: 1, emoji: "😕", label: "Schlecht" },
          { value: 2, emoji: "😐", label: "Neutral" },
          { value: 3, emoji: "😊", label: "Gut" },
          { value: 4, emoji: "🤩", label: "Sehr gut" },
        ],
      },
      {
        id: "shoe_distance",
        text: "16. Wie weit erwarten Sie mit den Schuhen gehen zu können?",
        icf: "ICF: d450 Gehen",
        type: "radio",
        options: [
          { text: "...nur in der Wohnung (0–10 Meter)", emoji: "🏠" },
          { text: "...zum Nachbarn (10–50 Meter)", emoji: "👋" },
          { text: "...zur Straßenecke (50–200 Meter)", emoji: "🚶" },
          {
            text: "...zu Geschäften in der Nachbarschaft (200 Meter – 1 Kilometer)",
            emoji: "🏪",
          },
          {
            text: "...längere Strecken ohne Pause (mehr als 1 Kilometer)",
            emoji: "🚶‍♂️💪",
          },
        ],
      },
      {
        id: "shoe_dist_compare",
        text: "17. Ist das mehr oder weniger als Sie aktuell gehen können?",
        type: "radio",
        options: [
          { text: "Weniger", emoji: "📉" },
          { text: "Gleich viel", emoji: "➡️" },
          { text: "Mehr", emoji: "📈" },
        ],
      },
      {
        id: "show_activities",
        text: "18. Erwarten Sie, mit den Schuhen folgende Aktivitäten mehr oder weniger ausüben zu können?",
        icf: "ICF: d450, d455, d460, d640, d920",
        type: "textarea",
        placeholder: "Aktivitäten bewerten 🏃‍♂️",
      },
    ],
  },
  {
    id: "H",
    title: "H. Bewertung der Prioritäten",
    questions: [
      {
        id: "shoe_expectation_comfort",
        text: "19. Was ist Ihnen wichtiger: Dass die Schuhe gut aussehen oder Ihre Fußprobleme lösen?",
        icf: "ICF: d920, b280 Empfindung von Schmerz",
        type: "radio",
        options: [
          { text: "Das Aussehen ist wichtiger", emoji: "👠" },
          { text: "Beides ist gleich wichtig", emoji: "⚖️" },
          { text: "Die Lösung der Fußprobleme ist wichtiger", emoji: "🩺" },
        ],
      },
      {
        id: "shoe_adv_dadv",
        text: "20. Erwarten Sie, dass die Vorteile die Nachteile überwiegen?",
        type: "scale",
        scaleOptions: [
          { value: 0, emoji: "❌", label: "Auf keinen Fall" },
          { value: 1, emoji: "😔", label: "Eher nicht" },
          { value: 2, emoji: "🤷", label: "Unsicher" },
          { value: 3, emoji: "😊", label: "Eher ja" },
          { value: 4, emoji: "✅", label: "Auf jeden Fall" },
        ],
      },
    ],
  },
  {
    id: "I",
    title: "I. Abschluss",
    questions: [
      {
        id: "conc_comments",
        text: "21. Haben Sie weitere Anmerkungen?",
        type: "textarea",
        placeholder: "Ihre Anmerkungen...",
      },
      {
        id: "conc_time",
        text: "22. Wie lange haben Sie für das Ausfüllen des Fragebogens benötigt?",
        type: "text",
        placeholder: "z.B. 15 Minuten",
      },
    ],
  },
];

export const woundZones = [
  //Medial
  { id: "VRM", top: "18%", left: "7%" },
  { id: "MRM", top: "17%", left: "22%" },
  { id: "RRM", top: "18%", left: "38%" },
  { id: "RLM", top: "18%", left: "57%" },
  { id: "MLM", top: "17%", left: "71%" },
  { id: "VLM", top: "18%", left: "88%" },

  //lateral
  { id: "RRL", top: "30%", left: "9%" },
  { id: "MRL", top: "36%", left: "25%" },
  { id: "VRL", top: "40%", left: "40%" },
  { id: "VLL", top: "40%", left: "56%" },
  { id: "MLL", top: "36%", left: "72%" },
  { id: "RLL", top: "30%", left: "86%" },

  //plantar Right
  { id: "RPD5", top: "59%", left: "5%" },
  { id: "RPD4", top: "57.5%", left: "9%" },
  { id: "RPD3", top: "56%", left: "12%" },
  { id: "RPD2", top: "55%", left: "16%" },
  { id: "RPD1", top: "54%", left: "22%" },
  { id: "RPM5", top: "63%", left: "7%" },
  { id: "RPM4", top: "61%", left: "10%" },
  { id: "RPM3", top: "60%", left: "13.5%" },
  { id: "RPM2", top: "59%", left: "17%" },
  { id: "RPM1", top: "60%", left: "21%" },
  { id: "RPB5", top: "78%", left: "9%" },
  { id: "RPFerse", top: "88%", left: "15%" },

  //plantar Left
  { id: "LPD5", top: "59%", left: "48%" },
  { id: "LPD4", top: "57.5%", left: "45%" },
  { id: "LPD3", top: "56%", left: "41%" },
  { id: "LPD2", top: "55%", left: "37%" },
  { id: "LPD1", top: "54%", left: "32%" },
  { id: "LPM5", top: "63%", left: "47%" },
  { id: "LPM4", top: "61%", left: "44%" },
  { id: "LPM3", top: "60%", left: "40%" },
  { id: "LPM2", top: "59%", left: "36%" },
  { id: "LPM1", top: "60%", left: "32%" },
  { id: "LPB5", top: "78%", left: "44%" },
  { id: "LPFerse", top: "88%", left: "37%" },

  //dorsal Right
  { id: "RDD5", top: "82%", left: "52%" },
  { id: "RDD4", top: "84.5%", left: "56%" },
  { id: "RDD3", top: "86%", left: "59%" },
  { id: "RDD2", top: "87%", left: "63%" },
  { id: "RDD1", top: "89%", left: "68%" },
  { id: "RDM5", top: "72%", left: "55%" },
  { id: "RDM4", top: "74%", left: "58%" },
  { id: "RDM3", top: "76%", left: "60.5%" },
  { id: "RDM2", top: "79%", left: "64%" },
  { id: "RDM1", top: "80%", left: "68%" },

  //dorsal Left
  { id: "LDD5", top: "82%", left: "95%" },
  { id: "LDD4", top: "83.5%", left: "91%" },
  { id: "LDD3", top: "85%", left: "87%" },
  { id: "LDD2", top: "87%", left: "84%" },
  { id: "LDD1", top: "89%", left: "79%" },
  { id: "LDM5", top: "72%", left: "93%" },
  { id: "LDM4", top: "74%", left: "90%" },
  { id: "LDM3", top: "76%", left: "86%" },
  { id: "LDM2", top: "79%", left: "84%" },
  { id: "LDM1", top: "80%", left: "79%" },
];

export const postAssessmentQuestions = [
  {
    id: "A",
    title: "A. Persönliche Angaben",
    questions: [
      {
        id: "walking_distance_post",
        text: "1. Wie weit können Sie aktuell gehen?",
        icf: "ICF: d450 Gehen",
        type: "radio",
        options: [
          {
            text: "Ich kann mich nur in meiner Wohnung bewegen (0–10 Meter)",
            emoji: "🏠",
          },
          { text: "Ich kann zum Nachbarn gehen (10–50 Meter)", emoji: "👋" },
          {
            text: "Ich kann bis zur Straßenecke gehen (50–200 Meter)",
            emoji: "🚶",
          },
          {
            text: "Ich kann zu Geschäften in der Nachbarschaft gehen (200 Meter – 1 Kilometer)",
            emoji: "🏪",
          },
          {
            text: "Ich kann längere Strecken ohne Pause gehen (mehr als 1 Kilometer)",
            emoji: "🚶‍♂️💪",
          },
        ],
      },
      {
        id: "walking_compare",
        text: "2. Im Vergleich zur Zeit vor Erhalt Ihrer orthopädischen Schuhe, hat sich Ihre Gehfähigkeit…",
        icf: "ICF: d450",
        type: "radio",
        options: [
          { text: "… durch die Schuhe verbessert", emoji: "📈" },
          { text: "… verbessert, aber nicht wegen der Schuhe", emoji: "↗️" },
          { text: "… nicht verändert", emoji: "➖" },
          {
            text: "… verschlechtert, aber nicht wegen der Schuhe",
            emoji: "↘️",
          },
          { text: "… durch die Schuhe verschlechtert", emoji: "📉" },
        ],
      },
      {
        id: "health_compare",
        text: "3. Im Vergleich zur Zeit vor Erhalt Ihrer orthopädischen Schuhe, hat sich Ihr allgemeiner Gesundheitszustand…",
        icf: "ICF: b130, b160, b280",
        type: "radio",
        options: [
          { text: "… verbessert", emoji: "💪" },
          { text: "… nicht verändert", emoji: "➖" },
          { text: "… verschlechtert", emoji: "😔" },
        ],
      },
    ],
  },
  {
    id: "B",
    title: "B. Aktuelle Situation",
    questions: [
      {
        id: "wounds_post",
        text: "4. Haben Sie Wunden oder Geschwüre an Füßen oder Knöcheln?",
        icf: "ICF: b810 Schutzfunktion der Haut",
        type: "radio",
        options: [
          { text: "Ja", emoji: "✅" },
          { text: "Nein", emoji: "❌" },
        ],
      },
      {
        id: "wounds_image_post",
        text: "5. Bitte markieren Sie die Stelle der Wunden/Geschwüre auf der Abbildung.",
        type: "wounds_image",
        options: [{ text: "Körperstelle auswählen", emoji: "📍" }],
        conditional: { dependsOn: "wounds_post", showIf: "Ja" },
      },
      {
        id: "wound_change",
        text: "6. Haben Ihre orthopädischen Schuhe eine Veränderung der Wunden/Geschwüre verursacht?",
        icf: "ICF: b810",
        type: "radio",
        options: [
          { text: "Mehr Wunden", emoji: "➕" },
          { text: "Größere Wunden", emoji: "⬆️" },
          { text: "Keine Veränderung", emoji: "➖" },
          { text: "Weniger Wunden", emoji: "➖➖" },
          { text: "Kleinere Wunden", emoji: "⬇️" },
          { text: "Nicht zutreffend", emoji: "🤷" },
        ],
      },
    ],
  },
  {
    id: "C",
    title: "C. Aussehen der Schuhe",
    questions: [
      {
        id: "shoe_appearance_post",
        text: "7. Wie hässlich oder attraktiv sind Ihre orthopädischen Schuhe?",
        icf: "ICF: d920",
        type: "scale",
        scaleOptions: [
          { value: 0, emoji: "😵", label: "Sehr hässlich" },
          { value: 1, emoji: "😔", label: "Hässlich" },
          { value: 2, emoji: "😐", label: "Neutral" },
          { value: 3, emoji: "😊", label: "Attraktiv" },
          { value: 4, emoji: "😍", label: "Sehr attraktiv" },
        ],
      },
      {
        id: "others_appearance",
        text: "8. Was denken andere über das Aussehen Ihrer Schuhe?",
        type: "radio",
        options: [
          { text: "Sehr hässlich", emoji: "😵" },
          { text: "Hässlich", emoji: "😔" },
          { text: "Neutral", emoji: "😐" },
          { text: "Attraktiv", emoji: "😊" },
          { text: "Sehr attraktiv", emoji: "😍" },
          { text: "Ich weiß es nicht", emoji: "🤷" },
        ],
      },
    ],
  },
  {
    id: "D",
    title: "D. Nutzung der orthopädischen Schuhe",
    questions: [
      {
        id: "fit_quality",
        text: "9. Wie schlecht oder gut passen Ihre Schuhe?",
        icf: "ICF: d540",
        type: "scale",
        scaleOptions: [
          { value: 0, emoji: "😤", label: "Sehr schlecht" },
          { value: 1, emoji: "😕", label: "Schlecht" },
          { value: 2, emoji: "😐", label: "Neutral" },
          { value: 3, emoji: "😊", label: "Gut" },
          { value: 4, emoji: "🤩", label: "Sehr gut" },
        ],
      },
      {
        id: "fit_expectation",
        text: "10. Passen Ihre Schuhe schlechter oder besser als erwartet?",
        type: "scale",
        scaleOptions: [
          { value: 0, emoji: "⬇️⬇️", label: "Viel schlechter" },
          { value: 1, emoji: "⬇️", label: "Schlechter" },
          { value: 2, emoji: "➡️", label: "Wie erwartet" },
          { value: 3, emoji: "⬆️", label: "Besser" },
          { value: 4, emoji: "⬆️⬆️", label: "Viel besser" },
        ],
      },
      {
        id: "walking_quality_post",
        text: "11. Wie schlecht oder gut können Sie mit Ihren orthopädischen Schuhen gehen?",
        icf: "ICF: d450",
        type: "scale",
        scaleOptions: [
          { value: 0, emoji: "😤", label: "Sehr schlecht" },
          { value: 1, emoji: "😕", label: "Schlecht" },
          { value: 2, emoji: "😐", label: "Neutral" },
          { value: 3, emoji: "😊", label: "Gut" },
          { value: 4, emoji: "🤩", label: "Sehr gut" },
        ],
      },
      {
        id: "walking_expectation",
        text: "12. Können Sie mit Ihren orthopädischen Schuhen schlechter oder besser gehen als erwartet?",
        type: "scale",
        scaleOptions: [
          { value: 0, emoji: "⬇️⬇️", label: "Viel schlechter" },
          { value: 1, emoji: "⬇️", label: "Schlechter" },
          { value: 2, emoji: "➡️", label: "Wie erwartet" },
          { value: 3, emoji: "⬆️", label: "Besser" },
          { value: 4, emoji: "⬆️⬆️", label: "Viel besser" },
        ],
      },
      {
        id: "shoe_weight",
        text: "13. Wie empfinden Sie das Gewicht Ihrer orthopädischen Schuhe?",
        type: "scale",
        scaleOptions: [
          { value: 0, emoji: "🏋️‍♂️", label: "Zu schwer" },
          { value: 1, emoji: "⚖️", label: "Eher schwer" },
          { value: 2, emoji: "⚖️", label: "Genau richtig" },
          { value: 3, emoji: "🪶", label: "Eher leicht" },
          { value: 4, emoji: "🪶", label: "Zu leicht" },
        ],
      },
      {
        id: "shoe_weight_expectation",
        text: "14. Sind Ihre orthopädischen Schuhe leichter oder schwerer als erwartet?",
        type: "scale",
        scaleOptions: [
          { value: 0, emoji: "⬇️⬇️", label: "Viel leichter" },
          { value: 1, emoji: "⬇️", label: "Leichter" },
          { value: 2, emoji: "➡️", label: "Wie erwartet" },
          { value: 3, emoji: "⬆️", label: "Schwerer" },
          { value: 4, emoji: "⬆️⬆️", label: "Viel schwerer" },
        ],
      },
      {
        id: "shoe_donning",
        text: "15. Wie schwierig ist es, Ihre orthopädischen Schuhe an- und auszuziehen?",
        icf: "ICF: d540",
        type: "scale",
        scaleOptions: [
          { value: 0, emoji: "😣", label: "Sehr schwierig" },
          { value: 1, emoji: "😕", label: "Schwierig" },
          { value: 2, emoji: "😐", label: "Neutral" },
          { value: 3, emoji: "🙂", label: "Einfach" },
          { value: 4, emoji: "😄", label: "Sehr einfach" },
        ],
      },
      {
        id: "activities_post",
        text: "16. Mit Ihren orthopädischen Schuhen, üben Sie folgende Aktivitäten mehr oder weniger aus als erwartet?",
        icf: "ICF: d450, d455, d460, d640, d920",
        type: "radio",
        options: [{ text: "Aktivitäten bewerten", emoji: "🏃‍♂️" }],
      },
    ],
  },
  {
    id: "E",
    title: "E. Tragehäufigkeit",
    questions: [
      {
        id: "usage_frequency",
        text: "17. Wie oft tragen Sie Ihre orthopädischen Schuhe?",
        icf: "ICF: d450, d850",
        type: "radio",
        options: [
          { text: "6–7 Tage pro Woche", emoji: "📆" },
          { text: "4–5 Tage pro Woche", emoji: "🗓️" },
          { text: "2–3 Tage pro Woche", emoji: "📅" },
          { text: "1 Tag pro Woche", emoji: "🕐" },
          { text: "Nie", emoji: "❌" },
        ],
      },
      {
        id: "daily_hours",
        text: "18. Wenn Sie Ihre orthopädischen Schuhe tragen: Wie viele Stunden pro Tag?",
        type: "radio",
        options: [
          { text: "Mehr als 12 Stunden", emoji: "⏱️" },
          { text: "8–12 Stunden", emoji: "🕗" },
          { text: "4–8 Stunden", emoji: "🕓" },
          { text: "1–4 Stunden", emoji: "🕐" },
          { text: "Weniger als 1 Stunde", emoji: "⌛" },
        ],
        conditional: {
          dependsOn: "usage_frequency",
          showIf: (v) => v !== "Nie",
        },
      },
      {
        id: "usage_as_expected",
        text: "19. Tragen Sie Ihre orthopädischen Schuhe so oft wie erwartet?",
        type: "radio",
        options: [
          { text: "Ja", emoji: "✅" },
          { text: "Nein", emoji: "❌" },
          { text: "Ich weiß es nicht", emoji: "🤷" },
        ],
        conditional: {
          dependsOn: "usage_frequency",
          showIf: (v) => v !== "Nie",
        },
      },
      {
        id: "usage_satisfaction",
        text: "20. Wie zufrieden sind Sie mit der Häufigkeit und Dauer der Nutzung Ihrer orthopädischen Schuhe?",
        type: "scale",
        scaleOptions: [
          { value: 0, emoji: "😡", label: "Sehr unzufrieden" },
          { value: 1, emoji: "😕", label: "Unzufrieden" },
          { value: 2, emoji: "😐", label: "Neutral" },
          { value: 3, emoji: "😊", label: "Zufrieden" },
          { value: 4, emoji: "🤩", label: "Sehr zufrieden" },
        ],
      },
    ],
  },
  {
    id: "F",
    title: "F. Kommunikation und Zielerreichung",
    questions: [
      {
        id: "doctor_followup_listening",
        text: "21. Wie gut hat Ihnen der Arzt bei der Nachkontrolle zugehört?",
        icf: "ICF: d710",
        type: "scale",
        scaleOptions: [
          { value: 0, emoji: "😤", label: "Sehr schlecht" },
          { value: 1, emoji: "😕", label: "Schlecht" },
          { value: 2, emoji: "😐", label: "Neutral" },
          { value: 3, emoji: "😊", label: "Gut" },
          { value: 4, emoji: "🤩", label: "Sehr gut" },
        ],
      },
      {
        id: "technician_followup_listening",
        text: "22. Wie gut hat Ihnen der Orthopädietechniker bei der Übergabe/Nachkontrolle zugehört?",
        icf: "ICF: d710",
        type: "scale",
        scaleOptions: [
          { value: 0, emoji: "😤", label: "Sehr schlecht" },
          { value: 1, emoji: "😕", label: "Schlecht" },
          { value: 2, emoji: "😐", label: "Neutral" },
          { value: 3, emoji: "😊", label: "Gut" },
          { value: 4, emoji: "🤩", label: "Sehr gut" },
        ],
      },
      {
        id: "priority_post",
        text: "23. Was ist Ihnen wichtiger: Dass die Schuhe gut aussehen oder Ihre Fußprobleme lösen?",
        icf: "ICF: d920, b280",
        type: "radio",
        options: [
          { text: "Das Aussehen ist wichtiger", emoji: "👠" },
          { text: "Beides ist gleich wichtig", emoji: "⚖️" },
          { text: "Die Lösung der Fußprobleme ist wichtiger", emoji: "🩺" },
        ],
      },
      {
        id: "shoe_advantages",
        text: "24. Was sind die Vorteile Ihrer orthopädischen Schuhe?",
        type: "textarea",
      },
      {
        id: "shoe_disadvantages",
        text: "25. Was sind die Nachteile Ihrer orthopädischen Schuhe?",
        type: "textarea",
      },
      {
        id: "advantages_over_disadvantages",
        text: "26. Überwiegen die Vorteile die Nachteile?",
        type: "scale",
        scaleOptions: [
          { value: 0, emoji: "❌", label: "Auf keinen Fall" },
          { value: 1, emoji: "😔", label: "Eher nicht" },
          { value: 2, emoji: "🤷", label: "Unsicher" },
          { value: 3, emoji: "😊", label: "Eher ja" },
          { value: 4, emoji: "✅", label: "Auf jeden Fall" },
        ],
      },
      {
        id: "goal_achieved",
        text: "27. Haben Ihre orthopädischen Schuhe Ihre Ziele erfüllt?",
        icf: "ICF: d850, d920",
        type: "radio",
        options: [
          { text: "Ja", emoji: "✅" },
          { text: "Nein", emoji: "❌" },
          { text: "Ich weiß es nicht", emoji: "🤷" },
        ],
      },
      {
        id: "goal_not_achieved_reason",
        text: "28. Was ist der Grund, dass Ihre Ziele nicht erreicht wurden?",
        type: "textarea",
      },
      {
        id: "usability_rating",
        text: "29. Wie beurteilen Sie die Gebrauchstauglichkeit Ihrer orthopädischen Schuhe?",
        type: "textarea",
      },
      {
        id: "usability_factors",
        text: "30. Gibt es weitere Eigenschaften/Funktionen, die die Gebrauchstauglichkeit Ihrer Schuhe beeinflussen?",
        type: "textarea",
      },
      {
        id: "additional_comments_post",
        text: "31. Haben Sie weitere Anmerkungen?",
        type: "textarea",
      },
    ],
  },
  {
    id: "G",
    title: "G. Abschluss",
    questions: [
      {
        id: "duration_post",
        text: "32. Wie lange haben Sie für das Ausfüllen des Fragebogens benötigt?",
        type: "text",
        placeholder: "z.B. 15 Minuten",
      },
    ],
  },
];
