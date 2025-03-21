const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const Question = require('./models/question');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());
app.use('/', routes); //route für fragen und members

// Verbinde mit MongoDB
mongoose.connect(process.env.DB_CONNECTION, { dbName: process.env.DATABASE });

const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err);
});
db.once('open', () => {
  console.log('connected to DB');
});

async function seedDatabase() {
  const count = await Question.countDocuments();
  if (count === 0) {
    console.log('🌱 Seeding der Datenbank...');
    await Question.insertMany([
      {
        _id: ObjectId('67d2d0e31e7eb56d11149be3'),
        question: 'Welches HTML-Element wird für Hyperlinks verwendet?',
        options: [ '<link>', '<href>', '<url>', '<a>' ],
        correctAnswer: '<a>',
        explanation: 'Das <a>-Element erstellt Hyperlinks und wird mit dem href-Attribut verwendet.\n' +
          '\n' +
          'Beispiel:\n' +
          '<a href="https://www.htw-berlin.de">HTW Berlin</a>',
        category: 'HTML'
      },
      {
        _id: ObjectId('67d2d0e31e7eb56d11149be4'),
        question: 'Was ist der Unterschied zwischen GET und POST in HTTP?',
        options: [
          'GET sendet Daten im Body, POST sendet Daten in der URL',
          'GET ist sicherer als POST',
          'GET überträgt Daten in der URL, POST im Body',
          'POST kann keine Daten an den Server senden'
        ],
        correctAnswer: 'GET überträgt Daten in der URL, POST im Body',
        explanation: 'GET überträgt Daten in der URL, während POST sie im Body der HTTP-Anfrage versteckt.',
        category: 'HTML'
      },
      {
        _id: ObjectId('67d327a141486c2368e94344'),
        question: 'Wofür wird CSS verwendet?',
        options: [
          'Um den HTML-Code zu debuggen',
          'Um das Design und Layout von Webseiten zu definieren',
          'Um eine Webseite zu programmieren',
          'Um Datenbanken mit Webseiten zu verbinden'
        ],
        correctAnswer: 'Um das Design und Layout von Webseiten zu definieren',
        explanation: '',
        category: 'CSS'
      },
      {
        _id: ObjectId('67d327a141486c2368e94345'),
        question: 'Welches CSS-Selektorzeichen wird für Klassen verwendet?',
        options: [ '. (Punkt)', '# (Raute)', ': (Doppelpunkt)', '* (Stern)' ],
        correctAnswer: '. (Punkt)',
        explanation: 'In CSS wird das Punktzeichen (.) verwendet, um Klassen zu selektieren.',
        category: 'CSS'
      },
      {
        _id: ObjectId('67d327a141486c2368e94346'),
        question: 'Welche der folgenden Aussagen über das Box-Modell ist richtig?',
        options: [
          'Es besteht nur aus margin und padding',
          'Es beschreibt, wie Elemente mit display: flex ausgerichtet werden',
          'Es definiert die Struktur eines HTML-Elements mit content, padding, border und margin',
          'Es ist nur für Tabellen-Elemente relevant'
        ],
        correctAnswer: 'Es definiert die Struktur eines HTML-Elements mit content, padding, border und margin',
        explanation: 'Das Box Model besagt, dass alle HTML-Elemente als eine rechteckige "Box" verstanden werden können und diese Box aus dem Inhalt, padding, border und margin besteht. Siehe hier:\n' +
          'https://freiheit.f4.htw-berlin.de/webtech/files/50_boxmodel.png\n',
        category: 'CSS'
      },
      {
        _id: ObjectId('67d327a141486c2368e94347'),
        question: 'Welche CSS-Eigenschaft macht ein Element vollständig unsichtbar und entfernt es aus dem Layoutfluss?',
        options: [
          'visibility: hidden;',
          'opacity: 0;',
          'display: none;',
          'z-index: -1;'
        ],
        correctAnswer: 'display: none;',
        explanation: 'Die Eigenschaft `display: none;` entfernt das Element vollständig aus dem Layoutfluss.Dieses Element nimmt dann im Viewport, also dem sichtbaren Bereich der Webseite, keinen Platz ein (im Gegensatz zu einem Element, das mithilfe von visibility: hidden; auf unsichtbar gesetzt wird). ',
        category: 'CSS'
      },
      {
        _id: ObjectId('67d327a141486c2368e94348'),
        question: 'Wie definiert man eine Grid-Struktur mit drei gleichbreiten Spalten?',
        options: [
          'display: flex; flex-direction: column;',
          'display: grid; grid-template-columns: repeat(3, 1fr);',
          'display: table; table-layout: fixed;',
          'display: inline-block; width: 33%;'
        ],
        correctAnswer: 'display: grid; grid-template-columns: repeat(3, 1fr);',
        explanation: 'Mit grid-template-columns: repeat(3, 1fr); werden die Spalten definiert. Hier werden 3 Spalten festgelegt und jede dieser Spalten hat die gleiche Breite',
        category: 'CSS'
      },
      {
        _id: ObjectId('67dc169c64dc45467e45e70f'),
        questions: 'Was gehört in den <head> Bereich einer HTML-Seite?',
        options: [
          'Der sichtbare Inhalt der Webseite',
          'Metadaten, CSS-Links, Skripte',
          'Nur JavaScript-Dateien',
          'Tabellen und Formulare'
        ],
        correctAnswer: 'Metadaten, CSS-Links, Skripte',
        explanation: 'Der <head>-Bereich enthält Metadaten, CSS-Styles, Scripts und andere wichtige Informationen, die nicht direkt auf der Seite sichtbar sind.\n' +
          '\n' +
          'Beispiel:\n' +
          '<head>\n' +
          '    <meta charset="UTF-8">\n' +
          '    <title>Meine Webseite</title>\n' +
          '    <link rel="stylesheet" href="styles.css">\n' +
          '</head>',
        category: 'HTML',
        question: 'Was gehört in den <head>Bereich einer HTML-Seite?'
      },
      {
        _id: ObjectId('67dc169c64dc45467e45e710'),
        questions: 'Welches dieser HTML-Elemente ist ein Inline-Element?',
        options: [ '<p>', '<div>', '<span>', '<section>' ],
        correctAnswer: '<span>',
        explanation: 'Inline-Elemente nehmen nur die Breite des Inhalts ein und stehen in einer Zeile.\n' +
          '\n' +
          'Beispiel für <span>:\n' +
          '<p>Dies ist <span style="color: red;">roter Text</span> in einem Absatz.</p>',
        category: 'HTML',
        question: 'Welches dieser HTML-Elemente ist ein Inline-Element?'
      },
      {
        _id: ObjectId('67dc21d8d0872d24b5fab251'),
        question: 'Was bedeutet HTML?',
        options: [
          'HyperText Management Language',
          'HyperText Transfer Protocol',
          'HyperText Markup Language',
          'HyperText Transfer Must Language'
        ],
        category: 'HTML',
        __v: 0,
        correctAnswer: 'HyperText Markup Language',
        explanation: 'HTML ist eine sogenannte Auszeichnungssprache. Das bedeutet, dass Textelementen sogenannte Tags (HTML-Elemente) zugeordnet werden, um dem Text, der von einem solchen Tag umschlossen wird, eine Bedeutung zuzuweisen - der Text wird ausgezeichnet.'
      },
      {
        _id: ObjectId('67dc504e64dc45467e45e711'),
        question: "Was bedeutet 'Responsive Web Design'?",
        options: [
          'Webseiten werden in einer bestimmten Bildschirmgröße fest programmiert',
          'Webseiten reagieren auf verschiedene Bildschirmgrößen und passen ihr Layout an',
          'Webseiten verwenden keine CSS-Styles',
          'Webseiten benötigen immer eine extra mobile Version'
        ],
        correctAnswer: 'Webseiten reagieren auf verschiedene Bildschirmgrößen und passen ihr Layout an',
        explanation: 'Responsive Web Design (RWD) sorgt dafür, dass sich das Layout einer Webseite automatisch an verschiedene Bildschirmgrößen anpasst. Das bedeutet, dass sie auf Mobilgeräten, Tablets und Desktop-Computern gut lesbar und benutzbar ist.',
        category: 'CSS'
      },
      {
        _id: ObjectId('67dc504e64dc45467e45e712'),
        question: "Wofür wird das Meta-Tag <meta name='viewport' content='width=device-width, initial-scale=1'> verwendet?",
        options: [
          'Um den Zoom-Faktor einer Webseite zu deaktivieren',
          'Um dem Browser mitzuteilen, dass die Webseite auf die Größe des Viewports reagieren soll',
          'Um die Hintergrundfarbe einer Webseite zu setzen',
          'Um eine Webseite im Fullscreen-Modus zu starten'
        ],
        correctAnswer: 'Um dem Browser mitzuteilen, dass die Webseite auf die Größe des Viewports reagieren soll',
        explanation: 'Das Viewport-Meta-Tag stellt sicher, dass der Browser die tatsächliche Breite des Geräts verwendet und das Layout der Webseite nicht skaliert.',
        category: 'CSS'
      },
      {
        _id: ObjectId('67dc504e64dc45467e45e713'),
        question: 'Welche CSS-Regel wird für Media Queries verwendet?',
        options: [ '@query', '@media', '@responsive', '@screen' ],
        correctAnswer: '@media',
        explanation: 'Media Queries verwenden das @media-Attribut, um CSS-Stile abhängig von der Bildschirmgröße oder anderen Geräte-Eigenschaften anzuwenden.',
        category: 'CSS'
      },
      {
        _id: ObjectId('67dc504e64dc45467e45e714'),
        question: 'Welche der folgenden Media Queries wendet eine CSS-Regel nur für Bildschirme an, die breiter als 800px sind?',
        options: [
          '@media screen and (min-width: 800px) { ... }',
          '@media only screen { min-width: 800px }',
          '@media print and (min-width: 800px) { ... }',
          '@media (max-width: 800px) { ... }'
        ],
        correctAnswer: '@media screen and (min-width: 800px) { ... }',
        explanation: 'Diese Media Query sorgt dafür, dass die Stile nur angewendet werden, wenn die Bildschirmbreite mindestens 800px beträgt.',
        category: 'CSS'
      },
      {
        _id: ObjectId('67dc504e64dc45467e45e715'),
        question: 'Welche Aussage über das CSS-Grid-System ist richtig?',
        options: [
          'CSS Grid kann nur für zweispaltige Layouts verwendet werden',
          'CSS Grid erlaubt es, sowohl Zeilen als auch Spalten flexibel zu definieren',
          'CSS Grid ist nur in Kombination mit Bootstrap nutzbar',
          'CSS Grid ersetzt vollständig Media Queries'
        ],
        correctAnswer: 'CSS Grid erlaubt es, sowohl Zeilen als auch Spalten flexibel zu definieren',
        explanation: 'CSS Grid ist ein leistungsstarkes Layout-Tool, das sowohl Zeilen als auch Spalten flexibel anpassen kann.',
        category: 'CSS'
      },
      {
        _id: ObjectId('67dc508464dc45467e45e716'),
        question: 'Wofür wird das Document Object Model (DOM) in JavaScript verwendet?',
        options: [
          'Um HTML-Code in JavaScript zu schreiben',
          'Um HTML-Dokumente zu strukturieren, zu verändern und zu manipulieren',
          'Um CSS-Stylesheets in JavaScript zu definieren',
          'Um neue JavaScript-Variablen zu erstellen'
        ],
        correctAnswer: 'Um HTML-Dokumente zu strukturieren, zu verändern und zu manipulieren',
        explanation: 'Das DOM (Document Object Model) ist die Schnittstelle zwischen JavaScript und HTML/CSS. Es erlaubt es, HTML-Elemente zu ändern, hinzuzufügen und zu löschen.\n' +
          '\n' +
          'Siehe visuelles Beispiel für einen Baum:\n' +
          'https://freiheit.f4.htw-berlin.de/webtech/files/70_dom_1.png\n' +
          '\n' +
          ' Einen solchen Baum, der ein HTML-Dokument eindeutig repräsentiert, nennen wir Document Object Model (DOM) (auch HTML-DOM). Ein solcher DOM ist der Ausgangspunkt für die Manipulation des HTML-Dokumentes, denn JavaScript ist in der Lage, jeden beliebigen Knoten innerhalb dieses Baumes anzusprechen und bspw. zu ändern oder zu löschen. Außerdem kann auch jede beliebige Position eindeutig bestimmt werden, um z.B. ein Element hinzuzufügen.',
        category: 'JavaScript'
      },
      {
        _id: ObjectId('67dc508464dc45467e45e717'),
        question: 'Welche Funktion wird verwendet, um ein Element anhand seiner ID zu selektieren?',
        options: [
          'document.getElementsByClassName()',
          'document.querySelectorAll()',
          'document.getElementById()',
          'document.getElementsByTagName()'
        ],
        correctAnswer: 'document.getElementById()',
        explanation: "Die Methode document.getElementById('id') gibt das HTML-Element mit der angegebenen ID zurück.",
        category: 'JavaScript'
      },
      {
        _id: ObjectId('67dc508464dc45467e45e718'),
        question: 'Was bewirkt das addEventListener() Kommando in JavaScript?',
        options: [
          'Es erstellt ein neues HTML-Element',
          'Es registriert eine Funktion als Reaktion auf ein Ereignis',
          'Es löscht ein vorhandenes Element im DOM',
          'Es verändert das CSS-Layout der Webseite'
        ],
        correctAnswer: 'Es registriert eine Funktion als Reaktion auf ein Ereignis',
        explanation: 'Mit addEventListener() kann man JavaScript-Funktionen an Ereignisse wie Klicks, Mausbewegungen oder Tastatureingaben binden.',
        category: 'JavaScript'
      },
      {
        _id: ObjectId('67dc508464dc45467e45e719'),
        question: 'Wie wird in JavaScript ein neues HTML-Element erstellt und hinzugefügt?',
        options: [
          "document.createElement('div')",
          "document.addNode('div')",
          "document.newElement('div')",
          "document.insert('div')"
        ],
        correctAnswer: "document.createElement('div')",
        explanation: "Um ein neues HTML-Element zu erstellen, verwendet man document.createElement('tag'). Danach kann man es mit appendChild() zur Seite hinzufügen.",
        category: 'JavaScript'
      },
      {
        _id: ObjectId('67dc508464dc45467e45e71a'),
        question: 'Welche Methode wird verwendet, um das letzte Element eines Arrays zu entfernen?',
        options: [
          'array.shift()',
          'array.pop()',
          'array.splice()',
          'array.removeLast()'
        ],
        correctAnswer: 'array.pop()',
        explanation: 'Die Methode pop() entfernt das letzte Element eines Arrays und gibt es zurück.',
        category: 'JavaScript'
      },
      {
        _id: ObjectId('67dc51b564dc45467e45e71b'),
        question: 'Wie kann man auf eine Eigenschaft eines JavaScript-Objekts zugreifen?',
        options: [
          'objekt->eigenschaft',
          'objekt.eigenschaft',
          'objekt[eigenschaft]',
          'Beide B und C sind korrekt'
        ],
        correctAnswer: 'objekt.eigenschaft',
        explanation: "Auf Eigenschaften eines Objekts kann mit der Punktnotation (objekt.eigenschaft) oder mit der Array-Notation (objekt['eigenschaft']) zugegriffen werden.",
        category: 'JavaScript'
      },
      {
        _id: ObjectId('67dc51b564dc45467e45e71c'),
        question: 'Was macht die Methode JSON.stringify() in JavaScript?',
        options: [
          'Sie konvertiert ein JSON-String in ein JavaScript-Objekt',
          'Sie konvertiert ein JavaScript-Objekt in einen JSON-String',
          'Sie löscht Eigenschaften aus einem Objekt',
          'Sie überprüft, ob ein Objekt ein gültiges JSON-Format hat'
        ],
        correctAnswer: 'Sie konvertiert ein JavaScript-Objekt in einen JSON-String',
        explanation: 'Die Methode JSON.stringify(objekt) wandelt ein JavaScript-Objekt in einen JSON-String um.Das ist wichtig, da Funktionen im JSON-Format nicht erlaubt sind.\n' +
          'Wenn man ein JavaScript-Objekt mit JSON.stringify() umwandelt, ergibt sich ein JSON. Es sind alle Schlüssel in " " eingefasst und Funktionen werden entfernt.',
        category: 'JavaScript'
      },
      {
        _id: ObjectId('67dc51b564dc45467e45e71d'),
        question: 'Was passiert, wenn man eine Funktion in einem JavaScript-Objekt mit JSON.stringify() konvertiert?',
        options: [
          'Die Funktion wird in den JSON-String übernommen',
          'Die Funktion wird ignoriert',
          'Die Funktion wird in einen String umgewandelt',
          'Es tritt ein Fehler auf'
        ],
        correctAnswer: 'Die Funktion wird ignoriert',
        explanation: 'Funktionen werden beim Konvertieren eines Objekts in JSON entfernt, weil JSON nur Datenstrukturen und keine Methoden speichert.\n',
        category: 'JavaScript'
      },
      {
        _id: ObjectId('67dc51b564dc45467e45e71e'),
        question: 'Wie kann man ein JSON-String in ein JavaScript-Objekt umwandeln?',
        options: [
          'JSON.toObject(jsonString)',
          'JSON.parse(jsonString)',
          'JSON.stringify(jsonString)',
          'JSON.convert(jsonString)'
        ],
        correctAnswer: 'JSON.parse(jsonString)',
        explanation: 'Mit JSON.parse(jsonString) kann ein JSON-String in ein JavaScript-Objekt umgewandelt werden.',
        category: 'JavaScript'
      },
      {
        _id: ObjectId('67dc51b564dc45467e45e71f'),
        question: 'Wozu dient der optionale Verkettungsoperator ? in JavaScript?',
        options: [
          'Er ersetzt den delete Operator',
          'Er erlaubt den Zugriff auf eine Eigenschaft, bei der nicht sicher ist, ob ein Wert für die Eigenschaft gesetzt ist.',
          'Er konvertiert ein Objekt in JSON',
          'Er entfernt Eigenschaften aus einem Objekt'
        ],
        correctAnswer: 'Er erlaubt den Zugriff auf tief verschachtelte Eigenschaften, ohne einen Fehler zu werfen',
        explanation: 'Der ?. -Operator vermeidet Fehlermeldungen, wenn eine Eigenschaft nicht existiert.\n' +
          'Die Idee dahinter ist, dass auf die Eigenschaft zugegriffen werden kann, wenn sie existiert und wenn sie einen Wert besitzt. Dieser Operator vermeidet Laufzeitfehler bzw. eine Abfrage auf Existenz.\n' +
          '\n' +
          'Beispiel:\n' +
          'person.adresse?.ort',
        category: 'JavaScript'
      },
      {
        _id: ObjectId('67dc524164dc45467e45e720'),
        question: 'Was ist der Hauptvorteil von Promises in JavaScript?',
        options: [
          'Sie ermöglichen eine synchrone Verarbeitung von asynchronem Code',
          'Sie verhindern Callbacks in JavaScript',
          'Sie ermöglichen eine strukturierte Fehlerbehandlung und Verkettung von asynchronen Operationen',
          'Sie machen JavaScript schneller'
        ],
        correctAnswer: 'Sie ermöglichen eine strukturierte Fehlerbehandlung und Verkettung von asynchronen Operationen',
        explanation: 'Ein Promise ist ein JavaScript-Objekt.  Es enthält einerseits den Code zum Erzeugen eines Promise-Objektes (producing code) und anderseits auch den Code zum Verarbeiten eines solchen Promise-Objektes (consuming code). Dabei können zwei Sachen verarbeitet werden:\n' +
          '\n' +
          'entweder das Promise-Objekt wurde erfolgreich abgearbeitet (resolve) oder\n' +
          'das Promise-Objekt wurde nicht erfolgreich abgearbeitet (reject). Promises ermöglichen eine strukturierte und übersichtliche Verarbeitung von asynchronem Code und verhindern das Callback-Hell-Problem.',
        category: 'JavaScript'
      },
      {
        _id: ObjectId('67dc524164dc45467e45e721'),
        question: 'Welche Methode wird verwendet, um einen Fehler in einem Promise abzufangen?',
        options: [ 'then()', 'reject()', 'catch()', 'errorHandler()' ],
        correctAnswer: 'catch()',
        explanation: 'Die catch()-Methode wird verwendet, um Fehler in einem Promise abzufangen. Sie wird aufgerufen, wenn das Promise reject() aufruft Also wenn ein Promise nicht in den fulfilled, sondern in den rejected- Zustand übergeht. In dem Fall wird also nicht der resolve Fall, sondern reject durchgeführt.',
        category: 'JavaScript'
      },
      {
        _id: ObjectId('67dc524164dc45467e45e722'),
        question: 'Wie ruft man eine API mit fetch() auf und verarbeitet die JSON-Antwort?',
        options: [
          'fetch(url).then(response => response.text())',
          'fetch(url).then(response => response.json())',
          'fetch(url).catch(response => response.json())',
          'fetch(url).finally(response => response.json())'
        ],
        correctAnswer: 'fetch(url).then(response => response.json())',
        explanation: 'Die Fetch API gibt ein Promise zurück. Die Methode response.json() konvertiert die Antwort in ein JavaScript-Objekt.Da wir an dem body eines JavaScript-Objekts interessiert sind, konvertieren wir das Objekt zunächst in das JSON-Format mithilfe response.json();. Die json()-Funktion ist eine Standard-JavaScript-Funktion, welche ein JavaScript-Objekt in einen JSON umwandelt. Die Funktion then() gibt selbst ein Promise-Objekt zurück.',
        category: 'JavaScript'
      },
      {
        _id: ObjectId('67dc524164dc45467e45e723'),
        question: 'Wie unterscheidet sich async/await von then()?',
        options: [
          'async/await blockiert den Hauptthread',
          'async/await macht den Code synchron',
          'async/await ist eine alternative, lesbare Schreibweise für Promises',
          'async/await ist schneller als then()'
        ],
        correctAnswer: 'async/await ist eine alternative, lesbare Schreibweise für Promises',
        explanation: 'Die Verkettung von .then()-Pfaden kann zu unübersichtlichem Code führen. Deshalb wurden die Schlüsselwörter async und await eingeführt.Generell ist die Verwendung von async/await oft übersichtlicher als then()-Verkettungen. Das Konzept async/await verliert etwas an Übersichtlichkeit, wenn Fehler abgefangen werden (dann im try/catch-Block).',
        category: 'JavaScript'
      },
      {
        _id: ObjectId('67dc524164dc45467e45e724'),
        question: 'Welche Methode wird für eine POST-Anfrage mit fetch() benötigt?',
        options: [
          "fetch(url, { method: 'POST', headers: {...}, body: ... })",
          'fetch.post(url, { data: ... })',
          'fetch(url).then(data => data.send())',
          'fetchPost(url, { body: ... })'
        ],
        correctAnswer: "fetch(url, { method: 'POST', headers: {...}, body: ... })",
        explanation: 'Für eine POST-Anfrage mit fetch() müssen wir die Methode explizit angeben sowie Header und Body definieren, also die Daten mitschicken. Wir geben an, dass wir ein JSON Format haben wollen mit:\n' +
          '{\n' +
          "    method: 'POST',\n" +
          '    headers: {\n' +
          "        'Content-Type': 'application/json',\n" +
          "        'Accept': 'application/json'\n" +
          '    },\n' +
          '    body: JSON.stringify({\n' +
          "        message: 'just a POST mirror'\n" +
          '    })\n' +
          '}\n',
        category: 'JavaScript'
      },
      {
        _id: ObjectId('67dc526664dc45467e45e725'),
        question: 'Was ist eine Single Page Application (SPA)?',
        options: [
          'Eine Anwendung mit mehreren Seiten, die separat geladen werden',
          'Eine Anwendung, bei der eine Seite geladen wird und Inhalte dynamisch aktualisiert werden',
          'Eine Anwendung, die nur auf einem einzelnen Gerät funktioniert',
          'Eine Anwendung ohne Benutzeroberfläche'
        ],
        correctAnswer: 'Eine Anwendung, bei der eine Seite geladen wird und Inhalte dynamisch aktualisiert werden',
        explanation: 'Eine SPA lädt einmal eine Seite und aktualisiert Inhalte dynamisch ohne Seitenreload.',
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc526664dc45467e45e726'),
        question: 'Welche Programmiersprache wird in Angular hauptsächlich verwendet?',
        options: [ 'JavaScript', 'TypeScript', 'Python', 'PHP' ],
        correctAnswer: 'TypeScript',
        explanation: 'Angular basiert hauptsächlich auf TypeScript, einer typsicheren Obermenge von JavaScript.',
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc526664dc45467e45e727'),
        question: 'Wie erzeugt man eine neue Angular-Komponente mit der CLI?',
        options: [
          'ng new component myComponent',
          'ng generate component myComponent',
          'create component myComponent',
          'ng add component myComponent'
        ],
        correctAnswer: 'ng generate component myComponent',
        explanation: "Mit dem Befehl 'ng generate component myComponent' erstellt die Angular CLI eine neue Komponente.",
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc526664dc45467e45e728'),
        question: 'Welches Angular-Element wird genutzt, um Routen-Inhalte anzuzeigen?',
        options: [
          '<angular-router>',
          '<router-link>',
          '<router-outlet>',
          '<ng-view>'
        ],
        correctAnswer: '<router-outlet>',
        explanation: '<router-outlet> ist der Platzhalter in Angular-Templates, um die aktuell aktive Route darzustellen.',
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc526664dc45467e45e729'),
        question: 'Was macht der @Component Decorator in einer Angular-Komponente?',
        options: [
          'Er definiert eine neue Route für die Anwendung',
          'Er macht eine Klasse zu einer Angular-Komponente und enthält Metadaten wie Template und Selektor',
          'Er importiert externe TypeScript-Dateien in die Komponente',
          'Er definiert ein CSS-Styling für die Komponente'
        ],
        correctAnswer: 'Er macht eine Klasse zu einer Angular-Komponente und enthält Metadaten wie Template und Selektor',
        explanation: 'Um eine Komponente der gesamten Anwendung als Komponente bekannt zu machen, wird der Decorator @Componentverwendet.',
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc529564dc45467e45e72a'),
        question: 'Wofür wird Interpolation (`{{ }}`) in Angular verwendet?',
        options: [
          'Um HTML-Attribute zu ändern',
          'Um TypeScript-Code in das HTML zu schreiben',
          'Um Werte aus der Komponente in das Template einzufügen',
          'Um Schleifen in Templates zu erstellen'
        ],
        correctAnswer: 'Um Werte aus der Komponente in das Template einzufügen',
        explanation: 'Interpolation `{{ }}` wird verwendet, um Daten aus der Komponente ins Template einzufügen.',
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc529564dc45467e45e72b'),
        question: 'Welche Schreibweise wird in Angular für Attributbindungen verwendet?',
        options: [
          '(property)="value"',
          '[property]="value"',
          '{{ property }}',
          '#property="value"'
        ],
        correctAnswer: '[property]="value"',
        explanation: 'In Angular wird für Attributbindungen die eckige Klammer-Syntax [property]="value" verwendet.',
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc529564dc45467e45e72c'),
        question: 'Was ist der Unterschied zwischen @if und @switch in Angular?',
        options: [
          '@if wird für bedingte Anweisungen verwendet, @switch für mehrere Auswahlmöglichkeiten',
          '@if ist für numerische Werte, @switch nur für Strings',
          '@if kann nicht verschachtelt werden, @switch kann',
          'Es gibt keinen Unterschied, beide sind identisch'
        ],
        correctAnswer: '@if wird für bedingte Anweisungen verwendet, @switch für mehrere Auswahlmöglichkeiten',
        explanation: '@if wird für einfache Bedingungen genutzt, @switch für die Auswahl zwischen mehreren Fällen.',
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc529564dc45467e45e72d'),
        question: 'Welche Pipe wird verwendet, um ein Datum in einem bestimmten Format darzustellen?',
        options: [ 'DatePipe', 'FormatPipe', 'TimePipe', 'DateFormatPipe' ],
        correctAnswer: 'DatePipe',
        explanation: 'Die DatePipe wird in Angular genutzt, um Datumswerte im gewünschten Format darzustellen.',
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc529564dc45467e45e72e'),
        question: 'Wie kann auf eine Elementreferenz (`#id`) in Angular zugegriffen werden?',
        options: [
          "document.getElementById('id')",
          'this.id.value in der Komponente',
          '{{ id.value }} direkt im Template',
          'id.getValue()'
        ],
        correctAnswer: '{{ id.value }} direkt im Template',
        explanation: 'Mit {{ id.value }} kann im Template direkt auf den Wert der Elementreferenz zugegriffen werden.',
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc52c264dc45467e45e72f'),
        question: 'Was ist der Hauptunterschied zwischen einer Single-Page-Applikation (SPA) und einer Multi-Page-Applikation (MPA)?',
        options: [
          'Eine SPA lädt alle Seiten vom Server, während eine MPA nur eine Seite lädt',
          'Eine MPA wird von JavaScript verwaltet, während eine SPA nur HTML nutzt',
          'Eine SPA bleibt auf einer einzigen Seite und lädt Inhalte dynamisch nach',
          'Eine MPA kann nur mit Angular verwendet werden'
        ],
        correctAnswer: 'Eine SPA bleibt auf einer einzigen Seite und lädt Inhalte dynamisch nach',
        explanation: 'Eine SPA lädt die Seite einmal und aktualisiert dann dynamisch die Inhalte, während eine MPA bei jedem Seitenwechsel die komplette Seite neu lädt.',
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc52c264dc45467e45e730'),
        question: 'Welche Direktive wird in Angular verwendet, um Routing-Links zu definieren?',
        options: [ 'href', 'routerLink', 'navigateTo', 'routePath' ],
        correctAnswer: 'routerLink',
        explanation: 'Mit der Direktive routerLink werden in Angular Links für die Navigation zwischen den Routen definiert.',
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc52c264dc45467e45e731'),
        question: 'Wie wird eine parametrisierte Route in Angular definiert?',
        options: [
          '{ path: "cities", component: CitiesComponent }',
          '{ path: "cities/:id", component: CitiesComponent }',
          '{ param: "cities/id", component: CitiesComponent }',
          '{ route: "cities/{id}", component: CitiesComponent }'
        ],
        correctAnswer: '{ path: "cities/:id", component: CitiesComponent }',
        explanation: "In Angular wird eine parametrisierte Route mit :id definiert, z.B. { path: 'cities/:id', component: CitiesComponent }.",
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc52c264dc45467e45e732'),
        question: 'Was ist der Zweck von Angular Guards (CanActivate)?',
        options: [
          'Sie verhindern unautorisierte Zugriffe auf Routen',
          'Sie sorgen für schnelleren Seitenwechsel',
          'Sie ermöglichen das Laden externer Komponenten',
          'Sie deaktivieren die Navigation'
        ],
        correctAnswer: 'Sie verhindern unautorisierte Zugriffe auf Routen',
        explanation: 'CanActivate-Guards verhindern, dass Benutzer ohne Berechtigung bestimmte Routen aufrufen können.',
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc52c264dc45467e45e733'),
        question: 'Wie wird ein Service in Angular als global verfügbar gemacht?',
        options: [
          "Durch das Hinzufügen von providedIn: 'root' im @Injectable() Dekorator",
          'Durch das direkte Einfügen in die app.component.ts',
          'Durch das Importieren in jede einzelne Komponente',
          'Durch das Laden über routerLink'
        ],
        correctAnswer: "Durch das Hinzufügen von providedIn: 'root' im @Injectable() Dekorator",
        explanation: "Mit providedIn: 'root' wird ein Angular Service als Singleton registriert und ist global verfügbar.",
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc541d64dc45467e45e734'),
        question: 'Wie können Daten in Angular von einer Elternkomponente an eine Kindkomponente übergeben werden?',
        options: [
          'Durch output()',
          'Durch input()',
          'Durch emit()',
          'Durch routerLink'
        ],
        correctAnswer: 'Durch input()',
        explanation: 'Daten werden von der Eltern- zur Kindkomponente mit @Input() dekorierten Eigenschaften übergeben.',
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc541d64dc45467e45e735'),
        question: 'Welche Funktion in Angular wird verwendet, um Ereignisse von der Kindkomponente an die Elternkomponente weiterzugeben?',
        options: [ 'emit()', 'output()', 'input()', 'notify()' ],
        correctAnswer: 'emit()',
        explanation: 'Mit emit() werden in Angular Ereignisse von der Kind- zur Elternkomponente gesendet.',
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc541d64dc45467e45e736'),
        question: 'Wie wird eine Variable in Angular als Signal definiert?',
        options: [
          'const mySignal: WritableSignal<number> = signal(0);',
          'const mySignal = new Signal(0);',
          'let mySignal = reactive(0);',
          'const mySignal = observe(0);'
        ],
        correctAnswer: 'const mySignal: WritableSignal<number> = signal(0);',
        explanation: 'Ein Signal ist ein Wrapper um einen beliebigen Wert, der alle Konsumenten über die Änderung des Wertes informiert. Es gibt schreibbare Signals (WritableSignal) und read-only Signals (Signal). ',
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc541d64dc45467e45e737'),
        question: 'Welche Methode wird genutzt, um den Wert eines Signals zu aktualisieren, basierend auf dem aktuellen Wert?',
        options: [
          'signal.set()',
          'signal.update(value => value + 1)',
          'signal.modify(value => value + 1)',
          'signal.refresh(value => value + 1)'
        ],
        correctAnswer: 'signal.update(value => value + 1)',
        explanation: 'Mit signal.update(callback) wird der Wert eines Signals basierend auf dem aktuellen Wert aktualisiert.',
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc541d64dc45467e45e738'),
        question: 'Warum sind Signals in Angular vorteilhaft?',
        options: [
          'Sie ermöglichen die sofortige Benachrichtigung bei Wertänderungen',
          'Sie sind langsamer als Observables',
          'Sie müssen manuell aktualisiert werden',
          'Sie können nur in der Kindkomponente verwendet werden'
        ],
        correctAnswer: 'Sie ermöglichen die sofortige Benachrichtigung bei Wertänderungen',
        explanation: '',
        category: 'Angular'
      },
      {
        _id: ObjectId('67dc542464dc45467e45e739'),
        question: 'Welche HTTP-Methode wird in einer REST-API für das Erstellen eines neuen Datensatzes verwendet?',
        options: [ 'GET', 'POST', 'PUT', 'DELETE' ],
        correctAnswer: 'POST',
        explanation: 'Die HTTP-Methode POST wird verwendet, um einen neuen Datensatz auf dem Server zu erstellen.',
        category: 'Backend'
      },
      {
        _id: ObjectId('67dc542464dc45467e45e73a'),
        question: 'Welche SQL-Anweisung wird verwendet, um alle Einträge aus einer PostgreSQL-Tabelle abzurufen?',
        options: [
          'INSERT INTO table_name VALUES (...)',
          'DELETE FROM table_name WHERE condition',
          'SELECT * FROM table_name',
          'UPDATE table_name SET column=value WHERE condition'
        ],
        correctAnswer: 'SELECT * FROM table_name',
        explanation: 'Die SELECT-Anweisung wird verwendet, um alle Daten aus einer PostgreSQL-Tabelle abzurufen.',
        category: 'Backend'
      },
      {
        _id: ObjectId('67dc542464dc45467e45e73b'),
        question: 'Welche Datei enthält typischerweise Umgebungsvariablen wie Datenbank-Zugangsdaten?',
        options: [ 'package.json', '.env', 'server.js', 'routes.js' ],
        correctAnswer: '.env',
        explanation: 'Die .env-Datei enthält sensible Umgebungsvariablen wie Datenbankzugänge und API-Keys.',
        category: 'Backend'
      },
      {
        _id: ObjectId('67dc542464dc45467e45e73c'),
        question: 'Wie lautet die richtige SQL-Anweisung, um einen Eintrag in der PostgreSQL-Datenbank zu aktualisieren?',
        options: [
          'MODIFY table_name SET column=value WHERE id=?',
          'UPDATE table_name SET column=value WHERE id=?',
          'CHANGE table_name SET column=value WHERE id=?',
          'ALTER table_name SET column=value WHERE id=?'
        ],
        correctAnswer: 'UPDATE table_name SET column=value WHERE id=?',
        explanation: 'Die UPDATE-Anweisung ändert bestehende Daten in einer PostgreSQL-Tabelle.',
        category: 'Backend'
      },
      {
        _id: ObjectId('67dc542464dc45467e45e73d'),
        question: 'Was ist die Aufgabe von CORS in einem Backend?',
        options: [
          'Es ermöglicht Cross-Origin-Anfragen zwischen verschiedenen Domains.',
          'Es schützt vor SQL-Injection-Angriffen.',
          'Es speichert Nutzer-Session-Informationen.',
          'Es blockiert alle eingehenden API-Anfragen.'
        ],
        correctAnswer: 'Es ermöglicht Cross-Origin-Anfragen zwischen verschiedenen Domains.',
        explanation: 'CORS (Cross-Origin Resource Sharing) erlaubt Web-Anwendungen, Ressourcen von einer anderen Domain anzufragen.',
        category: 'Backend'
      },
      {
        _id: ObjectId('67dc543264dc45467e45e73e'),
        question: 'Welche HTTP-Methode wird verwendet, um alle Datensätze vom Backend ins Frontend zu laden?',
        options: [ 'POST', 'DELETE', 'GET', 'PATCH' ],
        correctAnswer: 'GET',
        explanation: 'Die GET-Methode wird genutzt, um Daten vom Backend abzurufen.',
        category: 'FrontendAndBackend'
      },
      {
        _id: ObjectId('67dc543264dc45467e45e73f'),
        question: 'Welche Angular-Komponente ist für die Anzeige aller Datensätze in einer Tabelle zuständig?',
        options: [
          'CreateComponent',
          'TableComponent',
          'DetailComponent',
          'NavComponent'
        ],
        correctAnswer: 'TableComponent',
        explanation: 'Die TableComponent zeigt alle Datensätze in Tabellenform an.',
        category: 'FrontendAndBackend'
      },
      {
        _id: ObjectId('67dc543264dc45467e45e740'),
        question: 'Welche Datei wird verwendet, um Routen in einem Angular-Projekt zu definieren?',
        options: [
          'routes.js',
          'app.component.ts',
          'app.routes.ts',
          'router.config.json'
        ],
        correctAnswer: 'app.routes.ts',
        explanation: 'In der Datei app.routes.ts werden die Routen in Angular definiert.',
        category: 'FrontendAndBackend'
      },
      {
        _id: ObjectId('67dc543264dc45467e45e741'),
        question: 'Welche Angular-Funktion wird genutzt, um eine Backend-Anfrage mit fetch() in einem Service abzurufen?',
        options: [
          'setTimeout()',
          'async getAll()',
          'setInterval()',
          'promise.fetch()'
        ],
        correctAnswer: 'async getAll()',
        explanation: '',
        category: 'FrontendAndBackend'
      },
      {
        _id: ObjectId('67dc543264dc45467e45e742'),
        question: 'Was bewirkt die Methode patchValue() in Angular Reactive Forms?',
        options: [
          'Sie setzt Werte für alle Felder eines Formulars.',
          'Sie setzt Werte für einzelne Felder eines Formulars.',
          'Sie sendet das Formular automatisch ab.',
          'Sie aktualisiert das Formular im Backend.'
        ],
        correctAnswer: 'Sie setzt Werte für einzelne Felder eines Formulars.',
        explanation: 'Mit patchValue() können gezielt einzelne Formfelder befüllt werden.',
        category: 'FrontendAndBackend'
      },
      {
        _id: ObjectId('67dc543264dc45467e45e743'),
        question: 'Welcher der folgenden HTTP-Methoden-Endpunkte ist durch eine Admin-Berechtigung geschützt?',
        options: [
          'POST /user/register',
          'GET /user',
          'PUT /changepassword',
          'POST /user/login'
        ],
        correctAnswer: 'GET /user',
        explanation: 'Der GET /user-Endpunkt ist oft durch Admin-Rechte geschützt.',
        category: 'FrontendAndBackend'
      },
      {
        _id: ObjectId('67dc543264dc45467e45e744'),
        question: 'Welche Technologie wird zur Benutzer-Authentifizierung und Autorisierung in der REST-API verwendet?',
        options: [ 'OAuth 2.0', 'JSON Web Tokens (JWT)', 'Session-Cookies', 'LDAP' ],
        correctAnswer: 'JSON Web Tokens (JWT)',
        explanation: 'JWTs sind verbreitet zur sicheren Authentifizierung in REST-APIs.',
        category: 'FrontendAndBackend'
      },
      {
        _id: ObjectId('67dc543264dc45467e45e745'),
        question: 'Welche Funktion wird im AuthService verwendet, um den eingeloggten Benutzer und seinen JWT zu speichern?',
        options: [ 'storeUser()', 'saveToken()', 'setUser()', 'updateAuth()' ],
        correctAnswer: 'setUser()',
        explanation: 'Die Funktion setUser() speichert den Benutzer und das Token im AuthService.',
        category: 'FrontendAndBackend'
      },
      {
        _id: ObjectId('67dc543264dc45467e45e746'),
        question: 'Welche Angular-Technologie wird für die Verwaltung des Anmeldezustands (loggedIn und isAdmin) verwendet?',
        options: [ 'RxJS Observables', 'Signals', 'Local Storage', 'Redux' ],
        correctAnswer: 'Signals',
        explanation: 'Angular Signals verwalten reaktive Zustände wie loggedIn oder isAdmin.',
        category: 'FrontendAndBackend'
      },
      {
        _id: ObjectId('67dc543264dc45467e45e747'),
        question: 'Welche Angular-Funktion wird als Guard verwendet, um den Zugriff auf geschützte Routen zu kontrollieren?',
        options: [
          'CanEditGuard',
          'RouterProtectService',
          'CanActivateFn',
          'AuthInterceptor'
        ],
        correctAnswer: 'CanActivateFn',
        explanation: 'CanActivateFn ist die Angular-Funktion, um Routen per Guard abzusichern.',
        category: 'FrontendAndBackend'
      }
    ]);
    console.log('✅ Datenbank erfolgreich vorgespeist');
  } else {
    console.log('✅ Datenbank bereits gefüllt');
  }
}

// Starte den Server
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server started and listening on port ${PORT} ... `);
  }
});
