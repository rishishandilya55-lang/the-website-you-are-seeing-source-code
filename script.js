/* ============================================
   RISHI — PORTFOLIO
   All Interactivity
   ============================================ */

// ─── Configuration ──────────────────────────
// Edit these values to customize your portfolio.

const CONFIG = {
  // Set your GitHub username to enable the GitHub section.
  // Leave empty string to show a "configure me" prompt.
  GITHUB_USERNAME: 'rishishandilya55-lang',

  // Discord avatar URL.
  // Right-click your avatar in Discord → Copy Image Link, then paste here.
  // Leave empty to use the monogram fallback.
  DISCORD_AVATAR_URL: '',

  // Discord username (displayed in contact section)
  DISCORD_USERNAME: 'gojo_satoru_reborn',

  // "Currently" section — update these whenever you want.
  CURRENTLY: {
    building: 'Something new...',
    learning: 'Something interesting...',
    nextIdea: 'Something completely random...'
  }
};

// ─── Language colors (GitHub-style) ─────────
const LANG_COLORS = {
  Java: '#b07219',
  Go: '#00ADD8',
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Kotlin: '#A97BFF',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Ruby: '#701516',
  Rust: '#dea584',
  Lua: '#000080',
  PHP: '#4F5D95',
  Dockerfile: '#384d54',
  Vue: '#41b883',
  Svelte: '#ff3e00',
};

// ─── DOM Ready ──────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initAvatar();
  initCurrently();
  initCanvas();
  initScrollProgress();
  initCursorGlow();
  initNav();
  initScrollAnimations();
  initTimelineFill();
  initProjectFilters();
  initGitHub();
  initGitHubLink();
});

// ─── Avatar ─────────────────────────────────
function initAvatar() {
  if (!CONFIG.DISCORD_AVATAR_URL) return;
  const container = document.getElementById('hero-avatar');
  if (!container) return;

  const img = new Image();
  img.alt = 'Rishi\'s avatar';
  img.src = CONFIG.DISCORD_AVATAR_URL;
  img.onload = () => {
    container.innerHTML = '';
    container.appendChild(img);
  };
}

// ─── Currently Section ──────────────────────
function initCurrently() {
  const el = (id, val) => {
    const node = document.getElementById(id);
    if (node && val) node.textContent = val;
  };
  el('currently-building', CONFIG.CURRENTLY.building);
  el('currently-learning', CONFIG.CURRENTLY.learning);
  el('currently-next', CONFIG.CURRENTLY.nextIdea);
}

// ─── Hero Canvas (Geometric Shapes) ────────
function initCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w, h, shapes;
  const shapeCount = 18;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function createShapes() {
    shapes = [];
    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 30 + 8,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
        opacity: Math.random() * 0.06 + 0.02,
        type: Math.floor(Math.random() * 3) // 0: square, 1: triangle, 2: circle
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (const s of shapes) {
      s.x += s.speedX;
      s.y += s.speedY;
      s.rotation += s.rotationSpeed;

      // Wrap around edges
      if (s.x < -s.size) s.x = w + s.size;
      if (s.x > w + s.size) s.x = -s.size;
      if (s.y < -s.size) s.y = h + s.size;
      if (s.y > h + s.size) s.y = -s.size;

      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rotation);
      ctx.globalAlpha = s.opacity;
      ctx.strokeStyle = '#e2a84b';
      ctx.lineWidth = 1;

      if (s.type === 0) {
        // Square
        ctx.strokeRect(-s.size / 2, -s.size / 2, s.size, s.size);
      } else if (s.type === 1) {
        // Triangle
        ctx.beginPath();
        ctx.moveTo(0, -s.size / 2);
        ctx.lineTo(s.size / 2, s.size / 2);
        ctx.lineTo(-s.size / 2, s.size / 2);
        ctx.closePath();
        ctx.stroke();
      } else {
        // Circle
        ctx.beginPath();
        ctx.arc(0, 0, s.size / 2, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();
    }

    requestAnimationFrame(draw);
  }

  resize();
  createShapes();
  draw();

  window.addEventListener('resize', () => {
    resize();
    createShapes();
  });
}

// ─── Scroll Progress ────────────────────────
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ─── Cursor Glow ────────────────────────────
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  let mx = -1000, my = -1000;
  let cx = -1000, cy = -1000;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animate() {
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    glow.style.left = cx + 'px';
    glow.style.top = cy + 'px';
    requestAnimationFrame(animate);
  }

  animate();
}

// ─── Navigation ─────────────────────────────
function initNav() {
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll shrink
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('open');
      links.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });

    // Close on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section highlight
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s));
}

