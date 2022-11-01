import {EventsManager, ShapeEvents,SmartShapeManager,SmartShapeDisplayMode} from "../index.js";
import {blobToDataURL, dataURLtoBlob, notNull} from "../utils";
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
    this.draw = (shape) => {
        const parent = shape.getRootParent(true);
        if (!parent || parent.guid === shape.guid) {
            if (shape.svg) {
                try {
                    shape.eventListener.removeSvgEventListeners();
                    shape.svg.innerHTML = "";
                } catch (err) {
                }
            } else {
                shape.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                shape.svg.ondragstart = function () {
                    return false;
                }
                if (shape.options.visible) {
                    EventsManager.emit(ShapeEvents.SHAPE_SHOW, shape);
                }
                shape.eventListener.setSvgEventListeners();
                shape.root.appendChild(shape.svg);
            }
            const defs = document.createElementNS(shape.svg.namespaceURI, "defs");
            shape.svg.appendChild(defs);
        } else {
            shape.svg = null;
            const svg = document.querySelector("svg[guid='"+shape.guid+"']");
            if (svg) {
                svg.parentNode.removeChild(svg);
            }
            shape.resizeBox && shape.resizeBox.hide();
            shape.rotateBox && shape.rotateBox.hide();
        }
        if (shape.points.length < 1) {
            return
        }
        if (!shape.shapeMenu.contextMenu) {
            shape.shapeMenu.updateContextMenu();
        }
        this.updateOptions(shape);
        this.drawPolygon(shape);
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
        const parent = shape.getRootParent(true);
        if (shape.svg && !parent) {
            if (typeof (shape.options.visible) !== "undefined") {
                if (shape.svg.style.display !== shape.options.visible) {
                    if (shape.options.visible) {
                        EventsManager.emit(ShapeEvents.SHAPE_SHOW, shape);
                    } else {
                        EventsManager.emit(ShapeEvents.SHAPE_HIDE, shape);
                    }
                }
                shape.svg.style.display = shape.options.visible ? '' : 'none';
            }
            shape.svg.id = shape.options.id;
            let pos
            if (shape.options.groupChildShapes) {
                pos = shape.getPosition(true);
            } else {
                pos = shape.getPosition();
            }
            shape.svg.style.position = 'absolute';
            shape.svg.style.cursor = 'default';
            shape.svg.style.left = pos.left + "px";
            shape.svg.style.top = pos.top + "px";
            shape.svg.setAttribute("width", pos.width);
            shape.svg.setAttribute("height", pos.height);
            shape.svg.setAttribute("guid", shape.guid);
            shape.svg.style.zIndex = shape.options.zIndex;
        }
        this.setupShapeFill(shape);
        this.createSVGFilters(shape);
        if (shape.options.pointOptions.canDrag) {
            this.updatePoints(shape, parent);
        }
        this.redrawResizeBox(parent || shape);
        this.redrawRotateBox(parent || shape);
    }

    /**
     * @ignore
     * Method updates points after redraw shape
     * @param shape {SmartShape} Shape that need to update
     * @param parent {SmartShape} Root parent of this shape or null
     */
    this.updatePoints = (shape,parent) => {
        shape.points.filter(point => point.element).forEach(point => {
            if (point.element.parentNode !== shape.root) {
                shape.root.appendChild(point.element);
            }
            point.options.zIndex = shape.options.zIndex + 2;
            if (!shape.options.visible) {
                point.options.visible = false;
            }
            point.redraw();
            if (shape.options.displayMode === SmartShapeDisplayMode.DEFAULT && !point.options.forceDisplay) {
                if (!parent || parent.options.displayMode === SmartShapeDisplayMode.DEFAULT) {
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
    this.drawPolygon = (shape) => {
        const svg = this.getShapeSvg(shape);
        if (!svg) {
            return
        }
        let polygon = svg.querySelector("#p"+shape.guid+"_polygon");
        if (!polygon) {
            polygon = document.createElementNS("http://www.w3.org/2000/svg","path");
            if (svg) {
                svg.appendChild(polygon)
            }
        }
        const points = this.getPolygonPath(shape);
        polygon.setAttribute("d","M "+points+ " Z");
        polygon.id = "p"+shape.guid+"_polygon";
        this.setupPolygonFill(shape,polygon);
        this.setupPolygonStyles(shape,polygon);
        if (svg.querySelector("#f"+shape.guid+"_filter")) {
            polygon.style.filter ='url("#f'+shape.guid+'_filter")';
        }
        polygon.style.zIndex = shape.options.zIndex;
    }

    this.getPolygonPath = (shape) => {
        const parent = shape.getRootParent(true);
        if (parent) {
            const pos = parent.getPosition(parent.options.groupChildShapes);
            return shape.points.map(point => ""+(point.x-pos.left)+","+(point.y-pos.top)).join(" ");
        } else {
            const pos = shape.getPosition(shape.options.groupChildShapes);
            return shape.points.map(point => ""+(point.x-pos.left)+","+(point.y-pos.top)).join(" ");
        }
    }
    /**
     * @ignore
     * If shape scaling feature is enabled, this method
     * redraws [ResizeBox](#ResizeBox) around it after redrawing the shape
     * @param shape {SmartShape} Shape object
     */
    this.redrawResizeBox = (shape) => {
        if (!shape.resizeBox) {
            return
        }
        const bounds = shape.getResizeBoxBounds();
        shape.resizeBox.left = bounds.left;
        shape.resizeBox.top = bounds.top;
        shape.resizeBox.width = bounds.width;
        shape.resizeBox.height = bounds.height;
        shape.resizeBox.options.zIndex = shape.options.zIndex+1;
        shape.resizeBox.redraw();
    }

    /**
     * @ignore
     * If shape rotation feature is enabled, this method
     * redraws [RotateBox](#RotateBox) around it after redrawing the shape
     * @param shape {SmartShape} Shape object
     */
    this.redrawRotateBox = (shape) => {
        if (!shape.rotateBox) {
            return
        }
        const bounds = shape.getResizeBoxBounds();
        shape.rotateBox.left = bounds.left;
        shape.rotateBox.top = bounds.top;
        shape.rotateBox.width = bounds.width;
        shape.rotateBox.height = bounds.height;
        shape.rotateBox.options.zIndex = shape.options.zIndex+1;
        shape.rotateBox.redraw();
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
        const gradientOptions = shape.options.fillGradient;
        const svg = this.getShapeSvg(shape);
        let gradient = svg.querySelector("#g"+shape.guid+"_gradient");
        let gradientTag = gradientOptions.type === "linear" ? "linearGradient" : "radialGradient";
        if (gradient) {
            if (gradient.tagName.toLowerCase() !== gradientTag.toLowerCase()) {
                gradient.parentNode.removeChild(gradient);
            }
        } else {
            gradient = document.createElementNS(svg.namespaceURI,gradientTag);
            if (svg) {
                svg.querySelector('defs').appendChild(gradient);
            }
        }
        gradient.innerHTML = "";
        gradient.id = "g"+shape.guid+"_gradient";
        let foundSteps = false;
        for (let index in gradientOptions) {
            if (index === "type") { continue }
            if (index === "steps") {
                foundSteps = true;
                continue;
            }
            gradient.setAttribute(index,gradientOptions[index])
        }
        if (!foundSteps) {
            return gradient;
        }
        for (let step of gradientOptions.steps) {
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
     * @param shape {object} Shape for which image fill should be created
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
        for (let filterName in shape.options.filters) {
            const filter = this.createSVGFilter(shape,filterName,shape.options.filters[filterName]);
            filters.appendChild(filter);
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
        const filter = document.createElementNS(shape.svg.namespaceURI,filterName);
        const svg = this.getShapeSvg(shape);
        for (let attribute in filterOptions) {
            filter.setAttribute(attribute,filterOptions[attribute].toString());
            if (attribute === "dx") {
                svg.setAttribute("width",(shape.width + parseInt(filterOptions["dx"])*2).toString());
            }
            if (attribute === "dy") {
                svg.setAttribute("height",(shape.height + parseInt(filterOptions["dy"])*2).toString());
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
        }  else if (fill === "#gradient" && shape.options.fillGradient && typeof(shape.options.fillGradient) === "object" &&
            ["linear","radial"].indexOf(shape.options.fillGradient.type) !== -1) {
            polygon.setAttribute("fill",'url("#g'+shape.guid+'_gradient'+'")');
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
     * @returns {string} String body of SVG document
     */
    this.getSvg = (shape,includeChildren) => {
        const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        const pos = shape.getPosition(includeChildren === null ? shape.options.groupChildShapes : includeChildren);
        svg.appendChild(this.getSvgDefs(shape,includeChildren));
        if (!shape.svg) {
            this.draw(shape);
        }
        this.addSvgPolygons(shape,svg,includeChildren);
        svg.setAttribute("xmlns","http://www.w3.org/2000/svg")
        const viewBox = "0 0 " + pos.width + " " + pos.height;
        svg.setAttribute("viewBox",viewBox);
        return svg;
    }

    /**
     * @ignore
     * Method used to generate `defs` tag for SVG document export feature.
     * It goes through all children of this shape and appends contents of all child `defs`
     * to root defs or current shape and returns resulting `defs` element
     * @param shape {SmartShape} Shape object
     * @param includeChildren {boolean} Should include children of this shape to output.
     * 'null' by default. In this case value of shape.options.groupChildShapes will be used
     * @returns {HTMLOrSVGElement} defs tag
     */
    this.getSvgDefs = (shape,includeChildren=null) => {
        const defs = document.createElementNS("http://www.w3.org/2000/svg","defs");
        if (!shape.svg) {
            shape.redraw();
        }
        if (shape.svg) {
            const shape_defs = shape.svg.querySelector("defs");
            if (shape_defs) {
                defs.innerHTML = shape_defs.innerHTML;
            }
        }
        if (includeChildren === true || (shape.options.groupChildShapes && includeChildren !== false)) {
            shape.getChildren(true).forEach(child => {
                if (!child.svg) {
                    child.redraw()
                }
                if (child.svg) {
                    const child_defs = child.svg.querySelector("defs");
                    if (child_defs) {
                        defs.innerHTML += child_defs.innerHTML;
                    }
                }
            })
        }
        return defs;
    }

    /**
     * @ignore
     * Method used for SVG export feature to add all polygons from the shape and all
     * it's children to resulting `svg` document
     * @param shape {SmartShape} shape object
     * @param svg {SVGElement} svg element to add polygons to
     * @param includeChildren {boolean} Should include children of this shape to output.
     * 'null' by default. In this case value of shape.options.groupChildShapes will be used*
     */
    this.addSvgPolygons = (shape,svg,includeChildren) => {
        const pos = shape.getPosition(includeChildren || shape.options.groupChildShapes);
        const polygons = [];
        if (!shape.svg) {
            shape.redraw();
        }
        if (shape.svg) {
            let polygon = shape.svg.querySelector("path");
            if (polygon) {
                polygon = polygon.cloneNode()
                const points = shape.points.map(point =>
                    "" + (point.x - pos.left) + "," + (point.y - pos.top)
                ).join(" ");
                polygon.setAttribute("d", "M "+points+" Z");
                polygons.push({polygon,zIndex:shape.options.zIndex})
            }
        }
        if (includeChildren === true || (shape.options.groupChildShapes && includeChildren !== false)) {
            shape.getChildren(true).forEach(child => {
                if (!child.svg) {
                    child.redraw();
                }
                if (!child.svg && !shape.options.groupChildShapes) {
                    return;
                }
                let child_polygon = child.getShapeSvg().querySelector("path");
                if (child_polygon) {
                    child_polygon = child_polygon.cloneNode();
                    const points = child.points.map(point =>
                        "" + (point.x - pos.left) + "," + (point.y - pos.top)
                    ).join(" ");
                    child_polygon.setAttribute("d", "M "+points+" Z");
                    polygons.push({polygon:child_polygon,zIndex:child.options.zIndex})
                }
            })
        }
        if (!polygons.length) { return }
        polygons.sort((item1,item2) => item1.zIndex-item2.zIndex);
        for (let item of polygons) {
            svg.appendChild(item.polygon)
        }
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
            shape.calcPosition();
            const pos = shape.getPosition(includeChildren || shape.options.groupChildShapes);
            [width, height] = applyAspectRatio(width, height, pos.width, pos.height);
            const svgObj = this.getSvg(shape,includeChildren);
            svgObj.setAttribute("width", pos.width);
            svgObj.setAttribute("height", pos.height);
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
                img.width = pos.width;
                img.height = pos.height;
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
        const parent = shape.getRootParent(true)
        if (parent && parent.svg) {
            return parent.svg
        }
        return shape.svg;
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
