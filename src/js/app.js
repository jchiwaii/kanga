// Header code
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const mobileToggle = document.querySelector(".header__mobile-toggle");
  const navContainer = document.querySelector(".header__nav-container");
  const closeButton = document.querySelector(".header__close");
  const overlay =
    document.querySelector(".header__overlay") || document.createElement("div");

  // If overlay doesn’t exist, create it (remove this if your original code already handles it)
  if (!document.querySelector(".header__overlay")) {
    overlay.className = "header__overlay";
    document.body.appendChild(overlay);
  }

  // Mobile menu toggle (unchanged from your original intent)
  mobileToggle.addEventListener("click", function () {
    navContainer.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("menu-open");
    this.style.display = "none"; // Hide hamburger when menu opens
  });

  // Close menu (unchanged from your original intent)
  closeButton.addEventListener("click", function () {
    closeMenu();
  });

  overlay.addEventListener("click", function () {
    closeMenu();
  });

  function closeMenu() {
    navContainer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
    mobileToggle.style.display = "flex"; // Show hamburger when menu closes
  }

  // Optional: Add scroll styling (remove if not needed)
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 50) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  });

  // Handle responsive display (unchanged from your original intent)
  function handleResponsiveDisplay() {
    if (window.innerWidth > 768) {
      mobileToggle.style.display = "none";
      navContainer.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    } else if (!navContainer.classList.contains("active")) {
      mobileToggle.style.display = "flex";
    }
  }

  handleResponsiveDisplay();
  window.addEventListener("resize", handleResponsiveDisplay);
});

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".hero__slide");
  let currentSlide = 0;
  let slideInterval;
  let isAnimating = false;

  // Set background images
  slides[0].style.backgroundImage = 'url("/src/images/hero/hero.jpg")';
  slides[1].style.backgroundImage = 'url("/src/images/hero/hero-1.jpg")';
  slides[2].style.backgroundImage = 'url("/src/images/hero/hero-2.jpg")';

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

// Animation and interaction for the About section
document.addEventListener("DOMContentLoaded", function () {
  // Elements to animate
  const aboutImages = document.querySelector(".about-images");
  const aboutContent = document.querySelector(".about-content");
  const featureItems = document.querySelectorAll(".feature-list li");

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  // Function to handle animations on scroll
  function handleScrollAnimations() {
    if (aboutImages && isInViewport(aboutImages)) {
      aboutImages.classList.add("appear");
    }

    if (aboutContent && isInViewport(aboutContent)) {
      aboutContent.classList.add("appear");

      // Animate feature list items with delay
      featureItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("appear");
        }, 200 * index);
      });
    }
  }

  // Apply animations on page load
  setTimeout(() => {
    handleScrollAnimations();
  }, 300);

  // Apply animations on scroll
  window.addEventListener("scroll", handleScrollAnimations);

  // Handle image hover effects
  const imageContainers = document.querySelectorAll(".image-container");

  imageContainers.forEach((container) => {
    container.addEventListener("mouseenter", function () {
      this.querySelector("img").style.transform = "scale(1.05)";
    });

    container.addEventListener("mouseleave", function () {
      this.querySelector("img").style.transform = "scale(1)";
    });
  });
});

// Optional JavaScript for enhanced interactions
document.addEventListener("DOMContentLoaded", function () {
  const serviceCards = document.querySelectorAll(".service-card");

  // Add subtle entrance animation when scrolling to the section
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  serviceCards.forEach((card) => {
    observer.observe(card);

    // Optional: Add click handler for mobile devices or further interaction
    card.addEventListener("click", function () {
      // You could expand this to show more details or navigate to a service page
      console.log("Service clicked:", this.querySelector("h3").textContent);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Function to animate counting up to target number
  function animateCounter(element, target) {
    // Get target number from data attribute
    const targetNumber = parseInt(target);
    // Set starting number
    let currentNumber = 0;
    // Set higher speed for larger numbers
    const duration = targetNumber > 1000 ? 2000 : 1500;
    // Calculate increment step based on target size and duration
    const incrementStep = targetNumber / (duration / 16);

    // Start animation
    const counter = setInterval(() => {
      currentNumber += incrementStep;

      // If we reached or exceeded the target, set to final value and clear interval
      if (currentNumber >= targetNumber) {
        element.textContent = targetNumber;
        clearInterval(counter);
      } else {
        // Round to make counting look natural
        element.textContent = Math.floor(currentNumber);
      }
    }, 16); // ~60fps
  }

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Get all counter elements
  const counters = document.querySelectorAll(".stat-number");

  // Start animation when elements come into view
  function startCountersIfVisible() {
    counters.forEach((counter) => {
      // Only start if the counter hasn't been animated yet
      if (!counter.classList.contains("counted") && isInViewport(counter)) {
        counter.classList.add("counted");
        animateCounter(counter, counter.getAttribute("data-target"));
      }
    });
  }

  // Check on load and scroll
  startCountersIfVisible();
  window.addEventListener("scroll", startCountersIfVisible);

  // Force restart counters on page refresh
  window.addEventListener("beforeunload", function () {
    counters.forEach((counter) => {
      counter.textContent = "0";
      counter.classList.remove("counted");
    });
  });
});
