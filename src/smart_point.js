function SmartPoint(shape) {
    this.init = (x,y,options = null) => {
        this.x = x;
        this.y = y;
        this.options = {
            width:10,
            height:10,
            classes: "",
            style: {
                borderWidth:"1px",
                borderStyle:"solid",
                borderColor:"black",
                borderRadius: "25px",
                position:'absolute',
                zIndex:1000,
                cursor:'pointer',
                backgroundColor: "red",
            },
            canDrag: true,
            canDelete: true
        }
        this.shape = shape;
        this.element = this.createPointUI();
        this.setOptions(options);
        this.addEventListeners();
        this.shape.onPointEvent("point_added",this)
        return this;
    }

    this.setOptions = (options) => {
        if (options && typeof(options) === "object") {
            if (options.style && typeof(options.style) === "object") {
                options.style = Object.assign(this.options.style, options.style)
            }
            Object.assign(this.options,options);
        }
        this.element = this.setPointStyles(this.element);
    }

    this.createPointUI = () => {
        const element = document.createElement("div")
        if (!this.shape.options.canDragPoints) {
            return element;
        }
        return this.setPointStyles(element);
    }

    this.setPointStyles = (element) => {
        element.className = this.options.classes;
        element.style = this.options.style;
        if (typeof(this.options.style) === "object") {
            for (let cssName in this.options.style) {
                element.style[cssName] = this.options.style[cssName]
            }
        }
        element.style.width = this.options.width+"px";
        element.style.height = this.options.height+"px";
        element.style.left = (this.x-parseInt(this.options.width/2))+"px";
        element.style.top = (this.y-parseInt(this.options.height/2))+"px";
        return element
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
        if (event.buttons === 1 && this.shape.options.canDragPoints && this.options.canDrag) {
            event.preventDefault = true;
            event.stopPropagation();
            this.shape.onPointEvent("point_dragstart", this);
        }
    }

    this.mousemove = (event) => {
        if (event.buttons !== 1 || !this.shape.options.canDragPoints || !this.options.canDrag) {
            return
        }
        const newX = this.x + event.movementX;
        const newY = this.y + event.movementY;
        const root = this.shape.root;
        if (newX < 0 || newX > root.clientLeft + root.clientWidth) {
            this.shape.onPointEvent("point_drag",this);
            this.shape.draggedPoint = null;
            return;
        }
        if (newY < 0 || newY > root.clientTop + root.clientHeight) {
            this.shape.onPointEvent("point_drag",this);
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
        if (event.button === 2 && this.shape.options.canDeletePoints && this.options.canDelete) {
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

export default SmartPoint;
