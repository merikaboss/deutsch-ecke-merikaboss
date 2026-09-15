/* ============================================================
   Single source of truth for the topic order used across the
   Picture Book and the Written Book.

   Order follows the real "L1 - Themen (A1)" syllabus (65 items)
   shown in 00-syllabus-overblick.jpg. Several syllabus items
   share one topic image (the "syllabus" field lists which
   number(s) each chapter covers) — that's the actual course
   structure, not a mistake. A handful of images (colors,
   vocab lists, extra readings, practice tests) aren't part of
   the numbered 65-item syllabus at all; they're kept as bonus
   material after it. One syllabus item (49, "Wie ist das
   Wetter?") currently has no matching image and is skipped.

   "id" is just this book's own page-order number — it does NOT
   need to match the syllabus number, since one id can cover
   several merged syllabus numbers. "file" points to the actual
   image in assets/images/, unchanged from how it was named.
   ============================================================ */

const CHAPTERS = [
  { id: "00", file: "00-syllabus-overblick.jpg", de: "Kursübersicht", en: "Course overview (syllabus map)", syllabus: "" },

  { id: "01", file: "01-begruessungen-vorstellen-kennenlernen.jpg", de: "Begrüßungen, Vorstellen und Kennenlernen", en: "Greetings, introductions and getting to know someone", syllabus: "1–2, 6–8" },
  { id: "02", file: "04-zahlen.jpg", de: "Zahlen", en: "Numbers (0–20, 21–100, above 100)", syllabus: "3–4, 16" },
  { id: "03", file: "02-alphabet-buchstaben.jpg", de: "Das Alphabet – Buchstaben", en: "The alphabet – letters and names", syllabus: "5" },
  { id: "04", file: "03-alphabet-aussprache.jpg", de: "Das Alphabet – Aussprache", en: "The alphabet – pronunciation guide", syllabus: "5" },
  { id: "05", file: "06-satzstruktur-verben.jpg", de: "Satzstruktur, Teil 1 und 2", en: "Sentence structure, Part 1 and 2", syllabus: "9–10" },
  { id: "06", file: "07-personalpronomen-1-2-3.jpg", de: "Personalpronomen (ich, du, wir...)", en: "Personal pronouns (ich, du, wir...)", syllabus: "11" },
  { id: "07", file: "08-verben-konjugation-regelmaessig.jpg", de: "Haben und Sein / Regelmäßige Verben", en: "Verb conjugation: haben/sein and regular verbs", syllabus: "12, 14" },
  { id: "08", file: "09-verben-stammveraenderung.jpg", de: "Unregelmäßige Verben", en: "Irregular (vowel-changing) verbs", syllabus: "15" },
  { id: "09", file: "10-adjektive-gegenteile.jpg", de: "Adjektive und Gegenteile", en: "Adjectives and opposites", syllabus: "17" },
  { id: "10", file: "11-bestimmter-artikel.jpg", de: "Bestimmte Artikel (alle Fälle)", en: "Definite articles in all four cases", syllabus: "19, 26, 32" },
  { id: "11", file: "12-unbestimmter-artikel.jpg", de: "Unbestimmte Artikel", en: "Indefinite articles", syllabus: "20" },
  { id: "12", file: "13-negativartikel-kein.jpg", de: "Negative Artikel", en: "Negative articles (kein/keine)", syllabus: "21" },
  { id: "13", file: "14-uhrzeit.jpg", de: "Die Uhrzeit", en: "Telling time (official and unofficial)", syllabus: "22–23" },
  { id: "14", file: "15-possessivartikel.jpg", de: "Possessivartikel (alle Fälle)", en: "Possessive articles (all cases)", syllabus: "24, 27, 35" },
  { id: "15", file: "16-familie.jpg", de: "Die Familie", en: "The family", syllabus: "25" },
  { id: "16", file: "26-modalverben.jpg", de: "Modalverben (möchten)", en: "Modal verbs (möchten and friends)", syllabus: "28" },
  { id: "17", file: "17-w-fragen-zeitfragen.jpg", de: "W-Fragen und Fragewörter der Zeit", en: "Question words and time-related questions", syllabus: "29, 34" },
  { id: "18", file: "41-taxi-restaurant.jpg", de: "Im Restaurant bestellen / Mit dem Taxi fahren", en: "Ordering at a restaurant / taking a taxi", syllabus: "30, 56" },
  { id: "19", file: "19-personalpronomen-nom-akk-dativ.jpg", de: "Personalpronomen im Akkusativ und Dativ", en: "Personal pronouns (accusative and dative)", syllabus: "31, 36" },
  { id: "20", file: "18-ordnungszahlen.jpg", de: "Ordnungszahlen", en: "Ordinal numbers", syllabus: "33" },
  { id: "21", file: "24-trennbare-verben.jpg", de: "Trennbare Verben", en: "Separable verbs", syllabus: "37" },
  { id: "22", file: "36-lesetext-mein-alltag.jpg", de: "Tagesablauf", en: "Daily routine", syllabus: "38" },
  { id: "23", file: "23-imperativ.jpg", de: "Der Imperativ", en: "The imperative (commands)", syllabus: "39" },
  { id: "24", file: "35-wegbeschreibung.jpg", de: "Wegbeschreibung", en: "Giving directions", syllabus: "40" },
  { id: "25", file: "27-praeteritum-war-hatte.jpg", de: "Präteritum – war und hatte", en: "Simple past of sein/haben (war/hatte)", syllabus: "41" },
  { id: "26", file: "25-untrennbare-verben.jpg", de: "Untrennbare Verben", en: "Non-separable verbs", syllabus: "42" },
  { id: "27", file: "37-krank-sein.jpg", de: "Krank sein / Beim Arzt", en: "Being unwell / at the doctor's", syllabus: "43, 59" },
  { id: "28", file: "28-perfekt.jpg", de: "Perfekt, Teil 1 und 2", en: "Present perfect tense, Part 1 and 2", syllabus: "44–45" },
  { id: "29", file: "29-partizip-ii.jpg", de: "Perfekt, Teil 3 – Partizip II", en: "Present perfect tense, Part 3 – the past participle", syllabus: "46" },
  { id: "30", file: "46-urlaub.jpg", de: "Was hast du im Urlaub gemacht?", en: "What did you do on vacation?", syllabus: "47" },
  { id: "31", file: "42-supermarkt-bank.jpg", de: "Supermarkt, Kaufhaus und Bank", en: "Supermarket, department store and bank", syllabus: "48, 55, 63" },
  { id: "32", file: "38-verabredung-telefon.jpg", de: "Verabredungen / Am Telefon sprechen", en: "Appointments / phone conversations", syllabus: "50, 58" },
  { id: "33", file: "44-briefschreiben.jpg", de: "Brief schreiben (Einladung und formell)", en: "Letter writing (invitation and formal/hotel)", syllabus: "51, 60" },
  { id: "34", file: "39-gefallen-missfallen.jpg", de: "Gefallen und Missfallen ausdrücken", en: "Expressing likes and dislikes", syllabus: "52" },
  { id: "35", file: "20-fragepronomen-welcher-overview.jpg", de: "Fragepronomen „welch-“ (Übersicht)", en: "Interrogative pronoun \"which\" (overview)", syllabus: "53" },
  { id: "36", file: "21-fragepronomen-welcher-alle-faelle.jpg", de: "Fragepronomen „welch-“ (alle Fälle)", en: "Interrogative pronoun \"which\" (all cases)", syllabus: "53" },
  { id: "37", file: "22-demonstrativartikel.jpg", de: "Demonstrativartikel „dies-“", en: "Demonstrative article \"this/these\"", syllabus: "54" },
  { id: "38", file: "30-zeitadverbien.jpg", de: "Zeitadverbien", en: "Adverbs of time", syllabus: "57" },
  { id: "39", file: "43-formular-ausfuellen.jpg", de: "Formular ausfüllen", en: "Filling in a form", syllabus: "61" },
  { id: "40", file: "45-zugticket-wohnung-post.jpg", de: "Fahrkarte kaufen, Wohnungssuche, Die Post", en: "Buying a train ticket, apartment hunting, the post office", syllabus: "62, 64–65" },

  { id: "41", file: "05-farben.jpg", de: "Farben", en: "Colors", syllabus: "bonus — not in the numbered syllabus" },
  { id: "42", file: "31-wichtige-vokabeln.jpg", de: "Wichtige Vokabeln", en: "Important verbs and vocabulary", syllabus: "bonus" },
  { id: "43", file: "32-monate-wochentage.jpg", de: "Monate und Wochentage", en: "Months and weekdays", syllabus: "bonus" },
  { id: "44", file: "33-datum.jpg", de: "Das Datum", en: "Dates in German", syllabus: "bonus" },
  { id: "45", file: "34-berufe.jpg", de: "Berufe", en: "Professions", syllabus: "bonus" },
  { id: "46", file: "40-essen-trinken.jpg", de: "Essen und Trinken", en: "Food and drinks", syllabus: "bonus" },
  { id: "47", file: "47-sie-in-german.jpg", de: "„Sie“ im Deutschen", en: "\"Sie\" in German – all its meanings and uses", syllabus: "bonus" },
  { id: "48", file: "48-dialog-ausflug.jpg", de: "Dialog – Freundinnen planen einen Ausflug", en: "Dialogue – friends planning a trip", syllabus: "bonus" },
  { id: "49", file: "49-story-schoener-tag.jpg", de: "Lesetext – Ein schöner Tag in der Stadt", en: "Reading – a beautiful day in the city", syllabus: "bonus" },

  { id: "50", file: "50-praxistest.jpg", de: "Übungstest", en: "Practice test", syllabus: "practice" },
  { id: "51", file: "51-abendtest-fragen.jpg", de: "Abendtest – Fragen", en: "Evening test – questions", syllabus: "practice" },
  { id: "52", file: "52-abendtest-antworten.jpg", de: "Abendtest – Antworten (Lösungen)", en: "Evening test – answers (solutions)", syllabus: "practice" },
  { id: "53", file: "53-eigener-abendtest-beispiel.jpg", de: "Mein eigenes Testbeispiel", en: "My own test example", syllabus: "practice" }
];
