function $() {
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
const h = new $(), tt = (e) => e * (Math.PI / 180), et = (e) => e * (180 / Math.PI), T = (e, t, s, i, o) => {
  const n = tt(e), a = (t - i) * Math.cos(n) - (s - o) * Math.sin(n) + i, l = (t - i) * Math.sin(n) + (s - o) * Math.cos(n) + o;
  return [a, l];
}, R = (e, t, s, i) => Math.sqrt(Math.pow(s - e, 2) + Math.pow(i - t, 2)), st = (e, t) => {
  const s = (p, g, c) => g.x <= Math.max(p.x, c.x) && g.x >= Math.min(p.x, c.x) && g.y <= Math.max(p.y, c.y) && g.y >= Math.min(p.y, c.y), i = (p, g, c) => {
    let S = (g[1] - p[1]) * (c[0] - g[0]) - (g[0] - p[0]) * (c[1] - g[1]);
    return S === 0 ? 0 : S > 0 ? 1 : 2;
  }, o = (p, g, c, S) => {
    let N = i(p, g, c), I = i(p, g, S), b = i(c, S, p), B = i(c, S, g);
    return N !== I && b !== B || N === 0 && s(p, c, g) || I === 0 && s(p, S, g) || b === 0 && s(c, p, S) ? !0 : !!(B === 0 && s(c, g, S));
  };
  if (e.length < 3)
    return !1;
  let n = [1e4, t[1]], a = 0, l = 0;
  do {
    let p = (l + 1) % e.length;
    if (o(e[l], e[p], t, n)) {
      if (i(e[l], t, e[p]) === 0)
        return s(
          e[l],
          t,
          e[p]
        );
      a++;
    }
    l = p;
  } while (l !== 0);
  return a % 2 === 1;
}, Q = (e, t, s, i) => !e && !t || !s || !i ? [s, i] : e && t ? [e, t] : (e || (e = t * (s / i)), t || (t = e * (i / s)), [e, t]), D = (e, t = !0) => {
  let s = 0, i = 0;
  if (!t)
    return { top: e.offsetTop - e.scrollTop, left: e.offsetLeft - e.scrollLeft };
  for (; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop); )
    s += e.offsetLeft - e.scrollLeft, i += e.offsetTop - e.scrollTop, e = e.offsetParent;
  return { top: i, left: s };
}, U = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
  const t = Math.random() * 16 | 0;
  return (e === "x" ? t : t & 3 | 8).toString(16);
}).replace(/-/g, ""), W = (e) => {
  try {
    e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault(), e.cancelBubble = !0, e.returnValue = !1;
  } catch {
  }
  return !1;
}, m = (e) => typeof e < "u" && e !== null, C = (e, t) => e && typeof e == "object" && t && typeof t == "object" ? Object.assign(e, t) : e, it = (e) => {
  const t = atob(e.split(",")[1]), s = e.split(",")[0].split(":")[1].split(";")[0], i = new ArrayBuffer(t.length), o = new Uint8Array(i);
  for (let n = 0; n < t.length; n++)
    o[n] = t.charCodeAt(n);
  return new Blob([i], { type: s });
}, F = (e) => new Promise((t) => {
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
}, ot = (e) => {
  let t = e, s = t.indexOf("-");
  for (; s !== -1; )
    t = t.replace("-" + t[s + 1], t[s + 1].toString().toUpperCase()), s = t.indexOf("-");
  return t;
}, d = (e, t = {}) => {
  const s = {};
  for (let i in e)
    i !== "type" && i !== "target" && (s[i] = e[i]);
  return Object.keys(t).forEach((i) => {
    s[i] = t[i];
  }), s;
}, Z = (e, t = null) => (t || (t = e.target.root || e.target), J(t, e.pageX, e.pageY)), J = (e, t, s) => {
  const i = D(e, !0);
  return [t - i.left, s - i.top];
};
function nt() {
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
const O = new nt();
function ht(e) {
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
}, rt = (e, t = {}) => {
  const s = {};
  for (let i in e)
    i !== "type" && i !== "target" && (s[i] = e[i]);
  return Object.keys(t).forEach((i) => {
    s[i] = t[i];
  }), s;
};
function at(e, t, s = null) {
  this.panel = null, this.container = t, this.items = e, this.event = s || "contextmenu", this.listeners = {}, this.origEvent = null, this.cursorX = 0, this.cursorY = 0, this.overflowY = "", this.maxImageHeight = 0, this.subscriptions = {}, this.init = () => (Object.assign(this, new ht(this)), this.container.addEventListener(this.event, (i) => (this.onEvent(i), !1)), O.emit(P.CREATE, this, { owner: this }), this), this.onEvent = (i) => {
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
      const a = this.panel.querySelector("#" + o.id + " > span");
      if (n.style.display = "none", n.src = o.image, !this.panel)
        return;
      const l = document.createElement("div");
      l.style.marginRight = "5px", l.style.display = "flex", l.style.flexDirection = "row", l.style.justifyContent = "center", l.style.alignItems = "center", n.height = this.panel.querySelector("#" + o.id).clientHeight, n.height > this.maxImageHeight && (this.maxImageHeight = n.height), n.style.verticalAlign = "middle", n.style.display = "", l.appendChild(n), this.panel.querySelector("#" + o.id + " div") || this.panel.querySelector("#" + o.id).insertBefore(l, a);
    }
    this.adjustImagesWidth();
  }, this.setItemsEventListeners = () => {
    for (let i of ["click", "mouseover", "mouseout", "dblclick", "mousedown", "mouseup", "mousemove"])
      this.setListenersForMouseEvent(i);
  }, this.setListenersForMouseEvent = (i) => {
    for (let o of this.items)
      this.setListenerForItem(i, o);
  }, this.setListenerForItem = (i, o) => {
    const n = (a) => {
      !this.origEvent || (O.emit(i, this.origEvent.target, rt(a, {
        container: this.container,
        owner: this,
        cursorX: this.cursorX,
        cursorY: this.cursorY,
        itemId: o.id
      })), setTimeout(() => {
        ["click", "mousedown", "mouseup", "dblclick"].indexOf(i) !== -1 && a.button !== 2 && this.hide();
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
    if (!this.container || (O.emit(P.SHOW, this, { owner: this }), this.drawMenu(), !this.panel))
      return;
    this.panel.style.display = "";
    let i = this.cursorX, o = this.cursorY;
    this.panel.style.left = i + "px", this.panel.style.top = o + "px", this.panel.style.zIndex = "10000", this.panel.style.position = "absolute", i + this.panel.clientWidth > window.innerWidth && (i = window.innerWidth - this.panel.clientWidth - 10, this.panel.style.left = i + "px"), this.origEvent && this.origEvent.clientY + this.panel.clientHeight > window.innerHeight && (o = o - (window.innerHeight + this.panel.clientHeight - 20) + this.origEvent.clientY, this.panel.style.top = o + "px");
  }, this.hide = () => {
    this.panel && (this.panel.style.display = "none");
  }, this.addItem = (i, o, n = null) => {
    const a = { id: i, title: o };
    n && (a.image = n), this.items.push(a);
  }, this.removeItem = (i) => {
    const o = this.items.findIndex((n) => n.id === i);
    o !== -1 && this.items.splice(o, 1);
  }, this.findItemById = (i) => Array.from(this.panel.querySelectorAll("div")).find((o) => o.id === i), this.setId = (i) => this.panel.id = i, this.addEventListener = (i, o) => {
    typeof this.subscriptions[i] > "u" && (this.subscriptions[i] = []);
    const n = O.subscribe(i, (a) => {
      a.owner === this && o(a);
    });
    return this.subscriptions[i].push(n), n;
  }, this.removeEventListener = (i, o) => {
    this.subscriptions[i] && typeof this.subscriptions[i] < "u" && this.subscriptions[i].splice(this.subscriptions[i].indexOf(o), 1), O.unsubscribe(i, o);
  }, this.on = (i, o) => this.addEventListener(i, o), this.off = (i, o) => {
    this.removeEventListener(i, o);
  }, this.removeAllEventListeners = () => {
    for (let i in this.subscriptions)
      for (let o of this.subscriptions[i])
        O.unsubscribe(i, o);
    if (this.subscriptions = {}, !!this.panel)
      for (let i in this.listeners) {
        const [o, n] = i.split("_"), a = this.panel.querySelector("#" + n);
        a && a.removeEventListener(o, this.listeners[i]);
      }
  }, this.destroy = () => {
    this.removeAllEventListeners(), this.items = [], this.container = null;
    try {
      document.body.removeChild(this.panel);
    } catch {
    }
    this.panel && (this.panel.innerHTML = ""), this.panel = null, O.emit(P.DESTROY, this, { owner: this });
  };
}
const P = {
  CREATE: "create",
  DESTROY: "destroy",
  SHOW: "show"
};
function pt() {
  this.menus = [], this.create = (e, t, s) => new at(e, t, s).init(), O.subscribe(P.CREATE, (e) => {
    this.menus.indexOf(e.target) === -1 && (this.menus.push(e.target), e.target.id = this.menus.length);
  }), O.subscribe(P.DESTROY, (e) => {
    this.menus.indexOf(e.target) !== -1 && this.menus.splice(this.menus.indexOf(e.target), 1);
  }), O.subscribe(P.SHOW, (e) => {
    this.menus.forEach((t) => {
      t !== e.target && t.hide();
    });
  }), document.addEventListener("mouseup", (e) => {
    e.button !== 2 && this.menus.forEach((t) => t.hide());
  });
}
const G = new pt();
try {
  window.Menus = G;
} catch {
}
const lt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECcZZuWhdAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlZBBEsAgCAMT/v/n7akzWAFtTo5mQ8SAJtkGcL4LXcg211A2L+eq3jc5C/AGTUBZ7wYAHH+B4yIAv8a8dkvilLz9qXuYKseU2E7qDFODqIwTIEkPSldAAa0WlbUAAAAASUVORK5CYII=", dt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECgYlnqNLQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABZSURBVCjPlZFBCgAxCANN/v/n2VOhiFU3N4U4GgXELUkAikbOhlhIh1QZXkR3hGc/IsaVMtHT0RXR3e5jescIqBpy05T/tInffw2AvEkr972N+a69+U8e8AGOtEABr4X+4AAAAABJRU5ErkJggg==", ut = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECkWaNmRawAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABjSURBVCjPlZBRDsAgCENbsnt6/1N0P2ocijASEy08iqC1BknhASCvsSeOQXImJXHcrQL4t1UAr4fjReDmdCsc/5LEZ7NOwOlUKVy3RwC/AAAwL2TAZ3t+xFszOxVl7lbtvsYLOtlZCOj2NccAAAAASUVORK5CYII=", At = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECoXNPPyPgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlVFBEgAhCAL+/2f21I5jqcXFGRMSpG1EkLRtooEyIdaRlAc7orqBsg+gVKy8yTYn49vqMb0pgCUuPOBP93Sniaxb8/FdL6mt/rZe5SMKXQWRf/4AYrs6C0ViuwUAAAAASUVORK5CYII=", gt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDsHep3BSgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA8SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCAZy0h4AXLILDAEWNOwAAAAASUVORK5CYII=", ct = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDMMJZaSygAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA/SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCJxAWZoFp1MBY8cLTv/x72kAAAAASUVORK5CYII=", ft = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQARsznxFAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", Et = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQEbSvcpSwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA3SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTCICjCTbxPJfsIWSv+JECM9nugHAG40DyW1OoLPAAAAAElFTkSuQmCC", mt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDIpd4l3zAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", bt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDYr/evT5AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", xt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDUsSKIVhAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA0SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTBQZBPJfsIWSv+JECM9nugHADv6Dv2P6G4ZAAAAAElFTkSuQmCC", St = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDQQftZYQgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", Y = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAEDSURBVDjLzZPNSsQwEIC/CUWtQlnZi14EYb36Jj6DT+ZT+BSevImHPYggKLpo2bW1Ze14yJjFtKEed3poMpmvzZcf2LqQfkolZFV0FFDhkMI6JR99JAbczTlP/tGZung86yN7Spn+4ABw0PH5DyCoOoSvYOg00s9C+YSpL8oLGgMmnOILF2r68qvKibvWXd9hbsCZ/ajpLniULnKQO82tubb3vY3Uw9IrvhOmCaDFJYC2DyjLt1vNQGjzI5v7+1wrBWTN0uQ3R0OFfQRwz7PjS8td8UAHKFW0rCDqt0ud1mEfKlZ+bYYdNtGQjAFgh6L+M9sRQKev5Yu1F4zfh7ELtIXxA+JiW9aVMPJ4AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", X = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAACn0lEQVRIx+2U30tTYRzGn/fsPdOmNkWDsEDnOiFCbv4KhPJCFAvDtBuRyL/A64TwQkGaCt7pVYqimHhTJAVhuYsRE5zipLuZeQKNsMQdN1vbzvbtwg2Oa5s/uvWBl3Px8P18OO/7ngNc5H9DROw8XTxCumEiygJwjYh4kp7HuqzTiJLBc8aslr5+vbiy43SWaiVExHecztJ+vbgyZrX0EVHOqSVx+ERFee8wR3hcBNky+VpcEofbMvnauAga5ghPVJT3ppKwJIKsqRrr0/3P68+KdeAMgBIFfgjc/cT+6TEATNffmbkaVa1GASAAcgRq3i3L806Xe4gxdqjl8QS4ACBPDPibpIwjOAAUAOBR1fqy8e4MAFwXVGuuZlLi4ErA3wTgBREFGGPRdG+gCytKy3JDTdfvrxv12s4bOXrm6o7PGEok++2PrhHRaJxnjEXSblFMog/7lea1xn8liTGUSPaKD64RMdv4jjEWOvEMtJKIX2lev1fTFdhKLrlkkuyW964RXQo4kOY7ABBVNj0e+eDwMudAsiUfHF5WNj0eANFUkFRbxPdWl268elA3Wyyq1nwx+fBeGJDD3P3oraMjv6r2C2NMPVFARLq91SXpTUvdrEmvWgv0SJtfIWArxN0P5x0d+VW1G2kPOXZNC6dMma+LebD6SgI8o+imHQCC3zzHzuRnCJDVjJXOrT9tAL5rr+mxM4gV+w3dPY7CbCEkciC+DGbJXjS3PFo0tzxqMEt2bVeYLYQaunscAPa18KSJ/SrMyuSgTa4WgnIlaLtVWlR93jYi0hORXvV527ZbpUW5EiRXC0FlctBGROaz/o/Mvumhgd32soU4XNPrVZ+3bbe9bME3PTRwJniCxERE97VwrSTWmc4MTxSdp7vIqfMXBoR6XMSZc1QAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDB/NVeTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwDmjvLwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=", Ot = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAG6SURBVDjLlZK/TxNhGMc/z117FgWbNulITGMYTMvAaHAyhMTAIoOmcdD/wMWERdO4E8If4OJASBgcGcA4QRgx4YcLA4aUYDTRCoX2fj0OvTu441rwuem+7/N5n/f7PA/8ZwholiHuYCCXdMWnxYk4KYwWSws0+JX4GqUFLaqRVmHYWFUfTZ6I4U9ynKyRAUztoNsfq6f4gWrsDI6+VMGMPTMCwIHqGt+xA9Wq3uNFuukIoIUtduiYFs51QDIcwMSKrHn4otcBebJ4QfofmnghYKcANlCQxaj505xcAL0qGM1lFEXwwsH2B/zi0/DXXbps2k0YtDBxAbxvPbtUL7/Xi8HVy90ntXdwVUUgHKGADufedrJUsGKWd2857aXMXLAy4j7nUOxuhdabvfmR86/x0gPO7AFn3lYkCJaqON31HqVCNpZvMkCDA3kVtfUD5/yVYwFQ48qaZShO1VeqbEbKwyfbK+/kx5VtDO4TLO/Rs7FPpVCZ+bm8Za5LpwcAKuTajycebBQAxn9/3st9oSPaEwAVbjcnx+/vDlZON/bza5yJ0j9UNH9Um3h9VNO7/a6OIwWd0sIN09PiH5BSrD/OwMFRAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", yt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAFGUlEQVRIx7WVaWxc1RXHf/ctM+OxPcQLxIljD3GCAYOxiHCSpmmWEgi7kBBIiEXiU79USHxhEaJtWqFWqqhQW1BLIImrVLTwgQBhM2sIEIVFCZDFSbCdxI4X7ExmMjOemffuvacfbA8e1FYNUv/See/o3vf+5/3/5+o8+D9DzSYiolatWhUrFArR2bXa2lr1317OZrMCcPbsWQFIp9PypOt23TsxsbuigIiogx8/d9+StsW/8P1Y8ty/U6avpYCPf/2XbMPdV9/fueZn2wA8gPXr11e/uu2hX1EabQlyeRQKlPofuQVBQCy5XYdwGv3aZGvLJuCfQMEBsNZW+RG/xZSyWAEjqiJCA09ueZtr736CXXuPzdkDI2CtYI0wvvsY1a21RHyvFYgCOACJRMK1RmMsWKuworDiYMXBWMXjf3yF9/f0s+mXjxB6TfR+eLi8Px0Kk5lieP8g9YsvIAiLJBIJp2yR53nKaI21Mu3MbAB/3trLnn0neeap35FsrseGU3y5r8SLO/dy2/XLZ13CfHacjO8Qr6tBl0qIiCorUEq51oYYIxgr05KtsO2FXbzy9n4ee/jnjJ44wOmRQxw5+CnP/r2XqliU51/+BGMs1kDu6Di6KcFUMcBajYh8p8AYo6wOsMagRGERnu55kx1vfc6Plney+bmtXP3jDv72j9dYOL+ODasvp7urjfxUkb9uf4d7b+gmNTBGtK2RIAxBTPmEejNNVkYHGKMRIzz42xfY/ekRrlvXxdruC5mX6MB1XVZ3t2OtMDJ+hoETY3Rd2sLtN69gz5Z3qU3lqN9wEQrBmu8s8gAymYzosITRITvf28fxoQmeePROCqWQMAiZmMxgrSWVyhCEBkQIwxATlFhyYSMr59XyXv4bEp7Cc8CEYaWCdDqNDovoMODowCgbf3IpuXwOgHyhRLEQUBXzwcbAUbiOQ8RXHO0f4tuJM6w+nSeb8ImKQSFoXSKfz1NuciqVQodFQh2w8soWjgyOMjwySVNjNYWpIhFPiMdcfNcS9YSYJ8RjDvGYi2ciTC6/hlxbMx1Lzyc0Bh0EZW5vpoCEQQkThlzRPp/O9iZe/+AQv/nTa2x+/A6y+SI18SijE1mKpQAdWiIRl5XLknxzzOdYop5IcwO+pwiCEOUVKy0ClA6KGB1Mjwmg98PDLOtYiBjN0KkU45NZhsYydHcuIhZ1qa3ycMVgaxYycnyAqzrOI5ctYMXietFyAQegUCiggwJGG7TWaK3pumQBff3f8uyLe/F9RceSBrovWwDG4CkoFgNS6RxnTIxTo4MoMYxOZNDaoIN/pyAsIWLLM+yWn17M7Rs76B9K0fPSF2xYsZh0tsDi5np8L0Y04nH4eJrtvc9z5dIYg8PVNM6LE/UddFiqVAA4WocYY8rxxYFhdn7QRzzm0TcwwchkjisubmLB+TXUVEeIRBw+/3qQI4cPUBfXIMIFDXFELFqHlU0GlNGmYgqv6Gwu53fd2Mn+vjH6T57m/rtWYo3BWOGTfSdJNlXRcF6M9mQdSoQ5PJUWGWPLP47vY113kjVXtfKHnj38fstH3LT2Ik6NZ+loa2Tj6iW0JxuYGTlzuSsK2KGxzGTz/ESjWMN/wgP3rCjnS1vrWNvd+j1iUI7LqfHMJGDnFhjrefmrN+67bfmNyUVN9cpxUY6Hclwcx0WVY/pxsRqxBrEGO3OfXTsxPJbq2fHVm8BYWcYMLgNuBS6Z0/xzhQX6gB3AwR/IcW74F/jUry6yACAoAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", vt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAE8ElEQVRIx7WVWWxVVRSGv733Off2Xjrc0oFKy6XQoqCMEgc0RhFNVBzwQRIfUBKiTyYqCSQmmhiNJkSjiQkJiQ8mKg5xiGKCCIpEZFCCcwlVhlCwrbSlpe1te8/Ze20fTluL4AMaV3KmZGd9a/3r7H/D/xzqb99pIPUfc0ZA8TzALzvee6C5adbTqVRqxgXrGFupDUqBR4EG/LkrfVwc6jjZ9nzDkjuemwjIFFq/OZRyI43EI//Qp0IpnTyDAKU1KDUBPprKpJAgNRTk51cDw8GYNKkwaJTCIHgPWieVeTkX4lWSWCzaGDAhSisUejS/BxdhMqXZUbnHAUpsTH//AH2FYQojMWcGCgBUZNM019eQCsNkpVOgNV4MSgQThHgDSpm/ZEp0UwDjAO9istkSJpWWooIQrwNO/dHNdy2tvL31S2bW17H0yjnkp9aCKLxolLMgHh2GEJBIqAGRCcImUT38884uGeyFIMShCdMZMAFoQxRZPv96P5s/2EJ1RSlrVtzKFc15lNZoE2LSaXSYRpkApQ1kKtANc2uA7jFATeH7z05LoY+ih9N9BY793sVwFBE7x9LrriFXXo54z849+3nl1ddZMKuRh+69lfq6GlSYIkhn0Kk0OghRJeXo/IJaoGsMUDtw4JM/3GAvrW2dvLN9N22dZyhaR29/AWuF8tIM0+vruO+OW5jdlOeZlzdx6Mhx7rnxKlbdvYxcrpIgncWkS1CTcpj8winA6QlDjhAbMWvqZErTIXu+b2FwpEgmFeKVJghCevqH6O79kKqKLLfftITLm6bz7tad7P2xlQ2PPUg+Pw1lDMa582ZQ1/vV2x1u6CxRbPntZCffffwtmeV3MmQt/b09tLed4OCh45w6fpiG2iqWXb2IqvI0c2Y08MrmLQC8vP5hmpubSFVUYZquvQToHOtAiysiEhEYxeSKEnp8kRvP9DBz1QMopXh9234GGvuYZ4Qsll9/2Mv04hkaasrZ8MhKXnprGx/s2M36xmmItZD8T8kNUDaOcNaR7IdBGhdOp3XfPrIlJQTpLCvvXMaifCVvPvs4B776HH/ZDTQtuY0t+1po7+ljwyMrmd1Yh7URYovj6owDJB5BXIS1MfVVZeRKM/SGwu6nnqR6co4X3t9DN2WUV07m+hX3s2Lptaxe/SAvbnqNT789TN/Zfm5ePAdxMWLj8wE2KiJxjIsilLXMnVZD47x6TnScYte6tSyp1fza3sddT2ykc9CwsKGSsrJSamrrWPfoWn48chJxDnEWl/jZuTvZFUfw1uKdgAiBeK6ZeQk9UyrpONbFpT99ST5TRvtQjvlXLaIhtHQdO0I00MNQ+1EWN09FXIx3DhcXzwNoH0d45xCbAEQSR6nOpKia14CIx/qIKcOnSB/tpPeEQQcBxigmaY0ODF4s3sZIVBxXZ8I+sIgVvEsufGJagkJp0EoT4kllQpRS4D3exjg36rChR0UxNijilbqARNbhrYB4RHxi22Pu6AHsqPcrvBp1TMWoH3m88slhVBwZO4TOGbJ09w8OKDzee1RSPqDwPnn3kpBEBHFJIYjHW0Gsw8cWsRE2LtLW0d4HyMQOOt/44uD2NbddvzxXnitRyoBSKG0Sd9QapUwiBeC94MWBCB6X0JWgjaaju+fsxg93bQM6J1oFwBXACmD2hM4uNgQ4DHwEtPzLHBcXfwKfID6QlqygzQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMH81V5MAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDAOaO8vAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==", Bt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAFdSURBVDjLzZO/TsJQFMZ/t1QsmthEjQkmLoZJA7ODq/EdHBx9BcTEmMjCxsA7+Ao+gFOdCImOuoAs/qtIldL2OECxLY1EJ88Zbu6933e+c/988MtQ8akotOQaQqAklSAaS5hkEgQfmzcVTImJEjPfoMNjIjv5hpiiEgqiyJLXLiVAEpWU0oJ9HpQHoEeaWWFZPpGbiy17QlK35vaBqBAXaWajzp3sYWFJUQzRx2lIEQtLNmVMGQ0ZzPYuXQQX6OON5EGgjxstHkrp8k4A8c1xpBJgAMAwhTBMJ7jT1X5WGP5nBQ1dvve1mQq1wjGEX02rFX5S8HPOh16pVOYjiAHNnIeXTuidtc/XnOv4ERa8ky42fkpL9dXyfTnLXAzf54UmvdBCCkB01hcPHZ0djHh15QVHdHBV5BYAfOzq06npXMXhhl995TkKnxhINEqUyE49WYtW3JxRx82w/x/jC67KmykWiVPXAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", Ct = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAACQElEQVRIx9WUz2sTURDHPzMvIb3VgyJKW/DXSXoKtSJIbaxtgi3of+BfIYKXgOAfUCh6zFFR9Ca1tomXigf7P/SQqo2giIrNpvvGw+7GStIlG/HgLI8dHvPmOzPvw4P/3SRx1hurde/9bL8g7z1mhveGWeQj0liq3CgNrLS28cKy2JNnj2yQvLnE6XQ6AHz/8Q3vPd6HhMk/3CcMw2j5fU5NnCMI2gMV3hUIggCAdrDHy9U1zDzeopF4b5g3jJCZKzN/xA8h0Ga2NAMIZoYRz91b3JmP4ttZBeIDPgzZWK8DgghEgzbMADNKc6W/6yD0nqtzJUQEVY2FonXQ2lkFkgNOlXq9gYoiqqgIiCJETM+XF7oFrTxYtjNnT6ci3NOBc45yuYxTh3MOVYeqxt0QJYjjp6cuUSwWe6p++vzxbE8HiYCosv5qI0rqFKeOxeuLqHOICHbgkr98/czH1k4qwj2XLMD8wjWcy5FzDudyICDxZ/FdBEHAm81Nms1mKsI9HRw/djL10hyuGz81fYHJyfOpCHcFDNu8c/f2RUveHTMS38xcNPookXlPYWSErXdbtHZ3UxHuCtyr3r9crd4qbCcb27+rHp848XNp8SYfdndQVUSEkUKBsbFxRo+MpiKcO7Bv1Wptr99YVh4uUywWab4/SqPxGhVFnaPV+nQowv0EDrVOp4Oqks/nqVQqAyGcSWAYhLMJDIHwUB1kQTiTQBrC0RtkRAhH+7l87m1yVgYRAOQwhPtZrVZrk7z0/9p+AWdQwNFPdOB+AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDA5LTEyLTAxVDAyOjIyOjM1KzAxOjAwqBTIawAAACV0RVh0ZGF0ZTptb2RpZnkAMjAwOS0xMi0wMVQwMjoyMjozNSswMTowMNlJcNcAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAE3RFWHRUaXRsZQBPcHRpY2FsIERyaXZlPme6DAAAAABJRU5ErkJggg==", _t = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAAB3RJTUUH5goLBzIP6fiS+gAAAoFJREFUSMfVVk1rE2EQft55EyKeFU0PlcR6koIa+0FBa2NtEmyL9uLBIoHi0YvFogghIIjoTbx4MldB8BRUTJNeqh7MwT+gPaSpKdjak2bTnfGw3SVhP5p4EFxYmJf5eGbmfXZmgf/9UbZQqrwtM/OElxEzQ0TALBCxZChVmclcSe4HEGoLMjEwv+AoYvV6oOOr1y87kvkajYotxzc2lAug1Wp1BPi5swWTGcwmTHMXpmlaL+8i1n8ChtHsqkUOgGEYHYpisQgWqyXMAmGBwMT4hXFP+64AYvU66o0aFICx08OOUbj6EcICZgYzW/ZNw7ct3gBNKyM2TSyXyjjfZrRcKkMEgAiSk8m/rwAATGZcnEyi/UZSqRSU6kyw2SuA7aCJUC5XQE8eQRGBlMLoqbMdTt8AzAF4k7uH4wNxiAiKLOJFYVcFWmuk02lo0tBag0jjx+07ntmNDI0hkUgEUtgFoIhQer8MIgJpgiaNMz7lb+9s4fvmeiCFXZesAEylLkHrEEJaQ+sQGj4AH1ZXUavVAinsquDI4b6u58zQyDAGB096UtgFIJDVu/eXRsWeOyKw5VuA9gKofq5is9EIpLAD8CD/8Fw+n42s7Z1zz9/9snUvbmYxM30VG411EBGUUjgQieD6fNYJdPBL1ZPCobaEJJ8v/LYPuWjUURztiyKRSKBWP4RKZQWkCKQ14m3OK+UVTKVT/hUEPa1WC0SEcDiMTCbjUHh7ccmxmZmdtb6BIAC/2fLYMMSTws+eYvryNEhr1PqPOXGMhRu9VRBEYShAoXOM9NyiXinsC+A3coMobK1RAa7N7e0NRkipT66dvN/ubqcw1oKNC4VCE4D8k7+KP78ve+ZyfaadAAAAAElFTkSuQmCC";
function Mt(e) {
  this.point = e, this.contextMenu = null, this.updateContextMenu = () => {
    this.contextMenu && (this.contextMenu.destroy(), this.contextMenu = null), this.point.options.canDelete && this.init(), this.point.contextMenu = this.contextMenu;
  }, this.init = () => {
    this.point.element && (this.contextMenu = G.create([
      { id: "i" + this.point.guid + "_delete", title: "Delete point", image: X }
    ], this.point.element), this._setEventListeners());
  }, this._setEventListeners = () => {
    this.contextMenu.on("click", (t) => {
      t.itemId === "i" + e.guid + "_delete" && h.emit(A.POINT_DELETE_REQUEST, this.point);
    });
  };
}
function Pt() {
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
      f.LEFT,
      f.TOP,
      f.RIGHT,
      f.BOTTOM
    ],
    visible: !0,
    hidden: !1,
    forceDisplay: !1
  }, this.x = 0, this.y = 0, this.element = null, this.guid = U(), this.subscriptions = {}, this.init = (e, t, s = null) => (this.x = parseInt(e), this.y = parseInt(t), Object.assign(this, new Mt(this)), this.element = this.createPointUI(), this.setOptions(Object.assign({}, s)), this.setEventListeners(), h.emit(A.POINT_ADDED, this), this), this.setOptions = (e) => {
    this.element || (this.element = document.createElement("div")), e && typeof e == "object" && (e.style && typeof e.style == "object" && (e.style = Object.assign(this.options.style, e.style)), Object.assign(this.options, e)), this.options.id && (this.element.id = this.options.id);
  }, this.createPointUI = () => {
    const e = document.createElement("div");
    return this.options.canDrag ? this.setPointStyles(e) : e;
  }, this.setPointStyles = (e = null) => {
    if (this.element || (this.element = document.createElement("div")), e == null && (e = this.element), this.options.id && (this.element.id = this.options.id), e.className = this.options.classes, e.style = this.options.style, typeof this.options.style == "object")
      for (let t in this.options.style)
        e.style[ot(t)] = this.options.style[t];
    return e.style.width = this.options.width + "px", e.style.height = this.options.height + "px", e.style.left = this.x - parseInt(this.options.width / 2) + "px", e.style.top = this.y - parseInt(this.options.height / 2) + "px", e.style.zIndex = this.options.zIndex, !this.options.canDrag || !this.options.visible || this.options.hidden ? e.style.display = "none" : e.style.display = "", e.style.position = "absolute", typeof this.updateContextMenu == "function" && this.updateContextMenu(), e;
  }, this.redraw = () => {
    this.element = this.setPointStyles();
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.rotateBy = (e, t, s) => {
    const [i, o] = T(e, this.x, this.y, t, s);
    this.x = i, this.y = o;
  }, this.setEventListeners = () => {
    this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown), this.element.addEventListener("mouseover", this.mouseover), this.element.addEventListener("mouseout", this.mouseout), this.element.addEventListener("click", this.click), this.element.addEventListener("dblclick", this.doubleclick), this.element.addEventListener("mousemove", this.mousemove), h.subscribe(k.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange);
  }, this.mousedown = (e) => {
    h.emit(A.POINT_MOUSE_DOWN, this, d(e)), e.buttons === 1 && this.options.canDrag && (h.emit(A.POINT_DRAG_START, this, d(e)), W(e));
  }, this.mousemove = (e) => {
    if (h.emit(A.POINT_MOUSE_MOVE, this, d(e)), e.buttons !== 1 || !this.options.canDrag || !E.draggedShape || E.draggedShape.draggedPoint !== this)
      return;
    const t = this.x, s = this.y, i = D(this.element.parentNode, !0);
    if (!this.checkFitBounds(this.x + e.movementX, this.y + e.movementY)) {
      h.emit(A.POINT_DRAG_MOVE, this, d(e, { oldX: t, oldY: s }));
      return;
    }
    let o = e.clientX + window.scrollX - i.left - this.options.width / 2, n = e.clientY + window.scrollY - i.top - this.options.height / 2;
    [o, n] = this.applyMoveRestrictions(o, n, t, s), this.x = o, this.y = n, this.element.style.left = this.x + "px", this.element.style.top = this.y + "px", h.emit(A.POINT_DRAG_MOVE, this, d(e, { oldX: t, oldY: s }));
  }, this.mouseover = (e) => {
    h.emit(A.POINT_MOUSE_OVER, this, d(e));
  }, this.mouseout = (e) => {
    h.emit(A.POINT_MOUSE_OUT, this, d(e));
  }, this.click = (e) => {
    h.emit(A.POINT_MOUSE_CLICK, this, d(e));
  }, this.doubleclick = (e) => {
    h.emit(A.POINT_MOUSE_DOUBLE_CLICK, this, d(e));
  }, this.checkFitBounds = (e, t) => !(this.options.bounds.left !== -1 && e < this.options.bounds.left || this.options.bounds.right !== -1 && e > this.options.bounds.right || this.options.bounds.top !== -1 && t < this.options.bounds.top || this.options.bounds.bottom !== -1 && t > this.options.bounds.bottom), this.applyMoveRestrictions = (e, t, s, i) => (t > i && this.options.moveDirections.indexOf(f.BOTTOM) === -1 && (t = i), t < i && this.options.moveDirections.indexOf(f.TOP) === -1 && (t = i), e > s && this.options.moveDirections.indexOf(f.RIGHT) === -1 && (e = s), e < s && this.options.moveDirections.indexOf(f.LEFT) === -1 && (e = s), e > this.options.bounds.right && this.options.bounds.right !== -1 && (e = this.options.bounds.right), t > this.options.bounds.bottom && this.options.bounds.bottom !== -1 && (t = this.options.bounds.bottom), e < this.options.bounds.left && this.options.bounds.left !== -1 && (e = this.options.bounds.left), t < this.options.bounds.top && this.options.bounds.top !== -1 && (t = this.options.bounds.top), [e, t]), this.mouseup = (e) => {
    h.emit(A.POINT_MOUSE_UP, this, d(e)), e.button !== 2 && h.emit(A.POINT_DRAG_END, this, d(e));
  }, this.onBoundsChange = (e) => {
    e.points.find((t) => t === this) && (this.options.bounds = e.bounds);
  }, this.toJSON = () => JSON.stringify(this.getJSON()), this.getJSON = () => ({
    x: this.x,
    y: this.y,
    options: Object.assign({}, this.options)
  }), this.fromJSON = (e) => {
    let t = e;
    if (typeof t == "string" && (t = H(e)), !t)
      return null;
    this.x = t.x, this.y = t.y;
    let s = !1;
    return this.element || (s = !0, this.element = document.createElement("div")), this.setOptions(t.options), s && h.emit(A.POINT_ADDED, this), this;
  }, this.destroy = () => {
    this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), this.element.removeEventListener("mouseover", this.mouseover), this.element.removeEventListener("mouseout", this.mouseout), this.element.removeEventListener("click", this.click), this.element.removeEventListener("dblclick", this.doubleclick), this.element.removeEventListener("mousemove", this.mousemove), h.unsubscribe(k.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange), h.emit(A.POINT_DESTROYED, this);
    for (let e in this.subscriptions)
      this.subscriptions[e].forEach((s) => h.unsubscribe(e, s)), this.subscriptions[e] = [];
  }, this.addEventListener = (e, t) => {
    typeof this.subscriptions[e] > "u" && (this.subscriptions[e] = []);
    const s = h.subscribe(e, (i) => {
      i.target && i.target.guid === this.guid && t(i);
    });
    return this.subscriptions[e].push(s), s;
  }, this.removeEventListener = (e, t) => {
    this.subscriptions[e] && typeof this.subscriptions[e] < "u" && this.subscriptions[e].splice(this.subscriptions[e].indexOf(t), 1), h.unsubscribe(e, t);
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
}, f = {
  TOP: 0,
  LEFT: 1,
  RIGHT: 2,
  BOTTOM: 3
};
function It(e) {
  this.rotateBox = e, this.subscriptions = {
    rotate: []
  }, this.initialAngle = 0, this.previousAngle = 0, this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    this.interceptEventsFromShape(), this.rotateBox.shape.points.forEach((t) => {
      t.mousemove = this.mousemove, t.mouseDownListener = t.addEventListener(A.POINT_DRAG_START, (s) => {
        this.onPointMouseDown(s), h.emit(r.POINT_DRAG_START, this.rotateBox, { point: t });
      }), t.mouseUpListener = t.addEventListener(A.POINT_DRAG_END, (s) => {
        this.onPointMouseUp(s), h.emit(r.POINT_DRAG_END, this.rotateBox, { point: t });
      });
    });
  }, this.interceptEventsFromShape = () => {
    r.getShapeMouseEvents().forEach((t) => {
      this.shapeEventListeners[t.name] = this.rotateBox.shape.addEventListener(t.name, (s) => {
        t.key === "SHAPE_MOVE_END" && (this.previousAngle = 0), h.emit(t.name, this.rotateBox, s);
      });
    });
  }, this.mousemove = (t) => {
    if (t.buttons !== 1) {
      h.emit(r.SHAPE_MOUSE_MOVE, this.rotateBox.shape, d(t, { clientX: t.clientX, clientY: t.clientY }));
      return;
    }
    const [s, i] = Z(t, this.rotateBox.shape.root), [o, n] = this.rotateBox.shape.getCenter();
    let a = this.calcAngle(s, i, o, n);
    if (a === null)
      return;
    let l = a;
    this.previousAngle && (l -= this.previousAngle), this.previousAngle = a, h.emit(w.ROTATE_BOX_ROTATE, this.rotateBox, { angle: l });
  }, this.calcAngle = (t, s, i, o) => {
    const n = this.calcHypotenuse(t, s, i, o);
    if (n <= 0)
      return null;
    const a = this.calcCathetus(t, s, i, o), l = this.calcStartAngle(t, s, i, o);
    return Math.round(et(Math.asin(a / n)) + l + this.initialAngle);
  }, this.calcHypotenuse = (t, s, i, o) => R(t, s, i, o), this.calcCathetus = (t, s, i, o) => {
    if (t <= i && s <= o)
      return R(t, s, t, o);
    if (t >= i && s <= o)
      return R(t, s, i, s);
    if (t >= i && s >= o)
      return R(t, s, t, o);
    if (t <= i && s >= o)
      return R(t, s, i, s);
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
    const i = h.subscribe(t, (o) => {
      o.target && o.target.shape && o.target.shape.guid === this.rotateBox.shape.guid && s(o);
    });
    return this.subscriptions[t].push(i), i;
  }, this.removeEventListener = (t, s) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(s), 1), h.unsubscribe(t, s);
  }, this.destroy = () => {
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((i) => h.unsubscribe(t, i)), this.subscriptions[t] = [];
    Object.keys(this.shapeEventListeners).forEach(
      (t) => {
        this.rotateBox.removeEventListener(t, this.shapeEventListeners[t]);
      }
    ), this.rotateBox.shape.points.forEach((t) => {
      t.removeEventListener(A.POINT_DRAG_START, t.mouseDownListener), t.removeEventListener(A.POINT_DRAG_END, t.mouseUpListener);
    });
  };
}
const w = {
  ROTATE_BOX_ROTATE: "rotate"
};
function Rt(e) {
  this.resizeBox = e, this.subscriptions = {
    resize: []
  }, this.guid = U(), this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    h.subscribe(A.POINT_DRAG_MOVE, this.onPointDragMove), h.subscribe(A.POINT_DRAG_END, this.onPointDragMove), r.getShapeMouseEvents().forEach((t) => {
      this.shapeEventListeners[t.name] = this.resizeBox.shape.addEventListener(t.name, (s) => {
        h.emit(t.name, this.resizeBox, s);
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
    this.resizeBox.redraw(), h.emit(r.POINT_DRAG_END, this.resizeBox, d(t, { point: t.target })), h.emit(L.RESIZE_BOX_RESIZE, this.resizeBox, { oldPos: s, newPos: i });
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
    const i = h.subscribe(t, (o) => {
      o.target && o.target.guid && o.target.guid === this.resizeBox.guid && s(o);
    });
    return this.subscriptions[t].push(i), i;
  }, this.removeEventListener = (t, s) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(s), 1), h.unsubscribe(t, s);
  }, this.destroy = () => {
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((i) => h.unsubscribe(t, i)), this.subscriptions[t] = [];
    Object.keys(this.shapeEventListeners).forEach(
      (t) => {
        this.resizeBox.removeEventListener(t, this.shapeEventListeners[t]);
      }
    ), h.unsubscribe(A.POINT_DRAG_MOVE, this.onPointDragMove), h.unsubscribe(A.POINT_DRAG_END, this.onPointDragMove);
  };
}
const L = {
  RESIZE_BOX_RESIZE: "resize"
};
function Tt(e) {
  this.shape = e, this.subscriptions = {
    CONTAINER_BOUNDS_CHANGED: []
  }, this.run = () => (this.shape = e, this.setEventListeners(), this), this.setEventListeners = () => {
    h.subscribe(A.POINT_DESTROYED, this.onPointDestroyed), h.subscribe(A.POINT_ADDED, this.onPointAdded), h.subscribe(A.POINT_DRAG_MOVE, this.onPointDragMove), h.subscribe(A.POINT_DELETE_REQUEST, this.onPointDeleteRequest);
  }, this.setSvgEventListeners = () => {
    this.svg_mouseover = this.shape.svg.addEventListener("mouseover", (t) => {
      E.mouseover(d(t, { target: this.shape }));
    }), this.svg_mouseout = this.shape.svg.addEventListener("mouseout", (t) => {
      E.mouseout(d(t, { target: this.shape }));
    }), this.svg_mouseenter = this.shape.svg.addEventListener("mouseenter", (t) => {
      E.mouseenter(d(t, { target: this.shape }));
    }), this.svg_mousedown = this.shape.svg.addEventListener("mousedown", (t) => {
      E.mousedown(d(t, { target: this.shape }));
    }), this.svg_click = this.shape.svg.addEventListener("click", (t) => {
      E.click(d(t, { target: this.shape }));
    }), this.svg_dblclick = this.shape.svg.addEventListener("dblclick", (t) => {
      E.doubleclick(d(t, { target: this.shape }));
    });
  }, this.removeSvgEventListeners = () => {
    this.shape.svg.removeEventListener("mouseover", this.svg_mouseover), this.shape.svg.removeEventListener("mouseout", this.svg_mouseout), this.shape.svg.removeEventListener("mouseenter", this.svg_mouseenter), this.shape.svg.removeEventListener("mousedown", this.svg_mousedown), this.shape.svg.removeEventListener("click", this.svg_click), this.shape.svg.removeEventListener("dblclick", this.svg_dblclick);
  }, this.addResizeEventListener = () => {
    !this.shape.resizeBox || (this.resizeBoxListener = this.shape.resizeBox.addEventListener(L.RESIZE_BOX_RESIZE, this.onResize), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOVE_START, this.mousedown), this.resizeMouseMoveEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_MOVE, this.mousemove), this.resizeClickEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_CLICK, this.click), this.resizeDblClickEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_DOUBLE_CLICK, this.svg_dblclick), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_DOWN, this.svg_mousedown), this.resizeMouseOverEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_OVER, this.svg_mouseover), this.resizeMouseOutEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_OUT, this.svg_mouseout), this.resizeMouseUpEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_UP, (t) => {
      h.emit(r.SHAPE_MOUSE_UP, this.shape, d(t));
    }), this.resizeBoxContextMenuEventListener = this.shape.resizeBox.shape.svg.addEventListener("contextmenu", (t) => {
      this.shape.contextMenu && this.shape.contextMenu.onEvent(t);
    }));
  }, this.addRotateEventListener = () => {
    !this.shape.rotateBox || (this.rotateBoxListener = this.shape.rotateBox.addEventListener(w.ROTATE_BOX_ROTATE, this.onRotate), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOVE_START, this.mousedown), this.rotateMouseMoveEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_MOVE, this.mousemove), this.rotateClickEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_CLICK, this.click), this.rotateDblClickEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_DOUBLE_CLICK, this.svg_dblclick), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_DOWN, this.svg_mousedown), this.rotateMouseUpEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_UP, (t) => {
      h.emit(r.SHAPE_MOUSE_UP, this.shape, d(t));
    }), this.rotateMouseOverEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_OVER, this.svg_mouseover), this.rotateMouseOutEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_OUT, this.svg_mouseout), this.rotatePointDragStartEventListener = this.shape.rotateBox.addEventListener(r.POINT_DRAG_START, (t) => {
      this.shape.initCenter = this.shape.getCenter(this.shape.options.groupChildShapes);
    }), this.rotatePointDragEndEventListener = this.shape.rotateBox.addEventListener(r.POINT_DRAG_END, (t) => {
      this.shape.initCenter = null, this.shape.points.forEach((s) => {
        s.options.hidden || (s.element.style.display = "");
      });
    }), this.rotateBoxContextMenuEventListener = this.shape.rotateBox.shape.svg.addEventListener("contextmenu", (t) => {
      this.shape.contextMenu && this.shape.contextMenu.onEvent(t);
    }));
  }, this.onResize = (t) => {
    const s = this.shape.getRootParent(!0);
    if (s) {
      h.emit(L.RESIZE_BOX_RESIZE, s.resizeBox, { newPos: t.newPos, oldPos: t.oldPos });
      return;
    }
    const i = t.newPos.left - t.oldPos.left, o = t.newPos.top - t.oldPos.top;
    this.shape.moveBy(i, o);
    const [n, a] = this.shape.getMaxPointSize();
    this.shape.scaleTo(t.newPos.width - n * 2, t.newPos.height - a * 2), this.shape.redraw(), h.emit(L.RESIZE_BOX_RESIZE, this.shape, t);
  }, this.onRotate = (t) => {
    const s = this.shape.getRootParent(!0);
    if (s) {
      h.emit(w.ROTATE_BOX_ROTATE, s.rotateBox, { angle: t.angle });
      return;
    }
    this.shape.rotateBy(t.angle), this.shape.redraw(), h.emit(w.ROTATE_BOX_ROTATE, this.shape, t);
  }, this.mousedown = (t) => {
    W(t), h.emit(r.SHAPE_MOUSE_DOWN, this.shape, d(t)), setTimeout(() => {
      h.emit(r.SHAPE_MOVE_START, this.shape, d(t, { pos: this.shape.getPosition(!0) }));
    }, 100);
  }, this.mousemove = (t) => {
    if (this.shape.draggedPoint || h.emit(r.SHAPE_MOUSE_MOVE, this.shape, d(t)), this.shape.draggedPoint) {
      h.emit(r.POINT_DRAG_MOVE, this.shape, { point: this.shape.draggedPoint }), this.shape.draggedPoint.mousemove(t);
      return;
    }
    if (!this.shape.options.canDragShape)
      return;
    const [s, i] = this.calcMovementOffset(t);
    if (s === null || i === null)
      return;
    const o = this.shape.getPosition(!0);
    this.shape.moveBy(s, i), this.shape.redraw();
    const n = this.shape.getPosition(!0);
    h.emit(r.SHAPE_MOVE, this.shape, d(t, { oldPos: o, newPos: n }));
  }, this.mouseenter = (t) => {
    h.emit(r.SHAPE_MOUSE_ENTER, this.shape, d(t));
  }, this.mouseover = (t) => {
    E.draggedShape !== this.shape && h.emit(r.SHAPE_MOUSE_OVER, this.shape, d(t));
  }, this.mouseout = (t) => {
    h.emit(r.SHAPE_MOUSE_OUT, this.shape, d(t));
  }, this.click = (t) => {
    h.emit(r.SHAPE_MOUSE_CLICK, this.shape, d(t));
  }, this.doubleclick = (t) => {
    h.emit(r.SHAPE_MOUSE_DOUBLE_CLICK, this.shape, d(t));
  }, this.calcMovementOffset = (t) => {
    this.shape.calcPosition();
    const s = this.shape.getPosition(!0);
    let i = t.movementX, o = t.movementY, n = t.clientX + window.scrollX, a = t.clientY + window.scrollY;
    const l = s.left + i, p = s.top + o, g = D(this.shape.root, !0), c = this.shape.getBounds();
    return l < c.left || l + s.width > c.right ? [null, null] : p < c.top || p + s.height > c.bottom ? [null, null] : (n < l + g.left && (i = n - (l + g.left)), a < p + g.top && (o = a - (p + g.top)), n > l + s.width + g.left && (i = n - (s.width + g.left + s.left)), a > p + s.height + g.right && (o = a - (s.height + g.top + s.top)), [i, o]);
  }, this.onPointAdded = (t) => {
    !this.shape.isShapePoint(t.target) || h.emit(r.POINT_ADDED, this.shape, { point: t.target });
  }, this.onPointDragMove = (t) => {
    this.shape.isShapePoint(t.target) && this.shape.redraw();
  }, this.onPointDestroyed = (t) => {
    !this.shape.isShapePoint(t.target) || (this.shape.points.splice(this.shape.points.indexOf(t.target), 1), this.shape.root.removeChild(t.target.element), this.shape.redraw(), h.emit(r.POINT_DESTROYED, this.shape, { point: t.target }));
  }, this.onPointDeleteRequest = (t) => {
    !this.shape.isShapePoint(t.target) || this.shape.deletePoint(t.target.x, t.target.y);
  }, this.addEventListener = (t, s) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const i = h.subscribe(t, (o) => {
      o.target && o.target.guid === this.shape.guid && s(o);
    });
    return this.subscriptions[t].push(i), i;
  }, this.removeEventListener = (t, s) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(s), 1), h.unsubscribe(t, s);
  }, this.destroy = () => {
    h.unsubscribe(A.POINT_ADDED, this.onPointAdded), h.unsubscribe(A.POINT_DRAG_MOVE, this.onPointDragMove), h.unsubscribe(A.POINT_DESTROYED, this.onPointDestroyed), h.unsubscribe(A.POINT_DELETE_REQUEST, this.onPointDeleteRequest), this.shape.resizeBox && (this.shape.resizeBox.removeEventListener(L.RESIZE_BOX_RESIZE, this.resizeBoxListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_CLICK, this.resizeClickEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_MOVE, this.resizeMouseMoveEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOVE_START, this.resizeMouseDownEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_UP, this.resizeMouseUpEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_DOUBLE_CLICK, this.resizeDblClickEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_OVER, this.resizeMouseOverEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_OUT, this.resizeMouseOutEventListener), this.shape.resizeBox.removeEventListener("contextmenu", this.resizeBoxContextMenuEventListener)), this.shape.rotateBox && (this.shape.rotateBox.removeEventListener(w.ROTATE_BOX_ROTATE, this.rotateBoxListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_CLICK, this.rotateClickEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_MOVE, this.rotateMouseMoveEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOVE_START, this.rotateMouseDownEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOVE_START, this.rotatePointDragStartEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOVE_START, this.rotatePointDragEndEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_UP, this.rotateMouseUpEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_DOUBLE_CLICK, this.rotateDblClickEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_OVER, this.rotateMouseOverEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_OUT, this.rotateMouseOutEventListener), this.shape.rotateBox.removeEventListener("contextmenu", this.rotateBoxContextMenuEventListener));
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((i) => h.unsubscribe(t, i)), this.subscriptions[t] = [];
  };
}
const r = {
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
  getShapeMouseEvents: () => Object.keys(r).filter((e) => ["SHAPE_CREATE", "SHAPE_DESTROY", "SHAPE_RESIZE", "SHAPE_ROTATE"].indexOf(e) === -1 && typeof r[e] != "function").map((e) => ({ key: e, name: r[e] }))
};
function wt() {
  this.draw = (e) => {
    if (e.svg)
      try {
        e.eventListener.removeSvgEventListeners(), e.svg.innerHTML = "";
      } catch {
      }
    else
      e.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), e.svg.ondragstart = function() {
        return !1;
      }, e.eventListener.setSvgEventListeners(), e.root.appendChild(e.svg);
    if (e.points.length < 1)
      return;
    e.contextMenu || e.updateContextMenu(), this.updateOptions(e);
    const t = this.drawPolygon(e);
    e.svg.appendChild(t);
  }, this.updateOptions = (e) => {
    if (!e.svg || typeof e.svg > "u")
      return;
    typeof e.options.visible < "u" && (e.svg.style.display = e.options.visible ? "" : "none"), e.calcPosition(), e.svg.id = e.options.id, e.svg.style.position = "absolute", e.svg.style.cursor = "default", e.svg.style.left = e.left + "px", e.svg.style.top = e.top + "px", e.svg.setAttribute("width", e.width), e.svg.setAttribute("height", e.height), e.svg.setAttribute("guid", e.guid), this.setupShapeFill(e), this.setupSVGFilters(e), e.svg.style.zIndex = e.options.zIndex;
    const t = e.getRootParent(!0);
    this.updatePoints(e, t), this.redrawResizeBox(t || e), this.redrawRotateBox(t || e);
  }, this.updatePoints = (e, t) => {
    e.points.forEach((s) => {
      s.element.parentNode !== e.root && e.root.appendChild(s.element), s.options.zIndex < e.options.zIndex + 2 && (s.options.zIndex = e.options.zIndex + 2), e.options.visible || (s.options.visible = !1), s.redraw(), e.options.displayMode === u.DEFAULT && !s.options.forceDisplay && ((!t || t && t.options.displayMode === u.DEFAULT) && (s.element.style.display = "none"), e.options.visible || (s.options.visible = !1));
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
      m(o.stopColor) && n.setAttribute("offset", o.offset), m(o.stopColor) && n.setAttribute("stop-color", o.stopColor), m(o.stopOpacity) && n.setAttribute("stop-opacity", o.stopOpacity), t.appendChild(n);
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
    if (e.options.classes && t.setAttribute("class", e.options.classes), !(!m(e.options.style) || typeof e.options.style != "object"))
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
    if (e.svg) {
      const i = e.svg.querySelector("defs");
      i && (s.innerHTML = i.innerHTML);
    }
    return (t === !0 || e.options.groupChildShapes && t !== !1) && e.getChildren(!0).forEach((i) => {
      const o = i.svg.querySelector("defs");
      o && (s.innerHTML += o.innerHTML);
    }), s;
  }, this.addSvgPolygons = (e, t, s) => {
    const i = e.getPosition(s || e.options.groupChildShapes), o = [];
    if (e.svg) {
      let n = e.svg.querySelector("polygon");
      if (n) {
        n = n.cloneNode();
        const a = e.points.map(
          (l) => "" + (l.x - i.left) + "," + (l.y - i.top)
        ).join(" ");
        n.setAttribute("points", a), o.push({ polygon: n, zIndex: e.options.zIndex });
      }
    }
    if ((s === !0 || e.options.groupChildShapes && s !== !1) && e.getChildren(!0).forEach((n) => {
      let a = n.svg.querySelector("polygon");
      if (a) {
        a = a.cloneNode();
        const l = n.points.map(
          (p) => "" + (p.x - i.left) + "," + (p.y - i.top)
        ).join(" ");
        a.setAttribute("points", l), o.push({ polygon: a, zIndex: n.options.zIndex });
      }
    }), !!o.length) {
      o.sort((n, a) => n.zIndex - a.zIndex);
      for (let n of o)
        t.appendChild(n.polygon);
    }
  }, this.toPng = (e, t = V.DATAURL, s = null, i = null, o = null) => new Promise(async (n) => {
    e.calcPosition();
    const a = e.getPosition(o || e.options.groupChildShapes);
    [s, i] = Q(s, i, a.width, a.height);
    const l = this.getSvg(e, o);
    l.setAttribute("width", a.width), l.setAttribute("height", a.height);
    for (let b of l.querySelectorAll("image"))
      if (b.getAttribute("href") && b.getAttribute("href").length) {
        const B = await F(await (await fetch(b.getAttribute("href"))).blob());
        b.setAttribute("href", B);
      }
    const p = document.createElement("div");
    p.appendChild(l);
    const g = p.innerHTML, c = new Image(), S = new Blob([g], { type: "image/svg+xml" }), N = window.URL || window.webkitURL || window, I = await F(S);
    c.addEventListener("load", () => {
      const b = document.createElement("canvas");
      c.width = a.width, c.height = a.height, b.width = c.width, b.height = c.height;
      const B = b.getContext("2d");
      B.drawImage(c, 0, 0), B.scale(s, i), N.revokeObjectURL(I);
      const j = b.toDataURL("image/png");
      if (t === V.BLOB) {
        n(it(j));
        return;
      }
      n(j);
    }), c.src = I;
  });
}
const V = {
  DATAURL: "dataurl",
  BLOB: "blob"
}, _ = new wt(), Lt = (e, t, s) => {
  if (!t || !m(t.features) || !t.features.length)
    return null;
  const i = [];
  for (let o in t.features) {
    const n = t.features[o], a = Dt(n, o, s, e);
    (m(s.width) || m(s.height)) && a.scaleTo(s.width, s.height, !0), a && i.push(a);
  }
  return i;
}, Dt = (e, t, s, i) => {
  if (!Ut(e))
    return;
  let o = Nt(e, t, s);
  o.visible = !1;
  const n = zt(e);
  let a = null;
  for (let l in n) {
    const p = C({}, o);
    l == 0 ? a = E.createShape(i, p, n[l]) : (p.id += "_" + l, p.name += " " + l, a.addChild(E.createShape(i, p, n[l])));
  }
  return a;
}, Ut = (e) => {
  if (!m(e.properties) || typeof e.properties != "object")
    return !1;
  const t = e.geometry;
  return !(!m(t) || typeof t != "object" || ["Polygon", "MultiPolygon"].indexOf(t.type) === -1 || !m(t.coordinates) || typeof t.coordinates != "object" || !t.coordinates.length);
}, Nt = (e, t, s) => {
  const i = {};
  if (i.name = e.properties[s.nameField] || "Shape " + t, i.id = e.properties[s.idField] || "shape_" + t, m(s.options) && typeof s.options == "object")
    for (let o in s.options)
      i[o] = s.options[o];
  return i;
}, zt = (e) => {
  let t = e.geometry.coordinates;
  e.geometry.type === "Polygon" && (t = [t]);
  let s = 999999, i = 999999, o = 0;
  for (let a of t) {
    const l = a[0];
    for (let p of l)
      o = z(p[0]) > o ? z(p[0]) : o, o = z(p[1]) > o ? z(p[0]) : o, s = p[0] < s ? p[0] : s, i = p[1] < i ? p[1] : i;
  }
  const n = [];
  for (let a of t) {
    const l = a[0];
    for (let p of l)
      p[0] -= s, p[0] *= Math.pow(10, o), p[1] -= i, p[1] *= Math.pow(10, o);
    n.push(l);
  }
  return n;
}, z = (e) => {
  let t = e.toString().split(".");
  return t[1] ? t[1].length : 0;
};
function Vt() {
  this.shapes = [], this.activeShape = null, this.draggedShape = null, this.shapeOnCursor = null, this.containerEventListeners = [], this.init = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    h.subscribe(r.SHAPE_CREATE, this.onShapeCreated), h.subscribe(r.SHAPE_DESTROY, this.onShapeDestroy), h.subscribe(r.SHAPE_MOVE_START, this.onShapeMoveStart), h.subscribe(r.SHAPE_MOUSE_ENTER, this.onShapeMouseEnter), h.subscribe(A.POINT_DRAG_START, this.onPointDragStart), h.subscribe(A.POINT_DRAG_END, this.onPointDragEnd), window.addEventListener("resize", this.onWindowResize);
  }, this.onWindowResize = (e) => {
    this.shapes.forEach((t) => {
      h.emit(
        k.CONTAINER_BOUNDS_CHANGED,
        t,
        { bounds: t.getBounds(), points: t.points }
      );
    });
  }, this.createShape = (e, t, s) => new M().init(e, t, s), this.onShapeCreated = (e) => {
    const t = e.target;
    m(t.root) && !this.getShape(t) && (this.shapes.push(t), this.activeShape || (this.activeShape = t), this.getShapesByContainer(t.root).length === 1 && this.addContainerEvents(t));
  }, this.onShapeDestroy = (e) => {
    const t = e.target, s = t.root;
    !m(t.root) || !this.getShape(t) || (this.shapes.splice(this.shapes.indexOf(t), 1), this.getShapesByContainer(s).length === 0 && this.containerEventListeners.filter((i) => i.container === s).forEach((i) => {
      i.container.removeEventListener(i.name, i.listener), this.containerEventListeners.splice(this.containerEventListeners.indexOf(i), 1);
    }));
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
      s && s.options.groupChildShapes && (this.draggedShape = s), this.draggedShape.draggedPoint = e.target, h.emit(r.POINT_DRAG_START, t, { point: e.target });
    }
  }, this.onPointDragEnd = (e) => {
    this.draggedShape && (this.draggedShape.draggedPoint = null), this.draggedShape = null;
  }, this.findShapeByPoint = (e) => {
    for (let t of this.shapes)
      if (t.isShapePoint(e))
        return t;
    return null;
  }, this.getShape = (e) => this.getShapeByGuid(e.guid), this.getShapeByGuid = (e) => this.shapes.find((t) => t.guid === e), this.getShapesByContainer = (e) => this.getShapes().filter((t) => t.root === e), this.getMaxZIndex = (e = null) => {
    let t = this.getShapes();
    return e && (t = this.getShapesByContainer(e)), t.length ? t.map((s) => s.options.zIndex || 0).reduce((s, i) => i > s ? i : s) : 0;
  }, this.getShapes = () => this.shapes.filter((e) => e.options.id.search("_resizebox") === -1 && e.options.id.search("_rotatebox") === -1), this.activateShape = (e, t = null) => {
    if (this.activeShape === e) {
      this.activeShape.switchDisplayMode(t);
      return;
    }
    if (!(typeof e.id < "u" && (e.id.search("_resizebox") !== -1 || e.id.search("_rotatebox") !== -1))) {
      if (this.activeShape && this.deactivateShape(this.activeShape), e.options.moveToTop) {
        const i = this.getMaxZIndex(e.root) + 1 - e.options.zIndex;
        e.options.prevZIndex = e.options.zIndex, e.options.zIndex += i, _.updateOptions(e), e.options.groupChildShapes && e.getChildren(!0).forEach((o) => {
          o.options.prevZIndex = o.options.zIndex, o.options.zIndex += i, _.updateOptions(o);
        });
      }
      this.activeShape = e, h.emit(r.SHAPE_ACTIVATED, this.activeShape), this.activeShape.switchDisplayMode(t);
    }
  }, this.deactivateShape = (e) => {
    typeof e.options.prevZIndex < "u" && _.updateOptions(e), e.options.displayMode !== u.DEFAULT && e.switchDisplayMode(u.DEFAULT), e.getChildren(!0).forEach((t) => {
      typeof t.options.prevZIndex < "u" && (_.updateOptions(t), t.options.displayMode !== u.DEFAULT && t.switchDisplayMode(u.DEFAULT));
    });
  }, this.addContainerEvents = (e) => {
    this.addContainerEvent(e.root, "mousemove", this.mousemove), this.addContainerEvent(e.root, "mouseup", this.mouseup, e.options.id), this.addContainerEvent(e.root, "dblclick", this.doubleclick), h.emit(kt.MANAGER_ADD_CONTAINER_EVENT_LISTENERS, e.root);
  }, this.addContainerEvent = (e, t, s) => {
    this.containerEventListeners.find((i) => i.container === e && i.name === t) || (e.addEventListener(t, s), this.containerEventListeners.push({ id: e.id, container: e, name: t, listener: s }));
  }, this.doubleclick = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.doubleclick(d(e, { target: this.shapeOnCursor }));
    try {
      e.stopPropagation();
    } catch {
    }
    if (!!this.activeShape && !(!this.activeShape.options.canAddPoints || this.activeShape.draggedPoint || this.activeShape.points.length > 2) && (this.activeShape.options.maxPoints === -1 || this.activeShape.points.length < this.activeShape.options.maxPoints)) {
      this.activeShape.options.displayMode === u.DEFAULT && this.activeShape.switchDisplayMode(u.SELECTED);
      const [t, s] = Z(d(e, { target: this.activeShape }));
      this.activeShape.addPoint(t, s, { forceDisplay: !1 });
    }
  }, this.mousedown = (e) => {
    if (this.shapeOnCursor && e.buttons !== 2) {
      const t = this.shapeOnCursor.getRootParent(!0);
      t && t.options.groupChildShapes && (this.shapeOnCursor = t), this.draggedShape = this.shapeOnCursor, this.shapeOnCursor.eventListener.mousedown(d(e, { target: this.shapeOnCursor }));
    }
  }, this.mouseup = (e) => {
    if (!this.draggedShape)
      return;
    const t = this.draggedShape;
    e.buttons === 1 && t.options.canAddPoints && !t.draggedPoint && (t.options.maxPoints === -1 || t.points.length < t.options.maxPoints) && t.addPoint(
      e.clientX - t.root.offsetLeft,
      e.clientY - t.root.offsetTop
    ), t.draggedPoint ? (h.emit(r.POINT_DRAG_END, this.draggedShape, { point: t.draggedPoint }), t.draggedPoint.mouseup(e), t.draggedPoint = null) : h.emit(r.SHAPE_MOUSE_UP, t, {}), this.draggedShape = null, h.emit(r.SHAPE_MOVE_END, t, { pos: t.getPosition(!0) });
  }, this.mousemove = (e) => {
    if (e.buttons !== 1 && this.draggedShape && (this.draggedShape = null), this.draggedShape) {
      if (e.buttons !== 1) {
        this.draggedShape.draggedPoint = null, this.draggedShape = null;
        return;
      }
      this.draggedShape.eventListener.mousemove(e);
    } else
      this.processShapesUnderCursor(e);
  }, this.mouseover = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseover(d(e, { target: this.shapeOnCursor }));
  }, this.mouseenter = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseenter(d(e, { target: this.shapeOnCursor }));
  }, this.mouseout = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseout(d(e, { target: e.target }));
  }, this.click = (e) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.click(d(e, { target: this.shapeOnCursor }));
  }, this.processShapesUnderCursor = (e) => {
    const [t, s] = [e.clientX, e.clientY], i = this.getShapeOnCursor(t, s);
    this.shapeOnCursor && this.shapeOnCursor !== i && this.shapeOnCursor.svg && (this.shapeOnCursor.svg.style.cursor = "default", this.shapeOnCursor.eventListener.mouseout(d(e, { target: this.shapeOnCursor }))), i && i !== this.shapeOnCursor && i.eventListener.mouseover(d(e, { target: i })), this.shapeOnCursor = i, this.shapeOnCursor && (h.emit(r.SHAPE_MOUSE_MOVE, this.shapeOnCursor, d(e)), this.shapeOnCursor.svg.style.cursor = "crosshair");
  }, this.getShapeOnCursor = (e, t) => {
    const s = this.shapes.filter((i) => i.belongsToShape(e, t) && i.options.visible && !i.options.hidden && i.options.id.search("_resizebox") === -1 && i.options.id.search("_rotatebox") === -1);
    return s.length ? s.reduce((i, o) => o.options.zIndex >= i.options.zIndex ? o : i) : null;
  }, this.toJSON = (e = null, t = !1) => (e || (e = this.shapes), e = e.filter((s) => s.options.id.search("_resizebox") === -1 && s.options.id.search("_rotatabox") === -1 && !s.getParent()), JSON.stringify(e.map((s) => s.getJSON(!0, t)))), this.fromJSON = (e, t, s = null) => {
    let i = t;
    if (typeof i == "string" && (i = H(t)), !i)
      return null;
    const o = [];
    for (let n in i) {
      const a = i[n];
      a.options.id && this.findShapeById(a.options.id) || (o.push(new M().fromJSON(e, a)), s && typeof s == "function" && s(n / i.length));
    }
    return o;
  }, this.findShapesByOptionValue = (e, t) => this.shapes.filter((s) => s.options[e] === t), this.findShapeById = (e) => {
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
    }), this.containerEventListeners = []; this.shapes.length; )
      this.shapes[0].destroy();
  }, this.fromGeoJson = (e, t, s) => Lt(e, t, s);
}
const kt = {
  MANAGER_ADD_CONTAINER_EVENT_LISTENERS: "manager_add_container_event_listeners",
  MANAGER_REMOVE_CONTAINER_EVENT_LISTENERS: "manager_remove_container_event_listeners"
}, k = {
  CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
}, E = new Vt().init();
function Ht(e) {
  this.shape = e, this.children = [], this.parent = {}, this.init = () => {
    for (let t in this)
      typeof this[t] != "function" || t === "init" || (typeof this.shape[t] == "function" && (this.parent[t] = this.shape[t]), this.shape[t] = this[t]);
    return this;
  }, this.addChild = (t) => {
    !this.shouldAddChild(t) || (this.shape.options.displayMode !== t.options.displayMode && (t.svg ? t.switchDisplayMode(this.shape.options.displayMode) : t.options.displayMode = e.options.displayMode), this.children.push(t), h.emit(r.SHAPE_ADD_CHILD, this.shape, { child: t }));
  }, this.removeChild = (t) => {
    this.children.splice(this.children.indexOf(t), 1), h.emit(r.SHAPE_REMOVE_CHILD, this.shape, { child: t });
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
    const t = E.shapes;
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
function K() {
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
  }, this.eventListener = null, this.left_top = null, this.left_bottom = null, this.right_top = null, this.right_bottom = null, this.init = (e, t, s, i, o, n = {}) => (this.left = parseInt(t), this.top = parseInt(s), this.width = parseInt(i), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new M().init(e, Object.assign({}, this.options.shapeOptions), []), h.emit(r.SHAPE_CREATE, this.shape, {}), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new It(this).run(), this.redraw(), h.emit(r.SHAPE_CREATE, this, {}), this), this.setOptions = (e = {}) => {
    !e || typeof e != "object" || (e.shapeOptions && typeof e.shapeOptions == "object" ? (e.shapeOptions.pointOptions && typeof e.shapeOptions.pointOptions == "object" ? e.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions, e.shapeOptions.pointOptions) : e.shapeOptions.pointOptions = Object.assign({}, this.options.shapeOptions.pointOptions), e.shapeOptions = Object.assign(this.options.shapeOptions, e.shapeOptions)) : e.shapeOptions = Object.assign({}, this.options.shapeOptions), e.shapeOptions.zIndex = e.zIndex || this.options.zIndex, e.shapeOptions.id = e.id ? e.id : this.options.id, Object.assign(this.options, e), this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + lt + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + dt + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + ut + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + At + "')" } });
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
    h.emit(r.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (e, t) => this.eventListener.addEventListener(e, t), this.removeEventListener = (e, t) => {
    this.eventListener.removeEventListener(e, t);
  };
}
function Gt(e) {
  this.shape = e, this.contextMenu = null, this.updateContextMenu = () => {
    if (this.shape.options.hasContextMenu && !this.contextMenu ? this.init() : this.shape.options.hasContextMenu || (this.contextMenu = null), this.shape.contextMenu = this.contextMenu, this.contextMenu) {
      const t = this.getMenuItems();
      for (let s of t)
        this.contextMenu.items.find((i) => i.id === s.id) || this.contextMenu.addItem(s.id, s.title, s.image);
    }
  }, this.init = () => {
    e.svg && (this.contextMenu = G.create([], e.svg), e.options.canAddPoints && this.contextMenu.addItem("i" + e.guid + "_add_point", "Add Point", Y), this.displayGroupItems(), this.setEventListeners());
  }, this.getMenuItems = () => {
    const t = [
      { id: "i" + e.guid + "_clone", title: "Clone", image: Bt },
      { id: "i" + e.guid + "_export_json", title: "Export to JSON", image: Ot },
      { id: "i" + e.guid + "_export_svg", title: "Export to SVG", image: yt },
      { id: "i" + e.guid + "_export_png", title: "Export to PNG", image: vt },
      { id: "i" + e.guid + "_destroy", title: "Destroy", image: X }
    ];
    return e.options.canAddPoints && t.push({ id: "i" + e.guid + "_add_point", title: "Add Point", image: Y }), t;
  }, this.setEventListeners = () => {
    this.setOnItemClickListener(), this.contextMenu.on("show", () => {
      this.displayGroupItems();
    });
  }, this.setOnItemClickListener = () => {
    let t, s;
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
          s = this.shape.getRootParent(), t = s || this.shape, t.setOptions({ groupChildShapes: !0 }), t.switchDisplayMode(u.DEFAULT);
          break;
        case "i" + this.shape.guid + "_ungroup":
          s = this.shape.getRootParent(), t = s || this.shape, t.setOptions({ groupChildShapes: !1 }), t.switchDisplayMode(u.DEFAULT);
          break;
      }
    });
  }, this.displayGroupItems = () => {
    let t = this.shape.getRootParent() ? this.shape.getRootParent() : this.shape;
    if (!t.getChildren().length) {
      this.contextMenu.removeItem("i" + this.shape.guid + "_group"), this.contextMenu.removeItem("i" + this.shape.guid + "_ungroup");
      return;
    }
    t.options.groupChildShapes ? this.contextMenu.items.find((s) => s.id === "i" + this.shape.guid + "_ungroup") || (this.contextMenu.addItem("i" + this.shape.guid + "_ungroup", "Ungroup", _t), this.contextMenu.removeItem("i" + this.shape.guid + "_group")) : this.contextMenu.items.find((s) => s.id === "i" + this.shape.guid + "_group") || (this.contextMenu.removeItem("i" + this.shape.guid + "_ungroup"), this.contextMenu.addItem("i" + this.shape.guid + "_group", "Group", Ct));
  }, this.onAddPointClick = (t) => {
    if (this.shape.options.maxPoints !== -1 && this.shape.points.length >= this.shape.options.maxPoints)
      return;
    const [s, i] = J(this.shape.root, t.cursorX, t.cursorY);
    this.shape.addPoint(s, i), this.shape.options.displayMode === u.DEFAULT && this.shape.switchDisplayMode(u.SELECTED);
  }, this.onCloneClick = (t) => {
    const s = this.shape.clone(), i = s.getPosition(!0);
    s.moveTo(i.left + 5, i.top + 5), SmartShapeManager.activateShape(s);
  }, this.onExportJsonClick = (t) => {
    const i = this.shape.getRootParent() || this.shape, o = i.toJSON(i.options.groupChildShapes), n = new Blob([o]);
    this.saveToFile(n, this.getExportFileName("json"));
  }, this.onExportSvgClick = (t) => {
    const o = ((this.shape.options.groupChildShapes ? null : this.shape.getRootParent()) || this.shape).toSvg(), n = new Blob([o]);
    this.saveToFile(n, this.getExportFileName("svg"));
  }, this.onExportPngClick = async (t) => {
    const o = await ((this.shape.options.groupChildShapes ? null : this.shape.getRootParent()) || this.shape).toPng(V.BLOB);
    this.saveToFile(o, this.getExportFileName("png"));
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
function M() {
  this.root = null, this.points = [], this.svg = null, this.groupHelper = null, this.eventListener = new Tt(this), this.options = {
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
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = U(), this.resizeBox = null, this.rotateBox = null, this.initCenter = null, this.init = (e, t = null, s = null, i = !0) => {
    if (!e) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    if (E.getShape(this)) {
      console.error("This shape already initialized");
      return;
    }
    return this.root = e, this.root.style.position = "relative", Object.assign(this, new Gt(this)), this.setOptions(t), this.groupHelper = new Ht(this).init(), s && s.length && (this.setupPoints(s, Object.assign({}, this.options.pointOptions)), this.redraw()), this.eventListener.run(), typeof this.updateContextMenu == "function" && this.updateContextMenu(), i && this.applyDisplayMode(), (s && s.length || this.options.forceCreateEvent) && h.emit(r.SHAPE_CREATE, this, {}), this;
  }, this.setOptions = (e) => {
    !e || typeof e != "object" || (e.pointOptions = C(this.options.pointOptions, e.pointOptions), e.style = C(this.options.style, e.style), e.bounds = C(this.options.bounds, e.bounds), m(e.visible) && e.visible !== this.options.visible && (this.points.forEach((t) => t.options.visible = e.visible), this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: e.visible } }), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: e.visible } })), this.options = C(this.options, e), this.points.forEach((t) => {
      t.setOptions(C({}, this.options.pointOptions)), t.options.bounds = this.getBounds(), t.options.zIndex <= this.options.zIndex && (t.options.zIndex = this.options.zIndex + 1), t.redraw();
    }), typeof this.updateContextMenu == "function" && this.updateContextMenu());
  }, this.setupPoints = (e, t) => {
    this.points = [], this.addPoints(e, Object.assign({}, t));
  }, this.addPoint = (e, t, s = null) => {
    const i = this.putPoint(e, t, Object.assign({}, s));
    return i.init(e, t, s), this.root.appendChild(i.element), this.redraw(), this.options.hasContextMenu && !this.contextMenu && this.updateContextMenu(), i;
  }, this.addPoints = (e, t = null) => {
    !e || typeof e != "object" || (e.forEach((s) => {
      const i = this.putPoint(
        s[0] + this.options.offsetX,
        s[1] + this.options.offsetY,
        Object.assign({}, t)
      );
      i && (i.init(x, y, t), this.root.appendChild(s.element), i.redraw());
    }), this.options.hasContextMenu && !this.contextMenu && this.updateContextMenu());
  }, this.putPoint = (e, t, s = null) => {
    if (this.findPoint(e, t))
      return null;
    !s || !Object.keys(s).length ? s = Object.assign({}, this.options.pointOptions) || {} : s = C(Object.assign({}, this.options.pointOptions), s), s.bounds = this.getBounds(), s.zIndex = this.options.zIndex + 1;
    const i = new Pt();
    return i.x = e, i.y = t, this.points.push(i), i;
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
    const i = this.getBounds(), o = this.getPosition(!0);
    let n = e + o.width > i.right ? i.right - o.width : e, a = t + o.height > i.bottom ? i.bottom - o.height : t;
    this.moveBy(n - o.left, a - o.top, s), this.calcPosition();
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
    [e, t] = this.applyScaleRestriction(...Q(e, t, o.width, o.height)), o.width >= 10 && e < 10 && (e = 10), o.height >= 10 && t < 10 && (t = 10);
    let n = o.left + e > i.right && i.right !== -1 ? i.right - o.left : e, a = o.top + t > i.bottom && i.bottom !== -1 ? i.bottom - o.top : t, l = n / o.width, p = a / o.height;
    this.scaleBy(l, p, s);
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
    const o = this.getPosition(!0);
    let [n, a] = this.getCenter(this.options.groupChildShapes);
    const l = this.getRootParent(!0);
    l && l.options.groupChildShapes && ([n, a] = l.getCenter(l.options.groupChildShapes)), t || (t = n), s || (s = a), this.initCenter && ([t, s] = this.initCenter), !(i && (!this.isInBounds(...T(e, o.left, o.top, t, s)) || !this.isInBounds(...T(e, o.right, o.top, t, s)) || !this.isInBounds(...T(e, o.left, o.bottom, t, s)) || !this.isInBounds(...T(e, o.right, o.bottom, t, s)))) && (this.points.forEach((p) => p.rotateBy(e, t, s)), this.options.groupChildShapes && this.getChildren(!0).forEach((p) => {
      p.points.forEach((g) => g.rotateBy(e, t, s)), p.redraw();
    }));
  }, this.isInBounds = (e, t) => {
    const [s, i] = this.getMaxPointSize(), o = this.getBounds();
    return e >= o.left + s / 2 && e <= o.right - s / 2 && t >= o.top + i / 2 && t <= o.bottom - i / 2;
  }, this.redraw = () => {
    this.applyDisplayMode(), _.draw(this);
  }, this.applyDisplayMode = () => {
    this.options.displayMode === u.SCALE && this.options.canScale ? (this.rotateBox && this.rotateBox.hide(), !this.resizeBox && this.setupResizeBox(), this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : this.options.displayMode === u.ROTATE && this.options.canRotate ? (this.resizeBox && this.resizeBox.hide(), !this.rotateBox && this.setupRotateBox(), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : (this.resizeBox && this.resizeBox.hide(), this.rotateBox && this.rotateBox.hide()), this.points.forEach((e) => {
      e.setOptions({ zIndex: this.options.zIndex + 1 }), e.element.style.zIndex = e.options.zIndex, this.options.displayMode === u.DEFAULT && !e.options.forceDisplay && (e.element.style.display = "none");
    }), this.options.displayMode !== u.DEFAULT && this.options.groupChildShapes && this.getChildren(!0).forEach((e) => {
      e.points.forEach((t) => {
        t.options.visible && !t.options.hidden && t.options.canDrag && (t.element.style.display = "");
      });
    });
  }, this.switchDisplayMode = (e = null) => {
    e || (e = this.getNextDisplayMode()), (e === u.SCALE && !this.options.canScale || e === u.ROTATE && !this.options.canRotate || e === u.SELECTED && this.points.length && !this.points.filter((t) => t.options.canDrag).length) && (e = u.DEFAULT), this.options.displayMode = e, this.redraw(), e === u.DEFAULT && this.getChildren(!0).forEach((t) => t.switchDisplayMode(e));
  }, this.getNextDisplayMode = () => {
    let e;
    return this.options.displayMode === u.DEFAULT ? e = u.SELECTED : this.options.displayMode === u.SELECTED ? e = u.SCALE : this.options.displayMode === u.SCALE ? e = u.ROTATE : e = u.DEFAULT, e === u.SELECTED && !this.points.filter((t) => t.options.canDrag).length && (e = u.SCALE), e === u.SCALE && !this.options.canScale && (e = u.ROTATE), e === u.ROTATE && !this.options.canRotate && (e = u.DEFAULT), e;
  }, this.calcPosition = () => {
    !this.points.length || (this.left = this.points.map((e) => e.x).reduce((e, t) => t < e ? t : e), this.top = this.points.map((e) => e.y).reduce((e, t) => t < e ? t : e), this.right = this.points.map((e) => e.x).reduce((e, t) => t > e ? t : e), this.bottom = this.points.map((e) => e.y).reduce((e, t) => t > e ? t : e), this.width = parseInt(this.right - this.left) || 1, this.height = parseInt(this.bottom - this.top) || 1);
  }, this.getPosition = () => ({ top: this.top, left: this.left, bottom: this.bottom, right: this.right, width: parseInt(this.width), height: parseInt(this.height) }), this.getBounds = () => ({
    left: this.options.bounds.left !== -1 ? this.options.bounds.left : this.root.style.display === "none" ? -1 : this.root.clientLeft,
    top: this.options.bounds.top !== -1 ? this.options.bounds.top : this.root.style.display === "none" ? -1 : this.root.clientTop,
    right: this.options.bounds.right !== -1 ? this.options.bounds.right : this.root.style.display === "none" ? -1 : this.root.clientLeft + this.root.clientWidth,
    bottom: this.options.bounds.bottom !== -1 ? this.options.bounds.bottom : this.root.style.display === "none" ? -1 : this.root.clientTop + this.root.clientHeight
  }), this.isShapePoint = (e) => !!this.points.find((t) => t === e), this.belongsToShape = (e, t, s = !0) => {
    if (this.findPoint(e, t))
      return !0;
    let i = this.getPointsArray();
    return s && (i = i.map((o) => [o[0] + D(this.root).left, o[1] + D(this.root).top])), st(i, [e, t]);
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
    for (; this.points.length > 0; )
      this.points[0].destroy();
    if (h.emit(r.SHAPE_DESTROY, this, {}), this.eventListener && this.eventListener.destroy(), this.resizeBox && this.resizeBox.destroy(), this.rotateBox && this.rotateBox.destroy(), this.root && this.svg)
      try {
        this.root.removeChild(this.svg);
      } catch {
      }
    this.options.groupChildShapes && this.getChildren(!0).forEach((t) => {
      t.destroy();
    }), this.contextMenu && this.destroyContextMenu();
    const e = this.getParent();
    e && e.removeChild(this);
  }, this.setupResizeBox = () => {
    if (!this.points.length)
      return null;
    const e = this.getResizeBoxBounds();
    return this.resizeBox = new q().init(this.root, e.left, e.top, e.width, e.height, {
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
    return this.rotateBox = new K().init(this.root, e.left, e.top, e.width, e.height, {
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
  }, this.toSvg = (e = null) => _.toSvg(this, e), this.toPng = (e = V.DATAURL, t = null, s = null, i = null) => _.toPng(this, e, t, s, i), this.toJSON = (e = !0, t = !1) => JSON.stringify(this.getJSON(e, t)), this.clone = (e = {}) => {
    const t = Object.assign({}, this.getJSON());
    t.options.id += "_clone", t.options.name += " Clone", t.parent_guid = this.guid, t.options = Object.assign(t.options, e);
    const s = new M().fromJSON(this.root, JSON.stringify(t));
    return s ? (s.getChildren(!0).forEach((i) => {
      i.options.id += "_clone", i.options.name += " Clone";
    }), s) : null;
  }, this.getJSON = (e = !0, t = !1) => {
    const s = {
      options: Object.assign({}, this.options)
    };
    if (s.options.displayMode = u.DEFAULT, t || this.options.compactExport ? s.points = this.points.map((i) => [i.x, i.y]) : s.points = this.points.map((i) => i.getJSON()), e) {
      let i = this.getChildren();
      i.length && (s.children = i.map(
        (o) => o.getJSON(e, t || this.options.compactExport)
      ));
    }
    return s;
  }, this.fromJSON = (e, t, s = !0) => {
    let i = t;
    if (typeof i == "string" && (i = H(t)), !i)
      return null;
    this.root = e, this.setOptions(i.options), this.svg || this.init(e, this.options, null, !1), i.points.forEach((n) => {
      n.length ? this.putPoint(n[0], n[1]) : this.putPoint(n.x, n.y, n.options);
    }), s && typeof i.children < "u" && i.children && (this.getChildren(!0).forEach((n) => n.destroy()), i.children.forEach((n) => {
      this.addChild(new M().fromJSON(e, n));
    }));
    const o = E.getShapeByGuid(i.parent_guid);
    return h.emit(r.SHAPE_CREATE, this, { parent: o }), this;
  };
}
const u = {
  DEFAULT: "default",
  SELECTED: "selected",
  SCALE: "scale",
  ROTATE: "rotate"
};
function q() {
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
  }, this.eventListener = null, this.left_top = null, this.left_center = null, this.left_bottom = null, this.center_top = null, this.center_bottom = null, this.right_top = null, this.right_center = null, this.right_bottom = null, this.init = (e, t, s, i, o, n = {}) => (this.left = parseInt(t), this.top = parseInt(s), this.width = parseInt(i), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new M().init(e, Object.assign({}, this.options.shapeOptions), []), h.emit(r.SHAPE_CREATE, this.shape, {}), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new Rt(this).run(), this.redraw(), h.emit(r.SHAPE_CREATE, this, {}), this), this.setOptions = (e = {}) => {
    !e || typeof e != "object" || (e.shapeOptions && typeof e.shapeOptions == "object" ? (e.shapeOptions.pointOptions && typeof e.shapeOptions.pointOptions == "object" ? e.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions, e.shapeOptions.pointOptions) : e.shapeOptions.pointOptions = Object.assign({}, this.options.shapeOptions.pointOptions), e.shapeOptions = Object.assign(this.options.shapeOptions, e.shapeOptions)) : e.shapeOptions = Object.assign({}, this.options.shapeOptions), e.shapeOptions.zIndex = e.zIndex || this.options.zIndex, e.shapeOptions.id = e.id ? e.id : this.options.id, Object.assign(this.options, e), this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + mt + "')" } }), this.center_top = this.shape.addPoint(this.left + this.width / 2, this.top, { id: this.shape.guid + "_center_top", style: { backgroundImage: "url('" + ct + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + St + "')" } }), this.right_center = this.shape.addPoint(this.right, this.top + this.height / 2, { id: this.shape.guid + "_right_center", style: { backgroundImage: "url('" + xt + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + bt + "')" } }), this.center_bottom = this.shape.addPoint(this.left + this.width / 2, this.bottom, { id: this.shape.guid + "_center_bottom", style: { backgroundImage: "url('" + gt + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + ft + "')" } }), this.left_center = this.shape.addPoint(this.left, this.top + this.height / 2, { id: this.shape.guid + "_left_center", style: { backgroundImage: "url('" + Et + "')" } }), this.setPointsOptions();
  }, this.setPointsOptions = () => {
    this.setPointsMoveDirections(), this.setPointsMoveBounds();
  }, this.setPointsMoveDirections = () => {
    this.center_top.setOptions({ moveDirections: [f.TOP, f.BOTTOM] }), this.center_bottom.setOptions({ moveDirections: [f.TOP, f.BOTTOM] }), this.left_center.setOptions({ moveDirections: [f.LEFT, f.RIGHT] }), this.right_center.setOptions({ moveDirections: [f.LEFT, f.RIGHT] });
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
    h.emit(r.SHAPE_DESTROY, this, {}), this.eventListener.destroy(), this.shape.destroy();
  }, this.addEventListener = (e, t) => this.eventListener.addEventListener(e, t), this.removeEventListener = (e, t) => {
    this.eventListener.removeEventListener(e, t);
  };
}
try {
  window.ResizeBox = q, window.SmartShape = M, window.RotateBox = K, window.SmartShapeManager = E;
} catch {
}
export {
  h as EventsManager,
  q as ResizeBox,
  K as RotateBox,
  r as ShapeEvents,
  M as SmartShape,
  u as SmartShapeDisplayMode,
  E as SmartShapeManager
};
