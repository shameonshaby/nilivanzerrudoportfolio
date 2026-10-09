import { useState, useEffect } from "react";

const PROFILE = {
  name: "Nil Ivan Zerrudo",
  initials: "NIZ",
  role: "Web developer and designer",
  headline: "I build fast, bold websites people remember.",
  bio: [
    "I'm a developer who cares about how things look and how they work. I turn rough ideas into clean, usable websites and apps.",
    "When I'm not coding, I'm sketching layouts, testing new tools, or helping friends launch their projects.",
  ],
  skills: ["React", "JavaScript", "HTML & CSS", "UI design", "Git", "Figma"],
  email: "nilivanzerrudo@gmail.com",
  highlights: [
    { label: "Projects launched", value: "12+" },
    { label: "Years building", value: "4" },
    { label: "Design-to-code flow", value: "100%" },
  ],
};

const SERVICES = [
  {
    slug: "web",
    title: "Web builds",
    text: "I shape high-converting experiences with thoughtful UX, responsive frontends, and smooth interactions that feel premium on every screen.",
  },
  {
    slug: "design",
    title: "UI systems",
    text: "I translate messy ideas into clean design systems, consistent components, and polished interfaces that teams can actually ship and scale.",
  },
  {
    slug: "strategy",
    title: "Product thinking",
    text: "I help narrow the problem, focus the message, and turn rough requirements into a clear digital direction with measurable outcomes.",
  },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "strategy", label: "Strategy" },
  { id: "design", label: "Design" },
  { id: "web", label: "Web" },
];

// The last item is null on purpose: it shows as a blank frame.
const WORKS = [
  {
    title: "Social media management",
    image: "/images/social.jpg",
    category: "strategy",
    metric: "3x engagement lift",
    text: "Managed content calendars, campaign planning, and creative execution across social channels to keep messaging consistent and performance-focused.",
  },
  {
    title: "UI and UX design",
    image: "/images/uiux.jpg",
    category: "design",
    metric: "Faster product decisions",
    text: "Worked through user flows, wireframes, and visual polish to create interfaces that were clearer, easier to use, and easier to trust.",
  },
  {
    title: "Web development",
    image: "/images/web.jpg",
    category: "web",
    metric: "Responsive builds",
    text: "Built fast frontends and landing pages with strong structure, accessibility, and reusable components that made updates less painful.",
  },
  {
    title: "AI annotator",
    image: "/images/ai.jpg",
    category: "strategy",
    metric: "Quality-first labeling",
    text: "Annotated training data with consistency, edge-case awareness, and careful quality checks so the model outputs stayed reliable and usable.",
  },
  {
    title: "Chatter",
    image: "/images/chatter.jpg",
    category: "web",
    metric: "Community-first support",
    text: "Helped maintain conversations, resolve issues quickly, and create a smoother experience for people interacting with the platform daily.",
  },
  null,
];

const css = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap");

:root{
  --black:#070707;
  --black-soft:#121212;
  --orange:#ff6a00;
  --orange-soft:#ffb27a;
  --line:#2a2a2a;
  --text:#f5f0eb;
  --muted:#d7d1ca;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:radial-gradient(circle at top, rgba(255,106,0,.18), transparent 26%), var(--black);color:var(--text);font-family:"Bricolage Grotesque",system-ui,sans-serif;line-height:1.55}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
a{color:inherit}
img{max-width:100%;display:block}
:focus-visible{outline:3px solid var(--orange);outline-offset:3px}

.site{min-height:100vh;display:flex;flex-direction:column}
.wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 24px}