// ─── Scroll Animations ─────────────────────
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ─── Timeline Fill ──────────────────────────
function initTimelineFill() {
  const timeline = document.querySelector('.timeline');
  const fill = document.querySelector('.timeline-line-fill');
  if (!timeline || !fill) return;

  function update() {
    const rect = timeline.getBoundingClientRect();
    const viewportH = window.innerHeight;

    if (rect.top > viewportH) {
      fill.style.height = '0%';
    } else if (rect.bottom < 0) {
      fill.style.height = '100%';
    } else {
      const totalH = rect.height;
      const visible = viewportH - rect.top;
      const pct = Math.min(Math.max((visible / totalH) * 100, 0), 100);
      fill.style.height = pct + '%';
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ─── Project Filters ────────────────────────
function initProjectFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ─── GitHub Integration ─────────────────────
async function initGitHub() {
  const container = document.getElementById('github-content');
  if (!container) return;

  if (!CONFIG.GITHUB_USERNAME) {
    container.innerHTML = `
      <div class="github-error">
        <p>GitHub integration is ready.</p>
        <p>Set your username in <code>script.js → CONFIG.GITHUB_USERNAME</code> to display your repos and activity.</p>
      </div>
    `;
    return;
  }

  try {
    // Fetch user + repos in parallel
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${CONFIG.GITHUB_USERNAME}`, {
        headers: { 'Accept': 'application/vnd.github+json' }
      }),
      fetch(`https://api.github.com/users/${CONFIG.GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
        headers: { 'Accept': 'application/vnd.github+json' }
      })
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error('GitHub API returned an error.');
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    // Handle case where all repos are private (empty array)
    if (!repos.length) {
      container.innerHTML = `
        <div class="github-profile">
          <img class="github-avatar" src="${user.avatar_url}" alt="${user.login}" loading="lazy">
          <div>
            <div class="github-name">${user.name || user.login}</div>
            <div class="github-username">@${user.login}</div>
            ${user.bio ? `<div class="github-bio">${escapeHtml(user.bio)}</div>` : ''}
          </div>
        </div>
        <div class="github-stats">
          <div class="github-stat">
            <div class="github-stat-value">${user.public_repos}</div>
            <div class="github-stat-label">Public Repos</div>
          </div>
          <div class="github-stat">
            <div class="github-stat-value">${user.followers}</div>
            <div class="github-stat-label">Followers</div>
          </div>
        </div>
        <p style="color:var(--text-muted);font-size:0.92rem;">Most of my repositories are private. Check back later — some might go public.</p>
      `;
      return;
    }

    // Compute language stats
    const langCount = {};
    let totalLangBytes = 0;
    const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

    repos.forEach(r => {
      if (r.language) {
        langCount[r.language] = (langCount[r.language] || 0) + 1;
        totalLangBytes++;
      }
    });

    const sortedLangs = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    // Top repos by stars
    const topRepos = [...repos]
      .filter(r => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

    // Build HTML
    let html = '';

    // Profile
    html += `
      <div class="github-profile">
        <img class="github-avatar" src="${user.avatar_url}" alt="${user.login}" loading="lazy">
        <div>
          <div class="github-name">${user.name || user.login}</div>
          <div class="github-username">@${user.login}</div>
          ${user.bio ? `<div class="github-bio">${escapeHtml(user.bio)}</div>` : ''}
        </div>
      </div>
    `;

    // Stats
    html += `
      <div class="github-stats">
        <div class="github-stat">
          <div class="github-stat-value">${user.public_repos}</div>
          <div class="github-stat-label">Repos</div>
        </div>
        <div class="github-stat">
          <div class="github-stat-value">${totalStars}</div>
          <div class="github-stat-label">Stars</div>
        </div>
        <div class="github-stat">
          <div class="github-stat-value">${user.followers}</div>
          <div class="github-stat-label">Followers</div>
        </div>
      </div>
    `;

    // Language bar
    if (sortedLangs.length > 0) {
      html += `<div class="github-langs"><h3>Languages</h3><div class="lang-bar">`;
      sortedLangs.forEach(([lang, count]) => {
        const pct = (count / totalLangBytes) * 100;
        const color = LANG_COLORS[lang] || '#8b949e';
        html += `<div class="lang-bar-segment" style="flex:${pct};background:${color}" title="${lang}: ${Math.round(pct)}%"></div>`;
      });
      html += `</div><div class="lang-legend">`;
      sortedLangs.forEach(([lang, count]) => {
        const pct = Math.round((count / totalLangBytes) * 100);
        const color = LANG_COLORS[lang] || '#8b949e';
        html += `<span class="lang-legend-item"><span class="lang-legend-dot" style="background:${color}"></span>${lang} ${pct}%</span>`;
      });
      html += `</div></div>`;
    }

    // Top repos
    if (topRepos.length > 0) {
      html += `<h3 class="github-repos-title">Top Repositories</h3><div class="github-repos">`;
      topRepos.forEach(r => {
        html += `
          <a href="${r.html_url}" target="_blank" rel="noopener" class="github-repo">
            <div class="github-repo-name">${escapeHtml(r.name)}</div>
            ${r.description ? `<div class="github-repo-desc">${escapeHtml(r.description)}</div>` : ''}
            <div class="github-repo-meta">
              ${r.language ? `<span><span class="lang-legend-dot" style="background:${LANG_COLORS[r.language] || '#8b949e'}"></span>${r.language}</span>` : ''}
              ${r.stargazers_count > 0 ? `<span>★ ${r.stargazers_count}</span>` : ''}
            </div>
          </a>
        `;
      });
      html += `</div>`;
    }

    container.innerHTML = html;

  } catch (err) {
    container.innerHTML = `
      <div class="github-error">
        <p>Couldn't load GitHub data right now.</p>
        <p>${escapeHtml(err.message)}</p>
      </div>
    `;
  }
}

// ─── GitHub Link (dynamic) ──────────────────
function initGitHubLink() {
  if (!CONFIG.GITHUB_USERNAME) return;

  const url = `https://github.com/${CONFIG.GITHUB_USERNAME}`;

  // Hero GitHub button
  const heroBtn = document.getElementById('btn-github-hero');
  if (heroBtn) {
    heroBtn.href = url;
    heroBtn.target = '_blank';
    heroBtn.rel = 'noopener';
  }

  // Contact GitHub link
  const contactLink = document.getElementById('contact-github-link');
  if (contactLink) {
    contactLink.href = url;
    contactLink.target = '_blank';
    contactLink.rel = 'noopener';
  }
}

// ─── Helpers ────────────────────────────────
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
