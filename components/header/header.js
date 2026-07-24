<script>
    // ===============================
// HEADER: SEARCH + MOBILE MENU + SUBMENUS
// ===============================

const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const searchToggle = document.getElementById("searchToggle");
const searchInput = document.getElementById("searchInput");
const searchWrapper = document.querySelector(".header-search");
const dropdownTriggers = document.querySelectorAll(".header-nav-trigger");

// ================= SEARCH =================
if (searchToggle && searchInput && searchWrapper) {
  searchToggle.addEventListener("click", () => {
    const isOpen = searchWrapper.classList.toggle("header-active");
    searchToggle.setAttribute("aria-expanded", isOpen);
    if (isOpen) setTimeout(() => searchInput.focus(), 120);
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchWrapper.classList.remove("header-active");
      searchToggle.setAttribute("aria-expanded", "false");
      searchToggle.focus();
    }
  });

  searchInput.addEventListener("blur", () => {
    setTimeout(() => {
      searchWrapper.classList.remove("header-active");
      searchToggle.setAttribute("aria-expanded", "false");
    }, 120);
  });
}

// ================= MOBILE MENU =================
if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("header-active");
    mobileMenu.classList.toggle("header-show");
  });
}

// ================= SUBMENUS (MOBILE + TABLET) =================
dropdownTriggers.forEach(trigger => {
  trigger.addEventListener("click", (e) => {
    // Only intercept click on mobile/tablet
    if (window.innerWidth > 900) return;

    e.preventDefault(); // STOP navigation

    const parentDropdown = trigger.closest(".header-nav-dropdown");

    // Close other open dropdowns
    document.querySelectorAll(".header-nav-dropdown").forEach(drop => {
      if (drop !== parentDropdown) {
        drop.classList.remove("header-open");
      }
    });

    // Toggle current dropdown
    parentDropdown.classList.toggle("header-open");
  });
});

// ================= CLOSE MENU ON LINK CLICK =================
mobileMenu.querySelectorAll(".header-dropdown-menu a, .header-nav-links > a:not(.header-nav-trigger)").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("header-show");
    hamburgerBtn.classList.remove("header-active");

    // Close all dropdowns
    document.querySelectorAll(".header-nav-dropdown").forEach(drop => {
      drop.classList.remove("header-open");
    });
  });
});

// ================= CLOSE MENU ON RESIZE =================
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    mobileMenu.classList.remove("header-show");
    hamburgerBtn.classList.remove("header-active");
    document.querySelectorAll(".header-nav-dropdown").forEach(drop => {
      drop.classList.remove("header-open");
    });
  }
});

// ===============================
// SLIDER (HOME PAGE ONLY)
// ===============================

window.initSlider = function () {
  const sliderItems = document.getElementById("sliderItems");
  const prevBtn = document.getElementById("sliderPrev");
  const nextBtn = document.getElementById("sliderNext");
  const dots = document.querySelectorAll(".dot");

  // Exit if slider not on page
  if (!sliderItems || !prevBtn || !nextBtn || !dots.length) return;

  const cards = Array.from(sliderItems.children);
  let currentSlide = 0;
  const totalSlides = dots.length;

  function showSlide(index) {
    currentSlide = index;

    cards.forEach(card => {
      const slideIndex = Number(card.dataset.slideIndex);
      card.style.display = slideIndex === index ? "block" : "none";
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("header-active", i === index);
    });
  }

  prevBtn.onclick = () => {
    showSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  nextBtn.onclick = () => {
    showSlide((currentSlide + 1) % totalSlides);
  };

  dots.forEach((dot, index) => {
    dot.onclick = () => showSlide(index);
  });

  // Init
  showSlide(0);
};

// ===============================
// CLIENT LOGO SLIDER (RESPONSIVE)
// ===============================
function initClientsSlider() {
  const track = document.getElementById("clientsTrack");
  const prev = document.getElementById("clientsPrev");
  const next = document.getElementById("clientsNext");

  if (!track || !prev || !next) return;

  const cards = Array.from(track.children);
  let index = 0;

  // How many logos visible
  function visibleCount() {
    if (window.innerWidth <= 520) return 1;
    if (window.innerWidth <= 900) return 2;
    return 4; // desktop
  }

function updateSlider() {
  if (!cards.length) return;

  const gap = 24;
  const cardWidth = cards[0].offsetWidth + gap;

  const visible = visibleCount();
  const maxIndex = Math.max(0, cards.length - visible);

  // Clamp index so it NEVER exceeds the last valid position
  index = Math.min(Math.max(index, 0), maxIndex);

  track.style.transform = `translateX(-${index * cardWidth}px)`;

  // Disable buttons correctly
  prev.disabled = index === 0;
  next.disabled = index === maxIndex;
}


  next.onclick = () => {
    index++;
    updateSlider();
  };

  prev.onclick = () => {
    index--;
    updateSlider();
  };

  window.addEventListener("resize", updateSlider);

  updateSlider();
}

// SPA-safe reinit
window.addEventListener("load", initClientsSlider);
window.addEventListener("hashchange", () => {
  setTimeout(initClientsSlider, 80);
});

// Re-init after SPA page load
window.addEventListener("load", initClientsSlider);
window.addEventListener("hashchange", () => {
  setTimeout(initClientsSlider, 50);
});
window.addEventListener("scroll", () => {
    document.querySelector("header")
        .classList.toggle("scrolled", window.scrollY > 50);
});


// ===============================
// FOOTER YEAR
// ===============================

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
</script>