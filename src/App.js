import { useState, useEffect, useRef, useCallback } from "react";
import profileImg from "./assets/profile.jpeg";

// ─── SVG ICON LIBRARY ────────────────────────────────────────────────────────
const Icon = {
  code: (s = 18, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  layers: (s = 18, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  database: (s = 18, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  activity: (s = 18, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  cloud: (s = 18, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  shield: (s = 18, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  cpu: (s = 18, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  check: (s = 18, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  mail: (s = 16, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  phone: (s = 16, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  linkedin: (s = 16, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  github: (s = 16, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  fileText: (s = 16, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  externalLink: (s = 13, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  arrowRight: (s = 14, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  trending: (s = 18, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  zap: (s = 18, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  award: (s = 18, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  briefcase: (s = 18, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  graduation: (s = 18, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  menu: (s = 22, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  x: (s = 22, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  sun: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" /><line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" /><line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  ),
  moon: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const RESUME_URL = "https://drive.google.com/file/d/1Kvj9x0wTIFLmoOs4u_nWJ4z5m3Mdx1jv/view?usp=sharing";

const DATA = {
  name: "Aditya Prakash",
  title: "Backend Software Engineer",
  location: "Hajipur, Bihar, India",
  contact: {
    phone: "+91 9529338081",
    email: "mailtoadityaprakash@gmail.com",
    linkedin: "aditya-prakash-996538170",
    github: "Aditya-Prakash07",
    portfolio: "https://my-portfolio-three-hazel-32.vercel.app/",
  },
  summary:
    "Specializing in Java & Spring Boot — building RESTful APIs, microservices, and high-availability systems that scale to 4,000+ remote sites and process 1M+ daily events.",
  roles: ["Backend Engineer", "API Specialist", "Microservices Dev", "Spring Boot Expert"],
  stats: [
    { value: 1000000, display: "1M+", label: "Daily Events Processed", icon: "zap" },
    { value: 35, display: "35%", label: "Query Performance Gain", icon: "trending" },
    { value: 45, display: "45%", label: "API Latency Reduction", icon: "activity" },
    { value: 4000, display: "4K+", label: "Remote Sites Served", icon: "briefcase" },
  ],
  skills: [
    { cat: "Languages", color: "#38BDF8", icon: "code", items: ["Java 8/11/17/21", "SQL"] },
    { cat: "Core Frameworks", color: "#818CF8", icon: "layers", items: ["Spring Boot", "Spring MVC", "Spring Core", "Spring Security", "JWT / OAuth2", "RBAC", "Spring Data JPA"] },
    { cat: "ORM & Persistence", color: "#34D399", icon: "database", items: ["Hibernate ORM", "JPQL", "Criteria API", "Lazy/Eager Loading", "Transaction Management"] },
    { cat: "Databases", color: "#FBBF24", icon: "database", items: ["MySQL", "PostgreSQL", "Redis", "Query Optimisation", "Index Tuning", "Schema Design"] },
    { cat: "API Design", color: "#F87171", icon: "activity", items: ["RESTful APIs", "Swagger / OpenAPI 3.0", "Postman", "API Versioning", "Exception Handling"] },
    { cat: "Architecture & Patterns", color: "#38BDF8", icon: "cpu", items: ["Microservices", "Event-Driven", "SOLID", "OOP", "Builder", "Factory", "Strategy"] },
    { cat: "Testing", color: "#34D399", icon: "check", items: ["JUnit 5", "Mockito", "Integration Testing", "TDD"] },
    { cat: "DevOps & Cloud", color: "#818CF8", icon: "cloud", items: ["Docker", "Kubernetes (exposure)", "GitHub Actions", "AWS EC2/S3", "Maven", "Git"] },
  ],
  experience: [
    {
      company: "System Infra Solutions",
      role: "Software Engineer",
      location: "New Delhi, India",
      period: "Jul 2024 – May 2026",
      current: true,
      color: "#38BDF8",
      bullets: [
        { text: "Designed and developed core backend services for an enterprise IoT dashboard using ", bold: "Spring Boot and Spring MVC", rest: ", exposing RESTful APIs consumed by 4,000+ remote sites processing 50,000+ daily data points." },
        { text: "Built a secure API layer using ", bold: "Spring Security with JWT authentication and RBAC", rest: ", protecting all endpoints and enforcing fine-grained authorization across user roles." },
        { text: "Engineered the persistence layer using ", bold: "Spring Data JPA and Hibernate ORM", rest: "; implemented N+1 query fixes, fetch strategy tuning, and MySQL index optimization — reducing query execution times by 35%." },
        { text: "Containerized application services using ", bold: "Docker", rest: " and automated build pipelines with GitHub Actions (CI/CD), maintaining 99.9% environment uptime." },
        { text: "Developed reusable service and repository components following ", bold: "SOLID principles and OOP design patterns", rest: " (Builder, Factory, Strategy), improving code maintainability." },
        { text: "Implemented comprehensive ", bold: "unit and integration test suites with JUnit 5 and Mockito", rest: ", achieving high coverage on critical service and repository classes." },
        { text: "Collaborated in ", bold: "Agile/Scrum", rest: " sprints achieving 95% on-time delivery across 12 consecutive cycles." },
      ],
    },
  ],
  projects: [
    {
      name: "SISAXS — Enterprise IoT Ingestion Platform",
      color: "#38BDF8",
      tags: ["Java 17", "Spring Boot", "Spring Data JPA", "MySQL", "Docker"],
      metric: "1M+ events/day",
      desc: "Designed a fault-tolerant Spring Boot data ingestion engine processing 1M+ daily telemetry events from distributed IoT sensors. Engineered async service layers for 99.8% uptime under peak load. Restructured MySQL schemas with composite indexes, reducing transaction bottlenecks by 30%. Centralized exception handling via @ControllerAdvice.",
    },
    {
      name: "iProtect — Real-Time Security Monitoring",
      color: "#818CF8",
      tags: ["Spring Boot", "Spring Security", "PostgreSQL", "Hibernate ORM"],
      metric: "45% latency drop",
      desc: "Built the backend for a real-time hardware health monitoring platform serving 50+ remote locations. Reduced API latency by 45% by eliminating N+1 query patterns in Hibernate ORM, refactoring fetch strategies, and optimizing PostgreSQL query plans via EXPLAIN ANALYZE.",
    },
    {
      name: "E-Commerce Platform — Microservices",
      color: "#34D399",
      tags: ["Java 17", "Spring Boot", "Microservices", "Spring Security", "MySQL"],
      metric: "25% p99 improvement",
      desc: "Built a microservices-based backend using Spring Boot with inter-service REST communication. Implemented Spring Security (JWT + RBAC) supporting 500+ concurrent users. Reduced API p99 response times by 25% through JPA fetch strategy optimisation and DTO projections.",
    },
  ],
  education: {
    school: "SRM Institute of Science and Technology",
    degree: "Master of Computer Applications (MCA)",
    field: "Computer Science",
    period: "2023 – 2025",
    gpa: "9.35",
    location: "Chennai, India",
    certLink: "https://drive.google.com/file/d/1Iw53IgAZ0OaO3nUz9-h3Q7AxjIb5xdDA/view?usp=sharing",
  },
  certifications: [
    {
      name: "Full Stack Java Developer",
      issuer: "AccioJob · Core Java, DSA, Spring Boot",
      color: "#FBBF24",
      icon: "code",
      link: "https://drive.google.com/file/d/17gc4Y3a4Wy2mx9EDOac25NqpWOL0fVEX/view?usp=sharing",
    },
    {
      name: "Prompt Engineering & AI Fundamentals",
      issuer: "Anthropic",
      color: "#818CF8",
      icon: "cpu",
      link: "https://drive.google.com/file/d/1adxuf1-cG0edtpWuq-ipwNsZ2-8Ah8CB/view?usp=sharing",
    },
  ],
  achievements: [
    { text: "Ranked top 5% globally on AccioJob", sub: "1,100+ DSA problems solved", icon: "award", color: "#34D399" },
    { text: "100+ LeetCode problems solved", sub: "Graphs · Trees · Dynamic Programming", icon: "code", color: "#38BDF8" },
  ],
};

const NAV = ["Skills", "Experience", "Projects", "Education", "Contact"];

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────────────
function ScrollProgress({ dark }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const A = dark ? "#38BDF8" : "#6244e8";
  const A2 = dark ? "#818CF8" : "#d03a8c";
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 9999 }}>
      <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${A},${A2})`, transition: "width 0.1s linear" }} />
    </div>
  );
}

// ─── TYPEWRITER ───────────────────────────────────────────────────────────────
function Typewriter({ words, color }) {
  const [idx, setIdx] = useState(0), [txt, setTxt] = useState(""), [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[idx];
    let t;
    if (!del && txt === word) t = setTimeout(() => setDel(true), 2400);
    else if (del && txt === "") { setDel(false); setIdx((i) => (i + 1) % words.length); }
    else t = setTimeout(() => setTxt(del ? txt.slice(0, -1) : word.slice(0, txt.length + 1)), del ? 32 : 72);
    return () => clearTimeout(t);
  }, [txt, del, idx, words]);
  const [blink, setBlink] = useState(true);
  useEffect(() => { const id = setInterval(() => setBlink(b => !b), 530); return () => clearInterval(id); }, []);
  return <span style={{ color }}>{txt}<span style={{ opacity: blink ? 1 : 0, color }}>|</span></span>;
}

// ─── COUNTER ──────────────────────────────────────────────────────────────────
function Counter({ display }) {
  const [show, setShow] = useState("0");
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let step = 0;
        const steps = 50, dur = 1400;
        const t = setInterval(() => {
          step++;
          if (step >= steps) { setShow(display); clearInterval(t); }
        }, dur / steps);
        setTimeout(() => setShow(display), dur);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [display]);
  return <span ref={ref}>{show}</span>;
}

// ─── REVEAL ───────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

// ─── PILL ────────────────────────────────────────────────────────────────────
function Pill({ label, color, dark }) {
  const [h, setH] = useState(false);
  return (
    <span
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "inline-block", padding: "4px 10px", borderRadius: 5,
        fontSize: 11.5, fontWeight: 500, fontFamily: "'JetBrains Mono',monospace",
        background: h ? (color + "18") : dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
        border: `1px solid ${h ? (color + "55") : dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        color: h ? color : dark ? "#6B8FAE" : "#556070",
        transition: "all 0.15s", cursor: "default",
      }}
    >{label}</span>
  );
}

// ─── ICON BOX ─────────────────────────────────────────────────────────────────
function IconBox({ iconKey, color, size = 36, dark }) {
  const renderer = Icon[iconKey];
  if (!renderer) return null;
  return (
    <div style={{
      width: size, height: size, borderRadius: Math.round(size * 0.28),
      background: color + "15", border: `1px solid ${color}25`,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      {renderer(Math.round(size * 0.44), color)}
    </div>
  );
}

// ─── THEME TOGGLE ─────────────────────────────────────────────────────────────
function ThemeToggle({ dark, toggle }) {
  const c = dark ? "#38BDF8" : "#7C3AED";
  return (
    <button onClick={toggle} aria-label="Toggle theme" style={{
      position: "relative", width: 48, height: 24, borderRadius: 12,
      background: dark ? "rgba(56,189,248,0.1)" : "rgba(124,58,237,0.08)",
      border: `1px solid ${c}40`, cursor: "pointer", padding: 0, transition: "all 0.3s", flexShrink: 0,
    }}>
      <div style={{
        position: "absolute", top: 2, left: dark ? 24 : 2, width: 18, height: 18,
        borderRadius: "50%", background: c, transition: "left 0.32s cubic-bezier(.34,1.56,.64,1)",
        display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 8px ${c}80`,
      }}>
        {dark ? Icon.sun(12) : Icon.moon(12)}
      </div>
    </button>
  );
}

// ─── AURORA BG ───────────────────────────────────────────────────────────────
function AuroraBg({ dark }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: dark
          ? "radial-gradient(ellipse at 15% 40%, #05001f 0%, #010009 55%, #000004 100%)"
          : "radial-gradient(ellipse at 15% 40%, #f0f4ff 0%, #e8eeff 55%, #dde8ff 100%)",
      }} />
      {dark && (
        <>
          <div style={{ position: "absolute", width: 900, height: 900, borderRadius: "50%", top: "-30%", left: "-20%", background: "radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 60%)", animation: "au1 16s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 1100, height: 800, borderRadius: "50%", top: "5%", right: "-30%", background: "radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 60%)", animation: "au2 20s ease-in-out infinite" }} />
        </>
      )}
    </div>
  );
}

// ─── PHOTO COMPONENT ─────────────────────────────────────────────────────────
function HeroPhoto({ dark, A, isMobile }) {
  return (
    <div style={{ position: "relative", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Outer rotating ring */}
      <div style={{
        position: "absolute",
        inset: isMobile ? -14 : -20,
        borderRadius: "50%",
        border: `1px solid ${A}25`,
        animation: "spin-slow 22s linear infinite",
      }}>
        <div style={{
          position: "absolute", top: "4%", left: "50%", transform: "translateX(-50%)",
          width: 8, height: 8, borderRadius: "50%", background: A, boxShadow: `0 0 10px ${A}`,
        }} />
      </div>
      {/* Inner ring */}
      <div style={{
        position: "absolute",
        inset: isMobile ? -30 : -44,
        borderRadius: "50%",
        border: `1px dashed ${A}12`,
        animation: "spin-slow 36s linear infinite reverse",
      }} />
      {/* Photo */}
      <div style={{
        width: isMobile ? 180 : 260,
        height: isMobile ? 180 : 260,
        borderRadius: "50%",
        overflow: "hidden",
        border: `3px solid ${dark ? "rgba(56,189,248,0.3)" : "rgba(98,68,232,0.3)"}`,
        boxShadow: `0 0 0 1px ${dark ? "rgba(56,189,248,0.1)" : "rgba(98,68,232,0.1)"}, 0 24px 64px rgba(0,0,0,0.4)`,
        position: "relative", zIndex: 1,
      }}>
        <img
          src={profileImg}
          alt="Aditya Prakash"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
        />
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [activeNav, setActiveNav] = useState("about");
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const toggle = () => setDark(d => !d);

  const T = dark ? "#dde6f0" : "#18253a";
  const TS = dark ? "#556f8a" : "#607080";
  const A = dark ? "#38BDF8" : "#6244e8";
  const A2 = dark ? "#818CF8" : "#d03a8c";
  const cardBg = dark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.85)";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(100,80,220,0.1)";
  const px = isMobile ? "20px" : "clamp(40px,6vw,100px)";

  // Track active section
  useEffect(() => {
    const sections = ["about", "skills", "experience", "projects", "education", "contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div style={{ minHeight: "100vh", color: T, fontFamily: "'DM Sans', 'Inter', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ::selection{background:${A}28;color:${A};}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:${dark ? "rgba(56,189,248,0.25)" : "rgba(98,68,232,0.25)"};border-radius:2px;}
        @keyframes au1{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(80px,-60px) scale(1.1);}}
        @keyframes au2{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-80px,60px) scale(0.9);}}
        @keyframes spin-slow{to{transform:rotate(360deg);}}
        @keyframes ping{0%{transform:scale(1);opacity:0.7;}100%{transform:scale(2.2);opacity:0;}}
        @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
        .nav-link:hover{color:${A}!important;background:${A}0d!important;}
        .btn-primary:hover{filter:brightness(1.1);transform:translateY(-1px);}
        .btn-outline:hover{border-color:${A}!important;color:${A}!important;background:${A}08!important;}
        .card-hover:hover{border-color:${A}!important;background:${A}05!important;}
        .social-btn:hover{border-color:${A}!important;color:${A}!important;}
        .pill-hover:hover{border-color:${A}55!important;color:${A}!important;background:${A}10!important;}
        .contact-row:hover{border-color:${A}!important;color:${A}!important;}
        .cert-row:hover{border-color:${A}!important;}
      `}</style>

      <ScrollProgress dark={dark} />
      <AuroraBg dark={dark} />

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, height: 62,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: `0 ${px}`,
        background: dark ? "rgba(5,0,22,0.82)" : "rgba(240,244,255,0.82)",
        backdropFilter: "blur(28px)",
        borderBottom: `1px solid ${cardBorder}`,
        position: "fixed",
      }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("about")}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: A, boxShadow: `0 0 8px ${A}`, animation: "ping 2.5s ease-out infinite" }} />
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: T, letterSpacing: "-0.01em" }}>
            Aditya Prakash
          </span>
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {NAV.map(l => (
              <button key={l} className="nav-link" onClick={() => scrollTo(l)}
                style={{
                  background: activeNav === l.toLowerCase() ? A + "0f" : "transparent",
                  border: `1px solid ${activeNav === l.toLowerCase() ? A + "22" : "transparent"}`,
                  color: activeNav === l.toLowerCase() ? A : TS,
                  padding: "5px 12px", borderRadius: 7, cursor: "pointer",
                  fontFamily: "inherit", fontSize: 13, fontWeight: 500, transition: "all 0.18s",
                }}>
                {l}
              </button>
            ))}
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6, marginLeft: 8,
                padding: "6px 14px", borderRadius: 7, fontSize: 12, fontWeight: 700,
                background: dark ? "rgba(56,189,248,0.08)" : "rgba(98,68,232,0.08)",
                border: `1px solid ${A}30`, color: A, textDecoration: "none",
                transition: "all 0.18s", fontFamily: "inherit",
              }}>
              {Icon.fileText(13, A)} Resume
            </a>
            <div style={{ marginLeft: 10 }}><ThemeToggle dark={dark} toggle={toggle} /></div>
          </div>
        )}

        {/* Mobile */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ThemeToggle dark={dark} toggle={toggle} />
            <button onClick={() => setMobileOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", color: T, padding: 4 }}>
              {mobileOpen ? Icon.x(22, T) : Icon.menu(22, T)}
            </button>
          </div>
        )}
      </nav>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 450,
          background: dark ? "rgba(5,0,22,0.97)" : "rgba(240,244,255,0.97)",
          backdropFilter: "blur(28px)", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          {NAV.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              style={{
                background: "none", border: "none", color: T, fontSize: 22,
                fontFamily: "'Syne',sans-serif", fontWeight: 700, cursor: "pointer",
                padding: "12px 32px", transition: "color 0.18s",
              }}>{l}</button>
          ))}
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            style={{
              marginTop: 12, padding: "12px 28px", borderRadius: 10,
              background: `linear-gradient(135deg,${A},${A2})`, color: "#fff",
              textDecoration: "none", fontWeight: 700, fontSize: 14,
              fontFamily: "'Syne',sans-serif",
            }}>View Resume</a>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="about" style={{
        position: "relative", zIndex: 1, minHeight: "100vh",
        display: "flex", alignItems: "center",
        padding: `80px ${px} 60px`,
      }}>
        <div style={{
          width: "100%", maxWidth: 1100, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: isMobile ? 40 : 60,
          flexDirection: isMobile ? "column-reverse" : "row",
        }}>
          {/* Left */}
          <div style={{ flex: "1 1 auto", maxWidth: isMobile ? "100%" : 580, textAlign: isMobile ? "center" : "left" }}>
            {/* Status badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24,
              padding: "5px 14px 5px 10px", borderRadius: 20,
              background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.22)",
            }}>
              <div style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#34D399" }} />
                <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "1.5px solid rgba(52,211,153,0.45)", animation: "ping 2.2s ease-out infinite" }} />
              </div>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 500, color: "#34D399", letterSpacing: "0.08em" }}>
                OPEN TO OPPORTUNITIES
              </span>
            </div>

            {/* Prompt */}
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: A, marginBottom: 12, opacity: 0.75, letterSpacing: "0.04em" }}>
              &gt;_ backend_engineer.java
            </div>

            <h1 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: isMobile ? "48px" : "clamp(48px,7vw,80px)",
              lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: 12, color: T,
            }}>
              Aditya<br />
              <span style={{ color: A, filter: dark ? `drop-shadow(0 0 28px ${A}45)` : "none" }}>Prakash</span>
            </h1>

            <div style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 600,
              fontSize: isMobile ? 16 : 20, color: TS, marginBottom: 20, letterSpacing: "-0.01em",
              display: "flex", alignItems: "center", gap: 7,
              justifyContent: isMobile ? "center" : "flex-start",
            }}>
              <span style={{ fontWeight: 300 }}>I'm a </span>
              <Typewriter words={DATA.roles} color={A} />
            </div>

            <p style={{ fontSize: isMobile ? 14 : 15, color: TS, lineHeight: 1.88, maxWidth: 500, marginBottom: 32 }}>
              {DATA.summary}
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 30, justifyContent: isMobile ? "center" : "flex-start" }}>
              <button className="btn-primary" onClick={() => scrollTo("contact")} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 24px", borderRadius: 9, fontWeight: 700, fontSize: 13,
                background: `linear-gradient(135deg,${A},${A2})`, color: "#fff",
                border: "none", cursor: "pointer", fontFamily: "inherit",
                boxShadow: `0 6px 24px ${A}35`, transition: "all 0.22s", letterSpacing: "0.02em",
              }}>
                {Icon.mail(14, "#fff")} Get in Touch
              </button>
              <button className="btn-outline" onClick={() => scrollTo("projects")} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 24px", borderRadius: 9, fontWeight: 600, fontSize: 13,
                background: "transparent", color: T, border: `1px solid ${cardBorder}`,
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.22s",
              }}>
                View Projects
              </button>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "12px 20px", borderRadius: 9, fontWeight: 700, fontSize: 13,
                background: dark ? "rgba(56,189,248,0.07)" : "rgba(98,68,232,0.07)",
                color: A, border: `1px solid ${A}30`, textDecoration: "none",
                transition: "all 0.22s",
              }}>
                {Icon.fileText(14, A)} Resume
              </a>
            </div>

            {/* Socials */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: isMobile ? "center" : "flex-start" }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: TS, letterSpacing: "0.14em" }}>CONNECT</span>
              <div style={{ width: 20, height: 1, background: cardBorder }} />
              {[
                { href: `https://github.com/${DATA.contact.github}`, icon: Icon.github(17, TS), label: "GitHub" },
                { href: `https://linkedin.com/in/${DATA.contact.linkedin}`, icon: Icon.linkedin(17, TS), label: "LinkedIn" },
                { href: DATA.contact.portfolio, icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={TS} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, label: "Portfolio" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label={s.label}
                  style={{
                    width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                    background: cardBg, border: `1px solid ${cardBorder}`, color: TS, textDecoration: "none", transition: "all 0.18s",
                  }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div style={{ flexShrink: 0, animation: "float 5.5s ease-in-out infinite" }}>
            <HeroPhoto dark={dark} A={A} isMobile={isMobile} />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ position: "relative", zIndex: 1, padding: `0 ${px}`, maxWidth: 1100 + 200, margin: "0 auto" }}>
        <Reveal>
          <div style={{
            display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
            background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 18,
            overflow: "hidden", backdropFilter: "blur(24px)",
          }}>
            {DATA.stats.map((s, i) => (
              <div key={i} style={{
                padding: isMobile ? "22px 12px" : "32px 20px", textAlign: "center",
                borderRight: isMobile ? (i % 2 === 0 ? `1px solid ${cardBorder}` : "none") : (i < 3 ? `1px solid ${cardBorder}` : "none"),
                borderBottom: isMobile && i < 2 ? `1px solid ${cardBorder}` : "none",
              }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                  <IconBox iconKey={s.icon} color={A} size={isMobile ? 30 : 36} dark={dark} />
                </div>
                <div style={{ fontSize: isMobile ? 26 : 34, fontWeight: 800, fontFamily: "'Syne',sans-serif", color: A, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 6 }}>
                  <Counter display={s.display} />
                </div>
                <div style={{ fontSize: 11, color: TS, fontWeight: 500, letterSpacing: "0.01em", lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ position: "relative", zIndex: 1, padding: `0 ${px}`, maxWidth: 1300, margin: "0 auto" }}>

        {/* SKILLS */}
        <section id="skills" style={{ padding: "90px 0 60px" }}>
          <Reveal><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: A, letterSpacing: "0.2em", marginBottom: 10, opacity: 0.8 }}>TECHNICAL SKILLS</div></Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 28 : "clamp(30px,4vw,46px)", letterSpacing: "-0.02em", color: T, marginBottom: 44, lineHeight: 1.05 }}>
              Technical <span style={{ color: A }}>Arsenal</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(280px,1fr))", gap: 14 }}>
            {DATA.skills.map((sk, i) => (
              <Reveal key={sk.cat} delay={i * 0.05}>
                <div className="card-hover" style={{
                  background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 14,
                  padding: "22px 24px", backdropFilter: "blur(20px)", transition: "all 0.2s", height: "100%",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <IconBox iconKey={sk.icon} color={sk.color} size={32} dark={dark} />
                    <div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, color: T }}>{sk.cat}</div>
                      <div style={{ width: 20, height: 2, borderRadius: 1, background: sk.color, marginTop: 4, opacity: 0.7 }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {sk.items.map(it => <Pill key={it} label={it} color={sk.color} dark={dark} />)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" style={{ padding: "0 0 60px" }}>
          <Reveal><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: A, letterSpacing: "0.2em", marginBottom: 10, opacity: 0.8 }}>WORK HISTORY</div></Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 28 : "clamp(30px,4vw,46px)", letterSpacing: "-0.02em", color: T, marginBottom: 36, lineHeight: 1.05 }}>
              Professional <span style={{ color: A }}>Experience</span>
            </h2>
          </Reveal>
          {DATA.experience.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.08}>
              <div className="card-hover" style={{
                background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16,
                padding: isMobile ? "22px 20px" : "32px 36px", backdropFilter: "blur(20px)", transition: "all 0.2s",
              }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <IconBox iconKey="briefcase" color={exp.color} size={isMobile ? 36 : 42} dark={dark} />
                    <div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 16 : 19, color: T, marginBottom: 3 }}>{exp.role}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: exp.color }}>{exp.company} · {exp.location}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "flex-start" : "flex-end", gap: 6 }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: TS,
                      padding: "3px 10px", borderRadius: 5, background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", border: `1px solid ${cardBorder}`,
                    }}>{exp.period}</span>
                    {exp.current && (
                      <span style={{
                        fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: "#34D399",
                        padding: "2px 8px", borderRadius: 5, background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.22)", letterSpacing: "0.06em",
                      }}>CURRENT</span>
                    )}
                  </div>
                </div>
                <div style={{ height: 1, background: cardBorder, marginBottom: 18 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {exp.bullets.map((b, bi) => (
                    <div key={bi} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: exp.color, marginTop: 9, flexShrink: 0 }} />
                      <p style={{ fontSize: isMobile ? 13 : 14, color: TS, lineHeight: 1.78 }}>
                        {b.text}<strong style={{ color: T, fontWeight: 600 }}>{b.bold}</strong>{b.rest}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        {/* PROJECTS */}
        <section id="projects" style={{ padding: "0 0 60px" }}>
          <Reveal><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: A, letterSpacing: "0.2em", marginBottom: 10, opacity: 0.8 }}>FEATURED WORK</div></Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 28 : "clamp(30px,4vw,46px)", letterSpacing: "-0.02em", color: T, marginBottom: 36, lineHeight: 1.05 }}>
              Key <span style={{ color: A }}>Projects</span>
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {DATA.projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div className="card-hover" style={{
                  background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16,
                  overflow: "hidden", display: "flex", backdropFilter: "blur(20px)", transition: "all 0.2s",
                }}>
                  <div style={{ width: 4, flexShrink: 0, background: `linear-gradient(180deg,${p.color},${p.color}88)` }} />
                  <div style={{ padding: isMobile ? "20px 18px" : "26px 30px", flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, marginBottom: 10, flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 16 : 18, color: T, marginBottom: 8 }}>{p.name}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {p.tags.map(t => <Pill key={t} label={t} color={p.color} dark={dark} />)}
                        </div>
                      </div>
                      <span style={{
                        fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 600,
                        padding: "5px 12px", borderRadius: 6, whiteSpace: "nowrap",
                        color: p.color, background: p.color + "12", border: `1px solid ${p.color}25`,
                      }}>{p.metric}</span>
                    </div>
                    <p style={{ fontSize: isMobile ? 13 : 14, color: TS, lineHeight: 1.8, marginTop: 8 }}>{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" style={{ padding: "0 0 60px" }}>
          <Reveal><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: A, letterSpacing: "0.2em", marginBottom: 10, opacity: 0.8 }}>ACADEMIC BACKGROUND</div></Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 28 : "clamp(30px,4vw,46px)", letterSpacing: "-0.02em", color: T, marginBottom: 36, lineHeight: 1.05 }}>
              Education & <span style={{ color: A }}>Certifications</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
            {/* Education card */}
            <div>
              <Reveal>
                <div className="card-hover" style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16, padding: isMobile ? "24px 22px" : "30px", backdropFilter: "blur(20px)", transition: "all 0.2s", marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <IconBox iconKey="graduation" color={A} size={isMobile ? 38 : 44} dark={dark} />
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: TS }}>{DATA.education.period}</span>
                  </div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 14 : 16, color: T, marginBottom: 4, lineHeight: 1.3 }}>{DATA.education.school}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: A, marginBottom: 3 }}>{DATA.education.degree}</div>
                  <div style={{ fontSize: 12.5, color: TS, marginBottom: 18 }}>{DATA.education.field} · {DATA.education.location}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 10, background: A + "08", border: `1px solid ${A}14`, marginBottom: 18 }}>
                    <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 28, color: A, letterSpacing: "-0.02em" }}>{DATA.education.gpa}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: T }}>GPA Score</div>
                      <div style={{ fontSize: 11, color: TS }}>out of 10.0</div>
                    </div>
                    <span style={{
                      marginLeft: "auto", padding: "3px 9px", borderRadius: 5,
                      fontSize: 10, fontWeight: 700, color: "#34D399",
                      background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.22)",
                      fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.04em",
                    }}>TOP GRADE</span>
                  </div>
                  <a href={DATA.education.certLink} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: A, textDecoration: "none", padding: "7px 12px", borderRadius: 7, background: A + "0d", border: `1px solid ${A}20`, transition: "all 0.18s" }}>
                    {Icon.externalLink(12, A)} View Certificate
                  </a>
                </div>
              </Reveal>
              {/* Achievements */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {DATA.achievements.map((a, i) => (
                  <Reveal key={i} delay={i * 0.07}>
                    <div className="card-hover" style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 12, padding: "14px 18px", backdropFilter: "blur(20px)", transition: "all 0.2s", display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.color, marginTop: 7, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: a.color, marginBottom: 2 }}>{a.text}</div>
                        <div style={{ fontSize: 12, color: TS }}>{a.sub}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {DATA.certifications.map((c, i) => (
                <Reveal key={c.name} delay={i * 0.08}>
                  <a href={c.link} target="_blank" rel="noopener noreferrer" className="cert-row"
                    style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", borderRadius: 14, background: cardBg, border: `1px solid ${cardBorder}`, backdropFilter: "blur(20px)", textDecoration: "none", transition: "all 0.2s" }}>
                    <IconBox iconKey={c.icon} color={c.color} size={38} dark={dark} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: T, marginBottom: 3 }}>{c.name}</div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: c.color }}>{c.issuer}</div>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: A, opacity: 0.7, letterSpacing: "0.06em" }}>VIEW ↗</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: "0 0 100px" }}>
          <Reveal><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: A, letterSpacing: "0.2em", marginBottom: 10, opacity: 0.8 }}>GET IN TOUCH</div></Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 28 : "clamp(30px,4vw,46px)", letterSpacing: "-0.02em", color: T, marginBottom: 36, lineHeight: 1.05 }}>
              Let's <span style={{ color: A }}>Connect</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
            {/* Left card */}
            <Reveal>
              <div className="card-hover" style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16, padding: isMobile ? "26px 22px" : "36px", backdropFilter: "blur(20px)", transition: "all 0.2s", height: "100%" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: A, letterSpacing: "0.15em", marginBottom: 12 }}>OPEN TO ROLES</div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 18 : 22, color: T, marginBottom: 12, lineHeight: 1.2 }}>Looking for New Opportunities</h3>
                <p style={{ fontSize: 14, color: TS, lineHeight: 1.85, marginBottom: 26 }}>
                  Backend Software Engineer with nearly 2 years of production experience in Java & Spring Boot. Open to full-time roles, contract work, and technical collaborations.
                </p>
                <a href={`mailto:${DATA.contact.email}?subject=Opportunity%20for%20Aditya%20Prakash`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "12px 22px", borderRadius: 9, fontWeight: 700, fontSize: 13,
                    background: `linear-gradient(135deg,${A},${A2})`, color: "#fff",
                    textDecoration: "none", boxShadow: `0 6px 24px ${A}30`,
                    transition: "all 0.22s",
                  }}>
                  {Icon.mail(14, "#fff")} Send a Message {Icon.arrowRight(13, "#fff")}
                </a>
              </div>
            </Reveal>

            {/* Right card */}
            <Reveal delay={0.1}>
              <div className="card-hover" style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16, padding: isMobile ? "26px 22px" : "36px", backdropFilter: "blur(20px)", transition: "all 0.2s", height: "100%" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: A, letterSpacing: "0.15em", marginBottom: 20 }}>DIRECT LINKS</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {[
                    { icon: Icon.mail(15, TS), text: DATA.contact.email, href: `mailto:${DATA.contact.email}` },
                    { icon: Icon.phone(15, TS), text: DATA.contact.phone, href: `tel:${DATA.contact.phone}` },
                    { icon: Icon.linkedin(15, TS), text: `linkedin.com/in/${DATA.contact.linkedin}`, href: `https://linkedin.com/in/${DATA.contact.linkedin}` },
                    { icon: Icon.github(15, TS), text: `github.com/${DATA.contact.github}`, href: `https://github.com/${DATA.contact.github}` },
                    { icon: Icon.fileText(15, TS), text: "View / Download Resume", href: RESUME_URL },
                  ].map((c, i) => (
                    <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="contact-row"
                      style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "11px 14px", borderRadius: 9, textDecoration: "none",
                        background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                        border: `1px solid ${cardBorder}`, color: TS, fontSize: 13, fontWeight: 500,
                        transition: "all 0.18s", wordBreak: "break-all",
                      }}>
                      <span style={{ flexShrink: 0 }}>{c.icon}</span>{c.text}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{
        position: "relative", zIndex: 1,
        borderTop: `1px solid ${cardBorder}`,
        padding: `24px ${px}`,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: TS }}>
          Aditya Prakash · Backend Software Engineer
        </div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)", letterSpacing: "0.06em" }}>
          HAJIPUR, BIHAR, INDIA · © 2026
        </div>
      </footer>
    </div>
  );
}