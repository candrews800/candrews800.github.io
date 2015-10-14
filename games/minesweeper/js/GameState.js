function GameState(canvas, canvasId, width, height){
    this.processEvents = function() {
        // Get Input Events
        var events = this.input.getEvents();

        // Process Input
        var e;
        while (e = events.pop()) {
            this.processInputEvents(e);
        }

        // Process GameStateEvents
        this.event.process();
    };

    this.doLogic = function() {
        this.updateObjects();
    };

    this.render = function() {
        this.canvas.clear();
        this.renderUI();
        this.renderObjects();
    };

    this.initEvents = function() {
        this.event = new GameEvent();
    };

    this.initInput = function() {
        this.input = new Input();
        this.input.addWatchers(this.canvasId);
    };

    this.setPrevState = function(prevState) {
        this.prevState = prevState;
    };

    this.processInputEvents = function(event) {
        for (var i=0; i<this.objects.length; i++) {
            this.objects[i].processInput(event);
        }
    };

    this.updateObjects = function() {
        for (var i=0; i<this.objects.length; i++) {
            this.objects[i].update();
        }
    };

    this.renderObjects = function() {
        for (var i=0; i<this.objects.length; i++) {
            this.objects[i].render(this.canvas.getContext());
        }
    };

    this.init = function(canvas, canvasId, width, height) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.canvasId = canvasId;
        this.objects = [];

        this.initInput();
        this.initEvents();
        this.initUI();
    };

    this.init(canvas, canvasId, width, height);
}