import { payload } from "../../data/data";
import Donut from "../Donut/Donut";
import "./Panel.css";

const { names, counts, integrations, panelRows, color } = payload;

export default function Panel({ query, onQuery, active, onSelect, shown }) {
  const toggle = (c) => onSelect(active === c ? null : c);
  return (
    <section className="panel" style={{ "--rows": panelRows }}>
      <h1>Integrations map</h1>
      <input
        type="search"
        placeholder="Search integrations"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        aria-label="Search integrations"
      />

      <div className="panel-body">
        <Donut
          active={active}
          onSelect={toggle}
          onReset={() => onSelect(null)}
        />
        <ul>
          <li>
            <button
              aria-pressed={!active}
              onClick={() => onSelect(null)}
              style={{ "--c": "var(--fg)" }}
            >
              <i />
              All<em>{integrations.length}</em>
            </button>
          </li>
          {names.map((c) => (
            <li key={c}>
              <button
                aria-pressed={active === c}
                onClick={() => toggle(c)}
                style={{ "--c": color(c) }}
              >
                <i />
                {c}
                <em>{counts[c]}</em>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <p className="count">
        {shown} of {integrations.length} shown
      </p>
    </section>
  );
}
