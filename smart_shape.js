function V() {
  this.subscriptions = {}, this.subscribe = (t, s) => ((typeof this.subscriptions[t] > "u" || !this.subscriptions[t]) && (this.subscriptions[t] = []), typeof this.subscriptions[t].find((i) => i === s) < "u" ? null : (this.subscriptions[t].push(s), s)), this.emit = (t, s, i = null) => {
    if ((!i || typeof i != "object") && (i = {}), i.type = t, i.target = s, typeof this.subscriptions[t] < "u" && this.subscriptions[t] && this.subscriptions[t].length) {
      for (let e of this.subscriptions[t])
        e(i);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (t, s) => {
    if (typeof this.subscriptions[t] > "u" || !this.subscriptions[t])
      return !1;
    const i = this.subscriptions[t].indexOf(s);
    return i !== -1 ? (this.subscriptions[t].splice(i, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const h = new V(), N = (t) => t * (Math.PI / 180), H = (t) => t * (180 / Math.PI), v = (t, s, i, e, o) => {
  const r = N(t), d = (s - e) * Math.cos(r) - (i - o) * Math.sin(r) + e, u = (s - e) * Math.sin(r) + (i - o) * Math.cos(r) + o;
  return [d, u];
}, O = (t, s, i, e) => Math.sqrt(Math.pow(i - t, 2) + Math.pow(e - s, 2)), k = (t, s) => {
  const i = (a, p, g) => p.x <= Math.max(a.x, g.x) && p.x >= Math.min(a.x, g.x) && p.y <= Math.max(a.y, g.y) && p.y >= Math.min(a.y, g.y), e = (a, p, g) => {
    let b = (p[1] - a[1]) * (g[0] - p[0]) - (p[0] - a[0]) * (g[1] - p[1]);
    return b === 0 ? 0 : b > 0 ? 1 : 2;
  }, o = (a, p, g, b) => {
    let M = e(a, p, g), D = e(a, p, b), I = e(g, b, a), L = e(g, b, p);
    return M !== D && I !== L || M === 0 && i(a, g, p) || D === 0 && i(a, b, p) || I === 0 && i(g, a, b) ? !0 : !!(L === 0 && i(g, p, b));
  };
  if (t.length < 3)
    return !1;
  let r = [1e4, s[1]], d = 0, u = 0;
  do {
    let a = (u + 1) % t.length;
    if (o(t[u], t[a], s, r)) {
      if (e(t[u], s, t[a]) === 0)
        return i(
          t[u],
          s,
          t[a]
        );
      d++;
    }
    u = a;
  } while (u !== 0);
  return d % 2 === 1;
}, y = (t, s = !0) => {
  let i = 0, e = 0;
  if (!s)
    return { top: t.offsetTop - t.scrollTop, left: t.offsetLeft - t.scrollLeft };
  for (; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop); )
    i += t.offsetLeft - t.scrollLeft, e += t.offsetTop - t.scrollTop, t = t.offsetParent;
  return { top: e, left: i };
}, B = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
  const s = Math.random() * 16 | 0;
  return (t === "x" ? s : s & 3 | 8).toString(16);
}).replace(/-/g, ""), w = (t) => {
  try {
    t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1;
  } catch {
  }
  return !1;
}, f = (t) => typeof t < "u" && t !== null, m = (t, s) => t && typeof t == "object" && s && typeof s == "object" ? Object.assign(t, s) : t, E = (t, s = {}) => {
  const i = {};
  for (let e in t)
    e !== "type" && e !== "target" && (i[e] = t[e]);
  return Object.keys(s).forEach((e) => {
    i[e] = s[e];
  }), i;
}, G = (t) => [t.pageX, t.pageY];
function j() {
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
  }, this.x = 0, this.y = 0, this.element = null, this.guid = B(), this.subscriptions = {}, this.init = (t, s, i = null) => (this.x = parseInt(t), this.y = parseInt(s), this.element = this.createPointUI(), this.setOptions(i), this.setEventListeners(), h.emit(A.POINT_ADDED, this), this), this.setOptions = (t) => {
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
  }, this.rotateBy = (t, s, i) => {
    const [e, o] = v(t, this.x, this.y, s, i);
    this.x = e, this.y = o;
  }, this.setEventListeners = () => {
    this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown), h.subscribe(R.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange);
  }, this.mousedown = (t) => {
    t.buttons === 1 && this.options.canDrag && (h.emit(A.POINT_DRAG_START, this), w(t));
  }, this.mousemove = (t) => {
    if (h.emit(A.POINT_MOUSE_MOVE, this, E(t)), t.buttons !== 1 || !this.options.canDrag)
      return;
    const s = this.x, i = this.y, e = y(this.element.parentNode, !0);
    if (!this.checkFitBounds(this.x + t.movementX, this.y + t.movementY)) {
      h.emit(A.POINT_DRAG_MOVE, this, { oldX: s, oldY: i });
      return;
    }
    let o = t.clientX + window.scrollX - e.left - this.options.width / 2, r = t.clientY + window.scrollY - e.top - this.options.height / 2;
    [o, r] = this.applyMoveRestrictions(o, r, s, i), this.x = o, this.y = r, this.element.style.left = this.x + "px", this.element.style.top = this.y + "px", h.emit(A.POINT_DRAG_MOVE, this, { oldX: s, oldY: i });
  }, this.checkFitBounds = (t, s) => !(this.options.bounds.left !== -1 && t < this.options.bounds.left || this.options.bounds.right !== -1 && t > this.options.bounds.right || this.options.bounds.top !== -1 && s < this.options.bounds.top || this.options.bounds.bottom !== -1 && s > this.options.bounds.bottom), this.applyMoveRestrictions = (t, s, i, e) => (s > e && this.options.moveDirections.indexOf(c.BOTTOM) === -1 && (s = e), s < e && this.options.moveDirections.indexOf(c.TOP) === -1 && (s = e), t > i && this.options.moveDirections.indexOf(c.RIGHT) === -1 && (t = i), t < i && this.options.moveDirections.indexOf(c.LEFT) === -1 && (t = i), t > this.options.bounds.right && (t = this.options.bounds.right), s > this.options.bounds.bottom && (s = this.options.bounds.bottom), t < this.options.bounds.left && (t = this.options.bounds.left), s < this.options.bounds.top && (s = this.options.bounds.top), [t, s]), this.mouseup = (t) => {
    h.emit(A.POINT_DRAG_END, this), t.button === 2 && this.options.canDelete && this.destroy();
  }, this.onBoundsChange = (t) => {
    t.points.find((s) => s === this) && (this.options.bounds = t.bounds);
  }, this.destroy = () => {
    this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), h.unsubscribe(R.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange), h.emit(A.POINT_DESTROYED, this);
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((i) => h.unsubscribe(t, i)), this.subscriptions[t] = [];
  }, this.addEventListener = (t, s) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const i = h.subscribe(t, (e) => {
      e.target.guid === this.guid && s(e);
    });
    return this.subscriptions[t].push(i), i;
  }, this.removeEventListener = (t, s) => {
    this.subscriptions[t].splice(this.subscriptions[t].indexOf(s), 1), h.unsubscribe(t, s);
  }, this;
}
const A = {
  POINT_ADDED: "create",
  POINT_DESTROYED: "destroy",
  POINT_DRAG_START: "move_start",
  POINT_DRAG_MOVE: "move",
  POINT_DRAG_END: "move_end",
  POINT_MOUSE_MOVE: "mousemove"
}, c = {
  TOP: 0,
  LEFT: 1,
  RIGHT: 2,
  BOTTOM: 3
};
function F(t) {
  this.rotateBox = t, this.subscriptions = {
    rotate: []
  }, this.initialAngle = 0, this.previousAngle = 0, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    this.shapeMouseEnter = this.rotateBox.shape.addEventListener(n.SHAPE_MOUSE_ENTER, (s) => {
      setTimeout(() => {
        h.emit(n.SHAPE_MOUSE_ENTER, this.rotateBox, s);
      }, 1);
    }), this.shapeMouseMove = this.rotateBox.shape.addEventListener(n.SHAPE_MOUSE_MOVE, (s) => {
      setTimeout(() => {
        h.emit(n.SHAPE_MOUSE_MOVE, this.rotateBox, s);
      }, 1);
    }), this.shapeMoveStart = this.rotateBox.shape.addEventListener(n.SHAPE_MOVE_START, (s) => {
      setTimeout(() => {
        h.emit(n.SHAPE_MOVE_START, this.rotateBox, s);
      }, 1);
    }), this.shapeMoveEnd = this.rotateBox.shape.addEventListener(n.SHAPE_MOVE_END, (s) => {
      setTimeout(() => {
        this.previousAngle = 0, h.emit(n.SHAPE_MOVE_END, this.rotateBox, s);
      }, 1);
    }), this.shapeMove = this.rotateBox.shape.addEventListener(n.SHAPE_MOVE, (s) => {
      setTimeout(() => {
        h.emit(n.SHAPE_MOVE, this.rotateBox, s);
      }, 1);
    }), this.shapeClick = this.rotateBox.shape.addEventListener(n.SHAPE_MOUSE_CLICK, (s) => {
      setTimeout(() => {
        h.emit(n.SHAPE_MOUSE_CLICK, this.rotateBox, s);
      }, 1);
    }), this.rotateBox.shape.points.forEach((s) => {
      s.mousemove = this.mousemove, s.mouseDownListener = s.addEventListener(A.POINT_DRAG_START, (i) => {
        this.onPointMouseDown(i), setTimeout(() => {
          h.emit(n.POINT_DRAG_START, this.rotateBox, { point: s });
        }, 1);
      }), s.mouseUpListener = s.addEventListener(A.POINT_DRAG_END, (i) => {
        this.onPointMouseUp(i), setTimeout(() => {
          h.emit(n.POINT_DRAG_END, this.rotateBox, { point: s });
        }, 1);
      });
    });
  }, this.mousemove = (s) => {
    if (s.buttons !== 1) {
      this.rotateBox.shape.root.draggedShape && (this.rotateBox.shape.root.draggedShape.draggedPoint = null, this.rotateBox.shape.root.draggedShape = null), h.emit(n.SHAPE_MOUSE_MOVE, this.rotateBox.shape, { clientX: s.clientX, clientY: s.clientY });
      return;
    }
    const [i, e] = G(s), [o, r] = this.rotateBox.shape.getCenter();
    let d = this.calcAngle(i, e, o, r);
    if (d === null)
      return;
    let u = d;
    this.previousAngle && (u -= this.previousAngle), this.previousAngle = d, h.emit(P.ROTATE_BOX_ROTATE, this.rotateBox, { angle: u });
  }, this.calcAngle = (s, i, e, o) => {
    const r = this.calcHypotenuse(s, i, e, o);
    if (r <= 0)
      return null;
    const d = this.calcCathetus(s, i, e, o), u = this.calcStartAngle(s, i, e, o);
    return Math.round(H(Math.asin(d / r)) + u + this.initialAngle);
  }, this.calcHypotenuse = (s, i, e, o) => O(s, i, e, o), this.calcCathetus = (s, i, e, o) => {
    if (s <= e && i <= o)
      return O(s, i, s, o);
    if (s > e && i < o)
      return O(s, i, e, i);
    if (s > e && i > o)
      return O(s, i, s, o);
    if (s < e && i > o)
      return O(s, i, e, i);
  }, this.calcStartAngle = (s, i, e, o) => {
    if (s <= e && i <= o)
      return 0;
    if (s > e && i < o)
      return 90;
    if (s > e && i > o)
      return 180;
    if (s < e && i > o)
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
    this.rotateBox.shape.points.forEach((i) => i.setOptions({ visible: !1 }));
  }, this.onPointMouseUp = (s) => {
    this.rotateBox.shape.points.forEach((i) => {
      i.setOptions({ visible: !0 }), i.redraw();
    });
  }, this.addEventListener = (s, i) => {
    typeof this.subscriptions[s] > "u" && (this.subscriptions[s] = []);
    const e = h.subscribe(s, (o) => {
      o.target.shape && o.target.shape.guid === this.rotateBox.shape.guid && i(o);
    });
    return this.subscriptions[s].push(e), e;
  }, this.removeEventListener = (s, i) => {
    this.subscriptions[s].splice(this.subscriptions[s].indexOf(i), 1), h.unsubscribe(s, i);
  }, this.destroy = () => {
    for (let s in this.subscriptions)
      this.subscriptions[s].forEach((e) => h.unsubscribe(s, e)), this.subscriptions[s] = [];
    this.rotateBox.shape.removeEventListener(n.SHAPE_MOVE_START, this.shapeMoveStart), this.rotateBox.shape.removeEventListener(n.SHAPE_MOVE, this.shapeMove), this.rotateBox.shape.removeEventListener(n.SHAPE_MOVE_END, this.shapeMoveEnd), this.rotateBox.shape.removeEventListener(n.SHAPE_MOUSE_ENTER, this.shapeMouseEnter), this.rotateBox.shape.removeEventListener(n.SHAPE_MOUSE_MOVE, this.shapeMouseMove), this.rotateBox.shape.removeEventListener(n.SHAPE_MOUSE_CLICK, this.shapeClick), this.rotateBox.shape.points.forEach((s) => {
      s.removeEventListener(A.POINT_DRAG_START, s.mouseDownListener), s.removeEventListener(A.POINT_DRAG_START, s.mouseUpListener);
    });
  };
}
const K = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECcZZuWhdAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlZBBEsAgCAMT/v/n7akzWAFtTo5mQ8SAJtkGcL4LXcg211A2L+eq3jc5C/AGTUBZ7wYAHH+B4yIAv8a8dkvilLz9qXuYKseU2E7qDFODqIwTIEkPSldAAa0WlbUAAAAASUVORK5CYII=", J = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECgYlnqNLQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABZSURBVCjPlZFBCgAxCANN/v/n2VOhiFU3N4U4GgXELUkAikbOhlhIh1QZXkR3hGc/IsaVMtHT0RXR3e5jescIqBpy05T/tInffw2AvEkr972N+a69+U8e8AGOtEABr4X+4AAAAABJRU5ErkJggg==", W = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECkWaNmRawAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABjSURBVCjPlZBRDsAgCENbsnt6/1N0P2ocijASEy08iqC1BknhASCvsSeOQXImJXHcrQL4t1UAr4fjReDmdCsc/5LEZ7NOwOlUKVy3RwC/AAAwL2TAZ3t+xFszOxVl7lbtvsYLOtlZCOj2NccAAAAASUVORK5CYII=", Z = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECoXNPPyPgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlVFBEgAhCAL+/2f21I5jqcXFGRMSpG1EkLRtooEyIdaRlAc7orqBsg+gVKy8yTYn49vqMb0pgCUuPOBP93Sniaxb8/FdL6mt/rZe5SMKXQWRf/4AYrs6C0ViuwUAAAAASUVORK5CYII=", Q = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDsHep3BSgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA8SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCAZy0h4AXLILDAEWNOwAAAAASUVORK5CYII=", Y = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDMMJZaSygAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA/SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCJxAWZoFp1MBY8cLTv/x72kAAAAASUVORK5CYII=", X = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQARsznxFAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", q = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQEbSvcpSwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA3SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTCICjCTbxPJfsIWSv+JECM9nugHAG40DyW1OoLPAAAAAElFTkSuQmCC", $ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDIpd4l3zAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", tt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDYr/evT5AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", st = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDUsSKIVhAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA0SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTBQZBPJfsIWSv+JECM9nugHADv6Dv2P6G4ZAAAAAElFTkSuQmCC", it = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDQQftZYQgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==";
function C() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = B(), this.options = {
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
  }, this.eventListener = null, this.left_top = null, this.left_bottom = null, this.right_top = null, this.right_bottom = null, this.init = (t, s, i, e, o, r = {}) => (this.left = parseInt(s), this.top = parseInt(i), this.width = parseInt(e), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(r), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new T().init(t, Object.assign({}, this.options.shapeOptions), []), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new F(this).run(), this.redraw(), h.emit(n.SHAPE_CREATE, this, {}), this), this.setOptions = (t = {}) => {
    !t || typeof t != "object" || (t.shapeOptions && typeof t.shapeOptions == "object" ? (t.shapeOptions.pointOptions && typeof t.shapeOptions.pointOptions == "object" ? t.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions, t.shapeOptions.pointOptions) : t.shapeOptions.pointOptions = Object.assign({}, this.options.shapeOptions.pointOptions), t.shapeOptions = Object.assign(this.options.shapeOptions, t.shapeOptions)) : t.shapeOptions = Object.assign({}, this.options.shapeOptions), t.shapeOptions.zIndex = t.zIndex || this.options.zIndex, t.shapeOptions.id = t.id ? t.id : this.options.id, Object.assign(this.options, t), this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + K + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + J + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + W + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + Z + "')" } });
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
    h.emit(n.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (t, s) => this.eventListener.addEventListener(t, s), this.removeEventListener = (t, s) => {
    this.eventListener.removeEventListener(t, s);
  };
}
const P = {
  ROTATE_BOX_ROTATE: "rotate"
};
function z(t) {
  this.shape = t, this.subscriptions = {
    CONTAINER_BOUNDS_CHANGED: []
  }, this.run = () => (this.shape = t, this.setEventListeners(), this), this.setEventListeners = () => {
    h.subscribe(A.POINT_DESTROYED, this.onPointDestroyed), h.subscribe(A.POINT_ADDED, this.onPointAdded), h.subscribe(A.POINT_DRAG_MOVE, this.onPointDragMove);
  }, this.setSvgEventListeners = () => {
    this.svg_mouseover = this.shape.svg.addEventListener("mouseover", (s) => {
      _.mouseover(s);
    }), this.svg_mouseout = this.shape.svg.addEventListener("mouseout", (s) => {
      _.mouseout(s);
    }), this.svg_mouseenter = this.shape.svg.addEventListener("mouseenter", (s) => {
      _.mouseenter(s);
    }), this.svg_mousedown = this.shape.svg.addEventListener("mousedown", (s) => {
      _.mousedown(s);
    }), this.svg_click = this.shape.svg.addEventListener("click", (s) => {
      _.click(s);
    });
  }, this.removeSvgEventListeners = () => {
    this.shape.svg.removeEventListener("mouseover", this.svg_mouseover), this.shape.svg.removeEventListener("mouseout", this.svg_mouseout), this.shape.svg.removeEventListener("mouseenter", this.svg_mouseenter), this.shape.svg.removeEventListener("mousedown", this.svg_mousedown), this.shape.svg.removeEventListener("click", this.svg_click);
  }, this.addResizeEventListener = () => {
    !this.shape.resizeBox || (this.resizeBoxListener = this.shape.resizeBox.addEventListener(S.RESIZE_BOX_RESIZE, (s) => {
      const i = this.shape.getRootParent();
      if (i) {
        h.emit(S.RESIZE_BOX_RESIZE, i.resizeBox, { newPos: s.newPos, oldPos: s.oldPos });
        return;
      }
      const e = s.newPos.left - s.oldPos.left, o = s.newPos.top - s.oldPos.top;
      this.shape.moveBy(e, o);
      const [r, d] = this.shape.getMaxPointSize();
      this.shape.scaleTo(s.newPos.width - r * 2, s.newPos.height - d * 2), this.shape.redraw(), h.emit(S.RESIZE_BOX_RESIZE, this.shape, s);
    }), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(n.SHAPE_MOVE_START, (s) => {
      this.mousedown(s);
    }), this.resizeMouseMoveEventListener = this.shape.resizeBox.addEventListener(n.SHAPE_MOUSE_MOVE, (s) => {
      this.mousemove(s);
    }), this.resizeClickEventListener = this.shape.resizeBox.addEventListener(n.SHAPE_MOUSE_CLICK, (s) => {
      this.click(s);
    }));
  }, this.addRotateEventListener = () => {
    !this.shape.rotateBox || (this.rotateBoxListener = this.shape.rotateBox.addEventListener(P.ROTATE_BOX_ROTATE, (s) => {
      const i = this.shape.getRootParent();
      if (i) {
        h.emit(P.ROTATE_BOX_ROTATE, i.rotateBox, { angle: s.angle });
        return;
      }
      i ? (i.rotateBy(s.angle), i.redraw()) : (this.shape.rotateBy(s.angle), this.shape.redraw());
    }), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(n.SHAPE_MOVE_START, (s) => {
      this.mousedown(s);
    }), this.rotateMouseMoveEventListener = this.shape.rotateBox.addEventListener(n.SHAPE_MOUSE_MOVE, (s) => {
      this.mousemove(s);
    }), this.rotateClickEventListener = this.shape.rotateBox.addEventListener(n.SHAPE_MOUSE_CLICK, (s) => {
      this.click(s);
    }), this.rotatePointDragStartEventListener = this.shape.rotateBox.addEventListener(n.POINT_DRAG_START, (s) => {
      this.shape.initCenter = this.shape.getCenter(!0);
    }), this.rotatePointDragEndEventListener = this.shape.rotateBox.addEventListener(n.POINT_DRAG_END, (s) => {
      this.shape.initCenter = null;
    }));
  }, this.mousedown = (s) => {
    w(s), setTimeout(() => {
      h.emit(n.SHAPE_MOVE_START, this.shape, E(s));
    }, 100);
  }, this.mousemove = (s) => {
    if (this.shape.draggedPoint || h.emit(n.SHAPE_MOUSE_MOVE, this.shape, E(s)), this.shape.draggedPoint) {
      this.shape.draggedPoint.mousemove(s);
      return;
    }
    if (!this.shape.options.canDragShape)
      return;
    const [i, e] = this.calcMovementOffset(s);
    if (i === null || e === null)
      return;
    const o = this.shape.getPosition(!0);
    this.shape.moveBy(i, e), this.shape.redraw();
    const r = this.shape.getPosition();
    h.emit(n.SHAPE_MOVE, this.shape, { oldPos: o, newPos: r });
  }, this.mouseenter = (s) => {
    h.emit(n.SHAPE_MOUSE_ENTER, this.shape, E(s));
  }, this.mouseover = (s) => {
    _.draggedShape !== this.shape && h.emit(n.SHAPE_MOUSE_OVER, this.shape, E(s));
  }, this.mouseout = (s) => {
    h.emit(n.SHAPE_MOUSE_OUT, this.shape, E(s));
  }, this.click = (s) => {
    s.type !== z.SHAPE_MOUSE_CLICK && h.emit(n.SHAPE_MOUSE_CLICK, this.shape, E(s));
  }, this.calcMovementOffset = (s) => {
    this.shape.calcPosition();
    const i = this.shape.getPosition(!0);
    let e = s.movementX, o = s.movementY, r = s.clientX + window.scrollX, d = s.clientY + window.scrollY;
    const u = i.left + e, a = i.top + o, p = y(this.shape.root, !0), g = this.shape.getBounds();
    return u < g.left || u + i.width > g.right ? [null, null] : a < g.top || a + i.height > g.bottom ? [null, null] : (r < u + p.left && (e = r - (u + p.left)), d < a + p.top && (o = d - (a + p.top)), r > u + i.width + p.left && (e = r - (i.width + p.left + i.left)), d > a + i.height + p.right && (o = d - (i.height + p.top + i.top)), [e, o]);
  }, this.onPointAdded = (s) => {
    !this.shape.isShapePoint(s.target) || this.checkCanDeletePoints();
  }, this.checkCanDeletePoints = () => {
    this.shape.points.find((s) => s.options.canDelete === !0) && (this.nocontextmenu = this.shape.root.addEventListener("contextmenu", (s) => s.preventDefault()));
  }, this.onPointDragMove = (s) => {
    this.shape.isShapePoint(s.target) && this.shape.redraw();
  }, this.onPointDestroyed = (s) => {
    !this.shape.isShapePoint(s.target) || (this.shape.points.splice(this.shape.points.indexOf(s.target), 1), this.shape.root.removeChild(s.target.element), this.shape.redraw());
  }, this.addEventListener = (s, i) => {
    typeof this.subscriptions[s] > "u" && (this.subscriptions[s] = []);
    const e = h.subscribe(s, (o) => {
      o.target.guid === this.shape.guid && i(o);
    });
    return this.subscriptions[s].push(e), e;
  }, this.removeEventListener = (s, i) => {
    this.subscriptions[s].splice(this.subscriptions[s].indexOf(i), 1), h.unsubscribe(s, i);
  }, this.destroy = () => {
    window.removeEventListener("resize", this.onWindowResize), h.unsubscribe(A.POINT_ADDED, this.onPointAdded), h.unsubscribe(A.POINT_DRAG_MOVE, this.onPointDragMove), h.unsubscribe(A.POINT_DESTROYED, this.onPointDestroyed), this.shape.resizeBox && (this.shape.resizeBox.removeEventListener(S.RESIZE_BOX_RESIZE, this.resizeBoxListener), this.shape.resizeBox.removeEventListener(n.SHAPE_MOUSE_CLICK, this.resizeClickEventListener), this.shape.resizeBox.removeEventListener(n.SHAPE_MOUSE_MOVE, this.resizeMouseMoveEventListener), this.shape.resizeBox.removeEventListener(n.SHAPE_MOVE_START, this.resizeMouseDownEventListener)), this.shape.rotateBox && (this.shape.rotateBox.removeEventListener(P.ROTATE_BOX_ROTATE, this.rotateBoxListener), this.shape.rotateBox.removeEventListener(n.SHAPE_MOUSE_CLICK, this.rotateClickEventListener), this.shape.rotateBox.removeEventListener(n.SHAPE_MOUSE_MOVE, this.rotateMouseMoveEventListener), this.shape.rotateBox.removeEventListener(n.SHAPE_MOVE_START, this.rotateMouseDownEventListener), this.shape.rotateBox.removeEventListener(n.SHAPE_MOVE_START, this.rotatePointDragStartEventListener), this.shape.rotateBox.removeEventListener(n.SHAPE_MOVE_START, this.rotatePointDragEndEventListener));
    for (let s in this.subscriptions)
      this.subscriptions[s].forEach((e) => h.unsubscribe(s, e)), this.subscriptions[s] = [];
  };
}
const n = {
  SHAPE_CREATE: "create",
  SHAPE_MOVE_START: "move_start",
  SHAPE_MOVE: "move",
  SHAPE_MOVE_END: "move_end",
  SHAPE_MOUSE_MOVE: "mousemove",
  SHAPE_MOUSE_ENTER: "mouseenter",
  SHAPE_MOUSE_OVER: "mouseover",
  SHAPE_MOUSE_OUT: "mouseout",
  SHAPE_MOUSE_CLICK: "click",
  SHAPE_DESTROY: "destroy",
  POINT_DRAG_START: "point_drag_start",
  POINT_DRAG_END: "point_drag_end"
};
function et() {
  this.draw = (t) => {
    if (t.points.length < 1)
      return;
    t.svg && (t.eventListener.removeSvgEventListeners(), t.root.removeChild(t.svg), t.svg = null), t.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), t.svg.ondragstart = function() {
      return !1;
    }, this.updateOptions(t);
    const s = this.drawPolygon(t);
    t.eventListener.setSvgEventListeners(), t.svg.appendChild(s), t.root.appendChild(t.svg);
  }, this.updateOptions = (t) => {
    if (!t.svg || typeof t.svg > "u")
      return;
    typeof t.options.visible < "u" && (t.svg.style.display = t.options.visible ? "" : "none"), t.calcPosition(), t.svg.id = t.options.id, t.svg.style.position = "absolute", t.svg.style.cursor = "default", t.svg.style.left = t.left, t.svg.style.top = t.top, t.svg.setAttribute("width", t.width), t.svg.setAttribute("height", t.height), this.setupShapeFill(t), this.setupSVGFilters(t), t.svg.style.zIndex = t.options.zIndex, t.points.forEach((i) => {
      i.options.zIndex < t.options.zIndex + 2 && (i.options.zIndex = t.options.zIndex + 2), t.options.visible || (i.options.visible = !1), i.redraw(), t.options.displayMode === l.DEFAULT && !i.options.forceDisplay && (i.element.style.display = "none");
    });
    let s = t.getRootParent();
    this.redrawResizeBox(s || t), this.redrawRotateBox(s || t);
  }, this.drawPolygon = (t) => {
    let s = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    t.points.length > 2 && (s = document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
    const i = t.points.map((e) => "" + (e.x - t.left) + "," + (e.y - t.top)).join(" ");
    return s.setAttribute("points", i), this.setupPolygonStroke(t, s), this.setupPolygonFill(t, s), this.setupPolygonStyles(t, s), t.svg.querySelector("defs") && t.svg.querySelector("defs").querySelector("filter") && (s.style.filter = 'url("#' + t.guid + '_filter")'), s.style.zIndex = t.options.zIndex, s;
  }, this.redrawResizeBox = (t) => {
    if (!t.resizeBox)
      return;
    const s = t.getResizeBoxBounds();
    t.resizeBox.left = s.left, t.resizeBox.top = s.top, t.resizeBox.width = s.width, t.resizeBox.height = s.height, t.resizeBox.shape.options.zIndex = t.options.zIndex + 1, t.resizeBox.redraw();
  }, this.redrawRotateBox = (t) => {
    if (!t.rotateBox)
      return;
    const s = t.getResizeBoxBounds();
    t.rotateBox.left = s.left, t.rotateBox.top = s.top, t.rotateBox.width = s.width, t.rotateBox.height = s.height, t.rotateBox.shape.options.zIndex = t.options.zIndex + 1, t.rotateBox.redraw();
  }, this.setupShapeFill = (t) => {
    if (t.options.fillImage && typeof t.options.fillImage == "object") {
      const s = document.createElementNS(t.svg.namespaceURI, "defs"), i = this.createImageFill(t);
      i && s.appendChild(i), t.svg.appendChild(s);
    } else if (t.options.fillGradient && typeof t.options.fillGradient == "object" && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1) {
      const s = document.createElementNS(t.svg.namespaceURI, "defs"), i = this.createGradient(t);
      s.appendChild(i), t.svg.appendChild(s);
    }
  }, this.createGradient = (t) => {
    let s = document.createElementNS(t.svg.namespaceURI, "linearGradient");
    const i = t.options.fillGradient;
    i.type === "radial" && (s = document.createElementNS(t.svg.namespaceURI, "radialGradient")), s.id = t.guid + "_gradient";
    let e = !1;
    for (let o in i)
      if (o !== "type") {
        if (o === "steps") {
          e = !0;
          continue;
        }
        s.setAttribute(o, i[o]);
      }
    if (!e)
      return s;
    for (let o of i.steps) {
      const r = document.createElementNS(t.svg.namespaceURI, "stop");
      f(o.stopColor) && r.setAttribute("offset", o.offset), f(o.stopColor) && r.setAttribute("stop-color", o.stopColor), f(o.stopOpacity) && r.setAttribute("stop-opacity", o.stopOpacity), s.appendChild(r);
    }
    return s;
  }, this.createImageFill = (t) => {
    const s = t.options.fillImage;
    if (!s.href || !s.width || !s.height)
      return console.error("Image HREF, width and height must be specified for Image Fill"), null;
    const i = document.createElementNS(t.svg.namespaceURI, "pattern");
    i.setAttribute("id", t.guid + "_pattern"), i.setAttribute("patternUnits", "userSpaceOnUse");
    for (let o in s)
      o !== "href" && i.setAttribute(o, s[o]);
    const e = document.createElementNS(t.svg.namespaceURI, "image");
    return e.setAttribute("href", s.href), e.setAttribute("width", s.width), e.setAttribute("height", s.height), i.appendChild(e), i;
  }, this.setupSVGFilters = (t) => {
    if (t.options.filters && typeof t.options.filters == "object" && Object.keys(t.options.filters).length) {
      let s = t.svg.querySelector("defs");
      s || (s = document.createElementNS(t.svg.namespaceURI, "defs"), t.svg.appendChild(s));
      const i = this.createSVGFilters(t);
      s.append(i);
    }
  }, this.createSVGFilters = (t) => {
    const s = document.createElementNS(t.svg.namespaceURI, "filter");
    s.setAttribute("id", t.guid + "_filter");
    for (let i in t.options.filters) {
      const e = this.createSVGFilter(t, i, t.options.filters[i]);
      s.appendChild(e);
    }
    return s;
  }, this.createSVGFilter = (t, s, i) => {
    const e = document.createElementNS(t.svg.namespaceURI, s);
    for (let o in i)
      e.setAttribute(o, i[o].toString()), o === "dx" && t.svg.setAttribute("width", t.width + parseInt(i.dx) * 2), o === "dy" && t.svg.setAttribute("height", t.height + parseInt(i.dy) * 2);
    return e;
  }, this.setupPolygonStroke = (t, s) => {
    f(t.options.stroke) && s.setAttribute("stroke", t.options.stroke), f(t.options.strokeWidth) && s.setAttribute("stroke-width", t.options.strokeWidth), f(t.options.strokeLinecap) && s.setAttribute("stroke-linecap", t.options.strokeLinecap), f(t.options.strokeDasharray) && s.setAttribute("stroke-dasharray", t.options.strokeDasharray);
  }, this.setupPolygonFill = (t, s) => {
    t.options.fillImage && typeof t.options.fillImage == "object" ? s.setAttribute("fill", 'url("#' + t.guid + '_pattern")') : t.options.fillGradient && typeof t.options.fillGradient == "object" && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1 ? s.setAttribute("fill", 'url("#' + t.guid + '_gradient")') : t.options.fill && s.setAttribute("fill", t.options.fill), f(t.options.fillOpacity) && s.setAttribute("fill-opacity", t.options.fillOpacity);
  }, this.setupPolygonStyles = (t, s) => {
    if (t.options.classes && s.setAttribute("class", t.options.classes), f(t.options.style) && typeof t.options.style == "object")
      for (let i in t.options.style)
        s.style[i] = t.options.style[i];
  }, this.toSvg = (t) => {
    const s = document.createElement("div"), i = document.createElementNS("http://www.w3.org/2000/svg", "svg"), e = t.getPosition(!0);
    i.appendChild(this.getSvgDefs(t)), this.addSvgPolygons(t, i), i.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const o = "0 0 " + e.width + " " + e.height;
    return i.setAttribute("viewBox", o), s.appendChild(i), '<?xml version="1.0" encoding="UTF-8"?>' + s.innerHTML.replace(/&quot;/g, "'");
  }, this.getSvgDefs = (t) => {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    if (t.svg) {
      const i = t.svg.querySelector("defs");
      i && (s.innerHTML = i.innerHTML);
    }
    return t.getChildren(!0).forEach((i) => {
      const e = i.svg.querySelector("defs");
      e && (s.innerHTML += e.innerHTML);
    }), s;
  }, this.addSvgPolygons = (t, s) => {
    const i = t.getPosition(!0);
    if (t.svg) {
      let e = t.svg.querySelector("polygon");
      if (e) {
        e = e.cloneNode();
        const o = t.points.map(
          (r) => "" + (r.x - i.left) + "," + (r.y - i.top)
        ).join(" ");
        e.setAttribute("points", o), s.appendChild(e);
      }
    }
    t.getChildren(!0).forEach((e) => {
      let o = e.svg.querySelector("polygon");
      if (o) {
        o = o.cloneNode();
        const r = e.points.map(
          (d) => "" + (d.x - i.left) + "," + (d.y - i.top)
        ).join(" ");
        o.setAttribute("points", r), s.appendChild(o);
      }
    });
  };
}
const x = new et();
function ot() {
  this.shapes = [], this.activeShape = null, this.draggedShape = null, this.shapeOnCursor = null, this.containerEventListeners = [], this.init = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    h.subscribe(n.SHAPE_CREATE, this.onShapeCreated), h.subscribe(n.SHAPE_DESTROY, this.onShapeDestroy), h.subscribe(n.SHAPE_MOVE_START, this.onShapeMoveStart), h.subscribe(n.SHAPE_MOUSE_ENTER, this.onShapeMouseEnter), h.subscribe(A.POINT_DRAG_START, this.onPointDragStart), h.subscribe(A.POINT_DRAG_END, this.onPointDragEnd), window.addEventListener("resize", this.onWindowResize);
  }, this.onWindowResize = (t) => {
    this.shapes.forEach((s) => {
      h.emit(
        R.CONTAINER_BOUNDS_CHANGED,
        s,
        { bounds: s.getBounds(), points: s.points }
      );
    });
  }, this.onShapeCreated = (t) => {
    const s = t.target;
    f(s.root) && !this.getShape(s) && (this.shapes.push(s), this.activeShape || (this.activeShape = s), this.getShapesByContainer(s.root).length === 1 && this.addContainerEvents(s));
  }, this.onShapeDestroy = (t) => {
    const s = t.target, i = s.root;
    !f(s.root) || !this.getShape(s) || (this.shapes.splice(this.shapes.indexOf(s), 1), this.getShapesByContainer(i).length === 0 && this.containerEventListeners.filter((e) => e.container === i).forEach((e) => {
      e.container.removeEventListener(e.name, e.listener), this.containerEventListeners.splice(this.containerEventListeners.indexOf(e), 1);
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
      const i = s.getRootParent();
      i && (this.draggedShape = i), this.draggedShape.draggedPoint = t.target;
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
    return t && (s = this.getShapesByContainer(t)), s = s.filter((i) => i.options.id.search("_resizebox") === -1 && i.options.id.search("_rotatebox") === -1), s.length ? s.map((i) => i.options.zIndex || 0).reduce((i, e) => e > i ? e : i) : 0;
  }, this.activateShape = (t) => {
    if (this.activeShape === t) {
      this.activeShape.switchDisplayMode();
      return;
    }
    if (typeof t.id < "u" && (t.id.search("_resizebox") !== -1 || t.id.search("_rotatebox") !== -1))
      return;
    this.activeShape && this.deactivateShape(this.activeShape);
    const i = this.getMaxZIndex(t.root) + 1 - t.options.zIndex;
    t.options.prevZIndex = t.options.zIndex, t.options.zIndex += i, x.updateOptions(t), t.getChildren(!0).forEach((e) => {
      e.options.prevZIndex = e.options.zIndex, e.options.zIndex += i, x.updateOptions(e);
    }), this.activeShape = t, this.activeShape.switchDisplayMode();
  }, this.deactivateShape = (t) => {
    typeof t.options.prevZIndex < "u" && (t.options.zIndex = t.options.prevZIndex, x.updateOptions(t)), t.options.displayMode !== l.DEFAULT && t.switchDisplayMode(l.DEFAULT), t.getChildren(!0).forEach((s) => {
      typeof s.options.prevZIndex < "u" && (s.options.zIndex = s.options.prevZIndex, x.updateOptions(s), s.options.displayMode !== l.DEFAULT && s.switchDisplayMode(l.DEFAULT));
    });
  }, this.addContainerEvents = (t) => {
    this.addContainerEvent(t.root, "mousemove", this.mousemove), this.addContainerEvent(t.root, "mouseup", this.mouseup, t.options.id), this.addContainerEvent(t.root, "dblclick", this.doubleclick), this.checkCanDeletePoints(t), h.emit(nt.MANAGER_ADD_CONTAINER_EVENT_LISTENERS, t.root);
  }, this.addContainerEvent = (t, s, i) => {
    this.containerEventListeners.find((e) => e.container === t && e.name === s) || (t.addEventListener(s, i), this.containerEventListeners.push({ id: t.id, container: t, name: s, listener: i }));
  }, this.mouseup = (t) => {
    if (!this.draggedShape)
      return;
    const s = this.draggedShape;
    t.buttons === 1 && s.options.canAddPoints && !s.draggedPoint && (s.options.maxPoints === -1 || s.points.length < s.options.maxPoints) && s.addPoint(
      t.clientX - s.root.offsetLeft,
      t.clientY - s.root.offsetTop
    ), s.draggedPoint && (s.draggedPoint.mouseup(t), s.draggedPoint = null), this.draggedShape = null, h.emit(n.SHAPE_MOVE_END, s);
  }, this.mousemove = (t) => {
    if (t.buttons !== 1 && (this.draggedShape = null), this.draggedShape) {
      if (t.buttons !== 1) {
        this.draggedShape.draggedPoint = null, this.draggedShape = null;
        return;
      }
      this.draggedShape.eventListener.mousemove(t);
    } else
      this.processShapesUnderCursor(t);
  }, this.processShapesUnderCursor = (t) => {
    const [s, i] = [t.clientX, t.clientY], e = this.getShapeOnCursor(s, i);
    this.shapeOnCursor && this.shapeOnCursor !== e && (this.shapeOnCursor.svg.style.cursor = "default"), this.shapeOnCursor = e, this.shapeOnCursor && (this.shapeOnCursor.svg.style.cursor = "crosshair");
  }, this.getShapeOnCursor = (t, s) => {
    const i = this.shapes.filter((e) => e.belongsToShape(t, s) && e.options.id.search("_resizebox") === -1 && e.options.id.search("_rotatebox") === -1);
    return i.length ? i.reduce((e, o) => o.options.zIndex >= e.options.zIndex ? o : e) : null;
  }, this.doubleclick = (t) => {
    t.stopPropagation(), !!this.activeShape && this.activeShape.options.canAddPoints && !this.activeShape.draggedPoint && (this.activeShape.options.maxPoints === -1 || this.activeShape.points.length < this.activeShape.options.maxPoints) && this.activeShape.addPoint(
      t.clientX - this.activeShape.root.offsetLeft + window.scrollX,
      t.clientY - this.activeShape.root.offsetTop + window.scrollY,
      { forceDisplay: !0 }
    );
  }, this.mousedown = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mousedown(E(t, { target: this.shapeOnCursor }));
  }, this.mouseover = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseover(E(t, { target: this.shapeOnCursor }));
  }, this.mouseenter = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseenter(E(t, { target: this.shapeOnCursor }));
  }, this.mouseout = () => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseout(E(event, { target: this.shapeOnCursor }));
  }, this.click = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.click(E(t, { target: this.shapeOnCursor }));
  }, this.checkCanDeletePoints = (t) => {
    t.points.find((s) => s.options.canDelete === !0) && this.addContainerEvent(t.root, "contextmenu", (s) => s.preventDefault());
  }, this.clear = () => {
    this.containerEventListeners.forEach(({ container: t, name: s, listener: i }) => {
      try {
        t.removeEventListener(s, i);
      } catch (e) {
        console.error(e);
      }
    }), this.containerEventListeners = [], this.shapes = [];
  };
}
const nt = {
  MANAGER_ADD_CONTAINER_EVENT_LISTENERS: "manager_add_container_event_listeners",
  MANAGER_REMOVE_CONTAINER_EVENT_LISTENERS: "manager_remove_container_event_listeners"
}, R = {
  CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
}, _ = new ot().init();
function ht(t) {
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
    const i = [];
    i.push(...this.children);
    for (let e of i)
      i.push(...e.getChildren());
    return i;
  }, this.shouldAddChild = (s) => !s || typeof s != "object" || typeof s.getChildren > "u" || this.children.indexOf(s) !== -1 ? !1 : s === this.shape ? void 0 : s.getChildren().indexOf(this.shape) !== -1 || s.getParent() ? !1 : this.getParentsList().indexOf(s) === -1, this.getParent = () => {
    const s = _.shapes;
    for (let i of s)
      if (i.getChildren().indexOf(this.shape) !== -1)
        return i;
    return null;
  }, this.getRootParent = () => {
    const s = this.getParentsList();
    return s.length ? s[s.length - 1] : null;
  }, this.getParentsList = (s = []) => {
    const i = this.getParent();
    return i == null ? s : (s.push(i), i.getParentsList(s));
  }, this.getPosition = (s = !1) => {
    const i = this.parent.getPosition();
    if (!s)
      return i;
    let e = this.getChildren(!0);
    return e.push(this.shape), e = e.filter((o) => o.points.length), i.left = e.map((o) => o.left).reduce((o, r) => r < o ? r : o), i.top = e.map((o) => o.top).reduce((o, r) => r < o ? r : o), i.right = e.map((o) => o.right).reduce((o, r) => r > o ? r : o), i.bottom = e.map((o) => o.bottom).reduce((o, r) => r > o ? r : o), i.width = i.right - i.left || 1, i.height = i.bottom - i.top || 1, i;
  };
}
function T() {
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
    displayMode: l.DEFAULT,
    managed: !0
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = B(), this.resizeBox = null, this.rotateBox = null, this.initCenter = null, this.init = (t, s = null, i = null) => {
    if (!t) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    if (_.getShape(this)) {
      console.error("This shape already initialized");
      return;
    }
    return this.root = t, this.root.style.position = "relative", this.setOptions(s), this.eventListener = new z(this), this.groupHelper = new ht(this).init(), this.setupPoints(i, Object.assign({}, this.options.pointOptions)), this.eventListener.run(), this.applyDisplayMode(), h.emit(n.SHAPE_CREATE, this, {}), this;
  }, this.setOptions = (t) => {
    !t || typeof t != "object" || (t.pointOptions = m(this.options.pointOptions, t.pointOptions), t.style = m(this.options.style, t.style), t.bounds = m(this.options.bounds, t.bounds), f(t.visible) && t.visible !== this.options.visible && (this.points.forEach((s) => s.options.visible = t.visible), this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: t.visible } }), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: t.visible } })), this.options = m(this.options, t), this.points.forEach((s) => {
      s.setOptions(m({}, this.options.pointOptions)), s.options.bounds = this.getBounds(), s.options.zIndex <= this.options.zIndex && (s.options.zIndex = this.options.zIndex + 1), s.redraw();
    }));
  }, this.setupPoints = (t, s) => {
    t && typeof t == "object" && (this.points = [], this.addPoints(t, Object.assign({}, s)));
  }, this.addPoint = (t, s, i = null) => {
    const e = this.putPoint(t, s, Object.assign({}, i));
    return this.redraw(), e;
  }, this.addPoints = (t, s = null) => {
    !t || typeof t != "object" || (t.forEach(
      (i) => this.putPoint(i[0] + this.options.offsetX, i[1] + this.options.offsetY, Object.assign({}, s))
    ), this.redraw());
  }, this.putPoint = (t, s, i = null) => {
    if (this.findPoint(t, s))
      return console.error(`Point with x=${t} and y=${s} already exists`), null;
    !i || !Object.keys(i).length ? i = Object.assign({}, this.options.pointOptions) || {} : i = m(Object.assign({}, this.options.pointOptions), i), i.bounds = this.getBounds(), i.zIndex = this.options.zIndex + 1;
    const e = new j();
    return this.points.push(e), e.init(t, s, i), this.root.appendChild(e.element), e;
  }, this.deleteAllPoints = () => {
    for (; this.points.length; )
      this.points[0].destroy();
  }, this.deletePoint = (t, s) => {
    const i = this.findPoint(t, s);
    i && i.destroy();
  }, this.findPoint = (t, s) => {
    const i = this.points.find((e) => e.x === t && e.y === s);
    return typeof i > "u" || !i ? null : i;
  }, this.findPointById = (t) => {
    const s = this.points.find((i) => i.options.id === t);
    return typeof s > "u" || !s ? null : s;
  }, this.getPointsArray = () => {
    let t = [];
    return this.points && typeof this.points == "object" && this.points.length && (t = this.points.map((s) => [s.x, s.y])), t;
  }, this.moveTo = (t, s, i = !0) => {
    const e = this.getBounds(), o = this.getPosition(!0);
    let r = t + o.width > e.right ? e.right - o.width : t, d = s + o.height > e.bottom ? e.bottom - o.height : s;
    this.moveBy(r - o.left, d - o.top, i), this.calcPosition();
  }, this.moveBy = (t, s, i = !0) => {
    for (let o in this.points)
      this.points[o].x += t, this.points[o].y += s, i && this.points[o].redraw();
    this.calcPosition();
    const e = this.getChildren(!0);
    e.length && (i && this.redraw(), e.forEach((o) => {
      o.moveBy(t, s), i && o.redraw();
    }));
  }, this.scaleTo = (t, s) => {
    const i = this.getBounds();
    this.calcPosition();
    const e = this.getPosition(!0);
    e.width >= 10 && t < 10 && (t = 10), e.height >= 10 && s < 10 && (s = 10);
    let o = e.left + t > i.right ? i.right - e.left : t, r = e.top + s > i.bottom ? i.bottom - e.top : s, d = o / e.width, u = r / e.height;
    this.points.forEach(
      (a) => {
        a.x = (a.x - e.left) * d + e.left, a.y = (a.y - e.top) * u + e.top;
      }
    ), this.getChildren(!0).forEach((a) => {
      a.points.forEach(
        (p) => {
          p.x = (p.x - e.left) * d + e.left, p.y = (p.y - e.top) * u + e.top;
        }
      ), a.calcPosition();
    }), this.getChildren(!0).forEach((a) => a.redraw()), this.calcPosition();
  }, this.rotateBy = (t, s = null, i = null, e = !1) => {
    this.calcPosition();
    const o = this.getPosition(!0);
    let [r, d] = this.getCenter(!0);
    const u = this.getRootParent();
    u && ([r, d] = u.getCenter(!0)), s || (s = r), i || (i = d), this.initCenter && ([s, i] = this.initCenter), !(e && (!this.isInBounds(...v(t, o.left, o.top, s, i)) || !this.isInBounds(...v(t, o.right, o.top, s, i)) || !this.isInBounds(...v(t, o.left, o.bottom, s, i)) || !this.isInBounds(...v(t, o.right, o.bottom, s, i)))) && (this.points.forEach((a) => a.rotateBy(t, s, i)), this.getChildren(!0).forEach((a) => {
      a.points.forEach((p) => p.rotateBy(t, s, i)), a.redraw();
    }));
  }, this.isInBounds = (t, s) => {
    const [i, e] = this.getMaxPointSize(), o = this.getBounds();
    return t >= o.left + i / 2 && t <= o.right - i / 2 && s >= o.top + e / 2 && s <= o.bottom - e / 2;
  }, this.redraw = () => {
    this.applyDisplayMode(), x.draw(this);
  }, this.applyDisplayMode = () => {
    this.options.displayMode === l.SCALE && this.options.canScale ? (this.rotateBox && this.rotateBox.hide(), !this.resizeBox && this.setupResizeBox(), this.resizeBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : this.options.displayMode === l.ROTATE && this.options.canRotate ? (this.resizeBox && this.resizeBox.hide(), !this.rotateBox && this.setupRotateBox(), this.rotateBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : (this.resizeBox && this.resizeBox.hide(), this.rotateBox && this.rotateBox.hide()), this.points.forEach((t) => {
      t.setOptions({ zIndex: this.options.zIndex + 1 }), t.redraw(), this.options.displayMode === l.DEFAULT && !t.options.forceDisplay && (t.element.style.display = "none");
    });
  }, this.switchDisplayMode = (t = null) => {
    t || (t = this.getNextDisplayMode()), (t === l.SCALE && !this.options.canScale || t === l.ROTATE && !this.options.canRotate || t === l.SELECTED && !this.points.filter((s) => s.options.canDrag).length) && (t = l.DEFAULT), this.options.displayMode = t, this.redraw();
  }, this.getNextDisplayMode = () => {
    let t;
    return this.options.displayMode === l.DEFAULT ? t = l.SELECTED : this.options.displayMode === l.SELECTED ? t = l.SCALE : this.options.displayMode === l.SCALE ? t = l.ROTATE : t = l.DEFAULT, t === l.SELECTED && !this.points.filter((s) => s.options.canDrag).length && (t = l.SCALE), t === l.SCALE && !this.options.canScale && (t = l.ROTATE), t === l.ROTATE && !this.options.canRotate && (t = l.DEFAULT), t;
  }, this.calcPosition = () => {
    !this.points.length || (this.left = this.points.map((t) => t.x).reduce((t, s) => s < t ? s : t), this.top = this.points.map((t) => t.y).reduce((t, s) => s < t ? s : t), this.right = this.points.map((t) => t.x).reduce((t, s) => s > t ? s : t), this.bottom = this.points.map((t) => t.y).reduce((t, s) => s > t ? s : t), this.width = this.right - this.left || 1, this.height = this.bottom - this.top || 1);
  }, this.getPosition = () => ({ top: this.top, left: this.left, bottom: this.bottom, right: this.right, width: this.width, height: this.height }), this.getBounds = () => ({
    left: this.options.bounds.left !== -1 ? this.options.bounds.left : this.root.clientLeft,
    top: this.options.bounds.top !== -1 ? this.options.bounds.top : this.root.clientTop,
    right: this.options.bounds.right !== -1 ? this.options.bounds.right : this.root.clientLeft + this.root.clientWidth,
    bottom: this.options.bounds.bottom !== -1 ? this.options.bounds.bottom : this.root.clientTop + this.root.clientHeight
  }), this.isShapePoint = (t) => !!this.points.find((s) => s === t), this.belongsToShape = (t, s, i = !0) => {
    if (this.findPoint(t, s))
      return !0;
    let e = this.getPointsArray();
    return i && (e = e.map((o) => [o[0] + y(this.root).left, o[1] + y(this.root).top])), k(e, [t, s]);
  }, this.addEventListener = (t, s) => this.eventListener.addEventListener(t, s), this.removeEventListener = (t, s) => {
    this.eventListener.removeEventListener(t, s);
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.destroy = () => {
    for (; this.points.length > 0; )
      this.points[0].destroy();
    if (h.emit(n.SHAPE_DESTROY, this, {}), this.eventListener && this.eventListener.destroy(), this.resizeBox && this.resizeBox.destroy(), this.rotateBox && this.rotateBox.destroy(), this.root && this.svg)
      try {
        this.root.removeChild(this.svg);
      } catch {
      }
    this.getChildren(!0).forEach((t) => t.destroy());
  }, this.setupResizeBox = () => {
    const t = this.getResizeBoxBounds();
    this.resizeBox = new U().init(this.root, t.left, t.top, t.width, t.height, {
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
    this.rotateBox = new C().init(this.root, t.left, t.top, t.width, t.height, {
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
    const [i, e] = this.getMaxPointSize(), o = {
      left: t.left - i,
      right: t.right + i,
      top: t.top - e,
      bottom: t.bottom + e,
      width: t.width + i * 2,
      height: t.height + e * 2
    };
    o.left < 0 && (this.moveTo(o.left * -1, t.top, !1), o.left = 0), o.top < 0 && (this.moveTo(t.left, o.top * -1, !1), o.top = 0);
    const r = this.getBounds();
    return o.bottom > r.bottom && (this.moveTo(t.left, o.bottom - r.bottom + t.top, !1), o.bottom = r.bottom), o.right > r.right && (this.moveTo(o.right - r.right + t.left, t.top, !1), o.bottom = r.bottom), o;
  }, this.getMaxPointSize = () => {
    if (!this.points.length)
      return [0, 0];
    const t = this.points.map((i) => i.options.width).reduce((i, e) => Math.max(i, e)), s = this.points.map((i) => i.options.height).reduce((i, e) => Math.max(i, e));
    return [t, s];
  }, this.getCenter = (t = !1) => {
    const s = this.getPosition(t);
    return [s.left + s.width / 2, s.top + s.height / 2];
  }, this.toSvg = () => x.toSvg(this);
}
const l = {
  DEFAULT: "default",
  SELECTED: "selected",
  SCALE: "scale",
  ROTATE: "rotate"
};
function rt(t) {
  this.resizeBox = t, this.subscriptions = {
    resize: []
  }, this.guid = B(), this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    h.subscribe(A.POINT_DRAG_MOVE, this.onPointDragMove), h.subscribe(A.POINT_DRAG_END, this.onPointDragMove), this.shapeMouseEnter = this.resizeBox.shape.addEventListener(n.SHAPE_MOUSE_ENTER, (s) => {
      setTimeout(() => {
        h.emit(n.SHAPE_MOUSE_ENTER, this.resizeBox, s);
      }, 1);
    }), this.shapeMouseMove = this.resizeBox.shape.addEventListener(n.SHAPE_MOUSE_MOVE, (s) => {
      setTimeout(() => {
        h.emit(n.SHAPE_MOUSE_MOVE, this.resizeBox, s);
      }, 1);
    }), this.shapeMoveStart = this.resizeBox.shape.addEventListener(n.SHAPE_MOVE_START, (s) => {
      setTimeout(() => {
        h.emit(n.SHAPE_MOVE_START, this.resizeBox, s);
      }, 1);
    }), this.shapeMoveEnd = this.resizeBox.shape.addEventListener(n.SHAPE_MOVE_END, (s) => {
      setTimeout(() => {
        h.emit(n.SHAPE_MOVE_END, this.resizeBox, s);
      }, 1);
    }), this.shapeMove = this.resizeBox.shape.addEventListener(n.SHAPE_MOVE, (s) => {
      setTimeout(() => {
        h.emit(n.SHAPE_MOVE, this.resizeBox, s);
      }, 1);
    }), this.shapeClick = this.resizeBox.shape.addEventListener(n.SHAPE_MOUSE_CLICK, (s) => {
      setTimeout(() => {
        h.emit(n.SHAPE_MOUSE_CLICK, this.resizeBox, s);
      }, 1);
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
    const i = this.resizeBox.getPosition();
    this.resizeBox.calcPosition();
    const e = this.resizeBox.getPosition();
    this.resizeBox.redraw(), h.emit(S.RESIZE_BOX_RESIZE, this.resizeBox, { oldPos: i, newPos: e });
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
  }, this.addEventListener = (s, i) => {
    typeof this.subscriptions[s] > "u" && (this.subscriptions[s] = []);
    const e = h.subscribe(s, (o) => {
      o.target.guid && o.target.guid === this.resizeBox.guid && i(o);
    });
    return this.subscriptions[s].push(e), e;
  }, this.removeEventListener = (s, i) => {
    this.subscriptions[s].splice(this.subscriptions[s].indexOf(i), 1), h.unsubscribe(s, i);
  }, this.destroy = () => {
    for (let s in this.subscriptions)
      this.subscriptions[s].forEach((e) => h.unsubscribe(s, e)), this.subscriptions[s] = [];
    this.resizeBox.shape.removeEventListener(n.SHAPE_MOVE_START, this.shapeMoveStart), this.resizeBox.shape.removeEventListener(n.SHAPE_MOVE, this.shapeMove), this.resizeBox.shape.removeEventListener(n.SHAPE_MOVE_END, this.shapeMoveEnd), this.resizeBox.shape.removeEventListener(n.SHAPE_MOUSE_ENTER, this.shapeMouseEnter), this.resizeBox.shape.removeEventListener(n.SHAPE_MOUSE_MOVE, this.shapeMouseMove), this.resizeBox.shape.removeEventListener(n.SHAPE_MOUSE_CLICK, this.shapeClick), h.unsubscribe(A.POINT_DRAG_MOVE, this.onPointDragMove), h.unsubscribe(A.POINT_DRAG_END, this.onPointDragMove);
  };
}
function U() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = B(), this.options = {
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
  }, this.eventListener = null, this.left_top = null, this.left_center = null, this.left_bottom = null, this.center_top = null, this.center_bottom = null, this.right_top = null, this.right_center = null, this.right_bottom = null, this.init = (t, s, i, e, o, r = {}) => (this.left = parseInt(s), this.top = parseInt(i), this.width = parseInt(e), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(r), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new T().init(t, Object.assign({}, this.options.shapeOptions), []), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new rt(this).run(), this.redraw(), h.emit(n.SHAPE_CREATE, this, {}), this), this.setOptions = (t = {}) => {
    !t || typeof t != "object" || (t.shapeOptions && typeof t.shapeOptions == "object" ? (t.shapeOptions.pointOptions && typeof t.shapeOptions.pointOptions == "object" ? t.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions, t.shapeOptions.pointOptions) : t.shapeOptions.pointOptions = Object.assign({}, this.options.shapeOptions.pointOptions), t.shapeOptions = Object.assign(this.options.shapeOptions, t.shapeOptions)) : t.shapeOptions = Object.assign({}, this.options.shapeOptions), t.shapeOptions.zIndex = t.zIndex || this.options.zIndex, t.shapeOptions.id = t.id ? t.id : this.options.id, Object.assign(this.options, t), this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + $ + "')" } }), this.center_top = this.shape.addPoint(this.left + this.width / 2, this.top, { id: this.shape.guid + "_center_top", style: { backgroundImage: "url('" + Y + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + it + "')" } }), this.right_center = this.shape.addPoint(this.right, this.top + this.height / 2, { id: this.shape.guid + "_right_center", style: { backgroundImage: "url('" + st + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + tt + "')" } }), this.center_bottom = this.shape.addPoint(this.left + this.width / 2, this.bottom, { id: this.shape.guid + "_center_bottom", style: { backgroundImage: "url('" + Q + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + X + "')" } }), this.left_center = this.shape.addPoint(this.left, this.top + this.height / 2, { id: this.shape.guid + "_left_center", style: { backgroundImage: "url('" + q + "')" } }), this.setPointsOptions();
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
    h.emit(n.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (t, s) => this.eventListener.addEventListener(t, s), this.removeEventListener = (t, s) => {
    this.eventListener.removeEventListener(t, s);
  };
}
const S = {
  RESIZE_BOX_RESIZE: "resize"
};
try {
  window.ResizeBox = U, window.SmartShape = T, window.RotateBox = C, window.SmartShapeManager = _;
} catch {
}
export {
  U as ResizeBox,
  C as RotateBox,
  T as SmartShape,
  _ as SmartShapeManager
};
