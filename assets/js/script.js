const menuToggle = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('#nav-links');
const themeToggle = document.querySelector('#theme-toggle');
const contactForm = document.querySelector('#contact-form');

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = contactForm.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = 'Sending...';

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: new FormData(contactForm),
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.message || 'Unable to send message');
    contactForm.reset();
    button.textContent = 'Message sent ✓';
    setTimeout(() => { button.textContent = originalText; button.disabled = false; }, 4000);
  } catch (error) {
    button.textContent = 'Try again';
    button.disabled = false;
    window.alert('Your message could not be sent. Please try again or email me directly.');
  }
});
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
