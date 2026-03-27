# Gerki – Anfänger-Anleitung

> Diese Anleitung erklärt dir Schritt für Schritt, wie du Gerki installierst
> und benutzt. Keine technischen Vorkenntnisse nötig!

---

## Was ist Gerki?

Gerki ist dein persönlicher KI-Assistent, der **direkt auf deinem Computer** läuft:
- 🤖 **Lokale KI**: Kein Internetzugang während der Nutzung nötig
- 🔒 **Privat**: Deine Daten verlassen deinen Computer nicht
- 💸 **Kostenlos starten**: Kein API-Key, kein Abo nötig
- 📁 **Kennt deine Dateien**: Gerki kann auf deine Dokumente zugreifen
- 🧠 **Merkt sich alles**: Gerki lernt dich kennen

---

## Teil 1: Installation auf Windows

### Was du brauchst
- Windows 10 oder Windows 11
- Mindestens 8 GB Arbeitsspeicher (RAM)
- 10 GB freier Festplattenplatz
- Internetzugang (nur für die Installation)

---

### Schritt 1: Installer herunterladen

1. Öffne deinen Browser (Chrome, Firefox, Edge, egal)
2. Gehe zu: **gerki.app**
3. Klicke auf den großen **"Herunterladen"** Button
4. Wähle **"Windows"**
5. Es werden zwei Dateien heruntergeladen:
   - `gerki-windows.zip` (Installer-Paket)
   - `Gerki-Setup-1.0.0.exe` (Gerki selbst)

---

### Schritt 2: Voraussetzungen installieren (Ollama)

> Ollama ist das Programm, das die KI auf deinem Computer laufen lässt.
> Es muss **vor** Gerki installiert werden.

1. Entpacke `gerki-windows.zip`
   - Rechtsklick auf die Datei → "Alle extrahieren" → "Extrahieren"
2. Öffne den entpackten Ordner `gerki-windows`
3. Öffne den Ordner `installer`
4. Rechtsklick auf `install-windows.bat`
5. Klicke auf **"Als Administrator ausführen"**
6. Bei der Sicherheitswarnung: **"Ja"** klicken
7. Ein schwarzes Fenster öffnet sich – das ist normal!
8. **Warten** – der Installer macht folgendes automatisch:
   - Prüft deinen Computer (ca. 10 Sekunden)
   - Lädt Ollama herunter und installiert es (ca. 2 Minuten)
   - Lädt das KI-Modell herunter (ca. **10-30 Minuten** – je nach Internet!)
9. Wenn der Installer fertig ist: **"Enter drücken"**

> ⏳ **Geduld!** Der KI-Modell-Download ist ca. 4 GB groß.
> Lass den Computer einfach laufen und mach etwas anderes.

---

### Schritt 3: Gerki installieren

1. Starte `Gerki-Setup-1.0.0.exe` (Doppelklick)
2. Falls Windows warnt: "Weitere Informationen" → "Trotzdem ausführen"
3. Folge dem Installer:
   - "Weiter" klicken
   - Installationspfad kann so bleiben
   - "Installieren" klicken
   - "Fertigstellen" klicken

---

### Schritt 4: Gerki starten

