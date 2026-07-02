/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Check,
  ShieldCheck,
  Sparkles,
  Brain,
  Wand2,
  Blocks,
  AppWindow,
  MousePointerClick,
} from 'lucide-react';

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
      <motion.div className="absolute inset-y-0 left-0 w-1/2 bg-cream-50" {...curtain('left')} />
      <motion.div className="absolute inset-y-0 right-0 w-1/2 bg-cream-50" {...curtain('right')} />

      <motion.div
        className="absolute inset-0 flex items-center justify-center gap-2"
        animate={{ opacity: [1, 1, 1, 0], transition: { duration: 3, times: [0, 0.7, 0.85, 1] } }}
      >
        <motion.div
          className="h-28 w-28 text-ink-900"
          initial={{ rotate: -140, x: -120, opacity: 0, scale: 0.6 }}
          animate={{
            rotate: [-140, 220, 360, 350, 350],
            x: [-120, -20, -20, 4, -260],
            opacity: [0, 1, 1, 1, 1],
            scale: [0.6, 1, 1, 1.06, 1],
            transition: { duration: 3, times: [0, 0.42, 0.62, 0.72, 1], ease: [0.65, 0, 0.35, 1] },
          }}
        >
          <GluuGlyph className="h-full w-full" strokeWidth={11} />
        </motion.div>

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
/*  Content — outcome-led copy (mechanism stays behind the curtain)    */
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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <a href="#top" className="flex items-center gap-2.5">
          <GluuMark className="h-6 md:h-7" />
          <span className="text-xl font-extrabold tracking-tight text-ink-900 md:text-2xl">gluu</span>
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

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/* map v in [i0,i1] → [o0,o1], clamped */
const track = (v: number, i0: number, i1: number, o0: number, o1: number) =>
  o0 + (o1 - o0) * clamp((v - i0) / (i1 - i0));

/* Scroll-driven hero: the two fists sit center-screen, then fly apart to
   the edges and fade — like hands opening — revealing the offerings intro.
   Progress is computed manually for exact, device-independent control. */
