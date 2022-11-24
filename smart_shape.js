function lt() {
  this.subscriptions = {}, this.subscribe = (e, t) => {
    if (typeof e == "string")
      return this.subscribeToEvent(e, t);
    if (typeof e == "object") {
      for (let i of e)
        this.subscribeToEvent(i, t);
      return t;
    }
    return null;
  }, this.subscribeToEvent = (e, t) => ((typeof this.subscriptions[e] > "u" || !this.subscriptions[e]) && (this.subscriptions[e] = []), typeof this.subscriptions[e].find((i) => i === t) < "u" ? null : (this.subscriptions[e].push(t), t)), this.emit = (e, t, i = null) => {
    if ((!i || typeof i != "object") && (i = {}), i.type = e, i.target = t, typeof this.subscriptions[e] < "u" && this.subscriptions[e] && this.subscriptions[e].length) {
      for (let s of this.subscriptions[e])
        s(i);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (e, t) => {
    let i = !1;
    if (typeof e == "string")
      this.unsubscribeFromEvent(e, t) && (i = !0);
    else if (typeof e == "object")
      for (let s of e)
        this.unsubscribeFromEvent(s, t) && (i = !0);
    return i;
  }, this.unsubscribeFromEvent = (e, t) => {
    if (typeof this.subscriptions[e] > "u" || !this.subscriptions[e])
      return !1;
    const i = this.subscriptions[e].indexOf(t);
    return i !== -1 ? (this.subscriptions[e].splice(i, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const r = new lt(), pt = (e) => e * (Math.PI / 180), At = (e) => e * (180 / Math.PI), R = (e, t, i, s, o) => {
  if (e === 0)
    return [t, i];
  const n = pt(e), h = (t - s) * Math.cos(n) - (i - o) * Math.sin(n) + s, p = (t - s) * Math.sin(n) + (i - o) * Math.cos(n) + o;
  return [h, p];
}, O = (e, t, i, s) => Math.sqrt(Math.pow(i - e, 2) + Math.pow(s - t, 2)), dt = (e, t, i, s, o, n) => {
  let h = (e - i) * (o - i) + (t - s) * (n - s);
  const p = Math.pow(o - i, 2) + Math.pow(n - s, 2);
  return p === 0 ? -1 : (h /= p, h < 0 ? h = 0 : h > 1 && (h = 1), Math.sqrt(Math.pow(i - e + h * (o - i), 2) + Math.pow(s - t + h * (n - s), 2)));
}, ut = (e, t) => {
  const i = (l, A, c) => A.x <= Math.max(l.x, c.x) && A.x >= Math.min(l.x, c.x) && A.y <= Math.max(l.y, c.y) && A.y >= Math.min(l.y, c.y), s = (l, A, c) => {
    let E = (A[1] - l[1]) * (c[0] - A[0]) - (A[0] - l[0]) * (c[1] - A[1]);
    return E === 0 ? 0 : E > 0 ? 1 : 2;
  }, o = (l, A, c, E) => {
    let x = s(l, A, c), N = s(l, A, E), D = s(c, E, l), y = s(c, E, A);
    return x !== N && D !== y || x === 0 && i(l, c, A) || N === 0 && i(l, E, A) || D === 0 && i(c, l, E) ? !0 : !!(y === 0 && i(c, A, E));
  };
  if (e.length < 3)
    return !1;
  let n = [1e4, t[1]], h = 0, p = 0;
  do {
    let l = (p + 1) % e.length;
    if (o(e[p], e[l], t, n)) {
      if (s(e[p], t, e[l]) === 0)
        return i(
          e[p],
          t,
          e[l]
        );
      h++;
    }
    p = l;
  } while (p !== 0);
  return h % 2 === 1;
}, tt = (e, t, i, s) => !e && !t || !i || !s ? [i, s] : e && t ? [e, t] : (e || (e = t * (i / s)), t || (t = e * (s / i)), [e, t]), X = (e, t, i, s) => {
  const o = s.scaleFactorX || 1, n = s.scaleFactorY || 1, h = s.offsetX || 0, p = s.offsetY || 0, l = s.flippedX || !1, A = s.flippedY || !1;
  return i === G.CURRENT_TO_ORIGINAL ? ([e, t] = k(e, t, l, A, s), e -= h, t -= p, e *= 1 / o, t *= 1 / n) : i === G.ORIGINAL_TO_CURRENT && (e *= o, t *= n, e += h, t += p, [e, t] = k(e, t, l, A, s)), [e, t];
}, k = (e, t, i, s, o) => (i && (e = C(o.right - e) + o.left), s && (t = C(o.bottom - t) + o.top), [e, t]), G = {
  CURRENT_TO_ORIGINAL: "current_to_original",
  ORIGINAL_TO_CURRENT: "original_to_current"
};
function gt(e) {
  return ct(e) && !ft(e);
}
function ct(e) {
  return !!e && typeof e == "object";
}
function ft(e) {
  const t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || St(e);
}
const mt = typeof Symbol == "function" && Symbol.for, Et = mt ? Symbol.for("react.element") : 60103;
function St(e) {
  return e.$$typeof === Et;
}
function bt(e) {
  return Array.isArray(e) ? [] : {};
}
function _(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? T(bt(e), e, t) : e;
}
function yt(e, t, i) {
  return e.concat(t).map(function(s) {
    return _(s, i);
  });
}
function vt(e, t) {
  if (!t.customMerge)
    return T;
  const i = t.customMerge(e);
  return typeof i == "function" ? i : T;
}
function xt(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return e.propertyIsEnumerable(t);
  }) : [];
}
function J(e) {
  return Object.keys(e).concat(xt(e));
}
function et(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function Mt(e, t) {
  return et(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function Ct(e, t, i) {
  const s = {};
  return i.isMergeableObject(e) && J(e).forEach(function(o) {
    s[o] = _(e[o], i);
  }), J(t).forEach(function(o) {
    Mt(e, o) || (et(e, o) && i.isMergeableObject(t[o]) ? s[o] = vt(o, i)(e[o], t[o], i) : s[o] = _(t[o], i));
  }), s;
}
const T = (e, t, i) => {
  i = i || {}, i.arrayMerge = i.arrayMerge || yt, i.isMergeableObject = i.isMergeableObject || gt, i.cloneUnlessOtherwiseSpecified = _;
  const s = Array.isArray(t), o = Array.isArray(e);
  return s === o ? s ? i.arrayMerge(e, t, i) : Ct(e, t, i) : _(t, i);
};
T.all = function(t, i) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(s, o) {
    return T(s, o, i);
  }, {});
};
const U = (e, t = !0) => {
  let i = 0, s = 0;
  if (!t)
    return { top: e.offsetTop - e.scrollTop, left: e.offsetLeft - e.scrollLeft };
  for (; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop); )
    i += e.offsetLeft - e.scrollLeft, s += e.offsetTop - e.scrollTop, e = e.offsetParent;
  return { top: s, left: i };
}, z = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
  const t = Math.random() * 16 | 0;
  return (e === "x" ? t : t & 3 | 8).toString(16);
}).replace(/-/g, ""), it = (e) => {
  try {
    e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault(), e.cancelBubble = !0, e.returnValue = !1;
  } catch {
  }
  return !1;
}, S = (e) => typeof e < "u" && e !== null, b = (...e) => {
  if (!e.length)
    return null;
  let t = e[0];
  if (e.length === 1)
    return t;
  for (let i = 1; i < e.length; i++)
    S(e[i]) && typeof e[i] == "object" && (t = T(t, e[i]));
  return t;
}, Bt = (e) => {
  const t = atob(e.split(",")[1]), i = e.split(",")[0].split(":")[1].split(";")[0], s = new ArrayBuffer(t.length), o = new Uint8Array(s);
  for (let n = 0; n < t.length; n++)
    o[n] = t.charCodeAt(n);
  return new Blob([s], { type: i });
}, K = (e) => new Promise((t) => {
  const i = new FileReader();
  i.onload = function(s) {
    t(s.target.result);
  }, i.readAsDataURL(e);
}), W = (e) => {
  try {
    return JSON.parse(e);
  } catch {
    return null;
  }
}, Ot = (e) => {
  let t = e, i = t.indexOf("-");
  for (; i !== -1; )
    t = t.replace("-" + t[i + 1], t[i + 1].toString().toUpperCase()), i = t.indexOf("-");
  return t;
}, C = (e) => e < 0 ? -e : e, Pt = (e) => new Promise((t) => {
  setTimeout(() => {
    t();
  }, e);
}), u = (e, t = {}) => {
  const i = {};
  for (let s in e)
    s !== "type" && s !== "target" && (i[s] = e[s]);
  return Object.keys(t).forEach((s) => {
    i[s] = t[s];
  }), i;
}, Q = (e, t = null) => (t || (t = e.target.root || e.target), j(t, e.pageX, e.pageY)), j = (e, t, i) => {
  const s = U(e, !0);
  return [t - s.left, i - s.top];
};
function Rt() {
  this.subscriptions = {}, this.subscribe = (e, t) => {
    if (typeof e == "string")
      return this.subscribeToEvent(e, t);
    if (typeof e == "object") {
      for (let i of e)
        this.subscribeToEvent(i, t);
      return t;
    }
    return null;
  }, this.subscribeToEvent = (e, t) => ((typeof this.subscriptions[e] > "u" || !this.subscriptions[e]) && (this.subscriptions[e] = []), typeof this.subscriptions[e].find((i) => i === t) < "u" ? null : (this.subscriptions[e].push(t), t)), this.emit = (e, t, i = null) => {
    if ((!i || typeof i != "object") && (i = {}), i.type = e, i.target = t, typeof this.subscriptions[e] < "u" && this.subscriptions[e] && this.subscriptions[e].length) {
      for (let s of this.subscriptions[e])
        s(i);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (e, t) => {
    let i = !1;
    if (typeof e == "string")
      this.unsubscribeFromEvent(e, t) && (i = !0);
    else if (typeof e == "object")
      for (let s of e)
        this.unsubscribeFromEvent(s, t) && (i = !0);
    return i;
  }, this.unsubscribeFromEvent = (e, t) => {
    if (typeof this.subscriptions[e] > "u" || !this.subscriptions[e])
      return !1;
    const i = this.subscriptions[e].indexOf(t);
    return i !== -1 ? (this.subscriptions[e].splice(i, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const M = new Rt();
function It(e) {
  this.menu = e, this.panelCssClass = "", this.itemCssClass = "", this.itemTextCssClass = "", this.itemImageCssClass = "", this.itemsCssClassesById = {}, this.setStyles = () => {
    if (!!this.menu.panel) {
      this.panelCssClass ? this.menu.panel.className = this.panelCssClass : (this.menu.panel.style.padding = "3px", this.menu.panel.style.borderStyle = "solid", this.menu.panel.style.borderColor = "#dddddd", this.menu.panel.style.borderWidth = "1px", this.menu.panel.style.backgroundColor = "#eeeeee", this.menu.panel.className = "");
      for (let t of this.menu.items)
        this.setItemStyles(t);
    }
  }, this.setItemStyles = (t) => {
    this.setItemDivStyles(t), this.setItemSpanStyles(t), this.setItemImageStyles(t);
  }, this.setItemDivStyles = (t) => {
    const i = this.menu.panel.querySelector("#" + t.id);
    !i || (i.style.display = "flex", i.style.flexDirection = "row", i.style.alignItems = "center", this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][B.ITEM] ? i.className = this.itemsCssClassesById[t.id][B.ITEM] : this.itemCssClass ? i.className = this.itemCssClass || "" : (i.className = "", i.style.paddingTop = "2px", i.style.paddingLeft = "3px", i.style.paddingRight = "3px", i.addEventListener("mouseover", () => {
      i.style.backgroundColor = "#0066CC", i.style.color = "white";
    }), i.addEventListener("mouseout", () => {
      i.style.backgroundColor = "transparent", i.style.color = "black";
    })), i.style.whiteSpace = "nowrap");
  }, this.setItemSpanStyles = (t) => {
    const i = this.menu.panel.querySelector("#" + t.id);
    if (!i)
      return;
    const s = i.querySelector("span");
    s && (this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][B.TEXT] ? s.className = this.itemsCssClassesById[t.id][B.TEXT] : this.itemTextCssClass ? s.className = this.itemTextCssClass : (s.className = "", s.style.color = "black"));
  }, this.setItemImageStyles = (t) => {
    const i = this.menu.panel.querySelector("#" + t.id);
    if (!i)
      return;
    const s = i.querySelector("img");
    s && (this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][B.IMAGE] ? s.className = this.itemsCssClassesById[t.id][B.IMAGE] : this.itemImageCssClass ? s.className = this.itemImageCssClass : s.className = "");
  }, this.setPanelClass = (t = null) => {
    this.panelCssClass = t || "";
  }, this.setItemClass = (t = null, i = null) => {
    if (i) {
      this.setClassForItem(i, B.ITEM, t);
      return;
    }
    this.itemCssClass = t || "";
  }, this.setTextClass = (t = null, i = null) => {
    if (i) {
      this.setClassForItem(i, B.TEXT, t);
      return;
    }
    this.itemTextCssClass = t || "";
  }, this.setImageClass = (t = null, i = null) => {
    if (i) {
      this.setClassForItem(i, B.IMAGE, t);
      return;
    }
    this.itemImageCssClass = t || "";
  }, this.setClassForItem = (t, i, s) => {
    (!this.itemsCssClassesById[t] || typeof this.itemsCssClassesById[t] > "u") && (this.itemsCssClassesById[t] = {}), this.itemsCssClassesById[t][i] = s;
  };
}
const B = {
  ITEM: "div",
  TEXT: "text",
  IMAGE: "image"
}, wt = (e, t = {}) => {
  const i = {};
  for (let s in e)
    s !== "type" && s !== "target" && (i[s] = e[s]);
  return Object.keys(t).forEach((s) => {
    i[s] = t[s];
  }), i;
};
function Tt(e, t, i = null, s = {}) {
  this.panel = null, this.container = t, this.items = e, this.event = i || "contextmenu", this.options = s, this.listeners = {}, this.origEvent = null, this.cursorX = 0, this.cursorY = 0, this.overflowY = "", this.maxImageHeight = 0, this.subscriptions = {}, this.init = () => (Object.assign(this, new It(this)), this.listener = (o) => (this.onEvent(o), !1), this.container.addEventListener(this.event, this.listener), M.emit(w.CREATE, this, { owner: this }), this), this.onEvent = (o) => {
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
      !this.origEvent || (M.emit(o, this.origEvent.target, wt(p, {
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
    if (!this.container || (M.emit(w.SHOW, this, { owner: this }), this.drawMenu(), !this.panel))
      return;
    this.panel.style.display = "";
    let o = this.cursorX, n = this.cursorY;
    this.panel.style.left = o + "px", this.panel.style.top = n + "px", this.panel.style.zIndex = "10000", this.panel.style.position = "absolute", o + this.panel.clientWidth > window.innerWidth && (o = window.innerWidth - this.panel.clientWidth - 10, this.panel.style.left = o + "px"), this.origEvent && this.origEvent.clientY + this.panel.clientHeight > window.innerHeight && (n = window.innerHeight - this.panel.clientHeight - 10, this.panel.style.top = n + "px");
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
    const h = M.subscribe(o, (p) => {
      p.owner === this && n(p);
    });
    return this.subscriptions[o].push(h), h;
  }, this.removeEventListener = (o, n) => {
    this.subscriptions[o] && typeof this.subscriptions[o] < "u" && this.subscriptions[o].splice(this.subscriptions[o].indexOf(n), 1), M.unsubscribe(o, n);
  }, this.on = (o, n) => this.addEventListener(o, n), this.off = (o, n) => {
    this.removeEventListener(o, n);
  }, this.removeAllEventListeners = () => {
    for (let o in this.subscriptions)
      for (let n of this.subscriptions[o])
        M.unsubscribe(o, n);
    if (this.container && this.container.removeEventListener(this.event, this.listener), this.subscriptions = {}, !!this.panel)
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
    this.panel && (this.panel.innerHTML = ""), this.panel = null, M.emit(w.DESTROY, this, { owner: this });
  };
}
const w = {
  CREATE: "create",
  DESTROY: "destroy",
  SHOW: "show"
};
function Dt() {
  this.menus = [], this.create = (e, t, i = "contextmenu", s = {}) => new Tt(e, t, i, s).init(), M.subscribe(w.CREATE, (e) => {
    this.menus.indexOf(e.target) === -1 && (this.menus.push(e.target), e.target.id = this.menus.length);
  }), M.subscribe(w.DESTROY, (e) => {
    this.menus.indexOf(e.target) !== -1 && this.menus.splice(this.menus.indexOf(e.target), 1);
  }), M.subscribe(w.SHOW, (e) => {
    this.menus.forEach((t) => {
      t !== e.target && t.hide();
    });
  }), document.addEventListener("mouseup", (e) => {
    e.button !== 2 && this.menus.forEach((t) => t.hide());
  });
}
const Y = new Dt();
try {
  window.Menus = Y;
} catch {
}
const Lt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECcZZuWhdAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlZBBEsAgCAMT/v/n7akzWAFtTo5mQ8SAJtkGcL4LXcg211A2L+eq3jc5C/AGTUBZ7wYAHH+B4yIAv8a8dkvilLz9qXuYKseU2E7qDFODqIwTIEkPSldAAa0WlbUAAAAASUVORK5CYII=", _t = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECgYlnqNLQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABZSURBVCjPlZFBCgAxCANN/v/n2VOhiFU3N4U4GgXELUkAikbOhlhIh1QZXkR3hGc/IsaVMtHT0RXR3e5jescIqBpy05T/tInffw2AvEkr972N+a69+U8e8AGOtEABr4X+4AAAAABJRU5ErkJggg==", Ut = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECkWaNmRawAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABjSURBVCjPlZBRDsAgCENbsnt6/1N0P2ocijASEy08iqC1BknhASCvsSeOQXImJXHcrQL4t1UAr4fjReDmdCsc/5LEZ7NOwOlUKVy3RwC/AAAwL2TAZ3t+xFszOxVl7lbtvsYLOtlZCOj2NccAAAAASUVORK5CYII=", Vt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECoXNPPyPgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlVFBEgAhCAL+/2f21I5jqcXFGRMSpG1EkLRtooEyIdaRlAc7orqBsg+gVKy8yTYn49vqMb0pgCUuPOBP93Sniaxb8/FdL6mt/rZe5SMKXQWRf/4AYrs6C0ViuwUAAAAASUVORK5CYII=", zt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDsHep3BSgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA8SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCAZy0h4AXLILDAEWNOwAAAAASUVORK5CYII=", Nt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDMMJZaSygAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA/SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCJxAWZoFp1MBY8cLTv/x72kAAAAASUVORK5CYII=", Ht = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQARsznxFAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", Gt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQEbSvcpSwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA3SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTCICjCTbxPJfsIWSv+JECM9nugHAG40DyW1OoLPAAAAAElFTkSuQmCC", kt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDIpd4l3zAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", Ft = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDYr/evT5AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", Wt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDUsSKIVhAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA0SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTBQZBPJfsIWSv+JECM9nugHADv6Dv2P6G4ZAAAAAElFTkSuQmCC", Qt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDQQftZYQgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", q = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAEDSURBVDjLzZPNSsQwEIC/CUWtQlnZi14EYb36Jj6DT+ZT+BSevImHPYggKLpo2bW1Ze14yJjFtKEed3poMpmvzZcf2LqQfkolZFV0FFDhkMI6JR99JAbczTlP/tGZung86yN7Spn+4ABw0PH5DyCoOoSvYOg00s9C+YSpL8oLGgMmnOILF2r68qvKibvWXd9hbsCZ/ajpLniULnKQO82tubb3vY3Uw9IrvhOmCaDFJYC2DyjLt1vNQGjzI5v7+1wrBWTN0uQ3R0OFfQRwz7PjS8td8UAHKFW0rCDqt0ud1mEfKlZ+bYYdNtGQjAFgh6L+M9sRQKev5Yu1F4zfh7ELtIXxA+JiW9aVMPJ4AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", st = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAACn0lEQVRIx+2U30tTYRzGn/fsPdOmNkWDsEDnOiFCbv4KhPJCFAvDtBuRyL/A64TwQkGaCt7pVYqimHhTJAVhuYsRE5zipLuZeQKNsMQdN1vbzvbtwg2Oa5s/uvWBl3Px8P18OO/7ngNc5H9DROw8XTxCumEiygJwjYh4kp7HuqzTiJLBc8aslr5+vbiy43SWaiVExHecztJ+vbgyZrX0EVHOqSVx+ERFee8wR3hcBNky+VpcEofbMvnauAga5ghPVJT3ppKwJIKsqRrr0/3P68+KdeAMgBIFfgjc/cT+6TEATNffmbkaVa1GASAAcgRq3i3L806Xe4gxdqjl8QS4ACBPDPibpIwjOAAUAOBR1fqy8e4MAFwXVGuuZlLi4ErA3wTgBREFGGPRdG+gCytKy3JDTdfvrxv12s4bOXrm6o7PGEok++2PrhHRaJxnjEXSblFMog/7lea1xn8liTGUSPaKD64RMdv4jjEWOvEMtJKIX2lev1fTFdhKLrlkkuyW964RXQo4kOY7ABBVNj0e+eDwMudAsiUfHF5WNj0eANFUkFRbxPdWl268elA3Wyyq1nwx+fBeGJDD3P3oraMjv6r2C2NMPVFARLq91SXpTUvdrEmvWgv0SJtfIWArxN0P5x0d+VW1G2kPOXZNC6dMma+LebD6SgI8o+imHQCC3zzHzuRnCJDVjJXOrT9tAL5rr+mxM4gV+w3dPY7CbCEkciC+DGbJXjS3PFo0tzxqMEt2bVeYLYQaunscAPa18KSJ/SrMyuSgTa4WgnIlaLtVWlR93jYi0hORXvV527ZbpUW5EiRXC0FlctBGROaz/o/Mvumhgd32soU4XNPrVZ+3bbe9bME3PTRwJniCxERE97VwrSTWmc4MTxSdp7vIqfMXBoR6XMSZc1QAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDB/NVeTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwDmjvLwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=", jt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAG6SURBVDjLlZK/TxNhGMc/z117FgWbNulITGMYTMvAaHAyhMTAIoOmcdD/wMWERdO4E8If4OJASBgcGcA4QRgx4YcLA4aUYDTRCoX2fj0OvTu441rwuem+7/N5n/f7PA/8ZwholiHuYCCXdMWnxYk4KYwWSws0+JX4GqUFLaqRVmHYWFUfTZ6I4U9ynKyRAUztoNsfq6f4gWrsDI6+VMGMPTMCwIHqGt+xA9Wq3uNFuukIoIUtduiYFs51QDIcwMSKrHn4otcBebJ4QfofmnghYKcANlCQxaj505xcAL0qGM1lFEXwwsH2B/zi0/DXXbps2k0YtDBxAbxvPbtUL7/Xi8HVy90ntXdwVUUgHKGADufedrJUsGKWd2857aXMXLAy4j7nUOxuhdabvfmR86/x0gPO7AFn3lYkCJaqON31HqVCNpZvMkCDA3kVtfUD5/yVYwFQ48qaZShO1VeqbEbKwyfbK+/kx5VtDO4TLO/Rs7FPpVCZ+bm8Za5LpwcAKuTajycebBQAxn9/3st9oSPaEwAVbjcnx+/vDlZON/bza5yJ0j9UNH9Um3h9VNO7/a6OIwWd0sIN09PiH5BSrD/OwMFRAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", Yt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAFGUlEQVRIx7WVaWxc1RXHf/ctM+OxPcQLxIljD3GCAYOxiHCSpmmWEgi7kBBIiEXiU79USHxhEaJtWqFWqqhQW1BLIImrVLTwgQBhM2sIEIVFCZDFSbCdxI4X7ExmMjOemffuvacfbA8e1FYNUv/See/o3vf+5/3/5+o8+D9DzSYiolatWhUrFArR2bXa2lr1317OZrMCcPbsWQFIp9PypOt23TsxsbuigIiogx8/d9+StsW/8P1Y8ty/U6avpYCPf/2XbMPdV9/fueZn2wA8gPXr11e/uu2hX1EabQlyeRQKlPofuQVBQCy5XYdwGv3aZGvLJuCfQMEBsNZW+RG/xZSyWAEjqiJCA09ueZtr736CXXuPzdkDI2CtYI0wvvsY1a21RHyvFYgCOACJRMK1RmMsWKuworDiYMXBWMXjf3yF9/f0s+mXjxB6TfR+eLi8Px0Kk5lieP8g9YsvIAiLJBIJp2yR53nKaI21Mu3MbAB/3trLnn0neeap35FsrseGU3y5r8SLO/dy2/XLZ13CfHacjO8Qr6tBl0qIiCorUEq51oYYIxgr05KtsO2FXbzy9n4ee/jnjJ44wOmRQxw5+CnP/r2XqliU51/+BGMs1kDu6Di6KcFUMcBajYh8p8AYo6wOsMagRGERnu55kx1vfc6Plney+bmtXP3jDv72j9dYOL+ODasvp7urjfxUkb9uf4d7b+gmNTBGtK2RIAxBTPmEejNNVkYHGKMRIzz42xfY/ekRrlvXxdruC5mX6MB1XVZ3t2OtMDJ+hoETY3Rd2sLtN69gz5Z3qU3lqN9wEQrBmu8s8gAymYzosITRITvf28fxoQmeePROCqWQMAiZmMxgrSWVyhCEBkQIwxATlFhyYSMr59XyXv4bEp7Cc8CEYaWCdDqNDovoMODowCgbf3IpuXwOgHyhRLEQUBXzwcbAUbiOQ8RXHO0f4tuJM6w+nSeb8ImKQSFoXSKfz1NuciqVQodFQh2w8soWjgyOMjwySVNjNYWpIhFPiMdcfNcS9YSYJ8RjDvGYi2ciTC6/hlxbMx1Lzyc0Bh0EZW5vpoCEQQkThlzRPp/O9iZe/+AQv/nTa2x+/A6y+SI18SijE1mKpQAdWiIRl5XLknxzzOdYop5IcwO+pwiCEOUVKy0ClA6KGB1Mjwmg98PDLOtYiBjN0KkU45NZhsYydHcuIhZ1qa3ycMVgaxYycnyAqzrOI5ctYMXietFyAQegUCiggwJGG7TWaK3pumQBff3f8uyLe/F9RceSBrovWwDG4CkoFgNS6RxnTIxTo4MoMYxOZNDaoIN/pyAsIWLLM+yWn17M7Rs76B9K0fPSF2xYsZh0tsDi5np8L0Y04nH4eJrtvc9z5dIYg8PVNM6LE/UddFiqVAA4WocYY8rxxYFhdn7QRzzm0TcwwchkjisubmLB+TXUVEeIRBw+/3qQI4cPUBfXIMIFDXFELFqHlU0GlNGmYgqv6Gwu53fd2Mn+vjH6T57m/rtWYo3BWOGTfSdJNlXRcF6M9mQdSoQ5PJUWGWPLP47vY113kjVXtfKHnj38fstH3LT2Ik6NZ+loa2Tj6iW0JxuYGTlzuSsK2KGxzGTz/ESjWMN/wgP3rCjnS1vrWNvd+j1iUI7LqfHMJGDnFhjrefmrN+67bfmNyUVN9cpxUY6Hclwcx0WVY/pxsRqxBrEGO3OfXTsxPJbq2fHVm8BYWcYMLgNuBS6Z0/xzhQX6gB3AwR/IcW74F/jUry6yACAoAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", Zt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAE8ElEQVRIx7WVWWxVVRSGv733Off2Xjrc0oFKy6XQoqCMEgc0RhFNVBzwQRIfUBKiTyYqCSQmmhiNJkSjiQkJiQ8mKg5xiGKCCIpEZFCCcwlVhlCwrbSlpe1te8/Ze20fTluL4AMaV3KmZGd9a/3r7H/D/xzqb99pIPUfc0ZA8TzALzvee6C5adbTqVRqxgXrGFupDUqBR4EG/LkrfVwc6jjZ9nzDkjuemwjIFFq/OZRyI43EI//Qp0IpnTyDAKU1KDUBPprKpJAgNRTk51cDw8GYNKkwaJTCIHgPWieVeTkX4lWSWCzaGDAhSisUejS/BxdhMqXZUbnHAUpsTH//AH2FYQojMWcGCgBUZNM019eQCsNkpVOgNV4MSgQThHgDSpm/ZEp0UwDjAO9istkSJpWWooIQrwNO/dHNdy2tvL31S2bW17H0yjnkp9aCKLxolLMgHh2GEJBIqAGRCcImUT38884uGeyFIMShCdMZMAFoQxRZPv96P5s/2EJ1RSlrVtzKFc15lNZoE2LSaXSYRpkApQ1kKtANc2uA7jFATeH7z05LoY+ih9N9BY793sVwFBE7x9LrriFXXo54z849+3nl1ddZMKuRh+69lfq6GlSYIkhn0Kk0OghRJeXo/IJaoGsMUDtw4JM/3GAvrW2dvLN9N22dZyhaR29/AWuF8tIM0+vruO+OW5jdlOeZlzdx6Mhx7rnxKlbdvYxcrpIgncWkS1CTcpj8winA6QlDjhAbMWvqZErTIXu+b2FwpEgmFeKVJghCevqH6O79kKqKLLfftITLm6bz7tad7P2xlQ2PPUg+Pw1lDMa582ZQ1/vV2x1u6CxRbPntZCffffwtmeV3MmQt/b09tLed4OCh45w6fpiG2iqWXb2IqvI0c2Y08MrmLQC8vP5hmpubSFVUYZquvQToHOtAiysiEhEYxeSKEnp8kRvP9DBz1QMopXh9234GGvuYZ4Qsll9/2Mv04hkaasrZ8MhKXnprGx/s2M36xmmItZD8T8kNUDaOcNaR7IdBGhdOp3XfPrIlJQTpLCvvXMaifCVvPvs4B776HH/ZDTQtuY0t+1po7+ljwyMrmd1Yh7URYovj6owDJB5BXIS1MfVVZeRKM/SGwu6nnqR6co4X3t9DN2WUV07m+hX3s2Lptaxe/SAvbnqNT789TN/Zfm5ePAdxMWLj8wE2KiJxjIsilLXMnVZD47x6TnScYte6tSyp1fza3sddT2ykc9CwsKGSsrJSamrrWPfoWn48chJxDnEWl/jZuTvZFUfw1uKdgAiBeK6ZeQk9UyrpONbFpT99ST5TRvtQjvlXLaIhtHQdO0I00MNQ+1EWN09FXIx3DhcXzwNoH0d45xCbAEQSR6nOpKia14CIx/qIKcOnSB/tpPeEQQcBxigmaY0ODF4s3sZIVBxXZ8I+sIgVvEsufGJagkJp0EoT4kllQpRS4D3exjg36rChR0UxNijilbqARNbhrYB4RHxi22Pu6AHsqPcrvBp1TMWoH3m88slhVBwZO4TOGbJ09w8OKDzee1RSPqDwPnn3kpBEBHFJIYjHW0Gsw8cWsRE2LtLW0d4HyMQOOt/44uD2NbddvzxXnitRyoBSKG0Sd9QapUwiBeC94MWBCB6X0JWgjaaju+fsxg93bQM6J1oFwBXACmD2hM4uNgQ4DHwEtPzLHBcXfwKfID6QlqygzQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMH81V5MAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDAOaO8vAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==", Xt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAFdSURBVDjLzZO/TsJQFMZ/t1QsmthEjQkmLoZJA7ODq/EdHBx9BcTEmMjCxsA7+Ao+gFOdCImOuoAs/qtIldL2OECxLY1EJ88Zbu6933e+c/988MtQ8akotOQaQqAklSAaS5hkEgQfmzcVTImJEjPfoMNjIjv5hpiiEgqiyJLXLiVAEpWU0oJ9HpQHoEeaWWFZPpGbiy17QlK35vaBqBAXaWajzp3sYWFJUQzRx2lIEQtLNmVMGQ0ZzPYuXQQX6OON5EGgjxstHkrp8k4A8c1xpBJgAMAwhTBMJ7jT1X5WGP5nBQ1dvve1mQq1wjGEX02rFX5S8HPOh16pVOYjiAHNnIeXTuidtc/XnOv4ERa8ky42fkpL9dXyfTnLXAzf54UmvdBCCkB01hcPHZ0djHh15QVHdHBV5BYAfOzq06npXMXhhl995TkKnxhINEqUyE49WYtW3JxRx82w/x/jC67KmykWiVPXAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", Jt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAACQElEQVRIx9WUz2sTURDHPzMvIb3VgyJKW/DXSXoKtSJIbaxtgi3of+BfIYKXgOAfUCh6zFFR9Ca1tomXigf7P/SQqo2giIrNpvvGw+7GStIlG/HgLI8dHvPmOzPvw4P/3SRx1hurde/9bL8g7z1mhveGWeQj0liq3CgNrLS28cKy2JNnj2yQvLnE6XQ6AHz/8Q3vPd6HhMk/3CcMw2j5fU5NnCMI2gMV3hUIggCAdrDHy9U1zDzeopF4b5g3jJCZKzN/xA8h0Ga2NAMIZoYRz91b3JmP4ttZBeIDPgzZWK8DgghEgzbMADNKc6W/6yD0nqtzJUQEVY2FonXQ2lkFkgNOlXq9gYoiqqgIiCJETM+XF7oFrTxYtjNnT6ci3NOBc45yuYxTh3MOVYeqxt0QJYjjp6cuUSwWe6p++vzxbE8HiYCosv5qI0rqFKeOxeuLqHOICHbgkr98/czH1k4qwj2XLMD8wjWcy5FzDudyICDxZ/FdBEHAm81Nms1mKsI9HRw/djL10hyuGz81fYHJyfOpCHcFDNu8c/f2RUveHTMS38xcNPookXlPYWSErXdbtHZ3UxHuCtyr3r9crd4qbCcb27+rHp848XNp8SYfdndQVUSEkUKBsbFxRo+MpiKcO7Bv1Wptr99YVh4uUywWab4/SqPxGhVFnaPV+nQowv0EDrVOp4Oqks/nqVQqAyGcSWAYhLMJDIHwUB1kQTiTQBrC0RtkRAhH+7l87m1yVgYRAOQwhPtZrVZrk7z0/9p+AWdQwNFPdOB+AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDA5LTEyLTAxVDAyOjIyOjM1KzAxOjAwqBTIawAAACV0RVh0ZGF0ZTptb2RpZnkAMjAwOS0xMi0wMVQwMjoyMjozNSswMTowMNlJcNcAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAE3RFWHRUaXRsZQBPcHRpY2FsIERyaXZlPme6DAAAAABJRU5ErkJggg==", Kt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAAB3RJTUUH5goLBzIP6fiS+gAAAoFJREFUSMfVVk1rE2EQft55EyKeFU0PlcR6koIa+0FBa2NtEmyL9uLBIoHi0YvFogghIIjoTbx4MldB8BRUTJNeqh7MwT+gPaSpKdjak2bTnfGw3SVhP5p4EFxYmJf5eGbmfXZmgf/9UbZQqrwtM/OElxEzQ0TALBCxZChVmclcSe4HEGoLMjEwv+AoYvV6oOOr1y87kvkajYotxzc2lAug1Wp1BPi5swWTGcwmTHMXpmlaL+8i1n8ChtHsqkUOgGEYHYpisQgWqyXMAmGBwMT4hXFP+64AYvU66o0aFICx08OOUbj6EcICZgYzW/ZNw7ct3gBNKyM2TSyXyjjfZrRcKkMEgAiSk8m/rwAATGZcnEyi/UZSqRSU6kyw2SuA7aCJUC5XQE8eQRGBlMLoqbMdTt8AzAF4k7uH4wNxiAiKLOJFYVcFWmuk02lo0tBag0jjx+07ntmNDI0hkUgEUtgFoIhQer8MIgJpgiaNMz7lb+9s4fvmeiCFXZesAEylLkHrEEJaQ+sQGj4AH1ZXUavVAinsquDI4b6u58zQyDAGB096UtgFIJDVu/eXRsWeOyKw5VuA9gKofq5is9EIpLAD8CD/8Fw+n42s7Z1zz9/9snUvbmYxM30VG411EBGUUjgQieD6fNYJdPBL1ZPCobaEJJ8v/LYPuWjUURztiyKRSKBWP4RKZQWkCKQ14m3OK+UVTKVT/hUEPa1WC0SEcDiMTCbjUHh7ccmxmZmdtb6BIAC/2fLYMMSTws+eYvryNEhr1PqPOXGMhRu9VRBEYShAoXOM9NyiXinsC+A3coMobK1RAa7N7e0NRkipT66dvN/ubqcw1oKNC4VCE4D8k7+KP78ve+ZyfaadAAAAAElFTkSuQmCC", qt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5godFRotCxUC6QAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAPfSURBVEjHtVS/TyNHGH27Ozv+sRj/CDYuQCJSdBRp6CkjLlWkFFGUUCJLSUkBhfMPUCJEQZciihwqpEsTiQasSBQnIaUgd2ALkC4sxpzDcuZ8O+udbzaF2cXEwF2QstLTzOx+s2/mfe/7tHL5h+DCceC6LgxDh5QSvpSQkiB9CQrXJCGlBEmCvF734m7e+f5N3LtOB2+v3oAFgUKhMIpM7iPkRvKQvoQkgiQCSQWp+uakQEpCSgW6jpFEIFK9A4VzUjiuv8Afz38H0zQNhmHA5ByxWByGIWFIgkEEYgRDKRhSgRiBUY/QkApECqyPhIUkSoGRgsnj0HUDzDCM128uHTiOA/uvV70bRBKEp7+RRRJBSgJRD354Yyl7e1Uv3vn7NXzPBQPwaYAAQRBAKdVDoG7mdyAI5xSuCUrRQBwC/P+PNj8//02tVoNt2/B9H57nodvtwvM8CCHgui5SqVQskUjUbdve6d+8tLQEAFq5XA5WVlYKZ2dnn6+vr8vp6Wk+NTX1cmFh4TlLJpO/WJaFoaEhSCnBOY+IOOfgnCOdTiORSDyzbfvLfoJyuQxcC9FsNr9utVqrnueh3W6j1Wr9trW19RWbnJxELBZDPp/vWe/a277vRxgZGUEqlcLe3t6dMqytra3t7u5+v7GxAcdxsL29Dc/zPhsfHz9i+Xz+qRACuq5DKRW5IySSUqJYLPJ0Ov3qPp3r9fonjuMgHo8jFovBNE0IIfjR0dEoq1arODw8RKPRABFF+ocQQiCVSiEej9+byEaj8asQ4m0ulwPn/AvG2C6Al81mM8Ysy9pMJpOwLAtEBNM0I3DOYZomMpkMksnkMwC3cjA7OwsAWqVSWQWwOjMzM3R1ddXUdX21Wq3+DACMMQZN0wa93lcXhmGAc37fBSK3CyGSjDENQBTMiOip53lwXRdKKXS73Vsyua4L13W5aZoDOahUKreZgkAL7R8RTExMQNM0FAqFyD39CZZSIp/PI5VKYWdn5z8XGmu325uXl5e4uLgYsKfv++h2uyAidDqdgRx8EMHJyQmOj49xenp6y0VCiGjMZDKwLOtRrYIJIb4NW0JIIIS4BcZYTClVfxTB8vLy+vuCzs/PAQBPnjzRAAS1Wu3DCRYXF/P7+/uwbRtEFDW78PSu6yKbzeqWZbm1Wq390M+CYLA/M03T/tQ0Df+Gruv9Y1bX9R8BfPcQgVJqkKBYLOY7nQ4Mw4hcFNZCiGubfnxwcPCgHGNjYzqABICor7BMJrOey+XQ7XajGghJwjoYHR0dGh4e3nyf3tls9h2AnwC8eJTlSqWSViqV7vw2Nzen3bX+BxxQD5I249kcAAAAAElFTkSuQmCC", $t = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5godFRgEe5H4BwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAARuSURBVEjHtVRNaFRXFP7u+08mkxknYyxGU6QLEQwuko2LFkRw0UXAhWipWJql4LIEdCtuulfpYlZCbBdt0YKWLixIS2mLhVStEtJGOpSYZGbMOPPm3fvuOaeLyRsnpkY3PXC479537v3e+b77PYW+qFQqO0XkwdLS0s7V1dXrV69e/QCviNnZ2VPMPBfHMdI07aW1FlprRFGEYrEIr39To9EAM6NaraJarWK7ePjwIZgZnU4HWmsYY6C17qWIwPf9zQDtdhvMjHq9jpWVlW0BBgcHPWaG4zjwfR/GGPi+jzAMobUGM8N13c0ASikopeC6LlzX3RZgamqqxcytJEliIhJrLay1YGakaQrP85DL5TYDZCEieF2cOXPmJjPvSpJEAMBxHGQjEaFYLKJQKGwGEJHe4UqpbQFOnjw5yczntNZGay1aayRJ0tMiTVMQ0X938CZdDA8PH2Tm00mSIAgChGGIMAxhjIExBkQEpdRWgOzLX9dBoVCoE1HL87w4CAIxxiCKoh6AUgqe520V+U34B4BWq3WTiHbFcSwZNZkHjDFg5q0d9GvwOqCxsbFJZj4Xx7FJ01TSNIUxpmc413URRRG8SqWiZmZmBAAmJyfje/fuyQY9tv/A8+fPq0uXLvVQa7XaQWY+nTm5X1xjDESkS9HMzIxcu3ZteHV1VW7cuLGnVCo5Gy3mLly4MCgiOcdxmhcvXtT9gNVqtZ75oP8WZRRllHkb3H+aJMnHy8vL6/fv3y9Vq1UMDAy8v7i4uDQ+Pp6Loug0gK/6Ae7evXsTwC4A23LpAcDIyMg79Xrdb7Va5cePH6PRaMjQ0FBYLBZ3TkxMoFQqlV7eeOXKlUlmPpckibHWirUWRARmBhEhiqIXRisUCl/k8/nd+/fvP7CwsIC1tTVEUYTR0VHkcrnb5XJ5/mWAR48eHch80P83zdJxnK7It27dUocPH/7szp07T8Iw/LpWq0VBEKjx8XEcPXr0geM4x0+cOJFcvnxZnT17tkfH/Py8IaIe7y+ntbYrdMbhkSNHvp2bm5s6duzYrxMTE1Gz2by9b9++49PT00l2i/s7OHTokEtEaLfbm66ntRbGGARBgHw+jy12/eGn395d+uvPsmV//qMPpxdfJd4vv9eGvvum8l6z2bRaa7E2RWpT2NTCaI1CcRh794xBzc5+cmq9sQLdWVeA5fra02dkyfrh4IDnh3lrSawlWCIQEawlMLPTieOk8az+HHBAxCBLIOJunQD1RhPWAh4gc4HHCAYsIp+xI1fubiABMYPIhSUFYgdEbnedGFQI8NboMIjlxRoxLAmYBStrz/Dk72V4Qga7d3Tw9kgbe8sEKx5EXAg8MAIwPIg4EHgQuOCNFHHB4kFUVtsdRVyI8vDjz3/g8y+/h+e6PpqdAEtPA6y3GcQKxAAxg0VAbMGswALwxjsWgFiBGWBRvWeS7ihwsLD4D7RO4SnHu95KPDSbAWpNhqUX2d86sYCJkWbz3vpGrZXenBlYq69DmxT/e/wL/opRMma51lkAAAAASUVORK5CYII=", ot = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAYCAYAAAARfGZ1AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5godFR8VXmBOMgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAItSURBVEjH7ZS9SitBFMd/M9nZddeYysYnCKQQsbTwMRQEbS1TpEsl+BIWwcLGMpXahBSCrVpY+ggJWiyus9mZc4uwMblJ7kW44TYeGM58nPnPf84XrFDUw8PDeKIUSqmvg6n1Iv03252dHfQqmf+Afw9caz0TtLlMUAqt9ffAtdZEUUSlUiEMw6XAYRiitZ7oP4KXF2q1Gi8vL7TbbVnGLggC4jim2WzKzc2NGGMwxsz9VJfG1WoVgG63K5eXl/L+/g6AMYYwDGeGMYYgCNjY2KDT6XB6eiqvr6+EYUilUvkikSQJxhienp7o9/tirSVJEoIg4P7+Hu89IjLRIjIhk6Yp1WqV4XBIs9mUvb09Wq2WSpJk7I1er8fd3Z0Mh0OcczjnKIqCoijw3lMUxWRvWk/blXtZlqG15uTkhLOzM6XLL/4LERG01qyvr4+ZPz4+EkURz8/P9Ho9sdby9vaGtZbj42MlIgAz7jHGUKvVuLi4kMFggLWWNE3Z39+n1WqptbU1Go0GQZZljEYjtre3qdfr6vb2Vvr9PlmWsbu7i/d+rimVPr+6uiJNUzY3Nzk/P1eNRgPnHHmej+0AiqIgTVOiKOLg4EBtbW1xfX0t5VnJfjrVnHMMBgMODw85OjpSIjIBXdpyy8Kw1hLHMdbameKZLrSPjw/iOMY5N0dgYcv13vP5+YnWmjzPJ5d+D1ye5xhjyPMc7/3CAC9Nk2lfL8uMRQ//9PP/C75S+QX3zx/c9r2O6AAAAABJRU5ErkJggg==", nt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAXCAYAAAARIY8tAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5godFR8FQ9deVgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAJgSURBVEjHtZW9TutAEIW/2V175QSQIvESUIUiEhQ0gISAJ0C8AM/AA1AlbwANBQUtDRIFEgWiTIEoqCkoKAIyRrZ37Vs5yr0Xx7k/jORmd2fPnOOZs/DNIQDD4bDxYBiGXFxclO12m729PcmyrDGn2+1iZqlCa02SJJydnaGUYnNzkyAI8N435iqAsixrvwpgMBiURVGQ5zmDwaDUWjNLrmqqwBjD09MTd3d3RFFEq9Xi9vaWx8dHjDH/xkBEEBH6/X7ZarXQWqO1Zm5ujn6/X1b7jQzqDmituby8LF9eXrDWYozBGIO1ltfXV87Pz0ut9d9JpJSiKAqurq5YWlqi0+mMARYXF1leXubm5obPz0+Uqle6VsSKwenpqRhjuL6+5uTkpAQ4PDyUXq+H954kSZjWsqa67CuANE3x3hMEAXEcU3XO+/s7cRzjnMM592V+I0C1XlXnnBsD5HmOc45Zhs3MPPIi47acpvkfMZhkIiJjBpOt+d8YKKW+h0F12SSDSVZNTMw0zcMwRER+YyAiKKUIwxCALMsoiqLeru/v77+sXGvN0dFRORqNmJ+fZ2FhAYDRaMTHxwftdpvj42OphvLXWF1drbcK7z0iwsHBgURRRBiGP1lFFEXs7++LtRbvfa1VTP3JeZ7T6/V4fn7m4eFhvN7pdFhbW2N9fZ23t7dmN62LoihIkoTt7W2x1o7d1FrL7u6uJElSq/3MD06WZYRhyMbGhlQAW1tbYq0lTdPGB6exTcuyJEkSVlZWGA6HGGPodrvEcdxY/cyD5pwjz3N2dnYkCALSNMU5N9Og/QC/FsDpo71BjQAAAABJRU5ErkJggg==", te = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gsEBhoGqbjXJQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAH3SURBVDjLhZGxSxthGMZ/392l+b6E4IUQjENRQulWKXUwcwJZ8idk0D2IiIMdm03o0MnJ1aXQRSHF+AcEkiWEQFECwSXoZsPlcrnz9OsQsbWk12d83/f78T3PIzzPYzab0Ww2db/fx3EcTk4+cX+/hGEYSKm5vPSFlCyUcByHo6MjnclkKBaLIp1Os7xs662t72xufmB3d4Xr65lIpRYDrFarpaWUVKtVIYQAwDAEGxtvGY1+IMQKUbK63S7lcvn5MYBSmoODN/j+6/mR9W+AMR6PyWazL4bDoS+urgKxvV1nOPwplIoAJBIJJpPJi6FSYNuaVCrENP1IC0Y+n6ff7+tFS9M0CcMwOoNisShWV20dBFIDJJNwezsTlgUPDw9YUQEAhm3bBIGkVvvK4WGLIADHcQEIw/C/AOF5HkpJ3Wg4DAYD9vffU6t9ZDq9e8pD8WdDAFJK1tbWqFQqQnieRy4n9Xg8X6ZScHMzE6YJe3t7ul6vi1gs9gLgui69Xk+3220smHte9L1YLIZlWai/elRKUSqVRKPR0JEGk8kkruuSSCSeMoFcTmp3HhHx+BeMKEA+n2cwGDxX/PgIQQCnp3fs7HzD9+PRgEKhwPn5OaPR6Nm71pqLiybr6+9+txClTqejz87OmE6nmOYrjo8/4/vzUJeW4BekTMTiOlyMpQAAAABJRU5ErkJggg==", ee = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gsEBhg0U1nkJwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAVmSURBVEjHnZZ/bFRVFsc/97038yZt2pIR2rHVgtVIoUVaqltogc1KChi2SxWTyg9rXAm7sBQ3m2DxH3c1cesvdpc/tkYbzXajgQ2GhWUJidUWSBzETdu1nU7XKUVDS7E/7I+0M/Nm5r53/WOKtEo36klO3nv3JeeTe+73nHtEMBjkVqZpGpcuXVKBQICamhqh6zo/xrRvLwghMAyD48ePq6amJoaGhqmrq1MTExP8GMgcgK7rSCk5cuSICnR3c/jwYepf/D3lZaXs27dfdXR0YJrmDwKIGylyuVwMDg7S0NCgMjMz+dWePRQUZIOIM3RtlFOn3+eNxmNs21YlduzYgWVZGIaBUgop5bwAQwiBaZp0dnZy9OhRtXJlEVu3bmH58myQY+BYZPk0dlY/iNtl8+bbJ9XV/gEO1O4X3d0BPB4PubmL599BT08PFy5cUH6/n5VFxWx/rAqfLwXiQ6ASMx4DXYBy8c6xVt491sySJfeK6emwysvLFdu370IpdeszaG9vx+/3U1r6E37z6134fDrE+sEJgzMNahpUBBJjYF9nV80afrv357S0fKjuK1xMW1uHsm17/kMOBALK4/Gwd+8+3K5RsAaSwVVkxmdATgTkJIT7uOP2VLZWbuB3Tz9BaoqLoaGh+QH5+flifHwc5VgQH0kGUhFwpoBw0o0oGBEwokx+NUrj31t48okqdEPnF5XraG9vU/MCCgsLCQQCTE6MAzaoaezEFIHgVXp7B7jcO8iVUD9XQgNc6R3gHye78N2+hGUFS8GZYn15IRcv+tF1HU3TEELMVVFKSgq5ubm0trbw8Ja7wQkzPTXNC6+eR9MN0lJTuDY4hOPYaMJB1zVOn/oDJEZBRbkjexFdXZ2MjIxgejyYbjcul+smQClFSUkJ7zefZ+uW+9BUhIw0ya5Hcgl+7uHQoToQCoiDkwAVB3sS7HFQMYTupmLD/ex+qkatKVtPWVm5KC4uxjRNhBDJQguFQhw8eFCFus9C5Aw4cWxp8dwrn/LTDVVsrPgZyC+TEBUHxwIVTb6LFKRKIWaF+W9XH3975wNOnPyI8rLVrFv/oBDBYBDbttm8ebNqPvMmy5ZcBXkdiDMyGmHPM1281fga3gVmcl3FZjw+80yASAA60nETi5tEohYPrK/D681O9iLDMFi1ahVnmz8GYyHoOugmi7IyOLj3HnbveRbbUSD0GelGZ8l4GuwJcCIY6QuYnApTVf0yFRsrqX/pZWEAKKVYu3Yt/z5zml/uLEWou0FJhJIszfeB6qGv73PuzUufCT57F3HQMyH9Nuqff4//dFyjattusXp1KT6f72azGx4epubxx1XRyjySQnNAObhNg87AF/jPN+FNHQV7GJjJv5LJFLlX8FRtI25PDkXFa0R5+RpM00RKiXFDTpmZmeyvrWVsfBK4qeXQZyHy7lJ4vR6IfgmaBu6FEBuHxGCy4yt4u6mZU6f+JVasKCQej33TYY3ZRVFdXS1mF4qmadTX/1FVPrQONAkZ2RCV/K9nlPzlOSDiEB8FEui6RkHBMiwrOrfQZn+Ew+E5P2OxGK0tH/Dai9V80ddPW3svCSm5fOUrcj5x8WhlEWnpAlQCx3GwLAtN0+YHfNs6Ozu5fn2Q1nNtBD7r58Q//eTk3ElJyQP8tfE9EnGbTRvuYfFdCsMwkFLidru/P6C7u5vUtAW8euQ0FRs3i4aG1/F6b8O2JZs2VVB36JAKhgY5sPt+TPPWADHfVAEwNjaGrutkZWUhpcS27W8ulhvDwZ/+/BfV3naOrq7LtLScF+np6f9/qphtXq+XjIwMLMtCSjnn1lJKkUgkePpAraip2SdSU9O+k3+ArwHn+YKuY70hbgAAAABJRU5ErkJggg==", ie = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKzSURBVEiJtZTbbtpAEIa/9XqdcAEXEQoHoQhkBVXKde7yEH2Kvg9v0su+CFKFAnYSSDlUqQISyBh7etOlNnbP6kgje9fjmf//Z2eViPA/zc0ulFJngPePOfciEh1XIoKIMBwO322321kcx/Ivvt1uZ8Ph8J3Nq0QEpVRls9mMtdatNE2zjH4LclZmx3FIkuRTtVr1RWRnJTrzPK+13++PSZ+fn5nNZtRqNdbrNa1Wi06nA0Acx4xGIxaLBXd3d3jed1WTJMHzvBZwBuwcC9ZSsj4ej7m5uaHf72OMYTweH5EaY/B9P4f89H9AAeQKWPRKKaIowvM8FosFzWaTJElIkqSQ8FROpVRpAecUgfX5fM7l5WXpt5+5zW17oE4RiQgvLy/UarWCBD+Q5PRZlCgbYIwhDEPa7Ta2+Y7j/Ap1oQc5BlnzfZ+Hhwcmkwnr9Rrf91FKsdvtCMOQw+GAiDAajdBa0+12qVQqBQa2uc31ev0pSZLc2f+bORARtNbUarWWiMwtAydN08Kp+JN7KivRt2H9cZOVUhwOB+7v71kul9ze3nJ+fn5MtlqtmE6nVKtVNpsN7XabRqPx6znImtaaXq9XyiIMQ/r9Pr7vo7UmCIIyNvkCVqLf8f1+j+u6LJdLGo0GURTlvn+T6O8LWF+tVlxcXBT2swWOTS6Touyc2/3X11eq1WppXHaSjwxKNCy8W3Ndl+l0SrPZJI5jjDFlceWDJiJEUcTT0xNWtslkgtaaTqdDpVLh6uqKx8dHgiBgs9nQ7XbLroxcgTQIgs+9Xq8O4Hkevu8DcH19nYOVpin1ep16vV7YtxYEwWfg+zAA88Fg8CEMwy+O46C1xnVdXNfFGIMxBs/zcm73bZzWGsdxCMPwy2Aw+ADMc9IopW6At8CbTOE/tRT4CLwXkWGuwP+yr0z0vLd4EzkyAAAAAElFTkSuQmCC", se = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAIPSURBVDjLtZLLTxNRFMa/O52ZPsYqtCQgI6WhQCRBCwm+GqguTBOJIXHpxoV7+QOIJYgSEg0mdmliAltNSGShCza2IiEQqcuKGmamWF4akxbL9HlctKClBbvQb3Vzc37nfOcB/G+xgx/EgQEglq8CIANEWGABkEQSaZY7shiJJLvGhRAUKEKodZxkEo8MH/UKQai2oGfKM2ULQhWCo95yhO07bzBNks3/6m4UOwCOPWi630/xrds10YrGyNzhx/LYMHWF3VCghN3UNebHcts9MpdGcsX8ktoqR4YWkLCLUKHaRSSGFuWI1g4rcX8CfNGYOWVtWcE3bhp5bAPNT8HNDrZosU6YSifJ7z9SG7sArQPIArQJ1OQ2daN+0HwBIOgnVa0Z7MPrjHDOAyy9EbMdedVRr0EHlfXA8ti5pqbsFy67ZxwhpJF2hM6+7LuYsp//hETpzvcspZ4szDuXfL2ZuTmaB5Dpvb7ow1b310NPg4wfbwz0rHSLP2s14IcjLUFD1rn69vmpNaZXAAA6kbkacD2TlXqgff1WzKdPShM9vDDxcPD9b6T0+Hi0wYVaANtQ8D13ptMbaeTrHj+6E2Zl89qDODKQobAsMq3ddPoR4F8ELpGxQoUK+PGNgb6mz3V84+zIlS8sWxzr4WLxhpl30dMxbjUpVVUBAMi625+3SNOIM/p7dAERyURVpP43+gWF+ca8/eA5yQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMH81V5MAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDAOaO8vAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==", oe = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAH1SURBVDjLtZLNaxNRFMXPm7yZfBGtMWhM/AjEig12UailsRhciJ9Q7MKFmy6617/AAa2VglLBbAShEBdFUFAQBMFVKhZRW3faiNJkWpNSESS16SRtclzEJqaJMQt9y/vO797DPRf4309sLlCBAEBRagGgBRoccADIIYeCKDYdRo3+4Kg6iSSS6uT+UfqpNZUPR9Q4Uu54X6wv5o4jpcaHI/WIqDj32mJ0X36qv8ciAO+10MhZZpeG2uYbGqO9Q8fMdZ0hSgoKSoZGdMy0X6W9kVyhx3HPN8FeykpNstc3Yb3PHVR+18pfxux5VzCBWZGoen0WDhqZTthqN1npKPMZE8SH6leR6VWrudlNGSDMXSljH1y8i43AFFgHAl4DJlgHiBJ/nE7d6eg5/3ocKygBUOA8PFTY3vMGy7WZb1jK3341FXh78sja1GMsA3CFz02fwlLXlz+eBq2Jgf7uj13aSpsBfN9bcMLAemDuxYPdC8JsAADcunY8Ghz3J3cCBzKD6RNmzDnWLdWxG5emq0jt8Um0I4htAL4iiW/FzkORWZ/03Lp58Z2o21c1RAst5bBoW7gQ0BGVD6NhWhtMaIBvWew/uueTR/qeXzn2WawDSnNAZL1PXs4fTCtzOWdLEwCArtUzJYfzEbKCf1eXEY02ttD637yfWKq5q2bQBKcAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDB/NVeTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwDmjvLwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=", ne = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAIBSURBVDjLtZLLaxNRFMa/O5lXZhi1aag1sRocUxSsUKjFhhpciI8uCoIupODCvf4FxketFJQKZq3QLIqg4ELQjZtO1eLC1o2L1gdNZmoqFSmkNZ1ckxwXCW3TjDULPZsDl+93z8f5DvC/i21+IAEMALFyAwD5IEODBiCPPDgrbTmMZAqbw9IE0khLE/uHKUzylvLBuGQhE7BiqVgqYCEjWYPxeoStOW9VRymQeHHVwQoY9KG2W32UW7y0w/E0Rv6DCUzfvka9HdfhwKF2OjyUwHT0Jvm95AIFtVRojHooig8YxzjtI4WOhsaUR9RCwkatUDXmLximjVks8wfg4ADKmDFtbkCt3eQaLRYWXJSwJD2vAgBlVxV3s5sKQHB3Zey9MACUqoAAw4m02HBBdQArY+VMhjd3n4cGERwcIrQj53hz9ycs12YuVnvh/tvJyLtTvcXXFk0CUGMDU6ex2Pn1j6dByuzZ/q6PnfLPJhtY2sN12ChG5l493j3PXA8AoO2/TiTNh+H0TqB94WL2pDuqj3SJ0sidK1PrSO3xiYjCRBOA70jjR6njUHwmJAbv3b38ntXtaz1EH/kqYZE6fyGSQFJ8kuwhxWOCB77tW/+xts9BMfTyxvEvrLghOO9iudZnb5wDWWEurzc0AQDIWO0ra/pT5Bj9XV1BZFKpga//Tf0Gp9/DBQB2y1wAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDB/NVeTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwDmjvLwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=";
function $(e) {
  this.point = e, this.contextMenu = null, this.updateContextMenu = () => {
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
    this.contextMenu.on("click", (t) => {
      switch (t.itemId) {
        case "i" + e.guid + "_delete":
          r.emit(g.POINT_DELETE_REQUEST, this.point);
          break;
        case "i" + e.guid + "_drag_horizontal":
          this.onDragHorizontalClick(t);
          break;
        case "i" + e.guid + "_drag_vertical":
          this.onDragVerticalClick(t);
          break;
      }
    });
  }, this.onDragHorizontalClick = (t) => {
    this.point.dragHorizontal = !this.point.dragHorizontal, this.point.dragHorizontal && (this.point.dragVertical = !1), this.updatePointDragMode();
  }, this.onDragVerticalClick = (t) => {
    this.point.dragVertical = !this.point.dragVertical, this.point.dragVertical && (this.point.dragHorizontal = !1), this.updatePointDragMode();
  }, this.updatePointDragMode = () => {
    this.contextMenu.items.find((t) => t.id === "i" + this.point.guid + "_drag_horizontal").title = "Enable move horizontally", this.contextMenu.items.find((t) => t.id === "i" + this.point.guid + "_drag_vertical").title = "Enable move vertically", this.point.dragHorizontal ? (this.point.setOptions({ moveDirections: [m.LEFT, m.RIGHT] }), this.contextMenu.items.find((t) => t.id === "i" + this.point.guid + "_drag_horizontal").title = "Disable move horizontally") : this.point.dragVertical ? (this.point.setOptions({ moveDirections: [m.TOP, m.BOTTOM] }), this.contextMenu.items.find((t) => t.id === "i" + this.point.guid + "_drag_vertical").title = "Disable move vertically") : this.point.setOptions(
      { moveDirections: [m.TOP, m.BOTTOM, m.LEFT, m.RIGHT] }
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
      m.LEFT,
      m.TOP,
      m.RIGHT,
      m.BOTTOM
    ],
    visible: !0,
    hidden: !1,
    forceDisplay: !1,
    createDOMElement: !1
  }, this.x = 0, this.y = 0, this.element = null, this.guid = z(), this.subscriptions = {}, this.dragHorizontal = !1, this.dragVertical = !1, this.init = (e, t, i = null) => (this.x = parseInt(e), this.y = parseInt(t), this.setOptions(b({}, i)), this.setEventListeners(), r.emit(g.POINT_ADDED, this), this), this.setOptions = (e) => {
    if (e && typeof e == "object" && (S(e.moveDirections) && typeof e.moveDirections == "object" && (this.options.moveDirections = []), this.options = b(this.options, e)), Object.assign(this, new $(this)), !this.element)
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
    if (this.element || (this.element = document.createElement("div"), this.setDOMEventListeners(), Object.assign(this, new $(this))), e == null && (e = this.element), this.options.id && (this.element.id = this.options.id, e.id = this.options.id), e.className = this.options.classes, e.style = this.options.style, typeof this.options.style == "object")
      for (let t in this.options.style)
        e.style[Ot(t)] = this.options.style[t];
    return e.style.width = this.options.width + "px", e.style.height = this.options.height + "px", e.style.left = this.x - parseInt(this.options.width / 2) + "px", e.style.top = this.y - parseInt(this.options.height / 2) + "px", e.style.zIndex = this.options.zIndex, !this.options.canDrag || !this.options.visible || this.options.hidden ? e.style.display = "none" : e.style.display = "", e.style.position = "absolute", e;
  }, this.redraw = () => {
    (this.options.canDrag && this.options.createDOMElement || this.options.forceDisplay) && (this.element = this.setPointStyles());
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.rotateBy = (e, t, i) => {
    const [s, o] = R(e, this.x, this.y, t, i);
    this.x = s, this.y = o;
  }, this.setEventListeners = () => {
    r.subscribe(F.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange);
  }, this.setDOMEventListeners = () => {
    !this.element || (this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown), this.element.addEventListener("mouseover", this.mouseover), this.element.addEventListener("mouseout", this.mouseout), this.element.addEventListener("click", this.click), this.element.addEventListener("dblclick", this.doubleclick), this.element.addEventListener("mousemove", this.mousemove));
  }, this.mousedown = (e) => {
    r.emit(g.POINT_MOUSE_DOWN, this, u(e)), e.buttons === 1 && this.options.canDrag && (r.emit(g.POINT_DRAG_START, this, u(e)), it(e));
  }, this.mousemove = (e) => {
    if (r.emit(g.POINT_MOUSE_MOVE, this, u(e)), e.buttons !== 1 || !this.options.canDrag || !f.draggedShape || f.draggedShape.draggedPoint !== this)
      return;
    const t = this.x, i = this.y, s = U(this.element.parentNode, !0);
    if (!this.checkFitBounds(this.x + e.movementX, this.y + e.movementY)) {
      r.emit(g.POINT_DRAG_MOVE, this, u(e, { oldX: t, oldY: i }));
      return;
    }
    let o = e.clientX + window.scrollX - s.left - this.options.width / 2, n = e.clientY + window.scrollY - s.top - this.options.height / 2;
    [o, n] = this.applyMoveRestrictions(o, n, t, i), this.x = o, this.y = n, this.element.style.left = this.x + "px", this.element.style.top = this.y + "px", r.emit(g.POINT_DRAG_MOVE, this, u(e, { oldX: t, oldY: i }));
  }, this.mouseover = (e) => {
    r.emit(g.POINT_MOUSE_OVER, this, u(e));
  }, this.mouseout = (e) => {
    r.emit(g.POINT_MOUSE_OUT, this, u(e));
  }, this.click = (e) => {
    r.emit(g.POINT_MOUSE_CLICK, this, u(e));
  }, this.doubleclick = (e) => {
    r.emit(g.POINT_MOUSE_DOUBLE_CLICK, this, u(e));
  }, this.checkFitBounds = (e, t) => !(this.options.bounds.left !== -1 && e < this.options.bounds.left || this.options.bounds.right !== -1 && e > this.options.bounds.right || this.options.bounds.top !== -1 && t < this.options.bounds.top || this.options.bounds.bottom !== -1 && t > this.options.bounds.bottom), this.applyMoveRestrictions = (e, t, i, s) => (t > s && this.options.moveDirections.indexOf(m.BOTTOM) === -1 && (t = s), t < s && this.options.moveDirections.indexOf(m.TOP) === -1 && (t = s), e > i && this.options.moveDirections.indexOf(m.RIGHT) === -1 && (e = i), e < i && this.options.moveDirections.indexOf(m.LEFT) === -1 && (e = i), e > this.options.bounds.right && this.options.bounds.right !== -1 && (e = this.options.bounds.right), t > this.options.bounds.bottom && this.options.bounds.bottom !== -1 && (t = this.options.bounds.bottom), e < this.options.bounds.left && this.options.bounds.left !== -1 && (e = this.options.bounds.left), t < this.options.bounds.top && this.options.bounds.top !== -1 && (t = this.options.bounds.top), [e, t]), this.mouseup = (e) => {
    r.emit(g.POINT_MOUSE_UP, this, u(e)), e.button !== 2 && r.emit(g.POINT_DRAG_END, this, u(e));
  }, this.onBoundsChange = (e) => {
    e.points.find((t) => t === this) && (this.options.bounds = e.bounds);
  }, this.toJSON = () => JSON.stringify(this.getJSON()), this.getJSON = () => ({
    x: this.x,
    y: this.y,
    options: b({}, this.options)
  }), this.fromJSON = (e) => {
    let t = e;
    if (typeof t == "string" && (t = W(e)), !t)
      return null;
    this.x = t.x, this.y = t.y;
    let i = !1;
    return this.element || (i = !0, this.element = document.createElement("div")), this.setOptions(t.options), i && r.emit(g.POINT_ADDED, this), this;
  }, this.destroy = () => {
    this.element && (this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), this.element.removeEventListener("mouseover", this.mouseover), this.element.removeEventListener("mouseout", this.mouseout), this.element.removeEventListener("click", this.click), this.element.removeEventListener("dblclick", this.doubleclick), this.element.removeEventListener("mousemove", this.mousemove)), r.unsubscribe(F.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange), r.emit(g.POINT_DESTROYED, this);
    for (let e in this.subscriptions)
      this.subscriptions[e].forEach((i) => r.unsubscribe(e, i)), this.subscriptions[e] = [];
  }, this.addEventListener = (e, t) => {
    typeof this.subscriptions[e] > "u" && (this.subscriptions[e] = []);
    const i = r.subscribe(e, (s) => {
      s.target && s.target.guid === this.guid && t(s);
    });
    return this.subscriptions[e].push(i), i;
  }, this.removeEventListener = (e, t) => {
    this.subscriptions[e] && typeof this.subscriptions[e] < "u" && this.subscriptions[e].splice(this.subscriptions[e].indexOf(t), 1), r.unsubscribe(e, t);
  }, this.distance = (e) => O(this.x, this.y, e.x, e.y), this;
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
}, m = {
  TOP: 0,
  LEFT: 1,
  RIGHT: 2,
  BOTTOM: 3
};
function re(e) {
  this.rotateBox = e, this.subscriptions = {
    rotate: []
  }, this.initialAngle = 0, this.previousAngle = 0, this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    this.interceptEventsFromShape(), this.rotateBox.shape.points.forEach((t) => {
      t.mousemove = this.mousemove, t.mouseDownListener = t.addEventListener(g.POINT_DRAG_START, (i) => {
        this.onPointMouseDown(i), r.emit(a.POINT_DRAG_START, this.rotateBox, { point: t });
      }), t.mouseUpListener = t.addEventListener(g.POINT_DRAG_END, (i) => {
        this.onPointMouseUp(i), r.emit(a.POINT_DRAG_END, this.rotateBox, { point: t });
      });
    });
  }, this.interceptEventsFromShape = () => {
    a.getShapeMouseEvents().forEach((t) => {
      this.shapeEventListeners[t.name] = this.rotateBox.shape.addEventListener(t.name, (i) => {
        t.key === "SHAPE_MOVE_END" && (this.previousAngle = 0), r.emit(t.name, this.rotateBox, i);
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
    const [i, s] = Q(t, this.rotateBox.shape.root), [o, n] = this.rotateBox.shape.getCenter();
    let h = this.calcAngle(i, s, o, n);
    if (h === null)
      return;
    let p = h;
    this.previousAngle && (p -= this.previousAngle), this.previousAngle = h, r.emit(L.ROTATE_BOX_ROTATE, this.rotateBox, { angle: p });
  }, this.calcAngle = (t, i, s, o) => {
    const n = this.calcHypotenuse(t, i, s, o);
    if (n <= 0)
      return null;
    const h = this.calcCathetus(t, i, s, o), p = this.calcStartAngle(t, i, s, o);
    return Math.round(At(Math.asin(h / n)) + p + this.initialAngle);
  }, this.calcHypotenuse = (t, i, s, o) => O(t, i, s, o), this.calcCathetus = (t, i, s, o) => {
    if (t <= s && i <= o)
      return O(t, i, t, o);
    if (t >= s && i <= o)
      return O(t, i, s, i);
    if (t >= s && i >= o)
      return O(t, i, t, o);
    if (t <= s && i >= o)
      return O(t, i, s, i);
  }, this.calcStartAngle = (t, i, s, o) => {
    if (t <= s && i <= o)
      return 0;
    if (t >= s && i <= o)
      return 90;
    if (t >= s && i >= o)
      return 180;
    if (t <= s && i >= o)
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
    this.rotateBox.shape.points.forEach((i) => i.setOptions({ visible: !1 }));
  }, this.onPointMouseUp = (t) => {
    this.rotateBox.shape.points.forEach((i) => {
      i.setOptions({ visible: !0 }), i.redraw();
    });
  }, this.addEventListener = (t, i) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const s = r.subscribe(t, (o) => {
      o.target && o.target.shape && o.target.shape.guid === this.rotateBox.shape.guid && i(o);
    });
    return this.subscriptions[t].push(s), s;
  }, this.removeEventListener = (t, i) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(i), 1), r.unsubscribe(t, i);
  }, this.destroy = () => {
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((s) => r.unsubscribe(t, s)), this.subscriptions[t] = [];
    Object.keys(this.shapeEventListeners).forEach(
      (t) => {
        this.rotateBox.removeEventListener(t, this.shapeEventListeners[t]);
      }
    ), this.rotateBox.shape.points.forEach((t) => {
      t.removeEventListener(g.POINT_DRAG_START, t.mouseDownListener), t.removeEventListener(g.POINT_DRAG_END, t.mouseUpListener);
    });
  };
}
const L = {
  ROTATE_BOX_ROTATE: "rotate"
};
function ae(e) {
  this.resizeBox = e, this.subscriptions = {
    resize: []
  }, this.guid = z(), this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    r.subscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), r.subscribe(g.POINT_DRAG_END, this.onPointDragMove), a.getShapeMouseEvents().forEach((t) => {
      this.shapeEventListeners[t.name] = this.resizeBox.shape.addEventListener(t.name, (i) => {
        r.emit(t.name, this.resizeBox, i);
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
    const i = this.resizeBox.getPosition();
    this.resizeBox.calcPosition();
    const s = this.resizeBox.getPosition();
    this.resizeBox.redraw(), r.emit(a.POINT_DRAG_END, this.resizeBox, u(t, { point: t.target })), r.emit(I.RESIZE_BOX_RESIZE, this.resizeBox, u(t, { oldPos: i, newPos: s }));
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
  }, this.addEventListener = (t, i) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const s = r.subscribe(t, (o) => {
      o.target && o.target.guid && o.target.guid === this.resizeBox.guid && i(o);
    });
    return this.subscriptions[t].push(s), s;
  }, this.removeEventListener = (t, i) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(i), 1), r.unsubscribe(t, i);
  }, this.destroy = () => {
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((s) => r.unsubscribe(t, s)), this.subscriptions[t] = [];
    Object.keys(this.shapeEventListeners).forEach(
      (t) => {
        this.resizeBox.removeEventListener(t, this.shapeEventListeners[t]);
      }
    ), r.unsubscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), r.unsubscribe(g.POINT_DRAG_END, this.onPointDragMove);
  };
}
const I = {
  RESIZE_BOX_RESIZE: "resize"
};
function le(e) {
  this.shape = e, this.subscriptions = {
    CONTAINER_BOUNDS_CHANGED: []
  }, this.run = () => (this.shape = e, this.setEventListeners(), this), this.setEventListeners = () => {
    r.subscribe(g.POINT_DESTROYED, this.onPointDestroyed), r.subscribe(g.POINT_ADDED, this.onPointAdded), r.subscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), r.subscribe(g.POINT_DELETE_REQUEST, this.onPointDeleteRequest), r.subscribe(a.SHAPE_ADD_CHILD, () => {
      this.shape.redraw();
    });
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
    }), this.svg_wheel = this.shape.svg.addEventListener("wheel", (t) => {
      this.wheel(t);
    });
  }, this.removeSvgEventListeners = () => {
    this.shape.svg.removeEventListener("mouseover", this.svg_mouseover), this.shape.svg.removeEventListener("mouseout", this.svg_mouseout), this.shape.svg.removeEventListener("mouseenter", this.svg_mouseenter), this.shape.svg.removeEventListener("mousedown", this.svg_mousedown), this.shape.svg.removeEventListener("click", this.svg_click), this.shape.svg.removeEventListener("dblclick", this.svg_dblclick), this.shape.svg.removeEventListener("wheel", this.svg_wheel);
  }, this.addResizeEventListener = () => {
    !this.shape.resizeBox || (this.resizeBoxListener = this.shape.resizeBox.addEventListener(I.RESIZE_BOX_RESIZE, this.onResize), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOVE_START, this.mousedown), this.resizeMouseMoveEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_MOVE, this.mousemove), this.resizeClickEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_CLICK, this.click), this.resizeDblClickEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_DOUBLE_CLICK, this.svg_dblclick), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_DOWN, this.svg_mousedown), this.resizeMouseOverEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_OVER, this.svg_mouseover), this.resizeMouseOutEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_OUT, this.svg_mouseout), this.resizeMouseUpEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_UP, (t) => {
      r.emit(a.SHAPE_MOUSE_UP, this.shape, u(t));
    }), this.resizeBoxContextMenuEventListener = this.shape.resizeBox.shape.svg.addEventListener("contextmenu", (t) => {
      this.shape.contextMenu && this.shape.contextMenu.onEvent(t);
    }), this.resizeBoxWheelEventListener = this.shape.resizeBox.shape.svg.addEventListener("wheel", (t) => {
      this.wheel(t);
    }));
  }, this.addRotateEventListener = () => {
    !this.shape.rotateBox || (this.rotateBoxListener = this.shape.rotateBox.addEventListener(L.ROTATE_BOX_ROTATE, this.onRotate), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOVE_START, this.mousedown), this.rotateMouseMoveEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_MOVE, this.mousemove), this.rotateClickEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_CLICK, this.click), this.rotateDblClickEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_DOUBLE_CLICK, this.svg_dblclick), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_DOWN, this.svg_mousedown), this.rotateMouseUpEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_UP, (t) => {
      r.emit(a.SHAPE_MOUSE_UP, this.shape, u(t));
    }), this.rotateMouseOverEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_OVER, this.svg_mouseover), this.rotateMouseOutEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_OUT, this.svg_mouseout), this.rotatePointDragStartEventListener = this.shape.rotateBox.addEventListener(a.POINT_DRAG_START, (t) => {
      this.shape.initCenter = this.shape.getCenter(this.shape.options.groupChildShapes);
    }), this.rotatePointDragEndEventListener = this.shape.rotateBox.addEventListener(a.POINT_DRAG_END, (t) => {
      this.shape.initCenter = null, this.shape.points.filter((i) => i.options).forEach((i) => {
        !i.options.hidden && i.element && (i.element.style.display = "");
      });
    }), this.rotateBoxContextMenuEventListener = this.shape.rotateBox.shape.svg.addEventListener("contextmenu", (t) => {
      this.shape.contextMenu && this.shape.contextMenu.onEvent(t);
    }), this.rotateBoxWheelEventListener = this.shape.rotateBox.shape.svg.addEventListener("wheel", (t) => {
      this.wheel(t);
    }));
  }, this.onResize = (t) => {
    const i = this.shape.getRootParent(!0);
    if (i) {
      r.emit(
        I.RESIZE_BOX_RESIZE,
        i.resizeBox,
        u(
          t,
          { newPos: t.newPos, oldPos: t.oldPos }
        )
      );
      return;
    }
    if (t.buttons && this.shape.options.simpleMode)
      return;
    const s = t.newPos.left - t.oldPos.left, o = t.newPos.top - t.oldPos.top;
    this.shape.moveBy(s, o, !1);
    const [n, h] = this.shape.transformer.getMaxPointSize();
    this.shape.scaleTo(t.newPos.width - n * 2, t.newPos.height - h * 2), this.shape.redraw(), r.emit(I.RESIZE_BOX_RESIZE, this.shape, t);
  }, this.onRotate = (t) => {
    const i = this.shape.getRootParent(!0);
    if (i) {
      r.emit(L.ROTATE_BOX_ROTATE, i.rotateBox, { angle: t.angle });
      return;
    }
    this.shape.rotateBy(t.angle), this.shape.redraw(), r.emit(L.ROTATE_BOX_ROTATE, this.shape, t);
  }, this.mousedown = (t) => {
    it(t), r.emit(a.SHAPE_MOUSE_DOWN, this.shape, u(t)), setTimeout(() => {
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
    const [i, s] = this.calcMovementOffset(t);
    if (i === null || s === null)
      return;
    const o = this.shape.getPosition(this.shape.options.groupChildShapes);
    this.shape.moveBy(i, s, !0, this.shape.options.simpleMode), this.shape.options.simpleMode || this.shape.redraw();
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
  }, this.wheel = (t) => {
    this.shape.options.zoomable && this.shape.options.id.search("_resizebox") === -1 && this.shape.options.id.search("_rotatebox") === -1 && (t.deltaY < 0 ? this.shape.zoomBy(1 + this.shape.options.zoomStep) : this.shape.zoomBy(1 - this.shape.options.zoomStep), this.shape.redraw());
  }, this.calcMovementOffset = (t) => {
    this.shape.calcPosition();
    const i = this.shape.getPosition(this.shape.options.groupChildShapes);
    let s = t.movementX, o = t.movementY, n = t.clientX + window.scrollX, h = t.clientY + window.scrollY;
    const p = i.left + s, l = i.top + o, A = U(this.shape.root, !0), c = this.shape.getBounds();
    return (p < c.left || p + i.width > c.right) && (s = 0), (l < c.top || l + i.height > c.bottom) && (o = 0), n < p + A.left && (s = n - (p + A.left)), h < l + A.top && (o = h - (l + A.top)), n > p + i.width + A.left && (s = n - (i.width + A.left + i.left)), h > l + i.height + A.right && (o = h - (i.height + A.top + i.top)), [s, o];
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
    this.shape.isShapePoint(t.target) && (this.shape.updatePosition(t.target.x, t.target.y), this.shape.redraw());
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
  }, this.addEventListener = (t, i) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const s = r.subscribe(t, (o) => {
      o.target && o.target.guid === this.shape.guid && i(o);
    });
    return this.subscriptions[t].push(s), s;
  }, this.removeEventListener = (t, i) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(i), 1), r.unsubscribe(t, i);
  }, this.destroy = () => {
    r.unsubscribe(g.POINT_ADDED, this.onPointAdded), r.unsubscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), r.unsubscribe(g.POINT_DESTROYED, this.onPointDestroyed), r.unsubscribe(g.POINT_DELETE_REQUEST, this.onPointDeleteRequest), this.shape.resizeBox && (this.shape.resizeBox.removeEventListener(I.RESIZE_BOX_RESIZE, this.resizeBoxListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_CLICK, this.resizeClickEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_MOVE, this.resizeMouseMoveEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOVE_START, this.resizeMouseDownEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_UP, this.resizeMouseUpEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_DOUBLE_CLICK, this.resizeDblClickEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_OVER, this.resizeMouseOverEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_OUT, this.resizeMouseOutEventListener), this.shape.resizeBox.removeEventListener("contextmenu", this.resizeBoxContextMenuEventListener), this.shape.resizeBox.removeEventListener("wheel", this.resizeBoxWheelEventListener)), this.shape.rotateBox && (this.shape.rotateBox.removeEventListener(L.ROTATE_BOX_ROTATE, this.rotateBoxListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_CLICK, this.rotateClickEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_MOVE, this.rotateMouseMoveEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOVE_START, this.rotateMouseDownEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOVE_START, this.rotatePointDragStartEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOVE_START, this.rotatePointDragEndEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_UP, this.rotateMouseUpEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_DOUBLE_CLICK, this.rotateDblClickEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_OVER, this.rotateMouseOverEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_OUT, this.rotateMouseOutEventListener), this.shape.rotateBox.removeEventListener("contextmenu", this.rotateBoxContextMenuEventListener), this.shape.rotateBox.removeEventListener("wheel", this.rotateBoxWheelEventListener));
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((s) => r.unsubscribe(t, s)), this.subscriptions[t] = [];
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
function pe() {
  this.draw = (e) => {
    const t = e.getParent();
    this.initSvg(e, t), !(e.points.length < 1) && (e.options.hasContextMenu && e.shapeMenu && !e.shapeMenu.contextMenu && e.shapeMenu.updateContextMenu(), this.updateOptions(e), this.drawShape(e, t), r.emit("show_finish", e));
  }, this.initSvg = (e, t) => {
    !t || t.guid === e.guid || !t.options.groupChildShapes ? this.initRootSvg(e) : this.clearSvg(e);
  }, this.initRootSvg = (e) => {
    if (e.svg)
      try {
        e.eventListener.removeSvgEventListeners(), e.svg.innerHTML = "";
      } catch {
      }
    else
      e.points.length && (e.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), e.svg.ondragstart = function() {
        return !1;
      }, e.options.visible && r.emit(a.SHAPE_SHOW, e), e.eventListener.setSvgEventListeners(), e.svg.id = e.options.id, e.svg.setAttribute("guid", e.guid), e.root.appendChild(e.svg));
    if (e.svg && typeof e.svg.appendChild == "function") {
      const t = document.createElementNS(e.svg.namespaceURI, "defs");
      e.svg.appendChild(t);
    }
  }, this.clearSvg = (e) => {
    e.svg = null;
    const t = document.querySelector("svg[guid='" + e.guid + "']");
    t && t.parentNode.removeChild(t), e.resizeBox && e.resizeBox.hide(), e.rotateBox && e.rotateBox.hide();
  }, this.updateOptions = (e) => {
    e.calcPosition();
    const t = e.getRootParent();
    this.updateShapeSvgOptions(e, t), (!t || !t.options.displayAsPath) && (this.setupShapeFill(e), this.createSVGFilters(e), e.options.canScale && this.redrawResizeBox(t && t.options.groupChildShapes ? t : e), e.options.canRotate && this.redrawRotateBox(t && t.options.groupChildShapes ? t : e)), e.options.pointOptions.canDrag && this.updatePoints(e, t);
  }, this.updateShapeSvgOptions = (e, t) => {
    if (e.svg && (!t || !t.options.groupChildShapes) && typeof e.svg.appendChild == "function") {
      this.updateVisible(e), e.svg.id = e.options.id, e.svg.setAttribute("guid", e.guid);
      let i = e.getPosition(e.options.groupChildShapes);
      e.svg.style.position = "absolute", e.svg.style.cursor = "default", e.svg.style.left = i.left + "px", e.svg.style.top = i.top + "px", e.svg.setAttribute("width", i.width), e.svg.setAttribute("height", i.height), e.svg.style.zIndex = e.options.zIndex;
    } else if (t && t.svg) {
      const i = t.svg.querySelector("#p" + e.guid + "_polygon");
      i && (i.style.zIndex = e.options.zIndex);
    }
  }, this.updateVisible = (e) => {
    typeof e.options.visible < "u" && (e.svg.style.display !== e.options.visible && (e.options.visible ? (r.emit(a.SHAPE_SHOW, e), e.getChildren(!0).forEach((t) => r.emit(a.SHAPE_SHOW, t))) : (r.emit(a.SHAPE_HIDE, e), e.getChildren(!0).forEach((t) => r.emit(a.SHAPE_HIDE, t)))), e.svg.style.display = e.options.visible ? "" : "none");
  }, this.drawShape = (e, t) => {
    if (!t || !t.options.displayAsPath) {
      this.drawPolygon(e), e.svg && f.isNormalShape(e) && this.setupZIndex(e);
      return;
    }
    this.draw(t);
  }, this.updatePoints = async (e, t) => {
    e.points[0] && !e.points[0].element && await Pt(1), e.points.filter((i) => i.element).forEach((i) => {
      i.element.parentNode !== e.root && e.root.appendChild(i.element), i.options.zIndex = e.options.zIndex + 2, !e.options.visible && !i.options.forceDisplay ? i.options.visible = !1 : e.options.displayMode !== d.DEFAULT && (i.options.visible = !0), i.redraw(), e.options.displayMode === d.DEFAULT && !i.options.forceDisplay && (!t || t.options.displayMode === d.DEFAULT ? i.element.style.display = "none" : i.element.style.display = "");
    });
  }, this.drawPolygon = (e, t = null) => {
    if (!t && (t = this.getShapeSvg(e), !t || typeof t.appendChild != "function"))
      return;
    let i = t.querySelector("#p" + e.guid + "_polygon");
    i || (i = document.createElementNS("http://www.w3.org/2000/svg", "path"), t.appendChild(i)), i.setAttribute("d", this.getPolygonPath(e)), i.setAttribute("fill-rule", "evenodd"), i.setAttribute("shape_id", e.options.id), i.setAttribute("shape_guid", e.guid), i.id = "p" + e.guid + "_polygon", this.setupPolygonFill(e, i), this.setupPolygonStyles(e, i), t.querySelector("#f" + e.guid + "_filter") && (i.style.filter = 'url("#f' + e.guid + '_filter")'), i.style.zIndex = e.options.zIndex, e.polygon = i;
  }, this.getPolygonPath = (e) => {
    const t = e.getParent();
    if (t && t.options.groupChildShapes) {
      const i = t.getPosition(t.options.groupChildShapes);
      let s = this.getPolygonPathForShape(e, i, this.getMaxStrokeWidth(t));
      return s += this.getPolygonPathForChildren(e, i), s;
    } else {
      const i = e.getPosition(e.options.groupChildShapes);
      let s = this.getPolygonPathForShape(e, i, this.getMaxStrokeWidth(e));
      if (s += this.getPolygonPathForChildren(e, i), e.options.displayAsPath && e.options.groupChildShapes) {
        const o = this.getShapeSvg(e);
        o.setAttribute("width", i.width), o.setAttribute("height", i.height), this.createSVGFilters(e);
      }
      return s;
    }
  }, this.getPolygonPathForChildren = (e, t) => {
    let i = "";
    return e.options.displayAsPath && e.options.groupChildShapes && e.getChildren().forEach((s) => {
      s.calcPosition(), i += this.getPolygonPathForShape(s, t, this.getMaxStrokeWidth(s));
    }), i;
  }, this.getPolygonPathForShape = (e, t, i) => "M " + e.points.map((s) => {
    let o = s.x - t.left, n = s.y - t.top;
    return o <= 0 ? o += i : s.x >= t.right && (o -= i), n <= 0 ? n += i : s.y >= t.bottom && (n -= i), "" + o + "," + n;
  }).join(" ") + " Z", this.redrawResizeBox = (e) => {
    if (e.options.displayMode !== d.SCALE || !e.options.canScale) {
      e.resizeBox && e.resizeBox.hide();
      return;
    }
    if (!e.resizeBox) {
      e.transformer.setupResizeBox(), e.resizeBox && e.resizeBox.shape.points.forEach((t) => {
        t.options.zIndex = e.options.zIndex + 2, t.element.style.zIndex = e.options.zIndex + 2;
      });
      return;
    }
    this.setupBox(e, e.resizeBox, d.SCALE);
  }, this.redrawRotateBox = (e) => {
    if (e.options.displayMode !== d.ROTATE || !e.options.canRotate) {
      e.rotateBox && e.rotateBox.hide();
      return;
    }
    if (!e.rotateBox) {
      e.transformer.setupRotateBox(), e.rotateBox && e.rotateBox.shape.points.forEach((t) => {
        t.options.zIndex = e.options.zIndex + 2, t.element.style.zIndex = e.options.zIndex + 2;
      });
      return;
    }
    this.setupBox(e, e.rotateBox, d.ROTATE);
  }, this.setupBox = (e, t, i) => {
    const s = e.transformer.getResizeBoxBounds();
    e.options.displayMode === i ? t.options.shapeOptions.visible = e.options.visible : t.options.shapeOptions.visible = !1, t.left = s.left, t.top = s.top, t.width = s.width, t.height = s.height, t.options.zIndex = e.options.zIndex + 1, t.redraw(), t.shape.points.forEach((o) => {
      o.options.zIndex = e.options.zIndex + 2, o.element.style.zIndex = e.options.zIndex + 2;
    });
  }, this.setupShapeFill = (e) => {
    const t = e.options.style.fill || "none";
    t === "#image" && e.options.fillImage && typeof e.options.fillImage == "object" ? this.createImageFill(e) : t === "#gradient" && e.options.fillGradient && typeof e.options.fillGradient == "object" && ["linear", "radial"].indexOf(e.options.fillGradient.type) !== -1 && this.createGradient(e);
  }, this.createGradient = (e) => {
    const t = this.getShapeSvg(e);
    let i = t.querySelector("#g" + e.guid + "_gradient"), s = e.options.fillGradient.type === "linear" ? "linearGradient" : "radialGradient";
    return i ? i.tagName.toLowerCase() !== s.toLowerCase() && i.parentNode.removeChild(i) : (i = document.createElementNS(t.namespaceURI, s), t && t.querySelector("defs").appendChild(i)), this.createGradientSteps(e, t, i);
  }, this.createGradientSteps = (e, t, i) => {
    i.innerHTML = "", i.id = "g" + e.guid + "_gradient";
    let s = !1;
    for (let o in e.options.fillGradient)
      if (o !== "type") {
        if (o === "steps") {
          s = !0;
          continue;
        }
        i.setAttribute(o, e.options.fillGradient[o]);
      }
    if (!s)
      return i;
    for (let o of e.options.fillGradient.steps) {
      const n = document.createElementNS(t.namespaceURI, "stop");
      S(o.stopColor) && n.setAttribute("offset", o.offset), S(o.stopColor) && n.setAttribute("stop-color", o.stopColor), S(o.stopOpacity) && n.setAttribute("stop-opacity", o.stopOpacity), i.appendChild(n);
    }
    return i;
  }, this.createImageFill = (e) => {
    const t = e.options.fillImage;
    if (!t.href || !t.width || !t.height)
      return console.error("Image HREF, width and height must be specified for Image Fill"), null;
    const i = this.getShapeSvg(e);
    let s = i.querySelector("p" + e.guid + "_pattern");
    s || (s = document.createElementNS(i.namespaceURI, "pattern"), s.setAttribute("id", "p" + e.guid + "_pattern"), s.setAttribute("patternUnits", "userSpaceOnUse"), i && i.querySelector("defs").appendChild(s));
    for (let n in t)
      n !== "href" && s.setAttribute(n, t[n]);
    let o = s.querySelector("image");
    return o || (o = document.createElementNS(i.namespaceURI, "image"), s.appendChild(o)), t.href && o.setAttribute("href", t.href), o.setAttribute("width", t.width), o.setAttribute("height", t.height), s;
  }, this.createSVGFilters = (e) => {
    if (!e.options.filters || typeof e.options.filters != "object" || !Object.keys(e.options.filters).length)
      return;
    const t = this.getShapeSvg(e);
    let i = t.querySelector("#f" + e.guid + "_filter");
    i || (i = document.createElementNS(t.namespaceURI, "filter"), t && t.querySelector("defs").append(i)), i.setAttribute("id", "f" + e.guid + "_filter"), i.innerHTML = "";
    for (let s in e.options.filters) {
      const o = this.createSVGFilter(e, s, e.options.filters[s]);
      o && i.appendChild(o);
    }
  }, this.createSVGFilter = (e, t, i) => {
    if (!e.svg)
      return null;
    const s = document.createElementNS(e.svg.namespaceURI, t), o = this.getShapeSvg(e), n = e.getPosition(e.options.groupChildShapes);
    for (let h in i)
      s.setAttribute(h, i[h].toString()), h === "dx" && o.setAttribute("width", (n.width + parseInt(i.dx) * 2).toString()), h === "dy" && o.setAttribute("height", (n.height + parseInt(i.dy) * 2).toString());
    return s;
  }, this.setupPolygonFill = (e, t) => {
    const i = e.options.style.fill || "none";
    i === "#image" && e.options.fillImage && typeof e.options.fillImage == "object" ? t.setAttribute("fill", 'url("#p' + e.guid + '_pattern")') : i === "#gradient" && e.options.fillGradient && typeof e.options.fillGradient == "object" && ["linear", "radial"].indexOf(e.options.fillGradient.type) !== -1 && t.setAttribute("fill", 'url("#g' + e.guid + '_gradient")');
  }, this.setupPolygonStyles = (e, t) => {
    if (e.options.classes && t.setAttribute("class", e.options.classes), !(!S(e.options.style) || typeof e.options.style != "object"))
      for (let i in e.options.style)
        t.style[i] = e.options.style[i];
  }, this.toSvg = (e, t = null) => {
    const i = document.createElement("div"), s = this.getSvg(e, t);
    return i.appendChild(s), '<?xml version="1.0" encoding="UTF-8"?>' + i.innerHTML.replace(/&quot;/g, "'");
  }, this.getSvg = (e, t) => {
    let i = e.svg;
    if (!i) {
      const h = e.getParent();
      if (h && (i = h.svg), !i)
        return;
    }
    i = i.cloneNode(!0), t && (i = this.addChildrenToSvg(e, i)), i.removeAttribute("style"), i.removeAttribute("width"), i.removeAttribute("height"), i.removeAttribute("id"), i.removeAttribute("guid");
    const s = e.getPosition(t === null ? e.options.groupChildShapes : t);
    i.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const o = e.options.zoomLevel || 1, n = "0 0 " + s.width / o + " " + s.height / o;
    return i.setAttribute("viewBox", n), o !== 1 && this.unZoomSvg(i, o), i;
  }, this.addChildrenToSvg = (e, t) => {
    let i = !1;
    e = e.getParent() || e, e.options.groupChildShapes || (e.options.groupChildShapes = !0, i = !0), e.options.displayAsPath || e.getChildren(!0).forEach((n) => {
      this.drawPolygon(n, t);
    }), this.drawPolygon(e, t);
    let s = Array.from(t.querySelectorAll("path"));
    s.sort((n, h) => parseInt(n.style.zIndex) - parseInt(h.style.zIndex));
    const o = t.querySelector("defs");
    return t.innerHTML = "", t.appendChild(o), s.forEach((n) => t.appendChild(n)), i && (e.options.groupChildShapes = !1), t;
  }, this.unZoomSvg = (e, t) => {
    e.querySelectorAll("path").forEach((i) => {
      let s = "";
      const o = i.getAttribute("d").split(" ");
      for (let n of o)
        if (n.search(",") === -1)
          s += n + " ";
        else {
          const h = n.split(",");
          s += parseFloat(h[0]) / t + "," + parseFloat(h[1]) / t + " ";
        }
      i.setAttribute("d", s);
    });
  }, this.getMaxStrokeWidth = (e) => {
    if (!this.getShapeSvg(e))
      return 0;
    let i = parseInt(e.options.style["stroke-width"]);
    return isNaN(i) && (i = 0), e.options.groupChildShapes ? e.getChildren(!0).map((s) => isNaN(parseInt(s.options.style["stroke-width"])) ? 0 : parseInt(s.options.style["stroke-width"])).reduce((s, o) => s > o ? s : o, i) : i;
  }, this.toPng = (e, t = V.DATAURL, i = null, s = null, o = null) => new Promise(async (n) => {
    const h = e.options.zoomLevel || 1;
    e.calcPosition();
    const p = e.getPosition(o || e.options.groupChildShapes);
    [i, s] = tt(i, s, p.width / h, p.height / h);
    const l = this.getSvg(e, o);
    l.setAttribute("width", p.width / h), l.setAttribute("height", p.height / h);
    for (let y of l.querySelectorAll("image"))
      if (y.getAttribute("href") && y.getAttribute("href").length) {
        const H = await K(await (await fetch(y.getAttribute("href"))).blob());
        y.setAttribute("href", H);
      }
    const A = document.createElement("div");
    A.appendChild(l);
    const c = A.innerHTML, E = new Image(), x = new Blob([c], { type: "image/svg+xml" }), N = window.URL || window.webkitURL || window, D = await K(x);
    E.addEventListener("load", () => {
      const y = document.createElement("canvas");
      E.width = p.width / h, E.height = p.height / h, y.width = E.width, y.height = E.height;
      const H = y.getContext("2d");
      H.drawImage(E, 0, 0), H.scale(i, s), N.revokeObjectURL(D);
      const Z = y.toDataURL("image/png");
      if (t === V.BLOB) {
        n(Bt(Z));
        return;
      }
      n(Z);
    }), E.src = D;
  }), this.moveShapeToTop = (e) => {
    const t = f.getMaxZIndex(e.root);
    e.options.zIndex === t && f.findShapesByOptionValue("zIndex", t).length === 1 || this.changeShapeZIndex(e, t + 1);
  }, this.moveShapeToBottom = (e) => {
    const t = f.getMinZIndex(e.root);
    e.options.zIndex === t && f.findShapesByOptionValue("zIndex", t).length === 1 || this.changeShapeZIndex(e, t - 1);
  }, this.changeShapeZIndex = (e, t) => {
    if (t === e.options.zIndex)
      return;
    const i = t - e.options.zIndex;
    e.options.prevZIndex = e.options.zIndex, e.options.zIndex += i, this.updateOptions(e), e.options.groupChildShapes && e.getChildren(!0).forEach((s) => {
      s.options.prevZIndex = s.options.zIndex, s.options.zIndex += i, this.updateOptions(s);
    });
  }, this.getShapeSvg = (e) => {
    const t = e.getRootParent(!0);
    return t && t.svg ? t.svg : e.svg;
  }, this.setupZIndex = (e) => {
    if (!e.svg)
      return;
    let t = Array.from(e.svg.querySelectorAll("path"));
    t.sort((s, o) => parseInt(s.style.zIndex) - parseInt(o.style.zIndex));
    const i = e.svg.querySelector("defs");
    e.svg.innerHTML = "", e.svg.appendChild(i), t.forEach((s) => e.svg.appendChild(s));
  };
}
const V = {
  DATAURL: "dataurl",
  BLOB: "blob"
}, v = new pe(), Ae = (e, t, i = {}, s = null) => {
  if (!S(t) || typeof t != "object" || (S(t.features) || (t = { features: [t] }), !t.features.length))
    return null;
  const o = [];
  for (let n in t.features) {
    const h = t.features[n], p = de(h, n, i, e);
    s && typeof s == "function" && s(n, t.features.length, p), p && o.push(p);
  }
  return o.length === 1 ? o[0] : o;
}, de = (e, t, i, s) => {
  if (!ue(e))
    return;
  let o = ge(e, t, i);
  o.visible = !1;
  const n = ce(e);
  if (!n || !n.length)
    return;
  n.sort((l, A) => A.dims.width * A.dims.height - l.dims.width * l.dims.height);
  let h = null;
  for (let l in n) {
    const A = b({}, o);
    if (l == 0)
      i.onlyData ? h = {
        points: n[l].cords,
        options: A,
        children: [],
        ...n[l].dims
      } : (h = f.createShape(s, A, n[l].cords, !1), h.left = n[l].dims.left, h.top = n[l].dims.top, h.right = n[l].dims.right, h.bottom = n[l].dims.bottom, h.width = n[l].dims.width, h.height = n[l].dims.height);
    else if (A.id += "_" + l, A.name += " " + l, i.onlyData)
      h.children.push({
        points: n[l].cords,
        options: A,
        ...n[l].dims
      });
    else {
      const c = f.createShape(s, A, n[l].cords);
      c.left = n[l].dims.left, c.top = n[l].dims.top, c.right = n[l].dims.right, c.bottom = n[l].dims.bottom, c.width = n[l].dims.width, c.height = n[l].dims.height, h.addChild(c, !1);
    }
  }
  if (i.onlyData)
    return h;
  const p = h.getPosition();
  return (p.left < 0 || p.top < 0) && (i.scale || i.width || i.height) && h.moveTo(0, 0, !1, !1), S(i.scale) ? h.scaleBy(i.scale, i.scale, !0) : (S(i.width) || S(i.height)) && h.scaleTo(i.width, i.height), h;
}, ue = (e) => {
  if (!S(e.properties) || typeof e.properties != "object")
    return !1;
  const t = e.geometry;
  return !(!S(t) || typeof t != "object" || ["Polygon", "MultiPolygon"].indexOf(t.type) === -1 || !S(t.coordinates) || typeof t.coordinates != "object" || !t.coordinates.length);
}, ge = (e, t, i) => {
  const s = {};
  if (s.name = e.properties[i.nameField] || "Shape " + t, s.id = e.properties[i.idField] || "shape_" + t, S(i.fields) && typeof i.fields == "object" && i.fields.filter((o) => S(e.properties[o])).forEach((o) => s[o] = e.properties[o]), S(i.options) && typeof i.options == "object")
    for (let o in i.options)
      s[o] = i.options[o];
  return s;
}, ce = (e) => {
  let t = e.geometry.coordinates;
  e.geometry.type === "Polygon" && (t = [t]);
  const i = [];
  for (let s of t) {
    const o = s[0], n = [];
    let h = 1 / 0, p = -1 / 0, l = 1 / 0, A = -1 / 0;
    for (let c of o) {
      const [E, x] = [c[0], -c[1]];
      E < h && (h = E), E > p && (p = E), x < l && (l = x), x > A && (A = x), n.push({ x: E, y: x });
    }
    i.push({ cords: n, dims: { left: h, top: l, bottom: A, right: p, width: p - h, height: A - l } });
  }
  return i;
};
function fe() {
  this.shapes = {}, this.visibleShapes = {}, this.activeShape = null, this.draggedShape = null, this.shapeOnCursor = null, this.containerEventListeners = [], this.init = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    r.subscribe(a.SHAPE_CREATE, this.onShapeCreated), r.subscribe(a.SHAPE_DESTROY, this.onShapeDestroy), r.subscribe(a.SHAPE_SHOW, this.onShapeShow), r.subscribe(a.SHAPE_HIDE, this.onShapeHide), r.subscribe(a.SHAPE_MOVE_START, this.onShapeMoveStart), r.subscribe(a.SHAPE_MOUSE_ENTER, this.onShapeMouseEnter), r.subscribe(g.POINT_DRAG_START, this.onPointDragStart), r.subscribe(g.POINT_DRAG_END, this.onPointDragEnd), window.addEventListener("resize", this.onWindowResize);
  }, this.onWindowResize = (e) => {
    for (let t in this.shapes) {
      const i = this.shapes[t];
      r.emit(
        F.CONTAINER_BOUNDS_CHANGED,
        i,
        { bounds: i.getBounds(), points: i.points }
      );
    }
  }, this.createShape = (e, t, i, s = !0) => new P().init(e, t, i, s), this.onShapeCreated = (e) => {
    const t = e.target;
    S(t.root) && !this.getShape(t) && typeof t.belongsToShape == "function" && (this.addShape(t), this.activeShape || (this.activeShape = t));
  }, this.addShape = (e) => {
    this.shapes[e.guid] = e, e.options.visible && this.isNormalShape(e) && (this.visibleShapes[e.guid] = e), this.getShapesByContainer(e.root).length === 1 && this.addContainerEvents(e);
  }, this.onShapeDestroy = (e) => {
    const t = e.target;
    delete this.shapes[t.guid];
    const i = t.root;
    !S(t.root) || this.getShapesByContainer(i).length === 0 && this.containerEventListeners.filter((s) => s.container === i).forEach((s) => {
      s.container.removeEventListener(s.name, s.listener), this.containerEventListeners.splice(this.containerEventListeners.indexOf(s), 1);
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
      const i = t.getRootParent(!0);
      i && i.options.groupChildShapes && (this.draggedShape = i), this.draggedShape.draggedPoint = e.target, r.emit(a.POINT_DRAG_START, t, { point: e.target });
    }
  }, this.onPointDragEnd = (e) => {
    this.draggedShape && (this.draggedShape.draggedPoint = null), this.draggedShape = null;
  }, this.getShape = (e) => this.getShapeByGuid(e.guid), this.findShapeByPoint = (e) => {
    for (let t in this.shapes) {
      const i = this.shapes[t];
      if (i.isShapePoint(e))
        return i;
    }
    return null;
  }, this.getShapeByGuid = (e) => S(this.shapes[e]) ? this.shapes[e] : null, this.getShapesByContainer = (e) => {
    const t = [];
    for (let i in this.shapes) {
      const s = this.shapes[i];
      this.isNormalShape(s) && s.root === e && t.push(s);
    }
    return t;
  }, this.getMaxZIndex = (e = null) => {
    let t;
    return e ? t = this.getShapesByContainer(e) : t = this.getShapes(), t.length ? parseInt(
      t.map((i) => i.options.zIndex || 0).reduce((i, s) => s > i ? s : i, 0)
    ) : 0;
  }, this.getMinZIndex = (e = null) => {
    let t;
    return e ? t = this.getShapesByContainer(e) : t = this.getShapes(), t.length ? parseInt(
      t.map((i) => i.options.zIndex || 0).reduce((i, s) => s < i ? s : i, 999999)
    ) : 0;
  }, this.getShapes = () => {
    const e = [];
    for (let t in this.shapes) {
      const i = this.shapes[t];
      this.isNormalShape(i) && e.push(i);
    }
    return e;
  }, this.isNormalShape = (e) => e.options.id.search("_resizebox") === -1 && e.options.id.search("_rotatebox") === -1 && typeof e.belongsToShape == "function", this.activateShape = (e, t = null) => {
    if (this.activeShape === e) {
      this.activeShape.switchDisplayMode(t), e.options.moveToTop && e.moveToTop();
      return;
    }
    typeof e.id < "u" && (e.id.search("_resizebox") !== -1 || e.id.search("_rotatebox") !== -1) || (this.activeShape && this.deactivateShape(this.activeShape), e.options.moveToTop && e.moveToTop(), this.activeShape = e, r.emit(a.SHAPE_ACTIVATED, this.activeShape), this.activeShape.switchDisplayMode(t));
  }, this.deactivateShape = (e) => {
    typeof e.options.prevZIndex < "u" && v.updateOptions(e), e.options.displayMode !== d.DEFAULT && e.switchDisplayMode(d.DEFAULT), e.options.groupChildShapes && e.getChildren(!0).forEach((t) => {
      typeof t.options.prevZIndex < "u" && (v.updateOptions(t), t.options.displayMode !== d.DEFAULT && t.switchDisplayMode(d.DEFAULT));
    });
  }, this.addContainerEvents = (e) => {
    this.addContainerEvent(e.root, "mousemove", this.mousemove), this.addContainerEvent(e.root, "mouseup", this.mouseup, e.options.id), this.addContainerEvent(e.root, "dblclick", this.doubleclick), this.addContainerEvent(e.root, "contextmenu", this.contextmenu), this.addContainerEvent(e.root, "mouseleave", this.mouseleave), r.emit(me.MANAGER_ADD_CONTAINER_EVENT_LISTENERS, e.root);
  }, this.addContainerEvent = (e, t, i) => {
    this.containerEventListeners.find((s) => s.container === e && s.name === t) || (e.addEventListener(t, i), this.containerEventListeners.push({ id: e.id, container: e, name: t, listener: i }));
  }, this.doubleclick = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.doubleclick(u(e, { target: this.shapeOnCursor }));
    try {
      e.stopPropagation();
    } catch {
    }
    if (!this.activeShape || !this.activeShape.options.canAddPoints || this.activeShape.draggedPoint || this.activeShape.points.length > 2 || this.activeShape.points.length === this.activeShape.options.maxPoints)
      return;
    this.activeShape.options.displayMode === d.DEFAULT && this.activeShape.switchDisplayMode(d.SELECTED);
    const [t, i] = Q(u(e, { target: this.activeShape }));
    this.activeShape.addPoint(t, i, { forceDisplay: !1 });
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
  }, this.mouseleave = (e) => {
    if (this.draggedShape && this.draggedShape.draggedPoint && this.draggedShape.options.id.search("_resizebox") !== -1) {
      const t = this.draggedShape.options.id.replace("_resizebox", ""), i = this.findShapeById(t);
      i && i.options.simpleMode && r.emit(I.RESIZE_BOX_RESIZE, i.resizeBox, u(e, {
        buttons: 0,
        oldPos: i.getPosition(!0),
        newPos: i.resizeBox.getPosition()
      }));
    }
  }, this.click = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.click(u(e, { target: this.shapeOnCursor }));
  }, this.processShapesUnderCursor = (e) => {
    const [t, i] = [e.clientX, e.clientY], s = this.getShapeOnCursor(t, i);
    this.shapeOnCursor && this.shapeOnCursor !== s && this.shapeOnCursor.getShapeSvg() && (this.shapeOnCursor.getShapeSvg().style.cursor = "default", this.shapeOnCursor.eventListener.mouseout(u(e, { target: this.shapeOnCursor }))), s && s !== this.shapeOnCursor && s.eventListener.mouseover(u(e, { target: s })), this.shapeOnCursor = s, this.shapeOnCursor && (r.emit(a.SHAPE_MOUSE_MOVE, this.shapeOnCursor, u(e)), this.shapeOnCursor.getShapeSvg().style.cursor = "crosshair");
  }, this.getShapeOnCursor = (e, t) => {
    const i = Object.values(this.visibleShapes);
    if (!i.length)
      return null;
    const s = i.filter((o) => o.belongsToShape(e, t));
    return s.length ? s.reduce((o, n) => n.options.zIndex >= o.options.zIndex ? n : o) : null;
  }, this.toJSON = (e = null, t = !1) => (e || (e = this.getShapes()), e = e.filter((i) => !i.getParent()), JSON.stringify(e.map((i) => i.getJSON(!0, t)))), this.fromJSON = (e, t, i = null, s = !0) => {
    let o = t;
    if (typeof o == "string" && (o = W(t)), !o || !o.length)
      return null;
    const n = [];
    for (let h in o) {
      const p = o[h];
      p.options.id && this.findShapeById(p.options.id) || (n.push(new P().fromJSON(e, p, !0, s)), i && typeof i == "function" && i(h / o.length));
    }
    return n;
  }, this.findShapesByOptionValue = (e, t) => this.getShapes().filter((i) => i.options[e] === t), this.findShapeById = (e) => {
    const t = this.findShapesByOptionValue("id", e);
    return t && t.length ? t[0] : null;
  }, this.findShapeByName = (e) => {
    const t = this.findShapesByOptionValue("name", e);
    return t && t.length ? t[0] : null;
  }, this.clear = () => {
    for (this.containerEventListeners.forEach(({ container: e, name: t, listener: i }) => {
      try {
        e.removeEventListener(t, i);
      } catch (s) {
        console.error(s);
      }
    }), this.containerEventListeners = []; Object.values(this.shapes).length; )
      Object.values(this.shapes)[0].destroy();
  }, this.fromGeoJson = (e, t, i = {}, s = null) => Ae(e, t, i, s), this.length = () => Object.values(this.shapes).length;
}
const me = {
  MANAGER_ADD_CONTAINER_EVENT_LISTENERS: "manager_add_container_event_listeners",
  MANAGER_REMOVE_CONTAINER_EVENT_LISTENERS: "manager_remove_container_event_listeners"
}, F = {
  CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
}, f = new fe().init();
function ht(e) {
  this.shape = e, this.addChild = (t, i = !0) => {
    !this.shouldAddChild(t) || (this.shape.options.displayMode !== t.options.displayMode && (t.svg ? t.switchDisplayMode(this.shape.options.displayMode) : t.options.displayMode = e.options.displayMode), this.shape.children.push(t), i && r.emit(a.SHAPE_ADD_CHILD, this.shape, { child: t }));
  }, this.addChildren = (t = []) => {
    t.forEach((i) => {
      this.addChild(i, !1);
    }), r.emit(a.SHAPE_ADD_CHILD, this.shape, { children: t });
  }, this.removeChild = (t) => {
    this.shape.children.splice(this.shape.children.indexOf(t), 1), r.emit(a.SHAPE_REMOVE_CHILD, this.shape, { child: t });
  }, this.removeAllChildren = (t = !1) => {
    for (; this.getChildren(t).length; )
      this.removeChild(this.getChildren(t)[0]);
  }, this.getChildren = (t = !1) => {
    if (!t)
      return this.shape.children;
    const i = [];
    i.push(...this.shape.children);
    for (let s of i)
      i.push(...s.getChildren());
    return i;
  }, this.hasChild = (t, i = !1) => t.guid !== this.guid && !!this.getChildren(i).find((s) => s.guid === t.guid), this.shouldAddChild = (t) => !t || typeof t != "object" || typeof t.getChildren > "u" || this.shape.children.indexOf(t) !== -1 || t === this.shape || t.getChildren().indexOf(this.shape) !== -1 || t.getParent() ? !1 : this.getParentsList().indexOf(t) === -1, this.getParent = () => {
    const t = f.getShapes();
    for (let i of t)
      if (i.getChildren().indexOf(this.shape) !== -1)
        return i;
    return null;
  }, this.getRootParent = (t = null) => {
    let i = this.getParentsList();
    return i.length ? (t !== null && (i = i.filter((s) => s.options.groupChildShapes === t)), i[i.length - 1]) : null;
  }, this.getParentsList = (t = []) => {
    const i = this.getParent();
    return i == null ? t : (t.push(i), i.getParentsList(t));
  }, this.getPosition = () => {
    let t = this.getChildren(!0);
    if (t.push(this.shape), t = t.filter((s) => s.points.length), !t.length)
      return { left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0 };
    const i = {
      left: t.map((s) => s.left).reduce((s, o) => o < s ? o : s, 9999999),
      top: t.map((s) => s.top).reduce((s, o) => o < s ? o : s, 99999999),
      right: t.map((s) => s.right).reduce((s, o) => o > s ? o : s, -9999999),
      bottom: t.map((s) => s.bottom).reduce((s, o) => o > s ? o : s, -99999999)
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
  }, this.eventListener = null, this.left_top = null, this.left_bottom = null, this.right_top = null, this.right_bottom = null, this.init = (e, t, i, s, o, n = {}) => (this.left = parseInt(t), this.top = parseInt(i), this.width = parseInt(s), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new P().init(e, b({}, this.options.shapeOptions), []), r.emit(a.SHAPE_CREATE, this.shape, {}), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new re(this).run(), this), this.setOptions = (e = {}) => {
    !e || typeof e != "object" || (this.options = b(this.options, e), this.options.shapeOptions.zIndex = this.options.zIndex || this.options.zIndex, this.options.shapeOptions.id = this.options.id ? this.options.id : this.options.id, this.shape && this.shape.setOptions(this.options.shapeOptions));
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
    r.emit(a.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (e, t) => this.eventListener.addEventListener(e, t), this.removeEventListener = (e, t) => {
    this.eventListener.removeEventListener(e, t);
  };
}
function Ee(e) {
  this.shape = e, this.moveTo = (t, i, s = !0, o = !0, n = !1) => {
    const h = this.shape.getBounds(), p = this.shape.getPosition(this.shape.options.groupChildShapes);
    let l = t, A = i;
    o && (l = t + p.width > h.right ? h.right - p.width : t, A = i + p.height > h.bottom ? h.bottom - p.height : i), this.moveBy(l - p.left, A - p.top, s, n);
  }, this.moveBy = (t, i, s = !0, o = !1) => {
    for (let h in this.shape.points)
      this.shape.points[h].x += t, this.shape.points[h].y += i, !this.shape.options.simpleMode && s && typeof this.shape.points[h].redraw == "function" && this.shape.points[h].redraw();
    this.shape.options.offsetX += t, this.shape.options.offsetY += i, this.shape.left += t, this.shape.top += i, this.shape.right += t, this.shape.bottom += i, this.shape.width = this.shape.right - this.shape.left, this.shape.height = this.shape.bottom - this.shape.top;
    const n = this.shape.getChildren(!0);
    s && (o ? this.shape.svg && (this.shape.svg.style.left = this.shape.left + "px", this.shape.svg.style.top = this.shape.top + "px") : this.shape.redraw()), n.length && this.shape.options.groupChildShapes && n.forEach((h) => h.moveBy(t, i, s, o)), o && !this.shape.getParent() && (v.redrawResizeBox(this), v.redrawRotateBox(this));
  }, this.scaleTo = (t = null, i = null, s = null) => {
    const o = this.shape.getBounds();
    if (this.shape.calcPosition(), !t && !i)
      return null;
    const n = this.shape.getPosition(s || this.shape.options.groupChildShapes);
    if (n.width === t && n.height === i)
      return;
    [t, i] = this.applyScaleRestriction(...tt(t, i, n.width, n.height)), n.width >= 10 && t < 10 && (t = 10), n.height >= 10 && i < 10 && (i = 10);
    let h = C(n.left) + t > o.right && o.right !== -1 ? o.right - C(n.left) : t, p = C(n.top) + i > o.bottom && o.bottom !== -1 ? o.bottom - C(n.top) : i, l = C(h / n.width), A = C(p / n.height);
    this.shape.scaleBy(l, A, s);
  }, this.scaleBy = (t = null, i = null, s = null) => {
    if (t === 1 && i === 1)
      return;
    const o = this.shape.getPosition(s || this.shape.options.groupChildShapes);
    this.shape.points.forEach((n) => {
      n.x = (n.x - o.left) * t + o.left, n.y = (n.y - o.top) * i + o.top;
    }), this.shape.options.scaleFactorX *= t, this.shape.options.scaleFactorY *= i, (this.shape.options.groupChildShapes || s) && this.shape.getChildren(!0).forEach((n) => {
      n.points.forEach((h) => {
        h.x = (h.x - o.left) * t + o.left, h.y = (h.y - o.top) * i + o.top;
      }), n.options.scaleFactorX *= t, n.options.scaleFactorY *= i, n.calcPosition();
    }), this.shape.calcPosition();
  }, this.zoomBy = (t) => {
    this.shape.options.zoomLevel *= t, this.scaleBy(t, t), this.shape.options.groupChildShapes && this.shape.getChildren(!0).forEach((i) => i.options.zoomLevel *= t);
  }, this.applyScaleRestriction = (t, i) => (this.shape.options.minWidth !== -1 && t < this.shape.options.minWidth && (t = this.shape.options.minWidth), this.shape.options.minWidth !== -1 && i < this.shape.options.minHeight && (i = this.shape.options.minHeight), this.shape.options.minWidth !== -1 && t > this.shape.options.maxWidth && (t = this.shape.options.maxWidth), this.shape.options.minWidth !== -1 && i > this.shape.options.maxHeight && (i = this.shape.options.maxHeight), [t, i]), this.rotateBy = (t, i = null, s = null, o = !1) => {
    this.shape.calcPosition();
    const n = this.shape.getPosition(this.shape.options.groupChildShapes);
    [i, s] = this.getRotateCenter(i, s), !(o && (!this.shape.isInBounds(...R(t, n.left, n.top, i, s)) || !this.shape.isInBounds(...R(t, n.right, n.top, i, s)) || !this.shape.isInBounds(...R(t, n.left, n.bottom, i, s)) || !this.shape.isInBounds(...R(t, n.right, n.bottom, i, s)))) && (this.shape.points.forEach((h) => {
      typeof h.rotateBy == "function" ? h.rotateBy(t, i, s) : [h.x, h.y] = R(t, h.x, h.y, i, s);
    }), this.shape.options.rotateAngle += t, this.shape.options.groupChildShapes && this.shape.getChildren(!0).forEach((h) => h.rotateBy(t, i, s, !1)));
  }, this.getRotateCenter = (t, i) => {
    const s = this.shape.getRootParent(!0);
    let o, n;
    return s && s.options.groupChildShapes ? [o, n] = s.shape.getCenter(s.options.groupChildShapes) : [o, n] = this.shape.getCenter(this.shape.options.groupChildShapes), this.shape.initCenter && ([t, i] = this.shape.initCenter), t || (t = o), i || (i = n), [t, i];
  }, this.flip = (t, i, s) => {
    if (!t && !i)
      return;
    s = s || this.shape.options.groupChildShapes, this.shape.calcPosition();
    const o = this.shape.getPosition(s);
    this.shape.points.forEach((n) => this.flipPoint(n, t, i, o)), t && (this.shape.options.flippedX = !this.shape.options.flippedX), i && (this.shape.options.flippedY = !this.shape.options.flippedY), this.flipChildren(t, i, o, s);
  }, this.flipChildren = (t, i, s, o) => {
    let n = o ? this.shape.getChildren(!0) : null;
    n && n.forEach((h) => {
      t && (h.options.flippedX = !h.options.flippedX, h.options.flippedY = !h.options.flippedY), h.shape.points.forEach((p) => h.shape.flipPoint(p, t, i, s));
    });
  }, this.flipPoint = (t, i, s, o) => ([t.x, t.y] = k(t.x, t.y, i, s, o), t), this.setupResizeBox = () => {
    if (!this.shape.points.length)
      return null;
    const t = this.getResizeBoxBounds();
    this.shape.resizeBox = new at().init(this.shape.root, t.left, t.top, t.width, t.height, {
      zIndex: this.shape.options.zIndex + 1,
      id: this.shape.options.id + "_resizebox",
      shapeOptions: {
        canDragShape: !1,
        visible: this.shape.options.visible,
        managed: !1,
        hasContextMenu: !1
      }
    }), this.shape.resizeBox.redraw(), this.shape.eventListener.addResizeEventListener();
  }, this.setupRotateBox = () => {
    if (!this.shape.points.length)
      return null;
    const t = this.getResizeBoxBounds();
    this.shape.rotateBox = new rt().init(this.shape.root, t.left, t.top, t.width, t.height, {
      zIndex: this.shape.options.zIndex + 1,
      id: this.shape.options.id + "_rotatebox",
      shapeOptions: {
        canDragShape: !1,
        visible: this.shape.options.visible,
        managed: !1,
        hasContextMenu: !1
      }
    }), this.shape.rotateBox.redraw(), this.shape.eventListener.addRotateEventListener();
  }, this.getResizeBoxBounds = () => {
    let t = this.shape.getPosition(this.shape.options.groupChildShapes);
    const i = this.shape.getRootParent(!0);
    i && i.options.groupChildShapes && (i.options.displayAsPath ? t = i.shape.getPosition(i.options.groupChildShapes) : t = this.shape.getPosition(this.options.groupChildShapes));
    const [s, o] = this.getMaxPointSize();
    return {
      left: t.left - s,
      right: t.right + s,
      top: t.top - o,
      bottom: t.bottom + o,
      width: t.width + s * 2,
      height: t.height + o * 2
    };
  }, this.getMaxPointSize = () => {
    if (!this.shape.points.length)
      return [0, 0];
    const t = this.shape.points.map((s) => s.options ? s.options.width : 0).reduce((s, o) => Math.max(s, o)), i = this.shape.points.map((s) => s.options ? s.options.height : 0).reduce((s, o) => Math.max(s, o));
    return [t, i];
  };
}
function Se(e) {
  this.shape = e, this.contextMenu = null, this.updateContextMenu = () => {
    if (this.shape.options.hasContextMenu && !this.contextMenu ? this.init() : this.shape.options.hasContextMenu || (this.contextMenu = null), this.shape.contextMenu = this.contextMenu, this.contextMenu) {
      const t = this.getMenuItems();
      for (let i of t)
        this.contextMenu.items.find((s) => s.id === i.id) || this.contextMenu.addItem(i.id, i.title, i.image);
    }
  }, this.init = () => {
    e.svg && (this.contextMenu = Y.create([], e.svg, "contextmenu", { customHandler: () => {
    } }), e.options.canAddPoints && this.contextMenu.addItem("i" + e.guid + "_add_point", "Add Point", q), this.displayGroupItems(), this.setEventListeners());
  }, this.getMenuItems = () => {
    const t = [
      { id: "i" + e.guid + "_move_to_top", title: "Move to Top", image: qt },
      { id: "i" + e.guid + "_move_to_bottom", title: "Move to Bottom", image: $t },
      { id: "i" + e.guid + "_flip_horizontal", title: "Flip Horizontal", image: ot },
      { id: "i" + e.guid + "_flip_vertical", title: "Flip Vertical", image: nt },
      { id: "i" + e.guid + "_clone", title: "Clone", image: Xt },
      { id: "i" + e.guid + "_export_json", title: "Export to JSON", image: jt },
      { id: "i" + e.guid + "_export_svg", title: "Export to SVG", image: Yt },
      { id: "i" + e.guid + "_export_png", title: "Export to PNG", image: Zt },
      { id: "i" + e.guid + "_get_base64", title: "Copy Base64 to clipboard", image: ie },
      { id: "i" + e.guid + "_destroy", title: "Destroy", image: st }
    ];
    return e.options.canAddPoints && t.push({ id: "i" + e.guid + "_add_point", title: "Add Point", image: q }), e.options.zoomable && (t.push({ id: "i" + e.guid + "_zoom_in", title: "Zoom in", image: se }), t.push({ id: "i" + e.guid + "_zoom_out", title: "Zoom out", image: oe }), t.push({ id: "i" + e.guid + "_reset_zoom", title: "Reset zoom", image: ne })), t;
  }, this.setEventListeners = () => {
    this.setOnItemClickListener(), this.contextMenu.on("show", () => {
      this.displayGroupItems();
    });
  }, this.setOnItemClickListener = () => {
    let t, i;
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
          i = this.shape.getRootParent(), t = i || this.shape, t.setOptions({ groupChildShapes: !0 }), t.switchDisplayMode(d.DEFAULT);
          break;
        case "i" + this.shape.guid + "_ungroup":
          i = this.shape.getRootParent(), t = i || this.shape, t.setOptions({ groupChildShapes: !1, displayAsPath: !1 }), t.switchDisplayMode(d.DEFAULT), t.getChildren().forEach((o) => o.switchDisplayMode(d.DEFAULT));
          break;
        case "i" + this.shape.guid + "_topath":
          i = this.shape.getRootParent(), t = i || this.shape, t.setOptions({ groupChildShapes: !0, displayAsPath: !0 }), t.switchDisplayMode(d.SELECTED), t.getChildren().forEach((o) => o.switchDisplayMode(d.SELECTED));
          break;
        case "i" + this.shape.guid + "_toshapes":
          i = this.shape.getRootParent(), t = i || this.shape, t.setOptions({ displayAsPath: !1 }), t.switchDisplayMode(d.SELECTED), t.getChildren().forEach((o) => o.switchDisplayMode(d.SELECTED));
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
    let t = this.shape.getRootParent() ? this.shape.getRootParent() : this.shape;
    if (!t.getChildren().length) {
      this.contextMenu.removeItem("i" + this.shape.guid + "_group"), this.contextMenu.removeItem("i" + this.shape.guid + "_ungroup"), this.contextMenu.removeItem("i" + this.shape.guid + "_topath"), this.contextMenu.removeItem("i" + this.shape.guid + "_toshapes");
      return;
    }
    t.options.groupChildShapes ? this.contextMenu.items.find((i) => i.id === "i" + this.shape.guid + "_ungroup") || (this.contextMenu.addItem("i" + this.shape.guid + "_ungroup", "Ungroup", Kt), this.contextMenu.removeItem("i" + this.shape.guid + "_group")) : this.contextMenu.items.find((i) => i.id === "i" + this.shape.guid + "_group") || (this.contextMenu.removeItem("i" + this.shape.guid + "_ungroup"), this.contextMenu.addItem("i" + this.shape.guid + "_group", "Group", Jt)), t.options.displayAsPath ? this.contextMenu.items.find((i) => i.id === "i" + this.shape.guid + "_toshapes") || (this.contextMenu.addItem("i" + this.shape.guid + "_toshapes", "Convert to shapes", ee), this.contextMenu.removeItem("i" + this.shape.guid + "_topath")) : this.contextMenu.items.find((i) => i.id === "i" + this.shape.guid + "_topath") || (this.contextMenu.addItem("i" + this.shape.guid + "_topath", "Convert to path", te), this.contextMenu.removeItem("i" + this.shape.guid + "_toshapes"));
  }, this.onAddPointClick = (t) => {
    if (this.shape.options.maxPoints !== -1 && this.shape.points.length >= this.shape.options.maxPoints)
      return;
    const [i, s] = j(this.shape.root, t.cursorX, t.cursorY);
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
    this.shape.options.displayMode === d.DEFAULT && this.shape.switchDisplayMode(d.SELECTED);
  }, this.onCloneClick = (t) => {
    let i = this.shape;
    const s = i.getRootParent();
    s && s.options.groupChildShapes && (i = s);
    const o = i.clone({}, i.options.groupChildShapes), n = o.getPosition(!0);
    o.moveTo(n.left + 5, n.top + 5), SmartShapeManager.activateShape(o);
  }, this.onExportJsonClick = (t) => {
    let i = this.shape;
    const s = i.getRootParent();
    s && s.options.groupChildShapes && (i = s);
    const o = i.toJSON(i.options.groupChildShapes), n = new Blob([o]);
    this.saveToFile(n, this.getExportFileName("json"));
  }, this.onExportSvgClick = (t) => {
    let i = this.shape;
    const s = i.getRootParent();
    s && s.options.groupChildShapes && (i = s);
    const o = i.toSvg(), n = new Blob([o]);
    this.saveToFile(n, this.getExportFileName("svg"));
  }, this.onExportPngClick = async (t) => {
    let i = this.shape;
    const s = i.getRootParent();
    s && s.options.groupChildShapes && (i = s);
    const o = await i.toPng(V.BLOB);
    this.saveToFile(o, this.getExportFileName("png"));
  }, this.onGetBase64ToClipboardClick = async (t) => {
    let i = this.shape;
    const s = i.getRootParent();
    s && s.options.groupChildShapes && (i = s), await window.navigator.clipboard.writeText(await i.toPng(V.DATAURL));
  }, this.onDestroyClick = (t) => {
    const i = this.shape.getParent();
    i && i.options.groupChildShapes ? i.destroy() : this.shape.destroy();
  }, this.onMoveToTopClick = (t) => {
    const i = this.shape.getParent();
    i && i.options.groupChildShapes ? i.moveToTop() : this.shape.moveToTop();
  }, this.onMoveToBottomClick = (t) => {
    const i = this.shape.getParent();
    i && i.options.groupChildShapes ? i.moveToBottom() : this.shape.moveToBottom();
  }, this.onFlipHorizontalClick = (t) => {
    const i = this.shape.getParent();
    i && i.options.groupChildShapes ? i.flip(!0, !1) : (this.shape.flip(!0, !1), this.shape.redraw());
  }, this.onFlipVerticalClick = (t) => {
    const i = this.shape.getParent();
    i && i.options.groupChildShapes ? (i.flip(!1, !0), i.redraw(), i.redraw()) : (this.shape.flip(!1, !0), this.shape.redraw());
  }, this.onZoomInClick = (t) => {
    const i = this.shape.getRootParent() || this.shape;
    i.zoomBy(1 + i.options.zoomStep), i.redraw();
  }, this.onZoomOutClick = (t) => {
    const i = this.shape.getRootParent() || this.shape;
    i.zoomBy(1 - i.options.zoomStep), i.redraw();
  }, this.onResetZoomClick = (t) => {
    const i = this.shape.getRootParent() || this.shape;
    i.scaleBy(1 / i.options.zoomLevel, 1 / i.options.zoomLevel), i.options.zoomLevel = 1, i.redraw();
  }, this.saveToFile = (t, i) => {
    const s = window.URL.createObjectURL(t), o = document.createElement("a");
    o.download = i, o.href = s, document.body.appendChild(o), o.click(), document.body.removeChild(o), window.URL.revokeObjectURL(s);
  }, this.getExportFileName = (t) => {
    const s = this.shape.getRootParent() || this.shape;
    return (s.options.id ? s.options.id : "shape") + "." + t;
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
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = z(), this.children = [], this.resizeBox = null, this.rotateBox = null, this.initCenter = null, this.shapeMenu = null, this.transformer = null, this.init = (e, t = null, i = null, s = !0) => {
    if (!e) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    if (f.getShape(this)) {
      console.error("This shape already initialized");
      return;
    }
    return this.root = e, this.root.style.position = "relative", this.shapeMenu = new Se(this), this.eventListener = new le(this), this.transformer = new Ee(this), this.setOptions(t), this.groupHelper = new ht(this), i && i.length && this.setupPoints(i, b({}, this.options.pointOptions)), this.eventListener.run(), s && (this.applyDisplayMode(), this.redraw()), (i && i.length || this.options.forceCreateEvent) && r.emit(a.SHAPE_CREATE, this, {}), this;
  }, this.setOptions = (e) => {
    !e || typeof e != "object" || (S(e.visible) && e.visible !== this.options.visible && (this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: e.visible } }), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: e.visible } })), S(e.fillGradient) && (this.options.fillGradient = {}), S(e.fillImage) && (this.options.fillImage = {}), this.options = b(this.options, e), this.options.simpleMode || this.points.filter((t) => typeof t.setOptions == "function").forEach((t) => {
      t.setOptions(b({}, this.options.pointOptions)), t.options.bounds = this.getBounds(), t.options.visible = e.visible, t.options.zIndex <= this.options.zIndex && (t.options.zIndex = this.options.zIndex + 1), t.redraw();
    }), this.shapeMenu && this.shapeMenu.updateContextMenu());
  }, this.setupPoints = (e, t = {}) => {
    this.points = [], this.isNewObject = !0, this.addPoints(e, b({}, t)), this.isNewObject = !1, this.calcPosition();
  }, this.addPoint = (e, t, i = {}) => {
    let s = this.putPoint(e, t, b({}, this.options.pointOptions, i));
    if (!s)
      return null;
    if (this.options.displayMode !== d.DEFAULT && (i.createDOMElement = !0), s = s.init(e, t, i), s.element) {
      try {
        this.root.appendChild(s.element);
      } catch {
      }
      s.updateContextMenu();
    }
    return this.redraw(), this.options.hasContextMenu && !this.shapeMenu.contextMenu && this.shapeMenu.updateContextMenu(), s;
  }, this.insertPoint = (e, t, i, s = {}) => {
    let o = this.putPoint(e, t, b({}, this.options.pointOptions, s), i);
    if (!o)
      return null;
    this.options.displayMode !== d.DEFAULT && (s.createDOMElement = !0), o = o.init(e, t, s);
    try {
      this.root.appendChild(o.element);
    } catch {
    }
    return o.updateContextMenu(), this.redraw(), this.options.hasContextMenu && !this.shapeMenu.contextMenu && this.shapeMenu.updateContextMenu(), o;
  }, this.addPoints = (e, t = {}) => {
    if (!(!e || typeof e != "object")) {
      if (this.options.simpleMode)
        typeof e[0].x < "u" ? this.points = b({}, e) : this.points = e.map((i) => ({ x: i[0], y: i[1] }));
      else
        for (let i of e) {
          const s = typeof i.x < "u" ? i.x : i[0], o = typeof i.y < "u" ? i.y : i[1];
          this.options.displayMode !== d.DEFAULT && (t.createDOMElement = !0);
          const n = this.putPoint(
            s,
            o,
            b({}, this.options.pointOptions, t)
          );
          if (n && (n.init(n.x, n.y, t), n.element))
            try {
              this.root.appendChild(n.element), n.redraw();
            } catch {
            }
        }
      this.options.hasContextMenu && !this.shapeMenu.contextMenu && this.shapeMenu.updateContextMenu();
    }
  }, this.putPoint = (e, t, i = {}, s = null) => {
    let o = this.getPointIndex(s);
    if (s && o === -1 || !this.isNewObject && this.findPoint(e, t))
      return null;
    i.bounds = this.getBounds(), i.zIndex = this.options.zIndex + 1;
    const n = new he();
    return n.x = e, n.y = t, this.options.displayMode !== d.DEFAULT && (i.createDOMElement = !0), n.setOptions(i), s && o !== -1 ? this.points.splice(o, 0, n) : this.points.push(n), n;
  }, this.getClosestPoint = (e, t, i = null) => {
    if (i || (i = this.getPointsArray()), !i || !i.length)
      return null;
    if (i = i.filter(([o, n]) => !isNaN(parseFloat(o)) && !isNaN(parseFloat(n))), i.length === 1)
      return this.points[0];
    if (!i || !i.length)
      return null;
    const s = i.map(([o, n]) => ({ x: o, y: n, d: O(e, t, o, n) })).reduce((o, n) => o.d < n.d ? o : n);
    return this.findPoint(s.x, s.y);
  }, this.getClosestLine = (e, t) => this.points.map((i, s) => {
    let o = null;
    return s < this.points.length - 1 ? o = this.points[s + 1] : o = this.points[0], [i, o, dt(e, t, i.x, i.y, o.x, o.y)];
  }).filter((i) => i[2] >= 0).reduce((i, s) => i[2] < s[2] ? i : s), this.getPointIndex = (e) => {
    if (e && e.length) {
      if (e.length !== 2)
        return -1;
      e = this.findPoint(...e);
    }
    return !e || !this.isShapePoint(e) ? -1 : this.points.indexOf(e);
  }, this.deleteAllPoints = () => {
    if (this.options.simpleMode)
      this.points = [];
    else
      for (; this.points.length; )
        this.points[0].destroy();
  }, this.deletePoint = (e, t) => {
    if (this.points.length - 1 < this.options.minPoints)
      return;
    const i = this.findPoint(e, t);
    i && typeof i.destroy == "function" ? i.destroy() : this.points.splice(this.points.indexOf(i), 1);
  }, this.findPoint = (e, t) => {
    const i = this.points.find((s) => s.x === e && s.y === t);
    return typeof i > "u" || !i ? null : i;
  }, this.findPointById = (e) => {
    const t = this.points.find((i) => i.options && i.options.id === e);
    return typeof t > "u" || !t ? null : t;
  }, this.getPointsArray = () => {
    let e = [];
    return this.points && typeof this.points == "object" && this.points.length && (e = this.points.map((t) => [t.x, t.y])), e;
  }, this.moveTo = (e, t, i = !0, s = !0, o = !1) => {
    this.transformer.moveTo(e, t, i, s, o);
  }, this.moveBy = (e, t, i = !0, s = !1) => {
    this.transformer.moveBy(e, t, i, s);
  }, this.scaleTo = (e = null, t = null, i = null) => {
    this.transformer.scaleTo(e, t, i);
  }, this.scaleBy = (e = null, t = null, i = null) => {
    this.transformer.scaleBy(e, t, i);
  }, this.zoomBy = (e) => {
    this.transformer.zoomBy(e);
  }, this.rotateBy = (e, t = null, i = null, s = !1) => {
    this.transformer.rotateBy(e, t, i, s);
  }, this.flip = (e, t, i) => {
    this.transformer.flip(e, t, i);
  }, this.moveToTop = () => {
    v.moveShapeToTop(this);
  }, this.moveToBottom = () => {
    v.moveShapeToBottom(this);
  }, this.changeZIndex = (e) => {
    v.changeShapeZIndex(this, e);
  }, this.isInBounds = (e, t) => {
    const [i, s] = this.transformer.getMaxPointSize(), o = this.getBounds();
    return e >= o.left + i / 2 && e <= o.right - i / 2 && t >= o.top + s / 2 && t <= o.bottom - s / 2;
  }, this.redraw = () => {
    this.applyDisplayMode(), v.draw(this), this.options.groupChildShapes && this.redrawChildren();
  }, this.redrawChildren = () => {
    this.getChildren().forEach((e) => {
      this.options.displayAsPath ? this.options.displayMode !== d.DEFAULT && e.points.filter((t) => t.element).forEach((t) => t.redraw()) : e.redraw();
    });
  }, this.applyDisplayMode = () => {
    this.points.filter((e) => typeof e.setOptions == "function").forEach((e) => {
      const t = { zIndex: this.options.zIndex + 15 };
      t.createDOMElement = this.options.displayMode !== d.DEFAULT, e.setOptions(t), t.createDOMElement && !e.element && e.redraw(), e.element && (e.element.style.zIndex = e.options.zIndex, this.options.displayMode === d.DEFAULT && !e.options.forceDisplay ? e.element.style.display = "none" : e.element.style.display = "");
    }), this.options.groupChildShapes && this.applyChildrenDisplayMode();
  }, this.applyChildrenDisplayMode = () => {
    this.getChildren(!0).forEach((e) => {
      e.points.filter((t) => typeof t.setOptions == "function").forEach((t) => {
        t.setOptions({ createDOMElement: this.options.displayMode !== d.DEFAULT }), t.options.createDOMElement && !t.element && t.redraw(), t.options.visible && !t.options.hidden && t.options.canDrag && t.element ? t.element.style.display = "" : t.element && (t.element.style.display = "none");
      }), e.options.displayMode = this.options.displayMode;
    });
  }, this.switchDisplayMode = (e = null) => {
    e || (e = this.getNextDisplayMode()), (e === d.SCALE && !this.options.canScale || e === d.ROTATE && !this.options.canRotate || e === d.SELECTED && this.points.length && !this.options.pointOptions.canDrag) && (e = d.DEFAULT), this.options.displayMode = e, this.options.simpleMode ? this.applyDisplayMode() : this.redraw(), e === d.DEFAULT && this.options.groupChildShapes && setTimeout(() => {
      this.getChildren(!0).forEach((t) => {
        t.switchDisplayMode(e);
      });
    }, 10);
  }, this.getNextDisplayMode = () => {
    let e;
    return this.options.displayMode === d.DEFAULT ? e = d.SELECTED : this.options.displayMode === d.SELECTED ? e = d.SCALE : this.options.displayMode === d.SCALE ? e = d.ROTATE : e = d.DEFAULT, e === d.SELECTED && !this.options.pointOptions.canDrag && (e = d.SCALE), e === d.SCALE && !this.options.canScale && (e = d.ROTATE), e === d.ROTATE && !this.options.canRotate && (e = d.DEFAULT), e;
  }, this.calcPosition = () => {
    !this.points.length || Object.assign(this, this.calcPositionFromPointsArray(this.getPointsArray()));
  }, this.updatePosition = (e, t, i = !1) => {
    e < this.left && (i ? this.left = this.oldLeft : (this.oldLeft = this.left, this.left = e)), e > this.right && (i ? this.right = this.oldRight : (this.oldRight = this.right, this.right = e)), t < this.top && (i ? this.top = this.oldTop : (this.oldTop = this.top, this.top = t)), t > this.bottom && (i ? this.bottom = this.oldBottom : (this.oldBottom = this.bottom, this.bottom = t)), this.width = this.right - this.left || 1, this.height = this.bottom - this.top || 1;
  }, this.calcPositionFromPointsArray = (e) => {
    const t = {};
    return t.left = e.map((i) => i[0]).reduce((i, s) => s < i ? s : i, 99999999), t.top = e.map((i) => i[1]).reduce((i, s) => s < i ? s : i, 99999999), t.right = e.map((i) => i[0]).reduce((i, s) => s > i ? s : i, -99999999), t.bottom = e.map((i) => i[1]).reduce((i, s) => s > i ? s : i, -999999999), t.width = C(t.right - t.left) || 1, t.height = C(t.bottom - t.top) || 1, t;
  }, this.getPosition = (e = !1) => e ? this.groupHelper.getPosition() : {
    top: this.top,
    left: this.left,
    bottom: this.bottom,
    right: this.right,
    width: parseFloat(this.width),
    height: parseFloat(this.height)
  }, this.getBounds = () => {
    let e = this.root.clientLeft, t = this.root.clientLeft + this.root.clientWidth, i = this.root.clientTop, s = this.root.clientTop + this.root.clientHeight;
    return this.options.bounds.left !== -1 && (e = this.options.bounds.left), this.options.bounds.right !== -1 && (t = this.options.bounds.right), this.options.bounds.top !== -1 && (i = this.options.bounds.top), this.options.bounds.bottom !== -1 && (s = this.options.bounds.bottom), this.root.style.display === "none" && (e = -1, i = -1, t = -1, s = -1), { left: e, top: i, right: t, bottom: s };
  }, this.isShapePoint = (e) => !!this.points.find((t) => t === e), this.belongsToShape = (e, t, i = !0) => {
    if (!this.isInShapePolygon(e, t))
      return !1;
    const s = U(this.root);
    if (this.findPoint(e - s.left, t - s.top))
      return !0;
    let o = this.getPointsArray();
    return i && (o = o.map((n) => [n[0] + s.left, n[1] + s.top])), ut(o, [e, t]);
  }, this.isInShapePolygon = (e, t) => {
    const i = U(this.root);
    return e >= this.left + i.left && e <= this.right + i.left && t >= this.top + i.top && t <= this.bottom + i.top;
  }, this.addEventListener = (e, t) => this.eventListener.addEventListener(e, t), this.removeEventListener = (e, t) => {
    this.eventListener.removeEventListener(e, t);
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.getChildren().forEach((e) => {
      e.options.visible = !0;
    }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.getChildren().forEach((e) => {
      e.options.visible = !1;
    }), this.redraw();
  }, this.destroy = () => {
    if (r.emit(a.SHAPE_DESTROY, this, {}), this.eventListener && this.eventListener.destroy(), this.resizeBox && this.resizeBox.destroy(), this.rotateBox && this.rotateBox.destroy(), this.root)
      try {
        this.svg && this.root.removeChild(this.svg), this.points.filter((t) => t.element).forEach((t) => this.root.removeChild(t.element));
      } catch {
      }
    this.options.groupChildShapes && this.getChildren(!0).forEach((t) => {
      t.destroy();
    }), this.shapeMenu && this.shapeMenu.contextMenu && this.shapeMenu.destroyContextMenu();
    const e = this.getParent();
    e && e.removeChild(this), this.points.filter((t) => typeof t.destroy == "function").forEach((t) => t.destroy()), this.points = [];
  }, this.getCenter = (e = !1) => {
    const t = this.getPosition(e);
    return [t.left + t.width / 2, t.top + t.height / 2];
  }, this.getShapeSvg = () => v.getShapeSvg(this), this.toSvg = (e = null) => v.toSvg(this, e), this.toPng = (e = V.DATAURL, t = null, i = null, s = null) => v.toPng(this, e, t, i, s), this.toJSON = (e = !0, t = !1) => JSON.stringify(this.getJSON(e, t)), this.clone = (e = {}, t = !0) => {
    const i = b({}, this.getJSON(t));
    i.parent_guid = this.guid, i.options = b(i.options, e);
    const s = new P().fromJSON(this.root, i, t);
    return s ? (s.getChildren(!0).forEach((o) => {
      o.options.id += "_" + f.length(), o.options.name += " " + f.length();
    }), s) : null;
  }, this.getJSON = (e = !0, t = !1) => {
    const i = {
      options: b({}, this.options)
    };
    if (i.options.displayMode = d.DEFAULT, t || this.options.compactExport ? i.points = this.points.map((s) => [s.x, s.y]) : i.points = this.points.filter((s) => typeof s.getJSON == "function").map((s) => s.getJSON()), e) {
      let s = this.getChildren();
      s.length && (i.children = s.map(
        (o) => o.getJSON(e, t || this.options.compactExport)
      ));
    }
    return i;
  }, this.fromJSON = (e, t, i = !0, s = !0) => {
    let o = typeof t == "string" ? W(t) : t;
    if (!o)
      return null;
    if (this.root = e, f.findShapeById(o.options.id) && (o.options.id += "_" + f.length(), o.options.name += " " + f.length()), this.svg ? this.setOptions(o.options) : (o.options.forceCreateEvent = !1, this.init(e, o.options, null, !1)), o.points.forEach((n) => {
      let h;
      n.length ? (h = this.putPoint(n[0], n[1]), h.setOptions(o.options.pointOptions || {})) : h = this.putPoint(n.x, n.y, n.options || o.options.pointOptions), h && h.updateContextMenu();
    }), f.addShape(this), i && typeof o.children < "u" && o.children && (this.getChildren(!0).forEach((n) => n.destroy()), o.children.forEach((n) => {
      n.parent_guid = this.guid, this.addChild(new P().fromJSON(e, n));
    })), s) {
      const n = f.getShapeByGuid(o.parent_guid);
      r.emit(a.SHAPE_CREATE, this, { parent: n });
    }
    return this;
  }, this.addChild = (e, t) => this.groupHelper.addChild(e, t), this.addChildren = (e = []) => this.groupHelper.addChildren(e), this.removeChild = (e) => this.groupHelper.removeChild(e), this.removeAllChildren = (e = !1) => this.groupHelper.removeAllChildren(e), this.getChildren = (e = !1) => this.groupHelper.getChildren(e), this.hasChild = (e, t = !1) => this.groupHelper.hasChild(e, t), this.getParent = () => this.groupHelper.getParent(), this.getRootParent = (e = null) => this.groupHelper.getRootParent(e), this.getParentsList = (e = []) => this.groupHelper.getParentsList(e), this.mapCurrentPointToOriginal = (e, t) => X(
    e,
    t,
    G.CURRENT_TO_ORIGINAL,
    {
      ...this.options,
      ...this.getPosition(this.options.groupChildShapes)
    }
  ), this.mapOriginalPointToCurrent = (e, t) => X(
    e,
    t,
    G.ORIGINAL_TO_CURRENT,
    {
      ...this.options,
      ...this.getPosition(this.options.groupChildShapes)
    }
  );
}
const d = {
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
  }, this.eventListener = null, this.left_top = null, this.left_center = null, this.left_bottom = null, this.center_top = null, this.center_bottom = null, this.right_top = null, this.right_center = null, this.right_bottom = null, this.init = (e, t, i, s, o, n = {}) => (this.left = parseInt(t), this.top = parseInt(i), this.width = parseInt(s), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new P().init(e, b({}, this.options.shapeOptions), []), r.emit(a.SHAPE_CREATE, this.shape, {}), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new ae(this).run(), this), this.setOptions = (e = {}) => {
    !e || typeof e != "object" || (this.options = b(this.options, e), this.options.shapeOptions.zIndex = this.options.zIndex || 1e3, this.options.shapeOptions.id = this.options.id || "", this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.putPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + kt + "')" } }), this.center_top = this.shape.putPoint(this.left + this.width / 2, this.top, { id: this.shape.guid + "_center_top", style: { backgroundImage: "url('" + Nt + "')" } }), this.right_top = this.shape.putPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + Qt + "')" } }), this.right_center = this.shape.putPoint(this.right, this.top + this.height / 2, { id: this.shape.guid + "_right_center", style: { backgroundImage: "url('" + Wt + "')" } }), this.right_bottom = this.shape.putPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + Ft + "')" } }), this.center_bottom = this.shape.putPoint(this.left + this.width / 2, this.bottom, { id: this.shape.guid + "_center_bottom", style: { backgroundImage: "url('" + zt + "')" } }), this.left_bottom = this.shape.putPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + Ht + "')" } }), this.left_center = this.shape.putPoint(this.left, this.top + this.height / 2, { id: this.shape.guid + "_left_center", style: { backgroundImage: "url('" + Gt + "')" } }), this.setPointsOptions();
  }, this.setPointsOptions = () => {
    this.setPointsMoveDirections(), this.setPointsMoveBounds();
  }, this.setPointsMoveDirections = () => {
    this.center_top.setOptions({ moveDirections: [m.TOP, m.BOTTOM] }), this.center_bottom.setOptions({ moveDirections: [m.TOP, m.BOTTOM] }), this.left_center.setOptions({ moveDirections: [m.LEFT, m.RIGHT] }), this.right_center.setOptions({ moveDirections: [m.LEFT, m.RIGHT] });
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
    r.emit(a.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (e, t) => this.eventListener.addEventListener(e, t), this.removeEventListener = (e, t) => {
    this.eventListener.removeEventListener(e, t);
  }, this.applyOnlyMove = () => {
    this.options.onlyMove ? (this.shape.svg.style.opacity = 0, this.shape.points.forEach((e) => {
      e.options.visible = !1, e.element && e.redraw();
    })) : (this.shape.svg.style.opacity = 1, this.shape.points.forEach((e) => {
      e.options.visible = this.shape.options.visible, e.element && e.redraw();
    }));
  };
}
try {
  window.ResizeBox = at, window.SmartShape = P, window.RotateBox = rt, window.SmartShapeManager = f, window.SmartShapeGroupHelper = ht, window.SmartShapeDisplayMode = d, window.ShapeEvents = a, window.createEvent = u, window.getMousePos = j, window.getMouseCursorPos = Q;
} catch {
}
export {
  r as EventsManager,
  at as ResizeBox,
  rt as RotateBox,
  a as ShapeEvents,
  P as SmartShape,
  d as SmartShapeDisplayMode,
  le as SmartShapeEventListener,
  ht as SmartShapeGroupHelper,
  f as SmartShapeManager,
  u as createEvent,
  Q as getMouseCursorPos,
  j as getMousePos
};
//# sourceMappingURL=smart_shape.js.map
