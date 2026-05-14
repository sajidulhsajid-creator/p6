import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function Icon({ children, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
function MenuIcon({ size = 24 }) { return <Icon size={size}><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></Icon>; }
function XIcon({ size = 24 }) { return <Icon size={size}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Icon>; }
function ArrowUpRightIcon({ size = 18 }) { return <Icon size={size}><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></Icon>; }
function ArrowLeftIcon({ size = 18 }) { return <Icon size={size}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></Icon>; }
function MailIcon({ size = 18 }) { return <Icon size={size}><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></Icon>; }
function GithubIcon({ size = 18 }) { return <Icon size={size}><path d="M9 19c-4.2 1.3-4.2-2.1-6-2.5" /><path d="M15 22v-3.5a3.2 3.2 0 0 0-.9-2.5c3-.3 6.1-1.5 6.1-6.5a5 5 0 0 0-1.3-3.5 4.7 4.7 0 0 0-.1-3.4s-1-.3-3.5 1.3a12 12 0 0 0-6.4 0C6.4 2.3 5.4 2.6 5.4 2.6a4.7 4.7 0 0 0-.1 3.4A5 5 0 0 0 4 9.5c0 5 3.1 6.2 6.1 6.5a3.2 3.2 0 0 0-.9 2.5V22" /></Icon>; }
function LinkedinIcon({ size = 18 }) { return <Icon size={size}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></Icon>; }
function DownloadIcon({ size = 18 }) { return <Icon size={size}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></Icon>; }
function PlayIcon({ size = 40 }) { return <Icon size={size}><polygon points="5 3 19 12 5 21 5 3" /></Icon>; }
function ImageIcon({ size = 48 }) { return <Icon size={size}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></Icon>; }

// ─── Data ─────────────────────────────────────────────────────────────────────
const projects = [
  {
    id: "nanya",
    title: "NANYA Station",
    fullTitle: "Nanya Acoustic Monitoring Station",
    client: "Federation University Australia — Nanya Conservation Reserve",
    role: "Research and Development Intern",
    focus: "Raspberry Pi, BirdNET-Pi, LoRa, GPS Timing",
    year: "2025–2026",
    color: "#4A87DF",
    intro: "A remote acoustic monitoring system designed to detect bird calls in conservation environments using distributed Raspberry Pi stations.",
    details: "Consists of three remote stations using BirdNET-Pi for species detection, LoRa for low-bandwidth metadata sharing, GPS timing for high-precision timestamps, and a field-ready design for remote deployment and environmental monitoring.",
    tags: ["Raspberry Pi", "BirdNET-Pi", "LoRa", "GPS", "Solar"],
    heroImage: "nanya-hero.jpg",
    overview: "The Nanya Acoustic Monitoring Station is a multi-node IoT system deployed at Federation University Australia's NSW research station. It uses three Raspberry Pi nodes running BirdNET-Pi to passively detect and identify bird species in real time, contributing to conservation data for the endangered Malleefowl.",
    challenge: "The station operates in a remote conservation reserve with no reliable internet. Power comes from solar panels, and communication between nodes had to work over long distances with minimal bandwidth.",
    solution: "Each node runs BirdNET-Pi on a Raspberry Pi with a dedicated microphone array. LoRa radios transmit lightweight detection metadata between nodes and to a base gateway. GPS-disciplined PPS timing ensures detection timestamps are accurate to the millisecond across all nodes.",
    outcomes: [
      "Three fully operational remote stations deployed in the field",
      "Real-time species detection with 15-second analysis windows",
      "Sub-millisecond GPS timestamp synchronisation across nodes",
      "Flask dashboard for live monitoring and detection history",
      "Academic paper drafted for submission to Ecological Informatics",
    ],
    media: [
      { type: "image", src: "nanya-station.jpg", caption: "Remote station hardware setup" },
      { type: "image", src: "nanya-dashboard.jpg", caption: "Flask monitoring dashboard" },
      { type: "image", src: "nanya-lora.jpg", caption: "LoRa communication module" },
      { type: "video", src: "nanya-demo.mp4", caption: "Live detection demo" },
    ],
  },
  {
    id: "buzzbay",
    title: "BUZZBAY EV",
    fullTitle: "Buzzbay EV Charging Communication System",
    client: "Buzzbay Energy x Federation University Australia",
    role: "Research Assistant",
    focus: "EV Charging, ESP32, MQTT, OCPP, LoRa",
    year: "2026",
    color: "#B9A158",
    intro: "A research and development project for industrial client Buzzbay — connecting their EV charging hardware with embedded controllers, MQTT infrastructure, OCPP bridge layers, and charging networks.",
    details: "The system supports a fallback simulation mode using dummy charging data while hardware components are under repair. The architecture is designed so live OpenEVSE data can later replace the dummy data stream with minimal changes.",
    tags: ["ESP32", "MQTT", "OCPP", "LoRa", "OpenEVSE"],
    heroImage: "buzzbay-hero.jpg",
    overview: "The Buzzbay EV Charging Communication System is an 'UberEats for EV charging' — a network that connects distributed EV chargers to a central management backend using open standards. The research focuses on communication reliability, hardware abstraction, and fallback simulation.",
    challenge: "Real EV charging hardware (OpenEVSE) had faulty components during development. The communication stack still needed to be built and validated without working hardware.",
    solution: "A Python-based EVSE simulator was built to produce realistic OCPP 1.6 messages over WebSocket, targeting a SteVe backend. An ESP32 with LoRa (SX1276 at 915 MHz) acts as the gateway, relaying data via Mosquitto MQTT. The architecture ensures swapping in real hardware requires zero changes to the surrounding system.",
    outcomes: [
      "Full OCPP 1.6 WebSocket communication stack implemented",
      "ESP32 LoRa gateway running at 915 MHz",
      "Mosquitto MQTT broker handling charger telemetry",
      "Python EVSE simulator replicating real hardware behaviour",
      "SteVe backend integration for charge session management",
    ],
    media: [
      { type: "image", src: "buzzbay-hardware.jpg", caption: "ESP32 LoRa gateway hardware" },
      { type: "image", src: "buzzbay-architecture.jpg", caption: "System architecture diagram" },
      { type: "image", src: "buzzbay-ocpp.jpg", caption: "OCPP message flow" },
      { type: "video", src: "buzzbay-demo.mp4", caption: "System demonstration" },
    ],
  },
  {
    id: "simint",
    title: "SIMINT",
    fullTitle: "SIMINT — Simulative Intelligence",
    client: "Federation University Australia",
    role: "Developer / Scrum Master",
    focus: "Natural Language Querying, AI, Neo4j, Streamlit",
    year: "2025",
    color: "#D04A2B",
    intro: "An AI-powered investigation support system that lets non-technical users ask natural-language questions and receive structured insights from a cloud-hosted graph database.",
    details: "SIMINT enables plain English to Cypher query generation, Neo4j Aura, graph visualisation, and investigative intelligence workflows. The goal is to reduce technical barriers and help users uncover relationships across incidents, actors, locations, ideologies, and event patterns.",
    tags: ["Gemini", "Neo4j Aura", "Streamlit", "Cypher", "PyVis"],
    heroImage: "simint-hero.jpg",
    overview: "SIMINT is a capstone project built for Federation University Australia that allows non-technical investigators to query a graph database using plain English. It translates natural language into Cypher queries using Google Gemini, visualises relationship networks, and presents structured intelligence insights.",
    challenge: "Law enforcement and investigation teams often lack the technical skills to query graph databases directly. Existing tools require Cypher knowledge, which creates a significant barrier to surfacing meaningful patterns in complex datasets.",
    solution: "A Streamlit interface accepts plain English queries. Gemini translates these into Cypher and executes them against a Neo4j Aura cloud database. Results are rendered as interactive PyVis network graphs, making relationship patterns immediately visible.",
    outcomes: [
      "Natural language to Cypher query pipeline using Gemini",
      "Neo4j Aura cloud database integration",
      "Interactive PyVis network graph visualisation",
      "Role-based query templates for common investigation patterns",
      "Scrum-managed delivery across multiple sprints",
    ],
    media: [
      { type: "image", src: "simint-interface.jpg", caption: "Query interface" },
      { type: "image", src: "simint-graph.jpg", caption: "Network graph visualisation" },
      { type: "image", src: "simint-results.jpg", caption: "Structured results view" },
      { type: "video", src: "simint-demo.mp4", caption: "Live query demonstration" },
    ],
  },
];

const experience = [
  { title: "Research Assistant", place: "Buzzbay Energy x Federation University Australia", time: "2026", text: "Supporting EV charging communication research across embedded systems, MQTT, OCPP, and hardware simulation workflows." },
  { title: "Sole Intern, Development and Deployment", place: "Federation University Australia — Nanya Conservation Reserve, NSW", time: "2025", text: "Research and development of renewable energy powered remote stations capable of observing data for an endangered species — Malleefowl." },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useSectionBackground() {
  const [background, setBackground] = useState("#111111");
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("[data-bg]"));
    if (!sections.length || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setBackground(visible.target.getAttribute("data-bg") || "#111111");
      },
      { threshold: [0.2, 0.35, 0.5, 0.7] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return background;
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function LogoMark({ onClick }) {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setCollapsed(true), 2200);
    return () => clearTimeout(t);
  }, []);
  return (
    <button onClick={onClick} aria-label="Go home" style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }} className="fixed left-6 top-6 z-40 md:left-12 md:top-10">
      <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: collapsed ? "3.5rem" : "2.8rem", color: "white", display: "inline-block", transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)", whiteSpace: "nowrap", overflow: "hidden", maxWidth: collapsed ? "3.5rem" : "14rem", lineHeight: 1 }}>
        {collapsed ? "s" : "sajid"}
      </span>
    </button>
  );
}

