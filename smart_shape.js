const a = (t, i = !0) => {
  let s = 0, e = 0;
  if (!i)
    return { top: t.offsetTop - t.scrollTop, left: t.offsetLeft - t.scrollLeft };
  for (; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop); )
    s += t.offsetLeft - t.scrollLeft, e += t.offsetTop - t.scrollTop, t = t.offsetParent;
  return { top: e, left: s };
}, f = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
  var i = Math.random() * 16 | 0, s = t == "x" ? i : i & 3 | 8;
  return s.toString(16);
}).replace(/\-/g, "");
function c() {
  this.subscriptions = {}, this.subscribe = (t, i) => ((typeof this.subscriptions[t] > "u" || !this.subscriptions[t]) && (this.subscriptions[t] = []), typeof this.subscriptions[t].find((s) => s === i) < "u" ? null : (this.subscriptions[t].push(i), i)), this.emit = (t, i, s = null) => ((!s || typeof s != "object") && (s = {}), s.type = t, s.target = i, typeof this.subscriptions[t] < "u" && this.subscriptions[t] && this.subscriptions[t].length ? (this.subscriptions[t].forEach((e) => e(s)), !0) : !1), this.unsubscribe = (t, i) => {
    if (typeof this.subscriptions[t] > "u" || !this.subscriptions[t])
      return !1;
    const s = this.subscriptions[t].indexOf(i);
    return s !== -1 ? (this.subscriptions[t].splice(s, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const n = new c();
function g(t) {
  this.shape = t, this.run = () => (this.shape = t, this.addEventListeners(), this), this.addEventListeners = () => {
    this.shape.root.getAttribute("sh_listeners") !== "true" && (this.shape.root.setAttribute("sh_listeners", "true"), this.shape.root.addEventListener("mousemove", (i) => {
      this.shape.root.draggedShape && this.shape.root.draggedShape.eventListener.mousemove(i);
    }), this.shape.root.addEventListener("mouseup", this.mouseup), this.shape.root.addEventListener("dblclick", this.doubleclick), this.shape.root.addEventListener("mouseenter", this.mouseenter), this.shape.options.canDeletePoints && (this.nocontextmenu = this.shape.root.addEventListener("contextmenu", (i) => i.preventDefault())), window.addEventListener("resize", this.onWindowResize)), n.subscribe(r.POINT_ADDED, (i) => this.onPointAdded(i)), n.subscribe(r.POINT_DRAG_START, (i) => this.onPointDragStart(i)), n.subscribe(r.POINT_DRAG_MOVE, (i) => this.onPointDragMove(i)), n.subscribe(r.POINT_DRAG_END, (i) => this.onPointDragEnd(i)), n.subscribe(r.POINT_DESTROYED, (i) => this.onPointDestroyed(i));
  }, this.mouseup = (i) => {
    i.buttons === 1 && this.shape.options.canAddPoints && !this.shape.draggedPoint && (this.shape.options.maxPoints === -1 || this.shape.points.length < this.shape.options.maxPoints) && this.shape.addPoint(i.clientX - this.shape.root.offsetLeft, i.clientY - this.shape.root.offsetTop), this.shape.root.draggedShape && (this.shape.root.draggedShape.draggedPoint = null, this.shape.root.draggedShape = null);
  }, this.doubleclick = (i) => {
    i.stopPropagation(), this.shape.options.canAddPoints && !this.shape.draggedPoint && (this.shape.options.maxPoints === -1 || this.shape.points.length < this.shape.options.maxPoints) && this.shape.addPoint(i.clientX - this.shape.root.offsetLeft, i.clientY - this.shape.root.offsetTop);
  }, this.mousedown = (i) => {
    this.shape.root.draggedShape = this.shape;
  }, this.mousemove = (i) => {
    if (i.buttons !== 1) {
      this.shape.root.draggedShape && (this.shape.root.draggedShape.draggedPoint = null, this.shape.root.draggedShape = null);
      return;
    }
    if (this.shape.draggedPoint) {
      this.shape.draggedPoint.mousemove(i);
      return;
    }
    if (!this.shape.options.canDragShape)
      return;
    const [s, e] = this.calcMovementOffset(i);
    if (!(s === null || e === null)) {
      for (let o in this.shape.points)
        this.shape.points[o].x += s, this.shape.points[o].y += e, this.shape.points[o].redraw();
      this.shape.redraw();
    }
  }, this.mouseenter = (i) => {
    i.buttons !== 1 && (this.shape.root.draggedShape && (this.shape.root.draggedShape.draggedPoint = null), this.shape.root.draggedShape = null);
  }, this.calcMovementOffset = (i) => {
    this.shape.calcPosition();
    let s = i.movementX, e = i.movementY, o = i.clientX, h = i.clientY;
    const p = this.shape.left + s, d = this.shape.top + e, l = a(this.shape.root, !0);
    return p < 0 || p + this.shape.width > this.shape.root.clientLeft + this.shape.root.clientWidth ? [null, null] : d < 0 || d + this.shape.height > this.shape.root.clientTop + this.shape.root.clientHeight ? [null, null] : (o < p + l.left && (s = o - (p + l.left)), h < d + l.top && (e = h - (d + l.top)), o > p + this.shape.width + l.left && (s = o - (this.shape.width + l.left + this.shape.left)), h > d + this.shape.height + l.right && (e = h - (this.shape.height + l.top + this.shape.top)), [s, e]);
  }, this.onPointAdded = (i) => {
  }, this.onPointDragStart = (i) => {
    !this.shape.isShapePoint(i.target) || (this.shape.root.draggedShape = this.shape, this.shape.draggedPoint = i.target);
  }, this.onPointDragMove = (i) => {
    !this.shape.isShapePoint(i.target) || this.shape.redraw();
  }, this.onPointDragEnd = (i) => {
    !this.shape.isShapePoint(i.target) || (this.shape.root.draggedShape = null, this.shape.draggedPoint = null);
  }, this.onPointDestroyed = (i) => {
    !this.shape.isShapePoint(i.target) || (this.shape.points.splice(this.shape.points.indexOf(i.target), 1), this.shape.root.removeChild(i.target.element), this.shape.redraw());
  }, this.onWindowResize = (i) => {
    n.emit(
      u.CONTAINER_BOUNDS_CHANGED,
      this.shape,
      { bounds: this.shape.getBounds(), points: this.shape.points }
    );
  }, this.destroy = () => {
    this.shape.options.canDeletePoints && this.shape.root.removeEventListener("contextmenu", this.nocontextmenu), this.shape.root.removeEventListener("mouseup", this.mouseup);
  };
}
const u = {
  CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
};
function b() {
  return this.options = {
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
    zIndex: 1e3,
    bounds: {}
  }, this.x = 0, this.y = 0, this.element = null, this.init = (t, i, s = null) => (this.x = t, this.y = i, this.element = this.createPointUI(), this.setOptions(s), this.addEventListeners(), n.emit(r.POINT_ADDED, this), this), this.setOptions = (t) => {
    t && typeof t == "object" && (t.style && typeof t.style == "object" && (t.style = Object.assign(this.options.style, t.style)), Object.assign(this.options, t)), this.options.id && (this.element.id = this.options.id);
  }, this.createPointUI = () => {
    const t = document.createElement("div");
    return this.options.canDrag ? this.setPointStyles(t) : t;
  }, this.setPointStyles = (t = null) => {
    if (t == null && (t = this.element), this.options.id && (this.element.id = this.options.id), t.className = this.options.classes, t.style = this.options.style, typeof this.options.style == "object")
      for (let i in this.options.style)
        t.style[i] = this.options.style[i];
    return t.style.width = this.options.width + "px", t.style.height = this.options.height + "px", t.style.left = this.x - parseInt(this.options.width / 2) + "px", t.style.top = this.y - parseInt(this.options.height / 2) + "px", t.style.zIndex = this.options.zIndex, this.options.canDrag ? t.style.display = "" : t.style.display = "none", t;
  }, this.redraw = () => {
    this.element = this.setPointStyles();
  }, this.addEventListeners = () => {
    this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown), n.subscribe(u.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange);
  }, this.mousedown = (t) => {
    t.buttons === 1 && this.options.canDrag && (t.preventDefault = !0, t.stopPropagation(), n.emit(r.POINT_DRAG_START, this));
  }, this.mousemove = (t) => {
    if (t.buttons !== 1 || !this.options.canDrag)
      return;
    const i = this.x, s = this.y, e = a(this.element.parentNode, !0);
    if (t.movementX + this.x < this.options.bounds.left || t.movementX + this.x > this.options.bounds.right) {
      n.emit(r.POINT_DRAG_MOVE, this, { oldX: i, oldY: s });
      return;
    }
    if (t.movementY + this.y < this.options.bounds.top || t.movementY + this.y > this.options.bounds.bottom) {
      n.emit(r.POINT_DRAG_MOVE, this, { oldX: i, oldY: s });
      return;
    }
    this.x = t.clientX - e.left - this.options.width / 2, this.y = t.clientY - e.top - this.options.height / 2, this.element.style.left = this.x + "px", this.element.style.top = this.y + "px", n.emit(r.POINT_DRAG_MOVE, this, { oldX: i, oldY: s });
  }, this.mouseup = (t) => {
    n.emit(r.POINT_DRAG_END, this), t.button === 2 && this.options.canDelete && this.destroy();
  }, this.onBoundsChange = (t) => {
    t.points.find((i) => i === this) && (this.options.bounds = t.bounds);
  }, this.destroy = () => {
    this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), n.emit(r.POINT_DESTROYED, this);
  }, this;
}
const r = {
  POINT_ADDED: "POINT_ADDED",
  POINT_DESTROYED: "POINT_DESTROYED",
  POINT_DRAG_START: "POINT_DRAG_START",
  POINT_DRAG_MOVE: "POINT_DRAG_MOVE",
  POINT_DRAG_END: "POINT_DRAG_END"
};
function m() {
  this.draw = (t) => {
    if (t.svg && (t.root.removeChild(t.svg), t.svg = null), t.points.length < 1)
      return;
    if (t.calcPosition(), t.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), t.svg.ondragstart = function() {
      return !1;
    }, t.svg.id = t.options.id, t.svg.style.position = "absolute", t.svg.style.cursor = "crosshair", t.svg.style.left = t.left, t.svg.style.top = t.top, t.svg.setAttribute("width", t.width), t.svg.setAttribute("height", t.height), t.options.fillImage && typeof (t.options.fillImage === "object")) {
      const s = document.createElementNS(t.svg.namespaceURI, "defs"), e = this.createImageFill(t);
      e && s.appendChild(e), t.svg.appendChild(s);
    } else if (t.options.fillGradient && typeof (t.options.fillGradient === "object") && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1) {
      const s = document.createElementNS(t.svg.namespaceURI, "defs"), e = this.createGradient(t);
      s.appendChild(e), t.svg.appendChild(s);
    }
    t.svg.style.zIndex = t.options.zIndex;
    const i = this.drawPolygon(t);
    t.svg.appendChild(i), t.root.appendChild(t.svg), t.svg.addEventListener("mousedown", t.eventListener.mousedown), t.points.forEach((s) => s.redraw());
  }, this.drawPolygon = (t) => {
    let i = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    t.points.length > 2 && (i = document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
    const s = t.points.map((e) => "" + (e.x - t.left) + "," + (e.y - t.top)).join(" ");
    if (i.setAttribute("points", s), t.options.stroke && i.setAttribute("stroke", t.options.stroke), t.options.strokeWidth && i.setAttribute("stroke-width", t.options.strokeWidth), t.options.strokeLinecap && i.setAttribute("stroke-linecap", t.options.strokeLinecap), t.options.strokeDasharray && i.setAttribute("stroke-dasharray", t.options.strokeDasharray), t.options.fill && (t.options.fillImage && typeof t.options.fillImage == "object" ? i.setAttribute("fill", 'url("#' + t.guid + '_pattern")') : t.options.fillGradient && typeof (t.options.fillGradient === "object") && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1 ? i.setAttribute("fill", 'url("#' + t.guid + '_gradient")') : i.setAttribute("fill", t.options.fill)), t.options.fillOpacity && i.setAttribute("fill-opacity", t.options.fillOpacity), t.options.classes && i.setAttribute("class", t.options.classes), t.options.style)
      for (let e in t.options.style)
        i.style[e] = t.options.style[e];
    return i.style.zIndex = t.options.zIndex, i;
  }, this.createGradient = (t) => {
    let i = document.createElementNS(t.svg.namespaceURI, "linearGradient");
    const s = t.options.fillGradient;
    s.type === "radial" && (i = document.createElementNS(t.svg.namespaceURI, "radialGradient")), i.id = t.guid + "_gradient";
    let e = !1;
    for (let o in s)
      if (o !== "type") {
        if (o === "steps") {
          e = !0;
          continue;
        }
        i.setAttribute(o, s[o]);
      }
    if (!e)
      return i;
    for (let o of s.steps) {
      const h = document.createElementNS(t.svg.namespaceURI, "stop");
      h.setAttribute("offset", o.offset), h.setAttribute("stop-color", o.stopColor), h.setAttribute("stop-opacity", o.stopOpacity), i.appendChild(h);
    }
    return i;
  }, this.createImageFill = (t) => {
    const i = t.options.fillImage;
    if (!i.href || !i.width || !i.height)
      return console.error("Image HREF, width and height must be specified for Image Fill"), null;
    const s = document.createElementNS(t.svg.namespaceURI, "pattern");
    s.setAttribute("id", t.guid + "_pattern"), s.setAttribute("patternUnits", "userSpaceOnUse");
    for (let o in i)
      o !== "href" && s.setAttribute(o, i[o]);
    const e = document.createElementNS(t.svg.namespaceURI, "image");
    return e.setAttribute("href", i.href), e.setAttribute("width", i.width), e.setAttribute("height", i.height), s.appendChild(e), s;
  };
}
const y = new m();
function P() {
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
    canAddPoints: !1,
    offsetX: 0,
    offsetY: 0,
    classes: "",
    style: {},
    pointOptions: {},
    zIndex: 1e3
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = f(), this.init = (t, i = null, s = null) => {
    if (!t) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    return this.root = t, this.root.style.position = "relative", this.draggedPoint = null, this.root.draggedShape = null, this.setOptions(i), this.eventListener = new g(this).run(), this.setupPoints(s, this.options.pointOptions), this;
  }, this.setOptions = (t) => {
    t && typeof t == "object" && (t.pointOptions && typeof t.pointOptions == "object" && (t.pointOptions = Object.assign(this.options.pointOptions, t.pointOptions)), t.style && typeof t.style == "object" && (t.style = Object.assign(this.options.style, t.style)), Object.assign(this.options, t), this.points.forEach((i) => {
      i.setOptions(this.options.pointOptions), i.options.bounds = this.getBounds(), i.options.zIndex <= this.options.zIndex && (i.options.zIndex = this.options.zIndex + 1), i.redraw();
    }));
  }, this.setupPoints = (t, i) => {
    typeof t == "object" && (this.points = [], this.addPoints(t, i));
  }, this.addPoint = (t, i, s = null) => {
    const e = this.putPoint(t, i, s);
    return this.redraw(), e;
  }, this.addPoints = (t, i = null) => {
    !t || typeof t != "object" || (t.forEach((s) => this.putPoint(s[0] + this.options.offsetX, s[1] + this.options.offsetY, i)), this.redraw());
  }, this.putPoint = (t, i, s = null) => {
    if (this.findPoint(t, i))
      return console.error(`Point with x=${t} and y=${i} already exists`), null;
    s || (s = this.options.pointOptions || {}), s.bounds = this.getBounds(), s.zIndex = this.options.zIndex + 1;
    const e = new b().init(t, i, s);
    return this.points.push(e), this.root.appendChild(e.element), e;
  }, this.deletePoint = (t, i) => {
    const s = this.findPoint(t, i);
    s && s.destroy();
  }, this.findPoint = (t, i) => {
    const s = this.points.find((e) => e.x === t && e.y === i);
    return typeof s > "u" || !s ? null : s;
  }, this.getPointsArray = () => {
    let t = [];
    return this.points && typeof this.points == "object" && this.points.length && (t = this.points.map((i) => [i.x, i.y])), t;
  }, this.redraw = () => {
    y.draw(this);
  }, this.calcPosition = () => {
    this.left = this.points.map((t) => t.x).reduce((t, i) => i < t ? i : t), this.top = this.points.map((t) => t.y).reduce((t, i) => i < t ? i : t), this.right = this.points.map((t) => t.x).reduce((t, i) => i > t ? i : t), this.bottom = this.points.map((t) => t.y).reduce((t, i) => i > t ? i : t), this.width = this.right - this.left, this.height = this.bottom - this.top;
  }, this.getBounds = () => ({
    left: this.root.clientLeft,
    top: this.root.clientTop,
    right: this.root.clientLeft + this.root.clientWidth,
    bottom: this.root.clientTop + this.root.clientHeight
  }), this.isShapePoint = (t) => !!this.points.find((i) => i === t), this.destroy = () => {
    this.points.forEach((t) => {
      this.root.removeChild(t.element);
    }), this.eventListener.destroy(), this.points = [], this.redraw();
  };
}
export {
  P as default
};
