import SmartShapeDrawHelper from "./SmartShapeDrawHelper.js";
import {applyAspectRatio, flipPoint, getRotatedCoords} from "../utils/geometry.js";
import {abs} from "../utils/index.js";
import ResizeBox from "../ResizeBox/ResizeBox.js";
import RotateBox from "../RotateBox/RotateBox.js";

/**
 * Helper class that contains all shape transformation features.
 * Instantiated and used internally by SmartShape
 * @param shape
 * @constructor
 */
export default function SmartShapeTransformer(shape) {

    this.shape = shape;

    /**
     * @ignore
     * Moves shape to specific position. It only changes coordinates of points, but do not
     * redraw the shape on new position. So, you need to call `redraw` yourself after move.
     * @param x {number} new X coordinate
     * @param y {number} new Y coordinate
     * @param redraw {boolean} should the function redraw the shape after move. True by default
     * @param fast {boolean} if true, then only change shape dimensions without recalculate points
     */
    this.moveTo = (x,y,redraw= true,respectBounds=true,fast=false) => {
        const bounds = this.shape.getBounds();
        const pos = this.shape.getPosition(this.shape.options.groupChildShapes);
        let newX = x;
        let newY = y;
        if (respectBounds) {
            newX = x + pos.width > bounds.right ? bounds.right - pos.width : x;
            newY = y + pos.height > bounds.bottom ? bounds.bottom - pos.height : y;
        }
        this.moveBy(newX-pos.left,newY-pos.top, redraw, fast);
    }

    /**
     * @ignore
     * Moves shape by specified number of pixels by X and Y.
     * @param stepX {number} number of pixels to move horizontally
     * @param stepY {number} number of pixes to move vertically
     * @param redraw {boolean} should the function redraw the shape after move. True by default
     * @param fast {boolean} if true, then only change shape dimensions without recalculate points
     */
    this.moveBy = (stepX, stepY,redraw=true,fast=false) => {
        for (let index in this.shape.points) {
            this.shape.points[index].x += stepX;
            this.shape.points[index].y += stepY;
            if (!this.shape.options.simpleMode && redraw && typeof (this.shape.points[index].redraw) === "function") {
                this.shape.points[index].redraw();
            }
        }
        this.shape.options.offsetX += stepX;
        this.shape.options.offsetY += stepY;
        this.shape.left += stepX;
        this.shape.top += stepY;
        this.shape.right += stepX;
        this.shape.bottom += stepY;
        this.shape.width = this.shape.right - this.shape.left;
        this.shape.height = this.shape.bottom - this.shape.top;
        const children = this.shape.getChildren(true)
        if (redraw) {
            if (!fast) {
                this.shape.redraw();
            } else if (this.shape.svg) {
                this.shape.svg.style.left = this.shape.left + "px";
                this.shape.svg.style.top = this.shape.top + "px";
            }
        }
        if (children.length && this.shape.options.groupChildShapes) {
            children.forEach(child => child.moveBy(stepX,stepY,redraw,fast))
        }
        if (fast && !this.shape.getParent()) {
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
        const bounds = this.shape.getBounds();
        this.shape.calcPosition();
        if (!width && !height) {
            return null;
        }
        const pos = this.shape.getPosition(includeChildren || this.shape.options.groupChildShapes);
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
        this.shape.scaleBy(scaleX,scaleY,includeChildren);
    }

    /**
     * Method used to scale the shape by specified ratio by X and Y
     * @param scaleX {number} Horizontal scale ratio
     * @param scaleY {number} Vertical scale ratio
     * @param includeChildren {boolean} If true, then children of this shape scaled with it, if not specified
     * then it determined by the `groupChildShapes` option. if children of shape grouped, then scaled together
     * with it
     */
    this.scaleBy = (scaleX=null,scaleY= null,includeChildren=null) => {
        if (scaleX === 1 && scaleY === 1) {
            return
        }
        const pos = this.shape.getPosition(includeChildren || this.shape.options.groupChildShapes);
        this.shape.points.forEach(point => {
            point.x = (point.x-pos.left)*scaleX+pos.left;
            point.y = (point.y-pos.top)*scaleY+pos.top
        });
        this.shape.options.scaleFactorX *= scaleX;
        this.shape.options.scaleFactorY *= scaleY;
        if (this.shape.options.groupChildShapes || includeChildren) {
            this.shape.getChildren(true).forEach(child => {
                child.points.forEach(point => {
                    point.x = (point.x - pos.left) * scaleX + pos.left;
                    point.y = (point.y - pos.top) * scaleY + pos.top
                });
                child.options.scaleFactorX *= scaleX;
                child.options.scaleFactorY *= scaleY;
                child.calcPosition();
            })
        }
        this.shape.calcPosition();
    }

    /**
     * Method used to zoom shape by specified level
     * @param level {number} Zoom level. Can be any positive number. If number is greater than 1,
     * then it increases the size of shape, if it between 0 and 1, then it decreases the shape.
     */
    this.zoomBy = (level) => {
        this.shape.options.zoomLevel *= level;
        this.scaleBy(level,level);
        if (this.shape.options.groupChildShapes) {
            this.shape.getChildren(true).forEach(child => child.options.zoomLevel *= level);
        }
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
        if (this.shape.options.minWidth !== -1 && width < this.shape.options.minWidth) {
            width = this.shape.options.minWidth;
        }
        if (this.shape.options.minWidth !== -1 && height < this.shape.options.minHeight) {
            height = this.shape.options.minHeight;
        }
        if (this.shape.options.minWidth !== -1 && width > this.shape.options.maxWidth) {
            width = this.shape.options.maxWidth;
        }
        if (this.shape.options.minWidth !== -1 && height > this.shape.options.maxHeight) {
            height = this.shape.options.maxHeight;
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
        this.shape.calcPosition();
        const pos = this.shape.getPosition(this.shape.options.groupChildShapes);
        [centerX, centerY] = this.getRotateCenter(centerX,centerY);
        if (checkBounds && (!this.shape.isInBounds(...getRotatedCoords(angle,pos.left,pos.top,centerX,centerY)) ||
            !this.shape.isInBounds(...getRotatedCoords(angle,pos.right,pos.top,centerX,centerY)) ||
            !this.shape.isInBounds(...getRotatedCoords(angle,pos.left,pos.bottom,centerX,centerY)) ||
            !this.shape.isInBounds(...getRotatedCoords(angle,pos.right,pos.bottom,centerX,centerY)))) {
            return
        }
        this.shape.points.forEach(point => {
            if (typeof(point.rotateBy) === "function") {
                point.rotateBy(angle, centerX, centerY)
            } else {
                [point.x,point.y] = getRotatedCoords(angle, point.x,point.y, centerX,centerY)
            }
        });
        this.shape.options.rotateAngle += angle;
        if (this.shape.options.groupChildShapes) {
            this.shape.getChildren(true).forEach(child=>{
                child.points.forEach(point => {
                    if (typeof(point.rotateBy) === "function") {
                        point.rotateBy(angle, centerX, centerY)
                    } else {
                        [point.x,point.y] = getRotatedCoords(angle, point.x,point.y, centerX,centerY)
                    }
                })
            })
        }
    }

    this.getRotateCenter = (centerX, centerY) => {
        const parent = this.shape.getRootParent(true);
        let shapeCenterX,shapeCenterY
        if (parent && parent.options.groupChildShapes) {
            [shapeCenterX,shapeCenterY] = parent.getCenter(parent.options.groupChildShapes);
        } else {
            [shapeCenterX,shapeCenterY] = this.shape.getCenter(this.shape.options.groupChildShapes)
        }
        if (this.shape.initCenter && (!centerX && !centerY)) {
            [centerX,centerY] = this.shape.initCenter;
        }
        if (!centerX) {
            centerX = shapeCenterX;
        }
        if (!centerY) {
            centerY = shapeCenterY
        }
        return [centerX, centerY];
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
        includeChildren = includeChildren || this.shape.options.groupChildShapes;
        this.shape.calcPosition()
        const pos = this.shape.getPosition(includeChildren);
        this.shape.points.forEach(point=>this.flipPoint(point,byX,byY,pos));
        if (byX) {
            this.shape.options.flippedX = !this.shape.options.flippedX;
        }
        if (byY) {
            this.shape.options.flippedY = !this.shape.options.flippedY;
        }
        this.flipChildren(byX, byY, pos, includeChildren);
    }

    this.flipChildren = (byX, byY, pos, includeChildren) => {
        let children = includeChildren ? this.shape.getChildren(true) : null;
        children && children.forEach(child=>{
            if (byX) {
                child.options.flippedX = !child.options.flippedX;
                child.options.flippedY = !child.options.flippedY;
            }
            child.shape.points.forEach(point => child.shape.flipPoint(point,byX,byY,pos))
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
     * @ignore
     * Used to setup [ResizeBox](#ResizeBox) around shape if shape scaling is enabled
     */
    this.setupResizeBox = () => {
        if (!this.shape.points.length) {
            return null;
        }
        const bounds = this.getResizeBoxBounds();
        this.shape.resizeBox = new ResizeBox().init(this.shape.root,bounds.left,bounds.top,bounds.width,bounds.height,{
            zIndex: this.shape.options.zIndex+1,
            id: this.shape.options.id+"_resizebox",
            shapeOptions:{
                canDragShape: false,
                visible: this.shape.options.visible,
                managed: false,
                hasContextMenu:false
            }
        })
        this.shape.resizeBox.redraw();
        this.shape.eventListener.addResizeEventListener();
    }

    /**
     * @ignore
     * Used to setup [Rotate](#RotateBox) around shape if shape rotation is enabled
     */
    this.setupRotateBox = () => {
        if (!this.shape.points.length) {
            return null;
        }
        const bounds = this.getResizeBoxBounds();
        this.shape.rotateBox = new RotateBox().init(this.shape.root,bounds.left,bounds.top,bounds.width,bounds.height,{
            zIndex: this.shape.options.zIndex+1,
            id: this.shape.options.id+"_rotatebox",
            shapeOptions:{
                canDragShape: false,
                visible: this.shape.options.visible,
                managed: false,
                hasContextMenu: false
            }
        })
        this.shape.rotateBox.redraw();
        this.shape.eventListener.addRotateEventListener();
    }

    /**
     * @ignore
     * Returns dimensions of resize box around shape according to shape dimensions
     * @returns {{top: number, left: number, bottom: *, width: *, right: *, height: *}}
     */
    this.getResizeBoxBounds = () => {
        let pos = this.shape.getPosition(this.shape.options.groupChildShapes);
        const parent = this.shape.getRootParent(true);
        if (parent && parent.options.groupChildShapes) {
            if (parent.options.displayAsPath) {
                pos = parent.shape.getPosition(parent.options.groupChildShapes);
            } else {
                pos = this.shape.getPosition(this.options.groupChildShapes);
            }
        }
        const [pointWidth,pointHeight] = this.getMaxPointSize();
        return {
            left: pos.left - pointWidth,
            right: pos.right + pointWidth,
            top: pos.top - pointHeight,
            bottom: pos.bottom + pointHeight,
            width: pos.width + (pointWidth)*2,
            height: pos.height + (pointHeight)*2,
        }
    }

    /**
     * @ignore
     * Method finds and return the size of the biggest point in this shape
     * @returns {array} [width,height]
     */
    this.getMaxPointSize = () => {
        if (!this.shape.points.length) {
            return [0,0];
        }
        const pointWidth = this.shape.points.map(point=>point.options ? point.options.width : 0).reduce((w1,w2) => Math.max(w1,w2));
        const pointHeight = this.shape.points.map(point=>point.options? point.options.height : 0).reduce((h1,h2) => Math.max(h1,h2));
        return [pointWidth,pointHeight];
    }
}
