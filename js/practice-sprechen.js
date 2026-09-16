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
