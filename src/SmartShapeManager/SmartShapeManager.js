import EventsManager from "../events/EventsManager.js";
import {ShapeEvents} from "../SmartShape/SmartShapeEventListener.js";
import {notNull} from "../utils/index.js";
import {SmartShapeDisplayMode} from "../SmartShape/SmartShape.js";
import {PointEvents} from "../SmartPoint/SmartPoint.js";

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
     * Array of [SmartShape's](#SmartShape) objects
     * @type {array}
     */
    this.shapes = [];

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
        EventsManager.subscribe(ShapeEvents.SHAPE_MOVE_START, this.onShapeMoveStart);
        EventsManager.subscribe(ShapeEvents.SHAPE_MOUSE_ENTER, this.onShapeMouseEnter);
        EventsManager.subscribe(PointEvents.POINT_DRAG_START, this.onPointDragStart);
        EventsManager.subscribe(PointEvents.POINT_DRAG_END, this.onPointDragEnd);
    }

    /**
     * @ignore
     * Executed when new shape is created. Used to add the shape to the list
     * and setup event listeners for container, to which this shape connected
     * @param event {ShapeEvents.SHAPE_CREATE} Event object
     */
    this.onShapeCreated = (event) => {
        const shape = event.target;
        if (notNull(shape.root) && !this.getShape(shape)) {
            this.shapes.push(shape)
            this.activeShape = shape;
            if (this.getShapesByContainer(shape.root).length === 1) {
                this.addContainerEvents(shape)
            }
        }
    }

    this.onShapeDestroy = (event) => {
        const shape = event.target;
        const root = shape.root;
        if (!notNull(shape.root) || !this.getShape(shape)) {
            return
        }
        this.shapes.splice(this.shapes.indexOf(shape),1);
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
     * Executed when user starts dragging the shape. Switches active shape to this one
     * and also set this shape as a shape "in a process of dragging"
     * @param event {ShapeEvents.SHAPE_MOVE_START} Event object
     */
    this.onShapeMoveStart = (event) => {
        if (!this.getShapeByGuid(event.target.guid) || !event.target.options.managed) {
            return
        }
        this.activeShape = event.target;
        this.draggedShape = event.target;
        this.shapes
            .filter(shape=>shape.guid !== event.target.guid &&
                shape.options.displayMode !== SmartShapeDisplayMode.DEFAULT)
           .forEach(shape=>shape.switchDisplayMode(SmartShapeDisplayMode.DEFAULT))
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
            this.draggedShape = null;
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
            this.draggedShape.draggedPoint = event.target;
        }
    }

    /**
     * @ignore
     * Executed when user ends dragging point in the shape.
     * Clears "dragging" status of this point
     * @param event {PointEvents.POINT_DRAG_END} Event object
     */
    this.onPointDragEnd = (_event) => {
        if (this.draggedShape) {
            this.draggedShape.draggedPoint = null;
        }
        this.draggedShape = null;
    }

    /**
     * Method returns a shape to which specified point object belongs
     * or null
     * @param point {SmartPoint}
     * @returns {null|SmartShape}
     */
    this.findShapeByPoint = (point) => {
        for (let shape of this.shapes) {
            if (shape.isShapePoint(point)) {
                return shape
            }
        }
        return null;
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
     * Returns shape by GUID
     * @param guid {string} GUID of shape
     * @returns {null|SmartShape} The shape object
     */
    this.getShapeByGuid = (guid) => this.shapes.find(shape => shape.guid === guid);

    /**
     * Returns an array of shapes that connected to specified DOM container
     * @param container {HTMLElement} Link to container
     * @returns {array} Array of [SmartShape](#SmartShape) objects
     */
    this.getShapesByContainer = (container) => this.shapes.filter(shape => shape.root === container);

    /**
     * @ignore
     * Method used to attach required event listeners to HTML container of specified shape
     * Should run once for each container.
     * @param shape {SmartShape} Smart shape object
     */
    this.addContainerEvents = (shape) => {
        this.addContainerEvent(shape.root,"mousemove",this.mousemove)
        this.addContainerEvent(shape.root,"mouseup",this.mouseup)
        this.addContainerEvent(shape.root,"dblclick",this.doubleclick)
        this.checkCanDeletePoints(shape);
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
     * OnMouseUp event handler, triggered when user releases mouse button on shape or on shape container element
     * @param event {MouseEvent} Event object
     */
    this.mouseup = (event) => {
        if (!this.draggedShape) {
            return
        }
        const dragshape = this.draggedShape;
        if (event.buttons === 1 && dragshape.options.canAddPoints && !dragshape.draggedPoint) {
            if (dragshape.options.maxPoints === -1 || dragshape.points.length < dragshape.options.maxPoints) {
                dragshape.addPoint(event.clientX-dragshape.root.offsetLeft,
                    event.clientY-dragshape.root.offsetTop)
            }
        }
        if (dragshape.draggedPoint) {
            dragshape.draggedPoint.mouseup(event);
            dragshape.draggedPoint = null;
        }
        this.draggedShape = null;
        EventsManager.emit(ShapeEvents.SHAPE_MOVE_END,dragshape);
    }

    /**
     * @ignore
     * Mouse move event listener. Runs when user moves mouse cursor in the container
     * @param event {MouseEvent} Mouse move event object
     */
    this.mousemove = (event) => {
        if (event.buttons !== 1) {
            this.draggedShape = null;
        }
        if (this.draggedShape) {
            if (event.buttons !== 1) {
                this.draggedShape.draggedPoint = null;
                this.draggedShape = null;
                return
            }
            this.draggedShape.eventListener.mousemove(event);
        }
    }

    /**
     * @ignore
     * OnDblClick event handler, triggered when user double-clicks on shape or on shape container element
     * @param event {MouseEvent} Event object
     */
    this.doubleclick = (event) => {
        event.stopPropagation();
        if (!this.activeShape) {
            return
        }
        if (this.activeShape.options.canAddPoints && !this.activeShape.draggedPoint) {
            if (this.activeShape.options.maxPoints === -1 || this.activeShape.points.length < this.activeShape.options.maxPoints) {
                this.activeShape.addPoint(event.clientX-this.activeShape.root.offsetLeft + window.scrollX,
                    event.clientY-this.activeShape.root.offsetTop + window.scrollY,{forceDisplay:true});
            }
        }
    }

    /**
     * @ignore
     * Method that disables context menu on container if allowed to delete points,
     * it's required to press second mouse button to delete the point
     */
    this.checkCanDeletePoints = (shape) => {
        if (!!shape.points.find(point => point.options.canDelete === true)) {
            this.addContainerEvent(shape.root,"contextmenu",event=>event.preventDefault())
        }
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
        this.shapes = [];
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

export default new SmartShapeManager().init();
