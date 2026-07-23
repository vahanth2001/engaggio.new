// ===============================
// COMPONENT LOADER
// ===============================

async function loadComponent(targetId, file) {
    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Unable to load ${file}`);
        }

        document.getElementById(targetId).innerHTML = await response.text();
    } catch (error) {
        console.error(error);
    }
}

// ===============================
// ROUTES
// ===============================

const routes = {
    "/": "pages/home.html",
    "/overview": "pages/overview.html",
    "/team": "pages/team.html",
    "/careers": "pages/careers.html",
    "/contact": "pages/contact.html",
    "/insights": "pages/insights.html",
    "/BeIntelli-2": "pages/BeIntelli-2.html",
    "/beenai": "pages/beenai.html"
};

// ===============================
// PAGE LOADER
// ===============================

async function loadPage(path) {

    const page = routes[path] || routes["/"];

    try {

        const response = await fetch(page);

        if (!response.ok) {
            throw new Error(`Cannot load ${page}`);
        }

        document.getElementById("app").innerHTML = await response.text();

        // Initialize page scripts
        if (typeof window.initSlider === "function") {
            window.initSlider();
        }

    } catch (error) {

        document.getElementById("app").innerHTML = `
            <section style="padding:120px 20px;text-align:center;">
                <h2>404</h2>
                <p>Page not found.</p>
            </section>
        `;

        console.error(error);
    }
}

// ===============================
// NAVIGATION
// ===============================

document.addEventListener("click", function (e) {

    const link = e.target.closest("a");

    if (!link) return;

    const href = link.getAttribute("href");

    if (!href) return;

    // Ignore external links
    if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#")
    ) {
        return;
    }

    e.preventDefault();

    history.pushState({}, "", href);

    loadPage(window.location.pathname);

});

// ===============================
// BACK / FORWARD
// ===============================

window.addEventListener("popstate", () => {
    loadPage(window.location.pathname);
});

// ===============================
// INITIAL LOAD
// ===============================

window.addEventListener("DOMContentLoaded", async () => {

    await loadComponent("header", "components/header.html");

    await loadComponent("footer", "components/footer.html");

    await loadPage(window.location.pathname);

});