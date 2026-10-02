import { Star, Trophy, GraduationCap, Award } from 'lucide-react';
import { Reveal, SectionHeader, SpotlightCard } from './ui';

const ICONS = { star: Star, trophy: Trophy };

/* Recognition + education, shown together as one bento row */
export default function Achievements({ achievements, education }) {
  const pct = (parseFloat(education.cgpa) / parseFloat(education.maxCgpa)) * 100;

  return (
    <section id="recognition" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          index="08"
          eyebrow="Recognition & education"
          title={<>Recognised for <span className="text-gradient">impact.</span></>}
        />

        <div className="grid gap-4 md:grid-cols-3">
          {achievements.map((a, i) => {
            const Icon = ICONS[a.icon] || Award;
            return (
              <Reveal key={a.title} delay={i * 80}>
                <SpotlightCard color="amber" className="flex h-full flex-col p-6">
                  <span className="icon-tile h-11 w-11 border-amber-300/25 bg-amber-300/10 text-amber-200"><Icon size={19} /></span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-fg">{a.title}</h3>
                  <p className="mt-1 text-xs text-amber-200/80">{a.organization}</p>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{a.description}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}

          <Reveal delay={160}>
            <SpotlightCard color="sky" className="flex h-full flex-col p-6">
              <span className="icon-tile h-11 w-11 border-sky-300/25 bg-sky-300/10 text-sky-200"><GraduationCap size={19} /></span>
              <h3 className="mt-5 font-display text-xl font-semibold text-fg">{education.degree}</h3>
              <p className="mt-1 text-xs text-sky-200/80">{education.institution}</p>
              <p className="mt-1 text-xs text-fg-dim">{education.location} · {education.period}</p>

              <div className="mt-auto pt-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-fg-dim">CGPA</span>
                  <span className="font-display text-2xl font-semibold text-fg">
                    {education.cgpa}<span className="text-sm text-fg-dim"> / {education.maxCgpa}</span>
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-300" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
