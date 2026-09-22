import {
  profile, ROLES, contact, RESUME_URL, interests, education, skillGroups,
  dsaTopics, projects, achievements, currentlyLearning, orbitCards, navSections,
} from './data.js';
import { initScene, onNodeSelect, setActiveNode } from './scene.js';

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------- NAVBAR ---------------- */
const navMobile = document.getElementById('navMobile');
navSections.forEach((id) => {
  const btn = document.createElement('button');
  btn.dataset.goto = id;
  btn.textContent = id.charAt(0).toUpperCase() + id.slice(1);
  navMobile.appendChild(btn);
});

document.body.addEventListener('click', (e) => {
  const target = e.target.closest('[data-goto]');
  if (!target) return;
  const id = target.dataset.goto;
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  navMobile.classList.remove('open');
  document.getElementById('navToggle').setAttribute('aria-expanded', 'false');
});

document.getElementById('navToggle').addEventListener('click', () => {
  const open = navMobile.classList.toggle('open');
  document.getElementById('navToggle').setAttribute('aria-expanded', String(open));
});

function updateActiveNav() {
  let current = 'home';
  for (const id of navSections) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
  }
  document.querySelectorAll('[data-goto]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.goto === current);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ---------------- TYPEWRITER ---------------- */
(function typewriter() {
  const el = document.getElementById('typed');
  let wordIndex = 0, text = '', deleting = false;
  const speed = 55, pause = 1400;

  function tick() {
    const current = ROLES[wordIndex % ROLES.length];
    if (!deleting && text.length < current.length) {
      text = current.slice(0, text.length + 1);
      el.textContent = text;
      setTimeout(tick, speed);
    } else if (!deleting && text.length === current.length) {
      setTimeout(() => { deleting = true; tick(); }, pause);
    } else if (deleting && text.length > 0) {
      text = current.slice(0, text.length - 1);
      el.textContent = text;
      setTimeout(tick, speed / 1.6);
    } else {
      deleting = false;
      wordIndex++;
      tick();
    }
  }
  tick();
})();

/* ---------------- RESUME BUTTON ---------------- */
if (RESUME_URL) {
  const btn = document.getElementById('resumeBtn');
  btn.disabled = false;
  btn.title = '';
  btn.addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = RESUME_URL; a.download = ''; a.click();
  });
}

/* ---------------- ABOUT: interests ---------------- */
const interestList = document.getElementById('interestList');
interests.forEach((item, i) => {
  const li = document.createElement('li');
  li.innerHTML = `<span class="dot" style="animation-delay:${i * 0.15}s"></span>${item}`;
  interestList.appendChild(li);
});

/* ---------------- EDUCATION TIMELINE ---------------- */
const timeline = document.getElementById('timeline');
education.forEach((item) => {
  const div = document.createElement('div');
  div.className = 'tl-item reveal';
  div.innerHTML = `
    <span class="tl-dot"></span>
    <div class="glass tl-card">
      <div class="tl-top">
        <h3 class="tl-level">${item.level}</h3>
        <span class="tl-year">${item.year}</span>
      </div>
      <p class="tl-inst">${item.institution}</p>
      <div class="tl-tags">
        <span class="tag strong">${item.score}</span>
        <span class="tag soft">${item.detail}</span>
      </div>
    </div>`;
  timeline.appendChild(div);
});

/* ---------------- SKILLS ---------------- */
const skillsGrid = document.getElementById('skillsGrid');
skillGroups.forEach((group) => {
  const div = document.createElement('div');
  div.className = 'glass skill-group reveal';
  div.innerHTML = `
    <p class="label-mono">${group.title}</p>
    <div class="skill-chips">
      ${group.skills.map((s) => `<span class="chip lvl-${s.level}">${s.name}<span>· ${s.level}</span></span>`).join('')}
    </div>`;
  skillsGrid.appendChild(div);
});

