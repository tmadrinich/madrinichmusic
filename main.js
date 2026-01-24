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
  const pathSegments = window.location.pathname.split("/").filter(Boolean); // remove empty
  const currentPage = pathSegments.pop() || "index.html"; // last part, e.g. "index.html"

  links.forEach(link => {
    const pageAttr = link.dataset.page; // "home", "about", etc.
    
    // Determine if this link should be active
    if (
      (pageAttr === "home" && (currentPage === "index.html" || currentPage === "")) ||
      (pageAttr && currentPage.startsWith(pageAttr))
    ) {
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
