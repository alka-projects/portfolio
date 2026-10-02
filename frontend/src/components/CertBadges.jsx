import { useState } from 'react';
import { ArrowUpRight, BadgeCheck, CalendarDays, Copy, Check } from 'lucide-react';
import { Reveal, SectionHeader, SpotlightCard, accent } from './ui';

/* Generic hexagonal credential badge (not an official logo) */
function HexBadge({ color = 'amber', label, size = 64, big = false }) {
  const a = accent(color);
  const id = `hex-${color}-${size}`;
  return (
    <svg width={size} height={size * 1.12} viewBox="0 0 100 112" aria-hidden="true" className="shrink-0">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a.hex} stopOpacity="0.95" />
          <stop offset="1" stopColor={a.hex} stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path d="M50 3 L95 29 L95 83 L50 109 L5 83 L5 29 Z" fill="#0b0e16" stroke={`url(#${id})`} strokeWidth={big ? 3 : 4} />
      <path d="M50 14 L85 34 L85 78 L50 98 L15 78 L15 34 Z" fill={`url(#${id})`} opacity="0.14" />
      <text x="50" y={big ? 62 : 64} textAnchor="middle" fontFamily="Space Grotesk, Inter, sans-serif" fontWeight="700" fontSize={big ? 22 : 24} fill={a.hex}>
        {label}
      </text>
    </svg>
  );
}

const LEVEL_LABEL = { Professional: 'PRO', Associate: 'ASC', Foundational: 'FND' };

// "June 20, 2026" -> "Jun 2026"
const shortDate = d => d.replace(/^(\w{3})\w*\s+\d+,\s*/, '$1 ');

function FeaturedCert({ cert }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cert.validationNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard blocked — number is still selectable */ }
  };

  return (
    <Reveal>
      <SpotlightCard color="amber" className="overflow-hidden p-6 md:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-amber-400/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-orange-500/10 blur-[90px]" />

        <div className="relative grid items-center gap-10 md:grid-cols-[auto_1fr]">
          <div className="relative mx-auto">
            <div className="absolute inset-0 rounded-full bg-amber-400/25 blur-3xl" />
            <div className="relative animate-floaty">
              <HexBadge color="amber" label="SA PRO" size={150} big />
            </div>
          </div>

          <div>
            <span className="chip border-amber-300/30 bg-amber-300/10 text-amber-200">
              <BadgeCheck size={12} className="mr-1.5" /> Newly earned · {cert.level}
            </span>
            <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-fg md:text-4xl">
              AWS Certified<br /><span className="bg-gradient-to-r from-amber-200 via-amber-300 to-orange-400 bg-clip-text text-transparent">Solutions Architect – Professional</span>
            </h3>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-muted">
              AWS's most demanding architecture credential — designing multi-account, resilient, secure and cost-optimised systems
              at enterprise scale, plus migration and modernisation strategy.
            </p>

            <dl className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border hairline bg-white/[0.02] px-4 py-3">
                <dt className="flex items-center gap-1.5 text-[11px] text-fg-dim"><CalendarDays size={12} /> Issued</dt>
                <dd className="mt-1 text-sm font-medium text-fg">{cert.issued}</dd>
              </div>
              <div className="rounded-xl border hairline bg-white/[0.02] px-4 py-3">
                <dt className="flex items-center gap-1.5 text-[11px] text-fg-dim"><CalendarDays size={12} /> Valid through</dt>
                <dd className="mt-1 text-sm font-medium text-fg">{cert.expires}</dd>
              </div>
              <div className="rounded-xl border hairline bg-white/[0.02] px-4 py-3">
                <dt className="text-[11px] text-fg-dim">Issuer</dt>
                <dd className="mt-1 text-sm font-medium text-fg">{cert.issuer}</dd>
              </div>
            </dl>

            <div className="mt-3 flex flex-col gap-3 rounded-xl border border-amber-300/15 bg-amber-300/[0.04] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-[11px] text-fg-dim">Validation number</p>
                <p className="mt-0.5 break-all font-mono text-[13px] text-amber-100">{cert.validationNumber}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={copy} className="btn-ghost !px-3 !py-1.5 !text-xs" aria-label="Copy validation number">
                  {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? 'Copied' : 'Copy'}
                </button>
                <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-3 !py-1.5 !text-xs">
                  Verify <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

export default function CertBadges({ certs }) {
  const featured = certs.find(c => c.featured);
  const rest = certs.filter(c => !c.featured);

  return (
    <section id="certifications" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          index="02"
          eyebrow="Certifications"
          title={<>Industry-validated, <span className="text-gradient">all the way to Professional.</span></>}
          subtitle={`${certs.length} certifications across AWS architecture, AI and infrastructure as code.`}
        />

        {featured && <FeaturedCert cert={featured} />}

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <SpotlightCard color={c.color} className="flex h-full flex-col gap-4 p-5">
                <div className="flex items-start justify-between">
                  <HexBadge color={c.color} label={LEVEL_LABEL[c.level] || 'CERT'} size={46} />
                  <span className="chip !py-0.5 !text-[10px]">{c.level}</span>
                </div>
                <div>
                  <p className="font-display text-[17px] font-semibold leading-snug text-fg">{c.name}</p>
                  <p className="mt-1 text-xs" style={{ color: accent(c.color).hex }}>{c.issuer}</p>
                </div>
                {c.issued && (
                  <div className="mt-auto flex items-end justify-between gap-2 border-t border-white/5 pt-3">
                    <p className="font-mono text-[11px] leading-relaxed text-fg-muted">
                      Issued {shortDate(c.issued)}
                      {c.expires && <><br />Valid to {shortDate(c.expires)}</>}
                    </p>
                    {c.verifyUrl && (
                      <a
                        href={c.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={c.validationNumber ? `Validation number ${c.validationNumber}` : undefined}
                        className="inline-flex items-center gap-0.5 text-[11px] font-medium text-fg-muted transition hover:text-fg"
                      >
                        Verify <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                )}
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
