function WinState(canvas, canvasId, width, height) {
    GameState.call(this);

    this.init(canvas, canvasId, width, height);
};

WinState.prototype.init = function(canvas, canvasId, width, height) {
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.canvasId = canvasId;
    this.objects = [];

    this.initInput();
    this.initUI();
    this.initEvents();
};

WinState.prototype.initEvents = function() {
    this.event = new GameEvent();
};

WinState.prototype.initInput = function() {
    this.input = new Input();
    this.input.addWatchers(this.canvasId);
};

WinState.prototype.initUI = function() {
    var that = this;

    var retryButton = new Button({
        x: this.width*3/8,
        y: this.height/2 + 50,
        w: 125,
        h: 50,
        text: "Retry",
        renderStyle: "center",
        onClick: function () {
            Game.fireEvent('start', {
                difficulty: that.prevState.difficulty
            });
        }
    });
    this.objects.push(retryButton);

    var mainMenuButton = new Button({
        x: this.width*5/8,
        y: this.height/2 + 50,
        w: 125,
        h: 50,
        text: "Main Menu",
        renderStyle: "center",
        onClick: function () {
            Game.fireEvent('main-menu');
        }
    });
    this.objects.push(mainMenuButton);
};

WinState.prototype.setPrevState = function(prevState) {
    this.prevState = prevState;
};

WinState.prototype.processEvents = function() {
    // Get Input Events
    var events = this.input.getEvents();

    // Process Input
    var e;
    while (e = events.pop()) {
        this.processInputEvents(e);
    }
};

WinState.prototype.doLogic = function() {
    this.updateObjects();
};

WinState.prototype.render = function() {
    this.canvas.clear();
    this.prevState.render();

    this.renderUI();
    this.renderObjects();
};

WinState.prototype.renderUI = function() {
    var ctx = this.canvas.getContext();

    ctx.fillStyle = "rgba(0,0,0,0.75)";
    ctx.fillRect(this.width/4, this.height/3, this.width/2, this.height/3 + 25);

    // Write Text
    ctx.fillStyle = "white";
    ctx.font = "40px \"Courier New\", Courier, monospace";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("WINNER", this.width/2, this.height/3 + 50);

    ctx.font = "20px \"Courier New\", Courier, monospace";
    ctx.fillText("Difficulty: " + this.prevState.difficulty, this.width/2, this.height/3 + 95);
    ctx.fillText("Time: " + this.prevState.timer, this.width/2, this.height/3 + 125);
};

WinState.prototype.processInputEvents = function(event) {
    for (var i=0; i<this.objects.length; i++) {
        this.objects[i].processInput(event);
    }
};

WinState.prototype.updateObjects = function() {
    for (var i=0; i<this.objects.length; i++) {
        this.objects[i].update();
    }
};

WinState.prototype.renderObjects = function() {
    for (var i=0; i<this.objects.length; i++) {
        this.objects[i].render(this.canvas.getContext());
    }
};