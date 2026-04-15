"use client";

interface WhatIsGMXProps {
  protocol: {
    chains: string[];
    description: string;
    tvlBreakdown: Record<string, number>;
  };
}

export default function WhatIsGMX({ protocol }: WhatIsGMXProps) {
  return (
    <section id="what-is-gmx">
      <h2 className="section-title">Was ist GMX?</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Description */}
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-3">
            Protokoll-Beschreibung
          </h3>
          <p className="text-gray-300 mb-4">
            GMX ist eine <span className="text-blue-400 font-medium">dezentrale Spot- und Derivate-Handelsboerse</span> mit
            niedrigen Gebuehren und geringen Spreads. Das Protokoll nutzt einen
            gemeinsamen Liquiditaetspool (Vault) als Gegenpartei fuer Trader, die
            gehebelte Positionen (bis 100x) auf Kryptowerte eingehen.
          </p>
          <p className="text-gray-300 mb-4">
            GMX ist auf mehreren Chains aktiv: <span className="text-white font-medium">{protocol.chains.join(", ")}</span>.
            Der Hauptanteil der Liquiditaet liegt auf Arbitrum.
          </p>

          {/* V1 vs V2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-[#0a0a0f] rounded-lg p-4 border border-[#1e1e2e]">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">
                V1 (Legacy)
              </h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>- GLP: Gemeinsamer Multi-Asset-Pool</li>
                <li>- 30% Fees an GMX-Staker</li>
                <li>- 70% Fees an GLP-Holder</li>
                <li>- Chainlink + internes Oracle</li>
              </ul>
            </div>
            <div className="bg-blue-900/10 rounded-lg p-4 border border-blue-800/30">
              <h4 className="text-sm font-semibold text-blue-400 mb-2">
                V2 (Aktuell)
              </h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>- GM Pools: Isolierte Maerkte pro Asset</li>
                <li>- 27% Fees an GMX-Staker</li>
                <li>- 63% Fees an GM-LP-Holder</li>
                <li>- 10% an Protocol Treasury</li>
                <li>- Synthetische USD-Collaterals</li>
                <li>- Limit/Trigger Orders via Keeper</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Architecture & Roadmap */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-3">
            Architektur & Roadmap
          </h3>

          <div className="space-y-4">
            <div className="bg-[#0a0a0f] rounded-lg p-3 border border-[#1e1e2e]">
              <p className="text-xs text-gray-500 mb-1">Kernmechanismus</p>
              <div className="text-sm text-gray-300 space-y-1">
                <p>Trader &#8594; Collateral &#8594; Vault</p>
                <p>LP &#8594; Assets &#8594; GM Pool</p>
                <p>Fees &#8594; Staker + LPs + Treasury</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">
                Geplante Updates
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="badge badge-blue mt-0.5">V2.2</span>
                  <div>
                    <p className="text-sm text-gray-300">Gasless Transactions</p>
                    <p className="text-xs text-gray-500">
                      Multichain-Trading, Cross-Collateral, Capped Price Impact
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="badge badge-gray mt-0.5">V2.3</span>
                  <div>
                    <p className="text-sm text-gray-300">Cross-Margin</p>
                    <p className="text-xs text-gray-500">
                      Market Groups, geteiltes Collateral
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chain TVL */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">
                TVL nach Chain
              </h4>
              <div className="space-y-2">
                {[
                  { name: "Arbitrum", value: protocol.tvlBreakdown.arbitrum, color: "bg-blue-500" },
                  { name: "Arb. Staking", value: protocol.tvlBreakdown.arbitrumStaking, color: "bg-blue-400" },
                  { name: "Avalanche", value: protocol.tvlBreakdown.avalanche, color: "bg-red-500" },
                  { name: "MegaETH", value: protocol.tvlBreakdown.megaeth, color: "bg-purple-500" },
                ].map((chain) => (
                  <div key={chain.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">{chain.name}</span>
                      <span className="text-gray-300">
                        ${(chain.value / 1_000_000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="w-full bg-[#1e1e2e] rounded-full h-1.5">
                      <div
                        className={`${chain.color} rounded-full h-1.5`}
                        style={{
                          width: `${Math.max((chain.value / 244_000_000) * 100, 2)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
