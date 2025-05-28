document.addEventListener("DOMContentLoaded", function () {
  const aboutImages = document.querySelector(".about-images");
  const aboutContent = document.querySelector(".about-content");
  const featureItems = document.querySelectorAll(".feature-list li");
  const imageContainers = document.querySelectorAll(".image-container");

  function isInViewportAbout(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  function handleScrollAnimationsAbout() {
    if (aboutImages && isInViewportAbout(aboutImages)) {
      aboutImages.classList.add("appear");
    }

    if (aboutContent && isInViewportAbout(aboutContent)) {
      aboutContent.classList.add("appear");
      if (featureItems.length > 0) {
        featureItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("appear");
          }, 200 * index);
        });
      }
    }
  }

  if (aboutImages || aboutContent) {
    setTimeout(() => {
      handleScrollAnimationsAbout();
    }, 300);
    window.addEventListener("scroll", handleScrollAnimationsAbout);
  }

  if (imageContainers.length > 0) {
    imageContainers.forEach((container) => {
      container.addEventListener("mouseenter", function () {
        const img = this.querySelector("img");
        if (img) img.style.transform = "scale(1.05)";
      });

      container.addEventListener("mouseleave", function () {
        const img = this.querySelector("img");
        if (img) img.style.transform = "scale(1)";
      });
    });
  }
});
