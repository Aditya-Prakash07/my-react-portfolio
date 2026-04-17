import { useState, useEffect, useRef } from "react";

const DATA = {
  name: "Aditya Prakash",
  roles: ["Software Engineer", "Backend Architect", "API Specialist", "Microservices Dev", "Cloud Engineer"],
  summary: "Specialized in RESTful API design, microservices, and CI/CD automation. Shipped production systems handling 1M+ daily events at sub-100ms response times.",
  contact: { phone: "+91 9529338081", email: "toadityarajput@gmail.com", linkedin: "aditya-prakash-996538170", github: "Aditya-Prakash07" },
  stats: [
    { value: 1000000, prefix: "", suffix: "+", label: "Daily Events", icon: "⚡" },
    { value: 100, prefix: "<", suffix: "ms", label: "Response Time", icon: "🚀" },
    { value: 35, prefix: "", suffix: "%", label: "Query Boost", icon: "📈" },
    { value: 40, prefix: "", suffix: "%", label: "Faster Deploy", icon: "🔧" },
  ],
  skills: [
    { cat: "Languages", color: "#00D4FF", items: ["Java", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"] },
    { cat: "Frameworks", color: "#7C3AED", items: ["Spring Boot", "Spring MVC", "Spring Data JPA", "Hibernate", "React.js", "Node.js"] },
    { cat: "Databases", color: "#10B981", items: ["MySQL", "PostgreSQL", "SQL Server", "Redis"] },
    { cat: "Messaging", color: "#F59E0B", items: ["Apache Kafka", "WebSocket", "REST APIs", "JWT"] },
    { cat: "Cloud & DevOps", color: "#EF4444", items: ["Azure", "AWS (EC2, S3)", "Docker", "Kubernetes", "GitHub Actions", "Jenkins"] },
    { cat: "Architecture", color: "#EC4899", items: ["Microservices", "Event-Driven", "SOLID", "Design Patterns", "CI/CD", "TDD"] },
  ],
  experience: [
    {
      company: "System Infra Solutions", role: "Software Engineer", period: "Jul 2024 – Present", current: true, color: "#00D4FF",
      bullets: [
        "APIs & frontend for sensor telemetry monitoring across 10+ sites — 99.9% uptime, sub-100ms response.",
        "Microservices for 5+ independently deployable components — cut inter-service coupling 60%.",
        "CI/CD via Azure DevOps — release cycle 40% faster, zero manual deployment errors.",
        "95% on-time delivery over 12+ consecutive Agile sprints.",
      ],
    },
    {
      company: "Nanomindz Technologies", role: "Software Engineer Intern", period: "Mar 2024 – Jun 2024", current: false, color: "#7C3AED",
      bullets: [
        "Java backend with JDBC + MySQL — 10,000+ daily record ops, zero data-loss.",
        "JWT auth + RBAC — zero unauthorized-access breaches post-launch.",
        "Tuned 20+ SQL queries — 35% drop in p95 execution time under peak load.",
        "15+ RESTful endpoints — cross-team defects down 50%, UI release 2 weeks faster.",
      ],
    },
  ],
  projects: [
    { name: "iProtect", num: "01", color: "#00D4FF", accent: "#0099CC", tags: ["Spring Boot", "WebSocket", "React"], desc: "Real-time site monitoring & alarm platform for 50+ locations. Cut alert-to-action time by 45% via event-driven backend + WebSocket-powered React frontend.", metric: "45% faster alerts" },
    { name: "SISAXS", num: "02", color: "#7C3AED", accent: "#5B21B6", tags: ["Kafka", "IoT", "Microservices"], desc: "Fault-tolerant IoT system ingesting 1M+ telemetry events daily. Automatic failover kept uptime above 99.8%. Trimmed processing overhead by 30%.", metric: "1M+ events/day" },
    { name: "E-Commerce App", num: "03", color: "#10B981", accent: "#059669", tags: ["Spring Boot", "React", "Redis", "JWT"], desc: "Full-stack store for 500+ concurrent shoppers. Redis caching + JPA optimizations dropped API p99 response time by 25%. Zero security incidents.", metric: "500+ concurrent users" },
  ],
  education: { school: "SRM Institute of Science and Technology", degree: "Master of Computer Applications", field: "Computer Science", period: "2023 – 2025", gpa: "9.35", location: "Chennai, India" },
  certifications: [
    { name: "Full Stack Java Developer", issuer: "AccioJob", icon: "☕" },
    { name: "Claude AI Certification", issuer: "Anthropic", icon: "🤖" },
  ],
  achievements: [
    { text: "1,100+ coding challenges on AccioJob", highlight: "Top 5%", icon: "🏆" },
    { text: "100+ LeetCode problems solved", highlight: "Graphs · Trees · DP", icon: "💡" },
    { text: "API Performance Award nominee", highlight: "+20% throughput", icon: "⚡" },
  ],
};

const NAV = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

// ── Aurora Background ────────────────────────────────────────────────────────
function AuroraBg({ dark }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, background: dark ? "radial-gradient(ellipse at 20% 50%, #04001a 0%, #010008 50%, #000003 100%)" : "radial-gradient(ellipse at 20% 50%, #eef2ff 0%, #e0e7ff 50%, #dbeafe 100%)" }} />
      {dark && (
        <>
          <div style={{ position: "absolute", width: 800, height: 800, borderRadius: "50%", top: "-25%", left: "-15%", background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 65%)", animation: "au1 14s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 1000, height: 700, borderRadius: "50%", top: "10%", right: "-25%", background: "radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%)", animation: "au2 17s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", bottom: "-15%", left: "25%", background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 65%)", animation: "au3 11s ease-in-out infinite" }} />
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        </>
      )}
      {!dark && (
        <>
          <div style={{ position: "absolute", width: 800, height: 800, borderRadius: "50%", top: "-25%", left: "-15%", background: "radial-gradient(circle, rgba(99,179,237,0.18) 0%, transparent 65%)", animation: "au1 14s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 1000, height: 700, borderRadius: "50%", top: "10%", right: "-25%", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)", animation: "au2 17s ease-in-out infinite" }} />
        </>
      )}
      <div style={{ position: "absolute", inset: 0, opacity: dark ? 0.025 : 0.012, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "150px 150px" }} />
    </div>
  );
}

