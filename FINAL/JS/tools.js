/* -------------------------
   DOM ELEMENTS
-------------------------- */
const toolsContainer = document.querySelector("#toolsContainer");
const engineContainer = document.querySelector("#engineContainer");
const modal = document.querySelector("#toolModal") || document.querySelector("#systemModal");
const modalContent = document.querySelector("#modalContent");
const closeModal = document.querySelector("#closeModal");
const filterButtons = document.querySelectorAll("[data-filter]");

/* -------------------------
   LOCAL STORAGE
-------------------------- */
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

/* -------------------------
   FETCH TOOLS DATA
-------------------------- */
async function getTools() {
    try {
        const response = await fetch("data/tools.json");

        if (!response.ok) {
            throw new Error("Failed to load tools data");
        }

        const data = await response.json();

        displayTools(data);

        setupFilters(data);

    } catch (error) {
        console.error("Error fetching tools:", error);
    }
}

/* -------------------------
   DISPLAY TOOLS (MAP METHOD)
-------------------------- */
function displayTools(data) {

    const cards = data.map(tool => {
        return `
        <div class="tool-card" data-category="${tool.category}">
            <h3>${tool.name}</h3>

            <p><strong>Price:</strong> UGX ${tool.price}</p>

            <p>${tool.description}</p>

            <button onclick="openModal(${tool.id})">
                View Details
            </button>

            <button onclick="saveFavorite(${tool.id})">
                ★ Favorite
            </button>
        </div>
        `;
    }).join("");

    if (toolsContainer) {
        toolsContainer.innerHTML = cards;
    }

    if (engineContainer) {
        engineContainer.innerHTML = cards;
    }
}

/* -------------------------
   FILTER SYSTEM (FILTER METHOD)
-------------------------- */
function setupFilters(data) {

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter = button.dataset.filter;

            let filteredData = data;

            if (filter !== "all") {
                filteredData = data.filter(tool => tool.category === filter);
            }

            displayTools(filteredData);
        });
    });
}

/* -------------------------
   FIND TOOL BY ID
-------------------------- */
function findToolById(id, data) {
    return data.find(tool => tool.id === id);
}

/* -------------------------
   MODAL HANDLING
-------------------------- */
let globalData = [];

function openModal(id) {

    const tool = globalData.find(item => item.id === id);

    if (!tool) return;

    modalContent.innerHTML = `
        <h2>${tool.name}</h2>
        <p><strong>Category:</strong> ${tool.category}</p>
        <p><strong>Price:</strong> UGX ${tool.price}</p>
        <p><strong>Description:</strong> ${tool.description}</p>
        <p><strong>Usage:</strong> ${tool.usage}</p>
    `;

    modal.showModal();
}

/* -------------------------
   CLOSE MODAL
-------------------------- */
if (closeModal) {
    closeModal.addEventListener("click", () => {
        modal.close();
    });
}

/* -------------------------
   FAVORITES (LOCAL STORAGE)
-------------------------- */
function saveFavorite(id) {

    if (!favorites.includes(id)) {
        favorites.push(id);
    } else {
        favorites = favorites.filter(fav => fav !== id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    alert("Favorites updated!");
}

/* -------------------------
   INIT DATA STORAGE
-------------------------- */
async function init() {

    try {
        const response = await fetch("data/tools.json");

        if (!response.ok) {
            throw new Error("Failed to initialize data");
        }

        const data = await response.json();

        globalData = data;

        displayTools(data);

        setupFilters(data);

    } catch (error) {
        console.error("Initialization error:", error);
    }
}

/* -------------------------
   FOOTER DATES (INDEX SUPPORT)
-------------------------- */
function setFooter() {

    const year = document.querySelector("#currentYear");
    const modified = document.querySelector("#lastModified");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    if (modified) {
        modified.textContent = document.lastModified;
    }
}

/* -------------------------
   RUN APP
-------------------------- */
init();
setFooter();