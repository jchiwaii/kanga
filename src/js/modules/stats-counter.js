document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".stat-number");
  const statItems = document.querySelectorAll(".stat-item");

  if (counters.length === 0 || statItems.length === 0) {
    return;
  }

  function animateCounter(element, target) {
    const targetNumber = parseInt(target);
    if (isNaN(targetNumber)) return;

    let currentNumber = 0;
    const duration = targetNumber > 1000 ? 2500 : 2000;
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
        const lastStatNumber = document.querySelector(
          ".stat-item:last-child .stat-number"
        );
        if (element.closest(".stat-item") && element === lastStatNumber) {
          element.textContent += "+";
        }
      }
    }
    requestAnimationFrame(updateCounter);
  }

  function handleIntersectStats(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector(".stat-number");
        if (counter && !counter.classList.contains("counted")) {
          counter.classList.add("counted");
          setTimeout(() => {
            animateCounter(counter, counter.getAttribute("data-target"));
          }, 300);
        }
        observer.unobserve(entry.target);
      }
    });
  }

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };

  const observer = new IntersectionObserver(handleIntersectStats, options);
  statItems.forEach((item) => {
    observer.observe(item);
  });

  window.addEventListener("beforeunload", function () {
    counters.forEach((counter) => {
      counter.textContent = "0";
      counter.classList.remove("counted");
    });
  });
});
