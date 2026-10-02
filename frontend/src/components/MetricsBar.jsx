import { useScrollReveal, useCounter } from '../hooks/useScrollReveal';

const TECH = [
  'AWS', 'Kubernetes', 'Terraform', 'Docker', 'EKS', 'Lambda', 'Bedrock', 'Claude API', 'GitHub Actions',
  'Jenkins', 'ArgoCD', 'Helm', 'Prometheus', 'Grafana', 'CloudWatch', 'Python', 'TypeScript', 'Node.js',
  'React', 'Next.js', 'MongoDB', 'Redis', 'Socket.IO', 'Ollama', 'LangChain', 'GuardDuty',
];

function Metric({ metric, visible, index }) {
  const count = useCounter(metric.value, 1400, visible);
  return (
    <div
      className="relative px-5 py-6 text-center md:py-8"
      style={{ transition: `opacity .6s ease ${index * 70}ms, transform .6s ease ${index * 70}ms`, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(12px)' }}
    >
      <p className="font-display text-4xl font-semibold tabular-nums text-fg md:text-5xl">
        {count.toLocaleString('en-US')}<span className="text-gradient">{metric.suffix}</span>
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-fg-dim">{metric.label}</p>
    </div>
  );
}

export function TechMarquee() {
  const row = [...TECH, ...TECH];
  return (
    <div
      className="relative overflow-hidden border-y hairline py-5"
      style={{ maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)' }}
    >
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-fg-dim">
            {t}
            <span className="h-1 w-1 rounded-full bg-white/15" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MetricsBar({ metrics }) {
  const [ref, visible] = useScrollReveal(0.25);
  return (
    <div ref={ref} className="mx-auto max-w-6xl px-5 md:px-8">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border hairline bg-white/[0.06] md:grid-cols-4 [&>*]:bg-night-900">
        {metrics.map((m, i) => <Metric key={m.label} metric={m} visible={visible} index={i} />)}
      </div>
    </div>
  );
}
