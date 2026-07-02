/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Check,
  ShieldCheck,
  Brain,
  Wand2,
  Blocks,
  AppWindow,
  MousePointerClick,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Brand mark + wordmark                                              */
/* ------------------------------------------------------------------ */

function GluuGlyph({ className = '', strokeWidth = 12 }: { className?: string; strokeWidth?: number }) {
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

/* The "uu" set in a box — black text on the company colour — the way a
   certain adult site boxes its last syllable. Scales with font-size. */
function BoxedUU({ pre = 'gl', post = '', className = '' }: { pre?: string; post?: string; className?: string }) {
  return (
    <span className={className}>
      {pre}
      <span
        className="mx-[0.02em] inline-block rounded-[0.16em] px-[0.13em] text-ink-950"
        style={{ backgroundColor: 'var(--company-color)' }}
      >
        uu
      </span>
      {post}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Brand-colour toggle — flips one CSS variable at runtime            */
/* ------------------------------------------------------------------ */

const BRAND_COLORS = [
  { key: 'Option 5', hex: '#e5a50a', note: 'the reference gold' },
  { key: 'gluu', hex: '#f59e0b', note: 'our proposed orange' },
  { key: 'the other one', hex: '#ff9900', note: 'that famous orange' },
];

function ColorToggle() {
  const [active, setActive] = useState('#f59e0b');
  const pick = (hex: string) => {
    document.documentElement.style.setProperty('--company-color', hex);
    setActive(hex);
  };
  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-2xl border border-ink-900/10 bg-white/95 p-3 shadow-xl backdrop-blur">
      <p className="mb-2 px-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-ink-400">Brand colour</p>
      <div className="flex items-center gap-2">
        {BRAND_COLORS.map((c) => (
          <button
            key={c.hex}
            onClick={() => pick(c.hex)}
            title={`${c.key} · ${c.hex} — ${c.note}`}
            className={`flex flex-col items-center gap-1 rounded-lg p-1 transition ${
              active === c.hex ? 'ring-2 ring-ink-900' : 'ring-1 ring-ink-900/10 hover:ring-ink-900/30'
            }`}
          >
            <span
              className="inline-block rounded-[4px] px-1.5 py-0.5 text-sm font-extrabold text-ink-950"
              style={{ backgroundColor: c.hex }}
            >
              uu
            </span>
            <span className="text-[9px] font-mono text-ink-400">{c.hex}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const OFFERINGS = [
  {
    icon: Brain,
    tag: 'Company Brain',
    title: 'Your business, made askable.',
    copy: 'Stop logging into seven tools to find one answer. Ask "how are we doing this quarter?" or "what\'s at risk?" and get a single answer — pulled live from every tool at once, and only what you\'re allowed to see.',
  },
  {
    icon: Wand2,
    tag: 'Build by asking',
    title: 'Want an internal tool? Describe it. Get it.',
    copy: 'A live view of your whole business, plus the custom tools you never had the engineers to build. Describe what you need in plain English — it\'s working in minutes, grounded in your real data, yours to tweak.',
  },
  {
    icon: Blocks,
    tag: 'Bring your own AI',
    title: 'Already using AI tools? Keep them.',
    copy: 'The AI you already run each knows its own tiny slice. Plug them in and they finally share one understanding of your business — no rip-and-replace, they just get smarter together.',
  },
];

const STACK = ['Stripe', 'Slack', 'Salesforce', 'Notion', 'Linear', 'HubSpot', 'Gmail', 'Jira', 'QuickBooks', 'Zendesk'];

const STATS = [
  { value: '5 min', label: 'From "I need a tool" to using it' },
  { value: '0', label: 'Tools you have to rip out and replace' },
  { value: '1 brain', label: 'Every system, one shared source of truth' },
];

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
    <header
      className="fixed inset-x-0 top-0 z-40 bg-white shadow-sm"
      style={{ borderBottom: '2px solid color-mix(in oklab, var(--company-color) 32%, transparent)' }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-10 md:py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <GluuMark className="h-6 md:h-7" />
          <BoxedUU className="text-xl font-extrabold tracking-tight text-ink-900 md:text-2xl" />
        </a>
        <nav className="hidden items-center gap-9 text-sm font-semibold text-ink-700 md:flex">
          <a className="transition hover:text-ink-900" href="#offerings">What it does</a>
          <a className="transition hover:text-ink-900" href="#tabclone">Tab Clone</a>
          <a className="transition hover:text-ink-900" href="#proof">Why gluu</a>
        </nav>
        <a
          href="#cta"
          className="group flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-sm font-bold text-cream-50 transition hover:bg-ink-800 md:px-5 md:py-2.5"
        >
          Book a demo
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </header>
  );
}

/* Hero: the two G's rest slightly apart, then on the first scroll they
   collide (a fist bump) and fly apart — one smooth motion that carries you
   straight into the offerings. No scrubbing; a single triggered animation. */
function Hero() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<'rest' | 'bump' | 'exit'>('rest');
  const playing = useRef(false);

  const play = () => {
    if (playing.current || reduce) return;
    playing.current = true;
    setPhase('bump');
  };

  const goNext = () => document.getElementById('offerings')?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    if (reduce) return;
    const atTop = () => window.scrollY < 12;
    const onWheel = (e: WheelEvent) => {
      if (phase === 'rest' && atTop() && e.deltaY > 0) {
        e.preventDefault();
        play();
      }
    };
    let touchY: number | null = null;
    const onTS = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTM = (e: TouchEvent) => {
      if (phase === 'rest' && atTop() && touchY != null && touchY - e.touches[0].clientY > 8) {
        e.preventDefault();
        play();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (phase === 'rest' && atTop() && (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown')) {
        e.preventDefault();
        play();
      }
    };
    const onScroll = () => {
      if (window.scrollY < 6 && phase === 'exit') {
        playing.current = false;
        setPhase('rest');
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTS, { passive: true });
    window.addEventListener('touchmove', onTM, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTS);
      window.removeEventListener('touchmove', onTM);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
    };
  }, [phase, reduce]);

  // left / right fist choreography
  const leftV = {
    rest: { x: '-4%', scale: 1, opacity: 1, transition: { duration: 0.4, ease } },
    bump: { x: '7%', scale: 1.1, opacity: 1, transition: { duration: 0.24, ease: 'easeOut' } },
    exit: { x: '-260%', scale: 3.1, opacity: 0, transition: { duration: 0.75, ease: [0.6, 0, 0.35, 1] } },
  };
  const rightV = {
    rest: { x: '4%', scale: 1, opacity: 1, transition: { duration: 0.4, ease } },
    bump: { x: '-7%', scale: 1.1, opacity: 1, transition: { duration: 0.24, ease: 'easeOut' } },
    exit: { x: '260%', scale: 3.1, opacity: 0, transition: { duration: 0.75, ease: [0.6, 0, 0.35, 1] } },
  };

  return (
    <section id="top" className="relative flex h-screen items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-[460px] w-[460px] rounded-full bg-gold-200/40 blur-[120px]" />

      {/* the two fists */}
      <div className="flex items-center justify-center">
        <motion.div
          className="h-24 w-24 text-ink-900 md:h-40 md:w-40"
          variants={leftV}
          animate={reduce ? 'rest' : phase}
          onAnimationComplete={(def) => {
            if (def === 'bump') {
              setPhase('exit');
              goNext(); // scroll while the fists fly apart → one continuous motion
            }
          }}
        >
          <GluuGlyph className="h-full w-full -rotate-[10deg]" strokeWidth={11} />
        </motion.div>
        <motion.div className="-ml-3 h-24 w-24 text-gold-500 md:h-40 md:w-40" variants={rightV} animate={reduce ? 'rest' : phase}>
          <GluuGlyph className="h-full w-full -rotate-[10deg] scale-x-[-1]" strokeWidth={11} />
        </motion.div>
      </div>

      {/* wordmark + hint (fade out once the bump starts) */}
      <motion.div
        className="pointer-events-none absolute bottom-[16%] flex flex-col items-center gap-3 text-center"
        animate={{ opacity: phase === 'rest' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <BoxedUU className="text-4xl font-extrabold tracking-tight text-ink-900 md:text-5xl" />
        <button
          onClick={() => (reduce ? goNext() : play())}
          className="pointer-events-auto flex flex-col items-center gap-1.5 text-ink-400 transition hover:text-ink-700"
        >
          <span className="text-xs font-semibold uppercase tracking-widest">Scroll to open</span>
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
            <ArrowDown className="h-5 w-5" />
          </motion.span>
        </button>
      </motion.div>
    </section>
  );
}

function Offerings() {
  return (
    <section id="offerings" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      {/* the reveal you land on after the fist-bump */}
      <Reveal>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-600">The operational glue</p>
        <h2 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900 md:text-7xl">
          Your whole company,{' '}
          <span className="text-gold-500">
            <BoxedUU pre="gl" post="d" />
          </span>{' '}
          into one.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-ink-500 md:text-xl">
          Your business runs on 30 tools that don't talk to each other. gluu makes them act like one — so you, and the AI
          you already use, can finally just ask.
        </p>
      </Reveal>

      <div className="mt-16 border-t border-ink-900/10 pt-14">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-600">What gluu does</p>
          <h3 className="mt-3 max-w-2xl text-2xl font-extrabold tracking-tight text-ink-900 md:text-3xl">
            We don't replace your tools. We make them work together.
          </h3>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {OFFERINGS.map((o, i) => (
            <Reveal key={o.tag} delay={i * 0.1}>
              <div className="group flex h-full flex-col rounded-3xl border border-ink-900/10 bg-cream-50 p-7 transition hover:-translate-y-1 hover:border-gold-300 hover:shadow-xl hover:shadow-gold-500/5 md:p-8">
                <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700 transition group-hover:bg-gold-500 group-hover:text-ink-950">
                  <o.icon className="h-6 w-6" />
                </span>
                <p className="text-xs font-bold uppercase tracking-widest text-gold-600">{o.tag}</p>
                <h4 className="mt-2 text-2xl font-extrabold leading-snug tracking-tight text-ink-900">{o.title}</h4>
                <p className="mt-3 leading-relaxed text-ink-500">{o.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TabCloneVisual() {
  const Tab = ({ label, active = false }: { label: string; active?: boolean }) => (
    <div
      className={`flex items-center gap-2 rounded-t-lg px-3 py-2 text-xs font-semibold ${
        active ? 'bg-ink-800 text-cream-50' : 'bg-ink-900/60 text-ink-400'
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${active ? 'bg-gold-500' : 'bg-ink-400/50'}`} />
      {label}
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-ink-900/10 bg-ink-900 p-4 shadow-2xl shadow-ink-900/20">
      <div className="flex items-end gap-1">
        <Tab label="acme-vendor-portal" active />
        <motion.div
          initial={{ opacity: 0, x: -14, scale: 0.9 }}
          animate={{ opacity: [0, 1, 1, 0], x: [-14, 0, 0, 0], scale: [0.9, 1, 1, 0.95] }}
          transition={{ duration: 3.2, times: [0, 0.25, 0.8, 1], repeat: Infinity, repeatDelay: 0.4 }}
        >
          <Tab label="acme-vendor-portal (clone)" />
        </motion.div>
      </div>

      <div className="relative rounded-b-lg rounded-tr-lg bg-ink-800 p-5">
        <div className="space-y-2.5">
          <div className="h-2.5 w-2/3 rounded-full bg-cream-50/15" />
          <div className="h-2.5 w-1/2 rounded-full bg-cream-50/10" />
          <div className="mt-4 h-9 w-40 rounded-lg bg-gold-500/90" />
          <div className="h-2.5 w-3/4 rounded-full bg-cream-50/10" />
        </div>

        <motion.div
          className="absolute left-6 top-6"
          animate={{ x: [0, 120, 120, 0], y: [0, 96, 96, 0] }}
          transition={{ duration: 3.2, times: [0, 0.35, 0.8, 1], repeat: Infinity, repeatDelay: 0.4, ease: 'easeInOut' }}
        >
          <MousePointerClick className="h-6 w-6 text-cream-50 drop-shadow" />
          <motion.span
            className="absolute -left-1 -top-1 h-8 w-8 rounded-full bg-gold-400/40"
            animate={{ scale: [0, 0, 1.6, 0], opacity: [0, 0, 0.8, 0] }}
            transition={{ duration: 3.2, times: [0, 0.32, 0.4, 0.5], repeat: Infinity, repeatDelay: 0.4 }}
          />
        </motion.div>
      </div>
    </div>
  );
}

function TabClone() {
  return (
    <section id="tabclone" className="bg-ink-900 px-5 py-20 text-cream-50 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold-400">
              <AppWindow className="h-3.5 w-3.5" /> Sub-product · Tab Clone
            </span>
            <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Even the tools that don't connect.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-400">
              Some tools will never have a clean way to plug in — old vendor portals, government sites, that one niche
              industry app. Teach gluu once in a browser tab, and it{' '}
              <span className="font-semibold text-cream-50">clones the clicks</span> for you, every time after. No API
              required. If your business can use it, so can gluu.
            </p>
            <ul className="mt-7 space-y-3">
              {['Works with anything you can open in a tab', 'You watch it once — it repeats it for you', 'Every action recorded, and reversible'].map((t) => (
                <li key={t} className="flex items-center gap-3 text-cream-50/90">
                  <Check className="h-5 w-5 shrink-0 text-gold-400" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <TabCloneVisual />
        </Reveal>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <section className="border-b border-ink-900/10 bg-cream-100 py-8">
      <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-ink-400">
        Designed to sit on top of the stack you already run
      </p>
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[...STACK, ...STACK].map((name, i) => (
            <span key={i} className="mx-7 text-xl font-extrabold tracking-tight text-ink-400/70 md:text-2xl">
              {name}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-cream-100 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-cream-100 to-transparent" />
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section id="proof" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-600">Why gluu</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-5xl">
              Just ask. Get one answer.
            </h2>
            <p className="mt-5 max-w-lg text-lg text-ink-500">
              No more stitching together a guess from seven tabs. Everything about how your business runs, in one place —
              and every answer points back to the source, so you trust the record, not the AI.
            </p>
          </Reveal>
          <div className="mt-10 space-y-6">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="flex items-baseline gap-6 border-b border-ink-900/10 pb-5">
                  <span className="w-40 shrink-0 whitespace-nowrap text-4xl font-extrabold tracking-tight text-gold-600 md:w-48 md:text-5xl">
                    {s.value}
                  </span>
                  <span className="text-base text-ink-500 md:text-lg">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15}>
          <div className="relative rounded-3xl border border-ink-900/10 bg-cream-100 p-4 shadow-2xl shadow-ink-900/10">
            <div className="animate-float rounded-2xl bg-ink-900 p-5 text-cream-50">
              <div className="mb-4 flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-cream-50/20" />
                <span className="h-3 w-3 rounded-full bg-cream-50/20" />
                <span className="h-3 w-3 rounded-full bg-gold-500" />
                <span className="ml-3 text-xs font-semibold text-ink-400">ask gluu</span>
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-ink-400">you: how did we do last quarter?</p>
                <p className="text-cream-50">gluu: reading Stripe, HubSpot, Slack…</p>
                <p className="leading-relaxed text-cream-50">
                  Revenue <span className="font-bold text-gold-400">$1.24M</span> (+18% QoQ) · 3 deals at risk · 2 renewals due this month.
                </p>
                <p className="flex items-center gap-2 text-gold-400">
                  <Check className="h-4 w-4" /> pulled from 4 tools · always current · tap any number for the source
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3 rounded-xl bg-cream-50 p-3">
              <ShieldCheck className="h-5 w-5 text-gold-600" />
              <p className="text-sm font-semibold text-ink-700">You only ever see what you're already allowed to see.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="px-5 pb-20 md:px-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gold-500 px-6 py-16 text-center md:rounded-[2.5rem] md:py-28">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-400/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold-300/50 blur-3xl" />
        <div className="relative">
          <GluuMark className="mx-auto mb-8 h-11 md:h-12" left="text-ink-950" right="text-ink-950/70" />
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-ink-950 md:text-6xl">
            Let's get your business glued together.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-900/70">
            Be your company's entire AI strategy — built on the stack you already run, not in place of it.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:hello@gluu.ai"
              className="group flex items-center gap-2 rounded-full bg-ink-950 px-7 py-4 text-base font-bold text-cream-50 transition hover:bg-ink-800"
            >
              Book a demo
              <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="mailto:hello@gluu.ai"
              className="rounded-full border border-ink-950/25 px-7 py-4 text-base font-bold text-ink-950 transition hover:bg-ink-950/5"
            >
              Talk to us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink-900/10 px-5 py-10 md:px-10 md:py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <a href="#top" className="flex items-center gap-2.5">
          <GluuMark className="h-6" />
          <BoxedUU className="text-xl font-extrabold tracking-tight text-ink-900" />
        </a>
        <p className="text-sm text-ink-400">© 2026 gluu. The operational glue for AI-native companies.</p>
        <div className="flex gap-6 text-sm font-semibold text-ink-500">
          <a className="transition hover:text-ink-900" href="#offerings">Product</a>
          <a className="transition hover:text-ink-900" href="#tabclone">Tab Clone</a>
          <a className="transition hover:text-ink-900" href="#cta">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-cream-50 font-sans text-ink-900 selection:bg-gold-200">
      <Nav />
      <main>
        <Hero />
        <Offerings />
        <TabClone />
        <Marquee />
        <Proof />
        <CTA />
      </main>
      <Footer />
      <ColorToggle />
    </div>
  );
}