.header{position:sticky;top:0;z-index:20;border-bottom:1px solid rgba(255,255,255,.08);backdrop-filter:blur(12px);background:rgba(7,7,7,.72)}
.header .wrap{display:flex;justify-content:space-between;align-items:center;padding-top:18px;padding-bottom:18px;gap:16px}
.logo{font-weight:800;font-size:1.3rem;letter-spacing:-.03em}
.logo span{color:var(--orange)}
.nav{display:flex;gap:18px;flex-wrap:wrap}
.nav button{padding:8px 14px;border-radius:999px;font-weight:700;color:var(--orange-soft);border:1px solid transparent;transition:all .2s ease}
.nav button:hover{color:var(--text);border-color:rgba(255,255,255,.12);background:rgba(255,255,255,.02)}
.nav button[aria-current="page"]{color:var(--text);background:rgba(255,106,0,.12);border-color:rgba(255,106,0,.4)}

.about{padding:72px 0 80px;display:grid;grid-template-columns:1.55fr 1fr;gap:56px;align-items:center}
.role{color:var(--orange);font-weight:700;margin-bottom:16px;letter-spacing:.08em;text-transform:uppercase;font-size:.75rem}
.about h1{font-size:clamp(2.8rem,6vw,5rem);line-height:.94;font-weight:800;letter-spacing:-.06em;margin-bottom:24px}
.about p{max-width:60ch;color:var(--muted);margin-bottom:16px;font-size:1.08rem}

.portrait-wrap{display:grid;justify-items:center;gap:18px}
.portrait{position:relative;aspect-ratio:1/1;width:min(100%, 360px);background:linear-gradient(135deg, #ff9b4d, var(--orange));color:var(--black);display:grid;place-items:center;font-size:clamp(4rem,12vw,8rem);font-weight:800;letter-spacing:-.05em;border-radius:28px;box-shadow:0 24px 60px rgba(255,106,0,.26);transform:rotate(-7deg)}
.portrait::before{content:"Available for freelance work";position:absolute;left:20px;bottom:18px;padding:8px 12px;border-radius:999px;background:rgba(7,7,7,.88);color:var(--text);font-size:.72rem;font-weight:700;letter-spacing:.04em;border:1px solid rgba(255,255,255,.1)}

.stats{display:grid;grid-template-columns:repeat(3, minmax(0, 1fr));gap:12px;margin:30px 0 20px}
.stat{border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02);padding:18px 16px;border-radius:18px}
.stat-value{font-size:1.5rem;font-weight:800;letter-spacing:-.04em;color:var(--text);margin-bottom:4px}
.stat-label{font-size:.78rem;color:var(--orange-soft);text-transform:uppercase;letter-spacing:.08em}

.service-switcher{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:18px}
.service{padding:10px 16px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.02);color:var(--orange-soft);font-weight:700;transition:all .2s ease}
.service:hover{border-color:rgba(255,106,0,.5);color:var(--text)}
.service.is-active{background:rgba(255,106,0,.12);border-color:rgba(255,106,0,.6);color:var(--text)}
.service-panel{padding:18px 20px;border-radius:20px;border:1px solid rgba(255,255,255,.1);background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01));color:var(--muted)}
.service-panel strong{display:block;color:var(--text);font-size:1.02rem;margin-bottom:8px}

.skills{display:flex;flex-wrap:wrap;gap:10px;margin:28px 0}
.skills li{list-style:none;border:1px solid rgba(255,106,0,.55);color:var(--orange);padding:7px 14px;font-weight:700;font-size:.9rem;border-radius:999px;background:rgba(255,106,0,.06)}

.btn{display:inline-flex;align-items:center;justify-content:center;background:var(--orange);color:var(--black);font-weight:800;padding:14px 26px;text-decoration:none;border:2px solid var(--orange);border-radius:999px;transition:transform .2s ease, background .2s ease, color .2s ease;box-shadow:0 8px 24px rgba(255,106,0,.18)}
.btn:hover{background:transparent;color:var(--orange);transform:translateY(-1px)}
.btn.ghost{background:transparent;color:var(--orange)}
.btn.ghost:hover{background:var(--orange);color:var(--black)}
.actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:8px}

