import { Cloud, Layers, Boxes, Workflow, Brain, ShieldCheck, Code2, Globe } from 'lucide-react';
import { Reveal, SectionHeader, SpotlightCard, accent } from './ui';

const ICONS = { cloud: Cloud, layers: Layers, boxes: Boxes, workflow: Workflow, brain: Brain, shield: ShieldCheck, code: Code2, globe: Globe };

export default function CloudSkills({ skills }) {
  const entries = Object.entries(skills);

  return (
    <section id="skills" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          index="04"
          eyebrow="Skills"
          title={<>The stack I <span className="text-gradient">design, build and operate.</span></>}
          subtitle="Cloud architecture, automation and observability — plus the product engineering to ship it."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map(([name, group], i) => {
            const Icon = ICONS[group.icon] || Cloud;
            const a = accent(group.color);
            // 8 groups on a 4-col grid: widen four of them so every row is full
            const wide = [0, 4, 6, 7].includes(i);
            return (
              <Reveal key={name} delay={(i % 4) * 70} className={wide ? 'lg:col-span-2' : ''}>
                <SpotlightCard color={group.color} className="h-full p-5">
                  <div className="flex items-center gap-3">
                    <span className="icon-tile h-10 w-10" style={{ color: a.hex, background: `rgba(${a.rgb},0.08)`, borderColor: `rgba(${a.rgb},0.2)` }}>
                      <Icon size={18} />
                    </span>
                    <h3 className="font-display text-base font-semibold text-fg">{name}</h3>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {group.items.map(item => <span key={item} className="chip !text-[11.5px] !text-fg-muted">{item}</span>)}
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
