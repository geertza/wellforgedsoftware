class Crabs {
    constructor(boardId, diceId) {
        this.board = document.getElementById(boardId);
        this.diceContainerId = diceId;
        if (!this.board) return;

        this.wallet = 50;
        this.pointMaster = 0;
        this.currentBet = 0;
        this.isPointPhase = false;

        this.roller = new DiceRoller(diceId, 2);
        this.hideInternalDiceButton();
        this.render();
    }

    hideInternalDiceButton() {
        const style = document.createElement('style');
        style.textContent = `#${this.diceContainerId} .roll-btn { display: none !important; }`;
        document.head.appendChild(style);
    }

    render() {
        if (!this.board) return;

        this.board.innerHTML = `
            <div class="card h-100 shadow-lg border-0 overflow-hidden" style="border-radius: 1.5rem;">
                <div class="card-header bg-dark text-warning d-flex justify-content-between align-items-center py-3">
                    <h4 class="mb-0 fw-bold">CASINO CRAPS</h4>
                    <div class="badge bg-success fs-6 px-3 py-2 border border-light border-opacity-25 rounded-pill">
                        💰 Wallet: $${this.wallet}
                    </div>
                    <div class="badge bg-success fs-6 px-3 py-2 border border-light border-opacity-25 rounded-pill">
                        point: $${this.pointMaster}
                    </div>
                </div>
                
                <div class="card-body bg-success text-white text-center d-flex flex-column justify-content-center p-4">
                    <div class="bg-dark bg-opacity-25 rounded-4 p-4 mb-4 border border-light border-opacity-10 shadow-inner">
                        <p id="game-text" class="fs-5 mb-0" style="min-height: 3em;">${this.getDialogue()}</p>
                    </div>

                    <div id="controls" class="d-flex justify-content-center align-items-center">
                        ${this.renderControls()}
                    </div>
                </div>
            </div>`;
        
        this.attachListeners();
    }

    getDialogue() {
        if (this.wallet <= 0) return "Sorry, you've run out of money. Thanks for playing!";
        if (this.isPointPhase) return `Point at <span class="fw-bold text-warning">${this.pointMaster}</span>. Match your point!`;
        return `Available funds: <span class="fw-bold text-light">$${this.wallet}</span>. Enter your bet amount.`;
    }

    renderControls() {
        if (this.wallet <= 0) return `<button class="btn btn-warning btn-lg fw-bold px-5 py-3 shadow" onclick="location.reload()">NEW GAME</button>`;
        
        if (this.isPointPhase) {
            return `<button id="turnBtn" class="btn btn-warning btn-lg w-100 fw-bold py-3 shadow text-uppercase">🎲 Roll to Match Point</button>`;
        } else {
            return `
                <div class="input-group input-group-lg shadow" style="max-width: 400px;">
                    <span class="input-group-text bg-white border-0 fw-bold">$</span>
                    <input type="number" id="betInput" class="form-control border-0 fw-bold" value="10" min="1" max="${this.wallet}">
                    <button id="turnBtn" class="btn btn-warning fw-bold px-4">PLACE BET & ROLL</button>
                </div>`;
        }
    }

    attachListeners() {
        const btn = this.board.querySelector('#turnBtn');
        if (btn) btn.onclick = () => this.handleTurn();
    }

    async handleTurn() {
        const text = document.getElementById('game-text');
        
        if (!this.isPointPhase) {
            const input = document.getElementById('betInput');
            this.currentBet = parseInt(input.value);
            if (isNaN(this.currentBet) || this.currentBet <= 0 || this.currentBet > this.wallet) {
                text.innerHTML = `<span class="text-danger fw-bold">Please enter a valid bet.</span>`;
                return;
            }
        }

        const total = await this.roller.roll();

        if (!this.isPointPhase) {
            if (total === 7 || total === 11) {
                this.wallet += this.currentBet;
                this.resetPhase(`<span class="text-warning fw-bold">Winner!</span> Rolled ${total}. Won $${this.currentBet}`);
            } else if (total === 2 || total === 3 || total === 12) {
                this.wallet -= this.currentBet;
                this.resetPhase(`<span class="text-danger fw-bold">Craps!</span> Rolled ${total}. Lost $${this.currentBet}`);
            } else {
                this.pointMaster = total;
                this.isPointPhase = true;
                this.render();
            }
        } else {
            if (total === 7) {
                this.wallet -= this.currentBet;
                this.resetPhase(`<span class="text-danger fw-bold">Seven Out!</span> Lost $${this.currentBet}`);
            } else if (total === this.pointMaster) {
                this.wallet += this.currentBet;
                this.resetPhase(`<span class="text-warning fw-bold">Point Matched!</span> Won $${this.currentBet}`);
            } else {
                text.innerHTML = `Rolled <span class="fw-bold text-light">${total}</span>. Match your point <span class="fw-bold text-warning">${this.pointMaster}</span>!`;
            }
        }
    }

    resetPhase(msg) {
        this.isPointPhase = false;
        this.pointMaster = 0;
        this.render();
        document.getElementById('game-text').innerHTML = msg;
    }
}

window.startCrabs = () => {
    document.getElementById('crabs-container').innerHTML = "";
    document.getElementById('dice-sidebar').innerHTML = "";
    new Crabs('crabs-container', 'dice-sidebar');
};
