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
      "German forms look much the same wherever you fill them in — at the {de:Bürgeramt}, at a school, at a doctor's surgery. Learn these words once and you can manage almost any of them, even when the rest of the form is hard to read.",
      { h3: "The words on almost every form" },
      {
        kopf: ["Im Formular", "Was Sie schreiben", "{de:Beispiel}"],
        zeilen: [
          ["Familienname / Nachname / Name", "{en:surname}", "Okello"],
          ["Vorname", "{en:first name}", "Daniel"],
          ["Geburtsdatum", "{en:date of birth}", "14.03.1999"],
          ["Geburtsort", "{en:town of birth}", "Jinja"],
          ["Geburtsland", "{en:country of birth}", "Uganda"],
          ["Staatsangehörigkeit", "{en:nationality}", "ugandisch"],
          ["Familienstand", "{en:marital status}", "ledig"],
          ["Straße, Hausnummer", "{en:street and number}", "Bonner Straße 27"],
          ["PLZ, Wohnort", "{en:postcode and town}", "50677 Köln"],
          ["Telefon / Handy", "{en:phone / mobile}", "0176 5528193"],
          ["Beruf", "job", "Koch"],
          ["Muttersprache", "{en:first language}", "Englisch"],
          ["Datum, Unterschrift", "{en:date, signature}", "12.09.2026, D. Okello"]
        ]
      },
      {
        box: "rule",
        titel: "{de:Familienstand} — four words",
        zeilen: [
          ["ledig", "{en:single, never married}"],
          ["verheiratet", "{en:married}"],
          ["geschieden", "{en:divorced}"],
          ["verwitwet", "{en:widowed}"]
        ]
      },
      {
        box: "rule",
        titel: "Dates and addresses",
        liste: [
          "The date goes *{en:day . month . year}*: 14.03.1999 is the fourteenth of March. Never the month first.",
          "In an address the street comes first and the number after it: *Bonner Straße 27*, not *27 Bonner Straße*.",
          "The postcode ({de:PLZ}) stands in front of the town: *50677 Köln*.",
          "_{de:Anrede}_ with boxes to tick: *Frau* for a woman, *Herr* for a man."
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
      "In a normal statement the conjugated verb is always in *{en:position 2}*. Position 2 does not mean the second word — it means the second *{en:part}*. The first part can be one word or a whole group of words.",
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
          "{de:*Ich* spiele am Sonntag Fußball. → *Am Sonntag* spiele *ich* Fußball.}"
        ]
      },
      { h3: "Questions" },
      {
        kopf: ["Art", "Bau", "{de:Beispiel}"],
        zeilen: [
          ["W-Frage", "W-Wort + Verb + Subjekt", "Wo *wohnst* du?"],
          ["Ja/Nein-Frage", "Verb + Subjekt", "*Wohnst* du in Hamburg?"],
          ["Bitte / Aufforderung", "Verb + Sie", "*Kommen* Sie bitte morgen."]
        ]
      },
      {
        box: "rule",
        titel: "The sentence bracket ({de:Satzklammer})",
        text: [
          "Some verbs come in two parts. The first part takes position 2, the second part goes to the very *{en:end}* of the sentence, and everything else sits in between."
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
          "{de:~Heute ich gehe ins Kino.~ → *Heute gehe ich* ins Kino.}",
          "{de:~Ich kann nicht kommen morgen.~ → Ich *kann* morgen nicht *kommen*.}",
          "~Wo du wohnst?~ → *Wo wohnst du?*",
          "{de:~Ich stehe auf um sieben.~ → Ich *stehe* um sieben *auf*.}"
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
    subtitle: "{de:und, aber, oder, denn — zuerst, dann, danach}",
    focus: "Konjunktionen, Reihenfolge, Komma",
    intro:
      "A text made only of short sentences reads like a list. Two kinds of small words join them together, and they behave differently — one kind leaves the word order alone, the other takes position 1 and pushes the subject behind the verb.",
    lernen: [
      { h3: "Joining words that change nothing" },
      "*und, aber, oder, denn* stand *{en:between}* two sentences. They do not count as a position, so the second sentence keeps its normal order.",
      {
        kopf: ["Wort", "Bedeutung", "{de:Beispiel}"],
        zeilen: [
          ["und", "{en:and}", "Ich koche, *und* mein Bruder deckt den Tisch."],
          ["aber", "{en:but}", "Die Wohnung ist schön, *aber* sie ist teuer."],
          ["oder", "{en:or}", "Trinkst du Tee, *oder* möchtest du Kaffee?"],
          ["denn", "{en:because}", "Ich bleibe zu Hause, *denn* ich bin krank."]
        ]
      },
      {
        box: "rule",
        titel: "Position 0",
        text: [
          "Think of these four as position 0: {de:*denn* | *ich* | *bin* | krank}.",
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
        titel: "{de:denn} and {de:dann} look alike",
        liste: [
          "*denn* gives a reason and does not move the verb: …, {de:*denn ich habe* Hunger}.",
          "*dann* means _then_ and is position 1: {de:*Dann esse ich* etwas}.",
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
        kopf: ["Teil", "{de:Beispiel}"],
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
        titel: "{de:Beispiel}"
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
        titel: "{de:Später kommen, absagen}",
        zeilen: [
          ["Ich komme etwas später.", "I'll be a bit late."],
          ["Ich stehe im Stau.", "I'm stuck in traffic."],
          ["Der Zug hat Verspätung.", "The train is delayed."],
          ["Ich bin in zehn Minuten da.", "I'll be there in ten minutes."],
          ["Tut mir leid, ich kann heute nicht.", "Sorry, I can't make it today."]
        ]
      },
      {
        titel: "{de:Sich verabreden}",
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
        titel: "How the {de:du}-form is made",
        liste: [
          "Take the *du* form of the present tense and drop *-st* and *du*: {de:du kauf*st* → *Kauf!*}",
          "Verbs that change *e* to *i* keep it: {de:du n*i*mmst → *Nimm!*, du g*i*bst → *Gib!*}",
          "But *a → ä* does not stay: {de:du fährst → *Fahr!*, du schläfst → *Schlaf!*}",
          "Separable verbs: the prefix goes to the end — {de:*Ruf* mich bitte *an*!}"
        ]
      },
      {
        box: "example",
        titel: "Three notes",
        text: [
          "{de:*Für die Mitbewohner:* Hallo ihr zwei, ich bin bis Sonntag bei meiner Familie. Bitte gießt die Blumen und bringt am Donnerstag den Müll raus! Danke, Kofi}",
          "{de:*Für die Nachbarin:* Liebe Frau Weber, ich erwarte morgen ein Paket, aber ich bin nicht zu Hause. Können Sie es bitte für mich annehmen? Vielen Dank! Ihr Karim Haddad, 2. Stock}",
          "{de:*Für die Kollegin:* Hallo Frau Brandt, Herr Liu hat um 11 Uhr angerufen. Bitte rufen Sie ihn zurück: 0421 339 870. Gruß, Nadia}"
        ]
      },
      {
        box: "mistake",
        titel: "Watch out",
        liste: [
          "The *Sie*-form always keeps *Sie*: ~Kommen bitte morgen!~ → {de:*Kommen Sie* bitte morgen!}",
          "The *du*-form has no *du* and no *-st*: ~Kaufst du Milch!~ → {de:*Kauf* bitte Milch!}",
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
        kopf: ["Teil", "{de:Beispiel}", "Achtung"],
        zeilen: [
          ["Betreff", "Einladung zu meinem Geburtstag", "{en:short, no full sentence}"],
          ["Anrede", "Liebe Clara, / Lieber Tobias,", "{en:*Liebe* for a woman, *Lieber* for a man}"],
          ["Einleitung", "wie geht es dir?", "{en:small letter after the comma}"],
          ["Inhalt", "Am Samstag feiere ich …", "{en:one paragraph per point}"],
          ["Schluss", "Ich freue mich auf deine Antwort.", ""],
          ["Gruß", "Viele Grüße / Liebe Grüße", "{en:no comma after it}"],
          ["Name", "Deine Maria / Dein Paul", "{en:*Deine* from a woman, *Dein* from a man}"]
        ]
      },
      {
        box: "rule",
        titel: "Two people in the greeting",
        text: [
          "Each name gets its own word: *Liebe Clara, lieber Tobias,* — the second one small, because the line has already started."
        ]
      },
      { h3: "Time: {de:am, um, im, von … bis}" },
      {
        kopf: ["Präposition", "wofür", "{de:Beispiel}"],
        zeilen: [
          ["am", "{en:days, dates, parts of the day}", "am Samstag, am 14. Juni, am Abend"],
          ["um", "{en:clock time}", "um 19 Uhr, um halb acht"],
          ["im", "{en:months, seasons}", "im Juli, im Sommer"],
          ["von … bis", "{en:from … to}", "von 18 bis 23 Uhr"],
          ["ab", "{en:from … on}", "ab 20 Uhr"]
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
        titel: "{de:Beispiel: eine Einladung}"
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
  },
  /* ---------------------------------------------------------- */
  {
    id: "S07",
    gruppe: "briefe",
    stufe: 2,
    title: "Formelle E-Mails: Termine",
    subtitle: "Writing to a practice, an office or a school",
    focus: "Sehr geehrte …, Sie-Form, Termin vereinbaren und verschieben",
    intro:
      "As soon as you write to someone you do not know personally — a doctor's practice, an office, a school, a landlord — the email changes. It uses *Sie*, it opens and closes in a fixed way, and it gets to the point quickly.",
    lernen: [
      "The difference between a personal and a formal email is mostly in four places: the greeting, the pronoun, the closing and the name at the end. Everything in between is ordinary German, just a little more polite.",
      {
        kopf: ["", "persönlich", "formell"],
        zeilen: [
          ["Anrede", "Liebe Petra, / Lieber Jan,", "Sehr geehrte Frau Hoffmann, / Sehr geehrter Herr Yılmaz,"],
          ["Name unbekannt", "—", "Sehr geehrte Damen und Herren,"],
          ["Pronomen", "du, dich, dir, dein", "Sie, Ihnen, Ihr — immer groß"],
          ["Schlusssatz", "Bis bald!", "Vielen Dank im Voraus. / Ich freue mich auf Ihre Antwort."],
          ["Gruß", "Viele Grüße / Liebe Grüße", "Mit freundlichen Grüßen"],
          ["Name", "Dein Samuel", "Samuel Owusu {en:(full name)}"]
        ]
      },
      {
        box: "rule",
        titel: "Four steps in a formal email",
        liste: [
          "*{en:Why you are writing}* — in the first sentence: _{de:ich möchte gern einen Termin vereinbaren.}_",
          "*{en:The details}* — what the problem is, which day, who it is for.",
          "*{en:The question or request}* — _{de:Haben Sie am Donnerstag einen Termin frei?}_",
          "*{en:A closing sentence}*, then the greeting and your full name."
        ]
      },
      {
        brief: [
          "Betreff: Terminanfrage",
          "",
          "Sehr geehrte Frau Dr. Hoffmann,",
          "",
          "ich möchte gern einen Termin für eine Kontrolle vereinbaren. Seit ein paar Tagen tut mir ein Zahn oben links weh, besonders beim Essen.",
          "Haben Sie nächste Woche einen Termin frei? Ich arbeite bis 15 Uhr, deshalb kann ich nur am Nachmittag. Am Mittwoch kann ich leider gar nicht.",
          "",
          "Vielen Dank im Voraus.",
          "",
          "Mit freundlichen Grüßen",
          "Samuel Owusu"
        ],
        titel: "{de:Beispiel}"
      },
      {
        box: "mistake",
        titel: "Small things that stand out",
        liste: [
          "*Sie* for _you_ is always written with a capital. Small *sie* means _she_ or _they_: ~Können sie mir helfen?~ asks whether _she_ can help.",
          "After *Sehr geehrte Frau Hoffmann,* the email continues with a small letter: *ich möchte …*",
          "*Sehr geehrte* for a woman, *Sehr geehrter* for a man.",
          "No comma after *Mit freundlichen Grüßen*, and no *Dein* or *Ihr* before your name."
        ]
      }
    ],
    redemittel: [
      {
        titel: "{de:Termine}",
        zeilen: [
          ["Ich möchte gern einen Termin vereinbaren.", "I would like to make an appointment."],
          ["Haben Sie am … einen Termin frei?", "Do you have an appointment free on … ?"],
          ["Ich kann nur vormittags / nachmittags.", "I can only make mornings / afternoons."],
          ["Leider kann ich am … nicht kommen.", "Unfortunately I can't come on …"],
          ["Kann ich den Termin verschieben?", "Can I move the appointment?"],
          ["Passt Ihnen Donnerstag um zehn Uhr?", "Does Thursday at ten suit you?"],
          ["Bitte bestätigen Sie den Termin.", "Please confirm the appointment."]
        ]
      }
    ],
    aufgaben: [
      { teil: "Teil 1 — Formell schreiben", typ: "mc", frage: "Sie schreiben an Frau Lange, die Sekretärin der Sprachschule.", optionen: ["Liebe Frau Lange,", "Sehr geehrter Frau Lange,", "Sehr geehrte Frau Lange,", "Hallo Lange,"], antwort: 2 },
      { teil: "Teil 1 — Formell schreiben", typ: "mc", frage: "Sie schreiben an das Bürgeramt und kennen keinen Namen.", optionen: ["Sehr geehrte Damen und Herren,", "Liebe Bürgeramt,", "Sehr geehrtes Bürgeramt,", "Hallo zusammen,"], antwort: 0 },
      { teil: "Teil 1 — Formell schreiben", typ: "mc", frage: "Welches Ende passt zu einer formellen E-Mail?", optionen: ["Liebe Grüße, deine Aylin", "Mit freundlichen Grüßen — und darunter: Aylin Demir", "Tschüss und bis bald!", "Viele Grüße, Aylin"], antwort: 1 },
      { teil: "Teil 1 — Formell schreiben", typ: "mc", frage: "Welcher Satz ist in einer formellen E-Mail richtig?", optionen: ["Kannst du mir einen Termin geben?", "Können sie mir einen Termin geben?", "Können Sie mir einen Termin geben?", "Gib mir bitte einen Termin."], antwort: 2, warum: "*Sie* groß — sonst heißt es _sie_ (she / they)." },

      { teil: "Teil 2 — Ergänzen Sie die E-Mail.", teilIntro: "Ein Wort fehlt in jeder Zeile.", typ: "luecke", frage: "Sehr ___ Herr Braun,", antwort: ["geehrter"] },
      { teil: "Teil 2 — Ergänzen Sie die E-Mail.", typ: "luecke", frage: "ich ___ gern einen Termin für meinen Sohn vereinbaren.", antwort: ["möchte", "moechte", "würde"] },
      { teil: "Teil 2 — Ergänzen Sie die E-Mail.", typ: "luecke", frage: "Haben Sie nächste Woche einen Termin ___?", antwort: ["frei"] },
      { teil: "Teil 2 — Ergänzen Sie die E-Mail.", typ: "luecke", frage: "Ich kann leider nur ___ Nachmittag.", antwort: ["am"] },
      { teil: "Teil 2 — Ergänzen Sie die E-Mail.", typ: "luecke", frage: "Vielen Dank im ___.", antwort: ["Voraus"] },
      { teil: "Teil 2 — Ergänzen Sie die E-Mail.", typ: "luecke", frage: "Mit freundlichen ___", antwort: ["Grüßen", "Gruessen"] },

      {
        teil: "Teil 3 — Lesen Sie die Antwort der Praxis.",
        typ: "rf",
        frage: "Herr Owusu hat einen Termin am Nachmittag.",
        vorlageTitel: "Antwort: Zahnarztpraxis Dr. Hoffmann",
        vorlage: [
          "Sehr geehrter Herr Owusu,",
          "",
          "vielen Dank für Ihre Nachricht. Wir können Ihnen am Dienstag, den 13. Oktober, um 16:30 Uhr einen Termin anbieten.",
          "Bitte bringen Sie Ihre Versichertenkarte mit und kommen Sie zehn Minuten früher, denn Sie sind neu bei uns und müssen einen Fragebogen ausfüllen.",
          "Wenn Sie den Termin nicht wahrnehmen können, sagen Sie bitte mindestens 24 Stunden vorher telefonisch ab: 0431 55 62 70.",
          "",
          "Mit freundlichen Grüßen",
          "Ihr Praxisteam Dr. Hoffmann"
        ],
        antwort: true
      },
      { teil: "Teil 3 — Lesen Sie die Antwort der Praxis.", typ: "rf", frage: "Er soll um 16:30 Uhr in der Praxis sein.", antwort: false, warum: "Er soll zehn Minuten früher kommen, also um 16:20 Uhr." },
      { teil: "Teil 3 — Lesen Sie die Antwort der Praxis.", typ: "rf", frage: "Er kann den Termin auch per E-Mail absagen.", antwort: false, warum: "Absagen soll man *telefonisch*." },
      { teil: "Teil 3 — Lesen Sie die Antwort der Praxis.", typ: "mc", frage: "Warum soll Herr Owusu früher kommen?", optionen: ["Die Praxis öffnet früher.", "Er muss einen Fragebogen ausfüllen.", "Er muss bezahlen.", "Der Arzt hat wenig Zeit."], antwort: 1 },

      {
        teil: "Teil 4 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Ihre Tochter (7 Jahre) braucht einen Termin bei der Kinderärztin, Frau Dr. Schäfer. Schreiben Sie eine E-Mail an die Praxis.",
        punkte: ["Warum brauchen Sie einen Termin?", "Wann können Sie kommen, wann nicht?", "Fragen Sie, was Sie mitbringen müssen."],
        woerter: 45,
        muster: [
          "Betreff: Termin für meine Tochter",
          "",
          "Sehr geehrte Frau Dr. Schäfer,",
          "",
          "ich möchte gern einen Termin für meine Tochter Amina vereinbaren. Sie ist sieben Jahre alt und hustet seit einer Woche sehr stark.",
          "Ich arbeite vormittags, deshalb kann ich nur nach 14 Uhr kommen. Am Freitag geht es leider nicht.",
          "Wir sind neu in Freiburg. Was muss ich zum ersten Termin mitbringen?",
          "",
          "Vielen Dank im Voraus.",
          "",
          "Mit freundlichen Grüßen",
          "Fatou Diop"
        ],
        checkliste: [
          "*Sehr geehrte Frau Dr. Schäfer,* — und danach klein weiter?",
          "Sind alle drei Punkte da?",
          "*Sie, Ihnen, Ihr* überall groß?",
          "*Mit freundlichen Grüßen* und Ihr ganzer Name?"
        ]
      },
      {
        teil: "Teil 4 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Sie haben am Montag um 9 Uhr einen Termin beim Bürgeramt. Sie müssen an diesem Tag arbeiten. Schreiben Sie eine E-Mail.",
        punkte: ["Sagen Sie den Termin ab und nennen Sie den Grund.", "Bitten Sie um einen neuen Termin.", "Schreiben Sie, wann Sie Zeit haben."],
        woerter: 40,
        muster: [
          "Betreff: Termin am Montag, 9 Uhr — Bitte um neuen Termin",
          "",
          "Sehr geehrte Damen und Herren,",
          "",
          "ich habe am Montag, den 5. Oktober, um 9 Uhr einen Termin zur Anmeldung. Leider kann ich an diesem Tag nicht kommen, denn ich muss arbeiten.",
          "Kann ich bitte einen neuen Termin bekommen? Ich habe am Donnerstag und am Freitag frei, dann passt mir jede Uhrzeit.",
          "",
          "Mit freundlichen Grüßen",
          "Kwame Mensah"
        ],
        checkliste: [
          "Steht der alte Termin genau da — Tag, Datum, Uhrzeit?",
          "Nach *denn* normale Wortstellung: *denn ich muss arbeiten*.",
          "Ist die Bitte eine höfliche Frage?"
        ]
      }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "S08",
    gruppe: "briefe",
    stufe: 2,
    title: "Absagen und entschuldigen",
    subtitle: "Saying you can't come, and apologising",
    focus: "können und müssen, Entschuldigung, Grund nennen",
    intro:
      "Illness, a child at home, a shift that changed — sooner or later you have to write that you cannot come. A good cancellation says three things: that you are not coming, why, and what happens next.",
    lernen: [
      "Whether you write to a friend or to your teacher, the content is the same. Only the form changes — *du* or *Sie*, and the greeting at the top and bottom.",
      {
        kopf: ["Teil", "persönlich", "formell"],
        zeilen: [
          ["Absage", "Ich kann am Samstag leider nicht kommen.", "Leider kann ich morgen nicht zum Kurs kommen."],
          ["Grund", "Meine Eltern besuchen mich.", "Mein Sohn ist krank und ich muss zu Hause bleiben."],
          ["Entschuldigung", "Tut mir echt leid!", "Es tut mir sehr leid."],
          ["Wie geht es weiter?", "Hast du am Sonntag Zeit?", "Können Sie mir bitte die Hausaufgaben schicken?"]
        ]
      },
      {
        box: "rule",
        titel: "{de:können} and {de:müssen}",
        text: ["Both are modal verbs: *ich* and *er / sie* have the same form, with no ending. The second verb goes to the end of the sentence as an infinitive."],
        zeilen: [
          ["ich kann / muss", "wir können / müssen"],
          ["du kannst / musst", "ihr könnt / müsst"],
          ["er, sie, es kann / muss", "sie, Sie können / müssen"]
        ]
      },
      {
        brief: [
          "Betreff: Abwesenheit am Dienstag und Mittwoch",
          "",
          "Sehr geehrte Frau Neumann,",
          "",
          "leider kann ich am Dienstag und am Mittwoch nicht zum Deutschkurs kommen. Meine Tochter hat Fieber, und ich muss bei ihr zu Hause bleiben.",
          "Es tut mir sehr leid. Können Sie mir bitte schreiben, welche Hausaufgaben wir machen sollen? Am Donnerstag bin ich wieder da.",
          "",
          "Mit freundlichen Grüßen",
          "Leyla Ahmadi"
        ],
        titel: "{de:Beispiel}"
      },
      {
        box: "mistake",
        titel: "Watch the verb at the end",
        liste: [
          "{de:~Ich kann nicht kommen morgen.~ → Ich kann morgen nicht *kommen*.}",
          "~Er muss arbeitet.~ → {de:Er muss *arbeiten*}. — the second verb stays in the infinitive.",
          "~Ich kannst …~ → {de:Ich *kann*}. The *-st* belongs to *du* only."
        ]
      }
    ],
    redemittel: [
      {
        titel: "Absagen und entschuldigen",
        zeilen: [
          ["Leider kann ich (am …) nicht kommen.", "Unfortunately I can't come (on …)."],
          ["Es tut mir (sehr) leid.", "I'm (very) sorry."],
          ["Entschuldigen Sie bitte, ich war gestern nicht da.", "I'm sorry I wasn't there yesterday."],
          ["Ich bin krank. / Ich habe Fieber.", "I'm ill. / I have a temperature."],
          ["Ich muss (leider) arbeiten.", "I (unfortunately) have to work."],
          ["Können wir einen anderen Tag finden?", "Can we find another day?"],
          ["Am … bin ich wieder da.", "I'll be back on …"]
        ]
      }
    ],
    aufgaben: [
      { teil: "Teil 1 — können oder müssen?", typ: "luecke", frage: "Ich ___ morgen leider nicht zum Kurs kommen.", antwort: ["kann"] },
      { teil: "Teil 1 — können oder müssen?", typ: "luecke", frage: "Mein Sohn ist krank. Ich ___ zu Hause bleiben.", antwort: ["muss"] },
      { teil: "Teil 1 — können oder müssen?", typ: "luecke", frage: "___ du am Samstag wirklich arbeiten?", antwort: ["Musst"] },
      { teil: "Teil 1 — können oder müssen?", typ: "luecke", frage: "Wir ___ leider nicht zu deiner Party kommen.", antwort: ["können", "koennen"] },
      { teil: "Teil 1 — können oder müssen?", typ: "luecke", frage: "Frau Weber, ___ Sie mir bitte die Hausaufgaben schicken?", antwort: ["können", "koennen", "könnten"] },

      { teil: "Teil 2 — Bauen Sie den Satz.", teilIntro: "Schreiben Sie den ganzen Satz. Das Modalverb steht auf Position 2.", typ: "luecke", lang: true, frage: "Satz mit *muss*", woerter: ["morgen", "zum Arzt", "ich", "gehen", "muss"], antwort: ["Ich muss morgen zum Arzt gehen.", "Morgen muss ich zum Arzt gehen."] },
      { teil: "Teil 2 — Bauen Sie den Satz.", typ: "luecke", lang: true, frage: "Satz mit *kann*", woerter: ["am Freitag", "leider", "nicht", "kommen", "ich", "kann"], antwort: ["Ich kann am Freitag leider nicht kommen.", "Am Freitag kann ich leider nicht kommen.", "Leider kann ich am Freitag nicht kommen."] },
      { teil: "Teil 2 — Bauen Sie den Satz.", typ: "luecke", lang: true, frage: "Frage mit *können*", woerter: ["einen anderen Tag", "wir", "finden", "können"], antwort: ["Können wir einen anderen Tag finden?"] },

      { teil: "Teil 3 — An wen?", typ: "mc", frage: "Sie schreiben Ihrem Kursleiter, Herrn Koch.", optionen: ["Hi Koch, sorry, ich komm heute nicht!", "Sehr geehrter Herr Koch, leider kann ich heute nicht zum Kurs kommen.", "Lieber Herr, ich kann nicht.", "Sehr geehrte Herr Koch, ich komme nicht."], antwort: 1 },
      { teil: "Teil 3 — An wen?", typ: "mc", frage: "Ihre Freundin Nina hat Sie zum Essen eingeladen. Sie können nicht.", optionen: ["Sehr geehrte Nina, ich sage den Termin ab.", "Liebe Nina, danke für die Einladung! Leider kann ich am Freitag nicht, ich habe Spätschicht. Tut mir leid!", "Nina, nein.", "Liebe Nina, ich muss kommen."], antwort: 1 },

      {
        teil: "Teil 4 — Lesen Sie die Nachricht.",
        typ: "rf",
        frage: "Am Donnerstag gibt es keinen Kurs.",
        vorlageTitel: "E-Mail an alle Kursteilnehmer",
        vorlage: [
          "Liebe Kursteilnehmerinnen und Kursteilnehmer,",
          "",
          "leider bin ich krank und muss den Kurs am Donnerstag absagen. Wir holen die Stunde am Samstag, den 17. Oktober, von 10 bis 13 Uhr nach — diesmal in Raum 204, nicht in Raum 112.",
          "Bitte machen Sie bis Samstag die Übungen 3 bis 6 auf Seite 45.",
          "Wer am Samstag nicht kann, schreibt mir bitte kurz.",
          "",
          "Viele Grüße",
          "Petra Neumann"
        ],
        antwort: true
      },
      { teil: "Teil 4 — Lesen Sie die Nachricht.", typ: "rf", frage: "Der Samstagskurs ist im gleichen Raum wie immer.", antwort: false, warum: "Am Samstag ist der Kurs in Raum 204, sonst in Raum 112." },
      { teil: "Teil 4 — Lesen Sie die Nachricht.", typ: "rf", frage: "Die Teilnehmer sollen vier Übungen machen.", antwort: true, warum: "Übung 3, 4, 5 und 6." },

      {
        teil: "Teil 5 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Sie können nicht zum Nachholtermin am Samstag kommen. Schreiben Sie Frau Neumann.",
        punkte: ["Sagen Sie ab und nennen Sie den Grund.", "Entschuldigen Sie sich.", "Fragen Sie nach dem Material aus der Stunde."],
        woerter: 40,
        muster: [
          "Sehr geehrte Frau Neumann,",
          "",
          "gute Besserung! Leider kann ich am Samstag nicht zum Kurs kommen, denn ich muss an diesem Tag bis 14 Uhr arbeiten. Es tut mir sehr leid.",
          "Können Sie mir bitte die Arbeitsblätter aus der Stunde per E-Mail schicken? Die Übungen auf Seite 45 mache ich natürlich.",
          "",
          "Mit freundlichen Grüßen",
          "Daniel Okello"
        ],
        checkliste: [
          "Formelle Anrede und formeller Gruß?",
          "Steht der Infinitiv nach *kann* / *muss* am Satzende?",
          "Absage, Entschuldigung und Frage — alle drei da?"
        ]
      },
      {
        teil: "Teil 5 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Sie wollten am Samstag mit Ihrem Freund Tobias ins Kino gehen. Jetzt besuchen Sie Ihre Eltern am Wochenende. Schreiben Sie Tobias.",
        punkte: ["Sagen Sie ab und nennen Sie den Grund.", "Entschuldigen Sie sich.", "Schlagen Sie einen anderen Tag vor."],
        woerter: 35,
        muster: [
          "Hallo Tobias,",
          "",
          "es tut mir echt leid, aber ich kann am Samstag nicht mit ins Kino. Meine Eltern kommen am Wochenende überraschend zu Besuch, und ich muss sie am Bahnhof abholen.",
          "Hast du am Mittwochabend Zeit? Dann läuft der Film noch, und ich lade dich zum Popcorn ein!",
          "",
          "Liebe Grüße",
          "Kofi"
        ],
        checkliste: [
          "Persönliche Anrede, *du*-Form?",
          "Ein Grund und ein neuer Vorschlag mit Tag?",
          "Trennbare Verben richtig: *abholen* am Ende?"
        ]
      }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "S09",
    gruppe: "briefe",
    stufe: 3,
    title: "Informationen erfragen",
    subtitle: "Asking a school, club or hotel for details",
    focus: "Fragen in E-Mails, Wie viel? Wie lange? Gibt es …?",
    intro:
      "You have seen an advert for a course, a club or a place to stay, and something is missing — the price, the start date, whether you need to bring anything. The email that asks for it is short, but the questions have to be clear enough that the answer is useful.",
    lernen: [
      "An enquiry has a simple order: say who you are and where you saw the offer, ask your questions — each one as a complete question with a question mark — and thank them.",
      {
        kopf: ["Sie möchten wissen …", "Frage"],
        zeilen: [
          ["den Preis", "Wie viel kostet der Kurs?"],
          ["den Beginn", "Wann beginnt der nächste Kurs?"],
          ["die Dauer", "Wie lange dauert eine Stunde?"],
          ["den Ort", "Wo findet der Kurs statt?"],
          ["die Anmeldung", "Wie kann ich mich anmelden?"],
          ["was man braucht", "Muss ich etwas mitbringen?"],
          ["Ermäßigung", "Gibt es eine Ermäßigung für Studenten?"],
          ["ob etwas möglich ist", "Kann ich auch später einsteigen?"]
        ]
      },
      {
        box: "rule",
        titel: "Make it easy to answer",
        liste: [
          "Ask about what is *{en:not}* in the advert. Asking for information that is already there looks careless.",
          "Two or three questions are enough. Give each its own sentence.",
          "Start with a sentence that gives context: _{de:Ich habe Ihre Anzeige auf der Webseite der Stadt gelesen.}_"
        ]
      },
      {
        brief: [
          "Betreff: Frage zum Schwimmkurs für Erwachsene",
          "",
          "Sehr geehrte Damen und Herren,",
          "",
          "ich habe im Gemeindeblatt Ihre Anzeige für den Schwimmkurs für Erwachsene gelesen. Ich kann noch gar nicht schwimmen und interessiere mich sehr für den Kurs.",
          "Ich habe noch einige Fragen: Wie viele Personen sind in einer Gruppe? Gibt es auch einen Kurs am Wochenende? Und muss ich den ganzen Kurs am Anfang bezahlen?",
          "",
          "Vielen Dank für Ihre Antwort.",
          "",
          "Mit freundlichen Grüßen",
          "Grace Achieng"
        ],
        titel: "{de:Beispiel}"
      }
    ],
    aufgaben: [
      {
        teil: "Teil 1 — Lesen Sie die Anzeige.",
        typ: "rf",
        frage: "Der Kurs findet an einem Tag statt.",
        vorlageTitel: "Anzeige: Familienbildungsstätte Kassel",
        vorlage: [
          "*Brot backen wie früher*",
          "Sie lernen, wie man Sauerteig ansetzt, und backen drei verschiedene Brote. Zum Schluss essen wir gemeinsam.",
          "Samstag, 7. November, 10:00 – 15:00 Uhr",
          "Küche im Erdgeschoss, Wilhelmstraße 12",
          "Kursleitung: Bäckermeister Jens Fuchs",
          "Maximal 10 Personen · Anmeldung bis 30. Oktober",
          "Fragen an: info@fbs-kassel.de"
        ],
        antwort: true
      },
      { teil: "Teil 1 — Lesen Sie die Anzeige.", typ: "rf", frage: "Es können höchstens zehn Personen mitmachen.", antwort: true },
      { teil: "Teil 1 — Lesen Sie die Anzeige.", typ: "rf", frage: "In der Anzeige steht der Preis.", antwort: false, warum: "Der Preis fehlt — danach kann man fragen." },
      { teil: "Teil 1 — Lesen Sie die Anzeige.", typ: "mc", frage: "Welche Frage ist *nicht* nötig? Die Antwort steht schon in der Anzeige.", optionen: ["Wie viel kostet der Kurs?", "Muss ich etwas mitbringen?", "Wann beginnt der Kurs?", "Kann ich mein Kind mitbringen?"], antwort: 2 },

      { teil: "Teil 2 — Fragen bilden", teilIntro: "Ergänzen Sie das Fragewort oder das fehlende Wort.", typ: "luecke", frage: "___ kostet der Kurs?", hinweis: "zwei Wörter", antwort: ["Wie viel", "Wieviel"] },
      { teil: "Teil 2 — Fragen bilden", typ: "luecke", frage: "Wie ___ dauert der Kurs?", antwort: ["lange"] },
      { teil: "Teil 2 — Fragen bilden", typ: "luecke", frage: "___ es eine Ermäßigung für Schüler?", antwort: ["Gibt"] },
      { teil: "Teil 2 — Fragen bilden", typ: "luecke", frage: "Muss ich ___ mitbringen?", antwort: ["etwas", "was"] },
      { teil: "Teil 2 — Fragen bilden", typ: "luecke", frage: "Wo ___ der Kurs statt?", antwort: ["findet"], warum: "*stattfinden* ist trennbar: der Kurs *findet* … *statt*." },

      { teil: "Teil 3 — Der erste Satz", typ: "mc", frage: "Welcher Satz ist ein guter Anfang für die Anfrage zum Backkurs?", optionen: ["Ich will backen.", "ich habe Ihre Anzeige für den Brotbackkurs gelesen und interessiere mich sehr dafür.", "Hallo, was ist das für ein Kurs?", "Ich schreibe, weil ich Brot esse."], antwort: 1, warum: "Nach der Anrede mit Komma geht es klein weiter, und der Satz sagt, worum es geht." },

      {
        teil: "Teil 4 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Schreiben Sie an die Familienbildungsstätte Kassel. Sie möchten am Brotbackkurs teilnehmen.",
        punkte: ["Sagen Sie, wo Sie die Anzeige gelesen haben.", "Fragen Sie nach dem Preis.", "Fragen Sie, was Sie mitbringen müssen."],
        woerter: 45,
        muster: [
          "Betreff: Frage zum Kurs „Brot backen wie früher“",
          "",
          "Sehr geehrte Damen und Herren,",
          "",
          "ich habe Ihre Anzeige für den Brotbackkurs am 7. November in der Zeitung gelesen. Ich backe sehr gern und möchte gern mitmachen.",
          "Ich habe zwei Fragen: Wie viel kostet der Kurs? Und muss ich etwas mitbringen, zum Beispiel eine Schürze oder Behälter für das Brot?",
          "",
          "Vielen Dank für Ihre Antwort.",
          "",
          "Mit freundlichen Grüßen",
          "Nadia Benali"
        ],
        checkliste: [
          "Keine Frage nach etwas, das schon in der Anzeige steht?",
          "Jede Frage ein eigener Satz mit Fragezeichen?",
          "Formelle Anrede, *Sie* groß, formeller Gruß?"
        ]
      },
      {
        teil: "Teil 4 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Sie möchten mit einer Freundin zwei Nächte in einer Jugendherberge in Hamburg übernachten. Schreiben Sie eine Anfrage.",
        punkte: ["Wann kommen Sie, und wie viele Personen sind Sie?", "Fragen Sie nach dem Preis mit Frühstück.", "Fragen Sie nach Fahrrädern oder nach dem Weg vom Bahnhof."],
        woerter: 45,
        muster: [
          "Betreff: Anfrage für zwei Nächte im November",
          "",
          "Sehr geehrte Damen und Herren,",
          "",
          "meine Freundin und ich möchten vom 20. bis 22. November nach Hamburg kommen. Haben Sie für diese zwei Nächte ein Zimmer für zwei Personen frei?",
          "Wie viel kostet eine Nacht mit Frühstück? Außerdem möchten wir gern die Stadt mit dem Fahrrad ansehen. Kann man bei Ihnen Fahrräder leihen?",
          "",
          "Ich freue mich auf Ihre Antwort.",
          "",
          "Mit freundlichen Grüßen",
          "Esther Boateng"
        ],
        checkliste: [
          "Datum und Personenzahl genau angegeben?",
          "Zwei klare Fragen?",
          "Ein Schlusssatz vor dem Gruß?"
        ]
      }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "S10",
    gruppe: "briefe",
    stufe: 3,
    title: "Ein Problem melden",
    subtitle: "Writing to a landlord or an online shop",
    focus: "kaputt, funktioniert nicht, seit + Dativ, Perfekt, höflich bleiben",
    intro:
      "The heating stopped, the wrong parcel arrived, the washing machine in the basement leaks. A complaint in German does not need strong words. It needs the facts in the right order and a clear request — and it gets a faster answer when it stays polite.",
    lernen: [
      "A message about a problem answers four questions, in this order. If one is missing, the reply is usually a question back to you — and the problem waits another day.",
      {
        kopf: ["Frage", "{de:Beispiel}"],
        zeilen: [
          ["Was ist das Problem?", "Die Heizung im Schlafzimmer funktioniert nicht."],
          ["Seit wann?", "Seit Sonntag ist das Zimmer kalt."],
          ["Was haben Sie schon gemacht?", "Ich habe schon zweimal angerufen, aber niemand ist ans Telefon gegangen."],
          ["Was möchten Sie?", "Bitte schicken Sie so schnell wie möglich einen Techniker."],
          ["Wann sind Sie da?", "Ich bin jeden Tag ab 16 Uhr zu Hause."]
        ]
      },
      {
        box: "rule",
        titel: "{de:seit} + dative",
        text: ["*seit* says how long something has been going on, and it takes the dative. German uses the *{en:present tense}* for it — not a past tense."],
        zeilen: [
          ["seit Montag / seit Mai", "{en:no article}"],
          ["seit einem Tag / seit einer Woche", "ein → einem / eine → einer"],
          ["seit zwei Tagen / seit drei Wochen", "{en:plural adds -n}"]
        ]
      },
      {
        box: "rule",
        titel: "What already happened: {de:Perfekt}",
        zeilen: [
          ["bestellen", "Ich *habe* eine Jacke *bestellt*."],
          ["bekommen", "Ich *habe* eine falsche Größe *bekommen*."],
          ["anrufen", "Ich *habe* schon *angerufen*."],
          ["kommen", "Der Techniker *ist* nicht *gekommen*."]
        ]
      },
      {
        box: "mistake",
        titel: "Firm, but polite",
        liste: [
          "{de:~Machen Sie das sofort!~ → *Bitte* kümmern Sie sich so schnell wie möglich darum.}",
          "~Ich wohne hier seit zwei Jahren und die Heizung war kaputt seit Sonntag.~ → {de:Die Heizung *ist seit Sonntag* kaputt}.",
          "*bestellt* and *bekommen* have no *ge-*: verbs that begin with *be-, ver-, er-* never take it."
        ]
      }
    ],
    redemittel: [
      {
        titel: "{de:Probleme beschreiben}",
        zeilen: [
          ["… ist kaputt. / … funktioniert nicht.", "… is broken. / … doesn't work."],
          ["Das Wasser läuft nicht ab.", "The water doesn't drain."],
          ["Ich habe … bestellt, aber … bekommen.", "I ordered … but received …"],
          ["Die Ware ist beschädigt.", "The goods are damaged."],
          ["Ich möchte die Jacke umtauschen / zurückschicken.", "I'd like to exchange / return the jacket."],
          ["Bitte schicken Sie einen Techniker.", "Please send a technician."],
          ["Ich bitte um eine schnelle Antwort.", "I would appreciate a quick reply."]
        ]
      }
    ],
    aufgaben: [
      { teil: "Teil 1 — seit", typ: "luecke", frage: "Die Heizung ist seit drei ___ kaputt.", antwort: ["Tagen"] },
      { teil: "Teil 1 — seit", typ: "luecke", frage: "Ich warte seit ___ Woche auf mein Paket.", antwort: ["einer"] },
      { teil: "Teil 1 — seit", typ: "luecke", frage: "Die Waschmaschine funktioniert seit ___ Monat nicht.", antwort: ["einem"] },
      { teil: "Teil 1 — seit", typ: "mc", frage: "Welcher Satz ist richtig?", optionen: ["Die Dusche war seit Freitag kaputt.", "Die Dusche ist seit Freitag kaputt.", "Die Dusche ist kaputt seit dem Freitags.", "Seit Freitag die Dusche ist kaputt."], antwort: 1, warum: "Mit *seit* benutzt man das Präsens, wenn das Problem noch da ist." },

      { teil: "Teil 2 — Perfekt", typ: "luecke", frage: "Ich ___ schon dreimal angerufen.", antwort: ["habe"] },
      { teil: "Teil 2 — Perfekt", typ: "luecke", frage: "Der Techniker ___ gestern nicht gekommen.", antwort: ["ist"] },
      { teil: "Teil 2 — Perfekt", typ: "luecke", frage: "Ich habe am 2. Oktober eine blaue Jacke ___.", hinweis: "bestellen", antwort: ["bestellt"] },
      { teil: "Teil 2 — Perfekt", typ: "luecke", frage: "Aber ich habe eine grüne Jacke ___.", hinweis: "bekommen", antwort: ["bekommen"] },

      { teil: "Teil 3 — Höflich oder unhöflich?", typ: "mc", frage: "Welcher Satz passt am besten in eine E-Mail an die Hausverwaltung?", optionen: ["Reparieren Sie endlich die Heizung!", "Die Heizung ist kaputt. Das ist eine Katastrophe!", "Können Sie bitte so schnell wie möglich einen Techniker schicken?", "Ich zahle keine Miete mehr."], antwort: 2 },

      {
        teil: "Teil 4 — Lesen Sie den Aushang.",
        typ: "rf",
        frage: "Am Dienstagvormittag gibt es im Haus kein Wasser.",
        vorlageTitel: "Aushang im Treppenhaus",
        vorlage: [
          "*Hausverwaltung Brandt & Söhne — Information für alle Mieter*",
          "Wegen einer Reparatur an der Hauptleitung stellen wir am Dienstag, den 20. Oktober, von 8 bis 12 Uhr das Wasser ab.",
          "Bitte stellen Sie vorher Wasser in Flaschen bereit. Benutzen Sie in dieser Zeit keine Wasch- und Spülmaschinen.",
          "Ab Mittwoch erneuern wir die Briefkästen. Die Post liegt dann zwei Tage bei Familie Kowalski im Erdgeschoss.",
          "Bei Fragen: 0561 400 77 12 (Mo – Fr, 9 – 16 Uhr)"
        ],
        antwort: true
      },
      { teil: "Teil 4 — Lesen Sie den Aushang.", typ: "rf", frage: "Die Mieter sollen am Dienstag um 10 Uhr die Waschmaschine benutzen.", antwort: false, warum: "Von 8 bis 12 Uhr soll man *keine* Waschmaschine benutzen." },
      { teil: "Teil 4 — Lesen Sie den Aushang.", typ: "mc", frage: "Wo bekommen die Mieter ab Mittwoch ihre Post?", optionen: ["Im Briefkasten", "Bei der Hausverwaltung", "Bei Familie Kowalski", "Auf der Post"], antwort: 2 },

      {
        teil: "Teil 5 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Die Heizung in Ihrem Schlafzimmer funktioniert seit Sonntag nicht. Schreiben Sie an die Hausverwaltung Brandt & Söhne.",
        punkte: ["Beschreiben Sie das Problem. Seit wann?", "Was haben Sie schon versucht?", "Bitten Sie um einen Techniker und sagen Sie, wann Sie zu Hause sind."],
        woerter: 50,
        muster: [
          "Betreff: Heizung kaputt — Wohnung 3. OG links, Gartenstraße 9",
          "",
          "Sehr geehrte Damen und Herren,",
          "",
          "seit Sonntag funktioniert die Heizung in meinem Schlafzimmer nicht. Das Zimmer ist nachts nur 14 Grad warm, und mein kleiner Sohn schläft auch dort.",
          "Ich habe schon am Montag bei Ihnen angerufen, aber niemand ist ans Telefon gegangen.",
          "Bitte schicken Sie so schnell wie möglich einen Techniker. Ich bin jeden Tag ab 15 Uhr zu Hause, am Freitag den ganzen Tag.",
          "",
          "Mit freundlichen Grüßen",
          "Emeka Nwosu"
        ],
        checkliste: [
          "Adresse oder Wohnung im Betreff?",
          "*seit* + Präsens für das Problem, Perfekt für das, was schon passiert ist?",
          "Eine klare Bitte und Ihre Zeiten?",
          "Der Ton: bestimmt, aber höflich?"
        ]
      },
      {
        teil: "Teil 5 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Sie haben im Online-Shop „Schuhwerk24“ schwarze Sportschuhe in Größe 42 bestellt. Gekommen sind braune Schuhe in Größe 44. Schreiben Sie an den Kundenservice.",
        punkte: ["Was haben Sie bestellt, was haben Sie bekommen?", "Was möchten Sie jetzt?", "Fragen Sie, wie Sie die Schuhe zurückschicken."],
        woerter: 45,
        muster: [
          "Betreff: Falsche Lieferung — Bestellnummer 4481 2290",
          "",
          "Sehr geehrte Damen und Herren,",
          "",
          "am 5. Oktober habe ich bei Ihnen schwarze Sportschuhe in Größe 42 bestellt. Heute ist das Paket gekommen, aber darin sind braune Schuhe in Größe 44.",
          "Ich möchte die Schuhe gern umtauschen. Bitte schicken Sie mir die richtigen Schuhe. Wie kann ich die falschen Schuhe zurückschicken? Muss ich das Porto bezahlen?",
          "",
          "Vielen Dank im Voraus.",
          "",
          "Mit freundlichen Grüßen",
          "Ali Hassan"
        ],
        checkliste: [
          "Bestellnummer oder Datum genannt?",
          "*bestellt* und *bekommen* ohne *ge-*?",
          "Was Sie möchten, ist eindeutig: umtauschen oder Geld zurück?"
        ]
      }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "S11",
    gruppe: "texte",
    stufe: 2,
    title: "Über mich schreiben",
    subtitle: "A profile for a language exchange",
    focus: "Possessivartikel, Absätze, Sätze abwechslungsreich beginnen",
    intro:
      "A tandem partner, a new course group, a club's website — they all ask you to write a few lines about yourself. You already know how to introduce yourself out loud. Written, it needs a little more order, and sentences that do not all begin with *Ich*.",
    lernen: [
      "A good short profile has three or four small paragraphs, each about one thing. Put a blank line between them — on a phone screen a single block of text is hard to read.",
      {
        kopf: ["Absatz", "Inhalt", "{de:Beispiel}"],
        zeilen: [
          ["1", "Wer sind Sie?", "Ich heiße Omar, bin 31 und komme aus Marokko."],
          ["2", "Ihr Alltag", "Seit zwei Jahren lebe ich in Dortmund und arbeite als Krankenpfleger."],
          ["3", "Freizeit", "Am Wochenende spiele ich Fußball oder koche für Freunde."],
          ["4", "Was Sie suchen", "Ich suche einen Tandempartner: Ich helfe dir mit Arabisch oder Französisch, du hilfst mir mit Deutsch."]
        ]
      },
      {
        box: "rule",
        titel: "{de:mein, meine} — and the others",
        text: ["Possessive articles take the same endings as *ein / eine*. In the plural they end in *-e*."],
        zeilen: [
          ["ich", "mein Bruder · meine Schwester · mein Kind · meine Eltern"],
          ["du", "dein Bruder · deine Schwester · dein Kind · deine Eltern"],
          ["er / es", "sein Bruder · seine Schwester …"],
          ["sie", "ihr Bruder · ihre Schwester …"],
          ["Sie", "Ihr Bruder · Ihre Schwester …"]
        ]
      },
      {
        box: "example",
        titel: "Don't start every sentence with {de:Ich}",
        text: [
          "~Ich wohne in Dortmund. Ich arbeite im Krankenhaus. Ich spiele gern Fußball.~",
          "{de:*In Dortmund* wohne ich seit zwei Jahren. *Dort* arbeite ich im Krankenhaus. *In meiner Freizeit* spiele ich gern Fußball.}",
          "Put a time, a place or *dort / dann / außerdem* at the front — and remember the verb stays in position 2."
        ]
      },
      {
        brief: [
          "Hallo!",
          "",
          "Ich heiße Omar, bin 31 Jahre alt und komme aus Marokko, aus Fès. Meine Muttersprache ist Arabisch, außerdem spreche ich Französisch.",
          "",
          "Seit zwei Jahren lebe ich in Dortmund. Dort arbeite ich als Krankenpfleger in einem großen Krankenhaus. Meine Arbeit macht mir viel Spaß, aber die Schichten sind lang.",
          "",
          "In meiner Freizeit spiele ich Fußball in einem Verein. Außerdem koche ich gern — am liebsten Tajine für meine Freunde.",
          "",
          "Ich suche einen Tandempartner oder eine Tandempartnerin. Ich möchte mein Deutsch im Gespräch verbessern, und ich helfe dir gern mit Arabisch oder Französisch. Wir können uns in einem Café treffen.",
          "",
          "Bis bald!",
          "Omar"
        ],
        titel: "{de:Beispiel: Tandem-Profil}"
      }
    ],
    aufgaben: [
      { teil: "Teil 1 — mein, dein, sein, ihr …", typ: "luecke", frage: "Ich habe eine Schwester. ___ Schwester wohnt in Ghana.", antwort: ["Meine"] },
      { teil: "Teil 1 — mein, dein, sein, ihr …", typ: "luecke", frage: "Das ist Tarek und das ist ___ Vater.", antwort: ["sein"] },
      { teil: "Teil 1 — mein, dein, sein, ihr …", typ: "luecke", frage: "Wie heißt ___ Freundin, Paul?", antwort: ["deine"] },
      { teil: "Teil 1 — mein, dein, sein, ihr …", typ: "luecke", frage: "Frau Kaya, wo arbeitet ___ Mann?", antwort: ["Ihr"] },
      { teil: "Teil 1 — mein, dein, sein, ihr …", typ: "luecke", frage: "Lena kommt mit ___ Kindern.", hinweis: "Dativ Plural", antwort: ["ihren"] },

      { teil: "Teil 2 — Anders anfangen", teilIntro: "Beginnen Sie den Satz mit dem markierten Teil.", typ: "luecke", lang: true, frage: "Ich spiele *am Wochenende* Fußball.", antwort: ["Am Wochenende spiele ich Fußball."] },
      { teil: "Teil 2 — Anders anfangen", typ: "luecke", lang: true, frage: "Ich lerne *seit einem Jahr* Deutsch.", antwort: ["Seit einem Jahr lerne ich Deutsch."] },
      { teil: "Teil 2 — Anders anfangen", typ: "luecke", lang: true, frage: "Ich koche *außerdem* gern.", antwort: ["Außerdem koche ich gern.", "Ausserdem koche ich gern."] },

      { teil: "Teil 3 — Lesen Sie Omars Profil noch einmal.", typ: "rf", frage: "Omar spricht drei Sprachen.", antwort: true, warum: "Arabisch, Französisch — und jetzt Deutsch." },
      { teil: "Teil 3 — Lesen Sie Omars Profil noch einmal.", typ: "rf", frage: "Omar arbeitet in einem Restaurant.", antwort: false, warum: "Er ist Krankenpfleger in einem Krankenhaus. Kochen ist sein Hobby." },
      { teil: "Teil 3 — Lesen Sie Omars Profil noch einmal.", typ: "mc", frage: "Was möchte Omar im Tandem vor allem üben?", optionen: ["Deutsch schreiben", "Deutsch sprechen", "Französisch lernen", "Kochen"], antwort: 1, warum: "*… mein Deutsch im Gespräch verbessern* — im Gespräch heißt: sprechen." },

      {
        teil: "Teil 4 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Schreiben Sie Ihr eigenes Tandem-Profil.",
        punkte: ["Wer sind Sie? Woher kommen Sie, welche Sprachen sprechen Sie?", "Wo leben Sie, was machen Sie beruflich?", "Was machen Sie in der Freizeit?", "Was suchen Sie und was bieten Sie an?"],
        woerter: 70,
        muster: [
          "Hallo zusammen!",
          "",
          "Ich heiße Grace, bin 26 Jahre alt und komme aus Kenia. Ich spreche Luo, Swahili und Englisch.",
          "",
          "Seit acht Monaten wohne ich in Leipzig. Hier mache ich eine Ausbildung zur Pflegefachfrau. Die Arbeit ist anstrengend, aber ich lerne jeden Tag viel.",
          "",
          "In meiner Freizeit tanze ich gern. Außerdem gehe ich am Sonntag oft mit meiner Mitbewohnerin am See spazieren.",
          "",
          "Ich suche eine Tandempartnerin für Deutsch. Mein Deutsch ist noch nicht so gut, besonders beim Sprechen. Dafür helfe ich dir gern mit Englisch oder Swahili!",
          "",
          "Viele Grüße",
          "Grace"
        ],
        checkliste: [
          "Vier kurze Absätze mit Leerzeilen?",
          "Beginnen nicht alle Sätze mit *Ich*?",
          "Possessivartikel mit der richtigen Endung (*meine Mitbewohnerin*, *mein Deutsch*)?"
        ]
      },
      {
        teil: "Teil 4 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Antworten Sie auf Omars Profil.",
        punkte: ["Stellen Sie sich kurz vor.", "Sagen Sie, welche Sprache Sie lernen möchten.", "Schlagen Sie ein erstes Treffen vor: wann und wo?"],
        woerter: 45,
        muster: [
          "Hallo Omar,",
          "",
          "ich habe dein Profil gelesen und finde es sehr interessant. Ich heiße Julia, bin 29 und wohne auch in Dortmund. Ich bin Grundschullehrerin.",
          "Seit einem Jahr lerne ich Französisch, aber ich spreche noch sehr wenig. Ich helfe dir gern mit Deutsch!",
          "Hast du am Samstagnachmittag Zeit? Wir können uns um 15 Uhr im Café am Westpark treffen.",
          "",
          "Viele Grüße",
          "Julia"
        ],
        checkliste: [
          "*du*-Form, weil Omar im Profil auch *du* schreibt?",
          "Ein konkreter Vorschlag mit Tag, Uhrzeit und Ort?"
        ]
      }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "S12",
    gruppe: "texte",
    stufe: 3,
    title: "Grüße aus dem Urlaub",
    subtitle: "Writing about a trip",
    focus: "Perfekt mit haben und sein, Wetter, Postkarte und Nachricht",
    intro:
      "A postcard or a long message from a trip mixes two times: what you have already done, in the {de:Perfekt}, and what it is like here now, in the present. Keeping those two apart is what this unit practises.",
    lernen: [
      "A holiday message is short, but it follows a pattern. After the greeting, say where you are, tell two or three things you did, describe the place or the weather, and finish with what happens next.",
      {
        kopf: ["Teil", "Zeit", "{de:Beispiel}"],
        zeilen: [
          ["Wo sind Sie?", "Präsens", "Viele Grüße aus Dresden!"],
          ["Was haben Sie gemacht?", "Perfekt", "Gestern haben wir die Frauenkirche besichtigt."],
          ["Wie ist es?", "Präsens", "Die Stadt ist wunderschön, aber es regnet oft."],
          ["Was kommt noch?", "Präsens", "Morgen fahren wir mit dem Schiff auf der Elbe."]
        ]
      },
      {
        box: "rule",
        titel: "{de:haben} or {de:sein}?",
        text: ["Most verbs form the {de:Perfekt} with *haben*. Verbs of movement from one place to another, and *bleiben*, *passieren*, *werden*, take *sein*."],
        zeilen: [
          ["haben", "gegessen · gesehen · gekauft · gemacht · getrunken · fotografiert"],
          ["sein", "gefahren · geflogen · gegangen · gekommen · geschwommen · geblieben"]
        ]
      },
      {
        box: "rule",
        titel: "Participles without ge-",
        liste: [
          "Verbs ending in *-ieren*: {de:fotografieren} → *fotografiert*, {de:telefonieren} → *telefoniert*.",
          "Verbs starting with *be-, ver-, er-, ent-*: {de:besuchen} → *besucht*, {de:besichtigen} → *besichtigt*, {de:vergessen} → *vergessen*.",
          "Separable verbs put *ge* in the middle: {de:ankommen → an*ge*kommen, einkaufen → ein*ge*kauft}."
        ]
      },
      {
        box: "example",
        titel: "The weather",
        zeilen: [
          ["Die Sonne scheint.", "{en:The sun is shining.}"],
          ["Es ist heiß / warm / kühl / kalt.", "{en:It's hot / warm / cool / cold.}"],
          ["Es regnet. / Es schneit.", "{en:It's raining. / It's snowing.}"],
          ["Es ist windig / bewölkt.", "{en:It's windy / cloudy.}"],
          ["Wir haben Glück mit dem Wetter.", "{en:We're lucky with the weather.}"]
        ]
      }
    ],
    aufgaben: [
      { teil: "Teil 1 — Das Partizip", typ: "luecke", frage: "Wir haben viele Fotos ___.", hinweis: "machen", antwort: ["gemacht"] },
      { teil: "Teil 1 — Das Partizip", typ: "luecke", frage: "Am Montag sind wir in Wien ___.", hinweis: "ankommen", antwort: ["angekommen"] },
      { teil: "Teil 1 — Das Partizip", typ: "luecke", frage: "Wir haben das Schloss ___.", hinweis: "besichtigen", antwort: ["besichtigt"] },
      { teil: "Teil 1 — Das Partizip", typ: "luecke", frage: "Ich habe am Strand ein Buch ___.", hinweis: "lesen", antwort: ["gelesen"] },
      { teil: "Teil 1 — Das Partizip", typ: "luecke", frage: "Ich habe den ganzen Tag ___.", hinweis: "fotografieren", antwort: ["fotografiert"] },

      { teil: "Teil 2 — haben oder sein?", typ: "luecke", frage: "Wir ___ jeden Morgen im Meer geschwommen.", antwort: ["sind"] },
      { teil: "Teil 2 — haben oder sein?", typ: "luecke", frage: "Am Abend ___ wir Fisch gegessen.", antwort: ["haben"] },
      { teil: "Teil 2 — haben oder sein?", typ: "luecke", frage: "Es hat geregnet, deshalb ___ wir im Hotel geblieben.", antwort: ["sind"] },

      {
        teil: "Teil 3 — Lesen Sie die Postkarte.",
        typ: "rf",
        frage: "Sara ist mit ihrer Familie im Urlaub.",
        vorlageTitel: "Postkarte aus Hamburg",
        vorlage: [
          "Liebe Frau Albrecht,",
          "",
          "viele Grüße aus Hamburg! Am Freitag bin ich mit meiner Freundin Merve hier angekommen. Wir haben schon eine Hafenrundfahrt gemacht und sind durch die Speicherstadt gelaufen. Gestern Abend haben wir ein Musical gesehen — fantastisch!",
          "Das Wetter ist leider nicht so gut: Es ist windig und es regnet fast jeden Tag. Aber wir haben warme Jacken dabei.",
          "Am Dienstag fahre ich zurück, und am Mittwoch bin ich wieder im Büro.",
          "",
          "Herzliche Grüße",
          "Sara Yıldız"
        ],
        antwort: false,
        warum: "Sie ist mit ihrer Freundin Merve in Hamburg."
      },
      { teil: "Teil 3 — Lesen Sie die Postkarte.", typ: "rf", frage: "Frau Albrecht ist wahrscheinlich Saras Kollegin oder Chefin.", antwort: true, warum: "Sie schreibt *Liebe Frau Albrecht* mit Nachnamen und ist am Mittwoch *wieder im Büro*." },
      { teil: "Teil 3 — Lesen Sie die Postkarte.", typ: "mc", frage: "Wie ist das Wetter in Hamburg?", optionen: ["Sonnig und warm", "Windig und regnerisch", "Kalt mit Schnee", "Heiß"], antwort: 1 },
      { teil: "Teil 3 — Lesen Sie die Postkarte.", typ: "mc", frage: "Was haben Sara und Merve noch *nicht* gemacht?", optionen: ["Eine Hafenrundfahrt", "Einen Spaziergang durch die Speicherstadt", "Ein Musical", "Eine Fahrt nach Berlin"], antwort: 3 },

      {
        teil: "Teil 4 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Sie machen drei Tage Urlaub in einer Stadt. Schreiben Sie Ihrer Freundin Lea eine Postkarte.",
        punkte: ["Wo sind Sie, seit wann, mit wem?", "Was haben Sie schon gemacht? (zwei Dinge)", "Wie ist das Wetter oder das Essen?", "Wann kommen Sie zurück?"],
        woerter: 55,
        muster: [
          "Liebe Lea,",
          "",
          "viele Grüße aus München! Seit Donnerstag bin ich mit meinem Bruder hier. Am ersten Tag sind wir mit dem Fahrrad durch den Englischen Garten gefahren. Gestern haben wir das Deutsche Museum besucht — wir sind vier Stunden geblieben!",
          "Das Wetter ist super, die Sonne scheint jeden Tag. Und das Essen ist lecker, aber ziemlich teuer.",
          "Am Sonntagabend bin ich wieder zu Hause. Dann erzähle ich dir alles!",
          "",
          "Liebe Grüße",
          "Deine Chiara"
        ],
        checkliste: [
          "Perfekt für das, was schon passiert ist — Präsens für Wetter, Essen, Pläne?",
          "*sein* bei *fahren, gehen, bleiben*?",
          "Partizip immer am Satzende?"
        ]
      },
      {
        teil: "Teil 4 — Schreiben Sie selbst.",
        typ: "frei",
        frage: "Ihr Deutschkurs hat am Samstag einen Ausflug gemacht. Eine Kollegin war krank. Schreiben Sie ihr in der Kursgruppe, was Sie gemacht haben.",
        punkte: ["Wohin sind Sie gefahren und wie?", "Was haben Sie dort gemacht?", "Was hat Ihnen besonders gut gefallen?"],
        woerter: 50,
        muster: [
          "Hallo Mariam,",
          "",
          "schade, dass du nicht dabei warst! Wir sind am Samstag um 9 Uhr mit dem Zug nach Heidelberg gefahren. Zuerst haben wir das Schloss besichtigt, dann sind wir über die Alte Brücke gegangen. Mittags haben wir alle zusammen Maultaschen gegessen.",
          "Am besten hat mir die Aussicht vom Schloss gefallen. Ich habe viele Fotos gemacht, die schicke ich dir gleich.",
          "",
          "Gute Besserung!",
          "Ahmed"
        ],
        checkliste: [
          "Mindestens vier Sätze im Perfekt?",
          "*zuerst, dann* mit Verb direkt danach?",
          "Freundlicher Anfang und Schluss für eine kranke Kollegin?"
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
  },
  {
    key: "texte",
    titel: "Über sich schreiben",
    unter: "Writing about yourself",
    text: "Longer personal texts: a profile about yourself, and telling someone what you did on a trip."
  }
];
