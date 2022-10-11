import SmartShapeManager from "../SmartShapeManager/SmartShapeManager.js";
import SmartPoint from "../SmartPoint/SmartPoint.js";
import SmartShapeDrawHelper, {PngExportTypes} from "./SmartShapeDrawHelper.js";
import SmartShapeGroupHelper from "./SmartShapeGroupHelper.js";
import SmartShapeEventListener, {ShapeEvents} from "./SmartShapeEventListener.js";
import ResizeBox from "../ResizeBox/ResizeBox.js";
import RotateBox from "../RotateBox/RotateBox.js";
import {getRotatedCoords, mergeObjects, notNull, uuid, isPointInsidePolygon, getOffset, readJSON} from "../utils";
import EventsManager from "../events/EventsManager.js";
import {applyAspectRatio} from "../utils/geometry.js";
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
     * Helper object that used to manage children shapes of this shape
     * @type {SmartShapeGroupHelper}
     */
    this.groupHelper = null;

    this.eventListener = new SmartShapeEventListener(this);

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
     * `href` - URL to image, `width` - width of image, `height` - height of image
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
     * @param groupChildShapes {boolean} Should child shapes be groupped and move/resize/rotate/destroy with it.
     * True by default
     * @type {object}
     */
    this.options = {
        id: "",
        name: "Unnamed shape",
        maxPoints: -1,
        stroke: "",
        strokeWidth: "",
        strokeLinecap: "",
        strokeDasharray: "",
        fill: "",
        fillGradient: null,
        fillImage: null,
        fillOpacity: "1",
        filters:{},
        canDragShape: true,
        canAddPoints: false,
        canScale: false,
        canRotate: false,
        offsetX: 0,
        offsetY: 0,
        classes: "",
        style: {
            "stroke-width":2,
            "stroke":"black",
            fill:"none"
        },
        pointOptions:{},
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
        groupChildShapes: true
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
        if (SmartShapeManager.getShape(this)) {
            console.error("This shape already initialized");
            return
        }
        this.root = root;
        this.root.style.position = "relative";
        Object.assign(this, new SmartShapeContextMenu(this));
        this.setOptions(options);
        this.groupHelper = new SmartShapeGroupHelper(this).init();
        if (points && points.length) {
            this.setupPoints(points, Object.assign({}, this.options.pointOptions));
        }
        this.eventListener.run();
        this.applyDisplayMode();
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
        options.pointOptions = mergeObjects(this.options.pointOptions,options.pointOptions);
        options.style = mergeObjects(this.options.style,options.style);
        options.bounds = mergeObjects(this.options.bounds,options.bounds);
        if (notNull(options.visible) && options.visible !== this.options.visible) {
            this.points.forEach(point => point.options.visible = options.visible);
            this.resizeBox && this.resizeBox.setOptions({shapeOptions:{visible:options.visible}});
            this.rotateBox && this.rotateBox.setOptions({shapeOptions:{visible:options.visible}});
        }
        this.options = mergeObjects(this.options,options);
        this.points.forEach(point=>{
            point.setOptions(mergeObjects({},this.options.pointOptions))
            point.options.bounds = this.getBounds();
            if (point.options.zIndex <= this.options.zIndex) {
                point.options.zIndex = this.options.zIndex+1;
            }
            point.redraw();
        })
        if (typeof(this.updateContextMenu) === "function") {
            this.updateContextMenu();
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
        this.points = [];
        this.addPoints(points,Object.assign({},pointOptions));
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
        if (this.options.hasContextMenu && !this.contextMenu) {
            this.updateContextMenu();
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
    this.addPoints = (points,pointOptions=null) => {
        if (!points || typeof(points) !== "object") {
            return
        }
        points.forEach(point =>
            this.putPoint(point[0]+this.options.offsetX,point[1]+this.options.offsetY,Object.assign({},pointOptions))
        );
        this.redraw();
        if (this.options.hasContextMenu && !this.contextMenu) {
            this.updateContextMenu();
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
     * @returns {object} [SmartPoint](#SmartPoint) object of added point
     */
    this.putPoint = (x,y,pointOptions=null) => {
        if (this.findPoint(x,y)) {
            return null;
        }
        if (!pointOptions || !Object.keys(pointOptions).length) {
            pointOptions = Object.assign({},this.options.pointOptions) || {};
        } else {
            pointOptions = mergeObjects(Object.assign({},this.options.pointOptions),pointOptions);
        }
        pointOptions.bounds = this.getBounds();
        pointOptions.zIndex = this.options.zIndex+1;
        const point = new SmartPoint();
        this.points.push(point);
        point.init(x, y, pointOptions)
        this.root.appendChild(point.element);
        return point;
    }

    /**
     * Method used to delete all points from shape
     */
    this.deleteAllPoints = () => {
        while (this.points.length) {
            this.points[0].destroy();
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
     * redraw the shape on new position. So, you need to call `redraw` yourself after move.
     * @param x {number} new X coordinate
     * @param y {number} new Y coordinate
     * @param redraw {boolean} should the function redraw the shape after move. True by default
     */
    this.moveTo = (x,y,redraw= true) => {
        const bounds = this.getBounds();
        const pos = this.getPosition(true);
        let newX = x+pos.width > bounds.right ? bounds.right - pos.width : x;
        let newY = y+pos.height > bounds.bottom ? bounds.bottom - pos.height: y;
        this.moveBy(newX-pos.left,newY-pos.top, redraw);
        this.calcPosition();
    }

    /**
     * Moves shape by specified number of pixels by X and Y.
     * @param stepX {number} number of pixels to move horizontally
     * @param stepY {number} number of pixes to move vertically
     * @param redraw {boolean} should the function redraw the shape after move. True by default
     */
    this.moveBy = (stepX, stepY,redraw= true) => {
        for (let index in this.points) {
            this.points[index].x += stepX;
            this.points[index].y += stepY;
            if (redraw) {
                this.points[index].redraw();
            }
        }
        this.calcPosition();
        const children = this.getChildren()
        if (redraw) {
            this.redraw();
        }
        if (children.length && this.options.groupChildShapes) {
            children.forEach(child => {
                child.moveBy(stepX, stepY, redraw);
            });
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
    this.scaleTo = (width=null,height= null) => {
        const bounds = this.getBounds();
        this.calcPosition();
        if (!width && !height) {
            return null;
        }
        const pos = this.getPosition(this.options.groupChildShapes);
        [width,height] = this.applyScaleRestriction(...applyAspectRatio(width,height,pos.width,pos.height));
        if (pos.width>=10 && width<10) {
            width = 10;
        }
        if (pos.height>=10 && height<10) {
            height = 10;
        }
        let newWidth = pos.left + width > bounds.right && bounds.right !== -1 ? bounds.right - pos.left : width;
        let newHeight = pos.top + height > bounds.bottom && bounds.bottom !== -1 ? bounds.bottom - pos.top : height;
        let scaleX = newWidth/pos.width;
        let scaleY = newHeight/pos.height;
        this.points.forEach(point => {
            point.x = (point.x-pos.left)*scaleX+pos.left;
            point.y = (point.y-pos.top)*scaleY+pos.top}
        );
        if (this.options.groupChildShapes) {
            this.getChildren(true).forEach(child => {
                child.points.forEach(point => {
                        point.x = (point.x - pos.left) * scaleX + pos.left;
                        point.y = (point.y - pos.top) * scaleY + pos.top
                    }
                );
                child.calcPosition();
            })
            this.getChildren(true).forEach(child => child.redraw());
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
        const pos = this.getPosition(true);
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
        this.points.forEach(point => point.rotateBy(angle,centerX,centerY));
        if (this.options.groupChildShapes) {
            this.getChildren(true).forEach(child => {
                child.points.forEach(point => point.rotateBy(angle, centerX, centerY));
                child.redraw();
            })
        }
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
    }

    /**
     * @ignore
     * Method used to setup shape drawing depending on current `options.displayMode`.
     * Depending on this it shows either ResizeBox around it, or RotateBox, or nothing.
     */
    this.applyDisplayMode = () => {
        if (this.options.displayMode === SmartShapeDisplayMode.SCALE && this.options.canScale) {
            this.rotateBox && this.rotateBox.hide();
            !this.resizeBox && this.setupResizeBox();
            this.resizeBox && this.resizeBox.setOptions({shapeOptions:{visible:this.options.visible}})
        } else if (this.options.displayMode === SmartShapeDisplayMode.ROTATE && this.options.canRotate) {
            this.resizeBox && this.resizeBox.hide();
            !this.rotateBox && this.setupRotateBox();
            this.rotateBox && this.rotateBox.setOptions({shapeOptions:{visible:this.options.visible}})
        } else {
            this.resizeBox && this.resizeBox.hide();
            this.rotateBox && this.rotateBox.hide();
        }
        this.points.forEach(point => {
            point.setOptions({zIndex: this.options.zIndex + 1});
            point.element.style.zIndex = point.options.zIndex;
            if (this.options.displayMode === SmartShapeDisplayMode.DEFAULT && !point.options.forceDisplay) {
                point.element.style.display = 'none';
            }
        })
        if (this.options.displayMode !== "DEFAULT" && this.options.groupChildShapes) {
            this.getChildren(true).forEach(child => {
                child.points.forEach(point => {
                    point.element.style.display = '';
                })
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
            (mode === SmartShapeDisplayMode.SELECTED && (this.points.length && !this.points.filter(point=>point.options.canDrag).length))) {
            mode = SmartShapeDisplayMode.DEFAULT;
        }
        this.options.displayMode = mode;
        this.redraw();
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
        if (mode === SmartShapeDisplayMode.SELECTED && !this.points.filter(point=>point.options.canDrag).length) {
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
        this.left = this.points.map(point => point.x).reduce((minx,x) => x < minx ? x : minx);
        this.top = this.points.map(point => point.y).reduce((miny,y) => y < miny ? y : miny);
        this.right = this.points.map(point => point.x).reduce((maxx,x) => x > maxx ? x : maxx);
        this.bottom = this.points.map(point => point.y).reduce((maxy,y) => y > maxy ? y : maxy);
        this.width = parseInt(this.right-this.left) || 1;
        this.height = parseInt(this.bottom-this.top) || 1;
    }

    /**
     * Method used to get current position of shape
     * @returns {object} Position with fields:
     * `top`,`left`,`right`,`bottom`,`width`,`height`
     */
    this.getPosition = () => (
        {top:this.top, left: this.left, bottom: this.bottom, right: this.right, width: parseInt(this.width), height:parseInt(this.height)}
    )

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
        if (this.findPoint(x,y)) {
            return true;
        }
        let points = this.getPointsArray();
        if (applyOffset) {
            points = points.map(point => ([point[0]+getOffset(this.root).left,point[1]+getOffset(this.root).top]));
        }
        return isPointInsidePolygon(points,[x,y]);
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
        this.redraw();
    }

    /**
     * Method used to hide the shape
     */
    this.hide = () => {
        this.setOptions({visible:false});
        this.redraw();
    }

    /**
     * Destroys the shape. Destroys all points, removes event listeners and removes the shape from screen.
     * But variable continue existing. To completely remove the shape,
     * set the variable to 'null' after calling this method.
     */
    this.destroy = () => {
        while (this.points.length>0) {
            this.points[0].destroy();
        }
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
        if (this.root && this.svg) {
            try {
                this.root.removeChild(this.svg);
            } catch (err) {}
        }
        if (this.options.groupChildShapes) {
            this.getChildren(true).forEach(child => {
                child.destroy()
            });
        }
        if (this.contextMenu) {
            this.destroyContextMenu();
        }
        const parent = this.getParent();
        if (parent) {
            parent.removeChild(this);
        }
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
        this.calcPosition();
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
        this.calcPosition();
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
        this.calcPosition();
        let pos = this.getPosition(this.options.groupChildShapes);
        const parent = this.getRootParent(true);
        if (parent && parent.options.groupChildShapes) {
            parent.calcPosition();
            pos = parent.getPosition(parent.options.groupChildShapes);
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
        if (result.left < 0) {
            this.moveTo(result.left*-1,pos.top,false);
            result.left = 0;
        }
        if (result.top < 0) {
            this.moveTo(pos.left,result.top*-1,false);
            result.top = 0;
        }
        const bounds = this.getBounds();
        if (result.bottom > bounds.bottom) {
            this.moveTo(pos.left,result.bottom-bounds.bottom+pos.top,false);
            result.bottom = bounds.bottom;
        }
        if (result.right > bounds.right) {
            this.moveTo(result.right-bounds.right+pos.left,pos.top,false);
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
        if (!this.points.length) {
            return [0,0];
        }
        const pointWidth = this.points.map(point=>point.options.width).reduce((w1,w2) => Math.max(w1,w2));
        const pointHeight = this.points.map(point=>point.options.height).reduce((h1,h2) => Math.max(h1,h2));
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
     * Method exports shape and all its children to SVG document.
     * @returns {string} Body of SVG document as a string
     */
    this.toSvg = () => {
        return SmartShapeDrawHelper.toSvg(this);
    }

    /**
     * Method exports shape and all its children as a PNG image
     * @param {PngExportTypes} type Format of returned result - `dataurl` or `blob`. By default `dataurl`
     * @param {number|null} width Width of image. If not specified, then calculate based on height or current
     * width of shape
     * @param {number|null} height Height of image. If not specified, then calculate based on width or current
     * height of shape
     * @return {Promise} Promise that resolves either to DataURL string or to BLOB object, depending on value of
     * `type` argument
     */
    this.toPng = (type= PngExportTypes.DATAURL,width=null,height=null) => {
        return SmartShapeDrawHelper.toPng(this,type,width,height);
    }

    /**
     * Method used to save shape to JSON string.
     * Returns string with JSON object or JSON array, depending on should it save children too
     * @param includeChildren {boolean} If true, then it appends JSONs
     * of all children to `children` property of resulting JSON.
     * @returns {string} Serialized JSON as string.
     */
    this.toJSON = (includeChildren=true) => {
        return JSON.stringify(this.getJSON(includeChildren))
    }

    /**
     * Method creates complete copy of current shape
     * @returns {SmartShape|null} Created shape object or null in case of errors
     */
    this.clone = () => {
        const json = Object.assign({},this.getJSON());
        json.options.id += "_clone";
        json.options.name += " Clone";
        json.parent_guid = this.guid;
        const result = new SmartShape().fromJSON(this.root,JSON.stringify(json));
        if (!result) {
            return null
        }
        result.getChildren(true).forEach(child => {
            child.options.id += "_clone";
            child.options.name += " Clone";
        });
        return result;
    }

    /**
     * @ignore
     * Method used to save shape to Javascript object
     * Returns JSON object or JSON array, depending on should it save children too
     * @param includeChildren {boolean} If true, then it appends JSONs
     * of all children to `children` property of resulting JSON
     * @returns {object} Javascript object with shape and it's children, if `includeChildren` is true.
     */
    this.getJSON = (includeChildren = true) => {
        const result = {
            options: Object.assign({},this.options)
        }
        result.options.displayMode = SmartShapeDisplayMode.DEFAULT;
        result.points = this.points.map(point => point.getJSON());
        if (includeChildren) {
            let children = this.getChildren();
            if (children.length) {
                result.children = children.map(child => child.getJSON(includeChildren));
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
    this.fromJSON = (root,json,includeChildren = true) => {
        let jsonObj = json;
        if (typeof(jsonObj) === "string") {
            jsonObj = readJSON(json);
        }
        if (!jsonObj) {
            return null;
        }
        this.root = root;

        this.setOptions(jsonObj.options);
        if (!this.svg) {
            this.init(root,this.options,null);
        }
        jsonObj.points.forEach(point => {
            this.addPoint(point.x,point.y,point.options)
        })
        if (includeChildren && typeof(jsonObj.children) !== "undefined" && jsonObj.children) {
            this.getChildren(true).forEach(child=>child.destroy());
            jsonObj.children.forEach(child => {
                this.addChild(new SmartShape().fromJSON(root,child));
            })
        }
        const parent = SmartShapeManager.getShapeByGuid(jsonObj.parent_guid);
        EventsManager.emit(ShapeEvents.SHAPE_CREATE, this, {parent});
        return this;
    }
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
