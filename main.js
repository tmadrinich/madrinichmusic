// Load header & footer
fetch('/partials/header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header').innerHTML = html;
    initNav();
    showSuccessMessage(); // Run success check after header loads
    initPageFade(); // Setup fade after header loads
  });

fetch('/partials/footer.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('footer').innerHTML = html;
  });

// Mobile menu + active link
function initNav() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLeft = document.querySelector('.nav-left');
  const navRight = document.querySelector('.nav-right');

  if (!navLeft || !navRight) return;

  const links = [...navLeft.querySelectorAll('a'), ...navRight.querySelectorAll('a')];

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    navLeft.classList.toggle('active');
    navRight.classList.toggle('active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navLeft.classList.remove('active');
      navRight.classList.remove('active');
    });
  });

  // Active page styling
  const path = window.location.pathname.replace(/\/$/, ""); // remove trailing slash

  links.forEach(link => {
    const page = link.dataset.page;

    if (
      (page === "home" && (path === "" || path === "/" || path === "/index.html")) ||
      path.endsWith(page) ||
      path.endsWith(page + "/index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Show success message on contact form submission
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

// ================= PAGE FADE TRANSITIONS =================
function initPageFade() {
  // Fade-in on load
  document.body.classList.add('fade-in');
  setTimeout(() => {
    document.body.classList.add('visible');
  }, 10);

  // Fade-out on link click (internal links only)
  const links = Array.from(document.querySelectorAll('a[href^="/"]:not([target="_blank"])'));

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');

      document.body.classList.remove('visible');
      document.body.classList.add('fade-exit-active');

      setTimeout(() => {
        window.location.href = href;
      }, 500); // match your CSS transition duration
    });
  });
}
