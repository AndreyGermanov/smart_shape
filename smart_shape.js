function p(t) {
  return this.shape = null, this.options = {
    id: "",
    width: 10,
    height: 10,
    classes: "",
    style: {
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "black",
      borderRadius: "25px",
      position: "absolute",
      cursor: "pointer",
      backgroundColor: "red"
    },
    canDrag: !0,
    canDelete: !0,
    zIndex: 1e3
  }, this.x = 0, this.y = 0, this.element = null, this.init = (s, i, e = null) => (this.x = s, this.y = i, this.shape = t, this.element = this.createPointUI(), this.setOptions(this.shape.options.pointOptions), this.setOptions(e), this.addEventListeners(), this.shape.onPointEvent("point_added", this), this), this.setOptions = (s) => {
    s && typeof s == "object" && (s.style && typeof s.style == "object" && (s.style = Object.assign(this.options.style, s.style)), Object.assign(this.options, s)), this.options.id && (this.element.id = this.options.id), this.shape.options.zIndex && (this.options.zIndex = this.shape.options.zIndex), this.element = this.setPointStyles(this.element);
  }, this.createPointUI = () => {
    const s = document.createElement("div");
    return this.shape.options.canDragPoints ? this.setPointStyles(s) : s;
  }, this.setPointStyles = (s = null) => {
    if (s == null && (s = this.element), this.options.id && (s.id = this.options.id), s.className = this.options.classes, s.style = this.options.style, typeof this.options.style == "object")
      for (let i in this.options.style)
        s.style[i] = this.options.style[i];
    return s.style.width = this.options.width + "px", s.style.height = this.options.height + "px", s.style.left = this.x - parseInt(this.options.width / 2) + "px", s.style.top = this.y - parseInt(this.options.height / 2) + "px", s.style.zIndex = this.options.zIndex + 1, s;
  }, this.redraw = () => {
    this.setPointStyles(), this.element.style.left = this.x - parseInt(this.options.width / 2) + "px", this.element.style.top = this.y - parseInt(this.options.height / 2) + "px";
  }, this.addEventListeners = () => {
    this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown);
  }, this.mousedown = (s) => {
    s.buttons === 1 && this.shape.options.canDragPoints && this.options.canDrag && (s.preventDefault = !0, s.stopPropagation(), this.shape.onPointEvent("point_dragstart", this));
  }, this.mousemove = (s) => {
    if (s.buttons !== 1 || !this.shape.options.canDragPoints || !this.options.canDrag)
      return;
    const i = this.x + s.movementX, e = this.y + s.movementY, o = this.shape.root;
    if (i < 0 || i > o.clientLeft + o.clientWidth) {
      this.shape.onPointEvent("point_drag", this), this.shape.draggedPoint = null;
      return;
    }
    if (e < 0 || e > o.clientTop + o.clientHeight) {
      this.shape.onPointEvent("point_drag", this), this.shape.draggedPoint = null;
      return;
    }
    this.x += s.movementX, this.y += s.movementY, this.element.style.left = this.x - 5 + "px", this.element.style.top = this.y - 5 + "px", this.shape.onPointEvent("point_drag", this);
  }, this.mouseup = (s) => {
    this.shape.onPointEvent("point_dragend", this), s.button === 2 && this.shape.options.canDeletePoints && this.options.canDelete && this.destroy();
  }, this.destroy = () => {
    this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), this.shape.onPointEvent("point_destroyed", this);
  }, this;
}
const l = (t, s = !0) => {
  let i = 0, e = 0;
  if (!s)
    return { top: t.offsetTop - t.scrollTop, left: t.offsetLeft - t.scrollLeft };
  for (; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop); )
    i += t.offsetLeft - t.scrollLeft, e += t.offsetTop - t.scrollTop, t = t.offsetParent;
  return { top: e, left: i };
};
function a() {
  this.root = null, this.points = [], this.svg = null, this.options = {
    id: "",
    name: "Unnamed shape",
    maxPoints: -1,
    stroke: "rgb(0,0,0)",
    strokeWidth: "2",
    strokeLinecap: "",
    strokeDasharray: "",
    fill: "none",
    fillOpacity: "1",
    canDragShape: !0,
    canDragPoints: !0,
    canAddPoints: !1,
    canDeletePoints: !1,
    offsetX: 0,
    offsetY: 0,
    classes: "",
    style: {},
    pointOptions: {},
    zIndex: 1e3
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.init = (t, s = null, i = null) => {
    if (!t) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    return this.root = t, this.root.style.position = "relative", this.draggedPoint = null, this.root.draggedShape = null, this.setOptions(s), this.addEventListeners(), this.setupPoints(i, this.options.pointOptions), this;
  }, this.setOptions = (t) => {
    t && typeof t == "object" && (t.pointOptions && typeof t.pointOptions == "object" && (t.pointOptions = Object.assign(this.options.pointOptions, t.pointOptions)), t.style && typeof t.style == "object" && (t.style = Object.assign(this.options.style, t.style)), Object.assign(this.options, t));
  }, this.addEventListeners = () => {
    this.root.getAttribute("sh_listeners") !== "true" && (this.root.setAttribute("sh_listeners", "true"), this.root.addEventListener("mousemove", (t) => {
      this.root.draggedShape && this.root.draggedShape.mousemove(t);
    }), this.root.addEventListener("mouseup", this.mouseup), this.root.addEventListener("dblclick", this.doubleclick)), this.nocontextmenu = this.root.addEventListener("contextmenu", (t) => t.preventDefault());
  }, this.setupPoints = (t, s) => {
    typeof t == "object" && (this.points = [], this.addPoints(t, s));
  }, this.addPoint = (t, s, i = null) => {
    const e = this.putPoint(t, s, i);
    return this.redraw(), e;
  }, this.addPoints = (t, s = null) => {
    !t || typeof t != "object" || (t.forEach((i) => this.putPoint(i[0] + this.options.offsetX, i[1] + this.options.offsetY, s)), this.redraw());
  }, this.putPoint = (t, s, i = null) => {
    if (this.findPoint(t, s))
      return console.error(`Point with x=${t} and y=${s} already exists`), null;
    const e = new p(this).init(t, s, i);
    return this.points.push(e), this.root.appendChild(e.element), e;
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
    if (this.svg && (this.root.removeChild(this.svg), this.svg = null), this.points.length < 1)
      return;
    this.calcPosition(), this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.svg.id = this.options.id, this.svg.style.position = "absolute", this.svg.style.cursor = "crosshair", this.svg.style.left = this.left, this.svg.style.top = this.top, this.svg.setAttribute("width", this.width), this.svg.setAttribute("height", this.height);
    let t = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    this.points.length > 2 && (t = document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
    const s = this.points.map((i) => "" + (i.x - this.left) + "," + (i.y - this.top)).join(" ");
    if (t.setAttribute("points", s), this.options.stroke && t.setAttribute("stroke", this.options.stroke), this.options.strokeWidth && t.setAttribute("stroke-width", this.options.strokeWidth), this.options.strokeLinecap && t.setAttribute("stroke-linecap", this.options.strokeLinecap), this.options.strokeDasharray && t.setAttribute("stroke-dasharray", this.options.strokeDasharray), this.options.fill && t.setAttribute("fill", this.options.fill), this.options.fillOpacity && t.setAttribute("fill-opacity", this.options.fillOpacity), this.options.classes && t.setAttribute("class", this.options.classes), this.options.style)
      for (let i in this.options.style)
        t.style[i] = this.options.style[i];
    t.style.zIndex = this.options.zIndex, this.svg.style.zIndex = this.options.zIndex, this.svg.appendChild(t), this.root.appendChild(this.svg), this.svg.addEventListener("mousedown", this.mousedown), this.points.forEach((i) => {
      i.setOptions(this.options.pointOptions), i.setPointStyles(), i.redraw();
    });
  }, this.set, this.calcPosition = () => {
    this.left = this.points.map((t) => t.x).reduce((t, s) => s < t ? s : t), this.top = this.points.map((t) => t.y).reduce((t, s) => s < t ? s : t), this.right = this.points.map((t) => t.x).reduce((t, s) => s > t ? s : t), this.bottom = this.points.map((t) => t.y).reduce((t, s) => s > t ? s : t), this.width = this.right - this.left, this.height = this.bottom - this.top;
  }, this.destroy = () => {
    this.points.forEach((t) => {
      this.root.removeChild(t.element);
    }), this.root.removeEventListener("contextmenu", this.nocontextmenu), this.root.removeEventListener("mouseup", this.mouseup), this.points = [], this.redraw();
  }, this.mouseup = (t) => {
    t.buttons === 1 && this.options.canAddPoints && !this.draggedPoint && (this.options.maxPoints === -1 || this.points.length < this.options.maxPoints) && this.addPoint(t.clientX - this.root.offsetLeft, t.clientY - this.root.offsetTop), this.root.draggedShape && (this.root.draggedShape.draggedPoint = null, this.root.draggedShape = null);
  }, this.doubleclick = (t) => {
    t.stopPropagation(), this.options.canAddPoints && !this.draggedPoint && (this.options.maxPoints === -1 || this.points.length < this.options.maxPoints) && this.addPoint(t.clientX - this.root.offsetLeft, t.clientY - this.root.offsetTop);
  }, this.mousedown = (t) => {
    this.root.draggedShape = this;
  }, this.mousemove = (t) => {
    if (t.buttons !== 1)
      return;
    if (this.draggedPoint) {
      this.draggedPoint.mousemove(t);
      return;
    }
    if (!this.options.canDragShape)
      return;
    const [s, i] = this.calcMovementOffset(t);
    if (!(s === null || i === null)) {
      for (let e in this.points)
        this.points[e].x += s, this.points[e].y += i, this.points[e].redraw();
      this.redraw();
    }
  }, this.calcMovementOffset = (t) => {
    this.calcPosition();
    let s = t.movementX, i = t.movementY, e = t.clientX, o = t.clientY;
    const h = this.left + s, r = this.top + i, n = l(this.root, !0);
    return h < 0 || h + this.width > this.root.clientLeft + this.root.clientWidth ? [null, null] : r < 0 || r + this.height > this.root.clientTop + this.root.clientHeight ? [null, null] : (e < h + n.left && (s = e - (h + n.left)), o < r + n.top && (i = o - (r + n.top)), e > h + this.width + n.left && (s = e - (this.width + n.left + this.left)), o > r + this.height + n.right && (i = o - (this.height + n.top + this.top)), [s, i]);
  }, this.getPointsArray = () => {
    let t = [];
    return this.points && typeof this.points == "object" && this.points.length && (t = this.points.map((s) => [s.x, s.y])), t;
  };
}
export {
  a as default
};
