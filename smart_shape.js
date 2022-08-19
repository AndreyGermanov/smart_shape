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
        this.dragStarted = false;

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

        this.onmousemove = this.root.addEventListener("mousemove",(event) => {
            if (this.draggedPoint) {
                this.draggedPoint.mousemove(event);
            } else if (this.dragStarted) {
                this.mousemove(event)
            }
        })

        this.nocontextmenu = this.root.addEventListener("contextmenu", event => event.preventDefault())

        this.onmouseup = this.root.addEventListener("mouseup",this.mouseup);

        if (typeof(points) === "object") {
            this.addPoints(points);
        }

        return this;
    }

    this.addPoint = (x,y) => {
        this.putPoint(x, y);
        this.drawPolygon();
    }

    this.addPoints = (points) => {
        points.forEach(point => this.putPoint(point[0]+this.options.offsetX,point[1]+this.options.offsetY));
        this.drawPolygon();
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
                this.drawPolygon()
                break;
            case "point_drag":
                this.drawPolygon()
                break;
            case "point_dragstart":
                this.draggedPoint = point;
                break;
            case "point_dragend":
                this.draggedPoint = null;
        }
    }

    this.drawPolygon = () => {
        if (this.svg) {
            this.root.removeChild(this.svg);
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
        this.root.removeEventListener("mousemove",this.onmousemove);
        this.root.removeEventListener("contextmenu",this.nocontextmenu);
        this.root.removeEventListener("mouseup",this.onmouseup);
        this.points = [];
        this.drawPolygon();
    }

    this.mouseup = (event) => {
        if (event.button === 0 && this.options.canAddPoints && !this.draggedPoint) {
            if (this.options.maxPoints === -1 || this.points.length < this.options.maxPoints) {
                this.addPoint(event.clientX-this.root.offsetLeft, event.clientY-this.root.offsetTop)
            }
        }
        this.dragStarted = false;
        this.draggedPoint = null;
    }

    this.mousedown = (event) => {
        this.dragStarted = true;
    }

    this.mousemove = (event) => {
        if (event.buttons !== 1) {
            return
        }
        this.calcPosition()
        const newX = this.left + event.movementX;
        const newY = this.top + event.movementY;
        if (newX < 0 || newX > this.root.clientLeft + this.root.clientWidth) {
            return
        }
        if (newY < 0 || newY > this.root.clientTop + this.root.clientHeight) {
            return
        }
        for (let index in this.points) {
            this.points[index].x += event.movementX;
            this.points[index].y += event.movementY;
            this.points[index].redrawPoint();
        }
        this.drawPolygon()
    }
}

function SmartPoint(shape) {
    this.init = (x,y,options = null) => {
        this.x = x;
        this.y = y;
        this.options = {
            width:5,
            height:5,
            cssClass:"",
            borderColor: 'black',
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: 25,
            backgroundColor: 'red',
        }
        if (typeof(options) === "object") {
            Object.assign(this.options,options);
        }
        this.shape = shape;
        this.element = this.createPointUI();
        this.addEventListeners();
        this.shape.onPointEvent("point_added",this)
        return this;
    }

    this.createPointUI = () => {
        const element = document.createElement("div")
        if (!this.shape.options.canDragPoints) {
            return element;
        }
        element.className = this.options.cssClass;
        element.style.width = this.options.width+"px";
        element.style.height = this.options.height+"px";
        element.style.cursor = 'pointer';
        element.style.borderColor = this.options.borderColor;
        element.style.borderWidth = this.options.borderWidth+"px";
        element.style.borderStyle = this.options.borderStyle;
        element.style.borderRadius = this.options.borderRadius+"px";
        element.style.backgroundColor = this.options.backgroundColor;
        element.style.position = 'absolute';
        element.style.zIndex = '1000';
        element.style.left = (this.x-parseInt(this.options.width/2))+"px";
        element.style.top = (this.y-parseInt(this.options.height/2))+"px";
        return element;
    }

    this.redrawPoint =() => {
        this.element.style.left = (this.x-parseInt(this.options.width/2))+"px";
        this.element.style.top = (this.y-parseInt(this.options.height/2))+"px";

    }

    this.addEventListeners = () => {
        this.element.addEventListener("mouseup",this.mouseup)
        this.element.addEventListener("mousedown", this.mousedown)
    }

    this.mousedown = (event) => {
        if (event.button === 0 && this.shape.options.canDragPoints) {
            event.preventDefault = true;
            event.stopPropagation();
            this.shape.onPointEvent("point_dragstart", this);
        }
    }

    this.mousemove = (event) => {
        if (event.buttons !== 1 || !this.shape.options.canDragPoints) {
            return
        }
        const newX = this.x + event.movementX;
        const newY = this.y + event.movementY;

        const root = this.shape.root;

        if (newX < 0 || newX > root.clientLeft + root.clientWidth) {
            this.shape.draggedPoint = null;
            return;
        }
        if (newY < 0 || newY > root.clientTop + root.clientHeight) {
            this.shape.draggedPoint = null;
            return;
        }
        this.x += event.movementX;
        this.y += event.movementY;
        this.element.style.left = (this.x-5)+"px";
        this.element.style.top = (this.y-5)+"px";
        this.shape.onPointEvent("point_drag",this);
    }

    this.mouseup = (event) => {
        this.shape.onPointEvent("point_dragend", this);
        event.preventDefault = true;
        event.stopPropagation();
        if (event.button === 2 && this.shape.options.canDeletePoints) {
            this.destroy();
        }
    }

    this.destroy = () => {
        this.element.removeEventListener("mouseup",this.mouseup)
        this.element.removeEventListener("mousedown", this.mousedown)
        this.shape.onPointEvent("point_destroyed",this)
    }

    return this;
}
