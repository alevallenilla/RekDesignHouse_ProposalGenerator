/* ═══════════════════════════════════════════════════════
   REK Design Studio — Work Suite Navigation
   Include once per tool: <script src="/shared/nav.js"></script>
   To add a new tool: add an entry to TOOLS below.
═══════════════════════════════════════════════════════ */
(function () {

  const NAV_W = 220;

  /* ── Tool registry ──────────────────────────────────
     soon: true  → greyed out, not clickable
     soon: false → active link
  ─────────────────────────────────────────────────── */
  const TOOLS = [
    {
      name: 'Proposals',
      path: '/proposal',
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="10" height="13" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M5 5h5M5 8h5M5 11h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
    },
    {
      name: 'Procurement',
      path: '/procurement',
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L14 5v6l-6 3.5L2 11V5l6-3.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M2 5l6 3.5M8 8.5V15M14 5l-6 3.5" stroke="currentColor" stroke-width="1.2"/></svg>`,
    },
    {
      name: 'Tracker',
      path: '/tracker',
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.5" stroke="currentColor" stroke-width="1.2"/><path d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14M3.64 3.64l1.06 1.06M11.3 11.3l1.06 1.06M12.36 3.64l-1.06 1.06M4.7 11.3l-1.06 1.06" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
    },
    {
      name: 'Report',
      path: '/report',
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="10" height="13" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M5 4.5h5M5 7h5M5 9.5h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.18" stroke="currentColor" stroke-width="1.1"/><path d="M12 11v1.5l.8.8" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>`,
    },
    {
      name: 'Project Management',
      path: '/projects',
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="4" height="9" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="6" y="2" width="4" height="6" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="11" y="2" width="4" height="12" rx="1" stroke="currentColor" stroke-width="1.2"/></svg>`,
    },
  ];

  /* ── CSS ──────────────────────────────────────────── */
  const css = `
    #ws-nav {
      position: fixed; left: 0; top: 0; bottom: 0; width: ${NAV_W}px;
      background: #FAF9F5;
      display: flex; flex-direction: column;
      z-index: 150;
      border-right: 1px solid rgba(37,14,15,0.10);
      font-family: 'Inter', sans-serif;
    }
    .ws-brand {
      padding: 22px 20px 20px;
      border-bottom: 1px solid rgba(37,14,15,0.08);
      flex-shrink: 0; text-decoration: none;
      display: block;
    }
    .ws-brand-label {
      font-size: 10px; font-weight: 600; letter-spacing: 0.24em;
      text-transform: uppercase; color: rgba(37,14,15,0.38);
      display: block; line-height: 1;
    }
    .ws-tools {
      flex: 1; padding: 10px 0; overflow-y: auto;
    }
    .ws-tools::-webkit-scrollbar { width: 3px; }
    .ws-tools::-webkit-scrollbar-track { background: transparent; }
    .ws-tools::-webkit-scrollbar-thumb { background: rgba(37,14,15,0.12); border-radius: 2px; }
    .ws-tool {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px; text-decoration: none;
      border-left: 2px solid transparent;
      transition: background 0.15s, border-color 0.15s;
      margin: 1px 8px; border-radius: 7px;
      cursor: pointer;
    }
    .ws-tool:not(.ws-soon):hover {
      background: rgba(37,14,15,0.05);
    }
    .ws-tool.ws-active {
      background: rgba(124,49,53,0.08);
      border-left-color: #7C3135;
    }
    .ws-tool.ws-soon { cursor: default; }
    .ws-tool-icon {
      color: rgba(37,14,15,0.38); flex-shrink: 0;
      display: flex; align-items: center;
    }
    .ws-tool.ws-active .ws-tool-icon { color: rgba(37,14,15,0.82); }
    .ws-tool.ws-soon   .ws-tool-icon { color: rgba(37,14,15,0.20); }
    .ws-tool-info { display: flex; flex-direction: column; gap: 4px; }
    .ws-tool-name {
      font-size: 12px; font-weight: 400;
      color: rgba(37,14,15,0.48); letter-spacing: 0.01em; line-height: 1;
    }
    .ws-tool.ws-active .ws-tool-name { color: #250E0F; font-weight: 500; }
    .ws-tool.ws-soon   .ws-tool-name { color: rgba(37,14,15,0.28); }
    .ws-tool-badge {
      font-size: 7px; font-weight: 600; letter-spacing: 0.14em;
      text-transform: uppercase; color: rgba(37,14,15,0.35);
      background: rgba(37,14,15,0.07); padding: 2px 5px; border-radius: 3px;
      align-self: flex-start;
    }

    /* ── Body offset ───────────────────────────── */
    body { padding-left: ${NAV_W}px !important; }

    /* ── Print: hide sidebar ───────────────────── */
    @media print {
      #ws-nav { display: none !important; }
      body    { padding-left: 0 !important; }
    }
  `;

  /* ── Inject CSS ───────────────────────────────────── */
  const styleEl = document.createElement('style');
  styleEl.id = 'ws-nav-style';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── Build nav HTML ───────────────────────────────── */
  const cur = window.location.pathname.replace(/\/+$/, '') || '/';

  const toolsHTML = TOOLS.map(t => {
    const active = cur === t.path || cur.startsWith(t.path + '/');
    return `<a href="${t.path}" class="ws-tool${active ? ' ws-active' : ''}">
      <span class="ws-tool-icon">${t.icon}</span>
      <div class="ws-tool-info">
        <span class="ws-tool-name">${t.name}</span>
      </div>
    </a>`;
  }).join('');

  const nav = document.createElement('aside');
  nav.id = 'ws-nav';
  nav.innerHTML = `
    <a class="ws-brand" href="/proposal">
      <span class="ws-brand-label">Work Suite</span>
    </a>
    <nav class="ws-tools">${toolsHTML}</nav>
  `;

  /* ── Inject into DOM ──────────────────────────────── */
  function inject() {
    document.body.insertBefore(nav, document.body.firstChild);
  }
  if (document.body) { inject(); }
  else { document.addEventListener('DOMContentLoaded', inject); }

})();
