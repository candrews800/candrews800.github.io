function Game() {

}

Game.getInstance = function () {
    console.log(this);
    if (!Game.instance) {
        Game.instance = new Game();
    }
    return Game.instance;
};

Game.fireEvent = function(event_name, options) {
    var game = Game.getInstance();
    game.event.fire(event_name, options);
};

Game.fireStateEvent = function(event_name, options) {
    var game = Game.getInstance();
    game.currentState.event.fire(event_name, options);
};

Game.prototype.initCanvas = function() {
    this.canvas = new Canvas(this.canvasId, this.width, this.height);
};

Game.prototype.initInput = function() {
    this.input = new Input();
    this.input.addWatchers(this.canvasId);
};

Game.prototype.initEvents = function() {
    this.event = new GameEvent();
};

Game.prototype.init = function(canvasId, title, width, height) {
    this.title = title;
    this.width = width;
    this.height = height;
    this.canvasId = canvasId;
};