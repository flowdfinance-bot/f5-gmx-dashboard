"use client";

interface Opinion {
  source: string;
  date: string;
  sentiment: string;
  thesis: string;
  link: string;
}

interface AnalystOpinionsProps {
  opinions: Opinion[];
}

function getSentimentBadge(sentiment: string) {
  switch (sentiment.toLowerCase()) {
    case "bullish":
      return "badge-green";
    case "bearish":
      return "badge-red";
    default:
      return "badge-yellow";
  }
}

export default function AnalystOpinions({ opinions }: AnalystOpinionsProps) {
  return (
    <section id="analyst-opinions">
      <h2 className="section-title">Was sagen andere Fonds & Analysten?</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {opinions.map((opinion, i) => (
          <div key={i} className="card card-hover">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-semibold text-white">
                  {opinion.source}
                </h4>
                <p className="text-xs text-gray-500">{opinion.date}</p>
              </div>
              <span className={`badge ${getSentimentBadge(opinion.sentiment)}`}>
                {opinion.sentiment}
              </span>
            </div>
            <p className="text-sm text-gray-300 mb-3">{opinion.thesis}</p>
            <a
              href={opinion.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Quelle ansehen &#8594;
            </a>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Hinweis: Analysten-Meinungen stellen keine Anlageberatung dar.
        Sentiment kann sich schnell aendern. Letzte Recherche: April 2026.
      </p>
    </section>
  );
}
