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
   FETCH TOOLS DATA - with try/catch
-------------------------- */
async function getTools() {
    try {
        const response = await fetch("data/tools.json");

        if (!response.ok) {
            throw new Error(`Failed to load tools data: ${response.status}`);
        }

        const data = await response.json();

        // Validate data has items
        if (!data || data.length === 0) {
            throw new Error("No tools data available");
        }

        displayTools(data);
        setupFilters(data);

        return data;

    } catch (error) {
        console.error("Error fetching tools:", error);
        // Show error message to user
        if (toolsContainer) {
            toolsContainer.innerHTML = `<p class="error-message">Unable to load tools. Please try again later.</p>`;
        }
        if (engineContainer) {
            engineContainer.innerHTML = `<p class="error-message">Unable to load engine systems. Please try again later.</p>`;
        }
        return [];
    }
}

/* -------------------------
   DISPLAY TOOLS (MAP METHOD)
-------------------------- */
function displayTools(data) {
    // Ensure data is an array
    const toolsData = Array.isArray(data) ? data : [];

    // Use map to create cards
    const cards = toolsData.map(tool => {
        const isFavorite = favorites.includes(tool.id);
        return `
        <div class="tool-card" data-category="${tool.category}">
            <h3>${tool.name}</h3>
            <span class="tool-tag">${tool.category}</span>
            <p><strong>Price:</strong> UGX ${tool.price ? tool.price.toLocaleString() : 'N/A'}</p>
            <p>${tool.description ? tool.description.substring(0, 80) + '...' : ''}</p>
            <div class="card-actions">
                <button onclick="openModal(${tool.id})" class="btn-details">
                    View Details
                </button>
                <button onclick="saveFavorite(${tool.id})" class="btn-favorite ${isFavorite ? 'favorite-active' : ''}">
                    ${isFavorite ? '★' : '☆'} Favorite
                </button>
            </div>
        </div>
        `;
    }).join("");

    // Update containers
    if (toolsContainer) {
        toolsContainer.innerHTML = cards.length ? cards : '<p>No tools available</p>';
    }

    if (engineContainer) {
        engineContainer.innerHTML = cards.length ? cards : '<p>No engine systems available</p>';
    }
}

/* -------------------------
   FILTER SYSTEM (FILTER METHOD)
-------------------------- */
function setupFilters(data) {
    if (!filterButtons.length) return;

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("filter-active"));
            button.classList.add("filter-active");

            const filter = button.dataset.filter;
            let filteredData = data;

            if (filter !== "all") {
                // Use filter method
                filteredData = data.filter(tool => tool.category === filter);
            }

            displayTools(filteredData);
        });
    });
}

/* -------------------------
   FIND TOOL BY ID (FIND METHOD)
-------------------------- */
function findToolById(id, data) {
    // Use find method
    return data.find(tool => tool.id === id);
}

/* -------------------------
   MODAL HANDLING
-------------------------- */
let globalData = [];

function openModal(id) {
    // Use find method
    const tool = globalData.find(item => item.id === id);

    if (!tool || !modal || !modalContent) return;

    // Use template literals
    modalContent.innerHTML = `
        <h2>${tool.name}</h2>
        <p><strong>Category:</strong> ${tool.category}</p>
        <p><strong>Price:</strong> UGX ${tool.price ? tool.price.toLocaleString() : 'N/A'}</p>
        <p><strong>Description:</strong> ${tool.description}</p>
        <p><strong>Usage:</strong> ${tool.usage}</p>
        <p><strong>Safety:</strong> ${tool.safety || 'Standard safety precautions apply'}</p>
    `;

    modal.showModal();
}

// Make openModal globally accessible
window.openModal = openModal;

/* -------------------------
   CLOSE MODAL
-------------------------- */
if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
        modal.close();
    });

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.close();
        }
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

    // Refresh display to update favorite buttons
    if (globalData.length) {
        displayTools(globalData);
    }
}

// Make saveFavorite globally accessible
window.saveFavorite = saveFavorite;

/* -------------------------
   INIT DATA STORAGE
-------------------------- */
async function init() {
    try {
        const data = await getTools();
        globalData = data;
    } catch (error) {
        console.error("Initialization error:", error);
    }
}

/* -------------------------
   FOOTER DATES
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