/* ---------------- PROJECTS ---------------- */
const projectsArea = document.getElementById('projectsArea');
if (projects.length > 0) {
  const grid = document.createElement('div');
  grid.className = 'projects-grid';
  projects.forEach((p) => {
    const div = document.createElement('div');
    div.className = 'glass project-card reveal';
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <div class="tech-row">${p.technologies.map((t) => `<span>${t}</span>`).join('')}</div>
      <div class="project-links">
        ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noreferrer">GitHub</a>` : ''}
        ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noreferrer">Live Demo</a>` : ''}
      </div>`;
    grid.appendChild(div);
  });
  projectsArea.appendChild(grid);
} else {
  const div = document.createElement('div');
  div.className = 'glass empty-state reveal';
  div.innerHTML = `
    <p class="eyebrow" style="margin-bottom:.75rem">status: in progress</p>
    <h3>No projects shipped yet — the first ones are on the way.</h3>
    <p>I'm currently applying what I'm learning in DSA and full-stack development to build my first real projects. This section will update as soon as they're ready.</p>
    <p class="dsa-note" style="margin-top:1rem">edit <code>js/data.js</code> → <code>projects[]</code> to add one</p>`;
  projectsArea.appendChild(div);
}

/* ---------------- DSA TOPICS ---------------- */
const dsaTopicsEl = document.getElementById('dsaTopics');
dsaTopics.forEach((topic, i) => {
  const div = document.createElement('div');
  div.className = 'glass dsa-topic reveal';
  div.innerHTML = `<span>${String(i + 1).padStart(2, '0')}</span><span>${topic}</span>`;
  dsaTopicsEl.appendChild(div);
});

/* ---------------- ACHIEVEMENTS ---------------- */
const achievementsGrid = document.getElementById('achievementsGrid');
achievements.forEach((a) => {
  const div = document.createElement('div');
  div.className = 'glass ach-card reveal';
  if (a.display) {
    div.innerHTML = `<span class="ach-value text-gradient">${a.display}</span><span class="ach-label">${a.label}</span>`;
  } else {
    div.innerHTML = `<span class="ach-value text-gradient" data-target="${a.value}" data-suffix="${a.suffix || ''}">0</span><span class="ach-label">${a.label}</span>`;
  }
  achievementsGrid.appendChild(div);
});

function animateCounter(el) {
  const target = Number(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------------- LEARNING ---------------- */
const learningGrid = document.getElementById('learningGrid');
currentlyLearning.forEach((item, i) => {
  const div = document.createElement('div');
  div.className = 'glass learn-pill reveal';
  div.style.animationDelay = `${i * 0.3}s`;
  div.innerHTML = `<span class="dot-mint"></span><span>${item}</span>`;
  learningGrid.appendChild(div);
});

/* ---------------- CONTACT ---------------- */
const rows = [
  ['Email', contact.email],
  ['Phone', contact.phone],
  ['Location', contact.location],
  ['LinkedIn', contact.linkedin],
  ['GitHub', contact.github],
  ['LeetCode', contact.leetcode],
].filter(([, v]) => v);

const contactRows = document.getElementById('contactRows');
if (rows.length > 0) {
  rows.forEach(([label, value]) => {
    const isLink = /^https?:\/\//.test(value);
    const div = document.createElement('div');
    div.className = 'contact-row';
    div.innerHTML = `<span>${label}</span>${
      isLink
        ? `<a href="${value}" target="_blank" rel="noreferrer">${value.replace(/^https?:\/\//, '')}</a>`
        : `<span>${value}</span>`
    }`;
    contactRows.appendChild(div);
  });
} else {
  contactRows.innerHTML = `<p style="color:var(--muted);font-size:.9rem">Contact details coming soon — add them in <code style="color:var(--cyan)">js/data.js</code>.</p>`;
}

const socialRow = document.getElementById('socialRow');
const socials = [
  ['GH', contact.github, 'GitHub'],
  ['in', contact.linkedin, 'LinkedIn'],
  ['LC', contact.leetcode, 'LeetCode'],
];
socials.forEach(([label, url, name]) => {
  if (!url) return;
  const a = document.createElement('a');
  a.className = 'social-btn';
  a.href = url; a.target = '_blank'; a.rel = 'noreferrer'; a.ariaLabel = name;
  a.textContent = label;
  socialRow.appendChild(a);
});

document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // Wire this up to your form backend of choice (e.g. Formspree, EmailJS,
  // or a serverless function) to actually deliver messages.
  document.getElementById('sendBtn').textContent = 'Message ready to send ✓';
  document.getElementById('formNote').hidden = false;
});

/* ---------------- SCROLL REVEAL ---------------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        if (entry.target.querySelector('[data-target]')) {
          animateCounter(entry.target.querySelector('[data-target]'));
        }
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ---------------- SECTION <-> 3D SCENE SYNC ---------------- */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveNode(entry.target.id);
    });
  },
  { threshold: 0.4 }
);
orbitCards.forEach((c) => {
  const el = document.getElementById(c.id);
  if (el) sectionObserver.observe(el);
});

onNodeSelect((id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
});

/* ---------------- INIT 3D SCENE ---------------- */
initScene();
