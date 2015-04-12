// Game structure largely copied from Mary Rose Cook
// https://github.com/maryrosecook/annotated-code/tree/master/space-invaders
var Game = function (screen) {
  this.keyboarder = new Keyboarder();
  this.tickCount = 0;

  // Note down the dimensions of the canvas.  These are used to
  // place game bodies.
  this.screenSize = { x: screen.canvas.width, y: screen.canvas.height };
  this.size = { x: 800, y: screen.canvas.height };
  this.scrollBuffer = 120;

  this.inProgress = true;
};

Game.prototype.startGame =

Game.prototype = {

  // **startGame()** initializes the level and starts game
  startGame: function(screen) {
    var self = this;
    var WHITE = '#FFFFFF';
    var OFF_WHITE = '#DFDFDF';
    this.inProgress = true;

    this.location = { x: this.size.x - this.screenSize.x,
                      y: this.size.y };

    // Create the bodies array to hold the player, enemies, etc.
    this.bodies = [];

    // Add scenery objects
    this.addBody(new Ground(this, { x: 0, y: 300 }));
    // this.addBody(new SnowMound(this, { x: 500, y: 200 }, 50, 150, WHITE));
    this.addBody(new Wall(this, { x: 660, y: 300 }));
    this.addBody(new Weirwood(this, { x: 425, y: 260 }));

    // Add the main characters to the game.
    this.player = new Player(this, {x: 700, y: 270});
    this.addBody(this.player);
    this.addBody(new Ghost(this, {x: 50, y: 270}));

    // Add the White Walkers
    var paceRange = { left: 250, right: 350 };
    this.addBody(new Enemy(this, {x: 300, y: 270}, paceRange));
    paceRange = { left: 500, right: 650 };
    this.addBody(new Enemy(this, {x: 600, y: 270}, paceRange));
    paceRange = { left: 410, right: 470 };
    this.addBody(new Enemy(this, {x: 450, y: 270}, paceRange));

    // Main game tick function.  Loops forever, running 60ish times a second.
    var tick = function() {
      if (!self.inProgress) {
        return;
      }
      self.tickCount += 1;

      // Update game state.
      self.update();

      // Draw game bodies.
      self.draw(screen, self.size);

      // Queue up the next call to tick with the browser.
      requestAnimationFrame(tick);
    };

    // Run the first game tick.  All future calls will be scheduled by
    // the tick() function itself.
    tick();
  },

  // **update()** runs the main game logic.
  update: function() {
    // Call update on every body.
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].update();
    }
  },

  // **draw()** draws the game.
  draw: function(screen) {
    // Clear away the drawing from the previous tick.
    screen.clearRect(0, 0, this.screenSize.x, this.screenSize.y);

    // Draw each body as a rectangle.
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].draw(screen);
    }
  },

  // **scroll()** pans the screen across the game board to left or right
  scroll: function (dimension, amount) {
    this.location[dimension] += amount;
  },

  // **addBody()** adds a body to the bodies array.
  addBody: function(body) {
    this.bodies.push(body);
  },

  // **gameOver()** ends the game. You lose!
  gameOver: function() {
    this.inProgress = false;
    restartButton.classList.remove('hidden');
    gameStatusElem.innerText = 'Game Over!';
    gameStatusElem.classList.remove('hidden');
  },

  // **win()** ends the game. You win!
  win: function() {
    this.inProgress = false;
    restartButton.classList.remove('hidden');
    gameStatusElem.innerText = 'You Win!';
    gameStatusElem.classList.remove('hidden');
  }
};

var restartButton = document.getElementById("restart_button");
var gameStatusElem = document.getElementById("game_status");

window.onload = function () {
  // In index.html, there is a canvas tag that the game will be drawn in.
  // Grab that canvas out of the DOM.
  var canvas = document.getElementById("game_canvas");
  var screen = canvas.getContext('2d');

  var game = new Game(screen);
  game.startGame(screen);

  restartButton.onclick = function () {
    game.startGame(screen);
    restartButton.classList.add('hidden');
    gameStatusElem.classList.add('hidden');
  }
};
