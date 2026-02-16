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
