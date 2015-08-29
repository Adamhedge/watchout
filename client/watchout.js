// start slingin' some d3 here.

var enemy = function(top, left) {
  this.top = top;
  this.left = left;
}

var player = function(top, left) {
  this.top = top;
  this.left = left;
}

var gamestats = {
  high: 0,
  current: 0,
  collisions: 0
}


enemy.prototype.setPosition = function() {
  
}