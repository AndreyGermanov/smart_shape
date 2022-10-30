import {Menus} from "../../context_menu/src/index.js";
import {del,horizontal,vertical} from "../../assets/graphics.js";
import EventsManager from "../events/EventsManager.js";
import {PointEvents, PointMoveDirections} from "./SmartPoint.js";

/**
 * Helper class that used to manage SmartPoint context menu
 * that appear on right mouse click
 * Should not be instantiated directly. SmartPoint automatically calls it
 * when needed
 * @param point {SmartPoint} The point object to manage menu for
 * @constructor
 */
export default function SmartPointContextMenu(point) {
    /**
     * The point object to manage menu for
     * @type {SmartPoint}
     */
    this.point = point;

    /**
     * @ignore
     * Context menu object instance
     * @type {object}
     */
    this.contextMenu = null;

    /**
     * @ignore
     * Method executed to check if context menu should be initialized
     * or destroyed depending on options of the point
     */
    this.updateContextMenu = () => {
        if (this.contextMenu) {
            this.contextMenu.destroy();
            this.contextMenu = null;
        }
        this.initMenu();
        this.point.contextMenu = this.contextMenu;
    }

    /**
     * @ignore
     * Initializes context menu. Creates context menu and binds event
     * listeners to it
     */
    this.initMenu = () => {
        if (this.point.element) {
            this.contextMenu = Menus.create([
                {
                    id: "i" + this.point.guid + "_drag_horizontal",
                    title: this.point.dragHorizontal ? "Disable move horizontally" : "Enable move horizontally",
                    image: horizontal
                },
                {
                    id: "i" + this.point.guid + "_drag_vertical",
                    title: this.point.dragVertical ? "Disable move vertically" : "Enable move vertically",
                    image: vertical
                }
            ], this.point.element);
            if (this.point.options.canDelete) {
                this.contextMenu.addItem("i" + this.point.guid + "_delete", "Delete point", del);
            }
            this._setEventListeners();
        }
    }

    /**
     * @ignore
     * Method used to set up handler functions for context menu items
     */
    this._setEventListeners = () => {
        this.contextMenu.on("click",(event) => {
            switch (event.itemId) {
                case "i"+point.guid+"_delete":
                    EventsManager.emit(PointEvents.POINT_DELETE_REQUEST,this.point);
                    break;
                case "i"+point.guid+"_drag_horizontal":
                    this.onDragHorizontalClick(event)
                    break;
                case "i"+point.guid+"_drag_vertical":
                    this.onDragVerticalClick(event)
                    break;
            }
        })
    }

    /**
     * @ignore
     * Method runs when select "Move horizontally" from point context menu
     * @param _event
     */
    this.onDragHorizontalClick = (_event) => {
        this.point.dragHorizontal = !this.point.dragHorizontal;
        if (this.point.dragHorizontal) {
            this.point.dragVertical = false;
        }
        this.updatePointDragMode();
    }

    /**
     * @ignore
     * Method runs when select "Move vertically" from point context menu
     * @param _event
     */
    this.onDragVerticalClick = (_event) => {
        this.point.dragVertical = !this.point.dragVertical;
        if (this.point.dragVertical) {
            this.point.dragHorizontal = false;
        }
        this.updatePointDragMode();
    }

    /**
     * @ignore
     * Method updates point movement directions depending on context menu setup
     */
    this.updatePointDragMode = () => {
        this.contextMenu.items.find(item=>item.id==="i"+this.point.guid+"_drag_horizontal").title = "Enable move horizontally";
        this.contextMenu.items.find(item=>item.id==="i"+this.point.guid+"_drag_vertical").title = "Enable move vertically";
        if (this.point.dragHorizontal) {
            this.point.setOptions({moveDirections:[PointMoveDirections.LEFT,PointMoveDirections.RIGHT]})
            this.contextMenu.items.find(item=>item.id==="i"+this.point.guid+"_drag_horizontal").title = "Disable move horizontally";
        } else if (this.point.dragVertical) {
            this.point.setOptions({moveDirections:[PointMoveDirections.TOP,PointMoveDirections.BOTTOM]})
            this.contextMenu.items.find(item=>item.id==="i"+this.point.guid+"_drag_vertical").title = "Disable move vertically";
        } else {
            this.point.setOptions({moveDirections:
                [PointMoveDirections.TOP,PointMoveDirections.BOTTOM,PointMoveDirections.LEFT,PointMoveDirections.RIGHT]}
            )
        }
    }

}
