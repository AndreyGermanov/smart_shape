import {getOffset} from "./utils.js";

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
        }
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
     * Internal method that receives events from point objects and reacts on them
     * @param event_type - Type of event
     * @param point - [SmartPoint](#SmartPoint) object which raised that event
     */
    this.onPointEvent = (event_type, point) => {
        switch (event_type) {
            case "point_destroyed":
                this.shape.points.splice(this.shape.points.indexOf(point), 1);
                this.shape.root.removeChild(point.element);
                this.shape.redraw()
                break;
            case "point_drag":
                this.shape.redraw()
                break;
            case "point_dragstart":
                this.shape.root.draggedShape = this.shape;
                this.shape.draggedPoint = point;
                break;
            case "point_dragend":
                this.shape.root.draggedShape = null;
                this.shape.draggedPoint = null;
        }
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
    }
}

export default SmartShapeEventListener;
