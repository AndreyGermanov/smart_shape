import SmartShape from "../smart_shape.js";
import {PointEvents, PointMoveDirections} from "../smart_point.js";
import EventsManager from "../events/EventsManager.js";

function ResizeBox() {

    this.left = 0;

    this.top = 0;

    this.right = 0;

    this.bottom = 0;

    this.width = 0;

    this.height = 0;

    this.shape = null;

    this.options = {
        id: "",
        shapeOptions: {
            id: "",
            canAddPoints: false,
            canDeletePoints: false,
            pointOptions: {}
        },
        zIndex: 1000
    }

    this.subscriptions = {
        "resize": []
    }

    this.init = (root,left,top,width,height,options={}) => {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
        this.setOptions(options);
        this.options.shapeOptions.id = this.options.id+"_shape";
        this.shape = new SmartShape().init(root,this.options.shapeOptions,[]);
        this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds();
        this.addPoints();
        this.setEventListeners();
        return this;
    }

    this.setOptions = (options = {}) => {
        if (options && typeof(options) === "object") {
            if (options.shapeOptions && typeof(options.shapeOptions) === "object") {
                if (options.shapeOptions.pointOptions && typeof(options.shapeOptions.pointOptions) === "object") {
                    options.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions,options.shapeOptions.pointOptions);
                } else {
                    options.shapeOptions.pointOptions = this.options.shapeOptions.pointOptions;
                }
                options.shapeOptions = Object.assign(this.options.shapeOptions,options.shapeOptions);
            } else {
                options.shapeOptions = this.options.shapeOptions;
            }
            options.shapeOptions.zIndex = options.zIndex || this.options.zIndex;
            options.shapeOptions.id = options.id ? options.id+"_shape" : this.options.id+"_shape";
            Object.assign(this.options,options);
        }
    }

    this.addPoints = () => {
        this.left_top = this.shape.addPoint(this.left,this.top,{id:this.options.id+"_left_top"});
        this.center_top = this.shape.addPoint(this.left+this.width/2,this.top,{id:this.options.id+"_center_top"});
        this.right_top = this.shape.addPoint(this.right,this.top,{id:this.options.id+"_right_top"});
        this.right_center = this.shape.addPoint(this.right,this.top+this.height/2,{id:this.options.id+"_right_center"});
        this.right_bottom = this.shape.addPoint(this.right,this.bottom,{id:this.options.id+"_right_bottom"});
        this.center_bottom = this.shape.addPoint(this.left+this.width/2,this.bottom,{id:this.options.id+"_center_bottom"});
        this.left_bottom = this.shape.addPoint(this.left,this.bottom,{id:this.options.id+"_left_bottom"});
        this.left_center = this.shape.addPoint(this.left,this.top+this.height/2,{id:this.options.id+"_left_center"});
        this.setPointsOptions();
    }

    this.setPointsOptions = () => {
        this.setPointsMoveDirections();
        this.setPointsMoveBounds();
    }

    this.setPointsMoveDirections = () => {
        this.center_top.setOptions({moveDirections:[PointMoveDirections.TOP,PointMoveDirections.BOTTOM]});
        this.center_bottom.setOptions({moveDirections:[PointMoveDirections.TOP,PointMoveDirections.BOTTOM]});
        this.left_center.setOptions({moveDirections:[PointMoveDirections.LEFT,PointMoveDirections.RIGHT]});
        this.right_center.setOptions({moveDirections:[PointMoveDirections.LEFT,PointMoveDirections.RIGHT]});
    }

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
        this.left_bottom.options.bounds.top = this.left_top.x+this.left_top.options.height+this.left_center.options.height;
        this.left_center.options.bounds.right = this.right_center.x-this.right_center.options.width-this.center_top.options.width;
    }

    this.setEventListeners = () => {
        EventsManager.subscribe(PointEvents.POINT_DRAG_MOVE, this.onPointDragMove);
        EventsManager.subscribe(PointEvents.POINT_DRAG_END, this.onPointDragMove);
    }

    this.onPointDragMove = (event) => {
        if (!this.shape.isShapePoint(event.target)) {
            return
        }
        switch (event.target) {
            case this.left_top:
                this.onLeftTopDragMove(event);
                break;
            case this.center_top:
                this.onCenterTopDragMove(event);
                break;
            case this.right_top:
                this.onRightTopDragMove(event);
                break;
            case this.right_center:
                this.onRightCenterDragMove(event);
                break;
            case this.right_bottom:
                this.onRightBottomDragMove(event);
                break;
            case this.center_bottom:
                this.onCenterBottomDragMove(event);
                break;
            case this.left_bottom:
                this.onLeftBottomDragMove(event);
                break;
            case this.left_center:
                this.onLeftCenterDragMove(event);
                break;
        }
        this.adjustCenters();
        this.setPointsMoveBounds();
        const oldDims = {left:this.left,top:this.top,right:this.right,bottom:this.bottom,width:this.width,height:this.height};
        this.calcPosition();
        const newDims = {left:this.left,top:this.top,right:this.right,bottom:this.bottom,width:this.width,height:this.height};
        this.redraw();
        EventsManager.emit(ResizeBoxEvents.RESIZE_BOX_RESIZE,this,{oldDims,newDims});
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

    this.onLeftTopDragMove = (event) => {
        this.left_center.x = event.target.x;
        this.left_bottom.x = event.target.x;
        this.center_top.y = event.target.y;
        this.right_top.y = event.target.y;
    }

    this.onCenterTopDragMove = (event) => {
        this.left_top.y = event.target.y;
        this.right_top.y = event.target.y;
    }

    this.onRightTopDragMove = (event) => {
        this.left_top.y = event.target.y;
        this.center_top.y = event.target.y;
        this.right_center.x = event.target.x;
        this.right_bottom.x = event.target.x;
    }

    this.onRightCenterDragMove = (event) => {
        this.right_top.x = event.target.x;
        this.right_bottom.x = event.target.x;
    }

    this.onRightBottomDragMove = (event) => {
        this.right_top.x = event.target.x;
        this.right_center.x = event.target.x;
        this.left_bottom.y = event.target.y;
        this.center_bottom.y = event.target.y;
    }

    this.onCenterBottomDragMove = (event) => {
        this.left_bottom.y = event.target.y;
        this.right_bottom.y = event.target.y;
    }

    this.onLeftBottomDragMove = (event) => {
        this.center_bottom.y = event.target.y;
        this.right_bottom.y = event.target.y;
        this.left_center.x = event.target.x;
        this.left_top.x = event.target.x;
    }

    this.onLeftCenterDragMove = (event) => {
        this.left_bottom.x = event.target.x;
        this.left_top.x = event.target.x;
    }

    this.adjustCenters = () => {
        this.center_top.x = parseInt((this.left_top.x+(this.right_top.x-this.left_top.x)/2));
        this.center_bottom.x = parseInt((this.left_top.x+(this.right_top.x-this.left_top.x)/2));
        this.left_center.y = parseInt((this.left_top.y+(this.left_bottom.y-this.left_top.y)/2));
        this.right_center.y = parseInt((this.right_top.y+(this.right_bottom.y-this.right_top.y)/2));
    }

    this.redraw = () => {
        this.adjustCoordinates();
        this.shape.setOptions(this.options.shapeOptions);
        this.shape.redraw();
        this.setPointsMoveBounds();
    }

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

    this.addEventListener = (eventName,handler) => {
        const listener = EventsManager.subscribe(eventName, (event) => {
            if (event.target.options.id === this.options.id) {
                handler(event)
            }
        });
        this.subscriptions[eventName].push(listener);
        return listener;
    }

    this.removeEventListener = (eventName,listener) => {
        this.subscriptions[eventName].splice(this.subscriptions[eventName].indexOf(listener),1);
        EventsManager.unsubscribe(eventName,listener)
    }

    this.destroy = () => {
        for (let eventName in this.subscriptions) {
            const handlers = this.subscriptions[eventName];
            handlers.forEach(handler => EventsManager.unsubscribe(eventName,handler));
            this.subscriptions[eventName] = [];
        }
        EventsManager.unsubscribe(PointEvents.POINT_DRAG_MOVE,this.onPointDragMove);
        EventsManager.unsubscribe(PointEvents.POINT_DRAG_END,this.onPointDragMove);
        this.shape.destroy();
    }
}

export const ResizeBoxEvents = {
    RESIZE_BOX_RESIZE: "resize"
};

export default ResizeBox;
