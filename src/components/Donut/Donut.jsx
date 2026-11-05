import "./Donut.css";
import { payload } from "../../data/data";

const { names, counts, integrations, color } = payload;

// r = 100 / 2π makes the circumference exactly 100, so dash lengths are percentages.
const R = 100 / (2 * Math.PI);

export default function Donut({ active, onSelect, onReset }) {
  let offset = 0;
  return (
    <svg viewBox="0 0 42 42" className="donut" role="img" aria-label="Integrations per category">
      {names.map((c) => {
        const pct = (counts[c] / integrations.length) * 100;
        const arc = (
          <circle key={c} cx="21" cy="21" r={R} fill="none" stroke={color(c)} strokeWidth="6"
            strokeDasharray={`${pct - 0.5} ${100 - pct + 0.5}`} strokeDashoffset={25 - offset}
            opacity={!active || active === c ? 1 : 0.2} onClick={() => onSelect(c)}>
            <title>{`${c}: ${counts[c]}`}</title>
          </circle>
        );
        offset += pct;
        return arc;
      })}
      <text x="21" y="22.5" textAnchor="middle" className="donut-total" onClick={onReset}>{integrations.length}<title>Show all</title></text>
    </svg>
  );
}
