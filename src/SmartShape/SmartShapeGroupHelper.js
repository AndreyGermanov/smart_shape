import SmartShapeManager from "../SmartShapeManager/SmartShapeManager.js";
import {EventsManager, ShapeEvents} from "../index.js";
/**
 * Class used as an extension to [SmartShape](#SmartShape) class to add
 * shape groups functionality. The feature works the following way:
 *
 * Each shape can have a children shapes. If shape has children, then
 * all actions, that user do with the shape propagated to all children:
 * when user drags the shape, all children draged with it, if user resizes the shape,
 * then all children resized with it. If user rotates the shape, then all shapes
 * rotates with it.
 *
 * You should not use this class directly. SmartShape class instantiates it.
 * When init, this class extends provided SmartShape object by adding all it's methods to it
 * and then you can use them right from your [SmartShape](#SmartShape) instance.
 * For example, methods `addChild` and `removeChild` declared here can be used
 * right from SmartShape object, e.g. `shape.addChild(child)`, `shape.removeChild(child)`
 * and all other methods, declared here.
 * @param shape {SmartShape} SmartShape object to extend
 * @constructor
 */
function SmartShapeGroupHelper(shape) {

    /**
     * SmartShape object to extend
     * @type {SmartShape}
     */
    this.shape = shape;

    /**
     * @ignore
     * Method used to add specified shape as a child of current shape
     * @param child {SmartShape} Shape to add
     */
    this.addChild = (child,emitEvent=true) => {
        if (!this.shouldAddChild(child)) {
            return
        }
        if (this.shape.options.displayMode !== child.options.displayMode) {
            if (child.svg) {
                child.switchDisplayMode(this.shape.options.displayMode);
            } else {
                child.options.displayMode = shape.options.displayMode;
            }
        }
        this.shape.children.push(child);
        if (emitEvent) {
            EventsManager.emit(ShapeEvents.SHAPE_ADD_CHILD, this.shape, {child});
        }
    }

    /**
     * @ignore
     * Method used to add specified children to current shape
     * @param children {array} Array of [SmartShape][#SmartShape) objects
     */
    this.addChildren = (children=[]) => {
        children.forEach(child => {
            this.addChild(child,false)
        })
        EventsManager.emit(ShapeEvents.SHAPE_ADD_CHILD, this.shape, {children});
    }

    /**
     * @ignore
     * Method used to remove specified shape from children list of current shape
     * @param child {SmartShape} SmartShape object to add
     */
    this.removeChild = (child) => {
        this.shape.children.splice(this.shape.children.indexOf(child),1);
        EventsManager.emit(ShapeEvents.SHAPE_REMOVE_CHILD,this.shape,{child});
    }

    /**
     * @ignore
     * Method removes all children of current shape
     * @param all {boolean} If true, then it removes all children hierarchically
     */
    this.removeAllChildren = (all=false) => {
        while (this.getChildren(all).length) {
            this.removeChild(this.getChildren(all)[0])
        }
    }

    /**
     * @ignore
     * Method returns array of children of current shape
     * @param all {boolean} If true, then it returns deep list, including all children of each children of this shape
     * @returns {array} Array of [SmartShape](#SmartShape) objects
     */
    this.getChildren = (all=false) => {
        if (!all) {
            return this.shape.children;
        }
        const result = []
        result.push(...this.shape.children)
        for (let child of result) {
            result.push(...child.getChildren())
        }
        return result;
    }

    /**
     * @ignore
     * Method returns if specified shape is child of current shape
     * @param child {SmartShape} Shape to check
     * @param all {boolean} Should check include subchildren
     */
    this.hasChild = (child,all=false) => {
        return child.guid !== this.guid && !!this.getChildren(all).find(item => item.guid === child.guid)
    }

    /**
     * @ignore
     * Internal method used to determine is it possible to add specified child
     * to current shape
     * @param child {SmartShape} Checked SmartShape object
     * @returns {boolean} True if possible or false otherwise
     */
    this.shouldAddChild = (child) => {
        if (!child || typeof(child) !== "object" || typeof(child.getChildren) === "undefined") {
            return false;
        }
        if (this.shape.children.indexOf(child) !== -1) {
            return false;
        }
        if (child === this.shape) {
            return false;
        }
        if (child.getChildren().indexOf(this.shape) !== -1) {
            return false;
        }
        if (child.getParent()) {
            return false;
        }
        const parents = this.getParentsList();
        return parents.indexOf(child) === -1;
    }

    /**
     * @ignore
     * Method returns parent of current shape or null
     * @returns {SmartShape|null}
     */
    this.getParent = () => {
        const shapes = SmartShapeManager.getShapes();
        for (let item of shapes) {
            if (item.getChildren().indexOf(this.shape) !== -1) {
                return item
            }
        }
        return null;
    }

    /**
     * @ignore
     * Method returns top parent of current shape
     * @returns {SmartShape|null} Parent shape or null
     */
    this.getRootParent = (groupChildShapes= null) => {
        let parents = this.getParentsList();
        if (!parents.length) {
            return null;
        }
        if (groupChildShapes !== null) {
            parents = parents.filter(parent => parent.options.groupChildShapes === groupChildShapes)
        }
        return parents[parents.length-1];
    }

    /**
     * @ignore
     * Method returns a list of parents of current shape ordered from nearest to root
     * @param plist {array} Temporary list of parents from previous recursive call
     * @returns {array} Array of [SmartShape](#SmartShape) objects
     */
    this.getParentsList = (plist=[]) => {
        const parent = this.getParent();
        if (parent == null) {
            return plist;
        }
        plist.push(parent);
        return parent.getParentsList(plist)
    }

    /**
     * @ignore
     * Method overrides SmartShape's getPosition method to return position
     * of all group if forGroup parameter is set
     * @returns {object} Position object {left,top,right,bottom,width,height}
     */
    this.getPosition = () => {
        let children = this.getChildren(true);
        children.push(this.shape);
        children = children.filter(child=>child.points.length);
        if (!children.length) {
            return {left:0,right:0,top:0,bottom:0};
        }
        const pos = {
            left: children.map(item => item.left).reduce((minLeft,left) => left < minLeft ? left : minLeft),
            top: children.map(item => item.top).reduce((minTop,top) => top < minTop ? top : minTop),
            right: children.map(item => item.right).reduce((maxRight,right) => right > maxRight ? right : maxRight),
            bottom: children.map(item => item.bottom).reduce((maxBottom,bottom) => bottom > maxBottom ? bottom : maxBottom)
        }
        pos.width = Math.abs(pos.right-pos.left) || 1;
        pos.height = Math.abs(pos.bottom-pos.top) || 1;
        return pos;
    }
}

export default SmartShapeGroupHelper;
