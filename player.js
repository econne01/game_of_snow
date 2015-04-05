var ARC = {
  TOP: 1.5 * Math.PI,
  BOTTOM: 0.5 * Math.PI,
  LEFT: 0.0 * Math.PI,
  RIGHT: 1.0 * Math.PI,
  START: 0.0 * Math.PI,
  END: 2.0 * Math.PI
};

var Player = function(game, location) {
  Character.call(this, game, location);
  this.config.moveSizeX = 3;
  this.size = { x: 20, y: 30 };
  this.state.facingDirection = 'right';
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.draw = function(screen) {
  var OFF_BLACK = "#404040";
  var BLACK = "#000000";
  var CREAM = '#FFCCAA';
  var locationX = this.location.x - this.game.location.x;
  // Draw body
  var bodyWidthPct = 0.3;
  var bodyHeightPct = 0.5;
  screen.fillStyle = OFF_BLACK;
  screen.fillRect(locationX + this.size.x * (1 - bodyWidthPct) / 2,
                  this.location.y - this.size.y * bodyHeightPct,
                  this.size.x * bodyWidthPct, this.size.y * bodyHeightPct);

  // Draw head
  var headRadius = this.size.x * 0.5;
  var headCenterY = this.location.y - this.size.y + headRadius;
  screen.beginPath();
  screen.arc(locationX + this.size.x * 0.5,
             headCenterY,
             headRadius,
             0, 2 * Math.PI);
  screen.fillStyle = CREAM;
  screen.fill();

  // Draw beard
  var beardArcLength = 0.75 * Math.PI;
  var beardRadius = headRadius * 0.9;
  screen.beginPath();
  if (this.state.facingDirection === 'left') {
    screen.arc(locationX + this.size.x * 0.25,
               headCenterY,
               beardRadius,
               ARC.BOTTOM - beardArcLength,
               ARC.BOTTOM);
  } else {
    screen.arc(locationX + this.size.x * 0.75,
               headCenterY,
               beardRadius,
               ARC.BOTTOM,
               ARC.BOTTOM + beardArcLength);
  }
  screen.lineWidth = 3;
  screen.strokeStyle = BLACK;
  screen.stroke();

  // Draw hair
  var hairWidthPct = 0.35;
  var hairHeightPct = 0.4;
  var hairRadius = headRadius * 0.73;
  var hairArcLength = 0.8 * Math.PI;
  var hairArcTopOffset = 0.2 * Math.PI;
  screen.fillStyle = BLACK;
  screen.beginPath();
  if (this.state.facingDirection === 'left') {
    // Long hair
    screen.fillRect(locationX + this.size.x * (1 - hairWidthPct),
                    this.location.y - this.size.y * 0.75,
                    this.size.x * hairWidthPct,
                    this.size.y * hairHeightPct);
    // Top of head hair
    screen.arc(locationX + this.size.x * 0.5,
               headCenterY,
               hairRadius,
               ARC.TOP - hairArcTopOffset,
               ARC.TOP - hairArcTopOffset + hairArcLength);
  } else if (this.state.facingDirection === 'right') {
    // Long hair
    screen.fillRect(locationX,
                    this.location.y - this.size.y * 0.75,
                    this.size.x * hairWidthPct,
                    this.size.y * hairHeightPct);
    // Top of head hair
    screen.arc(locationX + this.size.x * 0.5,
               headCenterY,
               hairRadius,
               ARC.TOP + hairArcTopOffset - hairArcLength,
               ARC.TOP + hairArcTopOffset);
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
      this.keyboarder.setKeyState(this.keyboarder.KEYS.SPACE, this.keyboarder.STATES.NONE);
    }
  }
  if (this.state.jumping) {
    this.updateJump();
  }
};