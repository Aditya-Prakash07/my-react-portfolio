import { useState, useEffect, useRef } from "react";

// ─── SVG ICON LIBRARY ────────────────────────────────────────────────────────
const Icon = {
  zap: (s = 18, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  rocket: (s = 18, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  trending: (s = 18, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  settings: (s = 18, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  ),
  link: (s = 18, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  layers: (s = 18, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  database: (s = 18, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  cloud: (s = 18, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  shield: (s = 18, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  activity: (s = 18, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  mail: (s = 16, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  phone: (s = 16, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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
  arrowRight: (s = 14, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  externalLink: (s = 13, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  download: (s = 15, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  sun: (s = 14) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  ),
  moon: (s = 14) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  check: (s = 12, c = "#10B981") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  award: (s = 18, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  code: (s = 18, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  briefcase: (s = 18, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  graduation: (s = 18, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  cpu: (s = 18, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  messageSquare: (s = 18, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  mapPin: (s = 14, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  fileText: (s = 16, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  x: (s = 14, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  menu: (s = 22, c = "currentColor") => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
};

const RESUME_URL =
  "https://drive.google.com/file/d/1TAYYm0UEs-mXcZ8ATtbT6v5keA_C578_/view?usp=sharing";

const DATA = {
  name: "Aditya Prakash",
  roles: [
    "Software Engineer",
    "Backend Architect",
    "API Specialist",
    "Microservices Dev",
    "Cloud Engineer",
  ],
  summary:
    "Specialized in RESTful API design, microservices, and CI/CD automation. Shipped production systems handling 1M+ daily events at sub-100ms response times.",
  contact: {
    phone: "+91 9529338081",
    email: "toadityarajput@gmail.com",
    linkedin: "aditya-prakash-996538170",
    github: "Aditya-Prakash07",
  },
  stats: [
    {
      value: 1000000,
      prefix: "",
      suffix: "+",
      label: "Daily Events Handled",
      svgIcon: "zap",
    },
    {
      value: 100,
      prefix: "<",
      suffix: "ms",
      label: "API Response Time",
      svgIcon: "rocket",
    },
    {
      value: 35,
      prefix: "",
      suffix: "%",
      label: "Query Performance Gain",
      svgIcon: "trending",
    },
    {
      value: 40,
      prefix: "",
      suffix: "%",
      label: "Faster Deployments",
      svgIcon: "settings",
    },
  ],
  skills: [
    {
      cat: "Languages",
      color: "#00D4FF",
      svgIcon: "code",
      items: ["Java", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
    },
    {
      cat: "Frameworks",
      color: "#7C3AED",
      svgIcon: "layers",
      items: [
        "Spring Boot",
        "Spring MVC",
        "Spring Data JPA",
        "Hibernate",
        "React.js",
        "Node.js",
      ],
    },
    {
      cat: "Databases",
      color: "#10B981",
      svgIcon: "database",
      items: ["MySQL", "PostgreSQL", "SQL Server", "Redis"],
    },
    {
      cat: "Messaging & APIs",
      color: "#F59E0B",
      svgIcon: "activity",
      items: ["Apache Kafka", "WebSocket", "REST APIs", "JWT"],
    },
    {
      cat: "Cloud & DevOps",
      color: "#EF4444",
      svgIcon: "cloud",
      items: [
        "Azure",
        "AWS (EC2, S3)",
        "Docker",
        "Kubernetes",
        "GitHub Actions",
        "Jenkins",
      ],
    },
    {
      cat: "Architecture",
      color: "#EC4899",
      svgIcon: "cpu",
      items: [
        "Microservices",
        "Event-Driven",
        "SOLID",
        "Design Patterns",
        "CI/CD",
        "TDD",
      ],
    },
  ],
  experience: [
    {
      company: "System Infra Solutions",
      role: "Software Engineer",
      period: "Jul 2024 – Present",
      current: true,
      color: "#00D4FF",
      bullets: [
        "APIs & frontend for sensor telemetry monitoring across 10+ sites — 99.9% uptime, sub-100ms response.",
        "Microservices for 5+ independently deployable components — cut inter-service coupling 60%.",
        "CI/CD via Azure DevOps — release cycle 40% faster, zero manual deployment errors.",
        "95% on-time delivery over 12+ consecutive Agile sprints.",
      ],
    },
    {
      company: "Nanomindz Technologies",
      role: "Software Engineer Intern",
      period: "Mar 2024 – Jun 2024",
      current: false,
      color: "#7C3AED",
      bullets: [
        "Java backend with JDBC + MySQL — 10,000+ daily record ops, zero data-loss.",
        "JWT auth + RBAC — zero unauthorized-access breaches post-launch.",
        "Tuned 20+ SQL queries — 35% drop in p95 execution time under peak load.",
        "15+ RESTful endpoints — cross-team defects down 50%, UI release 2 weeks faster.",
      ],
    },
  ],
  projects: [
    {
      name: "iProtect",
      num: "01",
      color: "#00D4FF",
      accent: "#0099CC",
      tags: ["Spring Boot", "WebSocket", "React", "Kafka"],
      desc: "Real-time site monitoring & alarm platform for 50+ locations. Cut alert-to-action time by 45% via event-driven backend + WebSocket-powered React frontend.",
      metric: "45% faster alerts",
    },
    {
      name: "SISAXS",
      num: "02",
      color: "#7C3AED",
      accent: "#5B21B6",
      tags: ["IoT", "Kafka", "Spring Boot", "Azure"],
      desc: "Fault-tolerant IoT system ingesting 1M+ telemetry events daily. Automatic failover kept uptime above 99.8%. Trimmed end-to-end processing overhead by 30%.",
      metric: "1M+ events/day",
    },
    {
      name: "E-Commerce App",
      num: "03",
      color: "#10B981",
      accent: "#059669",
      tags: ["Spring Boot", "React", "Redis", "JWT"],
      desc: "Full-stack store for 500+ concurrent shoppers. Redis caching + JPA optimizations dropped API p99 response time by 25%. Zero security incidents post-launch.",
      metric: "500+ concurrent users",
    },
  ],
  education: {
    school: "SRM Institute of Science and Technology",
    degree: "Master of Computer Applications",
    field: "Computer Science",
    period: "2023 – 2025",
    gpa: "9.35",
    location: "Chennai, India",
    link: "https://drive.google.com/file/d/1Iw53IgAZ0OaO3nUz9-h3Q7AxjIb5xdDA/view?usp=sharing",
  },
  certifications: [
    {
      name: "Full Stack Java Developer",
      issuer: "AccioJob",
      svgIcon: "code",
      link: "https://drive.google.com/file/d/17gc4Y3a4Wy2mx9EDOac25NqpWOL0fVEX/view?usp=sharing",
      color: "#F59E0B",
    },
    {
      name: "Claude AI Certification",
      issuer: "Anthropic",
      svgIcon: "cpu",
      link: "https://drive.google.com/file/d/1adxuf1-cG0edtpWuq-ipwNsZ2-8Ah8CB/view?usp=sharing",
      color: "#7C3AED",
    },
  ],
  achievements: [
    {
      text: "1,100+ coding challenges on AccioJob",
      highlight: "Top 5% globally",
      svgIcon: "award",
    },
    {
      text: "100+ LeetCode problems solved",
      highlight: "Graphs · Trees · DP",
      svgIcon: "code",
    },
    {
      text: "API Performance Award nominee",
      highlight: "+20% throughput",
      svgIcon: "trending",
    },
  ],
  freelance: {
    tagline: "Open to freelance, full-time roles & collaborations.",
    pitch:
      "Whether you are a company looking to hire, or need a backend engineer for a project — I am available. I build APIs, microservices, and cloud infrastructure that are production-ready and built to last.",
    services: [
      {
        svgIcon: "link",
        title: "REST API Development",
        color: "#00D4FF",
        desc: "Robust, documented APIs powering your web and mobile products. JWT auth, role-based access, OpenAPI specs included.",
      },
      {
        svgIcon: "layers",
        title: "Microservices Architecture",
        color: "#7C3AED",
        desc: "Independently deployable services with event-driven design, Kafka messaging, and clean service boundaries.",
      },
      {
        svgIcon: "database",
        title: "Database Design & Tuning",
        color: "#10B981",
        desc: "Schema design, query optimization, Redis caching layers. Proven 35%+ performance gains on production workloads.",
      },
      {
        svgIcon: "cloud",
        title: "Cloud & DevOps",
        color: "#F59E0B",
        desc: "CI/CD pipelines, Docker, Kubernetes, AWS/Azure deployments. Ship faster with zero manual errors.",
      },
      {
        svgIcon: "shield",
        title: "Security & Auth",
        color: "#EF4444",
        desc: "JWT, OAuth2, RBAC, HTTPS best practices. Zero security incidents across all production systems I have shipped.",
      },
      {
        svgIcon: "activity",
        title: "Real-time & IoT Systems",
        color: "#EC4899",
        desc: "WebSocket dashboards, event-driven pipelines, IoT ingestion at 1M+ events/day with 99.8%+ uptime.",
      },
    ],
    whyMe: [
      { stat: "2+", label: "Years in Production" },
      { stat: "99.9%", label: "Uptime Delivered" },
      { stat: "< 1 wk", label: "Kickoff Timeline" },
      { stat: "∞", label: "Post-launch Support" },
    ],
    process: [
      {
        step: "01",
        title: "Reach Out",
        desc: "Email or LinkedIn — tell me what you are building or hiring for.",
      },
      {
        step: "02",
        title: "Quick Sync",
        desc: "Brief call to align on scope, timeline, and expectations.",
      },
      {
        step: "03",
        title: "Build & Iterate",
        desc: "Agile sprints with regular updates and production-quality code.",
      },
      {
        step: "04",
        title: "Ship & Hand Off",
        desc: "Production deploy, documentation, and clean knowledge transfer.",
      },
    ],
  },
};

const NAV = [
  "About",
  "Skills",
  "Experience",
  "Projects",
  "Freelance",
  "Education",
  "Contact",
];

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
  const A = dark ? "#00D4FF" : "#6244e8",
    A2 = dark ? "#7C3AED" : "#d03a8c";
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 9999,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: `linear-gradient(90deg,${A},${A2})`,
          transition: "width 0.1s linear",
          boxShadow: `0 0 8px ${A}80`,
        }}
      />
    </div>
  );
}

// ─── AURORA BG ───────────────────────────────────────────────────────────────
function AuroraBg({ dark }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: dark
            ? "radial-gradient(ellipse at 15% 40%, #05001f 0%, #010009 55%, #000004 100%)"
            : "radial-gradient(ellipse at 15% 40%, #f0f4ff 0%, #e8eeff 55%, #dde8ff 100%)",
        }}
      />
      {dark && (
        <>
          <div
            style={{
              position: "absolute",
              width: 900,
              height: 900,
              borderRadius: "50%",
              top: "-30%",
              left: "-20%",
              background:
                "radial-gradient(circle, rgba(0,212,255,0.055) 0%, transparent 60%)",
              animation: "au1 16s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 1100,
              height: 800,
              borderRadius: "50%",
              top: "5%",
              right: "-30%",
              background:
                "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 60%)",
              animation: "au2 20s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 800,
              height: 800,
              borderRadius: "50%",
              bottom: "-20%",
              left: "20%",
              background:
                "radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 60%)",
              animation: "au3 13s ease-in-out infinite",
            }}
          />
        </>
      )}
      {!dark && (
        <>
          <div
            style={{
              position: "absolute",
              width: 900,
              height: 900,
              borderRadius: "50%",
              top: "-30%",
              left: "-20%",
              background:
                "radial-gradient(circle, rgba(99,179,237,0.14) 0%, transparent 60%)",
              animation: "au1 16s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 1100,
              height: 800,
              borderRadius: "50%",
              top: "5%",
              right: "-30%",
              background:
                "radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 60%)",
              animation: "au2 20s ease-in-out infinite",
            }}
          />
        </>
      )}
    </div>
  );
}

// ─── PARTICLE FIELD (disabled on mobile for perf) ────────────────────────────
function ParticleField({ dark, isMobile }) {
  const ref = useRef(null),
    mouse = useRef({ x: -999, y: -999 });
  useEffect(() => {
    if (isMobile) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let id, w, h;
    const N = 60,
      pts = [];
    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    for (let i = 0; i < N; i++)
      pts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.2 + 0.4,
      });
    const onM = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    window.addEventListener("mousemove", onM);
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const { x: mx, y: my } = mouse.current;
      for (let i = 0; i < N; i++) {
        const p = pts[i];
        const dx = mx - p.x,
          dy = my - p.y,
          d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          p.vx -= (dx / d) * 0.15;
          p.vy -= (dy / d) * 0.15;
        }
        p.vx *= 0.988;
        p.vy *= 0.988;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dark ? "rgba(0,212,255,0.6)" : "rgba(124,58,237,0.5)";
        ctx.fill();
        for (let j = i + 1; j < N; j++) {
          const q = pts[j],
            ex = p.x - q.x,
            ey = p.y - q.y,
            dist = Math.sqrt(ex * ex + ey * ey);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = dark
              ? `rgba(0,212,255,${(1 - dist / 100) * 0.22})`
              : `rgba(124,58,237,${(1 - dist / 100) * 0.18})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", onM);
      window.removeEventListener("resize", resize);
    };
  }, [dark, isMobile]);
  if (isMobile) return null;
  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "all",
      }}
    />
  );
}

// ─── TYPEWRITER ───────────────────────────────────────────────────────────────
function Typewriter({ words, color }) {
  const [idx, setIdx] = useState(0),
    [txt, setTxt] = useState(""),
    [del, setDel] = useState(false),
    [blink, setBlink] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const word = words[idx];
    let t;
    if (!del && txt === word) t = setTimeout(() => setDel(true), 2400);
    else if (del && txt === "") {
      setDel(false);
      setIdx((i) => (i + 1) % words.length);
    } else
      t = setTimeout(
        () => setTxt(del ? txt.slice(0, -1) : word.slice(0, txt.length + 1)),
        del ? 32 : 72,
      );
    return () => clearTimeout(t);
  }, [txt, del, idx, words]);
  return (
    <span style={{ color }}>
      {txt}
      <span style={{ opacity: blink ? 1 : 0, color, fontWeight: 200 }}>|</span>
    </span>
  );
}

// ─── COUNTER ──────────────────────────────────────────────────────────────────
function Counter({ value, prefix = "", suffix = "" }) {
  const [n, setN] = useState(0),
    ref = useRef(null),
    done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const steps = 60,
            dur = 1800;
          let s = 0;
          const t = setInterval(() => {
            s++;
            setN(Math.round(value * (1 - Math.pow(1 - s / steps, 3))));
            if (s >= steps) {
              setN(value);
              clearInterval(t);
            }
          }, dur / steps);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  const d =
    value >= 1000000
      ? prefix +
        (n >= 1000000
          ? Math.floor(n / 1000000) + "M"
          : Math.floor(n / 1000) + "K") +
        suffix
      : prefix + n + suffix;
  return <span ref={ref}>{d}</span>;
}

// ─── TILT CARD ────────────────────────────────────────────────────────────────
function TiltCard({ children, dark, style, glow = "#00D4FF", isMobile }) {
  const ref = useRef(null);
  const onMove = (e) => {
    if (isMobile) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
    el.style.boxShadow = `${x * -20}px ${y * -20}px 48px ${glow}14, 0 0 28px ${glow}08`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateY(0) rotateX(0) scale(1)";
    el.style.boxShadow = "none";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        background: dark ? "rgba(255,255,255,0.022)" : "rgba(255,255,255,0.85)",
        border: dark
          ? "1px solid rgba(255,255,255,0.065)"
          : "1px solid rgba(100,80,220,0.1)",
        borderRadius: 18,
        backdropFilter: "blur(28px)",
        transition: "transform 0.12s ease, box-shadow 0.12s ease",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── REVEAL ───────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setV(true);
      },
      { threshold: 0.06 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(44px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}

// ─── PILL ────────────────────────────────────────────────────────────────────
function Pill({ label, color, dark }) {
  const [h, setH] = useState(false);
  return (
    <span
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 600,
        fontFamily: "'JetBrains Mono',monospace",
        letterSpacing: "0.02em",
        background: h
          ? color + "22"
          : dark
            ? "rgba(255,255,255,0.04)"
            : "rgba(0,0,0,0.04)",
        border: `1px solid ${h ? color + "60" : dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        color: h ? color : dark ? "#7c8fa6" : "#556070",
        transition: "all 0.16s ease",
        cursor: "default",
        boxShadow: h ? `0 0 12px ${color}25` : "none",
      }}
    >
      {label}
    </span>
  );
}

// ─── THEME TOGGLE ─────────────────────────────────────────────────────────────
function ThemeToggle({ dark, toggle }) {
  const c = dark ? "#00D4FF" : "#7C3AED";
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        position: "relative",
        width: 48,
        height: 24,
        borderRadius: 12,
        background: dark ? "rgba(0,212,255,0.1)" : "rgba(124,58,237,0.08)",
        border: `1px solid ${c}40`,
        cursor: "pointer",
        padding: 0,
        transition: "all 0.3s",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: dark ? 24 : 2,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: c,
          transition: "left 0.32s cubic-bezier(.34,1.56,.64,1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 8px ${c}80`,
        }}
      >
        {dark ? Icon.sun(12) : Icon.moon(12)}
      </div>
    </button>
  );
}

// ─── SECTION HEAD ─────────────────────────────────────────────────────────────
function SectionHead({ num, title, accent, dark, isMobile }) {
  return (
    <div style={{ marginBottom: isMobile ? 36 : 56 }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 14,
        }}
      >
        <div
          style={{ width: 20, height: 1, background: accent, opacity: 0.6 }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 10,
            color: accent,
            letterSpacing: "0.2em",
            opacity: 0.85,
          }}
        >
          {num}
        </span>
      </div>
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          fontSize: isMobile ? "28px" : "clamp(32px,4.2vw,56px)",
          color: dark ? "#dde6f0" : "#18253a",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
        }}
      >
        {title[0]} <span style={{ color: accent }}>{title[1]}</span>
      </h2>
    </div>
  );
}

// ─── ICON BOX ─────────────────────────────────────────────────────────────────
function IconBox({ iconKey, color, size = 40, dark }) {
  const renderer = Icon[iconKey];
  if (!renderer) return null;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.3),
        background: color + "15",
        border: `1px solid ${color}28`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {renderer(Math.round(size * 0.46), color)}
    </div>
  );
}

// ─── RESUME TOAST ─────────────────────────────────────────────────────────────
function ResumeToast({ dark, show, onClose }) {
  const A = dark ? "#00D4FF" : "#6244e8";

  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 3500);
      return () => clearTimeout(t);
    }
    // Added onClose here
  }, [show, onClose]); 

  return (
    <div
      style={{
        position: "fixed",
        bottom: 90,
        right: 16,
        zIndex: 8000,
        transform: show ? "translateY(0)" : "translateY(120%)",
        opacity: show ? 1 : 0,
        transition: "all 0.4s cubic-bezier(.34,1.56,.64,1)",
        pointerEvents: show ? "auto" : "none",
        maxWidth: "calc(100vw - 32px)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          borderRadius: 12,
          background: dark ? "rgba(5,0,22,0.92)" : "rgba(255,255,255,0.95)",
          border: `1px solid ${A}30`,
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {Icon.check(14, "#10B981")}
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: dark ? "#dde6f0" : "#18253a",
          }}
        >
          Resume opened in new tab
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 2,
            color: dark ? "#556f8a" : "#607080",
            marginLeft: 4,
          }}
        >
          {Icon.x(12, "currentColor")}
        </button>
      </div>
    </div>
  );
}

