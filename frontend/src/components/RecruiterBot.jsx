import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, ChevronRight } from 'lucide-react';
import { asset } from './ui';

/* ── Knowledge base ─────────────────────────────────────── */
const KB = {
  hire: {
    keywords: ['how to hire', 'how do i hire', 'hiring process', 'onboard', 'make an offer', 'interview process', 'recruit', 'want to hire'],
    response: {
      title: 'How to Hire Arshad',
      body: `Here's the quickest path to bringing Arshad on board:

**Step 1 — Reach out directly**
Email **arshali471@gmail.com** or message him on LinkedIn. He responds within 24 hours.

**Step 2 — Share the role**
Send the JD and your timeline. He's open to Cloud, DevOps, SRE, Platform, Solutions Architect and AI infrastructure roles — India or international.

**Step 3 — Schedule a call**
A 30-min intro call is enough to align on expectations, tech fit and joining timeline.`,
      contacts: [
        { icon: '✉', label: 'Email (fastest)', value: 'arshali471@gmail.com',    url: 'mailto:arshali471@gmail.com' },
        { icon: 'in', label: 'LinkedIn',       value: 'md-arshad-ali-06279a1b2', url: 'https://www.linkedin.com/in/md-arshad-ali-06279a1b2' },
        { icon: '☎', label: 'Phone',           value: '+91 78708 31211',         url: 'tel:+917870831211' },
      ],
    },
  },

  availability: {
    keywords: ['available', 'availab', 'open to', 'notice period', 'when can he join', 'join', 'start', 'looking', 'opportunity', 'when', 'relocat', 'location', 'remote', 'work from', 'where'],
    response: {
      title: 'Availability',
      body: `Arshad is **actively open to new opportunities** in:

• Cloud & DevOps Engineering
• Solutions Architecture (AWS SA Professional)
• Site Reliability Engineering (SRE)
• Platform Engineering
• AI / ML Infrastructure

📍 **Location:** Delhi, India
🌏 **Open to:** Any location in India and abroad (relocation welcome)
💻 **Also open to:** Fully remote roles`,
      highlights: [
        { label: 'Open to Work', desc: 'Available for interviews' },
        { label: 'India + Global', desc: 'Open to any location' },
      ],
    },
  },

  products: {
    keywords: ['serverpulse', 'cloudledger', 'cloudwright', 'terminal agent', 'ai-agent', 'ai agent', 'agent platform', 'product', 'saas', 'side project'],
    response: {
      title: 'Products on serverpulse.in',
      body: `Arshad designs, builds and runs **four live products**:

**ServerPulse** — *serverpulse.in*
Real-time server monitoring with AI: 10-second metrics over WebSockets, smart alerting, security scanning, HTTP / SSL / PM2 / Docker monitoring, and a private assistant on a local LLM. Node.js, MongoDB, Redis, Socket.IO, React, Expo mobile app.

**CloudLedger** — *cloudledger.serverpulse.in*
Multi-cloud FinOps for AWS, GCP and Azure: cost explorer, anomalies, forecasting, allocation, automated optimization and a Claude-powered Cost Copilot. Next.js, TypeScript, MongoDB.

**Cloudwright** — *cloudwright.serverpulse.in*
Plain-English requirements → architecture diagram → vetted Terraform, with sandboxed plan/apply, approvals, spend caps and audit. Bedrock / Claude, Express, React.

**Terminal Agent** — *ai-agent.serverpulse.in*
AI agent platform for the command line: plain-English request → shell commands, each risk-rated by a local parser and Claude, run only with approval. Team portal with per-person token metering and limits. Python, FastAPI, Claude Code CLI.`,
      links: [
        { label: 'ServerPulse',  url: 'https://serverpulse.in' },
        { label: 'CloudLedger',  url: 'https://cloudledger.serverpulse.in' },
        { label: 'Cloudwright',  url: 'https://cloudwright.serverpulse.in' },
        { label: 'Terminal Agent', url: 'https://ai-agent.serverpulse.in' },
      ],
    },
  },

  intro: {
    keywords: ['who', 'about', 'tell me', 'summary', 'overview', 'introduce', 'arshad', 'background', 'profile'],
    response: {
      title: 'About Arshad Ali',
      body: `Md Arshad Ali is an **AWS Certified Solutions Architect – Professional** and **Cloud & DevOps Engineer** based in **Delhi, India** with **4+ years** of hands-on experience.

At **Tata Consultancy Services (TCS)** he manages **20+ AWS accounts and 2,000+ servers** for client **IFF**, builds CI/CD pipelines and integrates AI into DevOps workflows. Outside work he builds and runs **four live products** on serverpulse.in.`,
      highlights: [
        { label: '80%', desc: 'Less manual ops effort' },
        { label: '60%', desc: 'Faster deployments' },
        { label: '20%', desc: 'Cloud cost savings' },
        { label: '2,000+', desc: 'Servers on AWS' },
        { label: '4',   desc: 'Live products' },
      ],
    },
  },

  certifications: {
    keywords: ['cert', 'certif', 'aws', 'terraform', 'hashicorp', 'qualification', 'credential', 'badge', 'professional', 'architect'],
    response: {
      title: 'Certifications',
      body: `**5 industry certifications**, led by AWS's top architecture credential:`,
      certs: [
        { name: 'AWS Certified Solutions Architect – Professional', issuer: 'Amazon Web Services · Sep 2026', color: '#fbbf24' },
        { name: 'AWS Certified Solutions Architect – Associate',    issuer: 'Amazon Web Services · Jun 2026', color: '#fbbf24' },
        { name: 'AWS Certified AI Practitioner',                    issuer: 'Amazon Web Services',            color: '#a78bfa' },
        { name: 'AWS Certified Cloud Practitioner',                 issuer: 'Amazon Web Services',            color: '#38bdf8' },
        { name: 'HashiCorp Certified: Terraform Associate',         issuer: 'HashiCorp',                      color: '#a78bfa' },
      ],
    },
  },

  skills: {
    keywords: ['skill', 'tech', 'stack', 'technolog', 'tool', 'know', 'expert', 'proficient', 'language', 'framework'],
    response: {
      title: 'Technical Skills',
      body: `Arshad's core technical stack:`,
      tags: [
        { group: 'Cloud',       items: ['AWS', 'EC2', 'Lambda', 'S3', 'RDS', 'EKS', 'Bedrock'] },
        { group: 'DevOps',      items: ['Kubernetes', 'Docker', 'Terraform', 'Helm', 'ArgoCD'] },
        { group: 'CI/CD',       items: ['Jenkins', 'GitHub Actions', 'AWS CodePipeline', 'GitOps'] },
        { group: 'AI & ML',     items: ['AWS Bedrock', 'Claude API', 'Ollama', 'SageMaker', 'LangChain', 'RAG'] },
        { group: 'Monitoring',  items: ['Grafana', 'Prometheus', 'CloudWatch'] },
        { group: 'Programming', items: ['Python', 'TypeScript', 'JavaScript', 'Bash'] },
      ],
    },
  },

  experience: {
    keywords: ['experience', 'work', 'job', 'career', 'tcs', 'tata', 'iff', 'client', 'account', 'server', 'scale', 'company', 'role', 'position', 'employer', 'history'],
    response: {
      title: 'Work Experience',
      body: `**Tata Consultancy Services — Cloud Engineer** *(July 2022 – Present)*
Delhi, India · Full-time · Client: **IFF (International Flavors & Fragrances)**

• Manages **20+ AWS accounts** and **2,000+ servers** for IFF — deployment and day-to-day operations
• Built an **AWS Cloud Data Inventory Tool** → **80% reduction** in manual effort
• Optimised CI/CD pipelines (Jenkins, CodePipeline) → **60% faster** deployments
• Led cloud cost optimisation → **20% reduction** in monthly AWS spend
• Maintained a **100% security compliance** score (AWS Config, GuardDuty)
• Cut incident response time by **50%** with CloudWatch + Grafana
• Integrated **AWS Bedrock & GenAI** into infrastructure automation

**Panicle Tech — Full Stack Developer** *(May 2021 – May 2022)*
Built production React + Node.js apps, designed REST APIs, prototyped ML features.`,
    },
  },

  projects: {
    keywords: ['project', 'built', 'build', 'create', 'develop', 'portfolio', 'monitor', 'platform'],
    response: {
      title: 'Key Projects',
      body: `**Products (live on serverpulse.in)**
ServerPulse (monitoring), CloudLedger (FinOps), Cloudwright (AI → Terraform) and Terminal Agent (AI agent for the terminal) — ask me about "products" for details.

**TCS AWS Management Platform**
Enterprise platform (~35K lines TypeScript) — browser SSH terminal, EC2 / S3 / RDS / EKS dashboards, cost analysis, Azure AD SSO → **80% ops reduction**

**Also at TCS:** CI/CD optimisation (**60% faster**), cost engine (**20% savings**), compliance automation (**100% score**), multi-cluster EKS (**99.9% uptime**).`,
      links: [{ label: 'Visit ServerPulse', url: 'https://serverpulse.in' }],
    },
  },

  ai: {
    keywords: ['ai', 'ml', 'machine learning', 'artificial', 'bedrock', 'claude', 'llm', 'genai', 'rag', 'sagemaker', 'intelligent'],
    response: {
      title: 'AI & ML Work',
      body: `Arshad builds at the intersection of **DevOps and AI**:

• **AI Cost Intelligence** — Bedrock + Claude analyse spend → **35% additional cost reduction**
• **Incident Response Bot** — Claude + LangChain with PagerDuty / Slack → **70% MTTR reduction**
• **Log Anomaly Detector** — SageMaker Random Cut Forest → **90% of failures predicted**
• **RAG Knowledge Base** — Bedrock Knowledge Bases → **80% fewer ops queries**
• **In his products** — local-LLM assistant in ServerPulse, Claude Cost Copilot in CloudLedger, AI → Terraform in Cloudwright, and Terminal Agent, an agentic AI platform for the shell`,
      highlights: [{ label: 'AWS AI Practitioner', desc: 'Certified' }],
    },
  },

  education: {
    keywords: ['education', 'degree', 'college', 'university', 'study', 'cgpa', 'grade', 'btech', 'b.tech', 'academic'],
    response: {
      title: 'Education',
      body: `**B.Tech in Computer Science & Engineering**
Guru Gobind Singh Educational Society's Technical Campus, Bokaro, Jharkhand
2018 – 2022`,
      highlights: [{ label: '8.64 / 10', desc: 'CGPA' }],
    },
  },

  contact: {
    keywords: ['contact', 'email', 'phone', 'linkedin', 'github', 'reach', 'connect', 'message', 'call', 'hire'],
    response: {
      title: 'Contact Arshad',
      body: `Arshad is **actively looking for opportunities**. Reach out through any channel below:`,
      contacts: [
        { icon: '✉', label: 'Email',    value: 'arshali471@gmail.com',    url: 'mailto:arshali471@gmail.com' },
        { icon: 'in', label: 'LinkedIn', value: 'md-arshad-ali-06279a1b2', url: 'https://www.linkedin.com/in/md-arshad-ali-06279a1b2' },
        { icon: '{}', label: 'GitHub',   value: 'github.com/arshali471',   url: 'https://github.com/arshali471' },
        { icon: '☎', label: 'Phone',    value: '+91 78708 31211',          url: 'tel:+917870831211' },
      ],
    },
  },

  resume: {
    keywords: ['resume', 'cv', 'curriculum vitae', 'cover letter', 'cover', 'download', 'pdf', 'document'],
    response: {
      title: 'Resume & Cover Letter',
      body: `Both open in a new tab with a **"Save as PDF"** button at the top. Works in all browsers.`,
      links: [
        { label: 'View Resume',       url: asset('resume.html') },
        { label: 'View Cover Letter', url: asset('cover-letter.html') },
      ],
    },
  },

  achievements: {
    keywords: ['achievement', 'award', 'recognition', 'accomplishment', 'honor', 'star'],
    response: {
      title: 'Key Achievements',
      body: `**Star Employee of the Month — TCS**
Delivered critical infrastructure automation ahead of schedule with **zero production incidents**.

**Cloud Cost Optimisation Leader — TCS**
Led an organisation-wide AWS cost initiative saving **20% of monthly spend** — recognised at division level.

**AWS Solutions Architect – Professional** — earned September 2026.`,
    },
  },
};

