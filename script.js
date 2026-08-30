document.addEventListener("DOMContentLoaded", () => {

  // ---- Preloader ----
  const preloader = document.getElementById("preloader");
  const dismissPreloader = () => {
    if (preloader && !preloader.classList.contains("fade-out")) {
      preloader.classList.add("fade-out");
    }
  };
  window.addEventListener("load", () => setTimeout(dismissPreloader, 400));
  setTimeout(dismissPreloader, 1500);

  // ---- Mobile Drawer ----
  const hamburger = document.getElementById("hamburger");
  const drawer    = document.getElementById("drawer");
  const overlay   = document.getElementById("drawerOverlay");
  const closeBtn  = document.getElementById("drawerClose");
  const openDrawer  = () => { drawer?.classList.add("open"); overlay?.classList.add("show"); document.body.style.overflow = "hidden"; };
  const closeDrawer = () => { drawer?.classList.remove("open"); overlay?.classList.remove("show"); document.body.style.overflow = ""; };
  hamburger?.addEventListener("click", openDrawer);
  closeBtn?.addEventListener("click", closeDrawer);
  overlay?.addEventListener("click", closeDrawer);
  drawer?.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeDrawer));

  // ---- 3D Cinematic Intro Scroll Engine ----
  const introSection     = document.getElementById("home");
  const headerContent    = document.getElementById("introHeaderContent");
  const pancongObject    = document.getElementById("pancongObject");
  const floatingToppings = document.querySelectorAll(".topping-item");
  const swirlWrapper     = document.getElementById("introSwirlWrapper");
  const swirlImg         = document.getElementById("swirlImg");
  const revealContent    = document.getElementById("swirlRevealContent");
  const scrollCue        = document.getElementById("introScrollCue");
  const lightBeam        = document.querySelector(".intro-light-beam");
  const navbar           = document.getElementById("navbar");

  let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0;
  let currentProgress = 0, targetProgress = 0;

  window.addEventListener("mousemove", (e) => {
    targetMouseX = (e.clientX / window.innerWidth) - 0.5;
    targetMouseY = (e.clientY / window.innerHeight) - 0.5;
  }, { passive: true });
  window.addEventListener("deviceorientation", (e) => {
    if (e.gamma !== null && e.beta !== null) {
      targetMouseX = Math.max(-0.5, Math.min(0.5, e.gamma / 45));
      targetMouseY = Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 45));
    }
  }, { passive: true });
  scrollCue?.addEventListener("click", () => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }));

  function smoothstep(min, max, val) {
    const x = Math.max(0, Math.min(1, (val - min) / (max - min)));
    return x * x * (3 - 2 * x);
  }

  function renderIntroFrame() {
    if (introSection) {
      const rect = introSection.getBoundingClientRect();
      const totalScrollable = introSection.offsetHeight - window.innerHeight;
      if (totalScrollable > 0) targetProgress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      currentProgress += (targetProgress - currentProgress) * 0.14;
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;
      const p = currentProgress;
      if (rect.bottom > -100 && rect.top < window.innerHeight + 100) {
        if (headerContent) {
          const a = 1 - smoothstep(0.02, 0.22, p);
          headerContent.style.opacity = a.toFixed(3);
          headerContent.style.transform = "translate3d(0," + (-p * 150).toFixed(1) + "px,0)";
          headerContent.style.pointerEvents = a < 0.1 ? "none" : "auto";
        }
        if (pancongObject) {
          const scale = 1 + smoothstep(0.05, 0.60, p) * 4.5;
          const alpha = 1 - smoothstep(0.32, 0.56, p);
          const tx = -mouseY * 14 * (1 - Math.min(1, p * 1.5));
          const ty =  mouseX * 14 * (1 - Math.min(1, p * 1.5));
          pancongObject.style.transform = "perspective(1000px) rotateX(" + tx.toFixed(2) + "deg) rotateY(" + ty.toFixed(2) + "deg) scale(" + scale.toFixed(3) + ")";
          pancongObject.style.opacity = alpha.toFixed(3);
        }
        if (floatingToppings.length > 0) {
          const spread = smoothstep(0.05, 0.45, p);
          floatingToppings.forEach(item => {
            const depth = parseFloat(item.dataset.depth || "0.5");
            const dir   = parseFloat(item.dataset.direction || "1");
            const sx = dir * spread * 450 * depth + mouseX * depth * 60;
            const sy = mouseY * depth * 60;
            const ta = 1 - smoothstep(0.1, 0.38, p);
            item.style.transform = "translate3d(" + sx.toFixed(1) + "px," + sy.toFixed(1) + "px,0) scale(" + (1 + spread * 0.4).toFixed(2) + ")";
            item.style.opacity = ta.toFixed(3);
          });
        }
        if (swirlWrapper && swirlImg) {
          const sa = smoothstep(0.26, 0.52, p);
          swirlWrapper.style.opacity = sa.toFixed(3);
          swirlImg.style.transform = "scale(" + (0.70 + p * 0.38).toFixed(3) + ") rotate(" + (p * 130).toFixed(1) + "deg)";
          swirlWrapper.classList.toggle("active-interactive", p >= 0.55);
        }
        if (revealContent) {
          const ra = smoothstep(0.50, 0.75, p);
          revealContent.style.opacity = ra.toFixed(3);
          revealContent.style.transform = "translate3d(0," + ((1 - ra) * 30).toFixed(1) + "px,0) scale(" + (0.94 + ra * 0.06).toFixed(3) + ")";
          revealContent.style.pointerEvents = ra > 0.5 ? "auto" : "none";
        }
        if (scrollCue) scrollCue.style.opacity = (1 - smoothstep(0.0, 0.12, p)).toFixed(3);
        if (lightBeam) lightBeam.style.transform = "rotate(" + (-15 + mouseX * 5).toFixed(1) + "deg) translate3d(" + (mouseX * 20).toFixed(1) + "px," + (mouseY * 20).toFixed(1) + "px,0)";
      }
    }
    requestAnimationFrame(renderIntroFrame);
  }
  requestAnimationFrame(renderIntroFrame);

  // ---- Navbar Scroll ----
  window.addEventListener("scroll", () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  // ---- Active Nav Link ----
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.getAttribute("id");
        navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + id));
      }
    });
  }, { threshold: 0.25 }).observe && sections.forEach(s => {
    new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute("id");
          navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + id));
        }
      });
    }, { threshold: 0.25 }).observe(s);
  });

  // ---- Unified Scroll Reveal (all .reveal-item) ----
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const siblings = Array.from(el.parentElement?.children || [el]);
        const idx = siblings.indexOf(el);
        el.style.transitionDelay = (idx * 0.08) + "s";
        el.classList.add("revealed");
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal-item").forEach(el => revealObserver.observe(el));

  // ---- Butterscotch Coffee Card Hover ----
  const bsCard = document.getElementById("butterscotchCard");
  if (bsCard) {
    bsCard.addEventListener("mouseenter", () => {
      const tag = bsCard.querySelector(".butterscotch-tag-float");
      if (tag) { tag.style.transform = "scale(1.08) translateY(-4px)"; tag.style.borderColor = "var(--gold)"; }
    });
    bsCard.addEventListener("mouseleave", () => {
      const tag = bsCard.querySelector(".butterscotch-tag-float");
      if (tag) { tag.style.transform = ""; tag.style.borderColor = ""; }
    });
  }

});
