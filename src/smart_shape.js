import SmartPoint from "./smart_point.js";
import {getOffset} from "./utils.js";

/**
 * SmartShape class. Used to construct shapes.
 * @constructor
 * @return SmartShape object that should be initialised using `init` method.
 */
function SmartShape() {

    /**
     * The HTML container element to which the shape will be injected. This can be any block element,
     * that can have children (div,span etc.)
     * @type {object}
     */
    this.root = null

    /**
     * Array of points of shape polygon. Each item of array is [SmartPoint](#SmartPoint) object.
     * @type {array}
     */
    this.points = [];

    /**
     * [SVG element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element), which used as a backend for shape.
     * SmartShape constructs SVG element based on provided point coordinates and options.
     * @type {object}
     */
    this.svg = null;

    /**
     * Options of shape as an object. Can have the following parameters.
     * @param id {string} Unique ID of shape's SVG HTML element. By default, empty.
     * @param name {string} Name of shape. By default, `Unnamed shape`
     * @param maxPoints {number} Number of points, which possible to add to the shape interactively. By default `-1`,
     * which means Unlimited
     * @param stroke {string} Color of shape lines. Accepts the same values as
     * [SVG stroke](https://www.w3schools.com/graphics/svg_stroking.asp) property accepts. Default -  `rgb(0,0,0)`
     * @param strokeWidth {string} Thickness of shape lines. Accepts the same values as
     * [SVG stroke-width](https://www.w3schools.com/graphics/svg_stroking.asp) property. Default - `2`
     * @param strokeLinecap {string} Type of endings of shape lines. Accepts the same values as
     * [SVG stroke-linecap](https://www.w3schools.com/graphics/svg_stroking.asp) property.
     * @param strokeDasharray {string} Used to create dashed shape lines. Accepts the same values as
     * [SVG stroke-dasharray](https://www.w3schools.com/graphics/svg_stroking.asp) property.
     * @param fill {string} Fill color of shape polygon. Accepts the same values as
     * [SVG fill](https://www.geeksforgeeks.org/svg-fill-attribute/) property. Default: `none` .
     * @param fillOpacity {string} Fill opacity level of shape polygon. Accepts the same values as
     * [SVG fill-opacity](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-opacity) property.Default `1`.
     * @param fillGradient {object} Defines gradient object, that should be used to fill the shape. This could be either
     * linear gradient or radial gradient. See [createGradient](#SmartShape+createGradient) method description.
     * Overrides `fill` property.
     * See demo [here](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/dev/gradient.html).
     * @param fillImage {object} Defines image fill object to fill the shape with image. Should contain following fields:
     * `url` - URL to image, `width` - width of image, `height` - height of image
     * See demo [here](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/dev/fillimage.html).
     * @param classes {string} CSS class names, that will be applied to underlying polygon SVG element.
     * @param style {object} CSS styles, that will be applied to underlying polygon SVG element. Using CSS styles and
     * classes is an alternative way to specify options of SVG elements:
     * https://jenkov.com/tutorials/svg/svg-and-css.html,
     * https://css-tricks.com/svg-properties-and-css/
     * @param offsetX {number} Number of pixels to add to X coordinate of each point to move entire shape
     * to the right. Helps to move entire figure without need to change coordinates of each point. Default: `0`.
     * @param offsetY {number} Number of pixels to add to Y coordinate of each point to move entire shape
     * to the bottom. Helps to move entire figure without need to change coordinates of each point. Default: `0`
     * @param canDragShape {boolean} Is it allowed to drag shape. Default `true`.
     * @param canDragPoints {boolean} Is it allowed to drag points of shape. Default `true`.
     * @param canAddPoints {boolean} Is it allowed to add points to the shape interactively,
     * by mouse double-click on the screen. Default `false`.
     * @param canDeletePoints {boolean} Is it allowed to delete points from the shape interactively,
     * by right mouse click on points. Default `false`.
     * @param pointOptions {object} Default options for created points. See  [options](#SmartPoint+options)
     * property of `SmartPoint` object.
     * @param zIndex {number} Order of element in a stack of HTML elements
     * (https://www.w3schools.com/cssref/pr_pos_z-index.asp). Elements if higher z-index value placed on top.
     * @type {{}}
     */
    this.options = {
        id: "",
        name: "Unnamed shape",
        maxPoints: -1,
        stroke: "rgb(0,0,0)",
        strokeWidth: "2",
        strokeLinecap: "",
        strokeDasharray: "",
        fill: "none",
        fillGradient: null,
        fillImage: null,
        fillOpacity: "1",
        canDragShape: true,
        canDragPoints: true,
        canAddPoints: false,
        canDeletePoints: false,
        offsetX: 0,
        offsetY: 0,
        classes: "",
        style: {},
        pointOptions:{},
        zIndex: 1000,
    };

    /**
     * Left position of the shape relative to container top left.
     * (Read-only, calculated automatically based on points coordinates)
     * @type {number}
     */
    this.left = 0;

    /**
     * Top position of the shape relative to container top left.
     * (Read-only, calculated automatically based on points coordinates)
     * @type {number}
     */
    this.top = 0;

    /**
     * Right position of the shape relative to container top left.
     * (Read-only, calculated automatically based on points coordinates)
     * @type {number}
     */
    this.right = 0;

    /**
     * Bottom position of the shape relative to container top left.
     * (Read-only, calculated automatically based on points coordinates)
     * @type {number}
     */
    this.bottom = 0;

    /**
     * Width of shape
     * (Read-only, calculated automatically based on points coordinates)
     * @type {number}
     */
    this.width = 0;

    /**
     * Height of shape
     * (Read-only, calculated automatically based on points coordinates)
     * @type {number}
     */
    this.height = 0;

    /**
     * Method used to construct SmartShape object with specified from specified `points` and
     * with specified `options`.
     * Then it binds this object to specified `root` HTML node and displays it
     * @param root {HTMLElement} HTML DOM node af a container element
     * @param options {object} Options object to construct this shape ([see above](#SmartShape+options))
     * @param points {array} 2D Array of points for shape polygon.
     * Each element is [x,y] coordinate array
     * @returns {object} constructed SmartShape object
     */
    this.init = (root,options=null,points=null) => {
        if (!root) {
            console.error("Root HTML node not specified. Could not create shape.")
            return
        }
        this.root = root;
        this.root.style.position = "relative";
        this.draggedPoint = null;
        this.root.draggedShape = null;
        this.setOptions(options);
        this.addEventListeners();
        this.setupPoints(points,this.options.pointOptions);

        return this;
    }

    /**
     * Set specified options to the shape. You may not set all options, that exist, but only what you want to change.
     * Options that you set by this method will be merged with already active options.
     * @param options {object} Options object, [described above](#SmartShape+options)
     */
    this.setOptions = (options) => {
        if (options && typeof(options) === "object") {
            if (options.pointOptions && typeof(options.pointOptions) === "object") {
                options.pointOptions = Object.assign(this.options.pointOptions, options.pointOptions)
            }
            if (options.style && typeof(options.style) === "object") {
                options.style = Object.assign(this.options.style, options.style);
            }
            Object.assign(this.options,options);
        }
    }

    // Internal method that installs HTML DOM event listeners to shape, and it's container
    // to handle mouse events properly
    this.addEventListeners = () => {
        if (this.root.getAttribute("sh_listeners") !== "true") {
            this.root.setAttribute("sh_listeners","true");
            this.root.addEventListener("mousemove", (event) => {
                if (this.root.draggedShape) {
                    this.root.draggedShape.mousemove(event);
                }
            })
            this.root.addEventListener("mouseup",this.mouseup);
            this.root.addEventListener("dblclick",this.doubleclick);
        }
        this.nocontextmenu = this.root.addEventListener("contextmenu", event => event.preventDefault())
    }

    /**
     * @ignore
     * Internal function that set points of figure
     * @param points {array} 2D array of points to add. Each point is array of [x,y] coordinates
     * @param pointOptions {object} Array of points options. Described in  [SmartPoint.options](#SmartPoint+options).
     * Can be empty, in this case default `SmartShape.options.pointOptions` will be used,
     * or default options of SmartPoint class itself.
     */
    this.setupPoints = (points,pointOptions) => {
        if (typeof(points) === "object") {
            this.points = [];
            this.addPoints(points,pointOptions);
        }
    }

    /**
     * Add point to shape.
     * @param x {number} X coordinate relative to container left corner
     * @param y {number} Y coordinate relative to container top corner
     * @param pointOptions {object} Array of point options. Described in
     * [SmartPoint.options](#SmartPoint+options). Can be empty,
     * in this case default `SmartShape.options.pointOptions` will be used,
     * or default options of SmartPoint class itself.
     * @returns {object} [SmartPoint](#SmartPoint) object of added point
     */
    this.addPoint = (x,y,pointOptions=null) => {
        const point = this.putPoint(x, y,pointOptions);
        this.redraw();
        return point;
    }

    /**
     * Adds specified points to shape.
     * @param points {array} 2D array of points to add. Each point is array of [x,y] coordinates
     * @param pointOptions {object} Array of points options. Described in
     * [SmartPoint.options](#SmartPoint+options). Can be empty,
     * in this case default `SmartShape.options.pointOptions` will be used,
     * or default options of SmartPoint class itself.
     * */
    this.addPoints = (points,pointOptions=null) => {
        if (!points || typeof(points) !== "object") {
            return
        }
        points.forEach(point => this.putPoint(point[0]+this.options.offsetX,point[1]+this.options.offsetY,pointOptions));
        this.redraw();
    }

    /**
     * @ignore
     * Internal method that used to add point to the shape
     * @param x {number} X coordinate relative to container left corner
     * @param y {number} Y coordinate relative to container top corner
     * @param pointOptions - Array of point options. Described in
     * [SmartPoint.options](#SmartPoint+options). Can be empty,
     * in this case default `SmartShape.options.pointOptions` will be used,
     * or default options of SmartPoint class itself.
     * @returns {object} [SmartPoint](#SmartPoint) object of added point
     */
    this.putPoint = (x,y,pointOptions=null) => {
        if (this.findPoint(x,y)) {
            console.error(`Point with x=${x} and y=${y} already exists`);
            return null;
        }
        const point = new SmartPoint(this).init(x, y, pointOptions)
        this.points.push(point);
        this.root.appendChild(point.element);
        return point;
    }

    /**
     * Method used to delete point with specified coordinates.
     * If point with specified coordinates not found than just
     * do nothing
     * @param x {number} X coordinate of point
     * @param y {number} Y coordinate of point
     */
    this.deletePoint = (x,y) => {
        const point = this.findPoint(x,y);
        if (point) {
            point.destroy();
        }
    }

    /**
     * Method returns SmartPoint object of point with specified coordinates or null, if point not found
     * @param x {number} X coordinate of point
     * @param y {number} Y coordinate of point
     * @returns {null|object}  [SmartPoint](#SmartPoint) object instance of point,
     * or null if point does not exist
     */
    this.findPoint = (x,y) => {
        const point = this.points.find(point => point.x === x && point.y === y)
        if (typeof(point) === "undefined" || !point) {
            return null;
        }
        return point
    }

    /**
     * @ignore
     * Internal method that receives events from point objects and react on them
     * @param event_type - Type of event
     * @param point - [SmartPoint](#SmartPoint) object which raised that event
     */
    this.onPointEvent = (event_type, point) => {
        switch (event_type) {
            case "point_destroyed":
                this.points.splice(this.points.indexOf(point), 1);
                this.root.removeChild(point.element);
                this.redraw()
                break;
            case "point_drag":
                this.redraw()
                break;
            case "point_dragstart":
                this.root.draggedShape = this;
                this.draggedPoint = point;
                break;
            case "point_dragend":
                this.root.draggedShape = null;
                this.draggedPoint = null;
        }
    }

    /**
     * Method used to redraw shape polygon. Used automatically when add/remove points or change their properties.
     */
    this.redraw = () => {
        if (this.svg) {
            this.root.removeChild(this.svg);
            this.svg = null;
        }
        if (this.points.length < 1) {
            return
        }
        this.calcPosition();
        this.svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        this.svg.id = this.options.id;
        this.svg.style.position = 'absolute';
        this.svg.style.cursor = 'crosshair';
        this.svg.style.left = this.left;
        this.svg.style.top = this.top;
        this.svg.setAttribute("width",this.width);
        this.svg.setAttribute("height",this.height);
        if (this.options.fillImage && typeof(this.options.fillImage === "object")) {
            const defs = document.createElementNS(this.svg.namespaceURI,"defs");
            const pattern = this.createImageFill(this.options.fillImage);
            if (pattern) {
                defs.appendChild(pattern)
            }
            this.svg.appendChild(defs);
        } else if (this.options.fillGradient && typeof(this.options.fillGradient === "object") &&
            ["linear","radial"].indexOf(this.options.fillGradient.type) !== -1) {
            const defs = document.createElementNS(this.svg.namespaceURI,"defs");
            const gradient = this.createGradient(this.options.fillGradient);
            defs.appendChild(gradient);
            this.svg.appendChild(defs);
        }
        this.svg.style.zIndex = this.options.zIndex;
        const polygon = this.drawPolygon();
        this.svg.appendChild(polygon);
        this.root.appendChild(this.svg);
        this.svg.addEventListener("mousedown",this.mousedown)
        this.points.forEach(point => {
            point.setOptions(this.options.pointOptions);
            point.setPointStyles();
            point.redraw();
        })
    }

    /**
     * @ignore
     * Internal method that used to construct actual shape SVG polygon during shape redraw process
     * @returns {object} SVG <polygon> object
     */
    this.drawPolygon = () => {
        let polygon = document.createElementNS("http://www.w3.org/2000/svg","polyline");
        if (this.points.length > 2) {
            polygon = document.createElementNS("http://www.w3.org/2000/svg","polygon");
        }
        const points = this.points.map(point => ""+(point.x-this.left)+","+(point.y-this.top)).join(" ");
        polygon.setAttribute("points",points);
        if (this.options.stroke) {
            polygon.setAttribute("stroke", this.options.stroke);
        }
        if (this.options.strokeWidth) {
            polygon.setAttribute("stroke-width",this.options.strokeWidth);
        }
        if (this.options.strokeLinecap) {
            polygon.setAttribute("stroke-linecap",this.options.strokeLinecap);
        }
        if (this.options.strokeDasharray) {
            polygon.setAttribute("stroke-dasharray",this.options.strokeDasharray);
        }
        if (this.options.fill) {
            if (this.options.fillImage && typeof(this.options.fillImage) === "object") {
                polygon.setAttribute("fill",'url("#'+this.options.id+'_pattern'+'")');
            }  else if (this.options.fillGradient && typeof(this.options.fillGradient === "object") &&
                ["linear","radial"].indexOf(this.options.fillGradient.type) !== -1) {
                polygon.setAttribute("fill",'url("#'+this.options.id+'_gradient'+'")');
            } else {
                polygon.setAttribute("fill", this.options.fill);
            }
        }
        if (this.options.fillOpacity) {
            polygon.setAttribute("fill-opacity",this.options.fillOpacity);
        }
        if (this.options.classes) {
            polygon.setAttribute("class",this.options.classes);
        }
        if (this.options.style) {
            for (let cssName in this.options.style) {
                polygon.style[cssName] = this.options.style[cssName]
            }
        }
        polygon.style.zIndex = this.options.zIndex;
        return polygon;
    }

    /**
     * Method, used to create gradient fill for shape, if `options.fillGradient` specified.
     * Triggered automatically when redraw the shape Should not be called directly.
     * @param gradientOptions {object} Javascript object that describes gradient. Must have `type` property which
     * equal to `linear` or `radial`. Accepts all options, that SVG linear gradient or SVG radial gradient accept.
     * @returns {HTMLOrSVGElement} SVG element that defines gradient: either `linearGradient` or
     * `radialGradient`. See: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient
     */
    this.createGradient = (gradientOptions) => {
        let gradient = document.createElementNS(this.svg.namespaceURI,"linearGradient");
        if (gradientOptions.type === "radial") {
            gradient = document.createElementNS(this.svg.namespaceURI,"radialGradient");
        }
        gradient.id = this.options.id+"_gradient";
        let foundSteps = false;
        for (let index in gradientOptions) {
            if (index === "type") { continue }
            if (index === "steps") {
                foundSteps = true;
                continue;
            }
            gradient.setAttribute(index,gradientOptions[index])
        }
        if (!foundSteps) {
            return gradient;
        }
        for (let step of gradientOptions.steps) {
            const stepNode = document.createElementNS(this.svg.namespaceURI,"stop");
            stepNode.setAttribute("offset",step.offset);
            stepNode.setAttribute("stop-color",step.stopColor);
            stepNode.setAttribute("stop-opacity",step.stopOpacity);
            gradient.appendChild(stepNode);
        }
        return gradient;
    }

    /**
     * Method used to construct SVG pattern to fill the shape with an image. Consists of
     * `pattern` SVG node:
     * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern.
     * and `image` SVG node inside it.
     * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image
     * Triggered automatically when redraw the shape, if `options.fillGradient` specified.
     * Should not be called directly.
     * @param imageFillOptions {object} Options that define image filling pattern. Must
     * contain `href`, `width` and `height` of image. Also, accepts any other options, that
     * `pattern` SVG tag.
     * @returns {object} Constructed `pattern` SVG tag or null, in case of errors
     */
    this.createImageFill = (imageFillOptions) => {
        if (!imageFillOptions.href || !imageFillOptions.width || !imageFillOptions.height) {
            console.error("Image HREF, width and height must be specified for Image Fill");
            return null;
        }
        const pattern = document.createElementNS(this.svg.namespaceURI, "pattern");
        pattern.setAttribute("id",this.options.id+"_pattern");
        pattern.setAttribute("patternUnits","userSpaceOnUse");
        for (let index in imageFillOptions) {
            if (index === "href") {
                continue;
            }
            pattern.setAttribute(index,imageFillOptions[index])
        }
        const image = document.createElementNS(this.svg.namespaceURI, "image");
        image.setAttribute("href",imageFillOptions.href);
        image.setAttribute("width",imageFillOptions.width);
        image.setAttribute("height",imageFillOptions.height);
        pattern.appendChild(image);
        return pattern;
    }

    /**
     * @ignore
     * Internal method that used to calculate shape dimensions, based on point coordinates.
     * Set left,top,right,bottom,width and height of shape.
     */
    this.calcPosition = () => {
        this.left = this.points.map(point => point.x).reduce((minx,x) => x < minx ? x : minx);
        this.top = this.points.map(point => point.y).reduce((miny,y) => y < miny ? y : miny);
        this.right = this.points.map(point => point.x).reduce((maxx,x) => x > maxx ? x : maxx);
        this.bottom = this.points.map(point => point.y).reduce((maxy,y) => y > maxy ? y : maxy);
        this.width = this.right-this.left;
        this.height = this.bottom-this.top;
    }

    /**
     * Destroys the shape. Destroys all points, removes event listeners and removes the shape from screen.
     * But variable continue existing. To completely remove the shape,
     * set variable to 'null' after calling this method.
     */
    this.destroy = () => {
        this.points.forEach(point => {
            this.root.removeChild(point.element)
        })
        this.root.removeEventListener("contextmenu",this.nocontextmenu);
        this.root.removeEventListener("mouseup",this.mouseup);
        this.points = [];
        this.redraw();
    }

    /**
     * @ignore
     * OnMouseUp event handler, triggered when user release mouse button on shape or on shape container element
     * @param event {MouseEvent} Event object
     */
    this.mouseup = (event) => {
        if (event.buttons === 1 && this.options.canAddPoints && !this.draggedPoint) {
            if (this.options.maxPoints === -1 || this.points.length < this.options.maxPoints) {
                this.addPoint(event.clientX-this.root.offsetLeft, event.clientY-this.root.offsetTop)
            }
        }
        if (this.root.draggedShape) {
            this.root.draggedShape.draggedPoint = null;
            this.root.draggedShape = null;
        }
    }

    /**
     * @ignore
     * odDblClick event handler, triggered when user double-clicks on shape or on shape container element
     * @param event {MouseEvent} Event object
     */
    this.doubleclick = (event) => {
        event.stopPropagation();
        if (this.options.canAddPoints && !this.draggedPoint) {
            if (this.options.maxPoints === -1 || this.points.length < this.options.maxPoints) {
                this.addPoint(event.clientX-this.root.offsetLeft, event.clientY-this.root.offsetTop)
            }
        }
    }

    /**
     * @ignore
     * onMouseDown event handler, triggered when user press mouse button on the shape or on container element.
     * @param event {MouseEvent} Event object
     */
    this.mousedown = (event) => {
        this.root.draggedShape = this;
    }

    /**
     * @ignore
     * onMouseMove event handler, triggered when user moves mouse over the shape or container element.
     * @param event {MouseEvent} Event object
     */
    this.mousemove = (event) => {
        if (event.buttons !== 1) {
            return
        }
        if (this.draggedPoint) {
            this.draggedPoint.mousemove(event);
            return
        }
        if (!this.options.canDragShape) {
            return
        }
        const [stepX, stepY] = this.calcMovementOffset(event);
        if (stepX === null || stepY === null) {
            return
        }
        for (let index in this.points) {
            this.points[index].x += stepX;
            this.points[index].y += stepY;
            this.points[index].redraw();
        }
        this.redraw()
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
        this.calcPosition();
        let stepX = event.movementX;
        let stepY = event.movementY;
        let clientX = event.clientX;
        let clientY = event.clientY;
        const newX = this.left + stepX;
        const newY = this.top + stepY;
        const offset = getOffset(this.root, true);
        if (newX < 0 || newX+this.width > this.root.clientLeft + this.root.clientWidth) {
            return [null, null]
        }
        if (newY < 0 || newY+this.height > this.root.clientTop + this.root.clientHeight) {
            return [null, null]
        }
        if (clientX<newX+offset.left) {
            stepX = clientX - (newX+offset.left);
        }
        if (clientY<newY+offset.top) {
            stepY = clientY - (newY+offset.top);
        }
        if (clientX>newX+this.width+offset.left) {
            stepX = clientX -  (this.width+offset.left+this.left);
        }
        if (clientY>newY+this.height+offset.right) {
            stepY = clientY -  (this.height+offset.top+this.top);
        }
        return [stepX, stepY];
    }

    /**
     * Returns 2D array of points coordinates in format [ [x,y], [x,y], [x,y] ... ].
     * @returns {array} 2D array of points in format [ [x,y], [x,y], [x,y] ... ]
     */
    this.getPointsArray = () => {
        let result = [];
        if (this.points && typeof(this.points) === "object" && this.points.length) {
            result = this.points.map(point => [point.x,point.y])
        }
        return result;
    }
}

export default SmartShape;
