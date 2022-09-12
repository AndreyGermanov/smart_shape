import EventsManager from "../events/EventsManager.js";
import {getOffset, pauseEvent} from "../utils";
import {PointEvents} from "../SmartPoint/SmartPoint.js";
import {ResizeBoxEvents} from "../ResizeBox/ResizeBox.js";
import {RotateBoxEvents} from "../RotateBox/RotateBox.js";
import {createEvent} from "../events/functions.js";

/**
 * Internal helper class, that contains all event listening logic for the shape.
 * This class should not be used directly. Each shape creates an instance of
 * this class automatically during init process
 * @param shape {SmartShape} Link to owner Shape instance
 * @constructor
 */
function SmartShapeEventListener(shape) {

    /**
     * @ignore
     * Link to owner shape instance
     * @type {SmartShape}
     */
    this.shape = shape;

    /**
     * @ignore
     * List of subscribers, that subscribed to events, emitted by
     * this shape. This is an object, that consists of array
     * of event handlers of each event. Each handler is a function
     * that called when event of specified type emitted by
     * this shape
     * @type {object}
     */
    this.subscriptions = {
        "CONTAINER_BOUNDS_CHANGED": []
    }

    /**
     * @ignore
     * Method binds events to the shape and returns itself
     * @returns {SmartShapeEventListener}
     */
    this.run = () => {
        this.shape = shape;
        this.setEventListeners();
        return this;
    }

    /**
     * @ignore
     * Internal method that installs HTML DOM event listeners to the shape, and it's container
     */
    this.setEventListeners = () => {
        if (this.shape.root.getAttribute("sh_listeners") !== "true") {
            this.shape.root.setAttribute("sh_listeners","true");
            this.shape.root.addEventListener("mousemove", (event) => {
                if (this.shape.root.draggedShape) {
                    this.shape.root.draggedShape.eventListener.mousemove(event);
                }
            })
            this.shape.root.addEventListener("mouseup",this.mouseup);
            this.shape.root.addEventListener("dblclick",this.doubleclick);
            this.shape.root.addEventListener("mouseenter",this.mouseenter);
            this.checkCanDeletePoints();
        }
        window.addEventListener("resize", this.onWindowResize);
        EventsManager.subscribe(PointEvents.POINT_ADDED, this.onPointAdded);
        EventsManager.subscribe(PointEvents.POINT_DRAG_START, this.onPointDragStart);
        EventsManager.subscribe(PointEvents.POINT_DRAG_MOVE, this.onPointDragMove);
        EventsManager.subscribe(PointEvents.POINT_DRAG_END, this.onPointDragEnd);
        EventsManager.subscribe(PointEvents.POINT_DESTROYED, this.onPointDestroyed);
    }

    /**
     * @ignore
     * Internal method that binds DOM event listeners from SVG element of shape
     * each time when it redraws itself
     */
    this.setSvgEventListeners = () => {
        shape.svg.addEventListener("mousedown",this.mousedown);
        shape.svg.addEventListener("mouseenter",this.mouseenter);
        shape.svg.addEventListener("mouseover",this.mouseover);
        shape.svg.addEventListener("mouseout",this.mouseout);
        shape.svg.addEventListener("click",this.click);
    }

    /**
     * @ignore
     * Internal method that removes DOM event listeners from SVG element of shape
     * each time when it destroys before redrawing itself
     */
    this.removeSvgEventListeners = () => {
        shape.svg.removeEventListener("mousedown",this.mousedown);
        shape.svg.removeEventListener("mouseenter",this.mouseenter);
        shape.svg.removeEventListener("mouseover",this.mouseover);
        shape.svg.removeEventListener("mouseout",this.mouseout);
        shape.svg.removeEventListener("click",this.click);
    }


    /**
     * @ignore
     * Method adds event listeners to ResizeBox, connected to it to react on them. So, the shape can change itself
     * when some event comes from ResizeBox: when user resizes ResizeBox, it emits "resize" event. Then the shape
     * receives this event in this method and scales the shape according to new coordinates
     * of the resize box
     * Also, shape intercepts other events of ResizeBox, connected to it like "mouseover",
     * "mousemove" or "click".
     */
    this.addResizeEventListener = () => {
        if (!this.shape.resizeBox) {
            return;
        }
        this.resizeBoxListener = this.shape.resizeBox.addEventListener(ResizeBoxEvents.RESIZE_BOX_RESIZE, (event) => {
            const diffX = event.newPos.left - event.oldPos.left;
            const diffY = event.newPos.top - event.oldPos.top;
            this.shape.moveTo(this.shape.left+diffX,this.shape.top+diffY);
            const [pointWidth,pointHeight] = this.shape.getMaxPointSize();
            this.shape.scaleTo(event.newPos.width-(pointWidth)*2,event.newPos.height-(pointHeight)*2);
            this.shape.redraw();
        });
        this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOVE_START, (event) => {
            this.mousedown(event);
        });
        this.resizeMouseMoveEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOUSE_MOVE, (event) => {
            this.mousemove(event);
        });
        this.resizeClickEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOUSE_CLICK, (event) => {
            this.click(event);
        })
    }

    /**
     * @ignore
     * Method adds event listeners to RotateBox, connected to it to react on them. So, the shape can change itself
     * when some event comes from RotateBox: when user rotates RotateBox, it emits "rotate" event and the shape
     * intercepts this event in this method. The `event` object, that RotateBox emits contains `angle` parameter
     * that can be used. As a reaction to the event, listening function rotates the shape according to the angle,
     * received from the event of rotate box.
     * Also, shape intercepts other events of RotateBox, connected to it, like "mouseover",
     * "mousemove" or "click".
     */
    this.addRotateEventListener = () => {
        if (!this.shape.rotateBox) {
            return;
        }
        this.rotateBoxListener = this.shape.rotateBox.addEventListener(RotateBoxEvents.ROTATE_BOX_ROTATE, (event) => {
            this.shape.rotateBy(event.angle);
            this.shape.redraw()
        });
        this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.SHAPE_MOVE_START, (event) => {
            this.mousedown(event);
        });
        this.rotateMouseMoveEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.SHAPE_MOUSE_MOVE, (event) => {
            this.mousemove(event);
        });
        this.rotateClickEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.SHAPE_MOUSE_CLICK, (event) => {
            this.click(event);
        })
        this.rotatePointDragStartEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.POINT_DRAG_START, (_event) => {
            this.shape.initCenter = this.shape.getCenter();
        })
        this.rotatePointDragEndEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.POINT_DRAG_END, (_event) => {
            this.shape.initCenter = null;
        })
    }

    /**
     * @ignore
     * OnMouseUp event handler, triggered when user releases mouse button on shape or on shape container element
     * @param event {MouseEvent} Event object
     */
    this.mouseup = (event) => {
        if (this.shape.root.draggedShape) {
            const dragshape = this.shape.root.draggedShape;
            if (event.buttons === 1 && dragshape.options.canAddPoints && !dragshape.draggedPoint) {
                if (dragshape.options.maxPoints === -1 || dragshape.points.length < dragshape.options.maxPoints) {
                    dragshape.addPoint(event.clientX-dragshape.root.offsetLeft,
                        event.clientY-dragshape.root.offsetTop)
                }
            }
            if (this.shape.root.draggedShape.draggedPoint) {
                this.shape.root.draggedShape.draggedPoint.mouseup(event);
                if (this.shape.root.draggedShape) {
                    this.shape.root.draggedShape.draggedPoint = null;
                }
            }
            this.shape.root.draggedShape = null;
            EventsManager.emit(ShapeEvents.SHAPE_MOVE_END,dragshape);
        }
    }

    /**
     * @ignore
     * OnDblClick event handler, triggered when user double-clicks on shape or on shape container element
     * @param event {MouseEvent} Event object
     */
    this.doubleclick = (event) => {
        event.stopPropagation();
        if (this.shape.options.canAddPoints && !this.shape.draggedPoint) {
            if (this.shape.options.maxPoints === -1 || this.shape.points.length < this.shape.options.maxPoints) {
                this.shape.addPoint(event.clientX-this.shape.root.offsetLeft + window.scrollX,
                    event.clientY-this.shape.root.offsetTop + window.scrollY,{forceDisplay:true});
            }
        }
    }

    /**
     * @ignore
     * onMouseDown event handler, triggered when user presses mouse button on the shape or on container element.
     * @param event {MouseEvent} Event object
     */
    this.mousedown = (event) => {
        pauseEvent(event);
        if (event.buttons === 1 || event.type === ShapeEvents.SHAPE_MOVE_START) {
            this.shape.root.draggedShape = this.shape;
            EventsManager.emit(ShapeEvents.SHAPE_MOVE_START, this.shape, createEvent(event));
        }
    }

    /**
     * @ignore
     * onMouseMove event handler, triggered when user moves mouse over the shape or container element.
     * @param event {MouseEvent} Event object
     */
    this.mousemove = (event) => {
        if (!this.shape.draggedPoint) {
            EventsManager.emit(ShapeEvents.SHAPE_MOUSE_MOVE, this.shape, createEvent(event));
        }
        if (event.buttons !== 1) {
            if (this.shape.root.draggedShape) {
                this.shape.root.draggedShape.draggedPoint = null;
                this.shape.root.draggedShape = null;
            }
            return
        }
        if (this.shape.draggedPoint) {
            this.shape.draggedPoint.mousemove(event);
            return
        }
        if (!this.shape.options.canDragShape) {
            return
        }
        const [stepX, stepY] = this.calcMovementOffset(event);
        if (stepX === null || stepY === null) {
            return
        }
        const oldPos = this.shape.getPosition();
        for (let index in this.shape.points) {
            this.shape.points[index].x += stepX;
            this.shape.points[index].y += stepY;
            this.shape.points[index].redraw();
        }
        this.shape.redraw()
        const newPos = this.shape.getPosition();
        EventsManager.emit(ShapeEvents.SHAPE_MOVE,this.shape,{oldPos,newPos});
    }

    /**
     * @ignore
     * onMouseEnter event handler, triggered when mouse cursor enters shape's container element
     * @param event {MouseEvent} Event object
     */
    this.mouseenter = (event) => {
        EventsManager.emit(ShapeEvents.SHAPE_MOUSE_ENTER, this.shape, {clientX:event.clientX,clientY:event.clientY});
        if (event.buttons !== 1) {
            if (this.shape.root.draggedShape) {
                this.shape.root.draggedShape.draggedPoint = null;
            }
            this.shape.root.draggedShape = null;
        }
    }

    /**
     * @ignore
     * onMouseOver event handler, triggered when user moves mouse over the shape.
     * @param event {MouseEvent} Event object
     */
    this.mouseover = (event) => {
        const shapeEvent = createEvent(event);
        EventsManager.emit(ShapeEvents.SHAPE_MOUSE_OVER,this.shape,shapeEvent);
    }

    /**
     * @ignore
     * onMouseOut event handler, triggered when user moves mouse away from shape.
     * @param event {MouseEvent} Event object
     */
    this.mouseout = (event) => {
        const shapeEvent = createEvent(event);
        EventsManager.emit(ShapeEvents.SHAPE_MOUSE_OUT,this.shape,shapeEvent);
    }

    /**
     * @ignore
     * onClick event handler, triggered when user clicks on shape
     * @param event {MouseEvent} Event object
     */
    this.click = (event) => {
        this.shape.switchDisplayMode();
        if (event.type !== SmartShapeEventListener.SHAPE_MOUSE_CLICK) {
            const shapeEvent = createEvent(event);
            EventsManager.emit(ShapeEvents.SHAPE_MOUSE_CLICK, this.shape, shapeEvent);
        }
    }


    /**
     * @ignore
     * Internal method that used to calculate to which amount of pixels the shape should be moved when dragging it,
     * depending on position of mouse cursor and bounds of container element.
     * @param event {MouseEvent} event object
     * @returns {array} Returns object with [x,y] coordinates or [null,null]
     * if impossible to move (out of container bounds)
     */
    this.calcMovementOffset = (event) => {
        this.shape.calcPosition();
        let stepX = event.movementX;
        let stepY = event.movementY;
        let clientX = event.clientX+window.scrollX;
        let clientY = event.clientY+window.scrollY;
        const newX = this.shape.left + stepX;
        const newY = this.shape.top + stepY;
        const offset = getOffset(this.shape.root, true);
        const bounds = this.shape.getBounds();
        if (newX < bounds.left || newX+this.shape.width > bounds.right) {
            return [null, null]
        }
        if (newY < bounds.top || newY+this.shape.height > bounds.bottom) {
            return [null, null]
        }
        if (clientX<newX+offset.left) {
            stepX = clientX - (newX+offset.left);
        }
        if (clientY<newY+offset.top) {
            stepY = clientY - (newY+offset.top);
        }
        if (clientX>newX+this.shape.width+offset.left) {
            stepX = clientX -  (this.shape.width+offset.left+this.shape.left);
        }
        if (clientY>newY+this.shape.height+offset.right) {
            stepY = clientY -  (this.shape.height+offset.top+this.shape.top);
        }
        return [stepX, stepY];
    }

    /**
     * @ignore
     * Internal method, that triggered when new point added
     * @param _event Custom event object
     */
    this.onPointAdded = (_event) => {
        this.checkCanDeletePoints();
    }

    /**
     * @ignore
     * Method that disables context menu on container if allowed to delete points,
     * it's required to press second mouse button to delete the point
     */
    this.checkCanDeletePoints = () => {
        if (!!this.shape.points.find(point => point.options.canDelete === true)) {
            this.nocontextmenu = this.shape.root.addEventListener("contextmenu", event => event.preventDefault())
        }
    }

    /**
     * @ignore
     * Internal method, that triggered when user started to drag the point
     * @param event Custom event object. Contains SmartPoint object as an event.target
     */
    this.onPointDragStart = (event) => {
        if (!this.shape.isShapePoint(event.target)) {
            return;
        }
        this.shape.root.draggedShape = this.shape;
        this.shape.draggedPoint = event.target;
    }

    /**
     * @ignore
     * Internal method, that triggered when user drags the point
     * @param event Custom event object. Contains SmartPoint object as an `event.target`,
     * `event.oldX` and `event.oldY` as a previous point coordinates before previous drag event.
     */
    this.onPointDragMove = (event) => {
        if (!this.shape.isShapePoint(event.target)) {
            return;
        }
        this.shape.redraw();
    }

    /**
     * @ignore
     * Internal method, that triggered when user finished dragging the point
     * @param event Custom event object. Contains SmartPoint object as an `event.target`,
     * `event.oldX` and `event.oldY` as a previous point coordinates before previous drag event.
     **/
    this.onPointDragEnd = (event) => {
        if (!this.shape.isShapePoint(event.target)) {
            return;
        }
        this.shape.root.draggedShape = null;
        this.shape.draggedPoint = null;
    }

    /**
     * @ignore
     * Internal method, that triggered when point is destroyed
     * @param event Custom event object. Contains SmartPoint object as an event.target
     **/
    this.onPointDestroyed = (event) => {
        if (!this.shape.isShapePoint(event.target)) {
            return;
        }
        this.shape.points.splice(this.shape.points.indexOf(event.target), 1);
        this.shape.root.removeChild(event.target.element);
        this.shape.redraw()
    }

    /**
     * @ignore
     * Internal method, triggered when browser window resized.
     * @param _event Window resize event - [UIEvent](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent).
     */
    this.onWindowResize = (_event) => {
        EventsManager.emit(ContainerEvents.CONTAINER_BOUNDS_CHANGED,this.shape,
            {bounds:this.shape.getBounds(),points:this.shape.points}
        )
    }

    /**
     * @ignore
     * Uniform method that used to add event handler of specified type to this object.
     * @param eventName {string} Name of event
     * @param handler {function} Function that used as an event handler
     * @returns {function} Pointer to added event handler. Should be used to remove event listener later.
     */
    this.addEventListener = (eventName,handler) => {
        if (typeof(this.subscriptions[eventName]) === "undefined") {
            this.subscriptions[eventName] = [];
        }
        const listener = EventsManager.subscribe(eventName, (event) => {
            if (event.target.guid === this.shape.guid) {
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
     * @param eventName {string} Name of event to remove listener from
     * @param listener {function} Pointer to event listener, that added previously.
     * It was returned from [addEventListener](#ResizeBox+addEventListener) method.
     */
    this.removeEventListener = (eventName,listener) => {
        this.subscriptions[eventName].splice(this.subscriptions[eventName].indexOf(listener),1);
        EventsManager.unsubscribe(eventName,listener)
    }

    /**
     * @ignore
     * Used to remove all event listeners when destroy the object
     */
    this.destroy = () => {
        if (this.shape.options.canDeletePoints) {
            this.shape.root.removeEventListener("contextmenu", this.nocontextmenu);
        }
        window.removeEventListener("resize",this.onWindowResize);
        EventsManager.unsubscribe(PointEvents.POINT_ADDED, this.onPointAdded);
        EventsManager.unsubscribe(PointEvents.POINT_DRAG_START, this.onPointDragStart);
        EventsManager.unsubscribe(PointEvents.POINT_DRAG_MOVE, this.onPointDragMove);
        EventsManager.unsubscribe(PointEvents.POINT_DRAG_END, this.onPointDragEnd);
        EventsManager.unsubscribe(PointEvents.POINT_DESTROYED, this.onPointDestroyed);
        if (this.shape.resizeBox) {
            this.shape.resizeBox.removeEventListener(ResizeBoxEvents.RESIZE_BOX_RESIZE,this.resizeBoxListener);
            this.shape.resizeBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_CLICK,this.resizeClickEventListener);
            this.shape.resizeBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_MOVE,this.resizeMouseMoveEventListener);
            this.shape.resizeBox.removeEventListener(ShapeEvents.SHAPE_MOVE_START,this.resizeMouseDownEventListener);
        }
        if (this.shape.rotateBox) {
            this.shape.rotateBox.removeEventListener(RotateBoxEvents.ROTATE_BOX_ROTATE,this.rotateBoxListener);
            this.shape.rotateBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_CLICK,this.rotateClickEventListener);
            this.shape.rotateBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_MOVE,this.rotateMouseMoveEventListener);
            this.shape.rotateBox.removeEventListener(ShapeEvents.SHAPE_MOVE_START,this.rotateMouseDownEventListener);
            this.shape.rotateBox.removeEventListener(ShapeEvents.SHAPE_MOVE_START,this.rotatePointDragStartEventListener);
            this.shape.rotateBox.removeEventListener(ShapeEvents.SHAPE_MOVE_START,this.rotatePointDragEndEventListener);
        }
        for (let eventName in this.subscriptions) {
            const handlers = this.subscriptions[eventName];
            handlers.forEach(handler => EventsManager.unsubscribe(eventName,handler));
            this.subscriptions[eventName] = [];
        }
    }
}

