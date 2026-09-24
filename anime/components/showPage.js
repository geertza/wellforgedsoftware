import { searchAnime } from "../routes.js"; 
import './dialogSlider.js';
export class ShowPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.data = null;
    }

    static get observedAttributes() { return ["slug"]; }

    async attributeChangedCallback(name, oldVal, newVal) {
        if (newVal && newVal !== oldVal) {
            this.shadowRoot.replaceChildren(document.createTextNode(`Searching for "${newVal}"...`));

            try {
                const result = await searchAnime(newVal);

                if (!result) {
                    const msg = document.createElement("h2");
                    msg.style.cssText = "color: white; text-align: center; margin-top: 100px;";
                    msg.textContent = `Sorry, we couldn't find "${newVal}".`;
                    this.shadowRoot.replaceChildren(msg);
                    return;
                }

                this.data = result;
                this.render();
            } catch (err) {
                const errorMsg = document.createElement("h2");
                errorMsg.style.cssText = "color: #ff4444; text-align: center; margin-top: 100px;";
                errorMsg.textContent = "Sorry, there was a connection error.";
                this.shadowRoot.replaceChildren(errorMsg);
            }
        }
    }

    render() {
        if (!this.data) return;

        const style = document.createElement("style");
        style.textContent = `
            :host { display: block; position: relative; min-height: 100vh; color: white; overflow-x: hidden; }

            /* Clear, non-blurred scrolling background */
            .bg-wrapper { position: fixed; top: 0; left: 0; width: 200%; height: 100%; z-index: -1; background-color: #000; }
            .bg-image {
                width: 100%; height: 100%;
                background-image: url('${this.data.bannerImage || this.data.coverImage?.extraLarge}');
                background-size: contain; background-repeat: repeat-x;
                filter: brightness(1.2s);
                animation: slideAcross 60s linear infinite;
            }
            @keyframes slideAcross { from { background-position: 0 center; } to { background-position: -2000px center; } }

            .content-overlay { 
                position: relative; padding: 60px 30px; max-width: 1000px; margin: 40px auto; 
                z-index: 1; background: rgba(0, 0, 0, 0.4); border-radius: 16px; backdrop-filter: blur(8px);
            }

            .back-btn { background: #3db4f2; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-bottom: 20px; font-weight: bold; }
            
            .char-section { margin-top: 40px; }
            .char-card { cursor: pointer; text-align: center; transition: transform 0.2s; }
            .char-card:hover { transform: translateY(-5px); }
            .char-img { width: 100%; border-radius: 8px; aspect-ratio: 2/3; object-fit: cover; }
            .char-name { margin-top: 10px; font-size: 0.9em; font-weight: 500; }

            swiper-container { width: 100%; margin-top: 20px; }
        `;

        const container = document.createElement("div");
        container.className = "content-overlay";

        const backBtn = document.createElement("button");
        backBtn.className = "back-btn";
        backBtn.textContent = "← Back to Browse";
        backBtn.onclick = () => location.reload();

        const h1 = document.createElement("h1");
        h1.textContent = this.data.title.english || this.data.title.romaji;

        const descDiv = document.createElement("div");
        const rawHtml = this.data.description || "No description available.";
        const cleanFragment = window.DOMPurify.sanitize(rawHtml, { 
            RETURN_DOM_FRAGMENT: true,
            FORBID_TAGS: ['a'] 
        });

        descDiv.appendChild(cleanFragment);
        const modal = document.createElement("character-modal");

        //  Character Slider
        const charSection = document.createElement("div");
        charSection.className = "char-section";
        const charTitle = document.createElement("h2");
        charTitle.textContent = "Characters";

        const swiper = document.createElement("swiper-container");
        Object.assign(swiper, { 
            slidesPerView: 2, spaceBetween: 20, navigation: true,
            breakpoints: { 640: { slidesPerView: 3 }, 1024: { slidesPerView: 5 } }
        });

        this.data.characters.edges.forEach((edge, index) => {
            const slide = document.createElement("swiper-slide");
            const charCard = document.createElement("div");
            charCard.className = "char-card";
            charCard.onclick = () => modal.open(this.data.characters.edges, index);

            const img = document.createElement("img");
            img.className = "char-img";
            img.src = edge.node.image.large;

            const name = document.createElement("p");
            name.className = "char-name";
            name.textContent = edge.node.name.full;

            charCard.append(img, name);
            slide.append(charCard);
            swiper.append(slide);
        });

        const bgWrapper = document.createElement("div");
        bgWrapper.className = "bg-wrapper";
        const bgImg = document.createElement("div");
        bgImg.className = "bg-image";
        bgWrapper.append(bgImg);

        charSection.append(charTitle, swiper);
        container.append(backBtn, h1, descDiv, charSection);
        
        this.shadowRoot.replaceChildren(style, bgWrapper, container, modal);
        
        requestAnimationFrame(() => swiper.initialize());
    }
}

customElements.define("show-page", ShowPage);
