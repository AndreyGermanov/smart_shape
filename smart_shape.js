function st() {
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
const r = new st(), ot = (e) => e * (Math.PI / 180), nt = (e) => e * (180 / Math.PI), _ = (e, t, i, s, o) => {
  const n = ot(e), h = (t - s) * Math.cos(n) - (i - o) * Math.sin(n) + s, l = (t - s) * Math.sin(n) + (i - o) * Math.cos(n) + o;
  return [h, l];
}, C = (e, t, i, s) => Math.sqrt(Math.pow(i - e, 2) + Math.pow(s - t, 2)), ht = (e, t, i, s, o, n) => {
  let h = (e - i) * (o - i) + (t - s) * (n - s);
  const l = Math.pow(o - i, 2) + Math.pow(n - s, 2);
  return l === 0 ? -1 : (h /= l, h < 0 ? h = 0 : h > 1 && (h = 1), Math.sqrt(Math.pow(i - e + h * (o - i), 2) + Math.pow(s - t + h * (n - s), 2)));
}, rt = (e, t) => {
  const i = (p, u, g) => u.x <= Math.max(p.x, g.x) && u.x >= Math.min(p.x, g.x) && u.y <= Math.max(p.y, g.y) && u.y >= Math.min(p.y, g.y), s = (p, u, g) => {
    let S = (u[1] - p[1]) * (g[0] - u[0]) - (u[0] - p[0]) * (g[1] - u[1]);
    return S === 0 ? 0 : S > 0 ? 1 : 2;
  }, o = (p, u, g, S) => {
    let V = s(p, u, g), R = s(p, u, S), x = s(g, S, p), O = s(g, S, u);
    return V !== R && x !== O || V === 0 && i(p, g, u) || R === 0 && i(p, S, u) || x === 0 && i(g, p, S) ? !0 : !!(O === 0 && i(g, u, S));
  };
  if (e.length < 3)
    return !1;
  let n = [1e4, t[1]], h = 0, l = 0;
  do {
    let p = (l + 1) % e.length;
    if (o(e[l], e[p], t, n)) {
      if (s(e[l], t, e[p]) === 0)
        return i(
          e[l],
          t,
          e[p]
        );
      h++;
    }
    l = p;
  } while (l !== 0);
  return h % 2 === 1;
}, Y = (e, t, i, s) => !e && !t || !i || !s ? [i, s] : e && t ? [e, t] : (e || (e = t * (i / s)), t || (t = e * (s / i)), [e, t]), at = (e, t) => {
  const s = 1e6 * (180 + t) / 360 % 15e5, o = e * Math.PI / 180, n = 0.5 * Math.log((1 + Math.sin(o)) / (1 - Math.sin(o))), h = 1e6 * n / (2 * Math.PI);
  return [s, h];
};
function lt(e) {
  return pt(e) && !dt(e);
}
function pt(e) {
  return !!e && typeof e == "object";
}
function dt(e) {
  const t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || gt(e);
}
const At = typeof Symbol == "function" && Symbol.for, ut = At ? Symbol.for("react.element") : 60103;
function gt(e) {
  return e.$$typeof === ut;
}
function ct(e) {
  return Array.isArray(e) ? [] : {};
}
function D(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? I(ct(e), e, t) : e;
}
function ft(e, t, i) {
  return e.concat(t).map(function(s) {
    return D(s, i);
  });
}
function Et(e, t) {
  if (!t.customMerge)
    return I;
  const i = t.customMerge(e);
  return typeof i == "function" ? i : I;
}
function mt(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return e.propertyIsEnumerable(t);
  }) : [];
}
function F(e) {
  return Object.keys(e).concat(mt(e));
}
function X(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function bt(e, t) {
  return X(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function St(e, t, i) {
  const s = {};
  return i.isMergeableObject(e) && F(e).forEach(function(o) {
    s[o] = D(e[o], i);
  }), F(t).forEach(function(o) {
    bt(e, o) || (X(e, o) && i.isMergeableObject(t[o]) ? s[o] = Et(o, i)(e[o], t[o], i) : s[o] = D(t[o], i));
  }), s;
}
const I = (e, t, i) => {
  i = i || {}, i.arrayMerge = i.arrayMerge || ft, i.isMergeableObject = i.isMergeableObject || lt, i.cloneUnlessOtherwiseSpecified = D;
  const s = Array.isArray(t), o = Array.isArray(e);
  return s === o ? s ? i.arrayMerge(e, t, i) : St(e, t, i) : D(t, i);
};
I.all = function(t, i) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(s, o) {
    return I(s, o, i);
  }, {});
};
const L = (e, t = !0) => {
  let i = 0, s = 0;
  if (!t)
    return { top: e.offsetTop - e.scrollTop, left: e.offsetLeft - e.scrollLeft };
  for (; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop); )
    i += e.offsetLeft - e.scrollLeft, s += e.offsetTop - e.scrollTop, e = e.offsetParent;
  return { top: s, left: i };
}, U = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
  const t = Math.random() * 16 | 0;
  return (e === "x" ? t : t & 3 | 8).toString(16);
}).replace(/-/g, ""), Z = (e) => {
  try {
    e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault(), e.cancelBubble = !0, e.returnValue = !1;
  } catch {
  }
  return !1;
}, m = (e) => typeof e < "u" && e !== null, b = (...e) => {
  if (!e.length)
    return null;
  let t = e[0];
  if (e.length === 1)
    return t;
  for (let i = 1; i < e.length; i++)
    m(e[i]) && typeof e[i] == "object" && (t = I(t, e[i]));
  return t;
}, xt = (e) => {
  const t = atob(e.split(",")[1]), i = e.split(",")[0].split(":")[1].split(";")[0], s = new ArrayBuffer(t.length), o = new Uint8Array(s);
  for (let n = 0; n < t.length; n++)
    o[n] = t.charCodeAt(n);
  return new Blob([s], { type: i });
}, j = (e) => new Promise((t) => {
  const i = new FileReader();
  i.onload = function(s) {
    t(s.target.result);
  }, i.readAsDataURL(e);
}), H = (e) => {
  try {
    return JSON.parse(e);
  } catch {
    return null;
  }
}, vt = (e) => {
  let t = e, i = t.indexOf("-");
  for (; i !== -1; )
    t = t.replace("-" + t[i + 1], t[i + 1].toString().toUpperCase()), i = t.indexOf("-");
  return t;
}, A = (e, t = {}) => {
  const i = {};
  for (let s in e)
    s !== "type" && s !== "target" && (i[s] = e[s]);
  return Object.keys(t).forEach((s) => {
    i[s] = t[s];
  }), i;
}, J = (e, t = null) => (t || (t = e.target.root || e.target), K(t, e.pageX, e.pageY)), K = (e, t, i) => {
  const s = L(e, !0);
  return [t - s.left, i - s.top];
};
function yt() {
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
const v = new yt();
function Mt(e) {
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
    !i || (i.style.display = "flex", i.style.flexDirection = "row", i.style.alignItems = "center", this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][y.ITEM] ? i.className = this.itemsCssClassesById[t.id][y.ITEM] : this.itemCssClass ? i.className = this.itemCssClass || "" : (i.className = "", i.style.paddingTop = "2px", i.style.paddingLeft = "3px", i.style.paddingRight = "3px", i.addEventListener("mouseover", () => {
      i.style.backgroundColor = "#0066CC", i.style.color = "white";
    }), i.addEventListener("mouseout", () => {
      i.style.backgroundColor = "transparent", i.style.color = "black";
    })), i.style.whiteSpace = "nowrap");
  }, this.setItemSpanStyles = (t) => {
    const i = this.menu.panel.querySelector("#" + t.id);
    if (!i)
      return;
    const s = i.querySelector("span");
    s && (this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][y.TEXT] ? s.className = this.itemsCssClassesById[t.id][y.TEXT] : this.itemTextCssClass ? s.className = this.itemTextCssClass : (s.className = "", s.style.color = "black"));
  }, this.setItemImageStyles = (t) => {
    const i = this.menu.panel.querySelector("#" + t.id);
    if (!i)
      return;
    const s = i.querySelector("img");
    s && (this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][y.IMAGE] ? s.className = this.itemsCssClassesById[t.id][y.IMAGE] : this.itemImageCssClass ? s.className = this.itemImageCssClass : s.className = "");
  }, this.setPanelClass = (t = null) => {
    this.panelCssClass = t || "";
  }, this.setItemClass = (t = null, i = null) => {
    if (i) {
      this.setClassForItem(i, y.ITEM, t);
      return;
    }
    this.itemCssClass = t || "";
  }, this.setTextClass = (t = null, i = null) => {
    if (i) {
      this.setClassForItem(i, y.TEXT, t);
      return;
    }
    this.itemTextCssClass = t || "";
  }, this.setImageClass = (t = null, i = null) => {
    if (i) {
      this.setClassForItem(i, y.IMAGE, t);
      return;
    }
    this.itemImageCssClass = t || "";
  }, this.setClassForItem = (t, i, s) => {
    (!this.itemsCssClassesById[t] || typeof this.itemsCssClassesById[t] > "u") && (this.itemsCssClassesById[t] = {}), this.itemsCssClassesById[t][i] = s;
  };
}
const y = {
  ITEM: "div",
  TEXT: "text",
  IMAGE: "image"
}, Ot = (e, t = {}) => {
  const i = {};
  for (let s in e)
    s !== "type" && s !== "target" && (i[s] = e[s]);
  return Object.keys(t).forEach((s) => {
    i[s] = t[s];
  }), i;
};
function Ct(e, t, i = null, s = {}) {
  this.panel = null, this.container = t, this.items = e, this.event = i || "contextmenu", this.options = s, this.listeners = {}, this.origEvent = null, this.cursorX = 0, this.cursorY = 0, this.overflowY = "", this.maxImageHeight = 0, this.subscriptions = {}, this.init = () => (Object.assign(this, new Mt(this)), this.listener = (o) => (this.onEvent(o), !1), this.container.addEventListener(this.event, this.listener), v.emit(P.CREATE, this, { owner: this }), this), this.onEvent = (o) => {
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
      const l = this.panel.querySelector("#" + n.id + " > span");
      if (h.style.display = "none", h.src = n.image, !this.panel)
        return;
      const p = document.createElement("div");
      p.style.marginRight = "5px", p.style.display = "flex", p.style.flexDirection = "row", p.style.justifyContent = "center", p.style.alignItems = "center", h.height = this.panel.querySelector("#" + n.id).clientHeight, h.height > this.maxImageHeight && (this.maxImageHeight = h.height), h.style.verticalAlign = "middle", h.style.display = "", p.appendChild(h), this.panel.querySelector("#" + n.id + " div") || this.panel.querySelector("#" + n.id).insertBefore(p, l);
    }
    this.adjustImagesWidth();
  }, this.setItemsEventListeners = () => {
    for (let o of ["click", "mouseover", "mouseout", "dblclick", "mousedown", "mouseup", "mousemove"])
      this.setListenersForMouseEvent(o);
  }, this.setListenersForMouseEvent = (o) => {
    for (let n of this.items)
      this.setListenerForItem(o, n);
  }, this.setListenerForItem = (o, n) => {
    const h = (l) => {
      !this.origEvent || (v.emit(o, this.origEvent.target, Ot(l, {
        container: this.container,
        owner: this,
        cursorX: this.cursorX,
        cursorY: this.cursorY,
        itemId: n.id
      })), setTimeout(() => {
        ["click", "mousedown", "mouseup", "dblclick"].indexOf(o) !== -1 && l.button !== 2 && this.hide();
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
    if (!this.container || (v.emit(P.SHOW, this, { owner: this }), this.drawMenu(), !this.panel))
      return;
    this.panel.style.display = "";
    let o = this.cursorX, n = this.cursorY;
    this.panel.style.left = o + "px", this.panel.style.top = n + "px", this.panel.style.zIndex = "10000", this.panel.style.position = "absolute", o + this.panel.clientWidth > window.innerWidth && (o = window.innerWidth - this.panel.clientWidth - 10, this.panel.style.left = o + "px"), this.origEvent && this.origEvent.clientY + this.panel.clientHeight > window.innerHeight && (n = n - (window.innerHeight + this.panel.clientHeight - 20) + this.origEvent.clientY, this.panel.style.top = n + "px");
  }, this.hide = () => {
    this.panel && (this.panel.style.display = "none");
  }, this.addItem = (o, n, h = null) => {
    const l = { id: o, title: n };
    h && (l.image = h), this.items.push(l);
  }, this.removeItem = (o) => {
    const n = this.items.findIndex((h) => h.id === o);
    n !== -1 && this.items.splice(n, 1);
  }, this.findItemById = (o) => Array.from(this.panel.querySelectorAll("div")).find((n) => n.id === o), this.setId = (o) => this.panel.id = o, this.addEventListener = (o, n) => {
    typeof this.subscriptions[o] > "u" && (this.subscriptions[o] = []);
    const h = v.subscribe(o, (l) => {
      l.owner === this && n(l);
    });
    return this.subscriptions[o].push(h), h;
  }, this.removeEventListener = (o, n) => {
    this.subscriptions[o] && typeof this.subscriptions[o] < "u" && this.subscriptions[o].splice(this.subscriptions[o].indexOf(n), 1), v.unsubscribe(o, n);
  }, this.on = (o, n) => this.addEventListener(o, n), this.off = (o, n) => {
    this.removeEventListener(o, n);
  }, this.removeAllEventListeners = () => {
    for (let o in this.subscriptions)
      for (let n of this.subscriptions[o])
        v.unsubscribe(o, n);
    if (this.container && this.container.removeEventListener(this.event, this.listener), this.subscriptions = {}, !!this.panel)
      for (let o in this.listeners) {
        const [n, h] = o.split("_"), l = this.panel.querySelector("#" + h);
        l && l.removeEventListener(n, this.listeners[o]);
      }
  }, this.destroy = () => {
    this.removeAllEventListeners(), this.items = [], this.container = null;
    try {
      document.body.removeChild(this.panel);
    } catch {
    }
    this.panel && (this.panel.innerHTML = ""), this.panel = null, v.emit(P.DESTROY, this, { owner: this });
  };
}
const P = {
  CREATE: "create",
  DESTROY: "destroy",
  SHOW: "show"
};
function Bt() {
  this.menus = [], this.create = (e, t, i = "contextmenu", s = {}) => new Ct(e, t, i, s).init(), v.subscribe(P.CREATE, (e) => {
    this.menus.indexOf(e.target) === -1 && (this.menus.push(e.target), e.target.id = this.menus.length);
  }), v.subscribe(P.DESTROY, (e) => {
    this.menus.indexOf(e.target) !== -1 && this.menus.splice(this.menus.indexOf(e.target), 1);
  }), v.subscribe(P.SHOW, (e) => {
    this.menus.forEach((t) => {
      t !== e.target && t.hide();
    });
  }), document.addEventListener("mouseup", (e) => {
    e.button !== 2 && this.menus.forEach((t) => t.hide());
  });
}
const k = new Bt();
try {
  window.Menus = k;
} catch {
}
const Pt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECcZZuWhdAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlZBBEsAgCAMT/v/n7akzWAFtTo5mQ8SAJtkGcL4LXcg211A2L+eq3jc5C/AGTUBZ7wYAHH+B4yIAv8a8dkvilLz9qXuYKseU2E7qDFODqIwTIEkPSldAAa0WlbUAAAAASUVORK5CYII=", It = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECgYlnqNLQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABZSURBVCjPlZFBCgAxCANN/v/n2VOhiFU3N4U4GgXELUkAikbOhlhIh1QZXkR3hGc/IsaVMtHT0RXR3e5jescIqBpy05T/tInffw2AvEkr972N+a69+U8e8AGOtEABr4X+4AAAAABJRU5ErkJggg==", Rt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECkWaNmRawAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABjSURBVCjPlZBRDsAgCENbsnt6/1N0P2ocijASEy08iqC1BknhASCvsSeOQXImJXHcrQL4t1UAr4fjReDmdCsc/5LEZ7NOwOlUKVy3RwC/AAAwL2TAZ3t+xFszOxVl7lbtvsYLOtlZCOj2NccAAAAASUVORK5CYII=", _t = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECoXNPPyPgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlVFBEgAhCAL+/2f21I5jqcXFGRMSpG1EkLRtooEyIdaRlAc7orqBsg+gVKy8yTYn49vqMb0pgCUuPOBP93Sniaxb8/FdL6mt/rZe5SMKXQWRf/4AYrs6C0ViuwUAAAAASUVORK5CYII=", Tt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDsHep3BSgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA8SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCAZy0h4AXLILDAEWNOwAAAAASUVORK5CYII=", wt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDMMJZaSygAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA/SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCJxAWZoFp1MBY8cLTv/x72kAAAAASUVORK5CYII=", Dt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQARsznxFAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", Lt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQEbSvcpSwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA3SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTCICjCTbxPJfsIWSv+JECM9nugHAG40DyW1OoLPAAAAAElFTkSuQmCC", Ut = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDIpd4l3zAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", Vt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDYr/evT5AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", Nt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDUsSKIVhAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA0SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTBQZBPJfsIWSv+JECM9nugHADv6Dv2P6G4ZAAAAAElFTkSuQmCC", zt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDQQftZYQgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", W = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAEDSURBVDjLzZPNSsQwEIC/CUWtQlnZi14EYb36Jj6DT+ZT+BSevImHPYggKLpo2bW1Ze14yJjFtKEed3poMpmvzZcf2LqQfkolZFV0FFDhkMI6JR99JAbczTlP/tGZung86yN7Spn+4ABw0PH5DyCoOoSvYOg00s9C+YSpL8oLGgMmnOILF2r68qvKibvWXd9hbsCZ/ajpLniULnKQO82tubb3vY3Uw9IrvhOmCaDFJYC2DyjLt1vNQGjzI5v7+1wrBWTN0uQ3R0OFfQRwz7PjS8td8UAHKFW0rCDqt0ud1mEfKlZ+bYYdNtGQjAFgh6L+M9sRQKev5Yu1F4zfh7ELtIXxA+JiW9aVMPJ4AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", q = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAACn0lEQVRIx+2U30tTYRzGn/fsPdOmNkWDsEDnOiFCbv4KhPJCFAvDtBuRyL/A64TwQkGaCt7pVYqimHhTJAVhuYsRE5zipLuZeQKNsMQdN1vbzvbtwg2Oa5s/uvWBl3Px8P18OO/7ngNc5H9DROw8XTxCumEiygJwjYh4kp7HuqzTiJLBc8aslr5+vbiy43SWaiVExHecztJ+vbgyZrX0EVHOqSVx+ERFee8wR3hcBNky+VpcEofbMvnauAga5ghPVJT3ppKwJIKsqRrr0/3P68+KdeAMgBIFfgjc/cT+6TEATNffmbkaVa1GASAAcgRq3i3L806Xe4gxdqjl8QS4ACBPDPibpIwjOAAUAOBR1fqy8e4MAFwXVGuuZlLi4ErA3wTgBREFGGPRdG+gCytKy3JDTdfvrxv12s4bOXrm6o7PGEok++2PrhHRaJxnjEXSblFMog/7lea1xn8liTGUSPaKD64RMdv4jjEWOvEMtJKIX2lev1fTFdhKLrlkkuyW964RXQo4kOY7ABBVNj0e+eDwMudAsiUfHF5WNj0eANFUkFRbxPdWl268elA3Wyyq1nwx+fBeGJDD3P3oraMjv6r2C2NMPVFARLq91SXpTUvdrEmvWgv0SJtfIWArxN0P5x0d+VW1G2kPOXZNC6dMma+LebD6SgI8o+imHQCC3zzHzuRnCJDVjJXOrT9tAL5rr+mxM4gV+w3dPY7CbCEkciC+DGbJXjS3PFo0tzxqMEt2bVeYLYQaunscAPa18KSJ/SrMyuSgTa4WgnIlaLtVWlR93jYi0hORXvV527ZbpUW5EiRXC0FlctBGROaz/o/Mvumhgd32soU4XNPrVZ+3bbe9bME3PTRwJniCxERE97VwrSTWmc4MTxSdp7vIqfMXBoR6XMSZc1QAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDB/NVeTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwDmjvLwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=", Ht = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAG6SURBVDjLlZK/TxNhGMc/z117FgWbNulITGMYTMvAaHAyhMTAIoOmcdD/wMWERdO4E8If4OJASBgcGcA4QRgx4YcLA4aUYDTRCoX2fj0OvTu441rwuem+7/N5n/f7PA/8ZwholiHuYCCXdMWnxYk4KYwWSws0+JX4GqUFLaqRVmHYWFUfTZ6I4U9ynKyRAUztoNsfq6f4gWrsDI6+VMGMPTMCwIHqGt+xA9Wq3uNFuukIoIUtduiYFs51QDIcwMSKrHn4otcBebJ4QfofmnghYKcANlCQxaj505xcAL0qGM1lFEXwwsH2B/zi0/DXXbps2k0YtDBxAbxvPbtUL7/Xi8HVy90ntXdwVUUgHKGADufedrJUsGKWd2857aXMXLAy4j7nUOxuhdabvfmR86/x0gPO7AFn3lYkCJaqON31HqVCNpZvMkCDA3kVtfUD5/yVYwFQ48qaZShO1VeqbEbKwyfbK+/kx5VtDO4TLO/Rs7FPpVCZ+bm8Za5LpwcAKuTajycebBQAxn9/3st9oSPaEwAVbjcnx+/vDlZON/bza5yJ0j9UNH9Um3h9VNO7/a6OIwWd0sIN09PiH5BSrD/OwMFRAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", kt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAFGUlEQVRIx7WVaWxc1RXHf/ctM+OxPcQLxIljD3GCAYOxiHCSpmmWEgi7kBBIiEXiU79USHxhEaJtWqFWqqhQW1BLIImrVLTwgQBhM2sIEIVFCZDFSbCdxI4X7ExmMjOemffuvacfbA8e1FYNUv/See/o3vf+5/3/5+o8+D9DzSYiolatWhUrFArR2bXa2lr1317OZrMCcPbsWQFIp9PypOt23TsxsbuigIiogx8/d9+StsW/8P1Y8ty/U6avpYCPf/2XbMPdV9/fueZn2wA8gPXr11e/uu2hX1EabQlyeRQKlPofuQVBQCy5XYdwGv3aZGvLJuCfQMEBsNZW+RG/xZSyWAEjqiJCA09ueZtr736CXXuPzdkDI2CtYI0wvvsY1a21RHyvFYgCOACJRMK1RmMsWKuworDiYMXBWMXjf3yF9/f0s+mXjxB6TfR+eLi8Px0Kk5lieP8g9YsvIAiLJBIJp2yR53nKaI21Mu3MbAB/3trLnn0neeap35FsrseGU3y5r8SLO/dy2/XLZ13CfHacjO8Qr6tBl0qIiCorUEq51oYYIxgr05KtsO2FXbzy9n4ee/jnjJ44wOmRQxw5+CnP/r2XqliU51/+BGMs1kDu6Di6KcFUMcBajYh8p8AYo6wOsMagRGERnu55kx1vfc6Plney+bmtXP3jDv72j9dYOL+ODasvp7urjfxUkb9uf4d7b+gmNTBGtK2RIAxBTPmEejNNVkYHGKMRIzz42xfY/ekRrlvXxdruC5mX6MB1XVZ3t2OtMDJ+hoETY3Rd2sLtN69gz5Z3qU3lqN9wEQrBmu8s8gAymYzosITRITvf28fxoQmeePROCqWQMAiZmMxgrSWVyhCEBkQIwxATlFhyYSMr59XyXv4bEp7Cc8CEYaWCdDqNDovoMODowCgbf3IpuXwOgHyhRLEQUBXzwcbAUbiOQ8RXHO0f4tuJM6w+nSeb8ImKQSFoXSKfz1NuciqVQodFQh2w8soWjgyOMjwySVNjNYWpIhFPiMdcfNcS9YSYJ8RjDvGYi2ciTC6/hlxbMx1Lzyc0Bh0EZW5vpoCEQQkThlzRPp/O9iZe/+AQv/nTa2x+/A6y+SI18SijE1mKpQAdWiIRl5XLknxzzOdYop5IcwO+pwiCEOUVKy0ClA6KGB1Mjwmg98PDLOtYiBjN0KkU45NZhsYydHcuIhZ1qa3ycMVgaxYycnyAqzrOI5ctYMXietFyAQegUCiggwJGG7TWaK3pumQBff3f8uyLe/F9RceSBrovWwDG4CkoFgNS6RxnTIxTo4MoMYxOZNDaoIN/pyAsIWLLM+yWn17M7Rs76B9K0fPSF2xYsZh0tsDi5np8L0Y04nH4eJrtvc9z5dIYg8PVNM6LE/UddFiqVAA4WocYY8rxxYFhdn7QRzzm0TcwwchkjisubmLB+TXUVEeIRBw+/3qQI4cPUBfXIMIFDXFELFqHlU0GlNGmYgqv6Gwu53fd2Mn+vjH6T57m/rtWYo3BWOGTfSdJNlXRcF6M9mQdSoQ5PJUWGWPLP47vY113kjVXtfKHnj38fstH3LT2Ik6NZ+loa2Tj6iW0JxuYGTlzuSsK2KGxzGTz/ESjWMN/wgP3rCjnS1vrWNvd+j1iUI7LqfHMJGDnFhjrefmrN+67bfmNyUVN9cpxUY6Hclwcx0WVY/pxsRqxBrEGO3OfXTsxPJbq2fHVm8BYWcYMLgNuBS6Z0/xzhQX6gB3AwR/IcW74F/jUry6yACAoAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", Gt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAE8ElEQVRIx7WVWWxVVRSGv733Off2Xjrc0oFKy6XQoqCMEgc0RhFNVBzwQRIfUBKiTyYqCSQmmhiNJkSjiQkJiQ8mKg5xiGKCCIpEZFCCcwlVhlCwrbSlpe1te8/Ze20fTluL4AMaV3KmZGd9a/3r7H/D/xzqb99pIPUfc0ZA8TzALzvee6C5adbTqVRqxgXrGFupDUqBR4EG/LkrfVwc6jjZ9nzDkjuemwjIFFq/OZRyI43EI//Qp0IpnTyDAKU1KDUBPprKpJAgNRTk51cDw8GYNKkwaJTCIHgPWieVeTkX4lWSWCzaGDAhSisUejS/BxdhMqXZUbnHAUpsTH//AH2FYQojMWcGCgBUZNM019eQCsNkpVOgNV4MSgQThHgDSpm/ZEp0UwDjAO9istkSJpWWooIQrwNO/dHNdy2tvL31S2bW17H0yjnkp9aCKLxolLMgHh2GEJBIqAGRCcImUT38884uGeyFIMShCdMZMAFoQxRZPv96P5s/2EJ1RSlrVtzKFc15lNZoE2LSaXSYRpkApQ1kKtANc2uA7jFATeH7z05LoY+ih9N9BY793sVwFBE7x9LrriFXXo54z849+3nl1ddZMKuRh+69lfq6GlSYIkhn0Kk0OghRJeXo/IJaoGsMUDtw4JM/3GAvrW2dvLN9N22dZyhaR29/AWuF8tIM0+vruO+OW5jdlOeZlzdx6Mhx7rnxKlbdvYxcrpIgncWkS1CTcpj8winA6QlDjhAbMWvqZErTIXu+b2FwpEgmFeKVJghCevqH6O79kKqKLLfftITLm6bz7tad7P2xlQ2PPUg+Pw1lDMa582ZQ1/vV2x1u6CxRbPntZCffffwtmeV3MmQt/b09tLed4OCh45w6fpiG2iqWXb2IqvI0c2Y08MrmLQC8vP5hmpubSFVUYZquvQToHOtAiysiEhEYxeSKEnp8kRvP9DBz1QMopXh9234GGvuYZ4Qsll9/2Mv04hkaasrZ8MhKXnprGx/s2M36xmmItZD8T8kNUDaOcNaR7IdBGhdOp3XfPrIlJQTpLCvvXMaifCVvPvs4B776HH/ZDTQtuY0t+1po7+ljwyMrmd1Yh7URYovj6owDJB5BXIS1MfVVZeRKM/SGwu6nnqR6co4X3t9DN2WUV07m+hX3s2Lptaxe/SAvbnqNT789TN/Zfm5ePAdxMWLj8wE2KiJxjIsilLXMnVZD47x6TnScYte6tSyp1fza3sddT2ykc9CwsKGSsrJSamrrWPfoWn48chJxDnEWl/jZuTvZFUfw1uKdgAiBeK6ZeQk9UyrpONbFpT99ST5TRvtQjvlXLaIhtHQdO0I00MNQ+1EWN09FXIx3DhcXzwNoH0d45xCbAEQSR6nOpKia14CIx/qIKcOnSB/tpPeEQQcBxigmaY0ODF4s3sZIVBxXZ8I+sIgVvEsufGJagkJp0EoT4kllQpRS4D3exjg36rChR0UxNijilbqARNbhrYB4RHxi22Pu6AHsqPcrvBp1TMWoH3m88slhVBwZO4TOGbJ09w8OKDzee1RSPqDwPnn3kpBEBHFJIYjHW0Gsw8cWsRE2LtLW0d4HyMQOOt/44uD2NbddvzxXnitRyoBSKG0Sd9QapUwiBeC94MWBCB6X0JWgjaaju+fsxg93bQM6J1oFwBXACmD2hM4uNgQ4DHwEtPzLHBcXfwKfID6QlqygzQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMH81V5MAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDAOaO8vAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==", Ft = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAFdSURBVDjLzZO/TsJQFMZ/t1QsmthEjQkmLoZJA7ODq/EdHBx9BcTEmMjCxsA7+Ao+gFOdCImOuoAs/qtIldL2OECxLY1EJ88Zbu6933e+c/988MtQ8akotOQaQqAklSAaS5hkEgQfmzcVTImJEjPfoMNjIjv5hpiiEgqiyJLXLiVAEpWU0oJ9HpQHoEeaWWFZPpGbiy17QlK35vaBqBAXaWajzp3sYWFJUQzRx2lIEQtLNmVMGQ0ZzPYuXQQX6OON5EGgjxstHkrp8k4A8c1xpBJgAMAwhTBMJ7jT1X5WGP5nBQ1dvve1mQq1wjGEX02rFX5S8HPOh16pVOYjiAHNnIeXTuidtc/XnOv4ERa8ky42fkpL9dXyfTnLXAzf54UmvdBCCkB01hcPHZ0djHh15QVHdHBV5BYAfOzq06npXMXhhl995TkKnxhINEqUyE49WYtW3JxRx82w/x/jC67KmykWiVPXAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", jt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAACQElEQVRIx9WUz2sTURDHPzMvIb3VgyJKW/DXSXoKtSJIbaxtgi3of+BfIYKXgOAfUCh6zFFR9Ca1tomXigf7P/SQqo2giIrNpvvGw+7GStIlG/HgLI8dHvPmOzPvw4P/3SRx1hurde/9bL8g7z1mhveGWeQj0liq3CgNrLS28cKy2JNnj2yQvLnE6XQ6AHz/8Q3vPd6HhMk/3CcMw2j5fU5NnCMI2gMV3hUIggCAdrDHy9U1zDzeopF4b5g3jJCZKzN/xA8h0Ga2NAMIZoYRz91b3JmP4ttZBeIDPgzZWK8DgghEgzbMADNKc6W/6yD0nqtzJUQEVY2FonXQ2lkFkgNOlXq9gYoiqqgIiCJETM+XF7oFrTxYtjNnT6ci3NOBc45yuYxTh3MOVYeqxt0QJYjjp6cuUSwWe6p++vzxbE8HiYCosv5qI0rqFKeOxeuLqHOICHbgkr98/czH1k4qwj2XLMD8wjWcy5FzDudyICDxZ/FdBEHAm81Nms1mKsI9HRw/djL10hyuGz81fYHJyfOpCHcFDNu8c/f2RUveHTMS38xcNPookXlPYWSErXdbtHZ3UxHuCtyr3r9crd4qbCcb27+rHp848XNp8SYfdndQVUSEkUKBsbFxRo+MpiKcO7Bv1Wptr99YVh4uUywWab4/SqPxGhVFnaPV+nQowv0EDrVOp4Oqks/nqVQqAyGcSWAYhLMJDIHwUB1kQTiTQBrC0RtkRAhH+7l87m1yVgYRAOQwhPtZrVZrk7z0/9p+AWdQwNFPdOB+AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDA5LTEyLTAxVDAyOjIyOjM1KzAxOjAwqBTIawAAACV0RVh0ZGF0ZTptb2RpZnkAMjAwOS0xMi0wMVQwMjoyMjozNSswMTowMNlJcNcAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAE3RFWHRUaXRsZQBPcHRpY2FsIERyaXZlPme6DAAAAABJRU5ErkJggg==", Wt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAAB3RJTUUH5goLBzIP6fiS+gAAAoFJREFUSMfVVk1rE2EQft55EyKeFU0PlcR6koIa+0FBa2NtEmyL9uLBIoHi0YvFogghIIjoTbx4MldB8BRUTJNeqh7MwT+gPaSpKdjak2bTnfGw3SVhP5p4EFxYmJf5eGbmfXZmgf/9UbZQqrwtM/OElxEzQ0TALBCxZChVmclcSe4HEGoLMjEwv+AoYvV6oOOr1y87kvkajYotxzc2lAug1Wp1BPi5swWTGcwmTHMXpmlaL+8i1n8ChtHsqkUOgGEYHYpisQgWqyXMAmGBwMT4hXFP+64AYvU66o0aFICx08OOUbj6EcICZgYzW/ZNw7ct3gBNKyM2TSyXyjjfZrRcKkMEgAiSk8m/rwAATGZcnEyi/UZSqRSU6kyw2SuA7aCJUC5XQE8eQRGBlMLoqbMdTt8AzAF4k7uH4wNxiAiKLOJFYVcFWmuk02lo0tBag0jjx+07ntmNDI0hkUgEUtgFoIhQer8MIgJpgiaNMz7lb+9s4fvmeiCFXZesAEylLkHrEEJaQ+sQGj4AH1ZXUavVAinsquDI4b6u58zQyDAGB096UtgFIJDVu/eXRsWeOyKw5VuA9gKofq5is9EIpLAD8CD/8Fw+n42s7Z1zz9/9snUvbmYxM30VG411EBGUUjgQieD6fNYJdPBL1ZPCobaEJJ8v/LYPuWjUURztiyKRSKBWP4RKZQWkCKQ14m3OK+UVTKVT/hUEPa1WC0SEcDiMTCbjUHh7ccmxmZmdtb6BIAC/2fLYMMSTws+eYvryNEhr1PqPOXGMhRu9VRBEYShAoXOM9NyiXinsC+A3coMobK1RAa7N7e0NRkipT66dvN/ubqcw1oKNC4VCE4D8k7+KP78ve+ZyfaadAAAAAElFTkSuQmCC", Qt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5godFRotCxUC6QAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAPfSURBVEjHtVS/TyNHGH27Ozv+sRj/CDYuQCJSdBRp6CkjLlWkFFGUUCJLSUkBhfMPUCJEQZciihwqpEsTiQasSBQnIaUgd2ALkC4sxpzDcuZ8O+udbzaF2cXEwF2QstLTzOx+s2/mfe/7tHL5h+DCceC6LgxDh5QSvpSQkiB9CQrXJCGlBEmCvF734m7e+f5N3LtOB2+v3oAFgUKhMIpM7iPkRvKQvoQkgiQCSQWp+uakQEpCSgW6jpFEIFK9A4VzUjiuv8Afz38H0zQNhmHA5ByxWByGIWFIgkEEYgRDKRhSgRiBUY/QkApECqyPhIUkSoGRgsnj0HUDzDCM128uHTiOA/uvV70bRBKEp7+RRRJBSgJRD354Yyl7e1Uv3vn7NXzPBQPwaYAAQRBAKdVDoG7mdyAI5xSuCUrRQBwC/P+PNj8//02tVoNt2/B9H57nodvtwvM8CCHgui5SqVQskUjUbdve6d+8tLQEAFq5XA5WVlYKZ2dnn6+vr8vp6Wk+NTX1cmFh4TlLJpO/WJaFoaEhSCnBOY+IOOfgnCOdTiORSDyzbfvLfoJyuQxcC9FsNr9utVqrnueh3W6j1Wr9trW19RWbnJxELBZDPp/vWe/a277vRxgZGUEqlcLe3t6dMqytra3t7u5+v7GxAcdxsL29Dc/zPhsfHz9i+Xz+qRACuq5DKRW5IySSUqJYLPJ0Ov3qPp3r9fonjuMgHo8jFovBNE0IIfjR0dEoq1arODw8RKPRABFF+ocQQiCVSiEej9+byEaj8asQ4m0ulwPn/AvG2C6Al81mM8Ysy9pMJpOwLAtEBNM0I3DOYZomMpkMksnkMwC3cjA7OwsAWqVSWQWwOjMzM3R1ddXUdX21Wq3+DACMMQZN0wa93lcXhmGAc37fBSK3CyGSjDENQBTMiOip53lwXRdKKXS73Vsyua4L13W5aZoDOahUKreZgkAL7R8RTExMQNM0FAqFyD39CZZSIp/PI5VKYWdn5z8XGmu325uXl5e4uLgYsKfv++h2uyAidDqdgRx8EMHJyQmOj49xenp6y0VCiGjMZDKwLOtRrYIJIb4NW0JIIIS4BcZYTClVfxTB8vLy+vuCzs/PAQBPnjzRAAS1Wu3DCRYXF/P7+/uwbRtEFDW78PSu6yKbzeqWZbm1Wq390M+CYLA/M03T/tQ0Df+Gruv9Y1bX9R8BfPcQgVJqkKBYLOY7nQ4Mw4hcFNZCiGubfnxwcPCgHGNjYzqABICor7BMJrOey+XQ7XajGghJwjoYHR0dGh4e3nyf3tls9h2AnwC8eJTlSqWSViqV7vw2Nzen3bX+BxxQD5I249kcAAAAAElFTkSuQmCC", Yt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5godFRgEe5H4BwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAARuSURBVEjHtVRNaFRXFP7u+08mkxknYyxGU6QLEQwuko2LFkRw0UXAhWipWJql4LIEdCtuulfpYlZCbBdt0YKWLixIS2mLhVStEtJGOpSYZGbMOPPm3fvuOaeLyRsnpkY3PXC479537v3e+b77PYW+qFQqO0XkwdLS0s7V1dXrV69e/QCviNnZ2VPMPBfHMdI07aW1FlprRFGEYrEIr39To9EAM6NaraJarWK7ePjwIZgZnU4HWmsYY6C17qWIwPf9zQDtdhvMjHq9jpWVlW0BBgcHPWaG4zjwfR/GGPi+jzAMobUGM8N13c0ASikopeC6LlzX3RZgamqqxcytJEliIhJrLay1YGakaQrP85DL5TYDZCEieF2cOXPmJjPvSpJEAMBxHGQjEaFYLKJQKGwGEJHe4UqpbQFOnjw5yczntNZGay1aayRJ0tMiTVMQ0X938CZdDA8PH2Tm00mSIAgChGGIMAxhjIExBkQEpdRWgOzLX9dBoVCoE1HL87w4CAIxxiCKoh6AUgqe520V+U34B4BWq3WTiHbFcSwZNZkHjDFg5q0d9GvwOqCxsbFJZj4Xx7FJ01TSNIUxpmc413URRRG8SqWiZmZmBAAmJyfje/fuyQY9tv/A8+fPq0uXLvVQa7XaQWY+nTm5X1xjDESkS9HMzIxcu3ZteHV1VW7cuLGnVCo5Gy3mLly4MCgiOcdxmhcvXtT9gNVqtZ75oP8WZRRllHkb3H+aJMnHy8vL6/fv3y9Vq1UMDAy8v7i4uDQ+Pp6Loug0gK/6Ae7evXsTwC4A23LpAcDIyMg79Xrdb7Va5cePH6PRaMjQ0FBYLBZ3TkxMoFQqlV7eeOXKlUlmPpckibHWirUWRARmBhEhiqIXRisUCl/k8/nd+/fvP7CwsIC1tTVEUYTR0VHkcrnb5XJ5/mWAR48eHch80P83zdJxnK7It27dUocPH/7szp07T8Iw/LpWq0VBEKjx8XEcPXr0geM4x0+cOJFcvnxZnT17tkfH/Py8IaIe7y+ntbYrdMbhkSNHvp2bm5s6duzYrxMTE1Gz2by9b9++49PT00l2i/s7OHTokEtEaLfbm66ntRbGGARBgHw+jy12/eGn395d+uvPsmV//qMPpxdfJd4vv9eGvvum8l6z2bRaa7E2RWpT2NTCaI1CcRh794xBzc5+cmq9sQLdWVeA5fra02dkyfrh4IDnh3lrSawlWCIQEawlMLPTieOk8az+HHBAxCBLIOJunQD1RhPWAh4gc4HHCAYsIp+xI1fubiABMYPIhSUFYgdEbnedGFQI8NboMIjlxRoxLAmYBStrz/Dk72V4Qga7d3Tw9kgbe8sEKx5EXAg8MAIwPIg4EHgQuOCNFHHB4kFUVtsdRVyI8vDjz3/g8y+/h+e6PpqdAEtPA6y3GcQKxAAxg0VAbMGswALwxjsWgFiBGWBRvWeS7ihwsLD4D7RO4SnHu95KPDSbAWpNhqUX2d86sYCJkWbz3vpGrZXenBlYq69DmxT/e/wL/opRMma51lkAAAAASUVORK5CYII=", $ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAYCAYAAAARfGZ1AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5godFR8VXmBOMgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAItSURBVEjH7ZS9SitBFMd/M9nZddeYysYnCKQQsbTwMRQEbS1TpEsl+BIWwcLGMpXahBSCrVpY+ggJWiyus9mZc4uwMblJ7kW44TYeGM58nPnPf84XrFDUw8PDeKIUSqmvg6n1Iv03252dHfQqmf+Afw9caz0TtLlMUAqt9ffAtdZEUUSlUiEMw6XAYRiitZ7oP4KXF2q1Gi8vL7TbbVnGLggC4jim2WzKzc2NGGMwxsz9VJfG1WoVgG63K5eXl/L+/g6AMYYwDGeGMYYgCNjY2KDT6XB6eiqvr6+EYUilUvkikSQJxhienp7o9/tirSVJEoIg4P7+Hu89IjLRIjIhk6Yp1WqV4XBIs9mUvb09Wq2WSpJk7I1er8fd3Z0Mh0OcczjnKIqCoijw3lMUxWRvWk/blXtZlqG15uTkhLOzM6XLL/4LERG01qyvr4+ZPz4+EkURz8/P9Ho9sdby9vaGtZbj42MlIgAz7jHGUKvVuLi4kMFggLWWNE3Z39+n1WqptbU1Go0GQZZljEYjtre3qdfr6vb2Vvr9PlmWsbu7i/d+rimVPr+6uiJNUzY3Nzk/P1eNRgPnHHmej+0AiqIgTVOiKOLg4EBtbW1xfX0t5VnJfjrVnHMMBgMODw85OjpSIjIBXdpyy8Kw1hLHMdbameKZLrSPjw/iOMY5N0dgYcv13vP5+YnWmjzPJ5d+D1ye5xhjyPMc7/3CAC9Nk2lfL8uMRQ//9PP/C75S+QX3zx/c9r2O6AAAAABJRU5ErkJggg==", tt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAXCAYAAAARIY8tAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5godFR8FQ9deVgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAJgSURBVEjHtZW9TutAEIW/2V175QSQIvESUIUiEhQ0gISAJ0C8AM/AA1AlbwANBQUtDRIFEgWiTIEoqCkoKAIyRrZ37Vs5yr0Xx7k/jORmd2fPnOOZs/DNIQDD4bDxYBiGXFxclO12m729PcmyrDGn2+1iZqlCa02SJJydnaGUYnNzkyAI8N435iqAsixrvwpgMBiURVGQ5zmDwaDUWjNLrmqqwBjD09MTd3d3RFFEq9Xi9vaWx8dHjDH/xkBEEBH6/X7ZarXQWqO1Zm5ujn6/X1b7jQzqDmituby8LF9eXrDWYozBGIO1ltfXV87Pz0ut9d9JpJSiKAqurq5YWlqi0+mMARYXF1leXubm5obPz0+Uqle6VsSKwenpqRhjuL6+5uTkpAQ4PDyUXq+H954kSZjWsqa67CuANE3x3hMEAXEcU3XO+/s7cRzjnMM592V+I0C1XlXnnBsD5HmOc45Zhs3MPPIi47acpvkfMZhkIiJjBpOt+d8YKKW+h0F12SSDSVZNTMw0zcMwRER+YyAiKKUIwxCALMsoiqLeru/v77+sXGvN0dFRORqNmJ+fZ2FhAYDRaMTHxwftdpvj42OphvLXWF1drbcK7z0iwsHBgURRRBiGP1lFFEXs7++LtRbvfa1VTP3JeZ7T6/V4fn7m4eFhvN7pdFhbW2N9fZ23t7dmN62LoihIkoTt7W2x1o7d1FrL7u6uJElSq/3MD06WZYRhyMbGhlQAW1tbYq0lTdPGB6exTcuyJEkSVlZWGA6HGGPodrvEcdxY/cyD5pwjz3N2dnYkCALSNMU5N9Og/QC/FsDpo71BjQAAAABJRU5ErkJggg==";
function Q(e) {
  this.point = e, this.contextMenu = null, this.updateContextMenu = () => {
    this.contextMenu && (this.contextMenu.destroy(), this.contextMenu = null), this.initMenu(), this.point.contextMenu = this.contextMenu;
  }, this.initMenu = () => {
    this.point.element && (this.contextMenu = k.create([
      {
        id: "i" + this.point.guid + "_drag_horizontal",
        title: this.point.dragHorizontal ? "Disable move horizontally" : "Enable move horizontally",
        image: $
      },
      {
        id: "i" + this.point.guid + "_drag_vertical",
        title: this.point.dragVertical ? "Disable move vertically" : "Enable move vertically",
        image: tt
      }
    ], this.point.element), this.point.options.canDelete && this.contextMenu.addItem("i" + this.point.guid + "_delete", "Delete point", q), this._setEventListeners());
  }, this._setEventListeners = () => {
    this.contextMenu.on("click", (t) => {
      switch (t.itemId) {
        case "i" + e.guid + "_delete":
          r.emit(c.POINT_DELETE_REQUEST, this.point);
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
    this.contextMenu.items.find((t) => t.id === "i" + this.point.guid + "_drag_horizontal").title = "Enable move horizontally", this.contextMenu.items.find((t) => t.id === "i" + this.point.guid + "_drag_vertical").title = "Enable move vertically", this.point.dragHorizontal ? (this.point.setOptions({ moveDirections: [E.LEFT, E.RIGHT] }), this.contextMenu.items.find((t) => t.id === "i" + this.point.guid + "_drag_horizontal").title = "Disable move horizontally") : this.point.dragVertical ? (this.point.setOptions({ moveDirections: [E.TOP, E.BOTTOM] }), this.contextMenu.items.find((t) => t.id === "i" + this.point.guid + "_drag_vertical").title = "Disable move vertically") : this.point.setOptions(
      { moveDirections: [E.TOP, E.BOTTOM, E.LEFT, E.RIGHT] }
    );
  };
}
function Xt() {
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
  }, this.x = 0, this.y = 0, this.element = null, this.guid = U(), this.subscriptions = {}, this.dragHorizontal = !1, this.dragVertical = !1, this.init = (e, t, i = null) => (this.x = parseInt(e), this.y = parseInt(t), this.setOptions(b({}, i)), this.setEventListeners(), r.emit(c.POINT_ADDED, this), this), this.setOptions = (e) => {
    if (e && typeof e == "object" && (m(e.moveDirections) && typeof e.moveDirections == "object" && (this.options.moveDirections = []), this.options = b(this.options, e)), Object.assign(this, new Q(this)), !this.element)
      (this.options.createDOMElement && this.options.canDrag || this.options.forceDisplay) && (this.element = this.createPointUI(), this.setDOMEventListeners(), this.updateContextMenu(), r.emit(c.POINT_ADDED, this));
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
    if (this.element || (this.element = document.createElement("div"), this.setDOMEventListeners(), Object.assign(this, new Q(this))), e == null && (e = this.element), this.options.id && (this.element.id = this.options.id, e.id = this.options.id), e.className = this.options.classes, e.style = this.options.style, typeof this.options.style == "object")
      for (let t in this.options.style)
        e.style[vt(t)] = this.options.style[t];
    return e.style.width = this.options.width + "px", e.style.height = this.options.height + "px", e.style.left = this.x - parseInt(this.options.width / 2) + "px", e.style.top = this.y - parseInt(this.options.height / 2) + "px", e.style.zIndex = this.options.zIndex, !this.options.canDrag || !this.options.visible || this.options.hidden ? e.style.display = "none" : e.style.display = "", e.style.position = "absolute", e;
  }, this.redraw = () => {
    (this.options.canDrag && this.options.createDOMElement || this.options.forceDisplay) && (this.element = this.setPointStyles());
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.rotateBy = (e, t, i) => {
    const [s, o] = _(e, this.x, this.y, t, i);
    this.x = s, this.y = o;
  }, this.setEventListeners = () => {
    r.subscribe(z.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange);
  }, this.setDOMEventListeners = () => {
    !this.element || (this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown), this.element.addEventListener("mouseover", this.mouseover), this.element.addEventListener("mouseout", this.mouseout), this.element.addEventListener("click", this.click), this.element.addEventListener("dblclick", this.doubleclick), this.element.addEventListener("mousemove", this.mousemove));
  }, this.mousedown = (e) => {
    r.emit(c.POINT_MOUSE_DOWN, this, A(e)), e.buttons === 1 && this.options.canDrag && (r.emit(c.POINT_DRAG_START, this, A(e)), Z(e));
  }, this.mousemove = (e) => {
    if (r.emit(c.POINT_MOUSE_MOVE, this, A(e)), e.buttons !== 1 || !this.options.canDrag || !f.draggedShape || f.draggedShape.draggedPoint !== this)
      return;
    const t = this.x, i = this.y, s = L(this.element.parentNode, !0);
    if (!this.checkFitBounds(this.x + e.movementX, this.y + e.movementY)) {
      r.emit(c.POINT_DRAG_MOVE, this, A(e, { oldX: t, oldY: i }));
      return;
    }
    let o = e.clientX + window.scrollX - s.left - this.options.width / 2, n = e.clientY + window.scrollY - s.top - this.options.height / 2;
    [o, n] = this.applyMoveRestrictions(o, n, t, i), this.x = o, this.y = n, this.element.style.left = this.x + "px", this.element.style.top = this.y + "px", r.emit(c.POINT_DRAG_MOVE, this, A(e, { oldX: t, oldY: i }));
  }, this.mouseover = (e) => {
    r.emit(c.POINT_MOUSE_OVER, this, A(e));
  }, this.mouseout = (e) => {
    r.emit(c.POINT_MOUSE_OUT, this, A(e));
  }, this.click = (e) => {
    r.emit(c.POINT_MOUSE_CLICK, this, A(e));
  }, this.doubleclick = (e) => {
    r.emit(c.POINT_MOUSE_DOUBLE_CLICK, this, A(e));
  }, this.checkFitBounds = (e, t) => !(this.options.bounds.left !== -1 && e < this.options.bounds.left || this.options.bounds.right !== -1 && e > this.options.bounds.right || this.options.bounds.top !== -1 && t < this.options.bounds.top || this.options.bounds.bottom !== -1 && t > this.options.bounds.bottom), this.applyMoveRestrictions = (e, t, i, s) => (t > s && this.options.moveDirections.indexOf(E.BOTTOM) === -1 && (t = s), t < s && this.options.moveDirections.indexOf(E.TOP) === -1 && (t = s), e > i && this.options.moveDirections.indexOf(E.RIGHT) === -1 && (e = i), e < i && this.options.moveDirections.indexOf(E.LEFT) === -1 && (e = i), e > this.options.bounds.right && this.options.bounds.right !== -1 && (e = this.options.bounds.right), t > this.options.bounds.bottom && this.options.bounds.bottom !== -1 && (t = this.options.bounds.bottom), e < this.options.bounds.left && this.options.bounds.left !== -1 && (e = this.options.bounds.left), t < this.options.bounds.top && this.options.bounds.top !== -1 && (t = this.options.bounds.top), [e, t]), this.mouseup = (e) => {
    r.emit(c.POINT_MOUSE_UP, this, A(e)), e.button !== 2 && r.emit(c.POINT_DRAG_END, this, A(e));
  }, this.onBoundsChange = (e) => {
    e.points.find((t) => t === this) && (this.options.bounds = e.bounds);
  }, this.toJSON = () => JSON.stringify(this.getJSON()), this.getJSON = () => ({
    x: this.x,
    y: this.y,
    options: b({}, this.options)
  }), this.fromJSON = (e) => {
    let t = e;
    if (typeof t == "string" && (t = H(e)), !t)
      return null;
    this.x = t.x, this.y = t.y;
    let i = !1;
    return this.element || (i = !0, this.element = document.createElement("div")), this.setOptions(t.options), i && r.emit(c.POINT_ADDED, this), this;
  }, this.destroy = () => {
    this.element && (this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), this.element.removeEventListener("mouseover", this.mouseover), this.element.removeEventListener("mouseout", this.mouseout), this.element.removeEventListener("click", this.click), this.element.removeEventListener("dblclick", this.doubleclick), this.element.removeEventListener("mousemove", this.mousemove)), r.unsubscribe(z.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange), r.emit(c.POINT_DESTROYED, this);
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
  }, this.distance = (e) => C(this.x, this.y, e.x, e.y), this;
}
const c = {
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
function Zt(e) {
  this.rotateBox = e, this.subscriptions = {
    rotate: []
  }, this.initialAngle = 0, this.previousAngle = 0, this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    this.interceptEventsFromShape(), this.rotateBox.shape.points.forEach((t) => {
      t.mousemove = this.mousemove, t.mouseDownListener = t.addEventListener(c.POINT_DRAG_START, (i) => {
        this.onPointMouseDown(i), r.emit(a.POINT_DRAG_START, this.rotateBox, { point: t });
      }), t.mouseUpListener = t.addEventListener(c.POINT_DRAG_END, (i) => {
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
        A(t, { clientX: t.clientX, clientY: t.clientY })
      );
      return;
    }
    const [i, s] = J(t, this.rotateBox.shape.root), [o, n] = this.rotateBox.shape.getCenter();
    let h = this.calcAngle(i, s, o, n);
    if (h === null)
      return;
    let l = h;
    this.previousAngle && (l -= this.previousAngle), this.previousAngle = h, r.emit(T.ROTATE_BOX_ROTATE, this.rotateBox, { angle: l });
  }, this.calcAngle = (t, i, s, o) => {
    const n = this.calcHypotenuse(t, i, s, o);
    if (n <= 0)
      return null;
    const h = this.calcCathetus(t, i, s, o), l = this.calcStartAngle(t, i, s, o);
    return Math.round(nt(Math.asin(h / n)) + l + this.initialAngle);
  }, this.calcHypotenuse = (t, i, s, o) => C(t, i, s, o), this.calcCathetus = (t, i, s, o) => {
    if (t <= s && i <= o)
      return C(t, i, t, o);
    if (t >= s && i <= o)
      return C(t, i, s, i);
    if (t >= s && i >= o)
      return C(t, i, t, o);
    if (t <= s && i >= o)
      return C(t, i, s, i);
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
      t.removeEventListener(c.POINT_DRAG_START, t.mouseDownListener), t.removeEventListener(c.POINT_DRAG_END, t.mouseUpListener);
    });
  };
}
const T = {
  ROTATE_BOX_ROTATE: "rotate"
};
function Jt(e) {
  this.resizeBox = e, this.subscriptions = {
    resize: []
  }, this.guid = U(), this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    r.subscribe(c.POINT_DRAG_MOVE, this.onPointDragMove), r.subscribe(c.POINT_DRAG_END, this.onPointDragMove), a.getShapeMouseEvents().forEach((t) => {
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
    this.resizeBox.redraw(), r.emit(a.POINT_DRAG_END, this.resizeBox, A(t, { point: t.target })), r.emit(w.RESIZE_BOX_RESIZE, this.resizeBox, { oldPos: i, newPos: s });
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
    ), r.unsubscribe(c.POINT_DRAG_MOVE, this.onPointDragMove), r.unsubscribe(c.POINT_DRAG_END, this.onPointDragMove);
  };
}
const w = {
  RESIZE_BOX_RESIZE: "resize"
};
function Kt(e) {
  this.shape = e, this.subscriptions = {
    CONTAINER_BOUNDS_CHANGED: []
  }, this.run = () => (this.shape = e, this.setEventListeners(), this), this.setEventListeners = () => {
    r.subscribe(c.POINT_DESTROYED, this.onPointDestroyed), r.subscribe(c.POINT_ADDED, this.onPointAdded), r.subscribe(c.POINT_DRAG_MOVE, this.onPointDragMove), r.subscribe(c.POINT_DELETE_REQUEST, this.onPointDeleteRequest);
  }, this.setSvgEventListeners = () => {
    this.svg_mouseover = this.shape.svg.addEventListener("mouseover", (t) => {
      f.mouseover(A(t, { target: this.shape }));
    }), this.svg_mouseout = this.shape.svg.addEventListener("mouseout", (t) => {
      f.mouseout(A(t, { target: this.shape }));
    }), this.svg_mouseenter = this.shape.svg.addEventListener("mouseenter", (t) => {
      f.mouseenter(A(t, { target: this.shape }));
    }), this.svg_mousedown = this.shape.svg.addEventListener("mousedown", (t) => {
      f.mousedown(A(t, { target: this.shape }));
    }), this.svg_click = this.shape.svg.addEventListener("click", (t) => {
      f.click(A(t, { target: this.shape }));
    }), this.svg_dblclick = this.shape.svg.addEventListener("dblclick", (t) => {
      f.doubleclick(A(t, { target: this.shape }));
    });
  }, this.removeSvgEventListeners = () => {
    this.shape.svg.removeEventListener("mouseover", this.svg_mouseover), this.shape.svg.removeEventListener("mouseout", this.svg_mouseout), this.shape.svg.removeEventListener("mouseenter", this.svg_mouseenter), this.shape.svg.removeEventListener("mousedown", this.svg_mousedown), this.shape.svg.removeEventListener("click", this.svg_click), this.shape.svg.removeEventListener("dblclick", this.svg_dblclick);
  }, this.addResizeEventListener = () => {
    !this.shape.resizeBox || (this.resizeBoxListener = this.shape.resizeBox.addEventListener(w.RESIZE_BOX_RESIZE, this.onResize), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOVE_START, this.mousedown), this.resizeMouseMoveEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_MOVE, this.mousemove), this.resizeClickEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_CLICK, this.click), this.resizeDblClickEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_DOUBLE_CLICK, this.svg_dblclick), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_DOWN, this.svg_mousedown), this.resizeMouseOverEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_OVER, this.svg_mouseover), this.resizeMouseOutEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_OUT, this.svg_mouseout), this.resizeMouseUpEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_UP, (t) => {
      r.emit(a.SHAPE_MOUSE_UP, this.shape, A(t));
    }), this.resizeBoxContextMenuEventListener = this.shape.resizeBox.shape.svg.addEventListener("contextmenu", (t) => {
      this.shape.contextMenu && this.shape.contextMenu.onEvent(t);
    }));
  }, this.addRotateEventListener = () => {
    !this.shape.rotateBox || (this.rotateBoxListener = this.shape.rotateBox.addEventListener(T.ROTATE_BOX_ROTATE, this.onRotate), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOVE_START, this.mousedown), this.rotateMouseMoveEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_MOVE, this.mousemove), this.rotateClickEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_CLICK, this.click), this.rotateDblClickEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_DOUBLE_CLICK, this.svg_dblclick), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_DOWN, this.svg_mousedown), this.rotateMouseUpEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_UP, (t) => {
      r.emit(a.SHAPE_MOUSE_UP, this.shape, A(t));
    }), this.rotateMouseOverEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_OVER, this.svg_mouseover), this.rotateMouseOutEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_OUT, this.svg_mouseout), this.rotatePointDragStartEventListener = this.shape.rotateBox.addEventListener(a.POINT_DRAG_START, (t) => {
      this.shape.initCenter = this.shape.getCenter(this.shape.options.groupChildShapes);
    }), this.rotatePointDragEndEventListener = this.shape.rotateBox.addEventListener(a.POINT_DRAG_END, (t) => {
      this.shape.initCenter = null, this.shape.points.forEach((i) => {
        !i.options.hidden && i.element && (i.element.style.display = "");
      });
    }), this.rotateBoxContextMenuEventListener = this.shape.rotateBox.shape.svg.addEventListener("contextmenu", (t) => {
      this.shape.contextMenu && this.shape.contextMenu.onEvent(t);
    }));
  }, this.onResize = (t) => {
    const i = this.shape.getRootParent(!0);
    if (i) {
      r.emit(w.RESIZE_BOX_RESIZE, i.resizeBox, { newPos: t.newPos, oldPos: t.oldPos });
      return;
    }
    const s = t.newPos.left - t.oldPos.left, o = t.newPos.top - t.oldPos.top;
    this.shape.moveBy(s, o);
    const [n, h] = this.shape.getMaxPointSize();
    this.shape.scaleTo(t.newPos.width - n * 2, t.newPos.height - h * 2), this.shape.redraw(), r.emit(w.RESIZE_BOX_RESIZE, this.shape, t);
  }, this.onRotate = (t) => {
    const i = this.shape.getRootParent(!0);
    if (i) {
      r.emit(T.ROTATE_BOX_ROTATE, i.rotateBox, { angle: t.angle });
      return;
    }
    this.shape.rotateBy(t.angle), this.shape.redraw(), r.emit(T.ROTATE_BOX_ROTATE, this.shape, t);
  }, this.mousedown = (t) => {
    Z(t), r.emit(a.SHAPE_MOUSE_DOWN, this.shape, A(t)), setTimeout(() => {
      r.emit(
        a.SHAPE_MOVE_START,
        this.shape,
        A(t, { pos: this.shape.getPosition(this.shape.options.groupChildShapes) })
      );
    }, 100);
  }, this.mousemove = (t) => {
    if (this.shape.draggedPoint || r.emit(a.SHAPE_MOUSE_MOVE, this.shape, A(t)), t.buttons !== 1)
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
    this.shape.moveBy(i, s), this.shape.redraw();
    const n = this.shape.getPosition(this.shape.options.groupChildShapes);
    r.emit(a.SHAPE_MOVE, this.shape, A(t, { oldPos: o, newPos: n }));
  }, this.mouseenter = (t) => {
    r.emit(a.SHAPE_MOUSE_ENTER, this.shape, A(t));
  }, this.mouseover = (t) => {
    f.draggedShape !== this.shape && r.emit(a.SHAPE_MOUSE_OVER, this.shape, A(t));
  }, this.mouseout = (t) => {
    r.emit(a.SHAPE_MOUSE_OUT, this.shape, A(t));
  }, this.click = (t) => {
    r.emit(a.SHAPE_MOUSE_CLICK, this.shape, A(t));
  }, this.doubleclick = (t) => {
    r.emit(a.SHAPE_MOUSE_DOUBLE_CLICK, this.shape, A(t));
  }, this.calcMovementOffset = (t) => {
    this.shape.calcPosition();
    const i = this.shape.getPosition(this.shape.options.groupChildShapes);
    let s = t.movementX, o = t.movementY, n = t.clientX + window.scrollX, h = t.clientY + window.scrollY;
    const l = i.left + s, p = i.top + o, u = L(this.shape.root, !0), g = this.shape.getBounds();
    return (l < g.left || l + i.width > g.right) && (s = 0), (p < g.top || p + i.height > g.bottom) && (o = 0), n < l + u.left && (s = n - (l + u.left)), h < p + u.top && (o = h - (p + u.top)), n > l + i.width + u.left && (s = n - (i.width + u.left + i.left)), h > p + i.height + u.right && (o = h - (i.height + u.top + i.top)), [s, o];
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
    r.unsubscribe(c.POINT_ADDED, this.onPointAdded), r.unsubscribe(c.POINT_DRAG_MOVE, this.onPointDragMove), r.unsubscribe(c.POINT_DESTROYED, this.onPointDestroyed), r.unsubscribe(c.POINT_DELETE_REQUEST, this.onPointDeleteRequest), this.shape.resizeBox && (this.shape.resizeBox.removeEventListener(w.RESIZE_BOX_RESIZE, this.resizeBoxListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_CLICK, this.resizeClickEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_MOVE, this.resizeMouseMoveEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOVE_START, this.resizeMouseDownEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_UP, this.resizeMouseUpEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_DOUBLE_CLICK, this.resizeDblClickEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_OVER, this.resizeMouseOverEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_OUT, this.resizeMouseOutEventListener), this.shape.resizeBox.removeEventListener("contextmenu", this.resizeBoxContextMenuEventListener)), this.shape.rotateBox && (this.shape.rotateBox.removeEventListener(T.ROTATE_BOX_ROTATE, this.rotateBoxListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_CLICK, this.rotateClickEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_MOVE, this.rotateMouseMoveEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOVE_START, this.rotateMouseDownEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOVE_START, this.rotatePointDragStartEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOVE_START, this.rotatePointDragEndEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_UP, this.rotateMouseUpEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_DOUBLE_CLICK, this.rotateDblClickEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_OVER, this.rotateMouseOverEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_OUT, this.rotateMouseOutEventListener), this.shape.rotateBox.removeEventListener("contextmenu", this.rotateBoxContextMenuEventListener));
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
function qt() {
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
    e.points.filter((i) => i.element).forEach((i) => {
      i.element.parentNode !== e.root && e.root.appendChild(i.element), i.options.zIndex = e.options.zIndex + 2, e.options.visible || (i.options.visible = !1), i.redraw(), e.options.displayMode === d.DEFAULT && !i.options.forceDisplay && (!t || t.options.displayMode === d.DEFAULT) && (i.element.style.display = "none");
    });
  }, this.drawPolygon = (e) => {
    let t = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    e.points.length > 2 && (t = document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
    const i = e.points.map((s) => "" + (s.x - e.left) + "," + (s.y - e.top)).join(" ");
    return t.setAttribute("points", i), this.setupPolygonFill(e, t), this.setupPolygonStyles(e, t), e.svg.querySelector("defs") && e.svg.querySelector("defs").querySelector("filter") && (t.style.filter = 'url("#' + e.guid + '_filter")'), t.style.zIndex = e.options.zIndex, t;
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
    let i = e.svg.querySelector("defs");
    if (t === "#image" && e.options.fillImage && typeof e.options.fillImage == "object") {
      const s = this.createImageFill(e);
      s && (i || (i = document.createElementNS(e.svg.namespaceURI, "defs")), i.appendChild(s), e.svg.appendChild(i));
    } else if (t === "#gradient" && e.options.fillGradient && typeof e.options.fillGradient == "object" && ["linear", "radial"].indexOf(e.options.fillGradient.type) !== -1) {
      const s = this.createGradient(e);
      s && (i || (i = document.createElementNS(e.svg.namespaceURI, "defs")), i.appendChild(s), e.svg.appendChild(i));
    }
  }, this.createGradient = (e) => {
    let t = document.createElementNS(e.svg.namespaceURI, "linearGradient");
    const i = e.options.fillGradient;
    i.type === "radial" && (t = document.createElementNS(e.svg.namespaceURI, "radialGradient")), t.id = e.guid + "_gradient";
    let s = !1;
    for (let o in i)
      if (o !== "type") {
        if (o === "steps") {
          s = !0;
          continue;
        }
        t.setAttribute(o, i[o]);
      }
    if (!s)
      return t;
    for (let o of i.steps) {
      const n = document.createElementNS(e.svg.namespaceURI, "stop");
      m(o.stopColor) && n.setAttribute("offset", o.offset), m(o.stopColor) && n.setAttribute("stop-color", o.stopColor), m(o.stopOpacity) && n.setAttribute("stop-opacity", o.stopOpacity), t.appendChild(n);
    }
    return t;
  }, this.createImageFill = (e) => {
    const t = e.options.fillImage;
    if (!t.href || !t.width || !t.height)
      return console.error("Image HREF, width and height must be specified for Image Fill"), null;
    const i = document.createElementNS(e.svg.namespaceURI, "pattern");
    i.setAttribute("id", e.guid + "_pattern"), i.setAttribute("patternUnits", "userSpaceOnUse");
    for (let o in t)
      o !== "href" && i.setAttribute(o, t[o]);
    const s = document.createElementNS(e.svg.namespaceURI, "image");
    return t.href && s.setAttribute("href", t.href), s.setAttribute("width", t.width), s.setAttribute("height", t.height), i.appendChild(s), i;
  }, this.setupSVGFilters = (e) => {
    if (e.options.filters && typeof e.options.filters == "object" && Object.keys(e.options.filters).length) {
      let t = e.svg.querySelector("defs");
      t || (t = document.createElementNS(e.svg.namespaceURI, "defs"), e.svg.appendChild(t));
      const i = this.createSVGFilters(e);
      t.append(i);
    }
  }, this.createSVGFilters = (e) => {
    const t = document.createElementNS(e.svg.namespaceURI, "filter");
    t.setAttribute("id", e.guid + "_filter");
    for (let i in e.options.filters) {
      const s = this.createSVGFilter(e, i, e.options.filters[i]);
      t.appendChild(s);
    }
    return t;
  }, this.createSVGFilter = (e, t, i) => {
    const s = document.createElementNS(e.svg.namespaceURI, t);
    for (let o in i)
      s.setAttribute(o, i[o].toString()), o === "dx" && e.svg.setAttribute("width", (e.width + parseInt(i.dx) * 2).toString()), o === "dy" && e.svg.setAttribute("height", (e.height + parseInt(i.dy) * 2).toString());
    return s;
  }, this.setupPolygonFill = (e, t) => {
    const i = e.options.style.fill || "none";
    i === "#image" && e.options.fillImage && typeof e.options.fillImage == "object" ? t.setAttribute("fill", 'url("#' + e.guid + '_pattern")') : i === "#gradient" && e.options.fillGradient && typeof e.options.fillGradient == "object" && ["linear", "radial"].indexOf(e.options.fillGradient.type) !== -1 && t.setAttribute("fill", 'url("#' + e.guid + '_gradient")');
  }, this.setupPolygonStyles = (e, t) => {
    if (e.options.classes && t.setAttribute("class", e.options.classes), !(!m(e.options.style) || typeof e.options.style != "object"))
      for (let i in e.options.style)
        t.style[i] = e.options.style[i];
  }, this.toSvg = (e, t = null) => {
    const i = document.createElement("div"), s = this.getSvg(e, t);
    return i.appendChild(s), '<?xml version="1.0" encoding="UTF-8"?>' + i.innerHTML.replace(/&quot;/g, "'");
  }, this.getSvg = (e, t) => {
    const i = document.createElementNS("http://www.w3.org/2000/svg", "svg"), s = e.getPosition(t === null ? e.options.groupChildShapes : t);
    i.appendChild(this.getSvgDefs(e, t)), e.svg || this.draw(e), this.addSvgPolygons(e, i, t), i.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const o = "0 0 " + s.width + " " + s.height;
    return i.setAttribute("viewBox", o), i;
  }, this.getSvgDefs = (e, t = null) => {
    const i = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    if (e.svg || e.redraw(), e.svg) {
      const s = e.svg.querySelector("defs");
      s && (i.innerHTML = s.innerHTML);
    }
    return (t === !0 || e.options.groupChildShapes && t !== !1) && e.getChildren(!0).forEach((s) => {
      if (s.svg || s.redraw(), s.svg) {
        const o = s.svg.querySelector("defs");
        o && (i.innerHTML += o.innerHTML);
      }
    }), i;
  }, this.addSvgPolygons = (e, t, i) => {
    const s = e.getPosition(i || e.options.groupChildShapes), o = [];
    if (e.svg || e.redraw(), e.svg) {
      let n = e.svg.querySelector("polygon");
      if (n) {
        n = n.cloneNode();
        const h = e.points.map(
          (l) => "" + (l.x - s.left) + "," + (l.y - s.top)
        ).join(" ");
        n.setAttribute("points", h), o.push({ polygon: n, zIndex: e.options.zIndex });
      }
    }
    if ((i === !0 || e.options.groupChildShapes && i !== !1) && e.getChildren(!0).forEach((n) => {
      if (n.svg || n.redraw(), !n.svg)
        return;
      let h = n.svg.querySelector("polygon");
      if (h) {
        h = h.cloneNode();
        const l = n.points.map(
          (p) => "" + (p.x - s.left) + "," + (p.y - s.top)
        ).join(" ");
        h.setAttribute("points", l), o.push({ polygon: h, zIndex: n.options.zIndex });
      }
    }), !!o.length) {
      o.sort((n, h) => n.zIndex - h.zIndex);
      for (let n of o)
        t.appendChild(n.polygon);
    }
  }, this.toPng = (e, t = N.DATAURL, i = null, s = null, o = null) => new Promise(async (n) => {
    e.calcPosition();
    const h = e.getPosition(o || e.options.groupChildShapes);
    [i, s] = Y(i, s, h.width, h.height);
    const l = this.getSvg(e, o);
    l.setAttribute("width", h.width), l.setAttribute("height", h.height);
    for (let x of l.querySelectorAll("image"))
      if (x.getAttribute("href") && x.getAttribute("href").length) {
        const O = await j(await (await fetch(x.getAttribute("href"))).blob());
        x.setAttribute("href", O);
      }
    const p = document.createElement("div");
    p.appendChild(l);
    const u = p.innerHTML, g = new Image(), S = new Blob([u], { type: "image/svg+xml" }), V = window.URL || window.webkitURL || window, R = await j(S);
    g.addEventListener("load", () => {
      const x = document.createElement("canvas");
      g.width = h.width, g.height = h.height, x.width = g.width, x.height = g.height;
      const O = x.getContext("2d");
      O.drawImage(g, 0, 0), O.scale(i, s), V.revokeObjectURL(R);
      const G = x.toDataURL("image/png");
      if (t === N.BLOB) {
        n(xt(G));
        return;
      }
      n(G);
    }), g.src = R;
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
  };
}
const N = {
  DATAURL: "dataurl",
  BLOB: "blob"
}, M = new qt(), $t = (e, t, i = {}, s = null) => {
  if (!m(t) || typeof t != "object" || (m(t.features) || (t = { features: [t] }), !t.features.length))
    return null;
  const o = [];
  for (let n in t.features) {
    const h = t.features[n], l = te(h, n, i, e);
    s && typeof s == "function" && s(n, t.features.length, l), l && o.push(l);
  }
  return o.length === 1 ? o[0] : o;
}, te = (e, t, i, s) => {
  if (!ee(e))
    return;
  let o = ie(e, t, i);
  o.visible = !1;
  const { polygons: n, origPolygons: h, offsetX: l, offsetY: p } = se(e);
  o.offsetX = l, o.offsetY = p;
  let u = null;
  for (let g in n) {
    const S = b({}, o);
    S.initialPoints = [...h[g]], g == 0 ? u = f.createShape(s, S, n[g], !1) : (S.id += "_" + g, S.name += " " + g, u.addChild(f.createShape(s, S, n[g]), !1));
  }
  return m(i.scale) ? u.scaleBy(i.scale, i.scale, !0) : (m(i.width) || m(i.height)) && u.scaleTo(i.width, i.height), u;
}, ee = (e) => {
  if (!m(e.properties) || typeof e.properties != "object")
    return !1;
  const t = e.geometry;
  return !(!m(t) || typeof t != "object" || ["Polygon", "MultiPolygon"].indexOf(t.type) === -1 || !m(t.coordinates) || typeof t.coordinates != "object" || !t.coordinates.length);
}, ie = (e, t, i) => {
  const s = {};
  if (s.name = e.properties[i.nameField] || "Shape " + t, s.id = e.properties[i.idField] || "shape_" + t, m(i.fields) && typeof i.fields == "object" && i.fields.filter((o) => m(e.properties[o])).forEach((o) => s[o] = e.properties[o]), m(i.options) && typeof i.options == "object")
    for (let o in i.options)
      s[o] = i.options[o];
  return s;
}, se = (e) => {
  let t = e.geometry.coordinates;
  e.geometry.type === "Polygon" && (t = [t]);
  const i = { polygons: [], origPolygons: t.map((s) => b({}, s[0])) };
  i.offsetX = 0, i.offsetY = 0;
  for (let s of t) {
    const o = s[0];
    for (let n of o) {
      const [h, l] = at(n[1], n[0]);
      n[0] = h, n[1] = l;
    }
    i.polygons.push(o);
  }
  return i;
};
function oe() {
  this.shapes = {}, this.visibleShapes = {}, this.activeShape = null, this.draggedShape = null, this.shapeOnCursor = null, this.containerEventListeners = [], this.init = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    r.subscribe(a.SHAPE_CREATE, this.onShapeCreated), r.subscribe(a.SHAPE_DESTROY, this.onShapeDestroy), r.subscribe(a.SHAPE_SHOW, this.onShapeShow), r.subscribe(a.SHAPE_HIDE, this.onShapeHide), r.subscribe(a.SHAPE_MOVE_START, this.onShapeMoveStart), r.subscribe(a.SHAPE_MOUSE_ENTER, this.onShapeMouseEnter), r.subscribe(c.POINT_DRAG_START, this.onPointDragStart), r.subscribe(c.POINT_DRAG_END, this.onPointDragEnd), window.addEventListener("resize", this.onWindowResize);
  }, this.onWindowResize = (e) => {
    for (let t in this.shapes) {
      const i = this.shapes[t];
      r.emit(
        z.CONTAINER_BOUNDS_CHANGED,
        i,
        { bounds: i.getBounds(), points: i.points }
      );
    }
  }, this.createShape = (e, t, i, s = !0) => new B().init(e, t, i, s), this.onShapeCreated = (e) => {
    const t = e.target;
    m(t.root) && !this.getShape(t) && typeof t.belongsToShape == "function" && (this.addShape(t), this.activeShape || (this.activeShape = t));
  }, this.addShape = (e) => {
    this.shapes[e.guid] = e, e.options.visible && this.isNormalShape(e) && (this.visibleShapes[e.guid] = e), this.getShapesByContainer(e.root).length === 1 && this.addContainerEvents(e);
  }, this.onShapeDestroy = (e) => {
    const t = e.target;
    delete this.shapes[t.guid];
    const i = t.root;
    !m(t.root) || this.getShapesByContainer(i).length === 0 && this.containerEventListeners.filter((s) => s.container === i).forEach((s) => {
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
  }, this.getShapeByGuid = (e) => m(this.shapes[e]) ? this.shapes[e] : null, this.getShapesByContainer = (e) => {
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
      this.activeShape.switchDisplayMode(t);
      return;
    }
    typeof e.id < "u" && (e.id.search("_resizebox") !== -1 || e.id.search("_rotatebox") !== -1) || (this.activeShape && this.deactivateShape(this.activeShape), e.options.moveToTop && e.moveToTop(), this.activeShape = e, r.emit(a.SHAPE_ACTIVATED, this.activeShape), this.activeShape.switchDisplayMode(t));
  }, this.deactivateShape = (e) => {
    typeof e.options.prevZIndex < "u" && M.updateOptions(e), e.options.displayMode !== d.DEFAULT && e.switchDisplayMode(d.DEFAULT), e.getChildren(!0).forEach((t) => {
      typeof t.options.prevZIndex < "u" && (M.updateOptions(t), t.options.displayMode !== d.DEFAULT && t.switchDisplayMode(d.DEFAULT));
    });
  }, this.addContainerEvents = (e) => {
    this.addContainerEvent(e.root, "mousemove", this.mousemove), this.addContainerEvent(e.root, "mouseup", this.mouseup, e.options.id), this.addContainerEvent(e.root, "dblclick", this.doubleclick), this.addContainerEvent(e.root, "contextmenu", this.contextmenu), r.emit(ne.MANAGER_ADD_CONTAINER_EVENT_LISTENERS, e.root);
  }, this.addContainerEvent = (e, t, i) => {
    this.containerEventListeners.find((s) => s.container === e && s.name === t) || (e.addEventListener(t, i), this.containerEventListeners.push({ id: e.id, container: e, name: t, listener: i }));
  }, this.doubleclick = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.doubleclick(A(e, { target: this.shapeOnCursor }));
    try {
      e.stopPropagation();
    } catch {
    }
    if (!this.activeShape || !this.activeShape.options.canAddPoints || this.activeShape.draggedPoint || this.activeShape.points.length > 2 || this.activeShape.points.length === this.activeShape.options.maxPoints)
      return;
    this.activeShape.options.displayMode === d.DEFAULT && this.activeShape.switchDisplayMode(d.SELECTED);
    const [t, i] = J(A(e, { target: this.activeShape }));
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
      t && t.options.groupChildShapes && (this.shapeOnCursor = t), this.draggedShape = this.shapeOnCursor, this.shapeOnCursor.eventListener.mousedown(A(e, { target: this.shapeOnCursor }));
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
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseover(A(e, { target: this.shapeOnCursor }));
  }, this.mouseenter = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseenter(A(e, { target: this.shapeOnCursor }));
  }, this.mouseout = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseout(A(e, { target: e.target }));
  }, this.click = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.click(A(e, { target: this.shapeOnCursor }));
  }, this.processShapesUnderCursor = (e) => {
    const [t, i] = [e.clientX, e.clientY], s = this.getShapeOnCursor(t, i);
    this.shapeOnCursor && this.shapeOnCursor !== s && this.shapeOnCursor.svg && (this.shapeOnCursor.svg.style.cursor = "default", this.shapeOnCursor.eventListener.mouseout(A(e, { target: this.shapeOnCursor }))), s && s !== this.shapeOnCursor && s.eventListener.mouseover(A(e, { target: s })), this.shapeOnCursor = s, this.shapeOnCursor && (r.emit(a.SHAPE_MOUSE_MOVE, this.shapeOnCursor, A(e)), this.shapeOnCursor.svg.style.cursor = "crosshair");
  }, this.getShapeOnCursor = (e, t) => {
    const i = Object.values(this.visibleShapes);
    if (!i.length)
      return null;
    const s = i.filter((o) => o.belongsToShape(e, t));
    return s.length ? s.reduce((o, n) => n.options.zIndex >= o.options.zIndex ? n : o) : null;
  }, this.toJSON = (e = null, t = !1) => (e || (e = this.getShapes()), e = e.filter((i) => !i.getParent()), JSON.stringify(e.map((i) => i.getJSON(!0, t)))), this.fromJSON = (e, t, i = null, s = !0) => {
    let o = t;
    if (typeof o == "string" && (o = H(t)), !o || !o.length)
      return null;
    const n = [];
    for (let h in o) {
      const l = o[h];
      l.options.id && this.findShapeById(l.options.id) || (n.push(new B().fromJSON(e, l, !0, s)), i && typeof i == "function" && i(h / o.length));
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
  }, this.fromGeoJson = (e, t, i = {}, s = null) => $t(e, t, i, s), this.length = () => Object.values(this.shapes).length;
}
const ne = {
  MANAGER_ADD_CONTAINER_EVENT_LISTENERS: "manager_add_container_event_listeners",
  MANAGER_REMOVE_CONTAINER_EVENT_LISTENERS: "manager_remove_container_event_listeners"
}, z = {
  CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
}, f = new oe().init();
function he(e) {
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
    const i = [];
    i.push(...this.children);
    for (let s of i)
      i.push(...s.getChildren());
    return i;
  }, this.shouldAddChild = (t) => !t || typeof t != "object" || typeof t.getChildren > "u" || this.children.indexOf(t) !== -1 ? !1 : t === this.shape ? void 0 : t.getChildren().indexOf(this.shape) !== -1 || t.getParent() ? !1 : this.getParentsList().indexOf(t) === -1, this.getParent = () => {
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
  }, this.getPosition = (t = !1) => {
    const i = this.parent.getPosition();
    if (!t)
      return i;
    let s = this.getChildren(!0);
    return s.push(this.shape), s = s.filter((o) => o.points.length), s.length && (i.left = s.map((o) => o.left).reduce((o, n) => n < o ? n : o), i.top = s.map((o) => o.top).reduce((o, n) => n < o ? n : o), i.right = s.map((o) => o.right).reduce((o, n) => n > o ? n : o), i.bottom = s.map((o) => o.bottom).reduce((o, n) => n > o ? n : o), i.width = i.right - i.left || 1, i.height = i.bottom - i.top || 1), i;
  };
}
function et() {
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
  }, this.eventListener = null, this.left_top = null, this.left_bottom = null, this.right_top = null, this.right_bottom = null, this.init = (e, t, i, s, o, n = {}) => (this.left = parseInt(t), this.top = parseInt(i), this.width = parseInt(s), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new B().init(e, b({}, this.options.shapeOptions), []), r.emit(a.SHAPE_CREATE, this.shape, {}), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new Zt(this).run(), this.redraw(), this), this.setOptions = (e = {}) => {
    !e || typeof e != "object" || (this.options = b(this.options, e), this.options.shapeOptions.zIndex = this.options.zIndex || this.options.zIndex, this.options.shapeOptions.id = this.options.id ? this.options.id : this.options.id, this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + Pt + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + It + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + Rt + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + _t + "')" } });
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
function re(e) {
  this.shape = e, this.contextMenu = null, this.updateContextMenu = () => {
    if (this.shape.options.hasContextMenu && !this.contextMenu ? this.init() : this.shape.options.hasContextMenu || (this.contextMenu = null), this.shape.contextMenu = this.contextMenu, this.contextMenu) {
      const t = this.getMenuItems();
      for (let i of t)
        this.contextMenu.items.find((s) => s.id === i.id) || this.contextMenu.addItem(i.id, i.title, i.image);
    }
  }, this.init = () => {
    e.svg && (this.contextMenu = k.create([], e.svg, "contextmenu", { customHandler: () => {
    } }), e.options.canAddPoints && this.contextMenu.addItem("i" + e.guid + "_add_point", "Add Point", W), this.displayGroupItems(), this.setEventListeners());
  }, this.getMenuItems = () => {
    const t = [
      { id: "i" + e.guid + "_move_to_top", title: "Move to Top", image: Qt },
      { id: "i" + e.guid + "_move_to_bottom", title: "Move to Bottom", image: Yt },
      { id: "i" + e.guid + "_flip_horizontal", title: "Flip Horizontal", image: $ },
      { id: "i" + e.guid + "_flip_vertical", title: "Flip Vertical", image: tt },
      { id: "i" + e.guid + "_clone", title: "Clone", image: Ft },
      { id: "i" + e.guid + "_export_json", title: "Export to JSON", image: Ht },
      { id: "i" + e.guid + "_export_svg", title: "Export to SVG", image: kt },
      { id: "i" + e.guid + "_export_png", title: "Export to PNG", image: Gt },
      { id: "i" + e.guid + "_destroy", title: "Destroy", image: q }
    ];
    return e.options.canAddPoints && t.push({ id: "i" + e.guid + "_add_point", title: "Add Point", image: W }), t;
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
        case "i" + this.shape.guid + "_group":
          i = this.shape.getRootParent(), t = i || this.shape, t.setOptions({ groupChildShapes: !0 }), t.switchDisplayMode(d.DEFAULT);
          break;
        case "i" + this.shape.guid + "_ungroup":
          i = this.shape.getRootParent(), t = i || this.shape, t.setOptions({ groupChildShapes: !1 }), t.switchDisplayMode(d.DEFAULT);
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
      }
    });
  }, this.displayGroupItems = () => {
    let t = this.shape.getRootParent() ? this.shape.getRootParent() : this.shape;
    if (!t.getChildren().length) {
      this.contextMenu.removeItem("i" + this.shape.guid + "_group"), this.contextMenu.removeItem("i" + this.shape.guid + "_ungroup");
      return;
    }
    t.options.groupChildShapes ? this.contextMenu.items.find((i) => i.id === "i" + this.shape.guid + "_ungroup") || (this.contextMenu.addItem("i" + this.shape.guid + "_ungroup", "Ungroup", Wt), this.contextMenu.removeItem("i" + this.shape.guid + "_group")) : this.contextMenu.items.find((i) => i.id === "i" + this.shape.guid + "_group") || (this.contextMenu.removeItem("i" + this.shape.guid + "_ungroup"), this.contextMenu.addItem("i" + this.shape.guid + "_group", "Group", jt));
  }, this.onAddPointClick = (t) => {
    if (this.shape.options.maxPoints !== -1 && this.shape.points.length >= this.shape.options.maxPoints)
      return;
    const [i, s] = K(this.shape.root, t.cursorX, t.cursorY);
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
    for (let h of o.getChildren(!0)) {
      const l = h.getParent();
      l && l.removeChild(h), i.addChild(h);
    }
  }, this.onExportJsonClick = (t) => {
    const s = this.shape.getRootParent() || this.shape, o = s.toJSON(s.options.groupChildShapes), n = new Blob([o]);
    this.saveToFile(n, this.getExportFileName("json"));
  }, this.onExportSvgClick = (t) => {
    const o = ((this.shape.options.groupChildShapes ? null : this.shape.getRootParent()) || this.shape).toSvg(), n = new Blob([o]);
    this.saveToFile(n, this.getExportFileName("svg"));
  }, this.onExportPngClick = async (t) => {
    const o = await ((this.shape.options.groupChildShapes ? null : this.shape.getRootParent()) || this.shape).toPng(N.BLOB);
    this.saveToFile(o, this.getExportFileName("png"));
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
    i && i.options.groupChildShapes ? (i.flip(!0, !1), i.redraw()) : (this.shape.flip(!0, !1), this.shape.redraw());
  }, this.onFlipVerticalClick = (t) => {
    const i = this.shape.getParent();
    i && i.options.groupChildShapes ? (i.flip(!1, !0), i.redraw()) : (this.shape.flip(!1, !0), this.shape.redraw());
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
function B() {
  this.root = null, this.points = [], this.svg = null, this.groupHelper = null, this.eventListener = new Kt(this), this.options = {
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
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = U(), this.resizeBox = null, this.rotateBox = null, this.initCenter = null, this.shapeMenu = null, this.init = (e, t = null, i = null, s = !0) => {
    if (!e) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    if (f.getShape(this)) {
      console.error("This shape already initialized");
      return;
    }
    return this.root = e, this.root.style.position = "relative", this.shapeMenu = new re(this), this.setOptions(t), this.groupHelper = new he(this).init(), i && i.length && (this.setupPoints(i, b({}, this.options.pointOptions)), this.redraw()), this.eventListener.run(), this.shapeMenu && typeof this.shapeMenu == "object" && this.shapeMenu.updateContextMenu(), s && this.applyDisplayMode(), (i && i.length || this.options.forceCreateEvent) && r.emit(a.SHAPE_CREATE, this, {}), this;
  }, this.setOptions = (e) => {
    !e || typeof e != "object" || (m(e.visible) && e.visible !== this.options.visible && (this.points.forEach((t) => t.options.visible = e.visible), this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: e.visible } }), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: e.visible } })), m(e.fillGradient) && (this.options.fillGradient = {}), m(e.fillImage) && (this.options.fillImage = {}), this.options = b(this.options, e), this.points.forEach((t) => {
      t.setOptions(b({}, this.options.pointOptions)), t.options.bounds = this.getBounds(), t.options.zIndex <= this.options.zIndex && (t.options.zIndex = this.options.zIndex + 1), t.redraw();
    }), this.shapeMenu && typeof this.shapeMenu == "object" && this.shapeMenu.updateContextMenu());
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
    !e || typeof e != "object" || (e.forEach((i) => {
      this.options.displayMode !== d.DEFAULT && (t.createDOMElement = !0);
      const s = this.putPoint(
        i[0],
        i[1],
        b({}, this.options.pointOptions, t)
      );
      if (s && (s.init(s.x, s.y, t), s.element))
        try {
          this.root.appendChild(s.element), s.redraw();
        } catch {
        }
    }), this.options.hasContextMenu && !this.shapeMenu.contextMenu && this.shapeMenu.updateContextMenu());
  }, this.putPoint = (e, t, i = {}, s = null) => {
    let o = this.getPointIndex(s);
    if (s && o === -1 || !this.isNewObject && this.findPoint(e, t))
      return null;
    i.bounds = this.getBounds(), i.zIndex = this.options.zIndex + 1;
    const n = new Xt();
    return n.x = e, n.y = t, this.options.displayMode !== d.DEFAULT && (i.createDOMElement = !0), n.setOptions(i), s && o !== -1 ? this.points.splice(o, 0, n) : this.points.push(n), n;
  }, this.getClosestPoint = (e, t, i = null) => {
    if (i || (i = this.getPointsArray()), !i || !i.length)
      return null;
    if (i = i.filter(([o, n]) => !isNaN(parseInt(o)) && !isNaN(parseInt(n))), i.length === 1)
      return this.points[0];
    if (!i || !i.length)
      return null;
    const s = i.map(([o, n]) => ({ x: o, y: n, d: C(e, t, o, n) })).reduce((o, n) => o.d < n.d ? o : n);
    return this.findPoint(s.x, s.y);
  }, this.getClosestLine = (e, t) => this.points.map((i, s) => {
    let o = null;
    return s < this.points.length - 1 ? o = this.points[s + 1] : o = this.points[0], [i, o, ht(e, t, i.x, i.y, o.x, o.y)];
  }).filter((i) => i[2] >= 0).reduce((i, s) => i[2] < s[2] ? i : s), this.getPointIndex = (e) => {
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
    const i = this.findPoint(e, t);
    i && i.destroy();
  }, this.findPoint = (e, t) => {
    const i = this.points.find((s) => s.x === e && s.y === t);
    return typeof i > "u" || !i ? null : i;
  }, this.findPointById = (e) => {
    const t = this.points.find((i) => i.options.id === e);
    return typeof t > "u" || !t ? null : t;
  }, this.getPointsArray = () => {
    let e = [];
    return this.points && typeof this.points == "object" && this.points.length && (e = this.points.map((t) => [t.x, t.y])), e;
  }, this.moveTo = (e, t, i = !0) => {
    const s = this.getBounds(), o = this.getPosition(this.options.groupChildShapes);
    let n = e + o.width > s.right ? s.right - o.width : e, h = t + o.height > s.bottom ? s.bottom - o.height : t;
    this.moveBy(n - o.left, h - o.top, i), this.calcPosition();
  }, this.moveBy = (e, t, i = !0) => {
    for (let o in this.points)
      this.points[o].x += e, this.points[o].y += t, i && this.points[o].redraw();
    this.calcPosition();
    const s = this.getChildren();
    i && this.redraw(), s.length && this.options.groupChildShapes && s.forEach((o) => {
      o.moveBy(e, t, i);
    });
  }, this.scaleTo = (e = null, t = null, i = null) => {
    const s = this.getBounds();
    if (this.calcPosition(), !e && !t)
      return null;
    const o = this.getPosition(i || this.options.groupChildShapes);
    if (o.width === e && o.height === t)
      return;
    [e, t] = this.applyScaleRestriction(...Y(e, t, o.width, o.height)), o.width >= 10 && e < 10 && (e = 10), o.height >= 10 && t < 10 && (t = 10);
    let n = o.left + e > s.right && s.right !== -1 ? s.right - o.left : e, h = o.top + t > s.bottom && s.bottom !== -1 ? s.bottom - o.top : t, l = n / o.width, p = h / o.height;
    this.scaleBy(l, p, i);
  }, this.scaleBy = (e = null, t = null, i = null) => {
    const s = this.getPosition(i || this.options.groupChildShapes);
    this.points.forEach(
      (o) => {
        o.x = (o.x - s.left) * e + s.left, o.y = (o.y - s.top) * t + s.top;
      }
    ), (this.options.groupChildShapes || i) && (this.getChildren(!0).forEach((o) => {
      o.points.forEach(
        (n) => {
          n.x = (n.x - s.left) * e + s.left, n.y = (n.y - s.top) * t + s.top;
        }
      ), o.calcPosition();
    }), this.getChildren(!0).forEach((o) => o.redraw())), this.calcPosition();
  }, this.applyScaleRestriction = (e, t) => (this.options.minWidth !== -1 && e < this.options.minWidth && (e = this.options.minWidth), this.options.minWidth !== -1 && t < this.options.minHeight && (t = this.options.minHeight), this.options.minWidth !== -1 && e > this.options.maxWidth && (e = this.options.maxWidth), this.options.minWidth !== -1 && t > this.options.maxHeight && (t = this.options.maxHeight), [e, t]), this.rotateBy = (e, t = null, i = null, s = !1) => {
    this.calcPosition();
    const o = this.getPosition(this.options.groupChildShapes);
    let [n, h] = this.getCenter(this.options.groupChildShapes);
    const l = this.getRootParent(!0);
    l && l.options.groupChildShapes && ([n, h] = l.getCenter(l.options.groupChildShapes)), t || (t = n), i || (i = h), this.initCenter && ([t, i] = this.initCenter), !(s && (!this.isInBounds(..._(e, o.left, o.top, t, i)) || !this.isInBounds(..._(e, o.right, o.top, t, i)) || !this.isInBounds(..._(e, o.left, o.bottom, t, i)) || !this.isInBounds(..._(e, o.right, o.bottom, t, i)))) && (this.points.forEach((p) => p.rotateBy(e, t, i)), this.options.groupChildShapes && this.getChildren(!0).forEach((p) => {
      p.points.forEach((u) => u.rotateBy(e, t, i)), p.redraw();
    }));
  }, this.flip = (e, t, i) => {
    if (!e && !t)
      return;
    i = i || this.options.groupChildShapes, this.calcPosition();
    let s = i ? this.getChildren(!0) : null;
    s && s.forEach((n) => n.calcPosition());
    const o = this.getPosition(i);
    this.points.forEach((n) => this.flipPoint(n, e, t, o)), s && s.forEach((n) => {
      n.points.forEach((h) => {
        n.flipPoint(h, e, t, o);
      });
    });
  }, this.flipPoint = (e, t, i, s) => (t && (e.x = Math.abs(s.right - e.x) + s.left), i && (e.y = Math.abs(s.bottom - e.y) + s.top), e), this.moveToTop = () => {
    M.moveShapeToTop(this);
  }, this.moveToBottom = () => {
    M.moveShapeToBottom(this);
  }, this.changeZIndex = (e) => {
    M.changeShapeZIndex(this, e);
  }, this.isInBounds = (e, t) => {
    const [i, s] = this.getMaxPointSize(), o = this.getBounds();
    return e >= o.left + i / 2 && e <= o.right - i / 2 && t >= o.top + s / 2 && t <= o.bottom - s / 2;
  }, this.redraw = () => {
    this.applyDisplayMode(), M.draw(this), this.options.groupChildShapes && this.getChildren(!0).forEach((e) => e.redraw());
  }, this.applyDisplayMode = () => {
    const e = this.getRootParent();
    (!e || !e.options.groupChildShapes) && (this.options.displayMode === d.SCALE && this.options.canScale ? (this.rotateBox && this.rotateBox.hide(), !this.resizeBox && this.setupResizeBox(), this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : this.options.displayMode === d.ROTATE && this.options.canRotate ? (this.resizeBox && this.resizeBox.hide(), !this.rotateBox && this.setupRotateBox(), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : (this.resizeBox && this.resizeBox.hide(), this.rotateBox && this.rotateBox.hide())), this.points.forEach((t) => {
      const i = { zIndex: this.options.zIndex + 2 };
      this.options.displayMode === d.DEFAULT ? i.createDOMElement = !1 : i.createDOMElement = !0, t.setOptions(i), t.element && (t.element.style.zIndex = t.options.zIndex, this.options.displayMode === d.DEFAULT && !t.options.forceDisplay && (t.element.style.display = "none"));
    }), this.options.groupChildShapes && this.getChildren(!0).forEach((t) => {
      t.points.forEach((i) => {
        this.options.displayMode === d.DEFAULT ? i.setOptions({ createDOMElement: !1 }) : i.setOptions({ createDOMElement: !0 }), i.options.visible && !i.options.hidden && i.options.canDrag && i.element && (i.element.style.display = "");
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
  }, this.updatePosition = (e, t, i) => {
    e < this.left && (i ? this.left = this.oldLeft : (this.oldLeft = this.left, this.left = e)), e > this.right && (i ? this.right = this.oldRight : (this.oldRight = this.right, this.right = e)), t < this.top && (i ? this.top = this.oldTop : (this.oldTop = this.top, this.top = t)), t > this.bottom && (i ? this.bottom = this.oldBottom : (this.oldBottom = this.bottom, this.bottom = t)), this.width = this.right - this.left || 1, this.height = this.bottom - this.top || 1;
  }, this.calcPositionFromPointsArray = (e) => {
    const t = {};
    return t.left = e.map((i) => i[0]).reduce((i, s) => s < i ? s : i), t.top = e.map((i) => i[1]).reduce((i, s) => s < i ? s : i), t.right = e.map((i) => i[0]).reduce((i, s) => s > i ? s : i), t.bottom = e.map((i) => i[1]).reduce((i, s) => s > i ? s : i), t.width = t.right - t.left || 1, t.height = t.bottom - t.top || 1, t;
  }, this.getPosition = () => ({ top: this.top, left: this.left, bottom: this.bottom, right: this.right, width: parseInt(this.width), height: parseInt(this.height) }), this.getBounds = () => ({
    left: this.options.bounds.left !== -1 ? this.options.bounds.left : this.root.style.display === "none" ? -1 : this.root.clientLeft,
    top: this.options.bounds.top !== -1 ? this.options.bounds.top : this.root.style.display === "none" ? -1 : this.root.clientTop,
    right: this.options.bounds.right !== -1 ? this.options.bounds.right : this.root.style.display === "none" ? -1 : this.root.clientLeft + this.root.clientWidth,
    bottom: this.options.bounds.bottom !== -1 ? this.options.bounds.bottom : this.root.style.display === "none" ? -1 : this.root.clientTop + this.root.clientHeight
  }), this.isShapePoint = (e) => !!this.points.find((t) => t === e), this.belongsToShape = (e, t, i = !0) => {
    if (!this.isInShapePolygon(e, t))
      return !1;
    const s = L(this.root);
    if (this.findPoint(e - s.left, t - s.top))
      return !0;
    let o = this.getPointsArray();
    return i && (o = o.map((n) => [n[0] + s.left, n[1] + s.top])), rt(o, [e, t]);
  }, this.isInShapePolygon = (e, t) => {
    const i = L(this.root);
    return e >= this.left + i.left && e <= this.right + i.left && t >= this.top + i.top && t <= this.bottom + i.top;
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
    return this.resizeBox = new it().init(this.root, e.left, e.top, e.width, e.height, {
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
    return this.rotateBox = new et().init(this.root, e.left, e.top, e.width, e.height, {
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
    const [i, s] = this.getMaxPointSize(), o = {
      left: e.left - i,
      right: e.right + i,
      top: e.top - s,
      bottom: e.bottom + s,
      width: e.width + i * 2,
      height: e.height + s * 2
    };
    o.left < 0 && (this.moveTo(o.left * -1, e.top, !1), o.left = 0), o.top < 0 && (this.moveTo(e.left, o.top * -1, !1), o.top = 0);
    const n = this.getBounds();
    return o.bottom > n.bottom && (this.moveTo(e.left, o.bottom - n.bottom + e.top, !1), o.bottom = n.bottom), o.right > n.right && (this.moveTo(o.right - n.right + e.left, e.top, !1), o.bottom = n.bottom), o;
  }, this.getMaxPointSize = () => {
    if (!this.points.length)
      return [0, 0];
    const e = this.points.map((i) => i.options.width).reduce((i, s) => Math.max(i, s)), t = this.points.map((i) => i.options.height).reduce((i, s) => Math.max(i, s));
    return [e, t];
  }, this.getCenter = (e = !1) => {
    const t = this.getPosition(e);
    return [t.left + t.width / 2, t.top + t.height / 2];
  }, this.toSvg = (e = null) => M.toSvg(this, e), this.toPng = (e = N.DATAURL, t = null, i = null, s = null) => M.toPng(this, e, t, i, s), this.toJSON = (e = !0, t = !1) => JSON.stringify(this.getJSON(e, t)), this.clone = (e = {}, t = !0) => {
    const i = b({}, this.getJSON(t));
    i.parent_guid = this.guid, i.options = b(i.options, e);
    const s = new B().fromJSON(this.root, i, t);
    return s ? (s.getChildren(!0).forEach((o) => {
      o.options.id += "_" + f.length(), o.options.name += " " + f.length();
    }), s) : null;
  }, this.getJSON = (e = !0, t = !1) => {
    const i = {
      options: b({}, this.options)
    };
    if (i.options.displayMode = d.DEFAULT, t || this.options.compactExport ? i.points = this.points.map((s) => [s.x, s.y]) : i.points = this.points.map((s) => s.getJSON()), e) {
      let s = this.getChildren();
      s.length && (i.children = s.map(
        (o) => o.getJSON(e, t || this.options.compactExport)
      ));
    }
    return i;
  }, this.fromJSON = (e, t, i = !0, s = !0) => {
    let o = typeof t == "string" ? H(t) : t;
    if (!o)
      return null;
    this.root = e, f.findShapeById(o.options.id) && (o.options.id += "_" + f.length(), o.options.name += " " + f.length()), this.svg ? this.setOptions(o.options) : (o.options.forceCreateEvent = !1, this.init(e, o.options, null, !1)), o.points.forEach((h) => {
      let l;
      h.length ? (l = this.putPoint(h[0], h[1]), l.setOptions(o.options.pointOptions || {})) : l = this.putPoint(h.x, h.y, h.options || o.options.pointOptions), l && l.updateContextMenu();
    });
    const n = f.getShapeByGuid(o.parent_guid);
    return f.addShape(this), i && typeof o.children < "u" && o.children && (this.getChildren(!0).forEach((h) => h.destroy()), o.children.forEach((h) => {
      h.parent_guid = this.guid, this.addChild(new B().fromJSON(e, h));
    })), s && r.emit(a.SHAPE_CREATE, this, { parent: n }), this;
  };
}
const d = {
  DEFAULT: "default",
  SELECTED: "selected",
  SCALE: "scale",
  ROTATE: "rotate"
};
function it() {
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
  }, this.eventListener = null, this.left_top = null, this.left_center = null, this.left_bottom = null, this.center_top = null, this.center_bottom = null, this.right_top = null, this.right_center = null, this.right_bottom = null, this.init = (e, t, i, s, o, n = {}) => (this.left = parseInt(t), this.top = parseInt(i), this.width = parseInt(s), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new B().init(e, b({}, this.options.shapeOptions), []), r.emit(a.SHAPE_CREATE, this.shape, {}), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new Jt(this).run(), this.redraw(), this), this.setOptions = (e = {}) => {
    !e || typeof e != "object" || (this.options = b(this.options, e), this.options.shapeOptions.zIndex = this.options.zIndex || this.options.zIndex, this.options.shapeOptions.id = this.options.id ? this.options.id : this.options.id, this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + Ut + "')" } }), this.center_top = this.shape.addPoint(this.left + this.width / 2, this.top, { id: this.shape.guid + "_center_top", style: { backgroundImage: "url('" + wt + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + zt + "')" } }), this.right_center = this.shape.addPoint(this.right, this.top + this.height / 2, { id: this.shape.guid + "_right_center", style: { backgroundImage: "url('" + Nt + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + Vt + "')" } }), this.center_bottom = this.shape.addPoint(this.left + this.width / 2, this.bottom, { id: this.shape.guid + "_center_bottom", style: { backgroundImage: "url('" + Tt + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + Dt + "')" } }), this.left_center = this.shape.addPoint(this.left, this.top + this.height / 2, { id: this.shape.guid + "_left_center", style: { backgroundImage: "url('" + Lt + "')" } }), this.setPointsOptions();
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
  window.ResizeBox = it, window.SmartShape = B, window.RotateBox = et, window.SmartShapeManager = f;
} catch {
}
export {
  r as EventsManager,
  it as ResizeBox,
  et as RotateBox,
  a as ShapeEvents,
  B as SmartShape,
  d as SmartShapeDisplayMode,
  f as SmartShapeManager
};
