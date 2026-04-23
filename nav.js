(function() {

  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  const links = [
    { label: 'Visitante', href: '/visitante' },
    { label: 'Agenda',    href: '/eventos' },
  ];

  // ── STYLES ──────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    .ipb-nav {
      background: #162e0a;
      border-bottom: 1px solid #2d5a1b;
      position: sticky;
      top: 0;
      z-index: 100;
      font-family: 'Lato', Arial, sans-serif;
    }
    .ipb-nav-inner {
      max-width: 560px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 0;
    }
    .ipb-nav a {
      display: inline-block;
      padding: 0.75rem 1.25rem;
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #a8c89a;
      text-decoration: none;
      border-bottom: 2px solid transparent;
      transition: color 0.2s, border-color 0.2s;
    }
    .ipb-nav a:hover {
      color: #EAF9E1;
    }
    .ipb-nav a.active {
      color: #EAF9E1;
      border-bottom-color: #3a7a22;
    }
    .ipb-footer {
      text-align: center;
      padding: 1.5rem 1rem;
      background: #0f2209;
      color: #6a9a5a;
      font-size: 0.75rem;
      font-family: 'Lato', Arial, sans-serif;
      line-height: 1.7;
      border-top: 1px solid #2d5a1b;
    }
    .ipb-footer a {
      color: #6a9a5a;
      text-decoration: none;
    }
    .ipb-footer a:hover {
      color: #a8c89a;
    }
  `;
  document.head.appendChild(style);

  // ── MENU ────────────────────────────────────────────────
  function buildNav() {
    const nav = document.createElement('nav');
    nav.className = 'ipb-nav';
    const inner = document.createElement('div');
    inner.className = 'ipb-nav-inner';

    links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      const linkPath = link.href.replace(/\/$/, '') || '/';
      if (currentPath === linkPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
        a.classList.add('active');
      }
      inner.appendChild(a);
    });

    nav.appendChild(inner);
    return nav;
  }

  // ── FOOTER ──────────────────────────────────────────────
  function buildFooter() {
    const footer = document.createElement('footer');
    footer.className = 'ipb-footer';
    footer.innerHTML = `
      Presbiteriana Chácara Parreiral<br>
      Rua Teresa Tironi, 15 - Guaraciaba - Serra/ES<br>
      <a href="mailto:secretaria@ipchacara.org">secretaria@ipchacara.org</a>
    `;
    return footer;
  }

  // ── FAVICON ─────────────────────────────────────────────
  function injectFavicon() {
    if (!document.querySelector('link[rel="icon"]')) {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = '/Imagens/Logos/favicon.png';
      document.head.appendChild(link);
    }
  }

  // ── INJECT ──────────────────────────────────────────────
  // Menu: insert after hero if exists, otherwise at top of body
  function injectNav() {
    const nav = buildNav();
    const hero = document.getElementById('hero');
    if (hero && hero.nextSibling) {
      hero.parentNode.insertBefore(nav, hero.nextSibling);
    } else {
      document.body.insertBefore(nav, document.body.firstChild);
    }
  }

  // Footer: replace existing .footer or append to body
  function injectFooter() {
    const footer = buildFooter();
    const existing = document.querySelector('footer.footer, footer');
    if (existing) {
      existing.replaceWith(footer);
    } else {
      document.body.appendChild(footer);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { injectFavicon(); injectNav(); injectFooter(); });
  } else {
    injectFavicon();
    injectNav();
    injectFooter();
  }

})();
