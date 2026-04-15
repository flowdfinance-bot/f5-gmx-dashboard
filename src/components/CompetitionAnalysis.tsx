"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

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
  };
}

const COLORS = [
  "#3b82f6", "#22c55e", "#eab308", "#ef4444",
  "#8b5cf6", "#ec4899", "#06b6d4", "#f97316",
];

function formatUSD(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}M`;
  return `$${n.toFixed(0)}`;
}

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
    </section>
  );
}
