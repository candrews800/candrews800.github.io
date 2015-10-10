function Button(options) {
    if (options.renderStyle == "center") {
        this.x = options.x - options.w/2;
    } else {
        this.x = options.x;
    }
    this.y = options.y;
    this.w = options.w;
    this.h = options.h;

    GameObject.call(this, this.x, this.y);

    this.text = options.text;
    this.onClick = options.onClick;
    this.backgroundColor = '#cccccc';
    this.fontColor = 'black';
    this.backgroundHoverColor = 'red';
    this.fontHoverColor = 'white';
    this.font = "20px \"Courier New\", Courier, monospace";
    this.textBaseline = "middle";
    this.textAlign = "center";
};

Button.prototype.update = function() {

};

Button.prototype.render = function(ctx) {
    if (this.hover) {
        // Fill BG
        ctx.fillStyle = this.backgroundHoverColor;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        // Write Text
        ctx.fillStyle = this.fontHoverColor;
        ctx.font = this.font;
        ctx.textBaseline = this.textBaseline;
        ctx.textAlign = this.textAlign;
        ctx.fillText(this.text, this.x + this.w/2, this.y + this.h/2);
    } else {
        // Fill BG
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        // Write Text
        ctx.fillStyle = this.fontColor;
        ctx.font = this.font;
        ctx.textBaseline = this.textBaseline;
        ctx.textAlign = this.textAlign;
        ctx.fillText(this.text, this.x + this.w/2, this.y + this.h/2);
    }
};

Button.prototype.processInput = function(event) {
    this.hover = false;
    if (typeof event === 'undefined' || !this.isBeingHovered(event)) {
        return;
    }

    if (event.type == 'mousemove') {
        this.hover = true;
    }

    if (event.type == 'mousedown') {
        this.onClick();
    }

    if (event.type == 'touchstart') {
        this.onClick();
    }
};