.works{padding:64px 0 96px}
.works-head{display:flex;justify-content:space-between;align-items:end;gap:18px;flex-wrap:wrap;margin-bottom:24px}
.works h2{font-size:clamp(2.2rem,5vw,3.5rem);font-weight:800;letter-spacing:-.04em;margin-bottom:8px}
.works .sub{color:var(--orange-soft);font-size:1rem}
.filter-row{display:flex;flex-wrap:wrap;gap:10px}
.filter{padding:8px 16px;border:1px solid rgba(255,255,255,.12);border-radius:999px;color:var(--orange-soft);font-weight:700;transition:all .2s ease}
.filter:hover{border-color:rgba(255,106,0,.5);color:var(--text)}
.filter.is-active{background:rgba(255,106,0,.12);border-color:rgba(255,106,0,.6);color:var(--text)}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.frame{position:relative;display:block;width:100%;aspect-ratio:1/1;border:2px solid var(--line);background:#180d06;overflow:hidden;padding:0;border-radius:22px;transition:transform .25s ease, border-color .25s ease, box-shadow .25s ease}
.frame:hover{transform:translateY(-4px);border-color:var(--orange);box-shadow:0 16px 28px rgba(0,0,0,.35)}
.frame img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(1.05)}
.frame.is-active{border-color:var(--orange)}
.ph{position:absolute;inset:0;display:grid;place-items:center;font-size:6rem;font-weight:800;color:var(--orange)}
.frame-label{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,.9));color:var(--text);padding:18px 16px 14px;display:flex;justify-content:space-between;align-items:flex-end;gap:12px;font-weight:800;border-top:1px solid rgba(255,255,255,.08)}
.frame-label span:last-child{font-size:.77rem;color:var(--orange-soft);font-weight:700;text-transform:uppercase;letter-spacing:.08em}
.frame.blank{border:2px dashed rgba(255,255,255,.18);background:transparent;cursor:default}
.frame.blank:hover{transform:none;box-shadow:none;border-color:rgba(255,255,255,.18)}

