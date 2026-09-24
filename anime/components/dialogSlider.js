export class CharacterModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.data = null;
    }

    open(edges, index) {
        this.data = edges[index]?.node;
        if (!this.data) return;
        
        this.render();
        this.shadowRoot.querySelector('dialog').showModal();
    }

    render() {
        const char = this.data;

        const style = document.createElement("style");
        style.textContent = `
            dialog { 
                border: none; border-radius: 20px; padding: 0; background: #111; color: white; 
                max-width: 1000px; width: 95%; max-height: 85vh; overflow-y: auto;
                box-shadow: 0 0 50px rgba(0,0,0,0.8);
            }
            dialog::backdrop { background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(4px); }
            
            .modal-header { position: sticky; top: 0; display: flex; justify-content: flex-end; padding: 15px; background: #111; z-index: 2; }
            .close-btn { background: none; border: none; color: white; font-size: 35px; cursor: pointer; line-height: 1; }
            
            .modal-body { padding: 0 40px 40px; }
            .modal-grid { display: grid; grid-template-columns: 300px 1fr; gap: 40px; }
            
            @media (max-width: 768px) {
                .modal-grid { grid-template-columns: 1fr; }
                .modal-body { padding: 0 20px 20px; }
            }

            .info-section { display: flex; flex-direction: column; gap: 20px; }
            .info-card { background: #1b1b1b; border-radius: 12px; padding: 20px; }
            
            h1 { margin: 0; font-size: 2.2em; }
            .nicknames { color: #3db4f2; margin: 5px 0 20px 0; font-size: 0.9em; }
            h3 { margin-top: 0; color: #3db4f2; text-transform: uppercase; font-size: 0.8em; letter-spacing: 1px; }
            
            ul { list-style: none; padding: 0; margin: 0; }
            li { margin-bottom: 15px; }
            .label { color: #777; text-transform: uppercase; font-size: 11px; display: block; margin-bottom: 2px; }
        `;

        const dialog = document.createElement("dialog");
        
        // Close Button
        const header = document.createElement("div");
        header.className = "modal-header";
        const closeBtn = document.createElement("button");
        closeBtn.className = "close-btn";
        closeBtn.textContent = "×";
        closeBtn.onclick = () => dialog.close();
        header.append(closeBtn);

        const body = document.createElement("div");
        body.className = "modal-body";

        const grid = document.createElement("div");
        grid.className = "modal-grid";

        // Left Column: Image and Stats
        const leftCol = document.createElement("div");
        leftCol.className = "info-section";

        const img = document.createElement("img");
        img.src = char.image.large;
        img.style.cssText = "width:100%; border-radius:12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);";

        const statsCard = document.createElement("div");
        statsCard.className = "info-card";
        const statsTitle = document.createElement("h3");
        statsTitle.textContent = "Details";
        const detailsList = document.createElement("ul");

        const addLi = (label, val) => {
            if (!val) return;
            const li = document.createElement("li");
            const lbl = document.createElement("span");
            lbl.className = "label";
            lbl.textContent = label;
            const value = document.createElement("strong");
            value.textContent = val;
            li.append(lbl, value);
            detailsList.append(li);
        };

        addLi("Age", char.age);
        addLi("Gender", char.gender);
        addLi("Blood Type", char.bloodType);
        addLi("Favorites", char.favourites);

        statsCard.append(statsTitle, detailsList);
        leftCol.append(img, statsCard);

        // Right Column: Title and About
        const rightCol = document.createElement("div");
        rightCol.className = "info-section";

        const titleGroup = document.createElement("div");
        const titleH1 = document.createElement("h1");
        titleH1.textContent = char.name.full;
        titleGroup.append(titleH1);

        if (char.name.alternative?.length) {
            const nicks = document.createElement("p");
            nicks.className = "nicknames";
            nicks.textContent = char.name.alternative.slice(0, 3).join(" • ");
            titleGroup.append(nicks);
        }

        const aboutCard = document.createElement("div");
        aboutCard.className = "info-card";
        const aboutTitle = document.createElement("h3");
        aboutTitle.textContent = "About";
        
        const descDiv = document.createElement("div");

        // Add FORBID_TAGS to dompurify to  remove all <a> tags, stupid links...s
        const cleanDesc = DOMPurify.sanitize(char.description || "No description available.", { 
            RETURN_DOM_FRAGMENT: true,
            FORBID_TAGS: ['a'] //  removes links
        });

descDiv.append(cleanDesc);

        aboutCard.append(aboutTitle, descDiv);
        rightCol.append(titleGroup, aboutCard);

        grid.append(leftCol, rightCol);
        body.append(grid);
        dialog.append(header, body);

        // Close on backdrop click
        dialog.onclick = (e) => { if (e.target === dialog) dialog.close(); };

        this.shadowRoot.replaceChildren(style, dialog);
    }
}

customElements.define("character-modal", CharacterModal);
