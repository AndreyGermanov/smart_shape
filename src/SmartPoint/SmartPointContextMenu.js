import {Menus} from "../../context_menu/src/index.js";
import {del} from "../../assets/graphics.js";
import EventsManager from "../events/EventsManager.js";
import {PointEvents} from "./SmartPoint.js";

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
        if (this.point.options.canDelete) {
            this.init();
        }
        this.point.contextMenu = this.contextMenu;
    }

    /**
     * @ignore
     * Initializes context menu. Creates context menu and binds event
     * listeners to it
     */
    this.init = () => {
        if (this.point.element) {
            this.contextMenu = Menus.create([
                {id: "i" + this.point.guid + "_delete", title: "Delete point", image: del},
            ], this.point.element);
            this._setEventListeners();
        }
    }

    /**
     * @ignore
     * Method used to set up handler functions for context menu items
     */
    this._setEventListeners = () => {
        this.contextMenu.on("click",(event) => {
            if (event.itemId === "i"+point.guid+"_delete") {
                EventsManager.emit(PointEvents.POINT_DELETE_REQUEST,this.point);
            }
        })
    }
}
