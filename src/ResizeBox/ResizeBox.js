import SmartShape from "../SmartShape/SmartShape.js";
import {PointMoveDirections} from "../SmartPoint/SmartPoint.js";
import ResizeBoxEventListener from "./ResizeBoxEventListener.js";
import EventsManager from "../events/EventsManager.js";
import {ShapeEvents} from "../SmartShape/SmartShapeEventListener.js";
import {resize_lb,resize_cb,resize_ct,resize_lc,resize_lt,resize_rb,resize_rc,resize_rt} from "../../assets/graphics.js";
import {uuid} from "../utils";
/**
 * Class represents a special type of shape, that shows the rectangle with markers on
 * it corners, used to resize it. [See demo](https://code.germanov.dev/smart_shape/tests/prod/resize_box.html).
 * Mostly used to resize [SmartShape](#SmartShape) object, but also can be used as an independent shape
 * for tasks like resizing objects on a web page or select rectangular regions.
 * @constructor
 */
function ResizeBox() {

    /**
     * Left corner of resize box
     * @type {number}
     */
    this.left = 0;

    /**
     * Top corner of resize box
     * @type {number}
     */
    this.top = 0;

    /**
     * Right corner of resize box
     * @type {number}
     */
    this.right = 0;

    /**
     * Bottom corner of resize box
     * @type {number}
     */
    this.bottom = 0;

    /**
     * Width of resize box
     * @type {number}
     */
    this.width = 0;

    /**
     * Height of resize box
     * @type {number}
     */
    this.height = 0;

    /**
     * Underlying shape, that used to service this resize box
     * (draw, point event handling and so on)
     * @type {SmartShape}
     */
    this.shape = null;

    /**
     * Global unique identifier of this object.
     * Generated automatically
     * @type {string}
     */
    this.guid = uuid()

    /**
     * Options of resize box
     * @param id {string} Unique ID or resize box. If instantiated by [SmartShape](#SmartShape), then setup
     * automatically
     * @param shapeOptions {object} Options of underlying shape, that used to draw and manage this ResizeBox. See
     * [SmartShape.options](#SmartShape+options)
     * @param zIndex {number} Order of element in a stack of HTML elements
     * (https://www.w3schools.com/cssref/pr_pos_z-index.asp). Elements if higher z-index value placed on top.
     * @type {object}
     */
    this.options = {
        id: "",
        shapeOptions: {
            id: "",
            canAddPoints: false,
            canDeletePoints: false,
            stroke: "#aaaaaa",
            strokeWidth:1,
            strokeDasharray: "10",
            pointOptions: {
                style: {
                    borderWidth: "0px",
                    borderRadius: "0px",
                    backgroundColor: "rgba(0,0,0,0)",
                    cursor:"pointer",
                },
                forceDisplay:true,
                width:13,
                height:13,
            },
        },
        zIndex: 1000
    }

    /**
     * Event listener that handles event listening logic for this resize box.
     * Instance of [ResizeBoxEventListener](#ResizeBoxEventListener) class.
     * @type {ResizeBoxEventListener}
     */
    this.eventListener = null;

    /**
     * Left top marker point
     * @type {SmartPoint}
     */
    this.left_top = null;

    /**
     * Left center marker point
     * @type {SmartPoint}
     */
    this.left_center = null;

    /**
     * Left bottom marker point
     * @type {SmartPoint}
     */
    this.left_bottom = null;

    /**
     * Center top marker point
     * @type {SmartPoint}
     */
    this.center_top = null;

    /**
     * Center bottom marker point
     * @type {SmartPoint}
     */
    this.center_bottom = null;

    /**
     * Right top marker point
     * @type {SmartPoint}
     */
    this.right_top = null;

    /**
     * Right center marker point
     * @type {SmartPoint}
     */
    this.right_center = null;

    /**
     * Right bottom marker point
     * @type {SmartPoint}
     */
    this.right_bottom = null;

    /**
     * Method used to construct ResizeBox object with specified coordinates and
     * size, with specified `options`. Then it binds this object to specified `root`
     * HTML node and displays it
     * @param root {HTMLElement} HTML element that used as a container for this ResizeBox
     * @param left {number} Left corner of shape relative to container top left
     * @param top {number} Top corner of shape relative to container top left
     * @param width {number} Width of shape
     * @param height {number} Height of shape
     * @param options {object} Options used to setup ResizeBox. See [here](#ResizeBox+options).
     * @returns {ResizeBox} constucted ResizeBox object
     */
    this.init = (root,left,top,width,height,options={}) => {
        this.left = parseInt(left);
        this.top = parseInt(top);
        this.width = parseInt(width);
        this.height = parseInt(height);
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
        this.setOptions(options);
        this.options.shapeOptions.id = this.options.id;
        this.options.shapeOptions.canRotate = false;
        this.options.shapeOptions.canScale = false;
        this.shape = new SmartShape().init(root,Object.assign({},this.options.shapeOptions),[]);
        this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds();
        this.addPoints();
        this.eventListener = new ResizeBoxEventListener(this).run();
        this.redraw()
        EventsManager.emit(ShapeEvents.SHAPE_CREATE,this,{});
        return this;
    }

    /**
     * Method used to change options of ResizeBox.
     * @param options {object} Options object. See [here](#ResizeBox+options).
     */
    this.setOptions = (options = {}) => {
        if (!options || typeof(options) !== "object") {
            return
        }
        if (options.shapeOptions && typeof(options.shapeOptions) === "object") {
            if (options.shapeOptions.pointOptions && typeof(options.shapeOptions.pointOptions) === "object") {
                options.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions,options.shapeOptions.pointOptions);
            } else {
                options.shapeOptions.pointOptions = Object.assign({},this.options.shapeOptions.pointOptions);
            }
            options.shapeOptions = Object.assign(this.options.shapeOptions,options.shapeOptions);
        } else {
            options.shapeOptions = Object.assign({},this.options.shapeOptions);
        }
        options.shapeOptions.zIndex = options.zIndex || this.options.zIndex;
        options.shapeOptions.id = options.id ? options.id : this.options.id;
        Object.assign(this.options,options);
        if (this.shape) {
            this.shape.setOptions(this.options.shapeOptions);
        }
    }

    /**
     * @ignore
     * Method used to add marker points to ResizeBox, that lately used to resize the box
     */
    this.addPoints = () => {
        this.left_top = this.shape.addPoint(this.left,this.top,{id:this.shape.guid+"_left_top",style:{backgroundImage: "url('"+resize_lt+"')"}});
        this.center_top = this.shape.addPoint(this.left+this.width/2,this.top,{id:this.shape.guid+"_center_top",style:{backgroundImage: "url('"+resize_ct+"')"}});
        this.right_top = this.shape.addPoint(this.right,this.top,{id:this.shape.guid+"_right_top",style:{backgroundImage: "url('"+resize_rt+"')"}});
        this.right_center = this.shape.addPoint(this.right,this.top+this.height/2,{id:this.shape.guid+"_right_center",style:{backgroundImage: "url('"+resize_rc+"')"}});
        this.right_bottom = this.shape.addPoint(this.right,this.bottom,{id:this.shape.guid+"_right_bottom",style:{backgroundImage: "url('"+resize_rb+"')"}});
        this.center_bottom = this.shape.addPoint(this.left+this.width/2,this.bottom,{id:this.shape.guid+"_center_bottom",style:{backgroundImage: "url('"+resize_cb+"')"}});
        this.left_bottom = this.shape.addPoint(this.left,this.bottom,{id:this.shape.guid+"_left_bottom",style:{backgroundImage: "url('"+resize_lb+"')"}});
        this.left_center = this.shape.addPoint(this.left,this.top+this.height/2,{id:this.shape.guid+"_left_center",style:{backgroundImage: "url('"+resize_lc+"')"}});
        this.setPointsOptions();
    }

    /**
     * @ignore
     * Method used to setup marker points of ResizeBox
     */
    this.setPointsOptions = () => {
        this.setPointsMoveDirections();
        this.setPointsMoveBounds();
    }

    /**
     * @ignore
     * Method used to setup to which directions allowed to move marker points.
     * For example, some of them possible to move only horizontally, others, only vertically.
     * See [SmartShape.options.moveDirections](#SmartShape+options) to learn more.
     */
    this.setPointsMoveDirections = () => {
        this.center_top.setOptions({moveDirections:[PointMoveDirections.TOP,PointMoveDirections.BOTTOM]});
        this.center_bottom.setOptions({moveDirections:[PointMoveDirections.TOP,PointMoveDirections.BOTTOM]});
        this.left_center.setOptions({moveDirections:[PointMoveDirections.LEFT,PointMoveDirections.RIGHT]});
        this.right_center.setOptions({moveDirections:[PointMoveDirections.LEFT,PointMoveDirections.RIGHT]});
    }

    /**
     * @ignore
     * Method used to set bounds, to which possible to move each marker point of ResizeBox
     * For example, it's impossible to drag right corner beyond left corner, top corner beyond bottom corner.
     */
    this.setPointsMoveBounds = () => {
        this.left_top.options.bounds.bottom = this.left_bottom.y-this.left_bottom.options.height-this.left_center.options.height;
        this.left_top.options.bounds.right = this.right_top.x-this.right_top.options.width-this.center_top.options.width;
        this.center_top.options.bounds.bottom = this.left_bottom.y-this.left_bottom.options.height-this.left_center.options.height;
        this.right_top.options.bounds.bottom = this.left_bottom.y-this.left_bottom.options.height-this.left_center.options.height;
        this.right_top.options.bounds.left = this.left_top.x+this.right_top.options.width+this.center_top.options.width;
        this.right_center.options.bounds.left = this.left_top.x+this.right_center.options.width+this.center_top.options.width;
        this.right_bottom.options.bounds.left = this.left_top.x+this.right_bottom.options.width+this.center_bottom.options.width;
        this.right_bottom.options.bounds.top = this.right_top.y+this.right_top.options.height+this.right_center.options.height;
        this.center_bottom.options.bounds.top =this.center_top.y+this.center_top.options.height+this.right_center.options.height;
        this.left_bottom.options.bounds.right = this.right_bottom.x-this.right_bottom.options.width-this.center_bottom.options.width;
        this.left_bottom.options.bounds.top = this.left_top.y+this.left_top.options.height+this.left_center.options.height;
        this.left_center.options.bounds.right = this.right_center.x-this.right_center.options.width-this.center_top.options.width;
    }

    /**
     * @ignore
     * Method used to recalculate coordinates of marker points
     * according to current ResizeBox coordinates and dimensions.
     */
    this.adjustCoordinates = () => {
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
        this.left_top.x = this.left;
        this.left_top.y = this.top;
        this.right_top.x = this.right;
        this.right_top.y = this.top;
        this.left_bottom.x = this.left;
        this.left_bottom.y = this.bottom;
        this.right_bottom.x = this.right;
        this.right_bottom.y = this.bottom;
        this.center_top.y = this.top;
        this.center_bottom.y = this.bottom;
        this.left_center.x = this.left;
        this.right_center.x = this.right;
        this.adjustCenters();
    }

    /**
     * @ignore
     * Method used to recalculate coordinates of point markers, located on the centers of rectangle,
     * after user dragged corner markers.
     */
    this.adjustCenters = () => {
        this.center_top.x = parseInt(this.left_top.x+(this.right_top.x-this.left_top.x)/2);
        this.center_bottom.x = parseInt(this.left_top.x+(this.right_top.x-this.left_top.x)/2);
        this.left_center.y = parseInt(this.left_top.y+(this.left_bottom.y-this.left_top.y)/2);
        this.right_center.y = parseInt(this.right_top.y+(this.right_bottom.y-this.right_top.y)/2);
    }

    /**
     * @ignore
     * Internal method that used to calculate resize box dimensions, based on point coordinates.
     * Set left,top,right,bottom,width and height of resize box.
     */
    this.calcPosition = () => {
        this.shape.calcPosition();
        this.left = this.shape.left;
        this.top = this.shape.top;
        this.bottom = this.shape.bottom;
        this.right = this.shape.right;
        this.width = this.shape.width;
        this.height = this.shape.height;
    }

    /**
     * Method used to get current position of Resize Box
     * @returns {object} Position with fields:
     * `top`,`left`,`right`,`bottom`,`width`,`height`
     */
    this.getPosition = () => {
        return  {top:this.top, left: this.left, bottom: this.bottom, right: this.right, width: this.width, height:this.height}
    }


    /**
     * Method used to redraw resize box
     */
    this.redraw = () => {
        this.adjustCoordinates();
        this.shape.setOptions(this.options.shapeOptions);
        this.setPointsMoveBounds();
        this.shape.redraw();
    }

    /**
     * Method used to show Resize Box if it has hidden
     */
    this.show = () => {
        this.options.shapeOptions.visible = true;
        this.shape.show();
    }

    /**
     * Method used to hide Resize Box
     */
    this.hide = () => {
        this.options.shapeOptions.visible = false;
        this.shape.hide();
    }

    /**
     * Destroys the ResizeBox. Destroys all points, removes event listeners and removes the shape from screen.
     * But variable continue existing. To completely remove the shape,
     * set the variable to 'null' after calling this method.
     */
    this.destroy = () => {
        EventsManager.emit(ShapeEvents.SHAPE_DESTROY,this,{});
        this.eventListener.destroy();
        this.shape.destroy();
    }

    /**
     * Uniform method that used to add event handler of specified type to this object.
     * ResizeBox can emit events, defined in [ResizeBoxEvents](#ResizeBoxEvents) enumeration. So, you can
     * listen any of these events.
     * @param eventName {string} - Name of event. Use one of names, defined in [ResizeBoxEvents](#ResizeBoxEvents)
     * @param handler {function} - Function that used as an event handler
     * @returns {function} - Pointer to added event handler. Should be used to remove event listener later.
     */
    this.addEventListener = (eventName,handler) => {
        return this.eventListener.addEventListener(eventName,handler);
    }

    /**
     * Uniform method that used to remove event handler, that previously added
     * to this object.
     * @param eventName {ResizeBoxEvents|string} Name of event to remove listener from
     * @param listener {function} Pointer to event listener, that added previously.
     * It was returned from [addEventListener](#ResizeBox+addEventListener) method.
     */
    this.removeEventListener = (eventName,listener) => {
        this.eventListener.removeEventListener(eventName,listener);
    }
}

export default ResizeBox;
