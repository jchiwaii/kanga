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
// Add 'loading' class to html tag immediately
document.documentElement.classList.add("loading");

document.addEventListener("DOMContentLoaded", function () {
  // Get loader elements
  const loader = document.getElementById("pageLoader");
  const progressBar = document.querySelector(".loader__progress-bar");

  // Set up loading variables
  let progress = 0;
  let loadingInterval;
  let maxWaitTime = 8000; // Maximum wait time: 8 seconds

  // Start progress animation immediately
  startProgressAnimation();

  // Function to animate the progress bar
  function startProgressAnimation() {
    // Start with faster progress up to 75%
    loadingInterval = setInterval(function () {
      if (progress < 75) {
        progress += Math.floor(Math.random() * 8) + 3; // 3-10% increments
      } else if (progress < 85) {
        progress += Math.floor(Math.random() * 3) + 1; // 1-3% increments (slower near the end)
      }

      if (progress > 85) {
        progress = 85; // Cap at 85% until fully loaded
        clearInterval(loadingInterval);
      }

      updateProgressBar();
    }, 200);

    // Set a timeout to ensure the page loads eventually
    setTimeout(completeLoading, maxWaitTime);
  }

  // Update the progress bar width
  function updateProgressBar() {
    progressBar.style.width = progress + "%";
  }

  // Finish loading animation and show page
  function completeLoading() {
    // Clear any existing interval
    if (loadingInterval) clearInterval(loadingInterval);

    // Animate to 100%
    progress = 100;
    updateProgressBar();

    // Wait for progress bar animation to finish
    setTimeout(function () {
      // Add loaded class to body
      document.body.classList.add("loaded");

      // Hide the loader
      loader.classList.add("hidden");

      // Enable scrolling
      document.documentElement.classList.remove("loading");

      // Remove the loader element after transition
      setTimeout(function () {
        if (loader && loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 500);
    }, 500);
  }

  // When window is fully loaded, complete the loading progress
  window.addEventListener("load", function () {
    // Wait a little bit after load for a smoother experience
    setTimeout(completeLoading, 500);
  });
});

// Images

if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");
          if (src) {
            img.src = src;
            img.removeAttribute("data-src");
          }
          imageObserver.unobserve(img);
        }
      });
    },
    {
      rootMargin: "50px 0px",
      threshold: 0.01,
    }
  );

  // Convert lazy-loaded images to use data-src instead
  document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach((img) => {
      // Set up image observation only if not in viewport initially
      if (!isInViewport(img)) {
        const src = img.src;
        img.setAttribute("data-src", src);
        img.src =
          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
        imageObserver.observe(img);
      }
    });
  });
}

// Helper function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.bottom >= 0 &&
    rect.right >= 0
  );
}

// Cache images in local storage where appropriate
document.addEventListener("DOMContentLoaded", () => {
  // Small icons can be cached in localStorage for repeat visits
  const CACHE_KEY = "kanga_image_cache";
  let imageCache = {};

  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      imageCache = JSON.parse(cachedData);

      // Apply cached icons
      const smallIcons = document.querySelectorAll(
        ".social-icon, .footer__social-icon"
      );
      smallIcons.forEach((icon) => {
        const src = icon.getAttribute("src");
        if (imageCache[src]) {
          icon.src = imageCache[src];
        } else {
          // Cache the icon for future visits
          fetch(src)
            .then((response) => response.blob())
            .then((blob) => {
              const reader = new FileReader();
              reader.onloadend = function () {
                // Only cache small images (under 20KB)
                if (reader.result.length < 20 * 1024) {
                  imageCache[src] = reader.result;
                  try {
                    localStorage.setItem(CACHE_KEY, JSON.stringify(imageCache));
                  } catch (e) {
                    // Storage might be full, clear and try again
                    imageCache = {};
                    localStorage.setItem(CACHE_KEY, JSON.stringify(imageCache));
                  }
                }
              };
              reader.readAsDataURL(blob);
            });
        }
      });
    }
  } catch (e) {
    console.log("Cache storage error:", e);
  }
});

// Add service worker for caching larger images
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("ServiceWorker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.log("ServiceWorker registration failed:", error);
      });
  });
}

// Image preconnect and prefetch for next pages
document.addEventListener("DOMContentLoaded", () => {
  // Once main content is loaded, prefetch next likely images
  const prefetchGalleryImage = new Image();
  prefetchGalleryImage.src = "/src/images/gallery/1.jpg";
});

// Add support for native lazy loading fallback
document.addEventListener("DOMContentLoaded", () => {
  if (!("loading" in HTMLImageElement.prototype)) {
    // Fallback for browsers that don't support native lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src || lazyImage.src;
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach((lazyImage) => {
      lazyImageObserver.observe(lazyImage);
    });
  }
});
