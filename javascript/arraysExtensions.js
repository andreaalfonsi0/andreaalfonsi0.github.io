Array.prototype.pickRandom = function(){
  return this[Math.floor(Math.random()*(this.length))];
}
