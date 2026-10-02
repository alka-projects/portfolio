import { Briefcase, MapPin, ChevronRight, Building2 } from 'lucide-react';
import { Reveal, SectionHeader, SpotlightCard } from './ui';

/* Emphasise metrics in a highlight ("80%", "2,000+") — but not the digits in names like EC2 or S3 */
function withMetrics(text) {
  return text.split(/((?<![A-Za-z\d])\d[\d,]*(?:\.\d+)?[%+])/g).map((part, i) =>
    /^\d/.test(part) ? <span key={i} className="font-semibold text-emerald-300">{part}</span> : part
  );
}

export default function PipelineExp({ experience }) {
  return (
    <section id="experience" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          index="03"
          eyebrow="Experience"
          title={<>Shipping infrastructure <span className="text-gradient">at enterprise scale.</span></>}
          subtitle="From full-stack foundations to running 20+ AWS accounts and 2,000+ servers for a global enterprise client at TCS."
        />

        <div className="relative">
          <div className="absolute bottom-6 left-[19px] top-6 hidden w-px bg-gradient-to-b from-emerald-400/60 via-white/10 to-transparent md:block" />

          <div className="space-y-6">
            {experience.map((job, i) => (
              <Reveal key={job.id} delay={i * 100} className="relative md:pl-16">
                <span className="absolute left-0 mt-8 hidden h-10 w-10 items-center justify-center rounded-xl border hairline bg-night-850 md:flex">
                  <Briefcase size={16} className={i === 0 ? 'text-emerald-300' : 'text-fg-muted'} />
                  {i === 0 && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />}
                </span>

                <SpotlightCard color={i === 0 ? 'emerald' : 'sky'} className="p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs text-fg-dim">{job.period}</p>
                      <h3 className="mt-1.5 font-display text-2xl font-semibold text-fg md:text-[28px]">{job.role}</h3>
                      <p className="mt-1 text-[15px] text-fg-muted">{job.company}</p>
                      {job.client && (
                        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-emerald-200">
                          <Building2 size={14} /> Client: {job.client}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="chip"><MapPin size={11} className="mr-1" />{job.location}</span>
                      <span className={`chip ${i === 0 ? '!border-emerald-400/30 !text-emerald-300' : ''}`}>{job.type}</span>
                    </div>
                  </div>

                  {job.scope && (
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-md">
                      {job.scope.map(s => (
                        <div key={s.label} className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] px-4 py-3">
                          <p className="font-display text-3xl font-semibold text-fg">{s.value}</p>
                          <p className="mt-0.5 text-xs text-emerald-200/80">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <ul className="mt-6 grid gap-x-8 gap-y-3 md:grid-cols-2">
                    {job.highlights.map(h => (
                      <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
                        <ChevronRight size={15} className="mt-0.5 shrink-0 text-fg-dim" />
                        <span>{withMetrics(h)}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
