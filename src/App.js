import { useState, useEffect, useRef } from "react";

const data = {
  name: "Aditya Prakash",
  title: "Software Engineer",
  tagline: "Backend Systems · Microservices · Cloud & DevOps",
  contact: {
    phone: "+91 9529338081",
    email: "toadityarajput@gmail.com",
    linkedin: "aditya-prakash-996538170",
    github: "Aditya-Prakash07",
  },
  summary:
    "Software Engineer delivering backend systems in Java and Spring Boot. Specialized in RESTful API design, microservices, and CI/CD automation. Shipped production systems handling 1M+ daily events at sub-100ms response times.",
  stats: [
    { value: "1M+", label: "Daily Events Handled" },
    { value: "<100ms", label: "Response Times" },
    { value: "35%", label: "Query Performance Boost" },
    { value: "40%", label: "Faster Deployments" },
  ],
  skills: {
    Languages: ["Java", "JavaScript (ES6)", "TypeScript", "SQL", "HTML", "CSS"],
    "Frameworks & Libraries": ["Spring Boot", "Spring MVC", "Spring Data JPA", "Hibernate", "React.js", "Node.js"],
    Databases: ["MySQL", "PostgreSQL", "SQL Server", "Redis"],
    "Messaging & Integration": ["Apache Kafka", "WebSocket", "REST APIs", "JWT"],
    "Cloud & DevOps": ["Azure", "AWS (EC2, S3)", "Docker", "Kubernetes", "GitHub Actions", "Jenkins"],
    Architecture: ["Microservices", "Event-Driven", "SOLID", "Design Patterns", "CI/CD", "TDD", "Agile/Scrum"],
  },
  experience: [
    {
      company: "System Infra Solutions",
      role: "Software Engineer",
      period: "Jul 2024 – Present",
      bullets: [
        "Developed APIs & frontend components for sensor telemetry monitoring across 10+ sites — 99.9% uptime, sub-100ms response.",
        "Implemented microservices architecture for 5+ independently deployable components, cutting inter-service coupling by 60%.",
        "Established CI/CD pipelines via Azure DevOps — reduced release cycle time by 40%, eliminated manual deployment errors.",
        "Sustained 95% on-time delivery rate over 12+ Agile sprints with UI/UX, QA, and Product teams.",
      ],
    },
    {
      company: "Nanomindz Technologies Pvt. Ltd.",
      role: "Software Engineer Intern",
      period: "Mar 2024 – Jun 2024",
      bullets: [
        "Built Java backend with JDBC and MySQL sustaining 10,000+ daily record operations with zero data-loss.",
        "Authored JWT-based authentication with RBAC — zero unauthorized-access breaches post-launch.",
        "Tuned 20+ SQL queries, yielding 35% drop in p95 query execution time under peak load.",
        "Delivered 15+ RESTful endpoints, slashing cross-team defects by 50% and accelerating UI release by 2 weeks.",
      ],
    },
  ],
  projects: [
    {
      name: "iProtect",
      tags: ["Spring Boot", "WebSocket", "React"],
      description:
        "Real-time site monitoring & alarm platform tracking communication health, battery status, theft detection, and power-outage alerts for 50+ locations. Cut alert-to-action time by 45%.",
    },
    {
      name: "SISAXS",
      tags: ["Kafka", "IoT", "Microservices"],
      description:
        "Fault-tolerant IoT sensor system ingesting 1M+ telemetry events daily via distributed message broker. Automatic failover kept uptime above 99.8%. Trimmed end-to-end processing overhead by 30%.",
    },
    {
      name: "E-Commerce Application",
      tags: ["Spring Boot", "React", "Redis", "JWT"],
      description:
        "Full-stack store supporting 500+ concurrent shoppers with JWT-secured RBAC. Introduced Redis caching and JPA optimizations, dropping API p99 response time by 25%.",
    },
  ],
  education: {
    school: "SRM Institute of Science and Technology",
    degree: "Master of Computer Applications – Computer Science",
    period: "2023 – 2025",
    gpa: "9.35 / 10.0",
    location: "Chennai, India",
  },
  certifications: [
    { name: "Full Stack Java Developer", issuer: "AccioJob" },
    { name: "Claude AI Certification", issuer: "Anthropic" },
  ],
  achievements: [
    "Completed 1,100+ coding challenges on AccioJob — top 5% of all active participants.",
    "Solved 100+ LeetCode problems: graph algorithms, tree traversal, memoization.",
    "Nominated for internal API Performance Award — boosted throughput by 20%, trimmed mean response by 30ms.",
  ],
};

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

function useTheme() {
  const [dark, setDark] = useState(true);
  return { dark, toggle: () => setDark((d) => !d) };
}

