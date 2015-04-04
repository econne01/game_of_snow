// Game structure largely copied from Mary Rose Cook
// https://github.com/maryrosecook/annotated-code/tree/master/space-invaders
var Game = function (canvas) {
  var self = this;

  // Get the drawing context.  This contains functions that let you draw to the canvas.
  var screen = canvas.getContext('2d');

  // Note down the dimensions of the canvas.  These are used to
  // place game bodies.
  this.size = { x: canvas.width, y: canvas.height };

  // Create the bodies array to hold the player, enemies, etc.
  this.bodies = [];

  this.keyboarder = new Keyboarder();

  // Main game tick function.  Loops forever, running 60ish times a second.
  var tick = function() {
    // Update game state.
    self.update();

    // Draw game bodies.
    self.draw(screen, self.size);

    // Queue up the next call to tick with the browser.
    requestAnimationFrame(tick);
  };

  // Add the main character to the bodies array.
  this.createPlayer();
  // Run the first game tick.  All future calls will be scheduled by
  // the tick() function itself.
  tick();
};

Game.prototype = {

  // **update()** runs the main game logic.
  update: function() {
    var self = this;

    // Call update on every body.
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].update();
    }
  },

  // **draw()** draws the game.
  draw: function(screen) {
    // Clear away the drawing from the previous tick.
    screen.clearRect(0, 0, this.size.x, this.size.y);

    // Draw each body as a rectangle.
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].draw(screen);
    }
  },

  // **addBody()** adds a body to the bodies array.
  addBody: function(body) {
    this.bodies.push(body);
  },

  // **createPlayer()** creates the main hero and adds to game
  createPlayer: function() {
    var player = new Player(this);
    this.addBody(player);
  }
};

window.onload = function () {
  // In index.html, there is a canvas tag that the game will be drawn in.
  // Grab that canvas out of the DOM.
  var canvas = document.getElementById("game_canvas");
  new Game(canvas);
};
