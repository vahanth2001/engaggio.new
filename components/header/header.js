// ==========================================
// HEADER
// ==========================================

(function initHeader() {

    const header = document.querySelector("header");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    const searchToggle = document.getElementById("searchToggle");
    const searchInput = document.getElementById("searchInput");
    const searchWrapper = document.querySelector(".header-search");

    const dropdownTriggers =
        document.querySelectorAll(".header-nav-trigger");


    // ==========================================
    // HEADER SCROLL BACKGROUND
    // ==========================================

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleHeaderScroll);

    // Check immediately
    handleHeaderScroll();


    // ==========================================
    // SEARCH
    // ==========================================

    if (searchToggle && searchInput && searchWrapper) {

        searchToggle.addEventListener("click", () => {

            const isOpen =
                searchWrapper.classList.toggle("header-active");

            searchToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            if (isOpen) {
                setTimeout(() => searchInput.focus(), 120);
            }

        });


        searchInput.addEventListener("keydown", (e) => {

            if (e.key === "Escape") {

                searchWrapper.classList.remove("header-active");

                searchToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                searchToggle.focus();
            }

        });


        searchInput.addEventListener("blur", () => {

            setTimeout(() => {

                searchWrapper.classList.remove("header-active");

                searchToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }, 120);

        });

    }


    // ==========================================
    // MOBILE MENU
    // ==========================================

    if (hamburgerBtn && mobileMenu) {

        hamburgerBtn.addEventListener("click", () => {

            hamburgerBtn.classList.toggle("header-active");

            mobileMenu.classList.toggle("header-show");

        });

    }


    // ==========================================
    // MOBILE DROPDOWNS
    // ==========================================

    dropdownTriggers.forEach(trigger => {

        trigger.addEventListener("click", () => {

            if (window.innerWidth > 900) return;

            const parentDropdown =
                trigger.closest(".header-nav-dropdown");

            if (!parentDropdown) return;


            // Close other dropdowns
            document
                .querySelectorAll(".header-nav-dropdown")
                .forEach(drop => {

                    if (drop !== parentDropdown) {

                        drop.classList.remove("header-open");

                        const button =
                            drop.querySelector(
                                ".header-nav-trigger"
                            );

                        if (button) {
                            button.setAttribute(
                                "aria-expanded",
                                "false"
                            );
                        }

                    }

                });


            // Open/close selected dropdown
            const isOpen =
                parentDropdown.classList.toggle("header-open");

            trigger.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

    });


    // ==========================================
    // CLOSE MOBILE MENU AFTER LINK CLICK
    // ==========================================

    if (mobileMenu) {

        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    mobileMenu.classList.remove("header-show");

                    if (hamburgerBtn) {
                        hamburgerBtn.classList.remove(
                            "header-active"
                        );
                    }


                    document
                        .querySelectorAll(
                            ".header-nav-dropdown"
                        )
                        .forEach(drop => {

                            drop.classList.remove(
                                "header-open"
                            );

                        });

                });

            });

    }


    // ==========================================
    // RESIZE
    // ==========================================

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            if (mobileMenu) {
                mobileMenu.classList.remove("header-show");
            }

            if (hamburgerBtn) {
                hamburgerBtn.classList.remove("header-active");
            }


            document
                .querySelectorAll(".header-nav-dropdown")
                .forEach(drop => {

                    drop.classList.remove("header-open");

                });

        }

    });

})();