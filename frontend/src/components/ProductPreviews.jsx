/*
 * Lightweight animated mock-ups of each product's UI, drawn with divs + SVG.
 * They are illustrations (sample data), not screenshots — the real apps are linked beside them.
 */
import { useEffect, useRef, useState } from 'react';
import { Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';
import { LiveDot, prefersReducedMotion } from './ui';

/* Random-walk series that only ticks while the preview is on screen */
function useLiveSeries(count, length, { min = 10, max = 90, start = 40, interval = 1400 } = {}) {
  const ref = useRef(null);
  const [series, setSeries] = useState(() =>
    Array.from({ length: count }, (_, s) => {
      let v = start + s * 12;
      return Array.from({ length }, () => (v = clamp(v + (Math.random() - 0.5) * 18, min, max)));
    })
  );

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    let timer;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) {
        timer = setInterval(() => {
          setSeries(prev => prev.map(arr => [...arr.slice(1), clamp(arr[arr.length - 1] + (Math.random() - 0.5) * 18, min, max)]));
        }, interval);
      }
    });
    io.observe(ref.current);
    return () => { io.disconnect(); clearInterval(timer); };
  }, [min, max, interval]);

  return [ref, series];
}

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function Sparkline({ data, color, height = 28, width = 120, fill = true }) {
  const max = 100;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - (v / max) * (height - 2) - 1}`);
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible">
      {fill && <polygon points={`0,${height} ${pts.join(' ')} ${width},${height}`} fill={color} opacity="0.12" />}
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ transition: 'all .6s ease' }} />
    </svg>
  );
}

function BrowserFrame({ url, accent, children }) {
  return (
    <div className="overflow-hidden rounded-2xl border hairline bg-night-900/90 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-2 border-b hairline bg-white/[0.02] px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-2 flex-1 truncate rounded-md bg-white/[0.04] px-2.5 py-1 font-mono text-[10.5px] text-fg-dim">
          <span className="text-emerald-300/70">https://</span>{url}
        </span>
        <span className="hidden items-center gap-1.5 font-mono text-[10px] sm:inline-flex" style={{ color: accent }}>
          <LiveDot size={6} color={accent} /> live
        </span>
      </div>
      <div className="p-4">{children}</div>
      <p className="border-t hairline px-4 py-2 text-right font-mono text-[9.5px] uppercase tracking-widest text-fg-dim/70">
        illustrative preview · sample data
      </p>
    </div>
  );
}

/* ── ServerPulse ─────────────────────────────────────────── */
const SERVERS = [
  { name: 'prod-api-01',     color: '#818cf8' },
  { name: 'prod-db-primary', color: '#34d399' },
  { name: 'staging-worker',  color: '#fbbf24' },
];

export function ServerPulsePreview() {
  const [ref, series] = useLiveSeries(3, 24, { start: 30 });
  const avg = Math.round(series.reduce((s, a) => s + a[a.length - 1], 0) / series.length);

  return (
    <div ref={ref}>
      <BrowserFrame url="serverpulse.in/dashboard" accent="#818cf8">
        <div className="grid grid-cols-3 gap-2">
          {[
            { k: 'Servers', v: '12', s: 'online' },
            { k: 'Avg CPU', v: `${avg}%`, s: 'fleet' },
            { k: 'Alerts', v: '2', s: 'active' },
          ].map(t => (
            <div key={t.k} className="rounded-xl border hairline bg-white/[0.02] p-2.5">
              <p className="text-[10px] text-fg-dim">{t.k}</p>
              <p className="font-display text-lg font-semibold tabular-nums text-fg">{t.v}</p>
              <p className="text-[9.5px] text-fg-dim">{t.s}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 space-y-2">
          {SERVERS.map((s, i) => {
            const cpu = Math.round(series[i][series[i].length - 1]);
            const hot = cpu > 75;
            return (
              <div key={s.name} className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border hairline bg-white/[0.015] px-3 py-2 sm:grid-cols-[1fr_1.2fr_auto]">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: hot ? '#fbbf24' : '#34d399' }} />
                  <span className="truncate font-mono text-[11px] text-fg">{s.name}</span>
                </div>
                <Sparkline data={series[i]} color={s.color} height={24} />
                <span className={`w-11 text-right font-mono text-[11px] tabular-nums ${hot ? 'text-amber-300' : 'text-fg-muted'}`}>{cpu}%</span>
              </div>
            );
          })}
        </div>

        <div className="mt-3 rounded-xl border border-indigo-400/20 bg-indigo-400/[0.06] p-3">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-200">
            <Sparkles size={11} /> AI assistant · local LLM
          </p>
          <p className="mt-1.5 font-mono text-[11px] text-fg-muted">› Why is prod-api-01 CPU spiking?</p>
          <p className="mt-1 text-[11.5px] leading-relaxed text-fg">
            3× traffic surge on <span className="font-mono text-indigo-200">/api/v1/orders</span> — node at 42%, nginx 18%. Recommend rate-limiting that route.
          </p>
        </div>
      </BrowserFrame>
    </div>
  );
}

/* ── CloudLedger ─────────────────────────────────────────── */
const BARS = [
  [40, 18, 10], [42, 17, 11], [39, 20, 10], [44, 19, 12], [41, 18, 11], [43, 21, 12], [45, 19, 11],
  [44, 20, 12], [72, 21, 12], [46, 20, 13], [47, 22, 12], [45, 21, 13], [48, 22, 13], [47, 23, 14],
];
const PROVIDERS = [
  { name: 'AWS',   color: '#fbbf24' },
  { name: 'GCP',   color: '#38bdf8' },
  { name: 'Azure', color: '#818cf8' },
];

export function CloudLedgerPreview() {
  const [ref, setRef] = useState(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(ref);
    return () => io.disconnect();
  }, [ref]);
  const maxTotal = Math.max(...BARS.map(b => b[0] + b[1] + b[2]));

  return (
    <div ref={setRef}>
      <BrowserFrame url="cloudledger.serverpulse.in/overview" accent="#34d399">
        <div className="grid grid-cols-3 gap-2">
          {[
            { k: 'Month-to-date', v: '$48.2K' },
            { k: 'Forecast',      v: '$71.9K' },
            { k: 'Savings found', v: '$9.4K', c: 'text-emerald-300' },
          ].map(t => (
            <div key={t.k} className="rounded-xl border hairline bg-white/[0.02] p-2.5">
              <p className="text-[10px] text-fg-dim">{t.k}</p>
              <p className={`font-display text-lg font-semibold tabular-nums ${t.c || 'text-fg'}`}>{t.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-xl border hairline bg-white/[0.015] p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10.5px] text-fg-muted">Daily spend by provider</p>
            <div className="flex gap-2.5">
              {PROVIDERS.map(p => (
                <span key={p.name} className="flex items-center gap-1 text-[9.5px] text-fg-dim">
                  <span className="h-1.5 w-1.5 rounded-sm" style={{ background: p.color }} />{p.name}
                </span>
              ))}
            </div>
          </div>
          <div className="relative flex h-32 items-end gap-[5px] pt-7">
            {BARS.map((b, i) => {
              const total = b[0] + b[1] + b[2];
              const anomaly = i === 8;
              return (
                <div
                  key={i}
                  className={`relative flex flex-1 flex-col-reverse overflow-hidden rounded-[3px] ${anomaly ? 'ring-1 ring-rose-400/70 ring-offset-1 ring-offset-night-900' : ''}`}
                  style={{ height: shown ? `${(total / maxTotal) * 100}%` : '4%', transition: `height .9s cubic-bezier(.22,1,.36,1) ${i * 40}ms` }}
                >
                  {b.map((v, j) => (
                    <div key={j} style={{ height: `${(v / total) * 100}%`, background: PROVIDERS[j].color, opacity: 0.85 }} />
                  ))}
                </div>
              );
            })}
            <span
              className="absolute top-0 flex items-center gap-1 rounded-md border border-rose-400/30 bg-rose-400/10 px-1.5 py-0.5 text-[9.5px] text-rose-200"
              style={{ left: `${(8 / BARS.length) * 100 - 6}%` }}
            >
              <AlertTriangle size={9} /> anomaly +38%
            </span>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-3">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-200">
            <Sparkles size={11} /> Cost copilot
          </p>
          <p className="mt-1.5 font-mono text-[11px] text-fg-muted">› Why did spend jump on the 9th?</p>
          <p className="mt-1 text-[11.5px] leading-relaxed text-fg">
            EC2 in <span className="font-mono text-emerald-200">us-east-1</span> scaled 3× for a batch job — 62% of the spike. A Savings Plan would cover it.
          </p>
        </div>
      </BrowserFrame>
    </div>
  );
}

/* ── Cloudwright ─────────────────────────────────────────── */
const PROMPT = 'Web app: ALB, autoscaling EC2, Postgres RDS, private subnets';

function Node({ label, sub, color }) {
  return (
    <div className="rounded-lg border px-2 py-1.5 text-center" style={{ borderColor: `${color}55`, background: `${color}12` }}>
      <p className="font-mono text-[10.5px] font-semibold" style={{ color }}>{label}</p>
      <p className="text-[9px] text-fg-dim">{sub}</p>
    </div>
  );
}

const Arrow = () => (
  <svg width="22" height="10" viewBox="0 0 22 10" className="shrink-0 text-fg-dim" aria-hidden="true">
    <path d="M0 5h18M14 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
  </svg>
);

export function CloudwrightPreview() {
  const ref = useRef(null);
  const [typed, setTyped] = useState(prefersReducedMotion() ? PROMPT.length : 0);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    let timer;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      timer = setInterval(() => setTyped(n => {
        if (n >= PROMPT.length) { clearInterval(timer); return n; }
        return n + 1;
      }), 32);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => { io.disconnect(); clearInterval(timer); };
  }, []);

  const done = typed >= PROMPT.length;

  return (
    <div ref={ref}>
      <BrowserFrame url="cloudwright.serverpulse.in/app/chat" accent="#38bdf8">
        <div className="rounded-xl border hairline bg-white/[0.02] p-3">
          <p className="text-[10px] text-fg-dim">Describe your infrastructure</p>
          <p className="mt-1 min-h-[2.4em] font-mono text-[11.5px] text-fg">
            {PROMPT.slice(0, typed)}
            {!done && <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 animate-blink bg-sky-300" />}
          </p>
        </div>

        <div className={`transition-all duration-700 ${done ? 'opacity-100' : 'translate-y-2 opacity-0'}`}>
          <div className="mt-3 rounded-xl border border-dashed border-sky-400/25 p-3">
            <p className="mb-2 font-mono text-[9.5px] text-sky-200/70">vpc 10.0.0.0/16 · private subnets · 3 AZ</p>
            <div className="flex items-center justify-between gap-1">
              <Node label="ALB" sub="public" color="#38bdf8" />
              <Arrow />
              <Node label="EC2 ASG" sub="2–6 × t3" color="#818cf8" />
              <Arrow />
              <Node label="RDS" sub="postgres" color="#34d399" />
            </div>
          </div>

          <pre className="mt-3 overflow-hidden rounded-xl border hairline bg-night-950 p-3 font-mono text-[10.5px] leading-[1.6] text-fg-muted">
{`module "rds" {
  source            = "./modules/rds"
  engine            = `}<span className="text-emerald-300">"postgres"</span>{`
  storage_encrypted = `}<span className="text-sky-300">true</span>{`
  subnet_ids        = module.vpc.private_subnets
}`}
          </pre>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-sky-400/20 bg-sky-400/[0.06] px-3 py-2">
            <p className="font-mono text-[10.5px] text-fg">Plan: <span className="text-emerald-300">24 to add</span> · est. $186/mo</p>
            <p className="flex items-center gap-1 text-[10px] text-sky-200"><ShieldCheck size={11} /> prod needs 2 approvals</p>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}

/* ── Terminal Agent ──────────────────────────────────────── */
const RISK_STYLE = {
  'read-only': 'text-emerald-300 border-emerald-400/30',
  dangerous:   'text-rose-300 border-rose-400/30',
};

/* One session, revealed line by line once the preview scrolls into view */
const SESSION = [
  { kind: 'prompt', text: `ai "what's using port 3000? stop it"` },
  { kind: 'step', n: 1, cmd: 'lsof -nP -iTCP:3000 -sTCP:LISTEN', why: 'Find what is listening on port 3000.', risk: 'read-only' },
  { kind: 'out', text: 'node  48213 me  23u  IPv4  TCP *:3000 (LISTEN)' },
  { kind: 'ok', text: 'exit 0 · 38ms' },
  { kind: 'step', n: 2, cmd: 'kill 48213', why: 'Stop the node process (PID 48213).', risk: 'dangerous' },
  { kind: 'ask', text: 'Run this dangerous command? [y/N/e=edit]', answer: 'y' },
  { kind: 'ok', text: 'exit 0 · 12ms' },
  { kind: 'done', text: 'Stopped node (PID 48213) on port 3000.' },
];

function SessionLine({ line }) {
  switch (line.kind) {
    case 'prompt':
      return <p className="text-fg"><span className="text-violet-300">~ $</span> {line.text}</p>;
    case 'step':
      return (
        <div className="rounded-lg border hairline bg-white/[0.02] px-3 py-2">
          <div className="flex items-center justify-between gap-2 text-[9.5px] text-fg-dim">
            <span>Step {line.n}</span>
            <span className={`rounded border px-1.5 py-px ${RISK_STYLE[line.risk]}`}>{line.risk}</span>
          </div>
          <p className="mt-1 text-sky-200">{line.cmd}</p>
          <p className="text-[10px] text-fg-dim">{line.why}</p>
        </div>
      );
    case 'out':
      return <p className="text-fg-muted">{line.text}</p>;
    case 'ok':
      return <p className="text-emerald-300">✓ <span className="text-fg-dim">{line.text}</span></p>;
    case 'ask':
      return <p className="text-amber-200">{line.text} <span className="text-fg">{line.answer}</span></p>;
    default:
      return <p className="font-semibold text-emerald-300">✓ {line.text}</p>;
  }
}

export function TerminalAgentPreview() {
  const ref = useRef(null);
  const [shown, setShown] = useState(prefersReducedMotion() ? SESSION.length : 1);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    let timer;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      timer = setInterval(() => setShown(n => {
        if (n >= SESSION.length) { clearInterval(timer); return n; }
        return n + 1;
      }), 650);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => { io.disconnect(); clearInterval(timer); };
  }, []);

  return (
    <div ref={ref}>
      <BrowserFrame url="ai-agent.serverpulse.in" accent="#a78bfa">
        <div className="min-h-[19rem] space-y-2 rounded-xl border hairline bg-night-950 p-3 font-mono text-[11px] leading-relaxed">
          {SESSION.slice(0, shown).map((line, i) => (
            <div key={i} className="animate-fadeUp opacity-0"><SessionLine line={line} /></div>
          ))}
          {shown < SESSION.length && <span className="inline-block h-3 w-1.5 animate-blink bg-violet-300" />}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            { k: 'Tokens this month', v: '182K' },
            { k: 'Limit', v: '500K' },
            { k: 'Requests', v: '64' },
          ].map(t => (
            <div key={t.k} className="rounded-xl border border-violet-400/15 bg-violet-400/[0.05] px-2 py-2">
              <p className="font-display text-base font-semibold text-fg">{t.v}</p>
              <p className="text-[9.5px] text-fg-dim">{t.k}</p>
            </div>
          ))}
        </div>
      </BrowserFrame>
    </div>
  );
}

export const PREVIEWS = {
  serverpulse:   ServerPulsePreview,
  cloudledger:   CloudLedgerPreview,
  cloudwright:   CloudwrightPreview,
  terminalagent: TerminalAgentPreview,
};
