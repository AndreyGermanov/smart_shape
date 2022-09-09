import EventsManager from "../events/EventsManager.js";
import {RotateBoxEvents} from "./RotateBox.js";
import {ShapeEvents} from "../smart_shape_event_listener.js";
import {distance, radians_to_degrees} from "../utils.js";
import {PointEvents} from "../smart_point.js";

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
     * Initial rotation angle when user presses one of rotation buttons
     * @type {number}
     */
    this.initialAngle = 0;

    /**
     * @ignore
     * Rotation angle from previous rotate event. Used to measure difference
     * between previous rotate event and current rotation event.
     * @type {number}
     */
    this.previousAngle = 0;

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
            setTimeout(() => {
                EventsManager.emit(ShapeEvents.SHAPE_MOUSE_ENTER,this.rotateBox,event);
            },1)
        });
        this.shapeMouseMove = this.rotateBox.shape.addEventListener(ShapeEvents.SHAPE_MOUSE_MOVE,(event) => {
            setTimeout(() => {
                EventsManager.emit(ShapeEvents.SHAPE_MOUSE_MOVE,this.rotateBox,event);
            },1)
        });
        this.shapeMoveStart = this.rotateBox.shape.addEventListener(ShapeEvents.SHAPE_MOVE_START, (event) => {
            setTimeout(() => {
                EventsManager.emit(ShapeEvents.SHAPE_MOVE_START,this.rotateBox,event);
            },1)
        });
        this.shapeMoveEnd = this.rotateBox.shape.addEventListener(ShapeEvents.SHAPE_MOVE_END, (event) => {
            setTimeout(() => {
                this.previousAngle = 0;
                EventsManager.emit(ShapeEvents.SHAPE_MOVE_END,this.rotateBox,event);
            },1)
        });
        this.shapeMove = this.rotateBox.shape.addEventListener(ShapeEvents.SHAPE_MOVE, (event) => {
            setTimeout(() => {
                EventsManager.emit(ShapeEvents.SHAPE_MOVE,this.rotateBox,event);
            },1)
        });
        this.shapeClick = this.rotateBox.shape.addEventListener(ShapeEvents.SHAPE_MOUSE_CLICK, (event) => {
            setTimeout(() => {
                EventsManager.emit(ShapeEvents.SHAPE_MOUSE_CLICK,this.rotateBox,event);
            },1)
        });
        this.rotateBox.shape.points.forEach(point => {
            point.mousemove = this.mousemove;
            point.mouseDownListener = point.addEventListener(PointEvents.POINT_DRAG_START, (event) => {
                this.onPointMouseDown(event);
            });
            point.mouseUpListener = point.addEventListener(PointEvents.POINT_DRAG_END, (event) => {
                this.onPointMouseUp(event);
            });

        });
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

    /**
     * @ignore
     * onMouseMove event handler, triggered when user moves mouse over the shape or container element.
     * @param event {MouseEvent} Event object
     */
    this.mousemove = (event) => {
        if (event.buttons !== 1) {
            if (this.rotateBox.shape.root.draggedShape) {
                this.rotateBox.shape.root.draggedShape.draggedPoint = null;
                this.rotateBox.shape.root.draggedShape = null;
            }
            EventsManager.emit(ShapeEvents.SHAPE_MOUSE_MOVE,this.rotateBox.shape, {clientX:event.clientX,clientY:event.clientY});
            return
        }
        let clientX = event.clientX+window.scrollX;
        let clientY = event.clientY+window.scrollY;
        const centerX = this.rotateBox.shape.left+this.rotateBox.shape.width/2;
        const centerY = this.rotateBox.shape.top+this.rotateBox.shape.height/2;
        let hypotenuse = distance(clientX,clientY,centerX,centerY);
        let cathetus = 0;
        let start_angle = 0;
        if (clientX < centerX && clientY < centerY) {
            cathetus = distance(clientX,clientY,clientX,centerY)
        }
        if (clientX > centerX && clientY < centerY) {
            start_angle = 90;
            cathetus = distance(clientX,clientY,centerX,clientY);
        }
        if (clientX > centerX && clientY > centerY) {
            start_angle = 180;
            cathetus = distance(clientX,clientY,clientX,centerY);
        }
        if (clientX < centerX && clientY > centerY) {
            start_angle = 270;
            cathetus = distance(clientX,clientY,centerX,clientY);
        }
        if (hypotenuse > 0) {
            let angle = Math.round(radians_to_degrees((Math.asin(cathetus/hypotenuse))) + start_angle + this.initialAngle);
            let angleDiff = angle;
            if (this.previousAngle) {
                angleDiff -= this.previousAngle;
            }
            this.previousAngle = angle;
            EventsManager.emit(RotateBoxEvents.ROTATE_BOX_ROTATE,this.rotateBox,{angle:Math.round(angleDiff)});
        }
    }

    /**
     * @ignore
     * onMouseDown event for marker points
     * @param event {MouseEvent} Standard Mouse event object
     */
    this.onPointMouseDown = (event) => {
        switch (event.target) {
            case this.rotateBox.left_top:
                this.initialAngle = -45;
                break;
            case this.rotateBox.right_top:
                this.initialAngle = -135;
                break;
            case this.rotateBox.right_bottom:
                this.initialAngle = -225;
                break;
            case this.rotateBox.left_bottom:
                this.initialAngle = -315;
                break;
        }
        this.rotateBox.shape.points.forEach(point => point.setOptions({visible:false}));
    }

    /**
     * @ignore
     * onMouseUp event for marker points
     * @param _event {MouseEvent} Standard Mouse event object
     */
    this.onPointMouseUp = (_event) => {
        this.rotateBox.shape.points.forEach(point => {
            point.setOptions({visible:true});
            point.redraw();
        });

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
        this.rotateBox.shape.points.forEach(point => {
            point.removeEventListener(PointEvents.POINT_DRAG_START, point.mouseDownListener);
            point.removeEventListener(PointEvents.POINT_DRAG_START, point.mouseUpListener);
        });
    }
}

export default RotateBoxEventListener;