function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const span = el.offsetHeight - window.innerHeight; // scrollable distance while pinned
        const prog = span > 0 ? clamp(-el.getBoundingClientRect().top / span) : 0;
        setP(prog);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduce]);

  if (reduce) {
    return (
      <section id="top" className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-28 text-center">
        <GluuMark className="mb-8 h-20" />
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-ink-900 md:text-6xl">
          Your whole company, glued into one.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-ink-500">
          gluu is the layer that makes your 30 disconnected tools act like one — so you, and the AI you already use, can finally just ask.
        </p>
        <a href="#offerings" className="mt-8 rounded-full bg-gold-500 px-7 py-3.5 font-bold text-ink-950">See what it does</a>
      </section>
    );
  }

  const scale = 1 + p * 4.2;
  const fistOpacity = 1 - track(p, 0.5, 0.82, 0, 1);
  const introOpacity = 1 - track(p, 0, 0.22, 0, 1);
  const introY = -p * 80;
  const revealOpacity = track(p, 0.42, 0.78, 0, 1);
  const revealScale = track(p, 0.42, 1, 0.9, 1);

  return (
    <section id="top" ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
        {/* soft gold glow */}
        <div className="pointer-events-none absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-gold-200/40 blur-[120px]" />

        {/* Revealed layer — fades + scales in as the fists open */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: revealOpacity, transform: `scale(${revealScale})`, pointerEvents: p > 0.6 ? 'auto' : 'none' }}
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-gold-600">The operational glue</p>
          <h2 className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900 md:text-7xl">
            Your whole company,
            <br />
            <span className="text-gold-500">glued</span> into one.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-ink-500 md:text-xl">
            Your business runs on 30 tools that don't talk to each other. gluu makes them act like one — so you, and the AI you already use, can finally just ask.
          </p>
          <a
            href="#offerings"
            className="group mt-9 flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-base font-bold text-ink-950 shadow-lg shadow-gold-500/25 transition hover:bg-gold-400"
          >
            See what it does
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </a>
        </div>

        {/* Intro headline — fades out first */}
        <div
          className="pointer-events-none absolute top-[16%] text-center"
          style={{ opacity: introOpacity, transform: `translateY(${introY}px)` }}
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 md:text-5xl">meet gluu</h1>
          <p className="mt-2 text-base text-ink-500 md:text-lg">scroll — watch it open up</p>
        </div>

        {/* The two fists that fly apart and fade */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ opacity: fistOpacity }}>
          <div
            className="h-24 w-24 text-ink-900 md:h-36 md:w-36"
            style={{ transform: `translateX(${-p * 55}vw) rotate(-10deg) scale(${scale})` }}
          >
            <GluuGlyph className="h-full w-full" strokeWidth={11} />
          </div>
          <div
            className="-ml-3 h-24 w-24 text-gold-500 md:h-36 md:w-36"
            style={{ transform: `translateX(${p * 55}vw) scaleX(-1) rotate(-10deg) scale(${scale})` }}
          >
            <GluuGlyph className="h-full w-full" strokeWidth={11} />
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 text-ink-400" style={{ opacity: introOpacity }}>
          <span className="text-xs font-semibold uppercase tracking-widest">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Offerings() {
  return (
    <section id="offerings" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-600">What gluu does</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-5xl">
          One place for everything your business runs on.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-ink-500">
          We don't replace your tools. We make them work together — and build the ones nobody else will.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {OFFERINGS.map((o, i) => (
          <Reveal key={o.tag} delay={i * 0.1}>
            <div className="group flex h-full flex-col rounded-3xl border border-ink-900/10 bg-cream-50 p-7 transition hover:-translate-y-1 hover:border-gold-300 hover:shadow-xl hover:shadow-gold-500/5 md:p-8">
              <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700 transition group-hover:bg-gold-500 group-hover:text-ink-950">
                <o.icon className="h-6 w-6" />
              </span>
              <p className="text-xs font-bold uppercase tracking-widest text-gold-600">{o.tag}</p>
              <h3 className="mt-2 text-2xl font-extrabold leading-snug tracking-tight text-ink-900">{o.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-500">{o.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* Looping "tab clones itself" animation for the Tab Clone sub-product. */
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
      {/* tab strip */}
      <div className="flex items-end gap-1">
        <Tab label="acme-vendor-portal" active />
        {/* the clone that springs out, over and over */}
        <motion.div
          initial={{ opacity: 0, x: -14, scale: 0.9 }}
          animate={{ opacity: [0, 1, 1, 0], x: [-14, 0, 0, 0], scale: [0.9, 1, 1, 0.95] }}
          transition={{ duration: 3.2, times: [0, 0.25, 0.8, 1], repeat: Infinity, repeatDelay: 0.4 }}
        >
          <Tab label="acme-vendor-portal (clone)" />
        </motion.div>
      </div>

      {/* window body */}
      <div className="relative rounded-b-lg rounded-tr-lg bg-ink-800 p-5">
        <div className="space-y-2.5">
          <div className="h-2.5 w-2/3 rounded-full bg-cream-50/15" />
          <div className="h-2.5 w-1/2 rounded-full bg-cream-50/10" />
          <div className="mt-4 h-9 w-40 rounded-lg bg-gold-500/90" />
          <div className="h-2.5 w-3/4 rounded-full bg-cream-50/10" />
        </div>

        {/* cursor that clicks, looping */}
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
              industry app. Teach gluu once in a browser tab, and it <span className="font-semibold text-cream-50">clones
              the clicks</span> for you, every time after. No API required. If your business can use it, so can gluu.
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

        {/* "ask gluu" console mock */}
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
              <p className="text-sm font-semibold text-ink-700">
                You only ever see what you're already allowed to see.
              </p>
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
          <span className="text-xl font-extrabold tracking-tight text-ink-900">gluu</span>
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
        <Offerings />
        <TabClone />
        <Marquee />
        <Proof />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
