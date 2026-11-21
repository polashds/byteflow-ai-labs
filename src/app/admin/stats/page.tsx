import { Metadata } from "next";
import { requireAdmin } from "@/lib/auth-guard";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Visitor Stats — Admin",
};

export const dynamic = "force-dynamic";

type DayRow = { day: Date; views: bigint };
type PageRow = { path: string; views: bigint };

/** "Today" and date ranges follow Asia/Dhaka, matching how /api/pv stores days. */
async function getStats() {
  const [daily, topPages]: [DayRow[], PageRow[]] = await Promise.all([
    prisma.$queryRaw<DayRow[]>`
      SELECT "day", SUM("views")::bigint AS views
        FROM "PageViewDaily"
       WHERE "day" > (now() AT TIME ZONE 'Asia/Dhaka')::date - 30
       GROUP BY "day"
       ORDER BY "day" ASC`,
    prisma.$queryRaw<PageRow[]>`
      SELECT "path", SUM("views")::bigint AS views
        FROM "PageViewDaily"
       WHERE "day" > (now() AT TIME ZONE 'Asia/Dhaka')::date - 30
       GROUP BY "path"
       ORDER BY views DESC, "path" ASC
       LIMIT 15`,
  ]);

  // Build a continuous 30-day series (oldest → today) so empty days show as 0.
  const byDay = new Map(daily.map((r) => [toKey(r.day), Number(r.views)]));
  const today = dhakaToday();
  const series = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - (29 - i));
    const key = toKey(d);
    return { key, views: byDay.get(key) ?? 0 };
  });

  const sum = (n: number) => series.slice(-n).reduce((t, r) => t + r.views, 0);
  return {
    series,
    today: sum(1),
    last7: sum(7),
    last30: sum(30),
    topPages: topPages.map((r) => ({ path: r.path, views: Number(r.views) })),
  };
}

function toKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Today's date in Asia/Dhaka (UTC+6, no DST), as a UTC-midnight Date. */
function dhakaToday(): Date {
  const now = new Date(Date.now() + 6 * 60 * 60 * 1000);
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

function shortDate(key: string): string {
  const [, m, d] = key.split("-");
  return `${Number(d)}/${Number(m)}`;
}

export default async function AdminStatsPage() {
  await requireAdmin();
  const stats = await getStats();
  const max = Math.max(1, ...stats.series.map((r) => r.views));

  const cards = [
    { label: "Views today", value: stats.today },
    { label: "Last 7 days", value: stats.last7 },
    { label: "Last 30 days", value: stats.last30 },
  ];

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-4 mb-2">
          <span className="h-px w-8 bg-primary/40" />
          <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
            Visitors
          </p>
        </div>
        <h1 className="font-heading font-semibold text-brand-text text-4xl">Visitor Stats</h1>
        <p className="font-body text-sm text-brand-muted mt-2 max-w-2xl">
          Page views on the public site, counted on our own server. Only daily totals per page are
          stored: no cookies, IP addresses or visitor details. Bots, link previews and the admin
          area are not counted. Days follow Dhaka time. Visible only to admins.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-brand-surface border border-primary/15 p-6">
            <p className="font-body text-[10px] tracking-[0.25em] text-brand-muted uppercase mb-3">
              {c.label}
            </p>
            <p className="font-heading font-semibold text-5xl text-brand-text">
              {c.value.toLocaleString("en-US")}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-brand-surface border border-primary/15 p-6">
        <h2 className="font-heading font-semibold text-brand-text text-2xl mb-6">Last 30 days</h2>
        <div className="flex items-end gap-1 h-40" role="img" aria-label="Daily page views for the last 30 days">
          {stats.series.map((r) => (
            <div key={r.key} className="flex-1 h-full flex flex-col justify-end" title={`${r.key}: ${r.views} views`}>
              <div
                className="w-full bg-primary/70 hover:bg-accent transition-colors"
                style={{ height: `${(r.views / max) * 100}%`, minHeight: r.views > 0 ? 2 : 0 }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 font-body text-[10px] text-brand-muted">
          <span>{shortDate(stats.series[0].key)}</span>
          <span>{shortDate(stats.series[stats.series.length - 1].key)}</span>
        </div>
        <table className="sr-only">
          <caption>Daily page views</caption>
          <tbody>
            {stats.series.map((r) => (
              <tr key={r.key}>
                <th scope="row">{r.key}</th>
                <td>{r.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-brand-surface border border-primary/15 p-6">
        <h2 className="font-heading font-semibold text-brand-text text-2xl mb-4">Top pages (30 days)</h2>
        {stats.topPages.length === 0 ? (
          <p className="font-body text-sm text-brand-muted">No page views recorded yet.</p>
        ) : (
          <table className="w-full font-body text-sm">
            <thead>
              <tr className="text-left text-[10px] tracking-[0.25em] text-brand-muted uppercase">
                <th className="py-2 font-normal">Page</th>
                <th className="py-2 font-normal text-right">Views</th>
              </tr>
            </thead>
            <tbody>
              {stats.topPages.map((p) => (
                <tr key={p.path} className="border-t border-primary/10">
                  <td className="py-2 text-brand-text">
                    <a href={p.path} target="_blank" rel="noopener" className="hover:text-accent">
                      {p.path}
                    </a>
                  </td>
                  <td className="py-2 text-right text-brand-text tabular-nums">
                    {p.views.toLocaleString("en-US")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
