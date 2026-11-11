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

  if (page === "home") return;
  fetch(root + "assets/data/site-content.json")
    .then((response) => {
      if (!response.ok) throw new Error("Content could not be loaded.");
      return response.json();
    })
    .then((content) => {
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