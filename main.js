// =================== LOAD HEADER & FOOTER ===================
fetch('./partials/header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header').innerHTML = html;

    // Initialize features after header exists
    initNav();
    showSuccessMessage();
    initPageFade();
  });

fetch('./partials/footer.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('footer').innerHTML = html;
  });

// =================== MOBILE MENU + ACTIVE LINK ===================
function initNav() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav'); // single nav element

  if (!nav || !menuToggle) return;

  const links = Array.from(nav.querySelectorAll('a'));

  // Toggle mobile menu
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // Close menu when a link is clicked
  links.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });

  // Highlight active page
  const path = window.location.pathname.replace(/\/$/, "");

  links.forEach(link => {
    const page = link.dataset.page;
    if (
      (page === "home" && (path === "" || path.endsWith("index.html"))) ||
      path.endsWith(page + ".html")
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
  // Fade-in on load
  document.body.classList.add('fade-in');
  setTimeout(() => {
    document.body.classList.add('visible');
  }, 10);

  // Fade-out on internal link click
  const links = Array.from(document.querySelectorAll(
    'a[href="index.html"], a[href="about.html"], a[href="services.html"], a[href="contact.html"], a[href="./index.html"], a[href="./about.html"], a[href="./services.html"], a[href="./contact.html"]'
  ));

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');

      document.body.classList.remove('visible');
      document.body.classList.add('fade-exit-active');

      setTimeout(() => {
        window.location.href = href;
      }, 500); // match CSS transition duration
    });
  });
}
