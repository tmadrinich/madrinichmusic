// =================== LOAD HEADER & FOOTER ===================

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

// =================== MOBILE MENU + ACTIVE LINK ===================

function initNav() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (!nav || !menuToggle) return;

  const links = Array.from(nav.querySelectorAll('a'));

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });

  const path = window.location.pathname.replace(/\/$/, "");

  links.forEach(link => {
    const page = link.dataset.page;

    if (
      (page === "home" && (path === "" || path === "/" || path.endsWith("index.html"))) ||
      path.endsWith(page) ||
      path.endsWith(page + "/index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// =================== CONTACT SUCCESS MESSAGE ===================

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

// =================== PAGE FADE TRANSITIONS ===================

function initPageFade() {
  document.body.classList.add('fade-in');

  setTimeout(() => {
    document.body.classList.add('visible');
  }, 10);

  const links = Array.from(
    document.querySelectorAll('a[href^="/"]:not([target="_blank"]):not([href*="#"])')
  );

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
