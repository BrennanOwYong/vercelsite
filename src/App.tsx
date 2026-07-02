/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ArrowRight, Check, Zap, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Brand mark                                                         */
/*  A single "gluu" glyph: a G drawn as a peaked house — which, when   */
/*  tilted and paired, reads as two fists meeting.                     */
/* ------------------------------------------------------------------ */

function GluuGlyph({
  className = '',
  strokeWidth = 12,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M58 64 L90 64 L90 88 L10 88 L10 44 L50 12 L90 44"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* The paired mark used in the nav / footer. The two glyphs are tilted
   slightly toward each other so they knock like two fists, not two Gs. */
function GluuMark({
  className = '',
  left = 'text-ink-900',
  right = 'text-gold-500',
}: {
  className?: string;
  left?: string;
  right?: string;
}) {
  return (
    <span className={`inline-flex items-end ${className}`}>
      <GluuGlyph className={`h-full w-auto -rotate-[10deg] ${left}`} />
      <GluuGlyph className={`h-full w-auto -ml-[0.18em] rotate-[10deg] scale-x-[-1] ${right}`} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Intro: two G's turn… and turn… into fists, then separate to reveal */
/* ------------------------------------------------------------------ */

function Intro({ onDone }: { onDone: () => void; key?: React.Key }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    // Fallback so the intro can never trap the page.
    const t = setTimeout(onDone, reduce ? 300 : 3600);
    return () => clearTimeout(t);
  }, [onDone, reduce]);

  if (reduce) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-cream-50"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <GluuMark className="h-24" />
      </motion.div>
    );
  }

  // Curtain halves that split apart at the end to reveal the hero.
  const curtain = (side: 'left' | 'right') => ({
    initial: { x: 0 },
    animate: {
      x: side === 'left' ? '-100%' : '100%',
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 2.7 },
    },
  });

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Split curtains */}
      <motion.div className="absolute inset-y-0 left-0 w-1/2 bg-cream-50" {...curtain('left')} />
      <motion.div className="absolute inset-y-0 right-0 w-1/2 bg-cream-50" {...curtain('right')} />

      {/* The two glyphs */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center gap-2"
        animate={{ opacity: [1, 1, 1, 0], transition: { duration: 3, times: [0, 0.7, 0.85, 1] } }}
      >
        {/* Left fist */}
        <motion.div
          className="h-28 w-28 text-ink-900"
          initial={{ rotate: -140, x: -120, opacity: 0, scale: 0.6 }}
          animate={{
            // turn… and turn… then settle tilted like a fist, knock in, then shove apart
            rotate: [-140, 220, 360, 350, 350],
            x: [-120, -20, -20, 4, -260],
            opacity: [0, 1, 1, 1, 1],
            scale: [0.6, 1, 1, 1.06, 1],
            transition: { duration: 3, times: [0, 0.42, 0.62, 0.72, 1], ease: [0.65, 0, 0.35, 1] },
          }}
        >
          <GluuGlyph className="h-full w-full" strokeWidth={11} />
        </motion.div>

        {/* Right fist (mirrored) */}
        <motion.div
          className="h-28 w-28 text-gold-500 scale-x-[-1]"
          initial={{ rotate: 140, x: 120, opacity: 0, scale: 0.6 }}
          animate={{
            rotate: [140, -220, -360, -350, -350],
            x: [120, 20, 20, -4, 260],
            opacity: [0, 1, 1, 1, 1],
            scale: [0.6, 1, 1, 1.06, 1],
            transition: { duration: 3, times: [0, 0.42, 0.62, 0.72, 1], ease: [0.65, 0, 0.35, 1] },
          }}
        >
          <GluuGlyph className="h-full w-full" strokeWidth={11} />
        </motion.div>

        {/* Impact spark on the knock */}
        <motion.div
          className="absolute h-40 w-40 rounded-full bg-gold-300/40 blur-2xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 0, 1.4, 0],
            opacity: [0, 0, 0.9, 0],
            transition: { duration: 3, times: [0, 0.7, 0.76, 0.9] },
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Content data                                                       */
/* ------------------------------------------------------------------ */

const PILLARS = [
  {
    key: 'simple',
    icon: Zap,
    title: 'Simple',
    copy: 'We keep deployment simple on your end while we handle the complexity. Plug in, and your agents are live — no re-platforming, no six-month integration.',
  },
  {
    key: 'sturdy',
    icon: ShieldCheck,
    title: 'Sturdy',
    copy: 'Built on a foundation of reliability and security. Your agents stay resilient under load, with consistent performance your business can lean on 24/7.',
  },
  {
    key: 'scalable',
    icon: TrendingUp,
    title: 'Scalable',
    copy: 'As you grow, your agents grow with you. Handle spikes effortlessly and expand your reach without re-engineering the infrastructure underneath.',
  },
];

const STATS = [
  { value: '99.98%', label: 'Uptime across deployments' },
  { value: '11 min', label: 'Median time to first agent live' },
  { value: '4.2×', label: 'Avg. throughput after scaling' },
];

const TRUST = ['northwind', 'lumen', 'apexpay', 'corebank', 'driftly', 'meridian', 'volt', 'harbor'];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number; key?: React.Key }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="flex items-center gap-2.5">
          <GluuMark className="h-7" />
          <span className="text-2xl font-extrabold tracking-tight text-ink-900">gluu</span>
        </a>
        <nav className="hidden items-center gap-9 text-sm font-semibold text-ink-700 md:flex">
          <a className="transition hover:text-ink-900" href="#pillars">Product</a>
          <a className="transition hover:text-ink-900" href="#how">How it works</a>
          <a className="transition hover:text-ink-900" href="#proof">Results</a>
        </nav>
        <a
          href="#cta"
          className="group flex items-center gap-1.5 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-bold text-cream-50 transition hover:bg-ink-800"
        >
          Book a demo
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pt-36 pb-24 md:px-10 md:pt-44 md:pb-32">
      {/* soft gold glow */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-gold-200/50 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-gold-100/60 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-gold-300 bg-gold-50 px-4 py-1.5 text-sm font-semibold text-gold-700"
        >
          <Sparkles className="h-4 w-4" />
          AI agents, deployed and dependable
        </motion.div>

        <h1 className="max-w-4xl text-[13vw] font-extrabold leading-[0.92] tracking-tight text-ink-900 sm:text-7xl md:text-8xl">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
          >
            Keep your
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.28 }}
          >
            business{' '}
            <span className="relative inline-block text-gold-500">
              glued
              <motion.svg
                viewBox="0 0 300 20"
                className="absolute -bottom-2 left-0 w-full text-gold-400"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease, delay: 0.7 }}
              >
                <motion.path
                  d="M4 13 C 70 4, 150 4, 296 11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.4 }}
          >
            together.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.55 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-ink-500 md:text-xl"
        >
          gluu ships AI agents that are <span className="font-semibold text-ink-800">simple</span> to launch,{' '}
          <span className="font-semibold text-ink-800">sturdy</span> under pressure, and{' '}
          <span className="font-semibold text-ink-800">scalable</span> as you grow. You focus on the business — we handle the complexity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.68 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#cta"
            className="group flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-base font-bold text-ink-950 shadow-lg shadow-gold-500/25 transition hover:bg-gold-400"
          >
            Get started
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </a>
          <a
            href="#how"
            className="flex items-center gap-2 rounded-full border border-ink-900/15 px-7 py-3.5 text-base font-bold text-ink-900 transition hover:bg-ink-900/5"
          >
            See how it works
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <section className="border-y border-ink-900/10 bg-cream-100 py-6">
      <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-ink-400">
        Trusted by teams shipping agents in production
      </p>
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[...TRUST, ...TRUST].map((name, i) => (
            <span
              key={i}
              className="mx-8 text-2xl font-extrabold tracking-tight text-ink-400/70"
            >
              {name}
            </span>
          ))}
        </div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cream-100 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream-100 to-transparent" />
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section id="pillars" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <Reveal>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-600">Why gluu</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-5xl">
          Three things every deployment has to be.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {PILLARS.map((p, i) => (
          <Reveal key={p.key} delay={i * 0.1}>
            <div className="group flex h-full flex-col rounded-3xl border border-ink-900/10 bg-cream-50 p-8 transition hover:-translate-y-1 hover:border-gold-300 hover:shadow-xl hover:shadow-gold-500/5">
              <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700 transition group-hover:bg-gold-500 group-hover:text-ink-950">
                <p.icon className="h-6 w-6" />
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight text-ink-900">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-500">{p.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: '01', t: 'Connect', d: 'Point gluu at your tools and data. No re-platforming, no rip-and-replace.' },
    { n: '02', t: 'Configure', d: 'Describe what the agent should do. We wire the guardrails and fallbacks.' },
    { n: '03', t: 'Deploy', d: 'Ship to production in minutes and watch it hold up under real traffic.' },
  ];
  return (
    <section id="how" className="bg-ink-900 px-6 py-24 text-cream-50 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-400">How it works</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            From zero to a live agent in three steps.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-cream-50/10 bg-cream-50/10 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="h-full bg-ink-900 p-8 md:p-10">
                <span className="text-5xl font-extrabold text-gold-500">{s.n}</span>
                <h3 className="mt-6 text-2xl font-bold">{s.t}</h3>
                <p className="mt-3 leading-relaxed text-ink-400">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section id="proof" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-600">The results</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-5xl">
              Numbers that hold up in production.
            </h2>
          </Reveal>
          <div className="mt-10 space-y-8">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="flex items-baseline gap-6 border-b border-ink-900/10 pb-6">
                  <span className="w-44 shrink-0 whitespace-nowrap text-4xl font-extrabold tracking-tight text-gold-600 md:w-52 md:text-5xl">
                    {s.value}
                  </span>
                  <span className="text-lg text-ink-500">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Product preview mock */}
        <Reveal delay={0.15}>
          <div className="relative rounded-3xl border border-ink-900/10 bg-cream-100 p-4 shadow-2xl shadow-ink-900/10">
            <div className="animate-float rounded-2xl bg-ink-900 p-5 text-cream-50">
              <div className="mb-4 flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-cream-50/20" />
                <span className="h-3 w-3 rounded-full bg-cream-50/20" />
                <span className="h-3 w-3 rounded-full bg-gold-500" />
                <span className="ml-3 text-xs font-semibold text-ink-400">gluu · agent console</span>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <p className="text-ink-400">$ gluu deploy support-agent</p>
                <p className="text-cream-50">◇ connecting sources… <span className="text-gold-400">ok</span></p>
                <p className="text-cream-50">◇ wiring guardrails… <span className="text-gold-400">ok</span></p>
                <p className="text-cream-50">◇ scaling to 12 replicas… <span className="text-gold-400">ok</span></p>
                <p className="flex items-center gap-2 text-gold-400">
                  <Check className="h-4 w-4" /> live in 11 min · 99.98% uptime
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {['requests', 'p95 latency', 'errors'].map((k, i) => (
                <div key={k} className="rounded-xl bg-cream-50 p-3 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{k}</p>
                  <p className="mt-1 text-lg font-extrabold text-ink-900">
                    {['1.2M', '240ms', '0.01%'][i]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="px-6 pb-24 md:px-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gold-500 px-8 py-20 text-center md:py-28">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-400/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold-300/50 blur-3xl" />
        <div className="relative">
          <GluuMark className="mx-auto mb-8 h-12" left="text-ink-950" right="text-ink-950/70" />
          <h2 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-ink-950 md:text-6xl">
            Let's get your business glued together.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-900/70">
            Deploy your first agent this week. We'll handle the complexity.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:hello@gluu.ai"
              className="group flex items-center gap-2 rounded-full bg-ink-950 px-8 py-4 text-base font-bold text-cream-50 transition hover:bg-ink-800"
            >
              Book a demo
              <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="mailto:hello@gluu.ai"
              className="rounded-full border border-ink-950/25 px-8 py-4 text-base font-bold text-ink-950 transition hover:bg-ink-950/5"
            >
              Talk to sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink-900/10 px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <a href="#top" className="flex items-center gap-2.5">
          <GluuMark className="h-6" />
          <span className="text-xl font-extrabold tracking-tight text-ink-900">gluu</span>
        </a>
        <p className="text-sm text-ink-400">© 2026 gluu. AI agents that stick.</p>
        <div className="flex gap-6 text-sm font-semibold text-ink-500">
          <a className="transition hover:text-ink-900" href="#pillars">Product</a>
          <a className="transition hover:text-ink-900" href="#proof">Results</a>
          <a className="transition hover:text-ink-900" href="#cta">Contact</a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const [intro, setIntro] = useState(true);

  return (
    <div className="min-h-screen bg-cream-50 font-sans text-ink-900 selection:bg-gold-200">
      <AnimatePresence>{intro && <Intro key="intro" onDone={() => setIntro(false)} />}</AnimatePresence>

      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Pillars />
        <HowItWorks />
        <Proof />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
