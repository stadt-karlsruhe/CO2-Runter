# Co2 Runter Frontend

Dieses Projekt ist ein Neuentwicklung des Co2 Runter Webseiten Projekts mit der Verwendung von modernen
Frontend-Technologien.

## Technologien

Das Projekt verwendet folgende Technologien:

- Vue 3: Ein progressives Framework zum Erstellen von Benutzeroberflächen.
- Vuetify: Ein Material Design Komponenten-Framework für Vue.js.
- Pinia: Zustandsverwaltung für Vue.

## Ordnerstruktur

Die Ordnerstruktur des Projekts ist wie folgt organisiert:

- `src`: Der Hauptordner, der den Quellcode unserer Anwendung enthält.
    - `components`: Hier werden alle Vue-Komponenten gespeichert.
    - `store`: Dieser Ordner enthält die Pinia Store-Dateien.
    - `routes`: Dieser Ordner enthält die Vue Router-Routendefinitionen.
    - `types`: Enthält TypeScript-Deklarationen und -Schnittstellen.
    - `plugins`: Enthält benutzerdefinierte Vue-Plugins.
    - `layouts`: Enthält Layout-Komponenten, die auf mehreren Seiten wiederverwendet werden können.
    - `constants`: Enthält Konstanten, die in der gesamten Anwendung verwendet werden.
    - `composables`: Enthält wiederverwendbare Funktionen, auch bekannt als Composables, für die Vue-Composition-API.
    - `assets`: Enthält statische Ressourcen wie Bilder, Schriftarten und Stylesheets.
- `public`: Enthält statische Assets und das Einstiegspunkt-HTML-Datei.
- `node_modules`: Hier werden die von npm installierten Abhängigkeiten gespeichert.

## Entwurfsentscheidungen

- Vue 3 wurde aufgrund seiner progressiven Natur gewählt, d.h. es kann in bestehende Projekte eingefügt werden und
  skaliert gut für große Anwendungen. Zudem spielt die Composition API von Vue 3 eine entscheidende Rolle bei der
  Verbesserung der Code-Komposabilität und Wiederverwendbarkeit.

- Vuetify wurde als UI-Bibliothek gewählt, da es eine Vielzahl vordefinierter, stylischer und funktionaler Komponenten
  bietet. Dies hilft nicht nur dabei, viel Entwicklungszeit zu sparen, sondern gewährleistet auch die UI-Konsistenz über
  die gesamte Anwendung hinweg.

- Pinia wurde als Zustandsverwaltungslösung gewählt wegen seiner hervorragenden Integration und Optimierung mit Vue 3,
  seiner Einfachheit und seines intuitiven APIs, die es zu einer ausgezeichneten Wahl für diesen Anwendungsfall machen.

- TypeScript wurde verwendet, um ein stärker typisiertes Umfeld zu schaffen, was hilft, Fehler besser zu vermeiden und
  Code-Intelligenz zu verbessern.

- Der Einsatz von Vue Router ermöglicht das Erstellen von Single Page Applications (SPA). Es erlaubt die Navigation
  zwischen den Seiten, ohne dass eine vollständige Aktualisierung der Seite erforderlich ist, was zu einer verbesserten
  Benutzererfahrung führt.

- Das Projekt hat eine strikte Ordnerstruktur, um die Klarheit und Verständlichkeit des Codes zu verbessern. Jeder
  Ordner hat einen spezifischen Zweck und der Code ist entsprechend organisiert.

- Die Verwendung von Composables in Vue 3 ermöglicht eine bessere Logik-Wiederverwendung und -Organisation, im Vergleich
  zur traditionellen Options-API.

- Die Verwendung von npm ermöglicht eine robuste und zuverlässige Paketverwaltung, einschließlich der Verwaltung von
  Abhängigkeiten und Skripten.