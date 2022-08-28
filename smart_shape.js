function l(t) {
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
  }, this.x = 0, this.y = 0, this.element = null, this.init = (i, e, s = null) => (this.x = i, this.y = e, this.shape = t, this.element = this.createPointUI(), this.setOptions(this.shape.options.pointOptions), this.setOptions(s), this.addEventListeners(), this.shape.onPointEvent("point_added", this), this), this.setOptions = (i) => {
    i && typeof i == "object" && (i.style && typeof i.style == "object" && (i.style = Object.assign(this.options.style, i.style)), Object.assign(this.options, i)), this.options.id && (this.element.id = this.options.id), this.shape.options.zIndex && (this.options.zIndex = this.shape.options.zIndex + 1), this.element = this.setPointStyles(this.element);
  }, this.createPointUI = () => {
    const i = document.createElement("div");
    return this.shape.options.canDragPoints ? this.setPointStyles(i) : i;
  }, this.setPointStyles = (i = null) => {
    if (i == null && (i = this.element), !this.shape.options.canDragPoints)
      return i;
    if (this.options.id && (i.id = this.options.id), i.className = this.options.classes, i.style = this.options.style, typeof this.options.style == "object")
      for (let e in this.options.style)
        i.style[e] = this.options.style[e];
    return i.style.width = this.options.width + "px", i.style.height = this.options.height + "px", i.style.left = this.x - parseInt(this.options.width / 2) + "px", i.style.top = this.y - parseInt(this.options.height / 2) + "px", i.style.zIndex = this.options.zIndex, i;
  }, this.redraw = () => {
    this.setPointStyles(), this.element.style.left = this.x - parseInt(this.options.width / 2) + "px", this.element.style.top = this.y - parseInt(this.options.height / 2) + "px";
  }, this.addEventListeners = () => {
    this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown);
  }, this.mousedown = (i) => {
    i.buttons === 1 && this.shape.options.canDragPoints && this.options.canDrag && (i.preventDefault = !0, i.stopPropagation(), this.shape.onPointEvent("point_dragstart", this));
  }, this.mousemove = (i) => {
    if (i.buttons !== 1 || !this.shape.options.canDragPoints || !this.options.canDrag)
      return;
    const e = this.x + i.movementX, s = this.y + i.movementY, o = this.shape.root;
    if (e < 0 || e > o.clientLeft + o.clientWidth) {
      this.shape.onPointEvent("point_drag", this), this.shape.draggedPoint = null;
      return;
    }
    if (s < 0 || s > o.clientTop + o.clientHeight) {
      this.shape.onPointEvent("point_drag", this), this.shape.draggedPoint = null;
      return;
    }
    this.x += i.movementX, this.y += i.movementY, this.element.style.left = this.x - 5 + "px", this.element.style.top = this.y - 5 + "px", this.shape.onPointEvent("point_drag", this);
  }, this.mouseup = (i) => {
    this.shape.onPointEvent("point_dragend", this), i.button === 2 && this.shape.options.canDeletePoints && this.options.canDelete && this.destroy();
  }, this.destroy = () => {
    this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), this.shape.onPointEvent("point_destroyed", this);
  }, this;
}
function d() {
  this.draw = (t) => {
    if (t.svg && (t.root.removeChild(t.svg), t.svg = null), t.points.length < 1)
      return;
    if (t.calcPosition(), t.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), t.svg.id = t.options.id, t.svg.style.position = "absolute", t.svg.style.cursor = "crosshair", t.svg.style.left = t.left, t.svg.style.top = t.top, t.svg.setAttribute("width", t.width), t.svg.setAttribute("height", t.height), t.options.fillImage && typeof (t.options.fillImage === "object")) {
      const e = document.createElementNS(t.svg.namespaceURI, "defs"), s = this.createImageFill(t);
      s && e.appendChild(s), t.svg.appendChild(e);
    } else if (t.options.fillGradient && typeof (t.options.fillGradient === "object") && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1) {
      const e = document.createElementNS(t.svg.namespaceURI, "defs"), s = this.createGradient(t);
      e.appendChild(s), t.svg.appendChild(e);
    }
    t.svg.style.zIndex = t.options.zIndex;
    const i = this.drawPolygon(t);
    t.svg.appendChild(i), t.root.appendChild(t.svg), t.svg.addEventListener("mousedown", t.mousedown), t.points.forEach((e) => {
      e.setOptions(t.options.pointOptions), e.setPointStyles(), e.redraw();
    });
  }, this.drawPolygon = (t) => {
    let i = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    t.points.length > 2 && (i = document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
    const e = t.points.map((s) => "" + (s.x - t.left) + "," + (s.y - t.top)).join(" ");
    if (i.setAttribute("points", e), t.options.stroke && i.setAttribute("stroke", t.options.stroke), t.options.strokeWidth && i.setAttribute("stroke-width", t.options.strokeWidth), t.options.strokeLinecap && i.setAttribute("stroke-linecap", t.options.strokeLinecap), t.options.strokeDasharray && i.setAttribute("stroke-dasharray", t.options.strokeDasharray), t.options.fill && (t.options.fillImage && typeof t.options.fillImage == "object" ? i.setAttribute("fill", 'url("#' + t.guid + '_pattern")') : t.options.fillGradient && typeof (t.options.fillGradient === "object") && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1 ? i.setAttribute("fill", 'url("#' + t.guid + '_gradient")') : i.setAttribute("fill", t.options.fill)), t.options.fillOpacity && i.setAttribute("fill-opacity", t.options.fillOpacity), t.options.classes && i.setAttribute("class", t.options.classes), t.options.style)
      for (let s in t.options.style)
        i.style[s] = t.options.style[s];
    return i.style.zIndex = t.options.zIndex, i;
  }, this.createGradient = (t) => {
    let i = document.createElementNS(t.svg.namespaceURI, "linearGradient");
    const e = t.options.fillGradient;
    e.type === "radial" && (i = document.createElementNS(t.svg.namespaceURI, "radialGradient")), i.id = t.guid + "_gradient";
    let s = !1;
    for (let o in e)
      if (o !== "type") {
        if (o === "steps") {
          s = !0;
          continue;
        }
        i.setAttribute(o, e[o]);
      }
    if (!s)
      return i;
    for (let o of e.steps) {
      const n = document.createElementNS(t.svg.namespaceURI, "stop");
      n.setAttribute("offset", o.offset), n.setAttribute("stop-color", o.stopColor), n.setAttribute("stop-opacity", o.stopOpacity), i.appendChild(n);
    }
    return i;
  }, this.createImageFill = (t) => {
    const i = t.options.fillImage;
    if (!i.href || !i.width || !i.height)
      return console.error("Image HREF, width and height must be specified for Image Fill"), null;
    const e = document.createElementNS(t.svg.namespaceURI, "pattern");
    e.setAttribute("id", t.guid + "_pattern"), e.setAttribute("patternUnits", "userSpaceOnUse");
    for (let o in i)
      o !== "href" && e.setAttribute(o, i[o]);
    const s = document.createElementNS(t.svg.namespaceURI, "image");
    return s.setAttribute("href", i.href), s.setAttribute("width", i.width), s.setAttribute("height", i.height), e.appendChild(s), e;
  };
}
const a = new d(), p = (t, i = !0) => {
  let e = 0, s = 0;
  if (!i)
    return { top: t.offsetTop - t.scrollTop, left: t.offsetLeft - t.scrollLeft };
  for (; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop); )
    e += t.offsetLeft - t.scrollLeft, s += t.offsetTop - t.scrollTop, t = t.offsetParent;
  return { top: s, left: e };
}, f = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
  var i = Math.random() * 16 | 0, e = t == "x" ? i : i & 3 | 8;
  return e.toString(16);
}).replace(/\-/g, "");
function u() {
  this.root = null, this.points = [], this.svg = null, this.options = {
    id: "",
    name: "Unnamed shape",
    maxPoints: -1,
    stroke: "rgb(0,0,0)",
    strokeWidth: "2",
    strokeLinecap: "",
    strokeDasharray: "",
    fill: "none",
    fillGradient: null,
    fillImage: null,
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
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = f(), this.init = (t, i = null, e = null) => {
    if (!t) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    return this.root = t, this.root.style.position = "relative", this.draggedPoint = null, this.root.draggedShape = null, this.setOptions(i), this.addEventListeners(), this.setupPoints(e, this.options.pointOptions), this;
  }, this.setOptions = (t) => {
    t && typeof t == "object" && (t.pointOptions && typeof t.pointOptions == "object" && (t.pointOptions = Object.assign(this.options.pointOptions, t.pointOptions)), t.style && typeof t.style == "object" && (t.style = Object.assign(this.options.style, t.style)), Object.assign(this.options, t));
  }, this.setupPoints = (t, i) => {
    typeof t == "object" && (this.points = [], this.addPoints(t, i));
  }, this.addPoint = (t, i, e = null) => {
    const s = this.putPoint(t, i, e);
    return this.redraw(), s;
  }, this.addPoints = (t, i = null) => {
    !t || typeof t != "object" || (t.forEach((e) => this.putPoint(e[0] + this.options.offsetX, e[1] + this.options.offsetY, i)), this.redraw());
  }, this.putPoint = (t, i, e = null) => {
    if (this.findPoint(t, i))
      return console.error(`Point with x=${t} and y=${i} already exists`), null;
    const s = new l(this).init(t, i, e);
    return this.points.push(s), this.root.appendChild(s.element), s;
  }, this.deletePoint = (t, i) => {
    const e = this.findPoint(t, i);
    e && e.destroy();
  }, this.findPoint = (t, i) => {
    const e = this.points.find((s) => s.x === t && s.y === i);
    return typeof e > "u" || !e ? null : e;
  }, this.onPointEvent = (t, i) => {
    switch (t) {
      case "point_destroyed":
        this.points.splice(this.points.indexOf(i), 1), this.root.removeChild(i.element), this.redraw();
        break;
      case "point_drag":
        this.redraw();
        break;
      case "point_dragstart":
        this.root.draggedShape = this, this.draggedPoint = i;
        break;
      case "point_dragend":
        this.root.draggedShape = null, this.draggedPoint = null;
    }
  }, this.redraw = () => {
    a.draw(this);
  }, this.calcPosition = () => {
    this.left = this.points.map((t) => t.x).reduce((t, i) => i < t ? i : t), this.top = this.points.map((t) => t.y).reduce((t, i) => i < t ? i : t), this.right = this.points.map((t) => t.x).reduce((t, i) => i > t ? i : t), this.bottom = this.points.map((t) => t.y).reduce((t, i) => i > t ? i : t), this.width = this.right - this.left, this.height = this.bottom - this.top;
  }, this.destroy = () => {
    this.points.forEach((t) => {
      this.root.removeChild(t.element);
    }), this.root.removeEventListener("contextmenu", this.nocontextmenu), this.root.removeEventListener("mouseup", this.mouseup), this.points = [], this.redraw();
  }, this.addEventListeners = () => {
    this.root.getAttribute("sh_listeners") !== "true" && (this.root.setAttribute("sh_listeners", "true"), this.root.addEventListener("mousemove", (t) => {
      this.root.draggedShape && this.root.draggedShape.mousemove(t);
    }), this.root.addEventListener("mouseup", this.mouseup), this.root.addEventListener("dblclick", this.doubleclick), this.root.addEventListener("mouseenter", this.mouseenter), this.nocontextmenu = this.root.addEventListener("contextmenu", (t) => t.preventDefault()));
  }, this.mouseup = (t) => {
    t.buttons === 1 && this.options.canAddPoints && !this.draggedPoint && (this.options.maxPoints === -1 || this.points.length < this.options.maxPoints) && this.addPoint(t.clientX - this.root.offsetLeft, t.clientY - this.root.offsetTop), this.root.draggedShape && (this.root.draggedShape.draggedPoint = null, this.root.draggedShape = null);
  }, this.doubleclick = (t) => {
    t.stopPropagation(), this.options.canAddPoints && !this.draggedPoint && (this.options.maxPoints === -1 || this.points.length < this.options.maxPoints) && this.addPoint(t.clientX - this.root.offsetLeft, t.clientY - this.root.offsetTop);
  }, this.mousedown = (t) => {
    this.root.draggedShape = this;
  }, this.mousemove = (t) => {
    if (t.buttons !== 1) {
      this.root.draggedShape && (this.root.draggedShape.draggedPoint = null, this.root.draggedShape = null);
      return;
    }
    if (this.draggedPoint) {
      this.draggedPoint.mousemove(t);
      return;
    }
    if (!this.options.canDragShape)
      return;
    const [i, e] = this.calcMovementOffset(t);
    if (!(i === null || e === null)) {
      for (let s in this.points)
        this.points[s].x += i, this.points[s].y += e, this.points[s].redraw();
      this.redraw();
    }
  }, this.mouseenter = (t) => {
    t.buttons !== 1 && (this.root.draggedShape && (this.root.draggedShape.draggedPoint = null), this.root.draggedShape = null);
  }, this.calcMovementOffset = (t) => {
    this.calcPosition();
    let i = t.movementX, e = t.movementY, s = t.clientX, o = t.clientY;
    const n = this.left + i, h = this.top + e, r = p(this.root, !0);
    return n < 0 || n + this.width > this.root.clientLeft + this.root.clientWidth ? [null, null] : h < 0 || h + this.height > this.root.clientTop + this.root.clientHeight ? [null, null] : (s < n + r.left && (i = s - (n + r.left)), o < h + r.top && (e = o - (h + r.top)), s > n + this.width + r.left && (i = s - (this.width + r.left + this.left)), o > h + this.height + r.right && (e = o - (this.height + r.top + this.top)), [i, e]);
  }, this.getPointsArray = () => {
    let t = [];
    return this.points && typeof this.points == "object" && this.points.length && (t = this.points.map((i) => [i.x, i.y])), t;
  };
}
export {
  u as default
};
