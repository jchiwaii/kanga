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
