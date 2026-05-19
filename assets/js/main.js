document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Gestion de l'animation au scroll (Reveal)
    const reveals = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // 2. Année dynamique dans le footer
    const yearSpan = document.getElementById("year");
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. Bouton Retour en haut
    const backToTopBtn = document.getElementById("backToTop");
    if(backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        });
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 5. GESTION DU LIGHTBOX (Zoom sur image)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const zoomableImages = document.querySelectorAll('.zoomable-image');

    if (lightbox && lightboxImg && lightboxClose) {
        // Quand on clique sur une petite image
        zoomableImages.forEach(img => {
            img.addEventListener('click', function() {
                lightbox.style.display = 'flex'; // Affiche la grande boîte noire
                lightboxImg.src = this.src;      // Copie la source de l'image cliquée
                lightboxImg.alt = this.alt;
            });
        });

        // Quand on clique sur la croix pour fermer
        lightboxClose.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });

        // Quand on clique n'importe où sur le fond noir pour fermer
        lightbox.addEventListener('click', function(e) {
            // On ferme seulement si on clique sur le fond noir, pas sur l'image elle-même
            if (e.target !== lightboxImg) {
                lightbox.style.display = 'none';
            }
        });
        
        // Fermer avec la touche Echap
        document.addEventListener('keydown', function(e) {
            if (e.key === "Escape" && lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
            }
        });
    }
});
