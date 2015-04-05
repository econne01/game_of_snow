// Initialize character state and configurable variables
var Character = function(game, location) {
  GameObject.call(this, game, location);
  this.config = {
    moveSizeX: 2,
    jumpHeight: 50,
    jumpTime: 25 // in Game Ticks
  };
  this.state.jumping = false;
  this.state.jumpStart = 0;
  this.state.facingDirection = 'left';
};

Character.prototype = Object.create(GameObject.prototype);
Character.prototype.constructor = Character;

Character.prototype.update = function() {
  GameObject.prototype.update.call(this);
};

Character.prototype.moveLeft = function () {
  this.state.facingDirection = 'left';
  if (this.location.x - this.config.moveSizeX >= 0) {
    this.location.x -= this.config.moveSizeX;
  }
};

Character.prototype.moveRight = function () {
  this.state.facingDirection = 'right';
  if (this.location.x + this.size.x + this.config.moveSizeX < this.game.size.x) {
    this.location.x += this.config.moveSizeX;
  }
};

Character.prototype.updateJump = function () {
  // Use physics to calculate velocity, acceleration
  // d = vt + 0.5at^2
  var initialVelocity = (4 * this.config.jumpHeight) / (this.config.jumpTime);
  var gravity = -2 * initialVelocity / this.config.jumpTime;
  var velocity = initialVelocity + (gravity * (this.game.tickCount - this.state.jumpStart));
  if (this.state.jumpStart + this.config.jumpTime < this.game.tickCount) {
    this.state.jumping = false;
    return;
  }
  this.location.y -= velocity;
};
