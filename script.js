document.addEventListener('DOMContentLoaded', () => {

  // ---- Preloader Splash Animation ----
  const preloader = document.getElementById('preloader');
  const hidePreloader = () => {
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
    }
  };
  setTimeout(hidePreloader, 2400);

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
  const introSection     = document.getElementById('home');
  const headerContent    = document.getElementById('introHeaderContent');
  const pancongObject    = document.getElementById('pancongObject');
  const floatingToppings = document.querySelectorAll('.topping-item');
  const swirlWrapper     = document.getElementById('introSwirlWrapper');
  const swirlImg         = document.getElementById('swirlImg');
  const revealContent    = document.getElementById('swirlRevealContent');
  const scrollCue        = document.getElementById('introScrollCue');
  const lightBeam        = document.querySelector('.intro-light-beam');
  const navbar           = document.getElementById('navbar');

  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let currentProgress = 0, targetProgress = 0;

  // Lightweight passive mouse movement listener
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

  // Scroll cue click to jump smoothly to menu
  scrollCue?.addEventListener('click', () => {
    const menuSec = document.getElementById('menu');
    if (menuSec) {
      menuSec.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Smoothstep utility for butter-smooth easing
  function smoothstep(min, max, val) {
    const x = Math.max(0, Math.min(1, (val - min) / (max - min)));
    return x * x * (3 - 2 * x);
  }

  // Animation Loop via requestAnimationFrame
  function renderIntroFrame() {
    if (introSection) {
      const rect = introSection.getBoundingClientRect();
      const totalScrollable = introSection.offsetHeight - window.innerHeight;
      
      // Calculate target progress
      if (totalScrollable > 0) {
        targetProgress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      }

      // Smooth lerp (friction interpolation)
      currentProgress += (targetProgress - currentProgress) * 0.14;
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      const p = currentProgress;

      // Only perform transforms when intro is in or near viewport
      if (rect.bottom > -100 && rect.top < window.innerHeight + 100) {
        
        // 1. Header Text (fades out 0.0 -> 0.22)
        if (headerContent) {
          const headerAlpha = 1 - smoothstep(0.02, 0.22, p);
          const headerY = -p * 150;
          headerContent.style.opacity = headerAlpha.toFixed(3);
          headerContent.style.transform = `translate3d(0, ${headerY.toFixed(1)}px, 0)`;
          headerContent.style.pointerEvents = headerAlpha < 0.1 ? 'none' : 'auto';
        }

        // 2. Pancong Zoom Plunge (scale 1.0 -> 5.5, fades out 0.32 -> 0.56)
        if (pancongObject) {
          const zoomProgress = smoothstep(0.05, 0.60, p);
          const pancongScale = 1 + zoomProgress * 4.5;
          const pancongAlpha = 1 - smoothstep(0.32, 0.56, p);

          const tiltX = -mouseY * 14 * (1 - Math.min(1, p * 1.5));
          const tiltY = mouseX * 14 * (1 - Math.min(1, p * 1.5));
          pancongObject.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(${pancongScale.toFixed(3)})`;
          pancongObject.style.opacity = pancongAlpha.toFixed(3);
        }

        // 3. Floating 3D Toppings & Coffee Beans Dispersion
        if (floatingToppings.length > 0) {
          const spreadFactor = smoothstep(0.05, 0.45, p);
          floatingToppings.forEach((item) => {
            const depth = parseFloat(item.dataset.depth || '0.5');
            const dir = parseFloat(item.dataset.direction || '1');
            const spreadDist = spreadFactor * 450 * depth;
            const spreadX = (dir * spreadDist) + (mouseX * depth * 60);
            const spreadY = (mouseY * depth * 60);
            const toppingAlpha = 1 - smoothstep(0.1, 0.38, p);
            item.style.transform = `translate3d(${spreadX.toFixed(1)}px, ${spreadY.toFixed(1)}px, 0) scale(${(1 + spreadFactor * 0.4).toFixed(2)})`;
            item.style.opacity = toppingAlpha.toFixed(3);
          });
        }

        // 4. Molten Swirl Vortex (fades in 0.26 -> 0.52)
        if (swirlWrapper && swirlImg) {
          const swirlAlpha = smoothstep(0.26, 0.52, p);
          swirlWrapper.style.opacity = swirlAlpha.toFixed(3);
          
          const swirlScale = 0.70 + (p * 0.38);
          const swirlRot = p * 130;
          swirlImg.style.transform = `scale(${swirlScale.toFixed(3)}) rotate(${swirlRot.toFixed(1)}deg)`;
          
          if (p >= 0.55) {
            swirlWrapper.classList.add('active-interactive');
          } else {
            swirlWrapper.classList.remove('active-interactive');
          }
        }

        // 5. Reveal Content Headline & Buttons (fades in 0.50 -> 0.75)
        if (revealContent) {
          const revAlpha = smoothstep(0.50, 0.75, p);
          revealContent.style.opacity = revAlpha.toFixed(3);
          const transY = (1 - revAlpha) * 30;
          const scaleRev = 0.94 + (revAlpha * 0.06);
          revealContent.style.transform = `translate3d(0, ${transY.toFixed(1)}px, 0) scale(${scaleRev.toFixed(3)})`;
          revealContent.style.pointerEvents = revAlpha > 0.5 ? 'auto' : 'none';
        }

        // 6. Scroll Indicator Cue Fade
        if (scrollCue) {
          const cueAlpha = 1 - smoothstep(0.0, 0.12, p);
          scrollCue.style.opacity = cueAlpha.toFixed(3);
        }

        // 7. Light Beam Subtle Parallax
        if (lightBeam) {
          lightBeam.style.transform = `rotate(${(-15 + mouseX * 5).toFixed(1)}deg) translate3d(${(mouseX * 20).toFixed(1)}px, ${(mouseY * 20).toFixed(1)}px, 0)`;
        }
      }
    }

    requestAnimationFrame(renderIntroFrame);
  }

  requestAnimationFrame(renderIntroFrame);

  // ---- Tabs ----
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
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }, { passive: true });

});

