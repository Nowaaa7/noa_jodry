document.addEventListener("DOMContentLoaded", () => {
  // 1. Année automatique dans le footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Effet de scroll sur la Navbar et bouton BackToTop
  const navbar = document.getElementById("mainNavbar");
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }

    if (backToTop) {
      backToTop.style.display = window.scrollY > 300 ? "inline-flex" : "none";
    }
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 3. Animations d'apparition (.reveal)
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.08 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // 4. Switcher BUT1 (Niveau 1) / BUT2 (Niveau 2) sur competences.html
  const btnBut1 = document.getElementById("btnLevelBut1");
  const btnBut2 = document.getElementById("btnLevelBut2");
  const sectionBut1 = document.getElementById("sectionLevelBut1");
  const sectionBut2 = document.getElementById("sectionLevelBut2");

  if (btnBut1 && btnBut2 && sectionBut1 && sectionBut2) {
    btnBut1.addEventListener("click", () => {
      btnBut1.classList.add("active-but1");
      btnBut2.classList.remove("active-but2");
      sectionBut1.classList.remove("d-none");
      sectionBut2.classList.add("d-none");
    });

    btnBut2.addEventListener("click", () => {
      btnBut2.classList.add("active-but2");
      btnBut1.classList.remove("active-but1");
      sectionBut2.classList.remove("d-none");
      sectionBut1.classList.add("d-none");
    });
  }

  // 5. Recherche instantanée dans les AC (competences.html)
  const searchInput = document.getElementById("acSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      const allAccordions = document.querySelectorAll(".accordion-item");

      allAccordions.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  }

  // 6. Filtre par catégorie sur projets.html
  const filterBtns = document.querySelectorAll(".project-filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("btn-primary"));
        filterBtns.forEach((b) => b.classList.add("btn-outline-light"));
        btn.classList.remove("btn-outline-light");
        btn.classList.add("btn-primary");

        const filterValue = btn.getAttribute("data-filter");
        projectItems.forEach((item) => {
          const category = item.getAttribute("data-category");
          if (filterValue === "all" || category.includes(filterValue)) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // 7. Lightbox pour agrandir les traces (images)
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  const zoomableImages = document.querySelectorAll(".zoomable-image");

  if (lightbox && lightboxImg) {
    zoomableImages.forEach((img) => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("active");
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove("active");
      lightboxImg.src = "";
    };

    lightboxClose?.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
      }
    });
  }
});
