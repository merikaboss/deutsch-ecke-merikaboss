/* ============================================================
   Deutsch Ecke — Übungsbuch: Lesen
   Every unit is written from scratch for this site. The German
   text never carries bracket translations — the Wortschatz table
   and the reveal panel are there instead, so reading it is real
   reading. Task prompts are in German; English appears only where
   it is genuinely needed as a hint.

   typ: rf     richtig / falsch   -> antwort: true | false
        mc     multiple choice    -> optionen: [], antwort: index
        luecke type the answer    -> antwort: [accepted strings]
        frei   free writing       -> muster: model answer
   ============================================================ */

var LESEN_UNITS = [

  /* ---------------------------------------------------------- */
  {
    id: "L01",
    gruppe: "geschichten",
    stufe: 1,
    title: "Annas Tag",
    subtitle: "A day in Anna's life",
    focus: "Präsens, trennbare Verben, Uhrzeit, Wochentage",
    intro:
      "Start here. The text below uses the present tense and a lot of separable verbs — the kind of German you meet in the very first weeks. Read it once straight through without stopping, even if you do not understand every word. Then read it again with the Wortschatz open.",
    text: [
      "Anna Weber wohnt in Bremen. Sie ist vierundzwanzig Jahre alt und arbeitet in einem Büro.",
      "Von Montag bis Freitag steht Anna um halb sieben auf. Zuerst geht sie ins Badezimmer und duscht. Dann zieht sie sich an und geht in die Küche.",
      "Um sieben Uhr frühstückt sie. Sie trinkt einen Kaffee und isst ein Brötchen mit Marmelade. Manchmal liest sie dabei die Zeitung.",
      "Um Viertel vor acht verlässt Anna das Haus. Sie fährt mit dem Bus zur Arbeit. Die Fahrt dauert zwanzig Minuten. Im Bus hört sie Musik.",
      "Anna arbeitet von acht Uhr bis siebzehn Uhr. Mittags isst sie in der Kantine. Sie isst gern Suppe und Salat. Um halb eins macht sie eine Pause und ruft ihre Mutter an.",
      "Am Abend kocht Anna zu Hause. Sie kocht gern, aber sie hat nicht immer Zeit. Am Dienstag geht sie zum Sport und am Donnerstag lernt sie Spanisch.",
      "Am Wochenende steht Anna spät auf. Am Samstag trifft sie ihre Freundin Lena. Sie gehen ins Café oder ins Kino. Am Sonntag besucht sie ihre Eltern.",
      "Um elf Uhr geht Anna ins Bett. Sie ist müde, aber zufrieden."
    ],
    wortschatz: [
      ["aufstehen", "to get up (separable: sie steht auf)"],
      ["duschen", "to shower"],
      ["sich anziehen", "to get dressed"],
      ["frühstücken", "to have breakfast"],
      ["das Brötchen, -", "bread roll"],
      ["die Marmelade, -n", "jam"],
      ["dabei", "at the same time, while doing it"],
      ["verlassen", "to leave (a place)"],
      ["die Fahrt, -en", "the journey, the ride"],
      ["dauern", "to last, to take (time)"],
      ["die Kantine, -n", "canteen, staff restaurant"],
      ["die Pause, -n", "break"],
      ["anrufen", "to phone (separable: sie ruft an)"],
      ["treffen", "to meet"],
      ["besuchen", "to visit"],
      ["müde", "tired"],
      ["zufrieden", "content, satisfied"]
    ],
    uebersetzung: [
      "Anna Weber lives in Bremen. She is twenty-four years old and works in an office.",
      "From Monday to Friday Anna gets up at half past six. First she goes to the bathroom and showers. Then she gets dressed and goes into the kitchen.",
      "At seven o'clock she has breakfast. She drinks a coffee and eats a bread roll with jam. Sometimes she reads the newspaper while she does it.",
      "At a quarter to eight Anna leaves the house. She takes the bus to work. The journey takes twenty minutes. On the bus she listens to music.",
      "Anna works from eight until five. At midday she eats in the canteen. She likes soup and salad. At half past twelve she takes a break and phones her mother.",
      "In the evening Anna cooks at home. She likes cooking, but she does not always have time. On Tuesday she goes to do sport and on Thursday she learns Spanish.",
      "At the weekend Anna gets up late. On Saturday she meets her friend Lena. They go to a café or to the cinema. On Sunday she visits her parents.",
      "At eleven o'clock Anna goes to bed. She is tired but content."
    ],
    aufgaben: [
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Anna wohnt in Berlin.", antwort: false, warum: "Sie wohnt in Bremen." },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Anna fährt mit dem Bus zur Arbeit.", antwort: true },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Am Wochenende steht Anna früh auf.", antwort: false, warum: "Am Wochenende steht sie spät auf." },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Am Donnerstag lernt Anna Spanisch.", antwort: true },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Anna isst mittags zu Hause.", antwort: false, warum: "Mittags isst sie in der Kantine. Am Abend kocht sie zu Hause." },

      { teil: "Teil 2 — Wählen Sie die richtige Antwort.", typ: "mc", frage: "Wann steht Anna von Montag bis Freitag auf?", optionen: ["Um halb sieben", "Um sieben Uhr", "Um Viertel vor acht", "Um halb eins"], antwort: 0 },
      { teil: "Teil 2 — Wählen Sie die richtige Antwort.", typ: "mc", frage: "Was isst Anna zum Frühstück?", optionen: ["Suppe und Salat", "Ein Brötchen mit Marmelade", "Nichts", "Einen Apfel"], antwort: 1 },
      { teil: "Teil 2 — Wählen Sie die richtige Antwort.", typ: "mc", frage: "Wie lange dauert die Fahrt zur Arbeit?", optionen: ["Zehn Minuten", "Fünfzehn Minuten", "Zwanzig Minuten", "Eine Stunde"], antwort: 2 },
      { teil: "Teil 2 — Wählen Sie die richtige Antwort.", typ: "mc", frage: "Wen besucht Anna am Sonntag?", optionen: ["Ihre Freundin Lena", "Ihre Mutter im Büro", "Ihre Eltern", "Ihren Chef"], antwort: 2 },
      { teil: "Teil 2 — Wählen Sie die richtige Antwort.", typ: "mc", frage: "Warum kocht Anna nicht jeden Abend?", optionen: ["Sie kocht nicht gern.", "Sie hat nicht immer Zeit.", "Sie hat keine Küche.", "Sie isst immer im Restaurant."], antwort: 1, warum: "Im Text steht: „Sie kocht gern, aber sie hat nicht immer Zeit.“" },

      { teil: "Teil 3 — Ergänzen Sie das fehlende Wort.", typ: "luecke", frage: "Anna ___ um halb sieben auf.", antwort: ["steht"], hinweis: "aufstehen, 3. Person Singular" },
      { teil: "Teil 3 — Ergänzen Sie das fehlende Wort.", typ: "luecke", frage: "Sie fährt mit ___ Bus zur Arbeit.", antwort: ["dem"], warum: "mit + Dativ. Der Bus wird im Dativ zu dem Bus." },
      { teil: "Teil 3 — Ergänzen Sie das fehlende Wort.", typ: "luecke", frage: "Am Samstag ___ sie ihre Freundin Lena.", antwort: ["trifft"], warum: "treffen ändert den Vokal: ich treffe, du triffst, sie trifft." },
      { teil: "Teil 3 — Ergänzen Sie das fehlende Wort.", typ: "luecke", frage: "Um halb eins ___ sie ihre Mutter ___.", antwort: ["ruft an", "ruft ... an", "ruft an."], hinweis: "two words: anrufen is separable" },
      { teil: "Teil 3 — Ergänzen Sie das fehlende Wort.", typ: "luecke", frage: "Wie alt ist Anna? Schreiben Sie die Zahl als Wort.", antwort: ["vierundzwanzig", "24"], warum: "Im Deutschen kommt die Einerzahl zuerst: vier-und-zwanzig." },

      { teil: "Teil 4 — Schreiben Sie selbst.", typ: "frei", frage: "Und Sie? Beschreiben Sie Ihren Morgen in vier Sätzen. Benutzen Sie mindestens zwei trennbare Verben.", muster: "Ich stehe um sechs Uhr auf. Dann dusche ich und ziehe mich an. Um halb sieben frühstücke ich und trinke einen Tee. Um sieben Uhr verlasse ich das Haus und fahre mit dem Zug zur Arbeit.", warum: "Achten Sie darauf: bei trennbaren Verben steht die Vorsilbe am Satzende — ich stehe … *auf*." }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "L02",
    gruppe: "geschichten",
    stufe: 1,
    title: "Im Supermarkt",
    subtitle: "Herr Koch does the shopping",
    focus: "Akkusativ, Preise und Zahlen, Einkaufen, höfliche Fragen",
    intro:
      "Shopping is where numbers stop being an exercise and start costing you money. Watch the prices in this text carefully — the tasks will ask you to read them back. Notice too how Herr Koch asks the shop assistant for help; that polite question is one you will reuse everywhere.",
    text: [
      "Herr Koch geht am Samstagmorgen einkaufen. Er nimmt eine Tasche und eine Einkaufsliste mit.",
      "Auf der Liste stehen: Brot, Milch, Eier, Käse, Tomaten und Äpfel.",
      "Im Supermarkt nimmt Herr Koch zuerst einen Einkaufswagen. Das Brot findet er gleich am Eingang. Er kauft ein Vollkornbrot für zwei Euro neunzig.",
      "Dann geht er zu den Getränken. Die Milch kostet einen Euro fünfzehn. Er nimmt zwei Flaschen.",
      "Bei den Eiern gibt es ein Problem. Es gibt nur noch eine Packung, und sie ist kaputt. Herr Koch fragt eine Verkäuferin: „Entschuldigung, haben Sie noch Eier?“ Die Verkäuferin antwortet: „Einen Moment, ich schaue im Lager nach.“ Nach fünf Minuten bringt sie eine neue Packung.",
      "Das Obst und das Gemüse sind heute im Angebot. Ein Kilo Tomaten kostet nur einen Euro neunundneunzig. Herr Koch nimmt auch ein Kilo Äpfel.",
      "Den Käse vergisst er fast. Zum Glück sieht er das Schild „Käse und Wurst“ und geht noch einmal zurück.",
      "An der Kasse ist eine lange Schlange. Herr Koch wartet zehn Minuten. Er bezahlt mit Karte. Alles zusammen kostet siebzehn Euro vierzig.",
      "„Möchten Sie eine Tüte?“, fragt die Kassiererin. „Nein, danke“, sagt Herr Koch. „Ich habe eine Tasche.“"
    ],
    wortschatz: [
      ["einkaufen", "to shop, to do the shopping"],
      ["die Einkaufsliste, -n", "shopping list"],
      ["mitnehmen", "to take along (separable)"],
      ["der Einkaufswagen, -", "shopping trolley"],
      ["der Eingang, ¨-e", "entrance"],
      ["das Vollkornbrot, -e", "wholemeal bread"],
      ["die Flasche, -n", "bottle"],
      ["die Packung, -en", "packet, pack"],
      ["kaputt", "broken, damaged"],
      ["die Verkäuferin, -nen", "shop assistant (female)"],
      ["das Lager, -", "stockroom, warehouse"],
      ["nachschauen", "to go and check (separable)"],
      ["im Angebot", "on offer, on special"],
      ["vergessen", "to forget"],
      ["zum Glück", "luckily"],
      ["die Kasse, -n", "checkout, till"],
      ["die Schlange, -n", "queue (also: snake)"],
      ["bezahlen", "to pay"],
      ["die Tüte, -n", "carrier bag"]
    ],
    uebersetzung: [
      "Mr Koch goes shopping on Saturday morning. He takes a bag and a shopping list with him.",
      "On the list are: bread, milk, eggs, cheese, tomatoes and apples.",
      "In the supermarket Mr Koch first takes a trolley. He finds the bread right by the entrance. He buys a wholemeal loaf for two euros ninety.",
      "Then he goes to the drinks. The milk costs one euro fifteen. He takes two bottles.",
      "At the eggs there is a problem. There is only one packet left, and it is damaged. Mr Koch asks a shop assistant: \"Excuse me, do you have any more eggs?\" The assistant answers: \"One moment, I'll check in the stockroom.\" After five minutes she brings a new packet.",
      "The fruit and vegetables are on offer today. A kilo of tomatoes costs only one euro ninety-nine. Mr Koch takes a kilo of apples too.",
      "He almost forgets the cheese. Luckily he sees the sign \"Cheese and sausage\" and goes back again.",
      "At the checkout there is a long queue. Mr Koch waits ten minutes. He pays by card. Altogether it costs seventeen euros forty.",
      "\"Would you like a bag?\" asks the cashier. \"No, thank you,\" says Mr Koch. \"I have a bag.\""
    ],
    aufgaben: [
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Herr Koch geht am Sonntag einkaufen.", antwort: false, warum: "Er geht am Samstagmorgen einkaufen. Deutsche Supermärkte sind sonntags geschlossen." },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Herr Koch kauft zwei Flaschen Milch.", antwort: true },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Die Verkäuferin findet keine Eier mehr.", antwort: false, warum: "Sie schaut im Lager nach und bringt eine neue Packung." },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Herr Koch bezahlt mit Karte.", antwort: true },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Er nimmt an der Kasse eine Tüte.", antwort: false, warum: "Er sagt „Nein, danke“ — er hat schon eine Tasche dabei." },

      { teil: "Teil 2 — Preise und Zahlen", typ: "mc", frage: "Was kostet das Vollkornbrot?", optionen: ["1,15 €", "1,99 €", "2,90 €", "17,40 €"], antwort: 2 },
      { teil: "Teil 2 — Preise und Zahlen", typ: "mc", frage: "Was kostet ein Kilo Tomaten?", optionen: ["1,15 €", "1,99 €", "2,90 €", "4,50 €"], antwort: 1 },
      { teil: "Teil 2 — Preise und Zahlen", typ: "luecke", frage: "Wie viel bezahlt Herr Koch zusammen? Schreiben Sie die Zahl mit Komma, zum Beispiel 3,50", antwort: ["17,40", "17.40", "1740"], warum: "Siebzehn Euro vierzig = 17,40 €. Im Deutschen steht ein Komma, kein Punkt." },
      { teil: "Teil 2 — Preise und Zahlen", typ: "luecke", frage: "Wie lange wartet Herr Koch an der Kasse? Antworten Sie mit einer Zahl.", antwort: ["10", "zehn", "zehn minuten", "10 minuten"] },

      { teil: "Teil 3 — Ergänzen Sie den Artikel.", typ: "luecke", frage: "Er nimmt ___ Einkaufswagen.", antwort: ["einen"], warum: "der Einkaufswagen im Akkusativ: *einen* Einkaufswagen. Nur der Maskulinum ändert sich." },
      { teil: "Teil 3 — Ergänzen Sie den Artikel.", typ: "luecke", frage: "Er kauft ___ Vollkornbrot.", antwort: ["ein"], warum: "das Brot ist Neutrum — im Akkusativ bleibt es *ein*." },
      { teil: "Teil 3 — Ergänzen Sie den Artikel.", typ: "luecke", frage: "Er nimmt ___ Tasche mit.", antwort: ["eine"], warum: "die Tasche ist feminin — im Akkusativ bleibt es *eine*." },
      { teil: "Teil 3 — Ergänzen Sie den Artikel.", typ: "mc", frage: "Welcher Satz ist richtig?", optionen: ["Ich möchte einen Milch.", "Ich möchte eine Milch.", "Ich möchte ein Milch.", "Ich möchte einem Milch."], antwort: 1, warum: "die Milch ist feminin, also *eine* Milch." },

      { teil: "Teil 4 — Im Geschäft sprechen", typ: "luecke", frage: "Wie fragt Herr Koch höflich nach Eiern? Schreiben Sie die Frage aus dem Text.", antwort: ["entschuldigung haben sie noch eier", "haben sie noch eier", "entschuldigung, haben sie noch eier?"], hinweis: "the exact question from the text" },
      { teil: "Teil 4 — Im Geschäft sprechen", typ: "frei", frage: "Sie suchen im Supermarkt Zucker, aber Sie finden ihn nicht. Schreiben Sie einen kurzen Dialog (4 Zeilen) mit einer Verkäuferin.", muster: "Sie: Entschuldigung, wo finde ich Zucker? — Verkäuferin: Der Zucker ist in Regal drei, neben dem Mehl. — Sie: Vielen Dank! Und haben Sie auch braunen Zucker? — Verkäuferin: Ja, der steht gleich daneben.", warum: "Mit *Entschuldigung* anfangen und *Sie* benutzen — im Geschäft duzt man fremde Menschen nicht." }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "L03",
    gruppe: "geschichten",
    stufe: 2,
    title: "Die neue Wohnung",
    subtitle: "Family Öztürk moves in",
    focus: "Wechselpräpositionen mit Dativ, Wohnung und Möbel, Zahlen über 100",
    intro:
      "This text is built on the prepositions that tell you *where* something is — an, auf, hinter, in, neben, über, unter, vor, zwischen. When they answer the question *Wo?* they take the dative, and almost every sentence here is an example. Read it once for the story, then a second time hunting for those prepositions.",
    text: [
      "Familie Öztürk hat eine neue Wohnung. Sie liegt in der Gartenstraße, im dritten Stock. Das Haus hat keinen Aufzug, aber das ist kein Problem.",
      "Die Wohnung hat drei Zimmer, eine Küche, ein Bad und einen Balkon. Sie ist sechsundsiebzig Quadratmeter groß und kostet siebenhundertfünfzig Euro warm.",
      "Das Wohnzimmer ist das größte Zimmer. Dort steht ein großes Sofa vor dem Fenster. Der Fernseher hängt an der Wand. Zwischen dem Sofa und dem Fernseher liegt ein blauer Teppich.",
      "Das Schlafzimmer ist klein, aber gemütlich. Neben dem Bett steht ein Schrank für die Kleidung. Über dem Bett hängt ein Bild aus Istanbul.",
      "Das dritte Zimmer gehört Elif. Sie ist sieben Jahre alt und geht in die zweite Klasse. Ihr Schreibtisch steht am Fenster, weil sie dort gutes Licht hat. Unter dem Bett liegen ihre Spielsachen.",
      "Die Küche ist neu. Der Kühlschrank steht rechts neben der Tür, und die Spülmaschine ist unter der Arbeitsplatte. Auf dem Tisch steht immer eine Schale mit Obst.",
      "Herr Öztürk sitzt gern auf dem Balkon. Dort trinkt er am Morgen seinen Tee und liest die Nachrichten.",
      "Die Nachbarn sind freundlich. Frau Schulz wohnt unter ihnen und hat schon Kuchen gebracht.",
      "„Hier bleiben wir lange“, sagt Frau Öztürk."
    ],
    wortschatz: [
      ["der Stock, Stockwerke", "floor, storey (im dritten Stock = on the third floor)"],
      ["der Aufzug, ¨-e", "lift, elevator"],
      ["der Quadratmeter, -", "square metre"],
      ["warm (bei Miete)", "rent including bills"],
      ["der Teppich, -e", "carpet, rug"],
      ["gemütlich", "cosy"],
      ["der Schrank, ¨-e", "wardrobe, cupboard"],
      ["die Kleidung", "clothing"],
      ["gehören", "to belong to (+ Dativ)"],
      ["der Schreibtisch, -e", "desk"],
      ["das Licht, -er", "light"],
      ["die Spielsachen (Pl.)", "toys"],
      ["der Kühlschrank, ¨-e", "fridge"],
      ["die Spülmaschine, -n", "dishwasher"],
      ["die Arbeitsplatte, -n", "worktop, counter"],
      ["die Schale, -n", "bowl"],
      ["die Nachrichten (Pl.)", "the news"],
      ["die Nachbarn (Pl.)", "neighbours"]
    ],
    uebersetzung: [
      "The Öztürk family has a new flat. It is in Gartenstraße, on the third floor. The building has no lift, but that is not a problem.",
      "The flat has three rooms, a kitchen, a bathroom and a balcony. It is seventy-six square metres and costs seven hundred and fifty euros including bills.",
      "The living room is the biggest room. A large sofa stands there in front of the window. The television hangs on the wall. Between the sofa and the television lies a blue carpet.",
      "The bedroom is small but cosy. Next to the bed stands a wardrobe for the clothes. Above the bed hangs a picture from Istanbul.",
      "The third room belongs to Elif. She is seven years old and is in the second year at school. Her desk stands by the window, because she has good light there. Under the bed lie her toys.",
      "The kitchen is new. The fridge stands to the right of the door, and the dishwasher is under the worktop. On the table there is always a bowl of fruit.",
      "Mr Öztürk likes sitting on the balcony. There he drinks his tea in the morning and reads the news.",
      "The neighbours are friendly. Mrs Schulz lives below them and has already brought cake.",
      "\"We are staying here a long time,\" says Mrs Öztürk."
    ],
    aufgaben: [
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Die Wohnung ist im dritten Stock.", antwort: true },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Das Haus hat einen Aufzug.", antwort: false, warum: "Im Text steht: „Das Haus hat *keinen* Aufzug.“" },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Elif ist sieben Jahre alt.", antwort: true },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Frau Schulz wohnt über der Familie Öztürk.", antwort: false, warum: "Sie wohnt *unter* ihnen." },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Die Wohnung kostet 750 Euro warm.", antwort: true },

      { teil: "Teil 2 — Wo steht was?", typ: "mc", frage: "Wo steht das Sofa?", optionen: ["Neben der Tür", "Vor dem Fenster", "Unter dem Bild", "Auf dem Balkon"], antwort: 1 },
      { teil: "Teil 2 — Wo steht was?", typ: "mc", frage: "Wo liegt der blaue Teppich?", optionen: ["Unter dem Bett", "Neben dem Schrank", "Zwischen dem Sofa und dem Fernseher", "Vor der Tür"], antwort: 2 },
      { teil: "Teil 2 — Wo steht was?", typ: "mc", frage: "Wo hängt das Bild aus Istanbul?", optionen: ["Über dem Bett", "An der Wand im Wohnzimmer", "Neben dem Schreibtisch", "In der Küche"], antwort: 0 },
      { teil: "Teil 2 — Wo steht was?", typ: "mc", frage: "Wo ist die Spülmaschine?", optionen: ["Neben dem Kühlschrank", "Auf der Arbeitsplatte", "Unter der Arbeitsplatte", "Im Bad"], antwort: 2 },

      { teil: "Teil 3 — Ergänzen Sie die Präposition oder den Artikel.", typ: "luecke", frage: "Der Fernseher hängt ___ der Wand.", antwort: ["an"], warum: "Bei einer senkrechten Fläche benutzt man *an*, nicht *auf*." },
      { teil: "Teil 3 — Ergänzen Sie die Präposition oder den Artikel.", typ: "luecke", frage: "Neben ___ Bett steht ein Schrank.", antwort: ["dem"], warum: "*Wo?* → Dativ. das Bett wird zu *dem* Bett." },
      { teil: "Teil 3 — Ergänzen Sie die Präposition oder den Artikel.", typ: "luecke", frage: "Auf ___ Tisch steht eine Schale mit Obst.", antwort: ["dem"], warum: "der Tisch im Dativ → *dem* Tisch." },
      { teil: "Teil 3 — Ergänzen Sie die Präposition oder den Artikel.", typ: "luecke", frage: "Unter ___ Bett liegen ihre Spielsachen.", antwort: ["dem"] },
      { teil: "Teil 3 — Ergänzen Sie die Präposition oder den Artikel.", typ: "luecke", frage: "Der Kühlschrank steht rechts neben ___ Tür.", antwort: ["der"], warum: "die Tür ist feminin — im Dativ wird *die* zu *der*." },

      { teil: "Teil 4 — Fehler finden", typ: "mc", frage: "Welcher Satz ist *falsch*?", optionen: ["Das Bild hängt über dem Bett.", "Der Teppich liegt auf dem Boden.", "Die Lampe hängt über den Tisch.", "Der Schrank steht neben dem Bett."], antwort: 2, warum: "*Wo?* verlangt den Dativ: über *dem* Tisch. Mit *den* würde der Satz eine Bewegung beschreiben." },
      { teil: "Teil 4 — Fehler finden", typ: "luecke", frage: "Wie viele Quadratmeter hat die Wohnung? Antworten Sie mit der Zahl.", antwort: ["76", "sechsundsiebzig"] },

      { teil: "Teil 5 — Schreiben Sie selbst.", typ: "frei", frage: "Beschreiben Sie Ihr Zimmer in fünf Sätzen. Benutzen Sie mindestens vier verschiedene Präpositionen aus diesem Text.", muster: "Mein Zimmer ist nicht groß, aber hell. Das Bett steht an der Wand neben dem Fenster. Über dem Bett hängt ein Regal mit meinen Büchern. Vor dem Bett liegt ein kleiner Teppich. Der Schreibtisch steht zwischen dem Schrank und der Tür.", warum: "Prüfen Sie jeden Satz: Steht nach der Präposition der Dativ? *dem* (m/n), *der* (f), *den …n* (Plural)." }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "L04",
    gruppe: "geschichten",
    stufe: 2,
    title: "Eine E-Mail von Tarek",
    subtitle: "A weekend in Munich, written afterwards",
    focus: "Perfekt mit haben und sein, E-Mail-Form, Wochenende erzählen",
    intro:
      "Everything in this email already happened, so it is written in the Perfekt — the tense Germans use to talk about the past in conversation and in messages. Watch which verbs take *haben* and which take *sein*: the ones with *sein* are almost all movement (fahren, gehen, kommen) or a change of state (werden, bleiben).",
    brief: true,
    text: [
      "*Von:* tarek.hassan@mail.de",
      "*An:* lena.b@mail.de",
      "*Betreff:* Mein Wochenende in München",
      "Liebe Lena,",
      "wie geht es dir? Ich hoffe, du bist gesund.",
      "Ich bin am Freitagabend nach München gefahren. Der Zug hat vier Stunden gedauert, aber die Fahrt war schön.",
      "Am Samstag habe ich die Stadt angeschaut. Ich bin zuerst zum Marienplatz gegangen und habe viele Fotos gemacht. Danach habe ich im Englischen Garten einen Spaziergang gemacht. Das Wetter war leider nicht so gut — am Nachmittag hat es geregnet.",
      "Am Abend habe ich meinen Freund Jonas getroffen. Wir haben zusammen gegessen und lange gesprochen. Ich habe Schweinebraten probiert. Das hat sehr gut geschmeckt!",
      "Am Sonntag bin ich leider krank geworden. Ich hatte Halsschmerzen und bin im Hotel geblieben. Deshalb habe ich das Deutsche Museum nicht gesehen. Das finde ich sehr schade.",
      "Am Montagmorgen bin ich zurückgekommen. Jetzt geht es mir wieder besser.",
      "Und du? Was hast du am Wochenende gemacht? Schreib mir bald!",
      "Viele Grüße",
      "Tarek"
    ],
    wortschatz: [
      ["der Betreff", "subject line"],
      ["gesund", "healthy, well"],
      ["dauern", "to last, to take (time)"],
      ["anschauen", "to look at, to see (separable)"],
      ["der Spaziergang, ¨-e", "walk, stroll"],
      ["einen Spaziergang machen", "to go for a walk"],
      ["regnen", "to rain"],
      ["treffen", "to meet"],
      ["probieren", "to try, to taste"],
      ["schmecken", "to taste (good)"],
      ["krank werden", "to fall ill"],
      ["bleiben", "to stay"],
      ["deshalb", "therefore, that is why"],
      ["schade", "a pity, a shame"],
      ["zurückkommen", "to come back (separable)"],
      ["Viele Grüße", "Best wishes (informal sign-off)"]
    ],
    uebersetzung: [
      "From: tarek.hassan@mail.de",
      "To: lena.b@mail.de",
      "Subject: My weekend in Munich",
      "Dear Lena,",
      "how are you? I hope you are well.",
      "I travelled to Munich on Friday evening. The train took four hours, but the journey was nice.",
      "On Saturday I looked round the city. First I went to Marienplatz and took a lot of photos. After that I went for a walk in the English Garden. Unfortunately the weather was not so good — it rained in the afternoon.",
      "In the evening I met my friend Jonas. We ate together and talked for a long time. I tried roast pork. It tasted very good!",
      "On Sunday I unfortunately fell ill. I had a sore throat and stayed in the hotel. That is why I did not see the German Museum. I think that is a real shame.",
      "On Monday morning I came back. Now I am feeling better again.",
      "And you? What did you do at the weekend? Write to me soon!",
      "Best wishes,",
      "Tarek"
    ],
    aufgaben: [
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Tarek ist mit dem Zug nach München gefahren.", antwort: true },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Am Samstag hat es den ganzen Tag geregnet.", antwort: false, warum: "Es hat nur am Nachmittag geregnet." },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Tarek hat das Deutsche Museum besucht.", antwort: false, warum: "Er ist krank geworden und im Hotel geblieben." },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Jonas und Tarek haben zusammen gegessen.", antwort: true },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Tarek ist am Sonntagabend zurückgekommen.", antwort: false, warum: "Er ist am Montagmorgen zurückgekommen." },

      { teil: "Teil 2 — haben oder sein?", typ: "mc", frage: "Ich ___ nach München gefahren.", optionen: ["habe", "bin", "war", "hat"], antwort: 1, warum: "*fahren* ist ein Bewegungsverb — Perfekt mit *sein*." },
      { teil: "Teil 2 — haben oder sein?", typ: "mc", frage: "Wir ___ lange gesprochen.", optionen: ["sind", "haben", "waren", "ist"], antwort: 1, warum: "*sprechen* beschreibt keine Bewegung — Perfekt mit *haben*." },
      { teil: "Teil 2 — haben oder sein?", typ: "mc", frage: "Er ___ im Hotel geblieben.", optionen: ["hat", "ist", "war", "haben"], antwort: 1, warum: "*bleiben* nimmt *sein*, obwohl es keine Bewegung ist — das muss man einfach lernen." },
      { teil: "Teil 2 — haben oder sein?", typ: "luecke", frage: "Am Samstag ___ ich viele Fotos gemacht.", antwort: ["habe"] },
      { teil: "Teil 2 — haben oder sein?", typ: "luecke", frage: "Am Sonntag ___ ich krank geworden.", antwort: ["bin"], warum: "*werden* zeigt eine Veränderung — Perfekt mit *sein*." },

      { teil: "Teil 3 — Partizip II bilden", typ: "luecke", frage: "machen → ich habe ___", antwort: ["gemacht"] },
      { teil: "Teil 3 — Partizip II bilden", typ: "luecke", frage: "essen → wir haben ___", antwort: ["gegessen"] },
      { teil: "Teil 3 — Partizip II bilden", typ: "luecke", frage: "gehen → ich bin ___", antwort: ["gegangen"] },
      { teil: "Teil 3 — Partizip II bilden", typ: "luecke", frage: "treffen → ich habe ihn ___", antwort: ["getroffen"] },
      { teil: "Teil 3 — Partizip II bilden", typ: "luecke", frage: "probieren → ich habe ___", antwort: ["probiert"], warum: "Verben auf *-ieren* bekommen *kein* ge-: probiert, nicht geprobiert." },

      { teil: "Teil 4 — Die Form der E-Mail", typ: "mc", frage: "Wie fängt eine informelle E-Mail an eine Freundin an?", optionen: ["Sehr geehrte Frau Lena,", "Liebe Lena,", "Hallo Frau Lena,", "Guten Tag Lena,"], antwort: 1, warum: "*Liebe/Lieber* + Vorname ist die normale informelle Anrede. *Sehr geehrte* ist formell." },
      { teil: "Teil 4 — Die Form der E-Mail", typ: "mc", frage: "Nach der Anrede „Liebe Lena,“ schreibt man weiter …", optionen: ["mit einem großen Buchstaben", "mit einem kleinen Buchstaben", "mit einem Ausrufezeichen", "in einer neuen Zeile mit Großbuchstaben"], antwort: 1, warum: "Nach dem Komma geht es klein weiter: „Liebe Lena, *wie* geht es dir?“" },

      { teil: "Teil 5 — Schreiben Sie selbst.", typ: "frei", frage: "Antworten Sie Tarek. Schreiben Sie fünf bis sechs Sätze im Perfekt über Ihr letztes Wochenende. Vergessen Sie die Anrede und den Gruß nicht.", muster: "Lieber Tarek, danke für deine E-Mail! Schade, dass du krank geworden bist. Ich bin am Samstag zu Hause geblieben und habe die Wohnung geputzt. Am Nachmittag habe ich meine Schwester besucht. Wir haben Kuchen gegessen und einen Film gesehen. Am Sonntag bin ich mit dem Fahrrad an den See gefahren. Gute Besserung und viele Grüße, Lena", warum: "Kontrollieren Sie am Ende: Steht das Partizip immer am Satzende? *Ich habe die Wohnung geputzt.*" }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "L05",
    gruppe: "uebungen",
    stufe: 1,
    title: "Schilder und Notizen",
    subtitle: "Signs, opening hours and a note on the table",
    focus: "Öffnungszeiten lesen, kurze Mitteilungen verstehen",
    intro:
      "This is the kind of German you have to read fastest in real life: a sign on a door, a price list, a note somebody left you. There is no story here and no translation panel — read each box, then answer. Look especially at the opening times and the small print.",
    schilder: [
      { nr: "A", zeilen: ["*Bäckerei Sommer*", "Mo – Fr  6.00 – 18.30", "Sa  6.00 – 13.00", "Sonntag geschlossen"] },
      { nr: "B", zeilen: ["*Achtung!*", "Aufzug außer Betrieb.", "Bitte benutzen Sie die Treppe.", "Wir reparieren ihn am Montag."] },
      { nr: "C", zeilen: ["*Arztpraxis Dr. Neumann*", "Sprechstunde nur mit Termin", "Mo, Di, Do  8.00 – 12.00", "Mi  14.00 – 18.00", "Telefon: 0421 55 88 90"] },
      { nr: "D", zeilen: ["*Schwimmbad Nordpark*", "Kinder unter 6 Jahren frei", "Kinder 6 – 14 Jahre  2,50 €", "Erwachsene  4,50 €", "Letzter Einlass: 20.00 Uhr"] },
      { nr: "E", zeilen: ["*Notiz*", "Lena, ich bin einkaufen.", "Das Essen steht im Kühlschrank.", "Bitte füttere um 18 Uhr den Hund!", "Mama"] },
      { nr: "F", zeilen: ["*Café Blum*", "Wegen Renovierung bleibt unser Café", "vom 3. bis 14. März geschlossen.", "Ab 15. März sind wir wieder für Sie da!"] }
    ],
    wortschatz: [
      ["geschlossen", "closed"],
      ["außer Betrieb", "out of order"],
      ["die Treppe, -n", "stairs"],
      ["die Sprechstunde, -n", "consulting hours, surgery"],
      ["der Termin, -e", "appointment"],
      ["der Erwachsene, -n", "adult"],
      ["der Einlass", "admission, entry"],
      ["füttern", "to feed (an animal)"],
      ["wegen", "because of"],
      ["die Renovierung, -en", "refurbishment"],
      ["ab", "from (a date) onwards"]
    ],
    aufgaben: [
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Schild A: Die Bäckerei hat am Sonntag geöffnet.", antwort: false, warum: "„Sonntag geschlossen.“" },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Schild A: Am Samstag kann man um 14 Uhr Brot kaufen.", antwort: false, warum: "Samstags ist nur bis 13.00 Uhr geöffnet." },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Schild B: Man muss die Treppe benutzen.", antwort: true },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Schild C: Man kann ohne Termin zum Arzt gehen.", antwort: false, warum: "„Sprechstunde nur mit Termin.“" },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Schild C: Am Mittwochvormittag ist die Praxis geöffnet.", antwort: false, warum: "Mittwoch ist nur nachmittags offen: 14.00 – 18.00." },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Schild D: Ein Kind von vier Jahren bezahlt nichts.", antwort: true, warum: "„Kinder unter 6 Jahren frei.“" },
      { teil: "Teil 1 — Richtig oder falsch?", typ: "rf", frage: "Schild F: Das Café ist am 10. März geöffnet.", antwort: false, warum: "Es ist vom 3. bis 14. März geschlossen." },

      { teil: "Teil 2 — Wählen Sie die richtige Antwort.", typ: "mc", frage: "Sie möchten am Mittwoch um 9 Uhr Brötchen kaufen. Wohin gehen Sie?", optionen: ["Zu A", "Zu C", "Zu D", "Zu F"], antwort: 0 },
      { teil: "Teil 2 — Wählen Sie die richtige Antwort.", typ: "mc", frage: "Eine Familie mit zwei Erwachsenen und einem Kind (8 Jahre) geht schwimmen. Was bezahlt sie zusammen?", optionen: ["9,00 €", "11,50 €", "13,50 €", "7,00 €"], antwort: 1, warum: "2 × 4,50 € + 1 × 2,50 € = 11,50 €." },
      { teil: "Teil 2 — Wählen Sie die richtige Antwort.", typ: "mc", frage: "Sie kommen um 20.15 Uhr zum Schwimmbad. Was passiert?", optionen: ["Sie bezahlen mehr.", "Sie dürfen nicht mehr hinein.", "Sie bezahlen nichts.", "Sie müssen einen Termin machen."], antwort: 1, warum: "„Letzter Einlass: 20.00 Uhr“ — danach kommt niemand mehr hinein." },
      { teil: "Teil 2 — Wählen Sie die richtige Antwort.", typ: "mc", frage: "Was soll Lena machen?", optionen: ["Einkaufen gehen", "Das Essen kochen", "Den Hund füttern", "Mama anrufen"], antwort: 2 },
      { teil: "Teil 2 — Wählen Sie die richtige Antwort.", typ: "mc", frage: "Ab wann ist das Café Blum wieder offen?", optionen: ["Ab dem 3. März", "Ab dem 14. März", "Ab dem 15. März", "Ab dem 1. April"], antwort: 2 },

      { teil: "Teil 3 — Ergänzen Sie.", typ: "luecke", frage: "Schild C: Wie viele Tage pro Woche hat die Praxis Sprechstunde? Antworten Sie mit einer Zahl.", antwort: ["4", "vier"], warum: "Montag, Dienstag, Mittwoch und Donnerstag — also vier Tage." },
      { teil: "Teil 3 — Ergänzen Sie.", typ: "luecke", frage: "Schild B: Wann wird der Aufzug repariert?", antwort: ["am montag", "montag"] },
      { teil: "Teil 3 — Ergänzen Sie.", typ: "luecke", frage: "Wie sagt man auf Deutsch „out of order“? Schreiben Sie die zwei Wörter vom Schild.", antwort: ["außer betrieb", "ausser betrieb"] },

      { teil: "Teil 4 — Schreiben Sie selbst.", typ: "frei", frage: "Schreiben Sie eine kurze Notiz (3 Sätze) für Ihren Mitbewohner: Sie sind beim Arzt, kommen um 17 Uhr zurück, und er soll das Paket von der Nachbarin holen.", muster: "Hallo Sami, ich bin beim Arzt. Ich komme um 17 Uhr zurück. Bitte hol das Paket von Frau Klein! Bis später, Jonas", warum: "Eine Notiz ist kurz: kein „Sehr geehrte“, kein langer Schluss. Ein Imperativ mit *bitte* reicht." }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: "L06",
    gruppe: "uebungen",
    stufe: 2,
    title: "Kleinanzeigen",
    subtitle: "Small ads — find the right one",
    focus: "Anzeigen verstehen, Details vergleichen, Abkürzungen",
    intro:
      "Small ads squeeze everything into as few words as possible, so they are full of abbreviations: *Zi.* for Zimmer, *NR* for Nichtraucher, *VB* for Verhandlungsbasis. Each task gives you a person with a need. Decide which advert fits them. Careful — one detail is usually wrong in the tempting answer.",
    schilder: [
      { nr: "A", zeilen: ["*Zimmer in WG frei*", "18 m², möbliert, ab 1. Mai", "320 € warm, NR bevorzugt", "Nähe Universität", "Tel. 0176 22 44 88"] },
      { nr: "B", zeilen: ["*2-Zi.-Wohnung*", "55 m², Balkon, 2. Stock", "690 € warm, ab sofort", "Keine Haustiere!", "Tel. 0421 77 31 05"] },
      { nr: "C", zeilen: ["*Fahrrad zu verkaufen*", "Damenrad, 7 Gänge, blau", "wenig gefahren, 95 € VB", "Abholung in Bremen-Nord"] },
      { nr: "D", zeilen: ["*Deutschkurs A1/A2*", "Kleine Gruppen, max. 8 Personen", "Di + Do  18.00 – 19.30", "80 € pro Monat", "Erste Stunde kostenlos!"] },
      { nr: "E", zeilen: ["*Suche Nachhilfe*", "für meinen Sohn (14), Mathematik", "1× pro Woche, nachmittags", "15 € pro Stunde", "Nur in Bremen-Mitte"] },
      { nr: "F", zeilen: ["*Sofa zu verschenken*", "3 Sitze, grau, gut erhalten", "Muss bis Sonntag abgeholt werden.", "Nur Selbstabholer!"] }
    ],
    wortschatz: [
      ["die WG (Wohngemeinschaft)", "shared flat"],
      ["möbliert", "furnished"],
      ["NR (Nichtraucher)", "non-smoker"],
      ["bevorzugt", "preferred"],
      ["ab sofort", "available immediately"],
      ["das Haustier, -e", "pet"],
      ["der Gang, ¨-e", "gear (on a bike)"],
      ["VB (Verhandlungsbasis)", "price negotiable"],
      ["die Abholung", "collection, pick-up"],
      ["kostenlos", "free of charge"],
      ["die Nachhilfe", "private tuition"],
      ["zu verschenken", "free to a good home"],
      ["gut erhalten", "in good condition"],
      ["der Selbstabholer, -", "buyer collects in person"]
    ],
    aufgaben: [
      { teil: "Teil 1 — Welche Anzeige passt?", typ: "mc", frage: "Yusuf ist Student, raucht nicht und sucht ab Mai ein günstiges Zimmer in der Nähe der Uni.", optionen: ["A", "B", "D", "Keine Anzeige passt."], antwort: 0 },
      { teil: "Teil 1 — Welche Anzeige passt?", typ: "mc", frage: "Familie Bauer sucht eine Wohnung mit Balkon. Sie haben einen kleinen Hund.", optionen: ["A", "B", "B und A", "Keine Anzeige passt."], antwort: 3, warum: "Anzeige B hat zwar einen Balkon, aber dort steht: „Keine Haustiere!“ — mit Hund passt sie nicht." },
      { teil: "Teil 1 — Welche Anzeige passt?", typ: "mc", frage: "Frau Klein möchte Deutsch lernen, hat aber nur abends Zeit und wenig Geld. Sie möchte den Kurs zuerst testen.", optionen: ["A", "D", "E", "Keine Anzeige passt."], antwort: 1, warum: "Der Kurs ist abends (18.00 – 19.30) und die erste Stunde ist kostenlos." },
      { teil: "Teil 1 — Welche Anzeige passt?", typ: "mc", frage: "Martin hat kein Auto und sucht ein günstiges Sofa.", optionen: ["C", "F", "B", "Keine Anzeige passt."], antwort: 3, warum: "Das Sofa ist gratis, aber „Nur Selbstabholer!“ — ohne Auto kann Martin ein Dreisitzer-Sofa nicht abholen." },
      { teil: "Teil 1 — Welche Anzeige passt?", typ: "mc", frage: "Eine Studentin sucht einen Nebenjob am Nachmittag und ist gut in Mathematik.", optionen: ["D", "E", "A", "Keine Anzeige passt."], antwort: 1 },

      { teil: "Teil 2 — Details vergleichen", typ: "rf", frage: "Anzeige A: Das Zimmer ist nicht möbliert.", antwort: false, warum: "Im Text steht ausdrücklich „möbliert“." },
      { teil: "Teil 2 — Details vergleichen", typ: "rf", frage: "Anzeige B: Die Wohnung ist sofort frei.", antwort: true, warum: "„ab sofort“ heißt: ab heute." },
      { teil: "Teil 2 — Details vergleichen", typ: "rf", frage: "Anzeige C: Der Preis ist fest.", antwort: false, warum: "„95 € VB“ — VB heißt Verhandlungsbasis, man kann also über den Preis sprechen." },
      { teil: "Teil 2 — Details vergleichen", typ: "rf", frage: "Anzeige D: In dem Kurs sind höchstens acht Personen.", antwort: true },
      { teil: "Teil 2 — Details vergleichen", typ: "rf", frage: "Anzeige F: Man kann das Sofa nächsten Monat abholen.", antwort: false, warum: "Es muss bis Sonntag abgeholt werden." },

      { teil: "Teil 3 — Abkürzungen", typ: "luecke", frage: "Was bedeutet die Abkürzung *WG*? Schreiben Sie das ganze Wort.", antwort: ["wohngemeinschaft", "die wohngemeinschaft"] },
      { teil: "Teil 3 — Abkürzungen", typ: "luecke", frage: "Was bedeutet *NR* in Anzeige A? Schreiben Sie das ganze Wort.", antwort: ["nichtraucher"] },
      { teil: "Teil 3 — Abkürzungen", typ: "luecke", frage: "Wie viel kostet der Deutschkurs im Monat? Antworten Sie mit einer Zahl.", antwort: ["80", "80 euro", "80 €"] },
      { teil: "Teil 3 — Abkürzungen", typ: "mc", frage: "Was heißt „zu verschenken“?", optionen: ["Sehr teuer", "Man bekommt es gratis", "Man kann es mieten", "Man muss es reparieren"], antwort: 1 },

      { teil: "Teil 4 — Schreiben Sie selbst.", typ: "frei", frage: "Sie interessieren sich für das Zimmer in Anzeige A. Schreiben Sie eine kurze E-Mail (4 – 5 Sätze): Stellen Sie sich vor, fragen Sie, ob das Zimmer noch frei ist, und schlagen Sie einen Termin vor.", muster: "Guten Tag, mein Name ist Amina Sow und ich studiere Informatik an der Universität Bremen. Ich habe Ihre Anzeige gelesen und interessiere mich sehr für das Zimmer. Ist es ab dem 1. Mai noch frei? Ich rauche nicht und bin sehr ruhig. Kann ich das Zimmer vielleicht am Samstagnachmittag ansehen? Mit freundlichen Grüßen, Amina Sow", warum: "An eine fremde Person schreibt man *Sie* und benutzt „Guten Tag“ und „Mit freundlichen Grüßen“." }
    ]
  }

];

var LESEN_GRUPPEN = [
  {
    key: "geschichten",
    titel: "Lesegeschichten",
    unter: "Reading stories",
    text: "Longer texts to read for understanding. Each one comes with a Wortschatz list and a full English translation you can open — but read the German first and only check afterwards."
  },
  {
    key: "uebungen",
    titel: "Leseübungen",
    unter: "Reading tasks",
    text: "Short, real-world German: signs, opening hours, notes and small ads. No translation here on purpose — this is the reading you have to do quickly and without help."
  }
];