const GREETING = {
  title: `Hi! I'm Arshad's assistant 👋`,
  body: `Ask me anything about Arshad's experience, **products**, certifications, skills, or how to reach him.`,
};

const QUICK_CHIPS = [
  { label: '👤 Who is Arshad?',     query: 'Tell me about Arshad' },
  { label: '🚀 His products',       query: 'What products has he built?' },
  { label: '📜 Certifications',     query: 'What certifications does he have?' },
  { label: '💼 Experience',         query: 'Tell me about his work experience' },
  { label: '🛠 Skills',             query: 'What are his skills?' },
  { label: '🤖 AI work',            query: 'What AI and ML work has he done?' },
  { label: '📄 Resume',             query: 'Download resume' },
  { label: '📞 How to hire him?',   query: 'How to hire Arshad?' },
  { label: '✅ Available?',         query: 'Is Arshad available and open to relocation?' },
];

const FALLBACK = {
  title: 'Not sure about that',
  body: `I can answer questions about Arshad's **products, skills, experience, certifications, education and contact details**. Try a quick question below.`,
};

/* Specific topics first; broad ones (availability, intro) last so they don't swallow everything */
const MATCH_ORDER = [
  'hire', 'resume', 'products', 'certifications', 'ai', 'experience', 'skills',
  'projects', 'education', 'achievements', 'contact', 'availability', 'intro',
];

