import { useMemo, useState } from "react";
import { payload } from "./data/data";
import Header from "./components/Header/Header";
import Tile from "./components/Tile/Tile";
import Panel from "./components/Panel/Panel";
import Details from "./components/Details/Details";
import "./App.css";

const { integrations } = payload;

export default function App() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(null); // selected category, null = all
  const [selected, setSelected] = useState(null); // tile opened in the details sheet

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return new Set(
      integrations
        .filter(
          (i) =>
            (!active || i.category === active) &&
            i.name.toLowerCase().includes(q),
        )
        .map((i) => i.id),
    );
  }, [query, active]);

  return (
    <>
      <Header active={active} onSelect={setActive} />
      <main>
        <div className="map">
          {integrations.map((i) => (
            <Tile
              key={i.id}
              item={i}
              dim={!visible.has(i.id)}
              onSelect={setSelected}
            />
          ))}
          <Panel
            query={query}
            onQuery={setQuery}
            active={active}
            onSelect={setActive}
            shown={visible.size}
          />
        </div>
      </main>
      <Details item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
