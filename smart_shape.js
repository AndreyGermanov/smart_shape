const S = (t, s = !0) => {
  let i = 0, e = 0;
  if (!s)
    return { top: t.offsetTop - t.scrollTop, left: t.offsetLeft - t.scrollLeft };
  for (; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop); )
    i += t.offsetLeft - t.scrollLeft, e += t.offsetTop - t.scrollTop, t = t.offsetParent;
  return { top: e, left: i };
}, _ = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
  const s = Math.random() * 16 | 0;
  return (t === "x" ? s : s & 3 | 8).toString(16);
}).replace(/-/g, ""), P = (t) => {
  try {
    t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1;
  } catch {
  }
  return !1;
}, M = (t) => t * (Math.PI / 180), D = (t) => t * (180 / Math.PI), b = (t, s, i, e, o) => {
  const r = M(t), p = (s - e) * Math.cos(r) - (i - o) * Math.sin(r) + e, A = (s - e) * Math.sin(r) + (i - o) * Math.cos(r) + o;
  return [p, A];
}, c = (t, s, i, e) => Math.sqrt(Math.pow(i - t, 2) + Math.pow(e - s, 2)), u = (t) => typeof t < "u" && t !== null, f = (t, s) => t && typeof t == "object" && s && typeof s == "object" ? Object.assign(t, s) : t;
function w() {
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
const h = new w(), E = (t, s = {}) => {
  const i = {};
  for (let e in t)
    e !== "type" && e !== "target" && (i[e] = t[e]);
  return Object.keys(s).forEach((e) => {
    i[e] = s[e];
  }), i;
}, I = (t) => [t.clientX + window.scrollX, t.clientY + window.scrollY];
function L(t) {
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
      s.mousemove = this.mousemove, s.mouseDownListener = s.addEventListener(a.POINT_DRAG_START, (i) => {
        this.onPointMouseDown(i);
      }), s.mouseUpListener = s.addEventListener(a.POINT_DRAG_END, (i) => {
        this.onPointMouseUp(i);
      });
    });
  }, this.mousemove = (s) => {
    if (s.buttons !== 1) {
      this.rotateBox.shape.root.draggedShape && (this.rotateBox.shape.root.draggedShape.draggedPoint = null, this.rotateBox.shape.root.draggedShape = null), h.emit(n.SHAPE_MOUSE_MOVE, this.rotateBox.shape, { clientX: s.clientX, clientY: s.clientY });
      return;
    }
    const [i, e] = I(s), [o, r] = this.rotateBox.shape.getCenter();
    let p = this.calcAngle(i, e, o, r);
    if (p === null)
      return;
    let A = p;
    this.previousAngle && (A -= this.previousAngle), this.previousAngle = p, h.emit(O.ROTATE_BOX_ROTATE, this.rotateBox, { angle: Math.round(A) });
  }, this.calcAngle = (s, i, e, o) => {
    const r = this.calcHypotenuse(s, i, e, o);
    if (r <= 0)
      return null;
    const p = this.calcCathetus(s, i, e, o), A = this.calcStartAngle(s, i, e, o);
    return Math.round(D(Math.asin(p / r)) + A + this.initialAngle);
  }, this.calcHypotenuse = (s, i, e, o) => c(s, i, e, o), this.calcCathetus = (s, i, e, o) => {
    if (s <= e && i <= o)
      return c(s, i, s, o);
    if (s > e && i < o)
      return c(s, i, e, i);
    if (s > e && i > o)
      return c(s, i, s, o);
    if (s < e && i > o)
      return c(s, i, e, i);
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
      s.removeEventListener(a.POINT_DRAG_START, s.mouseDownListener), s.removeEventListener(a.POINT_DRAG_START, s.mouseUpListener);
    });
  };
}
const z = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECcZZuWhdAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlZBBEsAgCAMT/v/n7akzWAFtTo5mQ8SAJtkGcL4LXcg211A2L+eq3jc5C/AGTUBZ7wYAHH+B4yIAv8a8dkvilLz9qXuYKseU2E7qDFODqIwTIEkPSldAAa0WlbUAAAAASUVORK5CYII=", C = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECgYlnqNLQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABZSURBVCjPlZFBCgAxCANN/v/n2VOhiFU3N4U4GgXELUkAikbOhlhIh1QZXkR3hGc/IsaVMtHT0RXR3e5jescIqBpy05T/tInffw2AvEkr972N+a69+U8e8AGOtEABr4X+4AAAAABJRU5ErkJggg==", U = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECkWaNmRawAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABjSURBVCjPlZBRDsAgCENbsnt6/1N0P2ocijASEy08iqC1BknhASCvsSeOQXImJXHcrQL4t1UAr4fjReDmdCsc/5LEZ7NOwOlUKVy3RwC/AAAwL2TAZ3t+xFszOxVl7lbtvsYLOtlZCOj2NccAAAAASUVORK5CYII=", V = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECoXNPPyPgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlVFBEgAhCAL+/2f21I5jqcXFGRMSpG1EkLRtooEyIdaRlAc7orqBsg+gVKy8yTYn49vqMb0pgCUuPOBP93Sniaxb8/FdL6mt/rZe5SMKXQWRf/4AYrs6C0ViuwUAAAAASUVORK5CYII=", N = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDsHep3BSgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA8SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCAZy0h4AXLILDAEWNOwAAAAASUVORK5CYII=", k = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDMMJZaSygAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA/SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCJxAWZoFp1MBY8cLTv/x72kAAAAASUVORK5CYII=", H = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQARsznxFAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", G = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQEbSvcpSwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA3SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTCICjCTbxPJfsIWSv+JECM9nugHAG40DyW1OoLPAAAAAElFTkSuQmCC", j = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDIpd4l3zAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", F = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDYr/evT5AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", K = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDUsSKIVhAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA0SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTBQZBPJfsIWSv+JECM9nugHADv6Dv2P6G4ZAAAAAElFTkSuQmCC", J = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDQQftZYQgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==";
function y() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = _(), this.options = {
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
  }, this.eventListener = null, this.left_top = null, this.left_bottom = null, this.right_top = null, this.right_bottom = null, this.init = (t, s, i, e, o, r = {}) => (this.left = parseInt(s), this.top = parseInt(i), this.width = parseInt(e), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(r), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new v().init(t, Object.assign({}, this.options.shapeOptions), []), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new L(this).run(), this.redraw(), h.emit(n.SHAPE_CREATE, this, {}), this), this.setOptions = (t = {}) => {
    !t || typeof t != "object" || (t.shapeOptions && typeof t.shapeOptions == "object" ? (t.shapeOptions.pointOptions && typeof t.shapeOptions.pointOptions == "object" ? t.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions, t.shapeOptions.pointOptions) : t.shapeOptions.pointOptions = Object.assign({}, this.options.shapeOptions.pointOptions), t.shapeOptions = Object.assign(this.options.shapeOptions, t.shapeOptions)) : t.shapeOptions = Object.assign({}, this.options.shapeOptions), t.shapeOptions.zIndex = t.zIndex || this.options.zIndex, t.shapeOptions.id = t.id ? t.id : this.options.id, Object.assign(this.options, t), this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + z + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + C + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + U + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + V + "')" } });
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
const O = {
  ROTATE_BOX_ROTATE: "rotate"
};
function R(t) {
  this.shape = t, this.subscriptions = {
    CONTAINER_BOUNDS_CHANGED: []
  }, this.run = () => (this.shape = t, this.setEventListeners(), this), this.setEventListeners = () => {
    this.shape.root.getAttribute("sh_listeners") !== "true" && (this.shape.root.setAttribute("sh_listeners", "true"), this.shape.root.addEventListener("mousemove", (s) => {
      this.shape.root.draggedShape && this.shape.root.draggedShape.eventListener.mousemove(s);
    }), this.shape.root.addEventListener("mouseup", this.mouseup), this.shape.root.addEventListener("dblclick", this.doubleclick), this.shape.root.addEventListener("mouseenter", this.mouseenter), this.checkCanDeletePoints()), window.addEventListener("resize", this.onWindowResize), h.subscribe(a.POINT_ADDED, this.onPointAdded), h.subscribe(a.POINT_DRAG_START, this.onPointDragStart), h.subscribe(a.POINT_DRAG_MOVE, this.onPointDragMove), h.subscribe(a.POINT_DRAG_END, this.onPointDragEnd), h.subscribe(a.POINT_DESTROYED, this.onPointDestroyed);
  }, this.setSvgEventListeners = () => {
    t.svg.addEventListener("mousedown", this.mousedown), t.svg.addEventListener("mouseenter", this.mouseenter), t.svg.addEventListener("mouseover", this.mouseover), t.svg.addEventListener("mouseout", this.mouseout), t.svg.addEventListener("click", this.click);
  }, this.removeSvgEventListeners = () => {
    t.svg.removeEventListener("mousedown", this.mousedown), t.svg.removeEventListener("mouseenter", this.mouseenter), t.svg.removeEventListener("mouseover", this.mouseover), t.svg.removeEventListener("mouseout", this.mouseout), t.svg.removeEventListener("click", this.click);
  }, this.addResizeEventListener = () => {
    !this.shape.resizeBox || (this.resizeBoxListener = this.shape.resizeBox.addEventListener(x.RESIZE_BOX_RESIZE, (s) => {
      const i = s.newPos.left - s.oldPos.left, e = s.newPos.top - s.oldPos.top;
      this.shape.moveTo(this.shape.left + i, this.shape.top + e);
      const [o, r] = this.shape.getMaxPointSize();
      this.shape.scaleTo(s.newPos.width - o * 2, s.newPos.height - r * 2), this.shape.redraw();
    }), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(n.SHAPE_MOVE_START, (s) => {
      this.mousedown(s);
    }), this.resizeMouseMoveEventListener = this.shape.resizeBox.addEventListener(n.SHAPE_MOUSE_MOVE, (s) => {
      this.mousemove(s);
    }), this.resizeClickEventListener = this.shape.resizeBox.addEventListener(n.SHAPE_MOUSE_CLICK, (s) => {
      this.click(s);
    }));
  }, this.addRotateEventListener = () => {
    !this.shape.rotateBox || (this.rotateBoxListener = this.shape.rotateBox.addEventListener(O.ROTATE_BOX_ROTATE, (s) => {
      this.shape.rotateBy(s.angle), this.shape.redraw();
    }), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(n.SHAPE_MOVE_START, (s) => {
      this.mousedown(s);
    }), this.rotateMouseMoveEventListener = this.shape.rotateBox.addEventListener(n.SHAPE_MOUSE_MOVE, (s) => {
      this.mousemove(s);
    }), this.rotateClickEventListener = this.shape.rotateBox.addEventListener(n.SHAPE_MOUSE_CLICK, (s) => {
      this.click(s);
    }));
  }, this.mouseup = (s) => {
    if (this.shape.root.draggedShape) {
      const i = this.shape.root.draggedShape;
      s.buttons === 1 && i.options.canAddPoints && !i.draggedPoint && (i.options.maxPoints === -1 || i.points.length < i.options.maxPoints) && i.addPoint(
        s.clientX - i.root.offsetLeft,
        s.clientY - i.root.offsetTop
      ), this.shape.root.draggedShape.draggedPoint && (this.shape.root.draggedShape.draggedPoint.mouseup(s), this.shape.root.draggedShape && (this.shape.root.draggedShape.draggedPoint = null)), this.shape.root.draggedShape = null, h.emit(n.SHAPE_MOVE_END, i);
    }
  }, this.doubleclick = (s) => {
    s.stopPropagation(), this.shape.options.canAddPoints && !this.shape.draggedPoint && (this.shape.options.maxPoints === -1 || this.shape.points.length < this.shape.options.maxPoints) && this.shape.addPoint(
      s.clientX - this.shape.root.offsetLeft + window.scrollX,
      s.clientY - this.shape.root.offsetTop + window.scrollY,
      { forceDisplay: !0 }
    );
  }, this.mousedown = (s) => {
    P(s), (s.buttons === 1 || s.type === n.SHAPE_MOVE_START) && (this.shape.root.draggedShape = this.shape, h.emit(n.SHAPE_MOVE_START, this.shape, E(s)));
  }, this.mousemove = (s) => {
    if (this.shape.draggedPoint || h.emit(n.SHAPE_MOUSE_MOVE, this.shape, E(s)), s.buttons !== 1) {
      this.shape.root.draggedShape && (this.shape.root.draggedShape.draggedPoint = null, this.shape.root.draggedShape = null);
      return;
    }
    if (this.shape.draggedPoint) {
      this.shape.draggedPoint.mousemove(s);
      return;
    }
    if (!this.shape.options.canDragShape)
      return;
    const [i, e] = this.calcMovementOffset(s);
    if (i === null || e === null)
      return;
    const o = this.shape.getPosition();
    for (let p in this.shape.points)
      this.shape.points[p].x += i, this.shape.points[p].y += e, this.shape.points[p].redraw();
    this.shape.redraw();
    const r = this.shape.getPosition();
    h.emit(n.SHAPE_MOVE, this.shape, { oldPos: o, newPos: r });
  }, this.mouseenter = (s) => {
    h.emit(n.SHAPE_MOUSE_ENTER, this.shape, { clientX: s.clientX, clientY: s.clientY }), s.buttons !== 1 && (this.shape.root.draggedShape && (this.shape.root.draggedShape.draggedPoint = null), this.shape.root.draggedShape = null);
  }, this.mouseover = (s) => {
    const i = E(s);
    h.emit(n.SHAPE_MOUSE_OVER, this.shape, i);
  }, this.mouseout = (s) => {
    const i = E(s);
    h.emit(n.SHAPE_MOUSE_OUT, this.shape, i);
  }, this.click = (s) => {
    if (this.shape.switchDisplayMode(), s.type !== R.SHAPE_MOUSE_CLICK) {
      const i = E(s);
      h.emit(n.SHAPE_MOUSE_CLICK, this.shape, i);
    }
  }, this.calcMovementOffset = (s) => {
    this.shape.calcPosition();
    let i = s.movementX, e = s.movementY, o = s.clientX + window.scrollX, r = s.clientY + window.scrollY;
    const p = this.shape.left + i, A = this.shape.top + e, g = S(this.shape.root, !0), m = this.shape.getBounds();
    return p < m.left || p + this.shape.width > m.right ? [null, null] : A < m.top || A + this.shape.height > m.bottom ? [null, null] : (o < p + g.left && (i = o - (p + g.left)), r < A + g.top && (e = r - (A + g.top)), o > p + this.shape.width + g.left && (i = o - (this.shape.width + g.left + this.shape.left)), r > A + this.shape.height + g.right && (e = r - (this.shape.height + g.top + this.shape.top)), [i, e]);
  }, this.onPointAdded = (s) => {
    this.checkCanDeletePoints();
  }, this.checkCanDeletePoints = () => {
    this.shape.points.find((s) => s.options.canDelete === !0) && (this.nocontextmenu = this.shape.root.addEventListener("contextmenu", (s) => s.preventDefault()));
  }, this.onPointDragStart = (s) => {
    !this.shape.isShapePoint(s.target) || (this.shape.root.draggedShape = this.shape, this.shape.draggedPoint = s.target);
  }, this.onPointDragMove = (s) => {
    !this.shape.isShapePoint(s.target) || this.shape.redraw();
  }, this.onPointDragEnd = (s) => {
    !this.shape.isShapePoint(s.target) || (this.shape.root.draggedShape = null, this.shape.draggedPoint = null);
  }, this.onPointDestroyed = (s) => {
    !this.shape.isShapePoint(s.target) || (this.shape.points.splice(this.shape.points.indexOf(s.target), 1), this.shape.root.removeChild(s.target.element), this.shape.redraw());
  }, this.onWindowResize = (s) => {
    h.emit(
      B.CONTAINER_BOUNDS_CHANGED,
      this.shape,
      { bounds: this.shape.getBounds(), points: this.shape.points }
    );
  }, this.addEventListener = (s, i) => {
    typeof this.subscriptions[s] > "u" && (this.subscriptions[s] = []);
    const e = h.subscribe(s, (o) => {
      o.target.guid === this.shape.guid && i(o);
    });
    return this.subscriptions[s].push(e), e;
  }, this.removeEventListener = (s, i) => {
    this.subscriptions[s].splice(this.subscriptions[s].indexOf(i), 1), h.unsubscribe(s, i);
  }, this.destroy = () => {
    this.shape.options.canDeletePoints && this.shape.root.removeEventListener("contextmenu", this.nocontextmenu), window.removeEventListener("resize", this.onWindowResize), h.unsubscribe(a.POINT_ADDED, this.onPointAdded), h.unsubscribe(a.POINT_DRAG_START, this.onPointDragStart), h.unsubscribe(a.POINT_DRAG_MOVE, this.onPointDragMove), h.unsubscribe(a.POINT_DRAG_END, this.onPointDragEnd), h.unsubscribe(a.POINT_DESTROYED, this.onPointDestroyed), this.shape.resizeBox && (this.shape.resizeBox.removeEventListener(x.RESIZE_BOX_RESIZE, this.resizeBoxListener), this.shape.resizeBox.removeEventListener(n.SHAPE_MOUSE_CLICK, this.resizeClickEventListener), this.shape.resizeBox.removeEventListener(n.SHAPE_MOUSE_MOVE, this.resizeMouseMoveEventListener), this.shape.resizeBox.removeEventListener(n.SHAPE_MOVE_START, this.resizeMouseDownEventListener)), this.shape.rotateBox && (this.shape.rotateBox.removeEventListener(O.ROTATE_BOX_ROTATE, this.rotateBoxListener), this.shape.rotateBox.removeEventListener(n.SHAPE_MOUSE_CLICK, this.rotateClickEventListener), this.shape.rotateBox.removeEventListener(n.SHAPE_MOUSE_MOVE, this.rotateMouseMoveEventListener), this.shape.rotateBox.removeEventListener(n.SHAPE_MOVE_START, this.rotateMouseDownEventListener));
    for (let s in this.subscriptions)
      this.subscriptions[s].forEach((e) => h.unsubscribe(s, e)), this.subscriptions[s] = [];
  };
}
const B = {
  CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
}, n = {
  SHAPE_CREATE: "create",
  SHAPE_MOVE_START: "move_start",
  SHAPE_MOVE: "move",
  SHAPE_MOVE_END: "move_end",
  SHAPE_MOUSE_MOVE: "mousemove",
  SHAPE_MOUSE_ENTER: "mouseenter",
  SHAPE_MOUSE_OVER: "mouseover",
  SHAPE_MOUSE_OUT: "mouseout",
  SHAPE_MOUSE_CLICK: "click",
  SHAPE_DESTROY: "destroy"
};
function W() {
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
      l.LEFT,
      l.TOP,
      l.RIGHT,
      l.BOTTOM
    ],
    visible: !0,
    forceDisplay: !1
  }, this.x = 0, this.y = 0, this.element = null, this.guid = _(), this.subscriptions = {}, this.init = (t, s, i = null) => (this.x = parseInt(t), this.y = parseInt(s), this.element = this.createPointUI(), this.setOptions(i), this.setEventListeners(), h.emit(a.POINT_ADDED, this), this), this.setOptions = (t) => {
    t && typeof t == "object" && (t.style && typeof t.style == "object" && (t.style = Object.assign(this.options.style, t.style)), Object.assign(this.options, t)), this.options.id && (this.element.id = this.options.id);
  }, this.createPointUI = () => {
    const t = document.createElement("div");
    return this.options.canDrag ? this.setPointStyles(t) : t;
  }, this.setPointStyles = (t = null) => {
    if (t == null && (t = this.element), this.options.id && (this.element.id = this.options.id), t.className = this.options.classes, t.style = this.options.style, typeof this.options.style == "object")
      for (let s in this.options.style)
        t.style[s] = this.options.style[s];
    return t.style.width = this.options.width + "px", t.style.height = this.options.height + "px", t.style.left = this.x - parseInt(this.options.width / 2) + "px", t.style.top = this.y - parseInt(this.options.height / 2) + "px", t.style.zIndex = this.options.zIndex, !this.options.canDrag || !this.options.visible ? t.style.display = "none" : t.style.display = "", t;
  }, this.redraw = () => {
    this.element = this.setPointStyles();
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.rotateBy = (t, s, i) => {
    const [e, o] = b(t, this.x, this.y, s, i);
    this.x = e, this.y = o;
  }, this.setEventListeners = () => {
    this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown), h.subscribe(B.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange);
  }, this.mousedown = (t) => {
    t.buttons === 1 && this.options.canDrag && (h.emit(a.POINT_DRAG_START, this), P(t));
  }, this.mousemove = (t) => {
    if (h.emit(a.POINT_MOUSE_MOVE, this, { clientX: t.clientX, clientY: t.clientY }), t.buttons !== 1 || !this.options.canDrag)
      return;
    const s = this.x, i = this.y, e = S(this.element.parentNode, !0);
    if (!this.checkFitBounds(this.x + t.movementX, this.y + t.movementY)) {
      h.emit(a.POINT_DRAG_MOVE, this, { oldX: s, oldY: i });
      return;
    }
    let o = t.clientX + window.scrollX - e.left - this.options.width / 2, r = t.clientY + window.scrollY - e.top - this.options.height / 2;
    [o, r] = this.applyMoveRestrictions(o, r, s, i), this.x = o, this.y = r, this.element.style.left = this.x + "px", this.element.style.top = this.y + "px", h.emit(a.POINT_DRAG_MOVE, this, { oldX: s, oldY: i });
  }, this.checkFitBounds = (t, s) => !(this.options.bounds.left !== -1 && t < this.options.bounds.left || this.options.bounds.right !== -1 && t > this.options.bounds.right || this.options.bounds.top !== -1 && s < this.options.bounds.top || this.options.bounds.bottom !== -1 && s > this.options.bounds.bottom), this.applyMoveRestrictions = (t, s, i, e) => (s > e && this.options.moveDirections.indexOf(l.BOTTOM) === -1 && (s = e), s < e && this.options.moveDirections.indexOf(l.TOP) === -1 && (s = e), t > i && this.options.moveDirections.indexOf(l.RIGHT) === -1 && (t = i), t < i && this.options.moveDirections.indexOf(l.LEFT) === -1 && (t = i), t > this.options.bounds.right && (t = this.options.bounds.right), s > this.options.bounds.bottom && (s = this.options.bounds.bottom), t < this.options.bounds.left && (t = this.options.bounds.left), s < this.options.bounds.top && (s = this.options.bounds.top), [t, s]), this.mouseup = (t) => {
    h.emit(a.POINT_DRAG_END, this), t.button === 2 && this.options.canDelete && this.destroy();
  }, this.onBoundsChange = (t) => {
    t.points.find((s) => s === this) && (this.options.bounds = t.bounds);
  }, this.destroy = () => {
    this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), h.unsubscribe(B.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange), h.emit(a.POINT_DESTROYED, this);
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
const a = {
  POINT_ADDED: "create",
  POINT_DESTROYED: "destroy",
  POINT_DRAG_START: "move_start",
  POINT_DRAG_MOVE: "move",
  POINT_DRAG_END: "move_end",
  POINT_MOUSE_MOVE: "mousemove"
}, l = {
  TOP: 0,
  LEFT: 1,
  RIGHT: 2,
  BOTTOM: 3
};
function Q() {
  this.draw = (t) => {
    if (t.points.length < 1)
      return;
    t.svg && (t.eventListener.removeSvgEventListeners(), t.root.removeChild(t.svg), t.svg = null), t.calcPosition(), t.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), t.svg.ondragstart = function() {
      return !1;
    }, t.svg.id = t.options.id, t.svg.style.position = "absolute", t.svg.style.cursor = "crosshair", t.svg.style.left = t.left, t.svg.style.top = t.top, t.svg.setAttribute("width", t.width), t.svg.setAttribute("height", t.height), this.setupShapeFill(t), this.setupSVGFilters(t), t.svg.style.zIndex = t.options.zIndex;
    const s = this.drawPolygon(t);
    t.svg.appendChild(s), t.root.appendChild(t.svg), t.eventListener.setSvgEventListeners(), typeof t.options.visible < "u" && (t.svg.style.display = t.options.visible ? "" : "none"), t.points.forEach((i) => {
      i.options.zIndex < t.options.zIndex + 2 && (i.options.zIndex = t.options.zIndex + 2), t.options.visible || (i.options.visible = !1), i.redraw(), t.options.displayMode === d.DEFAULT && !i.options.forceDisplay && (i.element.style.display = "none");
    }), t.resizeBox && this.redrawResizeBox(t), t.rotateBox && this.redrawRotateBox(t);
  }, this.drawPolygon = (t) => {
    let s = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    t.points.length > 2 && (s = document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
    const i = t.points.map((e) => "" + (e.x - t.left) + "," + (e.y - t.top)).join(" ");
    return s.setAttribute("points", i), this.setupPolygonStroke(t, s), this.setupPolygonFill(t, s), this.setupPolygonStyles(t, s), t.svg.querySelector("defs") && t.svg.querySelector("defs").querySelector("filter") && (s.style.filter = 'url("#' + t.guid + '_filter")'), s.style.zIndex = t.options.zIndex, s;
  }, this.redrawResizeBox = (t) => {
    const s = t.getResizeBoxBounds();
    t.resizeBox.left = s.left, t.resizeBox.top = s.top, t.resizeBox.width = s.width, t.resizeBox.height = s.height, t.resizeBox.redraw();
  }, this.redrawRotateBox = (t) => {
    const s = t.getResizeBoxBounds();
    t.rotateBox.left = s.left, t.rotateBox.top = s.top, t.rotateBox.width = s.width, t.rotateBox.height = s.height, t.rotateBox.redraw();
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
      r.setAttribute("offset", o.offset), r.setAttribute("stop-color", o.stopColor), r.setAttribute("stop-opacity", o.stopOpacity), s.appendChild(r);
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
    u(t.options.stroke) && s.setAttribute("stroke", t.options.stroke), u(t.options.strokeWidth) && s.setAttribute("stroke-width", t.options.strokeWidth), u(t.options.strokeLinecap) && s.setAttribute("stroke-linecap", t.options.strokeLinecap), u(t.options.strokeDasharray) && s.setAttribute("stroke-dasharray", t.options.strokeDasharray);
  }, this.setupPolygonFill = (t, s) => {
    t.options.fillImage && typeof t.options.fillImage == "object" ? s.setAttribute("fill", 'url("#' + t.guid + '_pattern")') : t.options.fillGradient && typeof t.options.fillGradient == "object" && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1 ? s.setAttribute("fill", 'url("#' + t.guid + '_gradient")') : t.options.fill && s.setAttribute("fill", t.options.fill), u(t.options.fillOpacity) && s.setAttribute("fill-opacity", t.options.fillOpacity);
  }, this.setupPolygonStyles = (t, s) => {
    if (t.options.classes && s.setAttribute("class", t.options.classes), u(t.options.style) && typeof t.options.style == "object")
      for (let i in t.options.style)
        s.style[i] = t.options.style[i];
  };
}
const Y = new Q();
function v() {
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
    canRotate: !1,
    offsetX: 0,
    offsetY: 0,
    classes: "",
    style: {},
    pointOptions: {},
    zIndex: 1e3,
    bounds: { left: -1, top: -1, right: -1, bottom: -1 },
    visible: !0,
    displayMode: d.DEFAULT
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = _(), this.resizeBox = null, this.rotateBox = null, this.init = (t, s = null, i = null) => {
    if (!t) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    return this.root = t, this.root.style.position = "relative", this.draggedPoint = null, this.root.draggedShape = null, this.setOptions(s), this.eventListener = new R(this).run(), this.setupPoints(i, Object.assign({}, this.options.pointOptions)), this.applyDisplayMode(), h.emit(n.SHAPE_CREATE, this, {}), this;
  }, this.setOptions = (t) => {
    !t || typeof t != "object" || (t.pointOptions = f(this.options.pointOptions, t.pointOptions), t.style = f(this.options.style, t.style), t.bounds = f(this.options.bounds, t.bounds), u(t.visible) && t.visible !== this.options.visible && (this.points.forEach((s) => s.options.visible = t.visible), this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: t.visible } }), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: t.visible } })), this.options = f(this.options, t), this.points.forEach((s) => {
      s.setOptions(f({}, this.options.pointOptions)), s.options.bounds = this.getBounds(), s.options.zIndex <= this.options.zIndex && (s.options.zIndex = this.options.zIndex + 1), s.redraw();
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
    (!i || !Object.keys(i).length) && (i = Object.assign({}, this.options.pointOptions) || {}), i.bounds = this.getBounds(), i.zIndex = this.options.zIndex + 1;
    const e = new W().init(t, s, i);
    return this.points.push(e), this.root.appendChild(e.element), e;
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
  }, this.moveTo = (t, s) => {
    const i = this.getBounds();
    let e = t + this.width > i.right ? i.right - this.width : t, o = s + this.height > i.bottom ? i.bottom - this.height : s;
    this.points.forEach((r) => {
      r.x += e - this.left, r.y += o - this.top;
    }), this.calcPosition();
  }, this.scaleTo = (t, s) => {
    const i = this.getBounds();
    this.calcPosition(), this.width >= 10 && t < 10 && (t = 10), this.height >= 10 && s < 10 && (s = 10);
    let e = this.left + t > i.right ? i.right - this.left : t, o = this.top + s > i.bottom ? i.bottom - this.top : s, r = e / this.width, p = o / this.height;
    this.points.forEach(
      (A) => {
        A.x = (A.x - this.left) * r + this.left, A.y = (A.y - this.top) * p + this.top;
      }
    ), this.calcPosition();
  }, this.rotateBy = (t) => {
    this.calcPosition();
    const s = this.left + this.width / 2, i = this.top + this.height / 2;
    !this.isInBounds(...b(t, this.left, this.top, s, i)) || !this.isInBounds(...b(t, this.right, this.top, s, i)) || !this.isInBounds(...b(t, this.left, this.bottom, s, i)) || !this.isInBounds(...b(t, this.right, this.bottom, s, i)) || this.points.forEach((e) => e.rotateBy(t, s, i));
  }, this.isInBounds = (t, s) => {
    const [i, e] = this.getMaxPointSize(), o = this.getBounds();
    return t > o.left + i / 2 && t < o.right - i / 2 && s > o.top + e / 2 && s < o.bottom - e / 2;
  }, this.redraw = () => {
    this.applyDisplayMode(), Y.draw(this);
  }, this.applyDisplayMode = () => {
    this.options.displayMode === d.SCALE && this.options.canScale ? (this.rotateBox && this.rotateBox.hide(), !this.resizeBox && this.setupResizeBox(), this.resizeBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : this.options.displayMode === d.ROTATE && this.options.canRotate ? (this.resizeBox && this.resizeBox.hide(), !this.rotateBox && this.setupRotateBox(), this.rotateBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : (this.resizeBox && this.resizeBox.hide(), this.rotateBox && this.rotateBox.hide()), this.points.forEach((t) => {
      t.setOptions({ zIndex: this.options.zIndex + 1 }), t.redraw(), this.options.displayMode === d.DEFAULT && !t.options.forceDisplay && (t.element.style.display = "none");
    });
  }, this.switchDisplayMode = (t = null) => {
    t || (t = this.getNextDisplayMode()), (t === d.SCALE && !this.options.canScale || t === d.ROTATE && !this.options.canRotate) && (t = d.DEFAULT), this.options.displayMode = t, this.redraw();
  }, this.getNextDisplayMode = () => {
    let t;
    return this.options.displayMode === d.DEFAULT ? t = d.SCALE : this.options.displayMode === d.SCALE ? t = d.ROTATE : t = d.DEFAULT, t === d.SCALE && !this.options.canScale ? this.options.canRotate ? t = d.ROTATE : t = d.DEFAULT : t === d.ROTATE && !this.options.canRotate && (t = d.DEFAULT), t;
  }, this.calcPosition = () => {
    !this.points.length || (this.left = this.points.map((t) => t.x).reduce((t, s) => s < t ? s : t), this.top = this.points.map((t) => t.y).reduce((t, s) => s < t ? s : t), this.right = this.points.map((t) => t.x).reduce((t, s) => s > t ? s : t), this.bottom = this.points.map((t) => t.y).reduce((t, s) => s > t ? s : t), this.width = this.right - this.left || 1, this.height = this.bottom - this.top || 1);
  }, this.getPosition = () => ({ top: this.top, left: this.left, bottom: this.bottom, right: this.right, width: this.width, height: this.height }), this.getBounds = () => ({
    left: this.options.bounds.left !== -1 ? this.options.bounds.left : this.root.clientLeft,
    top: this.options.bounds.top !== -1 ? this.options.bounds.top : this.root.clientTop,
    right: this.options.bounds.right !== -1 ? this.options.bounds.right : this.root.clientLeft + this.root.clientWidth,
    bottom: this.options.bounds.bottom !== -1 ? this.options.bounds.bottom : this.root.clientTop + this.root.clientHeight
  }), this.isShapePoint = (t) => !!this.points.find((s) => s === t), this.addEventListener = (t, s) => this.eventListener.addEventListener(t, s), this.removeEventListener = (t, s) => {
    this.eventListener.removeEventListener(t, s);
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.destroy = () => {
    for (; this.points.length > 0; )
      this.points[0].destroy();
    h.emit(n.SHAPE_DESTROY, this, {}), this.eventListener && this.eventListener.destroy(), this.root && this.svg && this.root.removeChild(this.svg);
  }, this.setupResizeBox = () => {
    const t = this.getResizeBoxBounds();
    this.resizeBox = new T().init(this.root, t.left, t.top, t.width, t.height, {
      zIndex: this.options.zIndex + 1,
      id: this.options.id + "_resizebox",
      shapeOptions: {
        canDragShape: !1,
        visible: this.options.visible
      }
    }), this.calcPosition(), this.eventListener.addResizeEventListener(), this.resizeBox.redraw();
  }, this.setupRotateBox = () => {
    const t = this.getResizeBoxBounds();
    this.rotateBox = new y().init(this.root, t.left, t.top, t.width, t.height, {
      zIndex: this.options.zIndex + 1,
      id: this.options.id + "_rotatebox",
      shapeOptions: {
        canDragShape: !1,
        visible: this.options.visible
      }
    }), this.calcPosition(), this.eventListener.addRotateEventListener(), this.rotateBox.redraw();
  }, this.getResizeBoxBounds = () => {
    this.calcPosition();
    const [t, s] = this.getMaxPointSize(), i = {
      left: this.left - t,
      right: this.right + t,
      top: this.top - s,
      bottom: this.bottom + s,
      width: this.width + t * 2,
      height: this.height + s * 2
    };
    i.left < 0 && (this.moveTo(i.left * -1, this.top), i.left = 0), i.top < 0 && (this.moveTo(this.left, i.top * -1), i.top = 0);
    const e = this.getBounds();
    return i.bottom > e.bottom && (this.moveTo(this.left, i.bottom - e.bottom + this.top), i.bottom = e.bottom), i.right > e.right && (this.moveTo(i.right - e.right + this.left, this.top), i.bottom = e.bottom), i;
  }, this.getMaxPointSize = () => {
    if (!this.points.length)
      return [0, 0];
    const t = this.points.map((i) => i.options.width).reduce((i, e) => Math.max(i, e)), s = this.points.map((i) => i.options.height).reduce((i, e) => Math.max(i, e));
    return [t, s];
  }, this.getCenter = () => [this.left + this.width / 2, this.top + this.height / 2];
}
const d = {
  DEFAULT: "default",
  SCALE: "scale",
  ROTATE: "rotate"
};
function X(t) {
  this.resizeBox = t, this.subscriptions = {
    resize: []
  }, this.guid = _(), this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    h.subscribe(a.POINT_DRAG_MOVE, this.onPointDragMove), h.subscribe(a.POINT_DRAG_END, this.onPointDragMove), this.shapeMouseEnter = this.resizeBox.shape.addEventListener(n.SHAPE_MOUSE_ENTER, (s) => {
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
    this.resizeBox.redraw(), h.emit(x.RESIZE_BOX_RESIZE, this.resizeBox, { oldPos: i, newPos: e });
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
    this.resizeBox.shape.removeEventListener(n.SHAPE_MOVE_START, this.shapeMoveStart), this.resizeBox.shape.removeEventListener(n.SHAPE_MOVE, this.shapeMove), this.resizeBox.shape.removeEventListener(n.SHAPE_MOVE_END, this.shapeMoveEnd), this.resizeBox.shape.removeEventListener(n.SHAPE_MOUSE_ENTER, this.shapeMouseEnter), this.resizeBox.shape.removeEventListener(n.SHAPE_MOUSE_MOVE, this.shapeMouseMove), this.resizeBox.shape.removeEventListener(n.SHAPE_MOUSE_CLICK, this.shapeClick), h.unsubscribe(a.POINT_DRAG_MOVE, this.onPointDragMove), h.unsubscribe(a.POINT_DRAG_END, this.onPointDragMove);
  };
}
function T() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = _(), this.options = {
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
  }, this.eventListener = null, this.left_top = null, this.left_center = null, this.left_bottom = null, this.center_top = null, this.center_bottom = null, this.right_top = null, this.right_center = null, this.right_bottom = null, this.init = (t, s, i, e, o, r = {}) => (this.left = parseInt(s), this.top = parseInt(i), this.width = parseInt(e), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(r), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new v().init(t, Object.assign({}, this.options.shapeOptions), []), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new X(this).run(), this.redraw(), h.emit(n.SHAPE_CREATE, this, {}), this), this.setOptions = (t = {}) => {
    !t || typeof t != "object" || (t.shapeOptions && typeof t.shapeOptions == "object" ? (t.shapeOptions.pointOptions && typeof t.shapeOptions.pointOptions == "object" ? t.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions, t.shapeOptions.pointOptions) : t.shapeOptions.pointOptions = Object.assign({}, this.options.shapeOptions.pointOptions), t.shapeOptions = Object.assign(this.options.shapeOptions, t.shapeOptions)) : t.shapeOptions = Object.assign({}, this.options.shapeOptions), t.shapeOptions.zIndex = t.zIndex || this.options.zIndex, t.shapeOptions.id = t.id ? t.id : this.options.id, Object.assign(this.options, t), this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + j + "')" } }), this.center_top = this.shape.addPoint(this.left + this.width / 2, this.top, { id: this.shape.guid + "_center_top", style: { backgroundImage: "url('" + k + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + J + "')" } }), this.right_center = this.shape.addPoint(this.right, this.top + this.height / 2, { id: this.shape.guid + "_right_center", style: { backgroundImage: "url('" + K + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + F + "')" } }), this.center_bottom = this.shape.addPoint(this.left + this.width / 2, this.bottom, { id: this.shape.guid + "_center_bottom", style: { backgroundImage: "url('" + N + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + H + "')" } }), this.left_center = this.shape.addPoint(this.left, this.top + this.height / 2, { id: this.shape.guid + "_left_center", style: { backgroundImage: "url('" + G + "')" } }), this.setPointsOptions();
  }, this.setPointsOptions = () => {
    this.setPointsMoveDirections(), this.setPointsMoveBounds();
  }, this.setPointsMoveDirections = () => {
    this.center_top.setOptions({ moveDirections: [l.TOP, l.BOTTOM] }), this.center_bottom.setOptions({ moveDirections: [l.TOP, l.BOTTOM] }), this.left_center.setOptions({ moveDirections: [l.LEFT, l.RIGHT] }), this.right_center.setOptions({ moveDirections: [l.LEFT, l.RIGHT] });
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
const x = {
  RESIZE_BOX_RESIZE: "resize"
};
try {
  window.ResizeBox = T, window.SmartShape = v, window.RotateBox = y;
} catch {
}
export {
  T as ResizeBox,
  y as RotateBox,
  v as SmartShape
};
