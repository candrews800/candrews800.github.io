function GameObject(x, y) {

    this.x = x;
    this.y = y;

    /**
     * Check is mouse is hovering an object
     * @param event
     */
    this.isBeingHovered = function (event) {
        var x, y;
        if (event.constructor.name === 'MouseEvent') {
            x = event.offsetX;
            y = event.offsetY;
        } else if (event.constructor.name === 'TouchEvent') {
            var touchOffsets = getOffsets(event.touches[0].target);

            x = event.touches[0].pageX - touchOffsets.offsetLeft;
            y = event.touches[0].pageY - touchOffsets.offsetTop;
        }

        var insideX = this.x < x && x <= this.x + this.w;
        var insideY = this.y < y && y <= this.y + this.h;

        alert('t');

        return insideX && insideY;
    };

    function getOffsets(elem) {
        var offsetLeft = 0, offsetTop = 0;
        do {
            offsetLeft += elem.offsetLeft;
            offsetTop += elem.offsetTop;
        } while (elem = elem.offsetParent);

        return {
            offsetLeft: offsetLeft,
            offsetTop: offsetTop
        }
    }
}

GameObject.prototype.update =  function() {
    console.log('GameObject.update');
};

GameObject.prototype.render = function() {
    console.log('GameObject.render');
};