import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { LogoFull } from './Logo';
import { SOCIALS } from './ui';

const NAV_LINKS = [
  { href: '#products',       label: 'Products' },
  { href: '#certifications', label: 'Certs' },
  { href: '#experience',     label: 'Experience' },
  { href: '#skills',         label: 'Skills' },
  { href: '#projects',       label: 'Projects' },
  { href: '#journey',        label: 'Story' },
  { href: '#contact',        label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    NAV_LINKS.forEach(l => {
      const el = document.getElementById(l.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
          scrolled || menuOpen ? 'glass shadow-[0_10px_40px_-12px_rgba(0,0,0,0.8)]' : 'border border-transparent'
        }`}
      >
        <a href="#top" aria-label="Back to top">
          <LogoFull size={32} />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(link => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  isActive ? 'bg-white/[0.07] text-fg' : 'text-fg-muted hover:text-fg'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={SOCIALS.email} className="btn-primary !px-4 !py-2">Hire me</a>
        </div>

        <button
          className="rounded-lg p-2 text-fg-muted hover:bg-white/5 hover:text-fg lg:hidden"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-2 lg:hidden">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-fg-muted hover:bg-white/5 hover:text-fg"
            >
              {link.label}
            </a>
          ))}
          <a href={SOCIALS.email} className="btn-primary mt-2 w-full">Hire me</a>
        </div>
      )}
    </header>
  );
}
