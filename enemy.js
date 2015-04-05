var Enemy = function(game, location) {
  Character.call(this, game, location);
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.draw = function(screen) {
  screen.fillStyle = "#FF0000";
  Character.prototype.draw.call(this, screen);
};

Enemy.prototype.update = function() {
  Character.prototype.update.call(this);

  // Slowly pace back and forth
  if (this.location.x < 250 && this.state.facingDirection === 'left') {
    this.state.facingDirection = 'right';
  } else if (this.location.x > 350 && this.state.facingDirection === 'right') {
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