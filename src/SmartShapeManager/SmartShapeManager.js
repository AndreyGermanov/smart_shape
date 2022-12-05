import EventsManager from "../events/EventsManager.js";
import {ShapeEvents} from "../SmartShape/SmartShapeEventListener.js";
import {notNull, readJSON} from "../utils/index.js";
import SmartShape,{SmartShapeDisplayMode} from "../SmartShape/SmartShape.js";
import {PointEvents} from "../SmartPoint/SmartPoint.js";
import SmartShapeDrawHelper from "../SmartShape/SmartShapeDrawHelper.js";
import {createEvent, getMouseCursorPos} from "../events/functions.js";
import {fromGeoJSON} from "./GeoJSONImport.js";
import {ResizeBoxEvents} from "../ResizeBox/ResizeBoxEventListener.js";

/**
 * Object that keeps collection of shapes and keep track of
 * their activity. This object is instantiated automatically by
 * when first shape created. Then it listens lifecycle events of shapes
 * to keep their collection, correctly switch activity status and
 * handle other global events related to shapes and their containers
 * @constructor
 */
function SmartShapeManager() {

    /**
     * Collection of [SmartShape's](#SmartShape) objects.
     * Each object indexed by GUID
     * @type {object}
     */
    this.shapes = {};

    /** Collection of [SmartShape's](#smartShape) objects
     * that are visible now. Each object indexed by GUID
     * @type {object}
     */
    this.visibleShapes = {};

    /**
     * Which shape is currently selected
     * @type {SmartShape}
     */
    this.activeShape = null;

    /**
     * Which shape user is currently dragging
     * @type {SmartShape}
     */
    this.draggedShape = null;

    /**
     * The shape under mouse cursor
     * @type {SmartShape}
     */
    this.shapeOnCursor = null;

    /**
     * List of event listeners, attached to containers of shapes in format
     * {container: DOM-link to container, name: name of event, listener: handler function}
     * @type {array}
     */
    this.containerEventListeners = [];

    /**
     * @ignore
     * Initializes the object.
     * @returns {SmartShapeManager}
     */
    this.init = () => {
        this.setEventListeners();
        return this;
    }

    /**
     * @ignore
     * Add listeners to key shapes events, that required to intercept
     * to correctly maintain the list of shapes and their activities
     */
    this.setEventListeners = () => {
        EventsManager.subscribe(ShapeEvents.SHAPE_CREATE,this.onShapeCreated);
        EventsManager.subscribe(ShapeEvents.SHAPE_DESTROY,this.onShapeDestroy);
        EventsManager.subscribe(ShapeEvents.SHAPE_SHOW, this.onShapeShow);
        EventsManager.subscribe(ShapeEvents.SHAPE_HIDE, this.onShapeHide);
        EventsManager.subscribe(ShapeEvents.SHAPE_MOVE_START, this.onShapeMoveStart);
        EventsManager.subscribe(ShapeEvents.SHAPE_MOUSE_ENTER, this.onShapeMouseEnter);
        EventsManager.subscribe(PointEvents.POINT_DRAG_START, this.onPointDragStart);
        EventsManager.subscribe(PointEvents.POINT_DRAG_END, this.onPointDragEnd);
        window.addEventListener("resize", this.onWindowResize);
    }

    /**
     * @ignore
     * Internal method, triggered when browser window resized.
     * @param _event Window resize event - [UIEvent](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent).
     */
    this.onWindowResize = (_event) => {
        for (let index in this.shapes) {
            const shape = this.shapes[index];
            EventsManager.emit(ContainerEvents.CONTAINER_BOUNDS_CHANGED,shape,
                {bounds:shape.getBounds(),points:shape.points}
            )
        }
    }

    /**
     * Method used to construct SmartShape object with specified `points` and
     * with specified `options`.
     * Then it binds this object to specified `root` HTML node and displays it
     * @param root {HTMLElement} HTML DOM node af a container element
     * @param options {object} Options object to construct this shape (See [SmartShape options](#SmartShape+options))
     * @param points {array} 2D Array of points for shape polygon.
     * Each element is [x,y] coordinate array
     * @param show {boolean} Should display the shape by default. Default: true
     * @returns {object} constructed SmartShape object
     */
    this.createShape = (root,options,points,show= true) => {
        return new SmartShape().init(root, options, points, show)
    }


    /**
     * @ignore
     * Executed when new shape is created. Used to add the shape to the list
     * and setup event listeners for container, to which this shape connected
     * @param event {ShapeEvents.SHAPE_CREATE} Event object
     */
    this.onShapeCreated = (event) => {
        const shape = event.target;
        if (notNull(shape.root) && !this.getShape(shape) && typeof(shape.belongsToShape) === "function") {
            this.addShape(shape);
            if (!this.activeShape) {
                this.activeShape = shape;
            }
        }
    }

    /**
     * @ignore
     * Internal method used to push shape to collection and connect
     * event listeners to it container
     * @param shape {SmartShape} Shape object to add
     */
    this.addShape = (shape) => {
        this.shapes[shape.guid] = shape;
        if (shape.options.visible && this.isNormalShape(shape)) {
            this.visibleShapes[shape.guid] = shape;
        }
        if (this.getShapesByContainer(shape.root).length === 1) {
            this.addContainerEvents(shape)
        }
    }

    /**
     * @ignore
     * Executed when shape destroyed. Used to remove the shape from the list
     * and remove all listeners, attached to the container of this shape
     * if no other shapes attached to the same container
     * @param event {ShapeEvents.SHAPE_DESTROY} Event object
     */
    this.onShapeDestroy = (event) => {
        const shape = event.target;
        delete this.shapes[shape.guid];
        const root = shape.root;
        if (!notNull(shape.root)) {
            return
        }
        if (this.getShapesByContainer(root).length === 0) {
            this.containerEventListeners
                .filter(item => item.container === root)
                .forEach(item => {
                    item.container.removeEventListener(item.name,item.listener);
                    this.containerEventListeners.splice(this.containerEventListeners.indexOf(item),1);
                })
        }
    }

    /**
     * @ignore
     * Shape show event handler
     * @param event {ShapeEvents.SHAPE_SHOW} Event object with shape in event.target
     */
    this.onShapeShow = (event) => {
        if (this.isNormalShape(event.target)) {
            this.visibleShapes[event.target.guid] = event.target;
        }
    }

    /**
     * @ignore
     * Shape show event handler
     * @param event {ShapeEvents.SHAPE_HIDE} Event object with shape in event.target
     */
    this.onShapeHide = (event) => {
        delete this.visibleShapes[event.target.guid]
    }

    /**
     * @ignore
     * Executed when user starts dragging the shape. Switches active shape to this one
     * and also set this shape as a shape "in a process of dragging"
     * @param event {ShapeEvents.SHAPE_MOVE_START} Event object
     */
    this.onShapeMoveStart = (event) => {
        if (!this.getShapeByGuid(event.target.guid) || !event.target.options.managed) {
            return
        }
        const parent = event.target.getRootParent(true);
        if (parent && parent.options.groupChildShapes) {
            this.activateShape(parent);
            this.draggedShape = parent;
        } else {
            this.activateShape(event.target);
            this.draggedShape = event.target;
        }
    }

    /**
     * @ignore
     * Executed when mouse cursor enters the shape
     * @param event {ShapeEvents.SHAPE_MOUSE_ENTER} Event object
     */
    this.onShapeMouseEnter = (event) => {
        if (!this.draggedShape) {
            return;
        }
        if (event.buttons !== 1) {
            this.draggedShape.draggedPoint = null;
        }
    }

    /**
     * @ignore
     * Executed when user starts dragging point of the shape.
     * Sets the status of this point as a point that is being dragged
     * @param event {PointEvents.POINT_DRAG_START} Event object
     */
    this.onPointDragStart = (event) => {
        const shape = this.findShapeByPoint(event.target);
        if (shape) {
            this.draggedShape = shape;
            const parent = shape.getRootParent(true);
            if (parent && parent.options.groupChildShapes) {
                this.draggedShape = parent;
            }
            this.draggedShape.draggedPoint = event.target;
            EventsManager.emit(ShapeEvents.POINT_DRAG_START,shape,{point:event.target})
        }
    }

    /**
     * @ignore
     * Executed when user ends dragging point in the shape.
     * Clears "dragging" status of this point
     * @param _event {PointEvents.POINT_DRAG_END} Event object
     */
    this.onPointDragEnd = (_event) => {
        if (this.draggedShape) {
            this.draggedShape.draggedPoint = null;
        }
        this.draggedShape = null;
    }

    /**
     * @ignore
     * Checks and returns the shape if it exists in the array of shapes
     * or null.
     * @param shape {SmartShape} The shape to check
     * @returns {null|SmartShape}
     */
    this.getShape = (shape) => this.getShapeByGuid(shape.guid);

    /**
     * Method returns a shape to which specified point object belongs
     * or null
     * @param point {SmartPoint}
     * @returns {null|SmartShape}
     */
    this.findShapeByPoint = (point) => {
        for (let index in this.shapes) {
            const shape = this.shapes[index];
            if (shape.isShapePoint(point)) {
                return shape
            }
        }
        return null;
    }

    /**
     * Returns shape by GUID
     * @param guid {string} GUID of shape
     * @returns {null|SmartShape} The shape object
     */
    this.getShapeByGuid = (guid) => {
        if (notNull(this.shapes[guid])) {
            return this.shapes[guid]
        } else {
            return null
        }
    }

    /**
     * Returns an array of shapes that connected to specified DOM container
     * @param container {HTMLElement} Link to container
     * @returns {array} Array of [SmartShape](#SmartShape) objects
     */
    this.getShapesByContainer = (container) => {
        const result = [];
        for (let index in this.shapes) {
            const shape = this.shapes[index];
            if (this.isNormalShape(shape) && shape.root === container) {
                result.push(shape);
            }
        }
        return result;
    }

    /**
     * Method returns zIndex of the topmost shape either in specified container or globally
     * @param container {HTMLElement|null} Container to search in or null if search through all shapes
     * @returns {number} zIndex of the topmost shape
     */
    this.getMaxZIndex = (container=null) => {
        let shapes;
        if (container) {
            shapes = this.getShapesByContainer(container);
        } else {
            shapes = this.getShapes();
        }
        if (!shapes.length) {
            return 0;
        }
        return parseInt(
            shapes.map(shape=>shape.options.zIndex || 0).reduce((max,zIndex) => zIndex>max ? zIndex : max,0 )
        );
    }

    /**
     * Method returns zIndex of the bottommost shape either in specified container or globally
     * @param container {HTMLElement|null} Container to search in or null if search through all shapes
     * @returns {number} zIndex of the bottommost shape
     */
    this.getMinZIndex = (container=null) => {
        let shapes;
        if (container) {
            shapes = this.getShapesByContainer(container);
        } else {
            shapes = this.getShapes();
        }
        if (!shapes.length) {
            return 0;
        }
        return parseInt(
            shapes.map(shape=>shape.options.zIndex || 0).reduce((min,zIndex) => zIndex<min ? zIndex : min ,999999)
        );
    }

    /**
     * Method returns an array of all registered shapes (excluding rotate and resize boxes around them)
     * @returns {array} Array of [SmartShape)(#SmartShape) objects
     */
    this.getShapes = () => {
        const result = [];
        for (let index in this.shapes) {
            const shape = this.shapes[index];
            if (this.isNormalShape(shape)) {
                result.push(shape)
            }
        }
        return result
    }

    this.isNormalShape = (shape) => {
        return shape.options.id.search("_resizebox") === -1 &&
            shape.options.id.search("_rotatebox") === -1 &&
            typeof(shape.belongsToShape) === "function";
    }

    /**
     * Method used to make specified shape active and move it on top according to zIndex
     * @param shape {SmartShape} Shape to activate
     * @param displayMode {SmartShapeDisplayMode} In which mode to activate the shape (by default select next mode)
     */
    this.activateShape = (shape,displayMode=null) => {
        if (this.activeShape === shape) {
            this.activeShape.switchDisplayMode(displayMode);
            if (shape.options.moveToTop) {
                shape.moveToTop();
            }
            return;
        }
        if (typeof(shape.id) !== "undefined" &&
            (shape.id.search("_resizebox") !== -1 || shape.id.search("_rotatebox") !== -1)) {
            return
        }
        if (this.activeShape) {
            this.deactivateShape(this.activeShape);
        }
        if (shape.options.moveToTop) {
            shape.moveToTop();
        }
        this.activeShape = shape;
        EventsManager.emit(ShapeEvents.SHAPE_ACTIVATED,this.activeShape);
        this.activeShape.switchDisplayMode(displayMode);
    }

    /**
     * @ignore
     * Method used to deactivate specified shape and return it
     * to the zIndex position, which it had before activation
     * @param shape
     */
    this.deactivateShape = (shape) => {
        if (typeof(shape.options.prevZIndex) !== "undefined") {
            SmartShapeDrawHelper.updateOptions(shape);
        }
        if (shape.options.displayMode !== SmartShapeDisplayMode.DEFAULT) {
            shape.switchDisplayMode(SmartShapeDisplayMode.DEFAULT);
        }
        if (!shape.options.groupChildShapes) {
            return
        }
        shape.getChildren(true).forEach(child => {
            if (typeof(child.options.prevZIndex) !== "undefined") {
                SmartShapeDrawHelper.updateOptions(child);
                if (child.options.displayMode !== SmartShapeDisplayMode.DEFAULT) {
                    child.switchDisplayMode(SmartShapeDisplayMode.DEFAULT);
                }
            }
        })
    }

    /**
     * @ignore
     * Method used to attach required event listeners to HTML container of specified shape
     * Should run once for each container.
     * @param shape {SmartShape} Smart shape object
     */
    this.addContainerEvents = (shape) => {
        this.addContainerEvent(shape.root,"mousemove",this.mousemove);
        this.addContainerEvent(shape.root,"mouseup",this.mouseup,shape.options.id)
        this.addContainerEvent(shape.root,"dblclick",this.doubleclick);
        this.addContainerEvent(shape.root,"contextmenu", this.contextmenu);
        this.addContainerEvent(shape.root,"mouseleave", this.mouseleave);
        EventsManager.emit(SmartShapeManagerEvents.MANAGER_ADD_CONTAINER_EVENT_LISTENERS,shape.root)
    }

    /**
     * Method adds event handler of specified event of specified HTML container.
     * @param container {object} Container
     * @param eventName {string} Name of event
     * @param handler {function} Event handling function
     */
    this.addContainerEvent = (container,eventName,handler) => {
        if (this.containerEventListeners.find(event=>event.container === container && event.name === eventName)) {
            return
        }
        container.addEventListener(eventName,handler);
        this.containerEventListeners.push({id:container.id,container:container,name:eventName,listener:handler})
    }

    /**
     * @ignore
     * OnDblClick event handler, triggered when user double-clicks on shape or on shape container element
     * @param event {MouseEvent} Event object
     */
    this.doubleclick = (event) => {
        if (this.shapeOnCursor) {
            this.shapeOnCursor.eventListener.doubleclick(createEvent(event,{target:this.shapeOnCursor}))
        }
        try {
            event.stopPropagation();
        } catch (err) {}
        if (!this.activeShape || !this.activeShape.options.canAddPoints ||
            this.activeShape.draggedPoint ||
            this.activeShape.points.length>2 ||
            this.activeShape.points.length === this.activeShape.options.maxPoints
        ) {
            return
        }
        if (this.activeShape.options.displayMode === SmartShapeDisplayMode.DEFAULT) {
            this.activeShape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
        }
        const [x,y] = getMouseCursorPos(createEvent(event,{target:this.activeShape}));
        this.activeShape.addPoint(x,y,{forceDisplay:false});
    }

    this.contextmenu = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (this.shapeOnCursor && this.shapeOnCursor.options.hasContextMenu) {
            const menu = this.shapeOnCursor.shapeMenu
            if (!menu) {
                return
            }
            menu.contextMenu.origEvent = event;
            menu.contextMenu.cursorX = event.pageX;
            menu.contextMenu.cursorY = event.pageY;
            menu.contextMenu.show();
        }
    }

    /**
     * @ignore
     * onMouseDown event handler for shape's container. If cursor points on some shape,
     * forwards this event to this shape.
     * @param event {MouseEvent} Mouse down event
     */
    this.mousedown = (event) => {
        if (this.shapeOnCursor && event.buttons !== 2) {
            const parent = this.shapeOnCursor.getRootParent(true);
            if (parent && parent.options.groupChildShapes) {
                this.shapeOnCursor = parent;
            }
            this.draggedShape = this.shapeOnCursor;
            this.shapeOnCursor.eventListener.mousedown(createEvent(event,{target:this.shapeOnCursor}));
        }
    }

    /**
     * @ignore
     * OnMouseUp event handler, triggered when user releases mouse button on shape or on shape container element
     * @param event {MouseEvent} Event object
     */
    this.mouseup = (event) => {
        if (!this.draggedShape) {
            return
        }
        const dragshape = this.draggedShape;
        if (event.buttons === 1 &&
            dragshape.options.canAddPoints &&
            !dragshape.draggedPoint &&
            (dragshape.options.maxPoints === -1 || dragshape.points.length < dragshape.options.maxPoints)) {
            dragshape.addPoint(event.clientX-dragshape.root.offsetLeft,
                event.clientY-dragshape.root.offsetTop)
        }
        if (dragshape.draggedPoint) {
            EventsManager.emit(ShapeEvents.POINT_DRAG_END,this.draggedShape,{point:dragshape.draggedPoint})
            dragshape.draggedPoint.mouseup(event);
            dragshape.draggedPoint = null;
        } else {
            EventsManager.emit(ShapeEvents.SHAPE_MOUSE_UP,dragshape,{});
        }
        this.draggedShape = null;
        EventsManager.emit(ShapeEvents.SHAPE_MOVE_END,dragshape,{pos:dragshape.getPosition(true)});
    }

    /**
     * @ignore
     * Mouse move event listener. Runs when user moves mouse cursor in the container
     * @param event {MouseEvent} Mouse move event object
     */
    this.mousemove = (event) => {
        if (event.buttons !== 1) {
            if (this.draggedShape) {
                this.draggedShape.draggedPoint = null;
            }
            this.draggedShape = null;
        }
        if (!this.draggedShape) {
            this.processShapesUnderCursor(event);
            return
        }
        if (this.draggedShape) {
            this.draggedShape.eventListener.mousemove(event);
        }
    }

    /**
     * @ignore
     * onMouseOver event handler for shape's container. If cursor points on some shape,
     * forwards this event to this shape.
     * @param event {MouseEvent} Mouse over event
     */
    this.mouseover = (event) => {
        if (this.shapeOnCursor) {
            this.shapeOnCursor.eventListener.mouseover(createEvent(event, {target:this.shapeOnCursor}));
        }
    }

    /**
     * @ignore
     * onMouseEnter event handler for shape's container. If cursor points on some shape,
     * forwards this event to this shape.
     * @param event {MouseEvent} Mouse enter event
     */
    this.mouseenter = (event) => {
        if (this.shapeOnCursor) {
            this.shapeOnCursor.eventListener.mouseenter(createEvent(event, {target:this.shapeOnCursor}));
        }
    }

    /**
     * @ignore
     * onMouseOut event handler for shape's container. If cursor outs from some shape
     * forwards this event to this shape.
     * @param event {MouseEvent} Mouse out event
     */
    this.mouseout = (event) => {
        if (this.shapeOnCursor) {
            this.shapeOnCursor.eventListener.mouseout(createEvent(event,{target:event.target}));
        }
    }

    /**
     * @ignore
     * onMouseLeave event handler for shape's container. If cursor leaves some shape area
     * during resizing the shape in a simple mode, it redraws the shape with new size
     * @param event {MouseEvent} Mouse leave event
     */
    this.mouseleave = (event) => {
        if (this.draggedShape && this.draggedShape.draggedPoint &&
            this.draggedShape.options.id.search("_resizebox") !== -1) {
            const id = this.draggedShape.options.id.replace("_resizebox","");
            const destShape = this.findShapeById(id);
            if (destShape && destShape.options.simpleMode) {
                EventsManager.emit(ResizeBoxEvents.RESIZE_BOX_RESIZE, destShape.resizeBox, createEvent(event, {
                    buttons: 0,
                    oldPos: destShape.getPosition(true),
                    newPos: destShape.resizeBox.getPosition()
                }))
            }
        }
    }

    /**
     * @ignore
     * onClicj event handler for shape's container. If cursor points on some shape,
     * forwards this event to this shape.
     * @param event {MouseEvent} Mouse click event
     */
    this.click = (event) => {
        if (this.shapeOnCursor) {
            this.shapeOnCursor.eventListener.click(createEvent(event,{target:this.shapeOnCursor}));
        }
    }

    /**
     * @ignore
     * Method that runs all the time when user moves cursor
     * over the container. Used to set which shape is currently on
     * cursor, which shape is currently under the mouse cursor
     * and trigger mouseover/mouseout events for previous shape
     * and current shape.
     * @param event {MouseEvent} Mouse movement object
     */
    this.processShapesUnderCursor = (event) => {
        const [clientX,clientY] = [event.clientX,event.clientY];
        const shapeOnCursor = this.getShapeOnCursor(clientX, clientY);
        if (this.shapeOnCursor && this.shapeOnCursor !== shapeOnCursor && this.shapeOnCursor.getShapeSvg()) {
            this.shapeOnCursor.getShapeSvg().style.cursor = "default";
            this.shapeOnCursor.eventListener.mouseout(createEvent(event,{target:this.shapeOnCursor}));
        }
        if (shapeOnCursor && shapeOnCursor !== this.shapeOnCursor) {
            shapeOnCursor.eventListener.mouseover(createEvent(event,{target:shapeOnCursor}))
        }
        this.shapeOnCursor = shapeOnCursor;
        if (this.shapeOnCursor) {
            EventsManager.emit(ShapeEvents.SHAPE_MOUSE_MOVE,this.shapeOnCursor,createEvent(event));
            this.shapeOnCursor.getShapeSvg().style.cursor = "crosshair";
        }
    };

    /**
     * Internal method used to determine the shape which is under
     * mouse cursor right now.
     * @param x {number} X coordinate of mouse cursor
     * @param y {number} Y coordinate of mouse cursor
     * @returns {SmartShape|null} Either SmartShape object or null
     */
    this.getShapeOnCursor = (x,y) => {
        const shapes = Object.values(this.visibleShapes);
        if (!shapes.length) {
            return null;
        }
        const matchedShapes = shapes.filter(shape => shape.belongsToShape(x,y));
        if (!matchedShapes.length) {
            return null;
        }
        return matchedShapes
            .reduce((prevShape,shape) => shape.options.zIndex >= prevShape.options.zIndex ? shape : prevShape);
    }

    /**
     * Method used to export shapes to JSON.
     * @param shapes {array} Array of [SmartShape](#SmartShape) objects to export
     * @param compact {boolean} If this is true, then it will save only coordinates of
     * points, but not their properties
     * @returns {string} JSON string with array of SmartShape objects. If not specified, then exports all
     * shapes, that exists in SmartShapeManager.
     */
    this.toJSON = (shapes=null,compact=false) => {
        if (!shapes) {
            shapes = this.getShapes();
        }
        shapes = shapes.filter(shape => (!shape.getParent()));
        return JSON.stringify(shapes.map(shape => shape.getJSON(true,compact)))
    }

    /**
     * Method loads shapes from JSON string, previously serialized by `toJSON` method
     * @param root {HTMLElement} Container element to bind shapes to
     * @param json {string|object} JSON data with shapes as an object or as a string with array of shape definitions
     * @param progressCallback {function} Callback function that triggered after loading each shape in collection
     * with ratio of processed items between 0 and 1
     * @returns {array|null} array of loaded [SmartShape](#SmartShape) objects or null in case
     * of JSON reading error
     */
    this.fromJSON = (root,json,progressCallback=null,emitCreateEvent=true) => {
        let jsonObj = json;
        if (typeof(jsonObj) === "string") {
            jsonObj = readJSON(json);
        }
        if (!jsonObj || !jsonObj.length) {
            return null;
        }
        const result = [];
        for (let index in jsonObj) {
            const obj = jsonObj[index];
            if (obj.options.id && this.findShapeById(obj.options.id)) {
                continue
            }
            result.push(new SmartShape().fromJSON(root,obj,true,emitCreateEvent));
            if (progressCallback && typeof(progressCallback) === "function") {
                progressCallback(index/jsonObj.length);
            }
        }
        return result;
    }

    /**
     * Method returns all shapes which have option with specified `name` and specified `value`
     * @param name {string} Name of option to check
     * @param value {any} Value of option to check
     * @returns {array} Array of [SmartShape](#SmartShape) objects that match condition
     */
    this.findShapesByOptionValue = (name,value) => (
        this.getShapes().filter(shape => shape.options[name] === value)
    )

    /**
     * Method returns shape by specified ID
     * @param id {string} ID to check
     * @returns {SmartShape|null} SmartShape object or null if no shape with specified ID found
     */
    this.findShapeById = (id) => {
        const result = this.findShapesByOptionValue("id",id);
        if (result && result.length) {
            return result[0]
        }
        return null;
    }

    /**
     * Method returns shape by specified name
     * @param name {string} Name to check
     * @returns {SmartShape|null} SmartShape object or null if no shape with specified name found
     */
    this.findShapeByName = (name) => {
        const result = this.findShapesByOptionValue("name",name);
        if (result && result.length) {
            return result[0]
        }
        return null;
    }

    /**
     * @ignore
     * Method used to clean manager object. Removes all shapes from list and
     * attached containers event listeners
     */
    this.clear  = () => {
        this.containerEventListeners.forEach(({container,name,listener}) => {
            try {
                container.removeEventListener(name,listener)
            } catch (err) {
                console.error(err);
            }
        })
        this.containerEventListeners = [];
        while (Object.values(this.shapes).length) {
            Object.values(this.shapes)[0].destroy();
        }
    }

    /**
     * Method used to import collection of shapes from JSON array in GeoJSON format: https://geojson.org/
     * @param container {HTMLElement} The HTML element to connect loaded shapes
     * @param geoJSON {object} Javascript object in geoJSON format
     * @param options {object} Options to tune the import process:
     * `idField`: the field from "properties collection of GeoJSON object that used as a shape ID,
     * `nameField`: the field from "properties" collection of GeoJSON object that used as a shape name,
     * `width`: the width to which loaded shapes should be scaled (if not specified then calc automatically based on height),
     * `height`: the height to which loaded shapes should be scaled (if not specified then calc automatically based on width),
     * `options`: shape options [SmartShape.options](#SmartShape+options) to set to each shape after import
     * `scale`: scaling factor to which loaded shapes should be scaled (if not specified, width and height used,
     * if nothing specified, then scales to 200px width if natural width is less than this)
     * `fields`: which other fields to import from GeoJSON, in addition to `idField` and `nameField`
     * @param progressCallback {function} Function that executes after loading each shape from file. If specified, it will
     * be executed with three arguments: `currentShapeIndex` - index of current processed shape, `totalShapesLength` - total
     * number of shapes in the collection, shape - SmartShape object of currently processed shape.
     * @returns {array} Array of SmartShape objects
     */
    this.fromGeoJson = (container,geoJSON,options={},progessCallback=null) => {
        return fromGeoJSON(container,geoJSON, options, progessCallback);
    }

    /**
     * Method returns total count of shapes, managed by this manager
     * @returns {number}
     */
    this.length = () => {
        return Object.values(this.shapes).length;
    }
}

/**
 * Events that SmartShapeManager can emit.
 * @param MANAGER_ADD_CONTAINER_LISTENERS Emits each time when add SmartShape event listeners to container for shapes
 * (usually after first shape added to it)
 * @param MANAGER_REMOVE_CONTAINER_LISTENERS Emits each time when remove SmartShape event listeners from container
 * for shapes (usually after last shape removed from container)
 * @enum {string}
 */
export const SmartShapeManagerEvents = {
    MANAGER_ADD_CONTAINER_EVENT_LISTENERS: "manager_add_container_event_listeners",
    MANAGER_REMOVE_CONTAINER_EVENT_LISTENERS: "manager_remove_container_event_listeners"
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

export default new SmartShapeManager().init();
