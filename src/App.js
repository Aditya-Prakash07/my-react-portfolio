import { useState, useEffect, useRef, useCallback } from "react";
import profileImg from "./assets/profile.jpeg";

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
  leetcode: (s = 16, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.606-2.636c-1.404-1.366-3.414-2.025-5.59-2.025s-4.187.659-5.59 2.025l-4.319 4.38c-1.404 1.367-2.062 3.393-2.062 5.568s.658 4.202 2.062 5.568l4.332 4.363c1.404 1.367 3.414 2.025 5.59 2.025s4.186-.658 5.59-2.025l2.697-2.606c.514-.515.496-1.366-.039-1.901-.535-.535-1.386-.553-1.901-.038zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" />
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

const CustomLogo = ({ size = 18, color = "#fff" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v12" />
    <path d="M8 10l4 -4 4 4" />
  </svg>
);

// ─── DATA ────────────────────────────────────────────────────────────────────
const RESUME_URL =
  "https://docs.google.com/document/d/1_7hWokBO5T_qY_p7mlKyTsPIYInhuGXV/edit?usp=sharing&ouid=112457387856955871460&rtpof=true&sd=true";
const COVER_LETTER_URL =
  "https://docs.google.com/document/d/1st17gzSPOTwX-msTjVDGnttvXuivpmVs/edit?usp=sharing&ouid=112457387856955871460&rtpof=true&sd=true";

const DATA = {
  name: "Aditya Prakash",
  title: "Backend Software Engineer",
  location: "Hajipur, Bihar, India",
  contact: {
    phone: "+91 9529338081",
    email: "adityaprakash@gmail.com",
    linkedin: "aditya-prakash-996538170",
    github: "Aditya-Prakash07",
    leetcode: "Aditya_Prakash07",
    portfolio: "https://my-portfolio-three-hazel-32.vercel.app/",
  },
  summary:
    "Specializing in Java & Spring Boot — building RESTful APIs, microservices, and high-availability systems that scale to 4,000+ remote sites and process 1M+ daily events.",
  roles: [
    "Backend Engineer",
    "API Specialist",
    "Microservices Dev",
    "Spring Boot Expert",
  ],
  stats: [
    {
      value: 1000000,
      display: "1M+",
      label: "Daily Events Processed",
      icon: "zap",
    },
    {
      value: 35,
      display: "35%",
      label: "Query Performance Gain",
      icon: "trending",
    },
    {
      value: 45,
      display: "45%",
      label: "API Latency Reduction",
      icon: "activity",
    },
    {
      value: 4000,
      display: "4K+",
      label: "Remote Sites Served",
      icon: "briefcase",
    },
  ],
  skills: [
    {
      cat: "Languages",
      color: "#00D4FF",
      icon: "code",
      items: ["Java 8/11/17/21", "SQL"],
    },
    {
      cat: "Core Frameworks",
      color: "#7C3AED",
      icon: "layers",
      items: [
        "Spring Boot",
        "Spring MVC",
        "Spring Core",
        "Spring Security",
        "JWT / OAuth2",
        "RBAC",
        "Spring Data JPA",
      ],
    },
    {
      cat: "ORM & Persistence",
      color: "#10B981",
      icon: "database",
      items: [
        "Hibernate ORM",
        "JPQL",
        "Criteria API",
        "Lazy/Eager Loading",
        "Transaction Management",
      ],
    },
    {
      cat: "Databases",
      color: "#F59E0B",
      icon: "database",
      items: [
        "MySQL",
        "PostgreSQL",
        "Redis",
        "Query Optimisation",
        "Index Tuning",
        "Schema Design",
      ],
    },
    {
      cat: "API Design",
      color: "#EF4444",
      icon: "activity",
      items: [
        "RESTful APIs",
        "Swagger / OpenAPI 3.0",
        "Postman",
        "API Versioning",
        "Exception Handling",
      ],
    },
    {
      cat: "Architecture & Patterns",
      color: "#EC4899",
      icon: "cpu",
      items: [
        "Microservices",
        "Event-Driven",
        "SOLID",
        "OOP",
        "Builder",
        "Factory",
        "Strategy",
      ],
    },
    {
      cat: "Testing",
      color: "#00D4FF",
      icon: "check",
      items: ["JUnit 5", "Mockito", "Integration Testing", "TDD"],
    },
    {
      cat: "DevOps & Cloud",
      color: "#7C3AED",
      icon: "cloud",
      items: [
        "Docker",
        "Kubernetes (exposure)",
        "GitHub Actions",
        "AWS EC2/S3",
        "Maven",
        "Git",
      ],
    },
  ],
  experience: [
    {
      company: "System Infra Solutions",
      role: "Software Engineer",
      location: "New Delhi, India",
      period: "Jul 2024 – May 2026",
      current: true,
      color: "#00D4FF",
      bullets: [
        {
          text: "Designed and developed core backend services for an enterprise IoT dashboard using ",
          bold: "Spring Boot and Spring MVC",
          rest: ", exposing RESTful APIs consumed by 4,000+ remote sites processing 50,000+ daily data points.",
        },
        {
          text: "Built a secure API layer using ",
          bold: "Spring Security with JWT authentication and RBAC",
          rest: ", protecting all endpoints and enforcing fine-grained authorization across user roles.",
        },
        {
          text: "Engineered the persistence layer using ",
          bold: "Spring Data JPA and Hibernate ORM",
          rest: "; implemented N+1 query fixes, fetch strategy tuning, and MySQL index optimization — reducing query execution times by 35%.",
        },
        {
          text: "Containerized application services using ",
          bold: "Docker",
          rest: " and automated build pipelines with GitHub Actions (CI/CD), maintaining 99.9% environment uptime.",
        },
        {
          text: "Developed reusable service and repository components following ",
          bold: "SOLID principles and OOP design patterns",
          rest: " (Builder, Factory, Strategy), improving code maintainability.",
        },
        {
          text: "Implemented comprehensive ",
          bold: "unit and integration test suites with JUnit 5 and Mockito",
          rest: ", achieving high coverage on critical service and repository classes.",
        },
        {
          text: "Collaborated in ",
          bold: "Agile/Scrum",
          rest: " sprints achieving 95% on-time delivery across 12 consecutive cycles.",
        },
      ],
    },
  ],
  projects: [
    {
      name: "SISAXS — Enterprise IoT Ingestion Platform",
      color: "#00D4FF",
      tags: ["Java 17", "Spring Boot", "Spring Data JPA", "MySQL", "Docker"],
      metric: "1M+ events/day",
      desc: "Designed a fault-tolerant Spring Boot data ingestion engine processing 1M+ daily telemetry events from distributed IoT sensors. Engineered async service layers for 99.8% uptime under peak load. Restructured MySQL schemas with composite indexes, reducing transaction bottlenecks by 30%. Centralized exception handling via @ControllerAdvice.",
    },
    {
      name: "iProtect — Real-Time Security Monitoring",
      color: "#7C3AED",
      tags: ["Spring Boot", "Spring Security", "PostgreSQL", "Hibernate ORM"],
      metric: "45% latency drop",
      desc: "Built the backend for a real-time hardware health monitoring platform serving 50+ remote locations. Reduced API latency by 45% by eliminating N+1 query patterns in Hibernate ORM, refactoring fetch strategies, and optimizing PostgreSQL query plans via EXPLAIN ANALYZE.",
    },
    {
      name: "E-Commerce Platform — Microservices",
      color: "#10B981",
      tags: [
        "Java 17",
        "Spring Boot",
        "Microservices",
        "Spring Security",
        "MySQL",
      ],
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
    certLink:
      "https://drive.google.com/file/d/1Iw53IgAZ0OaO3nUz9-h3Q7AxjIb5xdDA/view?usp=sharing",
  },
  certifications: [
    {
      name: "Full Stack Java Developer",
      issuer: "AccioJob · Core Java, DSA, Spring Boot",
      color: "#F59E0B",
      icon: "code",
      link: "https://drive.google.com/file/d/17gc4Y3a4Wy2mx9EDOac25NqpWOL0fVEX/view?usp=sharing",
    },
    {
      name: "Prompt Engineering & AI Fundamentals",
      issuer: "Anthropic",
      color: "#7C3AED",
      icon: "cpu",
      link: "https://drive.google.com/file/d/1adxuf1-cG0edtpWuq-ipwNsZ2-8Ah8CB/view?usp=sharing",
    },
  ],
  achievements: [
    {
      text: "Ranked top 5% globally on AccioJob",
      highlight: "1,100+ DSA problems",
      icon: "award",
    },
    {
      text: "100+ LeetCode problems solved",
      highlight: "Graphs · Trees · DP",
      icon: "code",
    },
  ],
};

const NAV = [
  "About",
  "Skills",
  "Experience",
  "Projects",
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

// ─── PARTICLE FIELD ──────────────────────────────────────────────────────────
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
function Counter({ value, display }) {
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
  return (
    <span ref={ref}>
      {n >= value
        ? display
        : value >= 1000000
          ? Math.floor(n / 1000000) + "M"
          : n}
    </span>
  );
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
          Document opened in new tab
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
  onDocClick,
}) {
  const [open, setOpen] = useState(false);
  const cardBg = dark ? "rgba(5,0,22,0.97)" : "rgba(240,244,255,0.97)";
  const cardBorder = dark ? "rgba(0,212,255,0.1)" : "rgba(98,68,232,0.12)";
  const handleNav = (item) => {
    scrollTo(item);
    setOpen(false);
  };
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
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
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 400,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          height: "100dvh",
          zIndex: 450,
          width: "min(320px, 85vw)",
          background: cardBg,
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          borderLeft: `1px solid ${cardBorder}`,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(.22,1,.36,1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            padding: "20px 24px 16px",
            borderBottom: `1px solid ${cardBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
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
              <CustomLogo size={16} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
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
                BACKEND ENGINEER
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
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            padding: "20px 16px",
          }}
        >
          {NAV.map((item) => {
            const isActive = activeNav === item;
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
                  background: isActive ? A + "12" : "transparent",
                  border: isActive
                    ? `1px solid ${A}22`
                    : "1px solid transparent",
                  color: isActive ? A : T,
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
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
                    background: isActive ? A : TS + "60",
                    flexShrink: 0,
                  }}
                />
                {item}
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
        <div
          style={{
            padding: "16px 20px",
            borderTop: `1px solid ${cardBorder}`,
            flexShrink: 0,
            paddingBottom: "max(16px, env(safe-area-inset-bottom))",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              onDocClick();
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
          <a
            href={COVER_LETTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              onDocClick();
              setOpen(false);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "13px 20px",
              borderRadius: 12,
              background: dark
                ? "rgba(0,212,255,0.06)"
                : "rgba(98,68,232,0.06)",
              border: `1px solid ${A}30`,
              color: A,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 14,
              fontFamily: "'Space Grotesk',sans-serif",
            }}
          >
            {Icon.fileText(15, A)} Cover Letter
          </a>
        </div>
      </div>
    </>
  );
}

// ─── ABSTRACT TECH VISUAL (Avatar Container) ──────────────────────────────
function AbstractTechVisual({ A, A2, dark, isMobile }) {
  return (
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
          background: dark
            ? `linear-gradient(135deg,${A}15,${A2}10)`
            : `linear-gradient(135deg,${A}10,${A2}05)`,
          border: dark ? `2px solid ${A}28` : `2px solid ${A}20`,
          boxShadow: dark
            ? `0 0 70px ${A}18, 0 0 140px ${A2}10`
            : `0 0 40px ${A}14`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            animation: "spin 30s linear infinite reverse",
          }}
        />
        <img
          src={profileImg}
          alt="Aditya Prakash"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            filter: dark ? `drop-shadow(0 0 15px ${A}80)` : "none",
          }}
        />
      </div>
    </div>
  );
}

// ─── MAIN PORTFOLIO ───────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [activeNav, setActiveNav] = useState("About");
  const [showToast, setShowToast] = useState(false);
  const closeToast = useCallback(() => setShowToast(false), []);
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
        .navbtn:hover{color:${A}!important;}
        .pbtn:hover{transform:translateY(-2px)!important;filter:brightness(1.1)!important;}
        .obtn:hover{background:${A}12!important;border-color:${A}60!important;}
        .chip:hover{border-color:${A}!important;background:${A}10!important;color:${A}!important;transform:translateY(-1px);}
        .resume-nav-btn:hover{background:${A}18!important;border-color:${A}!important;color:${A}!important;}
      `}</style>

      <ScrollProgress dark={dark} />
      <AuroraBg dark={dark} />
      {!isMobile && <MagneticCursorDesktop dark={dark} />}
      <FloatingResume dark={dark} onOpen={() => setShowToast(true)} />
      <ResumeToast dark={dark} show={showToast} onClose={closeToast} />

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
            <CustomLogo size={18} />
          </div>
          {!isMobile && (
            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: T,
                  lineHeight: 1.1,
                }}
              >
                {DATA.name}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 9,
                  color: TS,
                  letterSpacing: "0.1em",
                }}
              >
                BACKEND ENGINEER
              </div>
            </div>
          )}
          {isMobile && (
            <div
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: T,
              }}
            >
              {DATA.name}
            </div>
          )}
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
            {NAV.map((l) => {
              const isActive = activeNav === l;
              return (
                <button
                  key={l}
                  className="navbtn"
                  onClick={() => scrollTo(l)}
                  style={{
                    background: isActive ? A + "10" : "transparent",
                    border: isActive
                      ? `1px solid ${A}22`
                      : "1px solid transparent",
                    color: isActive ? A : TS,
                    padding: "5px 11px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 12,
                    fontWeight: 500,
                    transition: "all 0.18s",
                    letterSpacing: "0.01em",
                  }}
                >
                  {l}
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
              onDocClick={() => setShowToast(true)}
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
                OPEN TO OPPORTUNITIES
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
              <a
                href={COVER_LETTER_URL}
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
                  background: "transparent",
                  color: A,
                  border: `1px solid ${A}35`,
                  textDecoration: "none",
                }}
              >
                {Icon.fileText(14, A)} Cover Letter
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
                  href: `https://leetcode.com/u/${DATA.contact.leetcode}/`,
                  icon: Icon.leetcode(18, TS),
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

          {/* Photo wrapped in Tech Visual */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <AbstractTechVisual A={A} A2={A2} dark={dark} isMobile={isMobile} />
          </div>
        </div>

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
                    iconKey={s.icon}
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
                  <Counter value={s.value} display={s.display} />
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
                      iconKey={sk.icon}
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
                              {b.text}
                              <strong style={{ color: T, fontWeight: 600 }}>
                                {b.bold}
                              </strong>
                              {b.rest}
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
                        background: `linear-gradient(${isMobile ? "90deg" : "180deg"},${p.color},${p.color}50)`,
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
                          0{i + 1}
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
                                0{i + 1}
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

        {/* EDUCATION & CERTIFICATIONS */}
        <section id="education" style={{ padding: "40px 0" }}>
          <Reveal>
            <SectionHead
              num="05 / EDUCATION"
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
                  {DATA.education.field} · {DATA.education.location}
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
                  href={DATA.education.certLink}
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
                          iconKey={c.icon}
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
                          className="obtn"
                          style={{
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
                        iconKey={a.icon}
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
              num="06 / CONTACT"
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
                    OPEN TO ROLES
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
                    Looking for New Opportunities
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: TS,
                      lineHeight: 1.82,
                      marginBottom: 24,
                    }}
                  >
                    Backend Software Engineer with nearly 2 years of production
                    experience in Java & Spring Boot. Open to full-time roles
                    and technical collaborations.
                  </p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <a
                      href={`mailto:${DATA.contact.email}?subject=Opportunity%20for%20Aditya%20Prakash`}
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
                      Send a Message {Icon.arrowRight(13, "#fff")}
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
                    <a
                      href={COVER_LETTER_URL}
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
                        background: "transparent",
                        color: A,
                        border: `1px solid ${A}30`,
                        textDecoration: "none",
                        transition: "all 0.22s",
                      }}
                    >
                      {Icon.fileText(13, A)} Cover Letter
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
                      iconKey="mail"
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
                    DIRECT LINKS
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
                    Let's Connect
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      marginTop: 22,
                    }}
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
                        text: `linkedin.com/in/${DATA.contact.linkedin}`,
                        href: `https://linkedin.com/in/${DATA.contact.linkedin}`,
                      },
                      {
                        icon: Icon.leetcode(15, TS),
                        text: `leetcode.com/u/${DATA.contact.leetcode}`,
                        href: `https://leetcode.com/u/${DATA.contact.leetcode}/`,
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
                  <CustomLogo size={14} />
                </div>
                <span
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    color: T,
                  }}
                >
                  {DATA.name}
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
                <a
                  href={COVER_LETTER_URL}
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
                    background: "transparent",
                    border: `1px solid ${A}25`,
                    color: A,
                    fontSize: 11,
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.18s",
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                >
                  {Icon.fileText(11, A)} COVER LETTER
                </a>
                {[
                  {
                    href: `https://github.com/${DATA.contact.github}`,
                    icon: Icon.github(15, TS),
                  },
                  {
                    href: `https://leetcode.com/u/${DATA.contact.leetcode}/`,
                    icon: Icon.leetcode(15, TS),
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
                    marginLeft: 8,
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

// Desktop-only magnetic cursor
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
