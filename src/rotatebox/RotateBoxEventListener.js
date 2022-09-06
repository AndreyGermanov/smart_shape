import EventsManager from "../events/EventsManager.js";
import {RotateBoxEvents} from "./RotateBox.js";
import {ShapeEvents} from "../smart_shape_event_listener.js";
import {distance, radians_to_degrees} from "../utils.js";

/**
 * Internal helper class, that contains all event listening logic for the RotateBox.
 * This class should not be used directly. Each RotateBox creates an instance of
 * this class automatically during init process
 * @param rotateBox {RotateBox} Link to owner Shape instance
 * @constructor
 */
function RotateBoxEventListener(rotateBox) {

    /**
     * @ignore
     * Underlying rotateBox that managed by this event listener
     * @type {RotateBox}
     */
    this.rotateBox = rotateBox;

    /**
     * @ignore
     * List of subscribers, that subscribed to events, emitted by
     * this RotateBox. This is an object, that consists of array
     * of event handlers of each event. Each handler is a function
     * that called when event of specified type emitted by
     * this RotateBox
     * @type {object}
     */
    this.subscriptions = {
        "rotate": []
    }

    /**
     * @ignore
     * Initializes and starts this event listener
     * @returns {RotateBoxEventListener}
     */
    this.run = () => {
        this.setEventListeners();
        return this;
    }

    /**
     * @ignore
     * Setup event handlers for different events, to this rotate box
     * should react.
     */
    this.setEventListeners = () => {
        this.shapeMouseEnter = this.rotateBox.shape.addEventListener(ShapeEvents.SHAPE_MOUSE_ENTER,(event) => {
            EventsManager.emit(ShapeEvents.SHAPE_MOUSE_ENTER,this.rotateBox,event);
        });
        this.shapeMouseMove = this.rotateBox.shape.addEventListener(ShapeEvents.SHAPE_MOUSE_MOVE,(event) => {
            EventsManager.emit(ShapeEvents.SHAPE_MOUSE_MOVE,this.rotateBox,event);
        });
        this.shapeMoveStart = this.rotateBox.shape.addEventListener(ShapeEvents.SHAPE_MOVE_START, (event) => {
            EventsManager.emit(ShapeEvents.SHAPE_MOVE_START,this.rotateBox,event);
        });
        this.shapeMoveEnd = this.rotateBox.shape.addEventListener(ShapeEvents.SHAPE_MOVE_END, (event) => {
            EventsManager.emit(ShapeEvents.SHAPE_MOVE_END,this.rotateBox,event);
        });
        this.shapeMove = this.rotateBox.shape.addEventListener(ShapeEvents.SHAPE_MOVE, (event) => {
            EventsManager.emit(ShapeEvents.SHAPE_MOVE,this.rotateBox,event);
        });
        this.rotateBox.shape.eventListener.mousemove = this.mousemove;
    }

    /**
     * @ignore
     * Uniform method that used to add event handler of specified type to this object.
     * @param eventName {string} - Name of event
     * @param handler {function} - Function that used as an event handler
     * @returns {function} - Pointer to added event handler. Should be used to remove event listener later.
     */
    this.addEventListener = (eventName,handler) => {
        if (typeof(this.subscriptions[eventName]) === "undefined") {
            this.subscriptions[eventName] = [];
        }
        const listener = EventsManager.subscribe(eventName, (event) => {
            if (event.target.shape && event.target.shape.guid === this.rotateBox.shape.guid) {
                handler(event)
            }
        });
        this.subscriptions[eventName].push(listener);
        return listener;
    }

    this.mousemove = (event) => {
        EventsManager.emit(ShapeEvents.SHAPE_MOUSE_MOVE,this.rotateBox.shape, {clientX:event.clientX,clientY:event.clientY});
        if (event.buttons !== 1) {
            if (this.rotateBox.shape.root.draggedShape) {
                this.rotateBox.shape.root.draggedShape.draggedPoint = null;
                this.rotateBox.shape.root.draggedShape = null;
            }
            return
        }
        let clientX = event.clientX+window.scrollX;
        let clientY = event.clientY+window.scrollY;
        const basePoint = this.rotateBox.shape.draggedPoint;
        let angle = 0;
        if (basePoint === this.rotateBox.left_top) {
            if (clientX<basePoint.x && clientY<basePoint.y) {
                clientX = basePoint.x;
            }
            if (clientX>basePoint.x && clientY>basePoint.y) {
                clientY = basePoint.y;
            }
            const hyp = distance(clientX,clientY,basePoint.x,basePoint.y);
            let catet = distance(clientX,clientY,basePoint.x,clientY)*-1;
            if (clientX>basePoint.x) {
                catet = distance(clientX,clientY,clientX,basePoint.y);
            }
            if (hyp>0) {
                angle = radians_to_degrees(Math.asin(catet/hyp));
            }
        }
        EventsManager.emit(RotateBoxEvents.ROTATE_BOX_ROTATE,this.rotateBox,{angle});
    }

    /**
     * @ignore
     * Uniform method that used to remove event handler, that previously added
     * to this object.
     * @param eventName {RotateBoxEvents|string} Name of event to remove listener from
     * @param listener {function} Pointer to event listener, that added previously.
     * It was returned from [addEventListener](#RotateBox+addEventListener) method.
     */
    this.removeEventListener = (eventName,listener) => {
        this.subscriptions[eventName].splice(this.subscriptions[eventName].indexOf(listener),1);
        EventsManager.unsubscribe(eventName,listener)
    }

    /**
     * @ignore
     * Method used to destroy the object. Removes all event subscriptions.
     */
    this.destroy = () => {
        for (let eventName in this.subscriptions) {
            const handlers = this.subscriptions[eventName];
            handlers.forEach(handler => EventsManager.unsubscribe(eventName,handler));
            this.subscriptions[eventName] = [];
        }
        this.rotateBox.shape.removeEventListener(ShapeEvents.SHAPE_MOVE_START,this.shapeMoveStart);
        this.rotateBox.shape.removeEventListener(ShapeEvents.SHAPE_MOVE,this.shapeMove);
        this.rotateBox.shape.removeEventListener(ShapeEvents.SHAPE_MOVE_END,this.shapeMoveEnd);
        this.rotateBox.shape.removeEventListener(ShapeEvents.SHAPE_MOUSE_ENTER,this.shapeMouseEnter);
        this.rotateBox.shape.removeEventListener(ShapeEvents.SHAPE_MOUSE_MOVE,this.shapeMouseMove);
    }
}

export default RotateBoxEventListener;