// ─── FLOATING RESUME ─────────────────────────────────────────────────────────
function FloatingResume({ dark, onOpen }) {
  const A = dark ? "#00D4FF" : "#6244e8",
    A2 = dark ? "#7C3AED" : "#d03a8c";
  const [hov, setHov] = useState(false),
    [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 16,
        zIndex: 7000,
        transform: scrolled
          ? "translateY(0) scale(1)"
          : "translateY(80px) scale(0.8)",
        opacity: scrolled ? 1 : 0,
        transition: "all 0.4s cubic-bezier(.34,1.56,.64,1)",
      }}
    >
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onOpen}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: hov ? 9 : 0,
          padding: hov ? "12px 18px" : "12px",
          borderRadius: 50,
          background: `linear-gradient(135deg,${A},${A2})`,
          color: "#fff",
          textDecoration: "none",
          boxShadow: `0 6px 28px ${A}50`,
          transition: "all 0.3s cubic-bezier(.34,1.56,.64,1)",
          overflow: "hidden",
          whiteSpace: "nowrap",
          maxWidth: hov ? 200 : 42,
        }}
      >
        {Icon.download(16, "#fff")}
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            opacity: hov ? 1 : 0,
            maxWidth: hov ? 120 : 0,
            transition: "all 0.25s ease",
            overflow: "hidden",
          }}
        >
          My Resume
        </span>
      </a>
    </div>
  );
}

