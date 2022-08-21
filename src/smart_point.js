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
        if (event.buttons === 1 && this.shape.options.canDragPoints) {
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
        if (event.buttons === 2 && this.shape.options.canDeletePoints) {
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
