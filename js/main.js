// =========================================
// ROUTES
// =========================================

const routes = {
    "/": "home",
    "/index.html": "home",
    "/overview": "overview",
    "/team": "team",
    "/careers": "careers",
    "/contact": "contact",
    "/insights": "insights",
    "/BeIntelli-2": "beintelli",
    "/beenai": "beenai"
};

// =========================================
// LOAD HTML
// =========================================

async function loadHTML(containerId, file) {

    const response = await fetch(file);

    if (!response.ok) {
        throw new Error(file + " not found");
    }

    document.getElementById(containerId).innerHTML =
        await response.text();
}

// =========================================
// LOAD CSS
// =========================================

function loadCSS(id, file) {

    let css = document.getElementById(id);

    if (css) css.remove();

    css = document.createElement("link");

    css.id = id;
    css.rel = "stylesheet";
    css.href = file;

    document.head.appendChild(css);
}

// =========================================
// LOAD JS
// =========================================

function loadJS(id, file) {

    const old = document.getElementById(id);

    if (old) old.remove();

    const script = document.createElement("script");

    script.id = id;
    script.src = file;

    document.body.appendChild(script);
}

// =========================================
// HEADER
// =========================================

async function loadHeader() {

    await loadHTML(
        "header",
        "components/header/header.html"
    );

    loadCSS(
        "header-css",
        "components/header/header.css"
    );

    loadJS(
        "header-js",
        "components/header/header.js"
    );
}

// =========================================
// FOOTER
// =========================================

async function loadFooter() {

    await loadHTML(
        "footer",
        "components/footer/footer.html"
    );

    loadCSS(
        "footer-css",
        "components/footer/footer.css"
    );

    loadJS(
        "footer-js",
        "components/footer/footer.js"
    );
}

// =========================================
// PAGE
// =========================================

async function loadPage(path) {

    const page = routes[path] || "home";

    try {

        await loadHTML(
            "app",
            `pages/${page}/${page}.html`
        );

        loadCSS(
            "page-css",
            `pages/${page}/${page}.css`
        );

        loadJS(
            "page-js",
            `pages/${page}/${page}.js`
        );

    } catch (error) {

        document.getElementById("app").innerHTML = `
            <section style="padding:150px 20px;text-align:center;">
                <h1>404</h1>
                <p>Page not found.</p>
            </section>
        `;

        console.error(error);
    }
}

// =========================================
// SPA NAVIGATION
// =========================================

document.addEventListener("click", (e) => {

    const link = e.target.closest("a");

    if (!link) return;

    const href = link.getAttribute("href");

    if (!href) return;

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

// =========================================
// BACK BUTTON
// =========================================

window.addEventListener("popstate", () => {

    loadPage(window.location.pathname);

});

// =========================================
// INITIAL LOAD
// =========================================

window.addEventListener("DOMContentLoaded", async () => {

    await loadHeader();

    await loadFooter();

    await loadPage(window.location.pathname);

});