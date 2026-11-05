import { useState } from "react";
import { payload } from "../../data/data";
import "./Header.css";

const { names } = payload;

const LINKS = ["Home", "Product & Services", "Integrations", "Partners", "Testimonials", "Resources", "Careers"];

export default function Header({ active, onSelect }) {
  const [open, setOpen] = useState(false); // mobile menu
  const [sub, setSub] = useState(false);   // integrations submenu (tap)
  const pick = (c) => { onSelect(c); setSub(false); setOpen(false); };

  return (
    <header className="top">
      <a className="brand" href="#" aria-label="Metron Security home">
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="20" fill="#e5252a" />
          <path d="M12 28V16m8 12V11m8 17V20" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <span><b>metron</b><small>security</small></span>
      </a>

      <nav className={open ? "open" : ""} aria-label="Main">
        {LINKS.map((l) =>
          l === "Integrations" ? (
            <div className={`dd${sub ? " open" : ""}`} key={l}>
              <button className="link" aria-expanded={sub} onClick={() => setSub(!sub)}>{l} ▾</button>
              <ul className="menu">
                <li><button aria-pressed={!active} onClick={() => pick(null)}>All integrations</button></li>
                {names.map((c) => (
                  <li key={c}><button aria-pressed={active === c} onClick={() => pick(c)}>{c}</button></li>
                ))}
              </ul>
            </div>
          ) : (
            <a key={l} className="link" href="#">{l}{l === "Product & Services" && " ▾"}</a>
          )
        )}
      </nav>

      <a className="cta" href="#">Contact Us</a>
      <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
    </header>
  );
}
