// Load header & footer
fetch('/partials/header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header').innerHTML = html;
    initNav();
    showSuccessMessage(); // Run success check after header loads
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
  if (!nav) return; // Safety check

  const links = nav.querySelectorAll('a');

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });

  // Active page styling
  const path = window.location.pathname.replace(/\/$/, ""); // remove trailing slash

  links.forEach(link => {
    const page = link.dataset.page; // e.g., "services"

    // Check if path ends with page name or is home
    if (
      (page === "home" && (path === "" || path === "/" || path === "/index.html")) ||
      path.endsWith(page) ||
      path.endsWith(page + "/index.html")
    ) {
      link.classList.add("active");
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
