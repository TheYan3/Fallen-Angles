# Angles Fallen

![Angles Fallen Header](img/Men%C3%BC/Header2.png)

`Angles Fallen` ist ein browserbasiertes 2D-Action-Sidescroller-Spiel. Der Spieler kämpft sich durch ein Fantasy-Level, sammelt Power-ups, weicht Hindernissen aus und trifft am Ende auf einen Boss mit eigener Spezialfähigkeit.

Das Projekt ist ohne Build-System umgesetzt und läuft direkt im Browser mit HTML, CSS und JavaScript. Die Spielwelt wird über ein Canvas-Element gerendert. Spiellogik, Gegner, Levelobjekte, Animationen und UI sind in eigenen JavaScript-Klassen organisiert.

## Features

- Canvas-basiertes 2D-Gameplay mit Side-Scrolling-Kamera
- Spielbarer Charakter mit Idle-, Lauf-, Sprint-, Sprung-, Angriffs-, Treffer- und Sterbeanimationen
- Mehrere Gegnertypen: Golem, Minotaur, Reaper und Endboss
- Gegner-KI mit Aggro-Reichweite, Angriffsdistanz und Hindernisprüfung
- Bosskampf mit eigener Musik, Slow-Motion beim Besiegen und Spezialfähigkeiten
- Power-ups, die Lebensenergie und maximale Gesundheit erhöhen
- Healthbar für Spieler und Gegner
- Game-Over- und Replay-Flow
- Soundeffekte, Titelmusik, Ingame-Musik und Bosskampf-Musik
- Mute-Funktion mit Speicherung in `localStorage`
- Fullscreen-Modus
- Tastatursteuerung und Touch-/Mobile-Controls
- Responsives Layout für Desktop und mobile Landscape-Ansicht

## Gameplay

Der Spieler startet im Menü und betritt per Play-Button das Level. Ziel ist es, sich durch das Level zu bewegen, Gegner zu besiegen, Power-ups einzusammeln und den Endboss zu bezwingen.

Normale Gegner werden aktiv, sobald der Spieler nahe genug ist. Der Endboss startet beim Erreichen seines Bereichs einen eigenen Bosskampf. Fällt seine Energie unter einen Schwellenwert, nutzt er eine Spezialsequenz aus Teleport, Heilung, Fear-Effekt und zusätzlich gespawnten Gegnern.

## Steuerung

| Aktion | Tastatur | Mobile |
| --- | --- | --- |
| Nach links bewegen | `A` oder `Pfeil links` | Linker Pfeil-Button |
| Nach rechts bewegen | `D` oder `Pfeil rechts` | Rechter Pfeil-Button |
| Springen | `Leertaste` | Pfeil-hoch-Button |
| Angreifen | `W` oder `Pfeil hoch` | Schwert-Button |
| Rennen | `Shift` halten | Bewegungsbutton ca. 1 Sekunde halten |
| Fullscreen | Toolbar-Button | Toolbar-Button |
| Ton an/aus | Mute-Button | Mute-Button |

## Technologien

- HTML5
- CSS3
- Vanilla JavaScript
- Canvas API
- Web Audio über native `Audio`-Objekte
- `localStorage` für persistente Sound-Einstellungen

Es werden keine npm-Pakete und kein Bundler benötigt.

## Voraussetzungen

- Moderner Browser mit Canvas-Unterstützung
- Optional: lokaler Webserver für konsistentes Laden von Assets und Audio

## Projekt Starten

### Variante 1: Direkt im Browser

Öffne die Datei `index.html` im Browser.

### Variante 2: Mit lokalem Server

Ein lokaler Server ist empfehlenswert, weil Browser je nach Einstellung lokale Asset- oder Audiozugriffe unterschiedlich behandeln.

Beispiel mit Python:

```bash
python -m http.server 8000
```

Danach im Browser öffnen:

```text
http://localhost:8000
```

## Projektstruktur

