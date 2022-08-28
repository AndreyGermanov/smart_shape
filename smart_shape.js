const p = (t, e = !0) => {
  let i = 0, s = 0;
  if (!e)
    return { top: t.offsetTop - t.scrollTop, left: t.offsetLeft - t.scrollLeft };
  for (; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop); )
    i += t.offsetLeft - t.scrollLeft, s += t.offsetTop - t.scrollTop, t = t.offsetParent;
  return { top: s, left: i };
}, l = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
  var e = Math.random() * 16 | 0, i = t == "x" ? e : e & 3 | 8;
  return i.toString(16);
}).replace(/\-/g, "");
function d(t) {
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
  }, this.x = 0, this.y = 0, this.element = null, this.init = (e, i, s = null) => (this.x = e, this.y = i, this.shape = t, this.element = this.createPointUI(), this.setOptions(this.shape.options.pointOptions), this.setOptions(s), this.addEventListeners(), this.shape.onPointEvent || (this.shape.onPointEvent = () => {
  }), this.shape.onPointEvent("point_added", this), this), this.setOptions = (e) => {
    e && typeof e == "object" && (e.style && typeof e.style == "object" && (e.style = Object.assign(this.options.style, e.style)), Object.assign(this.options, e)), this.options.id && (this.element.id = this.options.id), this.shape.options.zIndex && (this.options.zIndex = this.shape.options.zIndex + 1), this.element = this.setPointStyles(this.element);
  }, this.createPointUI = () => {
    const e = document.createElement("div");
    return this.shape.options.canDragPoints ? this.setPointStyles(e) : e;
  }, this.setPointStyles = (e = null) => {
    if (e == null && (e = this.element), !this.shape.options.canDragPoints)
      return e;
    if (this.options.id && (e.id = this.options.id), e.className = this.options.classes, e.style = this.options.style, typeof this.options.style == "object")
      for (let i in this.options.style)
        e.style[i] = this.options.style[i];
    return e.style.width = this.options.width + "px", e.style.height = this.options.height + "px", e.style.left = this.x - parseInt(this.options.width / 2) + "px", e.style.top = this.y - parseInt(this.options.height / 2) + "px", e.style.zIndex = this.options.zIndex, e;
  }, this.redraw = () => {
    this.setPointStyles(), this.element.style.left = this.x - parseInt(this.options.width / 2) + "px", this.element.style.top = this.y - parseInt(this.options.height / 2) + "px";
  }, this.addEventListeners = () => {
    this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown);
  }, this.mousedown = (e) => {
    e.buttons === 1 && this.shape.options.canDragPoints && this.options.canDrag && (e.preventDefault = !0, e.stopPropagation(), this.shape.onPointEvent("point_dragstart", this));
  }, this.mousemove = (e) => {
    if (e.buttons !== 1 || !this.shape.options.canDragPoints || !this.options.canDrag)
      return;
    const i = p(this.shape.root, !0);
    e.movementX + this.x < 0 || e.movementX + this.x > this.shape.root.clientLeft + this.shape.root.clientWidth || e.movementY + this.y < 0 || e.movementY + this.y > this.shape.root.clientTop + this.shape.root.clientHeight || (this.y = e.clientY - i.top + this.options.height / 2, this.x = e.clientX - i.left + this.options.width / 2, this.element.style.left = this.x - 5 + "px", this.element.style.top = this.y - 5 + "px", this.shape.onPointEvent("point_drag", this));
  }, this.mouseup = (e) => {
    this.shape.onPointEvent("point_dragend", this), e.button === 2 && this.shape.options.canDeletePoints && this.options.canDelete && this.destroy();
  }, this.destroy = () => {
    this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), this.shape.onPointEvent("point_destroyed", this);
  }, this;
}
function f() {
  this.draw = (t) => {
    if (t.svg && (t.root.removeChild(t.svg), t.svg = null), t.points.length < 1)
      return;
    if (t.calcPosition(), t.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), t.svg.ondragstart = function() {
      return !1;
    }, t.svg.id = t.options.id, t.svg.style.position = "absolute", t.svg.style.cursor = "crosshair", t.svg.style.left = t.left, t.svg.style.top = t.top, t.svg.setAttribute("width", t.width), t.svg.setAttribute("height", t.height), t.options.fillImage && typeof (t.options.fillImage === "object")) {
      const i = document.createElementNS(t.svg.namespaceURI, "defs"), s = this.createImageFill(t);
      s && i.appendChild(s), t.svg.appendChild(i);
    } else if (t.options.fillGradient && typeof (t.options.fillGradient === "object") && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1) {
      const i = document.createElementNS(t.svg.namespaceURI, "defs"), s = this.createGradient(t);
      i.appendChild(s), t.svg.appendChild(i);
    }
    t.svg.style.zIndex = t.options.zIndex;
    const e = this.drawPolygon(t);
    t.svg.appendChild(e), t.root.appendChild(t.svg), t.svg.addEventListener("mousedown", t.eventListener.mousedown), t.points.forEach((i) => {
      i.setOptions(t.options.pointOptions), i.setPointStyles(), i.redraw();
    });
  }, this.drawPolygon = (t) => {
    let e = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    t.points.length > 2 && (e = document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
    const i = t.points.map((s) => "" + (s.x - t.left) + "," + (s.y - t.top)).join(" ");
    if (e.setAttribute("points", i), t.options.stroke && e.setAttribute("stroke", t.options.stroke), t.options.strokeWidth && e.setAttribute("stroke-width", t.options.strokeWidth), t.options.strokeLinecap && e.setAttribute("stroke-linecap", t.options.strokeLinecap), t.options.strokeDasharray && e.setAttribute("stroke-dasharray", t.options.strokeDasharray), t.options.fill && (t.options.fillImage && typeof t.options.fillImage == "object" ? e.setAttribute("fill", 'url("#' + t.guid + '_pattern")') : t.options.fillGradient && typeof (t.options.fillGradient === "object") && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1 ? e.setAttribute("fill", 'url("#' + t.guid + '_gradient")') : e.setAttribute("fill", t.options.fill)), t.options.fillOpacity && e.setAttribute("fill-opacity", t.options.fillOpacity), t.options.classes && e.setAttribute("class", t.options.classes), t.options.style)
      for (let s in t.options.style)
        e.style[s] = t.options.style[s];
    return e.style.zIndex = t.options.zIndex, e;
  }, this.createGradient = (t) => {
    let e = document.createElementNS(t.svg.namespaceURI, "linearGradient");
    const i = t.options.fillGradient;
    i.type === "radial" && (e = document.createElementNS(t.svg.namespaceURI, "radialGradient")), e.id = t.guid + "_gradient";
    let s = !1;
    for (let o in i)
      if (o !== "type") {
        if (o === "steps") {
          s = !0;
          continue;
        }
        e.setAttribute(o, i[o]);
      }
    if (!s)
      return e;
    for (let o of i.steps) {
      const n = document.createElementNS(t.svg.namespaceURI, "stop");
      n.setAttribute("offset", o.offset), n.setAttribute("stop-color", o.stopColor), n.setAttribute("stop-opacity", o.stopOpacity), e.appendChild(n);
    }
    return e;
  }, this.createImageFill = (t) => {
    const e = t.options.fillImage;
    if (!e.href || !e.width || !e.height)
      return console.error("Image HREF, width and height must be specified for Image Fill"), null;
    const i = document.createElementNS(t.svg.namespaceURI, "pattern");
    i.setAttribute("id", t.guid + "_pattern"), i.setAttribute("patternUnits", "userSpaceOnUse");
    for (let o in e)
      o !== "href" && i.setAttribute(o, e[o]);
    const s = document.createElementNS(t.svg.namespaceURI, "image");
    return s.setAttribute("href", e.href), s.setAttribute("width", e.width), s.setAttribute("height", e.height), i.appendChild(s), i;
  };
}
const u = new f();
function c(t) {
  this.shape = t, this.run = () => (this.shape = t, this.addEventListeners(), this), this.addEventListeners = () => {
    this.shape.root.getAttribute("sh_listeners") !== "true" && (this.shape.root.setAttribute("sh_listeners", "true"), this.shape.root.addEventListener("mousemove", (e) => {
      this.shape.root.draggedShape && this.shape.root.draggedShape.eventListener.mousemove(e);
    }), this.shape.root.addEventListener("mouseup", this.mouseup), this.shape.root.addEventListener("dblclick", this.doubleclick), this.shape.root.addEventListener("mouseenter", this.mouseenter), this.shape.options.canDeletePoints && (this.nocontextmenu = this.shape.root.addEventListener("contextmenu", (e) => e.preventDefault())));
  }, this.mouseup = (e) => {
    e.buttons === 1 && this.shape.options.canAddPoints && !this.shape.draggedPoint && (this.shape.options.maxPoints === -1 || this.shape.points.length < this.shape.options.maxPoints) && this.shape.addPoint(e.clientX - this.shape.root.offsetLeft, e.clientY - this.shape.root.offsetTop), this.shape.root.draggedShape && (this.shape.root.draggedShape.draggedPoint = null, this.shape.root.draggedShape = null);
  }, this.doubleclick = (e) => {
    e.stopPropagation(), this.shape.options.canAddPoints && !this.shape.draggedPoint && (this.shape.options.maxPoints === -1 || this.shape.points.length < this.shape.options.maxPoints) && this.shape.addPoint(e.clientX - this.shape.root.offsetLeft, e.clientY - this.shape.root.offsetTop);
  }, this.mousedown = (e) => {
    this.shape.root.draggedShape = this.shape;
  }, this.mousemove = (e) => {
    if (e.buttons !== 1) {
      this.shape.root.draggedShape && (this.shape.root.draggedShape.draggedPoint = null, this.shape.root.draggedShape = null);
      return;
    }
    if (this.shape.draggedPoint) {
      this.shape.draggedPoint.mousemove(e);
      return;
    }
    if (!this.shape.options.canDragShape)
      return;
    const [i, s] = this.calcMovementOffset(e);
    if (!(i === null || s === null)) {
      for (let o in this.shape.points)
        this.shape.points[o].x += i, this.shape.points[o].y += s, this.shape.points[o].redraw();
      this.shape.redraw();
    }
  }, this.mouseenter = (e) => {
    e.buttons !== 1 && (this.shape.root.draggedShape && (this.shape.root.draggedShape.draggedPoint = null), this.shape.root.draggedShape = null);
  }, this.calcMovementOffset = (e) => {
    this.shape.calcPosition();
    let i = e.movementX, s = e.movementY, o = e.clientX, n = e.clientY;
    const h = this.shape.left + i, a = this.shape.top + s, r = p(this.shape.root, !0);
    return h < 0 || h + this.shape.width > this.shape.root.clientLeft + this.shape.root.clientWidth ? [null, null] : a < 0 || a + this.shape.height > this.shape.root.clientTop + this.shape.root.clientHeight ? [null, null] : (o < h + r.left && (i = o - (h + r.left)), n < a + r.top && (s = n - (a + r.top)), o > h + this.shape.width + r.left && (i = o - (this.shape.width + r.left + this.shape.left)), n > a + this.shape.height + r.right && (s = n - (this.shape.height + r.top + this.shape.top)), [i, s]);
  }, this.onPointEvent = (e, i) => {
    switch (e) {
      case "point_destroyed":
        this.shape.points.splice(this.shape.points.indexOf(i), 1), this.shape.root.removeChild(i.element), this.shape.redraw();
        break;
      case "point_drag":
        this.shape.redraw();
        break;
      case "point_dragstart":
        this.shape.root.draggedShape = this.shape, this.shape.draggedPoint = i;
        break;
      case "point_dragend":
        this.shape.root.draggedShape = null, this.shape.draggedPoint = null;
    }
  }, this.destroy = () => {
    this.shape.options.canDeletePoints && this.shape.root.removeEventListener("contextmenu", this.nocontextmenu), this.shape.root.removeEventListener("mouseup", this.mouseup);
  };
}
function g() {
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
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = l(), this.init = (t, e = null, i = null) => {
    if (!t) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    return this.root = t, this.root.style.position = "relative", this.draggedPoint = null, this.root.draggedShape = null, this.setOptions(e), this.eventListener = new c(this).run(), this.onPointEvent = this.eventListener.onPointEvent, this.setupPoints(i, this.options.pointOptions), this;
  }, this.setOptions = (t) => {
    t && typeof t == "object" && (t.pointOptions && typeof t.pointOptions == "object" && (t.pointOptions = Object.assign(this.options.pointOptions, t.pointOptions)), t.style && typeof t.style == "object" && (t.style = Object.assign(this.options.style, t.style)), Object.assign(this.options, t));
  }, this.setupPoints = (t, e) => {
    typeof t == "object" && (this.points = [], this.addPoints(t, e));
  }, this.addPoint = (t, e, i = null) => {
    const s = this.putPoint(t, e, i);
    return this.redraw(), s;
  }, this.addPoints = (t, e = null) => {
    !t || typeof t != "object" || (t.forEach((i) => this.putPoint(i[0] + this.options.offsetX, i[1] + this.options.offsetY, e)), this.redraw());
  }, this.putPoint = (t, e, i = null) => {
    if (this.findPoint(t, e))
      return console.error(`Point with x=${t} and y=${e} already exists`), null;
    const s = new d(this).init(t, e, i);
    return this.points.push(s), this.root.appendChild(s.element), s;
  }, this.deletePoint = (t, e) => {
    const i = this.findPoint(t, e);
    i && i.destroy();
  }, this.findPoint = (t, e) => {
    const i = this.points.find((s) => s.x === t && s.y === e);
    return typeof i > "u" || !i ? null : i;
  }, this.getPointsArray = () => {
    let t = [];
    return this.points && typeof this.points == "object" && this.points.length && (t = this.points.map((e) => [e.x, e.y])), t;
  }, this.redraw = () => {
    u.draw(this);
  }, this.calcPosition = () => {
    this.left = this.points.map((t) => t.x).reduce((t, e) => e < t ? e : t), this.top = this.points.map((t) => t.y).reduce((t, e) => e < t ? e : t), this.right = this.points.map((t) => t.x).reduce((t, e) => e > t ? e : t), this.bottom = this.points.map((t) => t.y).reduce((t, e) => e > t ? e : t), this.width = this.right - this.left, this.height = this.bottom - this.top;
  }, this.destroy = () => {
    this.points.forEach((t) => {
      this.root.removeChild(t.element);
    }), this.eventListener.destroy(), this.onPointEvent = null, this.points = [], this.redraw();
  };
}
export {
  g as default
};