// ─── Floating Menu ────────────────────────────────────────────────────────────
function FloatingMenu({ onNav }) {
  const [open, setOpen] = useState(false);
  const navItems = ["Home", "Projects", "About", "Experience", "Contact"];
  const go = (item) => { setOpen(false); onNav(item.toLowerCase()); };
  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed right-6 top-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-xl transition hover:bg-white hover:text-black" aria-label="Open menu">
        <MenuIcon size={24} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black text-white">
            <button onClick={() => setOpen(false)} className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition hover:scale-105" aria-label="Close menu">
              <XIcon size={26} />
            </button>
            <div className="flex min-h-screen flex-col justify-between p-6 pt-8 md:p-14">
              <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: "3rem", color: "white" }}>s</div>
              <nav className="space-y-1">
                {navItems.map((item, i) => (
                  <motion.button key={item} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.06 }} onClick={() => go(item)} className="block w-full text-left text-[11vw] font-black uppercase tracking-tighter transition hover:translate-x-4 hover:text-white/60 sm:text-6xl md:text-8xl lg:text-9xl">
                    {item}
                  </motion.button>
                ))}
              </nav>
              <p className="max-w-xl text-sm text-white/60 md:text-base">Portfolio of MD Sajidul Haque Sajid — AI, IoT, data, cloud systems, and practical technology projects.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Media Placeholder ────────────────────────────────────────────────────────
