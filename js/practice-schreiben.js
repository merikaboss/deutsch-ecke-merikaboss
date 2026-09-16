/* ============================================================
   Deutsch Ecke — Übungsbuch: Schreiben
   Every unit is written from scratch for this site. The "So geht's"
   part explains in English how the text type is built; the tasks
   themselves are in German. Field formats are described in
   js/practice.js.
   ============================================================ */

var SCHREIBEN_UNITS = [

  /* ---------------------------------------------------------- */
  {
    id: "S01",
    gruppe: "grundlagen",
    stufe: 1,
    title: "Formulare ausfüllen",
    subtitle: "Filling in forms",
    focus: "Personalien, Datum, Adresse, Familienstand",
    intro:
      "Forms are usually the first thing you ever write in German — at the registration office, at a language school, at the doctor's, for a sports club. They do not ask questions. They use short nouns, and you have to know what each one wants.",
    lernen: [
      "German forms look much the same wherever you fill them in — at the Bürgeramt, at a school, at a doctor's surgery. Learn these words once and you can manage almost any of them, even when the rest of the form is hard to read.",
      { h3: "The words on almost every form" },
      {
        kopf: ["Im Formular", "Was Sie schreiben", "Beispiel"],
        zeilen: [
          ["Familienname / Nachname / Name", "surname", "Okello"],
          ["Vorname", "first name", "Daniel"],
          ["Geburtsdatum", "date of birth", "14.03.1999"],
          ["Geburtsort", "town of birth", "Jinja"],
          ["Geburtsland", "country of birth", "Uganda"],
          ["Staatsangehörigkeit", "nationality", "ugandisch"],
          ["Familienstand", "marital status", "ledig"],
          ["Straße, Hausnummer", "street and number", "Bonner Straße 27"],
          ["PLZ, Wohnort", "postcode and town", "50677 Köln"],
          ["Telefon / Handy", "phone / mobile", "0176 5528193"],
          ["Beruf", "job", "Koch"],
          ["Muttersprache", "first language", "Englisch"],
          ["Datum, Unterschrift", "date, signature", "12.09.2026, D. Okello"]
        ]
      },
      {
        box: "rule",
        titel: "Familienstand — four words",
        zeilen: [
          ["ledig", "single, never married"],
          ["verheiratet", "married"],
          ["geschieden", "divorced"],
          ["verwitwet", "widowed"]
        ]
      },
      {
        box: "rule",
        titel: "Dates and addresses",
        liste: [
          "The date goes *day . month . year*: 14.03.1999 is the fourteenth of March. Never the month first.",
          "In an address the street comes first and the number after it: *Bonner Straße 27*, not *27 Bonner Straße*.",
          "The postcode (PLZ) stands in front of the town: *50677 Köln*.",
          "_Anrede_ with boxes to tick: *Frau* for a woman, *Herr* for a man."
        ]
      },
      {
        box: "mistake",
        titel: "Nationality is not the country",
        text: [
          "*Staatsangehörigkeit* wants the adjective, written small: *deutsch, ugandisch, kenianisch, nigerianisch, türkisch*. The name of the country belongs under *Geburtsland* or *Land*.",
          "*Muttersprache* is a language, and languages are written with a capital letter: *Englisch, Swahili, Arabisch*."
        ]
      }
    ],
    wortschatz: [
      ["das Formular, -e", "form"],
      ["ausfüllen", "to fill in (separable)"],
      ["die Anmeldung, -en", "registration"],
      ["sich anmelden", "to register, to sign up"],
      ["die Angabe, -n", "piece of information, detail"],
      ["ankreuzen", "to tick (a box)"],
      ["unterschreiben", "to sign"],
      ["die Unterschrift, -en", "signature"],
      ["der Kurs, -e", "course"],
      ["der Verein, -e", "club"]
    ],
    aufgaben: [
      { teil: "Teil 1 — Was bedeutet das?", typ: "mc", frage: "Im Formular steht *Familienstand*. Was schreiben Sie?", optionen: ["Die Namen von Ihren Eltern", "ledig, verheiratet, geschieden oder verwitwet", "Wie viele Kinder Sie haben", "Ihre Adresse"], antwort: 1 },
      { teil: "Teil 1 — Was bedeutet das?", typ: "mc", frage: "*PLZ* ist …", optionen: ["die Postleitzahl", "der Platz", "die Personalnummer", "das Land"], antwort: 0 },
      { teil: "Teil 1 — Was bedeutet das?", typ: "mc", frage: "Was schreiben Sie bei *Unterschrift*?", optionen: ["Das Datum von heute", "Ihren Beruf", "Ihren Namen mit der Hand", "Ihre E-Mail-Adresse"], antwort: 2 },
      { teil: "Teil 1 — Was bedeutet das?", typ: "mc", frage: "Sie sind in Kampala geboren und kommen aus Uganda. Was steht bei *Geburtsort*?", optionen: ["Uganda", "ugandisch", "Kampala", "Afrika"], antwort: 2, warum: "Der Geburtsort ist die Stadt. Das Land heißt Geburtsland." },
      { teil: "Teil 1 — Was bedeutet das?", typ: "mc", frage: "Welche Adresse ist richtig geschrieben?", optionen: ["27 Bonner Straße, Köln 50677", "Bonner Straße 27, 50677 Köln", "Köln 50677, Straße Bonner 27", "50677 Bonner Straße, 27 Köln"], antwort: 1 },

      {
        teil: "Teil 2 — Füllen Sie das Formular aus.",
        teilIntro: "Lesen Sie, was Daniel über sich erzählt. Schreiben Sie dann seine Angaben in das Anmeldeformular.",
        typ: "feld",
        frage: "Anmeldung — Einwohnermeldeamt Köln",
        vorlage: [
          "Mein Name ist Daniel Okello. Ich komme aus Uganda und bin am 14. März 1999 in Jinja geboren. Seit August wohne ich in Köln, in der Bonner Straße 27. Die Postleitzahl ist 50677. Ich bin nicht verheiratet. Ich arbeite als Koch in einem Hotel. Meine Handynummer ist 0176 5528193."
        ],
        felder: [
          { label: "Familienname", antwort: ["Okello"] },
          { label: "Vorname", antwort: ["Daniel"] },
          { label: "Geburtsdatum (TT.MM.JJJJ)", antwort: ["14.03.1999", "14.3.1999", "14. März 1999"] },
          { label: "Geburtsort", antwort: ["Jinja"] },
          { label: "Staatsangehörigkeit", antwort: ["ugandisch"] },
          { label: "Familienstand", antwort: ["ledig"] },
          { label: "Straße, Hausnummer", antwort: ["Bonner Straße 27", "Bonner Str. 27"] },
          { label: "PLZ, Wohnort", antwort: ["50677 Köln"] },
          { label: "Beruf", antwort: ["Koch"] },
          { label: "Handy", antwort: ["0176 5528193", "01765528193"] }
        ],
        warum: "„Nicht verheiratet“ heißt im Formular *ledig*. Die Staatsangehörigkeit ist das Adjektiv: *ugandisch*."
      },

      {
        teil: "Teil 3 — Anmeldung für einen Kurs",
        teilIntro: "Sofia meldet sich an der Volkshochschule an. Lesen Sie das Gespräch und füllen Sie das Formular aus.",
        typ: "feld",
        frage: "Kursanmeldung — Volkshochschule Bremen",
        vorlage: [
          "*Mitarbeiter:* Guten Tag! Was kann ich für Sie tun?",
          "*Sofia:* Guten Tag. Ich möchte mich für einen Deutschkurs anmelden. Ich bin Anfängerin.",
          "*Mitarbeiter:* Dann passt der Kurs A1. Morgens oder abends?",
          "*Sofia:* Abends, bitte. Am Tag arbeite ich in einer Bäckerei.",
          "*Mitarbeiter:* Gut. Wie ist Ihr Name?",
          "*Sofia:* Sofia Ramírez. Ramírez mit z am Ende.",
          "*Mitarbeiter:* Und Ihr Geburtsdatum?",
          "*Sofia:* Der zweite November 1994.",
          "*Mitarbeiter:* Welche Muttersprache haben Sie?",
          "*Sofia:* Spanisch. Ich komme aus Kolumbien.",
          "*Mitarbeiter:* Haben Sie eine E-Mail-Adresse?",
          "*Sofia:* Ja: sofia.ramirez@mail.de."
        ],
        felder: [
          { label: "Nachname", antwort: ["Ramírez", "Ramirez"] },
          { label: "Vorname", antwort: ["Sofia"] },
          { label: "Geburtsdatum (TT.MM.JJJJ)", antwort: ["02.11.1994", "2.11.1994", "2. November 1994"] },
          { label: "Muttersprache", antwort: ["Spanisch"] },
          { label: "Herkunftsland", antwort: ["Kolumbien"] },
          { label: "Kurs", antwort: ["A1", "Deutsch A1", "A1 abends", "A1 Abendkurs", "Deutschkurs A1"] },
          { label: "Kurszeit (morgens / abends)", antwort: ["abends"] },
          { label: "E-Mail", antwort: ["sofia.ramirez@mail.de"] }
        ],
        warum: "Der Monat November ist der elfte Monat: *02.11.1994*."
      },

      { teil: "Teil 4 — Das Datum mit Zahlen", typ: "luecke", frage: "der dritte Juli zweitausendeins", hinweis: "TT.MM.JJJJ", antwort: ["03.07.2001", "3.7.2001"] },
      { teil: "Teil 4 — Das Datum mit Zahlen", typ: "luecke", frage: "der einunddreißigste Dezember neunzehnhundertachtundneunzig", hinweis: "TT.MM.JJJJ", antwort: ["31.12.1998"] },
      { teil: "Teil 4 — Das Datum mit Zahlen", typ: "luecke", frage: "der zwanzigste Februar zweitausendfünf", hinweis: "TT.MM.JJJJ", antwort: ["20.02.2005", "20.2.2005"], warum: "Februar ist der zweite Monat. Der Tag steht immer zuerst." },

      {
        teil: "Teil 5 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Sie möchten in einem Sportverein Mitglied werden. Schreiben Sie Ihre Angaben so, wie sie im Formular stehen — eine Angabe pro Zeile.",
        punkte: ["Name und Vorname", "Geburtsdatum und Staatsangehörigkeit", "Adresse mit PLZ", "Telefon oder E-Mail", "Sportart und wann Sie Zeit haben"],
        muster: [
          "Name: Achieng",
          "Vorname: Grace",
          "Geburtsdatum: 08.06.2000",
          "Staatsangehörigkeit: kenianisch",
          "Straße, Hausnummer: Lindenweg 4",
          "PLZ, Wohnort: 04109 Leipzig",
          "E-Mail: grace.achieng@mail.de",
          "Sportart: Schwimmen",
          "Zeit: dienstags und donnerstags ab 18 Uhr"
        ],
        checkliste: [
          "Steht das Datum als Tag.Monat.Jahr?",
          "Steht die Hausnummer *nach* der Straße und die PLZ *vor* der Stadt?",
          "Ist die Staatsangehörigkeit ein kleingeschriebenes Adjektiv?"
        ]
      }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "S02",
    gruppe: "grundlagen",
    stufe: 1,
    title: "Sätze bauen",
    subtitle: "Word order in German sentences",
    focus: "Verb auf Position 2, Fragen, Satzklammer",
    intro:
      "Before any email or message, the sentence itself has to stand. German is flexible about most words, but strict about one: the verb. Get the verb into the right place and a sentence already sounds German, even with small mistakes elsewhere.",
    lernen: [
      "In a normal statement the conjugated verb is always in *position 2*. Position 2 does not mean the second word — it means the second *part*. The first part can be one word or a whole group of words.",
      {
        kopf: ["Position 1", "Verb", "der Rest"],
        zeilen: [
          ["Ich", "wohne", "in Hamburg."],
          ["Meine Schwester", "arbeitet", "in einem Krankenhaus."],
          ["Heute", "gehe", "ich ins Kino."],
          ["Am Samstag", "besuchen", "wir unsere Oma."]
        ]
      },
      {
        box: "rule",
        titel: "Something else at the front — the subject moves behind the verb",
        text: [
          "When a time or place starts the sentence, the verb stays where it is and the subject goes straight after it.",
          "*Ich* spiele am Sonntag Fußball. → *Am Sonntag* spiele *ich* Fußball."
        ]
      },
      { h3: "Questions" },
      {
        kopf: ["Art", "Bau", "Beispiel"],
        zeilen: [
          ["W-Frage", "W-Wort + Verb + Subjekt", "Wo *wohnst* du?"],
          ["Ja/Nein-Frage", "Verb + Subjekt", "*Wohnst* du in Hamburg?"],
          ["Bitte / Aufforderung", "Verb + Sie", "*Kommen* Sie bitte morgen."]
        ]
      },
      {
        box: "rule",
        titel: "The sentence bracket (Satzklammer)",
        text: [
          "Some verbs come in two parts. The first part takes position 2, the second part goes to the very *end* of the sentence, and everything else sits in between."
        ],
        zeilen: [
          ["trennbares Verb", "Ich *rufe* dich morgen *an*."],
          ["Modalverb", "Ich *möchte* einen Kaffee *trinken*."],
          ["Perfekt", "Wir *haben* gestern Pizza *gegessen*."]
        ]
      },
      {
        box: "mistake",
        titel: "Typical mistakes",
        liste: [
          "~Heute ich gehe ins Kino.~ → *Heute gehe ich* ins Kino.",
          "~Ich kann nicht kommen morgen.~ → Ich *kann* morgen nicht *kommen*.",
          "~Wo du wohnst?~ → *Wo wohnst du?*",
          "~Ich stehe auf um sieben.~ → Ich *stehe* um sieben *auf*."
        ]
      }
    ],
    aufgaben: [
      { teil: "Teil 1 — Bauen Sie den Satz.", teilIntro: "Schreiben Sie die Wörter in der richtigen Reihenfolge. Punkt und Fragezeichen zählen nicht.", typ: "luecke", frage: "Aussage", woerter: ["wohne", "in Nairobi", "ich"], antwort: ["Ich wohne in Nairobi.", "In Nairobi wohne ich."] },
      { teil: "Teil 1 — Bauen Sie den Satz.", typ: "luecke", frage: "Aussage — beginnen Sie mit *am Wochenende*", woerter: ["fahre", "ich", "am Wochenende", "zu meinen Eltern"], antwort: ["Am Wochenende fahre ich zu meinen Eltern."] },
      { teil: "Teil 1 — Bauen Sie den Satz.", typ: "luecke", frage: "W-Frage", woerter: ["kommst", "woher", "du"], antwort: ["Woher kommst du?"] },
      { teil: "Teil 1 — Bauen Sie den Satz.", typ: "luecke", frage: "Ja/Nein-Frage", woerter: ["Sie", "Deutsch", "sprechen"], antwort: ["Sprechen Sie Deutsch?"] },
      { teil: "Teil 1 — Bauen Sie den Satz.", typ: "luecke", frage: "Aussage mit trennbarem Verb", woerter: ["um sieben Uhr", "auf", "stehe", "ich"], antwort: ["Ich stehe um sieben Uhr auf.", "Um sieben Uhr stehe ich auf."], warum: "*auf* gehört zu *aufstehen* und steht am Satzende." },
      { teil: "Teil 1 — Bauen Sie den Satz.", typ: "luecke", frage: "Aussage mit Modalverb", woerter: ["möchte", "eine Pizza", "ich", "bestellen"], antwort: ["Ich möchte eine Pizza bestellen.", "Eine Pizza möchte ich bestellen."], warum: "Das Modalverb steht auf Position 2, der Infinitiv am Ende." },
      { teil: "Teil 1 — Bauen Sie den Satz.", typ: "luecke", frage: "Aussage im Perfekt — beginnen Sie mit *gestern*", woerter: ["habe", "gestern", "gearbeitet", "ich", "lange"], antwort: ["Gestern habe ich lange gearbeitet."] },
      { teil: "Teil 1 — Bauen Sie den Satz.", typ: "luecke", frage: "Ja/Nein-Frage", woerter: ["mir", "kannst", "helfen", "du"], antwort: ["Kannst du mir helfen?"] },

      { teil: "Teil 2 — Welcher Satz ist richtig?", typ: "mc", frage: "Wählen Sie den richtigen Satz.", optionen: ["Morgen ich habe keine Zeit.", "Morgen habe ich keine Zeit.", "Morgen habe keine Zeit ich.", "Ich morgen habe keine Zeit."], antwort: 1 },
      { teil: "Teil 2 — Welcher Satz ist richtig?", typ: "mc", frage: "Wählen Sie den richtigen Satz.", optionen: ["Wann beginnt der Kurs?", "Wann der Kurs beginnt?", "Der Kurs beginnt wann?", "Beginnt wann der Kurs?"], antwort: 0 },
      { teil: "Teil 2 — Welcher Satz ist richtig?", typ: "mc", frage: "Wählen Sie den richtigen Satz.", optionen: ["Wir kaufen ein am Samstag.", "Wir am Samstag kaufen ein.", "Wir kaufen am Samstag ein.", "Am Samstag wir kaufen ein."], antwort: 2 },

      { teil: "Teil 3 — Beginnen Sie mit dem markierten Teil.", typ: "luecke", frage: "Wir spielen *am Sonntag* Fußball.", antwort: ["Am Sonntag spielen wir Fußball."] },
      { teil: "Teil 3 — Beginnen Sie mit dem markierten Teil.", typ: "luecke", frage: "Meine Mutter kocht *jeden Abend* Reis.", antwort: ["Jeden Abend kocht meine Mutter Reis."] },
      { teil: "Teil 3 — Beginnen Sie mit dem markierten Teil.", typ: "luecke", frage: "Ich muss *heute* lange arbeiten.", antwort: ["Heute muss ich lange arbeiten."], warum: "*muss* bleibt auf Position 2, *arbeiten* bleibt am Ende." },

      { teil: "Teil 4 — Schreiben Sie die Frage.", teilIntro: "Hier ist die Antwort. Schreiben Sie die passende Frage mit *du*.", typ: "luecke", frage: "Ich wohne in Berlin.", antwort: ["Wo wohnst du?"] },
      { teil: "Teil 4 — Schreiben Sie die Frage.", typ: "luecke", frage: "Ich bin 23 Jahre alt.", antwort: ["Wie alt bist du?"] },
      { teil: "Teil 4 — Schreiben Sie die Frage.", typ: "luecke", frage: "Ja, ich habe einen Bruder.", antwort: ["Hast du einen Bruder?", "Hast du Geschwister?"], warum: "Die Antwort beginnt mit *Ja* — also ist es eine Ja/Nein-Frage: das Verb steht vorne." },

      {
        teil: "Teil 5 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Was machen Sie am Sonntag? Schreiben Sie fünf Sätze. Jeder Satz beginnt mit einem anderen Wort.",
        woerter: 35,
        muster: "Am Sonntag schlafe ich lange. Um zehn Uhr frühstücke ich mit meiner Familie. Dann gehen wir in die Kirche. Nachmittags treffe ich meine Freunde im Park. Abends sehe ich einen Film und gehe früh ins Bett.",
        checkliste: [
          "Steht in jedem Satz das Verb auf Position 2?",
          "Steht das Subjekt direkt nach dem Verb, wenn der Satz mit einer Zeit beginnt?",
          "Stehen trennbare Vorsilben am Ende?"
        ]
      }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "S03",
    gruppe: "grundlagen",
    stufe: 2,
    title: "Sätze verbinden",
    subtitle: "und, aber, oder, denn — zuerst, dann, danach",
    focus: "Konjunktionen, Reihenfolge, Komma",
    intro:
      "A text made only of short sentences reads like a list. Two kinds of small words join them together, and they behave differently — one kind leaves the word order alone, the other takes position 1 and pushes the subject behind the verb.",
    lernen: [
      { h3: "Joining words that change nothing" },
      "*und, aber, oder, denn* stand *between* two sentences. They do not count as a position, so the second sentence keeps its normal order.",
      {
        kopf: ["Wort", "Bedeutung", "Beispiel"],
        zeilen: [
          ["und", "and", "Ich koche, *und* mein Bruder deckt den Tisch."],
          ["aber", "but", "Die Wohnung ist schön, *aber* sie ist teuer."],
          ["oder", "or", "Trinkst du Tee, *oder* möchtest du Kaffee?"],
          ["denn", "because", "Ich bleibe zu Hause, *denn* ich bin krank."]
        ]
      },
      {
        box: "rule",
        titel: "Position 0",
        text: [
          "Think of these four as position 0: *denn* | *ich* | *bin* | krank.",
          "A comma goes before *aber* and *denn*. Before *und* and *oder* it is optional."
        ]
      },
      { h3: "Words that put things in order" },
      "*zuerst, dann, danach, später, zum Schluss* are adverbs. They take position 1 themselves, so the verb follows straight after and the subject comes behind it.",
      {
        kopf: ["Position 1", "Verb", "der Rest"],
        zeilen: [
          ["Zuerst", "dusche", "ich."],
          ["Dann", "frühstücke", "ich."],
          ["Danach", "fahre", "ich zur Arbeit."],
          ["Zum Schluss", "räume", "ich die Küche auf."]
        ]
      },
      {
        box: "mistake",
        titel: "denn and dann look alike",
        liste: [
          "*denn* gives a reason and does not move the verb: …, *denn ich habe* Hunger.",
          "*dann* means _then_ and is position 1: *Dann esse ich* etwas.",
          "~…, denn habe ich Hunger.~ is wrong — that would be the word order of *dann*."
        ]
      }
    ],
    aufgaben: [
      { teil: "Teil 1 — Welches Wort passt?", typ: "mc", frage: "Ich möchte ins Kino gehen, ___ ich habe kein Geld.", optionen: ["und", "aber", "oder", "denn"], antwort: 1 },
      { teil: "Teil 1 — Welches Wort passt?", typ: "mc", frage: "Wir fahren nicht mit dem Auto, ___ es ist kaputt.", optionen: ["denn", "oder", "aber", "dann"], antwort: 0 },
      { teil: "Teil 1 — Welches Wort passt?", typ: "mc", frage: "Möchtest du Wasser ___ Saft?", optionen: ["aber", "denn", "oder", "dann"], antwort: 2 },
      { teil: "Teil 1 — Welches Wort passt?", typ: "mc", frage: "Mein Vater kocht, ___ meine Mutter kauft ein.", optionen: ["denn", "und", "oder", "zuerst"], antwort: 1 },
      { teil: "Teil 1 — Welches Wort passt?", typ: "mc", frage: "Zuerst kaufe ich ein. ___ koche ich.", optionen: ["Denn", "Aber", "Dann", "Oder"], antwort: 2, warum: "Nach dem Wort kommt direkt das Verb: *koche ich*. Das passt nur zu *dann*." },

      { teil: "Teil 2 — Verbinden Sie die Sätze.", teilIntro: "Schreiben Sie einen Satz mit dem Wort in Klammern.", typ: "luecke", lang: true, frage: "Ich lerne Deutsch. Ich möchte in Deutschland arbeiten. (denn)", antwort: ["Ich lerne Deutsch, denn ich möchte in Deutschland arbeiten.", "Ich lerne Deutsch denn ich möchte in Deutschland arbeiten."] },
      { teil: "Teil 2 — Verbinden Sie die Sätze.", typ: "luecke", lang: true, frage: "Das Hotel ist klein. Es ist sehr sauber. (aber)", antwort: ["Das Hotel ist klein, aber es ist sehr sauber.", "Das Hotel ist klein, aber sehr sauber."] },
      { teil: "Teil 2 — Verbinden Sie die Sätze.", typ: "luecke", lang: true, frage: "Kommst du heute? Kommst du morgen? (oder)", antwort: ["Kommst du heute oder morgen?", "Kommst du heute, oder kommst du morgen?", "Kommst du heute oder kommst du morgen?"] },
      { teil: "Teil 2 — Verbinden Sie die Sätze.", typ: "luecke", lang: true, frage: "Sara bleibt im Bett. Sie hat Fieber. (denn)", antwort: ["Sara bleibt im Bett, denn sie hat Fieber."], warum: "Nach *denn* bleibt die normale Wortstellung: *sie hat*." },

      { teil: "Teil 3 — Schreiben Sie den Satz neu.", teilIntro: "Beginnen Sie mit dem Wort in Klammern.", typ: "luecke", lang: true, frage: "Ich mache meine Hausaufgaben. (dann)", antwort: ["Dann mache ich meine Hausaufgaben."] },
      { teil: "Teil 3 — Schreiben Sie den Satz neu.", typ: "luecke", lang: true, frage: "Wir essen zusammen. (danach)", antwort: ["Danach essen wir zusammen."] },
      { teil: "Teil 3 — Schreiben Sie den Satz neu.", typ: "luecke", lang: true, frage: "Er räumt die Küche auf. (zum Schluss)", antwort: ["Zum Schluss räumt er die Küche auf."] },

      { teil: "Teil 4 — Richtig oder falsch geschrieben?", typ: "rf", frage: "Ich komme nicht, denn ich muss arbeiten.", antwort: true },
      { teil: "Teil 4 — Richtig oder falsch geschrieben?", typ: "rf", frage: "Zuerst ich trinke einen Kaffee.", antwort: false, warum: "Richtig: *Zuerst trinke ich* einen Kaffee." },
      { teil: "Teil 4 — Richtig oder falsch geschrieben?", typ: "rf", frage: "Das Essen ist gut, aber ist es zu salzig.", antwort: false, warum: "*aber* ändert nichts: …, aber *es ist* zu salzig." },

      {
        teil: "Teil 5 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Beschreiben Sie Ihren Abend nach der Arbeit oder nach dem Kurs. Benutzen Sie *zuerst, dann, danach* und mindestens zwei von *und, aber, denn*.",
        woerter: 45,
        muster: "Um sechs Uhr komme ich nach Hause. Zuerst ziehe ich mich um, denn meine Arbeitskleidung ist nicht bequem. Dann koche ich etwas, und meine Mitbewohnerin deckt den Tisch. Danach lerne ich eine halbe Stunde Deutsch. Ich bin oft müde, aber ich lerne trotzdem jeden Tag. Zum Schluss rufe ich meine Familie an.",
        checkliste: [
          "Kommt nach *zuerst, dann, danach* direkt das Verb?",
          "Bleibt nach *und, aber, denn* die normale Wortstellung?",
          "Steht ein Komma vor *aber* und *denn*?"
        ]
      }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "S04",
    gruppe: "nachrichten",
    stufe: 1,
    title: "Kurze Nachrichten",
    subtitle: "Text messages to friends",
    focus: "SMS und Chat, du-Form, Verspätung, Verabredung",
    intro:
      "Most of the German you write in daily life is short: you are late, you want to meet, you cannot come. A short message still has a shape, and it still has to answer everything the other person needs to know.",
    lernen: [
      { h3: "The shape of a short message" },
      {
        kopf: ["Teil", "Beispiel"],
        zeilen: [
          ["Anrede", "Hallo Jana, / Hi Jana,"],
          ["Die Information", "mein Bus hat Verspätung."],
          ["Was jetzt?", "Ich bin erst um halb acht am Kino."],
          ["Frage oder Bitte", "Kannst du schon die Karten kaufen?"],
          ["Gruß", "Bis gleich! / Liebe Grüße / LG"],
          ["Name", "Moritz"]
        ]
      },
      {
        brief: [
          "Hi Jana,",
          "mein Bus hat Verspätung. Ich bin erst um halb acht am Kino. Kannst du schon die Karten kaufen? Ich gebe dir das Geld dann zurück.",
          "Bis gleich!",
          "Moritz"
        ],
        titel: "Beispiel"
      },
      {
        box: "rule",
        titel: "Answer every point",
        text: [
          "Writing tasks usually give you two or three points to cover. Each point needs at least one full sentence. A beautiful message that forgets one point has not done the job."
        ]
      },
      {
        box: "mistake",
        titel: "Short, but still German",
        liste: [
          "Nouns keep their capital letter, even in a quick text: *der Bus, die Karten, das Geld*.",
          "After *Hallo Jana,* the message continues with a small letter: *mein Bus …*",
          "To friends you write *du*. Both *du* and *Du* are correct in messages."
        ]
      }
    ],
    redemittel: [
      {
        titel: "Später kommen, absagen",
        zeilen: [
          ["Ich komme etwas später.", "I'll be a bit late."],
          ["Ich stehe im Stau.", "I'm stuck in traffic."],
          ["Der Zug hat Verspätung.", "The train is delayed."],
          ["Ich bin in zehn Minuten da.", "I'll be there in ten minutes."],
          ["Tut mir leid, ich kann heute nicht.", "Sorry, I can't make it today."]
        ]
      },
      {
        titel: "Sich verabreden",
        zeilen: [
          ["Hast du am Freitag Zeit?", "Are you free on Friday?"],
          ["Wollen wir zusammen … ?", "Shall we … together?"],
          ["Treffen wir uns um sieben am Bahnhof?", "Shall we meet at seven at the station?"],
          ["Sag mir bitte Bescheid.", "Please let me know."],
          ["Kannst du … mitbringen?", "Can you bring … ?"]
        ]
      }
    ],
    aufgaben: [
      {
        teil: "Teil 1 — Lesen Sie die Nachricht.",
        typ: "rf",
        frage: "Leonie kommt heute nicht zum Sport.",
        vorlageTitel: "Nachricht von Leonie",
        vorlage: [
          "Hallo Aylin,",
          "ich bin noch bei der Arbeit, mein Chef braucht mich heute länger. Ich schaffe es nicht um 18 Uhr zum Volleyball, aber um 19 Uhr bin ich da. Kannst du dem Trainer Bescheid sagen? Und nimm bitte meine Schuhe mit, sie sind noch in deinem Auto!",
          "Danke dir, bis später",
          "Leonie"
        ],
        antwort: false,
        warum: "Sie kommt, aber eine Stunde später: *um 19 Uhr bin ich da*."
      },
      { teil: "Teil 1 — Lesen Sie die Nachricht.", typ: "rf", frage: "Leonie muss länger arbeiten.", antwort: true },
      { teil: "Teil 1 — Lesen Sie die Nachricht.", typ: "rf", frage: "Aylin soll mit dem Trainer sprechen.", antwort: true },
      { teil: "Teil 1 — Lesen Sie die Nachricht.", typ: "mc", frage: "Was soll Aylin mitbringen?", optionen: ["Einen Volleyball", "Leonies Schuhe", "Ihr Auto", "Nichts"], antwort: 1 },

      { teil: "Teil 2 — Welche Nachricht passt?", typ: "mc", frage: "Sie sind mit Ihrem Freund Paul um 15 Uhr im Café verabredet. Ihr Zug ist zu spät.", optionen: ["Hallo Paul, ich komme um 15 Uhr ins Café. Bis dann!", "Hallo Paul, mein Zug hat Verspätung. Ich bin erst um halb vier da. Sorry!", "Hallo Paul, hast du morgen Zeit für einen Kaffee?", "Sehr geehrter Herr Paul, leider komme ich später."], antwort: 1 },
      { teil: "Teil 2 — Welche Nachricht passt?", typ: "mc", frage: "Sie möchten mit Ihrer Freundin Mia am Wochenende schwimmen gehen.", optionen: ["Hi Mia, ich war am Wochenende schwimmen. Es war toll!", "Hi Mia, das Schwimmbad ist am Sonntag geschlossen.", "Hi Mia, hast du am Samstag Zeit? Wollen wir zusammen schwimmen gehen?", "Hi Mia, ich kann leider nicht schwimmen gehen."], antwort: 2 },

      { teil: "Teil 3 — Ergänzen Sie die Nachricht.", teilIntro: "Tom schreibt an seinen Freund Ali. Ein Wort fehlt in jedem Satz.", typ: "luecke", frage: "Hallo Ali, ___ du heute Abend Zeit?", antwort: ["hast"] },
      { teil: "Teil 3 — Ergänzen Sie die Nachricht.", typ: "luecke", frage: "Im Kino ___ ein neuer Film mit Will Smith.", antwort: ["läuft", "kommt"] },
      { teil: "Teil 3 — Ergänzen Sie die Nachricht.", typ: "luecke", frage: "___ wir uns um acht vor dem Kino?", antwort: ["Treffen"] },
      { teil: "Teil 3 — Ergänzen Sie die Nachricht.", typ: "luecke", frage: "Sag mir bitte bis sechs Uhr ___.", antwort: ["Bescheid"] },
      { teil: "Teil 3 — Ergänzen Sie die Nachricht.", typ: "luecke", frage: "Viele ___, Tom", antwort: ["Grüße", "Gruesse"] },

      {
        teil: "Teil 4 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Sie sind krank und können heute nicht zum Fußballtraining kommen. Schreiben Sie Ihrem Freund Ben eine Nachricht.",
        punkte: ["Sagen Sie, dass Sie heute nicht kommen.", "Schreiben Sie, warum.", "Fragen Sie, wann das nächste Training ist."],
        woerter: 25,
        muster: [
          "Hallo Ben,",
          "ich kann heute leider nicht zum Training kommen. Ich habe Fieber und Halsschmerzen und bleibe im Bett. Wann ist das nächste Training? Ist es am Donnerstag?",
          "Viele Grüße",
          "Samuel"
        ],
        checkliste: [
          "Sind alle drei Punkte da — absagen, Grund, Frage?",
          "Anrede mit Komma, danach klein weiter?",
          "Gruß und Name am Ende?"
        ]
      },
      {
        teil: "Teil 4 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Sie möchten am Samstag mit Ihrer Freundin Sara im Park grillen. Schreiben Sie Sara eine Nachricht.",
        punkte: ["Wann und wo?", "Wer kommt noch?", "Sara soll etwas mitbringen."],
        woerter: 30,
        muster: [
          "Hi Sara,",
          "hast du am Samstag Zeit? Wir wollen um 15 Uhr im Stadtpark grillen, direkt neben dem Spielplatz. Lukas und Emma kommen auch. Kannst du vielleicht einen Salat mitbringen? Das Fleisch und die Getränke kaufe ich.",
          "Sag mir bitte bis Freitag Bescheid!",
          "LG, Chiara"
        ],
        checkliste: [
          "Steht die Zeit mit *um* und der Tag mit *am*?",
          "Ist die Bitte eine Frage (*Kannst du …?*) oder ein Imperativ mit *bitte*?",
          "Alle Nomen groß geschrieben?"
        ]
      }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "S05",
    gruppe: "nachrichten",
    stufe: 1,
    title: "Notizen und Zettel",
    subtitle: "Notes for flatmates, neighbours and colleagues",
    focus: "Imperativ, du / ihr / Sie, kurze Bitten",
    intro:
      "A note on the kitchen table, a slip of paper on the neighbour's door, a message on a colleague's desk. Notes are the shortest texts you write, and almost all of them ask somebody to do something. That is the job of the imperative.",
    lernen: [
      { h3: "The imperative — three forms" },
      "Who you write to decides the form. Friends and family: *du* or *ihr*. The neighbour you do not know well, a colleague, anyone older or official: *Sie*.",
      {
        kopf: ["Infinitiv", "du", "ihr", "Sie"],
        zeilen: [
          ["kaufen", "Kauf …!", "Kauft …!", "Kaufen Sie …!"],
          ["mitbringen", "Bring … mit!", "Bringt … mit!", "Bringen Sie … mit!"],
          ["nehmen", "Nimm …!", "Nehmt …!", "Nehmen Sie …!"],
          ["vergessen", "Vergiss … nicht!", "Vergesst … nicht!", "Vergessen Sie … nicht!"],
          ["sein", "Sei …!", "Seid …!", "Seien Sie …!"]
        ]
      },
      {
        box: "rule",
        titel: "How the du-form is made",
        liste: [
          "Take the *du* form of the present tense and drop *-st* and *du*: du kauf*st* → *Kauf!*",
          "Verbs that change *e* to *i* keep it: du n*i*mmst → *Nimm!*, du g*i*bst → *Gib!*",
          "But *a → ä* does not stay: du fährst → *Fahr!*, du schläfst → *Schlaf!*",
          "Separable verbs: the prefix goes to the end — *Ruf* mich bitte *an*!"
        ]
      },
      {
        box: "example",
        titel: "Three notes",
        text: [
          "*Für die Mitbewohner:* Hallo ihr zwei, ich bin bis Sonntag bei meiner Familie. Bitte gießt die Blumen und bringt am Donnerstag den Müll raus! Danke, Kofi",
          "*Für die Nachbarin:* Liebe Frau Weber, ich erwarte morgen ein Paket, aber ich bin nicht zu Hause. Können Sie es bitte für mich annehmen? Vielen Dank! Ihr Karim Haddad, 2. Stock",
          "*Für die Kollegin:* Hallo Frau Brandt, Herr Liu hat um 11 Uhr angerufen. Bitte rufen Sie ihn zurück: 0421 339 870. Gruß, Nadia"
        ]
      },
      {
        box: "mistake",
        titel: "Watch out",
        liste: [
          "The *Sie*-form always keeps *Sie*: ~Kommen bitte morgen!~ → *Kommen Sie* bitte morgen!",
          "The *du*-form has no *du* and no *-st*: ~Kaufst du Milch!~ → *Kauf* bitte Milch!",
          "A friendly note sounds rude without *bitte*. Put it after the verb: *Kauf bitte Brot.*"
        ]
      }
    ],
    wortschatz: [
      ["der Zettel, -", "note, slip of paper"],
      ["der Mitbewohner, - / die Mitbewohnerin, -nen", "flatmate"],
      ["der Nachbar, -n / die Nachbarin, -nen", "neighbour"],
      ["gießen", "to water (plants)"],
      ["den Müll rausbringen", "to take the rubbish out"],
      ["das Paket, -e", "parcel"],
      ["annehmen", "to accept, to take in (a parcel)"],
      ["erwarten", "to expect"],
      ["zurückrufen", "to call back"],
      ["der Schlüssel, -", "key"],
      ["abholen", "to pick up, to collect"],
      ["aufräumen", "to tidy up"]
    ],
    aufgaben: [
      { teil: "Teil 1 — Imperativ mit du", typ: "luecke", frage: "(kaufen) ___ bitte Brot und Milch!", antwort: ["Kauf", "Kaufe"] },
      { teil: "Teil 1 — Imperativ mit du", typ: "luecke", frage: "(nehmen) ___ den Schlüssel mit!", antwort: ["Nimm"], warum: "du nimmst → *Nimm!*" },
      { teil: "Teil 1 — Imperativ mit du", typ: "luecke", frage: "(anrufen) ___ mich bitte heute Abend ___!", hinweis: "zwei Wörter", antwort: ["Ruf an", "Rufe an", "Ruf ... an"] },
      { teil: "Teil 1 — Imperativ mit du", typ: "luecke", frage: "(sein) ___ bitte leise, das Baby schläft!", antwort: ["Sei"] },

      { teil: "Teil 2 — Imperativ mit ihr und Sie", typ: "luecke", frage: "Hallo Kinder, (aufräumen) ___ bitte euer Zimmer ___!", hinweis: "zwei Wörter", antwort: ["Räumt auf", "Raeumt auf", "Räumt ... auf"] },
      { teil: "Teil 2 — Imperativ mit ihr und Sie", typ: "luecke", frage: "Liebe Frau Klein, (gießen) ___ bitte meine Blumen!", hinweis: "zwei Wörter", antwort: ["Gießen Sie", "Giessen Sie"] },
      { teil: "Teil 2 — Imperativ mit ihr und Sie", typ: "luecke", frage: "Herr Meyer, (vergessen) ___ den Termin um 14 Uhr nicht!", hinweis: "zwei Wörter", antwort: ["Vergessen Sie"] },
      { teil: "Teil 2 — Imperativ mit ihr und Sie", typ: "luecke", frage: "Jonas und Lea, (mitbringen) ___ bitte Getränke ___!", hinweis: "zwei Wörter", antwort: ["Bringt mit", "Bringt ... mit"] },

      { teil: "Teil 3 — du oder Sie?", typ: "mc", frage: "Sie schreiben einen Zettel für Ihre Nachbarin, Frau Schulz. Welcher Satz passt?", optionen: ["Nimm bitte mein Paket an!", "Nehmen Sie bitte mein Paket an?", "Können Sie bitte mein Paket annehmen?", "Nehmt bitte mein Paket an!"], antwort: 2, warum: "Fremden Nachbarn schreibt man *Sie*. Eine Frage mit *Können Sie …?* ist besonders höflich." },
      { teil: "Teil 3 — du oder Sie?", typ: "mc", frage: "Sie schreiben Ihrem Bruder. Welcher Satz passt?", optionen: ["Holen Sie bitte Mama vom Bahnhof ab!", "Hol bitte Mama vom Bahnhof ab!", "Holst bitte Mama vom Bahnhof ab!", "Holt bitte Mama vom Bahnhof ab!"], antwort: 1 },

      {
        teil: "Teil 4 — Lesen Sie den Zettel.",
        typ: "rf",
        frage: "Kofi ist am Wochenende nicht zu Hause.",
        vorlageTitel: "Zettel am Kühlschrank",
        vorlage: [
          "Hallo ihr zwei,",
          "ich fahre heute Abend zu meiner Familie nach Hannover und komme erst am Montag zurück. Bitte gießt die Blumen im Wohnzimmer, aber nicht zu viel! Am Donnerstag kommt die Müllabfuhr — bringt bitte den Müll am Mittwochabend raus. Im Kühlschrank ist noch Suppe, esst sie gern.",
          "Danke und schönes Wochenende!",
          "Kofi"
        ],
        antwort: true
      },
      { teil: "Teil 4 — Lesen Sie den Zettel.", typ: "rf", frage: "Die Mitbewohner sollen die Blumen jeden Tag viel gießen.", antwort: false, warum: "Kofi schreibt: *aber nicht zu viel!*" },
      { teil: "Teil 4 — Lesen Sie den Zettel.", typ: "mc", frage: "Wann sollen die Mitbewohner den Müll rausbringen?", optionen: ["Am Montag", "Am Mittwochabend", "Am Donnerstagabend", "Heute Abend"], antwort: 1 },

      {
        teil: "Teil 5 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Sie fahren für drei Tage weg. Morgen kommt ein Paket für Sie. Schreiben Sie einen Zettel für Ihren Nachbarn, Herrn Adeyemi.",
        punkte: ["Warum sind Sie nicht da?", "Bitten Sie ihn, das Paket anzunehmen.", "Wann holen Sie das Paket ab?"],
        woerter: 30,
        muster: [
          "Lieber Herr Adeyemi,",
          "ich bin von Dienstag bis Donnerstag auf einer Hochzeit in München. Morgen kommt ein Paket für mich. Können Sie es bitte für mich annehmen? Ich komme am Donnerstagabend zurück und hole es am Freitagmorgen bei Ihnen ab.",
          "Vielen Dank!",
          "Ihre Amara Diallo (3. Stock)"
        ],
        checkliste: [
          "Überall *Sie* — auch in *Ihnen* und *Ihre*?",
          "Klingt die Bitte höflich (*bitte*, *Können Sie …?*)?",
          "Steht bei *abholen* und *annehmen* die Vorsilbe am Ende oder der Infinitiv am Ende?"
        ]
      },
      {
        teil: "Teil 5 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Am Samstag machen Sie eine kleine Party in der Wohnung. Schreiben Sie einen Zettel für Ihre zwei Mitbewohner.",
        punkte: ["Wann ist die Party?", "Sie sollen etwas einkaufen.", "Sie sollen etwas vorbereiten oder mitbringen."],
        woerter: 30,
        muster: [
          "Hallo Marta, hallo Yusuf,",
          "am Samstag ab 20 Uhr feiere ich meinen Geburtstag hier in der Wohnung. Kauft bitte am Freitag Getränke und Chips, ich gebe euch das Geld zurück. Räumt bitte auch eure Schuhe aus dem Flur weg. Und bringt gern Freunde mit!",
          "Danke, ihr seid super!",
          "Jamal"
        ],
        checkliste: [
          "Zwei Personen → *ihr*-Form: *Kauft, Räumt, Bringt*.",
          "Pronomen passend: *euch, eure*.",
          "Sind alle drei Punkte da?"
        ]
      }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "S06",
    gruppe: "briefe",
    stufe: 2,
    title: "Einladungen",
    subtitle: "Inviting, accepting and saying no",
    focus: "Persönliche E-Mail, am / um / im, zusagen und absagen",
    intro:
      "An invitation is the first longer personal email most learners write — and the answer to one is the second. Both have a fixed opening and a fixed closing, and both depend on getting time and place exactly right.",
    lernen: [
      "Personal emails to friends follow the same pattern every time. Once you know the parts and the order they come in, you only have to fill in what is new — and the reader immediately sees what kind of message it is.",
      { h3: "A personal email" },
      {
        kopf: ["Teil", "Beispiel", "Achtung"],
        zeilen: [
          ["Betreff", "Einladung zu meinem Geburtstag", "short, no full sentence"],
          ["Anrede", "Liebe Clara, / Lieber Tobias,", "*Liebe* for a woman, *Lieber* for a man"],
          ["Einleitung", "wie geht es dir?", "small letter after the comma"],
          ["Inhalt", "Am Samstag feiere ich …", "one paragraph per point"],
          ["Schluss", "Ich freue mich auf deine Antwort.", ""],
          ["Gruß", "Viele Grüße / Liebe Grüße", "no comma after it"],
          ["Name", "Deine Maria / Dein Paul", "*Deine* from a woman, *Dein* from a man"]
        ]
      },
      {
        box: "rule",
        titel: "Two people in the greeting",
        text: [
          "Each name gets its own word: *Liebe Clara, lieber Tobias,* — the second one small, because the line has already started."
        ]
      },
      { h3: "Time: am, um, im, von … bis" },
      {
        kopf: ["Präposition", "wofür", "Beispiel"],
        zeilen: [
          ["am", "days, dates, parts of the day", "am Samstag, am 14. Juni, am Abend"],
          ["um", "clock time", "um 19 Uhr, um halb acht"],
          ["im", "months, seasons", "im Juli, im Sommer"],
          ["von … bis", "from … to", "von 18 bis 23 Uhr"],
          ["ab", "from … on", "ab 20 Uhr"]
        ]
      },
      {
        brief: [
          "Betreff: Einladung zu meinem Geburtstag",
          "",
          "Liebe Clara, lieber Tobias,",
          "",
          "am 14. Juni werde ich 30 Jahre alt, und das möchte ich mit euch feiern! Die Party ist am Samstag, den 14. Juni, ab 19 Uhr in meinem Garten. Es gibt Essen vom Grill und Musik.",
          "Bringt bitte gute Laune mit — und vielleicht eine Jacke, denn am Abend wird es kalt.",
          "Könnt ihr mir bis Mittwoch sagen, ob ihr kommt?",
          "",
          "Liebe Grüße",
          "Eure Nadine"
        ],
        titel: "Beispiel: eine Einladung"
      },
      {
        box: "example",
        titel: "Answering",
        zeilen: [
          ["zusagen", "Vielen Dank für die Einladung! Ich komme sehr gern. Soll ich etwas mitbringen?"],
          ["absagen", "Danke für die Einladung. Leider kann ich nicht kommen, denn ich bin an dem Wochenende bei meinen Eltern. Ich wünsche dir viel Spaß!"],
          ["vielleicht", "Ich weiß es noch nicht genau, denn ich muss vielleicht arbeiten. Ich sage dir bis Freitag Bescheid."]
        ]
      }
    ],
    aufgaben: [
      {
        teil: "Teil 1 — Lesen Sie die Einladung.",
        typ: "rf",
        frage: "Emeka macht eine Party zum Geburtstag.",
        vorlageTitel: "E-Mail von Emeka",
        vorlage: [
          "Betreff: Einweihungsparty!",
          "",
          "Liebe Freunde,",
          "",
          "endlich ist alles ausgepackt! Ich wohne jetzt in der Gartenstraße 9, im dritten Stock. Am Freitag, den 3. Oktober, möchte ich meine neue Wohnung feiern. Ihr könnt ab 18 Uhr kommen.",
          "Es gibt Jollof-Reis und Hähnchen, meine Mutter hilft mir beim Kochen. Getränke habe ich genug, aber ich habe nur sechs Stühle — wer kann, bringt bitte einen Klappstuhl mit.",
          "Der Aufzug ist leider kaputt. Klingelt unten bei „Nwosu“.",
          "Schreibt mir bitte bis Dienstag, ob ihr kommt!",
          "",
          "Viele Grüße",
          "Euer Emeka"
        ],
        antwort: false,
        warum: "Es ist eine Einweihungsparty: Er feiert seine neue Wohnung."
      },
      { teil: "Teil 1 — Lesen Sie die Einladung.", typ: "rf", frage: "Die Party beginnt um 18 Uhr.", antwort: true },
      { teil: "Teil 1 — Lesen Sie die Einladung.", typ: "rf", frage: "Die Gäste sollen Getränke mitbringen.", antwort: false, warum: "Getränke hat er genug. Er braucht Stühle." },
      { teil: "Teil 1 — Lesen Sie die Einladung.", typ: "mc", frage: "Warum müssen die Gäste die Treppe nehmen?", optionen: ["Emeka wohnt im Erdgeschoss.", "Der Aufzug funktioniert nicht.", "Es gibt keinen Aufzug.", "Die Klingel ist kaputt."], antwort: 1 },
      { teil: "Teil 1 — Lesen Sie die Einladung.", typ: "mc", frage: "Bis wann soll man antworten?", optionen: ["Bis Freitag", "Bis zum 3. Oktober", "Bis Dienstag", "Bis 18 Uhr"], antwort: 2 },

      { teil: "Teil 2 — am, um oder im?", typ: "luecke", frage: "Das Konzert ist ___ Sonntag.", antwort: ["am"] },
      { teil: "Teil 2 — am, um oder im?", typ: "luecke", frage: "Wir treffen uns ___ halb neun.", antwort: ["um"] },
      { teil: "Teil 2 — am, um oder im?", typ: "luecke", frage: "Meine Hochzeit ist ___ August.", antwort: ["im"] },
      { teil: "Teil 2 — am, um oder im?", typ: "luecke", frage: "Kommst du ___ 12. Mai?", antwort: ["am"] },

      { teil: "Teil 3 — Anrede und Gruß", typ: "mc", frage: "Sie schreiben an Ihren Freund Moritz.", optionen: ["Liebe Moritz,", "Lieber Moritz,", "Sehr geehrter Moritz,", "Lieben Moritz,"], antwort: 1 },
      { teil: "Teil 3 — Anrede und Gruß", typ: "mc", frage: "Sie schreiben an Aisha und Jan.", optionen: ["Liebe Aisha und Jan,", "Liebe Aisha, lieber Jan,", "Lieber Aisha, liebe Jan,", "Liebe Aisha, Lieber Jan,"], antwort: 1 },
      { teil: "Teil 3 — Anrede und Gruß", typ: "mc", frage: "Welcher Anfang ist richtig geschrieben?", optionen: ["Lieber Tim, Wie geht es dir?", "Lieber Tim. wie geht es dir?", "Lieber Tim, wie geht es dir?", "Lieber Tim wie geht es Dir,"], antwort: 2 },

      {
        teil: "Teil 4 — Antworten Sie Emeka.",
        typ: "frei",
        frage: "Sie kommen gern zu Emekas Party. Schreiben Sie ihm eine E-Mail.",
        punkte: ["Bedanken Sie sich für die Einladung.", "Sagen Sie zu und schreiben Sie, wann Sie kommen.", "Sie bringen einen Stuhl und noch etwas mit."],
        woerter: 40,
        muster: [
          "Lieber Emeka,",
          "",
          "vielen Dank für deine Einladung! Toll, dass du jetzt eine eigene Wohnung hast. Ich komme sehr gern, aber ich arbeite am Freitag bis 18 Uhr. Ich bin also erst um 19 Uhr bei dir.",
          "Ich habe einen Klappstuhl, den bringe ich mit. Ich backe auch einen Kuchen für dich.",
          "",
          "Bis Freitag und viele Grüße",
          "Dein Lukas"
        ],
        checkliste: [
          "*Lieber Emeka,* — und danach klein weiter?",
          "Alle drei Punkte beantwortet?",
          "Zeit mit *um*, Tag mit *am*?",
          "Gruß ohne Komma, dann *Dein* / *Deine* und Ihr Name?"
        ]
      },
      {
        teil: "Teil 4 — Antworten Sie Emeka.",
        typ: "frei",
        frage: "Sie können leider nicht kommen. Schreiben Sie Emeka eine kurze E-Mail.",
        punkte: ["Bedanken Sie sich.", "Sagen Sie ab und nennen Sie den Grund.", "Machen Sie einen Vorschlag für ein anderes Treffen."],
        woerter: 40,
        muster: [
          "Lieber Emeka,",
          "",
          "danke für die Einladung, ich freue mich sehr für dich! Leider kann ich am Freitag nicht kommen, denn meine Schwester heiratet am Samstag in Hamburg und ich fahre schon am Freitagmittag los.",
          "Darf ich dich nächste Woche besuchen? Dann sehe ich auch deine neue Wohnung. Hast du am Mittwochabend Zeit?",
          "",
          "Viel Spaß bei der Party und liebe Grüße",
          "Deine Fatima"
        ],
        checkliste: [
          "Klingt die Absage freundlich (*leider*, *danke*)?",
          "Steht nach *denn* die normale Wortstellung?",
          "Ist der Vorschlag eine Frage mit Tag und Zeit?"
        ]
      }
    ]
  }
];

var SCHREIBEN_GRUPPEN = [
  {
    key: "grundlagen",
    titel: "Grundlagen",
    unter: "The building blocks",
    text: "Forms, word order and joining sentences — what every longer text is made of."
  },
  {
    key: "nachrichten",
    titel: "Kurze Nachrichten",
    unter: "Short messages",
    text: "Text messages, chat messages and notes: short, informal and always to the point."
  },
  {
    key: "briefe",
    titel: "E-Mails und Briefe",
    unter: "Emails and letters",
    text: "Personal emails to friends and formal emails to offices, schools and landlords — with the fixed openings and closings each one needs."
  }
];
