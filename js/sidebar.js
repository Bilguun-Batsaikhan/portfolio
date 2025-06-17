const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidenav .nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remove 'active' from all links
        navLinks.forEach((link) => link.classList.remove("active"));

        // Add 'active' to the current section's link
        const id = entry.target.getAttribute("id");
        const activeLink = document.querySelector(`.sidenav a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  },
  {
    threshold: 0.6, // Adjust sensitivity: 0.6 = 60% of section visible
  }
);

// Observe each section
sections.forEach((section) => observer.observe(section));