// ── Magnetic Cursor ──────────────────────────────────────────────────────────
function MagneticCursor({ dark }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    let id;
    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;
      if (dotRef.current) dotRef.current.style.transform = `translate(${pos.current.x - 5}px,${pos.current.y - 5}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ring.current.x - 18}px,${ring.current.y - 18}px)`;
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(id); };
  }, []);
  const c = dark ? "#00D4FF" : "#7C3AED";
  return (
    <>
      <div ref={dotRef} style={{ position: "fixed", top: 0, left: 0, width: 10, height: 10, borderRadius: "50%", background: c, zIndex: 9999, pointerEvents: "none", mixBlendMode: dark ? "screen" : "multiply" }} />
      <div ref={ringRef} style={{ position: "fixed", top: 0, left: 0, width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${c}70`, zIndex: 9998, pointerEvents: "none" }} />
    </>
  );
}

// ── Particle Field ───────────────────────────────────────────────────────────
function ParticleField({ dark }) {
  const ref = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let id, w, h;
    const N = 90, pts = [];
    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    resize();
    for (let i = 0; i < N; i++) pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: Math.random() * 1.5 + 0.4 });
    const onM = (e) => { const r = canvas.getBoundingClientRect(); mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    window.addEventListener("mousemove", onM);
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const { x: mx, y: my } = mouse.current;
      for (let i = 0; i < N; i++) {
        const p = pts[i];
        const dx = mx - p.x, dy = my - p.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 140) { p.vx -= (dx / d) * 0.18; p.vy -= (dy / d) * 0.18; }
        p.vx *= 0.985; p.vy *= 0.985;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dark ? "rgba(0,212,255,0.7)" : "rgba(124,58,237,0.55)"; ctx.fill();
        for (let j = i + 1; j < N; j++) {
          const q = pts[j], ex = p.x - q.x, ey = p.y - q.y, dist = Math.sqrt(ex * ex + ey * ey);
          if (dist < 110) {
            const a = (1 - dist / 110) * 0.3;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = dark ? `rgba(0,212,255,${a})` : `rgba(124,58,237,${a})`; ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("mousemove", onM); window.removeEventListener("resize", resize); };
  }, [dark]);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "all" }} />;
}

// ── Typewriter ───────────────────────────────────────────────────────────────
function Typewriter({ words, color }) {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const word = words[idx];
    let t;
    if (!del && txt === word) { t = setTimeout(() => setDel(true), 2200); }
    else if (del && txt === "") { setDel(false); setIdx(i => (i + 1) % words.length); }
    else { t = setTimeout(() => setTxt(del ? txt.slice(0, -1) : word.slice(0, txt.length + 1)), del ? 35 : 75); }
    return () => clearTimeout(t);
  }, [txt, del, idx, words]);
  return <span style={{ color }}>{txt}<span style={{ opacity: blink ? 1 : 0, color }}>|</span></span>;
}

// ── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ value, prefix = "", suffix = "" }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const steps = 60, dur = 1600;
        let s = 0;
        const t = setInterval(() => {
          s++;
          const ease = s / steps;
          setN(Math.round(value * (1 - Math.pow(1 - ease, 3))));
          if (s >= steps) { setN(value); clearInterval(t); }
        }, dur / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  const display = value >= 1000000 ? prefix + (n >= 1000000 ? Math.floor(n / 1000000) + "M" : Math.floor(n / 1000) + "K") + suffix : prefix + n + suffix;
  return <span ref={ref}>{display}</span>;
}

// ── 3D Tilt Card ─────────────────────────────────────────────────────────────
function TiltCard({ children, dark, style, glow = "#00D4FF" }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.025)`;
    el.style.boxShadow = `${x * -25}px ${y * -25}px 50px ${glow}18, 0 0 30px ${glow}10`;
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
    el.style.boxShadow = "none";
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{
      background: dark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.82)",
      border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(124,58,237,0.12)",
      borderRadius: 20, backdropFilter: "blur(24px)",
      transition: "transform 0.12s ease, box-shadow 0.12s ease",
      willChange: "transform", ...style,
    }}>
      {children}
    </div>
  );
}