1. Suche im **Startmenü** nach "Gerki"
2. Oder: Doppelklick auf das Gerki-Symbol auf dem Desktop
3. Der Registrierungs-Bildschirm erscheint → weiter mit [Teil 3](#teil-3-ersten-start-und-registrierung)

---

## Teil 2: Installation auf Mac

### Was du brauchst
- macOS 12 (Monterey) oder neuer
- Mindestens 8 GB Arbeitsspeicher
- 10 GB freier Festplattenplatz

---

### Schritt 1: Terminal öffnen

> Das Terminal ist wie eine Texteingabe für deinen Mac. Keine Angst, du kannst nichts kaputt machen!

1. Drücke **Command (⌘) + Leertaste** (Spotlight öffnet sich)
2. Tippe: `Terminal`
3. Drücke **Enter**
4. Ein weißes oder schwarzes Fenster öffnet sich

---

### Schritt 2: Installer herunterladen

1. Gehe im Browser zu **gerki.app**
2. Klicke auf "Herunterladen" → "Mac"
3. Lade herunter:
   - `gerki-mac.zip` (enthält den Installer)
   - `Gerki-1.0.0-arm64.dmg` (für M1/M2/M3 Macs) ODER
   - `Gerki-1.0.0-x64.dmg` (für ältere Intel Macs)

> **Welcher Mac habe ich?** Apple-Menü (🍎) → "Über diesen Mac"
> - "Apple M..." → arm64 Version
> - "Intel..." → x64 Version

---

### Schritt 3: Installer ausführen

Im Terminal, diese Befehle eingeben (nach jedem Zeile Enter drücken):

```bash
# 1. In den Downloads-Ordner wechseln
cd ~/Downloads

# 2. ZIP entpacken
unzip gerki-mac.zip

# 3. Installer ausführbar machen
chmod +x gerki-mac/installer/install-mac.sh

# 4. Installer starten
bash gerki-mac/installer/install-mac.sh
```

Der Installer fragt dich möglicherweise nach deinem Mac-Passwort (das siehst du beim Tippen nicht – das ist normal!).

**Warten** bis alles fertig ist (~10-30 Minuten für den KI-Download).

---

### Schritt 4: Gerki installieren

1. Doppelklick auf `Gerki-1.0.0-arm64.dmg` (oder x64)
2. Ziehe Gerki.app in den "Programme"-Ordner
3. DMG-Fenster schließen

Falls macOS warnt "Kann nicht geöffnet werden":
```
Rechtsklick auf Gerki.app → "Öffnen" → Im Dialog "Öffnen" klicken
```

---

### Schritt 5: Gerki starten

1. Öffne **Launchpad** (Raketen-Symbol im Dock)
2. Suche "Gerki"
3. Klicke drauf

---

## Teil 3: Ersten Start und Registrierung

### Konto erstellen

1. Gerki zeigt dir den **Anmeldebildschirm**
2. Klicke auf **"Konto erstellen"**
3. Fülle aus:
   - **Nutzername**: Dein Wunschname (z.B. "MeinName" oder "Max")
   - **E-Mail**: Deine E-Mail-Adresse
   - **Passwort**: Mindestens 6 Zeichen, merke es dir!
   - **Passwort bestätigen**: Nochmal dasselbe Passwort
4. Klicke **"Konto erstellen"**

> 🔒 **Sicherheit**: Alle Daten werden **nur lokal** auf deinem Computer gespeichert.
> Keine Daten werden an Server geschickt.

---

### Setup-Assistent

Nach der Registrierung startet der Setup-Assistent automatisch:

**Schritt 1 – Willkommen**: Klicke "Einrichtung starten"

**Schritt 2 – Claude API** (optional):
- Wenn du die lokale KI nutzen möchtest: Klicke **"Überspringen"**
- Wenn du Claude haben möchtest (Pro): API-Key eingeben

**Schritt 3 – OpenAI** (optional):
- Ebenfalls optional für Pro-Nutzer
- Zum Überspringen: **"Überspringen"** klicken

**Schritt 4 – Ollama** (wichtig!):
- Gerki prüft ob Ollama läuft
- ✅ Grün = Ollama läuft → weiter klicken
- ❌ Rot = Ollama läuft nicht → "Starten" klicken, kurz warten

**Schritt 5 – Fertig!**
- Klicke "Gerki starten"

---

## Teil 4: Gerki benutzen

### Erste Nachricht schreiben

1. Klicke in das Textfeld unten
2. Schreibe deine Frage, z.B.:
   - "Erkläre mir wie Zinsen bei Krediten funktionieren"
   - "Hilf mir einen Brief ans Finanzamt zu schreiben"
   - "Was ist der Unterschied zwischen GmbH und AG?"
3. Drücke **Enter** (oder klicke den blauen Pfeil)
4. Warten... die KI tippt die Antwort

> 💡 **Tipp**: Die erste Antwort kann etwas länger dauern (~5-10 Sekunden)
> weil das KI-Modell geladen werden muss.

---

### Datei hochladen

Du kannst Gerki Dokumente zeigen:

1. Klicke auf das **📎 Büroklammer-Symbol** links im Eingabefeld
2. Wähle eine Datei aus (PDF, Word, Text...)
3. Die Datei erscheint als Chip über dem Eingabefeld
4. Schreibe deine Frage dazu, z.B. "Was steht in diesem Brief?"
5. Abschicken

---

### Text kopieren

Wenn Gerki eine Antwort gibt und du sie kopieren möchtest:
1. Bewege die Maus über die Antwort
2. Ein **Kopier-Symbol** erscheint oben rechts an der Nachricht
3. Klick darauf → Text ist in der Zwischenablage

---

### Modell wechseln

Gerki nutzt standardmäßig die lokale KI. Du kannst das ändern:

1. Unten im Chat-Eingabefeld: Klicke auf **"⚡ Lokal (Ollama)"**
2. Ein Menü öffnet sich
3. Wähle ein anderes Modell (Pro-Modelle sind gesperrt für Free-Nutzer)

---

### Skills nutzen

Gerki erkennt automatisch welcher "Skill" (Spezialist) für deine Frage passt:

- 🏛️ **Behördenpost**: "Ich habe einen Brief vom Finanzamt..."
- ⚖️ **Rechtsberater**: "Erkläre mir diesen Vertrag..."
- 📧 **E-Mail**: "Schreib eine E-Mail an meinen Chef..."
- 💰 **Buchhaltung**: "Was kann ich von der Steuer absetzen?"

Du musst nichts manuell auswählen!

---

## Teil 5: Häufige Fragen

### "Die KI antwortet nicht"
→ Überprüfe ob Ollama läuft: Gerki → Einstellungen → Ollama → Status

### "Ich habe mein Passwort vergessen"
→ Gerki speichert Daten lokal. Aktuell kein Passwort-Reset.
→ Neues Konto erstellen (alte Daten bleiben in der Datenbank)

### "Die KI antwortet auf Englisch"
→ Schreibe auf Deutsch, Gerki antwortet in der Sprache in der du schreibst

### "Wie lösche ich ein Gespräch?"
→ In der linken Seitenleiste findest du deine Gespräche
→ (Löschen-Funktion kommt in der nächsten Version)

### "Kann ich Gerki auf mehreren Computern nutzen?"
→ Ja, aber jeder Computer hat eine eigene lokale Datenbank
→ Synchronisation zwischen Geräten ist für eine zukünftige Pro-Version geplant

---

## Zusammenfassung in 60 Sekunden

```
1. gerki.app → Download
2. Installer für dein System ausführen (warten ~20 Min für KI-Download)
3. Gerki installieren
4. Konto erstellen
5. Setup-Assistent durchlaufen
6. Loslegen! Einfach schreiben.
```

**Fertig. Du brauchst keinen API-Key. Keine Kreditkarte. Keine Cloud.**

---

*Hilfe: support@gerki.app | github.com/mustafafinnentrop-stack/Claude/issues*
