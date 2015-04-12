var ARC = {
  TOP: 1.5 * Math.PI,
  BOTTOM: 0.5 * Math.PI,
  LEFT: 0.0 * Math.PI,
  RIGHT: 1.0 * Math.PI,
  START: 0.0 * Math.PI,
  END: 2.0 * Math.PI
};

// Initialize character state and configurable variables
var Character = function(game, location) {
  GameObject.call(this, game, location);
  this.config = {
    moveSizeX: 2,
    jumpHeight: 60,
    jumpTime: 25 // in Game Ticks
  };
  this.size = { x: 20, y: 30 };
  this.state.health = 1;
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
  if (!this.state.jumpStart ||
      this.game.tickCount < this.state.jumpStart) {
    // Jump hasn't started yet
    return;
  } else if (this.game.tickCount > this.state.jumpStart + this.config.jumpTime) {
    // End of the jump
    this.state.jumpStart = 0;
    return;
  }
  // Use physics to calculate velocity, acceleration
  // d = vt + 0.5at^2
  var initialVelocity = (4 * this.config.jumpHeight) / (this.config.jumpTime);
  var gravity = -2 * initialVelocity / this.config.jumpTime;
  var velocity = initialVelocity + (gravity * (this.game.tickCount - this.state.jumpStart));
  this.location.y -= velocity;
};

/**
 * @param screen - the canvas context to draw in
 * @param locationX - the leftmost pixel index to start drawing head (on the canvas screen)
 * @param bodyWidthPct - decimal in [0, 1]. How wide is body compared to Character width
 * @param bodyHeightPct - decimal in [0, 1]. How wide is body compared to Character height
 * @param color - String. Hex color code (eg '#FF0000')
 */
Character.prototype._drawBody = function (screen, locationX, bodyWidthPct, bodyHeightPct, color) {
  screen.fillStyle = color;
  screen.fillRect(locationX + this.size.x * (1 - bodyWidthPct) / 2,
                  this.location.y - this.size.y * bodyHeightPct,
                  this.size.x * bodyWidthPct,
                  this.size.y * bodyHeightPct);
};

/**
 * @param screen - the canvas context to draw in
 * @param locationX - the leftmost pixel index to start drawing head (on the canvas screen)
 * @param headRadius
 * @param color - String. Hex color code (eg '#FF0000')
 */
Character.prototype._drawHead = function (screen, locationX, headRadius, color) {
  var headCenterY = this.location.y - this.size.y + headRadius;
  screen.beginPath();
  screen.arc(locationX + this.size.x * 0.5,
             headCenterY,
             headRadius,
             0, 2 * Math.PI);
  screen.fillStyle = color;
  screen.fill();
};