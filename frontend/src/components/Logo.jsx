/**
 * LogoMark — "A" monogram for Arshad Ali, drawn as SVG strokes on a dark tile
 * with a gradient edge. Used in the navbar, loader and footer.
 */
export function LogoMark({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Arshad Ali logo"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="logo-edge" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a5b4fc" />
          <stop offset="0.5" stopColor="#67e8f9" />
          <stop offset="1" stopColor="#6ee7b7" />
        </linearGradient>
      </defs>
      <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="10" fill="#0b0e16" stroke="url(#logo-edge)" strokeWidth="1.5" />
      <path d="M9 30 L20 10 L31 30" stroke="url(#logo-edge)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 23 H27" stroke="url(#logo-edge)" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

/* LogoFull — logomark + wordmark side-by-side */
export function LogoFull({ size = 34 }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <div className="leading-tight">
        <p className="font-display text-[15px] font-semibold text-fg">Arshad Ali</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-dim">Cloud · DevOps · AI</p>
      </div>
    </div>
  );
}
