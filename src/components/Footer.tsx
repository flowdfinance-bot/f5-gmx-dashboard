"use client";

interface FooterProps {
  lastUpdated: string;
}

export default function Footer({ lastUpdated }: FooterProps) {
  const sources = [
    { name: "DeFiLlama - GMX Protocol", url: "https://defillama.com/protocol/gmx" },
    { name: "DeFiLlama - Fees", url: "https://defillama.com/fees/gmx" },
    { name: "DeFiLlama - Perp DEX Rankings", url: "https://defillama.com/perps" },
    { name: "CoinGecko - GMX", url: "https://www.coingecko.com/en/coins/gmx" },
    { name: "GMX Docs", url: "https://docs.gmx.io" },
    { name: "GMX Governance Forum", url: "https://gov.gmx.io" },
    { name: "GMX Snapshot Governance", url: "https://snapshot.org/#/gmx.eth" },
    { name: "GMX App", url: "https://app.gmx.io" },
    { name: "GMX Stats", url: "https://stats.gmx.io" },
    { name: "GMX Substack (Blog)", url: "https://gmxio.substack.com" },
    { name: "GMX GitHub", url: "https://github.com/gmx-io" },
    { name: "Messari - GMX", url: "https://messari.io/project/gmx" },
    { name: "Halborn - GMX Hack Analysis", url: "https://www.halborn.com/blog/post/explained-the-gmx-hack-july-2025" },
    { name: "CoinDesk - GMX Exploit", url: "https://www.coindesk.com/business/2025/07/09/decentralized-exchange-gmx-exploited-for-usd42m-offers-hacker-10-white-hat-bounty" },
    { name: "CoinGecko - Token Buybacks Report", url: "https://www.coingecko.com/research/publications/token-buybacks" },
    { name: "Stacy Muur - Perp DEX Tier List", url: "https://x.com/stacy_muur/status/1992586960536527039" },
  ];

  const dashboards = [
    { name: "F5 Crypto Dashboard", url: "https://f5-crypto-dashboard.vercel.app/" },
    { name: "F5 Fonds Dashboard", url: "https://f5-crypto-fonds-dashboard.vercel.app/" },
    { name: "F5 TPM Dashboard", url: "https://f5-crypto-tpm-dashboard.vercel.app/" },
  ];

  return (
    <footer className="border-t border-[#1e1e2e] bg-[#0d0d14] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Sources */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-white mb-4">
            Quellenverzeichnis
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {sources.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors truncate"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        {/* Other Dashboards */}
        <div className="mb-8 border-t border-[#1e1e2e] pt-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">
            Weitere F5 Dashboards
          </h3>
          <div className="flex flex-wrap gap-4">
            {dashboards.map((d) => (
              <a
                key={d.url}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors border border-[#1e1e2e] rounded-lg px-4 py-2 hover:border-blue-800/50"
              >
                {d.name} &#8594;
              </a>
            ))}
          </div>
        </div>

        {/* Footer Meta */}
        <div className="border-t border-[#1e1e2e] pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm text-gray-400">
              F5 Crypto Capital GmbH | Ritterstr. 2A, 10969 Berlin
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Letztes Daten-Update: {lastUpdated} | Auto-Update alle 2 Wochen
              via GitHub Actions
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600">
              Dieser Bericht dient ausschliesslich Informationszwecken und stellt
              keine Anlageberatung dar.
            </p>
            <p className="text-xs text-gray-700 mt-1">
              &copy; {new Date().getFullYear()} F5 Crypto Capital GmbH
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
