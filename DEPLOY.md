# Napojení GREENBETT — GitHub + Supabase + Vercel

Postup krok za krokem (cca 20 minut).

---

## 1. GitHub

### A) Nový repozitář

1. Otevři [github.com/new](https://github.com/new)
2. Název: `greenbett` (nebo dle preference)
3. **Private** nebo Public
4. **NEZAŠKRTÁVEJ** „Add README“ — projekt už README má
5. Klikni **Create repository**

### B) Push kódu z počítače

V PowerShellu v `d:\greenbett`:

```powershell
git init
git add .
git commit -m "Initial commit: GREENBETT Next.js app"
git branch -M main
git remote add origin https://github.com/TVUJ_USERNAME/greenbett.git
git push -u origin main
```

Nahraď `TVUJ_USERNAME` svým GitHub účtem.

---

## 2. Supabase

### A) Vytvoření projektu

1. [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**
2. Název: `greenbett`
3. Region: **Frankfurt (eu-central-1)** — blízko Vercel `fra1`
4. Heslo k DB si ulož
5. Počkej ~2 minuty na vytvoření

### B) Spuštění migrace

1. V Supabase dashboardu: **SQL Editor** → **New query**
2. Zkopíruj celý obsah souboru `supabase/migrations/001_initial_schema.sql`
3. **Run** — mělo by proběhnout bez chyby

### C) API klíče

1. **Project Settings** → **API**
2. Zkopíruj:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** (secret!) → `SUPABASE_SERVICE_ROLE_KEY`

### D) Auth redirect URLs (důležité pro login)

1. **Authentication** → **URL Configuration**
2. **Site URL:** `http://localhost:3000` (pro dev)
3. **Redirect URLs** přidej:
   ```
   http://localhost:3000/**
   https://tvuj-projekt.vercel.app/**
   https://*.vercel.app/**
   ```

### E) Google OAuth (volitelné)

1. **Authentication** → **Providers** → **Google** → Enable
2. Vyplň Client ID a Secret z [Google Cloud Console](https://console.cloud.google.com/)

### F) Lokální `.env.local`

```powershell
copy .env.example .env.local
```

Vyplň minimálně:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
```

---

## 3. Vercel

### A) Import z GitHubu

1. [vercel.com/new](https://vercel.com/new)
2. **Import Git Repository** → vyber `greenbett`
3. Framework: **Next.js** (automaticky)
4. Root Directory: `.` (kořen repa)

### B) Environment Variables

V sekci **Environment Variables** přidej (pro Production + Preview + Development):

| Proměnná | Hodnota |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | z Supabase API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | z Supabase API |
| `SUPABASE_SERVICE_ROLE_KEY` | z Supabase API (Production only) |
| `STRIPE_SECRET_KEY` | později |
| `STRIPE_WEBHOOK_SECRET` | později |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | později |
| `TELEGRAM_BOT_TOKEN` | později |
| `TELEGRAM_CHANNEL_ID` | později |

### C) Deploy

1. Klikni **Deploy**
2. Po deployi zkopíruj URL (např. `https://greenbett-xxx.vercel.app`)

### D) Aktualizuj Supabase redirect

V Supabase **Authentication → URL Configuration** nastav:

- **Site URL:** `https://greenbett-xxx.vercel.app`
- Redirect URLs už máš z kroku 2D

---

## 4. Ověření

Po deployi otestuj:

- [ ] Homepage načítá design
- [ ] `/prihlaseni` — registrace emailem
- [ ] `/dashboard` — redirect na login (middleware)
- [ ] `/admin` — redirect pokud nejsi analyst/admin
- [ ] API: `https://tvuj-projekt.vercel.app/api/matches` vrací JSON

---

## 5. Volitelné — Stripe webhook na Vercel

1. Stripe Dashboard → Webhooks → Add endpoint
2. URL: `https://tvuj-projekt.vercel.app/api/webhooks/stripe`
3. Events: `checkout.session.completed`, `invoice.paid`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Webhook secret → `STRIPE_WEBHOOK_SECRET` ve Vercel env

---

## Rychlé příkazy

```powershell
# Lokální vývoj
cd d:\greenbett
npm install
npm run dev

# Push změn na GitHub (→ auto redeploy na Vercel)
git add .
git commit -m "popis změny"
git push
```

---

## Řešení problémů

| Problém | Řešení |
|---------|--------|
| `npm install` SSL chyba | `$env:NODE_TLS_REJECT_UNAUTHORIZED=0` před `npm install` |
| Login nefunguje na Vercel | Zkontroluj Redirect URLs v Supabase |
| Middleware redirect loop | Ověř `NEXT_PUBLIC_SUPABASE_*` ve Vercel env |
| Build fail na Vercel | Zkontroluj build log — často chybí env proměnné |
