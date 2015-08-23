function MinesweeperState() {
    GameState.call(this);
};

MinesweeperState.getInstance = function () {
    if (!MinesweeperState.instance) {
        MinesweeperState.instance = new Game();
    }
    return MinesweeperState.instance;
};

MinesweeperState.prototype.init = function(options) {;

    this.row = options.row;
    this.col = options.col;
    this.canvas = options.canvas;
    this.canvasId = options.canvasId;
    this.objects = [];

    var gameDim = Game.getDim();
    this.width = gameDim.width;
    this.height = gameDim.height;

    this.bombCount = options.bombCount;
    this.difficulty = options.difficulty;

    this.gridWidth = gameDim.width - options.padding.left - options.padding.right;
    this.gridHeight = gameDim.height - options.padding.top - options.padding.down;

    this.timer = 0;
    this.bombsRemaining = this.bombCount;

    if (this.gridWidth < this.gridHeight) {
        // Even Grid Tiles
        this.gridWidth = parseInt(this.gridWidth/this.col)*this.col;
        this.tileSize = this.gridWidth/this.col;
        this.offsetX = options.padding.left;
        this.offsetY = (this.height - this.row*this.tileSize)/2;
    } else {
        this.gridHeight = parseInt(this.gridHeight/this.row)*this.row;
        this.tileSize = this.gridHeight/this.row;
        this.offsetX = (this.width - this.col*this.tileSize)/2;
        this.offsetY = options.padding.top;
    }

    this.firstClick = true;

    this.initInput();
    this.initTiles();
    this.initEvents();
};

MinesweeperState.prototype.initInput = function() {
    this.input = new Input();
    this.input.addWatchers(this.canvasId);
};

MinesweeperState.prototype.initEvents = function() {
    var that = this;
    this.event = new GameEvent();
    this.event.addListener('open-tile-click', function(options) {
        that.showSurrounding({row: options.row, col: options.col});
    });
    this.event.addListener('tile-click', function(options) {
        that.tileClicked(options);
    });
    this.event.addListener('flag', function() {
        that.bombsRemaining--;
    });
    this.event.addListener('unflag', function() {
        that.bombsRemaining++;
    });
    this.event.addListener('tick', function() {
        if(!that.firstClick){
            that.timer++;
        }
    });
};

MinesweeperState.prototype.initTiles = function() {
    var row, col, offset = {};

    // Set Initial Tiles
    for(col = 0; col < this.col; col++) {
        for(row = 0; row < this.row; row++) {
            offset.x = this.offsetX;
            offset.y = this.offsetY;
            this.objects.push(new Tile(col,row,this.tileSize, offset, this.startPos));
            this.objects[this.objects.length - 1].setType('SAFE');
        }
    }
};

MinesweeperState.prototype.initBombs = function(ignoreCol, ignoreRow) {
    var bombsPlaced = 0;
    var totalTiles = this.row * this.col;
    var randNum, randTile;
    while(bombsPlaced < this.bombCount) {
        randNum = Math.floor((Math.random() * totalTiles));
        randTile = this.objects[randNum];
        if(randTile.row == ignoreRow && randTile.col == ignoreCol) {
            continue;
        }
        if (randTile.constructor.name == 'Tile' && randTile.type != 'BOMB') {
            randTile.setType('BOMB');
            bombsPlaced++;
        }
    }

    for (var i=0; i<this.objects.length; i++) {
        if (this.objects[i].type == 'SAFE') {
            this.objects[i].getNearbyBombs(this.objects);
        }
        this.objects[i].update();
    }
};

MinesweeperState.prototype.processEvents = function() {
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

MinesweeperState.prototype.doLogic = function() {
    this.updateObjects();
};

MinesweeperState.prototype.render = function() {
    this.canvas.clear();
    this.renderUI();
    this.renderObjects();
};

MinesweeperState.prototype.renderUI = function() {
    var ctx = this.canvas.getContext();
    ctx.fillStyle = '#333333';
    ctx.fillRect(0,0,this.width,this.height);

    ctx.fillStyle = '#ffffff';
    ctx.font = "48px \"Courier New\", Courier, monospace";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("Minesweeper", this.width/2, 50);

    ctx.font = "20px \"Courier New\", Courier, monospace";
    ctx.fillText("Bombs: " + this.bombsRemaining, this.width/4, 100);
    ctx.fillText("Timer: " + this.timer, this.width*3/4, 100);
};

MinesweeperState.prototype.processInputEvents = function(event) {
    for (var i=0; i<this.objects.length; i++) {
        this.objects[i].processInput(event);
    }
};

MinesweeperState.prototype.updateObjects = function() {
    for (var i=0; i<this.objects.length; i++) {
        this.objects[i].update();
    }
};

MinesweeperState.prototype.renderObjects = function() {
    for (var i=0; i<this.objects.length; i++) {
        this.objects[i].render(this.canvas.getContext());
    }
};

MinesweeperState.prototype.showSurrounding = function(tile) {
    var row, col;
    var nearRow, nearCol, neighbor;

    for (var i=0; i<this.objects.length; i++) {
        if (this.objects[i].revealed || this.objects[i].flagged) {
            continue;
        }

        row = this.objects[i].row;
        col = this.objects[i].col;

        if (tile.row == row && tile.col == col) {
            continue;
        }

        nearRow = tile.row + 1 == row || tile.row - 1 == row || tile.row == row;
        nearCol = tile.col + 1 == col || tile.col - 1 == col || tile.col == col;
        neighbor = nearRow && nearCol;

        if(neighbor) {
            this.objects[i].revealed = true;

            if (this.objects[i].nearbyBombs == 0 && this.objects[i].type !== 'BOMB') {
                this.showSurrounding({row: row, col: col});
            }
        }
    }
};

MinesweeperState.prototype.tileClicked = function(options) {
    if (this.firstClick) {
        this.initBombs(options.col, options.row);
        this.firstClick = false;

        var i;
        for (i = 0; i < this.objects.length; i++) {
            if (this.objects[i].row == options.row && this.objects[i].col == options.col) {
                if (this.objects[i].nearbyBombs == 0 ){
                    Game.fireStateEvent('open-tile-click', {row: options.row, col: options.col});
                }
            }
        }
    }

    this.checkForWin();
};

MinesweeperState.prototype.checkForWin = function() {
    var i, tile, win = true;
    for (i=0; i<this.objects.length; i++) {
        if (this.objects[i].constructor.name == 'Tile') {
            tile = this.objects[i];
            if (! tile.revealed && tile.type == 'SAFE') {
                win = false;
            }
        }
    }

    if (win) {
        Game.fireEvent('win');
    }
};