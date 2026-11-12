(() => {
  const body = document.body;
  const root = body.dataset.root || "./";
  const page = body.dataset.page || "home";
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });
  }

  const socialLinksTarget = document.querySelector("[data-social-links]");
  fetch(root + "assets/data/site-content.json")
    .then((response) => {
      if (!response.ok) throw new Error("Content could not be loaded.");
      return response.json();
    })
    .then((content) => {
      if (socialLinksTarget && Array.isArray(content.socialLinks)) {
        socialLinksTarget.replaceChildren();
        for (const social of content.socialLinks) {
          const link = document.createElement("a");
          link.href = social.url;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.setAttribute("aria-label", social.name);

          if (social.icon === "github") {
            const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            icon.setAttribute("viewBox", "0 0 24 24");
            icon.setAttribute("aria-hidden", "true");
            icon.setAttribute("focusable", "false");
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.467-1.333-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.98-.4 3-.405 1.02.005 2.043.14 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.823 1.102.823 2.222 0 1.606-.015 2.9-.015 3.293 0 .32.216.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.373-12-12-12z");
            icon.append(path);
            link.append(icon);
          }

          const label = document.createElement("span");
          label.textContent = social.name;
          link.append(label);
          socialLinksTarget.append(link);
        }
      }

      if (page === "home") return;
      if (page === "about") {
        const target = document.querySelector("#page-content");
        target.replaceChildren();
        for (const paragraph of content.about.paragraphs) {
          const p = document.createElement("p");
          p.textContent = paragraph;
          target.append(p);
        }
        return;
      }

      const target = document.querySelector("#content-list");
      target.replaceChildren();
      const entries = content[page] || [];
      if (!entries.length) {
        const empty = document.createElement("p");
        empty.className = "loading";
        empty.textContent = "New work will appear here soon.";
        target.append(empty);
        return;
      }
      for (const entry of entries) {
        const card = document.createElement("article");
        card.className = "content-card";
        const type = document.createElement("p");
        type.className = "eyebrow";
        type.textContent = entry.type || "FEATURED";
        const title = document.createElement("h2");
        title.textContent = entry.title;
        const description = document.createElement("p");
        description.textContent = entry.description;
        card.append(type, title, description);
        target.append(card);
      }
    })
    .catch(() => {
      const target = document.querySelector("#page-content, #content-list");
      if (target) target.textContent = "Content is temporarily unavailable.";
    });
})();