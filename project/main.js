// === Counter Animation + pulse on finish (3 detik) ===
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

// === Page Load Animation dengan Delay ===
document.body.classList.add("page-loading");

window.addEventListener("load", () => {
  document.body.classList.remove("page-loading");
  document.body.classList.add("page-loaded");
});


window.addEventListener("load", () => {
  document.body.classList.remove("page-loading");
  document.body.classList.add("page-loaded");
});

  counters.forEach(counter => {
    counter.innerText = "0";

    const target = +counter.getAttribute("data-target");
    const duration = 7000;     // total durasi animasi (ms)
    const frameRate = 70;      // interval update (ms)
    const steps = duration / frameRate;
    const increment = Math.max(1, Math.ceil(target / steps));

    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.innerText = current > target ? target : current;
        setTimeout(updateCounter, frameRate);
      } else {
        counter.innerText = target;
        // add pulse ke parent stat card
        const parent = counter.closest(".stat-card");
        if (parent) {
          parent.classList.add("pulse");
          setTimeout(() => parent.classList.remove("pulse"), 1400);
        }
      }
    };

    updateCounter();
  });
});

// === Scroll reveal (IntersectionObserver) ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal-active");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// === Portfolio Modal ===
const portfolioItems = document.querySelectorAll(".portfolio-item");
const modal = document.getElementById("portfolioModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.getElementById("closeModal");

portfolioItems.forEach(item => {
  item.addEventListener("click", () => {
    modalImg.src = item.getAttribute("data-img");
    modalTitle.textContent = item.getAttribute("data-title");
    modalDesc.textContent = item.getAttribute("data-desc");
    modal.classList.remove("hidden");
  });
});

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", e => { if (e.target === modal) modal.classList.add("hidden"); });

// === Dark / Light Mode Toggle ===
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const icon = themeToggle.querySelector("i");

// Load mode dari localStorage
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  icon.classList.replace("fa-moon", "fa-sun");
}

// Toggle mode
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  if (body.classList.contains("light")) {
    icon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "light");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "dark");
  }
});

// === Hero typing effect (simple) ===
(function heroTyping(){
  const el = document.getElementById("heroTitle");
  const text = el.getAttribute("data-text") || el.textContent.trim();
  const chars = text.split("");
  el.textContent = "";
  let i = 0;
  const speed = 60;
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.style.borderRight = "2px solid rgba(255,255,255,0.6)";
  cursor.style.marginLeft = "6px";
  cursor.style.display = "inline-block";
  cursor.style.height = "1.2em";
  el.parentNode.insertBefore(cursor, el.nextSibling);

  function typeNext(){
    if (i < chars.length) {
      el.textContent += chars[i++];
      setTimeout(typeNext, speed);
    } else {
      // remove cursor after delay
      setTimeout(()=> cursor.remove(), 800);
    }
  }
  typeNext();
})();

// === Hero parallax (subtle) ===
(function heroParallax() {
  const heroBg = document.getElementById("heroBg");
  if (!heroBg) return;
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const speed = parseFloat(heroBg.dataset.speed || 0.25);
    heroBg.style.transform = `translateY(${scrolled * speed}px) scale(1.02)`;
  }, { passive: true });
})();

// === Button ripple effect ===
document.addEventListener("click", function(e){
  const btn = e.target.closest(".btn-ripple");
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  const size = Math.max(rect.width, rect.height) * 0.8;
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = (e.clientX - rect.left - size/2) + "px";
  ripple.style.top = (e.clientY - rect.top - size/2) + "px";
  btn.appendChild(ripple);
  setTimeout(()=> ripple.remove(), 650);
});

// === Neon flicker (dark mode subtle, random) ===
(function neonFlicker() {
  let flickerTimer = null;
  const flickerElements = () => document.querySelectorAll("body:not(.light) .glass");
  function schedule() {
    if (body.classList.contains("light")) return;
    const els = flickerElements();
    if (!els.length) return;
    const idx = Math.floor(Math.random() * els.length);
    const el = els[idx];
    el.classList.add("flicker");
    setTimeout(() => el.classList.remove("flicker"), 900);
    // schedule next between 3-8s
    flickerTimer = setTimeout(schedule, 3000 + Math.random()*5000);
  }
  // start only in dark
  if (!body.classList.contains("light")) schedule();
  // watch theme changes
  const obs = new MutationObserver(()=> {
    if (body.classList.contains("light")) {
      if (flickerTimer) { clearTimeout(flickerTimer); flickerTimer = null; }
    } else {
      if (!flickerTimer) schedule();
    }
  });
  obs.observe(body, { attributes: true, attributeFilter: ["class"] });
})();

