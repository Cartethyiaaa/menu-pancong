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

  // Stage 2 beans
  const swirlBeans = [
    document.getElementById("sbean1"),
    document.getElementById("sbean2"),
    document.getElementById("sbean3"),
    document.getElementById("sbean4"),
    document.getElementById("sbean5"),
    document.getElementById("sbean6"),
  ].filter(Boolean);

  // Bean initial offsets for float-in from different angles
  const beanOffsets = [
    { tx: -180, ty: 120, rot: -35 },
    { tx: 160,  ty: -140, rot: 25 },
    { tx: -120, ty: -90,  rot: 50 },
    { tx: 200,  ty: 100,  rot: -20 },
    { tx: -60,  ty: -160, rot: 70 },
    { tx: 130,  ty: -60,  rot: -45 },
  ];

  // Gentle idle float animation for beans (Terra style)
  const beanPhases = swirlBeans.map((_, i) => ({
    floatX: (Math.random() - 0.5) * 14,
    floatY: (Math.random() - 0.5) * 10,
    rotSpeed: (Math.random() - 0.5) * 0.3,
    phase: i * (Math.PI * 2 / swirlBeans.length),
    baseRot: beanOffsets[i]?.rot || 0,
  }));

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

  function renderIntroFrame() {
    animTime += 0.012;
    if (introSection) {
      const rect = introSection.getBoundingClientRect();
      const totalScrollable = introSection.offsetHeight - window.innerHeight;
      if (totalScrollable > 0) targetProgress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      currentProgress += (targetProgress - currentProgress) * 0.14;
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;
      const p = currentProgress;

      if (rect.bottom > -100 && rect.top < window.innerHeight + 100) {

        // --- STAGE 1: Hero text & pancong (p 0 → 0.55) ---
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

        // --- STAGE 2: Terra-style warm reveal (p 0.26 → 1.0) ---
        if (swirlWrapper && swirlImg) {
          const swirlAlpha = smoothstep(0.26, 0.50, p);
          swirlWrapper.style.opacity = swirlAlpha.toFixed(3);

          // Product: floats UP from bottom, scale-in — Terra style
          const productReveal = smoothstep(0.30, 0.65, p);
          const productFloat  = Math.sin(animTime * 0.8) * 8 * productReveal;
          const productY = lerp(80, 0, productReveal) + productFloat;
          const productScale = lerp(0.75, 1.0, productReveal);
          swirlImg.style.transform = "translateY(" + productY.toFixed(1) + "px) scale(" + productScale.toFixed(3) + ")";
          swirlImg.style.filter = "brightness(" + lerp(0.6, 1.05, productReveal).toFixed(2) + ") saturate(1.1)";

          // Toggle active class for light rays
          swirlWrapper.classList.toggle("active-swirl", p >= 0.48);
        }

        // --- Floating beans (Terra style) ---
        if (swirlBeans.length > 0) {
          const beansReveal = smoothstep(0.35, 0.68, p);
          swirlBeans.forEach((bean, i) => {
            const offset = beanOffsets[i] || { tx: 0, ty: 0, rot: 0 };
            const phase  = beanPhases[i];
            // Float-in from offset position
            const bx = lerp(offset.tx, mouseX * phase.floatX, beansReveal);
            const by = lerp(offset.ty, mouseY * phase.floatY + Math.sin(animTime + phase.phase) * 7, beansReveal);
            const brot = lerp(offset.rot, phase.baseRot + Math.sin(animTime * 0.6 + phase.phase) * 6, beansReveal);
            const bscale = lerp(0.3, 1.0, beansReveal);
            bean.style.transform = "translate(" + bx.toFixed(1) + "px," + by.toFixed(1) + "px) rotate(" + brot.toFixed(1) + "deg) scale(" + bscale.toFixed(3) + ")";
            bean.style.opacity = (beansReveal * 0.85).toFixed(3);
          });
        }

        // --- Reveal text: blur-in + float up (Terra "Made to move" style) ---
        if (revealContent) {
          const ra = smoothstep(0.50, 0.78, p);
          const blur = lerp(12, 0, ra);
          const textY = lerp(36, 0, ra);
          revealContent.style.opacity = ra.toFixed(3);
          revealContent.style.transform = "translate3d(0," + textY.toFixed(1) + "px,0)";
          revealContent.style.filter = "blur(" + blur.toFixed(1) + "px)";
          revealContent.style.pointerEvents = ra > 0.6 ? "auto" : "none";
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

  // ---- Unified Scroll Reveal ----
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
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