```text
.
├── Abilities/          # Spezialfähigkeiten des Bosses
├── Levels/             # Level-Konfiguration und Objekt-Spawns
├── audio/              # Musik und Soundeffekte
├── font/               # Eingebundene Schriftdateien
├── img/                # Sprites, Hintergründe, UI-Elemente und Power-ups
├── js/                 # Einstieg, Seitenevents, globale Einstellungen
├── models/             # Spielklassen für Welt, Spieler, Gegner, UI und Objekte
├── impressum.html      # Impressumsseite
├── index.html          # Einstiegspunkt des Spiels
└── style.css           # Layout, Menü, Canvas- und Mobile-Styles
```

## Wichtige Dateien

- `index.html`: Bindet alle Skripte, Styles und die Spieloberfläche ein.
- `js/game.js`: Initialisiert Canvas, Tastatur und Spielwelt.
- `js/page.js`: Steuert Menü, Musik, Mute, Fullscreen und Mobile-Controls.
- `js/settings.js`: Enthält globale Canvas-, Speed- und Slow-Motion-Einstellungen.
- `Levels/level1.js`: Erstellt Gegner, Wolken, Hintergrundebenen, Felsen und Power-ups.
- `models/world.class.js`: Zentrale Spielwelt mit Render-Loop, Kollisionen, Gegnerbewegung, Game-Over-Logik und Kamera.
- `models/player.class.js`: Spielerbewegung, Angriffe, Animationen, Fear-Zustand und Kamera-Following.
- `models/endboss.class.js`: Bosswerte, Bossanimationen, Spezialfähigkeiten und Spawn-Logik.
- `models/keyboard.class.js`: Tastaturzustand für Bewegung, Angriff, Sprung und Sprint.

## Architekturüberblick

Das Spiel nutzt eine objektorientierte Struktur:

- `world` verwaltet Canvas, Level, Kamera, Game Loop, UI und Kollisionen.
- `Level` bündelt Gegner, Power-ups, Hintergründe, Felsen und Levelgrenzen.
- `MovableObject` dient als Basisklasse für bewegliche Spielfiguren mit Animation, Kollision, Schwerkraft und Trefferlogik.
- `player`, `golem`, `minotaur`, `reaper` und `endboss` spezialisieren Bewegung, Werte und Animationen.
- `Abilities` koordiniert die Bossfähigkeiten `teleportAbility`, `healAbility` und `fearAbility`.
- UI-Klassen wie `healthbar`, `powerUpCounter`, `gameover` und `repeatButton` zeichnen Status- und Endbildschirme auf das Canvas.

Die Spiellogik läuft über Intervalle und `requestAnimationFrame`. `gameSettings.timeScale` erlaubt Slow-Motion-Effekte, indem einzelne Ticks reduziert ausgeführt werden.

## Assets und Lizenzen

Das Repository enthält Bild-, Audio- und Font-Assets. Mehrere Asset-Ordner enthalten eigene `readme.txt`- und `license.txt`-Dateien. Die Josefin-Sans-Schrift liegt unter der SIL Open Font License in `font/Josefine/SIL Open Font License.txt`.

Vor einer Veröffentlichung sollte geprüft werden, ob alle verwendeten Sprites, Audiodateien und weiteren Assets für den geplanten Einsatzzweck lizenziert sind.

## Entwicklungshinweise

- Die Skript-Reihenfolge in `index.html` ist wichtig, weil die Klassen global geladen werden.
- Neue Levelobjekte werden aktuell in `Levels/level1.js` erzeugt.
- Neue Animationen sollten in `js/animation-library.js` registriert und danach in der jeweiligen Klasse geladen werden.
- `gameSettings.hitboxShown` kann für Debugging aktiviert werden.
- Mobile Controls erscheinen in Landscape-Ansicht.
- Der Canvas verwendet intern eine Auflösung von `720 x 480`.

## Deployment

Das Projekt ist eine statische Website. Für eine Veröffentlichung reicht ein Hosting, das HTML, CSS, JavaScript und statische Assets ausliefert, zum Beispiel GitHub Pages, Netlify, Vercel oder ein einfacher Webserver.

## Mögliche Erweiterungen

- Weitere Level und Levelauswahl
- Startbildschirm mit Schwierigkeitsgrad
- Speichern von Highscores oder Bestzeiten
- Pausenmenü
- Bessere Trennung zwischen Assetdaten und Spiellogik
- Zentrale Verwaltung aller Intervalle beim Neustart
- Automatisierte Tests für Kollisions- und Bewegungslogik
