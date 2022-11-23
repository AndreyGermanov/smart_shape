function lt() {
  this.subscriptions = {}, this.subscribe = (t, e) => {
    if (typeof t == "string")
      return this.subscribeToEvent(t, e);
    if (typeof t == "object") {
      for (let i of t)
        this.subscribeToEvent(i, e);
      return e;
    }
    return null;
  }, this.subscribeToEvent = (t, e) => ((typeof this.subscriptions[t] > "u" || !this.subscriptions[t]) && (this.subscriptions[t] = []), typeof this.subscriptions[t].find((i) => i === e) < "u" ? null : (this.subscriptions[t].push(e), e)), this.emit = (t, e, i = null) => {
    if ((!i || typeof i != "object") && (i = {}), i.type = t, i.target = e, typeof this.subscriptions[t] < "u" && this.subscriptions[t] && this.subscriptions[t].length) {
      for (let s of this.subscriptions[t])
        s(i);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (t, e) => {
    let i = !1;
    if (typeof t == "string")
      this.unsubscribeFromEvent(t, e) && (i = !0);
    else if (typeof t == "object")
      for (let s of t)
        this.unsubscribeFromEvent(s, e) && (i = !0);
    return i;
  }, this.unsubscribeFromEvent = (t, e) => {
    if (typeof this.subscriptions[t] > "u" || !this.subscriptions[t])
      return !1;
    const i = this.subscriptions[t].indexOf(e);
    return i !== -1 ? (this.subscriptions[t].splice(i, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const r = new lt(), pt = (t) => t * (Math.PI / 180), At = (t) => t * (180 / Math.PI), R = (t, e, i, s, o) => {
  if (t === 0)
    return [e, i];
  const n = pt(t), h = (e - s) * Math.cos(n) - (i - o) * Math.sin(n) + s, a = (e - s) * Math.sin(n) + (i - o) * Math.cos(n) + o;
  return [h, a];
}, O = (t, e, i, s) => Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - e, 2)), dt = (t, e, i, s, o, n) => {
  let h = (t - i) * (o - i) + (e - s) * (n - s);
  const a = Math.pow(o - i, 2) + Math.pow(n - s, 2);
  return a === 0 ? -1 : (h /= a, h < 0 ? h = 0 : h > 1 && (h = 1), Math.sqrt(Math.pow(i - t + h * (o - i), 2) + Math.pow(s - e + h * (n - s), 2)));
}, ut = (t, e) => {
  const i = (p, d, f) => d.x <= Math.max(p.x, f.x) && d.x >= Math.min(p.x, f.x) && d.y <= Math.max(p.y, f.y) && d.y >= Math.min(p.y, f.y), s = (p, d, f) => {
    let m = (d[1] - p[1]) * (f[0] - d[0]) - (d[0] - p[0]) * (f[1] - d[1]);
    return m === 0 ? 0 : m > 0 ? 1 : 2;
  }, o = (p, d, f, m) => {
    let x = s(p, d, f), N = s(p, d, m), D = s(f, m, p), y = s(f, m, d);
    return x !== N && D !== y || x === 0 && i(p, f, d) || N === 0 && i(p, m, d) || D === 0 && i(f, p, m) ? !0 : !!(y === 0 && i(f, d, m));
  };
  if (t.length < 3)
    return !1;
  let n = [1e4, e[1]], h = 0, a = 0;
  do {
    let p = (a + 1) % t.length;
    if (o(t[a], t[p], e, n)) {
      if (s(t[a], e, t[p]) === 0)
        return i(
          t[a],
          e,
          t[p]
        );
      h++;
    }
    a = p;
  } while (a !== 0);
  return h % 2 === 1;
}, tt = (t, e, i, s) => !t && !e || !i || !s ? [i, s] : t && e ? [t, e] : (t || (t = e * (i / s)), e || (e = t * (s / i)), [t, e]), X = (t, e, i, s) => {
  const o = s.scaleFactorX || 1, n = s.scaleFactorY || 1, h = s.offsetX || 0, a = s.offsetY || 0, p = s.flippedX || !1, d = s.flippedY || !1;
  return i === G.CURRENT_TO_ORIGINAL ? ([t, e] = k(t, e, p, d, s), t -= h, e -= a, t *= 1 / o, e *= 1 / n) : i === G.ORIGINAL_TO_CURRENT && (t *= o, e *= n, t += h, e += a, [t, e] = k(t, e, p, d, s)), [t, e];
}, k = (t, e, i, s, o) => (i && (t = M(o.right - t) + o.left), s && (e = M(o.bottom - e) + o.top), [t, e]), G = {
  CURRENT_TO_ORIGINAL: "current_to_original",
  ORIGINAL_TO_CURRENT: "original_to_current"
};
function gt(t) {
  return ct(t) && !ft(t);
}
function ct(t) {
  return !!t && typeof t == "object";
}
function ft(t) {
  const e = Object.prototype.toString.call(t);
  return e === "[object RegExp]" || e === "[object Date]" || St(t);
}
const Et = typeof Symbol == "function" && Symbol.for, mt = Et ? Symbol.for("react.element") : 60103;
function St(t) {
  return t.$$typeof === mt;
}
function bt(t) {
  return Array.isArray(t) ? [] : {};
}
function _(t, e) {
  return e.clone !== !1 && e.isMergeableObject(t) ? T(bt(t), t, e) : t;
}
function yt(t, e, i) {
  return t.concat(e).map(function(s) {
    return _(s, i);
  });
}
function vt(t, e) {
  if (!e.customMerge)
    return T;
  const i = e.customMerge(t);
  return typeof i == "function" ? i : T;
}
function xt(t) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function(e) {
    return t.propertyIsEnumerable(e);
  }) : [];
}
function J(t) {
  return Object.keys(t).concat(xt(t));
}
function et(t, e) {
  try {
    return e in t;
  } catch {
    return !1;
  }
}
function Mt(t, e) {
  return et(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
}
function Ct(t, e, i) {
  const s = {};
  return i.isMergeableObject(t) && J(t).forEach(function(o) {
    s[o] = _(t[o], i);
  }), J(e).forEach(function(o) {
    Mt(t, o) || (et(t, o) && i.isMergeableObject(e[o]) ? s[o] = vt(o, i)(t[o], e[o], i) : s[o] = _(e[o], i));
  }), s;
}
const T = (t, e, i) => {
  i = i || {}, i.arrayMerge = i.arrayMerge || yt, i.isMergeableObject = i.isMergeableObject || gt, i.cloneUnlessOtherwiseSpecified = _;
  const s = Array.isArray(e), o = Array.isArray(t);
  return s === o ? s ? i.arrayMerge(t, e, i) : Ct(t, e, i) : _(e, i);
};
T.all = function(e, i) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(s, o) {
    return T(s, o, i);
  }, {});
};
const U = (t, e = !0) => {
  let i = 0, s = 0;
  if (!e)
    return { top: t.offsetTop - t.scrollTop, left: t.offsetLeft - t.scrollLeft };
  for (; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop); )
    i += t.offsetLeft - t.scrollLeft, s += t.offsetTop - t.scrollTop, t = t.offsetParent;
  return { top: s, left: i };
}, z = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
  const e = Math.random() * 16 | 0;
  return (t === "x" ? e : e & 3 | 8).toString(16);
}).replace(/-/g, ""), it = (t) => {
  try {
    t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1;
  } catch {
  }
  return !1;
}, S = (t) => typeof t < "u" && t !== null, b = (...t) => {
  if (!t.length)
    return null;
  let e = t[0];
  if (t.length === 1)
    return e;
  for (let i = 1; i < t.length; i++)
    S(t[i]) && typeof t[i] == "object" && (e = T(e, t[i]));
  return e;
}, Bt = (t) => {
  const e = atob(t.split(",")[1]), i = t.split(",")[0].split(":")[1].split(";")[0], s = new ArrayBuffer(e.length), o = new Uint8Array(s);
  for (let n = 0; n < e.length; n++)
    o[n] = e.charCodeAt(n);
  return new Blob([s], { type: i });
}, K = (t) => new Promise((e) => {
  const i = new FileReader();
  i.onload = function(s) {
    e(s.target.result);
  }, i.readAsDataURL(t);
}), W = (t) => {
  try {
    return JSON.parse(t);
  } catch {
    return null;
  }
}, Ot = (t) => {
  let e = t, i = e.indexOf("-");
  for (; i !== -1; )
    e = e.replace("-" + e[i + 1], e[i + 1].toString().toUpperCase()), i = e.indexOf("-");
  return e;
}, M = (t) => t < 0 ? -t : t, Pt = (t) => new Promise((e) => {
  setTimeout(() => {
    e();
  }, t);
}), u = (t, e = {}) => {
  const i = {};
  for (let s in t)
    s !== "type" && s !== "target" && (i[s] = t[s]);
  return Object.keys(e).forEach((s) => {
    i[s] = e[s];
  }), i;
}, Q = (t, e = null) => (e || (e = t.target.root || t.target), j(e, t.pageX, t.pageY)), j = (t, e, i) => {
  const s = U(t, !0);
  return [e - s.left, i - s.top];
};
function Rt() {
  this.subscriptions = {}, this.subscribe = (t, e) => {
    if (typeof t == "string")
      return this.subscribeToEvent(t, e);
    if (typeof t == "object") {
      for (let i of t)
        this.subscribeToEvent(i, e);
      return e;
    }
    return null;
  }, this.subscribeToEvent = (t, e) => ((typeof this.subscriptions[t] > "u" || !this.subscriptions[t]) && (this.subscriptions[t] = []), typeof this.subscriptions[t].find((i) => i === e) < "u" ? null : (this.subscriptions[t].push(e), e)), this.emit = (t, e, i = null) => {
    if ((!i || typeof i != "object") && (i = {}), i.type = t, i.target = e, typeof this.subscriptions[t] < "u" && this.subscriptions[t] && this.subscriptions[t].length) {
      for (let s of this.subscriptions[t])
        s(i);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (t, e) => {
    let i = !1;
    if (typeof t == "string")
      this.unsubscribeFromEvent(t, e) && (i = !0);
    else if (typeof t == "object")
      for (let s of t)
        this.unsubscribeFromEvent(s, e) && (i = !0);
    return i;
  }, this.unsubscribeFromEvent = (t, e) => {
    if (typeof this.subscriptions[t] > "u" || !this.subscriptions[t])
      return !1;
    const i = this.subscriptions[t].indexOf(e);
    return i !== -1 ? (this.subscriptions[t].splice(i, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const C = new Rt();
function It(t) {
  this.menu = t, this.panelCssClass = "", this.itemCssClass = "", this.itemTextCssClass = "", this.itemImageCssClass = "", this.itemsCssClassesById = {}, this.setStyles = () => {
    if (!!this.menu.panel) {
      this.panelCssClass ? this.menu.panel.className = this.panelCssClass : (this.menu.panel.style.padding = "3px", this.menu.panel.style.borderStyle = "solid", this.menu.panel.style.borderColor = "#dddddd", this.menu.panel.style.borderWidth = "1px", this.menu.panel.style.backgroundColor = "#eeeeee", this.menu.panel.className = "");
      for (let e of this.menu.items)
        this.setItemStyles(e);
    }
  }, this.setItemStyles = (e) => {
    this.setItemDivStyles(e), this.setItemSpanStyles(e), this.setItemImageStyles(e);
  }, this.setItemDivStyles = (e) => {
    const i = this.menu.panel.querySelector("#" + e.id);
    !i || (i.style.display = "flex", i.style.flexDirection = "row", i.style.alignItems = "center", this.itemsCssClassesById[e.id] && typeof this.itemsCssClassesById[e.id] == "object" && this.itemsCssClassesById[e.id][B.ITEM] ? i.className = this.itemsCssClassesById[e.id][B.ITEM] : this.itemCssClass ? i.className = this.itemCssClass || "" : (i.className = "", i.style.paddingTop = "2px", i.style.paddingLeft = "3px", i.style.paddingRight = "3px", i.addEventListener("mouseover", () => {
      i.style.backgroundColor = "#0066CC", i.style.color = "white";
    }), i.addEventListener("mouseout", () => {
      i.style.backgroundColor = "transparent", i.style.color = "black";
    })), i.style.whiteSpace = "nowrap");
  }, this.setItemSpanStyles = (e) => {
    const i = this.menu.panel.querySelector("#" + e.id);
    if (!i)
      return;
    const s = i.querySelector("span");
    s && (this.itemsCssClassesById[e.id] && typeof this.itemsCssClassesById[e.id] == "object" && this.itemsCssClassesById[e.id][B.TEXT] ? s.className = this.itemsCssClassesById[e.id][B.TEXT] : this.itemTextCssClass ? s.className = this.itemTextCssClass : (s.className = "", s.style.color = "black"));
  }, this.setItemImageStyles = (e) => {
    const i = this.menu.panel.querySelector("#" + e.id);
    if (!i)
      return;
    const s = i.querySelector("img");
    s && (this.itemsCssClassesById[e.id] && typeof this.itemsCssClassesById[e.id] == "object" && this.itemsCssClassesById[e.id][B.IMAGE] ? s.className = this.itemsCssClassesById[e.id][B.IMAGE] : this.itemImageCssClass ? s.className = this.itemImageCssClass : s.className = "");
  }, this.setPanelClass = (e = null) => {
    this.panelCssClass = e || "";
  }, this.setItemClass = (e = null, i = null) => {
    if (i) {
      this.setClassForItem(i, B.ITEM, e);
      return;
    }
    this.itemCssClass = e || "";
  }, this.setTextClass = (e = null, i = null) => {
    if (i) {
      this.setClassForItem(i, B.TEXT, e);
      return;
    }
    this.itemTextCssClass = e || "";
  }, this.setImageClass = (e = null, i = null) => {
    if (i) {
      this.setClassForItem(i, B.IMAGE, e);
      return;
    }
    this.itemImageCssClass = e || "";
  }, this.setClassForItem = (e, i, s) => {
    (!this.itemsCssClassesById[e] || typeof this.itemsCssClassesById[e] > "u") && (this.itemsCssClassesById[e] = {}), this.itemsCssClassesById[e][i] = s;
  };
}
const B = {
  ITEM: "div",
  TEXT: "text",
  IMAGE: "image"
}, wt = (t, e = {}) => {
  const i = {};
  for (let s in t)
    s !== "type" && s !== "target" && (i[s] = t[s]);
  return Object.keys(e).forEach((s) => {
    i[s] = e[s];
  }), i;
};
function Tt(t, e, i = null, s = {}) {
  this.panel = null, this.container = e, this.items = t, this.event = i || "contextmenu", this.options = s, this.listeners = {}, this.origEvent = null, this.cursorX = 0, this.cursorY = 0, this.overflowY = "", this.maxImageHeight = 0, this.subscriptions = {}, this.init = () => (Object.assign(this, new It(this)), this.listener = (o) => (this.onEvent(o), !1), this.container.addEventListener(this.event, this.listener), C.emit(w.CREATE, this, { owner: this }), this), this.onEvent = (o) => {
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
      const a = this.panel.querySelector("#" + n.id + " > span");
      if (h.style.display = "none", h.src = n.image, !this.panel)
        return;
      const p = document.createElement("div");
      p.style.marginRight = "5px", p.style.display = "flex", p.style.flexDirection = "row", p.style.justifyContent = "center", p.style.alignItems = "center", h.height = this.panel.querySelector("#" + n.id).clientHeight, h.height > this.maxImageHeight && (this.maxImageHeight = h.height), h.style.verticalAlign = "middle", h.style.display = "", p.appendChild(h), this.panel.querySelector("#" + n.id + " div") || this.panel.querySelector("#" + n.id).insertBefore(p, a);
    }
    this.adjustImagesWidth();
  }, this.setItemsEventListeners = () => {
    for (let o of ["click", "mouseover", "mouseout", "dblclick", "mousedown", "mouseup", "mousemove"])
      this.setListenersForMouseEvent(o);
  }, this.setListenersForMouseEvent = (o) => {
    for (let n of this.items)
      this.setListenerForItem(o, n);
  }, this.setListenerForItem = (o, n) => {
    const h = (a) => {
      !this.origEvent || (C.emit(o, this.origEvent.target, wt(a, {
        container: this.container,
        owner: this,
        cursorX: this.cursorX,
        cursorY: this.cursorY,
        itemId: n.id
      })), setTimeout(() => {
        ["click", "mousedown", "mouseup", "dblclick"].indexOf(o) !== -1 && a.button !== 2 && this.hide();
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
    if (!this.container || (C.emit(w.SHOW, this, { owner: this }), this.drawMenu(), !this.panel))
      return;
    this.panel.style.display = "";
    let o = this.cursorX, n = this.cursorY;
    this.panel.style.left = o + "px", this.panel.style.top = n + "px", this.panel.style.zIndex = "10000", this.panel.style.position = "absolute", o + this.panel.clientWidth > window.innerWidth && (o = window.innerWidth - this.panel.clientWidth - 10, this.panel.style.left = o + "px"), this.origEvent && this.origEvent.clientY + this.panel.clientHeight > window.innerHeight && (n = n - (window.innerHeight + this.panel.clientHeight - 20) + this.origEvent.clientY, this.panel.style.top = n + "px");
  }, this.hide = () => {
    this.panel && (this.panel.style.display = "none");
  }, this.addItem = (o, n, h = null) => {
    const a = { id: o, title: n };
    h && (a.image = h), this.items.push(a);
  }, this.removeItem = (o) => {
    const n = this.items.findIndex((h) => h.id === o);
    n !== -1 && this.items.splice(n, 1);
  }, this.findItemById = (o) => Array.from(this.panel.querySelectorAll("div")).find((n) => n.id === o), this.setId = (o) => this.panel.id = o, this.addEventListener = (o, n) => {
    typeof this.subscriptions[o] > "u" && (this.subscriptions[o] = []);
    const h = C.subscribe(o, (a) => {
      a.owner === this && n(a);
    });
    return this.subscriptions[o].push(h), h;
  }, this.removeEventListener = (o, n) => {
    this.subscriptions[o] && typeof this.subscriptions[o] < "u" && this.subscriptions[o].splice(this.subscriptions[o].indexOf(n), 1), C.unsubscribe(o, n);
  }, this.on = (o, n) => this.addEventListener(o, n), this.off = (o, n) => {
    this.removeEventListener(o, n);
  }, this.removeAllEventListeners = () => {
    for (let o in this.subscriptions)
      for (let n of this.subscriptions[o])
        C.unsubscribe(o, n);
    if (this.container && this.container.removeEventListener(this.event, this.listener), this.subscriptions = {}, !!this.panel)
      for (let o in this.listeners) {
        const [n, h] = o.split("_"), a = this.panel.querySelector("#" + h);
        a && a.removeEventListener(n, this.listeners[o]);
      }
  }, this.destroy = () => {
    this.removeAllEventListeners(), this.items = [], this.container = null;
    try {
      document.body.removeChild(this.panel);
    } catch {
    }
    this.panel && (this.panel.innerHTML = ""), this.panel = null, C.emit(w.DESTROY, this, { owner: this });
  };
}
const w = {
  CREATE: "create",
  DESTROY: "destroy",
  SHOW: "show"
};
function Dt() {
  this.menus = [], this.create = (t, e, i = "contextmenu", s = {}) => new Tt(t, e, i, s).init(), C.subscribe(w.CREATE, (t) => {
    this.menus.indexOf(t.target) === -1 && (this.menus.push(t.target), t.target.id = this.menus.length);
  }), C.subscribe(w.DESTROY, (t) => {
    this.menus.indexOf(t.target) !== -1 && this.menus.splice(this.menus.indexOf(t.target), 1);
  }), C.subscribe(w.SHOW, (t) => {
    this.menus.forEach((e) => {
      e !== t.target && e.hide();
    });
  }), document.addEventListener("mouseup", (t) => {
    t.button !== 2 && this.menus.forEach((e) => e.hide());
  });
}
const Y = new Dt();
try {
  window.Menus = Y;
} catch {
}
const Lt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECcZZuWhdAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlZBBEsAgCAMT/v/n7akzWAFtTo5mQ8SAJtkGcL4LXcg211A2L+eq3jc5C/AGTUBZ7wYAHH+B4yIAv8a8dkvilLz9qXuYKseU2E7qDFODqIwTIEkPSldAAa0WlbUAAAAASUVORK5CYII=", _t = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECgYlnqNLQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABZSURBVCjPlZFBCgAxCANN/v/n2VOhiFU3N4U4GgXELUkAikbOhlhIh1QZXkR3hGc/IsaVMtHT0RXR3e5jescIqBpy05T/tInffw2AvEkr972N+a69+U8e8AGOtEABr4X+4AAAAABJRU5ErkJggg==", Ut = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECkWaNmRawAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABjSURBVCjPlZBRDsAgCENbsnt6/1N0P2ocijASEy08iqC1BknhASCvsSeOQXImJXHcrQL4t1UAr4fjReDmdCsc/5LEZ7NOwOlUKVy3RwC/AAAwL2TAZ3t+xFszOxVl7lbtvsYLOtlZCOj2NccAAAAASUVORK5CYII=", Vt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECoXNPPyPgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlVFBEgAhCAL+/2f21I5jqcXFGRMSpG1EkLRtooEyIdaRlAc7orqBsg+gVKy8yTYn49vqMb0pgCUuPOBP93Sniaxb8/FdL6mt/rZe5SMKXQWRf/4AYrs6C0ViuwUAAAAASUVORK5CYII=", zt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDsHep3BSgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA8SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCAZy0h4AXLILDAEWNOwAAAAASUVORK5CYII=", Nt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDMMJZaSygAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA/SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCJxAWZoFp1MBY8cLTv/x72kAAAAASUVORK5CYII=", Ht = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQARsznxFAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", Gt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQEbSvcpSwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA3SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTCICjCTbxPJfsIWSv+JECM9nugHAG40DyW1OoLPAAAAAElFTkSuQmCC", kt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDIpd4l3zAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", Ft = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDYr/evT5AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", Wt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDUsSKIVhAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA0SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTBQZBPJfsIWSv+JECM9nugHADv6Dv2P6G4ZAAAAAElFTkSuQmCC", Qt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDQQftZYQgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", q = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAEDSURBVDjLzZPNSsQwEIC/CUWtQlnZi14EYb36Jj6DT+ZT+BSevImHPYggKLpo2bW1Ze14yJjFtKEed3poMpmvzZcf2LqQfkolZFV0FFDhkMI6JR99JAbczTlP/tGZung86yN7Spn+4ABw0PH5DyCoOoSvYOg00s9C+YSpL8oLGgMmnOILF2r68qvKibvWXd9hbsCZ/ajpLniULnKQO82tubb3vY3Uw9IrvhOmCaDFJYC2DyjLt1vNQGjzI5v7+1wrBWTN0uQ3R0OFfQRwz7PjS8td8UAHKFW0rCDqt0ud1mEfKlZ+bYYdNtGQjAFgh6L+M9sRQKev5Yu1F4zfh7ELtIXxA+JiW9aVMPJ4AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", st = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAACn0lEQVRIx+2U30tTYRzGn/fsPdOmNkWDsEDnOiFCbv4KhPJCFAvDtBuRyL/A64TwQkGaCt7pVYqimHhTJAVhuYsRE5zipLuZeQKNsMQdN1vbzvbtwg2Oa5s/uvWBl3Px8P18OO/7ngNc5H9DROw8XTxCumEiygJwjYh4kp7HuqzTiJLBc8aslr5+vbiy43SWaiVExHecztJ+vbgyZrX0EVHOqSVx+ERFee8wR3hcBNky+VpcEofbMvnauAga5ghPVJT3ppKwJIKsqRrr0/3P68+KdeAMgBIFfgjc/cT+6TEATNffmbkaVa1GASAAcgRq3i3L806Xe4gxdqjl8QS4ACBPDPibpIwjOAAUAOBR1fqy8e4MAFwXVGuuZlLi4ErA3wTgBREFGGPRdG+gCytKy3JDTdfvrxv12s4bOXrm6o7PGEok++2PrhHRaJxnjEXSblFMog/7lea1xn8liTGUSPaKD64RMdv4jjEWOvEMtJKIX2lev1fTFdhKLrlkkuyW964RXQo4kOY7ABBVNj0e+eDwMudAsiUfHF5WNj0eANFUkFRbxPdWl268elA3Wyyq1nwx+fBeGJDD3P3oraMjv6r2C2NMPVFARLq91SXpTUvdrEmvWgv0SJtfIWArxN0P5x0d+VW1G2kPOXZNC6dMma+LebD6SgI8o+imHQCC3zzHzuRnCJDVjJXOrT9tAL5rr+mxM4gV+w3dPY7CbCEkciC+DGbJXjS3PFo0tzxqMEt2bVeYLYQaunscAPa18KSJ/SrMyuSgTa4WgnIlaLtVWlR93jYi0hORXvV527ZbpUW5EiRXC0FlctBGROaz/o/Mvumhgd32soU4XNPrVZ+3bbe9bME3PTRwJniCxERE97VwrSTWmc4MTxSdp7vIqfMXBoR6XMSZc1QAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDB/NVeTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwDmjvLwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=", jt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAG6SURBVDjLlZK/TxNhGMc/z117FgWbNulITGMYTMvAaHAyhMTAIoOmcdD/wMWERdO4E8If4OJASBgcGcA4QRgx4YcLA4aUYDTRCoX2fj0OvTu441rwuem+7/N5n/f7PA/8ZwholiHuYCCXdMWnxYk4KYwWSws0+JX4GqUFLaqRVmHYWFUfTZ6I4U9ynKyRAUztoNsfq6f4gWrsDI6+VMGMPTMCwIHqGt+xA9Wq3uNFuukIoIUtduiYFs51QDIcwMSKrHn4otcBebJ4QfofmnghYKcANlCQxaj505xcAL0qGM1lFEXwwsH2B/zi0/DXXbps2k0YtDBxAbxvPbtUL7/Xi8HVy90ntXdwVUUgHKGADufedrJUsGKWd2857aXMXLAy4j7nUOxuhdabvfmR86/x0gPO7AFn3lYkCJaqON31HqVCNpZvMkCDA3kVtfUD5/yVYwFQ48qaZShO1VeqbEbKwyfbK+/kx5VtDO4TLO/Rs7FPpVCZ+bm8Za5LpwcAKuTajycebBQAxn9/3st9oSPaEwAVbjcnx+/vDlZON/bza5yJ0j9UNH9Um3h9VNO7/a6OIwWd0sIN09PiH5BSrD/OwMFRAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", Yt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAFGUlEQVRIx7WVaWxc1RXHf/ctM+OxPcQLxIljD3GCAYOxiHCSpmmWEgi7kBBIiEXiU79USHxhEaJtWqFWqqhQW1BLIImrVLTwgQBhM2sIEIVFCZDFSbCdxI4X7ExmMjOemffuvacfbA8e1FYNUv/See/o3vf+5/3/5+o8+D9DzSYiolatWhUrFArR2bXa2lr1317OZrMCcPbsWQFIp9PypOt23TsxsbuigIiogx8/d9+StsW/8P1Y8ty/U6avpYCPf/2XbMPdV9/fueZn2wA8gPXr11e/uu2hX1EabQlyeRQKlPofuQVBQCy5XYdwGv3aZGvLJuCfQMEBsNZW+RG/xZSyWAEjqiJCA09ueZtr736CXXuPzdkDI2CtYI0wvvsY1a21RHyvFYgCOACJRMK1RmMsWKuworDiYMXBWMXjf3yF9/f0s+mXjxB6TfR+eLi8Px0Kk5lieP8g9YsvIAiLJBIJp2yR53nKaI21Mu3MbAB/3trLnn0neeap35FsrseGU3y5r8SLO/dy2/XLZ13CfHacjO8Qr6tBl0qIiCorUEq51oYYIxgr05KtsO2FXbzy9n4ee/jnjJ44wOmRQxw5+CnP/r2XqliU51/+BGMs1kDu6Di6KcFUMcBajYh8p8AYo6wOsMagRGERnu55kx1vfc6Plney+bmtXP3jDv72j9dYOL+ODasvp7urjfxUkb9uf4d7b+gmNTBGtK2RIAxBTPmEejNNVkYHGKMRIzz42xfY/ekRrlvXxdruC5mX6MB1XVZ3t2OtMDJ+hoETY3Rd2sLtN69gz5Z3qU3lqN9wEQrBmu8s8gAymYzosITRITvf28fxoQmeePROCqWQMAiZmMxgrSWVyhCEBkQIwxATlFhyYSMr59XyXv4bEp7Cc8CEYaWCdDqNDovoMODowCgbf3IpuXwOgHyhRLEQUBXzwcbAUbiOQ8RXHO0f4tuJM6w+nSeb8ImKQSFoXSKfz1NuciqVQodFQh2w8soWjgyOMjwySVNjNYWpIhFPiMdcfNcS9YSYJ8RjDvGYi2ciTC6/hlxbMx1Lzyc0Bh0EZW5vpoCEQQkThlzRPp/O9iZe/+AQv/nTa2x+/A6y+SI18SijE1mKpQAdWiIRl5XLknxzzOdYop5IcwO+pwiCEOUVKy0ClA6KGB1Mjwmg98PDLOtYiBjN0KkU45NZhsYydHcuIhZ1qa3ycMVgaxYycnyAqzrOI5ctYMXietFyAQegUCiggwJGG7TWaK3pumQBff3f8uyLe/F9RceSBrovWwDG4CkoFgNS6RxnTIxTo4MoMYxOZNDaoIN/pyAsIWLLM+yWn17M7Rs76B9K0fPSF2xYsZh0tsDi5np8L0Y04nH4eJrtvc9z5dIYg8PVNM6LE/UddFiqVAA4WocYY8rxxYFhdn7QRzzm0TcwwchkjisubmLB+TXUVEeIRBw+/3qQI4cPUBfXIMIFDXFELFqHlU0GlNGmYgqv6Gwu53fd2Mn+vjH6T57m/rtWYo3BWOGTfSdJNlXRcF6M9mQdSoQ5PJUWGWPLP47vY113kjVXtfKHnj38fstH3LT2Ik6NZ+loa2Tj6iW0JxuYGTlzuSsK2KGxzGTz/ESjWMN/wgP3rCjnS1vrWNvd+j1iUI7LqfHMJGDnFhjrefmrN+67bfmNyUVN9cpxUY6Hclwcx0WVY/pxsRqxBrEGO3OfXTsxPJbq2fHVm8BYWcYMLgNuBS6Z0/xzhQX6gB3AwR/IcW74F/jUry6yACAoAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", Zt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAE8ElEQVRIx7WVWWxVVRSGv733Off2Xjrc0oFKy6XQoqCMEgc0RhFNVBzwQRIfUBKiTyYqCSQmmhiNJkSjiQkJiQ8mKg5xiGKCCIpEZFCCcwlVhlCwrbSlpe1te8/Ze20fTluL4AMaV3KmZGd9a/3r7H/D/xzqb99pIPUfc0ZA8TzALzvee6C5adbTqVRqxgXrGFupDUqBR4EG/LkrfVwc6jjZ9nzDkjuemwjIFFq/OZRyI43EI//Qp0IpnTyDAKU1KDUBPprKpJAgNRTk51cDw8GYNKkwaJTCIHgPWieVeTkX4lWSWCzaGDAhSisUejS/BxdhMqXZUbnHAUpsTH//AH2FYQojMWcGCgBUZNM019eQCsNkpVOgNV4MSgQThHgDSpm/ZEp0UwDjAO9istkSJpWWooIQrwNO/dHNdy2tvL31S2bW17H0yjnkp9aCKLxolLMgHh2GEJBIqAGRCcImUT38884uGeyFIMShCdMZMAFoQxRZPv96P5s/2EJ1RSlrVtzKFc15lNZoE2LSaXSYRpkApQ1kKtANc2uA7jFATeH7z05LoY+ih9N9BY793sVwFBE7x9LrriFXXo54z849+3nl1ddZMKuRh+69lfq6GlSYIkhn0Kk0OghRJeXo/IJaoGsMUDtw4JM/3GAvrW2dvLN9N22dZyhaR29/AWuF8tIM0+vruO+OW5jdlOeZlzdx6Mhx7rnxKlbdvYxcrpIgncWkS1CTcpj8winA6QlDjhAbMWvqZErTIXu+b2FwpEgmFeKVJghCevqH6O79kKqKLLfftITLm6bz7tad7P2xlQ2PPUg+Pw1lDMa582ZQ1/vV2x1u6CxRbPntZCffffwtmeV3MmQt/b09tLed4OCh45w6fpiG2iqWXb2IqvI0c2Y08MrmLQC8vP5hmpubSFVUYZquvQToHOtAiysiEhEYxeSKEnp8kRvP9DBz1QMopXh9234GGvuYZ4Qsll9/2Mv04hkaasrZ8MhKXnprGx/s2M36xmmItZD8T8kNUDaOcNaR7IdBGhdOp3XfPrIlJQTpLCvvXMaifCVvPvs4B776HH/ZDTQtuY0t+1po7+ljwyMrmd1Yh7URYovj6owDJB5BXIS1MfVVZeRKM/SGwu6nnqR6co4X3t9DN2WUV07m+hX3s2Lptaxe/SAvbnqNT789TN/Zfm5ePAdxMWLj8wE2KiJxjIsilLXMnVZD47x6TnScYte6tSyp1fza3sddT2ykc9CwsKGSsrJSamrrWPfoWn48chJxDnEWl/jZuTvZFUfw1uKdgAiBeK6ZeQk9UyrpONbFpT99ST5TRvtQjvlXLaIhtHQdO0I00MNQ+1EWN09FXIx3DhcXzwNoH0d45xCbAEQSR6nOpKia14CIx/qIKcOnSB/tpPeEQQcBxigmaY0ODF4s3sZIVBxXZ8I+sIgVvEsufGJagkJp0EoT4kllQpRS4D3exjg36rChR0UxNijilbqARNbhrYB4RHxi22Pu6AHsqPcrvBp1TMWoH3m88slhVBwZO4TOGbJ09w8OKDzee1RSPqDwPnn3kpBEBHFJIYjHW0Gsw8cWsRE2LtLW0d4HyMQOOt/44uD2NbddvzxXnitRyoBSKG0Sd9QapUwiBeC94MWBCB6X0JWgjaaju+fsxg93bQM6J1oFwBXACmD2hM4uNgQ4DHwEtPzLHBcXfwKfID6QlqygzQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMH81V5MAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDAOaO8vAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==", Xt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAFdSURBVDjLzZO/TsJQFMZ/t1QsmthEjQkmLoZJA7ODq/EdHBx9BcTEmMjCxsA7+Ao+gFOdCImOuoAs/qtIldL2OECxLY1EJ88Zbu6933e+c/988MtQ8akotOQaQqAklSAaS5hkEgQfmzcVTImJEjPfoMNjIjv5hpiiEgqiyJLXLiVAEpWU0oJ9HpQHoEeaWWFZPpGbiy17QlK35vaBqBAXaWajzp3sYWFJUQzRx2lIEQtLNmVMGQ0ZzPYuXQQX6OON5EGgjxstHkrp8k4A8c1xpBJgAMAwhTBMJ7jT1X5WGP5nBQ1dvve1mQq1wjGEX02rFX5S8HPOh16pVOYjiAHNnIeXTuidtc/XnOv4ERa8ky42fkpL9dXyfTnLXAzf54UmvdBCCkB01hcPHZ0djHh15QVHdHBV5BYAfOzq06npXMXhhl995TkKnxhINEqUyE49WYtW3JxRx82w/x/jC67KmykWiVPXAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", Jt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAACQElEQVRIx9WUz2sTURDHPzMvIb3VgyJKW/DXSXoKtSJIbaxtgi3of+BfIYKXgOAfUCh6zFFR9Ca1tomXigf7P/SQqo2giIrNpvvGw+7GStIlG/HgLI8dHvPmOzPvw4P/3SRx1hurde/9bL8g7z1mhveGWeQj0liq3CgNrLS28cKy2JNnj2yQvLnE6XQ6AHz/8Q3vPd6HhMk/3CcMw2j5fU5NnCMI2gMV3hUIggCAdrDHy9U1zDzeopF4b5g3jJCZKzN/xA8h0Ga2NAMIZoYRz91b3JmP4ttZBeIDPgzZWK8DgghEgzbMADNKc6W/6yD0nqtzJUQEVY2FonXQ2lkFkgNOlXq9gYoiqqgIiCJETM+XF7oFrTxYtjNnT6ci3NOBc45yuYxTh3MOVYeqxt0QJYjjp6cuUSwWe6p++vzxbE8HiYCosv5qI0rqFKeOxeuLqHOICHbgkr98/czH1k4qwj2XLMD8wjWcy5FzDudyICDxZ/FdBEHAm81Nms1mKsI9HRw/djL10hyuGz81fYHJyfOpCHcFDNu8c/f2RUveHTMS38xcNPookXlPYWSErXdbtHZ3UxHuCtyr3r9crd4qbCcb27+rHp848XNp8SYfdndQVUSEkUKBsbFxRo+MpiKcO7Bv1Wptr99YVh4uUywWab4/SqPxGhVFnaPV+nQowv0EDrVOp4Oqks/nqVQqAyGcSWAYhLMJDIHwUB1kQTiTQBrC0RtkRAhH+7l87m1yVgYRAOQwhPtZrVZrk7z0/9p+AWdQwNFPdOB+AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDA5LTEyLTAxVDAyOjIyOjM1KzAxOjAwqBTIawAAACV0RVh0ZGF0ZTptb2RpZnkAMjAwOS0xMi0wMVQwMjoyMjozNSswMTowMNlJcNcAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAE3RFWHRUaXRsZQBPcHRpY2FsIERyaXZlPme6DAAAAABJRU5ErkJggg==", Kt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAAB3RJTUUH5goLBzIP6fiS+gAAAoFJREFUSMfVVk1rE2EQft55EyKeFU0PlcR6koIa+0FBa2NtEmyL9uLBIoHi0YvFogghIIjoTbx4MldB8BRUTJNeqh7MwT+gPaSpKdjak2bTnfGw3SVhP5p4EFxYmJf5eGbmfXZmgf/9UbZQqrwtM/OElxEzQ0TALBCxZChVmclcSe4HEGoLMjEwv+AoYvV6oOOr1y87kvkajYotxzc2lAug1Wp1BPi5swWTGcwmTHMXpmlaL+8i1n8ChtHsqkUOgGEYHYpisQgWqyXMAmGBwMT4hXFP+64AYvU66o0aFICx08OOUbj6EcICZgYzW/ZNw7ct3gBNKyM2TSyXyjjfZrRcKkMEgAiSk8m/rwAATGZcnEyi/UZSqRSU6kyw2SuA7aCJUC5XQE8eQRGBlMLoqbMdTt8AzAF4k7uH4wNxiAiKLOJFYVcFWmuk02lo0tBag0jjx+07ntmNDI0hkUgEUtgFoIhQer8MIgJpgiaNMz7lb+9s4fvmeiCFXZesAEylLkHrEEJaQ+sQGj4AH1ZXUavVAinsquDI4b6u58zQyDAGB096UtgFIJDVu/eXRsWeOyKw5VuA9gKofq5is9EIpLAD8CD/8Fw+n42s7Z1zz9/9snUvbmYxM30VG411EBGUUjgQieD6fNYJdPBL1ZPCobaEJJ8v/LYPuWjUURztiyKRSKBWP4RKZQWkCKQ14m3OK+UVTKVT/hUEPa1WC0SEcDiMTCbjUHh7ccmxmZmdtb6BIAC/2fLYMMSTws+eYvryNEhr1PqPOXGMhRu9VRBEYShAoXOM9NyiXinsC+A3coMobK1RAa7N7e0NRkipT66dvN/ubqcw1oKNC4VCE4D8k7+KP78ve+ZyfaadAAAAAElFTkSuQmCC", qt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5godFRotCxUC6QAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAPfSURBVEjHtVS/TyNHGH27Ozv+sRj/CDYuQCJSdBRp6CkjLlWkFFGUUCJLSUkBhfMPUCJEQZciihwqpEsTiQasSBQnIaUgd2ALkC4sxpzDcuZ8O+udbzaF2cXEwF2QstLTzOx+s2/mfe/7tHL5h+DCceC6LgxDh5QSvpSQkiB9CQrXJCGlBEmCvF734m7e+f5N3LtOB2+v3oAFgUKhMIpM7iPkRvKQvoQkgiQCSQWp+uakQEpCSgW6jpFEIFK9A4VzUjiuv8Afz38H0zQNhmHA5ByxWByGIWFIgkEEYgRDKRhSgRiBUY/QkApECqyPhIUkSoGRgsnj0HUDzDCM128uHTiOA/uvV70bRBKEp7+RRRJBSgJRD354Yyl7e1Uv3vn7NXzPBQPwaYAAQRBAKdVDoG7mdyAI5xSuCUrRQBwC/P+PNj8//02tVoNt2/B9H57nodvtwvM8CCHgui5SqVQskUjUbdve6d+8tLQEAFq5XA5WVlYKZ2dnn6+vr8vp6Wk+NTX1cmFh4TlLJpO/WJaFoaEhSCnBOY+IOOfgnCOdTiORSDyzbfvLfoJyuQxcC9FsNr9utVqrnueh3W6j1Wr9trW19RWbnJxELBZDPp/vWe/a277vRxgZGUEqlcLe3t6dMqytra3t7u5+v7GxAcdxsL29Dc/zPhsfHz9i+Xz+qRACuq5DKRW5IySSUqJYLPJ0Ov3qPp3r9fonjuMgHo8jFovBNE0IIfjR0dEoq1arODw8RKPRABFF+ocQQiCVSiEej9+byEaj8asQ4m0ulwPn/AvG2C6Al81mM8Ysy9pMJpOwLAtEBNM0I3DOYZomMpkMksnkMwC3cjA7OwsAWqVSWQWwOjMzM3R1ddXUdX21Wq3+DACMMQZN0wa93lcXhmGAc37fBSK3CyGSjDENQBTMiOip53lwXRdKKXS73Vsyua4L13W5aZoDOahUKreZgkAL7R8RTExMQNM0FAqFyD39CZZSIp/PI5VKYWdn5z8XGmu325uXl5e4uLgYsKfv++h2uyAidDqdgRx8EMHJyQmOj49xenp6y0VCiGjMZDKwLOtRrYIJIb4NW0JIIIS4BcZYTClVfxTB8vLy+vuCzs/PAQBPnjzRAAS1Wu3DCRYXF/P7+/uwbRtEFDW78PSu6yKbzeqWZbm1Wq390M+CYLA/M03T/tQ0Df+Gruv9Y1bX9R8BfPcQgVJqkKBYLOY7nQ4Mw4hcFNZCiGubfnxwcPCgHGNjYzqABICor7BMJrOey+XQ7XajGghJwjoYHR0dGh4e3nyf3tls9h2AnwC8eJTlSqWSViqV7vw2Nzen3bX+BxxQD5I249kcAAAAAElFTkSuQmCC", $t = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5godFRgEe5H4BwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAARuSURBVEjHtVRNaFRXFP7u+08mkxknYyxGU6QLEQwuko2LFkRw0UXAhWipWJql4LIEdCtuulfpYlZCbBdt0YKWLixIS2mLhVStEtJGOpSYZGbMOPPm3fvuOaeLyRsnpkY3PXC479537v3e+b77PYW+qFQqO0XkwdLS0s7V1dXrV69e/QCviNnZ2VPMPBfHMdI07aW1FlprRFGEYrEIr39To9EAM6NaraJarWK7ePjwIZgZnU4HWmsYY6C17qWIwPf9zQDtdhvMjHq9jpWVlW0BBgcHPWaG4zjwfR/GGPi+jzAMobUGM8N13c0ASikopeC6LlzX3RZgamqqxcytJEliIhJrLay1YGakaQrP85DL5TYDZCEieF2cOXPmJjPvSpJEAMBxHGQjEaFYLKJQKGwGEJHe4UqpbQFOnjw5yczntNZGay1aayRJ0tMiTVMQ0X938CZdDA8PH2Tm00mSIAgChGGIMAxhjIExBkQEpdRWgOzLX9dBoVCoE1HL87w4CAIxxiCKoh6AUgqe520V+U34B4BWq3WTiHbFcSwZNZkHjDFg5q0d9GvwOqCxsbFJZj4Xx7FJ01TSNIUxpmc413URRRG8SqWiZmZmBAAmJyfje/fuyQY9tv/A8+fPq0uXLvVQa7XaQWY+nTm5X1xjDESkS9HMzIxcu3ZteHV1VW7cuLGnVCo5Gy3mLly4MCgiOcdxmhcvXtT9gNVqtZ75oP8WZRRllHkb3H+aJMnHy8vL6/fv3y9Vq1UMDAy8v7i4uDQ+Pp6Loug0gK/6Ae7evXsTwC4A23LpAcDIyMg79Xrdb7Va5cePH6PRaMjQ0FBYLBZ3TkxMoFQqlV7eeOXKlUlmPpckibHWirUWRARmBhEhiqIXRisUCl/k8/nd+/fvP7CwsIC1tTVEUYTR0VHkcrnb5XJ5/mWAR48eHch80P83zdJxnK7It27dUocPH/7szp07T8Iw/LpWq0VBEKjx8XEcPXr0geM4x0+cOJFcvnxZnT17tkfH/Py8IaIe7y+ntbYrdMbhkSNHvp2bm5s6duzYrxMTE1Gz2by9b9++49PT00l2i/s7OHTokEtEaLfbm66ntRbGGARBgHw+jy12/eGn395d+uvPsmV//qMPpxdfJd4vv9eGvvum8l6z2bRaa7E2RWpT2NTCaI1CcRh794xBzc5+cmq9sQLdWVeA5fra02dkyfrh4IDnh3lrSawlWCIQEawlMLPTieOk8az+HHBAxCBLIOJunQD1RhPWAh4gc4HHCAYsIp+xI1fubiABMYPIhSUFYgdEbnedGFQI8NboMIjlxRoxLAmYBStrz/Dk72V4Qga7d3Tw9kgbe8sEKx5EXAg8MAIwPIg4EHgQuOCNFHHB4kFUVtsdRVyI8vDjz3/g8y+/h+e6PpqdAEtPA6y3GcQKxAAxg0VAbMGswALwxjsWgFiBGWBRvWeS7ihwsLD4D7RO4SnHu95KPDSbAWpNhqUX2d86sYCJkWbz3vpGrZXenBlYq69DmxT/e/wL/opRMma51lkAAAAASUVORK5CYII=", ot = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAYCAYAAAARfGZ1AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5godFR8VXmBOMgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAItSURBVEjH7ZS9SitBFMd/M9nZddeYysYnCKQQsbTwMRQEbS1TpEsl+BIWwcLGMpXahBSCrVpY+ggJWiyus9mZc4uwMblJ7kW44TYeGM58nPnPf84XrFDUw8PDeKIUSqmvg6n1Iv03252dHfQqmf+Afw9caz0TtLlMUAqt9ffAtdZEUUSlUiEMw6XAYRiitZ7oP4KXF2q1Gi8vL7TbbVnGLggC4jim2WzKzc2NGGMwxsz9VJfG1WoVgG63K5eXl/L+/g6AMYYwDGeGMYYgCNjY2KDT6XB6eiqvr6+EYUilUvkikSQJxhienp7o9/tirSVJEoIg4P7+Hu89IjLRIjIhk6Yp1WqV4XBIs9mUvb09Wq2WSpJk7I1er8fd3Z0Mh0OcczjnKIqCoijw3lMUxWRvWk/blXtZlqG15uTkhLOzM6XLL/4LERG01qyvr4+ZPz4+EkURz8/P9Ho9sdby9vaGtZbj42MlIgAz7jHGUKvVuLi4kMFggLWWNE3Z39+n1WqptbU1Go0GQZZljEYjtre3qdfr6vb2Vvr9PlmWsbu7i/d+rimVPr+6uiJNUzY3Nzk/P1eNRgPnHHmej+0AiqIgTVOiKOLg4EBtbW1xfX0t5VnJfjrVnHMMBgMODw85OjpSIjIBXdpyy8Kw1hLHMdbameKZLrSPjw/iOMY5N0dgYcv13vP5+YnWmjzPJ5d+D1ye5xhjyPMc7/3CAC9Nk2lfL8uMRQ//9PP/C75S+QX3zx/c9r2O6AAAAABJRU5ErkJggg==", nt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAXCAYAAAARIY8tAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5godFR8FQ9deVgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAJgSURBVEjHtZW9TutAEIW/2V175QSQIvESUIUiEhQ0gISAJ0C8AM/AA1AlbwANBQUtDRIFEgWiTIEoqCkoKAIyRrZ37Vs5yr0Xx7k/jORmd2fPnOOZs/DNIQDD4bDxYBiGXFxclO12m729PcmyrDGn2+1iZqlCa02SJJydnaGUYnNzkyAI8N435iqAsixrvwpgMBiURVGQ5zmDwaDUWjNLrmqqwBjD09MTd3d3RFFEq9Xi9vaWx8dHjDH/xkBEEBH6/X7ZarXQWqO1Zm5ujn6/X1b7jQzqDmituby8LF9eXrDWYozBGIO1ltfXV87Pz0ut9d9JpJSiKAqurq5YWlqi0+mMARYXF1leXubm5obPz0+Uqle6VsSKwenpqRhjuL6+5uTkpAQ4PDyUXq+H954kSZjWsqa67CuANE3x3hMEAXEcU3XO+/s7cRzjnMM592V+I0C1XlXnnBsD5HmOc45Zhs3MPPIi47acpvkfMZhkIiJjBpOt+d8YKKW+h0F12SSDSVZNTMw0zcMwRER+YyAiKKUIwxCALMsoiqLeru/v77+sXGvN0dFRORqNmJ+fZ2FhAYDRaMTHxwftdpvj42OphvLXWF1drbcK7z0iwsHBgURRRBiGP1lFFEXs7++LtRbvfa1VTP3JeZ7T6/V4fn7m4eFhvN7pdFhbW2N9fZ23t7dmN62LoihIkoTt7W2x1o7d1FrL7u6uJElSq/3MD06WZYRhyMbGhlQAW1tbYq0lTdPGB6exTcuyJEkSVlZWGA6HGGPodrvEcdxY/cyD5pwjz3N2dnYkCALSNMU5N9Og/QC/FsDpo71BjQAAAABJRU5ErkJggg==", te = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gsEBhoGqbjXJQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAH3SURBVDjLhZGxSxthGMZ/392l+b6E4IUQjENRQulWKXUwcwJZ8idk0D2IiIMdm03o0MnJ1aXQRSHF+AcEkiWEQFECwSXoZsPlcrnz9OsQsbWk12d83/f78T3PIzzPYzab0Ww2db/fx3EcTk4+cX+/hGEYSKm5vPSFlCyUcByHo6MjnclkKBaLIp1Os7xs662t72xufmB3d4Xr65lIpRYDrFarpaWUVKtVIYQAwDAEGxtvGY1+IMQKUbK63S7lcvn5MYBSmoODN/j+6/mR9W+AMR6PyWazL4bDoS+urgKxvV1nOPwplIoAJBIJJpPJi6FSYNuaVCrENP1IC0Y+n6ff7+tFS9M0CcMwOoNisShWV20dBFIDJJNwezsTlgUPDw9YUQEAhm3bBIGkVvvK4WGLIADHcQEIw/C/AOF5HkpJ3Wg4DAYD9vffU6t9ZDq9e8pD8WdDAFJK1tbWqFQqQnieRy4n9Xg8X6ZScHMzE6YJe3t7ul6vi1gs9gLgui69Xk+3220smHte9L1YLIZlWai/elRKUSqVRKPR0JEGk8kkruuSSCSeMoFcTmp3HhHx+BeMKEA+n2cwGDxX/PgIQQCnp3fs7HzD9+PRgEKhwPn5OaPR6Nm71pqLiybr6+9+txClTqejz87OmE6nmOYrjo8/4/vzUJeW4BekTMTiOlyMpQAAAABJRU5ErkJggg==", ee = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gsEBhg0U1nkJwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAVmSURBVEjHnZZ/bFRVFsc/97038yZt2pIR2rHVgtVIoUVaqltogc1KChi2SxWTyg9rXAm7sBQ3m2DxH3c1cesvdpc/tkYbzXajgQ2GhWUJidUWSBzETdu1nU7XKUVDS7E/7I+0M/Nm5r53/WOKtEo36klO3nv3JeeTe+73nHtEMBjkVqZpGpcuXVKBQICamhqh6zo/xrRvLwghMAyD48ePq6amJoaGhqmrq1MTExP8GMgcgK7rSCk5cuSICnR3c/jwYepf/D3lZaXs27dfdXR0YJrmDwKIGylyuVwMDg7S0NCgMjMz+dWePRQUZIOIM3RtlFOn3+eNxmNs21YlduzYgWVZGIaBUgop5bwAQwiBaZp0dnZy9OhRtXJlEVu3bmH58myQY+BYZPk0dlY/iNtl8+bbJ9XV/gEO1O4X3d0BPB4PubmL599BT08PFy5cUH6/n5VFxWx/rAqfLwXiQ6ASMx4DXYBy8c6xVt491sySJfeK6emwysvLFdu370IpdeszaG9vx+/3U1r6E37z6134fDrE+sEJgzMNahpUBBJjYF9nV80afrv357S0fKjuK1xMW1uHsm17/kMOBALK4/Gwd+8+3K5RsAaSwVVkxmdATgTkJIT7uOP2VLZWbuB3Tz9BaoqLoaGh+QH5+flifHwc5VgQH0kGUhFwpoBw0o0oGBEwokx+NUrj31t48okqdEPnF5XraG9vU/MCCgsLCQQCTE6MAzaoaezEFIHgVXp7B7jcO8iVUD9XQgNc6R3gHye78N2+hGUFS8GZYn15IRcv+tF1HU3TEELMVVFKSgq5ubm0trbw8Ja7wQkzPTXNC6+eR9MN0lJTuDY4hOPYaMJB1zVOn/oDJEZBRbkjexFdXZ2MjIxgejyYbjcul+smQClFSUkJ7zefZ+uW+9BUhIw0ya5Hcgl+7uHQoToQCoiDkwAVB3sS7HFQMYTupmLD/ex+qkatKVtPWVm5KC4uxjRNhBDJQguFQhw8eFCFus9C5Aw4cWxp8dwrn/LTDVVsrPgZyC+TEBUHxwIVTb6LFKRKIWaF+W9XH3975wNOnPyI8rLVrFv/oBDBYBDbttm8ebNqPvMmy5ZcBXkdiDMyGmHPM1281fga3gVmcl3FZjw+80yASAA60nETi5tEohYPrK/D681O9iLDMFi1ahVnmz8GYyHoOugmi7IyOLj3HnbveRbbUSD0GelGZ8l4GuwJcCIY6QuYnApTVf0yFRsrqX/pZWEAKKVYu3Yt/z5zml/uLEWou0FJhJIszfeB6qGv73PuzUufCT57F3HQMyH9Nuqff4//dFyjattusXp1KT6f72azGx4epubxx1XRyjySQnNAObhNg87AF/jPN+FNHQV7GJjJv5LJFLlX8FRtI25PDkXFa0R5+RpM00RKiXFDTpmZmeyvrWVsfBK4qeXQZyHy7lJ4vR6IfgmaBu6FEBuHxGCy4yt4u6mZU6f+JVasKCQej33TYY3ZRVFdXS1mF4qmadTX/1FVPrQONAkZ2RCV/K9nlPzlOSDiEB8FEui6RkHBMiwrOrfQZn+Ew+E5P2OxGK0tH/Dai9V80ddPW3svCSm5fOUrcj5x8WhlEWnpAlQCx3GwLAtN0+YHfNs6Ozu5fn2Q1nNtBD7r58Q//eTk3ElJyQP8tfE9EnGbTRvuYfFdCsMwkFLidru/P6C7u5vUtAW8euQ0FRs3i4aG1/F6b8O2JZs2VVB36JAKhgY5sPt+TPPWADHfVAEwNjaGrutkZWUhpcS27W8ulhvDwZ/+/BfV3naOrq7LtLScF+np6f9/qphtXq+XjIwMLMtCSjnn1lJKkUgkePpAraip2SdSU9O+k3+ArwHn+YKuY70hbgAAAABJRU5ErkJggg==", ie = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKzSURBVEiJtZTbbtpAEIa/9XqdcAEXEQoHoQhkBVXKde7yEH2Kvg9v0su+CFKFAnYSSDlUqQISyBh7etOlNnbP6kgje9fjmf//Z2eViPA/zc0ulFJngPePOfciEh1XIoKIMBwO322321kcx/Ivvt1uZ8Ph8J3Nq0QEpVRls9mMtdatNE2zjH4LclZmx3FIkuRTtVr1RWRnJTrzPK+13++PSZ+fn5nNZtRqNdbrNa1Wi06nA0Acx4xGIxaLBXd3d3jed1WTJMHzvBZwBuwcC9ZSsj4ej7m5uaHf72OMYTweH5EaY/B9P4f89H9AAeQKWPRKKaIowvM8FosFzWaTJElIkqSQ8FROpVRpAecUgfX5fM7l5WXpt5+5zW17oE4RiQgvLy/UarWCBD+Q5PRZlCgbYIwhDEPa7Ta2+Y7j/Ap1oQc5BlnzfZ+Hhwcmkwnr9Rrf91FKsdvtCMOQw+GAiDAajdBa0+12qVQqBQa2uc31ev0pSZLc2f+bORARtNbUarWWiMwtAydN08Kp+JN7KivRt2H9cZOVUhwOB+7v71kul9ze3nJ+fn5MtlqtmE6nVKtVNpsN7XabRqPx6znImtaaXq9XyiIMQ/r9Pr7vo7UmCIIyNvkCVqLf8f1+j+u6LJdLGo0GURTlvn+T6O8LWF+tVlxcXBT2swWOTS6Touyc2/3X11eq1WppXHaSjwxKNCy8W3Ndl+l0SrPZJI5jjDFlceWDJiJEUcTT0xNWtslkgtaaTqdDpVLh6uqKx8dHgiBgs9nQ7XbLroxcgTQIgs+9Xq8O4Hkevu8DcH19nYOVpin1ep16vV7YtxYEwWfg+zAA88Fg8CEMwy+O46C1xnVdXNfFGIMxBs/zcm73bZzWGsdxCMPwy2Aw+ADMc9IopW6At8CbTOE/tRT4CLwXkWGuwP+yr0z0vLd4EzkyAAAAAElFTkSuQmCC", se = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAIPSURBVDjLtZLLTxNRFMa/O52ZPsYqtCQgI6WhQCRBCwm+GqguTBOJIXHpxoV7+QOIJYgSEg0mdmliAltNSGShCza2IiEQqcuKGmamWF4akxbL9HlctKClBbvQb3Vzc37nfOcB/G+xgx/EgQEglq8CIANEWGABkEQSaZY7shiJJLvGhRAUKEKodZxkEo8MH/UKQai2oGfKM2ULQhWCo95yhO07bzBNks3/6m4UOwCOPWi630/xrds10YrGyNzhx/LYMHWF3VCghN3UNebHcts9MpdGcsX8ktoqR4YWkLCLUKHaRSSGFuWI1g4rcX8CfNGYOWVtWcE3bhp5bAPNT8HNDrZosU6YSifJ7z9SG7sArQPIArQJ1OQ2daN+0HwBIOgnVa0Z7MPrjHDOAyy9EbMdedVRr0EHlfXA8ti5pqbsFy67ZxwhpJF2hM6+7LuYsp//hETpzvcspZ4szDuXfL2ZuTmaB5Dpvb7ow1b310NPg4wfbwz0rHSLP2s14IcjLUFD1rn69vmpNaZXAAA6kbkacD2TlXqgff1WzKdPShM9vDDxcPD9b6T0+Hi0wYVaANtQ8D13ptMbaeTrHj+6E2Zl89qDODKQobAsMq3ddPoR4F8ELpGxQoUK+PGNgb6mz3V84+zIlS8sWxzr4WLxhpl30dMxbjUpVVUBAMi625+3SNOIM/p7dAERyURVpP43+gWF+ca8/eA5yQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMH81V5MAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDAOaO8vAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==", oe = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAH1SURBVDjLtZLNaxNRFMXPm7yZfBGtMWhM/AjEig12UailsRhciJ9Q7MKFmy6617/AAa2VglLBbAShEBdFUFAQBMFVKhZRW3faiNJkWpNSESS16SRtclzEJqaJMQt9y/vO797DPRf4309sLlCBAEBRagGgBRoccADIIYeCKDYdRo3+4Kg6iSSS6uT+UfqpNZUPR9Q4Uu54X6wv5o4jpcaHI/WIqDj32mJ0X36qv8ciAO+10MhZZpeG2uYbGqO9Q8fMdZ0hSgoKSoZGdMy0X6W9kVyhx3HPN8FeykpNstc3Yb3PHVR+18pfxux5VzCBWZGoen0WDhqZTthqN1npKPMZE8SH6leR6VWrudlNGSDMXSljH1y8i43AFFgHAl4DJlgHiBJ/nE7d6eg5/3ocKygBUOA8PFTY3vMGy7WZb1jK3341FXh78sja1GMsA3CFz02fwlLXlz+eBq2Jgf7uj13aSpsBfN9bcMLAemDuxYPdC8JsAADcunY8Ghz3J3cCBzKD6RNmzDnWLdWxG5emq0jt8Um0I4htAL4iiW/FzkORWZ/03Lp58Z2o21c1RAst5bBoW7gQ0BGVD6NhWhtMaIBvWew/uueTR/qeXzn2WawDSnNAZL1PXs4fTCtzOWdLEwCArtUzJYfzEbKCf1eXEY02ttD637yfWKq5q2bQBKcAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDB/NVeTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwDmjvLwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=", ne = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAIBSURBVDjLtZLLaxNRFMa/O5lXZhi1aag1sRocUxSsUKjFhhpciI8uCoIupODCvf4FxketFJQKZq3QLIqg4ELQjZtO1eLC1o2L1gdNZmoqFSmkNZ1ckxwXCW3TjDULPZsDl+93z8f5DvC/i21+IAEMALFyAwD5IEODBiCPPDgrbTmMZAqbw9IE0khLE/uHKUzylvLBuGQhE7BiqVgqYCEjWYPxeoStOW9VRymQeHHVwQoY9KG2W32UW7y0w/E0Rv6DCUzfvka9HdfhwKF2OjyUwHT0Jvm95AIFtVRojHooig8YxzjtI4WOhsaUR9RCwkatUDXmLximjVks8wfg4ADKmDFtbkCt3eQaLRYWXJSwJD2vAgBlVxV3s5sKQHB3Zey9MACUqoAAw4m02HBBdQArY+VMhjd3n4cGERwcIrQj53hz9ycs12YuVnvh/tvJyLtTvcXXFk0CUGMDU6ex2Pn1j6dByuzZ/q6PnfLPJhtY2sN12ChG5l493j3PXA8AoO2/TiTNh+H0TqB94WL2pDuqj3SJ0sidK1PrSO3xiYjCRBOA70jjR6njUHwmJAbv3b38ntXtaz1EH/kqYZE6fyGSQFJ8kuwhxWOCB77tW/+xts9BMfTyxvEvrLghOO9iudZnb5wDWWEurzc0AQDIWO0ra/pT5Bj9XV1BZFKpga//Tf0Gp9/DBQB2y1wAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDB/NVeTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwDmjvLwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=";
function $(t) {
  this.point = t, this.contextMenu = null, this.updateContextMenu = () => {
    this.contextMenu && (this.contextMenu.destroy(), this.contextMenu = null), this.initMenu(), this.point.contextMenu = this.contextMenu;
  }, this.initMenu = () => {
    this.point.element && (this.contextMenu = Y.create([
      {
        id: "i" + this.point.guid + "_drag_horizontal",
        title: this.point.dragHorizontal ? "Disable move horizontally" : "Enable move horizontally",
        image: ot
      },
      {
        id: "i" + this.point.guid + "_drag_vertical",
        title: this.point.dragVertical ? "Disable move vertically" : "Enable move vertically",
        image: nt
      }
    ], this.point.element), this.point.options.canDelete && this.contextMenu.addItem("i" + this.point.guid + "_delete", "Delete point", st), this._setEventListeners());
  }, this._setEventListeners = () => {
    this.contextMenu.on("click", (e) => {
      switch (e.itemId) {
        case "i" + t.guid + "_delete":
          r.emit(g.POINT_DELETE_REQUEST, this.point);
          break;
        case "i" + t.guid + "_drag_horizontal":
          this.onDragHorizontalClick(e);
          break;
        case "i" + t.guid + "_drag_vertical":
          this.onDragVerticalClick(e);
          break;
      }
    });
  }, this.onDragHorizontalClick = (e) => {
    this.point.dragHorizontal = !this.point.dragHorizontal, this.point.dragHorizontal && (this.point.dragVertical = !1), this.updatePointDragMode();
  }, this.onDragVerticalClick = (e) => {
    this.point.dragVertical = !this.point.dragVertical, this.point.dragVertical && (this.point.dragHorizontal = !1), this.updatePointDragMode();
  }, this.updatePointDragMode = () => {
    this.contextMenu.items.find((e) => e.id === "i" + this.point.guid + "_drag_horizontal").title = "Enable move horizontally", this.contextMenu.items.find((e) => e.id === "i" + this.point.guid + "_drag_vertical").title = "Enable move vertically", this.point.dragHorizontal ? (this.point.setOptions({ moveDirections: [E.LEFT, E.RIGHT] }), this.contextMenu.items.find((e) => e.id === "i" + this.point.guid + "_drag_horizontal").title = "Disable move horizontally") : this.point.dragVertical ? (this.point.setOptions({ moveDirections: [E.TOP, E.BOTTOM] }), this.contextMenu.items.find((e) => e.id === "i" + this.point.guid + "_drag_vertical").title = "Disable move vertically") : this.point.setOptions(
      { moveDirections: [E.TOP, E.BOTTOM, E.LEFT, E.RIGHT] }
    );
  };
}
function he() {
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
      E.LEFT,
      E.TOP,
      E.RIGHT,
      E.BOTTOM
    ],
    visible: !0,
    hidden: !1,
    forceDisplay: !1,
    createDOMElement: !1
  }, this.x = 0, this.y = 0, this.element = null, this.guid = z(), this.subscriptions = {}, this.dragHorizontal = !1, this.dragVertical = !1, this.init = (t, e, i = null) => (this.x = parseInt(t), this.y = parseInt(e), this.setOptions(b({}, i)), this.setEventListeners(), r.emit(g.POINT_ADDED, this), this), this.setOptions = (t) => {
    if (t && typeof t == "object" && (S(t.moveDirections) && typeof t.moveDirections == "object" && (this.options.moveDirections = []), this.options = b(this.options, t)), Object.assign(this, new $(this)), !this.element)
      (this.options.createDOMElement && this.options.canDrag || this.options.forceDisplay) && (this.element = this.createPointUI(), this.setDOMEventListeners(), this.updateContextMenu(), r.emit(g.POINT_ADDED, this));
    else if ((!this.options.createDOMElement || !this.options.canDrag) && !this.options.forceDisplay)
      try {
        this.element.parentNode.removeChild(this.element), this.element = null;
      } catch {
      }
    this.options.id && this.element && (this.element.id = this.options.id);
  }, this.createPointUI = () => {
    const t = document.createElement("div");
    return this.options.canDrag ? this.setPointStyles(t) : t;
  }, this.setPointStyles = (t = null) => {
    if (this.element || (this.element = document.createElement("div"), this.setDOMEventListeners(), Object.assign(this, new $(this))), t == null && (t = this.element), this.options.id && (this.element.id = this.options.id, t.id = this.options.id), t.className = this.options.classes, t.style = this.options.style, typeof this.options.style == "object")
      for (let e in this.options.style)
        t.style[Ot(e)] = this.options.style[e];
    return t.style.width = this.options.width + "px", t.style.height = this.options.height + "px", t.style.left = this.x - parseInt(this.options.width / 2) + "px", t.style.top = this.y - parseInt(this.options.height / 2) + "px", t.style.zIndex = this.options.zIndex, !this.options.canDrag || !this.options.visible || this.options.hidden ? t.style.display = "none" : t.style.display = "", t.style.position = "absolute", t;
  }, this.redraw = () => {
    (this.options.canDrag && this.options.createDOMElement || this.options.forceDisplay) && (this.element = this.setPointStyles());
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.rotateBy = (t, e, i) => {
    const [s, o] = R(t, this.x, this.y, e, i);
    this.x = s, this.y = o;
  }, this.setEventListeners = () => {
    r.subscribe(F.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange);
  }, this.setDOMEventListeners = () => {
    !this.element || (this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown), this.element.addEventListener("mouseover", this.mouseover), this.element.addEventListener("mouseout", this.mouseout), this.element.addEventListener("click", this.click), this.element.addEventListener("dblclick", this.doubleclick), this.element.addEventListener("mousemove", this.mousemove));
  }, this.mousedown = (t) => {
    r.emit(g.POINT_MOUSE_DOWN, this, u(t)), t.buttons === 1 && this.options.canDrag && (r.emit(g.POINT_DRAG_START, this, u(t)), it(t));
  }, this.mousemove = (t) => {
    if (r.emit(g.POINT_MOUSE_MOVE, this, u(t)), t.buttons !== 1 || !this.options.canDrag || !c.draggedShape || c.draggedShape.draggedPoint !== this)
      return;
    const e = this.x, i = this.y, s = U(this.element.parentNode, !0);
    if (!this.checkFitBounds(this.x + t.movementX, this.y + t.movementY)) {
      r.emit(g.POINT_DRAG_MOVE, this, u(t, { oldX: e, oldY: i }));
      return;
    }
    let o = t.clientX + window.scrollX - s.left - this.options.width / 2, n = t.clientY + window.scrollY - s.top - this.options.height / 2;
    [o, n] = this.applyMoveRestrictions(o, n, e, i), this.x = o, this.y = n, this.element.style.left = this.x + "px", this.element.style.top = this.y + "px", r.emit(g.POINT_DRAG_MOVE, this, u(t, { oldX: e, oldY: i }));
  }, this.mouseover = (t) => {
    r.emit(g.POINT_MOUSE_OVER, this, u(t));
  }, this.mouseout = (t) => {
    r.emit(g.POINT_MOUSE_OUT, this, u(t));
  }, this.click = (t) => {
    r.emit(g.POINT_MOUSE_CLICK, this, u(t));
  }, this.doubleclick = (t) => {
    r.emit(g.POINT_MOUSE_DOUBLE_CLICK, this, u(t));
  }, this.checkFitBounds = (t, e) => !(this.options.bounds.left !== -1 && t < this.options.bounds.left || this.options.bounds.right !== -1 && t > this.options.bounds.right || this.options.bounds.top !== -1 && e < this.options.bounds.top || this.options.bounds.bottom !== -1 && e > this.options.bounds.bottom), this.applyMoveRestrictions = (t, e, i, s) => (e > s && this.options.moveDirections.indexOf(E.BOTTOM) === -1 && (e = s), e < s && this.options.moveDirections.indexOf(E.TOP) === -1 && (e = s), t > i && this.options.moveDirections.indexOf(E.RIGHT) === -1 && (t = i), t < i && this.options.moveDirections.indexOf(E.LEFT) === -1 && (t = i), t > this.options.bounds.right && this.options.bounds.right !== -1 && (t = this.options.bounds.right), e > this.options.bounds.bottom && this.options.bounds.bottom !== -1 && (e = this.options.bounds.bottom), t < this.options.bounds.left && this.options.bounds.left !== -1 && (t = this.options.bounds.left), e < this.options.bounds.top && this.options.bounds.top !== -1 && (e = this.options.bounds.top), [t, e]), this.mouseup = (t) => {
    r.emit(g.POINT_MOUSE_UP, this, u(t)), t.button !== 2 && r.emit(g.POINT_DRAG_END, this, u(t));
  }, this.onBoundsChange = (t) => {
    t.points.find((e) => e === this) && (this.options.bounds = t.bounds);
  }, this.toJSON = () => JSON.stringify(this.getJSON()), this.getJSON = () => ({
    x: this.x,
    y: this.y,
    options: b({}, this.options)
  }), this.fromJSON = (t) => {
    let e = t;
    if (typeof e == "string" && (e = W(t)), !e)
      return null;
    this.x = e.x, this.y = e.y;
    let i = !1;
    return this.element || (i = !0, this.element = document.createElement("div")), this.setOptions(e.options), i && r.emit(g.POINT_ADDED, this), this;
  }, this.destroy = () => {
    this.element && (this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), this.element.removeEventListener("mouseover", this.mouseover), this.element.removeEventListener("mouseout", this.mouseout), this.element.removeEventListener("click", this.click), this.element.removeEventListener("dblclick", this.doubleclick), this.element.removeEventListener("mousemove", this.mousemove)), r.unsubscribe(F.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange), r.emit(g.POINT_DESTROYED, this);
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((i) => r.unsubscribe(t, i)), this.subscriptions[t] = [];
  }, this.addEventListener = (t, e) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const i = r.subscribe(t, (s) => {
      s.target && s.target.guid === this.guid && e(s);
    });
    return this.subscriptions[t].push(i), i;
  }, this.removeEventListener = (t, e) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(e), 1), r.unsubscribe(t, e);
  }, this.distance = (t) => O(this.x, this.y, t.x, t.y), this;
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
}, E = {
  TOP: 0,
  LEFT: 1,
  RIGHT: 2,
  BOTTOM: 3
};
function re(t) {
  this.rotateBox = t, this.subscriptions = {
    rotate: []
  }, this.initialAngle = 0, this.previousAngle = 0, this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    this.interceptEventsFromShape(), this.rotateBox.shape.points.forEach((e) => {
      e.mousemove = this.mousemove, e.mouseDownListener = e.addEventListener(g.POINT_DRAG_START, (i) => {
        this.onPointMouseDown(i), r.emit(l.POINT_DRAG_START, this.rotateBox, { point: e });
      }), e.mouseUpListener = e.addEventListener(g.POINT_DRAG_END, (i) => {
        this.onPointMouseUp(i), r.emit(l.POINT_DRAG_END, this.rotateBox, { point: e });
      });
    });
  }, this.interceptEventsFromShape = () => {
    l.getShapeMouseEvents().forEach((e) => {
      this.shapeEventListeners[e.name] = this.rotateBox.shape.addEventListener(e.name, (i) => {
        e.key === "SHAPE_MOVE_END" && (this.previousAngle = 0), r.emit(e.name, this.rotateBox, i);
      });
    });
  }, this.mousemove = (e) => {
    if (e.buttons !== 1) {
      r.emit(
        l.SHAPE_MOUSE_MOVE,
        this.rotateBox.shape,
        u(e, { clientX: e.clientX, clientY: e.clientY })
      );
      return;
    }
    const [i, s] = Q(e, this.rotateBox.shape.root), [o, n] = this.rotateBox.shape.getCenter();
    let h = this.calcAngle(i, s, o, n);
    if (h === null)
      return;
    let a = h;
    this.previousAngle && (a -= this.previousAngle), this.previousAngle = h, r.emit(L.ROTATE_BOX_ROTATE, this.rotateBox, { angle: a });
  }, this.calcAngle = (e, i, s, o) => {
    const n = this.calcHypotenuse(e, i, s, o);
    if (n <= 0)
      return null;
    const h = this.calcCathetus(e, i, s, o), a = this.calcStartAngle(e, i, s, o);
    return Math.round(At(Math.asin(h / n)) + a + this.initialAngle);
  }, this.calcHypotenuse = (e, i, s, o) => O(e, i, s, o), this.calcCathetus = (e, i, s, o) => {
    if (e <= s && i <= o)
      return O(e, i, e, o);
    if (e >= s && i <= o)
      return O(e, i, s, i);
    if (e >= s && i >= o)
      return O(e, i, e, o);
    if (e <= s && i >= o)
      return O(e, i, s, i);
  }, this.calcStartAngle = (e, i, s, o) => {
    if (e <= s && i <= o)
      return 0;
    if (e >= s && i <= o)
      return 90;
    if (e >= s && i >= o)
      return 180;
    if (e <= s && i >= o)
      return 270;
  }, this.onPointMouseDown = (e) => {
    switch (e.target) {
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
  }, this.onPointMouseUp = (e) => {
    this.rotateBox.shape.points.forEach((i) => {
      i.setOptions({ visible: !0 }), i.redraw();
    });
  }, this.addEventListener = (e, i) => {
    typeof this.subscriptions[e] > "u" && (this.subscriptions[e] = []);
    const s = r.subscribe(e, (o) => {
      o.target && o.target.shape && o.target.shape.guid === this.rotateBox.shape.guid && i(o);
    });
    return this.subscriptions[e].push(s), s;
  }, this.removeEventListener = (e, i) => {
    this.subscriptions[e] && typeof this.subscriptions[e] < "u" && this.subscriptions[e].splice(this.subscriptions[e].indexOf(i), 1), r.unsubscribe(e, i);
  }, this.destroy = () => {
    for (let e in this.subscriptions)
      this.subscriptions[e].forEach((s) => r.unsubscribe(e, s)), this.subscriptions[e] = [];
    Object.keys(this.shapeEventListeners).forEach(
      (e) => {
        this.rotateBox.removeEventListener(e, this.shapeEventListeners[e]);
      }
    ), this.rotateBox.shape.points.forEach((e) => {
      e.removeEventListener(g.POINT_DRAG_START, e.mouseDownListener), e.removeEventListener(g.POINT_DRAG_END, e.mouseUpListener);
    });
  };
}
const L = {
  ROTATE_BOX_ROTATE: "rotate"
};
function ae(t) {
  this.resizeBox = t, this.subscriptions = {
    resize: []
  }, this.guid = z(), this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    r.subscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), r.subscribe(g.POINT_DRAG_END, this.onPointDragMove), l.getShapeMouseEvents().forEach((e) => {
      this.shapeEventListeners[e.name] = this.resizeBox.shape.addEventListener(e.name, (i) => {
        r.emit(e.name, this.resizeBox, i);
      });
    });
  }, this.onPointDragMove = (e) => {
    if (!this.resizeBox.shape.isShapePoint(e.target))
      return;
    switch (e.target) {
      case this.resizeBox.left_top:
        this.onLeftTopDragMove(e);
        break;
      case this.resizeBox.center_top:
        this.onCenterTopDragMove(e);
        break;
      case this.resizeBox.right_top:
        this.onRightTopDragMove(e);
        break;
      case this.resizeBox.right_center:
        this.onRightCenterDragMove(e);
        break;
      case this.resizeBox.right_bottom:
        this.onRightBottomDragMove(e);
        break;
      case this.resizeBox.center_bottom:
        this.onCenterBottomDragMove(e);
        break;
      case this.resizeBox.left_bottom:
        this.onLeftBottomDragMove(e);
        break;
      case this.resizeBox.left_center:
        this.onLeftCenterDragMove(e);
        break;
    }
    this.resizeBox.adjustCenters(), this.resizeBox.setPointsMoveBounds();
    const i = this.resizeBox.getPosition();
    this.resizeBox.calcPosition();
    const s = this.resizeBox.getPosition();
    this.resizeBox.redraw(), r.emit(l.POINT_DRAG_END, this.resizeBox, u(e, { point: e.target })), r.emit(I.RESIZE_BOX_RESIZE, this.resizeBox, u(e, { oldPos: i, newPos: s }));
  }, this.onLeftTopDragMove = (e) => {
    this.resizeBox.left_center.x = e.target.x, this.resizeBox.left_bottom.x = e.target.x, this.resizeBox.center_top.y = e.target.y, this.resizeBox.right_top.y = e.target.y;
  }, this.onCenterTopDragMove = (e) => {
    this.resizeBox.left_top.y = e.target.y, this.resizeBox.right_top.y = e.target.y;
  }, this.onRightTopDragMove = (e) => {
    this.resizeBox.left_top.y = e.target.y, this.resizeBox.center_top.y = e.target.y, this.resizeBox.right_center.x = e.target.x, this.resizeBox.right_bottom.x = e.target.x;
  }, this.onRightCenterDragMove = (e) => {
    this.resizeBox.right_top.x = e.target.x, this.resizeBox.right_bottom.x = e.target.x;
  }, this.onRightBottomDragMove = (e) => {
    this.resizeBox.right_top.x = e.target.x, this.resizeBox.right_center.x = e.target.x, this.resizeBox.left_bottom.y = e.target.y, this.resizeBox.center_bottom.y = e.target.y;
  }, this.onCenterBottomDragMove = (e) => {
    this.resizeBox.left_bottom.y = e.target.y, this.resizeBox.right_bottom.y = e.target.y;
  }, this.onLeftBottomDragMove = (e) => {
    this.resizeBox.center_bottom.y = e.target.y, this.resizeBox.right_bottom.y = e.target.y, this.resizeBox.left_center.x = e.target.x, this.resizeBox.left_top.x = e.target.x;
  }, this.onLeftCenterDragMove = (e) => {
    this.resizeBox.left_bottom.x = e.target.x, this.resizeBox.left_top.x = e.target.x;
  }, this.addEventListener = (e, i) => {
    typeof this.subscriptions[e] > "u" && (this.subscriptions[e] = []);
    const s = r.subscribe(e, (o) => {
      o.target && o.target.guid && o.target.guid === this.resizeBox.guid && i(o);
    });
    return this.subscriptions[e].push(s), s;
  }, this.removeEventListener = (e, i) => {
    this.subscriptions[e] && typeof this.subscriptions[e] < "u" && this.subscriptions[e].splice(this.subscriptions[e].indexOf(i), 1), r.unsubscribe(e, i);
  }, this.destroy = () => {
    for (let e in this.subscriptions)
      this.subscriptions[e].forEach((s) => r.unsubscribe(e, s)), this.subscriptions[e] = [];
    Object.keys(this.shapeEventListeners).forEach(
      (e) => {
        this.resizeBox.removeEventListener(e, this.shapeEventListeners[e]);
      }
    ), r.unsubscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), r.unsubscribe(g.POINT_DRAG_END, this.onPointDragMove);
  };
}
const I = {
  RESIZE_BOX_RESIZE: "resize"
};
function le(t) {
  this.shape = t, this.subscriptions = {
    CONTAINER_BOUNDS_CHANGED: []
  }, this.run = () => (this.shape = t, this.setEventListeners(), this), this.setEventListeners = () => {
    r.subscribe(g.POINT_DESTROYED, this.onPointDestroyed), r.subscribe(g.POINT_ADDED, this.onPointAdded), r.subscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), r.subscribe(g.POINT_DELETE_REQUEST, this.onPointDeleteRequest), r.subscribe(l.SHAPE_ADD_CHILD, () => {
      this.shape.redraw();
    });
  }, this.setSvgEventListeners = () => {
    this.svg_mouseover = this.shape.svg.addEventListener("mouseover", (e) => {
      c.mouseover(u(e, { target: this.shape }));
    }), this.svg_mouseout = this.shape.svg.addEventListener("mouseout", (e) => {
      c.mouseout(u(e, { target: this.shape }));
    }), this.svg_mouseenter = this.shape.svg.addEventListener("mouseenter", (e) => {
      c.mouseenter(u(e, { target: this.shape }));
    }), this.svg_mousedown = this.shape.svg.addEventListener("mousedown", (e) => {
      c.mousedown(u(e, { target: this.shape }));
    }), this.svg_click = this.shape.svg.addEventListener("click", (e) => {
      c.click(u(e, { target: this.shape }));
    }), this.svg_dblclick = this.shape.svg.addEventListener("dblclick", (e) => {
      c.doubleclick(u(e, { target: this.shape }));
    }), this.svg_wheel = this.shape.svg.addEventListener("wheel", (e) => {
      this.wheel(e);
    });
  }, this.removeSvgEventListeners = () => {
    this.shape.svg.removeEventListener("mouseover", this.svg_mouseover), this.shape.svg.removeEventListener("mouseout", this.svg_mouseout), this.shape.svg.removeEventListener("mouseenter", this.svg_mouseenter), this.shape.svg.removeEventListener("mousedown", this.svg_mousedown), this.shape.svg.removeEventListener("click", this.svg_click), this.shape.svg.removeEventListener("dblclick", this.svg_dblclick), this.shape.svg.removeEventListener("wheel", this.svg_wheel);
  }, this.addResizeEventListener = () => {
    !this.shape.resizeBox || (this.resizeBoxListener = this.shape.resizeBox.addEventListener(I.RESIZE_BOX_RESIZE, this.onResize), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(l.SHAPE_MOVE_START, this.mousedown), this.resizeMouseMoveEventListener = this.shape.resizeBox.addEventListener(l.SHAPE_MOUSE_MOVE, this.mousemove), this.resizeClickEventListener = this.shape.resizeBox.addEventListener(l.SHAPE_MOUSE_CLICK, this.click), this.resizeDblClickEventListener = this.shape.resizeBox.addEventListener(l.SHAPE_MOUSE_DOUBLE_CLICK, this.svg_dblclick), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(l.SHAPE_MOUSE_DOWN, this.svg_mousedown), this.resizeMouseOverEventListener = this.shape.resizeBox.addEventListener(l.SHAPE_MOUSE_OVER, this.svg_mouseover), this.resizeMouseOutEventListener = this.shape.resizeBox.addEventListener(l.SHAPE_MOUSE_OUT, this.svg_mouseout), this.resizeMouseUpEventListener = this.shape.resizeBox.addEventListener(l.SHAPE_MOUSE_UP, (e) => {
      r.emit(l.SHAPE_MOUSE_UP, this.shape, u(e));
    }), this.resizeBoxContextMenuEventListener = this.shape.resizeBox.shape.svg.addEventListener("contextmenu", (e) => {
      this.shape.contextMenu && this.shape.contextMenu.onEvent(e);
    }), this.resizeBoxWheelEventListener = this.shape.resizeBox.shape.svg.addEventListener("wheel", (e) => {
      this.wheel(e);
    }));
  }, this.addRotateEventListener = () => {
    !this.shape.rotateBox || (this.rotateBoxListener = this.shape.rotateBox.addEventListener(L.ROTATE_BOX_ROTATE, this.onRotate), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(l.SHAPE_MOVE_START, this.mousedown), this.rotateMouseMoveEventListener = this.shape.rotateBox.addEventListener(l.SHAPE_MOUSE_MOVE, this.mousemove), this.rotateClickEventListener = this.shape.rotateBox.addEventListener(l.SHAPE_MOUSE_CLICK, this.click), this.rotateDblClickEventListener = this.shape.rotateBox.addEventListener(l.SHAPE_MOUSE_DOUBLE_CLICK, this.svg_dblclick), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(l.SHAPE_MOUSE_DOWN, this.svg_mousedown), this.rotateMouseUpEventListener = this.shape.rotateBox.addEventListener(l.SHAPE_MOUSE_UP, (e) => {
      r.emit(l.SHAPE_MOUSE_UP, this.shape, u(e));
    }), this.rotateMouseOverEventListener = this.shape.rotateBox.addEventListener(l.SHAPE_MOUSE_OVER, this.svg_mouseover), this.rotateMouseOutEventListener = this.shape.rotateBox.addEventListener(l.SHAPE_MOUSE_OUT, this.svg_mouseout), this.rotatePointDragStartEventListener = this.shape.rotateBox.addEventListener(l.POINT_DRAG_START, (e) => {
      this.shape.initCenter = this.shape.getCenter(this.shape.options.groupChildShapes);
    }), this.rotatePointDragEndEventListener = this.shape.rotateBox.addEventListener(l.POINT_DRAG_END, (e) => {
      this.shape.initCenter = null, this.shape.points.filter((i) => i.options).forEach((i) => {
        !i.options.hidden && i.element && (i.element.style.display = "");
      });
    }), this.rotateBoxContextMenuEventListener = this.shape.rotateBox.shape.svg.addEventListener("contextmenu", (e) => {
      this.shape.contextMenu && this.shape.contextMenu.onEvent(e);
    }), this.rotateBoxWheelEventListener = this.shape.rotateBox.shape.svg.addEventListener("wheel", (e) => {
      this.wheel(e);
    }));
  }, this.onResize = (e) => {
    const i = this.shape.getRootParent(!0);
    if (i) {
      r.emit(
        I.RESIZE_BOX_RESIZE,
        i.resizeBox,
        u(
          e,
          { newPos: e.newPos, oldPos: e.oldPos }
        )
      );
      return;
    }
    if (e.buttons && this.shape.options.simpleMode)
      return;
    const s = e.newPos.left - e.oldPos.left, o = e.newPos.top - e.oldPos.top;
    this.shape.moveBy(s, o, !1);
    const [n, h] = this.shape.getMaxPointSize();
    this.shape.scaleTo(e.newPos.width - n * 2, e.newPos.height - h * 2), this.shape.redraw(), r.emit(I.RESIZE_BOX_RESIZE, this.shape, e);
  }, this.onRotate = (e) => {
    const i = this.shape.getRootParent(!0);
    if (i) {
      r.emit(L.ROTATE_BOX_ROTATE, i.rotateBox, { angle: e.angle });
      return;
    }
    this.shape.rotateBy(e.angle), this.shape.redraw(), r.emit(L.ROTATE_BOX_ROTATE, this.shape, e);
  }, this.mousedown = (e) => {
    it(e), r.emit(l.SHAPE_MOUSE_DOWN, this.shape, u(e)), setTimeout(() => {
      r.emit(
        l.SHAPE_MOVE_START,
        this.shape,
        u(e, { pos: this.shape.getPosition(this.shape.options.groupChildShapes) })
      );
    }, 100);
  }, this.mousemove = (e) => {
    if (this.shape.draggedPoint || r.emit(l.SHAPE_MOUSE_MOVE, this.shape, u(e)), e.buttons !== 1)
      return;
    if (this.shape.draggedPoint) {
      r.emit(l.POINT_DRAG_MOVE, this.shape, { point: this.shape.draggedPoint }), this.shape.draggedPoint.mousemove(e);
      return;
    }
    if (!this.shape.options.canDragShape)
      return;
    const [i, s] = this.calcMovementOffset(e);
    if (i === null || s === null)
      return;
    const o = this.shape.getPosition(this.shape.options.groupChildShapes);
    this.shape.moveBy(i, s, !0, this.shape.options.simpleMode), this.shape.options.simpleMode || this.shape.redraw();
    const n = this.shape.getPosition(this.shape.options.groupChildShapes);
    r.emit(l.SHAPE_MOVE, this.shape, u(e, { oldPos: o, newPos: n }));
  }, this.mouseenter = (e) => {
    r.emit(l.SHAPE_MOUSE_ENTER, this.shape, u(e));
  }, this.mouseover = (e) => {
    c.draggedShape !== this.shape && r.emit(l.SHAPE_MOUSE_OVER, this.shape, u(e));
  }, this.mouseout = (e) => {
    r.emit(l.SHAPE_MOUSE_OUT, this.shape, u(e));
  }, this.click = (e) => {
    r.emit(l.SHAPE_MOUSE_CLICK, this.shape, u(e));
  }, this.doubleclick = (e) => {
    r.emit(l.SHAPE_MOUSE_DOUBLE_CLICK, this.shape, u(e));
  }, this.wheel = (e) => {
    this.shape.options.zoomable && this.shape.options.id.search("_resizebox") === -1 && this.shape.options.id.search("_rotatebox") === -1 && (e.deltaY < 0 ? this.shape.zoomBy(1 + this.shape.options.zoomStep) : this.shape.zoomBy(1 - this.shape.options.zoomStep), this.shape.redraw());
  }, this.calcMovementOffset = (e) => {
    this.shape.calcPosition();
    const i = this.shape.getPosition(this.shape.options.groupChildShapes);
    let s = e.movementX, o = e.movementY, n = e.clientX + window.scrollX, h = e.clientY + window.scrollY;
    const a = i.left + s, p = i.top + o, d = U(this.shape.root, !0), f = this.shape.getBounds();
    return (a < f.left || a + i.width > f.right) && (s = 0), (p < f.top || p + i.height > f.bottom) && (o = 0), n < a + d.left && (s = n - (a + d.left)), h < p + d.top && (o = h - (p + d.top)), n > a + i.width + d.left && (s = n - (i.width + d.left + i.left)), h > p + i.height + d.right && (o = h - (i.height + d.top + i.top)), [s, o];
  }, this.onPointAdded = (e) => {
    if (!!this.shape.isShapePoint(e.target)) {
      if (e.target.element)
        try {
          this.shape.root.appendChild(e.target.element);
        } catch {
        }
      r.emit(l.POINT_ADDED, this.shape, { point: e.target });
    }
  }, this.onPointDragMove = (e) => {
    this.shape.isShapePoint(e.target) && (this.shape.updatePosition(e.target.x, e.target.y), this.shape.redraw());
  }, this.onPointDestroyed = (e) => {
    if (!!this.shape.isShapePoint(e.target)) {
      this.shape.points.splice(this.shape.points.indexOf(e.target), 1);
      try {
        this.shape.root.removeChild(e.target.element), this.shape.redraw();
      } catch {
      }
      r.emit(l.POINT_DESTROYED, this.shape, { point: e.target });
    }
  }, this.onPointDeleteRequest = (e) => {
    !this.shape.isShapePoint(e.target) || this.shape.deletePoint(e.target.x, e.target.y);
  }, this.addEventListener = (e, i) => {
    typeof this.subscriptions[e] > "u" && (this.subscriptions[e] = []);
    const s = r.subscribe(e, (o) => {
      o.target && o.target.guid === this.shape.guid && i(o);
    });
    return this.subscriptions[e].push(s), s;
  }, this.removeEventListener = (e, i) => {
    this.subscriptions[e] && typeof this.subscriptions[e] < "u" && this.subscriptions[e].splice(this.subscriptions[e].indexOf(i), 1), r.unsubscribe(e, i);
  }, this.destroy = () => {
    r.unsubscribe(g.POINT_ADDED, this.onPointAdded), r.unsubscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), r.unsubscribe(g.POINT_DESTROYED, this.onPointDestroyed), r.unsubscribe(g.POINT_DELETE_REQUEST, this.onPointDeleteRequest), this.shape.resizeBox && (this.shape.resizeBox.removeEventListener(I.RESIZE_BOX_RESIZE, this.resizeBoxListener), this.shape.resizeBox.removeEventListener(l.SHAPE_MOUSE_CLICK, this.resizeClickEventListener), this.shape.resizeBox.removeEventListener(l.SHAPE_MOUSE_MOVE, this.resizeMouseMoveEventListener), this.shape.resizeBox.removeEventListener(l.SHAPE_MOVE_START, this.resizeMouseDownEventListener), this.shape.resizeBox.removeEventListener(l.SHAPE_MOUSE_UP, this.resizeMouseUpEventListener), this.shape.resizeBox.removeEventListener(l.SHAPE_MOUSE_DOUBLE_CLICK, this.resizeDblClickEventListener), this.shape.resizeBox.removeEventListener(l.SHAPE_MOUSE_OVER, this.resizeMouseOverEventListener), this.shape.resizeBox.removeEventListener(l.SHAPE_MOUSE_OUT, this.resizeMouseOutEventListener), this.shape.resizeBox.removeEventListener("contextmenu", this.resizeBoxContextMenuEventListener), this.shape.resizeBox.removeEventListener("wheel", this.resizeBoxWheelEventListener)), this.shape.rotateBox && (this.shape.rotateBox.removeEventListener(L.ROTATE_BOX_ROTATE, this.rotateBoxListener), this.shape.rotateBox.removeEventListener(l.SHAPE_MOUSE_CLICK, this.rotateClickEventListener), this.shape.rotateBox.removeEventListener(l.SHAPE_MOUSE_MOVE, this.rotateMouseMoveEventListener), this.shape.rotateBox.removeEventListener(l.SHAPE_MOVE_START, this.rotateMouseDownEventListener), this.shape.rotateBox.removeEventListener(l.SHAPE_MOVE_START, this.rotatePointDragStartEventListener), this.shape.rotateBox.removeEventListener(l.SHAPE_MOVE_START, this.rotatePointDragEndEventListener), this.shape.rotateBox.removeEventListener(l.SHAPE_MOUSE_UP, this.rotateMouseUpEventListener), this.shape.rotateBox.removeEventListener(l.SHAPE_MOUSE_DOUBLE_CLICK, this.rotateDblClickEventListener), this.shape.rotateBox.removeEventListener(l.SHAPE_MOUSE_OVER, this.rotateMouseOverEventListener), this.shape.rotateBox.removeEventListener(l.SHAPE_MOUSE_OUT, this.rotateMouseOutEventListener), this.shape.rotateBox.removeEventListener("contextmenu", this.rotateBoxContextMenuEventListener), this.shape.rotateBox.removeEventListener("wheel", this.rotateBoxWheelEventListener));
    for (let e in this.subscriptions)
      this.subscriptions[e].forEach((s) => r.unsubscribe(e, s)), this.subscriptions[e] = [];
  };
}
const l = {
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
  getShapeMouseEvents: () => Object.keys(l).filter((t) => ["SHAPE_CREATE", "SHAPE_DESTROY", "SHAPE_RESIZE", "SHAPE_ROTATE"].indexOf(t) === -1 && typeof l[t] != "function").map((t) => ({ key: t, name: l[t] }))
};
function pe() {
  this.draw = (t) => {
    const e = t.getParent();
    this.initSvg(t, e), !(t.points.length < 1) && (t.options.hasContextMenu && t.shapeMenu && !t.shapeMenu.contextMenu && t.shapeMenu.updateContextMenu(), this.updateOptions(t), this.drawShape(t, e), r.emit("show_finish", t));
  }, this.initSvg = (t, e) => {
    !e || e.guid === t.guid || !e.options.groupChildShapes ? this.initRootSvg(t) : this.clearSvg(t);
  }, this.initRootSvg = (t) => {
    if (t.svg)
      try {
        t.eventListener.removeSvgEventListeners(), t.svg.innerHTML = "";
      } catch {
      }
    else
      t.points.length && (t.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), t.svg.ondragstart = function() {
        return !1;
      }, t.options.visible && r.emit(l.SHAPE_SHOW, t), t.eventListener.setSvgEventListeners(), t.svg.id = t.options.id, t.svg.setAttribute("guid", t.guid), t.root.appendChild(t.svg));
    if (t.svg && typeof t.svg.appendChild == "function") {
      const e = document.createElementNS(t.svg.namespaceURI, "defs");
      t.svg.appendChild(e);
    }
  }, this.clearSvg = (t) => {
    t.svg = null;
    const e = document.querySelector("svg[guid='" + t.guid + "']");
    e && e.parentNode.removeChild(e), t.resizeBox && t.resizeBox.hide(), t.rotateBox && t.rotateBox.hide();
  }, this.updateOptions = (t) => {
    t.calcPosition();
    const e = t.getRootParent();
    this.updateShapeSvgOptions(t, e), (!e || !e.options.displayAsPath) && (this.setupShapeFill(t), this.createSVGFilters(t), t.options.canScale && this.redrawResizeBox(e && e.options.groupChildShapes ? e : t), t.options.canRotate && this.redrawRotateBox(e && e.options.groupChildShapes ? e : t)), t.options.pointOptions.canDrag && this.updatePoints(t, e);
  }, this.updateShapeSvgOptions = (t, e) => {
    if (t.svg && (!e || !e.options.groupChildShapes) && typeof t.svg.appendChild == "function") {
      this.updateVisible(t), t.svg.id = t.options.id, t.svg.setAttribute("guid", t.guid);
      let i = t.getPosition(t.options.groupChildShapes);
      t.svg.style.position = "absolute", t.svg.style.cursor = "default", t.svg.style.left = i.left + "px", t.svg.style.top = i.top + "px", t.svg.setAttribute("width", i.width), t.svg.setAttribute("height", i.height), t.svg.style.zIndex = t.options.zIndex;
    } else if (e && e.svg) {
      const i = e.svg.querySelector("#p" + t.guid + "_polygon");
      i && (i.style.zIndex = t.options.zIndex);
    }
  }, this.updateVisible = (t) => {
    typeof t.options.visible < "u" && (t.svg.style.display !== t.options.visible && (t.options.visible ? (r.emit(l.SHAPE_SHOW, t), t.getChildren(!0).forEach((e) => r.emit(l.SHAPE_SHOW, e))) : (r.emit(l.SHAPE_HIDE, t), t.getChildren(!0).forEach((e) => r.emit(l.SHAPE_HIDE, e)))), t.svg.style.display = t.options.visible ? "" : "none");
  }, this.drawShape = (t, e) => {
    if (!e || !e.options.displayAsPath) {
      this.drawPolygon(t), t.svg && c.isNormalShape(t) && this.setupZIndex(t);
      return;
    }
    this.draw(e);
  }, this.updatePoints = async (t, e) => {
    t.points[0] && !t.points[0].element && await Pt(1), t.points.filter((i) => i.element).forEach((i) => {
      i.element.parentNode !== t.root && t.root.appendChild(i.element), i.options.zIndex = t.options.zIndex + 2, !t.options.visible && !i.options.forceDisplay ? i.options.visible = !1 : t.options.displayMode !== A.DEFAULT && (i.options.visible = !0), i.redraw(), t.options.displayMode === A.DEFAULT && !i.options.forceDisplay && (!e || e.options.displayMode === A.DEFAULT ? i.element.style.display = "none" : i.element.style.display = "");
    });
  }, this.drawPolygon = (t, e = null) => {
    if (!e && (e = this.getShapeSvg(t), !e || typeof e.appendChild != "function"))
      return;
    let i = e.querySelector("#p" + t.guid + "_polygon");
    i || (i = document.createElementNS("http://www.w3.org/2000/svg", "path"), e.appendChild(i)), i.setAttribute("d", this.getPolygonPath(t)), i.setAttribute("fill-rule", "evenodd"), i.setAttribute("shape_id", t.options.id), i.setAttribute("shape_guid", t.guid), i.id = "p" + t.guid + "_polygon", this.setupPolygonFill(t, i), this.setupPolygonStyles(t, i), e.querySelector("#f" + t.guid + "_filter") && (i.style.filter = 'url("#f' + t.guid + '_filter")'), i.style.zIndex = t.options.zIndex, t.polygon = i;
  }, this.getPolygonPath = (t) => {
    const e = t.getParent();
    if (e && e.options.groupChildShapes) {
      const i = e.getPosition(e.options.groupChildShapes);
      let s = this.getPolygonPathForShape(t, i, this.getMaxStrokeWidth(e));
      return s += this.getPolygonPathForChildren(t, i), s;
    } else {
      const i = t.getPosition(t.options.groupChildShapes);
      let s = this.getPolygonPathForShape(t, i, this.getMaxStrokeWidth(t));
      if (s += this.getPolygonPathForChildren(t, i), t.options.displayAsPath && t.options.groupChildShapes) {
        const o = this.getShapeSvg(t);
        o.setAttribute("width", i.width), o.setAttribute("height", i.height), this.createSVGFilters(t);
      }
      return s;
    }
  }, this.getPolygonPathForChildren = (t, e) => {
    let i = "";
    return t.options.displayAsPath && t.options.groupChildShapes && t.getChildren().forEach((s) => {
      s.calcPosition(), i += this.getPolygonPathForShape(s, e, this.getMaxStrokeWidth(s));
    }), i;
  }, this.getPolygonPathForShape = (t, e, i) => "M " + t.points.map((s) => {
    let o = s.x - e.left, n = s.y - e.top;
    return o <= 0 ? o += i : s.x >= e.right && (o -= i), n <= 0 ? n += i : s.y >= e.bottom && (n -= i), "" + o + "," + n;
  }).join(" ") + " Z", this.redrawResizeBox = (t) => {
    if (t.options.displayMode !== A.SCALE || !t.options.canScale) {
      t.resizeBox && t.resizeBox.hide();
      return;
    }
    if (!t.resizeBox) {
      t.setupResizeBox(), t.resizeBox && t.resizeBox.shape.points.forEach((e) => {
        e.options.zIndex = t.options.zIndex + 2, e.element.style.zIndex = t.options.zIndex + 2;
      });
      return;
    }
    this.setupBox(t, t.resizeBox, A.SCALE);
  }, this.redrawRotateBox = (t) => {
    if (t.options.displayMode !== A.ROTATE || !t.options.canRotate) {
      t.rotateBox && t.rotateBox.hide();
      return;
    }
    if (!t.rotateBox) {
      t.setupRotateBox(), t.rotateBox && t.rotateBox.shape.points.forEach((e) => {
        e.options.zIndex = t.options.zIndex + 2, e.element.style.zIndex = t.options.zIndex + 2;
      });
      return;
    }
    this.setupBox(t, t.rotateBox, A.ROTATE);
  }, this.setupBox = (t, e, i) => {
    const s = t.getResizeBoxBounds();
    t.options.displayMode === i ? e.options.shapeOptions.visible = t.options.visible : e.options.shapeOptions.visible = !1, e.left = s.left, e.top = s.top, e.width = s.width, e.height = s.height, e.options.zIndex = t.options.zIndex + 1, e.redraw(), e.shape.points.forEach((o) => {
      o.options.zIndex = t.options.zIndex + 2, o.element.style.zIndex = t.options.zIndex + 2;
    });
  }, this.setupShapeFill = (t) => {
    const e = t.options.style.fill || "none";
    e === "#image" && t.options.fillImage && typeof t.options.fillImage == "object" ? this.createImageFill(t) : e === "#gradient" && t.options.fillGradient && typeof t.options.fillGradient == "object" && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1 && this.createGradient(t);
  }, this.createGradient = (t) => {
    const e = this.getShapeSvg(t);
    let i = e.querySelector("#g" + t.guid + "_gradient"), s = t.options.fillGradient.type === "linear" ? "linearGradient" : "radialGradient";
    return i ? i.tagName.toLowerCase() !== s.toLowerCase() && i.parentNode.removeChild(i) : (i = document.createElementNS(e.namespaceURI, s), e && e.querySelector("defs").appendChild(i)), this.createGradientSteps(t, e, i);
  }, this.createGradientSteps = (t, e, i) => {
    i.innerHTML = "", i.id = "g" + t.guid + "_gradient";
    let s = !1;
    for (let o in t.options.fillGradient)
      if (o !== "type") {
        if (o === "steps") {
          s = !0;
          continue;
        }
        i.setAttribute(o, t.options.fillGradient[o]);
      }
    if (!s)
      return i;
    for (let o of t.options.fillGradient.steps) {
      const n = document.createElementNS(e.namespaceURI, "stop");
      S(o.stopColor) && n.setAttribute("offset", o.offset), S(o.stopColor) && n.setAttribute("stop-color", o.stopColor), S(o.stopOpacity) && n.setAttribute("stop-opacity", o.stopOpacity), i.appendChild(n);
    }
    return i;
  }, this.createImageFill = (t) => {
    const e = t.options.fillImage;
    if (!e.href || !e.width || !e.height)
      return console.error("Image HREF, width and height must be specified for Image Fill"), null;
    const i = this.getShapeSvg(t);
    let s = i.querySelector("p" + t.guid + "_pattern");
    s || (s = document.createElementNS(i.namespaceURI, "pattern"), s.setAttribute("id", "p" + t.guid + "_pattern"), s.setAttribute("patternUnits", "userSpaceOnUse"), i && i.querySelector("defs").appendChild(s));
    for (let n in e)
      n !== "href" && s.setAttribute(n, e[n]);
    let o = s.querySelector("image");
    return o || (o = document.createElementNS(i.namespaceURI, "image"), s.appendChild(o)), e.href && o.setAttribute("href", e.href), o.setAttribute("width", e.width), o.setAttribute("height", e.height), s;
  }, this.createSVGFilters = (t) => {
    if (!t.options.filters || typeof t.options.filters != "object" || !Object.keys(t.options.filters).length)
      return;
    const e = this.getShapeSvg(t);
    let i = e.querySelector("#f" + t.guid + "_filter");
    i || (i = document.createElementNS(e.namespaceURI, "filter"), e && e.querySelector("defs").append(i)), i.setAttribute("id", "f" + t.guid + "_filter"), i.innerHTML = "";
    for (let s in t.options.filters) {
      const o = this.createSVGFilter(t, s, t.options.filters[s]);
      o && i.appendChild(o);
    }
  }, this.createSVGFilter = (t, e, i) => {
    if (!t.svg)
      return null;
    const s = document.createElementNS(t.svg.namespaceURI, e), o = this.getShapeSvg(t), n = t.getPosition(t.options.groupChildShapes);
    for (let h in i)
      s.setAttribute(h, i[h].toString()), h === "dx" && o.setAttribute("width", (n.width + parseInt(i.dx) * 2).toString()), h === "dy" && o.setAttribute("height", (n.height + parseInt(i.dy) * 2).toString());
    return s;
  }, this.setupPolygonFill = (t, e) => {
    const i = t.options.style.fill || "none";
    i === "#image" && t.options.fillImage && typeof t.options.fillImage == "object" ? e.setAttribute("fill", 'url("#p' + t.guid + '_pattern")') : i === "#gradient" && t.options.fillGradient && typeof t.options.fillGradient == "object" && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1 && e.setAttribute("fill", 'url("#g' + t.guid + '_gradient")');
  }, this.setupPolygonStyles = (t, e) => {
    if (t.options.classes && e.setAttribute("class", t.options.classes), !(!S(t.options.style) || typeof t.options.style != "object"))
      for (let i in t.options.style)
        e.style[i] = t.options.style[i];
  }, this.toSvg = (t, e = null) => {
    const i = document.createElement("div"), s = this.getSvg(t, e);
    return i.appendChild(s), '<?xml version="1.0" encoding="UTF-8"?>' + i.innerHTML.replace(/&quot;/g, "'");
  }, this.getSvg = (t, e) => {
    let i = t.svg;
    if (!i) {
      const h = t.getParent();
      if (h && (i = h.svg), !i)
        return;
    }
    i = i.cloneNode(!0), e && (i = this.addChildrenToSvg(t, i)), i.removeAttribute("style"), i.removeAttribute("width"), i.removeAttribute("height"), i.removeAttribute("id"), i.removeAttribute("guid");
    const s = t.getPosition(e === null ? t.options.groupChildShapes : e);
    i.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const o = t.options.zoomLevel || 1, n = "0 0 " + s.width / o + " " + s.height / o;
    return i.setAttribute("viewBox", n), o !== 1 && this.unZoomSvg(i, o), i;
  }, this.addChildrenToSvg = (t, e) => {
    let i = !1;
    t = t.getParent() || t, t.options.groupChildShapes || (t.options.groupChildShapes = !0, i = !0), t.options.displayAsPath || t.getChildren(!0).forEach((n) => {
      this.drawPolygon(n, e);
    }), this.drawPolygon(t, e);
    let s = Array.from(e.querySelectorAll("path"));
    s.sort((n, h) => parseInt(n.style.zIndex) - parseInt(h.style.zIndex));
    const o = e.querySelector("defs");
    return e.innerHTML = "", e.appendChild(o), s.forEach((n) => e.appendChild(n)), i && (t.options.groupChildShapes = !1), e;
  }, this.unZoomSvg = (t, e) => {
    t.querySelectorAll("path").forEach((i) => {
      let s = "";
      const o = i.getAttribute("d").split(" ");
      for (let n of o)
        if (n.search(",") === -1)
          s += n + " ";
        else {
          const h = n.split(",");
          s += parseFloat(h[0]) / e + "," + parseFloat(h[1]) / e + " ";
        }
      i.setAttribute("d", s);
    });
  }, this.getMaxStrokeWidth = (t) => {
    if (!this.getShapeSvg(t))
      return 0;
    let i = parseInt(t.options.style["stroke-width"]);
    return isNaN(i) && (i = 0), t.options.groupChildShapes ? t.getChildren(!0).map((s) => isNaN(parseInt(s.options.style["stroke-width"])) ? 0 : parseInt(s.options.style["stroke-width"])).reduce((s, o) => s > o ? s : o, i) : i;
  }, this.toPng = (t, e = V.DATAURL, i = null, s = null, o = null) => new Promise(async (n) => {
    const h = t.options.zoomLevel || 1;
    t.calcPosition();
    const a = t.getPosition(o || t.options.groupChildShapes);
    [i, s] = tt(i, s, a.width / h, a.height / h);
    const p = this.getSvg(t, o);
    p.setAttribute("width", a.width / h), p.setAttribute("height", a.height / h);
    for (let y of p.querySelectorAll("image"))
      if (y.getAttribute("href") && y.getAttribute("href").length) {
        const H = await K(await (await fetch(y.getAttribute("href"))).blob());
        y.setAttribute("href", H);
      }
    const d = document.createElement("div");
    d.appendChild(p);
    const f = d.innerHTML, m = new Image(), x = new Blob([f], { type: "image/svg+xml" }), N = window.URL || window.webkitURL || window, D = await K(x);
    m.addEventListener("load", () => {
      const y = document.createElement("canvas");
      m.width = a.width / h, m.height = a.height / h, y.width = m.width, y.height = m.height;
      const H = y.getContext("2d");
      H.drawImage(m, 0, 0), H.scale(i, s), N.revokeObjectURL(D);
      const Z = y.toDataURL("image/png");
      if (e === V.BLOB) {
        n(Bt(Z));
        return;
      }
      n(Z);
    }), m.src = D;
  }), this.moveShapeToTop = (t) => {
    const e = c.getMaxZIndex(t.root);
    t.options.zIndex === e && c.findShapesByOptionValue("zIndex", e).length === 1 || this.changeShapeZIndex(t, e + 1);
  }, this.moveShapeToBottom = (t) => {
    const e = c.getMinZIndex(t.root);
    t.options.zIndex === e && c.findShapesByOptionValue("zIndex", e).length === 1 || this.changeShapeZIndex(t, e - 1);
  }, this.changeShapeZIndex = (t, e) => {
    if (e === t.options.zIndex)
      return;
    const i = e - t.options.zIndex;
    t.options.prevZIndex = t.options.zIndex, t.options.zIndex += i, this.updateOptions(t), t.options.groupChildShapes && t.getChildren(!0).forEach((s) => {
      s.options.prevZIndex = s.options.zIndex, s.options.zIndex += i, this.updateOptions(s);
    });
  }, this.getShapeSvg = (t) => {
    const e = t.getRootParent(!0);
    return e && e.svg ? e.svg : t.svg;
  }, this.setupZIndex = (t) => {
    if (!t.svg)
      return;
    let e = Array.from(t.svg.querySelectorAll("path"));
    e.sort((s, o) => parseInt(s.style.zIndex) - parseInt(o.style.zIndex));
    const i = t.svg.querySelector("defs");
    t.svg.innerHTML = "", t.svg.appendChild(i), e.forEach((s) => t.svg.appendChild(s));
  };
}
const V = {
  DATAURL: "dataurl",
  BLOB: "blob"
}, v = new pe(), Ae = (t, e, i = {}, s = null) => {
  if (!S(e) || typeof e != "object" || (S(e.features) || (e = { features: [e] }), !e.features.length))
    return null;
  const o = [];
  for (let n in e.features) {
    const h = e.features[n], a = de(h, n, i, t);
    s && typeof s == "function" && s(n, e.features.length, a), a && o.push(a);
  }
  return o.length === 1 ? o[0] : o;
}, de = (t, e, i, s) => {
  if (!ue(t))
    return;
  let o = ge(t, e, i);
  o.visible = !1;
  const n = ce(t);
  if (!n || !n.length)
    return;
  n.sort((a, p) => p.dims.width * p.dims.height - a.dims.width * a.dims.height);
  let h = null;
  for (let a in n) {
    const p = b({}, o);
    if (a == 0)
      i.onlyData ? h = {
        points: n[a].cords,
        options: p,
        children: [],
        ...n[a].dims
      } : (h = c.createShape(s, p, n[a].cords, !1), h.left = n[a].dims.left, h.top = n[a].dims.top, h.right = n[a].dims.right, h.bottom = n[a].dims.bottom, h.width = n[a].dims.width, h.height = n[a].dims.height);
    else if (p.id += "_" + a, p.name += " " + a, i.onlyData)
      h.children.push({
        points: n[a].cords,
        options: p,
        ...n[a].dims
      });
    else {
      const d = c.createShape(s, p, n[a].cords);
      d.left = n[a].dims.left, d.top = n[a].dims.top, d.right = n[a].dims.right, d.bottom = n[a].dims.bottom, d.width = n[a].dims.width, d.height = n[a].dims.height, h.addChild(d, !1);
    }
  }
  return i.onlyData || (S(i.scale) ? h.scaleBy(i.scale, i.scale, !0) : (S(i.width) || S(i.height)) && h.scaleTo(i.width, i.height)), h;
}, ue = (t) => {
  if (!S(t.properties) || typeof t.properties != "object")
    return !1;
  const e = t.geometry;
  return !(!S(e) || typeof e != "object" || ["Polygon", "MultiPolygon"].indexOf(e.type) === -1 || !S(e.coordinates) || typeof e.coordinates != "object" || !e.coordinates.length);
}, ge = (t, e, i) => {
  const s = {};
  if (s.name = t.properties[i.nameField] || "Shape " + e, s.id = t.properties[i.idField] || "shape_" + e, S(i.fields) && typeof i.fields == "object" && i.fields.filter((o) => S(t.properties[o])).forEach((o) => s[o] = t.properties[o]), S(i.options) && typeof i.options == "object")
    for (let o in i.options)
      s[o] = i.options[o];
  return s;
}, ce = (t) => {
  let e = t.geometry.coordinates;
  t.geometry.type === "Polygon" && (e = [e]);
  const i = [];
  for (let s of e) {
    const o = s[0], n = [];
    let h = 1 / 0, a = -1 / 0, p = 1 / 0, d = -1 / 0;
    for (let f of o) {
      const [m, x] = [f[0], -f[1]];
      m < h && (h = m), m > a && (a = m), x < p && (p = x), x > d && (d = x), n.push({ x: m, y: x });
    }
    i.push({ cords: n, dims: { left: h, top: p, bottom: d, right: a, width: a - h, height: d - p } });
  }
  return i;
};
function fe() {
  this.shapes = {}, this.visibleShapes = {}, this.activeShape = null, this.draggedShape = null, this.shapeOnCursor = null, this.containerEventListeners = [], this.init = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    r.subscribe(l.SHAPE_CREATE, this.onShapeCreated), r.subscribe(l.SHAPE_DESTROY, this.onShapeDestroy), r.subscribe(l.SHAPE_SHOW, this.onShapeShow), r.subscribe(l.SHAPE_HIDE, this.onShapeHide), r.subscribe(l.SHAPE_MOVE_START, this.onShapeMoveStart), r.subscribe(l.SHAPE_MOUSE_ENTER, this.onShapeMouseEnter), r.subscribe(g.POINT_DRAG_START, this.onPointDragStart), r.subscribe(g.POINT_DRAG_END, this.onPointDragEnd), window.addEventListener("resize", this.onWindowResize);
  }, this.onWindowResize = (t) => {
    for (let e in this.shapes) {
      const i = this.shapes[e];
      r.emit(
        F.CONTAINER_BOUNDS_CHANGED,
        i,
        { bounds: i.getBounds(), points: i.points }
      );
    }
  }, this.createShape = (t, e, i, s = !0) => new P().init(t, e, i, s), this.onShapeCreated = (t) => {
    const e = t.target;
    S(e.root) && !this.getShape(e) && typeof e.belongsToShape == "function" && (this.addShape(e), this.activeShape || (this.activeShape = e));
  }, this.addShape = (t) => {
    this.shapes[t.guid] = t, t.options.visible && this.isNormalShape(t) && (this.visibleShapes[t.guid] = t), this.getShapesByContainer(t.root).length === 1 && this.addContainerEvents(t);
  }, this.onShapeDestroy = (t) => {
    const e = t.target;
    delete this.shapes[e.guid];
    const i = e.root;
    !S(e.root) || this.getShapesByContainer(i).length === 0 && this.containerEventListeners.filter((s) => s.container === i).forEach((s) => {
      s.container.removeEventListener(s.name, s.listener), this.containerEventListeners.splice(this.containerEventListeners.indexOf(s), 1);
    });
  }, this.onShapeShow = (t) => {
    this.isNormalShape(t.target) && (this.visibleShapes[t.target.guid] = t.target);
  }, this.onShapeHide = (t) => {
    delete this.visibleShapes[t.target.guid];
  }, this.onShapeMoveStart = (t) => {
    if (!this.getShapeByGuid(t.target.guid) || !t.target.options.managed)
      return;
    const e = t.target.getRootParent(!0);
    e && e.options.groupChildShapes ? (this.activateShape(e), this.draggedShape = e) : (this.activateShape(t.target), this.draggedShape = t.target);
  }, this.onShapeMouseEnter = (t) => {
    !this.draggedShape || t.buttons !== 1 && (this.draggedShape.draggedPoint = null);
  }, this.onPointDragStart = (t) => {
    const e = this.findShapeByPoint(t.target);
    if (e) {
      this.draggedShape = e;
      const i = e.getRootParent(!0);
      i && i.options.groupChildShapes && (this.draggedShape = i), this.draggedShape.draggedPoint = t.target, r.emit(l.POINT_DRAG_START, e, { point: t.target });
    }
  }, this.onPointDragEnd = (t) => {
    this.draggedShape && (this.draggedShape.draggedPoint = null), this.draggedShape = null;
  }, this.getShape = (t) => this.getShapeByGuid(t.guid), this.findShapeByPoint = (t) => {
    for (let e in this.shapes) {
      const i = this.shapes[e];
      if (i.isShapePoint(t))
        return i;
    }
    return null;
  }, this.getShapeByGuid = (t) => S(this.shapes[t]) ? this.shapes[t] : null, this.getShapesByContainer = (t) => {
    const e = [];
    for (let i in this.shapes) {
      const s = this.shapes[i];
      this.isNormalShape(s) && s.root === t && e.push(s);
    }
    return e;
  }, this.getMaxZIndex = (t = null) => {
    let e;
    return t ? e = this.getShapesByContainer(t) : e = this.getShapes(), e.length ? parseInt(
      e.map((i) => i.options.zIndex || 0).reduce((i, s) => s > i ? s : i, 0)
    ) : 0;
  }, this.getMinZIndex = (t = null) => {
    let e;
    return t ? e = this.getShapesByContainer(t) : e = this.getShapes(), e.length ? parseInt(
      e.map((i) => i.options.zIndex || 0).reduce((i, s) => s < i ? s : i, 999999)
    ) : 0;
  }, this.getShapes = () => {
    const t = [];
    for (let e in this.shapes) {
      const i = this.shapes[e];
      this.isNormalShape(i) && t.push(i);
    }
    return t;
  }, this.isNormalShape = (t) => t.options.id.search("_resizebox") === -1 && t.options.id.search("_rotatebox") === -1 && typeof t.belongsToShape == "function", this.activateShape = (t, e = null) => {
    if (this.activeShape === t) {
      this.activeShape.switchDisplayMode(e), t.options.moveToTop && t.moveToTop();
      return;
    }
    typeof t.id < "u" && (t.id.search("_resizebox") !== -1 || t.id.search("_rotatebox") !== -1) || (this.activeShape && this.deactivateShape(this.activeShape), t.options.moveToTop && t.moveToTop(), this.activeShape = t, r.emit(l.SHAPE_ACTIVATED, this.activeShape), this.activeShape.switchDisplayMode(e));
  }, this.deactivateShape = (t) => {
    typeof t.options.prevZIndex < "u" && v.updateOptions(t), t.options.displayMode !== A.DEFAULT && t.switchDisplayMode(A.DEFAULT), t.options.groupChildShapes && t.getChildren(!0).forEach((e) => {
      typeof e.options.prevZIndex < "u" && (v.updateOptions(e), e.options.displayMode !== A.DEFAULT && e.switchDisplayMode(A.DEFAULT));
    });
  }, this.addContainerEvents = (t) => {
    this.addContainerEvent(t.root, "mousemove", this.mousemove), this.addContainerEvent(t.root, "mouseup", this.mouseup, t.options.id), this.addContainerEvent(t.root, "dblclick", this.doubleclick), this.addContainerEvent(t.root, "contextmenu", this.contextmenu), this.addContainerEvent(t.root, "mouseleave", this.mouseleave), r.emit(Ee.MANAGER_ADD_CONTAINER_EVENT_LISTENERS, t.root);
  }, this.addContainerEvent = (t, e, i) => {
    this.containerEventListeners.find((s) => s.container === t && s.name === e) || (t.addEventListener(e, i), this.containerEventListeners.push({ id: t.id, container: t, name: e, listener: i }));
  }, this.doubleclick = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.doubleclick(u(t, { target: this.shapeOnCursor }));
    try {
      t.stopPropagation();
    } catch {
    }
    if (!this.activeShape || !this.activeShape.options.canAddPoints || this.activeShape.draggedPoint || this.activeShape.points.length > 2 || this.activeShape.points.length === this.activeShape.options.maxPoints)
      return;
    this.activeShape.options.displayMode === A.DEFAULT && this.activeShape.switchDisplayMode(A.SELECTED);
    const [e, i] = Q(u(t, { target: this.activeShape }));
    this.activeShape.addPoint(e, i, { forceDisplay: !1 });
  }, this.contextmenu = (t) => {
    if (t.stopPropagation(), t.preventDefault(), this.shapeOnCursor) {
      const e = this.shapeOnCursor.shapeMenu;
      if (!e)
        return;
      e.contextMenu.origEvent = t, e.contextMenu.cursorX = t.pageX, e.contextMenu.cursorY = t.pageY, e.contextMenu.show();
    }
  }, this.mousedown = (t) => {
    if (this.shapeOnCursor && t.buttons !== 2) {
      const e = this.shapeOnCursor.getRootParent(!0);
      e && e.options.groupChildShapes && (this.shapeOnCursor = e), this.draggedShape = this.shapeOnCursor, this.shapeOnCursor.eventListener.mousedown(u(t, { target: this.shapeOnCursor }));
    }
  }, this.mouseup = (t) => {
    if (!this.draggedShape)
      return;
    const e = this.draggedShape;
    t.buttons === 1 && e.options.canAddPoints && !e.draggedPoint && (e.options.maxPoints === -1 || e.points.length < e.options.maxPoints) && e.addPoint(
      t.clientX - e.root.offsetLeft,
      t.clientY - e.root.offsetTop
    ), e.draggedPoint ? (r.emit(l.POINT_DRAG_END, this.draggedShape, { point: e.draggedPoint }), e.draggedPoint.mouseup(t), e.draggedPoint = null) : r.emit(l.SHAPE_MOUSE_UP, e, {}), this.draggedShape = null, r.emit(l.SHAPE_MOVE_END, e, { pos: e.getPosition(!0) });
  }, this.mousemove = (t) => {
    if (t.buttons !== 1 && (this.draggedShape && (this.draggedShape.draggedPoint = null), this.draggedShape = null), !this.draggedShape) {
      this.processShapesUnderCursor(t);
      return;
    }
    this.draggedShape && this.draggedShape.eventListener.mousemove(t);
  }, this.mouseover = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseover(u(t, { target: this.shapeOnCursor }));
  }, this.mouseenter = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseenter(u(t, { target: this.shapeOnCursor }));
  }, this.mouseout = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseout(u(t, { target: t.target }));
  }, this.mouseleave = (t) => {
    if (this.draggedShape && this.draggedShape.draggedPoint && this.draggedShape.options.id.search("_resizebox") !== -1) {
      const e = this.draggedShape.options.id.replace("_resizebox", ""), i = this.findShapeById(e);
      i && i.options.simpleMode && r.emit(I.RESIZE_BOX_RESIZE, i.resizeBox, u(t, {
        buttons: 0,
        oldPos: i.getPosition(!0),
        newPos: i.resizeBox.getPosition()
      }));
    }
  }, this.click = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.click(u(t, { target: this.shapeOnCursor }));
  }, this.processShapesUnderCursor = (t) => {
    const [e, i] = [t.clientX, t.clientY], s = this.getShapeOnCursor(e, i);
    this.shapeOnCursor && this.shapeOnCursor !== s && this.shapeOnCursor.getShapeSvg() && (this.shapeOnCursor.getShapeSvg().style.cursor = "default", this.shapeOnCursor.eventListener.mouseout(u(t, { target: this.shapeOnCursor }))), s && s !== this.shapeOnCursor && s.eventListener.mouseover(u(t, { target: s })), this.shapeOnCursor = s, this.shapeOnCursor && (r.emit(l.SHAPE_MOUSE_MOVE, this.shapeOnCursor, u(t)), this.shapeOnCursor.getShapeSvg().style.cursor = "crosshair");
  }, this.getShapeOnCursor = (t, e) => {
    const i = Object.values(this.visibleShapes);
    if (!i.length)
      return null;
    const s = i.filter((o) => o.belongsToShape(t, e));
    return s.length ? s.reduce((o, n) => n.options.zIndex >= o.options.zIndex ? n : o) : null;
  }, this.toJSON = (t = null, e = !1) => (t || (t = this.getShapes()), t = t.filter((i) => !i.getParent()), JSON.stringify(t.map((i) => i.getJSON(!0, e)))), this.fromJSON = (t, e, i = null, s = !0) => {
    let o = e;
    if (typeof o == "string" && (o = W(e)), !o || !o.length)
      return null;
    const n = [];
    for (let h in o) {
      const a = o[h];
      a.options.id && this.findShapeById(a.options.id) || (n.push(new P().fromJSON(t, a, !0, s)), i && typeof i == "function" && i(h / o.length));
    }
    return n;
  }, this.findShapesByOptionValue = (t, e) => this.getShapes().filter((i) => i.options[t] === e), this.findShapeById = (t) => {
    const e = this.findShapesByOptionValue("id", t);
    return e && e.length ? e[0] : null;
  }, this.findShapeByName = (t) => {
    const e = this.findShapesByOptionValue("name", t);
    return e && e.length ? e[0] : null;
  }, this.clear = () => {
    for (this.containerEventListeners.forEach(({ container: t, name: e, listener: i }) => {
      try {
        t.removeEventListener(e, i);
      } catch (s) {
        console.error(s);
      }
    }), this.containerEventListeners = []; Object.values(this.shapes).length; )
      Object.values(this.shapes)[0].destroy();
  }, this.fromGeoJson = (t, e, i = {}, s = null) => Ae(t, e, i, s), this.length = () => Object.values(this.shapes).length;
}
const Ee = {
  MANAGER_ADD_CONTAINER_EVENT_LISTENERS: "manager_add_container_event_listeners",
  MANAGER_REMOVE_CONTAINER_EVENT_LISTENERS: "manager_remove_container_event_listeners"
}, F = {
  CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
}, c = new fe().init();
function ht(t) {
  this.shape = t, this.addChild = (e, i = !0) => {
    !this.shouldAddChild(e) || (this.shape.options.displayMode !== e.options.displayMode && (e.svg ? e.switchDisplayMode(this.shape.options.displayMode) : e.options.displayMode = t.options.displayMode), this.shape.children.push(e), i && r.emit(l.SHAPE_ADD_CHILD, this.shape, { child: e }));
  }, this.addChildren = (e = []) => {
    e.forEach((i) => {
      this.addChild(i, !1);
    }), r.emit(l.SHAPE_ADD_CHILD, this.shape, { children: e });
  }, this.removeChild = (e) => {
    this.shape.children.splice(this.shape.children.indexOf(e), 1), r.emit(l.SHAPE_REMOVE_CHILD, this.shape, { child: e });
  }, this.removeAllChildren = (e = !1) => {
    for (; this.getChildren(e).length; )
      this.removeChild(this.getChildren(e)[0]);
  }, this.getChildren = (e = !1) => {
    if (!e)
      return this.shape.children;
    const i = [];
    i.push(...this.shape.children);
    for (let s of i)
      i.push(...s.getChildren());
    return i;
  }, this.hasChild = (e, i = !1) => e.guid !== this.guid && !!this.getChildren(i).find((s) => s.guid === e.guid), this.shouldAddChild = (e) => !e || typeof e != "object" || typeof e.getChildren > "u" || this.shape.children.indexOf(e) !== -1 || e === this.shape || e.getChildren().indexOf(this.shape) !== -1 || e.getParent() ? !1 : this.getParentsList().indexOf(e) === -1, this.getParent = () => {
    const e = c.getShapes();
    for (let i of e)
      if (i.getChildren().indexOf(this.shape) !== -1)
        return i;
    return null;
  }, this.getRootParent = (e = null) => {
    let i = this.getParentsList();
    return i.length ? (e !== null && (i = i.filter((s) => s.options.groupChildShapes === e)), i[i.length - 1]) : null;
  }, this.getParentsList = (e = []) => {
    const i = this.getParent();
    return i == null ? e : (e.push(i), i.getParentsList(e));
  }, this.getPosition = () => {
    let e = this.getChildren(!0);
    if (e.push(this.shape), e = e.filter((s) => s.points.length), !e.length)
      return { left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0 };
    const i = {
      left: e.map((s) => s.left).reduce((s, o) => o < s ? o : s),
      top: e.map((s) => s.top).reduce((s, o) => o < s ? o : s),
      right: e.map((s) => s.right).reduce((s, o) => o > s ? o : s),
      bottom: e.map((s) => s.bottom).reduce((s, o) => o > s ? o : s)
    };
    return i.width = Math.abs(i.right - i.left) || 1, i.height = Math.abs(i.bottom - i.top) || 1, i;
  };
}
function rt() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = z(), this.options = {
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
  }, this.eventListener = null, this.left_top = null, this.left_bottom = null, this.right_top = null, this.right_bottom = null, this.init = (t, e, i, s, o, n = {}) => (this.left = parseInt(e), this.top = parseInt(i), this.width = parseInt(s), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new P().init(t, b({}, this.options.shapeOptions), []), r.emit(l.SHAPE_CREATE, this.shape, {}), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new re(this).run(), this), this.setOptions = (t = {}) => {
    !t || typeof t != "object" || (this.options = b(this.options, t), this.options.shapeOptions.zIndex = this.options.zIndex || this.options.zIndex, this.options.shapeOptions.id = this.options.id ? this.options.id : this.options.id, this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + Lt + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + _t + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + Ut + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + Vt + "')" } });
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
    r.emit(l.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (t, e) => this.eventListener.addEventListener(t, e), this.removeEventListener = (t, e) => {
    this.eventListener.removeEventListener(t, e);
  };
}
function me(t) {
  this.shape = t, this.contextMenu = null, this.updateContextMenu = () => {
    if (this.shape.options.hasContextMenu && !this.contextMenu ? this.init() : this.shape.options.hasContextMenu || (this.contextMenu = null), this.shape.contextMenu = this.contextMenu, this.contextMenu) {
      const e = this.getMenuItems();
      for (let i of e)
        this.contextMenu.items.find((s) => s.id === i.id) || this.contextMenu.addItem(i.id, i.title, i.image);
    }
  }, this.init = () => {
    t.svg && (this.contextMenu = Y.create([], t.svg, "contextmenu", { customHandler: () => {
    } }), t.options.canAddPoints && this.contextMenu.addItem("i" + t.guid + "_add_point", "Add Point", q), this.displayGroupItems(), this.setEventListeners());
  }, this.getMenuItems = () => {
    const e = [
      { id: "i" + t.guid + "_move_to_top", title: "Move to Top", image: qt },
      { id: "i" + t.guid + "_move_to_bottom", title: "Move to Bottom", image: $t },
      { id: "i" + t.guid + "_flip_horizontal", title: "Flip Horizontal", image: ot },
      { id: "i" + t.guid + "_flip_vertical", title: "Flip Vertical", image: nt },
      { id: "i" + t.guid + "_clone", title: "Clone", image: Xt },
      { id: "i" + t.guid + "_export_json", title: "Export to JSON", image: jt },
      { id: "i" + t.guid + "_export_svg", title: "Export to SVG", image: Yt },
      { id: "i" + t.guid + "_export_png", title: "Export to PNG", image: Zt },
      { id: "i" + t.guid + "_get_base64", title: "Copy Base64 to clipboard", image: ie },
      { id: "i" + t.guid + "_destroy", title: "Destroy", image: st }
    ];
    return t.options.canAddPoints && e.push({ id: "i" + t.guid + "_add_point", title: "Add Point", image: q }), t.options.zoomable && (e.push({ id: "i" + t.guid + "_zoom_in", title: "Zoom in", image: se }), e.push({ id: "i" + t.guid + "_zoom_out", title: "Zoom out", image: oe }), e.push({ id: "i" + t.guid + "_reset_zoom", title: "Reset zoom", image: ne })), e;
  }, this.setEventListeners = () => {
    this.setOnItemClickListener(), this.contextMenu.on("show", () => {
      this.displayGroupItems();
    });
  }, this.setOnItemClickListener = () => {
    let e, i;
    this.contextMenu.on("click", (s) => {
      switch (s.itemId) {
        case "i" + this.shape.guid + "_destroy":
          this.onDestroyClick(s);
          break;
        case "i" + this.shape.guid + "_add_point":
          this.onAddPointClick(s);
          break;
        case "i" + this.shape.guid + "_clone":
          this.onCloneClick(s);
          break;
        case "i" + this.shape.guid + "_export_json":
          this.onExportJsonClick(s);
          break;
        case "i" + this.shape.guid + "_export_svg":
          this.onExportSvgClick(s);
          break;
        case "i" + this.shape.guid + "_export_png":
          this.onExportPngClick(s);
          break;
        case "i" + this.shape.guid + "_get_base64":
          this.onGetBase64ToClipboardClick(s);
          break;
        case "i" + this.shape.guid + "_group":
          i = this.shape.getRootParent(), e = i || this.shape, e.setOptions({ groupChildShapes: !0 }), e.switchDisplayMode(A.DEFAULT);
          break;
        case "i" + this.shape.guid + "_ungroup":
          i = this.shape.getRootParent(), e = i || this.shape, e.setOptions({ groupChildShapes: !1, displayAsPath: !1 }), e.switchDisplayMode(A.DEFAULT), e.getChildren().forEach((o) => o.switchDisplayMode(A.DEFAULT));
          break;
        case "i" + this.shape.guid + "_topath":
          i = this.shape.getRootParent(), e = i || this.shape, e.setOptions({ groupChildShapes: !0, displayAsPath: !0 }), e.switchDisplayMode(A.SELECTED), e.getChildren().forEach((o) => o.switchDisplayMode(A.SELECTED));
          break;
        case "i" + this.shape.guid + "_toshapes":
          i = this.shape.getRootParent(), e = i || this.shape, e.setOptions({ displayAsPath: !1 }), e.switchDisplayMode(A.SELECTED), e.getChildren().forEach((o) => o.switchDisplayMode(A.SELECTED));
          break;
        case "i" + this.shape.guid + "_move_to_top":
          this.onMoveToTopClick(s);
          break;
        case "i" + this.shape.guid + "_move_to_bottom":
          this.onMoveToBottomClick(s);
          break;
        case "i" + this.shape.guid + "_flip_horizontal":
          this.onFlipHorizontalClick(s);
          break;
        case "i" + this.shape.guid + "_flip_vertical":
          this.onFlipVerticalClick(s);
          break;
        case "i" + this.shape.guid + "_zoom_in":
          this.onZoomInClick(s);
          break;
        case "i" + this.shape.guid + "_zoom_out":
          this.onZoomOutClick(s);
          break;
        case "i" + this.shape.guid + "_reset_zoom":
          this.onResetZoomClick(s);
          break;
      }
    });
  }, this.displayGroupItems = () => {
    let e = this.shape.getRootParent() ? this.shape.getRootParent() : this.shape;
    if (!e.getChildren().length) {
      this.contextMenu.removeItem("i" + this.shape.guid + "_group"), this.contextMenu.removeItem("i" + this.shape.guid + "_ungroup"), this.contextMenu.removeItem("i" + this.shape.guid + "_topath"), this.contextMenu.removeItem("i" + this.shape.guid + "_toshapes");
      return;
    }
    e.options.groupChildShapes ? this.contextMenu.items.find((i) => i.id === "i" + this.shape.guid + "_ungroup") || (this.contextMenu.addItem("i" + this.shape.guid + "_ungroup", "Ungroup", Kt), this.contextMenu.removeItem("i" + this.shape.guid + "_group")) : this.contextMenu.items.find((i) => i.id === "i" + this.shape.guid + "_group") || (this.contextMenu.removeItem("i" + this.shape.guid + "_ungroup"), this.contextMenu.addItem("i" + this.shape.guid + "_group", "Group", Jt)), e.options.displayAsPath ? this.contextMenu.items.find((i) => i.id === "i" + this.shape.guid + "_toshapes") || (this.contextMenu.addItem("i" + this.shape.guid + "_toshapes", "Convert to shapes", ee), this.contextMenu.removeItem("i" + this.shape.guid + "_topath")) : this.contextMenu.items.find((i) => i.id === "i" + this.shape.guid + "_topath") || (this.contextMenu.addItem("i" + this.shape.guid + "_topath", "Convert to path", te), this.contextMenu.removeItem("i" + this.shape.guid + "_toshapes"));
  }, this.onAddPointClick = (e) => {
    if (this.shape.options.maxPoints !== -1 && this.shape.points.length >= this.shape.options.maxPoints)
      return;
    const [i, s] = j(this.shape.root, e.cursorX, e.cursorY);
    if (this.shape.points.length < 2)
      this.shape.addPoint(i, s);
    else {
      const [o, n] = this.shape.getClosestLine(i, s);
      if (this.shape.getPointIndex(n) === 0)
        this.shape.addPoint(i, s);
      else {
        let h = o;
        this.shape.getPointIndex(n) > this.shape.getPointIndex(o) && (h = n), this.shape.insertPoint(i, s, h);
      }
    }
    this.shape.options.displayMode === A.DEFAULT && this.shape.switchDisplayMode(A.SELECTED);
  }, this.onCloneClick = (e) => {
    let i = this.shape;
    const s = i.getRootParent();
    s && s.options.groupChildShapes && (i = s);
    const o = i.clone({}, i.options.groupChildShapes), n = o.getPosition(!0);
    o.moveTo(n.left + 5, n.top + 5), SmartShapeManager.activateShape(o);
  }, this.onExportJsonClick = (e) => {
    let i = this.shape;
    const s = i.getRootParent();
    s && s.options.groupChildShapes && (i = s);
    const o = i.toJSON(i.options.groupChildShapes), n = new Blob([o]);
    this.saveToFile(n, this.getExportFileName("json"));
  }, this.onExportSvgClick = (e) => {
    let i = this.shape;
    const s = i.getRootParent();
    s && s.options.groupChildShapes && (i = s);
    const o = i.toSvg(), n = new Blob([o]);
    this.saveToFile(n, this.getExportFileName("svg"));
  }, this.onExportPngClick = async (e) => {
    let i = this.shape;
    const s = i.getRootParent();
    s && s.options.groupChildShapes && (i = s);
    const o = await i.toPng(V.BLOB);
    this.saveToFile(o, this.getExportFileName("png"));
  }, this.onGetBase64ToClipboardClick = async (e) => {
    let i = this.shape;
    const s = i.getRootParent();
    s && s.options.groupChildShapes && (i = s), await window.navigator.clipboard.writeText(await i.toPng(V.DATAURL));
  }, this.onDestroyClick = (e) => {
    const i = this.shape.getParent();
    i && i.options.groupChildShapes ? i.destroy() : this.shape.destroy();
  }, this.onMoveToTopClick = (e) => {
    const i = this.shape.getParent();
    i && i.options.groupChildShapes ? i.moveToTop() : this.shape.moveToTop();
  }, this.onMoveToBottomClick = (e) => {
    const i = this.shape.getParent();
    i && i.options.groupChildShapes ? i.moveToBottom() : this.shape.moveToBottom();
  }, this.onFlipHorizontalClick = (e) => {
    const i = this.shape.getParent();
    i && i.options.groupChildShapes ? i.flip(!0, !1) : (this.shape.flip(!0, !1), this.shape.redraw());
  }, this.onFlipVerticalClick = (e) => {
    const i = this.shape.getParent();
    i && i.options.groupChildShapes ? (i.flip(!1, !0), i.redraw(), i.redraw()) : (this.shape.flip(!1, !0), this.shape.redraw());
  }, this.onZoomInClick = (e) => {
    const i = this.shape.getRootParent() || this.shape;
    i.zoomBy(1 + i.options.zoomStep), i.redraw();
  }, this.onZoomOutClick = (e) => {
    const i = this.shape.getRootParent() || this.shape;
    i.zoomBy(1 - i.options.zoomStep), i.redraw();
  }, this.onResetZoomClick = (e) => {
    const i = this.shape.getRootParent() || this.shape;
    i.scaleBy(1 / i.options.zoomLevel, 1 / i.options.zoomLevel), i.options.zoomLevel = 1, i.redraw();
  }, this.saveToFile = (e, i) => {
    const s = window.URL.createObjectURL(e), o = document.createElement("a");
    o.download = i, o.href = s, document.body.appendChild(o), o.click(), document.body.removeChild(o), window.URL.revokeObjectURL(s);
  }, this.getExportFileName = (e) => {
    const s = this.shape.getRootParent() || this.shape;
    return (s.options.id ? s.options.id : "shape") + "." + e;
  }, this.removeMenuEventListeners = () => {
    this.contextMenu.removeEventListener("show", this.onShowListener);
  }, this.destroyContextMenu = () => {
    this.removeMenuEventListeners(), this.contextMenu.destroy();
  };
}
function P() {
  this.root = null, this.points = [], this.svg = null, this.polygon = null, this.groupHelper = null, this.eventListener = null, this.options = {
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
    displayMode: A.DEFAULT,
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
    zoomable: !0,
    zoomStep: 0.1,
    initialPoints: [],
    displayAsPath: !1,
    simpleMode: !1,
    scaleFactorX: 1,
    scaleFactorY: 1,
    rotateAngle: 0,
    flippedX: !1,
    flippedY: !1
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = z(), this.children = [], this.resizeBox = null, this.rotateBox = null, this.initCenter = null, this.shapeMenu = null, this.init = (t, e = null, i = null, s = !0) => {
    if (!t) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    if (c.getShape(this)) {
      console.error("This shape already initialized");
      return;
    }
    return this.root = t, this.root.style.position = "relative", this.shapeMenu = new me(this), this.eventListener = new le(this), this.setOptions(e), this.groupHelper = new ht(this), i && i.length && this.setupPoints(i, b({}, this.options.pointOptions)), this.eventListener.run(), s && (this.applyDisplayMode(), this.redraw()), (i && i.length || this.options.forceCreateEvent) && r.emit(l.SHAPE_CREATE, this, {}), this;
  }, this.setOptions = (t) => {
    !t || typeof t != "object" || (S(t.visible) && t.visible !== this.options.visible && (this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: t.visible } }), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: t.visible } })), S(t.fillGradient) && (this.options.fillGradient = {}), S(t.fillImage) && (this.options.fillImage = {}), this.options = b(this.options, t), this.options.simpleMode || this.points.filter((e) => typeof e.setOptions == "function").forEach((e) => {
      e.setOptions(b({}, this.options.pointOptions)), e.options.bounds = this.getBounds(), e.options.visible = t.visible, e.options.zIndex <= this.options.zIndex && (e.options.zIndex = this.options.zIndex + 1), e.redraw();
    }), this.options.hasContextMenu && this.shapeMenu.updateContextMenu());
  }, this.setupPoints = (t, e = {}) => {
    this.points = [], this.isNewObject = !0, this.addPoints(t, b({}, e)), this.isNewObject = !1, this.calcPosition();
  }, this.addPoint = (t, e, i = {}) => {
    let s = this.putPoint(t, e, b({}, this.options.pointOptions, i));
    if (!s)
      return null;
    if (this.options.displayMode !== A.DEFAULT && (i.createDOMElement = !0), s = s.init(t, e, i), s.element) {
      try {
        this.root.appendChild(s.element);
      } catch {
      }
      s.updateContextMenu();
    }
    return this.redraw(), this.options.hasContextMenu && !this.shapeMenu.contextMenu && this.shapeMenu.updateContextMenu(), s;
  }, this.insertPoint = (t, e, i, s = {}) => {
    let o = this.putPoint(t, e, b({}, this.options.pointOptions, s), i);
    if (!o)
      return null;
    this.options.displayMode !== A.DEFAULT && (s.createDOMElement = !0), o = o.init(t, e, s);
    try {
      this.root.appendChild(o.element);
    } catch {
    }
    return o.updateContextMenu(), this.redraw(), this.options.hasContextMenu && !this.shapeMenu.contextMenu && this.shapeMenu.updateContextMenu(), o;
  }, this.addPoints = (t, e = {}) => {
    if (!(!t || typeof t != "object")) {
      if (this.options.simpleMode)
        typeof t[0].x < "u" ? this.points = b({}, t) : this.points = t.map((i) => ({ x: i[0], y: i[1] }));
      else
        for (let i of t) {
          const s = typeof i.x < "u" ? i.x : i[0], o = typeof i.y < "u" ? i.y : i[1];
          this.options.displayMode !== A.DEFAULT && (e.createDOMElement = !0);
          const n = this.putPoint(
            s,
            o,
            b({}, this.options.pointOptions, e)
          );
          if (n && (n.init(n.x, n.y, e), n.element))
            try {
              this.root.appendChild(n.element), n.redraw();
            } catch {
            }
        }
      this.options.hasContextMenu && !this.shapeMenu.contextMenu && this.shapeMenu.updateContextMenu();
    }
  }, this.putPoint = (t, e, i = {}, s = null) => {
    let o = this.getPointIndex(s);
    if (s && o === -1 || !this.isNewObject && this.findPoint(t, e))
      return null;
    i.bounds = this.getBounds(), i.zIndex = this.options.zIndex + 1;
    const n = new he();
    return n.x = t, n.y = e, this.options.displayMode !== A.DEFAULT && (i.createDOMElement = !0), n.setOptions(i), s && o !== -1 ? this.points.splice(o, 0, n) : this.points.push(n), n;
  }, this.getClosestPoint = (t, e, i = null) => {
    if (i || (i = this.getPointsArray()), !i || !i.length)
      return null;
    if (i = i.filter(([o, n]) => !isNaN(parseFloat(o)) && !isNaN(parseFloat(n))), i.length === 1)
      return this.points[0];
    if (!i || !i.length)
      return null;
    const s = i.map(([o, n]) => ({ x: o, y: n, d: O(t, e, o, n) })).reduce((o, n) => o.d < n.d ? o : n);
    return this.findPoint(s.x, s.y);
  }, this.getClosestLine = (t, e) => this.points.map((i, s) => {
    let o = null;
    return s < this.points.length - 1 ? o = this.points[s + 1] : o = this.points[0], [i, o, dt(t, e, i.x, i.y, o.x, o.y)];
  }).filter((i) => i[2] >= 0).reduce((i, s) => i[2] < s[2] ? i : s), this.getPointIndex = (t) => {
    if (t && t.length) {
      if (t.length !== 2)
        return -1;
      t = this.findPoint(...t);
    }
    return !t || !this.isShapePoint(t) ? -1 : this.points.indexOf(t);
  }, this.deleteAllPoints = () => {
    if (this.options.simpleMode)
      this.points = [];
    else
      for (; this.points.length; )
        this.points[0].destroy();
  }, this.deletePoint = (t, e) => {
    if (this.points.length - 1 < this.options.minPoints)
      return;
    const i = this.findPoint(t, e);
    i && typeof i.destroy == "function" ? i.destroy() : this.points.splice(this.points.indexOf(i), 1);
  }, this.findPoint = (t, e) => {
    const i = this.points.find((s) => s.x === t && s.y === e);
    return typeof i > "u" || !i ? null : i;
  }, this.findPointById = (t) => {
    const e = this.points.find((i) => i.options && i.options.id === t);
    return typeof e > "u" || !e ? null : e;
  }, this.getPointsArray = () => {
    let t = [];
    return this.points && typeof this.points == "object" && this.points.length && (t = this.points.map((e) => [e.x, e.y])), t;
  }, this.moveTo = (t, e, i = !0, s = !0, o = !1) => {
    const n = this.getBounds(), h = this.getPosition(this.options.groupChildShapes);
    let a = t, p = e;
    s && (a = t + h.width > n.right ? n.right - h.width : t, p = e + h.height > n.bottom ? n.bottom - h.height : e), this.moveBy(a - h.left, p - h.top, i, o);
  }, this.moveBy = (t, e, i = !0, s = !1) => {
    for (let n in this.points)
      this.points[n].x += t, this.points[n].y += e, !this.options.simpleMode && i && typeof this.points[n].redraw == "function" && this.points[n].redraw();
    this.options.offsetX += t, this.options.offsetY += e, this.left += t, this.top += e, this.right += t, this.bottom += e, this.width = this.right - this.left, this.height = this.bottom - this.top;
    const o = this.getChildren(!0);
    i && (s ? this.svg && (this.svg.style.left = this.left + "px", this.svg.style.top = this.top + "px") : this.redraw()), o.length && this.options.groupChildShapes && o.forEach((n) => n.moveBy(t, e, i, s)), s && !this.getParent() && (v.redrawResizeBox(this), v.redrawRotateBox(this));
  }, this.scaleTo = (t = null, e = null, i = null) => {
    const s = this.getBounds();
    if (this.calcPosition(), !t && !e)
      return null;
    const o = this.getPosition(i || this.options.groupChildShapes);
    if (o.width === t && o.height === e)
      return;
    [t, e] = this.applyScaleRestriction(...tt(t, e, o.width, o.height)), o.width >= 10 && t < 10 && (t = 10), o.height >= 10 && e < 10 && (e = 10);
    let n = M(o.left) + t > s.right && s.right !== -1 ? s.right - M(o.left) : t, h = M(o.top) + e > s.bottom && s.bottom !== -1 ? s.bottom - M(o.top) : e, a = M(n / o.width), p = M(h / o.height);
    this.scaleBy(a, p, i);
  }, this.scaleBy = (t = null, e = null, i = null) => {
    if (t === 1 && e === 1)
      return;
    const s = this.getPosition(i || this.options.groupChildShapes);
    this.points.forEach(
      (o) => {
        o.x = (o.x - s.left) * t + s.left, o.y = (o.y - s.top) * e + s.top;
      }
    ), this.width *= t, this.height *= e, this.options.scaleFactorX *= t, this.options.scaleFactorY *= e, (this.options.groupChildShapes || i) && this.getChildren(!0).forEach((o) => {
      o.points.forEach(
        (n) => {
          n.x = (n.x - s.left) * t + s.left, n.y = (n.y - s.top) * e + s.top;
        }
      ), o.width *= t, o.height *= e, o.options.scaleFactorX *= t, o.options.scaleFactorY *= e;
    });
  }, this.zoomBy = (t) => {
    this.options.zoomLevel *= t, this.scaleBy(t, t), this.options.groupChildShapes && this.getChildren(!0).forEach((e) => e.options.zoomLevel *= t);
  }, this.applyScaleRestriction = (t, e) => (this.options.minWidth !== -1 && t < this.options.minWidth && (t = this.options.minWidth), this.options.minWidth !== -1 && e < this.options.minHeight && (e = this.options.minHeight), this.options.minWidth !== -1 && t > this.options.maxWidth && (t = this.options.maxWidth), this.options.minWidth !== -1 && e > this.options.maxHeight && (e = this.options.maxHeight), [t, e]), this.rotateBy = (t, e = null, i = null, s = !1) => {
    this.calcPosition();
    const o = this.getPosition(this.options.groupChildShapes);
    [e, i] = this.getRotateCenter(e, i), !(s && (!this.isInBounds(...R(t, o.left, o.top, e, i)) || !this.isInBounds(...R(t, o.right, o.top, e, i)) || !this.isInBounds(...R(t, o.left, o.bottom, e, i)) || !this.isInBounds(...R(t, o.right, o.bottom, e, i)))) && (this.points.forEach((n) => {
      typeof n.rotateBy == "function" ? n.rotateBy(t, e, i) : [n.x, n.y] = R(t, n.x, n.y, e, i);
    }), this.options.rotateAngle += t, this.options.groupChildShapes && this.getChildren(!0).forEach((n) => n.rotateBy(t, e, i, !1)));
  }, this.getRotateCenter = (t, e) => {
    const i = this.getRootParent(!0);
    let s, o;
    return i && i.options.groupChildShapes ? [s, o] = i.getCenter(i.options.groupChildShapes) : [s, o] = this.getCenter(this.options.groupChildShapes), this.initCenter && ([t, e] = this.initCenter), t || (t = s), e || (e = o), [t, e];
  }, this.flip = (t, e, i) => {
    if (!t && !e)
      return;
    i = i || this.options.groupChildShapes, this.calcPosition();
    const s = this.getPosition(i);
    this.points.forEach((o) => this.flipPoint(o, t, e, s)), t && (this.options.flippedX = !this.options.flippedX), e && (this.options.flippedY = !this.options.flippedY), this.flipChildren(t, e, s, i);
  }, this.flipChildren = (t, e, i, s) => {
    let o = s ? this.getChildren(!0) : null;
    o && o.forEach((n) => {
      t && (n.options.flippedX = !n.options.flippedX, n.options.flippedY = !n.options.flippedY), n.points.forEach((h) => n.flipPoint(h, t, e, i));
    });
  }, this.flipPoint = (t, e, i, s) => ([t.x, t.y] = k(t.x, t.y, e, i, s), t), this.moveToTop = () => {
    v.moveShapeToTop(this);
  }, this.moveToBottom = () => {
    v.moveShapeToBottom(this);
  }, this.changeZIndex = (t) => {
    v.changeShapeZIndex(this, t);
  }, this.isInBounds = (t, e) => {
    const [i, s] = this.getMaxPointSize(), o = this.getBounds();
    return t >= o.left + i / 2 && t <= o.right - i / 2 && e >= o.top + s / 2 && e <= o.bottom - s / 2;
  }, this.redraw = () => {
    this.applyDisplayMode(), v.draw(this), this.options.groupChildShapes && this.redrawChildren();
  }, this.redrawChildren = () => {
    this.getChildren().forEach((t) => {
      this.options.displayAsPath ? this.options.displayMode !== A.DEFAULT && t.points.filter((e) => e.element).forEach((e) => e.redraw()) : t.redraw();
    });
  }, this.applyDisplayMode = () => {
    this.points.filter((t) => typeof t.setOptions == "function").forEach((t) => {
      const e = { zIndex: this.options.zIndex + 15 };
      e.createDOMElement = this.options.displayMode !== A.DEFAULT, t.setOptions(e), e.createDOMElement && !t.element && t.redraw(), t.element && (t.element.style.zIndex = t.options.zIndex, this.options.displayMode === A.DEFAULT && !t.options.forceDisplay ? t.element.style.display = "none" : t.element.style.display = "");
    }), this.options.groupChildShapes && this.applyChildrenDisplayMode();
  }, this.applyChildrenDisplayMode = () => {
    this.getChildren(!0).forEach((t) => {
      t.points.filter((e) => typeof e.setOptions == "function").forEach((e) => {
        e.setOptions({ createDOMElement: this.options.displayMode !== A.DEFAULT }), e.options.createDOMElement && !e.element && e.redraw(), e.options.visible && !e.options.hidden && e.options.canDrag && e.element ? e.element.style.display = "" : e.element && (e.element.style.display = "none");
      }), t.options.displayMode = this.options.displayMode;
    });
  }, this.switchDisplayMode = (t = null) => {
    t || (t = this.getNextDisplayMode()), (t === A.SCALE && !this.options.canScale || t === A.ROTATE && !this.options.canRotate || t === A.SELECTED && this.points.length && !this.options.pointOptions.canDrag) && (t = A.DEFAULT), this.options.displayMode = t, this.options.simpleMode ? this.applyDisplayMode() : this.redraw(), t === A.DEFAULT && this.options.groupChildShapes && setTimeout(() => {
      this.getChildren(!0).forEach((e) => {
        e.switchDisplayMode(t);
      });
    }, 10);
  }, this.getNextDisplayMode = () => {
    let t;
    return this.options.displayMode === A.DEFAULT ? t = A.SELECTED : this.options.displayMode === A.SELECTED ? t = A.SCALE : this.options.displayMode === A.SCALE ? t = A.ROTATE : t = A.DEFAULT, t === A.SELECTED && !this.options.pointOptions.canDrag && (t = A.SCALE), t === A.SCALE && !this.options.canScale && (t = A.ROTATE), t === A.ROTATE && !this.options.canRotate && (t = A.DEFAULT), t;
  }, this.calcPosition = () => {
    !this.points.length || Object.assign(this, this.calcPositionFromPointsArray(this.getPointsArray()));
  }, this.updatePosition = (t, e, i) => {
    t < this.left && (i ? this.left = this.oldLeft : (this.oldLeft = this.left, this.left = t)), t > this.right && (i ? this.right = this.oldRight : (this.oldRight = this.right, this.right = t)), e < this.top && (i ? this.top = this.oldTop : (this.oldTop = this.top, this.top = e)), e > this.bottom && (i ? this.bottom = this.oldBottom : (this.oldBottom = this.bottom, this.bottom = e)), this.width = this.right - this.left || 1, this.height = this.bottom - this.top || 1;
  }, this.calcPositionFromPointsArray = (t) => {
    const e = {};
    return e.left = t.map((i) => i[0]).reduce((i, s) => s < i ? s : i), e.top = t.map((i) => i[1]).reduce((i, s) => s < i ? s : i), e.right = t.map((i) => i[0]).reduce((i, s) => s > i ? s : i), e.bottom = t.map((i) => i[1]).reduce((i, s) => s > i ? s : i), e.width = M(e.right - e.left) || 1, e.height = M(e.bottom - e.top) || 1, e;
  }, this.getPosition = (t = !1) => t ? this.groupHelper.getPosition() : {
    top: this.top,
    left: this.left,
    bottom: this.bottom,
    right: this.right,
    width: parseFloat(this.width),
    height: parseFloat(this.height)
  }, this.getBounds = () => {
    let t = this.root.clientLeft, e = this.root.clientLeft + this.root.clientWidth, i = this.root.clientTop, s = this.root.clientTop + this.root.clientHeight;
    return this.options.bounds.left !== -1 && (t = this.options.bounds.left), this.options.bounds.right !== -1 && (e = this.options.bounds.right), this.options.bounds.top !== -1 && (i = this.options.bounds.top), this.options.bounds.bottom !== -1 && (s = this.options.bounds.bottom), this.root.style.display === "none" && (t = -1, i = -1, e = -1, s = -1), { left: t, top: i, right: e, bottom: s };
  }, this.isShapePoint = (t) => !!this.points.find((e) => e === t), this.belongsToShape = (t, e, i = !0) => {
    if (!this.isInShapePolygon(t, e))
      return !1;
    const s = U(this.root);
    if (this.findPoint(t - s.left, e - s.top))
      return !0;
    let o = this.getPointsArray();
    return i && (o = o.map((n) => [n[0] + s.left, n[1] + s.top])), ut(o, [t, e]);
  }, this.isInShapePolygon = (t, e) => {
    const i = U(this.root);
    return t >= this.left + i.left && t <= this.right + i.left && e >= this.top + i.top && e <= this.bottom + i.top;
  }, this.addEventListener = (t, e) => this.eventListener.addEventListener(t, e), this.removeEventListener = (t, e) => {
    this.eventListener.removeEventListener(t, e);
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.getChildren().forEach((t) => {
      t.options.visible = !0;
    }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.getChildren().forEach((t) => {
      t.options.visible = !1;
    }), this.redraw();
  }, this.destroy = () => {
    if (r.emit(l.SHAPE_DESTROY, this, {}), this.eventListener && this.eventListener.destroy(), this.resizeBox && this.resizeBox.destroy(), this.rotateBox && this.rotateBox.destroy(), this.root)
      try {
        this.svg && this.root.removeChild(this.svg), this.points.filter((e) => e.element).forEach((e) => this.root.removeChild(e.element));
      } catch {
      }
    this.options.groupChildShapes && this.getChildren(!0).forEach((e) => {
      e.destroy();
    }), this.shapeMenu && this.shapeMenu.contextMenu && this.shapeMenu.destroyContextMenu();
    const t = this.getParent();
    t && t.removeChild(this), this.points.filter((e) => typeof e.destroy == "function").forEach((e) => e.destroy()), this.points = [];
  }, this.setupResizeBox = () => {
    if (!this.points.length)
      return null;
    const t = this.getResizeBoxBounds();
    this.resizeBox = new at().init(this.root, t.left, t.top, t.width, t.height, {
      zIndex: this.options.zIndex + 1,
      id: this.options.id + "_resizebox",
      shapeOptions: {
        canDragShape: !1,
        visible: this.options.visible,
        managed: !1,
        hasContextMenu: !1
      }
    }), this.resizeBox.redraw(), this.eventListener.addResizeEventListener();
  }, this.setupRotateBox = () => {
    if (!this.points.length)
      return null;
    const t = this.getResizeBoxBounds();
    this.rotateBox = new rt().init(this.root, t.left, t.top, t.width, t.height, {
      zIndex: this.options.zIndex + 1,
      id: this.options.id + "_rotatebox",
      shapeOptions: {
        canDragShape: !1,
        visible: this.options.visible,
        managed: !1,
        hasContextMenu: !1
      }
    }), this.rotateBox.redraw(), this.eventListener.addRotateEventListener();
  }, this.getResizeBoxBounds = () => {
    let t = this.getPosition(this.options.groupChildShapes);
    const e = this.getRootParent(!0);
    e && e.options.groupChildShapes && (e.options.displayAsPath ? t = e.getPosition(e.options.groupChildShapes) : t = this.getPosition(this.options.groupChildShapes));
    const [i, s] = this.getMaxPointSize();
    return {
      left: t.left - i,
      right: t.right + i,
      top: t.top - s,
      bottom: t.bottom + s,
      width: t.width + i * 2,
      height: t.height + s * 2
    };
  }, this.getMaxPointSize = () => {
    if (!this.points.length)
      return [0, 0];
    const t = this.points.map((i) => i.options ? i.options.width : 0).reduce((i, s) => Math.max(i, s)), e = this.points.map((i) => i.options ? i.options.height : 0).reduce((i, s) => Math.max(i, s));
    return [t, e];
  }, this.getCenter = (t = !1) => {
    const e = this.getPosition(t);
    return [e.left + e.width / 2, e.top + e.height / 2];
  }, this.getShapeSvg = () => v.getShapeSvg(this), this.toSvg = (t = null) => v.toSvg(this, t), this.toPng = (t = V.DATAURL, e = null, i = null, s = null) => v.toPng(this, t, e, i, s), this.toJSON = (t = !0, e = !1) => JSON.stringify(this.getJSON(t, e)), this.clone = (t = {}, e = !0) => {
    const i = b({}, this.getJSON(e));
    i.parent_guid = this.guid, i.options = b(i.options, t);
    const s = new P().fromJSON(this.root, i, e);
    return s ? (s.getChildren(!0).forEach((o) => {
      o.options.id += "_" + c.length(), o.options.name += " " + c.length();
    }), s) : null;
  }, this.getJSON = (t = !0, e = !1) => {
    const i = {
      options: b({}, this.options)
    };
    if (i.options.displayMode = A.DEFAULT, e || this.options.compactExport ? i.points = this.points.map((s) => [s.x, s.y]) : i.points = this.points.filter((s) => typeof s.getJSON == "function").map((s) => s.getJSON()), t) {
      let s = this.getChildren();
      s.length && (i.children = s.map(
        (o) => o.getJSON(t, e || this.options.compactExport)
      ));
    }
    return i;
  }, this.fromJSON = (t, e, i = !0, s = !0) => {
    let o = typeof e == "string" ? W(e) : e;
    if (!o)
      return null;
    if (this.root = t, c.findShapeById(o.options.id) && (o.options.id += "_" + c.length(), o.options.name += " " + c.length()), this.svg ? this.setOptions(o.options) : (o.options.forceCreateEvent = !1, this.init(t, o.options, null, !1)), o.points.forEach((n) => {
      let h;
      n.length ? (h = this.putPoint(n[0], n[1]), h.setOptions(o.options.pointOptions || {})) : h = this.putPoint(n.x, n.y, n.options || o.options.pointOptions), h && h.updateContextMenu();
    }), c.addShape(this), i && typeof o.children < "u" && o.children && (this.getChildren(!0).forEach((n) => n.destroy()), o.children.forEach((n) => {
      n.parent_guid = this.guid, this.addChild(new P().fromJSON(t, n));
    })), s) {
      const n = c.getShapeByGuid(o.parent_guid);
      r.emit(l.SHAPE_CREATE, this, { parent: n });
    }
    return this;
  }, this.addChild = (t, e) => this.groupHelper.addChild(t, e), this.addChildren = (t = []) => this.groupHelper.addChildren(t), this.removeChild = (t) => this.groupHelper.removeChild(t), this.removeAllChildren = (t = !1) => this.groupHelper.removeAllChildren(t), this.getChildren = (t = !1) => this.groupHelper.getChildren(t), this.hasChild = (t, e = !1) => this.groupHelper.hasChild(t, e), this.getParent = () => this.groupHelper.getParent(), this.getRootParent = (t = null) => this.groupHelper.getRootParent(t), this.getParentsList = (t = []) => this.groupHelper.getParentsList(t), this.mapCurrentPointToOriginal = (t, e) => X(
    t,
    e,
    G.CURRENT_TO_ORIGINAL,
    {
      ...this.options,
      ...this.getPosition(this.options.groupChildShapes)
    }
  ), this.mapOriginalPointToCurrent = (t, e) => X(
    t,
    e,
    G.ORIGINAL_TO_CURRENT,
    {
      ...this.options,
      ...this.getPosition(this.options.groupChildShapes)
    }
  );
}
const A = {
  DEFAULT: "default",
  SELECTED: "selected",
  SCALE: "scale",
  ROTATE: "rotate"
};
function at() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = z(), this.options = {
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
    zIndex: 1e3,
    onlyMove: !1
  }, this.eventListener = null, this.left_top = null, this.left_center = null, this.left_bottom = null, this.center_top = null, this.center_bottom = null, this.right_top = null, this.right_center = null, this.right_bottom = null, this.init = (t, e, i, s, o, n = {}) => (this.left = parseInt(e), this.top = parseInt(i), this.width = parseInt(s), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new P().init(t, b({}, this.options.shapeOptions), []), r.emit(l.SHAPE_CREATE, this.shape, {}), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new ae(this).run(), this), this.setOptions = (t = {}) => {
    !t || typeof t != "object" || (this.options = b(this.options, t), this.options.shapeOptions.zIndex = this.options.zIndex || 1e3, this.options.shapeOptions.id = this.options.id || "", this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.putPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + kt + "')" } }), this.center_top = this.shape.putPoint(this.left + this.width / 2, this.top, { id: this.shape.guid + "_center_top", style: { backgroundImage: "url('" + Nt + "')" } }), this.right_top = this.shape.putPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + Qt + "')" } }), this.right_center = this.shape.putPoint(this.right, this.top + this.height / 2, { id: this.shape.guid + "_right_center", style: { backgroundImage: "url('" + Wt + "')" } }), this.right_bottom = this.shape.putPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + Ft + "')" } }), this.center_bottom = this.shape.putPoint(this.left + this.width / 2, this.bottom, { id: this.shape.guid + "_center_bottom", style: { backgroundImage: "url('" + zt + "')" } }), this.left_bottom = this.shape.putPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + Ht + "')" } }), this.left_center = this.shape.putPoint(this.left, this.top + this.height / 2, { id: this.shape.guid + "_left_center", style: { backgroundImage: "url('" + Gt + "')" } }), this.setPointsOptions();
  }, this.setPointsOptions = () => {
    this.setPointsMoveDirections(), this.setPointsMoveBounds();
  }, this.setPointsMoveDirections = () => {
    this.center_top.setOptions({ moveDirections: [E.TOP, E.BOTTOM] }), this.center_bottom.setOptions({ moveDirections: [E.TOP, E.BOTTOM] }), this.left_center.setOptions({ moveDirections: [E.LEFT, E.RIGHT] }), this.right_center.setOptions({ moveDirections: [E.LEFT, E.RIGHT] });
  }, this.setPointsMoveBounds = () => {
    this.left_top.options.bounds.bottom = this.left_bottom.y - this.left_bottom.options.height - this.left_center.options.height, this.left_top.options.bounds.right = this.right_top.x - this.right_top.options.width - this.center_top.options.width, this.center_top.options.bounds.bottom = this.left_bottom.y - this.left_bottom.options.height - this.left_center.options.height, this.right_top.options.bounds.bottom = this.left_bottom.y - this.left_bottom.options.height - this.left_center.options.height, this.right_top.options.bounds.left = this.left_top.x + this.right_top.options.width + this.center_top.options.width, this.right_center.options.bounds.left = this.left_top.x + this.right_center.options.width + this.center_top.options.width, this.right_bottom.options.bounds.left = this.left_top.x + this.right_bottom.options.width + this.center_bottom.options.width, this.right_bottom.options.bounds.top = this.right_top.y + this.right_top.options.height + this.right_center.options.height, this.center_bottom.options.bounds.top = this.center_top.y + this.center_top.options.height + this.right_center.options.height, this.left_bottom.options.bounds.right = this.right_bottom.x - this.right_bottom.options.width - this.center_bottom.options.width, this.left_bottom.options.bounds.top = this.left_top.y + this.left_top.options.height + this.left_center.options.height, this.left_center.options.bounds.right = this.right_center.x - this.right_center.options.width - this.center_top.options.width;
  }, this.adjustCoordinates = () => {
    this.right = this.left + this.width, this.bottom = this.top + this.height, this.left_top.x = this.left, this.left_top.y = this.top, this.right_top.x = this.right, this.right_top.y = this.top, this.left_bottom.x = this.left, this.left_bottom.y = this.bottom, this.right_bottom.x = this.right, this.right_bottom.y = this.bottom, this.center_top.y = this.top, this.center_bottom.y = this.bottom, this.left_center.x = this.left, this.right_center.x = this.right, this.adjustCenters();
  }, this.adjustCenters = () => {
    this.center_top.x = parseInt(this.left_top.x + (this.right_top.x - this.left_top.x) / 2), this.center_bottom.x = parseInt(this.left_top.x + (this.right_top.x - this.left_top.x) / 2), this.left_center.y = parseInt(this.left_top.y + (this.left_bottom.y - this.left_top.y) / 2), this.right_center.y = parseInt(this.right_top.y + (this.right_bottom.y - this.right_top.y) / 2);
  }, this.calcPosition = () => {
    this.shape.calcPosition(), this.left = this.shape.left, this.top = this.shape.top, this.bottom = this.shape.bottom, this.right = this.shape.right, this.width = this.shape.width, this.height = this.shape.height;
  }, this.getPosition = () => ({ top: this.top, left: this.left, bottom: this.bottom, right: this.right, width: this.width, height: this.height }), this.redraw = () => {
    this.adjustCoordinates(), this.shape.setOptions(this.options.shapeOptions), this.setPointsMoveBounds(), this.shape.redraw(), this.applyOnlyMove();
  }, this.show = () => {
    this.options.shapeOptions.visible = !0, this.shape.show();
  }, this.hide = () => {
    this.options.shapeOptions.visible = !1, this.shape.hide();
  }, this.destroy = () => {
    r.emit(l.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (t, e) => this.eventListener.addEventListener(t, e), this.removeEventListener = (t, e) => {
    this.eventListener.removeEventListener(t, e);
  }, this.applyOnlyMove = () => {
    this.options.onlyMove ? (this.shape.svg.style.opacity = 0, this.shape.points.forEach((t) => {
      t.options.visible = !1, t.element && t.redraw();
    })) : (this.shape.svg.style.opacity = 1, this.shape.points.forEach((t) => {
      t.options.visible = this.shape.options.visible, t.element && t.redraw();
    }));
  };
}
try {
  window.ResizeBox = at, window.SmartShape = P, window.RotateBox = rt, window.SmartShapeManager = c, window.SmartShapeGroupHelper = ht, window.SmartShapeDisplayMode = A, window.ShapeEvents = l, window.createEvent = u, window.getMousePos = j, window.getMouseCursorPos = Q;
} catch {
}
export {
  r as EventsManager,
  at as ResizeBox,
  rt as RotateBox,
  l as ShapeEvents,
  P as SmartShape,
  A as SmartShapeDisplayMode,
  le as SmartShapeEventListener,
  ht as SmartShapeGroupHelper,
  c as SmartShapeManager,
  u as createEvent,
  Q as getMouseCursorPos,
  j as getMousePos
};
//# sourceMappingURL=smart_shape.js.map
