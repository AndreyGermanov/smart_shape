import SmartPoint from "./smart_point.js";
import SmartShapeDrawHelper from "./smart_shape_draw_helper.js";
import SmartShapeEventListener from "./smart_shape_event_listener.js";
import ResizeBox from "./resizebox/ResizeBox.js";
import {uuid} from "./utils.js";

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
     * linear gradient or radial gradient. Overrides `fill` property.
     * See demo [here](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/dev/gradient.html).
     * @param fillImage {object} Defines image fill object to fill the shape with image. Should contain following fields:
     * `url` - URL to image, `width` - width of image, `height` - height of image
     * See demo [here](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/dev/fillimage.html).
     * @param filters {object} Object, that defines a set of SVG filters, that will be applied to this shape.
     * Keys are names of filters, for example `feDropShadow` for drop-shadow filter. Values are objects with attributes
     * for each filter. All attributes, that supported by each particular SVG filter are supported. See more about SVG
     * filters [here](#https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter).
     * The demo of applying feDropShadow filter see
     * [here](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/dev/svgfilters.html)
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
     * @param canAddPoints {boolean} Is it allowed to add points to the shape interactively,
     * by mouse double-click on the screen. Default `false`.
     * @param canScale {boolean} Is it allowed to scale this shape. If true, then [ResizeBox](#ResizeBox) appears
     * around shape and user can drag in to resize shape in different directions
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
        filters:{},
        canDragShape: true,
        canAddPoints: false,
        canScale: false,
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
     * Internal global unique identifier of shape. Generated automatically.
     * @type {string}
     */
    this.guid = uuid();

    /**
     * [ResizeBox](#ResizeBox) component, used to scale shape if
     * `canScale` option enabled
     * @type {ResizeBox}
     */
    this.resizeBox = null;

    /**
     * Method used to construct SmartShape object with specified `points` and
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
        this.eventListener = new SmartShapeEventListener(this).run();
        this.setupPoints(points,Object.assign({},this.options.pointOptions));
        if (this.options.canScale) {
            this.setupResizeBox();
        }
        return this;
    }

    /**
     * @ignore
     * Used to setup [ResizeBox](#ResizeBox) around shape if shape scaling is enabled
     */
    this.setupResizeBox = () => {
        const bounds = this.getResizeBoxBounds();
        this.resizeBox = new ResizeBox().init(this.root,bounds.left,bounds.top,bounds.width,bounds.height,{
            zIndex: this.options.zIndex-1,
            id: this.options.id+"_resizebox",
            shapeOptions:{
                canDragShape: false
            }
        })
        this.calcPosition();
        this.eventListener.addResizeEventListener();
        this.resizeBox.redraw();
    }

    /**
     * @ignore
     * Returns dimensions of resize box around shape according to shape dimensions
     * @returns {{top: number, left: number, bottom: *, width: *, right: *, height: *}}
     */
    this.getResizeBoxBounds = () => {
        this.calcPosition();
        const [pointWidth,pointHeight] = this.getMaxPointSize();
        const result = {
            left: this.left - pointWidth - 5,
            right: this.right + pointWidth + 5,
            top: this.top - pointHeight - 5,
            bottom: this.bottom + pointHeight + 5,
            width: this.width + (pointWidth + 5)*2,
            height: this.height + (pointHeight + 5)*2,
        }
        if (result.left < 0) {
            this.moveTo(result.left*-1,this.top);
            result.left = 0;
        }
        if (result.top < 0) {
            this.moveTo(this.left,result.top*-1);
            result.top = 0;
        }
        const bounds = this.getBounds();
        if (result.bottom > bounds.bottom) {
            this.moveTo(this.left,result.bottom-bounds.bottom+this.top);
            result.bottom = bounds.bottom;
        }
        if (result.right > bounds.right) {
            this.moveTo(result.right-bounds.right+this.left,this.top);
            result.bottom = bounds.bottom;
        }
        return result;
    }

    /**
     * @ignore
     * Method finds and return the size of the biggest point in this shape
     * @returns {array} [width,height]
     */
    this.getMaxPointSize = () => {
        const pointWidth = this.points.map(point=>point.options.width).reduce((w1,w2) => Math.max(w1,w2));
        const pointHeight = this.points.map(point=>point.options.height).reduce((h1,h2) => Math.max(h1,h2));
        return [pointWidth,pointHeight];
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
            this.points.forEach(point=>{
                point.setOptions(Object.assign({},this.options.pointOptions));
                point.options.bounds = this.getBounds();
                if (point.options.zIndex <= this.options.zIndex) {
                    point.options.zIndex = this.options.zIndex+1;
                }
                point.redraw();
            })
        }
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
            this.addPoints(points,Object.assign({},pointOptions));
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
        const point = this.putPoint(x, y,Object.assign({},pointOptions));
        this.redraw();
        return point;
    }

    /**
     * Adds specified points to shape.
     * @param points {array} 2D array of points to add. Each point is array of [x,y] coordinates
     * @param pointOptions {object} Points options. Described in
     * [SmartPoint.options](#SmartPoint+options). Can be empty,
     * in this case default `SmartShape.options.pointOptions` will be used,
     * or default options of SmartPoint class itself.
     * */
    this.addPoints = (points,pointOptions=null) => {
        if (!points || typeof(points) !== "object") {
            return
        }
        points.forEach(point => this.putPoint(point[0]+this.options.offsetX,point[1]+this.options.offsetY,Object.assign({},pointOptions)));
        this.redraw();
    }

    /**
     * @ignore
     * Internal method that used to add point to the shape
     * @param x {number} X coordinate relative to container left corner
     * @param y {number} Y coordinate relative to container top corner
     * @param pointOptions - Points options. Described in
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
        if (!pointOptions) {
            pointOptions = this.options.pointOptions || {};
        }
        pointOptions.bounds = this.getBounds();
        pointOptions.zIndex = this.options.zIndex+1;
        const point = new SmartPoint().init(x, y, pointOptions)
        this.points.push(point);
        this.root.appendChild(point.element);
        return point;
    }

    /**
     * Method used to delete point with specified coordinates.
     * If point with specified coordinates not found then just
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
        const point = this.points.find(item => item.x === x && item.y === y)
        if (typeof(point) === "undefined" || !point) {
            return null;
        }
        return point
    }

    /**
     * Method returns SmartPoint object for point with specified ID or null, if point not found
     * @param id {string} ID of point, provided to it as an options
     * @returns {null|object} [SmartPoint](#SmartPoint) object instance of point,
     * or null if point does not exist
     */
    this.findPointById = (id) => {
        const point = this.points.find(item => item.options.id === id)
        if (typeof(point) === "undefined" || !point) {
            return null;
        }
        return point
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

    /**
     * Moves shape to specific position. It only changes coordinates of points, but do not
     * redraws the shape on new position. So, you need to call `redraw` yourself after move.
     * @param x new X coordinate
     * @param y new Y coordinate
     */
    this.moveTo = (x,y) => {
        const bounds = this.getBounds();
        let newX = x+this.width > bounds.right ? bounds.right - this.width : x;
        let newY = y+this.height > bounds.bottom ? bounds.bottom - this.height: y;
        this.points.forEach(point => { point.x += (newX-this.left); point.y += (newY-this.top)});
        this.calcPosition();
    }

    /**
     * Scales image to fit specified `width` and `height`. It only changes coordinates of points, but do not
     * redraws the shape on new position. So, you need to call `redraw` yourself after scale.
     * @param width new width
     * @param height new height
     */
    this.scaleTo = (width,height) => {
        const bounds = this.getBounds();
        this.calcPosition();
        let newWidth = this.left + width > bounds.right ? bounds.right - this.left : width;
        let newHeight = this.top + height > bounds.bottom ? bounds.bottom - this.top : height;
        let scaleX = newWidth/this.width;
        let scaleY = newHeight/this.height;
        this.points.forEach(point => {
            point.x = (point.x-this.left)*scaleX+this.left;
            point.y = (point.y-this.top)*scaleY+this.top}
        );
        this.calcPosition();
    }

    /**
     * Method used to redraw shape polygon. Runs automatically when add/remove points or change their properties.
     */
    this.redraw = () => {
        SmartShapeDrawHelper.draw(this);
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
     * Method returns the coordinates of container, to which this shape connected.
     * @returns {{top: number, left: number, bottom: number, right: number}}
     */
    this.getBounds = () => {
        return {
            left: this.root.clientLeft,
            top: this.root.clientTop,
            right: this.root.clientLeft+ this.root.clientWidth,
            bottom: this.root.clientTop+this.root.clientHeight
        }
    };

    /**
     * Method returns true if specified point exists in the array of this shape or false if not.
     * @param point [SmartPoint](#SmartPoint) object of point to search
     * @returns {boolean} True if this point exists and false if not
     */
    this.isShapePoint = (point) => {
        return !!this.points.find(item => item === point);
    }

    /**
     * Destroys the shape. Destroys all points, removes event listeners and removes the shape from screen.
     * But variable continue existing. To completely remove the shape,
     * set the variable to 'null' after calling this method.
     */
    this.destroy = () => {
        this.points.forEach(point => {
            this.root.removeChild(point.element)
        })
        this.eventListener.destroy();
        this.points = [];
        this.redraw();
    }
}
window.ResizeBox = ResizeBox;
export default SmartShape;
