// The Wall
var Wall = function(game, location) {
  var self = this;
  GameObject.call(this, game, location);
  this.size = { x: 200,
                y: this.game.size.y};
  var wallImage = new Image();
  wallImage.src = 'images/wall.png';
  wallImage.onload = function () {
    self.img = wallImage;
  };
};

Wall.prototype = Object.create(GameObject.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.draw = function (screen) {

  // To draw the Wall from an image
  if (this.img) {
    var imgScale = this.game.screenSize.y / this.img.height;
    imgScale *= 1.2;
    var imgShift = 50; // Move it down so entrance lines up with ground
    var locationX = this.location.x - this.game.location.x;
    var locationY = this.location.y - this.img.height * imgScale + imgShift;
    screen.drawImage(this.img,
                     locationX,
                     locationY,
                     this.img.width * imgScale,
                     this.img.height * imgScale);
  }
};

// Weirwood tree
var Weirwood = function(game, location) {
  var self = this;
  GameObject.call(this, game, location);
  this.size = { x: 30,
                y: this.game.size.y * 0.5};
};

Weirwood.prototype = Object.create(GameObject.prototype);
Weirwood.prototype.constructor = Weirwood;

Weirwood.prototype.draw = function (screen) {
  var OFF_WHITE = "#F6F0E6";
  var RED = "#BB0D3D";
  var locationX = this.location.x - this.game.location.x;

  // Define a config object to give all relative sizes of this object
  // width, height denote percentage of total body size
  // x, y denote left/top most index for rect or center for arcs
  var config = {
    leftEye: {radius: 0.06 * this.size.x, x: 0.35, y: 0.25},
    rightEye: {radius: 0.06 * this.size.x, x: 0.65, y: 0.25},
    longBranch: {width: 1.4, height: 0.05, y: 0.20},
    shortBranch: {width: 0.6, height: 0.05, y: 0.45},
    mouth: {width: 0.5, height: 0.03, x: 0.25, y: 0.15},
    trunk: {width: 1.0, height: 0.8, x: 0, y: 0},
    top: {width: 1.5, height: 0.2, x: -0.25, y: 0.8}
  };
  // Update config from percentages to actual pixels
  for (var part in config) {
    config[part].x *= this.size.x;
    config[part].y *= this.size.y;
    config[part].width *= this.size.x;
    config[part].height *= this.size.y;
  }

  // Draw top leaves
  var radius = config.trunk.width * 0.6;
  screen.beginPath();
  screen.arc(locationX + config.trunk.x + config.trunk.width * 0.5,
             this.location.y - config.top.y - config.top.height,
             radius,
             ARC.START, ARC.END);
  screen.fillStyle = RED;
  screen.fill();
  screen.beginPath();
  screen.arc(locationX + config.trunk.x + config.top.x,
             this.location.y - config.top.y - config.top.height * 0.75,
             radius,
             ARC.START, ARC.END);
  screen.fillStyle = RED;
  screen.fill();
  screen.beginPath();
  screen.arc(locationX + config.trunk.x + config.top.x + config.top.width,
             this.location.y - config.top.y - config.top.height * 0.75,
             radius,
             ARC.START, ARC.END);
  screen.fillStyle = RED;
  screen.fill();

  // Draw Trunk
  screen.fillStyle = OFF_WHITE;
  screen.fillRect(locationX + config.trunk.x,
                  this.location.y - config.trunk.y - config.trunk.height,
                  config.trunk.width,
                  config.trunk.height);
  // Draw branches
  var branches = [config.longBranch, config.shortBranch];
  branches.forEach(function (branch) {
    var sidesComplete = 0;
    var widthOffset = -1 * branch.width;
    var leafOffset = 0;
    var heightOffset = 0;
    while (sidesComplete < 2) {
      // Draw leaves
      screen.beginPath();
      radius = branch.height * 2;
      screen.arc(locationX + config.trunk.x + widthOffset + leafOffset,
                 this.location.y - branch.y - branch.height / 2 - heightOffset,
                 radius,
                 ARC.START, ARC.END);
      screen.fillStyle = RED;
      screen.fill();
      // Draw branch
      screen.fillStyle = OFF_WHITE;
      screen.fillRect(locationX + config.trunk.x + widthOffset,
                      this.location.y - branch.y - branch.height - heightOffset,
                      branch.width,
                      branch.height);
      widthOffset = config.trunk.width;
      heightOffset = branch.y * 0.2;
      leafOffset = branch.width;
      sidesComplete += 1;
    }
  }, this);

  // Draw Face
  // Draw Eyes
  var eyes = [config.leftEye, config.rightEye];
  eyes.forEach(function (eye) {
    screen.beginPath();
    screen.arc(locationX + eye.x,
            this.location.y - eye.y,
        eye.radius,
        ARC.START, ARC.END);
    screen.fillStyle = RED;
    screen.fill();
  }, this);
  // Draw tear(s)
  screen.fillRect(locationX + config.leftEye.x - config.leftEye.radius * 0.25,
                  this.location.y - config.leftEye.y + config.leftEye.radius,
                  config.leftEye.radius * 0.5,
                  config.leftEye.radius * 4);

  // Draw Mouth (2 half circles + rectangle = Oval-ish)
  radius = config.mouth.height / 2;
  screen.beginPath();
  screen.arc(locationX + config.mouth.x + radius,
             this.location.y - config.mouth.y - radius,
             radius,
             ARC.BOTTOM, ARC.TOP);
  screen.fillStyle = RED;
  screen.fill();

  screen.beginPath();
  screen.arc(locationX + config.mouth.x + config.mouth.width - radius,
             this.location.y - config.mouth.y - radius,
             radius,
             -0.5 * Math.PI, ARC.BOTTOM);
  screen.fill();

  screen.fillRect(locationX + config.mouth.x + radius,
                  this.location.y - config.mouth.y - config.mouth.height,
                  config.mouth.width - radius * 2,
                  config.mouth.height);

  // Draw top branches
  screen.beginPath();
  screen.moveTo(locationX + config.trunk.x, this.location.y - config.top.y);
  screen.lineTo(locationX + config.top.x,
                this.location.y - config.top.y - config.top.height * 0.75);
  screen.lineTo(locationX + config.top.x + config.top.width * 0.33,
                this.location.y - config.top.y - config.top.height * 0.25);
  screen.lineTo(locationX + config.top.x + config.top.width * 0.5,
                this.location.y - config.top.y - config.top.height);
  screen.lineTo(locationX + config.top.x + config.top.width * 0.67,
                this.location.y - config.top.y - config.top.height * 0.25);
  screen.lineTo(locationX + config.top.x + config.top.width,
                this.location.y - config.top.y - config.top.height * 0.75);
  screen.lineTo(locationX + config.trunk.x + config.trunk.width,
                this.location.y - config.top.y);
  screen.fillStyle = OFF_WHITE;
  screen.fill();
};