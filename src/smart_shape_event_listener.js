import EventsManager from "./events/EventsManager.js";
import {getOffset} from "./utils.js";
import {PointEvents} from "./smart_point.js";

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
     * Method binds events to the shape and returns itself
     * @returns {SmartShapeEventListener}
     */
    this.run = () => {
        this.shape = shape;
        this.addEventListeners();
        return this;
    }

    /**
     * @ignore
     * Internal method that installs HTML DOM event listeners to the shape, and it's container
     */
    this.addEventListeners = () => {
        if (this.shape.root.getAttribute("sh_listeners") !== "true") {
            this.shape.root.setAttribute("sh_listeners","true");
            this.shape.root.addEventListener("mousemove", (event) => {
                if (this.shape.root.draggedShape) {
                    this.shape.root.draggedShape.eventListener.mousemove(event);
                }
            })
            this.shape.root.addEventListener("mouseup",this.mouseup);
            this.shape.root.addEventListener("dblclick",this.doubleclick);
            this.shape.root.addEventListener("mouseenter", this.mouseenter);
            if (this.shape.options.canDeletePoints) {
                this.nocontextmenu = this.shape.root.addEventListener("contextmenu", event => event.preventDefault())
            }
            window.addEventListener("resize", this.onWindowResize);
        }
        EventsManager.subscribe(PointEvents.POINT_ADDED, this.onPointAdded);
        EventsManager.subscribe(PointEvents.POINT_DRAG_START, this.onPointDragStart);
        EventsManager.subscribe(PointEvents.POINT_DRAG_MOVE, this.onPointDragMove);
        EventsManager.subscribe(PointEvents.POINT_DRAG_END, this.onPointDragEnd);
        EventsManager.subscribe(PointEvents.POINT_DESTROYED, this.onPointDestroyed);
    }

    /**
     * @ignore
     * OnMouseUp event handler, triggered when user releases mouse button on shape or on shape container element
     * @param event {MouseEvent} Event object
     */
    this.mouseup = (event) => {
        if (event.buttons === 1 && this.shape.options.canAddPoints && !this.shape.draggedPoint) {
            if (this.shape.options.maxPoints === -1 || this.shape.points.length < this.shape.options.maxPoints) {
                this.shape.addPoint(event.clientX-this.shape.root.offsetLeft, event.clientY-this.shape.root.offsetTop)
            }
        }
        if (this.shape.root.draggedShape) {
            this.shape.root.draggedShape.draggedPoint = null;
            this.shape.root.draggedShape = null;
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
                this.shape.addPoint(event.clientX-this.shape.root.offsetLeft, event.clientY-this.shape.root.offsetTop)
            }
        }
    }

    /**
     * @ignore
     * onMouseDown event handler, triggered when user presses mouse button on the shape or on container element.
     * @param event {MouseEvent} Event object
     */
    this.mousedown = (event) => {
        this.shape.root.draggedShape = this.shape;
    }

    /**
     * @ignore
     * onMouseMove event handler, triggered when user moves mouse over the shape or container element.
     * @param event {MouseEvent} Event object
     */
    this.mousemove = (event) => {
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
        for (let index in this.shape.points) {
            this.shape.points[index].x += stepX;
            this.shape.points[index].y += stepY;
            this.shape.points[index].redraw();
        }
        this.shape.redraw()
    }

    /**
     * @ignore
     * onMouseEnter event handler, triggered when mouse cursor enters shape's container element
     * @param event {MouseEvent} Event object
     */
    this.mouseenter = (event) => {
        if (event.buttons !== 1) {
            if (this.shape.root.draggedShape) {
                this.shape.root.draggedShape.draggedPoint = null;
            }
            this.shape.root.draggedShape = null;
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
        let clientX = event.clientX;
        let clientY = event.clientY;
        const newX = this.shape.left + stepX;
        const newY = this.shape.top + stepY;
        const offset = getOffset(this.shape.root, true);
        if (newX < 0 || newX+this.shape.width > this.shape.root.clientLeft + this.shape.root.clientWidth) {
            return [null, null]
        }
        if (newY < 0 || newY+this.shape.height > this.shape.root.clientTop + this.shape.root.clientHeight) {
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
     * @param event Custom event object
     */
    this.onPointAdded = (event) => { /* Temporary empty */ }

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
     * @param event Window resize event - [UIEvent](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent).
     */
    this.onWindowResize = (/** event **/) => {
        EventsManager.emit(ContainerEvents.CONTAINER_BOUNDS_CHANGED,this.shape,
            {bounds:this.shape.getBounds(),points:this.shape.points}
        )
    }

    /**
     * @ignore
     * Used to remove all event listeners when destroy the object
     */
    this.destroy = () => {
        if (this.shape.options.canDeletePoints) {
            this.shape.root.removeEventListener("contextmenu", this.nocontextmenu);
        }
        this.shape.root.removeEventListener("mouseup",this.mouseup);
        window.removeEventListener("window.resize",this.onWindowResize);
        EventsManager.unsubscribe(PointEvents.POINT_ADDED, this.onPointAdded);
        EventsManager.unsubscribe(PointEvents.POINT_DRAG_START, this.onPointDragStart);
        EventsManager.unsubscribe(PointEvents.POINT_DRAG_MOVE, this.onPointDragMove);
        EventsManager.unsubscribe(PointEvents.POINT_DRAG_END, this.onPointDragEnd);
        EventsManager.unsubscribe(PointEvents.POINT_DESTROYED, this.onPointDestroyed);
    }
}

/**
 * Enumeration of event names, that can be emitted by [SmartShape](#SmartShape) object.
 @param CONTAINER_BOUNDS_CHANGED by shape when dimensions of container changed, e.g. browser
 window resized. Sends the event with the following fields: `bounds` -an object with the following fields:
 left:number,top:number,right:number,bottom:number, `points` - array of points ([SmartPoint](#SmartPoint) objects)
 with array of all points of this shape, which could be affected by this bounds change.
 @enum {string}
*/
export const ContainerEvents = {
    CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
}

export default SmartShapeEventListener;
