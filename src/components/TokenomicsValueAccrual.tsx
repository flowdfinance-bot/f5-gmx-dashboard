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

interface WeeklyBuyback {
  period: string;
  tokens: number;
  usd: number | null;
  avgPrice: number | null;
}

interface FeeDistEntry {
  recipient: string;
  share: number;
}

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
    buybackDetailed?: {
      phase1: {
        name: string;
        startDate: string;
        endDate: string;
        totalBoughtBack: number;
        avgAnnualizedYield: number;
        tallyUrl: string;
      };
      phase2: {
        name: string;
        startDate: string;
        trigger: string;
        governanceUrl: string;
        substackUrl: string;
      };
      weeklyBuybacks: WeeklyBuyback[];
      cumulativeSinceMarch: {
        tokens: number;
        usd: number;
        avgPrice: number;
      };
      stakingPower: {
        startDate: string;
        formula: string;
        loyaltyThreshold: number;
        loyaltyBaselineDate: string;
        penaltyRule: string;
      };
      strategyComponents: { action: string; detail: string }[];
    };
    feeStructure?: {
      trading: {
        balanceImproving: { bps: number; percent: number };
        balanceWorsening: { bps: number; percent: number };
        v1Comparison: { bps: number; percent: number };
      };
      swap: {
        normal: {
          balanceImproving: { bps: number; percent: number };
          balanceWorsening: { bps: number; percent: number };
        };
        stablecoin: {
          balanceImproving: { bps: number; percent: number };
          balanceWorsening: { bps: number; percent: number };
        };
        v1Comparison: string;
      };
      borrowing: {
        description: string;
        model: string;
      };
      liquidation: {
        assetBacked: { bps: number; note: string };
        synthetic: { bps: number; note: string };
        highVolatility: { bps: number; note: string };
      };
      priceImpact: {
        description: string;
        formula: string;
      };
      distribution: {
        v2: FeeDistEntry[];
        v1: FeeDistEntry[];
        note: string;
      };
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

      {/* Detailed Buyback Section */}
      {protocol.buybackDetailed && (
        <div className="card mt-6">
          <h3 className="text-base font-semibold text-white mb-4">
            Buyback-Programm im Detail
          </h3>

          {/* Phase Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="bg-[#0a0a0f] rounded-lg p-4 border border-[#1e1e2e]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <p className="text-sm font-medium text-green-400">
                  Phase 1: {protocol.buybackDetailed.phase1.name}
                </p>
              </div>
              <p className="text-xs text-gray-500 font-mono mb-2">
                {protocol.buybackDetailed.phase1.startDate} &#8594; {protocol.buybackDetailed.phase1.endDate}
              </p>
              <div className="space-y-1 text-xs text-gray-300">
                <p>
                  <span className="text-gray-500">Mechanismus:</span> 27% V2 / 30% V1 Fees kaufen GMX am Markt,
                  woechentliche Verteilung an Staker
                </p>
                <p>
                  <span className="text-gray-500">Gesamt:</span>{" "}
                  <span className="text-white font-medium">
                    {(protocol.buybackDetailed.phase1.totalBoughtBack / 1_000_000).toFixed(2)}M GMX
                  </span>{" "}
                  zurueckgekauft
                </p>
                <p>
                  <span className="text-gray-500">Avg. Yield:</span>{" "}
                  <span className="text-green-400 font-medium">
                    {protocol.buybackDetailed.phase1.avgAnnualizedYield}% APR
                  </span>
                </p>
              </div>
              <a
                href={protocol.buybackDetailed.phase1.tallyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block"
              >
                Tally On-Chain Vote &#8594;
              </a>
            </div>

            <div className="bg-blue-900/10 rounded-lg p-4 border border-blue-800/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <p className="text-sm font-medium text-blue-400">
                  Phase 2: {protocol.buybackDetailed.phase2.name}
                </p>
              </div>
              <p className="text-xs text-gray-500 font-mono mb-2">
                {protocol.buybackDetailed.phase2.startDate} &#8594; aktiv
              </p>
              <div className="space-y-1 text-xs text-gray-300">
                <p>
                  <span className="text-gray-500">Mechanismus:</span> Buybacks laufen weiter,
                  aber Rewards werden in Treasury akkumuliert statt verteilt
                </p>
                <p>
                  <span className="text-gray-500">Trigger:</span>{" "}
                  <span className="text-yellow-400 font-medium">
                    {protocol.buybackDetailed.phase2.trigger}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Staking Power</span> bestimmt proportionalen
                  Anteil bei zukuenftiger Ausschuettung
                </p>
              </div>
              <a
                href={protocol.buybackDetailed.phase2.governanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block"
              >
                Governance Proposal &#8594;
              </a>
            </div>
          </div>

          {/* Strategy 5-Point Plan */}
          <div className="mb-5">
            <h4 className="text-sm font-medium text-gray-300 mb-3">
              5-Punkte-Strategie: &quot;CEX Supply Overhang neutralisieren&quot;
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
              {protocol.buybackDetailed.strategyComponents.map((comp, i) => (
                <div
                  key={i}
                  className="bg-[#0a0a0f] rounded-lg p-3 border border-[#1e1e2e]"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-blue-400 bg-blue-900/30 rounded px-1.5 py-0.5">
                      {i + 1}
                    </span>
                    <span className="text-xs font-medium text-white">
                      {comp.action}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {comp.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Buyback Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 overflow-x-auto">
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                Woechentliche Buybacks (seit Maerz 2026)
              </h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e1e2e]">
                    <th className="text-left py-2 px-2 text-gray-400 font-medium text-xs">Zeitraum</th>
                    <th className="text-right py-2 px-2 text-gray-400 font-medium text-xs">Token</th>
                    <th className="text-right py-2 px-2 text-gray-400 font-medium text-xs">USD</th>
                    <th className="text-right py-2 px-2 text-gray-400 font-medium text-xs">Avg. Preis</th>
                  </tr>
                </thead>
                <tbody>
                  {protocol.buybackDetailed.weeklyBuybacks.map((wb, i) => (
                    <tr key={i} className="border-b border-[#1e1e2e] hover:bg-[#16161f]">
                      <td className="py-2 px-2 text-gray-300 text-xs font-mono">
                        {wb.period}
                      </td>
                      <td className="py-2 px-2 text-right text-white text-xs font-medium">
                        {wb.tokens.toLocaleString()}
                      </td>
                      <td className="py-2 px-2 text-right text-gray-300 text-xs">
                        {wb.usd ? `$${(wb.usd / 1_000).toFixed(0)}K` : "—"}
                      </td>
                      <td className="py-2 px-2 text-right text-gray-300 text-xs">
                        {wb.avgPrice ? `$${wb.avgPrice.toFixed(2)}` : "—"}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-900/10 font-medium">
                    <td className="py-2 px-2 text-blue-400 text-xs">Gesamt seit Maerz</td>
                    <td className="py-2 px-2 text-right text-white text-xs">
                      {protocol.buybackDetailed.cumulativeSinceMarch.tokens.toLocaleString()}
                    </td>
                    <td className="py-2 px-2 text-right text-white text-xs">
                      ${(protocol.buybackDetailed.cumulativeSinceMarch.usd / 1_000).toFixed(0)}K
                    </td>
                    <td className="py-2 px-2 text-right text-white text-xs">
                      ${protocol.buybackDetailed.cumulativeSinceMarch.avgPrice.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Staking Power Card */}
            <div className="bg-[#0a0a0f] rounded-lg p-4 border border-[#1e1e2e]">
              <h4 className="text-sm font-medium text-yellow-400 mb-3">
                Staking Power System
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <p className="text-gray-500 mb-0.5">Formel</p>
                  <p className="text-gray-200 font-mono bg-[#111118] rounded p-2 text-[11px]">
                    Power = Dauer × GMX Menge
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">Start</p>
                  <p className="text-gray-300">{protocol.buybackDetailed.stakingPower.startDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">Loyalitaets-Schwelle</p>
                  <p className="text-gray-300">
                    {(protocol.buybackDetailed.stakingPower.loyaltyThreshold * 100)}% des Peak-Balances
                    (seit {protocol.buybackDetailed.stakingPower.loyaltyBaselineDate})
                  </p>
                </div>
                <div className="bg-red-900/10 border border-red-800/30 rounded p-2">
                  <p className="text-red-400 font-medium mb-0.5">Penalty</p>
                  <p className="text-gray-400 text-[11px]">
                    {protocol.buybackDetailed.stakingPower.penaltyRule}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">Reward-Anteil</p>
                  <p className="text-gray-300">
                    Deine Power / Gesamt-Netzwerk Power = dein % der akkumulierten Rewards
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            Quellen:{" "}
            <a href={protocol.buybackDetailed.phase2.substackUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              GMX Substack
            </a>
            ,{" "}
            <a href={protocol.buybackDetailed.phase2.governanceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              Governance Forum
            </a>
            , GMX dApp Earn Page
          </p>
        </div>
      )}

      {/* Detailed Fee Structure */}
      {protocol.feeStructure && (
        <div className="card mt-6">
          <h3 className="text-base font-semibold text-white mb-4">
            Gebuehrenstruktur im Detail (V2.2)
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
            {/* Trading Fees */}
            <div className="bg-[#0a0a0f] rounded-lg p-4 border border-[#1e1e2e]">
              <h4 className="text-sm font-medium text-blue-400 mb-3">
                Trading Fees (Open/Close)
              </h4>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#1e1e2e]">
                    <th className="text-left py-1.5 text-gray-500">Bedingung</th>
                    <th className="text-right py-1.5 text-gray-500">BPS</th>
                    <th className="text-right py-1.5 text-gray-500">Prozent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#1e1e2e]">
                    <td className="py-1.5 text-gray-300">Balance verbessernd</td>
                    <td className="py-1.5 text-right text-green-400 font-medium">
                      {protocol.feeStructure.trading.balanceImproving.bps} bps
                    </td>
                    <td className="py-1.5 text-right text-gray-400">
                      {protocol.feeStructure.trading.balanceImproving.percent}%
                    </td>
                  </tr>
                  <tr className="border-b border-[#1e1e2e]">
                    <td className="py-1.5 text-gray-300">Balance verschlechternd</td>
                    <td className="py-1.5 text-right text-yellow-400 font-medium">
                      {protocol.feeStructure.trading.balanceWorsening.bps} bps
                    </td>
                    <td className="py-1.5 text-right text-gray-400">
                      {protocol.feeStructure.trading.balanceWorsening.percent}%
                    </td>
                  </tr>
                  <tr className="text-gray-500">
                    <td className="py-1.5">V1 (zum Vergleich)</td>
                    <td className="py-1.5 text-right">
                      {protocol.feeStructure.trading.v1Comparison.bps} bps
                    </td>
                    <td className="py-1.5 text-right">
                      {protocol.feeStructure.trading.v1Comparison.percent}%
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="text-[11px] text-gray-600 mt-2">
                Gilt bei Open, Close und Teilaenderungen. Balance = Long/Short OI Verhaeltnis.
              </p>
            </div>

            {/* Swap Fees */}
            <div className="bg-[#0a0a0f] rounded-lg p-4 border border-[#1e1e2e]">
              <h4 className="text-sm font-medium text-blue-400 mb-3">
                Swap Fees
              </h4>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#1e1e2e]">
                    <th className="text-left py-1.5 text-gray-500">Typ</th>
                    <th className="text-right py-1.5 text-gray-500">Verbessert</th>
                    <th className="text-right py-1.5 text-gray-500">Verschlechtert</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#1e1e2e]">
                    <td className="py-1.5 text-gray-300">Normal</td>
                    <td className="py-1.5 text-right text-green-400 font-medium">
                      {protocol.feeStructure.swap.normal.balanceImproving.bps} bps
                    </td>
                    <td className="py-1.5 text-right text-yellow-400 font-medium">
                      {protocol.feeStructure.swap.normal.balanceWorsening.bps} bps
                    </td>
                  </tr>
                  <tr className="border-b border-[#1e1e2e]">
                    <td className="py-1.5 text-gray-300">Stablecoin</td>
                    <td className="py-1.5 text-right text-green-400 font-medium">
                      {protocol.feeStructure.swap.stablecoin.balanceImproving.bps} bps
                    </td>
                    <td className="py-1.5 text-right text-yellow-400 font-medium">
                      {protocol.feeStructure.swap.stablecoin.balanceWorsening.bps} bps
                    </td>
                  </tr>
                  <tr className="text-gray-500">
                    <td className="py-1.5">V1 (zum Vergleich)</td>
                    <td colSpan={2} className="py-1.5 text-right">
                      {protocol.feeStructure.swap.v1Comparison}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="text-[11px] text-gray-600 mt-2">
                &quot;Verbessert&quot; = Trade balanciert den Pool. Stablecoin-Swaps sind deutlich guenstiger.
              </p>
            </div>

            {/* Liquidation Fees */}
            <div className="bg-[#0a0a0f] rounded-lg p-4 border border-[#1e1e2e]">
              <h4 className="text-sm font-medium text-red-400 mb-3">
                Liquidation Fees
              </h4>
              <div className="space-y-2">
                {[
                  { label: "Asset-backed", data: protocol.feeStructure.liquidation.assetBacked },
                  { label: "Synthetisch", data: protocol.feeStructure.liquidation.synthetic },
                  { label: "High Volatility", data: protocol.feeStructure.liquidation.highVolatility },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-300">{item.label}</span>
                      <span className="text-[11px] text-gray-600 ml-2">({item.data.note})</span>
                    </div>
                    <span className="text-xs font-medium text-red-400">
                      {item.data.bps} bps ({(item.data.bps / 100).toFixed(2)}%)
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-600 mt-2">
                Gilt zusaetzlich zur regulaeren Close Fee. Seit 06.01.2025.
              </p>
            </div>

            {/* Borrowing & Price Impact */}
            <div className="bg-[#0a0a0f] rounded-lg p-4 border border-[#1e1e2e]">
              <h4 className="text-sm font-medium text-purple-400 mb-3">
                Borrowing & Price Impact
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <p className="text-gray-500 font-medium mb-1">Borrowing Fees</p>
                  <p className="text-gray-300">{protocol.feeStructure.borrowing.description}</p>
                  <p className="text-gray-500 mt-0.5">Modell: {protocol.feeStructure.borrowing.model}</p>
                </div>
                <div className="border-t border-[#1e1e2e] pt-2">
                  <p className="text-gray-500 font-medium mb-1">Price Impact</p>
                  <p className="text-gray-300">{protocol.feeStructure.priceImpact.description}</p>
                  <p className="text-gray-400 font-mono bg-[#111118] rounded p-1.5 mt-1 text-[10px]">
                    {protocol.feeStructure.priceImpact.formula}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Distribution Detailed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0a0a0f] rounded-lg p-4 border border-[#1e1e2e]">
              <h4 className="text-sm font-medium text-green-400 mb-3">V2 Fee-Verteilung (Detail)</h4>
              <div className="space-y-2">
                {protocol.feeStructure.distribution.v2.map((entry) => (
                  <div key={entry.recipient} className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">{entry.recipient}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-[#1e1e2e] rounded-full h-1.5">
                        <div
                          className="bg-blue-500 rounded-full h-1.5"
                          style={{ width: `${entry.share}%` }}
                        />
                      </div>
                      <span className="text-xs text-white font-medium w-12 text-right">
                        {entry.share}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-600 mt-2">
                Die &quot;10% Protocol&quot;-Angabe = 8.2% Treasury + 1.2% Chainlink
              </p>
            </div>

            <div className="bg-[#0a0a0f] rounded-lg p-4 border border-[#1e1e2e]">
              <h4 className="text-sm font-medium text-gray-400 mb-3">V1 Fee-Verteilung (zum Vergleich)</h4>
              <div className="space-y-2">
                {protocol.feeStructure.distribution.v1.map((entry) => (
                  <div key={entry.recipient} className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{entry.recipient}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-[#1e1e2e] rounded-full h-1.5">
                        <div
                          className="bg-gray-500 rounded-full h-1.5"
                          style={{ width: `${entry.share}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 font-medium w-12 text-right">
                        {entry.share}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-600 mt-2">
                {protocol.feeStructure.distribution.note}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            Quellen: GMX Docs, Governance Forum, gmx-synthetics GitHub, DeFiLlama
          </p>
        </div>
      )}
    </section>
  );
}
