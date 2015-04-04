var GameBody = function(game) {
  this.game = game;
  this.size = { x: 15, y: 15 };
  // Center denotes the location on game board of the center of body
  this.center = { x: game.size.x / 2, y: game.size.y - this.size.y * 2 };

  // set keyboard object to track button presses.
  this.keyboarder = this.game.keyboarder;
};

GameBody.prototype = {

  update: function() {
    // Should be implemented by sub-classes
  },

  draw: function(screen) {
    screen.fillRect(this.center.x - this.size.x / 2,
                    this.center.y - this.size.y / 2,
                    this.size.x, this.size.y);
  }
};
