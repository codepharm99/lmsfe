import React, { useRef } from "react";
import "./nav.css";

export default function Nav({ items, activeKey, onChange, brand = "LMSfe" }) {
  const listRef = useRef(null);

  const onKey = (e, idx) => {
    const buttons = listRef.current?.querySelectorAll("button.nav-btn") ?? [];
    if (!buttons.length) return;

    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % buttons.length;
    if (e.key === "ArrowLeft")  next = (idx - 1 + buttons.length) % buttons.length;
    if (e.key === "Home")       next = 0;
    if (e.key === "End")        next = buttons.length - 1;

    if (next !== idx) { e.preventDefault(); buttons[next].focus(); }
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onChange(items[idx].key); }
  };

  return (
    <nav className="topbar" aria-label="Main">
      <div className="brand">{brand}</div>
      <ul className="nav" ref={listRef} role="menubar">
        {items.map((it, i) => {
          const active = it.key === activeKey;
          return (
            <li key={it.key} role="none">
              <button
                className={`nav-btn ${active ? "active" : ""}`}
                role="menuitem"
                aria-current={active ? "page" : undefined}
                onClick={() => onChange(it.key)}
                onKeyDown={(e) => onKey(e, i)}
              >
                {it.title}
                {it.badge != null && <span className="nav-badge">{it.badge}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
