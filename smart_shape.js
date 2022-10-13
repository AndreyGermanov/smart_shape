function J() {
  this.subscriptions = {}, this.subscribe = (t, s) => {
    if (typeof t == "string")
      return this.subscribeToEvent(t, s);
    if (typeof t == "object") {
      for (let e of t)
        this.subscribeToEvent(e, s);
      return s;
    }
    return null;
  }, this.subscribeToEvent = (t, s) => ((typeof this.subscriptions[t] > "u" || !this.subscriptions[t]) && (this.subscriptions[t] = []), typeof this.subscriptions[t].find((e) => e === s) < "u" ? null : (this.subscriptions[t].push(s), s)), this.emit = (t, s, e = null) => {
    if ((!e || typeof e != "object") && (e = {}), e.type = t, e.target = s, typeof this.subscriptions[t] < "u" && this.subscriptions[t] && this.subscriptions[t].length) {
      for (let i of this.subscriptions[t])
        i(e);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (t, s) => {
    let e = !1;
    if (typeof t == "string")
      this.unsubscribeFromEvent(t, s) && (e = !0);
    else if (typeof t == "object")
      for (let i of t)
        this.unsubscribeFromEvent(i, s) && (e = !0);
    return e;
  }, this.unsubscribeFromEvent = (t, s) => {
    if (typeof this.subscriptions[t] > "u" || !this.subscriptions[t])
      return !1;
    const e = this.subscriptions[t].indexOf(s);
    return e !== -1 ? (this.subscriptions[t].splice(e, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const h = new J(), X = (t) => t * (Math.PI / 180), K = (t) => t * (180 / Math.PI), I = (t, s, e, i, o) => {
  const n = X(t), a = (s - i) * Math.cos(n) - (e - o) * Math.sin(n) + i, p = (s - i) * Math.sin(n) + (e - o) * Math.cos(n) + o;
  return [a, p];
}, P = (t, s, e, i) => Math.sqrt(Math.pow(e - t, 2) + Math.pow(i - s, 2)), q = (t, s) => {
  const e = (d, A, c) => A.x <= Math.max(d.x, c.x) && A.x >= Math.min(d.x, c.x) && A.y <= Math.max(d.y, c.y) && A.y >= Math.min(d.y, c.y), i = (d, A, c) => {
    let x = (A[1] - d[1]) * (c[0] - A[0]) - (A[0] - d[0]) * (c[1] - A[1]);
    return x === 0 ? 0 : x > 0 ? 1 : 2;
  }, o = (d, A, c, x) => {
    let D = i(d, A, c), _ = i(d, A, x), m = i(c, x, d), M = i(c, x, A);
    return D !== _ && m !== M || D === 0 && e(d, c, A) || _ === 0 && e(d, x, A) || m === 0 && e(c, d, x) ? !0 : !!(M === 0 && e(c, A, x));
  };
  if (t.length < 3)
    return !1;
  let n = [1e4, s[1]], a = 0, p = 0;
  do {
    let d = (p + 1) % t.length;
    if (o(t[p], t[d], s, n)) {
      if (i(t[p], s, t[d]) === 0)
        return e(
          t[p],
          s,
          t[d]
        );
      a++;
    }
    p = d;
  } while (p !== 0);
  return a % 2 === 1;
}, G = (t, s, e, i) => !t && !s || !e || !i ? [e, i] : t && s ? [t, s] : (t || (t = s * (e / i)), s || (s = t * (i / e)), [t, s]), w = (t, s = !0) => {
  let e = 0, i = 0;
  if (!s)
    return { top: t.offsetTop - t.scrollTop, left: t.offsetLeft - t.scrollLeft };
  for (; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop); )
    e += t.offsetLeft - t.scrollLeft, i += t.offsetTop - t.scrollTop, t = t.offsetParent;
  return { top: i, left: e };
}, L = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
  const s = Math.random() * 16 | 0;
  return (t === "x" ? s : s & 3 | 8).toString(16);
}).replace(/-/g, ""), j = (t) => {
  try {
    t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1;
  } catch {
  }
  return !1;
}, b = (t) => typeof t < "u" && t !== null, B = (t, s) => t && typeof t == "object" && s && typeof s == "object" ? Object.assign(t, s) : t, $ = (t) => {
  const s = atob(t.split(",")[1]), e = t.split(",")[0].split(":")[1].split(";")[0], i = new ArrayBuffer(s.length), o = new Uint8Array(i);
  for (let n = 0; n < s.length; n++)
    o[n] = s.charCodeAt(n);
  return new Blob([i], { type: e });
}, H = (t) => new Promise((s) => {
  const e = new FileReader();
  e.onload = function(i) {
    s(i.target.result);
  }, e.readAsDataURL(t);
}), z = (t) => {
  try {
    return JSON.parse(t);
  } catch {
    return null;
  }
}, tt = (t) => {
  let s = t, e = s.indexOf("-");
  for (; e !== -1; )
    s = s.replace("-" + s[e + 1], s[e + 1].toString().toUpperCase()), e = s.indexOf("-");
  return s;
}, l = (t, s = {}) => {
  const e = {};
  for (let i in t)
    i !== "type" && i !== "target" && (e[i] = t[i]);
  return Object.keys(s).forEach((i) => {
    e[i] = s[i];
  }), e;
}, F = (t, s = null) => (s || (s = t.target.root || t.target), W(s, t.pageX, t.pageY)), W = (t, s, e) => {
  const i = w(t, !0);
  return [s - i.left, e - i.top];
};
function st() {
  this.subscriptions = {}, this.subscribe = (t, s) => {
    if (typeof t == "string")
      return this.subscribeToEvent(t, s);
    if (typeof t == "object") {
      for (let e of t)
        this.subscribeToEvent(e, s);
      return s;
    }
    return null;
  }, this.subscribeToEvent = (t, s) => ((typeof this.subscriptions[t] > "u" || !this.subscriptions[t]) && (this.subscriptions[t] = []), typeof this.subscriptions[t].find((e) => e === s) < "u" ? null : (this.subscriptions[t].push(s), s)), this.emit = (t, s, e = null) => {
    if ((!e || typeof e != "object") && (e = {}), e.type = t, e.target = s, typeof this.subscriptions[t] < "u" && this.subscriptions[t] && this.subscriptions[t].length) {
      for (let i of this.subscriptions[t])
        i(e);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (t, s) => {
    let e = !1;
    if (typeof t == "string")
      this.unsubscribeFromEvent(t, s) && (e = !0);
    else if (typeof t == "object")
      for (let i of t)
        this.unsubscribeFromEvent(i, s) && (e = !0);
    return e;
  }, this.unsubscribeFromEvent = (t, s) => {
    if (typeof this.subscriptions[t] > "u" || !this.subscriptions[t])
      return !1;
    const e = this.subscriptions[t].indexOf(s);
    return e !== -1 ? (this.subscriptions[t].splice(e, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const S = new st();
function et(t) {
  this.menu = t, this.panelCssClass = "", this.itemCssClass = "", this.itemTextCssClass = "", this.itemImageCssClass = "", this.itemsCssClassesById = {}, this.setStyles = () => {
    if (!!this.menu.panel) {
      this.panelCssClass ? this.menu.panel.className = this.panelCssClass : (this.menu.panel.style.padding = "3px", this.menu.panel.style.borderStyle = "solid", this.menu.panel.style.borderColor = "#dddddd", this.menu.panel.style.borderWidth = "1px", this.menu.panel.style.backgroundColor = "#eeeeee", this.menu.panel.className = "");
      for (let s of this.menu.items)
        this.setItemStyles(s);
    }
  }, this.setItemStyles = (s) => {
    this.setItemDivStyles(s), this.setItemSpanStyles(s), this.setItemImageStyles(s);
  }, this.setItemDivStyles = (s) => {
    const e = this.menu.panel.querySelector("#" + s.id);
    !e || (e.style.display = "flex", e.style.flexDirection = "row", e.style.alignItems = "center", this.itemsCssClassesById[s.id] && typeof this.itemsCssClassesById[s.id] == "object" && this.itemsCssClassesById[s.id][O.ITEM] ? e.className = this.itemsCssClassesById[s.id][O.ITEM] : this.itemCssClass ? e.className = this.itemCssClass || "" : (e.className = "", e.style.paddingTop = "2px", e.style.paddingLeft = "3px", e.style.paddingRight = "3px", e.addEventListener("mouseover", () => {
      e.style.backgroundColor = "#0066CC", e.style.color = "white";
    }), e.addEventListener("mouseout", () => {
      e.style.backgroundColor = "transparent", e.style.color = "black";
    })), e.style.whiteSpace = "nowrap");
  }, this.setItemSpanStyles = (s) => {
    const e = this.menu.panel.querySelector("#" + s.id);
    if (!e)
      return;
    const i = e.querySelector("span");
    i && (this.itemsCssClassesById[s.id] && typeof this.itemsCssClassesById[s.id] == "object" && this.itemsCssClassesById[s.id][O.TEXT] ? i.className = this.itemsCssClassesById[s.id][O.TEXT] : this.itemTextCssClass ? i.className = this.itemTextCssClass : (i.className = "", i.style.color = "black"));
  }, this.setItemImageStyles = (s) => {
    const e = this.menu.panel.querySelector("#" + s.id);
    if (!e)
      return;
    const i = e.querySelector("img");
    i && (this.itemsCssClassesById[s.id] && typeof this.itemsCssClassesById[s.id] == "object" && this.itemsCssClassesById[s.id][O.IMAGE] ? i.className = this.itemsCssClassesById[s.id][O.IMAGE] : this.itemImageCssClass ? i.className = this.itemImageCssClass : i.className = "");
  }, this.setPanelClass = (s = null) => {
    this.panelCssClass = s || "";
  }, this.setItemClass = (s = null, e = null) => {
    if (e) {
      this.setClassForItem(e, O.ITEM, s);
      return;
    }
    this.itemCssClass = s || "";
  }, this.setTextClass = (s = null, e = null) => {
    if (e) {
      this.setClassForItem(e, O.TEXT, s);
      return;
    }
    this.itemTextCssClass = s || "";
  }, this.setImageClass = (s = null, e = null) => {
    if (e) {
      this.setClassForItem(e, O.IMAGE, s);
      return;
    }
    this.itemImageCssClass = s || "";
  }, this.setClassForItem = (s, e, i) => {
    (!this.itemsCssClassesById[s] || typeof this.itemsCssClassesById[s] > "u") && (this.itemsCssClassesById[s] = {}), this.itemsCssClassesById[s][e] = i;
  };
}
const O = {
  ITEM: "div",
  TEXT: "text",
  IMAGE: "image"
}, it = (t, s = {}) => {
  const e = {};
  for (let i in t)
    i !== "type" && i !== "target" && (e[i] = t[i]);
  return Object.keys(s).forEach((i) => {
    e[i] = s[i];
  }), e;
};
function ot(t, s, e = null) {
  this.panel = null, this.container = s, this.items = t, this.event = e || "contextmenu", this.listeners = {}, this.origEvent = null, this.cursorX = 0, this.cursorY = 0, this.overflowY = "", this.maxImageHeight = 0, this.subscriptions = {}, this.init = () => (Object.assign(this, new et(this)), this.container.addEventListener(this.event, (i) => (this.onEvent(i), !1)), S.emit(C.CREATE, this, { owner: this }), this), this.onEvent = (i) => {
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
      const p = document.createElement("div");
      p.style.marginRight = "5px", p.style.display = "flex", p.style.flexDirection = "row", p.style.justifyContent = "center", p.style.alignItems = "center", n.height = this.panel.querySelector("#" + o.id).clientHeight, n.height > this.maxImageHeight && (this.maxImageHeight = n.height), n.style.verticalAlign = "middle", n.style.display = "", p.appendChild(n), this.panel.querySelector("#" + o.id + " div") || this.panel.querySelector("#" + o.id).insertBefore(p, a);
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
      !this.origEvent || (S.emit(i, this.origEvent.target, it(a, {
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
    if (!this.container || (S.emit(C.SHOW, this, { owner: this }), this.drawMenu(), !this.panel))
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
    const n = S.subscribe(i, (a) => {
      a.owner === this && o(a);
    });
    return this.subscriptions[i].push(n), n;
  }, this.removeEventListener = (i, o) => {
    this.subscriptions[i] && typeof this.subscriptions[i] < "u" && this.subscriptions[i].splice(this.subscriptions[i].indexOf(o), 1), S.unsubscribe(i, o);
  }, this.on = (i, o) => this.addEventListener(i, o), this.off = (i, o) => {
    this.removeEventListener(i, o);
  }, this.removeAllEventListeners = () => {
    for (let i in this.subscriptions)
      for (let o of this.subscriptions[i])
        S.unsubscribe(i, o);
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
    this.panel && (this.panel.innerHTML = ""), this.panel = null, S.emit(C.DESTROY, this, { owner: this });
  };
}
const C = {
  CREATE: "create",
  DESTROY: "destroy",
  SHOW: "show"
};
function nt() {
  this.menus = [], this.create = (t, s, e) => new ot(t, s, e).init(), S.subscribe(C.CREATE, (t) => {
    this.menus.indexOf(t.target) === -1 && (this.menus.push(t.target), t.target.id = this.menus.length);
  }), S.subscribe(C.DESTROY, (t) => {
    this.menus.indexOf(t.target) !== -1 && this.menus.splice(this.menus.indexOf(t.target), 1);
  }), S.subscribe(C.SHOW, (t) => {
    this.menus.forEach((s) => {
      s !== t.target && s.hide();
    });
  }), document.addEventListener("mouseup", (t) => {
    t.button !== 2 && this.menus.forEach((s) => s.hide());
  });
}
const V = new nt();
try {
  window.Menus = V;
} catch {
}
const ht = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECcZZuWhdAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlZBBEsAgCAMT/v/n7akzWAFtTo5mQ8SAJtkGcL4LXcg211A2L+eq3jc5C/AGTUBZ7wYAHH+B4yIAv8a8dkvilLz9qXuYKseU2E7qDFODqIwTIEkPSldAAa0WlbUAAAAASUVORK5CYII=", rt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECgYlnqNLQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABZSURBVCjPlZFBCgAxCANN/v/n2VOhiFU3N4U4GgXELUkAikbOhlhIh1QZXkR3hGc/IsaVMtHT0RXR3e5jescIqBpy05T/tInffw2AvEkr972N+a69+U8e8AGOtEABr4X+4AAAAABJRU5ErkJggg==", at = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECkWaNmRawAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABjSURBVCjPlZBRDsAgCENbsnt6/1N0P2ocijASEy08iqC1BknhASCvsSeOQXImJXHcrQL4t1UAr4fjReDmdCsc/5LEZ7NOwOlUKVy3RwC/AAAwL2TAZ3t+xFszOxVl7lbtvsYLOtlZCOj2NccAAAAASUVORK5CYII=", pt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIECoXNPPyPgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABaSURBVCjPlVFBEgAhCAL+/2f21I5jqcXFGRMSpG1EkLRtooEyIdaRlAc7orqBsg+gVKy8yTYn49vqMb0pgCUuPOBP93Sniaxb8/FdL6mt/rZe5SMKXQWRf/4AYrs6C0ViuwUAAAAASUVORK5CYII=", lt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDsHep3BSgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA8SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCAZy0h4AXLILDAEWNOwAAAAASUVORK5CYII=", dt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDMMJZaSygAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA/SURBVCjPY2DADf7jkmAkQgMjMZr+EzKckVgnIatlJFIDinqynMfEQAYgSxNV/ERy6JEdT0SlCJxAWZoFp1MBY8cLTv/x72kAAAAASUVORK5CYII=", At = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQARsznxFAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", ut = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEQEbSvcpSwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA3SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTCICjCTbxPJfsIWSv+JECM9nugHAG40DyW1OoLPAAAAAElFTkSuQmCC", gt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDIpd4l3zAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", ct = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDYr/evT5AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVCjPY2AgAzBC6f9EqIEDJiINJUkTAzma/pNr0390NguRLvqPyyZGXB4nKnQIRQETiYZRP8j/M1AbAADcMAcWozKAnAAAAABJRU5ErkJggg==", ft = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDUsSKIVhAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA0SURBVCjPY2AYSPCfAJ+BiZACbOKMRGjAUM9Igga4RkYSNTBQZBPJfsIWSv+JECM9nugHADv6Dv2P6G4ZAAAAAElFTkSuQmCC", Et = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5gkIEDQQftZYQgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABBSURBVCjPtZAxDgAgCAOvxP9/GTfjolISOxIK7UFDOszz5gnzGADRiReNeMuUVQPAcJbdTtrhqILY/aTvyG04T00vswcW6BsN2AAAAABJRU5ErkJggg==", mt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAEDSURBVDjLzZPNSsQwEIC/CUWtQlnZi14EYb36Jj6DT+ZT+BSevImHPYggKLpo2bW1Ze14yJjFtKEed3poMpmvzZcf2LqQfkolZFV0FFDhkMI6JR99JAbczTlP/tGZung86yN7Spn+4ABw0PH5DyCoOoSvYOg00s9C+YSpL8oLGgMmnOILF2r68qvKibvWXd9hbsCZ/ajpLniULnKQO82tubb3vY3Uw9IrvhOmCaDFJYC2DyjLt1vNQGjzI5v7+1wrBWTN0uQ3R0OFfQRwz7PjS8td8UAHKFW0rCDqt0ud1mEfKlZ+bYYdNtGQjAFgh6L+M9sRQKev5Yu1F4zfh7ELtIXxA+JiW9aVMPJ4AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", Y = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAACn0lEQVRIx+2U30tTYRzGn/fsPdOmNkWDsEDnOiFCbv4KhPJCFAvDtBuRyL/A64TwQkGaCt7pVYqimHhTJAVhuYsRE5zipLuZeQKNsMQdN1vbzvbtwg2Oa5s/uvWBl3Px8P18OO/7ngNc5H9DROw8XTxCumEiygJwjYh4kp7HuqzTiJLBc8aslr5+vbiy43SWaiVExHecztJ+vbgyZrX0EVHOqSVx+ERFee8wR3hcBNky+VpcEofbMvnauAga5ghPVJT3ppKwJIKsqRrr0/3P68+KdeAMgBIFfgjc/cT+6TEATNffmbkaVa1GASAAcgRq3i3L806Xe4gxdqjl8QS4ACBPDPibpIwjOAAUAOBR1fqy8e4MAFwXVGuuZlLi4ErA3wTgBREFGGPRdG+gCytKy3JDTdfvrxv12s4bOXrm6o7PGEok++2PrhHRaJxnjEXSblFMog/7lea1xn8liTGUSPaKD64RMdv4jjEWOvEMtJKIX2lev1fTFdhKLrlkkuyW964RXQo4kOY7ABBVNj0e+eDwMudAsiUfHF5WNj0eANFUkFRbxPdWl268elA3Wyyq1nwx+fBeGJDD3P3oraMjv6r2C2NMPVFARLq91SXpTUvdrEmvWgv0SJtfIWArxN0P5x0d+VW1G2kPOXZNC6dMma+LebD6SgI8o+imHQCC3zzHzuRnCJDVjJXOrT9tAL5rr+mxM4gV+w3dPY7CbCEkciC+DGbJXjS3PFo0tzxqMEt2bVeYLYQaunscAPa18KSJ/SrMyuSgTa4WgnIlaLtVWlR93jYi0hORXvV527ZbpUW5EiRXC0FlctBGROaz/o/Mvumhgd32soU4XNPrVZ+3bbe9bME3PTRwJniCxERE97VwrSTWmc4MTxSdp7vIqfMXBoR6XMSZc1QAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDB/NVeTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwDmjvLwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=", bt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAG6SURBVDjLlZK/TxNhGMc/z117FgWbNulITGMYTMvAaHAyhMTAIoOmcdD/wMWERdO4E8If4OJASBgcGcA4QRgx4YcLA4aUYDTRCoX2fj0OvTu441rwuem+7/N5n/f7PA/8ZwholiHuYCCXdMWnxYk4KYwWSws0+JX4GqUFLaqRVmHYWFUfTZ6I4U9ynKyRAUztoNsfq6f4gWrsDI6+VMGMPTMCwIHqGt+xA9Wq3uNFuukIoIUtduiYFs51QDIcwMSKrHn4otcBebJ4QfofmnghYKcANlCQxaj505xcAL0qGM1lFEXwwsH2B/zi0/DXXbps2k0YtDBxAbxvPbtUL7/Xi8HVy90ntXdwVUUgHKGADufedrJUsGKWd2857aXMXLAy4j7nUOxuhdabvfmR86/x0gPO7AFn3lYkCJaqON31HqVCNpZvMkCDA3kVtfUD5/yVYwFQ48qaZShO1VeqbEbKwyfbK+/kx5VtDO4TLO/Rs7FPpVCZ+bm8Za5LpwcAKuTajycebBQAxn9/3st9oSPaEwAVbjcnx+/vDlZON/bza5yJ0j9UNH9Um3h9VNO7/a6OIwWd0sIN09PiH5BSrD/OwMFRAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", xt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAFGUlEQVRIx7WVaWxc1RXHf/ctM+OxPcQLxIljD3GCAYOxiHCSpmmWEgi7kBBIiEXiU79USHxhEaJtWqFWqqhQW1BLIImrVLTwgQBhM2sIEIVFCZDFSbCdxI4X7ExmMjOemffuvacfbA8e1FYNUv/See/o3vf+5/3/5+o8+D9DzSYiolatWhUrFArR2bXa2lr1317OZrMCcPbsWQFIp9PypOt23TsxsbuigIiogx8/d9+StsW/8P1Y8ty/U6avpYCPf/2XbMPdV9/fueZn2wA8gPXr11e/uu2hX1EabQlyeRQKlPofuQVBQCy5XYdwGv3aZGvLJuCfQMEBsNZW+RG/xZSyWAEjqiJCA09ueZtr736CXXuPzdkDI2CtYI0wvvsY1a21RHyvFYgCOACJRMK1RmMsWKuworDiYMXBWMXjf3yF9/f0s+mXjxB6TfR+eLi8Px0Kk5lieP8g9YsvIAiLJBIJp2yR53nKaI21Mu3MbAB/3trLnn0neeap35FsrseGU3y5r8SLO/dy2/XLZ13CfHacjO8Qr6tBl0qIiCorUEq51oYYIxgr05KtsO2FXbzy9n4ee/jnjJ44wOmRQxw5+CnP/r2XqliU51/+BGMs1kDu6Di6KcFUMcBajYh8p8AYo6wOsMagRGERnu55kx1vfc6Plney+bmtXP3jDv72j9dYOL+ODasvp7urjfxUkb9uf4d7b+gmNTBGtK2RIAxBTPmEejNNVkYHGKMRIzz42xfY/ekRrlvXxdruC5mX6MB1XVZ3t2OtMDJ+hoETY3Rd2sLtN69gz5Z3qU3lqN9wEQrBmu8s8gAymYzosITRITvf28fxoQmeePROCqWQMAiZmMxgrSWVyhCEBkQIwxATlFhyYSMr59XyXv4bEp7Cc8CEYaWCdDqNDovoMODowCgbf3IpuXwOgHyhRLEQUBXzwcbAUbiOQ8RXHO0f4tuJM6w+nSeb8ImKQSFoXSKfz1NuciqVQodFQh2w8soWjgyOMjwySVNjNYWpIhFPiMdcfNcS9YSYJ8RjDvGYi2ciTC6/hlxbMx1Lzyc0Bh0EZW5vpoCEQQkThlzRPp/O9iZe/+AQv/nTa2x+/A6y+SI18SijE1mKpQAdWiIRl5XLknxzzOdYop5IcwO+pwiCEOUVKy0ClA6KGB1Mjwmg98PDLOtYiBjN0KkU45NZhsYydHcuIhZ1qa3ycMVgaxYycnyAqzrOI5ctYMXietFyAQegUCiggwJGG7TWaK3pumQBff3f8uyLe/F9RceSBrovWwDG4CkoFgNS6RxnTIxTo4MoMYxOZNDaoIN/pyAsIWLLM+yWn17M7Rs76B9K0fPSF2xYsZh0tsDi5np8L0Y04nH4eJrtvc9z5dIYg8PVNM6LE/UddFiqVAA4WocYY8rxxYFhdn7QRzzm0TcwwchkjisubmLB+TXUVEeIRBw+/3qQI4cPUBfXIMIFDXFELFqHlU0GlNGmYgqv6Gwu53fd2Mn+vjH6T57m/rtWYo3BWOGTfSdJNlXRcF6M9mQdSoQ5PJUWGWPLP47vY113kjVXtfKHnj38fstH3LT2Ik6NZ+loa2Tj6iW0JxuYGTlzuSsK2KGxzGTz/ESjWMN/wgP3rCjnS1vrWNvd+j1iUI7LqfHMJGDnFhjrefmrN+67bfmNyUVN9cpxUY6Hclwcx0WVY/pxsRqxBrEGO3OfXTsxPJbq2fHVm8BYWcYMLgNuBS6Z0/xzhQX6gB3AwR/IcW74F/jUry6yACAoAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", St = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAE8ElEQVRIx7WVWWxVVRSGv733Off2Xjrc0oFKy6XQoqCMEgc0RhFNVBzwQRIfUBKiTyYqCSQmmhiNJkSjiQkJiQ8mKg5xiGKCCIpEZFCCcwlVhlCwrbSlpe1te8/Ze20fTluL4AMaV3KmZGd9a/3r7H/D/xzqb99pIPUfc0ZA8TzALzvee6C5adbTqVRqxgXrGFupDUqBR4EG/LkrfVwc6jjZ9nzDkjuemwjIFFq/OZRyI43EI//Qp0IpnTyDAKU1KDUBPprKpJAgNRTk51cDw8GYNKkwaJTCIHgPWieVeTkX4lWSWCzaGDAhSisUejS/BxdhMqXZUbnHAUpsTH//AH2FYQojMWcGCgBUZNM019eQCsNkpVOgNV4MSgQThHgDSpm/ZEp0UwDjAO9istkSJpWWooIQrwNO/dHNdy2tvL31S2bW17H0yjnkp9aCKLxolLMgHh2GEJBIqAGRCcImUT38884uGeyFIMShCdMZMAFoQxRZPv96P5s/2EJ1RSlrVtzKFc15lNZoE2LSaXSYRpkApQ1kKtANc2uA7jFATeH7z05LoY+ih9N9BY793sVwFBE7x9LrriFXXo54z849+3nl1ddZMKuRh+69lfq6GlSYIkhn0Kk0OghRJeXo/IJaoGsMUDtw4JM/3GAvrW2dvLN9N22dZyhaR29/AWuF8tIM0+vruO+OW5jdlOeZlzdx6Mhx7rnxKlbdvYxcrpIgncWkS1CTcpj8winA6QlDjhAbMWvqZErTIXu+b2FwpEgmFeKVJghCevqH6O79kKqKLLfftITLm6bz7tad7P2xlQ2PPUg+Pw1lDMa582ZQ1/vV2x1u6CxRbPntZCffffwtmeV3MmQt/b09tLed4OCh45w6fpiG2iqWXb2IqvI0c2Y08MrmLQC8vP5hmpubSFVUYZquvQToHOtAiysiEhEYxeSKEnp8kRvP9DBz1QMopXh9234GGvuYZ4Qsll9/2Mv04hkaasrZ8MhKXnprGx/s2M36xmmItZD8T8kNUDaOcNaR7IdBGhdOp3XfPrIlJQTpLCvvXMaifCVvPvs4B776HH/ZDTQtuY0t+1po7+ljwyMrmd1Yh7URYovj6owDJB5BXIS1MfVVZeRKM/SGwu6nnqR6co4X3t9DN2WUV07m+hX3s2Lptaxe/SAvbnqNT789TN/Zfm5ePAdxMWLj8wE2KiJxjIsilLXMnVZD47x6TnScYte6tSyp1fza3sddT2ykc9CwsKGSsrJSamrrWPfoWn48chJxDnEWl/jZuTvZFUfw1uKdgAiBeK6ZeQk9UyrpONbFpT99ST5TRvtQjvlXLaIhtHQdO0I00MNQ+1EWN09FXIx3DhcXzwNoH0d45xCbAEQSR6nOpKia14CIx/qIKcOnSB/tpPeEQQcBxigmaY0ODF4s3sZIVBxXZ8I+sIgVvEsufGJagkJp0EoT4kllQpRS4D3exjg36rChR0UxNijilbqARNbhrYB4RHxi22Pu6AHsqPcrvBp1TMWoH3m88slhVBwZO4TOGbJ09w8OKDzee1RSPqDwPnn3kpBEBHFJIYjHW0Gsw8cWsRE2LtLW0d4HyMQOOt/44uD2NbddvzxXnitRyoBSKG0Sd9QapUwiBeC94MWBCB6X0JWgjaaju+fsxg93bQM6J1oFwBXACmD2hM4uNgQ4DHwEtPzLHBcXfwKfID6QlqygzQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMH81V5MAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTEtMjBUMTA6MTU6MTEtMDA6MDAOaO8vAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==", Ot = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAJdnBBZwAAABgAAAAYAHhMpaYAAAFdSURBVDjLzZO/TsJQFMZ/t1QsmthEjQkmLoZJA7ODq/EdHBx9BcTEmMjCxsA7+Ao+gFOdCImOuoAs/qtIldL2OECxLY1EJ88Zbu6933e+c/988MtQ8akotOQaQqAklSAaS5hkEgQfmzcVTImJEjPfoMNjIjv5hpiiEgqiyJLXLiVAEpWU0oJ9HpQHoEeaWWFZPpGbiy17QlK35vaBqBAXaWajzp3sYWFJUQzRx2lIEQtLNmVMGQ0ZzPYuXQQX6OON5EGgjxstHkrp8k4A8c1xpBJgAMAwhTBMJ7jT1X5WGP5nBQ1dvve1mQq1wjGEX02rFX5S8HPOh16pVOYjiAHNnIeXTuidtc/XnOv4ERa8ky42fkpL9dXyfTnLXAzf54UmvdBCCkB01hcPHZ0djHh15QVHdHBV5BYAfOzq06npXMXhhl995TkKnxhINEqUyE49WYtW3JxRx82w/x/jC67KmykWiVPXAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTIwVDEwOjE1OjExLTAwOjAwfzVXkwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMS0yMFQxMDoxNToxMS0wMDowMA5o7y8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC", vt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAAAYAAAAGAB4TKWmAAACQElEQVRIx9WUz2sTURDHPzMvIb3VgyJKW/DXSXoKtSJIbaxtgi3of+BfIYKXgOAfUCh6zFFR9Ca1tomXigf7P/SQqo2giIrNpvvGw+7GStIlG/HgLI8dHvPmOzPvw4P/3SRx1hurde/9bL8g7z1mhveGWeQj0liq3CgNrLS28cKy2JNnj2yQvLnE6XQ6AHz/8Q3vPd6HhMk/3CcMw2j5fU5NnCMI2gMV3hUIggCAdrDHy9U1zDzeopF4b5g3jJCZKzN/xA8h0Ga2NAMIZoYRz91b3JmP4ttZBeIDPgzZWK8DgghEgzbMADNKc6W/6yD0nqtzJUQEVY2FonXQ2lkFkgNOlXq9gYoiqqgIiCJETM+XF7oFrTxYtjNnT6ci3NOBc45yuYxTh3MOVYeqxt0QJYjjp6cuUSwWe6p++vzxbE8HiYCosv5qI0rqFKeOxeuLqHOICHbgkr98/czH1k4qwj2XLMD8wjWcy5FzDudyICDxZ/FdBEHAm81Nms1mKsI9HRw/djL10hyuGz81fYHJyfOpCHcFDNu8c/f2RUveHTMS38xcNPookXlPYWSErXdbtHZ3UxHuCtyr3r9crd4qbCcb27+rHp848XNp8SYfdndQVUSEkUKBsbFxRo+MpiKcO7Bv1Wptr99YVh4uUywWab4/SqPxGhVFnaPV+nQowv0EDrVOp4Oqks/nqVQqAyGcSWAYhLMJDIHwUB1kQTiTQBrC0RtkRAhH+7l87m1yVgYRAOQwhPtZrVZrk7z0/9p+AWdQwNFPdOB+AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDA5LTEyLTAxVDAyOjIyOjM1KzAxOjAwqBTIawAAACV0RVh0ZGF0ZTptb2RpZnkAMjAwOS0xMi0wMVQwMjoyMjozNSswMTowMNlJcNcAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAE3RFWHRUaXRsZQBPcHRpY2FsIERyaXZlPme6DAAAAABJRU5ErkJggg==", yt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3WAAAN1gGQb3mcAAAAB3RJTUUH5goLBzIP6fiS+gAAAoFJREFUSMfVVk1rE2EQft55EyKeFU0PlcR6koIa+0FBa2NtEmyL9uLBIoHi0YvFogghIIjoTbx4MldB8BRUTJNeqh7MwT+gPaSpKdjak2bTnfGw3SVhP5p4EFxYmJf5eGbmfXZmgf/9UbZQqrwtM/OElxEzQ0TALBCxZChVmclcSe4HEGoLMjEwv+AoYvV6oOOr1y87kvkajYotxzc2lAug1Wp1BPi5swWTGcwmTHMXpmlaL+8i1n8ChtHsqkUOgGEYHYpisQgWqyXMAmGBwMT4hXFP+64AYvU66o0aFICx08OOUbj6EcICZgYzW/ZNw7ct3gBNKyM2TSyXyjjfZrRcKkMEgAiSk8m/rwAATGZcnEyi/UZSqRSU6kyw2SuA7aCJUC5XQE8eQRGBlMLoqbMdTt8AzAF4k7uH4wNxiAiKLOJFYVcFWmuk02lo0tBag0jjx+07ntmNDI0hkUgEUtgFoIhQer8MIgJpgiaNMz7lb+9s4fvmeiCFXZesAEylLkHrEEJaQ+sQGj4AH1ZXUavVAinsquDI4b6u58zQyDAGB096UtgFIJDVu/eXRsWeOyKw5VuA9gKofq5is9EIpLAD8CD/8Fw+n42s7Z1zz9/9snUvbmYxM30VG411EBGUUjgQieD6fNYJdPBL1ZPCobaEJJ8v/LYPuWjUURztiyKRSKBWP4RKZQWkCKQ14m3OK+UVTKVT/hUEPa1WC0SEcDiMTCbjUHh7ccmxmZmdtb6BIAC/2fLYMMSTws+eYvryNEhr1PqPOXGMhRu9VRBEYShAoXOM9NyiXinsC+A3coMobK1RAa7N7e0NRkipT66dvN/ubqcw1oKNC4VCE4D8k7+KP78ve+ZyfaadAAAAAElFTkSuQmCC";
function Bt(t) {
  this.point = t, this.contextMenu = null, this.updateContextMenu = () => {
    this.contextMenu && (this.contextMenu.destroy(), this.contextMenu = null), this.point.options.canDelete && this.init(), this.point.contextMenu = this.contextMenu;
  }, this.init = () => {
    this.point.element && (this.contextMenu = V.create([
      { id: "i" + this.point.guid + "_delete", title: "Delete point", image: Y }
    ], this.point.element), this._setEventListeners());
  }, this._setEventListeners = () => {
    this.contextMenu.on("click", (s) => {
      s.itemId === "i" + t.guid + "_delete" && h.emit(g.POINT_DELETE_REQUEST, this.point);
    });
  };
}
function Ct() {
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
  }, this.x = 0, this.y = 0, this.element = null, this.guid = L(), this.subscriptions = {}, this.init = (t, s, e = null) => (this.x = parseInt(t), this.y = parseInt(s), Object.assign(this, new Bt(this)), this.element = this.createPointUI(), this.setOptions(Object.assign({}, e)), this.setEventListeners(), h.emit(g.POINT_ADDED, this), this), this.setOptions = (t) => {
    t && typeof t == "object" && (t.style && typeof t.style == "object" && (t.style = Object.assign(this.options.style, t.style)), Object.assign(this.options, t)), this.options.id && (this.element.id = this.options.id);
  }, this.createPointUI = () => {
    const t = document.createElement("div");
    return this.options.canDrag ? this.setPointStyles(t) : t;
  }, this.setPointStyles = (t = null) => {
    if (t == null && (t = this.element), this.options.id && (this.element.id = this.options.id), t.className = this.options.classes, t.style = this.options.style, typeof this.options.style == "object")
      for (let s in this.options.style)
        t.style[tt(s)] = this.options.style[s];
    return t.style.width = this.options.width + "px", t.style.height = this.options.height + "px", t.style.left = this.x - parseInt(this.options.width / 2) + "px", t.style.top = this.y - parseInt(this.options.height / 2) + "px", t.style.zIndex = this.options.zIndex, !this.options.canDrag || !this.options.visible || this.options.hidden ? t.style.display = "none" : t.style.display = "", t.style.position = "absolute", typeof this.updateContextMenu == "function" && this.updateContextMenu(), t;
  }, this.redraw = () => {
    this.element = this.setPointStyles();
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.rotateBy = (t, s, e) => {
    const [i, o] = I(t, this.x, this.y, s, e);
    this.x = i, this.y = o;
  }, this.setEventListeners = () => {
    this.element.addEventListener("mouseup", this.mouseup), this.element.addEventListener("mousedown", this.mousedown), this.element.addEventListener("mouseover", this.mouseover), this.element.addEventListener("mouseout", this.mouseout), this.element.addEventListener("click", this.click), this.element.addEventListener("dblclick", this.doubleclick), this.element.addEventListener("mousemove", this.mousemove), h.subscribe(N.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange);
  }, this.mousedown = (t) => {
    h.emit(g.POINT_MOUSE_DOWN, this, l(t)), t.buttons === 1 && this.options.canDrag && (h.emit(g.POINT_DRAG_START, this, l(t)), j(t));
  }, this.mousemove = (t) => {
    if (h.emit(g.POINT_MOUSE_MOVE, this, l(t)), t.buttons !== 1 || !this.options.canDrag || !E.draggedShape || E.draggedShape.draggedPoint !== this)
      return;
    const s = this.x, e = this.y, i = w(this.element.parentNode, !0);
    if (!this.checkFitBounds(this.x + t.movementX, this.y + t.movementY)) {
      h.emit(g.POINT_DRAG_MOVE, this, l(t, { oldX: s, oldY: e }));
      return;
    }
    let o = t.clientX + window.scrollX - i.left - this.options.width / 2, n = t.clientY + window.scrollY - i.top - this.options.height / 2;
    [o, n] = this.applyMoveRestrictions(o, n, s, e), this.x = o, this.y = n, this.element.style.left = this.x + "px", this.element.style.top = this.y + "px", h.emit(g.POINT_DRAG_MOVE, this, l(t, { oldX: s, oldY: e }));
  }, this.mouseover = (t) => {
    h.emit(g.POINT_MOUSE_OVER, this, l(t));
  }, this.mouseout = (t) => {
    h.emit(g.POINT_MOUSE_OUT, this, l(t));
  }, this.click = (t) => {
    h.emit(g.POINT_MOUSE_CLICK, this, l(t));
  }, this.doubleclick = (t) => {
    h.emit(g.POINT_MOUSE_DOUBLE_CLICK, this, l(t));
  }, this.checkFitBounds = (t, s) => !(this.options.bounds.left !== -1 && t < this.options.bounds.left || this.options.bounds.right !== -1 && t > this.options.bounds.right || this.options.bounds.top !== -1 && s < this.options.bounds.top || this.options.bounds.bottom !== -1 && s > this.options.bounds.bottom), this.applyMoveRestrictions = (t, s, e, i) => (s > i && this.options.moveDirections.indexOf(f.BOTTOM) === -1 && (s = i), s < i && this.options.moveDirections.indexOf(f.TOP) === -1 && (s = i), t > e && this.options.moveDirections.indexOf(f.RIGHT) === -1 && (t = e), t < e && this.options.moveDirections.indexOf(f.LEFT) === -1 && (t = e), t > this.options.bounds.right && this.options.bounds.right !== -1 && (t = this.options.bounds.right), s > this.options.bounds.bottom && this.options.bounds.bottom !== -1 && (s = this.options.bounds.bottom), t < this.options.bounds.left && this.options.bounds.left !== -1 && (t = this.options.bounds.left), s < this.options.bounds.top && this.options.bounds.top !== -1 && (s = this.options.bounds.top), [t, s]), this.mouseup = (t) => {
    h.emit(g.POINT_MOUSE_UP, this, l(t)), t.button !== 2 && h.emit(g.POINT_DRAG_END, this, l(t));
  }, this.onBoundsChange = (t) => {
    t.points.find((s) => s === this) && (this.options.bounds = t.bounds);
  }, this.toJSON = () => JSON.stringify(this.getJSON()), this.getJSON = () => ({
    x: this.x,
    y: this.y,
    options: Object.assign({}, this.options)
  }), this.fromJSON = (t) => {
    let s = t;
    if (typeof s == "string" && (s = z(t)), !s)
      return null;
    this.x = s.x, this.y = s.y;
    let e = !1;
    return this.element || (e = !0, this.element = document.createElement("div")), this.setOptions(s.options), e && h.emit(g.POINT_ADDED, this), this;
  }, this.destroy = () => {
    this.element.removeEventListener("mouseup", this.mouseup), this.element.removeEventListener("mousedown", this.mousedown), this.element.removeEventListener("mouseover", this.mouseover), this.element.removeEventListener("mouseout", this.mouseout), this.element.removeEventListener("click", this.click), this.element.removeEventListener("dblclick", this.doubleclick), this.element.removeEventListener("mousemove", this.mousemove), h.unsubscribe(N.CONTAINER_BOUNDS_CHANGED, this.onBoundsChange), h.emit(g.POINT_DESTROYED, this);
    for (let t in this.subscriptions)
      this.subscriptions[t].forEach((e) => h.unsubscribe(t, e)), this.subscriptions[t] = [];
  }, this.addEventListener = (t, s) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const e = h.subscribe(t, (i) => {
      i.target && i.target.guid === this.guid && s(i);
    });
    return this.subscriptions[t].push(e), e;
  }, this.removeEventListener = (t, s) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(s), 1), h.unsubscribe(t, s);
  }, this;
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
}, f = {
  TOP: 0,
  LEFT: 1,
  RIGHT: 2,
  BOTTOM: 3
};
function _t(t) {
  this.rotateBox = t, this.subscriptions = {
    rotate: []
  }, this.initialAngle = 0, this.previousAngle = 0, this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    this.interceptEventsFromShape(), this.rotateBox.shape.points.forEach((s) => {
      s.mousemove = this.mousemove, s.mouseDownListener = s.addEventListener(g.POINT_DRAG_START, (e) => {
        this.onPointMouseDown(e), h.emit(r.POINT_DRAG_START, this.rotateBox, { point: s });
      }), s.mouseUpListener = s.addEventListener(g.POINT_DRAG_END, (e) => {
        this.onPointMouseUp(e), h.emit(r.POINT_DRAG_END, this.rotateBox, { point: s });
      });
    });
  }, this.interceptEventsFromShape = () => {
    r.getShapeMouseEvents().forEach((s) => {
      this.shapeEventListeners[s.name] = this.rotateBox.shape.addEventListener(s.name, (e) => {
        s.key === "SHAPE_MOVE_END" && (this.previousAngle = 0), h.emit(s.name, this.rotateBox, e);
      });
    });
  }, this.mousemove = (s) => {
    if (s.buttons !== 1) {
      h.emit(r.SHAPE_MOUSE_MOVE, this.rotateBox.shape, l(s, { clientX: s.clientX, clientY: s.clientY }));
      return;
    }
    const [e, i] = F(s, this.rotateBox.shape.root), [o, n] = this.rotateBox.shape.getCenter();
    let a = this.calcAngle(e, i, o, n);
    if (a === null)
      return;
    let p = a;
    this.previousAngle && (p -= this.previousAngle), this.previousAngle = a, h.emit(R.ROTATE_BOX_ROTATE, this.rotateBox, { angle: p });
  }, this.calcAngle = (s, e, i, o) => {
    const n = this.calcHypotenuse(s, e, i, o);
    if (n <= 0)
      return null;
    const a = this.calcCathetus(s, e, i, o), p = this.calcStartAngle(s, e, i, o);
    return Math.round(K(Math.asin(a / n)) + p + this.initialAngle);
  }, this.calcHypotenuse = (s, e, i, o) => P(s, e, i, o), this.calcCathetus = (s, e, i, o) => {
    if (s <= i && e <= o)
      return P(s, e, s, o);
    if (s >= i && e <= o)
      return P(s, e, i, e);
    if (s >= i && e >= o)
      return P(s, e, s, o);
    if (s <= i && e >= o)
      return P(s, e, i, e);
  }, this.calcStartAngle = (s, e, i, o) => {
    if (s <= i && e <= o)
      return 0;
    if (s >= i && e <= o)
      return 90;
    if (s >= i && e >= o)
      return 180;
    if (s <= i && e >= o)
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
    this.rotateBox.shape.points.forEach((e) => e.setOptions({ visible: !1 }));
  }, this.onPointMouseUp = (s) => {
    this.rotateBox.shape.points.forEach((e) => {
      e.setOptions({ visible: !0 }), e.redraw();
    });
  }, this.addEventListener = (s, e) => {
    typeof this.subscriptions[s] > "u" && (this.subscriptions[s] = []);
    const i = h.subscribe(s, (o) => {
      o.target && o.target.shape && o.target.shape.guid === this.rotateBox.shape.guid && e(o);
    });
    return this.subscriptions[s].push(i), i;
  }, this.removeEventListener = (s, e) => {
    this.subscriptions[s] && typeof this.subscriptions[s] < "u" && this.subscriptions[s].splice(this.subscriptions[s].indexOf(e), 1), h.unsubscribe(s, e);
  }, this.destroy = () => {
    for (let s in this.subscriptions)
      this.subscriptions[s].forEach((i) => h.unsubscribe(s, i)), this.subscriptions[s] = [];
    Object.keys(this.shapeEventListeners).forEach(
      (s) => {
        this.rotateBox.removeEventListener(s, this.shapeEventListeners[s]);
      }
    ), this.rotateBox.shape.points.forEach((s) => {
      s.removeEventListener(g.POINT_DRAG_START, s.mouseDownListener), s.removeEventListener(g.POINT_DRAG_END, s.mouseUpListener);
    });
  };
}
const R = {
  ROTATE_BOX_ROTATE: "rotate"
};
function Mt(t) {
  this.resizeBox = t, this.subscriptions = {
    resize: []
  }, this.guid = L(), this.shapeEventListeners = {}, this.run = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    h.subscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), h.subscribe(g.POINT_DRAG_END, this.onPointDragMove), r.getShapeMouseEvents().forEach((s) => {
      this.shapeEventListeners[s.name] = this.resizeBox.shape.addEventListener(s.name, (e) => {
        h.emit(s.name, this.resizeBox, e);
      });
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
    const e = this.resizeBox.getPosition();
    this.resizeBox.calcPosition();
    const i = this.resizeBox.getPosition();
    this.resizeBox.redraw(), h.emit(r.POINT_DRAG_END, this.resizeBox, l(s, { point: s.target })), h.emit(T.RESIZE_BOX_RESIZE, this.resizeBox, { oldPos: e, newPos: i });
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
  }, this.addEventListener = (s, e) => {
    typeof this.subscriptions[s] > "u" && (this.subscriptions[s] = []);
    const i = h.subscribe(s, (o) => {
      o.target && o.target.guid && o.target.guid === this.resizeBox.guid && e(o);
    });
    return this.subscriptions[s].push(i), i;
  }, this.removeEventListener = (s, e) => {
    this.subscriptions[s] && typeof this.subscriptions[s] < "u" && this.subscriptions[s].splice(this.subscriptions[s].indexOf(e), 1), h.unsubscribe(s, e);
  }, this.destroy = () => {
    for (let s in this.subscriptions)
      this.subscriptions[s].forEach((i) => h.unsubscribe(s, i)), this.subscriptions[s] = [];
    Object.keys(this.shapeEventListeners).forEach(
      (s) => {
        this.resizeBox.removeEventListener(s, this.shapeEventListeners[s]);
      }
    ), h.unsubscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), h.unsubscribe(g.POINT_DRAG_END, this.onPointDragMove);
  };
}
const T = {
  RESIZE_BOX_RESIZE: "resize"
};
function Pt(t) {
  this.shape = t, this.subscriptions = {
    CONTAINER_BOUNDS_CHANGED: []
  }, this.run = () => (this.shape = t, this.setEventListeners(), this), this.setEventListeners = () => {
    h.subscribe(g.POINT_DESTROYED, this.onPointDestroyed), h.subscribe(g.POINT_ADDED, this.onPointAdded), h.subscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), h.subscribe(g.POINT_DELETE_REQUEST, this.onPointDeleteRequest);
  }, this.setSvgEventListeners = () => {
    this.svg_mouseover = this.shape.svg.addEventListener("mouseover", (s) => {
      E.mouseover(l(s, { target: this.shape }));
    }), this.svg_mouseout = this.shape.svg.addEventListener("mouseout", (s) => {
      E.mouseout(l(s, { target: this.shape }));
    }), this.svg_mouseenter = this.shape.svg.addEventListener("mouseenter", (s) => {
      E.mouseenter(l(s, { target: this.shape }));
    }), this.svg_mousedown = this.shape.svg.addEventListener("mousedown", (s) => {
      E.mousedown(l(s, { target: this.shape }));
    }), this.svg_click = this.shape.svg.addEventListener("click", (s) => {
      E.click(l(s, { target: this.shape }));
    }), this.svg_dblclick = this.shape.svg.addEventListener("dblclick", (s) => {
      E.doubleclick(l(s, { target: this.shape }));
    });
  }, this.removeSvgEventListeners = () => {
    this.shape.svg.removeEventListener("mouseover", this.svg_mouseover), this.shape.svg.removeEventListener("mouseout", this.svg_mouseout), this.shape.svg.removeEventListener("mouseenter", this.svg_mouseenter), this.shape.svg.removeEventListener("mousedown", this.svg_mousedown), this.shape.svg.removeEventListener("click", this.svg_click), this.shape.svg.removeEventListener("dblclick", this.svg_dblclick);
  }, this.addResizeEventListener = () => {
    !this.shape.resizeBox || (this.resizeBoxListener = this.shape.resizeBox.addEventListener(T.RESIZE_BOX_RESIZE, this.onResize), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOVE_START, this.mousedown), this.resizeMouseMoveEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_MOVE, this.mousemove), this.resizeClickEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_CLICK, this.click), this.resizeDblClickEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_DOUBLE_CLICK, this.svg_dblclick), this.resizeMouseDownEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_DOWN, this.svg_mousedown), this.resizeMouseOverEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_OVER, this.svg_mouseover), this.resizeMouseOutEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_OUT, this.svg_mouseout), this.resizeMouseUpEventListener = this.shape.resizeBox.addEventListener(r.SHAPE_MOUSE_UP, (s) => {
      h.emit(r.SHAPE_MOUSE_UP, this.shape, l(s));
    }), this.resizeBoxContextMenuEventListener = this.shape.resizeBox.shape.svg.addEventListener("contextmenu", (s) => {
      this.shape.contextMenu && this.shape.contextMenu.onEvent(s);
    }));
  }, this.addRotateEventListener = () => {
    !this.shape.rotateBox || (this.rotateBoxListener = this.shape.rotateBox.addEventListener(R.ROTATE_BOX_ROTATE, this.onRotate), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOVE_START, this.mousedown), this.rotateMouseMoveEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_MOVE, this.mousemove), this.rotateClickEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_CLICK, this.click), this.rotateDblClickEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_DOUBLE_CLICK, this.svg_dblclick), this.rotateMouseDownEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_DOWN, this.svg_mousedown), this.rotateMouseUpEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_UP, (s) => {
      h.emit(r.SHAPE_MOUSE_UP, this.shape, l(s));
    }), this.rotateMouseOverEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_OVER, this.svg_mouseover), this.rotateMouseOutEventListener = this.shape.rotateBox.addEventListener(r.SHAPE_MOUSE_OUT, this.svg_mouseout), this.rotatePointDragStartEventListener = this.shape.rotateBox.addEventListener(r.POINT_DRAG_START, (s) => {
      this.shape.initCenter = this.shape.getCenter(this.shape.options.groupChildShapes);
    }), this.rotatePointDragEndEventListener = this.shape.rotateBox.addEventListener(r.POINT_DRAG_END, (s) => {
      this.shape.initCenter = null, this.shape.points.forEach((e) => {
        e.options.hidden || (e.element.style.display = "");
      });
    }), this.rotateBoxContextMenuEventListener = this.shape.rotateBox.shape.svg.addEventListener("contextmenu", (s) => {
      this.shape.contextMenu && this.shape.contextMenu.onEvent(s);
    }));
  }, this.onResize = (s) => {
    const e = this.shape.getRootParent(!0);
    if (e) {
      h.emit(T.RESIZE_BOX_RESIZE, e.resizeBox, { newPos: s.newPos, oldPos: s.oldPos });
      return;
    }
    const i = s.newPos.left - s.oldPos.left, o = s.newPos.top - s.oldPos.top;
    this.shape.moveBy(i, o);
    const [n, a] = this.shape.getMaxPointSize();
    this.shape.scaleTo(s.newPos.width - n * 2, s.newPos.height - a * 2), this.shape.redraw(), h.emit(T.RESIZE_BOX_RESIZE, this.shape, s);
  }, this.onRotate = (s) => {
    const e = this.shape.getRootParent(!0);
    if (e) {
      h.emit(R.ROTATE_BOX_ROTATE, e.rotateBox, { angle: s.angle });
      return;
    }
    this.shape.rotateBy(s.angle), this.shape.redraw(), h.emit(R.ROTATE_BOX_ROTATE, this.shape, s);
  }, this.mousedown = (s) => {
    j(s), h.emit(r.SHAPE_MOUSE_DOWN, this.shape, l(s)), setTimeout(() => {
      h.emit(r.SHAPE_MOVE_START, this.shape, l(s, { pos: this.shape.getPosition(!0) }));
    }, 100);
  }, this.mousemove = (s) => {
    if (this.shape.draggedPoint || h.emit(r.SHAPE_MOUSE_MOVE, this.shape, l(s)), this.shape.draggedPoint) {
      h.emit(r.POINT_DRAG_MOVE, this.shape, { point: this.shape.draggedPoint }), this.shape.draggedPoint.mousemove(s);
      return;
    }
    if (!this.shape.options.canDragShape)
      return;
    const [e, i] = this.calcMovementOffset(s);
    if (e === null || i === null)
      return;
    const o = this.shape.getPosition(!0);
    this.shape.moveBy(e, i), this.shape.redraw();
    const n = this.shape.getPosition(!0);
    h.emit(r.SHAPE_MOVE, this.shape, l(s, { oldPos: o, newPos: n }));
  }, this.mouseenter = (s) => {
    h.emit(r.SHAPE_MOUSE_ENTER, this.shape, l(s));
  }, this.mouseover = (s) => {
    E.draggedShape !== this.shape && h.emit(r.SHAPE_MOUSE_OVER, this.shape, l(s));
  }, this.mouseout = (s) => {
    h.emit(r.SHAPE_MOUSE_OUT, this.shape, l(s));
  }, this.click = (s) => {
    h.emit(r.SHAPE_MOUSE_CLICK, this.shape, l(s));
  }, this.doubleclick = (s) => {
    h.emit(r.SHAPE_MOUSE_DOUBLE_CLICK, this.shape, l(s));
  }, this.calcMovementOffset = (s) => {
    this.shape.calcPosition();
    const e = this.shape.getPosition(!0);
    let i = s.movementX, o = s.movementY, n = s.clientX + window.scrollX, a = s.clientY + window.scrollY;
    const p = e.left + i, d = e.top + o, A = w(this.shape.root, !0), c = this.shape.getBounds();
    return p < c.left || p + e.width > c.right ? [null, null] : d < c.top || d + e.height > c.bottom ? [null, null] : (n < p + A.left && (i = n - (p + A.left)), a < d + A.top && (o = a - (d + A.top)), n > p + e.width + A.left && (i = n - (e.width + A.left + e.left)), a > d + e.height + A.right && (o = a - (e.height + A.top + e.top)), [i, o]);
  }, this.onPointAdded = (s) => {
    !this.shape.isShapePoint(s.target) || h.emit(r.POINT_ADDED, this.shape, { point: s.target });
  }, this.onPointDragMove = (s) => {
    this.shape.isShapePoint(s.target) && this.shape.redraw();
  }, this.onPointDestroyed = (s) => {
    !this.shape.isShapePoint(s.target) || (this.shape.points.splice(this.shape.points.indexOf(s.target), 1), this.shape.root.removeChild(s.target.element), this.shape.redraw(), h.emit(r.POINT_DESTROYED, this.shape, { point: s.target }));
  }, this.onPointDeleteRequest = (s) => {
    !this.shape.isShapePoint(s.target) || this.shape.deletePoint(s.target.x, s.target.y);
  }, this.addEventListener = (s, e) => {
    typeof this.subscriptions[s] > "u" && (this.subscriptions[s] = []);
    const i = h.subscribe(s, (o) => {
      o.target && o.target.guid === this.shape.guid && e(o);
    });
    return this.subscriptions[s].push(i), i;
  }, this.removeEventListener = (s, e) => {
    this.subscriptions[s] && typeof this.subscriptions[s] < "u" && this.subscriptions[s].splice(this.subscriptions[s].indexOf(e), 1), h.unsubscribe(s, e);
  }, this.destroy = () => {
    h.unsubscribe(g.POINT_ADDED, this.onPointAdded), h.unsubscribe(g.POINT_DRAG_MOVE, this.onPointDragMove), h.unsubscribe(g.POINT_DESTROYED, this.onPointDestroyed), h.unsubscribe(g.POINT_DELETE_REQUEST, this.onPointDeleteRequest), this.shape.resizeBox && (this.shape.resizeBox.removeEventListener(T.RESIZE_BOX_RESIZE, this.resizeBoxListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_CLICK, this.resizeClickEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_MOVE, this.resizeMouseMoveEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOVE_START, this.resizeMouseDownEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_UP, this.resizeMouseUpEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_DOUBLE_CLICK, this.resizeDblClickEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_OVER, this.resizeMouseOverEventListener), this.shape.resizeBox.removeEventListener(r.SHAPE_MOUSE_OUT, this.resizeMouseOutEventListener), this.shape.resizeBox.removeEventListener("contextmenu", this.resizeBoxContextMenuEventListener)), this.shape.rotateBox && (this.shape.rotateBox.removeEventListener(R.ROTATE_BOX_ROTATE, this.rotateBoxListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_CLICK, this.rotateClickEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_MOVE, this.rotateMouseMoveEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOVE_START, this.rotateMouseDownEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOVE_START, this.rotatePointDragStartEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOVE_START, this.rotatePointDragEndEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_UP, this.rotateMouseUpEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_DOUBLE_CLICK, this.rotateDblClickEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_OVER, this.rotateMouseOverEventListener), this.shape.rotateBox.removeEventListener(r.SHAPE_MOUSE_OUT, this.rotateMouseOutEventListener), this.shape.rotateBox.removeEventListener("contextmenu", this.rotateBoxContextMenuEventListener));
    for (let s in this.subscriptions)
      this.subscriptions[s].forEach((i) => h.unsubscribe(s, i)), this.subscriptions[s] = [];
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
  getShapeMouseEvents: () => Object.keys(r).filter((t) => ["SHAPE_CREATE", "SHAPE_DESTROY", "SHAPE_RESIZE", "SHAPE_ROTATE"].indexOf(t) === -1 && typeof r[t] != "function").map((t) => ({ key: t, name: r[t] }))
};
function It() {
  this.draw = (t) => {
    if (t.svg)
      try {
        t.eventListener.removeSvgEventListeners(), t.svg.innerHTML = "";
      } catch {
      }
    else
      t.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), t.svg.ondragstart = function() {
        return !1;
      }, t.eventListener.setSvgEventListeners(), t.root.appendChild(t.svg);
    if (t.points.length < 1)
      return;
    this.updateOptions(t);
    const s = this.drawPolygon(t);
    t.svg.appendChild(s);
  }, this.updateOptions = (t) => {
    if (!t.svg || typeof t.svg > "u")
      return;
    typeof t.options.visible < "u" && (t.svg.style.display = t.options.visible ? "" : "none"), t.calcPosition(), t.svg.id = t.options.id, t.svg.style.position = "absolute", t.svg.style.cursor = "default", t.svg.style.left = t.left, t.svg.style.top = t.top, t.svg.setAttribute("width", t.width), t.svg.setAttribute("height", t.height), this.setupShapeFill(t), this.setupSVGFilters(t), t.svg.style.zIndex = t.options.zIndex;
    const s = t.getRootParent(!0);
    this.updatePoints(t, s), this.redrawResizeBox(s || t), this.redrawRotateBox(s || t);
  }, this.updatePoints = (t, s) => {
    t.points.forEach((e) => {
      e.options.zIndex < t.options.zIndex + 2 && (e.options.zIndex = t.options.zIndex + 2), t.options.visible || (e.options.visible = !1), e.redraw(), t.options.displayMode === u.DEFAULT && !e.options.forceDisplay && ((!s || s && s.options.displayMode === u.DEFAULT) && (e.element.style.display = "none"), t.options.visible || (e.options.visible = !1));
    });
  }, this.drawPolygon = (t) => {
    let s = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    t.points.length > 2 && (s = document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
    const e = t.points.map((i) => "" + (i.x - t.left) + "," + (i.y - t.top)).join(" ");
    return s.setAttribute("points", e), this.setupPolygonStroke(t, s), this.setupPolygonFill(t, s), this.setupPolygonStyles(t, s), t.svg.querySelector("defs") && t.svg.querySelector("defs").querySelector("filter") && (s.style.filter = 'url("#' + t.guid + '_filter")'), s.style.zIndex = t.options.zIndex, s;
  }, this.redrawResizeBox = (t) => {
    if (!t.resizeBox)
      return;
    const s = t.getResizeBoxBounds();
    t.resizeBox.left = s.left, t.resizeBox.top = s.top, t.resizeBox.width = s.width, t.resizeBox.height = s.height, t.resizeBox.options.zIndex = t.options.zIndex + 1, t.resizeBox.redraw();
  }, this.redrawRotateBox = (t) => {
    if (!t.rotateBox)
      return;
    const s = t.getResizeBoxBounds();
    t.rotateBox.left = s.left, t.rotateBox.top = s.top, t.rotateBox.width = s.width, t.rotateBox.height = s.height, t.rotateBox.options.zIndex = t.options.zIndex + 1, t.rotateBox.redraw();
  }, this.setupShapeFill = (t) => {
    if (t.options.fillImage && typeof t.options.fillImage == "object") {
      const s = document.createElementNS(t.svg.namespaceURI, "defs"), e = this.createImageFill(t);
      e && s.appendChild(e), t.svg.appendChild(s);
    } else if (t.options.fillGradient && typeof t.options.fillGradient == "object" && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1) {
      const s = document.createElementNS(t.svg.namespaceURI, "defs"), e = this.createGradient(t);
      s.appendChild(e), t.svg.appendChild(s);
    }
  }, this.createGradient = (t) => {
    let s = document.createElementNS(t.svg.namespaceURI, "linearGradient");
    const e = t.options.fillGradient;
    e.type === "radial" && (s = document.createElementNS(t.svg.namespaceURI, "radialGradient")), s.id = t.guid + "_gradient";
    let i = !1;
    for (let o in e)
      if (o !== "type") {
        if (o === "steps") {
          i = !0;
          continue;
        }
        s.setAttribute(o, e[o]);
      }
    if (!i)
      return s;
    for (let o of e.steps) {
      const n = document.createElementNS(t.svg.namespaceURI, "stop");
      b(o.stopColor) && n.setAttribute("offset", o.offset), b(o.stopColor) && n.setAttribute("stop-color", o.stopColor), b(o.stopOpacity) && n.setAttribute("stop-opacity", o.stopOpacity), s.appendChild(n);
    }
    return s;
  }, this.createImageFill = (t) => {
    const s = t.options.fillImage;
    if (!s.href || !s.width || !s.height)
      return console.error("Image HREF, width and height must be specified for Image Fill"), null;
    const e = document.createElementNS(t.svg.namespaceURI, "pattern");
    e.setAttribute("id", t.guid + "_pattern"), e.setAttribute("patternUnits", "userSpaceOnUse");
    for (let o in s)
      o !== "href" && e.setAttribute(o, s[o]);
    const i = document.createElementNS(t.svg.namespaceURI, "image");
    return s.href && i.setAttribute("href", s.href), i.setAttribute("width", s.width), i.setAttribute("height", s.height), e.appendChild(i), e;
  }, this.setupSVGFilters = (t) => {
    if (t.options.filters && typeof t.options.filters == "object" && Object.keys(t.options.filters).length) {
      let s = t.svg.querySelector("defs");
      s || (s = document.createElementNS(t.svg.namespaceURI, "defs"), t.svg.appendChild(s));
      const e = this.createSVGFilters(t);
      s.append(e);
    }
  }, this.createSVGFilters = (t) => {
    const s = document.createElementNS(t.svg.namespaceURI, "filter");
    s.setAttribute("id", t.guid + "_filter");
    for (let e in t.options.filters) {
      const i = this.createSVGFilter(t, e, t.options.filters[e]);
      s.appendChild(i);
    }
    return s;
  }, this.createSVGFilter = (t, s, e) => {
    const i = document.createElementNS(t.svg.namespaceURI, s);
    for (let o in e)
      i.setAttribute(o, e[o].toString()), o === "dx" && t.svg.setAttribute("width", (t.width + parseInt(e.dx) * 2).toString()), o === "dy" && t.svg.setAttribute("height", (t.height + parseInt(e.dy) * 2).toString());
    return i;
  }, this.setupPolygonStroke = (t, s) => {
    b(t.options.stroke) && s.setAttribute("stroke", t.options.stroke), b(t.options.strokeWidth) && s.setAttribute("stroke-width", t.options.strokeWidth), b(t.options.strokeLinecap) && s.setAttribute("stroke-linecap", t.options.strokeLinecap), b(t.options.strokeDasharray) && s.setAttribute("stroke-dasharray", t.options.strokeDasharray);
  }, this.setupPolygonFill = (t, s) => {
    t.options.fillImage && typeof t.options.fillImage == "object" ? s.setAttribute("fill", 'url("#' + t.guid + '_pattern")') : t.options.fillGradient && typeof t.options.fillGradient == "object" && ["linear", "radial"].indexOf(t.options.fillGradient.type) !== -1 ? s.setAttribute("fill", 'url("#' + t.guid + '_gradient")') : t.options.fill && s.setAttribute("fill", t.options.fill), b(t.options.fillOpacity) && s.setAttribute("fill-opacity", t.options.fillOpacity);
  }, this.setupPolygonStyles = (t, s) => {
    if (t.options.classes && s.setAttribute("class", t.options.classes), !(!b(t.options.style) || typeof t.options.style != "object"))
      for (let e in t.options.style)
        e === "fill" && this.checkFillAttributes(t) || e === "stroke" && t.options.stroke || (s.style[e] = t.options.style[e]);
  }, this.checkFillAttributes = (t) => t.options.fillImage && typeof t.options.fillImage == "object" || t.options.fillGradient && typeof t.options.fillGradient == "object" || t.options.fill !== "none" && t.options.fill, this.toSvg = (t, s = null) => {
    const e = document.createElement("div"), i = this.getSvg(t, s);
    return e.appendChild(i), '<?xml version="1.0" encoding="UTF-8"?>' + e.innerHTML.replace(/&quot;/g, "'");
  }, this.getSvg = (t, s) => {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "svg"), i = t.getPosition(s === null ? t.options.groupChildShapes : s);
    e.appendChild(this.getSvgDefs(t, s)), t.svg || this.draw(t), this.addSvgPolygons(t, e, s), e.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const o = "0 0 " + i.width + " " + i.height;
    return e.setAttribute("viewBox", o), e;
  }, this.getSvgDefs = (t, s = null) => {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    if (t.svg) {
      const i = t.svg.querySelector("defs");
      i && (e.innerHTML = i.innerHTML);
    }
    return (s === !0 || t.options.groupChildShapes && s !== !1) && t.getChildren(!0).forEach((i) => {
      const o = i.svg.querySelector("defs");
      o && (e.innerHTML += o.innerHTML);
    }), e;
  }, this.addSvgPolygons = (t, s, e) => {
    const i = t.getPosition(t.options.groupChildShapes), o = [];
    if (t.svg) {
      let n = t.svg.querySelector("polygon");
      if (n) {
        n = n.cloneNode();
        const a = t.points.map(
          (p) => "" + (p.x - i.left) + "," + (p.y - i.top)
        ).join(" ");
        n.setAttribute("points", a), o.push({ polygon: n, zIndex: t.options.zIndex });
      }
    }
    if ((e === !0 || t.options.groupChildShapes && e !== !1) && t.getChildren(!0).forEach((n) => {
      let a = n.svg.querySelector("polygon");
      if (a) {
        a = a.cloneNode();
        const p = n.points.map(
          (d) => "" + (d.x - i.left) + "," + (d.y - i.top)
        ).join(" ");
        a.setAttribute("points", p), o.push({ polygon: a, zIndex: n.options.zIndex });
      }
    }), !!o.length) {
      o.sort((n, a) => n.zIndex - a.zIndex);
      for (let n of o)
        s.appendChild(n.polygon);
    }
  }, this.toPng = (t, s = U.DATAURL, e = null, i = null, o = null) => new Promise(async (n) => {
    t.calcPosition();
    const a = t.getPosition(o || t.options.groupChildShapes);
    [e, i] = G(e, i, a.width, a.height), t.scaleTo(e, i, o);
    const p = this.getSvg(t, o);
    for (let m of p.querySelectorAll("image"))
      if (m.getAttribute("href") && m.getAttribute("href").length) {
        const M = await H(await (await fetch(m.getAttribute("href"))).blob());
        m.setAttribute("href", M);
      }
    const d = document.createElement("div");
    d.appendChild(p);
    const A = d.innerHTML;
    t.scaleTo(a.width, a.height, o);
    const c = new Image(), x = new Blob([A], { type: "image/svg+xml" }), D = window.URL || window.webkitURL || window, _ = await H(x);
    c.addEventListener("load", () => {
      const m = document.createElement("canvas");
      c.width = e, c.height = i, m.width = c.width, m.height = c.height, m.getContext("2d").drawImage(c, 0, 0), D.revokeObjectURL(_);
      const k = m.toDataURL("image/png");
      if (s === U.BLOB) {
        n($(k));
        return;
      }
      n(k);
    }), c.src = _;
  });
}
const U = {
  DATAURL: "dataurl",
  BLOB: "blob"
}, v = new It();
function Rt() {
  this.shapes = [], this.activeShape = null, this.draggedShape = null, this.shapeOnCursor = null, this.containerEventListeners = [], this.init = () => (this.setEventListeners(), this), this.setEventListeners = () => {
    h.subscribe(r.SHAPE_CREATE, this.onShapeCreated), h.subscribe(r.SHAPE_DESTROY, this.onShapeDestroy), h.subscribe(r.SHAPE_MOVE_START, this.onShapeMoveStart), h.subscribe(r.SHAPE_MOUSE_ENTER, this.onShapeMouseEnter), h.subscribe(g.POINT_DRAG_START, this.onPointDragStart), h.subscribe(g.POINT_DRAG_END, this.onPointDragEnd), window.addEventListener("resize", this.onWindowResize);
  }, this.onWindowResize = (t) => {
    this.shapes.forEach((s) => {
      h.emit(
        N.CONTAINER_BOUNDS_CHANGED,
        s,
        { bounds: s.getBounds(), points: s.points }
      );
    });
  }, this.createShape = (t, s, e) => new y().init(t, s, e), this.onShapeCreated = (t) => {
    const s = t.target;
    b(s.root) && !this.getShape(s) && (this.shapes.push(s), this.activeShape || (this.activeShape = s), this.getShapesByContainer(s.root).length === 1 && this.addContainerEvents(s));
  }, this.onShapeDestroy = (t) => {
    const s = t.target, e = s.root;
    !b(s.root) || !this.getShape(s) || (this.shapes.splice(this.shapes.indexOf(s), 1), this.getShapesByContainer(e).length === 0 && this.containerEventListeners.filter((i) => i.container === e).forEach((i) => {
      i.container.removeEventListener(i.name, i.listener), this.containerEventListeners.splice(this.containerEventListeners.indexOf(i), 1);
    }));
  }, this.onShapeMoveStart = (t) => {
    if (!this.getShapeByGuid(t.target.guid) || !t.target.options.managed)
      return;
    const s = t.target.getRootParent(!0);
    s && s.options.groupChildShapes ? (this.activateShape(s), this.draggedShape = s) : (this.activateShape(t.target), this.draggedShape = t.target);
  }, this.onShapeMouseEnter = (t) => {
    !this.draggedShape || t.buttons !== 1 && (this.draggedShape.draggedPoint = null, this.draggedShape = null);
  }, this.onPointDragStart = (t) => {
    const s = this.findShapeByPoint(t.target);
    if (s) {
      this.draggedShape = s;
      const e = s.getRootParent(!0);
      e && e.options.groupChildShapes && (this.draggedShape = e), this.draggedShape.draggedPoint = t.target, h.emit(r.POINT_DRAG_START, s, { point: t.target });
    }
  }, this.onPointDragEnd = (t) => {
    this.draggedShape && (this.draggedShape.draggedPoint = null), this.draggedShape = null;
  }, this.findShapeByPoint = (t) => {
    for (let s of this.shapes)
      if (s.isShapePoint(t))
        return s;
    return null;
  }, this.getShape = (t) => this.getShapeByGuid(t.guid), this.getShapeByGuid = (t) => this.shapes.find((s) => s.guid === t), this.getShapesByContainer = (t) => this.getShapes().filter((s) => s.root === t), this.getMaxZIndex = (t = null) => {
    let s = this.getShapes();
    return t && (s = this.getShapesByContainer(t)), s.length ? s.map((e) => e.options.zIndex || 0).reduce((e, i) => i > e ? i : e) : 0;
  }, this.getShapes = () => this.shapes.filter((t) => t.options.id.search("_resizebox") === -1 && t.options.id.search("_rotatebox") === -1), this.activateShape = (t, s = null) => {
    if (this.activeShape === t) {
      this.activeShape.switchDisplayMode(s);
      return;
    }
    if (typeof t.id < "u" && (t.id.search("_resizebox") !== -1 || t.id.search("_rotatebox") !== -1))
      return;
    this.activeShape && this.deactivateShape(this.activeShape);
    const i = this.getMaxZIndex(t.root) + 1 - t.options.zIndex;
    t.options.prevZIndex = t.options.zIndex, t.options.zIndex += i, v.updateOptions(t), t.options.groupChildShapes && t.getChildren(!0).forEach((o) => {
      o.options.prevZIndex = o.options.zIndex, o.options.zIndex += i, v.updateOptions(o);
    }), this.activeShape = t, h.emit(r.SHAPE_ACTIVATED, this.activeShape), this.activeShape.switchDisplayMode(s);
  }, this.deactivateShape = (t) => {
    typeof t.options.prevZIndex < "u" && v.updateOptions(t), t.options.displayMode !== u.DEFAULT && t.switchDisplayMode(u.DEFAULT), t.getChildren(!0).forEach((s) => {
      typeof s.options.prevZIndex < "u" && (v.updateOptions(s), s.options.displayMode !== u.DEFAULT && s.switchDisplayMode(u.DEFAULT));
    });
  }, this.addContainerEvents = (t) => {
    this.addContainerEvent(t.root, "mousemove", this.mousemove), this.addContainerEvent(t.root, "mouseup", this.mouseup, t.options.id), this.addContainerEvent(t.root, "dblclick", this.doubleclick), h.emit(Tt.MANAGER_ADD_CONTAINER_EVENT_LISTENERS, t.root);
  }, this.addContainerEvent = (t, s, e) => {
    this.containerEventListeners.find((i) => i.container === t && i.name === s) || (t.addEventListener(s, e), this.containerEventListeners.push({ id: t.id, container: t, name: s, listener: e }));
  }, this.doubleclick = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.doubleclick(l(t, { target: this.shapeOnCursor }));
    try {
      t.stopPropagation();
    } catch {
    }
    if (!!this.activeShape && !(!this.activeShape.options.canAddPoints || this.activeShape.draggedPoint || this.activeShape.points.length > 2) && (this.activeShape.options.maxPoints === -1 || this.activeShape.points.length < this.activeShape.options.maxPoints)) {
      this.activeShape.options.displayMode === u.DEFAULT && this.activeShape.switchDisplayMode(u.SELECTED);
      const [s, e] = F(l(t, { target: this.activeShape }));
      this.activeShape.addPoint(s, e, { forceDisplay: !1 });
    }
  }, this.mousedown = (t) => {
    if (this.shapeOnCursor && t.buttons !== 2) {
      const s = this.shapeOnCursor.getRootParent(!0);
      s && s.options.groupChildShapes && (this.shapeOnCursor = s), this.draggedShape = this.shapeOnCursor, this.shapeOnCursor.eventListener.mousedown(l(t, { target: this.shapeOnCursor }));
    }
  }, this.mouseup = (t) => {
    if (!this.draggedShape)
      return;
    const s = this.draggedShape;
    t.buttons === 1 && s.options.canAddPoints && !s.draggedPoint && (s.options.maxPoints === -1 || s.points.length < s.options.maxPoints) && s.addPoint(
      t.clientX - s.root.offsetLeft,
      t.clientY - s.root.offsetTop
    ), s.draggedPoint ? (h.emit(r.POINT_DRAG_END, this.draggedShape, { point: s.draggedPoint }), s.draggedPoint.mouseup(t), s.draggedPoint = null) : h.emit(r.SHAPE_MOUSE_UP, s, {}), this.draggedShape = null, h.emit(r.SHAPE_MOVE_END, s, { pos: s.getPosition(!0) });
  }, this.mousemove = (t) => {
    if (t.buttons !== 1 && (this.draggedShape = null), this.draggedShape) {
      if (t.buttons !== 1) {
        this.draggedShape.draggedPoint = null, this.draggedShape = null;
        return;
      }
      this.draggedShape.eventListener.mousemove(t);
    } else
      this.processShapesUnderCursor(t);
  }, this.mouseover = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseover(l(t, { target: this.shapeOnCursor }));
  }, this.mouseenter = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseenter(l(t, { target: this.shapeOnCursor }));
  }, this.mouseout = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.mouseout(l(t, { target: t.target }));
  }, this.click = (t) => {
    this.shapeOnCursor && this.shapeOnCursor.eventListener.click(l(t, { target: this.shapeOnCursor }));
  }, this.processShapesUnderCursor = (t) => {
    const [s, e] = [t.clientX, t.clientY], i = this.getShapeOnCursor(s, e);
    this.shapeOnCursor && this.shapeOnCursor !== i && this.shapeOnCursor.svg && (this.shapeOnCursor.svg.style.cursor = "default", this.shapeOnCursor.eventListener.mouseout(l(t, { target: this.shapeOnCursor }))), i && i !== this.shapeOnCursor && i.eventListener.mouseover(l(t, { target: i })), this.shapeOnCursor = i, this.shapeOnCursor && (h.emit(r.SHAPE_MOUSE_MOVE, this.shapeOnCursor, l(t)), this.shapeOnCursor.svg.style.cursor = "crosshair");
  }, this.getShapeOnCursor = (t, s) => {
    const e = this.shapes.filter((i) => i.belongsToShape(t, s) && i.options.id.search("_resizebox") === -1 && i.options.id.search("_rotatebox") === -1);
    return e.length ? e.reduce((i, o) => o.options.zIndex >= i.options.zIndex ? o : i) : null;
  }, this.toJSON = (t = null) => (t || (t = this.shapes), t = t.filter((s) => s.options.id.search("_resizebox") === -1 && s.options.id.search("_rotatabox") === -1 && !s.getParent()), JSON.stringify(t.map((s) => s.getJSON()), null, 4)), this.fromJSON = (t, s) => {
    let e = s;
    if (typeof e == "string" && (e = z(s)), !e)
      return null;
    const i = [];
    for (let o of e)
      o.options.id && this.findShapeById(o.options.id) || i.push(new y().fromJSON(t, o));
    return i;
  }, this.findShapesByOptionValue = (t, s) => this.shapes.filter((e) => e.options[t] === s), this.findShapeById = (t) => {
    const s = this.findShapesByOptionValue("id", t);
    return s && s.length ? s[0] : null;
  }, this.clear = () => {
    for (this.containerEventListeners.forEach(({ container: t, name: s, listener: e }) => {
      try {
        t.removeEventListener(s, e);
      } catch (i) {
        console.error(i);
      }
    }), this.containerEventListeners = []; this.shapes.length; )
      this.shapes[0].destroy();
  };
}
const Tt = {
  MANAGER_ADD_CONTAINER_EVENT_LISTENERS: "manager_add_container_event_listeners",
  MANAGER_REMOVE_CONTAINER_EVENT_LISTENERS: "manager_remove_container_event_listeners"
}, N = {
  CONTAINER_BOUNDS_CHANGED: "CONTAINER_BOUNDS_CHANGED"
}, E = new Rt().init();
function wt(t) {
  this.shape = t, this.children = [], this.parent = {}, this.init = () => {
    for (let s in this)
      typeof this[s] != "function" || s === "init" || (typeof this.shape[s] == "function" && (this.parent[s] = this.shape[s]), this.shape[s] = this[s]);
    return this;
  }, this.addChild = (s) => {
    !this.shouldAddChild(s) || (this.children.push(s), h.emit(r.SHAPE_ADD_CHILD, this.shape, { child: s }));
  }, this.removeChild = (s) => {
    this.children.splice(this.children.indexOf(s), 1), h.emit(r.SHAPE_REMOVE_CHILD, this.shape, { child: s });
  }, this.removeAllChildren = (s) => {
    for (; this.getChildren(s).length; )
      this.removeChild(this.getChildren(s)[0]);
  }, this.getChildren = (s = !1) => {
    if (!s)
      return this.children;
    const e = [];
    e.push(...this.children);
    for (let i of e)
      e.push(...i.getChildren());
    return e;
  }, this.shouldAddChild = (s) => !s || typeof s != "object" || typeof s.getChildren > "u" || this.children.indexOf(s) !== -1 ? !1 : s === this.shape ? void 0 : s.getChildren().indexOf(this.shape) !== -1 || s.getParent() ? !1 : this.getParentsList().indexOf(s) === -1, this.getParent = () => {
    const s = E.shapes;
    for (let e of s)
      if (e.getChildren().indexOf(this.shape) !== -1)
        return e;
    return null;
  }, this.getRootParent = (s = null) => {
    let e = this.getParentsList();
    return e.length ? (s !== null && (e = e.filter((i) => i.options.groupChildShapes === s)), e[e.length - 1]) : null;
  }, this.getParentsList = (s = []) => {
    const e = this.getParent();
    return e == null ? s : (s.push(e), e.getParentsList(s));
  }, this.getPosition = (s = !1) => {
    const e = this.parent.getPosition();
    if (!s)
      return e;
    let i = this.getChildren(!0);
    return i.push(this.shape), i = i.filter((o) => o.points.length), i.length && (e.left = i.map((o) => o.left).reduce((o, n) => n < o ? n : o), e.top = i.map((o) => o.top).reduce((o, n) => n < o ? n : o), e.right = i.map((o) => o.right).reduce((o, n) => n > o ? n : o), e.bottom = i.map((o) => o.bottom).reduce((o, n) => n > o ? n : o), e.width = e.right - e.left || 1, e.height = e.bottom - e.top || 1), e;
  };
}
function Q() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = L(), this.options = {
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
  }, this.eventListener = null, this.left_top = null, this.left_bottom = null, this.right_top = null, this.right_bottom = null, this.init = (t, s, e, i, o, n = {}) => (this.left = parseInt(s), this.top = parseInt(e), this.width = parseInt(i), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new y().init(t, Object.assign({}, this.options.shapeOptions), []), h.emit(r.SHAPE_CREATE, this.shape, {}), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new _t(this).run(), this.redraw(), h.emit(r.SHAPE_CREATE, this, {}), this), this.setOptions = (t = {}) => {
    !t || typeof t != "object" || (t.shapeOptions && typeof t.shapeOptions == "object" ? (t.shapeOptions.pointOptions && typeof t.shapeOptions.pointOptions == "object" ? t.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions, t.shapeOptions.pointOptions) : t.shapeOptions.pointOptions = Object.assign({}, this.options.shapeOptions.pointOptions), t.shapeOptions = Object.assign(this.options.shapeOptions, t.shapeOptions)) : t.shapeOptions = Object.assign({}, this.options.shapeOptions), t.shapeOptions.zIndex = t.zIndex || this.options.zIndex, t.shapeOptions.id = t.id ? t.id : this.options.id, Object.assign(this.options, t), this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + ht + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + rt + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + at + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + pt + "')" } });
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
  }, this.addEventListener = (t, s) => this.eventListener.addEventListener(t, s), this.removeEventListener = (t, s) => {
    this.eventListener.removeEventListener(t, s);
  };
}
function Lt(t) {
  this.shape = t, this.contextMenu = null, this.updateContextMenu = () => {
    this.shape.options.hasContextMenu && !this.contextMenu && this.init(), this.shape.contextMenu = this.contextMenu;
  }, this.init = () => {
    t.svg && (this.contextMenu = V.create([
      { id: "i" + t.guid + "_clone", title: "Clone", image: Ot },
      { id: "i" + t.guid + "_export_json", title: "Export to JSON", image: bt },
      { id: "i" + t.guid + "_export_svg", title: "Export to SVG", image: xt },
      { id: "i" + t.guid + "_export_png", title: "Export to PNG", image: St },
      { id: "i" + t.guid + "_destroy", title: "Destroy", image: Y }
    ], t.svg), t.options.canAddPoints && this.contextMenu.addItem("i" + t.guid + "_add_point", "Add Point", mt), this.displayGroupItems(), this.setEventListeners());
  }, this.setEventListeners = () => {
    this.setOnItemClickListener(), this.contextMenu.on("show", () => {
      this.displayGroupItems();
    });
  }, this.setOnItemClickListener = () => {
    let s, e;
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
          e = this.shape.getRootParent(), s = e || this.shape, s.setOptions({ groupChildShapes: !0 }), s.switchDisplayMode(u.DEFAULT);
          break;
        case "i" + this.shape.guid + "_ungroup":
          e = this.shape.getRootParent(), s = e || this.shape, s.setOptions({ groupChildShapes: !1 }), s.switchDisplayMode(u.DEFAULT);
          break;
      }
    });
  }, this.displayGroupItems = () => {
    let s = this.shape.getRootParent() ? this.shape.getRootParent() : this.shape;
    if (!s.getChildren().length) {
      this.contextMenu.removeItem("i" + this.shape.guid + "_group"), this.contextMenu.removeItem("i" + this.shape.guid + "_ungroup");
      return;
    }
    s.options.groupChildShapes ? this.contextMenu.items.find((e) => e.id === "i" + this.shape.guid + "_ungroup") || (this.contextMenu.addItem("i" + this.shape.guid + "_ungroup", "Ungroup", yt), this.contextMenu.removeItem("i" + this.shape.guid + "_group")) : this.contextMenu.items.find((e) => e.id === "i" + this.shape.guid + "_group") || (this.contextMenu.removeItem("i" + this.shape.guid + "_ungroup"), this.contextMenu.addItem("i" + this.shape.guid + "_group", "Group", vt));
  }, this.onAddPointClick = (s) => {
    if (this.shape.options.maxPoints !== -1 && this.shape.points.length >= this.shape.options.maxPoints)
      return;
    const [e, i] = W(this.shape.root, s.cursorX, s.cursorY);
    this.shape.addPoint(e, i), this.shape.options.displayMode === u.DEFAULT && this.shape.switchDisplayMode(u.SELECTED);
  }, this.onCloneClick = (s) => {
    const e = this.shape.clone(), i = e.getPosition(!0);
    e.moveTo(i.left + 5, i.top + 5), SmartShapeManager.activateShape(e);
  }, this.onExportJsonClick = (s) => {
    const i = this.shape.getRootParent() || this.shape, o = i.toJSON(i.options.groupChildShapes), n = new Blob([o]);
    this.saveToFile(n, this.getExportFileName("json"));
  }, this.onExportSvgClick = (s) => {
    const o = (this.shape.getRootParent() || this.shape).toSvg(), n = new Blob([o]);
    this.saveToFile(n, this.getExportFileName("svg"));
  }, this.onExportPngClick = async (s) => {
    const o = await (this.shape.getRootParent() || this.shape).toPng(U.BLOB);
    this.saveToFile(o, this.getExportFileName("png"));
  }, this.saveToFile = (s, e) => {
    const i = window.URL.createObjectURL(s), o = document.createElement("a");
    o.download = e, o.href = i, document.body.appendChild(o), o.click(), document.body.removeChild(o), window.URL.revokeObjectURL(i);
  }, this.getExportFileName = (s) => {
    const i = this.shape.getRootParent() || this.shape;
    return (i.options.id ? i.options.id : "shape") + "." + s;
  }, this.removeMenuEventListeners = () => {
    this.contextMenu.removeEventListener("show", this.onShowListener);
  }, this.destroyContextMenu = () => {
    this.removeMenuEventListeners(), this.contextMenu.destroy();
  };
}
function y() {
  this.root = null, this.points = [], this.svg = null, this.groupHelper = null, this.eventListener = new Pt(this), this.options = {
    id: "",
    name: "Unnamed shape",
    maxPoints: -1,
    stroke: "",
    strokeWidth: "",
    strokeLinecap: "",
    strokeDasharray: "",
    fill: "",
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
    style: {
      "stroke-width": 2,
      stroke: "black",
      fill: "none"
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
    groupChildShapes: !0
  }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.guid = L(), this.resizeBox = null, this.rotateBox = null, this.initCenter = null, this.init = (t, s = null, e = null) => {
    if (!t) {
      console.error("Root HTML node not specified. Could not create shape.");
      return;
    }
    if (E.getShape(this)) {
      console.error("This shape already initialized");
      return;
    }
    return this.root = t, this.root.style.position = "relative", Object.assign(this, new Lt(this)), this.setOptions(s), this.groupHelper = new wt(this).init(), e && e.length && (this.setupPoints(e, Object.assign({}, this.options.pointOptions)), this.redraw()), this.eventListener.run(), typeof this.updateContextMenu == "function" && this.updateContextMenu(), this.applyDisplayMode(), (e && e.length || this.options.forceCreateEvent) && h.emit(r.SHAPE_CREATE, this, {}), this;
  }, this.setOptions = (t) => {
    !t || typeof t != "object" || (t.pointOptions = B(this.options.pointOptions, t.pointOptions), t.style = B(this.options.style, t.style), t.bounds = B(this.options.bounds, t.bounds), b(t.visible) && t.visible !== this.options.visible && (this.points.forEach((s) => s.options.visible = t.visible), this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: t.visible } }), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: t.visible } })), this.options = B(this.options, t), this.points.forEach((s) => {
      s.setOptions(B({}, this.options.pointOptions)), s.options.bounds = this.getBounds(), s.options.zIndex <= this.options.zIndex && (s.options.zIndex = this.options.zIndex + 1), s.redraw();
    }), typeof this.updateContextMenu == "function" && this.updateContextMenu());
  }, this.setupPoints = (t, s) => {
    this.points = [], this.addPoints(t, Object.assign({}, s));
  }, this.addPoint = (t, s, e = null) => {
    const i = this.putPoint(t, s, Object.assign({}, e));
    return this.redraw(), this.options.hasContextMenu && !this.contextMenu && this.updateContextMenu(), i;
  }, this.addPoints = (t, s = null) => {
    !t || typeof t != "object" || (t.forEach(
      (e) => this.putPoint(e[0] + this.options.offsetX, e[1] + this.options.offsetY, Object.assign({}, s))
    ), this.options.hasContextMenu && !this.contextMenu && this.updateContextMenu());
  }, this.putPoint = (t, s, e = null) => {
    if (this.findPoint(t, s))
      return null;
    !e || !Object.keys(e).length ? e = Object.assign({}, this.options.pointOptions) || {} : e = B(Object.assign({}, this.options.pointOptions), e), e.bounds = this.getBounds(), e.zIndex = this.options.zIndex + 1;
    const i = new Ct();
    return this.points.push(i), i.init(t, s, e), this.root.appendChild(i.element), i;
  }, this.deleteAllPoints = () => {
    for (; this.points.length; )
      this.points[0].destroy();
  }, this.deletePoint = (t, s) => {
    if (this.points.length - 1 < this.options.minPoints)
      return;
    const e = this.findPoint(t, s);
    e && e.destroy();
  }, this.findPoint = (t, s) => {
    const e = this.points.find((i) => i.x === t && i.y === s);
    return typeof e > "u" || !e ? null : e;
  }, this.findPointById = (t) => {
    const s = this.points.find((e) => e.options.id === t);
    return typeof s > "u" || !s ? null : s;
  }, this.getPointsArray = () => {
    let t = [];
    return this.points && typeof this.points == "object" && this.points.length && (t = this.points.map((s) => [s.x, s.y])), t;
  }, this.moveTo = (t, s, e = !0) => {
    const i = this.getBounds(), o = this.getPosition(!0);
    let n = t + o.width > i.right ? i.right - o.width : t, a = s + o.height > i.bottom ? i.bottom - o.height : s;
    this.moveBy(n - o.left, a - o.top, e), this.calcPosition();
  }, this.moveBy = (t, s, e = !0) => {
    for (let o in this.points)
      this.points[o].x += t, this.points[o].y += s, e && this.points[o].redraw();
    this.calcPosition();
    const i = this.getChildren();
    e && this.redraw(), i.length && this.options.groupChildShapes && i.forEach((o) => {
      o.moveBy(t, s, e);
    });
  }, this.scaleTo = (t = null, s = null, e = null) => {
    const i = this.getBounds();
    if (this.calcPosition(), !t && !s)
      return null;
    const o = this.getPosition(e || this.options.groupChildShapes);
    if (o.width === t && o.height === s)
      return;
    [t, s] = this.applyScaleRestriction(...G(t, s, o.width, o.height)), o.width >= 10 && t < 10 && (t = 10), o.height >= 10 && s < 10 && (s = 10);
    let n = o.left + t > i.right && i.right !== -1 ? i.right - o.left : t, a = o.top + s > i.bottom && i.bottom !== -1 ? i.bottom - o.top : s, p = n / o.width, d = a / o.height;
    this.points.forEach(
      (A) => {
        A.x = (A.x - o.left) * p + o.left, A.y = (A.y - o.top) * d + o.top;
      }
    ), (this.options.groupChildShapes || e) && (this.getChildren(!0).forEach((A) => {
      A.points.forEach(
        (c) => {
          c.x = (c.x - o.left) * p + o.left, c.y = (c.y - o.top) * d + o.top;
        }
      ), A.calcPosition();
    }), this.getChildren(!0).forEach((A) => A.redraw())), this.calcPosition();
  }, this.applyScaleRestriction = (t, s) => (this.options.minWidth !== -1 && t < this.options.minWidth && (t = this.options.minWidth), this.options.minWidth !== -1 && s < this.options.minHeight && (s = this.options.minHeight), this.options.minWidth !== -1 && t > this.options.maxWidth && (t = this.options.maxWidth), this.options.minWidth !== -1 && s > this.options.maxHeight && (s = this.options.maxHeight), [t, s]), this.rotateBy = (t, s = null, e = null, i = !1) => {
    this.calcPosition();
    const o = this.getPosition(!0);
    let [n, a] = this.getCenter(this.options.groupChildShapes);
    const p = this.getRootParent(!0);
    p && p.options.groupChildShapes && ([n, a] = p.getCenter(p.options.groupChildShapes)), s || (s = n), e || (e = a), this.initCenter && ([s, e] = this.initCenter), !(i && (!this.isInBounds(...I(t, o.left, o.top, s, e)) || !this.isInBounds(...I(t, o.right, o.top, s, e)) || !this.isInBounds(...I(t, o.left, o.bottom, s, e)) || !this.isInBounds(...I(t, o.right, o.bottom, s, e)))) && (this.points.forEach((d) => d.rotateBy(t, s, e)), this.options.groupChildShapes && this.getChildren(!0).forEach((d) => {
      d.points.forEach((A) => A.rotateBy(t, s, e)), d.redraw();
    }));
  }, this.isInBounds = (t, s) => {
    const [e, i] = this.getMaxPointSize(), o = this.getBounds();
    return t >= o.left + e / 2 && t <= o.right - e / 2 && s >= o.top + i / 2 && s <= o.bottom - i / 2;
  }, this.redraw = () => {
    this.applyDisplayMode(), v.draw(this);
  }, this.applyDisplayMode = () => {
    this.options.displayMode === u.SCALE && this.options.canScale ? (this.rotateBox && this.rotateBox.hide(), !this.resizeBox && this.setupResizeBox(), this.resizeBox && this.resizeBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : this.options.displayMode === u.ROTATE && this.options.canRotate ? (this.resizeBox && this.resizeBox.hide(), !this.rotateBox && this.setupRotateBox(), this.rotateBox && this.rotateBox.setOptions({ shapeOptions: { visible: this.options.visible } })) : (this.resizeBox && this.resizeBox.hide(), this.rotateBox && this.rotateBox.hide()), this.points.forEach((t) => {
      t.setOptions({ zIndex: this.options.zIndex + 1 }), t.element.style.zIndex = t.options.zIndex, this.options.displayMode === u.DEFAULT && !t.options.forceDisplay && (t.element.style.display = "none");
    }), this.options.displayMode !== "DEFAULT" && this.options.groupChildShapes && this.getChildren(!0).forEach((t) => {
      t.points.forEach((s) => {
        s.element.style.display = "";
      });
    });
  }, this.switchDisplayMode = (t = null) => {
    t || (t = this.getNextDisplayMode()), (t === u.SCALE && !this.options.canScale || t === u.ROTATE && !this.options.canRotate || t === u.SELECTED && this.points.length && !this.points.filter((s) => s.options.canDrag).length) && (t = u.DEFAULT), this.options.displayMode = t, this.redraw(), t === u.DEFAULT && this.getChildren(!0).forEach((s) => s.switchDisplayMode(t));
  }, this.getNextDisplayMode = () => {
    let t;
    return this.options.displayMode === u.DEFAULT ? t = u.SELECTED : this.options.displayMode === u.SELECTED ? t = u.SCALE : this.options.displayMode === u.SCALE ? t = u.ROTATE : t = u.DEFAULT, t === u.SELECTED && !this.points.filter((s) => s.options.canDrag).length && (t = u.SCALE), t === u.SCALE && !this.options.canScale && (t = u.ROTATE), t === u.ROTATE && !this.options.canRotate && (t = u.DEFAULT), t;
  }, this.calcPosition = () => {
    !this.points.length || (this.left = this.points.map((t) => t.x).reduce((t, s) => s < t ? s : t), this.top = this.points.map((t) => t.y).reduce((t, s) => s < t ? s : t), this.right = this.points.map((t) => t.x).reduce((t, s) => s > t ? s : t), this.bottom = this.points.map((t) => t.y).reduce((t, s) => s > t ? s : t), this.width = parseInt(this.right - this.left) || 1, this.height = parseInt(this.bottom - this.top) || 1);
  }, this.getPosition = () => ({ top: this.top, left: this.left, bottom: this.bottom, right: this.right, width: parseInt(this.width), height: parseInt(this.height) }), this.getBounds = () => ({
    left: this.options.bounds.left !== -1 ? this.options.bounds.left : this.root.style.display === "none" ? -1 : this.root.clientLeft,
    top: this.options.bounds.top !== -1 ? this.options.bounds.top : this.root.style.display === "none" ? -1 : this.root.clientTop,
    right: this.options.bounds.right !== -1 ? this.options.bounds.right : this.root.style.display === "none" ? -1 : this.root.clientLeft + this.root.clientWidth,
    bottom: this.options.bounds.bottom !== -1 ? this.options.bounds.bottom : this.root.style.display === "none" ? -1 : this.root.clientTop + this.root.clientHeight
  }), this.isShapePoint = (t) => !!this.points.find((s) => s === t), this.belongsToShape = (t, s, e = !0) => {
    if (this.findPoint(t, s))
      return !0;
    let i = this.getPointsArray();
    return e && (i = i.map((o) => [o[0] + w(this.root).left, o[1] + w(this.root).top])), q(i, [t, s]);
  }, this.addEventListener = (t, s) => this.eventListener.addEventListener(t, s), this.removeEventListener = (t, s) => {
    this.eventListener.removeEventListener(t, s);
  }, this.show = () => {
    this.setOptions({ visible: !0 }), this.redraw();
  }, this.hide = () => {
    this.setOptions({ visible: !1 }), this.redraw();
  }, this.destroy = () => {
    for (; this.points.length > 0; )
      this.points[0].destroy();
    if (h.emit(r.SHAPE_DESTROY, this, {}), this.eventListener && this.eventListener.destroy(), this.resizeBox && this.resizeBox.destroy(), this.rotateBox && this.rotateBox.destroy(), this.root && this.svg)
      try {
        this.root.removeChild(this.svg);
      } catch (s) {
        console.error(s);
      }
    this.options.groupChildShapes && this.getChildren(!0).forEach((s) => {
      s.destroy();
    }), this.contextMenu && this.destroyContextMenu();
    const t = this.getParent();
    t && t.removeChild(this);
  }, this.setupResizeBox = () => {
    if (!this.points.length)
      return null;
    const t = this.getResizeBoxBounds();
    return this.resizeBox = new Z().init(this.root, t.left, t.top, t.width, t.height, {
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
    return this.rotateBox = new Q().init(this.root, t.left, t.top, t.width, t.height, {
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
    const s = this.getRootParent(!0);
    s && s.options.groupChildShapes && (s.calcPosition(), t = s.getPosition(s.options.groupChildShapes));
    const [e, i] = this.getMaxPointSize(), o = {
      left: t.left - e,
      right: t.right + e,
      top: t.top - i,
      bottom: t.bottom + i,
      width: t.width + e * 2,
      height: t.height + i * 2
    };
    o.left < 0 && (this.moveTo(o.left * -1, t.top, !1), o.left = 0), o.top < 0 && (this.moveTo(t.left, o.top * -1, !1), o.top = 0);
    const n = this.getBounds();
    return o.bottom > n.bottom && (this.moveTo(t.left, o.bottom - n.bottom + t.top, !1), o.bottom = n.bottom), o.right > n.right && (this.moveTo(o.right - n.right + t.left, t.top, !1), o.bottom = n.bottom), o;
  }, this.getMaxPointSize = () => {
    if (!this.points.length)
      return [0, 0];
    const t = this.points.map((e) => e.options.width).reduce((e, i) => Math.max(e, i)), s = this.points.map((e) => e.options.height).reduce((e, i) => Math.max(e, i));
    return [t, s];
  }, this.getCenter = (t = !1) => {
    const s = this.getPosition(t);
    return [s.left + s.width / 2, s.top + s.height / 2];
  }, this.toSvg = (t = null) => v.toSvg(this, t), this.toPng = (t = U.DATAURL, s = null, e = null, i = null) => v.toPng(this, t, s, e, i), this.toJSON = (t = !0) => JSON.stringify(this.getJSON(t)), this.clone = (t = {}) => {
    const s = Object.assign({}, this.getJSON());
    s.options.id += "_clone", s.options.name += " Clone", s.parent_guid = this.guid, s.options = Object.assign(s.options, t);
    const e = new y().fromJSON(this.root, JSON.stringify(s));
    return e ? (e.getChildren(!0).forEach((i) => {
      i.options.id += "_clone", i.options.name += " Clone";
    }), e) : null;
  }, this.getJSON = (t = !0) => {
    const s = {
      options: Object.assign({}, this.options)
    };
    if (s.options.displayMode = u.DEFAULT, s.points = this.points.map((e) => e.getJSON()), t) {
      let e = this.getChildren();
      e.length && (s.children = e.map((i) => i.getJSON(t)));
    }
    return s;
  }, this.fromJSON = (t, s, e = !0) => {
    let i = s;
    if (typeof i == "string" && (i = z(s)), !i)
      return null;
    this.root = t, this.setOptions(i.options), this.svg || this.init(t, this.options, null), i.points.forEach((n) => {
      this.addPoint(n.x, n.y, n.options);
    }), e && typeof i.children < "u" && i.children && (this.getChildren(!0).forEach((n) => n.destroy()), i.children.forEach((n) => {
      this.addChild(new y().fromJSON(t, n));
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
function Z() {
  this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.shape = null, this.guid = L(), this.options = {
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
  }, this.eventListener = null, this.left_top = null, this.left_center = null, this.left_bottom = null, this.center_top = null, this.center_bottom = null, this.right_top = null, this.right_center = null, this.right_bottom = null, this.init = (t, s, e, i, o, n = {}) => (this.left = parseInt(s), this.top = parseInt(e), this.width = parseInt(i), this.height = parseInt(o), this.right = this.left + this.width, this.bottom = this.top + this.height, this.setOptions(n), this.options.shapeOptions.id = this.options.id, this.options.shapeOptions.canRotate = !1, this.options.shapeOptions.canScale = !1, this.shape = new y().init(t, Object.assign({}, this.options.shapeOptions), []), h.emit(r.SHAPE_CREATE, this.shape, {}), this.options.shapeOptions.pointOptions.bounds = this.shape.getBounds(), this.addPoints(), this.eventListener = new Mt(this).run(), this.redraw(), h.emit(r.SHAPE_CREATE, this, {}), this), this.setOptions = (t = {}) => {
    !t || typeof t != "object" || (t.shapeOptions && typeof t.shapeOptions == "object" ? (t.shapeOptions.pointOptions && typeof t.shapeOptions.pointOptions == "object" ? t.shapeOptions.pointOptions = Object.assign(this.options.shapeOptions.pointOptions, t.shapeOptions.pointOptions) : t.shapeOptions.pointOptions = Object.assign({}, this.options.shapeOptions.pointOptions), t.shapeOptions = Object.assign(this.options.shapeOptions, t.shapeOptions)) : t.shapeOptions = Object.assign({}, this.options.shapeOptions), t.shapeOptions.zIndex = t.zIndex || this.options.zIndex, t.shapeOptions.id = t.id ? t.id : this.options.id, Object.assign(this.options, t), this.shape && this.shape.setOptions(this.options.shapeOptions));
  }, this.addPoints = () => {
    this.left_top = this.shape.addPoint(this.left, this.top, { id: this.shape.guid + "_left_top", style: { backgroundImage: "url('" + gt + "')" } }), this.center_top = this.shape.addPoint(this.left + this.width / 2, this.top, { id: this.shape.guid + "_center_top", style: { backgroundImage: "url('" + dt + "')" } }), this.right_top = this.shape.addPoint(this.right, this.top, { id: this.shape.guid + "_right_top", style: { backgroundImage: "url('" + Et + "')" } }), this.right_center = this.shape.addPoint(this.right, this.top + this.height / 2, { id: this.shape.guid + "_right_center", style: { backgroundImage: "url('" + ft + "')" } }), this.right_bottom = this.shape.addPoint(this.right, this.bottom, { id: this.shape.guid + "_right_bottom", style: { backgroundImage: "url('" + ct + "')" } }), this.center_bottom = this.shape.addPoint(this.left + this.width / 2, this.bottom, { id: this.shape.guid + "_center_bottom", style: { backgroundImage: "url('" + lt + "')" } }), this.left_bottom = this.shape.addPoint(this.left, this.bottom, { id: this.shape.guid + "_left_bottom", style: { backgroundImage: "url('" + At + "')" } }), this.left_center = this.shape.addPoint(this.left, this.top + this.height / 2, { id: this.shape.guid + "_left_center", style: { backgroundImage: "url('" + ut + "')" } }), this.setPointsOptions();
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
  }, this.addEventListener = (t, s) => this.eventListener.addEventListener(t, s), this.removeEventListener = (t, s) => {
    this.eventListener.removeEventListener(t, s);
  };
}
try {
  window.ResizeBox = Z, window.SmartShape = y, window.RotateBox = Q, window.SmartShapeManager = E;
} catch {
}
export {
  h as EventsManager,
  Z as ResizeBox,
  Q as RotateBox,
  r as ShapeEvents,
  y as SmartShape,
  u as SmartShapeDisplayMode,
  E as SmartShapeManager
};
