import { useCallback } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* Accent palette shared by every section. `hex` drives inline styles, `text` drives Tailwind. */
export const ACCENTS = {
  indigo:  { hex: '#818cf8', text: 'text-indigo-300',  rgb: '129,140,248' },
  emerald: { hex: '#34d399', text: 'text-emerald-300', rgb: '52,211,153' },
  sky:     { hex: '#38bdf8', text: 'text-sky-300',     rgb: '56,189,248' },
  violet:  { hex: '#a78bfa', text: 'text-violet-300',  rgb: '167,139,250' },
  amber:   { hex: '#fbbf24', text: 'text-amber-300',   rgb: '251,191,36' },
  cyan:    { hex: '#22d3ee', text: 'text-cyan-300',    rgb: '34,211,238' },
  rose:    { hex: '#fb7185', text: 'text-rose-300',    rgb: '251,113,133' },
};

export const accent = name => ACCENTS[name] || ACCENTS.indigo;

export const asset = path => import.meta.env.BASE_URL + path.replace(/^\//, '');

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* Fades + lifts children in once they scroll into view */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, visible] = useScrollReveal(0.12);
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function SectionHeader({ index, eyebrow, title, subtitle, align = 'left', children }) {
  const center = align === 'center';
  return (
    <Reveal className={`mb-12 md:mb-16 ${center ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl'}`}>
      <p className={`eyebrow ${center ? 'justify-center' : ''}`}>
        {index && <span className="text-fg-muted">{index}</span>}
        {index && <span className="h-px w-6 bg-white/15" />}
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] text-fg md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-fg-muted md:text-lg">{subtitle}</p>}
      {children}
    </Reveal>
  );
}

/* Card whose border and background glow follow the cursor */
export function SpotlightCard({ color = 'indigo', className = '', style, children, as: Tag = 'div', ...rest }) {
  const { rgb } = accent(color);
  const onMove = useCallback(e => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);
  return (
    <Tag
      onMouseMove={onMove}
      className={`spotlight glass rounded-2xl transition-transform duration-300 ${className}`}
      style={{ '--glow': `rgba(${rgb},0.6)`, '--glow-soft': `rgba(${rgb},0.08)`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function LiveDot({ color = '#34d399', size = 8 }) {
  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      <span className="absolute inset-0 rounded-full animate-ping2" style={{ background: color }} />
      <span className="relative rounded-full" style={{ width: size, height: size, background: color }} />
    </span>
  );
}

export function GithubIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export const SOCIALS = {
  email:    'mailto:arshali471@gmail.com',
  linkedin: 'https://www.linkedin.com/in/md-arshad-ali-06279a1b2',
  github:   'https://github.com/arshali471',
  phone:    'tel:+917870831211',
};
