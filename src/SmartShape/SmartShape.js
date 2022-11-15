import SmartShapeManager from "../SmartShapeManager/SmartShapeManager.js";
import SmartPoint from "../SmartPoint/SmartPoint.js";
import SmartShapeDrawHelper, {PngExportTypes} from "./SmartShapeDrawHelper.js";
import SmartShapeGroupHelper from "./SmartShapeGroupHelper.js";
import SmartShapeEventListener, {ShapeEvents} from "./SmartShapeEventListener.js";
import ResizeBox from "../ResizeBox/ResizeBox.js";
import RotateBox from "../RotateBox/RotateBox.js";
import {
    getRotatedCoords,
    mergeObjects,
    notNull,
    uuid,
    isPointInsidePolygon,
    getOffset,
    readJSON, abs, recursiveDeepCopy
} from "../utils";
import EventsManager from "../events/EventsManager.js";
import {
    applyAspectRatio,
    distance,
    distanceFromLine,
    flipPoint,
    mapPointCords,
    PointMapTypes
} from "../utils/geometry.js";
import SmartShapeContextMenu from "./SmartShapeContextMenu.js";
/**
 * SmartShape class. Used to construct shapes.
 * @constructor
 * @return SmartShape object that should be initialised using `init` method.
 */
function SmartShape() {

    /**
     * The HTML container element to which the shape will be injected. This can be any block element,
     * that can have children (div,span etc.)
     * @type {HTMLElement}
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
     * @type {HTMLOrSVGElement}
     */
    this.svg = null;

    /**
     * [SVG element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element), which used as a backend for shape.
     * SVG Polygon element that defines a shape inside <SVG> element
     * @type {HTMLOrSVGElement}
     */
    this.polygon = null;

    /**
     * Helper object that used to manage children shapes of this shape
     * @type {SmartShapeGroupHelper}
     */
    this.groupHelper = null;

    this.eventListener = null;

    /**
     * Options of shape as an object. Can have the following parameters.
     * @param id {string} Unique ID of shape's SVG HTML element. By default, empty.
     * @param name {string} Name of shape. By default, `Unnamed shape`
     * @param maxPoints {number} Number of points, which possible to add to the shape interactively. By default `-1`,
     * which means Unlimited
     * @param style {object} CSS styles, that will be applied to underlying polygon SVG element. Using CSS styles and
     * classes is an alternative way to specify options of SVG elements:
     * https://jenkov.com/tutorials/svg/svg-and-css.html,
     * https://css-tricks.com/svg-properties-and-css/
     * @param fillGradient {object} Defines gradient object, that should be used to fill the shape. This could be either
     * linear gradient or radial gradient. To make it work, it's required to set 'fill:#gradient' inside style.
     * See demo [here](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/dev/gradient.html).
     * @param fillImage {object} Defines image fill object to fill the shape with image. Should contain following fields:
     * `href` - URL to image, `width` - width of image, `height` - height of image
     * To make image fill work, it's required to set 'fill:#image' inside style
     * See demo [here](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/dev/fillimage.html).
     * @param filters {object} Object, that defines a set of SVG filters, that will be applied to this shape.
     * Keys are names of filters, for example `feDropShadow` for drop-shadow filter. Values are objects with attributes
     * for each filter. All attributes, that supported by each particular SVG filter are supported. See more about SVG
     * filters [here](#https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter).
     * The demo of applying feDropShadow filter see
     * [here](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/dev/svgfilters.html)
     * @param classes {string} CSS class names, that will be applied to underlying polygon SVG element.
     * @param canDragShape {boolean} Is it allowed to drag shape. Default `true`.
     * @param canAddPoints {boolean} Is it allowed to add points to the shape interactively,
     * by mouse double-click on the screen. Default `false`.
     * @param canScale {boolean} Is it allowed to scale this shape. If true, then [ResizeBox](#ResizeBox) appears
     * around shape and user can drag it to resize shape in different directions
     * @param canRotate {boolean} Is it allowed to rotate this shape. If true, then [RotateBox](#RotateBox) appears
     * around shape and user can drag it to rotate shape in different directions
     * @param pointOptions {object} Default options for created points. See  [options](#SmartPoint+options)
     * property of `SmartPoint` object.
     * @param zIndex {number} Order of element in a stack of HTML elements
     * (https://www.w3schools.com/cssref/pr_pos_z-index.asp). Elements if higher z-index value placed on top.
     * @param bounds {object} Bounds for shape movement and points dragging. This is an object with `left`, `top`, `right`
     * and `bottom` values. By default, all values are equal -1, which means that bounds not specified. If bounds not
     * specified, then left, top, right and bottom of container element will be used for this
     * @param visible {boolean} Shape is visible or not. By default, `true`.
     * @param displayMode {SmartShapeDisplayMode} In which mode the shape is displayed: default mode or with resize
     * or rotate box around it. See [SmartShapeDisplayMode](#SmartShapeDisplayMode)
     * @param managed {boolean} Should this shape be managed by [SmartShapeManager](#SmartShapeManager). Default: true
     * @param minWidth {number} Minimum width of shape. By default `-1` - unlimited
     * @param minHeight {number} Minimum height of shape. By default `-1` - unlimited
     * @param maxWidth {number} Maximum width of shape. By default `-1` - unlimited
     * @param maxHeight {number} Maximum width of shape. By default `-1` - unlimited
     * @param hasContextMenu {boolean} Should the shape have context menu. False by default
     * @param minPoints {number} Minimum number of points in the shape. Default: 3.
     * @param groupChildShapes {boolean} Should child shapes be grouped and move/resize/rotate/destroy together.
     * True by default
     * @param moveToTop {boolean} Should shape go to top based on "zIndex" when user clicks on it. True by default
     * @param compactExport {boolean} If this is true, then it will save only coordinates of
     * points, but not their properties during export to JSON using .toJSON() method
     * @param forceCreateEvent {boolean} Internal parameter used by JSON import.
     * By default, if shape does not have point when create, it does not emit SHAPE_CREATE event on init() method.
     * If this option set to true, then init() methods emits SHAPE_CREATE event event for empty shapes.
     * @param initialPoints {array} 2D array of initial coordinates of points in format [ [x,y], [x,y] ...]
     * If this shape loaded from external resource and then modified, this array is a way to return back to initial
     * coordinates
     * @param zoomLevel {number} Current zoom level of shape. By default it is 1, which means that shape is not zoomed.
     * If less than 1, than shape decreased, if greater than 1, then shape increased.
     * to the bottom. Helps to move entire figure without need to change coordinates of each point. Default: `0`
     * @param offsetX {number} Offset on X axis that shape moved from initial position when initially loaded from external source.
     * @param offsetY {number} Offset on Y axis that shape moved from initial position when initially loaded.
     * @param displayAsPath {boolean} Should display all children of shape as a single SVG path. Default - false.
     * @param simpleMode {boolean} Simple load mode (do not create point objects)
     * @param scaleFactorX {number} Scaling factor that shows to which extent the shape was scaled in current moment
     * after create by X axis. By default 1 (not scaled)
     * @param scaleFactorY {number} Scaling factor that shows to which extent the shape was scaled in current moment
     * after create by Y axis. By default 1 (not scaled)
     * @param flippedX {boolean}  Shows that the shape was flipped by X axis after create. By default false.
     * @param flippedY {boolean}  Shows that the shape was flipped by Y axis after create. By default false.
     * @param rotateAngle {number} Shows the angle to which the shape was rotated after create. By default 0.
     * @type {object}
     */
    this.options = {
        id: "",
        name: "Unnamed shape",
        maxPoints: -1,
        fillGradient: null,
        fillImage: null,
        filters:{},
        canDragShape: true,
        canAddPoints: false,
        canScale: false,
        canRotate: false,
        offsetX: 0,
        offsetY: 0,
        classes: "",
        style: {
            fill:"none",
            "fill-opacity":1,
            "stroke":"black",
            "stroke-width":2,
            "stroke-opacity":1,
            "stroke-dasharray":0,
            "stroke-linecap":"square"
        },
        pointOptions:{canDrag:true},
        zIndex: 1000,
        bounds: {left:-1,top:-1,right:-1,bottom:-1},
        visible:true,
        displayMode: SmartShapeDisplayMode.DEFAULT,
        managed: true,
        minWidth: -1,
        minHeight : -1,
        maxWidth: -1,
        maxHeight: -1,
        hasContextMenu:true,
        minPoints: 3,
        groupChildShapes: true,
        moveToTop: true,
        compactExport: false,
        forceCreateEvent: false,
        zoomLevel:1,
        initialPoints: [],
        displayAsPath: false,
        simpleMode: false,
        scaleFactorX: 1,
        scaleFactorY: 1,
        rotateAngle: 0,
        flippedX: false,
        flippedY: false
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
     * Array of children of current shape
     * @type {array}
     */
    this.children = [];

    /**
     * [ResizeBox](#ResizeBox) component, used to scale shape if
     * `canScale` option enabled
     * @type {ResizeBox}
     */
    this.resizeBox = null;

    /**
     * [RotateBox](#RotateBox) component, used to rotate shape if
     * `canRotate` option enabled
     * @type {RotateBox}
     */
    this.rotateBox = null;

    /**
     * Initial center of shape, when user started rotating the shape
     * using Rotate Box
     * @type {array} Coordinates as an array [x,y]
     */
    this.initCenter = null;

    /**
     * Context menu of shape that appear on right mouse click
     * if `hasContextMenu` option is true
     * @type {SmartShapeContextMenu}
     */
    this.shapeMenu = null;

    /**
     * Method used to construct SmartShape object with specified `points` and
     * with specified `options`.
     * Then it binds this object to specified `root` HTML node and displays it
     * @param root {HTMLElement} HTML DOM node af a container element
     * @param options {object} Options object to construct this shape ([see above](#SmartShape+options))
     * @param points {array} 2D Array of points for shape polygon.
     * Each element is [x,y] coordinate array
     * @param show {boolean} Should display the shape by default. Default: true
     * @returns {object} constructed SmartShape object
     */
    this.init = (root,options= null,points= null,show= true) => {
        if (!root) {
            console.error("Root HTML node not specified. Could not create shape.")
            return
        }
        if (SmartShapeManager.getShape(this)) {
            console.error("This shape already initialized");
            return
        }
        this.root = root;
        this.root.style.position = "relative";
        if (this.options.hasContextMenu && (typeof(options.hasContextMenu)==="undefined" || options.hasContextMenu)) {
            this.shapeMenu = new SmartShapeContextMenu(this)
        }
        this.eventListener = new SmartShapeEventListener(this);
        this.setOptions(options);
        this.groupHelper = new SmartShapeGroupHelper(this);
        if (points && points.length) {
            this.setupPoints(points, mergeObjects({}, this.options.pointOptions));
            this.redraw();
        }
        this.eventListener.run();
        if (this.shapeMenu && typeof(this.shapeMenu) === "object") {
            this.shapeMenu.updateContextMenu();
        }
        if (show) {
            this.applyDisplayMode();
        }
        if (points && points.length || this.options.forceCreateEvent) {
            EventsManager.emit(ShapeEvents.SHAPE_CREATE, this, {});
        }
        return this;
    }

    /**
     * Set specified options to the shape. You may not set all options, that exist, but only what you want to change.
     * Options that you set by this method will be merged with already active options.
     * @param options {object} Options object, [described above](#SmartShape+options)
     */
    this.setOptions = (options) => {
        if (!options || typeof(options) !== "object") {
            return
        }
        if (notNull(options.visible) && options.visible !== this.options.visible) {
            if (!this.options.simpleMode) {
                this.points.filter(point => typeof (point.setOptions) === "function")
                    .forEach(point => point.options.visible = options.visible);
            }
            this.resizeBox && this.resizeBox.setOptions({shapeOptions:{visible:options.visible}});
            this.rotateBox && this.rotateBox.setOptions({shapeOptions:{visible:options.visible}});
        }
        if (notNull(options.fillGradient)) {
            this.options.fillGradient = {};
        }
        if (notNull(options.fillImage)) {
            this.options.fillImage = {};
        }
        this.options = mergeObjects(this.options,options);
        if (!this.options.simpleMode) {
            this.points.filter(point => typeof (point.setOptions) === "function").forEach(point => {
                point.setOptions(mergeObjects({}, this.options.pointOptions))
                point.options.bounds = this.getBounds();
                if (point.options.zIndex <= this.options.zIndex) {
                    point.options.zIndex = this.options.zIndex + 1;
                }
                point.redraw();
            })
        }
        if (this.shapeMenu && typeof(this.shapeMenu) === "object") {
            this.shapeMenu.updateContextMenu();
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
    this.setupPoints = (points,pointOptions={}) => {
        this.points = [];
        this.isNewObject = true;
        this.addPoints(points,mergeObjects({},pointOptions));
        this.isNewObject = false;
        this.calcPosition();
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
    this.addPoint = (x,y,pointOptions= {}) => {
        let point = this.putPoint(x, y,mergeObjects({},this.options.pointOptions, pointOptions));
        if (!point) {
            return null;
        }
        if (this.options.displayMode !== SmartShapeDisplayMode.DEFAULT) {
            pointOptions.createDOMElement = true;
        }
        point = point.init(x, y, pointOptions);
        if (point.element) {
            try {
                this.root.appendChild(point.element);
            } catch (err) {}
            point.updateContextMenu();
        }
        this.redraw();
        if (this.options.hasContextMenu && !this.shapeMenu.contextMenu) {
            this.shapeMenu.updateContextMenu();
        }
        return point;
    }

    /**
     * Insert point to shape before specified point
     * @param x {number} X coordinate relative to container left corner
     * @param y {number} Y coordinate relative to container top corner
     * @param beforePoint {array|SmartPoint} Coordinates of point as [x,y] array or as a SmartPoint object,
     * before which point should be inserted
     * @param pointOptions {object} Array of point options. Described in
     * [SmartPoint.options](#SmartPoint+options). Can be empty,
     * in this case default `SmartShape.options.pointOptions` will be used,
     * or default options of SmartPoint class itself.
     * @returns {object} [SmartPoint](#SmartPoint) object of added point
     */
    this.insertPoint = (x,y,beforePoint,pointOptions= {}) => {
        let point = this.putPoint(x, y,mergeObjects({}, this.options.pointOptions, pointOptions),beforePoint);
        if (!point) {
            return null;
        }
        if (this.options.displayMode !== SmartShapeDisplayMode.DEFAULT) {
            pointOptions.createDOMElement = true;
        }
        point = point.init(x, y, pointOptions);
        try {
            this.root.appendChild(point.element);
        } catch (err) {};
        point.updateContextMenu();
        this.redraw();
        if (this.options.hasContextMenu && !this.shapeMenu.contextMenu) {
            this.shapeMenu.updateContextMenu();
        }
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
    this.addPoints = (points,pointOptions= {}) => {
        if (!points || typeof(points) !== "object") {
            return
        }
        if (this.options.simpleMode) {
            if (typeof(points[0].x) !== "undefined") {
                this.points = mergeObjects({},points);
            } else {
                this.points = points.map(point => ({x: point[0], y: point[1]}))
            }
        } else {
            for (let point of points) {
                const x = typeof(point.x) !== "undefined" ? point.x : point[0];
                const y = typeof(point.y) !== "undefined" ? point.y : point[1];
                if (this.options.displayMode !== SmartShapeDisplayMode.DEFAULT) {
                    pointOptions.createDOMElement = true;
                }
                const p = this.putPoint(x, y,
                    mergeObjects({}, this.options.pointOptions,pointOptions)
                )
                if (p) {
                    p.init(p.x, p.y, pointOptions)
                    if (p.element) {
                        try {
                            this.root.appendChild(p.element);
                            p.redraw();
                        } catch (err) {}
                    }
                }
            }
        }

        if (this.options.hasContextMenu && !this.shapeMenu.contextMenu) {
            this.shapeMenu.updateContextMenu();
        }
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
     * @param beforePoint {array|SmartPoint} Coordinates of point as [x,y] array or as a SmartPoint object,
     * before which point should be inserted
     * @returns {object} [SmartPoint](#SmartPoint) object of added point
     */
    this.putPoint = (x,y,pointOptions= {}, beforePoint=null) => {
        let beforeIndex = this.getPointIndex(beforePoint);
        if (beforePoint && beforeIndex === -1) {
            return null;
        }
        if (!this.isNewObject && this.findPoint(x,y)) {
            return null;
        }
        pointOptions.bounds = this.getBounds();
        pointOptions.zIndex = this.options.zIndex+1;
        const point = new SmartPoint();
        point.x = x;
        point.y = y;
        if (this.options.displayMode !== SmartShapeDisplayMode.DEFAULT) {
            pointOptions.createDOMElement = true;
        }
        point.setOptions(pointOptions);
        if (beforePoint && beforeIndex !== -1) {
            this.points.splice(beforeIndex ,0,point)
        } else {
            this.points.push(point);
        }
        return point;
    }

    /**
     * Method returns the closest point from specified array of points or all points of this shape
     * to specified x,y coordinates.
     * @param x {number} X coordinate
     * @param y {number} Y coordinate
     * @param points {array} Array of coordinates of points to. Each coordinate is [x,y] array. If not specified
     * then all points of this shapes used.
     * @returns {null|Object|*}
     */
    this.getClosestPoint = (x,y,points=null) => {
        if (!points) {
            points = this.getPointsArray();
        }
        if (!points || !points.length) {
            return null;
        }
        points = points.filter(([x1,y1]) => !isNaN(parseFloat(x1)) && !isNaN(parseFloat(y1)));
        if (points.length === 1) {
            return this.points[0];
        }
        if (!points || !points.length) {
            return null;
        }
        const cords = points
            .map(([x1,y1]) => ({x:x1,y:y1,d:distance(x,y,x1,y1)}))
            .reduce((s1,s2) => s1.d < s2.d ? s1 : s2);
        return this.findPoint(cords.x,cords.y);
    }

    /**
     * @ignore
     * This method returns the line which is closest to specified (x,y) point.
     * @param x X coordinate
     * @param y Y coordinate
     * @returns {object} Object with fields `point1` - Start point of line,
     * `point2` - end point of line, `d` - distance from this line to point (x,y)
     */
    this.getClosestLine = (x,y) => {
        return this.points
            .map((point1,index) => {
                let point2 = null;
                if (index < this.points.length-1) {
                    point2 = this.points[index+1];
                } else {
                    point2 = this.points[0];
                }
                return [point1,point2,distanceFromLine(x,y,point1.x,point1.y,point2.x,point2.y)]
            })
            .filter(l => l[2]>=0)
            .reduce((l1,l2) => l1[2] < l2[2] ? l1 : l2)
    }

    /**
     * Method returns and index of specified point in points array
     * @param point {array|SmartPoint} Point to find index for. Can be specified either as
     * coordinates array [x,y] or as a SmartPoint object
     * @returns {number} Index of point or -1 if not found
     */
    this.getPointIndex = (point) => {
        if (point && point.length) {
            if (point.length !== 2) {
                return -1
            }
            point = this.findPoint(...point);
        }
        if (!point || !this.isShapePoint(point)) {
            return -1;
        }
        return this.points.indexOf(point);
    }

    /**
     * Method used to delete all points from shape
     */
    this.deleteAllPoints = () => {
        if (this.options.simpleMode) {
            this.points = [];
        } else {
            while (this.points.length) {
                this.points[0].destroy();
            }
        }
    }

    /**
     * Method used to delete point with specified coordinates.
     * If point with specified coordinates not found then just
     * do nothing
     * @param x {number} X coordinate of point
     * @param y {number} Y coordinate of point
     */
    this.deletePoint = (x,y) => {
        if (this.points.length-1 < this.options.minPoints) {
            return
        }
        const point = this.findPoint(x,y);
        if (point && typeof(point.destroy) === "function") {
            point.destroy();
        } else {
            this.points.splice(this.points.indexOf(point),1);
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
        const point = this.points.find(item => item.options && item.options.id === id)
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
     * redraw the shape on new position. So, you need to call `redraw` yourself after move.
     * @param x {number} new X coordinate
     * @param y {number} new Y coordinate
     * @param redraw {boolean} should the function redraw the shape after move. True by default
     * @param fast {boolean} if true, then only change shape dimensions without recalculate points
     */
    this.moveTo = (x,y,redraw= true,respectBounds=true,fast=false) => {
        const bounds = this.getBounds();
        const pos = this.getPosition(this.options.groupChildShapes);
        let newX = x;
        let newY = y;
        if (respectBounds) {
            newX = x + pos.width > bounds.right ? bounds.right - pos.width : x;
            newY = y + pos.height > bounds.bottom ? bounds.bottom - pos.height : y;
        }
        this.moveBy(newX-pos.left,newY-pos.top, redraw, fast);
        this.calcPosition();
    }

    /**
     * Moves shape by specified number of pixels by X and Y.
     * @param stepX {number} number of pixels to move horizontally
     * @param stepY {number} number of pixes to move vertically
     * @param redraw {boolean} should the function redraw the shape after move. True by default
     * @param fast {boolean} if true, then only change shape dimensions without recalculate points
     */
    this.moveBy = (stepX, stepY,redraw=true,fast=false) => {
        for (let index in this.points) {
            this.points[index].x += stepX;
            this.points[index].y += stepY;
            if (!this.options.simpleMode && redraw && typeof (this.points[index].redraw) === "function") {
                this.points[index].redraw();
            }
        }
        this.options.offsetX += stepX;
        this.options.offsetY += stepY;
        this.left += stepX;
        this.top += stepY;
        this.right += stepX;
        this.bottom += stepY;
        const children = this.getChildren(true)
        if (redraw) {
            if (!fast) {
                this.redraw();
            } else {
                if (this.svg) {
                    this.svg.style.left = this.left + "px";
                    this.svg.style.top = this.top + "px";
                }
            }
        }
        if (children.length && this.options.groupChildShapes) {
            children.forEach(child => {
                for (let point of child.points) {
                    point.x += stepX;
                    point.y += stepY;
                    if (!this.options.simpleMode && redraw && typeof (point.redraw) === "function") {
                        point.redraw();
                    }
                }
                child.left += stepX;
                child.top += stepY;
                child.right += stepX;
                child.bottom += stepY;
                child.options.offsetX += stepX;
                child.options.offsetY += stepY;
                if (fast && child.svg) {
                    child.svg.style.left = child.left + "px";
                    child.svg.style.top = child.top + "px";
                }
            });
        }
        if (fast) {
            SmartShapeDrawHelper.redrawResizeBox(this);
            SmartShapeDrawHelper.redrawRotateBox(this);
        }
    }

    /**
     * Scales image to fit specified `width` and `height`. It only changes coordinates of points, but do not
     * redraws the shape on new position. So, you need to call `redraw` yourself after scale.
     * @param width {number|null} new width. If not specified, then will be calculated automatically based on height to
     * preserve aspect ratio
     * @param height {number|null} new height. If not specifie, then will be calculated automatically based on width
     * to preserve aspect ratio
     */
    this.scaleTo = (width=null,height= null,includeChildren=null) => {
        const bounds = this.getBounds();
        this.calcPosition();
        if (!width && !height) {
            return null;
        }
        const pos = this.getPosition(includeChildren || this.options.groupChildShapes);
        if (pos.width === width && pos.height === height) {
            return
        }
        [width,height] = this.applyScaleRestriction(...applyAspectRatio(width,height,pos.width,pos.height));
        if (pos.width>=10 && width<10) {
            width = 10;
        }
        if (pos.height>=10 && height<10) {
            height = 10;
        }
        let newWidth = abs(pos.left) + width > bounds.right && bounds.right !== -1 ? bounds.right - abs(pos.left) : width;
        let newHeight = abs(pos.top) + height > bounds.bottom && bounds.bottom !== -1 ? bounds.bottom - abs(pos.top) : height;
        let scaleX = abs(newWidth/pos.width);
        let scaleY = abs(newHeight/pos.height);
        this.scaleBy(scaleX,scaleY,includeChildren);
    }

    /**
     * Method used to scale the shape by specified ratio by X and Y
     * @param scaleX {number} Horizontal scale ratio
     * @param scaleY {number} Vertical scale ratio
     */
    this.scaleBy = (scaleX=null,scaleY= null,includeChildren=null) => {
        if (scaleX === 1 && scaleY === 1) {
            return
        }
        const pos = this.getPosition(includeChildren || this.options.groupChildShapes);
        this.points.forEach(point => {
            point.x = (point.x-pos.left)*scaleX+pos.left;
            point.y = (point.y-pos.top)*scaleY+pos.top}
        );
        this.width *= scaleX;
        this.height *= scaleY;
        this.options.scaleFactorX *= scaleX;
        this.options.scaleFactorY *= scaleY;
        if (this.options.groupChildShapes || includeChildren) {
            this.getChildren(true).forEach(child => {
                child.points.forEach(point => {
                        point.x = (point.x - pos.left) * scaleX + pos.left;
                        point.y = (point.y - pos.top) * scaleY + pos.top
                    }
                );
                child.width *= scaleX;
                child.height *= scaleY;
                child.options.scaleFactorX *= scaleX;
                child.options.scaleFactorY *= scaleY;
                child.calcPosition();
            })
            if (!this.options.simpleMode && this.options.visible) {
                this.getChildren().forEach(child => child.redraw());
            }
        }
        this.calcPosition();
    }

    /**
     * @ignore
     * Method returns width and height of shape after applying
     * `minWidth`, `minHeight`, `maxWidth` and `maxHeight` restrictions
     * to it
     * @param width {number} Original width
     * @param height {number} Original height
     * @returns {array} Returns array in a format [width,height] which is not
     * less than minWidth and minHeight and not greater than maxWidth and maxHeight
     */
    this.applyScaleRestriction = (width,height) => {
        if (this.options.minWidth !== -1 && width < this.options.minWidth) {
            width = this.options.minWidth;
        }
        if (this.options.minWidth !== -1 && height < this.options.minHeight) {
            height = this.options.minHeight;
        }
        if (this.options.minWidth !== -1 && width > this.options.maxWidth) {
            width = this.options.maxWidth;
        }
        if (this.options.minWidth !== -1 && height > this.options.maxHeight) {
            height = this.options.maxHeight;
        }
        return [width,height];
    }

    /**
     * Method used to rotate this shape by specified angle around it's center.
     * @param angle {number} Angle in degrees. Positive - clockwise, Negative - counterclock-wise
     * @param centerX {number} X coordinate of center around which to rotate the shape. By default it's a center
     * of the shape
     * @param centerY {number} Y coordinate of center around which to rotate the shape. By default it's a center
     * of the shape
     * @param checkBounds {boolean} Should the function check that shape won't go beyond defined bounds or
     * container bounds after rotation. By default false.
     */
    this.rotateBy = (angle,centerX=null,centerY=null,checkBounds=false) => {
        this.calcPosition();
        const pos = this.getPosition(this.options.groupChildShapes);
        let [shapeCenterX,shapeCenterY] = this.getCenter(this.options.groupChildShapes)
        const parent = this.getRootParent(true);
        if (parent && parent.options.groupChildShapes) {
            [shapeCenterX,shapeCenterY] = parent.getCenter(parent.options.groupChildShapes);
        }
        if (!centerX) {
            centerX = shapeCenterX;
        }
        if (!centerY) {
            centerY = shapeCenterY
        }
        if (this.initCenter) {
            [centerX,centerY] = this.initCenter;
        }
        if (checkBounds && (!this.isInBounds(...getRotatedCoords(angle,pos.left,pos.top,centerX,centerY)) ||
            !this.isInBounds(...getRotatedCoords(angle,pos.right,pos.top,centerX,centerY)) ||
            !this.isInBounds(...getRotatedCoords(angle,pos.left,pos.bottom,centerX,centerY)) ||
            !this.isInBounds(...getRotatedCoords(angle,pos.right,pos.bottom,centerX,centerY)))) {
            return
        }
        this.points.forEach(point => {
            if (typeof(point.rotateBy) === "function") {
                point.rotateBy(angle, centerX, centerY)
            } else {
                [point.x,point.y] = getRotatedCoords(angle, point.x,point.y, centerX,centerY)
            }
        });
        this.options.rotateAngle += angle;
        if (this.options.groupChildShapes) {
            this.getChildren(true).forEach(child => {
                child.points.forEach(point => {
                    if (typeof(point.rotateBy) === "function") {
                        point.rotateBy(angle, centerX, centerY)
                    } else {
                        [point.x,point.y] = getRotatedCoords(angle, point.x,point.y, centerX,centerY)
                    }
                });
                child.options.rotateAngle += angle;
                child.redraw();
            })
        }
    }

    /**
     * Method used to flip shape and its children vertically or horizontally
     * @param byX {boolean} Flip horizontally
     * @param byY {boolean} Flip vertically
     * @param includeChildren {boolean} Flip includes children shapes
     */
    this.flip = (byX,byY,includeChildren) => {
        if (!byX && !byY) {
            return
        }
        includeChildren = includeChildren || this.options.groupChildShapes;
        this.calcPosition()
        let children = includeChildren ? this.getChildren(true) : null;
        children && children.forEach(child => child.calcPosition());
        const pos = this.getPosition(includeChildren);
        this.points.forEach(point=>this.flipPoint(point,byX,byY,pos));
        if (byX) {
            this.options.flippedX = !this.options.flippedX;
        }
        if (byY) {
            this.options.flippedY = !this.options.flippedY;
        }
        if (!children) {
            return
        }
        children.forEach(child=>{
            if (byX) {
                child.options.flippedX = !child.options.flippedX;
                child.options.flippedY = !child.options.flippedY;
            }
            child.points.forEach(point => child.flipPoint(point,byX,byY,pos))
        })
    }

    /**
     * @ignore
     * Internal method to flip specified point over X or/and Y axis
     * according to specified dimensions of shape
     * @param point {SmartPoint} Point object (or any object with x and y fields)
     * @param byX {boolean} Flip horizontally
     * @param byY {boolean} Flip vertically
     * @param pos {object} Shape dimensions, object with fields: `top`,`left`,`bottom`,`right`,`width`,`height`
     * @returns {SmartPoint} point object with flipped coordinates
     */
    this.flipPoint = (point, byX, byY, pos) => {
        [point.x,point.y] = flipPoint(point.x,point.y,byX,byY,pos);
        return point
    }

    /**
     * Method used to change shape z-index to topmost
     */
    this.moveToTop = () => {
        SmartShapeDrawHelper.moveShapeToTop(this);
    }

    /**
     * Method used to change shape z-index to bottommost
     */
    this.moveToBottom = () => {
        SmartShapeDrawHelper.moveShapeToBottom(this);
    }

    /**
     * Method used to change shape z-index to specified number
     * @param zIndex {number} z-index value
     */
    this.changeZIndex = (zIndex) => {
        SmartShapeDrawHelper.changeShapeZIndex(this,zIndex)
    }

    /**
     * @ignore
     * Method used to check is specified coordinate not goes beyond bounds
     * @param x {number} X coordinate
     * @param y {number} Y coordinate
     * @returns true if it does not go beyond or false otherwise.
     */
    this.isInBounds = (x,y) => {
        const [width,height] = this.getMaxPointSize();
        const bounds = this.getBounds();
        return (x >= bounds.left + width /2) &&
            (x <= bounds.right - width/2) &&
            (y >= bounds.top + height/2) &&
            (y <= bounds.bottom - height/2)
    }

    /**
     * Method used to redraw shape polygon. Runs automatically when add/remove points or change their properties.
     */
    this.redraw = () => {
        this.applyDisplayMode();
        SmartShapeDrawHelper.draw(this);
        if (this.options.groupChildShapes && !this.options.displayAsPath) {
            this.getChildren().forEach(child=>child.redraw());
        }
    }

    /**
     * @ignore
     * Method used to setup shape drawing depending on current `options.displayMode`.
     * Depending on this it shows either ResizeBox around it, or RotateBox, or nothing.
     */
    this.applyDisplayMode = () => {
        const parent = this.getRootParent();
        if (!parent || !parent.options.groupChildShapes) {
            if (this.options.displayMode === SmartShapeDisplayMode.SCALE && this.options.canScale) {
                this.rotateBox && this.rotateBox.hide();
                !this.resizeBox && this.setupResizeBox();
                this.resizeBox && this.resizeBox.setOptions({shapeOptions: {visible: this.options.visible}})
                this.resizeBox.show();
            } else if (this.options.displayMode === SmartShapeDisplayMode.ROTATE && this.options.canRotate) {
                this.resizeBox && this.resizeBox.hide();
                !this.rotateBox && this.setupRotateBox();
                this.rotateBox && this.rotateBox.setOptions({shapeOptions: {visible: this.options.visible}})
                this.rotateBox.show();
            } else {
                this.resizeBox && this.resizeBox.hide();
                this.rotateBox && this.rotateBox.hide();
            }
        }
        this.points.filter(point=>typeof(point.setOptions) === "function").forEach(point => {
            const options = {zIndex: this.options.zIndex + 15}
            if (this.options.displayMode === SmartShapeDisplayMode.DEFAULT) {
                options.createDOMElement = false;
            } else {
                options.createDOMElement = true;
            }
            point.setOptions(options);
            if (point.element) {
                point.element.style.zIndex = point.options.zIndex;
                if (this.options.displayMode === SmartShapeDisplayMode.DEFAULT && !point.options.forceDisplay) {
                    point.element.style.display = 'none';
                }
            }
        })
        if (this.options.groupChildShapes) {
            this.getChildren(true).forEach(child => {
                child.points.filter(point=>typeof(point.setOptions) === "function").forEach(point => {
                    if (this.options.displayMode === SmartShapeDisplayMode.DEFAULT) {
                        point.setOptions({createDOMElement:false});
                    } else {
                        point.setOptions({createDOMElement:true});
                    }
                    if (point.options.visible && !point.options.hidden && point.options.canDrag) {
                        if (point.element) {
                            point.element.style.display = '';
                        }
                    }
                })
                child.options.displayMode = this.options.displayMode;
            })
        }
    }

    /**
     * Method used to switch display mode of SmartShape from Default to Resize to Rotate.
     * @param mode {SmartShapeDisplayMode} Display mode to switch to. One of values of
     * [SmartShapeDisplayMode](#SmartShapeDisplayMode). If not specified, then automatically
     * switches to next mode in the following loop sequence: DEFAULT -> SCALE -> ROTATE -> DEFAULT
     */
    this.switchDisplayMode = (mode=null) => {
        if (!mode) {
            mode = this.getNextDisplayMode();
        }
        if ((mode === SmartShapeDisplayMode.SCALE && !this.options.canScale) ||
            (mode === SmartShapeDisplayMode.ROTATE && !this.options.canRotate) ||
            (mode === SmartShapeDisplayMode.SELECTED && (this.points.length && !this.options.pointOptions.canDrag))) {
            mode = SmartShapeDisplayMode.DEFAULT;
        }
        this.options.displayMode = mode;
        if (this.options.simpleMode) {
            this.applyDisplayMode();
        } else {
            this.redraw();
        }
        if (mode === SmartShapeDisplayMode.DEFAULT && this.options.groupChildShapes) {
            setTimeout(() => {
                this.getChildren(true).forEach(child => {
                    child.switchDisplayMode(mode)
                    if (this.options.simpleMode) {
                        child.applyDisplayMode();
                    } else {
                        child.redraw();
                    }
                });
            },10)
        }
    }

    /**
     * @ignore
     * Method returns next display mode after current one
     * in the following sequence DEFAULT -> SCALE -> ROTATE
     * taking in account `canScale` and `canRotate` options
     * @returns {SmartShapeDisplayMode|string|*}
     */
    this.getNextDisplayMode = () => {
        let mode;
        if (this.options.displayMode === SmartShapeDisplayMode.DEFAULT) {
            mode = SmartShapeDisplayMode.SELECTED;
        } else if (this.options.displayMode === SmartShapeDisplayMode.SELECTED) {
            mode = SmartShapeDisplayMode.SCALE;
        } else if (this.options.displayMode === SmartShapeDisplayMode.SCALE) {
            mode = SmartShapeDisplayMode.ROTATE;
        } else {
            mode = SmartShapeDisplayMode.DEFAULT;
        }
        if (mode === SmartShapeDisplayMode.SELECTED && !this.options.pointOptions.canDrag) {
            mode = SmartShapeDisplayMode.SCALE
        }
        if (mode === SmartShapeDisplayMode.SCALE && !this.options.canScale) {
            mode = SmartShapeDisplayMode.ROTATE
        }
        if (mode === SmartShapeDisplayMode.ROTATE && !this.options.canRotate) {
            mode = SmartShapeDisplayMode.DEFAULT;
        }
        return mode
    }

    /**
     * @ignore
     * Internal method that used to calculate shape dimensions, based on point coordinates.
     * Set left,top,right,bottom,width and height of shape.
     */
    this.calcPosition = () => {
        if (!this.points.length) {
            return;
        }
        Object.assign(this,this.calcPositionFromPointsArray(this.getPointsArray()))
    }

    /**
     * @ignore
     * Service method that used to update shape dimensions based on
     * changed point coordinates (or if point removed)
     * @param x {number} X coordinate
     * @param y {number} Y coordinate
     * @param removed {boolean} Indicates that point with specified (x,y) removed
     */
    this.updatePosition = (x,y,removed) => {
        if (x<this.left) {
            if (removed) {
                this.left = this.oldLeft;
            } else {
                this.oldLeft = this.left;
                this.left = x;
            }
        }
        if (x>this.right) {
            if (removed) {
                this.right = this.oldRight
            } else {
                this.oldRight = this.right;
                this.right = x
            }
        }
        if (y<this.top) {
            if (removed) {
                this.top = this.oldTop;
            } else {
                this.oldTop = this.top;
                this.top = y;
            }
        }
        if (y>this.bottom) {
            if (removed) {
                this.bottom = this.oldBottom;
            } else {
                this.oldBottom = this.bottom;
                this.bottom = y;
            }
        }
        this.width = this.right - this.left || 1
        this.height = this.bottom - this.top || 1
    }

    /**
     * @ignore
     * Function calculates shape dimensions based on provided points array.
     * @param points {array} 2D array of points in format [ [x,y], [x,y] [x,y] ...]
     * @returns {object} Object with fields: `left`,`top`,`right`,`bottom`,`width`,`height`
     */
    this.calcPositionFromPointsArray = (points) => {
        const result = {};
        result.left = points.map(point => point[0]).reduce((minx,x) => x < minx ? x : minx);
        result.top = points.map(point => point[1]).reduce((miny,y) => y < miny ? y : miny);
        result.right = points.map(point => point[0]).reduce((maxx,x) => x > maxx ? x : maxx);
        result.bottom = points.map(point => point[1]).reduce((maxy,y) => y > maxy ? y : maxy);
        result.width = abs(result.right-result.left) || 1;
        result.height = abs(result.bottom-result.top) || 1;
        return result;
    }

    /**
     * Method used to get current position of shape
     * @param forGroup {boolean} If true, then it calculates left, top, right and bottom of this shape
     * and all its children
     * @returns {object} Position with fields:
     * `top`,`left`,`right`,`bottom`,`width`,`height`
     */
    this.getPosition = (forGroup=false) => {
        if (forGroup) {
            return this.groupHelper.getPosition();
        }
        return {
            top: this.top,
            left: this.left,
            bottom: this.bottom,
            right: this.right,
            width: parseFloat(this.width),
            height: parseFloat(this.height)
        }
    }

    /**
     * Method returns the bounds of this shape, e.g. inside which square it's allowed to drag it.
     * By default, if [options.bounds](#SmartShape+options) not specified, the bounds of shape are equal to
     * the bounds of shape's container element (clientLeft, clientTop, clientLeft+clientWidth, clientTop+clientHeight)
     * @returns {object} Object with `left`, `top`, `right` and `bottom` fields.
     */
    this.getBounds = () => {
        return {
            left: this.options.bounds.left !== -1 ? this.options.bounds.left : this.root.style.display === 'none' ? -1 : this.root.clientLeft,
            top: this.options.bounds.top !== -1 ? this.options.bounds.top : this.root.style.display === 'none' ? -1 : this.root.clientTop,
            right: this.options.bounds.right !== -1 ? this.options.bounds.right : this.root.style.display === 'none' ? -1 : this.root.clientLeft + this.root.clientWidth,
            bottom: this.options.bounds.bottom !== -1 ? this.options.bounds.bottom : this.root.style.display === 'none' ? -1 : this.root.clientTop + this.root.clientHeight
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
     * Method returns true if point with specified coordinates lays
     * inside shape or false otherwise.
     * @param x {number} X coodrinate
     * @param y {number} Y coordinate
     * @returns {boolean} True if (x,y) belongs to shape and false otherwise
     */
    this.belongsToShape = (x,y,applyOffset=true) => {
        if (!this.isInShapePolygon(x,y)) {
            return false;
        }
        const off = getOffset(this.root)
        if (this.findPoint(x-off.left,y-off.top)) {
            return true;
        }
        let points = this.getPointsArray();
        if (applyOffset) {
            points = points.map(point => ([point[0]+off.left,point[1]+off.top]));
        }
        return isPointInsidePolygon(points,[x,y]);
    }

    this.isInShapePolygon = (x,y) => {
        const off = getOffset(this.root)
        return x>=this.left+off.left && x<=this.right+off.left && y>=this.top+off.top && y <= this.bottom+off.top;
    }

    /**
     * Uniform method that used to add event handler of specified type to this object.
     * SmartShape can emit events, defined in [ShapeEvents](#ShapeEvents) enumeration. So, you can
     * listen any of these events.
     * @param eventName {string} - Name of event. Use one of names, defined for [ShapeEvents](#ShapeEvents).
     * @param handler {function} - Function that used as an event handler
     * @returns {function} - Pointer to added event handler. Should be used to remove event listener later.
     */
    this.addEventListener = (eventName,handler) => {
        return this.eventListener.addEventListener(eventName,handler)
    }

    /**
     * Uniform method that used to remove event handler, that previously added
     * to this object.
     * @param eventName {string} Name of event to remove listener from
     * @param listener {function} Pointer to event listener, that added previously.
     * It was returned from [addEventListener](#ResizeBox+addEventListener) method.
     */
    this.removeEventListener = (eventName,listener) => {
        this.eventListener.removeEventListener(eventName,listener);
    }

    /**
     * Method used to show shape if it has hidden
     */
    this.show = () => {
        this.setOptions({visible:true});
        this.getChildren().forEach(child => {
            child.options.visible = true;
        });
        this.redraw();
    }

    /**
     * Method used to hide the shape
     */
    this.hide = () => {
        this.setOptions({visible:false});
        this.getChildren().forEach(child => {
            child.options.visible = false;
        });
        this.redraw();
    }

    /**
     * Destroys the shape. Destroys all points, removes event listeners and removes the shape from screen.
     * But variable continue existing. To completely remove the shape,
     * set the variable to 'null' after calling this method.
     */
    this.destroy = () => {
        EventsManager.emit(ShapeEvents.SHAPE_DESTROY,this,{});
        if (this.eventListener) {
            this.eventListener.destroy();
        }
        if (this.resizeBox) {
            this.resizeBox.destroy();
        }
        if (this.rotateBox) {
            this.rotateBox.destroy();
        }
        if (this.root) {
            try {
                if (this.svg) {
                    this.root.removeChild(this.svg);
                }
                this.points.filter(point => point.element).forEach(point => this.root.removeChild(point.element))
            } catch (err) {}
        }
        if (this.options.groupChildShapes) {
            this.getChildren(true).forEach(child => {
                child.destroy()
            });
        }
        if (this.shapeMenu && this.shapeMenu.contextMenu) {
            this.shapeMenu.destroyContextMenu();
        }
        const parent = this.getParent();
        if (parent) {
            parent.removeChild(this);
        }
        this.points.filter(point=>typeof(point.destroy) === "function").forEach(point => point.destroy());
        this.points = [];
    }

    /**
     * @ignore
     * Used to setup [ResizeBox](#ResizeBox) around shape if shape scaling is enabled
     */
    this.setupResizeBox = () => {
        if (!this.points.length) {
            return null;
        }
        const bounds = this.getResizeBoxBounds();
        this.resizeBox = new ResizeBox().init(this.root,bounds.left,bounds.top,bounds.width,bounds.height,{
            zIndex: this.options.zIndex+1,
            id: this.options.id+"_resizebox",
            shapeOptions:{
                canDragShape: false,
                visible: this.options.visible,
                managed: false,
                hasContextMenu:false
            }
        })
       // this.calcPosition();
        this.eventListener.addResizeEventListener();
        this.resizeBox.redraw();
        return this.resizeBox;
    }

    /**
     * @ignore
     * Used to setup [Rotate](#RotateBox) around shape if shape rotation is enabled
     */
    this.setupRotateBox = () => {
        if (!this.points.length) {
            return null;
        }
        const bounds = this.getResizeBoxBounds();
        this.rotateBox = new RotateBox().init(this.root,bounds.left,bounds.top,bounds.width,bounds.height,{
            zIndex: this.options.zIndex+1,
            id: this.options.id+"_rotatebox",
            shapeOptions:{
                canDragShape: false,
                visible: this.options.visible,
                managed: false,
                hasContextMenu: false
            }
        })
       // this.calcPosition();
        this.eventListener.addRotateEventListener();
        this.rotateBox.redraw();
        return this.rotateBox;
    }

    /**
     * @ignore
     * Returns dimensions of resize box around shape according to shape dimensions
     * @returns {{top: number, left: number, bottom: *, width: *, right: *, height: *}}
     */
    this.getResizeBoxBounds = () => {
        let pos = this.getPosition(this.options.groupChildShapes);
        const parent = this.getRootParent(true);
        if (parent && parent.options.groupChildShapes) {
            if (parent.options.displayAsPath) {
                pos = parent.getPosition(parent.options.groupChildShapes);
            } else {
                pos = this.getPosition(this.options.groupChildShapes);
            }
        }
        const [pointWidth,pointHeight] = this.getMaxPointSize();
        const result = {
            left: pos.left - pointWidth,
            right: pos.right + pointWidth,
            top: pos.top - pointHeight,
            bottom: pos.bottom + pointHeight,
            width: pos.width + (pointWidth)*2,
            height: pos.height + (pointHeight)*2,
        }
        return result;
    }

    /**
     * @ignore
     * Method finds and return the size of the biggest point in this shape
     * @returns {array} [width,height]
     */
    this.getMaxPointSize = () => {
        if (!this.points.length) {
            return [0,0];
        }
        const pointWidth = this.points.map(point=>point.options ? point.options.width : 0).reduce((w1,w2) => Math.max(w1,w2));
        const pointHeight = this.points.map(point=>point.options? point.options.height : 0).reduce((h1,h2) => Math.max(h1,h2));
        return [pointWidth,pointHeight];
    }

    /**
     * Method returns coordinates of the center of the shape.
     * @param forGroup {boolean} Should get center of all shapes in the group. Default: false
     * @returns {array} Center of a shape as an array [x,y]
     */
    this.getCenter = (forGroup=false) => {
        const pos = this.getPosition(forGroup)
        return [pos.left+pos.width/2, pos.top+pos.height/2]
    };

    /**
     * @ignore
     * Internal method that used to return SVG element to which this shape belongs
     * If this is a root shape, then just returns svg of current shape object,
     * if it's a child, then SVG element of the parent
     * @param shape {SmartShape} Shape to return SVG element for
     * @returns {HTMLOrSVGElement|null|*}
     */
    this.getShapeSvg = () => {
        return SmartShapeDrawHelper.getShapeSvg(this);
    }

    /**
     * Method exports shape and all its children to SVG document.
     * @param includeChildren {boolean} Should include children of this shape to output.
     * 'null' by default. In this case value of shape.options.groupChildShapes will be used*
     * @returns {string} Body of SVG document as a string
     */
    this.toSvg = (includeChildren=null) => {
        return SmartShapeDrawHelper.toSvg(this,includeChildren);
    }

    /**
     * Method exports shape and all its children as a PNG image
     * @param {PngExportTypes} type Format of returned result - `dataurl` or `blob`. By default `dataurl`
     * @param {number|null} width Width of image. If not specified, then calculate based on height or current
     * width of shape
     * @param {number|null} height Height of image. If not specified, then calculate based on width or current
     * height of shape
     * @param includeChildren {boolean} Should include children of this shape to output.
     * 'null' by default. In this case value of shape.options.groupChildShapes will be used*
     * @return {Promise} Promise that resolves either to DataURL string or to BLOB object, depending on value of
     * `type` argument
     */
    this.toPng = (type= PngExportTypes.DATAURL,width=null,height=null,includeChildren=null) => {
        return SmartShapeDrawHelper.toPng(this,type,width,height,includeChildren);
    }

    /**
     * Method used to save shape to JSON string.
     * Returns string with JSON object or JSON array, depending on should it save children too
     * @param includeChildren {boolean} If true, then it appends JSONs
     * of all children to `children` property of resulting JSON.
     * @param compact {boolean} If this is true, then it will save only coordinates of
     * points, but not their properties
     * @returns {string} Serialized JSON as string.
     */
    this.toJSON = (includeChildren=true,compact=false) => {
        return JSON.stringify(this.getJSON(includeChildren,compact))
    }

    /**
     * Method creates complete copy of current shape
     * @param options {object} Array of shape options to override on cloned object.
     * @param includeChildren {boolean} If true, then clones all children of this shape as well
     * Any [SmartShape options](#SmartShape+options) can be in this object.
     * @returns {SmartShape|null} Created shape object or null in case of errors
     */
    this.clone = (options={},includeChildren=true) => {
        const json = mergeObjects({},this.getJSON(includeChildren));
        json.parent_guid = this.guid;
        json.options = mergeObjects(json.options,options);
        const result = new SmartShape().fromJSON(this.root,json,includeChildren);
        if (!result) {
            return null
        }
        result.getChildren(true).forEach(child => {
            child.options.id += "_" + SmartShapeManager.length();
            child.options.name += " " + SmartShapeManager.length();
        });
        return result;
    }

    /**
     * @ignore
     * Method used to save shape to Javascript object
     * Returns JSON object or JSON array, depending on should it save children too
     * @param includeChildren {boolean} If true, then it appends JSONs
     * of all children to `children` property of resulting JSON
     * @param compact {boolean} If this is true, then it will save only coordinates of
     * points, but not their properties
     * @returns {object} Javascript object with shape and it's children, if `includeChildren` is true.
     */
    this.getJSON = (includeChildren = true, compact = false) => {
        const result = {
            options: mergeObjects({},this.options)
        }
        result.options.displayMode = SmartShapeDisplayMode.DEFAULT;
        if (compact || this.options.compactExport) {
            result.points = this.points.map(point => [point.x,point.y]);
        } else {
            result.points = this.points.filter(point => typeof(point.getJSON) === "function").map(point => point.getJSON());
        }
        if (includeChildren) {
            let children = this.getChildren();
            if (children.length) {
                result.children = children.map(
                    child => child.getJSON(includeChildren,compact || this.options.compactExport)
                );
            }
        }
        return result;
    }

    /**
     * Method used to load shape data from specified JSON string, that previously serialized by `toJSON` method
     * @param root {HTMLElement} HTML container to insert loaded shape
     * @param json {string|object} JSON-Serialized shape data as an object or as a string
     * @param includeChildren {boolean} Should load children of this shape if existed. True by default.
     * @returns {SmartShape|null} Loaded SmartShape object or null in case of JSON reading errors
     */
    this.fromJSON = (root,json,includeChildren = true,emitCreateEvent = true) => {
        let jsonObj = typeof(json) === "string" ? readJSON(json) : json;
        if (!jsonObj) {
            return null;
        }
        this.root = root;
        if (SmartShapeManager.findShapeById(jsonObj.options.id)) {
            jsonObj.options.id += "_"+SmartShapeManager.length();
            jsonObj.options.name += " "+SmartShapeManager.length();
        }
        if (!this.svg) {
            jsonObj.options.forceCreateEvent = false;
            this.init(root,jsonObj.options,null,false);
        } else {
            this.setOptions(jsonObj.options);
        }
        jsonObj.points.forEach(point => {
            let p
            if (point.length) {
                p = this.putPoint(point[0],point[1]);
                p.setOptions(jsonObj.options.pointOptions || {})
            } else {
                p = this.putPoint(point.x, point.y, point.options || jsonObj.options.pointOptions);
            }
            p && p.updateContextMenu();
        })
        const parent = SmartShapeManager.getShapeByGuid(jsonObj.parent_guid);
        SmartShapeManager.addShape(this);
        if (includeChildren && typeof(jsonObj.children) !== "undefined" && jsonObj.children) {
            this.getChildren(true).forEach(child=>child.destroy());
            jsonObj.children.forEach(child => {
                child.parent_guid = this.guid;
                this.addChild(new SmartShape().fromJSON(root,child));
            })
        }
        if (emitCreateEvent) {
            EventsManager.emit(ShapeEvents.SHAPE_CREATE, this, {parent});
        }
        return this;
    }

    /**
     * GroupHelper methods
     */

    /**
     * Method used to add specified shape as a child of current shape
     * @param child {SmartShape} Shape to add
     * @param emitEvent {boolean} Should this method emit ADD_CHILD event. True by default
     */
    this.addChild = (child,emitEvent) => this.groupHelper.addChild(child,emitEvent);

    /**
     * Method used to add specified children to current shape
     * @param children {array} Array of [SmartShape][#SmartShape) objects
     */
    this.addChildren = (children=[]) => this.groupHelper.addChildren(children);

    /**
     * Method used to remove specified shape from children list of current shape
     * @param child {SmartShape} SmartShape object to add
     */
    this.removeChild = (child) => this.groupHelper.removeChild(child);

    /**
     * Method removes all children of current shape
     * @param all {boolean} If true, then it removes all children hierarchically
     */
    this.removeAllChildren = (all=false) => this.groupHelper.removeAllChildren(all);

    /**
     * Method returns array of children of current shape
     * @param all {boolean} If true, then it returns deep list, including all children of each children of this shape
     * @returns {array} Array of [SmartShape](#SmartShape) objects
     */
    this.getChildren = (all=false) => this.groupHelper.getChildren(all);

    /**
     * Method returns if specified shape is child of current shape
     * @param child {SmartShape} Shape to check
     * @param all {boolean} Should check include subchildren
     */
    this.hasChild = (child,all=false) => this.groupHelper.hasChild(child,all);

    /**
     * Method returns parent of current shape or null
     * @returns {SmartShape|null}
     */
    this.getParent = () => this.groupHelper.getParent();

    /**
     * Method returns top parent of current shape
     * @returns {SmartShape|null} Parent shape or null
     */
    this.getRootParent = (groupChildShapes= null) => this.groupHelper.getRootParent(groupChildShapes);

    /**
     * Method returns a list of parents of current shape ordered from nearest to root
     * @param plist {array} Temporary list of parents from previous recursive call
     * @returns {array} Array of [SmartShape](#SmartShape) objects
     */
    this.getParentsList = (plist=[]) => this.groupHelper.getParentsList(plist);

    /**
     * Method used to transform coordinates of point on current shape
     * to coordinate of points of original shape, before all transformations done
     * on it (move,scale or flip)
     * @param x X coordinate
     * @param y Y coordinate
     * @returns {array} Array of new coordinates [x,y]
     */
    this.mapCurrentPointToOriginal = (x,y) =>
        mapPointCords(x, y, PointMapTypes.CURRENT_TO_ORIGINAL, {
            ...this.options,
            ...this.getPosition(this.options.groupChildShapes),
        }
    );

    /**
     * Method used to transform coordinates of point of orignal shape
     * to coordinate of points of current shape, after all transformations done
     * on it (move,scale or flip)
     * @param x X coordinate
     * @param y Y coordinate
     * @returns {array} Array of new coordinates [x,y]
     */
    this.mapOriginalPointToCurrent = (x,y) =>
        mapPointCords(x, y, PointMapTypes.ORIGINAL_TO_CURRENT, {
            ...this.options,
            ...this.getPosition(this.options.groupChildShapes),
        }
    );
}

/**
 * Enumeration of SmartShape display modes
 * @param default basic display mode without resize or rotate boxes and points are hidden
 * @param selected In this mode the points displayed on shape, but resize and rotate boxes are hidden
 * @param scale In this mode the shape displayed with resize box around it
 * @param rotate In this mode the shape displayed with rotate box around it
 * @enum {string}
 */
export const SmartShapeDisplayMode = {
    DEFAULT: "default",
    SELECTED: "selected",
    SCALE: "scale",
    ROTATE: "rotate"
}

export default SmartShape;
