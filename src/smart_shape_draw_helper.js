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
        if (shape.points.length < 1) {
            return
        }
        if (shape.svg) {
            shape.root.removeChild(shape.svg);
            shape.svg = null;
        }
        shape.calcPosition();
        shape.svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        shape.svg.ondragstart = function() { return false; }
        shape.svg.id = shape.options.id;
        shape.svg.style.position = 'absolute';
        shape.svg.style.cursor = 'crosshair';
        shape.svg.style.left = shape.left;
        shape.svg.style.top = shape.top;
        shape.svg.setAttribute("width",shape.width);
        shape.svg.setAttribute("height",shape.height);
        this.setupShapeFill(shape);
        this.setupSVGFilters(shape);
        shape.svg.style.zIndex = shape.options.zIndex;
        const polygon = this.drawPolygon(shape);
        shape.svg.appendChild(polygon);
        shape.root.appendChild(shape.svg);
        shape.svg.addEventListener("mousedown",shape.eventListener.mousedown)
        shape.svg_mouseenter = shape.svg.addEventListener("mouseenter",shape.eventListener.mouseenter)
        if (!shape.options.visible) {
            shape.svg.style.display = 'none';
        }
        shape.points.forEach(point => {
            point.options.zIndex = shape.options.zIndex+1;
            if (!shape.options.visible) {
                point.options.visible = false;
            }
            point.redraw()
        });
        if (shape.resizeBox) {
            this.redrawResizeBox(shape);
        }
    }

    /**
     * @ignore
     * Method that used to construct actual shape SVG polygon during shape redraw process
     * @param shape {SmartShape} Shape object to which polygon should be appended
     * @returns {object} SVG <polygon> object
     */
    this.drawPolygon = (shape) => {
        let polygon = document.createElementNS("http://www.w3.org/2000/svg","polyline");
        if (shape.points.length > 2) {
            polygon = document.createElementNS("http://www.w3.org/2000/svg","polygon");
        }
        const points = shape.points.map(point => ""+(point.x-shape.left)+","+(point.y-shape.top)).join(" ");
        polygon.setAttribute("points",points);
        this.setupPolygonStroke(shape,polygon);
        this.setupPolygonFill(shape,polygon);
        this.setupPolygonStyles(shape,polygon);
        if (shape.svg.querySelector("defs") && shape.svg.querySelector("defs").querySelector("filter")) {
            polygon.style.filter ='url("#'+shape.guid+'_filter")';
        }
        polygon.style.zIndex = shape.options.zIndex;
        return polygon;
    }

    /**
     * @ignore
     * If shape scaling feature is enabled, this method
     * redraws [ResizeBox](#ResizeBox) around it after redrawing the shape
     * @param shape {SmartShape} Shape object
     */
    this.redrawResizeBox = (shape) => {
        const bounds = shape.getResizeBoxBounds();
        shape.resizeBox.left = bounds.left;
        shape.resizeBox.top = bounds.top;
        shape.resizeBox.width = bounds.width;
        shape.resizeBox.height = bounds.height;
        shape.resizeBox.redraw();
    }

    /**
     * @ignore
     * Used to setup fill of shape depending on provided options: color fill, gradient fill or image fill
     * @param shape {SmartShape} Shape for which gradient should be created
     */
    this.setupShapeFill = (shape) => {
        if (shape.options.fillImage && typeof(shape.options.fillImage === "object")) {
            const defs = document.createElementNS(shape.svg.namespaceURI,"defs");
            const pattern = this.createImageFill(shape);
            if (pattern) {
                defs.appendChild(pattern)
            }
            shape.svg.appendChild(defs);
        } else if (shape.options.fillGradient && typeof(shape.options.fillGradient === "object") &&
            ["linear","radial"].indexOf(shape.options.fillGradient.type) !== -1) {
            const defs = document.createElementNS(shape.svg.namespaceURI,"defs");
            const gradient = this.createGradient(shape);
            defs.appendChild(gradient);
            shape.svg.appendChild(defs);
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
        let gradient = document.createElementNS(shape.svg.namespaceURI,"linearGradient");
        const gradientOptions = shape.options.fillGradient;
        if (gradientOptions.type === "radial") {
            gradient = document.createElementNS(shape.svg.namespaceURI,"radialGradient");
        }
        gradient.id = shape.guid+"_gradient";
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
            const stepNode = document.createElementNS(shape.svg.namespaceURI,"stop");
            stepNode.setAttribute("offset",step.offset);
            stepNode.setAttribute("stop-color",step.stopColor);
            stepNode.setAttribute("stop-opacity",step.stopOpacity);
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
        const pattern = document.createElementNS(shape.svg.namespaceURI, "pattern");
        pattern.setAttribute("id",shape.guid+"_pattern");
        pattern.setAttribute("patternUnits","userSpaceOnUse");
        for (let index in imageFillOptions) {
            if (index === "href") {
                continue;
            }
            pattern.setAttribute(index,imageFillOptions[index])
        }
        const image = document.createElementNS(shape.svg.namespaceURI, "image");
        image.setAttribute("href",imageFillOptions.href);
        image.setAttribute("width",imageFillOptions.width);
        image.setAttribute("height",imageFillOptions.height);
        pattern.appendChild(image);
        return pattern;
    }

    /**
     * @ignore
     * Method used to create and add SVG filters to SVG definitions, if the filters provided in options.
     * @param shape {SmartShape} shape object to apply filter to
     */
    this.setupSVGFilters = (shape) => {
        if (shape.options.filters && typeof(shape.options.filters) === "object" && Object.keys(shape.options.filters).length) {
            let defs = shape.svg.querySelector("defs");
            if (!defs) {
                defs = document.createElementNS(shape.svg.namespaceURI,"defs");
                shape.svg.appendChild(defs);
            }
            const filters = this.createSVGFilters(shape);
            defs.append(filters);
        }
    }

    /**
     * @ignore
     * Method used to apply SVG filter to the shape, if `filters` options specified in
     * options of SmartShape.
     * @param shape {SmartShape} shape object to apply filter to
     * @returns {SVGFilterElement} Constructed filter element with set of filters
     */
    this.createSVGFilters = (shape) => {
        const filters = document.createElementNS(shape.svg.namespaceURI,"filter");
        filters.setAttribute("id",shape.guid+"_filter");
        for (let filterName in shape.options.filters) {
            const filter = this.createSVGFilter(shape,filterName,shape.options.filters[filterName]);
            filters.appendChild(filter);
        }
        return filters;
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
        for (let attribute in filterOptions) {
            let html_attribute = attribute;

            filter.setAttribute(html_attribute,filterOptions[attribute].toString());
            if (attribute === "dx") {
                shape.svg.setAttribute("width",shape.width + parseInt(filterOptions["dx"])*2);
            }
            if (attribute === "dy") {
                shape.svg.setAttribute("height",shape.height + parseInt(filterOptions["dy"])*2);
            }
        }
        return filter;
    }

    /**
     * @ignore
     * Method used to setup stroke params of shape polygon
     * @param shape {SmartShape} Shape object
     * @param polygon {SVGPolygonElement} Polygon element to setup
     */
    this.setupPolygonStroke = (shape,polygon) => {
        if (shape.options.stroke) {
            polygon.setAttribute("stroke", shape.options.stroke);
        }
        if (shape.options.strokeWidth) {
            polygon.setAttribute("stroke-width",shape.options.strokeWidth);
        }
        if (shape.options.strokeLinecap) {
            polygon.setAttribute("stroke-linecap",shape.options.strokeLinecap);
        }
        if (shape.options.strokeDasharray) {
            polygon.setAttribute("stroke-dasharray",shape.options.strokeDasharray);
        }
    }

    /**
     * @ignore
     * Method used to set up fill params of shape polygon
     * @param shape {SmartShape} Shape object
     * @param polygon {SVGPolygonElement} Polygon element to setup
     */
    this.setupPolygonFill = (shape, polygon) => {
        if (shape.options.fill) {
            if (shape.options.fillImage && typeof(shape.options.fillImage) === "object") {
                polygon.setAttribute("fill",'url("#'+shape.guid+'_pattern'+'")');
            }  else if (shape.options.fillGradient && typeof(shape.options.fillGradient === "object") &&
                ["linear","radial"].indexOf(shape.options.fillGradient.type) !== -1) {
                polygon.setAttribute("fill",'url("#'+shape.guid+'_gradient'+'")');
            } else {
                polygon.setAttribute("fill", shape.options.fill);
            }
        }
        if (shape.options.fillOpacity) {
            polygon.setAttribute("fill-opacity", shape.options.fillOpacity);
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
        if (shape.options.style) {
            for (let cssName in shape.options.style) {
                polygon.style[cssName] = shape.options.style[cssName]
            }
        }
    }

}

export default new SmartShapeDrawHelper();
