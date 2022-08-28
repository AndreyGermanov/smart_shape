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
        if (shape.svg) {
            shape.root.removeChild(shape.svg);
            shape.svg = null;
        }
        if (shape.points.length < 1) {
            return
        }
        shape.calcPosition();
        shape.svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        shape.svg.ondragstart = function() {
            return false;
        }
        shape.svg.id = shape.options.id;
        shape.svg.style.position = 'absolute';
        shape.svg.style.cursor = 'crosshair';
        shape.svg.style.left = shape.left;
        shape.svg.style.top = shape.top;
        shape.svg.setAttribute("width",shape.width);
        shape.svg.setAttribute("height",shape.height);
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
        shape.svg.style.zIndex = shape.options.zIndex;
        const polygon = this.drawPolygon(shape);
        shape.svg.appendChild(polygon);
        shape.root.appendChild(shape.svg);
        shape.svg.addEventListener("mousedown",shape.mousedown)
        shape.points.forEach(point => {
            point.setOptions(shape.options.pointOptions);
            point.setPointStyles();
            point.redraw();
        })
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
            polygon.setAttribute("fill-opacity",shape.options.fillOpacity);
        }
        if (shape.options.classes) {
            polygon.setAttribute("class",shape.options.classes);
        }
        if (shape.options.style) {
            for (let cssName in shape.options.style) {
                polygon.style[cssName] = shape.options.style[cssName]
            }
        }
        polygon.style.zIndex = shape.options.zIndex;
        return polygon;
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
}

export default new SmartShapeDrawHelper();
