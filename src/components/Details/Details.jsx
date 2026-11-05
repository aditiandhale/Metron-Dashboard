import { useEffect } from "react";
import { payload } from "../../data/data";
import Info from "../Info/Info";
import "./Details.css";

const { color } = payload;

export default function Details({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!item) return null;
  return (
    <div className="backdrop" onClick={onClose}>
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
        style={{ "--c": color(item.category) }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <Info item={item} large />
      </div>
    </div>
  );
}