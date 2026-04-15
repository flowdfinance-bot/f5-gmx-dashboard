"use client";

interface NewsEvent {
  date: string;
  title: string;
  description: string;
  impact: string;
  source: string;
  sourceLabel: string;
}

interface NewsTimelineProps {
  events: NewsEvent[];
}

function getImpactBadge(impact: string) {
  switch (impact.toLowerCase()) {
    case "bullish":
      return "badge-green";
    case "bearish":
      return "badge-red";
    default:
      return "badge-gray";
  }
}

function getImpactDot(impact: string) {
  switch (impact.toLowerCase()) {
    case "bullish":
      return "bg-green-400";
    case "bearish":
      return "bg-red-400";
    default:
      return "bg-gray-400";
  }
}

export default function NewsTimeline({ events }: NewsTimelineProps) {
  return (
    <section id="news">
      <h2 className="section-title">Signifikante News & Events</h2>

      <div className="card">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-[#1e1e2e]" />

          <div className="space-y-6">
            {events.map((event, i) => (
              <div key={i} className="relative pl-10">
                {/* Timeline dot */}
                <div
                  className={`absolute left-1.5 top-1.5 w-3 h-3 rounded-full ${getImpactDot(
                    event.impact
                  )} ring-4 ring-[#111118]`}
                />

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500 font-mono">
                        {event.date}
                      </span>
                      <span
                        className={`badge ${getImpactBadge(event.impact)}`}
                      >
                        {event.impact}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">
                      {event.title}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {event.description}
                    </p>
                  </div>
                  <a
                    href={event.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 whitespace-nowrap shrink-0"
                  >
                    {event.sourceLabel} &#8594;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