// ── Scroll Reveal ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0px)" : "translateY(48px)", transition: `opacity 0.75s ease ${delay}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s` }}>
      {children}
    </div>
  );
}

// ── Skill Pill ───────────────────────────────────────────────────────────────
function Pill({ label, color, dark }) {
  const [h, setH] = useState(false);
  return (
    <span onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      display: "inline-block", padding: "5px 13px", borderRadius: 30, fontSize: 11.5,
      fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.02em",
      background: h ? color + "28" : dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
      border: `1px solid ${h ? color : dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)"}`,
      color: h ? color : dark ? "#94a3b8" : "#475569",
      transition: "all 0.18s ease", cursor: "default",
      boxShadow: h ? `0 0 14px ${color}35` : "none",
    }}>{label}</span>
  );
}

// ── Theme Toggle ─────────────────────────────────────────────────────────────
function ThemeToggle({ dark, toggle }) {
  const c = dark ? "#00D4FF" : "#7C3AED";
  return (
    <button onClick={toggle} aria-label="Toggle theme" style={{
      position: "relative", width: 54, height: 28, borderRadius: 14,
      background: dark ? "rgba(0,212,255,0.12)" : "rgba(124,58,237,0.1)",
      border: `1px solid ${c}50`, cursor: "pointer", padding: 0,
      transition: "all 0.3s", flexShrink: 0,
    }}>
      <div style={{
        position: "absolute", top: 3, left: dark ? 28 : 3, width: 20, height: 20, borderRadius: "50%",
        background: c, transition: "left 0.35s cubic-bezier(.34,1.56,.64,1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 0 10px ${c}90`,
      }}>
        {dark
          ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>
          : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        }
      </div>
    </button>
  );
}

