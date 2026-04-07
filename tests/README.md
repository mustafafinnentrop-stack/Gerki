# Gerki E2E Tests (Playwright)

## Voraussetzungen

- Node.js 22+
- Echter Desktop (macOS, Windows, Linux mit Display)
- `GERKI_TEST_PASSWORD` Environment-Variable (Dev-Account Passwort)

## Tests ausführen

```bash
# Alle Tests (baut App automatisch)
npm test

# Mit sichtbarem Fenster (empfohlen für lokales Debugging)
npm run test:headed

# Nur Startup-Tests (kein Login nötig)
npx playwright test tests/e2e/01-startup.spec.ts

# Mit Dev-Account (Login + UI + Chat Tests)
GERKI_TEST_PASSWORD=DeinPasswort npm test

# HTML-Report anzeigen
npm run test:report
```

## Statische Checks (funktioniert auch in CI)

```bash
# TypeScript + ESLint — kein Display nötig
npm run check
```

## Test-Struktur

| Datei | Was wird getestet |
|---|---|
| `01-startup.spec.ts` | App startet, Fenster erscheint, kein JS-Crash |
| `02-login.spec.ts` | Login-Flow, Fehler bei falschen Credentials |
| `03-ui.spec.ts` | Navigation, Chat-Eingabe, neuer Chat |
| `04-chat.spec.ts` | Nachricht senden, Download-Dropdown |

## Hinweis zu CI

Playwright E2E Tests benötigen einen echten Electron-Renderer (GPU).  
In headless CI-Umgebungen (Docker ohne GPU) laufen nur statische Checks:

```bash
npm run check  # Lint + TypeScript — immer grün
```
