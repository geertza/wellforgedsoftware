class DiceSimulator {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.chartInstance = null;
    }

    render() {
        // Clear container and inject the UI structure
        this.container.innerHTML = `
            <div style="width: 100%; text-align: center; padding: 10px; box-sizing: border-box;">
                <div id="chart-controls" style="margin-bottom: 20px;">
                    <button id="btn-roll" onclick="currentModule.executeRoll()">Roll 1000 Times</button>
                    <div id="post-roll-options" style="display:none; gap: 10px; justify-content: center;">
                        <button onclick="currentModule.executeRoll()">Roll Again</button>
                        <button onclick="currentModule.exit()">Exit</button>
                    </div>
                </div>
                <div style="position: relative; height: 70vh; width: 100%;">
                    <canvas id="internalDiceCanvas"></canvas>
                </div>
            </div>
        `;
    }

    executeRoll() {
        const data = { 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0 };
        for (let i = 0; i < 1000; i++) {
            const roll = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
            data[roll] += 1;
        }
        this.updateUI(true);
        this.drawChart(data);
    }

    drawChart(data) {
        // Target the internal canvas we just created in render()
        const ctx = document.getElementById('internalDiceCanvas').getContext('2d');
        
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        this.chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                datasets: [{
                    label: 'Dice Roll Results',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderWidth: 1
                }]
            },
            options: { 
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } } 
            }
        });
    }

    updateUI(isRolling) {
        document.getElementById('btn-roll').style.display = isRolling ? 'none' : 'inline-block';
        document.getElementById('post-roll-options').style.display = isRolling ? 'flex' : 'none';
    }

    exit() {
        if (this.chartInstance) this.chartInstance.destroy();
        this.container.innerHTML = ''; 
    }
}

// Global Loader
window.startDiceSimulator = () => {
    const mainDisplay = document.getElementById('myChart');
    if (mainDisplay) {
        mainDisplay.innerHTML = ""; // Clear the container
        window.currentModule = new DiceSimulator('myChart');
        window.currentModule.render();
    }
};
