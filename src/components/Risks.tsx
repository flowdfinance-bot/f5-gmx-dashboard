"use client";

export default function Risks() {
  const riskCategories = [
    {
      title: "Protokoll-Risiken",
      color: "red",
      risks: [
        {
          name: "Smart Contract Risiko",
          severity: "Hoch",
          detail:
            "$42M Exploit im Juli 2025 durch Reentrancy-Bug in V1. Obwohl Gelder zurueckgegeben wurden, zeigt dies die Angreifbarkeit komplexer DeFi-Protokolle.",
          source: "Halborn, CoinDesk (Juli 2025)",
        },
        {
          name: "Anonymes Entwicklerteam",
          severity: "Hoch",
          detail:
            "Team vollstaendig anonym. Keine juristische Entitaet. Admin-Key erlaubt Einfrieren aller Handelsaktivitaeten ohne Vorwarnung.",
          source: "F5 Crypto IC-Teaser (Feb 2023)",
        },
        {
          name: "Admin-kontrolliert (Timelock/Multisig)",
          severity: "Hoch",
          detail:
            "GMX V2 ist nicht immutable. Timelock-/Rollen-/Multisig-System mit ConfigTimelockController und GovTimelockController. Admins koennen Parameter aendern (Fees, OI Caps, Leverage), Tokens whitelisten, Maerkte deaktivieren und Funktionen einfrieren. Keine EOA haelt direkt eine Controller-Rolle, aber der Einfluss der Timelock-Admins ist erheblich.",
          source: "GMX Docs, gmx-synthetics Repo, Arbiscan",
        },
        {
          name: "Oracle/Preismanipulation",
          severity: "Mittel",
          detail:
            "System haengt von korrekten Preisdaten ab (Chainlink + interner Median). Historischer $565k Exploit durch Kursmanipulation.",
          source: "Cointelegraph, GMX Docs",
        },
      ],
    },
    {
      title: "Token-Risiken",
      color: "yellow",
      risks: [
        {
          name: "Keine fixe Max-Supply (de facto)",
          severity: "Mittel",
          detail:
            "Max Supply bei 13.25M GMX gekappt, aber Governance kann dies mit 28-Tage-Frist aendern. esGMX-Vesting erzeugt fortlaufenden Verkaufsdruck.",
          source: "GMX Docs, CoinGecko",
        },
        {
          name: "Staking-Rewards pausiert",
          severity: "Hoch",
          detail:
            "Rewards werden seit Maerz 2026 akkumuliert und erst bei $90 GMX-Preis verteilt. Aktuelle Preis: $6.11 - ein 15x noetig. Reduziert Staking-Anreiz massiv.",
          source: "GMX Governance (Maerz 2026)",
        },
        {
          name: "Token fuer Kernfunktionen nicht noetig",
          severity: "Mittel",
          detail:
            "Trading, Swaps, Liquidity Provision (GM/GLV) und Cross-Chain funktionieren vollstaendig ohne GMX-Token. Der Token ist primaer ein Governance- und Revenue-Sharing-Instrument. Die Wertanbindung ist indirekt und governance-abhaengig.",
          source: "GMX Docs, F5 Crypto Analyse",
        },
        {
          name: "Kein Burn-Mechanismus",
          severity: "Mittel",
          detail:
            "Obwohl 12.9% des Supplies zurueckgekauft wurden, gibt es keinen Burn. Zurueckgekaufte Token bleiben im System (Power Accrual).",
          source: "CoinGecko Research (2025)",
        },
      ],
    },
    {
      title: "Markt-Risiken",
      color: "blue",
      risks: [
        {
          name: "Massiver Volumen-Marktanteilsverlust",
          severity: "Hoch",
          detail:
            "Von Marktfuehrer auf unter 3% Volumenanteil gefallen. Hyperliquid dominiert mit 44%+. Neue Wettbewerber (Lighter, Aster) verdraengen GMX weiter.",
          source: "DeFiLlama Perps, CoinGecko (Q1 2026)",
        },
        {
          name: "Struktureller Nachteil AMM vs. Order Book",
          severity: "Hoch",
          detail:
            "Pool-basierte Perp-Modelle verlieren strukturell gegen Order-Book-DEXs bei professionellem Trading-Flow. Analysten wie DegenSpartan nennen AMM-Perps 'transitional technology'.",
          source: "Crypto Twitter, Analyst Reports",
        },
        {
          name: "Fuehrungsvakuum / CEO-Suche",
          severity: "Mittel",
          detail:
            "GMX DAO sucht aktiv einen CEO (Deadline April 2026). Signalisiert organisatorische Herausforderungen und fehlendes strategisches Leadership.",
          source: "GMX Governance Forum",
        },
      ],
    },
  ];

  const severityBadge = (s: string) => {
    switch (s) {
      case "Hoch":
        return "badge-red";
      case "Mittel":
        return "badge-yellow";
      default:
        return "badge-gray";
    }
  };

  return (
    <section id="risks">
      <h2 className="section-title">Risiken</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {riskCategories.map((cat) => (
          <div key={cat.title} className="card">
            <h3
              className={`text-base font-semibold mb-4 ${
                cat.color === "red"
                  ? "text-red-400"
                  : cat.color === "yellow"
                  ? "text-yellow-400"
                  : "text-blue-400"
              }`}
            >
              {cat.title}
            </h3>
            <div className="space-y-4">
              {cat.risks.map((risk) => (
                <div
                  key={risk.name}
                  className="bg-[#0a0a0f] rounded-lg p-3 border border-[#1e1e2e]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">
                      {risk.name}
                    </span>
                    <span className={`badge ${severityBadge(risk.severity)}`}>
                      {risk.severity}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{risk.detail}</p>
                  <p className="text-xs text-gray-600">
                    Quelle: {risk.source}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
