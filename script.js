document.addEventListener("DOMContentLoaded", () => {

  // ---- Preloader Entrance Splash Animation ----
  const preloader = document.getElementById("preloader");
  const dismissPreloader = () => {
    if (preloader && !preloader.classList.contains("fade-out")) {
      preloader.classList.add("fade-out");
    }
  };
  
  window.addEventListener("load", () => {
    setTimeout(dismissPreloader, 400);
  });
  setTimeout(dismissPreloader, 1500);

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

  // ---- 3D CINEMATIC INTRO SCROLL & PARALLAX ENGINE ----
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

  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let currentProgress = 0, targetProgress = 0;

  // Lightweight passive mouse movement listener
  window.addEventListener("mousemove", (e) => {
    targetMouseX = (e.clientX / window.innerWidth) - 0.5;
    targetMouseY = (e.clientY / window.innerHeight) - 0.5;
  }, { passive: true });

  // Mobile Device Tilt Parallax
  window.addEventListener("deviceorientation", (e) => {
    if (e.gamma !== null && e.beta !== null) {
      targetMouseX = Math.max(-0.5, Math.min(0.5, e.gamma / 45));
      targetMouseY = Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 45));
    }
  }, { passive: true });

  // Scroll cue click to jump smoothly to menu
  scrollCue?.addEventListener("click", () => {
    const menuSec = document.getElementById("menu");
    if (menuSec) {
      menuSec.scrollIntoView({ behavior: "smooth" });
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
      
      if (totalScrollable > 0) {
        targetProgress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      }

      currentProgress += (targetProgress - currentProgress) * 0.14;
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      const p = currentProgress;

      if (rect.bottom > -100 && rect.top < window.innerHeight + 100) {
        
        // 1. Header Text
        if (headerContent) {
          const headerAlpha = 1 - smoothstep(0.02, 0.22, p);
          const headerY = -p * 150;
          headerContent.style.opacity = headerAlpha.toFixed(3);
          headerContent.style.transform = `translate3d(0, ${headerY.toFixed(1)}px, 0)`;
          headerContent.style.pointerEvents = headerAlpha < 0.1 ? "none" : "auto";
        }

        // 2. Pancong Zoom Plunge
        if (pancongObject) {
          const zoomProgress = smoothstep(0.05, 0.60, p);
          const pancongScale = 1 + zoomProgress * 4.5;
          const pancongAlpha = 1 - smoothstep(0.32, 0.56, p);

          const tiltX = -mouseY * 14 * (1 - Math.min(1, p * 1.5));
          const tiltY = mouseX * 14 * (1 - Math.min(1, p * 1.5));
          pancongObject.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(${pancongScale.toFixed(3)})`;
          pancongObject.style.opacity = pancongAlpha.toFixed(3);
        }

        // 3. Floating 3D Toppings Dispersion
        if (floatingToppings.length > 0) {
          const spreadFactor = smoothstep(0.05, 0.45, p);
          floatingToppings.forEach((item) => {
            const depth = parseFloat(item.dataset.depth || "0.5");
            const dir = parseFloat(item.dataset.direction || "1");
            const spreadDist = spreadFactor * 450 * depth;
            const spreadX = (dir * spreadDist) + (mouseX * depth * 60);
            const spreadY = (mouseY * depth * 60);
            const toppingAlpha = 1 - smoothstep(0.1, 0.38, p);
            item.style.transform = `translate3d(${spreadX.toFixed(1)}px, ${spreadY.toFixed(1)}px, 0) scale(${(1 + spreadFactor * 0.4).toFixed(2)})`;
            item.style.opacity = toppingAlpha.toFixed(3);
          });
        }

        // 4. Molten Swirl Vortex
        if (swirlWrapper && swirlImg) {
          const swirlAlpha = smoothstep(0.26, 0.52, p);
          swirlWrapper.style.opacity = swirlAlpha.toFixed(3);
          
          const swirlScale = 0.70 + (p * 0.38);
          const swirlRot = p * 130;
          swirlImg.style.transform = `scale(${swirlScale.toFixed(3)}) rotate(${swirlRot.toFixed(1)}deg)`;
          
          if (p >= 0.55) {
            swirlWrapper.classList.add("active-interactive");
          } else {
            swirlWrapper.classList.remove("active-interactive");
          }
        }

        // 5. Reveal Content Headline & Buttons
        if (revealContent) {
          const revAlpha = smoothstep(0.50, 0.75, p);
          revealContent.style.opacity = revAlpha.toFixed(3);
          const transY = (1 - revAlpha) * 30;
          const scaleRev = 0.94 + (revAlpha * 0.06);
          revealContent.style.transform = `translate3d(0, ${transY.toFixed(1)}px, 0) scale(${scaleRev.toFixed(3)})`;
          revealContent.style.pointerEvents = revAlpha > 0.5 ? "auto" : "none";
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

  // ---- Navbar Dynamic Blur/Solid on Scroll ----
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  }, { passive: true });

  // ---- Active Link on Scroll ----
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => navObserver.observe(sec));

  // ---- Scroll Reveal Animation for Cards ----
  const revealItems = document.querySelectorAll(".reveal-item");
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const siblings = Array.from(el.parentElement?.children || [el]);
        const idx = siblings.indexOf(el);
        el.style.transitionDelay = (idx * 0.08) + "s";
        el.classList.add("revealed");
        cardObserver.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  revealItems.forEach((el) => cardObserver.observe(el));

  // ---- Interactive Butterscotch Coffee Card Hover Animation ----
  const bsCard = document.getElementById("butterscotchCard");
  if (bsCard) {
    bsCard.addEventListener("mouseenter", () => {
      const tag = bsCard.querySelector(".butterscotch-tag-float");
      if (tag) {
        tag.style.transform = "scale(1.08) translateY(-4px)";
        tag.style.borderColor = "var(--gold)";
      }
    });
    bsCard.addEventListener("mouseleave", () => {
      const tag = bsCard.querySelector(".butterscotch-tag-float");
      if (tag) {
        tag.style.transform = "";
        tag.style.borderColor = "";
      }
    });
  }

  // ============================================================
  // ======= KERANJANG PESANAN (CART & WHATSAPP CHECKOUT) =======
  // ============================================================

  const CART_STORAGE_KEY = "pancong_donto_cart_v2";
  let cart = [];

  function loadCart() {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) cart = JSON.parse(saved);
      if (!Array.isArray(cart)) cart = [];
    } catch (e) {
      cart = [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {}
  }

  function formatIDR(amount) {
    return "Rp " + Number(amount).toLocaleString("id-ID");
  }

  function getCartStats() {
    let totalQty = 0;
    let totalPrice = 0;
    cart.forEach(item => {
      totalQty += item.qty;
      totalPrice += item.price * item.qty;
    });
    return { totalQty, totalPrice };
  }

  const cartDrawer     = document.getElementById("cartDrawer");
  const cartOverlay    = document.getElementById("cartOverlay");
  const cartCloseBtn   = document.getElementById("cartClose");
  const btnNavCart     = document.getElementById("btnNavCart");
  const floatingCartFab= document.getElementById("floatingCartFab");
  const cartBody       = document.getElementById("cartBody");
  const navCartCount   = document.getElementById("navCartCount");
  const fabCartCount   = document.getElementById("fabCartCount");
  const cartSumQty     = document.getElementById("cartSumQty");
  const cartSumTotal   = document.getElementById("cartSumTotal");
  const btnCheckoutWA  = document.getElementById("btnCheckoutWA");
  const cartToast      = document.getElementById("cartToast");
  const toastMsg       = document.getElementById("toastMsg");
  const toastViewBtn   = document.getElementById("toastViewBtn");
  const custNameInput  = document.getElementById("custName");
  const orderTypeSelect= document.getElementById("orderType");
  const orderNotesInput= document.getElementById("orderNotes");

  function openCart() {
    cartDrawer?.classList.add("open");
    cartOverlay?.classList.add("show");
    document.body.style.overflow = "hidden";
    renderCart();
  }

  function closeCart() {
    cartDrawer?.classList.remove("open");
    cartOverlay?.classList.remove("show");
    document.body.style.overflow = "";
  }

  btnNavCart?.addEventListener("click", openCart);
  floatingCartFab?.addEventListener("click", openCart);
  cartCloseBtn?.addEventListener("click", closeCart);
  cartOverlay?.addEventListener("click", closeCart);
  toastViewBtn?.addEventListener("click", () => {
    hideToast();
    openCart();
  });

  let toastTimeout = null;
  function showToast(text) {
    if (toastMsg) toastMsg.textContent = text;
    cartToast?.classList.add("show");
    if (floatingCartFab) {
      floatingCartFab.classList.remove("cart-bump");
      void floatingCartFab.offsetWidth;
      floatingCartFab.classList.add("cart-bump");
    }
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(hideToast, 3000);
  }

  function hideToast() {
    cartToast?.classList.remove("show");
  }

  function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price: Number(price), qty: 1 });
    }
    saveCart();
    renderCart();
    showToast(`${name} ditambahkan!`);
  }

  function updateQty(name, delta) {
    const item = cart.find(i => i.name === name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.name !== name);
    }
    saveCart();
    renderCart();
  }

  function removeFromCart(name) {
    cart = cart.filter(i => i.name !== name);
    saveCart();
    renderCart();
    showToast(`${name} dihapus dari keranjang`);
  }

  function clearCart() {
    cart = [];
    saveCart();
    renderCart();
    showToast("Keranjang dikosongkan");
  }

  function renderCart() {
    const { totalQty, totalPrice } = getCartStats();

    // Update Counter Badges
    if (navCartCount) navCartCount.textContent = totalQty;
    if (fabCartCount) fabCartCount.textContent = totalQty;
    if (cartSumQty) cartSumQty.textContent = totalQty + " pcs";
    if (cartSumTotal) cartSumTotal.textContent = formatIDR(totalPrice);

    if (btnCheckoutWA) {
      btnCheckoutWA.disabled = cart.length === 0;
    }

    if (!cartBody) return;

    if (cart.length === 0) {
      cartBody.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon">&#128722;</div>
          <h4 class="cart-empty-title">Keranjang Masih Kosong</h4>
          <p class="cart-empty-desc">Pilih pancong lumer hangat, kopi spesial, atau paket hemat favoritmu!</p>
          <button type="button" class="btn-browse-menu" id="btnBrowseMenu">Jelajahi Menu &#8594;</button>
        </div>
      `;
      document.getElementById("btnBrowseMenu")?.addEventListener("click", () => {
        closeCart();
        document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
      });
      return;
    }

    let itemsHtml = `
      <div class="cart-action-bar">
        <span>Pesanan Kamu (${totalQty} item)</span>
        <button type="button" class="btn-clear-cart" data-action="clear-all">Kosongkan &#128465;</button>
      </div>
    `;

    cart.forEach(item => {
      const subtotal = item.price * item.qty;
      const safeName = encodeURIComponent(item.name);
      itemsHtml += `
        <div class="cart-item">
          <div class="cart-item-header">
            <div>
              <h4 class="cart-item-title">${item.name}</h4>
              <span class="cart-item-price-unit">${formatIDR(item.price)} / item</span>
            </div>
            <button type="button" class="cart-item-delete" data-del="${safeName}" title="Hapus ${item.name}">&#128465;</button>
          </div>
          <div class="cart-item-bottom">
            <div class="cart-qty-ctrl">
              <button type="button" class="cart-qty-btn" data-qty-minus="${safeName}" aria-label="Kurangi jumlah">&minus;</button>
              <span class="cart-qty-num">${item.qty}</span>
              <button type="button" class="cart-qty-btn" data-qty-plus="${safeName}" aria-label="Tambah jumlah">+</button>
            </div>
            <span class="cart-item-subtotal">${formatIDR(subtotal)}</span>
          </div>
        </div>
      `;
    });

    cartBody.innerHTML = itemsHtml;
  }

  // ---- ROBUST EVENT DELEGATION FOR CART ACTIONS (TOUCH & CLICK) ----
  if (cartBody) {
    const handleCartAction = (e) => {
      // 1. Plus button
      const plusBtn = e.target.closest("[data-qty-plus]");
      if (plusBtn) {
        e.preventDefault();
        e.stopPropagation();
        const name = decodeURIComponent(plusBtn.getAttribute("data-qty-plus"));
        updateQty(name, 1);
        return;
      }

      // 2. Minus button
      const minusBtn = e.target.closest("[data-qty-minus]");
      if (minusBtn) {
        e.preventDefault();
        e.stopPropagation();
        const name = decodeURIComponent(minusBtn.getAttribute("data-qty-minus"));
        updateQty(name, -1);
        return;
      }

      // 3. Delete button
      const delBtn = e.target.closest("[data-del]");
      if (delBtn) {
        e.preventDefault();
        e.stopPropagation();
        const name = decodeURIComponent(delBtn.getAttribute("data-del"));
        removeFromCart(name);
        return;
      }

      // 4. Clear all button
      const clearBtn = e.target.closest("[data-action='clear-all']");
      if (clearBtn) {
        e.preventDefault();
        e.stopPropagation();
        clearCart();
        return;
      }
    };

    cartBody.addEventListener("click", handleCartAction);
  }

  // Bind all Add-to-Cart Buttons across the whole page (Delegated)
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".btn-add-item");
    if (addBtn) {
      e.preventDefault();
      const name = addBtn.getAttribute("data-name");
      const price = parseInt(addBtn.getAttribute("data-price"), 10) || 0;
      if (name && price > 0) {
        addToCart(name, price);
      }
    }
  });

  // ---- CHECKOUT TO WHATSAPP ----
  btnCheckoutWA?.addEventListener("click", (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const name = custNameInput?.value.trim() || "Pelanggan";
    const type = orderTypeSelect?.value || "Dine-in (Makan di Tempat)";
    const notes = orderNotesInput?.value.trim() || "";
    const { totalQty, totalPrice } = getCartStats();

    let itemsList = "";
    cart.forEach(item => {
      const subtotal = item.price * item.qty;
      itemsList += `• ${item.qty}x ${item.name} (${formatIDR(subtotal)})\n`;
    });

    let message = `Halo Pancong Donto! 👋\nSaya mau pesan:\n\n`;
    message += `📋 DETAIL PESANAN (${totalQty} item):\n`;
    message += `${itemsList}\n`;
    message += `💰 TOTAL: ${formatIDR(totalPrice)}\n\n`;
    message += `👤 Nama: ${name}\n`;
    message += `🛵 Opsi: ${type}\n`;
    if (notes) {
      message += `📝 Catatan: ${notes}\n`;
    }
    message += `\nMohon diproses ya min, terima kasih! 🙏`;

    const waUrl = `https://wa.me/6285782203468?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  });

  // Initial Load & Render
  loadCart();
  renderCart();

});