function MediaPlaceholder({ src, type = "image", caption, color = "#333", tall = false }) {
  const [errored, setErrored] = useState(false);
  const height = tall ? "min-h-[420px] md:min-h-[560px]" : "min-h-[220px] md:min-h-[300px]";

  if (type === "video") {
    return (
      <figure className="space-y-2">
        <div className={`relative ${height} overflow-hidden rounded-lg bg-black flex items-center justify-center`} style={{ border: `2px dashed ${color}66` }}>
          {!errored ? (
            <video src={`/p6/assets/${src}`} controls className="absolute inset-0 h-full w-full object-cover" onError={() => setErrored(true)} />
          ) : (
            <div className="flex flex-col items-center gap-3 text-white/30">
              <PlayIcon size={40} />
              <p className="text-sm font-mono opacity-60">{src}</p>
              <p className="text-xs opacity-40">Upload to /assets/ in your repo</p>
            </div>
          )}
        </div>
        {caption && <figcaption className="text-sm text-white/50">{caption}</figcaption>}
      </figure>
    );
  }

  return (
    <figure className="space-y-2">
      <div className={`relative ${height} overflow-hidden rounded-lg`} style={{ background: `linear-gradient(135deg, ${color}18, ${color}35)`, border: `2px dashed ${color}55` }}>
        {!errored ? (
          <img src={`/p6/assets/${src}`} alt={caption || src} className="absolute inset-0 h-full w-full object-cover" onError={() => setErrored(true)} />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/30">
            <ImageIcon size={48} />
            <p className="text-sm font-mono opacity-60">{src}</p>
            <p className="text-xs opacity-40">Upload to /assets/ in your repo</p>
          </div>
        )}
      </div>
      {caption && <figcaption className="text-sm text-white/50">{caption}</figcaption>}
    </figure>
  );
}

