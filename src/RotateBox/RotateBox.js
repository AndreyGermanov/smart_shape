import SmartShape from "../SmartShape/SmartShape.js";
import RotateBoxEventListener from "./RotateBoxEventListener.js";
import EventsManager from "../events/EventsManager.js";
import {ShapeEvents} from "../SmartShape/SmartShapeEventListener.js";
import {rotate_tl,rotate_tr,rotate_br,rotate_bl} from "../../assets/graphics.js";
import {uuid} from "../utils";
/**
 * Class represents a special type of shape, that shows the rectangle with markers on
 * it corners, used to rotate it. [See demo](https://code.germanov.dev/smart_shape/tests/prod/rotate_box.html).
 * Mostly used to rotate [SmartShape](#SmartShape) object, but also can be used as an independent shape
 * for tasks like rotating objects on a web page or select rectangular regions.
 * @constructor
 */
function RotateBox() {

    /**
     * Left corner of rotate box
     * @type {number}
     */
    this.left = 0;

    /**
     * Top corner of rotate box
     * @type {number}
     */
    this.top = 0;

    /**
     * Right corner of rotate box
     * @type {number}
     */
    this.right = 0;

    /**
     * Bottom corner of rotate box
     * @type {number}
     */
    this.bottom = 0;

    /**
     * Width of rotate box
     * @type {number}
     */
    this.width = 0;

    /**
     * Height of rotate box
     * @type {number}
     */
    this.height = 0;

    /**
     * Underlying shape, that used to service this rotate box
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
     * Options of rotate box
     * @param id {string} Unique ID or rotate box. If instantiated by [SmartShape](#SmartShape), then setup
     * automatically
     * @param shapeOptions {object} Options of underlying shape, that used to draw and manage this RotateBox. See
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
                    borderColor: "rgb(204, 204, 204)",
                    borderRadius: "0px",
                    cursor:"pointer",
                    backgroundColor:'rgba(0,0,0,0'
                },
                width:13,
                height:13,
                forceDisplay:true
            }
        },
        zIndex: 1000
    }

    /**
     * Event listener that handles event listening logic for this rotate box.
     * Instance of [ResizeBoxEventListener](#ResizeBoxEventListener) class.
     * @type {RotateBoxEventListener}
     */
    this.eventListener = null;

    /**
     * Left top marker point
     * @type {SmartPoint}
     */
    this.left_top = null;

    /**
     * Left bottom marker point
     * @type {SmartPoint}
     */
    this.left_bottom = null;

    /**
     * Right top marker point
     * @type {SmartPoint}
     */
    this.right_top = null;

    /**
     * Right bottom marker point
     * @type {SmartPoint}
     */
    this.right_bottom = null;

    /**
     * Method used to construct RotateBox object with specified coordinates and
     * size, with specified `options`. Then it binds this object to specified `root`
     * HTML node and displays it
     * @param root {HTMLElement} HTML element that used as a container for this RotateBox
     * @param left {number} Left corner of shape relative to container top left
     * @param top {number} Top corner of shape relative to container top left
     * @param width {number} Width of shape
     * @param height {number} Height of shape
     * @param options {object} Options used to setup RotateBox. See [here](#RotateBox+options).
     * @returns {RotateBox} constucted RotateBox object
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
        this.eventListener = new RotateBoxEventListener(this).run();
        this.redraw()
        EventsManager.emit(ShapeEvents.SHAPE_CREATE,this,{});
        return this;
    }

    /**
     * Method used to change options of RotateBox.
     * @param options {object} Options object. See [here](#RotateBox+options).
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
     * Method used to add marker points to RotateBox, that lately used to rotate the box
     */
    this.addPoints = () => {
        this.left_top = this.shape.addPoint(this.left,this.top,{id:this.shape.guid+"_left_top",style:{backgroundImage: "url('"+rotate_tl+"')"}});
        this.right_top = this.shape.addPoint(this.right,this.top,{id:this.shape.guid+"_right_top",style:{backgroundImage: "url('"+rotate_tr+"')"}});
        this.right_bottom = this.shape.addPoint(this.right,this.bottom,{id:this.shape.guid+"_right_bottom",style:{backgroundImage: "url('"+rotate_br+"')"}});
        this.left_bottom = this.shape.addPoint(this.left,this.bottom,{id:this.shape.guid+"_left_bottom",style:{backgroundImage: "url('"+rotate_bl+"')"}});
    }

    /**
     * @ignore
     * Method used to recalculate coordinates of marker points
     * according to current RotateBox coordinates and dimensions.
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
    }

    /**
     * @ignore
     * Internal method that used to calculate rotate box dimensions, based on point coordinates.
     * Set left,top,right,bottom,width and height of rotate box.
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
     * Method used to get current position of Rotate Box
     * @returns {object} Position with fields:
     * `top`,`left`,`right`,`bottom`,`width`,`height`
     */
    this.getPosition = () => (
        {top:this.top, left: this.left, bottom: this.bottom, right: this.right, width: this.width, height:this.height}
    )

    /**
     * Method used to redraw rotate box
     */
    this.redraw = () => {
        this.adjustCoordinates();
        this.shape.setOptions(this.options.shapeOptions);
        this.shape.redraw();
    }

    /**
     * Method used to show Rotate Box if it has hidden
     */
    this.show = () => {
        this.options.shapeOptions.visible = true;
        this.shape.show();
    }

    /**
     * Method used to hide Rotate Box
     */
    this.hide = () => {
        this.options.shapeOptions.visible = false;
        this.shape.hide();
    }

    /**
     * Destroys the RotateBox. Destroys all points, removes event listeners and removes the shape from screen.
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
     * @param eventName {string} - Name of event
     * @param handler {function} - Function that used as an event handler
     * @returns {function} - Pointer to added event handler. Should be used to remove event listener later.
     */
    this.addEventListener = (eventName,handler) => {
        return this.eventListener.addEventListener(eventName,handler);
    }

    /**
     * Uniform method that used to remove event handler, that previously added
     * to this object.
     * @param eventName {RotateBoxEvents|string} Name of event to remove listener from
     * @param listener {function} Pointer to event listener, that added previously.
     * It was returned from [addEventListener](#RotateBox+addEventListener) method.
     */
    this.removeEventListener = (eventName,listener) => {
        this.eventListener.removeEventListener(eventName,listener);
    }
}

/**
 * Enumeration that defines events, that RotateBox can emit.
 * @param ROTATE_BOX_ROTATE Emitted when user rotate the shape by dragging one of marker points.
 * The event object of this type contains `angle` option, which is an angle of rotation in degrees.
 * @enum {string}
 */
export const RotateBoxEvents = {
    ROTATE_BOX_ROTATE: "rotate"
};

export default RotateBox;
