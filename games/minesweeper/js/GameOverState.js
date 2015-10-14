function GameOverState(canvas, canvasId, width, height) {
    GameState.call(this, canvas, canvasId, width, height);

    this.setup = function() {
        this.initUI();
    };

    this.render = function() {
        this.canvas.clear();
        this.prevState.render();

        this.renderUI();
        this.renderObjects();
    };

    this.initUI = function() {
        var that = this;

        var retryButton = new Button({
            x: this.width*3/8,
            y: this.height/2 + 10,
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
            y: this.height/2 + 10,
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
        ctx.fillRect(this.width/4, this.height/3, this.width/2, this.height/3);

        // Write Text
        ctx.fillStyle = "white";
        ctx.font = "40px \"Courier New\", Courier, monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("BOOM", this.width/2, this.height/3 + 50);
    };
}