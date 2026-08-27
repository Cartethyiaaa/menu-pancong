document.addEventListener('DOMContentLoaded', () => {

  // ---- Preloader Splash Animation ----
  const preloader = document.getElementById('preloader');
  const hidePreloader = () => {
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
    }
  };

  // Preloader splash animation displays for 2.8 seconds on page entry / refresh
  setTimeout(hidePreloader, 2800);

  // ---- Mobile drawer ----
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('drawer');
  const overlay   = document.getElementById('drawerOverlay');
  const closeBtn  = document.getElementById('drawerClose');

  function openDrawer()  { drawer.classList.add('open'); overlay.classList.add('show'); }
  function closeDrawer() { drawer.classList.remove('open'); overlay.classList.remove('show'); }

  hamburger?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeDrawer));

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
  }, { threshold: 0.4 });

  sections.forEach(s => navObserver.observe(s));

  // ---- Scroll reveal ----
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

  // ---- Navbar scroll shadow ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 30
      ? '0 2px 24px rgba(0,0,0,0.8)'
      : '';
  }, { passive: true });

});
