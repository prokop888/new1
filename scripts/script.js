(() => {
  const header = document.querySelector("[data-header]");
  const burger = document.querySelector("[data-burger]");
  const nav = document.querySelector("[data-nav]");

  if (burger && nav) {
    const setMenuState = (isOpen) => {
      nav.classList.toggle("is-open", isOpen);
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      if (header) {
        header.classList.toggle("is-menu-open", isOpen);
      }
    };

    burger.addEventListener("click", () => {
      setMenuState(!nav.classList.contains("is-open"));
    });

    nav.addEventListener("click", (event) => {
      const target = event.target;
      if (target && target.classList.contains("nav__link")) {
        setMenuState(false);
      }
    });
  }

  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  if (revealItems.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const banner = document.getElementById("cookie-banner");
  if (banner) {
    const accept = document.getElementById("cookie-accept");
    const decline = document.getElementById("cookie-decline");
    const storageKey = "pw_cookie_consent";
    const stored = window.localStorage.getItem(storageKey);

    if (!stored) {
      banner.classList.add("is-visible");
    }

    const setConsent = (value) => {
      window.localStorage.setItem(storageKey, value);
      banner.classList.remove("is-visible");
    };

    if (accept) {
      accept.addEventListener("click", () => setConsent("accepted"));
    }

    if (decline) {
      decline.addEventListener("click", () => setConsent("declined"));
    }
  }
})();
