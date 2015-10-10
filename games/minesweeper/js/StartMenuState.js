function StartMenuState(canvas, canvasId, width, height) {
    GameState.call(this);

    this.init(canvas, canvasId, width, height);
};

StartMenuState.prototype.init = function(canvas, canvasId, width, height) {
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.canvasId = canvasId;
    this.objects = [];

    this.initInput();
    this.initEvents();
    this.initUI();
};

StartMenuState.prototype.initEvents = function() {
    this.event = new GameEvent();
};

StartMenuState.prototype.initInput = function() {
    this.input = new Input();
    this.input.addWatchers(this.canvasId);
};

StartMenuState.prototype.initUI = function() {
    var that = this;

    var easyButton = new Button({
            x: this.width/4,
            y: this.height/4 + 100,
            w: 125,
            h: 50,
            text: "Easy",
            renderStyle: "center",
            onClick: function () {
                Game.fireEvent('start', {
                    difficulty: 'easy'
                });
            }
        });
    this.objects.push(easyButton);

    var medButton = new Button({
            x: this.width/2,
            y: this.height/4 + 100,
            w: 125,
            h: 50,
            text: "Medium",
            renderStyle: "center",
            onClick: function () {
                Game.fireEvent('start', {
                    difficulty: 'medium'
                });
            }
        });
    this.objects.push(medButton);

    var hardButton = new Button({
        x: 3*this.width/4,
        y: this.height/4 + 100,
        w: 125,
        h: 50,
        text: "Hard",
        renderStyle: "center",
        onClick: function () {
            Game.fireEvent('start', {
                difficulty: 'hard'
            });
        }
    });
    this.objects.push(hardButton);
};

StartMenuState.prototype.processEvents = function() {
    // Get Input Events
    var events = this.input.getEvents();

    // Process Input
    var e;
    while (e = events.pop()) {
        this.processInputEvents(e);
    }
};

StartMenuState.prototype.doLogic = function() {
    this.updateObjects();
};

StartMenuState.prototype.render = function() {
    this.canvas.clear();
    this.renderUI();
    this.renderObjects();
};

StartMenuState.prototype.renderUI = function() {
    var ctx = this.canvas.getContext();
    ctx.fillStyle = '#333333';
    ctx.fillRect(0,0,this.width,this.height);

    ctx.fillStyle = '#ffffff';
    ctx.font = "48px \"Courier New\", Courier, monospace";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("Minesweeper", this.width/2, this.height/4);
};

StartMenuState.prototype.processInputEvents = function(event) {
    for (var i=0; i<this.objects.length; i++) {
        this.objects[i].processInput(event);
    }
};

StartMenuState.prototype.updateObjects = function() {
    for (var i=0; i<this.objects.length; i++) {
        this.objects[i].update();
    }
};

StartMenuState.prototype.renderObjects = function() {
    for (var i=0; i<this.objects.length; i++) {
        this.objects[i].render(this.canvas.getContext());
    }
};