import { useEffect, useState } from 'react';
import Navbar       from './components/Navbar';
import { LogoMark } from './components/Logo';
import RecruiterBot from './components/RecruiterBot';
import TerminalHero from './components/TerminalHero';
import MetricsBar, { TechMarquee } from './components/MetricsBar';
import Products     from './components/Products';
import CertBadges   from './components/CertBadges';
import PipelineExp  from './components/PipelineExp';
import CloudSkills  from './components/CloudSkills';
import Projects     from './components/Projects';
import AIProjects   from './components/AIProjects';
import Journey      from './components/Journey';
import Achievements from './components/Achievements';
import Contact      from './components/Contact';
import { GithubIcon, LinkedinIcon, SOCIALS } from './components/ui';

function Loader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-night-950">
      <LogoMark size={44} />
      <div className="h-0.5 w-28 overflow-hidden rounded-full bg-white/5">
        <div className="h-full w-1/2 animate-shimmer rounded-full bg-[linear-gradient(90deg,transparent,#a5b4fc,#6ee7b7,transparent)] bg-[length:200%_100%]" />
      </div>
    </div>
  );
}

function Footer({ profile }) {
  return (
    <footer className="border-t hairline">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row md:px-8">
        <div className="flex items-center gap-3">
          <LogoMark size={30} />
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold text-fg">{profile.name}</p>
            <p className="text-xs text-fg-dim">Cloud & DevOps Engineer · AWS SA Professional · {profile.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-fg-dim">
          <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-lg p-2 hover:bg-white/5 hover:text-fg"><GithubIcon size={17} /></a>
          <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-lg p-2 hover:bg-white/5 hover:text-fg"><LinkedinIcon size={17} /></a>
          <a href="https://serverpulse.in" target="_blank" rel="noopener noreferrer" className="ml-2 font-mono text-xs hover:text-fg">serverpulse.in ↗</a>
        </div>
        <p className="font-mono text-[11px] text-fg-dim">© {new Date().getFullYear()} · React · Tailwind · Vite</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <Loader />;

  return (
    <div className="relative min-h-screen bg-night-950 text-fg">
      <Navbar />
      <main>
        <TerminalHero profile={data.profile} products={data.products} />
        <TechMarquee />
        <div className="pt-16 md:pt-20">
          <MetricsBar metrics={data.metrics} />
        </div>
        <Products products={data.products} />
        <CertBadges certs={data.certifications} />
        <PipelineExp experience={data.experience} />
        <CloudSkills skills={data.skills} />
        <Projects projects={data.projects} />
        <AIProjects aiProjects={data.aiProjects} />
        <Journey journey={data.journey} />
        <Achievements achievements={data.achievements} education={data.education} />
        <Contact profile={data.profile} />
      </main>
      <Footer profile={data.profile} />
      <RecruiterBot />
    </div>
  );
}
