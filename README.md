# WebTech Wissensquiz

## Beschreibung der Anwendung

Das **WebTech Wissensquiz** ist eine interaktive Webanwendung zur Überprüfung und Festigung des Wissens rund um die Themen der Lehrveranstaltung *Web-Technologien*. Nutzer:innen können Fragen beantworten und ihr Wissen zu verschiedenen Themenbereichen testen:

- **HTML** – Grundlagen des Webs
- **CSS** – Styles und Layouts
- **JavaScript** – Interaktive Funktionen und Logik
- **Angular** – Entwicklung moderner Single Page Applications
- **Backend** – Datenbanken, Serverlogik und APIs
- **Frontend & Backend** 

Die Anwendung bietet sowohl eine Quiz-Ansicht als auch eine Verwaltungsoberfläche zum Erstellen, Bearbeiten und Löschen von Fragen.

### Screenshots
Platzhalter

---

## Installationsanleitung

### Voraussetzungen
- Node.js (empfohlen: Version 18+)
- Angular CLI (`npm install -g @angular/cli`)
- MongoDB (lokal oder als Cloud-Service)

### Installation
1. Repository clonen:
   ```
   git clone https://github.com/ngnhinguyen/wissensquiz.git
   cd wissensquiz
   ```

2. Abhängigkeiten installieren:
   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. MongoDB starten (falls lokal) und Umgebungsvariablen in `.env` anpassen:
   ```
   DB_CONNECTION=mongodb://localhost:27017/questions
   PORT=3002
   ```

4. Backend starten:
   ```
   cd backend
   node server.js
   ```

5. Frontend starten:
   ```
   cd frontend
   ng serve
   ```

6. Anwendung im Browser öffnen:
   ```
   http://localhost:4200
   ```

---

## Verwendete KI-Werkzeuge und deren Einsatz

- **ChatGPT (OpenAI)**
  - Unterstützung bei der Code-Generierung (Seed-Daten, Routing, MongoDB Queries)
  - Hilfe bei der Formulierung von Quizfragen
  - Überarbeitung von Texten und README
- **GitHub Copilot**
  - Code-Vervollständigungen im Angular-Frontend
---

## Weitere Features
- Personalisierte Quiz-Auswertung
- Punktesystem
- Responsive Design-Optimierung

