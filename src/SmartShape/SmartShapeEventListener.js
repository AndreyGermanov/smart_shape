import SmartShapeManager from "../SmartShapeManager/SmartShapeManager.js";
import EventsManager from "../events/EventsManager.js";
import {getOffset, pauseEvent} from "../utils";
import {PointEvents} from "../SmartPoint/SmartPoint.js";
import {RotateBoxEvents} from "../RotateBox/RotateBoxEventListener.js";
import {ResizeBoxEvents} from "../ResizeBox/ResizeBoxEventListener.js";
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
        EventsManager.subscribe(PointEvents.POINT_DESTROYED, this.onPointDestroyed);
        EventsManager.subscribe(PointEvents.POINT_ADDED, this.onPointAdded);
        EventsManager.subscribe(PointEvents.POINT_DRAG_MOVE, this.onPointDragMove);
    }

    this.setSvgEventListeners = () => {
        this.svg_mouseover = this.shape.svg.addEventListener("mouseover", (event) => {
            SmartShapeManager.mouseover(createEvent(event,{target:this.shape}));
        });
        this.svg_mouseout = this.shape.svg.addEventListener("mouseout", (event) => {
            SmartShapeManager.mouseout(createEvent(event,{target:this.shape}));
        });
        this.svg_mouseenter = this.shape.svg.addEventListener("mouseenter", (event) => {
            SmartShapeManager.mouseenter(createEvent(event,{target:this.shape}));
        });
        this.svg_mousedown = this.shape.svg.addEventListener("mousedown", (event) => {
            SmartShapeManager.mousedown(createEvent(event,{target:this.shape}));
        });
        this.svg_click = this.shape.svg.addEventListener("click", (event) => {
           SmartShapeManager.click(createEvent(event,{target:this.shape}));
        });
        this.svg_dblclick = this.shape.svg.addEventListener("dblclick", (event) => {
            SmartShapeManager.doubleclick(createEvent(event,{target:this.shape}))
        });
    }

    this.removeSvgEventListeners = () => {
        this.shape.svg.removeEventListener("mouseover", this.svg_mouseover);
        this.shape.svg.removeEventListener("mouseout", this.svg_mouseout);
        this.shape.svg.removeEventListener("mouseenter", this.svg_mouseenter);
        this.shape.svg.removeEventListener("mousedown",this.svg_mousedown);
        this.shape.svg.removeEventListener("click",this.svg_click);
        this.shape.svg.removeEventListener("dblclick",this.svg_dblclick);
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
            const parent = this.shape.getRootParent();
            if (parent) {
                EventsManager.emit(ResizeBoxEvents.RESIZE_BOX_RESIZE,parent.resizeBox,{newPos:event.newPos,oldPos:event.oldPos});
                return
            }
            const diffX = event.newPos.left - event.oldPos.left;
            const diffY = event.newPos.top - event.oldPos.top;
            this.shape.moveBy(diffX,diffY);
            const [pointWidth,pointHeight] = this.shape.getMaxPointSize();
            this.shape.scaleTo(event.newPos.width-(pointWidth)*2,event.newPos.height-(pointHeight)*2);
            this.shape.redraw();
            EventsManager.emit(ResizeBoxEvents.RESIZE_BOX_RESIZE,this.shape,event);
        });
        this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOVE_START, (event) => {
            this.mousedown(event);
        });
        this.resizeMouseMoveEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOUSE_MOVE, (event) => {
            this.mousemove(event);
        });
        this.resizeClickEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOUSE_CLICK, (event) => {
            this.click(event);
        });
        this.resizeDblClickEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOUSE_DOUBLE_CLICK, (event) => {
            this.svg_dblclick(event);
        });
        this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOUSE_DOWN, (event) => {
            this.svg_mousedown(event)
        });
        this.resizeMouseUpEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOUSE_UP, (event) => {
            EventsManager.emit(ShapeEvents.SHAPE_MOUSE_UP,this.shape,createEvent(event))
        });
        this.resizeMouseOverEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOUSE_OVER, (event) => {
            this.svg_mouseover(event);
        });
        this.resizeMouseOutEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOUSE_OUT, (event) => {
            this.svg_mouseout(event);
        });
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
            const parent = this.shape.getRootParent();
            if (parent) {
                EventsManager.emit(RotateBoxEvents.ROTATE_BOX_ROTATE,parent.rotateBox,{angle:event.angle});
                return
            }
            if (parent) {
                parent.rotateBy(event.angle);
                parent.redraw();
                EventsManager.emit(RotateBoxEvents.ROTATE_BOX_ROTATE,parent,event);
            } else {
                this.shape.rotateBy(event.angle);
                this.shape.redraw()
                EventsManager.emit(RotateBoxEvents.ROTATE_BOX_ROTATE,this.shape,event);
            }
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
        this.rotateDblClickEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.SHAPE_MOUSE_DOUBLE_CLICK, (event) => {
            this.svg_dblclick(event);
        });
        this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.SHAPE_MOUSE_DOWN, (event) => {
            this.svg_mousedown(event)
        });
        this.rotateMouseUpEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.SHAPE_MOUSE_UP, (event) => {
            EventsManager.emit(ShapeEvents.SHAPE_MOUSE_UP,this.shape,createEvent(event))
        });
        this.rotateMouseOverEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.SHAPE_MOUSE_OVER, (event) => {
            this.svg_mouseover(event);
        });
        this.rotateMouseOutEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.SHAPE_MOUSE_OUT, (event) => {
            this.svg_mouseout(event);
        });
        this.rotatePointDragStartEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.POINT_DRAG_START, (_event) => {
            this.shape.initCenter = this.shape.getCenter(true);
        })
        this.rotatePointDragEndEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.POINT_DRAG_END, (_event) => {
            this.shape.initCenter = null;
            this.shape.points.forEach(point=> {
                if (!point.options.hidden) {
                    point.element.style.display = '';
                }
            })

        })
    }

    /**
     * @ignore
     * onMouseDown event handler, triggered when user presses mouse button on the shape or on container element.
     * @param event {MouseEvent} Event object
     */
    this.mousedown = (event) => {
        pauseEvent(event);
        EventsManager.emit(ShapeEvents.SHAPE_MOUSE_DOWN,this.shape,createEvent(event));
        setTimeout(() => {
            EventsManager.emit(ShapeEvents.SHAPE_MOVE_START, this.shape, createEvent(event,{pos:this.shape.getPosition(true)}));
        },100);
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
        if (this.shape.draggedPoint) {
            EventsManager.emit(ShapeEvents.POINT_DRAG_MOVE,this.shape,{point:this.shape.draggedPoint});
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
        const oldPos = this.shape.getPosition(true);
        this.shape.moveBy(stepX,stepY);
        this.shape.redraw();
        const newPos = this.shape.getPosition(true);
        EventsManager.emit(ShapeEvents.SHAPE_MOVE,this.shape,createEvent(event,{oldPos,newPos}));
    }

    /**
     * @ignore
     * onMouseEnter event handler, triggered when mouse cursor enters shape's container element
     * @param event {MouseEvent} Event object
     */
    this.mouseenter = (event) => {
        EventsManager.emit(ShapeEvents.SHAPE_MOUSE_ENTER, this.shape, createEvent(event));
    }

    /**
     * @ignore
     * onMouseOver event handler, triggered when user moves mouse over the shape.
     * @param event {MouseEvent} Event object
     */
    this.mouseover = (event) => {
        if (SmartShapeManager.draggedShape === this.shape) {
            return
        }
        EventsManager.emit(ShapeEvents.SHAPE_MOUSE_OVER,this.shape,createEvent(event));
    }

    /**
     * @ignore
     * onMouseOut event handler, triggered when user moves mouse away from shape.
     * @param event {MouseEvent} Event object
     */
    this.mouseout = (event) => {
        EventsManager.emit(ShapeEvents.SHAPE_MOUSE_OUT,this.shape,createEvent(event));
    }

    /**
     * @ignore
     * onClick event handler, triggered when user clicks on shape
     * @param event {MouseEvent} Event object
     */
    this.click = (event) => {
        EventsManager.emit(ShapeEvents.SHAPE_MOUSE_CLICK, this.shape, createEvent(event));
    }

    /**
     * @ignore
     * onDblClick event handler, triggered when user double-clicks on shape
     * @param event {MouseEvent} Event object
     */
    this.doubleclick = (event) => {
        EventsManager.emit(ShapeEvents.SHAPE_MOUSE_DOUBLE_CLICK, this.shape, createEvent(event));
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
        const pos = this.shape.getPosition(true);
        let stepX = event.movementX;
        let stepY = event.movementY;
        let clientX = event.clientX+window.scrollX;
        let clientY = event.clientY+window.scrollY;
        const newX = pos.left + stepX;
        const newY = pos.top + stepY;
        const offset = getOffset(this.shape.root, true);
        const bounds = this.shape.getBounds();
        if (newX < bounds.left || newX+pos.width > bounds.right) {
            return [null, null]
        }
        if (newY < bounds.top || newY+pos.height > bounds.bottom) {
            return [null, null]
        }
        if (clientX<newX+offset.left) {
            stepX = clientX - (newX+offset.left);
        }
        if (clientY<newY+offset.top) {
            stepY = clientY - (newY+offset.top);
        }
        if (clientX>newX+pos.width+offset.left) {
            stepX = clientX -  (pos.width+offset.left+pos.left);
        }
        if (clientY>newY+pos.height+offset.right) {
            stepY = clientY -  (pos.height+offset.top+pos.top);
        }
        return [stepX, stepY];
    }

    /**
     * @ignore
     * Internal method, that triggered when new point added
     * @param event Custom event object
     */
    this.onPointAdded = (event) => {
        if (!this.shape.isShapePoint(event.target)) {
            return
        }
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
     * Internal method, that triggered when user drags the point
     * @param event Custom event object. Contains SmartPoint object as an `event.target`,
     * `event.oldX` and `event.oldY` as a previous point coordinates before previous drag event.
     */
    this.onPointDragMove = (event) => {
        if (this.shape.isShapePoint(event.target)) {
            this.shape.redraw();
        }
    }

    /**
     * @ignore
     * Internal method, that triggered when point is destroyed
     * @param event Custom event object. Contains SmartPoint object as an event.target
     **/
    this.onPointDestroyed = (event) => {
        if (!this.shape.isShapePoint(event.target)) {
            return
        }
        this.shape.points.splice(this.shape.points.indexOf(event.target), 1);
        this.shape.root.removeChild(event.target.element);
        this.shape.redraw()
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
            if (event.target && event.target.guid === this.shape.guid) {
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
        EventsManager.unsubscribe(PointEvents.POINT_ADDED, this.onPointAdded);
        EventsManager.unsubscribe(PointEvents.POINT_DRAG_MOVE, this.onPointDragMove);
        EventsManager.unsubscribe(PointEvents.POINT_DESTROYED, this.onPointDestroyed);
        if (this.shape.resizeBox) {
            this.shape.resizeBox.removeEventListener(ResizeBoxEvents.RESIZE_BOX_RESIZE,this.resizeBoxListener);
            this.shape.resizeBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_CLICK,this.resizeClickEventListener);
            this.shape.resizeBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_MOVE,this.resizeMouseMoveEventListener);
            this.shape.resizeBox.removeEventListener(ShapeEvents.SHAPE_MOVE_START,this.resizeMouseDownEventListener);
            this.shape.resizeBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_UP,this.resizeMouseUpEventListener);
            this.shape.resizeBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_DOUBLE_CLICK,this.resizeDblClickEventListener);
            this.shape.resizeBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_OVER,this.resizeMouseOverEventListener);
            this.shape.resizeBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_OUT,this.resizeMouseOutEventListener);
        }
        if (this.shape.rotateBox) {
            this.shape.rotateBox.removeEventListener(RotateBoxEvents.ROTATE_BOX_ROTATE,this.rotateBoxListener);
            this.shape.rotateBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_CLICK,this.rotateClickEventListener);
            this.shape.rotateBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_MOVE,this.rotateMouseMoveEventListener);
            this.shape.rotateBox.removeEventListener(ShapeEvents.SHAPE_MOVE_START,this.rotateMouseDownEventListener);
            this.shape.rotateBox.removeEventListener(ShapeEvents.SHAPE_MOVE_START,this.rotatePointDragStartEventListener);
            this.shape.rotateBox.removeEventListener(ShapeEvents.SHAPE_MOVE_START,this.rotatePointDragEndEventListener);
            this.shape.rotateBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_UP,this.rotateMouseUpEventListener);
            this.shape.rotateBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_DOUBLE_CLICK,this.rotateDblClickEventListener);
            this.shape.rotateBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_OVER,this.rotateMouseOverEventListener);
            this.shape.rotateBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_OUT,this.rotateMouseOutEventListener);
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
 * @param create {ShapeEvents.SHAPE_CREATE}Emitted right after shape is created and initialized.
 * Event object contains created shape [SmartShape](#SmartShape) object in a `target` field
 * @param move_start {MouseEvent} Emitted when user presses left mouse button on shape to start dragging.
 * Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mousedown object with additional
 * field `pos`, which is a position of shape when movement started.
 * Position is an object with following fields "left,top,right,bottom,width,height"
 * @param move Emitted when user drags shape.
 * Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mousemove object, but also
 * includes additional properties `oldPos` - shape position before previous movement. `newPos` - shape position after
 * previous movement. Position is an object with following fields "left,top,right,bottom,width,height"
 * @param move_end Emitted when user releases mouse button to stop drag the shape.
 * Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseup object with additional
 * field `pos`, which is a position of shape when movement started.
 * Position is an object with following fields "left,top,right,bottom,width,height"
 * @param mousemove Emitted when user moves mouse over shape
 * Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mousemove object
 * @param mouseover Emitted when mouse cursor goes inside shape
 * Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseover object
 * @param mouseout Emitted when mouse cursor goes away from shape
 * Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseout object
 * @param click Emitted when click on shape
 * Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) click object
 * @param dblclick Emitted when double-click on shape
 * Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) dblclick object
 * @param resize Emitted when user resized the shape using resize box. Event object includes fields `oldPos` and
 * `newPos` which are positions of shape before and after resizing.
 * Position is an object with following fields "left,top,right,bottom,width,height"
 * @param rotate Emitted when user rotated the shape using rotate box Event object includes the `angle` field,
 * which is a rotation angle.
 * Position is an object with following fields "left,top,right,bottom,width,height"
 * @param point_drag_start Emitted when user starts dragging one of shape's point. Event Includes `point` field.
 * It is a [SmartPoint](#SmartPoint) object.
 * @param point_drag_move Emitted when user dragging one of shape's point. Event Includes `point` field.
 * It is a [SmartPoint](#SmartPoint) object.
 * @param point_drag_end Emitted when user finishes dragging one of shape's point. Event Includes `point` field.
 * It is a [SmartPoint](#SmartPoint) object.
 * @param destroy Emitted right before shape is destroyed
 * Event object contains created shape [SmartShape](#SmartShape) object in a `target` field
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
    SHAPE_MOUSE_DOWN: "mousedown",
    SHAPE_MOUSE_UP: "mouseup",
    SHAPE_MOUSE_CLICK: "click",
    SHAPE_MOUSE_DOUBLE_CLICK: "dblclick",
    SHAPE_DESTROY: "destroy",
    POINT_DRAG_START: "point_drag_start",
    POINT_DRAG_MOVE: "point_drag_move",
    POINT_DRAG_END: "point_drag_end",
    SHAPE_RESIZE: "resize",
    SHAPE_ROTATE: "rotate",
}

export default SmartShapeEventListener;
