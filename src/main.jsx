import React, { createContext, useContext, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./style.css";
import content from "./data.json";
const Settings = createContext();
function readSetting(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}
function SettingsProvider({ children }) {
  const [lang, setLang] = useState(() => readSetting("language", "tr"));
  const [dark, setDark] = useState(
    () => readSetting("theme", "light") === "dark",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
      localStorage.setItem("language", lang);
    } catch {}
  }, [lang, dark]);
  return (
    <Settings.Provider
      value={{
        lang,
        setLang,
        dark,
        setDark,
        text: content[lang] || content.tr,
      }}
    >
      {children}
    </Settings.Provider>
  );
}
function Header() {
  const { lang, setLang, dark, setDark, text: t } = useContext(Settings);
  return (
    <header className="wrap">
      <div className="settings">
        <button aria-pressed={dark} onClick={() => setDark(!dark)}>
          <span className={"switch " + (dark ? "on" : "")}></span>
          {dark ? t.light : t.dark}
        </button>
        <span className="divider">|</span>
        <button onClick={() => setLang(lang === "tr" ? "en" : "tr")}>
          {lang === "tr" ? "ENGLISH" : "TÜRKÇE"}
        </button>
      </div>
      <nav aria-label={t.navigation}>
        <a className="logo" href="#home" aria-label="Osamah Abbood">
          o.
        </a>
        <div>
          <a href="#skills">{t.skills}</a>
          <a href="#projects">{t.projects}</a>
          <a className="outline" href="https://github.com/ozy-world">
            {t.contact}
          </a>
        </div>
      </nav>
    </header>
  );
}
function Hero() {
  const { text: t } = useContext(Settings);
  return (
    <section id="home" className="hero wrap">
      <div>
        <p className="eyebrow">
          <span />
          Osamah Abbood
        </p>
        <h1>{t.title}</h1>
        <p className="intro">{t.intro}</p>
        <div className="actions">
          <a className="primary" href="https://github.com/ozy-world">
            GitHub ↗
          </a>
          <a className="outline" href="#projects">
            {t.seeProjects} ↓
          </a>
        </div>
      </div>
      <img
        className="portrait"
        src="https://github.com/ozy-world.png?size=600"
        alt="Osamah Abbood GitHub avatar"
      />
    </section>
  );
}
function Skills() {
  const { text: t } = useContext(Settings);
  return (
    <section id="skills" className="wrap section">
      <h2>{t.skills}</h2>
      <div className="grid">
        {t.skillList.map((s) => (
          <article key={s.name}>
            <h3>{s.name}</h3>
            <p>{s.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
function Profile() {
  const { text: t } = useContext(Settings);
  return (
    <section className="wrap section">
      <h2>{t.profile}</h2>
      <div className="profile-grid">
        <div>
          <h3>{t.profile}</h3>
          <dl>
            <dt>{t.name}</dt>
            <dd>Osamah Abbood</dd>
            <dt>{t.focus}</dt>
            <dd>Frontend Development</dd>
            <dt>{t.education}</dt>
            <dd>Workintech</dd>
            <dt>GitHub</dt>
            <dd>
              <a href="https://github.com/ozy-world">ozy-world ↗</a>
            </dd>
          </dl>
        </div>
        <div>
          <h3>{t.about}</h3>
          <p>{t.aboutText}</p>
        </div>
      </div>
    </section>
  );
}
function Projects() {
  const { text: t } = useContext(Settings);
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    axios
      .get("https://api.github.com/users/ozy-world/repos", {
        params: { sort: "updated", per_page: 100 },
        signal: controller.signal,
      })
      .then(({ data }) => {
        setProjects(
          data.filter((p) => !p.fork && p.name !== "ozy-world").slice(0, 3),
        );
        setStatus("success");
      })
      .catch((error) => {
        if (!axios.isCancel(error)) setStatus("error");
      });
    return () => controller.abort();
  }, [retry]);
  return (
    <section id="projects" className="wrap section projects">
      <h2>{t.projects}</h2>
      <p className="section-note">{t.projectNote}</p>
      {status === "loading" && <p role="status">{t.loading}</p>}
      {status === "error" && (
        <div role="alert">
          <p>{t.error}</p>
          <button className="outline" onClick={() => setRetry(retry + 1)}>
            {t.retry}
          </button>
        </div>
      )}
      {status === "success" && !projects.length && <p>{t.empty}</p>}
      <div className="grid">
        {projects.map((p, i) => (
          <article key={p.id}>
            <div className={"project-art art-" + i} aria-hidden="true">
              <span>{"{ }"}</span>
              <small>{p.language || "Code"}</small>
            </div>
            <h3>{p.name.replaceAll("-", " ")}</h3>
            <p>{p.name === "osamah-portfolio" ? t.portfolioDescription : (p.description || t.noDescription)}</p>
            <div className="tags">
              <span>{p.language || "GitHub"}</span>
              <span>{t.publicRepo}</span>
            </div>
            <div className="project-links">
              <a href={p.html_url}>GitHub ↗</a>
              {p.homepage && /^https?:\/\//.test(p.homepage) && (
                <a href={p.homepage}>{t.visit} ↗</a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function Footer() {
  const { text: t } = useContext(Settings);
  return (
    <footer>
      <div className="wrap">
        <h2>{t.footer}</h2>
        <div className="footer-row">
          <a href="https://github.com/ozy-world">↗ github.com/ozy-world</a>
          <span>© {new Date().getFullYear()} Osamah Abbood</span>
        </div>
      </div>
    </footer>
  );
}
function App() {
  return (
    <SettingsProvider>
      <a className="skip" href="#home">
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <Skills />
        <Profile />
        <Projects />
      </main>
      <Footer />
    </SettingsProvider>
  );
}
createRoot(document.getElementById("root")).render(<App />);
