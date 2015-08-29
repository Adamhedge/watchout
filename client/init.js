
var makeEnemies = function() {
  var enemies = [];
  var boardWidth = d3.select('.gameboard').style('width');
  var boardHeight = d3.select('.gameboard').style('height');
  boardWidth = boardWidth.substring(0,boardWidth.length - 2);
  boardHeight = boardHeight.substring(0,boardHeight.length - 2);
  for(var i=0; i<10; i++) {
    var x = Math.random()*(boardWidth-100);
    var y = Math.random()*(boardHeight-100);    

    enemies.push([x,y])  
  }
  return enemies;
}

var enemy = d3.select('.gameboard')
  .selectAll('image')
  .data(makeEnemies())
  .enter()
  .append('image')
  .attr('x', function(d){return d[0]})
  .attr('y', function(d){return d[1]})
  .attr('class', 'enemy')
  .attr('xlink:href', 'http://freepngimages.com/wp-content/uploads/2015/06/jay-bird-flying-624x363.png')
  .attr('height', 99)
  .attr('width', 100);

var player = d3.select('.gameboard')
  .append('image')
  .attr('x', function(d){return 300})
  .attr('y', function(d){return 175})
  .attr('xlink:href', 'http://static.tumblr.com/69d05ead17652868f322dcaae9976507/99fnkes/7jsn0eevv/tumblr_static_rabbit1.png')
  .attr('height', 74)
  .attr('width', 75)
  .attr('class', 'player');

setInterval(function() {
  enemy.data(makeEnemies())
    .transition()
    .duration(3000)
    .attr('x', function(d){return d[0]})
    .attr('y', function(d){return d[1]})
  }, 3000
)

