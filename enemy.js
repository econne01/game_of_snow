var Enemy = function(game, location, paceRange) {
  Character.call(this, game, location);
  this.paceRange = paceRange;
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.draw = function(screen) {
  var OFF_WHITE = "#F1FBFF";
  var BLUE = "#3BAFE7";
  var PALE_GOLD = '#FBEFCB';
  var locationX = this.location.x - this.game.location.x;

  // Draw body
  var bodyWidthPct = 0.4;
  var bodyHeightPct = 0.5;
  this._drawBody(screen, locationX, bodyWidthPct, bodyHeightPct, OFF_WHITE);

  // Draw head
  var headRadius = this.size.x * 0.5;
  var headCenterY = this.location.y - this.size.y + headRadius;
  this._drawHead(screen, locationX, headRadius, OFF_WHITE);
  // with blue eyes
  var eyeCenterY = this.location.y - this.size.y + headRadius;
  var beardArcLength = 0.75 * Math.PI;
  var eyeRadius = headRadius * 0.2;
  screen.beginPath();
  if (this.state.facingDirection === 'left') {
    screen.arc(locationX + this.size.x * 0.25,
               eyeCenterY,
               eyeRadius,
               ARC.START, ARC.END);
  } else if (this.state.facingDirection === 'right') {
    screen.arc(locationX + this.size.x * 0.75,
               eyeCenterY,
               eyeRadius,
               ARC.START, ARC.END);
  }
  screen.fillStyle = BLUE;
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
  } else if (this.state.facingDirection === 'right') {
    screen.arc(locationX + this.size.x * 0.75,
               headCenterY,
               beardRadius,
               ARC.BOTTOM,
               ARC.BOTTOM + beardArcLength);
  }
  screen.lineWidth = 3;
  screen.strokeStyle = PALE_GOLD;
  screen.stroke();

  // Draw hair
  var hairWidthPct = 0.35;
  var hairHeightPct = 0.4;
  var hairRadius = headRadius * 0.73;
  var hairArcLength = 0.8 * Math.PI;
  var hairArcTopOffset = 0.2 * Math.PI;
  screen.fillStyle = PALE_GOLD;
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
  screen.strokeStyle = PALE_GOLD;
  screen.stroke();
};


Enemy.prototype.update = function() {
  Character.prototype.update.call(this);

  // Slowly pace back and forth
  if (this.location.x < this.paceRange.left && this.state.facingDirection === 'left') {
    this.state.facingDirection = 'right';
  } else if (this.location.x > this.paceRange.right && this.state.facingDirection === 'right') {
    this.state.facingDirection = 'left';
  }
  if (this.game.tickCount % 5 === 0) {
    if (this.state.facingDirection === 'left') {
        this.moveLeft();
    } else {
        this.moveRight();
    }
  }
};