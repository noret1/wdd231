import { workshopTools } from './data.js';

// ===== DOM ELEMENTS =====
const menuButton = document.querySelector('#menuButton');
const mainNav = document.querySelector('#mainNav');
const featuredContainer = document.querySelector('#featuredTools');
const modal = document.querySelector('#toolModal');
const modalContent = document.querySelector('#modalContent');
const closeModal = document.querySelector('#closeModal');

// ===== NAVIGATION TOGGLE =====
if (menuButton && mainNav) {
    menuButton.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        menuButton.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
    });
}

// ===== FEATURED TOOLS (3 random tools) =====
function displayFeaturedTools() {
    if (!featuredContainer) return;

    try {
        // Get 3 random tools
        const shuffled = [...workshopTools].sort(() => 0.5 - Math.random());
        const featured = shuffled.slice(0, 3);

        featuredContainer.innerHTML = featured.map(tool => `
            <div class="tool-card" data-id="${tool.id}">
                <span class="tool-category">${tool.category}</span>
                <h3>${tool.name}</h3>
                <p class="tool-description">${tool.description.substring(0, 60)}...</p>
                <p class="tool-price">${tool.price}</p>
                <p class="tool-rating">⭐ ${tool.rating}/5</p>
            </div>
        `).join('');

        // Add click listeners to featured tools
        document.querySelectorAll('#featuredTools .tool-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.dataset.id);
                const tool = workshopTools.find(t => t.id === id);
                if (tool) openModal(tool);
            });
        });

    } catch (error) {
        console.error('Error displaying featured tools:', error);
        if (featuredContainer) {
            featuredContainer.innerHTML = '<p>Unable to load featured tools.</p>';
        }
    }
}

// ===== MODAL FUNCTIONS =====
function openModal(tool) {
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
        <h2>${tool.name}</h2>
        <p><strong>Category:</strong> ${tool.category}</p>
        <p><strong>Brand:</strong> ${tool.brand}</p>
        <p><strong>Description:</strong> ${tool.description}</p>
        <p class="modal-price">${tool.price}</p>
        <p><strong>Rating:</strong> ⭐ ${tool.rating}/5</p>
    `;

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

// ===== LOCAL STORAGE: Save Visit Count =====
function updateVisitCount() {
    try {
        let visits = localStorage.getItem('mechanicHubVisits');
        visits = visits ? parseInt(visits) + 1 : 1;
        localStorage.setItem('mechanicHubVisits', visits);
        return visits;
    } catch (error) {
        console.error('LocalStorage error:', error);
        return 0;
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

// ===== FORM HANDLING =====
function setupForm() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        // Form will submit normally to form-action.html
        // We just save to localStorage as backup
        try {
            const formData = new FormData(form);
            const data = {
                fullname: formData.get('fullname'),
                email: formData.get('email'),
                interest: formData.get('interest'),
                comments: formData.get('comments')
            };
            localStorage.setItem('formSubmission', JSON.stringify(data));
        } catch (error) {
            console.error('Form save error:', error);
        }
    });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    setFooterDates();
    displayFeaturedTools();
    setupForm();

    // Update visit count in console (optional)
    const visits = updateVisitCount();
    console.log(`🚗 Mechanic Hub visits: ${visits}`);
});
