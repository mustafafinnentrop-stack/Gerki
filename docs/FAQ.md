# Gerki – FAQ & Fehlerbehebung

---

## Inhalt

- [Allgemein](#allgemein)
- [Windows – Probleme](#windows--probleme)
- [Mac – Probleme](#mac--probleme)
- [Ollama – Probleme](#ollama--probleme)
- [KI antwortet nicht / Fehler](#ki-antwortet-nicht--fehler)
- [Performance](#performance)

---

## Allgemein

### ❓ Gerki startet, aber zeigt einen weißen Bildschirm

**Ursache:** Electron-Renderer konnte nicht starten (JS-Fehler)

**Lösung:**
1. Gerki vollständig schließen (Task-Manager / Aktivitätsanzeige)
2. Warte 10 Sekunden
3. Erneut starten
4. Falls es weiterhin passiert: Entwicklerkonsole öffnen (Gerki → Menü → View → Toggle Developer Tools)

---

### ❓ "Kein Konto gefunden" beim Login

**Ursache:** Datenbank neu oder beschädigt

**Lösung:**
1. "Konto erstellen" klicken
2. Neues Konto anlegen (Daten bleiben lokal gespeichert)
3. Falls alte Daten verloren: Gerki-Daten befinden sich in:
   - Windows: `C:\Users\{Name}\AppData\Roaming\gerki\`
   - Mac: `~/Library/Application Support/gerki/`

---

### ❓ Meine Gespräche sind nach einem Update weg

**Ursache:** App-Daten wurden gelöscht oder Datenbankpfad geändert

**Lösung:**
1. Schau in den Daten-Ordner (s.o.)
2. Falls `gerki.db` noch vorhanden → diese Datei ist deine Datenbank, sie enthält alles
3. Kopiere `gerki.db` in den neuen App-Daten-Ordner

---

## Windows – Probleme

### ❓ "Windows hat deinen PC geschützt" – Warnung beim Installer

**Ursache:** App ist nicht mit einem Code-Signing-Zertifikat signiert (kostet ca. 300€/Jahr)

**Lösung:**
```
1. "Weitere Informationen" klicken
2. "Trotzdem ausführen" klicken
3. Der Installer ist sicher – du kannst den Quellcode auf GitHub prüfen
```

---

### ❓ Installer schlägt fehl mit "Access Denied"

**Ursache:** Fehlende Administrator-Rechte

**Lösung:**
```
1. Rechtsklick auf install-windows.bat
2. "Als Administrator ausführen" wählen
3. Bei der UAC-Abfrage "Ja" klicken
```

---

### ❓ PowerShell-Skript wird blockiert

**Fehlermeldung:** "Die Ausführung von Skripts ist für dieses System deaktiviert"

**Lösung:**
```powershell
# PowerShell als Administrator öffnen:
# Startmenü → PowerShell → Rechtsklick → Als Administrator

# Einmalig ausführen:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Danach Installer erneut starten
```

---

### ❓ Ollama wird als Virus erkannt (Windows Defender)

**Ursache:** False Positive – Ollama ist legitime Software

**Lösung:**
```
1. Windows-Sicherheit öffnen
2. Viren- & Bedrohungsschutz
3. Schutzprotokoll → Gerki/Ollama als "Zulassen" markieren
4. ODER: Ausnahme hinzufügen für den Ollama-Installationsordner:
   C:\Users\{Name}\AppData\Local\Programs\Ollama\
```

---

### ❓ "better-sqlite3" Fehler beim selbst Bauen

**Fehlermeldung:** `Error: The module was compiled against a different Node.js version`

**Lösung:**
```powershell
# Mit npm Paketmanager und korrekter Node-Version:
nvm install 20
nvm use 20

# Dann neu kompilieren:
cd gerki-app
npm install
npx electron-rebuild -f -w better-sqlite3
npm run dev
```

---

### ❓ Gerki öffnet sich, aber Chat funktioniert nicht (Windows)

**Ursache:** Ollama läuft nicht

**Lösung:**
```
1. Startmenü → "Ollama" suchen → Starten
   ODER
   Eingabeaufforderung: ollama serve

2. In Gerki: Einstellungen → Ollama → "Status prüfen"

3. Falls Ollama fehlt: install-windows.bat erneut ausführen
```

---

### ❓ "node_modules" Fehler beim Build

**Fehlermeldung:** `Cannot find module 'electron'`

**Lösung:**
```powershell
cd gerki-app
Remove-Item -Recurse -Force node_modules
npm install
npx electron-rebuild -f -w better-sqlite3
```

---

## Mac – Probleme

### ❓ "Gerki kann nicht geöffnet werden, da es von einem nicht verifizierten Entwickler stammt"

**Lösung (Methode 1 – einfach):**
```
Rechtsklick auf Gerki.app → "Öffnen" → Im Dialog "Öffnen" bestätigen
```

**Lösung (Methode 2 – Terminal):**
```bash
xattr -cr /Applications/Gerki.app
```

---

### ❓ Ollama kann nach Installation nicht gefunden werden

**Fehlermeldung:** "Ollama läuft nicht"

**Lösung:**
```bash
# Prüfen wo Ollama ist
which ollama
# oder
ls /usr/local/bin/ollama
ls /opt/homebrew/bin/ollama

# Manuell starten
/opt/homebrew/bin/ollama serve
# oder (Intel Mac)
/usr/local/bin/ollama serve
```

---

### ❓ "Permission denied" beim Ausführen des Installers

**Lösung:**
```bash
chmod +x gerki-mac/installer/install-mac.sh
bash gerki-mac/installer/install-mac.sh
```

---

### ❓ npm install schlägt fehl auf Mac

**Fehlermeldung:** `node-gyp` Fehler oder Xcode fehlt

**Lösung:**
```bash
# Xcode Command Line Tools installieren
xcode-select --install

# Nach der Installation (kann 5-10 Minuten dauern):
cd gerki-app
npm install
npx electron-rebuild -f -w better-sqlite3
```

---

### ❓ Electron startet nicht (Apple Silicon M1/M2)

**Fehlermeldung:** `Rosetta` oder Architecture-Fehler

**Lösung:**
```bash
# Sicherstellen dass nvm und Node für ARM laufen
nvm install 20
nvm use 20
node --version  # Sollte v20.x zeigen

# Neu installieren
cd gerki-app
rm -rf node_modules
npm install
npx electron-rebuild -f -w better-sqlite3
npm run dev
```

---

### ❓ brew: command not found

**Lösung:**
```bash
# Homebrew installieren
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Bei Apple Silicon (M1/M2): PATH setzen
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
source ~/.zshrc
```

---

## Ollama – Probleme

### ❓ "Port 11434 already in use"

**Ursache:** Ollama läuft bereits (das ist gut!)

**Lösung:**
- Nichts tun – Ollama ist bereits aktiv
- In Gerki → Einstellungen → Ollama → "Status prüfen" zeigt es als "Läuft"

```bash
# Falls Ollama hängt und neu gestartet werden soll:
# Mac/Linux:
pkill -f "ollama serve"
ollama serve

# Windows:
taskkill /IM ollama.exe /F
ollama serve
```

---

### ❓ Modell-Download bricht ab

**Ursache:** Instabile Internetverbindung oder unzureichender Speicher

**Lösung:**
```bash
# Download einfach neu starten – Ollama macht weiter wo es aufgehört hat
ollama pull mistral

# Falls komplett von vorne:
ollama rm mistral
ollama pull mistral
```

---

### ❓ Ollama läuft, aber KI antwortet sehr langsam

**Ursache:** Zu wenig RAM oder Modell zu groß

**Lösung:**
```bash
# Kleineres Modell verwenden
ollama pull mistral:7b-instruct-q4_K_M  # Komprimiert, schneller

# Oder aktuelle Modellgröße prüfen
ollama list
```

---

### ❓ Ollama findet keine Modelle

**Fehlermeldung:** `Modell nicht installiert`

**Lösung:**
```bash
# Welche Modelle sind installiert?
ollama list

# Mistral neu installieren:
ollama pull mistral

# In Gerki: Einstellungen → Ollama → Modell auswählen → "Herunterladen"
```

---

## KI antwortet nicht / Fehler

### ❓ "Fehler: Ollama läuft nicht"

**Schritt für Schritt:**
1. Terminal/CMD öffnen
2. `ollama serve` eintippen und Enter
3. Warten bis "Listening on 127.0.0.1:11434" erscheint
4. Gerki neu laden (Fenster schließen, neu öffnen)

---

### ❓ Claude oder ChatGPT funktionieren nicht

**Ursache:** API-Key fehlt oder abgelaufen (nur Pro)

**Lösung:**
- Gerki → Einstellungen → Claude API oder OpenAI API
- Neuen API-Key eingeben
- Keys können hier erstellt werden:
  - Claude: https://console.anthropic.com/settings/keys
  - OpenAI: https://platform.openai.com/api-keys

> **Hinweis:** Claude und ChatGPT sind nur für Pro-Nutzer verfügbar.
> Die lokale KI (Ollama) funktioniert ohne API-Key für alle Nutzer.

---

### ❓ Gerki antwortet auf Deutsch aber ich will Englisch

**Lösung:**
- Schreibe deiner Nachricht einfach auf Englisch
- Gerki antwortet in der Sprache, in der du schreibst

---

## Performance

### ❓ KI-Antworten kommen sehr langsam

**Mögliche Ursachen und Lösungen:**

| Ursache | Lösung |
|---|---|
| Zu wenig RAM | Andere Apps schließen; kleineres Modell wählen |
| Falsches Modell | Mistral 7B statt größere Modelle verwenden |
| CPU-only (kein GPU) | Ollama nutzt GPU automatisch wenn vorhanden |
| Thermisches Drosseln | PC/Mac abkühlen lassen, Lüftungsschlitze frei |

```bash
# Aktive Modelle prüfen:
ollama ps

# CPU vs GPU Nutzung:
ollama run mistral "hallo" --verbose
# Achte auf "total duration" und "load duration"
```

---

### ❓ Gerki verwendet viel RAM

**Erwarteter Verbrauch:**
- Gerki selbst: ~200-400 MB
- Ollama + Mistral: ~5-6 GB
- **Gesamt: ~6-7 GB**

Das ist normal. Mit 16 GB RAM läuft alles flüssig.

---

### ❓ Dateizugriff findet keine Dokumente

**Lösung:**
1. Gerki → Dateien → Ordner hinzufügen (Ordner mit deinen Dokumenten auswählen)
2. Warten bis Indexierung abgeschlossen
3. Dann im Chat fragen: "Suche nach Datei XYZ"

---

## Hilfe bekommen

- **GitHub Issues:** github.com/mustafafinnentrop-stack/Claude/issues
- **E-Mail:** support@gerki.app
- **Dokumentation:** docs.gerki.app
