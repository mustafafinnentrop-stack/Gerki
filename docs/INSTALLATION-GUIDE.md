# Gerki – Vollständige Installationsanleitung

> **Gerki** ist dein persönlicher KI-Assistent, der komplett lokal auf deinem PC läuft.
> Kein API-Key nötig. Keine Cloud. Deine Daten bleiben bei dir.

---

## Inhaltsverzeichnis

1. [Systemvoraussetzungen](#1-systemvoraussetzungen)
2. [Windows – Installation](#2-windows--installation)
3. [Mac – Installation](#3-mac--installation)
4. [Erster Start](#4-erster-start)
5. [Ollama manuell installieren](#5-ollama-manuell-installieren)
6. [KI-Modell wechseln](#6-ki-modell-wechseln)

---

## 1. Systemvoraussetzungen

| Anforderung | Windows | Mac |
|---|---|---|
| Betriebssystem | Windows 10 (64-bit) oder neuer | macOS 12 Monterey oder neuer |
| RAM | **mindestens 8 GB** (16 GB empfohlen) | **mindestens 8 GB** (16 GB empfohlen) |
| Festplatte | 10 GB frei | 10 GB frei |
| Internet | Einmalig für Download | Einmalig für Download |

> **Warum 8 GB RAM?** Das KI-Modell (Mistral 7B, ~4 GB) läuft direkt im Arbeitsspeicher.
> Mit 8 GB funktioniert es, mit 16 GB läuft es deutlich schneller.

---

## 2. Windows – Installation

### Option A: Automatischer Installer (empfohlen)

1. **Lade den Gerki-Installer herunter:**
   - Gehe zu `gerki.app` → Download → Windows
   - Dateiname: `Gerki-Setup-1.0.0.exe`

2. **Lade den Voraussetzungs-Installer herunter:**
   - Im selben Download-Ordner findest du `gerki-windows/installer/install-windows.bat`
   - Oder: Ordner `gerki-windows` von GitHub herunterladen

3. **Reihenfolge der Installation:**
   ```
   Schritt 1: install-windows.bat mit Rechtsklick → "Als Administrator ausführen"
              (Installiert Ollama + KI-Modell automatisch – dauert 10-20 Minuten)

   Schritt 2: Gerki-Setup-1.0.0.exe starten
              (Installiert die Gerki Desktop-App)
   ```

4. **Der Installer macht automatisch:**
   - ✅ Prüft Systemvoraussetzungen
   - ✅ Lädt Ollama herunter und installiert es
   - ✅ Startet Ollama als Dienst
   - ✅ Lädt das Mistral 7B KI-Modell herunter (~4 GB)
   - ✅ Legt Ollama als Autostart-Programm an

### Option B: Manuell Schritt für Schritt

```
1. Ollama herunterladen:
   https://ollama.com/download/OllamaSetup.exe
   → Doppelklick → "Weiter" bis "Installieren"

2. Ollama starten:
   Suche im Startmenü nach "Ollama" → Starten
   (Ollama läuft im Hintergrund, kein Fenster)

3. KI-Modell herunterladen:
   Öffne die Eingabeaufforderung (cmd) und tippe:
   ollama pull mistral
   → Warten bis der Download abgeschlossen ist (~4 GB)

4. Gerki installieren:
   Gerki-Setup-1.0.0.exe starten → Anleitung folgen
```

### Windows – Gerki selbst bauen (für Entwickler)

```powershell
# Voraussetzungen installieren
winget install OpenJS.NodeJS.LTS  # Node.js 20
winget install Git.Git             # Git

# Repository klonen
git clone https://github.com/mustafafinnentrop-stack/Claude.git
cd Claude
git checkout claude/gerki-landing-page-867LB
cd gerki-app

# Dependencies installieren
npm install

# Native Module für Electron kompilieren
npx electron-rebuild -f -w better-sqlite3

# App starten (Entwicklungsmodus)
npm run dev

# Windows-Installer bauen
npm run build:win
# → dist/Gerki-Setup-1.0.0.exe
```

---

## 3. Mac – Installation

### Option A: Automatischer Installer (empfohlen)

1. **Lade Gerki herunter:**
   - Gehe zu `gerki.app` → Download → Mac
   - Für Apple Silicon (M1/M2/M3): `Gerki-1.0.0-arm64.dmg`
   - Für Intel Mac: `Gerki-1.0.0-x64.dmg`

2. **Voraussetzungs-Installer ausführen:**
   ```bash
   # Terminal öffnen (Spotlight: Cmd+Space → "Terminal")
   # In den gerki-mac/installer Ordner wechseln:
   cd ~/Downloads/gerki-mac/installer

   # Installer ausführen:
   bash install-mac.sh
   ```

3. **Der Installer macht automatisch:**
   - ✅ Prüft macOS-Version und RAM
   - ✅ Installiert Ollama (via Homebrew oder direkt)
   - ✅ Startet Ollama automatisch
   - ✅ Lädt Mistral 7B herunter (~4 GB)
   - ✅ Legt Ollama als LaunchAgent an (startet bei Login)
   - ✅ Kopiert Gerki.app nach /Applications

4. **Gerki starten:**
   - Launchpad → Gerki
   - Oder: Finder → Programme → Gerki

### Option B: Manuell Schritt für Schritt

```bash
# 1. Ollama installieren (empfohlen via Homebrew)
brew install ollama

# Falls Homebrew nicht installiert:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Ollama als Dienst starten (startet automatisch beim Login)
brew services start ollama

# 3. KI-Modell herunterladen
ollama pull mistral
# → Warten bis abgeschlossen (~4 GB, 5-20 Minuten)

# 4. Gerki DMG öffnen
# Doppelklick auf Gerki-1.0.0-arm64.dmg
# Gerki.app in den Programme-Ordner ziehen

# 5. Gerki starten
open /Applications/Gerki.app
```

### Mac – Gerki selbst bauen (für Entwickler)

```bash
# Voraussetzung: Xcode Command Line Tools
xcode-select --install

# Node.js 20 installieren
brew install node@20
echo 'export PATH="/opt/homebrew/opt/node@20/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Repository klonen
git clone https://github.com/mustafafinnentrop-stack/Claude.git
cd Claude
git checkout claude/gerki-landing-page-867LB
cd gerki-app

# Dependencies installieren
npm install

# Native Module kompilieren
npx electron-rebuild -f -w better-sqlite3

# Starten
npm run dev

# Mac-DMG bauen
npm run build:mac
# → dist/Gerki-1.0.0-arm64.dmg  (Apple Silicon)
# → dist/Gerki-1.0.0-x64.dmg    (Intel)
```

---

## 4. Erster Start

1. **Gerki öffnen** → Login-Bildschirm erscheint
2. **"Konto erstellen"** klicken
3. Nutzername, E-Mail und Passwort eingeben
4. **Setup-Wizard** startet automatisch:
   - Ollama-Status wird geprüft
   - Wenn Ollama läuft: ✅ Bereit
   - Wenn nicht: Knopf zum Starten
5. **Fertig!** Die KI ist sofort einsatzbereit

> **Kein API-Key nötig für den Start!** Die lokale KI (Ollama/Mistral) läuft ohne
> Registrierung bei Anthropic oder OpenAI.

---

## 5. Ollama manuell installieren

Falls der automatische Installer fehlgeschlagen ist:

### Windows
```
1. Browser öffnen → https://ollama.com/download
2. "Download for Windows" klicken
3. OllamaSetup.exe ausführen
4. Nach der Installation: Eingabeaufforderung öffnen
5. Eingeben: ollama pull mistral
6. Gerki neu starten
```

### Mac (ohne Homebrew)
```
1. https://ollama.com/download öffnen
2. "Download for macOS" klicken
3. ZIP entpacken → Ollama.app öffnen
4. Im Terminal: ollama pull mistral
5. Gerki neu starten
```

---

## 6. KI-Modell wechseln

Gerki unterstützt mehrere Modelle:

| Modell | Größe | RAM | Qualität | Lizenz |
|---|---|---|---|---|
| **mistral** (Standard) | 4.1 GB | 8 GB | ⭐⭐⭐⭐ | Apache 2.0 |
| qwen2.5:14b | 8.7 GB | 16 GB | ⭐⭐⭐⭐⭐ | Apache 2.0 |
| phi4:14b | 8.9 GB | 16 GB | ⭐⭐⭐⭐⭐ | MIT |
| llama3.3:70b | 43 GB | 32 GB | ⭐⭐⭐⭐⭐ | Meta |

**Modell wechseln:**
1. Gerki → Einstellungen → Ollama
2. Gewünschtes Modell → "Herunterladen"
3. Warten bis Download fertig
4. "Aktivieren" klicken
