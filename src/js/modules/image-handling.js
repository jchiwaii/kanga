function isInViewportImageHandling(element) {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.bottom >= 0 &&
    rect.right >= 0
  );
}

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

  document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach((img) => {
      if (!isInViewportImageHandling(img)) {
        const src = img.src;
        img.setAttribute("data-src", src);
        // Set a placeholder to avoid broken image icon while loading
        // img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
        // Retaining the original placeholder logic if it was critical for your design, but often it's better to let the browser handle it or use CSS background placeholders.
        // For simplicity and robustness, let's ensure it has a valid, tiny SVG placeholder.
        img.src =
          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1" height="1"%3E%3C/svg%3E';
        imageObserver.observe(img);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const CACHE_KEY = "kanga_image_cache";
  let imageCache = {};

  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      imageCache = JSON.parse(cachedData);
      const smallIcons = document.querySelectorAll(
        ".social-icon, .footer__social-icon"
      );
      smallIcons.forEach((icon) => {
        const src = icon.getAttribute("src");
        if (src && imageCache[src]) {
          icon.src = imageCache[src];
        } else if (src) {
          fetch(src)
            .then((response) => response.blob())
            .then((blob) => {
              const reader = new FileReader();
              reader.onloadend = function () {
                if (reader.result && reader.result.length < 20 * 1024) {
                  // Check reader.result exists
                  imageCache[src] = reader.result;
                  try {
                    localStorage.setItem(CACHE_KEY, JSON.stringify(imageCache));
                  } catch (e) {
                    console.warn(
                      "Local storage full, clearing kanga_image_cache and retrying."
                    );
                    imageCache = {}; // Clear cache for this key only
                    localStorage.setItem(CACHE_KEY, JSON.stringify(imageCache));
                    // Optionally, re-add the current item if space permits after clearing
                    if (reader.result.length < 20 * 1024) {
                      imageCache[src] = reader.result;
                      localStorage.setItem(
                        CACHE_KEY,
                        JSON.stringify(imageCache)
                      );
                    }
                  }
                }
              };
              reader.readAsDataURL(blob);
            })
            .catch((error) =>
              console.error("Error fetching icon for caching:", src, error)
            );
        }
      });
    }
  } catch (e) {
    console.error("Cache storage error:", e);
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js") // Ensure this path is correct
      .then((registration) => {
        console.log("ServiceWorker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.error("ServiceWorker registration failed:", error);
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Preconnect and prefetch logic can be more specific if needed
  // For example, only prefetch if not on a slow connection
  if (navigator.connection && navigator.connection.saveData) {
    return; // Don't prefetch if data saver is on
  }
  const prefetchGalleryImage = new Image();
  prefetchGalleryImage.src = "/src/images/gallery/1.jpg"; // Ensure this path is correct
});

document.addEventListener("DOMContentLoaded", () => {
  if (!("loading" in HTMLImageElement.prototype)) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if (lazyImages.length > 0) {
      const lazyImageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src || lazyImage.src; // Use data-src if available, else current src
              lazyImageObserver.unobserve(lazyImage);
            }
          });
        }
      );

      lazyImages.forEach((lazyImage) => {
        // Ensure data-src is set if it isn't already, for the fallback to work correctly
        if (
          !lazyImage.dataset.src &&
          lazyImage.src &&
          !lazyImage.src.startsWith("data:image")
        ) {
          lazyImage.dataset.src = lazyImage.src;
          // Consider setting a placeholder if not already set by the primary IntersectionObserver logic
        }
        lazyImageObserver.observe(lazyImage);
      });
    }
  }
});
