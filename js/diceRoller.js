class DiceRoller {
    constructor(parentId, fixedCount = null) {
        this.parent = document.getElementById(parentId);
        this.faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        this.isRolling = false;
        this.fixedCount = fixedCount;
        
        this.injectStyles();
        this.render();
    }

    injectStyles() {
        if (document.getElementById('dice-styles')) return;
        const style = document.createElement('style');
        style.id = 'dice-styles';
        style.textContent = `
            .dice-box { background: #3c9b1d; padding: 25px; border-radius: 20px; color: white; text-align: center; transition: 0.3s; height:100%; display:flex; flex-direction:column; }
            .dice-box.standalone { width: 80%; margin: 0 auto; }
            /* 30vw if in game */
            .dice-box.game-mode { width: 100%; }
            .dice-grid { display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 15px; margin: 15px 0; }
            .die { 
                font-size: 100px;
                width: 100px;
                height: 100px;
                line-height: 100px;
                background-color: white; 
                color: black; 
                border-radius: 12px;     
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 2px 2px 5px rgba(0,0,0,0.2); 
            }
            .rolling { animation: shake 0.1s infinite; }
            @keyframes shake { 0%{transform:rotate(3deg)} 50%{transform:rotate(-3deg)} 100%{transform:rotate(3deg)} }
            .roll-btn { background: #ffcc00; border: none; padding: 12px 24px; font-weight: bold; border-radius: 5px; cursor: pointer; font-size: 16px; }
            .roll-btn:disabled { background: #666; cursor: not-allowed; }
        `;
        document.head.appendChild(style);
    }

    render() {
        const isStandalone = this.fixedCount === null;
        this.parent.innerHTML = `
            <div class="dice-box ${isStandalone ? 'standalone' : 'game-mode'}">
                ${isStandalone ? `<h2>Dice Utility</h2><select id="qty" style="margin-bottom:15px; padding:5px;">${[1,2,3,4,5,6].map(n=>`<option value="${n}">${n} Dice</option>`).join('')}</select>` : '<h3 style="margin-top:0;">Game Dice</h3>'}
                <div class="dice-grid"></div>
                <button class="roll-btn" style="display:${isStandalone ? 'block' : 'none'};">Roll Dice</button>
                <div style="margin-top:auto; padding-top:15px; border-top:1px solid #ccc; text-align:center; font-weight:bold;">Total: <span class="sum-val">0</span></div>
            </div>`;
        
        const btn = this.parent.querySelector('.roll-btn');
        const sel = this.parent.querySelector('#qty');
        if(sel) sel.onchange = () => this.draw(parseInt(sel.value));
        btn.onclick = () => this.roll();
        this.draw(this.fixedCount || 1);
    }

    draw(count) { this.parent.querySelector('.dice-grid').innerHTML = Array(count).fill('<div class="die">⚀</div>').join(''); }

    async roll() {
    if (this.isRolling) return;
    this.isRolling = true;

    const dice = this.parent.querySelectorAll('.die');
    const btn = this.parent.querySelector('.roll-btn');
    const sumDisplay = this.parent.querySelector('.sum-val');

    btn.disabled = true;
    sumDisplay.innerText = "..."; 
    
    // 1. Start the shaking CSS animation
    dice.forEach(d => d.classList.add('rolling'));

    // 2. Start the rapid face-changing (The "Value Flicker")
    const animationInterval = setInterval(() => {
        dice.forEach(d => {
            const randomFace = Math.floor(Math.random() * 6);
            d.innerHTML = this.faces[randomFace];
        });
    }, 50); // Changes every 50ms for a blur effect

    return new Promise(resolve => {
        setTimeout(() => {
            // 3. Stop the flickering
            clearInterval(animationInterval); 
            
            let finalSum = 0;
            dice.forEach(d => {
                const finalVal = Math.floor(Math.random() * 6);
                d.innerHTML = this.faces[finalVal];
                d.classList.remove('rolling'); // Stop the shake
                finalSum += (finalVal + 1);
            });

            // 4. Show final result
            sumDisplay.innerText = finalSum;
            this.isRolling = false;
            btn.disabled = false;
            
            resolve(finalSum);
        }, 800); // Total roll duration
    });
}

}
// Initialize Standalone Dice for the Dice Utility modal
document.addEventListener('DOMContentLoaded', () => {
    const standaloneDice = new DiceRoller('dice-sidebar', 2);
});

// Global scope bindings for the dynamic loader
window.startStandalone = () => {
    document.getElementById('crabs-container').innerHTML = "";
    const sidebar = document.getElementById('dice-sidebar');
    if (sidebar) {
        sidebar.innerHTML = "";
        new DiceRoller('dice-sidebar');
    }
};


