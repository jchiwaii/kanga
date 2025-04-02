// Header scroll behavior and mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const mobileToggle = document.querySelector(".header__mobile-toggle");
  const navContainer = document.querySelector(".header__nav-container");
  const closeButton = document.querySelector(".header__close");
  const overlay = document.createElement("div");

  // Create overlay element
  overlay.className = "header__overlay";
  document.body.appendChild(overlay);

  // Add overlay styles
  const style = document.createElement("style");
  style.textContent = `
    .header__overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    .header__overlay.active {
      opacity: 1;
      visibility: visible;
    }
    body.menu-open {
      overflow: hidden;
    }
    .header__nav-container.active {
      box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
    }
  `;
  document.head.appendChild(style);

  // Toggle mobile menu
  mobileToggle.addEventListener("click", function () {
    this.classList.add("active");
    navContainer.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("menu-open");
    this.style.display = "none"; // Hide the hamburger button when menu is open
  });

  // Close menu on X button click
  closeButton.addEventListener("click", function () {
    mobileToggle.classList.remove("active");
    navContainer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
    mobileToggle.style.display = "flex"; // Show the hamburger button again when menu is closed
  });

  // Close menu on overlay click
  overlay.addEventListener("click", function () {
    mobileToggle.classList.remove("active");
    navContainer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
    mobileToggle.style.display = "flex"; // Show hamburger button when menu is closed by clicking overlay
  });

  // Handle responsive display for hamburger menu
  function handleResponsiveDisplay() {
    if (window.innerWidth > 768) {
      // Reset mobile menu when switching to desktop view
      mobileToggle.style.display = "none";
      navContainer.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    } else {
      // Make sure hamburger is visible in mobile view when menu is closed
      if (!navContainer.classList.contains("active")) {
        mobileToggle.style.display = "flex";
      }
    }
  }

  // Call once on page load to set initial state
  handleResponsiveDisplay();

  // Call on window resize
  window.addEventListener("resize", handleResponsiveDisplay);

  // Handle scroll
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 100) {
      header.classList.add("header--scrolled");
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.classList.remove("header--sticky");
      } else {
        // Scrolling up
        header.classList.add("header--sticky");
      }
    } else {
      header.classList.remove("header--scrolled");
      header.classList.remove("header--sticky");
    }
    lastScrollTop = scrollTop;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".hero__slide");
  let currentSlide = 0;
  let slideInterval;
  let isAnimating = false;

  // Set background images
  slides[0].style.backgroundImage = 'url("/src/images/hero.jpg")';
  slides[1].style.backgroundImage = 'url("/src/images/hero-1.jpg")';
  slides[2].style.backgroundImage = 'url("/src/images/hero-2.jpg")';

  slides.forEach((slide) => {
    slide.style.backgroundSize = "cover";
    slide.style.backgroundPosition = "center";
  });

  // Initial slide should be active
  slides[currentSlide].classList.add("hero__slide--active");

  function goToSlide(index) {
    if (isAnimating) return;
    isAnimating = true;

    const current = currentSlide;
    currentSlide = (index + slides.length) % slides.length;

    // Apply transition classes
    slides[current].classList.add("hero__slide--fade-out");
    slides[currentSlide].classList.add("hero__slide--fade-in");

    // Make new slide active after fade starts
    setTimeout(() => {
      slides[currentSlide].classList.add("hero__slide--active");
      slides[current].classList.remove("hero__slide--active");

      // Remove animation classes after they've completed
      setTimeout(() => {
        slides[current].classList.remove("hero__slide--fade-out");
        slides[currentSlide].classList.remove("hero__slide--fade-in");
        isAnimating = false;
      }, 800); // Match the duration in CSS (0.8s)
    }, 100);

    // Update progress dots
    updateProgressDots();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Create progress dots
  function createProgressDots() {
    const progressContainer = document.createElement("div");
    progressContainer.classList.add("hero__progress");

    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("hero__progress-dot");
      if (index === currentSlide) {
        dot.classList.add("hero__progress-dot--active");
      }

      dot.addEventListener("click", () => {
        if (isAnimating || index === currentSlide) return;
        goToSlide(index);
        resetAutoSlide();
      });

      progressContainer.appendChild(dot);
    });

    document.querySelector(".hero").appendChild(progressContainer);
  }

  // Update progress dots
  function updateProgressDots() {
    const dots = document.querySelectorAll(".hero__progress-dot");
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add("hero__progress-dot--active");
      } else {
        dot.classList.remove("hero__progress-dot--active");
      }
    });
  }

  // Create progress dots on page load
  createProgressDots();

  // Add pause on hover functionality
  const heroSection = document.querySelector(".hero");
  heroSection.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  heroSection.addEventListener("mouseleave", () => {
    resetAutoSlide();
  });

  // Reset auto slide timer
  function resetAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      nextSlide();
    }, 7000);
  }

  // Add touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  heroSection.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  heroSection.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
      resetAutoSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
      resetAutoSlide();
    }
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
      resetAutoSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
      resetAutoSlide();
    }
  });

  // Start the slideshow
  resetAutoSlide();
});
