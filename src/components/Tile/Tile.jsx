import { memo, useState } from "react";
import { payload } from "../../data/data";
import Info from "../Info/Info";
import "./Tile.css";

const { color } = payload;

const Tile = memo(function Tile({ item, dim, onSelect }) {
  const [bad, setBad] = useState(false); // logo failed -> show letter symbol
  const { name, category, logo, symbol, col, row } = item;
  const edge = col < 3 ? " l" : col > 14 ? " r" : "";
  const top = row < 3 ? " t" : ""; // top rows: tooltip opens downwards
  const open = () => onSelect(item);

  return (
    <div
      className={`tile${dim ? " dim" : ""}${edge}${top}`}
      role="button"
      tabIndex={0}
      aria-label={`${name}, ${category}. Show details`}
      onClick={open}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && (e.preventDefault(), open())
      }
      style={{ "--c": color(category), "--col": col + 1, "--row": row + 1 }}
    >
      <small className="name">{name}</small>
      {logo && !bad ? (
        <img
          src={logo}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setBad(true)}
        />
      ) : (
        <b>{symbol}</b>
      )}
      <small className="cat">{category}</small>

      <div className="tip">
        <Info item={item} />
      </div>
    </div>
  );
});

export default Tile;
