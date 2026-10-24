import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, ChevronDown, X as Close, Lock } from 'lucide-react';
import {
  projects, KIND_LABEL, SCOPE_LABEL, aiStats, aiTimeline, aiServices, aiPractices,
  type Project, type Kind, type Scope,
} from './data';

type ContactSubmitMessage = { type: 'success' | 'error'; text: string };

const X_URL = 'https://x.com/Kagura_AL_AI';
const GITHUB_URL = 'https://github.com/kamisimokagura';

// The X logo is not in this lucide version, so draw it.
const XLogo = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SCOPE_COLOR: Record<Scope, string> = {
  fullstack: 'border-emerald-400/60 text-emerald-300',
  frontend: 'border-sky-400/60 text-sky-300',
  backend: 'border-amber-400/60 text-amber-300',
  tooling: 'border-violet-400/60 text-violet-300',
  cms: 'border-rose-400/60 text-rose-300',
  media: 'border-orange-400/60 text-orange-300',
  prototype: 'border-gray-400/60 text-gray-300',
  enablement: 'border-pink-400/60 text-pink-300',
};

const ScopeBadge = ({ scope }: { scope: Scope }) => (
  <span className={`inline-flex items-center gap-1.5 border rounded-full px-3 py-1 text-[10px] tracking-[0.15em] uppercase ${SCOPE_COLOR[scope]}`}>
    {SCOPE_LABEL[scope].en}
    <span className="opacity-70 normal-case tracking-normal">／{SCOPE_LABEL[scope].jp}</span>
  </span>
);

// --- Cursor (only on devices with a fine pointer) ---

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setEnabled(mq.matches);
    document.documentElement.classList.toggle('custom-cursor', mq.matches);
    if (!mq.matches) return;
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest('a, button, [role="button"], input, textarea'));
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  if (!enabled) return null;
  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
      animate={{ x: pos.x - 16, y: pos.y - 16, scale: hover ? 2.2 : 1, backgroundColor: hover ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)' }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {hover && <ArrowUpRight className="text-black w-3 h-3" />}
    </motion.div>
  );
};

// --- Nav ---

const SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'work', label: 'Work' },
  { id: 'ai', label: 'AI' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const scrollToId = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Nav = () => {
  const [active, setActive] = useState('intro');
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.3;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) setActive(s.id);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="fixed top-0 left-0 w-full px-5 py-5 md:p-8 flex justify-between items-center z-50 mix-blend-difference text-white"
    >
      <a href="#intro" onClick={scrollToId('intro')} className="text-xl md:text-2xl font-bold serif tracking-tighter hover:opacity-70 transition-opacity">AL.</a>
      <ul className="flex gap-4 md:gap-10 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
        {SECTIONS.map((s) => (
          <li key={s.id} className="relative group">
            <a href={`#${s.id}`} onClick={scrollToId(s.id)} className={`block py-2 transition-opacity ${active === s.id ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}>
              {s.label}
              <span className={`absolute -bottom-0.5 left-0 w-full h-px bg-white origin-left transition-transform duration-300 ${active === s.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

// --- Hero ---

const Hero = () => (
  <section id="intro" className="min-h-screen w-full flex flex-col justify-center px-6 md:px-20 pt-28 pb-16 relative overflow-hidden bg-black">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(60,60,60,0.25),_rgba(0,0,0,1)_60%)]" />
    <div className="relative z-10 select-none">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="font-mono text-[11px] md:text-xs tracking-[0.3em] uppercase text-gray-500 mb-6">
        AL — AI-Native Engineer
      </motion.p>
      {['AI-Native', 'Developer'].map((word, i) => (
        <div key={word} className="overflow-hidden">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`text-[15vw] md:text-[12vw] leading-[0.88] serif font-medium tracking-tighter ${i === 0 ? 'text-white' : 'text-[#555] ml-[8vw]'}`}
          >
            {word}
          </motion.h1>
        </div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.9 }}
      className="relative z-10 mt-14 grid gap-10 lg:grid-cols-12 items-end"
    >
      <div className="lg:col-span-5 border-l-2 border-white pl-4">
        <p className="text-sm md:text-base leading-relaxed text-gray-200 font-light">
          複数のAIに役割を分けて任せ、<br />
          企画から本番運用まで一人で届けます。
        </p>
        <p className="mt-3 text-xs md:text-sm leading-relaxed text-gray-500 font-light">
          I split the work across AI agents and ship products from idea to production.
        </p>
      </div>
      <dl className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-800/60 border border-gray-800/60">
        {aiStats.map((s) => (
          <div key={s.label} className="bg-black px-4 py-5">
            <dt className="sr-only">{s.label}</dt>
            <dd className="serif text-3xl md:text-4xl text-white tabular-nums">{s.value}</dd>
            <dd className="mt-2 text-[11px] leading-snug text-gray-500">{s.label}</dd>
          </div>
        ))}
      </dl>
    </motion.div>
  </section>
);

// --- Work ---

const KIND_ORDER: Kind[] = ['work', 'personal', 'oss', 'web', 'practice'];

const ProjectRow: React.FC<{ project: Project; index: number; onOpen: (p: Project) => void }> = ({ project, index, onOpen }) => (
  <motion.li layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group w-full text-left border-t border-gray-800 py-10 md:py-14 relative overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
    >
      <div className="relative z-20 px-6 md:px-20 transition-[padding] duration-500 md:group-hover:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-mono text-gray-500 mb-2 block tabular-nums">
              {String(index + 1).padStart(2, '0')} — {project.period} — {KIND_LABEL[project.kind].jp}
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl serif font-light tracking-tight leading-[1.1] break-words text-white">{project.title}</h3>
            <p className="mt-3 text-sm text-gray-400 font-light max-w-xl">{project.summary}</p>
          </div>
          <div className="lg:col-span-4 flex flex-wrap gap-2">
            <ScopeBadge scope={project.scope} />
            {project.video && <span className="text-[11px] text-white border border-white/30 rounded-full px-2.5 py-1">▶ イメージ動画</span>}
            {project.stack.flatMap((g) => g.items).slice(0, 4).map((t) => (
              <span key={t} className="text-[11px] text-gray-400 border border-gray-800 rounded-full px-2.5 py-1">{t}</span>
            ))}
          </div>
          <div className="lg:col-span-2 lg:text-right">
            <span className="inline-flex items-center gap-2 text-white bg-black/50 px-4 py-2 rounded-full border border-white/20 text-xs whitespace-nowrap">
              詳しく見る <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
      {project.image && (
        <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-black/70 z-20" />
          <img src={project.image} alt="" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-[1.5s]" />
        </div>
      )}
    </button>
  </motion.li>
);

const ProjectModal: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm p-0 md:p-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            role="dialog" aria-modal="true" aria-labelledby="project-title"
            className="relative w-full md:max-w-3xl max-h-[92vh] overflow-y-auto bg-[#0b0b0b] border border-gray-800 md:rounded-lg"
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {project.video ? (
              <figure className="w-full bg-black">
                <video src={project.video} poster={project.image} autoPlay muted loop playsInline className="w-full aspect-video" aria-label={`${project.title} のイメージ動画`} />
                <figcaption className="px-6 md:px-10 pt-3 text-[11px] text-gray-500">イメージ動画です。実際の画面・データではありません。</figcaption>
              </figure>
            ) : project.image && (
              <div className="aspect-[16/7] w-full overflow-hidden bg-gray-900">
                <img src={project.image} alt={`${project.title} の画面`} className="w-full h-full object-cover" />
              </div>
            )}
            <button ref={closeRef} type="button" onClick={onClose} aria-label="閉じる" className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-white hover:border-white">
              <Close size={18} />
            </button>

            <div className="p-6 md:p-10 space-y-8">
              <header className="space-y-3">
                <p className="font-mono text-xs text-gray-500 tracking-wider">{KIND_LABEL[project.kind].jp} ／ {project.period}</p>
                <h3 id="project-title" className="serif text-3xl md:text-5xl text-white leading-tight">{project.title}</h3>
                <p className="text-gray-300 font-light leading-relaxed">{project.summary}</p>
              </header>

              <section className="border border-gray-800 rounded-md p-5 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <ScopeBadge scope={project.scope} />
                  <span className="text-xs text-gray-500">{SCOPE_LABEL[project.scope].hint}</span>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed">{project.scopeNote}</p>
                <p className="text-xs text-gray-500">担当：{project.role}</p>
              </section>

              <section>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">What I built ／ やったこと</h4>
                <ul className="space-y-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm text-gray-200 leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full bg-white shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">Tech Stack ／ 使った技術</h4>
                <dl className="grid sm:grid-cols-2 gap-4">
                  {project.stack.map((g) => (
                    <div key={g.label}>
                      <dt className="text-[11px] text-gray-500 mb-2">{g.label}</dt>
                      <dd className="flex flex-wrap gap-2">
                        {g.items.map((t) => (
                          <span key={t} className="text-xs text-gray-200 bg-white/5 border border-gray-800 rounded px-2.5 py-1">{t}</span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              <footer className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-900">
                {project.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 text-xs font-bold tracking-[0.15em] uppercase hover:bg-gray-200">
                    {l.label} <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ))}
                {project.privateNote && (
                  <span className="inline-flex items-center gap-2 text-xs text-gray-500"><Lock size={13} /> {project.privateNote}</span>
                )}
              </footer>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Work = () => {
  const [kind, setKind] = useState<'all' | Kind>('all');
  const [scope, setScope] = useState<'all' | Scope>('all');
  const [visible, setVisible] = useState(6);
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => setVisible(6), [kind, scope]);

  const list = useMemo(
    () => projects.filter((p) => (kind === 'all' || p.kind === kind) && (scope === 'all' || p.scope === scope)),
    [kind, scope],
  );
  const scopesInUse = useMemo(() => Array.from(new Set(projects.map((p) => p.scope))) as Scope[], []);
  const count = (k: Kind) => projects.filter((p) => p.kind === k).length;

  const chip = (active: boolean) =>
    `relative px-3 py-2 text-xs tracking-widest uppercase transition-colors ${active ? 'text-white' : 'text-gray-600 hover:text-gray-300'}`;

  return (
    <section id="work" className="w-full pt-28 pb-20 bg-[#050505]">
      <div className="px-6 md:px-20 mb-12 border-b border-gray-900 pb-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-4">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-white">Selected Works</h2>
              <span className="text-xs text-gray-500">制作実績 {projects.length} 件</span>
            </div>
            <p className="text-xs text-gray-400 font-light mt-2">業務・個人開発・OSS・Web制作。カードを押すと、担当範囲と使った技術が見られます。</p>
          </div>
          <p className="text-[11px] text-gray-600 max-w-sm">業務の実績は、お客様が分からないように社名・製品名を伏せて載せています。</p>
        </div>

        <div className="flex flex-wrap gap-1" role="group" aria-label="種類で絞り込む">
          {(['all', ...KIND_ORDER] as const).map((k) => (
            <button key={k} type="button" onClick={() => setKind(k)} className={chip(kind === k)} aria-pressed={kind === k}>
              {k === 'all' ? 'All' : KIND_LABEL[k].en}
              <span className="text-[9px] opacity-60 ml-1">（{k === 'all' ? `全て ${projects.length}` : `${KIND_LABEL[k].jp} ${count(k)}`}）</span>
              {kind === k && <motion.span layoutId="kind-underline" className="absolute bottom-0 left-0 w-full h-px bg-white" />}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="担当範囲で絞り込む">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600 mr-2">Scope</span>
          <button type="button" onClick={() => setScope('all')} aria-pressed={scope === 'all'} className={`rounded-full border px-3 py-1 text-[10px] tracking-[0.15em] uppercase ${scope === 'all' ? 'border-white text-white' : 'border-gray-800 text-gray-500 hover:text-gray-300'}`}>All</button>
          {scopesInUse.map((s) => (
            <button key={s} type="button" onClick={() => setScope(s)} aria-pressed={scope === s} title={SCOPE_LABEL[s].hint}
              className={`rounded-full border px-3 py-1 text-[10px] tracking-[0.15em] uppercase transition-opacity ${SCOPE_COLOR[s]} ${scope === s ? 'opacity-100 bg-white/5' : 'opacity-50 hover:opacity-90'}`}>
              {SCOPE_LABEL[s].en}
            </button>
          ))}
        </div>
      </div>

      <ul className="w-full">
        <AnimatePresence mode="popLayout">
          {list.slice(0, visible).map((p, i) => <ProjectRow key={p.id} project={p} index={i} onOpen={setOpen} />)}
        </AnimatePresence>
      </ul>

      {list.length === 0 && <p className="py-20 text-center text-gray-600 font-mono text-sm">この条件の作品はありません。</p>}

      {list.length > visible && (
        <div className="flex justify-center">
          <button type="button" onClick={() => setVisible((v) => v + 6)} className="mt-12 flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors">
            <span className="text-xs font-mono uppercase tracking-widest">もっと見る（残り {list.length - visible} 件）</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      )}

      <ProjectModal project={open} onClose={close} />
    </section>
  );
};

// --- AI ---

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7 },
};

const AISection = () => (
  <section id="ai" className="bg-black px-6 md:px-20 py-28 border-t border-gray-900">
    <div className="max-w-7xl mx-auto space-y-20">
      <motion.header {...reveal} className="grid lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-6">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 block">AI, Seriously</span>
          <h2 className="serif text-5xl md:text-7xl leading-none">AIと、<br /><span className="text-gray-600">本気で。</span></h2>
        </div>
        <p className="lg:col-span-6 text-gray-300 font-light leading-loose">
          答えの精度がまだ低かった頃から、生成AIを仕事に取り入れてきました。
          いまは毎日、複数のAIに役割を分けて開発しています。
          新しいモデルやツールが出たら、できるだけその日のうちに公式の情報を読んで試し、社内にも共有しています。
        </p>
      </motion.header>

      <div className="grid lg:grid-cols-12 gap-14">
        <motion.div {...reveal} className="lg:col-span-5">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-6">Timeline ／ AIとの歩み</h3>
          <ol className="relative border-l border-gray-800 space-y-7 pl-6">
            {aiTimeline.map((t) => (
              <li key={t.when + t.text} className="relative">
                <span className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-white" />
                <p className="font-mono text-xs text-gray-500 tabular-nums">{t.when}</p>
                <p className="mt-1 text-sm text-gray-200 leading-relaxed">{t.text}</p>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div {...reveal} className="lg:col-span-7 space-y-12">
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-6">How I work with AI ／ AIとの働き方</h3>
            <div className="grid md:grid-cols-3 gap-px bg-gray-800/60 border border-gray-800/60">
              {aiPractices.map((p) => (
                <div key={p.title} className="bg-black p-5">
                  <p className="text-white text-sm font-medium mb-2">{p.title}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-6">Services ／ 使い分けているAI</h3>
            <ul className="grid sm:grid-cols-2 gap-x-8">
              {aiServices.map((s) => (
                <li key={s.name} className="flex items-baseline justify-between gap-4 border-b border-gray-900 py-3">
                  <span className="text-sm text-white">{s.name}</span>
                  <span className="text-xs text-gray-500 text-right">{s.note}</span>
                </li>
              ))}
            </ul>
          </div>

          <a href={X_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border border-gray-800 hover:border-white rounded-md p-5 transition-colors">
            <span className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center"><XLogo /></span>
              <span>
                <span className="block text-sm text-white">@Kagura_AL_AI</span>
                <span className="block text-xs text-gray-500 mt-0.5">AIでの開発・OSS・新しいモデルの情報を発信しています</span>
              </span>
            </span>
            <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

// --- About ---

const About = () => (
  <section id="about" className="min-h-screen flex items-center bg-[#0a0a0a] px-6 md:px-20 py-28 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#111] to-transparent pointer-events-none" />
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 w-full max-w-7xl mx-auto relative z-10">
      <div className="lg:col-span-5 flex flex-col gap-12">
        <motion.div {...reveal}>
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 block">Who I Am</span>
          <h2 className="serif text-6xl md:text-8xl leading-none">About<br /><span className="text-gray-700">Me.</span></h2>
        </motion.div>
        <motion.dl {...reveal} className="grid grid-cols-2 gap-y-8 gap-x-4 text-sm border-t border-gray-800 pt-8">
          {[
            ['Name / 名前', 'AL'],
            ['Age / 年齢', '22'],
            ['Role / 職業', 'Freelance / AI-Native Engineer'],
            ['Based / 拠点', 'Tokyo, Japan'],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-gray-600 mb-2 text-[10px] uppercase tracking-wider font-mono">{k}</dt>
              <dd className="text-white">{v}</dd>
            </div>
          ))}
          <div className="col-span-2">
            <dt className="text-gray-600 mb-2 text-[10px] uppercase tracking-wider font-mono">Skills / スキル</dt>
            <dd className="text-white text-sm leading-relaxed">
              TypeScript, JavaScript, Next.js / React, Node.js<br />
              Claude Code, Codex, MCP, Gemini Live API<br />
              Vercel, Supabase, Upstash Redis, Google APIs, WordPress<br />
              Vitest, Playwright ／ Figma, Canva, Premiere Pro
            </dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="text-gray-600 mb-2 text-[10px] uppercase tracking-wider font-mono">Languages / 言語</dt>
            <dd className="text-white text-xs leading-relaxed">日本語・英語（英検準1級）</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="text-gray-600 mb-2 text-[10px] uppercase tracking-wider font-mono">Interests / 趣味</dt>
            <dd className="text-white text-xs leading-relaxed">FPS、スポーツ観戦、映画、アウトドア</dd>
          </div>
        </motion.dl>
      </div>

      <div className="lg:col-span-7 flex flex-col gap-12">
        <motion.div {...reveal} className="w-full aspect-video overflow-hidden bg-gray-900">
          <img src="images/omggg1.png" alt="作業スペース" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100" />
        </motion.div>
        <motion.div {...reveal} className="grid md:grid-cols-2 gap-10">
          <div className="space-y-5">
            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-2">Japanese</h3>
            <p className="text-gray-300 leading-loose font-light text-sm md:text-base">
              AI×エンジニアのオンラインスクールで学び、Web制作の仕事から始めました。いまはIT企業との業務委託で、社内で使うWebアプリや業務を自動化するツールを作り、社内の生成AI活用も進めています。AIに任せた部分が本当に正しいかを確かめる仕組みづくりを大切にしています。
            </p>
          </div>
          <div className="space-y-5">
            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-2">English</h3>
            <p className="text-gray-400 leading-loose font-light text-sm md:text-base">
              I learned at an AI-and-engineering online school and started out in web production. Today I build internal web apps and automation tools as a contractor for an IT company, and help the team adopt generative AI. I care most about checking that what the AI says it did is what it actually did.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// --- Contact ---

const Contact = () => {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<ContactSubmitMessage | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!endpoint) {
      setMsg({ type: 'error', text: 'Contact form is not configured yet. Please try again later.' });
      return;
    }
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    setSending(true);
    setMsg(null);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, _subject: `Portfolio contact from ${name || 'Website visitor'}` }),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        const errorText = Array.isArray(payload?.errors)
          ? payload.errors.map((item: { message?: string }) => item.message).filter(Boolean).join(' ')
          : null;
        throw new Error(errorText || 'Message could not be sent.');
      }
      form.reset();
      setMsg({ type: 'success', text: 'Message sent successfully. I will get back to you soon.' });
    } catch (error) {
      setMsg({ type: 'error', text: error instanceof Error ? error.message : 'Message could not be sent.' });
    } finally {
      setSending(false);
    }
  };

  const field = 'w-full bg-transparent border border-gray-800 focus:border-white text-white p-3 outline-none transition-colors text-sm placeholder-gray-700';

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center py-28 px-6 md:px-20 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(20,20,20,1),_rgba(0,0,0,1))]" />
      <div className="max-w-3xl mx-auto w-full z-10 relative">
        <motion.div {...reveal} className="mb-12">
          <div className="inline-block border-b border-white mb-6 pb-2"><h2 className="text-xs font-mono tracking-[0.4em] uppercase text-white">Contact</h2></div>
          <p className="text-3xl md:text-5xl serif text-white font-medium mb-3">Let's work together.</p>
          <p className="text-gray-400 font-light text-sm">Webアプリ開発、AIを使った業務の自動化、社内へのAI導入のご相談など、お気軽にどうぞ。</p>
        </motion.div>

        <form className="w-full space-y-8" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="name" className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">Name</label>
              <input type="text" id="name" name="name" required className={field} placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">Email</label>
              <input type="email" id="email" name="email" required className={field} placeholder="your@email.com" />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">Message</label>
            <textarea id="message" name="message" rows={6} required className={`${field} p-4 resize-none`} placeholder="Tell me about your project..." />
          </div>
          <div className="flex gap-4 pt-2">
            <button type="submit" disabled={sending || !endpoint} className="px-8 py-3 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {sending ? 'Sending...' : 'Send Message'}
            </button>
            <button type="reset" className="px-8 py-3 border border-gray-800 text-white text-xs font-bold tracking-[0.2em] uppercase hover:border-white transition-colors">Reset</button>
          </div>
          {msg && <p aria-live="polite" className={`text-sm ${msg.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>{msg.text}</p>}
        </form>

        <div className="flex gap-6 mt-16">
          {[
            { icon: <XLogo size={16} />, href: X_URL, label: 'X（@Kagura_AL_AI）' },
            { icon: <Github size={16} />, href: GITHUB_URL, label: 'GitHub' },
          ].map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label}
              className="flex items-center justify-center w-11 h-11 rounded-full border border-gray-800 hover:border-white text-gray-500 hover:text-white transition-colors">
              {l.icon}
            </a>
          ))}
        </div>
        <p className="mt-10 text-[10px] text-gray-600 uppercase tracking-widest">&copy; {new Date().getFullYear()} AL Portfolio.</p>
      </div>
    </section>
  );
};

const App = () => (
  <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
    <CustomCursor />
    <Nav />
    <main>
      <Hero />
      <Work />
      <AISection />
      <About />
      <Contact />
    </main>
  </div>
);

createRoot(document.getElementById('root')!).render(<App />);
