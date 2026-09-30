/* Adapted from Korbinian Moller personal_website_template (MIT).
   See LICENSE-korbinian-moller.txt. Footer selector and reduced-motion handling adapted. */
    // Scroll-to-top button
    const pageUpButton = document.getElementById("page-up-btn");
    const footerEl = document.querySelector(".site-footer");

    if (pageUpButton) {
        const togglePageUpButton = () => {
            pageUpButton.classList.toggle("show", window.scrollY > 300);
            if (footerEl) {
                const buttonRect = pageUpButton.getBoundingClientRect();
                const footerRect = footerEl.getBoundingClientRect();
                pageUpButton.classList.toggle("in-footer", buttonRect.bottom >= footerRect.top);
            }
        };
        window.addEventListener("scroll", togglePageUpButton, { passive: true });
        window.addEventListener("resize", togglePageUpButton);
        togglePageUpButton();

        pageUpButton.addEventListener("click", () => {
            if (typeof window.smoothScrollToPageY === "function") {
                window.smoothScrollToPageY(0, 700);
            } else {
                window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
            }
        });
    }

    // Mobile nav toggle
    const navToggle = document.getElementById("nav-toggle");
    const navLinks  = document.getElementById("nav-links");
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
        // Close menu when any nav link is clicked
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

// Close menu on Escape and restore focus to its toggle.
document.addEventListener('keydown', event => {
 if(event.key === 'Escape' && navLinks.classList.contains('open')) {
  navLinks.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); navToggle.focus();
 }
});
