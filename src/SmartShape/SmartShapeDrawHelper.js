import {EventsManager, ShapeEvents,SmartShapeManager,SmartShapeDisplayMode} from "../index.js";
import {blobToDataURL, dataURLtoBlob, notNull, timeout} from "../utils";
import {applyAspectRatio} from "../utils/geometry.js";

/**
 * Internal helper class that used to draw shape.
 * Should not be used directly. SmartShape objects execute methods
 * of this object when need to draw shapes.
 * @constructor
 */
function SmartShapeDrawHelper() {

    /**
     * @ignore
     * Method that implements drawing for provided shape.
     * @param shape {SmartShape} Shape object to draw
     */
    this.draw = async (shape) => {
        const parent = shape.getParent();
        await this.initSvg(shape,parent);
        if (shape.points.length < 1 && typeof(shape.options.svgLoadFunc) !== "function") {
            return
        }
        if (shape.options.hasContextMenu && shape.shapeMenu && !shape.shapeMenu.contextMenu) {
            shape.shapeMenu.updateContextMenu();
        }
        this.updateOptions(shape);
        this.drawShape(shape,parent);
        EventsManager.emit("show_finish",shape);
    }

    this.initSvg = async (shape,parent) => {
        if (!parent || parent.guid === shape.guid || !parent.options.groupChildShapes) {
            this.initRootSvg(shape)
        } else {
            this.clearSvg(shape)
        }
    }

    this.initRootSvg = (shape) => {
        if (shape.points.length || typeof(shape.options.svgLoadFunc) === "function") {
            if (shape.svg) {
                return
            }
            shape.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            shape.svg.ondragstart = function () {
                return false;
            }
            if (shape.options.visible) {
                EventsManager.emit(ShapeEvents.SHAPE_SHOW, shape);
            }
            shape.eventListener.setSvgEventListeners();
            shape.svg.id = shape.options.id;
            shape.svg.setAttribute("guid", shape.guid);
            shape.root.appendChild(shape.svg);
        } else {
            try {
                shape.eventListener.removeSvgEventListeners();
                shape.svg.innerHTML = "";
            } catch (err) {
            }
        }
        if (shape.svg && typeof(shape.svg.appendChild) === "function" && typeof(shape.options.svgLoadFunc) !== "function") {
            const defs = document.createElementNS(shape.svg.namespaceURI, "defs");
            shape.svg.appendChild(defs);
        }
    }

    this.clearSvg = (shape) => {
        shape.svg = null;
        const svg = document.querySelector("svg[guid='"+shape.guid+"']");
        if (svg) {
            svg.parentNode.removeChild(svg);
        }
        shape.resizeBox && shape.resizeBox.hide();
        shape.rotateBox && shape.rotateBox.hide();
    }

    /**
     * @ignore
     * Method updates options of shape and it points
     * (including child or other associated shapes)
     * on drawing phase
     * @param shape {SmartShape} Shape object
     */
    this.updateOptions = (shape) => {
        shape.calcPosition();
        const parent = shape.getRootParent();
        this.updateShapeSvgOptions(shape,parent);
        if (!parent || !parent.options.displayAsPath) {
            this.setupShapeFill(shape);
            this.createSVGFilters(shape);
            shape.options.canScale && this.redrawResizeBox(parent && parent.options.groupChildShapes ? parent : shape);
            shape.options.canRotate && this.redrawRotateBox(parent && parent.options.groupChildShapes ? parent : shape);
        }
        if (shape.options.pointOptions.canDrag) {
            this.updatePoints(shape, parent);
        }
    }

    this.updateShapeSvgOptions = (shape,parent) => {
        if (shape.svg && (!parent || !parent.options.groupChildShapes) && typeof(shape.svg.appendChild) === "function") {
            this.updateVisible(shape);
            shape.svg.id = shape.options.id;
            shape.svg.setAttribute("guid", shape.guid);
            let pos = shape.getPosition(shape.options.groupChildShapes);
            shape.svg.style.position = 'absolute';
            shape.svg.style.cursor = 'default';
            shape.svg.style.left = pos.left + "px";
            shape.svg.style.top = pos.top + "px";
            shape.svg.setAttribute("width", pos.width);
            shape.svg.setAttribute("height", pos.height);
            shape.svg.style.width = pos.width + "px";
            shape.svg.style.height = pos.height + "px";
            shape.svg.style.zIndex = shape.options.zIndex;
        } else if (parent && parent.svg) {
            const polygon = parent.svg.querySelector("#p"+shape.guid+"_polygon");
            if (polygon) {
                polygon.style.zIndex = shape.options.zIndex;
            }
        }
    }

    this.updateVisible = (shape) => {
        if (typeof (shape.options.visible) !== "undefined") {
            if (shape.svg.style.display !== shape.options.visible) {
                if (shape.options.visible) {
                    EventsManager.emit(ShapeEvents.SHAPE_SHOW, shape);
                    shape.getChildren(true).forEach(child => EventsManager.emit(ShapeEvents.SHAPE_SHOW,child))
                } else {
                    EventsManager.emit(ShapeEvents.SHAPE_HIDE, shape);
                    shape.getChildren(true).forEach(child => EventsManager.emit(ShapeEvents.SHAPE_HIDE,child));
                }
            }
            shape.svg.style.display = shape.options.visible ? '' : 'none';
        }
    }

    this.drawShape = async(shape,parent) => {
        if (!parent || !parent.options.displayAsPath) {
            if (typeof(shape.options.svgLoadFunc) === "function") {
                await this.loadExternalSvg(shape);
            } else {
                this.drawPolygon(shape);
            }
            if (shape.svg && SmartShapeManager.isNormalShape(shape)) {
                this.setupZIndex(shape);
            }
            return
        }
        this.draw(parent);
    }

    /**
     * @ignore
     * Method updates points after redraw shape
     * @param shape {SmartShape} Shape that need to update
     * @param parent {SmartShape} Root parent of this shape or null
     */
    this.updatePoints = async(shape,parent) => {
        if (shape.points[0] && !shape.points[0].element) {
            await timeout(1);
        }
        let shp = parent || shape;
        shape.points.filter(point => point.element).forEach(point => {
            if (point.element.parentNode !== shape.root) {
                shape.root.appendChild(point.element);
            }
            point.options.zIndex = shape.options.zIndex + 2;
            if (!shape.options.visible && !point.options.forceDisplay || typeof(shape.options.svgLoadFunc) === "function") {
                point.options.visible = false;
            } else if (shape.options.displayMode !== SmartShapeDisplayMode.DEFAULT) {
                point.options.visible = true;
            }
            point.redraw();
            if (SmartShapeManager.isNormalShape(shp)) {
                if ((shp.options.displayMode === SmartShapeDisplayMode.SELECTED || point.options.forceDisplay) &&
                    shp.options.visible && typeof(shp.options.svgLoadFunc) !== "function") {
                    point.element.style.display = '';
                } else {
                    point.element.style.display = 'none';
                }
            }
        });
    }

    /**
     * @ignore
     * Method that used to construct actual shape SVG polygon during shape redraw process
     * @param shape {SmartShape} Shape object to which polygon should be appended
     * @returns {object} SVG <polygon> object
     */
    this.drawPolygon = (shape,svg=null) => {
        if (!svg) {
            svg = this.getShapeSvg(shape);
            if (!svg || typeof(svg.appendChild) !== "function") {
                return
            }
        }
        let polygon = svg.querySelector("#p"+shape.guid+"_polygon");
        if (!polygon) {
            polygon = document.createElementNS("http://www.w3.org/2000/svg","path");
            polygon.id = "p"+shape.guid+"_polygon";
            polygon.setAttribute("fill-rule","evenodd");
            polygon.setAttribute("shape_id", shape.options.id);
            polygon.setAttribute("shape_guid",shape.guid);
            svg.appendChild(polygon)
        }
        const path = this.getPolygonPath(shape);
        if (polygon.getAttribute("d") !== path) {
            polygon.setAttribute("d", path);
        }
        this.setupPolygonFill(shape,polygon);
        this.setupPolygonStyles(shape,polygon);
        if (svg.querySelector("#f"+shape.guid+"_filter")) {
            polygon.style.filter ='url("#f'+shape.guid+'_filter")';
        }
        polygon.style.zIndex = shape.options.zIndex;
        shape.polygon = polygon;
        if (svg && typeof(svg.querySelector) === "function" && !shape.getRootParent()) {
            this.clearUnusedPolygons(shape, svg)
        }
    }

    /**
     * @ignore
     * Remove unnecessary previous polygons
     * @param shape {SmartShape} Shape to remove unnecessary polygons
     * @param svg SVG of this shape
     */
    this.clearUnusedPolygons = (shape,svg) => {
        const polygons = Array.from(svg.querySelectorAll("path"));
        for (let polygon of polygons) {
            let found = polygon.id === "p"+shape.guid+"_polygon";
            if (!found && shape.options.groupChildShapes && !shape.options.displayAsPath) {
                shape.getChildren(true).forEach(child => {
                    if (polygon.id === "p"+child.guid+"_polygon") {
                        found = true
                        return;
                    }
                });
            }
            if (!found) {
                try {
                    polygon.parentNode.removeChild(polygon)
                }  catch (err) { }
            }
        }
    }

    /**
     * @ignore
     * Returns a path string for "d" attribute of <path> tag for specified shape
     * @param shape {SmartShape} Shape to return path to
     * @returns {string}
     */
    this.getPolygonPath = (shape) => {
        const parent = shape.getParent();
        if (parent && parent.options.groupChildShapes) {
            const pos = parent.getPosition(parent.options.groupChildShapes);
            let path = this.getPolygonPathForShape(shape,pos,this.getMaxStrokeWidth(parent));
            if (parent.options.displayAsPath || shape.options.displayAsPath) {
                path += this.getPolygonPathForChildren(shape, pos);
            }
            return path;
        } else {
            const pos = shape.getPosition(shape.options.groupChildShapes);
            let path = this.getPolygonPathForShape(shape,pos,this.getMaxStrokeWidth(shape));
            if (shape.options.displayAsPath && shape.options.groupChildShapes) {
                path += this.getPolygonPathForChildren(shape,pos)
                const svg = this.getShapeSvg(shape);
                svg.setAttribute("width",pos.width);
                svg.setAttribute("height",pos.height);
                svg.style.width = pos.width + "px";
                svg.style.height = pos.height + "px";
                this.createSVGFilters(shape);
            }
            return path
        }
    }

    /**
     * @ignore
     * Returns polygons of all children of specified shape as a single SVG path
     * @param shape {SmartShape} SmartShape object
     * @param pos {object} Dimensions of shape. Object with fields `left`,`top`,`bottom`,`right`
     * @returns {string}
     */
    this.getPolygonPathForChildren = (shape,pos) => {
        let path = "";
        shape.getChildren().forEach(child => {
            child.calcPosition();
            path += this.getPolygonPathForShape(child, pos, this.getMaxStrokeWidth(child)).toString();
        })
        return path;
    }

    /**
     * @ignore
     * Returns path string for specified shape, taking to account the 'stroke-width' SVG argument
     * @param shape {SmartShape} Shape to get polygon for
     * @param pos {object} Dimensions of shape. Object with fields `left`,`top`,`bottom`,`right`
     * @param size {number} The size of stroke, used to draw this shape
     * @returns {string} Path of points for polygon
     */
    this.getPolygonPathForShape = (shape,pos,size) => {
        let path = "M";
        for (let point of shape.points) {
            let x = point.x - pos.left;
            let y = point.y - pos.top;
            if (x<=0) {
                x += size
            } else if (point.x>=pos.right) {
                x -= size;
            }
            if (y<=0) {
                y += size
            } else if (point.y>=pos.bottom) {
                y -= size;
            }
            path += `${x},${y} `
        }
        path += " Z "
        return path;
    }

    /**
     * @ignore
     * Method used to load shape polygon and children
     * using external function, specified in `svgLoadFunc` SmartShape option
     * @param shape {SmartShape} SmartShape object
     */
    this.loadExternalSvg = async(shape) => {
        shape.setOptions({pointOptions:{canDrag:false}})
        const opacity = shape.svg.style.opacity | 1;
        shape.svg.style.opacity = 0.1
        const svg = await shape.options.svgLoadFunc(shape);
        if (!svg) { return }
        const paths = Array.from(svg.querySelectorAll("path"));
        if (!paths.length) {
            return
        }
        const path = this.updateShapeFromPath(shape,paths);
        this.removeUnusedChildren(shape,paths);
        shape.polygon.setAttribute("shape_guid",shape.guid);
        shape.polygon.id = "p"+shape.guid+"_polygon";
        this.addPointsFromPolygon(shape);
        shape.calcPosition();
        paths.splice(paths.indexOf(path),1);
        this.addChildShapesFromPaths(shape,paths);
        const pos = shape.getPosition(true);
        shape.svg.setAttribute("width",pos.width+"px");
        shape.svg.setAttribute("height",pos.height+"px");
        shape.svg.style.width = pos.width + "px";
        shape.svg.style.height = pos.height + "px";
        SmartShapeManager.addShape(shape);
        shape.options.canScale && this.redrawResizeBox(shape);
        shape.options.canRotate && this.redrawRotateBox(shape);
        shape.svg.style.opacity = opacity;
        EventsManager.emit(ShapeEvents.SHAPE_LOADED,shape);
    }

    /**
     * @ignore
     * Method used to create points of shape based on `d` attribute
     * of shape path polygon
     * @param shape {SmartShape} SmartShape object
     */
    this.addPointsFromPolygon = (shape) => {
        shape.setOptions({pointOptions:{canDrag:false}})
        const parent = shape.getParent(true);
        const shp = parent || shape;
        const pos = shp.getPosition(true);
        shape.deleteAllPoints();
        shape.isNewObject = true;
        let pointsStr = shape.polygon.getAttribute("points");
        if (pointsStr && !pointsStr.length) {
            shape.points = JSON.parse(pointsStr);
            shape.isNewObject = false;
            shape.calcPosition();
            return;
        }
        const d = shape.polygon.getAttribute("d")
        let buffer = [];
        let x = null;
        let y = null;
        for (let char of d) {
            const code = char.charCodeAt(0);
            if ((code >= ASCII.ZERO && code <= ASCII.NINE) || code === ASCII.DOT) {
                buffer.push(char)
            } else if ((code === ASCII.COMMA || code === ASCII.SPACE) && buffer.length) {
                if (x === null) {
                    x = parseFloat(buffer.join(""));
                } else {
                    y = parseFloat(buffer.join(""));
                    shape.putPoint(x+pos.left,y+pos.top)
                    x = null; y = null;
                }
                buffer = [];
            }
        }
        shape.isNewObject = false;
//        this.getPointsFromPolygon(shape.polygon).forEach(point => shape.putPoint(point[0]+pos.left,point[1]+pos.top));
    }

    const ASCII = {
        DOT: 46,
        COMMA: 44,
        SPACE: 32,
        ZERO: 48,
        NINE: 57

    }

    /**
     * @ignore
     * Function used to parse "d" attribute of provided <path> node and return
     * it as an array of [x,y] coordinates
     * @param polygon {HTMLElement}  Path HTML Node
     * @returns {array} Array of coordinates [x,y]
     */
    this.getPointsFromPolygon = (polygon) => {
        const result = [];
        const d = polygon.getAttribute("d")
        let buffer = [];
        let x = null;
        let y = null;
        for (let char of d) {
            const code = char.charCodeAt(0);
            if ((code >= ASCII.ZERO && code <= ASCII.NINE) || code === ASCII.DOT) {
                buffer.push(char)
            } else if ((code === ASCII.COMMA || code === ASCII.SPACE) && buffer.length) {
                if (x === null) {
                    x = parseFloat(buffer.join(""));
                } else {
                    y = parseFloat(buffer.join(""));
                    result.push([x,y]);
                    x = null; y = null;
                }
                buffer = [];
            }
        }
        return result;
    }

    /**
     * @ignore
     * Method used to set the first polygon from specified `paths` as a polygon
     * of shape
     * @param shape {SmartShape} SmartShape object
     * @param paths {array} Array of <path> elements
     */
    this.updateShapeFromPath = (shape,paths) => {
        let path = null
        if (shape.polygon) {
            path = paths.find(item => item.id === shape.polygon.getAttribute("path_id"))
        }
        if (path) {
            shape.polygon.setAttribute("d", path.getAttribute("d"));
            shape.polygon.setAttribute("points", path.getAttribute("points"));
            return path
        }
        path = paths[0]
        if (shape.polygon) {
            const shapes = shape.getChildren(true);
            const child = shapes.find(item => item.polygon &&
                item.polygon.getAttribute("path_id") === path.id);
            if (child) {
                shape.removeChild(child);
                try {
                    shape.svg.removeChild(child.polygon)
                } catch (err) {
                }
                child.destroy();
            }
        }
        shape.polygon = path.cloneNode(true);
        shape.polygon.setAttribute("path_id",path.id);
        shape.polygon.setAttribute("shape_guid",shape.guid);
        if (shape.svg) {
            shape.svg.appendChild(shape.polygon);
        }
        return path
    }

    /**
     * @ignore
     * Method used to create child shapes of specified shape
     * using info from provided array of polygons
     * @param shape {SmartShape} SmartShape object
     * @param paths {array} Array of path HTML elements
     */
    this.addChildShapesFromPaths = (shape,paths) => {
        for (let p of paths) {
            let child = SmartShapeManager.findShapeById(p.id)
            if (!child) {
                child = SmartShapeManager.createShape(shape.root,{hasContextMenu:false,id:p.id},[],false)
                child.polygon = p;
                child.polygon.setAttribute("path_id",p.id);
                child.polygon.id = "p"+child.guid+"_polygon";
                child.polygon.setAttribute("shape_guid",child.guid);
                if (shape.svg) {
                    shape.svg.appendChild(child.polygon);
                }
                shape.addChild(child,false);
                SmartShapeManager.addShape(child);
            } else {
                child.polygon.setAttribute("d",p.getAttribute("d"))
                child.polygon.setAttribute("points",p.getAttribute("points"))
            }
            this.addPointsFromPolygon(child);
            child.calcPosition();
        }
    }

    /**
     * @ignore
     * Method used to remove all children of specified shape
     * that does not have polygons, specified in `paths` array argument
     * It removes both shape children and polygons from shape SVG element
     * @param shape {SmartShape} SmartShape object
     * @param paths {array} Array of path HTML elements
     */
    this.removeUnusedChildren = (shape,paths) => {
        const origPaths = Array.from(shape.svg.querySelectorAll("path"));
        for (let path of origPaths) {
            if (paths.find(p => p.id === path.getAttribute("path_id"))) {
                continue
            }
            const shapes = SmartShapeManager.getShapes();
            const child = shapes.find(shp => shp.polygon && shp.polygon.getAttribute("path_id") === path.getAttribute("path_id"));
            if (child) {
                shape.children.splice(shape.children.indexOf(child),1);
                child.destroy();
            }
            try {
                shape.svg.removeChild(path);
            } catch (err) {}
        }
    }

    /**
     * @ignore
     * If shape scaling feature is enabled, this method
     * redraws [ResizeBox](#ResizeBox) around it after redrawing the shape
     * @param shape {SmartShape} Shape object
     */
    this.redrawResizeBox = (shape) => {
        if (shape.options.displayMode !== SmartShapeDisplayMode.SCALE || !shape.options.canScale) {
            if (shape.resizeBox) {
                shape.resizeBox.hide();
            }
            return
        }
        if (!shape.resizeBox) {
            shape.transformer.setupResizeBox();
            if (shape.resizeBox) {
                shape.resizeBox.shape.points.forEach(point => {
                    point.options.zIndex = shape.resizeBox.shape.options.zIndex + 2;
                    point.element.style.zIndex = shape.resizeBox.shape.options.zIndex + 2;
                })
            }
            return
        }
        this.setupBox(shape,shape.resizeBox,SmartShapeDisplayMode.SCALE);
    }

    this.getMaxZIndex = (shape) => {
        return shape.getChildren(true)
            .map(child=>child.options.zIndex)
            .reduce((p1,p2) => p1 > p2 ? p1 : p2,shape.options.zIndex);

    }

    /**
     * @ignore
     * If shape rotation feature is enabled, this method
     * redraws [RotateBox](#RotateBox) around it after redrawing the shape
     * @param shape {SmartShape} Shape object
     */
    this.redrawRotateBox = (shape) => {
        if (shape.options.displayMode !== SmartShapeDisplayMode.ROTATE || !shape.options.canRotate) {
            if (shape.rotateBox) {
                shape.rotateBox.hide();
            }
            return
        }
        if (!shape.rotateBox) {
            shape.transformer.setupRotateBox();
            if (shape.rotateBox) {
                shape.rotateBox.shape.points.forEach(point => {
                    point.options.zIndex = shape.options.zIndex + 2;
                    point.element.style.zIndex = shape.options.zIndex + 2;
                })
            }
            return
        }
        this.setupBox(shape,shape.rotateBox,SmartShapeDisplayMode.ROTATE);
    }

    this.setupBox = (shape,box,displayMode) => {
        const bounds = shape.transformer.getResizeBoxBounds();
        if (shape.options.displayMode === displayMode) {
            box.options.shapeOptions.visible = shape.options.visible;
        } else {
            box.options.shapeOptions.visible = false;
        }
        box.left = bounds.left;
        box.top = bounds.top;
        box.width = bounds.width;
        box.height = bounds.height;
        box.options.zIndex = shape.options.zIndex+1;
        box.redraw();
        setTimeout(() => {
            box.shape.points.forEach(point => {
                point.options.zIndex = box.shape.options.zIndex+2;
                point.element.style.zIndex = box.shape.options.zIndex+2;
            })
        },1)
    }

    /**
     * @ignore
     * Used to setup fill of shape depending on provided options: color fill, gradient fill or image fill
     * @param shape {SmartShape} Shape for which gradient should be created
     */
    this.setupShapeFill = (shape) => {
        const fill = shape.options.style.fill || 'none';
        if (fill === "#image" && shape.options.fillImage && typeof(shape.options.fillImage) === "object") {
            this.createImageFill(shape);
        } else if (fill === "#gradient" && shape.options.fillGradient && typeof(shape.options.fillGradient) === "object" &&
            ["linear","radial"].indexOf(shape.options.fillGradient.type) !== -1) {
            this.createGradient(shape);
        } else {
            this.clearShapeFillTags(shape);
        }
    }

    this.clearShapeFillTags = (shape) => {
        const svg = this.getShapeSvg(shape);
        if (!svg) {
            return
        }
        const gradient = svg.querySelector("#g"+shape.guid+"_gradient");
        if (gradient) {
            try {
                gradient.parentNode.removeChild(gradient);
            } catch {}
        }
        const pattern = svg.querySelector("p"+shape.guid+"_pattern");
        if (pattern) {
            try {
                pattern.parentNode.removeChild(pattern);
            } catch {}
        }
    }

    /**
     * @ignore
     * Method, used to create gradient fill for shape, if `options.fillGradient` specified.
     * Triggered automatically when redraw the shape. Should not be called directly.
     * @param shape {SmartShape} Shape for which gradient should be created
     * equal to `linear` or `radial`. Accepts all options, that SVG linear gradient or SVG radial gradient accept.
     * @returns {HTMLOrSVGElement} SVG element that defines gradient: either `linearGradient` or
     * `radialGradient`. See: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient
     */
    this.createGradient = (shape) => {
        const svg = this.getShapeSvg(shape);
        let gradient = svg.querySelector("#g"+shape.guid+"_gradient");
        let gradientTag = shape.options.fillGradient.type === "linear" ? "linearGradient" : "radialGradient";
        if (gradient && gradient.tagName.toLowerCase() !== gradientTag.toLowerCase()) {
            gradient.parentNode.removeChild(gradient);
            gradient = svg.querySelector("#g"+shape.guid+"_gradient");
        }
        if (!gradient) {
            gradient = document.createElementNS(svg.namespaceURI,gradientTag);
            if (svg) {
                svg.querySelector('defs').appendChild(gradient);
            }
        }
        return this.createGradientSteps(shape, svg, gradient);
    }

    this.createGradientSteps = (shape, svg, gradient) => {
        gradient.innerHTML = "";
        gradient.id = "g"+shape.guid+"_gradient";
        let foundSteps = false;
        for (let index in shape.options.fillGradient) {
            if (index === "type") { continue }
            if (index === "steps") {
                foundSteps = true;
                continue;
            }
            gradient.setAttribute(index,shape.options.fillGradient[index])
        }
        if (!foundSteps) {
            return gradient;
        }
        for (let step of shape.options.fillGradient.steps) {
            const stepNode = document.createElementNS(svg.namespaceURI,"stop");
            if (notNull(step.stopColor)) {
                stepNode.setAttribute("offset", step.offset);
            }
            if (notNull(step.stopColor)) {
                stepNode.setAttribute("stop-color", step.stopColor);
            }
            if (notNull(step.stopOpacity)) {
                stepNode.setAttribute("stop-opacity", step.stopOpacity);
            }
            gradient.appendChild(stepNode);
        }
        return gradient;

    }
    /**
     * @ignore
     * Method used to construct SVG pattern to fill the shape with an image. Consists of
     * `pattern` SVG node:
     * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern.
     * and `image` SVG node inside it.
     * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image
     * Triggered automatically when redraw the shape, if `options.fillImage` specified.
     * Should not be called directly.
     * @param shape {SmartShape} Shape for which image fill should be created
     * @returns {HTMLOrSVGElement} Constructed `pattern` SVG tag or null, in case of errors
     */
    this.createImageFill = (shape) => {
        const imageFillOptions = shape.options.fillImage;
        if (!imageFillOptions.href || !imageFillOptions.width || !imageFillOptions.height) {
            console.error("Image HREF, width and height must be specified for Image Fill");
            return null;
        }
        const svg = this.getShapeSvg(shape);
        let pattern = svg.querySelector("p"+shape.guid+"_pattern");
        if (!pattern) {
            pattern = document.createElementNS(svg.namespaceURI, "pattern");
            pattern.setAttribute("id","p"+shape.guid+"_pattern");
            pattern.setAttribute("patternUnits","userSpaceOnUse");
            if (svg) {
                svg.querySelector("defs").appendChild(pattern);
            }
        }
        for (let index in imageFillOptions) {
            if (index === "href") {
                continue;
            }
            pattern.setAttribute(index,imageFillOptions[index])
        }
        let image = pattern.querySelector("image");
        if (!image) {
            image = document.createElementNS(svg.namespaceURI, "image");
            pattern.appendChild(image);
        }
        if (imageFillOptions.href) {
            image.setAttribute("href", imageFillOptions.href);
        }
        image.setAttribute("width",imageFillOptions.width);
        image.setAttribute("height",imageFillOptions.height);
        return pattern;
    }

    /**
     * @ignore
     * Method used to apply SVG filter to the shape, if `filters` options specified in
     * options of SmartShape.
     * @param shape {SmartShape} shape object to apply filter to
     * @returns {SVGFilterElement} Constructed filter element with set of filters
     */
    this.createSVGFilters = (shape) => {
        if (!shape.options.filters || typeof(shape.options.filters) !== "object" || !Object.keys(shape.options.filters).length) {
            return
        }
        const svg = this.getShapeSvg(shape);
        let filters = svg.querySelector("#f"+shape.guid+"_filter");
        if (!filters) {
            filters = document.createElementNS(svg.namespaceURI,"filter");
            if (svg) {
               svg.querySelector("defs").append(filters);
            }
        }
        filters.setAttribute("id","f"+shape.guid+"_filter");
        filters.innerHTML = "";
        for (let filterName in shape.options.filters) {
            const filter = this.createSVGFilter(shape,filterName,shape.options.filters[filterName]);
            if (filter) {
                filters.appendChild(filter);
            }
        }
    }

    /**
     * @ignore
     * Method constructs individual SVG filter tag with specified name and options
     * that will be added to the <filter> tag of shape's SVG.
     * @param shape {SmartShape} shape object to apply filter ot
     * @param filterName {string} name of SVG filter (feDropShadow, feGaussianBlur etc.)
     * @param filterOptions {object} attributes of filter (any attributes that appropriate SVG filter tag accepts)
     * @returns {SVGElement} Constructed filter element
     */
    this.createSVGFilter = (shape,filterName,filterOptions) => {
        if (!shape.svg) {
            return null;
        }
        const filter = document.createElementNS(shape.svg.namespaceURI,filterName);
        const svg = this.getShapeSvg(shape);
        const pos = shape.getPosition(shape.options.groupChildShapes);
        for (let attribute in filterOptions) {
            filter.setAttribute(attribute,filterOptions[attribute].toString());
            if (attribute === "dx") {
                svg.setAttribute("width",(pos.width + parseInt(filterOptions["dx"])*2).toString());
                svg.style.width = (pos.width + parseInt(filterOptions["dx"])*2).toString()
            }
            if (attribute === "dy") {
                svg.setAttribute("height",(pos.height + parseInt(filterOptions["dy"])*2).toString());
                svg.style.height = (pos.height + parseInt(filterOptions["dy"])*2).toString();
            }
        }
        return filter;
    }

    /**
     * @ignore
     * Method used to set up fill params of shape polygon
     * @param shape {SmartShape} Shape object
     * @param polygon {SVGPolygonElement} Polygon element to setup
     */
    this.setupPolygonFill = (shape, polygon) => {
        const fill = shape.options.style.fill || "none";
        if (fill === "#image" && shape.options.fillImage && typeof(shape.options.fillImage) === "object") {
            polygon.setAttribute("fill",'url("#p'+shape.guid+'_pattern'+'")');
            polygon.style.fill = "";
        }  else if (fill === "#gradient" && shape.options.fillGradient && typeof(shape.options.fillGradient) === "object" &&
            ["linear","radial"].indexOf(shape.options.fillGradient.type) !== -1) {
            polygon.setAttribute("fill",'url("#g'+shape.guid+'_gradient'+'")');
            polygon.style.fill = "";
        }
    }

    /**
     * @ignore
     * Method used to apply provided CSS classes and styles to SVG polygon
     * @param shape {SmartShape} Shape object
     * @param polygon {SVGPolygonElement} Polygon element to se tup
     */
    this.setupPolygonStyles = (shape, polygon) => {
        if (shape.options.classes) {
            polygon.setAttribute("class",shape.options.classes);
        }
        if (!notNull(shape.options.style) || typeof(shape.options.style) !== "object") {
            return;
        }
        for (let cssName in shape.options.style) {
            polygon.style[cssName] = shape.options.style[cssName]
        }
    }

    /**
     * @ignore
     * Method used to return shape as an SVG string.
     * @param shape {SmartShape} Shape object
     * @param includeChildren {boolean|null} Should include children of this shape to output.
     * 'null' by default. In this case value of shape.options.groupChildShapes will be used
     * @returns {string} String body of SVG document
     */
    this.toSvg = (shape,includeChildren=null) => {
        const div = document.createElement("div");
        const svg = this.getSvg(shape,includeChildren);
        div.appendChild(svg);
        return '<?xml version="1.0" encoding="UTF-8"?>'+div.innerHTML.replace(/&quot;/g,"'");
    }

    /**
     * @ignore
     * Method used to return shape as an SVG document.
     * @param shape {SmartShape} Shape object
     * @param includeChildren {boolean|null} Should include children of this shape to output.
     * 'null' by default. In this case value of shape.options.groupChildShapes will be used
     * @returns {SVGElement|null} SVG document
     */
    this.getSvg = (shape,includeChildren) => {
        let svg = shape.svg;
        if (!svg) {
            const parent = shape.getParent();
            if (parent) {
                svg = parent.svg;
            }
            if (!svg) {
                return
            }
        }
        svg = svg.cloneNode(true);
        if (includeChildren) {
            svg = this.addChildrenToSvg(shape,svg)
        }
        svg.removeAttribute("style");
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.removeAttribute("id");
        svg.removeAttribute("guid");
        const pos = shape.getPosition(includeChildren === null ? shape.options.groupChildShapes : includeChildren);
        svg.setAttribute("xmlns","http://www.w3.org/2000/svg")
        const zoom = shape.options.zoomLevel || 1;
        const viewBox = "0 0 " + pos.width/zoom + " " + pos.height/zoom;
        svg.setAttribute("viewBox",viewBox);
        if (zoom !== 1) {
            this.unZoomSvg(svg,zoom);
        }
        return svg;
    }

    this.addChildrenToSvg = (shape,svg) => {
        let groupChanged = false;
        shape = shape.getParent() || shape;
        if (!shape.options.groupChildShapes) {
            shape.options.groupChildShapes = true;
            groupChanged = true;
        }
        if (!shape.options.displayAsPath) {
            shape.getChildren(true).forEach(child => {
                this.drawPolygon(child, svg);
            })
        }
        this.drawPolygon(shape,svg);
        let paths = Array.from(svg.querySelectorAll("path"));
        paths.sort((p1,p2) => parseInt(p1.style.zIndex)-parseInt(p2.style.zIndex));
        const defs = svg.querySelector("defs");
        svg.innerHTML = "";
        svg.appendChild(defs);
        paths.forEach(path=>svg.appendChild(path));
        if (groupChanged) {
            shape.options.groupChildShapes = false;
        }
        return svg;
    }

    this.unZoomSvg = (svg,zoom) => {
        svg.querySelectorAll("path").forEach(path => {
            let result = "";
            const d = path.getAttribute("d").split(" ")
            for (let item of d) {
                if (item.search(",") === -1) {
                    result += item + " "
                } else {
                    const parts = item.split(",");
                    result += (parseFloat(parts[0])/zoom)+","+(parseFloat(parts[1])/zoom)+" "
                }
            }
            path.setAttribute("d",result);
        })
    }

    /**
     * @ignore
     * Method returns maximal stroke width of this shape or its children
     * @param shape {SmartShape} Shape to return stroke width for
     * @returns {number|*}
     */
    this.getMaxStrokeWidth = (shape) => {
        const svg = this.getShapeSvg(shape);
        if (!svg) {
            return 0;
        }
        let width = parseInt(shape.options.style["stroke-width"]);
        if (isNaN(width)) {
            width = 0;
        }
        if (!shape.options.groupChildShapes) {
            return width;
        }
        return shape.getChildren(true)
                .map(child => isNaN(parseInt(child.options.style["stroke-width"])) ? 0 : parseInt(child.options.style["stroke-width"]))
                .reduce((w1,w2) => w1 > w2 ? w1 : w2,width)
    }

    /**
     * @ignore
     * Method exports shape and all its children as a PNG image
     * @param {SmartShape} shape Shape object to export
     * @param {PngExportTypes} type Format of returned result - `dataurl` or `blob`. By default `dataurl`
     * @param {number|null} width Width of image. If not specified, then calculate based on height or current
     * width of shape
     * @param {number|null} height Height of image. If not specified, then calculate based on width or current
     * height of shape
     * @param includeChildren {boolean} Should include children of this shape to output.
     * 'null' by default. In this case value of shape.options.groupChildShapes will be used*
     * @return {Promise} Promise that resolves either to DataURL string or to BLOB object, depending on value of
     * `type` argument
     */
    this.toPng = (shape,type= PngExportTypes.DATAURL,width=null,height=null, includeChildren=null) => {
        return new Promise(async(resolve) => {
            const zoom = shape.options.zoomLevel || 1;
            shape.calcPosition();
            const pos = shape.getPosition(includeChildren || shape.options.groupChildShapes);
            [width, height] = applyAspectRatio(width, height, pos.width/zoom, pos.height/zoom);
            const svgObj = this.getSvg(shape,includeChildren);
            svgObj.setAttribute("width", pos.width/zoom);
            svgObj.setAttribute("height", pos.height/zoom);
            for (let item of svgObj.querySelectorAll("image")) {
                if (item.getAttribute("href") && item.getAttribute("href").length) {
                    const href = await blobToDataURL(await (await fetch(item.getAttribute("href"))).blob());
                    item.setAttribute("href",href);
                }
            }
            const div = document.createElement("div");
            div.appendChild(svgObj);
            const svgString = div.innerHTML;
            const img = new Image();
            const svg = new Blob([svgString],{type:"image/svg+xml"});
            const DOMURL = window.URL || window.webkitURL || window;
            const url = await blobToDataURL(svg);
            img.addEventListener("load", () => {
                const canvas = document.createElement("canvas");
                img.width = pos.width/zoom;
                img.height = pos.height/zoom;
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img,0,0)
                ctx.scale(width,height);
                DOMURL.revokeObjectURL(url);
                const result = canvas.toDataURL("image/png");
                if (type === PngExportTypes.BLOB) {
                    resolve(dataURLtoBlob(result));
                    return
                }
                resolve(result)
            })
            img.src = url;
        })
    }

    /**
     * @ignore
     * Method used to change shape zIndex to topmost
     * @param shape {SmartShape} shape object
     */
    this.moveShapeToTop = (shape) => {
        const zIndex = SmartShapeManager.getMaxZIndex(shape.root);
        if (shape.options.zIndex === zIndex && SmartShapeManager.findShapesByOptionValue("zIndex",zIndex).length === 1) {
            return
        }
        this.changeShapeZIndex(shape,zIndex+1);
    }

    /**
     * @ignore
     * Method used to change shape zIndex to topmost
     * @param shape {SmartShape} shape object
     */
    this.moveShapeToBottom = (shape) => {
        const zIndex = SmartShapeManager.getMinZIndex(shape.root);
        if (shape.options.zIndex === zIndex && SmartShapeManager.findShapesByOptionValue("zIndex",zIndex).length === 1) {
            return
        }
        this.changeShapeZIndex(shape,zIndex-1);
    }

    /**
     * @ignore
     * Method used to change shape zIndex to specified
     * @param shape {SmartShape} shape object
     * @param zIndex {number} zIndex value
     */
    this.changeShapeZIndex = (shape,zIndex) => {
        if (zIndex === shape.options.zIndex) {
            return
        }
        const diff = zIndex - shape.options.zIndex;
        shape.options.prevZIndex = shape.options.zIndex;
        shape.options.zIndex += diff;
        this.updateOptions(shape);
        if (shape.options.groupChildShapes) {
            shape.getChildren(true).forEach(child => {
                child.options.prevZIndex = child.options.zIndex;
                child.options.zIndex += diff;
                this.updateOptions(child);
            });
        }
    }

    /**
     * @ignore
     * Internal method that used to return SVG element to which this shape belongs
     * If this is a root shape, then just returns svg of current shape object,
     * if it's a child, then SVG element of the parent
     * @param shape {SmartShape} Shape to return SVG element for
     * @returns {HTMLOrSVGElement|null|*}
     */
    this.getShapeSvg = (shape) => {
        const parent = shape.getRootParent(true);
        if (parent && parent.svg) {
            return parent.svg
        }
        return shape.svg;
    }

    /**
     * @ignore
     * Method used to correct order of items of SVG shape according to Z-Index CSS style
     * @param shape {SmartShape} Shape to correct
     */
    this.setupZIndex = (shape) => {
        if (!shape.svg) {
            return
        }
        let paths = Array.from(shape.svg.querySelectorAll("path"));
        paths.sort((p1,p2) => parseInt(p1.style.zIndex)-parseInt(p2.style.zIndex));
        const defs = shape.svg.querySelector("defs");
        shape.svg.innerHTML = "";
        if (defs) {
            shape.svg.appendChild(defs);
        }
        paths.forEach(path=>shape.svg.appendChild(path));
    }
}

/**
 * Enumeration of PNG export types for SmartShape.toPng() function
 * @param dataurl Return PNG as a DataURL string
 * @param blob Return PNG as a BLOB object
 * @enum {string}
 */
export const PngExportTypes = {
    DATAURL: "dataurl",
    BLOB: "blob"
}

export default new SmartShapeDrawHelper();
