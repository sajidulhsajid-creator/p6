import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Download, Github, Linkedin, Mail, Menu, X } from 'lucide-react';

const projects = [
    {
    id: 'nanya',
    title: 'NsANYA Station',
    fullTitle: 'Nanya Acoustic Monitoring Station',
    client: 'Federation University Australia - Nanya Conservation Reserve',
    role: 'Research and Development Intern ',
    focus: 'Raspberry Pi, BirdNET-Pi, LoRa, GPS Timing',
    year: '2025–2026',
    color: '#4A87DF',
    intro: 'A remote acoustic monitoring system designed to detect bird calls in conservation environments using distributed Raspberry Pi stations.',
    details: 'Consists of three remote stations  species detection, LoRa for low-bandwidth metadata sharing, GPS timing for high-precision timestamps, and a field-ready design for remote deployment and environmental monitoring.',
    tags: ['Raspberry Pi', 'BirdNET-Pi', 'LoRa', 'GPS', 'Solar'],
  },

    {
    id: 'buzzbay',
    title: 'BUZZBAY EV',
    fullTitle: 'Buzzbay EV Charging Communication System',
    client: 'Buzzbay Energy x Federation University Australia',
    role: 'Research Assistant',
    focus: 'EV Charging, ESP32, MQTT, OCPP, LoRa',
    year: '2026',
    color: '#B9A158',
    intro: 'A research and development project for industrial client, Buzzbay - connecting thier EV charging hardware with embedded controllers, MQTT infrastructure, OCPP bridge layers, and charging networks.',
    details: 'The system supports a fallback simulation mode using dummy charging data while hardware components are under repair. The architecture is designed so live OpenEVSE data can later replace the dummy data stream with minimal changes.',
    tags: ['ESP32', 'MQTT', 'OCPP', 'LoRa', 'OpenEVSE'],
  },
  
  {
    id: 'simint',
    title: 'SIMINT',
    fullTitle: 'SIMINT — Simulative Intelligence',
    client: 'Federation University Australia',
    role: 'Developer / Scrum Master',
    focus: 'Natural Language Querying, AI, Neo4j, Streamlit ',
    year: '2025',
    color: '#D04A2B',
    intro: 'An AI-powered investigation support system that lets non-technical users ask natural-language questions and receive structured insights from a cloud-hosted database.',
    details: 'SIMINT enables plain English to Cypher query generation, Neo4j Aura, graph visualisation, and investigative intelligence workflows. The goal is to reduce technical barriers and help users uncover relationships across incidents, actors, locations, ideologies, and event patterns.',
    tags: ['Gemini', 'Neo4j Aura', 'Streamlit', 'Cypher', 'PyVis'],
  },

];

const experience = [
  { title: 'Research Assistant', place: 'Buzzbay Energy x Federation University Australia', time: '2026', text: 'Supporting EV charging communication research across embedded systems, MQTT, OCPP, and hardware simulation workflows.' },
  { title: 'Sole Intern, Development and Deployment', place: 'Federation University Australia - Nanya Conservation Reserve, NSW, Australia', time: '2025', text: 'Research and Development of Renewable Energy Powered Remote Stations capable of observing data of interests for an endangerd species - Malleefowl ' },
 
];

function useSectionBackground() {
  const [background, setBackground] = useState('#111111');
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-bg]'));
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setBackground(visible.target.getAttribute('data-bg') || '#111111');
      },
      { threshold: [0.2, 0.35, 0.5, 0.7] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return background;
}

