const f = (t, i = !0) => {
  let s = 0, e = 0;
  if (!i)
    return { top: t.offsetTop - t.scrollTop, left: t.offsetLeft - t.scrollLeft };
  for (; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop); )
    s += t.offsetLeft - t.scrollLeft, e += t.offsetTop - t.scrollTop, t = t.offsetParent;
  return { top: e, left: s };
}, b = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
  var i = Math.random() * 16 | 0, s = t == "x" ? i : i & 3 | 8;
  return s.toString(16);
}).replace(/\-/g, "");
function m() {
  this.subscriptions = {}, this.subscribe = (t, i) => ((typeof this.subscriptions[t] > "u" || !this.subscriptions[t]) && (this.subscriptions[t] = []), typeof this.subscriptions[t].find((s) => s === i) < "u" ? null : (this.subscriptions[t].push(i), i)), this.emit = (t, i, s = null) => ((!s || typeof s != "object") && (s = {}), s.type = t, s.target = i, typeof this.subscriptions[t] < "u" && this.subscriptions[t] && this.subscriptions[t].length ? (this.subscriptions[t].forEach((e) => e(s)), !0) : !1), this.unsubscribe = (t, i) => {
    if (typeof this.subscriptions[t] > "u" || !this.subscriptions[t])
      return !1;
    const s = this.subscriptions[t].indexOf(i);
    return s !== -1 ? (this.subscriptions[t].splice(s, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const h = new m();
function x(t) {
  this.resizeBox = t, this.subscriptions = {
    resize: []
  }, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    h.subscribe(r.POINT_DRAG_MOVE, this.onPointDragMove), h.subscribe(r.POINT_DRAG_END, this.onPointDragMove);
  }, this.onPointDragMove = (i) => {
    if (!this.resizeBox.shape.isShapePoint(i.target))
      return;
    switch (i.target) {
      case this.resizeBox.left_top:
        this.onLeftTopDragMove(i);
        break;
      case this.resizeBox.center_top:
        this.onCenterTopDragMove(i);
        break;
      case this.resizeBox.right_top:
        this.onRightTopDragMove(i);
        break;
      case this.resizeBox.right_center:
        this.onRightCenterDragMove(i);
        break;
      case this.resizeBox.right_bottom:
        this.onRightBottomDragMove(i);
        break;
      case this.resizeBox.center_bottom:
        this.onCenterBottomDragMove(i);
        break;
      case this.resizeBox.left_bottom:
        this.onLeftBottomDragMove(i);
        break;
      case this.resizeBox.left_center:
        this.onLeftCenterDragMove(i);
        break;
    }
    this.resizeBox.adjustCenters(), this.resizeBox.setPointsMoveBounds();
    const s = {
      left: this.resizeBox.left,
      top: this.resizeBox.top,
      right: this.resizeBox.right,
      bottom: this.resizeBox.bottom,
      width: this.resizeBox.width,
      height: this.resizeBox.height
    };
    this.resizeBox.calcPosition();
    const e = {
      left: this.resizeBox.left,
      top: this.resizeBox.top,
      right: this.resizeBox.right,
      bottom: this.resizeBox.bottom,
      width: this.resizeBox.width,
      height: this.resizeBox.height
    };
    this.resizeBox.redraw(), h.emit(g.RESIZE_BOX_RESIZE, this.resizeBox, { oldDims: s, newDims: e });
  }, this.onLeftTopDragMove = (i) => {
    this.resizeBox.left_center.x = i.target.x, this.resizeBox.left_bottom.x = i.target.x, this.resizeBox.center_top.y = i.target.y, this.resizeBox.right_top.y = i.target.y;
  }, this.onCenterTopDragMove = (i) => {
    this.resizeBox.left_top.y = i.target.y, this.resizeBox.right_top.y = i.target.y;
  }, this.onRightTopDragMove = (i) => {
    this.resizeBox.left_top.y = i.target.y, this.resizeBox.center_top.y = i.target.y, this.resizeBox.right_center.x = i.target.x, this.resizeBox.right_bottom.x = i.target.x;
  }, this.onRightCenterDragMove = (i) => {
    this.resizeBox.right_top.x = i.target.x, this.resizeBox.right_bottom.x = i.target.x;
  }, this.onRightBottomDragMove = (i) => {
    this.resizeBox.right_top.x = i.target.x, this.resizeBox.right_center.x = i.target.x, this.resizeBox.left_bottom.y = i.target.y, this.resizeBox.center_bottom.y = i.target.y;
  }, this.onCenterBottomDragMove = (i) => {
    this.resizeBox.left_bottom.y = i.target.y, this.resizeBox.right_bottom.y = i.target.y;
  }, this.onLeftBottomDragMove = (i) => {
    this.resizeBox.center_bottom.y = i.target.y, this.resizeBox.right_bottom.y = i.target.y, this.resizeBox.left_center.x = i.target.x, this.resizeBox.left_top.x = i.target.x;
  }, this.onLeftCenterDragMove = (i) => {
    this.resizeBox.left_bottom.x = i.target.x, this.resizeBox.left_top.x = i.target.x;
  }, this.addEventListener = (i, s) => {
    const e = h.subscribe(i, (o) => {
      o.target.options.id === this.resizeBox.options.id && s(o);
    });
    return this.subscriptions[i].push(e), e;
  }, this.removeEventListener = (i, s) => {
    this.subscriptions[i].splice(this.subscriptions[i].indexOf(s), 1), h.unsubscribe(i, s);
  }, this.destroy = () => {
    for (let i in this.subscriptions)
      this.subscriptions[i].forEach((e) => h.unsubscribe(i, e)), this.subscriptions[i] = [];
    h.unsubscribe(r.POINT_DRAG_MOVE, this.onPointDragMove), h.unsubscribe(r.POINT_DRAG_END, this.onPointDragMove);
  };
}
function c() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.options = {
    id: "",
    shapeOptions: {
      id: "",
      canAddPoints: !1,
      canDeletePoints: !1,
      stroke: "#aaaaaa",
      strokeWidth: 1,
      strokeDasharray: "10",
      pointOptions: {
        style: {
          borderWidth: "1px",
          borderColor: "rgb(204, 204, 204)",
          borderRadius: "0px",
          backgroundColor: "rgb(255, 255, 255)"
        }
      }
    },
    zIndex: 1e3
  }, this.eventListener = null, this.init = (t, i, s, e, o, n = {}) => (this.left = i, this.top = s, this.width = e, this.height = o, this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id + "_shape", this.shape = new D().init(t, Object.assign({}, this.options.shapeOptions), []), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new x(this).run(), this.redraw(), this), this.setOptions = (t = {}) => {
    t && typeof t == "object" && (t.shapeOptions && typeof t.shapeOptions == "object" ? (t.shapeOptions.pointOptions && typeof t.shapeOptions.pointOptions == "object" ? t.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions, t.shapeOptions.pointOptions) : t.shapeOptions.pointOptions = Object.assign({}, this.options.shapeOptions.pointOptions), t.shapeOptions = Object.assign(this.options.shapeOptions, t.shapeOptions)) : t.shapeOptions = Object.assign({}, this.options.shapeOptions), t.shapeOptions.zIndex = t.zIndex || this.options.zIndex, t.shapeOptions.id = t.id ? t.id + "_shape" : this.options.id + "_shape", Object.assign(this.options, t));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.options.id + "_left_top", style: { cursor: "nw-resize" } }), this.center_top = this.shape.addPoint(this.left + this.width / 2, this.top, { id: this.options.id + "_center_top", style: { cursor: "ns-resize" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.options.id + "_right_top", style: { cursor: "ne-resize" } }), this.right_center = this.shape.addPoint(this.right, this.top + this.height / 2, { id: this.options.id + "_right_center", style: { cursor: "ew-resize" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.options.id + "_right_bottom", style: { cursor: "se-resize" } }), this.center_bottom = this.shape.addPoint(this.left + this.width / 2, this.bottom, { id: this.options.id + "_center_bottom", style: { cursor: "ns-resize" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.options.id + "_left_bottom", style: { cursor: "sw-resize" } }), this.left_center = this.shape.addPoint(this.left, this.top + this.height / 2, { id: this.options.id + "_left_center", style: { cursor: "ew-resize" } }), this.setPointsOptions();
  }, this.setPointsOptions = () => {
    this.setPointsMoveDirections(), this.setPointsMoveBounds();
  }, this.setPointsMoveDirections = () => {
    this.center_top.setOptions({ moveDirections: [p.TOP, p.BOTTOM] }), this.center_bottom.setOptions({ moveDirections: [p.TOP, p.BOTTOM] }), this.left_center.setOptions({ moveDirections: [p.LEFT, p.RIGHT] }), this.right_center.setOptions({ moveDirections: [p.LEFT, p.RIGHT] });
  }, this.setPointsMoveBounds = () => {
    this.left_top.options.bounds.bottom = this.left_bottom.y - this.left_bottom.options.height - this.left_center.options.height, this.left_top.options.bounds.right = this.right_top.x - this.right_top.options.width - this.center_top.options.width, this.center_top.options.bounds.bottom = this.left_bottom.y - this.left_bottom.options.height - this.left_center.options.height, this.right_top.options.bounds.bottom = this.left_bottom.y - this.left_bottom.options.height - this.left_center.options.height, this.right_top.options.bounds.left = this.left_top.x + this.right_top.options.width + this.center_top.options.width, this.right_center.options.bounds.left = this.left_top.x + this.right_center.options.width + this.center_top.options.width, this.right_bottom.options.bounds.left = this.left_top.x + this.right_bottom.options.width + this.center_bottom.options.width, this.right_bottom.options.bounds.top = this.right_top.y + this.right_top.options.height + this.right_center.options.height, this.center_bottom.options.bounds.top = this.center_top.y + this.center_top.options.height + this.right_center.options.height, this.left_bottom.options.bounds.right = this.right_bottom.x - this.right_bottom.options.width - this.center_bottom.options.width, this.left_bottom.options.bounds.top = this.left_top.y + this.left_top.options.height + this.left_center.options.height, this.left_center.options.bounds.right = this.right_center.x - this.right_center.options.width - this.center_top.options.width;
  }, this.adjustCoordinates = () => {
    this.right = this.left + this.width, this.bottom = this.top + this.height, this.left_top.x = this.left, this.left_top.y = this.top, this.right_top.x = this.right, this.right_top.y = this.top, this.left_bottom.x = this.left, this.left_bottom.y = this.bottom, this.right_bottom.x = this.right, this.right_bottom.y = this.bottom, this.center_top.y = this.top, this.center_bottom.y = this.bottom, this.left_center.x = this.left, this.right_center.x = this.right, this.adjustCenters();
  }, this.adjustCenters = () => {
    this.center_top.x = parseInt(this.left_top.x + (this.right_top.x - this.left_top.x) / 2), this.center_bottom.x = parseInt(this.left_top.x + (this.right_top.x - this.left_top.x) / 2), this.left_center.y = parseInt(this.left_top.y + (this.left_bottom.y - this.left_top.y) / 2), this.right_center.y = parseInt(this.right_top.y + (this.right_bottom.y - this.right_top.y) / 2);
  }, this.calcPosition = () => {
    this.shape.calcPosition(), this.left = this.shape.left, this.top = this.shape.top, this.bottom = this.shape.bottom, this.right = this.shape.right, this.width = this.shape.width, this.height = this.shape.height;
  }, this.redraw = () => {
    this.adjustCoordinates(), this.shape.setOptions(this.options.shapeOptions), this.setPointsMoveBounds(), this.shape.redraw();
  }, this.destroy = () => {
    this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (t, i) => this.eventListener.addEventListener(t, i), this.removeEventListener = (t, i) => {
    this.eventListener.removeEventListener(t, i);
  };
}
const g = {
  RESIZE_BOX_RESIZE: "resize"
};
function _(t) {
  this.shape = t, this.run = () => (this.shape = t, this.addEventListeners(), this), this.addEventListeners = () => {
    this.shape.root.getAttribute("sh_listeners") !== "true" && (this.shape.root.setAttribute("sh_listeners", "true"), this.shape.root.addEventListener("mousemove", (i) => {
      this.shape.root.draggedShape && this.shape.root.draggedShape.eventListener.mousemove(i);
    }), this.shape.root.addEventListener("mouseup", this.mouseup), this.shape.root.addEventListener("dblclick", this.doubleclick), this.shape.root.addEventListener("mouseenter", this.mouseenter), this.shape.options.canDeletePoints && (this.nocontextmenu = this.shape.root.addEventListener("contextmenu", (i) => i.preventDefault())), window.addEventListener("resize", this.onWindowResize)), h.subscribe(r.POINT_ADDED, this.onPointAdded), h.subscribe(r.POINT_DRAG_START, this.onPointDragStart), h.subscribe(r.POINT_DRAG_MOVE, this.onPointDragMove), h.subscribe(r.POINT_DRAG_END, this.onPointDragEnd), h.subscribe(r.POINT_DESTROYED, this.onPointDestroyed);
  }, this.addResizeEventListener = () => {
    !this.shape.resizeBox || (this.resizeBoxListener = this.shape.resizeBox.addEventListener(g.RESIZE_BOX_RESIZE, (i) => {
      const s = i.newDims.left - i.oldDims.left, e = i.newDims.top - i.oldDims.top;
      this.shape.moveTo(this.shape.left + s, this.shape.top + e);
      const [o, n] = this.shape.getMaxPointSize();
      this.shape.scaleTo(i.newDims.width - (o + 5) * 2, i.newDims.height - (n + 5) * 2), this.shape.redraw();
    }));
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
    let s = i.movementX, e = i.movementY, o = i.clientX, n = i.clientY;
    const l = this.shape.left + s, d = this.shape.top + e, a = f(this.shape.root, !0);
    return l < 0 || l + this.shape.width > this.shape.root.clientLeft + this.shape.root.clientWidth ? [null, null] : d < 0 || d + this.shape.height > this.shape.root.clientTop + this.shape.root.clientHeight ? [null, null] : (o < l + a.left && (s = o - (l + a.left)), n < d + a.top && (e = n - (d + a.top)), o > l + this.shape.width + a.left && (s = o - (this.shape.width + a.left + this.shape.left)), n > d + this.shape.height + a.right && (e = n - (this.shape.height + a.top + this.shape.top)), [s, e]);
  }, this.onPointAdded = (i) => {
  }, this.onPointDragStart = (i) => {
    !this.shape.isShapePoint(i.target) || (this.shape.root.draggedShape = this.shape, this.shape.draggedPoint = i.target);
  }, this.onPointDragMove = (i) => {
    !this.shape.isShapePoint(i.target) || this.shape.redraw();
  }, this.onPointDragEnd = (i) => {
    !this.shape.isShapePoint(i.target) || (this.shape.root.draggedShape = null, this.shape.draggedPoint = null);
  }, this.onPointDestroyed = (i) => {
    !this.shape.isShapePoint(i.target) || (this.shape.points.splice(this.shape.points.indexOf(i.target), 1), this.shape.root.removeChild(i.target.element), this.shape.redraw());
  }, this.onWindowResize = () => {
    h.emit(
      u.CONTAINER_BOUNDS_CHANGED,
      this.shape,
      { bounds: this.shape.getBounds(), points: this.shape.points }
    );
  }, this.destroy = () => {
    this.shape.options.canDeletePoints && this.shape.root.removeEventListener("contextmenu", this.nocontextmenu), this.shape.root.removeEventListener("mouseup", this.mouseup), window.removeEventListener("window.resize", this.onWindowResize), h.unsubscribe(r.POINT_ADDED, this.onPointAdded), h.unsubscribe(r.POINT_DRAG_START, this.onPointDragStart), h.unsubscribe(r.POINT_DRAG_MOVE, this.onPointDragMove), h.unsubscribe(r.POINT_DRAG_END, this.onPointDragEnd), h.unsubscribe(r.POINT_DESTROYED, this.onPointDestroyed), this.shape.resizeBox && this.shape.resizeBox.removeEventListener(this.resizeBoxListener);
  };
}
const u = {
  CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
};
function y() {
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
    bounds: {},
    moveDirections: [
      p.LEFT,
      p.TOP,
      p.RIGHT,
      p.BOTTOM
    ]
  }, this.x = 0, this.y = 0, this.element = null, this.init = (t, i, s = null) => (this.x = t, this.y = i, this.element = this.createPointUI(), this.setOptions(s), this.addEventListeners(), h.emit(r.POINT_ADDED, this), this), this.setOptions = (t) => {
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
    this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown), h.subscribe(u.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange);
  }, this.mousedown = (t) => {
    t.buttons === 1 && this.options.canDrag && h.emit(r.POINT_DRAG_START, this);
  }, this.mousemove = (t) => {
    if (t.buttons !== 1 || !this.options.canDrag)
      return;
    const i = this.x, s = this.y, e = f(this.element.parentNode, !0);
    if (t.movementX + this.x < this.options.bounds.left || t.movementX + this.x > this.options.bounds.right) {
      h.emit(r.POINT_DRAG_MOVE, this, { oldX: i, oldY: s });
      return;
    }
    if (t.movementY + this.y < this.options.bounds.top || t.movementY + this.y > this.options.bounds.bottom) {
      h.emit(r.POINT_DRAG_MOVE, this, { oldX: i, oldY: s });
      return;
    }
    let o = t.clientX - e.left - this.options.width / 2, n = t.clientY - e.top - this.options.height / 2;
    [o, n] = this.applyMoveRestrictions(o, n, i, s), this.x = o, this.y = n, this.element.style.left = this.x + "px", this.element.style.top = this.y + "px", h.emit(r.POINT_DRAG_MOVE, this, { oldX: i, oldY: s });
  }, this.applyMoveRestrictions = (t, i, s, e) => (i > e && this.options.moveDirections.indexOf(p.BOTTOM) === -1 && (i = e), i < e && this.options.moveDirections.indexOf(p.TOP) === -1 && (i = e), t > s && this.options.moveDirections.indexOf(p.RIGHT) === -1 && (t = s), t < s && this.options.moveDirections.indexOf(p.LEFT) === -1 && (t = s), t > this.options.bounds.right && (t = this.options.bounds.right), i > this.options.bounds.bottom && (i = this.options.bounds.bottom), t < this.options.bounds.left && (t = this.options.bounds.left), i < this.options.bounds.top && (i = this.options.bounds.top), [t, i]), this.mouseup = (t) => {
    h.emit(r.POINT_DRAG_END, this), t.button === 2 && this.options.canDelete && this.destroy();
  }, this.onBoundsChange = (t) => {
    t.points.find((i) => i === this) && (this.options.bounds = t.bounds);
  }, this.destroy = () => {
    this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), h.emit(r.POINT_DESTROYED, this);
  }, this;
}
const r = {
  POINT_ADDED: "POINT_ADDED",
  POINT_DESTROYED: "POINT_DESTROYED",
  POINT_DRAG_START: "POINT_DRAG_START",
  POINT_DRAG_MOVE: "POINT_DRAG_MOVE",
  POINT_DRAG_END: "POINT_DRAG_END"
}, p = {
  TOP: 0,
  LEFT: 1,
  RIGHT: 2,
  BOTTOM: 3
};
function O() {
  this.draw = (t) => {
    if (t.points.length < 1 || (t.svg && (t.root.removeChild(t.svg), t.svg = null), t.calcPosition(), isNaN(t.width) || isNaN(t.height)))
      return;
    if (t.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), t.svg.ondragstart = function() {
      return !1;
    }, t.svg.id = t.options.id, t.svg.style.position = "absolute", t.svg.style.cursor = "crosshair", t.svg.style.left = t.left, t.svg.style.top = t.top, t.svg.setAttribute("width", t.width), t.svg.setAttribute("height", t.height), t.options.fillImage && typeof (t.options.fillImage === "object")) {
      const s = document.createElementNS(t.svg.namespaceURI, "defs"), e = this.createImageFill(t);
      e && s.appendChild(e), t.svg.appendChild(s);
    } else if (t.options.fillGradient && typeof (t.options.fillGradient === "object") && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1) {
      const s = document.createElementNS(t.svg.namespaceURI, "defs"), e = this.createGradient(t);
      s.appendChild(e), t.svg.appendChild(s);
    } else if (t.options.filters && typeof t.options.filters == "object" && Object.keys(t.options.filters).length) {
      const s = document.createElementNS(t.svg.namespaceURI, "defs"), e = this.createSVGFilters(t);
      s.append(e), t.svg.appendChild(s);
    }
    t.svg.style.zIndex = t.options.zIndex;
    const i = this.drawPolygon(t);
    t.svg.appendChild(i), t.root.appendChild(t.svg), t.svg.addEventListener("mousedown", t.eventListener.mousedown), t.points.forEach((s) => {
      s.options.zIndex = t.options.zIndex + 1, s.redraw();
    }), t.resizeBox && this.redrawResizeBox(t);
  }, this.drawPolygon = (t) => {
    let i = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    t.points.length > 2 && (i = document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
    const s = t.points.map((e) => "" + (e.x - t.left) + "," + (e.y - t.top)).join(" ");
    if (i.setAttribute("points", s), t.options.stroke && i.setAttribute("stroke", t.options.stroke), t.options.strokeWidth && i.setAttribute("stroke-width", t.options.strokeWidth), t.options.strokeLinecap && i.setAttribute("stroke-linecap", t.options.strokeLinecap), t.options.strokeDasharray && i.setAttribute("stroke-dasharray", t.options.strokeDasharray), t.options.fill && (t.options.fillImage && typeof t.options.fillImage == "object" ? i.setAttribute("fill", 'url("#' + t.guid + '_pattern")') : t.options.fillGradient && typeof (t.options.fillGradient === "object") && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1 ? i.setAttribute("fill", 'url("#' + t.guid + '_gradient")') : i.setAttribute("fill", t.options.fill)), t.options.fillOpacity && i.setAttribute("fill-opacity", t.options.fillOpacity), t.options.classes && i.setAttribute("class", t.options.classes), t.options.style)
      for (let e in t.options.style)
        i.style[e] = t.options.style[e];
    return t.svg.querySelector("defs") && t.svg.querySelector("defs").querySelector("filter") && (i.style.filter = 'url("#' + t.guid + '_filter")'), i.style.zIndex = t.options.zIndex, i;
  }, this.redrawResizeBox = (t) => {
    const i = t.getResizeBoxBounds();
    t.resizeBox.left = i.left, t.resizeBox.top = i.top, t.resizeBox.width = i.width, t.resizeBox.height = i.height, t.resizeBox.redraw();
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
      const n = document.createElementNS(t.svg.namespaceURI, "stop");
      n.setAttribute("offset", o.offset), n.setAttribute("stop-color", o.stopColor), n.setAttribute("stop-opacity", o.stopOpacity), i.appendChild(n);
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
  }, this.createSVGFilters = (t) => {
    const i = document.createElementNS(t.svg.namespaceURI, "filter");
    i.setAttribute("id", t.guid + "_filter");
    for (let s in t.options.filters) {
      const e = this.createSVGFilter(t, s, t.options.filters[s]);
      i.appendChild(e);
    }
    return i;
  }, this.createSVGFilter = (t, i, s) => {
    const e = document.createElementNS(t.svg.namespaceURI, i);
    for (let o in s)
      e.setAttributeNS(t.svg.namespaceURI, o, s[o]);
    return e;
  };
}
const P = new O();
function D() {
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
    filters: {},
    canDragShape: !0,
    canAddPoints: !1,
    canScale: !1,
    offsetX: 0,
    offsetY: 0,
    classes: "",
    style: {},
    pointOptions: {},
    zIndex: 1e3
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = b(), this.resizeBox = null, this.init = (t, i = null, s = null) => {
    if (!t) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    return this.root = t, this.root.style.position = "relative", this.draggedPoint = null, this.root.draggedShape = null, this.setOptions(i), this.eventListener = new _(this).run(), this.setupPoints(s, Object.assign({}, this.options.pointOptions)), this.options.canScale && this.setupResizeBox(), this;
  }, this.setupResizeBox = () => {
    const t = this.getResizeBoxBounds();
    this.resizeBox = new c().init(this.root, t.left, t.top, t.width, t.height, {
      zIndex: this.options.zIndex - 1,
      id: this.options.id + "_resizebox",
      shapeOptions: {
        canDragShape: !1
      }
    }), this.calcPosition(), this.eventListener.addResizeEventListener(), this.resizeBox.redraw();
  }, this.getResizeBoxBounds = () => {
    this.calcPosition();
    const [t, i] = this.getMaxPointSize(), s = {
      left: this.left - t - 5,
      right: this.right + t + 5,
      top: this.top - i - 5,
      bottom: this.bottom + i + 5,
      width: this.width + (t + 5) * 2,
      height: this.height + (i + 5) * 2
    };
    s.left < 0 && (this.moveTo(s.left * -1, this.top), s.left = 0), s.top < 0 && (this.moveTo(this.left, s.top * -1), s.top = 0);
    const e = this.getBounds();
    return s.bottom > e.bottom && (this.moveTo(this.left, s.bottom - e.bottom + this.top), s.bottom = e.bottom), s.right > e.right && (this.moveTo(s.right - e.right + this.left, this.top), s.bottom = e.bottom), s;
  }, this.getMaxPointSize = () => {
    const t = this.points.map((s) => s.options.width).reduce((s, e) => Math.max(s, e)), i = this.points.map((s) => s.options.height).reduce((s, e) => Math.max(s, e));
    return [t, i];
  }, this.setOptions = (t) => {
    t && typeof t == "object" && (t.pointOptions && typeof t.pointOptions == "object" && (t.pointOptions = Object.assign(this.options.pointOptions, t.pointOptions)), t.style && typeof t.style == "object" && (t.style = Object.assign(this.options.style, t.style)), Object.assign(this.options, t), this.points.forEach((i) => {
      i.setOptions(Object.assign({}, this.options.pointOptions)), i.options.bounds = this.getBounds(), i.options.zIndex <= this.options.zIndex && (i.options.zIndex = this.options.zIndex + 1), i.redraw();
    }));
  }, this.setupPoints = (t, i) => {
    typeof t == "object" && (this.points = [], this.addPoints(t, Object.assign({}, i)));
  }, this.addPoint = (t, i, s = null) => {
    const e = this.putPoint(t, i, Object.assign({}, s));
    return this.redraw(), e;
  }, this.addPoints = (t, i = null) => {
    !t || typeof t != "object" || (t.forEach((s) => this.putPoint(s[0] + this.options.offsetX, s[1] + this.options.offsetY, Object.assign({}, i))), this.redraw());
  }, this.putPoint = (t, i, s = null) => {
    if (this.findPoint(t, i))
      return console.error(`Point with x=${t} and y=${i} already exists`), null;
    s || (s = this.options.pointOptions || {}), s.bounds = this.getBounds(), s.zIndex = this.options.zIndex + 1;
    const e = new y().init(t, i, s);
    return this.points.push(e), this.root.appendChild(e.element), e;
  }, this.deletePoint = (t, i) => {
    const s = this.findPoint(t, i);
    s && s.destroy();
  }, this.findPoint = (t, i) => {
    const s = this.points.find((e) => e.x === t && e.y === i);
    return typeof s > "u" || !s ? null : s;
  }, this.findPointById = (t) => {
    const i = this.points.find((s) => s.options.id === t);
    return typeof i > "u" || !i ? null : i;
  }, this.getPointsArray = () => {
    let t = [];
    return this.points && typeof this.points == "object" && this.points.length && (t = this.points.map((i) => [i.x, i.y])), t;
  }, this.moveTo = (t, i) => {
    const s = this.getBounds();
    let e = t + this.width > s.right ? s.right - this.width : t, o = i + this.height > s.bottom ? s.bottom - this.height : i;
    this.points.forEach((n) => {
      n.x += e - this.left, n.y += o - this.top;
    }), this.calcPosition();
  }, this.scaleTo = (t, i) => {
    const s = this.getBounds();
    this.calcPosition();
    let e = this.left + t > s.right ? s.right - this.left : t, o = this.top + i > s.bottom ? s.bottom - this.top : i, n = e / this.width, l = o / this.height;
    this.points.forEach(
      (d) => {
        d.x = (d.x - this.left) * n + this.left, d.y = (d.y - this.top) * l + this.top;
      }
    ), this.calcPosition();
  }, this.redraw = () => {
    P.draw(this);
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
window.ResizeBox = c;
export {
  D as default
};
