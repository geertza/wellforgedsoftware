class TodoComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.storageKey = this.getStorageKey();
        this.shadowRoot.appendChild(this.buildStyles());
        this.shadowRoot.appendChild(this.buildTemplate());
        this.itemTemplate = this.buildItemTemplate();
        this.input = this.shadowRoot.querySelector('#taskInput');
        this.list = this.shadowRoot.querySelector('#taskList');
        this.addButton = this.shadowRoot.querySelector('#addButton');
        this.bindEvents();
    }

    connectedCallback() {
        if (!document.getElementById("dancing-font")) {
        const link = document.createElement("link");
        link.id = "dancing-font";
        link.rel = "stylesheet";
        link.href =
          "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&display=swap";
        document.head.appendChild(link);
    }
        this.loadTasks();
        this.initSortable();
    }
    // sortable.js loader and initializer
    initSortable() {
        if (this.sortable) {
            return;
        }

        if (!window.Sortable) {
            if (!this.sortableLoading) {
                this.sortableLoading = true;
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js';
                script.onload = () => this.initSortable();
                script.onerror = () => console.warn('Failed to load Sortable.js');
                document.head.appendChild(script);
            }
            return;
        }

        this.sortable = Sortable.create(this.list, {
            animation: 150,
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            dragClass: 'sortable-drag',
            draggable: 'li',
            fallbackOnBody: true,
            onEnd: () => this.saveTasks(),
        });
    }
    // localStorage  
    getStorageKey() {
        const attr = this.getAttribute('storage');
        return attr ? `${attr}.tasks` : 'todo-component.tasks';
    }

    buildStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');

            :host {
                display: block;
                max-width: 650px;
                margin: auto;
            }

            .card-container {
                width: 100%;
                max-width: 100%;
                background-color: #fff1b1;
                padding: 2rem;
                min-height: 250px;
                box-shadow: 8px 8px 15px rgba(0,0,0,0.1);
                transform: rotate(-1.5deg);
                border-radius: 16px;
            }

            .grocery-title {
                text-align: center;
                margin: 0 0 0.5rem 4px;
                font-size: 2.4rem;
                color: #1b2b93;
                text-shadow: 1px 1px 0 rgba(255,255,255,0.6);
                font-family: 'Dancing Script', cursive, sans-serif;
                text-decoration: underline 2px double;
                text-underline-offset: 3px; 
            }

            #taskList {
                padding: 0;
                margin: 0;
                width: 100%;
                min-height: 50px;
            }

            .list-group-item {
                background: transparent;
                border: none;
                border-bottom: 1px solid rgba(0,0,0,0.05);
                font-size: 0.8rem;
                color: midnightblue;
                padding: 0.5rem 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: grab;
            }

            .list-group-item:active {
                cursor: grabbing;
            }

            .sortable-ghost {
                opacity: 0.85;
                background: rgba(255,255,255,0.95);
                box-shadow: 0 14px 30px rgba(0,0,0,0.12);
            }

            .sortable-chosen {
                opacity: 0.7;
            }

            .task-text {
                cursor: grab;
                touch-action: none;
                -webkit-user-drag: none;
                user-select: none;
                font-size: 2rem;
                line-height: 1.2;
                color: #264692;
                padding-left: 2px;
                margin: 0 0.5rem;
                text-align: left;
                font-family: 'Dancing Script', cursive, sans-serif;
                text-shadow:
                    0 1px 0 rgba(255,255,255,0.35);
                letter-spacing: 0.2px;
            }
            .task-text:active {
                cursor: grabbing;
            }

            .done-text {
                text-decoration: line-through;
                opacity: 0.3;
            }

            .urgent-item {
                position: relative;
                background: transparent;
                border-radius: 14px;
                border: 3px solid rgba(255, 80, 80, 0.85);

                /* neon glow layers */
                box-shadow:
                    0 0 4px rgba(255, 80, 80, 0.9),
                    0 0 10px rgba(255, 60, 60, 0.85),
                    0 0 22px rgba(255, 40, 40, 0.65),
                    0 0 45px rgba(255, 0, 0, 0.35),
                    inset 0 0 12px rgba(255, 60, 60, 0.25);

                transform: translateY(-1px);
                animation: urgentNeonPulse 1s ease-in-out infinite alternate;
            }

            .urgent-item .task-text {
                color: #0e0e0e;

            }


            @keyframes urgentNeonPulse {
                0% {
                    box-shadow:
                        0 0 4px rgb(212, 229, 119),
                        0 0 12px rgba(217, 244, 15, 0.25),
                        0 0 30px rgba(255,0,0,0.25);
                }

                100% {
                    box-shadow:
                        0 0 6px rgba(255,100,100,1),
                        0 0 18px rgba(255,0,0,0.85),
                        0 0 48px rgba(241, 50, 50, 0.98);
                }
            }



            .btn-group {
                display: flex;
                gap: 10px;
                align-items: center;
                flex: 0 0 auto;
            }

            .btn {
                border: 1px solid rgba(0,0,0,0.06);
                padding: 6px 8px;
                border-radius: 8px;
                font-size: 0.9rem;
                height: 32px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 6px rgba(13, 32, 63, 0.06);
                transition: transform .08s ease, box-shadow .12s ease, opacity .12s ease;
                line-height: 1;
                background: rgba(255,255,255,0.9);
                color: #2b3340;
                cursor: pointer;
            }

            .btn:hover {
                transform: translateY(-8px);
                transform: scale(1.8);
                box-shadow: 0 8px 18px rgba(13, 32, 63, 0.09);
                
            }


            .btn-outline-warning {
                background: linear-gradient(180deg,red,#fff0a8);
                color: #191918;
            }

            .btn-outline-success {
                background: linear-gradient(180deg,#e9fff3,#c7f7de);
                color: #065f46;
                border-color: rgba(0,0,0,0.04);
            }

            .move-up,
                .move-down {
                all: unset;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                justify-content: center;

                width: 28px;
                height: 28px;

                color: #0d91f0;
                opacity: 0.55;
                transition: all 0.15s ease;
                }

                .move-up:hover,
                .move-down:hover {
                opacity: 1;
                background: rgba(74,111,220,0.12);
                border-radius: 6px;
                }

                .move-up:active,
                .move-down:active {
                transform: scale(0.9);
                }

                .move-up svg,
                    .move-down svg {
                    width: 1.8rem;
                    height: 1.8rem;

                    stroke: currentColor;
                    stroke-width: 2.5;
                    fill: none;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                }
            .btn-danger {
                background: #d61d1dc3;
                color: #fff;
                border: none;
                width: 34px;
                height: 34px;
                padding: 0;
                border-radius: 50%;
            }

            .task-entry {
                display: flex;
                gap: 8px;
                margin-top: 0.75rem;
            }

            .task-input {
                flex: 1;
                padding: 8px 10px;
                font-size: 1rem;
                border-radius: 6px;
                border: 1px solid rgba(0,0,0,0.12);
            }

            .add-btn {
                padding: 8px 12px;
                border-radius: 6px;
                background: #56a3f6;
                color: #fff;
                border: none;
                cursor: pointer;
            }

            .add-btn:active {
                transform: translateY(1px);
            }

            .fadeIn {
                animation: fadeIn 0.4s ease forwards;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateX(-5px); }
                to { opacity: 1; transform: translateX(0); }
            }

            @media (max-width: 576px) {
                .card-container {
                    padding: 1.25rem;
                }

                .list-group-item {
                    font-size: 1rem;
                }

                .btn {
                    height: 28px;
                    font-size: 0.8rem;
                    padding: 4px 6px;
                }
            }
        `;
        return style;
    }

    buildFragment(html) {
        return document.createRange().createContextualFragment(html);
    }

    buildTemplate() {
        const fragment = this.buildFragment(`
            <div class="card-container">
                <h3 class="grocery-title">Grocery List</h3>
                <ul id="taskList"></ul>
                <div class="task-entry">
                    <input type="text" id="taskInput" class="task-input" placeholder="Add a new task...">
                    <button id="addButton" type="button" class="add-btn">Add Task</button>
                </div>
            </div>
        `);
        return fragment.firstElementChild;
    }

    buildItemTemplate() {
        const template = document.createElement('template');
        const fragment = this.buildFragment(`
            <li class="list-group-item">
                <div class="btn-group">
                    <button type="button" class="btn move-down">
                    <svg viewBox="0 0 24 24">
                        <polyline points="6 10 12 16 18 10"/>
                    </svg></button>
                </div>
                <span class="task-text fadeIn"></span>
                <div class="btn-group">
                    <button type="button" class="btn btn-outline-warning urgent">Urgent</button>
                    <button type="button" class="btn btn-outline-success done">Done</button>
                    <button type="button" class="btn btn-danger remove-btn">✕</button>
                    <button type="button" class="btn move-up">
                    <svg viewBox="0 0 24 24">
                        <polyline points="6 14 12 8 18 14"/>
                    </svg>
                    </button>
                </div>
            </li>
        `);
        template.content.appendChild(fragment);
        return template;
    }

    bindEvents() {
        this.addButton.addEventListener('click', () => this.addTask());
        this.input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.addTask();
            }
        });

        this.list.addEventListener('click', (event) => {
            const target = event.target.closest('button, .urgent, .done, .remove-btn');
            if (!target || !this.list.contains(target)) {
                return;
            }

            if (target.classList.contains('move-up')) {
                this.moveListItem(target, -1);
            } else if (target.classList.contains('move-down')) {
                this.moveListItem(target, 1);
            } else if (target.classList.contains('urgent')) {
                const li = target.closest('li');
                if (li) {
                    li.classList.toggle('urgent-item');
                    this.saveTasks();
                }
            } else if (target.classList.contains('done')) {
                const li = target.closest('li');
                if (li) {
                    const text = li.querySelector('.task-text');
                    if (text) {
                        text.classList.toggle('done-text');
                        this.saveTasks();
                    }
                }
            } else if (target.classList.contains('remove-btn')) {
                this.removeTask(target);
            }
        });
    }

    makeId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    }

    saveTasks() {
        const items = Array.from(this.list.children).map((li) => {
            const text = li.querySelector('.task-text').textContent;
            return {
                id: li.dataset.id,
                text,
                urgent: li.classList.contains('urgent-item'),
                done: li.querySelector('.task-text').classList.contains('done-text'),
            };
        });
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(items));
        } catch (error) {
            console.warn('Failed to save tasks', error);
        }
    }

    loadTasks() {
        const raw = localStorage.getItem(this.storageKey);
        if (!raw) {
            return;
        }
        try {
            const items = JSON.parse(raw);
            items.forEach((item) => this.renderTask(item));
        } catch (error) {
            console.warn('Failed to load tasks', error);
        }
    }

    addTask() {
        let value = this.input.value.trim();
        if (!value) return;

        const lower = value.toLowerCase();

        // 🔥 check for cheese or velveeta
        if (lower.includes("cheese") || lower.includes("velveeta")) {
            value = "Fritos Jalapeño Cheddar Cheese Dip";
        }

        this.renderTask({
            id: this.makeId(),
            text: value,
            urgent: false,
            done: false
        });

        this.saveTasks();
        this.input.value = '';
        this.input.focus();
    }
    renderTask(item) {
        if (!item || !item.text) {
            return;
        }

        const clone = this.itemTemplate.content.cloneNode(true);
        const li = clone.querySelector('li');
        if (!li) {
            return;
        }

        li.dataset.id = item.id || this.makeId();
        if (item.urgent) {
            li.classList.add('urgent-item');
        }

        const span = li.querySelector('.task-text');
        if (span) {
            span.textContent = item.text;
            if (item.done) {
                span.classList.add('done-text');
            }
        }

        this.list.appendChild(li);
    }

    moveListItem(button, direction) {
        const li = button.closest('li');
        if (!li) {
            return;
        }
        if (direction === -1 && li.previousElementSibling) {
            this.list.insertBefore(li, li.previousElementSibling);
        } else if (direction === 1 && li.nextElementSibling) {
            this.list.insertBefore(li.nextElementSibling, li);
        }
        this.saveTasks();
    }

    removeTask(button) {
        const li = button.closest('li');
        if (!li) {
            return;
        }
        li.remove();
        this.saveTasks();
    }
}

window.customElements.define('todo-component-andyg', TodoComponent);
