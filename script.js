document.addEventListener('DOMContentLoaded', () => {

  // ---- Preloader Splash Animation ----
  const preloader = document.getElementById('preloader');
  const hidePreloader = () => {
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
    }
  };
  setTimeout(hidePreloader, 2600);

  // ---- Mobile Drawer ----
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('drawer');
  const overlay   = document.getElementById('drawerOverlay');
  const closeBtn  = document.getElementById('drawerClose');

  function openDrawer()  { drawer?.classList.add('open'); overlay?.classList.add('show'); }
  function closeDrawer() { drawer?.classList.remove('open'); overlay?.classList.remove('show'); }

  hamburger?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);
  drawer?.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeDrawer));

  // ---- 3D CINEMATIC INTRO SCROLL & PARALLAX ENGINE ----
  const introSection   = document.getElementById('home');
  const headerContent  = document.getElementById('introHeaderContent');
  const pancongObject  = document.getElementById('pancongObject');
  const floatingToppings = document.querySelectorAll('.topping-item');
  const swirlWrapper   = document.getElementById('introSwirlWrapper');
  const swirlImg       = document.getElementById('swirlImg');
  const revealContent  = document.getElementById('swirlRevealContent');
  const scrollCue      = document.getElementById('introScrollCue');
  const lightBeam      = document.querySelector('.intro-light-beam');
  const navbar         = document.getElementById('navbar');

  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let currentProgress = 0, targetProgress = 0;

  // Mouse Parallax listener
  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth) - 0.5;
    targetMouseY = (e.clientY / window.innerHeight) - 0.5;
  }, { passive: true });

  // Mobile Device Tilt Parallax
  window.addEventListener('deviceorientation', (e) => {
    if (e.gamma !== null && e.beta !== null) {
      targetMouseX = Math.max(-0.5, Math.min(0.5, e.gamma / 45));
      targetMouseY = Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 45));
    }
  }, { passive: true });

  // Scroll cue click to jump to reveal / menu
  scrollCue?.addEventListener('click', () => {
    if (introSection) {
      const targetScroll = introSection.offsetTop + (introSection.offsetHeight * 0.7);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  });

  // Animation Loop via requestAnimationFrame
  function renderIntroFrame() {
    // Lerp smooth interpolation
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    if (introSection) {
      const rect = introSection.getBoundingClientRect();
      const totalScrollable = introSection.offsetHeight - window.innerHeight;
      if (totalScrollable > 0) {
        targetProgress = -rect.top / totalScrollable;
        targetProgress = Math.max(0, Math.min(1, targetProgress));
      }
      currentProgress += (targetProgress - currentProgress) * 0.12;
    }

    const p = currentProgress;

    // 1. Hero Header Text (Stage 1)
    if (headerContent) {
      const headerOp = Math.max(0, 1 - (p / 0.22));
      const headerTranslateY = -p * 160;
      const headerScale = 1 - (p * 0.15);
      headerContent.style.opacity = headerOp.toFixed(3);
      headerContent.style.transform = `translate3d(0, ${headerTranslateY.toFixed(1)}px, 0) scale(${headerScale.toFixed(3)})`;
      headerContent.style.pointerEvents = p > 0.18 ? 'none' : 'auto';
    }

    // 2. 3D Floating Pancong Object Plunge Zoom (Stage 1 -> Stage 2)
    if (pancongObject) {
      let pancongScale, pancongOpacity;
      if (p <= 0.65) {
        pancongScale = 1 + Math.pow(p / 0.65, 2.2) * 5.5;
        pancongOpacity = p < 0.38 ? 1 : Math.max(0, 1 - ((p - 0.38) / 0.22));
      } else {
        pancongScale = 6.5;
        pancongOpacity = 0;
      }

      const tiltX = -mouseY * 16 * (1 - Math.min(1, p * 1.5));
      const tiltY = mouseX * 16 * (1 - Math.min(1, p * 1.5));
      pancongObject.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(${pancongScale.toFixed(3)})`;
      pancongObject.style.opacity = pancongOpacity.toFixed(3);
    }

    // 3. Floating 3D Toppings Dispersion
    if (floatingToppings && floatingToppings.length > 0) {
      floatingToppings.forEach((item, index) => {
        const depth = parseFloat(item.dataset.depth || '0.5');
        const angle = (index / floatingToppings.length) * Math.PI * 2;
        const spreadDist = Math.pow(p, 1.25) * 520 * depth;
        const spreadX = Math.cos(angle) * spreadDist + (mouseX * depth * 70);
        const spreadY = Math.sin(angle) * spreadDist + (mouseY * depth * 70);
        const toppingOp = Math.max(0, 1 - (p / 0.42));
        item.style.transform = `translate3d(${spreadX.toFixed(1)}px, ${spreadY.toFixed(1)}px, ${(depth * 80).toFixed(1)}px) scale(${(1 + p * 0.6).toFixed(2)}) rotate(${(spreadX * 0.4).toFixed(1)}deg)`;
        item.style.opacity = toppingOp.toFixed(3);
      });
    }

    // 4. Molten Swirl Vortex (Stage 3)
    if (swirlWrapper && swirlImg) {
      if (p < 0.26) {
        swirlWrapper.style.opacity = '0';
        swirlWrapper.classList.remove('active-interactive');
      } else {
        const swirlOp = Math.min(1, (p - 0.26) / 0.26);
        swirlWrapper.style.opacity = swirlOp.toFixed(3);
        const swirlScale = 0.68 + (p * 0.42);
        const swirlRot = p * 140;
        swirlImg.style.transform = `scale(${swirlScale.toFixed(3)}) rotate(${swirlRot.toFixed(1)}deg)`;
        if (p >= 0.58) {
          swirlWrapper.classList.add('active-interactive');
        } else {
          swirlWrapper.classList.remove('active-interactive');
        }
      }
    }

    // 5. Reveal Headline Content (Stage 4)
    if (revealContent) {
      if (p < 0.56) {
        revealContent.style.opacity = '0';
        revealContent.style.transform = 'translate3d(0, 35px, 0) scale(0.92)';
        revealContent.style.pointerEvents = 'none';
      } else {
        const revProgress = Math.min(1, (p - 0.56) / 0.25);
        revealContent.style.opacity = revProgress.toFixed(3);
        const transY = (1 - revProgress) * 35;
        const scaleRev = 0.92 + (revProgress * 0.08);
        revealContent.style.transform = `translate3d(0, ${transY.toFixed(1)}px, 0) scale(${scaleRev.toFixed(3)})`;
        revealContent.style.pointerEvents = revProgress > 0.5 ? 'auto' : 'none';
      }
    }

    // 6. Scroll Indicator Cue Fade
    if (scrollCue) {
      const cueOp = Math.max(0, 1 - (p / 0.12));
      scrollCue.style.opacity = cueOp.toFixed(3);
    }

    // 7. Light Beam subtle drift
    if (lightBeam) {
      lightBeam.style.transform = `rotate(${(-15 + mouseX * 6).toFixed(1)}deg) translate3d(${(mouseX * 25).toFixed(1)}px, ${(mouseY * 25).toFixed(1)}px, 0)`;
    }

    requestAnimationFrame(renderIntroFrame);
  }

  requestAnimationFrame(renderIntroFrame);

  // ---- Mobile Drawer & Navigation ----
  const tabs   = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.tab;
      tabs.forEach(t   => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(id)?.classList.add('active');
    });
  });

  // ---- Add-to-cart feedback ----
  document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', function() {
      this.textContent = '✓';
      this.style.background = '#2A7A2A';
      setTimeout(() => {
        this.textContent = '+';
        this.style.background = '';
      }, 900);
    });
  });

  // ---- Active nav highlight on scroll ----
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + entry.target.id
            ? 'var(--gold)' : '';
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => navObserver.observe(s));

  // ---- Scroll reveal for cards & sections ----
  const revealItems = document.querySelectorAll(
    '.mcard, .paket-card, .afeat, .ccard, .astat, .ibar-item'
  );

  revealItems.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity .55s ease ${i * 0.055}s, transform .55s ease ${i * 0.055}s`;
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealItems.forEach(el => revealObserver.observe(el));

  // ---- Navbar scroll glass effect ----
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
        navbar.style.boxShadow = '0 4px 28px rgba(0,0,0,0.85)';
      } else {
        navbar.classList.remove('scrolled');
        navbar.style.boxShadow = '';
      }
    }
  }, { passive: true });

});

