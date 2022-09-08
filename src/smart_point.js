import {getOffset, getRotatedCoords, pauseEvent, uuid} from "./utils.js";
import EventsManager from "./events/EventsManager.js";
import {ContainerEvents} from "./smart_shape_event_listener.js";
/**
 * Class that represents a single point on the screen.
 * Can be created directly using class constructor, but more often they added by using `addPoint`, `addPoints`
 * methods of [SmartShape](#SmartShape) class or interactively when
 * user double-clicks on shape's container.
 * @returns {object} SmartPoint object that should be initialized by `init` method.
 * @constructor
 */
function SmartPoint() {
    /**
     * Point HTML element options. Defines look and behavior of point. Has the following parameters.
     * @param id {string} Id of point HTML element. Default empty.
     * @param width {number} Width of point in pixels. Default: `10`.
     * @param height {number} Height of point in pixels. Default `10`.
     * @param classes {string} CSS class or classes of point, delimited by comma. Default empty.
     * @param style {object} CSS styles, that override classes. Must be provided as an object. Default see in code.
     * (The same as ["style" HTML attribute](https://www.w3schools.com/jsref/prop_html_style.asp))
     * @param canDrag {boolean} Is it allowed to drag this point by mouse to change it positions. Default `true`
     * @param canDelete {boolean} Is it allowed to delete this point by right mouse click. Default `true`.
     * @param zIndex {number} Order of element in a stack of HTML elements
     * (https://www.w3schools.com/cssref/pr_pos_z-index.asp). Elements if higher z-index value placed on top.
     * @param bounds {object} Bounds for point movement. If setup, then it's impossible to drag point beyond
     * bounds. It must be an object of the following format: `{left:number,top:number,right:number,bottom:number}`.
     * If created using `SmartShape`, then it automatically set this object to the dimensions of shape's container.
     * @param moveDirections {array}. Defines in which directions point can move. Can contain
     * values from [PointMoveDirections](#PointMoveDirections) enumeration. By default, all directions allowed. Default
     * value is:
     * `[PointMoveDirections.LEFT,PointMoveDirections.TOP,PointMoveDirections.RIGHT, PointMoveDirections.BOTTOM]`.
     * To restrict movement in any direction, need to remove some directions from this array.
     * @param visible {boolean} Point is visible or not. By default, `true`.
     * @param forceDisplay {boolean} If this option enabled, than this point displayed all the time, even if shape
     * is not in SCALE or ROTATE mode
     * @type {{}}
     */
    this.options = {
        id:"",
        width:10,
        height:10,
        classes: "",
        style: {
            borderWidth:"1px",
            borderStyle:"solid",
            borderColor:"black",
            borderRadius: "25px",
            position:'absolute',
            cursor:'pointer',
            backgroundColor: "red",
        },
        canDrag: true,
        canDelete: false,
        zIndex:1000,
        bounds:{},
        moveDirections: [
            PointMoveDirections.LEFT,
            PointMoveDirections.TOP,
            PointMoveDirections.RIGHT,
            PointMoveDirections.BOTTOM
        ],
        visible: true,
        forceDisplay: false
    };

    /**
     * X coordinate of point, relative to a corner of shape's container
     * @type {number}
     */
    this.x = 0;

    /**
     * Y coordinate of point, relative to a corner of shape's container
     * @type {number}
     */
    this.y = 0;

    /**
     * HTML DOM node of element, which used to display the point. This is styled DIV element.
     * @type {HTMLElement}
     */
    this.element = null;

    /**
     * Internal global unique identifier of point. Generated automatically.
     * @type {string}
     */
    this.guid = uuid();

    /**
     * @ignore
     * List of subscribers, that subscribed to events, emitted by
     * this point. This is an object, that consists of array
     * of event handlers of each event. Each handler is a function
     * that called when event of specified type emitted by
     * this shape
     * @type {object}
     */
    this.subscriptions = {}

    /**
     * Initializes new point and displays it on the screen.
     * @param x {number} X coordinate of point relative to shape's container left
     * @param y {number} Y coordinate of point relative to shape's container top
     * @param options {object} Point options, described [above](#SmartPoint+options). If not specified,
     * then [SmartShape.options.pointOptions](#SmartShape+options) used or global default options for point.
     * @returns {object} constructed SmartPoint object
     */
    this.init = (x,y,options = null) => {
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.element = this.createPointUI();
        this.setOptions(options);
        this.setEventListeners();
        EventsManager.emit(PointEvents.POINT_ADDED,this);
        return this;
    }

    /**
     * Method used to set specified options to point.
     * @param options {object} Point options object, described [above](#SmartPoint+options).
     */
    this.setOptions = (options) => {
        if (options && typeof(options) === "object") {
            if (options.style && typeof(options.style) === "object") {
                options.style = Object.assign(this.options.style, options.style)
            }
            Object.assign(this.options,options);
        }
        if (this.options.id) {
            this.element.id = this.options.id;
        }
    }

    /**
     * @ignore
     * Internal method that constructs HTML element of point, applies current options to it
     * @returns {object} HTML element of points
     */
    this.createPointUI = () => {
        const element = document.createElement("div")
        if (!this.options.canDrag) {
            return element;
        }
        return this.setPointStyles(element);
    }

    /**
     * @ignore
     * Internal method that applies styles from `options` to point's HTML element and returns modified element
     * @param element {HTMLDivElement} Input HTML element
     * @returns {HTMLDivElement} HTML element with applied styles
     */
    this.setPointStyles = (element=null) => {
        if (element == null) {
            element = this.element;
        }
        if (this.options.id) {
            this.element.id = this.options.id;
        }
        element.className = this.options.classes;

        element.style = this.options.style;
        if (typeof(this.options.style) === "object") {
            for (let cssName in this.options.style) {
                element.style[cssName] = this.options.style[cssName]
            }
        }
        element.style.width = this.options.width+"px";
        element.style.height = this.options.height+"px";
        element.style.left = (this.x-parseInt(this.options.width/2))+"px";
        element.style.top = (this.y-parseInt(this.options.height/2))+"px";
        element.style.zIndex = this.options.zIndex;
        if (!this.options.canDrag || !this.options.visible) {
            element.style.display = 'none';
        } else {
            element.style.display = '';
        }
        return element
    }

    /**
     * Method used to redraw the point. Usually used after change point position on the screen.
     */
    this.redraw = () => {
        this.element = this.setPointStyles();
    }

    /**
     * Method used to display point if it has hidden
     */
    this.show = () => {
        this.setOptions({visible:true});
        this.redraw();
    }

    /**
     * Method used to hide point
     */
    this.hide = () => {
        this.setOptions({visible:false});
        this.redraw();
    }

    /**
     * @ignore
     * Method used to rotate this point by specified angle around specified center
     * @param angle {number} Angle in degrees
     * @param centerX {number} X coordinate of center
     * @param centerY {number} Y coordinate of center
     */
    this.rotateBy = (angle,centerX,centerY) => {
        const [x,y] = getRotatedCoords(angle, this.x,this.y, centerX,centerY);
        this.x = x;
        this.y = y;
    }

    /**
     * @ignore
     * Internal method used to attach HTML event listeners to point.
     */
    this.setEventListeners = () => {
        this.element.addEventListener("mouseup",this.mouseup);
        this.element.addEventListener("mousedown", this.mousedown);
        EventsManager.subscribe(ContainerEvents.CONTAINER_BOUNDS_CHANGED,this.onBoundsChange);
    }

    /**
     * @ignore
     * onMouseDown event handler, triggered when user press mouse button on point's DIV element.
     * @param event {MouseEvent} Event object
     */
    this.mousedown = (event) => {
        if (event.buttons === 1 && this.options.canDrag) {
            EventsManager.emit(PointEvents.POINT_DRAG_START,this);
            pauseEvent(event);
        }
    }

    /**
     * @ignore
     * onMouseMove event handler, triggered when user moves mouse over point's DIV element.
     * @param event {MouseEvent} Event object
     */
    this.mousemove = (event) => {
        EventsManager.emit(PointEvents.POINT_MOUSE_MOVE,this,{clientX:event.clientX,clientY:event.clientY})
        if (event.buttons !== 1 || !this.options.canDrag) {
            return
        }
        const oldX = this.x;
        const oldY = this.y;
        const offset = getOffset(this.element.parentNode,true);
        if (!this.checkFitBounds(this.x + event.movementX, this.y + event.movementY)) {
            EventsManager.emit(PointEvents.POINT_DRAG_MOVE,this,{oldX,oldY});
            return;
        }
        let newX = event.clientX + window.scrollX - offset.left - this.options.width/2;
        let newY = event.clientY + window.scrollY - offset.top - this.options.height/2;
        [newX,newY] = this.applyMoveRestrictions(newX,newY,oldX,oldY);
        this.x = newX;
        this.y = newY;
        this.element.style.left = (this.x)+"px";
        this.element.style.top = (this.y)+"px";
        EventsManager.emit(PointEvents.POINT_DRAG_MOVE,this,{oldX,oldY});
    }

    /**
     * @ignore
     * Method checks if specified coordinate does not go beyond bounds
     * @param x {number} X coordinate
     * @param y {number} Y coordinate
     * @returns {boolean} True if x,y fit bounds and false if not
     */
    this.checkFitBounds = (x,y) => {
        return !(this.options.bounds.left !== -1 && x < this.options.bounds.left ||
            this.options.bounds.right !== -1 && x > this.options.bounds.right ||
            this.options.bounds.top !== -1 && y < this.options.bounds.top ||
            this.options.bounds.bottom !== -1 && y > this.options.bounds.bottom);
    }

    /**
     * @ignore
     * Method that check movement restrictions based on directions, to which point moved
     * from old position to new. Returns new coordinates, after apply movement restrictions
     * @param newX - X after move
     * @param newY - Y after move
     * @param oldX - X before move
     * @param oldY - Y before move
     * @returns {array} [x,y] array of coordinates after check movement restrictions
     */
    this.applyMoveRestrictions = (newX,newY,oldX,oldY) => {
        if (newY>oldY && this.options.moveDirections.indexOf(PointMoveDirections.BOTTOM) === -1) {
            newY = oldY;
        }
        if (newY<oldY && this.options.moveDirections.indexOf(PointMoveDirections.TOP) === -1) {
            newY = oldY;
        }
        if (newX>oldX && this.options.moveDirections.indexOf(PointMoveDirections.RIGHT) === -1) {
            newX = oldX;
        }
        if (newX<oldX && this.options.moveDirections.indexOf(PointMoveDirections.LEFT) === -1) {
            newX = oldX;
        }
        if (newX>this.options.bounds.right) {
            newX = this.options.bounds.right;
        }
        if (newY>this.options.bounds.bottom) {
            newY = this.options.bounds.bottom;
        }
        if (newX<this.options.bounds.left) {
            newX = this.options.bounds.left;
        }
        if (newY<this.options.bounds.top) {
            newY = this.options.bounds.top;
        }
        return [newX,newY];
    }

    /**
     * @ignore
     * onMouseUp event handler, triggered when user releases mouse button on point DIV element.
     * @param event {MouseEvent} Event object
     */
    this.mouseup = (event) => {
        EventsManager.emit(PointEvents.POINT_DRAG_END,this);
        if (event.button === 2 && this.options.canDelete) {
            this.destroy();
        }
    }

    /**
     * @ignore
     * The handler, that reacts on container dimensions change event.
     * @param event - custom event object, which contains new bounds in `event.bounds` field
     * and array of points, which this change could affect in `event.points` field.
     */
    this.onBoundsChange = (event) => {
        if (event.points.find(item => item === this)) {
            this.options.bounds = event.bounds;
        }
    }

    /**
     * Method used to destroy the point. Removes event listeners from point element and
     * raises the `point_destroyed` event. This event then intercepted by owner shape. Then owner shape
     * removes this point from shape's points array.
     */
    this.destroy = () => {
        this.element.removeEventListener("mouseup",this.mouseup);
        this.element.removeEventListener("mousedown", this.mousedown);
        EventsManager.unsubscribe(ContainerEvents.CONTAINER_BOUNDS_CHANGED,this.onBoundsChange);
        EventsManager.emit(PointEvents.POINT_DESTROYED,this);
        for (let eventName in this.subscriptions) {
            const handlers = this.subscriptions[eventName];
            handlers.forEach(handler => EventsManager.unsubscribe(eventName,handler));
            this.subscriptions[eventName] = [];
        }
    }

    /**
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
            if (event.target.guid === this.guid) {
                handler(event)
            }
        });
        this.subscriptions[eventName].push(listener);
        return listener;
    }

    /**
     * Uniform method that used to remove event handler, that previously added
     * to this object.
     * @param eventName {string} Name of event to remove listener from
     * @param listener {function} Pointer to event listener, that added previously.
     * It was returned from [addEventListener](#ResizeBox+addEventListener) method.
     */
    this.removeEventListener = (eventName,listener) => {
        this.subscriptions[eventName].splice(this.subscriptions[eventName].indexOf(listener),1);
        EventsManager.unsubscribe(eventName,listener)
    }

    return this;
}

