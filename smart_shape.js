const _ = (t, i = !0) => {
  let s = 0, e = 0;
  if (!i)
    return { top: t.offsetTop - t.scrollTop, left: t.offsetLeft - t.scrollLeft };
  for (; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop); )
    s += t.offsetLeft - t.scrollLeft, e += t.offsetTop - t.scrollTop, t = t.offsetParent;
  return { top: e, left: s };
}, b = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
  var i = Math.random() * 16 | 0, s = t == "x" ? i : i & 3 | 8;
  return s.toString(16);
}).replace(/\-/g, ""), m = (t) => (t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1, !1);
function E() {
  this.subscriptions = {}, this.subscribe = (t, i) => ((typeof this.subscriptions[t] > "u" || !this.subscriptions[t]) && (this.subscriptions[t] = []), typeof this.subscriptions[t].find((s) => s === i) < "u" ? null : (this.subscriptions[t].push(i), i)), this.emit = (t, i, s = null) => ((!s || typeof s != "object") && (s = {}), s.type = t, s.target = i, typeof this.subscriptions[t] < "u" && this.subscriptions[t] && this.subscriptions[t].length ? (this.subscriptions[t].forEach((e) => e(s)), !0) : !1), this.unsubscribe = (t, i) => {
    if (typeof this.subscriptions[t] > "u" || !this.subscriptions[t])
      return !1;
    const s = this.subscriptions[t].indexOf(i);
    return s !== -1 ? (this.subscriptions[t].splice(s, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const o = new E();
function O(t) {
  this.resizeBox = t, this.subscriptions = {
    resize: []
  }, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    o.subscribe(p.POINT_DRAG_MOVE, this.onPointDragMove), o.subscribe(p.POINT_DRAG_END, this.onPointDragMove), this.shapeMouseEnter = this.resizeBox.shape.addEventListener(r.SHAPE_MOUSE_ENTER, (i) => {
      o.emit(r.SHAPE_MOUSE_ENTER, this.resizeBox, i);
    }), this.shapeMouseMove = this.resizeBox.shape.addEventListener(r.SHAPE_MOUSE_MOVE, (i) => {
      o.emit(r.SHAPE_MOUSE_MOVE, this.resizeBox, i);
    }), this.shapeMoveStart = this.resizeBox.shape.addEventListener(r.SHAPE_MOVE_START, (i) => {
      o.emit(r.SHAPE_MOVE_START, this.resizeBox, i);
    }), this.shapeMoveEnd = this.resizeBox.shape.addEventListener(r.SHAPE_MOVE_END, (i) => {
      o.emit(r.SHAPE_MOVE_END, this.resizeBox, i);
    }), this.shapeMove = this.resizeBox.shape.addEventListener(r.SHAPE_MOVE, (i) => {
      o.emit(r.SHAPE_MOVE, this.resizeBox, i);
    });
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
    const s = this.resizeBox.getPosition();
    this.resizeBox.calcPosition();
    const e = this.resizeBox.getPosition();
    this.resizeBox.redraw(), o.emit(f.RESIZE_BOX_RESIZE, this.resizeBox, { oldPos: s, newPos: e });
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
    typeof this.subscriptions[i] > "u" && (this.subscriptions[i] = []);
    const e = o.subscribe(i, (h) => {
      h.target.shape && h.target.shape.guid === this.resizeBox.shape.guid && s(h);
    });
    return this.subscriptions[i].push(e), e;
  }, this.removeEventListener = (i, s) => {
    this.subscriptions[i].splice(this.subscriptions[i].indexOf(s), 1), o.unsubscribe(i, s);
  }, this.destroy = () => {
    for (let i in this.subscriptions)
      this.subscriptions[i].forEach((e) => o.unsubscribe(i, e)), this.subscriptions[i] = [];
    this.resizeBox.shape.removeEventListener(r.SHAPE_MOVE_START, this.shapeMoveStart), this.resizeBox.shape.removeEventListener(r.SHAPE_MOVE, this.shapeMove), this.resizeBox.shape.removeEventListener(r.SHAPE_MOVE_END, this.shapeMoveEnd), this.resizeBox.shape.removeEventListener(r.SHAPE_MOUSE_ENTER, this.shapeMouseEnter), this.resizeBox.shape.removeEventListener(r.SHAPE_MOUSE_MOVE, this.shapeMouseMove), o.unsubscribe(p.POINT_DRAG_MOVE, this.onPointDragMove), o.unsubscribe(p.POINT_DRAG_END, this.onPointDragMove);
  };
}
function x() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = b(), this.options = {
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
  }, this.eventListener = null, this.left_top = null, this.left_center = null, this.left_bottom = null, this.center_top = null, this.center_bottom = null, this.right_top = null, this.right_center = null, this.right_bottom = null, this.init = (t, i, s, e, h, n = {}) => (this.left = parseInt(i), this.top = parseInt(s), this.width = parseInt(e), this.height = parseInt(h), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id + "_shape", this.shape = new w().init(t, Object.assign({}, this.options.shapeOptions), []), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new O(this).run(), this.redraw(), o.emit(r.SHAPE_CREATE, this, {}), this), this.setOptions = (t = {}) => {
    t && typeof t == "object" && (t.shapeOptions && typeof t.shapeOptions == "object" ? (t.shapeOptions.pointOptions && typeof t.shapeOptions.pointOptions == "object" ? t.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions, t.shapeOptions.pointOptions) : t.shapeOptions.pointOptions = Object.assign({}, this.options.shapeOptions.pointOptions), t.shapeOptions = Object.assign(this.options.shapeOptions, t.shapeOptions)) : t.shapeOptions = Object.assign({}, this.options.shapeOptions), t.shapeOptions.zIndex = t.zIndex || this.options.zIndex, t.shapeOptions.id = t.id ? t.id + "_shape" : this.options.id + "_shape", Object.assign(this.options, t), this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { cursor: "nw-resize" } }), this.center_top = this.shape.addPoint(this.left + this.width / 2, this.top, { id: this.shape.guid + "_center_top", style: { cursor: "ns-resize" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { cursor: "ne-resize" } }), this.right_center = this.shape.addPoint(this.right, this.top + this.height / 2, { id: this.shape.guid + "_right_center", style: { cursor: "ew-resize" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { cursor: "se-resize" } }), this.center_bottom = this.shape.addPoint(this.left + this.width / 2, this.bottom, { id: this.shape.guid + "_center_bottom", style: { cursor: "ns-resize" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { cursor: "sw-resize" } }), this.left_center = this.shape.addPoint(this.left, this.top + this.height / 2, { id: this.shape.guid + "_left_center", style: { cursor: "ew-resize" } }), this.setPointsOptions();
  }, this.setPointsOptions = () => {
    this.setPointsMoveDirections(), this.setPointsMoveBounds();
  }, this.setPointsMoveDirections = () => {
    this.center_top.setOptions({ moveDirections: [d.TOP, d.BOTTOM] }), this.center_bottom.setOptions({ moveDirections: [d.TOP, d.BOTTOM] }), this.left_center.setOptions({ moveDirections: [d.LEFT, d.RIGHT] }), this.right_center.setOptions({ moveDirections: [d.LEFT, d.RIGHT] });
  }, this.setPointsMoveBounds = () => {
    this.left_top.options.bounds.bottom = this.left_bottom.y - this.left_bottom.options.height - this.left_center.options.height, this.left_top.options.bounds.right = this.right_top.x - this.right_top.options.width - this.center_top.options.width, this.center_top.options.bounds.bottom = this.left_bottom.y - this.left_bottom.options.height - this.left_center.options.height, this.right_top.options.bounds.bottom = this.left_bottom.y - this.left_bottom.options.height - this.left_center.options.height, this.right_top.options.bounds.left = this.left_top.x + this.right_top.options.width + this.center_top.options.width, this.right_center.options.bounds.left = this.left_top.x + this.right_center.options.width + this.center_top.options.width, this.right_bottom.options.bounds.left = this.left_top.x + this.right_bottom.options.width + this.center_bottom.options.width, this.right_bottom.options.bounds.top = this.right_top.y + this.right_top.options.height + this.right_center.options.height, this.center_bottom.options.bounds.top = this.center_top.y + this.center_top.options.height + this.right_center.options.height, this.left_bottom.options.bounds.right = this.right_bottom.x - this.right_bottom.options.width - this.center_bottom.options.width, this.left_bottom.options.bounds.top = this.left_top.y + this.left_top.options.height + this.left_center.options.height, this.left_center.options.bounds.right = this.right_center.x - this.right_center.options.width - this.center_top.options.width;
  }, this.adjustCoordinates = () => {
    this.right = this.left + this.width, this.bottom = this.top + this.height, this.left_top.x = this.left, this.left_top.y = this.top, this.right_top.x = this.right, this.right_top.y = this.top, this.left_bottom.x = this.left, this.left_bottom.y = this.bottom, this.right_bottom.x = this.right, this.right_bottom.y = this.bottom, this.center_top.y = this.top, this.center_bottom.y = this.bottom, this.left_center.x = this.left, this.right_center.x = this.right, this.adjustCenters();
  }, this.adjustCenters = () => {
    this.center_top.x = parseInt(this.left_top.x + (this.right_top.x - this.left_top.x) / 2), this.center_bottom.x = parseInt(this.left_top.x + (this.right_top.x - this.left_top.x) / 2), this.left_center.y = parseInt(this.left_top.y + (this.left_bottom.y - this.left_top.y) / 2), this.right_center.y = parseInt(this.right_top.y + (this.right_bottom.y - this.right_top.y) / 2);
  }, this.calcPosition = () => {
    this.shape.calcPosition(), this.left = this.shape.left, this.top = this.shape.top, this.bottom = this.shape.bottom, this.right = this.shape.right, this.width = this.shape.width, this.height = this.shape.height;
  }, this.getPosition = () => ({ top: this.top, left: this.left, bottom: this.bottom, right: this.right, width: this.width, height: this.height }), this.redraw = () => {
    this.adjustCoordinates(), this.shape.setOptions(this.options.shapeOptions), this.setPointsMoveBounds(), this.shape.redraw();
  }, this.show = () => {
    this.options.shapeOptions.visible = !0, this.shape.show();
  }, this.hide = () => {
    this.options.shapeOptions.visible = !1, this.shape.hide();
  }, this.destroy = () => {
    o.emit(r.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (t, i) => this.eventListener.addEventListener(t, i), this.removeEventListener = (t, i) => {
    this.eventListener.removeEventListener(t, i);
  };
}
const f = {
  RESIZE_BOX_RESIZE: "resize"
};
function P(t) {
  this.shape = t, this.subscriptions = {
    CONTAINER_BOUNDS_CHANGED: []
  }, this.run = () => (this.shape = t, this.setEventListeners(), this), this.setEventListeners = () => {
    this.shape.root.getAttribute("sh_listeners") !== "true" && (this.shape.root.setAttribute("sh_listeners", "true"), this.shape.root.addEventListener("mousemove", (i) => {
      this.shape.root.draggedShape && this.shape.root.draggedShape.eventListener.mousemove(i);
    }), this.shape.root.addEventListener("mouseup", this.mouseup), this.shape.root.addEventListener("dblclick", this.doubleclick), this.shape.root.addEventListener("mouseenter", this.mouseenter), this.checkCanDeletePoints()), window.addEventListener("resize", this.onWindowResize), o.subscribe(p.POINT_ADDED, this.onPointAdded), o.subscribe(p.POINT_DRAG_START, this.onPointDragStart), o.subscribe(p.POINT_DRAG_MOVE, this.onPointDragMove), o.subscribe(p.POINT_DRAG_END, this.onPointDragEnd), o.subscribe(p.POINT_DESTROYED, this.onPointDestroyed);
  }, this.addResizeEventListener = () => {
    !this.shape.resizeBox || (this.resizeBoxListener = this.shape.resizeBox.addEventListener(f.RESIZE_BOX_RESIZE, (i) => {
      const s = i.newPos.left - i.oldPos.left, e = i.newPos.top - i.oldPos.top;
      this.shape.moveTo(this.shape.left + s, this.shape.top + e);
      const [h, n] = this.shape.getMaxPointSize();
      this.shape.scaleTo(i.newPos.width - (h + 5) * 2, i.newPos.height - (n + 5) * 2), this.shape.redraw();
    }));
  }, this.mouseup = (i) => {
    if (this.shape.root.draggedShape) {
      const s = this.shape.root.draggedShape;
      i.buttons === 1 && s.options.canAddPoints && !s.draggedPoint && (s.options.maxPoints === -1 || s.points.length < s.options.maxPoints) && s.addPoint(i.clientX - s.root.offsetLeft, i.clientY - s.root.offsetTop), this.shape.root.draggedShape.draggedPoint && (this.shape.root.draggedShape.draggedPoint.mouseup(i), this.shape.root.draggedShape && (this.shape.root.draggedShape.draggedPoint = null)), this.shape.root.draggedShape = null, o.emit(r.SHAPE_MOVE_END, s);
    }
  }, this.doubleclick = (i) => {
    i.stopPropagation(), this.shape.options.canAddPoints && !this.shape.draggedPoint && (this.shape.options.maxPoints === -1 || this.shape.points.length < this.shape.options.maxPoints) && this.shape.addPoint(
      i.clientX - this.shape.root.offsetLeft + window.scrollX,
      i.clientY - this.shape.root.offsetTop + window.scrollY
    );
  }, this.mousedown = (i) => {
    m(i), this.shape.root.draggedShape = this.shape, o.emit(r.SHAPE_MOVE_START, this.shape);
  }, this.mousemove = (i) => {
    if (o.emit(r.SHAPE_MOUSE_MOVE, this.shape, { clientX: i.clientX, clientY: i.clientY }), i.buttons !== 1) {
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
    if (s === null || e === null)
      return;
    const h = this.shape.getPosition();
    for (let l in this.shape.points)
      this.shape.points[l].x += s, this.shape.points[l].y += e, this.shape.points[l].redraw();
    this.shape.redraw();
    const n = this.shape.getPosition();
    o.emit(r.SHAPE_MOVE, this.shape, { oldPos: h, newPos: n });
  }, this.mouseenter = (i) => {
    o.emit(r.SHAPE_MOUSE_ENTER, this.shape, { clientX: i.clientX, clientY: i.clientY }), i.buttons !== 1 && (this.shape.root.draggedShape && (this.shape.root.draggedShape.draggedPoint = null), this.shape.root.draggedShape = null);
  }, this.calcMovementOffset = (i) => {
    this.shape.calcPosition();
    let s = i.movementX, e = i.movementY, h = i.clientX + window.scrollX, n = i.clientY + window.scrollY;
    const l = this.shape.left + s, a = this.shape.top + e, u = _(this.shape.root, !0), c = this.shape.getBounds();
    return l < c.left || l + this.shape.width > c.right ? [null, null] : a < c.top || a + this.shape.height > c.bottom ? [null, null] : (h < l + u.left && (s = h - (l + u.left)), n < a + u.top && (e = n - (a + u.top)), h > l + this.shape.width + u.left && (s = h - (this.shape.width + u.left + this.shape.left)), n > a + this.shape.height + u.right && (e = n - (this.shape.height + u.top + this.shape.top)), [s, e]);
  }, this.onPointAdded = (i) => {
    this.checkCanDeletePoints();
  }, this.checkCanDeletePoints = () => {
    this.shape.points.find((i) => i.options.canDelete === !0) && (this.nocontextmenu = this.shape.root.addEventListener("contextmenu", (i) => i.preventDefault()));
  }, this.onPointDragStart = (i) => {
    !this.shape.isShapePoint(i.target) || (this.shape.root.draggedShape = this.shape, this.shape.draggedPoint = i.target);
  }, this.onPointDragMove = (i) => {
    !this.shape.isShapePoint(i.target) || this.shape.redraw();
  }, this.onPointDragEnd = (i) => {
    !this.shape.isShapePoint(i.target) || (this.shape.root.draggedShape = null, this.shape.draggedPoint = null);
  }, this.onPointDestroyed = (i) => {
    !this.shape.isShapePoint(i.target) || (this.shape.points.splice(this.shape.points.indexOf(i.target), 1), this.shape.root.removeChild(i.target.element), this.shape.redraw());
  }, this.onWindowResize = () => {
    o.emit(
      g.CONTAINER_BOUNDS_CHANGED,
      this.shape,
      { bounds: this.shape.getBounds(), points: this.shape.points }
    );
  }, this.addEventListener = (i, s) => {
    typeof this.subscriptions[i] > "u" && (this.subscriptions[i] = []);
    const e = o.subscribe(i, (h) => {
      h.target.guid === this.shape.guid && s(h);
    });
    return this.subscriptions[i].push(e), e;
  }, this.removeEventListener = (i, s) => {
    this.subscriptions[i].splice(this.subscriptions[i].indexOf(s), 1), o.unsubscribe(i, s);
  }, this.destroy = () => {
    this.shape.options.canDeletePoints && this.shape.root.removeEventListener("contextmenu", this.nocontextmenu), window.removeEventListener("resize", this.onWindowResize), this.shape.svg && this.shape.svg.removeEventListener("mouseenter", this.shape.svg_mouseenter), o.unsubscribe(p.POINT_ADDED, this.onPointAdded), o.unsubscribe(p.POINT_DRAG_START, this.onPointDragStart), o.unsubscribe(p.POINT_DRAG_MOVE, this.onPointDragMove), o.unsubscribe(p.POINT_DRAG_END, this.onPointDragEnd), o.unsubscribe(p.POINT_DESTROYED, this.onPointDestroyed), this.shape.resizeBox && this.shape.resizeBox.removeEventListener(f.RESIZE_BOX_RESIZE, this.resizeBoxListener);
    for (let i in this.subscriptions)
      this.subscriptions[i].forEach((e) => o.unsubscribe(i, e)), this.subscriptions[i] = [];
  };
}
const g = {
  CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
}, r = {
  SHAPE_CREATE: "create",
  SHAPE_MOVE_START: "move_start",
  SHAPE_MOVE: "move",
  SHAPE_MOVE_END: "move_end",
  SHAPE_MOUSE_MOVE: "mousemove",
  SHAPE_MOUSE_ENTER: "mouseenter",
  SHAPE_DESTROY: "destroy"
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
      d.LEFT,
      d.TOP,
      d.RIGHT,
      d.BOTTOM
    ],
    visible: !0
  }, this.x = 0, this.y = 0, this.element = null, this.guid = b(), this.subscriptions = {}, this.init = (t, i, s = null) => (this.x = parseInt(t), this.y = parseInt(i), this.element = this.createPointUI(), this.setOptions(s), this.setEventListeners(), o.emit(p.POINT_ADDED, this), this), this.setOptions = (t) => {
    t && typeof t == "object" && (t.style && typeof t.style == "object" && (t.style = Object.assign(this.options.style, t.style)), Object.assign(this.options, t)), this.options.id && (this.element.id = this.options.id);
  }, this.createPointUI = () => {
    const t = document.createElement("div");
    return this.options.canDrag ? this.setPointStyles(t) : t;
  }, this.setPointStyles = (t = null) => {
    if (t == null && (t = this.element), this.options.id && (this.element.id = this.options.id), t.className = this.options.classes, t.style = this.options.style, typeof this.options.style == "object")
      for (let i in this.options.style)
        t.style[i] = this.options.style[i];
    return t.style.width = this.options.width + "px", t.style.height = this.options.height + "px", t.style.left = this.x - parseInt(this.options.width / 2) + "px", t.style.top = this.y - parseInt(this.options.height / 2) + "px", t.style.zIndex = this.options.zIndex, !this.options.canDrag || !this.options.visible ? t.style.display = "none" : t.style.display = "", t;
  }, this.redraw = () => {
    this.element = this.setPointStyles();
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.setEventListeners = () => {
    this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown), o.subscribe(g.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange);
  }, this.mousedown = (t) => {
    t.buttons === 1 && this.options.canDrag && (o.emit(p.POINT_DRAG_START, this), m(t));
  }, this.mousemove = (t) => {
    if (o.emit(p.POINT_MOUSE_MOVE, this, { clientX: t.clientX, clientY: t.clientY }), t.buttons !== 1 || !this.options.canDrag)
      return;
    const i = this.x, s = this.y, e = _(this.element.parentNode, !0);
    if (!this.checkFitBounds(this.x + t.movementX, this.y + t.movementY)) {
      o.emit(p.POINT_DRAG_MOVE, this, { oldX: i, oldY: s });
      return;
    }
    let h = t.clientX + window.scrollX - e.left - this.options.width / 2, n = t.clientY + window.scrollY - e.top - this.options.height / 2;
    [h, n] = this.applyMoveRestrictions(h, n, i, s), this.x = h, this.y = n, this.element.style.left = this.x + "px", this.element.style.top = this.y + "px", o.emit(p.POINT_DRAG_MOVE, this, { oldX: i, oldY: s });
  }, this.checkFitBounds = (t, i) => !(this.options.bounds.left !== -1 && t < this.options.bounds.left || this.options.bounds.right !== -1 && t > this.options.bounds.right || this.options.bounds.top !== -1 && i < this.options.bounds.top || this.options.bounds.bottom !== -1 && i > this.options.bounds.bottom), this.applyMoveRestrictions = (t, i, s, e) => (i > e && this.options.moveDirections.indexOf(d.BOTTOM) === -1 && (i = e), i < e && this.options.moveDirections.indexOf(d.TOP) === -1 && (i = e), t > s && this.options.moveDirections.indexOf(d.RIGHT) === -1 && (t = s), t < s && this.options.moveDirections.indexOf(d.LEFT) === -1 && (t = s), t > this.options.bounds.right && (t = this.options.bounds.right), i > this.options.bounds.bottom && (i = this.options.bounds.bottom), t < this.options.bounds.left && (t = this.options.bounds.left), i < this.options.bounds.top && (i = this.options.bounds.top), [t, i]), this.mouseup = (t) => {
    o.emit(p.POINT_DRAG_END, this), t.button === 2 && this.options.canDelete && this.destroy();
  }, this.onBoundsChange = (t) => {
    t.points.find((i) => i === this) && (this.options.bounds = t.bounds);
  }, this.destroy = () => {
    this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), o.unsubscribe(g.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange), o.emit(p.POINT_DESTROYED, this);
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((s) => o.unsubscribe(t, s)), this.subscriptions[t] = [];
  }, this.addEventListener = (t, i) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const s = o.subscribe(t, (e) => {
      e.target.guid === this.guid && i(e);
    });
    return this.subscriptions[t].push(s), s;
  }, this.removeEventListener = (t, i) => {
    this.subscriptions[t].splice(this.subscriptions[t].indexOf(i), 1), o.unsubscribe(t, i);
  }, this;
}
const p = {
  POINT_ADDED: "create",
  POINT_DESTROYED: "destroy",
  POINT_DRAG_START: "move_start",
  POINT_DRAG_MOVE: "move",
  POINT_DRAG_END: "move_end",
  POINT_MOUSE_MOVE: "mousemove"
}, d = {
  TOP: 0,
  LEFT: 1,
  RIGHT: 2,
  BOTTOM: 3
};
function v() {
  this.draw = (t) => {
    if (t.points.length < 1)
      return;
    t.svg && (t.root.removeChild(t.svg), t.svg = null), t.calcPosition(), t.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), t.svg.ondragstart = function() {
      return !1;
    }, t.svg.id = t.options.id, t.svg.style.position = "absolute", t.svg.style.cursor = "crosshair", t.svg.style.left = t.left, t.svg.style.top = t.top, t.svg.setAttribute("width", t.width), t.svg.setAttribute("height", t.height), this.setupShapeFill(t), this.setupSVGFilters(t), t.svg.style.zIndex = t.options.zIndex;
    const i = this.drawPolygon(t);
    t.svg.appendChild(i), t.root.appendChild(t.svg), t.svg.addEventListener("mousedown", t.eventListener.mousedown), t.svg_mouseenter = t.svg.addEventListener("mouseenter", t.eventListener.mouseenter), typeof t.options.visible < "u" && (t.svg.style.display = t.options.visible ? "" : "none"), t.points.forEach((s) => {
      s.options.zIndex = t.options.zIndex + 1, t.options.visible || (s.options.visible = !1), s.redraw();
    }), t.resizeBox && this.redrawResizeBox(t);
  }, this.drawPolygon = (t) => {
    let i = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    t.points.length > 2 && (i = document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
    const s = t.points.map((e) => "" + (e.x - t.left) + "," + (e.y - t.top)).join(" ");
    return i.setAttribute("points", s), this.setupPolygonStroke(t, i), this.setupPolygonFill(t, i), this.setupPolygonStyles(t, i), t.svg.querySelector("defs") && t.svg.querySelector("defs").querySelector("filter") && (i.style.filter = 'url("#' + t.guid + '_filter")'), i.style.zIndex = t.options.zIndex, i;
  }, this.redrawResizeBox = (t) => {
    const i = t.getResizeBoxBounds();
    t.resizeBox.left = i.left, t.resizeBox.top = i.top, t.resizeBox.width = i.width, t.resizeBox.height = i.height, t.resizeBox.redraw();
  }, this.setupShapeFill = (t) => {
    if (t.options.fillImage && typeof (t.options.fillImage === "object")) {
      const i = document.createElementNS(t.svg.namespaceURI, "defs"), s = this.createImageFill(t);
      s && i.appendChild(s), t.svg.appendChild(i);
    } else if (t.options.fillGradient && typeof (t.options.fillGradient === "object") && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1) {
      const i = document.createElementNS(t.svg.namespaceURI, "defs"), s = this.createGradient(t);
      i.appendChild(s), t.svg.appendChild(i);
    }
  }, this.createGradient = (t) => {
    let i = document.createElementNS(t.svg.namespaceURI, "linearGradient");
    const s = t.options.fillGradient;
    s.type === "radial" && (i = document.createElementNS(t.svg.namespaceURI, "radialGradient")), i.id = t.guid + "_gradient";
    let e = !1;
    for (let h in s)
      if (h !== "type") {
        if (h === "steps") {
          e = !0;
          continue;
        }
        i.setAttribute(h, s[h]);
      }
    if (!e)
      return i;
    for (let h of s.steps) {
      const n = document.createElementNS(t.svg.namespaceURI, "stop");
      n.setAttribute("offset", h.offset), n.setAttribute("stop-color", h.stopColor), n.setAttribute("stop-opacity", h.stopOpacity), i.appendChild(n);
    }
    return i;
  }, this.createImageFill = (t) => {
    const i = t.options.fillImage;
    if (!i.href || !i.width || !i.height)
      return console.error("Image HREF, width and height must be specified for Image Fill"), null;
    const s = document.createElementNS(t.svg.namespaceURI, "pattern");
    s.setAttribute("id", t.guid + "_pattern"), s.setAttribute("patternUnits", "userSpaceOnUse");
    for (let h in i)
      h !== "href" && s.setAttribute(h, i[h]);
    const e = document.createElementNS(t.svg.namespaceURI, "image");
    return e.setAttribute("href", i.href), e.setAttribute("width", i.width), e.setAttribute("height", i.height), s.appendChild(e), s;
  }, this.setupSVGFilters = (t) => {
    if (t.options.filters && typeof t.options.filters == "object" && Object.keys(t.options.filters).length) {
      let i = t.svg.querySelector("defs");
      i || (i = document.createElementNS(t.svg.namespaceURI, "defs"), t.svg.appendChild(i));
      const s = this.createSVGFilters(t);
      i.append(s);
    }
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
    for (let h in s) {
      let n = h;
      e.setAttribute(n, s[h].toString()), h === "dx" && t.svg.setAttribute("width", t.width + parseInt(s.dx) * 2), h === "dy" && t.svg.setAttribute("height", t.height + parseInt(s.dy) * 2);
    }
    return e;
  }, this.setupPolygonStroke = (t, i) => {
    t.options.stroke && i.setAttribute("stroke", t.options.stroke), t.options.strokeWidth && i.setAttribute("stroke-width", t.options.strokeWidth), t.options.strokeLinecap && i.setAttribute("stroke-linecap", t.options.strokeLinecap), t.options.strokeDasharray && i.setAttribute("stroke-dasharray", t.options.strokeDasharray);
  }, this.setupPolygonFill = (t, i) => {
    t.options.fill && (t.options.fillImage && typeof t.options.fillImage == "object" ? i.setAttribute("fill", 'url("#' + t.guid + '_pattern")') : t.options.fillGradient && typeof (t.options.fillGradient === "object") && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1 ? i.setAttribute("fill", 'url("#' + t.guid + '_gradient")') : i.setAttribute("fill", t.options.fill)), t.options.fillOpacity && i.setAttribute("fill-opacity", t.options.fillOpacity);
  }, this.setupPolygonStyles = (t, i) => {
    if (t.options.classes && i.setAttribute("class", t.options.classes), t.options.style)
      for (let s in t.options.style)
        i.style[s] = t.options.style[s];
  };
}
const S = new v();
function w() {
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
    zIndex: 1e3,
    bounds: { left: -1, top: -1, right: -1, bottom: -1 },
    visible: !0
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = b(), this.resizeBox = null, this.init = (t, i = null, s = null) => {
    if (!t) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    return this.root = t, this.root.style.position = "relative", this.draggedPoint = null, this.root.draggedShape = null, this.setOptions(i), this.eventListener = new P(this).run(), this.setupPoints(s, Object.assign({}, this.options.pointOptions)), this.options.canScale && this.setupResizeBox(), o.emit(r.SHAPE_CREATE, this, {}), this;
  }, this.setupResizeBox = () => {
    const t = this.getResizeBoxBounds();
    this.resizeBox = new x().init(this.root, t.left, t.top, t.width, t.height, {
      zIndex: this.options.zIndex - 1,
      id: this.options.id + "_resizebox",
      shapeOptions: {
        canDragShape: !1,
        visible: this.options.visible
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
    t && typeof t == "object" && (t.pointOptions && typeof t.pointOptions == "object" && (t.pointOptions = Object.assign(this.options.pointOptions, t.pointOptions)), t.style && typeof t.style == "object" && (t.style = Object.assign(this.options.style, t.style)), t.bounds && typeof t.bounds == "object" && (t.bounds = Object.assign(this.options.bounds, t.bounds)), typeof t.visible < "u" && t.visible !== this.options.visible && (this.points.forEach((i) => i.options.visible = t.visible), this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: t.visible } })), Object.assign(this.options, t), this.points.forEach((i) => {
      i.setOptions(Object.assign({}, this.options.pointOptions)), i.options.bounds = this.getBounds(), i.options.zIndex <= this.options.zIndex && (i.options.zIndex = this.options.zIndex + 1), i.redraw();
    }));
  }, this.setupPoints = (t, i) => {
    t && typeof t == "object" && (this.points = [], this.addPoints(t, Object.assign({}, i)));
  }, this.addPoint = (t, i, s = null) => {
    const e = this.putPoint(t, i, Object.assign({}, s));
    return this.redraw(), e;
  }, this.addPoints = (t, i = null) => {
    !t || typeof t != "object" || (t.forEach(
      (s) => this.putPoint(s[0] + this.options.offsetX, s[1] + this.options.offsetY, Object.assign({}, i))
    ), this.redraw());
  }, this.putPoint = (t, i, s = null) => {
    if (this.findPoint(t, i))
      return console.error(`Point with x=${t} and y=${i} already exists`), null;
    s || (s = Object.assign({}, this.options.pointOptions) || {}), s.bounds = this.getBounds(), s.zIndex = this.options.zIndex + 1;
    const e = new y().init(t, i, s);
    return this.points.push(e), this.root.appendChild(e.element), e;
  }, this.deleteAllPoints = () => {
    for (; this.points.length; )
      this.points[0].destroy();
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
    let e = t + this.width > s.right ? s.right - this.width : t, h = i + this.height > s.bottom ? s.bottom - this.height : i;
    this.points.forEach((n) => {
      n.x += e - this.left, n.y += h - this.top;
    }), this.calcPosition();
  }, this.scaleTo = (t, i) => {
    const s = this.getBounds();
    this.calcPosition(), this.width >= 10 && t < 10 && (t = 10), this.height >= 10 && i < 10 && (i = 10);
    let e = this.left + t > s.right ? s.right - this.left : t, h = this.top + i > s.bottom ? s.bottom - this.top : i, n = e / this.width, l = h / this.height;
    this.points.forEach(
      (a) => {
        a.x = (a.x - this.left) * n + this.left, a.y = (a.y - this.top) * l + this.top;
      }
    ), this.calcPosition();
  }, this.redraw = () => {
    S.draw(this);
  }, this.calcPosition = () => {
    this.left = this.points.map((t) => t.x).reduce((t, i) => i < t ? i : t), this.top = this.points.map((t) => t.y).reduce((t, i) => i < t ? i : t), this.right = this.points.map((t) => t.x).reduce((t, i) => i > t ? i : t), this.bottom = this.points.map((t) => t.y).reduce((t, i) => i > t ? i : t), this.width = this.right - this.left || 1, this.height = this.bottom - this.top || 1;
  }, this.getPosition = () => ({ top: this.top, left: this.left, bottom: this.bottom, right: this.right, width: this.width, height: this.height }), this.getBounds = () => ({
    left: this.options.bounds.left !== -1 ? this.options.bounds.left : this.root.clientLeft,
    top: this.options.bounds.top !== -1 ? this.options.bounds.top : this.root.clientTop,
    right: this.options.bounds.right !== -1 ? this.options.bounds.right : this.root.clientLeft + this.root.clientWidth,
    bottom: this.options.bounds.bottom !== -1 ? this.options.bounds.bottom : this.root.clientTop + this.root.clientHeight
  }), this.isShapePoint = (t) => !!this.points.find((i) => i === t), this.addEventListener = (t, i) => this.eventListener.addEventListener(t, i), this.removeEventListener = (t, i) => {
    this.eventListener.removeEventListener(t, i);
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.destroy = () => {
    for (; this.points.length > 0; )
      this.points[0].destroy();
    o.emit(r.SHAPE_DESTROY, this, {}), this.eventListener && this.eventListener.destroy(), this.root && this.svg && this.root.removeChild(this.svg);
  };
}
try {
  window.ResizeBox = x;
} catch {
}
export {
  w as default
};
