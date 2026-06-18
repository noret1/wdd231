/* -------------------------
   DOM ELEMENTS
-------------------------- */
const toolsContainer = document.querySelector("#toolsContainer");
const modal = document.querySelector("#toolModal");
const modalContent = document.querySelector("#modalContent");
const closeModal = document.querySelector("#closeModal");
const filterButtons = document.querySelectorAll("[data-filter]");

/* -------------------------
   LOCAL STORAGE
-------------------------- */
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

/* -------------------------
   GLOBAL STATE
-------------------------- */
let globalData = [];

/* -------------------------
   FETCH DATA
-------------------------- */
async function getTools() {
    try {
        const response = await fetch("data/tools.json");

        if (!response.ok) {
            throw new Error(`Failed to load tools: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Tools data is empty or invalid");
        }

        globalData = data;

        displayTools(globalData);
        setupFilters();

        return data;

    } catch (error) {
        console.error(error);

        if (toolsContainer) {
            toolsContainer.innerHTML =
                `<p class="error-message">Unable to load tools. Try again later.</p>`;
        }

        return [];
    }
}

/* -------------------------
   DISPLAY TOOLS
-------------------------- */
function displayTools(data) {
    if (!toolsContainer) return;

    const cards = data.map(tool => {
        const isFavorite = favorites.includes(tool.id);

        return `
        <div class="tool-card" data-category="${tool.category.toLowerCase()}" data-id="${tool.id}">
            <h3>${tool.name}</h3>
            <span class="tool-tag">${tool.category}</span>

            <p><strong>Price:</strong> UGX ${tool.price ? tool.price.toLocaleString() : "N/A"}</p>

            <p>${tool.description ? tool.description.substring(0, 80) + "..." : ""}</p>

            <div class="card-actions">
                <button class="btn-details" data-action="view" data-id="${tool.id}">
                    View Details
                </button>

                <button class="btn-favorite ${isFavorite ? "favorite-active" : ""}"
                        data-action="favorite"
                        data-id="${tool.id}">
                    ${isFavorite ? "★" : "☆"} Favorite
                </button>
            </div>
        </div>
        `;
    }).join("");

    toolsContainer.innerHTML = cards;
}

/* -------------------------
   FILTER SYSTEM
-------------------------- */
function setupFilters() {
    if (!filterButtons.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {

            filterButtons.forEach(b => b.classList.remove("filter-active"));
            btn.classList.add("filter-active");

            const filter = btn.dataset.filter;

            if (filter === "all") {
                displayTools(globalData);
                return;
            }

            const filtered = globalData.filter(tool =>
                tool.category.toLowerCase() === filter.toLowerCase()
            );

            displayTools(filtered);
        });
    });
}

/* -------------------------
   FIND TOOL
-------------------------- */
function findTool(id) {
    return globalData.find(t => t.id === id);
}

/* -------------------------
   MODAL OPEN
-------------------------- */
function openModal(id) {
    const tool = findTool(id);
    if (!tool || !modal || !modalContent) return;

    modalContent.innerHTML = `
        <h2>${tool.name}</h2>
        <p><strong>Category:</strong> ${tool.category}</p>
        <p><strong>Price:</strong> UGX ${tool.price ? tool.price.toLocaleString() : "N/A"}</p>
        <p><strong>Description:</strong> ${tool.description}</p>
        <p><strong>Usage:</strong> ${tool.usage || "Not specified"}</p>
        <p><strong>Safety:</strong> ${tool.safety || "Standard precautions apply"}</p>
    `;

    modal.showModal();
}

/* -------------------------
   FAVORITES
-------------------------- */
function toggleFavorite(id) {
    id = Number(id);

    if (favorites.includes(id)) {
        favorites = favorites.filter(f => f !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    displayTools(globalData);
}

/* -------------------------
   EVENT DELEGATION (CLEAN FIX)
-------------------------- */
if (toolsContainer) {
    toolsContainer.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;

        const id = btn.dataset.id;
        const action = btn.dataset.action;

        if (action === "view") {
            openModal(Number(id));
        }

        if (action === "favorite") {
            toggleFavorite(id);
        }
    });
}

/* -------------------------
   CLOSE MODAL
-------------------------- */
if (modal && closeModal) {
    closeModal.addEventListener("click", () => modal.close());

    modal.addEventListener("click", (e) => {
        const rect = modal.getBoundingClientRect();

        const inDialog =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

        if (!inDialog) modal.close();
    });
}

/* -------------------------
   FOOTER
-------------------------- */
function setFooter() {
    const year = document.querySelector("#currentYear");
    const modified = document.querySelector("#lastModified");

    if (year) year.textContent = new Date().getFullYear();
    if (modified) modified.textContent = document.lastModified;
}

/* -------------------------
   INIT
-------------------------- */
getTools();
setFooter();