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
// Page Fade-In on Load
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');
    setTimeout(() => {
        document.body.classList.add('visible');
    }, 10); // small delay to trigger transition
});

// Page Fade-Out on Link Click
const links = document.querySelectorAll('a[href^="/"]:not([target="_blank"])');

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
