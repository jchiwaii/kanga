document.addEventListener("DOMContentLoaded", function () {
  const serviceCardsForAnimation = document.querySelectorAll(".service-card"); // Renamed to avoid conflict if scripts were merged

  if (serviceCardsForAnimation.length === 0) return;

  function isInViewportServicesAnim(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  function addAppearClassToServices() {
    serviceCardsForAnimation.forEach((card) => {
      if (isInViewportServicesAnim(card)) {
        card.classList.add("appear");
      }
    });
  }

  setTimeout(() => {
    addAppearClassToServices();
  }, 100);

  window.addEventListener("scroll", addAppearClassToServices);
});
