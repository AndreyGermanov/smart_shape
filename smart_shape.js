function pt() {
  this.subscriptions = {}, this.subscribe = (i, t) => {
    if (typeof i == "string")
      return this.subscribeToEvent(i, t);
    if (typeof i == "object") {
      for (let e of i)
        this.subscribeToEvent(e, t);
      return t;
    }
    return null;
  }, this.subscribeToEvent = (i, t) => ((typeof this.subscriptions[i] > "u" || !this.subscriptions[i]) && (this.subscriptions[i] = []), typeof this.subscriptions[i].find((e) => e === t) < "u" ? null : (this.subscriptions[i].push(t), t)), this.emit = (i, t, e = null) => {
    if ((!e || typeof e != "object") && (e = {}), e.type = i, e.target = t, typeof this.subscriptions[i] < "u" && this.subscriptions[i] && this.subscriptions[i].length) {
      for (let s of this.subscriptions[i])
        s(e);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (i, t) => {
    let e = !1;
    if (typeof i == "string")
      this.unsubscribeFromEvent(i, t) && (e = !0);
    else if (typeof i == "object")
      for (let s of i)
        this.unsubscribeFromEvent(s, t) && (e = !0);
    return e;
  }, this.unsubscribeFromEvent = (i, t) => {
    if (typeof this.subscriptions[i] > "u" || !this.subscriptions[i])
      return !1;
    const e = this.subscriptions[i].indexOf(t);
    return e !== -1 ? (this.subscriptions[i].splice(e, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const a = new pt(), dt = (i) => i * (Math.PI / 180), At = (i) => i * (180 / Math.PI), O = (i, t, e, s, o) => {
  if (i === 0)
    return [t, e];
  const n = dt(i), h = (t - s) * Math.cos(n) - (e - o) * Math.sin(n) + s, r = (t - s) * Math.sin(n) + (e - o) * Math.cos(n) + o;
  return [h, r];
}, P = (i, t, e, s) => Math.sqrt(Math.pow(e - i, 2) + Math.pow(s - t, 2)), ut = (i, t, e, s, o, n) => {
  let h = (i - e) * (o - e) + (t - s) * (n - s);
  const r = Math.pow(o - e, 2) + Math.pow(n - s, 2);
  return r === 0 ? -1 : (h /= r, h < 0 ? h = 0 : h > 1 && (h = 1), Math.sqrt(Math.pow(e - i + h * (o - e), 2) + Math.pow(s - t + h * (n - s), 2)));
}, gt = (i, t) => {
  const e = (p, d, c) => d.x <= Math.max(p.x, c.x) && d.x >= Math.min(p.x, c.x) && d.y <= Math.max(p.y, c.y) && d.y >= Math.min(p.y, c.y), s = (p, d, c) => {
    let y = (d[1] - p[1]) * (c[0] - d[0]) - (d[0] - p[0]) * (c[1] - d[1]);
    return y === 0 ? 0 : y > 0 ? 1 : 2;
  }, o = (p, d, c, y) => {
    let b = s(p, d, c), N = s(p, d, y), z = s(c, y, p), D = s(c, y, d);
    return b !== N && z !== D || b === 0 && e(p, c, d) || N === 0 && e(p, y, d) || z === 0 && e(c, p, y) ? !0 : !!(D === 0 && e(c, d, y));
  };
  if (i.length < 3)
    return !1;
  let n = [1e4, t[1]], h = 0, r = 0;
  do {
    let p = (r + 1) % i.length;
    if (o(i[r], i[p], t, n)) {
      if (s(i[r], t, i[p]) === 0)
        return e(
          i[r],
          t,
          i[p]
        );
      h++;
    }
    r = p;
  } while (r !== 0);
  return h % 2 === 1;
}, et = (i, t, e, s) => !i && !t || !e || !s ? [e, s] : i && t ? [i, t] : (i || (i = t * (e / s)), t || (t = i * (s / e)), [i, t]), X = (i, t, e, s) => {
  const o = s.scaleFactorX || 1, n = s.scaleFactorY || 1, h = s.offsetX || 0, r = s.offsetY || 0, p = s.flippedX || !1, d = s.flippedY || !1;
  return e === F.CURRENT_TO_ORIGINAL ? ([i, t] = k(i, t, p, d, s), i -= h, t -= r, i *= 1 / o, t *= 1 / n) : e === F.ORIGINAL_TO_CURRENT && (i *= o, t *= n, i += h, t += r, [i, t] = k(i, t, p, d, s)), [i, t];
}, k = (i, t, e, s, o) => (e && (i = C(o.right - i) + o.left), s && (t = C(o.bottom - t) + o.top), [i, t]), F = {
  CURRENT_TO_ORIGINAL: "current_to_original",
  ORIGINAL_TO_CURRENT: "original_to_current"
};
function ct(i) {
  return ft(i) && !Et(i);
}
function ft(i) {
  return !!i && typeof i == "object";
}
function Et(i) {
  const t = Object.prototype.toString.call(i);
  return t === "[object RegExp]" || t === "[object Date]" || yt(i);
}
const mt = typeof Symbol == "function" && Symbol.for, St = mt ? Symbol.for("react.element") : 60103;
function yt(i) {
  return i.$$typeof === St;
}
function bt(i) {
  return Array.isArray(i) ? [] : {};
}
function L(i, t) {
  return t.clone !== !1 && t.isMergeableObject(i) ? T(bt(i), i, t) : i;
}
function vt(i, t, e) {
  return i.concat(t).map(function(s) {
    return L(s, e);
  });
}
function xt(i, t) {
  if (!t.customMerge)
    return T;
  const e = t.customMerge(i);
  return typeof e == "function" ? e : T;
}
function Ct(i) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(i).filter(function(t) {
    return i.propertyIsEnumerable(t);
  }) : [];
}
function K(i) {
  return Object.keys(i).concat(Ct(i));
}
function it(i, t) {
  try {
    return t in i;
  } catch {
    return !1;
  }
}
function Mt(i, t) {
  return it(i, t) && !(Object.hasOwnProperty.call(i, t) && Object.propertyIsEnumerable.call(i, t));
}
function Bt(i, t, e) {
  const s = {};
  return e.isMergeableObject(i) && K(i).forEach(function(o) {
    s[o] = L(i[o], e);
  }), K(t).forEach(function(o) {
    Mt(i, o) || (it(i, o) && e.isMergeableObject(t[o]) ? s[o] = xt(o, e)(i[o], t[o], e) : s[o] = L(t[o], e));
  }), s;
}
const T = (i, t, e) => {
  e = e || {}, e.arrayMerge = e.arrayMerge || vt, e.isMergeableObject = e.isMergeableObject || ct, e.cloneUnlessOtherwiseSpecified = L;
  const s = Array.isArray(t), o = Array.isArray(i);
  return s === o ? s ? e.arrayMerge(i, t, e) : Bt(i, t, e) : L(t, e);
};
T.all = function(t, e) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(s, o) {
    return T(s, o, e);
  }, {});
};
const _ = (i, t = !0) => {
  let e = 0, s = 0;
  if (!t)
    return { top: i.offsetTop - i.scrollTop, left: i.offsetLeft - i.scrollLeft };
  for (; i && !isNaN(i.offsetLeft) && !isNaN(i.offsetTop); )
    e += i.offsetLeft - i.scrollLeft, s += i.offsetTop - i.scrollTop, i = i.offsetParent;
  return { top: s, left: e };
}, V = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(i) {
  const t = Math.random() * 16 | 0;
  return (i === "x" ? t : t & 3 | 8).toString(16);
}).replace(/-/g, ""), st = (i) => {
  try {
    i.stopPropagation && i.stopPropagation(), i.preventDefault && i.preventDefault(), i.cancelBubble = !0, i.returnValue = !1;
  } catch {
  }
  return !1;
}, m = (i) => typeof i < "u" && i !== null, S = (...i) => {
  if (!i.length)
    return null;
  let t = i[0];
  if (i.length === 1)
    return t;
  for (let e = 1; e < i.length; e++)
    m(i[e]) && typeof i[e] == "object" && (t = T(t, i[e]));
  return t;
}, Ot = (i) => {
  const t = atob(i.split(",")[1]), e = i.split(",")[0].split(":")[1].split(";")[0], s = new ArrayBuffer(t.length), o = new Uint8Array(s);
  for (let n = 0; n < t.length; n++)
    o[n] = t.charCodeAt(n);
  return new Blob([s], { type: e });
}, q = (i) => new Promise((t) => {
  const e = new FileReader();
  e.onload = function(s) {
    t(s.target.result);
  }, e.readAsDataURL(i);
}), Q = (i) => {
  try {
    return JSON.parse(i);
  } catch {
    return null;
  }
}, Pt = (i) => {
  let t = i, e = t.indexOf("-");
  for (; e !== -1; )
    t = t.replace("-" + t[e + 1], t[e + 1].toString().toUpperCase()), e = t.indexOf("-");
  return t;
}, C = (i) => i < 0 ? -i : i, Rt = (i) => new Promise((t) => {
  setTimeout(() => {
    t();
  }, i);
}), u = (i, t = {}) => {
  const e = {};
  for (let s in i)
    s !== "type" && s !== "target" && (e[s] = i[s]);
  return Object.keys(t).forEach((s) => {
    e[s] = t[s];
  }), e;
}, j = (i, t = null) => (t || (t = i.target.root || i.target), Y(t, i.pageX, i.pageY)), Y = (i, t, e) => {
  const s = _(i, !0);
  return [t - s.left, e - s.top];
};
function wt() {
  this.subscriptions = {}, this.subscribe = (i, t) => {
    if (typeof i == "string")
      return this.subscribeToEvent(i, t);
    if (typeof i == "object") {
      for (let e of i)
        this.subscribeToEvent(e, t);
      return t;
    }
    return null;
  }, this.subscribeToEvent = (i, t) => ((typeof this.subscriptions[i] > "u" || !this.subscriptions[i]) && (this.subscriptions[i] = []), typeof this.subscriptions[i].find((e) => e === t) < "u" ? null : (this.subscriptions[i].push(t), t)), this.emit = (i, t, e = null) => {
    if ((!e || typeof e != "object") && (e = {}), e.type = i, e.target = t, typeof this.subscriptions[i] < "u" && this.subscriptions[i] && this.subscriptions[i].length) {
      for (let s of this.subscriptions[i])
        s(e);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (i, t) => {
    let e = !1;
    if (typeof i == "string")
      this.unsubscribeFromEvent(i, t) && (e = !0);
    else if (typeof i == "object")
      for (let s of i)
        this.unsubscribeFromEvent(s, t) && (e = !0);
    return e;
  }, this.unsubscribeFromEvent = (i, t) => {
    if (typeof this.subscriptions[i] > "u" || !this.subscriptions[i])
      return !1;
    const e = this.subscriptions[i].indexOf(t);
    return e !== -1 ? (this.subscriptions[i].splice(e, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const x = new wt();
function It(i) {
  this.menu = i, this.panelCssClass = "", this.itemCssClass = "", this.itemTextCssClass = "", this.itemImageCssClass = "", this.itemsCssClassesById = {}, this.setStyles = () => {
    if (!!this.menu.panel) {
      this.panelCssClass ? this.menu.panel.className = this.panelCssClass : (this.menu.panel.style.padding = "3px", this.menu.panel.style.borderStyle = "solid", this.menu.panel.style.borderColor = "#dddddd", this.menu.panel.style.borderWidth = "1px", this.menu.panel.style.backgroundColor = "#eeeeee", this.menu.panel.className = "");
      for (let t of this.menu.items)
        this.setItemStyles(t);
    }
  }, this.setItemStyles = (t) => {
    this.setItemDivStyles(t), this.setItemSpanStyles(t), this.setItemImageStyles(t);
  }, this.setItemDivStyles = (t) => {
    const e = this.menu.panel.querySelector("#" + t.id);
    !e || (e.style.display = "flex", e.style.flexDirection = "row", e.style.alignItems = "center", this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][B.ITEM] ? e.className = this.itemsCssClassesById[t.id][B.ITEM] : this.itemCssClass ? e.className = this.itemCssClass || "" : (e.className = "", e.style.paddingTop = "2px", e.style.paddingLeft = "3px", e.style.paddingRight = "3px", e.addEventListener("mouseover", () => {
      e.style.backgroundColor = "#0066CC", e.style.color = "white";
    }), e.addEventListener("mouseout", () => {
      e.style.backgroundColor = "transparent", e.style.color = "black";
    })), e.style.whiteSpace = "nowrap");
  }, this.setItemSpanStyles = (t) => {
    const e = this.menu.panel.querySelector("#" + t.id);
    if (!e)
      return;
    const s = e.querySelector("span");
    s && (this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][B.TEXT] ? s.className = this.itemsCssClassesById[t.id][B.TEXT] : this.itemTextCssClass ? s.className = this.itemTextCssClass : (s.className = "", s.style.color = "black"));
  }, this.setItemImageStyles = (t) => {
    const e = this.menu.panel.querySelector("#" + t.id);
    if (!e)
      return;
    const s = e.querySelector("img");
    s && (this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][B.IMAGE] ? s.className = this.itemsCssClassesById[t.id][B.IMAGE] : this.itemImageCssClass ? s.className = this.itemImageCssClass : s.className = "");
  }, this.setPanelClass = (t = null) => {
    this.panelCssClass = t || "";
  }, this.setItemClass = (t = null, e = null) => {
    if (e) {
      this.setClassForItem(e, B.ITEM, t);
      return;
    }
    this.itemCssClass = t || "";
  }, this.setTextClass = (t = null, e = null) => {
    if (e) {
      this.setClassForItem(e, B.TEXT, t);
      return;
    }
    this.itemTextCssClass = t || "";
  }, this.setImageClass = (t = null, e = null) => {
    if (e) {
      this.setClassForItem(e, B.IMAGE, t);
      return;
    }
    this.itemImageCssClass = t || "";
  }, this.setClassForItem = (t, e, s) => {
    (!this.itemsCssClassesById[t] || typeof this.itemsCssClassesById[t] > "u") && (this.itemsCssClassesById[t] = {}), this.itemsCssClassesById[t][e] = s;
  };
}
const B = {
  ITEM: "div",
  TEXT: "text",
  IMAGE: "image"
}, Tt = (i, t = {}) => {
  const e = {};
  for (let s in i)
    s !== "type" && s !== "target" && (e[s] = i[s]);
  return Object.keys(t).forEach((s) => {
    e[s] = t[s];
  }), e;
};
function Dt(i, t, e = null, s = {}) {
  this.panel = null, this.container = t, this.items = i, this.event = e || "contextmenu", this.options = s, this.listeners = {}, this.origEvent = null, this.cursorX = 0, this.cursorY = 0, this.overflowY = "", this.maxImageHeight = 0, this.subscriptions = {}, this.init = () => (Object.assign(this, new It(this)), this.listener = (o) => (this.onEvent(o), !1), this.container.addEventListener(this.event, this.listener), x.emit(I.CREATE, this, { owner: this }), this), this.onEvent = (o) => {
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
      const r = this.panel.querySelector("#" + n.id + " > span");
      if (h.style.display = "none", h.src = n.image, !this.panel)
        return;
      const p = document.createElement("div");
      p.style.marginRight = "5px", p.style.display = "flex", p.style.flexDirection = "row", p.style.justifyContent = "center", p.style.alignItems = "center", h.height = this.panel.querySelector("#" + n.id).clientHeight, h.height > this.maxImageHeight && (this.maxImageHeight = h.height), h.style.verticalAlign = "middle", h.style.display = "", p.appendChild(h), this.panel.querySelector("#" + n.id + " div") || this.panel.querySelector("#" + n.id).insertBefore(p, r);
    }
    this.adjustImagesWidth();
  }, this.setItemsEventListeners = () => {
    for (let o of ["click", "mouseover", "mouseout", "dblclick", "mousedown", "mouseup", "mousemove"])
      this.setListenersForMouseEvent(o);
  }, this.setListenersForMouseEvent = (o) => {
    for (let n of this.items)
      this.setListenerForItem(o, n);
  }, this.setListenerForItem = (o, n) => {
    const h = (r) => {
      !this.origEvent || (x.emit(o, this.origEvent.target, Tt(r, {
        container: this.container,
        owner: this,
        cursorX: this.cursorX,
        cursorY: this.cursorY,
        itemId: n.id
      })), setTimeout(() => {
        ["click", "mousedown", "mouseup", "dblclick"].indexOf(o) !== -1 && r.button !== 2 && this.hide();
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
    if (!this.container || (x.emit(I.SHOW, this, { owner: this }), this.drawMenu(), !this.panel))
      return;
    this.panel.style.display = "";
    let o = this.cursorX, n = this.cursorY;
    this.panel.style.left = o + "px", this.panel.style.top = n + "px", this.panel.style.zIndex = "10000", this.panel.style.position = "absolute", o + this.panel.clientWidth > window.innerWidth && (o = window.innerWidth - this.panel.clientWidth - 10, this.panel.style.left = o + "px"), this.origEvent && this.origEvent.clientY + this.panel.clientHeight > window.innerHeight && (n = window.innerHeight - this.panel.clientHeight - 10, this.panel.style.top = n + "px");
  }, this.hide = () => {
    this.panel && (this.panel.style.display = "none");
  }, this.addItem = (o, n, h = null) => {
    const r = { id: o, title: n };
    h && (r.image = h), this.items.push(r);
  }, this.removeItem = (o) => {
    const n = this.items.findIndex((h) => h.id === o);
    n !== -1 && this.items.splice(n, 1);
  }, this.findItemById = (o) => Array.from(this.panel.querySelectorAll("div")).find((n) => n.id === o), this.setId = (o) => this.panel.id = o, this.addEventListener = (o, n) => {
    typeof this.subscriptions[o] > "u" && (this.subscriptions[o] = []);
    const h = x.subscribe(o, (r) => {
      r.owner === this && n(r);
    });
    return this.subscriptions[o].push(h), h;
  }, this.removeEventListener = (o, n) => {
    this.subscriptions[o] && typeof this.subscriptions[o] < "u" && this.subscriptions[o].splice(this.subscriptions[o].indexOf(n), 1), x.unsubscribe(o, n);
  }, this.on = (o, n) => this.addEventListener(o, n), this.off = (o, n) => {
    this.removeEventListener(o, n);
  }, this.removeAllEventListeners = () => {
    for (let o in this.subscriptions)
      for (let n of this.subscriptions[o])
        x.unsubscribe(o, n);
    if (this.container && this.container.removeEventListener(this.event, this.listener), this.subscriptions = {}, !!this.panel)
      for (let o in this.listeners) {
        const [n, h] = o.split("_"), r = this.panel.querySelector("#" + h);
        r && r.removeEventListener(n, this.listeners[o]);
      }
  }, this.destroy = () => {
    this.removeAllEventListeners(), this.items = [], this.container = null;
    try {
      document.body.removeChild(this.panel);
    } catch {
    }
    this.panel && (this.panel.innerHTML = ""), this.panel = null, x.emit(I.DESTROY, this, { owner: this });
  };
}
const I = {
  CREATE: "create",
  DESTROY: "destroy",
  SHOW: "show"
};
function Lt() {
  this.menus = [], this.create = (i, t, e = "contextmenu", s = {}) => new Dt(i, t, e, s).init(), x.subscribe(I.CREATE, (i) => {
    this.menus.indexOf(i.target) === -1 && (this.menus.push(i.target), i.target.id = this.menus.length);
  }), x.subscribe(I.DESTROY, (i) => {
    this.menus.indexOf(i.target) !== -1 && this.menus.splice(this.menus.indexOf(i.target), 1);
  }), x.subscribe(I.SHOW, (i) => {
    this.menus.forEach((t) => {
      t !== i.target && t.hide();
    });
  }), document.addEventListener("mouseup", (i) => {
    i.button !== 2 && this.menus.forEach((t) => t.hide());
  });
}
const Z = new Lt();
try {
  window.Menus = Z;
} catch {
}
const _t = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECcZZuWhdAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlZBBEsAgCAMT/v/n7akzWAFtTo5mQ8SAJtkGcL4LXcg211A2L+eq3jc5C/AGTUBZ7wYAHH+B4yIAv8a8dkvilLz9qXuYKseU2E7qDFODqIwTIEkPSldAAa0WlbUAAAAASUVORK5CYII=", Ut = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECgYlnqNLQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABZSURBVCjPlZFBCgAxCANN/v/n2VOhiFU3N4U4GgXELUkAikbOhlhIh1QZXkR3hGc/IsaVMtHT0RXR3e5jescIqBpy05T/tInffw2AvEkr972N+a69+U8e8AGOtEABr4X+4AAAAABJRU5ErkJggg==", Vt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECkWaNmRawAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABjSURBVCjPlZBRDsAgCENbsnt6/1N0P2ocijASEy08iqC1BknhASCvsSeOQXImJXHcrQL4t1UAr4fjReDmdCsc/5LEZ7NOwOlUKVy3RwC/AAAwL2TAZ3t+xFszOxVl7lbtvsYLOtlZCOj2NccAAAAASUVORK5CYII=", Nt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECoXNPPyPgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlVFBEgAhCAL+/2f21I5jqcXFGRMSpG1EkLRtooEyIdaRlAc7orqBsg+gVKy8yTYn49vqMb0pgCUuPOBP93Sniaxb8/FdL6mt/rZe5SMKXQWRf/4AYrs6C0ViuwUAAAAASUVORK5CYII=", zt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDsHep3BSgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA8SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCAZy0h4AXLILDAEWNOwAAAAASUVORK5CYII=", Ht = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDMMJZaSygAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA/SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCJxAWZoFp1MBY8cLTv/x72kAAAAASUVORK5CYII=", Gt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQARsznxFAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", Ft = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQEbSvcpSwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA3SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTCICjCTbxPJfsIWSv+JECM9nugHAG40DyW1OoLPAAAAAElFTkSuQmCC", kt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDIpd4l3zAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", Wt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDYr/evT5AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", Qt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDUsSKIVhAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA0SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTBQZBPJfsIWSv+JECM9nugHADv6Dv2P6G4ZAAAAAElFTkSuQmCC", jt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDQQftZYQgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", $ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAEDSURBVDjLzZPNSsQwEIC/CUWtQlnZi14EYb36Jj6DT+ZT+BSevImHPYggKLpo2bW1Ze14yJjFtKEed3poMpmvzZcf2LqQfkolZFV0FFDhkMI6JR99JAbczTlP/tGZung86yN7Spn+4ABw0PH5DyCoOoSvYOg00s9C+YSpL8oLGgMmnOILF2r68qvKibvWXd9hbsCZ/ajpLniULnKQO82tubb3vY3Uw9IrvhOmCaDFJYC2DyjLt1vNQGjzI5v7+1wrBWTN0uQ3R0OFfQRwz7PjS8td8UAHKFW0rCDqt0ud1mEfKlZ+bYYdNtGQjAFgh6L+M9sRQKev5Yu1F4zfh7ELtIXxA+JiW9aVMPJ4AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", ot = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAACn0lEQVRIx+2U30tTYRzGn/fsPdOmNkWDsEDnOiFCbv4KhPJCFAvDtBuRyL/A64TwQkGaCt7pVYqimHhTJAVhuYsRE5zipLuZeQKNsMQdN1vbzvbtwg2Oa5s/uvWBl3Px8P18OO/7ngNc5H9DROw8XTxCumEiygJwjYh4kp7HuqzTiJLBc8aslr5+vbiy43SWaiVExHecztJ+vbgyZrX0EVHOqSVx+ERFee8wR3hcBNky+VpcEofbMvnauAga5ghPVJT3ppKwJIKsqRrr0/3P68+KdeAMgBIFfgjc/cT+6TEATNffmbkaVa1GASAAcgRq3i3L806Xe4gxdqjl8QS4ACBPDPibpIwjOAAUAOBR1fqy8e4MAFwXVGuuZlLi4ErA3wTgBREFGGPRdG+gCytKy3JDTdfvrxv12s4bOXrm6o7PGEok++2PrhHRaJxnjEXSblFMog/7lea1xn8liTGUSPaKD64RMdv4jjEWOvEMtJKIX2lev1fTFdhKLrlkkuyW964RXQo4kOY7ABBVNj0e+eDwMudAsiUfHF5WNj0eANFUkFRbxPdWl268elA3Wyyq1nwx+fBeGJDD3P3oraMjv6r2C2NMPVFARLq91SXpTUvdrEmvWgv0SJtfIWArxN0P5x0d+VW1G2kPOXZNC6dMma+LebD6SgI8o+imHQCC3zzHzuRnCJDVjJXOrT9tAL5rr+mxM4gV+w3dPY7CbCEkciC+DGbJXjS3PFo0tzxqMEt2bVeYLYQaunscAPa18KSJ/SrMyuSgTa4WgnIlaLtVWlR93jYi0hORXvV527ZbpUW5EiRXC0FlctBGROaz/o/Mvumhgd32soU4XNPrVZ+3bbe9bME3PTRwJniCxERE97VwrSTWmc4MTxSdp7vIqfMXBoR6XMSZc1QAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDB/NVeTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwDmjvLwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=", Yt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAG6SURBVDjLlZK/TxNhGMc/z117FgWbNulITGMYTMvAaHAyhMTAIoOmcdD/wMWERdO4E8If4OJASBgcGcA4QRgx4YcLA4aUYDTRCoX2fj0OvTu441rwuem+7/N5n/f7PA/8ZwholiHuYCCXdMWnxYk4KYwWSws0+JX4GqUFLaqRVmHYWFUfTZ6I4U9ynKyRAUztoNsfq6f4gWrsDI6+VMGMPTMCwIHqGt+xA9Wq3uNFuukIoIUtduiYFs51QDIcwMSKrHn4otcBebJ4QfofmnghYKcANlCQxaj505xcAL0qGM1lFEXwwsH2B/zi0/DXXbps2k0YtDBxAbxvPbtUL7/Xi8HVy90ntXdwVUUgHKGADufedrJUsGKWd2857aXMXLAy4j7nUOxuhdabvfmR86/x0gPO7AFn3lYkCJaqON31HqVCNpZvMkCDA3kVtfUD5/yVYwFQ48qaZShO1VeqbEbKwyfbK+/kx5VtDO4TLO/Rs7FPpVCZ+bm8Za5LpwcAKuTajycebBQAxn9/3st9oSPaEwAVbjcnx+/vDlZON/bza5yJ0j9UNH9Um3h9VNO7/a6OIwWd0sIN09PiH5BSrD/OwMFRAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", Zt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAFGUlEQVRIx7WVaWxc1RXHf/ctM+OxPcQLxIljD3GCAYOxiHCSpmmWEgi7kBBIiEXiU79USHxhEaJtWqFWqqhQW1BLIImrVLTwgQBhM2sIEIVFCZDFSbCdxI4X7ExmMjOemffuvacfbA8e1FYNUv/See/o3vf+5/3/5+o8+D9DzSYiolatWhUrFArR2bXa2lr1317OZrMCcPbsWQFIp9PypOt23TsxsbuigIiogx8/d9+StsW/8P1Y8ty/U6avpYCPf/2XbMPdV9/fueZn2wA8gPXr11e/uu2hX1EabQlyeRQKlPofuQVBQCy5XYdwGv3aZGvLJuCfQMEBsNZW+RG/xZSyWAEjqiJCA09ueZtr736CXXuPzdkDI2CtYI0wvvsY1a21RHyvFYgCOACJRMK1RmMsWKuworDiYMXBWMXjf3yF9/f0s+mXjxB6TfR+eLi8Px0Kk5lieP8g9YsvIAiLJBIJp2yR53nKaI21Mu3MbAB/3trLnn0neeap35FsrseGU3y5r8SLO/dy2/XLZ13CfHacjO8Qr6tBl0qIiCorUEq51oYYIxgr05KtsO2FXbzy9n4ee/jnjJ44wOmRQxw5+CnP/r2XqliU51/+BGMs1kDu6Di6KcFUMcBajYh8p8AYo6wOsMagRGERnu55kx1vfc6Plney+bmtXP3jDv72j9dYOL+ODasvp7urjfxUkb9uf4d7b+gmNTBGtK2RIAxBTPmEejNNVkYHGKMRIzz42xfY/ekRrlvXxdruC5mX6MB1XVZ3t2OtMDJ+hoETY3Rd2sLtN69gz5Z3qU3lqN9wEQrBmu8s8gAymYzosITRITvf28fxoQmeePROCqWQMAiZmMxgrSWVyhCEBkQIwxATlFhyYSMr59XyXv4bEp7Cc8CEYaWCdDqNDovoMODowCgbf3IpuXwOgHyhRLEQUBXzwcbAUbiOQ8RXHO0f4tuJM6w+nSeb8ImKQSFoXSKfz1NuciqVQodFQh2w8soWjgyOMjwySVNjNYWpIhFPiMdcfNcS9YSYJ8RjDvGYi2ciTC6/hlxbMx1Lzyc0Bh0EZW5vpoCEQQkThlzRPp/O9iZe/+AQv/nTa2x+/A6y+SI18SijE1mKpQAdWiIRl5XLknxzzOdYop5IcwO+pwiCEOUVKy0ClA6KGB1Mjwmg98PDLOtYiBjN0KkU45NZhsYydHcuIhZ1qa3ycMVgaxYycnyAqzrOI5ctYMXietFyAQegUCiggwJGG7TWaK3pumQBff3f8uyLe/F9RceSBrovWwDG4CkoFgNS6RxnTIxTo4MoMYxOZNDaoIN/pyAsIWLLM+yWn17M7Rs76B9K0fPSF2xYsZh0tsDi5np8L0Y04nH4eJrtvc9z5dIYg8PVNM6LE/UddFiqVAA4WocYY8rxxYFhdn7QRzzm0TcwwchkjisubmLB+TXUVEeIRBw+/3qQI4cPUBfXIMIFDXFELFqHlU0GlNGmYgqv6Gwu53fd2Mn+vjH6T57m/rtWYo3BWOGTfSdJNlXRcF6M9mQdSoQ5PJUWGWPLP47vY113kjVXtfKHnj38fstH3LT2Ik6NZ+loa2Tj6iW0JxuYGTlzuSsK2KGxzGTz/ESjWMN/wgP3rCjnS1vrWNvd+j1iUI7LqfHMJGDnFhjrefmrN+67bfmNyUVN9cpxUY6Hclwcx0WVY/pxsRqxBrEGO3OfXTsxPJbq2fHVm8BYWcYMLgNuBS6Z0/xzhQX6gB3AwR/IcW74F/jUry6yACAoAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", Jt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAE8ElEQVRIx7WVWWxVVRSGv733Off2Xjrc0oFKy6XQoqCMEgc0RhFNVBzwQRIfUBKiTyYqCSQmmhiNJkSjiQkJiQ8mKg5xiGKCCIpEZFCCcwlVhlCwrbSlpe1te8/Ze20fTluL4AMaV3KmZGd9a/3r7H/D/xzqb99pIPUfc0ZA8TzALzvee6C5adbTqVRqxgXrGFupDUqBR4EG/LkrfVwc6jjZ9nzDkjuemwjIFFq/OZRyI43EI//Qp0IpnTyDAKU1KDUBPprKpJAgNRTk51cDw8GYNKkwaJTCIHgPWieVeTkX4lWSWCzaGDAhSisUejS/BxdhMqXZUbnHAUpsTH//AH2FYQojMWcGCgBUZNM019eQCsNkpVOgNV4MSgQThHgDSpm/ZEp0UwDjAO9istkSJpWWooIQrwNO/dHNdy2tvL31S2bW17H0yjnkp9aCKLxolLMgHh2GEJBIqAGRCcImUT38884uGeyFIMShCdMZMAFoQxRZPv96P5s/2EJ1RSlrVtzKFc15lNZoE2LSaXSYRpkApQ1kKtANc2uA7jFATeH7z05LoY+ih9N9BY793sVwFBE7x9LrriFXXo54z849+3nl1ddZMKuRh+69lfq6GlSYIkhn0Kk0OghRJeXo/IJaoGsMUDtw4JM/3GAvrW2dvLN9N22dZyhaR29/AWuF8tIM0+vruO+OW5jdlOeZlzdx6Mhx7rnxKlbdvYxcrpIgncWkS1CTcpj8winA6QlDjhAbMWvqZErTIXu+b2FwpEgmFeKVJghCevqH6O79kKqKLLfftITLm6bz7tad7P2xlQ2PPUg+Pw1lDMa582ZQ1/vV2x1u6CxRbPntZCffffwtmeV3MmQt/b09tLed4OCh45w6fpiG2iqWXb2IqvI0c2Y08MrmLQC8vP5hmpubSFVUYZquvQToHOtAiysiEhEYxeSKEnp8kRvP9DBz1QMopXh9234GGvuYZ4Qsll9/2Mv04hkaasrZ8MhKXnprGx/s2M36xmmItZD8T8kNUDaOcNaR7IdBGhdOp3XfPrIlJQTpLCvvXMaifCVvPvs4B776HH/ZDTQtuY0t+1po7+ljwyMrmd1Yh7URYovj6owDJB5BXIS1MfVVZeRKM/SGwu6nnqR6co4X3t9DN2WUV07m+hX3s2Lptaxe/SAvbnqNT789TN/Zfm5ePAdxMWLj8wE2KiJxjIsilLXMnVZD47x6TnScYte6tSyp1fza3sddT2ykc9CwsKGSsrJSamrrWPfoWn48chJxDnEWl/jZuTvZFUfw1uKdgAiBeK6ZeQk9UyrpONbFpT99ST5TRvtQjvlXLaIhtHQdO0I00MNQ+1EWN09FXIx3DhcXzwNoH0d45xCbAEQSR6nOpKia14CIx/qIKcOnSB/tpPeEQQcBxigmaY0ODF4s3sZIVBxXZ8I+sIgVvEsufGJagkJp0EoT4kllQpRS4D3exjg36rChR0UxNijilbqARNbhrYB4RHxi22Pu6AHsqPcrvBp1TMWoH3m88slhVBwZO4TOGbJ09w8OKDzee1RSPqDwPnn3kpBEBHFJIYjHW0Gsw8cWsRE2LtLW0d4HyMQOOt/44uD2NbddvzxXnitRyoBSKG0Sd9QapUwiBeC94MWBCB6X0JWgjaaju+fsxg93bQM6J1oFwBXACmD2hM4uNgQ4DHwEtPzLHBcXfwKfID6QlqygzQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMH81V5MAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDAOaO8vAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==", Xt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAFdSURBVDjLzZO/TsJQFMZ/t1QsmthEjQkmLoZJA7ODq/EdHBx9BcTEmMjCxsA7+Ao+gFOdCImOuoAs/qtIldL2OECxLY1EJ88Zbu6933e+c/988MtQ8akotOQaQqAklSAaS5hkEgQfmzcVTImJEjPfoMNjIjv5hpiiEgqiyJLXLiVAEpWU0oJ9HpQHoEeaWWFZPpGbiy17QlK35vaBqBAXaWajzp3sYWFJUQzRx2lIEQtLNmVMGQ0ZzPYuXQQX6OON5EGgjxstHkrp8k4A8c1xpBJgAMAwhTBMJ7jT1X5WGP5nBQ1dvve1mQq1wjGEX02rFX5S8HPOh16pVOYjiAHNnIeXTuidtc/XnOv4ERa8ky42fkpL9dXyfTnLXAzf54UmvdBCCkB01hcPHZ0djHh15QVHdHBV5BYAfOzq06npXMXhhl995TkKnxhINEqUyE49WYtW3JxRx82w/x/jC67KmykWiVPXAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", Kt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAACQElEQVRIx9WUz2sTURDHPzMvIb3VgyJKW/DXSXoKtSJIbaxtgi3of+BfIYKXgOAfUCh6zFFR9Ca1tomXigf7P/SQqo2giIrNpvvGw+7GStIlG/HgLI8dHvPmOzPvw4P/3SRx1hurde/9bL8g7z1mhveGWeQj0liq3CgNrLS28cKy2JNnj2yQvLnE6XQ6AHz/8Q3vPd6HhMk/3CcMw2j5fU5NnCMI2gMV3hUIggCAdrDHy9U1zDzeopF4b5g3jJCZKzN/xA8h0Ga2NAMIZoYRz91b3JmP4ttZBeIDPgzZWK8DgghEgzbMADNKc6W/6yD0nqtzJUQEVY2FonXQ2lkFkgNOlXq9gYoiqqgIiCJETM+XF7oFrTxYtjNnT6ci3NOBc45yuYxTh3MOVYeqxt0QJYjjp6cuUSwWe6p++vzxbE8HiYCosv5qI0rqFKeOxeuLqHOICHbgkr98/czH1k4qwj2XLMD8wjWcy5FzDudyICDxZ/FdBEHAm81Nms1mKsI9HRw/djL10hyuGz81fYHJyfOpCHcFDNu8c/f2RUveHTMS38xcNPookXlPYWSErXdbtHZ3UxHuCtyr3r9crd4qbCcb27+rHp848XNp8SYfdndQVUSEkUKBsbFxRo+MpiKcO7Bv1Wptr99YVh4uUywWab4/SqPxGhVFnaPV+nQowv0EDrVOp4Oqks/nqVQqAyGcSWAYhLMJDIHwUB1kQTiTQBrC0RtkRAhH+7l87m1yVgYRAOQwhPtZrVZrk7z0/9p+AWdQwNFPdOB+AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDA5LTEyLTAxVDAyOjIyOjM1KzAxOjAwqBTIawAAACV0RVh0ZGF0ZTptb2RpZnkAMjAwOS0xMi0wMVQwMjoyMjozNSswMTowMNlJcNcAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAE3RFWHRUaXRsZQBPcHRpY2FsIERyaXZlPme6DAAAAABJRU5ErkJggg==", qt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAAB3RJTUUH5goLBzIP6fiS+gAAAoFJREFUSMfVVk1rE2EQft55EyKeFU0PlcR6koIa+0FBa2NtEmyL9uLBIoHi0YvFogghIIjoTbx4MldB8BRUTJNeqh7MwT+gPaSpKdjak2bTnfGw3SVhP5p4EFxYmJf5eGbmfXZmgf/9UbZQqrwtM/OElxEzQ0TALBCxZChVmclcSe4HEGoLMjEwv+AoYvV6oOOr1y87kvkajYotxzc2lAug1Wp1BPi5swWTGcwmTHMXpmlaL+8i1n8ChtHsqkUOgGEYHYpisQgWqyXMAmGBwMT4hXFP+64AYvU66o0aFICx08OOUbj6EcICZgYzW/ZNw7ct3gBNKyM2TSyXyjjfZrRcKkMEgAiSk8m/rwAATGZcnEyi/UZSqRSU6kyw2SuA7aCJUC5XQE8eQRGBlMLoqbMdTt8AzAF4k7uH4wNxiAiKLOJFYVcFWmuk02lo0tBag0jjx+07ntmNDI0hkUgEUtgFoIhQer8MIgJpgiaNMz7lb+9s4fvmeiCFXZesAEylLkHrEEJaQ+sQGj4AH1ZXUavVAinsquDI4b6u58zQyDAGB096UtgFIJDVu/eXRsWeOyKw5VuA9gKofq5is9EIpLAD8CD/8Fw+n42s7Z1zz9/9snUvbmYxM30VG411EBGUUjgQieD6fNYJdPBL1ZPCobaEJJ8v/LYPuWjUURztiyKRSKBWP4RKZQWkCKQ14m3OK+UVTKVT/hUEPa1WC0SEcDiMTCbjUHh7ccmxmZmdtb6BIAC/2fLYMMSTws+eYvryNEhr1PqPOXGMhRu9VRBEYShAoXOM9NyiXinsC+A3coMobK1RAa7N7e0NRkipT66dvN/ubqcw1oKNC4VCE4D8k7+KP78ve+ZyfaadAAAAAElFTkSuQmCC", $t = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5godFRotCxUC6QAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAPfSURBVEjHtVS/TyNHGH27Ozv+sRj/CDYuQCJSdBRp6CkjLlWkFFGUUCJLSUkBhfMPUCJEQZciihwqpEsTiQasSBQnIaUgd2ALkC4sxpzDcuZ8O+udbzaF2cXEwF2QstLTzOx+s2/mfe/7tHL5h+DCceC6LgxDh5QSvpSQkiB9CQrXJCGlBEmCvF734m7e+f5N3LtOB2+v3oAFgUKhMIpM7iPkRvKQvoQkgiQCSQWp+uakQEpCSgW6jpFEIFK9A4VzUjiuv8Afz38H0zQNhmHA5ByxWByGIWFIgkEEYgRDKRhSgRiBUY/QkApECqyPhIUkSoGRgsnj0HUDzDCM128uHTiOA/uvV70bRBKEp7+RRRJBSgJRD354Yyl7e1Uv3vn7NXzPBQPwaYAAQRBAKdVDoG7mdyAI5xSuCUrRQBwC/P+PNj8//02tVoNt2/B9H57nodvtwvM8CCHgui5SqVQskUjUbdve6d+8tLQEAFq5XA5WVlYKZ2dnn6+vr8vp6Wk+NTX1cmFh4TlLJpO/WJaFoaEhSCnBOY+IOOfgnCOdTiORSDyzbfvLfoJyuQxcC9FsNr9utVqrnueh3W6j1Wr9trW19RWbnJxELBZDPp/vWe/a277vRxgZGUEqlcLe3t6dMqytra3t7u5+v7GxAcdxsL29Dc/zPhsfHz9i+Xz+qRACuq5DKRW5IySSUqJYLPJ0Ov3qPp3r9fonjuMgHo8jFovBNE0IIfjR0dEoq1arODw8RKPRABFF+ocQQiCVSiEej9+byEaj8asQ4m0ulwPn/AvG2C6Al81mM8Ysy9pMJpOwLAtEBNM0I3DOYZomMpkMksnkMwC3cjA7OwsAWqVSWQWwOjMzM3R1ddXUdX21Wq3+DACMMQZN0wa93lcXhmGAc37fBSK3CyGSjDENQBTMiOip53lwXRdKKXS73Vsyua4L13W5aZoDOahUKreZgkAL7R8RTExMQNM0FAqFyD39CZZSIp/PI5VKYWdn5z8XGmu325uXl5e4uLgYsKfv++h2uyAidDqdgRx8EMHJyQmOj49xenp6y0VCiGjMZDKwLOtRrYIJIb4NW0JIIIS4BcZYTClVfxTB8vLy+vuCzs/PAQBPnjzRAAS1Wu3DCRYXF/P7+/uwbRtEFDW78PSu6yKbzeqWZbm1Wq390M+CYLA/M03T/tQ0Df+Gruv9Y1bX9R8BfPcQgVJqkKBYLOY7nQ4Mw4hcFNZCiGubfnxwcPCgHGNjYzqABICor7BMJrOey+XQ7XajGghJwjoYHR0dGh4e3nyf3tls9h2AnwC8eJTlSqWSViqV7vw2Nzen3bX+BxxQD5I249kcAAAAAElFTkSuQmCC", te = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5godFRgEe5H4BwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAARuSURBVEjHtVRNaFRXFP7u+08mkxknYyxGU6QLEQwuko2LFkRw0UXAhWipWJql4LIEdCtuulfpYlZCbBdt0YKWLixIS2mLhVStEtJGOpSYZGbMOPPm3fvuOaeLyRsnpkY3PXC479537v3e+b77PYW+qFQqO0XkwdLS0s7V1dXrV69e/QCviNnZ2VPMPBfHMdI07aW1FlprRFGEYrEIr39To9EAM6NaraJarWK7ePjwIZgZnU4HWmsYY6C17qWIwPf9zQDtdhvMjHq9jpWVlW0BBgcHPWaG4zjwfR/GGPi+jzAMobUGM8N13c0ASikopeC6LlzX3RZgamqqxcytJEliIhJrLay1YGakaQrP85DL5TYDZCEieF2cOXPmJjPvSpJEAMBxHGQjEaFYLKJQKGwGEJHe4UqpbQFOnjw5yczntNZGay1aayRJ0tMiTVMQ0X938CZdDA8PH2Tm00mSIAgChGGIMAxhjIExBkQEpdRWgOzLX9dBoVCoE1HL87w4CAIxxiCKoh6AUgqe520V+U34B4BWq3WTiHbFcSwZNZkHjDFg5q0d9GvwOqCxsbFJZj4Xx7FJ01TSNIUxpmc413URRRG8SqWiZmZmBAAmJyfje/fuyQY9tv/A8+fPq0uXLvVQa7XaQWY+nTm5X1xjDESkS9HMzIxcu3ZteHV1VW7cuLGnVCo5Gy3mLly4MCgiOcdxmhcvXtT9gNVqtZ75oP8WZRRllHkb3H+aJMnHy8vL6/fv3y9Vq1UMDAy8v7i4uDQ+Pp6Loug0gK/6Ae7evXsTwC4A23LpAcDIyMg79Xrdb7Va5cePH6PRaMjQ0FBYLBZ3TkxMoFQqlV7eeOXKlUlmPpckibHWirUWRARmBhEhiqIXRisUCl/k8/nd+/fvP7CwsIC1tTVEUYTR0VHkcrnb5XJ5/mWAR48eHch80P83zdJxnK7It27dUocPH/7szp07T8Iw/LpWq0VBEKjx8XEcPXr0geM4x0+cOJFcvnxZnT17tkfH/Py8IaIe7y+ntbYrdMbhkSNHvp2bm5s6duzYrxMTE1Gz2by9b9++49PT00l2i/s7OHTokEtEaLfbm66ntRbGGARBgHw+jy12/eGn395d+uvPsmV//qMPpxdfJd4vv9eGvvum8l6z2bRaa7E2RWpT2NTCaI1CcRh794xBzc5+cmq9sQLdWVeA5fra02dkyfrh4IDnh3lrSawlWCIQEawlMLPTieOk8az+HHBAxCBLIOJunQD1RhPWAh4gc4HHCAYsIp+xI1fubiABMYPIhSUFYgdEbnedGFQI8NboMIjlxRoxLAmYBStrz/Dk72V4Qga7d3Tw9kgbe8sEKx5EXAg8MAIwPIg4EHgQuOCNFHHB4kFUVtsdRVyI8vDjz3/g8y+/h+e6PpqdAEtPA6y3GcQKxAAxg0VAbMGswALwxjsWgFiBGWBRvWeS7ihwsLD4D7RO4SnHu95KPDSbAWpNhqUX2d86sYCJkWbz3vpGrZXenBlYq69DmxT/e/wL/opRMma51lkAAAAASUVORK5CYII=", nt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAYCAYAAAARfGZ1AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5godFR8VXmBOMgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAItSURBVEjH7ZS9SitBFMd/M9nZddeYysYnCKQQsbTwMRQEbS1TpEsl+BIWwcLGMpXahBSCrVpY+ggJWiyus9mZc4uwMblJ7kW44TYeGM58nPnPf84XrFDUw8PDeKIUSqmvg6n1Iv03252dHfQqmf+Afw9caz0TtLlMUAqt9ffAtdZEUUSlUiEMw6XAYRiitZ7oP4KXF2q1Gi8vL7TbbVnGLggC4jim2WzKzc2NGGMwxsz9VJfG1WoVgG63K5eXl/L+/g6AMYYwDGeGMYYgCNjY2KDT6XB6eiqvr6+EYUilUvkikSQJxhienp7o9/tirSVJEoIg4P7+Hu89IjLRIjIhk6Yp1WqV4XBIs9mUvb09Wq2WSpJk7I1er8fd3Z0Mh0OcczjnKIqCoijw3lMUxWRvWk/blXtZlqG15uTkhLOzM6XLL/4LERG01qyvr4+ZPz4+EkURz8/P9Ho9sdby9vaGtZbj42MlIgAz7jHGUKvVuLi4kMFggLWWNE3Z39+n1WqptbU1Go0GQZZljEYjtre3qdfr6vb2Vvr9PlmWsbu7i/d+rimVPr+6uiJNUzY3Nzk/P1eNRgPnHHmej+0AiqIgTVOiKOLg4EBtbW1xfX0t5VnJfjrVnHMMBgMODw85OjpSIjIBXdpyy8Kw1hLHMdbameKZLrSPjw/iOMY5N0dgYcv13vP5+YnWmjzPJ5d+D1ye5xhjyPMc7/3CAC9Nk2lfL8uMRQ//9PP/C75S+QX3zx/c9r2O6AAAAABJRU5ErkJggg==", ht = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAXCAYAAAARIY8tAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5godFR8FQ9deVgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAJgSURBVEjHtZW9TutAEIW/2V175QSQIvESUIUiEhQ0gISAJ0C8AM/AA1AlbwANBQUtDRIFEgWiTIEoqCkoKAIyRrZ37Vs5yr0Xx7k/jORmd2fPnOOZs/DNIQDD4bDxYBiGXFxclO12m729PcmyrDGn2+1iZqlCa02SJJydnaGUYnNzkyAI8N435iqAsixrvwpgMBiURVGQ5zmDwaDUWjNLrmqqwBjD09MTd3d3RFFEq9Xi9vaWx8dHjDH/xkBEEBH6/X7ZarXQWqO1Zm5ujn6/X1b7jQzqDmituby8LF9eXrDWYozBGIO1ltfXV87Pz0ut9d9JpJSiKAqurq5YWlqi0+mMARYXF1leXubm5obPz0+Uqle6VsSKwenpqRhjuL6+5uTkpAQ4PDyUXq+H954kSZjWsqa67CuANE3x3hMEAXEcU3XO+/s7cRzjnMM592V+I0C1XlXnnBsD5HmOc45Zhs3MPPIi47acpvkfMZhkIiJjBpOt+d8YKKW+h0F12SSDSVZNTMw0zcMwRER+YyAiKKUIwxCALMsoiqLeru/v77+sXGvN0dFRORqNmJ+fZ2FhAYDRaMTHxwftdpvj42OphvLXWF1drbcK7z0iwsHBgURRRBiGP1lFFEXs7++LtRbvfa1VTP3JeZ7T6/V4fn7m4eFhvN7pdFhbW2N9fZ23t7dmN62LoihIkoTt7W2x1o7d1FrL7u6uJElSq/3MD06WZYRhyMbGhlQAW1tbYq0lTdPGB6exTcuyJEkSVlZWGA6HGGPodrvEcdxY/cyD5pwjz3N2dnYkCALSNMU5N9Og/QC/FsDpo71BjQAAAABJRU5ErkJggg==", ee = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gsEBhoGqbjXJQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAH3SURBVDjLhZGxSxthGMZ/392l+b6E4IUQjENRQulWKXUwcwJZ8idk0D2IiIMdm03o0MnJ1aXQRSHF+AcEkiWEQFECwSXoZsPlcrnz9OsQsbWk12d83/f78T3PIzzPYzab0Ww2db/fx3EcTk4+cX+/hGEYSKm5vPSFlCyUcByHo6MjnclkKBaLIp1Os7xs662t72xufmB3d4Xr65lIpRYDrFarpaWUVKtVIYQAwDAEGxtvGY1+IMQKUbK63S7lcvn5MYBSmoODN/j+6/mR9W+AMR6PyWazL4bDoS+urgKxvV1nOPwplIoAJBIJJpPJi6FSYNuaVCrENP1IC0Y+n6ff7+tFS9M0CcMwOoNisShWV20dBFIDJJNwezsTlgUPDw9YUQEAhm3bBIGkVvvK4WGLIADHcQEIw/C/AOF5HkpJ3Wg4DAYD9vffU6t9ZDq9e8pD8WdDAFJK1tbWqFQqQnieRy4n9Xg8X6ZScHMzE6YJe3t7ul6vi1gs9gLgui69Xk+3220smHte9L1YLIZlWai/elRKUSqVRKPR0JEGk8kkruuSSCSeMoFcTmp3HhHx+BeMKEA+n2cwGDxX/PgIQQCnp3fs7HzD9+PRgEKhwPn5OaPR6Nm71pqLiybr6+9+txClTqejz87OmE6nmOYrjo8/4/vzUJeW4BekTMTiOlyMpQAAAABJRU5ErkJggg==", ie = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gsEBhg0U1nkJwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAVmSURBVEjHnZZ/bFRVFsc/97038yZt2pIR2rHVgtVIoUVaqltogc1KChi2SxWTyg9rXAm7sBQ3m2DxH3c1cesvdpc/tkYbzXajgQ2GhWUJidUWSBzETdu1nU7XKUVDS7E/7I+0M/Nm5r53/WOKtEo36klO3nv3JeeTe+73nHtEMBjkVqZpGpcuXVKBQICamhqh6zo/xrRvLwghMAyD48ePq6amJoaGhqmrq1MTExP8GMgcgK7rSCk5cuSICnR3c/jwYepf/D3lZaXs27dfdXR0YJrmDwKIGylyuVwMDg7S0NCgMjMz+dWePRQUZIOIM3RtlFOn3+eNxmNs21YlduzYgWVZGIaBUgop5bwAQwiBaZp0dnZy9OhRtXJlEVu3bmH58myQY+BYZPk0dlY/iNtl8+bbJ9XV/gEO1O4X3d0BPB4PubmL599BT08PFy5cUH6/n5VFxWx/rAqfLwXiQ6ASMx4DXYBy8c6xVt491sySJfeK6emwysvLFdu370IpdeszaG9vx+/3U1r6E37z6134fDrE+sEJgzMNahpUBBJjYF9nV80afrv357S0fKjuK1xMW1uHsm17/kMOBALK4/Gwd+8+3K5RsAaSwVVkxmdATgTkJIT7uOP2VLZWbuB3Tz9BaoqLoaGh+QH5+flifHwc5VgQH0kGUhFwpoBw0o0oGBEwokx+NUrj31t48okqdEPnF5XraG9vU/MCCgsLCQQCTE6MAzaoaezEFIHgVXp7B7jcO8iVUD9XQgNc6R3gHye78N2+hGUFS8GZYn15IRcv+tF1HU3TEELMVVFKSgq5ubm0trbw8Ja7wQkzPTXNC6+eR9MN0lJTuDY4hOPYaMJB1zVOn/oDJEZBRbkjexFdXZ2MjIxgejyYbjcul+smQClFSUkJ7zefZ+uW+9BUhIw0ya5Hcgl+7uHQoToQCoiDkwAVB3sS7HFQMYTupmLD/ex+qkatKVtPWVm5KC4uxjRNhBDJQguFQhw8eFCFus9C5Aw4cWxp8dwrn/LTDVVsrPgZyC+TEBUHxwIVTb6LFKRKIWaF+W9XH3975wNOnPyI8rLVrFv/oBDBYBDbttm8ebNqPvMmy5ZcBXkdiDMyGmHPM1281fga3gVmcl3FZjw+80yASAA60nETi5tEohYPrK/D681O9iLDMFi1ahVnmz8GYyHoOugmi7IyOLj3HnbveRbbUSD0GelGZ8l4GuwJcCIY6QuYnApTVf0yFRsrqX/pZWEAKKVYu3Yt/z5zml/uLEWou0FJhJIszfeB6qGv73PuzUufCT57F3HQMyH9Nuqff4//dFyjattusXp1KT6f72azGx4epubxx1XRyjySQnNAObhNg87AF/jPN+FNHQV7GJjJv5LJFLlX8FRtI25PDkXFa0R5+RpM00RKiXFDTpmZmeyvrWVsfBK4qeXQZyHy7lJ4vR6IfgmaBu6FEBuHxGCy4yt4u6mZU6f+JVasKCQej33TYY3ZRVFdXS1mF4qmadTX/1FVPrQONAkZ2RCV/K9nlPzlOSDiEB8FEui6RkHBMiwrOrfQZn+Ew+E5P2OxGK0tH/Dai9V80ddPW3svCSm5fOUrcj5x8WhlEWnpAlQCx3GwLAtN0+YHfNs6Ozu5fn2Q1nNtBD7r58Q//eTk3ElJyQP8tfE9EnGbTRvuYfFdCsMwkFLidru/P6C7u5vUtAW8euQ0FRs3i4aG1/F6b8O2JZs2VVB36JAKhgY5sPt+TPPWADHfVAEwNjaGrutkZWUhpcS27W8ulhvDwZ/+/BfV3naOrq7LtLScF+np6f9/qphtXq+XjIwMLMtCSjnn1lJKkUgkePpAraip2SdSU9O+k3+ArwHn+YKuY70hbgAAAABJRU5ErkJggg==", se = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKzSURBVEiJtZTbbtpAEIa/9XqdcAEXEQoHoQhkBVXKde7yEH2Kvg9v0su+CFKFAnYSSDlUqQISyBh7etOlNnbP6kgje9fjmf//Z2eViPA/zc0ulFJngPePOfciEh1XIoKIMBwO322321kcx/Ivvt1uZ8Ph8J3Nq0QEpVRls9mMtdatNE2zjH4LclZmx3FIkuRTtVr1RWRnJTrzPK+13++PSZ+fn5nNZtRqNdbrNa1Wi06nA0Acx4xGIxaLBXd3d3jed1WTJMHzvBZwBuwcC9ZSsj4ej7m5uaHf72OMYTweH5EaY/B9P4f89H9AAeQKWPRKKaIowvM8FosFzWaTJElIkqSQ8FROpVRpAecUgfX5fM7l5WXpt5+5zW17oE4RiQgvLy/UarWCBD+Q5PRZlCgbYIwhDEPa7Ta2+Y7j/Ap1oQc5BlnzfZ+Hhwcmkwnr9Rrf91FKsdvtCMOQw+GAiDAajdBa0+12qVQqBQa2uc31ev0pSZLc2f+bORARtNbUarWWiMwtAydN08Kp+JN7KivRt2H9cZOVUhwOB+7v71kul9ze3nJ+fn5MtlqtmE6nVKtVNpsN7XabRqPx6znImtaaXq9XyiIMQ/r9Pr7vo7UmCIIyNvkCVqLf8f1+j+u6LJdLGo0GURTlvn+T6O8LWF+tVlxcXBT2swWOTS6Touyc2/3X11eq1WppXHaSjwxKNCy8W3Ndl+l0SrPZJI5jjDFlceWDJiJEUcTT0xNWtslkgtaaTqdDpVLh6uqKx8dHgiBgs9nQ7XbLroxcgTQIgs+9Xq8O4Hkevu8DcH19nYOVpin1ep16vV7YtxYEwWfg+zAA88Fg8CEMwy+O46C1xnVdXNfFGIMxBs/zcm73bZzWGsdxCMPwy2Aw+ADMc9IopW6At8CbTOE/tRT4CLwXkWGuwP+yr0z0vLd4EzkyAAAAAElFTkSuQmCC", oe = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAIPSURBVDjLtZLLTxNRFMa/O52ZPsYqtCQgI6WhQCRBCwm+GqguTBOJIXHpxoV7+QOIJYgSEg0mdmliAltNSGShCza2IiEQqcuKGmamWF4akxbL9HlctKClBbvQb3Vzc37nfOcB/G+xgx/EgQEglq8CIANEWGABkEQSaZY7shiJJLvGhRAUKEKodZxkEo8MH/UKQai2oGfKM2ULQhWCo95yhO07bzBNks3/6m4UOwCOPWi630/xrds10YrGyNzhx/LYMHWF3VCghN3UNebHcts9MpdGcsX8ktoqR4YWkLCLUKHaRSSGFuWI1g4rcX8CfNGYOWVtWcE3bhp5bAPNT8HNDrZosU6YSifJ7z9SG7sArQPIArQJ1OQ2daN+0HwBIOgnVa0Z7MPrjHDOAyy9EbMdedVRr0EHlfXA8ti5pqbsFy67ZxwhpJF2hM6+7LuYsp//hETpzvcspZ4szDuXfL2ZuTmaB5Dpvb7ow1b310NPg4wfbwz0rHSLP2s14IcjLUFD1rn69vmpNaZXAAA6kbkacD2TlXqgff1WzKdPShM9vDDxcPD9b6T0+Hi0wYVaANtQ8D13ptMbaeTrHj+6E2Zl89qDODKQobAsMq3ddPoR4F8ELpGxQoUK+PGNgb6mz3V84+zIlS8sWxzr4WLxhpl30dMxbjUpVVUBAMi625+3SNOIM/p7dAERyURVpP43+gWF+ca8/eA5yQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMH81V5MAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDAOaO8vAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==", ne = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAH1SURBVDjLtZLNaxNRFMXPm7yZfBGtMWhM/AjEig12UailsRhciJ9Q7MKFmy6617/AAa2VglLBbAShEBdFUFAQBMFVKhZRW3faiNJkWpNSESS16SRtclzEJqaJMQt9y/vO797DPRf4309sLlCBAEBRagGgBRoccADIIYeCKDYdRo3+4Kg6iSSS6uT+UfqpNZUPR9Q4Uu54X6wv5o4jpcaHI/WIqDj32mJ0X36qv8ciAO+10MhZZpeG2uYbGqO9Q8fMdZ0hSgoKSoZGdMy0X6W9kVyhx3HPN8FeykpNstc3Yb3PHVR+18pfxux5VzCBWZGoen0WDhqZTthqN1npKPMZE8SH6leR6VWrudlNGSDMXSljH1y8i43AFFgHAl4DJlgHiBJ/nE7d6eg5/3ocKygBUOA8PFTY3vMGy7WZb1jK3341FXh78sja1GMsA3CFz02fwlLXlz+eBq2Jgf7uj13aSpsBfN9bcMLAemDuxYPdC8JsAADcunY8Ghz3J3cCBzKD6RNmzDnWLdWxG5emq0jt8Um0I4htAL4iiW/FzkORWZ/03Lp58Z2o21c1RAst5bBoW7gQ0BGVD6NhWhtMaIBvWew/uueTR/qeXzn2WawDSnNAZL1PXs4fTCtzOWdLEwCArtUzJYfzEbKCf1eXEY02ttD637yfWKq5q2bQBKcAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDB/NVeTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwDmjvLwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=", he = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAIBSURBVDjLtZLLaxNRFMa/O5lXZhi1aag1sRocUxSsUKjFhhpciI8uCoIupODCvf4FxketFJQKZq3QLIqg4ELQjZtO1eLC1o2L1gdNZmoqFSmkNZ1ckxwXCW3TjDULPZsDl+93z8f5DvC/i21+IAEMALFyAwD5IEODBiCPPDgrbTmMZAqbw9IE0khLE/uHKUzylvLBuGQhE7BiqVgqYCEjWYPxeoStOW9VRymQeHHVwQoY9KG2W32UW7y0w/E0Rv6DCUzfvka9HdfhwKF2OjyUwHT0Jvm95AIFtVRojHooig8YxzjtI4WOhsaUR9RCwkatUDXmLximjVks8wfg4ADKmDFtbkCt3eQaLRYWXJSwJD2vAgBlVxV3s5sKQHB3Zey9MACUqoAAw4m02HBBdQArY+VMhjd3n4cGERwcIrQj53hz9ycs12YuVnvh/tvJyLtTvcXXFk0CUGMDU6ex2Pn1j6dByuzZ/q6PnfLPJhtY2sN12ChG5l493j3PXA8AoO2/TiTNh+H0TqB94WL2pDuqj3SJ0sidK1PrSO3xiYjCRBOA70jjR6njUHwmJAbv3b38ntXtaz1EH/kqYZE6fyGSQFJ8kuwhxWOCB77tW/+xts9BMfTyxvEvrLghOO9iudZnb5wDWWEurzc0AQDIWO0ra/pT5Bj9XV1BZFKpga//Tf0Gp9/DBQB2y1wAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDB/NVeTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwDmjvLwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=";
function tt(i) {
  this.point = i, this.contextMenu = null, this.updateContextMenu = () => {
    this.contextMenu && (this.contextMenu.destroy(), this.contextMenu = null), this.initMenu(), this.point.contextMenu = this.contextMenu;
  }, this.initMenu = () => {
    this.point.element && (this.contextMenu = Z.create([
      {
        id: "i" + this.point.guid + "_drag_horizontal",
        title: this.point.dragHorizontal ? "Disable move horizontally" : "Enable move horizontally",
        image: nt
      },
      {
        id: "i" + this.point.guid + "_drag_vertical",
        title: this.point.dragVertical ? "Disable move vertically" : "Enable move vertically",
        image: ht
      }
    ], this.point.element), this.point.options.canDelete && this.contextMenu.addItem("i" + this.point.guid + "_delete", "Delete point", ot), this._setEventListeners());
  }, this._setEventListeners = () => {
    this.contextMenu.on("click", (t) => {
      switch (t.itemId) {
        case "i" + i.guid + "_delete":
          a.emit(g.POINT_DELETE_REQUEST, this.point);
          break;
        case "i" + i.guid + "_drag_horizontal":
          this.onDragHorizontalClick(t);
          break;
        case "i" + i.guid + "_drag_vertical":
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
function re() {
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
  }, this.x = 0, this.y = 0, this.element = null, this.guid = V(), this.subscriptions = {}, this.dragHorizontal = !1, this.dragVertical = !1, this.init = (i, t, e = null) => (this.x = parseInt(i), this.y = parseInt(t), this.setOptions(S({}, e)), this.setEventListeners(), a.emit(g.POINT_ADDED, this), this), this.setOptions = (i) => {
    if (i && typeof i == "object" && (m(i.moveDirections) && typeof i.moveDirections == "object" && (this.options.moveDirections = []), this.options = S(this.options, i)), Object.assign(this, new tt(this)), !this.element)
      (this.options.createDOMElement && this.options.canDrag || this.options.forceDisplay) && (this.element = this.createPointUI(), this.setDOMEventListeners(), this.updateContextMenu(), a.emit(g.POINT_ADDED, this));
    else if ((!this.options.createDOMElement || !this.options.canDrag) && !this.options.forceDisplay && this.element)
      try {
        this.element.parentNode.removeChild(this.element), this.element = null;
      } catch {
      }
    this.options.id && this.element && (this.element.id = this.options.id);
  }, this.createPointUI = () => {
    const i = document.createElement("div");
    return this.options.canDrag ? this.setPointStyles(i) : i;
  }, this.setPointStyles = (i = null) => {
    if (this.element || (this.element = document.createElement("div"), this.setDOMEventListeners(), Object.assign(this, new tt(this))), i == null && (i = this.element), this.options.id && (this.element.id = this.options.id, i.id = this.options.id), i.className = this.options.classes, i.style = this.options.style, typeof this.options.style == "object")
      for (let t in this.options.style)
        i.style[Pt(t)] = this.options.style[t];
    return i.style.width = this.options.width + "px", i.style.height = this.options.height + "px", i.style.left = this.x - parseInt(this.options.width / 2) + "px", i.style.top = this.y - parseInt(this.options.height / 2) + "px", i.style.zIndex = this.options.zIndex, !this.options.canDrag || !this.options.visible || this.options.hidden ? i.style.display = "none" : i.style.display = "", i.style.position = "absolute", i;
  }, this.redraw = () => {
    (this.options.canDrag && this.options.createDOMElement || this.options.forceDisplay) && (this.element = this.setPointStyles());
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.rotateBy = (i, t, e) => {
    const [s, o] = O(i, this.x, this.y, t, e);
    this.x = s, this.y = o;
  }, this.setEventListeners = () => {
    a.subscribe(W.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange);
  }, this.setDOMEventListeners = () => {
    !this.element || (this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown), this.element.addEventListener("mouseover", this.mouseover), this.element.addEventListener("mouseout", this.mouseout), this.element.addEventListener("click", this.click), this.element.addEventListener("dblclick", this.doubleclick), this.element.addEventListener("mousemove", this.mousemove));
  }, this.mousedown = (i) => {
    a.emit(g.POINT_MOUSE_DOWN, this, u(i)), i.buttons === 1 && this.options.canDrag && (a.emit(g.POINT_DRAG_START, this, u(i)), st(i));
  }, this.mousemove = (i) => {
    if (a.emit(g.POINT_MOUSE_MOVE, this, u(i)), i.buttons !== 1 || !this.options.canDrag || !f.draggedShape || f.draggedShape.draggedPoint !== this)
      return;
    const t = this.x, e = this.y, s = _(this.element.parentNode, !0);
    if (!this.checkFitBounds(this.x + i.movementX, this.y + i.movementY)) {
      a.emit(g.POINT_DRAG_MOVE, this, u(i, { oldX: t, oldY: e }));
      return;
    }
    let o = i.clientX + window.scrollX - s.left - this.options.width / 2, n = i.clientY + window.scrollY - s.top - this.options.height / 2;
    [o, n] = this.applyMoveRestrictions(o, n, t, e), this.x = o, this.y = n, this.element.style.left = this.x + "px", this.element.style.top = this.y + "px", a.emit(g.POINT_DRAG_MOVE, this, u(i, { oldX: t, oldY: e }));
  }, this.mouseover = (i) => {
    a.emit(g.POINT_MOUSE_OVER, this, u(i));
  }, this.mouseout = (i) => {
    a.emit(g.POINT_MOUSE_OUT, this, u(i));
  }, this.click = (i) => {
    a.emit(g.POINT_MOUSE_CLICK, this, u(i));
  }, this.doubleclick = (i) => {
    a.emit(g.POINT_MOUSE_DOUBLE_CLICK, this, u(i));
  }, this.checkFitBounds = (i, t) => !(this.options.bounds.left !== -1 && i < this.options.bounds.left || this.options.bounds.right !== -1 && i > this.options.bounds.right || this.options.bounds.top !== -1 && t < this.options.bounds.top || this.options.bounds.bottom !== -1 && t > this.options.bounds.bottom), this.applyMoveRestrictions = (i, t, e, s) => (t > s && this.options.moveDirections.indexOf(E.BOTTOM) === -1 && (t = s), t < s && this.options.moveDirections.indexOf(E.TOP) === -1 && (t = s), i > e && this.options.moveDirections.indexOf(E.RIGHT) === -1 && (i = e), i < e && this.options.moveDirections.indexOf(E.LEFT) === -1 && (i = e), i > this.options.bounds.right && this.options.bounds.right !== -1 && (i = this.options.bounds.right), t > this.options.bounds.bottom && this.options.bounds.bottom !== -1 && (t = this.options.bounds.bottom), i < this.options.bounds.left && this.options.bounds.left !== -1 && (i = this.options.bounds.left), t < this.options.bounds.top && this.options.bounds.top !== -1 && (t = this.options.bounds.top), [i, t]), this.mouseup = (i) => {
    a.emit(g.POINT_MOUSE_UP, this, u(i)), i.button !== 2 && a.emit(g.POINT_DRAG_END, this, u(i));
  }, this.onBoundsChange = (i) => {
    i.points.find((t) => t === this) && (this.options.bounds = i.bounds);
  }, this.toJSON = () => JSON.stringify(this.getJSON()), this.getJSON = () => ({
    x: this.x,
    y: this.y,
    options: S({}, this.options)
  }), this.fromJSON = (i) => {
    let t = i;
    if (typeof t == "string" && (t = Q(i)), !t)
      return null;
    this.x = t.x, this.y = t.y;
    let e = !1;
    return this.element || (e = !0, this.element = document.createElement("div")), this.setOptions(t.options), e && a.emit(g.POINT_ADDED, this), this;
  }, this.destroy = (i = !0) => {
    this.element && (this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), this.element.removeEventListener("mouseover", this.mouseover), this.element.removeEventListener("mouseout", this.mouseout), this.element.removeEventListener("click", this.click), this.element.removeEventListener("dblclick", this.doubleclick), this.element.removeEventListener("mousemove", this.mousemove)), i && a.unsubscribe(W.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange), i && a.emit(g.POINT_DESTROYED, this);
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((s) => a.unsubscribe(t, s)), this.subscriptions[t] = [];
  }, this.addEventListener = (i, t) => {
    typeof this.subscriptions[i] > "u" && (this.subscriptions[i] = []);
    const e = a.subscribe(i, (s) => {
      s.target && s.target.guid === this.guid && t(s);
    });
    return this.subscriptions[i].push(e), e;
  }, this.removeEventListener = (i, t) => {
    this.subscriptions[i] && typeof this.subscriptions[i] < "u" && this.subscriptions[i].splice(this.subscriptions[i].indexOf(t), 1), a.unsubscribe(i, t);
  }, this.distance = (i) => P(this.x, this.y, i.x, i.y), this;
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
function ae(i) {
  this.rotateBox = i, this.subscriptions = {
    rotate: []
  }, this.initialAngle = 0, this.previousAngle = 0, this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    this.interceptEventsFromShape(), this.rotateBox.shape.points.forEach((t) => {
      t.mousemove = this.mousemove, t.mouseDownListener = t.addEventListener(g.POINT_DRAG_START, (e) => {
        this.onPointMouseDown(e), a.emit(l.POINT_DRAG_START, this.rotateBox, { point: t });
      }), t.mouseUpListener = t.addEventListener(g.POINT_DRAG_END, (e) => {
        this.onPointMouseUp(e), a.emit(l.POINT_DRAG_END, this.rotateBox, { point: t });
      });
    });
  }, this.interceptEventsFromShape = () => {
    l.getShapeMouseEvents().forEach((t) => {
      this.shapeEventListeners[t.name] = this.rotateBox.shape.addEventListener(t.name, (e) => {
        t.key === "SHAPE_MOVE_END" && (this.previousAngle = 0), a.emit(t.name, this.rotateBox, e);
      });
    });
  }, this.mousemove = (t) => {
    if (t.buttons !== 1) {
      a.emit(
        l.SHAPE_MOUSE_MOVE,
        this.rotateBox.shape,
        u(t, { clientX: t.clientX, clientY: t.clientY })
      );
      return;
    }
    const [e, s] = j(t, this.rotateBox.shape.root), [o, n] = this.rotateBox.shape.getCenter();
    let h = this.calcAngle(e, s, o, n);
    if (h === null)
      return;
    let r = h;
    this.previousAngle && (r -= this.previousAngle), this.previousAngle = h, a.emit(G.ROTATE_BOX_ROTATE, this.rotateBox, { angle: r });
  }, this.calcAngle = (t, e, s, o) => {
    const n = this.calcHypotenuse(t, e, s, o);
    if (n <= 0)
      return null;
    const h = this.calcCathetus(t, e, s, o), r = this.calcStartAngle(t, e, s, o);
    return Math.round(At(Math.asin(h / n)) + r + this.initialAngle);
  }, this.calcHypotenuse = (t, e, s, o) => P(t, e, s, o), this.calcCathetus = (t, e, s, o) => {
    if (t <= s && e <= o)
      return P(t, e, t, o);
    if (t >= s && e <= o)
      return P(t, e, s, e);
    if (t >= s && e >= o)
      return P(t, e, t, o);
    if (t <= s && e >= o)
      return P(t, e, s, e);
  }, this.calcStartAngle = (t, e, s, o) => {
    if (t <= s && e <= o)
      return 0;
    if (t >= s && e <= o)
      return 90;
    if (t >= s && e >= o)
      return 180;
    if (t <= s && e >= o)
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
    this.rotateBox.shape.points.forEach((e) => e.setOptions({ visible: !1 }));
  }, this.onPointMouseUp = (t) => {
    this.rotateBox.shape.points.forEach((e) => {
      e.setOptions({ visible: !0 }), e.redraw();
    });
  }, this.addEventListener = (t, e) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const s = a.subscribe(t, (o) => {
      o.target && o.target.shape && o.target.shape.guid === this.rotateBox.shape.guid && e(o);
    });
    return this.subscriptions[t].push(s), s;
  }, this.removeEventListener = (t, e) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(e), 1), a.unsubscribe(t, e);
  }, this.destroy = () => {
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((s) => a.unsubscribe(t, s)), this.subscriptions[t] = [];
    Object.keys(this.shapeEventListeners).forEach(
      (t) => {
        this.rotateBox.removeEventListener(t, this.shapeEventListeners[t]);
      }
    ), this.rotateBox.shape.points.forEach((t) => {
      t.removeEventListener(g.POINT_DRAG_START, t.mouseDownListener), t.removeEventListener(g.POINT_DRAG_END, t.mouseUpListener);
    });
  };
}
const G = {
  ROTATE_BOX_ROTATE: "rotate"
};
function le(i) {
  this.resizeBox = i, this.subscriptions = {
    resize: []
  }, this.guid = V(), this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    a.subscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), a.subscribe(g.POINT_DRAG_END, this.onPointDragMove), l.getShapeMouseEvents().forEach((t) => {
      this.shapeEventListeners[t.name] = this.resizeBox.shape.addEventListener(t.name, (e) => {
        a.emit(t.name, this.resizeBox, e);
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
    const e = this.resizeBox.getPosition();
    this.resizeBox.calcPosition();
    const s = this.resizeBox.getPosition();
    this.resizeBox.redraw(), a.emit(l.POINT_DRAG_END, this.resizeBox, u(t, { point: t.target })), a.emit(w.RESIZE_BOX_RESIZE, this.resizeBox, u(t, { oldPos: e, newPos: s }));
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
  }, this.addEventListener = (t, e) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const s = a.subscribe(t, (o) => {
      o.target && o.target.guid && o.target.guid === this.resizeBox.guid && e(o);
    });
    return this.subscriptions[t].push(s), s;
  }, this.removeEventListener = (t, e) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(e), 1), a.unsubscribe(t, e);
  }, this.destroy = () => {
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((s) => a.unsubscribe(t, s)), this.subscriptions[t] = [];
    Object.keys(this.shapeEventListeners).forEach(
      (t) => {
        this.resizeBox.removeEventListener(t, this.shapeEventListeners[t]);
      }
    ), a.unsubscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), a.unsubscribe(g.POINT_DRAG_END, this.onPointDragMove);
  };
}
const w = {
  RESIZE_BOX_RESIZE: "resize"
};
function pe() {
  this.draw = async (t) => {
    const e = t.getParent();
    await this.initSvg(t, e), !(t.points.length < 1 && typeof t.options.svgLoadFunc != "function") && (t.options.hasContextMenu && t.shapeMenu && !t.shapeMenu.contextMenu && t.shapeMenu.updateContextMenu(), this.updateOptions(t), this.drawShape(t, e), a.emit("show_finish", t));
  }, this.initSvg = async (t, e) => {
    !e || e.guid === t.guid || !e.options.groupChildShapes ? this.initRootSvg(t) : this.clearSvg(t);
  }, this.initRootSvg = (t) => {
    if (t.points.length || typeof t.options.svgLoadFunc == "function") {
      if (t.svg)
        return;
      t.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), t.svg.ondragstart = function() {
        return !1;
      }, t.options.visible && a.emit(l.SHAPE_SHOW, t), t.eventListener.setSvgEventListeners(), t.svg.id = t.options.id, t.svg.setAttribute("guid", t.guid), t.root.appendChild(t.svg);
    } else
      try {
        t.eventListener.removeSvgEventListeners(), t.svg.innerHTML = "";
      } catch {
      }
    if (t.svg && typeof t.svg.appendChild == "function" && typeof t.options.svgLoadFunc != "function") {
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
      let s = t.getPosition(t.options.groupChildShapes);
      t.svg.style.position = "absolute", t.svg.style.cursor = "default", t.svg.style.left = s.left + "px", t.svg.style.top = s.top + "px", t.svg.setAttribute("width", s.width), t.svg.setAttribute("height", s.height), t.svg.style.width = s.width + "px", t.svg.style.height = s.height + "px", t.svg.style.zIndex = t.options.zIndex;
    } else if (e && e.svg) {
      const s = e.svg.querySelector("#p" + t.guid + "_polygon");
      s && (s.style.zIndex = t.options.zIndex);
    }
  }, this.updateVisible = (t) => {
    typeof t.options.visible < "u" && (t.svg.style.display !== t.options.visible && (t.options.visible ? (a.emit(l.SHAPE_SHOW, t), t.getChildren(!0).forEach((e) => a.emit(l.SHAPE_SHOW, e))) : (a.emit(l.SHAPE_HIDE, t), t.getChildren(!0).forEach((e) => a.emit(l.SHAPE_HIDE, e)))), t.svg.style.display = t.options.visible ? "" : "none");
  }, this.drawShape = async (t, e) => {
    if (!e || !e.options.displayAsPath) {
      typeof t.options.svgLoadFunc == "function" ? await this.loadExternalSvg(t) : this.drawPolygon(t), t.svg && f.isNormalShape(t) && this.setupZIndex(t);
      return;
    }
    this.draw(e);
  }, this.updatePoints = async (t, e) => {
    t.points[0] && !t.points[0].element && await Rt(1);
    let s = e || t;
    t.points.filter((o) => o.element).forEach((o) => {
      o.element.parentNode !== t.root && t.root.appendChild(o.element), o.options.zIndex = t.options.zIndex + 2, !t.options.visible && !o.options.forceDisplay || typeof t.options.svgLoadFunc == "function" ? o.options.visible = !1 : t.options.displayMode !== A.DEFAULT && (o.options.visible = !0), o.redraw(), f.isNormalShape(s) && ((s.options.displayMode === A.SELECTED || o.options.forceDisplay) && s.options.visible && typeof s.options.svgLoadFunc != "function" ? o.element.style.display = "" : o.element.style.display = "none");
    });
  }, this.drawPolygon = (t, e = null) => {
    if (!e && (e = this.getShapeSvg(t), !e || typeof e.appendChild != "function"))
      return;
    let s = e.querySelector("#p" + t.guid + "_polygon");
    s || (s = document.createElementNS("http://www.w3.org/2000/svg", "path"), s.id = "p" + t.guid + "_polygon", s.setAttribute("fill-rule", "evenodd"), s.setAttribute("shape_id", t.options.id), s.setAttribute("shape_guid", t.guid), e.appendChild(s));
    const o = this.getPolygonPath(t);
    s.getAttribute("d") !== o && s.setAttribute("d", o), this.setupPolygonFill(t, s), this.setupPolygonStyles(t, s), e.querySelector("#f" + t.guid + "_filter") && (s.style.filter = 'url("#f' + t.guid + '_filter")'), s.style.zIndex = t.options.zIndex, t.polygon = s, e && typeof e.querySelector == "function" && !t.getRootParent() && this.clearUnusedPolygons(t, e);
  }, this.clearUnusedPolygons = (t, e) => {
    const s = Array.from(e.querySelectorAll("path"));
    for (let o of s) {
      let n = o.id === "p" + t.guid + "_polygon";
      if (!n && t.options.groupChildShapes && !t.options.displayAsPath && t.getChildren(!0).forEach((h) => {
        if (o.id === "p" + h.guid + "_polygon") {
          n = !0;
          return;
        }
      }), !n)
        try {
          o.parentNode.removeChild(o);
        } catch {
        }
    }
  }, this.getPolygonPath = (t) => {
    const e = t.getParent();
    if (e && e.options.groupChildShapes) {
      const s = e.getPosition(e.options.groupChildShapes);
      let o = this.getPolygonPathForShape(t, s, this.getMaxStrokeWidth(e));
      return o += this.getPolygonPathForChildren(t, s), o;
    } else {
      const s = t.getPosition(t.options.groupChildShapes);
      let o = this.getPolygonPathForShape(t, s, this.getMaxStrokeWidth(t));
      if (o += this.getPolygonPathForChildren(t, s), t.options.displayAsPath && t.options.groupChildShapes) {
        const n = this.getShapeSvg(t);
        n.setAttribute("width", s.width), n.setAttribute("height", s.height), n.style.width = s.width + "px", n.style.height = s.height + "px", this.createSVGFilters(t);
      }
      return o;
    }
  }, this.getPolygonPathForChildren = (t, e) => {
    let s = "";
    return t.options.displayAsPath && t.options.groupChildShapes && t.getChildren().forEach((o) => {
      o.calcPosition(), s += this.getPolygonPathForShape(o, e, this.getMaxStrokeWidth(o)).toString();
    }), s;
  }, this.getPolygonPathForShape = (t, e, s) => {
    let o = "M";
    for (let n of t.points) {
      let h = n.x - e.left, r = n.y - e.top;
      h <= 0 ? h += s : n.x >= e.right && (h -= s), r <= 0 ? r += s : n.y >= e.bottom && (r -= s), o += `${h},${r} `;
    }
    return o += " Z ", o;
  }, this.loadExternalSvg = async (t) => {
    const e = await t.options.svgLoadFunc(t);
    if (!e)
      return;
    const s = Array.from(e.querySelectorAll("path"));
    if (!s.length)
      return;
    let o = null;
    t.polygon && (o = s.find((h) => h.id === t.polygon.getAttribute("path_id"))), o ? t.polygon.setAttribute("d", o.getAttribute("d")) : (o = s[0], t.polygon = o.cloneNode(!0), t.polygon.setAttribute("path_id", o.id), t.polygon.setAttribute("shape_guid", t.guid), t.svg && t.svg.appendChild(t.polygon)), t.polygon.setAttribute("shape_guid", t.guid), t.polygon.id = "p" + t.guid + "_polygon", this.addPointsFromShape(t), t.calcPosition(), s.splice(s.indexOf(o), 1);
    for (let h of s) {
      let r = f.findShapeById(h.id);
      r ? r.polygon.setAttribute("d", h.getAttribute("d")) : (r = f.createShape(t.root, { hasContextMenu: !1, id: h.id }, [], !1), r.polygon = h, r.polygon.id = "p" + r.guid + "_polygon", r.polygon.setAttribute("shape_guid", r.guid), r.polygon.setAttribute("path_id", h.id), t.svg && t.svg.appendChild(r.polygon), t.addChild(r, !1), f.addShape(r)), this.addPointsFromShape(r);
    }
    const n = t.getPosition(!0);
    t.svg.setAttribute("width", n.width + "px"), t.svg.setAttribute("height", n.height + "px"), t.svg.style.width = n.width + "px", t.svg.style.height = n.height + "px", f.getShapeByGuid(t.guid) || f.addShape(t), t.options.canScale && this.redrawResizeBox(t), t.options.canRotate && this.redrawRotateBox(t);
  };
  const i = {
    DOT: 46,
    COMMA: 44,
    SPACE: 32,
    ZERO: 48,
    NINE: 57
  };
  this.addPointsFromShape = (t) => {
    t.deleteAllPoints();
    const e = t.getPosition(), s = t.polygon.getAttribute("d");
    let o = [], n = null, h = null;
    for (let r of s) {
      const p = r.charCodeAt(0);
      p >= i.ZERO && p <= i.NINE || p === i.DOT ? o.push(r) : (p === i.COMMA || p === i.SPACE) && o.length && (n === null ? n = parseFloat(o.join("")) : (h = parseFloat(o.join("")), t.putPoint(n + e.left, h + e.top), n = null, h = null), o = []);
    }
  }, this.redrawResizeBox = (t) => {
    if (t.options.displayMode !== A.SCALE || !t.options.canScale) {
      t.resizeBox && t.resizeBox.hide();
      return;
    }
    if (!t.resizeBox) {
      t.transformer.setupResizeBox(), t.resizeBox && t.resizeBox.shape.points.forEach((e) => {
        e.options.zIndex = t.resizeBox.shape.options.zIndex + 2, e.element.style.zIndex = t.resizeBox.shape.options.zIndex + 2;
      });
      return;
    }
    this.setupBox(t, t.resizeBox, A.SCALE);
  }, this.getMaxZIndex = (t) => t.getChildren(!0).map((e) => e.options.zIndex).reduce((e, s) => e > s ? e : s, t.options.zIndex), this.redrawRotateBox = (t) => {
    if (t.options.displayMode !== A.ROTATE || !t.options.canRotate) {
      t.rotateBox && t.rotateBox.hide();
      return;
    }
    if (!t.rotateBox) {
      t.transformer.setupRotateBox(), t.rotateBox && t.rotateBox.shape.points.forEach((e) => {
        e.options.zIndex = t.options.zIndex + 2, e.element.style.zIndex = t.options.zIndex + 2;
      });
      return;
    }
    this.setupBox(t, t.rotateBox, A.ROTATE);
  }, this.setupBox = (t, e, s) => {
    const o = t.transformer.getResizeBoxBounds();
    t.options.displayMode === s ? e.options.shapeOptions.visible = t.options.visible : e.options.shapeOptions.visible = !1, e.left = o.left, e.top = o.top, e.width = o.width, e.height = o.height, e.options.zIndex = t.options.zIndex + 1, e.redraw(), setTimeout(() => {
      e.shape.points.forEach((n) => {
        n.options.zIndex = e.shape.options.zIndex + 2, n.element.style.zIndex = e.shape.options.zIndex + 2;
      });
    }, 1);
  }, this.setupShapeFill = (t) => {
    const e = t.options.style.fill || "none";
    e === "#image" && t.options.fillImage && typeof t.options.fillImage == "object" ? this.createImageFill(t) : e === "#gradient" && t.options.fillGradient && typeof t.options.fillGradient == "object" && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1 ? this.createGradient(t) : this.clearShapeFillTags(t);
  }, this.clearShapeFillTags = (t) => {
    const e = this.getShapeSvg(t);
    if (!e)
      return;
    const s = e.querySelector("#g" + t.guid + "_gradient");
    if (s)
      try {
        s.parentNode.removeChild(s);
      } catch {
      }
    const o = e.querySelector("p" + t.guid + "_pattern");
    if (o)
      try {
        o.parentNode.removeChild(o);
      } catch {
      }
  }, this.createGradient = (t) => {
    const e = this.getShapeSvg(t);
    let s = e.querySelector("#g" + t.guid + "_gradient"), o = t.options.fillGradient.type === "linear" ? "linearGradient" : "radialGradient";
    return s && s.tagName.toLowerCase() !== o.toLowerCase() && (s.parentNode.removeChild(s), s = e.querySelector("#g" + t.guid + "_gradient")), s || (s = document.createElementNS(e.namespaceURI, o), e && e.querySelector("defs").appendChild(s)), this.createGradientSteps(t, e, s);
  }, this.createGradientSteps = (t, e, s) => {
    s.innerHTML = "", s.id = "g" + t.guid + "_gradient";
    let o = !1;
    for (let n in t.options.fillGradient)
      if (n !== "type") {
        if (n === "steps") {
          o = !0;
          continue;
        }
        s.setAttribute(n, t.options.fillGradient[n]);
      }
    if (!o)
      return s;
    for (let n of t.options.fillGradient.steps) {
      const h = document.createElementNS(e.namespaceURI, "stop");
      m(n.stopColor) && h.setAttribute("offset", n.offset), m(n.stopColor) && h.setAttribute("stop-color", n.stopColor), m(n.stopOpacity) && h.setAttribute("stop-opacity", n.stopOpacity), s.appendChild(h);
    }
    return s;
  }, this.createImageFill = (t) => {
    const e = t.options.fillImage;
    if (!e.href || !e.width || !e.height)
      return console.error("Image HREF, width and height must be specified for Image Fill"), null;
    const s = this.getShapeSvg(t);
    let o = s.querySelector("p" + t.guid + "_pattern");
    o || (o = document.createElementNS(s.namespaceURI, "pattern"), o.setAttribute("id", "p" + t.guid + "_pattern"), o.setAttribute("patternUnits", "userSpaceOnUse"), s && s.querySelector("defs").appendChild(o));
    for (let h in e)
      h !== "href" && o.setAttribute(h, e[h]);
    let n = o.querySelector("image");
    return n || (n = document.createElementNS(s.namespaceURI, "image"), o.appendChild(n)), e.href && n.setAttribute("href", e.href), n.setAttribute("width", e.width), n.setAttribute("height", e.height), o;
  }, this.createSVGFilters = (t) => {
    if (!t.options.filters || typeof t.options.filters != "object" || !Object.keys(t.options.filters).length)
      return;
    const e = this.getShapeSvg(t);
    let s = e.querySelector("#f" + t.guid + "_filter");
    s || (s = document.createElementNS(e.namespaceURI, "filter"), e && e.querySelector("defs").append(s)), s.setAttribute("id", "f" + t.guid + "_filter"), s.innerHTML = "";
    for (let o in t.options.filters) {
      const n = this.createSVGFilter(t, o, t.options.filters[o]);
      n && s.appendChild(n);
    }
  }, this.createSVGFilter = (t, e, s) => {
    if (!t.svg)
      return null;
    const o = document.createElementNS(t.svg.namespaceURI, e), n = this.getShapeSvg(t), h = t.getPosition(t.options.groupChildShapes);
    for (let r in s)
      o.setAttribute(r, s[r].toString()), r === "dx" && (n.setAttribute("width", (h.width + parseInt(s.dx) * 2).toString()), n.style.width = (h.width + parseInt(s.dx) * 2).toString()), r === "dy" && (n.setAttribute("height", (h.height + parseInt(s.dy) * 2).toString()), n.style.height = (h.height + parseInt(s.dy) * 2).toString());
    return o;
  }, this.setupPolygonFill = (t, e) => {
    const s = t.options.style.fill || "none";
    s === "#image" && t.options.fillImage && typeof t.options.fillImage == "object" ? (e.setAttribute("fill", 'url("#p' + t.guid + '_pattern")'), e.style.fill = "") : s === "#gradient" && t.options.fillGradient && typeof t.options.fillGradient == "object" && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1 && (e.setAttribute("fill", 'url("#g' + t.guid + '_gradient")'), e.style.fill = "");
  }, this.setupPolygonStyles = (t, e) => {
    if (t.options.classes && e.setAttribute("class", t.options.classes), !(!m(t.options.style) || typeof t.options.style != "object"))
      for (let s in t.options.style)
        e.style[s] = t.options.style[s];
  }, this.toSvg = (t, e = null) => {
    const s = document.createElement("div"), o = this.getSvg(t, e);
    return s.appendChild(o), '<?xml version="1.0" encoding="UTF-8"?>' + s.innerHTML.replace(/&quot;/g, "'");
  }, this.getSvg = (t, e) => {
    let s = t.svg;
    if (!s) {
      const r = t.getParent();
      if (r && (s = r.svg), !s)
        return;
    }
    s = s.cloneNode(!0), e && (s = this.addChildrenToSvg(t, s)), s.removeAttribute("style"), s.removeAttribute("width"), s.removeAttribute("height"), s.removeAttribute("id"), s.removeAttribute("guid");
    const o = t.getPosition(e === null ? t.options.groupChildShapes : e);
    s.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const n = t.options.zoomLevel || 1, h = "0 0 " + o.width / n + " " + o.height / n;
    return s.setAttribute("viewBox", h), n !== 1 && this.unZoomSvg(s, n), s;
  }, this.addChildrenToSvg = (t, e) => {
    let s = !1;
    t = t.getParent() || t, t.options.groupChildShapes || (t.options.groupChildShapes = !0, s = !0), t.options.displayAsPath || t.getChildren(!0).forEach((h) => {
      this.drawPolygon(h, e);
    }), this.drawPolygon(t, e);
    let o = Array.from(e.querySelectorAll("path"));
    o.sort((h, r) => parseInt(h.style.zIndex) - parseInt(r.style.zIndex));
    const n = e.querySelector("defs");
    return e.innerHTML = "", e.appendChild(n), o.forEach((h) => e.appendChild(h)), s && (t.options.groupChildShapes = !1), e;
  }, this.unZoomSvg = (t, e) => {
    t.querySelectorAll("path").forEach((s) => {
      let o = "";
      const n = s.getAttribute("d").split(" ");
      for (let h of n)
        if (h.search(",") === -1)
          o += h + " ";
        else {
          const r = h.split(",");
          o += parseFloat(r[0]) / e + "," + parseFloat(r[1]) / e + " ";
        }
      s.setAttribute("d", o);
    });
  }, this.getMaxStrokeWidth = (t) => {
    if (!this.getShapeSvg(t))
      return 0;
    let s = parseInt(t.options.style["stroke-width"]);
    return isNaN(s) && (s = 0), t.options.groupChildShapes ? t.getChildren(!0).map((o) => isNaN(parseInt(o.options.style["stroke-width"])) ? 0 : parseInt(o.options.style["stroke-width"])).reduce((o, n) => o > n ? o : n, s) : s;
  }, this.toPng = (t, e = U.DATAURL, s = null, o = null, n = null) => new Promise(async (h) => {
    const r = t.options.zoomLevel || 1;
    t.calcPosition();
    const p = t.getPosition(n || t.options.groupChildShapes);
    [s, o] = et(s, o, p.width / r, p.height / r);
    const d = this.getSvg(t, n);
    d.setAttribute("width", p.width / r), d.setAttribute("height", p.height / r);
    for (let M of d.querySelectorAll("image"))
      if (M.getAttribute("href") && M.getAttribute("href").length) {
        const H = await q(await (await fetch(M.getAttribute("href"))).blob());
        M.setAttribute("href", H);
      }
    const c = document.createElement("div");
    c.appendChild(d);
    const y = c.innerHTML, b = new Image(), N = new Blob([y], { type: "image/svg+xml" }), z = window.URL || window.webkitURL || window, D = await q(N);
    b.addEventListener("load", () => {
      const M = document.createElement("canvas");
      b.width = p.width / r, b.height = p.height / r, M.width = b.width, M.height = b.height;
      const H = M.getContext("2d");
      H.drawImage(b, 0, 0), H.scale(s, o), z.revokeObjectURL(D);
      const J = M.toDataURL("image/png");
      if (e === U.BLOB) {
        h(Ot(J));
        return;
      }
      h(J);
    }), b.src = D;
  }), this.moveShapeToTop = (t) => {
    const e = f.getMaxZIndex(t.root);
    t.options.zIndex === e && f.findShapesByOptionValue("zIndex", e).length === 1 || this.changeShapeZIndex(t, e + 1);
  }, this.moveShapeToBottom = (t) => {
    const e = f.getMinZIndex(t.root);
    t.options.zIndex === e && f.findShapesByOptionValue("zIndex", e).length === 1 || this.changeShapeZIndex(t, e - 1);
  }, this.changeShapeZIndex = (t, e) => {
    if (e === t.options.zIndex)
      return;
    const s = e - t.options.zIndex;
    t.options.prevZIndex = t.options.zIndex, t.options.zIndex += s, this.updateOptions(t), t.options.groupChildShapes && t.getChildren(!0).forEach((o) => {
      o.options.prevZIndex = o.options.zIndex, o.options.zIndex += s, this.updateOptions(o);
    });
  }, this.getShapeSvg = (t) => {
    const e = t.getRootParent(!0);
    return e && e.svg ? e.svg : t.svg;
  }, this.setupZIndex = (t) => {
    if (!t.svg)
      return;
    let e = Array.from(t.svg.querySelectorAll("path"));
    e.sort((o, n) => parseInt(o.style.zIndex) - parseInt(n.style.zIndex));
    const s = t.svg.querySelector("defs");
    t.svg.innerHTML = "", s && t.svg.appendChild(s), e.forEach((o) => t.svg.appendChild(o));
  };
}
const U = {
  DATAURL: "dataurl",
  BLOB: "blob"
}, v = new pe();
function de(i) {
  this.shape = i, this.subscriptions = {
    CONTAINER_BOUNDS_CHANGED: []
  }, this.run = () => (this.shape = i, this.setEventListeners(), this), this.setEventListeners = () => {
    a.subscribe(g.POINT_DESTROYED, this.onPointDestroyed), a.subscribe(g.POINT_ADDED, this.onPointAdded), a.subscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), a.subscribe(g.POINT_DELETE_REQUEST, this.onPointDeleteRequest), a.subscribe(l.SHAPE_ADD_CHILD, () => {
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
    !this.shape.resizeBox || (this.resizeBoxListener = this.shape.resizeBox.addEventListener(w.RESIZE_BOX_RESIZE, this.onResize), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(l.SHAPE_MOVE_START, this.mousedown), this.resizeMouseMoveEventListener = this.shape.resizeBox.addEventListener(l.SHAPE_MOUSE_MOVE, this.mousemove), this.resizeClickEventListener = this.shape.resizeBox.addEventListener(l.SHAPE_MOUSE_CLICK, this.click), this.resizeDblClickEventListener = this.shape.resizeBox.addEventListener(l.SHAPE_MOUSE_DOUBLE_CLICK, this.svg_dblclick), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(l.SHAPE_MOUSE_DOWN, this.svg_mousedown), this.resizeMouseOverEventListener = this.shape.resizeBox.addEventListener(l.SHAPE_MOUSE_OVER, this.svg_mouseover), this.resizeMouseOutEventListener = this.shape.resizeBox.addEventListener(l.SHAPE_MOUSE_OUT, this.svg_mouseout), this.resizeMouseUpEventListener = this.shape.resizeBox.addEventListener(l.SHAPE_MOUSE_UP, (t) => {
      a.emit(l.SHAPE_MOUSE_UP, this.shape, u(t));
    }), this.resizeBoxContextMenuEventListener = this.shape.resizeBox.shape.svg.addEventListener("contextmenu", (t) => {
      this.shape.contextMenu && this.shape.contextMenu.onEvent(t);
    }), this.resizeBoxWheelEventListener = this.shape.resizeBox.shape.svg.addEventListener("wheel", (t) => {
      this.wheel(t);
    }));
  }, this.addRotateEventListener = () => {
    !this.shape.rotateBox || (this.rotateBoxListener = this.shape.rotateBox.addEventListener(G.ROTATE_BOX_ROTATE, this.onRotate), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(l.SHAPE_MOVE_START, this.mousedown), this.rotateMouseMoveEventListener = this.shape.rotateBox.addEventListener(l.SHAPE_MOUSE_MOVE, this.mousemove), this.rotateClickEventListener = this.shape.rotateBox.addEventListener(l.SHAPE_MOUSE_CLICK, this.click), this.rotateDblClickEventListener = this.shape.rotateBox.addEventListener(l.SHAPE_MOUSE_DOUBLE_CLICK, this.svg_dblclick), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(l.SHAPE_MOUSE_DOWN, this.svg_mousedown), this.rotateMouseUpEventListener = this.shape.rotateBox.addEventListener(l.SHAPE_MOUSE_UP, (t) => {
      a.emit(l.SHAPE_MOUSE_UP, this.shape, u(t));
    }), this.rotateMouseOverEventListener = this.shape.rotateBox.addEventListener(l.SHAPE_MOUSE_OVER, this.svg_mouseover), this.rotateMouseOutEventListener = this.shape.rotateBox.addEventListener(l.SHAPE_MOUSE_OUT, this.svg_mouseout), this.rotatePointDragStartEventListener = this.shape.rotateBox.addEventListener(l.POINT_DRAG_START, (t) => {
      this.shape.initCenter = this.shape.getCenter(this.shape.options.groupChildShapes);
    }), this.rotatePointDragEndEventListener = this.shape.rotateBox.addEventListener(l.POINT_DRAG_END, (t) => {
      this.shape.initCenter = null;
    }), this.rotateBoxContextMenuEventListener = this.shape.rotateBox.shape.svg.addEventListener("contextmenu", (t) => {
      this.shape.contextMenu && this.shape.contextMenu.onEvent(t);
    }), this.rotateBoxWheelEventListener = this.shape.rotateBox.shape.svg.addEventListener("wheel", (t) => {
      this.wheel(t);
    }));
  }, this.onResize = async (t) => {
    const e = this.shape.getRootParent(!0);
    if (e) {
      a.emit(
        w.RESIZE_BOX_RESIZE,
        e.resizeBox,
        u(
          t,
          { newPos: t.newPos, oldPos: t.oldPos }
        )
      );
      return;
    }
    if (!(t.buttons && this.shape.options.simpleMode))
      if (t.buttons) {
        if (!this.oldPos) {
          const s = v.getMaxZIndex(this.shape);
          this.shape.resizeBox.setOptions({ zIndex: s }), this.oldPos = t.oldPos;
        }
      } else {
        const s = t.newPos.left - this.oldPos.left, o = t.newPos.top - this.oldPos.top;
        this.shape.moveBy(s, o, !1);
        const [n, h] = this.shape.transformer.getMaxPointSize();
        this.shape.scaleTo(t.newPos.width - n * 2, t.newPos.height - h * 2), await this.shape.redraw(), a.emit(w.RESIZE_BOX_RESIZE, this.shape, t), this.oldPos = null;
      }
  }, this.onRotate = (t) => {
    const e = this.shape.getRootParent(!0);
    if (e) {
      a.emit(G.ROTATE_BOX_ROTATE, e.rotateBox, { angle: t.angle });
      return;
    }
    this.shape.rotateBy(t.angle), v.draw(this.shape), this.shape.options.groupChildShapes && this.shape.getChildren().forEach((s) => {
      this.shape.options.displayAsPath ? this.shape.options.displayMode === A.SELECTED && s.points.filter((o) => o.element).forEach((o) => o.redraw()) : v.draw(s);
    }), a.emit(l.SHAPE_ROTATE, this.shape, t);
  }, this.mousedown = (t) => {
    st(t), a.emit(l.SHAPE_MOUSE_DOWN, this.shape, u(t)), setTimeout(() => {
      a.emit(
        l.SHAPE_MOVE_START,
        this.shape,
        u(t, { pos: this.shape.getPosition(this.shape.options.groupChildShapes) })
      );
    }, 100);
  }, this.mousemove = (t) => {
    if (this.shape.draggedPoint || a.emit(l.SHAPE_MOUSE_MOVE, this.shape, u(t)), t.buttons !== 1)
      return;
    if (this.shape.draggedPoint) {
      a.emit(l.POINT_DRAG_MOVE, this.shape, { point: this.shape.draggedPoint }), this.shape.draggedPoint.mousemove(t);
      return;
    }
    if (!this.shape.options.canDragShape)
      return;
    const [e, s] = this.calcMovementOffset(t);
    if (e === null || s === null)
      return;
    const o = this.shape.getPosition(this.shape.options.groupChildShapes);
    this.shape.moveBy(e, s, !0);
    const n = this.shape.getPosition(this.shape.options.groupChildShapes);
    a.emit(l.SHAPE_MOVE, this.shape, u(t, { oldPos: o, newPos: n }));
  }, this.mouseenter = (t) => {
    a.emit(l.SHAPE_MOUSE_ENTER, this.shape, u(t));
  }, this.mouseover = (t) => {
    f.draggedShape !== this.shape && a.emit(l.SHAPE_MOUSE_OVER, this.shape, u(t));
  }, this.mouseout = (t) => {
    a.emit(l.SHAPE_MOUSE_OUT, this.shape, u(t));
  }, this.click = (t) => {
    a.emit(l.SHAPE_MOUSE_CLICK, this.shape, u(t));
  }, this.doubleclick = (t) => {
    a.emit(l.SHAPE_MOUSE_DOUBLE_CLICK, this.shape, u(t));
  }, this.wheel = (t) => {
    this.shape.options.zoomable && this.shape.options.id.search("_resizebox") === -1 && this.shape.options.id.search("_rotatebox") === -1 && (t.deltaY < 0 ? this.shape.zoomBy(1 + this.shape.options.zoomStep) : this.shape.zoomBy(1 - this.shape.options.zoomStep), this.shape.redraw());
  }, this.calcMovementOffset = (t) => {
    this.shape.calcPosition();
    const e = this.shape.getPosition(this.shape.options.groupChildShapes);
    let s = t.movementX, o = t.movementY, n = t.clientX + window.scrollX, h = t.clientY + window.scrollY;
    const r = e.left + s, p = e.top + o, d = _(this.shape.root, !0), c = this.shape.getBounds();
    return (r < c.left || r + e.width > c.right) && (s = 0), (p < c.top || p + e.height > c.bottom) && (o = 0), n < r + d.left && (s = n - (r + d.left)), h < p + d.top && (o = h - (p + d.top)), n > r + e.width + d.left && (s = n - (e.width + d.left + e.left)), h > p + e.height + d.right && (o = h - (e.height + d.top + e.top)), [s, o];
  }, this.onPointAdded = (t) => {
    if (!!this.shape.isShapePoint(t.target)) {
      if (t.target.element)
        try {
          this.shape.root.appendChild(t.target.element);
        } catch {
        }
      a.emit(l.POINT_ADDED, this.shape, { point: t.target });
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
      a.emit(l.POINT_DESTROYED, this.shape, { point: t.target });
    }
  }, this.onPointDeleteRequest = (t) => {
    !this.shape.isShapePoint(t.target) || this.shape.deletePoint(t.target.x, t.target.y);
  }, this.addEventListener = (t, e) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const s = a.subscribe(t, (o) => {
      o.target && o.target.guid === this.shape.guid && e(o);
    });
    return this.subscriptions[t].push(s), s;
  }, this.removeEventListener = (t, e) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(e), 1), a.unsubscribe(t, e);
  }, this.destroy = () => {
    a.unsubscribe(g.POINT_ADDED, this.onPointAdded), a.unsubscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), a.unsubscribe(g.POINT_DESTROYED, this.onPointDestroyed), a.unsubscribe(g.POINT_DELETE_REQUEST, this.onPointDeleteRequest), this.shape.resizeBox && (this.shape.resizeBox.removeEventListener(w.RESIZE_BOX_RESIZE, this.resizeBoxListener), this.shape.resizeBox.removeEventListener(l.SHAPE_MOUSE_CLICK, this.resizeClickEventListener), this.shape.resizeBox.removeEventListener(l.SHAPE_MOUSE_MOVE, this.resizeMouseMoveEventListener), this.shape.resizeBox.removeEventListener(l.SHAPE_MOVE_START, this.resizeMouseDownEventListener), this.shape.resizeBox.removeEventListener(l.SHAPE_MOUSE_UP, this.resizeMouseUpEventListener), this.shape.resizeBox.removeEventListener(l.SHAPE_MOUSE_DOUBLE_CLICK, this.resizeDblClickEventListener), this.shape.resizeBox.removeEventListener(l.SHAPE_MOUSE_OVER, this.resizeMouseOverEventListener), this.shape.resizeBox.removeEventListener(l.SHAPE_MOUSE_OUT, this.resizeMouseOutEventListener), this.shape.resizeBox.removeEventListener("contextmenu", this.resizeBoxContextMenuEventListener), this.shape.resizeBox.removeEventListener("wheel", this.resizeBoxWheelEventListener)), this.shape.rotateBox && (this.shape.rotateBox.removeEventListener(G.ROTATE_BOX_ROTATE, this.rotateBoxListener), this.shape.rotateBox.removeEventListener(l.SHAPE_MOUSE_CLICK, this.rotateClickEventListener), this.shape.rotateBox.removeEventListener(l.SHAPE_MOUSE_MOVE, this.rotateMouseMoveEventListener), this.shape.rotateBox.removeEventListener(l.SHAPE_MOVE_START, this.rotateMouseDownEventListener), this.shape.rotateBox.removeEventListener(l.SHAPE_MOVE_START, this.rotatePointDragStartEventListener), this.shape.rotateBox.removeEventListener(l.SHAPE_MOVE_START, this.rotatePointDragEndEventListener), this.shape.rotateBox.removeEventListener(l.SHAPE_MOUSE_UP, this.rotateMouseUpEventListener), this.shape.rotateBox.removeEventListener(l.SHAPE_MOUSE_DOUBLE_CLICK, this.rotateDblClickEventListener), this.shape.rotateBox.removeEventListener(l.SHAPE_MOUSE_OVER, this.rotateMouseOverEventListener), this.shape.rotateBox.removeEventListener(l.SHAPE_MOUSE_OUT, this.rotateMouseOutEventListener), this.shape.rotateBox.removeEventListener("contextmenu", this.rotateBoxContextMenuEventListener), this.shape.rotateBox.removeEventListener("wheel", this.rotateBoxWheelEventListener));
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((s) => a.unsubscribe(t, s)), this.subscriptions[t] = [];
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
  getShapeMouseEvents: () => Object.keys(l).filter((i) => ["SHAPE_CREATE", "SHAPE_DESTROY", "SHAPE_RESIZE", "SHAPE_ROTATE"].indexOf(i) === -1 && typeof l[i] != "function").map((i) => ({ key: i, name: l[i] }))
}, Ae = (i, t, e = {}, s = null) => {
  if (!m(t) || typeof t != "object" || (m(t.features) || (t = { features: [t] }), !t.features.length))
    return null;
  const o = [];
  for (let n in t.features) {
    const h = t.features[n], r = ue(h, n, e, i);
    s && typeof s == "function" && s(n, t.features.length, r), r && o.push(r);
  }
  return o.length === 1 ? o[0] : o;
}, ue = (i, t, e, s) => {
  if (!ge(i))
    return;
  let o = ce(i, t, e);
  o.visible = !1;
  const n = fe(i);
  if (!n || !n.length)
    return;
  n.sort((p, d) => d.dims.width * d.dims.height - p.dims.width * p.dims.height);
  let h = null;
  for (let p in n) {
    const d = S({}, o);
    if (p == 0)
      e.onlyData ? h = {
        points: n[p].cords,
        options: d,
        children: [],
        ...n[p].dims
      } : (h = f.createShape(s, d, n[p].cords, !1), h.left = n[p].dims.left, h.top = n[p].dims.top, h.right = n[p].dims.right, h.bottom = n[p].dims.bottom, h.width = n[p].dims.width, h.height = n[p].dims.height);
    else if (d.id += "_" + p, d.name += " " + p, e.onlyData)
      h.children.push({
        points: n[p].cords,
        options: d,
        ...n[p].dims
      });
    else {
      const c = f.createShape(s, d, n[p].cords);
      c.left = n[p].dims.left, c.top = n[p].dims.top, c.right = n[p].dims.right, c.bottom = n[p].dims.bottom, c.width = n[p].dims.width, c.height = n[p].dims.height, h.addChild(c, !1);
    }
  }
  if (e.onlyData)
    return h;
  const r = h.getPosition();
  return (r.left < 0 || r.top < 0) && (e.scale || e.width || e.height) && h.moveTo(0, 0, !1, !1), m(e.scale) ? h.scaleBy(e.scale, e.scale, !0) : (m(e.width) || m(e.height)) && h.scaleTo(e.width, e.height), h;
}, ge = (i) => {
  if (!m(i.properties) || typeof i.properties != "object")
    return !1;
  const t = i.geometry;
  return !(!m(t) || typeof t != "object" || ["Polygon", "MultiPolygon"].indexOf(t.type) === -1 || !m(t.coordinates) || typeof t.coordinates != "object" || !t.coordinates.length);
}, ce = (i, t, e) => {
  const s = {};
  if (s.name = i.properties[e.nameField] || "Shape " + t, s.id = i.properties[e.idField] || "shape_" + t, m(e.fields) && typeof e.fields == "object" && e.fields.filter((o) => m(i.properties[o])).forEach((o) => s[o] = i.properties[o]), m(e.options) && typeof e.options == "object")
    for (let o in e.options)
      s[o] = e.options[o];
  return s;
}, fe = (i) => {
  let t = i.geometry.coordinates;
  i.geometry.type === "Polygon" && (t = [t]);
  const e = [];
  for (let s of t) {
    const o = s[0], n = [];
    let h = 1 / 0, r = -1 / 0, p = 1 / 0, d = -1 / 0;
    for (let c of o) {
      const [y, b] = [c[0], -c[1]];
      y < h && (h = y), y > r && (r = y), b < p && (p = b), b > d && (d = b), n.push({ x: y, y: b });
    }
    e.push({ cords: n, dims: { left: h, top: p, bottom: d, right: r, width: r - h, height: d - p } });
  }
  return e;
};
function Ee() {
  this.shapes = {}, this.visibleShapes = {}, this.activeShape = null, this.draggedShape = null, this.shapeOnCursor = null, this.containerEventListeners = [], this.init = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    a.subscribe(l.SHAPE_CREATE, this.onShapeCreated), a.subscribe(l.SHAPE_DESTROY, this.onShapeDestroy), a.subscribe(l.SHAPE_SHOW, this.onShapeShow), a.subscribe(l.SHAPE_HIDE, this.onShapeHide), a.subscribe(l.SHAPE_MOVE_START, this.onShapeMoveStart), a.subscribe(l.SHAPE_MOUSE_ENTER, this.onShapeMouseEnter), a.subscribe(g.POINT_DRAG_START, this.onPointDragStart), a.subscribe(g.POINT_DRAG_END, this.onPointDragEnd), window.addEventListener("resize", this.onWindowResize);
  }, this.onWindowResize = (i) => {
    for (let t in this.shapes) {
      const e = this.shapes[t];
      a.emit(
        W.CONTAINER_BOUNDS_CHANGED,
        e,
        { bounds: e.getBounds(), points: e.points }
      );
    }
  }, this.createShape = (i, t, e, s = !0) => new R().init(i, t, e, s), this.onShapeCreated = (i) => {
    const t = i.target;
    m(t.root) && !this.getShape(t) && typeof t.belongsToShape == "function" && (this.addShape(t), this.activeShape || (this.activeShape = t));
  }, this.addShape = (i) => {
    this.shapes[i.guid] = i, i.options.visible && this.isNormalShape(i) && (this.visibleShapes[i.guid] = i), this.getShapesByContainer(i.root).length === 1 && this.addContainerEvents(i);
  }, this.onShapeDestroy = (i) => {
    const t = i.target;
    delete this.shapes[t.guid];
    const e = t.root;
    !m(t.root) || this.getShapesByContainer(e).length === 0 && this.containerEventListeners.filter((s) => s.container === e).forEach((s) => {
      s.container.removeEventListener(s.name, s.listener), this.containerEventListeners.splice(this.containerEventListeners.indexOf(s), 1);
    });
  }, this.onShapeShow = (i) => {
    this.isNormalShape(i.target) && (this.visibleShapes[i.target.guid] = i.target);
  }, this.onShapeHide = (i) => {
    delete this.visibleShapes[i.target.guid];
  }, this.onShapeMoveStart = (i) => {
    if (!this.getShapeByGuid(i.target.guid) || !i.target.options.managed)
      return;
    const t = i.target.getRootParent(!0);
    t && t.options.groupChildShapes ? (this.activateShape(t), this.draggedShape = t) : (this.activateShape(i.target), this.draggedShape = i.target);
  }, this.onShapeMouseEnter = (i) => {
    !this.draggedShape || i.buttons !== 1 && (this.draggedShape.draggedPoint = null);
  }, this.onPointDragStart = (i) => {
    const t = this.findShapeByPoint(i.target);
    if (t) {
      this.draggedShape = t;
      const e = t.getRootParent(!0);
      e && e.options.groupChildShapes && (this.draggedShape = e), this.draggedShape.draggedPoint = i.target, a.emit(l.POINT_DRAG_START, t, { point: i.target });
    }
  }, this.onPointDragEnd = (i) => {
    this.draggedShape && (this.draggedShape.draggedPoint = null), this.draggedShape = null;
  }, this.getShape = (i) => this.getShapeByGuid(i.guid), this.findShapeByPoint = (i) => {
    for (let t in this.shapes) {
      const e = this.shapes[t];
      if (e.isShapePoint(i))
        return e;
    }
    return null;
  }, this.getShapeByGuid = (i) => m(this.shapes[i]) ? this.shapes[i] : null, this.getShapesByContainer = (i) => {
    const t = [];
    for (let e in this.shapes) {
      const s = this.shapes[e];
      this.isNormalShape(s) && s.root === i && t.push(s);
    }
    return t;
  }, this.getMaxZIndex = (i = null) => {
    let t;
    return i ? t = this.getShapesByContainer(i) : t = this.getShapes(), t.length ? parseInt(
      t.map((e) => e.options.zIndex || 0).reduce((e, s) => s > e ? s : e, 0)
    ) : 0;
  }, this.getMinZIndex = (i = null) => {
    let t;
    return i ? t = this.getShapesByContainer(i) : t = this.getShapes(), t.length ? parseInt(
      t.map((e) => e.options.zIndex || 0).reduce((e, s) => s < e ? s : e, 999999)
    ) : 0;
  }, this.getShapes = () => {
    const i = [];
    for (let t in this.shapes) {
      const e = this.shapes[t];
      this.isNormalShape(e) && i.push(e);
    }
    return i;
  }, this.isNormalShape = (i) => i.options.id.search("_resizebox") === -1 && i.options.id.search("_rotatebox") === -1 && typeof i.belongsToShape == "function", this.activateShape = (i, t = null) => {
    if (this.activeShape === i) {
      this.activeShape.switchDisplayMode(t), i.options.moveToTop && i.moveToTop();
      return;
    }
    typeof i.id < "u" && (i.id.search("_resizebox") !== -1 || i.id.search("_rotatebox") !== -1) || (this.activeShape && this.deactivateShape(this.activeShape), i.options.moveToTop && i.moveToTop(), this.activeShape = i, a.emit(l.SHAPE_ACTIVATED, this.activeShape), this.activeShape.switchDisplayMode(t));
  }, this.deactivateShape = (i) => {
    typeof i.options.prevZIndex < "u" && v.updateOptions(i), i.options.displayMode !== A.DEFAULT && i.switchDisplayMode(A.DEFAULT), i.options.groupChildShapes && i.getChildren(!0).forEach((t) => {
      typeof t.options.prevZIndex < "u" && (v.updateOptions(t), t.options.displayMode !== A.DEFAULT && t.switchDisplayMode(A.DEFAULT));
    });
  }, this.addContainerEvents = (i) => {
    this.addContainerEvent(i.root, "mousemove", this.mousemove), this.addContainerEvent(i.root, "mouseup", this.mouseup, i.options.id), this.addContainerEvent(i.root, "dblclick", this.doubleclick), this.addContainerEvent(i.root, "contextmenu", this.contextmenu), this.addContainerEvent(i.root, "mouseleave", this.mouseleave), a.emit(me.MANAGER_ADD_CONTAINER_EVENT_LISTENERS, i.root);
  }, this.addContainerEvent = (i, t, e) => {
    this.containerEventListeners.find((s) => s.container === i && s.name === t) || (i.addEventListener(t, e), this.containerEventListeners.push({ id: i.id, container: i, name: t, listener: e }));
  }, this.doubleclick = (i) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.doubleclick(u(i, { target: this.shapeOnCursor }));
    try {
      i.stopPropagation();
    } catch {
    }
    if (!this.activeShape || !this.activeShape.options.canAddPoints || this.activeShape.draggedPoint || this.activeShape.points.length > 2 || this.activeShape.points.length === this.activeShape.options.maxPoints)
      return;
    this.activeShape.options.displayMode === A.DEFAULT && this.activeShape.switchDisplayMode(A.SELECTED);
    const [t, e] = j(u(i, { target: this.activeShape }));
    this.activeShape.addPoint(t, e, { forceDisplay: !1 });
  }, this.contextmenu = (i) => {
    if (i.stopPropagation(), i.preventDefault(), this.shapeOnCursor && this.shapeOnCursor.options.hasContextMenu) {
      const t = this.shapeOnCursor.shapeMenu;
      if (!t)
        return;
      t.contextMenu.origEvent = i, t.contextMenu.cursorX = i.pageX, t.contextMenu.cursorY = i.pageY, t.contextMenu.show();
    }
  }, this.mousedown = (i) => {
    if (this.shapeOnCursor && i.buttons !== 2) {
      const t = this.shapeOnCursor.getRootParent(!0);
      t && t.options.groupChildShapes && (this.shapeOnCursor = t), this.draggedShape = this.shapeOnCursor, this.shapeOnCursor.eventListener.mousedown(u(i, { target: this.shapeOnCursor }));
    }
  }, this.mouseup = (i) => {
    if (!this.draggedShape)
      return;
    const t = this.draggedShape;
    i.buttons === 1 && t.options.canAddPoints && !t.draggedPoint && (t.options.maxPoints === -1 || t.points.length < t.options.maxPoints) && t.addPoint(
      i.clientX - t.root.offsetLeft,
      i.clientY - t.root.offsetTop
    ), t.draggedPoint ? (a.emit(l.POINT_DRAG_END, this.draggedShape, { point: t.draggedPoint }), t.draggedPoint.mouseup(i), t.draggedPoint = null) : a.emit(l.SHAPE_MOUSE_UP, t, {}), this.draggedShape = null, a.emit(l.SHAPE_MOVE_END, t, { pos: t.getPosition(!0) });
  }, this.mousemove = (i) => {
    if (i.buttons !== 1 && (this.draggedShape && (this.draggedShape.draggedPoint = null), this.draggedShape = null), !this.draggedShape) {
      this.processShapesUnderCursor(i);
      return;
    }
    this.draggedShape && this.draggedShape.eventListener.mousemove(i);
  }, this.mouseover = (i) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseover(u(i, { target: this.shapeOnCursor }));
  }, this.mouseenter = (i) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseenter(u(i, { target: this.shapeOnCursor }));
  }, this.mouseout = (i) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseout(u(i, { target: i.target }));
  }, this.mouseleave = (i) => {
    if (this.draggedShape && this.draggedShape.draggedPoint && this.draggedShape.options.id.search("_resizebox") !== -1) {
      const t = this.draggedShape.options.id.replace("_resizebox", ""), e = this.findShapeById(t);
      e && e.options.simpleMode && a.emit(w.RESIZE_BOX_RESIZE, e.resizeBox, u(i, {
        buttons: 0,
        oldPos: e.getPosition(!0),
        newPos: e.resizeBox.getPosition()
      }));
    }
  }, this.click = (i) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.click(u(i, { target: this.shapeOnCursor }));
  }, this.processShapesUnderCursor = (i) => {
    const [t, e] = [i.clientX, i.clientY], s = this.getShapeOnCursor(t, e);
    this.shapeOnCursor && this.shapeOnCursor !== s && this.shapeOnCursor.getShapeSvg() && (this.shapeOnCursor.getShapeSvg().style.cursor = "default", this.shapeOnCursor.eventListener.mouseout(u(i, { target: this.shapeOnCursor }))), s && s !== this.shapeOnCursor && s.eventListener.mouseover(u(i, { target: s })), this.shapeOnCursor = s, this.shapeOnCursor && (a.emit(l.SHAPE_MOUSE_MOVE, this.shapeOnCursor, u(i)), this.shapeOnCursor.getShapeSvg().style.cursor = "crosshair");
  }, this.getShapeOnCursor = (i, t) => {
    const e = Object.values(this.visibleShapes);
    if (!e.length)
      return null;
    const s = e.filter((o) => o.belongsToShape(i, t));
    return s.length ? s.reduce((o, n) => n.options.zIndex >= o.options.zIndex ? n : o) : null;
  }, this.toJSON = (i = null, t = !1) => (i || (i = this.getShapes()), i = i.filter((e) => !e.getParent()), JSON.stringify(i.map((e) => e.getJSON(!0, t)))), this.fromJSON = (i, t, e = null, s = !0) => {
    let o = t;
    if (typeof o == "string" && (o = Q(t)), !o || !o.length)
      return null;
    const n = [];
    for (let h in o) {
      const r = o[h];
      r.options.id && this.findShapeById(r.options.id) || (n.push(new R().fromJSON(i, r, !0, s)), e && typeof e == "function" && e(h / o.length));
    }
    return n;
  }, this.findShapesByOptionValue = (i, t) => this.getShapes().filter((e) => e.options[i] === t), this.findShapeById = (i) => {
    const t = this.findShapesByOptionValue("id", i);
    return t && t.length ? t[0] : null;
  }, this.findShapeByName = (i) => {
    const t = this.findShapesByOptionValue("name", i);
    return t && t.length ? t[0] : null;
  }, this.clear = () => {
    for (this.containerEventListeners.forEach(({ container: i, name: t, listener: e }) => {
      try {
        i.removeEventListener(t, e);
      } catch (s) {
        console.error(s);
      }
    }), this.containerEventListeners = []; Object.values(this.shapes).length; )
      Object.values(this.shapes)[0].destroy();
  }, this.fromGeoJson = (i, t, e = {}, s = null) => Ae(i, t, e, s), this.length = () => Object.values(this.shapes).length;
}
const me = {
  MANAGER_ADD_CONTAINER_EVENT_LISTENERS: "manager_add_container_event_listeners",
  MANAGER_REMOVE_CONTAINER_EVENT_LISTENERS: "manager_remove_container_event_listeners"
}, W = {
  CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
}, f = new Ee().init();
function rt(i) {
  this.shape = i, this.addChild = (t, e = !0) => {
    !this.shouldAddChild(t) || (this.shape.options.displayMode !== t.options.displayMode && (t.svg ? t.switchDisplayMode(this.shape.options.displayMode) : t.options.displayMode = i.options.displayMode), this.shape.children.push(t), e && a.emit(l.SHAPE_ADD_CHILD, this.shape, { child: t }));
  }, this.addChildren = (t = []) => {
    t.forEach((e) => {
      this.addChild(e, !1);
    }), a.emit(l.SHAPE_ADD_CHILD, this.shape, { children: t });
  }, this.removeChild = (t) => {
    this.shape.children.splice(this.shape.children.indexOf(t), 1), a.emit(l.SHAPE_REMOVE_CHILD, this.shape, { child: t });
  }, this.removeAllChildren = (t = !1) => {
    for (; this.getChildren(t).length; )
      this.removeChild(this.getChildren(t)[0]);
  }, this.getChildren = (t = !1) => {
    if (!t)
      return this.shape.children;
    const e = [];
    e.push(...this.shape.children);
    for (let s of e)
      e.push(...s.getChildren());
    return e;
  }, this.hasChild = (t, e = !1) => t.guid !== this.guid && !!this.getChildren(e).find((s) => s.guid === t.guid), this.shouldAddChild = (t) => !t || typeof t != "object" || typeof t.getChildren > "u" || this.shape.children.indexOf(t) !== -1 || t === this.shape || t.getChildren().indexOf(this.shape) !== -1 || t.getParent() ? !1 : this.getParentsList().indexOf(t) === -1, this.getParent = () => {
    const t = f.getShapes();
    for (let e of t)
      if (e.getChildren().indexOf(this.shape) !== -1)
        return e;
    return null;
  }, this.getRootParent = (t = null) => {
    let e = this.getParentsList();
    return e.length ? (t !== null && (e = e.filter((s) => s.options.groupChildShapes === t)), e[e.length - 1]) : null;
  }, this.getParentsList = (t = []) => {
    const e = this.getParent();
    return e == null ? t : (t.push(e), e.getParentsList(t));
  }, this.getPosition = () => {
    let t = this.getChildren(!0);
    if (t.push(this.shape), t = t.filter((s) => s.points.length), !t.length)
      return { left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0 };
    const e = {
      left: t.map((s) => s.left).reduce((s, o) => o < s ? o : s, 9999999),
      top: t.map((s) => s.top).reduce((s, o) => o < s ? o : s, 99999999),
      right: t.map((s) => s.right).reduce((s, o) => o > s ? o : s, -9999999),
      bottom: t.map((s) => s.bottom).reduce((s, o) => o > s ? o : s, -99999999)
    };
    return e.width = Math.abs(e.right - e.left) || 1, e.height = Math.abs(e.bottom - e.top) || 1, e;
  };
}
function at() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = V(), this.options = {
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
  }, this.eventListener = null, this.left_top = null, this.left_bottom = null, this.right_top = null, this.right_bottom = null, this.init = (i, t, e, s, o, n = {}) => (this.left = parseInt(t), this.top = parseInt(e), this.width = parseInt(s), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new R().init(i, S({}, this.options.shapeOptions), []), a.emit(l.SHAPE_CREATE, this.shape, {}), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new ae(this).run(), this), this.setOptions = (i = {}) => {
    !i || typeof i != "object" || (this.options = S(this.options, i), this.options.shapeOptions.zIndex = this.options.zIndex || this.options.zIndex, this.options.shapeOptions.id = this.options.id ? this.options.id : this.options.id, this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + _t + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + Ut + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + Vt + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + Nt + "')" } });
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
    a.emit(l.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (i, t) => this.eventListener.addEventListener(i, t), this.removeEventListener = (i, t) => {
    this.eventListener.removeEventListener(i, t);
  };
}
function Se(i) {
  this.shape = i, this.moveTo = (t, e, s = !0, o = !0, n = !0) => {
    const h = this.shape.getBounds(), r = this.shape.getPosition(this.shape.options.groupChildShapes);
    let p = t, d = e;
    o && (p = t + r.width > h.right ? h.right - r.width : t, d = e + r.height > h.bottom ? h.bottom - r.height : e), this.moveBy(p - r.left, d - r.top, s, n);
  }, this.moveBy = (t, e, s = !0, o = !0) => {
    const n = this.shape.getParent(!0) || this.shape;
    for (let r of this.shape.points)
      r.x += t, r.y += e, (n.options.displayMode === SmartShapeDisplayMode.SELECTED || r.options.forceDisplay) && r.redraw();
    this.shape.options.offsetX += t, this.shape.options.offsetY += e, this.shape.left += t, this.shape.top += e, this.shape.right += t, this.shape.bottom += e, this.shape.width = this.shape.right - this.shape.left, this.shape.height = this.shape.bottom - this.shape.top;
    const h = this.shape.getChildren(!0);
    if (h.length && this.shape.options.groupChildShapes && h.forEach((r) => r.moveBy(t, e, s, o)), s && this.shape.svg) {
      const r = this.shape.getPosition(!0);
      this.shape.svg.style.left = r.left + "px", this.shape.svg.style.top = r.top + "px";
    }
    this.shape.getParent() || (v.redrawResizeBox(this.shape), v.redrawRotateBox(this.shape));
  }, this.scaleTo = (t = null, e = null, s = null) => {
    const o = this.shape.getBounds();
    if (this.shape.calcPosition(), !t && !e)
      return null;
    const n = this.shape.getPosition(s || this.shape.options.groupChildShapes);
    if (n.width === t && n.height === e)
      return;
    [t, e] = this.applyScaleRestriction(...et(t, e, n.width, n.height)), n.width >= 10 && t < 10 && (t = 10), n.height >= 10 && e < 10 && (e = 10);
    let h = C(n.left) + t > o.right && o.right !== -1 ? o.right - C(n.left) : t, r = C(n.top) + e > o.bottom && o.bottom !== -1 ? o.bottom - C(n.top) : e, p = C(h / n.width), d = C(r / n.height);
    this.shape.scaleBy(p, d, s);
  }, this.scaleBy = (t = null, e = null, s = null) => {
    if (t === 1 && e === 1)
      return;
    const o = this.shape.getPosition(s || this.shape.options.groupChildShapes);
    this.shape.points.forEach((n) => {
      n.x = (n.x - o.left) * t + o.left, n.y = (n.y - o.top) * e + o.top;
    }), this.shape.options.scaleFactorX *= t, this.shape.options.scaleFactorY *= e, (this.shape.options.groupChildShapes || s) && this.shape.getChildren(!0).forEach((n) => {
      n.points.forEach((h) => {
        h.x = (h.x - o.left) * t + o.left, h.y = (h.y - o.top) * e + o.top;
      }), n.options.scaleFactorX *= t, n.options.scaleFactorY *= e, n.calcPosition();
    }), this.shape.calcPosition();
  }, this.zoomBy = (t) => {
    this.shape.options.zoomLevel *= t, this.scaleBy(t, t), this.shape.options.groupChildShapes && this.shape.getChildren(!0).forEach((e) => e.options.zoomLevel *= t);
  }, this.applyScaleRestriction = (t, e) => (this.shape.options.minWidth !== -1 && t < this.shape.options.minWidth && (t = this.shape.options.minWidth), this.shape.options.minWidth !== -1 && e < this.shape.options.minHeight && (e = this.shape.options.minHeight), this.shape.options.minWidth !== -1 && t > this.shape.options.maxWidth && (t = this.shape.options.maxWidth), this.shape.options.minWidth !== -1 && e > this.shape.options.maxHeight && (e = this.shape.options.maxHeight), [t, e]), this.rotateBy = (t, e = null, s = null, o = !1) => {
    this.shape.calcPosition();
    const n = this.shape.getPosition(this.shape.options.groupChildShapes);
    [e, s] = this.getRotateCenter(e, s), !(o && (!this.shape.isInBounds(...O(t, n.left, n.top, e, s)) || !this.shape.isInBounds(...O(t, n.right, n.top, e, s)) || !this.shape.isInBounds(...O(t, n.left, n.bottom, e, s)) || !this.shape.isInBounds(...O(t, n.right, n.bottom, e, s)))) && (this.shape.points.forEach((h) => {
      typeof h.rotateBy == "function" ? h.rotateBy(t, e, s) : [h.x, h.y] = O(t, h.x, h.y, e, s);
    }), this.shape.options.rotateAngle += t, this.shape.options.groupChildShapes && this.shape.getChildren(!0).forEach((h) => {
      h.points.forEach((r) => {
        typeof r.rotateBy == "function" ? r.rotateBy(t, e, s) : [r.x, r.y] = O(t, r.x, r.y, e, s);
      });
    }));
  }, this.getRotateCenter = (t, e) => {
    const s = this.shape.getRootParent(!0);
    let o, n;
    return s && s.options.groupChildShapes ? [o, n] = s.getCenter(s.options.groupChildShapes) : [o, n] = this.shape.getCenter(this.shape.options.groupChildShapes), this.shape.initCenter && !t && !e && ([t, e] = this.shape.initCenter), t || (t = o), e || (e = n), [t, e];
  }, this.flip = (t, e, s) => {
    if (!t && !e)
      return;
    s = s || this.shape.options.groupChildShapes, this.shape.calcPosition();
    const o = this.shape.getPosition(s);
    this.shape.points.forEach((n) => this.flipPoint(n, t, e, o)), t && (this.shape.options.flippedX = !this.shape.options.flippedX), e && (this.shape.options.flippedY = !this.shape.options.flippedY), this.flipChildren(t, e, o, s);
  }, this.flipChildren = (t, e, s, o) => {
    let n = o ? this.shape.getChildren(!0) : null;
    n && n.forEach((h) => {
      t && (h.options.flippedX = !h.options.flippedX, h.options.flippedY = !h.options.flippedY), h.shape.points.forEach((r) => h.shape.flipPoint(r, t, e, s));
    });
  }, this.flipPoint = (t, e, s, o) => ([t.x, t.y] = k(t.x, t.y, e, s, o), t), this.setupResizeBox = () => {
    if (!this.shape.points.length)
      return null;
    const t = this.getResizeBoxBounds();
    this.shape.resizeBox = new lt().init(this.shape.root, t.left, t.top, t.width, t.height, {
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
    this.shape.rotateBox = new at().init(this.shape.root, t.left, t.top, t.width, t.height, {
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
    const e = this.shape.getRootParent(!0);
    e && e.options.groupChildShapes && (e.options.displayAsPath ? t = e.shape.getPosition(e.options.groupChildShapes) : t = this.shape.getPosition(this.options.groupChildShapes));
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
    const t = this.shape.points.map((s) => s.options ? s.options.width : 0).reduce((s, o) => Math.max(s, o)), e = this.shape.points.map((s) => s.options ? s.options.height : 0).reduce((s, o) => Math.max(s, o));
    return [t, e];
  };
}
function ye(i) {
  this.shape = i, this.contextMenu = null, this.updateContextMenu = () => {
    if (this.shape.options.hasContextMenu && !this.contextMenu ? this.init() : this.shape.options.hasContextMenu || (this.contextMenu = null), this.shape.contextMenu = this.contextMenu, this.contextMenu) {
      const t = this.getMenuItems();
      for (let e of t)
        this.contextMenu.items.find((s) => s.id === e.id) || this.contextMenu.addItem(e.id, e.title, e.image);
    }
  }, this.init = () => {
    i.svg && (this.contextMenu = Z.create([], i.svg, "contextmenu", { customHandler: () => {
    } }), i.options.canAddPoints && this.contextMenu.addItem("i" + i.guid + "_add_point", "Add Point", $), this.displayGroupItems(), this.setEventListeners());
  }, this.getMenuItems = () => {
    const t = [
      { id: "i" + i.guid + "_move_to_top", title: "Move to Top", image: $t },
      { id: "i" + i.guid + "_move_to_bottom", title: "Move to Bottom", image: te },
      { id: "i" + i.guid + "_flip_horizontal", title: "Flip Horizontal", image: nt },
      { id: "i" + i.guid + "_flip_vertical", title: "Flip Vertical", image: ht },
      { id: "i" + i.guid + "_clone", title: "Clone", image: Xt },
      { id: "i" + i.guid + "_export_json", title: "Export to JSON", image: Yt },
      { id: "i" + i.guid + "_export_svg", title: "Export to SVG", image: Zt },
      { id: "i" + i.guid + "_export_png", title: "Export to PNG", image: Jt },
      { id: "i" + i.guid + "_get_base64", title: "Copy Base64 to clipboard", image: se },
      { id: "i" + i.guid + "_destroy", title: "Destroy", image: ot }
    ];
    return i.options.canAddPoints && t.push({ id: "i" + i.guid + "_add_point", title: "Add Point", image: $ }), i.options.zoomable && (t.push({ id: "i" + i.guid + "_zoom_in", title: "Zoom in", image: oe }), t.push({ id: "i" + i.guid + "_zoom_out", title: "Zoom out", image: ne }), t.push({ id: "i" + i.guid + "_reset_zoom", title: "Reset zoom", image: he })), t;
  }, this.setEventListeners = () => {
    this.setOnItemClickListener(), this.contextMenu.on("show", () => {
      this.displayGroupItems();
    });
  }, this.setOnItemClickListener = () => {
    let t, e;
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
          e = this.shape.getRootParent(), t = e || this.shape, t.setOptions({ groupChildShapes: !0 }), t.switchDisplayMode(A.DEFAULT), t.redraw();
          break;
        case "i" + this.shape.guid + "_ungroup":
          e = this.shape.getRootParent(), t = e || this.shape, t.setOptions({ groupChildShapes: !1, displayAsPath: !1 }), t.switchDisplayMode(A.DEFAULT), t.redraw(), t.getChildren().forEach((o) => {
            o.switchDisplayMode(A.DEFAULT), o.redraw();
          });
          break;
        case "i" + this.shape.guid + "_topath":
          e = this.shape.getRootParent(), t = e || this.shape, t.setOptions({ groupChildShapes: !0, displayAsPath: !0 }), t.switchDisplayMode(A.SELECTED), t.redraw(), t.getChildren().forEach((o) => {
            o.switchDisplayMode(A.SELECTED), o.redraw();
          });
          break;
        case "i" + this.shape.guid + "_toshapes":
          e = this.shape.getRootParent(), t = e || this.shape, t.setOptions({ displayAsPath: !1 }), t.switchDisplayMode(A.SELECTED), t.redraw(), t.getChildren().forEach((o) => {
            o.switchDisplayMode(A.SELECTED), o.redraw();
          });
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
    t.options.groupChildShapes ? this.contextMenu.items.find((e) => e.id === "i" + this.shape.guid + "_ungroup") || (this.contextMenu.addItem("i" + this.shape.guid + "_ungroup", "Ungroup", qt), this.contextMenu.removeItem("i" + this.shape.guid + "_group")) : this.contextMenu.items.find((e) => e.id === "i" + this.shape.guid + "_group") || (this.contextMenu.removeItem("i" + this.shape.guid + "_ungroup"), this.contextMenu.addItem("i" + this.shape.guid + "_group", "Group", Kt)), t.options.displayAsPath ? this.contextMenu.items.find((e) => e.id === "i" + this.shape.guid + "_toshapes") || (this.contextMenu.addItem("i" + this.shape.guid + "_toshapes", "Convert to shapes", ie), this.contextMenu.removeItem("i" + this.shape.guid + "_topath")) : this.contextMenu.items.find((e) => e.id === "i" + this.shape.guid + "_topath") || (this.contextMenu.addItem("i" + this.shape.guid + "_topath", "Convert to path", ee), this.contextMenu.removeItem("i" + this.shape.guid + "_toshapes"));
  }, this.onAddPointClick = (t) => {
    if (this.shape.options.maxPoints !== -1 && this.shape.points.length >= this.shape.options.maxPoints)
      return;
    const [e, s] = Y(this.shape.root, t.cursorX, t.cursorY);
    if (this.shape.points.length < 2)
      this.shape.addPoint(e, s);
    else {
      const [o, n] = this.shape.getClosestLine(e, s);
      if (this.shape.getPointIndex(n) === 0)
        this.shape.addPoint(e, s);
      else {
        let h = o;
        this.shape.getPointIndex(n) > this.shape.getPointIndex(o) && (h = n), this.shape.insertPoint(e, s, h);
      }
    }
    this.shape.options.displayMode === A.DEFAULT && this.shape.switchDisplayMode(A.SELECTED);
  }, this.onCloneClick = (t) => {
    let e = this.shape;
    const s = e.getRootParent();
    s && s.options.groupChildShapes && (e = s);
    const o = e.clone({}, e.options.groupChildShapes), n = o.getPosition(!0);
    o.moveTo(n.left + 5, n.top + 5), SmartShapeManager.activateShape(o);
  }, this.onExportJsonClick = (t) => {
    let e = this.shape;
    const s = e.getRootParent();
    s && s.options.groupChildShapes && (e = s);
    const o = e.toJSON(e.options.groupChildShapes), n = new Blob([o]);
    this.saveToFile(n, this.getExportFileName("json"));
  }, this.onExportSvgClick = (t) => {
    let e = this.shape;
    const s = e.getRootParent();
    s && s.options.groupChildShapes && (e = s);
    const o = e.toSvg(), n = new Blob([o]);
    this.saveToFile(n, this.getExportFileName("svg"));
  }, this.onExportPngClick = async (t) => {
    let e = this.shape;
    const s = e.getRootParent();
    s && s.options.groupChildShapes && (e = s);
    const o = await e.toPng(U.BLOB);
    this.saveToFile(o, this.getExportFileName("png"));
  }, this.onGetBase64ToClipboardClick = async (t) => {
    let e = this.shape;
    const s = e.getRootParent();
    s && s.options.groupChildShapes && (e = s), await window.navigator.clipboard.writeText(await e.toPng(U.DATAURL));
  }, this.onDestroyClick = (t) => {
    const e = this.shape.getParent();
    e && e.options.groupChildShapes ? e.destroy() : this.shape.destroy();
  }, this.onMoveToTopClick = (t) => {
    const e = this.shape.getParent();
    e && e.options.groupChildShapes ? e.moveToTop() : this.shape.moveToTop();
  }, this.onMoveToBottomClick = (t) => {
    const e = this.shape.getParent();
    e && e.options.groupChildShapes ? e.moveToBottom() : this.shape.moveToBottom();
  }, this.onFlipHorizontalClick = (t) => {
    const e = this.shape.getParent();
    e && e.options.groupChildShapes ? e.flip(!0, !1) : (this.shape.flip(!0, !1), this.shape.redraw());
  }, this.onFlipVerticalClick = (t) => {
    const e = this.shape.getParent();
    e && e.options.groupChildShapes ? (e.flip(!1, !0), e.redraw(), e.redraw()) : (this.shape.flip(!1, !0), this.shape.redraw());
  }, this.onZoomInClick = (t) => {
    const e = this.shape.getRootParent() || this.shape;
    e.zoomBy(1 + e.options.zoomStep), e.redraw();
  }, this.onZoomOutClick = (t) => {
    const e = this.shape.getRootParent() || this.shape;
    e.zoomBy(1 - e.options.zoomStep), e.redraw();
  }, this.onResetZoomClick = (t) => {
    const e = this.shape.getRootParent() || this.shape;
    e.scaleBy(1 / e.options.zoomLevel, 1 / e.options.zoomLevel), e.options.zoomLevel = 1, e.redraw();
  }, this.saveToFile = (t, e) => {
    const s = window.URL.createObjectURL(t), o = document.createElement("a");
    o.download = e, o.href = s, document.body.appendChild(o), o.click(), document.body.removeChild(o), window.URL.revokeObjectURL(s);
  }, this.getExportFileName = (t) => {
    const s = this.shape.getRootParent() || this.shape;
    return (s.options.id ? s.options.id : "shape") + "." + t;
  }, this.removeMenuEventListeners = () => {
    this.contextMenu.removeEventListener("show", this.onShowListener);
  }, this.destroyContextMenu = () => {
    this.removeMenuEventListeners(), this.contextMenu.destroy();
  };
}
function R() {
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
    flippedY: !1,
    svgLoadFunc: null
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = V(), this.children = [], this.resizeBox = null, this.rotateBox = null, this.initCenter = null, this.shapeMenu = null, this.transformer = null, this.init = (i, t = null, e = null, s = !0) => {
    if (!i) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    if (f.getShape(this)) {
      console.error("This shape already initialized");
      return;
    }
    return this.root = i, this.root.style.position = "relative", this.shapeMenu = new ye(this), this.eventListener = new de(this), this.transformer = new Se(this), this.setOptions(t), this.groupHelper = new rt(this), e && e.length && this.setupPoints(e, S({}, this.options.pointOptions)), this.eventListener.run(), s && this.redraw(), (e && e.length || this.options.forceCreateEvent) && a.emit(l.SHAPE_CREATE, this, {}), this;
  }, this.setOptions = (i) => {
    !i || typeof i != "object" || (m(i.visible) && i.visible !== this.options.visible && (this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: i.visible } }), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: i.visible } })), m(i.fillGradient) && (this.options.fillGradient = {}), m(i.fillImage) && (this.options.fillImage = {}), this.options = S(this.options, i), this.options.simpleMode || this.points.filter((t) => typeof t.setOptions == "function").forEach((t) => {
      t.setOptions(S({}, this.options.pointOptions)), t.options.bounds = this.getBounds(), t.options.visible = i.visible, t.options.zIndex <= this.options.zIndex && (t.options.zIndex = this.options.zIndex + 1), t.redraw();
    }), this.shapeMenu && this.shapeMenu.updateContextMenu());
  }, this.setupPoints = (i, t = {}) => {
    this.points = [], this.isNewObject = !0, this.addPoints(i, S({}, t)), this.isNewObject = !1, this.calcPosition();
  }, this.addPoint = (i, t, e = {}) => {
    let s = this.putPoint(i, t, S({}, this.options.pointOptions, e));
    if (!s)
      return null;
    if (this.options.displayMode !== A.DEFAULT && (e.createDOMElement = !0), s = s.init(i, t, e), s.element) {
      try {
        this.root.appendChild(s.element);
      } catch {
      }
      s.updateContextMenu();
    }
    return this.redraw(), this.options.hasContextMenu && !this.shapeMenu.contextMenu && this.shapeMenu.updateContextMenu(), s;
  }, this.insertPoint = (i, t, e, s = {}) => {
    let o = this.putPoint(i, t, S({}, this.options.pointOptions, s), e);
    if (!o)
      return null;
    this.options.displayMode !== A.DEFAULT && (s.createDOMElement = !0), o = o.init(i, t, s);
    try {
      this.root.appendChild(o.element);
    } catch {
    }
    return o.updateContextMenu(), this.redraw(), this.options.hasContextMenu && !this.shapeMenu.contextMenu && this.shapeMenu.updateContextMenu(), o;
  }, this.addPoints = (i, t = {}) => {
    if (!(!i || typeof i != "object")) {
      if (this.options.simpleMode)
        typeof i[0].x < "u" ? this.points = S({}, i) : this.points = i.map((e) => ({ x: e[0], y: e[1] }));
      else
        for (let e of i) {
          const s = typeof e.x < "u" ? e.x : e[0], o = typeof e.y < "u" ? e.y : e[1];
          this.options.displayMode !== A.DEFAULT && (t.createDOMElement = !0);
          const n = this.putPoint(
            s,
            o,
            S({}, this.options.pointOptions, t)
          );
          if (n && (n.init(n.x, n.y, t), n.element))
            try {
              this.root.appendChild(n.element), n.redraw();
            } catch {
            }
        }
      this.options.hasContextMenu && !this.shapeMenu.contextMenu && this.shapeMenu.updateContextMenu();
    }
  }, this.putPoint = (i, t, e = {}, s = null) => {
    let o = this.getPointIndex(s);
    if (s && o === -1 || !this.isNewObject && this.findPoint(i, t))
      return null;
    e.bounds = this.getBounds(), e.zIndex = this.options.zIndex + 1;
    const n = new re();
    return n.x = i, n.y = t, this.options.displayMode !== A.DEFAULT && (e.createDOMElement = !0), n.setOptions(e), s && o !== -1 ? this.points.splice(o, 0, n) : this.points.push(n), n;
  }, this.getClosestPoint = (i, t, e = null) => {
    if (e || (e = this.getPointsArray()), !e || !e.length)
      return null;
    if (e = e.filter(([o, n]) => !isNaN(parseFloat(o)) && !isNaN(parseFloat(n))), e.length === 1)
      return this.points[0];
    if (!e || !e.length)
      return null;
    const s = e.map(([o, n]) => ({ x: o, y: n, d: P(i, t, o, n) })).reduce((o, n) => o.d < n.d ? o : n);
    return this.findPoint(s.x, s.y);
  }, this.getClosestLine = (i, t) => this.points.map((e, s) => {
    let o = null;
    return s < this.points.length - 1 ? o = this.points[s + 1] : o = this.points[0], [e, o, ut(i, t, e.x, e.y, o.x, o.y)];
  }).filter((e) => e[2] >= 0).reduce((e, s) => e[2] < s[2] ? e : s), this.getPointIndex = (i) => {
    if (i && i.length) {
      if (i.length !== 2)
        return -1;
      i = this.findPoint(...i);
    }
    return !i || !this.isShapePoint(i) ? -1 : this.points.indexOf(i);
  }, this.deleteAllPoints = () => {
    for (; this.points.length; )
      this.points[0].destroy(!1), this.points.splice(0, 1);
    this.points = [];
  }, this.deletePoint = (i, t) => {
    if (this.points.length - 1 < this.options.minPoints)
      return;
    const e = this.findPoint(i, t);
    e && typeof e.destroy == "function" ? e.destroy() : this.points.splice(this.points.indexOf(e), 1);
  }, this.findPoint = (i, t) => {
    const e = this.points.find((s) => s.x === i && s.y === t);
    return typeof e > "u" || !e ? null : e;
  }, this.findPointById = (i) => {
    const t = this.points.find((e) => e.options && e.options.id === i);
    return typeof t > "u" || !t ? null : t;
  }, this.getPointsArray = () => {
    let i = [];
    return this.points && typeof this.points == "object" && this.points.length && (i = this.points.map((t) => [t.x, t.y])), i;
  }, this.moveTo = (i, t, e = !0, s = !0, o = !1) => {
    this.transformer.moveTo(i, t, e, s, o);
  }, this.moveBy = (i, t, e = !0, s = !1) => {
    this.transformer.moveBy(i, t, e, s);
  }, this.scaleTo = (i = null, t = null, e = null) => {
    this.transformer.scaleTo(i, t, e);
  }, this.scaleBy = (i = null, t = null, e = null) => {
    this.transformer.scaleBy(i, t, e);
  }, this.zoomBy = (i) => {
    this.transformer.zoomBy(i);
  }, this.rotateBy = (i, t = null, e = null, s = !1) => {
    this.transformer.rotateBy(i, t, e, s);
  }, this.flip = (i, t, e) => {
    this.transformer.flip(i, t, e);
  }, this.moveToTop = () => {
    v.moveShapeToTop(this);
  }, this.moveToBottom = () => {
    v.moveShapeToBottom(this);
  }, this.changeZIndex = (i) => {
    v.changeShapeZIndex(this, i);
  }, this.isInBounds = (i, t) => {
    const [e, s] = this.transformer.getMaxPointSize(), o = this.getBounds();
    return i >= o.left + e / 2 && i <= o.right - e / 2 && t >= o.top + s / 2 && t <= o.bottom - s / 2;
  }, this.redraw = async () => {
    this.applyDisplayMode(), await v.draw(this), this.options.groupChildShapes && this.redrawChildren();
  }, this.redrawChildren = () => {
    this.getChildren().forEach((i) => {
      this.options.displayAsPath ? this.options.displayMode === A.SELECTED && i.points.filter((t) => t.element).forEach((t) => t.redraw()) : i.redraw();
    });
  }, this.applyDisplayMode = () => {
    this.points.filter((i) => typeof i.setOptions == "function").forEach((i) => {
      const t = { zIndex: this.options.zIndex + 1 };
      t.createDOMElement = this.options.displayMode !== A.DEFAULT, i.setOptions(t), t.createDOMElement && !i.element && i.redraw(), i.element && (i.element.style.zIndex = i.options.zIndex, this.options.displayMode !== A.SELECTED && !i.options.forceDisplay || typeof this.options.svgLoadFunc == "function" ? i.element.style.display = "none" : i.element.style.display = "");
    }), this.options.groupChildShapes && this.applyChildrenDisplayMode();
  }, this.applyChildrenDisplayMode = () => {
    this.getChildren(!0).forEach((i) => {
      i.points.filter((t) => typeof t.setOptions == "function").forEach((t) => {
        if (t.setOptions({ createDOMElement: this.options.displayMode === A.SELECTED }), t.options.createDOMElement && !t.element)
          t.redraw();
        else if (t.element && this.options.displayMode !== A.SELECTED)
          try {
            t.element.parentNode.removeChild(t.element);
          } catch {
          }
        t.options.visible && !t.options.hidden && t.options.canDrag && t.element && typeof this.options.svgLoadFunc != "function" ? t.element.style.display = "" : t.element && (t.element.style.display = "none");
      }), i.options.displayMode = this.options.displayMode;
    });
  }, this.switchDisplayMode = (i = null) => {
    i || (i = this.getNextDisplayMode()), (i === A.SCALE && !this.options.canScale || i === A.ROTATE && !this.options.canRotate || i === A.SELECTED && this.points.length && !this.options.pointOptions.canDrag && typeof this.options.svgLoadFunc != "function") && (i = A.DEFAULT), this.options.displayMode = i, this.applyDisplayMode(), this.options.simpleMode || v.updateOptions(this), i === A.DEFAULT && this.options.groupChildShapes && setTimeout(() => {
      this.getChildren(!0).forEach((t) => {
        t.switchDisplayMode(i);
      });
    }, 10);
  }, this.getNextDisplayMode = () => {
    let i;
    return this.options.displayMode === A.DEFAULT ? i = A.SELECTED : this.options.displayMode === A.SELECTED ? i = A.SCALE : this.options.displayMode === A.SCALE ? i = A.ROTATE : i = A.DEFAULT, i === A.SELECTED && (!this.options.pointOptions.canDrag || typeof this.options.svgLoadFunc == "function") && (i = A.SCALE), i === A.SCALE && !this.options.canScale && (i = A.ROTATE), i === A.ROTATE && !this.options.canRotate && (i = A.DEFAULT), i;
  }, this.calcPosition = () => {
    !this.points.length || Object.assign(this, this.calcPositionFromPointsArray(this.getPointsArray()));
  }, this.updatePosition = (i, t, e = !1) => {
    i < this.left && (e ? this.left = this.oldLeft : (this.oldLeft = this.left, this.left = i)), i > this.right && (e ? this.right = this.oldRight : (this.oldRight = this.right, this.right = i)), t < this.top && (e ? this.top = this.oldTop : (this.oldTop = this.top, this.top = t)), t > this.bottom && (e ? this.bottom = this.oldBottom : (this.oldBottom = this.bottom, this.bottom = t)), this.width = this.right - this.left || 1, this.height = this.bottom - this.top || 1;
  }, this.calcPositionFromPointsArray = (i) => {
    const t = {};
    return t.left = i.map((e) => e[0]).reduce((e, s) => s < e ? s : e, 99999999), t.top = i.map((e) => e[1]).reduce((e, s) => s < e ? s : e, 99999999), t.right = i.map((e) => e[0]).reduce((e, s) => s > e ? s : e, -99999999), t.bottom = i.map((e) => e[1]).reduce((e, s) => s > e ? s : e, -999999999), t.width = C(t.right - t.left) || 1, t.height = C(t.bottom - t.top) || 1, t;
  }, this.getPosition = (i = !1) => i ? this.groupHelper.getPosition() : {
    top: this.top,
    left: this.left,
    bottom: this.bottom,
    right: this.right,
    width: parseFloat(this.width),
    height: parseFloat(this.height)
  }, this.getBounds = () => {
    let i = this.root.clientLeft, t = this.root.clientLeft + this.root.clientWidth, e = this.root.clientTop, s = this.root.clientTop + this.root.clientHeight;
    return this.options.bounds.left !== -1 && (i = this.options.bounds.left), this.options.bounds.right !== -1 && (t = this.options.bounds.right), this.options.bounds.top !== -1 && (e = this.options.bounds.top), this.options.bounds.bottom !== -1 && (s = this.options.bounds.bottom), this.root.style.display === "none" && (i = -1, e = -1, t = -1, s = -1), { left: i, top: e, right: t, bottom: s };
  }, this.isShapePoint = (i) => !!this.points.find((t) => t === i), this.belongsToShape = (i, t, e = !0) => {
    if (!this.isInShapePolygon(i, t))
      return !1;
    const s = _(this.root);
    if (this.findPoint(i - s.left, t - s.top))
      return !0;
    let o = this.getPointsArray();
    return e && (o = o.map((n) => [n[0] + s.left, n[1] + s.top])), gt(o, [i, t]);
  }, this.isInShapePolygon = (i, t) => {
    const e = _(this.root);
    return i >= this.left + e.left && i <= this.right + e.left && t >= this.top + e.top && t <= this.bottom + e.top;
  }, this.addEventListener = (i, t) => this.eventListener.addEventListener(i, t), this.removeEventListener = (i, t) => {
    this.eventListener.removeEventListener(i, t);
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.getChildren().forEach((i) => {
      i.options.visible = !0;
    }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.getChildren().forEach((i) => {
      i.options.visible = !1;
    }), this.redraw();
  }, this.destroy = () => {
    if (a.emit(l.SHAPE_DESTROY, this, {}), this.eventListener && this.eventListener.destroy(), this.resizeBox && this.resizeBox.destroy(), this.rotateBox && this.rotateBox.destroy(), this.root)
      try {
        this.svg && this.root.removeChild(this.svg), this.points.filter((t) => t.element).forEach((t) => this.root.removeChild(t.element));
      } catch {
      }
    this.options.groupChildShapes && this.getChildren(!0).forEach((t) => {
      t.destroy();
    }), this.shapeMenu && this.shapeMenu.contextMenu && this.shapeMenu.destroyContextMenu();
    const i = this.getParent();
    i && i.removeChild(this), this.points.filter((t) => typeof t.destroy == "function").forEach((t) => t.destroy()), this.points = [];
  }, this.getCenter = (i = !1) => {
    const t = this.getPosition(i);
    return [t.left + t.width / 2, t.top + t.height / 2];
  }, this.getShapeSvg = () => v.getShapeSvg(this), this.toSvg = (i = null) => v.toSvg(this, i), this.toPng = (i = U.DATAURL, t = null, e = null, s = null) => v.toPng(this, i, t, e, s), this.toJSON = (i = !0, t = !1) => JSON.stringify(this.getJSON(i, t)), this.clone = (i = {}, t = !0) => {
    const e = S({}, this.getJSON(t));
    e.parent_guid = this.guid, e.options = S(e.options, i);
    const s = new R().fromJSON(this.root, e, t);
    return s ? (s.getChildren(!0).forEach((o) => {
      o.options.id += "_" + f.length(), o.options.name += " " + f.length();
    }), s) : null;
  }, this.getJSON = (i = !0, t = !1) => {
    const e = {
      options: S({}, this.options)
    };
    if (e.options.displayMode = A.DEFAULT, t || this.options.compactExport ? e.points = this.points.map((s) => [s.x, s.y]) : e.points = this.points.filter((s) => typeof s.getJSON == "function").map((s) => s.getJSON()), i) {
      let s = this.getChildren();
      s.length && (e.children = s.map(
        (o) => o.getJSON(i, t || this.options.compactExport)
      ));
    }
    return e;
  }, this.fromJSON = (i, t, e = !0, s = !0) => {
    let o = typeof t == "string" ? Q(t) : t;
    if (!o)
      return null;
    if (this.root = i, f.findShapeById(o.options.id) && (o.options.id += "_" + f.length(), o.options.name += " " + f.length()), this.svg ? this.setOptions(o.options) : (o.options.forceCreateEvent = !1, this.init(i, o.options, null, !1)), o.points.forEach((n) => {
      let h;
      n.length ? (h = this.putPoint(n[0], n[1]), h.setOptions(o.options.pointOptions || {})) : h = this.putPoint(n.x, n.y, n.options || o.options.pointOptions), h && h.updateContextMenu();
    }), f.addShape(this), e && typeof o.children < "u" && o.children && (this.getChildren(!0).forEach((n) => n.destroy()), o.children.forEach((n) => {
      n.parent_guid = this.guid, this.addChild(new R().fromJSON(i, n), !1);
    })), s) {
      const n = f.getShapeByGuid(o.parent_guid);
      a.emit(l.SHAPE_CREATE, this, { parent: n });
    }
    return this;
  }, this.addChild = (i, t) => this.groupHelper.addChild(i, t), this.addChildren = (i = []) => this.groupHelper.addChildren(i), this.removeChild = (i) => this.groupHelper.removeChild(i), this.removeAllChildren = (i = !1) => this.groupHelper.removeAllChildren(i), this.getChildren = (i = !1) => this.groupHelper.getChildren(i), this.hasChild = (i, t = !1) => this.groupHelper.hasChild(i, t), this.getParent = () => this.groupHelper.getParent(), this.getRootParent = (i = null) => this.groupHelper.getRootParent(i), this.getParentsList = (i = []) => this.groupHelper.getParentsList(i), this.mapCurrentPointToOriginal = (i, t) => X(
    i,
    t,
    F.CURRENT_TO_ORIGINAL,
    {
      ...this.options,
      ...this.getPosition(this.options.groupChildShapes)
    }
  ), this.mapOriginalPointToCurrent = (i, t) => X(
    i,
    t,
    F.ORIGINAL_TO_CURRENT,
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
function lt() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = V(), this.options = {
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
  }, this.eventListener = null, this.left_top = null, this.left_center = null, this.left_bottom = null, this.center_top = null, this.center_bottom = null, this.right_top = null, this.right_center = null, this.right_bottom = null, this.init = (i, t, e, s, o, n = {}) => (this.left = parseInt(t), this.top = parseInt(e), this.width = parseInt(s), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new R().init(i, S({}, this.options.shapeOptions), []), a.emit(l.SHAPE_CREATE, this.shape, {}), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new le(this).run(), this), this.setOptions = (i = {}) => {
    !i || typeof i != "object" || (this.options = S(this.options, i), this.options.shapeOptions.zIndex = this.options.zIndex || 1e3, this.options.shapeOptions.id = this.options.id || "", this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.putPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + kt + "')" } }), this.center_top = this.shape.putPoint(this.left + this.width / 2, this.top, { id: this.shape.guid + "_center_top", style: { backgroundImage: "url('" + Ht + "')" } }), this.right_top = this.shape.putPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + jt + "')" } }), this.right_center = this.shape.putPoint(this.right, this.top + this.height / 2, { id: this.shape.guid + "_right_center", style: { backgroundImage: "url('" + Qt + "')" } }), this.right_bottom = this.shape.putPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + Wt + "')" } }), this.center_bottom = this.shape.putPoint(this.left + this.width / 2, this.bottom, { id: this.shape.guid + "_center_bottom", style: { backgroundImage: "url('" + zt + "')" } }), this.left_bottom = this.shape.putPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + Gt + "')" } }), this.left_center = this.shape.putPoint(this.left, this.top + this.height / 2, { id: this.shape.guid + "_left_center", style: { backgroundImage: "url('" + Ft + "')" } }), this.setPointsOptions();
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
    a.emit(l.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (i, t) => this.eventListener.addEventListener(i, t), this.removeEventListener = (i, t) => {
    this.eventListener.removeEventListener(i, t);
  }, this.applyOnlyMove = () => {
    this.options.onlyMove ? (this.shape.svg.style.opacity = 0, this.shape.points.forEach((i) => {
      i.options.visible = !1, i.element && i.redraw();
    })) : (this.shape.svg.style.opacity = 1, this.shape.points.forEach((i) => {
      i.options.visible = this.shape.options.visible, i.element && i.redraw();
    }));
  };
}
try {
  window.ResizeBox = lt, window.SmartShape = R, window.RotateBox = at, window.SmartShapeManager = f, window.SmartShapeGroupHelper = rt, window.SmartShapeDisplayMode = A, window.ShapeEvents = l, window.createEvent = u, window.getMousePos = Y, window.getMouseCursorPos = j;
} catch {
}
export {
  a as EventsManager,
  lt as ResizeBox,
  at as RotateBox,
  l as ShapeEvents,
  R as SmartShape,
  A as SmartShapeDisplayMode,
  de as SmartShapeEventListener,
  rt as SmartShapeGroupHelper,
  f as SmartShapeManager,
  u as createEvent,
  j as getMouseCursorPos,
  Y as getMousePos
};
//# sourceMappingURL=smart_shape.js.map
