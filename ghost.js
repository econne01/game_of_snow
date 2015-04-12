var Ghost = function(game, location) {
  Character.call(this, game, location);
  this.size = { x: 48, y: 30 };
  this.config.followSize = { x: 0, y: 0};
  this.config.jumpHeight = 80;
  this.config.jumpTime = 30; // in Game Ticks
  this.state.following = null;
  this.state.facingDirection = 'right';
};

Ghost.prototype = Object.create(Character.prototype);
Ghost.prototype.constructor = Ghost;

Ghost.prototype.draw = function(screen) {
  var OFF_WHITE = "#FFFFFF";
  var RED = "#FF0000";
  var BLACK = '#000000';
  var locationX = this.location.x - this.game.location.x;

  // Define a config object to give all relative sizes of this character
  // width, height denote percentage of total body size
  // x, y denote left/top most index for rect or center for arcs
  var config = {
      body: {width: 0.55, height: 0.35, x: 0.125, y: 0.65},
      head: {radius: 0.3 * this.size.y,
             x: 0.7, y: 0.7},
      eye: {radius: 0.05 * this.size.y,
             x: 0.78, y: 0.75},
      snout: {width: 0.22, height: 0.16, x: 0.75, y: 0.65},
      nose: {radius: 0.06 * this.size.y,
             x: 0.97, y: 0.57},
      tail: {width: 0.14, height: 0.35, x: 0, y: 0.65},
      backEar: {width: 0.2, height: 0.18, x: 0.4, y: 0.99},
      frontEar: {width: 0.15, height: 0.2, x: 0.6, y: 1.15},
      backLeg: {width: 0.1, height: 0.3, x: 0.125, y: 0.3},
      frontLeg: {width: 0.1, height: 0.3, x: 0.575, y: 0.3}
  };
  for (var bodyPart in config) {
    if (this.state.facingDirection === 'left') {
      config[bodyPart].x = 1 - config[bodyPart].x;
      if (!('radius' in config[bodyPart])) {
          // For rect, we must shift it left by width also
          config[bodyPart].x -= config[bodyPart].width;
      }
    }
    config[bodyPart].x *= this.size.x;
    config[bodyPart].y *= this.size.y;
    config[bodyPart].width *= this.size.x;
    config[bodyPart].height *= this.size.y;
  }


  // Draw body
  screen.fillStyle = OFF_WHITE;
  screen.fillRect(locationX + config.body.x,
                  this.location.y - config.body.y,
                  config.body.width,
                  config.body.height);

  // Draw tail
  screen.beginPath();
  if (this.state.facingDirection === 'left') {
    screen.moveTo(locationX + config.tail.x + config.tail.width,
                  this.location.y - config.tail.y + config.tail.height);
    screen.lineTo(locationX + config.tail.x,
                  this.location.y - config.tail.y);
    screen.lineTo(locationX + config.tail.x + config.tail.width * (1 - 0.67),
                  this.location.y - config.tail.y + config.tail.height);
  } else if (this.state.facingDirection === 'right') {
    screen.moveTo(locationX + config.tail.x,
                  this.location.y - config.tail.y + config.tail.height);
    screen.lineTo(locationX + config.tail.x + config.tail.width,
                  this.location.y - config.tail.y);
    screen.lineTo(locationX + config.tail.x + config.tail.width * 0.67,
                  this.location.y - config.tail.y + config.tail.height);
  }
  screen.fill();

  // Draw legs
  screen.fillStyle = OFF_WHITE;
  screen.fillRect(locationX + config.backLeg.x,
                  this.location.y - config.backLeg.y,
                  config.backLeg.width,
                  config.backLeg.height);
  screen.fillRect(locationX + config.frontLeg.x,
                  this.location.y - config.frontLeg.y,
                  config.frontLeg.width,
                  config.frontLeg.height);

  // Draw head
  screen.beginPath();
  screen.arc(locationX + config.head.x,
             this.location.y - config.head.y,
             config.head.radius,
             ARC.START, ARC.END);
  screen.fillStyle = OFF_WHITE;
  screen.fill();

  // Draw ears
  screen.fillStyle = OFF_WHITE;
  screen.beginPath();
  screen.moveTo(locationX + config.backEar.x,
                this.location.y - config.backEar.y);
  screen.lineTo(locationX + config.backEar.x + config.backEar.width,
                this.location.y - config.backEar.y);
  if (this.state.facingDirection === 'left') {
    screen.lineTo(locationX + config.backEar.x + config.backEar.width * (1 - 0.75),
                  this.location.y - config.backEar.y + config.backEar.height);
  } else if (this.state.facingDirection === 'right') {
    screen.lineTo(locationX + config.backEar.x + config.backEar.width * 0.75,
                  this.location.y - config.backEar.y + config.backEar.height);
  }
  screen.fill();

  screen.beginPath();
  if (this.state.facingDirection === 'left') {
    screen.moveTo(locationX + config.frontEar.x + config.frontEar.width,
                  this.location.y - config.frontEar.y);
  } else if (this.state.facingDirection === 'right') {
    screen.moveTo(locationX + config.frontEar.x,
                  this.location.y - config.frontEar.y);
  }
  screen.lineTo(locationX + config.frontEar.x,
                this.location.y - config.frontEar.y + config.frontEar.height);
  screen.lineTo(locationX + config.frontEar.x + config.frontEar.width,
                this.location.y - config.frontEar.y + config.frontEar.height);
  screen.fill();

  // Draw eye
  screen.beginPath();
  screen.arc(locationX + config.eye.x,
             this.location.y - config.eye.y,
             config.eye.radius,
             ARC.START, ARC.END);
  screen.fillStyle = RED;
  screen.fill();

  // Draw snout
  screen.fillStyle = OFF_WHITE;
  screen.fillRect(locationX + config.snout.x,
                  this.location.y - config.snout.y,
                  config.snout.width,
                  config.snout.height);

  // Draw nose
  screen.beginPath();
  var arcStart = this.state.facingDirection === 'left' ? ARC.BOTTOM : ARC.TOP;
  var arcEnd = this.state.facingDirection === 'left' ? -0.5 * Math.PI : ARC.BOTTOM;
  screen.arc(locationX + config.nose.x,
             this.location.y - config.nose.y,
             config.nose.radius,
             arcStart, arcEnd);
  screen.fillStyle = BLACK;
  screen.fill();
};

Ghost.prototype.update = function () {
  Character.prototype.update.call(this);

  // Check if player has picked up Ghost
  if (this.isColliding(this.game.player)) {
    this.state.following = this.game.player;
    this.game.player.possessions.push(this);
  }

  if (this.state.following) {
    var following = this.state.following;
    this.config.followSize.x = following.size.x * 0.5;
    this.state.facingDirection = following.state.facingDirection;

    if (this.state.facingDirection === 'left') {
      this.location.x = following.location.x + following.size.x + this.config.followSize.x;
    } else if (this.state.facingDirection === 'right') {
      this.location.x = following.location.x - this.size.x - this.config.followSize.x;
    }
    if (following.state.jumpStart && !this.state.jumpStart) {
      this.state.jumpStart = Math.max(this.game.tickCount, following.state.jumpStart + 15);
    }
  }

  this.updateJump();
};