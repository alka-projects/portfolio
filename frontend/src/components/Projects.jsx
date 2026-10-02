import { Building2, Rocket, DollarSign, ShieldCheck, Layers, Globe, TrendingUp } from 'lucide-react';
import { Reveal, SectionHeader, SpotlightCard } from './ui';

const ICONS = { building: Building2, rocket: Rocket, dollar: DollarSign, shield: ShieldCheck, layers: Layers };

function ProjectCard({ project, featured }) {
  const Icon = ICONS[project.icon] || Globe;
  return (
    <SpotlightCard color="emerald" className={`flex h-full flex-col p-6 ${featured ? 'md:p-8' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <span className="icon-tile h-11 w-11 text-emerald-300"><Icon size={19} /></span>
        {featured && <span className="chip !border-emerald-400/30 !text-emerald-300">Flagship · TCS</span>}
      </div>

      <h3 className={`mt-5 font-display font-semibold text-fg ${featured ? 'text-2xl md:text-3xl' : 'text-lg'}`}>{project.name}</h3>
      <p className={`mt-3 flex-1 leading-relaxed text-fg-muted ${featured ? 'text-[15px]' : 'text-sm'}`}>{project.description}</p>

      {project.stats && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stats.map(s => (
            <span key={s} className="rounded-lg border hairline bg-white/[0.03] px-2.5 py-1 text-xs text-fg">{s}</span>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tech.map(t => <span key={t} className="chip">{t}</span>)}
      </div>

      <div className="mt-5 flex items-start gap-2 border-t hairline pt-4">
        <TrendingUp size={15} className="mt-0.5 shrink-0 text-emerald-300" />
        <p className="text-sm font-medium text-emerald-200">{project.impact}</p>
      </div>
    </SpotlightCard>
  );
}

export default function Projects({ projects }) {
  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          index="05"
          eyebrow="Platform work"
          title={<>DevOps &amp; platform engineering <span className="text-gradient">with measurable impact.</span></>}
          subtitle="Infrastructure, automation and internal platforms delivered at TCS."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {featured.map(p => (
            <Reveal key={p.id} className="md:col-span-2">
              <ProjectCard project={p} featured />
            </Reveal>
          ))}
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 80}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
