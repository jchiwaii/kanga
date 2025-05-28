// Add 'loading' class to html tag immediately
if (document.documentElement) {
  document.documentElement.classList.add("loading");
}

document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("pageLoader");
  const progressBar = document.querySelector(".loader__progress-bar");

  if (!loader || !progressBar) {
    // If loader elements are not present, remove loading class and exit
    if (document.documentElement) {
      document.documentElement.classList.remove("loading");
    }
    if (loader && loader.parentNode) {
      // Attempt to remove loader if it exists but progress bar doesn't
      loader.parentNode.removeChild(loader);
    }
    return;
  }

  let progress = 0;
  let loadingInterval;
  let maxWaitTime = 8000;

  function startProgressAnimation() {
    loadingInterval = setInterval(function () {
      if (progress < 75) {
        progress += Math.floor(Math.random() * 8) + 3;
      } else if (progress < 85) {
        progress += Math.floor(Math.random() * 3) + 1;
      }

      if (progress > 85) {
        progress = 85;
        clearInterval(loadingInterval);
      }
      updateProgressBar();
    }, 200);
    setTimeout(completeLoading, maxWaitTime);
  }

  function updateProgressBar() {
    progressBar.style.width = progress + "%";
  }

  function completeLoading() {
    if (loadingInterval) clearInterval(loadingInterval);
    progress = 100;
    updateProgressBar();

    setTimeout(function () {
      if (document.body) document.body.classList.add("loaded");
      if (loader) loader.classList.add("hidden");
      if (document.documentElement)
        document.documentElement.classList.remove("loading");

      setTimeout(function () {
        if (loader && loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 500);
    }, 500);
  }

  startProgressAnimation();

  window.addEventListener("load", function () {
    setTimeout(completeLoading, 500);
  });
});
