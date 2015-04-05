// **new Keyboarder()** creates a new keyboard input tracking object.
var Keyboarder = function() {
  var self = this;

  // Handy constants that give human-readable names.
  var STATES = {
    DOWN: 'down',
    UP: 'up',
    NONE: 'none'
  };

  this.KEYS = {
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32
  };

  // Records up/down state of each key that has ever been pressed.
  var keyState = {};

  // When key goes down, record that it is down.
  window.addEventListener('keydown', function(e) {
    keyState[e.keyCode] = STATES.DOWN;
  });

  // When key goes up, record that it is up.
  window.addEventListener('keyup', function(e) {
    keyState[e.keyCode] = STATES.UP;
  });

  // Set the given keyCode to given state
  this.setKeyState = function(keyCode, state) {
    return keyState[keyCode] === state;
  };

  this.isDown = function(keyCode) {
    return keyState[keyCode] === STATES.DOWN;
  };
};
