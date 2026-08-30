document.addEventListener("DOMContentLoaded", () => {

  // ---- Mobile Drawer ----
  const hamburger = document.getElementById("hamburger");
  const drawer    = document.getElementById("drawer");
  const overlay   = document.getElementById("drawerOverlay");
  const closeBtn  = document.getElementById("drawerClose");

  function openDrawer() {
    drawer?.classList.add("open");
    overlay?.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer?.classList.remove("open");
    overlay?.classList.remove("show");
    document.body.style.overflow = "";
  }

  hamburger?.addEventListener("click", openDrawer);
  closeBtn?.addEventListener("click", closeDrawer);
  overlay?.addEventListener("click", closeDrawer);
  drawer?.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeDrawer));

  // ---- Navbar Scroll Glass Shadow ----
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (navbar) {
      if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  }, { passive: true });

  // ---- Active Navigation Highlight on Scroll ----
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, {
    threshold: 0.35
  });

  sections.forEach(s => navObserver.observe(s));

  // ---- Scroll Reveal Animation for Cards ----
  const revealCards = document.querySelectorAll(".bcard, .paket-card, .menu-cat-card, .sstat-box, .polaroid-card");
  revealCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(24px)";
    card.style.transition = `opacity 0.6s ease ${(index % 4) * 0.1}s, transform 0.6s ease ${(index % 4) * 0.1}s`;
  });

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        cardObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  });

  revealCards.forEach(c => cardObserver.observe(c));

});
