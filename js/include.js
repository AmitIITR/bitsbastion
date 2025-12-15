document.addEventListener("DOMContentLoaded", async () => {
  const includes = document.querySelectorAll("[data-include]");

  for (const el of includes) {
    const file = el.getAttribute("data-include");
    const response = await fetch(file);
    el.innerHTML = await response.text();
  }

  /* ===== SERVICES DROPDOWN CLICK HANDLER ===== */
  const servicesLink = document.querySelector(".services-link");
  const servicesWrapper = document.querySelector(".services-wrapper");

  if (servicesLink && servicesWrapper) {
    servicesLink.addEventListener("click", (e) => {
      e.preventDefault(); // prevent navigation
      servicesWrapper.classList.toggle("open");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!servicesWrapper.contains(e.target)) {
        servicesWrapper.classList.remove("open");
      }
    });
  }
});
