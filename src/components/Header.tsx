"use client";

interface HeaderProps {
  market: {
    price: number;
    priceChange24h: number;
    marketCap: number;
    fdv: number;
    volume24h: number;
    marketCapRank: number;
    lastUpdated: string;
  };
  protocol: {
    tvl: number;
    lastUpdated: string;
  };
}

function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

export default function Header({ market, protocol }: HeaderProps) {
  const isPositive = market.priceChange24h >= 0;

  return (
    <header className="border-b border-[#1e1e2e] bg-[#0d0d14]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-lg">
              G
            </div>
            <div>
              <h1 className="text-lg font-bold text-white flex items-center gap-2">
                GMX
                <span className="text-sm font-normal text-gray-400">
                  Investment Dashboard
                </span>
              </h1>
              <p className="text-xs text-gray-500">
                F5 Crypto Capital GmbH
              </p>
            </div>
          </div>

          {/* Price & Key Stats */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">
                  ${market.price.toFixed(2)}
                </span>
                <span
                  className={`text-sm font-medium ${
                    isPositive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {market.priceChange24h.toFixed(2)}%
                </span>
              </div>
              <p className="text-xs text-gray-500">24h Change</p>
            </div>

            <div className="hidden sm:block h-8 w-px bg-[#1e1e2e]" />

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-white">
                {formatNumber(market.marketCap)}
              </p>
              <p className="text-xs text-gray-500">Market Cap</p>
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-white">
                {formatNumber(market.fdv)}
              </p>
              <p className="text-xs text-gray-500">FDV</p>
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-semibold text-white">
                {formatNumber(protocol.tvl)}
              </p>
              <p className="text-xs text-gray-500">TVL</p>
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-semibold text-white">
                #{market.marketCapRank}
              </p>
              <p className="text-xs text-gray-500">Rang</p>
            </div>
          </div>
        </div>

        {/* Update info bar */}
        <div className="flex items-center justify-between py-2 border-t border-[#1e1e2e] text-xs text-gray-500">
          <span>
            Letztes Update: {market.lastUpdated} | Auto-Update: alle 2 Wochen
            via GitHub Actions
          </span>
          <a
            href="/teaser-gmx.pdf"
            className="text-blue-400 hover:text-blue-300 transition-colors"
            target="_blank"
          >
            IC-Teaser PDF
          </a>
        </div>
      </div>
    </header>
  );
}
