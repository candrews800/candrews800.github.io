function StartMenuState(canvas, canvasId, width, height) {
    this.initUI = function() {
        var easyButton = new Button({
            x: this.width/4,
            y: this.height/4 + 100,
            w: 125,
            h: 50,
            text: "Easy",
            renderStyle: "center",
            onClick: function () {
                Minesweeper.fireEvent('start', {
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
                Minesweeper.fireEvent('start', {
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
                Minesweeper.fireEvent('start', {
                    difficulty: 'hard'
                });
            }
        });
        this.objects.push(hardButton);
    };

    this.renderUI = function() {
        var ctx = this.canvas.getContext();
        ctx.fillStyle = '#333333';
        ctx.fillRect(0,0,this.width,this.height);

        ctx.fillStyle = '#ffffff';
        ctx.font = "48px \"Courier New\", Courier, monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("Minesweeper", this.width/2, this.height/4);
    };

    GameState.call(this, canvas, canvasId, width, height);
}