function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const navItems = ['Home', 'Projects', 'About', 'Experience', 'Contact'];
  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed right-6 top-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-xl transition hover:bg-white hover:text-black" aria-label="Open menu"><Menu size={24} /></button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black text-white">
            <button onClick={() => setOpen(false)} className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition hover:scale-105" aria-label="Close menu"><X size={26} /></button>
            <div className="flex min-h-screen flex-col justify-between p-8 md:p-14">
              <div className="text-6xl font-black italic tracking-tighter md:text-8xl">s</div>
              <nav className="space-y-2">
                {navItems.map((item, index) => <motion.button key={item} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.06 }} onClick={() => scrollTo(item)} className="block text-left text-6xl font-black uppercase tracking-tighter transition hover:translate-x-4 hover:text-white/60 md:text-8xl lg:text-9xl">{item}</motion.button>)}
              </nav>
              <p className="max-w-xl text-white/60">Portfolio of MD Sajidul Haque Sajid — AI, IoT, data, cloud systems, and practical technology projects.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectVisual({ project }) {
  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-none bg-white/90 md:min-h-[560px]">
      <div className="absolute inset-0 opacity-80" style={{ background: `linear-gradient(135deg, #f8f8f8, ${project.color}22)` }} />
      <div className="absolute inset-8 border border-black/10" />
      <div className="absolute left-6 top-6 rounded-full bg-black px-4 py-2 text-xs font-bold uppercase tracking-widest text-white md:left-10 md:top-10">{project.focus.split(',')[0]}</div>
      <div className="absolute bottom-8 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
        <p className="mb-4 max-w-2xl text-sm font-semibold uppercase tracking-[0.35em] text-black/50">Project</p>
        <h3 className="text-6xl font-black uppercase leading-[0.85] tracking-tighter text-black md:text-8xl lg:text-9xl">{project.title}</h3>
      </div>
      <div className="absolute right-6 top-6 hidden gap-3 md:grid md:right-10 md:top-10">
        {project.tags.slice(0, 3).map((tag) => <div key={tag} className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs font-semibold text-black backdrop-blur-md">{tag}</div>)}
      </div>
    </div>
  );
}

function ProjectSection({ project, index }) {
  return (
    <section id={index === 0 ? 'work' : undefined} data-bg={project.color} className="min-h-screen px-6 py-28 md:px-12 lg:px-16">
      <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-20">
        <motion.aside initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }} className="text-sm font-semibold text-white lg:sticky lg:top-28 lg:h-fit">
          <p>Client: {project.client}</p><p>Project: {project.fullTitle}</p><p>Role: {project.role}</p><p>Focus: {project.focus}</p><p>Year: {project.year}</p>
        </motion.aside>
        <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9 }} className="space-y-10">
          <ProjectVisual project={project} />
          <div className="grid gap-8 text-white md:grid-cols-[1fr_1.2fr]">
            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-tighter md:text-7xl">{project.fullTitle}</h2>
            <div className="space-y-5 text-lg leading-relaxed text-white/90"><p>{project.intro}</p><p className="text-white/70">{project.details}</p><div className="flex flex-wrap gap-2 pt-2">{project.tags.map((tag) => <span key={tag} className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-black">{tag}</span>)}</div></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function App() {
  const background = useSectionBackground();
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  return (
    <main className="min-h-screen overflow-x-hidden text-white transition-colors duration-700 ease-out" style={{ backgroundColor: background }}>
      <FloatingMenu />
      <div className="fixed left-6 top-6 z-40 text-6xl font-black italic tracking-tighter text-white md:left-12 md:top-10 md:text-7xl">s</div>
      <section id="home" data-bg="#111111" className="relative flex min-h-screen items-center px-6 py-24 md:px-12 lg:px-16">
        <div className="grid w-full gap-16 lg:grid-cols-[1.35fr_0.75fr] lg:items-end">
          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-5xl text-[18vw] font-black uppercase leading-[0.77] tracking-[-0.08em] md:text-[15vw] lg:text-[11vw]">Oh Hey<br />There.</motion.h1>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.18 }} className="max-w-xl pb-4 text-xl leading-relaxed text-white/90 md:text-2xl"><p>I’m Sajid — an IT student, research assistant, and emerging technology professional building practical systems across AI, IoT, data, and cloud-connected applications.</p></motion.div>
        </div>
        <button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center text-xs font-bold text-white/80 transition hover:text-white">Wanna see some<br />of my work? ↓</button>
      </section>
      {projects.map((project, index) => <ProjectSection key={project.id} project={project} index={index} />)}
      <section id="about" data-bg="#101010" className="min-h-screen px-6 py-28 md:px-12 lg:px-16"><div className="grid min-h-[70vh] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"><motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-10"><div><p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-white/40">About</p><p className="max-w-2xl text-2xl leading-snug text-white/90 md:text-3xl">I’m Sajid, a Bachelor of Information Technology student at Federation University Australia with a strong interest in AI, IoT, cloud systems, databases, and practical research projects.</p></div><div><p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-white/40">Current Focus</p><p className="text-xl text-white/80">Research Assistant, IoT systems, AI-assisted applications, graph databases, and cloud-connected prototypes.</p></div><a href="mailto:sajidul.h.sajid@gmail.com" className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:scale-105">Say Hello <ArrowUpRight size={18} /></a></motion.div><motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative min-h-[440px] overflow-hidden bg-white/10 md:min-h-[620px]"><div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" /><div className="absolute bottom-8 left-8 right-8"><p className="text-sm font-bold uppercase tracking-[0.35em] text-white/50">Portrait / Working Image</p><h2 className="mt-3 text-6xl font-black uppercase leading-[0.85] tracking-tighter md:text-8xl">Builds Useful Systems.</h2></div></motion.div></div></section>
      <section id="experience" data-bg="#2E548B" className="px-6 py-28 md:px-12 lg:px-16"><div className="mb-20 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end"><h2 className="text-7xl font-black uppercase leading-[0.85] tracking-tighter md:text-9xl">Experience</h2><p className="max-w-2xl text-xl leading-relaxed text-white/80">A mix of research, development, technical support, and real-world customer-facing work — shaped by practical problem-solving and communication.</p></div><div className="grid gap-4">{experience.map((item, index) => <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.05 }} className="grid gap-4 border-t border-white/25 py-8 md:grid-cols-[180px_1fr_1.4fr]"><p className="font-bold text-white/60">{item.time}</p><div><h3 className="text-2xl font-black uppercase tracking-tight">{item.title}</h3><p className="text-white/60">{item.place}</p></div><p className="text-lg leading-relaxed text-white/80">{item.text}</p></motion.div>)}</div></section>
      <section id="contact" data-bg="#050505" className="flex min-h-screen flex-col justify-between px-6 py-20 md:px-12 lg:px-16"><div className="pt-12"><p className="mb-8 text-sm font-bold uppercase tracking-[0.35em] text-white/40">Contact</p><h2 className="max-w-6xl text-[17vw] font-black uppercase leading-[0.78] tracking-[-0.08em] md:text-[12vw] lg:text-[9vw]">Let’s Build Something Useful.</h2></div><div className="grid gap-6 border-t border-white/20 pt-8 md:grid-cols-[1fr_auto] md:items-end"><p className="max-w-xl text-lg text-white/60">Open to research, internship, project collaboration, and technology support opportunities across AI, IoT, cloud, and applied systems.</p><div className="flex flex-wrap gap-3"><a href="mailto:sajidul.h.sajid@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:scale-105"><Mail size={18} /> Email</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white hover:text-black"><Linkedin size={18} /> LinkedIn</a><a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white hover:text-black"><Github size={18} /> GitHub</a><a href="#" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white hover:text-black"><Download size={18} /> Resume</a></div></div><footer className="pt-10 text-sm text-white/40">© {currentYear} MD Sajidul Haque Sajid</footer></section>
    </main>
  );
}
