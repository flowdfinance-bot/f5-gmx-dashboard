"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface FundamentalMetricsProps {
  market: {
    price: number;
    priceChange24h: number;
    priceChange7d: number;
    priceChange30d: number;
    priceChange1y: number;
    ath: number;
    athDate: string;
    atl: number;
    atlDate: string;
    circulatingSupply: number;
    maxSupply: number;
    mcapToTvlRatio: number;
    volume24h: number;
  };
  protocol: {
    tvl: number;
    fees: { daily: number; weekly: number; monthly: number; allTime: number };
  };
  tvlHistory: {
    monthly: { date: string; tvl: number }[];
  };
}

function formatUSD(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111118] border border-[#2e2e3e] rounded-lg p-3 shadow-xl">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-white">
          {formatUSD(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function FundamentalMetrics({
  market,
  protocol,
  tvlHistory,
}: FundamentalMetricsProps) {
  const tvlChartData = tvlHistory.monthly.map((d) => ({
    date: d.date,
    tvl: d.tvl / 1_000_000,
  }));

  const feeData = [
    { name: "Taeglich", value: protocol.fees.daily },
    { name: "Woechentlich", value: protocol.fees.weekly },
    { name: "Monatlich", value: protocol.fees.monthly },
  ];

  const priceFromATH =
    ((market.price - market.ath) / market.ath) * 100;

  const annualizedRevenue = protocol.fees.monthly * 12;
  const psRatio =
    market.price * market.circulatingSupply > 0
      ? (market.price * market.circulatingSupply) / annualizedRevenue
      : 0;

  return (
    <section id="fundamentals">
      <h2 className="section-title">Fundamentale Kennzahlen</h2>

      {/* Price Performance Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: "24h", value: market.priceChange24h },
          { label: "7d", value: market.priceChange7d },
          { label: "30d", value: market.priceChange30d },
          { label: "1y", value: market.priceChange1y },
          { label: "vs ATH", value: priceFromATH },
          {
            label: "MCap/TVL",
            value: market.mcapToTvlRatio,
            isRatio: true,
          },
        ].map((item) => (
          <div key={item.label} className="card text-center">
            <p
              className={`text-lg font-bold ${
                "isRatio" in item
                  ? "text-blue-400"
                  : item.value >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {"isRatio" in item
                ? item.value.toFixed(2) + "x"
                : (item.value >= 0 ? "+" : "") + item.value.toFixed(1) + "%"}
            </p>
            <p className="text-xs text-gray-500 mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* TVL Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-white">
              TVL ueber Zeit
            </h3>
            <span className="text-sm text-gray-400">
              Aktuell: {formatUSD(protocol.tvl)}
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tvlChartData}>
                <defs>
                  <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "#6b7280" }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#6b7280" }}
                  tickFormatter={(v) => `$${v}M`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="tvl"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#tvlGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Quelle: DeFiLlama API | api.llama.fi/protocol/gmx
          </p>
        </div>

        {/* Fees Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-white">
              Fees & Revenue
            </h3>
            <span className="text-sm text-gray-400">
              All-Time: {formatUSD(protocol.fees.allTime)}
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#6b7280" }}
                  tickFormatter={(v) => formatUSD(v)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Quelle: DeFiLlama API | api.llama.fi/summary/fees/gmx
          </p>
        </div>
      </div>

      {/* Additional Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-xs text-gray-500 mb-1">P/S Ratio (annualisiert)</p>
          <p className="text-xl font-bold text-white">{psRatio.toFixed(1)}x</p>
          <p className="text-xs text-gray-500">
            MCap / (Monatl. Fees x 12)
          </p>
        </div>
        <div className="card">
          <p className="text-xs text-gray-500 mb-1">Annualisierte Revenue</p>
          <p className="text-xl font-bold text-green-400">
            {formatUSD(annualizedRevenue)}
          </p>
          <p className="text-xs text-gray-500">Basiert auf 30d Fees</p>
        </div>
        <div className="card">
          <p className="text-xs text-gray-500 mb-1">ATH / ATL</p>
          <p className="text-lg font-bold text-white">
            ${market.ath} / ${market.atl}
          </p>
          <p className="text-xs text-gray-500">
            {market.athDate} / {market.atlDate}
          </p>
        </div>
        <div className="card">
          <p className="text-xs text-gray-500 mb-1">24h Volume</p>
          <p className="text-xl font-bold text-white">
            {formatUSD(market.volume24h)}
          </p>
          <p className="text-xs text-gray-500">CoinGecko</p>
        </div>
      </div>
    </section>
  );
}
