// Determine correct relative path based on folder depth
function getPartialPath(file) {
  const depth = window.location.pathname.split("/").filter(Boolean).length;
  let prefix = "./";
  if (depth === 0) prefix = "./";        // root
  else prefix = "../".repeat(depth - 1); // subfolder
  return prefix + "partials/" + file;
}

// ===== Load header & footer =====
fetch(getPartialPath("header.html"))
  .then(res => res.text())
  .then(html => {
    document.getElementById('header').innerHTML = html;
    initNav();
    highlightActivePage();
    initPageFade();
  });

fetch(getPartialPath("footer.html"))
  .then(res => res.text())
  .then(html => {
    document.getElementById('footer').innerHTML = html;
  });

// ===== NAVIGATION =====
function initNav() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLeft = document.querySelector('.nav-left');
  const navRight = document.querySelector('.nav-right');

  menuToggle?.addEventListener('click', () => {
    navLeft.classList.toggle('active');
    navRight.classList.toggle('active');
  });

  const links = [...navLeft.querySelectorAll('a'), ...navRight.querySelectorAll('a')];
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLeft.classList.remove('active');
      navRight.classList.remove('active');
    });
  });
}

// ===== ACTIVE PAGE HIGHLIGHT =====
function highlightActivePage() {
  const path = window.location.pathname.split("/").filter(Boolean).pop() || "index.html";
  const links = document.querySelectorAll('.nav a');

  links.forEach(link => {
    const page = link.dataset.page;
    if (
      (page === "home" && path === "index.html") ||
      path.includes(page)
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// ===== CONTACT SUCCESS MESSAGE =====
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

  const links = document.querySelectorAll('a[href^="./"], a[href$=".html"]:not([target="_blank"])');
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
