// Load header & footer
fetch('/partials/header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header').innerHTML = html;
    initNav();
    showSuccessMessage();
    initPageFade();
  });

fetch('/partials/footer.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('footer').innerHTML = html;
  });

// Mobile menu + active link
function initNav() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (!nav || !menuToggle) return;

  const links = Array.from(nav.querySelectorAll('a'));

  // Toggle mobile menu
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // Close mobile menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('active'));
  });

  // Active link highlighting
  const path = window.location.pathname.split("/").pop(); // get last part
  links.forEach(link => {
    const page = link.getAttribute('href').split("/").pop();
    if (page === path || (path === "" && page === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Contact success message
function showSuccessMessage() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('success') === 'true') {
    const form = document.getElementById('contact-form');
    const intro = document.getElementById('contact-intro');
    const success = document.getElementById('success-message');
    if (form) form.style.display = 'none';
    if (intro) intro.style.display = 'none';
    if (success) success.style.display = 'block';
  }
}

// Page fade transitions
function initPageFade() {
  document.body.classList.add('fade-in');
  setTimeout(() => document.body.classList.add('visible'), 10);

  const links = Array.from(document.querySelectorAll('a[href$=".html"]:not([target="_blank"])'));

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');
      document.body.classList.remove('visible');
      setTimeout(() => window.location.href = href, 500);
    });
  });
}
