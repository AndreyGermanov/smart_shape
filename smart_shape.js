function k() {
  this.subscriptions = {}, this.subscribe = (t, s) => ((typeof this.subscriptions[t] > "u" || !this.subscriptions[t]) && (this.subscriptions[t] = []), typeof this.subscriptions[t].find((e) => e === s) < "u" ? null : (this.subscriptions[t].push(s), s)), this.emit = (t, s, e = null) => {
    if ((!e || typeof e != "object") && (e = {}), e.type = t, e.target = s, typeof this.subscriptions[t] < "u" && this.subscriptions[t] && this.subscriptions[t].length) {
      for (let i of this.subscriptions[t])
        i(e);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (t, s) => {
    if (typeof this.subscriptions[t] > "u" || !this.subscriptions[t])
      return !1;
    const e = this.subscriptions[t].indexOf(s);
    return e !== -1 ? (this.subscriptions[t].splice(e, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const n = new k(), V = (t) => t * (Math.PI / 180), H = (t) => t * (180 / Math.PI), B = (t, s, e, i, o) => {
  const h = V(t), u = (s - i) * Math.cos(h) - (e - o) * Math.sin(h) + i, l = (s - i) * Math.sin(h) + (e - o) * Math.cos(h) + o;
  return [u, l];
}, x = (t, s, e, i) => Math.sqrt(Math.pow(e - t, 2) + Math.pow(i - s, 2)), G = (t, s) => {
  const e = (a, d, c) => d.x <= Math.max(a.x, c.x) && d.x >= Math.min(a.x, c.x) && d.y <= Math.max(a.y, c.y) && d.y >= Math.min(a.y, c.y), i = (a, d, c) => {
    let E = (d[1] - a[1]) * (c[0] - d[0]) - (d[0] - a[0]) * (c[1] - d[1]);
    return E === 0 ? 0 : E > 0 ? 1 : 2;
  }, o = (a, d, c, E) => {
    let R = i(a, d, c), S = i(a, d, E), C = i(c, E, a), w = i(c, E, d);
    return R !== S && C !== w || R === 0 && e(a, c, d) || S === 0 && e(a, E, d) || C === 0 && e(c, a, E) ? !0 : !!(w === 0 && e(c, d, E));
  };
  if (t.length < 3)
    return !1;
  let h = [1e4, s[1]], u = 0, l = 0;
  do {
    let a = (l + 1) % t.length;
    if (o(t[l], t[a], s, h)) {
      if (i(t[l], s, t[a]) === 0)
        return e(
          t[l],
          s,
          t[a]
        );
      u++;
    }
    l = a;
  } while (l !== 0);
  return u % 2 === 1;
}, M = (t, s, e, i) => !t && !s ? [e, i] : t && s ? [t, s] : (t || (t = s * (e / i)), s || (s = t * (i / e)), [t, s]), L = (t, s = !0) => {
  let e = 0, i = 0;
  if (!s)
    return { top: t.offsetTop - t.scrollTop, left: t.offsetLeft - t.scrollLeft };
  for (; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop); )
    e += t.offsetLeft - t.scrollLeft, i += t.offsetTop - t.scrollTop, t = t.offsetParent;
  return { top: i, left: e };
}, y = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
  const s = Math.random() * 16 | 0;
  return (t === "x" ? s : s & 3 | 8).toString(16);
}).replace(/-/g, ""), U = (t) => {
  try {
    t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1;
  } catch {
  }
  return !1;
}, b = (t) => typeof t < "u" && t !== null, O = (t, s) => t && typeof t == "object" && s && typeof s == "object" ? Object.assign(t, s) : t, j = (t) => {
  const s = atob(t.split(",")[1]), e = t.split(",")[0].split(":")[1].split(";")[0], i = new ArrayBuffer(s.length), o = new Uint8Array(i);
  for (let h = 0; h < s.length; h++)
    o[h] = s.charCodeAt(h);
  return new Blob([i], { type: e });
}, p = (t, s = {}) => {
  const e = {};
  for (let i in t)
    i !== "type" && i !== "target" && (e[i] = t[i]);
  return Object.keys(s).forEach((i) => {
    e[i] = s[i];
  }), e;
}, F = (t) => [t.pageX, t.pageY];
function K() {
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
    canDelete: !1,
    zIndex: 1e3,
    bounds: {},
    moveDirections: [
      f.LEFT,
      f.TOP,
      f.RIGHT,
      f.BOTTOM
    ],
    visible: !0,
    hidden: !1,
    forceDisplay: !1
  }, this.x = 0, this.y = 0, this.element = null, this.guid = y(), this.subscriptions = {}, this.init = (t, s, e = null) => (this.x = parseInt(t), this.y = parseInt(s), this.element = this.createPointUI(), this.setOptions(e), this.setEventListeners(), n.emit(g.POINT_ADDED, this), this), this.setOptions = (t) => {
    t && typeof t == "object" && (t.style && typeof t.style == "object" && (t.style = Object.assign(this.options.style, t.style)), Object.assign(this.options, t)), this.options.id && (this.element.id = this.options.id);
  }, this.createPointUI = () => {
    const t = document.createElement("div");
    return this.options.canDrag ? this.setPointStyles(t) : t;
  }, this.setPointStyles = (t = null) => {
    if (t == null && (t = this.element), this.options.id && (this.element.id = this.options.id), t.className = this.options.classes, t.style = this.options.style, typeof this.options.style == "object")
      for (let s in this.options.style)
        t.style[s] = this.options.style[s];
    return t.style.width = this.options.width + "px", t.style.height = this.options.height + "px", t.style.left = this.x - parseInt(this.options.width / 2) + "px", t.style.top = this.y - parseInt(this.options.height / 2) + "px", t.style.zIndex = this.options.zIndex, !this.options.canDrag || !this.options.visible || this.options.hidden ? t.style.display = "none" : t.style.display = "", t;
  }, this.redraw = () => {
    this.element = this.setPointStyles();
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.rotateBy = (t, s, e) => {
    const [i, o] = B(t, this.x, this.y, s, e);
    this.x = i, this.y = o;
  }, this.setEventListeners = () => {
    this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown), this.element.addEventListener("mouseover", this.mouseover), this.element.addEventListener("mouseout", this.mouseout), this.element.addEventListener("click", this.click), this.element.addEventListener("dblclick", this.doubleclick), this.element.addEventListener("mousemove", this.mousemove), n.subscribe(D.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange);
  }, this.mousedown = (t) => {
    n.emit(g.POINT_MOUSE_DOWN, this, p(t)), t.buttons === 1 && this.options.canDrag && (n.emit(g.POINT_DRAG_START, this, p(t)), U(t));
  }, this.mousemove = (t) => {
    if (n.emit(g.POINT_MOUSE_MOVE, this, p(t)), t.buttons !== 1 || !this.options.canDrag || !_.draggedShape || _.draggedShape.draggedPoint !== this)
      return;
    const s = this.x, e = this.y, i = L(this.element.parentNode, !0);
    if (!this.checkFitBounds(this.x + t.movementX, this.y + t.movementY)) {
      n.emit(g.POINT_DRAG_MOVE, this, p(t, { oldX: s, oldY: e }));
      return;
    }
    let o = t.clientX + window.scrollX - i.left - this.options.width / 2, h = t.clientY + window.scrollY - i.top - this.options.height / 2;
    [o, h] = this.applyMoveRestrictions(o, h, s, e), this.x = o, this.y = h, this.element.style.left = this.x + "px", this.element.style.top = this.y + "px", n.emit(g.POINT_DRAG_MOVE, this, p(t, { oldX: s, oldY: e }));
  }, this.mouseover = (t) => {
    n.emit(g.POINT_MOUSE_OVER, this, p(t));
  }, this.mouseout = (t) => {
    n.emit(g.POINT_MOUSE_OUT, this, p(t));
  }, this.click = (t) => {
    n.emit(g.POINT_MOUSE_CLICK, this, p(t));
  }, this.doubleclick = (t) => {
    n.emit(g.POINT_MOUSE_DOUBLE_CLICK, this, p(t));
  }, this.checkFitBounds = (t, s) => !(this.options.bounds.left !== -1 && t < this.options.bounds.left || this.options.bounds.right !== -1 && t > this.options.bounds.right || this.options.bounds.top !== -1 && s < this.options.bounds.top || this.options.bounds.bottom !== -1 && s > this.options.bounds.bottom), this.applyMoveRestrictions = (t, s, e, i) => (s > i && this.options.moveDirections.indexOf(f.BOTTOM) === -1 && (s = i), s < i && this.options.moveDirections.indexOf(f.TOP) === -1 && (s = i), t > e && this.options.moveDirections.indexOf(f.RIGHT) === -1 && (t = e), t < e && this.options.moveDirections.indexOf(f.LEFT) === -1 && (t = e), t > this.options.bounds.right && (t = this.options.bounds.right), s > this.options.bounds.bottom && (s = this.options.bounds.bottom), t < this.options.bounds.left && (t = this.options.bounds.left), s < this.options.bounds.top && (s = this.options.bounds.top), [t, s]), this.mouseup = (t) => {
    n.emit(g.POINT_MOUSE_UP, this, p(t)), t.button !== 2 && n.emit(g.POINT_DRAG_END, this, p(t)), t.button === 2 && this.options.canDelete && this.destroy();
  }, this.onBoundsChange = (t) => {
    t.points.find((s) => s === this) && (this.options.bounds = t.bounds);
  }, this.destroy = () => {
    this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), this.element.removeEventListener("mouseover", this.mouseover), this.element.removeEventListener("mouseout", this.mouseout), this.element.removeEventListener("click", this.click), this.element.removeEventListener("dblclick", this.doubleclick), this.element.removeEventListener("mousemove", this.mousemove), n.unsubscribe(D.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange), n.emit(g.POINT_DESTROYED, this);
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((e) => n.unsubscribe(t, e)), this.subscriptions[t] = [];
  }, this.addEventListener = (t, s) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const e = n.subscribe(t, (i) => {
      i.target && i.target.guid === this.guid && s(i);
    });
    return this.subscriptions[t].push(e), e;
  }, this.removeEventListener = (t, s) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(s), 1), n.unsubscribe(t, s);
  }, this;
}
const g = {
  POINT_ADDED: "create",
  POINT_DESTROYED: "destroy",
  POINT_DRAG_START: "move_start",
  POINT_DRAG_MOVE: "move",
  POINT_DRAG_END: "move_end",
  POINT_MOUSE_DOWN: "mousedown",
  POINT_MOUSE_MOVE: "mousemove",
  POINT_MOUSE_UP: "mouseup",
  POINT_MOUSE_OVER: "mouseover",
  POINT_MOUSE_OUT: "mouseout",
  POINT_MOUSE_CLICK: "click",
  POINT_MOUSE_DOUBLE_CLICK: "dblclick"
}, f = {
  TOP: 0,
  LEFT: 1,
  RIGHT: 2,
  BOTTOM: 3
};
function W(t) {
  this.rotateBox = t, this.subscriptions = {
    rotate: []
  }, this.initialAngle = 0, this.previousAngle = 0, this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    this.interceptEventsFromShape(), this.rotateBox.shape.points.forEach((s) => {
      s.mousemove = this.mousemove, s.mouseDownListener = s.addEventListener(g.POINT_DRAG_START, (e) => {
        this.onPointMouseDown(e), n.emit(r.POINT_DRAG_START, this.rotateBox, { point: s });
      }), s.mouseUpListener = s.addEventListener(g.POINT_DRAG_END, (e) => {
        this.onPointMouseUp(e), n.emit(r.POINT_DRAG_END, this.rotateBox, { point: s });
      });
    });
  }, this.interceptEventsFromShape = () => {
    r.getShapeMouseEvents().forEach((s) => {
      this.shapeEventListeners[s.name] = this.rotateBox.shape.addEventListener(s.name, (e) => {
        s.key === "SHAPE_MOVE_END" && (this.previousAngle = 0), n.emit(s.name, this.rotateBox, e);
      });
    });
  }, this.mousemove = (s) => {
    if (s.buttons !== 1) {
      n.emit(r.SHAPE_MOUSE_MOVE, this.rotateBox.shape, p(s, { clientX: s.clientX, clientY: s.clientY }));
      return;
    }
    const [e, i] = F(s), [o, h] = this.rotateBox.shape.getCenter();
    let u = this.calcAngle(e, i, o, h);
    if (u === null)
      return;
    let l = u;
    this.previousAngle && (l -= this.previousAngle), this.previousAngle = u, n.emit(v.ROTATE_BOX_ROTATE, this.rotateBox, { angle: l });
  }, this.calcAngle = (s, e, i, o) => {
    const h = this.calcHypotenuse(s, e, i, o);
    if (h <= 0)
      return null;
    const u = this.calcCathetus(s, e, i, o), l = this.calcStartAngle(s, e, i, o);
    return Math.round(H(Math.asin(u / h)) + l + this.initialAngle);
  }, this.calcHypotenuse = (s, e, i, o) => x(s, e, i, o), this.calcCathetus = (s, e, i, o) => {
    if (s <= i && e <= o)
      return x(s, e, s, o);
    if (s >= i && e <= o)
      return x(s, e, i, e);
    if (s >= i && e >= o)
      return x(s, e, s, o);
    if (s <= i && e >= o)
      return x(s, e, i, e);
  }, this.calcStartAngle = (s, e, i, o) => {
    if (s <= i && e <= o)
      return 0;
    if (s >= i && e <= o)
      return 90;
    if (s >= i && e >= o)
      return 180;
    if (s <= i && e >= o)
      return 270;
  }, this.onPointMouseDown = (s) => {
    switch (s.target) {
      case this.rotateBox.left_top:
        this.initialAngle = -45;
        break;
      case this.rotateBox.right_top:
        this.initialAngle = -135;
        break;
      case this.rotateBox.right_bottom:
        this.initialAngle = -225;
        break;
      case this.rotateBox.left_bottom:
        this.initialAngle = -315;
        break;
    }
    this.rotateBox.shape.points.forEach((e) => e.setOptions({ visible: !1 }));
  }, this.onPointMouseUp = (s) => {
    this.rotateBox.shape.points.forEach((e) => {
      e.setOptions({ visible: !0 }), e.redraw();
    });
  }, this.addEventListener = (s, e) => {
    typeof this.subscriptions[s] > "u" && (this.subscriptions[s] = []);
    const i = n.subscribe(s, (o) => {
      o.target && o.target.shape && o.target.shape.guid === this.rotateBox.shape.guid && e(o);
    });
    return this.subscriptions[s].push(i), i;
  }, this.removeEventListener = (s, e) => {
    this.subscriptions[s] && typeof this.subscriptions[s] < "u" && this.subscriptions[s].splice(this.subscriptions[s].indexOf(e), 1), n.unsubscribe(s, e);
  }, this.destroy = () => {
    for (let s in this.subscriptions)
      this.subscriptions[s].forEach((i) => n.unsubscribe(s, i)), this.subscriptions[s] = [];
    Object.keys(this.shapeEventListeners).forEach(
      (s) => {
        this.rotateBox.removeEventListener(s, this.shapeEventListeners[s]);
      }
    ), this.rotateBox.shape.points.forEach((s) => {
      s.removeEventListener(g.POINT_DRAG_START, s.mouseDownListener), s.removeEventListener(g.POINT_DRAG_END, s.mouseUpListener);
    });
  };
}
const v = {
  ROTATE_BOX_ROTATE: "rotate"
};
function J(t) {
  this.resizeBox = t, this.subscriptions = {
    resize: []
  }, this.guid = y(), this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    n.subscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), n.subscribe(g.POINT_DRAG_END, this.onPointDragMove), r.getShapeMouseEvents().forEach((s) => {
      this.shapeEventListeners[s.name] = this.resizeBox.shape.addEventListener(s.name, (e) => {
        n.emit(s.name, this.resizeBox, e);
      });
    });
  }, this.onPointDragMove = (s) => {
    if (!this.resizeBox.shape.isShapePoint(s.target))
      return;
    switch (s.target) {
      case this.resizeBox.left_top:
        this.onLeftTopDragMove(s);
        break;
      case this.resizeBox.center_top:
        this.onCenterTopDragMove(s);
        break;
      case this.resizeBox.right_top:
        this.onRightTopDragMove(s);
        break;
      case this.resizeBox.right_center:
        this.onRightCenterDragMove(s);
        break;
      case this.resizeBox.right_bottom:
        this.onRightBottomDragMove(s);
        break;
      case this.resizeBox.center_bottom:
        this.onCenterBottomDragMove(s);
        break;
      case this.resizeBox.left_bottom:
        this.onLeftBottomDragMove(s);
        break;
      case this.resizeBox.left_center:
        this.onLeftCenterDragMove(s);
        break;
    }
    this.resizeBox.adjustCenters(), this.resizeBox.setPointsMoveBounds();
    const e = this.resizeBox.getPosition();
    this.resizeBox.calcPosition();
    const i = this.resizeBox.getPosition();
    this.resizeBox.redraw(), n.emit(r.POINT_DRAG_END, this.resizeBox, p(s, { point: s.target })), n.emit(P.RESIZE_BOX_RESIZE, this.resizeBox, { oldPos: e, newPos: i });
  }, this.onLeftTopDragMove = (s) => {
    this.resizeBox.left_center.x = s.target.x, this.resizeBox.left_bottom.x = s.target.x, this.resizeBox.center_top.y = s.target.y, this.resizeBox.right_top.y = s.target.y;
  }, this.onCenterTopDragMove = (s) => {
    this.resizeBox.left_top.y = s.target.y, this.resizeBox.right_top.y = s.target.y;
  }, this.onRightTopDragMove = (s) => {
    this.resizeBox.left_top.y = s.target.y, this.resizeBox.center_top.y = s.target.y, this.resizeBox.right_center.x = s.target.x, this.resizeBox.right_bottom.x = s.target.x;
  }, this.onRightCenterDragMove = (s) => {
    this.resizeBox.right_top.x = s.target.x, this.resizeBox.right_bottom.x = s.target.x;
  }, this.onRightBottomDragMove = (s) => {
    this.resizeBox.right_top.x = s.target.x, this.resizeBox.right_center.x = s.target.x, this.resizeBox.left_bottom.y = s.target.y, this.resizeBox.center_bottom.y = s.target.y;
  }, this.onCenterBottomDragMove = (s) => {
    this.resizeBox.left_bottom.y = s.target.y, this.resizeBox.right_bottom.y = s.target.y;
  }, this.onLeftBottomDragMove = (s) => {
    this.resizeBox.center_bottom.y = s.target.y, this.resizeBox.right_bottom.y = s.target.y, this.resizeBox.left_center.x = s.target.x, this.resizeBox.left_top.x = s.target.x;
  }, this.onLeftCenterDragMove = (s) => {
    this.resizeBox.left_bottom.x = s.target.x, this.resizeBox.left_top.x = s.target.x;
  }, this.addEventListener = (s, e) => {
    typeof this.subscriptions[s] > "u" && (this.subscriptions[s] = []);
    const i = n.subscribe(s, (o) => {
      o.target && o.target.guid && o.target.guid === this.resizeBox.guid && e(o);
    });
    return this.subscriptions[s].push(i), i;
  }, this.removeEventListener = (s, e) => {
    this.subscriptions[s] && typeof this.subscriptions[s] < "u" && this.subscriptions[s].splice(this.subscriptions[s].indexOf(e), 1), n.unsubscribe(s, e);
  }, this.destroy = () => {
    for (let s in this.subscriptions)
      this.subscriptions[s].forEach((i) => n.unsubscribe(s, i)), this.subscriptions[s] = [];
    Object.keys(this.shapeEventListeners).forEach(
      (s) => {
        this.resizeBox.removeEventListener(s, this.shapeEventListeners[s]);
      }
    ), n.unsubscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), n.unsubscribe(g.POINT_DRAG_END, this.onPointDragMove);
  };
}
const P = {
  RESIZE_BOX_RESIZE: "resize"
};
function Z(t) {
  this.shape = t, this.subscriptions = {
    CONTAINER_BOUNDS_CHANGED: []
  }, this.run = () => (this.shape = t, this.setEventListeners(), this), this.setEventListeners = () => {
    n.subscribe(g.POINT_DESTROYED, this.onPointDestroyed), n.subscribe(g.POINT_ADDED, this.onPointAdded), n.subscribe(g.POINT_DRAG_MOVE, this.onPointDragMove);
  }, this.setSvgEventListeners = () => {
    this.svg_mouseover = this.shape.svg.addEventListener("mouseover", (s) => {
      _.mouseover(p(s, { target: this.shape }));
    }), this.svg_mouseout = this.shape.svg.addEventListener("mouseout", (s) => {
      _.mouseout(p(s, { target: this.shape }));
    }), this.svg_mouseenter = this.shape.svg.addEventListener("mouseenter", (s) => {
      _.mouseenter(p(s, { target: this.shape }));
    }), this.svg_mousedown = this.shape.svg.addEventListener("mousedown", (s) => {
      _.mousedown(p(s, { target: this.shape }));
    }), this.svg_click = this.shape.svg.addEventListener("click", (s) => {
      _.click(p(s, { target: this.shape }));
    }), this.svg_dblclick = this.shape.svg.addEventListener("dblclick", (s) => {
      _.doubleclick(p(s, { target: this.shape }));
    });
  }, this.removeSvgEventListeners = () => {
    this.shape.svg.removeEventListener("mouseover", this.svg_mouseover), this.shape.svg.removeEventListener("mouseout", this.svg_mouseout), this.shape.svg.removeEventListener("mouseenter", this.svg_mouseenter), this.shape.svg.removeEventListener("mousedown", this.svg_mousedown), this.shape.svg.removeEventListener("click", this.svg_click), this.shape.svg.removeEventListener("dblclick", this.svg_dblclick);
  }, this.addResizeEventListener = () => {
    !this.shape.resizeBox || (this.resizeBoxListener = this.shape.resizeBox.addEventListener(P.RESIZE_BOX_RESIZE, (s) => {
      const e = this.shape.getRootParent();
      if (e) {
        n.emit(P.RESIZE_BOX_RESIZE, e.resizeBox, { newPos: s.newPos, oldPos: s.oldPos });
        return;
      }
      const i = s.newPos.left - s.oldPos.left, o = s.newPos.top - s.oldPos.top;
      this.shape.moveBy(i, o);
      const [h, u] = this.shape.getMaxPointSize();
      this.shape.scaleTo(s.newPos.width - h * 2, s.newPos.height - u * 2), this.shape.redraw(), n.emit(P.RESIZE_BOX_RESIZE, this.shape, s);
    }), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOVE_START, (s) => {
      this.mousedown(s);
    }), this.resizeMouseMoveEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_MOVE, (s) => {
      this.mousemove(s);
    }), this.resizeClickEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_CLICK, (s) => {
      this.click(s);
    }), this.resizeDblClickEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_DOUBLE_CLICK, (s) => {
      this.svg_dblclick(s);
    }), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_DOWN, (s) => {
      this.svg_mousedown(s);
    }), this.resizeMouseUpEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_UP, (s) => {
      n.emit(r.SHAPE_MOUSE_UP, this.shape, p(s));
    }), this.resizeMouseOverEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_OVER, (s) => {
      this.svg_mouseover(s);
    }), this.resizeMouseOutEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_OUT, (s) => {
      this.svg_mouseout(s);
    }));
  }, this.addRotateEventListener = () => {
    !this.shape.rotateBox || (this.rotateBoxListener = this.shape.rotateBox.addEventListener(v.ROTATE_BOX_ROTATE, (s) => {
      const e = this.shape.getRootParent();
      if (e) {
        n.emit(v.ROTATE_BOX_ROTATE, e.rotateBox, { angle: s.angle });
        return;
      }
      e ? (e.rotateBy(s.angle), e.redraw(), n.emit(v.ROTATE_BOX_ROTATE, e, s)) : (this.shape.rotateBy(s.angle), this.shape.redraw(), n.emit(v.ROTATE_BOX_ROTATE, this.shape, s));
    }), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOVE_START, (s) => {
      this.mousedown(s);
    }), this.rotateMouseMoveEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_MOVE, (s) => {
      this.mousemove(s);
    }), this.rotateClickEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_CLICK, (s) => {
      this.click(s);
    }), this.rotateDblClickEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_DOUBLE_CLICK, (s) => {
      this.svg_dblclick(s);
    }), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_DOWN, (s) => {
      this.svg_mousedown(s);
    }), this.rotateMouseUpEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_UP, (s) => {
      n.emit(r.SHAPE_MOUSE_UP, this.shape, p(s));
    }), this.rotateMouseOverEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_OVER, (s) => {
      this.svg_mouseover(s);
    }), this.rotateMouseOutEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_OUT, (s) => {
      this.svg_mouseout(s);
    }), this.rotatePointDragStartEventListener = this.shape.rotateBox.addEventListener(r.POINT_DRAG_START, (s) => {
      this.shape.initCenter = this.shape.getCenter(!0);
    }), this.rotatePointDragEndEventListener = this.shape.rotateBox.addEventListener(r.POINT_DRAG_END, (s) => {
      this.shape.initCenter = null, this.shape.points.forEach((e) => {
        e.options.hidden || (e.element.style.display = "");
      });
    }));
  }, this.mousedown = (s) => {
    U(s), n.emit(r.SHAPE_MOUSE_DOWN, this.shape, p(s)), setTimeout(() => {
      n.emit(r.SHAPE_MOVE_START, this.shape, p(s, { pos: this.shape.getPosition(!0) }));
    }, 100);
  }, this.mousemove = (s) => {
    if (this.shape.draggedPoint || n.emit(r.SHAPE_MOUSE_MOVE, this.shape, p(s)), this.shape.draggedPoint) {
      n.emit(r.POINT_DRAG_MOVE, this.shape, { point: this.shape.draggedPoint }), this.shape.draggedPoint.mousemove(s);
      return;
    }
    if (!this.shape.options.canDragShape)
      return;
    const [e, i] = this.calcMovementOffset(s);
    if (e === null || i === null)
      return;
    const o = this.shape.getPosition(!0);
    this.shape.moveBy(e, i), this.shape.redraw();
    const h = this.shape.getPosition(!0);
    n.emit(r.SHAPE_MOVE, this.shape, p(s, { oldPos: o, newPos: h }));
  }, this.mouseenter = (s) => {
    n.emit(r.SHAPE_MOUSE_ENTER, this.shape, p(s));
  }, this.mouseover = (s) => {
    _.draggedShape !== this.shape && n.emit(r.SHAPE_MOUSE_OVER, this.shape, p(s));
  }, this.mouseout = (s) => {
    n.emit(r.SHAPE_MOUSE_OUT, this.shape, p(s));
  }, this.click = (s) => {
    n.emit(r.SHAPE_MOUSE_CLICK, this.shape, p(s));
  }, this.doubleclick = (s) => {
    n.emit(r.SHAPE_MOUSE_DOUBLE_CLICK, this.shape, p(s));
  }, this.calcMovementOffset = (s) => {
    this.shape.calcPosition();
    const e = this.shape.getPosition(!0);
    let i = s.movementX, o = s.movementY, h = s.clientX + window.scrollX, u = s.clientY + window.scrollY;
    const l = e.left + i, a = e.top + o, d = L(this.shape.root, !0), c = this.shape.getBounds();
    return l < c.left || l + e.width > c.right ? [null, null] : a < c.top || a + e.height > c.bottom ? [null, null] : (h < l + d.left && (i = h - (l + d.left)), u < a + d.top && (o = u - (a + d.top)), h > l + e.width + d.left && (i = h - (e.width + d.left + e.left)), u > a + e.height + d.right && (o = u - (e.height + d.top + e.top)), [i, o]);
  }, this.onPointAdded = (s) => {
    !this.shape.isShapePoint(s.target) || this.checkCanDeletePoints();
  }, this.checkCanDeletePoints = () => {
    this.shape.points.find((s) => s.options.canDelete === !0) && (this.nocontextmenu = this.shape.root.addEventListener("contextmenu", (s) => s.preventDefault()));
  }, this.onPointDragMove = (s) => {
    this.shape.isShapePoint(s.target) && this.shape.redraw();
  }, this.onPointDestroyed = (s) => {
    !this.shape.isShapePoint(s.target) || (this.shape.points.splice(this.shape.points.indexOf(s.target), 1), this.shape.root.removeChild(s.target.element), this.shape.redraw());
  }, this.addEventListener = (s, e) => {
    typeof this.subscriptions[s] > "u" && (this.subscriptions[s] = []);
    const i = n.subscribe(s, (o) => {
      o.target && o.target.guid === this.shape.guid && e(o);
    });
    return this.subscriptions[s].push(i), i;
  }, this.removeEventListener = (s, e) => {
    this.subscriptions[s] && typeof this.subscriptions[s] < "u" && this.subscriptions[s].splice(this.subscriptions[s].indexOf(e), 1), n.unsubscribe(s, e);
  }, this.destroy = () => {
    n.unsubscribe(g.POINT_ADDED, this.onPointAdded), n.unsubscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), n.unsubscribe(g.POINT_DESTROYED, this.onPointDestroyed), this.shape.resizeBox && (this.shape.resizeBox.removeEventListener(P.RESIZE_BOX_RESIZE, this.resizeBoxListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_CLICK, this.resizeClickEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_MOVE, this.resizeMouseMoveEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOVE_START, this.resizeMouseDownEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_UP, this.resizeMouseUpEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_DOUBLE_CLICK, this.resizeDblClickEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_OVER, this.resizeMouseOverEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_OUT, this.resizeMouseOutEventListener)), this.shape.rotateBox && (this.shape.rotateBox.removeEventListener(v.ROTATE_BOX_ROTATE, this.rotateBoxListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_CLICK, this.rotateClickEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_MOVE, this.rotateMouseMoveEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOVE_START, this.rotateMouseDownEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOVE_START, this.rotatePointDragStartEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOVE_START, this.rotatePointDragEndEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_UP, this.rotateMouseUpEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_DOUBLE_CLICK, this.rotateDblClickEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_OVER, this.rotateMouseOverEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_OUT, this.rotateMouseOutEventListener));
    for (let s in this.subscriptions)
      this.subscriptions[s].forEach((i) => n.unsubscribe(s, i)), this.subscriptions[s] = [];
  };
}
const r = {
  SHAPE_CREATE: "create",
  SHAPE_MOVE_START: "move_start",
  SHAPE_MOVE: "move",
  SHAPE_MOVE_END: "move_end",
  SHAPE_MOUSE_MOVE: "mousemove",
  SHAPE_MOUSE_ENTER: "mouseenter",
  SHAPE_MOUSE_OVER: "mouseover",
  SHAPE_MOUSE_OUT: "mouseout",
  SHAPE_MOUSE_DOWN: "mousedown",
  SHAPE_MOUSE_UP: "mouseup",
  SHAPE_MOUSE_CLICK: "click",
  SHAPE_MOUSE_DOUBLE_CLICK: "dblclick",
  SHAPE_DESTROY: "destroy",
  POINT_DRAG_START: "point_drag_start",
  POINT_DRAG_MOVE: "point_drag_move",
  POINT_DRAG_END: "point_drag_end",
  SHAPE_RESIZE: "resize",
  SHAPE_ROTATE: "rotate",
  getShapeMouseEvents: () => Object.keys(r).filter((t) => ["SHAPE_CREATE", "SHAPE_DESTROY", "SHAPE_RESIZE", "SHAPE_ROTATE"].indexOf(t) === -1 && typeof r[t] != "function").map((t) => ({ key: t, name: r[t] }))
};
function Q() {
  this.draw = (t) => {
    if (t.points.length < 1)
      return;
    if (t.svg)
      try {
        t.eventListener.removeSvgEventListeners(), t.svg.innerHTML = "";
      } catch {
      }
    else
      t.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), t.svg.ondragstart = function() {
        return !1;
      }, t.eventListener.setSvgEventListeners(), t.root.appendChild(t.svg);
    this.updateOptions(t);
    const s = this.drawPolygon(t);
    t.svg.appendChild(s);
  }, this.updateOptions = (t) => {
    if (!t.svg || typeof t.svg > "u")
      return;
    typeof t.options.visible < "u" && (t.svg.style.display = t.options.visible ? "" : "none"), t.calcPosition(), t.svg.id = t.options.id, t.svg.style.position = "absolute", t.svg.style.cursor = "default", t.svg.style.left = t.left, t.svg.style.top = t.top, t.svg.setAttribute("width", t.width), t.svg.setAttribute("height", t.height), this.setupShapeFill(t), this.setupSVGFilters(t), t.svg.style.zIndex = t.options.zIndex, t.points.forEach((e) => {
      e.options.zIndex < t.options.zIndex + 2 && (e.options.zIndex = t.options.zIndex + 2), t.options.visible || (e.options.visible = !1), e.redraw(), t.options.displayMode === A.DEFAULT && !e.options.forceDisplay && (e.element.style.display = "none");
    });
    let s = t.getRootParent();
    this.redrawResizeBox(s || t), this.redrawRotateBox(s || t);
  }, this.drawPolygon = (t) => {
    let s = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    t.points.length > 2 && (s = document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
    const e = t.points.map((i) => "" + (i.x - t.left) + "," + (i.y - t.top)).join(" ");
    return s.setAttribute("points", e), this.setupPolygonStroke(t, s), this.setupPolygonFill(t, s), this.setupPolygonStyles(t, s), t.svg.querySelector("defs") && t.svg.querySelector("defs").querySelector("filter") && (s.style.filter = 'url("#' + t.guid + '_filter")'), s.style.zIndex = t.options.zIndex, s;
  }, this.redrawResizeBox = (t) => {
    if (!t.resizeBox)
      return;
    const s = t.getResizeBoxBounds();
    t.resizeBox.left = s.left, t.resizeBox.top = s.top, t.resizeBox.width = s.width, t.resizeBox.height = s.height, t.resizeBox.options.zIndex = t.options.zIndex + 1, t.resizeBox.redraw();
  }, this.redrawRotateBox = (t) => {
    if (!t.rotateBox)
      return;
    const s = t.getResizeBoxBounds();
    t.rotateBox.left = s.left, t.rotateBox.top = s.top, t.rotateBox.width = s.width, t.rotateBox.height = s.height, t.rotateBox.options.zIndex = t.options.zIndex + 1, t.rotateBox.redraw();
  }, this.setupShapeFill = (t) => {
    if (t.options.fillImage && typeof t.options.fillImage == "object") {
      const s = document.createElementNS(t.svg.namespaceURI, "defs"), e = this.createImageFill(t);
      e && s.appendChild(e), t.svg.appendChild(s);
    } else if (t.options.fillGradient && typeof t.options.fillGradient == "object" && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1) {
      const s = document.createElementNS(t.svg.namespaceURI, "defs"), e = this.createGradient(t);
      s.appendChild(e), t.svg.appendChild(s);
    }
  }, this.createGradient = (t) => {
    let s = document.createElementNS(t.svg.namespaceURI, "linearGradient");
    const e = t.options.fillGradient;
    e.type === "radial" && (s = document.createElementNS(t.svg.namespaceURI, "radialGradient")), s.id = t.guid + "_gradient";
    let i = !1;
    for (let o in e)
      if (o !== "type") {
        if (o === "steps") {
          i = !0;
          continue;
        }
        s.setAttribute(o, e[o]);
      }
    if (!i)
      return s;
    for (let o of e.steps) {
      const h = document.createElementNS(t.svg.namespaceURI, "stop");
      b(o.stopColor) && h.setAttribute("offset", o.offset), b(o.stopColor) && h.setAttribute("stop-color", o.stopColor), b(o.stopOpacity) && h.setAttribute("stop-opacity", o.stopOpacity), s.appendChild(h);
    }
    return s;
  }, this.createImageFill = (t) => {
    const s = t.options.fillImage;
    if (!s.href || !s.width || !s.height)
      return console.error("Image HREF, width and height must be specified for Image Fill"), null;
    const e = document.createElementNS(t.svg.namespaceURI, "pattern");
    e.setAttribute("id", t.guid + "_pattern"), e.setAttribute("patternUnits", "userSpaceOnUse");
    for (let o in s)
      o !== "href" && e.setAttribute(o, s[o]);
    const i = document.createElementNS(t.svg.namespaceURI, "image");
    return i.setAttribute("href", s.href), i.setAttribute("width", s.width), i.setAttribute("height", s.height), e.appendChild(i), e;
  }, this.setupSVGFilters = (t) => {
    if (t.options.filters && typeof t.options.filters == "object" && Object.keys(t.options.filters).length) {
      let s = t.svg.querySelector("defs");
      s || (s = document.createElementNS(t.svg.namespaceURI, "defs"), t.svg.appendChild(s));
      const e = this.createSVGFilters(t);
      s.append(e);
    }
  }, this.createSVGFilters = (t) => {
    const s = document.createElementNS(t.svg.namespaceURI, "filter");
    s.setAttribute("id", t.guid + "_filter");
    for (let e in t.options.filters) {
      const i = this.createSVGFilter(t, e, t.options.filters[e]);
      s.appendChild(i);
    }
    return s;
  }, this.createSVGFilter = (t, s, e) => {
    const i = document.createElementNS(t.svg.namespaceURI, s);
    for (let o in e)
      i.setAttribute(o, e[o].toString()), o === "dx" && t.svg.setAttribute("width", (t.width + parseInt(e.dx) * 2).toString()), o === "dy" && t.svg.setAttribute("height", (t.height + parseInt(e.dy) * 2).toString());
    return i;
  }, this.setupPolygonStroke = (t, s) => {
    b(t.options.stroke) && s.setAttribute("stroke", t.options.stroke), b(t.options.strokeWidth) && s.setAttribute("stroke-width", t.options.strokeWidth), b(t.options.strokeLinecap) && s.setAttribute("stroke-linecap", t.options.strokeLinecap), b(t.options.strokeDasharray) && s.setAttribute("stroke-dasharray", t.options.strokeDasharray);
  }, this.setupPolygonFill = (t, s) => {
    t.options.fillImage && typeof t.options.fillImage == "object" ? s.setAttribute("fill", 'url("#' + t.guid + '_pattern")') : t.options.fillGradient && typeof t.options.fillGradient == "object" && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1 ? s.setAttribute("fill", 'url("#' + t.guid + '_gradient")') : t.options.fill && s.setAttribute("fill", t.options.fill), b(t.options.fillOpacity) && s.setAttribute("fill-opacity", t.options.fillOpacity);
  }, this.setupPolygonStyles = (t, s) => {
    if (t.options.classes && s.setAttribute("class", t.options.classes), b(t.options.style) && typeof t.options.style == "object")
      for (let e in t.options.style)
        s.style[e] = t.options.style[e];
  }, this.toSvg = (t) => {
    const s = document.createElement("div"), e = document.createElementNS("http://www.w3.org/2000/svg", "svg"), i = t.getPosition(!0);
    e.appendChild(this.getSvgDefs(t)), this.addSvgPolygons(t, e), e.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const o = "0 0 " + i.width + " " + i.height;
    return e.setAttribute("viewBox", o), s.appendChild(e), '<?xml version="1.0" encoding="UTF-8"?>' + s.innerHTML.replace(/&quot;/g, "'");
  }, this.getSvgDefs = (t) => {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    if (t.svg) {
      const e = t.svg.querySelector("defs");
      e && (s.innerHTML = e.innerHTML);
    }
    return t.getChildren(!0).forEach((e) => {
      const i = e.svg.querySelector("defs");
      i && (s.innerHTML += i.innerHTML);
    }), s;
  }, this.addSvgPolygons = (t, s) => {
    const e = t.getPosition(!0);
    if (t.svg) {
      let i = t.svg.querySelector("polygon");
      if (i) {
        i = i.cloneNode();
        const o = t.points.map(
          (h) => "" + (h.x - e.left) + "," + (h.y - e.top)
        ).join(" ");
        i.setAttribute("points", o), s.appendChild(i);
      }
    }
    t.getChildren(!0).forEach((i) => {
      let o = i.svg.querySelector("polygon");
      if (o) {
        o = o.cloneNode();
        const h = i.points.map(
          (u) => "" + (u.x - e.left) + "," + (u.y - e.top)
        ).join(" ");
        o.setAttribute("points", h), s.appendChild(o);
      }
    });
  }, this.toPng = (t, s = T.DATAURL, e = null, i = null) => new Promise((o) => {
    const h = t.getPosition(!0);
    [e, i] = M(e, i, h.width, h.height), t.scaleTo(e, i);
    const u = this.toSvg(t);
    t.scaleTo(h.width, h.height);
    const l = new Image(), a = new Blob([u], { type: "image/svg+xml" }), d = window.URL || window.webkitURL || window, c = d.createObjectURL(a);
    l.addEventListener("load", () => {
      const E = document.createElement("canvas");
      l.width = e, l.height = i, E.width = l.width, E.height = l.height, E.getContext("2d").drawImage(l, 0, 0), d.revokeObjectURL(c);
      const S = E.toDataURL("image/png");
      if (s === T.BLOB) {
        o(j(S));
        return;
      }
      o(S);
    }), l.src = c;
  });
}
const T = {
  DATAURL: "dataurl",
  BLOB: "blob"
}, m = new Q();
function Y() {
  this.shapes = [], this.activeShape = null, this.draggedShape = null, this.shapeOnCursor = null, this.containerEventListeners = [], this.init = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    n.subscribe(r.SHAPE_CREATE, this.onShapeCreated), n.subscribe(r.SHAPE_DESTROY, this.onShapeDestroy), n.subscribe(r.SHAPE_MOVE_START, this.onShapeMoveStart), n.subscribe(r.SHAPE_MOUSE_ENTER, this.onShapeMouseEnter), n.subscribe(g.POINT_DRAG_START, this.onPointDragStart), n.subscribe(g.POINT_DRAG_END, this.onPointDragEnd), window.addEventListener("resize", this.onWindowResize);
  }, this.onWindowResize = (t) => {
    this.shapes.forEach((s) => {
      n.emit(
        D.CONTAINER_BOUNDS_CHANGED,
        s,
        { bounds: s.getBounds(), points: s.points }
      );
    });
  }, this.onShapeCreated = (t) => {
    const s = t.target;
    b(s.root) && !this.getShape(s) && (this.shapes.push(s), this.activeShape || (this.activeShape = s), this.getShapesByContainer(s.root).length === 1 && this.addContainerEvents(s));
  }, this.onShapeDestroy = (t) => {
    const s = t.target, e = s.root;
    !b(s.root) || !this.getShape(s) || (this.shapes.splice(this.shapes.indexOf(s), 1), this.getShapesByContainer(e).length === 0 && this.containerEventListeners.filter((i) => i.container === e).forEach((i) => {
      i.container.removeEventListener(i.name, i.listener), this.containerEventListeners.splice(this.containerEventListeners.indexOf(i), 1);
    }));
  }, this.onShapeMoveStart = (t) => {
    if (!this.getShapeByGuid(t.target.guid) || !t.target.options.managed)
      return;
    const s = t.target.getRootParent();
    s ? (this.activateShape(s), this.draggedShape = s) : (this.activateShape(t.target), this.draggedShape = t.target);
  }, this.onShapeMouseEnter = (t) => {
    !this.draggedShape || t.buttons !== 1 && (this.draggedShape.draggedPoint = null, this.draggedShape = null);
  }, this.onPointDragStart = (t) => {
    const s = this.findShapeByPoint(t.target);
    if (s) {
      this.draggedShape = s;
      const e = s.getRootParent();
      e && (this.draggedShape = e), this.draggedShape.draggedPoint = t.target, n.emit(r.POINT_DRAG_START, s, { point: t.target });
    }
  }, this.onPointDragEnd = (t) => {
    this.draggedShape && (this.draggedShape.draggedPoint = null), this.draggedShape = null;
  }, this.findShapeByPoint = (t) => {
    for (let s of this.shapes)
      if (s.isShapePoint(t))
        return s;
    return null;
  }, this.getShape = (t) => this.getShapeByGuid(t.guid), this.getShapeByGuid = (t) => this.shapes.find((s) => s.guid === t), this.getShapesByContainer = (t) => this.shapes.filter((s) => s.root === t), this.getMaxZIndex = (t = null) => {
    let s = this.shapes;
    return t && (s = this.getShapesByContainer(t)), s = s.filter((e) => e.options.id.search("_resizebox") === -1 && e.options.id.search("_rotatebox") === -1), s.length ? s.map((e) => e.options.zIndex || 0).reduce((e, i) => i > e ? i : e) : 0;
  }, this.activateShape = (t) => {
    if (this.activeShape === t) {
      this.activeShape.switchDisplayMode();
      return;
    }
    if (typeof t.id < "u" && (t.id.search("_resizebox") !== -1 || t.id.search("_rotatebox") !== -1))
      return;
    this.activeShape && this.deactivateShape(this.activeShape);
    const e = this.getMaxZIndex(t.root) + 1 - t.options.zIndex;
    t.options.prevZIndex = t.options.zIndex, t.options.zIndex += e, m.updateOptions(t), t.getChildren(!0).forEach((i) => {
      i.options.prevZIndex = i.options.zIndex, i.options.zIndex += e, m.updateOptions(i);
    }), this.activeShape = t, this.activeShape.switchDisplayMode();
  }, this.deactivateShape = (t) => {
    typeof t.options.prevZIndex < "u" && m.updateOptions(t), t.options.displayMode !== A.DEFAULT && t.switchDisplayMode(A.DEFAULT), t.getChildren(!0).forEach((s) => {
      typeof s.options.prevZIndex < "u" && (m.updateOptions(s), s.options.displayMode !== A.DEFAULT && s.switchDisplayMode(A.DEFAULT));
    });
  }, this.addContainerEvents = (t) => {
    this.addContainerEvent(t.root, "mousemove", this.mousemove), this.addContainerEvent(t.root, "mouseup", this.mouseup, t.options.id), this.addContainerEvent(t.root, "dblclick", this.doubleclick), this.checkCanDeletePoints(t), n.emit(X.MANAGER_ADD_CONTAINER_EVENT_LISTENERS, t.root);
  }, this.addContainerEvent = (t, s, e) => {
    this.containerEventListeners.find((i) => i.container === t && i.name === s) || (t.addEventListener(s, e), this.containerEventListeners.push({ id: t.id, container: t, name: s, listener: e }));
  }, this.doubleclick = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.doubleclick(p(t, { target: this.shapeOnCursor }));
    try {
      t.stopPropagation();
    } catch {
    }
    !this.activeShape || this.activeShape.options.canAddPoints && !this.activeShape.draggedPoint && (this.activeShape.options.maxPoints === -1 || this.activeShape.points.length < this.activeShape.options.maxPoints) && this.activeShape.addPoint(
      t.clientX - this.activeShape.root.offsetLeft + window.scrollX,
      t.clientY - this.activeShape.root.offsetTop + window.scrollY,
      { forceDisplay: !0 }
    );
  }, this.mousedown = (t) => {
    if (this.shapeOnCursor) {
      const s = this.shapeOnCursor.getRootParent();
      s && (this.shapeOnCursor = s), this.draggedShape = this.shapeOnCursor, this.shapeOnCursor.eventListener.mousedown(p(t, { target: this.shapeOnCursor }));
    }
  }, this.mouseup = (t) => {
    if (!this.draggedShape)
      return;
    const s = this.draggedShape;
    t.buttons === 1 && s.options.canAddPoints && !s.draggedPoint && (s.options.maxPoints === -1 || s.points.length < s.options.maxPoints) && s.addPoint(
      t.clientX - s.root.offsetLeft,
      t.clientY - s.root.offsetTop
    ), s.draggedPoint ? (n.emit(r.POINT_DRAG_END, this.draggedShape, { point: s.draggedPoint }), s.draggedPoint.mouseup(t), s.draggedPoint = null) : n.emit(r.SHAPE_MOUSE_UP, s, {}), this.draggedShape = null, n.emit(r.SHAPE_MOVE_END, s, { pos: s.getPosition(!0) });
  }, this.mousemove = (t) => {
    if (t.buttons !== 1 && (this.draggedShape = null), this.draggedShape) {
      if (t.buttons !== 1) {
        this.draggedShape.draggedPoint = null, this.draggedShape = null;
        return;
      }
      this.draggedShape.eventListener.mousemove(t);
    } else
      this.processShapesUnderCursor(t);
  }, this.mouseover = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseover(p(t, { target: this.shapeOnCursor }));
  }, this.mouseenter = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseenter(p(t, { target: this.shapeOnCursor }));
  }, this.mouseout = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseout(p(t, { target: t.target }));
  }, this.click = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.click(p(t, { target: this.shapeOnCursor }));
  }, this.processShapesUnderCursor = (t) => {
    const [s, e] = [t.clientX, t.clientY], i = this.getShapeOnCursor(s, e);
    this.shapeOnCursor && this.shapeOnCursor !== i && this.shapeOnCursor.svg && (this.shapeOnCursor.svg.style.cursor = "default", this.shapeOnCursor.eventListener.mouseout(p(t, { target: this.shapeOnCursor }))), i && i !== this.shapeOnCursor && i.eventListener.mouseover(p(t, { target: i })), this.shapeOnCursor = i, this.shapeOnCursor && (n.emit(r.SHAPE_MOUSE_MOVE, this.shapeOnCursor, p(t)), this.shapeOnCursor.svg.style.cursor = "crosshair");
  }, this.getShapeOnCursor = (t, s) => {
    const e = this.shapes.filter((i) => i.belongsToShape(t, s) && i.options.id.search("_resizebox") === -1 && i.options.id.search("_rotatebox") === -1);
    return e.length ? e.reduce((i, o) => o.options.zIndex >= i.options.zIndex ? o : i) : null;
  }, this.checkCanDeletePoints = (t) => {
    t.points.find((s) => s.options.canDelete === !0) && this.addContainerEvent(t.root, "contextmenu", (s) => s.preventDefault());
  }, this.clear = () => {
    this.containerEventListeners.forEach(({ container: t, name: s, listener: e }) => {
      try {
        t.removeEventListener(s, e);
      } catch (i) {
        console.error(i);
      }
    }), this.containerEventListeners = [], this.shapes = [];
  };
}
const X = {
  MANAGER_ADD_CONTAINER_EVENT_LISTENERS: "manager_add_container_event_listeners",
  MANAGER_REMOVE_CONTAINER_EVENT_LISTENERS: "manager_remove_container_event_listeners"
}, D = {
  CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
}, _ = new Y().init();
function q(t) {
  this.shape = t, this.children = [], this.parent = {}, this.init = () => {
    for (let s in this)
      typeof this[s] != "function" || s === "init" || (typeof this.shape[s] == "function" && (this.parent[s] = this.shape[s]), this.shape[s] = this[s]);
    return this;
  }, this.addChild = (s) => {
    !this.shouldAddChild(s) || this.children.push(s);
  }, this.removeChild = (s) => {
    this.children.splice(this.children.indexOf(s), 1);
  }, this.getChildren = (s = !1) => {
    if (!s)
      return this.children;
    const e = [];
    e.push(...this.children);
    for (let i of e)
      e.push(...i.getChildren());
    return e;
  }, this.shouldAddChild = (s) => !s || typeof s != "object" || typeof s.getChildren > "u" || this.children.indexOf(s) !== -1 ? !1 : s === this.shape ? void 0 : s.getChildren().indexOf(this.shape) !== -1 || s.getParent() ? !1 : this.getParentsList().indexOf(s) === -1, this.getParent = () => {
    const s = _.shapes;
    for (let e of s)
      if (e.getChildren().indexOf(this.shape) !== -1)
        return e;
    return null;
  }, this.getRootParent = () => {
    const s = this.getParentsList();
    return s.length ? s[s.length - 1] : null;
  }, this.getParentsList = (s = []) => {
    const e = this.getParent();
    return e == null ? s : (s.push(e), e.getParentsList(s));
  }, this.getPosition = (s = !1) => {
    const e = this.parent.getPosition();
    if (!s)
      return e;
    let i = this.getChildren(!0);
    return i.push(this.shape), i = i.filter((o) => o.points.length), i.length && (e.left = i.map((o) => o.left).reduce((o, h) => h < o ? h : o), e.top = i.map((o) => o.top).reduce((o, h) => h < o ? h : o), e.right = i.map((o) => o.right).reduce((o, h) => h > o ? h : o), e.bottom = i.map((o) => o.bottom).reduce((o, h) => h > o ? h : o), e.width = e.right - e.left || 1, e.height = e.bottom - e.top || 1), e;
  };
}
const $ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECcZZuWhdAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlZBBEsAgCAMT/v/n7akzWAFtTo5mQ8SAJtkGcL4LXcg211A2L+eq3jc5C/AGTUBZ7wYAHH+B4yIAv8a8dkvilLz9qXuYKseU2E7qDFODqIwTIEkPSldAAa0WlbUAAAAASUVORK5CYII=", tt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECgYlnqNLQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABZSURBVCjPlZFBCgAxCANN/v/n2VOhiFU3N4U4GgXELUkAikbOhlhIh1QZXkR3hGc/IsaVMtHT0RXR3e5jescIqBpy05T/tInffw2AvEkr972N+a69+U8e8AGOtEABr4X+4AAAAABJRU5ErkJggg==", st = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECkWaNmRawAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABjSURBVCjPlZBRDsAgCENbsnt6/1N0P2ocijASEy08iqC1BknhASCvsSeOQXImJXHcrQL4t1UAr4fjReDmdCsc/5LEZ7NOwOlUKVy3RwC/AAAwL2TAZ3t+xFszOxVl7lbtvsYLOtlZCOj2NccAAAAASUVORK5CYII=", et = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECoXNPPyPgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlVFBEgAhCAL+/2f21I5jqcXFGRMSpG1EkLRtooEyIdaRlAc7orqBsg+gVKy8yTYn49vqMb0pgCUuPOBP93Sniaxb8/FdL6mt/rZe5SMKXQWRf/4AYrs6C0ViuwUAAAAASUVORK5CYII=", it = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDsHep3BSgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA8SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCAZy0h4AXLILDAEWNOwAAAAASUVORK5CYII=", ot = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDMMJZaSygAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA/SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCJxAWZoFp1MBY8cLTv/x72kAAAAASUVORK5CYII=", nt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQARsznxFAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", ht = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQEbSvcpSwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA3SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTCICjCTbxPJfsIWSv+JECM9nugHAG40DyW1OoLPAAAAAElFTkSuQmCC", rt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDIpd4l3zAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", at = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDYr/evT5AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", pt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDUsSKIVhAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA0SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTBQZBPJfsIWSv+JECM9nugHADv6Dv2P6G4ZAAAAAElFTkSuQmCC", dt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDQQftZYQgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==";
function z() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = y(), this.options = {
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
          borderWidth: "0px",
          cursor: "pointer",
          backgroundColor: "rgba(0,0,0,0)"
        },
        width: 13,
        height: 13,
        forceDisplay: !0
      }
    },
    zIndex: 1e3
  }, this.eventListener = null, this.left_top = null, this.left_bottom = null, this.right_top = null, this.right_bottom = null, this.init = (t, s, e, i, o, h = {}) => (this.left = parseInt(s), this.top = parseInt(e), this.width = parseInt(i), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(h), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new I().init(t, Object.assign({}, this.options.shapeOptions), []), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new W(this).run(), this.redraw(), n.emit(r.SHAPE_CREATE, this, {}), this), this.setOptions = (t = {}) => {
    !t || typeof t != "object" || (t.shapeOptions && typeof t.shapeOptions == "object" ? (t.shapeOptions.pointOptions && typeof t.shapeOptions.pointOptions == "object" ? t.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions, t.shapeOptions.pointOptions) : t.shapeOptions.pointOptions = Object.assign({}, this.options.shapeOptions.pointOptions), t.shapeOptions = Object.assign(this.options.shapeOptions, t.shapeOptions)) : t.shapeOptions = Object.assign({}, this.options.shapeOptions), t.shapeOptions.zIndex = t.zIndex || this.options.zIndex, t.shapeOptions.id = t.id ? t.id : this.options.id, Object.assign(this.options, t), this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + $ + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + tt + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + st + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + et + "')" } });
  }, this.adjustCoordinates = () => {
    this.right = this.left + this.width, this.bottom = this.top + this.height, this.left_top.x = this.left, this.left_top.y = this.top, this.right_top.x = this.right, this.right_top.y = this.top, this.left_bottom.x = this.left, this.left_bottom.y = this.bottom, this.right_bottom.x = this.right, this.right_bottom.y = this.bottom;
  }, this.calcPosition = () => {
    this.shape.calcPosition(), this.left = this.shape.left, this.top = this.shape.top, this.bottom = this.shape.bottom, this.right = this.shape.right, this.width = this.shape.width, this.height = this.shape.height;
  }, this.getPosition = () => ({ top: this.top, left: this.left, bottom: this.bottom, right: this.right, width: this.width, height: this.height }), this.redraw = () => {
    this.adjustCoordinates(), this.shape.setOptions(this.options.shapeOptions), this.shape.redraw();
  }, this.show = () => {
    this.options.shapeOptions.visible = !0, this.shape.show();
  }, this.hide = () => {
    this.options.shapeOptions.visible = !1, this.shape.hide();
  }, this.destroy = () => {
    n.emit(r.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (t, s) => this.eventListener.addEventListener(t, s), this.removeEventListener = (t, s) => {
    this.eventListener.removeEventListener(t, s);
  };
}
function I() {
  this.root = null, this.points = [], this.svg = null, this.groupHelper = null, this.options = {
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
    canRotate: !1,
    offsetX: 0,
    offsetY: 0,
    classes: "",
    style: {},
    pointOptions: {},
    zIndex: 1e3,
    bounds: { left: -1, top: -1, right: -1, bottom: -1 },
    visible: !0,
    displayMode: A.DEFAULT,
    managed: !0
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = y(), this.resizeBox = null, this.rotateBox = null, this.initCenter = null, this.init = (t, s = null, e = null) => {
    if (!t) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    if (_.getShape(this)) {
      console.error("This shape already initialized");
      return;
    }
    return this.root = t, this.root.style.position = "relative", this.setOptions(s), this.eventListener = new Z(this), this.groupHelper = new q(this).init(), this.setupPoints(e, Object.assign({}, this.options.pointOptions)), this.eventListener.run(), this.applyDisplayMode(), n.emit(r.SHAPE_CREATE, this, {}), this;
  }, this.setOptions = (t) => {
    !t || typeof t != "object" || (t.pointOptions = O(this.options.pointOptions, t.pointOptions), t.style = O(this.options.style, t.style), t.bounds = O(this.options.bounds, t.bounds), b(t.visible) && t.visible !== this.options.visible && (this.points.forEach((s) => s.options.visible = t.visible), this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: t.visible } }), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: t.visible } })), this.options = O(this.options, t), this.points.forEach((s) => {
      s.setOptions(O({}, this.options.pointOptions)), s.options.bounds = this.getBounds(), s.options.zIndex <= this.options.zIndex && (s.options.zIndex = this.options.zIndex + 1), s.redraw();
    }));
  }, this.setupPoints = (t, s) => {
    t && typeof t == "object" && (this.points = [], this.addPoints(t, Object.assign({}, s)));
  }, this.addPoint = (t, s, e = null) => {
    const i = this.putPoint(t, s, Object.assign({}, e));
    return this.redraw(), i;
  }, this.addPoints = (t, s = null) => {
    !t || typeof t != "object" || (t.forEach(
      (e) => this.putPoint(e[0] + this.options.offsetX, e[1] + this.options.offsetY, Object.assign({}, s))
    ), this.redraw());
  }, this.putPoint = (t, s, e = null) => {
    if (this.findPoint(t, s))
      return console.error(`Point with x=${t} and y=${s} already exists`), null;
    !e || !Object.keys(e).length ? e = Object.assign({}, this.options.pointOptions) || {} : e = O(Object.assign({}, this.options.pointOptions), e), e.bounds = this.getBounds(), e.zIndex = this.options.zIndex + 1;
    const i = new K();
    return this.points.push(i), i.init(t, s, e), this.root.appendChild(i.element), i;
  }, this.deleteAllPoints = () => {
    for (; this.points.length; )
      this.points[0].destroy();
  }, this.deletePoint = (t, s) => {
    const e = this.findPoint(t, s);
    e && e.destroy();
  }, this.findPoint = (t, s) => {
    const e = this.points.find((i) => i.x === t && i.y === s);
    return typeof e > "u" || !e ? null : e;
  }, this.findPointById = (t) => {
    const s = this.points.find((e) => e.options.id === t);
    return typeof s > "u" || !s ? null : s;
  }, this.getPointsArray = () => {
    let t = [];
    return this.points && typeof this.points == "object" && this.points.length && (t = this.points.map((s) => [s.x, s.y])), t;
  }, this.moveTo = (t, s, e = !0) => {
    const i = this.getBounds(), o = this.getPosition(!0);
    let h = t + o.width > i.right ? i.right - o.width : t, u = s + o.height > i.bottom ? i.bottom - o.height : s;
    this.moveBy(h - o.left, u - o.top, e), this.calcPosition();
  }, this.moveBy = (t, s, e = !0) => {
    for (let o in this.points)
      this.points[o].x += t, this.points[o].y += s, e && this.points[o].redraw();
    this.calcPosition();
    const i = this.getChildren();
    e && this.redraw(), i.length && i.forEach((o) => {
      o.moveBy(t, s, e);
    });
  }, this.scaleTo = (t = null, s = null) => {
    const e = this.getBounds();
    if (this.calcPosition(), !t && !s)
      return null;
    const i = this.getPosition(!0);
    [t, s] = M(t, s, i.width, i.height), i.width >= 10 && t < 10 && (t = 10), i.height >= 10 && s < 10 && (s = 10);
    let o = i.left + t > e.right ? e.right - i.left : t, h = i.top + s > e.bottom ? e.bottom - i.top : s, u = o / i.width, l = h / i.height;
    this.points.forEach(
      (a) => {
        a.x = (a.x - i.left) * u + i.left, a.y = (a.y - i.top) * l + i.top;
      }
    ), this.getChildren(!0).forEach((a) => {
      a.points.forEach(
        (d) => {
          d.x = (d.x - i.left) * u + i.left, d.y = (d.y - i.top) * l + i.top;
        }
      ), a.calcPosition();
    }), this.getChildren(!0).forEach((a) => a.redraw()), this.calcPosition();
  }, this.rotateBy = (t, s = null, e = null, i = !1) => {
    this.calcPosition();
    const o = this.getPosition(!0);
    let [h, u] = this.getCenter(!0);
    const l = this.getRootParent();
    l && ([h, u] = l.getCenter(!0)), s || (s = h), e || (e = u), this.initCenter && ([s, e] = this.initCenter), !(i && (!this.isInBounds(...B(t, o.left, o.top, s, e)) || !this.isInBounds(...B(t, o.right, o.top, s, e)) || !this.isInBounds(...B(t, o.left, o.bottom, s, e)) || !this.isInBounds(...B(t, o.right, o.bottom, s, e)))) && (this.points.forEach((a) => a.rotateBy(t, s, e)), this.getChildren(!0).forEach((a) => {
      a.points.forEach((d) => d.rotateBy(t, s, e)), a.redraw();
    }));
  }, this.isInBounds = (t, s) => {
    const [e, i] = this.getMaxPointSize(), o = this.getBounds();
    return t >= o.left + e / 2 && t <= o.right - e / 2 && s >= o.top + i / 2 && s <= o.bottom - i / 2;
  }, this.redraw = () => {
    this.applyDisplayMode(), m.draw(this);
  }, this.applyDisplayMode = () => {
    this.options.displayMode === A.SCALE && this.options.canScale ? (this.rotateBox && this.rotateBox.hide(), !this.resizeBox && this.setupResizeBox(), this.resizeBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : this.options.displayMode === A.ROTATE && this.options.canRotate ? (this.resizeBox && this.resizeBox.hide(), !this.rotateBox && this.setupRotateBox(), this.rotateBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : (this.resizeBox && this.resizeBox.hide(), this.rotateBox && this.rotateBox.hide()), this.points.forEach((t) => {
      t.setOptions({ zIndex: this.options.zIndex + 1 }), t.element.style.zIndex = t.options.zIndex, this.options.displayMode === A.DEFAULT && !t.options.forceDisplay && (t.element.style.display = "none");
    });
  }, this.switchDisplayMode = (t = null) => {
    t || (t = this.getNextDisplayMode()), (t === A.SCALE && !this.options.canScale || t === A.ROTATE && !this.options.canRotate || t === A.SELECTED && !this.points.filter((s) => s.options.canDrag).length) && (t = A.DEFAULT), this.options.displayMode = t, this.redraw();
  }, this.getNextDisplayMode = () => {
    let t;
    return this.options.displayMode === A.DEFAULT ? t = A.SELECTED : this.options.displayMode === A.SELECTED ? t = A.SCALE : this.options.displayMode === A.SCALE ? t = A.ROTATE : t = A.DEFAULT, t === A.SELECTED && !this.points.filter((s) => s.options.canDrag).length && (t = A.SCALE), t === A.SCALE && !this.options.canScale && (t = A.ROTATE), t === A.ROTATE && !this.options.canRotate && (t = A.DEFAULT), t;
  }, this.calcPosition = () => {
    !this.points.length || (this.left = this.points.map((t) => t.x).reduce((t, s) => s < t ? s : t), this.top = this.points.map((t) => t.y).reduce((t, s) => s < t ? s : t), this.right = this.points.map((t) => t.x).reduce((t, s) => s > t ? s : t), this.bottom = this.points.map((t) => t.y).reduce((t, s) => s > t ? s : t), this.width = this.right - this.left || 1, this.height = this.bottom - this.top || 1);
  }, this.getPosition = () => ({ top: this.top, left: this.left, bottom: this.bottom, right: this.right, width: this.width, height: this.height }), this.getBounds = () => ({
    left: this.options.bounds.left !== -1 ? this.options.bounds.left : this.root.clientLeft,
    top: this.options.bounds.top !== -1 ? this.options.bounds.top : this.root.clientTop,
    right: this.options.bounds.right !== -1 ? this.options.bounds.right : this.root.clientLeft + this.root.clientWidth,
    bottom: this.options.bounds.bottom !== -1 ? this.options.bounds.bottom : this.root.clientTop + this.root.clientHeight
  }), this.isShapePoint = (t) => !!this.points.find((s) => s === t), this.belongsToShape = (t, s, e = !0) => {
    if (this.findPoint(t, s))
      return !0;
    let i = this.getPointsArray();
    return e && (i = i.map((o) => [o[0] + L(this.root).left, o[1] + L(this.root).top])), G(i, [t, s]);
  }, this.addEventListener = (t, s) => this.eventListener.addEventListener(t, s), this.removeEventListener = (t, s) => {
    this.eventListener.removeEventListener(t, s);
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.destroy = () => {
    for (; this.points.length > 0; )
      this.points[0].destroy();
    if (n.emit(r.SHAPE_DESTROY, this, {}), this.eventListener && this.eventListener.destroy(), this.resizeBox && this.resizeBox.destroy(), this.rotateBox && this.rotateBox.destroy(), this.root && this.svg)
      try {
        this.root.removeChild(this.svg);
      } catch {
      }
    this.getChildren(!0).forEach((t) => t.destroy());
  }, this.setupResizeBox = () => {
    const t = this.getResizeBoxBounds();
    this.resizeBox = new N().init(this.root, t.left, t.top, t.width, t.height, {
      zIndex: this.options.zIndex + 1,
      id: this.options.id + "_resizebox",
      shapeOptions: {
        canDragShape: !1,
        visible: this.options.visible,
        managed: !1
      }
    }), this.calcPosition(), this.eventListener.addResizeEventListener(), this.resizeBox.redraw();
  }, this.setupRotateBox = () => {
    const t = this.getResizeBoxBounds();
    this.rotateBox = new z().init(this.root, t.left, t.top, t.width, t.height, {
      zIndex: this.options.zIndex + 1,
      id: this.options.id + "_rotatebox",
      shapeOptions: {
        canDragShape: !1,
        visible: this.options.visible,
        managed: !1
      }
    }), this.calcPosition(), this.eventListener.addRotateEventListener(), this.rotateBox.redraw();
  }, this.getResizeBoxBounds = () => {
    this.calcPosition();
    let t = this.getPosition(!0);
    const s = this.getRootParent();
    s && (s.calcPosition(), t = s.getPosition(!0));
    const [e, i] = this.getMaxPointSize(), o = {
      left: t.left - e,
      right: t.right + e,
      top: t.top - i,
      bottom: t.bottom + i,
      width: t.width + e * 2,
      height: t.height + i * 2
    };
    o.left < 0 && (this.moveTo(o.left * -1, t.top, !1), o.left = 0), o.top < 0 && (this.moveTo(t.left, o.top * -1, !1), o.top = 0);
    const h = this.getBounds();
    return o.bottom > h.bottom && (this.moveTo(t.left, o.bottom - h.bottom + t.top, !1), o.bottom = h.bottom), o.right > h.right && (this.moveTo(o.right - h.right + t.left, t.top, !1), o.bottom = h.bottom), o;
  }, this.getMaxPointSize = () => {
    if (!this.points.length)
      return [0, 0];
    const t = this.points.map((e) => e.options.width).reduce((e, i) => Math.max(e, i)), s = this.points.map((e) => e.options.height).reduce((e, i) => Math.max(e, i));
    return [t, s];
  }, this.getCenter = (t = !1) => {
    const s = this.getPosition(t);
    return [s.left + s.width / 2, s.top + s.height / 2];
  }, this.toSvg = () => m.toSvg(this), this.toPng = (t = T.DATAURL, s = null, e = null) => m.toPng(this, t, s, e);
}
const A = {
  DEFAULT: "default",
  SELECTED: "selected",
  SCALE: "scale",
  ROTATE: "rotate"
};
function N() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = y(), this.options = {
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
          borderWidth: "0px",
          borderRadius: "0px",
          backgroundColor: "rgba(0,0,0,0)",
          cursor: "pointer"
        },
        forceDisplay: !0,
        width: 13,
        height: 13
      }
    },
    zIndex: 1e3
  }, this.eventListener = null, this.left_top = null, this.left_center = null, this.left_bottom = null, this.center_top = null, this.center_bottom = null, this.right_top = null, this.right_center = null, this.right_bottom = null, this.init = (t, s, e, i, o, h = {}) => (this.left = parseInt(s), this.top = parseInt(e), this.width = parseInt(i), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(h), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new I().init(t, Object.assign({}, this.options.shapeOptions), []), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new J(this).run(), this.redraw(), n.emit(r.SHAPE_CREATE, this, {}), this), this.setOptions = (t = {}) => {
    !t || typeof t != "object" || (t.shapeOptions && typeof t.shapeOptions == "object" ? (t.shapeOptions.pointOptions && typeof t.shapeOptions.pointOptions == "object" ? t.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions, t.shapeOptions.pointOptions) : t.shapeOptions.pointOptions = Object.assign({}, this.options.shapeOptions.pointOptions), t.shapeOptions = Object.assign(this.options.shapeOptions, t.shapeOptions)) : t.shapeOptions = Object.assign({}, this.options.shapeOptions), t.shapeOptions.zIndex = t.zIndex || this.options.zIndex, t.shapeOptions.id = t.id ? t.id : this.options.id, Object.assign(this.options, t), this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + rt + "')" } }), this.center_top = this.shape.addPoint(this.left + this.width / 2, this.top, { id: this.shape.guid + "_center_top", style: { backgroundImage: "url('" + ot + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + dt + "')" } }), this.right_center = this.shape.addPoint(this.right, this.top + this.height / 2, { id: this.shape.guid + "_right_center", style: { backgroundImage: "url('" + pt + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + at + "')" } }), this.center_bottom = this.shape.addPoint(this.left + this.width / 2, this.bottom, { id: this.shape.guid + "_center_bottom", style: { backgroundImage: "url('" + it + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + nt + "')" } }), this.left_center = this.shape.addPoint(this.left, this.top + this.height / 2, { id: this.shape.guid + "_left_center", style: { backgroundImage: "url('" + ht + "')" } }), this.setPointsOptions();
  }, this.setPointsOptions = () => {
    this.setPointsMoveDirections(), this.setPointsMoveBounds();
  }, this.setPointsMoveDirections = () => {
    this.center_top.setOptions({ moveDirections: [f.TOP, f.BOTTOM] }), this.center_bottom.setOptions({ moveDirections: [f.TOP, f.BOTTOM] }), this.left_center.setOptions({ moveDirections: [f.LEFT, f.RIGHT] }), this.right_center.setOptions({ moveDirections: [f.LEFT, f.RIGHT] });
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
    n.emit(r.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (t, s) => this.eventListener.addEventListener(t, s), this.removeEventListener = (t, s) => {
    this.eventListener.removeEventListener(t, s);
  };
}
try {
  window.ResizeBox = N, window.SmartShape = I, window.RotateBox = z, window.SmartShapeManager = _;
} catch {
}
export {
  N as ResizeBox,
  z as RotateBox,
  I as SmartShape,
  _ as SmartShapeManager
};
