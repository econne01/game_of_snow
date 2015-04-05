// Game structure largely copied from Mary Rose Cook
// https://github.com/maryrosecook/annotated-code/tree/master/space-invaders
var Game = function (canvas) {
  var self = this;

  // Get the drawing context.  This contains functions that let you draw to the canvas.
  var screen = canvas.getContext('2d');
  this.inProgress = true;

  this.keyboarder = new Keyboarder();
  this.tickCount = 0;

  // Note down the dimensions of the canvas.  These are used to
  // place game bodies.
  this.screenSize = { x: screen.canvas.width, y: screen.canvas.height };
  this.size = { x: 800, y: canvas.height };
  this.scrollBuffer = 120;
  this.location = { x: this.size.x - this.screenSize.x,
                    y: this.size.y };

  // Create the bodies array to hold the player, enemies, etc.
  this.bodies = [];

  // Add the main characters to the game.
  this.createPlayer({x: 700, y: 270});
  var paceRange = { left: 250, right: 350 };
  this.createEnemy({x: 300, y: 270}, paceRange);
  paceRange = { left: 500, right: 650 };
  this.createEnemy({x: 600, y: 270}, paceRange);

  // Main game tick function.  Loops forever, running 60ish times a second.
  var tick = function() {
    if (!self.inProgress) {
      console.log('Game Over!');
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
};

Game.prototype = {

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

  // **createEnemy()** creates an enemy character and adds to game
  createEnemy: function(location, paceRange) {
    var enemy = new Enemy(this, location, paceRange);
    this.addBody(enemy);
  },

  // **createPlayer()** creates the main hero and adds to game
  createPlayer: function(location) {
    var player = new Player(this, location);
    this.addBody(player);
  },

  // **gameOver()** ends the game. You lose!
  gameOver: function() {
    this.inProgress = false;
  }
};

window.onload = function () {
  // In index.html, there is a canvas tag that the game will be drawn in.
  // Grab that canvas out of the DOM.
  var canvas = document.getElementById("game_canvas");
  new Game(canvas);
};
