/**
 * Used as a singleton object to emit events and subscribe to these events.
 * One object can subscribe to events of specified type, other object can emit events.
 * Each time when object emits event, all subscribed event handlers triggered.
 * @constructor
 */
function EventsManager() {

    /**
     * 2D Array of events: array[event_type] = [array of handlers].
     * `event_type` is string, `handler` is function
     * @type {array}
     */
    this.events = [];

    /**
     * Add subscription to event of specified type
     * @param eventType {string} Event type to subscribe to
     * @param handler {function} Handling function, which will be called each time when event of this type emitted.
     * Each time, when handling function triggered, it receives a single argument - `event` {object} which contains
     * the following fields: `type` - type of event (`eventType`), `target` - pointer to object, which emitted
     * this event, and also any custom params, that emitter sent with this event by using `emit` method.
     * @returns {function} Pointer to handling function, that will be added
     */
    this.subscribe = (eventType,handler) => {
        if (typeof(this.events[eventType]) === "undefined" || !this.events[eventType]) {
            this.events[eventType] = [];
        }
        if (typeof(this.events[eventType].find(h => h == handler)) !== "undefined") {
            return null;
        }
        this.events[eventType].push(handler);
        return handler;
    }

    /**
     * Emits event of specified type. Based on specified arguments, it constructs `event` object, that contains
     * from the following fields: `type` - eventType, `target` - object that emitted this event and any other fields
     * that received from `params` argument. Then, all subscribers will receive this `event` object to their handling
     * functions.
     * @param eventType {string} Type of event to emit.
     * @param target {object} Which object emitted this event.
     * @param params {object} Event specific params. Can be any number of params.
     * @returns {boolean} True if this event triggered at least of one handlers, or false if does not.
     */
    this.emit = (eventType,target,params=null) => {
        if (!params || typeof(params) !== "object") {
            params = {}
        }
        params["type"] = eventType;
        params["target"] = target;
        if (typeof(this.events[eventType]) !== "undefined" && this.events[eventType] && this.events[eventType].length) {
            this.events[eventType].forEach(handler => handler(params));
            return true;
        }
        return false;
    }

    /**
     * Removes specified handler from specified type of event.
     * @param eventType {string} Type of event
     * @param handler {function} Pointer to a function to remove. (This pointer returned from `subscribe` method and
     * can be used here to unsubscribe
     * @returns {boolean} True if really removed the handler or false if could not remove because it does not exist
     */
    this.unsubscribe = (eventType, handler) => {
        if (typeof(this.events[eventType]) === "undefined" || !this.events[eventType]) {
            return false
        }
        const index = this.events[eventType].indexOf(handler);
        if (index !== -1) {
            this.events[eventType].splice(index,1);
            return true;
        }
        return false;
    }

    /**
     * Method removes all subscriptions to events.
     */
    this.clear = () => {
        this.events = [];
    }
}

export default new EventsManager();
