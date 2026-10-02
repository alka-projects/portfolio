import { Bot, Brain, Search, Lightbulb, Sparkles } from 'lucide-react';
import { Reveal, SectionHeader, SpotlightCard } from './ui';

const ICONS = { bot: Bot, brain: Brain, search: Search, lightbulb: Lightbulb };

export default function AIProjects({ aiProjects }) {
  return (
    <section id="ai" className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-violet-600/[0.12] blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          index="06"
          eyebrow="AI × DevOps"
          title={<>Where infrastructure <span className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">starts to think.</span></>}
          subtitle="GenAI and ML built into operations — Bedrock, Claude, SageMaker and RAG applied to cost, incidents and knowledge."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {aiProjects.map((p, i) => {
            const Icon = ICONS[p.icon] || Sparkles;
            return (
              <Reveal key={p.id} delay={(i % 2) * 90}>
                <SpotlightCard color="violet" className="flex h-full flex-col p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <span className="icon-tile h-11 w-11 border-violet-400/25 bg-violet-400/10 text-violet-200"><Icon size={19} /></span>
                    <span className="chip !border-violet-400/30 !bg-violet-400/10 !text-violet-200">{p.badge}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-fg">{p.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.tech.map(t => <span key={t} className="chip">{t}</span>)}
                  </div>
                  <p className="mt-5 flex items-start gap-2 border-t hairline pt-4 text-sm font-medium text-violet-200">
                    <Sparkles size={15} className="mt-0.5 shrink-0" /> {p.impact}
                  </p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
