class PlayingCard {
  constructor(rank, suit) {
    this.rank = rank; 
    this.suit = suit; 
    this.renderImage = this.getRankImageHtml();
    // Suit configuration
    const config = {
      hearts:   { symbol: '&hearts;', color: 'text-danger' },
      diamonds: { symbol: '&diams;',  color: 'text-danger' },
      spades:   { symbol: '&spades;', color: 'text-dark'   },
      clubs:    { symbol: '&clubs;',  color: 'text-dark'   }
    };
    
    this.symbol = config[suit].symbol;
    this.colorClass = config[suit].color;
  }
  
  getRankImageSrc() {
    switch(this.rank) {
      case 'A': return "./images/ace.png";
      case 'J': return './images/jack.png';
      case 'Q': return './images/queen.png'; 
      case 'K': return './images/king.png';
      default: return null; // Numbers not images, will use text instead
    }
  }
   getRankImageHtml() {
    const getImage = this.getRankImageSrc();
    if (getImage !== null) {
        return `<img src="${getImage}" alt="${this.rank} of ${this.suit} playing card" class="rank-image img-fluid">`;
    } else {
        return `<span class="card-suit-main display-1">${this.rank}</span>`;
    }
  }

  // ----------------------card render-------------_________________
  render() {
    return `
          <div class="card playing-card shadow-sm ${this.colorClass}">
            <div class="card-body playing-body d-flex flex-column p-2">
                <div class="top-left d-flex flex-column align-items-start">
                    <span class="rank fw-bold h4 mb-0">${this.rank}</span>
                    <span class="suit fs-5" >${this.symbol}</span>
                </div>
                <div class="center-icon d-flex justify-content-center align-items-center flex-grow-1">
                    ${this.renderImage}
                </div>
                <div class="bottom-right d-flex flex-column align-items-end mt-auto" style="transform: rotate(180deg);">
                    <span class="rank fw-bold h4 mb-0">${this.rank}</span>
                    <span class="suit fs-5">${this.symbol}</span>
                </div>
            </div>
        </div>`;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    suits.forEach(suit => {
      ranks.forEach(rank => {
        this.cards.push(new PlayingCard(rank, suit));
      });
    });
  }

  shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }

  renderDeck(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = this.cards.map(card => card.render()).join('');
  }

  deal() {
    return this.cards.pop();
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.hand = []; 
  }
}

class Game {
  constructor(playerNames) {
    this.playerNames = playerNames;
    this.deck = new Deck(); 
    this.deck.shuffle();
    this.players = playerNames.map(name => new Player(name));
    
    this.startDeal();
    this.renderGame('game-container');
  }

  startDeal() {
    const cardsToDeal = 5;
    const totalNeeded = this.players.length * cardsToDeal;

    // Check if the current deck has enough cards left
    if (this.deck.cards.length < totalNeeded) {
      this.handleGameOver();
      return false; 
    }

    // Clear old hands and deal from the existing deck
    this.players.forEach(player => player.hand = []);
    
    for (let i = 0; i < cardsToDeal; i++) {
      this.players.forEach(player => {
        const card = this.deck.deal();
        if (card) player.hand.push(card);
      });
    }
    return true;
  }

  redeal() {
    if (this.startDeal()) {
      this.renderGame('game-container');
    }
  }

  handleGameOver() {
  const choice = window.confirm(
    "Game Over! The deck is empty.\n\n" +
    "Would you like to reshuffle and continue?"
  );

  if (choice) {
      // User clicked 'OK'
      this.resetWithNewDeck();; // Replace with your reshuffle function
  } else {
      // User clicked 'Cancel'
      this.fullReset();; // Replace with your reset function
  }

}
  resetWithNewDeck() {
  // Keep players, reset deck
  this.deck = new Deck();
  this.deck.shuffle();

  this.players.forEach(player => player.hand = []);

  this.startDeal();
  this.renderGame('game-container');
}

fullReset() {
  // Go back to setup screen
  document.getElementById('game-setup').style.display = 'block';
  document.getElementById('game-container').innerHTML = '';

  new StartGame();
}

  renderGame(containerId) {
    const container = document.getElementById(containerId);
    
    const playersHtml = this.players.map(player => `
      <div class="player-section mb-4">
        <h2 class="player-name">${player.name}'s Hand</h2>
        <div class="d-flex flex-wrap gap-2">
          ${player.hand.map(card => card.render()).join('')}
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="controls mb-4 text-center">
        <p class="text-muted">Cards left in deck: ${this.deck.cards.length}</p>
        <button id="redeal-btn" class="btn btn-primary btn-lg">Redeal</button>
      </div>
      ${playersHtml}
    `;

    document.getElementById('redeal-btn').addEventListener('click', () => this.redeal());
  }
}

class StartGame {
  constructor() {
    this.playerNames = [];
    this.init();
  }

  init() {
    const countInput = document.getElementById('player-count');
    const container = document.getElementById('player-names-container');
    const startBtn = document.getElementById('start-game-btn');

    // Update name fields whenever the player count changes
    const updateNameFields = () => {
        const count = Math.min(Math.max(parseInt(countInput.value) || 1, 1), 4);
        container.innerHTML = ''; // Clear existing fields

        for (let i = 1; i <= count; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Player ${i} Name`;
            input.className = 'player-name-input';
            container.appendChild(input);
        }
    };

    // Initial run and event listener
    updateNameFields();
    countInput.addEventListener('input', updateNameFields);

    // Handle game start
    startBtn.addEventListener('click', () => {
        const inputs = document.querySelectorAll('.player-name-input');
        this.playerNames = Array.from(inputs).map((input, i) => 
            input.value.trim() || `Player ${i + 1}`
        );

        // Hide setup and start game
        document.getElementById('game-setup').style.display = 'none';
        new Game(this.playerNames);
    });
}

}

// Trigger the start
new StartGame();
