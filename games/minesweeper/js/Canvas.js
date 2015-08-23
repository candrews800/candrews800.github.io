function Canvas(canvasId, width, height){
    this.width = width;
    this.height = height;

    var canvas = document.getElementById(canvasId);
    canvas.width = width;
    canvas.height = height;
    this.ctx = canvas.getContext("2d");
}

Canvas.prototype.clear = function() {
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0,0,canvas.width,canvas.height);
};

Canvas.prototype.getContext = function() {
    return this.ctx;
};