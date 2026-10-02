import { useState } from 'react';
import { Mail, Phone, MapPin, Download, FileText, ArrowUpRight, Copy, Check } from 'lucide-react';
import { Reveal, LiveDot, GithubIcon, LinkedinIcon, SOCIALS, asset } from './ui';

const LINKS = [
  { href: SOCIALS.linkedin, Icon: LinkedinIcon, label: 'LinkedIn', value: 'md-arshad-ali-06279a1b2', external: true },
  { href: SOCIALS.github,   Icon: GithubIcon,   label: 'GitHub',   value: 'github.com/arshali471',   external: true },
  { href: SOCIALS.phone,    Icon: Phone,        label: 'Phone',    value: '+91 78708 31211' },
  { href: null,             Icon: MapPin,       label: 'Based in', value: 'Delhi, India · open to relocation & remote' },
];

export default function Contact({ profile }) {
  const [copied, setCopied] = useState(false);
  const email = profile.contact.email;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard blocked */ }
  };

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border hairline bg-night-850 p-7 md:p-14">
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
            <div className="pointer-events-none absolute -left-20 -top-24 h-80 w-80 rounded-full bg-indigo-500/25 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-emerald-400/15 blur-[110px]" />

            <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="eyebrow"><span className="text-fg-muted">09</span><span className="h-px w-6 bg-white/15" />Contact</p>
                <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] text-fg md:text-6xl">
                  Let's build something <span className="text-gradient">reliable.</span>
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-muted">
                  Open to Cloud, DevOps, SRE, Platform Engineering and Solutions Architect roles — in India or abroad,
                  on-site or remote. I usually reply within 24 hours.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href={`mailto:${email}`} className="btn-primary"><Mail size={16} /> {email}</a>
                  <button onClick={copy} className="btn-ghost" aria-label="Copy email address">
                    {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={asset('resume.html')} target="_blank" rel="noopener noreferrer" className="btn-ghost"><Download size={15} /> Resume</a>
                  <a href={asset('cover-letter.html')} target="_blank" rel="noopener noreferrer" className="btn-ghost"><FileText size={15} /> Cover letter</a>
                </div>

                <p className="mt-8 inline-flex items-center gap-2 text-sm text-emerald-300"><LiveDot /> Available for interviews</p>
              </div>

              <div className="grid content-start gap-3">
                {LINKS.map(({ href, Icon, label, value, external }) => {
                  const Tag = href ? 'a' : 'div';
                  return (
                    <Tag
                      key={label}
                      href={href || undefined}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className={`glass group flex items-center gap-4 rounded-2xl p-4 transition-colors ${href ? 'hover:border-white/20 hover:bg-white/[0.06]' : ''}`}
                    >
                      <span className="icon-tile h-11 w-11 text-fg-muted group-hover:text-fg"><Icon size={18} /></span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs text-fg-dim">{label}</span>
                        <span className="block truncate text-sm font-medium text-fg">{value}</span>
                      </span>
                      {href && <ArrowUpRight size={16} className="text-fg-dim transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />}
                    </Tag>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