// ── Section Label ────────────────────────────────────────────────────────────
function SectionHead({ num, title, accent, dark }) {
  return (
    <div style={{ marginBottom: 60 }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: accent, letterSpacing: "0.18em", marginBottom: 14, opacity: 0.9 }}>{num}</div>
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(34px,4.5vw,58px)", color: dark ? "#e2e8f0" : "#1e293b", lineHeight: 1.05 }}>
        {title[0]}<br /><span style={{ color: accent }}>{title[1]}</span>
      </h2>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [activeNav, setActiveNav] = useState("About");
  const toggle = () => setDark(d => !d);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
  };

  const T = dark ? "#e2e8f0" : "#1e293b";
  const TS = dark ? "#64748b" : "#64748b";
  const A = dark ? "#00D4FF" : "#7C3AED";
  const A2 = dark ? "#7C3AED" : "#EC4899";

  return (
    <div style={{ minHeight: "100vh", color: T, fontFamily: "'DM Sans', sans-serif", overflowX: "hidden", cursor: "none" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ::selection{background:${A}30;color:${A};}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:${dark ? "rgba(0,212,255,0.3)" : "rgba(124,58,237,0.3)"};border-radius:2px;}
        @keyframes au1{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(70px,-50px) scale(1.12);}}
        @keyframes au2{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-90px,70px) scale(0.88);}}
        @keyframes au3{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(50px,90px) scale(1.08);}}
        @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-14px);}}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes spin-rev{to{transform:rotate(-360deg);}}
        @keyframes pring{0%{transform:scale(1);opacity:.7;}100%{transform:scale(1.8);opacity:0;}}
        @keyframes line-down{0%{height:0;opacity:0;}100%{height:60px;opacity:1;}}
        .navbtn:hover{color:${A} !important;}
        .glow-btn:hover{transform:translateY(-3px) !important; filter:brightness(1.1);}
        .contact-chip:hover{border-color:${A} !important; background:${A}12 !important; transform:translateY(-2px); color:${A} !important;}
        .social-btn:hover{border-color:${A} !important; color:${A} !important; background:${A}10 !important;}
      `}</style>

      <AuroraBg dark={dark} />
      <MagneticCursor dark={dark} />

      {/* ───── NAVBAR ───── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6vw",
        background: dark ? "rgba(4,0,18,0.75)" : "rgba(238,242,255,0.75)",
        backdropFilter: "blur(28px) saturate(1.4)",
        borderBottom: dark ? "1px solid rgba(0,212,255,0.07)" : "1px solid rgba(124,58,237,0.09)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg,${A},${A2})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 13, color: "#fff", boxShadow: `0 0 18px ${A}50`, letterSpacing: "0.02em" }}>AP</div>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, color: T }}>Aditya Prakash</span>
        </div>
        <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
          {NAV.map(l => (
            <button key={l} className="navbtn" onClick={() => scrollTo(l)} style={{
              background: activeNav === l ? A + "12" : "transparent",
              border: activeNav === l ? `1px solid ${A}25` : "1px solid transparent",
              color: activeNav === l ? A : TS, padding: "5px 15px", borderRadius: 8, cursor: "pointer",
              fontFamily: "inherit", fontSize: 13, fontWeight: 500, transition: "all 0.2s", letterSpacing: "0.01em",
            }}>{l}</button>
          ))}
          <div style={{ marginLeft: 14 }}><ThemeToggle dark={dark} toggle={toggle} /></div>
        </div>
      </nav>

      {/* ───── HERO ───── */}
      <section id="about" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "80px 6vw 0", overflow: "hidden" }}>
        <ParticleField dark={dark} />
        <div style={{ position: "relative", zIndex: 2, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48, flexWrap: "wrap" }}>
          {/* Left */}
          <div style={{ flex: "1 1 460px", maxWidth: 600 }}>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 30, padding: "6px 14px 6px 8px", borderRadius: 30, background: dark ? "rgba(0,212,255,0.05)" : "rgba(124,58,237,0.05)", border: dark ? "1px solid rgba(0,212,255,0.18)" : "1px solid rgba(124,58,237,0.18)" }}>
              <div style={{ position: "relative", width: 9, height: 9, flexShrink: 0 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#10B981" }} />
                <div style={{ position: "absolute", inset: -2, borderRadius: "50%", border: "2px solid #10B981", animation: "pring 1.8s ease-out infinite" }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#10B981", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.08em" }}>AVAILABLE FOR WORK</span>
            </div>

            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, lineHeight: 1.0, marginBottom: 10 }}>
              <span style={{ display: "block", fontSize: "clamp(54px,7.5vw,98px)", color: T, letterSpacing: "-0.02em" }}>Aditya</span>
              <span style={{ display: "block", fontSize: "clamp(54px,7.5vw,98px)", color: A, letterSpacing: "-0.02em", filter: dark ? `drop-shadow(0 0 35px ${A}55)` : "none" }}>Prakash</span>
            </h1>

            <div style={{ height: 44, display: "flex", alignItems: "center", marginBottom: 22, gap: 6 }}>
              <span style={{ fontSize: 19, fontWeight: 300, color: TS }}>I am a</span>
              <span style={{ fontSize: 19, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif" }}><Typewriter words={DATA.roles} color={A} /></span>
            </div>

            <p style={{ fontSize: 15.5, color: TS, lineHeight: 1.9, maxWidth: 490, marginBottom: 42 }}>{DATA.summary}</p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 38 }}>
              <button className="glow-btn" onClick={() => scrollTo("Projects")} style={{
                padding: "13px 30px", borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: "pointer",
                fontFamily: "inherit", transition: "all 0.25s",
                background: `linear-gradient(135deg,${A},${A2})`, color: "#fff", border: "none",
                letterSpacing: "0.05em", boxShadow: `0 6px 28px ${A}45`,
              }}>VIEW PROJECTS</button>
              <a href={`mailto:${DATA.contact.email}`} className="glow-btn" style={{
                padding: "13px 30px", borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: "pointer",
                fontFamily: "inherit", transition: "all 0.25s", textDecoration: "none",
                background: "transparent", color: A, border: `1px solid ${A}55`,
                letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 8,
              }}>
                CONTACT ME
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: TS, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.1em" }}>FIND ME ON</span>
              {[
                { href: `https://github.com/${DATA.contact.github}`, svg: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> },
                { href: `https://linkedin.com/in/${DATA.contact.linkedin}`, svg: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn" style={{ width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", border: dark ? "1px solid rgba(255,255,255,0.09)" : "1px solid rgba(0,0,0,0.09)", color: TS, transition: "all 0.2s", textDecoration: "none" }}>{s.svg}</a>
              ))}
            </div>
          </div>

          {/* Right: Avatar with orbits */}
          <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "relative", width: 340, height: 340, display: "flex", alignItems: "center", justifyContent: "center", animation: "float 5s ease-in-out infinite" }}>
              {/* Outer orbit */}
              <div style={{ position: "absolute", inset: -30, borderRadius: "50%", border: dark ? "1px dashed rgba(0,212,255,0.22)" : "1px dashed rgba(124,58,237,0.18)", animation: "spin 22s linear infinite" }}>
                <div style={{ position: "absolute", top: "8%", left: "-5px", width: 10, height: 10, borderRadius: "50%", background: A, boxShadow: `0 0 12px ${A}` }} />
                <div style={{ position: "absolute", bottom: "20%", right: "-4px", width: 6, height: 6, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981" }} />
              </div>
              {/* Inner orbit */}
              <div style={{ position: "absolute", inset: -60, borderRadius: "50%", border: dark ? "1px dashed rgba(124,58,237,0.15)" : "1px dashed rgba(236,72,153,0.15)", animation: "spin-rev 34s linear infinite" }}>
                <div style={{ position: "absolute", top: "50%", right: "-5px", width: 8, height: 8, borderRadius: "50%", background: A2, boxShadow: `0 0 10px ${A2}` }} />
              </div>
              {/* Photo */}
              <div style={{
                width: 280, height: 280, borderRadius: "50%", overflow: "hidden",
                background: dark ? `linear-gradient(135deg,${A}20,${A2}18)` : `linear-gradient(135deg,${A}15,${A2}12)`,
                border: dark ? `2px solid ${A}35` : `2px solid ${A}28`,
                boxShadow: dark ? `0 0 60px ${A}22, 0 0 120px ${A2}14` : `0 0 40px ${A}18`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <img src="https://avatars.githubusercontent.com/Aditya-Prakash07" alt="Aditya Prakash"
                  onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 72, color: A }}>AP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll line */}
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ width: 1, height: 60, background: dark ? `linear-gradient(${A},transparent)` : `linear-gradient(${A},transparent)`, animation: "line-down 1s ease forwards" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.2em", color: TS, fontFamily: "'JetBrains Mono',monospace" }}>SCROLL</span>
        </div>
      </section>

      {/* ───── STATS STRIP ───── */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 6vw" }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", background: dark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.65)", border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(124,58,237,0.1)", borderRadius: 20, overflow: "hidden", backdropFilter: "blur(20px)" }}>
            {DATA.stats.map((s, i) => (
              <div key={i} style={{ padding: "36px 20px", textAlign: "center", borderRight: i < 3 ? (dark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(124,58,237,0.07)") : "none" }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 38, fontWeight: 800, fontFamily: "'Space Grotesk',sans-serif", color: A, lineHeight: 1 }}>
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 12, color: TS, marginTop: 10, fontWeight: 500, letterSpacing: "0.03em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ───── CONTENT ───── */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 6vw", maxWidth: 1200, margin: "0 auto" }}>

        {/* SKILLS */}
        <section id="skills" style={{ padding: "110px 0 60px" }}>
          <Reveal><SectionHead num="02 / SKILLS" title={["Technical", "Arsenal"]} accent={A} dark={dark} /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 18 }}>
            {DATA.skills.map((sk, i) => (
              <Reveal key={sk.cat} delay={i * 0.07}>
                <TiltCard dark={dark} glow={sk.color} style={{ padding: "26px 28px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 17 }}>
                    <div style={{ width: 4, height: 22, borderRadius: 3, background: sk.color, boxShadow: `0 0 10px ${sk.color}90` }} />
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 13.5, color: T }}>{sk.cat}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {sk.items.map(it => <Pill key={it} label={it} color={sk.color} dark={dark} />)}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" style={{ padding: "60px 0" }}>
          <Reveal><SectionHead num="03 / EXPERIENCE" title={["Work", "History"]} accent={A} dark={dark} /></Reveal>
          <div style={{ position: "relative", paddingLeft: 52 }}>
            {/* Vertical line */}
            <div style={{ position: "absolute", left: 16, top: 0, bottom: 0, width: 1, background: dark ? `linear-gradient(180deg,${A}70,${A2}50,transparent)` : `linear-gradient(180deg,${A}60,transparent)` }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              {DATA.experience.map((exp, i) => (
                <Reveal key={exp.company} delay={i * 0.12}>
                  <div style={{ position: "relative" }}>
                    {/* Dot */}
                    <div style={{ position: "absolute", left: -44, top: 28, width: 18, height: 18, borderRadius: "50%", background: exp.color, border: dark ? "2.5px solid #04001a" : "2.5px solid #eef2ff", boxShadow: `0 0 14px ${exp.color}` }}>
                      {exp.current && <div style={{ position: "absolute", inset: -5, borderRadius: "50%", border: `1.5px solid ${exp.color}50`, animation: "pring 2s ease-out infinite" }} />}
                    </div>
                    <TiltCard dark={dark} glow={exp.color} style={{ padding: "30px 34px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
                        <div>
                          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 19, color: T }}>{exp.role}</div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: exp.color, marginTop: 2 }}>{exp.company}</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: TS, padding: "3px 11px", borderRadius: 20, background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)" }}>{exp.period}</span>
                          {exp.current && <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#10B981", padding: "2px 9px", borderRadius: 20, background: "rgba(16,185,129,0.09)", border: "1px solid rgba(16,185,129,0.28)" }}>CURRENT</span>}
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                        {exp.bullets.map((b, bi) => (
                          <div key={bi} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: exp.color, marginTop: 8, flexShrink: 0, boxShadow: `0 0 5px ${exp.color}` }} />
                            <span style={{ fontSize: 13.5, color: TS, lineHeight: 1.8 }}>{b}</span>
                          </div>
                        ))}
                      </div>
                    </TiltCard>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" style={{ padding: "60px 0" }}>
          <Reveal><SectionHead num="04 / PROJECTS" title={["Featured", "Work"]} accent={A} dark={dark} /></Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {DATA.projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.09}>
                <TiltCard dark={dark} glow={p.color} style={{ overflow: "hidden", padding: 0 }}>
                  <div style={{ display: "flex", minHeight: 170 }}>
                    <div style={{ width: 5, flexShrink: 0, background: `linear-gradient(180deg,${p.color},${p.accent})` }} />
                    <div style={{ padding: "8px 20px", display: "flex", alignItems: "flex-start", borderRight: dark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.05)" }}>
                      <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 44, color: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", lineHeight: 1, marginTop: 20 }}>{p.num}</span>
                    </div>
                    <div style={{ flex: 1, padding: "26px 30px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 13 }}>
                        <div>
                          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 21, color: T, marginBottom: 9 }}>{p.name}</h3>
                          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                            {p.tags.map(t => <Pill key={t} label={t} color={p.color} dark={dark} />)}
                          </div>
                        </div>
                        <div style={{ padding: "5px 15px", borderRadius: 20, background: p.color + "14", border: `1px solid ${p.color}30`, color: p.color, fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap" }}>{p.metric}</div>
                      </div>
                      <p style={{ fontSize: 13.5, color: TS, lineHeight: 1.82, maxWidth: 560 }}>{p.desc}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" style={{ padding: "60px 0" }}>
          <Reveal><SectionHead num="05 / EDUCATION" title={["Academic", "Background"]} accent={A} dark={dark} /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 22 }}>
            <Reveal>
              <TiltCard dark={dark} glow={A} style={{ padding: "34px 34px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: A + "14", border: `1px solid ${A}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🎓</div>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: TS }}>{DATA.education.period}</span>
                </div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 17, color: T, marginBottom: 6, lineHeight: 1.3 }}>{DATA.education.school}</div>
                <div style={{ fontSize: 13.5, color: A, fontWeight: 600, marginBottom: 4 }}>{DATA.education.degree}</div>
                <div style={{ fontSize: 13, color: TS, marginBottom: 22 }}>{DATA.education.field} · {DATA.education.location}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 12, background: A + "08", border: `1px solid ${A}15` }}>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 30, color: A }}>{DATA.education.gpa}</span>
                  <div><div style={{ fontSize: 12, fontWeight: 700, color: T }}>GPA</div><div style={{ fontSize: 11, color: TS }}>out of 10.0</div></div>
                  <div style={{ marginLeft: "auto", padding: "4px 10px", borderRadius: 8, background: "#10B98115", border: "1px solid #10B98130", color: "#10B981", fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>TOP GRADE</div>
                </div>
              </TiltCard>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {DATA.certifications.map((c, i) => (
                <Reveal key={c.name} delay={i * 0.1}>
                  <TiltCard dark={dark} glow={A2} style={{ padding: "20px 26px", display: "flex", gap: 15, alignItems: "center" }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: A2 + "12", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: T }}>{c.name}</div>
                      <div style={{ fontSize: 12.5, color: A2, marginTop: 2, fontWeight: 500 }}>{c.issuer}</div>
                    </div>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#10B98112", border: "1px solid #10B98125", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
              {DATA.achievements.map((a, i) => (
                <Reveal key={i} delay={(i + 2) * 0.1}>
                  <TiltCard dark={dark} glow="#10B981" style={{ padding: "16px 22px", display: "flex", gap: 13, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{a.icon}</span>
                    <div><span style={{ fontSize: 13, color: TS, lineHeight: 1.7 }}>{a.text} </span><span style={{ fontSize: 13, fontWeight: 700, color: "#10B981" }}>{a.highlight}</span></div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: "60px 0 130px" }}>
          <Reveal><SectionHead num="06 / CONTACT" title={["Let's", "Connect"]} accent={A} dark={dark} /></Reveal>
          <TiltCard dark={dark} glow={A} style={{ padding: "72px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle,${A}07 0%,transparent 65%)`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle,${A2}06 0%,transparent 65%)`, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: 15, color: TS, marginBottom: 10, fontWeight: 300 }}>Open to</p>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(26px,3.5vw,44px)", color: T, marginBottom: 14 }}>Backend Engineering Roles</h3>
              <p style={{ fontSize: 15, color: TS, maxWidth: 380, margin: "0 auto 52px" }}>Internships, full-time positions, and collaboration opportunities.</p>
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12, marginBottom: 44 }}>
                {[
                  { svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text: DATA.contact.email, href: `mailto:${DATA.contact.email}` },
                  { svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, text: DATA.contact.phone, href: `tel:${DATA.contact.phone}` },
                  { svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, text: "LinkedIn", href: `https://linkedin.com/in/${DATA.contact.linkedin}` },
                  { svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>, text: "GitHub", href: `https://github.com/${DATA.contact.github}` },
                ].map((c, i) => (
                  <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="contact-chip" style={{ display: "flex", alignItems: "center", gap: 9, padding: "12px 22px", borderRadius: 12, textDecoration: "none", background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)", color: TS, fontSize: 13.5, fontWeight: 600, transition: "all 0.2s" }}>
                    {c.svg}{c.text}
                  </a>
                ))}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: TS, letterSpacing: "0.1em", opacity: 0.7 }}>
                BUILT WITH REACT · {new Date().getFullYear()} · ADITYA PRAKASH
              </div>
            </div>
          </TiltCard>
        </section>

      </div>
    </div>
  );
}
