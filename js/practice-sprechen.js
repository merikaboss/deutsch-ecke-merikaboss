/* ============================================================
   Deutsch Ecke — Übungsbuch: Sprechen
   Every unit is written from scratch for this site. Speaking
   cards (typ "sprechen") are answered out loud; the model answer
   is revealed on demand and the learner rates themselves.
   Field formats are described in js/practice.js.
   ============================================================ */

var SPRECHEN_UNITS = [

  /* ---------------------------------------------------------- */
  {
    id: "P01",
    gruppe: "person",
    stufe: 1,
    title: "Sich vorstellen",
    subtitle: "Introducing yourself",
    focus: "Name, Herkunft, Wohnort, Sprachen, Beruf, Hobbys",
    intro:
      "You will introduce yourself in German more often than you say anything else — in a course, at work, to a neighbour, on the phone. It is worth having a version you can say smoothly without thinking, and then being able to answer the questions people ask afterwards.",
    lernen: [
      { h3: "Seven points" },
      "A complete introduction covers these points, roughly in this order. Say one or two sentences for each.",
      {
        kopf: ["Punkt", "Sie sagen", "Man fragt Sie"],
        zeilen: [
          ["Name", "Ich heiße … / Mein Name ist …", "Wie heißen Sie?"],
          ["Alter", "Ich bin … Jahre alt.", "Wie alt sind Sie?"],
          ["Land", "Ich komme aus …", "Woher kommen Sie?"],
          ["Wohnort", "Ich wohne in …", "Wo wohnen Sie?"],
          ["Sprachen", "Ich spreche … und ein bisschen Deutsch.", "Welche Sprachen sprechen Sie?"],
          ["Beruf", "Ich bin … von Beruf. / Ich arbeite als …", "Was sind Sie von Beruf?"],
          ["Hobbys", "In meiner Freizeit … ich gern …", "Was machen Sie in Ihrer Freizeit?"]
        ]
      },
      {
        box: "rule",
        titel: "Countries with an article",
        text: [
          "Most countries have no article: *aus Kenia, aus Deutschland, aus Nigeria*. A few do, and then *aus* needs the dative:"
        ],
        zeilen: [
          ["die Türkei", "aus *der* Türkei"],
          ["die Schweiz", "aus *der* Schweiz"],
          ["der Irak, der Iran", "aus *dem* Irak, aus *dem* Iran"],
          ["die USA (Plural)", "aus *den* USA"]
        ]
      },
      {
        box: "mistake",
        titel: "Three mistakes almost everyone makes",
        liste: [
          "~Ich habe 25 Jahre.~ → Ich *bin* 25 Jahre alt.",
          "~Ich bin ein Lehrer.~ → Ich bin Lehrer. / Ich bin Lehrer*in*. — no article with jobs.",
          "~Ich wohne in Hamburg seit zwei Jahren.~ → Ich wohne *seit zwei Jahren* in Hamburg. — time before place."
        ]
      },
      {
        box: "example",
        titel: "A model introduction",
        text: [
          "Guten Tag! Mein Name ist Joseph Mwangi. Ich bin 28 Jahre alt und komme aus Kenia, aus Nakuru. Seit einem Jahr wohne ich in Stuttgart. Ich spreche Swahili und Englisch und lerne jetzt Deutsch. Von Beruf bin ich Elektriker, aber im Moment mache ich einen Sprachkurs. In meiner Freizeit spiele ich gern Basketball und ich koche viel. Ich bin verheiratet und habe eine Tochter."
        ]
      }
    ],
    redemittel: [
      {
        titel: "Nachfragen und reagieren",
        zeilen: [
          ["Wie bitte?", "Sorry? / Pardon?"],
          ["Können Sie das bitte wiederholen?", "Could you repeat that, please?"],
          ["Wie schreibt man das?", "How do you spell that?"],
          ["Und Sie? / Und du?", "And you?"],
          ["Freut mich!", "Nice to meet you!"]
        ]
      }
    ],
    aufgaben: [
      { teil: "Teil 1 — Was ist richtig?", typ: "mc", frage: "Wie sagt man sein Alter?", optionen: ["Ich habe 30 Jahre.", "Ich bin 30 Jahre alt.", "Ich bin 30 alt Jahre.", "Mein Alter hat 30."], antwort: 1 },
      { teil: "Teil 1 — Was ist richtig?", typ: "mc", frage: "Sie sind Krankenschwester. Was sagen Sie?", optionen: ["Ich bin eine Krankenschwester.", "Ich arbeite Krankenschwester.", "Ich bin Krankenschwester von Beruf.", "Ich habe Krankenschwester."], antwort: 2 },
      { teil: "Teil 1 — Was ist richtig?", typ: "mc", frage: "Sie kommen aus der Türkei.", optionen: ["Ich komme aus Türkei.", "Ich komme aus die Türkei.", "Ich komme aus der Türkei.", "Ich komme von Türkei."], antwort: 2, warum: "*die Türkei* hat einen Artikel. Nach *aus* steht der Dativ: *der*." },
      { teil: "Teil 1 — Was ist richtig?", typ: "mc", frage: "Welcher Satz ist richtig?", optionen: ["Ich lerne Deutsch seit sechs Monaten hier.", "Ich lerne seit sechs Monaten hier Deutsch.", "Seit sechs Monaten ich lerne hier Deutsch.", "Ich seit sechs Monaten lerne Deutsch."], antwort: 1 },

      { teil: "Teil 2 — Die Frage zur Antwort", teilIntro: "Welche Frage passt? Schreiben Sie die Frage mit *Sie* und sagen Sie sie dann laut.", typ: "luecke", frage: "… — Ich komme aus Ghana.", antwort: ["Woher kommen Sie?"] },
      { teil: "Teil 2 — Die Frage zur Antwort", typ: "luecke", frage: "… — Ich spreche Englisch, Twi und ein bisschen Deutsch.", antwort: ["Welche Sprachen sprechen Sie?", "Was sprechen Sie?"] },
      { teil: "Teil 2 — Die Frage zur Antwort", typ: "luecke", frage: "… — Ich bin Mechaniker.", antwort: ["Was sind Sie von Beruf?", "Was machen Sie beruflich?"] },

      { teil: "Teil 3 — Sprechen Sie.", teilIntro: "Antworten Sie laut in ganzen Sätzen. Sprechen Sie über sich selbst — die Musterantwort ist nur ein Beispiel.", typ: "sprechen", karte: { thema: "Sich vorstellen", wort: "Name?" }, frage: "Sagen Sie Ihren Vor- und Nachnamen.", muster: "Ich heiße Grace Achieng. Achieng ist mein Familienname." },
      { teil: "Teil 3 — Sprechen Sie.", typ: "sprechen", karte: { thema: "Sich vorstellen", wort: "Alter?" }, frage: "Wie alt sind Sie?", muster: "Ich bin sechsundzwanzig Jahre alt." },
      { teil: "Teil 3 — Sprechen Sie.", typ: "sprechen", karte: { thema: "Sich vorstellen", wort: "Land?" }, frage: "Woher kommen Sie? Nennen Sie auch die Stadt.", muster: "Ich komme aus Kenia, aus Kisumu. Das liegt am Victoriasee." },
      { teil: "Teil 3 — Sprechen Sie.", typ: "sprechen", karte: { thema: "Sich vorstellen", wort: "Wohnort?" }, frage: "Wo wohnen Sie und seit wann?", muster: "Ich wohne seit acht Monaten in Leipzig." },
      { teil: "Teil 3 — Sprechen Sie.", typ: "sprechen", karte: { thema: "Sich vorstellen", wort: "Sprachen?" }, frage: "Welche Sprachen sprechen Sie?", muster: "Ich spreche Luo, Swahili und Englisch. Deutsch lerne ich seit einem Jahr." },
      { teil: "Teil 3 — Sprechen Sie.", typ: "sprechen", karte: { thema: "Sich vorstellen", wort: "Beruf?" }, frage: "Was sind Sie von Beruf? Wenn Sie nicht arbeiten: Was machen Sie im Moment?", muster: "Ich bin Buchhalterin von Beruf. Im Moment arbeite ich nicht, ich mache einen Deutschkurs." },
      { teil: "Teil 3 — Sprechen Sie.", typ: "sprechen", karte: { thema: "Sich vorstellen", wort: "Hobby?" }, frage: "Was machen Sie gern in Ihrer Freizeit?", muster: "In meiner Freizeit tanze ich gern und ich treffe meine Freundinnen. Am Wochenende gehe ich oft spazieren." },

      {
        teil: "Teil 4 — Die ganze Vorstellung",
        typ: "sprechen",
        frage: "Stellen Sie sich jetzt ohne Pause vor — mindestens sieben Sätze. Nehmen Sie sich auf und hören Sie: Haben Sie alle Punkte gesagt?",
        stichworte: ["Name", "Alter", "Land", "Wohnort", "Sprachen", "Beruf", "Hobbys", "Familie"],
        muster: "Hallo, ich heiße Grace Achieng. Ich bin sechsundzwanzig Jahre alt und komme aus Kenia, aus Kisumu. Seit acht Monaten wohne ich in Leipzig. Ich spreche Luo, Swahili und Englisch, und jetzt lerne ich Deutsch. Ich bin Buchhalterin von Beruf, aber im Moment mache ich einen Deutschkurs. In meiner Freizeit tanze ich gern und gehe spazieren. Ich bin ledig und habe zwei Brüder.",
        warum: "Achten Sie beim Anhören besonders auf das Verb auf Position 2 — auch nach *Seit acht Monaten* und *In meiner Freizeit*."
      },
      {
        teil: "Teil 4 — Die ganze Vorstellung",
        typ: "sprechen",
        frage: "Ihr Partner hat sich vorgestellt, aber zu schnell gesprochen. Sie haben den Namen nicht verstanden. Was sagen Sie? Und dann: Stellen Sie eine Frage zurück.",
        muster: ["Entschuldigung, wie ist Ihr Name? Können Sie das bitte wiederholen?", "Wie schreibt man das?", "Und woher kommen Sie?"]
      }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "P02",
    gruppe: "person",
    stufe: 1,
    title: "Buchstabieren und Zahlen",
    subtitle: "Spelling, phone numbers, prices and times",
    focus: "Alphabet, Umlaute, Telefonnummer, Preise, Uhrzeit",
    intro:
      "The moment you give your name on the phone or at a counter, someone will say *Wie schreibt man das?* Numbers are the same: a phone number, a price, a time. None of it is hard, but it has to come out quickly — so practise it out loud until it does.",
    lernen: [
      { h3: "The alphabet as it is spoken" },
      {
        kopf: ["Buchstabe", "sprich", "Buchstabe", "sprich"],
        zeilen: [
          ["A", "ah", "N", "enn"],
          ["B", "beh", "O", "oh"],
          ["C", "tseh", "P", "peh"],
          ["D", "deh", "Q", "kuh"],
          ["E", "eh", "R", "err"],
          ["F", "eff", "S", "ess"],
          ["G", "geh", "T", "teh"],
          ["H", "hah", "U", "uh"],
          ["I", "ih", "V", "fau"],
          ["J", "jott", "W", "weh"],
          ["K", "kah", "X", "iks"],
          ["L", "ell", "Y", "üpsilon"],
          ["M", "emm", "Z", "tsett"]
        ]
      },
      {
        box: "rule",
        titel: "The letters English speakers mix up",
        liste: [
          "*E* sounds like English _a_ in _say_; *I* sounds like English _ee_. So *E – I* is _eh – ee_.",
          "*J* is _jott_, *V* is _fau_, *W* is _veh_.",
          "*Ä, Ö, Ü* are said as their sound, or as _A Umlaut_, _O Umlaut_, _U Umlaut_. *ß* is _Eszett_.",
          "Two of the same letter: _Doppel-_. *Anna* → A, Doppel-N, A."
        ]
      },
      { h3: "Numbers" },
      {
        kopf: ["Zahl", "gesprochen", "Tipp"],
        zeilen: [
          ["21", "einundzwanzig", "the ones come first"],
          ["67", "siebenundsechzig", "*sieb*zig, not ~siebenzig~"],
          ["30", "dreißig", "with ß, not ~dreizig~"],
          ["16 / 17", "sechzehn / siebzehn", "*sech*zehn, *sieb*zehn"],
          ["100 / 250", "hundert / zweihundert­fünfzig", ""],
          ["1998", "neunzehnhundert­acht­und­neunzig", "years before 2000"],
          ["2024", "zweitausend­vier­und­zwanzig", ""]
        ]
      },
      {
        box: "rule",
        titel: "Phone numbers, prices, times",
        liste: [
          "*Phone numbers* are given digit by digit or in pairs: 0176 44 58 21 → null-eins-sieben-sechs, vierundvierzig, achtundfünfzig, einundzwanzig. On the phone *zwei* is often said *zwo*, so it isn't confused with *drei*.",
          "*Prices*: 3,50 € → drei Euro fünfzig. 0,99 € → neunundneunzig Cent.",
          "*Official time* (station, radio): 18:45 → achtzehn Uhr fünfundvierzig.",
          "*Everyday time*: 18:45 → Viertel vor sieben. 7:30 → halb acht — _half to eight_, not half past seven."
        ]
      }
    ],
    aufgaben: [
      { teil: "Teil 1 — Welcher Name?", teilIntro: "Lesen Sie die gesprochenen Buchstaben und schreiben Sie den Namen.", typ: "luecke", frage: "beh – eh – err – geh", antwort: ["Berg"] },
      { teil: "Teil 1 — Welcher Name?", typ: "luecke", frage: "weh – eh – ih – ess – ess", antwort: ["Weiss", "Weiß"], warum: "*weh* ist W und *eh* ist E, *ih* ist I." },
      { teil: "Teil 1 — Welcher Name?", typ: "luecke", frage: "emm – U Umlaut – ell – ell – eh – err", antwort: ["Müller"] },
      { teil: "Teil 1 — Welcher Name?", typ: "luecke", frage: "jott – ah – kah – oh – beh", antwort: ["Jakob"] },

      { teil: "Teil 2 — Zahlen", teilIntro: "Schreiben Sie die Zahl mit Ziffern.", typ: "luecke", frage: "siebenundachtzig", antwort: ["87"] },
      { teil: "Teil 2 — Zahlen", typ: "luecke", frage: "dreihundertsechzehn", antwort: ["316"] },
      { teil: "Teil 2 — Zahlen", typ: "luecke", frage: "zwölf Euro neunzig", hinweis: "z. B. 1,50", antwort: ["12,90", "12,90 €", "12,90 Euro"] },
      { teil: "Teil 2 — Zahlen", typ: "mc", frage: "Ihr Kurs beginnt um *halb neun*. Wann ist das?", optionen: ["9:30", "8:30", "8:15", "9:00"], antwort: 1, warum: "*halb neun* = eine halbe Stunde *vor* neun." },
      { teil: "Teil 2 — Zahlen", typ: "mc", frage: "Der Zug fährt um *Viertel nach drei* am Nachmittag.", optionen: ["15:15", "14:45", "15:45", "3:25"], antwort: 0 },

      { teil: "Teil 3 — Sprechen Sie.", teilIntro: "Sagen Sie alles laut. Nehmen Sie sich auf und prüfen Sie jeden Buchstaben und jede Zahl.", typ: "sprechen", frage: "Buchstabieren Sie Ihren Vornamen und Ihren Familiennamen.", muster: ["Mein Vorname ist Grace: geh – err – ah – tseh – eh.", "Mein Familienname ist Achieng: ah – tseh – hah – ih – eh – enn – geh."] },
      { teil: "Teil 3 — Sprechen Sie.", typ: "sprechen", frage: "Buchstabieren Sie den Namen Ihrer Stadt.", muster: "Ich wohne in Köln: kah – O Umlaut – ell – enn." },
      { teil: "Teil 3 — Sprechen Sie.", typ: "sprechen", karte: { thema: "Telefonnummer", wort: "0151 63 27 48" }, frage: "Sagen Sie diese Telefonnummer.", muster: "null – eins – fünf – eins, dreiundsechzig, siebenundzwanzig, achtundvierzig." },
      { teil: "Teil 3 — Sprechen Sie.", typ: "sprechen", karte: { thema: "Preise", wort: "4,95 € · 18,40 € · 0,79 €" }, frage: "Sagen Sie die drei Preise.", muster: "vier Euro fünfundneunzig — achtzehn Euro vierzig — neunundsiebzig Cent." },
      { teil: "Teil 3 — Sprechen Sie.", typ: "sprechen", karte: { thema: "Uhrzeit", wort: "7:30 · 12:15 · 16:45" }, frage: "Sagen Sie die Uhrzeiten zweimal: offiziell und im Alltag.", muster: ["sieben Uhr dreißig — halb acht", "zwölf Uhr fünfzehn — Viertel nach zwölf", "sechzehn Uhr fünfundvierzig — Viertel vor fünf"] },
      { teil: "Teil 3 — Sprechen Sie.", typ: "sprechen", karte: { thema: "Geburtstag", wort: "Wann?" }, frage: "Wann haben Sie Geburtstag? Sagen Sie das Datum und das Jahr.", muster: "Ich habe am vierzehnten März Geburtstag. Ich bin neunzehnhundertneunundneunzig geboren.", warum: "Datum mit *am* und Ordinalzahl: *am vierzehnten*, *am ersten*, *am dritten*." },
      {
        teil: "Teil 4 — Am Telefon",
        typ: "sprechen",
        frage: "Sie rufen beim Arzt an. Die Mitarbeiterin fragt: *Wie ist Ihr Name, bitte? Und Ihre Telefonnummer?* Antworten Sie — mit Buchstabieren.",
        muster: ["Mein Name ist Okello. Ich buchstabiere: oh – kah – eh – Doppel-ell – oh.", "Meine Telefonnummer ist null – eins – sieben – sechs, fünfundfünfzig, achtundzwanzig, neunzehn, drei."]
      }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "P03",
    gruppe: "person",
    stufe: 1,
    title: "Fragen zur Person",
    subtitle: "Asking and answering about people",
    focus: "W-Fragen, Ja/Nein-Fragen, du und Sie",
    intro:
      "A conversation is not two speeches. After you introduce yourself, you ask back — and the other person's answers give you your next question. This unit trains exactly that: turning a single word into a proper question, and answering in a full sentence.",
    lernen: [
      "German has two kinds of question. A W-question starts with a question word and has the verb straight after it. A yes/no question has no question word — it starts with the verb itself. Which one you need depends on the answer you want.",
      { h3: "Question words" },
      {
        kopf: ["Fragewort", "fragt nach", "Beispiel"],
        zeilen: [
          ["Wer?", "a person", "Wer ist das?"],
          ["Was?", "a thing, an activity", "Was machst du am Wochenende?"],
          ["Wo?", "a place", "Wo arbeitest du?"],
          ["Woher?", "where from", "Woher kommen Sie?"],
          ["Wohin?", "where to", "Wohin fährst du im Urlaub?"],
          ["Wann?", "a time", "Wann hast du Geburtstag?"],
          ["Wie?", "a way, a quality", "Wie ist deine Wohnung?"],
          ["Wie viele?", "a number", "Wie viele Geschwister hast du?"],
          ["Welche?", "one of several", "Welche Musik hörst du gern?"],
          ["Warum?", "a reason", "Warum lernst du Deutsch?"]
        ]
      },
      {
        box: "rule",
        titel: "From a word to a question",
        text: [
          "You get one word — *Geschwister*, *Wohnung*, *Beruf*. Pick the question word that fits, put the verb straight after it, then the subject.",
          "*Geschwister* → Hast du Geschwister? / Wie viele Geschwister hast du?"
        ]
      },
      {
        box: "rule",
        titel: "du or Sie",
        zeilen: [
          ["du", "friends, family, children, other learners in the course", "Wo wohnst *du*?"],
          ["Sie", "strangers, officials, teachers, customers, anyone older you don't know", "Wo wohnen *Sie*?"]
        ]
      },
      {
        box: "mistake",
        titel: "Answer the question that was asked",
        liste: [
          "*Hast du Kinder?* is a yes/no question: start with *Ja* or *Nein* — Nein, ich habe keine Kinder.",
          "Say *nein* with *kein* for nouns: ~Nein, ich habe nicht Kinder.~ → Nein, ich habe *keine* Kinder.",
          "Answer with *doch* when you contradict a negative question: *Hast du keinen Hunger?* — *Doch!*"
        ]
      }
    ],
    aufgaben: [
      { teil: "Teil 1 — Welches Fragewort?", typ: "luecke", frage: "___ wohnst du? — In der Nähe vom Bahnhof.", antwort: ["Wo"] },
      { teil: "Teil 1 — Welches Fragewort?", typ: "luecke", frage: "___ alt ist deine Schwester? — Neunzehn.", antwort: ["Wie"] },
      { teil: "Teil 1 — Welches Fragewort?", typ: "luecke", frage: "___ lernen Sie Deutsch? — Ich möchte in Deutschland studieren.", antwort: ["Warum", "Wieso", "Weshalb"] },
      { teil: "Teil 1 — Welches Fragewort?", typ: "luecke", frage: "___ fährst du im Sommer? — Nach Italien.", antwort: ["Wohin"] },
      { teil: "Teil 1 — Welches Fragewort?", typ: "luecke", frage: "___ Kinder haben Sie? — Drei.", antwort: ["Wie viele"] },
      { teil: "Teil 1 — Welches Fragewort?", typ: "luecke", frage: "___ ist deine Lehrerin? — Frau Schneider.", antwort: ["Wer"] },

      { teil: "Teil 2 — Welche Antwort passt?", typ: "mc", frage: "Haben Sie ein Auto?", optionen: ["Ja, ich fahre mit dem Bus.", "Nein, ich habe kein Auto.", "Nein, ich habe nicht ein Auto.", "Doch, ich habe ein Auto."], antwort: 1 },
      { teil: "Teil 2 — Welche Antwort passt?", typ: "mc", frage: "Arbeitest du nicht am Samstag?", optionen: ["Doch, bis 14 Uhr.", "Ja, ich arbeite nicht.", "Nein, bis 14 Uhr.", "Ja, am Samstag."], antwort: 0, warum: "Die Frage ist negativ. Wer trotzdem arbeitet, antwortet mit *Doch*." },
      { teil: "Teil 2 — Welche Antwort passt?", typ: "mc", frage: "Wie ist deine neue Wohnung?", optionen: ["In der Gartenstraße.", "Seit Mai.", "Hell, aber ein bisschen klein.", "Ja, sie ist neu."], antwort: 2 },

      { teil: "Teil 3 — Fragen und antworten", teilIntro: "Auf jeder Karte steht ein Thema und ein Wort. Stellen Sie mit dem Wort eine Frage mit *du* — dann antworten Sie selbst auf die Frage.", typ: "sprechen", karte: { thema: "Zur Person", wort: "Geschwister" }, frage: "Frage stellen, dann antworten.", muster: ["Frage: Hast du Geschwister?", "Antwort: Ja, ich habe eine Schwester und zwei Brüder. Meine Schwester wohnt auch in Deutschland."] },
      { teil: "Teil 3 — Fragen und antworten", typ: "sprechen", karte: { thema: "Zur Person", wort: "Geburtstag" }, frage: "Frage stellen, dann antworten.", muster: ["Frage: Wann hast du Geburtstag?", "Antwort: Ich habe am zweiten Oktober Geburtstag."] },
      { teil: "Teil 3 — Fragen und antworten", typ: "sprechen", karte: { thema: "Zur Person", wort: "Wohnung" }, frage: "Frage stellen, dann antworten.", muster: ["Frage: Wie ist deine Wohnung?", "Antwort: Meine Wohnung ist klein, aber hell. Sie hat zwei Zimmer und einen Balkon."] },
      { teil: "Teil 3 — Fragen und antworten", typ: "sprechen", karte: { thema: "Zur Person", wort: "Arbeit" }, frage: "Frage stellen, dann antworten.", muster: ["Frage: Wo arbeitest du?", "Antwort: Ich arbeite in einem Lager am Hafen. Ich fange jeden Tag um sechs Uhr an."] },
      { teil: "Teil 3 — Fragen und antworten", typ: "sprechen", karte: { thema: "Zur Person", wort: "Sprachen" }, frage: "Frage stellen, dann antworten.", muster: ["Frage: Welche Sprachen sprichst du?", "Antwort: Ich spreche Arabisch und Französisch. Deutsch lerne ich seit sieben Monaten."] },
      { teil: "Teil 3 — Fragen und antworten", typ: "sprechen", karte: { thema: "Zur Person", wort: "Lieblingsessen" }, frage: "Frage stellen, dann antworten.", muster: ["Frage: Was ist dein Lieblingsessen?", "Antwort: Mein Lieblingsessen ist Ugali mit Fisch. Das hat meine Mutter oft gekocht."] },
      { teil: "Teil 3 — Fragen und antworten", typ: "sprechen", karte: { thema: "Zur Person", wort: "Deutsch lernen" }, frage: "Frage stellen, dann antworten.", muster: ["Frage: Warum lernst du Deutsch?", "Antwort: Ich möchte in Deutschland eine Ausbildung als Pflegefachkraft machen."] },

      { teil: "Teil 4 — Jetzt mit Sie", teilIntro: "Sie sprechen mit einer fremden Person. Stellen Sie die Frage mit *Sie*.", typ: "sprechen", karte: { thema: "Zur Person", wort: "Beruf" }, frage: "Frage stellen, dann antworten.", muster: ["Frage: Was sind Sie von Beruf?", "Antwort: Ich bin Fahrer von Beruf. Ich fahre einen Lieferwagen."] },
      { teil: "Teil 4 — Jetzt mit Sie", typ: "sprechen", karte: { thema: "Zur Person", wort: "Familie" }, frage: "Frage stellen, dann antworten.", muster: ["Frage: Haben Sie Familie? / Sind Sie verheiratet?", "Antwort: Ja, ich bin verheiratet und habe zwei Kinder. Mein Sohn ist fünf und meine Tochter ist drei."] },
      { teil: "Teil 4 — Jetzt mit Sie", typ: "sprechen", karte: { thema: "Zur Person", wort: "Freizeit" }, frage: "Frage stellen, dann antworten.", muster: ["Frage: Was machen Sie in Ihrer Freizeit?", "Antwort: Ich lese gern und gehe am Wochenende mit meinen Kindern in den Park."] }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "P04",
    gruppe: "themen",
    stufe: 2,
    title: "Essen und Trinken",
    subtitle: "Word cards: food and drink",
    focus: "Fragen mit Wortkarten, gern / lieber / am liebsten, mögen",
    intro:
      "Food is the easiest topic to talk about for a long time, because everyone has an opinion. The cards here work in pairs in class; alone, you play both people: ask with the word on the card, then give a real answer about yourself.",
    lernen: [
      { h3: "Saying what you like" },
      {
        kopf: ["", "Verb + gern", "mögen + Nomen"],
        zeilen: [
          ["gern", "Ich trinke *gern* Tee.", "Ich *mag* Tee."],
          ["lieber", "Ich trinke *lieber* Kaffee.", "Ich *mag* Kaffee lieber."],
          ["am liebsten", "Ich trinke *am liebsten* Saft.", "Am liebsten *mag* ich Saft."],
          ["nicht gern", "Ich esse *nicht gern* Fisch.", "Ich *mag* keinen Fisch."]
        ]
      },
      {
        box: "rule",
        titel: "mögen",
        zeilen: [
          ["ich mag", "wir mögen"],
          ["du magst", "ihr mögt"],
          ["er / sie / es mag", "sie / Sie mögen"]
        ]
      },
      {
        box: "rule",
        titel: "Keep the answer going",
        text: [
          "A one-word answer ends the conversation. Add a second sentence — when, how often, with whom, why.",
          "*Was trinkst du morgens?* — Tee. → *Morgens trinke ich immer schwarzen Tee mit Zucker. Kaffee mag ich nicht so gern.*"
        ]
      },
      {
        box: "mistake",
        titel: "Watch out",
        liste: [
          "*gern* goes after the verb: ~Ich gern esse Reis.~ → Ich esse *gern* Reis.",
          "*kein* for nouns: ~Ich esse nicht Fleisch.~ → Ich esse *kein* Fleisch.",
          "Meals take *zum*: *zum* Frühstück, *zum* Mittagessen, *zum* Abendessen."
        ]
      }
    ],
    wortschatz: [
      ["das Frühstück / frühstücken", "breakfast / to have breakfast"],
      ["das Mittagessen", "lunch"],
      ["das Abendessen", "dinner, supper"],
      ["das Lieblingsessen", "favourite food"],
      ["das Getränk, -e", "drink"],
      ["das Gemüse", "vegetables"],
      ["das Obst", "fruit"],
      ["das Fleisch", "meat"],
      ["scharf", "spicy, hot"],
      ["süß", "sweet"],
      ["selbst kochen", "to cook yourself"],
      ["bestellen", "to order"]
    ],
    aufgaben: [
      { teil: "Teil 1 — gern, lieber, am liebsten", typ: "luecke", frage: "Tee oder Kaffee? — Ich trinke ___ Tee.", hinweis: "Tee ist besser", antwort: ["lieber"] },
      { teil: "Teil 1 — gern, lieber, am liebsten", typ: "luecke", frage: "Von allen Obstsorten esse ich ___ Mangos.", hinweis: "zwei Wörter", antwort: ["am liebsten"] },
      { teil: "Teil 1 — gern, lieber, am liebsten", typ: "luecke", frage: "Magst du Fisch? — Nein, ich ___ keinen Fisch.", antwort: ["mag"] },
      { teil: "Teil 1 — gern, lieber, am liebsten", typ: "luecke", frage: "Was ___ ihr zum Frühstück? — Brot mit Honig.", hinweis: "essen", antwort: ["esst"] },

      { teil: "Teil 2 — Welche Frage passt zur Karte?", typ: "mc", frage: "Karte: *Essen und Trinken — Frühstück*", optionen: ["Frühstück du?", "Was isst du zum Frühstück?", "Wann ist Frühstück du?", "Isst du Frühstück gern Brot?"], antwort: 1 },
      { teil: "Teil 2 — Welche Frage passt zur Karte?", typ: "mc", frage: "Karte: *Essen und Trinken — Restaurant*", optionen: ["Gehst du oft ins Restaurant?", "Restaurant ist gut?", "Wo ist du Restaurant?", "Hast du Restaurant?"], antwort: 0 },
      { teil: "Teil 2 — Welche Frage passt zur Karte?", typ: "mc", frage: "Karte: *Essen und Trinken — kochen*", optionen: ["Kochen du gern?", "Wer kocht bei euch zu Hause?", "Was ist kochen?", "Du kochst?"], antwort: 1 },

      { teil: "Teil 3 — Wortkarten", teilIntro: "Stellen Sie eine Frage mit dem Wort. Dann antworten Sie mit zwei Sätzen über sich selbst.", typ: "sprechen", karte: { thema: "Essen und Trinken", wort: "Frühstück" }, frage: "Frage und Antwort", muster: ["Was isst du zum Frühstück?", "Unter der Woche esse ich nur ein Brot mit Käse, denn ich habe wenig Zeit. Am Sonntag frühstücke ich lange mit meiner Familie."] },
      { teil: "Teil 3 — Wortkarten", typ: "sprechen", karte: { thema: "Essen und Trinken", wort: "Lieblingsessen" }, frage: "Frage und Antwort", muster: ["Was ist dein Lieblingsessen?", "Am liebsten esse ich Pilau mit Hähnchen. Meine Tante kocht das am besten."] },
      { teil: "Teil 3 — Wortkarten", typ: "sprechen", karte: { thema: "Essen und Trinken", wort: "Getränk" }, frage: "Frage und Antwort", muster: ["Was trinkst du gern?", "Ich trinke gern Tee mit Milch. Cola trinke ich fast nie, sie ist zu süß."] },
      { teil: "Teil 3 — Wortkarten", typ: "sprechen", karte: { thema: "Essen und Trinken", wort: "kochen" }, frage: "Frage und Antwort", muster: ["Kochst du gern?", "Ja, ich koche fast jeden Abend. Ich koche am liebsten Gerichte aus meiner Heimat."] },
      { teil: "Teil 3 — Wortkarten", typ: "sprechen", karte: { thema: "Essen und Trinken", wort: "Restaurant" }, frage: "Frage und Antwort", muster: ["Gehst du oft ins Restaurant?", "Nein, nicht oft. Restaurants sind hier teuer. Ein- oder zweimal im Monat gehe ich mit Freunden essen."] },
      { teil: "Teil 3 — Wortkarten", typ: "sprechen", karte: { thema: "Essen und Trinken", wort: "Obst" }, frage: "Frage und Antwort", muster: ["Welches Obst isst du am liebsten?", "Am liebsten esse ich Ananas. Äpfel mag ich auch, aber sie schmecken nicht so süß."] },
      { teil: "Teil 3 — Wortkarten", typ: "sprechen", karte: { thema: "Essen und Trinken", wort: "Fleisch" }, frage: "Frage und Antwort", muster: ["Isst du Fleisch?", "Ja, aber nur Hähnchen und Rind. Schweinefleisch esse ich nicht."] },
      { teil: "Teil 3 — Wortkarten", typ: "sprechen", karte: { thema: "Essen und Trinken", wort: "Supermarkt" }, frage: "Frage und Antwort", muster: ["Wann gehst du in den Supermarkt?", "Ich kaufe meistens am Samstagvormittag ein, dann ist es nicht so voll."] },

      {
        teil: "Teil 4 — Länger sprechen",
        typ: "sprechen",
        frage: "Erzählen Sie etwa eine Minute: Was essen Sie an einem normalen Tag, und was essen Sie an einem Feiertag?",
        stichworte: ["morgens", "mittags", "abends", "am Feiertag", "mit wem?", "was ist anders?"],
        muster: "An einem normalen Tag esse ich morgens nicht viel, nur ein Brötchen und einen Tee. Mittags esse ich in der Kantine, meistens Nudeln oder Suppe. Abends koche ich zu Hause, oft Reis mit Bohnen. An einem Feiertag ist alles anders: Die ganze Familie kommt zusammen, und wir kochen stundenlang. Es gibt Fleisch, Chapati und viel Obst. Am liebsten mag ich diese Tage, denn wir essen zusammen und reden viel."
      }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "P05",
    gruppe: "themen",
    stufe: 2,
    title: "Freizeit und Wochenende",
    subtitle: "Word cards: free time",
    focus: "Hobbys, Häufigkeit, Perfekt fürs letzte Wochenende",
    intro:
      "Talking about free time needs two tenses: the present for what you usually do, and the Perfekt for what you did last weekend. Both come up in almost every conversation, so both are on these cards.",
    lernen: [
      { h3: "How often?" },
      {
        kopf: ["Wort", "Bedeutung"],
        zeilen: [
          ["immer", "always"],
          ["fast immer / meistens", "almost always / mostly"],
          ["oft", "often"],
          ["manchmal", "sometimes"],
          ["selten", "rarely"],
          ["nie", "never"],
          ["jeden Tag / jede Woche", "every day / every week"],
          ["einmal / zweimal pro Woche", "once / twice a week"]
        ]
      },
      {
        box: "rule",
        titel: "Talking about last weekend — Perfekt",
        text: ["*haben / sein* in position 2, the participle at the end. Verbs of movement and *bleiben* take *sein*."],
        zeilen: [
          ["spielen", "Ich *habe* Fußball *gespielt*."],
          ["treffen", "Ich *habe* Freunde *getroffen*."],
          ["sehen", "Wir *haben* einen Film *gesehen*."],
          ["fahren", "Ich *bin* an den See *gefahren*."],
          ["gehen", "Wir *sind* ins Kino *gegangen*."],
          ["bleiben", "Ich *bin* zu Hause *geblieben*."]
        ]
      },
      {
        box: "example",
        titel: "Suggesting and reacting",
        zeilen: [
          ["Hast du Lust auf Kino?", "Fancy the cinema?"],
          ["Wollen wir am Sonntag schwimmen gehen?", "Shall we go swimming on Sunday?"],
          ["Gute Idee! / Gern!", "Good idea! / Sure!"],
          ["Leider habe ich keine Zeit.", "Sorry, I don't have time."]
        ]
      }
    ],
    aufgaben: [
      { teil: "Teil 1 — Perfekt: haben oder sein?", typ: "luecke", frage: "Am Samstag ___ ich lange geschlafen.", antwort: ["habe"] },
      { teil: "Teil 1 — Perfekt: haben oder sein?", typ: "luecke", frage: "Wir ___ mit dem Fahrrad an den Rhein gefahren.", antwort: ["sind"] },
      { teil: "Teil 1 — Perfekt: haben oder sein?", typ: "luecke", frage: "___ du am Sonntag zu Hause geblieben?", antwort: ["Bist"] },
      { teil: "Teil 1 — Perfekt: haben oder sein?", typ: "luecke", frage: "Meine Freunde ___ mich besucht.", antwort: ["haben"] },
      { teil: "Teil 1 — Perfekt: haben oder sein?", typ: "luecke", frage: "Ich habe am Abend ein Buch ___.", hinweis: "lesen", antwort: ["gelesen"] },

      { teil: "Teil 2 — Was passt?", typ: "mc", frage: "Wie oft gehst du ins Fitnessstudio? — ___", optionen: ["Gestern.", "Zweimal pro Woche.", "Im Fitnessstudio.", "Mit meinem Bruder."], antwort: 1 },
      { teil: "Teil 2 — Was passt?", typ: "mc", frage: "Wollen wir am Freitag tanzen gehen? — ___", optionen: ["Ja, ich bin tanzen gegangen.", "Gute Idee! Wann treffen wir uns?", "Ich tanze nie gegangen.", "Am Freitag war schön."], antwort: 1 },

      { teil: "Teil 3 — Wortkarten", teilIntro: "Stellen Sie eine Frage mit dem Wort und antworten Sie mit zwei Sätzen.", typ: "sprechen", karte: { thema: "Freizeit", wort: "Hobby" }, frage: "Frage und Antwort", muster: ["Was ist dein Hobby?", "Mein Hobby ist Fotografieren. Am Wochenende fahre ich oft mit der Kamera in die Stadt."] },
      { teil: "Teil 3 — Wortkarten", typ: "sprechen", karte: { thema: "Freizeit", wort: "Sport" }, frage: "Frage und Antwort", muster: ["Machst du Sport?", "Ja, ich laufe dreimal pro Woche im Park. Im Winter gehe ich lieber ins Fitnessstudio."] },
      { teil: "Teil 3 — Wortkarten", typ: "sprechen", karte: { thema: "Freizeit", wort: "Musik" }, frage: "Frage und Antwort", muster: ["Welche Musik hörst du gern?", "Ich höre am liebsten Afrobeats. Beim Kochen höre ich immer Musik."] },
      { teil: "Teil 3 — Wortkarten", typ: "sprechen", karte: { thema: "Freizeit", wort: "Kino" }, frage: "Frage und Antwort", muster: ["Wie oft gehst du ins Kino?", "Nicht so oft, vielleicht einmal im Monat. Meistens sehe ich Filme zu Hause."] },
      { teil: "Teil 3 — Wortkarten", typ: "sprechen", karte: { thema: "Freizeit", wort: "Urlaub" }, frage: "Frage und Antwort", muster: ["Wohin fährst du im Urlaub?", "Im Sommer fliege ich nach Hause zu meiner Familie. Das ist mein schönster Urlaub."] },
      { teil: "Teil 3 — Wortkarten", typ: "sprechen", karte: { thema: "Freizeit", wort: "Freunde" }, frage: "Frage und Antwort", muster: ["Was machst du mit deinen Freunden?", "Wir kochen zusammen oder spielen Karten. Manchmal gehen wir auch ins Café."] },

      { teil: "Teil 4 — Letztes Wochenende", teilIntro: "Jetzt im Perfekt. Die Karte fragt nach dem letzten Wochenende.", typ: "sprechen", karte: { thema: "Letztes Wochenende", wort: "Samstag" }, frage: "Frage und Antwort", muster: ["Was hast du am Samstag gemacht?", "Am Samstag habe ich zuerst die Wohnung geputzt. Am Nachmittag bin ich mit meiner Cousine in die Stadt gegangen."] },
      { teil: "Teil 4 — Letztes Wochenende", typ: "sprechen", karte: { thema: "Letztes Wochenende", wort: "Sonntag" }, frage: "Frage und Antwort", muster: ["Was hast du am Sonntag gemacht?", "Ich bin lange im Bett geblieben. Am Abend habe ich mit meinen Eltern telefoniert."] },
      { teil: "Teil 4 — Letztes Wochenende", typ: "sprechen", karte: { thema: "Letztes Wochenende", wort: "Essen" }, frage: "Frage und Antwort", muster: ["Was hast du am Wochenende gegessen?", "Wir haben am Sonntag gegrillt. Es hat sehr gut geschmeckt."] },

      {
        teil: "Teil 5 — Etwas vorschlagen",
        typ: "sprechen",
        frage: "Schlagen Sie Ihrer Freundin vor, am Samstag zusammen etwas zu machen. Sie hat am Vormittag keine Zeit. Spielen Sie beide Rollen.",
        muster: ["A: Hast du am Samstag Lust auf Schwimmen?", "B: Gern, aber am Vormittag muss ich arbeiten.", "A: Kein Problem. Geht es um drei Uhr?", "B: Ja, drei Uhr ist gut. Treffen wir uns am Schwimmbad?", "A: Super, bis Samstag!"]
      }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "P06",
    gruppe: "alltag",
    stufe: 2,
    title: "Bitten und reagieren",
    subtitle: "Asking someone to do something",
    focus: "Imperativ, Können Sie …?, Ich hätte gern …, ja / nein sagen",
    intro:
      "Asking for something — the salt, a pen, the window shut, a slower answer — is where politeness is heard most. German has a scale, from the plain imperative up to *Könnten Sie …?*, and the right reaction when someone asks you.",
    lernen: [
      "There are several ways to ask for something in German, and they are not all equally polite. Which one you pick depends on who you are talking to and how big the favour is.",
      { h3: "From direct to very polite" },
      {
        kopf: ["Form", "Beispiel", "wann"],
        zeilen: [
          ["Imperativ + bitte", "Mach bitte das Fenster zu.", "friends, family"],
          ["Kannst du …?", "Kannst du bitte das Fenster zumachen?", "friends — friendlier"],
          ["Können Sie …?", "Können Sie bitte das Fenster zumachen?", "strangers, colleagues"],
          ["Könnten Sie …?", "Könnten Sie bitte das Fenster zumachen?", "very polite"],
          ["Ich hätte gern …", "Ich hätte gern ein Glas Wasser.", "asking for a thing"]
        ]
      },
      {
        box: "rule",
        titel: "Where the verb goes",
        text: ["*Kannst / Können / Könnten* first, the infinitive at the very end. A separable verb stays together at the end: Können Sie das Fenster *zumachen*?"]
      },
      {
        box: "example",
        titel: "Reacting",
        zeilen: [
          ["Ja, gern. / Natürlich. / Klar!", "Yes, of course."],
          ["Kein Problem.", "No problem."],
          ["Moment, bitte.", "Just a moment."],
          ["Tut mir leid, das geht leider nicht.", "Sorry, that's not possible."],
          ["Leider nicht, ich brauche ihn selbst.", "I'm afraid not, I need it myself."]
        ]
      },
      {
        box: "mistake",
        titel: "Say why when you say no",
        text: ["A bare *Nein.* sounds rude in German too. Say *leider* and give a short reason: *Tut mir leid, ich habe leider keinen Stift dabei.*"]
      }
    ],
    aufgaben: [
      { teil: "Teil 1 — Höflicher sagen", teilIntro: "Machen Sie aus dem Imperativ eine Frage mit *Können Sie …?*", typ: "luecke", lang: true, frage: "Sprechen Sie bitte langsamer!", antwort: ["Können Sie bitte langsamer sprechen?", "Können Sie langsamer sprechen?"] },
      { teil: "Teil 1 — Höflicher sagen", typ: "luecke", lang: true, frage: "Machen Sie bitte die Tür zu!", antwort: ["Können Sie bitte die Tür zumachen?", "Können Sie die Tür bitte zumachen?", "Können Sie die Tür zumachen?"], warum: "*zumachen* bleibt am Ende zusammen." },
      { teil: "Teil 1 — Höflicher sagen", typ: "luecke", lang: true, frage: "Helfen Sie mir bitte!", antwort: ["Können Sie mir bitte helfen?", "Können Sie mir helfen?"] },
      { teil: "Teil 1 — Höflicher sagen", typ: "luecke", lang: true, frage: "Ruf mich bitte später an!", hinweis: "mit *Kannst du …?*", antwort: ["Kannst du mich bitte später anrufen?", "Kannst du mich später anrufen?", "Kannst du mich später bitte anrufen?"] },

      { teil: "Teil 2 — Welche Reaktion passt?", typ: "mc", frage: "Können Sie mir bitte den Zucker geben?", optionen: ["Ja, natürlich. Hier, bitte.", "Nein.", "Ich habe Zucker gegeben.", "Danke, gleichfalls."], antwort: 0 },
      { teil: "Teil 2 — Welche Reaktion passt?", typ: "mc", frage: "Kannst du mir heute dein Fahrrad leihen?", optionen: ["Ja, ich leihe.", "Tut mir leid, das geht heute nicht. Ich brauche es selbst.", "Gute Besserung!", "Nein, danke."], antwort: 1 },
      { teil: "Teil 2 — Welche Reaktion passt?", typ: "mc", frage: "Im Café: Was ist am höflichsten?", optionen: ["Wasser!", "Gib mir Wasser.", "Ich hätte gern ein Wasser, bitte.", "Ich will Wasser."], antwort: 2 },

      { teil: "Teil 3 — Bitten Sie.", teilIntro: "Auf der Karte steht, was Sie brauchen. Bitten Sie eine fremde Person (*Sie*). Dann reagieren Sie selbst als die andere Person.", typ: "sprechen", karte: { thema: "Bitten", wort: "Fenster" }, frage: "Es ist kalt im Kursraum.", muster: ["A: Entschuldigung, können Sie bitte das Fenster zumachen? Mir ist kalt.", "B: Ja, natürlich."] },
      { teil: "Teil 3 — Bitten Sie.", typ: "sprechen", karte: { thema: "Bitten", wort: "Kugelschreiber" }, frage: "Sie müssen ein Formular unterschreiben und haben keinen Stift.", muster: ["A: Entschuldigung, haben Sie einen Kugelschreiber für mich?", "B: Moment … ja, hier, bitte."] },
      { teil: "Teil 3 — Bitten Sie.", typ: "sprechen", karte: { thema: "Bitten", wort: "langsam" }, frage: "Die Frau am Schalter spricht sehr schnell.", muster: ["A: Entschuldigung, ich verstehe nicht so gut Deutsch. Könnten Sie bitte langsamer sprechen?", "B: Oh, natürlich. Entschuldigung."] },
      { teil: "Teil 3 — Bitten Sie.", typ: "sprechen", karte: { thema: "Bitten", wort: "Foto" }, frage: "Sie sind mit Ihrer Familie am See und möchten ein Foto von allen.", muster: ["A: Entschuldigung, könnten Sie bitte ein Foto von uns machen?", "B: Ja, gern. Alle lächeln!"] },
      { teil: "Teil 3 — Bitten Sie.", typ: "sprechen", karte: { thema: "Bitten", wort: "Koffer" }, frage: "Ihr Koffer ist schwer, und im Zug ist die Ablage sehr hoch.", muster: ["A: Entschuldigung, können Sie mir bitte mit dem Koffer helfen?", "B: Klar, kein Problem."] },
      { teil: "Teil 3 — Bitten Sie.", typ: "sprechen", karte: { thema: "Bitten", wort: "Handy laden" }, frage: "Ihr Handy ist fast leer. Sie sind im Café.", muster: ["A: Entschuldigung, darf ich hier mein Handy laden?", "B: Tut mir leid, hier gibt es leider keine Steckdose. Aber dort hinten an der Wand."] },

      { teil: "Teil 4 — Nein sagen", teilIntro: "Jemand bittet Sie um etwas. Sagen Sie freundlich nein und nennen Sie einen Grund.", typ: "sprechen", frage: "Ihr Nachbar fragt: *Können Sie am Samstag auf meinen Hund aufpassen?*", muster: "Tut mir leid, das geht leider nicht. Am Samstag bin ich den ganzen Tag bei meiner Schwester in Bonn." },
      { teil: "Teil 4 — Nein sagen", typ: "sprechen", frage: "Ein Kollege fragt: *Kannst du heute meine Schicht übernehmen?*", muster: "Heute kann ich leider nicht, ich habe am Abend einen Deutschkurs. Aber am Donnerstag kann ich dir helfen." }
    ]
  },
  /* ---------------------------------------------------------- */
  {
    id: "P07",
    gruppe: "alltag",
    stufe: 2,
    title: "Im Café und im Restaurant",
    subtitle: "Ordering, asking and paying",
    focus: "bestellen, ich hätte gern / ich nehme, zahlen, Trinkgeld",
    intro:
      "Ordering is a short conversation with a fixed script, and the waiter follows it too. Once you know both halves — what you say and what you will hear — a restaurant stops being stressful.",
    lernen: [
      "A visit to a café or restaurant runs through the same steps almost every time. The table shows what the waiter says at each step and what you answer.",
      {
        kopf: ["Schritt", "Kellner / Kellnerin", "Sie"],
        zeilen: [
          ["Ankommen", "Guten Abend! Wie viele Personen?", "Einen Tisch für zwei, bitte."],
          ["Getränke", "Was möchten Sie trinken?", "Ich hätte gern ein Wasser ohne Kohlensäure."],
          ["Essen", "Haben Sie schon gewählt?", "Ja, ich nehme die Tomatensuppe."],
          ["Nachfragen", "—", "Ist in dem Salat Fleisch?"],
          ["Zwischendurch", "Schmeckt es Ihnen?", "Ja, danke, sehr gut!"],
          ["Bezahlen", "Zusammen oder getrennt?", "Getrennt, bitte."],
          ["Trinkgeld", "Das macht 18,40 Euro.", "Machen Sie 20."]
        ]
      },
      {
        box: "rule",
        titel: "Three ways to order",
        zeilen: [
          ["Ich hätte gern einen Kaffee.", "polite and very common"],
          ["Ich nehme den Fisch.", "when choosing from the menu"],
          ["Für mich bitte eine Cola.", "short, when ordering for a group"]
        ],
        text: ["All three take the *accusative*: *einen* Kaffee, *den* Fisch, *eine* Cola, *ein* Wasser."]
      },
      {
        box: "example",
        titel: "Paying in Germany",
        liste: [
          "You ask for the bill at the table: *Die Rechnung, bitte.* or *Ich möchte bitte zahlen.*",
          "The waiter asks *Zusammen oder getrennt?* — one bill or separate.",
          "Tip by saying the rounded total: the bill is 18,40 €, you hand over the money and say *Stimmt so* or *Machen Sie 20*."
        ]
      },
      {
        box: "mistake",
        titel: "Watch out",
        liste: [
          "~Ich will einen Kaffee.~ sounds rude. Use *Ich hätte gern* or *Ich möchte*.",
          "~Ich bekomme ein Wasser.~ is heard a lot, but *Ich hätte gern* is safer.",
          "~Einen Wasser~ → *ein* Wasser. _das Wasser_ is neuter, so nothing changes in the accusative."
        ]
      }
    ],
    wortschatz: [
      ["die Speisekarte, -n", "menu"],
      ["die Vorspeise / Hauptspeise / Nachspeise", "starter / main / dessert"],
      ["das Getränk, -e", "drink"],
      ["mit / ohne Kohlensäure", "sparkling / still"],
      ["vegetarisch / vegan", "vegetarian / vegan"],
      ["die Rechnung, -en", "bill"],
      ["zusammen / getrennt", "together / separately"],
      ["das Trinkgeld", "tip"],
      ["Stimmt so.", "Keep the change."],
      ["lecker", "tasty"]
    ],
    aufgaben: [
      { teil: "Teil 1 — Akkusativ", typ: "luecke", frage: "Ich hätte gern ___ Tee mit Milch.", hinweis: "der Tee", antwort: ["einen"] },
      { teil: "Teil 1 — Akkusativ", typ: "luecke", frage: "Ich nehme ___ Gemüsesuppe.", hinweis: "die Suppe", antwort: ["die", "eine"] },
      { teil: "Teil 1 — Akkusativ", typ: "luecke", frage: "Für mich bitte ___ Stück Apfelkuchen.", hinweis: "das Stück", antwort: ["ein"] },

      { teil: "Teil 2 — Was sagt der Gast?", typ: "mc", frage: "Kellnerin: *Zusammen oder getrennt?*", optionen: ["Ja, bitte.", "Getrennt, bitte.", "Die Suppe, bitte.", "Mit Kohlensäure."], antwort: 1 },
      { teil: "Teil 2 — Was sagt der Gast?", typ: "mc", frage: "Kellner: *Haben Sie schon gewählt?*", optionen: ["Ja, ich nehme das Schnitzel mit Salat.", "Ja, ich habe gegessen.", "Das macht 12 Euro.", "Guten Appetit!"], antwort: 0 },
      { teil: "Teil 2 — Was sagt der Gast?", typ: "mc", frage: "Die Rechnung ist 23,60 €. Sie geben 25 € und möchten kein Wechselgeld.", optionen: ["Getrennt, bitte.", "Stimmt so.", "Ich hätte gern 25.", "Die Rechnung, bitte."], antwort: 1 },
      { teil: "Teil 2 — Was sagt der Gast?", typ: "mc", frage: "Sie essen kein Fleisch. Was fragen Sie?", optionen: ["Ist das Fleisch lecker?", "Haben Sie auch etwas Vegetarisches?", "Ich hätte gern Fleisch.", "Wo ist das Fleisch?"], antwort: 1 },

      { teil: "Teil 3 — Im Café", teilIntro: "Sie sind der Gast. Antworten Sie laut auf den Kellner.", typ: "sprechen", karte: { thema: "Kellner", wort: "Was darf es sein?" }, frage: "Bestellen Sie ein Getränk und etwas Süßes.", muster: "Ich hätte gern einen Cappuccino und ein Stück Käsekuchen, bitte." },
      { teil: "Teil 3 — Im Café", typ: "sprechen", karte: { thema: "Kellner", wort: "Mit Sahne?" }, frage: "Sie möchten keine Sahne.", muster: "Nein, danke, ohne Sahne, bitte." },
      { teil: "Teil 3 — Im Café", typ: "sprechen", karte: { thema: "Kellner", wort: "Noch etwas?" }, frage: "Sie möchten noch ein Glas Wasser.", muster: "Ja, bringen Sie mir bitte noch ein Glas Wasser." },
      { teil: "Teil 3 — Im Café", typ: "sprechen", frage: "Sie möchten jetzt bezahlen. Rufen Sie die Kellnerin und sagen Sie es.", muster: "Entschuldigung! Ich möchte bitte zahlen." },

      { teil: "Teil 4 — Im Restaurant", teilIntro: "Spielen Sie das ganze Gespräch. Sprechen Sie beide Rollen oder nur den Gast.", typ: "sprechen", frage: "Sie kommen mit einem Freund ins Restaurant, bestellen Getränke und zwei Hauptgerichte. Ihr Freund isst vegetarisch.", stichworte: ["Tisch für zwei", "Getränke", "vegetarisch?", "bestellen"], muster: ["Kellner: Guten Abend! Zu zweit?", "Gast: Ja, einen Tisch für zwei, bitte.", "Kellner: Was möchten Sie trinken?", "Gast: Ich hätte gern eine Apfelschorle, und mein Freund nimmt ein Wasser ohne Kohlensäure.", "Kellner: Haben Sie schon gewählt?", "Gast: Ich nehme das Hähnchen mit Reis. Haben Sie auch etwas Vegetarisches?", "Kellner: Ja, die Gemüsepfanne oder die Spinatlasagne.", "Gast: Dann nimmt mein Freund die Lasagne."] },
      { teil: "Teil 4 — Im Restaurant", typ: "sprechen", frage: "Ihr Essen ist kalt. Sagen Sie es dem Kellner freundlich.", muster: "Entschuldigung, meine Suppe ist leider kalt. Können Sie sie bitte noch einmal warm machen?" },
      { teil: "Teil 4 — Im Restaurant", typ: "sprechen", karte: { thema: "Rechnung", wort: "31,50 €" }, frage: "Sie bezahlen getrennt. Ihr Teil ist 31,50 €. Sie geben ein Trinkgeld.", muster: ["Kellnerin: Zusammen oder getrennt?", "Gast: Getrennt, bitte. Ich hatte das Hähnchen und die Schorle.", "Kellnerin: Das macht 31,50 Euro.", "Gast: Machen Sie 34, bitte.", "Kellnerin: Vielen Dank! Schönen Abend noch."] }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "P08",
    gruppe: "alltag",
    stufe: 2,
    title: "Einkaufen und Kleidung",
    subtitle: "In a shop: finding, trying on, paying",
    focus: "Wie viel kostet …? Größe, Farbe, anprobieren, zu groß / zu klein",
    intro:
      "In a clothes shop you need a few questions — where something is, whether it comes in another size, whether you can try it on — and a few answers for when it does not fit. With those you can buy almost anything.",
    lernen: [
      "Most shopping conversations are short and follow the same path. You look for something, you ask about it, you try it, and you decide.",
      {
        kopf: ["Sie möchten …", "Sie sagen"],
        zeilen: [
          ["etwas finden", "Entschuldigung, wo finde ich Jacken?"],
          ["eine Größe", "Haben Sie die Hose auch in Größe 38?"],
          ["eine andere Farbe", "Gibt es das Hemd auch in Blau?"],
          ["anprobieren", "Kann ich das anprobieren? — Wo sind die Umkleidekabinen?"],
          ["den Preis", "Wie viel kostet der Pullover?"],
          ["sich entscheiden", "Ich nehme sie. / Ich überlege es mir noch."],
          ["bezahlen", "Kann ich mit Karte zahlen?"]
        ]
      },
      {
        box: "rule",
        titel: "zu + adjective",
        text: ["*zu* means _too_ and always says something is wrong: *zu groß, zu klein, zu lang, zu kurz, zu eng, zu weit, zu teuer*. To say it fits: *Sie passt.* / *Er passt gut.*"]
      },
      {
        box: "rule",
        titel: "Pronouns for things: er, sie, es",
        text: ["Clothes are _der, die, das_, and the pronoun follows the article — also in the accusative when you take it."],
        zeilen: [
          ["der Pullover", "Er ist zu klein. → Ich nehme *ihn*."],
          ["die Jacke", "Sie ist schön. → Ich nehme *sie*."],
          ["das Kleid", "Es passt. → Ich nehme *es*."],
          ["die Schuhe (Pl.)", "Sie sind bequem. → Ich nehme *sie*."]
        ]
      },
      {
        box: "mistake",
        titel: "Watch out",
        liste: [
          "~Wie viel kostet die Schuhe?~ → Wie viel *kosten* die Schuhe? — plural verb.",
          "~Ich nehme es~ for _der Mantel_ → Ich nehme *ihn*.",
          "*Das steht Ihnen gut* means _it suits you_ — not that it stands."
        ]
      }
    ],
    wortschatz: [
      ["die Größe, -n", "size"],
      ["anprobieren", "to try on (separable)"],
      ["die Umkleidekabine, -n", "changing room"],
      ["passen", "to fit"],
      ["eng / weit", "tight / loose"],
      ["das Sonderangebot, -e", "special offer"],
      ["reduziert", "reduced"],
      ["umtauschen", "to exchange"],
      ["der Kassenbon, -s", "receipt"],
      ["die Kasse, -n", "till, checkout"]
    ],
    aufgaben: [
      { teil: "Teil 1 — er, sie, es — ihn, sie, es", typ: "luecke", frage: "Wie findest du den Mantel? — ___ ist schön, aber zu teuer.", antwort: ["Er"] },
      { teil: "Teil 1 — er, sie, es — ihn, sie, es", typ: "luecke", frage: "Die Bluse passt gut. Ich nehme ___.", antwort: ["sie"] },
      { teil: "Teil 1 — er, sie, es — ihn, sie, es", typ: "luecke", frage: "Der Rock ist zu kurz. Ich nehme ___ nicht.", antwort: ["ihn"] },
      { teil: "Teil 1 — er, sie, es — ihn, sie, es", typ: "luecke", frage: "Wie viel ___ die Sportschuhe?", antwort: ["kosten"] },

      { teil: "Teil 2 — Was passt?", typ: "mc", frage: "Verkäuferin: *Passt die Hose?*", optionen: ["Nein, sie ist zu lang.", "Ja, sie kostet 40 Euro.", "Die Umkleidekabine ist dort.", "Nein, ich habe Größe."], antwort: 0 },
      { teil: "Teil 2 — Was passt?", typ: "mc", frage: "Sie möchten die Jacke in einer anderen Farbe.", optionen: ["Ist die Jacke zu groß?", "Gibt es die Jacke auch in Schwarz?", "Wo ist die Kasse?", "Ich nehme sie in Größe M."], antwort: 1 },
      { teil: "Teil 2 — Was passt?", typ: "mc", frage: "Verkäufer: *Kann ich Ihnen helfen?* Sie möchten nur schauen.", optionen: ["Nein, danke, ich schaue nur.", "Ja, ich nehme es.", "Nein, das ist zu teuer.", "Ich möchte zahlen."], antwort: 0 },

      { teil: "Teil 3 — Im Geschäft", teilIntro: "Sagen Sie laut, was Sie in der Situation sagen.", typ: "sprechen", karte: { thema: "Einkaufen", wort: "Winterjacke?" }, frage: "Sie suchen eine Winterjacke und finden sie nicht.", muster: "Entschuldigung, wo finde ich Winterjacken?" },
      { teil: "Teil 3 — Im Geschäft", typ: "sprechen", karte: { thema: "Einkaufen", wort: "Größe 42" }, frage: "Die Hose gefällt Ihnen, aber Sie brauchen Größe 42.", muster: "Die Hose gefällt mir sehr. Haben Sie sie auch in Größe 42?" },
      { teil: "Teil 3 — Im Geschäft", typ: "sprechen", karte: { thema: "Einkaufen", wort: "anprobieren" }, frage: "Sie möchten das Hemd anprobieren.", muster: "Kann ich das Hemd anprobieren? Wo sind die Umkleidekabinen?" },
      { teil: "Teil 3 — Im Geschäft", typ: "sprechen", karte: { thema: "Einkaufen", wort: "zu eng" }, frage: "Der Pullover ist zu eng. Sagen Sie es und fragen Sie nach einer anderen Größe.", muster: "Der Pullover ist leider zu eng. Haben Sie ihn eine Nummer größer?" },
      { teil: "Teil 3 — Im Geschäft", typ: "sprechen", karte: { thema: "Einkaufen", wort: "€ ?" }, frage: "An den Schuhen ist kein Preis.", muster: "Entschuldigung, wie viel kosten diese Schuhe? Ich finde keinen Preis." },
      { teil: "Teil 3 — Im Geschäft", typ: "sprechen", karte: { thema: "Einkaufen", wort: "Karte?" }, frage: "Sie möchten mit Karte bezahlen.", muster: "Kann ich mit Karte zahlen?" },

      { teil: "Teil 4 — Umtauschen", typ: "sprechen", frage: "Sie haben gestern ein T-Shirt gekauft. Zu Hause merken Sie: Es ist zu klein. Sie gehen mit dem Kassenbon zurück ins Geschäft. Spielen Sie das Gespräch.", stichworte: ["gestern gekauft", "zu klein", "umtauschen", "Kassenbon"], muster: ["Kunde: Guten Tag. Ich habe gestern dieses T-Shirt gekauft, aber es ist leider zu klein. Kann ich es umtauschen?", "Verkäuferin: Natürlich. Haben Sie den Kassenbon?", "Kunde: Ja, hier, bitte.", "Verkäuferin: Welche Größe brauchen Sie?", "Kunde: Größe L, bitte. In der gleichen Farbe.", "Verkäuferin: Hier, bitte. Möchten Sie es noch anprobieren?", "Kunde: Ja, gern. Danke!"] }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "P09",
    gruppe: "alltag",
    stufe: 2,
    title: "Beim Arzt",
    subtitle: "Saying what hurts",
    focus: "Körperteile, Schmerzen, Termin, Anweisungen verstehen",
    intro:
      "At the doctor's you have to describe something you feel, answer quick questions, and understand what to do next. The words are few and they repeat, so practise saying them before you need them.",
    lernen: [
      "The conversation has three parts: at the reception, with the doctor, and the instructions at the end. You mainly need to say what is wrong and since when.",
      {
        kopf: ["Das Problem", "Sie sagen"],
        zeilen: [
          ["Kopf", "Ich habe Kopfschmerzen."],
          ["Bauch", "Ich habe Bauchschmerzen."],
          ["Hals", "Ich habe Halsschmerzen. / Mir tut der Hals weh."],
          ["Rücken", "Mir tut der Rücken weh."],
          ["Fieber", "Ich habe Fieber — 38,5 Grad."],
          ["Husten / Schnupfen", "Ich habe Husten und Schnupfen."],
          ["seit wann", "Seit drei Tagen. / Seit gestern Abend."]
        ]
      },
      {
        box: "rule",
        titel: "Two ways to say it hurts",
        zeilen: [
          ["Ich habe + …schmerzen", "Ich habe *Kopf*schmerzen. — only for some body parts: Kopf, Bauch, Hals, Rücken, Zahn, Ohren"],
          ["Mir tut … weh", "Mir *tut* der Arm weh. — Mir *tun* die Füße weh. (plural: *tun*)"]
        ]
      },
      {
        box: "example",
        titel: "What the doctor says",
        zeilen: [
          ["Was fehlt Ihnen?", "What's the matter?"],
          ["Wo tut es weh?", "Where does it hurt?"],
          ["Machen Sie bitte den Mund auf.", "Please open your mouth."],
          ["Nehmen Sie die Tabletten dreimal täglich.", "Take the tablets three times a day."],
          ["Bleiben Sie drei Tage im Bett.", "Stay in bed for three days."],
          ["Hier ist Ihre Krankschreibung.", "Here is your sick note."]
        ]
      },
      {
        box: "mistake",
        titel: "Watch out",
        liste: [
          "~Ich bin Kopfschmerzen.~ → Ich *habe* Kopfschmerzen.",
          "~Mein Bauch tut mir Schmerzen.~ → Mir tut der Bauch weh.",
          "~Ich bin krank seit Montag.~ → Ich bin *seit Montag* krank."
        ]
      }
    ],
    wortschatz: [
      ["die Praxis, Praxen", "doctor's surgery"],
      ["die Versichertenkarte, -n", "health insurance card"],
      ["das Wartezimmer, -", "waiting room"],
      ["weh tun", "to hurt"],
      ["die Schmerzen (Pl.)", "pain"],
      ["das Rezept, -e", "prescription"],
      ["die Tablette, -n", "tablet"],
      ["die Apotheke, -n", "pharmacy"],
      ["die Krankschreibung, -en", "sick note"],
      ["Gute Besserung!", "Get well soon!"]
    ],
    aufgaben: [
      { teil: "Teil 1 — Ich habe … / Mir tut … weh", typ: "luecke", frage: "Ich ___ seit gestern Halsschmerzen.", antwort: ["habe"] },
      { teil: "Teil 1 — Ich habe … / Mir tut … weh", typ: "luecke", frage: "Mir ___ der Rücken weh.", antwort: ["tut"] },
      { teil: "Teil 1 — Ich habe … / Mir tut … weh", typ: "luecke", frage: "Mir ___ die Beine weh.", antwort: ["tun"], warum: "*die Beine* ist Plural, also *tun*." },
      { teil: "Teil 1 — Ich habe … / Mir tut … weh", typ: "luecke", frage: "Nehmen Sie die Tabletten dreimal ___.", hinweis: "every day", antwort: ["täglich", "taeglich", "am Tag", "pro Tag"] },

      { teil: "Teil 2 — Was passt?", typ: "mc", frage: "Arzthelferin: *Haben Sie Ihre Versichertenkarte dabei?*", optionen: ["Ja, hier, bitte.", "Ja, ich habe Fieber.", "Nein, danke.", "Seit drei Tagen."], antwort: 0 },
      { teil: "Teil 2 — Was passt?", typ: "mc", frage: "Ärztin: *Seit wann haben Sie die Schmerzen?*", optionen: ["Im Bauch.", "Seit Montag.", "Sehr stark.", "Dreimal täglich."], antwort: 1 },
      { teil: "Teil 2 — Was passt?", typ: "mc", frage: "Der Arzt sagt: *Bleiben Sie bis Freitag zu Hause.* Das heißt …", optionen: ["Sie sollen am Freitag kommen.", "Sie sollen bis Freitag nicht arbeiten gehen.", "Die Praxis ist bis Freitag geschlossen.", "Sie sollen Freitag Tabletten kaufen."], antwort: 1 },

      { teil: "Teil 3 — In der Praxis", teilIntro: "Antworten Sie laut. Denken Sie an *seit* und an ganze Sätze.", typ: "sprechen", karte: { thema: "Anmeldung", wort: "Termin?" }, frage: "Die Arzthelferin fragt: *Haben Sie einen Termin?* Sie haben keinen, aber starke Zahnschmerzen.", muster: "Nein, ich habe leider keinen Termin. Ich habe seit gestern starke Zahnschmerzen. Kann ich heute noch kommen?" },
      { teil: "Teil 3 — In der Praxis", typ: "sprechen", karte: { thema: "Arzt", wort: "Was fehlt Ihnen?" }, frage: "Sie haben Fieber, Husten und Kopfschmerzen seit drei Tagen.", muster: "Ich habe seit drei Tagen Fieber und Husten. Außerdem habe ich starke Kopfschmerzen." },
      { teil: "Teil 3 — In der Praxis", typ: "sprechen", karte: { thema: "Arzt", wort: "Wo tut es weh?" }, frage: "Ihr rechtes Knie tut beim Treppensteigen weh.", muster: "Mir tut das rechte Knie weh, besonders auf der Treppe." },
      { teil: "Teil 3 — In der Praxis", typ: "sprechen", karte: { thema: "Arzt", wort: "Medikamente?" }, frage: "Die Ärztin fragt, ob Sie Medikamente nehmen. Sie nehmen jeden Morgen eine Tablette für den Blutdruck.", muster: "Ja, ich nehme jeden Morgen eine Tablette gegen hohen Blutdruck." },
      { teil: "Teil 3 — In der Praxis", typ: "sprechen", frage: "Sie haben nicht verstanden, wie oft Sie die Tabletten nehmen sollen. Fragen Sie nach.", muster: "Entschuldigung, wie oft soll ich die Tabletten nehmen? Vor oder nach dem Essen?" },

      { teil: "Teil 4 — Anrufen", typ: "sprechen", frage: "Sie rufen in der Praxis an. Sie brauchen einen Termin, weil Ihr Sohn Ohrenschmerzen hat. Morgen früh können Sie nicht. Spielen Sie das Gespräch.", muster: ["Praxis: Praxis Dr. Weber, Sie sprechen mit Frau Lenz.", "Anrufer: Guten Tag, hier ist Ibrahim Keita. Mein Sohn hat seit gestern Ohrenschmerzen. Kann er heute oder morgen kommen?", "Praxis: Morgen um 8:30 Uhr ist etwas frei.", "Anrufer: Morgen früh kann ich leider nicht. Geht es auch am Nachmittag?", "Praxis: Ja, um 15:15 Uhr.", "Anrufer: Das passt. Vielen Dank!"] }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "P10",
    gruppe: "alltag",
    stufe: 3,
    title: "Nach dem Weg fragen",
    subtitle: "Asking for and giving directions",
    focus: "Wie komme ich zu …? geradeaus, links, rechts, Präpositionen mit Dativ",
    intro:
      "Asking the way is easy. Understanding the answer is the hard part, because it comes fast and all at once. So this unit trains both: asking politely, and giving directions yourself — which is the best way to understand them.",
    lernen: [
      "Start with *Entschuldigung*, ask your question, and when the answer comes, repeat the key part back. Repeating is normal in German and it saves you from walking the wrong way.",
      {
        kopf: ["Fragen", "Antworten"],
        zeilen: [
          ["Entschuldigung, wie komme ich zum Bahnhof?", "Gehen Sie geradeaus bis zur Ampel."],
          ["Wo ist hier eine Apotheke?", "Dann die zweite Straße links."],
          ["Ist das weit?", "Nein, nur fünf Minuten zu Fuß."],
          ["Gibt es hier in der Nähe eine Bank?", "Die Bank ist gegenüber vom Rathaus."],
          ["Also: geradeaus, dann links?", "Genau!"]
        ]
      },
      {
        box: "rule",
        titel: "zu, an, bis zu — and the dative",
        zeilen: [
          ["zu + dem = zum", "zum Bahnhof, zum Markt, zum Krankenhaus"],
          ["zu + der = zur", "zur Post, zur Schule, zur Ampel"],
          ["an + dem = am", "am Park vorbei, am Kiosk links"],
          ["bis zu", "bis zur Kreuzung, bis zum Kreisverkehr"],
          ["gegenüber von", "gegenüber vom Kino, gegenüber von der Kirche"]
        ]
      },
      {
        box: "example",
        titel: "Directions — the words",
        zeilen: [
          ["geradeaus", "straight on"],
          ["(nach) links / rechts", "(to the) left / right"],
          ["die erste / zweite Straße links", "the first / second street on the left"],
          ["die Ampel / die Kreuzung", "traffic lights / crossroads"],
          ["über die Straße / über die Brücke", "across the road / over the bridge"],
          ["an … vorbei", "past …"],
          ["Da ist es.", "There it is."]
        ]
      },
      {
        box: "mistake",
        titel: "Watch out",
        liste: [
          "~Wie komme ich nach Bahnhof?~ → *zum* Bahnhof. _nach_ is for towns and countries: nach Berlin.",
          "Instructions to a stranger use the *Sie*-imperative: *Gehen Sie*, *Nehmen Sie*.",
          "~die zwei Straße~ → die *zweite* Straße."
        ]
      }
    ],
    aufgaben: [
      { teil: "Teil 1 — zum oder zur?", typ: "luecke", frage: "Wie komme ich ___ Post?", hinweis: "die Post", antwort: ["zur"] },
      { teil: "Teil 1 — zum oder zur?", typ: "luecke", frage: "Wie komme ich ___ Rathaus?", hinweis: "das Rathaus", antwort: ["zum"] },
      { teil: "Teil 1 — zum oder zur?", typ: "luecke", frage: "Gehen Sie geradeaus bis ___ Kreuzung.", hinweis: "die Kreuzung", antwort: ["zur"] },
      { teil: "Teil 1 — zum oder zur?", typ: "luecke", frage: "Der Bus fährt direkt ___ Flughafen.", hinweis: "der Flughafen", antwort: ["zum"] },

      {
        teil: "Teil 2 — Folgen Sie dem Weg.",
        teilIntro: "Sie stehen am Bahnhof. Lesen Sie die Wegbeschreibung und antworten Sie.",
        typ: "mc",
        frage: "Wo kommen Sie an?",
        vorlageTitel: "Wegbeschreibung",
        vorlage: [
          "Gehen Sie aus dem Bahnhof und dann nach rechts. Gehen Sie immer geradeaus bis zur Ampel. An der Ampel gehen Sie über die Straße und dann links in die Goethestraße. Gehen Sie am Supermarkt vorbei. Nach etwa 200 Metern sehen Sie auf der rechten Seite ein großes weißes Gebäude, gegenüber vom Park. Da ist es."
        ],
        optionen: ["Im Supermarkt", "An einem weißen Gebäude gegenüber vom Park", "Im Park", "Wieder am Bahnhof"],
        antwort: 1
      },
      { teil: "Teil 2 — Folgen Sie dem Weg.", typ: "rf", frage: "Sie gehen zuerst nach links.", antwort: false, warum: "Zuerst *nach rechts*, erst an der Ampel links." },
      { teil: "Teil 2 — Folgen Sie dem Weg.", typ: "rf", frage: "Sie gehen am Supermarkt vorbei.", antwort: true },
      { teil: "Teil 2 — Folgen Sie dem Weg.", typ: "rf", frage: "Das Gebäude ist auf der linken Seite.", antwort: false, warum: "*auf der rechten Seite*." },

      { teil: "Teil 3 — Fragen Sie nach dem Weg.", teilIntro: "Fragen Sie eine fremde Person höflich.", typ: "sprechen", karte: { thema: "Weg", wort: "Bahnhof" }, frage: "Sie suchen den Bahnhof.", muster: "Entschuldigung, wie komme ich zum Bahnhof?" },
      { teil: "Teil 3 — Fragen Sie nach dem Weg.", typ: "sprechen", karte: { thema: "Weg", wort: "Apotheke?" }, frage: "Sie brauchen eine Apotheke in der Nähe.", muster: "Entschuldigung, gibt es hier in der Nähe eine Apotheke?" },
      { teil: "Teil 3 — Fragen Sie nach dem Weg.", typ: "sprechen", karte: { thema: "Weg", wort: "weit?" }, frage: "Sie möchten wissen, ob es weit ist und ob Sie laufen können.", muster: "Ist das weit? Kann ich zu Fuß gehen, oder soll ich den Bus nehmen?" },
      { teil: "Teil 3 — Fragen Sie nach dem Weg.", typ: "sprechen", frage: "Die Person hat sehr schnell gesprochen. Wiederholen Sie, was Sie verstanden haben: geradeaus, zweite Straße rechts.", muster: "Also: Ich gehe geradeaus und dann die zweite Straße rechts, richtig?" },

      { teil: "Teil 4 — Den Weg beschreiben", teilIntro: "Jetzt fragt jemand Sie. Beschreiben Sie den Weg mit *Gehen Sie …*.", typ: "sprechen", karte: { thema: "Weg", wort: "Supermarkt" }, frage: "Der Supermarkt: geradeaus bis zur Kreuzung, dann rechts, nach 100 Metern links.", muster: "Gehen Sie hier geradeaus bis zur Kreuzung. Dann gehen Sie nach rechts. Nach ungefähr hundert Metern ist der Supermarkt auf der linken Seite." },
      { teil: "Teil 4 — Den Weg beschreiben", typ: "sprechen", karte: { thema: "Weg", wort: "Bushaltestelle" }, frage: "Die Bushaltestelle: über die Brücke, am Kino vorbei, gegenüber von der Schule.", muster: "Gehen Sie über die Brücke und dann am Kino vorbei. Die Bushaltestelle ist gegenüber von der Schule." },
      { teil: "Teil 4 — Den Weg beschreiben", typ: "sprechen", frage: "Beschreiben Sie den Weg von Ihrer Wohnung zu Ihrem Lieblingsort in der Stadt — ein Café, ein Park, ein Geschäft.", muster: "Von meiner Wohnung gehe ich zuerst nach links bis zur Ampel. Dort gehe ich über die Straße und dann geradeaus am Rathaus vorbei. Nach fünf Minuten komme ich zum Stadtpark. Direkt am Eingang ist mein Lieblingscafé." }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "P11",
    gruppe: "alltag",
    stufe: 3,
    title: "Am Telefon",
    subtitle: "Calls without seeing the other person",
    focus: "sich melden, verbinden, Nachricht hinterlassen, nachfragen",
    intro:
      "On the phone there are no gestures and no lips to read, and people speak at normal speed. What helps is knowing the fixed phrases at the start and end of a call — and not being shy about asking someone to repeat.",
    lernen: [
      "In Germany people answer the phone with their *surname*, often with the company name first. When you call, you do the same: say your name before you say why you are calling.",
      {
        kopf: ["Situation", "Sie hören", "Sie sagen"],
        zeilen: [
          ["Anfang", "Sprachschule Lingua, Weber, guten Tag.", "Guten Tag, hier ist Amina Sow."],
          ["Warum Sie anrufen", "Was kann ich für Sie tun?", "Ich rufe an, weil ich eine Frage zum Kurs habe."],
          ["Verbinden", "Einen Moment, ich verbinde.", "Danke."],
          ["Person nicht da", "Frau Klein ist leider nicht im Haus.", "Kann ich eine Nachricht hinterlassen?"],
          ["Nicht verstanden", "…", "Entschuldigung, können Sie das bitte wiederholen?"],
          ["Ende", "Auf Wiederhören!", "Vielen Dank, auf Wiederhören!"]
        ]
      },
      {
        box: "rule",
        titel: "Auf Wiederhören",
        text: ["On the phone you say *Auf Wiederhören* (_until we hear each other again_), not *Auf Wiedersehen*. With friends: *Tschüss* or *Bis dann*."]
      },
      {
        box: "example",
        titel: "Leaving a message on voicemail",
        text: [
          "Keep it in this order: name — why you called — what you would like — your number, slowly, twice.",
          "_Guten Tag, hier ist Kwame Mensah. Ich habe eine Frage zu meinem Termin am Freitag. Bitte rufen Sie mich zurück. Meine Nummer ist 0157 32 18 44 — ich wiederhole: 0157 32 18 44. Vielen Dank!_"
        ]
      },
      {
        box: "mistake",
        titel: "Watch out",
        liste: [
          "~Ich bin Amina.~ at the start of a call → *Hier ist* Amina Sow. / *Mein Name ist* Amina Sow.",
          "~Hallo, wer ist da?~ is rude when you are the caller.",
          "Asking to repeat is not a failure: *Wie bitte?* and *Langsamer, bitte* are completely normal."
        ]
      }
    ],
    redemittel: [
      {
        titel: "Am Telefon",
        zeilen: [
          ["Kann ich bitte mit Herrn Braun sprechen?", "Can I speak to Mr Braun, please?"],
          ["Wann kann ich ihn erreichen?", "When can I reach him?"],
          ["Können Sie ihm etwas ausrichten?", "Can you give him a message?"],
          ["Bitte rufen Sie mich zurück.", "Please call me back."],
          ["Ich habe mich verwählt.", "I dialled the wrong number."],
          ["Die Verbindung ist schlecht.", "The line is bad."]
        ]
      }
    ],
    aufgaben: [
      { teil: "Teil 1 — Was sagt man?", typ: "mc", frage: "Sie rufen an. Was sagen Sie zuerst?", optionen: ["Hallo, wer ist da?", "Guten Tag, hier ist Ali Hassan.", "Ich bin es.", "Auf Wiederhören!"], antwort: 1 },
      { teil: "Teil 1 — Was sagt man?", typ: "mc", frage: "Wie beendet man ein formelles Telefongespräch?", optionen: ["Auf Wiedersehen!", "Auf Wiederhören!", "Gute Nacht!", "Bis gleich!"], antwort: 1 },
      { teil: "Teil 1 — Was sagt man?", typ: "mc", frage: "Die Sekretärin sagt: *Herr Braun ist gerade in einer Besprechung.*", optionen: ["Dann spreche ich mit ihm.", "Kann ich eine Nachricht hinterlassen?", "Ich habe mich verwählt.", "Wie bitte? Tschüss."], antwort: 1 },

      { teil: "Teil 2 — Ergänzen Sie.", typ: "luecke", frage: "Guten Tag, ___ ist Nadia Benali.", antwort: ["hier"] },
      { teil: "Teil 2 — Ergänzen Sie.", typ: "luecke", frage: "Kann ich bitte mit Frau Klein ___?", antwort: ["sprechen"] },
      { teil: "Teil 2 — Ergänzen Sie.", typ: "luecke", frage: "Bitte rufen Sie mich ___.", antwort: ["zurück", "zurueck"] },
      { teil: "Teil 2 — Ergänzen Sie.", typ: "luecke", frage: "Entschuldigung, können Sie das bitte ___?", antwort: ["wiederholen"] },

      { teil: "Teil 3 — Telefonieren", teilIntro: "Sprechen Sie laut. Nehmen Sie sich auf — am Telefon hört man nur Ihre Stimme.", typ: "sprechen", karte: { thema: "Telefon", wort: "Sprachschule" }, frage: "Sie rufen bei der Sprachschule an. Melden Sie sich und sagen Sie, warum Sie anrufen: Sie möchten wissen, wann der nächste A2-Kurs beginnt.", muster: "Guten Tag, hier ist Amina Sow. Ich rufe an, weil ich eine Frage habe: Wann beginnt der nächste A2-Kurs?" },
      { teil: "Teil 3 — Telefonieren", typ: "sprechen", karte: { thema: "Telefon", wort: "Herr Braun?" }, frage: "Sie möchten mit Herrn Braun sprechen.", muster: "Kann ich bitte mit Herrn Braun sprechen?" },
      { teil: "Teil 3 — Telefonieren", typ: "sprechen", karte: { thema: "Telefon", wort: "nicht da" }, frage: "Herr Braun ist nicht da. Fragen Sie, wann Sie ihn erreichen können.", muster: "Schade. Wann kann ich ihn denn erreichen? Ist er heute Nachmittag im Büro?" },
      { teil: "Teil 3 — Telefonieren", typ: "sprechen", karte: { thema: "Telefon", wort: "???" }, frage: "Die Verbindung ist schlecht, Sie verstehen nichts.", muster: "Entschuldigung, die Verbindung ist sehr schlecht. Können Sie das bitte noch einmal wiederholen?" },
      { teil: "Teil 3 — Telefonieren", typ: "sprechen", frage: "Sie haben die falsche Nummer gewählt. Entschuldigen Sie sich.", muster: "Oh, Entschuldigung, ich habe mich verwählt. Auf Wiederhören!" },

      { teil: "Teil 4 — Auf den Anrufbeantworter sprechen", typ: "sprechen", frage: "Sie erreichen niemanden in der Autowerkstatt. Sprechen Sie eine Nachricht: Ihr Auto ist seit Montag dort, Sie möchten wissen, wann es fertig ist. Nennen Sie Ihre Nummer 0176 84 29 03.", stichworte: ["Name", "Grund", "Bitte", "Nummer zweimal"], muster: "Guten Tag, hier ist Kwame Mensah. Mein Auto, ein blauer Golf, ist seit Montag bei Ihnen in der Werkstatt. Ich möchte gern wissen, wann es fertig ist. Bitte rufen Sie mich zurück. Meine Nummer ist null-eins-sieben-sechs, vierundachtzig, neunundzwanzig, null-drei. Ich wiederhole: null-eins-sieben-sechs, vierundachtzig, neunundzwanzig, null-drei. Vielen Dank, auf Wiederhören!" },
      { teil: "Teil 4 — Auf den Anrufbeantworter sprechen", typ: "sprechen", frage: "Rufen Sie Ihre Freundin Lisa an. Sie geht nicht ran. Sprechen Sie eine kurze Nachricht: Sie kommen heute Abend eine halbe Stunde später.", muster: "Hi Lisa, ich bin's, Chiara. Ich komme heute Abend leider eine halbe Stunde später, so um halb acht. Mein Zug hat Verspätung. Bis dann, tschüss!" }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "P12",
    gruppe: "alltag",
    stufe: 3,
    title: "Gemeinsam etwas planen",
    subtitle: "Suggesting, agreeing and finding a time",
    focus: "Vorschläge machen, zustimmen, ablehnen, einen Termin finden",
    intro:
      "Planning something together — a birthday present, a trip, a meeting — is a real conversation: one person suggests, the other agrees or says no and suggests something else, and at the end you have a plan. That back-and-forth is exactly what this last unit practises.",
    lernen: [
      "A planning conversation goes round in a loop: *suggest — react — suggest again — agree*. Each person should speak several times, and the conversation ends only when you have decided who does what, and when.",
      {
        kopf: ["Sie möchten …", "Redemittel"],
        zeilen: [
          ["vorschlagen", "Wollen wir …? / Wie wäre es mit …? / Wir können doch …"],
          ["zustimmen", "Gute Idee! / Ja, das passt. / Einverstanden."],
          ["ablehnen", "Das geht leider nicht, weil … / Ich habe da keine Zeit."],
          ["etwas anderes vorschlagen", "Und was ist mit Sonntag? / Lieber am Abend."],
          ["nachfragen", "Hast du am … Zeit? / Wann passt es dir?"],
          ["festlegen", "Also treffen wir uns am … um … / Ich kaufe …, und du …"]
        ]
      },
      {
        box: "rule",
        titel: "Wollen wir …? and Wie wäre es mit …?",
        zeilen: [
          ["Wollen wir + Infinitiv am Ende?", "Wollen wir am Samstag ins Museum *gehen*?"],
          ["Wie wäre es mit + Dativ?", "Wie wäre es mit *einem* Picknick? — mit *dem* Zug?"],
          ["Lass uns …", "Lass uns zusammen *kochen*! (friends)"]
        ]
      },
      {
        box: "example",
        titel: "A short planning conversation",
        text: [
          "*A:* Nächste Woche hat Tom Geburtstag. Wollen wir ihm zusammen etwas schenken?",
          "*B:* Gute Idee! Wie wäre es mit einem Buch?",
          "*A:* Hm, er liest nicht so gern. Was ist mit Kinokarten?",
          "*B:* Ja, das ist besser. Wann kaufen wir sie?",
          "*A:* Hast du am Donnerstag nach dem Kurs Zeit?",
          "*B:* Donnerstag geht leider nicht, da arbeite ich. Freitag?",
          "*A:* Freitag passt. Also treffen wir uns am Freitag um fünf am Kino."
        ]
      }
    ],
    aufgaben: [
      { teil: "Teil 1 — Was passt?", typ: "mc", frage: "*Wollen wir am Sonntag grillen?* — Sie haben Lust.", optionen: ["Nein, danke.", "Au ja, gute Idee!", "Ich habe gegrillt.", "Das geht leider nicht."], antwort: 1 },
      { teil: "Teil 1 — Was passt?", typ: "mc", frage: "*Treffen wir uns um 18 Uhr?* — Sie arbeiten bis 18 Uhr.", optionen: ["Einverstanden!", "18 Uhr ist zu früh, ich arbeite bis sechs. Geht es um sieben?", "Ja, um 18 Uhr arbeite ich.", "Nein."], antwort: 1 },
      { teil: "Teil 1 — Was passt?", typ: "mc", frage: "Welcher Vorschlag ist richtig gebildet?", optionen: ["Wie wäre es mit ein Picknick?", "Wie wäre es mit einem Picknick?", "Wie wäre es mit einen Picknick?", "Wie wäre es mit Picknick machen?"], antwort: 1, warum: "*mit* + Dativ: *einem* Picknick." },

      { teil: "Teil 2 — Ergänzen Sie.", typ: "luecke", frage: "___ wir am Wochenende an den See fahren?", antwort: ["Wollen", "Sollen"] },
      { teil: "Teil 2 — Ergänzen Sie.", typ: "luecke", frage: "Wie ___ es mit einem Film?", antwort: ["wäre", "waere"] },
      { teil: "Teil 2 — Ergänzen Sie.", typ: "luecke", frage: "Am Samstag ___ es leider nicht, da besuche ich meine Oma.", antwort: ["geht"] },
      { teil: "Teil 2 — Ergänzen Sie.", typ: "luecke", frage: "Also ___ wir uns am Freitag um fünf.", antwort: ["treffen"] },

      { teil: "Teil 3 — Reagieren Sie.", teilIntro: "Ihre Freundin macht einen Vorschlag. Reagieren Sie laut wie auf der Karte.", typ: "sprechen", karte: { thema: "Vorschlag", wort: "Kino am Freitag?" }, frage: "Sie haben Zeit und Lust.", muster: "Ja, gern! Welchen Film wollen wir sehen? Und um wie viel Uhr?" },
      { teil: "Teil 3 — Reagieren Sie.", typ: "sprechen", karte: { thema: "Vorschlag", wort: "Joggen um 7 Uhr?" }, frage: "Das ist Ihnen zu früh. Machen Sie einen anderen Vorschlag.", muster: "Um sieben? Das ist mir zu früh! Wie wäre es mit neun Uhr?" },
      { teil: "Teil 3 — Reagieren Sie.", typ: "sprechen", karte: { thema: "Vorschlag", wort: "Pizza bestellen?" }, frage: "Sie möchten lieber selbst kochen.", muster: "Hm, lieber nicht. Lass uns doch zusammen kochen, das ist billiger und macht mehr Spaß." },
      { teil: "Teil 3 — Reagieren Sie.", typ: "sprechen", karte: { thema: "Vorschlag", wort: "Samstag Zoo?" }, frage: "Am Samstag arbeiten Sie. Sagen Sie ab und schlagen Sie Sonntag vor.", muster: "Samstag geht leider nicht, da muss ich arbeiten. Hast du am Sonntag Zeit?" },

      {
        teil: "Teil 4 — Planen Sie zusammen.",
        teilIntro: "Spielen Sie beide Personen — oder üben Sie mit einem Partner. Sprechen Sie, bis der Plan fertig ist.",
        typ: "sprechen",
        frage: "Ihre Kursleiterin hört nächste Woche auf. Planen Sie mit einer Kollegin ein kleines Abschiedsgeschenk.",
        stichworte: ["Was schenken?", "Wer kauft?", "Wie viel Geld?", "Wann übergeben?"],
        muster: [
          "A: Frau Neumann hört nächste Woche auf. Wollen wir ihr etwas schenken?",
          "B: Ja, unbedingt! Wie wäre es mit Blumen?",
          "A: Blumen sind schön, aber vielleicht noch eine Karte von allen?",
          "B: Gute Idee. Ich kaufe die Blumen, und du kümmerst dich um die Karte.",
          "A: Einverstanden. Wie viel Geld sammeln wir? Fünf Euro pro Person?",
          "B: Ja, das ist okay. Wann geben wir ihr das Geschenk?",
          "A: Am Donnerstag in der letzten Stunde, am Ende.",
          "B: Perfekt, dann machen wir das so."
        ]
      },
      {
        teil: "Teil 4 — Planen Sie zusammen.",
        typ: "sprechen",
        frage: "Sie und ein Freund wollen am Wochenende einen Ausflug machen. Sie müssen einen Tag, ein Ziel und eine Uhrzeit finden. Ihr Freund hat am Samstagvormittag keine Zeit.",
        stichworte: ["Wohin?", "Wann?", "Wie fahren?", "Was mitnehmen?"],
        muster: [
          "A: Das Wetter soll am Wochenende schön sein. Wollen wir einen Ausflug machen?",
          "B: Gern! Wohin denn?",
          "A: Wie wäre es mit dem Wildpark? Da war ich noch nie.",
          "B: Gute Idee. Aber am Samstagvormittag kann ich nicht, da habe ich Training.",
          "A: Kein Problem. Dann Samstagnachmittag oder Sonntag?",
          "B: Lieber Sonntag, dann haben wir den ganzen Tag.",
          "A: Okay. Fahren wir mit dem Bus? Er fährt um halb zehn am Marktplatz ab.",
          "B: Ja, das passt. Ich bringe Brötchen und Obst mit.",
          "A: Und ich nehme Getränke mit. Also bis Sonntag um Viertel nach neun am Marktplatz!"
        ]
      }
    ]
  }
];

var SPRECHEN_GRUPPEN = [
  {
    key: "person",
    titel: "Zur Person",
    unter: "About you",
    text: "Introducing yourself, spelling your name, numbers, and asking other people about themselves."
  },
  {
    key: "themen",
    titel: "Über Themen sprechen",
    unter: "Talking about topics",
    text: "Word cards on everyday topics: ask a question with the word, then answer it about yourself."
  },
  {
    key: "alltag",
    titel: "Im Alltag",
    unter: "Everyday situations",
    text: "Requests, shops, cafés, the doctor, directions and the telephone — the conversations you actually need."
  }
];
