function Minesweeper() {
    Game.call(this);

    this.init = function(canvasId, title, width, height) {
        Game.prototype.init.call(this, canvasId, title, width, height);

        this.padding = {
            left: 15,
            top: 125,
            right: 15,
            down: 50
        };

        Game.prototype.initCanvas.call(this);
        Game.prototype.initInput.call(this);
        this.initEvents();
        this.initStartMenuState();
    };

    this.initEvents = function() {
        Game.prototype.initEvents.call(this);
        var that = this;

        window.setInterval(
            function(){
                Minesweeper.fireEvent('tick');
                Minesweeper.fireStateEvent('tick');
            }, 1000
        );

        this.event.addListener('bomb-click', function() {
            that.initGameOverState(that.currentState);
        });
        this.event.addListener('start', function(options) {
            if(options.difficulty == 'easy') {
                that.initMinesweeperState({
                    col: 10,
                    row: 10,
                    bombCount: 15,
                    difficulty: 'easy'
                });
            } else if(options.difficulty == 'medium') {
                that.initMinesweeperState({
                    col: 16,
                    row: 16,
                    bombCount: 32,
                    difficulty: 'medium'
                });
            } else if(options.difficulty == 'hard') {
                that.initMinesweeperState({
                    col: 20,
                    row: 20,
                    bombCount: 50,
                    difficulty: 'hard'
                });
            }
        });
        this.event.addListener('main-menu', function() {
            that.initStartMenuState();
        });

        this.event.addListener('win', function() {
            that.initWinState(that.currentState);
        });
    };

    this.initStartMenuState = function() {
        this.currentState = new StartMenuState(this.canvas, this.canvasId, this.width, this.height);
    };

    this.initMinesweeperState = function(options) {
        this.currentState = new MinesweeperState();
        this.currentState.init({
            canvas: this.canvas,
            canvasId: this.canvasId,
            col: options.col,
            row: options.row,
            padding: this.padding,
            bombCount: options.bombCount,
            difficulty: options.difficulty
        });
    };

    this.initGameOverState = function(currentState) {
        this.currentState = new GameOverState(this.canvas, this.canvasId, this.width, this.height);
        this.currentState.setPrevState(currentState);
    };

    this.initWinState = function(currentState) {
        this.currentState = new WinState(this.canvas, this.canvasId, this.width, this.height);
        this.currentState.setPrevState(currentState);
    };

    this.loop = function() {
        this.currentState.processEvents();
        this.currentState.doLogic();

        // Process Global Events
        this.event.process();

        this.currentState.render();
    };
}

Minesweeper.getInstance = function () {
    if (!Minesweeper.instance) {
        Minesweeper.instance = new Minesweeper();
    }
    return Minesweeper.instance;
};

Minesweeper.fireEvent = function(event_name, options) {
    var game = Minesweeper.getInstance();
    game.event.fire(event_name, options);
};

Minesweeper.fireStateEvent = function(event_name, options) {
    var game = Minesweeper.getInstance();
    game.currentState.event.fire(event_name, options);
};

Minesweeper.getDim = function() {
    var game = Minesweeper.getInstance();
    return {
        width: game.width,
        height: game.height
    }
};