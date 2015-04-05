var GameObject = function(game, location) {
  this.game = game;
  this.size = { x: 15, y: 15 };
  // Location denotes the location on game board of the bottom-left of body
  this.location = {
      x: location.x,
      y: location.y,
      z: location.z
  };
  this.state = {};

  // set keyboard object to track button presses.
  this.keyboarder = this.game.keyboarder;
};

GameObject.prototype = {

  update: function() {
    // Should be implemented by sub-classes
  },

  draw: function(screen) {
    screen.fillRect(this.location.x - this.game.location.x,
                    this.location.y - this.size.y,
                    this.size.x, this.size.y);
  },

  isColliding: function (otherObject) {
    if (this.location.x <= otherObject.location.x + otherObject.size.x &&
        this.location.x >= otherObject.location.x &&
        this.location.y - this.size.y <= otherObject.location.y &&
        this.location.y >= otherObject.location.y) {
      return true;
    }
    if (otherObject.location.x <= this.location.x + this.size.x &&
        otherObject.location.x >= this.location.x &&
        otherObject.location.y - otherObject.size.y <= this.location.y &&
        otherObject.location.y >= this.location.y) {
      return true;
    }
    return false;
  }
};
