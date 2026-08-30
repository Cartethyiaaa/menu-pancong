document.addEventListener("DOMContentLoaded", () => {

  // ---- Preloader ----
  const preloader = document.getElementById("preloader");
  const dismiss = () => { if (preloader && !preloader.classList.contains("fade-out")) preloader.classList.add("fade-out"); };
  window.addEventListener("load", () => setTimeout(dismiss, 400));
  setTimeout(dismiss, 1500);

  // ---- Mobile Drawer ----
  const hamburger = document.getElementById("hamburger");
  const drawer    = document.getElementById("drawer");
  const overlay   = document.getElementById("drawerOverlay");
  const closeBtn  = document.getElementById("drawerClose");
  const open  = () => { drawer?.classList.add("open"); overlay?.classList.add("show"); document.body.style.overflow = "hidden"; };
  const close = () => { drawer?.classList.remove("open"); overlay?.classList.remove("show"); document.body.style.overflow = ""; };
  hamburger?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  overlay?.addEventListener("click", close);
  drawer?.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", close));

  // ---- 3D Cinematic Intro Engine ----
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
  let animTime = 0;

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
  function lerp(a, b, t) { return a + (b - a) * t; }

  function renderFrame() {
    animTime += 0.01;
    if (introSection) {
      const rect = introSection.getBoundingClientRect();
      const totalScrollable = introSection.offsetHeight - window.innerHeight;
      if (totalScrollable > 0) targetProgress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      currentProgress += (targetProgress - currentProgress) * 0.12;
      mouseX += (targetMouseX - mouseX) * 0.07;
      mouseY += (targetMouseY - mouseY) * 0.07;
      const p = currentProgress;

      if (rect.bottom > -100 && rect.top < window.innerHeight + 100) {

        // STAGE 1: Hero & floating pancong
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
        floatingToppings.forEach(item => {
          const depth = parseFloat(item.dataset.depth || "0.5");
          const dir   = parseFloat(item.dataset.direction || "1");
          const spread = smoothstep(0.05, 0.45, p);
          const sx = dir * spread * 450 * depth + mouseX * depth * 60;
          const sy = mouseY * depth * 60;
          const ta = 1 - smoothstep(0.1, 0.38, p);
          item.style.transform = "translate3d(" + sx.toFixed(1) + "px," + sy.toFixed(1) + "px,0) scale(" + (1 + spread * 0.4).toFixed(2) + ")";
          item.style.opacity = ta.toFixed(3);
        });

        // STAGE 2: Warm golden reveal — clean product float + blur text
        if (swirlWrapper && swirlImg) {
          const sAlpha = smoothstep(0.26, 0.50, p);
          swirlWrapper.style.opacity = sAlpha.toFixed(3);

          // Product floats up gently + gentle idle bob
          const reveal = smoothstep(0.30, 0.62, p);
          const bob = Math.sin(animTime * 1.1) * 7 * reveal;
          const imgY = lerp(60, 0, reveal) + bob;
          const imgScale = lerp(0.82, 1.0, reveal);

          // Subtle parallax from mouse
          const parallaxX = mouseX * 18 * reveal;
          const parallaxY = mouseY * 12 * reveal;

          swirlImg.style.transform =
            "translate(" + (parallaxX).toFixed(1) + "px," + (imgY + parallaxY).toFixed(1) + "px) scale(" + imgScale.toFixed(3) + ")";

          swirlWrapper.classList.toggle("active-swirl", p >= 0.48);
        }

        // Reveal text: clean blur-in + slide up
        if (revealContent) {
          const ra = smoothstep(0.50, 0.76, p);
          const blur = lerp(10, 0, ra);
          const textY = lerp(30, 0, ra);
          revealContent.style.opacity = ra.toFixed(3);
          revealContent.style.transform = "translateY(" + textY.toFixed(1) + "px)";
          revealContent.style.filter = "blur(" + blur.toFixed(1) + "px)";
          revealContent.style.pointerEvents = ra > 0.6 ? "auto" : "none";
        }

        if (scrollCue) scrollCue.style.opacity = (1 - smoothstep(0.0, 0.12, p)).toFixed(3);
        if (lightBeam) {
          lightBeam.style.transform = "rotate(" + (-15 + mouseX * 5).toFixed(1) + "deg) translate3d(" + (mouseX * 20).toFixed(1) + "px," + (mouseY * 20).toFixed(1) + "px,0)";
        }
      }
    }
    requestAnimationFrame(renderFrame);
  }
  requestAnimationFrame(renderFrame);

  // ---- Navbar scroll ----
  window.addEventListener("scroll", () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  // ---- Active nav link ----
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  sections.forEach(s => {
    new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute("id");
          navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + id));
        }
      });
    }, { threshold: 0.25 }).observe(s);
  });

  // ---- Scroll reveal ----
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const siblings = Array.from(el.parentElement?.children || [el]);
        el.style.transitionDelay = (siblings.indexOf(el) * 0.08) + "s";
        el.classList.add("revealed");
        revealObs.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal-item").forEach(el => revealObs.observe(el));

  // ---- Butterscotch hover ----
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
