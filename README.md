# GREENBETT

Analytický servis pro sázkaře — Next.js 14 aplikace s Supabase backendem, připravená na napojení sportovních API, Stripe platební brány a Telegram bota.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript (strict)
- **Styling:** Tailwind CSS + custom CSS variables (pixel-perfect dle prototypu)
- **Backend:** Supabase (Auth, PostgreSQL, RLS)
- **Platby:** Stripe Checkout + Webhooks
- **Grafy:** Recharts
- **Notifikace:** Telegram Bot API
- **Sport API:** API-Football, API-Sports, The Odds API, PandaScore (mock data + připravené wrappery)

## Instalace

```bash
cd greenbett
npm install
cp .env.example .env.local
```

### Supabase setup

1. Vytvoř projekt na [supabase.com](https://supabase.com)
2. Zkopíruj `NEXT_PUBLIC_SUPABASE_URL` a `NEXT_PUBLIC_SUPABASE_ANON_KEY` do `.env.local`
3. V SQL Editoru spusť migraci: `supabase/migrations/001_initial_schema.sql`
4. Zapni Google OAuth v Authentication → Providers (volitelné)
5. Zkopíruj `SUPABASE_SERVICE_ROLE_KEY` pro webhooky

## Spuštění

```bash
npm run dev
```

Aplikace běží na [http://localhost:3000](http://localhost:3000).

## Struktura projektu

```
src/
├── app/                    # Stránky (App Router) + API routes
│   ├── page.tsx            # Homepage
│   ├── sporty/             # Sport instruments (XTB styl)
│   ├── live/               # Live dashboard
│   ├── scanner/            # Value bet scanner
│   ├── kalkulacka/         # Bankroll kalkulačka
│   ├── leaderboard/        # Tipérský žebříček
│   ├── forum/              # Fórum kategorie
│   ├── statistiky/         # Statistiky lig
│   ├── vysledky/           # Veřejná evidence signálů
│   ├── cenik/              # Cenové plány
│   ├── prihlaseni/         # Login
│   ├── registrace/         # Registrace
│   ├── dashboard/          # Klientská zóna (chráněná)
│   ├── admin/              # Admin panel (chráněná)
│   ├── profil/[username]/  # Veřejný profil tipéra
│   └── api/                # REST API endpoints
├── components/             # React komponenty
├── lib/                    # Supabase, Stripe, Telegram, API wrappery
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript typy
├── middleware.ts           # Auth ochrana rout
└── styles/globals.css      # Globální styly + CSS variables
```

## Funkční stránky (mock data)

| Stránka | URL | Status |
|---------|-----|--------|
| Homepage | `/` | ✅ Count-up, signal card |
| Sporty | `/sporty` | ✅ 7 tabů, floating logy |
| Live Dashboard | `/live` | ✅ Filtry, match karty |
| Value Scanner | `/scanner` | ✅ EV badges, filtry |
| Kalkulačka | `/kalkulacka` | ✅ Kelly criterion |
| Leaderboard | `/leaderboard` | ✅ Rank badges |
| Fórum | `/forum` | ✅ Kategorie |
| Statistiky | `/statistiky` | ✅ Liga karty |
| Výsledky | `/vysledky` | ✅ Track record |
| Ceník | `/cenik` | ✅ 3 plány |
| Přihlášení | `/prihlaseni` | ✅ Email + Google |
| Registrace | `/registrace` | ✅ Email + Google |
| Dashboard | `/dashboard` | ✅ Bankroll graf |
| Admin | `/admin` | ✅ Signál CRUD |
| Profil | `/profil/[username]` | ✅ ROI graf |

## Napojení reálných API

### API-Football

1. Registrace na [api-football.com](https://www.api-football.com/)
2. Nastav `API_FOOTBALL_KEY` v `.env.local`
3. V `src/lib/api/football.ts` odkomentuj reálný fetch blok a smaž mock data

### The Odds API

1. Registrace na [the-odds-api.com](https://the-odds-api.com/)
2. Nastav `THE_ODDS_API_KEY`
3. V `src/lib/api/odds.ts` odkomentuj reálný call

### PandaScore (Esporty)

1. Registrace na [pandascore.co](https://pandascore.co/)
2. Nastav `PANDASCORE_API_KEY`
3. V `src/lib/api/esports.ts` odkomentuj reálný call

### Stripe

1. Vytvoř produkty v [Stripe Dashboard](https://dashboard.stripe.com/)
2. Nastav `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Nastav price IDs: `STRIPE_PRICE_MONTHLY`, `STRIPE_PRICE_QUARTERLY`, `STRIPE_PRICE_YEARLY`
4. V `src/app/api/checkout/route.ts` odkomentuj Stripe session kód
5. V `src/app/api/webhooks/stripe/route.ts` odkomentuj webhook handlery
6. Webhook URL: `https://your-domain.com/api/webhooks/stripe`

### Telegram Bot

1. Vytvoř bota přes [@BotFather](https://t.me/BotFather)
2. Přidej bota do kanálu/skupiny
3. Nastav `TELEGRAM_BOT_TOKEN` a `TELEGRAM_CHANNEL_ID`
4. V `src/lib/telegram/bot.ts` odkomentuj fetch na Telegram API

## Deployment na Vercel

1. Push repozitář na GitHub
2. Importuj projekt ve [Vercel](https://vercel.com)
3. Nastav všechny env proměnné z `.env.example`
4. Deploy — Vercel automaticky detekuje Next.js
5. Nastav Stripe webhook URL na produkční doménu
6. V Supabase nastav Site URL a Redirect URLs na produkční doménu

## License

Proprietary — GREENBETT © 2024
