import * as fs from "fs";
import * as path from "path";

const DATA_DIR = path.join(__dirname, "..", "data");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function fetchJSON(url: string): Promise<any> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

// --------------- DeFiLlama: TVL ---------------
async function fetchTVL() {
  console.log("[1/4] Fetching TVL from DeFiLlama...");
  const data = await fetchJSON("https://api.llama.fi/protocol/gmx");

  const tvlByChain: Record<string, number> = {};
  if (data.currentChainTvls) {
    for (const [chain, val] of Object.entries(data.currentChainTvls)) {
      tvlByChain[chain.toLowerCase().replace(/[^a-z0-9]/g, "")] =
        Math.round(val as number);
    }
  }

  // Extract monthly TVL from daily data
  const monthly: { date: string; tvl: number }[] = [];
  const seen = new Set<string>();
  if (data.tvl && Array.isArray(data.tvl)) {
    for (const point of data.tvl) {
      const d = new Date(point.date * 1000);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (!seen.has(key)) {
        seen.add(key);
        monthly.push({ date: key, tvl: Math.round(point.totalLiquidityUSD) });
      }
    }
  }

  // Keep last 36 months
  const recentMonthly = monthly.slice(-36);

  const tvlHistory = {
    lastUpdated: today(),
    source: "DeFiLlama API",
    monthly: recentMonthly,
  };

  const protocol: any = {
    lastUpdated: today(),
    tvl: Math.round(data.tvl?.[data.tvl.length - 1]?.totalLiquidityUSD ?? 0),
    tvlBreakdown: tvlByChain,
    chains: data.chains ?? [],
    description: data.description ?? "",
    category: data.category ?? "Derivatives",
  };

  fs.writeFileSync(
    path.join(DATA_DIR, "tvl-history.json"),
    JSON.stringify(tvlHistory, null, 2)
  );

  return protocol;
}

// --------------- DeFiLlama: Fees ---------------
async function fetchFees() {
  console.log("[2/4] Fetching Fees from DeFiLlama...");
  const data = await fetchJSON("https://api.llama.fi/summary/fees/gmx");

  return {
    daily: Math.round(data.total24h ?? 0),
    weekly: Math.round((data.total7d ?? data.total24h * 7) ?? 0),
    monthly: Math.round((data.total30d ?? data.total24h * 30) ?? 0),
    allTime: Math.round(data.totalAllTime ?? 0),
  };
}

// --------------- CoinGecko: Market Data ---------------
async function fetchMarketData() {
  console.log("[3/4] Fetching Market Data from CoinGecko...");
  const data = await fetchJSON(
    "https://api.coingecko.com/api/v3/coins/gmx?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
  );

  const md = data.market_data;
  const market = {
    lastUpdated: today(),
    price: md?.current_price?.usd ?? 0,
    priceChange24h: md?.price_change_percentage_24h ?? 0,
    priceChange7d: md?.price_change_percentage_7d ?? 0,
    priceChange30d: md?.price_change_percentage_30d ?? 0,
    priceChange1y: md?.price_change_percentage_1y ?? 0,
    marketCap: md?.market_cap?.usd ?? 0,
    fdv: md?.fully_diluted_valuation?.usd ?? 0,
    volume24h: md?.total_volume?.usd ?? 0,
    circulatingSupply: md?.circulating_supply ?? 0,
    totalSupply: md?.total_supply ?? 0,
    maxSupply: md?.max_supply ?? 13250000,
    ath: md?.ath?.usd ?? 0,
    athDate: md?.ath_date?.usd?.slice(0, 10) ?? "",
    atl: md?.atl?.usd ?? 0,
    atlDate: md?.atl_date?.usd?.slice(0, 10) ?? "",
    marketCapRank: md?.market_cap_rank ?? data.market_cap_rank ?? 0,
    mcapToTvlRatio: 0,
    source: "CoinGecko API",
  };

  return market;
}

// --------------- DeFiLlama: Competitor TVLs ---------------
async function fetchCompetitorTVLs() {
  console.log("[4/4] Fetching Competitor TVLs...");
  const targets = ["hyperliquid", "dydx", "jupiter", "vertex-protocol", "aevo"];
  const updates: Record<string, number> = {};

  for (const slug of targets) {
    try {
      const data = await fetchJSON(`https://api.llama.fi/protocol/${slug}`);
      const tvl = data.tvl?.[data.tvl.length - 1]?.totalLiquidityUSD ?? 0;
      updates[slug] = Math.round(tvl);
    } catch {
      console.warn(`  Could not fetch TVL for ${slug}`);
    }
  }

  // Update competitors.json TVL values
  const compPath = path.join(DATA_DIR, "competitors.json");
  if (fs.existsSync(compPath)) {
    const comp = JSON.parse(fs.readFileSync(compPath, "utf-8"));
    comp.lastUpdated = today();

    const slugMap: Record<string, string> = {
      "Hyperliquid": "hyperliquid",
      "dYdX v4": "dydx",
      "Jupiter Perps": "jupiter",
      "Vertex": "vertex-protocol",
      "Aevo": "aevo",
    };

    for (const entry of comp.comparison) {
      const slug = slugMap[entry.name];
      if (slug && updates[slug]) {
        entry.tvl = updates[slug];
      }
    }

    fs.writeFileSync(compPath, JSON.stringify(comp, null, 2));
  }

  return updates;
}

// --------------- Main ---------------
async function main() {
  ensureDir(DATA_DIR);
  console.log("=== GMX Dashboard Data Update ===");
  console.log(`Date: ${today()}\n`);

  try {
    // Fetch all data
    const [protocolBase, fees, market] = await Promise.all([
      fetchTVL(),
      fetchFees(),
      fetchMarketData(),
    ]);

    // Merge protocol data
    const existingProtocol = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, "protocol.json"), "utf-8")
    );

    const protocol = {
      ...existingProtocol,
      lastUpdated: today(),
      tvl: protocolBase.tvl,
      tvlBreakdown: protocolBase.tvlBreakdown,
      chains: protocolBase.chains,
      fees,
    };

    // Calculate MCap/TVL ratio
    if (protocol.tvl > 0) {
      market.mcapToTvlRatio =
        Math.round((market.marketCap / protocol.tvl) * 100) / 100;
    }

    // Write files
    fs.writeFileSync(
      path.join(DATA_DIR, "market.json"),
      JSON.stringify(market, null, 2)
    );
    fs.writeFileSync(
      path.join(DATA_DIR, "protocol.json"),
      JSON.stringify(protocol, null, 2)
    );

    console.log("\nMarket data written to data/market.json");
    console.log("Protocol data written to data/protocol.json");
    console.log("TVL history written to data/tvl-history.json");

    // Fetch competitor TVLs
    await fetchCompetitorTVLs();
    console.log("Competitor data updated in data/competitors.json");

    console.log("\n=== Update complete! ===");
  } catch (err) {
    console.error("Error during data fetch:", err);
    process.exit(1);
  }
}

main();
