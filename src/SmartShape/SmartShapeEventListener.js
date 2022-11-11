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
        EventsManager.subscribe(PointEvents.POINT_DELETE_REQUEST, this.onPointDeleteRequest);
        EventsManager.subscribe(ShapeEvents.SHAPE_ADD_CHILD,() => {
            this.shape.redraw();
        })
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
        this.resizeBoxListener = this.shape.resizeBox.addEventListener(ResizeBoxEvents.RESIZE_BOX_RESIZE, this.onResize);
        this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOVE_START, this.mousedown);
        this.resizeMouseMoveEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOUSE_MOVE, this.mousemove);
        this.resizeClickEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOUSE_CLICK, this.click);
        this.resizeDblClickEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOUSE_DOUBLE_CLICK, this.svg_dblclick);
        this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOUSE_DOWN, this.svg_mousedown);
        this.resizeMouseOverEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOUSE_OVER, this.svg_mouseover);
        this.resizeMouseOutEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOUSE_OUT, this.svg_mouseout);
        this.resizeMouseUpEventListener = this.shape.resizeBox.addEventListener(ShapeEvents.SHAPE_MOUSE_UP, (event) => {
            EventsManager.emit(ShapeEvents.SHAPE_MOUSE_UP,this.shape,createEvent(event))
        });
        this.resizeBoxContextMenuEventListener = this.shape.resizeBox.shape.svg.addEventListener("contextmenu", (event) => {
            if (this.shape.contextMenu) {
                this.shape.contextMenu.onEvent(event);
            }
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
        this.rotateBoxListener = this.shape.rotateBox.addEventListener(RotateBoxEvents.ROTATE_BOX_ROTATE, this.onRotate);
        this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.SHAPE_MOVE_START, this.mousedown);
        this.rotateMouseMoveEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.SHAPE_MOUSE_MOVE, this.mousemove);
        this.rotateClickEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.SHAPE_MOUSE_CLICK, this.click)
        this.rotateDblClickEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.SHAPE_MOUSE_DOUBLE_CLICK, this.svg_dblclick);
        this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.SHAPE_MOUSE_DOWN, this.svg_mousedown);
        this.rotateMouseUpEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.SHAPE_MOUSE_UP, (event) => {
            EventsManager.emit(ShapeEvents.SHAPE_MOUSE_UP,this.shape,createEvent(event))
        });
        this.rotateMouseOverEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.SHAPE_MOUSE_OVER, this.svg_mouseover);
        this.rotateMouseOutEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.SHAPE_MOUSE_OUT, this.svg_mouseout);
        this.rotatePointDragStartEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.POINT_DRAG_START, (_event) => {
            this.shape.initCenter = this.shape.getCenter(this.shape.options.groupChildShapes);
        })
        this.rotatePointDragEndEventListener = this.shape.rotateBox.addEventListener(ShapeEvents.POINT_DRAG_END, (_event) => {
            this.shape.initCenter = null;
            this.shape.points.filter(point=>point.options).forEach(point=> {
                if (!point.options.hidden && point.element) {
                    point.element.style.display = '';
                }
            })
        })
        this.rotateBoxContextMenuEventListener = this.shape.rotateBox.shape.svg.addEventListener("contextmenu", (event) => {
            if (this.shape.contextMenu) {
                this.shape.contextMenu.onEvent(event);
            }
        })
    }

    this.onResize = (event) => {
        const parent = this.shape.getRootParent(true);
        if (parent) {
            EventsManager.emit(ResizeBoxEvents.RESIZE_BOX_RESIZE,parent.resizeBox,createEvent(event,
                {newPos:event.newPos,oldPos:event.oldPos})
            );
            return
        }
        if (event.buttons && this.shape.options.simpleMode) {
            return
        }
        const diffX = event.newPos.left - event.oldPos.left;
        const diffY = event.newPos.top - event.oldPos.top;
        this.shape.moveBy(diffX,diffY,false);
        const [pointWidth,pointHeight] = this.shape.getMaxPointSize();
        this.shape.scaleTo(event.newPos.width-(pointWidth)*2,event.newPos.height-(pointHeight)*2);
        this.shape.redraw();
        EventsManager.emit(ResizeBoxEvents.RESIZE_BOX_RESIZE,this.shape,event);
    }

    this.onRotate = (event) => {
        const parent = this.shape.getRootParent(true);
        if (parent) {
            EventsManager.emit(RotateBoxEvents.ROTATE_BOX_ROTATE,parent.rotateBox,{angle:event.angle});
            return
        }
        this.shape.rotateBy(event.angle);
        this.shape.redraw()
        EventsManager.emit(RotateBoxEvents.ROTATE_BOX_ROTATE,this.shape,event);
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
            EventsManager.emit(ShapeEvents.SHAPE_MOVE_START,
                this.shape, createEvent(event,{pos:this.shape.getPosition(this.shape.options.groupChildShapes)}))
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
        if (event.buttons !== 1) {
            return
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
        const oldPos = this.shape.getPosition(this.shape.options.groupChildShapes);
        this.shape.moveBy(stepX,stepY,true,this.shape.options.simpleMode);
        if (!this.shape.options.simpleMode) {
            this.shape.redraw();
        }
        const newPos = this.shape.getPosition(this.shape.options.groupChildShapes);
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
        const pos = this.shape.getPosition(this.shape.options.groupChildShapes);
        let stepX = event.movementX;
        let stepY = event.movementY;
        let clientX = event.clientX+window.scrollX;
        let clientY = event.clientY+window.scrollY;
        const newX = pos.left + stepX;
        const newY = pos.top + stepY;
        const offset = getOffset(this.shape.root, true);
        const bounds = this.shape.getBounds();
        if (newX < bounds.left || newX+pos.width > bounds.right) {
            stepX = 0;
        }
        if (newY < bounds.top || newY+pos.height > bounds.bottom) {
            stepY = 0;
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
        if (event.target.element) {
            try {
                this.shape.root.appendChild(event.target.element)
            } catch (err) {}
        }
        EventsManager.emit(ShapeEvents.POINT_ADDED,this.shape,{point:event.target});
    }


    /**
     * @ignore
     * Internal method, that triggered when user drags the point
     * @param event Custom event object. Contains SmartPoint object as an `event.target`,
     * `event.oldX` and `event.oldY` as a previous point coordinates before previous drag event.
     */
    this.onPointDragMove = (event) => {
        if (this.shape.isShapePoint(event.target)) {
            this.shape.updatePosition(event.target.x,event.target.y);
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
        try {
            this.shape.root.removeChild(event.target.element);
            this.shape.redraw()
        } catch (err) {}
        EventsManager.emit(ShapeEvents.POINT_DESTROYED,this.shape,{point:event.target});
    }

    /**
     * @ignore
     * Internal method that triggered when request to delete point of shape arroved
     * @param event Custom event object. Contains SmartPoint object as an event.target
     */
    this.onPointDeleteRequest = (event) => {
        if (!this.shape.isShapePoint(event.target)) {
            return
        }
        this.shape.deletePoint(event.target.x,event.target.y);
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
        if (this.subscriptions[eventName] && typeof(this.subscriptions[eventName]) !== "undefined") {
            this.subscriptions[eventName].splice(this.subscriptions[eventName].indexOf(listener), 1);
        }
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
        EventsManager.unsubscribe(PointEvents.POINT_DELETE_REQUEST, this.onPointDeleteRequest);
        if (this.shape.resizeBox) {
            this.shape.resizeBox.removeEventListener(ResizeBoxEvents.RESIZE_BOX_RESIZE,this.resizeBoxListener);
            this.shape.resizeBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_CLICK,this.resizeClickEventListener);
            this.shape.resizeBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_MOVE,this.resizeMouseMoveEventListener);
            this.shape.resizeBox.removeEventListener(ShapeEvents.SHAPE_MOVE_START,this.resizeMouseDownEventListener);
            this.shape.resizeBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_UP,this.resizeMouseUpEventListener);
            this.shape.resizeBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_DOUBLE_CLICK,this.resizeDblClickEventListener);
            this.shape.resizeBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_OVER,this.resizeMouseOverEventListener);
            this.shape.resizeBox.removeEventListener(ShapeEvents.SHAPE_MOUSE_OUT,this.resizeMouseOutEventListener);
            this.shape.resizeBox.removeEventListener("contextmenu",this.resizeBoxContextMenuEventListener);
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
            this.shape.rotateBox.removeEventListener("contextmenu",this.rotateBoxContextMenuEventListener);
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
 * @param move_end {MouseEvent} Emitted when user releases mouse button to stop drag the shape.
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
 * @param resize {ResizeBoxEvents.RESIZE_BOX_RESIZE} Emitted when user resized the shape using resize box. Event object includes fields `oldPos` and
 * `newPos` which are positions of shape before and after resizing.
 * Position is an object with following fields "left,top,right,bottom,width,height"
 * @param rotate {RotateBoxEvents.ROTATE_BOX_ROTATE} Emitted when user rotated the shape using rotate box Event object includes the `angle` field,
 * which is a rotation angle.
 * Position is an object with following fields "left,top,right,bottom,width,height"
 * @param point_drag_start {MouseEvent} Emitted when user starts dragging one of shape's point. Event Includes `point` field.
 * It is a [SmartPoint](#SmartPoint) object.
 * @param point_drag_move {MouseEvent} Emitted when user dragging one of shape's point. Event Includes `point` field.
 * It is a [SmartPoint](#SmartPoint) object.
 * @param point_drag_end {MouseEvent} Emitted when user finishes dragging one of shape's point. Event Includes `point` field.
 * It is a [SmartPoint](#SmartPoint) object.
 * @param point_added {MouseEvent} Emitted when new point added to the shape
 * @param point_removed {MouseEvent} Emitted when point removed from the shape
 * @param destroy {ShapeEvents.SHAPE_DESTROY} Emitted right before shape is destroyed
 * @param add_child {ShapeEvents.SHAPE_ADD_CHILD} New child shape added to this shape. Event object contains a
 * `child` field which is a SmartShape object of added child.
 * @param remove_child {ShapeEvents.SHAPE_REMOVE_CHILD} Child shape removed from this shape. Event object contains a
 * `child` field which is a SmartShape object of removed child.
 * @param shape_activated {ShapeEvents.SHAPE_ACTIVATED} Shape activated
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
    SHAPE_SHOW: "show",
    SHAPE_HIDE: "hide",
    POINT_ADDED: "point_added",
    POINT_DESTROYED: "point_destroyed",
    POINT_DRAG_START: "point_drag_start",
    POINT_DRAG_MOVE: "point_drag_move",
    POINT_DRAG_END: "point_drag_end",
    SHAPE_RESIZE: "resize",
    SHAPE_ROTATE: "rotate",
    SHAPE_ADD_CHILD: "add_child",
    SHAPE_REMOVE_CHILD: "remove_child",
    SHAPE_ACTIVATED: "shape_activated",
    /**
     * Method returns an object of all ShapeEvents that
     * related to mouse.*
     * @returns {array} Array of objects in a format "key:,name:"
     */
    getShapeMouseEvents: () => {
        return Object.keys(ShapeEvents)
            .filter(key=> {
                return ["SHAPE_CREATE","SHAPE_DESTROY","SHAPE_RESIZE","SHAPE_ROTATE"].indexOf(key) === -1 &&
                    typeof(ShapeEvents[key])!== "function"
            }).map(key => {return {key:key,name:ShapeEvents[key]} })
    }
}

export default SmartShapeEventListener;
