const menuToggle = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('#nav-links');
const themeToggle = document.querySelector('#theme-toggle');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') document.body.classList.add('dark');
themeToggle.textContent = document.body.classList.contains('dark') ? '☼' : '◐';

themeToggle.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark');
  localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
  themeToggle.textContent = dark ? '☼' : '◐';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
});

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.certificate').forEach((certificate) => certificate.addEventListener('click', () => {
  document.querySelectorAll('.certificate').forEach((item) => item.classList.remove('active'));
  certificate.classList.add('active');
  const preview = document.querySelector('#certificate-preview img');
  preview.src = certificate.dataset.image;
  preview.alt = certificate.querySelector('img').alt;
}));
