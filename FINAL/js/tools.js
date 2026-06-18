import { engineSystems, workshopTools } from './data.js';

// ===== DETERMINE CURRENT PAGE =====
const isEnginePage = document.querySelector('#engineContainer') !== null;
const isToolsPage = document.querySelector('#toolsContainer') !== null;

// ===== MODAL ELEMENTS =====
const modal = document.querySelector('#toolModal');
const modalContent = document.querySelector('#modalContent');
const closeModal = document.querySelector('#closeModal');

// ===== NAVIGATION TOGGLE =====
const menuButton = document.querySelector('#menuButton');
const mainNav = document.querySelector('#mainNav');

if (menuButton && mainNav) {
    menuButton.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        menuButton.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
    });
}

// ===== MODAL FUNCTIONS =====
function openModal(data, type) {
    if (!modal || !modalContent) return;

    if (type === 'engine') {
        modalContent.innerHTML = `
            <h2>${data.name}</h2>
            <p><strong>Category:</strong> ${data.category}</p>
            <p><strong>Function:</strong> ${data.function}</p>
            <p><strong>Components:</strong> ${data.components.join(', ')}</p>
            <p><strong>Maintenance:</strong> ${data.maintenance}</p>
        `;
    } else {
        modalContent.innerHTML = `
            <h2>${data.name}</h2>
            <p><strong>Category:</strong> ${data.category}</p>
            <p><strong>Brand:</strong> ${data.brand}</p>
            <p><strong>Description:</strong> ${data.description}</p>
            <p class="modal-price">${data.price}</p>
            <p><strong>Rating:</strong> ⭐ ${data.rating}/5</p>
        `;
    }

    modal.showModal();
}

function closeModalHandler() {
    if (modal) modal.close();
}

// ===== MODAL EVENT LISTENERS =====
if (closeModal) {
    closeModal.addEventListener('click', closeModalHandler);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModalHandler();
    });

    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModalHandler();
    });
}

// ===== ENGINE SYSTEMS PAGE =====
function renderEngineSystems() {
    const container = document.querySelector('#engineContainer');
    if (!container) return;

    try {
        // Use map to generate HTML
        container.innerHTML = engineSystems.map(system => `
            <div class="tool-card" data-id="${system.id}" data-type="engine">
                <span class="tool-category">${system.category}</span>
                <h3>${system.name}</h3>
                <p class="tool-description">${system.function}</p>
                <p><strong>Components:</strong> ${system.components.slice(0, 3).join(', ')}${system.components.length > 3 ? '...' : ''}</p>
            </div>
        `).join('');

        // Add click listeners
        container.querySelectorAll('.tool-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.dataset.id);
                const system = engineSystems.find(s => s.id === id);
                if (system) openModal(system, 'engine');
            });
        });

    } catch (error) {
        console.error('Error rendering engine systems:', error);
        container.innerHTML = '<p>Unable to load engine systems.</p>';
    }
}

// ===== WORKSHOP TOOLS PAGE =====
function renderWorkshopTools(filter = 'all') {
    const container = document.querySelector('#toolsContainer');
    if (!container) return;

    try {
        let filtered = workshopTools;
        if (filter !== 'all') {
            filtered = workshopTools.filter(tool => tool.category === filter);
        }

        if (filtered.length === 0) {
            container.innerHTML = '<p>No tools found in this category.</p>';
            return;
        }

        // Use map to generate HTML
        container.innerHTML = filtered.map(tool => `
            <div class="tool-card" data-id="${tool.id}" data-type="tool">
                <span class="tool-category">${tool.category}</span>
                <h3>${tool.name}</h3>
                <p class="tool-description">${tool.description}</p>
                <p class="tool-price">${tool.price}</p>
                <p>⭐ ${tool.rating}/5</p>
            </div>
        `).join('');

        // Add click listeners
        container.querySelectorAll('.tool-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.dataset.id);
                const tool = workshopTools.find(t => t.id === id);
                if (tool) openModal(tool, 'tool');
            });
        });

    } catch (error) {
        console.error('Error rendering workshop tools:', error);
        container.innerHTML = '<p>Unable to load workshop tools.</p>';
    }
}

// ===== FILTER BUTTONS =====
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    if (!filterButtons.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('filter-active'));
            button.classList.add('filter-active');

            // Filter tools
            const filter = button.dataset.filter;
            renderWorkshopTools(filter);

            // Save preference to localStorage
            try {
                localStorage.setItem('toolFilter', filter);
            } catch (error) {
                console.error('LocalStorage save error:', error);
            }
        });
    });

    // Load saved filter preference
    try {
        const savedFilter = localStorage.getItem('toolFilter');
        if (savedFilter) {
            const button = document.querySelector(`.filter-buttons button[data-filter="${savedFilter}"]`);
            if (button) {
                button.click();
            }
        }
    } catch (error) {
        console.error('LocalStorage load error:', error);
    }
}

// ===== FOOTER DATES =====
function setFooterDates() {
    const yearSpan = document.getElementById('currentYear');
    const modifiedSpan = document.getElementById('lastModified');

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    if (modifiedSpan) {
        modifiedSpan.textContent = document.lastModified;
    }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    setFooterDates();

    if (isEnginePage) {
        renderEngineSystems();
    }

    if (isToolsPage) {
        renderWorkshopTools('all');
        setupFilters();
    }
});
