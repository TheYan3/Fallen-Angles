# Angles Fallen

![Angles Fallen Header](img/Men%C3%BC/Header2.png)

`Angles Fallen` ist ein browserbasiertes 2D-Action-Sidescroller-Spiel. Der Spieler bewegt sich durch ein Fantasy-Level, sammelt Flammenfedern, kämpft gegen mehrere Gegnertypen, nutzt Plattformen und Hindernisse im Level und trifft am Ende auf einen Wraith-Endboss mit eigener Spezialsequenz.

Das Projekt ist ohne Build-System umgesetzt und läuft als statische Website direkt im Browser. Rendering, Kamera, Gegnerlogik, Kollisionen, Animationen, Audio und UI werden mit HTML, CSS, Vanilla JavaScript und der Canvas API umgesetzt.

## Features

- Canvas-basiertes 2D-Gameplay mit Side-Scrolling-Kamera
- Spielbarer Charakter mit Idle-, Lauf-, Sprint-, Sprung-, Fall-, Angriffs-, Treffer- und Sterbeanimationen
- Normale und laufende Angriffsanimationen mit Angriffscooldown
- Gegner: Golem, Minotaur, Reaper und Wraith-Endboss
- Gegner-KI mit Aggro-Reichweite, Angriffsdistanz, Laufzustand und Fels-Kollisionsprüfung
- Bosskampf mit eigener Musik, Aggro-Sound, Slow-Motion beim Besiegen und Win-Screen
- Boss-Ability-Sequenz aus Teleport, Casting-Animation, Heilung, Fear-Effekt und zusätzlichen Gegner-Spawns
- Power-ups als animierte Flammenfedern, die heilen und die Healthbar erweitern
- Felsen als Hindernisse und begehbare Plattformen
- Zufällig platzierte Felsen und Power-ups innerhalb definierter Levelbereiche
- Spieler-, Gegner- und Boss-Healthbars
- Power-up-Counter im Canvas-UI
- Game-Over-, Win- und Replay-Flow
- Titelmusik, Ingame-Musik, Bosskampf-Musik, Win-Musik und Soundeffekte
- Globale Mute-Funktion mit Speicherung in `localStorage`
- Fullscreen-Modus für den Spielcontainer
- Tastatur-Hilfe als gedrückt gehaltenes Overlay, inklusive Pausierung des Spiels
- Tastatursteuerung und Touch-/Mobile-Controls
- Mobile Landscape-Anpassung des Canvas und Blockierung störender Browser-Gesten während des Spiels
- Debug-Hitboxen über `gameSettings.hitboxShown`

## Gameplay

Der Spieler startet im Menü und beginnt das Level über den Play-Button. Danach wird die Titelmusik durch die Ingame-Musik ersetzt und eine neue `World`-Instanz erzeugt. Ziel ist es, das Level bis zum Endboss zu durchqueren, Gegner zu besiegen, Power-ups einzusammeln und den Bosskampf zu gewinnen.

Normale Gegner werden aktiv, sobald der Spieler nah genug ist. Sie laufen auf den Spieler zu, stoppen in Angriffsdistanz und verursachen Schaden während aktiver Angriffsanimationen. Der Spieler kann mit Schwertangriffen zurückschlagen; Treffer nutzen kurze Invincibility-Frames, damit nicht mehrere Treffer im selben Moment stapeln.

Der Endboss startet beim Erreichen seiner Aggro-Reichweite den Bosskampf und wechselt auf eigene Musik. Sobald seine Energie auf `50` oder weniger fällt und die Fähigkeit noch nicht benutzt wurde, startet die Spezialsequenz:

1. Der Boss teleportiert sich vor den Spieler.
2. Die Casting-Animation wird abgespielt.
3. Der Boss heilt sich um `50`.
4. Der Spieler erhält für `2000 ms` den Fear-Effekt.
5. Drei zufällige Standardgegner werden vor dem Spieler gespawnt.

Während Fear aktiv ist, wird die normale Steuerung blockiert, der Spieler läuft automatisch nach links, Kollisionen mit Gegnern und Power-ups werden ignoriert, und Felsen blockieren den Spieler nicht.

## Steuerung

| Aktion              | Tastatur                | Mobile                               |
| ------------------- | ----------------------- | ------------------------------------ |
| Nach links bewegen  | `A` oder `Pfeil links`  | Linker Pfeil-Button                  |
| Nach rechts bewegen | `D` oder `Pfeil rechts` | Rechter Pfeil-Button                 |
| Springen            | `Leertaste`             | Pfeil-hoch-Button                    |
| Angreifen           | `W` oder `Pfeil hoch`   | Schwert-Button                       |
| Rennen              | `Shift` halten          | Bewegungsbutton ca. 1 Sekunde halten |
| Fullscreen          | Toolbar-Button          | Toolbar-Button                       |
| Steuerung anzeigen  | Tastatur-Button halten  | Tastatur-Button halten               |
| Ton an/aus          | Mute-Button             | Mute-Button                          |
| Zurück zum Menü     | `x`-Toolbar-Button      | `x`-Toolbar-Button                   |

