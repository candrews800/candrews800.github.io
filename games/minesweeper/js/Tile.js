function Tile(col, row, tileSize, offset, startPos) {
    GameObject.call(this, col*tileSize + offset.x, row*tileSize + offset.y);

    this.row = row;
    this.col = col;
    this.w = tileSize;
    this.h = tileSize;

    this.startX = this.x;
    this.startY = this.y;

    var game = Minesweeper.getInstance();
    var rand = Math.floor((Math.random() * 4));
    this.x = Math.floor((Math.random() * game.width - this.w));
    this.y = Math.floor((Math.random() * game.height - this.h));

    this.revealed = false;

    this.setType = function(type) {
        this.type = type;
    };
}

Tile.prototype.update = function() {
    if (this.clicked && ! this.revealed) {
        if (this.type == 'BOMB') {
            Minesweeper.fireEvent('bomb-click');
        } else if (this.nearbyBombs == 0) {
            Minesweeper.fireStateEvent('open-tile-click', {row: this.row, col: this.col});
        } else {
            Minesweeper.fireStateEvent('tile-click', {row: this.row, col: this.col});
        }
        this.revealed = true;
    }

    if (this.revealed) {
        if(this.type == 'SAFE') {
            this.color = 'white';
        } else if (this.type == 'BOMB') {
            this.color = 'red';
        }
    } else {
        if (this.hovered) {
            this.color = '#bbbbbb';
        } else {
            this.color = '#cccccc';
        }
    }

    // Clear Inputs
    this.hovered = false;
    this.clicked = false;

    // Animate Tiles moving to starting place
    if (this.x < this.startX) {
        this.x += Math.ceil((this.startX - this.x)*0.1)
    } else if (this.x > this.startX) {
        this.x -= Math.ceil((this.x - this.startX)*0.1)
    }

    if (this.y < this.startY) {
        this.y += Math.ceil((this.startY - this.y)*0.1)
    } else if (this.y > this.startY) {
        this.y -= Math.ceil((this.y - this.startY)*0.1)
    }
};

Tile.prototype.render = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.w, this.h);


    if (this.revealed) {
        ctx.fillStyle = 'black';
        ctx.font = "bold " + this.w * 0.5 + "px \"Courier New\", Courier, monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        if (typeof this.type == 'BOMB') {
            ctx.font = "10px serif";
            ctx.fillText('*boom*', this.x + this.w/2, this.y + this.h/2);
        } else if (this.nearbyBombs) {
            ctx.fillStyle = this.getFillColor(this.nearbyBombs);
            ctx.fillText(this.nearbyBombs, this.x + this.w/2, this.y + this.h/2);
        }
    } else if (this.flagged) {
        ctx.fillStyle = 'red';
        ctx.font = this.w * 0.75 + "px serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText('\u2691', this.x + this.w/2, this.y + this.h/2);
    }
};

Tile.prototype.processInput = function(event) {
    if (typeof event === 'undefined' || !this.isBeingHovered(event)) {
        return;
    }

    if (event.type == 'mousemove') {
        this.hover = true;
    }

    if (event.type == 'mousedown') {
        if (event.which == 2 || event.which == 3 && !this.revealed) {
            // On Right Click
            if (this.flagged) {
                this.flagged = false;
                Minesweeper.fireStateEvent('unflag');
            } else {
                this.flagged = true;
                Minesweeper.fireStateEvent('flag');
            }
        } else {
            // On Normal Click
            this.clicked = true;
            if (this.flagged) {
                this.flagged = false;
                Minesweeper.fireStateEvent('unflag');
            }
        }
    }

    if (event.type == 'touchstart') {
        this.clicked = true;
    }
};

Tile.prototype.getNearbyBombs = function (allTiles) {
    var i, tile;
    this.nearbyBombs = 0;

    for(i = 0; i < allTiles.length; i++) {
        tile = allTiles[i];

        if (tile.type == 'BOMB') {
            if (tile.row == this.row && tile.col - 1 == this.col) {
                // Up
                this.nearbyBombs++;
            } else if (tile.row - 1 == this.row && tile.col - 1 == this.col) {
                // Up Right
                this.nearbyBombs++;
            } else if (tile.row - 1 == this.row && tile.col == this.col) {
                // Right
                this.nearbyBombs++;
            } else if (tile.row - 1 == this.row && tile.col + 1 == this.col) {
                // Down Right
                this.nearbyBombs++;
            } else if (tile.row == this.row && tile.col + 1 == this.col) {
                // Down
                this.nearbyBombs++;
            } else if (tile.row + 1 == this.row && tile.col + 1 == this.col) {
                // Down Left
                this.nearbyBombs++;
            } else if (tile.row + 1== this.row && tile.col == this.col) {
                // Left
                this.nearbyBombs++;
            } else if (tile.row + 1 == this.row && tile.col - 1 == this.col) {
                // Up Left
                this.nearbyBombs++;
            }
        }
    }
};

Tile.prototype.getFillColor = function(num){
    switch(num) {
        case 1:
            return 'blue';
        case 2:
            return 'green';
        case 3:
            return 'red';
        case 4:
            return '#000080';
        case 5:
            return 'brown';
        case 6:
            return '#00FFFF';
        case 7:
            return 'black';
        case 8:
            return 'orange';
        default:
            return 'black';
    }
}