function AnimatedCanvas({ dark }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let w, h;
    const PARTICLE_COUNT = 55;
    const particles = [];

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 1,
        });
      }
    }

    resize();
    initParticles();
    window.addEventListener("resize", () => { resize(); initParticles(); });

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const dotColor = dark ? "rgba(99,179,237,0.55)" : "rgba(66,133,244,0.45)";
      const lineColor = dark ? "rgba(99,179,237,0.12)" : "rgba(66,133,244,0.1)";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        opacity: 0.7, pointerEvents: "none",
      }}
    />
  );
}

function Tag({ label, dark }) {
  return (
    <span style={{
      fontSize: 12, fontWeight: 600, padding: "3px 10px",
      borderRadius: 20,
      background: dark ? "rgba(99,179,237,0.15)" : "rgba(66,133,244,0.12)",
      color: dark ? "#63B3ED" : "#185fa5",
      border: dark ? "1px solid rgba(99,179,237,0.3)" : "1px solid rgba(66,133,244,0.25)",
      letterSpacing: "0.04em",
    }}>
      {label}
    </span>
  );
}

function Section({ id, children, style }) {
  return (
    <section id={id} style={{ padding: "80px 0", ...style }}>
      {children}
    </section>
  );
}

function SectionTitle({ children, dark }) {
  return (
    <div style={{ marginBottom: 48, display: "flex", alignItems: "center", gap: 16 }}>
      <h2 style={{
        fontSize: 32, fontWeight: 800, margin: 0,
        fontFamily: "'Space Grotesk', 'DM Sans', sans-serif",
        color: dark ? "#63B3ED" : "#185fa5",
      }}>
        {children}
      </h2>
      <div style={{
        flex: 1, height: 1,
        background: dark
          ? "linear-gradient(90deg,rgba(99,179,237,0.4),transparent)"
          : "linear-gradient(90deg,rgba(66,133,244,0.3),transparent)",
      }} />
    </div>
  );
}

