import {Menus} from "../../context_menu/src/index.js";
import {getMousePos} from "../events/functions.js";
import {add,del,save,svg,png,copy,group,ungroup,move_to_top,move_to_bottom,horizontal,vertical,to_path,to_shapes} from "../../assets/graphics.js";
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
        if (this.shape.options.hasContextMenu && !this.contextMenu) {
            this.init();
        } else if (!this.shape.options.hasContextMenu) {
            this.contextMenu = null;
        }
        this.shape.contextMenu = this.contextMenu;
        if (this.contextMenu) {
            const itemsToAdd = this.getMenuItems();
            for (let itemToAdd of itemsToAdd) {
                if (!this.contextMenu.items.find(item => item.id === itemToAdd.id)) {
                    this.contextMenu.addItem(itemToAdd.id,itemToAdd.title,itemToAdd.image);
                }
            }
        }
    }

    /**
     * @ignore
     * Initializes context menu. Creates context menu and binds event
     * listeners to it
     */
    this.init = () => {
        if (shape.svg) {
            this.contextMenu = Menus.create([], shape.svg,"contextmenu", {customHandler:()=> {return }});
            if (shape.options.canAddPoints) {
                this.contextMenu.addItem("i"+shape.guid+"_add_point", "Add Point", add);
            }
            this.displayGroupItems();
            this.setEventListeners();
        }
    }

    this.getMenuItems = () => {
        const items = [
            {id: "i" + shape.guid + "_move_to_top", title: "Move to Top", image: move_to_top },
            {id: "i" + shape.guid + "_move_to_bottom", title: "Move to Bottom", image: move_to_bottom },
            {id: "i" + shape.guid + "_flip_horizontal", title: "Flip Horizontal", image: horizontal },
            {id: "i" + shape.guid + "_flip_vertical", title: "Flip Vertical", image: vertical },
            {id: "i" + shape.guid + "_clone", title: "Clone", image: copy},
            {id: "i" + shape.guid + "_export_json", title: "Export to JSON", image: save},
            {id: "i" + shape.guid + "_export_svg", title: "Export to SVG", image: svg},
            {id: "i" + shape.guid + "_export_png", title: "Export to PNG", image: png},
            {id: "i" + shape.guid + "_destroy", title: "Destroy", image: del}
        ];
        if (shape.options.canAddPoints) {
            items.push({id:"i"+shape.guid+"_add_point", title:"Add Point", image:add});
        }
        return items;
    }

    /**
     * @ignore
     * Method used to set up handler functions for context menu items
     */
    this.setEventListeners = () => {
        this.setOnItemClickListener();
        this.contextMenu.on("show", () => {
            this.displayGroupItems();
        })
    }

    /**
     * @ignore
     * Method used to react on user click events on menu items
     */
    this.setOnItemClickListener = () => {
        let destShape,parent
        this.contextMenu.on("click",(event) => {
            switch (event.itemId) {
                case "i"+this.shape.guid+"_destroy":
                    this.onDestroyClick(event);
                    break
                case "i"+this.shape.guid+"_add_point":
                    this.onAddPointClick(event);
                    break;
                case "i"+this.shape.guid+"_clone":
                    this.onCloneClick(event);
                    break;
                case "i"+this.shape.guid+"_export_json":
                    this.onExportJsonClick(event);
                    break;
                case "i"+this.shape.guid+"_export_svg":
                    this.onExportSvgClick(event);
                    break;
                case "i"+this.shape.guid+"_export_png":
                    this.onExportPngClick(event);
                    break;
                case "i"+this.shape.guid+"_group":
                    parent = this.shape.getRootParent();
                    destShape =  parent || this.shape;
                    destShape.setOptions({groupChildShapes:true});
                    destShape.switchDisplayMode(SmartShapeDisplayMode.DEFAULT);
                    break;
                case "i"+this.shape.guid+"_ungroup":
                    parent = this.shape.getRootParent();
                    destShape = parent || this.shape;
                    destShape.setOptions({groupChildShapes:false,displayAsPath:false});
                    destShape.switchDisplayMode(SmartShapeDisplayMode.DEFAULT);
                    destShape.getChildren(true).forEach(child=>child.redraw())
                    break;
                case "i"+this.shape.guid+"_topath":
                    parent = this.shape.getRootParent();
                    destShape =  parent || this.shape;
                    destShape.setOptions({groupChildShapes:true,displayAsPath:true});
                    destShape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
                    destShape.getChildren(true).forEach(child=>child.redraw())
                    break;
                case "i"+this.shape.guid+"_toshapes":
                    parent = this.shape.getRootParent();
                    destShape = parent || this.shape;
                    destShape.setOptions({displayAsPath:false});
                    destShape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
                    destShape.getChildren(true).forEach(child=>child.redraw())
                    break;
                case "i"+this.shape.guid+"_move_to_top":
                    this.onMoveToTopClick(event)
                    break;
                case "i"+this.shape.guid+"_move_to_bottom":
                    this.onMoveToBottomClick(event)
                    break;
                case "i"+this.shape.guid+"_flip_horizontal":
                    this.onFlipHorizontalClick(event)
                    break;
                case "i"+this.shape.guid+"_flip_vertical":
                    this.onFlipVerticalClick(event)
                    break;
            }
        })
    }

    /**
     * @ignore
     * Method used to display Group/Ungroup menu item
     * depending on number of children of current shape
     * and depending on status of `groupChildShapes` option
     */
    this.displayGroupItems = () => {
        let destShape = this.shape.getRootParent() ? this.shape.getRootParent() : this.shape;

        if (!destShape.getChildren().length) {
            this.contextMenu.removeItem("i"+this.shape.guid+"_group");
            this.contextMenu.removeItem("i"+this.shape.guid+"_ungroup");
            this.contextMenu.removeItem("i"+this.shape.guid+"_topath");
            this.contextMenu.removeItem("i"+this.shape.guid+"_toshapes");
            return
        }
        if (destShape.options.groupChildShapes) {
            if (!this.contextMenu.items.find(item => item.id === "i"+this.shape.guid+"_ungroup")) {
                this.contextMenu.addItem("i" + this.shape.guid + "_ungroup", "Ungroup", ungroup);
                this.contextMenu.removeItem("i"+this.shape.guid+"_group");
            }
        } else {
            if (!this.contextMenu.items.find(item => item.id === "i"+this.shape.guid+"_group")) {
                this.contextMenu.removeItem("i"+this.shape.guid+"_ungroup");
                this.contextMenu.addItem("i" + this.shape.guid + "_group", "Group", group);
            }
        }
        if (destShape.options.displayAsPath) {
            if (!this.contextMenu.items.find(item => item.id === "i"+this.shape.guid+"_toshapes")) {
                this.contextMenu.addItem("i" + this.shape.guid + "_toshapes", "Convert to shapes", to_shapes);
                this.contextMenu.removeItem("i"+this.shape.guid+"_topath");
            }
        } else {
            if (!this.contextMenu.items.find(item => item.id === "i"+this.shape.guid+"_topath")) {
                this.contextMenu.addItem("i" + this.shape.guid + "_topath", "Convert to path", to_path);
                this.contextMenu.removeItem("i"+this.shape.guid+"_toshapes");
            }
        }
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
        if (this.shape.points.length < 2) {
            this.shape.addPoint(x, y);
        } else {
            const [point1,point2] = this.shape.getClosestLine(x,y);
            if (this.shape.getPointIndex(point2) === 0) {
                this.shape.addPoint(x,y)
            } else {
                let point = point1;
                if (this.shape.getPointIndex(point2) > this.shape.getPointIndex(point1)) {
                    point = point2;
                }
                this.shape.insertPoint(x, y, point)
            }
        }
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
        let destShape = this.shape;
        const parent = destShape.getRootParent();
        if (parent && parent.options.groupChildShapes) {
            destShape = parent;
        }
        const clone = destShape.clone({},destShape.options.groupChildShapes);
        const pos = clone.getPosition(true);
        clone.moveTo(pos.left+5,pos.top+5);
        SmartShapeManager.activateShape(clone);
    }

    /**
     * @ignore
     * Runs when click on "Export to JSON" menu option
     * @param _event {MouseEvent} Event object
     */
    this.onExportJsonClick = (_event) => {
        let destShape = this.shape;
        const parent = destShape.getRootParent();
        if (parent && parent.options.groupChildShapes) {
            destShape = parent;
        }
        const jsonString = destShape.toJSON(destShape.options.groupChildShapes);
        const blob = new Blob([jsonString]);
        this.saveToFile(blob,this.getExportFileName("json"))
    }

    /**
     * @ignore
     * Runs when click on "Export to SVG" menu option
     * @param _event {MouseEvent} Event object
     */
    this.onExportSvgClick = (_event) => {
        let destShape = this.shape;
        const parent = destShape.getRootParent();
        if (parent && parent.options.groupChildShapes) {
            destShape = parent;
        }
        const svgString = destShape.toSvg();
        const blob = new Blob([svgString]);
        this.saveToFile(blob,this.getExportFileName("svg"))
    }

    /**
     * @ignore
     * Runs when click on "Export to PNG" menu option
     * @param _event {MouseEvent} Event object
     */
    this.onExportPngClick = async(_event) => {
        let destShape = this.shape;
        const parent = destShape.getRootParent();
        if (parent && parent.options.groupChildShapes) {
            destShape = parent;
        }
        const blob = await destShape.toPng(PngExportTypes.BLOB);
        this.saveToFile(blob,this.getExportFileName("png"));
    }

    /**
     * @ignore
     * Runs when click on "Destroy" menu option
     * @param _event {MouseEvent} Event object
     */
    this.onDestroyClick = (_event) => {
        const parent = this.shape.getParent();
        if (parent && parent.options.groupChildShapes) {
            parent.destroy();
        } else {
            this.shape.destroy();
        }
    }

    /**
     * @ignore
     * Runs when click on "Move to top" menu option
     * @param _event {MouseEvent} Event object
     */
    this.onMoveToTopClick = (_event) => {
        const parent = this.shape.getParent();
        if (parent && parent.options.groupChildShapes) {
            parent.moveToTop();
        } else {
            this.shape.moveToTop();
        }
    }

    /**
     * @ignore
     * Runs when click on "Move to bottom" menu option
     * @param _event {MouseEvent} Event object
     */
    this.onMoveToBottomClick = (_event) => {
        const parent = this.shape.getParent();
        if (parent && parent.options.groupChildShapes) {
            parent.moveToBottom();
        } else {
            this.shape.moveToBottom();
        }
    }

    /**
     * @ignore
     * Runs when click on "Flip Horizontal" menu option
     * @param _event {MouseEvent} Event object
     */
    this.onFlipHorizontalClick = (_event) => {
        const parent = this.shape.getParent();
        if (parent && parent.options.groupChildShapes) {
            parent.flip(true,false);
        } else {
            this.shape.flip(true,false);
            this.shape.redraw();
        }
    }

    /**
     * @ignore
     * Runs when click on "Flip Vertical" menu option
     * @param _event {MouseEvent} Event object
     */
    this.onFlipVerticalClick = (_event) => {
        const parent = this.shape.getParent();
        if (parent && parent.options.groupChildShapes) {
            parent.flip(false,true);
            parent.redraw();
            parent.redraw();
        } else {
            this.shape.flip(false,true);
            this.shape.redraw();
        }
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
        const parent = this.shape.getRootParent();
        const destShape = parent || this.shape;
        return (destShape.options.id ? destShape.options.id : "shape")+"."+extension;
    }

    /**
     * @ignore
     * Method used to remove all event listeners, added to this object
     */
    this.removeMenuEventListeners = () => {
        this.contextMenu.removeEventListener("show", this.onShowListener);
    }

    /**
     * @ignore
     * Method used to destroy context menu and all dependent functions
     */
    this.destroyContextMenu = () => {
        this.removeMenuEventListeners();
        this.contextMenu.destroy();
    }
}
