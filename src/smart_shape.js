import SmartPoint from "./smart_point.js";
import {getOffset} from "./utils.js";

function SmartShape() {

    this.init = (root,options=null,points=null) => {
        if (!root) {
            console.error("Root HTML node not specified. Could not create shape.")
            return
        }

        this.root = root;
        this.root.style.position = "relative";
        this.svg = null;
        this.points = [];
        this.draggedPoint = null;
        this.root.draggedShape = null;

        this.setOptions(options);
        this.addEventListeners();
        this.setupPoints(points);

        return this;
    }

    this.setOptions = (options) => {
        this.options = {
            name: "Unnamed shape",
            maxPoints: -1,
            stroke: "rgb(0,0,0)",
            strokeWidth: "2",
            fill: "none",
            canDragPoints: true,
            canAddPoints: false,
            canDeletePoints: false,
            offsetX: 0,
            offsetY: 0
        }
        if (typeof(options) === "object") {
            Object.assign(this.options,options);
        }
    }

    this.addEventListeners = () => {
        if (this.root.getAttribute("sh_listeners") !== "true") {
            this.root.setAttribute("sh_listeners","true");
            this.root.addEventListener("mousemove", (event) => {
                if (this.root.draggedShape) {
                    this.root.draggedShape.mousemove(event);
                }
            })
            this.root.addEventListener("mouseup",this.mouseup);
        }
        this.nocontextmenu = this.root.addEventListener("contextmenu", event => event.preventDefault())
    }

    this.setupPoints = (points) => {
        if (typeof(points) === "object") {
            this.addPoints(points);
        }
    }

    this.addPoint = (x,y) => {
        this.putPoint(x, y);
        this.redraw();
    }

    this.addPoints = (points) => {
        points.forEach(point => this.putPoint(point[0]+this.options.offsetX,point[1]+this.options.offsetY));
        this.redraw();
    }

    this.putPoint = (x,y) => {
        if (this.findPoint(x,y)) {
            console.error(`Point with x=${x} and y=${y} already exists`);
            return null;
        }
        const point = new SmartPoint(this).init(x, y, {})
        this.points.push(point);
        this.root.appendChild(point.element);
        point.addEventListeners();
        return point;
    }

    this.deletePoint = (x,y) => {
        const point = this.findPoint(x,y);
        if (point) {
            point.destroy();
        }
    }

    this.findPoint = (x,y) => {
        const point = this.points.find(point => point.x === x && point.y === y)
        if (typeof(point) === "undefined" || !point) {
            return null;
        }
        return point
    }

    this.onPointEvent = (event_type, point) => {
        switch (event_type) {
            case "point_destroyed":
                this.points.splice(this.points.indexOf(point), 1);
                this.root.removeChild(point.element);
                this.redraw()
                break;
            case "point_drag":
                this.redraw()
                break;
            case "point_dragstart":
                this.root.draggedShape = this;
                this.draggedPoint = point;
                break;
            case "point_dragend":
                this.root.draggedShape = null;
                this.draggedPoint = null;
        }
    }

    this.redraw = () => {
        if (this.svg) {
            this.root.removeChild(this.svg);
            this.svg = null;
        }
        if (this.points.length <= 1) {
            return
        }
        this.calcPosition();
        this.svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        this.svg.style.position = 'absolute';
        this.svg.style.cursor = 'crosshair';
        this.svg.style.left = this.left;
        this.svg.style.top = this.top;
        this.svg.setAttribute("width",this.width);
        this.svg.setAttribute("height",this.height);
        let polygon = document.createElementNS("http://www.w3.org/2000/svg","polyline");
        if (this.points.length > 2) {
            polygon = document.createElementNS("http://www.w3.org/2000/svg","polygon");
        }
        const points = this.points.map(point => ""+(point.x-this.left)+","+(point.y-this.top)).join(" ");
        polygon.setAttribute("points",points);
        polygon.style.stroke = this.options.stroke;
        polygon.style.strokeWidth = this.options.strokeWidth;
        polygon.setAttribute("fill",this.options.fill);
        this.svg.appendChild(polygon);
        this.root.appendChild(this.svg);
        this.svg.addEventListener("mousedown",this.mousedown)
    }

    this.calcPosition = () => {
        this.left = this.points.map(point => point.x).reduce((minx,x) => x < minx ? x : minx);
        this.top = this.points.map(point => point.y).reduce((miny,y) => y < miny ? y : miny);
        this.right = this.points.map(point => point.x).reduce((maxx,x) => x > maxx ? x : maxx);
        this.bottom = this.points.map(point => point.y).reduce((maxy,y) => y > maxy ? y : maxy);
        this.width = this.right-this.left;
        this.height = this.bottom-this.top;
    }

    this.destroy = () => {
        this.points.forEach(point => {
            this.root.removeChild(point.element)
        })
        this.root.removeEventListener("contextmenu",this.nocontextmenu);
        this.root.removeEventListener("mouseup",this.onmouseup);
        this.points = [];
        this.redraw();
    }

    this.mouseup = (event) => {
        if (event.buttons === 1 && this.options.canAddPoints && !this.draggedPoint) {
            if (this.options.maxPoints === -1 || this.points.length < this.options.maxPoints) {
                this.addPoint(event.clientX-this.root.offsetLeft, event.clientY-this.root.offsetTop)
            }
        }
        if (this.root.draggedShape) {
            this.root.draggedShape.draggedPoint = null;
            this.root.draggedShape = null;
        }
    }

    this.mousedown = (event) => {
        this.root.draggedShape = this;
    }

    this.mousemove = (event) => {
        if (event.buttons !== 1) {
            return
        }
        if (this.draggedPoint) {
            this.draggedPoint.mousemove(event);
            return
        }
        const [stepX, stepY] = this.calcMovementOffset(event);
        if (stepX === null || stepY === null) {
            return
        }
        for (let index in this.points) {
            this.points[index].x += stepX;
            this.points[index].y += stepY;
            this.points[index].redrawPoint();
        }
        this.redraw()
    }

    this.calcMovementOffset = (event) => {
        this.calcPosition();
        let stepX = event.movementX;
        let stepY = event.movementY;
        let newX = this.left + stepX;
        const newY = this.top + stepY;
        const offset = getOffset(this.root);
        if (newX < 0 || newX+this.width > this.root.clientLeft + this.root.clientWidth) {
            return [null, null]
        }
        if (newY < 0 || newY+this.height > this.root.clientTop + this.root.clientHeight) {
            return [null, null]
        }
        if (event.clientX<newX+offset.left) {
            stepX = event.clientX - (newX+offset.left);
        }
        if (event.clientY<newY+offset.top) {
            stepY = event.clientY - (newY+offset.top);
        }
        if (event.clientX>newX+this.width+offset.left) {
            stepX = event.clientX -  (this.width+offset.left+this.left);
        }
        if (event.clientY>newY+this.height+offset.right) {
            stepY = event.clientY -  (this.height+offset.top+this.top);
        }
        return [stepX, stepY];
    }
}

export default SmartShape;
