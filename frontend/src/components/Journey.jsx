import { useState } from 'react';
import { ChevronDown, Quote } from 'lucide-react';
import { Reveal, SectionHeader, accent, asset } from './ui';

const STORY = [
  {
    id: 'beginning',
    photo: 'e1f3beb5-daa2-445f-89b6-37ca54907e69.jpeg',
    photoLabel: 'The early days of hustle',
    photoPos: 'center 20%',
    eyebrow: 'The Beginning',
    heading: 'From curiosity to cloud.',
    body: `I was always drawn to how technology could solve real problems. My B.Tech in Computer Science laid the foundation — but the real education happened late at night, teaching myself Linux, networking and automation. Every broken environment was a puzzle worth solving.`,
    quote: `The best engineers aren't born — they're forged in failed deployments.`,
  },
  {
    id: 'tcs',
    photo: 'image copy.png',
    photoLabel: 'Building at scale — TCS',
    photoPos: 'center 10%',
    eyebrow: 'The Big Leagues',
    heading: 'Shipping infrastructure at enterprise scale.',
    body: `At Tata Consultancy Services I stopped thinking in single servers and started thinking in fleets. Hundreds of EC2 instances, CI/CD pipelines teams actually trust, a 20% cut in cloud spend — this is where DevOps went from theory to muscle memory. Reliability isn't an accident; it's a system.`,
    quote: `Automate everything that can be automated. Focus humans on what only humans can do.`,
  },
  {
    id: 'builder',
    photo: 'image.png',
    photoLabel: 'Builder mode — serverpulse.in',
    photoPos: 'center 15%',
    eyebrow: 'The Builder Chapter',
    heading: 'Where DevOps meets product — and AI.',
    body: `Outside work I build products end-to-end: ServerPulse for observability, CloudLedger for FinOps and Cloudwright for AI-generated Terraform — all live on serverpulse.in. Wiring Claude, Bedrock and local LLMs into them taught me that the systems-thinking behind great DevOps is exactly what great AI products need.`,
    quote: `AI doesn't replace the engineer. It amplifies the one who understands the system.`,
  },
];

function StorySection({ section, index }) {
  const reverse = index % 2 === 1;
  return (
    <Reveal className="grid items-center gap-10 py-10 md:grid-cols-2 md:gap-16 md:py-14">
      <div className={`relative ${reverse ? 'md:order-2' : ''}`}>
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-white/20 via-white/5 to-transparent" />
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={asset(section.photo)}
            alt={section.eyebrow}
            loading="lazy"
            className="h-[clamp(340px,44vw,500px)] w-full object-cover grayscale-[25%] transition-all duration-700 hover:scale-[1.03] hover:grayscale-0"
            style={{ objectPosition: section.photoPos }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent" />
          <span className="glass absolute bottom-4 left-4 rounded-full px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-widest text-fg">
            {section.photoLabel}
          </span>
        </div>
      </div>

      <div className={reverse ? 'md:order-1' : ''}>
        <p className="eyebrow">{section.eyebrow}</p>
        <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-fg md:text-4xl">{section.heading}</h3>
        <p className="mt-5 text-[15px] leading-relaxed text-fg-muted">{section.body}</p>
        <blockquote className="mt-6 flex gap-3 border-l-2 border-indigo-400/50 pl-4">
          <Quote size={16} className="mt-1 shrink-0 text-indigo-300/70" />
          <p className="font-display text-base italic text-fg">{section.quote}</p>
        </blockquote>
      </div>
    </Reveal>
  );
}

function Chapter({ chapter, open, onToggle, last }) {
  const a = accent(chapter.color);
  return (
    <div className="relative flex gap-4">
      <div className="flex w-8 shrink-0 flex-col items-center">
        <span
          className="z-10 mt-5 h-3 w-3 rounded-full border-2 transition-all"
          style={{ borderColor: a.hex, background: open ? a.hex : '#05060a', boxShadow: open ? `0 0 14px ${a.hex}` : 'none' }}
        />
        {!last && <span className="w-px flex-1 bg-gradient-to-b from-white/15 to-white/5" />}
      </div>

      <button
        onClick={onToggle}
        aria-expanded={open}
        className={`mb-3 flex-1 rounded-2xl border px-5 py-4 text-left transition-colors ${open ? 'bg-white/[0.04]' : 'hairline hover:bg-white/[0.025]'}`}
        style={open ? { borderColor: `rgba(${a.rgb},0.35)` } : undefined}
      >
        <span className="flex items-center justify-between gap-4">
          <span className="block">
            <span className="block font-mono text-[11px] uppercase tracking-widest" style={{ color: a.hex }}>{chapter.year}</span>
            <span className="mt-1 block font-display text-[17px] font-medium text-fg">{chapter.title}</span>
          </span>
          <ChevronDown size={16} className={`shrink-0 text-fg-dim transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </span>
        <span className={`grid transition-all duration-500 ease-out ${open ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <span className="block overflow-hidden text-sm leading-relaxed text-fg-muted">{chapter.content}</span>
        </span>
      </button>
    </div>
  );
}

export default function Journey({ journey }) {
  const latest = [...journey.chapters].reverse().find(c => c.year !== 'Now');
  const [open, setOpen] = useState(latest?.id ?? null);

  return (
    <section id="journey" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          index="07"
          eyebrow="My story"
          title={<>The journey <span className="text-gradient">so far.</span></>}
          subtitle={journey.intro}
        />

        {STORY.map((s, i) => <StorySection key={s.id} section={s} index={i} />)}

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Chapter by chapter</p>
            <h3 className="mt-3 font-display text-3xl font-semibold text-fg">The full timeline</h3>
            <div className="relative mt-6 overflow-hidden rounded-3xl">
              <img
                src={asset('IMG_2094.jpeg')}
                alt="Arshad Ali outdoors"
                loading="lazy"
                className="h-80 w-full object-cover"
                style={{ objectPosition: 'center 10%' }}
              />
              <span className="glass absolute bottom-4 left-4 rounded-full px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-widest text-fg">
                Outside the screen
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              Beyond deployments and pipelines: exploring new places, staying curious about the world outside the terminal,
              and always learning — a new cloud service or a new city.
            </p>
          </Reveal>

          <Reveal>
            {journey.chapters.map((c, i) => (
              <Chapter
                key={c.id}
                chapter={c}
                open={open === c.id}
                onToggle={() => setOpen(open === c.id ? null : c.id)}
                last={i === journey.chapters.length - 1}
              />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
