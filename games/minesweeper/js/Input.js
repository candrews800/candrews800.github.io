function Input(){
    this.events = [];
}

Input.prototype.addWatchers = function(elementId) {
    var that = this;
    var element = document.getElementById(elementId);

    element.addEventListener('mousedown', function(e) {
        e.preventDefault();
        that.registerEvent(e);
    });

    element.addEventListener('touchstart', function(e) {
        alert(e);
        that.registerEvent(e);
    });

    element.addEventListener('mousemove', function(e) {
        e.preventDefault();
        that.registerHover(e);
    });

    // Prevent Right Click
    element.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    }, false);
};

Input.prototype.registerHover = function(event) {
    this.hover = event;
};

Input.prototype.registerEvent = function(event) {
    this.events.push(event);
};

Input.prototype.getEvents = function() {
    // Get last hover position and add to begin
    this.events.unshift(this.hover);

    return this.events;
};