/**
 * Main Application Logic
 * Modularized for cleanliness and performance
 */

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

const App = {
  // Central State
  state: {
    isScrolled: false,
    currentSection: "",
    ticking: false,
  },

  init() {
    this.cacheDOM();
    this.handlePageLoad();
    this.initTheme();
    this.initScrollObservers();
    this.initCounters();
    this.initPortfolio();
    this.initHeroEffects();
    this.initInteractionEffects();
    this.initSmoothScroll();
    this.initEasterEgg();
    this.initGlobalScroll(); // Central scroll handler
  },

  cacheDOM() {
    this.dom = {
      navbar: document.getElementById("navbar"),
      mobileBtn: document.getElementById("mobileMenuBtn"),
      mobileMenu: document.getElementById("mobileMenu"),
      navLinks: document.querySelectorAll(".nav-link, .mobile-link"),
      sections: document.querySelectorAll("section, header"),
      backToTop: document.getElementById("backToTop"),
      heroBg: document.getElementById("heroBg"),
    };
  },

  /**
   * Central Optimized Scroll Handler
   * Handles Navbar, ScrollSpy, BackToTop, and Parallax
   */
  initGlobalScroll() {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;

      // 1. Sticky Navbar
      if (scrollY > 50 && !this.state.isScrolled) {
        this.dom.navbar.classList.add("scrolled");
        this.state.isScrolled = true;
      } else if (scrollY <= 50 && this.state.isScrolled) {
        this.dom.navbar.classList.remove("scrolled");
        this.state.isScrolled = false;
      }

      // 2. Back to Top Button
      if (this.dom.backToTop) {
        if (scrollY > 300) {
          this.dom.backToTop.classList.remove("hidden");
          this.dom.backToTop.classList.add("show");
        } else {
          this.dom.backToTop.classList.remove("show");
          // Defer hiding to allow transition
          if (!this.dom.backToTop.dataset.hiding) {
            this.dom.backToTop.dataset.hiding = "true";
            setTimeout(() => {
              this.dom.backToTop.classList.add("hidden");
              delete this.dom.backToTop.dataset.hiding;
            }, 300);
          }
        }
      }

      // 3. Parallax (Limited to view)
      if (this.dom.heroBg && scrollY < innerHeight) {
        this.dom.heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
      }

      // 4. ScrollSpy (Throttled slightly via RAF nature)
      let activeId = "";
      this.dom.sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.clientHeight;
        if (scrollY >= top - 150) {
          activeId = section.getAttribute("id");
        }
      });

      if (activeId !== this.state.currentSection) {
        this.state.currentSection = activeId;
        this.dom.navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").includes(activeId)) {
            link.classList.add("active");
          }
        });
      }

      this.state.ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!this.state.ticking) {
        window.requestAnimationFrame(onScroll);
        this.state.ticking = true;
      }
    }, { passive: true });

    // Initial check
    onScroll();

    // Setup Mobile Menu Toggle (Moved here for grouping)
    if (this.dom.mobileBtn && this.dom.mobileMenu) {
      const toggleMenu = () => {
        const isHidden = this.dom.mobileMenu.classList.contains("hidden");
        if (isHidden) {
          this.dom.mobileMenu.classList.remove("hidden");
          this.dom.mobileMenu.classList.add("flex");
          this.dom.mobileBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
          this.dom.mobileMenu.classList.add("hidden");
          this.dom.mobileMenu.classList.remove("flex");
          this.dom.mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
      };

      this.dom.mobileBtn.addEventListener("click", toggleMenu);
      this.dom.mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          this.dom.mobileMenu.classList.add("hidden");
          this.dom.mobileMenu.classList.remove("flex");
          this.dom.mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
      });
    }

    // Back to Top Click
    if (this.dom.backToTop) {
      this.dom.backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  },

  /**
   * Lenis Smooth Scroll
   */
  initSmoothScroll() {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Sync Lenis with RAF
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.lenis = lenis;

    // Handle Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const target = document.querySelector(targetId);
        if (target) {
          lenis.scrollTo(target, { offset: -80 });
        }
      });
    });
  },

  /**
   * Easter Egg: Profile Click
   */
  initEasterEgg() {
    const profilePic = document.getElementById("profilePic");
    if (!profilePic) return;

    let clickCount = 0;
    let resetTimer;
    const messages = ["Aduh!", "Jangan dipencet bang...", "Woi pusing!", "Ampun bang jago!", "Dahlah males..."];

    const showToast = (msg) => {
      let toast = document.getElementById("toast");
      if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      requestAnimationFrame(() => toast.classList.add("show"));
      setTimeout(() => toast.classList.remove("show"), 2000);
    };

    profilePic.addEventListener("click", () => {
      clickCount++;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => clickCount = 0, 2000);

      profilePic.classList.remove("shake-anim", "spin-anim");
      void profilePic.offsetWidth; // Trigger reflow

      if (clickCount >= 5) {
        profilePic.classList.add("spin-anim");
        showToast(messages[Math.floor(Math.random() * messages.length)]);
        clickCount = 0;
      } else {
        profilePic.classList.add("shake-anim");
      }
    });

    profilePic.setAttribute("draggable", "false");
  },

  /**
   * Page Load Animation
   */
  handlePageLoad() {
    document.body.classList.add("page-loading");
    window.addEventListener("load", () => {
      setTimeout(() => {
        document.body.classList.remove("page-loading");
        document.body.classList.add("page-loaded");
      }, 100);
    });
  },

  /**
   * Theme Manager
   */
  initTheme() {
    const toggleBtn = document.getElementById("themeToggle");
    const icon = toggleBtn?.querySelector("i");
    const body = document.body;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      body.classList.add("light");
      icon?.classList.replace("fa-moon", "fa-sun");
    }

    toggleBtn?.addEventListener("click", () => {
      body.classList.toggle("light");
      const isLight = body.classList.contains("light");

      icon?.classList.replace(isLight ? "fa-moon" : "fa-sun", isLight ? "fa-sun" : "fa-moon");
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  },

  /**
   * Scroll Animations (IntersectionObserver)
   */
  initScrollObservers() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  },

  /**
   * Animated Counters
   */
  initCounters() {
    const statsSection = document.querySelector(".stats");
    if (!statsSection) return;

    const startCounters = () => {
      document.querySelectorAll(".counter").forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const duration = 2000;
        const startTime = performance.now();

        const update = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

          counter.innerText = Math.floor(ease * target);

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            counter.innerText = target;
            counter.closest(".stat-card")?.classList.add("pulse");
          }
        };
        requestAnimationFrame(update);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startCounters();
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  },

  /**
   * Portfolio Modal (Optimized)
   */
  initPortfolio() {
    const openModal = (item) => {
      const img = item.dataset.img;
      const title = item.dataset.title;
      const desc = item.dataset.desc;

      const modal = document.createElement("div");
      modal.className = "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 opacity-0 transition-opacity duration-300";
      modal.innerHTML = `
        <div class="glass w-full max-w-2xl max-h-[90vh] overflow-y-auto transform scale-90 transition-transform duration-300 rounded-2xl relative flex flex-col">
          <button class="absolute top-4 right-4 bg-gray-800/80 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors z-10 sticky-close shadow-lg text-lg">
            <i class="fas fa-times"></i>
          </button>
          <div class="relative shrink-0">
            <img src="${img}" alt="${title}" class="w-full h-48 sm:h-72 object-cover rounded-t-xl" />
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
          </div>
          <div class="p-6 md:p-8 flex-1">
            <h3 class="text-2xl md:text-3xl font-bold mb-3 text-indigo-400 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 p-1">${title}</h3>
            <p class="text-gray-300 leading-relaxed mb-6 text-base md:text-lg">${desc}</p>
            <div class="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-700/50">
              <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold transition-all hover:shadow-lg hover:scale-105 btn-ripple flex items-center justify-center gap-2">
                <i class="fas fa-external-link-alt"></i> Live Demo
              </button>
              <button class="border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white px-8 py-3 rounded-full font-bold transition-all hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
                <i class="fab fa-github"></i> Source Code
              </button>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(modal);
      document.body.style.overflow = "hidden";

      requestAnimationFrame(() => {
        modal.classList.add("opacity-100");
        modal.querySelector("div").classList.remove("scale-90");
        modal.querySelector("div").classList.add("scale-100");
      });

      const close = () => {
        modal.classList.remove("opacity-100");
        modal.querySelector("div").classList.remove("scale-100");
        modal.querySelector("div").classList.add("scale-90");
        setTimeout(() => {
          modal.remove();
          document.body.style.overflow = "";
        }, 300);
      };

      modal.querySelector(".sticky-close").addEventListener("click", close);
      modal.addEventListener("click", (e) => e.target === modal && close());

      const escapeHandler = (e) => {
        if (e.key === "Escape") {
          close();
          document.removeEventListener("keydown", escapeHandler);
        }
      };
      document.addEventListener("keydown", escapeHandler);
    };

    document.querySelectorAll(".portfolio-item").forEach(item => {
      item.addEventListener("click", () => openModal(item));
    });
  },

  /**
   * Hero Effects (Text + Parallax handled globally now)
   */
  initHeroEffects() {
    const titleEl = document.getElementById("heroTitle");
    if (!titleEl) return;

    // Text Reveal Logic
    const text = titleEl.textContent.trim();
    if (!titleEl.dataset.initialized) {
      titleEl.dataset.initialized = "true";
      titleEl.textContent = "";
      titleEl.style.opacity = "1";

      const chars = text.split("");
      chars.forEach((char, index) => {
        if (char === " ") {
          titleEl.appendChild(document.createTextNode(" "));
        } else {
          const span = document.createElement("span");
          span.textContent = char;
          span.className = "hero-char";
          span.style.animationDelay = `${index * 0.03}s`;
          titleEl.appendChild(span);
        }
      });
    }
    // Parallax is now handled in initGlobalScroll
  },

  /**
   * Interaction Effects (Ripple, etc.)
   */
  initInteractionEffects() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-ripple");
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });

    // Dark Mode Neon Flicker
    setInterval(() => {
      if (document.body.classList.contains("light")) return;
      const glassElements = document.querySelectorAll(".glass");
      if (glassElements.length === 0) return;
      if (Math.random() > 0.8) {
        const el = glassElements[Math.floor(Math.random() * glassElements.length)];
        el.classList.add("flicker");
        setTimeout(() => el.classList.remove("flicker"), 900);
      }
    }, 4000);
  }
};

