window.high = 0;
window.current = 0;
window.collision = 0;
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
  .attr('height', 60)
  .attr('width', 100);

var player = d3.select('.gameboard')
  .append('image')
  .attr('x', function(d){return 300})
  .attr('y', function(d){return 175})
  .attr('xlink:href', 'http://static.tumblr.com/69d05ead17652868f322dcaae9976507/99fnkes/7jsn0eevv/tumblr_static_rabbit1.png')
  .attr('height', 74)
  .attr('width', 75)
  .attr('padding', 50)
  .attr('class', 'player');

setInterval(function() {
  enemy.data(makeEnemies())
    .transition()
    .duration(3000)
    .attr('x', function(d){return d[0]})
    .attr('y', function(d){return d[1]})
  }, 3000
)

d3.select("body").select("svg").on('mousemove', function() {
  var pt = d3.mouse(this);
  if(!wallcollision(pt)){
    player.attr('x', pt[0]-45)
      .attr('y', pt[1]-35);
  }
})


var wallcollision = function(point) {
  var boardx2 = window.innerWidth*0.8;
  var boardy2 = 0.8 * window.innerHeight;

  if(point[0]+25>boardx2||point[1]+25>boardy2||point[0]-40<0||point[1]-20<0) {
    return true;
  }
  return false;
}

var high = 0;
var current = 0;
var collision = 0;
var addToCollision = throttle(function(){
  collision++;
  var time = 0;
  d3.select('.gameboard').attr('color', 'maroon');
  setTimeout(function(){
    d3.select('.gameboard').attr('fill', 'white');
  }, 100);
  for(var i = 0; i < 4; i ++){
    setTimeout(function(){
      player.attr('visibility', 'hidden');
    }, time);
    time +=100;
    setTimeout(function(){
      player.attr('visibility', 'visible');
    }, time);
    time += 800
  }
}, 3000)

setInterval(function(){
  var colliding = false;
  enemy[0].forEach(function(bird){
    var playerx1 = +player.attr('x');
    var playery1 = +player.attr('y')+10;
    var playerx2 = playerx1 + 75;
    var playery2 = playery1 + 55;
    if(playerx2 < (+bird.getAttribute('x')) || (+bird.getAttribute('x')+100 )< playerx1 || playery2 < +bird.getAttribute('y') || (+bird.getAttribute('y')+60) < playery1){
      current++;
      high = Math.max(high, current);
      d3.selectAll('.numbers')
        .data([high, current, collision])
        .text(function(d){return d;});
    } else{
      high = Math.max(high, current);
      current = 0;
      addToCollision();
      d3.selectAll('.numbers')
        .data([high, current, collision])
        .text(function(d){return d;});
    }
  });
}, 10);


function throttle(func, wait) {
  var alreadyCalled = false;
  var result;

   return function() {
    if (!alreadyCalled) {
      result = func.apply(this, arguments);
      alreadyCalled = true;
      setTimeout(function() { 
        alreadyCalled = false; 
        return alreadyCalled
      }, wait);
    }
  }
};


//blood! path: 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z'