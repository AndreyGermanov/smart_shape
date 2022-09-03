import EventsManager from "../events/EventsManager.js";
import {PointEvents} from "../smart_point.js";
import {ResizeBoxEvents} from "./ResizeBox.js";
import {ShapeEvents} from "../smart_shape_event_listener.js";

/**
 * Internal helper class, that contains all event listening logic for the ResizeBox.
 * This class should not be used directly. Each ResizeBox creates an instance of
 * this class automatically during init process
 * @param resizeBox {ResizeBox} Link to owner Shape instance
 * @constructor
 */
function ResizeBoxEventListener(resizeBox) {

    /**
     * @ignore
     * Underlying resizeBox that managed by this event listener
     * @type {ResizeBox}
     */
    this.resizeBox = resizeBox;

    /**
     * @ignore
     * List of subscribers, that subscribed to events, emitted by
     * this ResizeBox. This is an object, that consists of array
     * of event handlers of each event. Each handler is a function
     * that called when event of specified type emitted by
     * this ResizeBox
     * @type {object}
     */
    this.subscriptions = {
        "resize": []
    }

    /**
     * @ignore
     * Initializes and starts this event listener
     * @returns {ResizeBoxEventListener}
     */
    this.run = () => {
        this.setEventListeners();
        return this;
    }

    /**
     * @ignore
     * Setup event handlers for different events, to whic resize box
     * should react.
     */
    this.setEventListeners = () => {
        EventsManager.subscribe(PointEvents.POINT_DRAG_MOVE, this.onPointDragMove);
        EventsManager.subscribe(PointEvents.POINT_DRAG_END, this.onPointDragMove);
        this.shapeMouseEnter = this.resizeBox.shape.addEventListener(ShapeEvents.SHAPE_MOUSE_ENTER,(event) => {
            EventsManager.emit(ShapeEvents.SHAPE_MOUSE_ENTER,this.resizeBox,event);
        });
        this.shapeMouseMove = this.resizeBox.shape.addEventListener(ShapeEvents.SHAPE_MOUSE_MOVE,(event) => {
            EventsManager.emit(ShapeEvents.SHAPE_MOUSE_MOVE,this.resizeBox,event);
        });
        this.shapeMoveStart = this.resizeBox.shape.addEventListener(ShapeEvents.SHAPE_MOVE_START, (event) => {
            EventsManager.emit(ShapeEvents.SHAPE_MOVE_START,this.resizeBox,event);
        });
        this.shapeMoveEnd = this.resizeBox.shape.addEventListener(ShapeEvents.SHAPE_MOVE_END, (event) => {
            EventsManager.emit(ShapeEvents.SHAPE_MOVE_END,this.resizeBox,event);
        });
        this.shapeMove = this.resizeBox.shape.addEventListener(ShapeEvents.SHAPE_MOVE, (event) => {
            EventsManager.emit(ShapeEvents.SHAPE_MOVE,this.resizeBox,event);
        });
    }

    /**
     * @ignore
     * Event handler, that used to react to events, when user drag marker points of
     * ResizeBox.
     * This handler used to automatically adjusts coordinates of other marker points,
     * based on changes from current point, that generated this event.
     * Also, this method emits "resize" event, that can be intercepted by other
     * objects, subscribed to ResizeBox events. For example, [SmartShape](#SmartShape)
     * reacts on it to scale itself when dimensions of ResizeBox changed.
     * @param event {object} Event object, that contains pointer to [SmartPoint](#SmartPoint) that
     * emitted it.
     */
    this.onPointDragMove = (event) => {
        if (!this.resizeBox.shape.isShapePoint(event.target)) {
            return
        }
        switch (event.target) {
            case this.resizeBox.left_top:
                this.onLeftTopDragMove(event);
                break;
            case this.resizeBox.center_top:
                this.onCenterTopDragMove(event);
                break;
            case this.resizeBox.right_top:
                this.onRightTopDragMove(event);
                break;
            case this.resizeBox.right_center:
                this.onRightCenterDragMove(event);
                break;
            case this.resizeBox.right_bottom:
                this.onRightBottomDragMove(event);
                break;
            case this.resizeBox.center_bottom:
                this.onCenterBottomDragMove(event);
                break;
            case this.resizeBox.left_bottom:
                this.onLeftBottomDragMove(event);
                break;
            case this.resizeBox.left_center:
                this.onLeftCenterDragMove(event);
                break;
        }
        this.resizeBox.adjustCenters();
        this.resizeBox.setPointsMoveBounds();
        const oldDims = {
            left:this.resizeBox.left,
            top:this.resizeBox.top,
            right:this.resizeBox.right,
            bottom:this.resizeBox.bottom,
            width:this.resizeBox.width,
            height:this.resizeBox.height
        };
        this.resizeBox.calcPosition();
        const newDims = {
            left:this.resizeBox.left,
            top:this.resizeBox.top,
            right:this.resizeBox.right,
            bottom:this.resizeBox.bottom,
            width:this.resizeBox.width,
            height:this.resizeBox.height
        };
        this.resizeBox.redraw();
        EventsManager.emit(ResizeBoxEvents.RESIZE_BOX_RESIZE,this.resizeBox,{oldDims,newDims});
    }

    /**
     * @ignore
     * Event handler that triggered when change position of left top marker point.
     * @param event {object} Event object, that contains pointer to [SmartPoint](#SmartPoint) that
     * emitted it.
     */
    this.onLeftTopDragMove = (event) => {
        this.resizeBox.left_center.x = event.target.x;
        this.resizeBox.left_bottom.x = event.target.x;
        this.resizeBox.center_top.y = event.target.y;
        this.resizeBox.right_top.y = event.target.y;
    }

    /**
     * @ignore
     * Event handler that triggered when change position of center top marker point.
     * @param event {object} Event object, that contains pointer to [SmartPoint](#SmartPoint) that
     * emitted it.
     */
    this.onCenterTopDragMove = (event) => {
        this.resizeBox.left_top.y = event.target.y;
        this.resizeBox.right_top.y = event.target.y;
    }

    /**
     * @ignore
     * Event handler that triggered when change position of right top marker point.
     * @param event {object} Event object, that contains pointer to [SmartPoint](#SmartPoint) that
     * emitted it.
     */
    this.onRightTopDragMove = (event) => {
        this.resizeBox.left_top.y = event.target.y;
        this.resizeBox.center_top.y = event.target.y;
        this.resizeBox.right_center.x = event.target.x;
        this.resizeBox.right_bottom.x = event.target.x;
    }

    /**
     * @ignore
     * Event handler that triggered when change position of right center marker point.
     * @param event {object} Event object, that contains pointer to [SmartPoint](#SmartPoint) that
     * emitted it.
     */
    this.onRightCenterDragMove = (event) => {
        this.resizeBox.right_top.x = event.target.x;
        this.resizeBox.right_bottom.x = event.target.x;
    }

    /**
     * @ignore
     * Event handler that triggered when change position of right bottom marker point.
     * @param event {object} Event object, that contains pointer to [SmartPoint](#SmartPoint) that
     * emitted it.
     */
    this.onRightBottomDragMove = (event) => {
        this.resizeBox.right_top.x = event.target.x;
        this.resizeBox.right_center.x = event.target.x;
        this.resizeBox.left_bottom.y = event.target.y;
        this.resizeBox.center_bottom.y = event.target.y;
    }

    /**
     * @ignore
     * Event handler that triggered when change position of center bottom marker point.
     * @param event {object} Event object, that contains pointer to [SmartPoint](#SmartPoint) that
     * emitted it.
     */
    this.onCenterBottomDragMove = (event) => {
        this.resizeBox.left_bottom.y = event.target.y;
        this.resizeBox.right_bottom.y = event.target.y;
    }

    /**
     * @ignore
     * Event handler that triggered when change position of left bottom marker point.
     * @param event {object} Event object, that contains pointer to [SmartPoint](#SmartPoint) that
     * emitted it.
     */
    this.onLeftBottomDragMove = (event) => {
        this.resizeBox.center_bottom.y = event.target.y;
        this.resizeBox.right_bottom.y = event.target.y;
        this.resizeBox.left_center.x = event.target.x;
        this.resizeBox.left_top.x = event.target.x;
    }

    /**
     * @ignore
     * Event handler that triggered when change position of left center marker point.
     * @param event {object} Event object, that contains pointer to [SmartPoint](#SmartPoint) that
     * emitted it.
     */
    this.onLeftCenterDragMove = (event) => {
        this.resizeBox.left_bottom.x = event.target.x;
        this.resizeBox.left_top.x = event.target.x;
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
            if (event.target.shape.guid === this.resizeBox.shape.guid) {
                handler(event)
            }
        });
        this.subscriptions[eventName].push(listener);
        return listener;
    }

    /**
     * @ignore
     * Uniform method that used to remove event handler, that previously added
     * to this object.
     * @param eventName {ResizeBoxEvents|string} Name of event to remove listener from
     * @param listener {function} Pointer to event listener, that added previously.
     * It was returned from [addEventListener](#ResizeBox+addEventListener) method.
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
        this.resizeBox.shape.removeEventListener(ShapeEvents.SHAPE_MOVE_START,this.shapeMoveStart);
        this.resizeBox.shape.removeEventListener(ShapeEvents.SHAPE_MOVE,this.shapeMove);
        this.resizeBox.shape.removeEventListener(ShapeEvents.SHAPE_MOVE_END,this.shapeMoveEnd);
        this.resizeBox.shape.removeEventListener(ShapeEvents.SHAPE_MOUSE_ENTER,this.shapeMouseEnter);
        this.resizeBox.shape.removeEventListener(ShapeEvents.SHAPE_MOUSE_MOVE,this.shapeMouseMove);
        EventsManager.unsubscribe(PointEvents.POINT_DRAG_MOVE,this.onPointDragMove);
        EventsManager.unsubscribe(PointEvents.POINT_DRAG_END,this.onPointDragMove);
    }
}

export default ResizeBoxEventListener;
