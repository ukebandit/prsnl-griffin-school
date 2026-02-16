// === Auth Gate ===
(function() {
  const PASS_HASH = '1b44181e0000028700000006c5e9a6f1';
  const SESSION_KEY = 'griffin-housing-auth';

  function simpleHash(str) {
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return (hash >>> 0).toString(16).padStart(8, '0') +
           Array.from(str).reduce((a, c) => a + c.charCodeAt(0), 0).toString(16).padStart(8, '0') +
           str.length.toString(16).padStart(8, '0') +
           ((hash ^ 0xdeadbeef) >>> 0).toString(16).padStart(8, '0');
  }

  const gate = document.getElementById('auth-gate');
  const form = document.getElementById('auth-form');
  const input = document.getElementById('auth-pass');
  const error = document.getElementById('auth-error');

  if (sessionStorage.getItem(SESSION_KEY) === PASS_HASH) {
    gate.classList.add('hidden');
    document.body.classList.remove('locked');
  } else {
    document.body.classList.add('locked');
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const val = input.value.trim().toLowerCase();
    if (simpleHash(val) === PASS_HASH) {
      sessionStorage.setItem(SESSION_KEY, PASS_HASH);
      gate.classList.add('hidden');
      document.body.classList.remove('locked');
    } else {
      error.textContent = 'Wrong password. Try again.';
      input.value = '';
      input.focus();
    }
  });
})();

// === Tab Navigation ===
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const target = item.dataset.section;

    navItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');

    sections.forEach(s => {
      s.classList.toggle('active', s.id === target);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// === Collapsible Cards ===
document.querySelectorAll('.card-header').forEach(header => {
  header.addEventListener('click', () => {
    header.parentElement.classList.toggle('collapsed');
  });
});
