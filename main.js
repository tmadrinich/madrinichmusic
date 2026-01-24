// Load header & footer
fetch('/partials/header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header').innerHTML = html;
    initNav();
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
  const links = nav.querySelectorAll('a');

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });

  // Active page styling
  const path = window.location.pathname;
  links.forEach(link => {
    if (
      (path === '/' && link.dataset.page === 'home') ||
      path.includes(link.dataset.page)
    ) {
      link.classList.add('active');
    }
  });
}

