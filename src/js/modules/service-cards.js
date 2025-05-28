document.addEventListener("DOMContentLoaded", function () {
  const serviceCards = document.querySelectorAll(".service-card");

  if (serviceCards.length > 0) {
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
      card.addEventListener("click", function () {
        const titleElement = this.querySelector("h3");
        if (titleElement) {
          console.log("Service clicked:", titleElement.textContent);
        }
      });
    });
  }
});
