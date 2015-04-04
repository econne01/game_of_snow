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
  var jumpPixels = 2;
  if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
    if (!this.isJumping) {
      this.isJumping = true;
      this.jumpTick = 0;
    }
  }

  if (this.isJumping) {
    this.jumpTick += 1;
    if (this.jumpTick <= 10) {
      this.center.y -= jumpPixels;
    } else {
      this.center.y += jumpPixels;
    }

    if (this.jumpTick >= 20) {
      this.jumpTick = 0;
      this.isJumping = false;
    }
  }
};
