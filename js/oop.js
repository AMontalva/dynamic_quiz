// 1) make a constructor

function Player(n, s, r) {
  this.name = n;
  this.score = s;
  this.rank = r;
}

// 2) every object has a prototype, which adds new functions

Player.prototype.logInfo = function() {
  console.log("I am: ", this.name);
}

Player.prototype.promote = function() {
  this.rank++;
  console.log("My new rank is: ", this.rank);
}

Player.prototype.logInfo = function() {
  console.log("I am: ", this.name);
}

// 3) create new Player objects and call their functions

var fred = new Player("Fred", 1000, 1);
fred.logInfo();
fred.promote();

var bob = new Player("Bob", 100, 10);
bob.logInfo();
bob.promote();

