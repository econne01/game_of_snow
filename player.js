var Player = function(game, location) {
  Character.call(this, game, location);
  this.config.moveSizeX = 3;
  this.size = { x: 20, y: 30 };
  this.state.facingDirection = 'right';
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.draw = function(screen) {
  var BLACK = "#000000";
  var CREAM = '#FFCCAA';
  var PlayerX = this.location.x - this.game.location.x;
  // Draw body
  screen.fillStyle = BLACK;
  screen.fillRect(PlayerX + this.size.x * 0.2,
                  this.location.y - this.size.y * 0.5,
                  this.size.x * 0.6, this.size.y * 0.5);
  // Draw head
  screen.beginPath();
  screen.arc(PlayerX + this.size.x * 0.5,
             this.location.y - this.size.y * 0.67,
             this.size.y * 0.33,
             0, 2 * Math.PI);
  screen.fillStyle = CREAM;
  screen.fill();

  // Draw beard
  screen.beginPath();
  if (this.state.facingDirection === 'left') {
    screen.arc(PlayerX + this.size.x * 0.25,
            this.location.y - this.size.y * 0.67,
            this.size.y * 0.30,
            -0.25 * Math.PI, 0.5 * Math.PI);
  } else {
    screen.arc(PlayerX + this.size.x * 0.75,
            this.location.y - this.size.y * 0.67,
            this.size.y * 0.30,
            0.5 * Math.PI, 1.25 * Math.PI);
  }
  screen.lineWidth = 3;
  screen.strokeStyle = BLACK;
  screen.stroke();

  // Draw hair
  screen.fillStyle = BLACK;
  screen.beginPath();
  if (this.state.facingDirection === 'left') {
    screen.fillRect(PlayerX + this.size.x * 0.65,
                    this.location.y - this.size.y * 0.75,
                    this.size.x * 0.35, this.size.y * 0.4);
    screen.arc(PlayerX + this.size.x * 0.5,
            this.location.y - this.size.y * 0.67,
            this.size.y * 0.24,
            1.3 * Math.PI, 2.1 * Math.PI);
  } else {
    screen.fillRect(PlayerX,
                    this.location.y - this.size.y * 0.75,
                    this.size.x * 0.35, this.size.y * 0.4);
    screen.arc(PlayerX + this.size.x * 0.5,
            this.location.y - this.size.y * 0.67,
            this.size.y * 0.24,
            0.9 * Math.PI, 1.7 * Math.PI);
  }
  screen.lineWidth = 6;
  screen.strokeStyle = BLACK;
  screen.stroke();
};

Player.prototype.moveLeft = function () {
  Character.prototype.moveLeft.call(this);
  if (this.location.x < this.game.location.x + this.game.scrollBuffer &&
      this.game.location.x > 0) {
    this.game.scroll('x', -1 * this.config.moveSizeX);
  }
};

Player.prototype.moveRight = function () {
  Character.prototype.moveRight.call(this);
  var playerRight = this.location.x + this.size.x;
  if (playerRight > this.game.location.x + this.game.screenSize.x - this.game.scrollBuffer &&
      this.game.location.x + this.game.screenSize.x < this.game.size.x) {
    this.game.scroll('x', this.config.moveSizeX);
  }
};

Player.prototype.update = function() {
  Character.prototype.update.call(this);

  if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
    // If left cursor key is down move left.
    this.moveLeft();
  } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
    // If right key is down, move right.
    this.moveRight();
  }

  // If SPACE key is down, jump
  if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
    if (!this.state.jumping) {
      this.state.jumping = true;
      this.state.jumpStart = this.game.tickCount;
    }
  }
  if (this.state.jumping) {
    this.updateJump();
  }
};