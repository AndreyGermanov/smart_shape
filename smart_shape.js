function et() {
  this.subscriptions = {}, this.subscribe = (e, t) => {
    if (typeof e == "string")
      return this.subscribeToEvent(e, t);
    if (typeof e == "object") {
      for (let s of e)
        this.subscribeToEvent(s, t);
      return t;
    }
    return null;
  }, this.subscribeToEvent = (e, t) => ((typeof this.subscriptions[e] > "u" || !this.subscriptions[e]) && (this.subscriptions[e] = []), typeof this.subscriptions[e].find((s) => s === t) < "u" ? null : (this.subscriptions[e].push(t), t)), this.emit = (e, t, s = null) => {
    if ((!s || typeof s != "object") && (s = {}), s.type = e, s.target = t, typeof this.subscriptions[e] < "u" && this.subscriptions[e] && this.subscriptions[e].length) {
      for (let i of this.subscriptions[e])
        i(s);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (e, t) => {
    let s = !1;
    if (typeof e == "string")
      this.unsubscribeFromEvent(e, t) && (s = !0);
    else if (typeof e == "object")
      for (let i of e)
        this.unsubscribeFromEvent(i, t) && (s = !0);
    return s;
  }, this.unsubscribeFromEvent = (e, t) => {
    if (typeof this.subscriptions[e] > "u" || !this.subscriptions[e])
      return !1;
    const s = this.subscriptions[e].indexOf(t);
    return s !== -1 ? (this.subscriptions[e].splice(s, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const r = new et(), st = (e) => e * (Math.PI / 180), it = (e) => e * (180 / Math.PI), R = (e, t, s, i, o) => {
  const n = st(e), h = (t - i) * Math.cos(n) - (s - o) * Math.sin(n) + i, p = (t - i) * Math.sin(n) + (s - o) * Math.cos(n) + o;
  return [h, p];
}, C = (e, t, s, i) => Math.sqrt(Math.pow(s - e, 2) + Math.pow(i - t, 2)), ot = (e, t, s, i, o, n) => {
  let h = (e - s) * (o - s) + (t - i) * (n - i);
  const p = Math.pow(o - s, 2) + Math.pow(n - i, 2);
  return p === 0 ? -1 : (h /= p, h < 0 ? h = 0 : h > 1 && (h = 1), Math.sqrt(Math.pow(s - e + h * (o - s), 2) + Math.pow(i - t + h * (n - i), 2)));
}, nt = (e, t) => {
  const s = (l, A, c) => A.x <= Math.max(l.x, c.x) && A.x >= Math.min(l.x, c.x) && A.y <= Math.max(l.y, c.y) && A.y >= Math.min(l.y, c.y), i = (l, A, c) => {
    let b = (A[1] - l[1]) * (c[0] - A[0]) - (A[0] - l[0]) * (c[1] - A[1]);
    return b === 0 ? 0 : b > 0 ? 1 : 2;
  }, o = (l, A, c, b) => {
    let N = i(l, A, c), _ = i(l, A, b), x = i(c, b, l), M = i(c, b, A);
    return N !== _ && x !== M || N === 0 && s(l, c, A) || _ === 0 && s(l, b, A) || x === 0 && s(c, l, b) ? !0 : !!(M === 0 && s(c, A, b));
  };
  if (e.length < 3)
    return !1;
  let n = [1e4, t[1]], h = 0, p = 0;
  do {
    let l = (p + 1) % e.length;
    if (o(e[p], e[l], t, n)) {
      if (i(e[p], t, e[l]) === 0)
        return s(
          e[p],
          t,
          e[l]
        );
      h++;
    }
    p = l;
  } while (p !== 0);
  return h % 2 === 1;
}, Y = (e, t, s, i) => !e && !t || !s || !i ? [s, i] : e && t ? [e, t] : (e || (e = t * (s / i)), t || (t = e * (i / s)), [e, t]), ht = (e, t, s = 1e6) => {
  const i = s * (180 + t) / 360 % (1.5 * s), o = e * Math.PI / 180, n = 0.5 * Math.log((1 + Math.sin(o)) / (1 - Math.sin(o))), h = s * n / (2 * Math.PI);
  return [i, h];
};
function rt(e) {
  return at(e) && !pt(e);
}
function at(e) {
  return !!e && typeof e == "object";
}
function pt(e) {
  const t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || ut(e);
}
const lt = typeof Symbol == "function" && Symbol.for, dt = lt ? Symbol.for("react.element") : 60103;
function ut(e) {
  return e.$$typeof === dt;
}
function At(e) {
  return Array.isArray(e) ? [] : {};
}
function L(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? I(At(e), e, t) : e;
}
function ct(e, t, s) {
  return e.concat(t).map(function(i) {
    return L(i, s);
  });
}
function gt(e, t) {
  if (!t.customMerge)
    return I;
  const s = t.customMerge(e);
  return typeof s == "function" ? s : I;
}
function ft(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return e.propertyIsEnumerable(t);
  }) : [];
}
function F(e) {
  return Object.keys(e).concat(ft(e));
}
function Z(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function Et(e, t) {
  return Z(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function mt(e, t, s) {
  const i = {};
  return s.isMergeableObject(e) && F(e).forEach(function(o) {
    i[o] = L(e[o], s);
  }), F(t).forEach(function(o) {
    Et(e, o) || (Z(e, o) && s.isMergeableObject(t[o]) ? i[o] = gt(o, s)(e[o], t[o], s) : i[o] = L(t[o], s));
  }), i;
}
const I = (e, t, s) => {
  s = s || {}, s.arrayMerge = s.arrayMerge || ct, s.isMergeableObject = s.isMergeableObject || rt, s.cloneUnlessOtherwiseSpecified = L;
  const i = Array.isArray(t), o = Array.isArray(e);
  return i === o ? i ? s.arrayMerge(e, t, s) : mt(e, t, s) : L(t, s);
};
I.all = function(t, s) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(i, o) {
    return I(i, o, s);
  }, {});
};
const D = (e, t = !0) => {
  let s = 0, i = 0;
  if (!t)
    return { top: e.offsetTop - e.scrollTop, left: e.offsetLeft - e.scrollLeft };
  for (; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop); )
    s += e.offsetLeft - e.scrollLeft, i += e.offsetTop - e.scrollTop, e = e.offsetParent;
  return { top: i, left: s };
}, U = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
  const t = Math.random() * 16 | 0;
  return (e === "x" ? t : t & 3 | 8).toString(16);
}).replace(/-/g, ""), X = (e) => {
  try {
    e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault(), e.cancelBubble = !0, e.returnValue = !1;
  } catch {
  }
  return !1;
}, E = (e) => typeof e < "u" && e !== null, m = (...e) => {
  if (!e.length)
    return null;
  let t = e[0];
  if (e.length === 1)
    return t;
  for (let s = 1; s < e.length; s++)
    E(e[s]) && typeof e[s] == "object" && (t = I(t, e[s]));
  return t;
}, bt = (e) => {
  const t = atob(e.split(",")[1]), s = e.split(",")[0].split(":")[1].split(";")[0], i = new ArrayBuffer(t.length), o = new Uint8Array(i);
  for (let n = 0; n < t.length; n++)
    o[n] = t.charCodeAt(n);
  return new Blob([i], { type: s });
}, j = (e) => new Promise((t) => {
  const s = new FileReader();
  s.onload = function(i) {
    t(i.target.result);
  }, s.readAsDataURL(e);
}), H = (e) => {
  try {
    return JSON.parse(e);
  } catch {
    return null;
  }
}, St = (e) => {
  let t = e, s = t.indexOf("-");
  for (; s !== -1; )
    t = t.replace("-" + t[s + 1], t[s + 1].toString().toUpperCase()), s = t.indexOf("-");
  return t;
}, u = (e, t = {}) => {
  const s = {};
  for (let i in e)
    i !== "type" && i !== "target" && (s[i] = e[i]);
  return Object.keys(t).forEach((i) => {
    s[i] = t[i];
  }), s;
}, J = (e, t = null) => (t || (t = e.target.root || e.target), K(t, e.pageX, e.pageY)), K = (e, t, s) => {
  const i = D(e, !0);
  return [t - i.left, s - i.top];
};
function xt() {
  this.subscriptions = {}, this.subscribe = (e, t) => {
    if (typeof e == "string")
      return this.subscribeToEvent(e, t);
    if (typeof e == "object") {
      for (let s of e)
        this.subscribeToEvent(s, t);
      return t;
    }
    return null;
  }, this.subscribeToEvent = (e, t) => ((typeof this.subscriptions[e] > "u" || !this.subscriptions[e]) && (this.subscriptions[e] = []), typeof this.subscriptions[e].find((s) => s === t) < "u" ? null : (this.subscriptions[e].push(t), t)), this.emit = (e, t, s = null) => {
    if ((!s || typeof s != "object") && (s = {}), s.type = e, s.target = t, typeof this.subscriptions[e] < "u" && this.subscriptions[e] && this.subscriptions[e].length) {
      for (let i of this.subscriptions[e])
        i(s);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (e, t) => {
    let s = !1;
    if (typeof e == "string")
      this.unsubscribeFromEvent(e, t) && (s = !0);
    else if (typeof e == "object")
      for (let i of e)
        this.unsubscribeFromEvent(i, t) && (s = !0);
    return s;
  }, this.unsubscribeFromEvent = (e, t) => {
    if (typeof this.subscriptions[e] > "u" || !this.subscriptions[e])
      return !1;
    const s = this.subscriptions[e].indexOf(t);
    return s !== -1 ? (this.subscriptions[e].splice(s, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const y = new xt();
function yt(e) {
  this.menu = e, this.panelCssClass = "", this.itemCssClass = "", this.itemTextCssClass = "", this.itemImageCssClass = "", this.itemsCssClassesById = {}, this.setStyles = () => {
    if (!!this.menu.panel) {
      this.panelCssClass ? this.menu.panel.className = this.panelCssClass : (this.menu.panel.style.padding = "3px", this.menu.panel.style.borderStyle = "solid", this.menu.panel.style.borderColor = "#dddddd", this.menu.panel.style.borderWidth = "1px", this.menu.panel.style.backgroundColor = "#eeeeee", this.menu.panel.className = "");
      for (let t of this.menu.items)
        this.setItemStyles(t);
    }
  }, this.setItemStyles = (t) => {
    this.setItemDivStyles(t), this.setItemSpanStyles(t), this.setItemImageStyles(t);
  }, this.setItemDivStyles = (t) => {
    const s = this.menu.panel.querySelector("#" + t.id);
    !s || (s.style.display = "flex", s.style.flexDirection = "row", s.style.alignItems = "center", this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][v.ITEM] ? s.className = this.itemsCssClassesById[t.id][v.ITEM] : this.itemCssClass ? s.className = this.itemCssClass || "" : (s.className = "", s.style.paddingTop = "2px", s.style.paddingLeft = "3px", s.style.paddingRight = "3px", s.addEventListener("mouseover", () => {
      s.style.backgroundColor = "#0066CC", s.style.color = "white";
    }), s.addEventListener("mouseout", () => {
      s.style.backgroundColor = "transparent", s.style.color = "black";
    })), s.style.whiteSpace = "nowrap");
  }, this.setItemSpanStyles = (t) => {
    const s = this.menu.panel.querySelector("#" + t.id);
    if (!s)
      return;
    const i = s.querySelector("span");
    i && (this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][v.TEXT] ? i.className = this.itemsCssClassesById[t.id][v.TEXT] : this.itemTextCssClass ? i.className = this.itemTextCssClass : (i.className = "", i.style.color = "black"));
  }, this.setItemImageStyles = (t) => {
    const s = this.menu.panel.querySelector("#" + t.id);
    if (!s)
      return;
    const i = s.querySelector("img");
    i && (this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][v.IMAGE] ? i.className = this.itemsCssClassesById[t.id][v.IMAGE] : this.itemImageCssClass ? i.className = this.itemImageCssClass : i.className = "");
  }, this.setPanelClass = (t = null) => {
    this.panelCssClass = t || "";
  }, this.setItemClass = (t = null, s = null) => {
    if (s) {
      this.setClassForItem(s, v.ITEM, t);
      return;
    }
    this.itemCssClass = t || "";
  }, this.setTextClass = (t = null, s = null) => {
    if (s) {
      this.setClassForItem(s, v.TEXT, t);
      return;
    }
    this.itemTextCssClass = t || "";
  }, this.setImageClass = (t = null, s = null) => {
    if (s) {
      this.setClassForItem(s, v.IMAGE, t);
      return;
    }
    this.itemImageCssClass = t || "";
  }, this.setClassForItem = (t, s, i) => {
    (!this.itemsCssClassesById[t] || typeof this.itemsCssClassesById[t] > "u") && (this.itemsCssClassesById[t] = {}), this.itemsCssClassesById[t][s] = i;
  };
}
const v = {
  ITEM: "div",
  TEXT: "text",
  IMAGE: "image"
}, vt = (e, t = {}) => {
  const s = {};
  for (let i in e)
    i !== "type" && i !== "target" && (s[i] = e[i]);
  return Object.keys(t).forEach((i) => {
    s[i] = t[i];
  }), s;
};
function Ot(e, t, s = null, i = {}) {
  this.panel = null, this.container = t, this.items = e, this.event = s || "contextmenu", this.options = i, this.listeners = {}, this.origEvent = null, this.cursorX = 0, this.cursorY = 0, this.overflowY = "", this.maxImageHeight = 0, this.subscriptions = {}, this.init = () => (Object.assign(this, new yt(this)), this.container.addEventListener(this.event, (o) => (this.onEvent(o), !1)), y.emit(P.CREATE, this, { owner: this }), this), this.onEvent = (o) => {
    if (this.options.customHandler && typeof (this.options.customHandler === "function")) {
      this.options.customHandler(this, o);
      return;
    }
    this.origEvent = o, o.preventDefault(), o.stopPropagation(), o.cancelBubble = !0, this.cursorX = o.pageX, this.cursorY = o.pageY, this.show();
  }, this.drawMenu = () => {
    try {
      document.body.removeChild(this.panel);
    } catch {
    }
    this.panel = document.createElement("div"), document.body.appendChild(this.panel);
    for (let o of this.items) {
      if (this.panel.querySelector("#" + o.id))
        continue;
      const n = document.createElement("div");
      n.id = o.id, n.style.cursor = "pointer";
      const h = document.createElement("span");
      h.innerHTML = o.title, n.appendChild(h), this.panel.appendChild(n);
    }
    this.setStyles(), this.drawImages(), this.setStyles(), this.setItemsEventListeners(), this.panel.style.display = "none";
  }, this.drawImages = () => {
    if (!this.panel)
      return;
    const o = this.items.filter((n) => n.image && typeof n.image < "u");
    this.maxImageHeight = 0;
    for (let n of o) {
      const h = new Image();
      if (!this.panel)
        continue;
      const p = this.panel.querySelector("#" + n.id + " > span");
      if (h.style.display = "none", h.src = n.image, !this.panel)
        return;
      const l = document.createElement("div");
      l.style.marginRight = "5px", l.style.display = "flex", l.style.flexDirection = "row", l.style.justifyContent = "center", l.style.alignItems = "center", h.height = this.panel.querySelector("#" + n.id).clientHeight, h.height > this.maxImageHeight && (this.maxImageHeight = h.height), h.style.verticalAlign = "middle", h.style.display = "", l.appendChild(h), this.panel.querySelector("#" + n.id + " div") || this.panel.querySelector("#" + n.id).insertBefore(l, p);
    }
    this.adjustImagesWidth();
  }, this.setItemsEventListeners = () => {
    for (let o of ["click", "mouseover", "mouseout", "dblclick", "mousedown", "mouseup", "mousemove"])
      this.setListenersForMouseEvent(o);
  }, this.setListenersForMouseEvent = (o) => {
    for (let n of this.items)
      this.setListenerForItem(o, n);
  }, this.setListenerForItem = (o, n) => {
    const h = (p) => {
      !this.origEvent || (y.emit(o, this.origEvent.target, vt(p, {
        container: this.container,
        owner: this,
        cursorX: this.cursorX,
        cursorY: this.cursorY,
        itemId: n.id
      })), setTimeout(() => {
        ["click", "mousedown", "mouseup", "dblclick"].indexOf(o) !== -1 && p.button !== 2 && this.hide();
      }, 100));
    };
    this.listeners[o + "_" + n.id] = h, this.panel.querySelector("#" + n.id).addEventListener(o, h);
  }, this.adjustImagesWidth = () => {
    if (!this.panel)
      return;
    let o = 0;
    for (let n of this.items)
      this.panel.querySelector("#" + n.id).clientHeight > o && (o = this.panel.querySelector("#" + n.id).clientHeight);
    for (let n of this.panel.querySelectorAll("img"))
      n.parentNode.style.width = o + "px", n.parentNode.style.height = o + "px";
  }, this.show = () => {
    if (!this.container || (y.emit(P.SHOW, this, { owner: this }), this.drawMenu(), !this.panel))
      return;
    this.panel.style.display = "";
    let o = this.cursorX, n = this.cursorY;
    this.panel.style.left = o + "px", this.panel.style.top = n + "px", this.panel.style.zIndex = "10000", this.panel.style.position = "absolute", o + this.panel.clientWidth > window.innerWidth && (o = window.innerWidth - this.panel.clientWidth - 10, this.panel.style.left = o + "px"), this.origEvent && this.origEvent.clientY + this.panel.clientHeight > window.innerHeight && (n = n - (window.innerHeight + this.panel.clientHeight - 20) + this.origEvent.clientY, this.panel.style.top = n + "px");
  }, this.hide = () => {
    this.panel && (this.panel.style.display = "none");
  }, this.addItem = (o, n, h = null) => {
    const p = { id: o, title: n };
    h && (p.image = h), this.items.push(p);
  }, this.removeItem = (o) => {
    const n = this.items.findIndex((h) => h.id === o);
    n !== -1 && this.items.splice(n, 1);
  }, this.findItemById = (o) => Array.from(this.panel.querySelectorAll("div")).find((n) => n.id === o), this.setId = (o) => this.panel.id = o, this.addEventListener = (o, n) => {
    typeof this.subscriptions[o] > "u" && (this.subscriptions[o] = []);
    const h = y.subscribe(o, (p) => {
      p.owner === this && n(p);
    });
    return this.subscriptions[o].push(h), h;
  }, this.removeEventListener = (o, n) => {
    this.subscriptions[o] && typeof this.subscriptions[o] < "u" && this.subscriptions[o].splice(this.subscriptions[o].indexOf(n), 1), y.unsubscribe(o, n);
  }, this.on = (o, n) => this.addEventListener(o, n), this.off = (o, n) => {
    this.removeEventListener(o, n);
  }, this.removeAllEventListeners = () => {
    for (let o in this.subscriptions)
      for (let n of this.subscriptions[o])
        y.unsubscribe(o, n);
    if (this.subscriptions = {}, !!this.panel)
      for (let o in this.listeners) {
        const [n, h] = o.split("_"), p = this.panel.querySelector("#" + h);
        p && p.removeEventListener(n, this.listeners[o]);
      }
  }, this.destroy = () => {
    this.removeAllEventListeners(), this.items = [], this.container = null;
    try {
      document.body.removeChild(this.panel);
    } catch {
    }
    this.panel && (this.panel.innerHTML = ""), this.panel = null, y.emit(P.DESTROY, this, { owner: this });
  };
}
const P = {
  CREATE: "create",
  DESTROY: "destroy",
  SHOW: "show"
};
function Mt() {
  this.menus = [], this.create = (e, t, s = "contextmenu", i = {}) => new Ot(e, t, s, i).init(), y.subscribe(P.CREATE, (e) => {
    this.menus.indexOf(e.target) === -1 && (this.menus.push(e.target), e.target.id = this.menus.length);
  }), y.subscribe(P.DESTROY, (e) => {
    this.menus.indexOf(e.target) !== -1 && this.menus.splice(this.menus.indexOf(e.target), 1);
  }), y.subscribe(P.SHOW, (e) => {
    this.menus.forEach((t) => {
      t !== e.target && t.hide();
    });
  }), document.addEventListener("mouseup", (e) => {
    e.button !== 2 && this.menus.forEach((t) => t.hide());
  });
}
const k = new Mt();
try {
  window.Menus = k;
} catch {
}
const Ct = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECcZZuWhdAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlZBBEsAgCAMT/v/n7akzWAFtTo5mQ8SAJtkGcL4LXcg211A2L+eq3jc5C/AGTUBZ7wYAHH+B4yIAv8a8dkvilLz9qXuYKseU2E7qDFODqIwTIEkPSldAAa0WlbUAAAAASUVORK5CYII=", Bt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECgYlnqNLQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABZSURBVCjPlZFBCgAxCANN/v/n2VOhiFU3N4U4GgXELUkAikbOhlhIh1QZXkR3hGc/IsaVMtHT0RXR3e5jescIqBpy05T/tInffw2AvEkr972N+a69+U8e8AGOtEABr4X+4AAAAABJRU5ErkJggg==", Pt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECkWaNmRawAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABjSURBVCjPlZBRDsAgCENbsnt6/1N0P2ocijASEy08iqC1BknhASCvsSeOQXImJXHcrQL4t1UAr4fjReDmdCsc/5LEZ7NOwOlUKVy3RwC/AAAwL2TAZ3t+xFszOxVl7lbtvsYLOtlZCOj2NccAAAAASUVORK5CYII=", It = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECoXNPPyPgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlVFBEgAhCAL+/2f21I5jqcXFGRMSpG1EkLRtooEyIdaRlAc7orqBsg+gVKy8yTYn49vqMb0pgCUuPOBP93Sniaxb8/FdL6mt/rZe5SMKXQWRf/4AYrs6C0ViuwUAAAAASUVORK5CYII=", _t = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDsHep3BSgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA8SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCAZy0h4AXLILDAEWNOwAAAAASUVORK5CYII=", Rt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDMMJZaSygAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA/SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCJxAWZoFp1MBY8cLTv/x72kAAAAASUVORK5CYII=", Tt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQARsznxFAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", wt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQEbSvcpSwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA3SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTCICjCTbxPJfsIWSv+JECM9nugHAG40DyW1OoLPAAAAAElFTkSuQmCC", Lt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDIpd4l3zAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", Dt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDYr/evT5AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", Ut = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDUsSKIVhAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA0SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTBQZBPJfsIWSv+JECM9nugHADv6Dv2P6G4ZAAAAAElFTkSuQmCC", Nt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDQQftZYQgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", Q = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAEDSURBVDjLzZPNSsQwEIC/CUWtQlnZi14EYb36Jj6DT+ZT+BSevImHPYggKLpo2bW1Ze14yJjFtKEed3poMpmvzZcf2LqQfkolZFV0FFDhkMI6JR99JAbczTlP/tGZung86yN7Spn+4ABw0PH5DyCoOoSvYOg00s9C+YSpL8oLGgMmnOILF2r68qvKibvWXd9hbsCZ/ajpLniULnKQO82tubb3vY3Uw9IrvhOmCaDFJYC2DyjLt1vNQGjzI5v7+1wrBWTN0uQ3R0OFfQRwz7PjS8td8UAHKFW0rCDqt0ud1mEfKlZ+bYYdNtGQjAFgh6L+M9sRQKev5Yu1F4zfh7ELtIXxA+JiW9aVMPJ4AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", q = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAACn0lEQVRIx+2U30tTYRzGn/fsPdOmNkWDsEDnOiFCbv4KhPJCFAvDtBuRyL/A64TwQkGaCt7pVYqimHhTJAVhuYsRE5zipLuZeQKNsMQdN1vbzvbtwg2Oa5s/uvWBl3Px8P18OO/7ngNc5H9DROw8XTxCumEiygJwjYh4kp7HuqzTiJLBc8aslr5+vbiy43SWaiVExHecztJ+vbgyZrX0EVHOqSVx+ERFee8wR3hcBNky+VpcEofbMvnauAga5ghPVJT3ppKwJIKsqRrr0/3P68+KdeAMgBIFfgjc/cT+6TEATNffmbkaVa1GASAAcgRq3i3L806Xe4gxdqjl8QS4ACBPDPibpIwjOAAUAOBR1fqy8e4MAFwXVGuuZlLi4ErA3wTgBREFGGPRdG+gCytKy3JDTdfvrxv12s4bOXrm6o7PGEok++2PrhHRaJxnjEXSblFMog/7lea1xn8liTGUSPaKD64RMdv4jjEWOvEMtJKIX2lev1fTFdhKLrlkkuyW964RXQo4kOY7ABBVNj0e+eDwMudAsiUfHF5WNj0eANFUkFRbxPdWl268elA3Wyyq1nwx+fBeGJDD3P3oraMjv6r2C2NMPVFARLq91SXpTUvdrEmvWgv0SJtfIWArxN0P5x0d+VW1G2kPOXZNC6dMma+LebD6SgI8o+imHQCC3zzHzuRnCJDVjJXOrT9tAL5rr+mxM4gV+w3dPY7CbCEkciC+DGbJXjS3PFo0tzxqMEt2bVeYLYQaunscAPa18KSJ/SrMyuSgTa4WgnIlaLtVWlR93jYi0hORXvV527ZbpUW5EiRXC0FlctBGROaz/o/Mvumhgd32soU4XNPrVZ+3bbe9bME3PTRwJniCxERE97VwrSTWmc4MTxSdp7vIqfMXBoR6XMSZc1QAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDB/NVeTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwDmjvLwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=", Vt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAG6SURBVDjLlZK/TxNhGMc/z117FgWbNulITGMYTMvAaHAyhMTAIoOmcdD/wMWERdO4E8If4OJASBgcGcA4QRgx4YcLA4aUYDTRCoX2fj0OvTu441rwuem+7/N5n/f7PA/8ZwholiHuYCCXdMWnxYk4KYwWSws0+JX4GqUFLaqRVmHYWFUfTZ6I4U9ynKyRAUztoNsfq6f4gWrsDI6+VMGMPTMCwIHqGt+xA9Wq3uNFuukIoIUtduiYFs51QDIcwMSKrHn4otcBebJ4QfofmnghYKcANlCQxaj505xcAL0qGM1lFEXwwsH2B/zi0/DXXbps2k0YtDBxAbxvPbtUL7/Xi8HVy90ntXdwVUUgHKGADufedrJUsGKWd2857aXMXLAy4j7nUOxuhdabvfmR86/x0gPO7AFn3lYkCJaqON31HqVCNpZvMkCDA3kVtfUD5/yVYwFQ48qaZShO1VeqbEbKwyfbK+/kx5VtDO4TLO/Rs7FPpVCZ+bm8Za5LpwcAKuTajycebBQAxn9/3st9oSPaEwAVbjcnx+/vDlZON/bza5yJ0j9UNH9Um3h9VNO7/a6OIwWd0sIN09PiH5BSrD/OwMFRAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", zt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAFGUlEQVRIx7WVaWxc1RXHf/ctM+OxPcQLxIljD3GCAYOxiHCSpmmWEgi7kBBIiEXiU79USHxhEaJtWqFWqqhQW1BLIImrVLTwgQBhM2sIEIVFCZDFSbCdxI4X7ExmMjOemffuvacfbA8e1FYNUv/See/o3vf+5/3/5+o8+D9DzSYiolatWhUrFArR2bXa2lr1317OZrMCcPbsWQFIp9PypOt23TsxsbuigIiogx8/d9+StsW/8P1Y8ty/U6avpYCPf/2XbMPdV9/fueZn2wA8gPXr11e/uu2hX1EabQlyeRQKlPofuQVBQCy5XYdwGv3aZGvLJuCfQMEBsNZW+RG/xZSyWAEjqiJCA09ueZtr736CXXuPzdkDI2CtYI0wvvsY1a21RHyvFYgCOACJRMK1RmMsWKuworDiYMXBWMXjf3yF9/f0s+mXjxB6TfR+eLi8Px0Kk5lieP8g9YsvIAiLJBIJp2yR53nKaI21Mu3MbAB/3trLnn0neeap35FsrseGU3y5r8SLO/dy2/XLZ13CfHacjO8Qr6tBl0qIiCorUEq51oYYIxgr05KtsO2FXbzy9n4ee/jnjJ44wOmRQxw5+CnP/r2XqliU51/+BGMs1kDu6Di6KcFUMcBajYh8p8AYo6wOsMagRGERnu55kx1vfc6Plney+bmtXP3jDv72j9dYOL+ODasvp7urjfxUkb9uf4d7b+gmNTBGtK2RIAxBTPmEejNNVkYHGKMRIzz42xfY/ekRrlvXxdruC5mX6MB1XVZ3t2OtMDJ+hoETY3Rd2sLtN69gz5Z3qU3lqN9wEQrBmu8s8gAymYzosITRITvf28fxoQmeePROCqWQMAiZmMxgrSWVyhCEBkQIwxATlFhyYSMr59XyXv4bEp7Cc8CEYaWCdDqNDovoMODowCgbf3IpuXwOgHyhRLEQUBXzwcbAUbiOQ8RXHO0f4tuJM6w+nSeb8ImKQSFoXSKfz1NuciqVQodFQh2w8soWjgyOMjwySVNjNYWpIhFPiMdcfNcS9YSYJ8RjDvGYi2ciTC6/hlxbMx1Lzyc0Bh0EZW5vpoCEQQkThlzRPp/O9iZe/+AQv/nTa2x+/A6y+SI18SijE1mKpQAdWiIRl5XLknxzzOdYop5IcwO+pwiCEOUVKy0ClA6KGB1Mjwmg98PDLOtYiBjN0KkU45NZhsYydHcuIhZ1qa3ycMVgaxYycnyAqzrOI5ctYMXietFyAQegUCiggwJGG7TWaK3pumQBff3f8uyLe/F9RceSBrovWwDG4CkoFgNS6RxnTIxTo4MoMYxOZNDaoIN/pyAsIWLLM+yWn17M7Rs76B9K0fPSF2xYsZh0tsDi5np8L0Y04nH4eJrtvc9z5dIYg8PVNM6LE/UddFiqVAA4WocYY8rxxYFhdn7QRzzm0TcwwchkjisubmLB+TXUVEeIRBw+/3qQI4cPUBfXIMIFDXFELFqHlU0GlNGmYgqv6Gwu53fd2Mn+vjH6T57m/rtWYo3BWOGTfSdJNlXRcF6M9mQdSoQ5PJUWGWPLP47vY113kjVXtfKHnj38fstH3LT2Ik6NZ+loa2Tj6iW0JxuYGTlzuSsK2KGxzGTz/ESjWMN/wgP3rCjnS1vrWNvd+j1iUI7LqfHMJGDnFhjrefmrN+67bfmNyUVN9cpxUY6Hclwcx0WVY/pxsRqxBrEGO3OfXTsxPJbq2fHVm8BYWcYMLgNuBS6Z0/xzhQX6gB3AwR/IcW74F/jUry6yACAoAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", Ht = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAE8ElEQVRIx7WVWWxVVRSGv733Off2Xjrc0oFKy6XQoqCMEgc0RhFNVBzwQRIfUBKiTyYqCSQmmhiNJkSjiQkJiQ8mKg5xiGKCCIpEZFCCcwlVhlCwrbSlpe1te8/Ze20fTluL4AMaV3KmZGd9a/3r7H/D/xzqb99pIPUfc0ZA8TzALzvee6C5adbTqVRqxgXrGFupDUqBR4EG/LkrfVwc6jjZ9nzDkjuemwjIFFq/OZRyI43EI//Qp0IpnTyDAKU1KDUBPprKpJAgNRTk51cDw8GYNKkwaJTCIHgPWieVeTkX4lWSWCzaGDAhSisUejS/BxdhMqXZUbnHAUpsTH//AH2FYQojMWcGCgBUZNM019eQCsNkpVOgNV4MSgQThHgDSpm/ZEp0UwDjAO9istkSJpWWooIQrwNO/dHNdy2tvL31S2bW17H0yjnkp9aCKLxolLMgHh2GEJBIqAGRCcImUT38884uGeyFIMShCdMZMAFoQxRZPv96P5s/2EJ1RSlrVtzKFc15lNZoE2LSaXSYRpkApQ1kKtANc2uA7jFATeH7z05LoY+ih9N9BY793sVwFBE7x9LrriFXXo54z849+3nl1ddZMKuRh+69lfq6GlSYIkhn0Kk0OghRJeXo/IJaoGsMUDtw4JM/3GAvrW2dvLN9N22dZyhaR29/AWuF8tIM0+vruO+OW5jdlOeZlzdx6Mhx7rnxKlbdvYxcrpIgncWkS1CTcpj8winA6QlDjhAbMWvqZErTIXu+b2FwpEgmFeKVJghCevqH6O79kKqKLLfftITLm6bz7tad7P2xlQ2PPUg+Pw1lDMa582ZQ1/vV2x1u6CxRbPntZCffffwtmeV3MmQt/b09tLed4OCh45w6fpiG2iqWXb2IqvI0c2Y08MrmLQC8vP5hmpubSFVUYZquvQToHOtAiysiEhEYxeSKEnp8kRvP9DBz1QMopXh9234GGvuYZ4Qsll9/2Mv04hkaasrZ8MhKXnprGx/s2M36xmmItZD8T8kNUDaOcNaR7IdBGhdOp3XfPrIlJQTpLCvvXMaifCVvPvs4B776HH/ZDTQtuY0t+1po7+ljwyMrmd1Yh7URYovj6owDJB5BXIS1MfVVZeRKM/SGwu6nnqR6co4X3t9DN2WUV07m+hX3s2Lptaxe/SAvbnqNT789TN/Zfm5ePAdxMWLj8wE2KiJxjIsilLXMnVZD47x6TnScYte6tSyp1fza3sddT2ykc9CwsKGSsrJSamrrWPfoWn48chJxDnEWl/jZuTvZFUfw1uKdgAiBeK6ZeQk9UyrpONbFpT99ST5TRvtQjvlXLaIhtHQdO0I00MNQ+1EWN09FXIx3DhcXzwNoH0d45xCbAEQSR6nOpKia14CIx/qIKcOnSB/tpPeEQQcBxigmaY0ODF4s3sZIVBxXZ8I+sIgVvEsufGJagkJp0EoT4kllQpRS4D3exjg36rChR0UxNijilbqARNbhrYB4RHxi22Pu6AHsqPcrvBp1TMWoH3m88slhVBwZO4TOGbJ09w8OKDzee1RSPqDwPnn3kpBEBHFJIYjHW0Gsw8cWsRE2LtLW0d4HyMQOOt/44uD2NbddvzxXnitRyoBSKG0Sd9QapUwiBeC94MWBCB6X0JWgjaaju+fsxg93bQM6J1oFwBXACmD2hM4uNgQ4DHwEtPzLHBcXfwKfID6QlqygzQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMH81V5MAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDAOaO8vAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==", kt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAFdSURBVDjLzZO/TsJQFMZ/t1QsmthEjQkmLoZJA7ODq/EdHBx9BcTEmMjCxsA7+Ao+gFOdCImOuoAs/qtIldL2OECxLY1EJ88Zbu6933e+c/988MtQ8akotOQaQqAklSAaS5hkEgQfmzcVTImJEjPfoMNjIjv5hpiiEgqiyJLXLiVAEpWU0oJ9HpQHoEeaWWFZPpGbiy17QlK35vaBqBAXaWajzp3sYWFJUQzRx2lIEQtLNmVMGQ0ZzPYuXQQX6OON5EGgjxstHkrp8k4A8c1xpBJgAMAwhTBMJ7jT1X5WGP5nBQ1dvve1mQq1wjGEX02rFX5S8HPOh16pVOYjiAHNnIeXTuidtc/XnOv4ERa8ky42fkpL9dXyfTnLXAzf54UmvdBCCkB01hcPHZ0djHh15QVHdHBV5BYAfOzq06npXMXhhl995TkKnxhINEqUyE49WYtW3JxRx82w/x/jC67KmykWiVPXAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", Gt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAACQElEQVRIx9WUz2sTURDHPzMvIb3VgyJKW/DXSXoKtSJIbaxtgi3of+BfIYKXgOAfUCh6zFFR9Ca1tomXigf7P/SQqo2giIrNpvvGw+7GStIlG/HgLI8dHvPmOzPvw4P/3SRx1hurde/9bL8g7z1mhveGWeQj0liq3CgNrLS28cKy2JNnj2yQvLnE6XQ6AHz/8Q3vPd6HhMk/3CcMw2j5fU5NnCMI2gMV3hUIggCAdrDHy9U1zDzeopF4b5g3jJCZKzN/xA8h0Ga2NAMIZoYRz91b3JmP4ttZBeIDPgzZWK8DgghEgzbMADNKc6W/6yD0nqtzJUQEVY2FonXQ2lkFkgNOlXq9gYoiqqgIiCJETM+XF7oFrTxYtjNnT6ci3NOBc45yuYxTh3MOVYeqxt0QJYjjp6cuUSwWe6p++vzxbE8HiYCosv5qI0rqFKeOxeuLqHOICHbgkr98/czH1k4qwj2XLMD8wjWcy5FzDudyICDxZ/FdBEHAm81Nms1mKsI9HRw/djL10hyuGz81fYHJyfOpCHcFDNu8c/f2RUveHTMS38xcNPookXlPYWSErXdbtHZ3UxHuCtyr3r9crd4qbCcb27+rHp848XNp8SYfdndQVUSEkUKBsbFxRo+MpiKcO7Bv1Wptr99YVh4uUywWab4/SqPxGhVFnaPV+nQowv0EDrVOp4Oqks/nqVQqAyGcSWAYhLMJDIHwUB1kQTiTQBrC0RtkRAhH+7l87m1yVgYRAOQwhPtZrVZrk7z0/9p+AWdQwNFPdOB+AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDA5LTEyLTAxVDAyOjIyOjM1KzAxOjAwqBTIawAAACV0RVh0ZGF0ZTptb2RpZnkAMjAwOS0xMi0wMVQwMjoyMjozNSswMTowMNlJcNcAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAE3RFWHRUaXRsZQBPcHRpY2FsIERyaXZlPme6DAAAAABJRU5ErkJggg==", Ft = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAAB3RJTUUH5goLBzIP6fiS+gAAAoFJREFUSMfVVk1rE2EQft55EyKeFU0PlcR6koIa+0FBa2NtEmyL9uLBIoHi0YvFogghIIjoTbx4MldB8BRUTJNeqh7MwT+gPaSpKdjak2bTnfGw3SVhP5p4EFxYmJf5eGbmfXZmgf/9UbZQqrwtM/OElxEzQ0TALBCxZChVmclcSe4HEGoLMjEwv+AoYvV6oOOr1y87kvkajYotxzc2lAug1Wp1BPi5swWTGcwmTHMXpmlaL+8i1n8ChtHsqkUOgGEYHYpisQgWqyXMAmGBwMT4hXFP+64AYvU66o0aFICx08OOUbj6EcICZgYzW/ZNw7ct3gBNKyM2TSyXyjjfZrRcKkMEgAiSk8m/rwAATGZcnEyi/UZSqRSU6kyw2SuA7aCJUC5XQE8eQRGBlMLoqbMdTt8AzAF4k7uH4wNxiAiKLOJFYVcFWmuk02lo0tBag0jjx+07ntmNDI0hkUgEUtgFoIhQer8MIgJpgiaNMz7lb+9s4fvmeiCFXZesAEylLkHrEEJaQ+sQGj4AH1ZXUavVAinsquDI4b6u58zQyDAGB096UtgFIJDVu/eXRsWeOyKw5VuA9gKofq5is9EIpLAD8CD/8Fw+n42s7Z1zz9/9snUvbmYxM30VG411EBGUUjgQieD6fNYJdPBL1ZPCobaEJJ8v/LYPuWjUURztiyKRSKBWP4RKZQWkCKQ14m3OK+UVTKVT/hUEPa1WC0SEcDiMTCbjUHh7ccmxmZmdtb6BIAC/2fLYMMSTws+eYvryNEhr1PqPOXGMhRu9VRBEYShAoXOM9NyiXinsC+A3coMobK1RAa7N7e0NRkipT66dvN/ubqcw1oKNC4VCE4D8k7+KP78ve+ZyfaadAAAAAElFTkSuQmCC", jt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5godFRotCxUC6QAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAPfSURBVEjHtVS/TyNHGH27Ozv+sRj/CDYuQCJSdBRp6CkjLlWkFFGUUCJLSUkBhfMPUCJEQZciihwqpEsTiQasSBQnIaUgd2ALkC4sxpzDcuZ8O+udbzaF2cXEwF2QstLTzOx+s2/mfe/7tHL5h+DCceC6LgxDh5QSvpSQkiB9CQrXJCGlBEmCvF734m7e+f5N3LtOB2+v3oAFgUKhMIpM7iPkRvKQvoQkgiQCSQWp+uakQEpCSgW6jpFEIFK9A4VzUjiuv8Afz38H0zQNhmHA5ByxWByGIWFIgkEEYgRDKRhSgRiBUY/QkApECqyPhIUkSoGRgsnj0HUDzDCM128uHTiOA/uvV70bRBKEp7+RRRJBSgJRD354Yyl7e1Uv3vn7NXzPBQPwaYAAQRBAKdVDoG7mdyAI5xSuCUrRQBwC/P+PNj8//02tVoNt2/B9H57nodvtwvM8CCHgui5SqVQskUjUbdve6d+8tLQEAFq5XA5WVlYKZ2dnn6+vr8vp6Wk+NTX1cmFh4TlLJpO/WJaFoaEhSCnBOY+IOOfgnCOdTiORSDyzbfvLfoJyuQxcC9FsNr9utVqrnueh3W6j1Wr9trW19RWbnJxELBZDPp/vWe/a277vRxgZGUEqlcLe3t6dMqytra3t7u5+v7GxAcdxsL29Dc/zPhsfHz9i+Xz+qRACuq5DKRW5IySSUqJYLPJ0Ov3qPp3r9fonjuMgHo8jFovBNE0IIfjR0dEoq1arODw8RKPRABFF+ocQQiCVSiEej9+byEaj8asQ4m0ulwPn/AvG2C6Al81mM8Ysy9pMJpOwLAtEBNM0I3DOYZomMpkMksnkMwC3cjA7OwsAWqVSWQWwOjMzM3R1ddXUdX21Wq3+DACMMQZN0wa93lcXhmGAc37fBSK3CyGSjDENQBTMiOip53lwXRdKKXS73Vsyua4L13W5aZoDOahUKreZgkAL7R8RTExMQNM0FAqFyD39CZZSIp/PI5VKYWdn5z8XGmu325uXl5e4uLgYsKfv++h2uyAidDqdgRx8EMHJyQmOj49xenp6y0VCiGjMZDKwLOtRrYIJIb4NW0JIIIS4BcZYTClVfxTB8vLy+vuCzs/PAQBPnjzRAAS1Wu3DCRYXF/P7+/uwbRtEFDW78PSu6yKbzeqWZbm1Wq390M+CYLA/M03T/tQ0Df+Gruv9Y1bX9R8BfPcQgVJqkKBYLOY7nQ4Mw4hcFNZCiGubfnxwcPCgHGNjYzqABICor7BMJrOey+XQ7XajGghJwjoYHR0dGh4e3nyf3tls9h2AnwC8eJTlSqWSViqV7vw2Nzen3bX+BxxQD5I249kcAAAAAElFTkSuQmCC", Qt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5godFRgEe5H4BwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAARuSURBVEjHtVRNaFRXFP7u+08mkxknYyxGU6QLEQwuko2LFkRw0UXAhWipWJql4LIEdCtuulfpYlZCbBdt0YKWLixIS2mLhVStEtJGOpSYZGbMOPPm3fvuOaeLyRsnpkY3PXC479537v3e+b77PYW+qFQqO0XkwdLS0s7V1dXrV69e/QCviNnZ2VPMPBfHMdI07aW1FlprRFGEYrEIr39To9EAM6NaraJarWK7ePjwIZgZnU4HWmsYY6C17qWIwPf9zQDtdhvMjHq9jpWVlW0BBgcHPWaG4zjwfR/GGPi+jzAMobUGM8N13c0ASikopeC6LlzX3RZgamqqxcytJEliIhJrLay1YGakaQrP85DL5TYDZCEieF2cOXPmJjPvSpJEAMBxHGQjEaFYLKJQKGwGEJHe4UqpbQFOnjw5yczntNZGay1aayRJ0tMiTVMQ0X938CZdDA8PH2Tm00mSIAgChGGIMAxhjIExBkQEpdRWgOzLX9dBoVCoE1HL87w4CAIxxiCKoh6AUgqe520V+U34B4BWq3WTiHbFcSwZNZkHjDFg5q0d9GvwOqCxsbFJZj4Xx7FJ01TSNIUxpmc413URRRG8SqWiZmZmBAAmJyfje/fuyQY9tv/A8+fPq0uXLvVQa7XaQWY+nTm5X1xjDESkS9HMzIxcu3ZteHV1VW7cuLGnVCo5Gy3mLly4MCgiOcdxmhcvXtT9gNVqtZ75oP8WZRRllHkb3H+aJMnHy8vL6/fv3y9Vq1UMDAy8v7i4uDQ+Pp6Loug0gK/6Ae7evXsTwC4A23LpAcDIyMg79Xrdb7Va5cePH6PRaMjQ0FBYLBZ3TkxMoFQqlV7eeOXKlUlmPpckibHWirUWRARmBhEhiqIXRisUCl/k8/nd+/fvP7CwsIC1tTVEUYTR0VHkcrnb5XJ5/mWAR48eHch80P83zdJxnK7It27dUocPH/7szp07T8Iw/LpWq0VBEKjx8XEcPXr0geM4x0+cOJFcvnxZnT17tkfH/Py8IaIe7y+ntbYrdMbhkSNHvp2bm5s6duzYrxMTE1Gz2by9b9++49PT00l2i/s7OHTokEtEaLfbm66ntRbGGARBgHw+jy12/eGn395d+uvPsmV//qMPpxdfJd4vv9eGvvum8l6z2bRaa7E2RWpT2NTCaI1CcRh794xBzc5+cmq9sQLdWVeA5fra02dkyfrh4IDnh3lrSawlWCIQEawlMLPTieOk8az+HHBAxCBLIOJunQD1RhPWAh4gc4HHCAYsIp+xI1fubiABMYPIhSUFYgdEbnedGFQI8NboMIjlxRoxLAmYBStrz/Dk72V4Qga7d3Tw9kgbe8sEKx5EXAg8MAIwPIg4EHgQuOCNFHHB4kFUVtsdRVyI8vDjz3/g8y+/h+e6PpqdAEtPA6y3GcQKxAAxg0VAbMGswALwxjsWgFiBGWBRvWeS7ihwsLD4D7RO4SnHu95KPDSbAWpNhqUX2d86sYCJkWbz3vpGrZXenBlYq69DmxT/e/wL/opRMma51lkAAAAASUVORK5CYII=";
function W(e) {
  this.point = e, this.contextMenu = null, this.updateContextMenu = () => {
    this.contextMenu && (this.contextMenu.destroy(), this.contextMenu = null), this.point.options.canDelete && this.initMenu(), this.point.contextMenu = this.contextMenu;
  }, this.initMenu = () => {
    this.point.element && (this.contextMenu = k.create([
      { id: "i" + this.point.guid + "_delete", title: "Delete point", image: q }
    ], this.point.element), this._setEventListeners());
  }, this._setEventListeners = () => {
    this.contextMenu.on("click", (t) => {
      t.itemId === "i" + e.guid + "_delete" && r.emit(g.POINT_DELETE_REQUEST, this.point);
    });
  };
}
function Wt() {
  return this.options = {
    id: "",
    width: 10,
    height: 10,
    classes: "",
    style: {
      "border-width": "1px",
      "border-style": "solid",
      "border-color": "black",
      "border-radius": "25px",
      cursor: "pointer",
      "background-color": "red"
    },
    canDrag: !0,
    canDelete: !1,
    zIndex: 1e3,
    bounds: {},
    moveDirections: [
      S.LEFT,
      S.TOP,
      S.RIGHT,
      S.BOTTOM
    ],
    visible: !0,
    hidden: !1,
    forceDisplay: !1,
    createDOMElement: !1
  }, this.x = 0, this.y = 0, this.element = null, this.guid = U(), this.subscriptions = {}, this.init = (e, t, s = null) => (this.x = parseInt(e), this.y = parseInt(t), this.setOptions(m({}, s)), this.setEventListeners(), r.emit(g.POINT_ADDED, this), this), this.setOptions = (e) => {
    if (e && typeof e == "object" && (E(e.moveDirections) && typeof e.moveDirections == "object" && (this.options.moveDirections = []), this.options = m(this.options, e)), Object.assign(this, new W(this)), !this.element)
      (this.options.createDOMElement && this.options.canDrag || this.options.forceDisplay) && (this.element = this.createPointUI(), this.setDOMEventListeners(), this.updateContextMenu(), r.emit(g.POINT_ADDED, this));
    else if ((!this.options.createDOMElement || !this.options.canDrag) && !this.options.forceDisplay)
      try {
        this.element.parentNode.removeChild(this.element), this.element = null;
      } catch {
      }
    this.options.id && this.element && (this.element.id = this.options.id);
  }, this.createPointUI = () => {
    const e = document.createElement("div");
    return this.options.canDrag ? this.setPointStyles(e) : e;
  }, this.setPointStyles = (e = null) => {
    if (this.element || (this.element = document.createElement("div"), this.setDOMEventListeners(), Object.assign(this, new W(this))), e == null && (e = this.element), this.options.id && (this.element.id = this.options.id, e.id = this.options.id), e.className = this.options.classes, e.style = this.options.style, typeof this.options.style == "object")
      for (let t in this.options.style)
        e.style[St(t)] = this.options.style[t];
    return e.style.width = this.options.width + "px", e.style.height = this.options.height + "px", e.style.left = this.x - parseInt(this.options.width / 2) + "px", e.style.top = this.y - parseInt(this.options.height / 2) + "px", e.style.zIndex = this.options.zIndex, !this.options.canDrag || !this.options.visible || this.options.hidden ? e.style.display = "none" : e.style.display = "", e.style.position = "absolute", typeof this.updateContextMenu == "function" && this.updateContextMenu(), e;
  }, this.redraw = () => {
    (this.options.canDrag && this.options.createDOMElement || this.options.forceDisplay) && (this.element = this.setPointStyles());
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.rotateBy = (e, t, s) => {
    const [i, o] = R(e, this.x, this.y, t, s);
    this.x = i, this.y = o;
  }, this.setEventListeners = () => {
    r.subscribe(z.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange);
  }, this.setDOMEventListeners = () => {
    !this.element || (this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown), this.element.addEventListener("mouseover", this.mouseover), this.element.addEventListener("mouseout", this.mouseout), this.element.addEventListener("click", this.click), this.element.addEventListener("dblclick", this.doubleclick), this.element.addEventListener("mousemove", this.mousemove));
  }, this.mousedown = (e) => {
    r.emit(g.POINT_MOUSE_DOWN, this, u(e)), e.buttons === 1 && this.options.canDrag && (r.emit(g.POINT_DRAG_START, this, u(e)), X(e));
  }, this.mousemove = (e) => {
    if (r.emit(g.POINT_MOUSE_MOVE, this, u(e)), e.buttons !== 1 || !this.options.canDrag || !f.draggedShape || f.draggedShape.draggedPoint !== this)
      return;
    const t = this.x, s = this.y, i = D(this.element.parentNode, !0);
    if (!this.checkFitBounds(this.x + e.movementX, this.y + e.movementY)) {
      r.emit(g.POINT_DRAG_MOVE, this, u(e, { oldX: t, oldY: s }));
      return;
    }
    let o = e.clientX + window.scrollX - i.left - this.options.width / 2, n = e.clientY + window.scrollY - i.top - this.options.height / 2;
    [o, n] = this.applyMoveRestrictions(o, n, t, s), this.x = o, this.y = n, this.element.style.left = this.x + "px", this.element.style.top = this.y + "px", r.emit(g.POINT_DRAG_MOVE, this, u(e, { oldX: t, oldY: s }));
  }, this.mouseover = (e) => {
    r.emit(g.POINT_MOUSE_OVER, this, u(e));
  }, this.mouseout = (e) => {
    r.emit(g.POINT_MOUSE_OUT, this, u(e));
  }, this.click = (e) => {
    r.emit(g.POINT_MOUSE_CLICK, this, u(e));
  }, this.doubleclick = (e) => {
    r.emit(g.POINT_MOUSE_DOUBLE_CLICK, this, u(e));
  }, this.checkFitBounds = (e, t) => !(this.options.bounds.left !== -1 && e < this.options.bounds.left || this.options.bounds.right !== -1 && e > this.options.bounds.right || this.options.bounds.top !== -1 && t < this.options.bounds.top || this.options.bounds.bottom !== -1 && t > this.options.bounds.bottom), this.applyMoveRestrictions = (e, t, s, i) => (t > i && this.options.moveDirections.indexOf(S.BOTTOM) === -1 && (t = i), t < i && this.options.moveDirections.indexOf(S.TOP) === -1 && (t = i), e > s && this.options.moveDirections.indexOf(S.RIGHT) === -1 && (e = s), e < s && this.options.moveDirections.indexOf(S.LEFT) === -1 && (e = s), e > this.options.bounds.right && this.options.bounds.right !== -1 && (e = this.options.bounds.right), t > this.options.bounds.bottom && this.options.bounds.bottom !== -1 && (t = this.options.bounds.bottom), e < this.options.bounds.left && this.options.bounds.left !== -1 && (e = this.options.bounds.left), t < this.options.bounds.top && this.options.bounds.top !== -1 && (t = this.options.bounds.top), [e, t]), this.mouseup = (e) => {
    r.emit(g.POINT_MOUSE_UP, this, u(e)), e.button !== 2 && r.emit(g.POINT_DRAG_END, this, u(e));
  }, this.onBoundsChange = (e) => {
    e.points.find((t) => t === this) && (this.options.bounds = e.bounds);
  }, this.toJSON = () => JSON.stringify(this.getJSON()), this.getJSON = () => ({
    x: this.x,
    y: this.y,
    options: m({}, this.options)
  }), this.fromJSON = (e) => {
    let t = e;
    if (typeof t == "string" && (t = H(e)), !t)
      return null;
    this.x = t.x, this.y = t.y;
    let s = !1;
    return this.element || (s = !0, this.element = document.createElement("div")), this.setOptions(t.options), s && r.emit(g.POINT_ADDED, this), this;
  }, this.destroy = () => {
    this.element && (this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), this.element.removeEventListener("mouseover", this.mouseover), this.element.removeEventListener("mouseout", this.mouseout), this.element.removeEventListener("click", this.click), this.element.removeEventListener("dblclick", this.doubleclick), this.element.removeEventListener("mousemove", this.mousemove)), r.unsubscribe(z.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange), r.emit(g.POINT_DESTROYED, this);
    for (let e in this.subscriptions)
      this.subscriptions[e].forEach((s) => r.unsubscribe(e, s)), this.subscriptions[e] = [];
  }, this.addEventListener = (e, t) => {
    typeof this.subscriptions[e] > "u" && (this.subscriptions[e] = []);
    const s = r.subscribe(e, (i) => {
      i.target && i.target.guid === this.guid && t(i);
    });
    return this.subscriptions[e].push(s), s;
  }, this.removeEventListener = (e, t) => {
    this.subscriptions[e] && typeof this.subscriptions[e] < "u" && this.subscriptions[e].splice(this.subscriptions[e].indexOf(t), 1), r.unsubscribe(e, t);
  }, this.distance = (e) => C(this.x, this.y, e.x, e.y), this;
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
  POINT_MOUSE_DOUBLE_CLICK: "dblclick",
  POINT_DELETE_REQUEST: "point_delete_request"
}, S = {
  TOP: 0,
  LEFT: 1,
  RIGHT: 2,
  BOTTOM: 3
};
function Yt(e) {
  this.rotateBox = e, this.subscriptions = {
    rotate: []
  }, this.initialAngle = 0, this.previousAngle = 0, this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    this.interceptEventsFromShape(), this.rotateBox.shape.points.forEach((t) => {
      t.mousemove = this.mousemove, t.mouseDownListener = t.addEventListener(g.POINT_DRAG_START, (s) => {
        this.onPointMouseDown(s), r.emit(a.POINT_DRAG_START, this.rotateBox, { point: t });
      }), t.mouseUpListener = t.addEventListener(g.POINT_DRAG_END, (s) => {
        this.onPointMouseUp(s), r.emit(a.POINT_DRAG_END, this.rotateBox, { point: t });
      });
    });
  }, this.interceptEventsFromShape = () => {
    a.getShapeMouseEvents().forEach((t) => {
      this.shapeEventListeners[t.name] = this.rotateBox.shape.addEventListener(t.name, (s) => {
        t.key === "SHAPE_MOVE_END" && (this.previousAngle = 0), r.emit(t.name, this.rotateBox, s);
      });
    });
  }, this.mousemove = (t) => {
    if (t.buttons !== 1) {
      r.emit(
        a.SHAPE_MOUSE_MOVE,
        this.rotateBox.shape,
        u(t, { clientX: t.clientX, clientY: t.clientY })
      );
      return;
    }
    const [s, i] = J(t, this.rotateBox.shape.root), [o, n] = this.rotateBox.shape.getCenter();
    let h = this.calcAngle(s, i, o, n);
    if (h === null)
      return;
    let p = h;
    this.previousAngle && (p -= this.previousAngle), this.previousAngle = h, r.emit(T.ROTATE_BOX_ROTATE, this.rotateBox, { angle: p });
  }, this.calcAngle = (t, s, i, o) => {
    const n = this.calcHypotenuse(t, s, i, o);
    if (n <= 0)
      return null;
    const h = this.calcCathetus(t, s, i, o), p = this.calcStartAngle(t, s, i, o);
    return Math.round(it(Math.asin(h / n)) + p + this.initialAngle);
  }, this.calcHypotenuse = (t, s, i, o) => C(t, s, i, o), this.calcCathetus = (t, s, i, o) => {
    if (t <= i && s <= o)
      return C(t, s, t, o);
    if (t >= i && s <= o)
      return C(t, s, i, s);
    if (t >= i && s >= o)
      return C(t, s, t, o);
    if (t <= i && s >= o)
      return C(t, s, i, s);
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
    const i = r.subscribe(t, (o) => {
      o.target && o.target.shape && o.target.shape.guid === this.rotateBox.shape.guid && s(o);
    });
    return this.subscriptions[t].push(i), i;
  }, this.removeEventListener = (t, s) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(s), 1), r.unsubscribe(t, s);
  }, this.destroy = () => {
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((i) => r.unsubscribe(t, i)), this.subscriptions[t] = [];
    Object.keys(this.shapeEventListeners).forEach(
      (t) => {
        this.rotateBox.removeEventListener(t, this.shapeEventListeners[t]);
      }
    ), this.rotateBox.shape.points.forEach((t) => {
      t.removeEventListener(g.POINT_DRAG_START, t.mouseDownListener), t.removeEventListener(g.POINT_DRAG_END, t.mouseUpListener);
    });
  };
}
const T = {
  ROTATE_BOX_ROTATE: "rotate"
};
function Zt(e) {
  this.resizeBox = e, this.subscriptions = {
    resize: []
  }, this.guid = U(), this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    r.subscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), r.subscribe(g.POINT_DRAG_END, this.onPointDragMove), a.getShapeMouseEvents().forEach((t) => {
      this.shapeEventListeners[t.name] = this.resizeBox.shape.addEventListener(t.name, (s) => {
        r.emit(t.name, this.resizeBox, s);
      });
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
    this.resizeBox.redraw(), r.emit(a.POINT_DRAG_END, this.resizeBox, u(t, { point: t.target })), r.emit(w.RESIZE_BOX_RESIZE, this.resizeBox, { oldPos: s, newPos: i });
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
    const i = r.subscribe(t, (o) => {
      o.target && o.target.guid && o.target.guid === this.resizeBox.guid && s(o);
    });
    return this.subscriptions[t].push(i), i;
  }, this.removeEventListener = (t, s) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(s), 1), r.unsubscribe(t, s);
  }, this.destroy = () => {
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((i) => r.unsubscribe(t, i)), this.subscriptions[t] = [];
    Object.keys(this.shapeEventListeners).forEach(
      (t) => {
        this.resizeBox.removeEventListener(t, this.shapeEventListeners[t]);
      }
    ), r.unsubscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), r.unsubscribe(g.POINT_DRAG_END, this.onPointDragMove);
  };
}
const w = {
  RESIZE_BOX_RESIZE: "resize"
};
function Xt(e) {
  this.shape = e, this.subscriptions = {
    CONTAINER_BOUNDS_CHANGED: []
  }, this.run = () => (this.shape = e, this.setEventListeners(), this), this.setEventListeners = () => {
    r.subscribe(g.POINT_DESTROYED, this.onPointDestroyed), r.subscribe(g.POINT_ADDED, this.onPointAdded), r.subscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), r.subscribe(g.POINT_DELETE_REQUEST, this.onPointDeleteRequest);
  }, this.setSvgEventListeners = () => {
    this.svg_mouseover = this.shape.svg.addEventListener("mouseover", (t) => {
      f.mouseover(u(t, { target: this.shape }));
    }), this.svg_mouseout = this.shape.svg.addEventListener("mouseout", (t) => {
      f.mouseout(u(t, { target: this.shape }));
    }), this.svg_mouseenter = this.shape.svg.addEventListener("mouseenter", (t) => {
      f.mouseenter(u(t, { target: this.shape }));
    }), this.svg_mousedown = this.shape.svg.addEventListener("mousedown", (t) => {
      f.mousedown(u(t, { target: this.shape }));
    }), this.svg_click = this.shape.svg.addEventListener("click", (t) => {
      f.click(u(t, { target: this.shape }));
    }), this.svg_dblclick = this.shape.svg.addEventListener("dblclick", (t) => {
      f.doubleclick(u(t, { target: this.shape }));
    });
  }, this.removeSvgEventListeners = () => {
    this.shape.svg.removeEventListener("mouseover", this.svg_mouseover), this.shape.svg.removeEventListener("mouseout", this.svg_mouseout), this.shape.svg.removeEventListener("mouseenter", this.svg_mouseenter), this.shape.svg.removeEventListener("mousedown", this.svg_mousedown), this.shape.svg.removeEventListener("click", this.svg_click), this.shape.svg.removeEventListener("dblclick", this.svg_dblclick);
  }, this.addResizeEventListener = () => {
    !this.shape.resizeBox || (this.resizeBoxListener = this.shape.resizeBox.addEventListener(w.RESIZE_BOX_RESIZE, this.onResize), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOVE_START, this.mousedown), this.resizeMouseMoveEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_MOVE, this.mousemove), this.resizeClickEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_CLICK, this.click), this.resizeDblClickEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_DOUBLE_CLICK, this.svg_dblclick), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_DOWN, this.svg_mousedown), this.resizeMouseOverEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_OVER, this.svg_mouseover), this.resizeMouseOutEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_OUT, this.svg_mouseout), this.resizeMouseUpEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_UP, (t) => {
      r.emit(a.SHAPE_MOUSE_UP, this.shape, u(t));
    }), this.resizeBoxContextMenuEventListener = this.shape.resizeBox.shape.svg.addEventListener("contextmenu", (t) => {
      this.shape.contextMenu && this.shape.contextMenu.onEvent(t);
    }));
  }, this.addRotateEventListener = () => {
    !this.shape.rotateBox || (this.rotateBoxListener = this.shape.rotateBox.addEventListener(T.ROTATE_BOX_ROTATE, this.onRotate), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOVE_START, this.mousedown), this.rotateMouseMoveEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_MOVE, this.mousemove), this.rotateClickEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_CLICK, this.click), this.rotateDblClickEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_DOUBLE_CLICK, this.svg_dblclick), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_DOWN, this.svg_mousedown), this.rotateMouseUpEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_UP, (t) => {
      r.emit(a.SHAPE_MOUSE_UP, this.shape, u(t));
    }), this.rotateMouseOverEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_OVER, this.svg_mouseover), this.rotateMouseOutEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_OUT, this.svg_mouseout), this.rotatePointDragStartEventListener = this.shape.rotateBox.addEventListener(a.POINT_DRAG_START, (t) => {
      this.shape.initCenter = this.shape.getCenter(this.shape.options.groupChildShapes);
    }), this.rotatePointDragEndEventListener = this.shape.rotateBox.addEventListener(a.POINT_DRAG_END, (t) => {
      this.shape.initCenter = null, this.shape.points.forEach((s) => {
        !s.options.hidden && s.element && (s.element.style.display = "");
      });
    }), this.rotateBoxContextMenuEventListener = this.shape.rotateBox.shape.svg.addEventListener("contextmenu", (t) => {
      this.shape.contextMenu && this.shape.contextMenu.onEvent(t);
    }));
  }, this.onResize = (t) => {
    const s = this.shape.getRootParent(!0);
    if (s) {
      r.emit(w.RESIZE_BOX_RESIZE, s.resizeBox, { newPos: t.newPos, oldPos: t.oldPos });
      return;
    }
    const i = t.newPos.left - t.oldPos.left, o = t.newPos.top - t.oldPos.top;
    this.shape.moveBy(i, o);
    const [n, h] = this.shape.getMaxPointSize();
    this.shape.scaleTo(t.newPos.width - n * 2, t.newPos.height - h * 2), this.shape.redraw(), r.emit(w.RESIZE_BOX_RESIZE, this.shape, t);
  }, this.onRotate = (t) => {
    const s = this.shape.getRootParent(!0);
    if (s) {
      r.emit(T.ROTATE_BOX_ROTATE, s.rotateBox, { angle: t.angle });
      return;
    }
    this.shape.rotateBy(t.angle), this.shape.redraw(), r.emit(T.ROTATE_BOX_ROTATE, this.shape, t);
  }, this.mousedown = (t) => {
    X(t), r.emit(a.SHAPE_MOUSE_DOWN, this.shape, u(t)), setTimeout(() => {
      r.emit(
        a.SHAPE_MOVE_START,
        this.shape,
        u(t, { pos: this.shape.getPosition(this.shape.options.groupChildShapes) })
      );
    }, 100);
  }, this.mousemove = (t) => {
    if (this.shape.draggedPoint || r.emit(a.SHAPE_MOUSE_MOVE, this.shape, u(t)), t.buttons !== 1)
      return;
    if (this.shape.draggedPoint) {
      r.emit(a.POINT_DRAG_MOVE, this.shape, { point: this.shape.draggedPoint }), this.shape.draggedPoint.mousemove(t);
      return;
    }
    if (!this.shape.options.canDragShape)
      return;
    const [s, i] = this.calcMovementOffset(t);
    if (s === null || i === null)
      return;
    const o = this.shape.getPosition(this.shape.options.groupChildShapes);
    this.shape.moveBy(s, i), this.shape.redraw();
    const n = this.shape.getPosition(this.shape.options.groupChildShapes);
    r.emit(a.SHAPE_MOVE, this.shape, u(t, { oldPos: o, newPos: n }));
  }, this.mouseenter = (t) => {
    r.emit(a.SHAPE_MOUSE_ENTER, this.shape, u(t));
  }, this.mouseover = (t) => {
    f.draggedShape !== this.shape && r.emit(a.SHAPE_MOUSE_OVER, this.shape, u(t));
  }, this.mouseout = (t) => {
    r.emit(a.SHAPE_MOUSE_OUT, this.shape, u(t));
  }, this.click = (t) => {
    r.emit(a.SHAPE_MOUSE_CLICK, this.shape, u(t));
  }, this.doubleclick = (t) => {
    r.emit(a.SHAPE_MOUSE_DOUBLE_CLICK, this.shape, u(t));
  }, this.calcMovementOffset = (t) => {
    this.shape.calcPosition();
    const s = this.shape.getPosition(this.shape.options.groupChildShapes);
    let i = t.movementX, o = t.movementY, n = t.clientX + window.scrollX, h = t.clientY + window.scrollY;
    const p = s.left + i, l = s.top + o, A = D(this.shape.root, !0), c = this.shape.getBounds();
    return (p < c.left || p + s.width > c.right) && (i = 0), (l < c.top || l + s.height > c.bottom) && (o = 0), n < p + A.left && (i = n - (p + A.left)), h < l + A.top && (o = h - (l + A.top)), n > p + s.width + A.left && (i = n - (s.width + A.left + s.left)), h > l + s.height + A.right && (o = h - (s.height + A.top + s.top)), [i, o];
  }, this.onPointAdded = (t) => {
    if (!!this.shape.isShapePoint(t.target)) {
      if (t.target.element)
        try {
          this.shape.root.appendChild(t.target.element);
        } catch {
        }
      r.emit(a.POINT_ADDED, this.shape, { point: t.target });
    }
  }, this.onPointDragMove = (t) => {
    this.shape.isShapePoint(t.target) && this.shape.redraw();
  }, this.onPointDestroyed = (t) => {
    if (!!this.shape.isShapePoint(t.target)) {
      this.shape.points.splice(this.shape.points.indexOf(t.target), 1);
      try {
        this.shape.root.removeChild(t.target.element), this.shape.redraw();
      } catch {
      }
      r.emit(a.POINT_DESTROYED, this.shape, { point: t.target });
    }
  }, this.onPointDeleteRequest = (t) => {
    !this.shape.isShapePoint(t.target) || this.shape.deletePoint(t.target.x, t.target.y);
  }, this.addEventListener = (t, s) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const i = r.subscribe(t, (o) => {
      o.target && o.target.guid === this.shape.guid && s(o);
    });
    return this.subscriptions[t].push(i), i;
  }, this.removeEventListener = (t, s) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(s), 1), r.unsubscribe(t, s);
  }, this.destroy = () => {
    r.unsubscribe(g.POINT_ADDED, this.onPointAdded), r.unsubscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), r.unsubscribe(g.POINT_DESTROYED, this.onPointDestroyed), r.unsubscribe(g.POINT_DELETE_REQUEST, this.onPointDeleteRequest), this.shape.resizeBox && (this.shape.resizeBox.removeEventListener(w.RESIZE_BOX_RESIZE, this.resizeBoxListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_CLICK, this.resizeClickEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_MOVE, this.resizeMouseMoveEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOVE_START, this.resizeMouseDownEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_UP, this.resizeMouseUpEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_DOUBLE_CLICK, this.resizeDblClickEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_OVER, this.resizeMouseOverEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_OUT, this.resizeMouseOutEventListener), this.shape.resizeBox.removeEventListener("contextmenu", this.resizeBoxContextMenuEventListener)), this.shape.rotateBox && (this.shape.rotateBox.removeEventListener(T.ROTATE_BOX_ROTATE, this.rotateBoxListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_CLICK, this.rotateClickEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_MOVE, this.rotateMouseMoveEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOVE_START, this.rotateMouseDownEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOVE_START, this.rotatePointDragStartEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOVE_START, this.rotatePointDragEndEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_UP, this.rotateMouseUpEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_DOUBLE_CLICK, this.rotateDblClickEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_OVER, this.rotateMouseOverEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_OUT, this.rotateMouseOutEventListener), this.shape.rotateBox.removeEventListener("contextmenu", this.rotateBoxContextMenuEventListener));
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((i) => r.unsubscribe(t, i)), this.subscriptions[t] = [];
  };
}
const a = {
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
  SHAPE_SHOW: "show",
  SHAPE_HIDE: "hide",
  POINT_ADDED: "point_added",
  POINT_DESTROYED: "point_destroyed",
  POINT_DRAG_START: "point_drag_start",
  POINT_DRAG_MOVE: "point_drag_move",
  POINT_DRAG_END: "point_drag_end",
  SHAPE_RESIZE: "resize",
  SHAPE_ROTATE: "rotate",
  SHAPE_ADD_CHILD: "add_child",
  SHAPE_REMOVE_CHILD: "remove_child",
  SHAPE_ACTIVATED: "shape_activated",
  getShapeMouseEvents: () => Object.keys(a).filter((e) => ["SHAPE_CREATE", "SHAPE_DESTROY", "SHAPE_RESIZE", "SHAPE_ROTATE"].indexOf(e) === -1 && typeof a[e] != "function").map((e) => ({ key: e, name: a[e] }))
};
function Jt() {
  this.draw = (e) => {
    if (e.svg)
      try {
        e.eventListener.removeSvgEventListeners(), e.svg.innerHTML = "";
      } catch {
      }
    else
      e.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), e.svg.ondragstart = function() {
        return !1;
      }, e.options.visible && r.emit(a.SHAPE_SHOW, e), e.eventListener.setSvgEventListeners(), e.root.appendChild(e.svg);
    if (e.points.length < 1)
      return;
    e.shapeMenu.contextMenu || e.shapeMenu.updateContextMenu(), this.updateOptions(e);
    const t = this.drawPolygon(e);
    e.svg.appendChild(t);
  }, this.updateOptions = (e) => {
    if (!e.svg || typeof e.svg > "u")
      return;
    typeof e.options.visible < "u" && (e.svg.style.display !== e.options.visible && (e.options.visible ? r.emit(a.SHAPE_SHOW, e) : r.emit(a.SHAPE_HIDE, e)), e.svg.style.display = e.options.visible ? "" : "none"), e.calcPosition(), e.svg.id = e.options.id, e.svg.style.position = "absolute", e.svg.style.cursor = "default", e.svg.style.left = e.left + "px", e.svg.style.top = e.top + "px", e.svg.setAttribute("width", e.width), e.svg.setAttribute("height", e.height), e.svg.setAttribute("guid", e.guid), this.setupShapeFill(e), this.setupSVGFilters(e), e.svg.style.zIndex = e.options.zIndex;
    const t = e.getRootParent(!0);
    e.options.pointOptions.canDrag && this.updatePoints(e, t), this.redrawResizeBox(t || e), this.redrawRotateBox(t || e);
  }, this.updatePoints = (e, t) => {
    e.points.filter((s) => s.element).forEach((s) => {
      s.element.parentNode !== e.root && e.root.appendChild(s.element), s.options.zIndex = e.options.zIndex + 2, e.options.visible || (s.options.visible = !1), s.redraw(), e.options.displayMode === d.DEFAULT && !s.options.forceDisplay && (!t || t.options.displayMode === d.DEFAULT) && (s.element.style.display = "none");
    });
  }, this.drawPolygon = (e) => {
    let t = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    e.points.length > 2 && (t = document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
    const s = e.points.map((i) => "" + (i.x - e.left) + "," + (i.y - e.top)).join(" ");
    return t.setAttribute("points", s), this.setupPolygonFill(e, t), this.setupPolygonStyles(e, t), e.svg.querySelector("defs") && e.svg.querySelector("defs").querySelector("filter") && (t.style.filter = 'url("#' + e.guid + '_filter")'), t.style.zIndex = e.options.zIndex, t;
  }, this.redrawResizeBox = (e) => {
    if (!e.resizeBox)
      return;
    const t = e.getResizeBoxBounds();
    e.resizeBox.left = t.left, e.resizeBox.top = t.top, e.resizeBox.width = t.width, e.resizeBox.height = t.height, e.resizeBox.options.zIndex = e.options.zIndex + 1, e.resizeBox.redraw();
  }, this.redrawRotateBox = (e) => {
    if (!e.rotateBox)
      return;
    const t = e.getResizeBoxBounds();
    e.rotateBox.left = t.left, e.rotateBox.top = t.top, e.rotateBox.width = t.width, e.rotateBox.height = t.height, e.rotateBox.options.zIndex = e.options.zIndex + 1, e.rotateBox.redraw();
  }, this.setupShapeFill = (e) => {
    const t = e.options.style.fill || "none";
    let s = e.svg.querySelector("defs");
    if (t === "#image" && e.options.fillImage && typeof e.options.fillImage == "object") {
      const i = this.createImageFill(e);
      i && (s || (s = document.createElementNS(e.svg.namespaceURI, "defs")), s.appendChild(i), e.svg.appendChild(s));
    } else if (t === "#gradient" && e.options.fillGradient && typeof e.options.fillGradient == "object" && ["linear", "radial"].indexOf(e.options.fillGradient.type) !== -1) {
      const i = this.createGradient(e);
      i && (s || (s = document.createElementNS(e.svg.namespaceURI, "defs")), s.appendChild(i), e.svg.appendChild(s));
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
      const n = document.createElementNS(e.svg.namespaceURI, "stop");
      E(o.stopColor) && n.setAttribute("offset", o.offset), E(o.stopColor) && n.setAttribute("stop-color", o.stopColor), E(o.stopOpacity) && n.setAttribute("stop-opacity", o.stopOpacity), t.appendChild(n);
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
    return t.href && i.setAttribute("href", t.href), i.setAttribute("width", t.width), i.setAttribute("height", t.height), s.appendChild(i), s;
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
      i.setAttribute(o, s[o].toString()), o === "dx" && e.svg.setAttribute("width", (e.width + parseInt(s.dx) * 2).toString()), o === "dy" && e.svg.setAttribute("height", (e.height + parseInt(s.dy) * 2).toString());
    return i;
  }, this.setupPolygonFill = (e, t) => {
    const s = e.options.style.fill || "none";
    s === "#image" && e.options.fillImage && typeof e.options.fillImage == "object" ? t.setAttribute("fill", 'url("#' + e.guid + '_pattern")') : s === "#gradient" && e.options.fillGradient && typeof e.options.fillGradient == "object" && ["linear", "radial"].indexOf(e.options.fillGradient.type) !== -1 && t.setAttribute("fill", 'url("#' + e.guid + '_gradient")');
  }, this.setupPolygonStyles = (e, t) => {
    if (e.options.classes && t.setAttribute("class", e.options.classes), !(!E(e.options.style) || typeof e.options.style != "object"))
      for (let s in e.options.style)
        t.style[s] = e.options.style[s];
  }, this.toSvg = (e, t = null) => {
    const s = document.createElement("div"), i = this.getSvg(e, t);
    return s.appendChild(i), '<?xml version="1.0" encoding="UTF-8"?>' + s.innerHTML.replace(/&quot;/g, "'");
  }, this.getSvg = (e, t) => {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg"), i = e.getPosition(t === null ? e.options.groupChildShapes : t);
    s.appendChild(this.getSvgDefs(e, t)), e.svg || this.draw(e), this.addSvgPolygons(e, s, t), s.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const o = "0 0 " + i.width + " " + i.height;
    return s.setAttribute("viewBox", o), s;
  }, this.getSvgDefs = (e, t = null) => {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    if (e.svg || e.redraw(), e.svg) {
      const i = e.svg.querySelector("defs");
      i && (s.innerHTML = i.innerHTML);
    }
    return (t === !0 || e.options.groupChildShapes && t !== !1) && e.getChildren(!0).forEach((i) => {
      if (i.svg || i.redraw(), i.svg) {
        const o = i.svg.querySelector("defs");
        o && (s.innerHTML += o.innerHTML);
      }
    }), s;
  }, this.addSvgPolygons = (e, t, s) => {
    const i = e.getPosition(s || e.options.groupChildShapes), o = [];
    if (e.svg || e.redraw(), e.svg) {
      let n = e.svg.querySelector("polygon");
      if (n) {
        n = n.cloneNode();
        const h = e.points.map(
          (p) => "" + (p.x - i.left) + "," + (p.y - i.top)
        ).join(" ");
        n.setAttribute("points", h), o.push({ polygon: n, zIndex: e.options.zIndex });
      }
    }
    if ((s === !0 || e.options.groupChildShapes && s !== !1) && e.getChildren(!0).forEach((n) => {
      if (n.svg || n.redraw(), !n.svg)
        return;
      let h = n.svg.querySelector("polygon");
      if (h) {
        h = h.cloneNode();
        const p = n.points.map(
          (l) => "" + (l.x - i.left) + "," + (l.y - i.top)
        ).join(" ");
        h.setAttribute("points", p), o.push({ polygon: h, zIndex: n.options.zIndex });
      }
    }), !!o.length) {
      o.sort((n, h) => n.zIndex - h.zIndex);
      for (let n of o)
        t.appendChild(n.polygon);
    }
  }, this.toPng = (e, t = V.DATAURL, s = null, i = null, o = null) => new Promise(async (n) => {
    e.calcPosition();
    const h = e.getPosition(o || e.options.groupChildShapes);
    [s, i] = Y(s, i, h.width, h.height);
    const p = this.getSvg(e, o);
    p.setAttribute("width", h.width), p.setAttribute("height", h.height);
    for (let x of p.querySelectorAll("image"))
      if (x.getAttribute("href") && x.getAttribute("href").length) {
        const M = await j(await (await fetch(x.getAttribute("href"))).blob());
        x.setAttribute("href", M);
      }
    const l = document.createElement("div");
    l.appendChild(p);
    const A = l.innerHTML, c = new Image(), b = new Blob([A], { type: "image/svg+xml" }), N = window.URL || window.webkitURL || window, _ = await j(b);
    c.addEventListener("load", () => {
      const x = document.createElement("canvas");
      c.width = h.width, c.height = h.height, x.width = c.width, x.height = c.height;
      const M = x.getContext("2d");
      M.drawImage(c, 0, 0), M.scale(s, i), N.revokeObjectURL(_);
      const G = x.toDataURL("image/png");
      if (t === V.BLOB) {
        n(bt(G));
        return;
      }
      n(G);
    }), c.src = _;
  }), this.moveShapeToTop = (e) => {
    const t = f.getMaxZIndex(e.root);
    e.options.zIndex === t && f.findShapesByOptionValue("zIndex", t).length === 1 || this.changeShapeZIndex(e, t + 1);
  }, this.moveShapeToBottom = (e) => {
    const t = f.getMinZIndex(e.root);
    e.options.zIndex === t && f.findShapesByOptionValue("zIndex", t).length === 1 || this.changeShapeZIndex(e, t - 1);
  }, this.changeShapeZIndex = (e, t) => {
    if (t === e.options.zIndex)
      return;
    const s = t - e.options.zIndex;
    e.options.prevZIndex = e.options.zIndex, e.options.zIndex += s, this.updateOptions(e), e.options.groupChildShapes && e.getChildren(!0).forEach((i) => {
      i.options.prevZIndex = i.options.zIndex, i.options.zIndex += s, this.updateOptions(i);
    });
  };
}
const V = {
  DATAURL: "dataurl",
  BLOB: "blob"
}, O = new Jt(), Kt = (e, t, s = {}, i = null) => {
  if (!E(t) || typeof t != "object" || (E(t.features) || (t = { features: [t] }), !t.features.length))
    return null;
  const o = [];
  for (let n in t.features) {
    const h = t.features[n], p = qt(h, n, s, e);
    i && typeof i == "function" && i(n, t.features.length, p), p && o.push(p);
  }
  return o.length === 1 ? o[0] : o;
}, qt = (e, t, s, i) => {
  if (!$t(e))
    return;
  let o = te(e, t, s);
  o.visible = !1;
  const { polygons: n, origPolygons: h, offsetX: p, offsetY: l } = ee(e);
  o.offsetX = p, o.offsetY = l;
  let A = null;
  for (let c in n) {
    const b = m({}, o);
    b.initialPoints = [...h[c]], c == 0 ? A = f.createShape(i, b, n[c], !1) : (b.id += "_" + c, b.name += " " + c, A.addChild(f.createShape(i, b, n[c]), !1));
  }
  return E(s.scale) ? A.scaleBy(s.scale, s.scale, !0) : (E(s.width) || E(s.height)) && A.scaleTo(s.width, s.height), A;
}, $t = (e) => {
  if (!E(e.properties) || typeof e.properties != "object")
    return !1;
  const t = e.geometry;
  return !(!E(t) || typeof t != "object" || ["Polygon", "MultiPolygon"].indexOf(t.type) === -1 || !E(t.coordinates) || typeof t.coordinates != "object" || !t.coordinates.length);
}, te = (e, t, s) => {
  const i = {};
  if (i.name = e.properties[s.nameField] || "Shape " + t, i.id = e.properties[s.idField] || "shape_" + t, E(s.fields) && typeof s.fields == "object" && s.fields.filter((o) => E(e.properties[o])).forEach((o) => i[o] = e.properties[o]), E(s.options) && typeof s.options == "object")
    for (let o in s.options)
      i[o] = s.options[o];
  return i;
}, ee = (e) => {
  let t = e.geometry.coordinates;
  e.geometry.type === "Polygon" && (t = [t]);
  const s = { polygons: [], origPolygons: t.map((i) => m({}, i[0])) };
  s.offsetX = 0, s.offsetY = 0;
  for (let i of t) {
    const o = i[0];
    for (let n of o) {
      const [h, p] = ht(n[1], n[0]);
      n[0] = h, n[1] = p;
    }
    s.polygons.push(o);
  }
  return s;
};
function se() {
  this.shapes = {}, this.visibleShapes = {}, this.activeShape = null, this.draggedShape = null, this.shapeOnCursor = null, this.containerEventListeners = [], this.init = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    r.subscribe(a.SHAPE_CREATE, this.onShapeCreated), r.subscribe(a.SHAPE_DESTROY, this.onShapeDestroy), r.subscribe(a.SHAPE_SHOW, this.onShapeShow), r.subscribe(a.SHAPE_HIDE, this.onShapeHide), r.subscribe(a.SHAPE_MOVE_START, this.onShapeMoveStart), r.subscribe(a.SHAPE_MOUSE_ENTER, this.onShapeMouseEnter), r.subscribe(g.POINT_DRAG_START, this.onPointDragStart), r.subscribe(g.POINT_DRAG_END, this.onPointDragEnd), window.addEventListener("resize", this.onWindowResize);
  }, this.onWindowResize = (e) => {
    for (let t in this.shapes) {
      const s = this.shapes[t];
      r.emit(
        z.CONTAINER_BOUNDS_CHANGED,
        s,
        { bounds: s.getBounds(), points: s.points }
      );
    }
  }, this.createShape = (e, t, s, i = !0) => new B().init(e, t, s, i), this.onShapeCreated = (e) => {
    const t = e.target;
    E(t.root) && !this.getShape(t) && typeof t.belongsToShape == "function" && (this.addShape(t), this.activeShape || (this.activeShape = t));
  }, this.addShape = (e) => {
    this.shapes[e.guid] = e, e.options.visible && this.isNormalShape(e) && (this.visibleShapes[e.guid] = e), this.getShapesByContainer(e.root).length === 1 && this.addContainerEvents(e);
  }, this.onShapeDestroy = (e) => {
    const t = e.target;
    delete this.shapes[t.guid];
    const s = t.root;
    !E(t.root) || this.getShapesByContainer(s).length === 0 && this.containerEventListeners.filter((i) => i.container === s).forEach((i) => {
      i.container.removeEventListener(i.name, i.listener), this.containerEventListeners.splice(this.containerEventListeners.indexOf(i), 1);
    });
  }, this.onShapeShow = (e) => {
    this.isNormalShape(e.target) && (this.visibleShapes[e.target.guid] = e.target);
  }, this.onShapeHide = (e) => {
    delete this.visibleShapes[e.target.guid];
  }, this.onShapeMoveStart = (e) => {
    if (!this.getShapeByGuid(e.target.guid) || !e.target.options.managed)
      return;
    const t = e.target.getRootParent(!0);
    t && t.options.groupChildShapes ? (this.activateShape(t), this.draggedShape = t) : (this.activateShape(e.target), this.draggedShape = e.target);
  }, this.onShapeMouseEnter = (e) => {
    !this.draggedShape || e.buttons !== 1 && (this.draggedShape.draggedPoint = null);
  }, this.onPointDragStart = (e) => {
    const t = this.findShapeByPoint(e.target);
    if (t) {
      this.draggedShape = t;
      const s = t.getRootParent(!0);
      s && s.options.groupChildShapes && (this.draggedShape = s), this.draggedShape.draggedPoint = e.target, r.emit(a.POINT_DRAG_START, t, { point: e.target });
    }
  }, this.onPointDragEnd = (e) => {
    this.draggedShape && (this.draggedShape.draggedPoint = null), this.draggedShape = null;
  }, this.getShape = (e) => this.getShapeByGuid(e.guid), this.findShapeByPoint = (e) => {
    for (let t in this.shapes) {
      const s = this.shapes[t];
      if (s.isShapePoint(e))
        return s;
    }
    return null;
  }, this.getShapeByGuid = (e) => E(this.shapes[e]) ? this.shapes[e] : null, this.getShapesByContainer = (e) => {
    const t = [];
    for (let s in this.shapes) {
      const i = this.shapes[s];
      this.isNormalShape(i) && i.root === e && t.push(i);
    }
    return t;
  }, this.getMaxZIndex = (e = null) => {
    let t;
    return e ? t = this.getShapesByContainer(e) : t = this.getShapes(), t.length ? parseInt(
      t.map((s) => s.options.zIndex || 0).reduce((s, i) => i > s ? i : s, 0)
    ) : 0;
  }, this.getMinZIndex = (e = null) => {
    let t;
    return e ? t = this.getShapesByContainer(e) : t = this.getShapes(), t.length ? parseInt(
      t.map((s) => s.options.zIndex || 0).reduce((s, i) => i < s ? i : s, 999999)
    ) : 0;
  }, this.getShapes = () => {
    const e = [];
    for (let t in this.shapes) {
      const s = this.shapes[t];
      this.isNormalShape(s) && e.push(s);
    }
    return e;
  }, this.isNormalShape = (e) => e.options.id.search("_resizebox") === -1 && e.options.id.search("_rotatebox") === -1 && typeof e.belongsToShape == "function", this.activateShape = (e, t = null) => {
    if (this.activeShape === e) {
      this.activeShape.switchDisplayMode(t);
      return;
    }
    typeof e.id < "u" && (e.id.search("_resizebox") !== -1 || e.id.search("_rotatebox") !== -1) || (this.activeShape && this.deactivateShape(this.activeShape), e.options.moveToTop && e.moveToTop(), this.activeShape = e, r.emit(a.SHAPE_ACTIVATED, this.activeShape), this.activeShape.switchDisplayMode(t));
  }, this.deactivateShape = (e) => {
    typeof e.options.prevZIndex < "u" && O.updateOptions(e), e.options.displayMode !== d.DEFAULT && e.switchDisplayMode(d.DEFAULT), e.getChildren(!0).forEach((t) => {
      typeof t.options.prevZIndex < "u" && (O.updateOptions(t), t.options.displayMode !== d.DEFAULT && t.switchDisplayMode(d.DEFAULT));
    });
  }, this.addContainerEvents = (e) => {
    this.addContainerEvent(e.root, "mousemove", this.mousemove), this.addContainerEvent(e.root, "mouseup", this.mouseup, e.options.id), this.addContainerEvent(e.root, "dblclick", this.doubleclick), this.addContainerEvent(e.root, "contextmenu", this.contextmenu), r.emit(ie.MANAGER_ADD_CONTAINER_EVENT_LISTENERS, e.root);
  }, this.addContainerEvent = (e, t, s) => {
    this.containerEventListeners.find((i) => i.container === e && i.name === t) || (e.addEventListener(t, s), this.containerEventListeners.push({ id: e.id, container: e, name: t, listener: s }));
  }, this.doubleclick = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.doubleclick(u(e, { target: this.shapeOnCursor }));
    try {
      e.stopPropagation();
    } catch {
    }
    if (!this.activeShape || !this.activeShape.options.canAddPoints || this.activeShape.draggedPoint || this.activeShape.points.length > 2 || this.activeShape.points.length === this.activeShape.options.maxPoints)
      return;
    this.activeShape.options.displayMode === d.DEFAULT && this.activeShape.switchDisplayMode(d.SELECTED);
    const [t, s] = J(u(e, { target: this.activeShape }));
    this.activeShape.addPoint(t, s, { forceDisplay: !1 });
  }, this.contextmenu = (e) => {
    if (e.stopPropagation(), e.preventDefault(), this.shapeOnCursor) {
      const t = this.shapeOnCursor.shapeMenu;
      if (!t)
        return;
      t.contextMenu.origEvent = e, t.contextMenu.cursorX = e.pageX, t.contextMenu.cursorY = e.pageY, t.contextMenu.show();
    }
  }, this.mousedown = (e) => {
    if (this.shapeOnCursor && e.buttons !== 2) {
      const t = this.shapeOnCursor.getRootParent(!0);
      t && t.options.groupChildShapes && (this.shapeOnCursor = t), this.draggedShape = this.shapeOnCursor, this.shapeOnCursor.eventListener.mousedown(u(e, { target: this.shapeOnCursor }));
    }
  }, this.mouseup = (e) => {
    if (!this.draggedShape)
      return;
    const t = this.draggedShape;
    e.buttons === 1 && t.options.canAddPoints && !t.draggedPoint && (t.options.maxPoints === -1 || t.points.length < t.options.maxPoints) && t.addPoint(
      e.clientX - t.root.offsetLeft,
      e.clientY - t.root.offsetTop
    ), t.draggedPoint ? (r.emit(a.POINT_DRAG_END, this.draggedShape, { point: t.draggedPoint }), t.draggedPoint.mouseup(e), t.draggedPoint = null) : r.emit(a.SHAPE_MOUSE_UP, t, {}), this.draggedShape = null, r.emit(a.SHAPE_MOVE_END, t, { pos: t.getPosition(!0) });
  }, this.mousemove = (e) => {
    if (e.buttons !== 1 && (this.draggedShape && (this.draggedShape.draggedPoint = null), this.draggedShape = null), !this.draggedShape) {
      this.processShapesUnderCursor(e);
      return;
    }
    this.draggedShape && this.draggedShape.eventListener.mousemove(e);
  }, this.mouseover = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseover(u(e, { target: this.shapeOnCursor }));
  }, this.mouseenter = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseenter(u(e, { target: this.shapeOnCursor }));
  }, this.mouseout = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseout(u(e, { target: e.target }));
  }, this.click = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.click(u(e, { target: this.shapeOnCursor }));
  }, this.processShapesUnderCursor = (e) => {
    const [t, s] = [e.clientX, e.clientY], i = this.getShapeOnCursor(t, s);
    this.shapeOnCursor && this.shapeOnCursor !== i && this.shapeOnCursor.svg && (this.shapeOnCursor.svg.style.cursor = "default", this.shapeOnCursor.eventListener.mouseout(u(e, { target: this.shapeOnCursor }))), i && i !== this.shapeOnCursor && i.eventListener.mouseover(u(e, { target: i })), this.shapeOnCursor = i, this.shapeOnCursor && (r.emit(a.SHAPE_MOUSE_MOVE, this.shapeOnCursor, u(e)), this.shapeOnCursor.svg.style.cursor = "crosshair");
  }, this.getShapeOnCursor = (e, t) => {
    const s = Object.values(this.visibleShapes);
    if (!s.length)
      return null;
    const i = s.filter((o) => o.belongsToShape(e, t));
    return i.length ? i.reduce((o, n) => n.options.zIndex >= o.options.zIndex ? n : o) : null;
  }, this.toJSON = (e = null, t = !1) => (e || (e = this.getShapes()), e = e.filter((s) => !s.getParent()), JSON.stringify(e.map((s) => s.getJSON(!0, t)))), this.fromJSON = (e, t, s = null, i = !0) => {
    let o = t;
    if (typeof o == "string" && (o = H(t)), !o || !o.length)
      return null;
    const n = [];
    for (let h in o) {
      const p = o[h];
      p.options.id && this.findShapeById(p.options.id) || (n.push(new B().fromJSON(e, p, !0, i)), s && typeof s == "function" && s(h / o.length));
    }
    return n;
  }, this.findShapesByOptionValue = (e, t) => this.getShapes().filter((s) => s.options[e] === t), this.findShapeById = (e) => {
    const t = this.findShapesByOptionValue("id", e);
    return t && t.length ? t[0] : null;
  }, this.findShapeByName = (e) => {
    const t = this.findShapesByOptionValue("name", e);
    return t && t.length ? t[0] : null;
  }, this.clear = () => {
    for (this.containerEventListeners.forEach(({ container: e, name: t, listener: s }) => {
      try {
        e.removeEventListener(t, s);
      } catch (i) {
        console.error(i);
      }
    }), this.containerEventListeners = []; Object.values(this.shapes).length; )
      Object.values(this.shapes)[0].destroy();
  }, this.fromGeoJson = (e, t, s = {}, i = null) => Kt(e, t, s, i), this.length = () => Object.values(this.shapes).length;
}
const ie = {
  MANAGER_ADD_CONTAINER_EVENT_LISTENERS: "manager_add_container_event_listeners",
  MANAGER_REMOVE_CONTAINER_EVENT_LISTENERS: "manager_remove_container_event_listeners"
}, z = {
  CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
}, f = new se().init();
function oe(e) {
  this.shape = e, this.children = [], this.parent = {}, this.init = () => {
    for (let t in this)
      typeof this[t] != "function" || t === "init" || (typeof this.shape[t] == "function" && (this.parent[t] = this.shape[t]), this.shape[t] = this[t]);
    return this;
  }, this.addChild = (t) => {
    !this.shouldAddChild(t) || (this.shape.options.displayMode !== t.options.displayMode && (t.svg ? t.switchDisplayMode(this.shape.options.displayMode) : t.options.displayMode = e.options.displayMode), this.children.push(t), r.emit(a.SHAPE_ADD_CHILD, this.shape, { child: t }));
  }, this.removeChild = (t) => {
    this.children.splice(this.children.indexOf(t), 1), r.emit(a.SHAPE_REMOVE_CHILD, this.shape, { child: t });
  }, this.removeAllChildren = (t) => {
    for (; this.getChildren(t).length; )
      this.removeChild(this.getChildren(t)[0]);
  }, this.getChildren = (t = !1) => {
    if (!t)
      return this.children;
    const s = [];
    s.push(...this.children);
    for (let i of s)
      s.push(...i.getChildren());
    return s;
  }, this.shouldAddChild = (t) => !t || typeof t != "object" || typeof t.getChildren > "u" || this.children.indexOf(t) !== -1 ? !1 : t === this.shape ? void 0 : t.getChildren().indexOf(this.shape) !== -1 || t.getParent() ? !1 : this.getParentsList().indexOf(t) === -1, this.getParent = () => {
    const t = f.getShapes();
    for (let s of t)
      if (s.getChildren().indexOf(this.shape) !== -1)
        return s;
    return null;
  }, this.getRootParent = (t = null) => {
    let s = this.getParentsList();
    return s.length ? (t !== null && (s = s.filter((i) => i.options.groupChildShapes === t)), s[s.length - 1]) : null;
  }, this.getParentsList = (t = []) => {
    const s = this.getParent();
    return s == null ? t : (t.push(s), s.getParentsList(t));
  }, this.getPosition = (t = !1) => {
    const s = this.parent.getPosition();
    if (!t)
      return s;
    let i = this.getChildren(!0);
    return i.push(this.shape), i = i.filter((o) => o.points.length), i.length && (s.left = i.map((o) => o.left).reduce((o, n) => n < o ? n : o), s.top = i.map((o) => o.top).reduce((o, n) => n < o ? n : o), s.right = i.map((o) => o.right).reduce((o, n) => n > o ? n : o), s.bottom = i.map((o) => o.bottom).reduce((o, n) => n > o ? n : o), s.width = s.right - s.left || 1, s.height = s.bottom - s.top || 1), s;
  };
}
function $() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = U(), this.options = {
    id: "",
    shapeOptions: {
      id: "",
      canAddPoints: !1,
      canDeletePoints: !1,
      pointOptions: {
        style: {
          borderWidth: "0px",
          cursor: "pointer",
          backgroundColor: "rgba(0,0,0,0)"
        },
        width: 13,
        height: 13,
        forceDisplay: !0
      },
      style: {
        "stroke-width": "2px",
        stroke: "#aaaaaa",
        "stroke-dasharray": "10",
        fill: "none"
      }
    },
    zIndex: 1e3
  }, this.eventListener = null, this.left_top = null, this.left_bottom = null, this.right_top = null, this.right_bottom = null, this.init = (e, t, s, i, o, n = {}) => (this.left = parseInt(t), this.top = parseInt(s), this.width = parseInt(i), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new B().init(e, m({}, this.options.shapeOptions), []), r.emit(a.SHAPE_CREATE, this.shape, {}), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new Yt(this).run(), this.redraw(), this), this.setOptions = (e = {}) => {
    !e || typeof e != "object" || (this.options = m(this.options, e), this.options.shapeOptions.zIndex = this.options.zIndex || this.options.zIndex, this.options.shapeOptions.id = this.options.id ? this.options.id : this.options.id, this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + Ct + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + Bt + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + Pt + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + It + "')" } });
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
    r.emit(a.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (e, t) => this.eventListener.addEventListener(e, t), this.removeEventListener = (e, t) => {
    this.eventListener.removeEventListener(e, t);
  };
}
function ne(e) {
  this.shape = e, this.contextMenu = null, this.updateContextMenu = () => {
    if (this.shape.options.hasContextMenu && !this.contextMenu ? this.init() : this.shape.options.hasContextMenu || (this.contextMenu = null), this.shape.contextMenu = this.contextMenu, this.contextMenu) {
      const t = this.getMenuItems();
      for (let s of t)
        this.contextMenu.items.find((i) => i.id === s.id) || this.contextMenu.addItem(s.id, s.title, s.image);
    }
  }, this.init = () => {
    e.svg && (this.contextMenu = k.create([], e.svg, "contextmenu", { customHandler: () => {
    } }), e.options.canAddPoints && this.contextMenu.addItem("i" + e.guid + "_add_point", "Add Point", Q), this.displayGroupItems(), this.setEventListeners());
  }, this.getMenuItems = () => {
    const t = [
      { id: "i" + e.guid + "_move_to_top", title: "Move to Top", image: jt },
      { id: "i" + e.guid + "_move_to_bottom", title: "Move to Bottom", image: Qt },
      { id: "i" + e.guid + "_clone", title: "Clone", image: kt },
      { id: "i" + e.guid + "_export_json", title: "Export to JSON", image: Vt },
      { id: "i" + e.guid + "_export_svg", title: "Export to SVG", image: zt },
      { id: "i" + e.guid + "_export_png", title: "Export to PNG", image: Ht },
      { id: "i" + e.guid + "_destroy", title: "Destroy", image: q }
    ];
    return e.options.canAddPoints && t.push({ id: "i" + e.guid + "_add_point", title: "Add Point", image: Q }), t;
  }, this.setEventListeners = () => {
    this.setOnItemClickListener(), this.contextMenu.on("show", () => {
      this.displayGroupItems();
    });
  }, this.setOnItemClickListener = () => {
    let t, s;
    this.contextMenu.on("click", (i) => {
      switch (i.itemId) {
        case "i" + this.shape.guid + "_destroy":
          this.onDestroyClick(i);
          break;
        case "i" + this.shape.guid + "_add_point":
          this.onAddPointClick(i);
          break;
        case "i" + this.shape.guid + "_clone":
          this.onCloneClick(i);
          break;
        case "i" + this.shape.guid + "_export_json":
          this.onExportJsonClick(i);
          break;
        case "i" + this.shape.guid + "_export_svg":
          this.onExportSvgClick(i);
          break;
        case "i" + this.shape.guid + "_export_png":
          this.onExportPngClick(i);
          break;
        case "i" + this.shape.guid + "_group":
          s = this.shape.getRootParent(), t = s || this.shape, t.setOptions({ groupChildShapes: !0 }), t.switchDisplayMode(d.DEFAULT);
          break;
        case "i" + this.shape.guid + "_ungroup":
          s = this.shape.getRootParent(), t = s || this.shape, t.setOptions({ groupChildShapes: !1 }), t.switchDisplayMode(d.DEFAULT);
          break;
        case "i" + this.shape.guid + "_move_to_top":
          this.onMoveToTopClick();
          break;
        case "i" + this.shape.guid + "_move_to_bottom":
          this.onMoveToBottomClick();
          break;
      }
    });
  }, this.displayGroupItems = () => {
    let t = this.shape.getRootParent() ? this.shape.getRootParent() : this.shape;
    if (!t.getChildren().length) {
      this.contextMenu.removeItem("i" + this.shape.guid + "_group"), this.contextMenu.removeItem("i" + this.shape.guid + "_ungroup");
      return;
    }
    t.options.groupChildShapes ? this.contextMenu.items.find((s) => s.id === "i" + this.shape.guid + "_ungroup") || (this.contextMenu.addItem("i" + this.shape.guid + "_ungroup", "Ungroup", Ft), this.contextMenu.removeItem("i" + this.shape.guid + "_group")) : this.contextMenu.items.find((s) => s.id === "i" + this.shape.guid + "_group") || (this.contextMenu.removeItem("i" + this.shape.guid + "_ungroup"), this.contextMenu.addItem("i" + this.shape.guid + "_group", "Group", Gt));
  }, this.onAddPointClick = (t) => {
    if (this.shape.options.maxPoints !== -1 && this.shape.points.length >= this.shape.options.maxPoints)
      return;
    const [s, i] = K(this.shape.root, t.cursorX, t.cursorY);
    if (this.shape.points.length < 2)
      this.shape.addPoint(s, i);
    else {
      const [o, n] = this.shape.getClosestLine(s, i);
      if (this.shape.getPointIndex(n) === 0)
        this.shape.addPoint(s, i);
      else {
        let h = o;
        this.shape.getPointIndex(n) > this.shape.getPointIndex(o) && (h = n), this.shape.insertPoint(s, i, h);
      }
    }
    this.shape.options.displayMode === d.DEFAULT && this.shape.switchDisplayMode(d.SELECTED);
  }, this.onCloneClick = (t) => {
    let s = this.shape;
    const i = s.getRootParent();
    i && i.options.groupChildShapes && (s = i);
    const o = s.clone({}, s.options.groupChildShapes), n = o.getPosition(!0);
    o.moveTo(n.left + 5, n.top + 5), SmartShapeManager.activateShape(o);
    for (let h of o.getChildren(!0)) {
      const p = h.getParent();
      p && p.removeChild(h), s.addChild(h);
    }
  }, this.onExportJsonClick = (t) => {
    const i = this.shape.getRootParent() || this.shape, o = i.toJSON(i.options.groupChildShapes), n = new Blob([o]);
    this.saveToFile(n, this.getExportFileName("json"));
  }, this.onExportSvgClick = (t) => {
    const o = ((this.shape.options.groupChildShapes ? null : this.shape.getRootParent()) || this.shape).toSvg(), n = new Blob([o]);
    this.saveToFile(n, this.getExportFileName("svg"));
  }, this.onExportPngClick = async (t) => {
    const o = await ((this.shape.options.groupChildShapes ? null : this.shape.getRootParent()) || this.shape).toPng(V.BLOB);
    this.saveToFile(o, this.getExportFileName("png"));
  }, this.onDestroyClick = (t) => {
    const s = this.shape.getParent();
    s && s.options.groupChildShapes ? s.destroy() : this.shape.destroy();
  }, this.onMoveToTopClick = (t) => {
    const s = this.shape.getParent();
    s && s.options.groupChildShapes ? s.moveToTop() : this.shape.moveToTop();
  }, this.onMoveToBottomClick = (t) => {
    const s = this.shape.getParent();
    s && s.options.groupChildShapes ? s.moveToBottom() : this.shape.moveToBottom();
  }, this.saveToFile = (t, s) => {
    const i = window.URL.createObjectURL(t), o = document.createElement("a");
    o.download = s, o.href = i, document.body.appendChild(o), o.click(), document.body.removeChild(o), window.URL.revokeObjectURL(i);
  }, this.getExportFileName = (t) => {
    const i = this.shape.getRootParent() || this.shape;
    return (i.options.id ? i.options.id : "shape") + "." + t;
  }, this.removeMenuEventListeners = () => {
    this.contextMenu.removeEventListener("show", this.onShowListener);
  }, this.destroyContextMenu = () => {
    this.removeMenuEventListeners(), this.contextMenu.destroy();
  };
}
function B() {
  this.root = null, this.points = [], this.svg = null, this.groupHelper = null, this.eventListener = new Xt(this), this.options = {
    id: "",
    name: "Unnamed shape",
    maxPoints: -1,
    fillGradient: null,
    fillImage: null,
    filters: {},
    canDragShape: !0,
    canAddPoints: !1,
    canScale: !1,
    canRotate: !1,
    offsetX: 0,
    offsetY: 0,
    classes: "",
    style: {
      fill: "none",
      "fill-opacity": 1,
      stroke: "black",
      "stroke-width": 2,
      "stroke-opacity": 1,
      "stroke-dasharray": 0,
      "stroke-linecap": "square"
    },
    pointOptions: { canDrag: !0 },
    zIndex: 1e3,
    bounds: { left: -1, top: -1, right: -1, bottom: -1 },
    visible: !0,
    displayMode: d.DEFAULT,
    managed: !0,
    minWidth: -1,
    minHeight: -1,
    maxWidth: -1,
    maxHeight: -1,
    hasContextMenu: !0,
    minPoints: 3,
    groupChildShapes: !0,
    moveToTop: !0,
    compactExport: !1,
    forceCreateEvent: !1,
    zoomLevel: 1,
    initialPoints: []
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = U(), this.resizeBox = null, this.rotateBox = null, this.initCenter = null, this.shapeMenu = null, this.init = (e, t = null, s = null, i = !0) => {
    if (!e) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    if (f.getShape(this)) {
      console.error("This shape already initialized");
      return;
    }
    return this.root = e, this.root.style.position = "relative", this.shapeMenu = new ne(this), this.setOptions(t), this.groupHelper = new oe(this).init(), s && s.length && (this.setupPoints(s, m({}, this.options.pointOptions)), this.redraw()), this.eventListener.run(), this.shapeMenu && typeof this.shapeMenu == "object" && this.shapeMenu.updateContextMenu(), i && this.applyDisplayMode(), (s && s.length || this.options.forceCreateEvent) && r.emit(a.SHAPE_CREATE, this, {}), this;
  }, this.setOptions = (e) => {
    !e || typeof e != "object" || (E(e.visible) && e.visible !== this.options.visible && (this.points.forEach((t) => t.options.visible = e.visible), this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: e.visible } }), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: e.visible } })), E(e.fillGradient) && (this.options.fillGradient = {}), E(e.fillImage) && (this.options.fillImage = {}), this.options = m(this.options, e), this.points.forEach((t) => {
      t.setOptions(m({}, this.options.pointOptions)), t.options.bounds = this.getBounds(), t.options.zIndex <= this.options.zIndex && (t.options.zIndex = this.options.zIndex + 1), t.redraw();
    }), this.shapeMenu && typeof this.shapeMenu == "object" && this.shapeMenu.updateContextMenu());
  }, this.setupPoints = (e, t = {}) => {
    this.points = [], this.isNewObject = !0, this.addPoints(e, m({}, t)), this.isNewObject = !1, this.calcPosition();
  }, this.addPoint = (e, t, s = {}) => {
    let i = this.putPoint(e, t, m({}, this.options.pointOptions, s));
    if (!i)
      return null;
    if (this.options.displayMode !== d.DEFAULT && (s.createDOMElement = !0), i = i.init(e, t, s), i.element) {
      try {
        this.root.appendChild(i.element);
      } catch {
      }
      i.updateContextMenu();
    }
    return this.redraw(), this.options.hasContextMenu && !this.shapeMenu.contextMenu && this.shapeMenu.updateContextMenu(), i;
  }, this.insertPoint = (e, t, s, i = {}) => {
    let o = this.putPoint(e, t, m({}, this.options.pointOptions, i), s);
    if (!o)
      return null;
    this.options.displayMode !== d.DEFAULT && (i.createDOMElement = !0), o = o.init(e, t, i);
    try {
      this.root.appendChild(o.element);
    } catch {
    }
    return o.updateContextMenu(), this.redraw(), this.options.hasContextMenu && !this.shapeMenu.contextMenu && this.shapeMenu.updateContextMenu(), o;
  }, this.addPoints = (e, t = {}) => {
    !e || typeof e != "object" || (e.forEach((s) => {
      this.options.displayMode !== d.DEFAULT && (t.createDOMElement = !0);
      const i = this.putPoint(
        s[0],
        s[1],
        m({}, this.options.pointOptions, t)
      );
      if (i && (i.init(i.x, i.y, t), i.element))
        try {
          this.root.appendChild(i.element), i.redraw();
        } catch {
        }
    }), this.options.hasContextMenu && !this.shapeMenu.contextMenu && this.shapeMenu.updateContextMenu());
  }, this.putPoint = (e, t, s = {}, i = null) => {
    let o = this.getPointIndex(i);
    if (i && o === -1 || !this.isNewObject && this.findPoint(e, t))
      return null;
    s.bounds = this.getBounds(), s.zIndex = this.options.zIndex + 1;
    const n = new Wt();
    return n.x = e, n.y = t, this.options.displayMode !== d.DEFAULT && (s.createDOMElement = !0), n.setOptions(s), i && o !== -1 ? this.points.splice(o, 0, n) : this.points.push(n), n;
  }, this.getClosestPoint = (e, t, s = null) => {
    if (s || (s = this.getPointsArray()), !s || !s.length)
      return null;
    if (s = s.filter(([o, n]) => !isNaN(parseInt(o)) && !isNaN(parseInt(n))), s.length === 1)
      return this.points[0];
    if (!s || !s.length)
      return null;
    const i = s.map(([o, n]) => ({ x: o, y: n, d: C(e, t, o, n) })).reduce((o, n) => o.d < n.d ? o : n);
    return this.findPoint(i.x, i.y);
  }, this.getClosestLine = (e, t) => this.points.map((s, i) => {
    let o = null;
    return i < this.points.length - 1 ? o = this.points[i + 1] : o = this.points[0], [s, o, ot(e, t, s.x, s.y, o.x, o.y)];
  }).filter((s) => s[2] >= 0).reduce((s, i) => s[2] < i[2] ? s : i), this.getPointIndex = (e) => {
    if (e && e.length) {
      if (e.length !== 2)
        return -1;
      e = this.findPoint(...e);
    }
    return !e || !this.isShapePoint(e) ? -1 : this.points.indexOf(e);
  }, this.deleteAllPoints = () => {
    for (; this.points.length; )
      this.points[0].destroy();
  }, this.deletePoint = (e, t) => {
    if (this.points.length - 1 < this.options.minPoints)
      return;
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
    const i = this.getBounds(), o = this.getPosition(this.options.groupChildShapes);
    let n = e + o.width > i.right ? i.right - o.width : e, h = t + o.height > i.bottom ? i.bottom - o.height : t;
    this.moveBy(n - o.left, h - o.top, s), this.calcPosition();
  }, this.moveBy = (e, t, s = !0) => {
    for (let o in this.points)
      this.points[o].x += e, this.points[o].y += t, s && this.points[o].redraw();
    this.calcPosition();
    const i = this.getChildren();
    s && this.redraw(), i.length && this.options.groupChildShapes && i.forEach((o) => {
      o.moveBy(e, t, s);
    });
  }, this.scaleTo = (e = null, t = null, s = null) => {
    const i = this.getBounds();
    if (this.calcPosition(), !e && !t)
      return null;
    const o = this.getPosition(s || this.options.groupChildShapes);
    if (o.width === e && o.height === t)
      return;
    [e, t] = this.applyScaleRestriction(...Y(e, t, o.width, o.height)), o.width >= 10 && e < 10 && (e = 10), o.height >= 10 && t < 10 && (t = 10);
    let n = o.left + e > i.right && i.right !== -1 ? i.right - o.left : e, h = o.top + t > i.bottom && i.bottom !== -1 ? i.bottom - o.top : t, p = n / o.width, l = h / o.height;
    this.scaleBy(p, l, s);
  }, this.scaleBy = (e = null, t = null, s = null) => {
    const i = this.getPosition(s || this.options.groupChildShapes);
    this.points.forEach(
      (o) => {
        o.x = (o.x - i.left) * e + i.left, o.y = (o.y - i.top) * t + i.top;
      }
    ), (this.options.groupChildShapes || s) && (this.getChildren(!0).forEach((o) => {
      o.points.forEach(
        (n) => {
          n.x = (n.x - i.left) * e + i.left, n.y = (n.y - i.top) * t + i.top;
        }
      ), o.calcPosition();
    }), this.getChildren(!0).forEach((o) => o.redraw())), this.calcPosition();
  }, this.applyScaleRestriction = (e, t) => (this.options.minWidth !== -1 && e < this.options.minWidth && (e = this.options.minWidth), this.options.minWidth !== -1 && t < this.options.minHeight && (t = this.options.minHeight), this.options.minWidth !== -1 && e > this.options.maxWidth && (e = this.options.maxWidth), this.options.minWidth !== -1 && t > this.options.maxHeight && (t = this.options.maxHeight), [e, t]), this.rotateBy = (e, t = null, s = null, i = !1) => {
    this.calcPosition();
    const o = this.getPosition(this.options.groupChildShapes);
    let [n, h] = this.getCenter(this.options.groupChildShapes);
    const p = this.getRootParent(!0);
    p && p.options.groupChildShapes && ([n, h] = p.getCenter(p.options.groupChildShapes)), t || (t = n), s || (s = h), this.initCenter && ([t, s] = this.initCenter), !(i && (!this.isInBounds(...R(e, o.left, o.top, t, s)) || !this.isInBounds(...R(e, o.right, o.top, t, s)) || !this.isInBounds(...R(e, o.left, o.bottom, t, s)) || !this.isInBounds(...R(e, o.right, o.bottom, t, s)))) && (this.points.forEach((l) => l.rotateBy(e, t, s)), this.options.groupChildShapes && this.getChildren(!0).forEach((l) => {
      l.points.forEach((A) => A.rotateBy(e, t, s)), l.redraw();
    }));
  }, this.flip = (e, t, s) => {
    if (!e && !t)
      return;
    s = s || this.options.groupChildShapes, this.calcPosition();
    let i = s ? this.getChildren(!0) : null;
    i && i.forEach((n) => n.calcPosition());
    const o = this.getPosition(s);
    this.points.forEach((n) => this.flipPoint(n, e, t, o)), i && i.forEach((n) => n.points.forEach((h) => this.flipPoint(h, e, t, o)));
  }, this.flipPoint = (e, t, s, i) => (t && (e.x = Math.abs(i.right - e.x) + i.left), s && (e.y = Math.abs(i.bottom - e.y) + i.top), e), this.moveToTop = () => {
    O.moveShapeToTop(this);
  }, this.moveToBottom = () => {
    O.moveShapeToBottom(this);
  }, this.changeZIndex = (e) => {
    O.changeShapeZIndex(this, e);
  }, this.isInBounds = (e, t) => {
    const [s, i] = this.getMaxPointSize(), o = this.getBounds();
    return e >= o.left + s / 2 && e <= o.right - s / 2 && t >= o.top + i / 2 && t <= o.bottom - i / 2;
  }, this.redraw = () => {
    this.applyDisplayMode(), O.draw(this);
  }, this.applyDisplayMode = () => {
    const e = this.getRootParent();
    (!e || !e.options.groupChildShapes) && (this.options.displayMode === d.SCALE && this.options.canScale ? (this.rotateBox && this.rotateBox.hide(), !this.resizeBox && this.setupResizeBox(), this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : this.options.displayMode === d.ROTATE && this.options.canRotate ? (this.resizeBox && this.resizeBox.hide(), !this.rotateBox && this.setupRotateBox(), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : (this.resizeBox && this.resizeBox.hide(), this.rotateBox && this.rotateBox.hide())), this.points.forEach((t) => {
      const s = { zIndex: this.options.zIndex + 2 };
      this.options.displayMode === d.DEFAULT ? s.createDOMElement = !1 : s.createDOMElement = !0, t.setOptions(s), t.redraw(), t.element && (t.element.style.zIndex = t.options.zIndex, this.options.displayMode === d.DEFAULT && !t.options.forceDisplay && (t.element.style.display = "none"));
    }), this.options.groupChildShapes && this.getChildren(!0).forEach((t) => {
      t.points.forEach((s) => {
        this.options.displayMode === d.DEFAULT ? s.setOptions({ createDOMElement: !1 }) : s.setOptions({ createDOMElement: !0 }), s.options.visible && !s.options.hidden && s.options.canDrag && s.element && (s.element.style.display = "");
      }), t.options.displayMode = this.options.displayMode;
    });
  }, this.switchDisplayMode = (e = null) => {
    e || (e = this.getNextDisplayMode()), (e === d.SCALE && !this.options.canScale || e === d.ROTATE && !this.options.canRotate || e === d.SELECTED && this.points.length && !this.options.pointOptions.canDrag) && (e = d.DEFAULT), this.options.displayMode = e, this.redraw(), e === d.DEFAULT && setTimeout(() => {
      this.getChildren(!0).forEach((t) => t.switchDisplayMode(e));
    }, 10);
  }, this.getNextDisplayMode = () => {
    let e;
    return this.options.displayMode === d.DEFAULT ? e = d.SELECTED : this.options.displayMode === d.SELECTED ? e = d.SCALE : this.options.displayMode === d.SCALE ? e = d.ROTATE : e = d.DEFAULT, e === d.SELECTED && !this.options.pointOptions.canDrag && (e = d.SCALE), e === d.SCALE && !this.options.canScale && (e = d.ROTATE), e === d.ROTATE && !this.options.canRotate && (e = d.DEFAULT), e;
  }, this.calcPosition = () => {
    !this.points.length || Object.assign(this, this.calcPositionFromPointsArray(this.getPointsArray()));
  }, this.calcPositionFromPointsArray = (e) => {
    const t = {};
    return t.left = e.map((s) => s[0]).reduce((s, i) => i < s ? i : s), t.top = e.map((s) => s[1]).reduce((s, i) => i < s ? i : s), t.right = e.map((s) => s[0]).reduce((s, i) => i > s ? i : s), t.bottom = e.map((s) => s[1]).reduce((s, i) => i > s ? i : s), t.width = t.right - t.left || 1, t.height = t.bottom - t.top || 1, t;
  }, this.getPosition = () => ({ top: this.top, left: this.left, bottom: this.bottom, right: this.right, width: parseInt(this.width), height: parseInt(this.height) }), this.getBounds = () => ({
    left: this.options.bounds.left !== -1 ? this.options.bounds.left : this.root.style.display === "none" ? -1 : this.root.clientLeft,
    top: this.options.bounds.top !== -1 ? this.options.bounds.top : this.root.style.display === "none" ? -1 : this.root.clientTop,
    right: this.options.bounds.right !== -1 ? this.options.bounds.right : this.root.style.display === "none" ? -1 : this.root.clientLeft + this.root.clientWidth,
    bottom: this.options.bounds.bottom !== -1 ? this.options.bounds.bottom : this.root.style.display === "none" ? -1 : this.root.clientTop + this.root.clientHeight
  }), this.isShapePoint = (e) => !!this.points.find((t) => t === e), this.belongsToShape = (e, t, s = !0) => {
    if (!this.isInShapePolygon(e, t))
      return !1;
    const i = D(this.root);
    if (this.findPoint(e - i.left, t - i.top))
      return !0;
    let o = this.getPointsArray();
    return s && (o = o.map((n) => [n[0] + i.left, n[1] + i.top])), nt(o, [e, t]);
  }, this.isInShapePolygon = (e, t) => {
    const s = D(this.root);
    return e >= this.left + s.left && e <= this.right + s.left && t >= this.top + s.top && t <= this.bottom + s.top;
  }, this.addEventListener = (e, t) => this.eventListener.addEventListener(e, t), this.removeEventListener = (e, t) => {
    this.eventListener.removeEventListener(e, t);
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.getChildren(!0).forEach((e) => {
      e.setOptions({ visible: !0 }), e.redraw();
    }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.getChildren(!0).forEach((e) => {
      e.setOptions({ visible: !1 }), e.redraw();
    }), this.redraw();
  }, this.destroy = () => {
    if (r.emit(a.SHAPE_DESTROY, this, {}), this.eventListener && this.eventListener.destroy(), this.resizeBox && this.resizeBox.destroy(), this.rotateBox && this.rotateBox.destroy(), this.root && this.svg)
      try {
        this.root.removeChild(this.svg), this.points.filter((t) => t.element).forEach((t) => this.root.removeChild(t.element));
      } catch {
      }
    this.options.groupChildShapes && this.getChildren(!0).forEach((t) => {
      t.destroy();
    }), this.shapeMenu.contextMenu && this.shapeMenu.destroyContextMenu();
    const e = this.getParent();
    e && e.removeChild(this), this.points.forEach((t) => t.destroy()), this.points = [];
  }, this.setupResizeBox = () => {
    if (!this.points.length)
      return null;
    const e = this.getResizeBoxBounds();
    return this.resizeBox = new tt().init(this.root, e.left, e.top, e.width, e.height, {
      zIndex: this.options.zIndex + 1,
      id: this.options.id + "_resizebox",
      shapeOptions: {
        canDragShape: !1,
        visible: this.options.visible,
        managed: !1,
        hasContextMenu: !1
      }
    }), this.calcPosition(), this.eventListener.addResizeEventListener(), this.resizeBox.redraw(), this.resizeBox;
  }, this.setupRotateBox = () => {
    if (!this.points.length)
      return null;
    const e = this.getResizeBoxBounds();
    return this.rotateBox = new $().init(this.root, e.left, e.top, e.width, e.height, {
      zIndex: this.options.zIndex + 1,
      id: this.options.id + "_rotatebox",
      shapeOptions: {
        canDragShape: !1,
        visible: this.options.visible,
        managed: !1,
        hasContextMenu: !1
      }
    }), this.calcPosition(), this.eventListener.addRotateEventListener(), this.rotateBox.redraw(), this.rotateBox;
  }, this.getResizeBoxBounds = () => {
    this.calcPosition();
    let e = this.getPosition(this.options.groupChildShapes);
    const t = this.getRootParent(!0);
    t && t.options.groupChildShapes && (t.calcPosition(), e = t.getPosition(t.options.groupChildShapes));
    const [s, i] = this.getMaxPointSize(), o = {
      left: e.left - s,
      right: e.right + s,
      top: e.top - i,
      bottom: e.bottom + i,
      width: e.width + s * 2,
      height: e.height + i * 2
    };
    o.left < 0 && (this.moveTo(o.left * -1, e.top, !1), o.left = 0), o.top < 0 && (this.moveTo(e.left, o.top * -1, !1), o.top = 0);
    const n = this.getBounds();
    return o.bottom > n.bottom && (this.moveTo(e.left, o.bottom - n.bottom + e.top, !1), o.bottom = n.bottom), o.right > n.right && (this.moveTo(o.right - n.right + e.left, e.top, !1), o.bottom = n.bottom), o;
  }, this.getMaxPointSize = () => {
    if (!this.points.length)
      return [0, 0];
    const e = this.points.map((s) => s.options.width).reduce((s, i) => Math.max(s, i)), t = this.points.map((s) => s.options.height).reduce((s, i) => Math.max(s, i));
    return [e, t];
  }, this.getCenter = (e = !1) => {
    const t = this.getPosition(e);
    return [t.left + t.width / 2, t.top + t.height / 2];
  }, this.toSvg = (e = null) => O.toSvg(this, e), this.toPng = (e = V.DATAURL, t = null, s = null, i = null) => O.toPng(this, e, t, s, i), this.toJSON = (e = !0, t = !1) => JSON.stringify(this.getJSON(e, t)), this.clone = (e = {}, t = !0) => {
    const s = m({}, this.getJSON(t));
    s.parent_guid = this.guid, s.options = m(s.options, e);
    const i = new B().fromJSON(this.root, s, t);
    return i ? (i.getChildren(!0).forEach((o) => {
      o.options.id += "_" + f.length(), o.options.name += " " + f.length();
    }), i) : null;
  }, this.getJSON = (e = !0, t = !1) => {
    const s = {
      options: m({}, this.options)
    };
    if (s.options.displayMode = d.DEFAULT, t || this.options.compactExport ? s.points = this.points.map((i) => [i.x, i.y]) : s.points = this.points.map((i) => i.getJSON()), e) {
      let i = this.getChildren();
      i.length && (s.children = i.map(
        (o) => o.getJSON(e, t || this.options.compactExport)
      ));
    }
    return s;
  }, this.fromJSON = (e, t, s = !0, i = !0) => {
    let o = typeof t == "string" ? H(t) : t;
    if (!o)
      return null;
    this.root = e, f.findShapeById(o.options.id) && (o.options.id += "_" + f.length(), o.options.name += " " + f.length()), this.svg ? this.setOptions(o.options) : (o.options.forceCreateEvent = !1, this.init(e, o.options, null, !1)), o.points.forEach((h) => {
      let p;
      h.length ? (p = this.putPoint(h[0], h[1]), p.setOptions(o.options.pointOptions || {})) : p = this.putPoint(h.x, h.y, h.options || o.options.pointOptions), p && p.updateContextMenu();
    });
    const n = f.getShapeByGuid(o.parent_guid);
    return f.addShape(this), s && typeof o.children < "u" && o.children && (this.getChildren(!0).forEach((h) => h.destroy()), o.children.forEach((h) => {
      h.parent_guid = this.guid, this.addChild(new B().fromJSON(e, h));
    })), i && r.emit(a.SHAPE_CREATE, this, { parent: n }), this;
  };
}
const d = {
  DEFAULT: "default",
  SELECTED: "selected",
  SCALE: "scale",
  ROTATE: "rotate"
};
function tt() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = U(), this.options = {
    id: "",
    shapeOptions: {
      id: "",
      canAddPoints: !1,
      canDeletePoints: !1,
      pointOptions: {
        style: {
          "border-width": "0px",
          "border-radius": "0px",
          backgroundColor: "rgba(0,0,0,0)",
          cursor: "pointer"
        },
        forceDisplay: !0,
        width: 13,
        height: 13
      },
      style: {
        "stroke-width": "2px",
        stroke: "#aaaaaa",
        "stroke-dasharray": "10",
        fill: "none"
      }
    },
    zIndex: 1e3
  }, this.eventListener = null, this.left_top = null, this.left_center = null, this.left_bottom = null, this.center_top = null, this.center_bottom = null, this.right_top = null, this.right_center = null, this.right_bottom = null, this.init = (e, t, s, i, o, n = {}) => (this.left = parseInt(t), this.top = parseInt(s), this.width = parseInt(i), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new B().init(e, m({}, this.options.shapeOptions), []), r.emit(a.SHAPE_CREATE, this.shape, {}), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new Zt(this).run(), this.redraw(), this), this.setOptions = (e = {}) => {
    !e || typeof e != "object" || (this.options = m(this.options, e), this.options.shapeOptions.zIndex = this.options.zIndex || this.options.zIndex, this.options.shapeOptions.id = this.options.id ? this.options.id : this.options.id, this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + Lt + "')" } }), this.center_top = this.shape.addPoint(this.left + this.width / 2, this.top, { id: this.shape.guid + "_center_top", style: { backgroundImage: "url('" + Rt + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + Nt + "')" } }), this.right_center = this.shape.addPoint(this.right, this.top + this.height / 2, { id: this.shape.guid + "_right_center", style: { backgroundImage: "url('" + Ut + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + Dt + "')" } }), this.center_bottom = this.shape.addPoint(this.left + this.width / 2, this.bottom, { id: this.shape.guid + "_center_bottom", style: { backgroundImage: "url('" + _t + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + Tt + "')" } }), this.left_center = this.shape.addPoint(this.left, this.top + this.height / 2, { id: this.shape.guid + "_left_center", style: { backgroundImage: "url('" + wt + "')" } }), this.setPointsOptions();
  }, this.setPointsOptions = () => {
    this.setPointsMoveDirections(), this.setPointsMoveBounds();
  }, this.setPointsMoveDirections = () => {
    this.center_top.setOptions({ moveDirections: [S.TOP, S.BOTTOM] }), this.center_bottom.setOptions({ moveDirections: [S.TOP, S.BOTTOM] }), this.left_center.setOptions({ moveDirections: [S.LEFT, S.RIGHT] }), this.right_center.setOptions({ moveDirections: [S.LEFT, S.RIGHT] });
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
    r.emit(a.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (e, t) => this.eventListener.addEventListener(e, t), this.removeEventListener = (e, t) => {
    this.eventListener.removeEventListener(e, t);
  };
}
try {
  window.ResizeBox = tt, window.SmartShape = B, window.RotateBox = $, window.SmartShapeManager = f;
} catch {
}
export {
  r as EventsManager,
  tt as ResizeBox,
  $ as RotateBox,
  a as ShapeEvents,
  B as SmartShape,
  d as SmartShapeDisplayMode,
  f as SmartShapeManager
};
