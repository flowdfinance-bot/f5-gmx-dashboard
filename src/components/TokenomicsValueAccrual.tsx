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

interface TokenomicsProps {
  market: {
    circulatingSupply: number;
    maxSupply: number;
    totalSupply: number;
    price: number;
  };
  protocol: {
    feeDistribution: {
      v2: { gmxStakers: number; gmLiquidityProviders: number; treasury: number };
    };
    buyback: {
      totalBoughtBack: number;
      totalSpent: number;
      percentOfSupply: number;
      status: string;
    };
    staking: {
      currentAPR: string;
      historicalAPRRange: string;
      rewardsPausedUntil: string;
      rewardsPausedSince: string;
    };
  };
}

const COLORS = ["#3b82f6", "#22c55e", "#eab308", "#ef4444", "#8b5cf6", "#ec4899"];

export default function TokenomicsValueAccrual({
  market,
  protocol,
}: TokenomicsProps) {
  const allocationData = [
    { name: "Migration (Gambit/XVIX)", value: 45.3, tokens: 6000000 },
    { name: "Uniswap Liquiditaet", value: 15.1, tokens: 2000000 },
    { name: "Escrowed GMX", value: 15.1, tokens: 2000000 },
    { name: "Floor Price Fund", value: 15.1, tokens: 2000000 },
    { name: "Business Development", value: 7.5, tokens: 1000000 },
    { name: "Team", value: 1.9, tokens: 250000 },
  ];

  const feeDistData = [
    {
      name: "GM LPs",
      value: protocol.feeDistribution.v2.gmLiquidityProviders,
    },
    { name: "GMX Staker", value: protocol.feeDistribution.v2.gmxStakers },
    { name: "Treasury", value: protocol.feeDistribution.v2.treasury },
  ];

  const supplyPercent =
    (market.circulatingSupply / market.maxSupply) * 100;

  return (
    <section id="tokenomics">
      <h2 className="section-title">
        Tokenomics & Value Accrual
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Supply Info */}
        <div className="card">
          <h3 className="text-base font-semibold text-white mb-4">
            Token Supply
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Zirkulierend</span>
                <span className="text-white">
                  {(market.circulatingSupply / 1_000_000).toFixed(2)}M
                </span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Max Supply</span>
                <span className="text-white">
                  {(market.maxSupply / 1_000_000).toFixed(2)}M
                </span>
              </div>
              <div className="w-full bg-[#1e1e2e] rounded-full h-2 mt-2">
                <div
                  className="bg-blue-500 rounded-full h-2"
                  style={{ width: `${supplyPercent}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {supplyPercent.toFixed(1)}% der Max Supply im Umlauf
              </p>
            </div>

            <div className="border-t border-[#1e1e2e] pt-3">
              <p className="text-xs text-gray-500 mb-1">Buyback-Status</p>
              <p className="text-sm text-yellow-400 font-medium">
                {protocol.buyback.status}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {(protocol.buyback.totalBoughtBack / 1_000_000).toFixed(2)}M
                Token zurueckgekauft (${(protocol.buyback.totalSpent / 1_000_000).toFixed(1)}M)
              </p>
            </div>

            <div className="border-t border-[#1e1e2e] pt-3">
              <p className="text-xs text-gray-500 mb-1">Staking APR</p>
              <p className="text-sm text-yellow-400 font-medium">
                {protocol.staking.currentAPR}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Rewards pausiert bis {protocol.staking.rewardsPausedUntil}
              </p>
              <p className="text-xs text-gray-500">
                Historisch: {protocol.staking.historicalAPRRange} APR
              </p>
            </div>
          </div>
        </div>

        {/* Token Allocation Pie */}
        <div className="card">
          <h3 className="text-base font-semibold text-white mb-4">
            Initiale Token-Zuteilung
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  dataKey="value"
                  stroke="#0a0a0f"
                  strokeWidth={2}
                >
                  {allocationData.map((_, i) => (
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
          <div className="space-y-1 mt-2">
            {allocationData.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: COLORS[i] }}
                  />
                  <span className="text-gray-400">{item.name}</span>
                </div>
                <span className="text-gray-300">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fee Distribution */}
        <div className="card">
          <h3 className="text-base font-semibold text-white mb-4">
            V2 Fee-Verteilung
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeDistData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "#6b7280" }}
                  tickFormatter={(v) => `${v}%`}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    background: "#111118",
                    border: "1px solid #2e2e3e",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value}%`, "Anteil"]}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {feeDistData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={["#22c55e", "#3b82f6", "#eab308"][i]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Fee Flow Description */}
          <div className="mt-4 space-y-2">
            <div className="bg-[#0a0a0f] rounded-lg p-3 border border-[#1e1e2e]">
              <p className="text-xs text-gray-400">Fee-Fluss (V2)</p>
              <div className="text-xs text-gray-300 mt-1 space-y-1">
                <p>Trading Fees &#8594; 63% GM-LP-Holder</p>
                <p>Trading Fees &#8594; 27% GMX-Staker (ETH/AVAX)</p>
                <p>Trading Fees &#8594; 10% Protocol Treasury</p>
              </div>
            </div>
            <div className="bg-red-900/10 rounded-lg p-3 border border-red-800/30">
              <p className="text-xs text-red-400 font-medium">Kein Burn-Mechanismus</p>
              <p className="text-xs text-gray-400 mt-1">
                Zurueckgekaufte Token werden nicht geburnt, sondern in
                Power Accrual akkumuliert bis $90-Ziel erreicht ist.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* esGMX & Emission Info */}
      <div className="card">
        <h3 className="text-base font-semibold text-white mb-3">
          esGMX Emission & Vesting
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0a0a0f] rounded-lg p-4 border border-[#1e1e2e]">
            <p className="text-sm font-medium text-blue-400">esGMX Rewards</p>
            <p className="text-xs text-gray-400 mt-1">
              GMX- und GLP-Staker erhalten esGMX als zusaetzliche Belohnung.
              esGMX kann fuer 12 Monate gevestet werden, um zu handelbarem GMX
              zu konvertieren.
            </p>
          </div>
          <div className="bg-[#0a0a0f] rounded-lg p-4 border border-[#1e1e2e]">
            <p className="text-sm font-medium text-yellow-400">
              Multiplier Points
            </p>
            <p className="text-xs text-gray-400 mt-1">
              100% APR auf gestaktes GMX. Boosten ETH/AVAX-Rewards proportional.
              Foerdern langfristiges Staking. Werden bei Unstaking verbrannt.
            </p>
          </div>
          <div className="bg-[#0a0a0f] rounded-lg p-4 border border-[#1e1e2e]">
            <p className="text-sm font-medium text-green-400">
              Inflationsdruck
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Max Supply bei 13.25M GMX (gekappt). Circulating: 10.38M ({supplyPercent.toFixed(1)}%).
              esGMX-Vesting erzeugt fortlaufenden Verkaufsdruck, begrenzt durch
              den Supply-Cap.
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Quellen: GMX Docs (docs.gmx.io/docs/tokenomics), CoinGecko, DeFiLlama
        </p>
      </div>
    </section>
  );
}
