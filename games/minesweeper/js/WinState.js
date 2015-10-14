function WinState(canvas, canvasId, width, height) {
    GameState.call(this);

    this.render = function() {
        this.canvas.clear();
        this.prevState.render();

        this.renderUI();
        this.renderObjects();
    };

    this.init = function(canvas, canvasId, width, height) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.canvasId = canvasId;
        this.objects = [];

        this.initInput();
        this.initUI();
        this.initEvents();
    };

    this.initUI = function() {
        var that = this;

        var retryButton = new Button({
            x: this.width*3/8,
            y: this.height/2 + 50,
            w: 125,
            h: 50,
            text: "Retry",
            renderStyle: "center",
            onClick: function () {
                Minesweeper.fireEvent('start', {
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
                Minesweeper.fireEvent('main-menu');
            }
        });
        this.objects.push(mainMenuButton);
    };

    this.renderUI = function() {
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

    this.init(canvas, canvasId, width, height);
}