import { ArrowUpRight, Check } from 'lucide-react';
import { Reveal, SectionHeader, SpotlightCard, LiveDot, accent } from './ui';
import { PREVIEWS } from './ProductPreviews';

const COUNT_WORDS = { 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six' };

function ProductCard({ product, index }) {
  const a = accent(product.accent);
  const Preview = PREVIEWS[product.id];
  const flip = index % 2 === 1;

  return (
    <Reveal>
      <SpotlightCard color={product.accent} className="overflow-hidden p-6 md:p-10">
        <div
          className="pointer-events-none absolute -top-32 h-72 w-72 rounded-full blur-[100px]"
          style={{ background: `rgba(${a.rgb},0.18)`, [flip ? 'right' : 'left']: '-6rem' }}
        />
        <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Copy */}
          <div className={flip ? 'lg:order-2' : ''}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip" style={{ color: a.hex, borderColor: `rgba(${a.rgb},0.3)`, background: `rgba(${a.rgb},0.08)` }}>
                {product.category}
              </span>
              <span className="chip gap-1.5 text-emerald-300"><LiveDot size={6} /> Live in production</span>
            </div>

            <h3 className="mt-5 font-display text-4xl font-semibold tracking-tight text-fg md:text-5xl">{product.name}</h3>
            <p className="mt-2 font-display text-lg" style={{ color: a.hex }}>{product.tagline}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{product.description}</p>

            <ul className="mt-6 space-y-2.5">
              {product.features.map(f => (
                <li key={f} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md" style={{ background: `rgba(${a.rgb},0.12)` }}>
                    <Check size={12} strokeWidth={3} style={{ color: a.hex }} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-7 grid grid-cols-3 gap-2">
              {product.stats.map(s => (
                <div key={s.label} className="rounded-xl border hairline bg-white/[0.02] px-3 py-3">
                  <p className="font-display text-xl font-semibold text-fg md:text-2xl">{s.value}</p>
                  <p className="mt-0.5 text-[11px] leading-tight text-fg-dim">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {product.stack.map(t => <span key={t} className="chip">{t}</span>)}
            </div>

            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost group mt-8"
              style={{ borderColor: `rgba(${a.rgb},0.35)` }}
            >
              Open <span className="font-mono text-[13px]">{product.domain}</span>
              <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Preview */}
          <div className={flip ? 'lg:order-1' : ''}>
            {Preview && <Preview />}
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

export default function Products({ products }) {
  return (
    <section id="products" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          index="01"
          eyebrow="Products"
          title={<>{COUNT_WORDS[products.length] ?? products.length} live products.<br /><span className="text-gradient">Designed, built &amp; run by me.</span></>}
          subtitle="Running in production on serverpulse.in — observability, FinOps, AI-generated Terraform and an AI agent platform. I own each one end to end: agents, APIs, dashboards, billing and the AI layer on top."
        >
          <div className="mt-6 flex flex-wrap gap-2">
            {products.map(p => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="chip gap-1.5 transition-colors hover:text-fg"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent(p.accent).hex }} />
                {p.domain}
              </a>
            ))}
          </div>
        </SectionHeader>

        <div className="space-y-8">
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
