import EventsManager from "../events/EventsManager.js";
import {PointEvents} from "../SmartPoint/SmartPoint.js";
import {ShapeEvents} from "../SmartShape/SmartShapeEventListener.js";
import {uuid} from "../utils";
import {createEvent} from "../events/functions.js";

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

    this.guid = uuid();

    this.shapeEventListeners = {};

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
     * Setup event handlers for different events, to this resize box
     * should react.
     */
    this.setEventListeners = () => {
        EventsManager.subscribe(PointEvents.POINT_DRAG_MOVE, this.onPointDragMove);
        EventsManager.subscribe(PointEvents.POINT_DRAG_END, this.onPointDragMove);
        ShapeEvents.getShapeMouseEvents().forEach(item => {
            this.shapeEventListeners[item.name] = this.resizeBox.shape.addEventListener(item.name,(event) => {
                EventsManager.emit(item.name,this.resizeBox,event);
            });
        })
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
        const oldPos = this.resizeBox.getPosition();
        this.resizeBox.calcPosition();
        const newPos = this.resizeBox.getPosition();
        this.resizeBox.redraw();
        EventsManager.emit(ShapeEvents.POINT_DRAG_END,this.resizeBox,createEvent(event,{point:event.target}));
        EventsManager.emit(ResizeBoxEvents.RESIZE_BOX_RESIZE,this.resizeBox,createEvent(event,{oldPos,newPos}));
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
     * ResizeBox can emit events, defined in [ResizeBoxEvents](#ResizeBoxEvents) enumeration. So, you can
     * listen any of these events.
     * @param eventName {string} - Name of event. Use one of names, defined in [ResizeBoxEvents](#ResizeBoxEvents)
     * @param handler {function} - Function that used as an event handler
     * @returns {function} - Pointer to added event handler. Should be used to remove event listener later.
     */
    this.addEventListener = (eventName,handler) => {
        if (typeof(this.subscriptions[eventName]) === "undefined") {
            this.subscriptions[eventName] = [];
        }
        const listener = EventsManager.subscribe(eventName, (event) => {
            if (event.target && event.target.guid && event.target.guid === this.resizeBox.guid) {
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
        if (this.subscriptions[eventName] && typeof(this.subscriptions[eventName]) !== "undefined") {
            this.subscriptions[eventName].splice(this.subscriptions[eventName].indexOf(listener), 1);
        }
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
        Object.keys(this.shapeEventListeners).forEach(
            key => {
                this.resizeBox.removeEventListener(key, this.shapeEventListeners[key])
            }
        )
        EventsManager.unsubscribe(PointEvents.POINT_DRAG_MOVE,this.onPointDragMove);
        EventsManager.unsubscribe(PointEvents.POINT_DRAG_END,this.onPointDragMove);
    }
}

export default ResizeBoxEventListener;

/**
 * Enumeration that defines events, that ResizeBox can emit.
 * @param resize {ResizeBoxEvents.RESIZE_BOX_RESIZE} Emitted when user resized the shape by dragging one of marker points.
 * Event object includes fields `oldPos` and
 * `newPos` which are positions of shape before and after resizing.
 * Position is an object with following fields "left,top,right,bottom,width,height"
 * @param create {ShapeEvents.SHAPE_CREATE} Emitted right after shape is created and initialized.
 * Event object contains created shape [SmartShape](#SmartShape) object in a `target` field
 * @param move_start {MouseEvent} Emitted when user presses left mouse button on shape to start dragging.
 * Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mousedown object with additional
 * field `pos`, which is a position of shape when movement started.
 * Position is an object with following fields "left,top,right,bottom,width,height"
 * @param move {MouseEvent} Emitted when user drags shape.
 * Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mousemove object, but also
 * includes additional properties `oldPos` - shape position before previous movement. `newPos` - shape position after
 * previous movement. Position is an object with following fields "left,top,right,bottom,width,height"
 * @param move_end {MouseEvent}  Emitted when user releases mouse button to stop drag the shape.
 * Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseup object with additional
 * field `pos`, which is a position of shape when movement started.
 * Position is an object with following fields "left,top,right,bottom,width,height"
 * @param mousemove {MouseEvent} Emitted when user moves mouse over shape
 * Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mousemove object
 * @param mouseover {MouseEvent} Emitted when mouse cursor goes inside shape
 * Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseover object
 * @param mouseout {MouseEvent} Emitted when mouse cursor goes away from shape
 * Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseout object
 * @param click {MouseEvent} Emitted when click on shape
 * Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) click object
 * @param dblclick {MouseEvent} Emitted when double-click on shape
 * Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) dblclick object
 * @param point_drag_start {MouseEvent} Emitted when user starts dragging one of shape's point. Event Includes `point` field.
 * It is a [SmartPoint](#SmartPoint) object.
 * @param point_drag_move {MouseEvent} Emitted when user dragging one of shape's point. Event Includes `point` field.
 * It is a [SmartPoint](#SmartPoint) object.
 * @param point_drag_end {MouseEvent} Emitted when user finishes dragging one of shape's point. Event Includes `point` field.
 * It is a [SmartPoint](#SmartPoint) object.
 * @param destroy {ShapeEvents.SHAPE_DESTROY} Emitted right before shape is destroyed
 * Event object contains created shape [SmartShape](#SmartShape) object in a `target` field
 * @enum {string}
 */
export const ResizeBoxEvents = {
    RESIZE_BOX_RESIZE: "resize"
};
