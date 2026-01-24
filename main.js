// ===================== LOAD HEADER & FOOTER =====================
fetch('/partials/header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header').innerHTML = html;

    // Initialize nav, success message, and page fade AFTER header is in DOM
    initNav();
    showSuccessMessage();
    initPageFade();
  });

fetch('/partials/footer.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('footer').innerHTML = html;
    initSocialLinks(); // Initialize social links if needed
  });

// ===================== MOBILE & DESKTOP NAV =====================
function initNav() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav'); // unified nav

  if (!nav || !menuToggle) return;

  const links = Array.from(nav.querySelectorAll('a'));

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // Close menu when link clicked
  links.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });

  // Active page highlighting
  const path = window.location.pathname.split("/").pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');

    if (
      (href === 'index.html' && (path === '' || path === 'index.html')) ||
      href === path
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ===================== CONTACT SUCCESS MESSAGE =====================
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

// ===================== PAGE FADE TRANSITIONS =====================
function initPageFade() {
  document.body.classList.add('fade-in');
  setTimeout(() => {
    document.body.classList.add('visible');
  }, 10);

  // Internal links fade out
  const links = Array.from(document.querySelectorAll(
    'a[href$=".html"]:not([target="_blank"])'
  ));

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');

      document.body.classList.remove('visible');
      document.body.classList.add('fade-exit-active');

      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
}

// ===================== SOCIAL LINKS (OPTIONAL INIT) =====================
function initSocialLinks() {
  const socialLinks = document.querySelectorAll('.social-links a');
  socialLinks.forEach(link => {
    link.setAttribute('target', '_blank'); // open in new tab
  });
}