/**
 * Enumeration of event names, that can be emitted by [SmartPoint](#SmartPoint) object.
 * @param POINT_ADDED Emitted when point created
 * @param POINT_DRAG_START Emitted when user press mouse button on point before start dragging it
 * @param POINT_DRAG_MOVE Emitted when user drags point by a mouse. As an arguments to event passed
 * `oldX` and `oldY` coordinates, which was before event start.
 * @param POINT_DRAG_END Emitted when user releases mouse button after pressing it
 * @param POINT_DESTROYED Emitted when point destroyed point (by pressing right mouse button on it or
 * programmatically using `destroy` method)
 * @enum {string}
 */
export const PointEvents = {
    POINT_ADDED: "create",
    POINT_DESTROYED: "destroy",
    POINT_DRAG_START: "move_start",
    POINT_DRAG_MOVE: "move",
    POINT_DRAG_END: "move_end",
    POINT_MOUSE_MOVE: "mousemove"
};

/**
 * Enumeration that defines point move directions. Values from this enumeration should be used
 * in point option `moveDirections` to specify in which directions point can be moved.
 * Members of enumeration: `LEFT`, `TOP`, `RIGHT`, `BOTTOM`
 * @enum {int}
 */
export const PointMoveDirections = {
    TOP: 0,
    LEFT: 1,
    RIGHT: 2,
    BOTTOM: 3
}

export default SmartPoint;
