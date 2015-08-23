function GameObject(x, y) {
    this.x = x;
    this.y = y;
}

GameObject.prototype.update =  function() {
    console.log('GameObject.update');
};

GameObject.prototype.render = function() {
    console.log('GameObject.render');
};