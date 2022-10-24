function st() {
  this.subscriptions = {}, this.subscribe = (t, e) => {
    if (typeof t == "string")
      return this.subscribeToEvent(t, e);
    if (typeof t == "object") {
      for (let s of t)
        this.subscribeToEvent(s, e);
      return e;
    }
    return null;
  }, this.subscribeToEvent = (t, e) => ((typeof this.subscriptions[t] > "u" || !this.subscriptions[t]) && (this.subscriptions[t] = []), typeof this.subscriptions[t].find((s) => s === e) < "u" ? null : (this.subscriptions[t].push(e), e)), this.emit = (t, e, s = null) => {
    if ((!s || typeof s != "object") && (s = {}), s.type = t, s.target = e, typeof this.subscriptions[t] < "u" && this.subscriptions[t] && this.subscriptions[t].length) {
      for (let i of this.subscriptions[t])
        i(s);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (t, e) => {
    let s = !1;
    if (typeof t == "string")
      this.unsubscribeFromEvent(t, e) && (s = !0);
    else if (typeof t == "object")
      for (let i of t)
        this.unsubscribeFromEvent(i, e) && (s = !0);
    return s;
  }, this.unsubscribeFromEvent = (t, e) => {
    if (typeof this.subscriptions[t] > "u" || !this.subscriptions[t])
      return !1;
    const s = this.subscriptions[t].indexOf(e);
    return s !== -1 ? (this.subscriptions[t].splice(s, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const h = new st(), it = (t) => t * (Math.PI / 180), ot = (t) => t * (180 / Math.PI), w = (t, e, s, i, o) => {
  const n = it(t), r = (e - i) * Math.cos(n) - (s - o) * Math.sin(n) + i, p = (e - i) * Math.sin(n) + (s - o) * Math.cos(n) + o;
  return [r, p];
}, I = (t, e, s, i) => Math.sqrt(Math.pow(s - t, 2) + Math.pow(i - e, 2)), nt = (t, e) => {
  const s = (l, g, c) => g.x <= Math.max(l.x, c.x) && g.x >= Math.min(l.x, c.x) && g.y <= Math.max(l.y, c.y) && g.y >= Math.min(l.y, c.y), i = (l, g, c) => {
    let x = (g[1] - l[1]) * (c[0] - g[0]) - (g[0] - l[0]) * (c[1] - g[1]);
    return x === 0 ? 0 : x > 0 ? 1 : 2;
  }, o = (l, g, c, x) => {
    let N = i(l, g, c), P = i(l, g, x), S = i(c, x, l), O = i(c, x, g);
    return N !== P && S !== O || N === 0 && s(l, c, g) || P === 0 && s(l, x, g) || S === 0 && s(c, l, x) ? !0 : !!(O === 0 && s(c, g, x));
  };
  if (t.length < 3)
    return !1;
  let n = [1e4, e[1]], r = 0, p = 0;
  do {
    let l = (p + 1) % t.length;
    if (o(t[p], t[l], e, n)) {
      if (i(t[p], e, t[l]) === 0)
        return s(
          t[p],
          e,
          t[l]
        );
      r++;
    }
    p = l;
  } while (p !== 0);
  return r % 2 === 1;
}, Z = (t, e, s, i) => !t && !e || !s || !i ? [s, i] : t && e ? [t, e] : (t || (t = e * (s / i)), e || (e = t * (i / s)), [t, e]);
function ht(t) {
  return rt(t) && !at(t);
}
function rt(t) {
  return !!t && typeof t == "object";
}
function at(t) {
  const e = Object.prototype.toString.call(t);
  return e === "[object RegExp]" || e === "[object Date]" || dt(t);
}
const pt = typeof Symbol == "function" && Symbol.for, lt = pt ? Symbol.for("react.element") : 60103;
function dt(t) {
  return t.$$typeof === lt;
}
function ut(t) {
  return Array.isArray(t) ? [] : {};
}
function L(t, e) {
  return e.clone !== !1 && e.isMergeableObject(t) ? _(ut(t), t, e) : t;
}
function At(t, e, s) {
  return t.concat(e).map(function(i) {
    return L(i, s);
  });
}
function gt(t, e) {
  if (!e.customMerge)
    return _;
  const s = e.customMerge(t);
  return typeof s == "function" ? s : _;
}
function ct(t) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function(e) {
    return t.propertyIsEnumerable(e);
  }) : [];
}
function W(t) {
  return Object.keys(t).concat(ct(t));
}
function J(t, e) {
  try {
    return e in t;
  } catch {
    return !1;
  }
}
function ft(t, e) {
  return J(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
}
function Et(t, e, s) {
  const i = {};
  return s.isMergeableObject(t) && W(t).forEach(function(o) {
    i[o] = L(t[o], s);
  }), W(e).forEach(function(o) {
    ft(t, o) || (J(t, o) && s.isMergeableObject(e[o]) ? i[o] = gt(o, s)(t[o], e[o], s) : i[o] = L(e[o], s));
  }), i;
}
const _ = (t, e, s) => {
  s = s || {}, s.arrayMerge = s.arrayMerge || At, s.isMergeableObject = s.isMergeableObject || ht, s.cloneUnlessOtherwiseSpecified = L;
  const i = Array.isArray(e), o = Array.isArray(t);
  return i === o ? i ? s.arrayMerge(t, e, s) : Et(t, e, s) : L(e, s);
};
_.all = function(e, s) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(i, o) {
    return _(i, o, s);
  }, {});
};
const D = (t, e = !0) => {
  let s = 0, i = 0;
  if (!e)
    return { top: t.offsetTop - t.scrollTop, left: t.offsetLeft - t.scrollLeft };
  for (; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop); )
    s += t.offsetLeft - t.scrollLeft, i += t.offsetTop - t.scrollTop, t = t.offsetParent;
  return { top: i, left: s };
}, U = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
  const e = Math.random() * 16 | 0;
  return (t === "x" ? e : e & 3 | 8).toString(16);
}).replace(/-/g, ""), X = (t) => {
  try {
    t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1;
  } catch {
  }
  return !1;
}, E = (t) => typeof t < "u" && t !== null, m = (...t) => {
  if (!t.length)
    return null;
  let e = t[0];
  if (t.length === 1)
    return e;
  for (let s = 1; s < t.length; s++)
    E(t[s]) && typeof t[s] == "object" && (e = _(e, t[s]));
  return e;
}, mt = (t) => {
  const e = atob(t.split(",")[1]), s = t.split(",")[0].split(":")[1].split(";")[0], i = new ArrayBuffer(e.length), o = new Uint8Array(i);
  for (let n = 0; n < e.length; n++)
    o[n] = e.charCodeAt(n);
  return new Blob([i], { type: s });
}, Y = (t) => new Promise((e) => {
  const s = new FileReader();
  s.onload = function(i) {
    e(i.target.result);
  }, s.readAsDataURL(t);
}), G = (t) => {
  try {
    return JSON.parse(t);
  } catch {
    return null;
  }
}, bt = (t) => {
  let e = t, s = e.indexOf("-");
  for (; s !== -1; )
    e = e.replace("-" + e[s + 1], e[s + 1].toString().toUpperCase()), s = e.indexOf("-");
  return e;
}, d = (t, e = {}) => {
  const s = {};
  for (let i in t)
    i !== "type" && i !== "target" && (s[i] = t[i]);
  return Object.keys(e).forEach((i) => {
    s[i] = e[i];
  }), s;
}, K = (t, e = null) => (e || (e = t.target.root || t.target), q(e, t.pageX, t.pageY)), q = (t, e, s) => {
  const i = D(t, !0);
  return [e - i.left, s - i.top];
};
function St() {
  this.subscriptions = {}, this.subscribe = (t, e) => {
    if (typeof t == "string")
      return this.subscribeToEvent(t, e);
    if (typeof t == "object") {
      for (let s of t)
        this.subscribeToEvent(s, e);
      return e;
    }
    return null;
  }, this.subscribeToEvent = (t, e) => ((typeof this.subscriptions[t] > "u" || !this.subscriptions[t]) && (this.subscriptions[t] = []), typeof this.subscriptions[t].find((s) => s === e) < "u" ? null : (this.subscriptions[t].push(e), e)), this.emit = (t, e, s = null) => {
    if ((!s || typeof s != "object") && (s = {}), s.type = t, s.target = e, typeof this.subscriptions[t] < "u" && this.subscriptions[t] && this.subscriptions[t].length) {
      for (let i of this.subscriptions[t])
        i(s);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (t, e) => {
    let s = !1;
    if (typeof t == "string")
      this.unsubscribeFromEvent(t, e) && (s = !0);
    else if (typeof t == "object")
      for (let i of t)
        this.unsubscribeFromEvent(i, e) && (s = !0);
    return s;
  }, this.unsubscribeFromEvent = (t, e) => {
    if (typeof this.subscriptions[t] > "u" || !this.subscriptions[t])
      return !1;
    const s = this.subscriptions[t].indexOf(e);
    return s !== -1 ? (this.subscriptions[t].splice(s, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const y = new St();
function xt(t) {
  this.menu = t, this.panelCssClass = "", this.itemCssClass = "", this.itemTextCssClass = "", this.itemImageCssClass = "", this.itemsCssClassesById = {}, this.setStyles = () => {
    if (!!this.menu.panel) {
      this.panelCssClass ? this.menu.panel.className = this.panelCssClass : (this.menu.panel.style.padding = "3px", this.menu.panel.style.borderStyle = "solid", this.menu.panel.style.borderColor = "#dddddd", this.menu.panel.style.borderWidth = "1px", this.menu.panel.style.backgroundColor = "#eeeeee", this.menu.panel.className = "");
      for (let e of this.menu.items)
        this.setItemStyles(e);
    }
  }, this.setItemStyles = (e) => {
    this.setItemDivStyles(e), this.setItemSpanStyles(e), this.setItemImageStyles(e);
  }, this.setItemDivStyles = (e) => {
    const s = this.menu.panel.querySelector("#" + e.id);
    !s || (s.style.display = "flex", s.style.flexDirection = "row", s.style.alignItems = "center", this.itemsCssClassesById[e.id] && typeof this.itemsCssClassesById[e.id] == "object" && this.itemsCssClassesById[e.id][v.ITEM] ? s.className = this.itemsCssClassesById[e.id][v.ITEM] : this.itemCssClass ? s.className = this.itemCssClass || "" : (s.className = "", s.style.paddingTop = "2px", s.style.paddingLeft = "3px", s.style.paddingRight = "3px", s.addEventListener("mouseover", () => {
      s.style.backgroundColor = "#0066CC", s.style.color = "white";
    }), s.addEventListener("mouseout", () => {
      s.style.backgroundColor = "transparent", s.style.color = "black";
    })), s.style.whiteSpace = "nowrap");
  }, this.setItemSpanStyles = (e) => {
    const s = this.menu.panel.querySelector("#" + e.id);
    if (!s)
      return;
    const i = s.querySelector("span");
    i && (this.itemsCssClassesById[e.id] && typeof this.itemsCssClassesById[e.id] == "object" && this.itemsCssClassesById[e.id][v.TEXT] ? i.className = this.itemsCssClassesById[e.id][v.TEXT] : this.itemTextCssClass ? i.className = this.itemTextCssClass : (i.className = "", i.style.color = "black"));
  }, this.setItemImageStyles = (e) => {
    const s = this.menu.panel.querySelector("#" + e.id);
    if (!s)
      return;
    const i = s.querySelector("img");
    i && (this.itemsCssClassesById[e.id] && typeof this.itemsCssClassesById[e.id] == "object" && this.itemsCssClassesById[e.id][v.IMAGE] ? i.className = this.itemsCssClassesById[e.id][v.IMAGE] : this.itemImageCssClass ? i.className = this.itemImageCssClass : i.className = "");
  }, this.setPanelClass = (e = null) => {
    this.panelCssClass = e || "";
  }, this.setItemClass = (e = null, s = null) => {
    if (s) {
      this.setClassForItem(s, v.ITEM, e);
      return;
    }
    this.itemCssClass = e || "";
  }, this.setTextClass = (e = null, s = null) => {
    if (s) {
      this.setClassForItem(s, v.TEXT, e);
      return;
    }
    this.itemTextCssClass = e || "";
  }, this.setImageClass = (e = null, s = null) => {
    if (s) {
      this.setClassForItem(s, v.IMAGE, e);
      return;
    }
    this.itemImageCssClass = e || "";
  }, this.setClassForItem = (e, s, i) => {
    (!this.itemsCssClassesById[e] || typeof this.itemsCssClassesById[e] > "u") && (this.itemsCssClassesById[e] = {}), this.itemsCssClassesById[e][s] = i;
  };
}
const v = {
  ITEM: "div",
  TEXT: "text",
  IMAGE: "image"
}, yt = (t, e = {}) => {
  const s = {};
  for (let i in t)
    i !== "type" && i !== "target" && (s[i] = t[i]);
  return Object.keys(e).forEach((i) => {
    s[i] = e[i];
  }), s;
};
function vt(t, e, s = null) {
  this.panel = null, this.container = e, this.items = t, this.event = s || "contextmenu", this.listeners = {}, this.origEvent = null, this.cursorX = 0, this.cursorY = 0, this.overflowY = "", this.maxImageHeight = 0, this.subscriptions = {}, this.init = () => (Object.assign(this, new xt(this)), this.container.addEventListener(this.event, (i) => (this.onEvent(i), !1)), y.emit(M.CREATE, this, { owner: this }), this), this.onEvent = (i) => {
    this.origEvent = i, i.preventDefault(), i.stopPropagation(), i.cancelBubble = !0, this.cursorX = i.pageX, this.cursorY = i.pageY, this.show();
  }, this.drawMenu = () => {
    try {
      document.body.removeChild(this.panel);
    } catch {
    }
    this.panel = document.createElement("div"), document.body.appendChild(this.panel);
    for (let i of this.items) {
      if (this.panel.querySelector("#" + i.id))
        continue;
      const o = document.createElement("div");
      o.id = i.id, o.style.cursor = "pointer";
      const n = document.createElement("span");
      n.innerHTML = i.title, o.appendChild(n), this.panel.appendChild(o);
    }
    this.setStyles(), this.drawImages(), this.setStyles(), this.setItemsEventListeners(), this.panel.style.display = "none";
  }, this.drawImages = () => {
    if (!this.panel)
      return;
    const i = this.items.filter((o) => o.image && typeof o.image < "u");
    this.maxImageHeight = 0;
    for (let o of i) {
      const n = new Image();
      if (!this.panel)
        continue;
      const r = this.panel.querySelector("#" + o.id + " > span");
      if (n.style.display = "none", n.src = o.image, !this.panel)
        return;
      const p = document.createElement("div");
      p.style.marginRight = "5px", p.style.display = "flex", p.style.flexDirection = "row", p.style.justifyContent = "center", p.style.alignItems = "center", n.height = this.panel.querySelector("#" + o.id).clientHeight, n.height > this.maxImageHeight && (this.maxImageHeight = n.height), n.style.verticalAlign = "middle", n.style.display = "", p.appendChild(n), this.panel.querySelector("#" + o.id + " div") || this.panel.querySelector("#" + o.id).insertBefore(p, r);
    }
    this.adjustImagesWidth();
  }, this.setItemsEventListeners = () => {
    for (let i of ["click", "mouseover", "mouseout", "dblclick", "mousedown", "mouseup", "mousemove"])
      this.setListenersForMouseEvent(i);
  }, this.setListenersForMouseEvent = (i) => {
    for (let o of this.items)
      this.setListenerForItem(i, o);
  }, this.setListenerForItem = (i, o) => {
    const n = (r) => {
      !this.origEvent || (y.emit(i, this.origEvent.target, yt(r, {
        container: this.container,
        owner: this,
        cursorX: this.cursorX,
        cursorY: this.cursorY,
        itemId: o.id
      })), setTimeout(() => {
        ["click", "mousedown", "mouseup", "dblclick"].indexOf(i) !== -1 && r.button !== 2 && this.hide();
      }, 100));
    };
    this.listeners[i + "_" + o.id] = n, this.panel.querySelector("#" + o.id).addEventListener(i, n);
  }, this.adjustImagesWidth = () => {
    if (!this.panel)
      return;
    let i = 0;
    for (let o of this.items)
      this.panel.querySelector("#" + o.id).clientHeight > i && (i = this.panel.querySelector("#" + o.id).clientHeight);
    for (let o of this.panel.querySelectorAll("img"))
      o.parentNode.style.width = i + "px", o.parentNode.style.height = i + "px";
  }, this.show = () => {
    if (!this.container || (y.emit(M.SHOW, this, { owner: this }), this.drawMenu(), !this.panel))
      return;
    this.panel.style.display = "";
    let i = this.cursorX, o = this.cursorY;
    this.panel.style.left = i + "px", this.panel.style.top = o + "px", this.panel.style.zIndex = "10000", this.panel.style.position = "absolute", i + this.panel.clientWidth > window.innerWidth && (i = window.innerWidth - this.panel.clientWidth - 10, this.panel.style.left = i + "px"), this.origEvent && this.origEvent.clientY + this.panel.clientHeight > window.innerHeight && (o = o - (window.innerHeight + this.panel.clientHeight - 20) + this.origEvent.clientY, this.panel.style.top = o + "px");
  }, this.hide = () => {
    this.panel && (this.panel.style.display = "none");
  }, this.addItem = (i, o, n = null) => {
    const r = { id: i, title: o };
    n && (r.image = n), this.items.push(r);
  }, this.removeItem = (i) => {
    const o = this.items.findIndex((n) => n.id === i);
    o !== -1 && this.items.splice(o, 1);
  }, this.findItemById = (i) => Array.from(this.panel.querySelectorAll("div")).find((o) => o.id === i), this.setId = (i) => this.panel.id = i, this.addEventListener = (i, o) => {
    typeof this.subscriptions[i] > "u" && (this.subscriptions[i] = []);
    const n = y.subscribe(i, (r) => {
      r.owner === this && o(r);
    });
    return this.subscriptions[i].push(n), n;
  }, this.removeEventListener = (i, o) => {
    this.subscriptions[i] && typeof this.subscriptions[i] < "u" && this.subscriptions[i].splice(this.subscriptions[i].indexOf(o), 1), y.unsubscribe(i, o);
  }, this.on = (i, o) => this.addEventListener(i, o), this.off = (i, o) => {
    this.removeEventListener(i, o);
  }, this.removeAllEventListeners = () => {
    for (let i in this.subscriptions)
      for (let o of this.subscriptions[i])
        y.unsubscribe(i, o);
    if (this.subscriptions = {}, !!this.panel)
      for (let i in this.listeners) {
        const [o, n] = i.split("_"), r = this.panel.querySelector("#" + n);
        r && r.removeEventListener(o, this.listeners[i]);
      }
  }, this.destroy = () => {
    this.removeAllEventListeners(), this.items = [], this.container = null;
    try {
      document.body.removeChild(this.panel);
    } catch {
    }
    this.panel && (this.panel.innerHTML = ""), this.panel = null, y.emit(M.DESTROY, this, { owner: this });
  };
}
const M = {
  CREATE: "create",
  DESTROY: "destroy",
  SHOW: "show"
};
function Ot() {
  this.menus = [], this.create = (t, e, s) => new vt(t, e, s).init(), y.subscribe(M.CREATE, (t) => {
    this.menus.indexOf(t.target) === -1 && (this.menus.push(t.target), t.target.id = this.menus.length);
  }), y.subscribe(M.DESTROY, (t) => {
    this.menus.indexOf(t.target) !== -1 && this.menus.splice(this.menus.indexOf(t.target), 1);
  }), y.subscribe(M.SHOW, (t) => {
    this.menus.forEach((e) => {
      e !== t.target && e.hide();
    });
  }), document.addEventListener("mouseup", (t) => {
    t.button !== 2 && this.menus.forEach((e) => e.hide());
  });
}
const j = new Ot();
try {
  window.Menus = j;
} catch {
}
const Ct = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECcZZuWhdAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlZBBEsAgCAMT/v/n7akzWAFtTo5mQ8SAJtkGcL4LXcg211A2L+eq3jc5C/AGTUBZ7wYAHH+B4yIAv8a8dkvilLz9qXuYKseU2E7qDFODqIwTIEkPSldAAa0WlbUAAAAASUVORK5CYII=", Bt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECgYlnqNLQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABZSURBVCjPlZFBCgAxCANN/v/n2VOhiFU3N4U4GgXELUkAikbOhlhIh1QZXkR3hGc/IsaVMtHT0RXR3e5jescIqBpy05T/tInffw2AvEkr972N+a69+U8e8AGOtEABr4X+4AAAAABJRU5ErkJggg==", Mt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECkWaNmRawAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABjSURBVCjPlZBRDsAgCENbsnt6/1N0P2ocijASEy08iqC1BknhASCvsSeOQXImJXHcrQL4t1UAr4fjReDmdCsc/5LEZ7NOwOlUKVy3RwC/AAAwL2TAZ3t+xFszOxVl7lbtvsYLOtlZCOj2NccAAAAASUVORK5CYII=", _t = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECoXNPPyPgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlVFBEgAhCAL+/2f21I5jqcXFGRMSpG1EkLRtooEyIdaRlAc7orqBsg+gVKy8yTYn49vqMb0pgCUuPOBP93Sniaxb8/FdL6mt/rZe5SMKXQWRf/4AYrs6C0ViuwUAAAAASUVORK5CYII=", Pt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDsHep3BSgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA8SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCAZy0h4AXLILDAEWNOwAAAAASUVORK5CYII=", It = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDMMJZaSygAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA/SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCJxAWZoFp1MBY8cLTv/x72kAAAAASUVORK5CYII=", wt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQARsznxFAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", Tt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQEbSvcpSwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA3SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTCICjCTbxPJfsIWSv+JECM9nugHAG40DyW1OoLPAAAAAElFTkSuQmCC", Rt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDIpd4l3zAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", Lt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDYr/evT5AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", Dt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDUsSKIVhAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA0SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTBQZBPJfsIWSv+JECM9nugHADv6Dv2P6G4ZAAAAAElFTkSuQmCC", Ut = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDQQftZYQgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", Q = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAEDSURBVDjLzZPNSsQwEIC/CUWtQlnZi14EYb36Jj6DT+ZT+BSevImHPYggKLpo2bW1Ze14yJjFtKEed3poMpmvzZcf2LqQfkolZFV0FFDhkMI6JR99JAbczTlP/tGZung86yN7Spn+4ABw0PH5DyCoOoSvYOg00s9C+YSpL8oLGgMmnOILF2r68qvKibvWXd9hbsCZ/ajpLniULnKQO82tubb3vY3Uw9IrvhOmCaDFJYC2DyjLt1vNQGjzI5v7+1wrBWTN0uQ3R0OFfQRwz7PjS8td8UAHKFW0rCDqt0ud1mEfKlZ+bYYdNtGQjAFgh6L+M9sRQKev5Yu1F4zfh7ELtIXxA+JiW9aVMPJ4AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", $ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAACn0lEQVRIx+2U30tTYRzGn/fsPdOmNkWDsEDnOiFCbv4KhPJCFAvDtBuRyL/A64TwQkGaCt7pVYqimHhTJAVhuYsRE5zipLuZeQKNsMQdN1vbzvbtwg2Oa5s/uvWBl3Px8P18OO/7ngNc5H9DROw8XTxCumEiygJwjYh4kp7HuqzTiJLBc8aslr5+vbiy43SWaiVExHecztJ+vbgyZrX0EVHOqSVx+ERFee8wR3hcBNky+VpcEofbMvnauAga5ghPVJT3ppKwJIKsqRrr0/3P68+KdeAMgBIFfgjc/cT+6TEATNffmbkaVa1GASAAcgRq3i3L806Xe4gxdqjl8QS4ACBPDPibpIwjOAAUAOBR1fqy8e4MAFwXVGuuZlLi4ErA3wTgBREFGGPRdG+gCytKy3JDTdfvrxv12s4bOXrm6o7PGEok++2PrhHRaJxnjEXSblFMog/7lea1xn8liTGUSPaKD64RMdv4jjEWOvEMtJKIX2lev1fTFdhKLrlkkuyW964RXQo4kOY7ABBVNj0e+eDwMudAsiUfHF5WNj0eANFUkFRbxPdWl268elA3Wyyq1nwx+fBeGJDD3P3oraMjv6r2C2NMPVFARLq91SXpTUvdrEmvWgv0SJtfIWArxN0P5x0d+VW1G2kPOXZNC6dMma+LebD6SgI8o+imHQCC3zzHzuRnCJDVjJXOrT9tAL5rr+mxM4gV+w3dPY7CbCEkciC+DGbJXjS3PFo0tzxqMEt2bVeYLYQaunscAPa18KSJ/SrMyuSgTa4WgnIlaLtVWlR93jYi0hORXvV527ZbpUW5EiRXC0FlctBGROaz/o/Mvumhgd32soU4XNPrVZ+3bbe9bME3PTRwJniCxERE97VwrSTWmc4MTxSdp7vIqfMXBoR6XMSZc1QAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDB/NVeTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwDmjvLwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=", Nt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAG6SURBVDjLlZK/TxNhGMc/z117FgWbNulITGMYTMvAaHAyhMTAIoOmcdD/wMWERdO4E8If4OJASBgcGcA4QRgx4YcLA4aUYDTRCoX2fj0OvTu441rwuem+7/N5n/f7PA/8ZwholiHuYCCXdMWnxYk4KYwWSws0+JX4GqUFLaqRVmHYWFUfTZ6I4U9ynKyRAUztoNsfq6f4gWrsDI6+VMGMPTMCwIHqGt+xA9Wq3uNFuukIoIUtduiYFs51QDIcwMSKrHn4otcBebJ4QfofmnghYKcANlCQxaj505xcAL0qGM1lFEXwwsH2B/zi0/DXXbps2k0YtDBxAbxvPbtUL7/Xi8HVy90ntXdwVUUgHKGADufedrJUsGKWd2857aXMXLAy4j7nUOxuhdabvfmR86/x0gPO7AFn3lYkCJaqON31HqVCNpZvMkCDA3kVtfUD5/yVYwFQ48qaZShO1VeqbEbKwyfbK+/kx5VtDO4TLO/Rs7FPpVCZ+bm8Za5LpwcAKuTajycebBQAxn9/3st9oSPaEwAVbjcnx+/vDlZON/bza5yJ0j9UNH9Um3h9VNO7/a6OIwWd0sIN09PiH5BSrD/OwMFRAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", zt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAFGUlEQVRIx7WVaWxc1RXHf/ctM+OxPcQLxIljD3GCAYOxiHCSpmmWEgi7kBBIiEXiU79USHxhEaJtWqFWqqhQW1BLIImrVLTwgQBhM2sIEIVFCZDFSbCdxI4X7ExmMjOemffuvacfbA8e1FYNUv/See/o3vf+5/3/5+o8+D9DzSYiolatWhUrFArR2bXa2lr1317OZrMCcPbsWQFIp9PypOt23TsxsbuigIiogx8/d9+StsW/8P1Y8ty/U6avpYCPf/2XbMPdV9/fueZn2wA8gPXr11e/uu2hX1EabQlyeRQKlPofuQVBQCy5XYdwGv3aZGvLJuCfQMEBsNZW+RG/xZSyWAEjqiJCA09ueZtr736CXXuPzdkDI2CtYI0wvvsY1a21RHyvFYgCOACJRMK1RmMsWKuworDiYMXBWMXjf3yF9/f0s+mXjxB6TfR+eLi8Px0Kk5lieP8g9YsvIAiLJBIJp2yR53nKaI21Mu3MbAB/3trLnn0neeap35FsrseGU3y5r8SLO/dy2/XLZ13CfHacjO8Qr6tBl0qIiCorUEq51oYYIxgr05KtsO2FXbzy9n4ee/jnjJ44wOmRQxw5+CnP/r2XqliU51/+BGMs1kDu6Di6KcFUMcBajYh8p8AYo6wOsMagRGERnu55kx1vfc6Plney+bmtXP3jDv72j9dYOL+ODasvp7urjfxUkb9uf4d7b+gmNTBGtK2RIAxBTPmEejNNVkYHGKMRIzz42xfY/ekRrlvXxdruC5mX6MB1XVZ3t2OtMDJ+hoETY3Rd2sLtN69gz5Z3qU3lqN9wEQrBmu8s8gAymYzosITRITvf28fxoQmeePROCqWQMAiZmMxgrSWVyhCEBkQIwxATlFhyYSMr59XyXv4bEp7Cc8CEYaWCdDqNDovoMODowCgbf3IpuXwOgHyhRLEQUBXzwcbAUbiOQ8RXHO0f4tuJM6w+nSeb8ImKQSFoXSKfz1NuciqVQodFQh2w8soWjgyOMjwySVNjNYWpIhFPiMdcfNcS9YSYJ8RjDvGYi2ciTC6/hlxbMx1Lzyc0Bh0EZW5vpoCEQQkThlzRPp/O9iZe/+AQv/nTa2x+/A6y+SI18SijE1mKpQAdWiIRl5XLknxzzOdYop5IcwO+pwiCEOUVKy0ClA6KGB1Mjwmg98PDLOtYiBjN0KkU45NZhsYydHcuIhZ1qa3ycMVgaxYycnyAqzrOI5ctYMXietFyAQegUCiggwJGG7TWaK3pumQBff3f8uyLe/F9RceSBrovWwDG4CkoFgNS6RxnTIxTo4MoMYxOZNDaoIN/pyAsIWLLM+yWn17M7Rs76B9K0fPSF2xYsZh0tsDi5np8L0Y04nH4eJrtvc9z5dIYg8PVNM6LE/UddFiqVAA4WocYY8rxxYFhdn7QRzzm0TcwwchkjisubmLB+TXUVEeIRBw+/3qQI4cPUBfXIMIFDXFELFqHlU0GlNGmYgqv6Gwu53fd2Mn+vjH6T57m/rtWYo3BWOGTfSdJNlXRcF6M9mQdSoQ5PJUWGWPLP47vY113kjVXtfKHnj38fstH3LT2Ik6NZ+loa2Tj6iW0JxuYGTlzuSsK2KGxzGTz/ESjWMN/wgP3rCjnS1vrWNvd+j1iUI7LqfHMJGDnFhjrefmrN+67bfmNyUVN9cpxUY6Hclwcx0WVY/pxsRqxBrEGO3OfXTsxPJbq2fHVm8BYWcYMLgNuBS6Z0/xzhQX6gB3AwR/IcW74F/jUry6yACAoAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", Vt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAE8ElEQVRIx7WVWWxVVRSGv733Off2Xjrc0oFKy6XQoqCMEgc0RhFNVBzwQRIfUBKiTyYqCSQmmhiNJkSjiQkJiQ8mKg5xiGKCCIpEZFCCcwlVhlCwrbSlpe1te8/Ze20fTluL4AMaV3KmZGd9a/3r7H/D/xzqb99pIPUfc0ZA8TzALzvee6C5adbTqVRqxgXrGFupDUqBR4EG/LkrfVwc6jjZ9nzDkjuemwjIFFq/OZRyI43EI//Qp0IpnTyDAKU1KDUBPprKpJAgNRTk51cDw8GYNKkwaJTCIHgPWieVeTkX4lWSWCzaGDAhSisUejS/BxdhMqXZUbnHAUpsTH//AH2FYQojMWcGCgBUZNM019eQCsNkpVOgNV4MSgQThHgDSpm/ZEp0UwDjAO9istkSJpWWooIQrwNO/dHNdy2tvL31S2bW17H0yjnkp9aCKLxolLMgHh2GEJBIqAGRCcImUT38884uGeyFIMShCdMZMAFoQxRZPv96P5s/2EJ1RSlrVtzKFc15lNZoE2LSaXSYRpkApQ1kKtANc2uA7jFATeH7z05LoY+ih9N9BY793sVwFBE7x9LrriFXXo54z849+3nl1ddZMKuRh+69lfq6GlSYIkhn0Kk0OghRJeXo/IJaoGsMUDtw4JM/3GAvrW2dvLN9N22dZyhaR29/AWuF8tIM0+vruO+OW5jdlOeZlzdx6Mhx7rnxKlbdvYxcrpIgncWkS1CTcpj8winA6QlDjhAbMWvqZErTIXu+b2FwpEgmFeKVJghCevqH6O79kKqKLLfftITLm6bz7tad7P2xlQ2PPUg+Pw1lDMa582ZQ1/vV2x1u6CxRbPntZCffffwtmeV3MmQt/b09tLed4OCh45w6fpiG2iqWXb2IqvI0c2Y08MrmLQC8vP5hmpubSFVUYZquvQToHOtAiysiEhEYxeSKEnp8kRvP9DBz1QMopXh9234GGvuYZ4Qsll9/2Mv04hkaasrZ8MhKXnprGx/s2M36xmmItZD8T8kNUDaOcNaR7IdBGhdOp3XfPrIlJQTpLCvvXMaifCVvPvs4B776HH/ZDTQtuY0t+1po7+ljwyMrmd1Yh7URYovj6owDJB5BXIS1MfVVZeRKM/SGwu6nnqR6co4X3t9DN2WUV07m+hX3s2Lptaxe/SAvbnqNT789TN/Zfm5ePAdxMWLj8wE2KiJxjIsilLXMnVZD47x6TnScYte6tSyp1fza3sddT2ykc9CwsKGSsrJSamrrWPfoWn48chJxDnEWl/jZuTvZFUfw1uKdgAiBeK6ZeQk9UyrpONbFpT99ST5TRvtQjvlXLaIhtHQdO0I00MNQ+1EWN09FXIx3DhcXzwNoH0d45xCbAEQSR6nOpKia14CIx/qIKcOnSB/tpPeEQQcBxigmaY0ODF4s3sZIVBxXZ8I+sIgVvEsufGJagkJp0EoT4kllQpRS4D3exjg36rChR0UxNijilbqARNbhrYB4RHxi22Pu6AHsqPcrvBp1TMWoH3m88slhVBwZO4TOGbJ09w8OKDzee1RSPqDwPnn3kpBEBHFJIYjHW0Gsw8cWsRE2LtLW0d4HyMQOOt/44uD2NbddvzxXnitRyoBSKG0Sd9QapUwiBeC94MWBCB6X0JWgjaaju+fsxg93bQM6J1oFwBXACmD2hM4uNgQ4DHwEtPzLHBcXfwKfID6QlqygzQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMH81V5MAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDAOaO8vAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==", Ht = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAFdSURBVDjLzZO/TsJQFMZ/t1QsmthEjQkmLoZJA7ODq/EdHBx9BcTEmMjCxsA7+Ao+gFOdCImOuoAs/qtIldL2OECxLY1EJ88Zbu6933e+c/988MtQ8akotOQaQqAklSAaS5hkEgQfmzcVTImJEjPfoMNjIjv5hpiiEgqiyJLXLiVAEpWU0oJ9HpQHoEeaWWFZPpGbiy17QlK35vaBqBAXaWajzp3sYWFJUQzRx2lIEQtLNmVMGQ0ZzPYuXQQX6OON5EGgjxstHkrp8k4A8c1xpBJgAMAwhTBMJ7jT1X5WGP5nBQ1dvve1mQq1wjGEX02rFX5S8HPOh16pVOYjiAHNnIeXTuidtc/XnOv4ERa8ky42fkpL9dXyfTnLXAzf54UmvdBCCkB01hcPHZ0djHh15QVHdHBV5BYAfOzq06npXMXhhl995TkKnxhINEqUyE49WYtW3JxRx82w/x/jC67KmykWiVPXAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", kt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAACQElEQVRIx9WUz2sTURDHPzMvIb3VgyJKW/DXSXoKtSJIbaxtgi3of+BfIYKXgOAfUCh6zFFR9Ca1tomXigf7P/SQqo2giIrNpvvGw+7GStIlG/HgLI8dHvPmOzPvw4P/3SRx1hurde/9bL8g7z1mhveGWeQj0liq3CgNrLS28cKy2JNnj2yQvLnE6XQ6AHz/8Q3vPd6HhMk/3CcMw2j5fU5NnCMI2gMV3hUIggCAdrDHy9U1zDzeopF4b5g3jJCZKzN/xA8h0Ga2NAMIZoYRz91b3JmP4ttZBeIDPgzZWK8DgghEgzbMADNKc6W/6yD0nqtzJUQEVY2FonXQ2lkFkgNOlXq9gYoiqqgIiCJETM+XF7oFrTxYtjNnT6ci3NOBc45yuYxTh3MOVYeqxt0QJYjjp6cuUSwWe6p++vzxbE8HiYCosv5qI0rqFKeOxeuLqHOICHbgkr98/czH1k4qwj2XLMD8wjWcy5FzDudyICDxZ/FdBEHAm81Nms1mKsI9HRw/djL10hyuGz81fYHJyfOpCHcFDNu8c/f2RUveHTMS38xcNPookXlPYWSErXdbtHZ3UxHuCtyr3r9crd4qbCcb27+rHp848XNp8SYfdndQVUSEkUKBsbFxRo+MpiKcO7Bv1Wptr99YVh4uUywWab4/SqPxGhVFnaPV+nQowv0EDrVOp4Oqks/nqVQqAyGcSWAYhLMJDIHwUB1kQTiTQBrC0RtkRAhH+7l87m1yVgYRAOQwhPtZrVZrk7z0/9p+AWdQwNFPdOB+AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDA5LTEyLTAxVDAyOjIyOjM1KzAxOjAwqBTIawAAACV0RVh0ZGF0ZTptb2RpZnkAMjAwOS0xMi0wMVQwMjoyMjozNSswMTowMNlJcNcAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAE3RFWHRUaXRsZQBPcHRpY2FsIERyaXZlPme6DAAAAABJRU5ErkJggg==", Gt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAAB3RJTUUH5goLBzIP6fiS+gAAAoFJREFUSMfVVk1rE2EQft55EyKeFU0PlcR6koIa+0FBa2NtEmyL9uLBIoHi0YvFogghIIjoTbx4MldB8BRUTJNeqh7MwT+gPaSpKdjak2bTnfGw3SVhP5p4EFxYmJf5eGbmfXZmgf/9UbZQqrwtM/OElxEzQ0TALBCxZChVmclcSe4HEGoLMjEwv+AoYvV6oOOr1y87kvkajYotxzc2lAug1Wp1BPi5swWTGcwmTHMXpmlaL+8i1n8ChtHsqkUOgGEYHYpisQgWqyXMAmGBwMT4hXFP+64AYvU66o0aFICx08OOUbj6EcICZgYzW/ZNw7ct3gBNKyM2TSyXyjjfZrRcKkMEgAiSk8m/rwAATGZcnEyi/UZSqRSU6kyw2SuA7aCJUC5XQE8eQRGBlMLoqbMdTt8AzAF4k7uH4wNxiAiKLOJFYVcFWmuk02lo0tBag0jjx+07ntmNDI0hkUgEUtgFoIhQer8MIgJpgiaNMz7lb+9s4fvmeiCFXZesAEylLkHrEEJaQ+sQGj4AH1ZXUavVAinsquDI4b6u58zQyDAGB096UtgFIJDVu/eXRsWeOyKw5VuA9gKofq5is9EIpLAD8CD/8Fw+n42s7Z1zz9/9snUvbmYxM30VG411EBGUUjgQieD6fNYJdPBL1ZPCobaEJJ8v/LYPuWjUURztiyKRSKBWP4RKZQWkCKQ14m3OK+UVTKVT/hUEPa1WC0SEcDiMTCbjUHh7ccmxmZmdtb6BIAC/2fLYMMSTws+eYvryNEhr1PqPOXGMhRu9VRBEYShAoXOM9NyiXinsC+A3coMobK1RAa7N7e0NRkipT66dvN/ubqcw1oKNC4VCE4D8k7+KP78ve+ZyfaadAAAAAElFTkSuQmCC";
function H(t) {
  this.point = t, this.contextMenu = null, this.updateContextMenu = () => {
    this.contextMenu && (this.contextMenu.destroy(), this.contextMenu = null), this.point.options.canDelete && this.initMenu(), this.point.contextMenu = this.contextMenu;
  }, this.initMenu = () => {
    this.point.element && (this.contextMenu = j.create([
      { id: "i" + this.point.guid + "_delete", title: "Delete point", image: $ }
    ], this.point.element), this._setEventListeners());
  }, this._setEventListeners = () => {
    this.contextMenu.on("click", (e) => {
      e.itemId === "i" + t.guid + "_delete" && h.emit(A.POINT_DELETE_REQUEST, this.point);
    });
  };
}
function jt() {
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
      b.LEFT,
      b.TOP,
      b.RIGHT,
      b.BOTTOM
    ],
    visible: !0,
    hidden: !1,
    forceDisplay: !1
  }, this.x = 0, this.y = 0, this.element = null, this.guid = U(), this.subscriptions = {}, this.init = (t, e, s = null) => (this.x = parseInt(t), this.y = parseInt(e), Object.assign(this, new H(this)), this.element = this.createPointUI(), this.setOptions(m({}, s)), this.setEventListeners(), h.emit(A.POINT_ADDED, this), this), this.setOptions = (t) => {
    this.element || (this.element = document.createElement("div"), this.setEventListeners(), Object.assign(this, new H(this))), t && typeof t == "object" && (E(t.moveDirections) && typeof t.moveDirections == "object" && (this.options.moveDirections = []), this.options = m(this.options, t)), this.options.id && (this.element.id = this.options.id);
  }, this.createPointUI = () => {
    const t = document.createElement("div");
    return this.options.canDrag ? this.setPointStyles(t) : t;
  }, this.setPointStyles = (t = null) => {
    if (this.element || (this.element = document.createElement("div"), this.setEventListeners(), Object.assign(this, new H(this))), t == null && (t = this.element), this.options.id && (this.element.id = this.options.id, t.id = this.options.id), t.className = this.options.classes, t.style = this.options.style, typeof this.options.style == "object")
      for (let e in this.options.style)
        t.style[bt(e)] = this.options.style[e];
    return t.style.width = this.options.width + "px", t.style.height = this.options.height + "px", t.style.left = this.x - parseInt(this.options.width / 2) + "px", t.style.top = this.y - parseInt(this.options.height / 2) + "px", t.style.zIndex = this.options.zIndex, !this.options.canDrag || !this.options.visible || this.options.hidden ? t.style.display = "none" : t.style.display = "", t.style.position = "absolute", typeof this.updateContextMenu == "function" && this.updateContextMenu(), t;
  }, this.redraw = () => {
    this.element = this.setPointStyles();
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.rotateBy = (t, e, s) => {
    const [i, o] = w(t, this.x, this.y, e, s);
    this.x = i, this.y = o;
  }, this.setEventListeners = () => {
    this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown), this.element.addEventListener("mouseover", this.mouseover), this.element.addEventListener("mouseout", this.mouseout), this.element.addEventListener("click", this.click), this.element.addEventListener("dblclick", this.doubleclick), this.element.addEventListener("mousemove", this.mousemove), h.subscribe(k.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange);
  }, this.mousedown = (t) => {
    h.emit(A.POINT_MOUSE_DOWN, this, d(t)), t.buttons === 1 && this.options.canDrag && (h.emit(A.POINT_DRAG_START, this, d(t)), X(t));
  }, this.mousemove = (t) => {
    if (h.emit(A.POINT_MOUSE_MOVE, this, d(t)), t.buttons !== 1 || !this.options.canDrag || !f.draggedShape || f.draggedShape.draggedPoint !== this)
      return;
    const e = this.x, s = this.y, i = D(this.element.parentNode, !0);
    if (!this.checkFitBounds(this.x + t.movementX, this.y + t.movementY)) {
      h.emit(A.POINT_DRAG_MOVE, this, d(t, { oldX: e, oldY: s }));
      return;
    }
    let o = t.clientX + window.scrollX - i.left - this.options.width / 2, n = t.clientY + window.scrollY - i.top - this.options.height / 2;
    [o, n] = this.applyMoveRestrictions(o, n, e, s), this.x = o, this.y = n, this.element.style.left = this.x + "px", this.element.style.top = this.y + "px", h.emit(A.POINT_DRAG_MOVE, this, d(t, { oldX: e, oldY: s }));
  }, this.mouseover = (t) => {
    h.emit(A.POINT_MOUSE_OVER, this, d(t));
  }, this.mouseout = (t) => {
    h.emit(A.POINT_MOUSE_OUT, this, d(t));
  }, this.click = (t) => {
    h.emit(A.POINT_MOUSE_CLICK, this, d(t));
  }, this.doubleclick = (t) => {
    h.emit(A.POINT_MOUSE_DOUBLE_CLICK, this, d(t));
  }, this.checkFitBounds = (t, e) => !(this.options.bounds.left !== -1 && t < this.options.bounds.left || this.options.bounds.right !== -1 && t > this.options.bounds.right || this.options.bounds.top !== -1 && e < this.options.bounds.top || this.options.bounds.bottom !== -1 && e > this.options.bounds.bottom), this.applyMoveRestrictions = (t, e, s, i) => (e > i && this.options.moveDirections.indexOf(b.BOTTOM) === -1 && (e = i), e < i && this.options.moveDirections.indexOf(b.TOP) === -1 && (e = i), t > s && this.options.moveDirections.indexOf(b.RIGHT) === -1 && (t = s), t < s && this.options.moveDirections.indexOf(b.LEFT) === -1 && (t = s), t > this.options.bounds.right && this.options.bounds.right !== -1 && (t = this.options.bounds.right), e > this.options.bounds.bottom && this.options.bounds.bottom !== -1 && (e = this.options.bounds.bottom), t < this.options.bounds.left && this.options.bounds.left !== -1 && (t = this.options.bounds.left), e < this.options.bounds.top && this.options.bounds.top !== -1 && (e = this.options.bounds.top), [t, e]), this.mouseup = (t) => {
    h.emit(A.POINT_MOUSE_UP, this, d(t)), t.button !== 2 && h.emit(A.POINT_DRAG_END, this, d(t));
  }, this.onBoundsChange = (t) => {
    t.points.find((e) => e === this) && (this.options.bounds = t.bounds);
  }, this.toJSON = () => JSON.stringify(this.getJSON()), this.getJSON = () => ({
    x: this.x,
    y: this.y,
    options: m({}, this.options)
  }), this.fromJSON = (t) => {
    let e = t;
    if (typeof e == "string" && (e = G(t)), !e)
      return null;
    this.x = e.x, this.y = e.y;
    let s = !1;
    return this.element || (s = !0, this.element = document.createElement("div")), this.setOptions(e.options), s && h.emit(A.POINT_ADDED, this), this;
  }, this.destroy = () => {
    this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), this.element.removeEventListener("mouseover", this.mouseover), this.element.removeEventListener("mouseout", this.mouseout), this.element.removeEventListener("click", this.click), this.element.removeEventListener("dblclick", this.doubleclick), this.element.removeEventListener("mousemove", this.mousemove), h.unsubscribe(k.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange), h.emit(A.POINT_DESTROYED, this);
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((s) => h.unsubscribe(t, s)), this.subscriptions[t] = [];
  }, this.addEventListener = (t, e) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const s = h.subscribe(t, (i) => {
      i.target && i.target.guid === this.guid && e(i);
    });
    return this.subscriptions[t].push(s), s;
  }, this.removeEventListener = (t, e) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(e), 1), h.unsubscribe(t, e);
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
  POINT_MOUSE_DOUBLE_CLICK: "dblclick",
  POINT_DELETE_REQUEST: "point_delete_request"
}, b = {
  TOP: 0,
  LEFT: 1,
  RIGHT: 2,
  BOTTOM: 3
};
function Ft(t) {
  this.rotateBox = t, this.subscriptions = {
    rotate: []
  }, this.initialAngle = 0, this.previousAngle = 0, this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    this.interceptEventsFromShape(), this.rotateBox.shape.points.forEach((e) => {
      e.mousemove = this.mousemove, e.mouseDownListener = e.addEventListener(A.POINT_DRAG_START, (s) => {
        this.onPointMouseDown(s), h.emit(a.POINT_DRAG_START, this.rotateBox, { point: e });
      }), e.mouseUpListener = e.addEventListener(A.POINT_DRAG_END, (s) => {
        this.onPointMouseUp(s), h.emit(a.POINT_DRAG_END, this.rotateBox, { point: e });
      });
    });
  }, this.interceptEventsFromShape = () => {
    a.getShapeMouseEvents().forEach((e) => {
      this.shapeEventListeners[e.name] = this.rotateBox.shape.addEventListener(e.name, (s) => {
        e.key === "SHAPE_MOVE_END" && (this.previousAngle = 0), h.emit(e.name, this.rotateBox, s);
      });
    });
  }, this.mousemove = (e) => {
    if (e.buttons !== 1) {
      h.emit(a.SHAPE_MOUSE_MOVE, this.rotateBox.shape, d(e, { clientX: e.clientX, clientY: e.clientY }));
      return;
    }
    const [s, i] = K(e, this.rotateBox.shape.root), [o, n] = this.rotateBox.shape.getCenter();
    let r = this.calcAngle(s, i, o, n);
    if (r === null)
      return;
    let p = r;
    this.previousAngle && (p -= this.previousAngle), this.previousAngle = r, h.emit(T.ROTATE_BOX_ROTATE, this.rotateBox, { angle: p });
  }, this.calcAngle = (e, s, i, o) => {
    const n = this.calcHypotenuse(e, s, i, o);
    if (n <= 0)
      return null;
    const r = this.calcCathetus(e, s, i, o), p = this.calcStartAngle(e, s, i, o);
    return Math.round(ot(Math.asin(r / n)) + p + this.initialAngle);
  }, this.calcHypotenuse = (e, s, i, o) => I(e, s, i, o), this.calcCathetus = (e, s, i, o) => {
    if (e <= i && s <= o)
      return I(e, s, e, o);
    if (e >= i && s <= o)
      return I(e, s, i, s);
    if (e >= i && s >= o)
      return I(e, s, e, o);
    if (e <= i && s >= o)
      return I(e, s, i, s);
  }, this.calcStartAngle = (e, s, i, o) => {
    if (e <= i && s <= o)
      return 0;
    if (e >= i && s <= o)
      return 90;
    if (e >= i && s >= o)
      return 180;
    if (e <= i && s >= o)
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
    this.rotateBox.shape.points.forEach((s) => s.setOptions({ visible: !1 }));
  }, this.onPointMouseUp = (e) => {
    this.rotateBox.shape.points.forEach((s) => {
      s.setOptions({ visible: !0 }), s.redraw();
    });
  }, this.addEventListener = (e, s) => {
    typeof this.subscriptions[e] > "u" && (this.subscriptions[e] = []);
    const i = h.subscribe(e, (o) => {
      o.target && o.target.shape && o.target.shape.guid === this.rotateBox.shape.guid && s(o);
    });
    return this.subscriptions[e].push(i), i;
  }, this.removeEventListener = (e, s) => {
    this.subscriptions[e] && typeof this.subscriptions[e] < "u" && this.subscriptions[e].splice(this.subscriptions[e].indexOf(s), 1), h.unsubscribe(e, s);
  }, this.destroy = () => {
    for (let e in this.subscriptions)
      this.subscriptions[e].forEach((i) => h.unsubscribe(e, i)), this.subscriptions[e] = [];
    Object.keys(this.shapeEventListeners).forEach(
      (e) => {
        this.rotateBox.removeEventListener(e, this.shapeEventListeners[e]);
      }
    ), this.rotateBox.shape.points.forEach((e) => {
      e.removeEventListener(A.POINT_DRAG_START, e.mouseDownListener), e.removeEventListener(A.POINT_DRAG_END, e.mouseUpListener);
    });
  };
}
const T = {
  ROTATE_BOX_ROTATE: "rotate"
};
function Wt(t) {
  this.resizeBox = t, this.subscriptions = {
    resize: []
  }, this.guid = U(), this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    h.subscribe(A.POINT_DRAG_MOVE, this.onPointDragMove), h.subscribe(A.POINT_DRAG_END, this.onPointDragMove), a.getShapeMouseEvents().forEach((e) => {
      this.shapeEventListeners[e.name] = this.resizeBox.shape.addEventListener(e.name, (s) => {
        h.emit(e.name, this.resizeBox, s);
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
    const s = this.resizeBox.getPosition();
    this.resizeBox.calcPosition();
    const i = this.resizeBox.getPosition();
    this.resizeBox.redraw(), h.emit(a.POINT_DRAG_END, this.resizeBox, d(e, { point: e.target })), h.emit(R.RESIZE_BOX_RESIZE, this.resizeBox, { oldPos: s, newPos: i });
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
  }, this.addEventListener = (e, s) => {
    typeof this.subscriptions[e] > "u" && (this.subscriptions[e] = []);
    const i = h.subscribe(e, (o) => {
      o.target && o.target.guid && o.target.guid === this.resizeBox.guid && s(o);
    });
    return this.subscriptions[e].push(i), i;
  }, this.removeEventListener = (e, s) => {
    this.subscriptions[e] && typeof this.subscriptions[e] < "u" && this.subscriptions[e].splice(this.subscriptions[e].indexOf(s), 1), h.unsubscribe(e, s);
  }, this.destroy = () => {
    for (let e in this.subscriptions)
      this.subscriptions[e].forEach((i) => h.unsubscribe(e, i)), this.subscriptions[e] = [];
    Object.keys(this.shapeEventListeners).forEach(
      (e) => {
        this.resizeBox.removeEventListener(e, this.shapeEventListeners[e]);
      }
    ), h.unsubscribe(A.POINT_DRAG_MOVE, this.onPointDragMove), h.unsubscribe(A.POINT_DRAG_END, this.onPointDragMove);
  };
}
const R = {
  RESIZE_BOX_RESIZE: "resize"
};
function Yt(t) {
  this.shape = t, this.subscriptions = {
    CONTAINER_BOUNDS_CHANGED: []
  }, this.run = () => (this.shape = t, this.setEventListeners(), this), this.setEventListeners = () => {
    h.subscribe(A.POINT_DESTROYED, this.onPointDestroyed), h.subscribe(A.POINT_ADDED, this.onPointAdded), h.subscribe(A.POINT_DRAG_MOVE, this.onPointDragMove), h.subscribe(A.POINT_DELETE_REQUEST, this.onPointDeleteRequest);
  }, this.setSvgEventListeners = () => {
    this.svg_mouseover = this.shape.svg.addEventListener("mouseover", (e) => {
      f.mouseover(d(e, { target: this.shape }));
    }), this.svg_mouseout = this.shape.svg.addEventListener("mouseout", (e) => {
      f.mouseout(d(e, { target: this.shape }));
    }), this.svg_mouseenter = this.shape.svg.addEventListener("mouseenter", (e) => {
      f.mouseenter(d(e, { target: this.shape }));
    }), this.svg_mousedown = this.shape.svg.addEventListener("mousedown", (e) => {
      f.mousedown(d(e, { target: this.shape }));
    }), this.svg_click = this.shape.svg.addEventListener("click", (e) => {
      f.click(d(e, { target: this.shape }));
    }), this.svg_dblclick = this.shape.svg.addEventListener("dblclick", (e) => {
      f.doubleclick(d(e, { target: this.shape }));
    });
  }, this.removeSvgEventListeners = () => {
    this.shape.svg.removeEventListener("mouseover", this.svg_mouseover), this.shape.svg.removeEventListener("mouseout", this.svg_mouseout), this.shape.svg.removeEventListener("mouseenter", this.svg_mouseenter), this.shape.svg.removeEventListener("mousedown", this.svg_mousedown), this.shape.svg.removeEventListener("click", this.svg_click), this.shape.svg.removeEventListener("dblclick", this.svg_dblclick);
  }, this.addResizeEventListener = () => {
    !this.shape.resizeBox || (this.resizeBoxListener = this.shape.resizeBox.addEventListener(R.RESIZE_BOX_RESIZE, this.onResize), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOVE_START, this.mousedown), this.resizeMouseMoveEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_MOVE, this.mousemove), this.resizeClickEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_CLICK, this.click), this.resizeDblClickEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_DOUBLE_CLICK, this.svg_dblclick), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_DOWN, this.svg_mousedown), this.resizeMouseOverEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_OVER, this.svg_mouseover), this.resizeMouseOutEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_OUT, this.svg_mouseout), this.resizeMouseUpEventListener = this.shape.resizeBox.addEventListener(a.SHAPE_MOUSE_UP, (e) => {
      h.emit(a.SHAPE_MOUSE_UP, this.shape, d(e));
    }), this.resizeBoxContextMenuEventListener = this.shape.resizeBox.shape.svg.addEventListener("contextmenu", (e) => {
      this.shape.contextMenu && this.shape.contextMenu.onEvent(e);
    }));
  }, this.addRotateEventListener = () => {
    !this.shape.rotateBox || (this.rotateBoxListener = this.shape.rotateBox.addEventListener(T.ROTATE_BOX_ROTATE, this.onRotate), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOVE_START, this.mousedown), this.rotateMouseMoveEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_MOVE, this.mousemove), this.rotateClickEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_CLICK, this.click), this.rotateDblClickEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_DOUBLE_CLICK, this.svg_dblclick), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_DOWN, this.svg_mousedown), this.rotateMouseUpEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_UP, (e) => {
      h.emit(a.SHAPE_MOUSE_UP, this.shape, d(e));
    }), this.rotateMouseOverEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_OVER, this.svg_mouseover), this.rotateMouseOutEventListener = this.shape.rotateBox.addEventListener(a.SHAPE_MOUSE_OUT, this.svg_mouseout), this.rotatePointDragStartEventListener = this.shape.rotateBox.addEventListener(a.POINT_DRAG_START, (e) => {
      this.shape.initCenter = this.shape.getCenter(this.shape.options.groupChildShapes);
    }), this.rotatePointDragEndEventListener = this.shape.rotateBox.addEventListener(a.POINT_DRAG_END, (e) => {
      this.shape.initCenter = null, this.shape.points.forEach((s) => {
        s.options.hidden || (s.element.style.display = "");
      });
    }), this.rotateBoxContextMenuEventListener = this.shape.rotateBox.shape.svg.addEventListener("contextmenu", (e) => {
      this.shape.contextMenu && this.shape.contextMenu.onEvent(e);
    }));
  }, this.onResize = (e) => {
    const s = this.shape.getRootParent(!0);
    if (s) {
      h.emit(R.RESIZE_BOX_RESIZE, s.resizeBox, { newPos: e.newPos, oldPos: e.oldPos });
      return;
    }
    const i = e.newPos.left - e.oldPos.left, o = e.newPos.top - e.oldPos.top;
    this.shape.moveBy(i, o);
    const [n, r] = this.shape.getMaxPointSize();
    this.shape.scaleTo(e.newPos.width - n * 2, e.newPos.height - r * 2), this.shape.redraw(), h.emit(R.RESIZE_BOX_RESIZE, this.shape, e);
  }, this.onRotate = (e) => {
    const s = this.shape.getRootParent(!0);
    if (s) {
      h.emit(T.ROTATE_BOX_ROTATE, s.rotateBox, { angle: e.angle });
      return;
    }
    this.shape.rotateBy(e.angle), this.shape.redraw(), h.emit(T.ROTATE_BOX_ROTATE, this.shape, e);
  }, this.mousedown = (e) => {
    X(e), h.emit(a.SHAPE_MOUSE_DOWN, this.shape, d(e)), setTimeout(() => {
      h.emit(
        a.SHAPE_MOVE_START,
        this.shape,
        d(e, { pos: this.shape.getPosition(this.shape.options.groupChildShapes) })
      );
    }, 100);
  }, this.mousemove = (e) => {
    if (this.shape.draggedPoint || h.emit(a.SHAPE_MOUSE_MOVE, this.shape, d(e)), this.shape.draggedPoint) {
      h.emit(a.POINT_DRAG_MOVE, this.shape, { point: this.shape.draggedPoint }), this.shape.draggedPoint.mousemove(e);
      return;
    }
    if (!this.shape.options.canDragShape)
      return;
    const [s, i] = this.calcMovementOffset(e);
    if (s === null || i === null)
      return;
    const o = this.shape.getPosition(this.shape.options.groupChildShapes);
    this.shape.moveBy(s, i), this.shape.redraw();
    const n = this.shape.getPosition(this.shape.options.groupChildShapes);
    h.emit(a.SHAPE_MOVE, this.shape, d(e, { oldPos: o, newPos: n }));
  }, this.mouseenter = (e) => {
    h.emit(a.SHAPE_MOUSE_ENTER, this.shape, d(e));
  }, this.mouseover = (e) => {
    f.draggedShape !== this.shape && h.emit(a.SHAPE_MOUSE_OVER, this.shape, d(e));
  }, this.mouseout = (e) => {
    h.emit(a.SHAPE_MOUSE_OUT, this.shape, d(e));
  }, this.click = (e) => {
    h.emit(a.SHAPE_MOUSE_CLICK, this.shape, d(e));
  }, this.doubleclick = (e) => {
    h.emit(a.SHAPE_MOUSE_DOUBLE_CLICK, this.shape, d(e));
  }, this.calcMovementOffset = (e) => {
    this.shape.calcPosition();
    const s = this.shape.getPosition(this.shape.options.groupChildShapes);
    let i = e.movementX, o = e.movementY, n = e.clientX + window.scrollX, r = e.clientY + window.scrollY;
    const p = s.left + i, l = s.top + o, g = D(this.shape.root, !0), c = this.shape.getBounds();
    return (p < c.left || p + s.width > c.right) && (i = 0), (l < c.top || l + s.height > c.bottom) && (o = 0), n < p + g.left && (i = n - (p + g.left)), r < l + g.top && (o = r - (l + g.top)), n > p + s.width + g.left && (i = n - (s.width + g.left + s.left)), r > l + s.height + g.right && (o = r - (s.height + g.top + s.top)), [i, o];
  }, this.onPointAdded = (e) => {
    !this.shape.isShapePoint(e.target) || h.emit(a.POINT_ADDED, this.shape, { point: e.target });
  }, this.onPointDragMove = (e) => {
    this.shape.isShapePoint(e.target) && this.shape.redraw();
  }, this.onPointDestroyed = (e) => {
    if (!!this.shape.isShapePoint(e.target)) {
      this.shape.points.splice(this.shape.points.indexOf(e.target), 1);
      try {
        this.shape.root.removeChild(e.target.element), this.shape.redraw();
      } catch {
      }
      h.emit(a.POINT_DESTROYED, this.shape, { point: e.target });
    }
  }, this.onPointDeleteRequest = (e) => {
    !this.shape.isShapePoint(e.target) || this.shape.deletePoint(e.target.x, e.target.y);
  }, this.addEventListener = (e, s) => {
    typeof this.subscriptions[e] > "u" && (this.subscriptions[e] = []);
    const i = h.subscribe(e, (o) => {
      o.target && o.target.guid === this.shape.guid && s(o);
    });
    return this.subscriptions[e].push(i), i;
  }, this.removeEventListener = (e, s) => {
    this.subscriptions[e] && typeof this.subscriptions[e] < "u" && this.subscriptions[e].splice(this.subscriptions[e].indexOf(s), 1), h.unsubscribe(e, s);
  }, this.destroy = () => {
    h.unsubscribe(A.POINT_ADDED, this.onPointAdded), h.unsubscribe(A.POINT_DRAG_MOVE, this.onPointDragMove), h.unsubscribe(A.POINT_DESTROYED, this.onPointDestroyed), h.unsubscribe(A.POINT_DELETE_REQUEST, this.onPointDeleteRequest), this.shape.resizeBox && (this.shape.resizeBox.removeEventListener(R.RESIZE_BOX_RESIZE, this.resizeBoxListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_CLICK, this.resizeClickEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_MOVE, this.resizeMouseMoveEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOVE_START, this.resizeMouseDownEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_UP, this.resizeMouseUpEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_DOUBLE_CLICK, this.resizeDblClickEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_OVER, this.resizeMouseOverEventListener), this.shape.resizeBox.removeEventListener(a.SHAPE_MOUSE_OUT, this.resizeMouseOutEventListener), this.shape.resizeBox.removeEventListener("contextmenu", this.resizeBoxContextMenuEventListener)), this.shape.rotateBox && (this.shape.rotateBox.removeEventListener(T.ROTATE_BOX_ROTATE, this.rotateBoxListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_CLICK, this.rotateClickEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_MOVE, this.rotateMouseMoveEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOVE_START, this.rotateMouseDownEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOVE_START, this.rotatePointDragStartEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOVE_START, this.rotatePointDragEndEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_UP, this.rotateMouseUpEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_DOUBLE_CLICK, this.rotateDblClickEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_OVER, this.rotateMouseOverEventListener), this.shape.rotateBox.removeEventListener(a.SHAPE_MOUSE_OUT, this.rotateMouseOutEventListener), this.shape.rotateBox.removeEventListener("contextmenu", this.rotateBoxContextMenuEventListener));
    for (let e in this.subscriptions)
      this.subscriptions[e].forEach((i) => h.unsubscribe(e, i)), this.subscriptions[e] = [];
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
  getShapeMouseEvents: () => Object.keys(a).filter((t) => ["SHAPE_CREATE", "SHAPE_DESTROY", "SHAPE_RESIZE", "SHAPE_ROTATE"].indexOf(t) === -1 && typeof a[t] != "function").map((t) => ({ key: t, name: a[t] }))
};
function Qt() {
  this.draw = (t) => {
    if (t.svg)
      try {
        t.eventListener.removeSvgEventListeners(), t.svg.innerHTML = "";
      } catch {
      }
    else
      t.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), t.svg.ondragstart = function() {
        return !1;
      }, t.options.visible && h.emit(a.SHAPE_SHOW, t), t.eventListener.setSvgEventListeners(), t.root.appendChild(t.svg);
    if (t.points.length < 1)
      return;
    t.contextMenu || t.updateContextMenu(), this.updateOptions(t);
    const e = this.drawPolygon(t);
    t.svg.appendChild(e);
  }, this.updateOptions = (t) => {
    if (!t.svg || typeof t.svg > "u")
      return;
    typeof t.options.visible < "u" && (t.svg.style.display !== t.options.visible && (t.options.visible ? h.emit(a.SHAPE_SHOW, t) : h.emit(a.SHAPE_HIDE, t)), t.svg.style.display = t.options.visible ? "" : "none"), t.calcPosition(), t.svg.id = t.options.id, t.svg.style.position = "absolute", t.svg.style.cursor = "default", t.svg.style.left = t.left + "px", t.svg.style.top = t.top + "px", t.svg.setAttribute("width", t.width), t.svg.setAttribute("height", t.height), t.svg.setAttribute("guid", t.guid), this.setupShapeFill(t), this.setupSVGFilters(t), t.svg.style.zIndex = t.options.zIndex;
    const e = t.getRootParent(!0);
    this.updatePoints(t, e), this.redrawResizeBox(e || t), this.redrawRotateBox(e || t);
  }, this.updatePoints = (t, e) => {
    t.points.forEach((s) => {
      s.element.parentNode !== t.root && t.root.appendChild(s.element), s.options.zIndex < t.options.zIndex + 2 && (s.options.zIndex = t.options.zIndex + 2), t.options.visible || (s.options.visible = !1), s.redraw(), t.options.displayMode === u.DEFAULT && !s.options.forceDisplay && (!e || e.options.displayMode === u.DEFAULT) && (s.element.style.display = "none");
    });
  }, this.drawPolygon = (t) => {
    let e = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    t.points.length > 2 && (e = document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
    const s = t.points.map((i) => "" + (i.x - t.left) + "," + (i.y - t.top)).join(" ");
    return e.setAttribute("points", s), this.setupPolygonFill(t, e), this.setupPolygonStyles(t, e), t.svg.querySelector("defs") && t.svg.querySelector("defs").querySelector("filter") && (e.style.filter = 'url("#' + t.guid + '_filter")'), e.style.zIndex = t.options.zIndex, e;
  }, this.redrawResizeBox = (t) => {
    if (!t.resizeBox)
      return;
    const e = t.getResizeBoxBounds();
    t.resizeBox.left = e.left, t.resizeBox.top = e.top, t.resizeBox.width = e.width, t.resizeBox.height = e.height, t.resizeBox.options.zIndex = t.options.zIndex + 1, t.resizeBox.redraw();
  }, this.redrawRotateBox = (t) => {
    if (!t.rotateBox)
      return;
    const e = t.getResizeBoxBounds();
    t.rotateBox.left = e.left, t.rotateBox.top = e.top, t.rotateBox.width = e.width, t.rotateBox.height = e.height, t.rotateBox.options.zIndex = t.options.zIndex + 1, t.rotateBox.redraw();
  }, this.setupShapeFill = (t) => {
    const e = t.options.style.fill || "none";
    let s = t.svg.querySelector("defs");
    if (e === "#image" && t.options.fillImage && typeof t.options.fillImage == "object") {
      const i = this.createImageFill(t);
      i && (s || (s = document.createElementNS(t.svg.namespaceURI, "defs")), s.appendChild(i), t.svg.appendChild(s));
    } else if (e === "#gradient" && t.options.fillGradient && typeof t.options.fillGradient == "object" && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1) {
      const i = this.createGradient(t);
      i && (s || (s = document.createElementNS(t.svg.namespaceURI, "defs")), s.appendChild(i), t.svg.appendChild(s));
    }
  }, this.createGradient = (t) => {
    let e = document.createElementNS(t.svg.namespaceURI, "linearGradient");
    const s = t.options.fillGradient;
    s.type === "radial" && (e = document.createElementNS(t.svg.namespaceURI, "radialGradient")), e.id = t.guid + "_gradient";
    let i = !1;
    for (let o in s)
      if (o !== "type") {
        if (o === "steps") {
          i = !0;
          continue;
        }
        e.setAttribute(o, s[o]);
      }
    if (!i)
      return e;
    for (let o of s.steps) {
      const n = document.createElementNS(t.svg.namespaceURI, "stop");
      E(o.stopColor) && n.setAttribute("offset", o.offset), E(o.stopColor) && n.setAttribute("stop-color", o.stopColor), E(o.stopOpacity) && n.setAttribute("stop-opacity", o.stopOpacity), e.appendChild(n);
    }
    return e;
  }, this.createImageFill = (t) => {
    const e = t.options.fillImage;
    if (!e.href || !e.width || !e.height)
      return console.error("Image HREF, width and height must be specified for Image Fill"), null;
    const s = document.createElementNS(t.svg.namespaceURI, "pattern");
    s.setAttribute("id", t.guid + "_pattern"), s.setAttribute("patternUnits", "userSpaceOnUse");
    for (let o in e)
      o !== "href" && s.setAttribute(o, e[o]);
    const i = document.createElementNS(t.svg.namespaceURI, "image");
    return e.href && i.setAttribute("href", e.href), i.setAttribute("width", e.width), i.setAttribute("height", e.height), s.appendChild(i), s;
  }, this.setupSVGFilters = (t) => {
    if (t.options.filters && typeof t.options.filters == "object" && Object.keys(t.options.filters).length) {
      let e = t.svg.querySelector("defs");
      e || (e = document.createElementNS(t.svg.namespaceURI, "defs"), t.svg.appendChild(e));
      const s = this.createSVGFilters(t);
      e.append(s);
    }
  }, this.createSVGFilters = (t) => {
    const e = document.createElementNS(t.svg.namespaceURI, "filter");
    e.setAttribute("id", t.guid + "_filter");
    for (let s in t.options.filters) {
      const i = this.createSVGFilter(t, s, t.options.filters[s]);
      e.appendChild(i);
    }
    return e;
  }, this.createSVGFilter = (t, e, s) => {
    const i = document.createElementNS(t.svg.namespaceURI, e);
    for (let o in s)
      i.setAttribute(o, s[o].toString()), o === "dx" && t.svg.setAttribute("width", (t.width + parseInt(s.dx) * 2).toString()), o === "dy" && t.svg.setAttribute("height", (t.height + parseInt(s.dy) * 2).toString());
    return i;
  }, this.setupPolygonFill = (t, e) => {
    const s = t.options.style.fill || "none";
    s === "#image" && t.options.fillImage && typeof t.options.fillImage == "object" ? e.setAttribute("fill", 'url("#' + t.guid + '_pattern")') : s === "#gradient" && t.options.fillGradient && typeof t.options.fillGradient == "object" && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1 && e.setAttribute("fill", 'url("#' + t.guid + '_gradient")');
  }, this.setupPolygonStyles = (t, e) => {
    if (t.options.classes && e.setAttribute("class", t.options.classes), !(!E(t.options.style) || typeof t.options.style != "object"))
      for (let s in t.options.style)
        e.style[s] = t.options.style[s];
  }, this.toSvg = (t, e = null) => {
    const s = document.createElement("div"), i = this.getSvg(t, e);
    return s.appendChild(i), '<?xml version="1.0" encoding="UTF-8"?>' + s.innerHTML.replace(/&quot;/g, "'");
  }, this.getSvg = (t, e) => {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg"), i = t.getPosition(e === null ? t.options.groupChildShapes : e);
    s.appendChild(this.getSvgDefs(t, e)), t.svg || this.draw(t), this.addSvgPolygons(t, s, e), s.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const o = "0 0 " + i.width + " " + i.height;
    return s.setAttribute("viewBox", o), s;
  }, this.getSvgDefs = (t, e = null) => {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    if (t.svg || t.redraw(), t.svg) {
      const i = t.svg.querySelector("defs");
      i && (s.innerHTML = i.innerHTML);
    }
    return (e === !0 || t.options.groupChildShapes && e !== !1) && t.getChildren(!0).forEach((i) => {
      if (i.svg || i.redraw(), i.svg) {
        const o = i.svg.querySelector("defs");
        o && (s.innerHTML += o.innerHTML);
      }
    }), s;
  }, this.addSvgPolygons = (t, e, s) => {
    const i = t.getPosition(s || t.options.groupChildShapes), o = [];
    if (t.svg || t.redraw(), t.svg) {
      let n = t.svg.querySelector("polygon");
      if (n) {
        n = n.cloneNode();
        const r = t.points.map(
          (p) => "" + (p.x - i.left) + "," + (p.y - i.top)
        ).join(" ");
        n.setAttribute("points", r), o.push({ polygon: n, zIndex: t.options.zIndex });
      }
    }
    if ((s === !0 || t.options.groupChildShapes && s !== !1) && t.getChildren(!0).forEach((n) => {
      if (n.svg || n.redraw(), !n.svg)
        return;
      let r = n.svg.querySelector("polygon");
      if (r) {
        r = r.cloneNode();
        const p = n.points.map(
          (l) => "" + (l.x - i.left) + "," + (l.y - i.top)
        ).join(" ");
        r.setAttribute("points", p), o.push({ polygon: r, zIndex: n.options.zIndex });
      }
    }), !!o.length) {
      o.sort((n, r) => n.zIndex - r.zIndex);
      for (let n of o)
        e.appendChild(n.polygon);
    }
  }, this.toPng = (t, e = V.DATAURL, s = null, i = null, o = null) => new Promise(async (n) => {
    t.calcPosition();
    const r = t.getPosition(o || t.options.groupChildShapes);
    [s, i] = Z(s, i, r.width, r.height);
    const p = this.getSvg(t, o);
    p.setAttribute("width", r.width), p.setAttribute("height", r.height);
    for (let S of p.querySelectorAll("image"))
      if (S.getAttribute("href") && S.getAttribute("href").length) {
        const O = await Y(await (await fetch(S.getAttribute("href"))).blob());
        S.setAttribute("href", O);
      }
    const l = document.createElement("div");
    l.appendChild(p);
    const g = l.innerHTML, c = new Image(), x = new Blob([g], { type: "image/svg+xml" }), N = window.URL || window.webkitURL || window, P = await Y(x);
    c.addEventListener("load", () => {
      const S = document.createElement("canvas");
      c.width = r.width, c.height = r.height, S.width = c.width, S.height = c.height;
      const O = S.getContext("2d");
      O.drawImage(c, 0, 0), O.scale(s, i), N.revokeObjectURL(P);
      const F = S.toDataURL("image/png");
      if (e === V.BLOB) {
        n(mt(F));
        return;
      }
      n(F);
    }), c.src = P;
  });
}
const V = {
  DATAURL: "dataurl",
  BLOB: "blob"
}, C = new Qt(), Zt = (t, e, s) => {
  if (!e || !E(e.features) || !e.features.length)
    return null;
  const i = [];
  for (let o in e.features) {
    const n = e.features[o], r = Jt(n, o, s, t);
    (E(s.width) || E(s.height)) && r.scaleTo(s.width, s.height, !0), r && i.push(r);
  }
  return i;
}, Jt = (t, e, s, i) => {
  if (!Xt(t))
    return;
  let o = Kt(t, e, s);
  o.visible = !1;
  const n = qt(t);
  let r = null;
  for (let p in n) {
    const l = m({}, o);
    p == 0 ? r = f.createShape(i, l, n[p]) : (l.id += "_" + p, l.name += " " + p, r.addChild(f.createShape(i, l, n[p])));
  }
  return r;
}, Xt = (t) => {
  if (!E(t.properties) || typeof t.properties != "object")
    return !1;
  const e = t.geometry;
  return !(!E(e) || typeof e != "object" || ["Polygon", "MultiPolygon"].indexOf(e.type) === -1 || !E(e.coordinates) || typeof e.coordinates != "object" || !e.coordinates.length);
}, Kt = (t, e, s) => {
  const i = {};
  if (i.name = t.properties[s.nameField] || "Shape " + e, i.id = t.properties[s.idField] || "shape_" + e, E(s.options) && typeof s.options == "object")
    for (let o in s.options)
      i[o] = s.options[o];
  return i;
}, qt = (t) => {
  let e = t.geometry.coordinates;
  t.geometry.type === "Polygon" && (e = [e]);
  let s = 999999, i = 999999, o = 0;
  for (let r of e) {
    const p = r[0];
    for (let l of p)
      o = z(l[0]) > o ? z(l[0]) : o, o = z(l[1]) > o ? z(l[0]) : o, s = l[0] < s ? l[0] : s, i = l[1] < i ? l[1] : i;
  }
  const n = [];
  for (let r of e) {
    const p = r[0];
    for (let l of p)
      l[0] -= s, l[0] *= Math.pow(10, o), l[1] -= i, l[1] *= Math.pow(10, o);
    n.push(p);
  }
  return n;
}, z = (t) => {
  let e = t.toString().split(".");
  return e[1] ? e[1].length : 0;
};
function $t() {
  this.shapes = {}, this.visibleShapes = {}, this.activeShape = null, this.draggedShape = null, this.shapeOnCursor = null, this.containerEventListeners = [], this.init = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    h.subscribe(a.SHAPE_CREATE, this.onShapeCreated), h.subscribe(a.SHAPE_DESTROY, this.onShapeDestroy), h.subscribe(a.SHAPE_SHOW, this.onShapeShow), h.subscribe(a.SHAPE_HIDE, this.onShapeHide), h.subscribe(a.SHAPE_MOVE_START, this.onShapeMoveStart), h.subscribe(a.SHAPE_MOUSE_ENTER, this.onShapeMouseEnter), h.subscribe(A.POINT_DRAG_START, this.onPointDragStart), h.subscribe(A.POINT_DRAG_END, this.onPointDragEnd), window.addEventListener("resize", this.onWindowResize);
  }, this.onWindowResize = (t) => {
    for (let e in this.shapes) {
      const s = this.shapes[e];
      h.emit(
        k.CONTAINER_BOUNDS_CHANGED,
        s,
        { bounds: s.getBounds(), points: s.points }
      );
    }
  }, this.createShape = (t, e, s) => new B().init(t, e, s), this.onShapeCreated = (t) => {
    const e = t.target;
    E(e.root) && !this.getShape(e) && typeof e.belongsToShape == "function" && (this.addShape(e), this.activeShape || (this.activeShape = e));
  }, this.addShape = (t) => {
    this.shapes[t.guid] = t, t.options.visible && this.isNormalShape(t) && (this.visibleShapes[t.guid] = t), this.getShapesByContainer(t.root).length === 1 && this.addContainerEvents(t);
  }, this.onShapeDestroy = (t) => {
    const e = t.target;
    delete this.shapes[e.guid];
    const s = e.root;
    !E(e.root) || this.getShapesByContainer(s).length === 0 && this.containerEventListeners.filter((i) => i.container === s).forEach((i) => {
      i.container.removeEventListener(i.name, i.listener), this.containerEventListeners.splice(this.containerEventListeners.indexOf(i), 1);
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
      const s = e.getRootParent(!0);
      s && s.options.groupChildShapes && (this.draggedShape = s), this.draggedShape.draggedPoint = t.target, h.emit(a.POINT_DRAG_START, e, { point: t.target });
    }
  }, this.onPointDragEnd = (t) => {
    this.draggedShape && (this.draggedShape.draggedPoint = null), this.draggedShape = null;
  }, this.getShape = (t) => this.getShapeByGuid(t.guid), this.findShapeByPoint = (t) => {
    for (let e in this.shapes) {
      const s = this.shapes[e];
      if (s.isShapePoint(t))
        return s;
    }
    return null;
  }, this.getShapeByGuid = (t) => E(this.shapes[t]) ? this.shapes[t] : null, this.getShapesByContainer = (t) => {
    const e = [];
    for (let s in this.shapes) {
      const i = this.shapes[s];
      this.isNormalShape(i) && i.root === t && e.push(i);
    }
    return e;
  }, this.getMaxZIndex = (t = null) => {
    let e;
    return t ? e = this.getShapesByContainer(t) : e = this.getShapes(), e.length ? e.map((s) => s.options.zIndex || 0).reduce((s, i) => i > s ? i : s) : 0;
  }, this.getShapes = () => {
    const t = [];
    for (let e in this.shapes) {
      const s = this.shapes[e];
      this.isNormalShape(s) && t.push(s);
    }
    return t;
  }, this.isNormalShape = (t) => t.options.id.search("_resizebox") === -1 && t.options.id.search("_rotatebox") === -1 && typeof t.belongsToShape == "function", this.activateShape = (t, e = null) => {
    if (this.activeShape === t) {
      this.activeShape.switchDisplayMode(e);
      return;
    }
    if (!(typeof t.id < "u" && (t.id.search("_resizebox") !== -1 || t.id.search("_rotatebox") !== -1))) {
      if (this.activeShape && this.deactivateShape(this.activeShape), t.options.moveToTop) {
        const i = this.getMaxZIndex(t.root) + 1 - t.options.zIndex;
        t.options.prevZIndex = t.options.zIndex, t.options.zIndex += i, C.updateOptions(t), t.options.groupChildShapes && t.getChildren(!0).forEach((o) => {
          o.options.prevZIndex = o.options.zIndex, o.options.zIndex += i, C.updateOptions(o);
        });
      }
      this.activeShape = t, h.emit(a.SHAPE_ACTIVATED, this.activeShape), this.activeShape.switchDisplayMode(e);
    }
  }, this.deactivateShape = (t) => {
    typeof t.options.prevZIndex < "u" && C.updateOptions(t), t.options.displayMode !== u.DEFAULT && t.switchDisplayMode(u.DEFAULT), t.getChildren(!0).forEach((e) => {
      typeof e.options.prevZIndex < "u" && (C.updateOptions(e), e.options.displayMode !== u.DEFAULT && e.switchDisplayMode(u.DEFAULT));
    });
  }, this.addContainerEvents = (t) => {
    this.addContainerEvent(t.root, "mousemove", this.mousemove), this.addContainerEvent(t.root, "mouseup", this.mouseup, t.options.id), this.addContainerEvent(t.root, "dblclick", this.doubleclick), h.emit(te.MANAGER_ADD_CONTAINER_EVENT_LISTENERS, t.root);
  }, this.addContainerEvent = (t, e, s) => {
    this.containerEventListeners.find((i) => i.container === t && i.name === e) || (t.addEventListener(e, s), this.containerEventListeners.push({ id: t.id, container: t, name: e, listener: s }));
  }, this.doubleclick = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.doubleclick(d(t, { target: this.shapeOnCursor }));
    try {
      t.stopPropagation();
    } catch {
    }
    if (!this.activeShape || !this.activeShape.options.canAddPoints || this.activeShape.draggedPoint || this.activeShape.points.length > 2 || this.activeShape.points.length === this.activeShape.options.maxPoints)
      return;
    this.activeShape.options.displayMode === u.DEFAULT && this.activeShape.switchDisplayMode(u.SELECTED);
    const [e, s] = K(d(t, { target: this.activeShape }));
    this.activeShape.addPoint(e, s, { forceDisplay: !1 });
  }, this.mousedown = (t) => {
    if (this.shapeOnCursor && t.buttons !== 2) {
      const e = this.shapeOnCursor.getRootParent(!0);
      e && e.options.groupChildShapes && (this.shapeOnCursor = e), this.draggedShape = this.shapeOnCursor, this.shapeOnCursor.eventListener.mousedown(d(t, { target: this.shapeOnCursor }));
    }
  }, this.mouseup = (t) => {
    if (!this.draggedShape)
      return;
    const e = this.draggedShape;
    t.buttons === 1 && e.options.canAddPoints && !e.draggedPoint && (e.options.maxPoints === -1 || e.points.length < e.options.maxPoints) && e.addPoint(
      t.clientX - e.root.offsetLeft,
      t.clientY - e.root.offsetTop
    ), e.draggedPoint ? (h.emit(a.POINT_DRAG_END, this.draggedShape, { point: e.draggedPoint }), e.draggedPoint.mouseup(t), e.draggedPoint = null) : h.emit(a.SHAPE_MOUSE_UP, e, {}), this.draggedShape = null, h.emit(a.SHAPE_MOVE_END, e, { pos: e.getPosition(!0) });
  }, this.mousemove = (t) => {
    if (t.buttons !== 1 && (this.draggedShape && (this.draggedShape.draggedPoint = null), this.draggedShape = null), !this.draggedShape) {
      this.processShapesUnderCursor(t);
      return;
    }
    this.draggedShape && this.draggedShape.eventListener.mousemove(t);
  }, this.mouseover = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseover(d(t, { target: this.shapeOnCursor }));
  }, this.mouseenter = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseenter(d(t, { target: this.shapeOnCursor }));
  }, this.mouseout = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseout(d(t, { target: t.target }));
  }, this.click = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.click(d(t, { target: this.shapeOnCursor }));
  }, this.processShapesUnderCursor = (t) => {
    const [e, s] = [t.clientX, t.clientY], i = this.getShapeOnCursor(e, s);
    this.shapeOnCursor && this.shapeOnCursor !== i && this.shapeOnCursor.svg && (this.shapeOnCursor.svg.style.cursor = "default", this.shapeOnCursor.eventListener.mouseout(d(t, { target: this.shapeOnCursor }))), i && i !== this.shapeOnCursor && i.eventListener.mouseover(d(t, { target: i })), this.shapeOnCursor = i, this.shapeOnCursor && (h.emit(a.SHAPE_MOUSE_MOVE, this.shapeOnCursor, d(t)), this.shapeOnCursor.svg.style.cursor = "crosshair");
  }, this.getShapeOnCursor = (t, e) => {
    const s = Object.values(this.visibleShapes);
    if (!s.length)
      return null;
    const i = s.filter((o) => o.belongsToShape(t, e));
    return i.length ? i.reduce((o, n) => n.options.zIndex >= o.options.zIndex ? n : o) : null;
  }, this.toJSON = (t = null, e = !1) => (t || (t = this.getShapes()), t = t.filter((s) => !s.getParent()), JSON.stringify(t.map((s) => s.getJSON(!0, e)))), this.fromJSON = (t, e, s = null, i = !0) => {
    let o = e;
    if (typeof o == "string" && (o = G(e)), !o || !o.length)
      return null;
    const n = [];
    for (let r in o) {
      const p = o[r];
      p.options.id && this.findShapeById(p.options.id) || (n.push(new B().fromJSON(t, p, !0, i)), s && typeof s == "function" && s(r / o.length));
    }
    return n;
  }, this.findShapesByOptionValue = (t, e) => this.getShapes().filter((s) => s.options[t] === e), this.findShapeById = (t) => {
    const e = this.findShapesByOptionValue("id", t);
    return e && e.length ? e[0] : null;
  }, this.findShapeByName = (t) => {
    const e = this.findShapesByOptionValue("name", t);
    return e && e.length ? e[0] : null;
  }, this.clear = () => {
    for (this.containerEventListeners.forEach(({ container: t, name: e, listener: s }) => {
      try {
        t.removeEventListener(e, s);
      } catch (i) {
        console.error(i);
      }
    }), this.containerEventListeners = []; Object.values(this.shapes).length; )
      Object.values(this.shapes)[0].destroy();
  }, this.fromGeoJson = (t, e, s) => Zt(t, e, s), this.length = () => Object.values(this.shapes).length;
}
const te = {
  MANAGER_ADD_CONTAINER_EVENT_LISTENERS: "manager_add_container_event_listeners",
  MANAGER_REMOVE_CONTAINER_EVENT_LISTENERS: "manager_remove_container_event_listeners"
}, k = {
  CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
}, f = new $t().init();
function ee(t) {
  this.shape = t, this.children = [], this.parent = {}, this.init = () => {
    for (let e in this)
      typeof this[e] != "function" || e === "init" || (typeof this.shape[e] == "function" && (this.parent[e] = this.shape[e]), this.shape[e] = this[e]);
    return this;
  }, this.addChild = (e) => {
    !this.shouldAddChild(e) || (this.shape.options.displayMode !== e.options.displayMode && (e.svg ? e.switchDisplayMode(this.shape.options.displayMode) : e.options.displayMode = t.options.displayMode), this.children.push(e), h.emit(a.SHAPE_ADD_CHILD, this.shape, { child: e }));
  }, this.removeChild = (e) => {
    this.children.splice(this.children.indexOf(e), 1), h.emit(a.SHAPE_REMOVE_CHILD, this.shape, { child: e });
  }, this.removeAllChildren = (e) => {
    for (; this.getChildren(e).length; )
      this.removeChild(this.getChildren(e)[0]);
  }, this.getChildren = (e = !1) => {
    if (!e)
      return this.children;
    const s = [];
    s.push(...this.children);
    for (let i of s)
      s.push(...i.getChildren());
    return s;
  }, this.shouldAddChild = (e) => !e || typeof e != "object" || typeof e.getChildren > "u" || this.children.indexOf(e) !== -1 ? !1 : e === this.shape ? void 0 : e.getChildren().indexOf(this.shape) !== -1 || e.getParent() ? !1 : this.getParentsList().indexOf(e) === -1, this.getParent = () => {
    const e = f.getShapes();
    for (let s of e)
      if (s.getChildren().indexOf(this.shape) !== -1)
        return s;
    return null;
  }, this.getRootParent = (e = null) => {
    let s = this.getParentsList();
    return s.length ? (e !== null && (s = s.filter((i) => i.options.groupChildShapes === e)), s[s.length - 1]) : null;
  }, this.getParentsList = (e = []) => {
    const s = this.getParent();
    return s == null ? e : (e.push(s), s.getParentsList(e));
  }, this.getPosition = (e = !1) => {
    const s = this.parent.getPosition();
    if (!e)
      return s;
    let i = this.getChildren(!0);
    return i.push(this.shape), i = i.filter((o) => o.points.length), i.length && (s.left = i.map((o) => o.left).reduce((o, n) => n < o ? n : o), s.top = i.map((o) => o.top).reduce((o, n) => n < o ? n : o), s.right = i.map((o) => o.right).reduce((o, n) => n > o ? n : o), s.bottom = i.map((o) => o.bottom).reduce((o, n) => n > o ? n : o), s.width = s.right - s.left || 1, s.height = s.bottom - s.top || 1), s;
  };
}
function tt() {
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
  }, this.eventListener = null, this.left_top = null, this.left_bottom = null, this.right_top = null, this.right_bottom = null, this.init = (t, e, s, i, o, n = {}) => (this.left = parseInt(e), this.top = parseInt(s), this.width = parseInt(i), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new B().init(t, m({}, this.options.shapeOptions), []), h.emit(a.SHAPE_CREATE, this.shape, {}), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new Ft(this).run(), this.redraw(), this), this.setOptions = (t = {}) => {
    !t || typeof t != "object" || (this.options = m(this.options, t), this.options.shapeOptions.zIndex = this.options.zIndex || this.options.zIndex, this.options.shapeOptions.id = this.options.id ? this.options.id : this.options.id, this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + Ct + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + Bt + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + Mt + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + _t + "')" } });
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
    h.emit(a.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (t, e) => this.eventListener.addEventListener(t, e), this.removeEventListener = (t, e) => {
    this.eventListener.removeEventListener(t, e);
  };
}
function se(t) {
  this.shape = t, this.contextMenu = null, this.updateContextMenu = () => {
    if (this.shape.options.hasContextMenu && !this.contextMenu ? this.init() : this.shape.options.hasContextMenu || (this.contextMenu = null), this.shape.contextMenu = this.contextMenu, this.contextMenu) {
      const e = this.getMenuItems();
      for (let s of e)
        this.contextMenu.items.find((i) => i.id === s.id) || this.contextMenu.addItem(s.id, s.title, s.image);
    }
  }, this.init = () => {
    t.svg && (this.contextMenu = j.create([], t.svg), t.options.canAddPoints && this.contextMenu.addItem("i" + t.guid + "_add_point", "Add Point", Q), this.displayGroupItems(), this.setEventListeners());
  }, this.getMenuItems = () => {
    const e = [
      { id: "i" + t.guid + "_clone", title: "Clone", image: Ht },
      { id: "i" + t.guid + "_export_json", title: "Export to JSON", image: Nt },
      { id: "i" + t.guid + "_export_svg", title: "Export to SVG", image: zt },
      { id: "i" + t.guid + "_export_png", title: "Export to PNG", image: Vt },
      { id: "i" + t.guid + "_destroy", title: "Destroy", image: $ }
    ];
    return t.options.canAddPoints && e.push({ id: "i" + t.guid + "_add_point", title: "Add Point", image: Q }), e;
  }, this.setEventListeners = () => {
    this.setOnItemClickListener(), this.contextMenu.on("show", () => {
      this.displayGroupItems();
    });
  }, this.setOnItemClickListener = () => {
    let e, s;
    this.contextMenu.on("click", (i) => {
      switch (i.itemId) {
        case "i" + this.shape.guid + "_destroy":
          this.shape.destroy();
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
          s = this.shape.getRootParent(), e = s || this.shape, e.setOptions({ groupChildShapes: !0 }), e.switchDisplayMode(u.DEFAULT);
          break;
        case "i" + this.shape.guid + "_ungroup":
          s = this.shape.getRootParent(), e = s || this.shape, e.setOptions({ groupChildShapes: !1 }), e.switchDisplayMode(u.DEFAULT);
          break;
      }
    });
  }, this.displayGroupItems = () => {
    let e = this.shape.getRootParent() ? this.shape.getRootParent() : this.shape;
    if (!e.getChildren().length) {
      this.contextMenu.removeItem("i" + this.shape.guid + "_group"), this.contextMenu.removeItem("i" + this.shape.guid + "_ungroup");
      return;
    }
    e.options.groupChildShapes ? this.contextMenu.items.find((s) => s.id === "i" + this.shape.guid + "_ungroup") || (this.contextMenu.addItem("i" + this.shape.guid + "_ungroup", "Ungroup", Gt), this.contextMenu.removeItem("i" + this.shape.guid + "_group")) : this.contextMenu.items.find((s) => s.id === "i" + this.shape.guid + "_group") || (this.contextMenu.removeItem("i" + this.shape.guid + "_ungroup"), this.contextMenu.addItem("i" + this.shape.guid + "_group", "Group", kt));
  }, this.onAddPointClick = (e) => {
    if (this.shape.options.maxPoints !== -1 && this.shape.points.length >= this.shape.options.maxPoints)
      return;
    const [s, i] = q(this.shape.root, e.cursorX, e.cursorY);
    this.shape.addPoint(s, i), this.shape.options.displayMode === u.DEFAULT && this.shape.switchDisplayMode(u.SELECTED);
  }, this.onCloneClick = (e) => {
    let s = this.shape;
    const i = s.getRootParent();
    i && i.options.groupChildShapes && (s = i);
    const o = s.clone({}, s.options.groupChildShapes), n = o.getPosition(!0);
    o.moveTo(n.left + 5, n.top + 5), SmartShapeManager.activateShape(o);
    for (let r of o.getChildren(!0)) {
      const p = r.getParent();
      p && p.removeChild(r), s.addChild(r);
    }
  }, this.onExportJsonClick = (e) => {
    const i = this.shape.getRootParent() || this.shape, o = i.toJSON(i.options.groupChildShapes), n = new Blob([o]);
    this.saveToFile(n, this.getExportFileName("json"));
  }, this.onExportSvgClick = (e) => {
    const o = ((this.shape.options.groupChildShapes ? null : this.shape.getRootParent()) || this.shape).toSvg(), n = new Blob([o]);
    this.saveToFile(n, this.getExportFileName("svg"));
  }, this.onExportPngClick = async (e) => {
    const o = await ((this.shape.options.groupChildShapes ? null : this.shape.getRootParent()) || this.shape).toPng(V.BLOB);
    this.saveToFile(o, this.getExportFileName("png"));
  }, this.saveToFile = (e, s) => {
    const i = window.URL.createObjectURL(e), o = document.createElement("a");
    o.download = s, o.href = i, document.body.appendChild(o), o.click(), document.body.removeChild(o), window.URL.revokeObjectURL(i);
  }, this.getExportFileName = (e) => {
    const i = this.shape.getRootParent() || this.shape;
    return (i.options.id ? i.options.id : "shape") + "." + e;
  }, this.removeMenuEventListeners = () => {
    this.contextMenu.removeEventListener("show", this.onShowListener);
  }, this.destroyContextMenu = () => {
    this.removeMenuEventListeners(), this.contextMenu.destroy();
  };
}
function B() {
  this.root = null, this.points = [], this.svg = null, this.groupHelper = null, this.eventListener = new Yt(this), this.options = {
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
    pointOptions: {},
    zIndex: 1e3,
    bounds: { left: -1, top: -1, right: -1, bottom: -1 },
    visible: !0,
    displayMode: u.DEFAULT,
    managed: !0,
    minWidth: -1,
    minHeight: -1,
    maxWidth: -1,
    maxHeight: -1,
    hasContextMenu: !0,
    minPoints: 3,
    groupChildShapes: !0,
    moveToTop: !0,
    compactExport: !1
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = U(), this.resizeBox = null, this.rotateBox = null, this.initCenter = null, this.init = (t, e = null, s = null, i = !0) => {
    if (!t) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    if (f.getShape(this)) {
      console.error("This shape already initialized");
      return;
    }
    return this.root = t, this.root.style.position = "relative", Object.assign(this, new se(this)), this.setOptions(e), this.groupHelper = new ee(this).init(), s && s.length && (this.setupPoints(s, m({}, this.options.pointOptions)), this.redraw()), this.eventListener.run(), typeof this.updateContextMenu == "function" && this.updateContextMenu(), i && this.applyDisplayMode(), (s && s.length || this.options.forceCreateEvent) && h.emit(a.SHAPE_CREATE, this, {}), this;
  }, this.setOptions = (t) => {
    !t || typeof t != "object" || (E(t.visible) && t.visible !== this.options.visible && (this.points.forEach((e) => e.options.visible = t.visible), this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: t.visible } }), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: t.visible } })), E(t.fillGradient) && (this.options.fillGradient = {}), E(t.fillImage) && (this.options.fillImage = {}), this.options = m(this.options, t), this.points.forEach((e) => {
      e.setOptions(m({}, this.options.pointOptions)), e.options.bounds = this.getBounds(), e.options.zIndex <= this.options.zIndex && (e.options.zIndex = this.options.zIndex + 1), e.redraw();
    }), typeof this.updateContextMenu == "function" && this.updateContextMenu());
  }, this.setupPoints = (t, e) => {
    this.points = [], this.addPoints(t, m({}, e)), this.calcPosition();
  }, this.addPoint = (t, e, s = null) => {
    let i = this.putPoint(t, e, m({}, s || this.options.pointOptions));
    return i ? (i = i.init(t, e, s), this.root.appendChild(i.element), i.updateContextMenu(), this.redraw(), this.options.hasContextMenu && !this.contextMenu && this.updateContextMenu(), i) : null;
  }, this.addPoints = (t, e = null) => {
    !t || typeof t != "object" || (t.forEach((s) => {
      const i = this.putPoint(
        s[0] + this.options.offsetX,
        s[1] + this.options.offsetY,
        m({}, e || this.options.pointOptions)
      );
      i && (i.init(i.x, i.y, e), this.root.appendChild(i.element), i.redraw());
    }), this.options.hasContextMenu && !this.contextMenu && this.updateContextMenu());
  }, this.putPoint = (t, e, s = {}) => {
    if (this.findPoint(t, e))
      return null;
    s.bounds = this.getBounds(), s.zIndex = this.options.zIndex + 1;
    const i = new jt();
    return i.x = t, i.y = e, i.setOptions(s), this.points.push(i), i;
  }, this.deleteAllPoints = () => {
    for (; this.points.length; )
      this.points[0].destroy();
  }, this.deletePoint = (t, e) => {
    if (this.points.length - 1 < this.options.minPoints)
      return;
    const s = this.findPoint(t, e);
    s && s.destroy();
  }, this.findPoint = (t, e) => {
    const s = this.points.find((i) => i.x === t && i.y === e);
    return typeof s > "u" || !s ? null : s;
  }, this.findPointById = (t) => {
    const e = this.points.find((s) => s.options.id === t);
    return typeof e > "u" || !e ? null : e;
  }, this.getPointsArray = () => {
    let t = [];
    return this.points && typeof this.points == "object" && this.points.length && (t = this.points.map((e) => [e.x, e.y])), t;
  }, this.moveTo = (t, e, s = !0) => {
    const i = this.getBounds(), o = this.getPosition(this.options.groupChildShapes);
    let n = t + o.width > i.right ? i.right - o.width : t, r = e + o.height > i.bottom ? i.bottom - o.height : e;
    this.moveBy(n - o.left, r - o.top, s), this.calcPosition();
  }, this.moveBy = (t, e, s = !0) => {
    for (let o in this.points)
      this.points[o].x += t, this.points[o].y += e, s && this.points[o].redraw();
    this.calcPosition();
    const i = this.getChildren();
    s && this.redraw(), i.length && this.options.groupChildShapes && i.forEach((o) => {
      o.moveBy(t, e, s);
    });
  }, this.scaleTo = (t = null, e = null, s = null) => {
    const i = this.getBounds();
    if (this.calcPosition(), !t && !e)
      return null;
    const o = this.getPosition(s || this.options.groupChildShapes);
    if (o.width === t && o.height === e)
      return;
    [t, e] = this.applyScaleRestriction(...Z(t, e, o.width, o.height)), o.width >= 10 && t < 10 && (t = 10), o.height >= 10 && e < 10 && (e = 10);
    let n = o.left + t > i.right && i.right !== -1 ? i.right - o.left : t, r = o.top + e > i.bottom && i.bottom !== -1 ? i.bottom - o.top : e, p = n / o.width, l = r / o.height;
    this.scaleBy(p, l, s);
  }, this.scaleBy = (t = null, e = null, s = null) => {
    const i = this.getPosition(s || this.options.groupChildShapes);
    this.points.forEach(
      (o) => {
        o.x = (o.x - i.left) * t + i.left, o.y = (o.y - i.top) * e + i.top;
      }
    ), (this.options.groupChildShapes || s) && (this.getChildren(!0).forEach((o) => {
      o.points.forEach(
        (n) => {
          n.x = (n.x - i.left) * t + i.left, n.y = (n.y - i.top) * e + i.top;
        }
      ), o.calcPosition();
    }), this.getChildren(!0).forEach((o) => o.redraw())), this.calcPosition();
  }, this.applyScaleRestriction = (t, e) => (this.options.minWidth !== -1 && t < this.options.minWidth && (t = this.options.minWidth), this.options.minWidth !== -1 && e < this.options.minHeight && (e = this.options.minHeight), this.options.minWidth !== -1 && t > this.options.maxWidth && (t = this.options.maxWidth), this.options.minWidth !== -1 && e > this.options.maxHeight && (e = this.options.maxHeight), [t, e]), this.rotateBy = (t, e = null, s = null, i = !1) => {
    this.calcPosition();
    const o = this.getPosition(this.options.groupChildShapes);
    let [n, r] = this.getCenter(this.options.groupChildShapes);
    const p = this.getRootParent(!0);
    p && p.options.groupChildShapes && ([n, r] = p.getCenter(p.options.groupChildShapes)), e || (e = n), s || (s = r), this.initCenter && ([e, s] = this.initCenter), !(i && (!this.isInBounds(...w(t, o.left, o.top, e, s)) || !this.isInBounds(...w(t, o.right, o.top, e, s)) || !this.isInBounds(...w(t, o.left, o.bottom, e, s)) || !this.isInBounds(...w(t, o.right, o.bottom, e, s)))) && (this.points.forEach((l) => l.rotateBy(t, e, s)), this.options.groupChildShapes && this.getChildren(!0).forEach((l) => {
      l.points.forEach((g) => g.rotateBy(t, e, s)), l.redraw();
    }));
  }, this.flip = (t, e, s) => {
    if (!t && !e)
      return;
    s = s || this.options.groupChildShapes, this.calcPosition();
    let i = s ? this.getChildren(!0) : null;
    i && i.forEach((n) => n.calcPosition());
    const o = this.getPosition(s);
    t && (this.points.forEach((n) => n.x = Math.abs(o.right - n.x) + o.left), i && i.forEach(
      (n) => n.points.forEach((r) => r.x = Math.abs(o.right - r.x) + o.left)
    )), e && (this.points.forEach((n) => n.y = Math.abs(o.bottom - n.y) + o.top), i && i.forEach(
      (n) => n.points.forEach((r) => r.y = Math.abs(o.bottom - r.y) + o.top)
    ));
  }, this.isInBounds = (t, e) => {
    const [s, i] = this.getMaxPointSize(), o = this.getBounds();
    return t >= o.left + s / 2 && t <= o.right - s / 2 && e >= o.top + i / 2 && e <= o.bottom - i / 2;
  }, this.redraw = () => {
    this.applyDisplayMode(), C.draw(this);
  }, this.applyDisplayMode = () => {
    this.options.displayMode === u.SCALE && this.options.canScale ? (this.rotateBox && this.rotateBox.hide(), !this.resizeBox && this.setupResizeBox(), this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : this.options.displayMode === u.ROTATE && this.options.canRotate ? (this.resizeBox && this.resizeBox.hide(), !this.rotateBox && this.setupRotateBox(), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : (this.resizeBox && this.resizeBox.hide(), this.rotateBox && this.rotateBox.hide()), this.points.forEach((t) => {
      t.setOptions({ zIndex: this.options.zIndex + 1 }), t.element.style.zIndex = t.options.zIndex, this.options.displayMode === u.DEFAULT && !t.options.forceDisplay && (t.element.style.display = "none");
    }), this.options.displayMode !== u.DEFAULT && this.options.groupChildShapes && this.getChildren(!0).forEach((t) => {
      t.points.forEach((e) => {
        e.options.visible && !e.options.hidden && e.options.canDrag && (e.element.style.display = "");
      });
    });
  }, this.switchDisplayMode = (t = null) => {
    t || (t = this.getNextDisplayMode()), (t === u.SCALE && !this.options.canScale || t === u.ROTATE && !this.options.canRotate || t === u.SELECTED && this.points.length && !this.points.filter((e) => e.options.canDrag).length) && (t = u.DEFAULT), this.options.displayMode = t, this.redraw(), t === u.DEFAULT && this.getChildren(!0).forEach((e) => e.switchDisplayMode(t));
  }, this.getNextDisplayMode = () => {
    let t;
    return this.options.displayMode === u.DEFAULT ? t = u.SELECTED : this.options.displayMode === u.SELECTED ? t = u.SCALE : this.options.displayMode === u.SCALE ? t = u.ROTATE : t = u.DEFAULT, t === u.SELECTED && !this.points.filter((e) => e.options.canDrag).length && (t = u.SCALE), t === u.SCALE && !this.options.canScale && (t = u.ROTATE), t === u.ROTATE && !this.options.canRotate && (t = u.DEFAULT), t;
  }, this.calcPosition = () => {
    !this.points.length || (this.left = this.points.map((t) => t.x).reduce((t, e) => e < t ? e : t), this.top = this.points.map((t) => t.y).reduce((t, e) => e < t ? e : t), this.right = this.points.map((t) => t.x).reduce((t, e) => e > t ? e : t), this.bottom = this.points.map((t) => t.y).reduce((t, e) => e > t ? e : t), this.width = parseInt(this.right - this.left) || 1, this.height = parseInt(this.bottom - this.top) || 1);
  }, this.getPosition = () => ({ top: this.top, left: this.left, bottom: this.bottom, right: this.right, width: parseInt(this.width), height: parseInt(this.height) }), this.getBounds = () => ({
    left: this.options.bounds.left !== -1 ? this.options.bounds.left : this.root.style.display === "none" ? -1 : this.root.clientLeft,
    top: this.options.bounds.top !== -1 ? this.options.bounds.top : this.root.style.display === "none" ? -1 : this.root.clientTop,
    right: this.options.bounds.right !== -1 ? this.options.bounds.right : this.root.style.display === "none" ? -1 : this.root.clientLeft + this.root.clientWidth,
    bottom: this.options.bounds.bottom !== -1 ? this.options.bounds.bottom : this.root.style.display === "none" ? -1 : this.root.clientTop + this.root.clientHeight
  }), this.isShapePoint = (t) => !!this.points.find((e) => e === t), this.belongsToShape = (t, e, s = !0) => {
    if (this.findPoint(t, e))
      return !0;
    let i = this.getPointsArray();
    return s && (i = i.map((o) => [o[0] + D(this.root).left, o[1] + D(this.root).top])), nt(i, [t, e]);
  }, this.addEventListener = (t, e) => this.eventListener.addEventListener(t, e), this.removeEventListener = (t, e) => {
    this.eventListener.removeEventListener(t, e);
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.getChildren(!0).forEach((t) => {
      t.setOptions({ visible: !0 }), t.redraw();
    }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.getChildren(!0).forEach((t) => {
      t.setOptions({ visible: !1 }), t.redraw();
    }), this.redraw();
  }, this.destroy = () => {
    for (; this.points.length > 0; )
      this.points[0].destroy();
    if (h.emit(a.SHAPE_DESTROY, this, {}), this.eventListener && this.eventListener.destroy(), this.resizeBox && this.resizeBox.destroy(), this.rotateBox && this.rotateBox.destroy(), this.root && this.svg)
      try {
        this.root.removeChild(this.svg);
      } catch {
      }
    this.options.groupChildShapes && this.getChildren(!0).forEach((e) => {
      e.destroy();
    }), this.contextMenu && this.destroyContextMenu();
    const t = this.getParent();
    t && t.removeChild(this);
  }, this.setupResizeBox = () => {
    if (!this.points.length)
      return null;
    const t = this.getResizeBoxBounds();
    return this.resizeBox = new et().init(this.root, t.left, t.top, t.width, t.height, {
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
    const t = this.getResizeBoxBounds();
    return this.rotateBox = new tt().init(this.root, t.left, t.top, t.width, t.height, {
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
    let t = this.getPosition(this.options.groupChildShapes);
    const e = this.getRootParent(!0);
    e && e.options.groupChildShapes && (e.calcPosition(), t = e.getPosition(e.options.groupChildShapes));
    const [s, i] = this.getMaxPointSize(), o = {
      left: t.left - s,
      right: t.right + s,
      top: t.top - i,
      bottom: t.bottom + i,
      width: t.width + s * 2,
      height: t.height + i * 2
    };
    o.left < 0 && (this.moveTo(o.left * -1, t.top, !1), o.left = 0), o.top < 0 && (this.moveTo(t.left, o.top * -1, !1), o.top = 0);
    const n = this.getBounds();
    return o.bottom > n.bottom && (this.moveTo(t.left, o.bottom - n.bottom + t.top, !1), o.bottom = n.bottom), o.right > n.right && (this.moveTo(o.right - n.right + t.left, t.top, !1), o.bottom = n.bottom), o;
  }, this.getMaxPointSize = () => {
    if (!this.points.length)
      return [0, 0];
    const t = this.points.map((s) => s.options.width).reduce((s, i) => Math.max(s, i)), e = this.points.map((s) => s.options.height).reduce((s, i) => Math.max(s, i));
    return [t, e];
  }, this.getCenter = (t = !1) => {
    const e = this.getPosition(t);
    return [e.left + e.width / 2, e.top + e.height / 2];
  }, this.toSvg = (t = null) => C.toSvg(this, t), this.toPng = (t = V.DATAURL, e = null, s = null, i = null) => C.toPng(this, t, e, s, i), this.toJSON = (t = !0, e = !1) => JSON.stringify(this.getJSON(t, e)), this.clone = (t = {}, e = !0) => {
    const s = m({}, this.getJSON(e));
    s.parent_guid = this.guid, s.options = m(s.options, t);
    const i = new B().fromJSON(this.root, s, e);
    return i ? (i.getChildren(!0).forEach((o) => {
      o.options.id += "_" + f.length(), o.options.name += " " + f.length();
    }), i) : null;
  }, this.getJSON = (t = !0, e = !1) => {
    const s = {
      options: m({}, this.options)
    };
    if (s.options.displayMode = u.DEFAULT, e || this.options.compactExport ? s.points = this.points.map((i) => [i.x, i.y]) : s.points = this.points.map((i) => i.getJSON()), t) {
      let i = this.getChildren();
      i.length && (s.children = i.map(
        (o) => o.getJSON(t, e || this.options.compactExport)
      ));
    }
    return s;
  }, this.fromJSON = (t, e, s = !0, i = !0) => {
    let o = typeof e == "string" ? G(e) : e;
    if (!o)
      return null;
    this.root = t, f.findShapeById(o.options.id) && (o.options.id += "_" + f.length(), o.options.name += " " + f.length()), this.svg ? this.setOptions(o.options) : this.init(t, o.options, null, !1), o.points.forEach((r) => {
      r.length ? this.putPoint(r[0], r[1]) : this.putPoint(r.x, r.y, r.options);
    });
    const n = f.getShapeByGuid(o.parent_guid);
    return f.addShape(this), s && typeof o.children < "u" && o.children && (this.getChildren(!0).forEach((r) => r.destroy()), o.children.forEach((r) => {
      r.parent_guid = this.guid, this.addChild(new B().fromJSON(t, r));
    })), i && h.emit(a.SHAPE_CREATE, this, { parent: n }), this;
  };
}
const u = {
  DEFAULT: "default",
  SELECTED: "selected",
  SCALE: "scale",
  ROTATE: "rotate"
};
function et() {
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
  }, this.eventListener = null, this.left_top = null, this.left_center = null, this.left_bottom = null, this.center_top = null, this.center_bottom = null, this.right_top = null, this.right_center = null, this.right_bottom = null, this.init = (t, e, s, i, o, n = {}) => (this.left = parseInt(e), this.top = parseInt(s), this.width = parseInt(i), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new B().init(t, m({}, this.options.shapeOptions), []), h.emit(a.SHAPE_CREATE, this.shape, {}), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new Wt(this).run(), this.redraw(), this), this.setOptions = (t = {}) => {
    !t || typeof t != "object" || (this.options = m(this.options, t), this.options.shapeOptions.zIndex = this.options.zIndex || this.options.zIndex, this.options.shapeOptions.id = this.options.id ? this.options.id : this.options.id, this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + Rt + "')" } }), this.center_top = this.shape.addPoint(this.left + this.width / 2, this.top, { id: this.shape.guid + "_center_top", style: { backgroundImage: "url('" + It + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + Ut + "')" } }), this.right_center = this.shape.addPoint(this.right, this.top + this.height / 2, { id: this.shape.guid + "_right_center", style: { backgroundImage: "url('" + Dt + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + Lt + "')" } }), this.center_bottom = this.shape.addPoint(this.left + this.width / 2, this.bottom, { id: this.shape.guid + "_center_bottom", style: { backgroundImage: "url('" + Pt + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + wt + "')" } }), this.left_center = this.shape.addPoint(this.left, this.top + this.height / 2, { id: this.shape.guid + "_left_center", style: { backgroundImage: "url('" + Tt + "')" } }), this.setPointsOptions();
  }, this.setPointsOptions = () => {
    this.setPointsMoveDirections(), this.setPointsMoveBounds();
  }, this.setPointsMoveDirections = () => {
    this.center_top.setOptions({ moveDirections: [b.TOP, b.BOTTOM] }), this.center_bottom.setOptions({ moveDirections: [b.TOP, b.BOTTOM] }), this.left_center.setOptions({ moveDirections: [b.LEFT, b.RIGHT] }), this.right_center.setOptions({ moveDirections: [b.LEFT, b.RIGHT] });
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
    h.emit(a.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (t, e) => this.eventListener.addEventListener(t, e), this.removeEventListener = (t, e) => {
    this.eventListener.removeEventListener(t, e);
  };
}
try {
  window.ResizeBox = et, window.SmartShape = B, window.RotateBox = tt, window.SmartShapeManager = f;
} catch {
}
export {
  h as EventsManager,
  et as ResizeBox,
  tt as RotateBox,
  a as ShapeEvents,
  B as SmartShape,
  u as SmartShapeDisplayMode,
  f as SmartShapeManager
};