.modal-back{position:fixed;inset:0;background:rgba(0,0,0,.82);display:grid;place-items:center;padding:24px;z-index:30}
.modal{background:var(--black-soft);border:2px solid var(--orange);border-radius:24px;width:100%;max-width:560px;max-height:90vh;overflow:auto;box-shadow:0 30px 80px rgba(0,0,0,.45)}
.modal-pic{position:relative;aspect-ratio:4/3;background:#1c1004}
.modal-pic img{width:100%;height:100%;object-fit:cover;display:block}
.modal-body{padding:24px}
.modal-body h3{font-size:1.7rem;font-weight:800;letter-spacing:-.03em;margin-bottom:10px}
.modal-body p{margin-bottom:20px;color:var(--muted)}
.modal-meta{display:inline-block;padding:8px 12px;border-radius:999px;border:1px solid rgba(255,106,0,.35);background:rgba(255,106,0,.08);color:var(--orange);font-weight:700;font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px}

.footer{margin-top:auto;border-top:1px solid rgba(255,255,255,.08);padding:22px 0;color:var(--orange-soft);font-size:.9rem}

@media (max-width:760px){
  .about{grid-template-columns:1fr;gap:36px;padding-top:48px}
  .portrait-wrap{order:-1}
  .portrait{max-width:240px}
  .stats{grid-template-columns:repeat(3, minmax(0, 1fr));}
  .grid{grid-template-columns:repeat(2,1fr);gap:14px}
}
@media (max-width:520px){
  .stats{grid-template-columns:1fr;}
  .grid{grid-template-columns:1fr}
  .header .wrap{padding-top:12px;padding-bottom:12px}
  .nav{gap:8px}
  .nav button{padding:8px 12px}
}
@media (prefers-reduced-motion:reduce){*{transition:none !important;scroll-behavior:auto !important}}
`;

function Picture({ w }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="ph" aria-hidden="true">{w.title.charAt(0)}</span>;
  return <img src={w.image} alt={w.title} onError={() => setFailed(true)} />;
}

function About({ goWorks, activeService, setActiveService }) {
  const activeDetails = SERVICES.find((service) => service.slug === activeService) ?? SERVICES[0];

  return (
    <section className="wrap about" aria-labelledby="about-title">
      <div>
        <p className="role">{PROFILE.role}</p>
        <h1 id="about-title">{PROFILE.headline}</h1>
        {PROFILE.bio.map((line) => (
          <p key={line}>{line}</p>
        ))}

        <div className="stats" aria-label="Quick facts">
          {PROFILE.highlights.map((item) => (
            <div className="stat" key={item.label}>
              <div className="stat-value">{item.value}</div>
              <div className="stat-label">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="service-switcher" aria-label="Service overview selector">
          {SERVICES.map((service) => (
            <button
              key={service.slug}
              type="button"
              className={`service ${service.slug === activeService ? "is-active" : ""}`}
              aria-pressed={service.slug === activeService}
              onClick={() => setActiveService(service.slug)}
            >
              {service.title}
            </button>
          ))}
        </div>

        <div className="service-panel" aria-live="polite">
          <strong>{activeDetails.title}</strong>
          <span>{activeDetails.text}</span>
        </div>

        <ul className="skills" aria-label="Skills">
          {PROFILE.skills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="actions">
          <button className="btn" type="button" onClick={goWorks}>See my works</button>
          <a
            className="btn ghost"
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PROFILE.email)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Email me
          </a>
        </div>
      </div>

      <div className="portrait-wrap">
        <div className="portrait" aria-hidden="true">{PROFILE.initials}</div>
      </div>
    </section>
  );
}

function Works() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filteredWorks = WORKS.filter((work) => !work || filter === "all" || work.category === filter);

  return (
    <section className="wrap works" aria-labelledby="works-title">
      <div className="works-head">
        <div>
          <h2 id="works-title">My works</h2>
          <p className="sub">Select a frame to see the details.</p>
        </div>

        <div className="filter-row" aria-label="Work categories filter">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`filter ${filter === item.id ? "is-active" : ""}`}
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid">
        {filteredWorks.map((w, i) =>
          w ? (
            <button
              key={w.title}
              type="button"
              className={`frame ${selected && selected.title === w.title ? "is-active" : ""}`}
              onClick={() => setSelected(w)}
            >
              <Picture w={w} />
              <span className="frame-label">
                <span>{w.title}</span>
                <span>{w.metric}</span>
              </span>
            </button>
          ) : (
            <div key={`blank-${i}`} className="frame blank" aria-hidden="true" />
          )
        )}
      </div>

      {selected && (
        <div className="modal-back" onClick={() => setSelected(null)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-pic">
              <Picture w={selected} />
            </div>
            <div className="modal-body">
              <span className="modal-meta">{selected.metric}</span>
              <h3>{selected.title}</h3>
              <p>{selected.text}</p>
              <button className="btn" type="button" autoFocus onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState("about");
  const [activeService, setActiveService] = useState(SERVICES[0].slug);

  return (
    <div className="site">
      <style>{css}</style>
      <header className="header">
        <div className="wrap">
          <div className="logo">
            {PROFILE.name}
            <span>.</span>
          </div>
          <nav className="nav" aria-label="Main">
            <button type="button" aria-current={page === "about" ? "page" : undefined} onClick={() => setPage("about")}>
              About me
            </button>
            <button type="button" aria-current={page === "works" ? "page" : undefined} onClick={() => setPage("works")}>
              My works
            </button>
          </nav>
        </div>
      </header>

      <main>
        {page === "about" ? (
          <About goWorks={() => setPage("works")} activeService={activeService} setActiveService={setActiveService} />
        ) : (
          <Works />
        )}
      </main>

      <footer className="footer">
        <div className="wrap">{PROFILE.email}</div>
      </footer>
    </div>
  );
}