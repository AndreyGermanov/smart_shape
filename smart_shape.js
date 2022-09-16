function L() {
  this.subscriptions = {}, this.subscribe = (t, i) => ((typeof this.subscriptions[t] > "u" || !this.subscriptions[t]) && (this.subscriptions[t] = []), typeof this.subscriptions[t].find((s) => s === i) < "u" ? null : (this.subscriptions[t].push(i), i)), this.emit = (t, i, s = null) => {
    if ((!s || typeof s != "object") && (s = {}), s.type = t, s.target = i, typeof this.subscriptions[t] < "u" && this.subscriptions[t] && this.subscriptions[t].length) {
      for (let e of this.subscriptions[t])
        e(s);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (t, i) => {
    if (typeof this.subscriptions[t] > "u" || !this.subscriptions[t])
      return !1;
    const s = this.subscriptions[t].indexOf(i);
    return s !== -1 ? (this.subscriptions[t].splice(s, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const n = new L(), y = (t, i = !0) => {
  let s = 0, e = 0;
  if (!i)
    return { top: t.offsetTop - t.scrollTop, left: t.offsetLeft - t.scrollLeft };
  for (; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop); )
    s += t.offsetLeft - t.scrollLeft, e += t.offsetTop - t.scrollTop, t = t.offsetParent;
  return { top: e, left: s };
}, m = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
  const i = Math.random() * 16 | 0;
  return (t === "x" ? i : i & 3 | 8).toString(16);
}).replace(/-/g, ""), R = (t) => {
  try {
    t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1;
  } catch {
  }
  return !1;
}, w = (t) => t * (Math.PI / 180), I = (t) => t * (180 / Math.PI), _ = (t, i, s, e, o) => {
  const r = w(t), d = (i - e) * Math.cos(r) - (s - o) * Math.sin(r) + e, l = (i - e) * Math.sin(r) + (s - o) * Math.cos(r) + o;
  return [d, l];
}, b = (t, i, s, e) => Math.sqrt(Math.pow(s - t, 2) + Math.pow(e - i, 2)), c = (t) => typeof t < "u" && t !== null, E = (t, i) => t && typeof t == "object" && i && typeof i == "object" ? Object.assign(t, i) : t, f = (t, i = {}) => {
  const s = {};
  for (let e in t)
    e !== "type" && e !== "target" && (s[e] = t[e]);
  return Object.keys(i).forEach((e) => {
    s[e] = i[e];
  }), s;
}, C = (t) => [t.clientX + window.scrollX, t.clientY + window.scrollY];
function z() {
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
      g.LEFT,
      g.TOP,
      g.RIGHT,
      g.BOTTOM
    ],
    visible: !0,
    hidden: !1,
    forceDisplay: !1
  }, this.x = 0, this.y = 0, this.element = null, this.guid = m(), this.subscriptions = {}, this.init = (t, i, s = null) => (this.x = parseInt(t), this.y = parseInt(i), this.element = this.createPointUI(), this.setOptions(s), this.setEventListeners(), n.emit(p.POINT_ADDED, this), this), this.setOptions = (t) => {
    t && typeof t == "object" && (t.style && typeof t.style == "object" && (t.style = Object.assign(this.options.style, t.style)), Object.assign(this.options, t)), this.options.id && (this.element.id = this.options.id);
  }, this.createPointUI = () => {
    const t = document.createElement("div");
    return this.options.canDrag ? this.setPointStyles(t) : t;
  }, this.setPointStyles = (t = null) => {
    if (t == null && (t = this.element), this.options.id && (this.element.id = this.options.id), t.className = this.options.classes, t.style = this.options.style, typeof this.options.style == "object")
      for (let i in this.options.style)
        t.style[i] = this.options.style[i];
    return t.style.width = this.options.width + "px", t.style.height = this.options.height + "px", t.style.left = this.x - parseInt(this.options.width / 2) + "px", t.style.top = this.y - parseInt(this.options.height / 2) + "px", t.style.zIndex = this.options.zIndex, !this.options.canDrag || !this.options.visible || this.options.hidden ? t.style.display = "none" : t.style.display = "", t;
  }, this.redraw = () => {
    this.element = this.setPointStyles();
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.rotateBy = (t, i, s) => {
    const [e, o] = _(t, this.x, this.y, i, s);
    this.x = e, this.y = o;
  }, this.setEventListeners = () => {
    this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown), n.subscribe(v.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange);
  }, this.mousedown = (t) => {
    t.buttons === 1 && this.options.canDrag && (n.emit(p.POINT_DRAG_START, this), R(t));
  }, this.mousemove = (t) => {
    if (n.emit(p.POINT_MOUSE_MOVE, this, f(t)), t.buttons !== 1 || !this.options.canDrag)
      return;
    const i = this.x, s = this.y, e = y(this.element.parentNode, !0);
    if (!this.checkFitBounds(this.x + t.movementX, this.y + t.movementY)) {
      n.emit(p.POINT_DRAG_MOVE, this, { oldX: i, oldY: s });
      return;
    }
    let o = t.clientX + window.scrollX - e.left - this.options.width / 2, r = t.clientY + window.scrollY - e.top - this.options.height / 2;
    [o, r] = this.applyMoveRestrictions(o, r, i, s), this.x = o, this.y = r, this.element.style.left = this.x + "px", this.element.style.top = this.y + "px", n.emit(p.POINT_DRAG_MOVE, this, { oldX: i, oldY: s });
  }, this.checkFitBounds = (t, i) => !(this.options.bounds.left !== -1 && t < this.options.bounds.left || this.options.bounds.right !== -1 && t > this.options.bounds.right || this.options.bounds.top !== -1 && i < this.options.bounds.top || this.options.bounds.bottom !== -1 && i > this.options.bounds.bottom), this.applyMoveRestrictions = (t, i, s, e) => (i > e && this.options.moveDirections.indexOf(g.BOTTOM) === -1 && (i = e), i < e && this.options.moveDirections.indexOf(g.TOP) === -1 && (i = e), t > s && this.options.moveDirections.indexOf(g.RIGHT) === -1 && (t = s), t < s && this.options.moveDirections.indexOf(g.LEFT) === -1 && (t = s), t > this.options.bounds.right && (t = this.options.bounds.right), i > this.options.bounds.bottom && (i = this.options.bounds.bottom), t < this.options.bounds.left && (t = this.options.bounds.left), i < this.options.bounds.top && (i = this.options.bounds.top), [t, i]), this.mouseup = (t) => {
    n.emit(p.POINT_DRAG_END, this), t.button === 2 && this.options.canDelete && this.destroy();
  }, this.onBoundsChange = (t) => {
    t.points.find((i) => i === this) && (this.options.bounds = t.bounds);
  }, this.destroy = () => {
    this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), n.unsubscribe(v.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange), n.emit(p.POINT_DESTROYED, this);
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((s) => n.unsubscribe(t, s)), this.subscriptions[t] = [];
  }, this.addEventListener = (t, i) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const s = n.subscribe(t, (e) => {
      e.target.guid === this.guid && i(e);
    });
    return this.subscriptions[t].push(s), s;
  }, this.removeEventListener = (t, i) => {
    this.subscriptions[t].splice(this.subscriptions[t].indexOf(i), 1), n.unsubscribe(t, i);
  }, this;
}
const p = {
  POINT_ADDED: "create",
  POINT_DESTROYED: "destroy",
  POINT_DRAG_START: "move_start",
  POINT_DRAG_MOVE: "move",
  POINT_DRAG_END: "move_end",
  POINT_MOUSE_MOVE: "mousemove"
}, g = {
  TOP: 0,
  LEFT: 1,
  RIGHT: 2,
  BOTTOM: 3
};
function U(t) {
  this.rotateBox = t, this.subscriptions = {
    rotate: []
  }, this.initialAngle = 0, this.previousAngle = 0, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    this.shapeMouseEnter = this.rotateBox.shape.addEventListener(h.SHAPE_MOUSE_ENTER, (i) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_ENTER, this.rotateBox, i);
      }, 1);
    }), this.shapeMouseMove = this.rotateBox.shape.addEventListener(h.SHAPE_MOUSE_MOVE, (i) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_MOVE, this.rotateBox, i);
      }, 1);
    }), this.shapeMoveStart = this.rotateBox.shape.addEventListener(h.SHAPE_MOVE_START, (i) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOVE_START, this.rotateBox, i);
      }, 1);
    }), this.shapeMoveEnd = this.rotateBox.shape.addEventListener(h.SHAPE_MOVE_END, (i) => {
      setTimeout(() => {
        this.previousAngle = 0, n.emit(h.SHAPE_MOVE_END, this.rotateBox, i);
      }, 1);
    }), this.shapeMove = this.rotateBox.shape.addEventListener(h.SHAPE_MOVE, (i) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOVE, this.rotateBox, i);
      }, 1);
    }), this.shapeClick = this.rotateBox.shape.addEventListener(h.SHAPE_MOUSE_CLICK, (i) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_CLICK, this.rotateBox, i);
      }, 1);
    }), this.rotateBox.shape.points.forEach((i) => {
      i.mousemove = this.mousemove, i.mouseDownListener = i.addEventListener(p.POINT_DRAG_START, (s) => {
        this.onPointMouseDown(s), setTimeout(() => {
          n.emit(h.POINT_DRAG_START, this.rotateBox, { point: i });
        }, 1);
      }), i.mouseUpListener = i.addEventListener(p.POINT_DRAG_END, (s) => {
        this.onPointMouseUp(s), setTimeout(() => {
          n.emit(h.POINT_DRAG_END, this.rotateBox, { point: i });
        }, 1);
      });
    });
  }, this.mousemove = (i) => {
    if (i.buttons !== 1) {
      this.rotateBox.shape.root.draggedShape && (this.rotateBox.shape.root.draggedShape.draggedPoint = null, this.rotateBox.shape.root.draggedShape = null), n.emit(h.SHAPE_MOUSE_MOVE, this.rotateBox.shape, { clientX: i.clientX, clientY: i.clientY });
      return;
    }
    const [s, e] = C(i), [o, r] = this.rotateBox.shape.getCenter();
    let d = this.calcAngle(s, e, o, r);
    if (d === null)
      return;
    let l = d;
    this.previousAngle && (l -= this.previousAngle), this.previousAngle = d, n.emit(O.ROTATE_BOX_ROTATE, this.rotateBox, { angle: l });
  }, this.calcAngle = (i, s, e, o) => {
    const r = this.calcHypotenuse(i, s, e, o);
    if (r <= 0)
      return null;
    const d = this.calcCathetus(i, s, e, o), l = this.calcStartAngle(i, s, e, o);
    return Math.round(I(Math.asin(d / r)) + l + this.initialAngle);
  }, this.calcHypotenuse = (i, s, e, o) => b(i, s, e, o), this.calcCathetus = (i, s, e, o) => {
    if (i <= e && s <= o)
      return b(i, s, i, o);
    if (i > e && s < o)
      return b(i, s, e, s);
    if (i > e && s > o)
      return b(i, s, i, o);
    if (i < e && s > o)
      return b(i, s, e, s);
  }, this.calcStartAngle = (i, s, e, o) => {
    if (i <= e && s <= o)
      return 0;
    if (i > e && s < o)
      return 90;
    if (i > e && s > o)
      return 180;
    if (i < e && s > o)
      return 270;
  }, this.onPointMouseDown = (i) => {
    switch (i.target) {
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
  }, this.onPointMouseUp = (i) => {
    this.rotateBox.shape.points.forEach((s) => {
      s.setOptions({ visible: !0 }), s.redraw();
    });
  }, this.addEventListener = (i, s) => {
    typeof this.subscriptions[i] > "u" && (this.subscriptions[i] = []);
    const e = n.subscribe(i, (o) => {
      o.target.shape && o.target.shape.guid === this.rotateBox.shape.guid && s(o);
    });
    return this.subscriptions[i].push(e), e;
  }, this.removeEventListener = (i, s) => {
    this.subscriptions[i].splice(this.subscriptions[i].indexOf(s), 1), n.unsubscribe(i, s);
  }, this.destroy = () => {
    for (let i in this.subscriptions)
      this.subscriptions[i].forEach((e) => n.unsubscribe(i, e)), this.subscriptions[i] = [];
    this.rotateBox.shape.removeEventListener(h.SHAPE_MOVE_START, this.shapeMoveStart), this.rotateBox.shape.removeEventListener(h.SHAPE_MOVE, this.shapeMove), this.rotateBox.shape.removeEventListener(h.SHAPE_MOVE_END, this.shapeMoveEnd), this.rotateBox.shape.removeEventListener(h.SHAPE_MOUSE_ENTER, this.shapeMouseEnter), this.rotateBox.shape.removeEventListener(h.SHAPE_MOUSE_MOVE, this.shapeMouseMove), this.rotateBox.shape.removeEventListener(h.SHAPE_MOUSE_CLICK, this.shapeClick), this.rotateBox.shape.points.forEach((i) => {
      i.removeEventListener(p.POINT_DRAG_START, i.mouseDownListener), i.removeEventListener(p.POINT_DRAG_START, i.mouseUpListener);
    });
  };
}
const V = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECcZZuWhdAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlZBBEsAgCAMT/v/n7akzWAFtTo5mQ8SAJtkGcL4LXcg211A2L+eq3jc5C/AGTUBZ7wYAHH+B4yIAv8a8dkvilLz9qXuYKseU2E7qDFODqIwTIEkPSldAAa0WlbUAAAAASUVORK5CYII=", N = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECgYlnqNLQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABZSURBVCjPlZFBCgAxCANN/v/n2VOhiFU3N4U4GgXELUkAikbOhlhIh1QZXkR3hGc/IsaVMtHT0RXR3e5jescIqBpy05T/tInffw2AvEkr972N+a69+U8e8AGOtEABr4X+4AAAAABJRU5ErkJggg==", H = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECkWaNmRawAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABjSURBVCjPlZBRDsAgCENbsnt6/1N0P2ocijASEy08iqC1BknhASCvsSeOQXImJXHcrQL4t1UAr4fjReDmdCsc/5LEZ7NOwOlUKVy3RwC/AAAwL2TAZ3t+xFszOxVl7lbtvsYLOtlZCOj2NccAAAAASUVORK5CYII=", k = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECoXNPPyPgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlVFBEgAhCAL+/2f21I5jqcXFGRMSpG1EkLRtooEyIdaRlAc7orqBsg+gVKy8yTYn49vqMb0pgCUuPOBP93Sniaxb8/FdL6mt/rZe5SMKXQWRf/4AYrs6C0ViuwUAAAAASUVORK5CYII=", G = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDsHep3BSgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA8SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCAZy0h4AXLILDAEWNOwAAAAASUVORK5CYII=", j = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDMMJZaSygAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA/SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCJxAWZoFp1MBY8cLTv/x72kAAAAASUVORK5CYII=", F = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQARsznxFAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", K = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQEbSvcpSwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA3SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTCICjCTbxPJfsIWSv+JECM9nugHAG40DyW1OoLPAAAAAElFTkSuQmCC", J = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDIpd4l3zAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", W = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDYr/evT5AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", Q = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDUsSKIVhAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA0SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTBQZBPJfsIWSv+JECM9nugHADv6Dv2P6G4ZAAAAAElFTkSuQmCC", Z = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDQQftZYQgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==";
function T() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = m(), this.options = {
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
  }, this.eventListener = null, this.left_top = null, this.left_bottom = null, this.right_top = null, this.right_bottom = null, this.init = (t, i, s, e, o, r = {}) => (this.left = parseInt(i), this.top = parseInt(s), this.width = parseInt(e), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(r), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new P().init(t, Object.assign({}, this.options.shapeOptions), []), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new U(this).run(), this.redraw(), n.emit(h.SHAPE_CREATE, this, {}), this), this.setOptions = (t = {}) => {
    !t || typeof t != "object" || (t.shapeOptions && typeof t.shapeOptions == "object" ? (t.shapeOptions.pointOptions && typeof t.shapeOptions.pointOptions == "object" ? t.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions, t.shapeOptions.pointOptions) : t.shapeOptions.pointOptions = Object.assign({}, this.options.shapeOptions.pointOptions), t.shapeOptions = Object.assign(this.options.shapeOptions, t.shapeOptions)) : t.shapeOptions = Object.assign({}, this.options.shapeOptions), t.shapeOptions.zIndex = t.zIndex || this.options.zIndex, t.shapeOptions.id = t.id ? t.id : this.options.id, Object.assign(this.options, t), this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + V + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + N + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + H + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + k + "')" } });
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
  }, this.addEventListener = (t, i) => this.eventListener.addEventListener(t, i), this.removeEventListener = (t, i) => {
    this.eventListener.removeEventListener(t, i);
  };
}
const O = {
  ROTATE_BOX_ROTATE: "rotate"
};
function D(t) {
  this.shape = t, this.subscriptions = {
    CONTAINER_BOUNDS_CHANGED: []
  }, this.run = () => (this.shape = t, this.setEventListeners(), this), this.setEventListeners = () => {
    n.subscribe(p.POINT_DESTROYED, this.onPointDestroyed), n.subscribe(p.POINT_ADDED, this.onPointAdded), n.subscribe(p.POINT_DRAG_MOVE, this.onPointDragMove);
  }, this.setSvgEventListeners = () => {
    t.svg.addEventListener("mousedown", this.mousedown), t.svg.addEventListener("mouseenter", this.mouseenter), t.svg.addEventListener("mouseover", this.mouseover), t.svg.addEventListener("mouseout", this.mouseout), t.svg.addEventListener("click", this.click);
  }, this.removeSvgEventListeners = () => {
    t.svg.removeEventListener("mousedown", this.mousedown), t.svg.removeEventListener("mouseenter", this.mouseenter), t.svg.removeEventListener("mouseover", this.mouseover), t.svg.removeEventListener("mouseout", this.mouseout), t.svg.removeEventListener("click", this.click);
  }, this.addResizeEventListener = () => {
    !this.shape.resizeBox || (this.resizeBoxListener = this.shape.resizeBox.addEventListener(S.RESIZE_BOX_RESIZE, (i) => {
      const s = this.shape.getRootParent();
      if (s) {
        n.emit(S.RESIZE_BOX_RESIZE, s.resizeBox, { newPos: i.newPos, oldPos: i.oldPos });
        return;
      }
      const e = i.newPos.left - i.oldPos.left, o = i.newPos.top - i.oldPos.top;
      this.shape.moveBy(e, o), this.shape.getChildren(!0).forEach((l) => l.moveBy(e, o));
      const [r, d] = this.shape.getMaxPointSize();
      this.shape.scaleTo(i.newPos.width - r * 2, i.newPos.height - d * 2), this.shape.redraw();
    }), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(h.SHAPE_MOVE_START, (i) => {
      this.mousedown(i);
    }), this.resizeMouseMoveEventListener = this.shape.resizeBox.addEventListener(h.SHAPE_MOUSE_MOVE, (i) => {
      this.mousemove(i);
    }), this.resizeClickEventListener = this.shape.resizeBox.addEventListener(h.SHAPE_MOUSE_CLICK, (i) => {
      this.click(i);
    }));
  }, this.addRotateEventListener = () => {
    !this.shape.rotateBox || (this.rotateBoxListener = this.shape.rotateBox.addEventListener(O.ROTATE_BOX_ROTATE, (i) => {
      const s = this.shape.getRootParent();
      if (s) {
        n.emit(O.ROTATE_BOX_ROTATE, s.rotateBox, { angle: i.angle });
        return;
      }
      this.shape.rotateBy(i.angle), this.shape.redraw();
    }), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(h.SHAPE_MOVE_START, (i) => {
      this.mousedown(i);
    }), this.rotateMouseMoveEventListener = this.shape.rotateBox.addEventListener(h.SHAPE_MOUSE_MOVE, (i) => {
      this.mousemove(i);
    }), this.rotateClickEventListener = this.shape.rotateBox.addEventListener(h.SHAPE_MOUSE_CLICK, (i) => {
      this.click(i);
    }), this.rotatePointDragStartEventListener = this.shape.rotateBox.addEventListener(h.POINT_DRAG_START, (i) => {
      this.shape.initCenter = this.shape.getCenter();
    }), this.rotatePointDragEndEventListener = this.shape.rotateBox.addEventListener(h.POINT_DRAG_END, (i) => {
      this.shape.initCenter = null;
    }));
  }, this.mousedown = (i) => {
    R(i), n.emit(h.SHAPE_MOVE_START, this.shape, f(i));
  }, this.mousemove = (i) => {
    if (this.shape.draggedPoint || n.emit(h.SHAPE_MOUSE_MOVE, this.shape, f(i)), this.shape.draggedPoint) {
      this.shape.draggedPoint.mousemove(i);
      return;
    }
    if (!this.shape.options.canDragShape)
      return;
    const [s, e] = this.calcMovementOffset(i);
    if (s === null || e === null)
      return;
    const o = this.shape.getPosition(!0);
    this.shape.moveBy(s, e), this.shape.redraw();
    const r = this.shape.getPosition();
    n.emit(h.SHAPE_MOVE, this.shape, { oldPos: o, newPos: r });
  }, this.mouseenter = (i) => {
    n.emit(h.SHAPE_MOUSE_ENTER, this.shape, f(i));
  }, this.mouseover = (i) => {
    x.draggedShape || n.emit(h.SHAPE_MOUSE_OVER, this.shape, f(i));
  }, this.mouseout = (i) => {
    n.emit(h.SHAPE_MOUSE_OUT, this.shape, f(i));
  }, this.click = (i) => {
    this.shape.switchDisplayMode(), i.type !== D.SHAPE_MOUSE_CLICK && n.emit(h.SHAPE_MOUSE_CLICK, this.shape, f(i));
  }, this.calcMovementOffset = (i) => {
    this.shape.calcPosition();
    const s = this.shape.getPosition(!0);
    let e = i.movementX, o = i.movementY, r = i.clientX + window.scrollX, d = i.clientY + window.scrollY;
    const l = s.left + e, A = s.top + o, u = y(this.shape.root, !0), B = this.shape.getBounds();
    return l < B.left || l + s.width > B.right ? [null, null] : A < B.top || A + s.height > B.bottom ? [null, null] : (r < l + u.left && (e = r - (l + u.left)), d < A + u.top && (o = d - (A + u.top)), r > l + s.width + u.left && (e = r - (s.width + u.left + s.left)), d > A + s.height + u.right && (o = d - (s.height + u.top + s.top)), [e, o]);
  }, this.onPointAdded = (i) => {
    !this.shape.isShapePoint(i.target) || this.checkCanDeletePoints();
  }, this.checkCanDeletePoints = () => {
    this.shape.points.find((i) => i.options.canDelete === !0) && (this.nocontextmenu = this.shape.root.addEventListener("contextmenu", (i) => i.preventDefault()));
  }, this.onPointDragMove = (i) => {
    this.shape.isShapePoint(i.target) && this.shape.redraw();
  }, this.onPointDestroyed = (i) => {
    !this.shape.isShapePoint(i.target) || (this.shape.points.splice(this.shape.points.indexOf(i.target), 1), this.shape.root.removeChild(i.target.element), this.shape.redraw());
  }, this.addEventListener = (i, s) => {
    typeof this.subscriptions[i] > "u" && (this.subscriptions[i] = []);
    const e = n.subscribe(i, (o) => {
      o.target.guid === this.shape.guid && s(o);
    });
    return this.subscriptions[i].push(e), e;
  }, this.removeEventListener = (i, s) => {
    this.subscriptions[i].splice(this.subscriptions[i].indexOf(s), 1), n.unsubscribe(i, s);
  }, this.destroy = () => {
    window.removeEventListener("resize", this.onWindowResize), n.unsubscribe(p.POINT_ADDED, this.onPointAdded), n.unsubscribe(p.POINT_DRAG_MOVE, this.onPointDragMove), n.unsubscribe(p.POINT_DESTROYED, this.onPointDestroyed), this.shape.resizeBox && (this.shape.resizeBox.removeEventListener(S.RESIZE_BOX_RESIZE, this.resizeBoxListener), this.shape.resizeBox.removeEventListener(h.SHAPE_MOUSE_CLICK, this.resizeClickEventListener), this.shape.resizeBox.removeEventListener(h.SHAPE_MOUSE_MOVE, this.resizeMouseMoveEventListener), this.shape.resizeBox.removeEventListener(h.SHAPE_MOVE_START, this.resizeMouseDownEventListener)), this.shape.rotateBox && (this.shape.rotateBox.removeEventListener(O.ROTATE_BOX_ROTATE, this.rotateBoxListener), this.shape.rotateBox.removeEventListener(h.SHAPE_MOUSE_CLICK, this.rotateClickEventListener), this.shape.rotateBox.removeEventListener(h.SHAPE_MOUSE_MOVE, this.rotateMouseMoveEventListener), this.shape.rotateBox.removeEventListener(h.SHAPE_MOVE_START, this.rotateMouseDownEventListener), this.shape.rotateBox.removeEventListener(h.SHAPE_MOVE_START, this.rotatePointDragStartEventListener), this.shape.rotateBox.removeEventListener(h.SHAPE_MOVE_START, this.rotatePointDragEndEventListener));
    for (let i in this.subscriptions)
      this.subscriptions[i].forEach((e) => n.unsubscribe(i, e)), this.subscriptions[i] = [];
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
  SHAPE_MOUSE_CLICK: "click",
  SHAPE_DESTROY: "destroy",
  POINT_DRAG_START: "point_drag_start",
  POINT_DRAG_END: "point_drag_end"
};
function Y() {
  this.shapes = [], this.activeShape = null, this.draggedShape = null, this.containerEventListeners = [], this.init = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    n.subscribe(h.SHAPE_CREATE, this.onShapeCreated), n.subscribe(h.SHAPE_DESTROY, this.onShapeDestroy), n.subscribe(h.SHAPE_MOVE_START, this.onShapeMoveStart), n.subscribe(h.SHAPE_MOUSE_ENTER, this.onShapeMouseEnter), n.subscribe(p.POINT_DRAG_START, this.onPointDragStart), n.subscribe(p.POINT_DRAG_END, this.onPointDragEnd), window.addEventListener("resize", this.onWindowResize);
  }, this.onWindowResize = (t) => {
    this.shapes.forEach((i) => {
      n.emit(
        v.CONTAINER_BOUNDS_CHANGED,
        i,
        { bounds: i.getBounds(), points: i.points }
      );
    });
  }, this.onShapeCreated = (t) => {
    const i = t.target;
    c(i.root) && !this.getShape(i) && (this.shapes.push(i), this.activeShape = i, this.getShapesByContainer(i.root).length === 1 && this.addContainerEvents(i));
  }, this.onShapeDestroy = (t) => {
    const i = t.target, s = i.root;
    !c(i.root) || !this.getShape(i) || (this.shapes.splice(this.shapes.indexOf(i), 1), this.getShapesByContainer(s).length === 0 && this.containerEventListeners.filter((e) => e.container === s).forEach((e) => {
      e.container.removeEventListener(e.name, e.listener), this.containerEventListeners.splice(this.containerEventListeners.indexOf(e), 1);
    }));
  }, this.onShapeMoveStart = (t) => {
    if (!this.getShapeByGuid(t.target.guid) || !t.target.options.managed)
      return;
    this.activeShape = t.target, this.draggedShape = t.target;
    const i = t.target.getRootParent();
    i && (this.draggedShape = i, this.activeShape = i), this.shapes.filter((s) => s.guid !== t.target.guid && s.options.displayMode !== a.DEFAULT).forEach((s) => s.switchDisplayMode(a.DEFAULT));
  }, this.onShapeMouseEnter = (t) => {
    !this.draggedShape || t.buttons !== 1 && (this.draggedShape.draggedPoint = null, this.draggedShape = null);
  }, this.onPointDragStart = (t) => {
    const i = this.findShapeByPoint(t.target);
    if (i) {
      this.draggedShape = i;
      const s = i.getRootParent();
      s && (this.draggedShape = s), this.draggedShape.draggedPoint = t.target;
    }
  }, this.onPointDragEnd = (t) => {
    this.draggedShape && (this.draggedShape.draggedPoint = null), this.draggedShape = null;
  }, this.findShapeByPoint = (t) => {
    for (let i of this.shapes)
      if (i.isShapePoint(t))
        return i;
    return null;
  }, this.getShape = (t) => this.getShapeByGuid(t.guid), this.getShapeByGuid = (t) => this.shapes.find((i) => i.guid === t), this.getShapesByContainer = (t) => this.shapes.filter((i) => i.root === t), this.addContainerEvents = (t) => {
    this.addContainerEvent(t.root, "mousemove", this.mousemove), this.addContainerEvent(t.root, "mouseup", this.mouseup), this.addContainerEvent(t.root, "dblclick", this.doubleclick), this.checkCanDeletePoints(t), n.emit(X.MANAGER_ADD_CONTAINER_EVENT_LISTENERS, t.root);
  }, this.addContainerEvent = (t, i, s) => {
    this.containerEventListeners.find((e) => e.container === t && e.name === i) || (t.addEventListener(i, s), this.containerEventListeners.push({ id: t.id, container: t, name: i, listener: s }));
  }, this.mouseup = (t) => {
    if (!this.draggedShape)
      return;
    const i = this.draggedShape;
    t.buttons === 1 && i.options.canAddPoints && !i.draggedPoint && (i.options.maxPoints === -1 || i.points.length < i.options.maxPoints) && i.addPoint(
      t.clientX - i.root.offsetLeft,
      t.clientY - i.root.offsetTop
    ), i.draggedPoint && (i.draggedPoint.mouseup(t), i.draggedPoint = null), this.draggedShape = null, n.emit(h.SHAPE_MOVE_END, i);
  }, this.mousemove = (t) => {
    if (t.buttons !== 1) {
      this.draggedShape = null;
      return;
    }
    if (this.draggedShape) {
      if (t.buttons !== 1) {
        this.draggedShape.draggedPoint = null, this.draggedShape = null;
        return;
      }
      this.draggedShape.eventListener.mousemove(t);
    }
  }, this.doubleclick = (t) => {
    t.stopPropagation(), !!this.activeShape && this.activeShape.options.canAddPoints && !this.activeShape.draggedPoint && (this.activeShape.options.maxPoints === -1 || this.activeShape.points.length < this.activeShape.options.maxPoints) && this.activeShape.addPoint(
      t.clientX - this.activeShape.root.offsetLeft + window.scrollX,
      t.clientY - this.activeShape.root.offsetTop + window.scrollY,
      { forceDisplay: !0 }
    );
  }, this.checkCanDeletePoints = (t) => {
    t.points.find((i) => i.options.canDelete === !0) && this.addContainerEvent(t.root, "contextmenu", (i) => i.preventDefault());
  }, this.clear = () => {
    this.containerEventListeners.forEach(({ container: t, name: i, listener: s }) => {
      try {
        t.removeEventListener(i, s);
      } catch (e) {
        console.error(e);
      }
    }), this.containerEventListeners = [], this.shapes = [];
  };
}
const X = {
  MANAGER_ADD_CONTAINER_EVENT_LISTENERS: "manager_add_container_event_listeners",
  MANAGER_REMOVE_CONTAINER_EVENT_LISTENERS: "manager_remove_container_event_listeners"
}, v = {
  CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
}, x = new Y().init();
function q() {
  this.draw = (t) => {
    if (t.points.length < 1)
      return;
    t.svg && (t.eventListener.removeSvgEventListeners(), t.root.removeChild(t.svg), t.svg = null), t.calcPosition(), t.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), t.svg.ondragstart = function() {
      return !1;
    }, t.svg.id = t.options.id, t.svg.style.position = "absolute", t.svg.style.cursor = "crosshair", t.svg.style.left = t.left, t.svg.style.top = t.top, t.svg.setAttribute("width", t.width), t.svg.setAttribute("height", t.height), this.setupShapeFill(t), this.setupSVGFilters(t), t.svg.style.zIndex = t.options.zIndex;
    const i = this.drawPolygon(t);
    t.svg.appendChild(i), t.root.appendChild(t.svg), t.eventListener.setSvgEventListeners(), typeof t.options.visible < "u" && (t.svg.style.display = t.options.visible ? "" : "none"), t.points.forEach((s) => {
      s.options.zIndex < t.options.zIndex + 2 && (s.options.zIndex = t.options.zIndex + 2), t.options.visible || (s.options.visible = !1), s.redraw(), t.options.displayMode === a.DEFAULT && !s.options.forceDisplay && (s.element.style.display = "none");
    }), t.resizeBox && this.redrawResizeBox(t), t.rotateBox && this.redrawRotateBox(t);
  }, this.drawPolygon = (t) => {
    let i = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    t.points.length > 2 && (i = document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
    const s = t.points.map((e) => "" + (e.x - t.left) + "," + (e.y - t.top)).join(" ");
    return i.setAttribute("points", s), this.setupPolygonStroke(t, i), this.setupPolygonFill(t, i), this.setupPolygonStyles(t, i), t.svg.querySelector("defs") && t.svg.querySelector("defs").querySelector("filter") && (i.style.filter = 'url("#' + t.guid + '_filter")'), i.style.zIndex = t.options.zIndex, i;
  }, this.redrawResizeBox = (t) => {
    const i = t.getResizeBoxBounds();
    t.resizeBox.left = i.left, t.resizeBox.top = i.top, t.resizeBox.width = i.width, t.resizeBox.height = i.height, t.resizeBox.redraw();
  }, this.redrawRotateBox = (t) => {
    const i = t.getResizeBoxBounds();
    t.rotateBox.left = i.left, t.rotateBox.top = i.top, t.rotateBox.width = i.width, t.rotateBox.height = i.height, t.rotateBox.redraw();
  }, this.setupShapeFill = (t) => {
    if (t.options.fillImage && typeof t.options.fillImage == "object") {
      const i = document.createElementNS(t.svg.namespaceURI, "defs"), s = this.createImageFill(t);
      s && i.appendChild(s), t.svg.appendChild(i);
    } else if (t.options.fillGradient && typeof t.options.fillGradient == "object" && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1) {
      const i = document.createElementNS(t.svg.namespaceURI, "defs"), s = this.createGradient(t);
      i.appendChild(s), t.svg.appendChild(i);
    }
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
      const r = document.createElementNS(t.svg.namespaceURI, "stop");
      r.setAttribute("offset", o.offset), r.setAttribute("stop-color", o.stopColor), r.setAttribute("stop-opacity", o.stopOpacity), i.appendChild(r);
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
    for (let o in s)
      e.setAttribute(o, s[o].toString()), o === "dx" && t.svg.setAttribute("width", t.width + parseInt(s.dx) * 2), o === "dy" && t.svg.setAttribute("height", t.height + parseInt(s.dy) * 2);
    return e;
  }, this.setupPolygonStroke = (t, i) => {
    c(t.options.stroke) && i.setAttribute("stroke", t.options.stroke), c(t.options.strokeWidth) && i.setAttribute("stroke-width", t.options.strokeWidth), c(t.options.strokeLinecap) && i.setAttribute("stroke-linecap", t.options.strokeLinecap), c(t.options.strokeDasharray) && i.setAttribute("stroke-dasharray", t.options.strokeDasharray);
  }, this.setupPolygonFill = (t, i) => {
    t.options.fillImage && typeof t.options.fillImage == "object" ? i.setAttribute("fill", 'url("#' + t.guid + '_pattern")') : t.options.fillGradient && typeof t.options.fillGradient == "object" && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1 ? i.setAttribute("fill", 'url("#' + t.guid + '_gradient")') : t.options.fill && i.setAttribute("fill", t.options.fill), c(t.options.fillOpacity) && i.setAttribute("fill-opacity", t.options.fillOpacity);
  }, this.setupPolygonStyles = (t, i) => {
    if (t.options.classes && i.setAttribute("class", t.options.classes), c(t.options.style) && typeof t.options.style == "object")
      for (let s in t.options.style)
        i.style[s] = t.options.style[s];
  };
}
const $ = new q();
function tt(t) {
  this.shape = t, this.children = [], this.parent = {}, this.init = () => {
    for (let i in this)
      typeof this[i] != "function" || i === "init" || (typeof this.shape[i] == "function" && (this.parent[i] = this.shape[i]), this.shape[i] = this[i]);
    return this;
  }, this.addChild = (i) => {
    !this.shouldAddChild(i) || this.children.push(i);
  }, this.removeChild = (i) => {
    this.children.splice(this.children.indexOf(i), 1);
  }, this.getChildren = (i = !1) => {
    if (!i)
      return this.children;
    const s = [];
    s.push(...this.children);
    for (let e of s)
      s.push(...e.getChildren());
    return s;
  }, this.shouldAddChild = (i) => !i || typeof i != "object" || typeof i.getChildren > "u" || this.children.indexOf(i) !== -1 ? !1 : i === this.shape ? void 0 : i.getChildren().indexOf(this.shape) !== -1 || i.getParent() ? !1 : this.getParentsList().indexOf(i) === -1, this.getParent = () => {
    const i = x.shapes;
    for (let s of i)
      if (s.getChildren().indexOf(this.shape) !== -1)
        return s;
    return null;
  }, this.getRootParent = () => {
    const i = this.getParentsList();
    return i.length ? i[i.length - 1] : null;
  }, this.getParentsList = (i = []) => {
    const s = this.getParent();
    return s == null ? i : (i.push(s), s.getParentsList(i));
  }, this.getPosition = (i = !1) => {
    const s = this.parent.getPosition();
    if (!i)
      return s;
    const e = this.getChildren(!0);
    return e.push(this.shape), s.left = e.map((o) => o.left).reduce((o, r) => r < o ? r : o), s.top = e.map((o) => o.top).reduce((o, r) => r < o ? r : o), s.right = e.map((o) => o.right).reduce((o, r) => r > o ? r : o), s.bottom = e.map((o) => o.bottom).reduce((o, r) => r > o ? r : o), s.width = s.right - s.left || 1, s.height = s.bottom - s.top || 1, s;
  };
}
function P() {
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
    displayMode: a.DEFAULT,
    managed: !0
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = m(), this.resizeBox = null, this.rotateBox = null, this.initCenter = null, this.init = (t, i = null, s = null) => {
    if (!t) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    if (x.getShape(this)) {
      console.error("This shape already initialized");
      return;
    }
    return this.root = t, this.root.style.position = "relative", this.setOptions(i), this.eventListener = new D(this), this.groupHelper = new tt(this).init(), this.setupPoints(s, Object.assign({}, this.options.pointOptions)), this.eventListener.run(), this.applyDisplayMode(), n.emit(h.SHAPE_CREATE, this, {}), this;
  }, this.setOptions = (t) => {
    !t || typeof t != "object" || (t.pointOptions = E(this.options.pointOptions, t.pointOptions), t.style = E(this.options.style, t.style), t.bounds = E(this.options.bounds, t.bounds), c(t.visible) && t.visible !== this.options.visible && (this.points.forEach((i) => i.options.visible = t.visible), this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: t.visible } }), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: t.visible } })), this.options = E(this.options, t), this.points.forEach((i) => {
      i.setOptions(E({}, this.options.pointOptions)), i.options.bounds = this.getBounds(), i.options.zIndex <= this.options.zIndex && (i.options.zIndex = this.options.zIndex + 1), i.redraw();
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
    !s || !Object.keys(s).length ? s = Object.assign({}, this.options.pointOptions) || {} : s = E(Object.assign({}, this.options.pointOptions), s), s.bounds = this.getBounds(), s.zIndex = this.options.zIndex + 1;
    const e = new z();
    return this.points.push(e), e.init(t, i, s), this.root.appendChild(e.element), e;
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
  }, this.moveTo = (t, i, s = !0) => {
    const e = this.getBounds(), o = this.getPosition(!0);
    let r = t + o.width > e.right ? e.right - o.width : t, d = i + o.height > e.bottom ? e.bottom - o.height : i;
    this.moveBy(r - o.left, d - o.top, s), this.calcPosition();
  }, this.moveBy = (t, i, s = !0) => {
    for (let o in this.points)
      this.points[o].x += t, this.points[o].y += i, this.points[o].redraw();
    this.calcPosition();
    const e = this.getChildren(!0);
    e.length && (s && this.redraw(), e.forEach((o) => {
      o.moveBy(t, i), s && o.redraw();
    }));
  }, this.scaleTo = (t, i) => {
    const s = this.getBounds();
    this.calcPosition();
    const e = this.getPosition(!0);
    e.width >= 10 && t < 10 && (t = 10), e.height >= 10 && i < 10 && (i = 10);
    let o = e.left + t > s.right ? s.right - e.left : t, r = e.top + i > s.bottom ? s.bottom - e.top : i, d = o / e.width, l = r / e.height;
    this.points.forEach(
      (A) => {
        A.x = (A.x - e.left) * d + e.left, A.y = (A.y - e.top) * l + e.top;
      }
    ), this.getChildren(!0).forEach((A) => {
      A.points.forEach(
        (u) => {
          u.x = (u.x - e.left) * d + e.left, u.y = (u.y - e.top) * l + e.top;
        }
      ), A.calcPosition();
    }), this.getChildren(!0).forEach((A) => A.redraw()), this.calcPosition();
  }, this.rotateBy = (t, i = null, s = null, e = !1) => {
    this.calcPosition();
    const o = this.getPosition(!0);
    let [r, d] = this.getCenter(!0);
    const l = this.getRootParent();
    l && ([r, d] = l.getCenter(!0)), i || (i = r), s || (s = d), this.initCenter && ([i, s] = this.initCenter), !(e && (!this.isInBounds(..._(t, o.left, o.top, i, s)) || !this.isInBounds(..._(t, o.right, o.top, i, s)) || !this.isInBounds(..._(t, o.left, o.bottom, i, s)) || !this.isInBounds(..._(t, o.right, o.bottom, i, s)))) && (this.points.forEach((A) => A.rotateBy(t, i, s)), this.getChildren(!0).forEach((A) => {
      A.points.forEach((u) => u.rotateBy(t, i, s)), A.redraw();
    }));
  }, this.isInBounds = (t, i) => {
    const [s, e] = this.getMaxPointSize(), o = this.getBounds();
    return t >= o.left + s / 2 && t <= o.right - s / 2 && i >= o.top + e / 2 && i <= o.bottom - e / 2;
  }, this.redraw = () => {
    this.applyDisplayMode(), $.draw(this);
  }, this.applyDisplayMode = () => {
    this.options.displayMode === a.SCALE && this.options.canScale ? (this.rotateBox && this.rotateBox.hide(), !this.resizeBox && this.setupResizeBox(), this.resizeBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : this.options.displayMode === a.ROTATE && this.options.canRotate ? (this.resizeBox && this.resizeBox.hide(), !this.rotateBox && this.setupRotateBox(), this.rotateBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : (this.resizeBox && this.resizeBox.hide(), this.rotateBox && this.rotateBox.hide()), this.points.forEach((t) => {
      t.setOptions({ zIndex: this.options.zIndex + 1 }), t.redraw(), this.options.displayMode === a.DEFAULT && !t.options.forceDisplay && (t.element.style.display = "none");
    });
  }, this.switchDisplayMode = (t = null) => {
    t || (t = this.getNextDisplayMode()), (t === a.SCALE && !this.options.canScale || t === a.ROTATE && !this.options.canRotate || t === a.SELECTED && !this.points.filter((i) => i.options.canDrag).length) && (t = a.DEFAULT), this.options.displayMode = t, this.redraw();
  }, this.getNextDisplayMode = () => {
    let t;
    return this.options.displayMode === a.DEFAULT ? t = a.SELECTED : this.options.displayMode === a.SELECTED ? t = a.SCALE : this.options.displayMode === a.SCALE ? t = a.ROTATE : t = a.DEFAULT, t === a.SELECTED && !this.points.filter((i) => i.options.canDrag).length && (t = a.SCALE), t === a.SCALE && !this.options.canScale && (t = a.ROTATE), t === a.ROTATE && !this.options.canRotate && (t = a.DEFAULT), t;
  }, this.calcPosition = () => {
    !this.points.length || (this.left = this.points.map((t) => t.x).reduce((t, i) => i < t ? i : t), this.top = this.points.map((t) => t.y).reduce((t, i) => i < t ? i : t), this.right = this.points.map((t) => t.x).reduce((t, i) => i > t ? i : t), this.bottom = this.points.map((t) => t.y).reduce((t, i) => i > t ? i : t), this.width = this.right - this.left || 1, this.height = this.bottom - this.top || 1);
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
    if (n.emit(h.SHAPE_DESTROY, this, {}), this.eventListener && this.eventListener.destroy(), this.resizeBox && this.resizeBox.destroy(), this.rotateBox && this.rotateBox.destroy(), this.root && this.svg)
      try {
        this.root.removeChild(this.svg);
      } catch {
      }
    this.getChildren(!0).forEach((t) => t.destroy());
  }, this.setupResizeBox = () => {
    const t = this.getResizeBoxBounds();
    this.resizeBox = new M().init(this.root, t.left, t.top, t.width, t.height, {
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
    this.rotateBox = new T().init(this.root, t.left, t.top, t.width, t.height, {
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
    const i = this.getRootParent();
    i && (t = i.getPosition(!0));
    const [s, e] = this.getMaxPointSize(), o = {
      left: t.left - s,
      right: t.right + s,
      top: t.top - e,
      bottom: t.bottom + e,
      width: t.width + s * 2,
      height: t.height + e * 2
    };
    o.left < 0 && (this.moveBy(o.left * -1, t.top, !1), o.left = 0), o.top < 0 && (this.moveBy(t.left, o.top * -1, !1), o.top = 0);
    const r = this.getBounds();
    return o.bottom > r.bottom && (this.moveTo(t.left, o.bottom - r.bottom + t.top, !1), o.bottom = r.bottom), o.right > r.right && (this.moveTo(o.right - r.right + t.left, t.top, !1), o.bottom = r.bottom), o;
  }, this.getMaxPointSize = () => {
    if (!this.points.length)
      return [0, 0];
    const t = this.points.map((s) => s.options.width).reduce((s, e) => Math.max(s, e)), i = this.points.map((s) => s.options.height).reduce((s, e) => Math.max(s, e));
    return [t, i];
  }, this.getCenter = (t = !1) => {
    const i = this.getPosition(t);
    return [i.left + i.width / 2, i.top + i.height / 2];
  };
}
const a = {
  DEFAULT: "default",
  SELECTED: "selected",
  SCALE: "scale",
  ROTATE: "rotate"
};
function it(t) {
  this.resizeBox = t, this.subscriptions = {
    resize: []
  }, this.guid = m(), this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    n.subscribe(p.POINT_DRAG_MOVE, this.onPointDragMove), n.subscribe(p.POINT_DRAG_END, this.onPointDragMove), this.shapeMouseEnter = this.resizeBox.shape.addEventListener(h.SHAPE_MOUSE_ENTER, (i) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_ENTER, this.resizeBox, i);
      }, 1);
    }), this.shapeMouseMove = this.resizeBox.shape.addEventListener(h.SHAPE_MOUSE_MOVE, (i) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_MOVE, this.resizeBox, i);
      }, 1);
    }), this.shapeMoveStart = this.resizeBox.shape.addEventListener(h.SHAPE_MOVE_START, (i) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOVE_START, this.resizeBox, i);
      }, 1);
    }), this.shapeMoveEnd = this.resizeBox.shape.addEventListener(h.SHAPE_MOVE_END, (i) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOVE_END, this.resizeBox, i);
      }, 1);
    }), this.shapeMove = this.resizeBox.shape.addEventListener(h.SHAPE_MOVE, (i) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOVE, this.resizeBox, i);
      }, 1);
    }), this.shapeClick = this.resizeBox.shape.addEventListener(h.SHAPE_MOUSE_CLICK, (i) => {
      setTimeout(() => {
        n.emit(h.SHAPE_MOUSE_CLICK, this.resizeBox, i);
      }, 1);
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
    this.resizeBox.redraw(), n.emit(S.RESIZE_BOX_RESIZE, this.resizeBox, { oldPos: s, newPos: e });
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
    const e = n.subscribe(i, (o) => {
      o.target.guid && o.target.guid === this.resizeBox.guid && s(o);
    });
    return this.subscriptions[i].push(e), e;
  }, this.removeEventListener = (i, s) => {
    this.subscriptions[i].splice(this.subscriptions[i].indexOf(s), 1), n.unsubscribe(i, s);
  }, this.destroy = () => {
    for (let i in this.subscriptions)
      this.subscriptions[i].forEach((e) => n.unsubscribe(i, e)), this.subscriptions[i] = [];
    this.resizeBox.shape.removeEventListener(h.SHAPE_MOVE_START, this.shapeMoveStart), this.resizeBox.shape.removeEventListener(h.SHAPE_MOVE, this.shapeMove), this.resizeBox.shape.removeEventListener(h.SHAPE_MOVE_END, this.shapeMoveEnd), this.resizeBox.shape.removeEventListener(h.SHAPE_MOUSE_ENTER, this.shapeMouseEnter), this.resizeBox.shape.removeEventListener(h.SHAPE_MOUSE_MOVE, this.shapeMouseMove), this.resizeBox.shape.removeEventListener(h.SHAPE_MOUSE_CLICK, this.shapeClick), n.unsubscribe(p.POINT_DRAG_MOVE, this.onPointDragMove), n.unsubscribe(p.POINT_DRAG_END, this.onPointDragMove);
  };
}
function M() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = m(), this.options = {
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
  }, this.eventListener = null, this.left_top = null, this.left_center = null, this.left_bottom = null, this.center_top = null, this.center_bottom = null, this.right_top = null, this.right_center = null, this.right_bottom = null, this.init = (t, i, s, e, o, r = {}) => (this.left = parseInt(i), this.top = parseInt(s), this.width = parseInt(e), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(r), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new P().init(t, Object.assign({}, this.options.shapeOptions), []), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new it(this).run(), this.redraw(), n.emit(h.SHAPE_CREATE, this, {}), this), this.setOptions = (t = {}) => {
    !t || typeof t != "object" || (t.shapeOptions && typeof t.shapeOptions == "object" ? (t.shapeOptions.pointOptions && typeof t.shapeOptions.pointOptions == "object" ? t.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions, t.shapeOptions.pointOptions) : t.shapeOptions.pointOptions = Object.assign({}, this.options.shapeOptions.pointOptions), t.shapeOptions = Object.assign(this.options.shapeOptions, t.shapeOptions)) : t.shapeOptions = Object.assign({}, this.options.shapeOptions), t.shapeOptions.zIndex = t.zIndex || this.options.zIndex, t.shapeOptions.id = t.id ? t.id : this.options.id, Object.assign(this.options, t), this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + J + "')" } }), this.center_top = this.shape.addPoint(this.left + this.width / 2, this.top, { id: this.shape.guid + "_center_top", style: { backgroundImage: "url('" + j + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + Z + "')" } }), this.right_center = this.shape.addPoint(this.right, this.top + this.height / 2, { id: this.shape.guid + "_right_center", style: { backgroundImage: "url('" + Q + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + W + "')" } }), this.center_bottom = this.shape.addPoint(this.left + this.width / 2, this.bottom, { id: this.shape.guid + "_center_bottom", style: { backgroundImage: "url('" + G + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + F + "')" } }), this.left_center = this.shape.addPoint(this.left, this.top + this.height / 2, { id: this.shape.guid + "_left_center", style: { backgroundImage: "url('" + K + "')" } }), this.setPointsOptions();
  }, this.setPointsOptions = () => {
    this.setPointsMoveDirections(), this.setPointsMoveBounds();
  }, this.setPointsMoveDirections = () => {
    this.center_top.setOptions({ moveDirections: [g.TOP, g.BOTTOM] }), this.center_bottom.setOptions({ moveDirections: [g.TOP, g.BOTTOM] }), this.left_center.setOptions({ moveDirections: [g.LEFT, g.RIGHT] }), this.right_center.setOptions({ moveDirections: [g.LEFT, g.RIGHT] });
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
  }, this.addEventListener = (t, i) => this.eventListener.addEventListener(t, i), this.removeEventListener = (t, i) => {
    this.eventListener.removeEventListener(t, i);
  };
}
const S = {
  RESIZE_BOX_RESIZE: "resize"
};
try {
  window.ResizeBox = M, window.SmartShape = P, window.RotateBox = T, window.SmartShapeManager = x;
} catch {
}
export {
  M as ResizeBox,
  T as RotateBox,
  P as SmartShape,
  x as SmartShapeManager
};
