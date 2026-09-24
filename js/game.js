class Game {
    constructor(boardId, diceId) {
        this.board = document.getElementById(boardId);
        this.score = 0;
        this.roller = new DiceRoller(diceId, 2); // Always 2 dice for game
        this.render();
    }

    render() {
        this.board.innerHTML = `
            <div style="background:#fff; padding:20px; border-radius:15px; border:2px solid #333; height:100%; display:flex; flex-direction:column;">
                <h2 style="margin:0 0 20px 0; text-align:center;">Crabs Game</h2>
                <div style="font-size:20px; font-weight:bold; margin-bottom:20px; padding:15px; background:#f0f0f0; border-radius:10px; text-align:center;">Score: <span id="gameScore">0</span></div>
                <button id="turnBtn" style="padding:15px 30px; font-size:18px; cursor:pointer; margin-top:auto;">Roll for Points</button>
            </div>`;
        
        this.board.querySelector('#turnBtn').onclick = () => this.handleTurn();
    }

    async handleTurn() {
        const btn = this.board.querySelector('#turnBtn');
        btn.disabled = true;
        const points = await this.roller.roll();
        this.score += points;
        document.getElementById('gameScore').innerText = this.score;
        btn.disabled = false;
    }
}
