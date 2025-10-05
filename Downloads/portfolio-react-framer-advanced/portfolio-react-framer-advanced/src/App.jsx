import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import { Github, Mail, ArrowUpRight, Cpu, Gamepad2, GraduationCap, Layers, Filter, Linkedin, X as Close } from "lucide-react";

// ---- 設定（あなた用に編集） ---------------------------------
const PROFILE = {
  name: "秋山 零",
  title: "Game Programmer",
  tags: ["Unreal", "Godot", "C++", "VR"],
  email: "you@example.com",
  github: "https://github.com/yourname",
  x: "https://x.com/yourname",
  linkedin: "https://www.linkedin.com/in/yourname/",
};

const PROJECTS = [
  {
    id: "vr-training",
    title: "VR筋力トレーニング・レベルアップ動機付け研究",
    role: "Programming / Blueprint / Tracker I/O",
    stack: ["UE5", "Blueprint", "VIVE Tracker", "OpenXR"],
    type: "Unreal",
    cover: "/covers/vr-training.jpg",
    summary:
      "VIVE Tracker と UE5 を用いてプッシュアップを自動判定。レベルアップ演出が動機付けに与える影響を計測。",
    links: [
      { label: "Demo", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Paper / PDF", href: "#" },
    ],
    video: "/videos/sample.mp4", // ← 手元のMP4を入れたらモーダルで再生されます
  },
  {
    id: "godot-action",
    title: "Godot 2D アクション（AI/当たり判定）",
    role: "Gameplay / Physics / AI",
    stack: ["Godot", "GDScript", "A*", "StateMachine"],
    type: "Godot",
    cover: "/covers/godot-action.jpg",
    summary:
      "当たり判定と敵AI（視野・追跡・回避）を実装。デバッグオーバーレイで可視化し、調整コストを削減。",
    links: [
      { label: "GitHub", href: "#" },
      { label: "Video", href: "#" },
    ],
  },
  {
    id: "ue5-traygame",
    title: "UE5 お盆バランス・搬送ゲーム（トラッカー連動）",
    role: "Systems / Physics / UX",
    stack: ["UE5", "Chaos", "Blueprint", "XR"],
    type: "Unreal",
    cover: "/covers/tray-game.jpg",
    summary:
      "Tray(Tracker)の物理揺れをスプリング補正し、ステージ別ルールとスコアリングを実装。",
    links: [
      { label: "GitHub", href: "#" },
      { label: "Video", href: "#" },
    ],
  },
  {
    id: "research-paper",
    title: "卒研：高モチベーション筋トレシステム（統計解析）",
    role: "Experiment Design / Analysis",
    stack: ["R", "Jamovi", "UE5", "XR"],
    type: "Research",
    cover: "/covers/research.jpg",
    summary:
      "レベルアップ演出有無を比較。行動ログ＋アンケートを解析し、有意差を検証（Wilcoxon/Friedman等）。",
    links: [
      { label: "Paper / PDF", href: "#" },
      { label: "Slide", href: "#" },
    ],
  },
];

// ---- UI 基本 --------------------------------------------------
const Container = ({ className = "", children }) => (
  <div className={`mx-auto max-w-6xl px-4 ${className}`}>{children}</div>
);

const Badge = ({ children }) => (
  <span className="rounded-full border px-3 py-1 text-xs bg-white/70 backdrop-blur border-black/10">
    {children}
  </span>
);

const GlassCard = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/60 backdrop-blur shadow-xl ${className}`}>{children}</div>
);

// ---- スプラッシュ ------------------------------------------------
const Splash = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 1200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.9, duration: 0.3 }}
      className="fixed inset-0 z-[90] grid place-items-center bg-black text-white"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className="text-center"
      >
        <div className="text-2xl">Portfolio Loading</div>
        <div className="text-4xl font-black tracking-wide mt-2">{PROFILE.name}</div>
      </motion.div>
    </motion.div>
  );
};

// ---- カーソルブロブ --------------------------------------------------
const CursorBlob = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  useEffect(() => {
    const handler = (e) => {
      animate(x, e.clientX - 150, { type: "spring", stiffness: 120, damping: 20 });
      animate(y, e.clientY - 150, { type: "spring", stiffness: 120, damping: 20 });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);
  return (
    <motion.div
      style={{ left: x, top: y }}
      className="pointer-events-none fixed z-[5] h-[300px] w-[300px] rounded-full bg-gradient-to-br from-blue-400/20 to-rose-400/20 blur-3xl"
    />
  );
};

// ---- ヒーロー ---------------------------------------------------------
const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 400], [0, 60]);
  const y2 = useTransform(scrollY, [0, 400], [0, -40]);

  return (
    <section className="relative overflow-hidden">
      <motion.div style={{ y: y2 }} className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-400/20 to-rose-300/20" />
      <Container className="relative z-10 py-28 md:py-40">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-black tracking-tight"
        >
          {PROFILE.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-3 text-xl md:text-2xl text-gray-700"
        >
          {PROFILE.title} / {PROFILE.tags.join(" · ")}
        </motion.p>

        <motion.div style={{ y: y1 }} className="mt-8 flex flex-wrap gap-2">
          {PROFILE.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-2 hover:opacity-90">
            <Mail size={16} /> 連絡する
          </a>
          <a href={PROFILE.github} target="_blank" className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2 hover:bg-black/5">
            <Github size={16} /> GitHub
          </a>
          <a href={PROFILE.linkedin} target="_blank" className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2 hover:bg-black/5">
            <Linkedin size={16} /> LinkedIn
          </a>
        </motion.div>
      </Container>

      <motion.div style={{ y: y1 }} className="absolute -right-20 top-10 h-40 w-40 rounded-full bg-blue-300/20 blur-2xl" />
      <motion.div style={{ y: y2 }} className="absolute left-10 -bottom-10 h-56 w-56 rounded-full bg-rose-300/20 blur-2xl" />
    </section>
  );
};

// ---- 3Dチルト ---------------------------------------------------------
const TiltCard = ({ children }) => {
  const ref = useRef(null);
  const [style, setStyle] = useState({ transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)" });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotX = (py - 0.5) * -8;
    const rotY = (px - 0.5) * 8;
    setStyle({ transform: `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)` });
  };
  const onLeave = () => setStyle({ transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)" });

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={style} className="transition-transform duration-150 will-change-transform">
      {children}
    </div>
  );
};

// ---- モーダル ---------------------------------------------------------
const Modal = ({ open, onClose, project }) => {
  if (!open || !project) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm grid place-items-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-3 top-3 z-10 rounded-full bg-black/80 text-white p-1">
          <Close size={18} />
        </button>
        {project.video ? (
          <video src={project.video} controls className="w-full h-auto bg-black" />
        ) : (
          <img src={project.cover} alt={project.title} className="w-full h-auto" />
        )}
        <div className="p-4">
          <h3 className="text-lg font-bold">{project.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{project.summary}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ---- プロジェクト ------------------------------------------------------
const ProjectCard = ({ p, onOpen }) => (
  <motion.div
    className="group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
  >
    <TiltCard>
      <GlassCard className="overflow-hidden">
        <div className="relative cursor-pointer" onClick={() => onOpen(p)}>
          <img src={p.cover} alt={p.title} className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute left-3 top-3">
            <Badge>{p.type}</Badge>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold flex items-center gap-2">
            {p.title}
            <span className="text-xs font-medium text-gray-500">{p.role}</span>
          </h3>
          <p className="mt-2 text-sm text-gray-700">{p.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
          {p.links && (
            <div className="mt-4 flex flex-wrap gap-3">
              {p.links.map((l) => (
                <a key={l.href} href={l.href} className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
                  {l.label}
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          )}
        </div>
      </GlassCard>
    </TiltCard>
  </motion.div>
);

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const filtered = useMemo(() => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.type === filter)), [filter]);

  const openModal = (p) => { setCurrent(p); setOpen(true); };
  const closeModal = () => setOpen(false);

  return (
    <section id="projects" className="py-16">
      <Container>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
            <Layers size={24} /> 制作物・研究
          </h2>
          <div className="flex items-center gap-2 text-sm">
            <Filter size={16} className="opacity-70" />
            {["All", "Unreal", "Godot", "Research"].map((k) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`rounded-full border px-3 py-1 transition ${filter === k ? "bg-black text-white" : "bg-white hover:bg-black/5"}`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={openModal} />
          ))}
        </div>
      </Container>

      <Modal open={open} onClose={closeModal} project={current} />
    </section>
  );
};

// ---- スキル ------------------------------------------------------------
const Skills = () => {
  const skills = [
    { icon: <Cpu size={18} />, label: "C++", years: 3 },
    { icon: <Gamepad2 size={18} />, label: "Unreal / Blueprint", years: 3 },
    { icon: <Gamepad2 size={18} />, label: "Godot / GDScript", years: 2 },
    { icon: <Layers size={18} />, label: "Git / CI", years: 3 },
  ];
  return (
    <section id="skills" className="bg-gradient-to-b from-white to-gray-50 py-16">
      <Container>
        <h2 className="text-2xl md:text-3xl font-extrabold">スキル</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {skills.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 text-gray-700">
                {s.icon}
                <span className="font-semibold">{s.label}</span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min(100, s.years * 25)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-3 h-2 rounded-full bg-black/10"
              >
                <div className="h-2 rounded-full bg-black/70" />
              </motion.div>
              <p className="mt-2 text-xs text-gray-500">Experience: {s.years}+ yrs</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

// ---- 経歴 -------------------------------------------------------------
const About = () => (
  <section id="about" className="py-16">
    <Container>
      <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2"><GraduationCap size={24} /> 経歴</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <GlassCard className="p-6">
          <h3 className="text-lg font-bold">学歴・研究</h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-700">
            <li>久留米工業大学 情報ネットワーク工学科</li>
            <li>卒研：レベルアップによる高モチベーション筋力訓練システム（VR）</li>
            <li>学会発表 / 成果スライド：<a className="text-blue-600 underline" href="#">PDF</a></li>
          </ul>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="text-lg font-bold">リンク</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a className="inline-flex items-center gap-2 text-blue-600 underline" href={PROFILE.github}><Github size={16}/>GitHub</a></li>
            <li><a className="inline-flex items-center gap-2 text-blue-600 underline" href={PROFILE.x}>X (Twitter)</a></li>
            <li><a className="inline-flex items-center gap-2 text-blue-600 underline" href="#">履歴書 PDF</a></li>
          </ul>
        </GlassCard>
      </div>
    </Container>
  </section>
);

// ---- フッター ---------------------------------------------------------
const Footer = () => (
  <footer className="border-t bg-white/70 backdrop-blur">
    <Container className="flex flex-col md:flex-row items-center justify-between py-6 text-sm text-gray-600">
      <p>© {new Date().getFullYear()} {PROFILE.name} Portfolio</p>
      <nav className="mt-3 md:mt-0 flex items-center gap-4">
        <a href="#projects" className="hover:underline">作品</a>
        <a href="#skills" className="hover:underline">スキル</a>
        <a href="#about" className="hover:underline">経歴</a>
      </nav>
    </Container>
  </footer>
);

// ---- ナビ -------------------------------------------------------------
const Nav = () => {
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 120], [72, 56]);
  const bg = useTransform(scrollY, [0, 120], ["rgba(255,255,255,0)", "rgba(255,255,255,0.85)"]);
  const shadow = useTransform(scrollY, [0, 120], ["0 0 0 rgba(0,0,0,0)", "0 10px 30px rgba(0,0,0,0.06)"]);

  return (
    <motion.header style={{ height, background: bg, boxShadow: shadow }} className="fixed inset-x-0 top-0 z-50 backdrop-blur border-b border-black/5">
      <Container className="flex h-full items-center justify-between">
        <a href="#" className="font-black tracking-tight">{PROFILE.name}</a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#projects" className="hover:opacity-70">作品</a>
          <a href="#skills" className="hover:opacity-70">スキル</a>
          <a href="#about" className="hover:opacity-70">経歴</a>
          <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 rounded-full bg-black text-white px-4 py-1.5"><Mail size={14}/>Contact</a>
        </nav>
      </Container>
    </motion.header>
  );
};

// ---- ルート -----------------------------------------------------------
export default function App() {
  const [boot, setBoot] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setBoot(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-white to-gray-100 text-gray-900">
      <CursorBlob />
      {boot && <Splash onDone={() => setBoot(false)} />}
      <Nav />
      <main className="pt-20">
        <Hero />
        <Projects />
        <Skills />
        <About />
      </main>
      <Footer />
    </div>
  );
}
