function H() {
  this.subscriptions = {}, this.subscribe = (e, t) => ((typeof this.subscriptions[e] > "u" || !this.subscriptions[e]) && (this.subscriptions[e] = []), typeof this.subscriptions[e].find((s) => s === t) < "u" ? null : (this.subscriptions[e].push(t), t)), this.emit = (e, t, s = null) => {
    if ((!s || typeof s != "object") && (s = {}), s.type = e, s.target = t, typeof this.subscriptions[e] < "u" && this.subscriptions[e] && this.subscriptions[e].length) {
      for (let i of this.subscriptions[e])
        i(s);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (e, t) => {
    if (typeof this.subscriptions[e] > "u" || !this.subscriptions[e])
      return !1;
    const s = this.subscriptions[e].indexOf(t);
    return s !== -1 ? (this.subscriptions[e].splice(s, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const n = new H(), V = (e) => e * (Math.PI / 180), k = (e) => e * (180 / Math.PI), B = (e, t, s, i, o) => {
  const r = V(e), u = (t - i) * Math.cos(r) - (s - o) * Math.sin(r) + i, l = (t - i) * Math.sin(r) + (s - o) * Math.cos(r) + o;
  return [u, l];
}, x = (e, t, s, i) => Math.sqrt(Math.pow(s - e, 2) + Math.pow(i - t, 2)), G = (e, t) => {
  const s = (a, d, E) => d.x <= Math.max(a.x, E.x) && d.x >= Math.min(a.x, E.x) && d.y <= Math.max(a.y, E.y) && d.y >= Math.min(a.y, E.y), i = (a, d, E) => {
    let f = (d[1] - a[1]) * (E[0] - d[0]) - (d[0] - a[0]) * (E[1] - d[1]);
    return f === 0 ? 0 : f > 0 ? 1 : 2;
  }, o = (a, d, E, f) => {
    let T = i(a, d, E), b = i(a, d, f), I = i(E, f, a), C = i(E, f, d);
    return T !== b && I !== C || T === 0 && s(a, E, d) || b === 0 && s(a, f, d) || I === 0 && s(E, a, f) ? !0 : !!(C === 0 && s(E, d, f));
  };
  if (e.length < 3)
    return !1;
  let r = [1e4, t[1]], u = 0, l = 0;
  do {
    let a = (l + 1) % e.length;
    if (o(e[l], e[a], t, r)) {
      if (i(e[l], t, e[a]) === 0)
        return s(
          e[l],
          t,
          e[a]
        );
      u++;
    }
    l = a;
  } while (l !== 0);
  return u % 2 === 1;
}, U = (e, t, s, i) => !e && !t ? [s, i] : e && t ? [e, t] : (e || (e = t * (s / i)), t || (t = e * (i / s)), [e, t]), L = (e, t = !0) => {
  let s = 0, i = 0;
  if (!t)
    return { top: e.offsetTop - e.scrollTop, left: e.offsetLeft - e.scrollLeft };
  for (; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop); )
    s += e.offsetLeft - e.scrollLeft, i += e.offsetTop - e.scrollTop, e = e.offsetParent;
  return { top: i, left: s };
}, M = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
  const t = Math.random() * 16 | 0;
  return (e === "x" ? t : t & 3 | 8).toString(16);
}).replace(/-/g, ""), w = (e) => {
  try {
    e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault(), e.cancelBubble = !0, e.returnValue = !1;
  } catch {
  }
  return !1;
}, _ = (e) => typeof e < "u" && e !== null, S = (e, t) => e && typeof e == "object" && t && typeof t == "object" ? Object.assign(e, t) : e, j = (e) => {
  const t = atob(e.split(",")[1]), s = e.split(",")[0].split(":")[1].split(";")[0], i = new ArrayBuffer(t.length), o = new Uint8Array(i);
  for (let r = 0; r < t.length; r++)
    o[r] = t.charCodeAt(r);
  return new Blob([i], { type: s });
}, p = (e, t = {}) => {
  const s = {};
  for (let i in e)
    i !== "type" && i !== "target" && (s[i] = e[i]);
  return Object.keys(t).forEach((i) => {
    s[i] = t[i];
  }), s;
}, K = (e) => [e.pageX, e.pageY];
function F() {
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
      c.LEFT,
      c.TOP,
      c.RIGHT,
      c.BOTTOM
    ],
    visible: !0,
    hidden: !1,
    forceDisplay: !1
  }, this.x = 0, this.y = 0, this.element = null, this.guid = M(), this.subscriptions = {}, this.init = (e, t, s = null) => (this.x = parseInt(e), this.y = parseInt(t), this.element = this.createPointUI(), this.setOptions(s), this.setEventListeners(), n.emit(A.POINT_ADDED, this), this), this.setOptions = (e) => {
    e && typeof e == "object" && (e.style && typeof e.style == "object" && (e.style = Object.assign(this.options.style, e.style)), Object.assign(this.options, e)), this.options.id && (this.element.id = this.options.id);
  }, this.createPointUI = () => {
    const e = document.createElement("div");
    return this.options.canDrag ? this.setPointStyles(e) : e;
  }, this.setPointStyles = (e = null) => {
    if (e == null && (e = this.element), this.options.id && (this.element.id = this.options.id), e.className = this.options.classes, e.style = this.options.style, typeof this.options.style == "object")
      for (let t in this.options.style)
        e.style[t] = this.options.style[t];
    return e.style.width = this.options.width + "px", e.style.height = this.options.height + "px", e.style.left = this.x - parseInt(this.options.width / 2) + "px", e.style.top = this.y - parseInt(this.options.height / 2) + "px", e.style.zIndex = this.options.zIndex, !this.options.canDrag || !this.options.visible || this.options.hidden ? e.style.display = "none" : e.style.display = "", e;
  }, this.redraw = () => {
    this.element = this.setPointStyles();
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.rotateBy = (e, t, s) => {
    const [i, o] = B(e, this.x, this.y, t, s);
    this.x = i, this.y = o;
  }, this.setEventListeners = () => {
    this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown), this.element.addEventListener("mouseover", this.mouseover), this.element.addEventListener("mouseout", this.mouseout), this.element.addEventListener("click", this.click), this.element.addEventListener("dblclick", this.doubleclick), this.element.addEventListener("mousemove", this.mousemove), n.subscribe(y.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange);
  }, this.mousedown = (e) => {
    n.emit(A.POINT_MOUSE_DOWN, this, p(e)), e.buttons === 1 && this.options.canDrag && (n.emit(A.POINT_DRAG_START, this, p(e)), w(e));
  }, this.mousemove = (e) => {
    if (n.emit(A.POINT_MOUSE_MOVE, this, p(e)), e.buttons !== 1 || !this.options.canDrag || !O.draggedShape || O.draggedShape.draggedPoint !== this)
      return;
    const t = this.x, s = this.y, i = L(this.element.parentNode, !0);
    if (!this.checkFitBounds(this.x + e.movementX, this.y + e.movementY)) {
      n.emit(A.POINT_DRAG_MOVE, this, p(e, { oldX: t, oldY: s }));
      return;
    }
    let o = e.clientX + window.scrollX - i.left - this.options.width / 2, r = e.clientY + window.scrollY - i.top - this.options.height / 2;
    [o, r] = this.applyMoveRestrictions(o, r, t, s), this.x = o, this.y = r, this.element.style.left = this.x + "px", this.element.style.top = this.y + "px", n.emit(A.POINT_DRAG_MOVE, this, p(e, { oldX: t, oldY: s }));
  }, this.mouseover = (e) => {
    n.emit(A.POINT_MOUSE_OVER, this, p(e));
  }, this.mouseout = (e) => {
    n.emit(A.POINT_MOUSE_OUT, this, p(e));
  }, this.click = (e) => {
    n.emit(A.POINT_MOUSE_CLICK, this, p(e));
  }, this.doubleclick = (e) => {
    n.emit(A.POINT_MOUSE_DOUBLE_CLICK, this, p(e));
  }, this.checkFitBounds = (e, t) => !(this.options.bounds.left !== -1 && e < this.options.bounds.left || this.options.bounds.right !== -1 && e > this.options.bounds.right || this.options.bounds.top !== -1 && t < this.options.bounds.top || this.options.bounds.bottom !== -1 && t > this.options.bounds.bottom), this.applyMoveRestrictions = (e, t, s, i) => (t > i && this.options.moveDirections.indexOf(c.BOTTOM) === -1 && (t = i), t < i && this.options.moveDirections.indexOf(c.TOP) === -1 && (t = i), e > s && this.options.moveDirections.indexOf(c.RIGHT) === -1 && (e = s), e < s && this.options.moveDirections.indexOf(c.LEFT) === -1 && (e = s), e > this.options.bounds.right && (e = this.options.bounds.right), t > this.options.bounds.bottom && (t = this.options.bounds.bottom), e < this.options.bounds.left && (e = this.options.bounds.left), t < this.options.bounds.top && (t = this.options.bounds.top), [e, t]), this.mouseup = (e) => {
    n.emit(A.POINT_MOUSE_UP, this, p(e)), e.button !== 2 && n.emit(A.POINT_DRAG_END, this, p(e)), e.button === 2 && this.options.canDelete && this.destroy();
  }, this.onBoundsChange = (e) => {
    e.points.find((t) => t === this) && (this.options.bounds = e.bounds);
  }, this.destroy = () => {
    this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), this.element.removeEventListener("mouseover", this.mouseover), this.element.removeEventListener("mouseout", this.mouseout), this.element.removeEventListener("click", this.click), this.element.removeEventListener("dblclick", this.doubleclick), this.element.removeEventListener("mousemove", this.mousemove), n.unsubscribe(y.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange), n.emit(A.POINT_DESTROYED, this);
    for (let e in this.subscriptions)
      this.subscriptions[e].forEach((s) => n.unsubscribe(e, s)), this.subscriptions[e] = [];
  }, this.addEventListener = (e, t) => {
    typeof this.subscriptions[e] > "u" && (this.subscriptions[e] = []);
    const s = n.subscribe(e, (i) => {
      i.target && i.target.guid === this.guid && t(i);
    });
    return this.subscriptions[e].push(s), s;
  }, this.removeEventListener = (e, t) => {
    this.subscriptions[e].splice(this.subscriptions[e].indexOf(t), 1), n.unsubscribe(e, t);
  }, this;
}
const A = {
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
}, c = {
  TOP: 0,
  LEFT: 1,
  RIGHT: 2,
  BOTTOM: 3
};
function W(e) {
  this.rotateBox = e, this.subscriptions = {
    rotate: []
  }, this.initialAngle = 0, this.previousAngle = 0, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    this.shapeMouseEnter = this.rotateBox.shape.addEventListener(h.SHAPE_MOUSE_ENTER, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_ENTER, this.rotateBox, t);
      }, 1);
    }), this.shapeMouseMove = this.rotateBox.shape.addEventListener(h.SHAPE_MOUSE_MOVE, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_MOVE, this.rotateBox, t);
      }, 1);
    }), this.shapeMoveStart = this.rotateBox.shape.addEventListener(h.SHAPE_MOVE_START, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOVE_START, this.rotateBox, t);
      }, 1);
    }), this.shapeMoveEnd = this.rotateBox.shape.addEventListener(h.SHAPE_MOVE_END, (t) => {
      setTimeout(() => {
        this.previousAngle = 0, n.emit(h.SHAPE_MOVE_END, this.rotateBox, t);
      }, 1);
    }), this.shapeMove = this.rotateBox.shape.addEventListener(h.SHAPE_MOVE, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOVE, this.rotateBox, t);
      }, 1);
    }), this.shapeClick = this.rotateBox.shape.addEventListener(h.SHAPE_MOUSE_CLICK, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_CLICK, this.rotateBox, t);
      }, 1);
    }), this.shapeMouseDown = this.rotateBox.shape.addEventListener(h.SHAPE_MOUSE_DOWN, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_DOWN, this.rotateBox, t);
      }, 1);
    }), this.shapeMouseUp = this.rotateBox.shape.addEventListener(h.SHAPE_MOUSE_UP, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_UP, this.rotateBox, t);
      }, 1);
    }), this.shapeMouseOver = this.rotateBox.shape.addEventListener(h.SHAPE_MOUSE_OVER, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_OVER, this.rotateBox, t);
      }, 1);
    }), this.shapeMouseOut = this.rotateBox.shape.addEventListener(h.SHAPE_MOUSE_OUT, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_OUT, this.rotateBox, t);
      }, 1);
    }), this.shapeDoubleClick = this.rotateBox.shape.addEventListener(h.SHAPE_MOUSE_DOUBLE_CLICK, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_DOUBLE_CLICK, this.rotateBox, t);
      }, 1);
    }), this.shapePointDragMove = this.rotateBox.shape.addEventListener(h.POINT_DRAG_MOVE, (t) => {
      setTimeout(() => {
        n.emit(h.POINT_DRAG_MOVE, this.rotateBox, t);
      }, 1);
    }), this.rotateBox.shape.points.forEach((t) => {
      t.mousemove = this.mousemove, t.mouseDownListener = t.addEventListener(A.POINT_DRAG_START, (s) => {
        this.onPointMouseDown(s), setTimeout(() => {
          n.emit(h.POINT_DRAG_START, this.rotateBox, { point: t });
        }, 1);
      }), t.mouseUpListener = t.addEventListener(A.POINT_DRAG_END, (s) => {
        this.onPointMouseUp(s), setTimeout(() => {
          n.emit(h.POINT_DRAG_END, this.rotateBox, { point: t });
        }, 1);
      });
    });
  }, this.mousemove = (t) => {
    if (t.buttons !== 1) {
      this.rotateBox.shape.root.draggedShape && (this.rotateBox.shape.root.draggedShape.draggedPoint = null, this.rotateBox.shape.root.draggedShape = null), n.emit(h.SHAPE_MOUSE_MOVE, this.rotateBox.shape, { clientX: t.clientX, clientY: t.clientY });
      return;
    }
    const [s, i] = K(t), [o, r] = this.rotateBox.shape.getCenter();
    let u = this.calcAngle(s, i, o, r);
    if (u === null)
      return;
    let l = u;
    this.previousAngle && (l -= this.previousAngle), this.previousAngle = u, n.emit(v.ROTATE_BOX_ROTATE, this.rotateBox, { angle: l });
  }, this.calcAngle = (t, s, i, o) => {
    const r = this.calcHypotenuse(t, s, i, o);
    if (r <= 0)
      return null;
    const u = this.calcCathetus(t, s, i, o), l = this.calcStartAngle(t, s, i, o);
    return Math.round(k(Math.asin(u / r)) + l + this.initialAngle);
  }, this.calcHypotenuse = (t, s, i, o) => x(t, s, i, o), this.calcCathetus = (t, s, i, o) => {
    if (t <= i && s <= o)
      return x(t, s, t, o);
    if (t >= i && s <= o)
      return x(t, s, i, s);
    if (t >= i && s >= o)
      return x(t, s, t, o);
    if (t <= i && s >= o)
      return x(t, s, i, s);
  }, this.calcStartAngle = (t, s, i, o) => {
    if (t <= i && s <= o)
      return 0;
    if (t >= i && s <= o)
      return 90;
    if (t >= i && s >= o)
      return 180;
    if (t <= i && s >= o)
      return 270;
  }, this.onPointMouseDown = (t) => {
    switch (t.target) {
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
    this.rotateBox.shape.points.forEach((s) => s.setOptions({ visible: !1 }));
  }, this.onPointMouseUp = (t) => {
    this.rotateBox.shape.points.forEach((s) => {
      s.setOptions({ visible: !0 }), s.redraw();
    });
  }, this.addEventListener = (t, s) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const i = n.subscribe(t, (o) => {
      o.target && o.target.shape && o.target.shape.guid === this.rotateBox.shape.guid && s(o);
    });
    return this.subscriptions[t].push(i), i;
  }, this.removeEventListener = (t, s) => {
    this.subscriptions[t].splice(this.subscriptions[t].indexOf(s), 1), n.unsubscribe(t, s);
  }, this.destroy = () => {
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((i) => n.unsubscribe(t, i)), this.subscriptions[t] = [];
    this.rotateBox.shape.removeEventListener(h.SHAPE_MOVE_START, this.shapeMoveStart), this.rotateBox.shape.removeEventListener(h.SHAPE_MOVE, this.shapeMove), this.rotateBox.shape.removeEventListener(h.SHAPE_MOVE_END, this.shapeMoveEnd), this.rotateBox.shape.removeEventListener(h.SHAPE_MOUSE_ENTER, this.shapeMouseEnter), this.rotateBox.shape.removeEventListener(h.SHAPE_MOUSE_MOVE, this.shapeMouseMove), this.rotateBox.shape.removeEventListener(h.SHAPE_MOUSE_CLICK, this.shapeClick), this.rotateBox.shape.removeEventListener(h.SHAPE_MOUSE_DOWN, this.shapeMouseDown), this.rotateBox.shape.removeEventListener(h.SHAPE_MOUSE_UP, this.shapeMouseUp), this.rotateBox.shape.removeEventListener(h.SHAPE_MOUSE_MOVE, this.shapeMouseMove), this.rotateBox.shape.removeEventListener(h.SHAPE_MOUSE_OVER, this.shapeMouseOver), this.rotateBox.shape.removeEventListener(h.SHAPE_MOUSE_OUT, this.shapeMouseOut), this.rotateBox.shape.removeEventListener(h.SHAPE_MOUSE_DOUBLE_CLICK, this.shapeDoubleClick), this.rotateBox.shape.removeEventListener(h.POINT_DRAG_MOVE, this.shapePointDragMove), this.rotateBox.shape.points.forEach((t) => {
      t.removeEventListener(A.POINT_DRAG_START, t.mouseDownListener), t.removeEventListener(A.POINT_DRAG_START, t.mouseUpListener);
    });
  };
}
const v = {
  ROTATE_BOX_ROTATE: "rotate"
};
function J(e) {
  this.resizeBox = e, this.subscriptions = {
    resize: []
  }, this.guid = M(), this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    n.subscribe(A.POINT_DRAG_MOVE, this.onPointDragMove), n.subscribe(A.POINT_DRAG_END, this.onPointDragMove), this.shapeMouseEnter = this.resizeBox.shape.addEventListener(h.SHAPE_MOUSE_ENTER, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_ENTER, this.resizeBox, t);
      }, 1);
    }), this.shapeMouseMove = this.resizeBox.shape.addEventListener(h.SHAPE_MOUSE_MOVE, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_MOVE, this.resizeBox, t);
      }, 1);
    }), this.shapeMoveStart = this.resizeBox.shape.addEventListener(h.SHAPE_MOVE_START, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOVE_START, this.resizeBox, t);
      }, 1);
    }), this.shapeMoveEnd = this.resizeBox.shape.addEventListener(h.SHAPE_MOVE_END, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOVE_END, this.resizeBox, t);
      }, 1);
    }), this.shapeMove = this.resizeBox.shape.addEventListener(h.SHAPE_MOVE, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOVE, this.resizeBox, t);
      }, 1);
    }), this.shapeClick = this.resizeBox.shape.addEventListener(h.SHAPE_MOUSE_CLICK, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_CLICK, this.resizeBox, t);
      }, 1);
    }), this.shapeMouseDown = this.resizeBox.shape.addEventListener(h.SHAPE_MOUSE_DOWN, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_DOWN, this.resizeBox, t);
      }, 1);
    }), this.shapeMouseUp = this.resizeBox.shape.addEventListener(h.SHAPE_MOUSE_UP, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_UP, this.resizeBox, t);
      }, 1);
    }), this.shapeMouseOver = this.resizeBox.shape.addEventListener(h.SHAPE_MOUSE_OVER, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_OVER, this.resizeBox, t);
      }, 1);
    }), this.shapeMouseOut = this.resizeBox.shape.addEventListener(h.SHAPE_MOUSE_OUT, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_OUT, this.resizeBox, t);
      }, 1);
    }), this.shapeDoubleClick = this.resizeBox.shape.addEventListener(h.SHAPE_MOUSE_DOUBLE_CLICK, (t) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_DOUBLE_CLICK, this.resizeBox, t);
      }, 1);
    }), this.shapePointDragStart = this.resizeBox.shape.addEventListener(h.POINT_DRAG_START, (t) => {
      setTimeout(() => {
        n.emit(h.POINT_DRAG_START, this.resizeBox, t);
      }, 1);
    }), this.shapePointDragMove = this.resizeBox.shape.addEventListener(h.POINT_DRAG_MOVE, (t) => {
      setTimeout(() => {
        n.emit(h.POINT_DRAG_MOVE, this.resizeBox, t);
      }, 1);
    }), this.shapePointDragEnd = this.resizeBox.shape.addEventListener(h.POINT_DRAG_END, (t) => {
      setTimeout(() => {
        n.emit(h.POINT_DRAG_END, this.resizeBox, t);
      }, 1);
    });
  }, this.onPointDragMove = (t) => {
    if (!this.resizeBox.shape.isShapePoint(t.target))
      return;
    switch (t.target) {
      case this.resizeBox.left_top:
        this.onLeftTopDragMove(t);
        break;
      case this.resizeBox.center_top:
        this.onCenterTopDragMove(t);
        break;
      case this.resizeBox.right_top:
        this.onRightTopDragMove(t);
        break;
      case this.resizeBox.right_center:
        this.onRightCenterDragMove(t);
        break;
      case this.resizeBox.right_bottom:
        this.onRightBottomDragMove(t);
        break;
      case this.resizeBox.center_bottom:
        this.onCenterBottomDragMove(t);
        break;
      case this.resizeBox.left_bottom:
        this.onLeftBottomDragMove(t);
        break;
      case this.resizeBox.left_center:
        this.onLeftCenterDragMove(t);
        break;
    }
    this.resizeBox.adjustCenters(), this.resizeBox.setPointsMoveBounds();
    const s = this.resizeBox.getPosition();
    this.resizeBox.calcPosition();
    const i = this.resizeBox.getPosition();
    this.resizeBox.redraw(), n.emit(P.RESIZE_BOX_RESIZE, this.resizeBox, { oldPos: s, newPos: i });
  }, this.onLeftTopDragMove = (t) => {
    this.resizeBox.left_center.x = t.target.x, this.resizeBox.left_bottom.x = t.target.x, this.resizeBox.center_top.y = t.target.y, this.resizeBox.right_top.y = t.target.y;
  }, this.onCenterTopDragMove = (t) => {
    this.resizeBox.left_top.y = t.target.y, this.resizeBox.right_top.y = t.target.y;
  }, this.onRightTopDragMove = (t) => {
    this.resizeBox.left_top.y = t.target.y, this.resizeBox.center_top.y = t.target.y, this.resizeBox.right_center.x = t.target.x, this.resizeBox.right_bottom.x = t.target.x;
  }, this.onRightCenterDragMove = (t) => {
    this.resizeBox.right_top.x = t.target.x, this.resizeBox.right_bottom.x = t.target.x;
  }, this.onRightBottomDragMove = (t) => {
    this.resizeBox.right_top.x = t.target.x, this.resizeBox.right_center.x = t.target.x, this.resizeBox.left_bottom.y = t.target.y, this.resizeBox.center_bottom.y = t.target.y;
  }, this.onCenterBottomDragMove = (t) => {
    this.resizeBox.left_bottom.y = t.target.y, this.resizeBox.right_bottom.y = t.target.y;
  }, this.onLeftBottomDragMove = (t) => {
    this.resizeBox.center_bottom.y = t.target.y, this.resizeBox.right_bottom.y = t.target.y, this.resizeBox.left_center.x = t.target.x, this.resizeBox.left_top.x = t.target.x;
  }, this.onLeftCenterDragMove = (t) => {
    this.resizeBox.left_bottom.x = t.target.x, this.resizeBox.left_top.x = t.target.x;
  }, this.addEventListener = (t, s) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const i = n.subscribe(t, (o) => {
      o.target && o.target.guid && o.target.guid === this.resizeBox.guid && s(o);
    });
    return this.subscriptions[t].push(i), i;
  }, this.removeEventListener = (t, s) => {
    this.subscriptions[t].splice(this.subscriptions[t].indexOf(s), 1), n.unsubscribe(t, s);
  }, this.destroy = () => {
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((i) => n.unsubscribe(t, i)), this.subscriptions[t] = [];
    this.resizeBox.shape.removeEventListener(h.SHAPE_MOVE_START, this.shapeMoveStart), this.resizeBox.shape.removeEventListener(h.SHAPE_MOVE, this.shapeMove), this.resizeBox.shape.removeEventListener(h.SHAPE_MOVE_END, this.shapeMoveEnd), this.resizeBox.shape.removeEventListener(h.SHAPE_MOUSE_ENTER, this.shapeMouseEnter), this.resizeBox.shape.removeEventListener(h.SHAPE_MOUSE_MOVE, this.shapeMouseMove), this.resizeBox.shape.removeEventListener(h.SHAPE_MOUSE_CLICK, this.shapeClick), this.resizeBox.shape.removeEventListener(h.SHAPE_MOUSE_DOWN, this.shapeMouseDown), this.resizeBox.shape.removeEventListener(h.SHAPE_MOUSE_UP, this.shapeMouseUp), this.resizeBox.shape.removeEventListener(h.SHAPE_MOUSE_MOVE, this.shapeMouseMove), this.resizeBox.shape.removeEventListener(h.SHAPE_MOUSE_OVER, this.shapeMouseOver), this.resizeBox.shape.removeEventListener(h.SHAPE_MOUSE_OUT, this.shapeMouseOver), this.resizeBox.shape.removeEventListener(h.SHAPE_MOUSE_DOUBLE_CLICK, this.shapeDoubleClick), this.resizeBox.shape.removeEventListener(h.POINT_DRAG_START, this.shapePointDragStart), this.resizeBox.shape.removeEventListener(h.POINT_DRAG_MOVE, this.shapePointDragMove), this.resizeBox.shape.removeEventListener(h.POINT_DRAG_END, this.shapePointDragEnd), n.unsubscribe(A.POINT_DRAG_MOVE, this.onPointDragMove), n.unsubscribe(A.POINT_DRAG_END, this.onPointDragMove);
  };
}
const P = {
  RESIZE_BOX_RESIZE: "resize"
};
function Z(e) {
  this.shape = e, this.subscriptions = {
    CONTAINER_BOUNDS_CHANGED: []
  }, this.run = () => (this.shape = e, this.setEventListeners(), this), this.setEventListeners = () => {
    n.subscribe(A.POINT_DESTROYED, this.onPointDestroyed), n.subscribe(A.POINT_ADDED, this.onPointAdded), n.subscribe(A.POINT_DRAG_MOVE, this.onPointDragMove);
  }, this.setSvgEventListeners = () => {
    this.svg_mouseover = this.shape.svg.addEventListener("mouseover", (t) => {
      O.mouseover(p(t, { target: this.shape }));
    }), this.svg_mouseout = this.shape.svg.addEventListener("mouseout", (t) => {
      O.mouseout(p(t, { target: this.shape }));
    }), this.svg_mouseenter = this.shape.svg.addEventListener("mouseenter", (t) => {
      O.mouseenter(p(t, { target: this.shape }));
    }), this.svg_mousedown = this.shape.svg.addEventListener("mousedown", (t) => {
      O.mousedown(p(t, { target: this.shape }));
    }), this.svg_click = this.shape.svg.addEventListener("click", (t) => {
      O.click(p(t, { target: this.shape }));
    }), this.svg_dblclick = this.shape.svg.addEventListener("dblclick", (t) => {
      O.doubleclick(p(t, { target: this.shape }));
    });
  }, this.removeSvgEventListeners = () => {
    this.shape.svg.removeEventListener("mouseover", this.svg_mouseover), this.shape.svg.removeEventListener("mouseout", this.svg_mouseout), this.shape.svg.removeEventListener("mouseenter", this.svg_mouseenter), this.shape.svg.removeEventListener("mousedown", this.svg_mousedown), this.shape.svg.removeEventListener("click", this.svg_click), this.shape.svg.removeEventListener("dblclick", this.svg_dblclick);
  }, this.addResizeEventListener = () => {
    !this.shape.resizeBox || (this.resizeBoxListener = this.shape.resizeBox.addEventListener(P.RESIZE_BOX_RESIZE, (t) => {
      const s = this.shape.getRootParent();
      if (s) {
        n.emit(P.RESIZE_BOX_RESIZE, s.resizeBox, { newPos: t.newPos, oldPos: t.oldPos });
        return;
      }
      const i = t.newPos.left - t.oldPos.left, o = t.newPos.top - t.oldPos.top;
      this.shape.moveBy(i, o);
      const [r, u] = this.shape.getMaxPointSize();
      this.shape.scaleTo(t.newPos.width - r * 2, t.newPos.height - u * 2), this.shape.redraw(), n.emit(P.RESIZE_BOX_RESIZE, this.shape, t);
    }), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(h.SHAPE_MOVE_START, (t) => {
      this.mousedown(t);
    }), this.resizeMouseMoveEventListener = this.shape.resizeBox.addEventListener(h.SHAPE_MOUSE_MOVE, (t) => {
      this.mousemove(t);
    }), this.resizeClickEventListener = this.shape.resizeBox.addEventListener(h.SHAPE_MOUSE_CLICK, (t) => {
      this.click(t);
    }), this.resizeDblClickEventListener = this.shape.resizeBox.addEventListener(h.SHAPE_MOUSE_DOUBLE_CLICK, (t) => {
      this.svg_dblclick(t);
    }), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(h.SHAPE_MOUSE_DOWN, (t) => {
      this.svg_mousedown(t);
    }), this.resizeMouseUpEventListener = this.shape.resizeBox.addEventListener(h.SHAPE_MOUSE_UP, (t) => {
      n.emit(h.SHAPE_MOUSE_UP, this.shape, p(t));
    }), this.resizeMouseOverEventListener = this.shape.resizeBox.addEventListener(h.SHAPE_MOUSE_OVER, (t) => {
      this.svg_mouseover(t);
    }), this.resizeMouseOutEventListener = this.shape.resizeBox.addEventListener(h.SHAPE_MOUSE_OUT, (t) => {
      this.svg_mouseout(t);
    }));
  }, this.addRotateEventListener = () => {
    !this.shape.rotateBox || (this.rotateBoxListener = this.shape.rotateBox.addEventListener(v.ROTATE_BOX_ROTATE, (t) => {
      const s = this.shape.getRootParent();
      if (s) {
        n.emit(v.ROTATE_BOX_ROTATE, s.rotateBox, { angle: t.angle });
        return;
      }
      s ? (s.rotateBy(t.angle), s.redraw(), n.emit(v.ROTATE_BOX_ROTATE, s, t)) : (this.shape.rotateBy(t.angle), this.shape.redraw(), n.emit(v.ROTATE_BOX_ROTATE, this.shape, t));
    }), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(h.SHAPE_MOVE_START, (t) => {
      this.mousedown(t);
    }), this.rotateMouseMoveEventListener = this.shape.rotateBox.addEventListener(h.SHAPE_MOUSE_MOVE, (t) => {
      this.mousemove(t);
    }), this.rotateClickEventListener = this.shape.rotateBox.addEventListener(h.SHAPE_MOUSE_CLICK, (t) => {
      this.click(t);
    }), this.rotateDblClickEventListener = this.shape.rotateBox.addEventListener(h.SHAPE_MOUSE_DOUBLE_CLICK, (t) => {
      this.svg_dblclick(t);
    }), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(h.SHAPE_MOUSE_DOWN, (t) => {
      this.svg_mousedown(t);
    }), this.rotateMouseUpEventListener = this.shape.rotateBox.addEventListener(h.SHAPE_MOUSE_UP, (t) => {
      n.emit(h.SHAPE_MOUSE_UP, this.shape, p(t));
    }), this.rotateMouseOverEventListener = this.shape.rotateBox.addEventListener(h.SHAPE_MOUSE_OVER, (t) => {
      this.svg_mouseover(t);
    }), this.rotateMouseOutEventListener = this.shape.rotateBox.addEventListener(h.SHAPE_MOUSE_OUT, (t) => {
      this.svg_mouseout(t);
    }), this.rotatePointDragStartEventListener = this.shape.rotateBox.addEventListener(h.POINT_DRAG_START, (t) => {
      this.shape.initCenter = this.shape.getCenter(!0);
    }), this.rotatePointDragEndEventListener = this.shape.rotateBox.addEventListener(h.POINT_DRAG_END, (t) => {
      this.shape.initCenter = null, this.shape.points.forEach((s) => {
        s.options.hidden || (s.element.style.display = "");
      });
    }));
  }, this.mousedown = (t) => {
    w(t), n.emit(h.SHAPE_MOUSE_DOWN, this.shape, p(t)), setTimeout(() => {
      n.emit(h.SHAPE_MOVE_START, this.shape, p(t, { pos: this.shape.getPosition(!0) }));
    }, 100);
  }, this.mousemove = (t) => {
    if (this.shape.draggedPoint || n.emit(h.SHAPE_MOUSE_MOVE, this.shape, p(t)), this.shape.draggedPoint) {
      n.emit(h.POINT_DRAG_MOVE, this.shape, { point: this.shape.draggedPoint }), this.shape.draggedPoint.mousemove(t);
      return;
    }
    if (!this.shape.options.canDragShape)
      return;
    const [s, i] = this.calcMovementOffset(t);
    if (s === null || i === null)
      return;
    const o = this.shape.getPosition(!0);
    this.shape.moveBy(s, i), this.shape.redraw();
    const r = this.shape.getPosition(!0);
    n.emit(h.SHAPE_MOVE, this.shape, p(t, { oldPos: o, newPos: r }));
  }, this.mouseenter = (t) => {
    n.emit(h.SHAPE_MOUSE_ENTER, this.shape, p(t));
  }, this.mouseover = (t) => {
    O.draggedShape !== this.shape && n.emit(h.SHAPE_MOUSE_OVER, this.shape, p(t));
  }, this.mouseout = (t) => {
    n.emit(h.SHAPE_MOUSE_OUT, this.shape, p(t));
  }, this.click = (t) => {
    n.emit(h.SHAPE_MOUSE_CLICK, this.shape, p(t));
  }, this.doubleclick = (t) => {
    n.emit(h.SHAPE_MOUSE_DOUBLE_CLICK, this.shape, p(t));
  }, this.calcMovementOffset = (t) => {
    this.shape.calcPosition();
    const s = this.shape.getPosition(!0);
    let i = t.movementX, o = t.movementY, r = t.clientX + window.scrollX, u = t.clientY + window.scrollY;
    const l = s.left + i, a = s.top + o, d = L(this.shape.root, !0), E = this.shape.getBounds();
    return l < E.left || l + s.width > E.right ? [null, null] : a < E.top || a + s.height > E.bottom ? [null, null] : (r < l + d.left && (i = r - (l + d.left)), u < a + d.top && (o = u - (a + d.top)), r > l + s.width + d.left && (i = r - (s.width + d.left + s.left)), u > a + s.height + d.right && (o = u - (s.height + d.top + s.top)), [i, o]);
  }, this.onPointAdded = (t) => {
    !this.shape.isShapePoint(t.target) || this.checkCanDeletePoints();
  }, this.checkCanDeletePoints = () => {
    this.shape.points.find((t) => t.options.canDelete === !0) && (this.nocontextmenu = this.shape.root.addEventListener("contextmenu", (t) => t.preventDefault()));
  }, this.onPointDragMove = (t) => {
    this.shape.isShapePoint(t.target) && this.shape.redraw();
  }, this.onPointDestroyed = (t) => {
    !this.shape.isShapePoint(t.target) || (this.shape.points.splice(this.shape.points.indexOf(t.target), 1), this.shape.root.removeChild(t.target.element), this.shape.redraw());
  }, this.addEventListener = (t, s) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const i = n.subscribe(t, (o) => {
      o.target && o.target.guid === this.shape.guid && s(o);
    });
    return this.subscriptions[t].push(i), i;
  }, this.removeEventListener = (t, s) => {
    this.subscriptions[t].splice(this.subscriptions[t].indexOf(s), 1), n.unsubscribe(t, s);
  }, this.destroy = () => {
    n.unsubscribe(A.POINT_ADDED, this.onPointAdded), n.unsubscribe(A.POINT_DRAG_MOVE, this.onPointDragMove), n.unsubscribe(A.POINT_DESTROYED, this.onPointDestroyed), this.shape.resizeBox && (this.shape.resizeBox.removeEventListener(P.RESIZE_BOX_RESIZE, this.resizeBoxListener), this.shape.resizeBox.removeEventListener(h.SHAPE_MOUSE_CLICK, this.resizeClickEventListener), this.shape.resizeBox.removeEventListener(h.SHAPE_MOUSE_MOVE, this.resizeMouseMoveEventListener), this.shape.resizeBox.removeEventListener(h.SHAPE_MOVE_START, this.resizeMouseDownEventListener), this.shape.resizeBox.removeEventListener(h.SHAPE_MOUSE_UP, this.resizeMouseUpEventListener), this.shape.resizeBox.removeEventListener(h.SHAPE_MOUSE_DOUBLE_CLICK, this.resizeDblClickEventListener), this.shape.resizeBox.removeEventListener(h.SHAPE_MOUSE_OVER, this.resizeMouseOverEventListener), this.shape.resizeBox.removeEventListener(h.SHAPE_MOUSE_OUT, this.resizeMouseOutEventListener)), this.shape.rotateBox && (this.shape.rotateBox.removeEventListener(v.ROTATE_BOX_ROTATE, this.rotateBoxListener), this.shape.rotateBox.removeEventListener(h.SHAPE_MOUSE_CLICK, this.rotateClickEventListener), this.shape.rotateBox.removeEventListener(h.SHAPE_MOUSE_MOVE, this.rotateMouseMoveEventListener), this.shape.rotateBox.removeEventListener(h.SHAPE_MOVE_START, this.rotateMouseDownEventListener), this.shape.rotateBox.removeEventListener(h.SHAPE_MOVE_START, this.rotatePointDragStartEventListener), this.shape.rotateBox.removeEventListener(h.SHAPE_MOVE_START, this.rotatePointDragEndEventListener), this.shape.rotateBox.removeEventListener(h.SHAPE_MOUSE_UP, this.rotateMouseUpEventListener), this.shape.rotateBox.removeEventListener(h.SHAPE_MOUSE_DOUBLE_CLICK, this.rotateDblClickEventListener), this.shape.rotateBox.removeEventListener(h.SHAPE_MOUSE_OVER, this.rotateMouseOverEventListener), this.shape.rotateBox.removeEventListener(h.SHAPE_MOUSE_OUT, this.rotateMouseOutEventListener));
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((i) => n.unsubscribe(t, i)), this.subscriptions[t] = [];
  };
}
const h = {
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
  SHAPE_ROTATE: "rotate"
};
function Q() {
  this.draw = (e) => {
    if (e.points.length < 1)
      return;
    if (e.svg)
      try {
        e.svg.innerHTML = "";
      } catch {
      }
    else
      e.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), e.svg.ondragstart = function() {
        return !1;
      }, e.eventListener.setSvgEventListeners(), e.root.appendChild(e.svg);
    this.updateOptions(e);
    const t = this.drawPolygon(e);
    e.svg.appendChild(t);
  }, this.updateOptions = (e) => {
    if (!e.svg || typeof e.svg > "u")
      return;
    typeof e.options.visible < "u" && (e.svg.style.display = e.options.visible ? "" : "none"), e.calcPosition(), e.svg.id = e.options.id, e.svg.style.position = "absolute", e.svg.style.cursor = "default", e.svg.style.left = e.left, e.svg.style.top = e.top, e.svg.setAttribute("width", e.width), e.svg.setAttribute("height", e.height), this.setupShapeFill(e), this.setupSVGFilters(e), e.svg.style.zIndex = e.options.zIndex, e.points.forEach((s) => {
      s.options.zIndex < e.options.zIndex + 2 && (s.options.zIndex = e.options.zIndex + 2), e.options.visible || (s.options.visible = !1), s.redraw(), e.options.displayMode === g.DEFAULT && !s.options.forceDisplay && (s.element.style.display = "none");
    });
    let t = e.getRootParent();
    this.redrawResizeBox(t || e), this.redrawRotateBox(t || e);
  }, this.drawPolygon = (e) => {
    let t = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    e.points.length > 2 && (t = document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
    const s = e.points.map((i) => "" + (i.x - e.left) + "," + (i.y - e.top)).join(" ");
    return t.setAttribute("points", s), this.setupPolygonStroke(e, t), this.setupPolygonFill(e, t), this.setupPolygonStyles(e, t), e.svg.querySelector("defs") && e.svg.querySelector("defs").querySelector("filter") && (t.style.filter = 'url("#' + e.guid + '_filter")'), t.style.zIndex = e.options.zIndex, t;
  }, this.redrawResizeBox = (e) => {
    if (!e.resizeBox)
      return;
    const t = e.getResizeBoxBounds();
    e.resizeBox.left = t.left, e.resizeBox.top = t.top, e.resizeBox.width = t.width, e.resizeBox.height = t.height, e.resizeBox.shape.options.zIndex = e.options.zIndex + 1, e.resizeBox.redraw();
  }, this.redrawRotateBox = (e) => {
    if (!e.rotateBox)
      return;
    const t = e.getResizeBoxBounds();
    e.rotateBox.left = t.left, e.rotateBox.top = t.top, e.rotateBox.width = t.width, e.rotateBox.height = t.height, e.rotateBox.shape.options.zIndex = e.options.zIndex + 1, e.rotateBox.redraw();
  }, this.setupShapeFill = (e) => {
    if (e.options.fillImage && typeof e.options.fillImage == "object") {
      const t = document.createElementNS(e.svg.namespaceURI, "defs"), s = this.createImageFill(e);
      s && t.appendChild(s), e.svg.appendChild(t);
    } else if (e.options.fillGradient && typeof e.options.fillGradient == "object" && ["linear", "radial"].indexOf(e.options.fillGradient.type) !== -1) {
      const t = document.createElementNS(e.svg.namespaceURI, "defs"), s = this.createGradient(e);
      t.appendChild(s), e.svg.appendChild(t);
    }
  }, this.createGradient = (e) => {
    let t = document.createElementNS(e.svg.namespaceURI, "linearGradient");
    const s = e.options.fillGradient;
    s.type === "radial" && (t = document.createElementNS(e.svg.namespaceURI, "radialGradient")), t.id = e.guid + "_gradient";
    let i = !1;
    for (let o in s)
      if (o !== "type") {
        if (o === "steps") {
          i = !0;
          continue;
        }
        t.setAttribute(o, s[o]);
      }
    if (!i)
      return t;
    for (let o of s.steps) {
      const r = document.createElementNS(e.svg.namespaceURI, "stop");
      _(o.stopColor) && r.setAttribute("offset", o.offset), _(o.stopColor) && r.setAttribute("stop-color", o.stopColor), _(o.stopOpacity) && r.setAttribute("stop-opacity", o.stopOpacity), t.appendChild(r);
    }
    return t;
  }, this.createImageFill = (e) => {
    const t = e.options.fillImage;
    if (!t.href || !t.width || !t.height)
      return console.error("Image HREF, width and height must be specified for Image Fill"), null;
    const s = document.createElementNS(e.svg.namespaceURI, "pattern");
    s.setAttribute("id", e.guid + "_pattern"), s.setAttribute("patternUnits", "userSpaceOnUse");
    for (let o in t)
      o !== "href" && s.setAttribute(o, t[o]);
    const i = document.createElementNS(e.svg.namespaceURI, "image");
    return i.setAttribute("href", t.href), i.setAttribute("width", t.width), i.setAttribute("height", t.height), s.appendChild(i), s;
  }, this.setupSVGFilters = (e) => {
    if (e.options.filters && typeof e.options.filters == "object" && Object.keys(e.options.filters).length) {
      let t = e.svg.querySelector("defs");
      t || (t = document.createElementNS(e.svg.namespaceURI, "defs"), e.svg.appendChild(t));
      const s = this.createSVGFilters(e);
      t.append(s);
    }
  }, this.createSVGFilters = (e) => {
    const t = document.createElementNS(e.svg.namespaceURI, "filter");
    t.setAttribute("id", e.guid + "_filter");
    for (let s in e.options.filters) {
      const i = this.createSVGFilter(e, s, e.options.filters[s]);
      t.appendChild(i);
    }
    return t;
  }, this.createSVGFilter = (e, t, s) => {
    const i = document.createElementNS(e.svg.namespaceURI, t);
    for (let o in s)
      i.setAttribute(o, s[o].toString()), o === "dx" && e.svg.setAttribute("width", e.width + parseInt(s.dx) * 2), o === "dy" && e.svg.setAttribute("height", e.height + parseInt(s.dy) * 2);
    return i;
  }, this.setupPolygonStroke = (e, t) => {
    _(e.options.stroke) && t.setAttribute("stroke", e.options.stroke), _(e.options.strokeWidth) && t.setAttribute("stroke-width", e.options.strokeWidth), _(e.options.strokeLinecap) && t.setAttribute("stroke-linecap", e.options.strokeLinecap), _(e.options.strokeDasharray) && t.setAttribute("stroke-dasharray", e.options.strokeDasharray);
  }, this.setupPolygonFill = (e, t) => {
    e.options.fillImage && typeof e.options.fillImage == "object" ? t.setAttribute("fill", 'url("#' + e.guid + '_pattern")') : e.options.fillGradient && typeof e.options.fillGradient == "object" && ["linear", "radial"].indexOf(e.options.fillGradient.type) !== -1 ? t.setAttribute("fill", 'url("#' + e.guid + '_gradient")') : e.options.fill && t.setAttribute("fill", e.options.fill), _(e.options.fillOpacity) && t.setAttribute("fill-opacity", e.options.fillOpacity);
  }, this.setupPolygonStyles = (e, t) => {
    if (e.options.classes && t.setAttribute("class", e.options.classes), _(e.options.style) && typeof e.options.style == "object")
      for (let s in e.options.style)
        t.style[s] = e.options.style[s];
  }, this.toSvg = (e) => {
    const t = document.createElement("div"), s = document.createElementNS("http://www.w3.org/2000/svg", "svg"), i = e.getPosition(!0);
    s.appendChild(this.getSvgDefs(e)), this.addSvgPolygons(e, s), s.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const o = "0 0 " + i.width + " " + i.height;
    return s.setAttribute("viewBox", o), t.appendChild(s), '<?xml version="1.0" encoding="UTF-8"?>' + t.innerHTML.replace(/&quot;/g, "'");
  }, this.getSvgDefs = (e) => {
    const t = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    if (e.svg) {
      const s = e.svg.querySelector("defs");
      s && (t.innerHTML = s.innerHTML);
    }
    return e.getChildren(!0).forEach((s) => {
      const i = s.svg.querySelector("defs");
      i && (t.innerHTML += i.innerHTML);
    }), t;
  }, this.addSvgPolygons = (e, t) => {
    const s = e.getPosition(!0);
    if (e.svg) {
      let i = e.svg.querySelector("polygon");
      if (i) {
        i = i.cloneNode();
        const o = e.points.map(
          (r) => "" + (r.x - s.left) + "," + (r.y - s.top)
        ).join(" ");
        i.setAttribute("points", o), t.appendChild(i);
      }
    }
    e.getChildren(!0).forEach((i) => {
      let o = i.svg.querySelector("polygon");
      if (o) {
        o = o.cloneNode();
        const r = i.points.map(
          (u) => "" + (u.x - s.left) + "," + (u.y - s.top)
        ).join(" ");
        o.setAttribute("points", r), t.appendChild(o);
      }
    });
  }, this.toPng = (e, t = R.DATAURL, s = null, i = null) => new Promise((o) => {
    const r = e.getPosition(!0);
    [s, i] = U(s, i, r.width, r.height), e.scaleTo(s, i);
    const u = this.toSvg(e);
    e.scaleTo(r.width, r.height);
    const l = new Image(), a = new Blob([u], { type: "image/svg+xml" }), d = window.URL || window.webkitURL || window, E = d.createObjectURL(a);
    l.addEventListener("load", () => {
      const f = document.createElement("canvas");
      l.width = s, l.height = i, f.width = l.width, f.height = l.height, f.getContext("2d").drawImage(l, 0, 0), d.revokeObjectURL(E);
      const b = f.toDataURL("image/png");
      if (t === R.BLOB) {
        o(j(b));
        return;
      }
      o(b);
    }), l.src = E;
  });
}
const R = {
  DATAURL: "dataurl",
  BLOB: "blob"
}, m = new Q();
function X() {
  this.shapes = [], this.activeShape = null, this.draggedShape = null, this.shapeOnCursor = null, this.containerEventListeners = [], this.init = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    n.subscribe(h.SHAPE_CREATE, this.onShapeCreated), n.subscribe(h.SHAPE_DESTROY, this.onShapeDestroy), n.subscribe(h.SHAPE_MOVE_START, this.onShapeMoveStart), n.subscribe(h.SHAPE_MOUSE_ENTER, this.onShapeMouseEnter), n.subscribe(A.POINT_DRAG_START, this.onPointDragStart), n.subscribe(A.POINT_DRAG_END, this.onPointDragEnd), window.addEventListener("resize", this.onWindowResize);
  }, this.onWindowResize = (e) => {
    this.shapes.forEach((t) => {
      n.emit(
        y.CONTAINER_BOUNDS_CHANGED,
        t,
        { bounds: t.getBounds(), points: t.points }
      );
    });
  }, this.onShapeCreated = (e) => {
    const t = e.target;
    _(t.root) && !this.getShape(t) && (this.shapes.push(t), this.activeShape || (this.activeShape = t), this.getShapesByContainer(t.root).length === 1 && this.addContainerEvents(t));
  }, this.onShapeDestroy = (e) => {
    const t = e.target, s = t.root;
    !_(t.root) || !this.getShape(t) || (this.shapes.splice(this.shapes.indexOf(t), 1), this.getShapesByContainer(s).length === 0 && this.containerEventListeners.filter((i) => i.container === s).forEach((i) => {
      i.container.removeEventListener(i.name, i.listener), this.containerEventListeners.splice(this.containerEventListeners.indexOf(i), 1);
    }));
  }, this.onShapeMoveStart = (e) => {
    if (!this.getShapeByGuid(e.target.guid) || !e.target.options.managed)
      return;
    const t = e.target.getRootParent();
    t ? (this.activateShape(t), this.draggedShape = t) : (this.activateShape(e.target), this.draggedShape = e.target);
  }, this.onShapeMouseEnter = (e) => {
    !this.draggedShape || e.buttons !== 1 && (this.draggedShape.draggedPoint = null, this.draggedShape = null);
  }, this.onPointDragStart = (e) => {
    const t = this.findShapeByPoint(e.target);
    if (t) {
      this.draggedShape = t;
      const s = t.getRootParent();
      s && (this.draggedShape = s), this.draggedShape.draggedPoint = e.target, n.emit(h.POINT_DRAG_START, t, { point: e.target });
    }
  }, this.onPointDragEnd = (e) => {
    this.draggedShape && (this.draggedShape.draggedPoint = null), this.draggedShape = null;
  }, this.findShapeByPoint = (e) => {
    for (let t of this.shapes)
      if (t.isShapePoint(e))
        return t;
    return null;
  }, this.getShape = (e) => this.getShapeByGuid(e.guid), this.getShapeByGuid = (e) => this.shapes.find((t) => t.guid === e), this.getShapesByContainer = (e) => this.shapes.filter((t) => t.root === e), this.getMaxZIndex = (e = null) => {
    let t = this.shapes;
    return e && (t = this.getShapesByContainer(e)), t = t.filter((s) => s.options.id.search("_resizebox") === -1 && s.options.id.search("_rotatebox") === -1), t.length ? t.map((s) => s.options.zIndex || 0).reduce((s, i) => i > s ? i : s) : 0;
  }, this.activateShape = (e) => {
    if (this.activeShape === e) {
      this.activeShape.switchDisplayMode();
      return;
    }
    if (typeof e.id < "u" && (e.id.search("_resizebox") !== -1 || e.id.search("_rotatebox") !== -1))
      return;
    this.activeShape && this.deactivateShape(this.activeShape);
    const s = this.getMaxZIndex(e.root) + 1 - e.options.zIndex;
    e.options.prevZIndex = e.options.zIndex, e.options.zIndex += s, m.updateOptions(e), e.getChildren(!0).forEach((i) => {
      i.options.prevZIndex = i.options.zIndex, i.options.zIndex += s, m.updateOptions(i);
    }), this.activeShape = e, this.activeShape.switchDisplayMode();
  }, this.deactivateShape = (e) => {
    typeof e.options.prevZIndex < "u" && (e.options.zIndex = e.options.prevZIndex, m.updateOptions(e)), e.options.displayMode !== g.DEFAULT && e.switchDisplayMode(g.DEFAULT), e.getChildren(!0).forEach((t) => {
      typeof t.options.prevZIndex < "u" && (t.options.zIndex = t.options.prevZIndex, m.updateOptions(t), t.options.displayMode !== g.DEFAULT && t.switchDisplayMode(g.DEFAULT));
    });
  }, this.addContainerEvents = (e) => {
    this.addContainerEvent(e.root, "mousemove", this.mousemove), this.addContainerEvent(e.root, "mouseup", this.mouseup, e.options.id), this.addContainerEvent(e.root, "dblclick", this.doubleclick), this.checkCanDeletePoints(e), n.emit(Y.MANAGER_ADD_CONTAINER_EVENT_LISTENERS, e.root);
  }, this.addContainerEvent = (e, t, s) => {
    this.containerEventListeners.find((i) => i.container === e && i.name === t) || (e.addEventListener(t, s), this.containerEventListeners.push({ id: e.id, container: e, name: t, listener: s }));
  }, this.doubleclick = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.doubleclick(p(e, { target: this.shapeOnCursor }));
    try {
      e.stopPropagation();
    } catch {
    }
    !this.activeShape || this.activeShape.options.canAddPoints && !this.activeShape.draggedPoint && (this.activeShape.options.maxPoints === -1 || this.activeShape.points.length < this.activeShape.options.maxPoints) && this.activeShape.addPoint(
      e.clientX - this.activeShape.root.offsetLeft + window.scrollX,
      e.clientY - this.activeShape.root.offsetTop + window.scrollY,
      { forceDisplay: !0 }
    );
  }, this.mousedown = (e) => {
    if (this.shapeOnCursor) {
      const t = this.shapeOnCursor.getRootParent();
      t && (this.shapeOnCursor = t), this.draggedShape = this.shapeOnCursor, this.shapeOnCursor.eventListener.mousedown(p(e, { target: this.shapeOnCursor }));
    }
  }, this.mouseup = (e) => {
    if (!this.draggedShape)
      return;
    const t = this.draggedShape;
    e.buttons === 1 && t.options.canAddPoints && !t.draggedPoint && (t.options.maxPoints === -1 || t.points.length < t.options.maxPoints) && t.addPoint(
      e.clientX - t.root.offsetLeft,
      e.clientY - t.root.offsetTop
    ), t.draggedPoint ? (n.emit(h.POINT_DRAG_END, this.draggedShape, { point: t.draggedPoint }), t.draggedPoint.mouseup(e), t.draggedPoint = null) : n.emit(h.SHAPE_MOUSE_UP, t, {}), this.draggedShape = null, n.emit(h.SHAPE_MOVE_END, t, { pos: t.getPosition(!0) });
  }, this.mousemove = (e) => {
    if (e.buttons !== 1 && (this.draggedShape = null), this.draggedShape) {
      if (e.buttons !== 1) {
        this.draggedShape.draggedPoint = null, this.draggedShape = null;
        return;
      }
      this.draggedShape.eventListener.mousemove(e);
    } else
      this.processShapesUnderCursor(e);
  }, this.mouseover = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseover(p(e, { target: this.shapeOnCursor }));
  }, this.mouseenter = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseenter(p(e, { target: this.shapeOnCursor }));
  }, this.mouseout = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseout(p(e, { target: e.target }));
  }, this.click = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.click(p(e, { target: this.shapeOnCursor }));
  }, this.processShapesUnderCursor = (e) => {
    const [t, s] = [e.clientX, e.clientY], i = this.getShapeOnCursor(t, s);
    this.shapeOnCursor && this.shapeOnCursor !== i && this.shapeOnCursor.svg && (this.shapeOnCursor.svg.style.cursor = "default", this.shapeOnCursor.eventListener.mouseout(p(e, { target: this.shapeOnCursor }))), i && i !== this.shapeOnCursor && i.eventListener.mouseover(p(e, { target: i })), this.shapeOnCursor = i, this.shapeOnCursor && (n.emit(h.SHAPE_MOUSE_MOVE, this.shapeOnCursor, p(e)), this.shapeOnCursor.svg.style.cursor = "crosshair");
  }, this.getShapeOnCursor = (e, t) => {
    const s = this.shapes.filter((i) => i.belongsToShape(e, t) && i.options.id.search("_resizebox") === -1 && i.options.id.search("_rotatebox") === -1);
    return s.length ? s.reduce((i, o) => o.options.zIndex >= i.options.zIndex ? o : i) : null;
  }, this.checkCanDeletePoints = (e) => {
    e.points.find((t) => t.options.canDelete === !0) && this.addContainerEvent(e.root, "contextmenu", (t) => t.preventDefault());
  }, this.clear = () => {
    this.containerEventListeners.forEach(({ container: e, name: t, listener: s }) => {
      try {
        e.removeEventListener(t, s);
      } catch (i) {
        console.error(i);
      }
    }), this.containerEventListeners = [], this.shapes = [];
  };
}
const Y = {
  MANAGER_ADD_CONTAINER_EVENT_LISTENERS: "manager_add_container_event_listeners",
  MANAGER_REMOVE_CONTAINER_EVENT_LISTENERS: "manager_remove_container_event_listeners"
}, y = {
  CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
}, O = new X().init();
function q(e) {
  this.shape = e, this.children = [], this.parent = {}, this.init = () => {
    for (let t in this)
      typeof this[t] != "function" || t === "init" || (typeof this.shape[t] == "function" && (this.parent[t] = this.shape[t]), this.shape[t] = this[t]);
    return this;
  }, this.addChild = (t) => {
    !this.shouldAddChild(t) || this.children.push(t);
  }, this.removeChild = (t) => {
    this.children.splice(this.children.indexOf(t), 1);
  }, this.getChildren = (t = !1) => {
    if (!t)
      return this.children;
    const s = [];
    s.push(...this.children);
    for (let i of s)
      s.push(...i.getChildren());
    return s;
  }, this.shouldAddChild = (t) => !t || typeof t != "object" || typeof t.getChildren > "u" || this.children.indexOf(t) !== -1 ? !1 : t === this.shape ? void 0 : t.getChildren().indexOf(this.shape) !== -1 || t.getParent() ? !1 : this.getParentsList().indexOf(t) === -1, this.getParent = () => {
    const t = O.shapes;
    for (let s of t)
      if (s.getChildren().indexOf(this.shape) !== -1)
        return s;
    return null;
  }, this.getRootParent = () => {
    const t = this.getParentsList();
    return t.length ? t[t.length - 1] : null;
  }, this.getParentsList = (t = []) => {
    const s = this.getParent();
    return s == null ? t : (t.push(s), s.getParentsList(t));
  }, this.getPosition = (t = !1) => {
    const s = this.parent.getPosition();
    if (!t)
      return s;
    let i = this.getChildren(!0);
    return i.push(this.shape), i = i.filter((o) => o.points.length), i.length && (s.left = i.map((o) => o.left).reduce((o, r) => r < o ? r : o), s.top = i.map((o) => o.top).reduce((o, r) => r < o ? r : o), s.right = i.map((o) => o.right).reduce((o, r) => r > o ? r : o), s.bottom = i.map((o) => o.bottom).reduce((o, r) => r > o ? r : o), s.width = s.right - s.left || 1, s.height = s.bottom - s.top || 1), s;
  };
}
const $ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECcZZuWhdAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlZBBEsAgCAMT/v/n7akzWAFtTo5mQ8SAJtkGcL4LXcg211A2L+eq3jc5C/AGTUBZ7wYAHH+B4yIAv8a8dkvilLz9qXuYKseU2E7qDFODqIwTIEkPSldAAa0WlbUAAAAASUVORK5CYII=", tt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECgYlnqNLQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABZSURBVCjPlZFBCgAxCANN/v/n2VOhiFU3N4U4GgXELUkAikbOhlhIh1QZXkR3hGc/IsaVMtHT0RXR3e5jescIqBpy05T/tInffw2AvEkr972N+a69+U8e8AGOtEABr4X+4AAAAABJRU5ErkJggg==", et = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECkWaNmRawAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABjSURBVCjPlZBRDsAgCENbsnt6/1N0P2ocijASEy08iqC1BknhASCvsSeOQXImJXHcrQL4t1UAr4fjReDmdCsc/5LEZ7NOwOlUKVy3RwC/AAAwL2TAZ3t+xFszOxVl7lbtvsYLOtlZCOj2NccAAAAASUVORK5CYII=", st = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECoXNPPyPgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlVFBEgAhCAL+/2f21I5jqcXFGRMSpG1EkLRtooEyIdaRlAc7orqBsg+gVKy8yTYn49vqMb0pgCUuPOBP93Sniaxb8/FdL6mt/rZe5SMKXQWRf/4AYrs6C0ViuwUAAAAASUVORK5CYII=", it = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDsHep3BSgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA8SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCAZy0h4AXLILDAEWNOwAAAAASUVORK5CYII=", ot = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDMMJZaSygAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA/SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCJxAWZoFp1MBY8cLTv/x72kAAAAASUVORK5CYII=", ht = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQARsznxFAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", nt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQEbSvcpSwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA3SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTCICjCTbxPJfsIWSv+JECM9nugHAG40DyW1OoLPAAAAAElFTkSuQmCC", rt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDIpd4l3zAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", at = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDYr/evT5AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", pt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDUsSKIVhAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA0SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTBQZBPJfsIWSv+JECM9nugHADv6Dv2P6G4ZAAAAAElFTkSuQmCC", dt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDQQftZYQgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==";
function z() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = M(), this.options = {
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
  }, this.eventListener = null, this.left_top = null, this.left_bottom = null, this.right_top = null, this.right_bottom = null, this.init = (e, t, s, i, o, r = {}) => (this.left = parseInt(t), this.top = parseInt(s), this.width = parseInt(i), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(r), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new D().init(e, Object.assign({}, this.options.shapeOptions), []), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new W(this).run(), this.redraw(), n.emit(h.SHAPE_CREATE, this, {}), this), this.setOptions = (e = {}) => {
    !e || typeof e != "object" || (e.shapeOptions && typeof e.shapeOptions == "object" ? (e.shapeOptions.pointOptions && typeof e.shapeOptions.pointOptions == "object" ? e.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions, e.shapeOptions.pointOptions) : e.shapeOptions.pointOptions = Object.assign({}, this.options.shapeOptions.pointOptions), e.shapeOptions = Object.assign(this.options.shapeOptions, e.shapeOptions)) : e.shapeOptions = Object.assign({}, this.options.shapeOptions), e.shapeOptions.zIndex = e.zIndex || this.options.zIndex, e.shapeOptions.id = e.id ? e.id : this.options.id, Object.assign(this.options, e), this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + $ + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + tt + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + et + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + st + "')" } });
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
    n.emit(h.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (e, t) => this.eventListener.addEventListener(e, t), this.removeEventListener = (e, t) => {
    this.eventListener.removeEventListener(e, t);
  };
}
function D() {
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
    displayMode: g.DEFAULT,
    managed: !0
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = M(), this.resizeBox = null, this.rotateBox = null, this.initCenter = null, this.init = (e, t = null, s = null) => {
    if (!e) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    if (O.getShape(this)) {
      console.error("This shape already initialized");
      return;
    }
    return this.root = e, this.root.style.position = "relative", this.setOptions(t), this.eventListener = new Z(this), this.groupHelper = new q(this).init(), this.setupPoints(s, Object.assign({}, this.options.pointOptions)), this.eventListener.run(), this.applyDisplayMode(), n.emit(h.SHAPE_CREATE, this, {}), this;
  }, this.setOptions = (e) => {
    !e || typeof e != "object" || (e.pointOptions = S(this.options.pointOptions, e.pointOptions), e.style = S(this.options.style, e.style), e.bounds = S(this.options.bounds, e.bounds), _(e.visible) && e.visible !== this.options.visible && (this.points.forEach((t) => t.options.visible = e.visible), this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: e.visible } }), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: e.visible } })), this.options = S(this.options, e), this.points.forEach((t) => {
      t.setOptions(S({}, this.options.pointOptions)), t.options.bounds = this.getBounds(), t.options.zIndex <= this.options.zIndex && (t.options.zIndex = this.options.zIndex + 1), t.redraw();
    }));
  }, this.setupPoints = (e, t) => {
    e && typeof e == "object" && (this.points = [], this.addPoints(e, Object.assign({}, t)));
  }, this.addPoint = (e, t, s = null) => {
    const i = this.putPoint(e, t, Object.assign({}, s));
    return this.redraw(), i;
  }, this.addPoints = (e, t = null) => {
    !e || typeof e != "object" || (e.forEach(
      (s) => this.putPoint(s[0] + this.options.offsetX, s[1] + this.options.offsetY, Object.assign({}, t))
    ), this.redraw());
  }, this.putPoint = (e, t, s = null) => {
    if (this.findPoint(e, t))
      return console.error(`Point with x=${e} and y=${t} already exists`), null;
    !s || !Object.keys(s).length ? s = Object.assign({}, this.options.pointOptions) || {} : s = S(Object.assign({}, this.options.pointOptions), s), s.bounds = this.getBounds(), s.zIndex = this.options.zIndex + 1;
    const i = new F();
    return this.points.push(i), i.init(e, t, s), this.root.appendChild(i.element), i;
  }, this.deleteAllPoints = () => {
    for (; this.points.length; )
      this.points[0].destroy();
  }, this.deletePoint = (e, t) => {
    const s = this.findPoint(e, t);
    s && s.destroy();
  }, this.findPoint = (e, t) => {
    const s = this.points.find((i) => i.x === e && i.y === t);
    return typeof s > "u" || !s ? null : s;
  }, this.findPointById = (e) => {
    const t = this.points.find((s) => s.options.id === e);
    return typeof t > "u" || !t ? null : t;
  }, this.getPointsArray = () => {
    let e = [];
    return this.points && typeof this.points == "object" && this.points.length && (e = this.points.map((t) => [t.x, t.y])), e;
  }, this.moveTo = (e, t, s = !0) => {
    const i = this.getBounds(), o = this.getPosition(!0);
    let r = e + o.width > i.right ? i.right - o.width : e, u = t + o.height > i.bottom ? i.bottom - o.height : t;
    this.moveBy(r - o.left, u - o.top, s), this.calcPosition();
  }, this.moveBy = (e, t, s = !0) => {
    for (let o in this.points)
      this.points[o].x += e, this.points[o].y += t, s && this.points[o].redraw();
    this.calcPosition();
    const i = this.getChildren();
    s && this.redraw(), i.length && i.forEach((o) => {
      o.moveBy(e, t, s);
    });
  }, this.scaleTo = (e = null, t = null) => {
    const s = this.getBounds();
    if (this.calcPosition(), !e && !t)
      return null;
    const i = this.getPosition(!0);
    [e, t] = U(e, t, i.width, i.height), i.width >= 10 && e < 10 && (e = 10), i.height >= 10 && t < 10 && (t = 10);
    let o = i.left + e > s.right ? s.right - i.left : e, r = i.top + t > s.bottom ? s.bottom - i.top : t, u = o / i.width, l = r / i.height;
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
  }, this.rotateBy = (e, t = null, s = null, i = !1) => {
    this.calcPosition();
    const o = this.getPosition(!0);
    let [r, u] = this.getCenter(!0);
    const l = this.getRootParent();
    l && ([r, u] = l.getCenter(!0)), t || (t = r), s || (s = u), this.initCenter && ([t, s] = this.initCenter), !(i && (!this.isInBounds(...B(e, o.left, o.top, t, s)) || !this.isInBounds(...B(e, o.right, o.top, t, s)) || !this.isInBounds(...B(e, o.left, o.bottom, t, s)) || !this.isInBounds(...B(e, o.right, o.bottom, t, s)))) && (this.points.forEach((a) => a.rotateBy(e, t, s)), this.getChildren(!0).forEach((a) => {
      a.points.forEach((d) => d.rotateBy(e, t, s)), a.redraw();
    }));
  }, this.isInBounds = (e, t) => {
    const [s, i] = this.getMaxPointSize(), o = this.getBounds();
    return e >= o.left + s / 2 && e <= o.right - s / 2 && t >= o.top + i / 2 && t <= o.bottom - i / 2;
  }, this.redraw = () => {
    this.applyDisplayMode(), m.draw(this);
  }, this.applyDisplayMode = () => {
    this.options.displayMode === g.SCALE && this.options.canScale ? (this.rotateBox && this.rotateBox.hide(), !this.resizeBox && this.setupResizeBox(), this.resizeBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : this.options.displayMode === g.ROTATE && this.options.canRotate ? (this.resizeBox && this.resizeBox.hide(), !this.rotateBox && this.setupRotateBox(), this.rotateBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : (this.resizeBox && this.resizeBox.hide(), this.rotateBox && this.rotateBox.hide()), this.points.forEach((e) => {
      e.setOptions({ zIndex: this.options.zIndex + 1 }), e.element.style.zIndex = e.options.zIndex, this.options.displayMode === g.DEFAULT && !e.options.forceDisplay && (e.element.style.display = "none");
    });
  }, this.switchDisplayMode = (e = null) => {
    e || (e = this.getNextDisplayMode()), (e === g.SCALE && !this.options.canScale || e === g.ROTATE && !this.options.canRotate || e === g.SELECTED && !this.points.filter((t) => t.options.canDrag).length) && (e = g.DEFAULT), this.options.displayMode = e, this.redraw();
  }, this.getNextDisplayMode = () => {
    let e;
    return this.options.displayMode === g.DEFAULT ? e = g.SELECTED : this.options.displayMode === g.SELECTED ? e = g.SCALE : this.options.displayMode === g.SCALE ? e = g.ROTATE : e = g.DEFAULT, e === g.SELECTED && !this.points.filter((t) => t.options.canDrag).length && (e = g.SCALE), e === g.SCALE && !this.options.canScale && (e = g.ROTATE), e === g.ROTATE && !this.options.canRotate && (e = g.DEFAULT), e;
  }, this.calcPosition = () => {
    !this.points.length || (this.left = this.points.map((e) => e.x).reduce((e, t) => t < e ? t : e), this.top = this.points.map((e) => e.y).reduce((e, t) => t < e ? t : e), this.right = this.points.map((e) => e.x).reduce((e, t) => t > e ? t : e), this.bottom = this.points.map((e) => e.y).reduce((e, t) => t > e ? t : e), this.width = this.right - this.left || 1, this.height = this.bottom - this.top || 1);
  }, this.getPosition = () => ({ top: this.top, left: this.left, bottom: this.bottom, right: this.right, width: this.width, height: this.height }), this.getBounds = () => ({
    left: this.options.bounds.left !== -1 ? this.options.bounds.left : this.root.clientLeft,
    top: this.options.bounds.top !== -1 ? this.options.bounds.top : this.root.clientTop,
    right: this.options.bounds.right !== -1 ? this.options.bounds.right : this.root.clientLeft + this.root.clientWidth,
    bottom: this.options.bounds.bottom !== -1 ? this.options.bounds.bottom : this.root.clientTop + this.root.clientHeight
  }), this.isShapePoint = (e) => !!this.points.find((t) => t === e), this.belongsToShape = (e, t, s = !0) => {
    if (this.findPoint(e, t))
      return !0;
    let i = this.getPointsArray();
    return s && (i = i.map((o) => [o[0] + L(this.root).left, o[1] + L(this.root).top])), G(i, [e, t]);
  }, this.addEventListener = (e, t) => this.eventListener.addEventListener(e, t), this.removeEventListener = (e, t) => {
    this.eventListener.removeEventListener(e, t);
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.destroy = () => {
    for (; this.points.length > 0; )
      this.points[0].destroy();
    if (n.emit(h.SHAPE_DESTROY, this, {}), this.eventListener && this.eventListener.destroy(), this.resizeBox && this.resizeBox.destroy(), this.rotateBox && this.rotateBox.destroy(), this.root && this.svg)
      try {
        this.root.removeChild(this.svg);
      } catch {
      }
    this.getChildren(!0).forEach((e) => e.destroy());
  }, this.setupResizeBox = () => {
    const e = this.getResizeBoxBounds();
    this.resizeBox = new N().init(this.root, e.left, e.top, e.width, e.height, {
      zIndex: this.options.zIndex + 1,
      id: this.options.id + "_resizebox",
      shapeOptions: {
        canDragShape: !1,
        visible: this.options.visible,
        managed: !1
      }
    }), this.calcPosition(), this.eventListener.addResizeEventListener(), this.resizeBox.redraw();
  }, this.setupRotateBox = () => {
    const e = this.getResizeBoxBounds();
    this.rotateBox = new z().init(this.root, e.left, e.top, e.width, e.height, {
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
    let e = this.getPosition(!0);
    const t = this.getRootParent();
    t && (t.calcPosition(), e = t.getPosition(!0));
    const [s, i] = this.getMaxPointSize(), o = {
      left: e.left - s,
      right: e.right + s,
      top: e.top - i,
      bottom: e.bottom + i,
      width: e.width + s * 2,
      height: e.height + i * 2
    };
    o.left < 0 && (this.moveTo(o.left * -1, e.top, !1), o.left = 0), o.top < 0 && (this.moveTo(e.left, o.top * -1, !1), o.top = 0);
    const r = this.getBounds();
    return o.bottom > r.bottom && (this.moveTo(e.left, o.bottom - r.bottom + e.top, !1), o.bottom = r.bottom), o.right > r.right && (this.moveTo(o.right - r.right + e.left, e.top, !1), o.bottom = r.bottom), o;
  }, this.getMaxPointSize = () => {
    if (!this.points.length)
      return [0, 0];
    const e = this.points.map((s) => s.options.width).reduce((s, i) => Math.max(s, i)), t = this.points.map((s) => s.options.height).reduce((s, i) => Math.max(s, i));
    return [e, t];
  }, this.getCenter = (e = !1) => {
    const t = this.getPosition(e);
    return [t.left + t.width / 2, t.top + t.height / 2];
  }, this.toSvg = () => m.toSvg(this), this.toPng = (e = R.DATAURL, t = null, s = null) => m.toPng(this, e, t, s);
}
const g = {
  DEFAULT: "default",
  SELECTED: "selected",
  SCALE: "scale",
  ROTATE: "rotate"
};
function N() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = M(), this.options = {
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
  }, this.eventListener = null, this.left_top = null, this.left_center = null, this.left_bottom = null, this.center_top = null, this.center_bottom = null, this.right_top = null, this.right_center = null, this.right_bottom = null, this.init = (e, t, s, i, o, r = {}) => (this.left = parseInt(t), this.top = parseInt(s), this.width = parseInt(i), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(r), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new D().init(e, Object.assign({}, this.options.shapeOptions), []), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new J(this).run(), this.redraw(), n.emit(h.SHAPE_CREATE, this, {}), this), this.setOptions = (e = {}) => {
    !e || typeof e != "object" || (e.shapeOptions && typeof e.shapeOptions == "object" ? (e.shapeOptions.pointOptions && typeof e.shapeOptions.pointOptions == "object" ? e.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions, e.shapeOptions.pointOptions) : e.shapeOptions.pointOptions = Object.assign({}, this.options.shapeOptions.pointOptions), e.shapeOptions = Object.assign(this.options.shapeOptions, e.shapeOptions)) : e.shapeOptions = Object.assign({}, this.options.shapeOptions), e.shapeOptions.zIndex = e.zIndex || this.options.zIndex, e.shapeOptions.id = e.id ? e.id : this.options.id, Object.assign(this.options, e), this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + rt + "')" } }), this.center_top = this.shape.addPoint(this.left + this.width / 2, this.top, { id: this.shape.guid + "_center_top", style: { backgroundImage: "url('" + ot + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + dt + "')" } }), this.right_center = this.shape.addPoint(this.right, this.top + this.height / 2, { id: this.shape.guid + "_right_center", style: { backgroundImage: "url('" + pt + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + at + "')" } }), this.center_bottom = this.shape.addPoint(this.left + this.width / 2, this.bottom, { id: this.shape.guid + "_center_bottom", style: { backgroundImage: "url('" + it + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + ht + "')" } }), this.left_center = this.shape.addPoint(this.left, this.top + this.height / 2, { id: this.shape.guid + "_left_center", style: { backgroundImage: "url('" + nt + "')" } }), this.setPointsOptions();
  }, this.setPointsOptions = () => {
    this.setPointsMoveDirections(), this.setPointsMoveBounds();
  }, this.setPointsMoveDirections = () => {
    this.center_top.setOptions({ moveDirections: [c.TOP, c.BOTTOM] }), this.center_bottom.setOptions({ moveDirections: [c.TOP, c.BOTTOM] }), this.left_center.setOptions({ moveDirections: [c.LEFT, c.RIGHT] }), this.right_center.setOptions({ moveDirections: [c.LEFT, c.RIGHT] });
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
    n.emit(h.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (e, t) => this.eventListener.addEventListener(e, t), this.removeEventListener = (e, t) => {
    this.eventListener.removeEventListener(e, t);
  };
}
try {
  window.ResizeBox = N, window.SmartShape = D, window.RotateBox = z, window.SmartShapeManager = O;
} catch {
}
export {
  N as ResizeBox,
  z as RotateBox,
  D as SmartShape,
  O as SmartShapeManager
};
