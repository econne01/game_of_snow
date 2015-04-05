var Wall = function(game, location) {
  GameObject.call(this, game, location);
  this.size = { x: 60,
                y: this.game.size.y * 0.95 };
};

Wall.prototype = Object.create(GameObject.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.draw = function (screen) {
  screen.fillStyle = '#000000';
  var locationX = this.location.x - this.game.location.x;
  var locationY = this.location.y;
  screen.beginPath();
//  screen.moveTo(locationX - this.size.x * 2,
//                locationY - this.size.y * 0.5);
  var distanceHeightPct = 0.15;
  var distanceWidthPct = 1.3;
  screen.moveTo(locationX - this.size.x * distanceWidthPct,
                locationY - this.size.y * (0.5 - distanceHeightPct / 2));
  screen.lineTo(locationX - this.size.x * distanceWidthPct,
                locationY - this.size.y * (0.5 + distanceHeightPct / 2));
  screen.lineTo(locationX + this.size.x,
                locationY - this.size.y);
  screen.lineTo(locationX + this.size.x,
                locationY);
  screen.fill();
}