Hinweis: `S`/`Pfeil runter` und `F` werden im Keyboard-State bereits erfasst, haben im aktuellen Gameplay aber keine aktive Funktion.

## Technologien

- HTML5
- CSS3
- Vanilla JavaScript
- Canvas API
- Native `Audio`-Objekte
- `localStorage` für persistente Sound-Einstellungen

Es werden keine npm-Pakete, kein Bundler und kein Build-Step benötigt.

## Voraussetzungen

- Moderner Browser mit Canvas-Unterstützung
- Optional: lokaler Webserver für konsistentes Laden von Assets, Fonts und Audio

## Projekt Starten

### Variante 1: Direkt im Browser

Öffne `index.html` im Browser.

### Variante 2: Mit lokalem Server

Ein lokaler Server ist empfehlenswert, weil Browser lokale Asset- und Audiozugriffe je nach Einstellung unterschiedlich behandeln.

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
├── Levels/             # Level-Konfiguration, Spawns und Zufallsplatzierung
├── audio/              # Musik und Soundeffekte
├── font/               # Eingebundene Schriftdateien
├── img/                # Sprites, Hintergründe, UI-Elemente und Power-ups
├── js/                 # Spielstart, globale Settings, Asset-Libraries und Browser-Controller
├── models/             # Spielklassen für Welt, Spieler, Gegner, UI, Objekte und Abilities
├── impressum.html      # Impressumsseite
├── index.html          # Einstiegspunkt und Script-Reihenfolge
├── script.js           # Menü, Musik, Mute, Touch-Controls und Browser-Gesten
└── style.css           # Layout, Menü, Canvas, Toolbar und Mobile-Styles
```

## Wichtige Dateien

- `index.html`: Bindet Styles, Canvas, Menü, Toolbar, Mobile-Controls und alle Skripte in der benötigten Reihenfolge ein.
- `script.js`: Steuert Menüwechsel, Musikwechsel, Mute-State, Touch-Controls, Tastaturhilfe, Rückkehr ins Menü und Browser-Gesten.
- `js/game.js`: Initialisiert Canvas, `Keyboard` und `World`; `restartGame()` zerstört die alte Welt und startet sauber neu.
- `js/settings.js`: Enthält Canvas-Größe, Spielgeschwindigkeit, Audio-Lautstärke, Font, Pause, Game-Time und Slow-Motion-Ticks.
- `js/animation-library.js`: Zentrale Registrierung der Animationspfade.
- `js/audio-library.js`: Zentrale Registrierung aller Musik- und Soundpfade.
- `js/fullscreen-controller.js`: Steuert Fullscreen-Umschaltung und Button-Zustand.
- `js/responsive-canvas.js`: Passt das Canvas in Mobile-Landscape-Ansichten an.
- `Levels/level1.js`: Erstellt Gegner, Wolken, Sky-/Ground-Layer, Felsen und Power-ups.
- `models/world/world.class.js`: Zentrale Spielwelt mit Game-State-Loop, Kamera, Power-up-Logik, Game-Over-/Win-Status und Cleanup.
- `models/world/world-renderer.class.js`: Zeichnet Weltobjekte, Kameraebene, Healthbars, UI, Game-Over- und Win-Screens.
- `models/world/enemy-controller.class.js`: Steuert Gegnerbewegung, Aggro, Bosskampf-Audio, Angriffszustände und Gegner-Cleanup.
- `models/world/world-collision.class.js`: Kapselt Fels-Kollisionen, Landelogik und Sonderfälle wie Fear und Endboss.
- `models/base/drawableObjects.class.js`: Lädt und zeichnet Sprite-Bilder.
- `models/base/animated-object.class.js`: Gemeinsame Animationslogik für Loops, Frame-Delays, Einmalanimationen, Hurt und Death.
- `models/base/movable-Object.class.js`: Bewegung, Schwerkraft, Fels-Landung, Kollisionen, Kampfschaden, Invincibility-Frames und Lebenszustand.
- `models/player/player.class.js`: Spielerwerte, Bewegung, Sprunglogik, Animation-Routing und Status-Effekt-Anbindung.
- `models/player/player-attack.class.js`: Angriffszustand, Angriffscooldown, Angriffsanimation und Treffer-Reset des Spielers.
- `models/player/player-status-effects.class.js`: Fear-Status, automatische Fear-Bewegung und Kollisionsdeaktivierung.
- `models/enemies/endboss.class.js`: Bosswerte, Bossanimationen, Ability-Auslösung und Gegner-Spawns nach Fear.
- `models/Abilities/`: Enthält `Abilities`, `TeleportAbility`, `HealAbility` und `FearAbility`.
- `models/input/keyboard.class.js`: Tastaturzustand für Bewegung, Angriff, Sprung, Sprint und vorbereitete Zusatztasten.
- `models/ui/`: Enthält Healthbar, Power-up-Counter, Game-End-Screen und Repeat-Button.

## Architekturüberblick

Das Spiel nutzt eine objektorientierte Struktur mit global geladenen Klassen:

- `World` verwaltet Canvas, Level, Kamera, Game-State, UI, Endzustände und delegiert Rendering, Gegnerlogik und Kollisionen.
- `WorldRenderer` ist nur für das Zeichnen zuständig und läuft über `requestAnimationFrame`.
- `EnemyController` bewegt Gegner in einem eigenen 60-FPS-Intervall und aktualisiert Aggro-/Angriffszustände.
- `WorldCollision` bündelt Fels-Hitboxen, horizontale Blockaden und Plattform-Landung.
- `Level` speichert Gegner, Wolken, Hintergründe, Felsen, Power-ups und Levelgrenzen.
- `DrawableObject`, `AnimatedObject` und `MovableObject` bilden die gemeinsame Klassenbasis für sichtbare und bewegliche Objekte.
- `Player`, `Golem`, `Minotaur`, `Reaper` und `Endboss` spezialisieren Werte, Animationen und Verhalten.
- `PlayerAttack` und `PlayerStatusEffects` trennen Angriff und Status-Effekte aus der Spielerklasse aus.
- `Abilities` koordiniert die Bossfähigkeiten `TeleportAbility`, `HealAbility` und `FearAbility`.
- UI-Klassen zeichnen Status- und Endbildschirme direkt auf das Canvas.

Die Spiellogik basiert auf Intervallen und `requestAnimationFrame`. `gameSettings.getGameTime()` liefert aktive Spielzeit ohne Pausen. `gameSettings.shouldRunTick()` pausiert Ticks oder reduziert sie für Slow-Motion.

## Level und Spielwerte

- Canvas-Auflösung: `720 x 480`
- Spielerstartleben: `100`
- Spielerschaden: `25`
- Angriffscooldown: `1500 ms`
- Sprung-Cooldown: `800 ms`
- Standard-Gegneraktivierung: `390 px` vor dem Gegner
- Gegner-Stop-/Angriffsdistanz: `30 px`
- Endboss-Leben: `200`
- Endboss-Schaden: `50`
- Boss-Ability-Schwelle: `50` Energie
- Power-up-Heilung: `50`
- Fear-Dauer: `2000 ms`
- Fear-Speed-Multiplikator: `3`
- Nach Fear gespawnte Gegner: `3`

## Assets und Lizenzen

Das Repository enthält Bild-, Audio- und Font-Assets. Mehrere Asset-Ordner enthalten eigene `readme.txt`- und `license.txt`-Dateien. Die Josefin-Sans-Schrift liegt unter der SIL Open Font License in `font/Josefine/SIL Open Font License.txt`.

Vor einer Veröffentlichung sollte geprüft werden, ob alle verwendeten Sprites, Audiodateien, Font-Dateien und weiteren Assets für den geplanten Einsatzzweck lizenziert sind.

## Entwicklungshinweise

- Die Skript-Reihenfolge in `index.html` ist wichtig, weil die Klassen ohne Module global geladen werden.
- Neue Levelobjekte werden aktuell in `Levels/level1.js` erzeugt.
- Neue Animationen sollten in `js/animation-library.js` registriert und danach in der jeweiligen Klasse geladen werden.
- Neue Sounds sollten in `js/audio-library.js` registriert und danach über `audioLibrary` verwendet werden.
- Neue Gegner brauchen Werte, Animationen, Sounds und ggf. Einträge in `WorldRenderer.isHitboxObject()`.
- `gameSettings.hitboxShown` kann für Debugging aktiviert werden.
- `gameSettings.audioVolume` steuert die zentrale Spiel-Lautstärke.
- `gameSettings.pauseGame()` und `resumeGame()` werden aktuell für die gedrückt gehaltene Tastaturhilfe verwendet.
- Der Menü-Hintergrund liegt auf `.menu-screen`, damit `index.html` und `impressum.html` dieselbe Darstellung nutzen.
- Mobile Controls erscheinen in Landscape-Ansicht.
- Beim Zurückkehren ins Menü wird die aktuelle `World` zerstört, Fullscreen verlassen und die Titelmusik neu gestartet.

## Deployment

Das Projekt ist eine statische Website. Für eine Veröffentlichung reicht ein Hosting, das HTML, CSS, JavaScript und statische Assets ausliefert, zum Beispiel GitHub Pages, Netlify, Vercel oder ein einfacher Webserver.

## Mögliche Erweiterungen

- Weitere Level und Levelauswahl
- Story oder Intro-Sequenz
- Schwierigkeitsgrade
- Pausenmenü
- Einstellungsmenü
- Highscores oder Bestzeiten
- Eigene Fähigkeiten für normale Gegner
- Besseres visuelles Feedback beim Einsatz von Abilities
- Zentrale Verwaltung aller Objekt-Intervalle beim Neustart
- Stärkere Trennung zwischen Assetdaten und Spiellogik
- Automatisierte Tests für Kollisions-, Bewegungs- und Ability-Logik
