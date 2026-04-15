"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface FeeProtocol {
  name: string;
  dailyFees: number | null;
  monthlyFees: number | null;
  allTimeFees: number | null;
  dailyRevenue: number | null;
  monthlyRevenue: number | null;
  allTimeRevenue: number | null;
  revenueModel: string;
  mcap: number | null;
}

interface CompetitionProps {
  data: {
    volumeMarketShare: {
      data: { name: string; share: number }[];
    };
    comparison: {
      name: string;
      chain: string;
      tvl: number;
      marketCap: number;
      model: string;
      feeDistribution: string;
      maxLeverage: string;
      buyback: string;
      strength: string;
      weakness: string;
    }[];
    feeComparison: {
      source: string;
      lastUpdated: string;
      protocols: FeeProtocol[];
    };
  };
}

const COLORS = [
  "#3b82f6", "#22c55e", "#eab308", "#ef4444",
  "#8b5cf6", "#ec4899", "#06b6d4", "#f97316",
];

function formatUSD(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function formatCompact(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n.toFixed(0)}`;
}

const FeeTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111118] border border-[#2e2e3e] rounded-lg p-3 shadow-xl">
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        <p className="text-sm font-semibold text-white">
          {formatUSD(payload[0].value)} / Monat
        </p>
      </div>
    );
  }
  return null;
};

export default function CompetitionAnalysis({ data }: CompetitionProps) {
  return (
    <section id="competition">
      <h2 className="section-title">Wettbewerbsanalyse</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Market Share Pie */}
        <div className="card">
          <h3 className="text-base font-semibold text-white mb-4">
            Volumen-Marktanteil (Perp DEX)
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.volumeMarketShare.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  dataKey="share"
                  stroke="#0a0a0f"
                  strokeWidth={2}
                >
                  {data.volumeMarketShare.data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#111118",
                    border: "1px solid #2e2e3e",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`${value}%`, "Anteil"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1">
            {data.volumeMarketShare.data.map((item, i) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: COLORS[i % COLORS.length] }}
                  />
                  <span
                    className={
                      item.name === "GMX"
                        ? "text-white font-medium"
                        : "text-gray-400"
                    }
                  >
                    {item.name}
                  </span>
                </div>
                <span className="text-gray-300">{item.share}%</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Quelle: DeFiLlama Perps, CoinGecko Research (Q1 2026)
          </p>
        </div>

        {/* Key Insight */}
        <div className="card lg:col-span-2">
          <h3 className="text-base font-semibold text-white mb-4">
            Wettbewerbsposition
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-3">
              <p className="text-sm font-medium text-red-400 mb-1">
                Volumen-Verlust
              </p>
              <p className="text-xs text-gray-300">
                GMX ist von der Spitzenposition auf unter 3% Volumenanteil gefallen.
                Hyperliquid dominiert mit 44%+ durch CEX-artige Geschwindigkeit
                auf einer eigenen L1.
              </p>
            </div>
            <div className="bg-green-900/10 border border-green-800/30 rounded-lg p-3">
              <p className="text-sm font-medium text-green-400 mb-1">
                TVL-Fuehrerschaft
              </p>
              <p className="text-xs text-gray-300">
                GMX hat weiterhin eines der hoechsten TVLs unter Perp DEXs
                ($347M). LP-Kapital ist &quot;sticky&quot; und repraesentiert echte
                Protokoll-Defensivitaet.
              </p>
            </div>
            <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-3">
              <p className="text-sm font-medium text-yellow-400 mb-1">
                Strukturelles Problem
              </p>
              <p className="text-xs text-gray-300">
                AMM-basierte Perp-Modelle (GMX) verlieren strukturell gegen
                Order-Book-Modelle (Hyperliquid, Lighter) bei professionellem
                und HFT-Flow.
              </p>
            </div>
            <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-3">
              <p className="text-sm font-medium text-blue-400 mb-1">
                Multichain-Strategie
              </p>
              <p className="text-xs text-gray-300">
                GMX expandiert auf Solana, MegaETH und Botanix. V2.2 soll
                Cross-Chain-Trading ohne Netzwerkwechsel ermoeglichen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="card overflow-x-auto">
        <h3 className="text-base font-semibold text-white mb-4">
          Vergleichstabelle
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1e1e2e]">
              <th className="text-left py-3 px-2 text-gray-400 font-medium">
                Protokoll
              </th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium">
                Chain(s)
              </th>
              <th className="text-right py-3 px-2 text-gray-400 font-medium">
                TVL
              </th>
              <th className="text-right py-3 px-2 text-gray-400 font-medium">
                MCap
              </th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium">
                Modell
              </th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium">
                Fee-Verteilung
              </th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium">
                Buyback
              </th>
            </tr>
          </thead>
          <tbody>
            {data.comparison.map((comp) => (
              <tr
                key={comp.name}
                className={`border-b border-[#1e1e2e] ${
                  comp.name === "GMX"
                    ? "bg-blue-900/10"
                    : "hover:bg-[#16161f]"
                }`}
              >
                <td className="py-3 px-2">
                  <span
                    className={
                      comp.name === "GMX"
                        ? "text-blue-400 font-semibold"
                        : "text-white"
                    }
                  >
                    {comp.name}
                  </span>
                </td>
                <td className="py-3 px-2 text-gray-400 text-xs">
                  {comp.chain}
                </td>
                <td className="py-3 px-2 text-right text-gray-300">
                  {formatUSD(comp.tvl)}
                </td>
                <td className="py-3 px-2 text-right text-gray-300">
                  {formatUSD(comp.marketCap)}
                </td>
                <td className="py-3 px-2 text-gray-400 text-xs">
                  {comp.model}
                </td>
                <td className="py-3 px-2 text-gray-400 text-xs">
                  {comp.feeDistribution}
                </td>
                <td className="py-3 px-2 text-gray-400 text-xs">
                  {comp.buyback}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-500 mt-3">
          Quellen: DeFiLlama, CoinGecko, Projektdokumentationen | Schaetzwerte,
          Stand Q1 2026
        </p>
      </div>

      {/* Fee Comparison */}
      {data.feeComparison && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Monthly Fees Bar Chart */}
            <div className="card lg:col-span-2">
              <h3 className="text-base font-semibold text-white mb-4">
                Monatliche Fees im Vergleich
              </h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.feeComparison.protocols
                      .filter((p) => p.monthlyFees != null)
                      .sort((a, b) => (b.monthlyFees ?? 0) - (a.monthlyFees ?? 0))}
                    layout="vertical"
                    margin={{ left: 80 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: "#6b7280" }}
                      tickFormatter={(v) => `$${formatCompact(v)}`}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 11, fill: "#d1d5db" }}
                      width={75}
                    />
                    <Tooltip content={<FeeTooltip />} />
                    <Bar
                      dataKey="monthlyFees"
                      radius={[0, 4, 4, 0]}
                    >
                      {data.feeComparison.protocols
                        .filter((p) => p.monthlyFees != null)
                        .sort((a, b) => (b.monthlyFees ?? 0) - (a.monthlyFees ?? 0))
                        .map((p) => (
                          <Cell
                            key={p.name}
                            fill={p.name === "GMX" ? "#3b82f6" : "#374151"}
                          />
                        ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Quelle: DeFiLlama Fees API ({data.feeComparison.lastUpdated})
              </p>
            </div>

            {/* Key Fee Insights */}
            <div className="card">
              <h3 className="text-base font-semibold text-white mb-4">
                Fee-Einordnung
              </h3>
              <div className="space-y-3">
                {(() => {
                  const gmx = data.feeComparison.protocols.find((p) => p.name === "GMX");
                  const hyper = data.feeComparison.protocols.find((p) => p.name === "Hyperliquid");
                  const gmxAnnualRevenue = gmx?.monthlyRevenue ? gmx.monthlyRevenue * 12 : 0;
                  const gmxPS = gmx?.mcap && gmxAnnualRevenue ? (gmx.mcap / gmxAnnualRevenue).toFixed(1) : "n/a";
                  const hyperAnnualRevenue = hyper?.monthlyRevenue ? hyper.monthlyRevenue * 12 : 0;
                  const hyperPS = hyper?.mcap && hyperAnnualRevenue ? (hyper.mcap / hyperAnnualRevenue).toFixed(1) : "n/a";
                  return (
                    <>
                      <div className="bg-[#0a0a0f] rounded-lg p-3 border border-[#1e1e2e]">
                        <p className="text-xs text-gray-500 mb-1">GMX P/S Ratio (Revenue)</p>
                        <p className="text-xl font-bold text-blue-400">{gmxPS}x</p>
                        <p className="text-xs text-gray-500 mt-1">
                          vs. Hyperliquid {hyperPS}x
                        </p>
                      </div>
                      <div className="bg-[#0a0a0f] rounded-lg p-3 border border-[#1e1e2e]">
                        <p className="text-xs text-gray-500 mb-1">GMX Annualisierte Revenue</p>
                        <p className="text-xl font-bold text-green-400">
                          {formatUSD(gmxAnnualRevenue)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          vs. HYPE {formatUSD(hyperAnnualRevenue)}
                        </p>
                      </div>
                      <div className="bg-[#0a0a0f] rounded-lg p-3 border border-[#1e1e2e]">
                        <p className="text-xs text-gray-500 mb-1">GMX All-Time Fees</p>
                        <p className="text-xl font-bold text-white">
                          {gmx ? formatUSD(gmx.allTimeFees!) : "n/a"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          vs. HYPE {hyper ? formatUSD(hyper.allTimeFees!) : "n/a"}
                        </p>
                      </div>
                      <div className="bg-green-900/10 border border-green-800/30 rounded-lg p-3">
                        <p className="text-xs text-green-400 font-medium mb-1">Bewertungsvorteil</p>
                        <p className="text-xs text-gray-300">
                          GMX hat mit P/S {gmxPS}x eine deutlich guenstigere Bewertung als
                          die meisten Konkurrenten — bei nachgewiesener, langjaehriger Fee-Generierung.
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Fee Comparison Table */}
          <div className="card mt-6 overflow-x-auto">
            <h3 className="text-base font-semibold text-white mb-4">
              Fee-Vergleich Detailtabelle
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e1e2e]">
                  <th className="text-left py-3 px-2 text-gray-400 font-medium">Protokoll</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">Daily Fees</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">Monthly Fees</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">All-Time Fees</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">Monthly Revenue</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">Ann. Revenue</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">P/S</th>
                  <th className="text-left py-3 px-2 text-gray-400 font-medium">Revenue-Modell</th>
                </tr>
              </thead>
              <tbody>
                {data.feeComparison.protocols.map((p) => {
                  const annRev = p.monthlyRevenue ? p.monthlyRevenue * 12 : null;
                  const ps = p.mcap && annRev ? (p.mcap / annRev).toFixed(1) : null;
                  return (
                    <tr
                      key={p.name}
                      className={`border-b border-[#1e1e2e] ${
                        p.name === "GMX" ? "bg-blue-900/10" : "hover:bg-[#16161f]"
                      }`}
                    >
                      <td className="py-3 px-2">
                        <span className={p.name === "GMX" ? "text-blue-400 font-semibold" : "text-white"}>
                          {p.name}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right text-gray-300">
                        {p.dailyFees != null ? formatUSD(p.dailyFees) : "—"}
                      </td>
                      <td className="py-3 px-2 text-right text-gray-300">
                        {p.monthlyFees != null ? formatUSD(p.monthlyFees) : "—"}
                      </td>
                      <td className="py-3 px-2 text-right text-gray-300">
                        {p.allTimeFees != null ? formatUSD(p.allTimeFees) : "—"}
                      </td>
                      <td className="py-3 px-2 text-right text-gray-300">
                        {p.monthlyRevenue != null ? formatUSD(p.monthlyRevenue) : "—"}
                      </td>
                      <td className="py-3 px-2 text-right text-gray-300 font-medium">
                        {annRev != null ? formatUSD(annRev) : "—"}
                      </td>
                      <td className="py-3 px-2 text-right">
                        {ps != null ? (
                          <span className={parseFloat(ps) < 10 ? "text-green-400 font-semibold" : "text-gray-300"}>
                            {ps}x
                          </span>
                        ) : "—"}
                      </td>
                      <td className="py-3 px-2 text-gray-400 text-xs">
                        {p.revenueModel}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-3">
              Fees = gesamte Protokollgebuehren | Revenue = Anteil der an Token-Holder/Protokoll fliesst |
              P/S = Market Cap / annualisierte Revenue | Quelle: DeFiLlama ({data.feeComparison.lastUpdated})
            </p>
          </div>
        </>
      )}
    </section>
  );
}