// ─── Project Card (homepage) ──────────────────────────────────────────────────
function ProjectCard({ project, index, onClick }) {
  const [imgErrored, setImgErrored] = useState(false);
  return (
    <section id={index === 0 ? "projects" : undefined} data-bg={project.color} className="min-h-screen px-5 py-20 sm:px-6 sm:py-28 md:px-12 lg:px-16">
      <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-20">
        <motion.aside initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="space-y-1 border-b border-white/20 pb-6 text-sm font-semibold text-white lg:border-b-0 lg:pb-0 lg:sticky lg:top-28 lg:h-fit">
          <p>Client: {project.client}</p>
          <p>Project: {project.fullTitle}</p>
          <p>Role: {project.role}</p>
          <p>Focus: {project.focus}</p>
          <p>Year: {project.year}</p>
        </motion.aside>

        <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9 }} className="space-y-10">
          {/* Clickable card */}
          <button onClick={() => onClick(project.id)} className="group relative w-full cursor-pointer text-left focus:outline-none">
            <div className="relative min-h-[280px] overflow-hidden sm:min-h-[360px] md:min-h-[500px]" style={{ backgroundColor: `${project.color}22` }}>
              <div className="absolute inset-0 opacity-60" style={{ background: `linear-gradient(135deg, #f8f8f8, ${project.color}33)` }} />
              {!imgErrored ? (
                <img src={`/p6/assets/${project.heroImage}`} alt={project.title} className="absolute inset-0 h-full w-full object-cover" onError={() => setImgErrored(true)} />
              ) : null}
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/50">
                <span className="translate-y-4 rounded-full bg-white px-6 py-3 font-bold text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  View Project →
                </span>
              </div>
              <div className="absolute inset-8 border border-white/20" />
              <div className="absolute left-6 top-6 rounded-full bg-black px-4 py-2 text-xs font-bold uppercase tracking-widest text-white md:left-10 md:top-10">{project.focus.split(",")[0]}</div>
              <div className="absolute bottom-8 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-white/60">Project</p>
                <h3 className="text-[13vw] font-black uppercase leading-[0.85] tracking-tighter text-white sm:text-6xl md:text-8xl lg:text-9xl" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>{project.title}</h3>
              </div>
              <div className="absolute right-6 top-6 hidden gap-3 md:grid md:right-10 md:top-10">
                {project.tags.slice(0, 3).map((tag) => (
                  <div key={tag} className="rounded-full border border-white/30 bg-black/40 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">{tag}</div>
                ))}
              </div>
            </div>
          </button>

          <div className="grid gap-8 text-white md:grid-cols-[1fr_1.2fr]">
            <button onClick={() => onClick(project.id)} className="group text-left">
              <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter transition group-hover:opacity-60 sm:text-5xl md:text-7xl">
                {project.fullTitle} <span className="text-2xl align-middle opacity-40 transition group-hover:opacity-100">↗</span>
              </h2>
            </button>
            <div className="space-y-5 text-lg leading-relaxed text-white/90">
              <p>{project.intro}</p>
              <p className="text-white/70">{project.details}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-black">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Project Detail Page ──────────────────────────────────────────────────────
