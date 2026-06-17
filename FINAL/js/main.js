// Main JavaScript for Automobile Mechanic Learning Hub

// Mobile Menu Toggle
const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");

if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        mainNav.classList.toggle("open");
    });
}

// Footer Dates
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}

// Featured Tools - Load on Home Page
async function loadFeaturedTools() {
    const container = document.querySelector("#featuredTools");
    if (!container) return;

    try {
        const response = await fetch("data/tools.json");
        
        if (!response.ok) {
            throw new Error("Failed to load tools data");
        }

        const tools = await response.json();
        
        // Show only first 6 tools as featured
        const featured = tools.slice(0, 6);
        
        // Use map and template literals
        const cards = featured.map(tool => `
            <div class="tool-card" data-category="${tool.category}">
                <h3>${tool.name}</h3>
                <p><strong>Price:</strong> UGX ${tool.price.toLocaleString()}</p>
                <p>${tool.description.substring(0, 60)}...</p>
                <button onclick="window.location.href='workshop-tools.html'">View All Tools</button>
            </div>
        `).join("");

        container.innerHTML = cards;

    } catch (error) {
        console.error("Error loading featured tools:", error);
        container.innerHTML = `<p>Unable to load tools at this time.</p>`;
    }
}

// Initialize featured tools
loadFeaturedTools();

// Modal functionality for home page
const modal = document.querySelector("#toolModal");
const closeModal = document.querySelector("#closeModal");
const modalContent = document.querySelector("#modalContent");

if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
        modal.close();
    });

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.close();
        }
    });
}

// Function to open modal (used by dynamically created buttons)
window.openToolModal = function(toolId) {
    if (!modal || !modalContent) return;
    
    fetch("data/tools.json")
        .then(response => response.json())
        .then(tools => {
            const tool = tools.find(t => t.id === toolId);
            if (!tool) return;

            modalContent.innerHTML = `
                <h2>${tool.name}</h2>
                <p><strong>Category:</strong> ${tool.category}</p>
                <p><strong>Price:</strong> UGX ${tool.price.toLocaleString()}</p>
                <p><strong>Description:</strong> ${tool.description}</p>
                <p><strong>Usage:</strong> ${tool.usage}</p>
            `;
            modal.showModal();
        })
        .catch(error => {
            console.error("Error loading tool details:", error);
        });
};