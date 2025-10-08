document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById("site-nav");
  if (!navContainer) {
    console.warn("Navigation container with id 'site-nav' not found.");
    return;
  }

  const highlightActiveLink = () => {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    navContainer.querySelectorAll("a[href]").forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      }
    });
  };

  fetch("nav.html", { cache: "no-cache" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Navigation fetch failed: ${response.status}`);
      }
      return response.text();
    })
    .then((markup) => {
      navContainer.innerHTML = markup;
      highlightActiveLink();
    })
    .catch((error) => {
      console.error("Unable to load navigation:", error);
      navContainer.innerHTML = `
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="troubleshooting.html">Troubleshooting</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      `;
      highlightActiveLink();
    });
});