// ─── HAMBURGER MENU ───────────────────────────────────────────────────────────
function MobileMenu({
  dark,
  A,
  A2,
  T,
  TS,
  activeNav,
  scrollTo,
  toggle,
  onResumeClick,
}) {
  const [open, setOpen] = useState(false);
  const cardBg = dark ? "rgba(5,0,22,0.97)" : "rgba(240,244,255,0.97)";
  const cardBorder = dark ? "rgba(0,212,255,0.1)" : "rgba(98,68,232,0.12)";

  const handleNav = (item) => {
    scrollTo(item);
    setOpen(false);
  };

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 6,
          color: T,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          transition: "background 0.2s",
        }}
      >
        {open ? Icon.x(22, T) : Icon.menu(22, T)}
      </button>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 400,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 450,
          width: "min(320px, 85vw)",
          background: cardBg,
          backdropFilter: "blur(40px)",
          borderLeft: `1px solid ${cardBorder}`,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(.22,1,.36,1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Drawer header */}
        <div
          style={{
            padding: "20px 24px 16px",
            borderBottom: `1px solid ${cardBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
                background: `linear-gradient(135deg,${A},${A2})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 800,
                  fontSize: 11,
                  color: "#fff",
                }}
              >
                AP
              </span>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: T,
                }}
              >
                Aditya Prakash
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 8,
                  color: TS,
                  letterSpacing: "0.1em",
                }}
              >
                SOFTWARE ENGINEER
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ThemeToggle dark={dark} toggle={toggle} />
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: TS,
                padding: 4,
              }}
            >
              {Icon.x(18, TS)}
            </button>
          </div>
        </div>

        {/* Nav links */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
          {NAV.map((item) => {
            const isActive = activeNav === item;
            const isHire = item === "Freelance";
            return (
              <button
                key={item}
                onClick={() => handleNav(item)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 16px",
                  marginBottom: 4,
                  borderRadius: 12,
                  background: isHire
                    ? `linear-gradient(135deg,${A}20,${A2}15)`
                    : isActive
                      ? A + "12"
                      : "transparent",
                  border: isHire
                    ? `1px solid ${A}35`
                    : isActive
                      ? `1px solid ${A}22`
                      : "1px solid transparent",
                  color: isHire ? A : isActive ? A : T,
                  fontSize: 14,
                  fontWeight: isHire ? 700 : isActive ? 600 : 500,
                  fontFamily: "'Space Grotesk',sans-serif",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.18s",
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: isActive || isHire ? A : TS + "60",
                    flexShrink: 0,
                  }}
                />
                {isHire ? "Available for Work" : item}
                {isActive && (
                  <div
                    style={{
                      marginLeft: "auto",
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: A,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Resume button in drawer */}
        <div
          style={{ padding: "16px 20px", borderTop: `1px solid ${cardBorder}` }}
        >
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              onResumeClick();
              setOpen(false);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "13px 20px",
              borderRadius: 12,
              background: `linear-gradient(135deg,${A},${A2})`,
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 14,
              fontFamily: "'Space Grotesk',sans-serif",
              boxShadow: `0 4px 20px ${A}40`,
            }}
          >
            {Icon.fileText(15, "#fff")} View Resume
          </a>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              marginTop: 16,
            }}
          >
            <a
              href={`https://github.com/${DATA.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: TS, textDecoration: "none" }}
            >
              {Icon.github(20, TS)}
            </a>
            <a
              href={`https://linkedin.com/in/${DATA.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: TS, textDecoration: "none" }}
            >
              {Icon.linkedin(20, TS)}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── PROCESS CARD (with ghost number hover highlight) ────────────────────────
function ProcessCard({ dark, glow, A, A2, isMobile, step, T, TS }) {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const onMove = (e) => {
    if (isMobile) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
    el.style.boxShadow = `${x * -20}px ${y * -20}px 48px ${glow}14, 0 0 28px ${glow}08`;
  };
  const onLeave = () => {
    setHov(false);
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateY(0) rotateX(0) scale(1)";
    el.style.boxShadow = "none";
  };
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      style={{
        padding: isMobile ? "20px 16px" : "26px 22px",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background: dark ? "rgba(255,255,255,0.022)" : "rgba(255,255,255,0.85)",
        border: dark
          ? "1px solid rgba(255,255,255,0.065)"
          : "1px solid rgba(100,80,220,0.1)",
        borderRadius: 18,
        backdropFilter: "blur(28px)",
        transition: "transform 0.12s ease, box-shadow 0.12s ease",
        willChange: "transform",
      }}
    >
      {/* Ghost number — highlights on hover */}
      <div
        style={{
          position: "absolute",
          top: -8,
          right: 6,
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 800,
          fontSize: isMobile ? 44 : 60,
          color: hov ? A : dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)",
          lineHeight: 1,
          pointerEvents: "none",
          transition: "color 0.25s ease",
          filter: hov ? `drop-shadow(0 0 12px ${A}60)` : "none",
        }}
      >
        {step.step}
      </div>
      {/* Badge */}
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: 8,
          background: `linear-gradient(135deg,${A},${A2})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
          position: "relative",
          boxShadow: hov ? `0 0 14px ${A}50` : "none",
          transition: "box-shadow 0.25s ease",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontWeight: 700,
            fontSize: 9,
            color: "#fff",
          }}
        >
          {step.step}
        </span>
      </div>
      <div
        style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 700,
          fontSize: isMobile ? 13 : 14.5,
          color: hov ? A : T,
          marginBottom: 6,
          transition: "color 0.25s ease",
        }}
      >
        {step.title}
      </div>
      <p
        style={{
          fontSize: isMobile ? 11.5 : 12.5,
          color: TS,
          lineHeight: 1.75,
        }}
      >
        {step.desc}
      </p>
    </div>
  );
}

// ─── MAIN PORTFOLIO ───────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [activeNav, setActiveNav] = useState("About");
  const [hovSvc, setHovSvc] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const isMobile = useIsMobile();
  const toggle = () => setDark((d) => !d);

  useEffect(() => {
    const sections = NAV.map((n) =>
      document.getElementById(n.toLowerCase()),
    ).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setActiveNav(
              e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1),
            );
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
  };

  const T = dark ? "#dde6f0" : "#18253a";
  const TS = dark ? "#556f8a" : "#607080";
  const A = dark ? "#00D4FF" : "#6244e8";
  const A2 = dark ? "#7C3AED" : "#d03a8c";
  const cardBg = dark ? "rgba(255,255,255,0.022)" : "rgba(255,255,255,0.85)";
  const cardBorder = dark ? "rgba(255,255,255,0.065)" : "rgba(100,80,220,0.1)";
  const px = isMobile ? "16px" : "6vw";
  const sectionPy = isMobile ? "72px 0 40px" : "108px 0 60px";

  return (
    <div
      style={{
        minHeight: "100vh",
        color: T,
        fontFamily: "'DM Sans',sans-serif",
        overflowX: "hidden",
        cursor: isMobile ? "auto" : "none",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ::selection{background:${A}28;color:${A};}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:${dark ? "rgba(0,212,255,0.25)" : "rgba(98,68,232,0.25)"};border-radius:2px;}
        @keyframes au1{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(80px,-60px) scale(1.1);}}
        @keyframes au2{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-100px,80px) scale(0.9);}}
        @keyframes au3{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(60px,100px) scale(1.06);}}
        @keyframes float{0%,100%{transform:translateY(0px);}50%{transform:translateY(-16px);}}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes spin-rev{to{transform:rotate(-360deg);}}
        @keyframes pring{0%{transform:scale(1);opacity:.6;}100%{transform:scale(2);opacity:0;}}
        @keyframes drop{0%{height:0;opacity:0;}100%{height:56px;opacity:1;}}
        @keyframes shimmer-line{0%{transform:translateX(-100%);}100%{transform:translateX(300%);}}
        .navbtn:hover{color:${A}!important;}
        .pbtn:hover{transform:translateY(-2px)!important;filter:brightness(1.1)!important;}
        .obtn:hover{background:${A}12!important;border-color:${A}60!important;}
        .chip:hover{border-color:${A}!important;background:${A}10!important;color:${A}!important;transform:translateY(-1px);}
        .cert-card:hover .cert-reveal{opacity:1!important;transform:translateX(0)!important;}
        .svc-card:hover{transform:translateY(-5px)!important;}
        .resume-nav-btn:hover{background:${A}18!important;border-color:${A}!important;color:${A}!important;}
      `}</style>

      <ScrollProgress dark={dark} />
      <AuroraBg dark={dark} />
      {!isMobile && (
        <>
          {/* Magnetic Cursor only on desktop */}
          <MagneticCursorDesktop dark={dark} />
        </>
      )}
      <FloatingResume dark={dark} onOpen={() => setShowToast(true)} />
      <ResumeToast
        dark={dark}
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `0 ${isMobile ? "16px" : "5vw"}`,
          background: dark ? "rgba(5,0,22,0.78)" : "rgba(240,244,255,0.78)",
          backdropFilter: "blur(32px) saturate(1.5)",
          borderBottom: `1px solid ${dark ? "rgba(0,212,255,0.06)" : "rgba(98,68,232,0.08)"}`,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
          }}
          onClick={() => scrollTo("About")}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: `linear-gradient(135deg,${A},${A2})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 16px ${A}40`,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontWeight: 800,
                fontSize: 12,
                color: "#fff",
                letterSpacing: "0.02em",
              }}
            >
              AP
            </span>
          </div>
          {!isMobile && (
            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: T,
                  lineHeight: 1.1,
                }}
              >
                Aditya Prakash
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 9,
                  color: TS,
                  letterSpacing: "0.1em",
                }}
              >
                SOFTWARE ENGINEER
              </div>
            </div>
          )}
          {isMobile && (
            <div
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: T,
              }}
            >
              Aditya Prakash
            </div>
          )}
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
            {NAV.map((l) => {
              const isHire = l === "Freelance",
                isActive = activeNav === l;
              return (
                <button
                  key={l}
                  className="navbtn"
                  onClick={() => scrollTo(l)}
                  style={{
                    background: isHire
                      ? isActive
                        ? `linear-gradient(135deg,${A},${A2})`
                        : "transparent"
                      : isActive
                        ? A + "10"
                        : "transparent",
                    border: isHire
                      ? `1px solid ${A}35`
                      : isActive
                        ? `1px solid ${A}22`
                        : "1px solid transparent",
                    color: isHire ? A : isActive ? A : TS,
                    padding: isHire ? "5px 13px" : "5px 11px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 12,
                    fontWeight: isHire ? 700 : 500,
                    transition: "all 0.18s",
                    letterSpacing: "0.01em",
                  }}
                >
                  {isHire ? "For Hire" : l}
                </button>
              );
            })}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-nav-btn"
              onClick={() => setShowToast(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                marginLeft: 6,
                padding: "5px 11px",
                borderRadius: 8,
                background: dark
                  ? "rgba(0,212,255,0.06)"
                  : "rgba(98,68,232,0.06)",
                border: dark
                  ? "1px solid rgba(0,212,255,0.22)"
                  : "1px solid rgba(98,68,232,0.22)",
                color: A,
                fontSize: 12,
                fontWeight: 700,
                textDecoration: "none",
                transition: "all 0.18s",
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              {Icon.fileText(12, A)} Resume
            </a>
            <div style={{ marginLeft: 8 }}>
              <ThemeToggle dark={dark} toggle={toggle} />
            </div>
          </div>
        )}

        {/* Mobile: theme + hamburger */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ThemeToggle dark={dark} toggle={toggle} />
            <MobileMenu
              dark={dark}
              A={A}
              A2={A2}
              T={T}
              TS={TS}
              activeNav={activeNav}
              scrollTo={scrollTo}
              toggle={toggle}
              onResumeClick={() => setShowToast(true)}
            />
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        id="about"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: `80px ${px} ${isMobile ? "60px" : "0"}`,
          overflow: "hidden",
        }}
      >
        <ParticleField dark={dark} isMobile={isMobile} />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: isMobile ? 40 : 48,
            flexDirection: isMobile ? "column-reverse" : "row",
            flexWrap: isMobile ? "nowrap" : "wrap",
          }}
        >
          {/* Left text */}
          <div
            style={{
              flex: "1 1 auto",
              maxWidth: isMobile ? "100%" : 580,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            {/* Status badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 24,
                padding: "5px 14px 5px 8px",
                borderRadius: 30,
                background: dark
                  ? "rgba(16,185,129,0.07)"
                  : "rgba(16,185,129,0.06)",
                border: "1px solid rgba(16,185,129,0.2)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: 8,
                  height: 8,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "#10B981",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: -3,
                    borderRadius: "50%",
                    border: "2px solid #10B981",
                    animation: "pring 2s ease-out infinite",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#10B981",
                  fontFamily: "'JetBrains Mono',monospace",
                  letterSpacing: "0.06em",
                }}
              >
                {isMobile
                  ? "AVAILABLE FOR WORK"
                  : "AVAILABLE · FREELANCE & FULL-TIME"}
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontWeight: 800,
                lineHeight: 0.97,
                marginBottom: 12,
                letterSpacing: "-0.03em",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: isMobile ? "52px" : "clamp(52px,7vw,94px)",
                  color: T,
                }}
              >
                Aditya
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: isMobile ? "52px" : "clamp(52px,7vw,94px)",
                  color: A,
                  filter: dark ? `drop-shadow(0 0 30px ${A}45)` : "none",
                }}
              >
                Prakash
              </span>
            </h1>

            <div
              style={{
                height: 40,
                display: "flex",
                alignItems: "center",
                gap: 7,
                marginBottom: 20,
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 300, color: TS }}>
                I'm a
              </span>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "'Space Grotesk',sans-serif",
                }}
              >
                <Typewriter words={DATA.roles} color={A} />
              </span>
            </div>

            <p
              style={{
                fontSize: isMobile ? 14 : 15,
                color: TS,
                lineHeight: 1.9,
                maxWidth: isMobile ? "100%" : 480,
                marginBottom: 32,
                fontWeight: 400,
              }}
            >
              {DATA.summary}
            </p>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginBottom: 28,
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              <button
                className="pbtn"
                onClick={() => scrollTo("Contact")}
                style={{
                  padding: isMobile ? "11px 22px" : "12px 28px",
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.22s",
                  background: `linear-gradient(135deg,${A},${A2})`,
                  color: "#fff",
                  border: "none",
                  letterSpacing: "0.04em",
                  boxShadow: `0 5px 24px ${A}38`,
                }}
              >
                Get in Touch
              </button>
              <button
                className="obtn"
                onClick={() => scrollTo("Projects")}
                style={{
                  padding: isMobile ? "11px 22px" : "12px 28px",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.22s",
                  background: "transparent",
                  color: T,
                  border: `1px solid ${dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.14)"}`,
                }}
              >
                View Projects
              </button>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowToast(true)}
                className="obtn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: isMobile ? "11px 20px" : "12px 24px",
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 13,
                  fontFamily: "inherit",
                  transition: "all 0.22s",
                  background: dark
                    ? "rgba(0,212,255,0.06)"
                    : "rgba(98,68,232,0.06)",
                  color: A,
                  border: `1px solid ${A}35`,
                  textDecoration: "none",
                }}
              >
                {Icon.fileText(14, A)} Resume
              </a>
            </div>

            {/* Socials */}
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: TS,
                  fontFamily: "'JetBrains Mono',monospace",
                  letterSpacing: "0.1em",
                }}
              >
                CONNECT
              </span>
              <div
                style={{
                  width: 24,
                  height: 1,
                  background: dark
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.1)",
                }}
              />
              {[
                {
                  href: `https://github.com/${DATA.contact.github}`,
                  icon: Icon.github(18, TS),
                },
                {
                  href: `https://linkedin.com/in/${DATA.contact.linkedin}`,
                  icon: Icon.linkedin(18, TS),
                },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="obtn"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: dark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.04)",
                    border: dark
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(0,0,0,0.08)",
                    transition: "all 0.18s",
                    textDecoration: "none",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Avatar */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "relative",
                width: isMobile ? 200 : 320,
                height: isMobile ? 200 : 320,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "float 5.5s ease-in-out infinite",
              }}
            >
              {!isMobile && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      inset: -28,
                      borderRadius: "50%",
                      border: dark
                        ? "1px solid rgba(0,212,255,0.18)"
                        : "1px solid rgba(98,68,232,0.14)",
                      animation: "spin 24s linear infinite",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "6%",
                        left: "-5px",
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: A,
                        boxShadow: `0 0 10px ${A}`,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      inset: -56,
                      borderRadius: "50%",
                      border: dark
                        ? "1px solid rgba(124,58,237,0.12)"
                        : "1px solid rgba(208,58,140,0.1)",
                      animation: "spin-rev 36s linear infinite",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        bottom: "18%",
                        right: "-4px",
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: A2,
                        boxShadow: `0 0 8px ${A2}`,
                      }}
                    />
                  </div>
                </>
              )}
              {isMobile && (
                <div
                  style={{
                    position: "absolute",
                    inset: -16,
                    borderRadius: "50%",
                    border: dark
                      ? "1px solid rgba(0,212,255,0.2)"
                      : "1px solid rgba(98,68,232,0.15)",
                    animation: "spin 20s linear infinite",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "6%",
                      left: "-4px",
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: A,
                      boxShadow: `0 0 8px ${A}`,
                    }}
                  />
                </div>
              )}
              <div
                style={{
                  width: isMobile ? 168 : 270,
                  height: isMobile ? 168 : 270,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: dark
                    ? `linear-gradient(135deg,${A}18,${A2}14)`
                    : `linear-gradient(135deg,${A}12,${A2}10)`,
                  border: dark ? `2px solid ${A}28` : `2px solid ${A}20`,
                  boxShadow: dark
                    ? `0 0 70px ${A}18, 0 0 140px ${A2}10`
                    : `0 0 40px ${A}14`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://avatars.githubusercontent.com/Aditya-Prakash07"
                  alt="Aditya Prakash"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    display: "none",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontWeight: 800,
                    fontSize: isMobile ? 44 : 68,
                    color: A,
                  }}
                >
                  AP
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue — hide on mobile */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              bottom: 26,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 1,
                height: 52,
                background: `linear-gradient(${A},transparent)`,
                animation: "drop 1s ease forwards",
              }}
            />
            <span
              style={{
                fontSize: 8.5,
                letterSpacing: "0.22em",
                color: TS,
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              SCROLL
            </span>
          </div>
        )}
      </section>

      {/* ── STATS ── */}
      <div style={{ position: "relative", zIndex: 1, padding: `0 ${px}` }}>
        <Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
              background: cardBg,
              border: `1px solid ${cardBorder}`,
              borderRadius: 18,
              overflow: "hidden",
              backdropFilter: "blur(24px)",
            }}
          >
            {DATA.stats.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: isMobile ? "20px 12px" : "32px 20px",
                  textAlign: "center",
                  borderRight: isMobile
                    ? i % 2 === 0
                      ? `1px solid ${cardBorder}`
                      : "none"
                    : i < 3
                      ? `1px solid ${cardBorder}`
                      : "none",
                  borderBottom:
                    isMobile && i < 2 ? `1px solid ${cardBorder}` : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                >
                  <IconBox
                    iconKey={s.svgIcon}
                    color={A}
                    size={isMobile ? 30 : 36}
                    dark={dark}
                  />
                </div>
                <div
                  style={{
                    fontSize: isMobile ? 26 : 36,
                    fontWeight: 800,
                    fontFamily: "'Space Grotesk',sans-serif",
                    color: A,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  <Counter
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                  />
                </div>
                <div
                  style={{
                    fontSize: 10.5,
                    color: TS,
                    marginTop: 8,
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                    lineHeight: 1.3,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ── CONTENT WRAPPER ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: `0 ${px}`,
          maxWidth: 1180,
          margin: "0 auto",
        }}
      >
        {/* SKILLS */}
        <section id="skills" style={{ padding: sectionPy }}>
          <Reveal>
            <SectionHead
              num="02 / SKILLS"
              title={["Technical", "Arsenal"]}
              accent={A}
              dark={dark}
              isMobile={isMobile}
            />
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit,minmax(285px,1fr))",
              gridAutoRows: "1fr",
              gap: isMobile ? 12 : 16,
            }}
          >
            {DATA.skills.map((sk, i) => (
              <Reveal key={sk.cat} delay={i * 0.06}>
                <TiltCard
                  dark={dark}
                  glow={sk.color}
                  isMobile={isMobile}
                  style={{
                    padding: isMobile ? "18px 20px 16px" : "24px 26px 20px",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 14,
                    }}
                  >
                    <IconBox
                      iconKey={sk.svgIcon}
                      color={sk.color}
                      size={34}
                      dark={dark}
                    />
                    <div>
                      <div
                        style={{
                          fontFamily: "'Space Grotesk',sans-serif",
                          fontWeight: 700,
                          fontSize: 13,
                          color: T,
                        }}
                      >
                        {sk.cat}
                      </div>
                      <div
                        style={{
                          width: 24,
                          height: 2,
                          borderRadius: 1,
                          background: sk.color,
                          marginTop: 5,
                          opacity: 0.7,
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {sk.items.map((it) => (
                      <Pill key={it} label={it} color={sk.color} dark={dark} />
                    ))}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" style={{ padding: "40px 0" }}>
          <Reveal>
            <SectionHead
              num="03 / EXPERIENCE"
              title={["Work", "History"]}
              accent={A}
              dark={dark}
              isMobile={isMobile}
            />
          </Reveal>
          <div
            style={{ position: "relative", paddingLeft: isMobile ? 28 : 48 }}
          >
            <div
              style={{
                position: "absolute",
                left: isMobile ? 8 : 14,
                top: 8,
                bottom: 8,
                width: 1,
                background: dark
                  ? `linear-gradient(180deg,${A}60,${A2}40,transparent)`
                  : `linear-gradient(180deg,${A}50,transparent)`,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {DATA.experience.map((exp, i) => (
                <Reveal key={exp.company} delay={i * 0.1}>
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: isMobile ? -26 : -42,
                        top: 26,
                        width: isMobile ? 14 : 16,
                        height: isMobile ? 14 : 16,
                        borderRadius: "50%",
                        background: exp.color,
                        border: dark
                          ? "2px solid #05001f"
                          : "2px solid #eef2ff",
                        boxShadow: `0 0 12px ${exp.color}`,
                      }}
                    >
                      {exp.current && (
                        <div
                          style={{
                            position: "absolute",
                            inset: -5,
                            borderRadius: "50%",
                            border: `1.5px solid ${exp.color}45`,
                            animation: "pring 2.2s ease-out infinite",
                          }}
                        />
                      )}
                    </div>
                    <TiltCard
                      dark={dark}
                      glow={exp.color}
                      isMobile={isMobile}
                      style={{ padding: isMobile ? "20px 18px" : "28px 32px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          gap: 10,
                          marginBottom: 16,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: 12,
                            alignItems: "flex-start",
                          }}
                        >
                          <IconBox
                            iconKey="briefcase"
                            color={exp.color}
                            size={isMobile ? 34 : 40}
                            dark={dark}
                          />
                          <div>
                            <div
                              style={{
                                fontFamily: "'Space Grotesk',sans-serif",
                                fontWeight: 800,
                                fontSize: isMobile ? 15 : 17,
                                color: T,
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {exp.role}
                            </div>
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: exp.color,
                                marginTop: 2,
                              }}
                            >
                              {exp.company}
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 5,
                            alignItems: isMobile ? "flex-start" : "flex-end",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'JetBrains Mono',monospace",
                              fontSize: 10.5,
                              color: TS,
                              padding: "3px 8px",
                              borderRadius: 6,
                              background: dark
                                ? "rgba(255,255,255,0.04)"
                                : "rgba(0,0,0,0.04)",
                              border: `1px solid ${cardBorder}`,
                            }}
                          >
                            {exp.period}
                          </span>
                          {exp.current && (
                            <span
                              style={{
                                fontFamily: "'JetBrains Mono',monospace",
                                fontSize: 9,
                                color: "#10B981",
                                padding: "2px 7px",
                                borderRadius: 6,
                                background: "rgba(16,185,129,0.08)",
                                border: "1px solid rgba(16,185,129,0.22)",
                                letterSpacing: "0.08em",
                              }}
                            >
                              CURRENT
                            </span>
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          height: 1,
                          background: dark
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.05)",
                          marginBottom: 14,
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 7,
                        }}
                      >
                        {exp.bullets.map((b, bi) => (
                          <div
                            key={bi}
                            style={{
                              display: "flex",
                              gap: 10,
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                background: exp.color,
                                marginTop: 8,
                                flexShrink: 0,
                              }}
                            />
                            <span
                              style={{
                                fontSize: isMobile ? 12.5 : 13.5,
                                color: TS,
                                lineHeight: 1.75,
                              }}
                            >
                              {b}
                            </span>
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
        <section id="projects" style={{ padding: "40px 0" }}>
          <Reveal>
            <SectionHead
              num="04 / PROJECTS"
              title={["Featured", "Work"]}
              accent={A}
              dark={dark}
              isMobile={isMobile}
            />
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {DATA.projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <TiltCard
                  dark={dark}
                  glow={p.color}
                  isMobile={isMobile}
                  style={{ overflow: "hidden", padding: 0 }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      minHeight: isMobile ? "auto" : 158,
                    }}
                  >
                    <div
                      style={{
                        width: isMobile ? "100%" : 4,
                        height: isMobile ? 4 : "auto",
                        flexShrink: 0,
                        background: `linear-gradient(${isMobile ? "90deg" : "180deg"},${p.color},${p.accent})`,
                      }}
                    />
                    {!isMobile && (
                      <div
                        style={{
                          width: 72,
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRight: `1px solid ${cardBorder}`,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Space Grotesk',sans-serif",
                            fontWeight: 800,
                            fontSize: 40,
                            color: dark
                              ? "rgba(255,255,255,0.04)"
                              : "rgba(0,0,0,0.05)",
                            lineHeight: 1,
                          }}
                        >
                          {p.num}
                        </span>
                      </div>
                    )}
                    <div
                      style={{
                        flex: 1,
                        padding: isMobile ? "18px 18px 16px" : "22px 28px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 10,
                          marginBottom: 8,
                          flexWrap: "wrap",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              marginBottom: 6,
                            }}
                          >
                            {isMobile && (
                              <span
                                style={{
                                  fontFamily: "'Space Grotesk',sans-serif",
                                  fontWeight: 800,
                                  fontSize: 22,
                                  color: dark
                                    ? "rgba(255,255,255,0.07)"
                                    : "rgba(0,0,0,0.06)",
                                }}
                              >
                                {p.num}
                              </span>
                            )}
                            <h3
                              style={{
                                fontFamily: "'Space Grotesk',sans-serif",
                                fontWeight: 800,
                                fontSize: isMobile ? 17 : 19,
                                color: T,
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {p.name}
                            </h3>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: 5,
                              flexWrap: "wrap",
                            }}
                          >
                            {p.tags.map((t) => (
                              <Pill
                                key={t}
                                label={t}
                                color={p.color}
                                dark={dark}
                              />
                            ))}
                          </div>
                        </div>
                        <div
                          style={{
                            padding: "4px 11px",
                            borderRadius: 6,
                            background: p.color + "12",
                            border: `1px solid ${p.color}28`,
                            color: p.color,
                            fontSize: 10.5,
                            fontWeight: 700,
                            fontFamily: "'JetBrains Mono',monospace",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {p.metric}
                        </div>
                      </div>
                      <p
                        style={{
                          fontSize: isMobile ? 12.5 : 13,
                          color: TS,
                          lineHeight: 1.78,
                          marginTop: 8,
                        }}
                      >
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FREELANCE */}
        <section id="freelance" style={{ padding: "40px 0" }}>
          <Reveal>
            <SectionHead
              num="05 / FREELANCE"
              title={["Available", "for Work"]}
              accent={A}
              dark={dark}
              isMobile={isMobile}
            />
          </Reveal>

          <Reveal>
            <div
              style={{
                position: "relative",
                borderRadius: 18,
                overflow: "hidden",
                marginBottom: 40,
                padding: isMobile ? "28px 22px" : "48px 44px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: dark
                    ? `linear-gradient(130deg,rgba(0,212,255,0.06) 0%,rgba(124,58,237,0.09) 60%,rgba(16,185,129,0.05) 100%)`
                    : `linear-gradient(130deg,rgba(98,68,232,0.05) 0%,rgba(208,58,140,0.06) 100%)`,
                  backdropFilter: "blur(24px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: dark
                    ? "1px solid rgba(0,212,255,0.12)"
                    : "1px solid rgba(98,68,232,0.12)",
                  borderRadius: 18,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background: `linear-gradient(90deg,transparent,${A}60,transparent)`,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "30%",
                    height: "100%",
                    background: `linear-gradient(90deg,transparent,${A},transparent)`,
                    animation: "shimmer-line 3s ease infinite",
                  }}
                />
              </div>
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 24,
                }}
              >
                <div style={{ flex: "1 1 280px" }}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 9.5,
                      color: A,
                      letterSpacing: "0.15em",
                      marginBottom: 10,
                    }}
                  >
                    FREELANCE · FULL-TIME · COLLABORATION
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontWeight: 800,
                      fontSize: isMobile ? "20px" : "clamp(20px,2.8vw,32px)",
                      color: T,
                      marginBottom: 12,
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {DATA.freelance.tagline}
                  </h3>
                  <p
                    style={{
                      fontSize: isMobile ? 13 : 14,
                      color: TS,
                      lineHeight: 1.85,
                      maxWidth: 460,
                    }}
                  >
                    {DATA.freelance.pitch}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    minWidth: isMobile ? "100%" : "auto",
                  }}
                >
                  <a
                    href={`mailto:${DATA.contact.email}?subject=Let's%20Connect`}
                    className="pbtn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 9,
                      padding: "13px 24px",
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk',sans-serif",
                      transition: "all 0.22s",
                      background: `linear-gradient(135deg,${A},${A2})`,
                      color: "#fff",
                      border: "none",
                      textDecoration: "none",
                      boxShadow: `0 6px 28px ${A}35`,
                      letterSpacing: "0.03em",
                    }}
                  >
                    Let's Connect {Icon.arrowRight(13, "#fff")}
                  </a>
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowToast(true)}
                    className="obtn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "11px 20px",
                      borderRadius: 10,
                      fontWeight: 600,
                      fontSize: 13,
                      fontFamily: "'Space Grotesk',sans-serif",
                      transition: "all 0.22s",
                      background: dark
                        ? "rgba(0,212,255,0.06)"
                        : "rgba(98,68,232,0.06)",
                      color: A,
                      border: `1px solid ${A}30`,
                      textDecoration: "none",
                    }}
                  >
                    {Icon.fileText(14, A)} Download Resume
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 9.5,
                color: TS,
                letterSpacing: "0.18em",
                marginBottom: 18,
              }}
            >
              WHAT I CAN BUILD FOR YOU
            </div>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit,minmax(280px,1fr))",
              gridAutoRows: "1fr",
              gap: 12,
              marginBottom: 44,
            }}
          >
            {DATA.freelance.services.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.06}>
                <div
                  className="svc-card"
                  onMouseEnter={() => setHovSvc(i)}
                  onMouseLeave={() => setHovSvc(null)}
                  style={{
                    height: "100%",
                    padding: isMobile ? "18px 18px 16px" : "24px 26px 22px",
                    borderRadius: 18,
                    backdropFilter: "blur(24px)",
                    background:
                      hovSvc === i
                        ? dark
                          ? svc.color + "0a"
                          : svc.color + "07"
                        : cardBg,
                    border: `1px solid ${hovSvc === i ? svc.color + "40" : cardBorder}`,
                    transition: "all 0.22s ease",
                    boxShadow:
                      hovSvc === i ? `0 10px 36px ${svc.color}15` : "none",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    <IconBox
                      iconKey={svc.svgIcon}
                      color={svc.color}
                      size={34}
                      dark={dark}
                    />
                    <div>
                      <div
                        style={{
                          fontFamily: "'Space Grotesk',sans-serif",
                          fontWeight: 700,
                          fontSize: 13,
                          color: T,
                        }}
                      >
                        {svc.title}
                      </div>
                      <div
                        style={{
                          width: hovSvc === i ? 36 : 18,
                          height: 2,
                          borderRadius: 1,
                          background: svc.color,
                          marginTop: 4,
                          transition: "width 0.3s ease",
                          opacity: 0.7,
                        }}
                      />
                    </div>
                  </div>
                  <p style={{ fontSize: 12.5, color: TS, lineHeight: 1.8 }}>
                    {svc.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 9.5,
                color: TS,
                letterSpacing: "0.18em",
                marginBottom: 14,
              }}
            >
              BY THE NUMBERS
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: 1,
                background: dark
                  ? "rgba(0,212,255,0.05)"
                  : "rgba(98,68,232,0.05)",
                border: dark
                  ? "1px solid rgba(0,212,255,0.09)"
                  : "1px solid rgba(98,68,232,0.09)",
                borderRadius: 16,
                overflow: "hidden",
                marginBottom: 44,
              }}
            >
              {DATA.freelance.whyMe.map((w, i) => (
                <div
                  key={i}
                  style={{
                    padding: isMobile ? "20px 12px" : "28px 16px",
                    textAlign: "center",
                    background: dark
                      ? "rgba(5,0,22,0.35)"
                      : "rgba(255,255,255,0.5)",
                    borderRight:
                      i % 2 === 0
                        ? dark
                          ? "1px solid rgba(0,212,255,0.07)"
                          : "1px solid rgba(98,68,232,0.07)"
                        : "none",
                    borderBottom:
                      i < 2
                        ? dark
                          ? "1px solid rgba(0,212,255,0.07)"
                          : "1px solid rgba(98,68,232,0.07)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      fontSize: isMobile ? 22 : 28,
                      fontWeight: 800,
                      fontFamily: "'Space Grotesk',sans-serif",
                      color: A,
                      lineHeight: 1,
                      marginBottom: 6,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {w.stat}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: TS,
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    {w.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 9.5,
                color: TS,
                letterSpacing: "0.18em",
                marginBottom: 18,
              }}
            >
              HOW WE WORK TOGETHER
            </div>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr 1fr"
                : "repeat(auto-fit,minmax(220px,1fr))",
              gap: 12,
            }}
          >
            {DATA.freelance.process.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.07}>
                <ProcessCard
                  dark={dark}
                  glow={A}
                  A={A}
                  A2={A2}
                  isMobile={isMobile}
                  step={step}
                  T={T}
                  TS={TS}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" style={{ padding: "40px 0" }}>
          <Reveal>
            <SectionHead
              num="06 / EDUCATION"
              title={["Academic", "Background"]}
              accent={A}
              dark={dark}
              isMobile={isMobile}
            />
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit,minmax(310px,1fr))",
              gap: 16,
            }}
          >
            <Reveal>
              <TiltCard
                dark={dark}
                glow={A}
                isMobile={isMobile}
                style={{
                  padding: isMobile ? "24px 22px" : "32px 32px",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 16,
                  }}
                >
                  <IconBox
                    iconKey="graduation"
                    color={A}
                    size={isMobile ? 38 : 44}
                    dark={dark}
                  />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 10,
                      color: TS,
                    }}
                  >
                    {DATA.education.period}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontWeight: 800,
                    fontSize: isMobile ? 14 : 16,
                    color: T,
                    marginBottom: 5,
                    lineHeight: 1.3,
                  }}
                >
                  {DATA.education.school}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: A,
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  {DATA.education.degree}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 12,
                    color: TS,
                    marginBottom: 18,
                  }}
                >
                  {Icon.mapPin(12, TS)} {DATA.education.field} ·{" "}
                  {DATA.education.location}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 16px",
                    borderRadius: 10,
                    background: A + "07",
                    border: `1px solid ${A}12`,
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontWeight: 800,
                      fontSize: isMobile ? 24 : 28,
                      color: A,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {DATA.education.gpa}
                  </span>
                  <div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: T }}>
                      GPA Score
                    </div>
                    <div style={{ fontSize: 10.5, color: TS }}>out of 10.0</div>
                  </div>
                  <div
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "4px 10px",
                      borderRadius: 6,
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.22)",
                      color: "#10B981",
                      fontSize: 10.5,
                      fontWeight: 700,
                    }}
                  >
                    {Icon.check(10)} TOP
                  </div>
                </div>
                <a
                  href={DATA.education.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="obtn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    fontSize: 12,
                    fontWeight: 600,
                    color: A,
                    textDecoration: "none",
                    padding: "8px 14px",
                    borderRadius: 8,
                    background: A + "0d",
                    border: `1px solid ${A}20`,
                    transition: "all 0.18s",
                  }}
                >
                  {Icon.externalLink(12, A)} View MCA Certificate
                </a>
              </TiltCard>
            </Reveal>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {DATA.certifications.map((c, i) => (
                <Reveal key={c.name} delay={i * 0.09}>
                  <div className="cert-card">
                    <TiltCard
                      dark={dark}
                      glow={c.color}
                      isMobile={isMobile}
                      style={{ padding: "16px 18px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: 12,
                          alignItems: "center",
                        }}
                      >
                        <IconBox
                          iconKey={c.svgIcon}
                          color={c.color}
                          size={36}
                          dark={dark}
                        />
                        <div style={{ flex: 1 }}>
                          <div
                            style={{ fontWeight: 700, fontSize: 13, color: T }}
                          >
                            {c.name}
                          </div>
                          <div
                            style={{
                              fontSize: 11.5,
                              color: c.color,
                              marginTop: 2,
                              fontWeight: 500,
                            }}
                          >
                            {c.issuer}
                          </div>
                        </div>
                        <a
                          href={c.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cert-reveal"
                          style={{
                            opacity: isMobile ? 1 : 0,
                            transform: isMobile ? "none" : "translateX(8px)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 11,
                            fontWeight: 600,
                            color: c.color,
                            textDecoration: "none",
                            padding: "5px 10px",
                            borderRadius: 7,
                            background: c.color + "12",
                            border: `1px solid ${c.color}28`,
                            transition: "all 0.2s ease",
                            whiteSpace: "nowrap",
                          }}
                        >
                          View {Icon.externalLink(10, c.color)}
                        </a>
                      </div>
                    </TiltCard>
                  </div>
                </Reveal>
              ))}
              {DATA.achievements.map((a, i) => (
                <Reveal key={i} delay={(i + 2) * 0.09}>
                  <TiltCard
                    dark={dark}
                    glow="#10B981"
                    isMobile={isMobile}
                    style={{ padding: "14px 18px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                      }}
                    >
                      <IconBox
                        iconKey={a.svgIcon}
                        color="#10B981"
                        size={32}
                        dark={dark}
                      />
                      <div style={{ paddingTop: 1 }}>
                        <span
                          style={{ fontSize: 12.5, color: TS, lineHeight: 1.7 }}
                        >
                          {a.text}{" "}
                        </span>
                        <span
                          style={{
                            fontSize: 12.5,
                            fontWeight: 700,
                            color: "#10B981",
                          }}
                        >
                          {a.highlight}
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: "40px 0 100px" }}>
          <Reveal>
            <SectionHead
              num="07 / CONTACT"
              title={["Get in", "Touch"]}
              accent={A}
              dark={dark}
              isMobile={isMobile}
            />
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit,minmax(310px,1fr))",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <Reveal>
              <TiltCard
                dark={dark}
                glow={A}
                isMobile={isMobile}
                style={{
                  padding: isMobile ? "28px 22px" : "40px 36px",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -70,
                    right: -70,
                    width: 240,
                    height: 240,
                    borderRadius: "50%",
                    background: `radial-gradient(circle,${A}07 0%,transparent 65%)`,
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ marginBottom: 16 }}>
                    <IconBox
                      iconKey="briefcase"
                      color={A}
                      size={isMobile ? 38 : 44}
                      dark={dark}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 9.5,
                      color: A,
                      letterSpacing: "0.15em",
                      marginBottom: 10,
                    }}
                  >
                    FREELANCE & PROJECT WORK
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontWeight: 800,
                      fontSize: isMobile ? 18 : 20,
                      color: T,
                      marginBottom: 10,
                      lineHeight: 1.2,
                    }}
                  >
                    Have a Project in Mind?
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: TS,
                      lineHeight: 1.82,
                      marginBottom: 24,
                    }}
                  >
                    Need backend APIs, microservices, or cloud infrastructure
                    built? I take on freelance projects alongside my full-time
                    work.
                  </p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <a
                      href={`mailto:${DATA.contact.email}?subject=Project%20Inquiry`}
                      className="pbtn"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "11px 20px",
                        borderRadius: 9,
                        fontWeight: 700,
                        fontSize: 13,
                        background: `linear-gradient(135deg,${A},${A2})`,
                        color: "#fff",
                        textDecoration: "none",
                        boxShadow: `0 4px 18px ${A}32`,
                        transition: "all 0.22s",
                      }}
                    >
                      Send Message {Icon.arrowRight(13, "#fff")}
                    </a>
                    <a
                      href={RESUME_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowToast(true)}
                      className="obtn"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        padding: "11px 16px",
                        borderRadius: 9,
                        fontWeight: 600,
                        fontSize: 13,
                        background: dark
                          ? "rgba(0,212,255,0.06)"
                          : "rgba(98,68,232,0.06)",
                        color: A,
                        border: `1px solid ${A}30`,
                        textDecoration: "none",
                        transition: "all 0.22s",
                      }}
                    >
                      {Icon.fileText(13, A)} Resume
                    </a>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            <Reveal delay={0.09}>
              <TiltCard
                dark={dark}
                glow={A2}
                isMobile={isMobile}
                style={{
                  padding: isMobile ? "28px 22px" : "40px 36px",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: -70,
                    left: -70,
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    background: `radial-gradient(circle,${A2}06 0%,transparent 65%)`,
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ marginBottom: 16 }}>
                    <IconBox
                      iconKey="messageSquare"
                      color={A2}
                      size={isMobile ? 38 : 44}
                      dark={dark}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 9.5,
                      color: A2,
                      letterSpacing: "0.15em",
                      marginBottom: 10,
                    }}
                  >
                    GENERAL ENQUIRIES
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontWeight: 800,
                      fontSize: isMobile ? 18 : 20,
                      color: T,
                      marginBottom: 10,
                      lineHeight: 1.2,
                    }}
                  >
                    Let's Have a Conversation
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: TS,
                      lineHeight: 1.82,
                      marginBottom: 22,
                    }}
                  >
                    Open to full-time engineering roles, collaborations, and
                    interesting technical opportunities.
                  </p>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    {[
                      {
                        icon: Icon.mail(15, TS),
                        text: DATA.contact.email,
                        href: `mailto:${DATA.contact.email}`,
                      },
                      {
                        icon: Icon.phone(15, TS),
                        text: DATA.contact.phone,
                        href: `tel:${DATA.contact.phone}`,
                      },
                      {
                        icon: Icon.linkedin(15, TS),
                        text: "LinkedIn Profile",
                        href: `https://linkedin.com/in/${DATA.contact.linkedin}`,
                      },
                    ].map((c, i) => (
                      <a
                        key={i}
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="chip"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 9,
                          padding: "10px 14px",
                          borderRadius: 9,
                          textDecoration: "none",
                          background: dark
                            ? "rgba(255,255,255,0.03)"
                            : "rgba(0,0,0,0.03)",
                          border: `1px solid ${cardBorder}`,
                          color: TS,
                          fontSize: isMobile ? 12.5 : 13,
                          fontWeight: 500,
                          transition: "all 0.18s",
                          wordBreak: "break-all",
                        }}
                      >
                        <span style={{ flexShrink: 0 }}>{c.icon}</span>
                        {c.text}
                      </a>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>

          {/* Footer */}
          <Reveal delay={0.12}>
            <div
              style={{
                marginTop: 48,
                paddingTop: 24,
                borderTop: `1px solid ${cardBorder}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 14,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    background: `linear-gradient(135deg,${A},${A2})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontWeight: 800,
                      fontSize: 10,
                      color: "#fff",
                    }}
                  >
                    AP
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    color: T,
                  }}
                >
                  Aditya Prakash
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowToast(true)}
                  className="chip"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 11px",
                    borderRadius: 7,
                    background: dark
                      ? "rgba(0,212,255,0.06)"
                      : "rgba(98,68,232,0.06)",
                    border: `1px solid ${A}25`,
                    color: A,
                    fontSize: 11,
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.18s",
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                >
                  {Icon.fileText(11, A)} RESUME
                </a>
                {[
                  {
                    href: `https://github.com/${DATA.contact.github}`,
                    icon: Icon.github(15, TS),
                  },
                  {
                    href: `https://linkedin.com/in/${DATA.contact.linkedin}`,
                    icon: Icon.linkedin(15, TS),
                  },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chip"
                    style={{
                      display: "flex",
                      color: TS,
                      textDecoration: "none",
                      transition: "all 0.18s",
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
                <span
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 10,
                    color: TS,
                    opacity: 0.5,
                    letterSpacing: "0.08em",
                  }}
                >
                  © {new Date().getFullYear()} · REACT
                </span>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}

// Desktop-only magnetic cursor (separate component to avoid mobile issues)
function MagneticCursorDesktop({ dark }) {
  const dot = useRef(null),
    ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 }),
    rpos = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onM = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onM);
    let id;
    const tick = () => {
      rpos.current.x += (pos.current.x - rpos.current.x) * 0.1;
      rpos.current.y += (pos.current.y - rpos.current.y) * 0.1;
      if (dot.current)
        dot.current.style.transform = `translate(${pos.current.x - 4}px,${pos.current.y - 4}px)`;
      if (ring.current)
        ring.current.style.transform = `translate(${rpos.current.x - 16}px,${rpos.current.y - 16}px)`;
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      window.removeEventListener("mousemove", onM);
      cancelAnimationFrame(id);
    };
  }, []);
  const c = dark ? "#00D4FF" : "#7C3AED";
  return (
    <>
      <div
        ref={dot}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: c,
          zIndex: 9999,
          pointerEvents: "none",
          mixBlendMode: dark ? "screen" : "multiply",
        }}
      />
      <div
        ref={ring}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: `1px solid ${c}60`,
          zIndex: 9998,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
