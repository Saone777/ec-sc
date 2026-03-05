// ============ PROMOTIONAL BANNER ============
function initPromoBanner() {
  const promoContainer = document.getElementById("promo-banner");
  if (!promoContainer) return;

  const activePromo = promotions.find((p) => p.active);
  if (activePromo) {
    promoContainer.innerHTML = `
      <div class="promo-banner" style="background-color: ${activePromo.bgColor}">
        <i class="fas ${activePromo.icon}"></i>
        <span>${activePromo.text}</span>
        <button class="promo-close" onclick="closePromoBanner()">×</button>
      </div>
    `;
  }
}

function closePromoBanner() {
  const banner = document.getElementById("promo-banner");
  if (banner) {
    banner.style.display = "none";
  }
}

// ============ NEWSLETTER SIGNUP ============
function handleNewsletterSignup(email) {
  if (!email || !email.includes("@")) {
    alert("Please enter a valid email address");
    return;
  }

  let subscribers = JSON.parse(localStorage.getItem("newsletter")) || [];

  if (subscribers.includes(email)) {
    alert("Already subscribed with this email!");
    return;
  }

  subscribers.push(email);
  localStorage.setItem("newsletter", JSON.stringify(subscribers));

  alert("✅ Successfully subscribed to our newsletter!");
  document.getElementById("newsletter-email").value = "";
}

// ============ FLASH SALE COUNTDOWN TIMER ============
function initFlashSaleTimer() {
  const timerElement = document.getElementById("flash-sale-timer");
  if (!timerElement || !flashSale.active) return;

  function updateTimer() {
    const endTime = new Date(flashSale.endTime).getTime();
    const now = new Date().getTime();
    const remaining = endTime - now;

    if (remaining <= 0) {
      timerElement.innerHTML = "SALE ENDED";
      return;
    }

    const hours = Math.floor(
      (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    timerElement.innerHTML = `
      <div class="timer-display">
        <span class="timer-value">${hours.toString().padStart(2, "0")}</span>:
        <span class="timer-value">${minutes.toString().padStart(2, "0")}</span>:
        <span class="timer-value">${seconds.toString().padStart(2, "0")}</span>
      </div>
      <div class="timer-label">HOURS : MINUTES : SECONDS</div>
    `;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// ============ PRODUCT IMAGE GALLERY & ZOOM ============
function initImageGallery() {
  const mainImage = document.getElementById("main-image");
  const thumbnails = document.querySelectorAll(".image-thumbnail");
  const zoomBtn = document.getElementById("zoom-btn");
  const modal = document.getElementById("zoom-modal");
  const zoomedImage = document.getElementById("zoomed-image");
  const closeZoom = document.getElementById("close-zoom");

  if (!mainImage) return;

  // Thumbnail click handler
  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      mainImage.src = thumb.src;
      thumbnails.forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });

  // Zoom functionality
  if (zoomBtn && modal) {
    zoomBtn.addEventListener("click", () => {
      modal.style.display = "flex";
      zoomedImage.src = mainImage.src;

      // Add zoom on mouse move
      zoomedImage.addEventListener("mousemove", (e) => {
        const rect = zoomedImage.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        zoomedImage.style.transformOrigin = `${x}% ${y}%`;
        zoomedImage.style.transform = "scale(2.5)";
      });

      zoomedImage.addEventListener("mouseleave", () => {
        zoomedImage.style.transform = "scale(1)";
      });
    });

    closeZoom.addEventListener("click", () => {
      modal.style.display = "none";
      zoomedImage.style.transform = "scale(1)";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        zoomedImage.style.transform = "scale(1)";
      }
    });
  }
}

// ============ TESTIMONIALS CAROUSEL ============
function initTestimonialsCarousel() {
  const container = document.getElementById("testimonials-container");
  if (!container) return;

  let currentIndex = 0;

  function renderTestimonials() {
    container.innerHTML = testimonials
      .map(
        (test, idx) => `
      <div class="testimonial-card ${idx === currentIndex ? "active" : ""}">
        <div class="stars">
          ${"⭐".repeat(test.rating)}
        </div>
        <p class="testimonial-text">"${test.text}"</p>
        <div class="testimonial-author">
          <img src="${test.image}" alt="${test.name}" class="author-avatar">
          <div>
            <h4>${test.name}</h4>
            <p class="author-product">${test.product}</p>
          </div>
        </div>
      </div>
    `,
      )
      .join("");
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    renderTestimonials();
  }

  function showPrev() {
    currentIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonials();
  }

  renderTestimonials();

  const nextBtn = document.getElementById("testimonial-next");
  const prevBtn = document.getElementById("testimonial-prev");

  if (nextBtn) nextBtn.addEventListener("click", showNext);
  if (prevBtn) prevBtn.addEventListener("click", showPrev);

  // Auto scroll every 5 seconds
  setInterval(showNext, 5000);
}

// ============ INITIALIZE ALL FEATURES ============
window.addEventListener("DOMContentLoaded", () => {
  initPromoBanner();
  initFlashSaleTimer();
  initImageGallery();
  initTestimonialsCarousel();
});
