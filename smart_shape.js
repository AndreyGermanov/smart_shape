const l = (t, i = !0) => {
  let e = 0, s = 0;
  if (!i)
    return { top: t.offsetTop - t.scrollTop, left: t.offsetLeft - t.scrollLeft };
  for (; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop); )
    e += t.offsetLeft - t.scrollLeft, s += t.offsetTop - t.scrollTop, t = t.offsetParent;
  return { top: s, left: e };
}, p = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
  var i = Math.random() * 16 | 0, e = t == "x" ? i : i & 3 | 8;
  return e.toString(16);
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
  }, this.x = 0, this.y = 0, this.element = null, this.init = (i, e, s = null) => (this.x = i, this.y = e, this.shape = t, this.element = this.createPointUI(), this.setOptions(this.shape.options.pointOptions), this.setOptions(s), this.addEventListeners(), this.shape.onPointEvent || (this.shape.onPointEvent = () => {
  }), this.shape.onPointEvent("point_added", this), this), this.setOptions = (i) => {
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
    this.setPointStyles();
  }, this.addEventListeners = () => {
    this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown);
  }, this.mousedown = (i) => {
    i.buttons === 1 && this.shape.options.canDragPoints && this.options.canDrag && (i.preventDefault = !0, i.stopPropagation(), this.shape.onPointEvent("point_dragstart", this));
  }, this.mousemove = (i) => {
    if (i.buttons !== 1 || !this.shape.options.canDragPoints || !this.options.canDrag)
      return;
    const e = l(this.shape.root, !0);
    i.movementX + this.x < 0 || i.movementX + this.x > this.shape.root.clientLeft + this.shape.root.clientWidth || i.movementY + this.y < 0 || i.movementY + this.y > this.shape.root.clientTop + this.shape.root.clientHeight || (this.x, this.y, this.x = i.clientX - e.left - this.options.width / 2, this.y = i.clientY - e.top - this.options.height / 2, this.element.style.left = this.x + "px", this.element.style.top = this.y + "px", this.shape.onPointEvent("point_drag", this));
  }, this.mouseup = (i) => {
    this.shape.onPointEvent("point_dragend", this), i.button === 2 && this.shape.options.canDeletePoints && this.options.canDelete && this.destroy();
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
      const e = document.createElementNS(t.svg.namespaceURI, "defs"), s = this.createImageFill(t);
      s && e.appendChild(s), t.svg.appendChild(e);
    } else if (t.options.fillGradient && typeof (t.options.fillGradient === "object") && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1) {
      const e = document.createElementNS(t.svg.namespaceURI, "defs"), s = this.createGradient(t);
      e.appendChild(s), t.svg.appendChild(e);
    }
    t.svg.style.zIndex = t.options.zIndex;
    const i = this.drawPolygon(t);
    t.svg.appendChild(i), t.root.appendChild(t.svg), t.svg.addEventListener("mousedown", t.eventListener.mousedown), t.points.forEach((e) => {
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
const u = new f();
function c(t) {
  this.shape = t, this.run = () => (this.shape = t, this.addEventListeners(), this), this.addEventListeners = () => {
    this.shape.root.getAttribute("sh_listeners") !== "true" && (this.shape.root.setAttribute("sh_listeners", "true"), this.shape.root.addEventListener("mousemove", (i) => {
      this.shape.root.draggedShape && this.shape.root.draggedShape.eventListener.mousemove(i);
    }), this.shape.root.addEventListener("mouseup", this.mouseup), this.shape.root.addEventListener("dblclick", this.doubleclick), this.shape.root.addEventListener("mouseenter", this.mouseenter), this.shape.options.canDeletePoints && (this.nocontextmenu = this.shape.root.addEventListener("contextmenu", (i) => i.preventDefault())));
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
    const [e, s] = this.calcMovementOffset(i);
    if (!(e === null || s === null)) {
      for (let o in this.shape.points)
        this.shape.points[o].x += e, this.shape.points[o].y += s, this.shape.points[o].redraw();
      this.shape.redraw();
    }
  }, this.mouseenter = (i) => {
    i.buttons !== 1 && (this.shape.root.draggedShape && (this.shape.root.draggedShape.draggedPoint = null), this.shape.root.draggedShape = null);
  }, this.calcMovementOffset = (i) => {
    this.shape.calcPosition();
    let e = i.movementX, s = i.movementY, o = i.clientX, n = i.clientY;
    const h = this.shape.left + e, a = this.shape.top + s, r = l(this.shape.root, !0);
    return h < 0 || h + this.shape.width > this.shape.root.clientLeft + this.shape.root.clientWidth ? [null, null] : a < 0 || a + this.shape.height > this.shape.root.clientTop + this.shape.root.clientHeight ? [null, null] : (o < h + r.left && (e = o - (h + r.left)), n < a + r.top && (s = n - (a + r.top)), o > h + this.shape.width + r.left && (e = o - (this.shape.width + r.left + this.shape.left)), n > a + this.shape.height + r.right && (s = n - (this.shape.height + r.top + this.shape.top)), [e, s]);
  }, this.onPointEvent = (i, e) => {
    switch (i) {
      case "point_destroyed":
        this.shape.points.splice(this.shape.points.indexOf(e), 1), this.shape.root.removeChild(e.element), this.shape.redraw();
        break;
      case "point_drag":
        this.shape.redraw();
        break;
      case "point_dragstart":
        this.shape.root.draggedShape = this.shape, this.shape.draggedPoint = e;
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
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = p(), this.init = (t, i = null, e = null) => {
    if (!t) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    return this.root = t, this.root.style.position = "relative", this.draggedPoint = null, this.root.draggedShape = null, this.setOptions(i), this.eventListener = new c(this).run(), this.onPointEvent = this.eventListener.onPointEvent, this.setupPoints(e, this.options.pointOptions), this;
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
    const s = new d(this).init(t, i, e);
    return this.points.push(s), this.root.appendChild(s.element), s;
  }, this.deletePoint = (t, i) => {
    const e = this.findPoint(t, i);
    e && e.destroy();
  }, this.findPoint = (t, i) => {
    const e = this.points.find((s) => s.x === t && s.y === i);
    return typeof e > "u" || !e ? null : e;
  }, this.getPointsArray = () => {
    let t = [];
    return this.points && typeof this.points == "object" && this.points.length && (t = this.points.map((i) => [i.x, i.y])), t;
  }, this.redraw = () => {
    u.draw(this);
  }, this.calcPosition = () => {
    this.left = this.points.map((t) => t.x).reduce((t, i) => i < t ? i : t), this.top = this.points.map((t) => t.y).reduce((t, i) => i < t ? i : t), this.right = this.points.map((t) => t.x).reduce((t, i) => i > t ? i : t), this.bottom = this.points.map((t) => t.y).reduce((t, i) => i > t ? i : t), this.width = this.right - this.left, this.height = this.bottom - this.top;
  }, this.destroy = () => {
    this.points.forEach((t) => {
      this.root.removeChild(t.element);
    }), this.eventListener.destroy(), this.onPointEvent = null, this.points = [], this.redraw();
  };
}
export {
  g as default
};
