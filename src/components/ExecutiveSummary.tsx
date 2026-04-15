"use client";

interface ExecutiveSummaryProps {
  protocol: {
    fees: { allTime: number; monthly: number };
    buyback: { totalSpent: number; percentOfSupply: number; status: string };
    staking: { currentAPR: string; rewardsPausedUntil: string };
    feeDistribution: { v2: { gmxStakers: number; gmLiquidityProviders: number; treasury: number } };
  };
  market: {
    price: number;
    priceChange1y: number;
    mcapToTvlRatio: number;
  };
}

export default function ExecutiveSummary({ protocol, market }: ExecutiveSummaryProps) {
  return (
    <section id="summary">
      <h2 className="section-title">Executive Summary</h2>

      {/* Investment Thesis */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Investment-These: Passt GMX in unsere &quot;Revenue + Buyback&quot;-Strategie?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-900/10 border border-green-800/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm font-medium text-green-400">
                Echte Revenue
              </span>
            </div>
            <p className="text-sm text-gray-300">
              $456M kumulative Fees seit Launch. $2.5M/Monat aktuell. Revenue
              aus Trading-Aktivitaet, nicht aus Emissionen.
            </p>
          </div>

          <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">
                Teilweise Buyback
              </span>
            </div>
            <p className="text-sm text-gray-300">
              12.9% des Supplies zurueckgekauft ($20.86M). Aber: kein Burn-Mechanismus.
              Rewards pausiert bis $90. Kein systematisches Buyback-Programm mehr.
            </p>
          </div>

          <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-sm font-medium text-red-400">
                Risiken
              </span>
            </div>
            <p className="text-sm text-gray-300">
              -60% in 12 Monaten. Volumenanteil unter 3%. Staking-Rewards
              pausiert. $42M Exploit in 2025.
              CEO-Suche signalisiert Fuehrungsvakuum.
            </p>
          </div>
        </div>

        {/* Score Card */}
        <div className="bg-[#0a0a0f] rounded-lg p-4 border border-[#1e1e2e]">
          <div className="flex items-center gap-3 mb-3">
            <span className="badge badge-yellow">Teilweise</span>
            <span className="text-sm font-medium text-white">
              GMX passt teilweise in die F5 &quot;Revenue + Buyback&quot;-These
            </span>
          </div>
          <ul className="text-sm text-gray-400 space-y-1 ml-4">
            <li>
              + Echte Protokoll-Revenue aus Trading-Gebuehren (nicht inflationaer)
            </li>
            <li>
              + Historisch 30% Fee-Distribution an GMX-Staker in ETH/AVAX
            </li>
            <li>
              + Signifikantes Buyback-Programm abgeschlossen (12.9% des Supplies)
            </li>
            <li>
              - Kein Burn-Mechanismus vorhanden
            </li>
            <li>
              - Staking-Rewards bis $90 pausiert (Power Accrual Modell)
            </li>
            <li>
              - Massiver Marktanteilsverlust im Volumen an Hyperliquid
            </li>
            <li>
              - Token -76% vom ATH, strukturelle Herausforderungen
            </li>
          </ul>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="stat-value text-blue-400">
            ${(protocol.fees.allTime / 1_000_000).toFixed(0)}M
          </p>
          <p className="stat-label">Kumulative Fees</p>
        </div>
        <div className="card text-center">
          <p className="stat-value text-green-400">
            {protocol.buyback.percentOfSupply}%
          </p>
          <p className="stat-label">Supply Bought Back</p>
        </div>
        <div className="card text-center">
          <p className="stat-value text-yellow-400">
            {protocol.feeDistribution.v2.gmxStakers}%
          </p>
          <p className="stat-label">Fees an Staker (V2)</p>
        </div>
        <div className="card text-center">
          <p className="stat-value text-red-400">
            {market.priceChange1y.toFixed(0)}%
          </p>
          <p className="stat-label">12M Performance</p>
        </div>
      </div>
    </section>
  );
}
