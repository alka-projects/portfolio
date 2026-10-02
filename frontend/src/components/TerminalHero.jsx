import { useEffect, useState } from 'react';
import { ArrowRight, Download, Mail, Award } from 'lucide-react';
import { LiveDot, GithubIcon, LinkedinIcon, SOCIALS, asset, prefersReducedMotion } from './ui';

/* Types each role out, pauses, deletes it, moves to the next */
function Typewriter({ words }) {
  const [text, setText] = useState(prefersReducedMotion() ? words[0] : '');
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const word = words[i % words.length];
    let delay = deleting ? 35 : 65;
    if (!deleting && text === word) delay = 1800;
    if (deleting && text === '') delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === '') { setDeleting(false); setI(n => n + 1); }
      else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return (
    <span className="font-mono text-sm text-emerald-300 md:text-base">
      <span className="text-fg-dim">~/arshad $ </span>
      {text}
      <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[3px] animate-blink bg-emerald-300/80" />
    </span>
  );
}

const TERMINAL_ROWS = [
  { name: 'serverpulse', host: 'serverpulse.in' },
  { name: 'cloudledger', host: 'cloudledger.*' },
  { name: 'cloudwright', host: 'cloudwright.*' },
  { name: 'terminal-agent', host: 'ai-agent.*' },
];

function ProductsTerminal() {
  return (
    <div className="glass overflow-hidden rounded-2xl !bg-night-900/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-1.5 border-b hairline px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 font-mono text-[11px] text-fg-dim">zsh — prod</span>
      </div>
      <div className="space-y-1 px-4 py-3 font-mono text-[11.5px] leading-relaxed">
        <p className="text-fg-muted"><span className="text-emerald-300">$</span> kubectl get products -A</p>
        <p className="text-fg-dim"><span className="inline-block w-[7.2rem]">NAME</span><span className="inline-block w-[8rem]">HOST</span>STATUS</p>
        {TERMINAL_ROWS.map((r, idx) => (
          <p
            key={r.name}
            className="flex opacity-0 animate-fadeUp text-fg"
            style={{ animationDelay: `${0.9 + idx * 0.45}s` }}
          >
            <span className="w-[7.2rem] shrink-0">{r.name}</span>
            <span className="w-[8rem] shrink-0 truncate text-fg-muted">{r.host}</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-300"><LiveDot size={6} /> Running</span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default function TerminalHero({ profile, products }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40">
      {/* Backdrop */}
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-10%] top-40 h-[380px] w-[380px] rounded-full bg-emerald-400/10 blur-[110px]" />
      <div className="pointer-events-none absolute left-[-10%] top-72 h-[320px] w-[320px] rounded-full bg-sky-500/10 blur-[110px]" />

      <div
        className={`relative mx-auto grid max-w-6xl items-center gap-16 px-5 transition-all duration-1000 md:px-8 lg:grid-cols-[1.15fr_0.85fr] ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        {/* ── Copy ── */}
        <div>
          <a
            href="#certifications"
            className="group inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/[0.07] py-1 pl-1 pr-3 text-xs text-amber-100 transition-colors hover:border-amber-300/50"
          >
            <span className="rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-night-950">New</span>
            AWS Certified Solutions Architect – Professional
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </a>

          <h1 className="mt-7 font-display text-[clamp(2.75rem,7vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
            <span className="text-fg">{profile.name.split(' ').slice(0, -2).join(' ')} </span>
            <span className="text-gradient">{profile.name.split(' ').slice(-2).join(' ')}</span>
          </h1>

          <div className="mt-5 h-7">
            <Typewriter words={profile.roles} />
          </div>

          <p className="mt-6 max-w-xl font-display text-xl leading-snug text-fg md:text-2xl">
            {profile.headline}
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-muted">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#products" className="btn-primary">
              Explore my products <ArrowRight size={16} />
            </a>
            <a href={asset('resume.html')} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <Download size={15} /> Resume
            </a>
            <a href={SOCIALS.email} className="btn-ghost">
              <Mail size={15} /> Get in touch
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-fg-muted">
            <span className="inline-flex items-center gap-2"><LiveDot /> Open to DevOps · SRE · Platform · Solutions Architect roles</span>
            <span className="flex items-center gap-1">
              <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-lg p-2 hover:bg-white/5 hover:text-fg"><GithubIcon size={17} /></a>
              <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-lg p-2 hover:bg-white/5 hover:text-fg"><LinkedinIcon size={17} /></a>
            </span>
          </div>
        </div>

        {/* ── Portrait + floating cards ── */}
        <div className="relative mx-auto w-full max-w-[420px]">
          <div className="absolute -inset-px rounded-[28px] bg-gradient-to-br from-indigo-400/50 via-sky-400/20 to-emerald-400/40" />
          <div className="relative overflow-hidden rounded-[27px] bg-night-850">
            <img
              src={asset('avatar.png')}
              alt={profile.name}
              className="aspect-[4/5] w-full object-cover object-top"
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/10 to-transparent" />
          </div>

          {/* Certification badge */}
          <div className="glass absolute -left-4 top-6 animate-floaty rounded-2xl !bg-night-900/90 px-3.5 py-3 shadow-2xl sm:-left-10">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-500 text-night-950">
                <Award size={20} strokeWidth={2.2} />
              </span>
              <div className="leading-tight">
                <p className="font-mono text-[10px] uppercase tracking-widest text-amber-200/80">AWS Certified</p>
                <p className="text-sm font-semibold text-fg">Solutions Architect</p>
                <p className="text-xs text-fg-muted">Professional · 2026</p>
              </div>
            </div>
          </div>

          {/* Years badge */}
          <div className="glass absolute -right-3 top-1/2 rounded-2xl !bg-night-900/90 px-4 py-3 text-center shadow-2xl sm:-right-8" style={{ animation: 'floaty 7s ease-in-out 1s infinite' }}>
            <p className="font-display text-3xl font-semibold text-fg">{products?.length ?? 3}</p>
            <p className="text-[11px] leading-tight text-fg-muted">live<br />products</p>
          </div>

          <div className="relative -mt-20 mx-3 sm:absolute sm:-bottom-12 sm:-left-12 sm:mx-0 sm:mt-0 sm:w-[384px]">
            <ProductsTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
