"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DevEvent {
  date: string;
  title: string;
  description: string;
  category: string;
  repos: string[];
  source: string;
}

interface UpcomingFeature {
  name: string;
  version: string;
  status: string;
  eta: string;
  description: string;
}

interface Repo {
  name: string;
  stars: number;
  lang: string;
  lastPush: string;
  description: string;
}

interface TechnicalDevelopmentProps {
  data: {
    github: {
      org: string;
      url: string;
      repos: Repo[];
      monthlyCommits: {
        data: { month: string; commits: number }[];
      };
      topContributors: string[];
    };
    releases: { version: string; date: string; type: string; source: string }[];
    technicalTimeline: DevEvent[];
    upcomingFeatures: UpcomingFeature[];
  };
}

function getCategoryBadge(cat: string) {
  switch (cat.toLowerCase()) {
    case "release":
    case "launch":
      return "badge-green";
    case "feature":
      return "badge-blue";
    case "security":
      return "badge-red";
    case "fix":
      return "badge-yellow";
    case "improvement":
      return "badge-blue";
    default:
      return "badge-gray";
  }
}

function getStatusColor(status: string) {
  if (status.includes("Entwicklung")) return "text-blue-400";
  if (status.includes("Geplant")) return "text-gray-400";
  if (status.includes("laufend") || status.includes("Rollout")) return "text-green-400";
  if (status.includes("ausstehend") || status.includes("Vote")) return "text-yellow-400";
  return "text-gray-400";
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111118] border border-[#2e2e3e] rounded-lg p-3 shadow-xl">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-white">
          {payload[0].value} Commits
        </p>
      </div>
    );
  }
  return null;
};

export default function TechnicalDevelopment({ data }: TechnicalDevelopmentProps) {
  const commitData = data.github.monthlyCommits.data.map((d) => ({
    ...d,
    month: d.month.slice(2), // "2025-09" -> "25-09"
  }));

  return (
    <section id="development">
      <h2 className="section-title">Technische Entwicklung</h2>

      {/* Top Row: Commit Activity + GitHub Repos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Commit Activity Chart */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-white">
              GitHub Commit-Aktivitaet (gmx-interface)
            </h3>
            <a
              href={data.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              github.com/gmx-io &#8594;
            </a>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={commitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10, fill: "#6b7280" }}
                />
                <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="commits" fill="#3b82f6" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            <span>
              Top-Contributor: {data.github.topContributors.slice(0, 5).join(", ")}
            </span>
          </div>
        </div>

        {/* Repository Overview */}
        <div className="card">
          <h3 className="text-base font-semibold text-white mb-4">
            Repositories
          </h3>
          <div className="space-y-3">
            {data.github.repos.map((repo) => (
              <a
                key={repo.name}
                href={`https://github.com/gmx-io/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#0a0a0f] rounded-lg p-2.5 border border-[#1e1e2e] hover:border-[#2e2e3e] transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-blue-400 font-medium">
                    {repo.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {repo.stars} &#9733;
                  </span>
                </div>
                <p className="text-xs text-gray-500">{repo.description}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                  <span>{repo.lang}</span>
                  <span>Push: {repo.lastPush}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Releases */}
      <div className="flex items-center gap-3 mb-4">
        {data.releases.map((rel) => (
          <a
            key={rel.version}
            href={rel.source}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-900/10 border border-green-800/30 rounded-lg px-4 py-2 hover:border-green-700/50 transition-colors"
          >
            <span className="text-sm font-semibold text-green-400">
              {rel.version}
            </span>
            <span className="text-xs text-gray-400">{rel.date}</span>
          </a>
        ))}
      </div>

      {/* Technical Timeline */}
      <div className="card mb-6">
        <h3 className="text-base font-semibold text-white mb-4">
          Technische Entwicklungs-Timeline
        </h3>
        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-[#1e1e2e]" />
          <div className="space-y-5">
            {data.technicalTimeline.map((event, i) => (
              <div key={i} className="relative pl-10">
                <div
                  className={`absolute left-1.5 top-1.5 w-3 h-3 rounded-full ring-4 ring-[#111118] ${
                    event.category === "Security"
                      ? "bg-red-400"
                      : event.category === "Release" || event.category === "Launch"
                      ? "bg-green-400"
                      : event.category === "Feature"
                      ? "bg-blue-400"
                      : "bg-gray-400"
                  }`}
                />
                <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500 font-mono">
                        {event.date}
                      </span>
                      <span className={`badge ${getCategoryBadge(event.category)}`}>
                        {event.category}
                      </span>
                      {event.repos.map((r) => (
                        <span key={r} className="text-xs text-gray-600 bg-[#1e1e2e] px-1.5 py-0.5 rounded">
                          {r}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">
                      {event.title}
                    </h4>
                    <p className="text-xs text-gray-400">{event.description}</p>
                  </div>
                  <a
                    href={event.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 whitespace-nowrap shrink-0"
                  >
                    Quelle &#8594;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Features / Roadmap */}
      <div className="card">
        <h3 className="text-base font-semibold text-white mb-4">
          Geplante Features (Roadmap)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.upcomingFeatures.map((feature) => (
            <div
              key={feature.name}
              className="bg-[#0a0a0f] rounded-lg p-4 border border-[#1e1e2e]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">
                  {feature.name}
                </span>
                <span className="badge badge-gray">{feature.version}</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">
                {feature.description}
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className={getStatusColor(feature.status)}>
                  {feature.status}
                </span>
                <span className="text-gray-600">ETA: {feature.eta}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Quellen: GMX Governance Forum (gov.gmx.io/t/gmx-v2-2-v2-3/4223),
          GMX Substack, GitHub Releases
        </p>
      </div>
    </section>
  );
}
