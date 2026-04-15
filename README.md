# F5 Crypto | GMX Investment Dashboard

Fundamentale Analyse des GMX-Tokens (Perp DEX) fuer das F5 Crypto Investmentkomitee.

**Live:** [f5-gmx-dashboard.vercel.app](https://f5-gmx-dashboard.vercel.app)

## Features

- Executive Summary mit Investment-These Score
- Fundamentale Kennzahlen (TVL, Fees, Revenue, P/S Ratio)
- Tokenomics & Value Accrual Analyse
- Wettbewerbsvergleich (Hyperliquid, dYdX, Jupiter, Vertex, Aevo)
- Analysten-Meinungen & Sentiment
- News-Timeline
- Risikobewertung
- Auto-Update alle 2 Wochen via GitHub Actions

## Tech Stack

- **Next.js 14+** (App Router)
- **Tailwind CSS** (Dark Mode)
- **Recharts** (Visualisierungen)
- **TypeScript**

## Datenquellen

| Quelle | API | Daten |
|--------|-----|-------|
| DeFiLlama | `api.llama.fi/protocol/gmx` | TVL, Fees, Revenue |
| CoinGecko | `api.coingecko.com/api/v3/coins/gmx` | Preis, MCap, Supply |
| DeFiLlama | `api.llama.fi/summary/fees/gmx` | Fee-Historie |
| Manuell | `data/news.json` | News, Analysten-Meinungen |

## Setup

```bash
# Dependencies installieren
npm install

# Lokaler Dev-Server
npm run dev

# Daten aktualisieren
npm run fetch-data

# Production Build
npm run build
```

## Daten-Update

Daten werden automatisch via GitHub Actions aktualisiert:
- **Schedule:** 1. und 15. jeden Monats, 06:00 UTC
- **Workflow:** `.github/workflows/update-data.yml`
- **Manuell:** Workflow kann auch manuell im GitHub Actions Tab getriggert werden

Die JSON-Dateien unter `data/` werden aktualisiert und committet.
Vercel re-deployt automatisch bei Push.

## Projektstruktur

```
data/           # Gecachte JSON-Daten (vom Cron-Job aktualisiert)
docs/           # IC-Teaser Summary, Research Findings
scripts/        # Data-Fetcher Scripts
src/
  app/          # Next.js App Router
  components/   # React-Komponenten
.github/
  workflows/    # GitHub Actions Cron-Job
```

## Weitere F5 Dashboards

- [F5 Crypto Dashboard](https://f5-crypto-dashboard.vercel.app/)
- [F5 Fonds Dashboard](https://f5-crypto-fonds-dashboard.vercel.app/)
- [F5 TPM Dashboard](https://f5-crypto-tpm-dashboard.vercel.app/)

---

F5 Crypto Capital GmbH | Berlin
