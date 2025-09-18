// === Counter Animation ===
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  counters.forEach(counter => {
    counter.innerText = "0";
    const updateCounter = () => {
      const target = +counter.getAttribute("data-target");
      const current = +counter.innerText;
      const increment = Math.ceil(target / 200);

      if (current < target) {
        counter.innerText = current + increment;
        setTimeout(updateCounter, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });
});

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

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});
window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

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
