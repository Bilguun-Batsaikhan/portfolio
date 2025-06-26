const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidenav .nav-link");

let isScrolling = false; // 👈 Flag to pause observer after click

const observer = new IntersectionObserver(
  (entries) => {
    if (isScrolling) return; // ⛔ Skip updates during scroll

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const id = entry.target.getAttribute("id");
        const activeLink = document.querySelector(`.sidenav a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "0px 0px -30% 0px",
  }
);

// Observe each section
sections.forEach((section) => observer.observe(section));

// Listen for nav link clicks
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default anchor jump
    const href = this.getAttribute("href");
    const targetSection = document.querySelector(href);
    if (targetSection) {
      isScrolling = true;

      // Smooth scroll to the target section
      targetSection.scrollIntoView({ behavior: "smooth" });

      // Manually set active class
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      // Re-enable observer after delay
      setTimeout(() => {
        isScrolling = false;
      }, 1000); // Adjust delay if needed
    }
  });
});
