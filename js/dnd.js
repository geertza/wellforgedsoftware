let currentSum = 0;
const diceIcons = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

document.getElementById('rollBtn').addEventListener('click', async function() {
    const diceDisplay = document.getElementById('diceDisplay');
    const assignArea = document.getElementById('assignArea');
    this.disabled = true;
    assignArea.classList.add('d-none');
    
    // 1. Shake animation
    diceDisplay.innerHTML = `<div class="die rolling">?</div>`.repeat(4);
    const dice = document.querySelectorAll('.die');

    // 2. Flicker effect
    let flicker = setInterval(() => {
        dice.forEach(d => d.innerText = diceIcons[Math.floor(Math.random() * 6)]);
    }, 80);

    // 3. Final calculation
    setTimeout(() => {
        clearInterval(flicker);
        let results = Array.from({length: 4}, () => Math.floor(Math.random() * 6) + 1);
        let lowest = Math.min(...results);
        let lowestIdx = results.indexOf(lowest);
        currentSum = results.reduce((a, b) => a + b, 0) - lowest;

        diceDisplay.innerHTML = "";
        results.forEach((val, i) => {
            const dieDiv = document.createElement('div');
            dieDiv.className = `die ${i === lowestIdx ? 'dropped' : ''}`;
            dieDiv.innerText = diceIcons[val - 1];
            diceDisplay.appendChild(dieDiv);
        });

        document.getElementById('currentSumText').innerText = currentSum;
        assignArea.classList.remove('d-none');
        this.disabled = false;
    }, 800);
});

// Assignment logic using delegation
document.getElementById('buttonGroup').addEventListener('click', (e) => {
    if (e.target.classList.contains('assign-btn')) {
        const stat = e.target.getAttribute('data-stat');
        const input = document.getElementById(stat);
        
        input.value = currentSum;
        input.classList.add('filled');
        e.target.disabled = true;
        
        document.getElementById('assignArea').classList.add('d-none');
        document.getElementById('diceDisplay').innerHTML = `<div class="die">?</div>`.repeat(4);
        checkFinish();
    }
});

function checkFinish() {
    const name = document.getElementById('charName').value.trim();
    const filledCount = document.querySelectorAll('.stat-input.filled').length;
    if (name !== "" && filledCount === 6) {
        document.getElementById('finishArea').classList.remove('d-none');
        document.getElementById('rollBtn').classList.add('d-none');
    }
}
document.getElementById('submitBtn').addEventListener('click', function() {
    const input = document.getElementById('userInput').value;
    const resultDiv = document.getElementById('result');
    
    let arr = input.split(',').map(item => Number(item.trim()));

    if (arr.length === 0 || arr.some(isNaN)) {
        resultDiv.className = "p-3 bg-danger-subtle text-danger border border-danger rounded text-center";
        resultDiv.innerText = "Please enter valid numbers.";
        resultDiv.classList.remove('d-none');
        return;
    }

    const minVal = Math.min(...arr);
    const index = arr.indexOf(minVal);
    
    if (index > -1) {
        arr.splice(index, 1);
    }

    resultDiv.className = "p-3 bg-success-subtle text-success border border-success rounded text-center fw-bold";
    resultDiv.innerText = "Result: " + arr.join(', ');
    resultDiv.classList.remove('d-none');
});