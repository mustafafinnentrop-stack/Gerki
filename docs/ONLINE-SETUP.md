# Gerki – Registrierung, Login & Landing Page online bringen

---

## Teil 1: Wie funktioniert die Registrierung/Login in Gerki?

### Kurzantwort: Alles ist bereits fertig!

Gerki verwendet **lokale Nutzerkonten** – kein Server nötig.
Das bedeutet:
- Registrierung und Login funktionieren **ohne Backend-Server**
- Alle Daten liegen in einer **SQLite-Datenbank** auf dem PC des Nutzers
- Passwörter werden mit **PBKDF2** (sicheres Hashing) gespeichert
- Du brauchst **keinen Hosting-Provider** für die App selbst

### Was wurde implementiert (already done):
```
gerki-app/
├── src/main/core/auth.ts          ← Backend: Login, Register, Passwort-Hashing
├── src/main/ipc/handlers.ts       ← IPC-Bridge: Main ↔ Renderer
├── src/renderer/src/pages/
│   ├── Login.tsx                  ← Login-Bildschirm
│   ├── Register.tsx               ← Registrierungs-Bildschirm
│   └── Account.tsx                ← Konto-Verwaltung
└── src/main/db/schema.ts          ← Datenbank-Tabelle: users
```

### Falls du später einen echten Backend-Server willst:

Für eine **Supabase** (kostenlos, einfach) Integration:

```bash
npm install @supabase/supabase-js
```

Supabase gibt dir:
- Online-Registrierung und Login
- Passwort zurücksetzen via E-Mail
- Geräteübergreifende Synchronisation
- Kostenlos bis 50.000 aktive Nutzer

Alternativ: **Firebase** (Google) oder **Auth0**

---

## Teil 2: Landing Page online bringen

### Option A: Vercel (empfohlen – kostenlos, einfach)

**Was ist Vercel?** Ein Hosting-Dienst der deine Website automatisch aus GitHub deployt.

#### Schritt-für-Schritt:

**1. Vercel-Account erstellen:**
```
1. Gehe zu vercel.com
2. "Sign Up" → "Continue with GitHub"
3. Mit deinem GitHub-Account anmelden
```

**2. GitHub Repository vorbereiten:**
```bash
# Stelle sicher dass die Landing Page committed und gepusht ist:
git add gerki/
git commit -m "feat: landing page ready for deployment"
git push origin claude/gerki-landing-page-867LB
```

**3. Repository auf GitHub in main/master mergen:**
```bash
# Erstelle einen PR auf GitHub:
# gerki-landing-page-867LB → main

# Oder direkt auf main pushen (wenn du Rechte hast):
git checkout main
git merge claude/gerki-landing-page-867LB
git push origin main
```

**4. Vercel Deployment:**
```
1. Vercel Dashboard → "Add New Project"
2. "Import Git Repository"
3. Dein Repository auswählen: mustafafinnentrop-stack/Claude
4. Framework Preset: "Vite" oder "React"
5. Root Directory: "gerki" (wichtig! Nicht das Root-Verzeichnis)
6. Build Command: npm run build
7. Output Directory: dist
8. "Deploy" klicken
```

**5. Fertig!** Vercel gibt dir eine URL wie:
```
https://gerki-landing.vercel.app
```

**6. Eigene Domain (optional):**
```
Vercel Dashboard → Dein Projekt → Settings → Domains
→ "Add" → "gerki.app" eingeben
→ Beim Domain-Anbieter: DNS-Einträge anpassen (CNAME/A-Record)
```

---

### Option B: Netlify (ebenfalls kostenlos)

```
1. netlify.com → "Sign up" mit GitHub
2. "New site from Git"
3. Repository auswählen
4. Base directory: gerki
5. Build command: npm run build
6. Publish directory: gerki/dist
7. "Deploy site"
```

---

### Option C: GitHub Pages (für statische Sites)

```bash
# In gerki/package.json, füge hinzu:
# "homepage": "https://mustafafinnentrop-stack.github.io/gerki"

# GitHub Pages Action erstellen:
# .github/workflows/deploy-landing.yml

# Inhalt:
name: Deploy Landing Page
on:
  push:
    branches: [main]
    paths: ['gerki/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: '20' }
      - run: cd gerki && npm install && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: gerki/dist
```

---

### Landing Page Build-Prozess verstehen

Die Landing Page befindet sich in `gerki/`:
```
gerki/
├── src/
│   ├── App.tsx              ← Haupt-App mit allen Sections
│   └── components/
│       └── landing/
│           ├── HeroSection.tsx      ← Headliner oben
│           ├── PricingSection.tsx   ← Preise
│           ├── FeaturesSection.tsx  ← Features
│           └── FAQSection.tsx       ← FAQ
├── package.json
└── vite.config.ts
```

**Lokal testen:**
```bash
cd gerki
npm install
npm run dev
# → Browser öffnet sich automatisch mit der Landing Page
```

**Für Produktion bauen:**
```bash
npm run build
# → Statische Dateien in gerki/dist/
# Diese Dateien auf einen Webserver hochladen
```

---

## Teil 3: Domain kaufen und einrichten

### Empfohlene Domain-Anbieter

| Anbieter | Preis/Jahr | Besonderheit |
|---|---|---|
| **Namecheap** | ~10€ | Günstig, gute UI |
| **Cloudflare** | ~10€ | + kostenloser CDN/DDoS-Schutz |
| **Hetzner** | ~12€ | Deutsch, DSGVO-konform |

### DNS-Einrichtung für Vercel

Wenn du z.B. `gerki.app` bei Namecheap gekauft hast:

```
Bei Namecheap → Advanced DNS:

Typ    | Host | Wert
-------|------|------
A      | @    | 76.76.21.21  (Vercel IP)
CNAME  | www  | cname.vercel-dns.com
```

Nach ~24 Stunden ist die Domain aktiv.

---

## Zusammenfassung

| Was | Wo | Kosten |
|---|---|---|
| **App (Login/Register)** | Lokal im Electron-App | Kostenlos, fertig |
| **Landing Page** | Vercel/Netlify | Kostenlos |
| **Domain** | Namecheap/Cloudflare | ~10€/Jahr |
| **Backend (optional)** | Supabase | Kostenlos bis 50k Nutzer |

**Deine Checkliste:**
- [x] Login/Register im Electron-App ✅ (bereits implementiert)
- [ ] GitHub Repository auf `main` mergen
- [ ] Vercel-Account erstellen (vercel.com)
- [ ] Landing Page deployen (10 Minuten)
- [ ] Optional: Domain kaufen (~10€)
