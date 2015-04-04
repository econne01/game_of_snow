var Player = function(game) {
  GameBody.call(this, game);
  this.isJumping = false;
  this.jumpTick = 0;
};

Player.prototype = Object.create(GameBody.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  GameBody.prototype.update.call(this);

  var movePixels = 2;
  if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
    // If left cursor key is down move left.
    if (this.center.x - this.size.x / 2 > movePixels) {
      this.center.x -= movePixels;
    }
  } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
    // If right key is down, move right.
    if (this.center.x + this.size.x / 2 < (this.game.size.x - movePixels)) {
      this.center.x += movePixels;
    }
  }

  // If SPACE key is down, jump
  if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
    if (!this.isJumping) {
      this.isJumping = true;
      this.jumpTick = 0;
    }
  }
  if (this.isJumping) {
    this.updateJump();
  }
};

Player.prototype.updateJump = function () {
  var maxHeight = 150.0;
  var hangTime = 20.0; // In game ticks

  // Use physics to calculate velocity, acceleration
  // d = vt + 0.5at^2
  var initialVelocity = (4 * maxHeight) / (hangTime);
  var gravity = -2 * initialVelocity / hangTime;
  var velocity = initialVelocity + (gravity * this.jumpTick);
  if (this.jumpTick > hangTime) {
    this.isJumping = false;
    return;
  }
  this.jumpTick += 1;
  this.center.y -= velocity;
};
