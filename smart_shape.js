function h(t) {
  return this.init = (s, i, e = null) => (this.x = s, this.y = i, this.options = {
    width: 5,
    height: 5,
    cssClass: "",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 25,
    backgroundColor: "red"
  }, typeof e == "object" && Object.assign(this.options, e), this.shape = t, this.element = this.createPointUI(), this.addEventListeners(), this.shape.onPointEvent("point_added", this), this), this.createPointUI = () => {
    const s = document.createElement("div");
    return this.shape.options.canDragPoints && (s.className = this.options.cssClass, s.style.width = this.options.width + "px", s.style.height = this.options.height + "px", s.style.cursor = "pointer", s.style.borderColor = this.options.borderColor, s.style.borderWidth = this.options.borderWidth + "px", s.style.borderStyle = this.options.borderStyle, s.style.borderRadius = this.options.borderRadius + "px", s.style.backgroundColor = this.options.backgroundColor, s.style.position = "absolute", s.style.zIndex = "1000", s.style.left = this.x - parseInt(this.options.width / 2) + "px", s.style.top = this.y - parseInt(this.options.height / 2) + "px"), s;
  }, this.redrawPoint = () => {
    this.element.style.left = this.x - parseInt(this.options.width / 2) + "px", this.element.style.top = this.y - parseInt(this.options.height / 2) + "px";
  }, this.addEventListeners = () => {
    this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown);
  }, this.mousedown = (s) => {
    s.buttons === 1 && this.shape.options.canDragPoints && (s.preventDefault = !0, s.stopPropagation(), this.shape.onPointEvent("point_dragstart", this));
  }, this.mousemove = (s) => {
    if (s.buttons !== 1 || !this.shape.options.canDragPoints)
      return;
    const i = this.x + s.movementX, e = this.y + s.movementY, o = this.shape.root;
    if (i < 0 || i > o.clientLeft + o.clientWidth) {
      this.shape.draggedPoint = null;
      return;
    }
    if (e < 0 || e > o.clientTop + o.clientHeight) {
      this.shape.draggedPoint = null;
      return;
    }
    this.x += s.movementX, this.y += s.movementY, this.element.style.left = this.x - 5 + "px", this.element.style.top = this.y - 5 + "px", this.shape.onPointEvent("point_drag", this);
  }, this.mouseup = (s) => {
    this.shape.onPointEvent("point_dragend", this), s.preventDefault = !0, s.stopPropagation(), s.buttons === 2 && this.shape.options.canDeletePoints && this.destroy();
  }, this.destroy = () => {
    this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), this.shape.onPointEvent("point_destroyed", this);
  }, this;
}
const r = (t) => {
  let s = 0, i = 0;
  for (; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop); )
    s += t.offsetLeft - t.scrollLeft, i += t.offsetTop - t.scrollTop, t = t.offsetParent;
  return { top: i, left: s };
};
function d() {
  this.init = (t, s = null, i = null) => {
    if (!t) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    return this.root = t, this.root.style.position = "relative", this.svg = null, this.points = [], this.draggedPoint = null, this.root.draggedShape = null, this.setOptions(s), this.addEventListeners(), this.setupPoints(i), this;
  }, this.setOptions = (t) => {
    this.options = {
      name: "Unnamed shape",
      maxPoints: -1,
      stroke: "rgb(0,0,0)",
      strokeWidth: "2",
      fill: "none",
      canDragPoints: !0,
      canAddPoints: !1,
      canDeletePoints: !1,
      offsetX: 0,
      offsetY: 0
    }, typeof t == "object" && Object.assign(this.options, t);
  }, this.addEventListeners = () => {
    this.root.getAttribute("sh_listeners") !== "true" && (this.root.setAttribute("sh_listeners", "true"), this.root.addEventListener("mousemove", (t) => {
      this.root.draggedShape && this.root.draggedShape.mousemove(t);
    }), this.root.addEventListener("mouseup", this.mouseup)), this.nocontextmenu = this.root.addEventListener("contextmenu", (t) => t.preventDefault());
  }, this.setupPoints = (t) => {
    typeof t == "object" && this.addPoints(t);
  }, this.addPoint = (t, s) => {
    const i = this.putPoint(t, s);
    return this.redraw(), i;
  }, this.addPoints = (t) => {
    t.forEach((s) => this.putPoint(s[0] + this.options.offsetX, s[1] + this.options.offsetY)), this.redraw();
  }, this.putPoint = (t, s) => {
    if (this.findPoint(t, s))
      return console.error(`Point with x=${t} and y=${s} already exists`), null;
    const i = new h(this).init(t, s, {});
    return this.points.push(i), this.root.appendChild(i.element), i.addEventListeners(), i;
  }, this.deletePoint = (t, s) => {
    const i = this.findPoint(t, s);
    i && i.destroy();
  }, this.findPoint = (t, s) => {
    const i = this.points.find((e) => e.x === t && e.y === s);
    return typeof i > "u" || !i ? null : i;
  }, this.onPointEvent = (t, s) => {
    switch (t) {
      case "point_destroyed":
        this.points.splice(this.points.indexOf(s), 1), this.root.removeChild(s.element), this.redraw();
        break;
      case "point_drag":
        this.redraw();
        break;
      case "point_dragstart":
        this.root.draggedShape = this, this.draggedPoint = s;
        break;
      case "point_dragend":
        this.root.draggedShape = null, this.draggedPoint = null;
    }
  }, this.redraw = () => {
    if (this.svg && (this.root.removeChild(this.svg), this.svg = null), this.points.length <= 1)
      return;
    this.calcPosition(), this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.svg.style.position = "absolute", this.svg.style.cursor = "crosshair", this.svg.style.left = this.left, this.svg.style.top = this.top, this.svg.setAttribute("width", this.width), this.svg.setAttribute("height", this.height);
    let t = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    this.points.length > 2 && (t = document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
    const s = this.points.map((i) => "" + (i.x - this.left) + "," + (i.y - this.top)).join(" ");
    t.setAttribute("points", s), t.style.stroke = this.options.stroke, t.style.strokeWidth = this.options.strokeWidth, t.setAttribute("fill", this.options.fill), this.svg.appendChild(t), this.root.appendChild(this.svg), this.svg.addEventListener("mousedown", this.mousedown);
  }, this.calcPosition = () => {
    this.left = this.points.map((t) => t.x).reduce((t, s) => s < t ? s : t), this.top = this.points.map((t) => t.y).reduce((t, s) => s < t ? s : t), this.right = this.points.map((t) => t.x).reduce((t, s) => s > t ? s : t), this.bottom = this.points.map((t) => t.y).reduce((t, s) => s > t ? s : t), this.width = this.right - this.left, this.height = this.bottom - this.top;
  }, this.destroy = () => {
    this.points.forEach((t) => {
      this.root.removeChild(t.element);
    }), this.root.removeEventListener("contextmenu", this.nocontextmenu), this.root.removeEventListener("mouseup", this.onmouseup), this.points = [], this.redraw();
  }, this.mouseup = (t) => {
    t.buttons === 1 && this.options.canAddPoints && !this.draggedPoint && (this.options.maxPoints === -1 || this.points.length < this.options.maxPoints) && this.addPoint(t.clientX - this.root.offsetLeft, t.clientY - this.root.offsetTop), this.root.draggedShape && (this.root.draggedShape.draggedPoint = null, this.root.draggedShape = null);
  }, this.mousedown = (t) => {
    this.root.draggedShape = this;
  }, this.mousemove = (t) => {
    if (t.buttons !== 1)
      return;
    if (this.draggedPoint) {
      this.draggedPoint.mousemove(t);
      return;
    }
    const [s, i] = this.calcMovementOffset(t);
    if (!(s === null || i === null)) {
      for (let e in this.points)
        this.points[e].x += s, this.points[e].y += i, this.points[e].redrawPoint();
      this.redraw();
    }
  }, this.calcMovementOffset = (t) => {
    this.calcPosition();
    let s = t.movementX, i = t.movementY, e = this.left + s;
    const o = this.top + i, n = r(this.root);
    return e < 0 || e + this.width > this.root.clientLeft + this.root.clientWidth ? [null, null] : o < 0 || o + this.height > this.root.clientTop + this.root.clientHeight ? [null, null] : (t.clientX < e + n.left && (s = t.clientX - (e + n.left)), t.clientY < o + n.top && (i = t.clientY - (o + n.top)), t.clientX > e + this.width + n.left && (s = t.clientX - (this.width + n.left + this.left)), t.clientY > o + this.height + n.right && (i = t.clientY - (this.height + n.top + this.top)), [s, i]);
  };
}
export {
  d as default
};
