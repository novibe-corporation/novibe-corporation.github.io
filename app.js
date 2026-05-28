// app.js
// Assure-toi que le chemin dans index.html pointe vers ce fichier

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('results');

  const settingsBtn = document.getElementById('settingsBtn');
  const settingsPanel = document.getElementById('settingsPanel');
  const bgSelect = document.getElementById('bgSelect');
  const bg = document.querySelector('.background');
  const motionToggle = document.getElementById('motionToggle');

  // Toggle panneau paramètres
  settingsBtn.addEventListener('click', () => {
    const isOpen = settingsPanel.style.display === 'flex';
    settingsPanel.style.display = isOpen ? 'none' : 'flex';
    settingsPanel.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
  });

  // Changer le fond en direct
  bgSelect.addEventListener('change', () => {
    const v = bgSelect.value || 'default';
    bg.className = 'background bg-' + v;
  });

  // Activer / désactiver animations
  motionToggle.addEventListener('click', () => {
    const pressed = motionToggle.getAttribute('aria-pressed') === 'true';
    motionToggle.setAttribute('aria-pressed', String(!pressed));
    motionToggle.textContent = pressed ? 'Désactivées' : 'Activées';
    document.documentElement.style.setProperty('--motion', pressed ? '0' : '1');

    // Si on veut réduire animations, on peut retirer les animations CSS
    if (pressed) {
      // Désactiver
      document.querySelectorAll('.fade-in').forEach(el => {
        el.style.animation = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      bg.style.animation = 'none';
    } else {
      // Réactiver en forçant un repaint
      document.querySelectorAll('.fade-in').forEach(el => {
        el.style.animation = '';
      });
      bg.style.animation = '';
    }
  });

  // Recherche factice et rendu avec fondu
  function renderFakeResults(q) {
    results.innerHTML = '';
    if (!q.trim()) return;

    const items = [
      {
        title: `Résultats pour « ${q} »`,
        url: `https://nexio.example/search?q=${encodeURIComponent(q)}`,
        snippet: 'Nexio — moteur de recherche moderne, fluide et élégant.'
      },
      {
        title: 'À propos de Nexio',
        url: 'https://nexio.example/about',
        snippet: 'Nexio est conçu pour offrir une expérience de recherche professionnelle et animée.'
      }
    ];

    items.forEach((r, i) => {
      const el = document.createElement('article');
      el.className = 'result';
      el.style.animationDelay = `${i * 80}ms`;
      el.innerHTML = `
        <div class="result-title">${r.title}</div>
        <div class="result-url">${r.url}</div>
        <div class="result-snippet">${r.snippet}</div>
      `;
      // Touch friendly micro-interaction
      el.addEventListener('touchstart', () => el.classList.add('touched'));
      el.addEventListener('touchend', () => el.classList.remove('touched'));
      results.appendChild(el);
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    renderFakeResults(input.value);
  });

  // Escape clears input
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') input.value = '';
    if (e.key === 'Enter') {
      // small debounce to allow mobile keyboards to close
      setTimeout(() => renderFakeResults(input.value), 50);
    }
  });

  // Small accessibility: close settings with Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      settingsPanel.style.display = 'none';
      settingsPanel.setAttribute('aria-hidden', 'true');
    }
  });

  // Prevent accidental selection on double-tap mobile
  document.addEventListener('touchstart', () => {}, {passive: true});
});