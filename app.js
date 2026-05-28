document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('results');

  const settingsBtn = document.getElementById('settingsBtn');
  const settingsPanel = document.getElementById('settingsPanel');
  const bgSelect = document.getElementById('bgSelect');
  const motionToggle = document.getElementById('motionToggle');
  const bg = document.querySelector('.background');

  /* OUVERTURE / FERMETURE DU MENU */
  settingsBtn.addEventListener('click', () => {
    settingsPanel.style.display =
      settingsPanel.style.display === 'flex' ? 'none' : 'flex';
  });

  /* CHANGEMENT DE FOND */
  bgSelect.addEventListener('change', () => {
    bg.className = 'background bg-' + bgSelect.value;
  });

  /* TOGGLE ANIMATIONS */
  motionToggle.addEventListener('click', () => {
    const active = motionToggle.getAttribute('aria-pressed') === 'true';
    motionToggle.setAttribute('aria-pressed', String(!active));
    motionToggle.textContent = active ? 'Désactivées' : 'Activées';
  });

  /* RECHERCHE FACTICE */
  function renderResults(q){
    results.innerHTML = '';

    const data = [
      {
        title:`Résultats pour « ${q} »`,
        url:`https://nexio.example/search?q=${encodeURIComponent(q)}`,
        snippet:`Nexio — moteur de recherche moderne et animé.`
      },
      {
        title:`À propos de Nexio`,
        url:`https://nexio.example/about`,
        snippet:`Nexio offre une expérience fluide et professionnelle.`
      }
    ];

    data.forEach((r,i)=>{
      const el = document.createElement('div');
      el.className = 'result';
      el.style.animationDelay = `${i * 80}ms`;
      el.innerHTML = `
        <div class="result-title">${r.title}</div>
        <div class="result-url">${r.url}</div>
        <div class="result-snippet">${r.snippet}</div>
      `;
      results.appendChild(el);
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if(input.value.trim()) renderResults(input.value);
  });

});