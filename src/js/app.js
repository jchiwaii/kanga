document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".hero__slide");
  const prevBtn = document.querySelector(".hero__nav--prev");
  const nextBtn = document.querySelector(".hero__nav--next");
  let currentSlide = 0;
  let slideInterval;
  let isAnimating = false;

  // Set background images
  slides[0].style.backgroundImage = 'url("/src/images/hero.jpg")';
  slides[1].style.backgroundImage = 'url("/src/images/hero-1.jpg")';

  slides.forEach((slide) => {
    slide.style.backgroundSize = "cover";
    slide.style.backgroundPosition = "center";
  });

  // Initial slide should be active
  slides[currentSlide].classList.add("hero__slide--active");

  function goToSlide(index, direction) {
    if (isAnimating) return;
    isAnimating = true;

    const current = currentSlide;
    currentSlide = (index + slides.length) % slides.length;

    // Pre-position the next slide before animation
    if (direction === "next") {
      // Prepare the new slide on the right side
      slides[currentSlide].classList.add("hero__slide--prepare-right");

      // Force layout reflow to ensure the position is applied
      void slides[currentSlide].offsetWidth;

      // Start transitions simultaneously - current exits left, new enters from right
      slides[current].classList.add("hero__slide--exit-left");
      slides[currentSlide].classList.remove("hero__slide--prepare-right");
      slides[currentSlide].classList.add(
        "hero__slide--enter-right",
        "hero__slide--active"
      );
    } else {
      // Prepare the new slide on the left side
      slides[currentSlide].classList.add("hero__slide--prepare-left");

      // Force layout reflow to ensure the position is applied
      void slides[currentSlide].offsetWidth;

      // Start transitions simultaneously - current exits right, new enters from left
      slides[current].classList.add("hero__slide--exit-right");
      slides[currentSlide].classList.remove("hero__slide--prepare-left");
      slides[currentSlide].classList.add(
        "hero__slide--enter-left",
        "hero__slide--active"
      );
    }

    // Remove the old active class
    slides[current].classList.remove("hero__slide--active");

    // Clean up animation classes after animation completes
    setTimeout(() => {
      slides[current].classList.remove(
        "hero__slide--exit-left",
        "hero__slide--exit-right"
      );
      slides[currentSlide].classList.remove(
        "hero__slide--enter-right",
        "hero__slide--enter-left"
      );

      // Reset animation state
      isAnimating = false;
    }, 500); // Match the transition duration
  }

  function nextSlide() {
    goToSlide(currentSlide + 1, "next");
  }

  function prevSlide() {
    goToSlide(currentSlide - 1, "prev");
  }

  // Start auto slide with 5 second interval
  function startAutoSlide() {
    clearInterval(slideInterval); // Clear any existing intervals
    slideInterval = setInterval(() => {
      nextSlide();
    }, 7000); // 5 seconds display time
  }

  // Event listeners
  prevBtn.addEventListener("click", () => {
    prevSlide();
    startAutoSlide(); // Reset timer on button click
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    startAutoSlide(); // Reset timer on button click
  });

  // Start the slideshow
  startAutoSlide();
});
