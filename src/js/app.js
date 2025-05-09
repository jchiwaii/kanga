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
// This code adds subtle animations and interactions to the service cards
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

// Counter animation for stats section
// This code animates the numbers in the stats section when they come into view

document.addEventListener("DOMContentLoaded", function () {
  // Function to animate counting up to target number with easing
  function animateCounter(element, target) {
    // Get target number from data attribute
    const targetNumber = parseInt(target);
    // Set starting number
    let currentNumber = 0;
    // Set duration based on number size for smoother animation
    const duration = targetNumber > 1000 ? 2500 : 2000;
    // Use easeOutQuad for more elegant counting
    const startTime = performance.now();

    function easeOutQuad(t) {
      return t * (2 - t);
    }

    function updateCounter(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);

      currentNumber = Math.floor(easedProgress * targetNumber);
      element.textContent = currentNumber;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = targetNumber;
        // Add plus sign to the last stat if needed
        if (
          element.closest(".stat-item") ===
          document.querySelector(".stat-item:last-child .stat-number")
        ) {
          element.textContent += "+";
        }
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // Enhanced viewport detection with margin
  function isInViewport(element, margin = 100) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight + margin &&
      rect.bottom >= -margin &&
      rect.left <= window.innerWidth + margin &&
      rect.right >= -margin
    );
  }

  // Get all counter elements
  const counters = document.querySelectorAll(".stat-number");
  const statItems = document.querySelectorAll(".stat-item");

  // Function to handle intersection observations
  function handleIntersect(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector(".stat-number");
        if (!counter.classList.contains("counted")) {
          counter.classList.add("counted");
          // Small delay for better visual effect when multiple counters appear
          setTimeout(() => {
            animateCounter(counter, counter.getAttribute("data-target"));
          }, 300);
        }
        observer.unobserve(entry.target);
      }
    });
  }

  // Set up intersection observer for better performance
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };

  const observer = new IntersectionObserver(handleIntersect, options);

  // Observe all stat items
  statItems.forEach((item) => {
    observer.observe(item);
  });

  // Force restart counters on page refresh
  window.addEventListener("beforeunload", function () {
    counters.forEach((counter) => {
      counter.textContent = "0";
      counter.classList.remove("counted");
    });
  });
});

// Services

document.addEventListener("DOMContentLoaded", function () {
  // Animate services on load
  const serviceCards = document.querySelectorAll(".service-card");

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Function to add appear class when element is in viewport
  function addAppearClass() {
    serviceCards.forEach((card) => {
      if (isInViewport(card)) {
        card.classList.add("appear");
      }
    });
  }

  // Add appear class on page load
  setTimeout(() => {
    addAppearClass();
  }, 100);

  // Add appear class on scroll
  window.addEventListener("scroll", addAppearClass);
});

// Form

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    // Reset error messages
    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    subjectError.textContent = "";
    messageError.textContent = "";

    // Validate name
    if (nameInput.value.trim() === "") {
      nameError.textContent = "Please enter your name";
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "") {
      emailError.textContent = "Please enter your email";
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address";
      isValid = false;
    }

    // Validate phone
    const phoneRegex = /^[0-9\-\+\s\(\)]{7,20}$/;
    if (phoneInput.value.trim() === "") {
      phoneError.textContent = "Please enter your phone number";
      isValid = false;
    } else if (!phoneRegex.test(phoneInput.value.trim())) {
      phoneError.textContent = "Please enter a valid phone number";
      isValid = false;
    }

    // Validate subject
    if (subjectInput.value.trim() === "") {
      subjectError.textContent = "Please enter a subject";
      isValid = false;
    }

    // Validate message
    if (messageInput.value.trim() === "") {
      messageError.textContent = "Please enter your message";
      isValid = false;
    }

    if (isValid) {
      // Form is valid, you can submit it here
      alert("Form submitted successfully!");
      contactForm.reset();
    }
  });
});

// Button to scroll to top

document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  // Show button when user scrolls down 300px from the top
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  });

  // Smooth scroll to top when button is clicked
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// Loader
// This code creates a loader that shows progress as the page loads
// and hides it once the page is fully loaded. It also includes a fallback
// to hide the loader after a set time if the page takes too long to load.
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("pageLoader");
  const progressBar = document.querySelector(".loader__progress-bar");
  let loadProgress = 0;

  // Function to update progress bar
  function updateProgress() {
    if (loadProgress < 100) {
      loadProgress += Math.floor(Math.random() * 15) + 5; // Random progress between 5-20%
      if (loadProgress > 100) loadProgress = 100;

      progressBar.style.width = loadProgress + "%";

      if (loadProgress < 100) {
        setTimeout(updateProgress, 200);
      } else {
        // When progress reaches 100%, wait a bit then hide the loader
        setTimeout(hideLoader, 500);
      }
    }
  }

  // Function to hide loader
  function hideLoader() {
    loader.classList.add("hidden");
    // Remove loader from DOM after animation completes
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }

  // Start progress animation
  setTimeout(updateProgress, 500);

  // Alternative: Wait for all content to load
  window.addEventListener("load", function () {
    loadProgress = 100;
    progressBar.style.width = "100%";
    setTimeout(hideLoader, 500);
  });
});