function GlassCard({ children, dark, style, hover }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: dark
          ? hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)"
          : hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.7)",
        border: dark
          ? `1px solid rgba(99,179,237,${hovered ? 0.35 : 0.15})`
          : `1px solid rgba(66,133,244,${hovered ? 0.4 : 0.2})`,
        borderRadius: 16,
        backdropFilter: "blur(12px)",
        padding: "28px 32px",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered
          ? dark ? "0 12px 40px rgba(99,179,237,0.12)" : "0 12px 40px rgba(66,133,244,0.12)"
          : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const { dark, toggle } = useTheme();
  const [activeNav, setActiveNav] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);

  const bg = dark
    ? "linear-gradient(135deg, #0a0e1a 0%, #0d1b2e 40%, #0a0e1a 100%)"
    : "linear-gradient(135deg, #e8f0fe 0%, #f0f4ff 50%, #e0e8fd 100%)";

  const textPrimary = dark ? "#e2e8f0" : "#1a202c";
  const textSecondary = dark ? "#94a3b8" : "#4a5568";
  const accent = dark ? "#63B3ED" : "#185fa5";

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  return (
    <div style={{ background: bg, minHeight: "100vh", color: textPrimary, fontFamily: "'DM Sans', 'Inter', sans-serif", position: "relative", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;800&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: dark ? "rgba(10,14,26,0.85)" : "rgba(232,240,254,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: dark ? "1px solid rgba(99,179,237,0.12)" : "1px solid rgba(66,133,244,0.15)",
        padding: "0 5vw",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64,
      }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 20,
          color: dark ? "#63B3ED" : "#185fa5",
        }}>AP</span>

        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l)} style={{
              background: activeNav === l
                ? dark ? "rgba(99,179,237,0.15)" : "rgba(66,133,244,0.12)"
                : "transparent",
              border: "none", color: activeNav === l ? accent : textSecondary,
              padding: "6px 14px", borderRadius: 8, cursor: "pointer",
              fontFamily: "inherit", fontSize: 14, fontWeight: 500,
              transition: "all 0.2s",
            }}>
              {l}
            </button>
          ))}
          <button onClick={toggle} style={{
            marginLeft: 8, background: dark ? "rgba(99,179,237,0.1)" : "rgba(66,133,244,0.1)",
            border: dark ? "1px solid rgba(99,179,237,0.3)" : "1px solid rgba(66,133,244,0.3)",
            borderRadius: 8, width: 36, height: 36, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s", color: accent, padding: 0,
          }}>
            {dark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div id="about" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <AnimatedCanvas dark={dark} />
        <div style={{
          position: "relative", zIndex: 2, padding: "0 8vw", width: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 48, flexWrap: "wrap",
        }}>
          {/* Left: text */}
          <div style={{ maxWidth: 580, flex: "1 1 320px" }}>
          <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%", background: "#48BB78",
              boxShadow: "0 0 8px #48BB78",
            }} />
            <span style={{ fontSize: 13, color: "#48BB78", fontWeight: 600, letterSpacing: "0.08em", fontFamily: "'JetBrains Mono', monospace" }}>
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(42px, 7vw, 84px)", fontWeight: 800, lineHeight: 1.05,
            fontFamily: "'Space Grotesk', sans-serif", margin: "0 0 12px",
            color: textPrimary,
          }}>
            Aditya
            <span style={{
              display: "block",
              color: dark ? "#63B3ED" : "#185fa5",
              textShadow: dark
                ? "0 0 40px rgba(99,179,237,0.4)"
                : "0 0 40px rgba(24,95,165,0.2)",
            }}>Prakash</span>
          </h1>

          <p style={{ fontSize: 20, color: textSecondary, margin: "0 0 28px", fontWeight: 300, maxWidth: 560, lineHeight: 1.6 }}>
            {data.tagline}
          </p>

          <p style={{ fontSize: 16, color: textSecondary, maxWidth: 520, lineHeight: 1.8, margin: "0 0 40px" }}>
            {data.summary}
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("Projects")} style={{
              padding: "12px 28px", borderRadius: 10, fontWeight: 600, fontSize: 15,
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
              background: dark ? "linear-gradient(135deg,#63B3ED,#9F7AEA)" : "linear-gradient(135deg,#185fa5,#6b46c1)",
              color: "#fff", border: "none",
              boxShadow: dark ? "0 4px 20px rgba(99,179,237,0.3)" : "0 4px 20px rgba(24,95,165,0.3)",
            }}>
              View Projects
            </button>
            <a href={`mailto:${data.contact.email}`} style={{
              padding: "12px 28px", borderRadius: 10, fontWeight: 600, fontSize: 15,
              textDecoration: "none", fontFamily: "inherit", transition: "all 0.2s",
              background: "transparent",
              color: accent,
              border: dark ? "1px solid rgba(99,179,237,0.4)" : "1px solid rgba(24,95,165,0.4)",
            }}>
              Get In Touch
            </a>
          </div>
          </div>

          {/* Right: photo */}
          <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "center" }}>
            <div style={{
              width: 260, height: 260, borderRadius: "50%", position: "relative",
              background: dark
                ? "linear-gradient(135deg,rgba(99,179,237,0.2),rgba(159,122,234,0.2))"
                : "linear-gradient(135deg,rgba(24,95,165,0.15),rgba(107,70,193,0.15))",
              border: dark ? "2px solid rgba(99,179,237,0.35)" : "2px solid rgba(24,95,165,0.3)",
              boxShadow: dark
                ? "0 0 60px rgba(99,179,237,0.15), 0 0 120px rgba(99,179,237,0.08)"
                : "0 0 60px rgba(24,95,165,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
            }}>
              {/* Replace src below with your actual photo URL or import */}
              <img
                src="https://avatars.githubusercontent.com/Aditya-Prakash07"
                alt="Aditya Prakash"
                onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
              />
              {/* Fallback initials avatar */}
              <div style={{
                display: "none", width: "100%", height: "100%", borderRadius: "50%",
                alignItems: "center", justifyContent: "center",
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 64,
                color: dark ? "#63B3ED" : "#185fa5",
              }}>AP</div>
            </div>
          </div>
        </div>
        <div style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          color: textSecondary, fontSize: 12, letterSpacing: "0.08em",
          animation: "bounce 2s infinite",
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>SCROLL</span>
          <div style={{ fontSize: 18 }}>↓</div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 5vw" }}>

        {/* STATS */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 20, marginBottom: 40,
        }}>
          {data.stats.map((s) => (
            <GlassCard key={s.label} dark={dark} hover style={{ textAlign: "center", padding: "24px 20px" }}>
              <div style={{
                fontSize: 36, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
                color: dark ? "#63B3ED" : "#185fa5",
              }}>{s.value}</div>
              <div style={{ fontSize: 13, color: textSecondary, marginTop: 6, fontWeight: 500 }}>{s.label}</div>
            </GlassCard>
          ))}
        </div>

        {/* SKILLS */}
        <Section id="skills">
          <SectionTitle dark={dark}>Skills</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {Object.entries(data.skills).map(([cat, items]) => (
              <GlassCard key={cat} dark={dark} hover>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: accent, fontFamily: "'JetBrains Mono', monospace", marginBottom: 14 }}>
                  {cat.toUpperCase()}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {items.map((item) => <Tag key={item} label={item} dark={dark} />)}
                </div>
              </GlassCard>
            ))}
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience">
          <SectionTitle dark={dark}>Experience</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {data.experience.map((exp) => (
              <GlassCard key={exp.company} dark={dark} hover>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: textPrimary }}>{exp.role}</div>
                    <div style={{ fontSize: 15, color: accent, fontWeight: 600, marginTop: 2 }}>{exp.company}</div>
                  </div>
                  <div style={{
                    fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: textSecondary,
                    background: dark ? "rgba(99,179,237,0.08)" : "rgba(66,133,244,0.08)",
                    padding: "4px 12px", borderRadius: 6, height: "fit-content",
                    border: dark ? "1px solid rgba(99,179,237,0.2)" : "1px solid rgba(66,133,244,0.2)",
                  }}>
                    {exp.period}
                  </div>
                </div>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {exp.bullets.map((b, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: textSecondary, lineHeight: 1.7 }}>
                      <span style={{ color: accent, marginTop: 2, flexShrink: 0, fontSize: 10 }}>◆</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects">
          <SectionTitle dark={dark}>Projects</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
            {data.projects.map((p) => (
              <GlassCard key={p.name} dark={dark} hover style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: textPrimary }}>{p.name}</span>
                  <span style={{ fontSize: 22, opacity: 0.5 }}>⬡</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tags.map((t) => <Tag key={t} label={t} dark={dark} />)}
                </div>
                <p style={{ fontSize: 14, color: textSecondary, margin: 0, lineHeight: 1.75 }}>{p.description}</p>
              </GlassCard>
            ))}
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education">
          <SectionTitle dark={dark}>Education</SectionTitle>
          <GlassCard dark={dark}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: textPrimary }}>{data.education.school}</div>
                <div style={{ fontSize: 15, color: accent, fontWeight: 500, marginTop: 4 }}>{data.education.degree}</div>
                <div style={{ fontSize: 14, color: textSecondary, marginTop: 8 }}>{data.education.location}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{
                  fontSize: 28, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
                  color: dark ? "#63B3ED" : "#185fa5",
                }}>{data.education.gpa}</div>
                <div style={{ fontSize: 12, color: textSecondary, marginTop: 2 }}>GPA</div>
                <div style={{ fontSize: 13, color: textSecondary, marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>{data.education.period}</div>
              </div>
            </div>
          </GlassCard>

          {/* Certifications */}
          <div style={{ marginTop: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: textPrimary, marginBottom: 16 }}>Certifications</h3>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {data.certifications.map((c) => (
                <GlassCard key={c.name} dark={dark} style={{ padding: "18px 24px", display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: dark ? "rgba(99,179,237,0.15)" : "rgba(66,133,244,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>🏆</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: textPrimary }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: accent, marginTop: 2 }}>{c.issuer}</div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div style={{ marginTop: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: textPrimary, marginBottom: 16 }}>Competitive Programming</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {data.achievements.map((a, i) => (
                <GlassCard key={i} dark={dark} style={{ padding: "16px 24px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ color: accent, fontSize: 12, marginTop: 4, flexShrink: 0 }}>◆</span>
                  <p style={{ margin: 0, fontSize: 14, color: textSecondary, lineHeight: 1.7 }}>{a}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact">
          <SectionTitle dark={dark}>Contact</SectionTitle>
          <GlassCard dark={dark} style={{ textAlign: "center", padding: "52px 32px" }}>
            <h3 style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", margin: "0 0 12px", color: textPrimary }}>
              Let's build something great
            </h3>
            <p style={{ color: textSecondary, fontSize: 16, margin: "0 0 36px", maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
              Open to backend engineering roles, internships, and collaboration opportunities.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 14 }}>
              {[
                { icon: "✉️", label: "Email", href: `mailto:${data.contact.email}`, text: data.contact.email },
                { icon: "📞", label: "Phone", href: `tel:${data.contact.phone}`, text: data.contact.phone },
                { icon: "💼", label: "LinkedIn", href: `https://linkedin.com/in/${data.contact.linkedin}`, text: "LinkedIn Profile" },
                { icon: "⬡", label: "GitHub", href: `https://github.com/${data.contact.github}`, text: "GitHub Profile" },
              ].map((c) => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "12px 20px", borderRadius: 10, textDecoration: "none",
                  background: dark ? "rgba(99,179,237,0.08)" : "rgba(66,133,244,0.08)",
                  border: dark ? "1px solid rgba(99,179,237,0.25)" : "1px solid rgba(66,133,244,0.25)",
                  color: accent, fontSize: 14, fontWeight: 500, transition: "all 0.2s",
                }}>
                  <span style={{ fontSize: 16 }}>{c.icon}</span>
                  {c.text}
                </a>
              ))}
            </div>
          </GlassCard>

          {/* Footer */}
          <div style={{ textAlign: "center", marginTop: 60, paddingBottom: 40, color: textSecondary, fontSize: 13 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em" }}>
              Built with React · Designed by Aditya Prakash · {new Date().getFullYear()}
            </div>
          </div>
        </Section>

      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-8px); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${dark ? "rgba(99,179,237,0.3)" : "rgba(66,133,244,0.3)"}; border-radius: 3px; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
