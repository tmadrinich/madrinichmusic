// ===== Load header & footer =====
fetch('/partials/header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header').innerHTML = html;
    initNav();
    highlightActivePage();
    initPageFade();
  });

fetch('/partials/footer.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('footer').innerHTML = html;
    // No extra init needed for FontAwesome links; they render automatically
  });

// ===== NAVIGATION (Desktop + Mobile) =====
function initNav() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLeft = document.querySelector('.nav-left');
  const navRight = document.querySelector('.nav-right');

  // Mobile toggle
  menuToggle?.addEventListener('click', () => {
    navLeft.classList.toggle('active');
    navRight.classList.toggle('active');
  });

  // Close mobile nav when a link is clicked
  const links = [...navLeft.querySelectorAll('a'), ...navRight.querySelectorAll('a')];
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLeft.classList.remove('active');
      navRight.classList.remove('active');
    });
  });
}

// ===== HIGHLIGHT ACTIVE PAGE =====
function highlightActivePage() {
  const path = window.location.pathname.replace(/\/$/, "");
  const links = document.querySelectorAll('.nav a');

  links.forEach(link => {
    const page = link.dataset.page;
    if (
      (page === "home" && (path === "" || path.endsWith("index.html"))) ||
      path.includes(page)
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// ===== CONTACT FORM SUCCESS MESSAGE =====
function showSuccessMessage() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('success') === 'true') {
    document.getElementById('contact-form')?.style.display = 'none';
    document.getElementById('contact-intro')?.style.display = 'none';
    document.getElementById('success-message')?.style.display = 'block';
  }
}

// ===== PAGE FADE TRANSITIONS =====
function initPageFade() {
  document.body.classList.add('fade-in');
  setTimeout(() => {
    document.body.classList.add('visible');
  }, 10);

  const links = document.querySelectorAll('a[href^="/"]:not([target="_blank"])');
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
