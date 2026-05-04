"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

const features = [
  {
    icon: "✅",
    title: "Manage Tasks",
    subtitle: "Organize your to-dos",
    description:
      "Plan your assignments and deadlines with smart task management. Prioritize, schedule, and track your academic progress effortlessly.",
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.10)",
  },
{
    icon: "📝",
    title: "Notes",
    subtitle: "Capture your thoughts",
    description:
      "Write, organize, and revisit your study notes anytime. Rich formatting and instant search keep your knowledge at your fingertips.",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.10)",
  },
  {
    icon: "🎯",
    title: "Focus Mode",
    subtitle: "Boost your concentration",
    description:
      "Enter deep work sessions with our distraction-free Focus Mode. Pomodoro timers and ambient sounds keep you in the zone.",
    color: "#34d399",
    bg: "rgba(52,211,153,0.10)",
  },
  {
    icon: "🤖",
    title: "AI Assistant",
    subtitle: "Powered by intelligence",
    description:
      "Get instant help from your AI-powered study companion. Explain concepts, quiz yourself, and accelerate your learning.",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.10)",
  },
];

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
];

export default function StudyZenHome() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [angle, setAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef(0);
  const lastTime = useRef(0);
  const angleRef = useRef(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setQuoteIndex((q) => (q + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!lastTime.current) lastTime.current = timestamp;
      const delta = timestamp - lastTime.current;
      lastTime.current = timestamp;
      if (!isHovered) {
        angleRef.current = (angleRef.current + delta * 0.018) % 360;
        setAngle(angleRef.current);
        const idx = Math.round(angleRef.current / (360 / features.length)) % features.length;
        setActiveFeature(((idx % features.length) + features.length) % features.length);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isHovered]);

  const orbitRadius = 160;
  const cx = 200;
  const cy = 200;

  const getOrbitPos = (index: number, total: number, baseAngle: number) => {
    const theta = ((index / total) * 360 + baseAngle) * (Math.PI / 180);
    return {
      x: cx + orbitRadius * Math.cos(theta),
      y: cy + orbitRadius * Math.sin(theta),
    };
  };

  return (
    <div style={styles.root}>
      <div style={styles.bgGrad} />
      <div style={styles.bgNoise} />
      <FloatingParticles />

      <nav style={styles.nav}>
        <div style={styles.navLogo}>
          <span style={styles.navIcon}>⚡</span>
          <span style={styles.navBrand}>StudyZen</span>
          <span style={styles.navTagline}>Learn Smarter</span>
        </div>
        <div style={styles.navLinks}>
          <a style={styles.navLink} href="#features">Features</a>
          <a style={styles.navLink} href="#quote">Inspiration</a>
          <a style={styles.navLink} href="#cta">Get Started</a>
        </div>
<div style={styles.navActions}>
          <GoogleSignInButton />
        </div>
      </nav>

      <section style={styles.hero}>
        <div
          style={{
            ...styles.heroLeft,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.9s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div style={styles.badge}>
            <span style={styles.badgeDot} />
            AI-Powered Learning
          </div>
          <h1 style={styles.heroTitle}>
            Your Mind,
            <br />
            <span style={styles.heroHighlight}>Supercharged.</span>
          </h1>
          <p style={styles.heroSub}>
            StudyZen combines intelligent task management, smart notes, and deep focus sessions — all in one beautifully designed workspace.
          </p>
<div style={styles.heroCtas}>
            <button style={styles.ctaPrimary}>Start For Free<span style={styles.ctaArrow}>→</span></button>
          </div>
          <div style={styles.heroStats}>
            {[["10K+", "Students"], ["98%", "Satisfaction"], ["4.9★", "Rating"]].map(([val, lab]) => (
              <div key={lab} style={styles.stat}>
                <span style={styles.statVal}>{val}</span>
                <span style={styles.statLab}>{lab}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{ ...styles.orbitWrap, opacity: mounted ? 1 : 0, transition: "opacity 1.2s ease 0.3s" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg width={400} height={400} viewBox="0 0 400 400" style={styles.orbitSvg}>
            <circle cx={cx} cy={cy} r={orbitRadius} fill="none" stroke="rgba(56,189,248,0.15)" strokeWidth={1.5} strokeDasharray="6 6" />
            <circle cx={cx} cy={cy} r={52} fill="rgba(56,189,248,0.07)" />
            <circle cx={cx} cy={cy} r={36} fill="rgba(56,189,248,0.13)" />
            <text x={cx} y={cy + 4} textAnchor="middle" dominantBaseline="middle" fontSize={32}>⚡</text>
            {features.map((_, i) => {
              const pos = getOrbitPos(i, features.length, angle);
              return (
                <line key={i} x1={cx} y1={cy} x2={pos.x} y2={pos.y} stroke={features[i].color} strokeWidth={0.5} opacity={0.3} />
              );
            })}
            {features.map((feat, i) => {
              const pos = getOrbitPos(i, features.length, angle);
              const isActive = i === activeFeature;
              return (
                <g key={i} style={{ cursor: "pointer" }} onClick={() => { setActiveFeature(i); setIsHovered(true); }}>
                  <circle cx={pos.x} cy={pos.y} r={isActive ? 32 : 24} fill={feat.bg} stroke={feat.color} strokeWidth={isActive ? 2.5 : 1.5} opacity={1} style={{ transition: "r 0.3s, stroke-width 0.3s" }} />
                  {isActive && <circle cx={pos.x} cy={pos.y} r={38} fill="none" stroke={feat.color} strokeWidth={1} opacity={0.4} strokeDasharray="4 4" />}
                  <text x={pos.x} y={pos.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize={isActive ? 20 : 16}>{feat.icon}</text>
                </g>
              );
            })}
          </svg>

          <div style={{ ...styles.featureCard, borderColor: features[activeFeature].color, boxShadow: `0 0 40px ${features[activeFeature].color}33` }}>
            <div style={{ ...styles.featureCardIcon, background: features[activeFeature].bg, color: features[activeFeature].color }}>
              {features[activeFeature].icon}
            </div>
            <div style={{ ...styles.featureCardTitle, color: features[activeFeature].color }}>{features[activeFeature].title}</div>
            <div style={styles.featureCardSub}>{features[activeFeature].subtitle}</div>
            <div style={styles.featureCardDesc}>{features[activeFeature].description}</div>
            <div style={styles.featureDots}>
              {features.map((f, i) => (
                <div key={i} onClick={() => { setActiveFeature(i); setIsHovered(true); }} style={{ ...styles.featureDot, background: i === activeFeature ? f.color : "rgba(255,255,255,0.2)", width: i === activeFeature ? 24 : 8 }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="quote" style={styles.quoteSection}>
        <div style={styles.quoteIconBig}>❝</div>
        <p style={styles.quoteText} key={quoteIndex}>
          {quotes[quoteIndex].text}
        </p>
        <div style={styles.quoteAuthor}>— {quotes[quoteIndex].author}</div>
        <div style={styles.quoteDots}>
          {quotes.map((_, i) => (
            <div key={i} onClick={() => setQuoteIndex(i)} style={{ ...styles.quoteDot, opacity: i === quoteIndex ? 1 : 0.3 }} />
          ))}
        </div>
      </section>

      <section id="features" style={styles.gridSection}>
        <h2 style={styles.sectionTitle}>Everything You Need to <span style={{ color: "#38bdf8" }}>Excel</span></h2>
        <div style={styles.grid}>
          {features.map((feat, i) => (
            <div
              key={i}
              style={{ ...styles.gridCard, borderColor: feat.color + "44" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = feat.color; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = feat.color + "44"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
            >
              <div style={{ ...styles.gridIcon, background: feat.bg, color: feat.color }}>{feat.icon}</div>
              <div style={{ ...styles.gridTitle, color: feat.color }}>{feat.title}</div>
              <div style={styles.gridSub}>{feat.subtitle}</div>
              <div style={styles.gridDesc}>{feat.description}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="cta" style={styles.ctaBanner}>
        <div style={styles.ctaBannerGlow} />
        <h2 style={styles.ctaBannerTitle}>Ready to Study Smarter?</h2>
        <p style={styles.ctaBannerSub}>Join thousands of students who've transformed their learning with StudyZen.</p>
        <GoogleSignInButton />
      </section>

      <footer style={styles.footer}>
        <div style={styles.footerLogo}>
          <span style={{ fontSize: 22 }}>⚡</span>
          <span style={{ fontWeight: 700, color: "#38bdf8" }}>StudyZen</span>
        </div>
        <div style={styles.footerCopy}>© 2026 StudyZen. All rights reserved.</div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #050d1a; }
        @keyframes floatUp {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
          100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 6px #38bdf8; }
          50% { box-shadow: 0 0 16px #38bdf8; }
        }
      `}</style>
    </div>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${(i * 17 + 5) % 100}%`,
    size: 3 + (i % 5),
    duration: 8 + (i % 7) * 2,
    delay: i * 0.6,
    color: ["#38bdf8", "#a78bfa", "#34d399", "#fb923c"][i % 4],
  }));

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            bottom: -10,
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            opacity: 0.5,
            animation: `floatUp ${p.duration}s ${p.delay}s infinite linear`,
          }}
        />
      ))}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  root: {
    minHeight: "100vh",
    background: "#050d1a",
    fontFamily: "'DM Sans', sans-serif",
    color: "#e2e8f0",
    position: "relative",
    overflowX: "hidden",
  },
  bgGrad: {
    position: "fixed",
    inset: 0,
    background:
      "radial-gradient(ellipse 80% 60% at 60% 10%, rgba(56,189,248,0.10) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(167,139,250,0.08) 0%, transparent 60%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  bgNoise: {
    position: "fixed",
    inset: 0,
    opacity: 0.4,
    pointerEvents: "none",
    zIndex: 0,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 60px",
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(5,13,26,0.85)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(56,189,248,0.08)",
  },
  navLogo: { display: "flex", alignItems: "center", gap: 10 },
  navIcon: { fontSize: 26 },
  navBrand: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: "#38bdf8" },
  navTagline: { fontSize: 11, color: "#64748b", marginTop: 2, letterSpacing: 1 },
  navLinks: { display: "flex", gap: 36 },
  navLink: { color: "#94a3b8", textDecoration: "none", fontSize: 15, fontWeight: 500, letterSpacing: 0.3 },
  navActions: { display: "flex", gap: 12, alignItems: "center" },
  btnOutline: {
    background: "transparent",
    border: "1px solid rgba(56,189,248,0.4)",
    color: "#38bdf8",
    padding: "9px 22px",
    borderRadius: 10,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: 14,
  },
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "90px 60px 60px",
    maxWidth: 1280,
    margin: "0 auto",
    gap: 40,
    position: "relative",
    zIndex: 1,
  },
  heroLeft: { flex: 1, maxWidth: 540 },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(56,189,248,0.1)",
    border: "1px solid rgba(56,189,248,0.3)",
    color: "#38bdf8",
    padding: "6px 16px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 0.5,
    marginBottom: 28,
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#38bdf8",
    display: "inline-block",
    animation: "pulseGlow 2s infinite",
  },
  heroTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 56,
    fontWeight: 800,
    lineHeight: 1.1,
    color: "#f1f5f9",
    marginBottom: 20,
  },
  heroHighlight: {
    background: "linear-gradient(90deg, #38bdf8, #a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSub: {
    fontSize: 17,
    color: "#94a3b8",
    lineHeight: 1.7,
    marginBottom: 36,
  },
  heroCtas: { display: "flex", gap: 16, marginBottom: 48 },
  ctaPrimary: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "linear-gradient(135deg, #38bdf8, #6366f1)",
    border: "none",
    color: "#fff",
    padding: "14px 30px",
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 4px 24px rgba(56,189,248,0.3)",
  },
  ctaArrow: { fontSize: 18 },
  ctaGhost: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#cbd5e1",
    padding: "14px 24px",
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  heroStats: { display: "flex", gap: 40 },
  stat: { display: "flex", flexDirection: "column" },
  statVal: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24, color: "#38bdf8" },
  statLab: { fontSize: 13, color: "#64748b", fontWeight: 500 },
  orbitWrap: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
    position: "relative",
  },
  orbitSvg: { filter: "drop-shadow(0 0 24px rgba(56,189,248,0.2))" },
  featureCard: {
    background: "rgba(15,25,45,0.92)",
    border: "1.5px solid",
    borderRadius: 20,
    padding: "24px 28px",
    width: 340,
    backdropFilter: "blur(16px)",
    transition: "border-color 0.4s, box-shadow 0.4s",
    animation: "fadeSlide 0.5s ease",
  },
  featureCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    marginBottom: 12,
  },
  featureCardTitle: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 20,
    marginBottom: 4,
  },
  featureCardSub: { fontSize: 13, color: "#64748b", fontWeight: 500, marginBottom: 12 },
  featureCardDesc: { fontSize: 14, color: "#94a3b8", lineHeight: 1.7, marginBottom: 20 },
  featureDots: { display: "flex", gap: 8, alignItems: "center" },
  featureDot: {
    height: 8,
    borderRadius: 4,
    cursor: "pointer",
    transition: "width 0.3s, background 0.3s",
  },
  quoteSection: {
    textAlign: "center",
    padding: "60px 40px",
    maxWidth: 760,
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  quoteIconBig: {
    fontSize: 60,
    color: "#38bdf8",
    opacity: 0.3,
    lineHeight: 1,
    marginBottom: 8,
    fontFamily: "Georgia, serif",
  },
  quoteText: {
    fontFamily: "'Syne', sans-serif",
    fontStyle: "italic",
    fontSize: 22,
    color: "#cbd5e1",
    lineHeight: 1.7,
    marginBottom: 16,
    animation: "fadeSlide 0.6s ease",
  },
  quoteAuthor: { color: "#38bdf8", fontWeight: 600, fontSize: 15, marginBottom: 20 },
  quoteDots: { display: "flex", gap: 10, justifyContent: "center" },
  quoteDot: { width: 8, height: 8, borderRadius: "50%", background: "#38bdf8", cursor: "pointer", transition: "opacity 0.3s" },
  gridSection: {
    padding: "60px 60px 80px",
    maxWidth: 1280,
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  sectionTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 36,
    fontWeight: 800,
    color: "#f1f5f9",
    textAlign: "center",
    marginBottom: 48,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 24,
  },
  gridCard: {
    background: "rgba(15,25,45,0.8)",
    border: "1.5px solid",
    borderRadius: 20,
    padding: "32px",
    backdropFilter: "blur(12px)",
    transition: "border-color 0.3s, transform 0.2s",
    cursor: "default",
  },
  gridIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    marginBottom: 16,
  },
  gridTitle: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 20,
    marginBottom: 4,
  },
  gridSub: { fontSize: 13, color: "#64748b", fontWeight: 500, marginBottom: 12 },
  gridDesc: { fontSize: 14, color: "#94a3b8", lineHeight: 1.7 },
  ctaBanner: {
    margin: "0 60px 80px",
    padding: "64px 48px",
    background: "linear-gradient(135deg, rgba(56,189,248,0.1), rgba(99,102,241,0.1))",
    border: "1.5px solid rgba(56,189,248,0.2)",
    borderRadius: 28,
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    zIndex: 1,
  },
  ctaBannerGlow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: 400,
    height: 200,
    background: "radial-gradient(ellipse, rgba(56,189,248,0.15) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  ctaBannerTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 38,
    fontWeight: 800,
    color: "#f1f5f9",
    marginBottom: 16,
    position: "relative",
  },
  ctaBannerSub: {
    fontSize: 17,
    color: "#94a3b8",
    marginBottom: 36,
    maxWidth: 480,
    margin: "0 auto 36px",
    position: "relative",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 60px",
    borderTop: "1px solid rgba(56,189,248,0.08)",
    position: "relative",
    zIndex: 1,
  },
  footerLogo: { display: "flex", alignItems: "center", gap: 8 },
  footerCopy: { fontSize: 13, color: "#475569" },
};
