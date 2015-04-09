var Ghost = function(game, location) {
  Character.call(this, game, location);
  this.size = { x: 48, y: 30 };
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


  // Draw body
  screen.fillStyle = OFF_WHITE;
  screen.fillRect(locationX + this.size.x * config.body.x,
                  this.location.y - this.size.y * config.body.y,
                  this.size.x * config.body.width,
                  this.size.y * config.body.height);

  // Draw tail
  screen.beginPath();
  screen.moveTo(locationX + this.size.x * config.tail.x,
                this.location.y - this.size.y * config.tail.y + this.size.y * config.tail.height);
  screen.lineTo(locationX + this.size.x * config.tail.x + this.size.x * config.tail.width,
                this.location.y - this.size.y * config.tail.y);
  screen.lineTo(locationX + this.size.x * config.tail.x + this.size.x * config.tail.width * 0.67,
                this.location.y - this.size.y * config.tail.y + this.size.y * config.tail.height);
  screen.fill();

  // Draw legs
  screen.fillStyle = OFF_WHITE;
  screen.fillRect(locationX + this.size.x * config.backLeg.x,
                  this.location.y - this.size.y * config.backLeg.y,
                  this.size.x * config.backLeg.width,
                  this.size.y * config.backLeg.height);
  screen.fillRect(locationX + this.size.x * config.frontLeg.x,
                  this.location.y - this.size.y * config.frontLeg.y,
                  this.size.x * config.frontLeg.width,
                  this.size.y * config.frontLeg.height);

  // Draw head
  screen.beginPath();
  screen.arc(locationX + this.size.x * config.head.x,
             this.location.y - this.size.y * config.head.y,
             config.head.radius,
             ARC.START, ARC.END);
  screen.fillStyle = OFF_WHITE;
  screen.fill();

  // Draw ears
  screen.fillStyle = OFF_WHITE;
  screen.beginPath();
  screen.moveTo(locationX + this.size.x * config.backEar.x,
                this.location.y - this.size.y * config.backEar.y);
  screen.lineTo(locationX + this.size.x * config.backEar.x + this.size.x * config.backEar.width,
                this.location.y - this.size.y * config.backEar.y);
  screen.lineTo(locationX + this.size.x * config.backEar.x + this.size.x * config.backEar.width * 0.75,
                this.location.y - this.size.y * config.backEar.y + this.size.y * config.backEar.height);
  screen.fill();

  screen.beginPath();
  screen.moveTo(locationX + this.size.x * config.frontEar.x,
                this.location.y - this.size.y * config.frontEar.y);
  screen.lineTo(locationX + this.size.x * config.frontEar.x,
                this.location.y - this.size.y * config.frontEar.y + this.size.y * config.frontEar.height);
  screen.lineTo(locationX + this.size.x * config.frontEar.x + this.size.x * config.frontEar.width,
                this.location.y - this.size.y * config.frontEar.y + this.size.y * config.frontEar.height);
  screen.fill();

  // Draw eye
  screen.beginPath();
  screen.arc(locationX + this.size.x * config.eye.x,
             this.location.y - this.size.y * config.eye.y,
             config.eye.radius,
             ARC.START, ARC.END);
  screen.fillStyle = RED;
  screen.fill();

  // Draw snout
  screen.fillStyle = OFF_WHITE;
  screen.fillRect(locationX + this.size.x * config.snout.x,
                  this.location.y - this.size.y * config.snout.y,
                  this.size.x * config.snout.width,
                  this.size.y * config.snout.height);

  // Draw nose
  screen.beginPath();
  screen.arc(locationX + this.size.x * config.nose.x,
             this.location.y - this.size.y * config.nose.y,
             config.nose.radius,
             -0.5 * Math.PI, ARC.BOTTOM);
  screen.fillStyle = BLACK;
  screen.fill();
};