const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function getResponse(input) {
  const lower = input.toLowerCase();
  for (const key of MATCH_ORDER) {
    // Match at a word start so "ai" doesn't fire on "available" or "own" on "download"
    if (KB[key].keywords.some(kw => new RegExp(`\\b${escapeRe(kw)}`).test(lower))) return KB[key].response;
  }
  return FALLBACK;
}

/* Renders **bold** and *italic* from static KB text */
function FormattedText({ text }) {
  return (
    <div className="space-y-1.5">
      {text.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        const html = line
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-fg">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="text-fg-dim not-italic">$1</em>');
        return <p key={i} className="text-[13px] leading-relaxed text-fg-muted" dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </div>
  );
}

function BotMessage({ response }) {
  return (
    <div className="flex flex-col gap-2">
      {response.title && (
        <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-indigo-400/30 bg-indigo-400/10 px-2.5 py-1 text-[11px] font-semibold text-indigo-200">
          <Sparkles size={11} /> {response.title}
        </span>
      )}
      <div className="rounded-2xl rounded-tl-sm border hairline bg-white/[0.03] p-3.5">
        <FormattedText text={response.body} />

        {response.highlights?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {response.highlights.map(h => (
              <div key={h.label} className="flex items-center gap-2 rounded-xl border hairline bg-night-900 px-2.5 py-1.5">
                <span className="font-display text-sm font-semibold text-fg">{h.label}</span>
                <span className="text-[11px] text-fg-dim">{h.desc}</span>
              </div>
            ))}
          </div>
        )}

        {response.tags?.map(group => (
          <div key={group.group} className="mt-3">
            <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-fg-dim">{group.group}</p>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map(item => <span key={item} className="chip">{item}</span>)}
            </div>
          </div>
        ))}

        {response.certs?.map(cert => (
          <div key={cert.name} className="mt-2 flex items-center gap-2.5 rounded-xl border hairline bg-night-900 px-3 py-2">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: cert.color }} />
            <div>
              <p className="text-[12.5px] font-medium text-fg">{cert.name}</p>
              <p className="text-[11px] text-fg-dim">{cert.issuer}</p>
            </div>
          </div>
        ))}

        {response.contacts?.map(c => (
          <a
            key={c.label}
            href={c.url}
            target={c.url.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-2.5 rounded-xl border hairline bg-night-900 px-3 py-2 transition-colors hover:border-white/20"
          >
            <span className="w-5 text-center font-mono text-xs text-fg-muted">{c.icon}</span>
            <div>
              <p className="text-[11px] text-fg-dim">{c.label}</p>
              <p className="text-[12.5px] font-medium text-fg">{c.value}</p>
            </div>
            <ChevronRight size={14} className="ml-auto text-fg-dim" />
          </a>
        ))}

        {response.links?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {response.links.map(l => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200 hover:bg-emerald-400/20"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function RecruiterBot() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState('');
  const [typing, setTyping]     = useState(false);
  const bottomRef               = useRef(null);
  const inputRef                = useRef(null);

  useEffect(() => {
    if (open && messages.length === 0) setMessages([{ role: 'bot', response: GREETING }]);
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function send(text) {
    const trimmed = (text || input).trim();
    if (!trimmed) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: trimmed }]);
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', response: getResponse(trimmed) }]);
      setTyping(false);
    }, 650);
  }

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close recruiter assistant' : 'Open recruiter assistant'}
        className="fixed bottom-5 right-5 z-[1000] flex h-14 w-14 items-center justify-center rounded-full text-night-950 shadow-[0_10px_40px_-6px_rgba(129,140,248,0.7)] transition-transform hover:scale-105 md:bottom-7 md:right-7"
        style={{ background: 'linear-gradient(135deg, #c7d2fe 0%, #a5f3fc 50%, #bbf7d0 100%)' }}
      >
        {open ? <X size={22} strokeWidth={2.2} /> : <MessageCircle size={22} strokeWidth={2.2} />}
        {!open && <span className="absolute inset-0 animate-ping2 rounded-full bg-indigo-300/40" />}
      </button>

      <div
        className={`fixed bottom-24 right-4 z-[999] flex h-[min(600px,calc(100vh-8rem))] w-[min(420px,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-3xl border hairline bg-night-900/95 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-300 md:right-7 ${
          open ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-4 scale-95 opacity-0'
        }`}
        role="dialog"
        aria-label="Recruiter assistant"
      >
        <div className="flex shrink-0 items-center gap-3 border-b hairline px-5 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-300 to-emerald-200 text-night-950">
            <Sparkles size={16} />
          </span>
          <div>
            <p className="font-display text-[15px] font-semibold text-fg">Arshad's Assistant</p>
            <p className="text-[11px] text-fg-dim">Ask me anything about Arshad</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex animate-fadeUp opacity-0 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'user' ? (
                <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-indigo-400/90 px-3.5 py-2 text-[13px] text-night-950">{msg.text}</div>
              ) : (
                <div className="max-w-[94%]"><BotMessage response={msg.response} /></div>
              )}
            </div>
          ))}
          {typing && (
            <div className="flex w-fit gap-1.5 rounded-2xl rounded-tl-sm border hairline bg-white/[0.03] px-4 py-3">
              {[0, 1, 2].map(i => (
                <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg-dim" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="flex shrink-0 gap-1.5 overflow-x-auto border-t hairline px-3 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {QUICK_CHIPS.map(chip => (
            <button
              key={chip.label}
              onClick={() => send(chip.query)}
              className="shrink-0 whitespace-nowrap rounded-full border hairline bg-white/[0.03] px-3 py-1 text-[11.5px] text-fg-muted transition-colors hover:border-white/20 hover:text-fg"
            >
              {chip.label}
            </button>
          ))}
        </div>

        <div className="flex shrink-0 gap-2 border-t hairline px-3 py-3">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Ask about products, certs, experience…"
            className="flex-1 rounded-full border hairline bg-white/[0.04] px-4 py-2 text-[13px] text-fg placeholder:text-fg-dim focus:border-indigo-400/50 focus:outline-none"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim()}
            aria-label="Send"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-300 text-night-950 transition-opacity disabled:opacity-30"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </>
  );
}
