/**
 * Class that represents a single point of SmartShape. Usually points constructed not directly, but using `addPoint`, `addPoints` methods of &nbsp;[SmartShape](#SmartShape) class or interactively when user double-clicks on shape's container.
 * @param shape - &nbsp; [SmartShape](#SmartShape) object to which this point belongs
 * @returns {object} SmartPoint object that should be initialized by `init` method.
 * @constructor
 */
function SmartPoint(shape) {

    /**
     * Point HTML element options. Defines look and behavior of point.
     * @param width {int} Width of point in pixels
     * @param height {int} Height of point in pixels
     * @param classes {string} CSS class or classes of point, delimited by comma
     * @param style {object} CSS styles, that override classes. Must be provided as an object (The same as &nbsp; ["style" HTML attribute](https://www.w3schools.com/jsref/prop_html_style.asp))
     * @param canDrag {boolean} Is it allowed to drag this point by mouse to change it positions. Default `true`
     * @param canDelete {boolean} Is it allowed to delete this point by right mouse click. Default `true`. (If &nbsp; [options.canDeletePoints](#SmartShape+options) option is set to `false`, then all points can not be removed regardless of this setting)
     * @type {{}}
     */
    this.options = {};

    /**
     * Initializes new point and displays it on the screen.
     * @param x {int} X coordinate of point relative to shape's container left
     * @param y {int} Y coordinate of point relative to shape's container top
     * @param options Point options, described &nbsp; [above](#SmartPoint+options]. If not specified, then&nbsp; [SmartShape.options.pointOptions](#SmartShape+options) used or global default options for point.
     * @returns {object} constructed SmartPoint object
     */
    this.init = (x,y,options = null) => {
        this.x = x;
        this.y = y;
        this.options = {
            width:10,
            height:10,
            classes: "",
            style: {
                borderWidth:"1px",
                borderStyle:"solid",
                borderColor:"black",
                borderRadius: "25px",
                position:'absolute',
                zIndex:1000,
                cursor:'pointer',
                backgroundColor: "red",
            },
            canDrag: true,
            canDelete: true
        }
        this.shape = shape;
        this.element = this.createPointUI();
        this.setOptions(this.shape.options.pointOptions);
        this.setOptions(options);
        this.addEventListeners();
        this.shape.onPointEvent("point_added",this)
        return this;
    }

    /**
     * Method used to set specified options to point and redraw it with new options.
     * @param options {object} Point options object, described &nbsp; [above](#SmartPoint+options).
     */
    this.setOptions = (options) => {
        if (options && typeof(options) === "object") {
            if (options.style && typeof(options.style) === "object") {
                options.style = Object.assign(this.options.style, options.style)
            }
            Object.assign(this.options,options);
        }
        this.element = this.setPointStyles(this.element);
    }

    /**
     * @ignore
     * Internal method that constructs HTML element of point, applies current options to it
     * @returns {object} HTML element of points
     */
    this.createPointUI = () => {
        const element = document.createElement("div")
        if (!this.shape.options.canDragPoints) {
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
    this.setPointStyles = (element) => {
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
        return element
    }

    /**
     * Method used to redraw the point. Usually used after change point position on the screen.
     */
    this.redrawPoint =() => {
        this.element.style.left = (this.x-parseInt(this.options.width/2))+"px";
        this.element.style.top = (this.y-parseInt(this.options.height/2))+"px";
    }

    /**
     * @ignore
     * Internal method used to attach HTML event listeners to point.
     */
    this.addEventListeners = () => {
        this.element.addEventListener("mouseup",this.mouseup)
        this.element.addEventListener("mousedown", this.mousedown)
    }

    /**
     * @ignore
     * onMouseDown event handler, triggered when user press mouse button on point's DIV element.
     * @param event {MouseEvent} Event object
     */
    this.mousedown = (event) => {
        if (event.buttons === 1 && this.shape.options.canDragPoints && this.options.canDrag) {
            event.preventDefault = true;
            event.stopPropagation();
            this.shape.onPointEvent("point_dragstart", this);
        }
    }

    /**
     * @ignore
     * onMouseMove event handler, triggered when user moves mouse over point's DIV element.
     * @param event {MouseEvent} Event object
     */
    this.mousemove = (event) => {
        if (event.buttons !== 1 || !this.shape.options.canDragPoints || !this.options.canDrag) {
            return
        }
        const newX = this.x + event.movementX;
        const newY = this.y + event.movementY;
        const root = this.shape.root;
        if (newX < 0 || newX > root.clientLeft + root.clientWidth) {
            this.shape.onPointEvent("point_drag",this);
            this.shape.draggedPoint = null;
            return;
        }
        if (newY < 0 || newY > root.clientTop + root.clientHeight) {
            this.shape.onPointEvent("point_drag",this);
            this.shape.draggedPoint = null;
            return;
        }
        this.x += event.movementX;
        this.y += event.movementY;
        this.element.style.left = (this.x-5)+"px";
        this.element.style.top = (this.y-5)+"px";
        this.shape.onPointEvent("point_drag",this);
    }

    /**
     * @ignore
     * onMouseUp event handler, triggered when user releases mouse button on point DIV element.
     * @param event {MouseEvent} Event object
     */
    this.mouseup = (event) => {
        this.shape.onPointEvent("point_dragend", this);
        if (event.button === 2 && this.shape.options.canDeletePoints && this.options.canDelete) {
            this.destroy();
        }
    }

    /**
     * Method used to destroy the point. Removes event listeners from point element and
     * raises "point_destroyed" event. This event then intercepted by owner shape. Then owner shape
     * removes this point from shape's points array.
     */
    this.destroy = () => {
        this.element.removeEventListener("mouseup",this.mouseup)
        this.element.removeEventListener("mousedown", this.mousedown)
        this.shape.onPointEvent("point_destroyed",this)
    }

    return this;
}

export default SmartPoint;
