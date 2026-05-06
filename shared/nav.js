/* ═══════════════════════════════════════════════════════
   REK Design Studio — Work Suite Navigation
   Include once per tool: <script src="/shared/nav.js"></script>
   To add a new tool: add an entry to TOOLS below.
═══════════════════════════════════════════════════════ */
(function () {

  const NAV_W = 200;

  /* ── Tool registry ──────────────────────────────────
     soon: true  → greyed out, not clickable
     soon: false → active link
  ─────────────────────────────────────────────────── */
  const TOOLS = [
    {
      name: 'Proposal Generator',
      path: '/proposal',
      soon: false,
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="10" height="13" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M5 5h5M5 8h5M5 11h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
    },
    {
      name: 'Concept Design',
      path: '/concept',
      soon: true,
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2a4 4 0 014 4c0 1.5-.8 2.8-2 3.5V11H6V9.5A4 4 0 018 2z" stroke="currentColor" stroke-width="1.2"/><path d="M6 12h4M6.5 14h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
    },
    {
      name: 'Invoice Generator',
      path: '/invoice',
      soon: true,
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 1h10v14l-2-1.5-2 1.5-2-1.5L5 15 3 13.5V1z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M6 5h4M6 8h4M6 11h2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
    },
    {
      name: 'Procurement Tool',
      path: '/procurement',
      soon: true,
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L14 5v6l-6 3.5L2 11V5l6-3.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M2 5l6 3.5M8 8.5V15M14 5l-6 3.5" stroke="currentColor" stroke-width="1.2"/></svg>`,
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      soon: true,
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.2"/></svg>`,
    },
    {
      name: 'Finance / RevOps',
      path: '/finance',
      soon: true,
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 12l4-5 3 3 4-6 3 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 15h14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
    },
  ];

  /* ── CSS ──────────────────────────────────────────── */
  const css = `
    #ws-nav {
      position: fixed; left: 0; top: 0; bottom: 0; width: ${NAV_W}px;
      background: #1A2419;
      display: flex; flex-direction: column;
      z-index: 150;
      border-right: 1px solid rgba(242,237,228,0.07);
      font-family: 'Inter', sans-serif;
    }
    .ws-brand {
      padding: 22px 18px 18px;
      border-bottom: 1px solid rgba(242,237,228,0.07);
      flex-shrink: 0; text-decoration: none;
      display: block;
    }
    .ws-brand-rek {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px; font-weight: 600; color: #F2EDE4;
      letter-spacing: 0.04em; display: block; line-height: 1;
    }
    .ws-brand-label {
      font-size: 8px; font-weight: 500; letter-spacing: 0.22em;
      text-transform: uppercase; color: rgba(242,237,228,0.28);
      display: block; margin-top: 5px;
    }
    .ws-tools {
      flex: 1; padding: 10px 0; overflow-y: auto;
    }
    .ws-tools::-webkit-scrollbar { width: 3px; }
    .ws-tools::-webkit-scrollbar-track { background: transparent; }
    .ws-tools::-webkit-scrollbar-thumb { background: rgba(242,237,228,0.1); border-radius: 2px; }
    .ws-tool {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 16px; text-decoration: none;
      border-left: 2px solid transparent;
      transition: background 0.15s, border-color 0.15s;
    }
    .ws-tool:not(.ws-soon):hover {
      background: rgba(242,237,228,0.05);
    }
    .ws-tool.ws-active {
      background: rgba(107,31,42,0.2);
      border-left-color: #6B1F2A;
    }
    .ws-tool.ws-soon { cursor: default; }
    .ws-tool-icon {
      color: rgba(242,237,228,0.28); flex-shrink: 0;
      display: flex; align-items: center;
    }
    .ws-tool.ws-active .ws-tool-icon { color: rgba(242,237,228,0.72); }
    .ws-tool.ws-soon   .ws-tool-icon { color: rgba(242,237,228,0.14); }
    .ws-tool-info { display: flex; flex-direction: column; gap: 4px; }
    .ws-tool-name {
      font-size: 11px; font-weight: 500;
      color: rgba(242,237,228,0.42); letter-spacing: 0.01em; line-height: 1;
    }
    .ws-tool.ws-active .ws-tool-name { color: rgba(242,237,228,0.88); }
    .ws-tool.ws-soon   .ws-tool-name { color: rgba(242,237,228,0.2); }
    .ws-tool-badge {
      font-size: 7px; font-weight: 600; letter-spacing: 0.14em;
      text-transform: uppercase; color: #8C7A3A;
      background: rgba(140,122,58,0.14); padding: 2px 5px; border-radius: 3px;
      align-self: flex-start;
    }
    .ws-nav-footer {
      padding: 12px 16px;
      font-size: 8px; letter-spacing: 0.18em; text-transform: uppercase;
      color: rgba(242,237,228,0.13);
      border-top: 1px solid rgba(242,237,228,0.06);
      flex-shrink: 0;
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
    if (t.soon) {
      return `<div class="ws-tool ws-soon">
        <span class="ws-tool-icon">${t.icon}</span>
        <div class="ws-tool-info">
          <span class="ws-tool-name">${t.name}</span>
          <span class="ws-tool-badge">Soon</span>
        </div>
      </div>`;
    }
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
      <span class="ws-brand-rek">REK</span>
      <span class="ws-brand-label">Work Suite</span>
    </a>
    <nav class="ws-tools">${toolsHTML}</nav>
    <div class="ws-nav-footer">rekdesignstudio.com</div>
  `;

  /* ── Inject into DOM ──────────────────────────────── */
  function inject() {
    document.body.insertBefore(nav, document.body.firstChild);
  }
  if (document.body) { inject(); }
  else { document.addEventListener('DOMContentLoaded', inject); }

})();
