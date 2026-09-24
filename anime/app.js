import "./components/showPage.js";

class MainApp extends HTMLElement {
    async connectedCallback() {
        this.addEventListener('anime-select', (e) => {
            const title = e.detail.anime.title.english || e.detail.anime.title.romaji;
            this.showAnime(title);
        });

        window.addEventListener('search-anime', (e) => {
            const query = e.detail.query;
            if (query) {
                this.showAnime(query);
            }
        });

        await this.loadPage("home");
    }
    showAnime(title) {
        const page = document.createElement("show-page");
        page.setAttribute("slug", title); 
        
        this.replaceChildren(page);
        this.currentState = "showPage";
    }

    async loadPage(pageName) {
        const res = await fetch(`./pages/${pageName}.html`);
        const text = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        this.replaceChildren(...doc.body.childNodes);
        this.currentState = pageName;
    }
}
const searchInput = document.getElementById('search');
const searchContainer = document.querySelector('.search-container');

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();

        // 1. Validation: Prevent blank input or blank screen
        if (query === "") {
            showSearchError("Please enter an anime name");
            return; // Stops the event from firing
        }

        // 2. Clear any existing error if they typed something
        const existingError = document.querySelector('.search-error');
        if (existingError) existingError.remove();

        // 3. Dispatch the event only if input is valid
        window.dispatchEvent(new CustomEvent('search-anime', {
            detail: { query },
            bubbles: true,
            composed: true
        }));

        searchInput.value = ""; 
    }
});

// Function to inject the error message into the DOM
function showSearchError(message) {
    if (document.querySelector('.search-error')) return;

    const errorMsg = document.createElement('div');
    errorMsg.className = 'search-error';
    errorMsg.textContent = message;
    
    // Style it to sit right above the search bar
    errorMsg.style.cssText = `
        color: #ff4444; 
        font-size: 14px; 
        font-weight: bold;
        margin-bottom: 5px;
        animation: fadeIn 0.3s ease;
    `;
    
    searchContainer.prepend(errorMsg);

    // Auto-remove after 3 seconds
    setTimeout(() => errorMsg.remove(), 3000);
}


customElements.define('main-app', MainApp);
