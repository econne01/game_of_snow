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
  this.state.facingDirection = 'left';
  this.leftMostTravelled = this.location.x;
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.draw = function(screen) {
  var OFF_BLACK = "#404040";
  var BLACK = "#000000";
  var CREAM = '#FFCCAA';
  var locationX = this.location.x - this.game.location.x;

  // If Player is at right of screen, he should "enter" the Wall and be hidden
  if (this.location.x >= 740) {
      return;
  }

  // Draw body
  var bodyWidthPct = 0.4;
  var bodyHeightPct = 0.5;
  this._drawBody(screen, locationX, bodyWidthPct, bodyHeightPct, OFF_BLACK);

  // Draw head
  var headRadius = this.size.x * 0.5;
  var headCenterY = this.location.y - this.size.y + headRadius;
  this._drawHead(screen, locationX, headRadius, CREAM);

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
  } else if (this.state.facingDirection === 'right') {
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

  // Move Left or Right
  if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
    this.moveLeft();
  } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
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

  // Check if player is hit by enemy
  this.game.bodies.forEach(function (gameObj) {
      if (gameObj instanceof Enemy && this.isColliding(gameObj)) {
          this.state.health -= 1;
          if (this.state.health <= 0) {
              this.game.gameOver();
          }
      }
  }, this);

  // Set farthest travelled point
  if (this.location.x < this.leftMostTravelled) {
      this.leftMostTravelled = this.location.x;
  }

  // Win the game
  if (this.isGameWinner()) {
    if (this.leftMostTravelled <= 50) {
        this.game.win();
    }
  }
};

Player.prototype.isGameWinner = function () {
  return this.location.x >= 750;
};