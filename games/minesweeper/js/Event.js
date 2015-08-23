function GameEvent(){
    this.listeners = [];
    this.queue = [];
}

GameEvent.prototype.addListener = function(event_name, cb) {
    this.listeners.push({
        name: event_name,
        callback: cb
    });
};

GameEvent.prototype.hasListener = function(event_name) {
    var i;
    for(i=0;i<this.listeners.length;i++){
        if (this.listeners[i].name == event_name) {
            return this.listeners[i];
        }
    }
    return false;
};

GameEvent.prototype.fire = function(event_name, options) {
    var listener = this.hasListener(event_name);
    if (typeof options !== 'undefined') {
        listener.options = options;
    }
    if (listener) {
        this.queue.push(listener);
    }
};

GameEvent.prototype.process = function() {
    var event;
    while(event = this.queue.pop()) {
        if (typeof event.options !== 'undefined') {
            event.callback(event.options);
        } else {
            event.callback();
        }
    }
};