/**
 * Enumeration of event names, that can be emitted by [SmartShape](#SmartShape) object.
 @param CONTAINER_BOUNDS_CHANGED Emitted by shape when dimensions of container changed, e.g. browser
 window resized. Sends the event with the following fields: `bounds` -an object with the following fields:
 left:number,top:number,right:number,bottom:number, `points` - array of points ([SmartPoint](#SmartPoint) objects)
 with array of all points of this shape, which could be affected by this bounds change.
 @enum {string}
*/
export const ContainerEvents = {
    CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
}

/**
 * Enumeration of event names, that can be emitted by [SmartShape](#SmartShape) object.
 * @param SHAPE_CREATE Emitted right after shape is created and initialized
 * @param SHAPE_MOVE_START Emitted when user presses left mouse button on shape to start dragging
 * @param SHAPE_MOVE Emitted when user drags shape
 * @param SHAPE_MOVE_END Emitted when user releases mouse button to stop drag the shape
 * @param SHAPE_MOUSE_MOVE Emitted when user moves mouse over shape
 * @param SHAPE_MOUSE_ENTER Emitted when mouse cursor enters shape
 * @param SHAPE_MOUSE_OVER Emitted when mouse cursor goes inside shape
 * @param SHAPE_MOUSE_OUT Emitted when mouse cursor goes away from shape
 * @param SHAPE_MOUSE_CLICK Emitted when click on shape
 * @param SHAPE_DESTROY Emitted right before shape is destroyed
 * @enum {string}
 */
export const ShapeEvents = {
    SHAPE_CREATE: "create",
    SHAPE_MOVE_START: "move_start",
    SHAPE_MOVE: "move",
    SHAPE_MOVE_END: "move_end",
    SHAPE_MOUSE_MOVE: "mousemove",
    SHAPE_MOUSE_ENTER: "mouseenter",
    SHAPE_MOUSE_OVER: "mouseover",
    SHAPE_MOUSE_OUT: "mouseout",
    SHAPE_MOUSE_CLICK: "click",
    SHAPE_DESTROY: "destroy",
    POINT_DRAG_START: "point_drag_start",
    POINT_DRAG_END: "point_drag_end"
}

export default SmartShapeEventListener;
