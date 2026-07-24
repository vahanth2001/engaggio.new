(function () {

    // ===============================
    // ELEMENTS
    // ===============================

    const header = document.querySelector("#header header");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    const searchToggle = document.getElementById("searchToggle");
    const searchInput = document.getElementById("searchInput");
    const searchWrapper = document.querySelector(".header-search");

    const dropdownTriggers =
        document.querySelectorAll(".header-nav-trigger");


    // ===============================
    // HEADER SCROLL
    // ===============================

    function updateHeader() {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );
    }

    window.addEventListener("scroll", updateHeader);

    // Important for page reload while already scrolled
    updateHeader();


    // ===============================
    // SEARCH
    // ===============================

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


    // ===============================
    // HAMBURGER
    // ===============================

    if (hamburgerBtn && mobileMenu) {

        hamburgerBtn.addEventListener("click", () => {

            hamburgerBtn.classList.toggle("header-active");
            mobileMenu.classList.toggle("header-show");

        });
    }


    // ===============================
    // MOBILE DROPDOWNS
    // ===============================

    dropdownTriggers.forEach(trigger => {

        trigger.addEventListener("click", () => {

            if (window.innerWidth > 900) return;

            const parent =
                trigger.closest(".header-nav-dropdown");

            if (!parent) return;


            // Close other dropdowns
            document
                .querySelectorAll(".header-nav-dropdown")
                .forEach(dropdown => {

                    if (dropdown !== parent) {

                        dropdown.classList.remove("header-open");

                        const button =
                            dropdown.querySelector(".header-nav-trigger");

                        if (button) {
                            button.setAttribute(
                                "aria-expanded",
                                "false"
                            );
                        }
                    }
                });


            // Toggle current dropdown
            const isOpen =
                parent.classList.toggle("header-open");

            trigger.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

    });


    // ===============================
    // CLOSE MOBILE MENU AFTER CLICK
    // ===============================

    if (mobileMenu) {

        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("header-show");

                if (hamburgerBtn) {
                    hamburgerBtn.classList.remove("header-active");
                }

                document
                    .querySelectorAll(".header-nav-dropdown")
                    .forEach(dropdown => {

                        dropdown.classList.remove("header-open");

                    });

            });

        });
    }


    // ===============================
    // WINDOW RESIZE
    // ===============================

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
                .forEach(dropdown => {

                    dropdown.classList.remove("header-open");

                });
        }

    });

})();