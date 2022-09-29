/**
 * Used as a singleton object to emit events and subscribe to these events.
 * One object can subscribe to events of specified type, other object can emit events of this type.
 * Each time when object emits event, all subscribed event handlers triggered.
 * @constructor
 */

function EventsManager() {

    /**
     * Hashmap of all registered event subscriptions.
     * Keys are event names as strings. Values are arrays of functions.
     * Several handlers can subscribe to each event by providing function that should be triggered.
     * this.subscriptions[event_name] = [handler_func,handler_func ...]
     * @type {object}
     */
    this.subscriptions = {};

    /**
     * Add subscription to event of specified type or to array of events of specified types
     * @param events {string|array} Name of event as a string or names of events as an array of strings.
     * @param handler {function} Handling function, which will be called each time when event of this type emitted.
     * Each time, when handling function triggered, it receives a single argument - `event` {object} which contains
     * the following fields: `type` - type of event (`eventType`), `target` - pointer to object, which emitted
     * this event, and also any custom params, that emitter sent with this event by using `emit` method.
     * @returns {function} Pointer to handling function, that will be added
     */
    this.subscribe = (events,handler) => {
        if (typeof(events) === "string") {
            return this.subscribeToEvent(events,handler)
        } else if (typeof(events) === "object") {
            for (let event of events) {
                this.subscribeToEvent(event,handler)
            }
            return handler;
        }
        return null;
    }

    /**
     * @ignore
     * Add subscription to event of specified type
     * @param eventName {string|array} Name of event as a string or array of names of events to subscribe to
     * @param handler {function} Handling function, which will be called each time when event of this type emitted.
     * Each time, when handling function triggered, it receives a single argument - `event` {object} which contains
     * the following fields: `type` - type of event (`eventType`), `target` - pointer to object, which emitted
     * this event, and also any custom params, that emitter sent with this event by using `emit` method.
     * @returns {function} Pointer to handling function, that will be added
     */
    this.subscribeToEvent = (eventName,handler) => {
        if (typeof(this.subscriptions[eventName]) === "undefined" || !this.subscriptions[eventName]) {
            this.subscriptions[eventName] = [];
        }
        if (typeof(this.subscriptions[eventName].find(h => h === handler)) !== "undefined") {
            return null;
        }
        this.subscriptions[eventName].push(handler);
        return handler;
    }

    /**
     * Emits event of specified name. Based on specified arguments, it constructs `event` object, that contains
     * the following fields: `type` - eventName, `target` - object that emitted this event and any other fields
     * that received from `params` argument. Then, all subscribers will receive this `event` object to their handling
     * functions.
     * @param eventName {string} Name of event to emit.
     * @param target {object} Which object emitted this event.
     * @param params {object} Event specific params. Can be any number of params.
     * @returns {boolean} True if this event triggered at least of one handler, or false if it does not.
     */
    this.emit = (eventName,target,params=null) => {
        if (!params || typeof(params) !== "object") {
            params = {}
        }
        params["type"] = eventName;
        params["target"] = target;
        if (typeof(this.subscriptions[eventName]) !== "undefined" && this.subscriptions[eventName] &&
        this.subscriptions[eventName].length) {
            for (let handler of this.subscriptions[eventName]) {
                handler(params)
            }
            return true;
        }
        return false;
    }

    /**
     * Removes specified handler from event with specified name or from array of events with specified names.
     * @param events {string|array} Name of event as a string or names of events as an array of strings.
     * @param handler {function} Pointer to a function to remove. (This pointer returned from `subscribe` method and
     * can be used here to unsubscribe
     * @returns {boolean} True if really removed the handler or false if you could not remove because it does not exist
     */
    this.unsubscribe = (events, handler) => {
        let result = false;
        if (typeof(events) === "string") {
            if (this.unsubscribeFromEvent(events,handler)) {
                result = true;
            }
        } else if (typeof(events) === "object") {
            for (let event of events) {
                if (this.unsubscribeFromEvent(event,handler)) {
                    result = true;
                }
            }
        }
        return result;
    }

    /**
     * @ignore
     * Removes specified handler from event with specified name.
     * @param eventName {string} Name of event as a string
     * @param handler {function} Pointer to a function to remove. (This pointer returned from `subscribe` method and
     * can be used here to unsubscribe
     * @returns {boolean} True if really removed the handler or false if you could not remove because it does not exist
     */
    this.unsubscribeFromEvent = (eventName,handler) => {
        if (typeof(this.subscriptions[eventName]) === "undefined" || !this.subscriptions[eventName]) {
            return false
        }
        const index = this.subscriptions[eventName].indexOf(handler);
        if (index !== -1) {
            this.subscriptions[eventName].splice(index,1);
            return true;
        }
        return false;
    }

    /**
     * Method removes all subscriptions to events.
     */
    this.clear = () => {
        this.subscriptions = {};
    }
}

export default new EventsManager();
