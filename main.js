// ======= Helper: get correct path for partials =======
function getPartialPath(file) {
  // Count folder depth
  const depth = window.location.pathname.split("/").filter(Boolean).length;
  let prefix = "";
  if (depth === 0) prefix = "./";        // root index.html
  else prefix = "../".repeat(depth - 1); // subfolder
  return prefix + "partials/" + file;
}

// ======= Load header =======
fetch(getPartialPath("header.html"))
  .then(res => res.text())
  .then(html => {
    document.getElementById("header").innerHTML = html;
    initNav();
    highlightActivePage();
    initPageFade();
  })
  .catch(err => console.error("Header failed to load:", err));

// ======= Load footer =======
fetch(getPartialPath("footer.html"))
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer").innerHTML = html;
  })
  .catch(err => console.error("Footer failed to load:", err));

// ======= Navigation =======
function initNav() {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (!nav) return;

  // Mobile toggle
  menuToggle?.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // Close mobile menu on link click
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });
}

// ======= Highlight active page =======
function highlightActivePage() {
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const fileName = pathParts.pop() || "index.html";

  document.querySelectorAll(".nav a").forEach(link => {
    const page = link.dataset.page; // e.g., home, about, services, contact
    if (
      (page === "home" && fileName === "index.html") ||
      fileName.includes(page)
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// ======= Contact success message =======
function showSuccessMessage() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("success") === "true") {
    document.getElementById("contact-form")?.style.display = "none";
    document.getElementById("contact-intro")?.style.display = "none";
    document.getElementById("success-message")?.style.display = "block";
  }
}

// ======= Page fade transitions =======
function initPageFade() {
  document.body.classList.add("fade-in");
  setTimeout(() => document.body.classList.add("visible"), 10);

  document.querySelectorAll('a[href$=".html"]:not([target="_blank"])').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const href = link.getAttribute("href");
      document.body.classList.remove("visible");
      document.body.classList.add("fade-exit-active");
      setTimeout(() => (window.location.href = href), 500);
    });
  });
}
