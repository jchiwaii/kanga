document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const mobileToggle = document.querySelector(".header__mobile-toggle");
  const navContainer = document.querySelector(".header__nav-container");
  const closeButton = document.querySelector(".header__close");
  const overlay =
    document.querySelector(".header__overlay") || document.createElement("div");

  if (!document.querySelector(".header__overlay")) {
    overlay.className = "header__overlay";
    document.body.appendChild(overlay);
  }

  if (mobileToggle && navContainer && closeButton && overlay) {
    mobileToggle.addEventListener("click", function () {
      navContainer.classList.add("active");
      overlay.classList.add("active");
      document.body.classList.add("menu-open");
      this.style.display = "none";
    });

    closeButton.addEventListener("click", function () {
      closeMenu();
    });

    overlay.addEventListener("click", function () {
      closeMenu();
    });
  }

  function closeMenu() {
    if (navContainer && overlay && mobileToggle) {
      navContainer.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("menu-open");
      mobileToggle.style.display = "flex";
    }
  }

  if (header) {
    window.addEventListener("scroll", function () {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 50) {
        header.classList.add("header--scrolled");
      } else {
        header.classList.remove("header--scrolled");
      }
    });
  }

  function handleResponsiveDisplay() {
    if (mobileToggle && navContainer && overlay) {
      if (window.innerWidth > 768) {
        mobileToggle.style.display = "none";
        navContainer.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("menu-open");
      } else if (!navContainer.classList.contains("active")) {
        mobileToggle.style.display = "flex";
      }
    }
  }

  handleResponsiveDisplay();
  window.addEventListener("resize", handleResponsiveDisplay);
});
