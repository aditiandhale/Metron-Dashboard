import { useState } from "react";
import "./Info.css";

// Card content (used by the hover tooltip on desktop and the details sheet on touch/mobile)
export default function Info({ item }) {
  const [badLogo, setBadLogo] = useState(null); // url of a logo that failed to load
  const { name, category, logo, symbol, description, pros, cons } = item;
  const showLogo = logo && badLogo !== logo;

  return (
    <div className="info">
      <div className="info-head">
        {showLogo ? (
          <img
            className="info-logo"
            src={logo}
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setBadLogo(logo)}
          />
        ) : (
          <b className="info-logo info-symbol">{symbol}</b>
        )}
        <div>
          <strong>{name}</strong>
          <em>{category}</em>
        </div>
      </div>

      {description && <p>{description}</p>}
      {pros.length > 0 && (
        <>
          <h4>Pros</h4>
          <ul>
            {pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </>
      )}
      {cons.length > 0 && (
        <>
          <h4>Cons</h4>
          <ul>
            {cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
