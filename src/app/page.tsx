import Header from "@/components/Header";
import ExecutiveSummary from "@/components/ExecutiveSummary";
import WhatIsGMX from "@/components/WhatIsGMX";
import FundamentalMetrics from "@/components/FundamentalMetrics";
import TokenomicsValueAccrual from "@/components/TokenomicsValueAccrual";
import CompetitionAnalysis from "@/components/CompetitionAnalysis";
import AnalystOpinions from "@/components/AnalystOpinions";
import NewsTimeline from "@/components/NewsTimeline";
import Risks from "@/components/Risks";
import Footer from "@/components/Footer";

import marketData from "../../data/market.json";
import protocolData from "../../data/protocol.json";
import tvlHistory from "../../data/tvl-history.json";
import competitorsData from "../../data/competitors.json";
import newsData from "../../data/news.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Header market={marketData} protocol={protocolData} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <ExecutiveSummary protocol={protocolData} market={marketData} />
        <WhatIsGMX protocol={protocolData} />
        <FundamentalMetrics
          market={marketData}
          protocol={protocolData}
          tvlHistory={tvlHistory}
        />
        <TokenomicsValueAccrual market={marketData} protocol={protocolData} />
        <CompetitionAnalysis data={competitorsData} />
        <AnalystOpinions opinions={newsData.analystOpinions} />
        <NewsTimeline events={newsData.events} />
        <Risks />
      </div>

      <Footer lastUpdated={marketData.lastUpdated} />
    </main>
  );
}