function ProjectPage({ project, onBack }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#0d0d0d" }}>
      {/* Hero */}
      <div className="relative min-h-[60vh] overflow-hidden flex items-end" style={{ backgroundColor: project.color }}>
        {/* Hero image behind everything */}
        <div className="absolute inset-0">
          <MediaPlaceholder src={project.heroImage} type="image" color={project.color} tall />
        </div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, ${project.color}88 50%, transparent 100%)` }} />
        <div className="relative z-10 px-6 pb-16 pt-40 md:px-12 lg:px-16">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-white/60">{project.client}</p>
          <h1 className="text-[10vw] font-black uppercase leading-[0.85] tracking-tighter sm:text-7xl md:text-8xl lg:text-[7vw]">{project.fullTitle}</h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Meta strip */}
      <div className="border-b border-white/10 px-6 py-8 md:px-12 lg:px-16">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {[["Role", project.role], ["Focus", project.focus], ["Year", project.year], ["Client", project.client]].map(([label, val]) => (
            <div key={label}>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.3em] text-white/40">{label}</p>
              <p className="text-sm font-semibold text-white/90">{val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-16 md:px-12 lg:px-16 space-y-20 max-w-6xl">
        {/* Overview */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-white/40">Overview</p>
          <p className="text-2xl leading-relaxed text-white/90 md:text-3xl">{project.overview}</p>
        </motion.section>

        {/* Challenge + Solution */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-white/40">Challenge</p>
            <p className="text-lg leading-relaxed text-white/80">{project.challenge}</p>
          </div>
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-white/40">Solution</p>
            <p className="text-lg leading-relaxed text-white/80">{project.solution}</p>
          </div>
        </motion.section>

        {/* Media gallery */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="mb-8 text-sm font-bold uppercase tracking-[0.35em] text-white/40">Photos & Videos</p>
          <div className="grid gap-6 sm:grid-cols-2">
            {project.media.map((item, i) => (
              <MediaPlaceholder key={i} src={item.src} type={item.type} caption={item.caption} color={project.color} />
            ))}
          </div>
        </motion.section>

        {/* Outcomes */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.35em] text-white/40">Key Outcomes</p>
          <div className="space-y-3">
            {project.outcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-4 border-t border-white/10 pt-4">
                <span className="mt-1 text-xs font-bold text-white/30">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-lg text-white/85">{item}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Footer nav */}
      <div className="border-t border-white/10 px-6 py-12 md:px-12 lg:px-16 flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 font-semibold text-white/60 transition hover:text-white">
          <ArrowLeftIcon size={16} /> Back to projects
        </button>
        <div className="text-sm text-white/30">MD Sajidul Haque Sajid</div>
      </div>
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
function HomePage({ onProjectClick, onSectionNav }) {
  const background = useSectionBackground();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="min-h-screen overflow-x-hidden text-white transition-colors duration-700 ease-out" style={{ backgroundColor: background }}>
      <section id="home" data-bg="#111111" className="relative flex min-h-screen items-center px-6 py-24 md:px-12 lg:px-16">
        <div className="grid w-full gap-16 lg:grid-cols-[1.35fr_0.75fr] lg:items-end">
          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-5xl text-[18vw] font-black uppercase leading-[0.77] tracking-[-0.08em] md:text-[15vw] lg:text-[11vw]">
            Oh Hey<br />There.
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.18 }} className="max-w-xl pb-4 text-xl leading-relaxed text-white/90 md:text-2xl">
            <p>I'm Sajid — an IT student, research assistant, and emerging technology professional building practical systems across AI, IoT, data, and cloud-connected applications.</p>
          </motion.div>
        </div>
        <button onClick={() => onSectionNav("projects")} className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center text-xs font-bold text-white/80 transition hover:text-white">
          Wanna see some<br />of my work? ↓
        </button>
      </section>

      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} onClick={onProjectClick} />
      ))}

      <section id="about" data-bg="#101010" className="min-h-screen px-6 py-28 md:px-12 lg:px-16">
        <div className="grid min-h-[70vh] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-10">
            <div>
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-white/40">About</p>
              <p className="max-w-2xl text-2xl leading-snug text-white/90 md:text-3xl">I'm Sajid, a Bachelor of Information Technology student at Federation University Australia with a strong interest in AI, IoT, cloud systems, databases, and practical research projects.</p>
            </div>
            <div>
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-white/40">Current Focus</p>
              <p className="text-xl text-white/80">Research Assistant, IoT systems, AI-assisted applications, graph databases, and cloud-connected prototypes.</p>
            </div>
            <a href="mailto:sajidul.h.sajid@gmail.com" className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:scale-105">
              Say Hello <ArrowUpRightIcon size={18} />
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative min-h-[280px] overflow-hidden bg-white/10 sm:min-h-[440px] md:min-h-[620px]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-white/50">Portrait / Working Image</p>
              <h2 className="mt-3 text-4xl font-black uppercase leading-[0.85] tracking-tighter sm:text-6xl md:text-8xl">Builds Useful Systems.</h2>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="experience" data-bg="#2E548B" className="px-6 py-28 md:px-12 lg:px-16">
        <div className="mb-10 grid gap-6 lg:mb-20 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="text-[16vw] font-black uppercase leading-[0.85] tracking-tighter sm:text-7xl md:text-9xl">Experience</h2>
          <p className="max-w-2xl text-xl leading-relaxed text-white/80">A mix of research, development, technical support, and real-world customer-facing work — shaped by practical problem-solving and communication.</p>
        </div>
        <div className="grid gap-4">
          {experience.map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.05 }} className="grid gap-4 border-t border-white/25 py-8 md:grid-cols-[180px_1fr_1.4fr]">
              <p className="font-bold text-white/60">{item.time}</p>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight sm:text-2xl">{item.title}</h3>
                <p className="text-white/60">{item.place}</p>
              </div>
              <p className="text-lg leading-relaxed text-white/80">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" data-bg="#050505" className="flex min-h-screen flex-col justify-between px-6 py-20 md:px-12 lg:px-16">
        <div className="pt-12">
          <p className="mb-8 text-sm font-bold uppercase tracking-[0.35em] text-white/40">Contact</p>
          <h2 className="max-w-6xl text-[14vw] font-black uppercase leading-[0.82] tracking-[-0.06em] sm:text-[14vw] md:text-[12vw] lg:text-[9vw]">Let's Build Something Useful.</h2>
        </div>
        <div className="grid gap-6 border-t border-white/20 pt-8 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-xl text-lg text-white/60">Open to research, internship, project collaboration, and technology support opportunities across AI, IoT, cloud, and applied systems.</p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <a href="mailto:sajidul.h.sajid@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-black transition hover:scale-105 sm:px-5"><MailIcon size={16} /> Email</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black sm:px-5"><LinkedinIcon size={16} /> LinkedIn</a>
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black sm:px-5"><GithubIcon size={16} /> GitHub</a>
            <a href="#" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black sm:px-5"><DownloadIcon size={16} /> Resume</a>
          </div>
        </div>
        <footer className="pt-10 text-sm text-white/40">© {currentYear} MD Sajidul Haque Sajid</footer>
      </section>
    </main>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState({ type: "home", projectId: null });

  const goToProject = (id) => setPage({ type: "project", projectId: id });
  const goHome = () => setPage({ type: "home", projectId: null });

  const handleNav = (section) => {
    if (page.type !== "home") {
      setPage({ type: "home", projectId: null });
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentProject = projects.find((p) => p.id === page.projectId);

  return (
    <>
      <LogoMark onClick={page.type === "home" ? () => window.scrollTo({ top: 0, behavior: "smooth" }) : goHome} />
      <FloatingMenu onNav={handleNav} />
      <AnimatePresence mode="wait">
        {page.type === "home" ? (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <HomePage onProjectClick={goToProject} onSectionNav={handleNav} />
          </motion.div>
        ) : (
          <motion.div key={`project-${page.projectId}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <ProjectPage project={currentProject} onBack={goHome} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
