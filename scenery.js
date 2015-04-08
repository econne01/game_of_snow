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
}