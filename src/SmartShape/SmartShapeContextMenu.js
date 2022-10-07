import {Menus} from "../../context_menu/src/index.js";
import {getMousePos} from "../events/functions.js";
import {add,del,save,svg,png,copy} from "../../assets/graphics.js";
import {SmartShapeDisplayMode} from "./SmartShape.js";
import {PngExportTypes} from "./SmartShapeDrawHelper.js";

/**
 * Helper class that used to manage SmartShape context menu
 * that appear on right mouse click
 * Should not be instantiated directly. SmartShape automatically calls it
 * when needed
 * @param shape {SmartShape} The shape object to manage menu for
 * @constructor
 */
export default function SmartShapeContextMenu(shape) {

    /**
     * @ignore
     * The shape object to manage menu for
     * @type {SmartShape}
     */
    this.shape = shape;

    /**
     * @ignore
     * Context menu object instance
     * @type {object}
     */
    this.contextMenu = null;

    /**
     * @ignore
     * Method executed to check if context menu should be initialized
     * or destroyed depending on options of the shape
     */
    this.updateContextMenu = () => {
        if (this.contextMenu) {
            this.contextMenu.destroy();
            this.contextMenu = null;
        }
        if (shape.options.hasContextMenu) {
            this.init();
        }
        this.shape.contextMenu = this.contextMenu;
    }

    /**
     * @ignore
     * Initializes context menu. Creates context menu and binds event
     * listeners to it
     */
    this.init = () => {
        if (shape.svg) {
            this.contextMenu = Menus.create([
                {id: "i" + shape.guid + "_clone", title: "Clone", image: copy},
                {id: "i" + shape.guid + "_export_json", title: "Export to JSON", image: save},
                {id: "i" + shape.guid + "_export_svg", title: "Export to SVG", image: svg},
                {id: "i" + shape.guid + "_export_png", title: "Export to PNG", image: png},
                {id: "i" + shape.guid + "_destroy", title: "Destroy", image: del}
            ], shape.svg);
            if (shape.options.canAddPoints) {
                this.contextMenu.addItem("i"+shape.guid+"_add_point", "Add Point", add);
            }
            this.setEventListeners();
        }
    }

    /**
     * @ignore
     * Method used to set up handler functions for context menu items
     */
    this.setEventListeners = () => {
        this.contextMenu.on("click",(event) => {
            switch (event.itemId) {
                case "i"+shape.guid+"_destroy":
                    this.shape.destroy();
                    break
                case "i"+shape.guid+"_add_point":
                    this.onAddPointClick(event);
                    break;
                case "i"+shape.guid+"_clone":
                    this.onCloneClick(event);
                    break;
                case "i"+shape.guid+"_export_json":
                    this.onExportJsonClick(event);
                    break;
                case "i"+shape.guid+"_export_svg":
                    this.onExportSvgClick(event);
                    break;
                case "i"+shape.guid+"_export_png":
                    this.onExportPngClick(event);
                    break;
            }
        })
    }

    /**
     * @ignore
     * Runs when click on "Add Point" menu option
     * @param event {MouseEvent} Event object
     */
    this.onAddPointClick = (event) => {
        if (this.shape.options.maxPoints !== -1 && this.shape.points.length >= this.shape.options.maxPoints) {
            return
        }
        const [x,y] = getMousePos(this.shape.root,event.cursorX,event.cursorY);
        this.shape.addPoint(x,y);
        if (this.shape.options.displayMode === SmartShapeDisplayMode.DEFAULT) {
            this.shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
        }
    }

    /**
     * @ignore
     * Runs when click on "Clone" menu option
     * @param _event {MouseEvent} Event object
     */
    this.onCloneClick = (_event) => {
        const clone = this.shape.clone();
        const pos = clone.getPosition(true);
        clone.moveTo(pos.left+5,pos.top+5);
    }

    /**
     * @ignore
     * Runs when click on "Export to JSON" menu option
     * @param _event {MouseEvent} Event object
     */
    this.onExportJsonClick = (_event) => {
        const jsonString = this.shape.toJSON(true);
        const blob = new Blob([jsonString]);
        this.saveToFile(blob,this.getExportFileName("json"))
    }

    /**
     * @ignore
     * Runs when click on "Export to SVG" menu option
     * @param _event {MouseEvent} Event object
     */
    this.onExportSvgClick = (_event) => {
        const svgString = this.shape.toSvg();
        const blob = new Blob([svgString]);
        this.saveToFile(blob,this.getExportFileName("svg"))
    }

    /**
     * @ignore
     * Runs when click on "Export to PNG" menu option
     * @param _event {MouseEvent} Event object
     */
    this.onExportPngClick = async(_event) => {
        const blob = await this.shape.toPng(PngExportTypes.BLOB);
        this.saveToFile(blob,this.getExportFileName("png"));
    }

    /**
     * @ignore
     * Method used to show "Save file" dialog
     * that saves specified `blob` as a file with name `filename`
     * @param blob {object} BLOB object with file data
     * @param filename {string} Name of file to save to
     */
    this.saveToFile = (blob,filename) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.download = filename;
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

    }

    /**
     * @ignore
     * Method used to generate filename based on shape ID and specified file extension
     * @param extension {string} Extension of file
     * @returns {string} Generated file name
     */
    this.getExportFileName = (extension) => {
        return (this.shape.options.id ? this.shape.options.id : "shape")+"."+extension;
    }
}
